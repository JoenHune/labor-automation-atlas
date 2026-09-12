import {readFileSync} from 'node:fs'
import {describe,it,expect} from 'vitest'
import type {Research} from '../src/research/schema'
import {orbitRoot,orbitBands} from '../src/research/orbit'
import {singleOrbitBranch,orbitCamera,wedgeBounds,orbitBandRadii,orbitRadii,orbitStrokeWidth,orbitMaxZoom} from '../src/research/orbit-camera'
const research=JSON.parse(readFileSync('data/site.json','utf8')) as Research
const root=orbitRoot(research,'cn',2025,'cn-io2023')
describe('one-path radial camera',()=>{
 it('opens only the chosen ancestor chain',()=>{
  expect(singleOrbitBranch(root,'cn-io-group-39')).toEqual(['cn-io-industry','cn-io-manufacturing','cn-io-group-39'])
  expect(singleOrbitBranch(root,'cn-io-wholesale-retail')).toEqual(['cn-io-wholesale-retail'])
  expect(singleOrbitBranch(root,'us-manufacturing')).toEqual([])
 })
 it('centers the selected wedge without changing its shape or angles',()=>{
  for(const id of ['cn-io-industry','cn-io-manufacturing','cn-io-group-39']){
   const bands=orbitBands(root,new Set(singleOrbitBranch(root,id))),before=structuredClone(bands)
   for(const [w,h] of [[650,430],[354,354]]){
    const view=orbitCamera(bands,id,w,h)
    expect(view.zoom).toBeGreaterThan(1)
    expect(view.zoom).toBeLessThanOrEqual(orbitMaxZoom)
    expect(Number.isFinite(view.x)&&Number.isFinite(view.y)).toBe(true)
   }
   expect(bands).toEqual(before)
  }
 })
 it('zooms a small deep direction more than its broad parent',()=>{
  const view=(id:string)=>orbitCamera(orbitBands(root,new Set(singleOrbitBranch(root,id))),id,650,430)
  expect(view('cn-io-group-39').zoom).toBeGreaterThan(view('cn-io-manufacturing').zoom)
  expect(view('cn-io-manufacturing').zoom).toBeGreaterThan(view('cn-io-industry').zoom)
  expect(view(root.id)).toEqual({zoom:1,x:0,y:0})
 })
 it('bounds cardinal extrema even when they fall inside a wedge',()=>{
  const b=wedgeBounds(.1,.3,50,100)
  expect(b.right).toBe(100)
  const full=wedgeBounds(0,1,50,100)
  expect(full.width).toBe(200);expect(full.height).toBe(200)
 })
 it('keeps broad intermediate levels unchanged and makes the terminal ring proportionate to its arc',()=>{
  const intermediate=orbitBands(root,new Set(singleOrbitBranch(root,'cn-io-manufacturing')))
  expect(orbitBandRadii(intermediate,2)).toEqual(orbitRadii(3,2))
  const bands=orbitBands(root,new Set(singleOrbitBranch(root,'cn-io-group-39'))),before=structuredClone(bands)
  const radius=orbitBandRadii(bands,3),original=orbitRadii(4,3),parent=orbitRadii(4,2)
  expect(radius.outer-radius.inner).toBeLessThan((original.outer-original.inner)/3)
  expect(radius.inner-parent.outer).toBeLessThan(.4)
  expect(radius.inner).toBeGreaterThan(parent.outer)
  // Every sibling shares these radii: the annular area ratio is still the angular ratio.
  const areas=bands[3].map(s=>s.share*Math.PI*(radius.outer**2-radius.inner**2))
  expect(areas[0]/areas[1]).toBeCloseTo(bands[3][0].node.value!/bands[3][1].node.value!,10)
  expect(bands).toEqual(before)
 })
 it('selecting large or tiny terminal siblings keeps exactly the same comparison camera',()=>{
  const id='cn-io-group-39',bands=orbitBands(root,new Set(singleOrbitBranch(root,id)))
  for(const [w,h] of [[650,430],[354,354]])for(const sector of bands.at(-1)!){
   expect(orbitCamera(bands,sector.node.id,w,h)).toEqual(orbitCamera(bands,id,w,h))
  }
  const annual=orbitRoot(research,'cn',2025),overview=orbitBands(annual,new Set())
  expect(orbitCamera(overview,'cn-wholesale-retail',650,430)).toEqual({zoom:1,x:0,y:0})
 })
 it('keeps separators at screen size and avoids consuming very small sectors',()=>{
  for(const zoom of [1,4,16,32])expect(orbitStrokeWidth(3,.03,160,zoom)*zoom).toBeCloseTo(.7)
  const share=.00003,radius=160
  expect(orbitStrokeWidth(3,share,radius,16)).toBeLessThan(share*2*Math.PI*radius/4)
  expect(orbitStrokeWidth(3,0,radius,16)).toBe(0)
 })
})
