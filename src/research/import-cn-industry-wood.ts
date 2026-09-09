import {createHash} from 'node:crypto'
import {isDeepStrictEqual} from 'node:util'
import type {Research,Task} from './schema'
import {validateResearch} from './validate'

type Raw=Record<string,any>
const stem='cn-industry-wood-furniture-paper-print-cultural-20-24'
const prefix='automation-cn-wood-'
const industryId='cn-industry'
export const cnIndustryWoodFiles=Object.freeze({
  inventory:{file:'research/inventories/cn-core.json',sha256:'5388db09742709d606032d030ced3985f802a6e221441b59cd1302064ee8983e'},
  main:{file:`research/automation/${stem}.json`,sha256:'6b0a5e972b32798b0e5ef91039af15153a5a04a4dca760e75fa2d08647caee48'},
  audit:{file:`research/automation/${stem}-search-audit.json`,sha256:'ad502f79926142b52483bd13c8e3aef2bffa52660a4eac0fb18626ce905ef0c0'},
  review:{file:`research/reviews/${stem}-automation-decisions.json`,sha256:'64ec46d98b4e9986ff0c3e521edc1b976a3268c0024d78e3b8ea0aa6af363b1b'},
  revisions:{file:`research/automation/${stem}-revisions.json`,sha256:'cff7062885612751ef69e57a839d9dbf3a88855c0fdc1a55b9a0affcc549cd01'},
  authorValidation:{file:`research/automation/${stem}-validation.json`,sha256:'e3701bdb1d255572ee6c99fea4048e1a5cf33a24a5d4fce85c3755abab807265'},
  recheck:{file:`research/reviews/${stem}-automation-recheck.json`,sha256:'f4055e7580c93a0028c321b24d5b5cda6e03a9714949b5fceea918d9c31a63d6'},
  limitedRevisions:{file:`research/automation/${stem}-rc01-revisions.json`,sha256:'41265826a33c1b102d2ac8a61bfad639be182949b44a01cd58946024aeb24854'},
  finalRecheck:{file:`research/reviews/${stem}-automation-rc01-recheck.json`,sha256:'5972a766774b4a8506fb403b2ceadce56191a16113207d9e470805688fff48a2'},
} as const)
for(const pin of Object.values(cnIndustryWoodFiles))Object.freeze(pin)
const check:(value:unknown,message:string)=>asserts value=(value,message)=>{if(!value)throw new Error('木材等行业导入：'+message)}
const jsonValue=(v:unknown):unknown=>v===undefined?undefined:JSON.parse(JSON.stringify(v))
const same=(a:unknown,b:unknown)=>isDeepStrictEqual(jsonValue(a),jsonValue(b))
const id=(value:string)=>prefix+value.toLowerCase()
const claimId=(r:Raw)=>id(r.sourceId+'-'+r.locatorId)
const boundaryId=(r:Raw)=>claimId(r)+'-scope-boundary'
const unique=(xs:string[])=>[...new Set(xs)]
const strings=(v:unknown):string[]=>(Array.isArray(v)?v:[v]).filter((x):x is string=>typeof x==='string' && !!x)
const date=(v:unknown)=>typeof v==='string' && /^\d{4}-\d{2}-\d{2}$/.test(v)?v:null
const noNumbers=(v:unknown):boolean=>typeof v!=='number' && (v===null || typeof v!=='object' || Object.values(v).every(noNumbers))
const index=(rows:Raw[],key:string,count?:number)=>{const out=new Map<string,Raw>(rows.map(x=>[x[key],x]));check(out.size===rows.length && (count===undefined || out.size===count),'编号重复或数量不符：'+key);return out}
const append=<T extends {id:string}>(rows:T[],entry:T)=>{const old=rows.find(x=>x.id===entry.id);check(!old || same(old,entry),'已有记录冲突：'+entry.id);if(!old)rows.push(entry)}
const at=(value:Raw,path:string):any=>path.split('/').slice(1).reduce((v,k)=>v[k.replace(/~1/g,'/').replace(/~0/g,'~')],value)
const phases:Record<string,Task['phase']>={'准备':'preparation','作业':'operation','交接':'handoff','检测':'inspection','异常':'exception','返工':'rework','清洁维护':'maintenance','交付':'delivery'}
const categories:Record<string,Task['alternatives'][number]['category']>={'traditional-machine':'traditional-machine','special-purpose-machine':'dedicated-machine','robot':'robot','auxiliary-tool':'assistive-tool','sensor-assistance':'assistive-tool','vision-assistance':'assistive-tool','digital-support':'digital-process'}
const tiers:Record<string,string>={
  'bounded-partial-mechanism':'已有受条件限制的局部机制；完整验收与持续运行尚未证实。',
  'product-or-function-catalog-only':'仅有产品或功能目录线索，不能当作已核具体动作机制。',
  'adjacent-process-only':'仅有相邻工序证据，尚未匹配本任务动作。',
  'cross-material-conditional-candidate':'仅有跨材料条件性线索；当前材料适配尚未验证。',
  'no-new-matched-mechanism':'本轮未保留新的匹配机制，不否定已有机械基线，也不证明不可行。',
}
const tierCounts={'bounded-partial-mechanism':60,'product-or-function-catalog-only':21,'adjacent-process-only':3,'cross-material-conditional-candidate':2,'no-new-matched-mechanism':95}
const scopeBoundary='职业直接动作、部分动作、行业背景与 HJ 工艺单元分别限定；均不自动支持验收阈值、实际部署、人工投入或完整流程覆盖。'
const definitionStatus='181 项已完成首轮独审和所列修订的限定复检；现场 SOP、职业正式版、现行规范和遗漏场景仍待补，任务不冻结。'
const queryBoundary='362 条主查询按 91 个合并池保存；36 条补充按原 9 组保留。只有请求文本、日期及对应合并回包，无独立预调用写入时序或秒级 UTC 证明；候选不逐查询归因，五类路线未各自穷尽。'
const workingCapital='NWC_t 为项目相对同一基线的期末营运资金余额；期初只扣 NWC_0，后续仅扣 ΔNWC_t = NWC_t − NWC_(t−1)。期末仅回收实际可释放余额一次；最后一期差额已含释放时不再加 recovered_working_capital。'
const cashExitGap='按同一合法基线核增量替换、旧设备处置、解约、并行切换和退出支出；与更新资本、部署切换、停机或净残值中的同项逐笔去重，所有参数仍为空。'
// Labels expose existing null parameter fields; they add no estimated inputs.
const parameterLabels:Record<string,string>={analysis_years:'分析年限',discount_rate:'折现率',full_deployment_investment:'完整部署投入',avoided_paid_labor:'可撤销付薪支出毛额',residual_paid_labor:'残留付薪支出',maintenance:'维护支出',software_and_connectivity:'软件与连接支出',incremental_energy_water_inputs:'能源水和耗材增量投入',exception_rework_cost:'异常返工支出',downtime_cash_loss:'停机现金损失',confirmed_unmet_demand:'已确认未满足需求',verified_bottleneck_relief:'已验证瓶颈释放能力',usable_incremental_capacity:'下游约束后可用新增产能',unit_incremental_contribution:'增量单位贡献',avoided_cash_losses:'避免的现金损失',incremental_working_capital:'期初增量营运资金',disposal_cash_proceeds:'处置现金收入',recovered_working_capital:'期末回收营运资金',decommissioning_cost:'退役支出',incremental_insurance_compliance_training:'保险合规培训增量支出',incremental_cash_taxes:'增量现金税费',replacement_capital_expenditure:'更新资本支出',change_in_working_capital:'后续营运资金变化'}
const levelLabel=(level:string)=>tiers[level]??(level==='bounded-board-edge-unit-function'?'局部板边单元功能，不代表全部家具表面处理。':level)
const stage=(level:string):Research['claims'][number]['deployment']=>/vendor|supplier/.test(level)?'vendor-report':/prototype/.test(level)?'laboratory':'unknown'
const sourceKind=(level:string):Research['sources'][number]['kind']=>/vendor|supplier/.test(level)?'vendor':/operator/.test(level)?'operator':/prototype/.test(level)?'paper':'other'
const roleLabels:Record<string,string>={
  'occupation-action-presence-only':'职业原文动作存在（不提供工时或验收）',
  'process-unit-or-scenario-scope':'工艺单元或场景范围',
  'occupation-context-only':'职业场景背景',
  'occupation-industry-context-only':'行业职业背景',
  'planned-process-only':'拟建流程',
}

