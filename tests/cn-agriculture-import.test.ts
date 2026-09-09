import {readResearchSync} from '../src/research/storage'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {describe,it,expect} from 'vitest'
import {importCnAgriculture} from '../src/research/import-cn-agriculture'
import {validateResearch} from '../src/research/validate'
import type {Research} from '../src/research/schema'
const read=(file:string)=>JSON.parse(readFileSync(new URL('../'+file,import.meta.url),'utf8'))
const sha=(file:string)=>createHash('sha256').update(readFileSync(new URL('../'+file,import.meta.url))).digest('hex')
const fixture=()=>readResearchSync(new URL('../data/research.json',import.meta.url))
const batch=()=>{
 const file='research/automation/cn-agriculture.json',auditFile='research/automation/cn-agriculture-search-audit.json',reviewFile='research/reviews/cn-agriculture-automation-decisions.json'
 return {raw:read(file),audit:read(auditFile),review:read(reviewFile),recheck:read('research/reviews/cn-agriculture-automation-recheck.json'),provenance:{file,sha256:sha(file),auditFile,auditSha256:sha(auditFile),reviewFile,reviewSha256:sha(reviewFile)}}
}
const run=(d:Research,b:ReturnType<typeof batch>)=>importCnAgriculture(d,b.raw,b.audit,b.review,b.recheck,b.provenance)
describe('中国农业审校接入',()=>{
 it('保留真实查询与未知现金流，不把拟议拆分、局部试验或供方说明计为完整任务部署',()=>{
  const b=batch(),base=fixture(),before=base.tasks.length,d=validateResearch(run(base,b)),tasks=d.tasks.filter(t=>t.id.startsWith('cn-ag-'))
  expect(d.tasks).toHaveLength(before);expect(tasks).toHaveLength(164)
  expect(tasks.every(t=>t.researchStatus==='in-progress'&&t.manualInputs.every(x=>x.value===null)&&(t.dossier?.publicResearch as any).canFreeze===false)).toBe(true)
  expect(tasks.filter(t=>(t.dossier?.publicResearch as any).definitionReview.children.length)).toHaveLength(47)
  for(const t of tasks)for(const id of t.searchIds){const q=d.searches.find(x=>x.id===id)!,original=b.audit.searches.find((x:any)=>x.taskId===t.id);expect(q.query).toBe(original[q.direction==='automation'?'positiveQuery':'negativeQuery']);expect(q.searchedOn).toBe(original.searchedAt);expect(q.results).toEqual([])}
  expect(d.claims.filter(c=>c.id.startsWith('automation-cn-agriculture-')).every(c=>c.deployment!=='commercial-operation'&&c.status==='draft')).toBe(true)
  const counts=[d.sources.length,d.claims.length,d.searches.length];run(d,b);expect([d.sources.length,d.claims.length,d.searches.length]).toEqual(counts)
 })
 it('日期与来源更正限于农业引用；404原文不冒充复核依据，阶段修改同步到流程',()=>{
  const b=batch(),d=validateResearch(run(fixture(),b))
  expect(d.sources.find(s=>s.id==='automation-cn-agriculture-cn-milk-station-2009')).toMatchObject({published:'2022-08-10',dates:expect.arrayContaining([expect.objectContaining({kind:'authored',value:'2009-03-23'})])})
  expect(d.sources.find(s=>s.id==='automation-cn-agriculture-cn-forest-restoration-2021')).toMatchObject({published:null,dates:expect.arrayContaining([expect.objectContaining({kind:'url-only',value:'2021-12-06'})])})
  expect(d.sources.find(s=>s.id==='inventory-cn-core-cn-forest-restoration-2021')?.published).toBe('2021-12-06')
  const wheat=d.tasks.find(t=>t.id==='cn-ag-wheat-field-003')!
  expect(wheat.workflowEvidence).toEqual([]);expect(wheat.evidenceGaps.some(g=>g.includes('404'))).toBe(true)
  expect(d.scenarios.find(s=>s.id===wheat.scenarioId)?.workflowSources).toEqual([])
  expect(d.scenarios.filter(s=>s.country==='cn'&&s.industryId==='cn-agriculture'&&s.inventory).flatMap(s=>[...s.workflowSources,...s.occupationSources]).every(r=>r.sourceId.startsWith('automation-cn-agriculture-'))).toBe(true)
  expect(wheat.occupationEvidence[0].locator).toContain('物理316页')
  expect(d.claims.find(c=>c.id==='automation-cn-agriculture-cn-ag-wheat-field-003-alternative-3')?.text).toContain('相邻机制')
  const flood=d.tasks.find(t=>t.id==='cn-ag-apple-orchard-013')!,scene=d.scenarios.find(s=>s.id===flood.scenarioId)!
  expect(flood.phase).toBe('exception');expect((flood.dossier?.originalTask as any).phase).toBe('返工')
  expect(scene.coverage.find(c=>c.phase==='异常')?.taskIds).toContain(flood.id);expect(scene.coverage.find(c=>c.phase==='返工')?.taskIds).not.toContain(flood.id)
 })
 it('拒绝国家串入、任务定义改变、错误审校版本及虚构现金数值',()=>{
  const b=batch(),country=fixture();country.tasks.find(t=>t.id===b.raw.tasks[0].id)!.country='us';expect(()=>run(country,b)).toThrow('国家')
  const changed=fixture();changed.tasks.find(t=>t.id===b.raw.tasks[0].id)!.acceptance=['新验收'];expect(()=>run(changed,b)).toThrow('定义')
  const version=batch();version.recheck.inputSha256='changed';expect(()=>run(fixture(),version)).toThrow('审校输入')
  const cash=batch();cash.raw.tasks[0].economics.residualLaborCost=0;expect(()=>run(fixture(),cash)).toThrow('现金数值')
 })
 it('拒绝没有执行的查询、错配原文定位和遗漏独立裁决',()=>{
  const search=batch();search.audit.searches[0].status='planned';expect(()=>run(fixture(),search)).toThrow('实际执行')
  const source=batch(),task=source.raw.tasks.find((t:any)=>t.alternatives.some((a:any)=>a.sourceRefs.length));task.alternatives.find((a:any)=>a.sourceRefs.length).sourceRefs[0].locator='不匹配';expect(()=>run(fixture(),source)).toThrow('原文声明与定位')
  const decisions=batch();decisions.review.decisions.pop();expect(()=>run(fixture(),decisions)).toThrow('裁决')
 })
})
