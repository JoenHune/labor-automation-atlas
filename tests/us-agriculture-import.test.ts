import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {describe,it,expect} from 'vitest'
import {importUsAgriculture} from '../src/research/import-us-agriculture'
import {validateResearch} from '../src/research/validate'
import type {Research} from '../src/research/schema'
const read=(file:string)=>JSON.parse(readFileSync(new URL('../'+file,import.meta.url),'utf8'))
const sha=(file:string)=>createHash('sha256').update(readFileSync(new URL('../'+file,import.meta.url))).digest('hex')
const file='research/automation/us-agriculture.json',auditFile='research/automation/us-agriculture-search-audit.json',reviewFile='research/reviews/us-agriculture-automation-decisions.json'
const raw=read(file),audit=read(auditFile),review=read(reviewFile),provenance={file,sha256:sha(file),auditFile,auditSha256:sha(auditFile),reviewFile,reviewSha256:sha(reviewFile)}
const technical=read('research/reviews/us-agriculture-technical-field-decisions.json')
const fixture=()=>read('data/research.json') as Research
describe('美国农业修订接入',()=>{
 it('保留真实查询、局部机制、日期精度及未知现金流，不扩大任务完成范围',()=>{
  const result=validateResearch(importUsAgriculture(fixture(),raw,audit,review,provenance,technical))
  const selected=result.tasks.filter(t=>raw.tasks.some((r:any)=>r.id.toLowerCase()===t.id))
  expect(selected).toHaveLength(182)
  expect(selected.flatMap(t=>t.barriers.filter(b=>b.type==='technical').flatMap(b=>b.claimIds)).every(id=>{const c=result.claims.find(c=>c.id===id)!;return c.kind==='hypothesis'&&c.evidence.length===0&&c.text.startsWith('待验证条件：')})).toBe(true)
  expect(()=>importUsAgriculture(fixture(),raw,audit,review,provenance,{...technical,inputSha256:'changed'})).toThrow('技术字段复核')
  expect(selected.every(t=>t.country==='us'&&t.researchStatus==='in-progress'&&t.manualInputs.every(m=>m.value===null))).toBe(true)
  const first=selected.find(t=>t.id===raw.tasks[0].id.toLowerCase())!
  const queries=result.searches.filter(s=>first.searchIds.includes(s.id))
  expect(queries.some(s=>s.direction==='automation')).toBe(true)
  expect(queries.some(s=>s.direction==='counterevidence')).toBe(true)
  expect(queries.every(s=>s.results.length===0&&s.outcome==='completed-candidates-unattributed'&&s.audit?.sha256===provenance.auditSha256)).toBe(true)
  expect(queries.every(s=>audit.batches.some((b:any)=>b.id===s.audit?.id&&b.queries[b.taskIds.indexOf(raw.tasks[0].id)]===s.query))).toBe(true)
  expect(result.sources.find(s=>s.id==='automation-us-agriculture-e-aeration')).toMatchObject({published:null,publishedLabel:'2002-05'})
  expect(result.sources.find(s=>s.id==='automation-us-agriculture-a-gap')).toMatchObject({published:'2025-07-03',dates:expect.arrayContaining([expect.objectContaining({kind:'document-version',value:'2025-07-01'}),expect.objectContaining({kind:'effective',value:'2025-07-03'})]),dateEvidence:expect.arrayContaining([expect.objectContaining({sourceId:'automation-us-agriculture-e-gapnews'})])})
  const unproved=result.tasks.find(t=>t.id==='us-agr-longline-004')!
  expect(unproved.alternatives.flatMap(a=>a.claimIds).map(id=>result.claims.find(c=>c.id===id))).toEqual(expect.arrayContaining([expect.objectContaining({kind:'hypothesis',evidence:[]})]))
  expect((unproved.dossier?.publicResearch as any).canFreeze).toBe(false)
 })
 it('不能把旧研究挂到另一个国家、执行机构、任务阶段或新清单版本',()=>{
  for(const mutate of [(d:Research)=>{d.tasks.find(t=>t.id===raw.tasks[0].id.toLowerCase())!.country='cn'},(d:Research)=>{d.tasks.find(t=>t.id===raw.tasks[0].id.toLowerCase())!.boundary='政府行政部门'},(d:Research)=>{d.tasks.find(t=>t.id===raw.tasks[0].id.toLowerCase())!.discovery!.inputSha256='changed'},(d:Research)=>{(d.tasks.find(t=>t.id===raw.tasks[0].id.toLowerCase())!.dossier!.originalTask as any).phase='交付'}]) {
   const d=fixture();mutate(d);expect(()=>importUsAgriculture(d,raw,audit,review,provenance,technical)).toThrow()
  }
 })
 it('无原文定位、新增未绑定工时、未执行反向查询或不确定任务归属必须阻止导入',()=>{
  const missing=structuredClone(raw);missing.tasks[0].alternatives[0].sourceRefs[0].locatorId='missing'
  expect(()=>importUsAgriculture(fixture(),missing,audit,review,provenance,technical)).toThrow('原文定位')
  const hours=structuredClone(raw);hours.tasks[0].humanInput.minutesPerUnit=2
  expect(()=>importUsAgriculture(fixture(),hours,audit,review,provenance,technical)).toThrow('新增数值')
  expect(()=>importUsAgriculture(fixture(),raw,{...audit,batches:audit.batches.filter((b:any)=>b.direction!=='task-specific-failure-non-adoption')},review,provenance,technical)).toThrow('实际正反查询')
  const mixed=structuredClone(audit);mixed.batches.find((b:any)=>b.direction==='solution-and-conditions').taskIds.reverse()
  // 一对一关系只在审计自身明确时可用；长度改变不可猜测配对。
  mixed.batches.find((b:any)=>b.direction==='solution-and-conditions').taskIds.pop()
  expect(()=>importUsAgriculture(fixture(),raw,mixed,review,provenance,technical)).toThrow('查询和任务')
 })
})
