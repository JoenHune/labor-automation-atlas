import type {Research,Task} from './schema'
import type {CoreProvenance} from './import-us-core'
type Raw=Record<string,any>
const prefix='automation-cn-mining-'
const sid=(id:string)=>prefix+id.toLowerCase()
const list=(v:unknown):string[]=>v==null?[]:(Array.isArray(v)?v:[v]).filter(x=>typeof x==='string'&&x.length>0) as string[]
const date=(v:unknown)=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)?v:null
const partialDate=(v:unknown)=>typeof v==='string'&&/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/.test(v)?v:null
const same=(a:unknown,b:unknown)=>JSON.stringify(a)===JSON.stringify(b)
const phases:Record<string,Task['phase']>={'准备':'preparation','作业':'operation','交接':'handoff','检测':'inspection','异常':'exception','返工':'rework','清洁维护':'maintenance','交付':'delivery'}
const category:Record<string,Task['alternatives'][number]['category']>={'traditional-machine':'traditional-machine','remote-machine':'traditional-machine','special-purpose-machine':'dedicated-machine','remote-special-purpose-machine':'dedicated-machine','auxiliary-tool':'assistive-tool','digital-support':'digital-process','sensor-assistance':'assistive-tool','vision-assistance':'assistive-tool','sensor-interlock':'assistive-tool'}
const sourceKind=(level:string):Research['sources'][number]['kind']=>level.startsWith('vendor')?'vendor':/^(operator|contractor)/.test(level)?'operator':/standard|requirement/.test(level)?'standard':/laboratory|original-study/.test(level)?'paper':'other'
const deployment=(level:string):Research['claims'][number]['deployment']=>/laboratory/.test(level)?'laboratory':/pilot|field-test/.test(level)?'pilot':level.startsWith('vendor')?'vendor-report':/requirement|standard|metadata|guidance/.test(level)?'not-applicable':'unknown'

