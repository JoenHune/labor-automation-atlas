import {mkdir,writeFile} from 'node:fs/promises'
import {readResearch} from '../../src/research/storage'
import {orbitRoot,orbitLayer} from '../../src/research/orbit'
import {scaleIndex} from '../../src/research/industry-scale'
import type {Country} from '../../src/research/schema'

const root=new URL('../../',import.meta.url)
const research=await readResearch(new URL('data/research.json',root))
const records=[]
for(const country of ['cn','us'] as Country[]){
 const years=[...new Set(research.observations.filter(o=>o.country===country&&o.industryId===country+'-gdp'&&o.frequency==='annual'&&o.measure==='value-added').map(o=>Number(o.period)))].sort()
 const views=[...years.map(year=>({year,basis:'annual-industry'})),...(research.macroStructures?.structures??[]).filter(s=>s.country===country).map(s=>({year:s.year,basis:s.id}))]
 for(const view of views){
  const tree=orbitRoot(research,country,view.year,view.basis==='annual-industry'?'':view.basis)
  const nodes=scaleIndex([tree])
  for(const n of [...nodes.values()])for(const remainder of orbitLayer(n).sectors.filter(s=>s.kind==='remainder'))nodes.set(remainder.id,remainder)
  for(const n of nodes.values())records.push({country,basis:view.basis,year:view.year,nodeId:n.id,parentId:n.parentId,name:n.name,kind:n.kind,valueAdded:n.value,valueAddedBase:n.baseValue,unit:n.unit,currency:n.currency,coverage:n.coverage,valueEvidence:n.evidence,gap:n.gap,children:n.children.map(c=>c.id)})
 }
}
const result={version:research.version,checkedAt:'2026-09-14',scope:'全部现有年度行业节点、2023产品节点及动态未分列余项；包括金额缺失但已有名称的分类',records}
await mkdir(new URL('research/employment/',root),{recursive:true})
await writeFile(new URL('research/employment/node-inventory.json',root),JSON.stringify(result,null,2)+'\n')
console.log(JSON.stringify(['cn','us'].map(country=>({country,nodeYears:records.filter(r=>r.country===country).length,uniqueNodes:new Set(records.filter(r=>r.country===country).map(r=>r.nodeId)).size,withValue:records.filter(r=>r.country===country&&r.valueAddedBase!==null).length}))))
