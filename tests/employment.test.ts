import {describe,it,expect} from 'vitest'
import {validateEmployment,employmentView,employmentDisplay,employmentCalculation,employmentGroups,employmentExport} from '../src/research/employment'
import {loadEmployment} from '../src/research/employment-loader'
import type {EmploymentDataset,EmploymentRecord} from '../src/research/schema'
import type {ScaleNode} from '../src/research/industry-scale'

const node:ScaleNode={id:'cn-test',name:'测试行业',country:'cn',parentId:null,year:2025,value:1,unit:'亿元',currency:'CNY',baseValue:1e8,coverage:'同一范围',revision:'测试',releaseDate:null,evidence:[{sourceId:'value',locator:'原表行'}],children:[],gap:'',kind:'industry'}
const evidence=[{sourceId:'employment-test',locator:'测试原表对应行'}]
function fixture():EmploymentDataset{
 return {version:'test-1',checkedAt:'2026-09-14',sources:[{id:'employment-test',country:'cn',title:'就业测试源',publisher:'测试',url:'https://www.stats.gov.cn/',kind:'official-statistics',published:null,retrieved:'2026-09-14',limitations:[]}],records:[{id:'cn-test-employment-2025',country:'cn',basis:'annual-industry',nodeId:'cn-test',nodeName:'测试行业',year:2025,valueAddedAnchor:{baseValue:1e8,currency:'CNY',coverage:'同一范围'},employment:{value:10000,year:2025,denominatorKind:'persons',periodBasis:'year-end',status:'official',definition:'同范围年末人数',coverage:'同一范围',releaseDate:null,revision:'测试',evidence},pairing:{status:'matched',explanation:'同年同范围；年度增加值除以年末规模',comparisonGroup:'test'},references:[],notes:[],gap:''}]}
}
function model(r:EmploymentRecord){
 r.employment.status='estimated';r.pairing.status='proxy'
 r.employment.calculation={methodId:'weight',label:'按权重分配',operation:'share',expression:'40000×1/4',inputs:[{id:'pool',label:'人数池',value:40000,unit:'人',evidence},{id:'weight',label:'本项权重',value:1,unit:'份',evidence},{id:'total',label:'权重和',value:4,unit:'份',evidence}],assumptions:['组内权重不变']}
}
describe('就业统计与模型计算边界',()=>{
 it('按国家加载时验证数据版本，拒绝过期缓存与其他国家数据',async()=>{
  const data=fixture(),signal=new AbortController().signal
  const request=(async()=>new Response(JSON.stringify(data),{status:200})) as typeof fetch
  expect((await loadEmployment('/employment-cn.json','cn','test-1',signal,request)).records).toHaveLength(1)
  await expect(loadEmployment('/employment-cn.json','cn','test-2',signal,request)).rejects.toThrow('页面版本不同')
  await expect(loadEmployment('/employment-us.json','us','test-1',signal,request)).rejects.toThrow('国家不匹配')
 })
 it('网络失败不变成就业空表，取消请求向上传递以免覆盖新国家',async()=>{
  const controller=new AbortController()
  await expect(loadEmployment('/employment-cn.json','cn','test-1',controller.signal,(async()=>new Response('',{status:503})) as typeof fetch)).rejects.toThrow('无法读取')
  controller.abort()
  const request=(async(_url,options)=>{options?.signal?.throwIfAborted();return new Response('{}')}) as typeof fetch
  await expect(loadEmployment('/employment-cn.json','cn','test-1',controller.signal,request)).rejects.toHaveProperty('name','AbortError')
 })
 it('以同年原币增加值除基础人数；货币换算不改分母',()=>{
  const d=validateEmployment(fixture()),v=employmentView(d,node)
  expect(v.productivity).toBe(10000)
  const usd=employmentDisplay(v,{mode:'usd-million',usdCny:6.71})
  expect(usd.count).toBe('1');expect(usd.countUnit).toBe('万人');expect(usd.productivity).toBe('1,490');expect(usd.productivityUnit).toBe('美元/人')
  expect(employmentView(d,node).count).toBe(10000)
 })
 it('不以同ID挂载另一国家、年份或另一数据口径',()=>{
  const d=fixture()
  expect(employmentView(d,{...node,country:'us',currency:'USD'}).count).toBeNull()
  expect(employmentView(d,{...node,year:2024}).count).toBeNull()
  expect(employmentView(d,node,'cn-io2023').count).toBeNull()
 })
 it('同ID被改作另一行业时停用旧就业配对',()=>{
  const d=fixture()
  for(const changed of [{...node,name:'另一行业'},{...node,coverage:'已变更范围'},{...node,baseValue:2e8}]){
   const v=employmentView(d,changed);expect(v.stale).toBe(true);expect(v.count).toBeNull();expect(v.productivity).toBeNull()
  }
 })
 it('只有就业数时保留人数，不虚构增加值或比率',()=>{
  const d=fixture();d.records[0].valueAddedAnchor.baseValue=null
  const v=employmentView(d,{...node,value:null,baseValue:null})
  expect(v.count).toBe(10000);expect(v.productivity).toBeNull();expect(v.reason).toContain('尚缺同年现价增加值')
 })
 it('零就业不相除，负增加值按原值计算',()=>{
  const zero=fixture();zero.records[0].employment.value=0
  expect(employmentView(validateEmployment(zero),node).productivity).toBeNull()
  const negative=fixture();negative.records[0].valueAddedAnchor.baseValue=-1e8
  expect(employmentView(negative,{...node,value:-1,baseValue:-1e8}).productivity).toBe(-10000)
 })
 it('模型需要完整输入与明确假设，算式不能与结果不符',()=>{
  const d=fixture();model(d.records[0]);expect(validateEmployment(d)).toBeDefined()
  const wrong=structuredClone(d);wrong.records[0].employment.value=11000;expect(()=>validateEmployment(wrong)).toThrow('算式输入不符')
  const noAssumption=structuredClone(d);noAssumption.records[0].employment.calculation!.assumptions=[];expect(()=>validateEmployment(noAssumption)).toThrow('缺假设')
  const matched=structuredClone(d);matched.records[0].pairing.status='matched';expect(()=>validateEmployment(matched)).toThrow('模型就业不能')
 })
 it('人均区间反转就业分母端点，并保留模型范围性质',()=>{
  const d=fixture();model(d.records[0]);d.records[0].employment.sensitivity={lower:5000,upper:20000,label:'假设情景，非置信区间',assumptions:['改变相对报酬']}
  const v=employmentView(validateEmployment(d),node)
  expect(v.employmentRange).toEqual([5000,20000]);expect(v.productivityRange).toEqual([5000,20000])
  d.records[0].employment.sensitivity.lower=11000;expect(()=>validateEmployment(d)).toThrow('未包含点估算')
 })
 it('来源、年期、节点重复都使验证失败',()=>{
  const country=fixture();country.sources[0].country='us';expect(()=>validateEmployment(country)).toThrow('串国')
  const year=fixture();year.records[0].employment.year=2024;expect(()=>validateEmployment(year)).toThrow('年份不同')
  const duplicate=fixture();duplicate.records.push(structuredClone(duplicate.records[0]));expect(()=>validateEmployment(duplicate)).toThrow('重复')
 })
 it('岗位与人员、官方数与模型数分别成组；无口径配对不算人均',()=>{
  const d=fixture();const jobs=structuredClone(d.records[0]);jobs.id='cn-jobs-2025';jobs.nodeId='cn-jobs';jobs.nodeName='岗位行业';jobs.employment.denominatorKind='jobs';jobs.employment.periodBasis='annual-average';d.records.push(jobs)
  const est=structuredClone(d.records[0]);est.id='cn-est-2025';est.nodeId='cn-est';est.nodeName='估算行业';model(est);d.records.push(est)
  const views=[employmentView(d,node),employmentView(d,{...node,id:'cn-jobs',name:'岗位行业'}),employmentView(d,{...node,id:'cn-est',name:'估算行业'})]
  expect(employmentGroups(views,'productivity').groups).toHaveLength(3)
  expect(employmentGroups(views,'productivity',true).unranked).toHaveLength(1)
  jobs.pairing.status='incompatible';const incompatible=employmentView(d,{...node,id:'cn-jobs',name:'岗位行业'});expect(incompatible.productivity).toBeNull()
  expect(employmentGroups([incompatible],'productivity').unranked).toHaveLength(1)
  expect(employmentGroups([incompatible],'employment').groups[0].rows[0].count).toBe(10000)
 })
 it('导出保留原就业、公式、参考数据和国家限定来源',()=>{
  const d=fixture();model(d.records[0]);d.sources.push({...d.sources[0],id:'us-unused-source',country:'us'})
  const output=employmentExport(d,[employmentView(d,node)],{mode:'cny-100m',usdCny:6.71})
  expect(output.records[0].employment.calculation?.inputs).toHaveLength(3);expect(output.sources.map(s=>s.id)).toEqual(['employment-test']);expect(output.computed[0].productivityBase).toBe(10000)
 })
 it('未分列汇总与包含在内的缺金额子项不混入同一就业排行',()=>{
  const d=fixture(),v=employmentView(d,node)
  const remainder={...v,node:{...node,id:'cn-test-unallocated',kind:'remainder' as const}}
  const groups=employmentGroups([v,remainder],'employment').groups
  expect(groups).toHaveLength(2);expect(groups[1].label).toContain('未分列汇总')
 })
 it('权重和为零及求差为负不能变成合法就业',()=>{
  const d=fixture();model(d.records[0]);const c=d.records[0].employment.calculation!
  c.inputs[2].value=0;expect(()=>employmentCalculation(c)).toThrow('正权重和')
  c.operation='difference';c.inputs=c.inputs.slice(0,2);c.inputs[0].value=0;expect(()=>employmentCalculation(c)).toThrow('非负数')
 })
})
