import {createHash} from 'node:crypto'
import {isDeepStrictEqual} from 'node:util'
import type {Research,Task} from './schema'
import {validateResearch} from './validate'

type Raw=Record<string,any>
const prefix='automation-cn-transport-',industryId='cn-transport'
export const cnTransportFiles=Object.freeze({
 inventory:{file:'research/inventories/cn-core.json',sha256:'5388db09742709d606032d030ced3985f802a6e221441b59cd1302064ee8983e'},
 main:{file:'research/automation/cn-transport.json',sha256:'09d85ebf4ffdb6cf35103202d511d1a0e09282153a893bea607580c98f7ae72d'},
 audit:{file:'research/automation/cn-transport-search-audit.json',sha256:'86ef3aaf630a6cc09a669c2cd876a3811d7328499fcc0866354232290ed9eb7b'},
 review:{file:'research/reviews/cn-transport-automation-decisions.json',sha256:'bf379726aabfbb6fc2d024041d9d9e0a192c6a2df81c24b49810dae02b671633'},
 revisions:{file:'research/automation/cn-transport-revisions.json',sha256:'728f53a54f1819b5992b391e552dab765a09273ef042caeb4153c9924d6ed0cf'},
 authorValidation:{file:'research/automation/cn-transport-validation.json',sha256:'f634781f0d9eec093ff10a5dc4839930dfde2ce01361a458312f14b937927c49'},
 recheck:{file:'research/reviews/cn-transport-automation-recheck.json',sha256:'0e5acf1ef273d81d840a23eb3c1039c199dd0e01dad01860a9c4993c883ab9c5'},
 limitedRevisions:{file:'research/automation/cn-transport-rc01-revisions.json',sha256:'6731687e8e6f1eb9d49ddaaef49acb1fd2d7a1f6e40c989e3701f2c4d61e40a6'},
 finalRecheck:{file:'research/reviews/cn-transport-automation-rc01-recheck.json',sha256:'e7c1163c379d565d7e543ec3bc941aeb517628b881dff4e8c16fd25c9fbc145e'},
} as const)
for(const pin of Object.values(cnTransportFiles))Object.freeze(pin)
const check:(v:unknown,message:string)=>asserts v=(v,message)=>{if(!v)throw new Error('交通运输导入：'+message)}
const jsonValue=(v:unknown):unknown=>v===undefined?undefined:JSON.parse(JSON.stringify(v))
const same=(a:unknown,b:unknown)=>isDeepStrictEqual(jsonValue(a),jsonValue(b))
const strings=(v:unknown):string[]=>(Array.isArray(v)?v:[v]).filter((x):x is string=>typeof x==='string'&&!!x)
const unique=(v:string[])=>[...new Set(v)]
const id=(v:string)=>prefix+v.toLowerCase()
const sha=(v:string)=>createHash('sha256').update(v,'utf8').digest('hex')
const date=(v:unknown)=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)?v:null
const noNumbers=(v:unknown):boolean=>typeof v!=='number'&&(v===null||typeof v!=='object'||Object.values(v).every(noNumbers))
const index=(rows:Raw[],key:string,count?:number)=>{const out=new Map<string,Raw>(rows.map(r=>[r[key],r]));check(out.size===rows.length&&(count===undefined||out.size===count),'重复编号或数量错误：'+key);return out}
const append=<T extends {id:string}>(rows:T[],entry:T)=>{const old=rows.find(x=>x.id===entry.id);check(!old||same(old,entry),'已有记录冲突：'+entry.id);if(!old)rows.push(entry)}
const phases:Record<string,Task['phase']>={'准备':'preparation','作业':'operation','交接':'handoff','检测':'inspection','异常':'exception','返工':'rework','清洁维护':'maintenance','交付':'delivery'}
const categories:Record<string,Task['alternatives'][number]['category']>={'传统机械':'traditional-machine','专机':'dedicated-machine','机器人':'robot','辅助工具':'assistive-tool','数字流程':'digital-process'}
const roles:Record<string,string>={'workflow-action-or-requirement-limited-to-cited-version':'所引版本的流程动作或要求','occupation-direct-action-limited-to-text':'职业原文直接动作，限所引文字','occupation-partial-action-only':'职业原文仅部分动作','workflow-scope-context-only':'流程或适用范围背景','occupation-context-only':'职业背景，未直接证明本动作'}
const tiers:Record<string,string>={'partial-mechanism':'保留局部机制，完整任务替代尚未证实。','adjacent-mechanism-only':'仅有相邻动作或系统机制，不证明本任务直接部署。','adjacent-planned-requirement-only':'仅有相邻采购要求，不是已完成部署。','no-retained-matching-mechanism':'本轮未保留匹配机制，不证明技术不可行。'}
const tierCounts={'partial-mechanism':45,'adjacent-mechanism-only':14,'adjacent-planned-requirement-only':1,'no-retained-matching-mechanism':23}
const definitionBoundary='已核所列职业与流程原段；背景、部分动作和直接动作分开。有效定义为本轮限定显示，现场 SOP、正式职业版本及遗漏场景仍待补；未冻结。'
const queryBoundary='166 条主查询、22 条道路复查按94个正反合并批保留，22条专题补查按原8批保留。请求、UTC与回包在同一对象，不能证明独立调用前写入；不逐查询归因候选，也不声称五类路线分别穷尽。'
const levels:Record<string,string>={
 'official-case-report-of-operation':'官方案例报告的历史运行','operator-api-documentation':'运营方接口文档','operator-deployment-self-report':'运营方部署自述','operator-historical-deployment-self-report':'运营方历史部署自述','operator-initial-operation-self-report':'运营方初始运行自述','operator-pilot-self-report':'运营方试点自述','operator-road-test-self-report':'运营方道路测试自述','operator-running-self-report':'运营方运行自述','operator-workflow-normative-context':'运营方流程规范背景','patent-disclosure-not-deployment':'专利公开，未证明部署','patent-with-self-described-testing-not-independent-deployment':'专利自述试验，未独立核实部署','procurement-requirement-not-deployment':'采购要求，未证明部署','research-prototype-tests-adjacent-industry':'相邻行业原型试验','service-provider-historical-self-report':'服务商历史自述','vendor-named-deployment-self-report':'厂商具名部署自述','vendor-product-description':'厂商产品说明','vendor-product-description-adjacent-performer':'厂商产品说明，执行者相邻','vendor-product-description-adjacent-site':'厂商产品说明，场地相邻',
}
const stage=(level:string):Research['claims'][number]['deployment']=>level==='research-prototype-tests-adjacent-industry'?'laboratory':/pilot|road-test/.test(level)?'pilot':/^vendor|^service-provider/.test(level)?'vendor-report':'unknown'
const sourceKind=(level:string):Research['sources'][number]['kind']=>/^vendor|^service-provider/.test(level)?'vendor':/^operator/.test(level)?'operator':level==='research-prototype-tests-adjacent-industry'?'paper':'other'

