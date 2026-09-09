import {createHash} from 'node:crypto'
import {isDeepStrictEqual} from 'node:util'
import type {Research,Task} from './schema'
import {validateResearch} from './validate'

type Raw=Record<string,any>
const prefix='automation-us-construction-',industryId='us-construction'
const phases:Record<string,Task['phase']>={'准备':'preparation','作业':'operation','交接':'handoff','检测':'inspection','异常':'exception','返工':'rework','清洁维护':'maintenance','交付':'delivery'}
const originalSHA='5fa3ea10a4a000830171739699db9ac6fdc93277d61fba318b931c65183bed58'
const firstSHA='dcd6cea337011b8ec1c7b8fa65910c1b1f0d3de6fdedf1d3f23137d47e2cd500'
const tiers:Record<string,string>={
  'bounded-mechanism-or-tool-for-substep':'有局部机制或工具证据；完整任务验收和当前持续商业运行仍未核实。',
  'adjacent-mechanism-or-workflow-only':'只有相邻场景、步骤或流程证据，不能当成本任务直接部署。',
  'no-matched-alternative-evidence':'本轮没有保留匹配的替代机制；缺证据不证明技术不可行。',
}
const levels:Record<string,string>={
  'official-owner-inspection-guidance':'官方业主检查指导；执行者归属需分别核对','official-construction-safety-guidance':'官方施工安全指导','official-safety-inspection-guidance':'官方安全检查指导','official-rule-text':'官方规则原文；限所引版本','official-process-guidance':'官方工艺指导',
  'historical-official-RD-program-description':'历史官方研发计划说明；不是当前部署证据','sponsored-contractor-RD-report':'承包商资助研发报告','official-technology-guide':'官方技术指南','official-worksite-planning-guidance':'官方工地规划指导',
  'vendor-product-description':'厂商产品说明','research-demonstration':'研究演示；持续商业运行未核实','vendor-safety-description':'厂商安全说明','vendor-offsite-fabrication-product':'厂商场外制造产品说明；现场施工范围另核','vendor-product-and-case-description':'厂商产品与案例自述','vendor-offsite-service-description':'厂商场外服务说明；不能当作现场施工工时',
  'official-ergonomic-process-guidance':'官方人因与工艺指导','vendor-tool-guidance':'厂商工具指导','official-certification-guidance':'官方认证指导','anonymous-practitioner-safety-report-with-expert-commentary':'匿名从业者安全报告及专家评论；非具名自动化失败案例',
  'vendor-preview-availability-only':'厂商预告与可用性信息；不是现场性能证明','research-institution-tool-guide':'研究机构工具指南','research-institution-tool-guide-with-vendor-claims':'研究机构工具指南，含厂商自报','primary-research-simulation':'原始模拟研究；非现场商业运行','primary-comparative-study-with-contractor-and-vendor-input':'原始比较研究，含承包商及厂商输入',
  'vendor-research-demonstration-description':'厂商研究演示说明','vendor-product-and-service-description':'厂商产品与服务说明','vendor-digital-workflow-description':'厂商数字流程说明','official-scope-guidance':'官方适用范围指导','official-owner-contractor-specification':'官方业主与承包商规范','official-occupation-task-description':'官方职业任务；不证明特定现场工时或整任务验收',
}
const definitionBoundary='仅按独审逐项匹配的动作引用显示；原职业/流程目录仅作历史快照。source-backed-action-only 不代表全部对象、现场 SOP 或验收已有证据。'
const queryBoundary='262 条作者查询与 66 个原合并回包的编号归属已核对；没有独立保存的原请求全文或精确 UTC。合并候选不能逐条归因，未在本轮重跑，也不能称五类技术逐项穷尽。'
const deploymentBoundary='厂商自报、研究演示、历史规范与当前持续商业运行分别记录；来源关联美国研究不等于该方案已在本任务美国现场部署。'

