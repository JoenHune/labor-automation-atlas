import type {Research,Task} from './schema'
type Raw=Record<string,any>
export type CoreProvenance={file:string,sha256:string,auditFile:string,auditSha256:string,reviewFile:string,reviewSha256:string}
const strings=(v:unknown):string[]=>v==null?[]:(Array.isArray(v)?v:[v]).filter(x=>typeof x==='string'&&x.length>0) as string[]
const date=(v:unknown)=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)?v:null
const partialDate=(v:unknown)=>typeof v==='string'&&/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/.test(v)?v:null
const clean=(v:string)=>v.replace(/[。；]+$/,'')
const phases:Record<string,Task['phase']>={'准备':'preparation','作业':'operation','交接':'handoff','检测':'inspection','异常':'exception','返工':'rework','清洁维护':'maintenance','交付':'delivery'}
const kind=(level:string):Research['sources'][number]['kind']=>/occupation/.test(level)?'occupation':/^(vendor|manufacturer|integrator|service-provider)/.test(level)?'vendor':/^operator/.test(level)?'operator':/regulation|rule/.test(level)?'standard':/academic|study|research/.test(level)?'paper':'other'
const stage=(level:string):Research['claims'][number]['deployment']=>/pilot|prototype|research-test/.test(level)?'pilot':/^(vendor|manufacturer|integrator)/.test(level)?'vendor-report':/guidance|workflow|occupation|process-description|rule|regulation|metadata/.test(level)?'not-applicable':'unknown'
const category=(label:string):Task['alternatives'][number]['category']=>/机器人|机械手|robot/i.test(label)?'robot':/数字|软件|记录|系统|电子|工单|SCADA|WMS|POS/.test(label)?'digital-process':/自动|专机/.test(label)?'dedicated-machine':/机械|锯|叉车|车辆|压路机|泵|输送/.test(label)?'traditional-machine':'assistive-tool'

