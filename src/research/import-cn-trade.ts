import {createHash} from 'node:crypto'
import {isDeepStrictEqual} from 'node:util'
import type {Research,Task} from './schema'
import {validateResearch} from './validate'

type Raw=Record<string,any>
const prefix='automation-cn-trade-',industryId='cn-wholesale-retail'
const phases:Record<string,Task['phase']>={'准备':'preparation','作业':'operation','交接':'handoff','检测':'inspection','异常':'exception','返工':'rework','清洁维护':'maintenance','交付':'delivery'}
const categories:Record<string,Task['alternatives'][number]['category']>={'传统机械':'traditional-machine','专机':'dedicated-machine','机器人':'robot','辅助工具':'assistive-tool','数字流程':'digital-process'}
const roles:Record<string,string>={'context-or-limited-scope':'相邻背景或限定范围，不直接证明当前完整动作','occupation-action-presence-only':'职业原文支持该动作存在，不证明工时或完整验收','workflow-action-or-requirement-limited-to-cited-version':'仅所引版本的流程动作或要求，非当前现场完整 SOP 认证'}
const tiers:Record<string,string>={'partial-mechanism':'有局部机制或辅助动作；整项任务验收和当前持续运行仍缺证。','adjacent-evidence-only':'只保留相邻场景、步骤或输入；不能视为本任务直接部署。','no-retained-mechanism':'本轮没有保留新匹配机制；不否定传统操作基线，也不证明技术不可行。'}
const levels:Record<string,string>={
  'vendor-product-description':'厂商产品说明','vendor-product-description-lab-metrics-excluded':'厂商产品说明；实验室指标未采用','operator-self-report-undated':'运营方无日期自述','vendor-operation-documentation':'厂商操作文档','vendor-case-self-report-undated':'厂商无日期案例自述','vendor-product-and-adoption-self-report':'厂商产品与采用情况自述','supplier-product-description':'供应商产品说明','operator-announcement-reposted-trial':'运营方试运行公告转载','regulator-observed-operations-and-failures':'监管记录的历史运行与故障','regulator-observed-failure':'监管记录的历史故障','regulator-historical-failure-and-repair-delay':'监管历史故障及延迟维修分析','vendor-site-launch-self-report':'厂商开业应用自述','official-industry-monitoring-guideline':'官方行业自行监测指南',
}
const eventTypes:Record<string,string>={'historical-authority-economic-analysis':'历史监管成本分析','historical-physical-component-failure':'历史部件故障','historical-physical-pump-failure':'历史回收泵故障','historical-operational-management-failure':'历史运行管理失效','historical-measurement-discrepancy':'历史测量比对差异','historical-monitoring-equipment-failure':'历史监测设备故障','historical-physical-pipe-blockage':'历史回收管道堵塞'}
const definitionBoundary='已核所列原文范围，按有效定义显示；职业背景、具体动作、物理实施细分与版本限定分别解释，现场 SOP、现行要求与全品类遗漏仍待核。'
const eventBoundary='事件仅限所列时期、站点与子系统；不归因本批供应商型号，不推定当前故障率、整任务技术失败或商业退出。'
const costDedup='2014 年维修成本旧说明与 TR-EV-2014-COST 为同一监管分析，只引用同一事件编号一次，不作为两项事件或两笔现金支出。'

