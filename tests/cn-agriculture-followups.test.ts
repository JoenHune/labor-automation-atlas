import {readResearchSync} from '../src/research/storage'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {beforeAll, describe, expect, it} from 'vitest'
import {cnAgricultureFollowupFiles as manifest, importCnAgricultureFollowups} from '../src/research/import-cn-agriculture-followups'
import type {Research, Task} from '../src/research/schema'
import {researchCoverage, validateResearch} from '../src/research/validate'
import {importCnAgriculture} from '../src/research/import-cn-agriculture'

type Raw = Record<string, any>
const files = Object.fromEntries(Object.values(manifest).map(pin => [pin.file,readFileSync(pin.file,'utf8')]))
const raw = (name: keyof typeof manifest): Raw => JSON.parse(files[manifest[name].file])
// Canonical data may already include this batch after publication. Restore the
// pinned 164-task baseline so delta assertions do not depend on release timing.
const fixture = () => {
  const data=readResearchSync(new URL('../data/research.json',import.meta.url))
  for (const key of ['sources','claims','searches'] as const) data[key]=data[key].filter(x => !isFollowupId(x.id)) as never
  for (const t of data.tasks.filter(t => t.country === 'cn' && t.industryId === 'cn-agriculture')) if (t.dossier) delete t.dossier.agricultureFollowups
  const industry=data.industries.find(i => i.id === 'cn-agriculture')!
  if (industry.inventory) delete industry.inventory.agricultureFollowups
  const read=(file:string) => JSON.parse(readFileSync(file,'utf8'))
  const hash=(file:string) => createHash('sha256').update(readFileSync(file)).digest('hex')
  const auditFile='research/automation/cn-agriculture-search-audit.json',reviewFile='research/reviews/cn-agriculture-automation-decisions.json'
  return importCnAgriculture(data,raw('firstPass'),read(auditFile),read(reviewFile),read('research/reviews/cn-agriculture-automation-recheck.json'),
    {file:manifest.firstPass.file,sha256:manifest.firstPass.sha256,auditFile,auditSha256:hash(auditFile),reviewFile,reviewSha256:hash(reviewFile)})
}
const task = (data: Research, id: string) => data.tasks.find(t => t.id === id)!
const catalogue = (data: Research): Raw => data.industries.find(i => i.id === 'cn-agriculture')!.inventory!.agricultureFollowups as Raw
const dossier = (data: Research, id: string): Raw => task(data,id).dossier!.agricultureFollowups as Raw
const originalDefinition = (t: Task) => ({id:t.id,country:t.country,industryId:t.industryId,scenarioId:t.scenarioId,countingRole:t.countingRole,title:t.title,boundary:t.boundary,phase:t.phase,inputs:t.inputs,outputs:t.outputs,acceptance:t.acceptance,predecessors:t.predecessors,workflowEvidence:t.workflowEvidence,occupationEvidence:t.occupationEvidence,discovery:t.discovery,originalTask:t.dossier?.originalTask})
const isFollowupId = (id: string) => id.startsWith('followup-cn-agriculture-') || id.startsWith('supplement-cn-agriculture-')
let before: Research, after: Research

beforeAll(() => {
  before = fixture()
  after = importCnAgricultureFollowups(structuredClone(before),files)
})

