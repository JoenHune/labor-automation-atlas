import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {describe,it,expect} from 'vitest'
import {importUsCore} from '../src/research/import-us-core'
import {validateResearch} from '../src/research/validate'
import type {Research} from '../src/research/schema'
const read=(file:string)=>JSON.parse(readFileSync(new URL('../'+file,import.meta.url),'utf8'))
const sha=(file:string)=>createHash('sha256').update(readFileSync(new URL('../'+file,import.meta.url))).digest('hex')
const fixture=()=>read('data/research.json') as Research
const batch=(industry:string)=>{
 const file='research/automation/us-'+industry+'.json',auditFile='research/automation/us-'+industry+'-search-audit.json',reviewFile='research/reviews/us-'+industry+'-automation-decisions.json'
 return {raw:read(file),audit:read(auditFile),review:read(reviewFile),provenance:{file,sha256:sha(file),auditFile,auditSha256:sha(auditFile),reviewFile,reviewSha256:sha(reviewFile)}}
}
describe('美国制造业及公共部门独立修订接入',()=>{
 it('保留实际查询、未知参数和独立边界；规范、研究与产品不升级为持续商业运行',()=>{
  for(const industry of ['manufacturing','government']) {
   const b=batch(industry),d=validateResearch(importUsCore(fixture(),b.raw,b.audit,b.review,b.provenance)),tasks=d.tasks.filter(t=>t.industryId==='us-'+industry&&t.discovery)
   expect(tasks).toHaveLength(b.raw.sourceTaskCount)
   expect(tasks.every(t=>t.researchStatus==='in-progress'&&t.manualInputs.every(m=>m.value===null)&&(t.dossier?.publicResearch as any).canFreeze===false)).toBe(true)
   for(const t of tasks)for(const id of t.searchIds){const q=d.searches.find(q=>q.id===id)!,original=b.audit.queries.find((x:any)=>x.id===q.audit?.id);expect(q.query).toBe(original.query);expect(q.searchedOn).toBe(original.executedAt);expect(q.results).toEqual([])}
   expect(d.claims.filter(c=>c.id.startsWith('automation-us-'+industry)).every(c=>c.status==='draft'&&c.deployment!=='commercial-operation')).toBe(true)
   expect(tasks.flatMap(t=>t.barriers.flatMap(b=>b.claimIds)).map(id=>d.claims.find(c=>c.id===id)!).every(c=>c.kind==='hypothesis'&&c.evidence.length===0)).toBe(true)
  }
 })
 it('保留PDF分行惯例；公开发布日期不同于报告日期；修订阶段同步到流程且保留原定义',()=>{
  const b=batch('government'),d=validateResearch(importUsCore(fixture(),b.raw,b.audit,b.review,b.provenance))
  expect(d.sources.find(s=>s.id==='automation-us-government-gao-at')).toMatchObject({published:'2025-12-30',dates:expect.arrayContaining([expect.objectContaining({kind:'released',value:'2026-01-29'})])})
  expect(d.sources.find(s=>s.id==='automation-us-government-va-robot')?.published).toBe('2026-02-04')
  expect(d.sources.find(s=>s.id==='automation-us-government-g-road')).toMatchObject({published:null,publishedLabel:'1999',dateEvidence:expect.arrayContaining([expect.objectContaining({sourceId:'automation-us-government-g-road-metadata'})])})
  const task=d.tasks.find(t=>t.id==='us-gov-logistics-006')!,scene=d.scenarios.find(s=>s.id===task.scenarioId)!
  expect(task.phase).toBe('operation');expect((task.dossier?.originalTask as any).phase).toBe('交接')
  expect(scene.coverage.find(c=>c.phase==='作业')?.taskIds).toContain(task.id);expect(scene.coverage.find(c=>c.phase==='交接')?.taskIds).not.toContain(task.id)
  const m=batch('manufacturing'),md=importUsCore(fixture(),m.raw,m.audit,m.review,m.provenance)
  expect(md.claims.flatMap(c=>c.evidence).some(e=>e.sourceId==='automation-us-manufacturing-m-cement'&&e.locator.includes('LF物理行 257—263'))).toBe(true)
 })
 it('阻止跨国、已改变定义、未执行反向查询和未绑定现金数字进入公开任务',()=>{
  const b=batch('government')
  const country=fixture();country.tasks.find(t=>t.id===b.raw.tasks[0].id.toLowerCase())!.country='cn';expect(()=>importUsCore(country,b.raw,b.audit,b.review,b.provenance)).toThrow('国家')
  const definition=fixture();definition.tasks.find(t=>t.id===b.raw.tasks[0].id.toLowerCase())!.outputs=['changed'];expect(()=>importUsCore(definition,b.raw,b.audit,b.review,b.provenance)).toThrow('定义')
  const audit=structuredClone(b.audit);audit.queries[1].executionStatus='planned';expect(()=>importUsCore(fixture(),b.raw,audit,b.review,b.provenance)).toThrow('实际查询')
  const raw=structuredClone(b.raw);raw.cashFlowModels[0].parameters.maintenance=0;expect(()=>importUsCore(fixture(),raw,b.audit,b.review,b.provenance)).toThrow('现金数值')
 })
 it('拒绝丢失原文定位、重复裁决及错误审校输入',()=>{
  const b=batch('manufacturing'),raw=structuredClone(b.raw);raw.tasks[0].alternatives[0].sourceRefs[0].locatorId='missing';expect(()=>importUsCore(fixture(),raw,b.audit,b.review,b.provenance)).toThrow('原文')
  const review=structuredClone(b.review);review.decisions[1]=review.decisions[0];expect(()=>importUsCore(fixture(),b.raw,b.audit,review,b.provenance)).toThrow('裁决')
  expect(()=>importUsCore(fixture(),b.raw,b.audit,{...b.review,input:{...b.review.input,sha256:'changed'}},b.provenance)).toThrow('审校输入')
 })
})
