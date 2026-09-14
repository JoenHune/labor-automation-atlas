import {readFileSync} from 'node:fs'
import {describe,expect,it} from 'vitest'
import type {EmploymentDataset,Research} from '../src/research/schema'
import {employmentRanking} from '../src/research/employment-ranking'
import {validateEmployment,employmentGroups,employmentExport} from '../src/research/employment'
import additional from '../research/employment/us/major-ranking-inputs.json'

const site=JSON.parse(readFileSync('data/site.json','utf8')) as Research
const data=JSON.parse(readFileSync('research/employment/dataset.json','utf8')) as EmploymentDataset
const research={...site,employment:data}

describe('独立全行业就业榜的覆盖与配对',()=>{
 it('中国只列211个互斥末级产品，明确使用2023而不是传入的年度年份',()=>{
  const result=employmentRanking(research,'cn',2025)
  expect(result.basis).toBe('cn-io2023');expect(result.year).toBe(2023)
  expect(result.views).toHaveLength(211)
  const ids=new Set(result.views.map(view=>view.node.id))
  expect(ids.size).toBe(211)
  for(const view of result.views){
   expect(view.node.country).toBe('cn');expect(view.node.year).toBe(2023)
   expect(view.node.children).toHaveLength(0);expect(ids.has(view.node.parentId??'')).toBe(false)
   expect(view.stale).toBe(false);expect(view.count).toBeGreaterThan(0);expect(view.productivity).not.toBeNull()
  }
  expect(result.views.reduce((sum,view)=>sum+view.count!,0)).toBeCloseTo(740410000,4)
 })
 it('美国每个年度都覆盖20大类而非Top10，新增9类来自独立原始输入',()=>{
  const ids=site.industries.filter(industry=>industry.country==='us'&&industry.rankingUniverse).map(industry=>industry.id).sort()
  for(const year of [2021,2022,2023,2024,2025]){
   const result=employmentRanking(research,'us',year)
   expect(result.views.map(view=>view.node.id).sort()).toEqual(ids)
   expect(result.views).toHaveLength(20)
   expect(result.views.every(view=>view.node.children.length===0&&view.node.parentId===null&&view.node.year===year&&!view.stale&&view.count!==null&&view.productivity!==null)).toBe(true)
   const extra=result.views.filter(view=>view.record!.id.startsWith('us-major-employment-'))
   expect(extra).toHaveLength(9)
   expect(extra.every(view=>view.record!.employment.status==='official')).toBe(true)
   const prior=data.records.find(record=>record.nodeId==='us-orbit-other'&&record.year===year)!
   const unclassified=year===2025?201162:0
   expect(extra.reduce((sum,view)=>sum+view.count!,0)).toBe(prior.employment.value!-unclassified)
  }
 })
 it('不覆盖原11行业的研究与特殊分组，新增来源及算式可独立校验与导出',()=>{
  const result=employmentRanking(research,'us',2025)
  expect(result.dataset).not.toBe(data)
  expect(data.records).toHaveLength(1258)
  expect(result.dataset!.records).toHaveLength(1303)
  validateEmployment(result.dataset!)
  for(const view of result.views.filter(view=>!view.record!.id.startsWith('us-major-employment-'))){
   expect(view.record).toBe(data.records.find(record=>record.country==='us'&&record.nodeId===view.node.id&&record.year===2025))
  }
  const housing=result.views.find(view=>view.node.id==='us-real-estate')!
  const mining=result.views.find(view=>view.node.id==='us-mining')!
  expect(mining.count).toBe(570806)
  expect(housing.record!.pairing.scopeNote).toContain('住房资本服务')
  expect(employmentGroups([housing,mining],'productivity').groups).toHaveLength(2)
  const exported=employmentExport(result.dataset,[mining],{mode:'usd-million',usdCny:6.71})
  expect(exported.sources.some(source=>source.id==='us-employment-qcew-2025')).toBe(true)
  expect(exported.records[0].employment.calculation!.inputs[0].evidence[0].locator).toContain('row 2554')
  expect(exported.computed[0].productivityBase).toBe(384285000000/570806)
  expect(additional.excluded[0].value).toBe(201162)
 })
 it('主数据尚未加载时所有行均保持缺值，不让新增9类提前形成残缺榜',()=>{
  for(const country of ['cn','us'] as const){
   const result=employmentRanking({...site,employment:undefined},country,2025)
   expect(result.dataset).toBeUndefined()
   expect(result.views).toHaveLength(country==='cn'?211:20)
   expect(result.views.every(view=>view.count===null&&view.productivity===null)).toBe(true)
  }
 })
 it('新年份、分子或行业定义变化均不沿用旧补充配对',()=>{
  expect(employmentRanking(research,'us',2026).views.every(view=>view.count===null&&view.productivity===null)).toBe(true)
  const changed={...research,observations:research.observations.map(o=>o.industryId==='us-mining'&&o.period==='2025'&&o.frequency==='annual'&&o.measure==='value-added'?{...o,value:o.value!+1}:o)}
  const view=employmentRanking(changed,'us',2025).views.find(view=>view.node.id==='us-mining')!
  expect(view.stale).toBe(true);expect(view.count).toBeNull();expect(view.productivity).toBeNull()
 })
 it('后续canonical补入行业时优先采用新研究，不重复或覆盖它',()=>{
  const replacement=structuredClone(additional.dataset.records.find(record=>record.nodeId==='us-mining'&&record.year===2025)!) as EmploymentDataset['records'][number]
  replacement.id='us-new-reviewed-mining-2025'
  const upgraded={...research,employment:{...data,records:[...data.records,replacement]}}
  const result=employmentRanking(upgraded,'us',2025)
  expect(result.views.find(view=>view.node.id==='us-mining')!.record).toBe(replacement)
  expect(result.dataset!.records.filter(record=>record.nodeId==='us-mining'&&record.year===2025)).toHaveLength(1)
 })
 it('完整大类不能同时包含父子行业，保持非重叠统计范围',()=>{
  const overlapping={...research,industries:research.industries.map(industry=>industry.id==='us-mining'?{...industry,parentId:'us-agriculture'}:industry)}
  expect(()=>employmentRanking(overlapping,'us',2025)).toThrow('同一榜单不能包含父子行业')
 })
})
