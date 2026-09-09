import {readResearchSync} from '../src/research/storage'
import {readFileSync} from 'node:fs'
import {beforeAll,describe,expect,it} from 'vitest'
import {cnIndustryFoodFiles as manifest,importCnIndustryFood} from '../src/research/import-cn-industry-food'
import {createTaskPageBuilder} from '../src/research/site'
import {researchCoverage,validateResearch} from '../src/research/validate'
import type {Research,Task} from '../src/research/schema'

type Raw=Record<string,any>
const files=Object.fromEntries(Object.values(manifest).map(p=>[p.file,readFileSync(p.file,'utf8')]))
const raw=(key:keyof typeof manifest):Raw=>JSON.parse(files[manifest[key].file])
const main=raw('main'),ids=new Set<string>(main.tasks.map((t:Raw)=>t.id))
const own=(id:string)=>id.startsWith('automation-cn-food-')
const task=(data:Research,id:string)=>data.tasks.find(t=>t.id===id)!
const pub=(t:Task):Raw=>t.dossier!.publicResearch as Raw
const cat=(data:Research):Raw=>data.industries.find(i=>i.id==='cn-industry')!.inventory!.foodResearch as Raw
const core=(t:Task)=>({id:t.id,country:t.country,industryId:t.industryId,scenarioId:t.scenarioId,title:t.title,boundary:t.boundary,inputs:t.inputs,outputs:t.outputs,acceptance:t.acceptance,phase:t.phase,predecessors:t.predecessors,countingRole:t.countingRole})
const reorder=(value:any):any=>Array.isArray(value)?value.map(reorder):value && typeof value==='object'?Object.fromEntries(Object.keys(value).reverse().map(k=>[k,reorder(value[k])])):value
let before:Research,after:Research
beforeAll(()=>{
  before=readResearchSync(new URL('../data/research.json',import.meta.url))
  after=importCnIndustryFood(before,files)
})

