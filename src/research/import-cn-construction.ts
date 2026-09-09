import {createHash} from 'node:crypto'
import {isDeepStrictEqual} from 'node:util'
import type {Research, Task} from './schema'
import {validateResearch} from './validate'

type Raw = Record<string, any>
const mainPrefix = 'automation-cn-construction-'
const baselinePrefix = 'baseline-cn-construction-'
const industryId = 'cn-construction'
const phases: Record<string,Task['phase']> = {'准备':'preparation','作业':'operation','交接':'handoff','检测':'inspection','异常':'exception','返工':'rework','清洁维护':'maintenance','交付':'delivery'}
const categories: Record<string,Task['alternatives'][number]['category']> = {'传统机械':'traditional-machine','专机':'dedicated-machine','机器人':'robot','辅助工具':'assistive-tool','数字流程':'digital-process'}

export const cnConstructionFiles = Object.freeze({
  inventory:{file:'research/inventories/cn-core.json',sha256:'5388db09742709d606032d030ced3985f802a6e221441b59cd1302064ee8983e'},
  main:{file:'research/automation/cn-construction.json',sha256:'e856822bd76919665d6f9d1496bad2b8c15b92751fab25ebbd957e907c6f353c'},
  audit:{file:'research/automation/cn-construction-search-audit.json',sha256:'d7cb04f16e603b31b4921b1a2ea9a7e9d37c2454ce7c07545daf41c897e4419d'},
  review:{file:'research/reviews/cn-construction-automation-decisions.json',sha256:'63b1904d233b0073af28bf6ec04a79ead7860fa1a98991115dba8e1fa9b77c6c'},
  revisions:{file:'research/automation/cn-construction-revisions.json',sha256:'737bbcb7aa8eb15eb5f02bbabbfd4844b77a5e554cbb0d83baf43a3d35640334'},
  recheck:{file:'research/reviews/cn-construction-automation-recheck.json',sha256:'6631da1ebfbd1c5954257b7bb12d33904c003be5ab996d2dee2883563e4aa3bc'},
  baseline:{file:'research/automation/cn-construction-baseline-followup.json',sha256:'9a40ec457e0db33edf5080ee22c51096c7f77d2f7ca90153a8e1ccb4ecb860ea'},
  baselineAudit:{file:'research/automation/cn-construction-baseline-followup-audit.json',sha256:'a791dc60afadb2dca2293fca31c00656cfd68cb8694d0680baf2698d1ef5ea50'},
  baselineReview:{file:'research/reviews/cn-construction-baseline-followup-decisions.json',sha256:'ddab228a05226541df99ee286dec78e763c3657bc209bead72a290c99a714703'},
  baselineRevisions:{file:'research/automation/cn-construction-baseline-followup-revisions.json',sha256:'524984fec6fe24be4e721dbd6b8934e2719bc440575dc9ed1a45a9fe7ee41fd1'},
  baselineRecheck:{file:'research/reviews/cn-construction-baseline-followup-recheck.json',sha256:'9c2edbb57a55f53515f30d253f97740ad1599d4e9ebf618216aa3c0eecefead5'},
} as const)
for (const pin of Object.values(cnConstructionFiles)) Object.freeze(pin)

const check: (condition:unknown,message:string) => asserts condition = (condition,message) => {if (!condition) throw new Error('建筑导入：'+message)}
// JSON serialization may reorder schema fields; compare values while preserving array order.
const jsonValue = (v:unknown):unknown => v === undefined ? undefined : JSON.parse(JSON.stringify(v))
const same = (a:unknown,b:unknown) => isDeepStrictEqual(jsonValue(a),jsonValue(b))
const strings = (v:unknown): string[] => (Array.isArray(v)?v:[v]).filter((x): x is string => typeof x === 'string' && !!x)
const unique = (v:string[]) => [...new Set(v)]
const date = (v:unknown) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null
const partialDate = (v:unknown) => typeof v === 'string' && /^\d{4}(?:-\d{2}(?:-\d{2})?)?$/.test(v) ? v : null
const noNumbers = (v:unknown):boolean => typeof v !== 'number' && (v === null || typeof v !== 'object' || Object.values(v).every(noNumbers))
const id = (prefix:string,value:string) => prefix+value.toLowerCase()
const index = (rows:Raw[],key:string,count?:number) => {
  const result = new Map<string,Raw>(rows.map(row => [row[key],row]))
  check(result.size === rows.length && (count === undefined || result.size === count),'编号重复或条数不符：'+key)
  return result
}
const append = <T extends {id:string}>(rows:T[],entry:T) => {
  const old = rows.find(row => row.id === entry.id)
  check(!old || same(old,entry),'已有研究记录冲突，拒绝覆盖：'+entry.id)
  if (!old) rows.push(entry)
}
const stage = (level:string):Research['claims'][number]['deployment'] => /patent|standard|workflow|notice|catalogue|manual|procedure|guidance/.test(level) ? 'not-applicable' : /vendor|manufacturer/.test(level) ? 'vendor-report' : 'unknown'
const sourceKind = (level:string):Research['sources'][number]['kind'] => /occupation/.test(level) ? 'occupation' : /vendor|manufacturer/.test(level) ? 'vendor' : /^operator/.test(level) ? 'operator' : /official-field-research/.test(level) ? 'official-investigation' : /standard|notice|catalogue/.test(level) ? 'standard' : 'other'
const cashExitGap = '增量替换与退出成本待补：核同一合法基线下旧设备处置、解约、转场、过渡并行、停用及恢复费用；未证实的节省或回收保持空值，已计入其他现金项的支出不重复扣。'

