import type {Research,Task} from './schema'
import {importUsCore,type CoreProvenance} from './import-us-core'
type Raw=Record<string,any>
const equal=(a:unknown,b:unknown)=>JSON.stringify(a)===JSON.stringify(b)
const prefix='automation-us-health-',sid=(id:string)=>prefix+id.toLowerCase()
// Only explicit device or software descriptions determine a route. Combined guidance remains unclassified.
const route=(ref:Raw):Task['alternatives'][number]['category']|undefined=>{
 if(['FDA-ALETTA','RIF-WELLSTAR','OBI','OBI-STUDY','CHEF-OPENHAND','ROBONURSE'].includes(ref.sourceId))return 'robot'
 if(ref.sourceId==='ATELLICA')return ref.locatorId==='decap'?'dedicated-machine':'digital-process'
 if(['UI-RAD','FREEVEND','SMARTSPONGE'].includes(ref.sourceId))return 'dedicated-machine'
 if(['FDA-LIFT','HERCULES','SOCIAL-LAUNDRY'].includes(ref.sourceId))return 'traditional-machine'
 if(ref.sourceId==='BATH-NEED')return 'assistive-tool'
 if(['SPECIMEN-LOST','GE-QUALITY','CENSITRAC','G-VAAPP','BAXTER-VITAL','HHS-RPM','APTA-CONNECT','CMS-FHIR','BRIGHT-CHECK','BRIGHT-REPORT','BRIGHT-FEED','BRIGHT-PICKUP','ANDGO-BED','HMIS-CLIENT','HMIS-REFERRAL','HMIS-EXIT','HMIS-SCAN'].includes(ref.sourceId))return 'digital-process'
 return undefined
}
const partialDate=(v:unknown):v is string=>typeof v==='string'&&/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/.test(v)
const evidenceLocator=(l:Raw)=>[
 l.section,
 l.physicalPage?'PDF物理第'+l.physicalPage+'页'+(l.printedPage?'／印刷页'+l.printedPage:''):null,
 l.cacheLine?'LF文本行 '+l.cacheLine+(l.cacheEndLine&&l.cacheEndLine!==l.cacheLine?'—'+l.cacheEndLine:''):null,
 ...(l.additionalAnchors??[]).map((a:Raw)=>[a.section,'LF文本行 '+a.cacheLine+(a.cacheEndLine?'—'+a.cacheEndLine:''),a.webLine?'网页L'+a.webLine:null].filter(Boolean).join(' · ')),
 ...(l.additionalMechanismLocations??[]).map((a:Raw)=>'机制：PDF物理第'+a.physicalPage+'页／印刷页'+a.printedPage+'，LF文本行 '+a.cacheLines.join('—')),
].filter(Boolean).join('；')

