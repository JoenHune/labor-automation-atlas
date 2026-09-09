import type {Research,Task} from './schema'
import type {CoreProvenance} from './import-us-core'
type Raw=Record<string,any>
const prefix='automation-cn-agriculture-'
const strings=(v:unknown):string[]=>v==null?[]:(Array.isArray(v)?v:[v]).filter(x=>typeof x==='string'&&x.length>0) as string[]
const date=(v:unknown)=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)?v:null
const partialDate=(v:unknown)=>typeof v==='string'&&/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/.test(v)?v:null
const sid=(id:string)=>prefix+id.toLowerCase()
const phases:Record<string,Task['phase']>={'准备':'preparation','作业':'operation','交接':'handoff','检测':'inspection','异常':'exception','返工':'rework','清洁维护':'maintenance','交付':'delivery'}
const categories:Record<string,Task['alternatives'][number]['category']>={'传统机械':'traditional-machine','专机':'dedicated-machine','机器人':'robot','辅助工具':'assistive-tool','数字流程':'digital-process'}
const kind=(level:string):Research['sources'][number]['kind']=>level.startsWith('manufacturer')?'vendor':level.startsWith('operator')?'operator':level.startsWith('research')?'paper':level==='official-in-use-quality-survey'?'official-investigation':'other'
const stage=(level:string):Research['claims'][number]['deployment']=>level.startsWith('manufacturer')?'vendor-report':/field-trial|factory-trial|pond-trial|comparative-trial|demonstration/.test(level)?'pilot':level==='research-experiment'?'laboratory':/guidance|procedure|manual|design|patent/.test(level)?'not-applicable':'unknown'
const equal=(a:unknown,b:unknown)=>JSON.stringify(a)===JSON.stringify(b)