function readAndVerify(files:Readonly<Record<string,string>>) {
 const p=cnTransportFiles,all:Record<string,Raw>={}
 for(const [key,pin] of Object.entries(p)){check(typeof files[pin.file]==='string'&&sha(files[pin.file])===pin.sha256,'实际文件 SHA 不匹配：'+pin.file);all[key]=JSON.parse(files[pin.file])}
 const {inventory:i,main:m,audit:a,review:r,revisions:v,authorValidation:z,recheck:c,limitedRevisions:l,finalRecheck:f}=all
 for(const x of Object.values(all))check(x.country==='CN'&&(!x.industryId||x.industryId===industryId),'国家或行业绑定错误')
 check(m.inventorySource===p.inventory.file&&m.inventorySha256===p.inventory.sha256&&r.input.inventorySha256===p.inventory.sha256&&v.input.inventorySha256===p.inventory.sha256,'原清单绑定错误')
 check(m.reviewedInputSha256===r.input.researchSha256&&m.independentReviewSha256===p.review.sha256&&v.independentReviewSha256===p.review.sha256&&v.input.researchSha256===r.input.researchSha256&&a.reviewedInputSha256===r.input.auditSha256&&a.independentReviewSha256===p.review.sha256,'原稿独审绑定错误')
 for(const pin of [p.audit,p.revisions,p.authorValidation])check(c.input.lockedArtifacts.find((x:Raw)=>x.file===pin.file)?.sha256===pin.sha256,'限定复检附件绑定错误')
 check(v.output.jsonSha256===l.beforeSha256&&v.output.auditSha256===p.audit.sha256&&c.input.lockedArtifacts.find((x:Raw)=>x.file===p.main.file)?.sha256===l.beforeSha256&&l.afterSha256===p.main.sha256&&l.independentRecheckSha256===p.recheck.sha256,'作者修订与限定复检绑定错误')
 check(f.inputs.before.sha256===l.beforeSha256&&f.inputs.after.sha256===p.main.sha256&&f.inputs.rc01Receipt.sha256===p.limitedRevisions.sha256&&f.inputs.priorIndependentRecheck.sha256===p.recheck.sha256&&f.inputs.priorAuthorValidation.sha256===p.authorValidation.sha256,'最终三路径复检绑定错误')
 check(z.output.jsonSha256===l.beforeSha256&&z.output.jsonSha256!==p.main.sha256&&z.revisionReceiptSha256===p.revisions.sha256&&z.errors.length===0&&f.checks.priorAuthorValidationWasRerun===false&&l.priorValidationWasRerun===false,'旧校验不能当作最终稿重跑')
 check(f.decision.status==='RC01-passed-limited-bridge-to-unfrozen-working-version'&&f.decision.remainingRepairs.length===0&&f.actualCompleteDifference.length===3&&l.exactChanges.length===3,'最终复检尚有未处理修订')
 for(const [key,value] of Object.entries(f.checks))if(typeof value==='boolean')check(value===(key!=='priorAuthorValidationWasRerun'),'三路径复检检查失败：'+key)
 for(const change of l.exactChanges){const [,collection,n,object,field]=change.path.split('/'),task=m[collection][Number(n)],other=f.actualCompleteDifference.find((x:Raw)=>x.path===change.path),prior=c.remainingRepairs.find((x:Raw)=>x.path===change.path);check(task.id===change.taskId&&task[object][field]===change.after&&change.after==='proposed'&&other?.after===change.after&&prior?.requiredValue===change.after,'三个定义标签未正确应用')}
 check(m.isFrozen===false&&m.sourceTaskCount===83&&f.decision.canFreeze===false&&f.preservedCounts.newCountedTasks===0&&f.preservedCounts.queries===210&&same(m.coverageSummary.taskEvidenceStatusCounts,tierCounts),'计数或冻结状态错误')
 check(c.queryAudit.total===210&&c.queryAudit.independentReruns===0&&a.taskSearches.length===94&&a.adaptiveSearches.length===8&&a.adaptiveSearches.reduce((n:number,q:Raw)=>n+q.request.search_query.length,0)===22,'查询批次或原执行边界错误')
 check(m.splitProposals.length===7&&m.splitProposals.reduce((n:number,x:Raw)=>n+x.proposedChildCount,0)===15&&m.splitProposals.every((x:Raw)=>x.newCountedTasks===0),'拟议子任务不得新增计数')
 return all
}

