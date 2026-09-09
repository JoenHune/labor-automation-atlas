import type {Research,Task} from './schema'
type Raw=Record<string,any>
const prefix='automation-us-agriculture-'
const sourceId=(id:string)=>prefix+id.toLowerCase()
const strings=(v:unknown):string[]=>v==null?[]:(Array.isArray(v)?v:[v]).filter(x=>typeof x==='string'&&x.length>0) as string[]
const date=(v:unknown)=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)?v:null
const partialDate=(v:unknown)=>typeof v==='string'&&/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/.test(v)?v:null
const kind=(type:string):Research['sources'][number]['kind']=>type.includes('occupation')?'occupation':type.includes('survey')&&type.startsWith('official')?'official-statistics':type.includes('standard')?'standard':type.includes('self-description')?'vendor':/research|study|synthesis/.test(type)?'paper':'other'
const stage=(labels:string[]):Research['claims'][number]['deployment']=>{
 if(labels.length&&labels.every(x=>/field.*prototype|field.*study|field.*trial/.test(x)))return 'pilot'
 if(labels.length&&labels.every(x=>/experimental-study/.test(x)))return 'laboratory'
 if(labels.length&&labels.every(x=>/self-description/.test(x)))return 'vendor-report'
 return 'unknown'
}
const category=(name:string):Task['alternatives'][number]['category']=>/机器人|robot|AMS/i.test(name)?'robot':/数字|地图|记录|系统|影像|监测/.test(name)?'digital-process':/专机|自动|传感|控制器/.test(name)?'dedicated-machine':/机械|拖拉机|车辆|处理头|harvester|processor|吊|动力/.test(name)?'traditional-machine':'assistive-tool'
// 审校裁决保存原措辞；阅读页只显示修订后的适用条件，不重复已解决的编辑指令。
const readerBoundaries:Record<string,string>={
 'US-AGR-PLANT-004':'操机耕整与导航有据；湿土适用条件需按玉米播种指导和本地地况核查。',
 'US-AGR-GRAIN-001':'来源支持清理粮仓；具体吸尘机型不是该段直接事实。',
 'US-AGR-GRAIN-009':'所读版本为2002年5月；该文所述简单通风控制器不用于粮食干燥。',
 'US-AGR-TMR-002':'取样和水分仪有据；本任务实验室营养分析的完整自动化未获证，外包检测按实际执行者归属。',
 'US-AGR-SWINE-009':'密苏里刮粪改造有正文依据；没有确认2026年持续在运。',
 'US-AGR-SWINE-010':'所引漏读试验发生于2022年；不能由漏读检测推断来源标签或错群可以自动纠正。',
 'US-AGR-FOREST-007':'处理头去枝有据；异常枝干的处理方式和残留人工仍待验证。',
 'US-AGR-LONGLINE-001':'来源支持所列渔具组成；检查方法和现场维护状态仍需核实。',
 'US-AGR-LONGLINE-009':'所引钩线处理指南限海龟相关场景，不能外推其他物种。',
}
export function importUsAgriculture(data:Research,raw:Raw,audit:Raw,review:Raw,provenance:{file:string,sha256:string,auditFile:string,auditSha256:string,reviewFile:string,reviewSha256:string},technicalReview:Raw) {
 if(raw.country!=='US'||raw.industryId!=='us-agriculture'||review.country!=='US'||review.industryId!=='us-agriculture')throw new Error('美国农业研究归属不匹配')
 if(review.freezeAllowed!==false||raw.isFrozen!==false)throw new Error('此导入只接受明确未冻结的研究修订')
 if(raw.tasks.length!==raw.sourceTaskCount||new Set(raw.tasks.map((t:Raw)=>t.id)).size!==raw.tasks.length||new Set(review.taskDecisions.map((t:Raw)=>t.taskId)).size!==raw.tasks.length)throw new Error('任务数或独立裁决重复、缺失')
 if(technicalReview.country!=='US'||technicalReview.industryId!=='us-agriculture'||technicalReview.inputSha256!==provenance.sha256||technicalReview.isFrozen!==false||new Set(technicalReview.decisions.map((d:Raw)=>d.taskId)).size!==raw.tasks.length)throw new Error('技术字段复核输入不匹配')
 const technicalDecisions=new Map<string,Raw>(technicalReview.decisions.map((d:Raw)=>[d.taskId,d]))
 data.sources=data.sources.filter(s=>!s.id.startsWith(prefix));data.claims=data.claims.filter(s=>!s.id.startsWith(prefix));data.searches=data.searches.filter(s=>!s.id.startsWith(prefix))
 const sourceMap=new Map<string,Raw>(raw.sources.map((s:Raw)=>[s.id,s]))
 const refs=(items:Raw[])=>items.map(r=>{
  const s=sourceMap.get(r.sourceId),locator=s?.locators.find((l:Raw)=>l.id===r.locatorId)
  if(!s||!locator||!locator.section)throw new Error('研究引用缺少原文定位：'+r.sourceId+'/'+r.locatorId)
  return {sourceId:sourceId(r.sourceId),locator:[locator.section,locator.cacheLine?'本次提取文本行 '+locator.cacheLine:null,r.supports??r.supportsOnly].filter(Boolean).join(' · ')}
 })
 for(const s of raw.sources as Raw[]) {
  const dates:NonNullable<Research['sources'][number]['dates']>=[]
  for(const [field,kind] of [['revisedAt','updated'],['documentVersionDate','document-version'],['effectiveAt','effective']] as const) {
   const value=partialDate(s[field]);if(value)dates.push({kind,value,note:s.publicationDateNote??'按原资料日期精度记录，不补造月或日；版本日期与生效日期分开。'})
  }
  data.sources.push({id:sourceId(s.id),title:s.title,publisher:s.publisher,url:s.url,published:date(s.publishedAt),publishedLabel:partialDate(s.publishedAt)??undefined,retrieved:date(s.retrievedAt)??raw.reviewedAt,country:'us',kind:kind(s.evidenceType),
   limitations:[s.notVerified,s.limitations,s.publicationDateNote,'来源用于美国任务研究；文中其他地区或相邻动作只能按明确边界作背景，不能计为本任务美国采用。'].filter(Boolean),dates,dateEvidence:refs(s.dateSourceRefs??[]),evidencePeriod:s.evidencePeriod,evidenceLevel:s.evidenceType,readStatus:s.readStatus})
 }
 const decisions=new Map<string,Raw>(review.taskDecisions.map((t:Raw)=>[t.taskId,t]))
 const tasks=new Map(data.tasks.map(t=>[t.id,t]))
 for(const original of raw.tasks as Raw[]) {
  const t=tasks.get(original.id.toLowerCase()),decision=decisions.get(original.id)
  if(!t||t.country!=='us'||t.industryId!=='us-agriculture'||t.scenarioId!==original.scenarioId.toLowerCase()||!decision)throw new Error('任务归属或独立裁决缺失：'+original.id)
  if(t.discovery?.inputSha256!==raw.inventorySha256||t.discovery?.inventoryFile!==raw.inventorySource||t.boundary!==t.dossier?.scope||(t.dossier?.originalTask as Raw)?.phase!==original.originalTask.phase)throw new Error('任务清单来源或执行范围已变更：'+original.id)
  if(t.title!==original.title||JSON.stringify(t.inputs)!==JSON.stringify(strings(original.originalTask.inputs))||JSON.stringify(t.outputs)!==JSON.stringify(strings(original.originalTask.outputs))||JSON.stringify(t.acceptance)!==JSON.stringify(strings(original.originalTask.acceptance)))throw new Error('美国农业任务已变更，不继承旧研究：'+original.id)
  if(['workers','minutesPerUnit','paidLaborCostUSDPerUnit','annualTaskVolume'].some(k=>original.humanInput[k]!=null)||original.cashFlow.paybackYears!=null)throw new Error('新增数值需单独绑定证据与计算，不能自动导入：'+original.id)
  const technical=technicalDecisions.get(original.id)
  if(!technical||technical.title!==original.title||JSON.stringify(technical.oldTechnical)!==JSON.stringify(original.barriers.technical)||!technical.recommendedTechnical.length||technical.recommendedTechnical.some((b:Raw)=>b.statementType!=='unverified-hypothesis'||b.sourceRefs.length||!b.text.startsWith('待验证条件：'))||technical.oldSourceHandling.some((s:Raw)=>!s.alreadyReferencedByAlternative))throw new Error('技术字段修订与原任务或证据保留不匹配：'+original.id)
  const localPrefix=prefix+t.id+'-',conditions=[t.boundary,original.executionConditions.scenario,original.executionConditions.taskBoundary].filter(Boolean)
  const claim=(name:string,text:string,references:Raw[],claimKind:Research['claims'][number]['kind'])=>{
   const id=localPrefix+name,evidence=refs(references)
   data.claims.push({id,country:'us',taskId:t.id,kind:claimKind,text,conditions,evidence,basedOn:[],status:'draft',deployment:stage(references.map(r=>sourceMap.get(r.sourceId)!.evidenceType))});return id
  }
  t.alternatives=[];t.barriers=[];t.conclusionIds=[];t.counterevidenceIds=[];t.searchIds=[];t.conditions=conditions
  for(const [i,a] of (original.alternatives as Raw[]).entries()) {
   const references=a.sourceRefs??[],description=a.supportsOnly??a.name,boundary=readerBoundaries[original.id]??a.reviewBoundary
   const id=claim('alternative-'+i,description+(boundary?'；'+boundary:''),references,references.length?'judgment':'hypothesis')
   t.alternatives.push({category:category(a.name),description:a.name,claimIds:[id],remainingLabor:[original.residualHuman.activities,original.residualHuman.limitation],conditions:[a.requiresValidation,boundary].filter(Boolean)})
   t.conclusionIds.push(id)
  }
  for(const type of ['technical','economic','adoption'] as const)for(const [i,b] of ((type==='technical'?technical.recommendedTechnical:original.barriers[type]) as Raw[]).entries()) {
   const references=b.sourceRefs??[],id=claim(type+'-'+i,b.text,references,references.length&&!/hypothesis|gap/.test(b.statementType)?'judgment':'hypothesis')
   t.barriers.push({type,scenario:t.boundary,claimIds:[id]})
  }
  const counter=original.counterEvidence
  for(const [i,r] of (counter.boundedSourceRefs as Raw[]).entries()) {
   const s=sourceMap.get(r.sourceId),l=s?.locators.find((l:Raw)=>l.id===r.locatorId)
   t.counterevidenceIds.push(claim('counter-'+i,[r.supports??r.supportsOnly??l?.claim,counter.sourceInterpretation,counter.remainingGap].filter(Boolean).join('；'),[r],'judgment'))
  }
  const directionalQueries=(audit.batches as Raw[]).filter(b=>['solution-and-conditions','task-specific-failure-non-adoption'].includes(b.direction)&&b.taskIds?.includes(original.id))
  for(const b of directionalQueries) {
   if(b.taskIds.length!==b.queries.length||new Set(b.taskIds).size!==b.taskIds.length)throw new Error('查询和任务无法一一对应：'+b.id)
   const index=b.taskIds.indexOf(original.id),direction=b.direction==='solution-and-conditions'?'automation':'counterevidence',id=localPrefix+b.id.toLowerCase()+'-'+index
   data.searches.push({id,country:'us',taskId:t.id,direction,query:b.queries[index],searchedOn:b.executedAt,results:[],outcome:'completed-candidates-unattributed',note:'该任务专属查询已执行；批次候选不自动归属于其中某一条查询。'+(b.resultAvailability==='no-results-returned'?'该批未返回候选；后续查询与原文核读另列。':'原文核读与适用筛选见任务结论。'),audit:{file:provenance.auditFile,id:b.id,sha256:provenance.auditSha256}});t.searchIds.push(id)
  }
  if(!['automation','counterevidence'].every(direction=>t.searchIds.some(id=>data.searches.find(s=>s.id===id)?.direction===direction)))throw new Error('缺少本任务实际正反查询：'+original.id)
  t.manualInputs=[{name:'单位任务人工工时',value:null,unit:'分钟／合格交付单元，单元待现场界定',evidence:[],gap:original.humanInput.fact}]
  const supportedTexts=new Set(original.alternatives.map((a:Raw)=>(a.supportsOnly??'').replace(/[。；]+$/,'')))
  t.evidenceGaps=[...strings(original.evidenceGaps).filter(s=>!supportedTexts.has(s.replace(/[。；]+$/,''))&&!(readerBoundaries[original.id]&&s.startsWith('独立审查限定：'))),...strings(original.cashFlow.taskSpecificMissing),'组合项拆分和任务发现双路径仍待完成；本轮查询不自动覆盖拟议子项。']
  t.interviewQuestions=strings(original.interviewQuestions);t.researchStatus='in-progress'
  t.summary=[...new Set([...original.alternatives.map((a:Raw)=>a.supportsOnly??a.name),original.executionConditions.taskBoundary].filter(Boolean).map((s:string)=>s.replace(/[。；]+$/,'')))].join('；')+'。'
  t.review={reviewer:'独立公开来源与任务审校',date:raw.reviewedAt,notes:'原稿已独立审校，指定修订已有复检；任务拆分、现场参数及证据缺口仍未关闭，不计为已冻结任务。'}
  const economics=raw.cashFlowModels.find((c:Raw)=>c.id===original.cashFlow.modelRef)
  if(!economics||economics.currency!=='USD')throw new Error('缺少正确币种现金流口径：'+original.id)
  t.dossier={...t.dossier,publicResearch:{country:'us',researchVersion:'us-agriculture-repaired-2026-09-09',provenance,reviewFile:provenance.reviewFile,reviewedInputSha256:review.inputSha256,
   definitionReview:{note:original.inventoryReview.atomicity==='split-recommended'?'原定义含待独立核对的多个交付动作；拆分建议尚未成为冻结任务。':'暂保留单一交付边界，仍待核对现场流程与验收。',children:original.inventoryReview.splitSuggestions.map((s:Raw)=>s.title)},
   deploymentEvidence:original.alternatives.flatMap((a:Raw)=>(a.sourceRefs??[]).map((r:Raw)=>({sourceId:sourceId(r.sourceId),locator:refs([r])[0].locator,level:sourceMap.get(r.sourceId)!.evidenceType,scope:a.supportsOnly??a.name,currentOperationConfirmed:false}))),
   economics:{...original.cashFlow,framework:economics,workingCapitalDefinition:economics.doubleCountRules.find((s:string)=>s.includes('营运资金')),throughputBenefitConstraint:'增产收益须同时核对实际未满足需求、经验证的瓶颈解除与可用新增产能；参数缺失时留空。',comparisonScope:economics.costBoundary},
   negativeFinding:counter,successfulCounterexamples:original.positiveCounterexample,technicalQuestionPolicy:'条件判断、正向机制、历史风险和证据不足分别阅读；未验证条件不是已证实障碍。',
   technicalFieldReview:{file:'research/reviews/us-agriculture-technical-field-decisions.json',inputSha256:technicalReview.inputSha256,original:original.barriers.technical,revised:technical.recommendedTechnical,note:'仅调整字段语义；原有正向依据保留在方案，新增具体条件为待验证假设，未重新证明为实际障碍。'},
   searchSummary:'保存本任务实际执行的正反查询与重试；不将批次候选自动归属到每个任务。拟议子项未继承这些查询。',canFreeze:false}}
 }
 return data
}