/** Only independently reviewed US batches enter this importer; completed queries never freeze a task. */
export function importUsCore(data:Research,raw:Raw,audit:Raw,review:Raw,provenance:CoreProvenance) {
 const industry=raw.industryId
 if(!['us-manufacturing','us-government'].includes(industry)||[raw,audit,review].some(x=>x.country!=='US'||x.industryId!==industry)||raw.isFrozen!==false||!(review.canFreeze===false||(review.counts?.frozen===0&&review.counts?.approvedNewAtomicTaskCount===0)))throw new Error('美国行业研究国家、行业或冻结状态不匹配')
 if(raw.reviewedInputSha256!==review.input?.sha256||raw.sourceReviewFile!==provenance.reviewFile)throw new Error('独立审校输入不匹配')
 const prefix='automation-'+industry+'-',sourceId=(id:string)=>prefix+id.toLowerCase()
 const decisions=new Map<string,Raw>(review.decisions.map((d:Raw)=>[d.taskId,d])),ids=new Set<string>(raw.tasks.map((t:Raw)=>t.id))
 if(ids.size!==raw.tasks.length||ids.size!==raw.sourceTaskCount||decisions.size!==ids.size)throw new Error('任务或独立裁决重复、缺失')
 const queries=new Map<string,Raw[]>(),queryIds=new Set<string>()
 for(const q of audit.queries as Raw[]) {
  if(!ids.has(q.taskId)||queryIds.has(q.id)||!q.query||q.executionStatus!=='executed'||!date(q.executedAt)||!['positive','negative'].includes(q.direction))throw new Error('实际查询缺失、重复或归属不明')
  queryIds.add(q.id);queries.set(q.taskId,[...(queries.get(q.taskId)??[]),q])
 }
 const sources=new Map<string,Raw>(raw.sources.map((s:Raw)=>[s.id,s]))
 if(sources.size!==raw.sources.length)throw new Error('来源编号重复')
 const sourceClaim=(ref:Raw)=>{
  const source=sources.get(ref.sourceId),locator=source?.locators.find((l:Raw)=>l.id===ref.locatorId)
  if(!source||!locator?.section||!locator.claim||(!locator.cacheLine&&!locator.webLines?.length))throw new Error('缺少原文声明或定位：'+ref.sourceId+'/'+ref.locatorId)
  const lines=locator.reviewedCacheLineRange??locator.reviewedCacheLines??[locator.cacheLine]
  const lineText=locator.lineConvention==='one-based-python-str-splitlines-form-feed-counted'?'提取文本行（含分页符分行）':'提取文本行'
  return {source,locator,evidence:{sourceId:sourceId(source.id),locator:[locator.section,lines.filter(Boolean).length?lineText+' '+lines.filter(Boolean).join('、'):null,locator.lfPhysicalLineRange?'LF物理行 '+locator.lfPhysicalLineRange.join('—'):null].filter(Boolean).join(' · ')}}
 }
 const refs=(items:Raw[])=>items.map(r=>sourceClaim(r).evidence)
 data.sources=data.sources.filter(s=>!s.id.startsWith(prefix));data.claims=data.claims.filter(s=>!s.id.startsWith(prefix));data.searches=data.searches.filter(s=>!s.id.startsWith(prefix))
 for(const s of raw.sources as Raw[]) {
  if(!s.geography||!s.evidenceType)throw new Error('来源范围或层级缺失：'+s.id)
  const dates:NonNullable<Research['sources'][number]['dates']>=[]
  for(const [field,dateKind]of [['revisedAt','updated'],['modifiedAt','updated'],['releasedAt','released'],['adoptedAt','adopted'],['documentVersionDate','document-version'],['effectiveAt','effective']] as const) {
   const value=partialDate(s[field]);if(value&&!dates.some(d=>d.kind===dateKind&&d.value===value))dates.push({kind:dateKind,value,note:s.publicationDateNote??'依资料原日期精度记录；首发、修订、通过及公开发布各自分列。'})
  }
  data.sources.push({id:sourceId(s.id),title:s.title,publisher:s.publisher,url:s.url,published:date(s.publishedAt),publishedLabel:partialDate(s.publishedAt)??undefined,retrieved:date(s.retrievedAt)??raw.reviewedAt,country:'us',kind:kind(s.evidenceType),dates,dateEvidence:refs(s.dateSourceRefs??[]),
   evidencePeriod:s.evidencePeriod,evidenceLevel:s.evidenceType,readStatus:s.readStatus,limitations:[s.limitations,s.publicationDateNote,'来源范围：'+s.geography,'国家标签表示美国任务研究关联；相邻机构、海外技术或厂商功能不等于美国本任务当前现场采用。'].filter(Boolean)})
 }
 const tasks=new Map(data.tasks.map(t=>[t.id,t]))
 for(const original of raw.tasks as Raw[]) {
  const t=tasks.get(original.id.toLowerCase()),decision=decisions.get(original.id),o=original.originalTask
  if(!t||t.country!=='us'||original.country!=='US'||t.industryId!==industry||original.industryId!==industry||t.scenarioId!==original.scenarioId.toLowerCase()||!decision||decision.title!==original.title)throw new Error('任务国家、行业、场景或独立裁决不匹配：'+original.id)
  if(t.discovery?.inputSha256!==raw.inventorySha256||t.discovery?.inventoryFile!==raw.inventorySource||t.boundary!==t.dossier?.scope||(t.dossier?.originalTask as Raw)?.phase!==o.phase||t.title!==original.title||JSON.stringify(t.inputs)!==JSON.stringify(strings(o.inputs))||JSON.stringify(t.outputs)!==JSON.stringify(strings(o.outputs))||JSON.stringify(t.acceptance)!==JSON.stringify(strings(o.acceptance)))throw new Error('任务定义或清单版本已变更，不继承旧研究：'+original.id)
  const cash=raw.cashFlowModels.find((c:Raw)=>c.id===original.cashFlow.modelRef)
  if(!cash||cash.currency!=='USD'||original.cashFlow.currency!=='USD'||Object.values(cash.parameters).some(v=>v!==null)||['workers','minutesPerUnit','paidLaborCostUSDPerUnit','annualTaskVolume'].some(k=>original.humanInput[k]!=null)||['netPresentValue','paybackYears','breakEvenResult'].some(k=>original.cashFlow[k]!=null))throw new Error('新增人工或现金数值须单独绑定证据：'+original.id)
  const qs=queries.get(original.id)??[]
  if(qs.length!==2||!['positive','negative'].every(d=>qs.filter(q=>q.direction===d).length===1))throw new Error('缺少唯一实际正反查询对：'+original.id)
  const conditions=[t.boundary,original.executorBoundary?.text,original.executionConditions.taskBoundary,original.executionConditions.executorBoundary].filter(Boolean),local=prefix+t.id+'-'
  const addClaim=(suffix:string,text:string,evidence:Research['claims'][number]['evidence'],claimKind:Research['claims'][number]['kind'],deployment:Research['claims'][number]['deployment']='unknown',moreConditions:string[]=[])=>{
   const id=local+suffix;data.claims.push({id,country:'us',taskId:t.id,kind:claimKind,text,evidence,conditions:[...conditions,...moreConditions],basedOn:[],status:'draft',deployment});return id
  }
  t.alternatives=[];t.barriers=[];t.conclusionIds=[];t.counterevidenceIds=[];t.searchIds=[];t.conditions=conditions
  for(const [i,a]of(original.alternatives as Raw[]).entries()) {
   const claimIds:string[]=[]
   for(const[j,r]of(a.sourceRefs as Raw[]).entries()) {
    const {source,locator,evidence}=sourceClaim(r)
    const scope=[original.executionConditions.taskBoundary,a.reviewBoundary,a.requiresValidation,'完整任务部署及全部验收尚未证实。'].filter(Boolean).join('；')
    claimIds.push(addClaim('alternative-'+i+'-'+j,clean(locator.claim)+'；本任务适用边界：'+scope,[evidence],'judgment',stage(source.evidenceType),['来源范围：'+source.geography]))
   }
   if(!claimIds.length)claimIds.push(addClaim('alternative-'+i,'待验证候选：'+a.name,[],'hypothesis'))
   t.alternatives.push({category:category(a.name),description:a.name,claimIds,conditions:[a.requiresValidation,a.reviewBoundary,original.executionConditions.assumptionStatus].filter(Boolean),remainingLabor:['待验证残留动作：'+strings(original.residualHuman.activities).join('；'),'未测得各动作工时，不据此确认减员。']})
   t.conclusionIds.push(...claimIds)
  }
  for(const type of ['technical','economic','adoption']as const)for(const[i,b]of(original.barriers[type]as Raw[]).entries()) {
   if(b.statementType!=='unverified-hypothesis'||b.sourceRefs.length)throw new Error('新增障碍事实需要独立审查：'+original.id)
   t.barriers.push({type,scenario:t.boundary,claimIds:[addClaim(type+'-'+i,b.text,[],'hypothesis')]})
  }
  for(const[i,r]of(original.counterEvidence.boundedSourceRefs as Raw[]).entries()) {
   const {source,locator,evidence}=sourceClaim(r)
   t.counterevidenceIds.push(addClaim('counter-'+i,[clean(locator.claim),original.counterEvidence.sourceInterpretation,'本任务完整失败或退出原因仍需现场验证。'].filter(Boolean).join('；'),[evidence],'judgment',stage(source.evidenceType),['按原始时期与来源范围阅读，风险指导不等于实际事故。']))
  }
  for(const q of qs) {
   const id=local+'search-'+q.id.toLowerCase();data.searches.push({id,country:'us',taskId:t.id,direction:q.direction==='positive'?'automation':'counterevidence',query:q.query,searchedOn:q.executedAt,results:[],outcome:'completed-candidates-unattributed',note:'该任务专属查询实际执行；工具合并候选不能精确归属于每条查询，空的逐条结果列表不代表无案例。已采用来源另有原文定位。',audit:{file:provenance.auditFile,id:q.id,sha256:provenance.auditSha256}});t.searchIds.push(id)
  }
  const definition=original.inventoryReview,reviewNote=definition.independentBoundaryNote??decision.inventoryDecision.note
  t.discovery!.supportStatus=definition.recommendedInventoryStatus
  t.discovery!.sourceLimitations=[...t.discovery!.sourceLimitations.filter(s=>!s.startsWith('独立任务复核：')).map(s=>s.includes('短句级匹配尚待独立审查')&&!s.startsWith('原始清单限制：')?'原始清单限制：'+s+' 本页动作定位已按下述独立复核更新；原始记录保留在导出资料中。':s),'独立任务复核：'+reviewNote]
  t.occupationEvidence=refs(definition.actionSupport.filter((r:Raw)=>/occupation/.test(sources.get(r.sourceId)?.evidenceType??'')))
  t.workflowEvidence=refs(definition.actionSupport.filter((r:Raw)=>!/occupation/.test(sources.get(r.sourceId)?.evidenceType??'')))
  const recommendedPhase=phases[definition.phase.recommended];if(!recommendedPhase)throw new Error('阶段修订不明确')
  t.phase=recommendedPhase
  t.manualInputs=[{name:'单位任务人工工时',value:null,unit:'分钟／合格交付单元，单元待界定',evidence:[],gap:original.humanInput.fact}]
  t.evidenceGaps=[...strings(original.evidenceGaps),reviewNote,'原始场景流程资料不自动支撑每个动作；此处显示独立复核后明确对应的动作定位，双路径缺项仍需补查。',...strings(original.cashFlow.taskSpecificMissing)]
  t.interviewQuestions=strings(original.interviewQuestions);t.summary=[...new Set(original.alternatives.map((a:Raw)=>clean(a.name)))].join('；')+'。';t.researchStatus='in-progress'
  t.review={reviewer:'独立公开来源与任务审校',date:raw.reviewedAt,notes:'逐项独立核对局部动作与原文，指定修订已有复检；所有任务及拟议拆分仍未冻结，未确认现场工时与完整商业效果。'}
  t.dossier={...t.dossier,publicResearch:{country:'us',researchVersion:raw.researchVersion,provenance,reviewFile:provenance.reviewFile,reviewedInputSha256:raw.reviewedInputSha256,
   definitionReview:{note:reviewNote,status:definition.recommendedInventoryStatus,phaseReview:definition.phase,children:[...(definition.splitSuggestions??[]),...(definition.additionalSplitCandidates??[])].map((s:Raw)=>s.title)},
   deploymentEvidence:original.alternatives.flatMap((a:Raw)=>a.sourceRefs.map((r:Raw)=>{const{source,locator,evidence}=sourceClaim(r);return{...evidence,level:source.evidenceType,scope:clean(locator.claim)+'；'+original.executionConditions.taskBoundary,currentOperationConfirmed:false}})),
   economics:{...original.cashFlow,framework:cash,workingCapitalDefinition:cash.parameterDefinitions.incremental_working_capital,throughputBenefitConstraint:cash.parameterDefinitions.usable_incremental_capacity,comparisonScope:[cash.costBoundary,cash.governmentBoundary].filter(Boolean).join('；')},
   negativeFinding:original.counterEvidence,successfulCounterexamples:original.positiveCounterexample,technicalQuestionPolicy:'以下是具体场景的待验证条件；正向功能、历史风险和完整任务采用障碍分别记录，未验证条件不作为已证实障碍。',searchSummary:'当前定义的两条正反查询实际执行，候选经过选段核读与独立审校；未批准子项不继承已研究状态。',canFreeze:false}}
 }
 // Phase changes move only the reviewed task IDs; source-discovery history stays in the dossier.
 for(const s of data.scenarios.filter(s=>s.industryId===industry&&s.country==='us'))for(const c of s.coverage) {
  c.taskIds=data.tasks.filter(t=>t.scenarioId===s.id&&t.phase===phases[c.phase]).map(t=>t.id)
  if(!c.taskIds.length)c.gap=c.gap??'本阶段暂无冻结任务；独立复核调整后仍须核查适用性与遗漏。'
 }
 return data
}
