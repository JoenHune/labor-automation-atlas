import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {beforeAll,describe,expect,it} from 'vitest'
import {readResearchSync} from '../src/research/storage'
import {cnIndustryWoodFiles as manifest,importCnIndustryWood} from '../src/research/import-cn-industry-wood'
import {createTaskPageBuilder} from '../src/research/site'
import {researchCoverage,validateResearch} from '../src/research/validate'
import type {Research,Task} from '../src/research/schema'

type Raw=Record<string,any>
const files=Object.fromEntries(Object.values(manifest).map(p=>[p.file,readFileSync(p.file,'utf8')]))
const raw=(key:keyof typeof manifest):Raw=>JSON.parse(files[manifest[key].file]!)
const main=raw('main'),ids=new Set<string>(main.tasks.map((t:Raw)=>t.id))
const own=(id:string)=>id.startsWith('automation-cn-wood-')
const task=(data:Research,id:string)=>data.tasks.find(t=>t.id===id)!
const pub=(t:Task):Raw=>t.dossier!.publicResearch as Raw
const cat=(data:Research):Raw=>data.industries.find(i=>i.id==='cn-industry')!.inventory!.woodResearch as Raw
const core=(t:Task)=>({id:t.id,country:t.country,industryId:t.industryId,scenarioId:t.scenarioId,title:t.title,boundary:t.boundary,inputs:t.inputs,outputs:t.outputs,acceptance:t.acceptance,phase:t.phase,predecessors:t.predecessors,countingRole:t.countingRole,manualInputs:t.manualInputs})
const reorder=(v:any):any=>Array.isArray(v)?v.map(reorder):v && typeof v==='object'?Object.fromEntries(Object.keys(v).reverse().map(k=>[k,reorder(v[k])])):v
const fingerprint=(v:unknown)=>createHash('sha256').update(JSON.stringify(v)).digest('hex')
let before:Research,after:Research,inputFingerprint:string
beforeAll(()=>{
  before=readResearchSync(new URL('../data/research.json',import.meta.url));inputFingerprint=fingerprint(before)
  after=importCnIndustryWood(before,files)
},30000)

