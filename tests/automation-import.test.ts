import {describe,it,expect} from 'vitest'
import {importCnServices} from '../src/research/import-cn-services'
import {ResearchSchema,type Research,type Task} from '../src/research/schema'
const source={id:'CN-AUTO-S',title:'设备说明',publisher:'供应商',url:'https://example.test/source',sourceCountry:'CN',publishedAt:null,retrievedAt:'2026-09-09',urlDate:'2025-05-27',effectiveAt:'2024-12-11',dateNotes:['URL 日期不能确定首次发布'],evidenceLevel:'manufacturer-product-description',supportBoundary:'仅标准容器',deploymentCountryBasis:'未证实部署国家',independentReview:{status:'bounded-source-read',note:'保留范围'}}
const raw={country:'CN',inventorySha256:'input',reviewedInputSha256:'review',sourceReviewFile:'research/review.json',reviewedAt:'2026-09-09',researchVersion:'v2',sources:[source],tasks:[{
 id:'CN-T',title:'存放箱子',industryId:'cn-i',scenarioId:'CN-SCENE',originalTask:{inputs:['箱子'],outputs:['已入库箱子'],acceptance:['位置一致']},executionConditions:{scope:'经营单位自营',methodAndObjectGap:'未取得现场 SOP'},
 alternatives:[{type:'机器人',status:'partial-or-adjacent-evidence',supportedActions:'产品描述箱子自动入库',notEstablished:'未证明任意箱型',sourceRefs:[{sourceId:source.id,locator:'自动入库章节'}]},{type:'辅助工具候选',status:'candidate-not-demonstrated',supportedActions:'未取得原文',notEstablished:'人工工时未知',sourceRefs:[]}],
 technicalBarriers:[{question:'异形箱是否适用？',sourceRefs:[]}],economicBarriers:[{detail:'缺报价'}],adoptionBarriers:[{question:'谁接管异常？'}],counterEvidence:[],humanInput:{gap:'待测量'},evidenceGaps:['未取得运行日志'],interviewQuestions:['如何验收？'],conclusion:{summary:'局部功能',boundary:'仅标准箱'},definitionReview:{children:['搬运箱子','核对入库位置']},deploymentEvidence:[{sourceId:source.id,locator:'自动入库章节',level:'manufacturer-product-description'}],economics:{paybackYears:null},negativeFinding:{status:'no-matching-case'},successfulCounterexamples:{status:'not-verified'}
}]}
const audit={country:'CN',inventorySha256:'input',searches:[{taskId:'CN-T',id:'pair',status:'query-pair-completed',searchedAt:'2026-09-09',positiveQuery:'存放箱子 自动化',negativeQuery:'存放箱子 自动化 退出'}]}
const provenance={file:'research/automation.json',sha256:'a'.repeat(64),auditFile:'research/audit.json',auditSha256:'b'.repeat(64)}
const fixture=()=>({version:'v1',checkedAt:'2026-09-09',publishedAt:null,freezeStatus:'working',countries:[],sources:[],industries:[],observations:[],scenarios:[],claims:[],searches:[],tasks:[{id:'cn-t',title:'存放箱子',country:'cn',industryId:'cn-i',scenarioId:'cn-scene',boundary:'经营单位自营',inputs:['箱子'],outputs:['已入库箱子'],acceptance:['位置一致'],phase:'operation',predecessors:[],workflowEvidence:[],occupationEvidence:[],evidenceAge:'',countingRole:'atomic-candidate'} as unknown as Task]} as Research)
describe('研究稿接入保留证据边界',()=>{
 it('已执行的查询对不伪造方向归属、任务完成或子项完成',()=>{
  const result=importCnServices(fixture(),raw,audit,provenance)
  expect(result.searches).toHaveLength(2)
  expect(result.searches.every(s=>s.results.length===0&&s.outcome==='completed-candidates-unattributed')).toBe(true)
  expect(result.tasks).toHaveLength(1)
  expect(result.tasks[0].researchStatus).toBe('in-progress')
  expect(result.tasks[0].dossier?.publicResearch).toMatchObject({canFreeze:false,definitionReview:{children:['搬运箱子','核对入库位置']}})
  const validated=ResearchSchema.parse(result)
  expect(validated.claims.find(c=>c.id.endsWith('alternative-1'))?.kind).toBe('hypothesis')
  expect(validated.claims.find(c=>c.id.endsWith('technical-0'))?.evidence).toEqual([])
  expect(validated.sources[0].published).toBeNull()
  expect(validated.sources[0].dates).toContainEqual(expect.objectContaining({kind:'url-only',value:'2025-05-27'}))
 })
 it('动作输出、执行范围变化或国家串入时禁止继承旧研究',()=>{
  const changed=fixture();changed.tasks[0].outputs=['不同交付物']
  expect(()=>importCnServices(changed,raw,audit,provenance)).toThrow('任务定义已变更')
  const executor=fixture();executor.tasks[0].boundary='独立外包公司'
  expect(()=>importCnServices(executor,raw,audit,provenance)).toThrow('任务定义已变更')
  expect(()=>importCnServices(fixture(),{...raw,country:'US'},audit,provenance)).toThrow('国家不匹配')
  const country=fixture();country.tasks[0].country='us'
  expect(()=>importCnServices(country,raw,audit,provenance)).toThrow('国家、行业或场景')
 })
 it('缺少真实已完成的任务查询、或重复审计任务时拒绝导入',()=>{
  expect(()=>importCnServices(fixture(),raw,{...audit,searches:[]},provenance)).toThrow('查询对')
  expect(()=>importCnServices(fixture(),raw,{...audit,searches:[...audit.searches,...audit.searches]},provenance)).toThrow('重复任务')
  expect(()=>importCnServices(fixture(),raw,{...audit,searches:[{...audit.searches[0],status:'planned'}]},provenance)).toThrow('查询对')
 })
 it('重复生成不会重复计算来源、结论和查询',()=>{
  const result=importCnServices(fixture(),raw,audit,provenance)
  const counts=[result.sources.length,result.claims.length,result.searches.length]
  importCnServices(result,raw,audit,provenance)
  expect([result.sources.length,result.claims.length,result.searches.length]).toEqual(counts)
 })
})
