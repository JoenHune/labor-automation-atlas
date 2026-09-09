import {createHash} from 'node:crypto'
import {isDeepStrictEqual} from 'node:util'
import type {Research, Task} from './schema'
import {validateResearch} from './validate'

type Raw = Record<string, any>
const stem = 'cn-industry-food-beverage-tobacco-13-16'
const prefix = 'automation-cn-food-'
const industryId = 'cn-industry'
const phases:Record<string,Task['phase']> = {'准备':'preparation','作业':'operation','交接':'handoff','检测':'inspection','异常':'exception','返工':'rework','清洁维护':'maintenance','交付':'delivery'}
const categories:Record<string,Task['alternatives'][number]['category']> = {'traditional-machine':'traditional-machine','special-purpose-machine':'dedicated-machine','robot':'robot','sensor-assistance':'assistive-tool','vision-assistance':'assistive-tool','digital-support':'digital-process'}
export const cnIndustryFoodFiles = Object.freeze({
  inventory:{file:'research/inventories/cn-core.json',sha256:'5388db09742709d606032d030ced3985f802a6e221441b59cd1302064ee8983e'},
  main:{file:`research/automation/${stem}.json`,sha256:'b54710c4db1b730515f85b07d53ddc33f0f37b59769a069e13cdae94c214f748'},
  audit:{file:`research/automation/${stem}-search-audit.json`,sha256:'7e616c9260868a05be967d0d74778bbbe95bac8110d887e6ac88d93b5e89ef2b'},
  review:{file:`research/reviews/${stem}-automation-decisions.json`,sha256:'7d7e05158b0495a7ab978dcc3148ce38daf353c1c48ef65ee5d727a1f7596d03'},
  revisions:{file:`research/automation/${stem}-revisions.json`,sha256:'3a043e35df07fe7c34d541eb0c1d8a7dd12763374bb6f7568268b567b42601d9'},
  recheck:{file:`research/reviews/${stem}-automation-recheck.json`,sha256:'25f32ec9b5402ae2e399a9446ef78c19c9b88579f2f2dc38322bdd0adc9b6a41'},
  limitedRevisions:{file:`research/automation/${stem}-limited-revisions.json`,sha256:'7248d31f22c423f2c0c41981e96877ff5a25e2f34a2042353931469859aca620'},
  finalRecheck:{file:`research/reviews/${stem}-automation-rc01-rc02-recheck.json`,sha256:'37b2a77ad22eaeed55008a165444788f704d7c3b91c93b3d61c5b8aaca25f117'},
  authorValidation:{file:`research/automation/${stem}-validation.json`,sha256:'27c0c9cba36d32907d81d58a390de3a006f04b2a4c5ef5f2b7725bf9b2df5ee9'},
} as const)
for (const pin of Object.values(cnIndustryFoodFiles)) Object.freeze(pin)