function readAndVerify(files:Readonly<Record<string,string>>) {
  const all:Record<string,Raw> = {}
  const p = cnConstructionFiles
  for (const [key,pin] of Object.entries(p)) {
    const text = files[pin.file]
    check(typeof text === 'string' && createHash('sha256').update(text,'utf8').digest('hex') === pin.sha256,'实际文件 SHA 不匹配：'+pin.file)
    all[key] = JSON.parse(text)
  }
  const {inventory:i,main:m,audit:a,review:r,revisions:v,recheck:c,baseline:g,baselineAudit:ga,baselineReview:gr,baselineRevisions:gv,baselineRecheck:gc} = all
  for (const [key,value] of Object.entries(all)) if (key !== 'review') check(value.country === 'CN' && (!value.industryId || value.industryId === industryId),'国家或行业不匹配：'+key)
  check(m.isFrozen === false && g.isFrozen === false && [r,v,c,gr,gv,gc].every(x => x.canFreeze === false),'研究或复检不允许冻结')
  check(m.inventorySource === p.inventory.file && m.inventorySha256 === p.inventory.sha256 && a.inventorySha256 === p.inventory.sha256 && i.country === 'CN','原清单绑定不匹配')
  check(m.reviewedInputSha256 === r.inputSha256 && m.sourceReviewFile === p.review.file && m.independentReviewSha256 === p.review.sha256 && v.reviewFile === p.review.file && v.reviewSHA256 === p.review.sha256,'主稿独审绑定不匹配')
  check(v.inputFiles.find((x:Raw) => x.path === p.main.file)?.sha256 === r.inputSha256 && r.inputFiles.find((x:Raw) => x.path === p.main.file)?.sha256 === r.inputSha256,'主稿原独审输入不匹配')
  check(v.inputFiles.find((x:Raw) => x.path === p.audit.file)?.sha256 === r.inputFiles.find((x:Raw) => x.path === p.audit.file)?.sha256,'主稿原审计链不匹配')
  for (const pin of [p.main,p.audit]) check(v.outputFiles.find((x:Raw) => x.path === pin.file)?.sha256 === pin.sha256,'主稿修订输出不匹配')
  check(c.inputFile === p.main.file && c.inputSHA256 === p.main.sha256 && c.auditFile === p.audit.file && c.auditSHA256 === p.audit.sha256 && c.independentReviewFile === p.review.file && c.independentReviewSHA256 === p.review.sha256 && c.authorRevisionReceipt === p.revisions.file && c.authorRevisionReceiptSHA256 === p.revisions.sha256,'主稿限定复检链不匹配')
  check(c.verdict === 'specified-corrections-verified-research-and-archive-gaps-remain' && c.counts.tasks === 207 && c.counts.approvedNewTasks === 0 && c.counts.frozenTasks === 0,'主稿复检状态不匹配')
  check(a.independentVerification.reviewSHA256 === p.review.sha256 && a.independentVerification.originalRequestArgumentsIndependentlyVerified === false && a.independentVerification.executedDatesIndependentlyVerified === false,'主查询请求或日期缺口被抹除')
  check(g.input.file === p.main.file && g.input.sha256 === p.main.sha256 && g.input.reviewSha256 === p.review.sha256 && ga.inputSha256 === p.main.sha256 && ga.dataSha256 === p.baseline.sha256,'G02 主稿绑定不匹配')
  check(g.independentReviewFile === p.baselineReview.file && g.independentReviewSha256 === p.baselineReview.sha256 && g.reviewedInputSha256 === gr.inputs[p.baseline.file] && gv.reviewSha256 === p.baselineReview.sha256,'G02 原独审不匹配')
  for (const pin of [p.baseline,p.baselineAudit]) {
    const basename = pin.file.split('/').at(-1)!
    check(gv.input[basename] === gr.inputs[pin.file] && gv.output[basename] === pin.sha256,'G02 修订链不匹配：'+basename)
  }
  check(ga.reviewedInputSha256 === gr.inputs[p.baselineAudit.file] && ga.independentReviewSha256 === p.baselineReview.sha256,'G02 审计修订绑定不匹配')
  check(gc.inputFile === p.baseline.file && gc.inputSha256 === p.baseline.sha256 && gc.auditFile === p.baselineAudit.file && gc.auditSha256 === p.baselineAudit.sha256 && gc.reviewFile === p.baselineReview.file && gc.reviewSha256 === p.baselineReview.sha256 && gc.revisionFile === p.baselineRevisions.file && gc.revisionSha256 === p.baselineRevisions.sha256 && gc.reviewedOriginalSha256 === g.reviewedInputSha256,'G02 限定复检绑定不匹配')
  check(gc.status === 'specified-corrections-verified-with-open-research-gaps' && gc.invariants.all38MatchMain207Definitions === true && gc.invariants.original69QueryPayloadsDatesAndReturnsUnchanged === true && gc.counts.newTasks === 0 && gc.counts.frozenTasks === 0,'G02 复检或计数状态不匹配')
  return all
}

