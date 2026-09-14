import {readFile,writeFile,mkdir} from 'node:fs/promises'
import {isDeepStrictEqual} from 'node:util'
import {createHash} from 'node:crypto'
import {readResearch,writeResearch} from '../src/research/storage'
import {validateEmployment,employmentView} from '../src/research/employment'
import {orbitRoot,orbitLayer} from '../src/research/orbit'
import {scaleIndex} from '../src/research/industry-scale'
import type {EmploymentDataset,EmploymentRecord,Country} from '../src/research/schema'

const root=new URL('../',import.meta.url)
const read=async(path:string)=>JSON.parse(await readFile(new URL(path,root),'utf8'))
const modules=['cn-industry','cn-products','us']
const datasets:EmploymentDataset[]=await Promise.all(modules.map(async module=>validateEmployment(await read('research/employment/'+module+'/dataset.json'))))
const provenance=await Promise.all(modules.map(async module=>({module,readLog:await read('research/employment/'+module+'/read-log.json'),coverage:await read('research/employment/'+module+'/coverage.json'),observations:await read('research/employment/'+module+'/observations.json')})))
const amendments=await read('research/employment/amendments.json')
for(const module of modules){const bytes=await readFile(new URL('research/employment/'+module+'/dataset.json',root));if(createHash('sha256').update(bytes).digest('hex')!==amendments.inputHashes[module])throw new Error('就业审校输入已变更：'+module)}
const records=datasets.flatMap(d=>d.records)
for(const patch of amendments.records){const record=records.find(r=>r.id===patch.id&&r.country===patch.country&&r.basis===patch.basis&&r.nodeId===patch.nodeId&&r.year===patch.year);if(!record)throw new Error('就业审校目标不存在：'+patch.id);record.pairing=patch.pairing;record.notes=patch.notes;record.gap=patch.gap;record.employment.evidence=patch.employmentEvidence}
const sources=new Map<string,EmploymentDataset['sources'][number]>()
for(const dataset of datasets)for(const source of dataset.sources){
 const existing=sources.get(source.id)
 if(existing&&!isDeepStrictEqual({...existing,limitations:[]},{...source,limitations:[]}))throw new Error('就业来源编号冲突：'+source.id)
 sources.set(source.id,existing?{...existing,limitations:[...new Set([...existing.limitations,...source.limitations])]}:source)
}
const data=await readResearch(new URL('data/research.json',root))
data.employment=validateEmployment({version:data.version,checkedAt:'2026-09-14',sources:[...sources.values()],records})
const coverage:Array<{country:Country;basis:string;nodeId:string;name:string;year:number;kind:string;valueAddedBase:number|null;employmentCount:number|null;employmentStatus:EmploymentRecord['employment']['status'];denominatorKind:EmploymentRecord['employment']['denominatorKind'];pairing:EmploymentRecord['pairing']['status'];productivityBase:number|null;reason:string}>=[]
for(const country of ['cn','us'] as Country[]){
 const years=[...new Set(data.observations.filter(o=>o.country===country&&o.industryId===country+'-gdp'&&o.frequency==='annual'&&o.measure==='value-added').map(o=>Number(o.period)))]
 const views=[...years.map(year=>({year,basis:'annual-industry'})),...(data.macroStructures?.structures??[]).filter(s=>s.country===country).map(s=>({year:s.year,basis:s.id}))]
 for(const view of views){
  const tree=orbitRoot(data,country,view.year,view.basis==='annual-industry'?'':view.basis),nodes=scaleIndex([tree])
  for(const node of [...nodes.values()])for(const remainder of orbitLayer(node).sectors.filter(n=>n.kind==='remainder'))nodes.set(remainder.id,remainder)
  for(const node of nodes.values()){
   const result=employmentView(data.employment,node,view.basis)
   if(!result.record)throw new Error('缺少就业研究记录：'+[country,view.basis,node.year,node.id].join('|'))
   if(result.stale)throw new Error('就业记录与当前行业定义不匹配：'+[node.id,node.year].join('|'))
   coverage.push({country,basis:view.basis,nodeId:node.id,name:node.name,year:node.year,kind:node.kind,valueAddedBase:node.baseValue,employmentCount:result.count,employmentStatus:result.record.employment.status,denominatorKind:result.record.employment.denominatorKind,pairing:result.record.pairing.status,productivityBase:result.productivity,reason:result.reason})
  }
 }
}
if(coverage.length!==data.employment.records.length)throw new Error('就业记录包含不在当前图谱中的多余节点')
await writeResearch(new URL('data/research.json',root),data)
const put=async(path:string,value:unknown)=>{await mkdir(new URL(path.slice(0,path.lastIndexOf('/'))+'/',root),{recursive:true});await writeFile(new URL(path,root),JSON.stringify(value,null,2)+'\n')}
await put('research/employment/dataset.json',data.employment)
await put('research/employment/coverage.json',{version:data.version,checkedAt:data.employment.checkedAt,records:coverage})
const groups=[{country:'cn',basis:'annual-industry',label:'中国年度行业 · 2021—2025'},{country:'cn',basis:'cn-io2023',label:'中国产品结构 · 2023'},{country:'us',basis:'annual-industry',label:'美国年度行业 · 2021—2025'}]
const table=['| 视图 | 节点 × 年份 | 有就业数 | 其中估算 | 可计算人均或每岗位数 |','|---|---:|---:|---:|---:|',...groups.map(g=>{const rows=coverage.filter(r=>r.country===g.country&&r.basis===g.basis);return '| '+[g.label,rows.length,rows.filter(r=>r.employmentCount!==null).length,rows.filter(r=>r.employmentStatus==='estimated').length,rows.filter(r=>r.productivityBase!==null).length].join(' | ')+' |'})]
const gaps=new Map<string,{name:string;country:string;years:number[];reason:string}>()
for(const row of coverage.filter(r=>r.employmentCount===null)){const key=row.nodeId+'|'+row.reason;const gap=gaps.get(key)??{name:row.name,country:row.country,years:[],reason:row.reason};gap.years.push(row.year);gaps.set(key,gap)}
const gapLines=[...gaps.values()].map(g=>'- '+(g.country==='cn'?'中国':'美国')+' · '+g.name+'（'+g.years.sort().join('、')+'）：'+g.reason)
await writeFile(new URL('research/employment/coverage-summary.md',root),'## 本版覆盖\n\n核查 '+data.employment.checkedAt+'。节点包括上层汇总、末级和余项；跨年份及父子行不能相加为就业总量。\n\n'+table.join('\n')+'\n\n金额缺失时仍保留就业研究；估算占比反映公开数据与当前分类的距离，不代表调查精度。\n\n### 尚不能提供就业主值的节点\n\n'+(gapLines.length?gapLines.join('\n'):'全部当前节点均有就业主值。')+'\n')
await put('docs/public/exports/employment.json',data.employment)
await put('docs/public/exports/employment-coverage.json',{version:data.version,checkedAt:data.employment.checkedAt,records:coverage})
await put('docs/public/exports/employment-research.json',{version:data.version,checkedAt:data.employment.checkedAt,view:data.employment,amendments,modules:provenance,note:'逐节点当前数据与原始研究记录同时保留；模型输入中有为复算而重复的引用，不可将重复记录相加。估算及条件敏感性不是官方行业人数或统计置信区间。'})
console.log('Integrated employment:',coverage.length,'node-years;',coverage.filter(r=>r.employmentCount!==null).length,'with employment;',coverage.filter(r=>r.productivityBase!==null).length,'with ratios.')