describe('CN food 196 reviewed candidate importer',()=>{
  it('keeps all task definitions, identities, ordering, country totals and macro observations',()=>{
    expect(after.tasks.map(core)).toEqual(before.tasks.map(core))
    expect(after.scenarios).toEqual(before.scenarios)
    expect(after.countries).toEqual(before.countries)
    expect(after.observations).toEqual(before.observations)
    expect(after.version).toBe(before.version)
    expect(after.checkedAt).toBe(before.checkedAt)
    expect(after.publishedAt).toBe(before.publishedAt)
    expect(after.freezeStatus).toBe(before.freezeStatus)
    expect(researchCoverage(after).map(c=>[c.country,c.tasks,c.reviewedTasks])).toEqual(researchCoverage(before).map(c=>[c.country,c.tasks,c.reviewedTasks]))
    expect(after.tasks.filter(t=>ids.has(t.id))).toHaveLength(196)
    for (const o of main.tasks) expect(task(after,o.id).dossier!.originalTask).toEqual(o.originalTask)
  })

  it('adds a bounded ID set without deleting records, including when canonical already contains this batch',()=>{
    expect(after.sources.filter(s=>own(s.id))).toHaveLength(52)
    expect(after.claims.filter(c=>own(c.id))).toHaveLength(2088)
    expect(after.searches.filter(q=>own(q.id))).toHaveLength(392)
    for (const name of ['sources','claims','searches'] as const) {
      const lookup=new Map(after[name].map(x=>[x.id,x]))
      for (const old of before[name]) expect(lookup.get(old.id)).toEqual(old)
      const oldIds=new Set(before[name].map(x=>x.id))
      expect(after[name].length-before[name].length).toBe(after[name].filter(x=>!oldIds.has(x.id)).length)
    }
    for (const t of before.tasks.filter(t=>!ids.has(t.id))) expect(task(after,t.id)).toEqual(t)
    for (const i of before.industries.filter(i=>i.id!=='cn-industry')) expect(after.industries.find(x=>x.id===i.id)).toEqual(i)
    const {foodResearch:_a,...otherAfter}=after.industries.find(i=>i.id==='cn-industry')!.inventory!
    const {foodResearch:_b,...otherBefore}=before.industries.find(i=>i.id==='cn-industry')!.inventory!
    expect(otherAfter).toEqual(otherBefore)
  })

  it('does not mutate its input and returns a detached validated object',()=>{
    const input=structuredClone(before),snapshot=JSON.stringify(input)
    const result=importCnIndustryFood(input,files)
    expect(JSON.stringify(input)).toBe(snapshot)
    expect(result).not.toBe(input)
    expect(result.tasks).not.toBe(input.tasks)
    expect(pub(task(result,'cn-ind-feed-pellets-001')).canFreeze).toBe(false)
  })

  it.each(Object.keys(manifest) as (keyof typeof manifest)[])('rejects altered bytes of %s before changing any input',key=>{
    const input=structuredClone(before),snapshot=JSON.stringify(input)
    expect(()=>importCnIndustryFood(input,{...files,[manifest[key].file]:files[manifest[key].file]+'\n'})).toThrow('实际文件 SHA 不匹配')
    expect(JSON.stringify(input)).toBe(snapshot)
  })

  it('binds both revision steps to the exact independent decisions and final field recheck',()=>{
    expect(raw('revisions').inputSha256).toBe(raw('review').input.sha256)
    expect(raw('revisions').outputSha256).toBe(raw('recheck').input.sha256)
    expect(raw('limitedRevisions').inputSha256).toBe(raw('recheck').input.sha256)
    expect(raw('limitedRevisions').outputSha256).toBe(manifest.main.sha256)
    expect(raw('finalRecheck').inputSha256).toBe(manifest.main.sha256)
    expect(raw('finalRecheck').revisionReceiptSha256).toBe(manifest.limitedRevisions.sha256)
    expect(raw('finalRecheck').canEnterUnfrozenWorkingVersion).toBe(true)
    expect(raw('recheck').canEnterUnfrozenWorkingVersion).toBe(false)
    expect(cat(after).provenance).toEqual(manifest)
    expect(Object.isFrozen(manifest.main)).toBe(true)
  })

  it('keeps the six evidence tiers distinct, with 132 outside the direct/partial tier',()=>{
    const counts:Record<string,number>={}
    for (const t of after.tasks.filter(t=>ids.has(t.id))) {
      const p=pub(t);counts[p.evidenceSupportTier]=(counts[p.evidenceSupportTier]??0)+1
      expect(t.researchStatus).toBe('in-progress')
      expect(p.canFreeze).toBe(false)
    }
    expect(counts).toEqual({'bounded-direct-or-partial-action-mechanism':64,'equipment-or-route-scope-only':20,'bounded-indexed-origin-mechanism':6,'provisional-application-only':1,'adjacent-evidence-only-no-current-task-mechanism':6,'insufficient-matched-evidence-after-search':99})
    expect(cat(after).evidenceSupportTierCounts).toEqual(counts)
    expect(cat(after).tasksOutsideDirectOrPartialMechanismTier).toBe(132)
    expect(cat(after).statisticsBoundary).toContain('6 索引原文')
    expect(cat(after).statisticsBoundary).toContain('不表示 132 项完全没有已读机制')
  })

  it('shows RC01 occupation background as weak support and HJ references as process scope',()=>{
    const final=raw('finalRecheck')
    const weak=final.taskRechecks.filter((c:Raw)=>c.fieldChecks?.some((f:Raw)=>f.role==='occupation-scenario-context-not-direct-current-action'))
    expect(weak).toHaveLength(12)
    for (const c of weak) {
      const t=task(after,c.taskId)
      expect(t.occupationEvidence.every(e=>e.locator.includes('occupation-scenario-context-not-direct-current-action'))).toBe(true)
      expect(t.occupationEvidence.some(e=>e.locator.includes('occupation-action-presence-only'))).toBe(false)
      expect(pub(t).definitionReview.note).toContain('不直接列出本动作')
      expect(t.workflowEvidence.every(e=>e.locator.includes('process-unit-or-scenario-scope'))).toBe(true)
    }
    expect(after.tasks.filter(t=>ids.has(t.id)).flatMap(t=>[...t.workflowEvidence,...t.occupationEvidence]).every(e=>e.sourceId.startsWith('automation-cn-food-'))).toBe(true)
  })

  it('keeps fish A1 partial gut/brush mechanism separate from A2 equipment catalogue and missing gill removal',()=>{
    const t=task(after,'cn-ind-fish-mince-004'),original=main.tasks.find((x:Raw)=>x.id===t.id)
    expect(pub(t).evidenceSupportTier).toBe('bounded-direct-or-partial-action-mechanism')
    expect(t.alternatives[0].description).toContain('去内脏')
    expect(t.alternatives[0].description).toMatch(/鲜鱼|解冻/)
    expect(t.alternatives[1].description).toContain('仅有设备或工艺路线范围')
    expect(t.alternatives[1].description).toContain(original.alternatives[1].mechanism)
    expect(t.evidenceGaps.join('；')).toContain('去鳃')
    const page=createTaskPageBuilder(after)(t)
    expect(page.claims.some(c=>c.evidence.some(e=>e.sourceId==='automation-cn-food-cn-food-fish-gut' && e.locator.includes('90—94')))).toBe(true)
    expect(pub(t).deploymentEvidence.every((e:Raw)=>e.fullTaskAcceptanceVerified===false)).toBe(true)
  })

  it('displays RN01 completed bounded review and RN02 current fixes separately from historical opinions',()=>{
    for (const t of after.tasks.filter(t=>ids.has(t.id))) {
      expect(t.evidenceGaps).not.toContain('库存流程与职业路径仍待独立复核及行业遗漏补齐。')
      expect(t.evidenceGaps.some(x=>x.includes('已完成所列原文范围的首轮独立审校'))).toBe(true)
    }
    const rn=raw('finalRecheck').remainingNonblockingNotes.find((x:Raw)=>x.id==='RN02')
    for (const tid of rn.taskIds) {
      const t=task(after,tid),old=main.tasks.find((x:Raw)=>x.id===tid).inventoryDisposition.reviewNote,p=pub(t)
      expect(p.definitionReview.note).toContain('原审意见（历史留档）：'+old)
      expect(t.summary).toContain('本轮已')
      expect(t.summary).not.toContain(old)
      expect(t.alternatives.every(a=>!a.description.includes(old))).toBe(true)
      expect(p.remainingHuman.unresolvedActions).not.toContain(old)
      expect(p.history.inventoryDisposition.reviewNote).toBe(old)
    }
  })

  it('keeps 35 proposed decompositions and all shared-cycle relationships uncounted and conditional',()=>{
    const proposed=after.tasks.filter(t=>ids.has(t.id) && pub(t).definitionReview.granularityDisposition==='proposed-split')
    expect(proposed).toHaveLength(35)
    expect(proposed.every(t=>pub(t).definitionReview.proposedChildrenCounted===false && pub(t).definitionReview.children.length>0)).toBe(true)
    expect(cat(after).newTaskCount).toBe(0)
    for (const m of main.sharedOperationMappings) for (const tid of m.taskIds) {
      expect(task(after,tid).evidenceGaps).toContain('待现场核验的共用边界：'+m.rule)
      expect(pub(task(after,tid)).overlapMappings.find((x:Raw)=>x.id===m.id).siteRelationshipVerified).toBe(false)
    }
  })

  it('preserves 392 actual main queries and 15 batch-level supplementary texts without UTC or attribution fabrication',()=>{
    const originalAudit=raw('audit'),searches=after.searches.filter(s=>own(s.id))
    expect(searches).toHaveLength(392)
    for (const q of originalAudit.taskQueries) {
      const s=searches.find(x=>x.id==='automation-cn-food-'+q.id.toLowerCase())!
      expect(s.query).toBe(q.query);expect(s.searchedOn).toBe(q.executedAt)
      expect(s.taskId).toBe(q.taskId);expect(s.results).toEqual([])
      expect(s.outcome).toBe('completed-candidates-unattributed')
      expect(s.audit).toEqual({file:manifest.audit.file,id:q.id,sha256:manifest.audit.sha256})
      expect(pub(task(after,q.taskId)).originalRequestUTC).toBeNull()
    }
    const catalogue=cat(after).queryAudit
    expect(catalogue.resultPools).toEqual(originalAudit.resultPools)
    expect(catalogue.supplementalSearches).toEqual(originalAudit.supplementalSearches)
    expect(catalogue.supplementalSearches.reduce((n:number,x:Raw)=>n+x.queries.length,0)).toBe(15)
    expect(catalogue.supplementalProvenance).toContain('transcribed')
    expect(catalogue.originalRequestUTC).toBeNull()
  })

  it('retains all cash and labor nulls, full cash model, adjacent-period working capital and replacement/exit gaps',()=>{
    for (const original of main.tasks) {
      const t=task(after,original.id),p=pub(t),cash=p.economics
      expect(cash.parameters).toEqual(original.cashFlow.parameters)
      expect(Object.values(cash.parameters).every(x=>x===null)).toBe(true)
      expect(cash.model).toEqual(main.cashFlowModels[0])
      expect(cash.currency).toBe('CNY')
      for (const f of ['npv','paybackYears','breakEvenPaidHours']) expect(cash[f]).toBeNull()
      expect(cash.workingCapitalDefinition).toContain('WC_t − WC_(t−1)')
      expect(cash.workingCapitalDefinition).toContain('不再重复')
      expect(cash.comparisonScope).toContain('退出')
      expect(cash.model.annualCashFlowFormula).toContain('replacement_capital_expenditure')
      expect(cash.throughputBenefitConstraint).toContain('未满足需求')
      expect(t.manualInputs.every(m=>m.value===null && m.evidence.length===0)).toBe(true)
    }
  })

  it('preserves publication precision and historical vs webpage dates without turning indexed passages into full reads',()=>{
    const lookup=new Map(after.sources.map(s=>[s.id,s]))
    for (const s of main.sources) {
      const imported=lookup.get('automation-cn-food-'+s.id.toLowerCase())!
      expect(imported.published).toBe(s.publishedAt)
      expect(imported.readStatus).toBe(s.readStatus)
      expect(imported.evidencePeriod).toBe(s.evidencePeriod)
    }
    const fault=lookup.get('automation-cn-food-cn-food-tobacco-fault-cmes')!
    expect(fault.published).toBe('2022-06-30')
    expect(fault.dates).toContainEqual({kind:'displayed',value:'2022-09-19',note:expect.stringContaining('网页发布日')})
    const beer=lookup.get('automation-cn-food-cn-food-beer-brew')!
    expect(beer.published).toBeNull();expect(beer.readStatus).toContain('403')
    const tobacco=lookup.get('automation-cn-food-cn-tobacco-hjt401-2007')!
    expect(tobacco.published).toBe('2007-12-20')
    expect(tobacco.dates).toContainEqual({kind:'effective',value:'2008-03-01',note:expect.stringContaining('历史版本')})
    expect(lookup.get('automation-cn-food-cn-occ-2022-draft')!.published).toBeNull()
    expect(lookup.get('automation-cn-food-cn-food-bright')!.limitations.join('；')).toContain('具体工厂名称和地址待核')
  })

  it('exposes shared evidence in each linked task page and keeps absent categories as hypotheses',()=>{
    const build=createTaskPageBuilder(after),claims=new Map(after.claims.map(c=>[c.id,c]))
    for (const t of after.tasks.filter(t=>ids.has(t.id))) {
      const p=build(t),pageClaims=new Set(p.claims.map(c=>c.id)),pageSources=new Set(p.sources.map(s=>s.id))
      for (const cid of [...t.conclusionIds,...t.alternatives.flatMap(a=>a.claimIds)]) expect(pageClaims.has(cid)).toBe(true)
      for (const d of pub(t).deploymentEvidence) expect(pageSources.has(d.sourceId)).toBe(true)
      for (const c of p.claims) {
        expect(c.country).toBe('cn')
        if (c.kind!=='hypothesis') expect(c.evidence.length+c.basedOn.length).toBeGreaterThan(0)
        if (c.id.includes('-unmatched-')) expect(c.kind).toBe('hypothesis')
        if (c.id.includes('-barrier-')) expect(c.kind).toBe('hypothesis')
        expect(c.deployment).not.toBe('commercial-operation')
      }
      for (const a of t.alternatives) for (const cid of a.claimIds.filter(x=>!claims.get(x)?.taskId)) expect(t.conclusionIds).toContain(cid)
    }
  })

  it('does not label mixed source statements and research boundaries as direct facts',()=>{
    const mixed=[['CN-FOOD-FDSP','option'],['CN-FOOD-BEER-YEAST','human'],['CN-FOOD-BAIJIU-WUTONG','storage'],['CN-FOOD-JUICE-EASYREAL','conditions'],['CN-FOOD-BLEND-TETRA','recover'],['CN-FOOD-TOBACCO-FILTER','maintenance'],['CN-FOOD-TOBACCO-FILTER','interlock'],['CN-FOOD-TOBACCO-FOCUSIGHT','human']]
    for(const [sid,lid] of mixed){
      const original=main.sources.find((s:Raw)=>s.id===sid).locators.find((l:Raw)=>l.id===lid)
      const claim=after.claims.find(c=>c.id==='automation-cn-food-'+(sid+'-'+lid).toLowerCase())!
      expect(claim.kind).toBe('judgment')
      expect(claim.text).toBe('来源范围判读：'+original.claim)
      expect(claim.evidence[0].locator).toBe(original.section)
    }
    const retained=after.claims.filter(c=>own(c.id)&&!c.taskId)
    expect(retained.filter(c=>c.kind==='fact')).toHaveLength(91)
    expect(retained.filter(c=>c.kind==='judgment')).toHaveLength(8)
  })

  it('keeps negative cases typed as source-specific design/engineering/historical statements',()=>{
    const t=task(after,'cn-ind-feed-pellets-002'),p=pub(t)
    expect(p.negativeFinding.records[0].type).toBe('vendor-design-risk-not-dated-incident')
    const text=t.counterevidenceIds.map(id=>after.claims.find(c=>c.id===id)!.text).join('；')
    expect(text).toContain('非故障事件')
    expect(text).toContain('预混')
    expect(text).toContain('不等于全任务自动化不可行')
    expect(p.negativeFinding.reviewCompleteness).toBe('first-pass-query-executed-not-full-failure-exit-nonadoption-review')
  })

  it('is idempotent immediately and after schema validation, storage and recursively reordered object keys',()=>{
    expect(importCnIndustryFood(after,files)).toEqual(after)
    const stored=JSON.parse(JSON.stringify(validateResearch(after)))
    expect(importCnIndustryFood(stored,files)).toEqual(after)
    expect(importCnIndustryFood(reorder(stored),files)).toEqual(after)
  })

  it.each(['country','definition','snapshot','cash','freeze','existing-source','existing-research','old-reference','array-order'])('rejects %s drift without overwriting the working version',mode=>{
    const data=structuredClone(after),t=task(data,'cn-ind-feed-pellets-010')
    if (mode==='country') t.country='us'
    if (mode==='definition') t.title+=' changed'
    if (mode==='snapshot') (t.dossier!.originalTask as Raw).action+=' changed'
    if (mode==='cash') pub(t).economics.parameters.maintenance=1
    if (mode==='freeze') data.freezeStatus='frozen'
    if (mode==='existing-source') data.sources.find(s=>own(s.id))!.title+=' changed'
    if (mode==='existing-research') pub(t).provenance={...pub(t).provenance,main:{...manifest.main,sha256:'0'.repeat(64)}}
    if (mode==='old-reference') t.occupationEvidence=[{sourceId:'inventory-cn-core-cn-occ-2022-draft',locator:'工作任务1'}]
    if (mode==='array-order') t.conclusionIds.reverse()
    const snapshot=JSON.stringify(data)
    expect(()=>importCnIndustryFood(data,files)).toThrow('食品导入：')
    expect(JSON.stringify(data)).toBe(snapshot)
  })
})
