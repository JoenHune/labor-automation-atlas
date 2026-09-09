import {createHash} from 'node:crypto'
import {isDeepStrictEqual} from 'node:util'
import type {Research, Task} from './schema'
import {validateResearch} from './validate'

type Raw = Record<string, any>
const stem = 'cn-industry-textiles-garments-footwear-17-19'
const prefix = 'automation-cn-textiles-'
const industryId = 'cn-industry'
const phases:Record<string,Task['phase']> = {'准备':'preparation','作业':'operation','交接':'handoff','检测':'inspection','异常':'exception','返工':'rework','清洁维护':'maintenance','交付':'delivery'}
const categories:Record<string,Task['alternatives'][number]['category']> = {'traditional-machine':'traditional-machine','special-purpose-machine':'dedicated-machine','robot':'robot','auxiliary-tool':'assistive-tool','sensor-assistance':'assistive-tool','vision-assistance':'assistive-tool','digital-support':'digital-process'}
export const cnIndustryTextilesFiles = Object.freeze({
  inventory:{file:'research/inventories/cn-core.json',sha256:'5388db09742709d606032d030ced3985f802a6e221441b59cd1302064ee8983e'},
  main:{file:`research/automation/${stem}.json`,sha256:'e8e24034460d5eefea0082c01b2ad6f3647fb5464d40a1975fefe670e1f64e6b'},
  audit:{file:`research/automation/${stem}-search-audit.json`,sha256:'4bb43099b62de176d1bfc7423166fe9d15d5666e1b3c0d78220bec843a84a9ce'},
  review:{file:`research/reviews/${stem}-automation-decisions.json`,sha256:'e7081d6b60916077f7663c3ded9d24ed2a8c1c5f3c7dd9189b7ac3d5b96e8784'},
  revisions:{file:`research/automation/${stem}-revisions.json`,sha256:'848d0fce0c09c4ab52ad41deaa932b4fd98a5091ffcd462af049bf7dfb829e9c'},
  recheck:{file:`research/reviews/${stem}-automation-recheck.json`,sha256:'78350dc9fcf3432f3cd338c198d30828059104395fc19d717d5325d3298ae5ec'},
  limitedRevisions:{file:`research/automation/${stem}-rc01-revisions.json`,sha256:'507cc51931c64ab708cb5d9322165022969d47c9c36302a28222b0ea9e940b2d'},
  finalRecheck:{file:`research/reviews/${stem}-automation-rc01-recheck.json`,sha256:'abb9f49c00238d9e6f543e4b04d5aa5e0476a9cbe1ac27a16cb47229b3f34a1d'},
  authorValidation:{file:`research/automation/${stem}-validation.json`,sha256:'81c210b22c1df1acd451a772177f21eba166740b64883b34cb28337d62849f2c'},
} as const)
for (const pin of Object.values(cnIndustryTextilesFiles)) Object.freeze(pin)

