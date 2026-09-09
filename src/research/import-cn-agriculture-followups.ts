import {createHash} from 'node:crypto'
import {isDeepStrictEqual} from 'node:util'
import type {Research, Task} from './schema'
import {validateResearch} from './validate'

type Raw = Record<string, any>
const industryId = 'cn-agriculture'
const scopedPrefix = 'followup-cn-agriculture-'
const supplementPrefix = 'supplement-cn-agriculture-'
const phases: Record<string, Task['phase']> = {'准备':'preparation','作业':'operation','交接':'handoff','检测':'inspection','异常':'exception','返工':'rework','清洁维护':'maintenance','交付':'delivery'}

/** Reviewed byte revisions, not caller-supplied hashes. A new revision needs a new review. */
export const cnAgricultureFollowupFiles = Object.freeze({
  firstPass: {file:'research/automation/cn-agriculture.json', sha256:'29623933f780c5236243d63e142d40a825b47273ef46dfc721133c85e90cb5d3'},
  scoped: {file:'research/automation/cn-agriculture-scoped-followup.json', sha256:'7b5edcd935464edef49bd6c1e32612636fdc26b5462898852a4983dc71ea16f3'},
  scopedAudit: {file:'research/automation/cn-agriculture-scoped-followup-search-audit.json', sha256:'d73113e2ef246938d35310e10dcbf4e2a8328576ef2ccc56bb8c863175534e78'},
  scopedReview: {file:'research/reviews/cn-agriculture-scoped-followup-decisions.json', sha256:'1283feee7d4eaabf9da7b1a82a862a1ddf252e17230ef5e199cba2e65abfc0e9'},
  scopedRevisions: {file:'research/automation/cn-agriculture-scoped-followup-revisions.json', sha256:'345492dbf4d8b5e83831a27f11a99dde400e49af6a9a2dabbd37f318ed91f1ae'},
  scopedRecheck: {file:'research/reviews/cn-agriculture-scoped-followup-recheck.json', sha256:'1d45e6df6f594fe82d56ac3ee19a2b95c636f7d5c49ac1d47bb2f67c13e9ff49'},
  supplement: {file:'research/automation/cn-agriculture-supplement.json', sha256:'bb3755ce70b40f875ea1285b10dfcd0eb0b69b2f680ae1b981a82c40bdf71612'},
  supplementAudit: {file:'research/automation/cn-agriculture-supplement-search-audit.json', sha256:'8e8e7e6d9bb447ff8ae0ceef1058d4cd8a34c435cd05f007fbe4b91f1ae34beb'},
  supplementReview: {file:'research/reviews/cn-agriculture-supplement-decisions.json', sha256:'bcb750639891934ecb8710f1195ed68598f102da0ea37ab000bc005645c8df02'},
  supplementRevisions: {file:'research/automation/cn-agriculture-supplement-revisions.json', sha256:'7d46567b278da8bb3ec84ad2aa6fb4681d4c2cd5116eec743db1013c2346e62e'},
  supplementRecheck: {file:'research/reviews/cn-agriculture-supplement-recheck.json', sha256:'c5d2e38655e87189077861a92bded435040e038c248c8470131b0a416b3536cd'},
} as const)
for (const entry of Object.values(cnAgricultureFollowupFiles)) Object.freeze(entry)