/** Add reviewed public research to the same 83 candidates; never publish or freeze. */
export function importCnTransport(data:Research,files:Readonly<Record<string,string>>):Research {
 const p=cnTransportFiles,{inventory,main,audit,review,recheck,authorValidation,finalRecheck}=readAndVerify(files)
 check(data.freezeStatus!=='frozen','不能向冻结版追加工作稿')
 const originals=index(main.tasks,'id',83),decisions=index(review.taskDecisions,'taskId',83),checks=index(recheck.taskRechecks,'taskId',83)
 const inventoryTasks=index(inventory.industries.find((i:Raw)=>i.id===industryId).scenarios.flatMap((s:Raw)=>s.tasks),'id',83),canonical=new Map(data.tasks.map(t=>[t.id,t]))
 const sources=index(main.sources,'id',30),definitions=index(main.definitionSources,'id',4),claims=index(main.claims,'id',41),queries=index(audit.taskSearches,'id',94)
 for(const o of originals.values()){
  const t=canonical.get(o.id),prior=t?.dossier?.publicResearch as Raw|undefined,d=o.reviewedDefinition,c=checks.get(o.id),decision=decisions.get(o.id)
  check(t&&t.country==='cn'&&o.country==='CN'&&t.industryId===industryId&&o.industryId===industryId&&t.scenarioId===o.scenarioId,'任务串国或错配：'+o.id)
  check(same(o.originalTask,inventoryTasks.get(o.id))&&same(t.dossier?.originalTask,o.originalTask)&&t.discovery?.inputSha256===p.inventory.sha256&&t.discovery.inventoryFile===p.inventory.file,'原快照或库存已变：'+o.id)
  const expected=prior?d:o.originalTask
  check(t.title===(prior?d.title:o.originalTask.action)&&same(t.inputs,expected.inputs)&&same(t.outputs,expected.outputs)&&same(t.acceptance,strings(expected.acceptance))&&t.phase===phases[expected.phase]&&t.boundary===o.executionConditions.scope,'有效定义未经审定变更：'+o.id)
  check(d.effectiveForEvidenceDisplay===true&&d.countedCandidateId===o.id&&same(d.sourceRefs,o.definitionReview.sourceRefs)&&decision?.originalSnapshotMatchesInventory===true&&c?.originalTaskUnchanged===true&&c.cashValuesRemainNull===true&&c.newCountedTasks===0,'逐项审校或有效定义不符')
  check(!prior||(prior.provenance?.main?.sha256===p.main.sha256&&prior.provenance?.finalRecheck?.sha256===p.finalRecheck.sha256&&prior.canFreeze===false),'已有研究版本冲突')
  check(o.canFreeze===false&&['not-started','in-progress'].includes(t.researchStatus)&&t.manualInputs.every(x=>x.value===null)&&noNumbers(o.humanInput)&&noNumbers(o.economics)&&o.economics.currency==='CNY','人工、经济或冻结状态变化')
 }
 const next:Research={...data,sources:[...data.sources],claims:[...data.claims],searches:[...data.searches],tasks:[...data.tasks],industries:[...data.industries]}
 for(const s of sources.values()){
  const decision=review.sourceDecisions.find((x:Raw)=>x.sourceId===s.id);check(decision&&levels[s.evidenceLevel]&&s.countryScope==='CN'&&date(s.retrievedAt),'来源层级、日期或独审缺失')
  const dates:NonNullable<Research['sources'][number]['dates']>=[]
  for(const [field,kind,label] of [['updatedAt','updated','最后更新'],['onlineAt','released','在线刊载'],['documentAuthoredAt','authored','文件成文']] as const)if(s[field])dates.push({kind,value:s[field],note:label+'；'+decision.dateReview})
  if(s.publishedAtKind==='document-month')dates.push({kind:'document-version',value:s.publishedAt,note:'封面月份，未推定为确切发布日期。'})
  if(s.publishedAtKind.startsWith('patent-'))dates.push({kind:'released',value:s.publishedAt,note:s.publishedAtKind==='patent-grant-publication'?'专利授权公告日，不是初次公开或部署日。':'专利公开日，不是部署日。'})
  // Retained publication dates follow the source-specific independent decision;
  // URL/copyright years and document/event dates are never substituted.
  append(next.sources,{id:id(s.id),country:'cn',title:s.title,publisher:s.publisher,url:s.url,published:date(s.publishedAt),retrieved:s.retrievedAt,kind:sourceKind(s.evidenceLevel),dates,dateEvidence:(s.dateEvidenceRefs??[]).map((r:Raw)=>({sourceId:id(s.id),locator:r.locator})),evidenceLevel:levels[s.evidenceLevel],evidencePeriod:strings([s.publishedAt?'原资料日期：'+s.publishedAt:'未确认首次发布日期',s.deploymentCountry?'案例地区：'+s.deploymentCountry:'案例地区未确认',s.dateEvidence]).join('；'),readStatus:s.readStatus,limitations:strings([s.supportBoundary,s.reviewBoundary,s.locatorConvention,decision.dateReview,'本国研究关联不代表已独立核实当前中国整项任务商业运行。'])})
 }
 for(const s of definitions.values()){
  check(s.definitionReviewProvenance?.sha256===p.review.sha256,'定义原文独审缺失')
  append(next.sources,{id:id(s.id),country:'cn',title:s.title,publisher:s.publisher,url:s.url,published:null,publishedLabel:s.publishedAt?'原资料列示日期 '+s.publishedAt+'，首次发布日期未确认':'首次发布日期未确认',retrieved:s.retrievedAt,kind:s.id.includes('occ-')?'occupation':'standard',evidenceLevel:s.id.includes('occ-')?'2022 年职业社会公示稿限定段落':'所列历史法规或工艺规范限定段落',evidencePeriod:s.version??s.title,readStatus:s.readStatus,limitations:strings([...(s.limitations??[]),s.version,'只读本批列明段落；不继承其他行业全部定位的已读状态，不证明工时或现场完整 SOP。'])})
 }
 const refs=(rr:Raw[]):Task['workflowEvidence']=>rr.map(r=>{check(sources.has(r.sourceId)&&r.locator,'自动化引用缺失');if(r.claimId)check(claims.get(r.claimId)?.sourceId===r.sourceId&&claims.get(r.claimId)?.locator===r.locator,'声明镜像或定位错配');return{sourceId:id(r.sourceId),locator:r.locator}})
 const definitionRefs=(rr:Raw[]):Task['workflowEvidence']=>rr.map(r=>{check(definitions.has(r.sourceId)&&roles[r.supportRole]&&r.locator,'定义引用或作用缺失');return{sourceId:id(r.sourceId),locator:strings([r.locator,'作用：'+roles[r.supportRole],r.note]).join(' · ')}})
 for(const c of claims.values()){
  const s=sources.get(c.sourceId);check(s&&s.locators.some((l:Raw)=>l.id===c.id&&l.locator===c.locator)&&c.kind==='direct-source-fact','共享来源声明不一致')
  const evidence=refs([{sourceId:c.sourceId,claimId:c.id,locator:c.locator}])
  append(next.claims,{id:id(c.id),country:'cn',kind:'fact',text:'来源陈述：'+c.statement,evidence,basedOn:[],conditions:[s.supportBoundary,levels[s.evidenceLevel]],status:'draft',deployment:stage(s.evidenceLevel),numericValue:null})
  append(next.claims,{id:id(c.id+'-boundary'),country:'cn',kind:'judgment',text:'研究边界：'+c.sourceBoundary,evidence,basedOn:[id(c.id)],conditions:[s.supportBoundary,'不把来源报告扩大为当前完整任务验收。'],status:'draft',deployment:'not-applicable',numericValue:null})
 }
 const add=(t:Task,suffix:string,text:string,evidence:Task['workflowEvidence'],conditions:string[],basedOn:string[]=[])=>{const cid=id(t.id+'-'+suffix);append(next.claims,{id:cid,country:'cn',taskId:t.id,kind:evidence.length?'judgment':'hypothesis',text,evidence,conditions:unique([t.boundary,...conditions]),basedOn:unique(basedOn),status:'draft',deployment:'unknown',numericValue:null});return cid}
 const updated=new Map<string,Task>()
 for(const o of originals.values()){
  const t=structuredClone(canonical.get(o.id)!),d=o.reviewedDefinition,decision=decisions.get(o.id)!,c=checks.get(o.id)!,notes=unique([definitionBoundary,d.scopeNote,...d.requiredScopeClarifications,o.executionConditions.performerBoundary])
  check(tiers[o.evidenceUseStatus]&&o.alternatives.length===5,'任务证据分级或路线缺失')
  t.title=d.title;t.inputs=[...d.inputs];t.outputs=[...d.outputs];t.acceptance=strings(d.acceptance);t.phase=phases[d.phase]
  t.workflowEvidence=definitionRefs(d.sourceRefs.filter((r:Raw)=>r.role==='workflow'));t.occupationEvidence=definitionRefs(d.sourceRefs.filter((r:Raw)=>r.role==='occupation'))
  t.conditions=unique([t.boundary,...notes,o.executionConditions.parametersToVerify]);t.alternatives=[];t.barriers=[];t.conclusionIds=[];t.counterevidenceIds=[];t.searchIds=[]
  const sourceBoundConditions:Raw[]=[],deploymentEvidence:Raw[]=[]
  const based=(rr:Raw[])=>unique(rr.flatMap(r=>r.claimId?[id(r.claimId),id(r.claimId+'-boundary')]:[]))
  const attach=(rr:Raw[],scope:string)=>{
   const evidence=refs(rr)
   for(const [i,r] of rr.entries()){const s=sources.get(r.sourceId)!,bound={...evidence[i],level:levels[s.evidenceLevel],scope:strings([scope,s.supportBoundary,s.reviewBoundary,s.dateEvidence]).join('；'),currentOperationConfirmed:false,fullTaskAcceptanceVerified:false};sourceBoundConditions.push(bound);deploymentEvidence.push(bound);t.conclusionIds.push(...based([r]))}
   return evidence
  }
  for(const binding of o.claimBindings){const cl=claims.get(binding.claimId);check(cl&&binding.mappingKind==='research-judgment-of-task-scope','任务作用缺失');const rr=[{sourceId:cl.sourceId,claimId:cl.id,locator:cl.locator}],ev=attach(rr,binding.mappingBoundary);t.conclusionIds.push(add(t,'mapping-'+cl.id.toLowerCase(),'本任务来源适用范围：'+binding.mappingBoundary,ev,notes,based(rr)))}
  const conclusionEvidence=attach(o.conclusion.sourceRefs,o.conclusion.boundary)
  t.summary=tiers[o.evidenceUseStatus]+' '+o.conclusion.boundary
  t.conclusionIds.push(add(t,'conclusion',t.summary,conclusionEvidence,notes,based(o.conclusion.sourceRefs)))
  t.conclusionIds.push(add(t,'effective-definition',d.scopeNote+'；'+d.requiredScopeClarifications.join('；'),[...t.workflowEvidence,...t.occupationEvidence],notes))
  for(const [i,a] of (o.alternatives as Raw[]).entries()){
   check(categories[a.type],'未知替代路线')
   const retained=a.sourceRefs.length>0
   check(retained?['source-described-see-binding-role','adjacent-planned-requirement-only'].includes(a.status):a.status==='no-retained-matching-mechanism-after-task-search','替代路线证据与状态不符')
   const scope=retained?unique(strings([a.scopeReview,a.notEstablished])).join('；'):'本轮未保留'+a.type+'在本任务中的匹配机制证据；尚待补检，不证明技术不可行。'
   const ev=attach(a.sourceRefs,scope),cid=add(t,'alternative-'+i,scope,ev,[...notes,queryBoundary],based(a.sourceRefs))
   t.alternatives.push({category:categories[a.type],description:scope,claimIds:[cid,...based(a.sourceRefs)],conditions:retained?unique([a.notEstablished,o.executionConditions.parametersToVerify]):['需取得本类方案在本任务中的设备流程、验收和异常记录。'],remainingLabor:retained?o.remainingHuman.map((h:Raw)=>unique(strings([h.scope,h.note])).join('；')):['本类方案的残留人工缺少匹配证据，不能据此估算节省人数或工时。']});t.conclusionIds.push(cid)
  }
  for(const [field,type] of [['technicalBarriers','technical'],['economicBarriers','economic'],['adoptionBarriers','adoption']] as const)for(const [i,b] of (o[field] as Raw[]).entries()){
   const rr=b.sourceRefs??[],scope=strings([b.question,b.detail,b.statement,b.scope,b.scopeBoundary]).join('；'),cid=add(t,type+'-'+i,scope,attach(rr,scope),notes,based(rr));t.barriers.push({type,scenario:t.boundary,claimIds:[cid]})
  }
  for(const [i,b] of (o.counterEvidence as Raw[]).entries()){const scope=strings([b.statement,b.scopeBoundary,'只按所列条件解释未采用，不推定本任务失败或商业退出。']).join('；');t.counterevidenceIds.push(add(t,'counter-'+i,scope,attach(b.sourceRefs,scope),notes,based(b.sourceRefs)))}
  for(const [i,h] of (o.remainingHuman as Raw[]).entries()){const scope=strings([h.scope,h.note]).join('；');t.conclusionIds.push(add(t,'remaining-human-'+i,scope,attach(h.sourceRefs,scope),notes,based(h.sourceRefs)))}
  for(const op of main.opportunities.filter((x:Raw)=>x.scenarioIds.includes(t.scenarioId)&&x.claimRefs.some((cid:string)=>o.claimRefs.includes(cid)))){
   check(op.country==='CN'&&op.roi===null,'机会串国或出现回报');const scope='场景级待验证方向：'+op.title+'；'+op.reasonToInvestigate+'；验证：'+op.nextValidation.join('；'),ev=attach(op.sourceRefs,scope)
   t.conclusionIds.push(add(t,'opportunity-'+op.id.toLowerCase(),scope,ev,[...notes,...op.conditions,'场景研究方向不等于本任务收益成立。'],based(op.sourceRefs)))
  }
  check(decision.searchReview.positiveAndNegativePairsMatched===true&&same(o.searchIds,decision.searchReview.auditIds),'逐项查询审校不符')
  for(const qid of o.searchIds){const q=queries.get(qid);check(q&&q.taskId===t.id&&q.country==='CN'&&q.startedAtUTC.slice(0,10)===decision.searchReview.executedDate,'查询任务或日期错配');for(const [field,direction] of [['positiveQuery','automation'],['negativeQuery','counterevidence']] as const){const sid=id(qid+'-'+direction);append(next.searches,{id:sid,country:'cn',taskId:t.id,direction,query:q[field],searchedOn:q.startedAtUTC.slice(0,10),results:[],outcome:'completed-candidates-unattributed',note:queryBoundary,audit:{file:p.audit.file,id:qid,sha256:p.audit.sha256}});t.searchIds.push(sid)}}
  t.conclusionIds=unique(t.conclusionIds);t.researchStatus='in-progress'
  t.evidenceGaps=unique([...o.evidenceGaps.filter((g:string)=>!g.includes('本作者修订仍待限定复检')),...notes,o.negativeFinding.caveat]);t.interviewQuestions=unique([...o.interviewQuestions,...d.requiredScopeClarifications.map((x:string)=>'请核限定定义：'+x)])
  t.discovery!.supportStatus=d.supportStatus;t.discovery!.acceptanceStatus=d.acceptanceBasis;t.discovery!.sourceLimitations=unique([...t.discovery!.sourceLimitations,definitionBoundary])
  t.evidenceAge=unique(deploymentEvidence.map(x=>next.sources.find(s=>s.id===x.sourceId)!.evidencePeriod!)).join('；')||'仅所列历史定义原段；未保留匹配机制。'
  t.review={reviewer:'交通运输公开来源独审与 RC01 三路径限定复检',date:main.reviewedAt,notes:definitionBoundary}
  t.dossier={...t.dossier,publicResearch:{country:'cn',researchVersion:main.researchVersion,provenance:p,canFreeze:false,reviewedDefinition:structuredClone(d),definitionReview:{...structuredClone(o.definitionReview),note:notes.join(' '),children:structuredClone(o.definitionReview.splitSuggestions),proposedChildrenCounted:false,currentStatus:'specified-revisions-verified-with-open-gaps'},evidenceSupportTier:o.evidenceUseStatus,evidenceSupportTierLabel:tiers[o.evidenceUseStatus],sourceBoundConditions,deploymentEvidence,economics:structuredClone(o.economics),originalHumanInput:structuredClone(o.humanInput),remainingHuman:structuredClone(o.remainingHuman),alternativeEvidence:structuredClone(o.alternatives),claimBindings:structuredClone(o.claimBindings),negativeFinding:structuredClone(o.negativeFinding),successfulCounterexamples:structuredClone(o.successfulCounterexamples),barrierCategory:structuredClone(o.barrierCategory),counterEvidence:structuredClone(o.counterEvidence),searchSummary:queryBoundary,queryRecords:o.searchIds.map((qid:string)=>structuredClone(queries.get(qid))),currentReviewStatus:'specified-revisions-verified-with-open-gaps',limitedRecheck:structuredClone(c),finalFieldRechecks:structuredClone(finalRecheck.actualCompleteDifference.filter((x:Raw)=>x.taskId===t.id)),oldValidationBoundary:{validatedSha256:authorValidation.output.jsonSha256,coversFinalRaw:false,independentThreePathBridgeSha256:p.finalRecheck.sha256},history:{label:'原作者历史状态，不代表当前复检仍未完成',definitionReview:structuredClone(o.definitionReview),authorRevision:structuredClone(o.authorRevision),evidenceGaps:structuredClone(o.evidenceGaps)}}}
  if(canonical.get(t.id)!.dossier?.publicResearch)check(same(canonical.get(t.id),t),'已导入记录冲突：'+t.id)
  updated.set(t.id,t)
 }
 next.tasks=next.tasks.map(t=>updated.get(t.id)??t)
 const catalogue={country:'cn',provenance:p,taskIds:[...originals.keys()],taskCount:83,approvedNewTasks:0,canFreeze:false,evidenceSupportTierCounts:tierCounts,scenarios:structuredClone(main.scenarios),subsectorCoverage:structuredClone(main.subsectorCoverage),coverageReview:structuredClone(main.coverageReview),splitProposals:structuredClone(main.splitProposals),opportunities:structuredClone(main.opportunities),method:structuredClone(main.method),exclusions:structuredClone(main.exclusions),numericEvidenceExclusions:structuredClone(main.numericEvidenceExclusions),queryAudit:{file:p.audit.file,sha256:p.audit.sha256,mainQueries:166,roadRetryQueries:22,supplementalQueries:22,supplementalBatches:8,recordBoundary:queryBoundary,supplementalGroups:structuredClone(audit.adaptiveSearches)},publicationBoundary:'八场景83既有候选完成原稿独审与所列修订复检；7父15拟议子不新增计数，完整行业覆盖、当前整任务商用、工时与现金仍缺证。'}
 next.industries=next.industries.map(i=>{if(i.id!==industryId)return i;check(i.country==='cn'&&(!i.inventory?.transportResearch||same(i.inventory.transportResearch,catalogue)),'行业研究目录冲突');return{...i,inventory:{...i.inventory,transportResearch:catalogue}}})
 return validateResearch(next)
}
