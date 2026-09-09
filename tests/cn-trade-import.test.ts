import {readResearchSync} from '../src/research/storage'
import {readFileSync} from 'node:fs'
import {beforeAll,describe,expect,it} from 'vitest'
import {cnTradeFiles as manifest,importCnTrade} from '../src/research/import-cn-trade'
import {createTaskPageBuilder} from '../src/research/site'
import {researchCoverage,validateResearch} from '../src/research/validate'
import type {Research,Task} from '../src/research/schema'

type Raw=Record<string,any>
const files=Object.fromEntries(Object.values(manifest).map(p=>[p.file,readFileSync(p.file,'utf8')]))
const raw=(key:keyof typeof manifest):Raw=>JSON.parse(files[manifest[key].file])
const main=raw('main'),ids=new Set<string>(main.tasks.map((t:Raw)=>t.id))
const sid=(s:string)=>'automation-cn-trade-'+s.toLowerCase()
const own=(id:string)=>id.startsWith('automation-cn-trade-')
const task=(data:Research,id:string)=>data.tasks.find(t=>t.id===id)!
const pub=(t:Task):Raw=>t.dossier!.publicResearch as Raw
const cat=(data:Research):Raw=>data.industries.find(i=>i.id==='cn-wholesale-retail')!.inventory!.tradeResearch as Raw
const identity=(t:Task)=>({id:t.id,country:t.country,industryId:t.industryId,scenarioId:t.scenarioId,boundary:t.boundary,predecessors:t.predecessors,countingRole:t.countingRole})
const reorder=(value:any):any=>Array.isArray(value)?value.map(reorder):value && typeof value==='object'?Object.fromEntries(Object.keys(value).reverse().map(k=>[k,reorder(value[k])])):value
let before:Research,after:Research
beforeAll(()=>{before=readResearchSync(new URL('../data/research.json',import.meta.url));after=importCnTrade(before,files)})

