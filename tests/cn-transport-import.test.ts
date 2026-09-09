import {readFileSync} from 'node:fs'
import {beforeAll,describe,expect,it} from 'vitest'
import {readResearchSync} from '../src/research/storage'
import {importCnTransport,cnTransportFiles as pins} from '../src/research/import-cn-transport'
import {createTaskPageBuilder} from '../src/research/site'
import {validateResearch} from '../src/research/validate'
import type {Research,Task} from '../src/research/schema'
type Raw=Record<string,any>
const files=Object.fromEntries(Object.values(pins).map(p=>[p.file,readFileSync(p.file,'utf8')]))
const raw=(key:keyof typeof pins):Raw=>JSON.parse(files[pins[key].file])
const main=raw('main'),ids=new Set<string>(main.tasks.map((t:Raw)=>t.id))
const sid=(v:string)=>'automation-cn-transport-'+v.toLowerCase()
const own=(v:string)=>v.startsWith('automation-cn-transport-')
const task=(d:Research,id:string)=>d.tasks.find(t=>t.id===id)!
const pub=(t:Task)=>t.dossier!.publicResearch as Raw
const cat=(d:Research)=>d.industries.find(i=>i.id==='cn-transport')!.inventory!.transportResearch as Raw
let before:Research,after:Research
beforeAll(()=>{before=readResearchSync('data/research.json');after=importCnTransport(before,files)})
describe('83 China transport candidates and their independently reviewed scope',()=>{
 it('preserves all original snapshots, human inputs, identities and non-target data',()=>{
  for(const key of ['countries','observations','scenarios','version','checkedAt','publishedAt','freezeStatus'] as const)expect(after[key]).toEqual(before[key])
  expect(after.tasks.map(t=>t.id)).toEqual(before.tasks.map(t=>t.id))
  for(const t of before.tasks){
   const actual=task(after,t.id)
   if(!ids.has(t.id)){expect(actual).toEqual(t);continue}
   const o=main.tasks.find((o:Raw)=>o.id===t.id)
   for(const key of ['id','country','industryId','scenarioId','boundary','predecessors','countingRole','manualInputs'] as const)expect(actual[key]).toEqual(t[key])
   expect(actual.dossier!.originalTask).toEqual(o.originalTask)
   expect(actual.title).toBe(o.reviewedDefinition.title);expect(actual.inputs).toEqual(o.reviewedDefinition.inputs);expect(actual.outputs).toEqual(o.reviewedDefinition.outputs)
  }
  for(const i of before.industries.filter(i=>i.id!=='cn-transport'))expect(after.industries.find(x=>x.id===i.id)).toEqual(i)
  for(const key of ['sources','claims','searches'] as const){const lookup=new Map(after[key].map(x=>[x.id,x]));for(const old of before[key])expect(lookup.get(old.id)).toEqual(old)}
 })
 it('is pure and idempotent, including array order',()=>{
  const snapshot=JSON.stringify(before),repeat=importCnTransport(after,files)
  expect(JSON.stringify(before)).toBe(snapshot);expect(repeat).toEqual(after);expect(repeat).not.toBe(after)
  expect(validateResearch(after)).toEqual(after)
 })
 it.each(Object.keys(pins) as (keyof typeof pins)[])('rejects altered input bytes: %s',key=>{
  const snapshot=JSON.stringify(before)
  expect(()=>importCnTransport(before,{...files,[pins[key].file]:files[pins[key].file]+'\n'})).toThrow('实际文件 SHA 不匹配')
  expect(JSON.stringify(before)).toBe(snapshot)
 })
 it('retains 34 sources, 188 task queries and 22 supplemental queries without attributing pooled hits',()=>{
  expect(after.sources.filter(s=>own(s.id))).toHaveLength(34)
  const queries=after.searches.filter(q=>own(q.id));expect(queries).toHaveLength(188)
  for(const q of queries){expect(q.country).toBe('cn');expect(ids.has(q.taskId)).toBe(true);expect(q.results).toEqual([]);expect(q.outcome).toBe('completed-candidates-unattributed');expect(q.audit!.sha256).toBe(pins.audit.sha256);expect(q.searchedOn).toBe('2026-09-09')}
  expect(cat(after).queryAudit.supplementalGroups).toEqual(raw('audit').adaptiveSearches)
  expect(cat(after).queryAudit.supplementalQueries).toBe(22);expect(cat(after).queryAudit.supplementalBatches).toBe(8)
  for(const t of after.tasks.filter(t=>ids.has(t.id)))expect(t.searchIds.length).toBe(t.id.startsWith('cn-trans-road-truck-')?4:2)
 })
 it('keeps mechanism grades and 7 parents / 15 proposed children without adding tasks',()=>{
  const counts:Record<string,number>={}
  for(const t of after.tasks.filter(t=>ids.has(t.id))){const p=pub(t);counts[p.evidenceSupportTier]=(counts[p.evidenceSupportTier]??0)+1;expect(t.researchStatus).toBe('in-progress');expect(p.canFreeze).toBe(false);expect(p.definitionReview.proposedChildrenCounted).toBe(false);expect(t.alternatives.map(a=>a.category)).toEqual(['traditional-machine','dedicated-machine','robot','assistive-tool','digital-process'])}
  expect(counts).toEqual({'partial-mechanism':45,'adjacent-mechanism-only':14,'adjacent-planned-requirement-only':1,'no-retained-matching-mechanism':23})
  expect(cat(after).splitProposals).toHaveLength(7);expect(cat(after).splitProposals.reduce((n:number,x:Raw)=>n+x.proposedChildCount,0)).toBe(15);expect(cat(after).approvedNewTasks).toBe(0)
 })
 it('carries the three final proposed labels while the old validator remains historical',()=>{
  for(const change of raw('limitedRevisions').exactChanges){
   const t=task(after,change.taskId),p=pub(t)
   expect(p.reviewedDefinition.supportStatus).toBe('proposed');expect(t.discovery!.supportStatus).toBe('proposed')
   expect(p.finalFieldRechecks).toHaveLength(1);expect(p.finalFieldRechecks[0].path).toBe(change.path)
   expect(p.oldValidationBoundary.validatedSha256).toBe(raw('limitedRevisions').beforeSha256)
   expect(p.oldValidationBoundary.coversFinalRaw).toBe(false);expect(p.oldValidationBoundary.independentThreePathBridgeSha256).toBe(pins.finalRecheck.sha256)
  }
  expect(raw('finalRecheck').checks.priorAuthorValidationWasRerun).toBe(false)
  expect(cat(after).provenance).toEqual(pins)
 })
 it('does not display an adjacent robot case as evidence for other equipment routes',()=>{
  for(const o of main.tasks){
   const t=task(after,o.id)
   for(const [i,a] of o.alternatives.entries()){
    const shown=t.alternatives[i]
    if(a.sourceRefs.length){expect(shown.description).toContain(a.scopeReview);continue}
    expect(shown.description).toContain('未保留'+a.type+'在本任务中的匹配机制证据')
    expect(shown.description).not.toBe(a.scopeReview)
    expect(shown.remainingLabor).toEqual(['本类方案的残留人工缺少匹配证据，不能据此估算节省人数或工时。'])
    expect(shown.claimIds).toHaveLength(1)
    expect(after.claims.find(c=>c.id===shown.claimIds[0])).toMatchObject({kind:'hypothesis',evidence:[],basedOn:[]})
   }
   expect(pub(t).alternativeEvidence).toEqual(o.alternatives)
  }
 })
 it('retains cash gaps and complete incremental working-capital, replacement and exit definitions',()=>{
  for(const o of main.tasks){
   const t=task(after,o.id),e=pub(t).economics
   expect(e).toEqual(o.economics);expect(e.currency).toBe('CNY')
   for(const key of ['paybackYears','breakEvenThreshold','replacementCapitalExpenditure','exitTransferSwitchCost','initialSwitchDowntimeCost','demandCapacity','bottleneckReleaseCapacity','downstreamCapacity'])expect(e[key]).toBeNull()
   expect(e.formula).toContain('replacement_capex_t');expect(e.formula).toContain('delta_WC_inc_t');expect(e.formula).toContain('incremental_exit_transfer_switch_cost_t')
   expect(t.manualInputs.every(x=>x.value===null)).toBe(true);expect(pub(t).originalHumanInput).toEqual(o.humanInput)
  }
 })
 it('keeps source facts separate from task applicability judgments and unproven labor replacement',()=>{
  for(const c of main.claims){
   const fact=after.claims.find(x=>x.id===sid(c.id))!,bound=after.claims.find(x=>x.id===sid(c.id+'-boundary'))!
   expect(fact.kind).toBe('fact');expect(fact.text).toBe('来源陈述：'+c.statement);expect(fact.evidence).toEqual([{sourceId:sid(c.sourceId),locator:c.locator}])
   expect(bound.kind).toBe('judgment');expect(bound.basedOn).toEqual([fact.id]);expect(bound.text).toContain(c.sourceBoundary)
  }
  for(const o of main.tasks)expect(pub(task(after,o.id)).claimBindings).toEqual(o.claimBindings)
  expect(after.claims.filter(c=>own(c.id)).every(c=>c.numericValue===null&&c.deployment!=='commercial-operation')).toBe(true)
 })
 it('preserves source date precision, date types and adjacent deployment levels',()=>{
  const source=(id:string)=>after.sources.find(s=>s.id===sid(id))!
  expect(source('CN-TP-AUTO-ADDRESS').published).toBeNull();expect(source('CN-TP-AUTO-ADDRESS').dates).toContainEqual(expect.objectContaining({kind:'updated',value:'2022-09-09'}))
  expect(source('CN-TP-AUTO-MOT-BULK-BODY').published).toBeNull();expect(source('CN-TP-AUTO-MOT-BULK-BODY').dates).toContainEqual(expect.objectContaining({kind:'document-version',value:'2025-09'}))
  expect(source('CN-TP-AUTO-BELT-IDLER').dates).toContainEqual(expect.objectContaining({kind:'released',value:'2024-05-25'}))
  expect(source('CN-TP-AUTO-PORT-CONTINUOUS').dates).toContainEqual(expect.objectContaining({kind:'authored',value:'2023-12-13'}))
  expect(source('CN-TP-AUTO-CONTINUOUS-PATENT').dates![0].note).toContain('授权公告')
  for(const t of after.tasks.filter(t=>ids.has(t.id)))expect(pub(t).deploymentEvidence.every((e:Raw)=>e.currentOperationConfirmed===false&&e.fullTaskAcceptanceVerified===false)).toBe(true)
 })
 it('retains the 4 task-specific nonadoption records without claiming independent failures or exits',()=>{
  const originals=main.tasks.filter((o:Raw)=>o.counterEvidence.length)
  expect(originals).toHaveLength(4)
  for(const o of originals){const t=task(after,o.id);expect(t.counterevidenceIds.length).toBe(o.counterEvidence.length);expect(pub(t).counterEvidence).toEqual(o.counterEvidence);for(const cid of t.counterevidenceIds)expect(after.claims.find(c=>c.id===cid)!.text).toContain('不推定本任务失败')}
  for(const o of main.tasks)expect(pub(task(after,o.id)).negativeFinding).toEqual(o.negativeFinding)
 })
 it('exports source-closed pages for all 83 tasks and never links a US task or source',()=>{
  const build=createTaskPageBuilder(after)
  for(const o of main.tasks){
   const page=build(task(after,o.id));expect(page.task.id).toBe(o.id)
   expect(page.task.searchIds.every(id=>page.searches.some(s=>s.id===id))).toBe(true)
   expect(page.sources.every(s=>s.country==='cn'||s.country==='global')).toBe(true)
   const refs=[...page.claims.flatMap(c=>c.evidence),...page.task.workflowEvidence,...page.task.occupationEvidence]
   for(const r of refs)expect(page.sources.some(s=>s.id===r.sourceId)).toBe(true)
  }
 })
 it('rejects cross-country or changed original snapshots without changing input',()=>{
  const changed={...before,tasks:before.tasks.map(t=>t.id===main.tasks[0].id?{...t,country:'us' as const}:t)}
  expect(()=>importCnTransport(changed,files)).toThrow('任务串国')
  const t=task(before,main.tasks[0].id),corrupt={...before,tasks:before.tasks.map(x=>x===t?{...x,dossier:{...x.dossier,originalTask:{...(x.dossier!.originalTask as Raw),action:'changed'}}}:x)}
  expect(()=>importCnTransport(corrupt,files)).toThrow('原快照')
 })
})