const check:(condition:unknown,message:string)=>asserts condition = (condition,message) => {if (!condition) throw new Error('食品导入：'+message)}
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
  'bounded-direct-or-partial-action-mechanism':'有直接或局部动作机制；完整任务验收与持续运行仍未核实。',
  'equipment-or-route-scope-only':'仅有设备或工艺路线范围；没有完整动作机制。',
  'bounded-indexed-origin-mechanism':'原网址索引段有局部机制；直接原文访问受阻，不能当作完整原文核读。',
  'provisional-application-only':'仅有暂拟用途；配方和本场景适配尚未验证。',
  'adjacent-evidence-only-no-current-task-mechanism':'仅有相邻动作或场景资料；未建立本任务匹配机制。',
  'insufficient-matched-evidence-after-search':'首轮正反查询后没有匹配方案证据；不能据此判断不可行。',
}
const tierCounts = {'bounded-direct-or-partial-action-mechanism':64,'equipment-or-route-scope-only':20,'bounded-indexed-origin-mechanism':6,'provisional-application-only':1,'adjacent-evidence-only-no-current-task-mechanism':6,'insufficient-matched-evidence-after-search':99}
const supportLevelLabels:Record<string,string>={
  'bounded-action-mechanism-or-assistance':'有局部动作机制或辅助方案，完整验收仍待核实',
  'equipment-or-route-scope; not-complete-operating-mechanism':'仅有设备或工艺路线范围，缺完整动作机制',
  'adjacent-action-or-scenario; not-direct-match-to-whole-task':'仅有相邻动作或场景资料，未匹配完整任务',
  'bounded-mechanism-in-indexed-origin-passages; full-origin-access-not-obtained':'索引原文段落提供局部机制，完整原文尚未取得',
  'provisional-application; matched-general-mechanism-but-formulation-unverified':'用途暂拟；通用机制相关，具体配方尚未验证',
}
const definitionStatus = '已完成所列原文范围的首轮独立审校；仍缺现场 SOP、正式/现行版本核验与行业遗漏补齐。'
const scopeBoundary = '职业目录的场景背景、动作存在与 HJ 工艺单元分别限定；均不自动支持任务验收、实际部署或人工投入。'
const cashExitGap = '增量替换与退出边界待补：相对同一合法基线核旧设备处置、解约、切换并行、停用恢复与退出支出；与更新资本、部署或停机支出重叠的项目只计一次。'
const workingCapital = '先定义 WC_t 为方案相对同一基线的期末营运资金余额。期初扣 WC_0；后续扣 WC_t − WC_(t−1)，不是每期再扣全部余额。期末只释放实际可收回余额一次；若最后一期差额已包含释放，不再重复加 recovered_working_capital。全部余额与年份仍待采集。'
const currentRN02:Record<string,string> = {
  'cn-ind-oil-solvent-extract-001':'本轮已同步 extract 原文行 585、619—625；保留限定浸出机制，残油与完整验收仍缺。',
  'cn-ind-raw-milk-preparation-001':'本轮已限定为 2023 年光明乳业管路阀阵历史报道；具体工厂与地址待核，不能以该报道证明全部原奶验收与当前运行。',
  'cn-ind-dairy-cip-002':'本轮已限定管道 CIP 与行 15—16；不延伸为全部罐体、清洗验证或卫生放行，具体工厂地址与当前运行待核。',
  'cn-ind-beer-brewing-009':'本轮已同步实验室酵母镜检边界；生产现场接种全自动化仍缺。',
  'cn-ind-tobacco-filter-cigarette-002':'本轮已补 form-drive 成型纸、刀头与同步电驱锚；仅为 2017 年匿名供应商改造自报，完整成棒验收和当前运行仍缺。',
}
const stage = (level:string):Research['claims'][number]['deployment'] => /vendor/.test(level)?'vendor-report':/prototype/.test(level)?'laboratory':'unknown'
const sourceKind = (level:string):Research['sources'][number]['kind'] => /vendor|supplier/.test(level)?'vendor':/operator/.test(level)?'operator':/abstract|engineering|prototype/.test(level)?'paper':'other'
// These pinned source summaries combine a reported mechanism with our applicability
// or evidence boundary. Keep the whole sentence as a judgment, with its source.
const sourceScopeJudgments = new Set([
  'CN-FOOD-FDSP/option', 'CN-FOOD-BEER-YEAST/human',
  'CN-FOOD-BAIJIU-WUTONG/storage', 'CN-FOOD-JUICE-EASYREAL/conditions',
  'CN-FOOD-BLEND-TETRA/recover', 'CN-FOOD-TOBACCO-FILTER/maintenance',
  'CN-FOOD-TOBACCO-FILTER/interlock', 'CN-FOOD-TOBACCO-FOCUSIGHT/human',
])