function readAndVerify(files:Readonly<Record<string,string>>) {
  const p=cnIndustryWoodFiles,all:Record<string,Raw>={}
  for(const [key,pin] of Object.entries(p)){
    const bytes=files[pin.file]
    check(typeof bytes==='string' && createHash('sha256').update(bytes,'utf8').digest('hex')===pin.sha256,'实际文件 SHA 不匹配：'+pin.file)
    all[key]=JSON.parse(bytes)
  }
  const {inventory:i,main:m,audit:a,review:r,revisions:v,authorValidation:z,recheck:c,limitedRevisions:l,finalRecheck:f}=all
  for(const value of [i,m,a,r,c,l,f])check(value.country==='CN' && (!value.industryId || value.industryId===industryId),'国家或行业绑定错误')
  check(m.inventorySource===p.inventory.file && m.inventorySha256===p.inventory.sha256 && a.inventorySha256===p.inventory.sha256 && r.input.inventorySha256===p.inventory.sha256 && z.inventorySha256===p.inventory.sha256,'库存绑定错误')
  check(r.input.rawPath===p.main.file && v.reviewDecisionsSha256===p.review.sha256 && v.inputFiles[stem+'.json']===r.input.rawSha256 && v.inputFiles[stem+'-search-audit.json']===r.input.auditSha256 && m.reviewResponse.reviewReference.sha256===p.review.sha256 && m.reviewResponse.originalInputSha256===r.input.rawSha256,'原独审和作者修订绑定错误')
  check(v.outputFiles[stem+'.json']===c.input.files[stem+'.json'] && v.outputFiles[stem+'-search-audit.json']===p.audit.sha256 && c.input.files[stem+'-search-audit.json']===p.audit.sha256 && c.input.files[stem+'-revisions.json']===p.revisions.sha256 && c.input.firstReviewDecisionsSha256===p.review.sha256 && c.input.firstReviewOriginalRawSha256===r.input.rawSha256,'首轮修订和限定复检绑定错误')
  check(l.beforeSha256===v.outputFiles[stem+'.json'] && l.afterSha256===p.main.sha256 && l.independentRecheckSha256===p.recheck.sha256 && f.input.beforeRawSha256===l.beforeSha256 && f.input.afterRawSha256===p.main.sha256 && f.input.rc01ReceiptSha256===p.limitedRevisions.sha256 && f.input.priorLimitedRecheckSha256===p.recheck.sha256 && f.input.firstReviewDecisionsSha256===p.review.sha256 && f.input.originalAuthorRevisionSha256===p.revisions.sha256 && f.input.firstReviewRawSha256===r.input.rawSha256,'RC01 修订和最终复检绑定错误')
  for(const pin of [p.audit,p.revisions,p.authorValidation,p.recheck])check(l.inputFiles.find((x:Raw)=>x.path===pin.file)?.sha256===pin.sha256,'RC01 附件 SHA 绑定错误')
  // The old validator was deliberately not rerun. Only the independent complete
  // three-path bridge establishes inheritance to the final 6b0a document.
  check(z.outputSha256===l.beforeSha256 && z.outputSha256!==p.main.sha256 && z.searchAuditSha256===p.audit.sha256 && z.reviewDecisionsSha256===p.review.sha256 && z.reviewInputSha256===r.input.rawSha256 && z.errors.length===0 && v.outputFiles[stem+'-validation.json']===p.authorValidation.sha256,'旧校验输入绑定错误')
  check(f.historicalArtifacts.previousValidationSha256===p.authorValidation.sha256 && f.historicalArtifacts.previousValidationOutputSha256===z.outputSha256 && f.historicalArtifacts.previousValidationWasRerunFor6b0a===false && f.historicalArtifacts.previousMarkdownStillDescribes3075===true,'不能将旧校验或 Markdown 标作覆盖最终稿')
  check(f.overallVerdict==='RC01-closed-accepted-for-unfrozen-working-version' && f.remainingMandatoryRC01Repairs.length===0 && l.changesExactlyThreePaths===true && f.wholeFileVerification.jsonChangedPathCount===3,'最终限定复检未通过')
  for(const [key,value] of Object.entries(f.wholeFileVerification))if(typeof value==='boolean')check(value,'完整差异桥接未通过：'+key)
  check(l.exactChanges.length===3 && same(f.exactChangedPaths,l.exactChanges.map((x:Raw)=>x.path)),'最终变更不只三条路径')
  for(const change of l.exactChanges){
    const rc=f.taskFieldChecks.find((x:Raw)=>x.path===change.path),prior=c.remainingRepairs.find((x:Raw)=>x.path===change.path)
    check(rc && prior && rc.taskId===change.taskId && rc.after===change.after && prior.requiredValue===change.after && at(m,change.path)===change.after && same(at(m,change.retainedBoundaryPath),change.retainedBoundary) && rc.retainedBoundaryObjectUnchanged===true && rc.sourceClaimAndCounterEvidenceMirrorsMatch===true,'RC01 三值或独立边界未应用')
    const loc=m.sources.find((s:Raw)=>s.id===change.sourceRef.sourceId)?.locators.find((x:Raw)=>x.id===change.sourceRef.locatorId)
    check(loc?.claim===change.after && loc.researchBoundary===change.retainedBoundary.text,'最终技术声明和来源镜像不同步')
  }
  check(m.isFrozen===false && r.isFrozen===false && c.isFrozen===false && f.isFrozen===false && l.isFrozen===false && m.sourceTaskCount===181 && m.statistics.taskCount===181 && c.statistics.tasksChecked===181 && f.wholeFileVerification.newCountedTasks===0,'任务或冻结状态不符')
  check(Object.values(v.guards).every(x=>x===true) && c.cashAndHumanRecheck.all181ProtectedHumanCashAndOriginalFieldsUnchanged===true && c.cashAndHumanRecheck.allParametersRemainNull===true,'原任务或现金保留检查未通过')
  check(r.queryAudit.mainQueries===362 && r.queryAudit.supplementalQueries===36 && c.queryAuditRecheck.mainBatches===91 && c.queryAuditRecheck.supplementalBatches===9 && c.queryAuditRecheck.exactOriginalCallUTCVerified===false && c.queryAuditRecheck.independentPreCallWriteOrderProven===false && c.queryAuditRecheck.queriesRerunInThisRecheck===0 && f.noAdditionalExecutionClaim.newSearches===0,'查询数量或时间证据边界错误')
  check(a.supplementalSearches.length===9 && a.supplementalSearches.reduce((n:number,b:Raw)=>n+b.queries.length,0)===36,'补充查询组不符')
  check(c.decompositionProposals.length===9 && c.displayPhaseProposals.length===5 && c.decompositionProposals.every((x:Raw)=>x.newCountedTasks===0),'拟拆或阶段建议计数错误')
  return all
}

