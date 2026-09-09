import {readResearchSync} from '../src/research/storage'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {describe,it,expect} from 'vitest'
import {importCnMining} from '../src/research/import-cn-mining'
import {validateResearch} from '../src/research/validate'
import type {Research} from '../src/research/schema'
const read=(file:string)=>JSON.parse(readFileSync(new URL('../'+file,import.meta.url),'utf8'))
const sha=(file:string)=>createHash('sha256').update(readFileSync(new URL('../'+file,import.meta.url))).digest('hex')
const fixture=()=>readResearchSync(new URL('../data/research.json',import.meta.url))
const batch=()=>{
 const file='research/automation/cn-industry-mining-06-12.json',auditFile='research/automation/cn-industry-mining-06-12-search-audit.json',reviewFile='research/reviews/cn-industry-mining-06-12-automation-decisions.json'
 return{raw:read(file),audit:read(auditFile),review:read(reviewFile),recheck:read('research/reviews/cn-industry-mining-06-12-automation-recheck.json'),provenance:{file,sha256:sha(file),auditFile,auditSha256:sha(auditFile),reviewFile,reviewSha256:sha(reviewFile)}}
}
const run=(d:Research,b:ReturnType<typeof batch>)=>importCnMining(d,b.raw,b.audit,b.review,b.recheck,b.provenance)
describe('中国矿业独立复核接入',()=>{
 it('应用3项显示修订，保存138原始快照和国家边界，21项拆分不计新增',()=>{
  const b=batch(),base=fixture(),count=base.tasks.length,us=JSON.stringify(base.tasks.filter(t=>t.country==='us')),d=validateResearch(run(base,b)),ids=new Set(b.raw.tasks.map((t:any)=>t.id)),tasks=d.tasks.filter(t=>ids.has(t.id))
  expect(tasks).toHaveLength(138);expect(d.tasks).toHaveLength(count);expect(JSON.stringify(d.tasks.filter(t=>t.country==='us'))).toBe(us)
  const coal=tasks.find(t=>t.id==='cn-ind-coal-longwall-007')!,raw=b.raw.tasks.find((t:any)=>t.id===coal.id)
  expect(coal.title).toBe(raw.action);expect(coal.title).toContain('移架滞后');expect(coal.dossier?.originalTask).toEqual(raw.originalTask);expect((coal.dossier?.originalTask as any).action).toContain('空顶超限')
  expect(tasks.filter(t=>(t.dossier?.publicResearch as any).definitionReview.proposedDecomposition)).toHaveLength(21)
  expect(tasks.every(t=>t.researchStatus==='in-progress'&&t.manualInputs.every(m=>m.value===null)&&(t.dossier?.publicResearch as any).canFreeze===false)).toBe(true)
  expect(d.claims.filter(c=>c.id.startsWith('automation-cn-mining-')).every(c=>c.country==='cn'&&c.status==='draft'&&c.deployment!=='commercial-operation')).toBe(true)
  const counts=[d.sources.length,d.claims.length,d.searches.length],refs=structuredClone(coal.occupationEvidence);run(d,b);expect([d.sources.length,d.claims.length,d.searches.length]).toEqual(counts);expect(coal.occupationEvidence).toEqual(refs)
 })
 it('保留真实查询日期与原始措辞，区分模型假设、来源时期和局部限制',()=>{
  const b=batch(),d=validateResearch(run(fixture(),b)),qids=new Map(b.audit.taskQueries.map((q:any)=>[q.id,q]))
  for(const q of d.searches.filter(q=>q.id.startsWith('automation-cn-mining-'))){const original=qids.get(q.audit!.id) as any;expect(q.query).toBe(original.query);expect(q.searchedOn).toBe(original.executedAt);expect(q.results).toEqual([])}
  const src=d.sources.find(s=>s.id==='automation-cn-mining-cn-min-db2039')!
  expect(src.published).toBe('2022-12-27');expect(src.dates).toContainEqual(expect.objectContaining({kind:'effective',value:'2023-04-01'}));expect(src.limitations.join(' ')).toContain('北京市')
  const geo=d.tasks.find(t=>t.id==='cn-ind-geothermal-resource-test-002')!;expect(geo.alternatives[0].description).toContain('水位（压力）')
  expect((geo.dossier?.publicResearch as any).economics.paybackYears).toBeNull()
  const coal=d.tasks.find(t=>t.id==='cn-ind-coal-longwall-007')!;expect(coal.occupationEvidence[0].locator).not.toBe(coal.occupationEvidence[1].locator)
 })
 it('拒绝串国、篡改定义、未复检字段、伪造现金和缺失查询',()=>{
  const b=batch(),country=fixture();country.tasks.find(t=>t.id===b.raw.tasks[0].id)!.country='us';expect(()=>run(country,b)).toThrow('国家')
  const definition=fixture();(definition.tasks.find(t=>t.id===b.raw.tasks[0].id)!.dossier!.originalTask as any).acceptance='changed';expect(()=>run(definition,b)).toThrow('定义')
  const pending=batch();pending.recheck.followupFieldReceipt.findings[0].status='pending';expect(()=>run(fixture(),pending)).toThrow('复检')
  const change=batch();change.raw.tasks[0].action='new action';expect(()=>run(fixture(),change)).toThrow('定义')
  const cash=batch();cash.raw.tasks[0].cashFlow.parameters.maintenance=0;expect(()=>run(fixture(),cash)).toThrow('现金')
  const query=batch();query.audit.taskQueries[0].executionStatus='planned';expect(()=>run(fixture(),query)).toThrow('实际查询')
  const locator=batch();locator.raw.tasks[0].alternatives[0].sourceRefs[0].section='bad';expect(()=>run(fixture(),locator)).toThrow('原文定位')
 })
})