function readAndVerify(files:Readonly<Record<string,string>>) {
  const all:Record<string,Raw>={},p=cnIndustryFoodFiles
  for (const [key,pin] of Object.entries(p)) {
    const text=files[pin.file]
    check(typeof text==='string' && createHash('sha256').update(text,'utf8').digest('hex')===pin.sha256,'实际文件 SHA 不匹配：'+pin.file)
    all[key]=JSON.parse(text)
  }
  const {inventory:i,main:m,audit:a,review:r,revisions:v,recheck:c,limitedRevisions:l,finalRecheck:f,authorValidation:z}=all
  for (const value of [i,m,a,r,c,f]) check(value.country==='CN' && (!value.industryId || value.industryId===industryId),'国家或行业绑定错误')
  check(m.inventorySource===p.inventory.file && m.inventorySha256===p.inventory.sha256 && a.inventorySha256===p.inventory.sha256 && r.input.inventorySha256===p.inventory.sha256 && r.input.inventoryFile===p.inventory.file,'清单绑定错误')
  check(m.independentReview.reviewReference.sha256===p.review.sha256 && m.independentReview.reviewReference.inputSha256===r.input.sha256 && v.reviewReference.sha256===p.review.sha256 && v.inputSha256===r.input.sha256 && r.input.file===p.main.file,'原独审输入链错误')
  check(v.outputSha256===l.inputSha256 && v.inputSearchAuditSha256===r.input.companionFiles.find((x:Raw)=>x.file===p.audit.file.split('/').at(-1))?.sha256 && v.outputSearchAuditSha256===p.audit.sha256,'原修订输出或查询链错误')
  check(c.input.path===p.main.file && c.input.sha256===v.outputSha256 && c.input.originalAuthorSha256===r.input.sha256 && c.input.originalIndependentDecisionsSha256===p.review.sha256 && c.input.revisionReceiptSha256===p.revisions.sha256 && c.input.searchAuditSha256===p.audit.sha256,'原限定复检绑定错误')
  check(l.outputSha256===p.main.sha256 && l.independentRecheckSha256===p.recheck.sha256 && l.previousRevisionReceiptSha256===p.revisions.sha256 && f.inputSha256===p.main.sha256 && f.previousInputSha256===l.inputSha256 && f.revisionReceiptSha256===p.limitedRevisions.sha256 && f.priorIndependentRecheckSha256===p.recheck.sha256,'RC01/02 修订复检绑定错误')
  for (const pin of [p.main,p.audit,p.limitedRevisions,p.recheck,p.authorValidation]) check(f.inputFiles.find((x:Raw)=>x.path===pin.file)?.sha256===pin.sha256,'最终复检文件绑定错误：'+pin.file)
  check(z.outputSha256===p.main.sha256 && z.searchAuditSha256===p.audit.sha256 && z.reviewDecisionSha256===p.review.sha256 && z.revisionReceiptSha256===p.limitedRevisions.sha256 && z.errors.length===0,'作者回执绑定错误')
  check(f.verdict==='RC01-and-RC02-resolved-with-existing-evidence-gaps' && f.canEnterUnfrozenWorkingVersion===true && f.remainingBlockingFindings.length===0 && Object.values(f.invariants).every(x=>x===true),'最终复检未通过')
  check(m.isFrozen===false && f.isFrozen===false && m.sourceTaskCount===196 && f.taskCount===196 && f.proposedSplitParentCount===35 && f.proposedChildrenCounted===0 && v.newQueryCount===0 && l.queryReruns===0,'冻结、任务或重检计数不符')
  check(same(m.statistics.evidenceSupportTierCounts,tierCounts) && same(f.tierCountsRecomputed,tierCounts) && m.statistics.tasksWithCompletedPositiveAndCounterexampleResearch===0,'六类证据边界变化')
  check(a.independentReview.reviewReference.sha256===p.review.sha256 && a.independentReview.mainQueryCountVerified===392 && a.independentReview.mainBatchCountVerified===98,'查询审校绑定错误')
  check(a.supplementalSearches.reduce((n:number,x:Raw)=>n+x.queries.length,0)===15,'补充查询数不符')
  return all
}