export const usConstructionFiles=Object.freeze({
  inventory:{file:'research/inventories/us-core.json',sha256:'7feeeb264545b41681f95245a35625986bcb65326a4b0a25db47c98ef39046c5'},
  main:{file:'research/automation/us-construction.json',sha256:'41cd55b6178be4c39a598e295f464f51da48ed79408c76a2c660089a8c9638b7'},
  audit:{file:'research/automation/us-construction-search-audit.json',sha256:'9ca4a755d7950e36eea7b7e36645e8d3700dc3da2b5e35437afc17c34cabde3c'},
  review:{file:'research/reviews/us-construction-automation-decisions.json',sha256:'661ddf52ff9976afc942d5b5a1aafdbe688bdd3a0a41c3074d0800312ae309e2'},
  revisions:{file:'research/automation/us-construction-revisions.json',sha256:'2efc212a1d12ce17ceb9da7f3bec4cc8cb07287129a61ef35f5472a874a86e90'},
  recheck:{file:'research/reviews/us-construction-automation-recheck.json',sha256:'e94670f058a96e243dbcd4c22b462b00fe087cadee3fa0bf850103a0fda368b5'},
  limitedRevisions:{file:'research/automation/us-construction-rc01-revisions.json',sha256:'44bf28fcf59adb346dbde0425bfc54f86cb4b6038e0858f11cf0d8d47e660503'},
  finalRecheck:{file:'research/reviews/us-construction-automation-rc01-recheck.json',sha256:'736f6072423daf6658a944fd661073dfc8774a0e1ca871586d3ba7e6bb6fefc2'},
  validation:{file:'research/automation/us-construction-validation.json',sha256:'1d634dba853307775be2f37e0aa0ce504bcc72beb5e8f9436c342e0da9685df1'},
  markdown:{file:'research/automation/us-construction.md',sha256:'edb0421253f5b74b565ffed560d20f96d5f1c8d981faa5f8934102a382b39f2d'},
} as const)
for(const p of Object.values(usConstructionFiles))Object.freeze(p)
const check:(value:unknown,message:string)=>asserts value=(v,m)=>{if(!v)throw new Error('美国建筑导入：'+m)}
const jsonValue=(v:unknown):unknown=>v===undefined?undefined:JSON.parse(JSON.stringify(v))
const same=(a:unknown,b:unknown)=>isDeepStrictEqual(jsonValue(a),jsonValue(b))
const unique=(v:string[])=>[...new Set(v)]
const strings=(v:unknown):string[]=>(Array.isArray(v)?v:[v]).filter((x):x is string=>typeof x==='string' && !!x)
const id=(v:string)=>prefix+v.toLowerCase()
const index=(rows:Raw[],key:string,count?:number)=>{const m=new Map<string,Raw>(rows.map(r=>[r[key],r]));check(m.size===rows.length && (count===undefined || m.size===count),'记录编号或计数错误：'+key);return m}
const append=<T extends{id:string}>(rows:T[],entry:T)=>{const old=rows.find(x=>x.id===entry.id);check(!old || same(old,entry),'已有记录冲突，拒绝覆盖：'+entry.id);if(!old)rows.push(entry)}
const noNumbers=(v:unknown):boolean=>typeof v!=='number' && (v===null || typeof v!=='object' || Object.values(v).every(noNumbers))
const pairs=(refs:Raw[])=>refs.map(r=>({sourceId:r.sourceId,locatorId:r.locatorId}))
const stage=(level:string):Research['claims'][number]['deployment']=>level.startsWith('vendor-')?'vendor-report':['research-demonstration','primary-research-simulation'].includes(level)?'laboratory':level.startsWith('official-')?'not-applicable':'unknown'
const sourceKind=(level:string):Research['sources'][number]['kind']=>level==='official-occupation-task-description'?'occupation':level.startsWith('vendor-')?'vendor':level.startsWith('official-')?'standard':/research|RD-report/.test(level)?'paper':'other'

