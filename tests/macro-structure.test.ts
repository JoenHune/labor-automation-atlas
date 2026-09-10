import {readFileSync} from 'node:fs'
import {describe,it,expect} from 'vitest'
import type {Research} from '../src/research/schema'
import {validateMacroStructures,macroScale} from '../src/research/macro-structure'
import {industryScale,scaleIndex,scaleRows,scaleShare,scaleSources,scaleState,scaleAmount} from '../src/research/industry-scale'
const data=JSON.parse(readFileSync('research/macro/structures.json','utf8'))
const raw=JSON.parse(readFileSync('research/macro/cn-io-2023-extract.json','utf8'))
const research=JSON.parse(readFileSync('data/site.json','utf8')) as Research

describe('macro amounts retain source basis, year and country',()=>{
 it('reconciles every official product, component row, integer total and aggregate',()=>{
  validateMacroStructures(data)
  const nodes=data.structures[0].nodes
  expect(raw.rows).toHaveLength(211)
  expect(raw.rows.reduce((sum:number,r:any)=>sum+r.value,0)).toBe(13009651993)
  for(const row of raw.rows){
   const node=nodes.find((n:any)=>n.id==='cn-io-'+row.code)
   expect(node).toMatchObject({name:row.name,value:row.value,evidenceKind:'fact',memberCodes:[row.code]})
   expect(Math.abs(row.components.reduce((a:number,b:number)=>a+b,0)-row.value)).toBeLessThanOrEqual(1)
   expect(node.evidence[0].locator).toContain(row.code)
  }
 })
 it('isolates historical products from the annual industry chart and US views',()=>{
  expect(macroScale(research,'us','cn-io2023')).toEqual([])
  expect(macroScale(research,'cn','missing')).toEqual([])
  const annual=scaleIndex(industryScale(research,'cn',2025))
  expect(annual.get('cn-manufacturing')!.value).toBe(346747)
  expect(annual.get('cn-gbt2017-39')!.value).toBeNull()
  expect([...annual.keys()].some(k=>k.startsWith('cn-io-'))).toBe(false)
  expect(scaleState(annual,new URLSearchParams('filter.scaleDetail=cn-io-manufacturing')).selected).toBe('')
 })
 it('expands all product tiers with the same denominator and reversible currency conversion',()=>{
  const roots=macroScale(research,'cn','cn-io2023'),index=scaleIndex(roots)
  expect(roots).toHaveLength(17)
  expect(roots.reduce((a,n)=>a+n.value!,0)).toBe(raw.total)
  const m=index.get('cn-io-manufacturing')!,p=index.get('cn-io-industry')!
  expect(m.children).toHaveLength(31)
  expect(scaleShare(m,p)).toBeCloseTo(m.value!/p.value!*100)
  const rows=scaleRows(roots,new Set(['cn-io-industry','cn-io-manufacturing']))
  expect(rows.filter(r=>!r.expanded).reduce((a,r)=>a+r.node.value!,0)).toBe(raw.total)
  expect(scaleAmount(m,{mode:'cny-100m',usdCny:6.71})).toBeCloseTo(m.value!/10000)
  expect(scaleAmount(m,{mode:'usd-million',usdCny:6.71})).toBeCloseTo(m.value!/100/6.71)
  expect([...index.values()].every(n=>n.year===2023&&n.country==='cn')).toBe(true)
  const sourceIds=new Set(scaleSources(research,'cn').map(s=>s.id))
  for(const node of index.values())for(const ref of node.evidence)expect(sourceIds.has(ref.sourceId)).toBe(true)
 })
 it('rejects country leakage, cycles, missing parents, repeated products and false sums',()=>{
  const mutate=(fn:(x:any)=>void)=>{const d=structuredClone(data);fn(d);expect(()=>validateMacroStructures(d)).toThrow()}
  mutate(d=>d.structures[0].currency='USD')
  mutate(d=>d.sources[0].country='us')
  mutate(d=>d.structures[0].nodes[0].parentId=d.structures[0].nodes[0].id)
  mutate(d=>d.structures[0].nodes[0].parentId='missing')
  mutate(d=>d.structures[0].nodes[0].value++)
  mutate(d=>d.structures[0].nodes.push({...d.structures[0].nodes.find((n:any)=>n.evidenceKind==='fact'),id:'cn-duplicate'}))
 })
 it('adds six industry-year observations from the revised yearbook without supplying employment',()=>{
  for(const [year,values] of [[2021,[312494.4,32012.1,25397.3]],[2022,[320609.1,38303.4,29739.1]]] as const){
   const node=industryScale(research,'cn',year).find(n=>n.id==='cn-industry')!
   expect(node.children.map(n=>n.value)).toEqual(values)
   // Published 2021 components sum to 369903.8 while the rounded parent is 369903.7.
   expect(Math.abs(node.children.reduce((s,n)=>s+n.value!,0)-node.value!)).toBeLessThanOrEqual(0.1000001)
   expect(node.children.every(n=>n.releaseDate===null&&n.evidence[0].locator.includes(String(year)))).toBe(true)
  }
 })
})