/** Preserves the reviewed parent definitions; split proposals and follow-up drafts remain uncounted. */
export function importCnAgriculture(data:Research,raw:Raw,audit:Raw,review:Raw,recheck:Raw,provenance:CoreProvenance) {
 if([raw,audit,review,recheck].some(x=>x.country!=='CN')||review.industryId!=='cn-agriculture'||raw.isFrozen!==false||review.canFreeze!==false||recheck.canFreeze!==false)throw new Error('中国农业国家、行业或冻结状态不匹配')
 if(raw.reviewedInputSha256!==review.input?.sha256||raw.sourceReviewFile!==provenance.reviewFile||raw.independentReviewSha256!==provenance.reviewSha256||recheck.inputSha256!==provenance.sha256||recheck.reviewSha256!==provenance.reviewSha256)throw new Error('独立审校输入不匹配')
 if(raw.inventorySha256!==audit.inventorySha256||raw.inventorySha256!==review.input.inventorySHA256||raw.inventorySource!==review.input.inventoryFile)throw new Error('原始清单版本不匹配')
 const decisions=new Map<string,Raw>(review.decisions.map((d:Raw)=>[d.taskId,d])),queries=new Map<string,Raw>(audit.searches.map((q:Raw)=>[q.taskId,q])),ids=new Set<string>(raw.tasks.map((t:Raw)=>t.id))
 if(ids.size!==raw.tasks.length||ids.size!==raw.sourceTaskCount||decisions.size!==ids.size||queries.size!==ids.size||queries.size!==audit.searches.length||decisions.size!==review.decisions.length)throw new Error('任务、裁决或查询重复、缺失')
 const sources=new Map<string,Raw>(raw.sources.map((s:Raw)=>[s.id,s])),claims=new Map<string,Raw>(raw.claims.map((c:Raw)=>[c.id,c]))
 if(sources.size!==raw.sources.length||claims.size!==raw.claims.length)throw new Error('来源或原文声明编号重复')
 const sourceClaim=(r:Raw)=>{
  const s=sources.get(r.sourceId),c=claims.get(r.claimId),loc=s?.locators.find((l:Raw)=>l.id===r.claimId)
  if(!s||!c?.statement||c.sourceId!==s.id||!r.locator||r.locator!==c.locator||!loc||loc.locator!==c.locator||loc.summary!==c.statement)throw new Error('缺少或错配原文声明与定位：'+r.sourceId+'/'+r.claimId)
  return {source:s,claim:c,evidence:{sourceId:sid(s.id),locator:c.locator}}
 }
 const refs=(items:Raw[])=>items.map(r=>sourceClaim(r).evidence)
 const oldSources=new Map(data.sources.map(s=>[s.id,s]))
 data.sources=data.sources.filter(s=>!s.id.startsWith(prefix));data.claims=data.claims.filter(s=>!s.id.startsWith(prefix));data.searches=data.searches.filter(s=>!s.id.startsWith(prefix))
 for(const s of raw.sources as Raw[]) {
  if(!['CN','international-supplier'].includes(s.sourceCountry)||!s.supportBoundary||!s.independentReview?.rawReturnSHA256)throw new Error('来源范围或独立核读记录缺失：'+s.id)
  const dates:NonNullable<Research['sources'][number]['dates']>=[]
  for(const[field,k]of[['revisedAt','updated'],['authoredAt','authored'],['effectiveAt','effective']]as const){const value=partialDate(s[field]);if(value)dates.push({kind:k,value,note:'按原文精度记录，成文、修订、生效和网页发布日期分开。'})}
  data.sources.push({id:sid(s.id),title:s.title,publisher:s.publisher,url:s.url,published:date(s.publishedAt),retrieved:date(s.retrievedAt)??raw.reviewedAt,country:'cn',kind:kind(s.evidenceLevel),dates,
   evidencePeriod:s.evidencePeriod??s.scopeSummary,evidenceLevel:s.evidenceLevel,readStatus:s.independentReview.status,
   limitations:[s.supportBoundary,s.deploymentCountryBasis,s.independentReview.note,'国家标签表示中国任务的研究关联；'+(s.sourceCountry==='international-supplier'?'国际供应商的功能说明不代表中国现场采用。':'原文地区、物种及设备条件不能自动外推至目标任务。'),...strings(s.dateNotes)]})
 }
 const definitionSources=new Map<string,Raw>()
 for(const d of review.definitionSources as Raw[]) {
  definitionSources.set(d.sourceId,d)
  if(d.httpStatus!=='200')continue
  const old=oldSources.get('inventory-cn-core-'+d.sourceId)
  if(!old||old.url!==d.url)throw new Error('任务定义来源已变更：'+d.sourceId)
  const correction={...(review.definitionDateCorrections.find((c:Raw)=>c.sourceId===d.sourceId)??{}),...(recheck.definitionSourceCorrections.find((c:Raw)=>c.sourceId===d.sourceId)??{})}
  const dates:NonNullable<Research['sources'][number]['dates']>=[]
  for(const[field,k]of[['authoredAt','authored'],['effectiveAt','effective'],['urlDate','url-only']]as const){const value=partialDate(correction[field]);if(value)dates.push({kind:k,value,note:correction.note??'依原文所标日期种类分列。'})}
  data.sources.push({...old,id:sid(d.sourceId),title:d.title,published:date(Object.hasOwn(correction,'publishedAt')?correction.publishedAt:d.publishedAt),retrieved:d.checkedOn,sha256:d.sha256,dates,dateEvidence:correction.locator?[{sourceId:sid(d.sourceId),locator:correction.locator}]:[],
   evidencePeriod:correction.evidencePeriod??(d.sourceId==='cn-occ-2022-draft'?'2022 年社会公示稿，非正式现行版':d.publishedAt?d.publishedAt+' 的历史流程资料':'历史资料，发布日期未确认'),
   evidenceLevel:d.sourceId==='cn-occ-2022-draft'?'official-occupation-draft':'official-historical-workflow',readStatus:d.readStatus,limitations:[...old.limitations,d.locatorConvention,...strings(correction.note),'流程与职责仅支撑动作存在或背景，不能据此推算工时或证明当前采用。']})
 }
 const taskMap=new Map(data.tasks.map(t=>[t.id,t]))
 for(const original of raw.tasks as Raw[]) {
  const t=taskMap.get(original.id),decision=decisions.get(original.id),o=original.originalTask,definition=original.definitionReview,q=queries.get(original.id)
  if(!t||t.country!=='cn'||original.country!=='CN'||original.industryId!=='cn-agriculture'||t.industryId!==original.industryId||t.scenarioId!==original.scenarioId||!decision||decision.country!=='CN'||decision.title!==original.title)throw new Error('任务国家、行业、场景或裁决不匹配：'+original.id)
  if(!t.discovery||t.discovery.inputSha256!==raw.inventorySha256||t.discovery.inventoryFile!==raw.inventorySource||t.title!==original.title||t.boundary!==original.executionConditions.scope||!equal(t.dossier?.originalTask,o)||!equal(t.inputs,strings(o.inputs))||!equal(t.outputs,strings(o.outputs))||!equal(t.acceptance,strings(o.acceptance)))throw new Error('任务定义已改变，不能继承旧研究：'+original.id)
  if(!definition||definition.status!==decision.inventoryDecision.recommendedStatus||!equal(definition.actionSupport,decision.inventoryDecision.actionSupport)||!equal(definition.phaseReview,decision.inventoryDecision.phase)||!equal(definition.children,decision.inventoryDecision.splitSuggestions.map((x:Raw)=>x.title))||original.canFreeze!==false)throw new Error('任务独立修订未完整应用：'+original.id)
  if(!q||q.status!=='query-pair-completed'||!q.positiveQuery||!q.negativeQuery||!date(q.searchedAt))throw new Error('缺少实际执行的正反查询：'+original.id)
  if(original.economics.currency!=='CNY'||Object.values(original.economics).some(v=>typeof v==='number')||Object.entries(original.humanInput).some(([k,v])=>k!=='gap'&&v!==null))throw new Error('新增人工或现金数值须单独核查：'+original.id)
  const local=prefix+t.id+'-',conditions=[t.boundary,original.executionConditions.performerBoundary,original.executionConditions.methodAndObjectGap].filter(Boolean)
  const claim=(suffix:string,text:string,evidence:Research['claims'][number]['evidence'],type:Research['claims'][number]['kind'],level='unknown',extra:string[]=[])=>{
   const id=local+suffix;data.claims.push({id,country:'cn',taskId:t.id,kind:type,text,evidence,conditions:[...conditions,...extra],basedOn:[],status:'draft',deployment:stage(level)});return id
  }
  t.conditions=conditions;t.alternatives=[];t.barriers=[];t.conclusionIds=[];t.counterevidenceIds=[];t.searchIds=[]
  for(const[i,a]of(original.alternatives as Raw[]).entries()) {
   if(!categories[a.type])throw new Error('方案分类不明确')
   const evidence=refs(a.sourceRefs??[]),levels=(a.sourceRefs??[]).map((r:Raw)=>sources.get(r.sourceId)!.evidenceLevel)
   const id=claim('alternative-'+i,evidence.length?[a.supportedActions,'本任务适用边界：'+a.notEstablished].join('；'):'待验证候选：'+a.type+'；本轮缺口：'+a.notEstablished,evidence,evidence.length?'judgment':'hypothesis',levels.length===1?levels[0]:'unknown',strings(a.conditions))
   t.conclusionIds.push(id);t.alternatives.push({category:categories[a.type],description:a.type,claimIds:[id],conditions:[...strings(a.conditions),a.status==='adjacent-context-only'?'仅相邻功能参考，未证明本任务替代机制。':'局部功能、原型与试点按原资料层级使用，未确认完整任务持续运行。'],remainingLabor:[a.notEstablished,'未测得各动作工时；未证实替代的动作不等于技术上必须人工。']})
  }
  for(const[field,type]of[['technicalBarriers','technical'],['economicBarriers','economic'],['adoptionBarriers','adoption']]as const)for(const[i,b]of(original[field]as Raw[]).entries()) {
   const evidence=refs(b.sourceRefs??[]),sourceTexts=(b.sourceRefs??[]).map((r:Raw)=>sourceClaim(r).claim.statement)
   const text=[b.question??b.detail??sourceTexts.join('；'),b.scope,b.note].filter(Boolean).join('；')
   if(!text)throw new Error('障碍条目缺少内容')
   t.barriers.push({type,scenario:t.boundary,claimIds:[claim(type+'-'+i,text,evidence,evidence.length?'judgment':'hypothesis')]})
  }
  for(const[i,c]of(original.counterEvidence as Raw[]).entries()) {
   const evidence=refs(c.sourceRefs??[]),sourceTexts=(c.sourceRefs??[]).map((r:Raw)=>sourceClaim(r).claim.statement)
   t.counterevidenceIds.push(claim('counter-'+i,[...sourceTexts,c.scope,c.note].filter(Boolean).join('；'),evidence,evidence.length?'judgment':'hypothesis','unknown',['原时期及特定机型的负面结果不等于完整任务不可行；风险提示不作为已发生故障。']))
  }
  for(const[direction,key]of[['automation','positiveQuery'],['counterevidence','negativeQuery']]as const) {
   const id=local+'search-'+direction;data.searches.push({id,country:'cn',taskId:t.id,direction,query:q[key],searchedOn:q.searchedAt,results:[],outcome:'completed-candidates-unattributed',note:'已执行该任务的正反查询对；候选为合并返回，不逐条归属于某一查询。已使用原文另行核读与独立复核；补检和拆分项仍在研究，未找到案例不能证明不可行。',audit:{file:provenance.auditFile,id:q.id,sha256:provenance.auditSha256}});t.searchIds.push(id)
  }
  const supported=(definition.actionSupport as Raw[]).filter(r=>{if(!definitionSources.has(r.sourceId))throw new Error('动作来源缺少独立核读记录');return definitionSources.get(r.sourceId)!.httpStatus==='200'&&r.support!=='original-unavailable-for-independent-recheck'})
  const definitionRefs=(role:string)=>supported.filter(r=>r.role===role).map(r=>({sourceId:sid(r.sourceId),locator:[r.locator,r.note,r.support==='broad-context-only'?'仅背景对应，不是直接动作证据。':null].filter(Boolean).join(' · ')}))
  t.workflowEvidence=definitionRefs('workflow');t.occupationEvidence=definitionRefs('occupation')
  t.discovery!.supportStatus=definition.status;t.discovery!.sourceLimitations=[...t.discovery!.sourceLimitations.filter(s=>!s.startsWith('独立任务复核：')),'独立任务复核：'+definition.note]
  const unavailable=(definition.actionSupport as Raw[]).filter(r=>!supported.includes(r)).map(r=>'原文核验缺口：'+r.locator+'；'+r.note)
  t.discovery!.sourceLimitations=[...new Set([...t.discovery!.sourceLimitations,...unavailable])]
  const phase=phases[definition.phaseReview.recommended];if(!phase)throw new Error('任务阶段不明确');t.phase=phase
  t.manualInputs=[{name:'单位任务人工工时',value:null,unit:'小时／合格交付单元，单元待现场界定',evidence:[],gap:original.humanInput.gap}]
  t.evidenceGaps=[...strings(original.evidenceGaps),...unavailable,'新发现遗漏和拟议子任务尚未冻结；首轮查询和局部功能证据不自动覆盖新增定义。']
  t.interviewQuestions=strings(original.interviewQuestions);t.researchStatus='in-progress';t.summary=original.conclusion.summary+' '+original.conclusion.boundary
  t.review={reviewer:'独立来源与动作复核',date:raw.reviewedAt,notes:'原稿164项逐项审校并应用边界、定位与日期修订；新增补检与拆分仍未完成，未冻结。'}
  t.dossier={...t.dossier,publicResearch:{country:'cn',researchVersion:raw.researchVersion,provenance,reviewFile:provenance.reviewFile,reviewedInputSha256:raw.reviewedInputSha256,definitionReview:definition,
   deploymentEvidence:original.deploymentEvidence.map((d:Raw)=>({...d,sourceId:sid(d.sourceId)})),economics:original.economics,negativeFinding:original.negativeFinding,successfulCounterexamples:original.successfulCounterexamples,
   technicalQuestionPolicy:'无来源的问题为待验证假设；在用机调查、产品限制及原文风险只在其时间、机型和场景范围内成立，不外推为行业障碍。',searchSummary:'原定义的正反查询和第一轮原文独立复核已完成；83项定向补检、新遗漏和拟议拆分尚在审查，不自动继承完成状态。',canFreeze:false}}
 }
 for(const s of data.scenarios.filter(s=>s.country==='cn'&&s.industryId==='cn-agriculture'&&s.inventory)) {
  const tasks=data.tasks.filter(t=>t.scenarioId===s.id)
  const unique=(refs:Task['workflowEvidence'])=>[...new Map(refs.map(r=>[r.sourceId+'|'+r.locator,r])).values()]
  s.workflowSources=unique(tasks.flatMap(t=>t.workflowEvidence));s.occupationSources=unique(tasks.flatMap(t=>t.occupationEvidence))
  s.exclusions=[...new Set([...s.exclusions,...tasks.flatMap(t=>t.evidenceGaps.filter(g=>g.startsWith('原文核验缺口：')))])]
  for(const c of s.coverage){c.taskIds=tasks.filter(t=>t.phase===phases[c.phase]).map(t=>t.id);if(!c.taskIds.length)c.gap=c.gap??'阶段复核调整后尚无冻结任务，仍需核查遗漏。'}
 }
 return data
}
