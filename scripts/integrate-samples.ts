import { readFile,writeFile } from 'node:fs/promises'
import { validateResearch } from '../src/research/validate'
import type { Research,Task } from '../src/research/schema'
type Raw=Record<string,any>
const root=new URL('../',import.meta.url)
const data=JSON.parse(await readFile(new URL('data/research.json',root),'utf8')) as Research
const logs=JSON.parse(await readFile(new URL('research/samples/search-log.json',root),'utf8'))
const lower=(id:string)=>id.toLowerCase()
for(const filename of ['cn-injection-molding-part-removal','us-cnc-machine-tending']) {
 const raw=JSON.parse(await readFile(new URL('research/samples/'+filename+'.json',root),'utf8')) as Raw
 const country=raw.country.toLowerCase() as 'cn'|'us',taskId=lower(raw.taskId),industryId=country==='cn'?'cn-industry':'us-manufacturing'
 const scenarioId=country+'-sample-scenario'
 const review=raw.research?.independentReview
 const reviewed=Boolean(review?.status?.startsWith('passed')&&review.reviewer&&review.date&&review.report)
 const sourceMap=new Map<string,Raw>(raw.sources.map((s:Raw)=>[s.id,s]))
 const sourceRefs=(ids:string[])=>ids.map(id=>({sourceId:lower(id),locator:sourceMap.get(id)!.locators.map((l:Raw)=>l.section+(l.pdfPageOneBased?' · PDF第'+l.pdfPageOneBased+'页':'')).join('；')}))
 const claimEvidence=(entries:Raw[])=>entries.map(e=>{
  const loc=sourceMap.get(e.sourceId)!.locators.find((l:Raw)=>l.id===e.locatorId)!
  return {sourceId:lower(e.sourceId),locator:loc.section+(loc.pdfPageOneBased?' · PDF第'+loc.pdfPageOneBased+'页':''),excerpt:loc.shortExactExcerpt}
 })
 for(const s of raw.sources) {
  const kind=s.sourceType.includes('occupational')?'occupation':s.sourceType.includes('incident')||s.sourceType.includes('inspection')?'official-investigation':s.sourceType.includes('research_lab')?'paper':s.sourceType.startsWith('vendor')||s.sourceType.startsWith('manufacturer')||s.sourceType==='integrator_case'?'vendor':s.sourceType.startsWith('customer')?'operator':'other'
  const source={id:lower(s.id),title:s.title,publisher:s.publisher,url:s.url,published:/^\d{4}-\d{2}-\d{2}$/.test(s.publishedAt??'')?s.publishedAt:null,
   retrieved:s.retrievedAt,country:s.countryScope==='global'?'global' as const:country,kind:kind as Research['sources'][number]['kind'],
   limitations:[s.limitations,s.revisionStatus,s.publishedAt?'原始日期精度：'+s.publishedAt:'网页未注明发布日期'].filter(Boolean)}
  data.sources=data.sources.filter(x=>x.id!==source.id);data.sources.push(source)
 }
 for(const c of raw.claims) {
  const vendor=(c.evidence??[]).some((e:Raw)=>/vendor_case|integrator_case/.test(sourceMap.get(e.sourceId)!.sourceType))
  const lab=(c.evidence??[]).some((e:Raw)=>sourceMap.get(e.sourceId)!.sourceType==='primary_research_lab')
  const claim={
   id:lower(c.id),country,taskId,kind:({direct_fact:'fact',research_judgment:'judgment',unverified_hypothesis:'hypothesis'} as const)[c.kind as 'direct_fact'],
   text:c.text,conditions:[c.scope,c.limitations].filter(Boolean),evidence:claimEvidence(c.evidence??[]),basedOn:[],
   status:reviewed?'reviewed' as const:'draft' as const,deployment:vendor?'vendor-report' as const:lab?'laboratory' as const:'not-applicable' as const,
  }
  data.claims=data.claims.filter(x=>x.id!==claim.id);data.claims.push(claim)
 }
 const phases=['preparation','operation','handoff','inspection','exception','rework','maintenance','delivery']
 data.scenarios=data.scenarios.filter(x=>x.id!==scenarioId)
 data.scenarios.push({id:scenarioId,country,industryId,title:raw.industry.subsector+' · 样板流程',
  scope:raw.boundary.start+' → '+raw.boundary.end,subsectors:[raw.industry.subsector],
  workflowSources:sourceRefs(raw.dualPathAudit.processSources),occupationSources:sourceRefs(raw.dualPathAudit.occupationalSources),
  coverage:phases.map(phase=>({phase,taskIds:phase==='operation'?[taskId]:[],gap:phase==='operation'?null:'相邻流程已在样板列出研究定义；独立任务拆解与全场景覆盖正在盘点，未冻结。'})),
  status:'source-backed',exclusions:raw.boundary.excludedButLinked,
 })
 const searchIds:string[]=[]
 const directions:Record<string,('workflow'|'occupation'|'automation'|'counterevidence')[]>={
  'S-CN-01':['automation'],'S-CN-02':['occupation'],'S-CN-03':['occupation','counterevidence'],'S-CN-04':['workflow','automation'],
  'S-CN-05':['counterevidence'],'S-CN-06':['counterevidence'],'S-CN-07':['counterevidence'],'S-CN-08':['counterevidence'],
  'S-US-01':['automation'],'S-US-02':['workflow','occupation'],'S-US-03':['counterevidence'],'S-US-04':['counterevidence'],'S-US-05':['automation','counterevidence'],'S-US-06':['counterevidence'],
 }
 for(const entry of logs.entries.filter((e:Raw)=>e.country===raw.country)) for(const direction of directions[entry.id]??[]) {
  const id=lower(entry.id)+'-'+direction
  const search={id,country,taskId,direction,query:entry.queries.join(' | '),searchedOn:entry.searchedAt,
   results:entry.acceptedSourceIds.map(lower),outcome:entry.acceptedSourceIds.length?'evidence-found' as const:'no-relevant-result' as const,
   note:entry.purpose+'：'+entry.outcomes.join('；')+'。排除/限制：'+entry.exclusion+'。这是同一实际检索批次的维度映射，不虚增查询次数。'}
  data.searches=data.searches.filter(x=>x.id!==id);data.searches.push(search);searchIds.push(id)
 }
 const types:Record<string,Task['alternatives'][number]['category']>={traditional_mechanical:'traditional-machine',dedicated_machine:'dedicated-machine',robot:'robot',assistive_tool:'assistive-tool',digital_process:'digital-process',digital_workflow:'digital-process',programmable_robot:'robot'}
 const task:Task={
  id:taskId,country,industryId,scenarioId,title:raw.title,boundary:raw.boundary.start+' → '+raw.boundary.end,
  inputs:raw.boundary.inputs,outputs:raw.boundary.outputs,acceptance:raw.boundary.acceptance,
  phase:'operation',predecessors:[],conditions:raw.scenarios.flatMap((s:Raw)=>s.conditions),
  workflowEvidence:sourceRefs(raw.dualPathAudit.processSources),occupationEvidence:sourceRefs(raw.dualPathAudit.occupationalSources),
  manualInputs:[
   {name:'基准操作配置人数',value:raw.manualInput.baselinePersons,unit:'人',evidence:[],gap:raw.manualInput.evidenceStatus},
   {name:'基准人工接触时间',value:raw.manualInput.baselineTouchSecondsPerPiece,unit:'秒/件',evidence:[],gap:raw.manualInput.evidenceStatus},
   {name:'任务占班次人工比例',value:raw.manualInput.manualShareOfShift,unit:'%',evidence:[],gap:raw.manualInput.evidenceStatus},
   {name:'残留人工接触时间',value:raw.manualInput.residualTouchSecondsPerPiece,unit:'秒/件',evidence:[],gap:raw.manualInput.evidenceStatus},
   {name:'可避免人工现金成本',value:raw.manualInput.laborCostPerHour,unit:raw.currency+'/小时',evidence:[],gap:raw.manualInput.evidenceStatus},
  ],
  alternatives:raw.alternatives.map((a:Raw)=>({category:types[a.type],description:a.name+'；'+a.status,claimIds:a.evidenceClaimIds.map(lower),remainingLabor:a.residualHuman,conditions:a.conditions})),
  barriers:raw.barriers.flatMap((b:Raw)=>b.types.map((type:string)=>({type,scenario:raw.scenarios.find((s:Raw)=>s.id===b.scenarioId)?.name+'：'+b.text,claimIds:b.basisClaimIds.map(lower)}))),
  conclusionIds:raw.conclusion.basisClaimIds.map(lower),counterevidenceIds:[...new Set([...raw.counterEvidence.successCounterexample.claimIds,...(raw.counterEvidence.notAdopted.claimIds??[]),...(country==='cn'?['CN-C11']:['US-C12'])])].map(id=>lower(String(id))),
  evidenceGaps:raw.evidenceGaps.map((g:Raw)=>g.gap+'（影响：'+g.blocks+'）'),
  interviewQuestions:raw.interviews.map((i:Raw)=>i.targetRole+'：'+i.question),
  searchIds,researchStatus:reviewed?'reviewed':'in-progress',review:reviewed?{reviewer:review.reviewer,date:review.date,notes:(review.reason??'复核通过且保留明示证据缺口')+'；'+review.report}:null,summary:raw.conclusion.text,evidenceAge:raw.conclusion.visibleEvidenceAge,dossier:raw,
 }
 data.tasks=data.tasks.filter(x=>x.id!==taskId);data.tasks.push(task)
}
const output=JSON.stringify(validateResearch(data),null,2)+'\n'
await writeFile(new URL('data/research.json',root),output)
await writeFile(new URL('docs/public/exports/research.json',root),output)
console.log('Integrated',data.tasks.length,'tasks,',data.claims.length,'claims,',data.sources.length,'sources. Independent review status remains explicit.')