const check: (condition: unknown, message: string) => asserts condition = (condition, message) => {
  if (!condition) throw new Error('农业追加导入：' + message)
}
// JSON serialization may reorder schema fields; compare values while preserving array order.
const jsonValue = (v:unknown):unknown => v === undefined ? undefined : JSON.parse(JSON.stringify(v))
const equal = (a:unknown,b:unknown) => isDeepStrictEqual(jsonValue(a),jsonValue(b))
const strings = (value: unknown): string[] => (Array.isArray(value) ? value : [value]).filter((x): x is string => typeof x === 'string' && !!x)
const date = (value: unknown) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null
const index = (rows: Raw[], key: string, count?: number): Map<string, Raw> => {
  const result = new Map(rows.map(row => [row[key], row]))
  check(result.size === rows.length && (count === undefined || result.size === count), '编号重复或条数不符：' + key)
  return result
}
const sid = (prefix: string, id: string) => prefix + id.toLowerCase()
const stage = (level: string): Research['claims'][number]['deployment'] => {
  if (/vendor|manufacturer/.test(level)) return 'vendor-report'
  if (/research-test/.test(level)) return 'pilot'
  if (/guidance|patent|occupation/.test(level)) return 'not-applicable'
  return 'unknown'
}
const kind = (level: string): Research['sources'][number]['kind'] => /occupation/.test(level) ? 'occupation' : /vendor|manufacturer/.test(level) ? 'vendor' : /research-test-abstract|research-framework/.test(level) ? 'paper' : 'other'
const append = <T extends {id: string}>(rows: T[], value: T) => {
  const old = rows.find(row => row.id === value.id)
  check(!old || equal(old, value), '已有追加记录发生冲突，拒绝覆盖：' + value.id)
  if (!old) rows.push(value)
}
const appendStrings = (old: string[], added: string[]) => [...new Set([...old, ...added])]
const noNumbers = (value: unknown): boolean => typeof value !== 'number' && (value === null || typeof value !== 'object' || Object.values(value).every(noNumbers))

function readInputs(files: Readonly<Record<string, string>>) {
  const result: Record<string, Raw> = {}
  for (const [key, pin] of Object.entries(cnAgricultureFollowupFiles)) {
    const bytes = files[pin.file]
    check(typeof bytes === 'string' && createHash('sha256').update(bytes, 'utf8').digest('hex') === pin.sha256, '实际文件 SHA 不匹配：' + pin.file)
    result[key] = JSON.parse(bytes)
  }
  return result
}

function verifyReviews(b: Record<string, Raw>) {
  const p = cnAgricultureFollowupFiles
  const {firstPass:f, scoped:s, scopedAudit:a, scopedReview:r, scopedRevisions:v, scopedRecheck:c, supplement:u, supplementAudit:ua, supplementReview:ur, supplementRevisions:uv, supplementRecheck:uc} = b
  for (const [key, value] of Object.entries(b)) check(value.country === 'CN' && (!value.industryId || value.industryId === industryId), '国家或行业不匹配：' + key)
  for (const value of [s,r,v,c,u,ur,uv,uc]) check(value.canFreeze === false, '补研与复检不得冻结任务')
  check(f.isFrozen === false && s.humanInput === null && noNumbers(s.economics) && s.economics.currency === 'CNY', '人工或现金参数发生变化')
  check(s.reviewedFirstPassFile === p.firstPass.file && s.reviewedFirstPassSHA256 === p.firstPass.sha256 && r.currentFirstPassSHA256 === p.firstPass.sha256, '首轮研究绑定不匹配')
  check(s.reviewFile === p.scopedReview.file && s.reviewSHA256 === p.scopedReview.sha256 && s.reviewedInputSHA256 === r.inputSHA256 && r.inputFile === p.scoped.file, '83 项原独审输入不匹配')
  check(v.inputSHA256 === r.inputSHA256 && v.outputSHA256 === p.scoped.sha256 && v.inputFile === p.scoped.file && v.reviewFile === p.scopedReview.file && v.reviewSHA256 === p.scopedReview.sha256, '83 项修订链不匹配')
  check([s.auditSHA256,r.searchAuditSHA256,v.auditSHA256,c.auditSHA256].every(x => x === p.scopedAudit.sha256) && [s.auditFile,r.searchAuditFile,v.auditFile].every(x => x === p.scopedAudit.file), '83 项审计绑定不匹配')
  check(c.inputFile === p.scoped.file && c.inputSHA256 === p.scoped.sha256 && c.revisionsSHA256 === p.scopedRevisions.sha256 && c.priorReviewFile === p.scopedReview.file && c.priorReviewSHA256 === p.scopedReview.sha256, '83 项限定复检输入不匹配')
  check(c.status === 'pass-limited-recheck-existing-research-gaps-open' && c.findings.length === 0 && c.checks.existingFirstPassMechanismsProtected === true && c.checks.newTaskCount === 0 && v.newTasksCounted === 0 && v.main164Modified === false, '83 项复检未通过或计数边界变更')
  check(a.inputFirstPassSHA256 === s.queryAuditBoundary.versionBoundary.auditSearchPlanningFirstPassSHA256 && s.queryAuditBoundary.versionBoundary.followupContextFirstPassSHA256 === p.firstPass.sha256, '83 项查询版本差异未保留')
  check(u.reviewFile === p.supplementReview.file && u.reviewSHA256 === p.supplementReview.sha256 && u.reviewedInputSHA256 === ur.input.sha256 && ur.input.file === p.supplement.file, '22 项原独审输入不匹配')
  check(uv.reviewFile === p.supplementReview.file && uv.reviewSHA256 === p.supplementReview.sha256 && uv.inputFiles.find((x:Raw) => x.path === p.supplement.file)?.sha256 === ur.input.sha256, '22 项修订原稿绑定不匹配')
  for (const pin of [p.supplement,p.supplementAudit]) check(uv.outputFiles.find((x:Raw) => x.path === pin.file)?.sha256 === pin.sha256, '22 项修订输出绑定不匹配')
  check(uv.inputFiles.find((x:Raw) => x.path === p.supplementAudit.file)?.sha256 === ur.input.auditSHA256, '22 项原审计绑定不匹配')
  for (const pin of [p.supplement,p.supplementAudit,p.supplementReview,p.supplementRevisions]) check(uc.inputs[pin.file] === pin.sha256, '22 项限定复检输入不匹配：' + pin.file)
  check(uc.originalReviewInputSHA256 === ur.input.sha256 && uc.status === 'specified-corrections-verified-research-and-archive-gaps-remain' && uv.newTasksCounted === 0 && uv.original164Modified === false && u.currentTaskCountChanged === false, '22 项复检状态或计数边界不匹配')
  check(u.coverage.newTasksCounted === 0 && u.coverage.approvedNewAtomicTaskCount === 0 && uc.counts.newTasksCounted === 0 && uc.counts.frozen === 0, '不得把补研条目直接计作任务')
  check(ua.independentVerification.reviewSHA256 === p.supplementReview.sha256 && ua.independentVerification.mainRequestIndependentlyVerified === false && ua.independentVerification.mainDateIndependentlyVerified === false && ua.independentVerification.supplementalExecutionUTCIndependentlyVerified === false && uc.queryAudit.reviewerReranQueries === false, '22 项查询时间或请求缺口被抹除')
}

