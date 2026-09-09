import {readFileSync} from 'node:fs'
import {beforeAll,describe,expect,it} from 'vitest'
import {importUsConstruction,usConstructionFiles as manifest} from '../src/research/import-us-construction'
import {readResearchSync} from '../src/research/storage'
import {createTaskPageBuilder} from '../src/research/site'
import {researchCoverage,validateResearch} from '../src/research/validate'
import type {Research,Task} from '../src/research/schema'

type Raw=Record<string,any>
const files=Object.fromEntries(Object.values(manifest).map(p=>[p.file,readFileSync(p.file,'utf8')]))
const raw=(key:Exclude<keyof typeof manifest,'markdown'>):Raw=>JSON.parse(files[manifest[key].file])
const main=raw('main'),ids=new Set<string>(main.tasks.map((t:Raw)=>t.id.toLowerCase()))
const sid=(s:string)=>'automation-us-construction-'+s.toLowerCase()
const own=(id:string)=>id.startsWith('automation-us-construction-')
const task=(data:Research,id:string)=>data.tasks.find(t=>t.id===id.toLowerCase())!
const pub=(t:Task):Raw=>t.dossier!.publicResearch as Raw
const cat=(data:Research):Raw=>data.industries.find(i=>i.id==='us-construction')!.inventory!.constructionResearch as Raw
const identity=(t:Task)=>({id:t.id,country:t.country,industryId:t.industryId,scenarioId:t.scenarioId,title:t.title,boundary:t.boundary,inputs:t.inputs,outputs:t.outputs,acceptance:t.acceptance,manualInputs:t.manualInputs,predecessors:t.predecessors,countingRole:t.countingRole})
const reorder=(v:any):any=>Array.isArray(v)?v.map(reorder):v && typeof v==='object'?Object.fromEntries(Object.keys(v).reverse().map(k=>[k,reorder(v[k])])):v
let before:Research,after:Research
beforeAll(()=>{before=readResearchSync('data/research.json');after=importUsConstruction(before,files)})

