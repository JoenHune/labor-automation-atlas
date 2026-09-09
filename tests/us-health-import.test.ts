import {readResearchSync} from '../src/research/storage'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {describe,it,expect} from 'vitest'
import {importUsHealth} from '../src/research/import-us-health'
import {validateResearch} from '../src/research/validate'
import type {Research} from '../src/research/schema'
const read=(file:string)=>JSON.parse(readFileSync(new URL('../'+file,import.meta.url),'utf8'))
const sha=(file:string)=>createHash('sha256').update(readFileSync(new URL('../'+file,import.meta.url))).digest('hex')
const fixture=()=>readResearchSync(new URL('../data/research.json',import.meta.url))
const batch=()=>{
 const file='research/automation/us-health.json',auditFile='research/automation/us-health-search-audit.json',reviewFile='research/reviews/us-health-automation-decisions.json'
 return {raw:read(file),audit:read(auditFile),review:read(reviewFile),recheck:read('research/reviews/us-health-automation-recheck.json'),provenance:{file,sha256:sha(file),auditFile,auditSha256:sha(auditFile),reviewFile,reviewSha256:sha(reviewFile)}}
}
describe('美国卫生限定复检接入',()=>{
 it('保留100快照、35拟拆父项、8相邻边界、两项阶段及国家隔离，重复导入不增加记录',()=>{
  const b=batch(),d=fixture(),others=structuredClone(d.tasks.filter(t=>t.industryId!=='us-health'))
  validateResearch(importUsHealth(d,b.raw,b.audit,b.review,b.recheck,b.provenance))
  expect(d.tasks.filter(t=>t.industryId!=='us-health')).toEqual(others)
  const tasks=d.tasks.filter(t=>t.industryId==='us-health'&&t.discovery)
  expect(tasks).toHaveLength(100)
  expect(tasks.filter(t=>(t.dossier?.publicResearch as any).definitionReview.children.length)).toHaveLength(35)
  expect(tasks.filter(t=>t.summary?.startsWith('仅找到相邻'))).toHaveLength(8)
  for(const t of tasks)expect(t.dossier?.originalTask).toEqual(b.raw.tasks.find((r:any)=>r.id.toLowerCase()===t.id).originalTask)
  const sample=tasks.find(t=>t.id==='us-hlt-specimen-003')!,scene=d.scenarios.find(s=>s.id===sample.scenarioId)!
  expect(sample.phase).toBe('preparation');expect((sample.dossier?.originalTask as any).phase).toBe('作业')
  expect(scene.coverage.find(c=>c.phase==='准备')?.taskIds).toContain(sample.id)
  expect((sample.dossier?.publicResearch as any).definitionReview.children).toEqual(['解释本次采集与核对理解','核对本次采样准备状态'])
  expect(tasks.find(t=>t.id==='us-hlt-or-009')?.phase).toBe('handoff')
  const counts=[d.sources.length,d.claims.length,d.searches.length]
  importUsHealth(d,b.raw,b.audit,b.review,b.recheck,b.provenance)
  expect([d.sources.length,d.claims.length,d.searches.length]).toEqual(counts)
 })
 it('日期性质、复合原文定位、空现金与实际查询的审计限制均保留',()=>{
  const b=batch(),d=validateResearch(importUsHealth(fixture(),b.raw,b.audit,b.review,b.recheck,b.provenance))
  expect(d.sources.find(s=>s.id==='automation-us-health-h-clia')).toMatchObject({published:null,dates:expect.arrayContaining([expect.objectContaining({kind:'document-version',value:'2022-10-01'})])})
  expect(d.sources.find(s=>s.id==='automation-us-health-obi-study')).toMatchObject({published:null})
  expect(d.sources.find(s=>s.id==='automation-us-health-bright-pickup')?.dates).toEqual(expect.arrayContaining([expect.objectContaining({kind:'displayed',value:'2025-12-11'})]))
  expect(d.sources.find(s=>s.id==='automation-us-health-gao-shelter')).toMatchObject({published:'2026-01-22',dates:expect.arrayContaining([expect.objectContaining({kind:'authored',value:'2025-12-23'})])})
  const refs=d.claims.filter(c=>c.id.startsWith('automation-us-health')).flatMap(c=>c.evidence)
  expect(refs.some(r=>r.sourceId==='automation-us-health-smartsponge'&&r.locator.includes('物理第6页')&&r.locator.includes('印刷页4-1')&&r.locator.includes('物理第1页'))).toBe(true)
  const task=d.tasks.find(t=>t.id==='us-hlt-specimen-004')!
  expect(task.alternatives[0].category).toBe('robot')
  expect(d.tasks.find(t=>t.id==='us-hlt-rehab-002')?.alternatives[0].category).toBe('unclassified')
  expect(task.conclusionIds.map(id=>d.claims.find(c=>c.id===id)!.text).some(t=>t.includes('其他风险传感器'))).toBe(true)
  const qs=d.searches.filter(s=>s.id.startsWith('automation-us-health'))
  expect(qs).toHaveLength(200);expect(qs.every(s=>s.results.length===0&&s.note.includes('UTC未保留'))).toBe(true)
  const framework=(task.dossier?.publicResearch as any).economics.framework
  expect(Object.values(framework.parameters).every(v=>v===null)).toBe(true)
  expect(framework.workingCapitalChangeFormula).toContain('W_t - W_(t-1)')
  expect(d.claims.filter(c=>c.id.startsWith('automation-us-health')).every(c=>c.deployment!=='commercial-operation')).toBe(true)
 })
 it('拒绝未复检输入、原快照变更、相邻正例升级、补造时间、未执行查询和现金值',()=>{
  const b=batch(),run=(raw=b.raw,audit=b.audit,recheck=b.recheck)=>importUsHealth(fixture(),raw,audit,b.review,recheck,b.provenance)
  expect(()=>run(b.raw,b.audit,{...b.recheck,inputSHA256:'changed'})).toThrow('复检输入')
  const country=structuredClone(b.raw);country.country='CN';expect(()=>run(country)).toThrow('国家')
  const original=structuredClone(b.raw);original.tasks[0].originalTask.outputs=['changed'];expect(()=>run(original)).toThrow('快照')
  const adjacent=structuredClone(b.raw);adjacent.tasks.find((t:any)=>t.id==='US-HLT-REHAB-002').positiveCounterexample.status='commercial-success';expect(()=>run(adjacent)).toThrow('边界修订')
  const timestamp=structuredClone(b.raw);timestamp.tasks[0].searchAudit.actualUtcTimestamp='2026-09-09T00:00:00Z';expect(()=>run(timestamp)).toThrow('执行时间')
  const audit=structuredClone(b.audit);audit.queries[1].executionStatus='planned';expect(()=>run(b.raw,audit)).toThrow('实际查询')
  const cash=structuredClone(b.raw);cash.cashFlowModels[0].parameters.maintenance=0;expect(()=>run(cash)).toThrow('现金数值')
 })
})