function makeSource(source: Raw, prefix: string): Research['sources'][number] {
  check(source.countryScope === 'CN' && source.title && source.publisher && source.url && date(source.retrievedAt), '采用来源缺国家、元数据或读取日期')
  const level = source.evidenceLevel
  const dates: NonNullable<Research['sources'][number]['dates']> = []
  if (date(source.authoredAt)) dates.push({kind:'authored',value:source.authoredAt,note:source.authoredAtKind ?? '成文日期与网页发布日期分列。'})
  return {id:sid(prefix,source.id),country:'cn',title:source.title,publisher:source.publisher,url:source.url,published:date(source.publishedAt),retrieved:source.retrievedAt,
    kind:kind(level), dates, dateEvidence:source.dateLocator ? [{sourceId:sid(prefix,source.id),locator:source.dateLocator}] : [],
    evidenceLevel:level,evidencePeriod:source.evidencePeriod ?? source.scope,readStatus:source.readStatus,
    limitations:strings([source.reviewBoundary,source.supportBoundary,source.scope,source.reviewNote,source.deploymentBoundary,source.locatorConvention,source.hashScope,
      '仅按原文时间、对象与场景使用；没有新增完整任务持续商业运行证明。'])}
}

/**
 * Node-side, append-only adapter. Supply exact UTF-8 file texts under the manifest paths.
 * Returns a new validated Research object; failures never partially mutate the input.
 * Run after the 164-task main importer. This code and its tests are not a data review.
 */
