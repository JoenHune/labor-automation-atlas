import {readFileSync} from 'node:fs'
import {describe,it,expect} from 'vitest'
import type {Research} from '../src/research/schema'
import {validateAnnualDetails} from '../src/research/annual-details'
import {industryScale,scaleIndex,scaleSources,scaleShare,scaleAmount} from '../src/research/industry-scale'
import {orbitRoot,restoreOrbit,canDrill} from '../src/research/orbit'

const research=JSON.parse(readFileSync('data/site.json','utf8')) as Research
const dataset=research.annualDetails!
const index=(year:number)=>scaleIndex(industryScale(research,'us',year))
describe('annual 2024/2025 details preserve periods, identity and official values',()=>{
 it('uses the eight construction types and the complete wholesale composition in 2024',()=>{
  const nodes=index(2024),building=nodes.get('us-construction')!,wholesale=nodes.get('us-wholesale')!
  expect(building.children).toHaveLength(8)
  expect(building.children.reduce((s,n)=>s+n.value!,0)).toBe(1305402)
  expect(wholesale.children).toHaveLength(11)
  expect(nodes.get('us-wholesale-uva-83')).toMatchObject({value:83587,releaseDate:'2025-09-25'})
  expect(nodes.get('us-wholesale-uva-83')!.name).toContain('关税')
  expect(building.children.every(n=>n.id.includes('-uva-'))).toBe(true)
  expect(wholesale.children.every(n=>n.id.includes('-uva-'))).toBe(true)
  expect(nodes.get('us-manufacturing')!.children).toHaveLength(19)
  expect(nodes.has('us-manufacturing-bea-13')).toBe(false)
 })
 it('preserves 2025 missing details instead of assigning 2024 values to them',()=>{
  const nodes=index(2025),missing=[...nodes.values()].filter(n=>n.parentId&&n.value===null)
  expect(missing).toHaveLength(80)
  expect(missing.every(n=>n.gap.includes('2024')&&n.gap.includes('2025'))).toBe(true)
  expect(nodes.get('us-real-estate-bea-62')!.value).toBeGreaterThan(0)
  expect(nodes.get('us-government-bea-92')!.value).toBeGreaterThan(0)
  expect(canDrill(nodes.get('us-construction')!)).toBe(false)
  expect(nodes.get('us-wholesale-uva-83')!.value).toBeNull()
 })
 it('retains old same-year values and country-specific sources, conversion and shares',()=>{
  for(const year of [2024,2025]){
   const current=index(year),old=scaleIndex(industryScale({...research,annualDetails:undefined},'us',year))
   for(const n of old.values())if(n.value!==null)expect(current.get(n.id)!.value,n.id).toBe(n.value)
   const sources=new Map(scaleSources(research,'us').map(s=>[s.id,s]))
   for(const n of current.values())for(const ref of n.evidence)expect(sources.get(ref.sourceId)!.country).toBe('us')
  }
  const duty=index(2024).get('us-wholesale-uva-83')!,parent=index(2024).get('us-wholesale')!
  expect(scaleShare(duty,parent)).toBeCloseTo(83587/1706289*100)
  expect(scaleAmount(duty,{mode:'cny-100m',usdCny:6.71})).toBeCloseTo(83587*6.71/100)
  expect(scaleShare(duty,index(2025).get('us-wholesale')!)).toBeNull()
  expect([...scaleIndex(industryScale(research,'cn',2024)).keys()].some(id=>id.startsWith('us-'))).toBe(false)
 })
 it('restores valid detail links and does not restore another country or a missing-year drill',()=>{
  const q=new URLSearchParams('filter.orbitFocus=us-construction&filter.orbitDetail=us-construction-uva-22')
  expect(restoreOrbit(orbitRoot(research,'us',2024),q)).toEqual({focus:'us-construction',detail:'us-construction-uva-22'})
  expect(restoreOrbit(orbitRoot(research,'us',2025),q).detail).toBe('')
  expect(restoreOrbit(orbitRoot(research,'cn',2024),q).detail).toBe('')
 })
 it('blocks corrupt hierarchies, stale parent totals, wrong currency, and evidence swaps',()=>{
  expect(()=>validateAnnualDetails(dataset)).not.toThrow()
  const sample=()=>({...structuredClone(dataset),branches:[structuredClone(dataset.branches.find(b=>b.parentId==='us-construction'&&b.year===2024)!)]})
  let d=sample();d.branches[0].nodes[0].value!+=100;expect(()=>validateAnnualDetails(d)).toThrow('不能核对')
  d=sample();d.branches[0].nodes[0].parentId=d.branches[0].nodes[0].id;expect(()=>validateAnnualDetails(d)).toThrow('循环')
  d=sample();d.branches[0].nodes[0].parentId='us-missing';expect(()=>validateAnnualDetails(d)).toThrow('父节点缺失')
  d=sample();d.branches[0].currency='CNY';expect(()=>validateAnnualDetails(d)).toThrow('币种')
  d=sample();d.branches[0].nodes[0].evidence[0].sourceId='cn-nbs-annual-industry-checked-2026-09-14';expect(()=>validateAnnualDetails(d)).toThrow('国家串入')
  d=sample();d.branches[0].parentValue+=1;expect(()=>industryScale({...research,annualDetails:d},'us',2024)).toThrow('当前版本不一致')
 })
})
