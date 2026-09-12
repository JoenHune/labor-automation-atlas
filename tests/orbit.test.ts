import {readFileSync} from 'node:fs'
import {describe,it,expect} from 'vitest'
import type {Research} from '../src/research/schema'
import {scaleIndex,scaleSources} from '../src/research/industry-scale'
import {orbitRoot,orbitLayer,orbitPath,restoreOrbit,orbitShare,canDrill,orbitBands,restoreOrbitExpanded,orbitExpansionParams} from '../src/research/orbit'
const research=JSON.parse(readFileSync('data/site.json','utf8')) as Research
const cn=orbitRoot(research,'cn',2025),us=orbitRoot(research,'us',2025)
const old=orbitRoot(research,'cn',2025,'cn-io2023'),index=scaleIndex([old])

describe('drill-down donut preserves economic scale and context',()=>{
 it('uses GDP as annual denominator and retains the published CN remainder and rounding',()=>{
  expect(cn.value).toBe(1401879)
  expect(cn.children.find(n=>n.kind==='remainder')!.value).toBe(246593)
  expect(orbitLayer(cn).delta).toBe(100000000)
  expect(us.value).toBe(research.observations.find(o=>o.country==='us'&&o.industryId==='us-gdp'&&o.period==='2025'&&o.frequency==='annual'&&o.priceBasis==='current')!.value)
  expect(orbitLayer(us).sum).toBeCloseTo(us.baseValue!,0)
  expect(us.children.some(n=>n.kind==='remainder')).toBe(true)
 })
 it('displays the known current industry component and an unassigned remainder, never fabricated mining or utilities',()=>{
  const industrial=scaleIndex([cn]).get('cn-industry')!,layer=orbitLayer(industrial)
  expect(layer.sectors.map(n=>n.value)).toEqual([346747,70079])
  expect(layer.missing.map(n=>n.value)).toEqual([null,null])
  expect(layer.sum).toBe(industrial.baseValue)
  expect(canDrill(industrial.children[0])).toBe(false)
  expect(industrial.children[0].children).toHaveLength(31)
 })
 it('retains native historical amounts and both parent and economy shares',()=>{
  const industry=index.get('cn-io-industry')!,factory=index.get('cn-io-manufacturing')!,electronics=index.get('cn-io-group-39')!
  expect(old.year).toBe(2023)
  expect(old.value).toBe(13009651993)
  expect(orbitLayer(factory).sectors).toHaveLength(31)
  expect(orbitLayer(factory).sum).toBe(factory.baseValue)
  expect(orbitShare(factory,industry)).toBeCloseTo(factory.value!/industry.value!*100)
  expect(orbitShare(electronics,old)!/orbitShare(factory,old)!*100).toBeCloseTo(orbitShare(electronics,factory)!)
  expect(orbitPath(index,electronics.id).map(n=>n.id)).toEqual([old.id,industry.id,factory.id,electronics.id])
  expect(canDrill(electronics)).toBe(true)
  expect(canDrill(electronics.children[0])).toBe(false)
 })
 it('keeps every parent angle fixed while children partition only its original wedge',()=>{
  const original=orbitBands(old,new Set())[0]
  const bands=orbitBands(old,new Set(['cn-io-industry','cn-io-manufacturing','cn-io-group-39','cn-io-wholesale-retail']))
  expect(bands).toHaveLength(4)
  expect(bands[0]).toEqual(original)
  for(let depth=1;depth<bands.length;depth++){
   for(const parent of bands[depth-1]){
    const children=bands[depth].filter(s=>s.node.parentId===parent.node.id)
    if(!children.length)continue
    expect(children[0].start).toBeCloseTo(parent.start,12)
    expect(children.reduce((sum,s)=>sum+s.share,0)).toBeCloseTo(parent.share,12)
    expect(children.at(-1)!.start+children.at(-1)!.share).toBeCloseTo(parent.start+parent.share,12)
   }
  }
  const electronics=bands[2].find(s=>s.node.id==='cn-io-group-39')!
  expect(bands[3].reduce((sum,s)=>sum+s.share,0)).toBeCloseTo(electronics.share,12)
  expect(electronics.share).toBeLessThan(.03)
 })
 it('restores simultaneous expansions, adds required ancestors, and rejects foreign branches',()=>{
  const q=new URLSearchParams('filter.scaleExpanded=cn-io-industry,cn-io-wholesale-retail,us-manufacturing')
  expect(restoreOrbitExpanded(old,q,old.id)).toEqual(['cn-io-industry','cn-io-wholesale-retail'])
  expect(restoreOrbitExpanded(old,new URLSearchParams('filter.orbitExpanded=cn-io-group-39'),old.id)).toEqual(['cn-io-industry','cn-io-manufacturing','cn-io-group-39'])
  expect(restoreOrbitExpanded(us,q,us.id)).toEqual(['us-manufacturing'])
  expect(restoreOrbitExpanded(us,new URLSearchParams('filter.orbitExpanded=cn-io-industry'),us.id)).toEqual([])
 })
 it('keeps fully expanded view filters compatible with annotation links without losing a branch',()=>{
  const ids=[...index.values()].filter(n=>n.id!==old.id&&canDrill(n)).map(n=>n.id)
  const params=orbitExpansionParams(ids)
  expect(Object.values(params).every(value=>value.length<=300)).toBe(true)
  expect(restoreOrbitExpanded(old,new URLSearchParams(params),old.id).sort()).toEqual(ids.sort())
 })
 it('restores legacy multiple branches at their common ancestor and explicit new links at the requested level',()=>{
  expect(restoreOrbit(old,new URLSearchParams('filter.scaleExpanded=cn-io-industry,cn-io-wholesale-retail'))).toEqual({focus:old.id,detail:''})
  expect(restoreOrbit(old,new URLSearchParams('filter.scaleExpanded=cn-io-industry,cn-io-manufacturing'))).toEqual({focus:'cn-io-industry',detail:''})
  expect(restoreOrbit(old,new URLSearchParams('filter.orbitFocus=cn-io-manufacturing'))).toEqual({focus:'cn-io-manufacturing',detail:''})
  const leaf=index.get('cn-io-group-39')!.children[0]
  expect(restoreOrbit(old,new URLSearchParams('filter.scaleDetail='+leaf.id))).toEqual({focus:leaf.parentId,detail:leaf.id})
 })
 it('restores an unassigned remainder beside its parent and rejects invalid targets',()=>{
  expect(restoreOrbit(cn,new URLSearchParams('filter.orbitFocus=cn-industry&filter.orbitDetail=cn-industry-unallocated'))).toEqual({focus:'cn-industry',detail:'cn-industry-unallocated'})
  for(const q of ['filter.orbitFocus=us-manufacturing','filter.orbitFocus=cn-io-manufacturing','filter.orbitFocus=missing&filter.orbitDetail=missing'])expect(restoreOrbit(cn,new URLSearchParams(q))).toEqual({focus:cn.id,detail:''})
  expect(restoreOrbit(us,new URLSearchParams('filter.orbitFocus=cn-industry&filter.orbitDetail=cn-manufacturing'))).toEqual({focus:us.id,detail:''})
 })
 it('retains zero and negative values separately instead of assigning them an invented positive area',()=>{
  const child=cn.children[0],layer=orbitLayer({...cn,children:[{...child,id:'zero',value:0,baseValue:0},{...child,id:'negative',value:-1,baseValue:-100000000},child]})
  expect(layer.sectors).toHaveLength(1)
  expect(layer.nonpositive.map(n=>n.id)).toEqual(['zero','negative'])
 })
 it('keeps country, period, native amounts and citations isolated in every view',()=>{
  for(const country of ['cn','us'] as const)for(const year of [2021,2022,2023,2024,2025]){
   const root=orbitRoot(research,country,year),nodes=[...scaleIndex([root]).values()],sources=new Set(scaleSources(research,country).map(s=>s.id))
   expect(nodes.every(n=>n.country===country&&n.year===year)).toBe(true)
   for(const n of nodes)for(const e of n.evidence)expect(sources.has(e.sourceId),e.sourceId).toBe(true)
  }
  expect(orbitRoot(research,'us',2025,'cn-io2023').id).toBe(us.id)
  expect(orbitShare(cn,us)).toBeNull()
  expect(orbitShare(old,cn)).toBeNull()
  expect(orbitShare({...cn,baseValue:null},cn)).toBeNull()
 })
})