/** Pure import of 181 existing candidates. The source bytes and every independent
 * review link are checked before cloning; no file I/O or canonical publication. */
export function importCnIndustryWood(data:Research,files:Readonly<Record<string,string>>):Research {
  const p=cnIndustryWoodFiles,{inventory,main,audit,review,recheck,finalRecheck,authorValidation}=readAndVerify(files)
  check(data.freezeStatus!=='frozen','不能向冻结版本导入工作稿')
  const originals=index(main.tasks,'id',181),decisions=index(review.taskDecisions,'taskId',181),rechecks=index(recheck.taskRechecks,'taskId',181)
  const scenarios=index(main.scenarios,'id',20),sources=index(main.sources,'id',58),definitions=index(main.inventorySources,'id',6),queries=index(audit.taskQueries,'id',362),pools=index(audit.resultPools,'id',91)
  const inventoryTasks=index(inventory.industries.find((i:Raw)=>i.id===industryId).scenarios.flatMap((s:Raw)=>s.tasks),'id'),canonical=new Map(data.tasks.map(t=>[t.id,t]))
  const actualCounts:Record<string,number>={}
  for(const o of originals.values()){
    const t=canonical.get(o.id),d=decisions.get(o.id),c=rechecks.get(o.id),prior=t?.dossier?.publicResearch as Raw|undefined
    check(t && t.country==='cn' && o.country==='CN' && t.industryId===industryId && o.industryId===industryId && t.scenarioId===o.scenarioId && scenarios.get(o.scenarioId)?.taskIds.includes(t.id),'父任务国家、行业或场景错误：'+o.id)
    check(same(o.originalTask,inventoryTasks.get(o.id)) && same(t.dossier?.originalTask,o.originalTask) && t.discovery?.inputSha256===p.inventory.sha256 && t.discovery.inventoryFile===p.inventory.file,'原任务快照或库存绑定改变：'+o.id)
    check(t.title===o.action && same(t.inputs,o.inputs) && same(t.outputs,o.outputs) && same(t.acceptance,strings(o.acceptance)) && t.phase===phases[o.phase] && t.boundary===scenarios.get(o.scenarioId)?.scope && t.countingRole==='atomic-candidate','原任务有效定义改变：'+o.id)
    check(d?.originalTaskMatchesFixedInputInventory===true && d.originalAction===o.action && d.scenarioId===o.scenarioId && c && Object.values(c.protectedFieldChecks).every(x=>x===true) && o.isFrozen===false && o.inventoryDisposition.newCountedTasks===0 && o.inventoryDisposition.proposedChildrenCounted===false,'逐任务裁决或保留状态不符：'+o.id)
    check(!prior || (prior.provenance?.main?.sha256===p.main.sha256 && prior.provenance?.finalRecheck?.sha256===p.finalRecheck.sha256 && prior.canFreeze===false),'已有研究版本冲突：'+o.id)
    check(['not-started','in-progress'].includes(t.researchStatus) && t.manualInputs.every(x=>x.value===null) && noNumbers(o.humanInput) && noNumbers(o.cashFlow) && (!prior || noNumbers(prior.economics)),'人工或现金不再为空：'+o.id)
    actualCounts[o.conclusion.coverageLevel]=(actualCounts[o.conclusion.coverageLevel]??0)+1
  }
  check(same(actualCounts,tierCounts),'五类证据计数不符')
  const next:Research={...data,sources:[...data.sources],claims:[...data.claims],searches:[...data.searches],tasks:[...data.tasks],industries:[...data.industries]}
  for(const s of sources.values()){
    const rs=review.sourceDecisions.find((x:Raw)=>x.sourceId===s.id)
    check(rs?.cacheHashVerified===true && rs.cacheSha256===s.originalContentSha256 && s.locators.length && date(s.retrievedAt),'来源原文缓存或日期绑定不符')
    const dates:NonNullable<Research['sources'][number]['dates']>=[],dateEvidence:Task['workflowEvidence']=[]
    for(const meta of rs.metadataReads){
      if(meta.documentDate){dates.push({kind:'document-version',value:meta.documentDate,note:meta.note});dateEvidence.push({sourceId:id(s.id),locator:'PDF物理第'+meta.physicalPage+'页，版面日期'})}
      else if(meta.normalizedLine)dateEvidence.push({sourceId:id(s.id),locator:'规范化原文行'+meta.normalizedLine+'，日期/事件字段'})
    }
    if(s.id==='CN-WOOD-WANLIAN')dates.push({kind:'displayed',value:'2026-06-12',note:'网页显示时间戳，无法确定为首次发布日期；published 留空。'})
    append(next.sources,{id:id(s.id),country:'cn',title:s.title,publisher:s.publisher,url:s.url,published:date(s.publishedAt),retrieved:s.retrievedAt,kind:sourceKind(s.evidenceType),sha256:s.originalContentSha256,dates,dateEvidence,evidencePeriod:s.evidencePeriod,evidenceLevel:s.evidenceType,readStatus:s.readStatus,limitations:strings([s.limitations,s.geography,s.hashRepresentation,s.locatorConvention,rs.reviewNote,'资料层级和时期不等于当前中国完整任务商用验收；拟建方案不作实际运行。'])})
    for(const loc of s.locators){
      check(loc.id && loc.section && loc.claim && loc.statementType==='direct-source-statement','来源声明缺原文定位或类型')
      // This one sentence explicitly combines a reported process change with
      // the research boundary on automated transfer; keep it as a judgment.
      const mixed=s.id==='CN-WOOD-HLJ-PENCIL' && loc.id==='transfer'
      append(next.claims,{id:claimId({sourceId:s.id,locatorId:loc.id}),country:'cn',kind:mixed?'judgment':'fact',text:(mixed?'来源范围判读：':'来源陈述：')+loc.claim,conditions:strings([s.geography,s.evidencePeriod,s.evidenceType,s.limitations]),evidence:[{sourceId:id(s.id),locator:loc.section,...(loc.quote?{excerpt:loc.quote}:{})}],basedOn:[],status:'draft',deployment:stage(s.evidenceType),numericValue:null})
      if(loc.researchBoundary)append(next.claims,{id:boundaryId({sourceId:s.id,locatorId:loc.id}),country:'cn',kind:'judgment',text:'研究边界：'+loc.researchBoundary,conditions:strings([s.geography,s.evidencePeriod,s.limitations]),evidence:[{sourceId:id(s.id),locator:loc.section}],basedOn:[claimId({sourceId:s.id,locatorId:loc.id})],status:'draft',deployment:'not-applicable',numericValue:null})
    }
  }
  for(const s of definitions.values()){
    const read=s.independentReviewRead
    check(read?.reviewReference?.sha256===p.review.sha256 && read.pdfSha256,'定义原文独审绑定缺失')
    const dates:NonNullable<Research['sources'][number]['dates']>=s.id==='cn-bohao-pencil-eia-2025'?[{kind:'document-version',value:'2025-12',note:'封面报批版时间，不是网页发布时间；拟建铅笔/铅芯范围。'}]:[]
    append(next.sources,{id:id(s.id),country:'cn',title:s.title,publisher:s.publisher,url:s.url,published:date(s.publishedAt),retrieved:main.researchedAt,kind:s.id==='cn-occ-2022-draft'?'occupation':s.id==='cn-bohao-pencil-eia-2025'?'other':'standard',sha256:read.pdfSha256,dates,dateEvidence:[],readStatus:s.rereadStatus,evidenceLevel:s.role,limitations:strings([scopeBoundary,read.scopeNote,read.notEvidenceOf,'只核指定页；职业社会公示稿及正式/现行规范仍需核验，不代表所有引用规范现行有效。'])})
  }
  const refs=(rr:Raw[]):Task['workflowEvidence']=>rr.map(ref=>{const s=sources.get(ref.sourceId),loc=s?.locators.find((x:Raw)=>x.id===ref.locatorId);check(s && loc && ref.section,'机制引用超出已读源或缺定位');return {sourceId:id(s.id),locator:unique([loc.section,ref.section]).join(' · ')}})
  const definitionRefs=(rr:Raw[]):Task['workflowEvidence']=>rr.map(ref=>{const s=definitions.get(ref.sourceId),original=inventory.sources.find((x:Raw)=>x.id===ref.sourceId);check(s && original?.locators.some((l:Raw)=>l.id===ref.locatorId) && ref.section && ref.supportRole,'定义引用超出原清单/审校范围');return {sourceId:id(s.id),locator:strings([ref.section,roleLabels[ref.supportRole]??'限定引用角色',ref.supportRole,ref.detail,ref.supportConclusion]).join(' · ')}})
  const add=(t:Task,suffix:string,text:string,evidence:Task['workflowEvidence'],kind:Research['claims'][number]['kind'],conditions:string[]=[],basedOn:string[]=[],deployment:Research['claims'][number]['deployment']='unknown')=>{const cid=id(t.id+'-'+suffix);append(next.claims,{id:cid,country:'cn',taskId:t.id,kind,text,evidence,basedOn:unique(basedOn),conditions:unique([t.boundary,...conditions]),status:'draft',deployment,numericValue:null});return cid}
  const updated=new Map<string,Task>()
  for(const o of originals.values()){
    const t=structuredClone(canonical.get(o.id)!),d=decisions.get(o.id)!,c=rechecks.get(o.id)!,ec=o.executionConditions,disp=o.inventoryDisposition,tier=o.conclusion.coverageLevel
    const split=recheck.decompositionProposals.find((x:Raw)=>x.taskId===t.id),phase=recheck.displayPhaseProposals.find((x:Raw)=>x.taskId===t.id)
    const boundaryNotes=unique(strings([definitionStatus,scopeBoundary,ec.scenarioScope,ec.operatorAttribution,o.displayTitle?'当前限定对象：'+o.displayTitle+'；原候选标题保留作清单记录。':null,disp.reviewNote,...ec.reviewedDefinitionSourceRefs.map((r:Raw)=>r.supportConclusion),phase?'阶段显示建议：'+phase.originalPhase+' → '+phase.proposedDisplayPhase+'；仍为建议，原阶段与快照不变。':null]))
    t.workflowEvidence=definitionRefs(ec.reviewedDefinitionSourceRefs.filter((r:Raw)=>r.sourceId!=='cn-occ-2022-draft'))
    t.occupationEvidence=definitionRefs(ec.reviewedDefinitionSourceRefs.filter((r:Raw)=>r.sourceId==='cn-occ-2022-draft'))
    t.conditions=unique([t.boundary,ec.conditionsToVerify,ec.acceptanceProvenance,...boundaryNotes]);t.conclusionIds=[];t.counterevidenceIds=[];t.alternatives=[];t.barriers=[];t.searchIds=[]
    const sourceBoundConditions:Raw[]=[],deploymentEvidence:Raw[]=[]
    const attach=(rr:Raw[],scope:string)=>{
      const evidence=refs(rr)
      for(const [i,ref] of rr.entries()){
        const s=sources.get(ref.sourceId)!,loc=s.locators.find((x:Raw)=>x.id===ref.locatorId)
        t.conclusionIds.push(claimId(ref));if(loc.researchBoundary)t.conclusionIds.push(boundaryId(ref))
        const bound={...evidence[i],level:s.evidenceType,scope:strings([loc.claim,loc.researchBoundary,scope,s.evidencePeriod,s.geography,s.limitations]).join('；'),currentOperationConfirmed:false,fullTaskAcceptanceVerified:false}
        sourceBoundConditions.push(bound);deploymentEvidence.push(bound)
      }
      return evidence
    }
    const based=(rr:Raw[])=>rr.flatMap(ref=>{const loc=sources.get(ref.sourceId)?.locators.find((l:Raw)=>l.id===ref.locatorId);return [claimId(ref),...(loc?.researchBoundary?[boundaryId(ref)]:[])]})
    t.summary=[tiers[tier],o.conclusion.text,o.conclusion.supportBoundary,...boundaryNotes].join(' ')
    const conclusionEvidence=attach(o.conclusion.sourceRefs,o.conclusion.supportBoundary)
    t.conclusionIds.push(add(t,'conclusion',t.summary,conclusionEvidence,conclusionEvidence.length?'judgment':'hypothesis',t.conditions,based(o.conclusion.sourceRefs)))
    for(const [i,a] of (o.alternatives as Raw[]).entries()){
      check(categories[a.kind],'未知设备类别')
      const scope=strings([a.mechanism,a.supportBoundary,levelLabel(a.evidenceSupportLevel),a.evidencePeriod,a.countryScope,a.reviewedApplicabilityNote,'完整验收与当前持续运行尚未核实。']).join('；'),evidence=attach(a.sourceRefs,scope),shared=based(a.sourceRefs)
      const cid=add(t,'alternative-'+i,scope,evidence,evidence.length?'judgment':'hypothesis',t.conditions,shared,stage(a.deploymentStage))
      t.alternatives.push({category:categories[a.kind],description:scope,claimIds:unique([cid,...shared]),conditions:unique(strings([a.supportBoundary,levelLabel(a.evidenceSupportLevel),...boundaryNotes])),remainingLabor:strings([o.residualHuman.unresolvedActions,o.residualHuman.observedHumanBoundary,o.residualHuman.cashTreatment])});t.conclusionIds.push(cid)
    }
    for(const [category,label] of [['traditional-machine','传统机械'],['dedicated-machine','专机'],['robot','机器人'],['assistive-tool','辅助工具'],['digital-process','数字流程']] as const)if(!t.alternatives.some(a=>a.category===category)){
      const text=label+'：本轮无该类匹配方案；'+o.alternativeCategoryScreen.scopeNote,cid=add(t,'unmatched-'+category,text,[],'hypothesis',[tiers[tier],queryBoundary])
      t.alternatives.push({category,description:text,claimIds:[cid],conditions:[queryBoundary],remainingLabor:['未取得匹配配置与现场工时，不能推定残留人工为零。']});t.conclusionIds.push(cid)
    }
    for(const [kind,b] of Object.entries(o.barriers) as [Task['barriers'][number]['type'],Raw][]){
      const evidence=attach(b.sourceRefs,b.text),cid=add(t,'barrier-'+kind,b.text,evidence,'hypothesis',t.conditions,based(b.sourceRefs)),boundIds=[cid]
      for(const [j,limit] of (b.directLimitingEvidence??[] as Raw[]).entries()){
        const ev=attach(limit.sourceRefs,limit.statement),base=based(limit.sourceRefs)
        // A task-specific constraint is a scope judgment; the separately linked
        // source statement carries its direct-fact classification.
        boundIds.push(add(t,'barrier-'+kind+'-limit-'+j,strings([limit.statement,...(limit.reviewedSourceBoundaries??[]).map((r:Raw)=>r.text),limit.applicability,limit.notEvidenceOf]).join('；'),ev,ev.length?'judgment':'hypothesis',t.conditions,base))
      }
      t.barriers.push({type:kind,scenario:t.boundary,claimIds:boundIds})
    }
    for(const [i,counter] of (o.counterEvidence.records as Raw[]).entries()){
      const scope=strings([counter.type,counter.statement,counter.applicability,counter.notEvidenceOf,...(counter.reviewedSourceBoundaries??[]).map((x:Raw)=>x.text),o.counterEvidence.interpretation]).join('；'),ev=attach(counter.sourceRefs,scope)
      t.counterevidenceIds.push(add(t,'counter-'+i,scope,ev,ev.length?'judgment':'hypothesis',t.conditions,based(counter.sourceRefs)))
    }
    const humanRefs=[...o.residualHuman.sourceBackedRequirements,...o.residualHuman.observedHumanSourceRefs],humanEvidence=attach(humanRefs,o.residualHuman.observedHumanBoundary)
    t.conclusionIds.push(add(t,'remaining-human',strings([o.residualHuman.unresolvedActions,o.residualHuman.observedHumanBoundary]).join('；'),humanEvidence,humanEvidence.length?'judgment':'hypothesis',t.conditions,based(humanRefs)))
    if(o.plannedProcessContext){const context=o.plannedProcessContext,ev=attach(context.sourceRefs,context.boundary);t.conclusionIds.push(add(t,'planned-context',context.boundary+'；'+(context.sourceStatements??[]).map((x:Raw)=>x.text).join('；'),ev,'judgment',t.conditions,based(context.sourceRefs)))}
    for(const [i,lead] of (o.adjacentStageLeads as Raw[]).entries()){const scope=strings(['相邻工序线索，不能直接作为当前动作机制。',lead.reason,lead.mechanism,lead.supportBoundary,lead.note,...(lead.reviewedSourceBoundaries??[]).map((x:Raw)=>x.text)]).join('；'),ev=attach(lead.sourceRefs,scope);t.conclusionIds.push(add(t,'adjacent-lead-'+i,scope,ev,ev.length?'judgment':'hypothesis',t.conditions,based(lead.sourceRefs)))}
    for(const op of (main.opportunities as Raw[]).filter(x=>x.taskIds.includes(t.id))){
      check(op.country==='CN' && op.economicRank===null,'机会国家或收益变化')
      const scope=op.conditions+'；同一设备、人员和产线收益只归属一次。',ev=attach(op.sourceRefs,scope)
      t.conclusionIds.push(add(t,'opportunity-'+op.id.toLowerCase(),op.title+'：'+op.whyInvestigate+'；成立条件：'+scope+'；下一步：'+op.nextValidation,ev,'judgment',[scope,cashExitGap],based(op.sourceRefs)))
    }
    const taskQueryReviews=d.negativeEvidenceReview.queries
    check(o.searchAudit.queryIds.length===2 && same(taskQueryReviews.map((x:Raw)=>x.queryId),o.searchAudit.queryIds),'逐任务查询编号不符')
    for(const qid of o.searchAudit.queryIds){
      const q=queries.get(qid),rq=taskQueryReviews.find((x:Raw)=>x.queryId===qid),pool=q && pools.get(q.resultPoolId)
      check(q && rq && pool && q.taskId===t.id && rq.query===q.query && rq.direction===q.direction && rq.executedDateAsRecorded===q.executedAt && rq.publicPrivateTextAndDateMatch===true && pool.queryIds.includes(qid) && pool.taskIds.includes(t.id),'查询内容、日期或父任务绑定不符')
      append(next.searches,{id:id(q.id),country:'cn',taskId:t.id,direction:q.direction==='positive'?'automation':'counterevidence',query:q.query,searchedOn:q.executedAt,results:[],outcome:'completed-candidates-unattributed',note:queryBoundary+' '+pool.resultAttribution,audit:{file:p.audit.file,id:qid,sha256:p.audit.sha256}});t.searchIds.push(id(qid))
    }
    t.evidenceGaps=unique([...o.evidenceGaps.filter((g:string)=>g!=='库存流程与职业路径仍待独立复核及行业遗漏补齐。'),...boundaryNotes,cashExitGap,workingCapital,o.counterEvidence.interpretation,o.counterEvidence.queryScope,...strings(split?.decompositionSuggestion).map(x=>'拟议拆分未批准、未增计任务：'+x)])
    t.interviewQuestions=unique([...o.interviewQuestions,'请核验限定定义和机制边界：'+disp.reviewNote,'请按完整现金框架提供原始记录：'+cashExitGap,...strings(split?.decompositionSuggestion).map(x=>'请核独立输出和验收：'+x)])
    t.researchStatus='in-progress';t.conclusionIds=unique(t.conclusionIds)
    t.evidenceAge=unique([...sources.values()].filter(s=>deploymentEvidence.some(x=>x.sourceId===id(s.id))).map(s=>s.evidencePeriod)).join('；') || '只有所列历史职业/工艺限定定义；没有保留匹配方案。'
    t.discovery!.supportStatus='candidate-with-reviewed-boundaries-not-frozen';t.discovery!.sourceLimitations=unique([...t.discovery!.sourceLimitations,scopeBoundary])
    const model=main.cashFlowModels.find((x:Raw)=>x.id===o.cashFlow.modelId);check(model?.currency==='CNY' && noNumbers(model),'现金框架参数或币种改变')
    const requiredParameters=Object.keys(o.cashFlow.parameters).map(key=>{check(parameterLabels[key],'尚未映射现金参数标签：'+key);return parameterLabels[key]+'：'+(model.parameterDefinitions[key]??'原稿参数为空，尚缺可复核输入。')})
    t.review={reviewer:'木材家具造纸印刷文体公开来源独审及 RC01 限定复检',date:main.researchedAt,notes:definitionStatus}
    t.dossier={...t.dossier,publicResearch:{country:'cn',batchId:stem,researchVersion:main.researchVersion,provenance:p,canFreeze:false,evidenceSupportTier:tier,evidenceSupportTierLabel:tiers[tier],sourceBoundConditions,deploymentEvidence,
      definitionReview:{note:boundaryNotes.join(' '),actionSupport:structuredClone(ec.reviewedDefinitionSourceRefs),children:split?[split.decompositionSuggestion]:[],proposedChildren:structuredClone(split?.proposedChildren??[]),proposedChildrenCounted:false,granularityDisposition:split?'proposed-split':'retain',proposalStatus:split?'existing-proposal-not-approved':'no-proposal-recorded',originalPhase:o.phase,phaseSuggestion:phase?structuredClone(phase):null,displayTitle:o.displayTitle??null,acceptanceStatus:ec.acceptanceStatus},
      economics:{...structuredClone(o.cashFlow),model:structuredClone(model),currency:'CNY',requiredParameters,taskSpecific:{taskSpecificMissing:[o.barriers.economic.text],parameterStatus:o.cashFlow.parameterStatus},workingCapitalDefinition:workingCapital,comparisonScope:model.costBoundary+'；'+cashExitGap,throughputBenefitConstraint:'新增产出受未满足需求、瓶颈释放及下游有效能力共同限制；共享设备和收益只计算一次。'},
      originalHumanInput:structuredClone(o.humanInput),remainingHuman:structuredClone(o.residualHuman),alternativeCategoryScreen:structuredClone(o.alternativeCategoryScreen),alternativeEvidence:structuredClone(o.alternatives),barrierEvidence:structuredClone(o.barriers),negativeFinding:structuredClone(o.counterEvidence),successfulCounterexamples:structuredClone(o.successfulCounterexamples),plannedProcessContext:o.plannedProcessContext?structuredClone(o.plannedProcessContext):null,adjacentStageLeads:structuredClone(o.adjacentStageLeads),
      history:{label:'原作者历史元数据，非当前未完成修订列表',reviewResponse:structuredClone(o.reviewResponse),inventoryDisposition:structuredClone(disp),evidenceGaps:structuredClone(o.evidenceGaps)},currentReviewStatus:'specified-corrections-verified-with-open-research-gaps',limitedRecheck:structuredClone(c),finalFieldRechecks:structuredClone(finalRecheck.taskFieldChecks.filter((x:Raw)=>x.taskId===t.id)),oldValidationBoundary:{validatedSha256:authorValidation.outputSha256,coversFinalRaw:false,independentThreePathBridgeSha256:p.finalRecheck.sha256},queryRecordIds:[...o.searchAudit.queryIds],resultPoolIds:[...o.searchAudit.resultPoolIds],originalRequestUTC:null,searchSummary:queryBoundary}}
    if(canonical.get(t.id)!.dossier?.publicResearch)check(same(canonical.get(t.id),t),'已导入任务研究字段或数组次序发生冲突：'+t.id)
    updated.set(t.id,t)
  }
  next.tasks=next.tasks.map(t=>updated.get(t.id)??t)
  const catalogue={country:'cn',batchId:stem,provenance:p,taskIds:[...originals.keys()],taskCount:181,newTaskCount:0,proposedSplitParentCount:9,proposedChildrenCounted:0,canFreeze:false,evidenceSupportTierCounts:structuredClone(tierCounts),statisticsBoundary:'60 局部、21 目录、3 相邻、2 跨材料、95 无新分别显示；无新不表示机械基线不存在。原任务数不增加，五项阶段与九组拆分均为建议。',
    originalStatistics:structuredClone(main.statistics),scope:structuredClone(main.researchScope),scenarios:structuredClone(main.scenarios),remainingLimitations:[...main.researchPassLimitations,definitionStatus],opportunities:structuredClone(main.opportunities),displayPhaseProposals:structuredClone(recheck.displayPhaseProposals),decompositionProposals:structuredClone(recheck.decompositionProposals),
    queryAudit:{file:p.audit.file,sha256:p.audit.sha256,mainQueries:362,mainBatches:91,supplementalQueries:36,supplementalBatches:9,originalRequestUTC:null,resultPools:structuredClone(audit.resultPools),supplementalSearches:structuredClone(audit.supplementalSearches),boundary:queryBoundary,independentQueryReview:structuredClone(recheck.queryAuditRecheck)},
    currentReviewStatus:'specified-corrections-verified-with-open-research-gaps',oldValidationBoundary:{validatedSha256:authorValidation.outputSha256,coversFinalRaw:false,independentThreePathBridgeSha256:p.finalRecheck.sha256,oldMarkdownCoversFinalRaw:false},finalLimitedReview:structuredClone(finalRecheck)}
  check(next.industries.some(i=>i.id===industryId && i.country==='cn'),'中国工业不存在')
  next.industries=next.industries.map(i=>{if(i.id!==industryId)return i;check(!i.inventory?.woodResearch || same(i.inventory.woodResearch,catalogue),'行业补研目录冲突');return {...i,inventory:{...i.inventory,woodResearch:catalogue}}})
  return validateResearch(next)
}