export const cnTradeFiles=Object.freeze({
  inventory:{file:'research/inventories/cn-core.json',sha256:'5388db09742709d606032d030ced3985f802a6e221441b59cd1302064ee8983e'},
  main:{file:'research/automation/cn-trade.json',sha256:'be907a2fb435d5d499c33331f027167eb14e8865162c5b8b041d0e8dc2424b25'},
  audit:{file:'research/automation/cn-trade-search-audit.json',sha256:'0a60f7dc221a6d3ff0816a19aa759ec3381e4154dca6d7b084f7602f47b8a929'},
  review:{file:'research/reviews/cn-trade-automation-decisions.json',sha256:'152532198e9f7e87b6bed03b2c5110151c185bb853ad2b2fbd6acb2055c22aaf'},
  revisions:{file:'research/automation/cn-trade-revisions.json',sha256:'5f2508e5b0aa57d546f0a171f01fa0c02cbc403bd9524bccb809c530bfbf60c0'},
  recheck:{file:'research/reviews/cn-trade-automation-recheck.json',sha256:'f5053ee8ef2568e837df8a9558cd87389fa1d2e28a6609a1c51f5866b0964ebc'},
  limitedRevisions:{file:'research/automation/cn-trade-rc01-revisions.json',sha256:'e1abc2c6285c6d3357a0597f4e865a1afb18eaaa4229df833fe8aeb7297c1721'},
  finalRecheck:{file:'research/reviews/cn-trade-automation-rc01-recheck.json',sha256:'1ef4acaf10205c6de9bd9d8f614b218d8b981d03b14c3428270d337b8242f824'},
} as const)
for (const pin of Object.values(cnTradeFiles)) Object.freeze(pin)
const check:(v:unknown,message:string)=>asserts v=(v,message)=>{if(!v)throw new Error('批零导入：'+message)}
const jsonValue=(v:unknown):unknown=>v===undefined?undefined:JSON.parse(JSON.stringify(v))
const same=(a:unknown,b:unknown)=>isDeepStrictEqual(jsonValue(a),jsonValue(b))
const strings=(v:unknown):string[]=>(Array.isArray(v)?v:[v]).filter((x):x is string=>typeof x==='string' && !!x)
const unique=(v:string[])=>[...new Set(v)]
const id=(v:string)=>prefix+v.toLowerCase()
const date=(v:unknown)=>typeof v==='string' && /^\d{4}-\d{2}-\d{2}$/.test(v)?v:null
const noNumbers=(v:unknown):boolean=>typeof v!=='number' && (v===null || typeof v!=='object' || Object.values(v).every(noNumbers))
const index=(rows:Raw[],key:string,count?:number)=>{const out=new Map<string,Raw>(rows.map(r=>[r[key],r]));check(out.size===rows.length && (count===undefined || out.size===count),'编号或条数错误：'+key);return out}
const append=<T extends {id:string}>(rows:T[],entry:T)=>{const old=rows.find(x=>x.id===entry.id);check(!old || same(old,entry),'已有记录冲突，拒绝覆盖：'+entry.id);if(!old)rows.push(entry)}
const stage=(level:string):Research['claims'][number]['deployment']=>/trial/.test(level)?'pilot':/vendor|supplier/.test(level)?'vendor-report':/guideline/.test(level)?'not-applicable':'unknown'
const kind=(level:string):Research['sources'][number]['kind']=>/vendor|supplier/.test(level)?'vendor':/operator/.test(level)?'operator':/regulator/.test(level)?'official-investigation':/guideline/.test(level)?'standard':'other'

function readAndVerify(files:Readonly<Record<string,string>>) {
  const all:Record<string,Raw>={},p=cnTradeFiles
  for(const [key,pin] of Object.entries(p)){const text=files[pin.file];check(typeof text==='string' && createHash('sha256').update(text,'utf8').digest('hex')===pin.sha256,'实际文件 SHA 不匹配：'+pin.file);all[key]=JSON.parse(text)}
  const {inventory:i,main:m,audit:a,review:r,revisions:v,recheck:c,limitedRevisions:l,finalRecheck:f}=all
  for(const x of [i,m,a,r,v,c,f])check(x.country==='CN','国家绑定错误')
  check(r.industryId===industryId && m.inventorySource===p.inventory.file && m.inventorySha256===p.inventory.sha256 && a.inventorySha256===p.inventory.sha256 && r.input.inventorySha256===p.inventory.sha256,'行业或清单绑定错误')
  check(m.reviewedInputSha256===r.input.sha256 && m.independentReviewSha256===p.review.sha256 && m.sourceReviewFile===p.review.file && r.input.path===p.main.file && v.reviewSha256===p.review.sha256 && v.input.jsonSha256===r.input.sha256 && v.input.auditSha256===r.input.searchAuditSha256,'原独审输入或修订链错误')
  check(a.reviewedInputSha256===r.input.searchAuditSha256 && a.independentReviewSha256===p.review.sha256 && v.output.auditSha256===p.audit.sha256,'审计修订链错误')
  check(c.input[p.main.file]===v.output.jsonSha256 && c.input[p.audit.file]===p.audit.sha256 && c.input[p.review.file]===p.review.sha256 && c.input[p.revisions.file]===p.revisions.sha256,'首次限定复检绑定错误')
  check(l.inputSha256===v.output.jsonSha256 && l.outputSha256===p.main.sha256 && l.independentRecheckSha256===p.recheck.sha256 && f.input.originalRawSHA256===l.inputSha256 && f.input.currentRawSHA256===p.main.sha256 && f.input.authorReceiptSHA256===p.limitedRevisions.sha256 && f.input.precedingRecheckSHA256===p.recheck.sha256,'RC01 修订复检链错误')
  check(f.verdict==='specified-revisions-verified-for-unfrozen-working-version' && Object.values(f.checks).every(x=>x===true) && f.changedPaths.length===7 && l.rawChangedPathCount===7,'最终七字段复检未通过')
  check(m.isFrozen===false && f.isFrozen===false && l.canFreeze===false && m.sourceTaskCount===53 && f.counts.originalTasks===53 && f.counts.approvedNewTasks===0 && f.counts.proposedSplitParents===18,'任务或冻结计数错误')
  check(m.coverageSummary.partialMechanism===26 && m.coverageSummary.adjacentEvidenceOnly===15 && m.coverageSummary.noRetainedMechanism===12 && m.coverageSummary.automationSources===23 && m.coverageSummary.additionalLaterDefinitionSources===1,'分级计数错误')
  check(a.searches.length===53 && a.additionalQueries.length===7 && a.additionalQueries.reduce((n:number,q:Raw)=>n+q.queries.length,0)===22 && f.counts.mainQueries===106 && f.counts.supplementalQueries===22,'实际查询计数错误')
  return all
}

