import { ResearchSchema, type Research } from './schema'
import { annualRanking } from './ranking'

export function validateResearch(input: unknown) {
  const data = ResearchSchema.parse(input)
  const errors: string[] = []
  const grouped = [data.sources,data.industries,data.observations,data.scenarios,data.tasks,data.claims,data.searches]
  const allIds = grouped.flatMap(g=>g.map(x=>x.id))
  if (new Set(allIds).size !== allIds.length) errors.push('稳定编号重复')
  const sources = new Map(data.sources.map(x=>[x.id,x]))
  const industries = new Map(data.industries.map(x=>[x.id,x]))
  const scenarios = new Map(data.scenarios.map(x=>[x.id,x]))
  const tasks = new Map(data.tasks.map(x=>[x.id,x]))
  const claims = new Map(data.claims.map(x=>[x.id,x]))
  const searches = new Map(data.searches.map(x=>[x.id,x]))
  const countryLinks = (owner: {id:string,country:string}, linked: {id:string,country:string}|undefined, kind:string) => {
    if (!linked) errors.push(owner.id + ': 缺失关联 ' + kind)
    else if (linked.country !== owner.country) errors.push(owner.id + ': 国家串入 ' + linked.id)
  }
  const evidence = (owner: {id:string,country?:string}, refs:{sourceId:string,locator:string}[]) => {
    for (const ref of refs) {
      const s=sources.get(ref.sourceId)
      if (!s) errors.push(owner.id + ': 来源不存在 ' + ref.sourceId)
      else if (owner.country && s.country !== 'global' && s.country !== owner.country) errors.push(owner.id + ': 来源国家串入 ' + s.id)
    }
  }
  for (const i of data.industries) { evidence(i,i.evidence); if(i.parentId) countryLinks(i,industries.get(i.parentId),'parent') }
  for (const o of data.observations) { countryLinks(o,industries.get(o.industryId),'industry'); evidence(o,o.evidence) }
  for (const s of data.scenarios) {
    countryLinks(s,industries.get(s.industryId),'industry')
    evidence(s,[...s.workflowSources,...s.occupationSources])
    for (const phase of s.coverage) for (const id of phase.taskIds) {
      const task=tasks.get(id); countryLinks(s,task,'task')
      if (task && task.scenarioId !== s.id) errors.push(s.id + ': 流程任务归属错误')
    }
    if (s.status === 'frozen' && (!s.workflowSources.length || !s.occupationSources.length)) errors.push(s.id+': 冻结场景缺双路径来源')
  }
  for (const t of data.tasks) {
    countryLinks(t,industries.get(t.industryId),'industry')
    countryLinks(t,scenarios.get(t.scenarioId),'scenario')
    evidence(t,[...t.workflowEvidence,...t.occupationEvidence,...t.manualInputs.flatMap(x=>x.evidence)])
    for (const id of [...t.conclusionIds,...t.counterevidenceIds,...t.alternatives.flatMap(x=>x.claimIds),...t.barriers.flatMap(x=>x.claimIds)]) countryLinks(t,claims.get(id),'claim')
    for (const id of t.predecessors) countryLinks(t,tasks.get(id),'predecessor')
    for (const id of t.searchIds) {
      const search=searches.get(id); countryLinks(t,search,'search')
      if (search && search.taskId !== t.id) errors.push(t.id+': 用其他任务检索代替本任务')
    }
    if (['researched','evidence-insufficient','reviewed'].includes(t.researchStatus)) {
      const directions=new Set(t.searchIds.map(id=>searches.get(id)?.direction))
      for (const required of ['workflow','occupation','automation','counterevidence']) {
        if (!directions.has(required as never)) errors.push(t.id+': 缺任务级检索 '+required)
      }
    }
    if(t.researchStatus==='reviewed' && !t.review) errors.push(t.id+': 缺独立复核')
    if(t.researchStatus==='evidence-insufficient' && !t.evidenceGaps.length) errors.push(t.id+': 缺具体证据不足说明')
    for (const m of t.manualInputs) {
      if(m.value===null && !m.gap) errors.push(t.id+': 人工参数缺失没有说明')
      if(m.value!==null && !m.evidence.length) errors.push(t.id+': 人工数字没有证据')
    }
  }
  for(const c of data.claims) {
    evidence(c,c.evidence)
    if(c.taskId) countryLinks(c,tasks.get(c.taskId),'task')
    for(const id of c.basedOn) countryLinks(c,claims.get(id),'claim')
  }
  const active=new Set<string>(), visited=new Set<string>()
  function visit(id:string) {
    if(active.has(id)) { errors.push('结论循环引用 '+id); return }
    if(visited.has(id)) return
    active.add(id)
    for(const ref of claims.get(id)?.basedOn??[]) visit(ref)
    active.delete(id); visited.add(id)
  }
  data.claims.forEach(c=>visit(c.id))
  for(const s of data.searches) { countryLinks(s,tasks.get(s.taskId),'task'); for(const id of s.results) if(!sources.has(id)) errors.push(s.id+': 检索来源不存在 '+id) }
  for(const country of ['cn','us'] as const) {
    for(const year of new Set(data.observations.filter(o=>o.country===country && o.frequency==='annual').map(o=>Number(o.period)))) {
      try { annualRanking(country,year,data.industries,data.observations) } catch(e) { errors.push(country+' '+year+': '+String(e)) }
    }
  }
  if(data.freezeStatus==='frozen') {
    for(const t of data.tasks) if(t.researchStatus!=='reviewed') errors.push(t.id+': 未复核任务阻止冻结')
    if(data.scenarios.some(s=>s.status!=='frozen')) errors.push('存在未冻结场景')
  }
  if(errors.length) throw new Error(errors.join('\n'))
  return data
}

export function researchCoverage(data:Research) {
  return (['cn','us'] as const).map(country=>({
    country,
    selectedIndustries:data.industries.filter(x=>x.country===country && x.selected).length,
    scenarios:data.scenarios.filter(x=>x.country===country&&x.inventory).length,
    tasks:data.tasks.filter(x=>x.country===country&&x.countingRole!=='composite-reference').length,
    compositeReferences:data.tasks.filter(x=>x.country===country&&x.countingRole==='composite-reference').length,
    reviewedTasks:data.tasks.filter(x=>x.country===country&&x.countingRole!=='composite-reference'&&x.researchStatus==='reviewed').length,
    pendingTasks:data.tasks.filter(x=>x.country===country&&x.countingRole!=='composite-reference'&&['not-started','in-progress'].includes(x.researchStatus)).length,
  }))
}