/** Import only the reviewed 196 existing candidates; no proposed child becomes a task. */
export function importCnIndustryFood(data:Research,files:Readonly<Record<string,string>>):Research {
  const {inventory,main,audit,review,recheck,finalRecheck}=readAndVerify(files),p=cnIndustryFoodFiles
  check(data.freezeStatus!=='frozen','不能向冻结版本追加工作稿')
  const originals=index(main.tasks,'id',196),decisions=index(review.taskDecisions,'taskId',196),checks=index(recheck.taskRechecks,'taskId',196),queries=index(audit.taskQueries,'id',392),pools=index(audit.resultPools,'id',98)
  const inventoryTasks=index(inventory.industries.find((i:Raw)=>i.id===industryId).scenarios.flatMap((s:Raw)=>s.tasks),'id')
  const canonical=new Map(data.tasks.map(t=>[t.id,t])),scenarios=index(main.scenarios,'id',27)
  for (const o of originals.values()) {
    const t=canonical.get(o.id),d=decisions.get(o.id),c=checks.get(o.id),prior=t?.dossier?.publicResearch as Raw|undefined
    check(t && t.country==='cn' && o.country==='CN' && t.industryId===industryId && o.industryId===industryId && t.scenarioId===o.scenarioId && scenarios.get(o.scenarioId)?.taskIds.includes(t.id),'父任务国家、行业或场景错误：'+o.id)
    check(same(o.originalTask,inventoryTasks.get(o.id)) && same(t.dossier?.originalTask,o.originalTask) && t.discovery?.inputSha256===p.inventory.sha256 && t.discovery.inventoryFile===p.inventory.file,'原任务快照或清单绑定变化：'+o.id)
    check(t.title===o.action && same(t.inputs,o.inputs) && same(t.outputs,o.outputs) && same(t.acceptance,strings(o.acceptance)) && t.phase===phases[o.phase] && t.boundary===o.executionConditions.scenarioScope && t.countingRole==='atomic-candidate','原任务定义变化：'+o.id)
    check(d && d.scenarioId===o.scenarioId && d.action===o.action && c?.originalTaskAndCoreFieldsPreserved===true && c.canFreeze===false && o.isFrozen===false && o.inventoryDisposition.proposedChildrenCounted===false && o.reviewResponse.canFreeze===false,'逐项裁决或冻结状态变化：'+o.id)
    check(!prior || (prior.provenance?.main?.sha256===p.main.sha256 && prior.provenance?.finalRecheck?.sha256===p.finalRecheck.sha256 && prior.canFreeze===false),'已有研究版本冲突：'+o.id)
    check(['not-started','in-progress'].includes(t.researchStatus) && t.manualInputs.every(v=>v.value===null) && noNumbers(o.humanInput) && noNumbers(o.cashFlow) && (!prior || noNumbers(prior.economics)),'人工或现金参数不再为空：'+o.id)
  }
  const next:Research={...data,sources:[...data.sources],claims:[...data.claims],searches:[...data.searches],tasks:[...data.tasks],industries:[...data.industries]}
  const sources=index(main.sources,'id',46),definitions=index(main.inventorySources,'id',6)
  for (const source of sources.values()) {
    check(date(source.retrievedAt) && source.locators.length && source.originalContentSha256,'来源日期、原文摘要或定位缺失')
    const dates:NonNullable<Research['sources'][number]['dates']>=[]
    if (date(source.onlinePublishedAt)) dates.push({kind:'displayed',value:source.onlinePublishedAt,note:'期刊网页发布日；与论文出版日期分列。元数据：'+source.metadataSourceUrl})
    append(next.sources,{id:id(source.id),country:'cn',title:source.title,publisher:source.publisher,url:source.url,published:date(source.publishedAt),retrieved:source.retrievedAt,dates,kind:sourceKind(source.evidenceType),sha256:source.originalContentSha256,evidencePeriod:source.evidencePeriod,evidenceLevel:source.evidenceType,readStatus:source.readStatus,limitations:strings([source.limitations,source.geography,source.locatorConvention,source.titleClaimBoundary,'来源与本国任务关联不证明中国具名现场采用；历史、厂商、原型、索引摘段与当前持续商用分别解释。'])})
    for (const locator of source.locators) {
      check(locator.id && locator.section && locator.claim,'原文声明缺定位')
      const isJudgment=sourceScopeJudgments.has(source.id+'/'+locator.id)
      append(next.claims,{id:claimId({sourceId:source.id,locatorId:locator.id}),country:'cn',kind:isJudgment?'judgment':'fact',text:(isJudgment?'来源范围判读：':'来源陈述：')+locator.claim,conditions:strings([source.evidencePeriod,source.geography,source.limitations,source.readStatus]),evidence:[{sourceId:id(source.id),locator:locator.section,...(locator.quote?{excerpt:locator.quote}:{})}],basedOn:[],status:'draft',deployment:stage(source.evidenceType),numericValue:null})
    }
  }
  for (const s of definitions.values()) {
    const original=inventory.sources.find((x:Raw)=>x.id===s.id),r=review.definitionSourceChecks.find((x:Raw)=>x.sourceId===s.id)
    check(original && r && s.independentReview.reviewReference.sha256===p.review.sha256,'定义来源独审缺失')
    const dates:NonNullable<Research['sources'][number]['dates']>=[]
    if (date(original.effectiveAt)) dates.push({kind:'effective',value:original.effectiveAt,note:'所引用历史版本实施日期；不据此认定全部条款当前效力。'})
    append(next.sources,{id:id(s.id),country:'cn',title:s.title,publisher:s.publisher,url:s.url,published:date(s.publishedAt),retrieved:main.researchedAt,dates,kind:s.id.includes('occ-')?'occupation':'standard',sha256:r.sha256,evidenceLevel:s.role,evidencePeriod:original.versionNote ?? s.title,readStatus:s.independentReview.status,limitations:strings([scopeBoundary,s.independentReview.boundary,original.versionNote,r.versionScope,'作者首轮状态：'+s.rereadStatus+'；独审只核所列定义范围。'])})
  }
  const refs=(rr:Raw[]):Task['workflowEvidence'] => rr.map(ref=>{
    const s=sources.get(ref.sourceId),l=s?.locators.find((x:Raw)=>x.id===ref.locatorId)
    check(s && l && ref.section,'机制引用缺来源/段落：'+ref.sourceId)
    return {sourceId:id(s.id),locator:unique([l.section,ref.section]).join(' · ')}
  })
  const definitionRefs=(rr:Raw[],display:(s:string)=>string):Task['workflowEvidence'] => rr.map(ref=>{
    const s=definitions.get(ref.sourceId)
    const original=inventory.sources.find((x:Raw)=>x.id===ref.sourceId)
    const scope=s && (typeof s.independentReview.readScope==='string'?s.independentReview.readScope:s.independentReview.readScope[ref.locatorId])
    check(s && scope && original?.locators.some((l:Raw)=>l.id===ref.locatorId) && ref.section===scope && ref.supportRole,'定义引用超出独审定位：'+ref.sourceId+'/'+ref.locatorId)
    return {sourceId:id(ref.sourceId),locator:strings([ref.section,ref.supportRole,ref.detail,ref.supportConclusion,scopeBoundary]).map(display).filter(Boolean).join(' · ')}
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
    const historicalNote=currentRN02[t.id]?disp.reviewNote:null
    const stripHistorical=(text:string) => historicalNote?text.replace('独立审校：'+historicalNote,'').replace(historicalNote,'').replace(/^\s*原限定范围：/,'').trim():text
    const overlap=main.sharedOperationMappings.filter((x:Raw)=>x.taskIds.includes(t.id))
    const boundaryNotes=unique([definitionStatus,scopeBoundary,...overlap.map((x:Raw)=>'待现场核验的共用边界：'+x.rule),...strings(currentRN02[t.id]),...ec.reviewedDefinitionSourceRefs.filter((r:Raw)=>r.supportRole==='occupation-scenario-context-not-direct-current-action').map((r:Raw)=>r.detail)])
    t.workflowEvidence=definitionRefs(ec.reviewedDefinitionSourceRefs.filter((r:Raw)=>r.supportRole==='process-unit-or-scenario-scope'),stripHistorical)
    t.occupationEvidence=definitionRefs(ec.reviewedDefinitionSourceRefs.filter((r:Raw)=>r.sourceId==='cn-occ-2022-draft'),stripHistorical)
    t.conditions=unique([t.boundary,ec.conditionsToVerify,stripHistorical(ec.acceptanceProvenance),...boundaryNotes])
    t.conclusionIds=[];t.counterevidenceIds=[];t.alternatives=[];t.barriers=[];t.searchIds=[]
    const deploymentEvidence:Raw[]=[],sourceBoundConditions:Raw[]=[]
    const attach=(rr:Raw[],scope:string) => {
      const evidence=refs(rr)
      for (const [i,ref] of rr.entries()) {
        const s=sources.get(ref.sourceId)!,l=s.locators.find((x:Raw)=>x.id===ref.locatorId)
        t.conclusionIds.push(claimId(ref))
        const bound={...evidence[i],level:s.evidenceType,scope:strings([l.claim,scope,s.limitations,s.evidencePeriod,s.geography,s.readStatus]).join('；'),currentOperationConfirmed:false,fullTaskAcceptanceVerified:false}
        sourceBoundConditions.push(bound);deploymentEvidence.push(bound)
      }
      return evidence
    }
    const conclusionEvidence=attach(o.conclusion.sourceRefs,stripHistorical(o.conclusion.supportBoundary))
    t.summary=[tiers[tier],stripHistorical(o.conclusion.text),...strings(currentRN02[t.id])].join(' ')
    t.conclusionIds.push(add(t,'conclusion',t.summary+' '+stripHistorical(o.conclusion.supportBoundary),conclusionEvidence,conclusionEvidence.length?'judgment':'hypothesis',t.conditions,o.conclusion.sourceRefs.map(claimId)))
    for (const [i,a] of (o.alternatives as Raw[]).entries()) {
      check(categories[a.kind],'替代类别未映射')
      const scope=unique(strings([a.mechanism,a.supportBoundary,a.reviewedApplicabilityNote,a.evidenceSupportLevel,a.supportLevel,a.evidencePeriod,a.countryScope,'完整任务验收与 2026 持续运行均未核实。']).map(x=>supportLevelLabels[x]??stripHistorical(x)).filter(Boolean)).join('；'), evidence=attach(a.sourceRefs,scope)
      const shared=a.sourceRefs.map(claimId),claim=add(t,'alternative-'+i,scope,evidence,evidence.length?'judgment':'hypothesis',t.conditions,shared,stage(a.deploymentStage))
      t.alternatives.push({category:categories[a.kind],description:scope,claimIds:unique([claim,...shared]),conditions:unique(strings([a.supportBoundary,a.reviewedApplicabilityNote,a.currentTaskDirectMechanism===true?'当前资料支持所限定动作的局部机制；完整验收仍待核实。':'当前资料不足以确认本任务的直接动作机制。',a.currentTaskMatched===true?'资料中存在与当前对象相关的条目；具体支持程度以证据层级为准。':'尚未核实来源条目与当前任务对象对应。',...boundaryNotes]).map(stripHistorical).filter(Boolean)),remainingLabor:[stripHistorical(o.residualHuman.unresolvedActions),o.residualHuman.observedHumanBoundary,o.residualHuman.cashTreatment]})
      t.conclusionIds.push(claim)
    }
    const categoryScreen=[['traditional-machine','传统机械'],['dedicated-machine','专机'],['robot','机器人'],['assistive-tool','辅助工具'],['digital-process','数字流程']] as const
    for (const [category,label] of categoryScreen) if (!t.alternatives.some(a=>a.category===category)) {
      const text=label+'：本轮未保留该类别匹配方案证据，仍为待验证路线；'+o.alternativeCategoryScreen.scopeNote
      const claim=add(t,'unmatched-'+category,text,[],'hypothesis',[o.alternativeCategoryScreen.classificationBoundary])
      t.alternatives.push({category,description:text,claimIds:[claim],conditions:[o.alternativeCategoryScreen.classificationBoundary],remainingLabor:['缺匹配配置、残留动作和现场工时，均不能推定为零。']})
      t.conclusionIds.push(claim)
    }
    for (const [type,b] of Object.entries(o.barriers) as [Task['barriers'][number]['type'],Raw][]) {
      const evidence=attach(b.sourceRefs,'仅支持对应原文局部范围，不把正向能力变成已证实采用障碍。')
      const claim=add(t,'barrier-'+type,stripHistorical(b.text)+'；本任务技术/经济/采用状态仍待现场验证。',evidence,'hypothesis',t.conditions,b.sourceRefs.map(claimId))
      t.barriers.push({type,scenario:t.boundary,claimIds:[claim]})
    }
    for (const [i,counter] of (o.counterEvidence.records as Raw[]).entries()) {
      const scope=strings([counter.type,counter.statement,counter.applicability,counter.notEvidenceOf,o.counterEvidence.interpretation]).join('；'),evidence=attach(counter.sourceRefs,scope)
      t.counterevidenceIds.push(add(t,'counter-'+i,scope,evidence,evidence.length?'judgment':'hypothesis',t.conditions,counter.sourceRefs.map(claimId)))
    }
    const humanRefs=[...o.residualHuman.sourceBackedRequirements,...o.residualHuman.observedHumanSourceRefs],humanEvidence=attach(humanRefs,o.residualHuman.observedHumanBoundary)
    t.conclusionIds.push(add(t,'remaining-human',stripHistorical(o.residualHuman.unresolvedActions)+'；'+o.residualHuman.observedHumanBoundary,humanEvidence,humanEvidence.length?'judgment':'hypothesis',t.conditions,humanRefs.map(claimId)))
    for (const [i,op] of (main.opportunities as Raw[]).filter(x=>x.taskIds.includes(t.id)).entries()) {
      check(op.country==='CN' && op.economicRank===null,'机会国家或回报值变化')
      const evidence=attach(op.sourceRefs,op.conditions)
      t.conclusionIds.push(add(t,'opportunity-'+i,op.title+'：'+op.whyInvestigate+'；成立条件：'+op.conditions+'；下一步：'+op.nextValidation,evidence,'judgment',[op.conditions],op.sourceRefs.map(claimId)))
    }
    check(o.searchAudit.queryIds.length===2 && same(d.queryChecks.map((q:Raw)=>q.id),o.searchAudit.queryIds),'逐项查询绑定错误')
    for (const qid of o.searchAudit.queryIds) {
      const q=queries.get(qid),rq=d.queryChecks.find((x:Raw)=>x.id===qid),pool=q && pools.get(q.resultPoolId)
      check(q && rq && pool && q.taskId===t.id && rq.actualUtcTimestamp===null && pool.queryIds.includes(q.id) && pool.taskIds.includes(t.id) && ['positive','negative'].includes(q.direction),'查询、父任务或 UTC 错误')
      for (const field of ['id','taskId','direction','query','executedAt','resultPoolId','executionStatus']) check(q[field]===rq[field],'独审查询字段不符：'+field)
      append(next.searches,{id:id(q.id),country:'cn',taskId:t.id,direction:q.direction==='positive'?'automation':'counterevidence',query:q.query,searchedOn:q.executedAt,results:[],outcome:'completed-candidates-unattributed',note:'实际主查询字段与结果为执行后同批保存；缺独立调用前记录及 UTC。'+pool.resultAttribution+'；候选不可按单条查询归因。补充 15 条仅按原批次保留，不重复分摊至任务。',audit:{file:p.audit.file,id:q.id,sha256:p.audit.sha256}})
      t.searchIds.push(id(q.id))
    }
    t.manualInputs=[{name:'本任务人工投入',value:null,unit:'合格任务单元与付薪工时待现场界定',evidence:[],gap:o.humanInput.note}]
    t.evidenceGaps=unique([...o.evidenceGaps.filter((x:string)=>x!=='库存流程与职业路径仍待独立复核及行业遗漏补齐。' && x!==historicalNote).map(stripHistorical),...boundaryNotes,cashExitGap,workingCapital,o.counterEvidence.interpretation,o.counterEvidence.queryScope,disp.decompositionSuggestion?('拟议拆分未批准、未增计任务：'+disp.decompositionSuggestion):'候选粒度仍待现场输出与验收核验。'])
    t.interviewQuestions=unique([...o.interviewQuestions.filter((x:string)=>!historicalNote || !x.includes(historicalNote)),...strings(currentRN02[t.id]).map(x=>'请核当前剩余边界：'+x),...overlap.map((x:Raw)=>'请核共用循环和执行者：'+x.rule)])
    t.researchStatus='in-progress';t.conclusionIds=unique(t.conclusionIds)
    t.evidenceAge=unique([...sources.values()].filter(s=>deploymentEvidence.some(x=>x.sourceId===id(s.id))).map(s=>s.evidencePeriod)).join('；') || '所列历史职业/工艺资料只支持限定定义；本任务没有保留匹配方案。'
    t.discovery!.supportStatus=disp.reviewedInventorySupport
    t.discovery!.sourceLimitations=unique([...t.discovery!.sourceLimitations,'食品独立审校：'+scopeBoundary,...ec.reviewedDefinitionSourceRefs.filter((r:Raw)=>r.supportRole==='occupation-scenario-context-not-direct-current-action').map((r:Raw)=>r.detail)])
    const model=main.cashFlowModels.find((m:Raw)=>m.id===o.cashFlow.modelId)
    check(model?.currency==='CNY' && noNumbers(model),'现金框架币种或参数变化')
    t.review={reviewer:'食品公开来源独审及 RC01/02 限定复检',date:main.researchedAt,notes:'指定修订通过，全部任务仍未冻结；完整正反检索、现场采用、正式版本及现金参数仍有缺口。'}
    t.dossier={...t.dossier,publicResearch:{country:'cn',batchId:stem,researchVersion:main.researchVersion,provenance:p,canFreeze:false,
      evidenceSupportTier:tier,evidenceSupportTierLabel:tiers[tier],sourceBoundConditions,deploymentEvidence,
      definitionReview:{note:[...boundaryNotes,...(historicalNote?['原审意见（历史留档）：'+historicalNote]:[disp.reviewNote])].join(' '),actionSupport:structuredClone(ec.reviewedDefinitionSourceRefs),children:disp.decompositionSuggestion?[disp.decompositionSuggestion]:[],proposedChildren:structuredClone(disp.proposedChildren),proposedChildrenCounted:false,originalPhase:o.phase,phaseSuggestion:disp.reviewedPhaseSuggestion,acceptanceStatus:ec.acceptanceStatus,granularityDisposition:disp.granularityDisposition},
      economics:{...structuredClone(o.cashFlow),model:structuredClone(model),currency:'CNY',workingCapitalDefinition:workingCapital,throughputBenefitConstraint:'只有已确认未满足需求、瓶颈解除和下游可用能力共同支持的可销售新增量，才可形成增量贡献；产能口号不等于收入。',comparisonScope:model.costBoundary+'；'+cashExitGap},
      originalHumanInput:structuredClone(o.humanInput),remainingHuman:{...structuredClone(o.residualHuman),unresolvedActions:stripHistorical(o.residualHuman.unresolvedActions)},alternativeCategoryScreen:structuredClone(o.alternativeCategoryScreen),negativeFinding:structuredClone(o.counterEvidence),successfulCounterexamples:structuredClone(o.successfulCounterexamples),overlapMappings:structuredClone(overlap),
      history:{label:'原作者与原审历史字段，不代表当前待补状态',conclusion:structuredClone(o.conclusion),evidenceGaps:structuredClone(o.evidenceGaps),reviewResponse:structuredClone(o.reviewResponse),inventoryDisposition:structuredClone(disp)},
      currentReviewStatus:'specified-corrections-verified-with-open-research-gaps',limitedRecheck:structuredClone(checks.get(t.id)),finalFieldRechecks:structuredClone(finalRecheck.taskRechecks.filter((x:Raw)=>x.taskId===t.id)),originalRequestUTC:null,queryRecordIds:[...o.searchAudit.queryIds],resultPoolIds:[...o.searchAudit.resultPoolIds],
      searchSummary:'本任务 2 条实际主查询按 4 查询合并池发现候选，结果不逐查询归因；执行后同批保存请求字段，未留独立预调用或 UTC 日志。全批另有 15 条较弱层级的补充请求转录，不分摊为本任务额外检索。正反研究仍未完成。'}}
    const prior=canonical.get(t.id)!.dossier?.publicResearch as Raw|undefined
    if (prior) check(same(canonical.get(t.id),t),'已导入任务有效定义或研究字段发生冲突：'+t.id+difference(canonical.get(t.id),t))
    updated.set(t.id,t)
  }
  next.tasks=next.tasks.map(t=>updated.get(t.id)??t)
  const catalogue={country:'cn',batchId:stem,provenance:p,taskIds:[...originals.keys()],taskCount:196,newTaskCount:0,proposedSplitParentCount:35,proposedChildrenCounted:0,canFreeze:false,
    evidenceSupportTierCounts:structuredClone(tierCounts),tasksOutsideDirectOrPartialMechanismTier:132,statisticsBoundary:'132 = 196 − 64，含 20 设备/路线、6 索引原文、1 暂拟用途、6 相邻证据、99 无匹配；不表示 132 项完全没有已读机制。旧字段和旧审提及的 133 不作为当前统计。',
    originalStatistics:structuredClone(main.statistics),scope:structuredClone(main.researchScope),scenarios:structuredClone(main.scenarios),remainingLimitations:[...main.researchPassLimitations,definitionStatus],sharedOperationMappings:structuredClone(main.sharedOperationMappings),opportunities:structuredClone(main.opportunities),
    queryAudit:{file:p.audit.file,sha256:p.audit.sha256,mainQueries:392,mainBatches:98,supplementalQueries:15,originalRequestUTC:null,mainProvenance:audit.independentReview.mainRequestProvenance,supplementalProvenance:audit.independentReview.supplementalRequestProvenance,resultPools:structuredClone(audit.resultPools),supplementalSearches:structuredClone(audit.supplementalSearches),boundary:audit.auditBoundary},
    displaySynchronization:{RN01:definitionStatus,RN02:currentRN02,RN03:'已使用 tasksOutsideDirectOrPartialMechanismTier 并逐层显示；旧统计字段保留为历史原始资料。'}}
  check(next.industries.some(i=>i.id===industryId && i.country==='cn'),'中国工业不存在')
  next.industries=next.industries.map(i=>{
    if (i.id!==industryId) return i
    check(!i.inventory?.foodResearch || same(i.inventory.foodResearch,catalogue),'行业补研目录冲突')
    return {...i,inventory:{...i.inventory,foodResearch:catalogue}}
  })
  return validateResearch(next)
}
