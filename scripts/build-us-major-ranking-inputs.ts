import {createHash} from 'node:crypto'
import {readFile,writeFile,mkdir} from 'node:fs/promises'
import type {EmploymentDataset,EmploymentRecord,Research} from '../src/research/schema'
import {moneyInBaseUnits} from '../src/research/currency'
import {validateEmployment} from '../src/research/employment'

// Reuse the separately archived official inputs to the old nine-industry sum.
// This never redistributes the aggregate, and never changes the canonical dataset.
const read=async<T>(path:string):Promise<T>=>JSON.parse(await readFile(path,'utf8'))
type RawObservation={nodeId:string;year:number;employment:{value:number;calculation?:{inputs?:Array<{own_code:string;industry_code:string;value:number;csvRow:number}>}}}
const research=await read<Research>('data/site.json')
const canonical=await read<EmploymentDataset>('research/employment/dataset.json')
const raw=await read<RawObservation[]>('research/employment/us/observations.json')
const bridges=[
 ['us-mining',7,'21'],['us-utilities',11,'22'],['us-transport',43,'48-49'],
 ['us-management',69,'55'],['us-administrative',70,'56'],['us-education',73,'61'],
 ['us-arts',79,'71'],['us-hospitality',82,'72'],['us-other-services',85,'81'],
] as const
const records:EmploymentRecord[]=[]
for(const year of [2021,2022,2023,2024,2025]){
 const aggregate=canonical.records.find(r=>r.country==='us'&&r.nodeId==='us-orbit-other'&&r.year===year)!
 const archived=raw.find(r=>r.nodeId==='us-orbit-other'&&r.year===year)!
 if(!aggregate||!archived)throw new Error('缺已归档就业输入：'+year)
 for(const [nodeId,line,code] of bridges){
  if(canonical.records.some(r=>r.country==='us'&&r.nodeId===nodeId&&r.year===year))throw new Error('新增行业与原就业记录重叠：'+nodeId)
  const industry=research.industries.find(i=>i.country==='us'&&i.id===nodeId&&i.rankingUniverse)!
  const valueAdded=research.observations.filter(o=>o.country==='us'&&o.industryId===nodeId&&o.period===String(year)&&o.frequency==='annual'&&o.measure==='value-added'&&o.priceBasis==='current'&&!o.annualized)
  if(!industry||valueAdded.length!==1)throw new Error('增加值锚点不唯一：'+nodeId+' '+year)
  let input:NonNullable<EmploymentRecord['employment']['calculation']>['inputs'][number]
  if(year<=2024){
   const found=aggregate.employment.calculation?.inputs.find(i=>i.id==='nipa-'+line)
   if(!found)throw new Error('缺独立NIPA行：'+nodeId+' '+year)
   input=structuredClone(found)
  }else{
   const found=archived.employment.calculation?.inputs?.filter(i=>i.own_code==='5'&&i.industry_code===code)
   if(found?.length!==1)throw new Error('缺独立QCEW行：'+nodeId+' '+year)
   const cell=found[0]
   input={id:'qcew-private-'+code,label:industry.name+' · 私营受保雇员岗位',value:cell.value,unit:'jobs',evidence:[{sourceId:'us-employment-qcew-'+year,locator:`${year}/a/area/US000.csv; row ${cell.csvRow}; area_fips=US000; size_code=0; own_code=5; industry_code=${code}; annual_avg_emplvl=${cell.value}`} ]}
  }
  const methodSource=year<=2024?'us-employment-nipa-methods':'us-employment-qcew-definition'
  const methodEvidence=aggregate.employment.evidence.find(e=>e.sourceId===methodSource)
  if(!methodEvidence)throw new Error('缺就业定义来源：'+nodeId)
  records.push({
   id:`us-major-employment-${nodeId}-${year}`,country:'us',basis:'annual-industry',nodeId,nodeName:industry.name,year,
   valueAddedAnchor:{baseValue:moneyInBaseUnits(valueAdded[0].value,valueAdded[0].unit),currency:'USD',coverage:valueAdded[0].coverage},
   employment:{...aggregate.employment,value:input.value,status:'official',
    definition:year<=2024?'BEA本行业年度全职与兼职雇员岗位；不含业主，一人多职可重复计数。表内年度观测的月均处理未明确，不改写为期末或全年累计人数。':'本行业12个月平均受保雇员岗位；全职、兼职各计一岗，不含自雇业主。',
    coverage:year<=2024?`BEA国内私人行业：${industry.nameEn}；NIPA雇员口径，包含BEA覆盖调整。`:`QCEW美国50州及DC私营行业 own_code=5，NAICS ${code}；仅UI覆盖雇员，未含业主及其他非覆盖就业。`,
    evidence:[...input.evidence,methodEvidence],
    calculation:{methodId:'us-major-official-input',label:'已归档的独立官方就业行',expression:String(input.value),operation:'identity',inputs:[input],assumptions:[]},
   },
   pairing:{status:'proxy',comparisonGroup:year<=2024?'bea-nipa-annual-employees-private':'qcew-covered-annual-jobs-private',explanation:'同年本行业全部现价增加值 ÷ 所注明雇员岗位。未含业主，不是全口径自然人人均劳动生产率，也不代表员工个人贡献。'},
   references:[],notes:['从原“其余行业”计算中已逐项归档的官方输入独立展示；没有按增加值或汇总份额分配人数。','私营教育、医疗及其他私人行业不含政府所属机构；政府按所有权另列。'],gap:'',
  })
 }
}
const sourceIds=new Set(records.flatMap(r=>r.employment.evidence.map(e=>e.sourceId)))
const dataset=validateEmployment({version:'2026-09-15.us-major-ranking-1',checkedAt:'2026-09-14',sources:canonical.sources.filter(s=>sourceIds.has(s.id)),records})
const paths=['research/employment/us/observations.json','research/employment/dataset.json','research/us/macro.json']
const inputHashes=Object.fromEntries(await Promise.all(paths.map(async path=>[path,createHash('sha256').update(await readFile(path)).digest('hex')])))
const unclassified=raw.find(r=>r.nodeId==='us-orbit-other'&&r.year===2025)!.employment.calculation!.inputs!.find(i=>i.industry_code==='99'&&i.own_code==='5')!
if(!unclassified)throw new Error('应明确记录未分类岗位')
const result={version:dataset.version,checkedAt:dataset.checkedAt,scope:'补齐美国20个非重叠年度大类中原未入榜的9类；45个节点年，全部复用已归档独立官方输入。',inputHashes,
 bridges:bridges.map(([nodeId,nipaLine,qcewCode])=>({nodeId,nipaLine,qcewCode,ownership:'5'})),
 excluded:[{year:2025,nodeId:'us-unclassified-employment',value:unclassified.value,unit:'jobs',reason:'QCEW NAICS99 私营未分类岗位；没有可配的独立行业增加值，不分给任何具名行业。',evidence:[{sourceId:'us-employment-qcew-2025',locator:`2025/a/area/US000.csv; row ${unclassified.csvRow}; own_code=5; industry_code=99; annual_avg_emplvl=${unclassified.value}`}]}],
 dataset,
}
const text=JSON.stringify(result,null,2)+'\n'
await writeFile('research/employment/us/major-ranking-inputs.json',text)
await mkdir('docs/public/exports',{recursive:true})
await writeFile('docs/public/exports/us-major-employment-inputs.json',text)
console.log('US major ranking: 45 official inputs; unclassified jobs excluded:',unclassified.value)
