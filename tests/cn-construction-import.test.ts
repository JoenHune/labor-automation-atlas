import {readFileSync} from 'node:fs'
import {beforeAll,describe,expect,it} from 'vitest'
import {cnConstructionFiles as manifest,importCnConstruction} from '../src/research/import-cn-construction'
import {createTaskPageBuilder} from '../src/research/site'
import {researchCoverage,validateResearch} from '../src/research/validate'
import type {Research,Task} from '../src/research/schema'

type Raw=Record<string,any>
const files=Object.fromEntries(Object.values(manifest).map(p => [p.file,readFileSync(p.file,'utf8')]))
const raw=(key:keyof typeof manifest):Raw => JSON.parse(files[manifest[key].file])
const own=(id:string) => id.startsWith('automation-cn-construction-') || id.startsWith('baseline-cn-construction-')
const task=(data:Research,id:string) => data.tasks.find(t => t.id === id)!
const tasks=(data:Research) => data.tasks.filter(t => t.country === 'cn' && t.industryId === 'cn-construction')
const publicResearch=(t:Task):Raw => t.dossier!.publicResearch as Raw
const definition=(t:Task) => ({title:t.title,inputs:t.inputs,outputs:t.outputs,acceptance:t.acceptance,phase:t.phase,boundary:t.boundary})
const catalogue=(data:Research):Raw => data.industries.find(i => i.id === 'cn-construction')!.inventory!.constructionResearch as Raw
let before:Research,after:Research
beforeAll(() => {
  before=JSON.parse(readFileSync('data/research.json','utf8'))
  after=importCnConstruction(structuredClone(before),files)
})