/** Apply effective definitions to the same 53 IDs; preserve original snapshots. */
export function importCnTrade(data:Research,files:Readonly<Record<string,string>>):Research {
  const {inventory,main,audit,review,recheck,finalRecheck}=readAndVerify(files),p=cnTradeFiles
  check(data.freezeStatus!=='frozen','不能向冻结版追加未冻结研究')
  const inventoryTasks=index(inventory.industries.find((i:Raw)=>i.id===industryId).scenarios.flatMap((s:Raw)=>s.tasks),'id',53)
  const originals=index(main.tasks,'id',53),decisions=index(review.taskDecisions,'taskId',53),checks=index(recheck.taskChecks,'taskId',53),queries=index(audit.searches,'taskId',53),reviewQueries=index(review.queryAudit.main,'taskId',53)
  const canonical=new Map(data.tasks.map(t=>[t.id,t]))
  check(data.tasks.filter(t=>t.industryId===industryId).length===53,'批零父任务集合已变')
  for(const o of originals.values()){
    const t=canonical.get(o.id),prior=t?.dossier?.publicResearch as Raw|undefined,d=o.reviewedDefinition,decision=decisions.get(o.id),c=checks.get(o.id)
    check(t && t.country==='cn' && o.country==='CN' && t.industryId===industryId && o.industryId===industryId && t.scenarioId===o.scenarioId,'任务国家、行业或场景错误：'+o.id)
    check(same(o.originalTask,inventoryTasks.get(o.id)) && same(t.dossier?.originalTask,o.originalTask) && t.discovery?.inputSha256===p.inventory.sha256 && t.discovery.inventoryFile===p.inventory.file,'原任务快照或清单绑定已变：'+o.id)
    const expected=prior?d:o.originalTask
    check(t.title===(prior?d.title:o.originalTask.action) && same(t.inputs,expected.inputs) && same(t.outputs,expected.outputs) && same(t.acceptance,strings(expected.acceptance)) && t.phase===phases[expected.phase] && t.boundary===o.executionConditions.scope,'当前任务定义未经审定变更：'+o.id)
    check(d.effectiveForEvidenceDisplay===true && d.countedCandidateId===t.id && same(d.sourceRefs,o.definitionReview.sourceRefs) && decision?.country==='CN' && decision.scenarioId===o.scenarioId && c?.originalTaskAndHumanValuesPreserved===true && c.fiveAlternativeDecisionsApplied===true && c.approvedNewTasks===0 && o.canFreeze===false,'有效定义或逐项裁决错误')
    check(!prior || (prior.provenance?.main?.sha256===p.main.sha256 && prior.provenance?.finalRecheck?.sha256===p.finalRecheck.sha256 && prior.canFreeze===false),'已有研究版本不匹配')
    check(['not-started','in-progress'].includes(t.researchStatus) && t.manualInputs.every(x=>x.value===null) && noNumbers(o.humanInput) && noNumbers(o.economics) && (!prior || noNumbers(prior.economics)) && o.economics.currency==='CNY','人工、现金或冻结状态变化')
  }
  const next:Research={...data,sources:[...data.sources],claims:[...data.claims],searches:[...data.searches],tasks:[...data.tasks],industries:[...data.industries]}
  const sources=index(main.sources,'id',24),definitions=index(main.definitionSources,'id',4),claims=index(main.claims,'id',42),claimChecks=index(recheck.claimChecks,'claimId',42),events=index(main.historicalEvents,'id',9)
  for(const s of sources.values()){
    check(s.countryScope==='CN' && levels[s.evidenceLevel] && date(s.retrievedAt),'来源国家或层级错误')
    const dates:NonNullable<Research['sources'][number]['dates']>=[],dateEvidence:Task['workflowEvidence']=[]
    if(s.pageDate){check(s.id==='CN-TR-AUTO-CHECK' && s.publishedAt===null,'裸日期误标发布');dates.push({kind:'displayed',value:s.pageDate,note:'网页裸日期，未区分发布或修改；不是已确认发布日期。'});dateEvidence.push({sourceId:id(s.id),locator:'L102'})}
    if(s.effectiveAt){dates.push({kind:'effective',value:s.effectiveAt,note:'所引用指南的实施日期；未完成全部现行地方要求认证。'});dateEvidence.push({sourceId:id(s.id),locator:'PDF封面；'+s.metadataUrl})}
    append(next.sources,{id:id(s.id),country:'cn',title:s.title,publisher:s.publisher,url:s.url,published:date(s.publishedAt),retrieved:s.retrievedAt,dates,dateEvidence,kind:kind(s.evidenceLevel),evidenceLevel:levels[s.evidenceLevel],evidencePeriod:s.id==='CN-TR-AUTO-OIL-FAIL-2021'?'2021 年 9 月事件，2022-03-22 发布；未外推当前故障率。':strings([s.publishedAt?s.publishedAt+' 发布内容':'无明确发布日期',s.scopeSummary,s.supportBoundary]).join('；'),readStatus:s.readStatus,limitations:strings([s.supportBoundary,s.scopeSummary,s.reviewBoundary,s.locatorConvention,'来源角色：'+levels[s.evidenceLevel]+'；本国关联不代表目标任务当前持续商业运行。'])})
  }
  for(const d of definitions.values()){
    if(sources.has(d.id))continue
    const original=inventory.sources.find((x:Raw)=>x.id===d.id)
    check(original && review.definitionSourceReviews.some((x:Raw)=>x.id===d.id),'定义来源没有原清单或独审')
    append(next.sources,{id:id(d.id),country:'cn',title:d.title,publisher:original.publisher,url:d.url,published:date(original.publishedAt),retrieved:d.retrievedAt,kind:d.id.includes('occ-')?'occupation':'standard',evidenceLevel:d.id.includes('occ-')?'历史职业公示稿限定动作/背景':'历史标准限定流程与要求',evidencePeriod:d.version,readStatus:'independent-review-selected-definition-passages-only',limitations:[d.version,d.reviewBoundary,d.readScope,d.readProvenance]})
  }
  const refs=(rr:Raw[]):Task['workflowEvidence']=>rr.map(ref=>{check(sources.has(ref.sourceId) && ref.locator,'来源引用缺失');if(ref.claimId)check(claims.get(ref.claimId)?.sourceId===ref.sourceId,'共享声明来源错配');return{sourceId:id(ref.sourceId),locator:ref.locator}})
  const definitionRefs=(rr:Raw[]):Task['workflowEvidence']=>rr.map(ref=>{check(definitions.has(ref.sourceId) && roles[ref.supportRole] && ref.locator,'定义来源作用未审定');return{sourceId:id(ref.sourceId),locator:strings([ref.locator,'来源作用：'+roles[ref.supportRole],ref.note]).join(' · ')}})
  for(const c of claims.values()){
    const s=sources.get(c.sourceId),loc=s?.locators.find((x:Raw)=>x.id===c.id)
    check(s && loc && loc.summary===c.statement && claimChecks.get(c.id)?.locator===c.locator,'共享声明与已审原文定位不一致')
    // This one retained sentence combines arithmetic description with a scope
    // judgment about physical weighing; classify the whole sentence conservatively.
    const mixed=c.id==='CN-TR-CLAIM-COMPUTED-WEIGHT'
    append(next.claims,{id:id(c.id),country:'cn',kind:mixed?'judgment':'fact',text:(mixed?'来源范围判读：':'来源陈述：')+c.statement,evidence:refs([{sourceId:c.sourceId,claimId:c.id,locator:c.locator}]),basedOn:[],conditions:[s.supportBoundary,'来源角色：'+levels[s.evidenceLevel]],status:'draft',deployment:stage(s.evidenceLevel),numericValue:null})
    if(c.evidenceBoundary){const b=c.evidenceBoundary;check(same(b,loc.evidenceBoundary),'来源与声明的边界不一致');append(next.claims,{id:id(c.id+'-boundary'),country:'cn',kind:b.kind==='hypothesis'?'hypothesis':'judgment',text:'研究边界：'+b.statement,evidence:refs(b.sourceRefs),basedOn:[id(c.id)],conditions:[s.supportBoundary,'只解释本来源适用范围，不升级为已证实技术障碍。'],status:'draft',deployment:stage(s.evidenceLevel),numericValue:null})}
  }
  for(const event of events.values()){
    check(eventTypes[event.kind] && event.currentFailureRate===null && event.supplierModelAttribution===null && event.commercialExitEstablished===false,'事件边界或类型变化')
    append(next.claims,{id:id(event.id),country:'cn',kind:'judgment',text:[event.eventMonth??event.eventYear+' 年',event.site,eventTypes[event.kind],event.statement].join('；'),conditions:[eventBoundary,event.kind==='historical-authority-economic-analysis'?'这是监管原因分析，不是一项独立物理故障或目标任务现金估值。':'不将多个站点或不同故障类型合并为一种设备故障。'],evidence:refs(event.sourceRefs),basedOn:unique(event.sourceRefs.map((r:Raw)=>id(r.claimId))),status:'draft',deployment:'unknown',numericValue:null})
  }
  const add=(t:Task,suffix:string,text:string,evidence:Task['workflowEvidence'],claimKind:Research['claims'][number]['kind'],conditions:string[]=[],basedOn:string[]=[])=>{const cid=id(t.id+'-'+suffix);append(next.claims,{id:cid,country:'cn',taskId:t.id,kind:claimKind,text,evidence,basedOn:unique(basedOn),conditions:unique([t.boundary,...conditions]),status:'draft',deployment:'unknown',numericValue:null});return cid}
  const updated=new Map<string,Task>()
  for(const o of originals.values()){
    const t=structuredClone(canonical.get(o.id)!),d=o.reviewedDefinition,dr=o.definitionReview,ar=o.atomicityReview,q=queries.get(o.id)!,rq=reviewQueries.get(o.id)!
    check(tiers[o.evidenceUseStatus] && o.alternatives.length===5 && ar.approvedChildCount===0,'证据分级、五技术或拟拆计数错误')
    const overlaps=main.overlapReview.filter((x:Raw)=>x.taskIds.includes(t.id)),hasCostAlias=o.economicBarriers.some((x:Raw)=>x.kind==='observed-historical-maintenance-delay')
    const taskEvents=[...o.technicalBarriers,...o.economicBarriers,...o.adoptionBarriers,...o.counterEvidence].filter((x:Raw)=>x.eventId)
    const notes=unique([definitionBoundary,d.scopeNote,...d.requiredScopeClarifications,o.executionConditions.performerBoundary,...overlaps.map((x:Raw)=>x.review),...taskEvents.map((x:Raw)=>'历史事件关联范围：'+x.site+'；'+x.scopeLimit),...(hasCostAlias?[costDedup]:[])])
    t.title=d.title;t.inputs=[...d.inputs];t.outputs=[...d.outputs];t.acceptance=strings(d.acceptance);t.phase=phases[d.phase]!
    t.workflowEvidence=definitionRefs(d.sourceRefs.filter((r:Raw)=>r.role==='workflow'));t.occupationEvidence=definitionRefs(d.sourceRefs.filter((r:Raw)=>r.role==='occupation'))
    t.conditions=unique([t.boundary,...notes,o.executionConditions.methodAndObjectGap,o.executionConditions.parametersToVerify]);t.alternatives=[];t.barriers=[];t.conclusionIds=[];t.counterevidenceIds=[];t.searchIds=[]
    const sourceBoundConditions:Raw[]=[],deploymentEvidence:Raw[]=[],eventMappings:Raw[]=[],legacyAliases:Raw[]=[]
    const attach=(rr:Raw[],scope:string)=>{
      const evidence=refs(rr)
      for(const [i,r] of rr.entries()){
        const s=sources.get(r.sourceId)!,c=r.claimId?claims.get(r.claimId):undefined
        if(c){t.conclusionIds.push(id(c.id));if(c.evidenceBoundary)t.conclusionIds.push(id(c.id+'-boundary'))}
        const bound={...evidence[i],level:levels[s.evidenceLevel],scope:strings([c?.statement,c?.evidenceBoundary?.statement,scope,s.supportBoundary,'当前整任务持续商业运行未独立验证。']).join('；'),currentOperationConfirmed:false,fullTaskAcceptanceVerified:false}
        sourceBoundConditions.push(bound);deploymentEvidence.push(bound)
      }
      return evidence
    }
    const linkEvent=(row:Raw)=>{
      const e=events.get(row.eventId);check(e && e.kind===row.kind && e.site===row.site && same(e.sourceRefs,row.sourceRefs),'任务事件映射发生变化')
      if(!eventMappings.some(x=>x.eventId===row.eventId))eventMappings.push(structuredClone(row))
      attach(row.sourceRefs,[row.relation,row.scopeLimit,eventBoundary].join('；'))
      return id(row.eventId)
    }
    for(const cid of o.claimRefs){const c=claims.get(cid);check(c,'任务共享声明不存在');attach([{sourceId:c.sourceId,claimId:cid,locator:c.locator}],o.executionConditions.reviewedScope)}
    const conclusionEvidence=attach(o.conclusion.sourceRefs,o.conclusion.boundary)
    t.summary=[tiers[o.evidenceUseStatus],o.conclusion.summary,d.scopeNote].join(' ')
    t.conclusionIds.push(add(t,'conclusion',t.summary+' '+o.conclusion.boundary,conclusionEvidence,conclusionEvidence.length?'judgment':'hypothesis',notes,o.conclusion.sourceRefs.map((r:Raw)=>id(r.claimId))))
    t.conclusionIds.push(add(t,'effective-definition',d.scopeNote+'；'+d.requiredScopeClarifications.join('；'),[...t.workflowEvidence,...t.occupationEvidence],'judgment',notes))
    for(const [i,a] of (o.alternatives as Raw[]).entries()){
      check(categories[a.type],'替代技术类别未知')
      const evidence=attach(a.sourceRefs,a.scopeReview),shared=a.sourceRefs.map((r:Raw)=>id(r.claimId))
      const text=strings([a.type,a.supportedActions,a.scopeReview,a.notEstablished,a.searchInterpretation]).join('；')
      const cid=add(t,'alternative-'+i,text,evidence,evidence.length?'judgment':'hypothesis',notes,shared)
      t.alternatives.push({category:categories[a.type],description:text,claimIds:unique([cid,...shared,...a.sourceRefs.filter((r:Raw)=>claims.get(r.claimId)?.evidenceBoundary).map((r:Raw)=>id(r.claimId+'-boundary'))]),conditions:[a.status==='adjacent-mechanism-only'?'相邻步骤或场景；不能标成本任务直接部署':a.status==='bounded-local-action-or-assisted-step'?'有局部动作或辅助功能；整任务仍未证实':'本类别缺新匹配机制，不证明不可行',...notes],remainingLabor:o.remainingHuman.map((h:Raw)=>strings([h.scope,h.note,h.scopeReview]).join('；'))})
      t.conclusionIds.push(cid)
    }
    for(const [field,type] of [['technicalBarriers','technical'],['economicBarriers','economic'],['adoptionBarriers','adoption']] as const){
      const seen=new Set<string>()
      for(const [i,b] of (o[field] as Raw[]).entries()){
        if(b.kind==='observed-historical-maintenance-delay'){
          check(type==='economic' && hasCostAlias && o[field].some((x:Raw)=>x.eventId==='TR-EV-2014-COST') && b.sourceRefs.every((r:Raw)=>r.claimId==='CN-TR-CLAIM-VAPOR-REPAIR-COST'),'旧维修分析没有可核对事件别名')
          legacyAliases.push({eventId:'TR-EV-2014-COST',originalRecord:structuredClone(b),displayRule:costDedup});continue
        }
        const cid=b.eventId?linkEvent(b):add(t,type+'-'+i,strings([b.question,b.detail,b.statement,b.scopeLimit]).join('；'),attach(b.sourceRefs??[],b.scopeLimit??o.executionConditions.reviewedScope),(b.sourceRefs??[]).length?'judgment':'hypothesis',notes,(b.sourceRefs??[]).map((r:Raw)=>id(r.claimId)))
        if(!seen.has(cid)){t.barriers.push({type,scenario:t.boundary,claimIds:[cid]});seen.add(cid)}
      }
    }
    for(const [i,c] of (o.counterEvidence as Raw[]).entries()){
      const cid=c.eventId?linkEvent(c):add(t,'counter-'+i,strings([c.statement,c.kind,eventBoundary]).join('；'),attach(c.sourceRefs,c.kind),'judgment',notes,c.sourceRefs.map((r:Raw)=>id(r.claimId)))
      t.counterevidenceIds.push(cid)
    }
    for(const [i,h] of (o.remainingHuman as Raw[]).entries()){
      const evidence=attach(h.sourceRefs,strings([h.note,h.scopeReview]).join('；'))
      t.conclusionIds.push(add(t,'remaining-human-'+i,strings([h.scope,h.note,h.scopeReview]).join('；'),evidence,evidence.length?'judgment':'hypothesis',notes,h.sourceRefs.map((r:Raw)=>id(r.claimId))))
    }
    for(const op of main.opportunities.filter((x:Raw)=>x.taskIds.includes(t.id))){
      check(op.country==='CN','机会串国')
      const evidence=attach(op.sourceRefs,[...op.conditions,...op.boundaries].join('；'))
      t.conclusionIds.push(add(t,op.id,op.why+'；条件：'+op.conditions.join('；')+'；验证：'+op.nextValidation,evidence,'judgment',[...op.conditions,...op.boundaries],op.sourceRefs.map((r:Raw)=>id(r.claimId))))
    }
    check(q.id===rq.publicSearchId && q.taskId===t.id && q.exactExecutionUtc===null && rq.exactExecutionUtc===null && rq.requestFieldsExactlyMatchPublicAudit===true && rq.nonemptyRawResultPresent===true,'主查询原文/时间审校不一致')
    for(const field of ['positiveQuery','negativeQuery','searchedAt'])check(q[field]===rq[field],'实际查询字段与独审不一致')
    for(const [field,direction] of [['positiveQuery','automation'],['negativeQuery','counterevidence']] as const){const sid=id(q.id+'-'+direction);append(next.searches,{id:sid,country:'cn',taskId:t.id,direction,query:q[field],searchedOn:q.searchedAt,results:[],outcome:'completed-candidates-unattributed',note:audit.executionRecordBoundary+' 五技术联合查找，没有各技术独立穷尽的证明；补充 22 查询按原 7 组保留。',audit:{file:p.audit.file,id:q.id,sha256:p.audit.sha256}});t.searchIds.push(sid)}
    t.manualInputs=[{name:'单位任务人工投入',value:null,unit:'合格交付单元与可撤销付薪工时待现场界定',evidence:[],gap:o.humanInput.gap}]
    t.conclusionIds=unique(t.conclusionIds);t.counterevidenceIds=unique(t.counterevidenceIds);t.researchStatus='in-progress'
    t.evidenceGaps=unique([...o.evidenceGaps,...notes,o.negativeFinding.caveat,'完整现金、共享系统分摊、替换和退役成本仍为空；不能以厂家速度或历史维修分析估算回报。'])
    t.interviewQuestions=unique([...o.interviewQuestions,...d.requiredScopeClarifications.map((x:string)=>'请核有效定义的范围：'+x)])
    t.discovery!.supportStatus=d.supportStatus;t.discovery!.acceptanceStatus=d.acceptanceBasis
    t.discovery!.sourceLimitations=unique([...t.discovery!.sourceLimitations,definitionBoundary,...d.sourceRefs.map((r:Raw)=>roles[r.supportRole])])
    t.evidenceAge=unique([...new Set(deploymentEvidence.map(x=>x.sourceId))].map(sid=>next.sources.find(s=>s.id===sid)!.evidencePeriod??'日期缺口')).join('；')||'只核历史定义来源；本任务缺新匹配机制。'
    t.review={reviewer:'批零独立来源审校与 RC01 限定复检',date:main.reviewedAt,notes:'所列修订通过，53 候选仍在研究中，完整检索、现场采用、现金与行业范围缺口尚未关闭。'}
    t.dossier={...t.dossier,publicResearch:{country:'cn',researchVersion:main.researchVersion,provenance:p,canFreeze:false,reviewedDefinition:structuredClone(d),
      definitionReview:{...structuredClone(dr),note:[...notes,dr.note].join(' '),children:ar.splitSuggestions.map((x:Raw)=>x.title),proposedChildrenCounted:false,atomicity:structuredClone(ar),sourceRefs:d.sourceRefs.map((r:Raw)=>({...r,displayRole:roles[r.supportRole]}))},
      evidenceSupportTier:o.evidenceUseStatus,evidenceSupportTierLabel:tiers[o.evidenceUseStatus],deploymentEvidence,sourceBoundConditions,economics:structuredClone(o.economics),originalHumanInput:structuredClone(o.humanInput),remainingHuman:structuredClone(o.remainingHuman),negativeFinding:structuredClone(o.negativeFinding),successfulCounterexamples:structuredClone(o.successfulCounterexamples),barrierCategory:structuredClone(o.barrierCategory),
      historicalEvents:eventMappings,legacyEventAliases:legacyAliases,eventDisplayBoundary:eventBoundary,eventDeduplicationRule:costDedup,overlapReview:structuredClone(overlaps),queryRecord:structuredClone(q),originalRequestUTC:null,
      searchSummary:'本任务 2 条查询有同批请求字段和合并回包；不能证明写入先后，无独立调用前日志或 UTC。五技术联合查找未穷尽；22 补充查询仅按原批次保存。',
      currentReviewStatus:'specified-revisions-verified-for-unfrozen-working-version',historicalDefinitionReview:structuredClone(dr),finalFieldCorrection:t.id==='cn-retail-motor-fuel-retail-006'?structuredClone(finalRecheck.changedPaths):[]}}
    const prior=canonical.get(t.id)!.dossier?.publicResearch as Raw|undefined
    if(prior)check(same(canonical.get(t.id),t),'已导入有效定义或研究数据发生冲突：'+t.id)
    updated.set(t.id,t)
  }
  next.tasks=next.tasks.map(t=>updated.get(t.id)??t)
  const catalogue={country:'cn',provenance:p,taskIds:[...originals.keys()],taskCount:53,approvedNewTasks:0,proposedSplitParents:18,canFreeze:false,evidenceSupportTierCounts:{'partial-mechanism':26,'adjacent-evidence-only':15,'no-retained-mechanism':12},automationSources:23,laterDefinitionSources:1,sharedSourceStatements:42,separatedBoundaries:15,
    historicalEvents:structuredClone(main.historicalEvents),eventCountBoundary:'9 条事件索引分别包含监管分析、不同站点及不同故障/管理类型，不等于 9 起独立物理故障；共享引用和旧维修成本分析不重复计数。',eventDeduplicationRule:costDedup,
    overlapReview:structuredClone(main.overlapReview),uncoveredScenarios:structuredClone(main.uncoveredScenarios),scenarios:structuredClone(main.scenarios),opportunities:structuredClone(main.opportunities),remainingGaps:structuredClone(finalRecheck.remainingGaps),notes:structuredClone(recheck.nonBlockingNotes),
    queryAudit:{file:p.audit.file,sha256:p.audit.sha256,mainQueries:106,supplementalQueries:22,supplementalBatches:7,originalRequestUTC:null,executionBoundary:audit.executionRecordBoundary,taskQueryPairs:structuredClone(audit.searches),supplementalGroups:structuredClone(audit.additionalQueries),independentDefinitionQueries:structuredClone(review.queryAudit.freshReviewerQueries),independentDefinitionQueriesCountedAsTaskSearches:false},
    publicationBoundary:'已完成所列独审与 RC01 七字段限定复检；五场景 53 原候选仍未冻结，不代表行业完整研究或数值回报。',method:structuredClone(main.method),exclusions:structuredClone(main.exclusions),numericEvidenceExclusions:structuredClone(main.numericEvidenceExclusions)}
  next.industries=next.industries.map(i=>{if(i.id!==industryId)return i;check(i.country==='cn' && (!i.inventory?.tradeResearch || same(i.inventory.tradeResearch,catalogue)),'行业补研目录冲突');return{...i,inventory:{...i.inventory,tradeResearch:catalogue}}})
  return validateResearch(next)
}
