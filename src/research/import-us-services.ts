import type {Research,Task} from './schema'
type Raw=Record<string,any>
type Provenance={file:string,sha256:string,auditFile:string,auditSha256:string,reviewFile:string,reviewSha256:string}
const prefix='automation-us-services-'
const sourceId=(id:string)=>prefix+id.toLowerCase()
const strings=(v:unknown):string[]=>v==null?[]:(Array.isArray(v)?v:[v]).filter(x=>typeof x==='string'&&x.length>0) as string[]
const date=(v:unknown)=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)?v:null
const partialDate=(v:unknown)=>typeof v==='string'&&/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/.test(v)?v:null
const kind=(level:string):Research['sources'][number]['kind']=>/^(manufacturer|vendor|provider|integrator)/.test(level)?'vendor':level.startsWith('operator')?'operator':'other'
const stage=(level:string):Research['claims'][number]['deployment']=>/^(manufacturer|vendor|provider|integrator)/.test(level)?'vendor-report':/pilot|prototype/.test(level)?'pilot':/guidance|workflow|policy|mechanism/.test(level)?'not-applicable':'unknown'
const category=(label:string):Task['alternatives'][number]['category']=>/机器人|机械手/.test(label)?'robot':/专机/.test(label)?'dedicated-machine':/机械|输送|牵引/.test(label)?'traditional-machine':/数字|系统|平台|工单|电子|RFID|软件/.test(label)?'digital-process':'assistive-tool'