function sourceRecord(source:Raw,prefix:string,level:string,scope:string):Research['sources'][number] {
  const dates:NonNullable<Research['sources'][number]['dates']> = []
  const manualEdition = source.publishedAtKind === 'manual-footer-edition-date'
  for (const [value,kind,note] of [
    [source.effectiveAt,'effective','该版本实施日期；未据此认定全国当前效力。'],
    [source.documentDate,'authored','文件成文日期与公开日期分列。'],
    [source.documentMonth,'authored','按正文落款原精度记录。'],
    [source.webPublishedAt,'displayed','网页显示日期，不等于历史正文修订日期。'],
    [source.revisionMonth,'document-version',source.dateNote],
    [manualEdition ? source.publishedAt : null,'document-version',source.publishedAtBasis],
  ] as const) if (partialDate(value)) dates.push({kind,value:value as string,note:note ?? '保留来源原日期精度。'})
  const published = manualEdition ? null : date(source.publishedAt)
  check(source.title && source.publisher && source.url && date(source.retrievedAt),'来源元数据缺失')
  return {id:id(prefix,source.id),country:'cn',title:source.title,publisher:source.publisher,url:source.url,published,retrieved:source.retrievedAt,dates,
    kind:sourceKind(level),evidenceLevel:level,evidencePeriod:scope,readStatus:source.readStatus ?? 'selected-original-passages-independently-reviewed',
    limitations:strings([scope,source.reviewedScopeNote,source.deploymentCountryBasis,source.accessNote,source.dateNote,source.versionNote,source.locatorConvention,
      manualEdition ? '说明书页脚版次日期不是网页发布日期。' : null,'原文版本、局部功能和厂商自报不等于本任务当前持续商用。'])}
}