/** The health adapter retains the independently reviewed date, phase and adjacent-task distinctions. */
export function importUsHealth(data:Research,raw:Raw,audit:Raw,review:Raw,recheck:Raw,provenance:CoreProvenance) {
 if([raw,audit,review,recheck].some(x=>x.country!=='US'||x.industryId!=='us-health')||raw.isFrozen!==false||review.canFreeze!==false||recheck.canFreeze!==false)throw new Error('美国卫生国家、行业或冻结状态不匹配')
 if(recheck.verdict!=='specified-corrections-verified-research-gaps-remain'||recheck.inputSHA256!==provenance.sha256||recheck.auditSHA256!==provenance.auditSha256||recheck.independentReviewSHA256!==provenance.reviewSha256||raw.independentReview.sha256!==provenance.reviewSha256||raw.independentReview.file!==provenance.reviewFile||raw.independentReview.reviewInputSha256!==review.input.sha256||recheck.originalInputSHA256!==review.input.sha256)throw new Error('美国卫生独立修订与限定复检输入不匹配')
 const decisions=new Map<string,Raw>(review.decisions.map((d:Raw)=>[d.taskId,d])),canonical=new Map(data.tasks.map(t=>[t.id,t]))
 if(raw.tasks.length!==100||decisions.size!==100||review.decisions.length!==100||recheck.taskChecks.length!==100)throw new Error('美国卫生任务或裁决重复、缺失')
 for(const t of raw.tasks as Raw[]) {
  const d=decisions.get(t.id),c=canonical.get(t.id.toLowerCase())
  if(!d||!c||!equal(t.originalTask,d.originalTask)||!equal(t.originalTask,c.dossier?.originalTask))throw new Error('美国卫生原始任务快照不匹配')
  if(!equal(t.inventoryReview.actionSupport,d.reviewedActionRefs)||!equal(t.inventoryReview.splitSuggestions,d.atomicityReview.proposedChildren)||t.inventoryReview.phase.recommended!==d.phaseReview.recommended||t.inventoryReview.approvedChildren!==0||t.positiveCounterexample.status!==d.positiveEvidenceDecision||!equal(t.independentReviewDisposition.repairsApplied,d.repairs))throw new Error('美国卫生独立定义或证据边界修订未应用')
  if(t.searchAudit.independentlyRerun!==false||t.searchAudit.actualUtcTimestamp!==null)throw new Error('美国卫生查询审计不得补造原始执行时间')
 }
 const normalized=structuredClone(raw)
 normalized.reviewedInputSha256=review.input.sha256;normalized.sourceReviewFile=provenance.reviewFile;normalized.researchVersion=data.version
 for(const s of normalized.sources as Raw[])for(const l of s.locators as Raw[]) {
  if(!l.lineConvention?.includes('LF-only')||(!l.quote&&l.rawQuoteMatch!==null))throw new Error('美国卫生原文行号或空引文核验状态错误')
  l.section=evidenceLocator(l)
 }
 for(const t of normalized.tasks as Raw[]) {
  t.inventoryReview.splitSuggestions=t.inventoryReview.splitSuggestions.map((title:string)=>({title}))
  for(const a of t.alternatives as Raw[])a.reviewBoundary=[a.supportsOnly?.replace('逐来源的支持范围见sourceRefs','各来源仅支持所注明的局部动作'),t.positiveCounterexample.status==='adjacent-evidence-only'?'仅相邻动作或阶段，不是本任务替代正例。':null].filter(Boolean).join('；')
 }
 const normalizedAudit=structuredClone(audit)
 for(const q of normalizedAudit.queries as Raw[]){if(q.executionStatus!=='completed')throw new Error('美国卫生缺少实际查询完成记录');q.executionStatus='executed'}
 importUsCore(data,normalized,normalizedAudit,review,provenance)
 for(const original of raw.sources as Raw[]) {
  const s=data.sources.find(s=>s.id===sid(original.id))!
  const dates:NonNullable<typeof s.dates>=[...(s.dates??[])]
  for(const[field,kind,note]of [
   ['documentEditionDate','document-version','历史文档版次，不能作为网页首次发布日期或现行有效性认证。'],
   ['documentPreparedDate','authored','申报材料准备月份，按原文精度保留。'],
   ['clearanceLetterDate','adopted','FDA许可函日期；不证明当前销售或持续商业运行。'],
   ['reportDate','authored','报告标注日期；另列首次公开日期。'],
   ['publiclyReleasedAt','released','公开发布日，与报告日期分开。'],
   ['pageDate','displayed','页面可见日期，尚未区分首次发表或更新。'],
  ]as const){const value=original[field];if(partialDate(value))dates.push({kind,value,note})}
  s.dates=dates
  if(original.publicationYear&&!original.publishedAt)s.limitations.push('已确认发表年份：'+original.publicationYear+'；没有已核实的精确月日。')
 }
 const sources=new Map<string,Raw>(normalized.sources.map((s:Raw)=>[s.id,s]))
 for(const original of raw.tasks as Raw[]) {
  const t=data.tasks.find(t=>t.id===original.id.toLowerCase())!,p=t.dossier!.publicResearch as Raw
  p.recheck={file:'research/reviews/us-health-automation-recheck.json',inputSHA256:recheck.inputSHA256,verdict:recheck.verdict,scope:recheck.scope}
  p.searchSummary='该定义的正反查询、候选选段和独立修订已核对；实际请求包与逐批UTC未保留，没有声称独立重跑。拟议子项不继承研究状态。'
  p.economics.workingCapitalDefinition=raw.cashFlowModels[0].workingCapitalBalanceDefinition+' '+raw.cashFlowModels[0].workingCapitalChangeFormula+'；期初和期末各计一次，年度已释放余额不重复计回收。'
  p.economics.comparisonScope=[raw.cashFlowModels[0].costBoundary,raw.cashFlowModels[0].careBoundary].join('；')
  const status=original.positiveCounterexample.status
  t.summary=(status==='adjacent-evidence-only'?'仅找到相邻动作或阶段的线索，未确认本任务替代。':status==='no-task-specific-positive-counterexample-confirmed'?'本轮未确认匹配的任务替代正例；证据不足不等于不可行。':'找到限定范围的机制或辅助动作；未确认完整任务持续商业效果。')+' '+original.executionConditions.taskBoundary
  for(const[i,a]of(original.alternatives as Raw[]).entries()) {
   const routes=[...new Set(a.sourceRefs.map((r:Raw)=>route(r)).filter(Boolean))] as Task['alternatives'][number]['category'][]
   t.alternatives[i].category=routes.length===1?routes[0]:'unclassified'
   if(routes.length!==1)t.alternatives[i].conditions.push('该候选含组合机制或仅有场景条件，方案类别仍待细分；不代表五类方案比较完成。')
  }
  for(const[i,condition]of(original.sourceBoundConditions as Raw[]).entries()) {
   const source=sources.get(condition.sourceId),locator=source?.locators.find((l:Raw)=>l.id===condition.locatorId)
   if(!source||!locator)throw new Error('美国卫生限定条件缺少原文定位')
   const existing=data.claims.find(c=>c.taskId===t.id&&c.evidence.some(e=>e.sourceId===sid(source.id)&&e.locator.startsWith(locator.section)))
   if(existing){existing.conditions=[...new Set([...existing.conditions,condition.boundary])];if(!t.conclusionIds.includes(existing.id))t.conclusionIds.push(existing.id);continue}
   const id=prefix+t.id+'-source-condition-'+i
   data.claims.push({id,country:'us',taskId:t.id,kind:'judgment',text:locator.claim+'；目标场景边界：'+condition.boundary,conditions:[t.boundary,'只在来源原地区、时期和对象范围内成立。'],evidence:[{sourceId:sid(source.id),locator:locator.section}],basedOn:[],status:'draft',deployment:'unknown'})
   t.conclusionIds.push(id)
  }
  for(const q of data.searches.filter(q=>t.searchIds.includes(q.id)))q.note+=' 原请求包和逐批UTC未保留，日期来自作者执行记录；本轮未独立重跑。'
 }
 for(const s of data.scenarios.filter(s=>s.country==='us'&&s.industryId==='us-health')) {
  const tasks=data.tasks.filter(t=>t.scenarioId===s.id)
  const unique=(refs:typeof s.workflowSources)=>[...new Map(refs.map(r=>[r.sourceId+'|'+r.locator,r])).values()]
  s.workflowSources=unique(tasks.flatMap(t=>t.workflowEvidence));s.occupationSources=unique(tasks.flatMap(t=>t.occupationEvidence))
 }
 return data
}