describe('review-bound CN agriculture followup append', () => {
  it('verifies each actual file and preserves the independent review → revision → limited recheck chain', () => {
    for (const pin of Object.values(manifest)) expect(createHash('sha256').update(files[pin.file],'utf8').digest('hex')).toBe(pin.sha256)
    expect(raw('scopedRecheck').inputSHA256).toBe(manifest.scoped.sha256)
    expect(raw('scopedRecheck').revisionsSHA256).toBe(manifest.scopedRevisions.sha256)
    expect(raw('scoped').reviewedInputSHA256).toBe(raw('scopedReview').inputSHA256)
    expect(raw('supplementRecheck').inputs[manifest.supplementReview.file]).toBe(manifest.supplementReview.sha256)
    expect(raw('supplementRecheck').originalReviewInputSHA256).toBe(raw('supplementReview').input.sha256)
    expect(catalogue(after).provenance).toEqual(manifest)
  })

  it.each(Object.keys(manifest) as (keyof typeof manifest)[])('rejects any changed bytes in %s even with unchanged embedded provenance', key => {
    const input = structuredClone(before), serialized = JSON.stringify(input)
    expect(() => importCnAgricultureFollowups(input,{...files,[manifest[key].file]:files[manifest[key].file]+'\n'})).toThrow('实际文件 SHA 不匹配')
    expect(JSON.stringify(input)).toBe(serialized)
  })

  it('adds 24 adopted sources, 30 bounded claims and exactly 166 existing-task searches, with no deletions', () => {
    expect(after.sources.length-before.sources.length).toBe(24)
    expect(after.claims.length-before.claims.length).toBe(30)
    expect(after.searches.length-before.searches.length).toBe(166)
    for (const name of ['sources','claims','searches'] as const) {
      const indexed = new Map(after[name].map(x => [x.id,x]))
      for (const old of before[name]) expect(indexed.get(old.id)).toEqual(old)
    }
    expect(validateResearch(after).tasks.length).toBe(before.tasks.length)
    expect(after.sources.filter(s => isFollowupId(s.id))).toHaveLength(24)
    expect(catalogue(after).scoped.unadoptedCandidates).toHaveLength(11)
    expect(catalogue(after).scoped.unadoptedCandidates.filter((s:Raw) => s.status === 'retain-fetch-gap')).toHaveLength(6)
    for (const excluded of catalogue(after).scoped.unadoptedCandidates) expect(after.sources.some(s => s.id === 'followup-cn-agriculture-'+excluded.id.toLowerCase())).toBe(false)
  })

  it('preserves every parent definition, old mechanism, old dossier, evidence gap and research count', () => {
    expect(after.tasks.map(t => t.id)).toEqual(before.tasks.map(t => t.id))
    expect(researchCoverage(after)).toEqual(researchCoverage(before))
    for (const old of before.tasks) {
      const t = task(after,old.id)
      expect(originalDefinition(t)).toEqual(originalDefinition(old))
      expect(t.researchStatus).toBe(old.researchStatus)
      expect(t.manualInputs).toEqual(old.manualInputs)
      expect(t.review).toEqual(old.review)
      expect(t.summary).toBe(old.summary)
      expect(t.dossier?.publicResearch).toEqual(old.dossier?.publicResearch)
      expect(t.alternatives.slice(0,old.alternatives.length)).toEqual(old.alternatives)
      expect(t.barriers).toEqual(old.barriers)
      for (const key of ['conclusionIds','counterevidenceIds','searchIds','evidenceGaps','interviewQuestions'] as const) expect(t[key]).toEqual(expect.arrayContaining(old[key]))
    }
    expect(after.scenarios).toEqual(before.scenarios)
    expect(after.observations).toEqual(before.observations)
    expect(after.countries).toEqual(before.countries)
    expect(after.version).toBe(before.version)
    expect(after.freezeStatus).toBe(before.freezeStatus)
  })

  it('makes no change to US or other CN industries and keeps every added association in CN agriculture', () => {
    expect(after.tasks.filter(t => t.industryId !== 'cn-agriculture')).toEqual(before.tasks.filter(t => t.industryId !== 'cn-agriculture'))
    expect(after.industries.filter(i => i.id !== 'cn-agriculture')).toEqual(before.industries.filter(i => i.id !== 'cn-agriculture'))
    for (const name of ['sources','claims','searches'] as const) expect(after[name].filter(x => x.country === 'us')).toEqual(before[name].filter(x => x.country === 'us'))
    for (const search of after.searches.filter(s => isFollowupId(s.id))) {
      expect(search.country).toBe('cn')
      expect(task(after,search.taskId).industryId).toBe('cn-agriculture')
      expect(task(after,search.taskId).country).toBe('cn')
      expect(search.results).toEqual([])
      expect(search.outcome).toBe('completed-candidates-unattributed')
    }
  })

  it('keeps 12 partial, 1 adjacent and 70 empty scoped outcomes without replacing old mechanisms', () => {
    const outcomes = raw('scoped').taskOutcomes as Raw[]
    expect(outcomes.filter(o => o.status === 'partial-mechanism-with-conditions')).toHaveLength(12)
    expect(outcomes.filter(o => o.status === 'adjacent-process-only')).toHaveLength(1)
    expect(outcomes.filter(o => o.status === 'no-additional-retained-matching-mechanism')).toHaveLength(70)
    for (const outcome of outcomes) {
      const old = task(before,outcome.taskId), t = task(after,outcome.taskId)
      expect(dossier(after,t.id).scoped.outcome).toEqual(outcome)
      expect(t.searchIds.length-old.searchIds.length).toBe(2)
      if (!outcome.claimIds.length) {
        expect(t.alternatives).toEqual(old.alternatives)
        expect(t.conclusionIds).toEqual(old.conclusionIds)
      }
    }
    const existing = outcomes.filter(o => o.existingFirstPassHasClaimRefsAtReview)
    expect(existing).toHaveLength(10)
    for (const o of existing) expect(task(after,o.taskId).alternatives.slice(0,task(before,o.taskId).alternatives.length)).toEqual(task(before,o.taskId).alternatives)
    expect(catalogue(after).scoped.queryAuditBoundary.versionBoundary.auditSearchPlanningFirstPassSHA256).not.toBe(manifest.firstPass.sha256)
  })

  it('adds three existing links without creating or borrowing searches, including adjacent shrimp water treatment', () => {
    for (const link of raw('scoped').additionalExistingTaskDecisions) {
      expect(task(after,link.taskId).searchIds).toEqual(task(before,link.taskId).searchIds)
      expect(dossier(after,link.taskId).scopedAdditional.queries).toEqual([])
      expect(dossier(after,link.taskId).scopedAdditional.countAsQueriedTask).toBe(false)
      expect(dossier(after,link.taskId).scopedAdditional.countAsNewTask).toBe(false)
    }
    for (const id of ['cn-ag-pond-shrimp-003','cn-ag-pond-shrimp-005']) {
      expect(task(after,id).alternatives).toEqual(task(before,id).alternatives)
      const claim = dossier(after,id).scopedAdditional.claims[0]
      expect(claim.statement).toContain('种苗繁育海水处理')
      expect(claim.boundary).toContain('未证明两级池上层取水')
    }
  })

  it('retains the 22 pending records, 44+6 queries and 12 proposed children without creating canonical tasks or searches', () => {
    const supplement = catalogue(after).supplement
    expect(supplement.items).toHaveLength(22)
    expect(supplement.items.filter((x:Raw) => x.parentTaskIds.length)).toHaveLength(10)
    expect(supplement.items.filter((x:Raw) => !x.parentTaskIds.length)).toHaveLength(12)
    expect(supplement.items.reduce((n:number,x:Raw) => n+x.record.definitionReview.splitSuggestions.length,0)).toBe(12)
    expect(supplement.queryAudit.searches).toHaveLength(22)
    expect(supplement.queryAudit.adaptiveQueries.flatMap((q:Raw) => q.queries)).toHaveLength(6)
    expect(after.searches.filter(s => s.id.startsWith('supplement-cn-agriculture-'))).toEqual([])
    for (const item of supplement.items) {
      expect(after.tasks.some(t => t.id === item.id.toLowerCase())).toBe(false)
      expect(item.canonicalTaskCreated).toBe(false)
      expect(item.canonicalSearchCreated).toBe(false)
      expect(item.researchedTaskCountContribution).toBe(0)
      expect(item.originalRequestUTC).toBeNull()
      expect(item.queryAuditStatus.mainDateIndependentlyVerified).toBe(false)
      for (const id of item.parentTaskIds) expect(dossier(after,id).supplementItems[item.id].record.overlap).toEqual(item.record.overlap)
    }
    const precool = supplement.items.find((x:Raw) => x.id === 'CN-AG-SUP-mushroom-precool')
    expect(precool.record.executionConditions.performerBoundary).toMatch(/批发|物流|执行/)
    expect(task(after,'cn-ag-mushroom-bags-014').title).toBe(task(before,'cn-ag-mushroom-bags-014').title)
  })

  it('preserves actual scoped UTC, supplement timestamp gaps and combined candidate attribution', () => {
    const original = raw('scopedAudit').queries[0]
    const stored = dossier(after,original.taskId).scoped.queries.find((q:Raw) => q.id === original.id)
    expect(stored.startedAtUTC).toBe(original.startedAtUTC)
    expect(stored.completedAtUTC).toBe(original.completedAtUTC)
    expect(stored.rawBatchSHA256).toBe(original.rawBatchSHA256)
    expect(catalogue(after).supplement.queryAudit.independentVerification.supplementalExecutionUTCIndependentlyVerified).toBe(false)
    expect(catalogue(after).supplement.queryAudit).toEqual(raw('supplementAudit'))
    expect(catalogue(after).scoped.batches).toEqual(raw('scopedAudit').batches)
  })

  it('retains residual labor, patent limits, manual branch pulling and task-adjacent evidence without upgrading deployment', () => {
    const claims = after.claims.filter(c => isFollowupId(c.id))
    expect(claims).toHaveLength(30)
    expect(claims.every(c => c.deployment !== 'commercial-operation' && c.numericValue === null)).toBe(true)
    expect(claims.find(c => c.id.endsWith('seedling-vision'))!.deployment).toBe('unknown')
    const branch = task(after,'cn-ag-apple-orchard-005').alternatives.find(a => a.claimIds.some(id => id.endsWith('branch-pull')))!
    expect(branch.category).toBe('assistive-tool')
    expect(branch.conditions.join()).toContain('人仍安装固定')
    const repeat = claims.find(c => c.id.endsWith('fish-repeat'))!
    expect(repeat.evidence[0].locator).toContain('L144')
    expect(repeat.text).toContain('机械损伤且耗费人工')
    const dead = claims.find(c => c.id.endsWith('dead-fish'))!
    expect(dead.conditions.join()).toContain('堵水件插拔未证明自动')
    const water = dossier(after,'cn-ag-mushroom-bags-010').scoped.claims.find((c:Raw) => c.id.endsWith('bag-water'))
    expect(water.verificationQuestions[0].kind).toBe('research-question-not-confirmed-barrier')
    expect(task(after,'cn-ag-mushroom-bags-010').barriers).toEqual(task(before,'cn-ag-mushroom-bags-010').barriers)
    expect(task(after,'cn-ag-apple-orchard-015').alternatives).toEqual(task(before,'cn-ag-apple-orchard-015').alternatives)
  })

  it('adds explicit baseline tools but keeps the air-humidity clarification separate from direct bag watering', () => {
    expect(dossier(after,'cn-ag-mushroom-bags-010').supplementPatches['CN-AG-SUP-PATCH-MUSHROOM-WATER'].references[0].locator).toContain('23、50')
    expect(task(after,'cn-ag-mushroom-bags-010').alternatives.some(a => a.claimIds.some(id => id.startsWith('supplement-cn-agriculture-')))).toBe(false)
    const environment = task(after,'cn-ag-mushroom-bags-009').alternatives.find(a => a.description.includes('水帘风机'))!
    expect(environment.conditions.join()).toContain('要求形成负压')
    for (const id of ['cn-ag-vegetable-fruiting-006','cn-ag-vegetable-fruiting-007']) {
      const tools = task(after,id).alternatives.find(a => a.description.includes('移动升降'))!
      expect(tools.category).toBe('assistive-tool')
      expect(tools.conditions.join()).toContain('不能升级为电动')
    }
    const milk = after.sources.find(s => s.id === 'supplement-cn-agriculture-cn-ag-sup-src-cn-milk-station-2009')!
    expect(milk.published).toBe('2022-08-10')
    expect(milk.dates).toContainEqual(expect.objectContaining({kind:'authored',value:'2009-03-23'}))
    const economics = catalogue(after).supplement.items[0].record.economics
    expect(economics.formula).toContain('delta_WC_inc_t = WC_inc_t - WC_inc_(t-1)')
    for (const key of ['deploymentCapex','integrationAndTrainingCost','residualLaborCost','maintenanceAndDowntimeCost','incrementalContribution','paybackYears','breakEvenThreshold']) expect(economics[key]).toBeNull()
  })

  it('is byte-equivalent on a second import and never mutates its input object', () => {
    const input = structuredClone(before), inputBytes = JSON.stringify(input)
    const first = importCnAgricultureFollowups(input,files)
    expect(JSON.stringify(input)).toBe(inputBytes)
    expect(JSON.stringify(importCnAgricultureFollowups(first,files))).toBe(JSON.stringify(first))
  })

  it('can restore the appended evidence after the existing 164-task importer is rerun', () => {
    const read = (file:string) => JSON.parse(readFileSync(file,'utf8'))
    const hash = (file:string) => createHash('sha256').update(readFileSync(file)).digest('hex')
    const auditFile = 'research/automation/cn-agriculture-search-audit.json', reviewFile = 'research/reviews/cn-agriculture-automation-decisions.json'
    const baseline = importCnAgriculture(structuredClone(after),raw('firstPass'),read(auditFile),read(reviewFile),read('research/reviews/cn-agriculture-automation-recheck.json'),
      {file:manifest.firstPass.file,sha256:manifest.firstPass.sha256,auditFile,auditSha256:hash(auditFile),reviewFile,reviewSha256:hash(reviewFile)})
    const restored = importCnAgricultureFollowups(baseline,files)
    // The existing main importer moves the wheat 404 note before its review note
    // on re-entry. Compare that unordered note list without masking other changes.
    const withSortedNotes = (rows:Task[]) => rows.map(t => ({...t,discovery:t.discovery ? {...t.discovery,sourceLimitations:[...t.discovery.sourceLimitations].sort()} : undefined}))
    expect(withSortedNotes(restored.tasks)).toEqual(withSortedNotes(after.tasks))
    expect(restored.sources.length).toBe(after.sources.length)
    expect(restored.claims.length).toBe(after.claims.length)
    expect(restored.searches.length).toBe(after.searches.length)
    expect(validateResearch(restored).tasks.length).toBe(after.tasks.length)
  })

  it.each(['country','definition','phase','cash','base-version','freeze','missing-parent'])('rejects changed canonical %s without partially adding records', change => {
    const input = structuredClone(before), t = task(input,'cn-ag-wheat-field-001')
    if (change === 'country') t.country = 'us'
    if (change === 'definition') t.acceptance = ['不同验收对象']
    if (change === 'phase') t.phase = 'delivery'
    if (change === 'cash') (t.dossier!.publicResearch as Raw).economics.deploymentCapex = 0
    if (change === 'base-version') (t.dossier!.publicResearch as Raw).provenance.sha256 = '0'.repeat(64)
    if (change === 'freeze') input.freezeStatus = 'frozen'
    if (change === 'missing-parent') input.tasks = input.tasks.filter(x => x.id !== t.id)
    const snapshot = JSON.stringify(input)
    expect(() => importCnAgricultureFollowups(input,files)).toThrow('农业追加导入')
    expect(JSON.stringify(input)).toBe(snapshot)
  })

  it('rejects a changed previously imported record rather than deleting or overwriting it', () => {
    const input = structuredClone(after)
    input.claims.find(c => c.id.startsWith('followup-cn-agriculture-'))!.text = '未经复核的新结论'
    const snapshot = JSON.stringify(input)
    expect(() => importCnAgricultureFollowups(input,files)).toThrow('已有追加记录发生冲突')
    expect(JSON.stringify(input)).toBe(snapshot)
  })

  it('rejects conflicting appended mechanism text while retaining the untouched input', () => {
    const input = structuredClone(after)
    task(input,'cn-ag-wheat-field-007').alternatives.find(a => a.claimIds.some(id => id.startsWith('followup-cn-agriculture-')))!.description = '已确认全面无人化'
    const snapshot = JSON.stringify(input)
    expect(() => importCnAgricultureFollowups(input,files)).toThrow('已有追加方案发生冲突')
    expect(JSON.stringify(input)).toBe(snapshot)
  })
  it('is idempotent after schema validation, JSON storage and object-key reordering',()=>{
    const reorder=(v:any):any=>Array.isArray(v)?v.map(reorder):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().reverse().map(k=>[k,reorder(v[k])])):v
    const stored=JSON.parse(JSON.stringify(reorder(validateResearch(after)))) as Research
    expect(importCnAgricultureFollowups(stored,files)).toEqual(validateResearch(after))
  })

})
