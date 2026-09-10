import {readFileSync} from 'node:fs'
import {describe,it,expect} from 'vitest'
import type {Research} from '../src/research/schema'
import {industryScale,scaleSources,scaleIndex,scaleRows,scaleState,scaleShare,scaleAmount,scaleRemainder} from '../src/research/industry-scale'

const research=JSON.parse(readFileSync('data/site.json','utf8')) as Research
const cn=industryScale(research,'cn',2025),us=industryScale(research,'us',2025)
const index=scaleIndex(cn),industrial=index.get('cn-industry')!,manufacturing=index.get('cn-manufacturing')!

describe('one-chart industry composition uses same-year, disjoint amounts',()=>{
 it('replaces the industrial bar with a group and children, keeping other roots in place',()=>{
  const rows=scaleRows(cn,new Set(['cn-industry']))
  expect(rows[0]).toMatchObject({depth:0,expanded:true,node:{id:'cn-industry',value:416826}})
  expect(rows[1]).toMatchObject({depth:1,expanded:false,node:{id:'cn-manufacturing',value:346747}})
  expect(rows.filter(r=>r.depth===0).map(r=>r.node.id)).toEqual(cn.map(n=>n.id))
  const bars=rows.filter(r=>!r.expanded&&r.node.baseValue!==null)
  expect(bars.some(r=>r.node.id==='cn-industry')).toBe(false)
  expect(bars.filter(r=>r.node.parentId==='cn-industry').reduce((s,r)=>s+r.node.baseValue!,0)).toBe(industrial.baseValue)
  expect(scaleRows(cn,new Set())).toHaveLength(10)
 })
 it('shows manufacturing share and computes the unallocated remainder without assigning it to missing industries',()=>{
  expect(scaleShare(manufacturing,industrial)).toBeCloseTo(83.1874691,5)
  const remainder=scaleRemainder(industrial)!
  expect(remainder.value).toBe(70079)
  expect(remainder.kind).toBe('remainder')
  expect(remainder.evidence).toEqual([...industrial.evidence,...manufacturing.evidence])
  expect(index.get('cn-mining')!.value).toBeNull()
  expect(index.get('cn-utilities')!.value).toBeNull()
 })
 it('keeps historical decomposition in the requested historical year',()=>{
  const old=industryScale(research,'cn',2023).find(n=>n.id==='cn-industry')!
  expect(old.children.map(n=>n.value)).toEqual([323754.6,35613.9,32814.5])
  expect(old.children.reduce((sum,n)=>sum+n.value!,0)).toBeCloseTo(old.value!,5)
  expect(scaleRemainder(old)).toBeNull()
  const wholesale=index.get('cn-wholesale-retail')!
  expect(wholesale.children.length).toBeGreaterThan(0)
  expect(wholesale.children.every(n=>n.value===null&&n.year===2025&&!n.original)).toBe(true)
 })
 it('retains classification names for deeper exploration without manufacturing values',()=>{
  expect(manufacturing.children).toHaveLength(31)
  expect(manufacturing.children.every(n=>n.id.startsWith('cn-gbt2017-')&&n.value===null&&n.baseValue===null&&n.evidence.length>0)).toBe(true)
  expect(manufacturing.children.map(n=>n.id)).toContain('cn-gbt2017-39')
 })
 it('preserves the US source rounding difference without inventing a negative balancing item',()=>{
  const factory=us.find(n=>n.id==='us-manufacturing')!
  expect(factory.children).toHaveLength(19)
  expect(factory.value).toBe(2896476)
  expect(factory.children.reduce((s,n)=>s+n.value!,0)).toBe(2896478)
  expect(scaleRemainder(factory)).toBeNull()
  expect(factory.children[0].name).toContain('化学')
 })
 it('converts amounts with the global rate while keeping shares and original data stable',()=>{
  const before=structuredClone(manufacturing)
  expect(scaleAmount(manufacturing,{mode:'usd-million',usdCny:6.71})).toBeCloseTo(346747*100/6.71,5)
  expect(scaleAmount(manufacturing,{mode:'usd-million',usdCny:7})).toBeCloseTo(346747*100/7,5)
  expect(scaleAmount(manufacturing,{mode:'cny-100m',usdCny:7})).toBe(346747)
  expect(manufacturing).toEqual(before)
 })
 it('restores selected descendants and ignores cross-country or missing URL targets',()=>{
  const state=scaleState(index,new URLSearchParams('filter.scaleDetail=cn-gbt2017-39'))
  expect([...state.expanded].sort()).toEqual(['cn-industry','cn-manufacturing'])
  expect(state.selected).toBe('cn-gbt2017-39')
  expect(scaleState(scaleIndex(us),new URLSearchParams('filter.scaleExpanded=cn-industry&filter.scaleDetail=cn-manufacturing'))).toEqual({expanded:new Set(),selected:''})
  expect(scaleState(index,new URLSearchParams('filter.subindustry=cn-industry')).expanded.has('cn-industry')).toBe(true)
  const drawerOnly=scaleState(index,new URLSearchParams('filter.scaleExpanded=cn-industry,us-manufacturing,missing&filter.scaleDetail=cn-gbt2017-39'))
  expect([...drawerOnly.expanded]).toEqual(['cn-industry'])
  expect(drawerOnly.selected).toBe('cn-gbt2017-39')
 })
 it('refuses shares across country, year, currency, wrong parent, or missing denominators',()=>{
  for(const parent of [{...industrial,country:'us' as const},{...industrial,year:2024},{...industrial,currency:'USD' as const},{...industrial,id:'other'},{...industrial,baseValue:0},{...industrial,baseValue:null}])expect(scaleShare(manufacturing,parent)).toBeNull()
  expect(scaleShare({...manufacturing,baseValue:null},industrial)).toBeNull()
 })
 it('has unique IDs and no foreign nodes in every available annual view',()=>{
  for(const country of ['cn','us'] as const)for(const year of [2021,2022,2023,2024,2025]){
   const nodes=scaleIndex(industryScale(research,country,year))
   expect([...nodes.values()].every(n=>n.country===country&&n.year===year&&n.id.startsWith(country+'-'))).toBe(true)
  }
 })
 it('resolves every chart and drawer citation, including the separate subindustry source catalog',()=>{
  for(const country of ['cn','us'] as const){
   const sources=scaleSources(research,country),ids=new Set(sources.map(s=>s.id))
   expect(sources.every(s=>s.country===country||s.country==='global')).toBe(true)
   for(const year of [2021,2022,2023,2024,2025])for(const node of scaleIndex(industryScale(research,country,year)).values())for(const ref of node.evidence)expect(ids.has(ref.sourceId),ref.sourceId).toBe(true)
  }
 })
})