describe('CN wholesale/retail 53 reviewed existing candidates',()=>{
  it('preserves identities, 53 original snapshots, macro series and every non-target task',()=>{
    expect(after.tasks.map(identity)).toEqual(before.tasks.map(identity))
    expect(after.scenarios).toEqual(before.scenarios)
    expect(after.observations).toEqual(before.observations)
    expect(after.countries).toEqual(before.countries)
    for(const key of ['version','checkedAt','publishedAt','freezeStatus'] as const)expect(after[key]).toBe(before[key])
    expect(researchCoverage(after).map(c=>[c.country,c.tasks,c.reviewedTasks])).toEqual(researchCoverage(before).map(c=>[c.country,c.tasks,c.reviewedTasks]))
    expect(after.tasks.filter(t=>ids.has(t.id))).toHaveLength(53)
    for(const o of main.tasks){
      const t=task(after,o.id),d=o.reviewedDefinition
      expect(t.dossier!.originalTask).toEqual(o.originalTask)
      expect(t.title).toBe(d.title);expect(t.inputs).toEqual(d.inputs);expect(t.outputs).toEqual(d.outputs)
      expect(t.acceptance).toEqual(Array.isArray(d.acceptance)?d.acceptance:[d.acceptance])
    }
    for(const t of before.tasks.filter(t=>!ids.has(t.id)))expect(task(after,t.id)).toEqual(t)
    for(const i of before.industries.filter(i=>i.id!=='cn-wholesale-retail'))expect(after.industries.find(x=>x.id===i.id)).toEqual(i)
    const {tradeResearch:_a,...otherAfter}=after.industries.find(i=>i.id==='cn-wholesale-retail')!.inventory!
    const {tradeResearch:_b,...otherBefore}=before.industries.find(i=>i.id==='cn-wholesale-retail')!.inventory!
    expect(otherAfter).toEqual(otherBefore)
  })

  it('adds the same ID sets even after canonical publication and never deletes records',()=>{
    expect(after.sources.filter(s=>own(s.id))).toHaveLength(27)
    expect(after.claims.filter(c=>own(c.id))).toHaveLength(693)
    expect(after.searches.filter(q=>own(q.id))).toHaveLength(106)
    for(const name of ['sources','claims','searches'] as const){
      const lookup=new Map(after[name].map(x=>[x.id,x])),oldIds=new Set(before[name].map(x=>x.id))
      for(const old of before[name])expect(lookup.get(old.id)).toEqual(old)
      expect(after[name].length-before[name].length).toBe(after[name].filter(x=>!oldIds.has(x.id)).length)
    }
  })

  it('returns a new validated object without mutating the original',()=>{
    const input=structuredClone(before),snapshot=JSON.stringify(input),result=importCnTrade(input,files)
    expect(JSON.stringify(input)).toBe(snapshot);expect(result).not.toBe(input);expect(result.tasks).not.toBe(input.tasks)
    expect(validateResearch(result)).toEqual(result)
  })

  it.each(Object.keys(manifest) as (keyof typeof manifest)[])('rejects altered bytes of %s before mutation',key=>{
    const input=structuredClone(before),snapshot=JSON.stringify(input)
    expect(()=>importCnTrade(input,{...files,[manifest[key].file]:files[manifest[key].file]+'\n'})).toThrow('实际文件 SHA 不匹配')
    expect(JSON.stringify(input)).toBe(snapshot)
  })

  it('binds all original review, revision, audit and final seven-field RC01 inputs',()=>{
    const v=raw('revisions'),r=raw('review'),c=raw('recheck'),l=raw('limitedRevisions'),f=raw('finalRecheck')
    expect(v.input.jsonSha256).toBe(r.input.sha256)
    expect(v.input.auditSha256).toBe(r.input.searchAuditSha256)
    expect(v.output.jsonSha256).toBe(c.input[manifest.main.file])
    expect(v.output.auditSha256).toBe(manifest.audit.sha256)
    expect(c.input[manifest.revisions.file]).toBe(manifest.revisions.sha256)
    expect(l.inputSha256).toBe(v.output.jsonSha256);expect(l.outputSha256).toBe(manifest.main.sha256)
    expect(l.independentRecheckSha256).toBe(manifest.recheck.sha256)
    expect(f.input.authorReceiptSHA256).toBe(manifest.limitedRevisions.sha256)
    expect(f.input.currentRawSHA256).toBe(manifest.main.sha256)
    expect(f.changedPaths).toHaveLength(7);expect(Object.values(f.checks).every(v=>v===true)).toBe(true)
    expect(cat(after).provenance).toEqual(manifest);expect(Object.isFrozen(manifest.main)).toBe(true)
  })

  it('keeps 26 partial, 15 adjacent and 12 no-new-result tiers separate and all 18 proposals uncounted',()=>{
    const counts:Record<string,number>={},proposals:Task[]=[]
    for(const o of main.tasks){
      const t=task(after,o.id),p=pub(t);counts[p.evidenceSupportTier]=(counts[p.evidenceSupportTier]??0)+1
      expect(p.evidenceSupportTier).toBe(o.evidenceUseStatus);expect(t.researchStatus).toBe('in-progress');expect(p.canFreeze).toBe(false)
      expect(p.definitionReview.children).toEqual(o.atomicityReview.splitSuggestions.map((c:Raw)=>c.title))
      expect(p.definitionReview.proposedChildrenCounted).toBe(false);expect(p.definitionReview.atomicity.approvedChildCount).toBe(0)
      if(p.definitionReview.children.length)proposals.push(t)
      expect(t.alternatives.map(a=>a.category)).toEqual(['traditional-machine','dedicated-machine','robot','assistive-tool','digital-process'])
    }
    expect(counts).toEqual({'partial-mechanism':26,'adjacent-evidence-only':15,'no-retained-mechanism':12})
    expect(cat(after).evidenceSupportTierCounts).toEqual(counts);expect(proposals).toHaveLength(18)
    expect(cat(after).approvedNewTasks).toBe(0);expect(cat(after).canFreeze).toBe(false)
  })

  it('uses transport-temperature scope and corrected storage references without reviving the old snapshot',()=>{
    const t=task(after,'cn-trade-food-receiving-004')
    expect(t.title).toBe('核验到货食品运输温控状态')
    expect(t.acceptance.join('；')).toContain('食品表面/中心测温是否需要按品类SOP确认')
    expect(t.summary).toContain('运输温度测定')
    expect(t.dossier!.originalTask).toEqual(main.tasks.find((o:Raw)=>o.id===t.id).originalTask)
    const storage=task(after,'cn-trade-food-receiving-007')
    expect(storage.occupationEvidence[0].locator).toContain('仓储管理员任务2')
    expect(storage.workflowEvidence[0].locator).toContain('§5.6、5.7，后者限散装食品')
    expect(storage.occupationEvidence[0].locator).toContain('原引理货员任务5')
    expect(pub(storage).definitionReview.note).toContain('删除错用tally-5')
  })

  it('keeps recall isolation as proposed implementation and separates first/second vapor recovery functional outputs',()=>{
    const recall=task(after,'cn-trade-food-receiving-016')
    expect(recall.discovery!.supportStatus).toBe('proposed')
    expect(recall.summary).toContain('物理隔离是具体实施细分')
    expect(pub(recall).definitionReview.note).toContain('将具体隔离步骤标proposed')
    const first=task(after,'cn-retail-fuel-receive-store-004'),second=task(after,'cn-retail-motor-fuel-retail-002')
    expect(first.outputs).toEqual(['卸油期间一次油气回收回路功能状态','对应运行记录'])
    expect(second.outputs).toEqual(['加油期间二次油气回收功能状态','对应运行记录'])
    expect(second.acceptance[0]).toContain('记录存在不等于功能正常')
  })

  it('keeps report recipient and adjacent management failure readable without a technical-report failure claim',()=>{
    const t=task(after,'cn-retail-motor-fuel-retail-006'),p=pub(t),lookup=new Map(after.claims.map(c=>[c.id,c]))
    expect(t.acceptance[0]).toContain('当地生态环境主管部门')
    expect(t.summary).toContain('当地生态环境主管部门')
    expect(p.definitionReview.note).toContain('不能承接该条款')
    expect(p.finalFieldCorrection).toHaveLength(7)
    expect(t.barriers.filter(b=>b.type==='technical').flatMap(b=>b.claimIds).every(cid=>lookup.get(cid)!.kind==='hypothesis')).toBe(true)
    expect(t.barriers.filter(b=>b.type==='adoption').flatMap(b=>b.claimIds)).toContain(sid('TR-EV-2020-NORESPONSE'))
    expect(t.counterevidenceIds).toContain(sid('TR-EV-2020-NORESPONSE'))
    expect(p.historicalEvents.find((e:Raw)=>e.eventId==='TR-EV-2020-NORESPONSE').relation).toBe('adjacent-management-event-not-report-task-failure')
    expect(p.definitionReview.note).toContain('历史事件关联范围')
  })

  it('renders source roles as Chinese limitations and preserves HJ1249 applicability/version boundaries',()=>{
    for(const o of main.tasks){
      const t=task(after,o.id),p=pub(t)
      for(const r of o.reviewedDefinition.sourceRefs){
        const refs=r.role==='workflow'?t.workflowEvidence:t.occupationEvidence
        expect(refs.some(e=>e.locator.includes(r.locator) && e.locator.includes(r.note) && e.locator.includes('来源作用：'))).toBe(true)
      }
      expect(p.definitionReview.sourceRefs.every((r:Raw)=>/[\u4e00-\u9fff]/.test(r.displayRole))).toBe(true)
      expect(p.definitionReview.note).toContain('现场 SOP')
    }
    const later=after.sources.find(s=>s.id===sid('CN-TR-REVIEW-HJ1249-2022'))!
    expect(later.published).toBe('2022-04-27')
    expect(later.dates).toContainEqual({kind:'effective',value:'2022-07-01',note:expect.stringContaining('现行地方要求')})
    const historic=after.sources.find(s=>s.id===sid('cn-fuelstation-hj1118-2020'))!
    expect(historic.evidenceLevel).toContain('历史标准限定')
    expect(historic.limitations.join('；')).toContain('HJ1200')
    expect(cat(after).automationSources).toBe(23);expect(cat(after).laterDefinitionSources).toBe(1)
  })

  it('separates 42 source statements from 15 evidence boundaries and conservatively classifies the mixed computed-weight sentence',()=>{
    const lookup=new Map(after.claims.map(c=>[c.id,c]))
    for(const c of main.claims){
      const got=lookup.get(sid(c.id))!
      expect(got.kind).toBe(c.id==='CN-TR-CLAIM-COMPUTED-WEIGHT'?'judgment':'fact')
      expect(got.text).toContain(c.statement);expect(got.evidence[0].locator).toBe(c.locator)
      if(c.evidenceBoundary){
        const b=lookup.get(sid(c.id+'-boundary'))!
        expect(b.kind).toBe(c.evidenceBoundary.kind==='hypothesis'?'hypothesis':'judgment')
        expect(b.text).toBe('研究边界：'+c.evidenceBoundary.statement);expect(b.basedOn).toEqual([sid(c.id)])
      }
    }
    expect(main.claims.filter((c:Raw)=>c.evidenceBoundary)).toHaveLength(15)
    expect(lookup.get(sid('CN-TR-CLAIM-COMPUTED-WEIGHT'))!.text).toMatch(/^来源范围判读：/)
    expect(lookup.get(sid('CN-TR-CLAIM-OIL-POS-boundary'))!.kind).toBe('hypothesis')
  })

  it('keeps nine historical index records separated by site/type with narrow event anchors',()=>{
    const lookup=new Map(after.claims.map(c=>[c.id,c]))
    expect(cat(after).historicalEvents).toEqual(main.historicalEvents)
    expect(cat(after).eventCountBoundary).toContain('不等于 9 起独立物理故障')
    for(const e of main.historicalEvents){
      const c=lookup.get(sid(e.id))!
      expect(c.kind).toBe('judgment');expect(c.text).toContain(e.site);expect(c.text).toContain(e.statement)
      expect(c.evidence).toEqual(e.sourceRefs.map((r:Raw)=>({sourceId:sid(r.sourceId),locator:r.locator})))
      expect(c.conditions.join('；')).toContain('不归因本批供应商型号')
      expect(e.currentFailureRate).toBeNull();expect(e.commercialExitEstablished).toBe(false)
    }
    expect(lookup.get(sid('TR-EV-2020-DATA-S'))!.evidence[0].locator).toBe('L49')
    expect(lookup.get(sid('TR-EV-2020-DATA-D'))!.evidence[0].locator).toBe('L50')
    expect(lookup.get(sid('TR-EV-2021-BLOCK'))!.evidence[0].locator).toBe('L108')
    expect(lookup.get(sid('TR-EV-2014-PUMP-X'))!.text).not.toBe(lookup.get(sid('TR-EV-2014-PUMP-B'))!.text)
  })

  it('renders the old repair-delay alias and event ID as one economic analysis per task',()=>{
    for(const tid of ['cn-retail-motor-fuel-retail-002','cn-retail-motor-fuel-retail-005']){
      const t=task(after,tid),p=pub(t)
      expect(t.barriers.filter(b=>b.type==='economic').flatMap(b=>b.claimIds).filter(cid=>cid===sid('TR-EV-2014-COST'))).toHaveLength(1)
      expect(p.legacyEventAliases).toHaveLength(1)
      expect(p.legacyEventAliases[0].eventId).toBe('TR-EV-2014-COST')
      expect(p.legacyEventAliases[0].originalRecord.kind).toBe('observed-historical-maintenance-delay')
      expect(p.historicalEvents.filter((e:Raw)=>e.eventId==='TR-EV-2014-COST')).toHaveLength(1)
      expect(p.definitionReview.note).toContain('不作为两项事件或两笔现金支出')
    }
  })

  it('preserves bare dates, publication/event separation and historical source ages',()=>{
    const lookup=new Map(after.sources.map(s=>[s.id,s])),check=lookup.get(sid('CN-TR-AUTO-CHECK'))!
    expect(check.published).toBeNull()
    expect(check.dates).toContainEqual({kind:'displayed',value:'2026-07-28',note:expect.stringContaining('不是已确认发布日期')})
    expect(check.dateEvidence![0].locator).toBe('L102')
    const event=lookup.get(sid('CN-TR-AUTO-OIL-FAIL-2021'))!
    expect(event.published).toBe('2022-03-22');expect(event.evidencePeriod).toContain('2021 年 9 月事件')
    for(const year of ['2014','2020']){
      const s=lookup.get(sid('CN-TR-AUTO-OIL-FAIL-'+year))!
      expect(s.published).toMatch(new RegExp('^'+year));expect(s.evidenceLevel).toContain('历史')
    }
    for(const s of after.sources.filter(s=>own(s.id)))expect(s.evidenceLevel).toMatch(/[\u4e00-\u9fff]/)
  })

  it('keeps exact 106 queries and the 22 supplements in seven groups without invented UTC or per-technology searches',()=>{
    const audit=raw('audit'),lookup=new Map(after.searches.map(q=>[q.id,q]))
    for(const q of audit.searches){
      for(const [field,direction] of [['positiveQuery','automation'],['negativeQuery','counterevidence']] as const){
        const s=lookup.get(sid(q.id+'-'+direction))!
        expect(s.query).toBe(q[field]);expect(s.taskId).toBe(q.taskId);expect(s.searchedOn).toBe(q.searchedAt)
        expect(s.results).toEqual([]);expect(s.outcome).toBe('completed-candidates-unattributed')
        expect(s.audit).toEqual({file:manifest.audit.file,id:q.id,sha256:manifest.audit.sha256})
        expect(s.note).toContain('没有各技术独立穷尽的证明')
      }
      expect(pub(task(after,q.taskId)).originalRequestUTC).toBeNull()
      expect(pub(task(after,q.taskId)).queryRecord).toEqual(q)
    }
    const a=cat(after).queryAudit
    expect(a.taskQueryPairs).toEqual(audit.searches);expect(a.supplementalGroups).toEqual(audit.additionalQueries)
    expect(a.supplementalGroups).toHaveLength(7)
    expect(a.supplementalGroups.reduce((n:number,q:Raw)=>n+q.queries.length,0)).toBe(22)
    expect(a.originalRequestUTC).toBeNull();expect(a.independentDefinitionQueriesCountedAsTaskSearches).toBe(false)
    expect(a.independentDefinitionQueries).toEqual(raw('review').queryAudit.freshReviewerQueries)
  })

  it('retains full null cash inputs and adjacent-period working capital without duplicate terminal recovery',()=>{
    for(const o of main.tasks){
      const t=task(after,o.id),p=pub(t),e=p.economics
      expect(e).toEqual(o.economics);expect(p.originalHumanInput).toEqual(o.humanInput)
      expect(e.currency).toBe('CNY');expect(e.paybackYears).toBeNull();expect(e.breakEvenThreshold).toBeNull()
      expect(e.replacementCapitalExpenditure).toBeNull();expect(e.decommissioningCost).toBeNull()
      expect(e.formula).toContain('(W_t-W_(t-1))');expect(e.formula).toContain('replacement_capex - decommissioning_cost')
      expect(e.workingCapitalDefinition).toContain('期初扣 W_0');expect(e.workingCapitalDefinition).toContain('不另加回收')
      expect(e.terminalRecoveryRule).toContain('各只计一次')
      expect(e.throughputBenefitConstraint).toContain('不用名义效率推收益')
      expect(t.manualInputs.every(x=>x.value===null && x.evidence.length===0)).toBe(true)
    }
  })

  it('keeps shared claims and their boundaries on task pages, all five categories scoped and unanswered categories hypothetical',()=>{
    const build=createTaskPageBuilder(after),lookup=new Map(after.claims.map(c=>[c.id,c]))
    for(const o of main.tasks){
      const t=task(after,o.id),page=build(t),cids=new Set(page.claims.map(c=>c.id)),sids=new Set(page.sources.map(s=>s.id))
      for(const cid of [...t.conclusionIds,...t.alternatives.flatMap(a=>a.claimIds)])expect(cids.has(cid)).toBe(true)
      for(const d of pub(t).deploymentEvidence){
        expect(sids.has(d.sourceId)).toBe(true);expect(d.fullTaskAcceptanceVerified).toBe(false);expect(d.currentOperationConfirmed).toBe(false)
      }
      for(const [i,a] of o.alternatives.entries()){
        const c=lookup.get(sid(t.id+'-alternative-'+i))!
        expect(c.kind).toBe(a.sourceRefs.length?'judgment':'hypothesis')
        for(const r of a.sourceRefs){
          expect(t.alternatives[i].claimIds).toContain(sid(r.claimId));expect(t.conclusionIds).toContain(sid(r.claimId))
          if(main.claims.find((x:Raw)=>x.id===r.claimId).evidenceBoundary)expect(t.alternatives[i].claimIds).toContain(sid(r.claimId+'-boundary'))
        }
      }
      for(const c of page.claims){
        expect(c.country).toBe('cn');expect(c.deployment).not.toBe('commercial-operation')
        if(c.kind!=='hypothesis')expect(c.evidence.length+c.basedOn.length).toBeGreaterThan(0)
      }
    }
    expect(cat(after).uncoveredScenarios).toEqual(main.uncoveredScenarios)
    expect(cat(after).notes).toEqual(raw('recheck').nonBlockingNotes)
    expect(cat(after).remainingGaps).toEqual(raw('finalRecheck').remainingGaps)
  })

  it('is semantically idempotent after validation, save/reload and object-key reordering',()=>{
    expect(importCnTrade(after,files)).toEqual(after)
    const stored=JSON.parse(JSON.stringify(validateResearch(after)))
    expect(importCnTrade(stored,files)).toEqual(after)
    expect(importCnTrade(reorder(stored),files)).toEqual(after)
  })

  it.each(['country','definition','snapshot','cash','freeze','existing-source','existing-claim','existing-research','old-reference','array-order','inventory-country'])('rejects %s drift without overriding data',mode=>{
    const data=structuredClone(after),t=task(data,'cn-trade-food-receiving-007')
    if(mode==='country')t.country='us'
    if(mode==='definition')t.title+=' changed'
    if(mode==='snapshot')(t.dossier!.originalTask as Raw).action+=' changed'
    if(mode==='cash')pub(t).economics.residualLaborCost=1
    if(mode==='freeze')data.freezeStatus='frozen'
    if(mode==='existing-source')data.sources.find(s=>own(s.id))!.title+=' changed'
    if(mode==='existing-claim')data.claims.find(c=>own(c.id))!.text+=' changed'
    if(mode==='existing-research')pub(t).provenance={...pub(t).provenance,main:{...manifest.main,sha256:'0'.repeat(64)}}
    if(mode==='old-reference')t.occupationEvidence=[{sourceId:'inventory-cn-core-cn-occ-2022-draft',locator:'理货员任务5：储位标识'}]
    if(mode==='array-order')t.conclusionIds.reverse()
    if(mode==='inventory-country')data.industries.find(i=>i.id==='cn-wholesale-retail')!.country='us'
    const snapshot=JSON.stringify(data)
    expect(()=>importCnTrade(data,files)).toThrow('批零导入：');expect(JSON.stringify(data)).toBe(snapshot)
  })
})
