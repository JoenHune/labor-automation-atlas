import type {Research,Task} from './schema'
type Raw=Record<string,any>
const prefix='automation-cn-services-'
const strings=(v:unknown):string[]=>v==null?[]:(Array.isArray(v)?v:[v]).filter(x=>typeof x==='string'&&x.length>0) as string[]
const date=(v:unknown)=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)?v:null
const sourceId=(id:string)=>prefix+id.toLowerCase()
const kind=(level:string):Research['sources'][number]['kind']=>level.startsWith('manufacturer')?'vendor':level.startsWith('operator')?'operator':'other'
const deployment=(levels:string[]):Research['claims'][number]['deployment']=>{
 if(!levels.length)return 'unknown'
 if(levels.every(x=>x.startsWith('manufacturer')))return 'vendor-report'
 if(levels.every(x=>/procedure|requirement|guidance|manual/.test(x)))return 'not-applicable'
 return 'unknown'
}
const categories=(label:string):Task['alternatives'][number]['category'][]=>{
 const result:Task['alternatives'][number]['category'][]=[]
 if(/机器人|机械手/.test(label))result.push('robot')
 if(/传统机械|传统传送|输送设备|牵引/.test(label))result.push('traditional-machine')
 if(/专机|钥匙柜|闸机/.test(label))result.push('dedicated-machine')
 if(/数字|系统|平台|工单|台账|电子|网络|OCR|POS|BOM|RFID|车联网|软件|图像|视频/.test(label))result.push('digital-process')
 if(/辅助|工具|仪器|传感器|测试|测量|标签|夹具/.test(label)||!result.length)result.push('assistive-tool')
 return result
}
export function importCnServices(data:Research,raw:Raw,audit:Raw,provenance:{file:string,sha256:string,auditFile:string,auditSha256:string}) {
 if(raw.country!=='CN'||audit.country!=='CN')throw new Error('中国服务业导入国家不匹配')
 if(raw.inventorySha256!==audit.inventorySha256)throw new Error('查询审计与任务清单版本不一致')
 if(!raw.reviewedInputSha256||!raw.sourceReviewFile)throw new Error('研究稿尚未关联独立审校')
 data.sources=data.sources.filter(s=>!s.id.startsWith(prefix))
 data.claims=data.claims.filter(s=>!s.id.startsWith(prefix))
 data.searches=data.searches.filter(s=>!s.id.startsWith(prefix))
 const sourceMap=new Map<string,Raw>(raw.sources.map((s:Raw)=>[s.id,s]))
 for(const s of raw.sources as Raw[]) {
  if(s.sourceCountry!=='CN')throw new Error('来源需要单独审核其国家归属：'+s.id)
  const dates:NonNullable<Research['sources'][number]['dates']>=[]
  for(const [field,kind] of [['updatedAt','updated'],['authoredAt','authored'],['effectiveAt','effective'],['displayedDate','displayed'],['urlDate','url-only']] as const) {
   const value=date(s[field]);if(value)dates.push({kind,value,note:strings(s.dateNotes).join('；')||'依据来源审校记录；与首次发布日期分开。'})
  }
  data.sources.push({id:sourceId(s.id),title:s.title,publisher:s.publisher,url:s.url,published:date(s.publishedAt),retrieved:date(s.retrievedAt)??raw.reviewedAt,country:'cn',kind:kind(s.evidenceLevel),
   limitations:[s.supportBoundary,s.deploymentCountryBasis,...strings(s.dateNotes),s.independentReview.note].filter(Boolean),
   dates,evidencePeriod:s.evidencePeriod,evidenceLevel:s.evidenceLevel,readStatus:s.independentReview.status,
   ...(s.independentReview.independentFetchedContentSha256?{sha256:s.independentReview.independentFetchedContentSha256}:{})})
 }
 const refs=(items:Raw[])=>items.map(r=>{
  const s=sourceMap.get(r.sourceId)
  if(!s)throw new Error('来源不存在：'+r.sourceId)
  if(!r.locator)throw new Error('缺少引用定位：'+r.sourceId)
  return {sourceId:sourceId(r.sourceId),locator:r.locator}
 })
 const taskMap=new Map(data.tasks.map(t=>[t.id,t]))
 const queryMap=new Map<string,Raw>((audit.searches as Raw[]).map(s=>[s.taskId,s]))
 if(queryMap.size!==audit.searches.length)throw new Error('查询审计包含重复任务')
 for(const original of raw.tasks as Raw[]) {
  const t=taskMap.get(original.id.toLowerCase())
  if(!t||t.country!=='cn'||t.industryId!==original.industryId||t.scenarioId!==original.scenarioId.toLowerCase())throw new Error('任务国家、行业或场景不匹配：'+original.id)
  if(t.title!==original.title||t.boundary!==original.executionConditions.scope||JSON.stringify(t.inputs)!==JSON.stringify(original.originalTask.inputs)||JSON.stringify(t.outputs)!==JSON.stringify(original.originalTask.outputs)||JSON.stringify(t.acceptance)!==JSON.stringify(original.originalTask.acceptance))throw new Error('任务定义已变更，不可继承旧研究：'+original.id)
  const query=queryMap.get(original.id)
  if(!query||query.status!=='query-pair-completed'||!query.positiveQuery||!query.negativeQuery)throw new Error('缺少已执行的任务查询对：'+original.id)
  const localPrefix=prefix+t.id+'-'
  t.alternatives=[];t.barriers=[];t.conclusionIds=[];t.counterevidenceIds=[];t.searchIds=[]
  const claim=(id:string,text:string,evidence:ReturnType<typeof refs>,conditions:string[],claimKind:Research['claims'][number]['kind'],levels:string[])=>{
   data.claims.push({id:localPrefix+id,taskId:t.id,country:t.country,kind:claimKind,text,evidence,conditions,basedOn:[],status:'draft',deployment:deployment(levels)})
   return localPrefix+id
  }
  const conditions=[original.executionConditions.scope,original.executionConditions.methodAndObjectGap]
  t.conditions=conditions
  for(const [i,a] of (original.alternatives as Raw[]).entries()) {
   const evidence=refs(a.sourceRefs??[]),levels=(a.sourceRefs??[]).map((r:Raw)=>r.evidenceLevel??sourceMap.get(r.sourceId)?.evidenceLevel)
   const text=evidence.length?a.supportedActions+'；适用边界：'+a.notEstablished:'待验证候选：'+a.type+'。本轮证据缺口：'+a.notEstablished
   const id=claim('alternative-'+i,text,evidence,[...conditions,...strings(a.conditions),a.notEstablished],evidence.length?'judgment':'hypothesis',levels)
   t.conclusionIds.push(id)
   // A combined product can contain several mechanisms; keep one evidence statement
   // and list its categories without turning it into multiple deployed cases.
   const labels=categories(a.type)
   t.alternatives.push({category:labels[0],description:a.type,claimIds:[id],remainingLabor:[a.notEstablished,'尚未证实替代的动作边界；没有实测工时，不能据此判定必须人工。'],conditions:[...strings(a.conditions),a.status.includes('adjacent')?'关联或邻近证据，不能视为完整任务已采用。':'方案功能及适用范围以绑定证据为准。']})
  }
  for(const [field,type] of [['technicalBarriers','technical'],['economicBarriers','economic'],['adoptionBarriers','adoption']] as const) {
   for(const [i,b] of (original[field] as Raw[]).entries()) {
    const evidence=refs(b.sourceRefs??[]),text=b.question??b.detail
    const id=claim(type+'-'+i,text+(b.boundary?'；'+b.boundary:''),evidence,conditions,evidence.length?'judgment':'hypothesis',(b.sourceRefs??[]).map((r:Raw)=>sourceMap.get(r.sourceId)!.evidenceLevel))
    t.barriers.push({type,scenario:original.executionConditions.scope,claimIds:[id]})
   }
  }
  for(const [i,c] of (original.counterEvidence as Raw[]).entries()) {
   const sourceRefs=c.sourceId?[{sourceId:c.sourceId,locator:c.locator}]:(c.sourceRefs??[])
   const evidence=refs(sourceRefs)
   t.counterevidenceIds.push(claim('counter-'+i,(c.detail??c.scope)+(c.boundary?'；'+c.boundary:''),evidence,[...conditions,'按原资料的场景和证据层级使用；风险提示、保护功能和采购要求不是已发生失败。'],evidence.length?'judgment':'hypothesis',sourceRefs.map((r:Raw)=>sourceMap.get(r.sourceId)!.evidenceLevel)))
  }
  for(const [direction,queryKey] of [['automation','positiveQuery'],['counterevidence','negativeQuery']] as const) {
   const id=localPrefix+'search-'+direction
   // The public audit records a paired/batched response, not per-query attribution.
   // Empty results do not mean zero relevant evidence; the outcome states this.
   data.searches.push({id,country:'cn',taskId:t.id,direction,query:query[queryKey],searchedOn:query.searchedAt,results:[],outcome:'completed-candidates-unattributed',note:'此查询已执行；公开审计保存查询对的合并候选，不能将每个候选分配给其中某一个查询。任务所用来源经另行核读与筛选，见任务结论。',audit:{file:provenance.auditFile,id:query.id,sha256:provenance.auditSha256}})
   t.searchIds.push(id)
  }
  t.manualInputs=[{name:'单位任务人工工时',value:null,unit:'小时／合格交付单元，单元待现场界定',evidence:[],gap:original.humanInput.gap}]
  t.evidenceGaps=[...strings(original.evidenceGaps),'任务发现的流程/职业双路径对应与拆分修订尚待完成；本轮自动化查询不能替代这些核查。']
  t.interviewQuestions=strings(original.interviewQuestions)
  t.researchStatus='in-progress'
  t.summary=original.conclusion.summary+'。'+original.conclusion.boundary
  t.review={reviewer:'独立来源与任务审校',date:raw.reviewedAt,notes:'已审校原稿并应用定位、版本与明确措辞修正；任务定义和子项研究尚未全部完成，仍未冻结。原稿 SHA-256：'+raw.reviewedInputSha256}
  t.dossier={...t.dossier,publicResearch:{country:'cn',researchVersion:raw.researchVersion,provenance,reviewFile:raw.sourceReviewFile,reviewedInputSha256:raw.reviewedInputSha256,
   definitionReview:original.definitionReview,deploymentEvidence:original.deploymentEvidence.map((x:Raw)=>({...x,sourceId:sourceId(x.sourceId)})),
   economics:original.economics,negativeFinding:original.negativeFinding,successfulCounterexamples:original.successfulCounterexamples,
   technicalQuestionPolicy:'没有来源的障碍条目是待验证问题或参数缺口，不是已证实的障碍结论。',
   searchSummary:'本定义的正向与反向查询已经执行；组合项的拟议子任务未自动继承这些查询。',canFreeze:false}}
 }
 return data
}