const check:(condition:unknown,message:string)=>asserts condition = (condition,message) => {if (!condition) throw new Error('纺织导入：'+message)}
const jsonValue = (v:unknown):unknown => v === undefined ? undefined : JSON.parse(JSON.stringify(v))
const same = (a:unknown,b:unknown) => isDeepStrictEqual(jsonValue(a),jsonValue(b))
const difference = (a:any,b:any,path=''):string => {
  if (same(a,b)) return ''
  if (!a || !b || typeof a!=='object' || typeof b!=='object') return path
  for (const key of new Set([...Object.keys(a),...Object.keys(b)])) {
    const found=difference(a[key],b[key],path+'.'+key)
    if (found) return found
  }
  return path
}
const unique = (s:string[]) => [...new Set(s)]
const strings = (v:unknown):string[] => (Array.isArray(v)?v:[v]).filter((x):x is string => typeof x === 'string' && !!x)
const date = (v:unknown) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null
const noNumbers = (v:unknown):boolean => typeof v !== 'number' && (v === null || typeof v !== 'object' || Object.values(v).every(noNumbers))
const id = (v:string) => prefix+v.toLowerCase()
const claimId = (ref:Raw) => id(ref.sourceId+'-'+ref.locatorId)
const index = (rows:Raw[],key:string,count?:number) => {
  const out=new Map<string,Raw>(rows.map(r=>[r[key],r]))
  check(out.size===rows.length && (count===undefined || out.size===count),'编号重复或数量不符：'+key)
  return out
}
const append = <T extends {id:string}>(rows:T[],entry:T) => {
  const old=rows.find(x=>x.id===entry.id)
  check(!old || same(old,entry),'已有记录冲突，拒绝覆盖：'+entry.id)
  if (!old) rows.push(entry)
}
const tiers:Record<string,string> = {
  'bounded-direct-or-partial-action-mechanism':'有匹配的局部动作或必要辅助机制；完整任务验收与持续运行仍未核实。',
  'conditional-roughing-mechanism-terminology-unverified':'带楦鞋面打粗有局部机制；与拟建流程“破面”的术语、对象和验收等价关系待核，不能计为直接匹配。',
  'equipment-or-route-scope-only':'仅有设备或工艺路线范围；没有完整动作机制。',
  'adjacent-evidence-only-no-current-task-mechanism':'仅有相邻动作或不同场景资料；未建立本任务匹配机制。',
  'insufficient-matched-evidence-after-search':'首轮正反查询后没有新匹配方案证据；不否定原流程设备基线，也不能据此判断不可行。',
}
const tierCounts = {'bounded-direct-or-partial-action-mechanism':61,'conditional-roughing-mechanism-terminology-unverified':1,'equipment-or-route-scope-only':1,'adjacent-evidence-only-no-current-task-mechanism':2,'insufficient-matched-evidence-after-search':71}
const supportLevelLabels:Record<string,string> = {
  'bounded-partial-action-or-enabling-support':'有局部动作机制或必要辅助，完整验收仍待核实',
  'equipment-scope-only-no-read-mechanism':'仅有设备范围，尚未读到本任务动作机制',
  'adjacent-digital-printing-workflow':'仅为相邻数字印花流程，未匹配当前任务',
  'adjacent-handling-not-shaping':'仅为相邻搬运操作，未支持压烫成型',
  'conditional-roughing-mechanism-terminology-equivalence-unverified':'有条件的打粗机制，与破面术语及验收的等价关系待核',
}
const definitionStatus = '已完成所列原文范围的首轮独立审校；仍缺现场 SOP、正式/现行版本核验与行业遗漏补齐。'
const scopeBoundary = '职业目录的场景背景、动作存在与 HJ 工艺单元分别限定；均不自动支持任务验收、实际部署或人工投入。'
const cashExitGap = '增量替换与退出边界待补：相对同一合法基线核旧设备处置、解约、切换并行、停用恢复与退出支出；与更新资本、部署或停机支出重叠的项目只计一次。'
const workingCapital = '先定义 WC_t 为方案相对同一基线的期末营运资金余额。期初扣 WC_0；后续扣 WC_t − WC_(t−1)，不是每期再扣全部余额。期末只释放实际可收回余额一次；若最后一期差额已包含释放，不再重复加 recovered_working_capital。全部余额与年份仍待采集。'
const specialNotes:Record<string,string> = {
  'cn-ind-cotton-spinning-014':'纺纱工任务8只支持机台清理；回花回收由另一前处理/粗纱条目支持，输出仍需分核。',
  'cn-ind-textile-dyeing-010':'染机喷嘴/滤毛与液体助剂配送管路分开：DONPRO-DYE 支持局部喷嘴清洁；DONPRO-DOSE 只列全管路清洗功能，程序、介质和清残验收仍缺。OP2 仅关联后一管路，不能借染机喷嘴支持。',
  'cn-ind-shoe-coldglue-form-007':'打粗与“破面”的术语、材料和独立验收是否相同仍待核；布鞋职责不能直接证明运动鞋材料路线。',
}
const stage = (level:string):Research['claims'][number]['deployment'] => /vendor/.test(level)?'vendor-report':/prototype/.test(level)?'laboratory':'unknown'
const sourceKind = (level:string):Research['sources'][number]['kind'] => /vendor|supplier/.test(level)?'vendor':/operator/.test(level)?'operator':/abstract|engineering|prototype/.test(level)?'paper':'other'

// Individually checked against the pinned 81 locator statements. These combine a
// source assertion with an applicability, absence-of-evidence or date judgment.
// Keep the entire sentence conservative; do not classify by matching keywords.
const sourceScopeJudgments:Record<string,string> = {
  'CN-TEXTILE-WOOLMARK/limits':'工艺风险不等于具名设备失败。',
  'CN-TEXTILE-DONGJIA-CARD/stops':'金属检出与自停联锁、自动排障未获原文支持。',
  'CN-TEXTILE-DONGJIA-CARD/dust':'机内吸尘不覆盖全车间地面。',
  'CN-TEXTILE-CTMTC-SPIN/draw':'配置存在须逐项确认，不能将备用筒默认用于本任务。',
  'CN-TEXTILE-QDU-WARP/warp':'校内设备登记状态不能延伸到之后的持续运行。',
  'CN-TEXTILE-CHANGLING-STUDY/human':'人工修布辅助不等于自动修织。',
  'CN-TEXTILE-DONPRO-DOSE/clean':'选配粉剂预溶化不能当作默认功能。',
  'CN-TEXTILE-DONPRO-DOSE/data':'配送记录不等于全部工艺交接签认。',
  'CN-TEXTILE-DONPRO-DYE/dye':'产品控制功能与具体布种适配需分核。',
  'CN-TEXTILE-XRITE/measure':'色块测量和色彩管理限定用途，不是其他实物工艺。',
  'CN-TEXTILE-XRITE/limits':'设备和材料因素不构成对全部颜色质量的保证。',
  'CN-TEXTILE-BOYAN/dry':'印刷后干燥不直接支持蒸化或完整固色验收。',
  'CN-TEXTILE-RICHPEACE-CUT/cad':'软件排料对接不证明实体裁切完成。',
  'CN-TEXTILE-JINGWEI/clean':'台面清理未覆盖余料分类回用与全部维护。',
  'CN-TEXTILE-AITU/stage':'计划上市年份不能推成已上市或已验收。',
  'CN-TEXTILE-SUNRISE/lint':'服装线屑清除不覆盖车台清扫。',
  'CN-TEXTILE-SUNRISE/collar':'领部送料缝制辅助未证明全服装自动缝制。',
  'CN-TEXTILE-SUNRISE/dry':'吊挂烘干流转不等于熨烫或全部分拣完成。',
  'CN-TEXTILE-SAILSTAR/period':'历史客户正常运转陈述不能平移到转载日。',
  'CN-TEXTILE-SAILSTAR/human':'已列人工步骤限制概述的全自动表述。',
  'CN-TEXTILE-SOLIDOT/press':'压合功能说明没有公开材料、保压与粘合验证。',
  'CN-TEXTILE-IHUA/polish':'皮鞋抛光不证明运动鞋表面适用。',
  'CN-TEXTILE-DELIIT/space':'嵌入尺寸条件与没有具名运行单位分别限定。',
  'CN-TEXTILE-SHOE-REPORT/period':'厂长投产日期自述未独立证实长周期稳定运营。',
  'CN-TEXTILE-DONGJIA-LOOM/monitor':'检测自停与找梭口未支持自动续纱修复。',
  'CN-TEXTILE-DONGJIA-LOOM/lubrication':'可选集中供油不代表整机维护无人化。',
  'CN-TEXTILE-LOOM-FAULT/defects':'工程故障说明不是具名事故。',
  'CN-TEXTILE-JUKI-BUTTONHOLE/edition':'内容截至日期不等于实际发布日期。',
}