describe('CN wood furniture paper print cultural 181 import',()=>{
  it('preserves every candidate definition, manual null and original inventory snapshot',()=>{
    expect(after.tasks.map(core)).toEqual(before.tasks.map(core))
    expect(after.tasks.filter(t=>ids.has(t.id))).toHaveLength(181)
    for(const original of main.tasks)expect(task(after,original.id).dossier!.originalTask).toEqual(original.originalTask)
    expect(after.scenarios).toEqual(before.scenarios)
    expect(after.observations).toEqual(before.observations)
    expect(after.countries).toEqual(before.countries)
    for(const key of ['version','checkedAt','publishedAt','freezeStatus'] as const)expect(after[key]).toBe(before[key])
    expect(researchCoverage(after).map(c=>[c.country,c.tasks,c.reviewedTasks])).toEqual(researchCoverage(before).map(c=>[c.country,c.tasks,c.reviewedTasks]))
  })
  it('does not mutate input or change any other country or research batch',()=>{
    expect(fingerprint(before)).toBe(inputFingerprint);expect(after).not.toBe(before)
    for(const t of before.tasks.filter(t=>!ids.has(t.id)))expect(task(after,t.id)).toEqual(t)
    for(const i of before.industries.filter(i=>i.id!=='cn-industry'))expect(after.industries.find(x=>x.id===i.id)).toEqual(i)
    const {woodResearch:_a,...otherAfter}=after.industries.find(i=>i.id==='cn-industry')!.inventory!
    const {woodResearch:_b,...otherBefore}=before.industries.find(i=>i.id==='cn-industry')!.inventory!
    expect(otherAfter).toEqual(otherBefore)
  })
  it('adds stable ID sets without deleting existing evidence and works after publication',()=>{
    expect(after.sources.filter(s=>own(s.id))).toHaveLength(64)
    expect(after.claims.filter(c=>own(c.id))).toHaveLength(2078)
    expect(after.searches.filter(s=>own(s.id))).toHaveLength(362)
    const shared=after.claims.filter(c=>own(c.id) && !c.taskId)
    expect(shared).toHaveLength(143);expect(shared.filter(c=>c.kind==='fact')).toHaveLength(115);expect(shared.filter(c=>c.kind==='judgment')).toHaveLength(28)
    for(const field of ['sources','claims','searches'] as const){
      const lookup=new Map(after[field].map(x=>[x.id,x]))
      for(const original of before[field])expect(lookup.get(original.id)).toEqual(original)
    }
  })
  it.each(Object.keys(manifest) as (keyof typeof manifest)[])('rejects changed bytes of %s',key=>{
    expect(()=>importCnIndustryWood(before,{...files,[manifest[key].file]:files[manifest[key].file]+'\n'})).toThrow('实际文件 SHA 不匹配')
  })
  it('binds the complete review chain and treats the old validator as historical',()=>{
    expect(raw('revisions').inputFiles[main.batchId+'.json']).toBe(raw('review').input.rawSha256)
    expect(raw('revisions').outputFiles[main.batchId+'.json']).toBe(raw('limitedRevisions').beforeSha256)
    expect(raw('authorValidation').outputSha256).toBe(raw('limitedRevisions').beforeSha256)
    expect(raw('authorValidation').outputSha256).not.toBe(manifest.main.sha256)
    expect(raw('finalRecheck').input.afterRawSha256).toBe(manifest.main.sha256)
    expect(cat(after).oldValidationBoundary.coversFinalRaw).toBe(false)
    expect(cat(after).oldValidationBoundary.independentThreePathBridgeSha256).toBe(manifest.finalRecheck.sha256)
    expect(cat(after).oldValidationBoundary.oldMarkdownCoversFinalRaw).toBe(false)
    expect(cat(after).provenance).toEqual(manifest)
    expect(Object.isFrozen(manifest.main)).toBe(true)
  })
  it('keeps the three final technical facts separate from their explicit research boundaries',()=>{
    const page=createTaskPageBuilder(after)
    for(const change of raw('limitedRevisions').exactChanges){
      const t=task(after,change.taskId),p=page(t),suffix=(change.sourceRef.sourceId+'-'+change.sourceRef.locatorId).toLowerCase()
      const fact=p.claims.find(c=>c.id==='automation-cn-wood-'+suffix)!,boundary=p.claims.find(c=>c.id==='automation-cn-wood-'+suffix+'-scope-boundary')!
      expect(fact.kind).toBe('fact');expect(fact.text).toBe('来源陈述：'+change.after)
      expect(fact.text).not.toContain(change.retainedBoundary.text)
      expect(boundary.kind).toBe('judgment');expect(boundary.text).toBe('研究边界：'+change.retainedBoundary.text)
      expect(t.conclusionIds).toContain(fact.id);expect(t.conclusionIds).toContain(boundary.id)
      const limit=t.barriers.find(b=>b.type==='technical')!.claimIds.at(-1)!
      expect(p.claims.find(c=>c.id===limit)!.text).toContain(change.after)
      expect(p.claims.find(c=>c.id===limit)!.text).toContain(change.retainedBoundary.text)
      expect(pub(t).finalFieldRechecks).toHaveLength(1)
    }
  })
  it('retains all 27 source boundaries as judgments and the one remaining mixed sentence conservatively',()=>{
    const lookup=new Map(after.claims.map(c=>[c.id,c]))
    for(const s of main.sources)for(const loc of s.locators){
      const cid='automation-cn-wood-'+(s.id+'-'+loc.id).toLowerCase()
      expect(lookup.get(cid)!.evidence[0]!.locator).toBe(loc.section)
      if(loc.researchBoundary){expect(lookup.get(cid+'-scope-boundary')!.kind).toBe('judgment');expect(lookup.get(cid+'-scope-boundary')!.basedOn).toEqual([cid])}
    }
    const transfer=lookup.get('automation-cn-wood-cn-wood-hlj-pencil-transfer')!
    expect(transfer.kind).toBe('judgment');expect(transfer.text).toContain('而非自动搬运验收')
  })
  it('separates 60 local, 21 catalogue, 3 adjacent, 2 cross-material and 95 unmatched cases',()=>{
    const counts:Record<string,number>={}
    for(const t of after.tasks.filter(t=>ids.has(t.id))){const p=pub(t);counts[p.evidenceSupportTier]=(counts[p.evidenceSupportTier]??0)+1;expect(t.researchStatus).toBe('in-progress');expect(p.canFreeze).toBe(false)}
    expect(counts).toEqual({'bounded-partial-mechanism':60,'product-or-function-catalog-only':21,'adjacent-process-only':3,'cross-material-conditional-candidate':2,'no-new-matched-mechanism':95})
    expect(cat(after).evidenceSupportTierCounts).toEqual(counts)
    expect(task(after,'cn-ind-chemical-pulp-001').alternatives[0]!.description).toContain('目录')
    for(const o of main.tasks.filter((t:Raw)=>t.conclusion.coverageLevel==='cross-material-conditional-candidate'))expect(task(after,o.id).summary).toContain('跨材料')
  })
  it('does not promote catalogues or missing route categories into physical mechanisms',()=>{
    const lookup=new Map(after.claims.map(c=>[c.id,c]))
    for(const t of after.tasks.filter(t=>ids.has(t.id))){
      expect(new Set(t.alternatives.map(a=>a.category)).size).toBe(5)
      for(const a of t.alternatives.filter(a=>a.claimIds.some(id=>id.includes('-unmatched-')))){
        expect(lookup.get(a.claimIds[0]!)!.kind).toBe('hypothesis');expect(a.conditions.join('')).toContain('五类路线未各自穷尽')
      }
    }
  })
  it('uses reviewed definition roles and retains bare-core, furniture and coating limits',()=>{
    for(const o of main.tasks){
      const t=task(after,o.id),p=pub(t);expect(p.definitionReview.actionSupport).toEqual(o.executionConditions.reviewedDefinitionSourceRefs)
      for(const ref of p.definitionReview.actionSupport){const evidence=ref.sourceId==='cn-occ-2022-draft'?t.occupationEvidence:t.workflowEvidence;expect(evidence.some(e=>e.locator.includes(ref.section) && e.locator.includes(ref.supportRole) && e.locator.includes(ref.supportConclusion))).toBe(true)}
      expect(t.evidenceGaps).not.toContain('库存流程与职业路径仍待独立复核及行业遗漏补齐。')
    }
    expect(task(after,'cn-ind-pencil-core-cut-pack-001').summary).toContain('裸铅芯')
    expect(task(after,'cn-ind-wood-furniture-014').summary).toContain('板式')
    expect(task(after,'cn-ind-print-sheet-offset-010').summary).toContain('自动')
    expect(task(after,'cn-ind-print-sheet-offset-010').alternatives[0]!.description).toContain('橡皮布')
    for(const o of main.tasks.filter((t:Raw)=>t.displayTitle)){
      const t=task(after,o.id);expect(pub(t).definitionReview.displayTitle).toBe(o.displayTitle);expect(t.summary).toContain('当前限定对象：'+o.displayTitle)
    }
    for(const o of main.tasks){expect(pub(task(after,o.id)).alternativeEvidence).toEqual(o.alternatives);expect(pub(task(after,o.id)).barrierEvidence).toEqual(o.barriers)}
  })
  it('keeps nine split proposals and five display phase proposals unapproved and uncounted',()=>{
    const split=after.tasks.filter(t=>ids.has(t.id) && pub(t).definitionReview.granularityDisposition==='proposed-split')
    expect(split).toHaveLength(9)
    expect(split.every(t=>pub(t).definitionReview.proposedChildrenCounted===false)).toBe(true)
    expect(cat(after).newTaskCount).toBe(0)
    for(const p of raw('recheck').displayPhaseProposals){
      const t=task(after,p.taskId);expect(t.phase).toBe(task(before,p.taskId).phase)
      expect(pub(t).definitionReview.phaseSuggestion).toEqual(p)
      expect(t.summary).toContain('仍为建议')
    }
  })
  it('preserves each actual query and only retains pooled results at their original batch scope',()=>{
    const audit=raw('audit'),lookup=new Map(after.searches.filter(s=>own(s.id)).map(s=>[s.id,s]))
    for(const q of audit.taskQueries){const actual=lookup.get('automation-cn-wood-'+q.id.toLowerCase())!;expect(actual.query).toBe(q.query);expect(actual.searchedOn).toBe(q.executedAt);expect(actual.taskId).toBe(q.taskId);expect(actual.results).toEqual([]);expect(actual.outcome).toBe('completed-candidates-unattributed');expect(actual.note).toContain('无独立预调用')}
    expect(cat(after).queryAudit.resultPools).toEqual(audit.resultPools)
    expect(cat(after).queryAudit.supplementalSearches).toEqual(audit.supplementalSearches)
    expect(cat(after).queryAudit.supplementalQueries).toBe(36)
    for(const t of after.tasks.filter(t=>ids.has(t.id))){expect(t.searchIds).toHaveLength(2);expect(pub(t).originalRequestUTC).toBeNull()}
  })
  it('keeps planned manual/mechanical context distinct from observed current deployment',()=>{
    const t=task(after,'cn-ind-pencil-core-mix-form-002'),p=pub(t),page=createTaskPageBuilder(after)(t)
    expect(p.plannedProcessContext.inventoryProcessCurrentOperationVerified).toBe(false)
    expect(p.plannedProcessContext.sourceStatements[0].text).toContain('拟建')
    expect(page.claims.find(c=>c.id.endsWith('-planned-context'))!.text).toContain('未核建成投产')
    expect(p.deploymentEvidence.every((e:Raw)=>e.currentOperationConfirmed===false)).toBe(true)
    expect(page.claims.filter(c=>c.id.includes('cn-wood-bohao-eia')).every(c=>c.deployment!=='commercial-operation')).toBe(true)
  })
  it('separates historical document dates, displayed timestamps and unknown publication dates',()=>{
    const source=(id:string)=>after.sources.find(s=>s.id==='automation-cn-wood-'+id)!
    expect(source('cn-wood-heidelberg-xl').published).toBeNull()
    expect(source('cn-wood-heidelberg-xl').dates).toContainEqual({kind:'document-version',value:'2023-02',note:'版面日期不是网页发布日期。'})
    expect(source('cn-wood-bohao-eia').published).toBeNull();expect(source('cn-wood-bohao-eia').dates?.[0]?.value).toBe('2025-12')
    expect(source('cn-wood-wanlian').published).toBeNull();expect(source('cn-wood-wanlian').dates?.[0]?.kind).toBe('displayed')
    expect(source('cn-wood-andritz-jingxing').published).toBe('2023-09-29');expect(source('cn-wood-andritz-jingxing').evidencePeriod).toContain('2026持续在运未核')
  })
  it('preserves all cash parameters and the full lifecycle framework without fabricated returns',()=>{
    for(const original of main.tasks){
      const p=pub(task(after,original.id)),e=p.economics
      expect(e.parameters).toEqual(original.cashFlow.parameters);expect(Object.values(e.parameters).every(v=>v===null)).toBe(true)
      expect(e.requiredParameters).toHaveLength(Object.keys(original.cashFlow.parameters).length)
      expect(e.requiredParameters.join('；')).toContain('更新资本支出')
      expect(e.taskSpecific.taskSpecificMissing).toEqual([original.barriers.economic.text])
      expect(e.model).toEqual(main.cashFlowModels[0]);expect(e.paybackYears).toBeNull();expect(e.npv).toBeNull();expect(e.breakEvenPaidHours).toBeNull()
      expect(e.workingCapitalDefinition).toContain('NWC_t − NWC_(t−1)');expect(e.workingCapitalDefinition).toContain('一次')
      expect(e.comparisonScope).toContain('解约');expect(e.model.annualCashFlowFormula).toContain('replacement_capital_expenditure');expect(e.model.terminalCashFlow).toContain('decommissioning_cost')
      expect(p.originalHumanInput).toEqual(original.humanInput)
    }
  })
  it('all shared source claims remain reachable on task pages and contain original locators',()=>{
    const page=createTaskPageBuilder(after)
    for(const t of after.tasks.filter(t=>ids.has(t.id))){
      const p=page(t),pageIds=new Set(p.claims.map(c=>c.id))
      for(const cid of t.conclusionIds)expect(pageIds.has(cid)).toBe(true)
      for(const a of t.alternatives)for(const cid of a.claimIds)expect(pageIds.has(cid)).toBe(true)
      for(const claim of p.claims.filter(c=>own(c.id) && c.kind!=='hypothesis'))expect(claim.evidence.length+claim.basedOn.length).toBeGreaterThan(0)
    }
  })
  it('is idempotent after validation and saving/reloading, ignoring object-key order',()=>{
    const saved=JSON.parse(JSON.stringify(validateResearch(after)))
    expect(importCnIndustryWood(saved,files)).toEqual(after)
    expect(importCnIndustryWood(reorder(saved),files)).toEqual(after)
  },30000)
  it('refuses changed array order in existing imported evidence',()=>{
    const t=task(after,main.tasks[0].id),changed={...after,tasks:after.tasks.map(x=>x.id===t.id?{...x,conditions:[...x.conditions].reverse()}:x)}
    expect(()=>importCnIndustryWood(changed,files)).toThrow('已导入任务研究字段或数组次序发生冲突')
  })
  it.each(['country','scenarioId','title','snapshot','human','version'] as const)('refuses changed %s before it can overwrite a candidate',field=>{
    const target=structuredClone(task(before,main.tasks[0].id))
    if(field==='country')target.country='us'
    if(field==='scenarioId')target.scenarioId='us-construction-other'
    if(field==='title')target.title='改变后的定义'
    if(field==='snapshot')(target.dossier!.originalTask as Raw).acceptance='篡改原快照'
    if(field==='human')target.manualInputs[0]!.value=1
    if(field==='version')target.dossier!.publicResearch={provenance:{main:{sha256:'wrong'}}}
    expect(()=>importCnIndustryWood({...before,tasks:before.tasks.map(t=>t.id===target.id?target:t)},files)).toThrow()
  })
  it('rejects source collisions and frozen data',()=>{
    const old=after.sources.find(s=>own(s.id))!
    expect(()=>importCnIndustryWood({...after,sources:after.sources.map(s=>s.id===old.id?{...s,title:s.title+' altered'}:s)},files)).toThrow('已有记录冲突')
    expect(()=>importCnIndustryWood({...before,freezeStatus:'frozen'},files)).toThrow('冻结版本')
  })
})