/** Node-side importer; exact input texts are verified before a new Research object is built. */
export function importCnConstruction(data:Research,files:Readonly<Record<string,string>>):Research {
  const b = readAndVerify(files), p = cnConstructionFiles
  const {inventory,main,audit,review,recheck,baseline,baselineAudit,baselineReview} = b
  check(data.freezeStatus !== 'frozen','不能向冻结版本导入未冻结研究')
  const inventoryIndustry = inventory.industries.find((x:Raw) => x.id === industryId)
  const inventoryTasks = index(inventoryIndustry.scenarios.flatMap((s:Raw) => s.tasks),'id',207)
  const originals = index(main.tasks,'id',207), decisions = index(review.taskDecisions,'taskId',207), checks = index(recheck.taskChecks,'taskId',207), queries = index(audit.searches,'taskId',207)
  const canonical = new Map(data.tasks.map(t => [t.id,t]))
  check(data.tasks.filter(t => t.industryId === industryId).length === 207,'建筑父任务集合已变化')
  for (const original of originals.values()) {
    const t = canonical.get(original.id), d = original.reviewedDefinition, prior = t?.dossier?.publicResearch as Raw | undefined
    check(t && t.country === 'cn' && original.country === 'CN' && t.industryId === industryId && original.industryId === industryId && t.scenarioId === original.scenarioId,'任务国家、行业或场景变化：'+original.id)
    check(same(original.originalTask,inventoryTasks.get(original.id)) && same(t.dossier?.originalTask,original.originalTask) && t.discovery?.inputSha256 === p.inventory.sha256 && t.discovery.inventoryFile === p.inventory.file,'原 207 快照或清单绑定变化：'+original.id)
    const definition = prior ? d : original.originalTask
    check(t.title === (prior ? d.title : original.originalTask.action) && same(t.inputs,definition.inputs) && same(t.outputs,definition.outputs) && same(t.acceptance,strings(definition.acceptance)) && t.phase === phases[original.definitionReview.phaseReview.recommended] && t.boundary === original.executionConditions.scope,'当前定义发生未经绑定的变化：'+original.id)
    check(!prior || (prior.provenance?.main?.sha256 === p.main.sha256 && prior.provenance?.baseline?.sha256 === p.baseline.sha256 && same(prior.reviewedDefinition,d) && prior.canFreeze === false),'已有建筑研究版本不匹配')
    if (prior) for (const [field,role] of [['workflowEvidence','workflow'],['occupationEvidence','occupation']] as const) {
      const expected=original.definitionReview.actionSupport.filter((r:Raw) => r.role === role).map((r:Raw) => ({sourceId:id(mainPrefix,r.sourceId),locator:[r.locator,r.note].filter(Boolean).join(' · ')}))
      check(same(t[field],expected),'有效动作引用被旧定义覆盖：'+original.id)
    }
    check(t.manualInputs.every(x => x.value === null) && (t.researchStatus === 'not-started' || t.researchStatus === 'in-progress') && original.canFreeze === false && noNumbers(original.humanInput) && noNumbers(original.economics) && original.economics.currency === 'CNY','人工、现金或冻结状态已变化')
    check(d.effectiveForEvidenceDisplay === true && d.countedCandidateId === original.id && same(d.sourceRefs,original.definitionReview.actionSupport) && checks.get(original.id)?.originalSnapshotEqualsInventory === true && checks.get(original.id)?.canFreeze === false,'有效定义或限定复检不一致')
    check(decisions.get(original.id)?.country === 'CN' && decisions.get(original.id)?.scenarioId === original.scenarioId && decisions.get(original.id)?.title === original.title,'逐任务独审不匹配')
  }
  const next:Research = {...data,sources:[...data.sources],claims:[...data.claims],searches:[...data.searches],tasks:[...data.tasks],scenarios:[...data.scenarios],industries:[...data.industries]}
  const mainSources = index(main.sources,'id',25), mainClaims = index(main.claims,'id',36)
  const definitionSources = new Map<string,Raw>()
  for (const scope of Object.values(review.definitionSourceReadScope) as Raw[]) {
    const source = inventory.sources.find((s:Raw) => s.id === scope.sourceId)
    check(source,'有效定义来源没有清单元数据')
    definitionSources.set(source.id,{...source,reviewedScope:scope})
    const enriched = {...source,documentMonth:source.id === 'cn-rural-water-ln-2013' ? '2013-06' : undefined,webPublishedAt:source.id === 'cn-rural-water-ln-2013' ? '2025-04-17' : undefined}
    append(next.sources,sourceRecord(enriched,mainPrefix,source.id.includes('occ-') ? 'occupation-public-draft' : 'reviewed-historical-workflow',scope.limitation))
  }
  for (const source of mainSources.values()) {
    check(source.countryScope === 'CN','主稿来源国家关联错误')
    append(next.sources,sourceRecord(source,mainPrefix,source.evidenceLevel,source.supportBoundary))
  }
  const mainRefs = (refs:Raw[]):Research['claims'][number]['evidence'] => refs.map(ref => {
    const source = mainSources.get(ref.sourceId), claim = mainClaims.get(ref.claimId)
    check(source && claim && claim.sourceId === source.id && ref.locator && source.locators.some((l:Raw) => l.id === ref.claimId && l.summary === claim.statement),'主稿引用缺声明或来源定位')
    return {sourceId:id(mainPrefix,ref.sourceId),locator:ref.locator}
  })
  const definitionRefs = (refs:Raw[]):Task['workflowEvidence'] => refs.map(ref => {
    check(definitionSources.has(ref.sourceId) && ref.locator,'有效动作来源不在独审核读范围')
    return {sourceId:id(mainPrefix,ref.sourceId),locator:[ref.locator,ref.note].filter(Boolean).join(' · ')}
  })
  for (const claim of mainClaims.values()) {
    const source = mainSources.get(claim.sourceId)!
    const evidence = mainRefs([{sourceId:claim.sourceId,claimId:claim.id,locator:claim.locator}])
    append(next.claims,{id:id(mainPrefix,claim.id),country:'cn',kind:'fact',text:claim.statement,conditions:[source.supportBoundary,source.reviewedScopeNote],evidence,basedOn:[],status:'draft',deployment:stage(source.evidenceLevel),numericValue:null})
  }
  const updated = new Map<string,Task>()
  const addTaskClaim = (t:Task,suffix:string,text:string,evidence:Task['workflowEvidence'],kind:Research['claims'][number]['kind'],level = 'unknown',conditions:string[] = [],basedOn:string[] = []) => {
    const claimId = mainPrefix+t.id+'-'+suffix
    append(next.claims,{id:claimId,country:'cn',taskId:t.id,kind,text,evidence,basedOn,conditions:unique([t.boundary,...conditions]),status:'draft',deployment:stage(level),numericValue:null})
    return claimId
  }
  for (const original of originals.values()) {
    const t = structuredClone(canonical.get(original.id)!), d = original.reviewedDefinition, dr = original.definitionReview, decision = decisions.get(t.id)!, query = queries.get(t.id)!
    const previous = t.dossier?.publicResearch as Raw | undefined
    check(!previous || noNumbers(previous.economics),'已导入现金参数有新数值')
    t.title=d.title;t.inputs=[...d.inputs];t.outputs=[...d.outputs];t.acceptance=strings(d.acceptance)
    t.workflowEvidence=definitionRefs(dr.actionSupport.filter((r:Raw) => r.role === 'workflow'))
    t.occupationEvidence=definitionRefs(dr.actionSupport.filter((r:Raw) => r.role === 'occupation'))
    const boundaryNotes:string[] = []
    for (const component of dr.componentSupport ?? []) boundaryNotes.push(component.support === 'source-backed' ? component.action+'：有原文直接支持；'+component.locator : component.action+'：仍为拟议范围；'+component.reason)
    if (d.externalAcceptanceInputs?.length) boundaryNotes.push('外部验收输入：'+d.externalAcceptanceInputs.join('；')+'。本任务使用交付报告，外部试验的执行劳动不重复计入。')
    if (original.interfaceOverlap) boundaryNotes.push('交接界面：'+original.interfaceOverlap.rule+' 对方任务：'+original.interfaceOverlap.otherTaskId+'。')
    t.conditions=unique([t.boundary,original.executionConditions.performerBoundary,original.executionConditions.methodAndObjectGap,...boundaryNotes])
    t.alternatives=[];t.barriers=[];t.conclusionIds=[];t.counterevidenceIds=[];t.searchIds=[]
    const sourceBoundConditions:Raw[] = []
    const deploymentEvidence:Raw[] = []
    for (const [i,alternative] of (original.alternatives as Raw[]).entries()) {
      const refs=alternative.sourceRefs ?? [], evidence=mainRefs(refs), level=refs.length === 1 ? mainSources.get(refs[0].sourceId)!.evidenceLevel : 'unknown'
      check(categories[alternative.type],'替代类别不明确')
      const scoped=refs.map((ref:Raw) => {
        const source=mainSources.get(ref.sourceId)!, claim=mainClaims.get(ref.claimId)!
        return {sourceId:id(mainPrefix,ref.sourceId),locator:ref.locator,level:source.evidenceLevel,scope:[claim.statement,source.supportBoundary,alternative.notEstablished].filter(Boolean).join('；'),currentOperationConfirmed:false}
      })
      sourceBoundConditions.push(...scoped);deploymentEvidence.push(...scoped)
      const text=evidence.length ? [alternative.supportedActions,'本任务未证实范围：'+alternative.notEstablished,...scoped.map((x:Raw) => x.scope)].filter(Boolean).join('；') : '待验证的'+alternative.type+'路线；没有保留匹配机制，不能判断不可行。'+alternative.notEstablished
      const claimId=addTaskClaim(t,'alternative-'+i,text,evidence,evidence.length?'judgment':'hypothesis',level,[...t.conditions,...scoped.map((x:Raw) => x.scope)],refs.map((r:Raw) => id(mainPrefix,r.claimId)))
      t.conclusionIds.push(claimId,...refs.map((r:Raw) => id(mainPrefix,r.claimId)))
      const residual=original.remainingHuman.filter((h:Raw) => h.kind === 'source-context-with-original-scope' && h.sourceRefs.some((r:Raw) => refs.some((a:Raw) => a.sourceId === r.sourceId))).map((h:Raw) => h.scope)
      t.alternatives.push({category:categories[alternative.type],description:alternative.type+(evidence.length?'：局部或相邻功能':'：待验证，缺匹配机制'),claimIds:[claimId],conditions:unique([alternative.status,...strings(alternative.conditions),...scoped.map((x:Raw) => x.scope)]),remainingLabor:unique([...residual,alternative.notEstablished,'未取得完整动作工时；尚未证实被替代的动作不等于必需人工。'])})
    }
    for (const ref of original.claimRefs) {
      const evidence=mainRefs([ref])[0], source=mainSources.get(ref.sourceId)!
      t.conclusionIds=unique([...t.conclusionIds,id(mainPrefix,ref.claimId)])
      if (!sourceBoundConditions.some(x => x.sourceId === evidence.sourceId && x.locator === evidence.locator)) {
        const bound={...evidence,level:source.evidenceLevel,scope:[mainClaims.get(ref.claimId)!.statement,ref.scope,ref.applicability].filter(Boolean).join('；'),currentOperationConfirmed:false}
        sourceBoundConditions.push(bound);deploymentEvidence.push(bound)
      }
    }
    for (const [field,type] of [['technicalBarriers','technical'],['economicBarriers','economic'],['adoptionBarriers','adoption']] as const) for (const [i,barrier] of (original[field] as Raw[]).entries()) {
      const evidence=mainRefs(barrier.sourceRefs ?? []), text=strings([barrier.question,barrier.detail,barrier.scope,barrier.note]).join('；')
      check(text,'障碍或问题缺正文')
      t.barriers.push({type,scenario:t.boundary,claimIds:[addTaskClaim(t,type+'-'+i,text,evidence,evidence.length?'judgment':'hypothesis','unknown',t.conditions)]})
    }
    for (const [i,counter] of (original.counterEvidence as Raw[]).entries()) {
      const evidence=mainRefs([counter]), source=mainSources.get(counter.sourceId)!
      t.counterevidenceIds.push(addTaskClaim(t,'counter-'+i,[counter.statement,counter.scope,counter.applicability,'历史限制与产品条件不是当前商业退出证明。'].filter(Boolean).join('；'),evidence,'judgment',source.evidenceLevel,t.conditions,[id(mainPrefix,counter.claimId)]))
      t.conclusionIds=unique([...t.conclusionIds,id(mainPrefix,counter.claimId)])
    }
    for (const component of dr.componentSupport ?? []) {
      if (component.support === 'source-backed') t.conclusionIds.push(addTaskClaim(t,'component-supported',component.action+'有该条款直接支持；另一填平动作仍待补证。',definitionRefs([component]),'judgment','reviewed-historical-workflow',boundaryNotes))
      else t.conclusionIds.push(addTaskClaim(t,'component-gap','待验证：'+component.action+'；'+component.reason,[],'hypothesis','unknown',boundaryNotes))
    }
    if (d.externalAcceptanceInputs?.length || original.interfaceOverlap) t.conclusionIds.push(addTaskClaim(t,'executor-interface',boundaryNotes.join('；'),t.workflowEvidence,'judgment','reviewed-historical-workflow',[original.executionConditions.performerBoundary]))
    check(query.status === 'query-pair-completed-and-candidate-screened' && query.id === decision.queryAudit.auditId && query.positiveQuery === decision.queryAudit.positiveQuery && query.negativeQuery === decision.queryAudit.negativeQuery && query.searchedAt === decision.queryAudit.declaredExecutedDate,'主查询与独审不一致')
    for (const [direction,key] of [['automation','positiveQuery'],['counterevidence','negativeQuery']] as const) {
      const searchId=mainPrefix+t.id+'-search-'+direction
      append(next.searches,{id:searchId,country:'cn',taskId:t.id,direction,query:query[key],searchedOn:query.searchedAt,results:[],outcome:'completed-candidates-unattributed',note:'原任务查询对有实际返回记录；查询文本和日期为作者记录，缺独立原请求参数与 UTC。正反候选为合并回包，不逐条归因。G02 组级查询另按母组审计，不重复作为父任务查询。',audit:{file:p.audit.file,id:query.id,sha256:p.audit.sha256}})
      t.searchIds.push(searchId)
    }
    t.manualInputs=[{name:'单位任务人工工时',value:null,unit:'小时／合格交付单元，单位待现场界定',evidence:[],gap:original.humanInput.gap}]
    t.evidenceGaps=unique([...original.evidenceGaps,...boundaryNotes,dr.note,cashExitGap,'拟议拆分、专业服务边界及完整现场运行仍待研究；不继承为已冻结子任务。'])
    t.interviewQuestions=unique([...original.interviewQuestions,...boundaryNotes.map(note => '请按现场职责核验：'+note)])
    t.researchStatus='in-progress';t.summary=[original.conclusion.summary,original.conclusion.boundary,...boundaryNotes].join(' ')
    t.discovery!.supportStatus=d.supportStatus
    t.discovery!.sourceLimitations=unique([...t.discovery!.sourceLimitations.filter(x => !x.startsWith('独立建筑任务复核：')),'独立建筑任务复核：'+dr.note])
    t.review={reviewer:'独立公开来源与建筑任务复核',date:main.reviewedAt,notes:'207 项指定修订及 G02 限定复检通过；保留来源/采用/完整现金流缺口，全部未冻结。'}
    t.dossier={...t.dossier,publicResearch:{country:'cn',researchVersion:main.researchVersion,provenance:p,reviewedDefinition:structuredClone(d),
      definitionReview:{...structuredClone(dr),note:[dr.note,...boundaryNotes].join(' '),children:dr.splitSuggestions.map((s:Raw) => s.title ?? s.description)},
      sourceBoundConditions,deploymentEvidence,economics:{...structuredClone(original.economics),exitAndReplacementCostBoundary:cashExitGap},
      negativeFinding:original.negativeFinding,successfulCounterexamples:original.successfulCounterexamples,remainingHuman:original.remainingHuman,queryAuditStatus:original.queryAuditStatus,queryRecord:query,originalRequestUTC:null,
      technicalQuestionPolicy:'无直接证据的问题是待验证假设；规范设备、产品条件、历史调研与已发生商业失败分别解释，均不自动成为完整任务障碍。',
      searchSummary:'本定义 2 条主查询有原始返回记录，执行日期为作者记录，缺独立请求与 UTC。另 16 条补充及 G02 查询按批次/组审计；不归算为每个父任务的额外独立查询。',
      canFreeze:false,baselineGroupIds:[],baselineMappings:[],unresolvedResearchActions:original.unresolvedResearchActions,interfaceOverlap:original.interfaceOverlap}}
    updated.set(t.id,t)
  }
  const gSources=index(baseline.sources,'id',18), gClaims=index(baseline.claims,'id',46), gGroups=index(baseline.groups,'id',32), gTasks=index(baseline.tasks,'id',38)
  const gDecisions=index(baselineReview.groupDecisions,'groupId',32), gTaskDecisions=index(baselineReview.taskDecisions,'taskId',38)
  const gQueries=index([...baselineAudit.mainRequests,...baselineAudit.adaptiveRequests],'id',34)
  check([...gQueries.values()].reduce((n,q) => n+q.request.search_query.length,0) === 69,'G02 实际查询总数不符')
  for (const source of gSources.values()) append(next.sources,sourceRecord(source,baselinePrefix,source.evidenceType,source.geographicScope))
  const gRefs=(refs:Raw[]):Task['workflowEvidence'] => refs.map(ref => {
    const source=gSources.get(ref.sourceId)
    check(source && ref.locator && source.locators.some((l:Raw) => same(l,ref)),'G02 声明定位未同步到来源')
    const line=ref.cacheLocator
    return {sourceId:id(baselinePrefix,ref.sourceId),locator:[ref.locator,line ? `LF物理行 ${line.lineStart}—${line.lineEnd}（${line.file}；分页符不另计行）` : null].filter(Boolean).join(' · ')}
  })
  for (const claim of gClaims.values()) {
    const d=baselineReview.claimDecisions.find((x:Raw) => x.claimId === claim.id)
    check(d && same(d.sourceIds,claim.sourceRefs.map((r:Raw) => r.sourceId).filter((x:string,i:number,all:string[]) => all.indexOf(x) === i)),'G02 声明与独审来源不一致')
    const refs=gRefs(claim.sourceRefs), levels=claim.sourceRefs.map((r:Raw) => gSources.get(r.sourceId)!.evidenceType)
    append(next.claims,{id:id(baselinePrefix,claim.id),country:'cn',kind:'fact',text:claim.text,evidence:refs,basedOn:[],conditions:[claim.evidenceBoundary,...claim.sourceRefs.map((r:Raw) => gSources.get(r.sourceId)!.geographicScope)],status:'draft',deployment:levels.length === 1 ? stage(levels[0]) : 'not-applicable',numericValue:null})
  }
  for (const row of gTasks.values()) check(originals.has(row.id) && row.country === 'CN' && row.industryId === industryId && same(row.reviewedDefinition,originals.get(row.id)!.reviewedDefinition) && row.basisSnapshotSha256 === p.main.sha256 && same(row.followupGroupIds,gTaskDecisions.get(row.id)?.followupGroupIds) && row.newTaskCount === 0,'G02 父任务定义与主稿不一致')
  for (const group of gGroups.values()) {
    const d=gDecisions.get(group.id)!
    check(group.country === 'CN' && group.industryId === industryId && same(group.parentTaskIds,d.parentTaskIds) && same(group.claimIds,d.claimIds) && group.countedAsNewTask === false && group.newTaskCount === 0 && d.newTasksApproved === 0 && noNumbers(group.labor) && noNumbers(group.economics.parameters),'G02 组归属、现金或计数变化')
    for (const queryId of group.searchAuditIds) check(gQueries.has(queryId),'G02 母组审计缺失')
    const mappings=group.mapping as Raw[]
    check(same(mappings.map(x => x.parentTaskId),group.parentTaskIds),'G02 父任务映射缺失')
    for (const mapping of mappings) {
      const t=updated.get(mapping.parentTaskId), original=originals.get(mapping.parentTaskId), row=gTasks.get(mapping.parentTaskId)
      check(t && original && row?.followupGroupIds.includes(group.id) && mapping.parentAcceptance === original.reviewedDefinition.acceptance,'G02 作用范围误挂父任务')
      const pr=t.dossier!.publicResearch as Raw
      const refs=mapping.basisClaimIds.flatMap((claimId:string) => {check(gClaims.has(claimId),'G02 关联声明缺失');return gRefs(gClaims.get(claimId)!.sourceRefs)})
      const sourceBounds=mapping.basisClaimIds.flatMap((claimId:string) => {
        const claim=gClaims.get(claimId)!
        return gRefs(claim.sourceRefs).map((ref,i) => ({...ref,claimId:id(baselinePrefix,claimId),level:gSources.get(claim.sourceRefs[i].sourceId)!.evidenceType,scope:[claim.text,claim.evidenceBoundary,mapping.coveredActionInterpretation,mapping.uncoveredAcceptance].join('；'),currentOperationConfirmed:false}))
      })
      const excluded=group.resultStatus === 'historical-withdrawal-exclude-current-candidate', toolUnknown=group.mechanism.category === 'fastener-process-tool-unconfirmed'
      const text=[excluded?'历史方法已排除为当前候选。':toolUnknown?'工具机制待验证；原文仅列紧固件工艺。':'追加的局部方法：',group.title,mapping.coveredActionInterpretation,'未覆盖验收：'+mapping.uncoveredAcceptance,group.reviewApplied.note,...sourceBounds.map((x:Raw) => x.scope)].join('；')
      const claimId=baselinePrefix+t.id+'-'+group.id.toLowerCase()
      append(next.claims,{id:claimId,country:'cn',taskId:t.id,kind:toolUnknown?'hypothesis':'judgment',text,evidence:refs,basedOn:mapping.basisClaimIds.map((x:string) => id(baselinePrefix,x)),conditions:[t.boundary,group.conditions.toValidate,...sourceBounds.map((x:Raw) => x.scope)],status:'draft',deployment:excluded?'not-applicable':'unknown',numericValue:null})
      t.conclusionIds=unique([...t.conclusionIds,claimId,...mapping.basisClaimIds.map((x:string) => id(baselinePrefix,x))])
      if (excluded) t.counterevidenceIds.push(claimId)
      else {
        const category:Task['alternatives'][number]['category']=group.mechanism.category === 'dedicated-machine' ? 'dedicated-machine' : /^(traditional|historical-conditional)-/.test(group.mechanism.category) ? 'traditional-machine' : /^assistive/.test(group.mechanism.category) || group.mechanism.category === 'dedicated-powered-tool' ? 'assistive-tool' : 'unclassified'
        t.alternatives.push({category,description:group.title+(toolUnknown?'：工具待确认':'：按条件使用的局部方法'),claimIds:[claimId],conditions:[group.conditions.toValidate,group.reviewApplied.note,...sourceBounds.map((x:Raw) => x.scope)],remainingLabor:[group.labor.residualWork,mapping.uncoveredAcceptance]})
      }
      t.conditions=unique([...t.conditions,mapping.coveredActionInterpretation,mapping.uncoveredAcceptance,group.reviewApplied.note])
      t.evidenceGaps=unique([...t.evidenceGaps,'G02 '+group.id+'：'+mapping.uncoveredAcceptance,group.reviewApplied.note,group.economics.economicGap])
      t.interviewQuestions=unique([...t.interviewQuestions,...group.interviewQuestions])
      t.summary+=' G02 追加：'+(excluded?'历史卷扬机调直不作当前候选。':mapping.coveredActionInterpretation+' 未覆盖：'+mapping.uncoveredAcceptance)
      pr.baselineGroupIds.push(group.id);pr.baselineMappings.push({...structuredClone(mapping),groupId:group.id,canonicalClaimId:claimId,sourceBoundConditions:sourceBounds,searchAuditIds:[...group.searchAuditIds],audit:{...p.baselineAudit},countAsNewTask:false,countAsParentSearch:false})
      pr.sourceBoundConditions.push(...sourceBounds);pr.deploymentEvidence.push(...sourceBounds)
    }
  }
  next.tasks=next.tasks.map(t => updated.get(t.id) ?? t)
  for (const scenario of next.scenarios.filter(s => s.country === 'cn' && s.industryId === industryId)) {
    const s=structuredClone(scenario), children=[...updated.values()].filter(t => t.scenarioId === s.id)
    const uniqueRefs=(refs:Task['workflowEvidence']) => [...new Map(refs.map(r => [r.sourceId+'|'+r.locator,r])).values()]
    s.workflowSources=uniqueRefs(children.flatMap(t => t.workflowEvidence));s.occupationSources=uniqueRefs(children.flatMap(t => t.occupationEvidence))
    next.scenarios[next.scenarios.findIndex(x => x.id === s.id)]=s
  }
  const industry=structuredClone(next.industries.find(i => i.id === industryId))
  check(industry?.country === 'cn','缺少中国建筑行业')
  industry.inventory={...industry.inventory,constructionResearch:{provenance:p,mainTaskCount:207,newTaskCount:0,canFreeze:false,
    main:{opportunities:main.opportunities,reviewFollowups:main.reviewFollowups,queryAuditStatus:audit.independentVerification,additionalQueries:audit.additionalQueries,historicalArchiveGap:recheck.historicalArchiveGap},
    baseline:{scope:baseline.scope,groups:baseline.groups,groupSearchAudit:baselineAudit,queryPolicy:'69 条实际查询按原始 32 组及补充请求保存；多父映射不复制为 task searches。',unresolved:baseline.unresolved,cashflowModelReferenceOnly:baseline.cashflowModel,financialIntegrationRule:'主 207 稿完整逐期增量现金流保持；G02 简式仅作参考，不覆盖主稿。',exitAndReplacementCostBoundary:cashExitGap}}}
  next.industries[next.industries.findIndex(i => i.id === industryId)]=industry
  return validateResearch(next)
}