export function importUsServices(data:Research,raw:Raw,audit:Raw,review:Raw,provenance:Provenance) {
 if(raw.country!=='US'||audit.country!=='US'||review.country!=='US'||raw.isFrozen!==false||review.freezeAllowed!==false)throw new Error('美国服务业研究国家或冻结状态不匹配')
 if(raw.reviewedInputSha256!==review.inputSha256||raw.sourceReviewFile!==provenance.reviewFile||raw.inventorySha256!==review.inventorySha256)throw new Error('美国服务业独立审校输入不匹配')
 const ids=new Set(raw.tasks.map((t:Raw)=>t.id)),decisions=new Map<string,Raw>(review.taskDecisions.map((d:Raw)=>[d.taskId,d]))
 if(ids.size!==raw.tasks.length||ids.size!==raw.sourceTaskCount||decisions.size!==ids.size)throw new Error('美国服务业任务或裁决重复、缺失')
 const queryMap=new Map<string,Raw[]>(),queryIds=new Set<string>()
 for(const batch of audit.requests as Raw[])for(const q of batch.queries as Raw[]) {
  if(batch.status!=='executed'||!date(batch.executedAt)||!q.query||!ids.has(q.taskId)||queryIds.has(q.id)||!['positive','negative'].includes(q.direction))throw new Error('美国服务业查询未执行、重复或归属不明')
  queryIds.add(q.id);queryMap.set(q.taskId,[...(queryMap.get(q.taskId)??[]),{...q,batchId:batch.id,executedAt:batch.executedAt}])
 }
 data.sources=data.sources.filter(s=>!s.id.startsWith(prefix));data.claims=data.claims.filter(s=>!s.id.startsWith(prefix));data.searches=data.searches.filter(s=>!s.id.startsWith(prefix))
 const sources=new Map<string,Raw>(raw.sources.map((s:Raw)=>[s.id,s]))
 if(sources.size!==raw.sources.length)throw new Error('来源编号重复')
 const sourceClaim=(ref:Raw)=>{
  const source=sources.get(ref.sourceId),locator=source?.locators.find((l:Raw)=>l.id===ref.locatorId)
  if(!source||!locator?.section||!locator.claim||(!locator.webLine&&!locator.page&&!locator.pdfPage))throw new Error('缺少原文声明或定位：'+ref.sourceId+'/'+ref.locatorId)
  return {source,locator,evidence:{sourceId:sourceId(source.id),locator:[locator.section,locator.webLine?'本次原文行 '+locator.webLine+(locator.webLineEnd&&locator.webLineEnd!==locator.webLine?'—'+locator.webLineEnd:''):null,locator.page?'页 '+locator.page:null,locator.pdfPage?'PDF页 '+locator.pdfPage:null].filter(Boolean).join(' · ')}}
 }
 for(const s of raw.sources as Raw[]) {
  if(!s.countryScope||!s.evidenceLevel)throw new Error('来源范围或层级缺失：'+s.id)
  const revised=partialDate(s.revisedAt)
  data.sources.push({id:sourceId(s.id),title:s.title,publisher:s.publisher,url:s.url,published:date(s.publishedAt),publishedLabel:partialDate(s.publishedAt)??undefined,retrieved:date(s.retrievedAt)??raw.reviewedAt,country:'us',kind:kind(s.evidenceLevel),
   limitations:[s.scopeNote,'来源适用范围：'+s.countryScope,...strings(s.dateNotes),'此国家标签表示美国任务研究关联；global/unknown 等范围不证明美国现场采用。'].filter(Boolean),
   dates:revised?[{kind:'updated',value:revised,note:strings(s.dateNotes).join('；')||'修订日期与首发日期分开。'}]:[],evidencePeriod:s.evidencePeriod,evidenceLevel:s.evidenceLevel,readStatus:s.independentReviewStatus})
 }
 const tasks=new Map(data.tasks.map(t=>[t.id,t]))
 for(const original of raw.tasks as Raw[]) {
  const t=tasks.get(original.id.toLowerCase()),decision=decisions.get(original.id),o=original.originalTask
  if(!t||t.country!=='us'||original.country!=='US'||t.industryId!==original.industryId||t.scenarioId!==original.scenarioId.toLowerCase()||!decision)throw new Error('美国服务业任务国家、行业或场景不匹配：'+original.id)
  if(t.discovery?.inputSha256!==raw.inventorySha256||t.discovery?.inventoryFile!==raw.inventorySource||t.boundary!==original.executionConditions.scope||(t.dossier?.originalTask as Raw)?.phase!==o.phase||t.title!==original.title||JSON.stringify(t.inputs)!==JSON.stringify(o.inputs)||JSON.stringify(t.outputs)!==JSON.stringify(o.outputs)||JSON.stringify(t.acceptance)!==JSON.stringify(o.acceptance))throw new Error('任务定义或清单版本已变更，不继承旧研究：'+original.id)
  if(['people','hoursPerUnit','volume','wageOrContractCost'].some(k=>original.humanInput[k]!=null)||Object.values(original.economics).some(v=>typeof v==='number')||original.economics.currency!=='USD')throw new Error('新增工时或现金流数值须绑定证据：'+original.id)
  const qs=queryMap.get(original.id)??[]
  if(qs.length!==2||!['positive','negative'].every(d=>qs.filter(q=>q.direction===d).length===1))throw new Error('缺少唯一正反查询对：'+original.id)
  const conditions=[t.boundary,original.executionConditions.methodAndObjectGap],local=prefix+t.id+'-'
  const addClaim=(suffix:string,text:string,evidence:Research['claims'][number]['evidence'],claimKind:Research['claims'][number]['kind'],deployment:Research['claims'][number]['deployment']='unknown',moreConditions:string[]=[])=>{
   const id=local+suffix;data.claims.push({id,country:'us',taskId:t.id,kind:claimKind,text,evidence,conditions:[...conditions,...moreConditions],basedOn:[],status:'draft',deployment});return id
  }
  t.alternatives=[];t.barriers=[];t.conclusionIds=[];t.counterevidenceIds=[];t.searchIds=[];t.conditions=conditions
  for(const [i,a] of (original.alternatives as Raw[]).entries()) {
   const claimIds:string[]=[]
   for(const [j,r] of (a.sourceRefs as Raw[]).entries()) {
    const {source,locator,evidence}=sourceClaim(r)
    // Keep each source's exact bounded action; the author's generic pointer is not a factual claim.
    claimIds.push(addClaim('alternative-'+i+'-'+j,locator.claim+'；本任务适用边界：'+a.notEstablished,[evidence],'judgment',stage(source.evidenceLevel),[source.scopeNote,'来源范围：'+source.countryScope].filter(Boolean)))
   }
   if(!claimIds.length)claimIds.push(addClaim('alternative-'+i,'待验证候选：'+a.type+'；'+a.notEstablished,[],'hypothesis'))
   t.alternatives.push({category:category(a.type),description:a.type,claimIds,conditions:[a.notEstablished,...strings(a.conditions)],remainingLabor:original.remainingHuman.map((h:Raw)=>h.scope+'；'+h.note)})
   t.conclusionIds.push(...claimIds)
  }
  for(const [field,type] of [['technicalBarriers','technical'],['economicBarriers','economic'],['adoptionBarriers','adoption']] as const)for(const [i,b] of (original[field] as Raw[]).entries()) {
   if(b.sourceRefs?.length)throw new Error('新增障碍事实需要单独审查，不自动继承正向依据：'+original.id)
   const id=addClaim(type+'-'+i,b.question??b.detail,[],'hypothesis');t.barriers.push({type,scenario:t.boundary,claimIds:[id]})
  }
  for(const [i,c] of (original.counterEvidence as Raw[]).entries()) {
   const {source,locator,evidence}=sourceClaim(c.claimRef??c)
   t.counterevidenceIds.push(addClaim('counter-'+i,locator.claim+'；'+c.scopeNote,[evidence],'judgment',stage(source.evidenceLevel),[source.scopeNote,'按原文范围阅读；条件、产品功能和历史监管事项不自动证明本任务自动化失败。']))
  }
  for(const q of qs) {
   const id=local+'search-'+q.id.toLowerCase(),direction=q.direction==='positive'?'automation':'counterevidence'
   data.searches.push({id,country:'us',taskId:t.id,direction,query:q.query,searchedOn:q.executedAt,results:[],outcome:'completed-candidates-unattributed',note:'本任务查询已执行；批次合并候选没有逐查询归属，不能据空结果列表推断无案例。实际采用来源另经原文核读。',audit:{file:provenance.auditFile,id:q.batchId,sha256:provenance.auditSha256}});t.searchIds.push(id)
  }
  t.manualInputs=[{name:'单位任务人工工时',value:null,unit:'小时／合格交付单元，单元待现场界定',evidence:[],gap:original.humanInput.gap}]
  t.evidenceGaps=[...strings(original.evidenceGaps),'任务发现双路径与独立验收边界仍待核对；本轮查询不等于全流程清单冻结。'];t.interviewQuestions=strings(original.interviewQuestions)
  t.summary=original.conclusion.summary+'；'+original.conclusion.boundary;t.researchStatus='in-progress'
  t.review={reviewer:'独立公开来源与任务审校',date:raw.reviewedAt,notes:'372项相关引用和46份来源选段已独立核对，指定定位、范围及现金流口径修订已复检；不是完整任务或当前商业运行认证。'}
  t.dossier={...t.dossier,publicResearch:{country:'us',researchVersion:raw.researchVersion,provenance,reviewFile:provenance.reviewFile,reviewedInputSha256:raw.reviewedInputSha256,
   definitionReview:{note:'保留候选任务边界；原库存中的拟议动作、执行主体和验收缺口仍有效，未新增批准拆分。',children:[]},
   deploymentEvidence:original.deploymentEvidence.map((d:Raw)=>{const {evidence}=sourceClaim(d);return {sourceId:evidence.sourceId,locator:evidence.locator,level:d.level,scope:d.scope+'；来源范围：'+d.countryScope,currentOperationConfirmed:false}}),
   economics:original.economics,negativeFinding:original.negativeFinding,successfulCounterexamples:original.successfulCounterexamples,
   technicalQuestionPolicy:'以下为具体场景的待验证问题和参数缺口；没有把正向功能或职业动作当作已证实障碍。',searchSummary:'本定义的正向与反向查询已执行；合并候选不分配给单条查询，未新增的子项不继承查询。',canFreeze:false}}
 }
 return data
}