function readAndVerify(files:Readonly<Record<string,string>>){
  const out:Record<string,Raw>={},p=usConstructionFiles
  for(const [key,pin] of Object.entries(p)){const value=files[pin.file];check(typeof value==='string' && createHash('sha256').update(value,'utf8').digest('hex')===pin.sha256,'实际文件 SHA 不匹配：'+pin.file);if(key!=='markdown')out[key]=JSON.parse(value)}
  const {inventory:i,main:m,audit:a,review:r,revisions:v,recheck:c,limitedRevisions:l,finalRecheck:f,validation:z}=out
  for(const x of [i,m,a,r,v,c,f,z])check(x.country==='US','国家绑定错误')
  for(const x of [m,a,r,v,c,f,z])check(x.industryId===industryId,'行业绑定错误')
  check(m.inventorySource===p.inventory.file && [m.inventorySha256,a.inventorySha256,r.input.inventorySha256,z.inventorySha256].every(x=>x===p.inventory.sha256),'清单绑定错误')
  check(r.input.file===p.main.file && r.input.sha256===originalSHA && r.input.auditFile===p.audit.file && r.input.auditSha256===p.audit.sha256 && r.input.inventoryFile===p.inventory.file && r.input.originalBytesArchived===true,'原独审绑定错误')
  check(m.authorRevision.originalRawSha256===originalSHA && m.authorRevision.independentDecisionPath===p.review.file && m.authorRevision.independentDecisionSha256===p.review.sha256 && m.authorRevision.canFreeze===false && m.statementClassificationRevision.inputRawSha256===firstSHA && m.statementClassificationRevision.independentRecheckPath===p.recheck.file && m.statementClassificationRevision.independentRecheckSha256===p.recheck.sha256,'原稿自身修订元数据绑定错误')
  const old=index(v.originalInputFiles,'file',4)
  check(old.get('us-construction.json')?.sha256===originalSHA && old.get('us-construction-search-audit.json')?.sha256===p.audit.sha256 && v.independentDecisionPath===p.review.file && v.independentDecisionSha256===p.review.sha256 && v.outputRawSha256===firstSHA && v.unchangedAuditSha256===p.audit.sha256,'第一轮作者修订链错误')
  for(const key of ['audit','review','revisions'] as const)check(c.input[p[key].file]===p[key].sha256,'首复检输入错误：'+key)
  check(c.input[p.main.file]===firstSHA && c.input[p.validation.file]===z.previousDcd6ValidationSha256 && c.canFreeze===false,'首复检原稿或验证绑定错误')
  const prior=index(l.inputFiles,'file',5)
  check(prior.get('us-construction.json')?.sha256===firstSHA && prior.get('us-construction.md')?.sha256===v.outputMarkdownSha256 && prior.get('us-construction-search-audit.json')?.sha256===p.audit.sha256 && prior.get('us-construction-revisions.json')?.sha256===p.revisions.sha256 && prior.get('us-construction-validation.json')?.sha256===z.previousDcd6ValidationSha256,'RC01 原始字节归档绑定错误')
  check(l.independentRecheckSha256===p.recheck.sha256 && l.outputRawSha256===p.main.sha256 && l.outputMarkdownSha256===p.markdown.sha256 && l.outputValidationSha256===p.validation.sha256 && l.replayExactlyMatchesOutput===true && l.exactChangeCount===2933,'RC01 修订输出错误')
  const finalPins=index(f.inputFiles,'path',8)
  for(const key of ['main','markdown','audit','revisions','limitedRevisions','validation','review','recheck'] as const)check(finalPins.get(p[key].file)?.sha256===p[key].sha256,'最终复检输入错误：'+key)
  check(f.beforeSha256===firstSHA && f.afterSha256===p.main.sha256 && f.authorReceiptSha256===p.limitedRevisions.sha256 && f.previousIndependentRecheckSha256===p.recheck.sha256 && f.decision==='specified-revision-confirmed-eligible-for-unfrozen-working-version' && f.replayExactlyMatchesOutput===true,'最终独立复检未通过')
  check(z.researchJsonSha256===p.main.sha256 && z.errors.length===0 && Object.values(z.checks).every(x=>x===true),'作者验证失败')
  check(m.isFrozen===false && f.isFrozen===false && f.canFreeze===false && v.canFreeze===false && l.isFrozen===false && m.sourceTaskCount===131 && f.taskCount===131 && f.newCountedTasks===0 && f.proposedSplitParents===37 && f.proposedChildren===76,'任务/拟拆/冻结计数错误')
  const s=m.statistics
  check(s.taskCount===131 && s.scenarioCount===10 && s.sourceCount===61 && s.actualQueries===262 && s.matchedPartialTaskCount===74 && s.adjacentOnlyTaskCount===21 && s.noMatchedAlternativeTaskCount===36 && s.completeTaskCommercialSuccessCount===0 && s.frozenTaskCount===0 && same(s,f.retainedCounts),'证据分级计数错误')
  check(a.queries.length===262 && a.sourceDiscoveryReads.length===6 && r.searchAudit.mainQueries===262 && r.searchAudit.taskPairs===131 && r.searchAudit.mergedResultBatches===66 && r.searchAudit.queryIdsAndMembershipMatched===true && r.searchAudit.requestTextIndependentlyCaptured===false && r.searchAudit.exactUTCIndependentlyCaptured===false,'实际查询层级错误')
  check(l.groups.specifiedList===71 && l.groups.additionalMixedStatements===2 && l.groups.genericOccupationScopeNotes===239 && f.mirrorChecks.directFactsExcludeResearchJudgment===true && f.mirrorChecks.sourceResearchBoundariesResolveExactly===true,'来源事实/研究边界复检未通过')
  return out
}

