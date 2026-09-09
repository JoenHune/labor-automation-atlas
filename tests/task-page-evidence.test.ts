import {describe,it,expect} from 'vitest'
import {createTaskPageBuilder} from '../src/research/site'
import type {Research,Task} from '../src/research/schema'

function fixture() {
 const task:Task={id:'cn-test',country:'cn',industryId:'cn-industry',scenarioId:'cn-scene',title:'检查样件',boundary:'样件表面',inputs:['样件'],outputs:['检查结果'],acceptance:['缺陷可定位'],phase:'inspection',predecessors:[],conditions:['生产线'],workflowEvidence:[],occupationEvidence:[],manualInputs:[],alternatives:[],barriers:[],conclusionIds:['shared'],counterevidenceIds:[],evidenceGaps:['工时未知'],interviewQuestions:[],searchIds:[],researchStatus:'in-progress',review:null}
 const source=(id:string,country:'cn'|'us'|'global'='cn'):Research['sources'][number]=>({id,country,title:id,url:'https://example.test/'+id,publisher:'test',published:null,retrieved:'2026-09-09',kind:'other',limitations:[]})
 const claim=(id:string):Research['claims'][number]=>({id,country:'cn',kind:'judgment',text:id,conditions:['本场景'],evidence:[],basedOn:[],status:'draft',deployment:'unknown'})
 const data:Research={version:'v1',checkedAt:'2026-09-09',publishedAt:null,freezeStatus:'working',countries:[],observations:[],tasks:[task],searches:[],
  industries:[{id:task.industryId,country:'cn',code:'test',name:'行业',classification:'test',sectors:['secondary'],parentId:null,rankingUniverse:true,unallocated:false,selected:true,selectionReason:'top10',coverage:'test',evidence:[]}],
  scenarios:[{id:task.scenarioId,country:'cn',industryId:task.industryId,title:'场景',scope:'test',subsectors:[],workflowSources:[],occupationSources:[],coverage:[],status:'proposed',exclusions:[]}],
  claims:[{...claim('shared'),basedOn:['premise']},{...claim('premise'),evidence:[{sourceId:'source',locator:'第2段'}]},claim('unrelated')],
  sources:[{...source('source'),dateEvidence:[{sourceId:'date-source',locator:'发布日期'}]},source('date-source','global'),source('unrelated')]}
 return {data,task,source,claim}
}
describe('任务页面与导出的完整证据关联',()=>{
 it('携带显式共用结论、递归前提及日期依据，不夹带无关结论',()=>{
  const {data,task}=fixture()
  task.alternatives=[{category:'assistive-tool',description:'辅助检查',claimIds:['shared'],remainingLabor:['复查'],conditions:['本场景']}]
  const record=createTaskPageBuilder(data)(task)
  expect(record.claims.map(c=>c.id)).toEqual(['shared','premise'])
  expect(record.sources.map(s=>s.id)).toEqual(['source','date-source'])
  expect(JSON.parse(JSON.stringify(record)).claims).toEqual(record.claims)
 })
 it('反例、障碍和方案单独引用的结论也可追溯',()=>{
  const {data,task,claim}=fixture();task.conclusionIds=[]
  data.claims.push({...claim('barrier'),basedOn:['premise']},{...claim('alternative'),basedOn:['premise']})
  task.counterevidenceIds=['shared'];task.barriers=[{type:'technical',scenario:'本场景',claimIds:['barrier']}]
  task.alternatives=[{category:'assistive-tool',description:'辅助检查',claimIds:['alternative'],remainingLabor:['复查'],conditions:['本场景']}]
  expect(new Set(createTaskPageBuilder(data)(task).claims.map(c=>c.id))).toEqual(new Set(['shared','premise','barrier','alternative']))
 })
 it('导出的行业分类依据与其发布日期依据均可解析',()=>{
  const {data,task,source}=fixture()
  data.industries[0].evidence=[{sourceId:'classification',locator:'行业分类表'}]
  data.sources.push({...source('classification'),dateEvidence:[{sourceId:'classification-date',locator:'发布时间'}]},source('classification-date'))
  const record=JSON.parse(JSON.stringify(createTaskPageBuilder(data)(task)))
  const ids=new Set(record.sources.map((s:{id:string})=>s.id))
  for(const ref of record.industry.evidence)expect(ids.has(ref.sourceId)).toBe(true)
  expect(ids.has('classification-date')).toBe(true)
  expect(ids.has('unrelated')).toBe(false)
 })
 it.each(['missing-claim','claim-country','premise-country','source-country','date-country','scene-country','industry-source-country','industry-source-missing'] as const)('拒绝缺失或跨国的证据关联：%s',failure=>{
  const {data,task}=fixture()
  if(failure==='missing-claim')task.conclusionIds=['missing']
  if(failure==='claim-country')data.claims[0].country='us'
  if(failure==='premise-country')data.claims[1].country='us'
  if(failure==='source-country')data.sources[0].country='us'
  if(failure==='date-country')data.sources[1].country='us'
  if(failure==='scene-country')data.scenarios[0].country='us'
  if(failure==='industry-source-country'){data.industries[0].evidence=[{sourceId:'unrelated',locator:'分类'}];data.sources[2].country='us'}
  if(failure==='industry-source-missing')data.industries[0].evidence=[{sourceId:'absent',locator:'分类'}]
  expect(()=>createTaskPageBuilder(data)(task)).toThrow(/缺失|国家/)
 })
 it('待定定义证据保留在导出中，不变成父任务结论或查询',()=>{
  const {data,task,source}=fixture();data.sources.push(source('pending-source'))
  task.dossier={agricultureFollowups:{supplementItems:{pending:{definitionEvidence:[{sourceId:'pending-source',locator:'待定动作'}],claimEvidence:[]}}}}
  const result=createTaskPageBuilder(data)(task)
  expect(result.sources.map(s=>s.id)).toContain('pending-source')
  expect(result.claims.map(c=>c.id)).toEqual(['shared','premise']);expect(result.searches).toEqual([])
 })
})