function readAndVerify(files:Readonly<Record<string,string>>) {
  const all:Record<string,Raw>={},p=cnIndustryTextilesFiles
  for (const [key,pin] of Object.entries(p)) {
    const text=files[pin.file]
    check(typeof text==='string' && createHash('sha256').update(text,'utf8').digest('hex')===pin.sha256,'实际文件 SHA 不匹配：'+pin.file)
    all[key]=JSON.parse(text)
  }
  const {inventory:i,main:m,audit:a,review:r,revisions:v,recheck:c,limitedRevisions:l,finalRecheck:f,authorValidation:z}=all
  for (const value of [i,m,a,r,c]) check(value.country==='CN' && (!value.industryId || value.industryId===industryId),'国家或行业绑定错误')
  check(m.inventorySource===p.inventory.file && m.inventorySha256===p.inventory.sha256 && a.inventorySha256===p.inventory.sha256 && r.inputFiles.find((x:Raw)=>x.repositoryPath===p.inventory.file)?.sha256===p.inventory.sha256,'清单绑定错误')
  check(m.independentReview.reviewReference.sha256===p.review.sha256 && m.independentReview.reviewReference.inputSha256===r.inputSha256 && v.independentDecisionsSha256===p.review.sha256 && v.inputSha256===r.inputSha256 && r.inputFiles.find((x:Raw)=>x.repositoryPath===p.main.file)?.sha256===r.inputSha256,'原独审输入链错误')
  check(v.outputSha256===l.inputSha256 && v.originalAuditSha256===r.inputFiles.find((x:Raw)=>x.repositoryPath===p.audit.file)?.sha256 && v.outputAuditSha256===p.audit.sha256,'原修订输出或查询链错误')
  check(c.inputRawSha256===v.outputSha256 && c.originalRawSha256===r.inputSha256 && c.originalIndependentDecisionSha256===p.review.sha256 && c.authorReceiptSha256===p.revisions.sha256,'原限定复检绑定错误')
  for (const pin of [p.audit,p.revisions]) check(c.inputFiles.find((x:Raw)=>x.path===pin.file)?.sha256===pin.sha256,'原限定复检附件绑定错误')
  check(l.outputSha256===p.main.sha256 && l.independentRecheckSha256===p.recheck.sha256 && f.afterSha256===p.main.sha256 && f.beforeSha256===l.inputSha256 && f.authorReceiptSha256===p.limitedRevisions.sha256 && f.previousIndependentRecheckSha256===p.recheck.sha256,'RC01 修订复检绑定错误')
  check(z.outputSha256===p.main.sha256 && z.searchAuditSha256===p.audit.sha256 && z.reviewDecisionSha256===p.review.sha256 && z.revisionReceiptSha256===p.revisions.sha256 && z.errors.length===0 && l.linkedArtifactChanges.find((x:Raw)=>x.file===p.authorValidation.file.split('/').at(-1))?.afterSha256===p.authorValidation.sha256,'作者回执绑定错误')
  check(f.decision==='confirmed-with-retained-gaps-eligible-for-unfrozen-working-version' && f.actualDiffPathCount===2 && f.changes.every((x:Raw)=>x.after===specialNotes['cn-ind-cotton-spinning-014']) && Object.values(c.preservationChecks).every(x=>x===true),'最终复检未通过')
  check(m.isFrozen===false && f.isFrozen===false && c.canFreeze===false && l.canFreeze===false && m.sourceTaskCount===136 && f.retainedCounts.taskCount===136 && f.retainedCounts.proposedSplitParents===23 && f.retainedCounts.newCountedTasks===0 && v.queryReruns===0,'冻结、任务或重检计数不符')
  check(same(m.statistics.evidenceSupportTierCounts,tierCounts) && m.statistics.tasksWithCompletedPositiveAndCounterexampleResearch===0 && f.retainedCounts.matchedLocalMechanism===61 && f.retainedCounts.terminologyConditional===1,'五类证据边界变化')
  check(r.queryAudit.main.queryCount===272 && r.queryAudit.main.batches===68 && r.queryAudit.main.preciseUTCVerified===false && r.queryAudit.main.independentPreCallChronologyVerified===false && c.queryExecutionEvidence.newQueriesExecuted===0,'查询审校绑定或时间缺口变化')
  check(a.supplementalSearches.length===7 && a.supplementalSearches.reduce((n:number,x:Raw)=>n+x.queries.length,0)===16 && r.queryAudit.supplemental.checks.every((x:Raw)=>x.privateDatePresent===false),'补充查询数或日期缺口不符')
  return all
}

