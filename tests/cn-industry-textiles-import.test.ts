import {readFileSync} from 'node:fs'
import {beforeAll,describe,expect,it} from 'vitest'
import {cnIndustryTextilesFiles as manifest,importCnIndustryTextiles} from '../src/research/import-cn-industry-textiles'
import {createTaskPageBuilder} from '../src/research/site'
import {researchCoverage,validateResearch} from '../src/research/validate'
import type {Research,Task} from '../src/research/schema'

type Raw=Record<string,any>
const files=Object.fromEntries(Object.values(manifest).map(p=>[p.file,readFileSync(p.file,'utf8')]))
const raw=(key:keyof typeof manifest):Raw=>JSON.parse(files[manifest[key].file])
const main=raw('main'),ids=new Set<string>(main.tasks.map((t:Raw)=>t.id))
const own=(id:string)=>id.startsWith('automation-cn-textiles-')
const task=(data:Research,id:string)=>data.tasks.find(t=>t.id===id)!
const pub=(t:Task):Raw=>t.dossier!.publicResearch as Raw
const cat=(data:Research):Raw=>data.industries.find(i=>i.id==='cn-industry')!.inventory!.textilesResearch as Raw
const core=(t:Task)=>({id:t.id,country:t.country,industryId:t.industryId,scenarioId:t.scenarioId,title:t.title,boundary:t.boundary,inputs:t.inputs,outputs:t.outputs,acceptance:t.acceptance,phase:t.phase,predecessors:t.predecessors,countingRole:t.countingRole})
const reorder=(value:any):any=>Array.isArray(value)?value.map(reorder):value && typeof value==='object'?Object.fromEntries(Object.keys(value).reverse().map(k=>[k,reorder(value[k])])):value
let before:Research,after:Research
beforeAll(()=>{
  before=JSON.parse(readFileSync('data/research.json','utf8'))
  after=importCnIndustryTextiles(before,files)
})

