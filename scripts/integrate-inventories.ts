import {readFile,writeFile} from 'node:fs/promises'
import {createHash} from 'node:crypto'
import {validateResearch} from '../src/research/validate'
import type {Research,Task,Country} from '../src/research/schema'
type Raw=Record<string,any>
const root=new URL('../',import.meta.url)
const data=JSON.parse(await readFile(new URL('data/research.json',root),'utf8')) as Research
data.tasks=data.tasks.filter(t=>!t.discovery)
data.scenarios=data.scenarios.filter(s=>!s.inventory)
data.sources=data.sources.filter(s=>!s.id.startsWith('inventory-'))
const phases:Record<string,Task['phase']>={'准备':'preparation','作业':'operation','交接':'handoff','检测':'inspection','异常':'exception','返工':'rework','清洁维护':'maintenance','交付':'delivery'}
const list=(v:unknown):string[]=>v==null?[]:(Array.isArray(v)?v:[v]).filter(Boolean).map(x=>typeof x==='string'?x:JSON.stringify(x))
const date=(v:unknown)=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)?v:null
for(const name of ['cn-core','cn-services','us-core','us-services']) {
 const file='research/inventories/'+name+'.json',input=await readFile(new URL(file,root),'utf8'),raw=JSON.parse(input) as Raw
 const sha=createHash('sha256').update(input).digest('hex'),country=name.slice(0,2) as Country
 const sourceMap=new Map<string,Raw>(raw.sources.map((s:Raw)=>[s.id,s]))
 const sourceId=(id:string)=>'inventory-'+name+'-'+id.toLowerCase()
 const occupationIds=new Set<string>(raw.industries.flatMap((i:Raw)=>i.scenarios.flatMap((s:Raw)=>s.occupationSourceIds??[])))
 const sourceLimitations=(s:Raw)=>[...list(s.limitations),...list(s.version),...list(s.versionNote),...list(s.accessLimitation),...list(s.supportRole),...(s.documentDate?['文件成文／版本时间：'+s.documentDate+'；与网页发布日期分开。']:[])]
 for(const s of raw.sources) {
  const publicationId=s.landingUrl&&s.landingUrl!==s.url?sourceId(s.id)+'-publication':null
  if(publicationId)data.sources.push({id:publicationId,title:s.title+' · 公开页面',publisher:s.publisher??'原清单未明确发布者',url:s.landingUrl,published:date(s.publishedAt),retrieved:date(s.retrievedAt)??'2026-09-09',country,kind:'other',limitations:['仅用于核对文件公开时间；不能证明投产、持续运行或完整流程。']})
  data.sources.push({
  id:sourceId(s.id),title:s.title,publisher:s.publisher??'原清单未明确发布者',url:s.url,published:date(s.publishedAt),retrieved:date(s.retrievedAt)??'2026-09-09',country,
  kind:occupationIds.has(s.id)?'occupation':'other',limitations:sourceLimitations(s),
  dates:s.documentDate&&/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/.test(s.documentDate)?[{kind:'document-version',value:s.documentDate,note:'按资料给出的精度保留，不补造月或日。'}]:[],
  dateEvidence:publicationId&&s.publishedAt?[{sourceId:publicationId,locator:'文件公示／公开页面的日期标记；报告成文时间另列。'}]:[],
 })
 }
 const refs=(items:Raw[])=>items.map(r=>{
  const source=sourceMap.get(r.sourceId);if(!source)throw new Error(file+': source missing '+r.sourceId)
  const location=(source.locators??[]).find((l:Raw)=>l.id===r.locatorId)
  if(r.locatorId&&!location)throw new Error(file+': locator missing '+r.sourceId+' / '+r.locatorId)
  return {sourceId:sourceId(r.sourceId),locator:[location?.location??location?.section??'来源整体；未取得更细定位',r.detail,r.support,r.supports].filter(Boolean).join(' · ')}
 })
 for(const i of raw.industries) {
  const industry=data.industries.find(x=>x.id===i.id&&x.country===country)
  if(!industry)throw new Error(file+': country/industry mismatch '+i.id)
  industry.inventory={...Object.fromEntries(Object.entries(i).filter(([k])=>k!=='scenarios')),sourceFile:file,inputSha256:sha,reviewStatus:'候选清单；未冻结，不代表行业全部任务已研究'}
  for(const s of i.scenarios) {
   const id=s.id.toLowerCase(),workflowIds=new Set<string>(s.workflowSourceIds??[]),occupation=new Set<string>(s.occupationSourceIds??[])
   const relevantRefs=(ids:Set<string>)=>{
    const matched=refs(s.tasks.flatMap((t:Raw)=>t.sourceRefs??[]).filter((r:Raw)=>ids.has(r.sourceId)))
    return [...new Map(matched.map(r=>[r.sourceId+'|'+r.locator,r])).values()]
   }
   const coverage=Object.entries(phases).map(([phase])=>{
    const original=Array.isArray(s.phaseCoverage)?s.phaseCoverage.find((p:Raw)=>p.phase===phase):s.phaseCoverage?.[phase]
    const taskIds=s.tasks.filter((t:Raw)=>t.phase===phase).map((t:Raw)=>t.id.toLowerCase())
    return {phase,taskIds,gap:original?.gap??original?.note??(taskIds.length?null:'尚无计数任务；需核查该阶段是否适用及证据缺口')}
   })
   data.scenarios.push({id,country,industryId:i.id,title:s.title,scope:s.scope,subsectors:[i.title],workflowSources:relevantRefs(workflowIds),occupationSources:relevantRefs(occupation),coverage,status:'proposed',exclusions:list(s.gaps),inventory:{...Object.fromEntries(Object.entries(s).filter(([k])=>!['tasks','phaseCoverage'].includes(k))),sourceFile:file,inputSha256:sha}})
   for(const t of s.tasks) {
    if(!phases[t.phase])throw new Error(file+': unknown phase '+t.phase)
    const limitations=[...new Set<string>((t.sourceRefs??[]).flatMap((r:Raw)=>sourceLimitations(sourceMap.get(r.sourceId)??{})))]
    const acceptanceStatus=t.acceptanceBasis??s.acceptancePolicy??'验收为研究者提出的任务边界，现场 SOP、阈值与责任分工尚待确认。'
    data.tasks.push({
     countingRole:'atomic-candidate',
     id:t.id.toLowerCase(),country,industryId:i.id,scenarioId:id,title:t.action??t.title,boundary:s.scope,
     inputs:list(t.inputs),outputs:list(t.outputs),acceptance:list(t.acceptance),phase:phases[t.phase],predecessors:[],conditions:[s.scope],
     workflowEvidence:refs((t.sourceRefs??[]).filter((r:Raw)=>workflowIds.has(r.sourceId))),occupationEvidence:refs((t.sourceRefs??[]).filter((r:Raw)=>occupation.has(r.sourceId))),
     manualInputs:[{name:'单位任务人工投入',value:null,unit:t.humanInput?.unit??'计量单位待现场界定',evidence:[],gap:'未取得可归因到此原子任务的人数、工时及付薪投入；职业职责不能换算为人工占比。'}],
     alternatives:[],barriers:[],conclusionIds:[],counterevidenceIds:[],
     evidenceGaps:[...list(t.evidenceGap),'现有替代方案及成功条件尚未逐项研究。','失败、退出、未采用及成功反例尚未完成检索。','完整部署成本、残留人工、维护、异常停机和实际需求均未取得。'],
     interviewQuestions:[`在${s.title}场景中，${t.action??t.title}由谁执行，触发、完成和验收条件分别是什么？`,'能否提供正常、异常及返工的任务计时记录，并区分自营与外包责任？','尝试过哪些机械、专机、机器人或辅助工具？何时使用、退出或决定不采用，依据和成本记录是什么？'],
     searchIds:[],researchStatus:'not-started',review:null,summary:'已列入候选任务。任务来源对应关系仍需复核；自动化与反例研究尚未开始。',evidenceAge:limitations.join('；'),
     discovery:{originalId:t.id,supportStatus:t.supportStatus??t.definitionStatus??t.inventoryStatus??'proposed',acceptanceStatus,sourceLimitations:limitations,inventoryFile:file,inputSha256:sha},
     dossier:{kind:'task-discovery',originalTask:t,scope:s.scope,acceptanceStatus,provenance:{file,sha256:sha}},
    })
   }
  }
 }
}
const validated=validateResearch(data)
await writeFile(new URL('data/research.json',root),JSON.stringify(validated,null,2)+'\n')
console.log('Integrated',validated.scenarios.length,'scenarios and',validated.tasks.length,'tasks; reviewed',validated.tasks.filter(t=>t.researchStatus==='reviewed').length)