/** Import only the reviewed 136 existing candidates; no proposed child becomes a task. */
export function importCnIndustryTextiles(data:Research,files:Readonly<Record<string,string>>):Research {
  const {inventory,main,audit,review,recheck,finalRecheck}=readAndVerify(files),p=cnIndustryTextilesFiles
  check(data.freezeStatus!=='frozen','不能向冻结版本追加工作稿')
  const originals=index(main.tasks,'id',136),decisions=index(review.taskDecisions,'taskId',136),checks=index(recheck.taskRechecks,'taskId',136),queries=index(audit.taskQueries,'id',272),pools=index(audit.resultPools,'id',68)
  const inventoryTasks=index(inventory.industries.find((i:Raw)=>i.id===industryId).scenarios.flatMap((s:Raw)=>s.tasks),'id')
  const canonical=new Map(data.tasks.map(t=>[t.id,t])),scenarios=index(main.scenarios,'id',14)
  for (const o of originals.values()) {
    const t=canonical.get(o.id),d=decisions.get(o.id),c=checks.get(o.id),prior=t?.dossier?.publicResearch as Raw|undefined
    check(t && t.country==='cn' && o.country==='CN' && t.industryId===industryId && o.industryId===industryId && t.scenarioId===o.scenarioId && scenarios.get(o.scenarioId)?.taskIds.includes(t.id),'父任务国家、行业或场景错误：'+o.id)
    check(same(o.originalTask,inventoryTasks.get(o.id)) && same(t.dossier?.originalTask,o.originalTask) && t.discovery?.inputSha256===p.inventory.sha256 && t.discovery.inventoryFile===p.inventory.file,'原任务快照或清单绑定变化：'+o.id)
    check(t.title===o.action && same(t.inputs,o.inputs) && same(t.outputs,o.outputs) && same(t.acceptance,strings(o.acceptance)) && t.phase===phases[o.phase] && t.boundary===scenarios.get(o.scenarioId)?.scope && t.countingRole==='atomic-candidate','原任务定义变化：'+o.id)
    check(d && d.scenarioId===o.scenarioId && d.action===o.action && d.originalTaskMatchInventory===true && c?.originalTaskUnchanged===true && c.canFreeze===false && o.isFrozen===false && o.inventoryDisposition.proposedChildrenCounted===false,'逐项裁决或冻结状态变化：'+o.id)
    check(!prior || (prior.provenance?.main?.sha256===p.main.sha256 && prior.provenance?.finalRecheck?.sha256===p.finalRecheck.sha256 && prior.canFreeze===false),'已有研究版本冲突：'+o.id)
    check(['not-started','in-progress'].includes(t.researchStatus) && t.manualInputs.every(v=>v.value===null) && noNumbers(o.humanInput) && noNumbers(o.cashFlow) && (!prior || noNumbers(prior.economics)),'人工或现金参数不再为空：'+o.id)
  }
  const next:Research={...data,sources:[...data.sources],claims:[...data.claims],searches:[...data.searches],tasks:[...data.tasks],industries:[...data.industries]}
  const sources=index(main.sources,'id',35),definitions=index(main.inventorySources,'id',4)
  for (const source of sources.values()) {
    const reviewed=review.sourceReviews.find((s:Raw)=>s.sourceId===source.id)
    check(date(source.retrievedAt) && source.locators.length && source.originalContentSha256===reviewed?.originalCacheSha256 && source.independentReview.reference.sha256===p.review.sha256,'来源日期、原文摘要或审校绑定缺失')
    const dates:NonNullable<Research['sources'][number]['dates']>=[]
    const dateEvidence:Task['workflowEvidence']=[]
    if (source.id==='CN-TEXTILE-SAILSTAR') {
      dates.push({kind:'authored',value:'2018',note:'客户作者原文发表于 2018 年第 5 期；不是 2021 年重新进行的现场研究。'})
      dateEvidence.push({sourceId:id(source.id),locator:'标题时间及文献归属，行85—89、149—150'})
    }
    if (source.id==='CN-TEXTILE-JUKI-BUTTONHOLE') {
      dates.push({kind:'document-version',value:'2026-05',note:'目录内容截至 05/2026；实际发布日期未注明。'})
      dateEvidence.push({sourceId:id(source.id),locator:'PDF第1页下部目录说明；提取行35'})
    }
    append(next.sources,{id:id(source.id),country:'cn',title:source.title,publisher:source.publisher,url:source.url,published:date(source.publishedAt),...(source.id==='CN-TEXTILE-SAILSTAR'?{publishedLabel:'供应商转载日期；原文为 2018 年客户作者文章'}:{}),retrieved:source.retrievedAt,dates,dateEvidence,kind:sourceKind(source.evidenceType),sha256:source.originalContentSha256,evidencePeriod:source.evidencePeriod,evidenceLevel:source.evidenceType,readStatus:source.readStatus,limitations:strings([source.limitations,source.geography,source.locatorConvention,source.hashRepresentation,reviewed.publicationDateAssessment,'来源与本国任务关联不等于现场采用；历史、厂商、原型、拟建项目与当前持续商用分别解释。'])})
    for (const locator of source.locators) {
      check(locator.id && locator.section && locator.claim,'原文声明缺定位')
      const judgment=sourceScopeJudgments[source.id+'/'+locator.id]
      append(next.claims,{id:claimId({sourceId:source.id,locatorId:locator.id}),country:'cn',kind:judgment?'judgment':'fact',text:(judgment?'来源范围判读：':'来源陈述：')+locator.claim,conditions:strings([source.evidencePeriod,source.geography,source.limitations,source.readStatus,judgment]),evidence:[{sourceId:id(source.id),locator:locator.section,...(locator.quote?{excerpt:locator.quote}:{})}],basedOn:[],status:'draft',deployment:stage(source.evidenceType),numericValue:null})
    }
  }
  for (const key of Object.keys(sourceScopeJudgments)) {
    const [sid,lid]=key.split('/')
    check(sources.get(sid!)?.locators.some((l:Raw)=>l.id===lid),'来源范围判读表引用了不存在的声明：'+key)
  }
  for (const s of definitions.values()) {
    const original=inventory.sources.find((x:Raw)=>x.id===s.id),r=review.definitionSourceReviews.find((x:Raw)=>x.sourceId===s.id)
    check(original && r?.independentRead===true && s.independentReviewReference.sha256===p.review.sha256,'定义来源独审缺失')
    const dates:NonNullable<Research['sources'][number]['dates']>=[]
    if (date(original.effectiveAt)) dates.push({kind:'effective',value:original.effectiveAt,note:'所引用历史版本实施日期；不据此认定全部条款当前效力。'})
    if (original.documentDate) dates.push({kind:'authored',value:original.documentDate,note:'报告编制月份；不把公开网址月份当作发布日期。'})
    append(next.sources,{id:id(s.id),country:'cn',title:s.title,publisher:s.publisher,url:s.url,published:date(s.publishedAt),retrieved:main.researchedAt,dates,kind:s.id.includes('occ-')?'occupation':s.id.includes('eia-')?'other':'standard',sha256:r.sha256,evidenceLevel:r.role,evidencePeriod:original.versionNote ?? s.title,readStatus:'independent-review-selected-definition-passages-only',dateEvidence:dates.length?[{sourceId:id(s.id),locator:r.readLocator}]:[],limitations:strings([scopeBoundary,original.versionNote,r.scopeLimitation,'作者首轮状态：'+s.rereadStatus+'；独审只核所列定义范围。'])})
  }
  const refs=(rr:Raw[]):Task['workflowEvidence'] => rr.map(ref=>{
    const s=sources.get(ref.sourceId),l=s?.locators.find((x:Raw)=>x.id===ref.locatorId)
    check(s && l && ref.section,'机制引用缺来源/段落：'+ref.sourceId)
    return {sourceId:id(s.id),locator:unique([l.section,ref.section]).join(' · ')}
  })
  const definitionRefs=(rr:Raw[]):Task['workflowEvidence'] => rr.map(ref=>{
    const s=definitions.get(ref.sourceId),original=inventory.sources.find((x:Raw)=>x.id===ref.sourceId)
    check(s && original?.locators.some((l:Raw)=>l.id===ref.locatorId) && ref.section && ref.supportRole,'定义引用超出独审来源：'+ref.sourceId+'/'+ref.locatorId)
    return {sourceId:id(ref.sourceId),locator:strings([ref.section,ref.supportRole,ref.detail,ref.supportConclusion,scopeBoundary]).join(' · ')}
  })
  const add=(t:Task,suffix:string,text:string,evidence:Task['workflowEvidence'],kind:Research['claims'][number]['kind'],conditions:string[]=[],basedOn:string[]=[],deployment:Research['claims'][number]['deployment']='unknown') => {
    const claim=id(t.id+'-'+suffix)
    append(next.claims,{id:claim,country:'cn',taskId:t.id,kind,text,evidence,basedOn:unique(basedOn),conditions:unique([t.boundary,...conditions]),status:'draft',deployment,numericValue:null})
    return claim
  }
  const updated=new Map<string,Task>()
  for (const o of originals.values()) {
    const t=structuredClone(canonical.get(o.id)!),d=decisions.get(o.id)!,disp=o.inventoryDisposition,ec=o.executionConditions,tier=o.conclusion.coverageLevel
    check(tiers[tier],'未知证据层级')
    const overlap=main.sharedOperationMappings.filter((x:Raw)=>x.taskIds.includes(t.id))
    const boundaryNotes=unique([definitionStatus,scopeBoundary,ec.scenarioScope,ec.operatorAttribution,...overlap.map((x:Raw)=>'待现场核验的共用边界：'+x.rule),...strings(specialNotes[t.id]),...ec.reviewedDefinitionSourceRefs.filter((r:Raw)=>r.sourceId==='cn-occ-2022-draft').map((r:Raw)=>r.detail)])
    t.workflowEvidence=definitionRefs(ec.reviewedDefinitionSourceRefs.filter((r:Raw)=>r.sourceId!=='cn-occ-2022-draft'))
    t.occupationEvidence=definitionRefs(ec.reviewedDefinitionSourceRefs.filter((r:Raw)=>r.sourceId==='cn-occ-2022-draft'))
    t.conditions=unique([t.boundary,ec.conditionsToVerify,ec.acceptanceProvenance,ec.operatorAttribution,...boundaryNotes])
    t.conclusionIds=[];t.counterevidenceIds=[];t.alternatives=[];t.barriers=[];t.searchIds=[]
    const deploymentEvidence:Raw[]=[],sourceBoundConditions:Raw[]=[]
    const attach=(rr:Raw[],scope:string) => {
      const evidence=refs(rr)
      for (const [i,ref] of rr.entries()) {
        const s=sources.get(ref.sourceId)!,l=s.locators.find((x:Raw)=>x.id===ref.locatorId)
        t.conclusionIds.push(claimId(ref))
        for (const loc of s.locators.filter((x:Raw)=>['period','edition'].includes(x.id))) t.conclusionIds.push(claimId({sourceId:s.id,locatorId:loc.id}))
        const bound={...evidence[i],level:s.evidenceType,scope:strings([l.claim,scope,s.limitations,s.evidencePeriod,s.geography,s.readStatus]).join('；'),currentOperationConfirmed:false,fullTaskAcceptanceVerified:false}
        sourceBoundConditions.push(bound);deploymentEvidence.push(bound)
      }
      return evidence
    }
    const conclusionEvidence=attach(o.conclusion.sourceRefs,o.conclusion.supportBoundary)
    t.summary=[tiers[tier],o.conclusion.text,...strings(specialNotes[t.id])].join(' ')
    t.conclusionIds.push(add(t,'conclusion',t.summary+' '+o.conclusion.supportBoundary,conclusionEvidence,conclusionEvidence.length?'judgment':'hypothesis',t.conditions,o.conclusion.sourceRefs.map(claimId)))
    for (const [i,a] of (o.alternatives as Raw[]).entries()) {
      check(categories[a.kind],'替代类别未映射')
      const scope=unique(strings([a.mechanism,a.supportBoundary,a.reviewedApplicabilityNote,a.evidenceSupportLevel,a.supportLevel,a.evidencePeriod,a.countryScope,'完整任务验收与 2026 持续运行均未核实。']).map(x=>supportLevelLabels[x]??x)).join('；'), evidence=attach(a.sourceRefs,scope)
      const shared=a.sourceRefs.map(claimId),claim=add(t,'alternative-'+i,scope,evidence,evidence.length?'judgment':'hypothesis',t.conditions,shared,stage(a.deploymentStage))
      t.alternatives.push({category:categories[a.kind],description:scope,claimIds:unique([claim,...shared]),conditions:unique(strings([a.supportBoundary,a.reviewedApplicabilityNote,a.currentTaskDirectMechanism===true?'当前资料支持所限定动作的局部机制；完整验收仍待核实。':'当前资料不足以确认本任务的直接动作机制。',a.currentTaskMatched===true?'资料中存在与当前对象相关的条目；具体支持程度以证据层级为准。':'尚未核实来源条目与当前任务对象对应。',...boundaryNotes])),remainingLabor:strings([o.residualHuman.unresolvedActions,o.residualHuman.observedHumanBoundary,o.residualHuman.cashTreatment])})
      t.conclusionIds.push(claim)
    }
    const categoryScreen=[['traditional-machine','传统机械'],['dedicated-machine','专机'],['robot','机器人'],['assistive-tool','辅助工具'],['digital-process','数字流程']] as const
    for (const [category,label] of categoryScreen) if (!t.alternatives.some(a=>a.category===category)) {
      const text=label+'：本轮未保留该类别匹配方案证据，仍为待验证路线；'+o.alternativeCategoryScreen.scopeNote
      const claim=add(t,'unmatched-'+category,text,[],'hypothesis',['未分别穷尽五类方案；目录、相邻和术语待核不能当作直接匹配。'])
      t.alternatives.push({category,description:text,claimIds:[claim],conditions:['未分别穷尽五类方案；目录、相邻和术语待核不能当作直接匹配。'],remainingLabor:['缺匹配配置、残留动作和现场工时，均不能推定为零。']})
      t.conclusionIds.push(claim)
    }
    for (const [type,b] of Object.entries(o.barriers) as [Task['barriers'][number]['type'],Raw][]) {
      const evidence=attach(b.sourceRefs,'仅支持对应原文局部范围，不把正向能力变成已证实采用障碍。')
      const claim=add(t,'barrier-'+type,b.text+'；本任务技术/经济/采用状态仍待现场验证。',evidence,'hypothesis',t.conditions,b.sourceRefs.map(claimId))
      t.barriers.push({type,scenario:t.boundary,claimIds:[claim]})
    }
    for (const [i,counter] of (o.counterEvidence.records as Raw[]).entries()) {
      const scope=strings([counter.type,counter.statement,counter.applicability,counter.notEvidenceOf,o.counterEvidence.interpretation]).join('；'),evidence=attach(counter.sourceRefs,scope)
      t.counterevidenceIds.push(add(t,'counter-'+i,scope,evidence,evidence.length?'judgment':'hypothesis',t.conditions,counter.sourceRefs.map(claimId)))
    }
    const humanRefs=[...o.residualHuman.sourceBackedRequirements,...o.residualHuman.observedHumanSourceRefs],humanEvidence=attach(humanRefs,o.residualHuman.observedHumanBoundary)
    t.conclusionIds.push(add(t,'remaining-human',strings([o.residualHuman.unresolvedActions,o.residualHuman.observedHumanBoundary]).join('；'),humanEvidence,humanEvidence.length?'judgment':'hypothesis',t.conditions,humanRefs.map(claimId)))
    for (const [i,op] of (main.opportunities as Raw[]).filter(x=>x.taskIds.includes(t.id)).entries()) {
      check(op.country==='CN' && op.economicRank===null,'机会国家或回报值变化')
      const opportunityBoundary='机会关联多项任务，各来源只支持其注明的动作与物料；不同子输出、人工和资本须分别验收并去重。'
      const evidence=attach(op.sourceRefs,op.conditions+'；'+opportunityBoundary)
      t.conclusionIds.push(add(t,'opportunity-'+i,op.title+'：'+op.whyInvestigate+'；成立条件：'+op.conditions+'；下一步：'+op.nextValidation,evidence,'judgment',[op.conditions,opportunityBoundary],op.sourceRefs.map(claimId)))
    }
    const queryChecks=[...d.positiveQueryChecks,...d.negativeEvidenceReview.queryChecks]
    check(o.searchAudit.queryIds.length===2 && same(queryChecks.map((q:Raw)=>q.queryId),o.searchAudit.queryIds),'逐项查询绑定错误')
    for (const qid of o.searchAudit.queryIds) {
      const q=queries.get(qid),rq=queryChecks.find((x:Raw)=>x.queryId===qid),pool=q && pools.get(q.resultPoolId)
      check(q && rq && pool && q.taskId===t.id && rq.taskId===t.id && rq.direction===q.direction && pool.queryIds.includes(q.id) && pool.taskIds.includes(t.id) && ['positive','negative'].includes(q.direction),'查询或父任务错误')
      for (const field of ['queryTextMatches','taskIdMatches','directionMatches','dateMatches','requestLogMatches','resultPoolPresent']) check(rq[field]===true,'独审查询核对未通过：'+field)
      append(next.searches,{id:id(q.id),country:'cn',taskId:t.id,direction:q.direction==='positive'?'automation':'counterevidence',query:q.query,searchedOn:q.executedAt,results:[],outcome:'completed-candidates-unattributed',note:recheck.queryExecutionEvidence.main+' '+pool.resultAttribution+'；合并池候选不可按单条查询归因。补充 16 条仅按原批次保留，不重复分摊至任务。',audit:{file:p.audit.file,id:q.id,sha256:p.audit.sha256}})
      t.searchIds.push(id(q.id))
    }
    t.manualInputs=[{name:'本任务人工投入',value:null,unit:'合格任务单元与付薪工时待现场界定',evidence:[],gap:o.humanInput.note}]
    t.evidenceGaps=unique([...o.evidenceGaps.filter((x:string)=>x!=='库存流程与职业路径仍待独立复核及行业遗漏补齐。'),...boundaryNotes,cashExitGap,workingCapital,o.counterEvidence.interpretation,o.counterEvidence.queryScope,disp.decompositionSuggestion?('拟议拆分未批准、未增计任务：'+disp.decompositionSuggestion):'候选粒度仍待现场输出与验收核验。'])
    t.interviewQuestions=unique([...o.interviewQuestions,...strings(specialNotes[t.id]).map(x=>'请核当前剩余边界：'+x),...overlap.map((x:Raw)=>'请核共用循环和执行者：'+x.rule)])
    t.researchStatus='in-progress';t.conclusionIds=unique(t.conclusionIds)
    t.evidenceAge=unique([...sources.values()].filter(s=>deploymentEvidence.some(x=>x.sourceId===id(s.id))).map(s=>s.evidencePeriod)).join('；') || '所列历史职业/工艺资料只支持限定定义；本任务没有保留匹配方案。'
    t.discovery!.supportStatus=disp.reviewedInventoryStatus
    t.discovery!.sourceLimitations=unique([...t.discovery!.sourceLimitations,'纺织独立审校：'+scopeBoundary,...ec.reviewedDefinitionSourceRefs.filter((r:Raw)=>r.sourceId==='cn-occ-2022-draft').map((r:Raw)=>r.detail)])
    const model=main.cashFlowModels.find((m:Raw)=>m.id===o.cashFlow.modelId)
    check(model?.currency==='CNY' && noNumbers(model),'现金框架币种或参数变化')
    t.review={reviewer:'纺织公开来源独审及 RC01 限定复检',date:main.researchedAt,notes:'指定修订通过，全部任务仍未冻结；完整正反检索、现场采用、正式版本及现金参数仍有缺口。'}
    t.dossier={...t.dossier,publicResearch:{country:'cn',batchId:stem,researchVersion:main.researchVersion,provenance:p,canFreeze:false,
      evidenceSupportTier:tier,evidenceSupportTierLabel:tiers[tier],sourceBoundConditions,deploymentEvidence,
      definitionReview:{note:[...boundaryNotes,disp.reviewNote].join(' '),actionSupport:structuredClone(ec.reviewedDefinitionSourceRefs),children:disp.decompositionSuggestion?[disp.decompositionSuggestion]:[],proposedChildren:structuredClone(disp.proposedChildren),proposedChildrenCounted:false,originalPhase:o.phase,phaseSuggestion:null,acceptanceStatus:ec.acceptanceStatus,granularityDisposition:disp.decompositionSuggestion?'proposed-split':'retain',proposalStatus:disp.decompositionSuggestion?'existing-proposal-not-approved':'no-proposal-recorded'},
      economics:{...structuredClone(o.cashFlow),model:structuredClone(model),currency:'CNY',workingCapitalDefinition:workingCapital,throughputBenefitConstraint:'只有已确认未满足需求、瓶颈解除和下游可用能力共同支持的可销售新增量，才可形成增量贡献；产能口号不等于收入。',comparisonScope:model.costBoundary+'；'+cashExitGap},
      originalHumanInput:structuredClone(o.humanInput),remainingHuman:{...structuredClone(o.residualHuman),unresolvedActions:o.residualHuman.unresolvedActions},alternativeCategoryScreen:structuredClone(o.alternativeCategoryScreen),negativeFinding:structuredClone(o.counterEvidence),successfulCounterexamples:structuredClone(o.successfulCounterexamples),overlapMappings:structuredClone(overlap),
      history:{label:'原作者与原审历史字段，不代表当前待补状态',conclusion:structuredClone(o.conclusion),evidenceGaps:structuredClone(o.evidenceGaps),reviewResponse:structuredClone(o.reviewResponse),inventoryDisposition:structuredClone(disp)},
      currentReviewStatus:'specified-corrections-verified-with-open-research-gaps',limitedRecheck:structuredClone(checks.get(t.id)),finalFieldRechecks:t.id==='cn-ind-cotton-spinning-014'?structuredClone(finalRecheck.changes):[],originalRequestUTC:null,queryRecordIds:[...o.searchAudit.queryIds],resultPoolIds:[...o.searchAudit.resultPoolIds],
      searchSummary:'本任务 2 条实际主查询按 4 查询合并池发现候选，结果不逐查询归因；保留分离请求文本与回包及作者日期，无独立预调用或 UTC 证明。全批另有 16 条补充；私请求无日期，公开日期仅作者转录，不分摊为本任务额外检索。正反研究仍未完成。'}}
    const prior=canonical.get(t.id)!.dossier?.publicResearch as Raw|undefined
    if (prior) check(same(canonical.get(t.id),t),'已导入任务有效定义或研究字段发生冲突：'+t.id+difference(canonical.get(t.id),t))
    updated.set(t.id,t)
  }
  next.tasks=next.tasks.map(t=>updated.get(t.id)??t)
  const catalogue={country:'cn',batchId:stem,provenance:p,taskIds:[...originals.keys()],taskCount:136,newTaskCount:0,proposedSplitParentCount:23,proposedChildrenCounted:0,canFreeze:false,
    evidenceSupportTierCounts:structuredClone(tierCounts),tasksOutsideDirectOrPartialMechanismTier:75,statisticsBoundary:'61 匹配局部/必要辅助 + 1 打粗与破面术语待核 + 1 目录 + 2 相邻 + 71 无新匹配。旧 62 有限线索包含术语待核项；75 = 136 − 61，不表示 75 项均无任何设备基线。currentTaskMatched 仅对象相关不等于直接机制。',
    originalStatistics:structuredClone(main.statistics),scope:structuredClone(main.researchScope),scenarios:structuredClone(main.scenarios),remainingLimitations:[...main.researchPassLimitations,definitionStatus],sharedOperationMappings:structuredClone(main.sharedOperationMappings),opportunities:structuredClone(main.opportunities),
    queryAudit:{file:p.audit.file,sha256:p.audit.sha256,mainQueries:272,mainBatches:68,supplementalQueries:16,supplementalBatches:7,originalRequestUTC:null,mainProvenance:recheck.queryExecutionEvidence.main,supplementalProvenance:recheck.queryExecutionEvidence.supplemental,resultPools:structuredClone(audit.resultPools),supplementalSearches:structuredClone(audit.supplementalSearches),boundary:audit.auditBoundary},
    displaySynchronization:{definitionReview:definitionStatus,RC01:specialNotes['cn-ind-cotton-spinning-014'],nonblockingNotes:structuredClone(recheck.nonblockingNotes),proposalStatus:'23 项现有拟议拆分仍待批准；原 suggestionStatus 只在历史记录保留，不增加子任务。'}}
  check(next.industries.some(i=>i.id===industryId && i.country==='cn'),'中国工业不存在')
  next.industries=next.industries.map(i=>{
    if (i.id!==industryId) return i
    check(!i.inventory?.textilesResearch || same(i.inventory.textilesResearch,catalogue),'行业补研目录冲突')
    return {...i,inventory:{...i.inventory,textilesResearch:catalogue}}
  })
  return validateResearch(next)
}