describe('CN textiles 136 existing candidates with complete review binding',()=>{
  it('retains every original definition and snapshot, macro observation and other-country record',()=>{
    expect(after.tasks.map(core)).toEqual(before.tasks.map(core))
    expect(after.scenarios).toEqual(before.scenarios)
    expect(after.observations).toEqual(before.observations)
    expect(after.countries).toEqual(before.countries)
    expect(after.version).toBe(before.version)
    expect(after.checkedAt).toBe(before.checkedAt)
    expect(after.publishedAt).toBe(before.publishedAt)
    expect(after.freezeStatus).toBe(before.freezeStatus)
    expect(researchCoverage(after).map(c=>[c.country,c.tasks,c.reviewedTasks])).toEqual(researchCoverage(before).map(c=>[c.country,c.tasks,c.reviewedTasks]))
    expect(after.tasks.filter(t=>ids.has(t.id))).toHaveLength(136)
    for (const o of main.tasks) expect(task(after,o.id).dossier!.originalTask).toEqual(o.originalTask)
    for (const t of before.tasks.filter(t=>!ids.has(t.id))) expect(task(after,t.id)).toEqual(t)
    for (const i of before.industries.filter(i=>i.id!=='cn-industry')) expect(after.industries.find(x=>x.id===i.id)).toEqual(i)
    const {textilesResearch:_a,...otherAfter}=after.industries.find(i=>i.id==='cn-industry')!.inventory!
    const {textilesResearch:_b,...otherBefore}=before.industries.find(i=>i.id==='cn-industry')!.inventory!
    expect(otherAfter).toEqual(otherBefore)
  })

  it('adds the expected ID sets without deletion and remains valid after canonical publication',()=>{
    expect(after.sources.filter(s=>own(s.id))).toHaveLength(39)
    expect(after.claims.filter(c=>own(c.id))).toHaveLength(1486)
    expect(after.searches.filter(q=>own(q.id))).toHaveLength(272)
    for (const name of ['sources','claims','searches'] as const) {
      const lookup=new Map(after[name].map(x=>[x.id,x])),oldIds=new Set(before[name].map(x=>x.id))
      for (const old of before[name]) expect(lookup.get(old.id)).toEqual(old)
      expect(after[name].length-before[name].length).toBe(after[name].filter(x=>!oldIds.has(x.id)).length)
    }
  })

  it('returns a new validated object without mutating input',()=>{
    const input=structuredClone(before),snapshot=JSON.stringify(input),result=importCnIndustryTextiles(input,files)
    expect(JSON.stringify(input)).toBe(snapshot)
    expect(result).not.toBe(input)
    expect(result.tasks).not.toBe(input.tasks)
    expect(validateResearch(result)).toEqual(result)
  })

  it.each(Object.keys(manifest) as (keyof typeof manifest)[])('rejects changed bytes of %s before any mutation',key=>{
    const input=structuredClone(before),snapshot=JSON.stringify(input)
    expect(()=>importCnIndustryTextiles(input,{...files,[manifest[key].file]:files[manifest[key].file]+'\n'})).toThrow('实际文件 SHA 不匹配')
    expect(JSON.stringify(input)).toBe(snapshot)
  })

  it('binds the old review and revision to the first recheck and final RC01 two-field receipt',()=>{
    expect(raw('revisions').inputSha256).toBe(raw('review').inputSha256)
    expect(raw('revisions').outputSha256).toBe(raw('recheck').inputRawSha256)
    expect(raw('limitedRevisions').inputSha256).toBe(raw('recheck').inputRawSha256)
    expect(raw('limitedRevisions').outputSha256).toBe(manifest.main.sha256)
    expect(raw('finalRecheck').afterSha256).toBe(manifest.main.sha256)
    expect(raw('finalRecheck').authorReceiptSha256).toBe(manifest.limitedRevisions.sha256)
    expect(raw('finalRecheck').actualDiffPathCount).toBe(2)
    expect(cat(after).provenance).toEqual(manifest)
    expect(Object.isFrozen(manifest.main)).toBe(true)
  })

  it('keeps 61 matched mechanisms, 1 unverified term, 1 catalogue, 2 adjacent and 71 unmatched separate',()=>{
    const counts:Record<string,number>={}
    for (const t of after.tasks.filter(t=>ids.has(t.id))) {
      const p=pub(t);counts[p.evidenceSupportTier]=(counts[p.evidenceSupportTier]??0)+1
      expect(t.researchStatus).toBe('in-progress');expect(p.canFreeze).toBe(false)
    }
    expect(counts).toEqual({'bounded-direct-or-partial-action-mechanism':61,'conditional-roughing-mechanism-terminology-unverified':1,'equipment-or-route-scope-only':1,'adjacent-evidence-only-no-current-task-mechanism':2,'insufficient-matched-evidence-after-search':71})
    expect(cat(after).evidenceSupportTierCounts).toEqual(counts)
    expect(cat(after).tasksOutsideDirectOrPartialMechanismTier).toBe(75)
    expect(cat(after).statisticsBoundary).toContain('旧 62 有限线索包含术语待核项')
    const t=task(after,'cn-ind-textile-printing-002')
    expect(t.alternatives[0].conditions).toContain('资料中存在与当前对象相关的条目；具体支持程度以证据层级为准。')
    expect(t.alternatives[0].conditions).toContain('当前资料不足以确认本任务的直接动作机制。')
    expect(t.summary).toContain('仅有设备')
  })

  it('separates RC01 spinning-machine cleaning from the other occupation entry supporting recovered cotton',()=>{
    const t=task(after,'cn-ind-cotton-spinning-014'),p=pub(t)
    const detail='纺纱工任务8只支持机台清理；回花回收由另一前处理/粗纱条目支持，输出仍需分核。'
    expect(t.summary).toContain(detail)
    expect(p.definitionReview.note).toContain(detail)
    expect(p.definitionReview.actionSupport.find((r:Raw)=>r.locatorId==='spinning').detail).toBe(detail)
    expect(t.occupationEvidence.find(e=>e.locator.includes('纺纱工任务8'))!.locator).toContain(detail)
    expect(t.occupationEvidence.find(e=>e.locator.includes('开清棉工任务5'))!.locator).toContain('回花')
    expect(p.finalFieldRechecks).toHaveLength(2)
    expect(t.alternatives[0].description).toContain('不含全部回花分类回收')
    expect(p.definitionReview.proposedChildrenCounted).toBe(false)
  })

  it('keeps DOSE pipe cleaning as catalogue-level equipment and DYE nozzle cleaning as an independent mechanism',()=>{
    const t=task(after,'cn-ind-textile-dyeing-010'),page=createTaskPageBuilder(after)(t)
    expect(t.alternatives[0].description).toContain('喷嘴')
    expect(t.alternatives[0].conditions).toContain('当前资料支持所限定动作的局部机制；完整验收仍待核实。')
    expect(t.alternatives[1].description).toContain('液体助剂配送系统')
    expect(t.alternatives[1].description).toContain('仅有设备范围，尚未读到本任务动作机制')
    expect(t.alternatives[1].conditions).toContain('当前资料不足以确认本任务的直接动作机制。')
    expect(t.summary).toContain('OP2 仅关联后一管路')
    const op=page.claims.find(c=>c.id.endsWith('-opportunity-0'))!
    expect(op.evidence.map(e=>e.sourceId)).toEqual(['automation-cn-textiles-cn-textile-donpro-dose','automation-cn-textiles-cn-textile-donpro-dose'])
    expect(op.text).toContain('染机喷嘴与滤毛不在此机会对象内')
    expect(page.claims.some(c=>c.id==='automation-cn-textiles-cn-textile-donpro-dose-clean')).toBe(true)
    expect(page.claims.some(c=>c.id==='automation-cn-textiles-cn-textile-donpro-dye-clean')).toBe(true)
  })

  it('does not turn metal detection into auto-stop or handling into garment thermal shaping',()=>{
    const stop=after.claims.find(c=>c.id==='automation-cn-textiles-cn-textile-dongjia-card-stops')!
    expect(stop.text).toContain('原文未说明其自动停车联锁')
    expect(stop.text).toContain('排障亦未证自动完成')
    const t=task(after,'cn-ind-garment-sew-003')
    expect(pub(t).evidenceSupportTier).toBe('adjacent-evidence-only-no-current-task-mechanism')
    expect(t.alternatives[0].description).toContain('不代表压烫成型')
    expect(t.alternatives[0].conditions).toContain('当前资料不足以确认本任务的直接动作机制。')
  })

  it('classifies compound source/applicability statements as judgments while preserving directly described mechanisms',()=>{
    const lookup=new Map(after.claims.map(c=>[c.id,c]))
    for (const suffix of ['cn-textile-dongjia-card-stops','cn-textile-woolmark-limits','cn-textile-donpro-dose-clean','cn-textile-aitu-stage','cn-textile-sailstar-human','cn-textile-ihua-polish','cn-textile-juki-buttonhole-edition']) {
      const c=lookup.get('automation-cn-textiles-'+suffix)!
      expect(c.kind).toBe('judgment');expect(c.text).toMatch(/^来源范围判读：/)
      expect(c.conditions.length).toBeGreaterThan(0);expect(c.evidence[0]!.locator).toBeTruthy()
    }
    for (const suffix of ['cn-textile-dongjia-card-card','cn-textile-woolmark-wash','cn-textile-ihua-rough','cn-textile-shoe-report-gluepress']) {
      const c=lookup.get('automation-cn-textiles-'+suffix)!
      expect(c.kind).toBe('fact');expect(c.text).toMatch(/^来源陈述：/)
    }
    const shared=after.claims.filter(c=>own(c.id) && !c.taskId)
    expect(shared).toHaveLength(81)
    expect(shared.filter(c=>c.kind==='judgment')).toHaveLength(28)
    expect(shared.filter(c=>c.kind==='fact')).toHaveLength(53)
  })

  it('preserves the original sports-shoe candidate while making cloth-shoe support and roughing terminology conditional',()=>{
    for (const tid of ['cn-ind-shoe-upper-cut-sew-001','cn-ind-shoe-upper-cut-sew-002']) {
      const t=task(after,tid)
      expect(core(t)).toEqual(core(task(before,tid)))
      expect(t.boundary).toContain('运动鞋')
      expect(pub(t).definitionReview.note).toContain('布鞋')
      expect(t.occupationEvidence.every(e=>e.locator.includes('cloth-shoe-route-only-current-sports-material-applicability-unverified'))).toBe(true)
      expect(t.evidenceGaps.join('；')).toContain('适用性未由该条直接证明')
    }
    const rough=task(after,'cn-ind-shoe-coldglue-form-007')
    expect(pub(rough).evidenceSupportTier).toBe('conditional-roughing-mechanism-terminology-unverified')
    expect(rough.summary).toContain('等价关系待核')
    expect(rough.alternatives[0].conditions).toContain('当前资料不足以确认本任务的直接动作机制。')
    expect(rough.workflowEvidence[0].locator).toContain('planned-project')
  })

  it('displays all corrected definition roles without claiming occupation or HJ gives full task acceptance',()=>{
    for (const original of main.tasks) {
      const t=task(after,original.id),refs=original.executionConditions.reviewedDefinitionSourceRefs
      expect(pub(t).definitionReview.actionSupport).toEqual(refs)
      for (const ref of refs) {
        const list=ref.sourceId==='cn-occ-2022-draft'?t.occupationEvidence:t.workflowEvidence
        expect(list.some(e=>e.locator.includes(ref.section) && e.locator.includes(ref.detail) && e.locator.includes(ref.supportRole))).toBe(true)
      }
      expect(t.evidenceGaps).not.toContain('库存流程与职业路径仍待独立复核及行业遗漏补齐。')
      expect(pub(t).definitionReview.note).toContain('已完成所列原文范围的首轮独立审校')
      expect(t.discovery!.supportStatus).toBe('candidate-with-reviewed-boundaries-not-frozen')
    }
  })

  it('keeps all 23 existing split proposals and shared winding/stenter operations uncounted',()=>{
    const proposed=after.tasks.filter(t=>ids.has(t.id) && pub(t).definitionReview.granularityDisposition==='proposed-split')
    expect(proposed).toHaveLength(23)
    expect(proposed.every(t=>pub(t).definitionReview.proposalStatus==='existing-proposal-not-approved' && pub(t).definitionReview.proposedChildrenCounted===false)).toBe(true)
    expect(cat(after).newTaskCount).toBe(0)
    for (const m of main.sharedOperationMappings) for (const tid of m.taskIds) {
      expect(task(after,tid).evidenceGaps).toContain('待现场核验的共用边界：'+m.rule)
      expect(pub(task(after,tid)).overlapMappings.find((x:Raw)=>x.id===m.id).siteRelationshipVerified).toBe(false)
    }
  })

  it('keeps 272 main queries and 16 supplementary queries in seven original groups without manufacturing execution times',()=>{
    const audit=raw('audit'),searches=after.searches.filter(s=>own(s.id))
    for (const q of audit.taskQueries) {
      const s=searches.find(x=>x.id==='automation-cn-textiles-'+q.id.toLowerCase())!
      expect(s.query).toBe(q.query);expect(s.searchedOn).toBe(q.executedAt)
      expect(s.taskId).toBe(q.taskId);expect(s.results).toEqual([])
      expect(s.outcome).toBe('completed-candidates-unattributed')
      expect(s.audit).toEqual({file:manifest.audit.file,id:q.id,sha256:manifest.audit.sha256})
      expect(pub(task(after,q.taskId)).originalRequestUTC).toBeNull()
      expect(s.note).toContain('无独立调用前UTC')
    }
    const a=cat(after).queryAudit
    expect(a.resultPools).toEqual(audit.resultPools)
    expect(a.supplementalSearches).toEqual(audit.supplementalSearches)
    expect(a.supplementalSearches).toHaveLength(7)
    expect(a.supplementalSearches.reduce((n:number,x:Raw)=>n+x.queries.length,0)).toBe(16)
    expect(a.supplementalProvenance).toContain('私请求无日期')
    expect(a.originalRequestUTC).toBeNull()
  })

  it('preserves historical dates, uncertain publication dates, document editions and planned EIA status',()=>{
    const sources=new Map(after.sources.map(s=>[s.id,s]))
    for (const s of main.sources) {
      const got=sources.get('automation-cn-textiles-'+s.id.toLowerCase())!
      expect(got.published).toBe(s.publishedAt);expect(got.readStatus).toBe(s.readStatus)
      expect(got.evidencePeriod).toBe(s.evidencePeriod)
      expect(got.limitations).toContain(s.hashRepresentation)
    }
    const sail=sources.get('automation-cn-textiles-cn-textile-sailstar')!
    expect(sail.published).toBe('2021-11-15');expect(sail.publishedLabel).toContain('转载')
    expect(sail.dates).toContainEqual({kind:'authored',value:'2018',note:expect.stringContaining('第 5 期')})
    const juki=sources.get('automation-cn-textiles-cn-textile-juki-buttonhole')!
    expect(juki.published).toBeNull()
    expect(juki.dates).toContainEqual({kind:'document-version',value:'2026-05',note:expect.stringContaining('实际发布日期未注明')})
    const eia=sources.get('automation-cn-textiles-cn-shoe-xtep-eia-2022')!
    expect(eia.published).toBeNull()
    expect(eia.dates).toContainEqual({kind:'authored',value:'2022-07',note:expect.stringContaining('报告编制月份')})
    expect(eia.limitations.join('；')).toContain('当时未生产')
    expect(sources.get('automation-cn-textiles-cn-textile-shoe-report')!.evidencePeriod).toContain('厂长称')
  })

  it('retains all cash and human values as null, complete replacement/exit costs and adjacent-period working capital',()=>{
    for (const o of main.tasks) {
      const t=task(after,o.id),p=pub(t),cash=p.economics
      expect(cash.parameters).toEqual(o.cashFlow.parameters)
      expect(Object.values(cash.parameters).every(v=>v===null)).toBe(true)
      expect(cash.model).toEqual(main.cashFlowModels[0])
      expect(cash.currency).toBe('CNY')
      for (const f of ['npv','paybackYears','breakEvenPaidHours']) expect(cash[f]).toBeNull()
      expect(cash.workingCapitalDefinition).toContain('WC_t − WC_(t−1)')
      expect(cash.workingCapitalDefinition).toContain('不再重复')
      expect(cash.comparisonScope).toContain('退出')
      expect(cash.model.annualCashFlowFormula).toContain('replacement_capital_expenditure')
      expect(cash.throughputBenefitConstraint).toContain('未满足需求')
      expect(p.originalHumanInput).toEqual(o.humanInput)
      expect(t.manualInputs.every(m=>m.value===null && m.evidence.length===0)).toBe(true)
    }
  })

  it('includes shared evidence and edition anchors on linked pages, keeping missing categories and barriers hypothetical',()=>{
    const build=createTaskPageBuilder(after),claims=new Map(after.claims.map(c=>[c.id,c]))
    for (const t of after.tasks.filter(t=>ids.has(t.id))) {
      const p=build(t),cids=new Set(p.claims.map(c=>c.id)),sids=new Set(p.sources.map(s=>s.id))
      for (const cid of [...t.conclusionIds,...t.alternatives.flatMap(a=>a.claimIds)]) expect(cids.has(cid)).toBe(true)
      for (const d of pub(t).deploymentEvidence) expect(sids.has(d.sourceId)).toBe(true)
      for (const c of p.claims) {
        expect(c.country).toBe('cn')
        if (c.kind!=='hypothesis') expect(c.evidence.length+c.basedOn.length).toBeGreaterThan(0)
        if (c.id.includes('-unmatched-') || c.id.includes('-barrier-')) expect(c.kind).toBe('hypothesis')
        expect(c.deployment).not.toBe('commercial-operation')
      }
      for (const a of t.alternatives) for (const cid of a.claimIds.filter(x=>!claims.get(x)?.taskId)) expect(t.conclusionIds).toContain(cid)
    }
    const page=build(task(after,'cn-ind-garment-sew-005'))
    expect(page.claims.some(c=>c.id==='automation-cn-textiles-cn-textile-juki-buttonhole-edition')).toBe(true)
  })

  it('is idempotent after schema validation, storage and object-key reordering',()=>{
    expect(importCnIndustryTextiles(after,files)).toEqual(after)
    const stored=JSON.parse(JSON.stringify(validateResearch(after)))
    expect(importCnIndustryTextiles(stored,files)).toEqual(after)
    expect(importCnIndustryTextiles(reorder(stored),files)).toEqual(after)
  })

  it.each(['country','definition','snapshot','cash','freeze','existing-source','existing-research','old-reference','array-order'])('rejects %s drift without overwriting input',mode=>{
    const data=structuredClone(after),t=task(data,'cn-ind-cotton-spinning-014')
    if (mode==='country') t.country='us'
    if (mode==='definition') t.title+=' changed'
    if (mode==='snapshot') (t.dossier!.originalTask as Raw).action+=' changed'
    if (mode==='cash') pub(t).economics.parameters.maintenance=1
    if (mode==='freeze') data.freezeStatus='frozen'
    if (mode==='existing-source') data.sources.find(s=>own(s.id))!.title+=' changed'
    if (mode==='existing-research') pub(t).provenance={...pub(t).provenance,main:{...manifest.main,sha256:'0'.repeat(64)}}
    if (mode==='old-reference') t.occupationEvidence=[{sourceId:'inventory-cn-core-cn-occ-2022-draft',locator:'纺纱机台清洁与废料回收范围'}]
    if (mode==='array-order') t.conclusionIds.reverse()
    const snapshot=JSON.stringify(data)
    expect(()=>importCnIndustryTextiles(data,files)).toThrow('纺织导入：')
    expect(JSON.stringify(data)).toBe(snapshot)
  })
})