/** Import the reviewed working version into the same 131 candidate IDs. No IO or publication. */
export function importUsConstruction(data:Research,files:Readonly<Record<string,string>>):Research{
  const {inventory,main,audit,review,revisions,recheck,limitedRevisions,finalRecheck}=readAndVerify(files),p=usConstructionFiles
  check(data.freezeStatus!=='frozen','不能向冻结版追加未冻结研究')
  const ii=inventory.industries.find((i:Raw)=>i.id===industryId);check(ii?.country==='US','原盘点行业缺失')
  const inv=index(ii.scenarios.flatMap((s:Raw)=>s.tasks),'id',131),originals=index(main.tasks,'id',131),decisions=index(review.decisions,'taskId',131),receipts=index(revisions.taskRepairReceipts,'taskId',131),firstChecks=index(recheck.taskChecks,'taskId',131),lastReceipts=index(limitedRevisions.taskReceipts,'taskId',131),lastChecks=index(finalRecheck.taskRechecks,'taskId',131),queries=index(audit.queries,'id',262),scenarios=index(main.scenarios,'id',10)
  const canonical=new Map(data.tasks.map(t=>[t.id,t])),industry=data.industries.find(i=>i.id===industryId)
  check(industry?.country==='us' && data.tasks.filter(t=>t.industryId===industryId).length===131,'原行业或 131 父任务集合已变')
  for(const o of originals.values()){
    const t=canonical.get(o.id.toLowerCase()),prior=t?.dossier?.publicResearch as Raw|undefined,d=decisions.get(o.id),v=receipts.get(o.id),f=lastChecks.get(o.id),sc=scenarios.get(o.scenarioId)
    check(t && sc && t.country==='us' && o.country==='US' && t.industryId===industryId && o.industryId===industryId && t.scenarioId===o.scenarioId.toLowerCase() && t.boundary===sc.scope,'任务国家、行业或场景错误：'+o.id)
    check(same(inv.get(o.id),o.originalTask) && same(t.dossier?.originalTask,o.originalTask) && same(d?.originalTask,o.originalTask) && t.discovery?.inputSha256===p.inventory.sha256 && t.discovery.inventoryFile===p.inventory.file,'原任务快照或清单绑定已变：'+o.id)
    check(t.title===o.originalTask.title && same(t.inputs,o.originalTask.inputs) && same(t.outputs,o.originalTask.outputs) && same(t.acceptance,strings(o.originalTask.acceptance)) && t.phase===phases[prior?o.inventoryReview.phase.recommended:o.originalTask.phase],'未经审定的原任务定义变化：'+o.id)
    check(!prior || (prior.provenance?.main?.sha256===p.main.sha256 && prior.provenance?.finalRecheck?.sha256===p.finalRecheck.sha256 && prior.canFreeze===false),'已有研究版本不匹配')
    check(prior || (t.alternatives.length+t.barriers.length+t.conclusionIds.length+t.counterevidenceIds.length+t.searchIds.length===0),'拒绝覆盖其他已有研究')
    check(o.isFrozen===false && d?.canFreeze===false && f?.canFreeze===false && f.originalSnapshotHumanCashQueryUnchanged===true && f.directFactsExcludeResearchJudgment===true && f.sourceResearchBoundariesResolveExactly===true && firstChecks.get(o.id)?.oldOriginalHumanCashQueryPreserved===true && lastReceipts.get(o.id)?.originalSnapshotHumanCashQueryUnchanged===true,'逐任务独立复检错误')
    check(v?.originalTaskUnchanged===true && v.queryFieldsUnchanged===true && v.reviewDecisionSha256===p.review.sha256 && same(o.inventoryReview.actionSupport.map((r:Raw)=>[r.sourceId,r.locatorId]),v.actionRefsAfter) && same(pairs(o.inventoryReview.actionSupport),pairs(d.reviewedActionRefs)) && same(o.inventoryReview.splitSuggestions,d.atomicityReview.proposedChildren),'动作定位或未批准拆分绑定错误：'+o.id)
    check(o.inventoryReview.approvedChildCount===0 && o.inventoryReview.phase.recommended===d.phaseReview.recommended && o.positiveCounterexample.status===v.positiveClassAfter && o.positiveCounterexample.status===firstChecks.get(o.id)?.positiveClass && o.positiveCounterexample.status===lastReceipts.get(o.id)?.unchangedTaskClass,'逐项证据等级变化')
    check(['not-started','in-progress'].includes(t.researchStatus) && t.manualInputs.every(x=>x.value===null) && noNumbers(o.humanInput) && noNumbers(o.cashFlow) && (!prior || noNumbers(prior.originalHumanInput)),'人工、现金或研究状态已变')
    check(same(unique([...o.searchAudit.positiveQueryIds,...o.searchAudit.negativeQueryIds]),d.queryIds) && o.queryEvidenceLevel.originalRequestTextAvailable===false && o.queryEvidenceLevel.independentUTCAvailable===false,'逐任务查询绑定错误')
  }
  const next:Research={...data,sources:[...data.sources],claims:[...data.claims],searches:[...data.searches],tasks:[...data.tasks],industries:[...data.industries],scenarios:[...data.scenarios]}
  const sources=index(main.sources,'id',61),locators=new Map<string,Raw>()
  for(const s of sources.values()){
    check(levels[s.evidenceType] && s.retrievedAt===main.reviewedAt,'来源类型/读取日期未审定')
    for(const l of s.locators){const key=s.id+'::'+l.id;check(!locators.has(key) && ['direct-fact-limited-to-source','research-judgment'].includes(l.statementType) && (l.quote?l.rawQuoteMatch===true:l.rawQuoteMatch===null),'来源定位或原文匹配状态错误');locators.set(key,l)}
    const dates:NonNullable<Research['sources'][number]['dates']>=[],dateEvidence:Task['workflowEvidence']=[]
    const precisePublication=typeof s.publishedAt==='string' && /^\d{4}-\d{2}-\d{2}$/.test(s.publishedAt)
    if(s.publishedAt && !precisePublication)dates.push({kind:'released',value:s.publishedAt,note:'仅确认该发布年，具体月日未核；不补造日期。'})
    if(s.editionDate)dates.push({kind:'document-version',value:s.editionDate,note:'文档版次日期；网页发布日期未确认。'})
    if(s.documentDatedAt)dates.push({kind:'authored',value:s.documentDatedAt,note:'报告署期；不能当作网页发布日期。'})
    if(s.modifiedAt)dates.push({kind:'updated',value:s.modifiedAt,note:'网页修改日期；与发布日期分开。'})
    if(s.dateEvidence)dateEvidence.push({sourceId:id(s.id),locator:'网页日期原文，LF 文本行 '+s.dateEvidence.start+'–'+s.dateEvidence.end+'；文本 SHA256 '+s.dateEvidence.cacheSha256})
    append(next.sources,{id:id(s.id),country:'us',title:s.title,publisher:s.publisher,url:s.url,published:precisePublication?s.publishedAt:null,retrieved:s.retrievedAt,kind:sourceKind(s.evidenceType),dates,dateEvidence,...(s.publishedAt && !precisePublication?{publishedLabel:'仅确认发布年 '+s.publishedAt+'；具体月日缺失'}:{}),evidenceLevel:levels[s.evidenceType],evidencePeriod:s.evidencePeriod,readStatus:s.readStatus,limitations:strings([s.limitations,s.note,s.dateStatus,s.fullTextAccessUrl?'已审全文入口：'+s.fullTextAccessUrl:undefined,'来源地理范围：'+s.geography,deploymentBoundary])})
  }
  check(locators.size===381 && [...locators.values()].filter(l=>l.statementType==='direct-fact-limited-to-source').length===142 && [...locators.values()].filter(l=>l.researchBoundary).length===73,'来源声明或分离边界计数错误')
  const resolve=(r:Raw)=>{const s=sources.get(r.sourceId),l=locators.get(r.sourceId+'::'+r.locatorId);check(s && l,'原文定位不存在');if(r.supportsOnly!==undefined)check(r.supportsOnly===l.claim && r.statementType===l.statementType && same(r.sourceResearchBoundary,l.researchBoundary),'来源引用镜像错误');if(r.boundary!==undefined)check(r.boundary===l.claim && (r.statementType===l.statementType || (r.statementType==='source-limited-condition-or-event' && l.statementType==='direct-fact-limited-to-source' && !l.researchBoundary)) && same(r.sourceResearchBoundary,l.researchBoundary),'条件镜像错误');return{s,l}}
  const ref=(r:Raw):Task['workflowEvidence'][number]=>{const {l}=resolve(r);return{sourceId:id(r.sourceId),locator:strings([l.section,'定位编号：'+r.locatorId,...(l.cacheRanges?.length?l.cacheRanges.map((x:Raw)=>'LF 文本行 '+x.start+'–'+x.end+'；文本 SHA256 '+x.cacheSha256):['LF 文本行 '+l.cacheLine+'；文本 SHA256 '+l.cacheSha256]),l.quoteStatus]).join(' · ')}}
  const refs=(rr:Raw[])=>rr.map(ref)
  const shared=(r:Raw)=>{const {l}=resolve(r);return[id(r.sourceId+'-'+r.locatorId),...(l.researchBoundary?[id(r.sourceId+'-'+r.locatorId+'-boundary')]:[])]}
  for(const s of sources.values())for(const l of s.locators){
    const cid=id(s.id+'-'+l.id),evidence=[ref({sourceId:s.id,locatorId:l.id})],conditions=[s.limitations,'来源地理范围：'+s.geography,levels[s.evidenceType],deploymentBoundary]
    append(next.claims,{id:cid,country:'us',kind:l.statementType==='direct-fact-limited-to-source'?'fact':'judgment',text:(l.statementType==='direct-fact-limited-to-source'?'来源陈述：':'来源范围判读：')+l.claim,evidence,basedOn:[],conditions,status:'draft',deployment:stage(s.evidenceType),numericValue:null})
    if(l.researchBoundary){check(l.researchBoundary.statementType==='research-judgment','混合研究边界错误');append(next.claims,{id:cid+'-boundary',country:'us',kind:'judgment',text:'研究边界：'+l.researchBoundary.text,evidence,basedOn:[cid],conditions,status:'draft',deployment:stage(s.evidenceType),numericValue:null})}
  }
  const cash=main.cashFlowModels[0];check(main.cashFlowModels.length===1 && cash.id==='US-CON-CF1' && cash.currency==='USD' && Object.values(cash.parameters).every(x=>x===null) && cash.npv===null && cash.paybackYears===null,'现金模型不再是空参数框架')
  const add=(t:Task,suffix:string,text:string,rr:Raw[],kind:Research['claims'][number]['kind'],conditions:string[]=[])=>{const cid=id(t.id+'-'+suffix);append(next.claims,{id:cid,country:'us',taskId:t.id,kind:rr.length?kind:'hypothesis',text,evidence:refs(rr),basedOn:unique(rr.flatMap(shared)),conditions:unique([t.boundary,...conditions]),status:'draft',deployment:'unknown',numericValue:null});return cid}
  const updates=new Map<string,Task>()
  for(const o of originals.values()){
    const t=structuredClone(canonical.get(o.id.toLowerCase())!),dr=o.inventoryReview,sc=scenarios.get(o.scenarioId)!,d=decisions.get(o.id)!,f=lastChecks.get(o.id)!,tier=o.positiveCounterexample.status
    check(tiers[tier] && o.positiveCounterexample.commercialSuccessConfirmed===false && o.counterEvidence.failureOrExitCase===null,'正反证据边界错误')
    const notes=unique([definitionBoundary,o.executionConditions.taskBoundary,o.executionConditions.conditionToValidate,o.executorBoundary.text,...dr.overlapNotes,dr.reason,dr.phase.original===dr.phase.recommended?'现场顺序仍须项目 SOP 核对。':'阶段按独审建议由“'+dr.phase.original+'”显示为“'+dr.phase.recommended+'”；原始盘点快照保留。'])
    const workflow=dr.actionSupport.filter((r:Raw)=>sources.get(r.sourceId)!.evidenceType!=='official-occupation-task-description'),occupation=dr.actionSupport.filter((r:Raw)=>sources.get(r.sourceId)!.evidenceType==='official-occupation-task-description')
    t.phase=phases[dr.phase.recommended]!;t.workflowEvidence=refs(workflow);t.occupationEvidence=refs(occupation)
    t.conditions=unique([t.boundary,...notes]);t.alternatives=[];t.barriers=[];t.conclusionIds=[];t.counterevidenceIds=[];t.searchIds=[]
    const deploymentEvidence:Raw[]=[],sourceBoundConditions:Raw[]=[]
    const attach=(rr:Raw[],scope:string)=>{for(const r of rr){const {s,l}=resolve(r);t.conclusionIds.push(...shared(r));const bound={...ref(r),level:levels[s.evidenceType],scope:strings([l.claim,l.researchBoundary?.text,scope,s.limitations,'地理范围：'+s.geography,deploymentBoundary]).join('；'),statementType:l.statementType,currentOperationConfirmed:false,fullTaskAcceptanceVerified:false};if(!deploymentEvidence.some(x=>same(x,bound))){deploymentEvidence.push(bound);sourceBoundConditions.push(bound)}}}
    attach(o.sourceRefs,o.executionConditions.taskBoundary);attach(dr.actionSupport,dr.reason)
    for(const r of o.sourceBoundConditions)resolve(r)
    for(const r of o.statementSeparation.directFacts){const {l}=resolve(r);check(l.statementType==='direct-fact-limited-to-source' && (!r.field || r.field==='claim'),'研究判断误入直接事实')}
    for(const r of o.statementSeparation.sourceResearchBoundaries??[]){const {l}=resolve(r);check(r.statementType==='research-judgment' && r.text===(r.field==='claim'?l.claim:l.researchBoundary?.text),'任务研究边界未绑定已审正文')}
    check(o.statementSeparation.directFacts.length===f.directFactCount && (o.statementSeparation.sourceResearchBoundaries??[]).length===f.sourceResearchBoundaryCount,'逐项事实/研究边界计数不符')
    t.summary=[tiers[tier],o.executionConditions.taskBoundary].join(' ')
    t.conclusionIds.push(add(t,'scope',t.summary+' '+o.positiveCounterexample.description+' '+o.positiveCounterexample.noGeneralization,o.sourceRefs,'judgment',notes))
    t.conclusionIds.push(add(t,'definition',dr.reason+'；验收仍是拟议研究边界，未验证现场 SOP。',dr.actionSupport,'judgment',notes))
    t.conclusionIds.push(add(t,'conditions',o.executionConditions.conditionToValidate,o.executionConditions.sourceRefs,'hypothesis',notes))
    for(const [i,a] of (o.alternatives as Raw[]).entries()){
      check(a.fullTaskCoverage==='unverified' && (a.evidenceClass===tier || (o.id==='US-CON-DRYWALL-005' && a.evidenceClass==='simulation-mechanism-only-not-physical-assistance')),'替代方案层级或完整任务覆盖变化')
      const text=strings([a.name,a.supportsOnly,a.requiresValidation]).join('；');attach(a.sourceRefs,text)
      const cid=add(t,'alternative-'+i,text,a.sourceRefs,'judgment',notes)
      t.alternatives.push({category:'unclassified',description:text,claimIds:unique([cid,...a.sourceRefs.flatMap(shared)]),conditions:[a.evidenceClass==='simulation-mechanism-only-not-physical-assistance'?'只有模拟机制，不是实体辅助作业证据。':tiers[tier],o.technologyScreening.conclusion,'组合路线按原文保留，未将名称猜分为五类独立方案。',...notes],remainingLabor:[...o.residualHuman.activities,o.residualHuman.taskSpecificBoundary]});t.conclusionIds.push(cid)
    }
    for(const type of ['technical','economic','adoption'] as const)for(const [i,b] of (o.barriers[type] as Raw[]).entries()){
      check(b.statementType==='unverified-hypothesis' && b.sourceRefs.length===0,'待验证障碍被升级')
      const cid=add(t,type+'-'+i,b.text,b.sourceRefs,'hypothesis',notes);t.barriers.push({type,scenario:o.executionConditions.taskBoundary,claimIds:[cid]})
    }
    const negative=o.counterEvidence;attach(negative.boundedSourceRefs,negative.scope+'；'+negative.sourceInterpretation)
    t.counterevidenceIds.push(add(t,'counterevidence',strings([negative.evidenceStatus,negative.scope,negative.sourceInterpretation,negative.remainingGap,'本轮没有确认本任务完整自动化商业失败或退出案例。']).join('；'),negative.boundedSourceRefs,'judgment',notes))
    t.conclusionIds.push(add(t,'remaining-human',[...o.residualHuman.activities,o.residualHuman.taskSpecificBoundary,'残留工时未测量。'].join('；'),o.residualHuman.sourceRefs,'hypothesis',notes))
    const opportunities:Raw[]=[]
    for(const op of main.opportunities.filter((x:Raw)=>x.taskIds.includes(o.id))){const scope=op.taskScopeStatements.find((x:Raw)=>x.taskId===o.id),reviewed=review.opportunityDecisions.find((x:Raw)=>x.opportunityId===op.id);check(scope?.statementType==='research-judgment' && reviewed && same(op.taskIds,reviewed.taskIds),'机会未绑定当前父任务或独审');attach(op.sourceRefs,scope.scope);const cid=add(t,op.id,[op.title,op.why,'当前任务范围：'+scope.scope,'成立条件：'+op.conditions.join('；'),'下一步验证：'+op.nextValidation].join('；'),op.sourceRefs,'judgment',[...notes,...op.conditions]);t.conclusionIds.push(cid);opportunities.push({...structuredClone(op),currentTaskScope:scope.scope,claimId:cid,independentDecision:structuredClone(reviewed)})}
    for(const qid of [...o.searchAudit.positiveQueryIds,...o.searchAudit.negativeQueryIds]){
      const q=queries.get(qid);check(q && q.taskId===o.id && q.executionStatus==='completed' && q.executedAt===main.reviewedAt && ['positive','negative'].includes(q.direction),'实际查询归属错误')
      const sid=id(q.id);append(next.searches,{id:sid,country:'us',taskId:t.id,direction:q.direction==='positive'?'automation':'counterevidence',query:q.query,searchedOn:q.executedAt,results:[],outcome:'completed-candidates-unattributed',note:queryBoundary+' '+q.queryScope+' '+q.screeningConclusion,audit:{file:p.audit.file,id:q.id,sha256:p.audit.sha256}});t.searchIds.push(sid)
    }
    t.researchStatus='in-progress';t.conclusionIds=unique(t.conclusionIds);t.counterevidenceIds=unique(t.counterevidenceIds)
    t.evidenceGaps=unique([...o.evidenceGaps,...sc.gaps,main.researchScope.notCovered,o.humanInput.fact,...o.cashFlow.taskSpecificMissing,queryBoundary,...notes,dr.splitSuggestions.length?'拆分仅为建议；子项未继承查询、成功证据或人工数量，不新增计数。':'',cash.constructionBoundary].filter(Boolean))
    t.interviewQuestions=unique([...o.interviewQuestions,...dr.splitSuggestions.map((s:string)=>'请确认拟议子项是否可独立验收及核算：'+s)])
    t.discovery!.supportStatus=dr.recommendedInventoryStatus;t.discovery!.acceptanceStatus=dr.acceptanceStatus;t.discovery!.sourceLimitations=unique([...t.discovery!.sourceLimitations,definitionBoundary,dr.reason])
    t.evidenceAge=unique(o.sourceRefs.map((r:Raw)=>sources.get(r.sourceId)!.evidencePeriod)).join('；')||'本任务缺少匹配来源；历史职业与流程原文的适用边界另列。'
    t.review={reviewer:'美国建筑独立来源审校与 RC01 限定复检',date:finalRecheck.reviewedAt,notes:'所列修订已通过限定复检；131 候选尚未冻结，完整范围、现场工时及现金参数仍待补。'}
    t.dossier={...t.dossier,publicResearch:{country:'us',provenance:p,canFreeze:false,currentReviewStatus:finalRecheck.decision,
      definitionReview:{...structuredClone(dr),note:notes.join('；'),children:[...dr.splitSuggestions],proposedChildrenCounted:false,sourceRefs:structuredClone(dr.actionSupport),independentDecision:structuredClone(d),limitedRecheck:structuredClone(f)},
      evidenceSupportTier:tier,evidenceSupportTierLabel:tiers[tier],deploymentEvidence,sourceBoundConditions,originalSourceBoundConditions:structuredClone(o.sourceBoundConditions),statementSeparation:structuredClone(o.statementSeparation),executorBoundary:structuredClone(o.executorBoundary),executionConditions:structuredClone(o.executionConditions),originalHumanInput:structuredClone(o.humanInput),remainingHuman:structuredClone(o.residualHuman),alternatives:structuredClone(o.alternatives),technologyScreening:structuredClone(o.technologyScreening),positiveCounterexample:structuredClone(o.positiveCounterexample),counterEvidence:structuredClone(o.counterEvidence),barriers:structuredClone(o.barriers),opportunities,
      economics:{...structuredClone(cash),taskSpecific:structuredClone(o.cashFlow),workingCapitalDefinition:cash.workingCapitalChangeFormula+'；'+cash.parameterDefinitions.WC_incremental_0+'；'+cash.parameterDefinitions.recovered_working_capital_T,throughputBenefitConstraint:cash.constructionBoundary,comparisonScope:cash.costBoundary},
      searchAudit:structuredClone(o.searchAudit),queryEvidenceLevel:structuredClone(o.queryEvidenceLevel),searchSummary:queryBoundary,originalRequestUTC:null,queryIds:[...o.searchAudit.positiveQueryIds,...o.searchAudit.negativeQueryIds],historicalAuthorRevision:structuredClone(o.authorRevision)}}
    const prior=canonical.get(t.id)!.dossier?.publicResearch
    if(prior)check(same(canonical.get(t.id),t),'已导入研究或有效定义冲突：'+t.id)
    updates.set(t.id,t)
  }
  next.tasks=next.tasks.map(t=>updates.get(t.id)??t)
  // One independently reviewed phase correction changes only its effective graph
  // membership; the 131 inventory snapshots and their original order stay intact.
  next.scenarios=next.scenarios.map(s=>{if(s.industryId!==industryId)return s;check(s.country==='us' && scenarios.has(s.id.toUpperCase()),'场景串国或新增');return{...s,coverage:s.coverage.map(c=>({...c,taskIds:next.tasks.filter(t=>t.scenarioId===s.id && t.phase===phases[c.phase]).map(t=>t.id)}))}})
  const catalogue={country:'us',provenance:p,taskIds:[...originals.keys()].map(x=>x.toLowerCase()),taskCount:131,proposedSplitParents:37,proposedChildren:76,approvedNewTasks:0,canFreeze:false,statistics:structuredClone(main.statistics),evidenceSupportTierCounts:{'bounded-mechanism-or-tool-for-substep':74,'adjacent-mechanism-or-workflow-only':21,'no-matched-alternative-evidence':36},
    originalScenarios:structuredClone(main.scenarios),researchScope:structuredClone(main.researchScope),researchPassLimitations:structuredClone(main.researchPassLimitations),opportunities:structuredClone(main.opportunities),cashFlowModels:structuredClone(main.cashFlowModels),remainingGaps:structuredClone(finalRecheck.remainingGaps),originalIndependentReviewGaps:structuredClone(review.remainingGaps),firstRecheckGaps:structuredClone(recheck.remainingGaps),authorAdditionalScopeIssues:structuredClone(main.authorRevision.authorAdditionalScopeIssues),
    queryAudit:{file:p.audit.file,sha256:p.audit.sha256,mainQueries:262,taskPairs:131,mergedResultBatches:66,executionBoundary:queryBoundary,originalRequestUTC:null,requestTextIndependentlyCaptured:false,exactUTCIndependentlyCaptured:false,sourceDiscoveryReads:structuredClone(audit.sourceDiscoveryReads),sourceDiscoveryReadsCountedAsTaskSearches:false},
    statementClassification:{directSourceFacts:142,sourceApplicabilityJudgments:239,separatedResearchBoundaries:73,originalMixedSentenceLocators:71,additionalMixedSentenceLocators:['DRYWALL-STUDY.pick','RUFUS.preview']},publicationBoundary:'仅已审 10 场景、131 原候选的未冻结研究版本；37 组拆分建议共 76 子项尚未批准，不新增任务或完成数。'}
  next.industries=next.industries.map(i=>{if(i.id!==industryId)return i;check(!i.inventory?.constructionResearch || same(i.inventory.constructionResearch,catalogue),'行业目录冲突');return{...i,inventory:{...i.inventory,constructionResearch:catalogue}}})
  return validateResearch(next)
}