describe('review-bound CN construction main research and G02',() => {
  it('imports all 207 parents, 47 sources and 414 task queries with no new task or macro changes',() => {
    expect(validateResearch(after).tasks.length).toBe(before.tasks.length)
    expect(tasks(after)).toHaveLength(207)
    expect(after.sources.filter(s => own(s.id))).toHaveLength(47)
    expect(after.claims.filter(c => own(c.id))).toHaveLength(1832)
    expect(after.searches.filter(s => own(s.id))).toHaveLength(414)
    expect(after.tasks.map(t => t.id)).toEqual(before.tasks.map(t => t.id))
    expect(after.observations).toEqual(before.observations)
    expect(after.countries).toEqual(before.countries)
    expect(after.version).toBe(before.version)
    expect(after.freezeStatus).toBe(before.freezeStatus)
    // Works before and after canonical publication: new records are the absent ID set.
    for (const name of ['sources','claims','searches'] as const) {
      for (const old of before[name]) expect(after[name].find(x => x.id === old.id)).toEqual(old)
      expect(after[name].length-before[name].length).toBe(after[name].filter(x => !before[name].some(old => old.id === x.id)).length)
    }
    expect(researchCoverage(after).map(x => [x.country,x.tasks,x.reviewedTasks])).toEqual(researchCoverage(before).map(x => [x.country,x.tasks,x.reviewedTasks]))
  })

  it.each(Object.keys(manifest) as (keyof typeof manifest)[])('rejects changed actual bytes for %s without partially mutating input',key => {
    const data=structuredClone(before),snapshot=JSON.stringify(data)
    expect(() => importCnConstruction(data,{...files,[manifest[key].file]:files[manifest[key].file]+'\n'})).toThrow('实际文件 SHA 不匹配')
    expect(JSON.stringify(data)).toBe(snapshot)
  })

  it('binds both original independent reviews to revisions and limited rechecks',() => {
    expect(raw('main').reviewedInputSha256).toBe(raw('review').inputSha256)
    expect(raw('recheck').inputSHA256).toBe(manifest.main.sha256)
    expect(raw('recheck').authorRevisionReceiptSHA256).toBe(manifest.revisions.sha256)
    expect(raw('baseline').reviewedInputSha256).toBe(raw('baselineReview').inputs[manifest.baseline.file])
    expect(raw('baselineRecheck').revisionSha256).toBe(manifest.baselineRevisions.sha256)
    expect(raw('baselineRecheck').auditSha256).toBe(manifest.baselineAudit.sha256)
    expect(catalogue(after).provenance).toEqual(manifest)
    expect(catalogue(after).canFreeze).toBe(false)
  })

  it('uses reviewed definitions and actionSupport while preserving all 207 original snapshots',() => {
    for (const original of raw('main').tasks) {
      const t=task(after,original.id),d=original.reviewedDefinition
      expect(t.title).toBe(d.title)
      expect(t.inputs).toEqual(d.inputs)
      expect(t.outputs).toEqual(d.outputs)
      expect(t.acceptance).toEqual([d.acceptance])
      expect(t.dossier!.originalTask).toEqual(original.originalTask)
      expect(t.dossier!.originalTask).toEqual(task(before,t.id).dossier!.originalTask)
      expect(publicResearch(t).reviewedDefinition).toEqual(d)
      expect(t.workflowEvidence).toEqual(original.definitionReview.actionSupport.filter((r:Raw) => r.role === 'workflow').map((r:Raw) => ({sourceId:'automation-cn-construction-'+r.sourceId,locator:[r.locator,r.note].filter(Boolean).join(' · ')})))
      expect(t.occupationEvidence).toEqual(original.definitionReview.actionSupport.filter((r:Raw) => r.role === 'occupation').map((r:Raw) => ({sourceId:'automation-cn-construction-'+r.sourceId,locator:[r.locator,r.note].filter(Boolean).join(' · ')})))
    }
    const tank=task(after,'cn-const-rural-water-tank-005')
    expect(tank.occupationEvidence[0].locator).toContain('PDF物理539页，防水工')
    expect(tank.occupationEvidence.every(r => r.sourceId.startsWith('automation-cn-construction-'))).toBe(true)
    expect((tank.dossier!.originalTask as Raw).sourceRefs.some((r:Raw) => r.locatorId === 'masonry')).toBe(true)
    expect(tasks(after).filter(t => publicResearch(t).definitionReview.children.length)).toHaveLength(25)
    expect(tasks(after).reduce((n,t) => n+publicResearch(t).definitionReview.children.length,0)).toBe(25)
  })

  it('makes paper-board component support, four external acceptance inputs and the shared handoff readable',() => {
    const panel=task(after,'cn-const-light-steel-partition-012'), pr=publicResearch(panel)
    expect(panel.summary).toContain('有原文直接支持')
    expect(panel.summary).toContain('仍为拟议范围')
    expect(pr.definitionReview.note).toContain('填平纸面石膏板钉眼')
    expect(panel.evidenceGaps.join()).toContain('纤维水泥板')
    const gap=after.claims.find(c => c.id === 'automation-cn-construction-'+panel.id+'-component-gap')!
    expect(gap.kind).toBe('hypothesis')
    expect(gap.evidence).toEqual([])
    const external=raw('main').tasks.filter((t:Raw) => t.reviewedDefinition.externalAcceptanceInputs?.length)
    expect(external).toHaveLength(4)
    for (const original of external) {
      const t=task(after,original.id)
      expect(t.summary).toContain('外部验收输入')
      expect(t.evidenceGaps.join()).toContain('外部试验的执行劳动不重复计入')
      expect(t.conclusionIds).toContain('automation-cn-construction-'+t.id+'-executor-interface')
    }
    for (const id of ['cn-const-concrete-pumping-012','cn-const-concrete-frame-cast-003']) {
      const t=task(after,id)
      expect(t.summary).toContain('同一次供料实物交接')
      expect(publicResearch(t).interfaceOverlap.totalHours).toBeNull()
      expect(t.conditions.join()).toContain('不全额重复整次交接')
    }
  })

  it('keeps source dates and evidence levels separate from current deployment',() => {
    const bosch=after.sources.find(s => s.id === 'automation-cn-construction-cn-ct-auto-screw-manual')!
    expect(bosch.published).toBeNull()
    expect(bosch.dates).toContainEqual(expect.objectContaining({kind:'document-version',value:'2023-02-07'}))
    const water=after.sources.find(s => s.id === 'baseline-cn-construction-cn-cbf-s-w')!
    expect(water.published).toBeNull()
    expect(water.dates).toContainEqual(expect.objectContaining({kind:'authored',value:'2013-06'}))
    expect(water.dates).toContainEqual(expect.objectContaining({kind:'displayed',value:'2025-04-17'}))
    expect(after.claims.filter(c => own(c.id)).every(c => c.deployment !== 'commercial-operation')).toBe(true)
    expect(after.sources.find(s => s.id === 'automation-cn-construction-cn-ct-auto-plaster-case')!.published).toBeNull()
  })

  it('keeps missing mechanisms as hypotheses and retains the specifically sourced residual human work',() => {
    for (const original of raw('main').tasks) for (const [i,alternative] of original.alternatives.entries()) {
      const claim=after.claims.find(c => c.id === 'automation-cn-construction-'+original.id+'-alternative-'+i)!
      expect(claim.kind).toBe(alternative.sourceRefs.length ? 'judgment' : 'hypothesis')
      if (!alternative.sourceRefs.length) expect(claim.evidence).toEqual([])
    }
    expect(task(after,'cn-const-rebar-machining-005').alternatives.flatMap(a => a.remainingLabor).join()).toContain('原料入仓和成品下料的人工辅助')
    expect(task(after,'cn-const-rural-water-pipe-008').alternatives.flatMap(a => a.remainingLabor).join()).toContain('焊工与辅助工')
    const rivet=after.claims.find(c => c.id === 'baseline-cn-construction-cn-const-light-steel-partition-005-cn-cbf-g29')!
    expect(rivet.kind).toBe('hypothesis')
    expect(rivet.text).toContain('原文仅列紧固件工艺')
  })

  it('preserves 69 G02 queries once at group level with no inflated parent search counts',() => {
    const c=catalogue(after).baseline,audit=c.groupSearchAudit
    expect(c.groups).toHaveLength(32)
    expect(audit.mainRequests).toHaveLength(32)
    expect(audit.adaptiveRequests).toHaveLength(2)
    expect([...audit.mainRequests,...audit.adaptiveRequests].reduce((n:number,q:Raw) => n+q.request.search_query.length,0)).toBe(69)
    expect(audit).toEqual(raw('baselineAudit'))
    expect(tasks(after).filter(t => publicResearch(t).baselineGroupIds.length)).toHaveLength(38)
    expect(tasks(after).reduce((n,t) => n+publicResearch(t).baselineMappings.length,0)).toBe(44)
    expect(after.searches.filter(s => s.id.startsWith('baseline-cn-construction-'))).toEqual([])
    for (const t of tasks(after)) {
      expect(t.searchIds).toHaveLength(2)
      expect(publicResearch(t).originalRequestUTC).toBeNull()
      expect(publicResearch(t).queryAuditStatus.executionDateIndependentlyVerified).toBe(false)
      for (const m of publicResearch(t).baselineMappings) {
        expect(m.countAsNewTask).toBe(false)
        expect(m.countAsParentSearch).toBe(false)
        expect(m.audit.sha256).toBe(manifest.baselineAudit.sha256)
      }
    }
    expect(catalogue(after).main.additionalQueries.flatMap((x:Raw) => x.queries)).toHaveLength(16)
    expect(audit.mainRequests[0].startedAtUtc).toBe(raw('baselineAudit').mainRequests[0].startedAtUtc)
  })

  it('excludes winch straightening and retains the water compatibility gap and under-4m patent design boundary',() => {
    const rebar=task(after,'cn-const-rebar-machining-003')
    expect(rebar.alternatives.some(a => a.description.includes('卷扬机'))).toBe(false)
    expect(rebar.summary).toContain('历史卷扬机调直不作当前候选')
    expect(rebar.counterevidenceIds).toContain('baseline-cn-construction-'+rebar.id+'-cn-cbf-g03')
    const water=after.claims.find(c => c.id === 'baseline-cn-construction-cn-cbf-e-water')!
    expect(water.conditions.join()).toContain('不能扩大到全产品')
    expect(water.conditions.join()).toContain('未取得饮水池长期浸水与饮用水接触适配资料')
    const hammer=after.claims.find(c => c.id === 'baseline-cn-construction-cn-cbf-e-hammer')!
    expect(hammer.text).toContain('小于 4 m')
    expect(hammer.conditions.join()).toContain('未取得实物原型制作/测试')
    expect(hammer.deployment).toBe('not-applicable')
    const tank=task(after,'cn-const-rural-water-tank-005')
    expect(tank.alternatives.find(a => a.description.includes('机械喷涂'))!.conditions.join()).toContain('暂不作匹配产品')
  })

  it('carries corrected independent clause locators through source facts and all parent mappings',() => {
    for (const suffix of ['m11','m20','m26','m28','m30']) {
      const c=after.claims.find(c => c.id === 'baseline-cn-construction-cn-cbf-'+suffix)!
      expect(c.evidence.length).toBeGreaterThanOrEqual(2)
      expect(c.evidence.every(e => e.locator.includes('LF物理行'))).toBe(true)
    }
    const build=createTaskPageBuilder(after)
    for (const t of tasks(after)) {
      const page=build(t),sourceIds=new Set(page.sources.map(s => s.id)),claimIds=new Set(page.claims.map(c => c.id))
      for (const ref of publicResearch(t).sourceBoundConditions) expect(sourceIds.has(ref.sourceId)).toBe(true)
      for (const mapping of publicResearch(t).baselineMappings) {
        expect(claimIds.has(mapping.canonicalClaimId)).toBe(true)
        for (const bound of mapping.sourceBoundConditions) {
          expect(sourceIds.has(bound.sourceId)).toBe(true)
          expect(claimIds.has(bound.claimId)).toBe(true)
          expect(bound.scope).toContain(mapping.uncoveredAcceptance)
        }
      }
    }
    const linked=new Set(tasks(after).flatMap(t => t.conclusionIds))
    const shared=after.claims.filter(c => own(c.id) && !c.taskId)
    expect(shared).toHaveLength(82)
    for (const c of shared) expect(linked.has(c.id)).toBe(true)
  })

  it('keeps every main cash-flow field and no numeric labor/payback, adding only an explicit exit-cost gap',() => {
    for (const original of raw('main').tasks) {
      const t=task(after,original.id),pr=publicResearch(t)
      for (const [key,value] of Object.entries(original.economics)) expect(pr.economics[key]).toEqual(value)
      expect(pr.economics.exitAndReplacementCostBoundary).toContain('增量替换与退出成本待补')
      expect(pr.economics.formula).toContain('delta_WC_inc_t = WC_inc_t - WC_inc_(t-1)')
      expect(pr.economics.paybackYears).toBeNull()
      expect(t.manualInputs.every(m => m.value === null)).toBe(true)
      expect(t.researchStatus).toBe('in-progress')
      expect(pr.canFreeze).toBe(false)
    }
  })

  it('preserves all other countries and industries and is idempotent without modifying its caller',() => {
    expect(after.tasks.filter(t => t.industryId !== 'cn-construction')).toEqual(before.tasks.filter(t => t.industryId !== 'cn-construction'))
    expect(after.scenarios.filter(s => s.industryId !== 'cn-construction')).toEqual(before.scenarios.filter(s => s.industryId !== 'cn-construction'))
    expect(after.industries.filter(i => i.id !== 'cn-construction')).toEqual(before.industries.filter(i => i.id !== 'cn-construction'))
    const data=structuredClone(before),snapshot=JSON.stringify(data)
    const result=importCnConstruction(data,files)
    expect(JSON.stringify(data)).toBe(snapshot)
    expect(JSON.stringify(importCnConstruction(result,files))).toBe(JSON.stringify(result))
    expect(tasks(importCnConstruction(result,files)).map(definition)).toEqual(tasks(result).map(definition))
  })

  it.each(['country','scenario','snapshot','definition','old-references','cash','freeze','missing-parent'])('rejects a changed canonical %s atomically',kind => {
    const data=structuredClone(after),t=task(data,'cn-const-rural-water-tank-005')
    if (kind === 'country') t.country='us'
    if (kind === 'scenario') t.scenarioId='us-health-test'
    if (kind === 'snapshot') (t.dossier!.originalTask as Raw).acceptance='错误历史快照'
    if (kind === 'definition') t.acceptance=['未复核的新验收']
    if (kind === 'old-references') t.occupationEvidence=[{sourceId:'inventory-cn-core-cn-occ-2022-draft',locator:'归档 masonry 错挂'}]
    if (kind === 'cash') publicResearch(t).economics.paybackYears=0
    if (kind === 'freeze') data.freezeStatus='frozen'
    if (kind === 'missing-parent') data.tasks=data.tasks.filter(x => x.id !== t.id)
    const snapshot=JSON.stringify(data)
    expect(() => importCnConstruction(data,files)).toThrow('建筑导入')
    expect(JSON.stringify(data)).toBe(snapshot)
  })
  it('is idempotent after schema validation, JSON storage and object-key reordering',()=>{
    const reorder=(v:any):any=>Array.isArray(v)?v.map(reorder):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().reverse().map(k=>[k,reorder(v[k])])):v
    const stored=JSON.parse(JSON.stringify(reorder(validateResearch(after)))) as Research
    expect(importCnConstruction(stored,files)).toEqual(validateResearch(after))
  })

})