describe('US construction 131: reviewed working-version import',()=>{
  it('preserves every original task identity/input/output/acceptance/human value and all other countries, tasks and macro observations',()=>{
    expect(after.tasks.map(identity)).toEqual(before.tasks.map(identity))
    expect(after.observations).toEqual(before.observations);expect(after.countries).toEqual(before.countries)
    expect(after.subindustryProductivity).toEqual(before.subindustryProductivity)
    for(const field of ['version','checkedAt','publishedAt','freezeStatus'] as const)expect(after[field]).toBe(before[field])
    expect(researchCoverage(after).map(c=>[c.country,c.tasks,c.reviewedTasks])).toEqual(researchCoverage(before).map(c=>[c.country,c.tasks,c.reviewedTasks]))
    for(const o of main.tasks)expect(task(after,o.id).dossier!.originalTask).toEqual(o.originalTask)
    for(const t of before.tasks.filter(t=>!ids.has(t.id)))expect(task(after,t.id)).toEqual(t)
    for(const i of before.industries.filter(i=>i.id!=='us-construction'))expect(after.industries.find(x=>x.id===i.id)).toEqual(i)
    const {constructionResearch:_a,...a}=after.industries.find(i=>i.id==='us-construction')!.inventory!
    const {constructionResearch:_b,...b}=before.industries.find(i=>i.id==='us-construction')!.inventory!
    expect(a).toEqual(b)
  })

  it('adds stable namespaced ID sets without removals, including when canonical already contains this batch',()=>{
    expect(after.sources.filter(s=>own(s.id))).toHaveLength(61)
    expect(after.claims.filter(c=>own(c.id))).toHaveLength(1648)
    expect(after.searches.filter(q=>own(q.id))).toHaveLength(262)
    for(const name of ['sources','claims','searches'] as const){
      const lookup=new Map(after[name].map(x=>[x.id,x])),oldIds=new Set(before[name].map(x=>x.id))
      for(const old of before[name])expect(lookup.get(old.id)).toEqual(old)
      expect(after[name].length-before[name].length).toBe(after[name].filter(x=>!oldIds.has(x.id)).length)
    }
    expect(after.tasks.filter(t=>ids.has(t.id))).toHaveLength(131)
  })

  it('moves only the independently recommended drywall layout phase and keeps the original snapshot',()=>{
    const t=task(after,'US-CON-DRYWALL-002')
    expect(t.phase).toBe('preparation');expect((t.dossier!.originalTask as Raw).phase).toBe('作业')
    expect(pub(t).definitionReview.note).toContain('由“作业”显示为“准备”')
    const s=after.scenarios.find(s=>s.id===t.scenarioId)!
    expect(s.coverage.find(c=>c.phase==='准备')!.taskIds).toContain(t.id)
    expect(s.coverage.find(c=>c.phase==='作业')!.taskIds).not.toContain(t.id)
    for(const old of before.tasks.filter(t=>t.id!=='us-con-drywall-002'))expect(task(after,old.id).phase).toBe(old.phase)
    for(const old of before.scenarios.filter(s=>s.id!=='us-con-drywall'))expect(after.scenarios.find(s=>s.id===old.id)).toEqual(old)
  })

  it.each(Object.keys(manifest) as (keyof typeof manifest)[])('rejects changed %s bytes, including original review and publication MD',key=>{
    const count=before.claims.length
    expect(()=>importUsConstruction(before,{...files,[manifest[key].file]:files[manifest[key].file]+'\n'})).toThrow('实际文件 SHA 不匹配')
    expect(before.claims).toHaveLength(count)
  })

  it('binds both author rounds, the intermediate validation and both independent rechecks to their exact inputs',()=>{
    const r=raw('review'),v=raw('revisions'),c=raw('recheck'),l=raw('limitedRevisions'),f=raw('finalRecheck'),z=raw('validation')
    expect(v.originalInputFiles.find((x:Raw)=>x.file==='us-construction.json').sha256).toBe(r.input.sha256)
    expect(v.independentDecisionSha256).toBe(manifest.review.sha256)
    expect(v.outputRawSha256).toBe(c.input[manifest.main.file])
    expect(l.inputFiles.find((x:Raw)=>x.file==='us-construction.json').sha256).toBe(v.outputRawSha256)
    expect(l.inputFiles.find((x:Raw)=>x.file==='us-construction-validation.json').sha256).toBe(z.previousDcd6ValidationSha256)
    expect(l.independentRecheckSha256).toBe(manifest.recheck.sha256)
    expect(l.outputRawSha256).toBe(manifest.main.sha256);expect(l.outputValidationSha256).toBe(manifest.validation.sha256)
    expect(f.authorReceiptSha256).toBe(manifest.limitedRevisions.sha256)
    expect(f.afterSha256).toBe(manifest.main.sha256);expect(f.replayExactlyMatchesOutput).toBe(true)
    for(const x of f.inputFiles)expect(Object.values(manifest).find(p=>p.file===x.path)?.sha256).toBe(x.sha256)
    expect(cat(after).provenance).toEqual(manifest);expect(Object.isFrozen(manifest.main)).toBe(true)
  })

  it('keeps 74 partial, 21 adjacent, 36 no-match results, and all 37 split parents / 76 children uncounted',()=>{
    const counts:Record<string,number>={},splits:Task[]=[]
    for(const o of main.tasks){
      const t=task(after,o.id),p=pub(t);counts[p.evidenceSupportTier]=(counts[p.evidenceSupportTier]??0)+1
      expect(p.evidenceSupportTier).toBe(o.positiveCounterexample.status)
      expect(t.researchStatus).toBe('in-progress');expect(p.canFreeze).toBe(false)
      expect(p.definitionReview.children).toEqual(o.inventoryReview.splitSuggestions)
      expect(p.definitionReview.proposedChildrenCounted).toBe(false);expect(p.definitionReview.approvedChildCount).toBe(0)
      expect(p.positiveCounterexample.commercialSuccessConfirmed).toBe(false)
      if(p.definitionReview.children.length)splits.push(t)
    }
    expect(counts).toEqual({'bounded-mechanism-or-tool-for-substep':74,'adjacent-mechanism-or-workflow-only':21,'no-matched-alternative-evidence':36})
    expect(splits).toHaveLength(37);expect(splits.reduce((n,t)=>n+pub(t).definitionReview.children.length,0)).toBe(76)
    expect(cat(after).approvedNewTasks).toBe(0);expect(cat(after).canFreeze).toBe(false)
  })

  it('uses individually reviewed action anchors and never revives the old generic main references',()=>{
    for(const o of main.tasks){
      const t=task(after,o.id),effective=[...t.workflowEvidence,...t.occupationEvidence]
      expect(effective).toHaveLength(o.inventoryReview.actionSupport.length)
      for(const r of o.inventoryReview.actionSupport){
        expect(effective.some(e=>e.sourceId===sid(r.sourceId) && e.locator.includes('定位编号：'+r.locatorId))).toBe(true)
      }
      expect(effective.every(e=>own(e.sourceId) && !e.locator.includes('定位编号：main'))).toBe(true)
      expect(pub(t).definitionReview.independentDecision).toEqual(raw('review').decisions.find((d:Raw)=>d.taskId===o.id))
      expect(t.discovery!.supportStatus).toBe(o.inventoryReview.recommendedInventoryStatus)
    }
  })

  it('separates 142 source facts, 239 applicability judgments and 73 mixed boundaries with exact LF anchors',()=>{
    const lookup=new Map(after.claims.map(c=>[c.id,c])),counts={fact:0,judgment:0,boundary:0}
    for(const s of main.sources)for(const l of s.locators){
      const c=lookup.get(sid(s.id+'-'+l.id))!
      expect(c.kind).toBe(l.statementType==='direct-fact-limited-to-source'?'fact':'judgment')
      expect(c.text).toContain(l.claim);expect(c.evidence).toHaveLength(1);expect(c.evidence[0].sourceId).toBe(sid(s.id))
      expect(c.evidence[0].locator).toContain(l.section);expect(c.evidence[0].locator).toContain('LF 文本行')
      expect(c.evidence[0].excerpt).toBeUndefined()
      for(const range of l.cacheRanges??[])expect(c.evidence[0].locator).toContain('LF 文本行 '+range.start+'–'+range.end)
      counts[c.kind==='fact'?'fact':'judgment']++
      if(l.researchBoundary){const b=lookup.get(c.id+'-boundary')!;counts.boundary++;expect(b.kind).toBe('judgment');expect(b.text).toBe('研究边界：'+l.researchBoundary.text);expect(b.basedOn).toEqual([c.id])}
      if(!l.quote)expect(l.rawQuoteMatch).toBeNull()
    }
    expect(counts).toEqual({fact:142,judgment:239,boundary:73})
    expect(lookup.get(sid('O47-2061.00-task-1'))!.kind).toBe('judgment')
    expect(lookup.get(sid('DRYWALL-STUDY-pick-boundary'))!.text).toContain('未据此确认物理搬板原型')
    expect(lookup.get(sid('RUFUS-preview-boundary'))!.kind).toBe('judgment')
  })

  it('preserves edition/report/modified dates and does not fabricate month/day for year-only releases',()=>{
    const source=(id:string)=>after.sources.find(s=>s.id===sid(id))!
    for(const [name,year] of [['FHWA-BARRIER','2017'],['DRYWALL-STUDY','2024'],['TEN-ROBOTS','2022']]){
      const s=source(name!);expect(s.published).toBeNull();expect(s.dates).toContainEqual({kind:'released',value:year,note:expect.stringContaining('不补造日期')});expect(s.publishedLabel).toContain(year)
    }
    expect(source('C-EARTH').published).toBeNull();expect(source('C-EARTH').dates).toContainEqual({kind:'document-version',value:'2019-07',note:expect.any(String)})
    expect(source('PHMSA-GPR').published).toBeNull();expect(source('PHMSA-GPR').dates).toContainEqual({kind:'authored',value:'2022-02-04',note:expect.any(String)})
    expect(source('EPA-RRP').published).toBeNull();expect(source('EPA-RRP').dates).toContainEqual({kind:'updated',value:'2026-03-31',note:expect.any(String)})
    expect(source('EPA-RRP').dateEvidence![0].locator).toContain('368–368')
    expect(source('TEN-ROBOTS').evidencePeriod).toContain('截至2021年冬季')
  })

  it('keeps physical drywall lifting and virtual simulation separate, with unverified fastening and historical scope',()=>{
    const t=task(after,'US-CON-DRYWALL-005')
    expect(t.alternatives).toHaveLength(2)
    expect(t.alternatives[0].description).toContain('升降工具辅助抬板')
    expect(t.alternatives[1].description).toContain('ROS/Gazebo')
    expect(t.alternatives[1].conditions).toContain('只有模拟机制，不是实体辅助作业证据。')
    expect(t.summary).toContain('固定步骤未覆盖')
    expect(task(after,'US-CON-CONCRETE-009').summary).toContain('相邻')
    expect(pub(task(after,'US-CON-CONCRETE-009')).evidenceSupportTier).toBe('adjacent-mechanism-or-workflow-only')
    expect(task(after,'US-CON-PAINT-005').summary).toContain('职业动力砂磨有部分支持')
    expect(task(after,'US-CON-PAINT-005').summary).toContain('旧漆打磨不泛化')
    expect(pub(t).alternatives).toEqual(main.tasks.find((o:Raw)=>o.id==='US-CON-DRYWALL-005').alternatives)
  })

  it('retains each actual query and shared batch limitations without invented per-query findings, timestamps or discovery searches',()=>{
    const audit=raw('audit'),lookup=new Map(after.searches.map(q=>[q.id,q]))
    for(const q of audit.queries){const got=lookup.get(sid(q.id))!;expect(got.query).toBe(q.query);expect(got.taskId).toBe(q.taskId.toLowerCase());expect(got.country).toBe('us');expect(got.searchedOn).toBe(q.executedAt);expect(got.results).toEqual([]);expect(got.outcome).toBe('completed-candidates-unattributed');expect(got.audit).toEqual({file:manifest.audit.file,id:q.id,sha256:manifest.audit.sha256});expect(got.note).toContain('没有独立保存的原请求全文或精确 UTC')}
    for(const o of main.tasks){const t=task(after,o.id);expect(t.searchIds).toEqual([...o.searchAudit.positiveQueryIds,...o.searchAudit.negativeQueryIds].map(sid));expect(pub(t).originalRequestUTC).toBeNull();expect(pub(t).queryEvidenceLevel).toEqual(o.queryEvidenceLevel)}
    expect(cat(after).queryAudit.sourceDiscoveryReads).toEqual(audit.sourceDiscoveryReads)
    expect(cat(after).queryAudit.sourceDiscoveryReadsCountedAsTaskSearches).toBe(false)
    expect(cat(after).queryAudit.mergedResultBatches).toBe(66)
  })

  it('preserves human/cash gaps, gross-vs-residual labor, adjacent-period working capital and replacement/exit boundaries',()=>{
    const cash=main.cashFlowModels[0]
    for(const o of main.tasks){const t=task(after,o.id),p=pub(t),e=p.economics
      for(const [key,value] of Object.entries(cash))expect(e[key]).toEqual(value)
      expect(p.originalHumanInput).toEqual(o.humanInput);expect(p.remainingHuman).toEqual(o.residualHuman);expect(e.taskSpecific).toEqual(o.cashFlow)
      expect(Object.values(e.parameters).every(v=>v===null)).toBe(true);expect(e.npv).toBeNull();expect(e.paybackYears).toBeNull()
      expect(e.workingCapitalDefinition).toContain('WC_incremental_t - WC_incremental_(t-1)');expect(e.workingCapitalDefinition).toContain('不叠加');expect(e.workingCapitalDefinition).toContain('不得先设余额归零释放')
      expect(e.parameterDefinitions.residual_paid_labor).toContain('不再重复扣');expect(e.annualCashFlowFormula).toContain('replacement_capital_expenditure')
      expect(e.terminalCashFlow).toContain('decommissioning_cost');expect(e.throughputBenefitConstraint).toContain('关键路径');expect(e.comparisonScope).toContain('退出残值')
      expect(t.manualInputs.every(x=>x.value===null)).toBe(true);expect(p.counterEvidence.failureOrExitCase).toBeNull()
    }
  })

  it('makes shared evidence, scope, residual labor, barriers, conditional opportunities and independent reviews reachable from task pages',()=>{
    const build=createTaskPageBuilder(after),lookup=new Map(after.claims.map(c=>[c.id,c]))
    for(const o of main.tasks){const t=task(after,o.id),page=build(t),p=pub(t),cids=new Set(page.claims.map(c=>c.id)),sids=new Set(page.sources.map(s=>s.id))
      for(const cid of [...t.conclusionIds,...t.counterevidenceIds,...t.alternatives.flatMap(a=>a.claimIds),...t.barriers.flatMap(b=>b.claimIds)])expect(cids.has(cid)).toBe(true)
      for(const r of o.sourceRefs){expect(t.conclusionIds).toContain(sid(r.sourceId+'-'+r.locatorId));if(r.sourceResearchBoundary)expect(t.conclusionIds).toContain(sid(r.sourceId+'-'+r.locatorId+'-boundary'))}
      for(const d of p.deploymentEvidence){expect(sids.has(d.sourceId)).toBe(true);expect(d.currentOperationConfirmed).toBe(false);expect(d.fullTaskAcceptanceVerified).toBe(false)}
      expect(t.barriers.map(b=>b.type)).toEqual(['technical','economic','adoption'])
      for(const b of t.barriers)for(const cid of b.claimIds)expect(lookup.get(cid)!.kind).toBe('hypothesis')
      for(const a of t.alternatives)expect(a.category).toBe('unclassified')
      expect(t.conditions.join('；')).toContain(o.executorBoundary.text)
      for(const op of p.opportunities){expect(t.conclusionIds).toContain(op.claimId);expect(lookup.get(op.claimId)!.text).toContain(op.currentTaskScope);expect(lookup.get(op.claimId)!.text).toContain(op.nextValidation)}
      for(const c of page.claims){expect(c.country).toBe('us');expect(c.deployment).not.toBe('commercial-operation');if(c.kind!=='hypothesis')expect(c.evidence.length+c.basedOn.length).toBeGreaterThan(0)}
    }
    expect(cat(after).remainingGaps).toEqual(raw('finalRecheck').remainingGaps)
    expect(cat(after).researchScope.notCovered).toContain('不是完整美国建筑行业覆盖')
    expect(cat(after).authorAdditionalScopeIssues).toHaveLength(2)
  })

  it('returns a new validated object and is idempotent after storage/validation and object-key reordering',()=>{
    const snapshot=JSON.stringify(before),result=importUsConstruction(before,files)
    expect(JSON.stringify(before)).toBe(snapshot);expect(result).not.toBe(before);expect(result.tasks).not.toBe(before.tasks)
    expect(importUsConstruction(after,files)).toEqual(after)
    const stored=JSON.parse(JSON.stringify(validateResearch(after)))
    expect(importUsConstruction(stored,files)).toEqual(after)
    expect(importUsConstruction(reorder(stored),files)).toEqual(after)
  })

  it.each(['country','industry','definition','snapshot','manual','cash','freeze','source','claim','old-reference','array-order','revision'])('refuses %s drift without changing input',mode=>{
    const data:Research={...after,tasks:[...after.tasks],sources:[...after.sources],claims:[...after.claims]},old=task(data,'US-CON-DRYWALL-005'),t=structuredClone(old)
    data.tasks[data.tasks.indexOf(old)]=t
    if(mode==='country')t.country='cn'
    if(mode==='industry')t.industryId='us-manufacturing'
    if(mode==='definition')t.title+=' changed'
    if(mode==='snapshot')(t.dossier!.originalTask as Raw).title+=' changed'
    if(mode==='manual')t.manualInputs[0]!.value=1
    if(mode==='cash')pub(t).economics.parameters.maintenance=1
    if(mode==='freeze')data.freezeStatus='frozen'
    if(mode==='source'){const n=data.sources.findIndex(s=>own(s.id));data.sources[n]={...data.sources[n]!,title:'changed'}}
    if(mode==='claim'){const n=data.claims.findIndex(c=>own(c.id));data.claims[n]={...data.claims[n]!,text:'changed'}}
    if(mode==='old-reference')t.occupationEvidence=[{sourceId:'inventory-us-core-o47-2061.00',locator:'main'}]
    if(mode==='array-order')t.conclusionIds.reverse()
    if(mode==='revision')pub(t).provenance={...pub(t).provenance,main:{...manifest.main,sha256:'0'.repeat(64)}}
    const snapshot=JSON.stringify(t),counts=[data.sources.length,data.claims.length,data.searches.length]
    expect(()=>importUsConstruction(data,files)).toThrow('美国建筑导入：')
    expect(JSON.stringify(t)).toBe(snapshot);expect([data.sources.length,data.claims.length,data.searches.length]).toEqual(counts)
  })
})
