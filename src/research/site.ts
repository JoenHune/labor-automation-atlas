import type {Research,Task,Industry,Observation} from './schema'
export type TaskCard=Pick<Task,'id'|'title'|'country'|'industryId'|'scenarioId'|'phase'|'researchStatus'|'summary'|'countingRole'>
export interface IndustryPage {industry:Industry;observation:Observation|null;scenarios:Research['scenarios'];tasks:TaskCard[]}
export interface TaskPage {version:string;checkedAt:string;task:Task;industry:Industry;scenario:Pick<Research['scenarios'][number],'id'|'title'|'scope'>;claims:Research['claims'];searches:Research['searches'];sources:Research['sources']}
/** Use the same evidence closure for a task's page and downloadable record. */
export function createTaskPageBuilder(data:Research) {
 const claimIndex=new Map(data.claims.map(c=>[c.id,c])),sourceIndex=new Map(data.sources.map(s=>[s.id,s]))
 const ownClaims=new Map<string,string[]>(),ownSearches=new Map<string,Research['searches']>()
 for(const c of data.claims)if(c.taskId)ownClaims.set(c.taskId,[...(ownClaims.get(c.taskId)??[]),c.id])
 for(const s of data.searches)ownSearches.set(s.taskId,[...(ownSearches.get(s.taskId)??[]),s])
 return (task:Task):TaskPage=>{
  const claims:Research['claims']=[],sources:Research['sources']=[],claimIds=new Set<string>(),sourceIds=new Set<string>()
  function addClaim(id:string){
   if(claimIds.has(id))return
   const c=claimIndex.get(id)
   if(!c||c.country!==task.country)throw new Error('任务结论缺失或属于其他国家：'+id)
   claimIds.add(id);claims.push(c);c.basedOn.forEach(addClaim)
  }
  for(const id of [...(ownClaims.get(task.id)??[]),...task.conclusionIds,...task.counterevidenceIds,...task.alternatives.flatMap(a=>a.claimIds),...task.barriers.flatMap(b=>b.claimIds)])addClaim(id)
  function addSource(id:string){
   if(sourceIds.has(id))return
   const s=sourceIndex.get(id)
   if(!s||(s.country!=='global'&&s.country!==task.country))throw new Error('任务来源缺失或属于其他国家：'+id)
   sourceIds.add(id);sources.push(s);s.dateEvidence?.forEach(e=>addSource(e.sourceId))
  }
  const searches=ownSearches.get(task.id)??[]
  if(searches.some(s=>s.country!==task.country))throw new Error('任务查询属于其他国家：'+task.id)
  const refs=[...task.workflowEvidence,...task.occupationEvidence,...task.manualInputs.flatMap(m=>m.evidence),...claims.flatMap(c=>c.evidence)]
  refs.forEach(e=>addSource(e.sourceId));searches.flatMap(s=>s.results).forEach(addSource)
  // Pending definition extensions remain separate from this task's claims and searches.
  const followups=task.dossier?.agricultureFollowups as Record<string,any>|undefined
  for(const item of Object.values(followups?.supplementItems??{}) as Record<string,any>[])for(const ref of [...item.definitionEvidence,...item.claimEvidence])addSource(ref.sourceId)
  for(const patch of Object.values(followups?.supplementPatches??{}) as Record<string,any>[])for(const ref of patch.references??[])addSource(ref.sourceId)
  const industry=data.industries.find(i=>i.id===task.industryId),scene=data.scenarios.find(s=>s.id===task.scenarioId)
  if(!industry||!scene||industry.country!==task.country||scene.country!==task.country||scene.industryId!==industry.id)throw new Error('任务页面国家或行业关联不一致：'+task.id)
  industry.evidence.forEach(e=>addSource(e.sourceId))
  return {version:data.version,checkedAt:data.checkedAt,task,industry:{...industry,inventory:undefined},scenario:{id:scene.id,title:scene.title,scope:scene.scope},claims,searches,sources}
 }
}
export const taskStatus={'not-started':'尚未研究自动化','in-progress':'研究中','evidence-insufficient':'检索后证据不足',researched:'已研究，待复核',reviewed:'公开证据已复核'}
export const phaseNames={preparation:'准备',operation:'作业',handoff:'交接',inspection:'检测',exception:'异常',rework:'返工',maintenance:'清洁维护',delivery:'交付'}