/** Imports the reviewed mining batch without changing the archived discovery definitions. */
export function importCnMining(data:Research,raw:Raw,audit:Raw,review:Raw,recheck:Raw,provenance:CoreProvenance) {
 const receipt=recheck.followupFieldReceipt
 if(raw.country!=='CN'||audit.country!=='CN'||raw.industryId!=='cn-industry'||raw.batchId!=='cn-industry-mining-06-12'||audit.batchId!==raw.batchId||raw.isFrozen!==false||recheck.isFrozen!==false||receipt?.canFreeze!==false||receipt.verdict!=='eligible-for-unfrozen-working-version-with-recorded-gaps')throw new Error('中国矿业国家、批次或复检状态不匹配')
 if(raw.independentReview.reviewSha256!==provenance.reviewSha256||raw.independentReview.reviewFile!==provenance.reviewFile||raw.independentReview.inputSha256!==raw.reviewedInputSha256||receipt.authorInputSha256!==provenance.sha256||receipt.queryAuditSha256Unchanged!==provenance.auditSha256||audit.inventorySha256!==raw.inventorySha256)throw new Error('矿业研究与独立复检版本不匹配')
 if(!review.inputs.some((i:Raw)=>i.sha256===raw.reviewedInputSha256)||!['E08','R01','R02'].every(id=>receipt.findings.some((f:Raw)=>f.id===id&&f.status==='confirmed-fixed')))throw new Error('矿业指定修订未通过复检')
 const taskIds=new Set<string>(raw.tasks.map((t:Raw)=>t.id)),decisions=new Map<string,Raw>(review.taskDecisions.map((t:Raw)=>[t.taskId,t])),sources=new Map<string,Raw>(raw.sources.map((s:Raw)=>[s.id,s]))
 if(taskIds.size!==raw.sourceTaskCount||taskIds.size!==raw.tasks.length||decisions.size!==taskIds.size||decisions.size!==review.taskDecisions.length||sources.size!==raw.sources.length)throw new Error('矿业任务、裁决或来源编号重复或缺失')
 const queries=new Map<string,Raw[]>(),qids=new Set<string>()
 for(const q of audit.taskQueries as Raw[]) {
  if(!taskIds.has(q.taskId)||qids.has(q.id)||!q.query||q.executionStatus!=='executed'||!date(q.executedAt)||!['positive','negative'].includes(q.direction))throw new Error('矿业实际查询缺失或归属不明')
  qids.add(q.id);queries.set(q.taskId,[...(queries.get(q.taskId)??[]),q])
 }
 const resolve=(r:Raw)=>{
  const source=sources.get(r.sourceId),locator=source?.locators.find((l:Raw)=>l.id===r.locatorId)
  if(!source||!locator?.claim||!locator.section||r.section!==locator.section)throw new Error('矿业原文定位不匹配：'+r.sourceId+'/'+r.locatorId)
  return {source,locator,evidence:{sourceId:sid(source.id),locator:locator.section}}
 }
 const refs=(rr:Raw[])=>rr.map(r=>resolve(r).evidence)
 data.sources=data.sources.filter(s=>!s.id.startsWith(prefix));data.claims=data.claims.filter(c=>!c.id.startsWith(prefix));data.searches=data.searches.filter(s=>!s.id.startsWith(prefix))
 for(const s of raw.sources as Raw[]) {
  if(!s.geography||!s.evidencePeriod||!s.evidenceType)throw new Error('矿业来源范围与时期缺失')
  const dates:NonNullable<Research['sources'][number]['dates']>=[]
  for(const[field,kind]of[['effectiveAt','effective'],['webPublishedAt','released'],['documentOnlinePublishedAt','released']]as const){const value=partialDate(s[field]);if(value&&!dates.some(d=>d.kind===kind&&d.value===value))dates.push({kind,value,note:s.publicationDateNote??'来源所示生效与上网日期分别保留。'})}
  data.sources.push({id:sid(s.id),country:'cn',title:s.title,url:s.url,publisher:s.publisher,published:date(s.publishedAt),publishedLabel:partialDate(s.publishedAt)??undefined,retrieved:date(s.retrievedAt)??raw.researchedAt,kind:sourceKind(s.evidenceType),dates,
   evidencePeriod:s.evidencePeriod,evidenceLevel:s.evidenceType,readStatus:s.readStatus,sha256:s.originalContentSha256,
   limitations:[...list(s.limitations),s.publicationDateNote,s.locatorConvention,'来源范围：'+s.geography,'中国标签表示任务研究关联；其他地区、海外相邻机制或厂商功能不代表本任务当前采用。'].filter(Boolean)})
 }
 const canonical=new Map(data.tasks.map(t=>[t.id,t])),allSources=new Map(data.sources.map(s=>[s.id,s]))
 for(const r of raw.tasks as Raw[]) {
  const t=canonical.get(r.id),o=r.originalTask,decision=decisions.get(r.id),definition=r.inventoryDisposition
  if(!t||!decision||t.country!=='cn'||r.country!=='CN'||t.industryId!==raw.industryId||r.industryId!==raw.industryId||t.scenarioId!==r.scenarioId||decision.scenarioId!==r.scenarioId||decision.actionReviewed!==o.action||r.isFrozen!==false||decision.isFrozen!==false)throw new Error('矿业国家、场景或原始裁决不匹配：'+r.id)
  if(!t.discovery||t.discovery.inputSha256!==raw.inventorySha256||t.discovery.inventoryFile!==raw.inventorySource||!same(t.dossier?.originalTask,o)||t.boundary!==r.executionConditions.scenarioScope)throw new Error('矿业原任务定义或清单版本已变化：'+r.id)
  const prior=(t.dossier?.publicResearch as Raw|undefined)?.provenance?.sha256===provenance.sha256
  if(t.title!==(prior?r.action:o.action)||!same(t.inputs,list(prior?r.inputs:o.inputs))||!same(t.outputs,list(prior?r.outputs:o.outputs))||!same(t.acceptance,list(prior?r.acceptance:o.acceptance)))throw new Error('矿业显示定义与受审快照不匹配：'+r.id)
  const changed=['action','title','inputs','outputs','acceptance','phase'].filter(k=>!same(r[k],o[k]))
  if(changed.length) {
   const checked=recheck.displayDiff.find((d:Raw)=>d.taskId===r.id)
   if(!checked||!changed.every(k=>checked.changedFields.includes(k))||!changed.every(k=>same(definition.correctedResearchFields?.[k],r[k])))throw new Error('矿业未复检的显示定义变动：'+r.id)
  }
  if(definition.granularityReview!==decision.granularity||definition.countsAsFrozenAtomicTask!==false||r.independentReview.reviewSha256!==provenance.reviewSha256)throw new Error('矿业定义审查记录未应用：'+r.id)
  const qs=queries.get(r.id)??[]
  if(qs.length!==2||!['positive','negative'].every(d=>qs.filter(q=>q.direction===d).length===1)||!same(qs.map(q=>q.id),r.searchAudit.queryIds))throw new Error('矿业正反查询对不完整：'+r.id)
  const cash=raw.cashFlowModels.find((m:Raw)=>m.id===r.cashFlow.modelId)
  if(!cash||cash.currency!=='CNY'||Object.values(cash.parameters).some(v=>v!==null)||Object.values(r.cashFlow.parameters).some(v=>v!==null)||['npv','paybackYears','breakEvenPaidHours'].some(k=>r.cashFlow[k]!==null)||Object.values(r.humanInput).some(v=>typeof v==='number'))throw new Error('矿业新增人工或现金数字需单独验证：'+r.id)
  t.title=r.action;t.inputs=list(r.inputs);t.outputs=list(r.outputs);t.acceptance=list(r.acceptance);t.phase=phases[r.phase]
  if(!t.phase)throw new Error('矿业任务阶段不明确')
  const local=prefix+t.id+'-',conditions=[t.boundary,r.executionConditions.conditionsToVerify,r.conclusion.supportBoundary,...list(r.executionConditions.additionalUnverifiedConditions)]
  const claim=(suffix:string,text:string,evidence:Research['claims'][number]['evidence'],kind:Research['claims'][number]['kind'],level='unknown',scope:string[]=[])=>{
   const id=local+suffix;data.claims.push({id,country:'cn',taskId:t.id,kind,text,evidence,conditions:[...conditions,...scope],basedOn:[],status:'draft',deployment:deployment(level)});return id
  }
  t.conditions=conditions;t.alternatives=[];t.conclusionIds=[];t.counterevidenceIds=[];t.barriers=[];t.searchIds=[]
  for(const[i,a]of(r.alternatives as Raw[]).entries()) {
   if(!category[a.kind])throw new Error('矿业方案类别未映射')
   const claimIds=(a.sourceRefs as Raw[]).map((ref,j)=>{const x=resolve(ref);return claim('alternative-'+i+'-'+j,[x.locator.claim,'本任务适用边界：'+a.supportBoundary].join('；'),[x.evidence],'judgment',x.source.evidenceType,['来源范围：'+x.source.geography])})
   if(!claimIds.length)claimIds.push(claim('alternative-'+i,'待验证候选：'+a.mechanism,[],'hypothesis'))
   t.alternatives.push({category:category[a.kind],description:a.mechanism,claimIds,conditions:[a.supportBoundary,'原文时期：'+a.evidencePeriod,'来源范围：'+a.countryScope],remainingLabor:[r.residualHuman.unresolvedActions,'残留工时未测；不据候选机制认定可减员。']});t.conclusionIds.push(...claimIds)
  }
  if(!t.conclusionIds.length)t.conclusionIds.push(claim('gap',r.conclusion.text+' '+r.conclusion.supportBoundary,[],'hypothesis'))
  for(const type of ['technical','economic','adoption']as const) {
   const b=r.barriers[type]
   if(b.sourceRefs.length||!['conditional-research-hypothesis','parameter-gap-not-proven-uneconomic','scenario-specific-unverified-hypothesis'].includes(b.statementType))throw new Error('矿业新增障碍事实需独立验证')
   t.barriers.push({type,scenario:t.boundary,claimIds:[claim(type,b.text,[],'hypothesis')]})
  }
  for(const[i,c]of(r.counterEvidence.records as Raw[]).entries())t.counterevidenceIds.push(claim('counter-'+i,[c.statement,c.applicability,c.notEvidenceOf].filter(Boolean).join('；'),refs(c.sourceRefs),'judgment','unknown',[r.counterEvidence.interpretation]))
  for(const[i,c]of(r.executionConditions.sourceBackedRequirements??[]).entries())t.conclusionIds.push(claim('requirement-'+i,c.statement+'；规范条件不能证明自动化采用或失败。',refs(c.sourceRefs),'fact','official-operating-requirement'))
  for(const q of qs) {
   const id=local+'search-'+q.id.toLowerCase();data.searches.push({id,country:'cn',taskId:t.id,direction:q.direction==='positive'?'automation':'counterevidence',query:q.query,searchedOn:q.executedAt,results:[],outcome:'completed-candidates-unattributed',note:'原始动作的查询与结果批次已核；候选合并返回，不能逐条归因。尚需按设备名补失败、退出与未采用的检索。',audit:{file:provenance.auditFile,id:q.id,sha256:provenance.auditSha256}});t.searchIds.push(id)
  }
  const usedOriginalRefs=new Map<string,number>()
  const originalRefs=(o.sourceRefs as Raw[]).map(ref=>{const oldId='inventory-cn-core-'+ref.sourceId,source=allSources.get(oldId);if(!source)throw new Error('原定义来源缺失');const index=usedOriginalRefs.get(oldId)??0,old=[...t.workflowEvidence,...t.occupationEvidence].filter(x=>x.sourceId===oldId)[index];usedOriginalRefs.set(oldId,index+1);if(!old?.locator)throw new Error('原定义定位缺失：'+r.id+'/'+ref.sourceId);return{sourceId:oldId,locator:old.locator.split(' · 独立核读范围：')[0]+' · 独立核读范围：'+decision.originalPassageRead}})
  t.occupationEvidence=originalRefs.filter(x=>x.sourceId.endsWith('cn-occ-2022-draft'))
  t.workflowEvidence=[...originalRefs.filter(x=>!x.sourceId.endsWith('cn-occ-2022-draft')),...(r.executionConditions.sourceBackedRequirements??[]).flatMap((x:Raw)=>refs(x.sourceRefs))]
  t.discovery!.supportStatus=definition.proposedDecomposition?'proposed':t.discovery!.supportStatus
  t.discovery!.sourceLimitations=[...new Set([...t.discovery!.sourceLimitations,'独立任务复核：'+decision.reason,'原始任务快照归档保留；3项显示定义按已复检的条款修订，尚未冻结。'])]
  t.manualInputs=[{name:'单位任务人工工时',value:null,unit:'分钟／合格交付单元，单元待现场界定',evidence:[],gap:r.humanInput.note}]
  t.evidenceGaps=[...list(r.evidenceGaps),decision.searchAdequacy,'拟议拆分及其他未盘点场景未继承本项研究状态；全部保持未冻结。']
  t.interviewQuestions=list(r.interviewQuestions);t.summary=r.conclusion.text+' '+r.conclusion.supportBoundary;t.researchStatus='in-progress'
  t.review={reviewer:'独立来源与动作复核',date:raw.researchedAt,notes:'138项原稿逐项审校；指定修订及后续10内容字段已限定复检。保留21项拆分建议与反例深化缺口，未冻结。'}
  t.dossier={...t.dossier,publicResearch:{country:'cn',researchVersion:raw.researchVersion,provenance,reviewFile:provenance.reviewFile,reviewedInputSha256:raw.reviewedInputSha256,
   definitionReview:{status:definition.granularityReview,note:decision.reason,children:[],proposedDecomposition:definition.proposedDecomposition,phaseReview:{original:o.phase,recommended:r.phase},originalDisplay:{title:o.action,inputs:o.inputs},reviewedDisplay:{title:r.action,inputs:r.inputs}},
   deploymentEvidence:r.alternatives.flatMap((a:Raw)=>a.sourceRefs.map((ref:Raw)=>{const x=resolve(ref);return{...x.evidence,level:x.source.evidenceType,scope:x.locator.claim+'；'+a.supportBoundary,currentOperationConfirmed:false}})),
   economics:{...r.cashFlow,currency:'CNY',framework:cash,workingCapitalDefinition:'W_t是部署相对无项目基线的增量营运资金余额；期初扣W_0，年度扣W_t−W_(t−1)，期末仅回收实际余额一次。',throughputBenefitConstraint:cash.parameterDefinitions.usable_incremental_capacity},negativeFinding:r.counterEvidence,successfulCounterexamples:r.successfulCounterexamples,
   alternativeCategoryScreen:r.alternativeCategoryScreen,independentRecheck:{file:'research/reviews/cn-industry-mining-06-12-automation-recheck.json',inputSha256:receipt.authorInputSha256,priorCheckpointSha256:receipt.priorIndependentRecheckSha256,verdict:receipt.verdict,scope:receipt.scope},technicalQuestionPolicy:'技术、经济和采用问题是具体场景待验证假设；规范条件、研发不足和完整任务失败分别记录。',searchSummary:'原动作276查询及19补充查询保存并核查；未逐类别和所有退出/未采用原因穷尽，21项拟议拆分未计数。',canFreeze:false}}
 }
 for(const s of data.scenarios.filter(s=>s.country==='cn'&&s.industryId==='cn-industry'&&raw.scenarios.some((r:Raw)=>r.id===s.id))) {
  const tasks=data.tasks.filter(t=>t.scenarioId===s.id),unique=(rr:Task['workflowEvidence'])=>[...new Map(rr.map(r=>[r.sourceId+'|'+r.locator,r])).values()]
  s.workflowSources=unique(tasks.flatMap(t=>t.workflowEvidence));s.occupationSources=unique(tasks.flatMap(t=>t.occupationEvidence))
  for(const c of s.coverage)c.taskIds=tasks.filter(t=>t.phase===phases[c.phase]).map(t=>t.id)
 }
 return data
}