export function importCnAgricultureFollowups(data: Research, files: Readonly<Record<string, string>>): Research {
  const b = readInputs(files)
  verifyReviews(b)
  const p = cnAgricultureFollowupFiles
  const {firstPass, scoped, scopedAudit, scopedReview, scopedRecheck, supplement, supplementAudit, supplementReview, supplementRecheck} = b
  check(data.freezeStatus !== 'frozen', '不能向冻结版本追加未冻结补研')
  const baseTasks = index(firstPass.tasks,'id',164)
  const tasks = new Map(data.tasks.map(t => [t.id,t]))
  check(data.tasks.filter(t => t.country === 'cn' && t.industryId === industryId).length === 164, '农业父任务集合已变化')
  for (const original of baseTasks.values()) {
    const t = tasks.get(original.id), research = t?.dossier?.publicResearch as Raw | undefined
    check(t && t.country === 'cn' && t.industryId === industryId && t.scenarioId === original.scenarioId, '父任务国家、行业或场景变化：' + original.id)
    check(t.title === original.title && equal(t.inputs,original.originalTask.inputs) && equal(t.outputs,original.originalTask.outputs) && equal(t.acceptance,strings(original.originalTask.acceptance)) && t.phase === phases[original.definitionReview.phaseReview.recommended] && t.boundary === t.dossier?.scope && equal(t.dossier?.originalTask,original.originalTask), '父任务定义变化：' + original.id)
    check(t.discovery?.inputSha256 === firstPass.inventorySha256 && research?.provenance?.file === p.firstPass.file && research.provenance.sha256 === p.firstPass.sha256 && equal(research.definitionReview,original.definitionReview), '父任务独审或首轮版本变化：' + original.id)
    check(t.researchStatus === 'in-progress' && research.canFreeze === false && t.manualInputs.every(x => x.value === null) && noNumbers(research.economics), '父任务研究/人工/现金状态已变化：' + original.id)
  }
  const industry = data.industries.find(i => i.id === industryId)
  check(industry?.country === 'cn', '缺少中国农业行业')
  const next = {...data,sources:[...data.sources],claims:[...data.claims],searches:[...data.searches],tasks:[...data.tasks],industries:[...data.industries]}
  const edited = new Map<string,Task>()
  const edit = (id: string) => {
    check(baseTasks.has(id), '关联的父任务不属于当前农业 164 项：' + id)
    if (!edited.has(id)) edited.set(id,structuredClone(tasks.get(id)!))
    return edited.get(id)!
  }
  const provenance = (keys: (keyof typeof p)[]) => Object.fromEntries(keys.map(key => [key,p[key]]))
  const docket = (t: Task): Raw => {
    t.dossier ??= {}
    t.dossier.agricultureFollowups ??= {}
    return t.dossier.agricultureFollowups as Raw
  }
  const setRecord = (target: Raw, key: string, value: unknown) => {
    check(target[key] === undefined || equal(target[key],value), '已有补研 dossier 冲突：' + key)
    target[key] = value
  }
  const sourceMap = index(scoped.sources,'id',23)
  const claimMap = index(scoped.claims,'id',18)
  const reviewedClaims = index(scopedReview.claimDecisions,'claimId',18)
  const checkedClaims = index(scopedRecheck.claimChecks,'claimId',18)
  const retainedSourceIds = new Set(scoped.claims.map((c:Raw) => c.sourceId))
  check(retainedSourceIds.size === 12, '采用来源应为 12 份；读取失败与排除候选不能当证据')
  for (const id of retainedSourceIds) append(next.sources,makeSource(sourceMap.get(id as string)!,scopedPrefix))
  for (const c of claimMap.values()) {
    const reviewed = reviewedClaims.get(c.id), checked = checkedClaims.get(c.id)
    // The original review explicitly requested this L144 sentence; the limited recheck
    // approved the resulting expanded statement, rather than the shorter review field.
    const statementMatches = reviewed && (c.statement === reviewed.reviewedStatement || (c.id === 'CN-AG-REVIEW-SOURCE-35-01-fish-repeat' && c.statement === reviewed.reviewedStatement + ' 专利另提示规格差异较小时反复分级可能造成机械损伤且耗费人工。' && reviewed.requiredChanges.some((x:string) => x.includes('L144'))))
    check(reviewed && checked && equal(c.taskIds,reviewed.inputTaskIds) && statementMatches && c.classification === reviewed.classification && c.locator === checked.locator && c.classification === checked.classification && c.isConfirmedFullTaskAutomation === false && c.isConfirmedCommercialOperation === false, '局部声明与独审/复检不一致：' + c.id)
    c.taskIds.forEach((id:string) => check(baseTasks.has(id), '声明跨入另一国家或新增任务：' + id))
    append(next.claims,{id:sid(scopedPrefix,c.id),country:'cn',kind:'judgment',text:c.statement,
      conditions:[c.boundary,'关联场景：'+c.taskIds.map((id:string) => baseTasks.get(id)!.title).join('；'),'局部或相邻证据；不证明整个任务持续商业运行。'],
      evidence:[{sourceId:sid(scopedPrefix,c.sourceId),locator:c.locator}],basedOn:[],status:'draft',deployment:stage(sourceMap.get(c.sourceId)!.evidenceLevel),numericValue:null})
  }
  const queries = index(scopedAudit.queries,'id',166)
  const batches = new Map(scopedAudit.batches.map((batch:Raw) => [batch.id,batch])) as Map<number,Raw>
  const outcomes = index(scoped.taskOutcomes,'taskId',83)
  const taskDecisions = index(scopedReview.taskDecisions,'taskId',83)
  const taskChecks = index(scopedRecheck.taskChecks,'taskId',83)
  const additional = index(scoped.additionalExistingTaskDecisions,'taskId',3)
  check(equal(scoped.additionalExistingTaskDecisions,scopedReview.additionalExistingTaskDecisions), '额外关联与原独审不一致')
  check([...queries.values()].every(q => outcomes.has(q.taskId)), '查询被分配至额外关联或未查询的任务')
  const attachClaims = (t:Task, ids:string[]) => {
    for (const id of ids) {
      const claim = claimMap.get(id)
      check(claim && claim.taskIds.includes(t.id), '局部证据误挂父任务')
      const canonicalId = sid(scopedPrefix,id)
      t.conclusionIds = appendStrings(t.conclusionIds,[canonicalId])
      if (!claim.classification.startsWith('adjacent-') && !claim.evidenceRole) {
        const alternative: Task['alternatives'][number] = {category:claim.classification === 'manual-assistive-tool-patent' ? 'assistive-tool' : 'unclassified',description:claim.statement,claimIds:[canonicalId],conditions:[claim.boundary,'只追加审定的局部机制；设备类别未明确时保留未分类。'],remainingLabor:[claim.boundary,'全工序残留人工和现金节支尚未测得。']}
        const old = t.alternatives.find(a => a.claimIds.includes(canonicalId))
        check(!old || equal(old,alternative), '已有追加方案发生冲突：' + canonicalId)
        if (!old) t.alternatives.push(alternative)
      }
      if (claim.evidenceRole) t.counterevidenceIds = appendStrings(t.counterevidenceIds,[canonicalId])
      t.interviewQuestions = appendStrings(t.interviewQuestions,(claim.verificationQuestions ?? []).map((q:Raw) => q.question))
    }
  }
  for (const outcome of outcomes.values()) {
    const d = taskDecisions.get(outcome.taskId), c = taskChecks.get(outcome.taskId), t = edit(outcome.taskId)
    check(d && c && equal(d.queryIds,outcome.queryIds) && equal(c.claimIds,outcome.claimIds) && c.status === outcome.status && c.oldMechanismsMustBePreserved === true && outcome.integrationRule === 'append-reviewed-evidence-only-preserve-existing-research' && outcome.canFreeze === false, '83 项归属或保留旧机制规则改变')
    const pair = outcome.queryIds.map((id:string) => queries.get(id)) as Raw[]
    check(pair.length === 2 && ['positive','negative'].every(dir => pair.filter(q => q?.direction === dir).length === 1), '缺少原任务正反查询对')
    for (const q of pair) {
      const batch = batches.get(q.batchId)
      check(q.taskId === t.id && q.country === 'CN' && q.executionStatus === 'executed' && date(q.executedAt) && batch?.queryIds.includes(q.id) && q.rawBatchSHA256 === batch.rawBatchSHA256, '实际查询或批次绑定不匹配')
      const id = sid(scopedPrefix,q.id)
      append(next.searches,{id,country:'cn',taskId:t.id,direction:q.direction === 'positive' ? 'automation' : 'counterevidence',query:q.query,searchedOn:q.executedAt,results:[],outcome:'completed-candidates-unattributed',
        note:'本任务定向补检实际执行；4 条查询共用回包，末批 2 条。候选只归于批次，不能当作逐条正/反查询结果。原始 UTC 与批次散列见追加 dossier。无新增机制不覆盖原证据。',audit:{file:p.scopedAudit.file,id:q.id,sha256:p.scopedAudit.sha256}})
      t.searchIds = appendStrings(t.searchIds,[id])
    }
    attachClaims(t,outcome.claimIds)
    setRecord(docket(t),'scoped',{outcome:structuredClone(outcome),claimIds:outcome.claimIds.map((id:string) => sid(scopedPrefix,id)),claims:outcome.claimIds.map((id:string) => structuredClone(claimMap.get(id))),queries:structuredClone(pair),queryAuditBoundary:scoped.queryAuditBoundary,provenance:provenance(['scoped','scopedAudit','scopedReview','scopedRevisions','scopedRecheck']),canFreeze:false,newTasksCounted:0})
  }
  for (const link of additional.values()) {
    check(!outcomes.has(link.taskId) && link.countAsQueriedTask === false && link.countAsNewTask === false, '额外关联不得成为查询或新任务')
    const t = edit(link.taskId)
    attachClaims(t,link.claimIds)
    setRecord(docket(t),'scopedAdditional',{...structuredClone(link),canonicalClaimIds:link.claimIds.map((id:string) => sid(scopedPrefix,id)),claims:link.claimIds.map((id:string) => structuredClone(claimMap.get(id))),queries:[],provenance:provenance(['scoped','scopedReview','scopedRecheck']),canFreeze:false})
  }
  const supplementSources = index(supplement.sources,'id',12)
  const supplementClaims = new Map<string,Raw>()
  for (const source of supplementSources.values()) {
    append(next.sources,makeSource(source,supplementPrefix))
    for (const claim of source.claims) {
      check(claim.locator && claim.statement && !supplementClaims.has(claim.id), '补研声明缺定位或编号重复')
      supplementClaims.set(claim.id,{...claim,sourceId:source.id})
      append(next.claims,{id:sid(supplementPrefix,claim.id),country:'cn',kind:'fact',text:claim.statement,conditions:[source.scope,source.deploymentBoundary,'补研范围未批准为新任务；来源功能不代表旧父任务全部验收。'],evidence:[{sourceId:sid(supplementPrefix,source.id),locator:claim.locator}],basedOn:[],status:'draft',deployment:stage(source.evidenceLevel),numericValue:null})
    }
  }
  check(supplementClaims.size === 12, '补研来源声明数不符')
  const references = (refs:Raw[]) => refs.map(ref => {
    check(supplementSources.has(ref.sourceId) && ref.locator && (!ref.claimId || supplementClaims.get(ref.claimId)?.sourceId === ref.sourceId), '补研动作或声明来源不存在')
    return {...ref,sourceId:sid(supplementPrefix,ref.sourceId),...(ref.claimId ? {claimId:sid(supplementPrefix,ref.claimId)} : {})}
  })
  const items = index(supplement.items,'id',22), itemReview = index(supplementReview.decisions,'workItemId',22), itemCheck = index(supplementRecheck.decisions,'workItemId',22)
  const itemQueries = index(supplementAudit.searches,'taskId',22)
  const itemRecords: Raw[] = []
  for (const item of items.values()) {
    const d = itemReview.get(item.id), c = itemCheck.get(item.id), q = itemQueries.get(item.id)
    check(item.country === 'CN' && item.industryId === industryId && data.scenarios.some(s => s.id === item.scenarioId && s.country === 'cn' && s.industryId === industryId), '补研场景/国家不匹配')
    check(d && c && q && equal(item.originalOverlap,d.originalOverlap) && equal(item.overlap,item.originalOverlap) && item.definitionReview.approvedNewAtomicTaskCount === 0 && c.newTasksCounted === 0 && c.canFreeze === false && item.canFreeze === false, '补研重叠或计数边界改变')
    check(noNumbers(item.humanInput) && noNumbers(item.economics) && item.economics.currency === 'CNY' && item.queryAuditStatus.mainRequestIndependentlyVerified === false && item.queryAuditStatus.mainDateIndependentlyVerified === false, '補研现金或查询证据被升级')
    check(q.status === 'executed' && q.id === d.queryAuditId && item.searchIds.includes(q.id) && q.positiveQuery && q.negativeQuery, '补研查询缺失')
    const record = {id:item.id,record:structuredClone(item),definitionEvidence:references(item.definitionRefs),claimEvidence:references(item.claimRefs),queryRecord:structuredClone(q),
      queryAuditStatus:supplementAudit.independentVerification,originalRequestUTC:null,parentTaskIds:[...item.overlap.originalTaskIds],
      canonicalTaskCreated:false,canonicalSearchCreated:false,researchedTaskCountContribution:0,canFreeze:false}
    itemRecords.push(record)
    for (const id of item.overlap.originalTaskIds) {
      const t = edit(id)
      check(t.scenarioId === item.scenarioId, '补研误挂其他场景父任务')
      const doc = docket(t)
      doc.supplementItems ??= {}
      setRecord(doc.supplementItems,item.id,{...record,linkRole:'pending-overlap-or-definition-extension-not-inherited-task-research'})
    }
  }
  const patches: Raw[] = []
  for (const patch of supplement.mechanismCorrections) {
    const reviewed = supplementReview.mechanismCorrectionDecisions.find((d:Raw) => d.patchId === patch.id)
    check(reviewed && reviewed.status === patch.independentReviewStatus && reviewed.newTasksCounted === 0 && patch.countedAsNewTask === false, '流程机制补充没有对应裁决')
    const record = {...structuredClone(patch),references:references(patch.sourceRefs ?? []),alternatives:(patch.proposedAlternatives ?? []).map((a:Raw) => ({...a,sourceRefs:references(a.sourceRefs)})),canFreeze:false,newTasksCounted:0}
    patches.push(record)
    for (const id of patch.originalTaskIds) {
      const t = edit(id), doc = docket(t)
      doc.supplementPatches ??= {}
      setRecord(doc.supplementPatches,patch.id,record)
      // The water/air-humidity clarification has no proposed alternative and transfers no mechanism.
      for (const alternative of record.alternatives) {
        const claimIds = alternative.sourceRefs.map((r:Raw) => r.claimId)
        check(claimIds.every(Boolean), '流程补充缺声明编号')
        const entry: Task['alternatives'][number] = {category:alternative.type === '传统机械' ? 'traditional-machine' : 'assistive-tool',description:alternative.mechanism,claimIds,conditions:[patch.conditions,'历史指导的局部机械/工具，不等于商业绩效或全部验收。'],remainingLabor:[patch.residualGap]}
        const old = t.alternatives.find(a => equal(a.claimIds,claimIds))
        check(!old || equal(old,entry), '已有流程补充方案发生冲突：' + patch.id)
        if (!old) t.alternatives.push(entry)
        t.conclusionIds = appendStrings(t.conclusionIds,claimIds)
      }
    }
  }
  const catalogue = {
    provenance:provenance(Object.keys(p) as (keyof typeof p)[]),canFreeze:false,newTasksCounted:0,researchedTaskCountContribution:0,
    scoped:{counts:scoped.counts,sourceSelection:scoped.sourceSelection,sourceDecisions:scopedReview.sourceDecisions,unadoptedCandidates:scoped.sources.filter((s:Raw) => !retainedSourceIds.has(s.id)),queryAuditBoundary:scoped.queryAuditBoundary,batches:scopedAudit.batches,additionalExistingTaskLinks:scoped.additionalExistingTaskDecisions,economics:scoped.economics},
    supplement:{items:itemRecords,patches,coverage:supplement.coverage,method:supplement.method,exclusions:supplement.exclusions,queryAudit:supplementAudit,
      queryPolicy:'22 对查询及 6 条补充查询仅属于补研条目/批次；不重挂父任务为其实际检索，不新增 canonical 查询或任务。主查询原请求与执行日缺独立记录，UTC 不补造。',
      nextStep:'先确认新增范围、职业动作支持、执行者和去重替换关系，再批准 canonical 定义并重新核定任务级研究范围；拟议子项不继承父任务完成状态。'}
  }
  const updatedIndustry = structuredClone(industry)
  updatedIndustry.inventory ??= {}
  setRecord(updatedIndustry.inventory,'agricultureFollowups',catalogue)
  next.industries = next.industries.map(i => i.id === industryId ? updatedIndustry : i)
  next.tasks = next.tasks.map(t => edited.get(t.id) ?? t)
  return validateResearch(next)
}
