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
 it('keeps intermediate levels unchanged and terminal children substantial beside their parent',()=>{
  const intermediate=orbitBands(root,new Set(singleOrbitBranch(root,'cn-io-manufacturing')))
  expect(orbitBandRadii(intermediate,2)).toEqual(orbitRadii(3,2))
  const bands=orbitBands(root,new Set(singleOrbitBranch(root,'cn-io-group-39'))),before=structuredClone(bands)
  const radius=orbitBandRadii(bands,3),original=orbitRadii(4,3),parent=orbitRadii(4,2)
  expect(radius.outer-radius.inner).toBeGreaterThan((parent.outer-parent.inner)*.7)
  expect(radius.outer-radius.inner).toBeLessThanOrEqual(original.outer-original.inner)
  expect(radius.inner-parent.outer).toBeLessThanOrEqual(1)
  expect(radius.inner).toBeGreaterThan(parent.outer)
  // Every sibling shares these radii: the annular area ratio is still the angular ratio.
  const areas=bands[3].map(s=>s.share*Math.PI*(radius.outer**2-radius.inner**2))
  expect(areas[0]/areas[1]).toBeCloseTo(bands[3][0].node.value!/bands[3][1].node.value!,10)
  expect(bands).toEqual(before)
 })
 it('limits the last zoom step and keeps the selected parent and children visible together',()=>{
  const id='cn-io-group-39',bands=orbitBands(root,new Set(singleOrbitBranch(root,id)))
  const parent=bands[2].find(s=>s.node.id===id)!,parentRadius=orbitBandRadii(bands,2),childRadius=orbitBandRadii(bands,3)
  for(const [w,h] of [[650,430],[354,354]]){
   const camera=orbitCamera(bands,id,w,h),previous=orbitCamera(bands.slice(0,3),parent.node.parentId!,w,h)
   expect(camera.zoom).toBeLessThanOrEqual(previous.zoom*2.2)
   const angle=(parent.start+parent.share/2)*2*Math.PI,unit=Math.min(w,h)/200
   for(const r of [parentRadius,childRadius]){
    const radius=(r.inner+r.outer)/2*unit
    const x=w/2+camera.x*w+Math.sin(angle)*radius*camera.zoom
    const y=h/2+camera.y*h-Math.cos(angle)*radius*camera.zoom
    expect(x).toBeGreaterThan(24);expect(x).toBeLessThan(w-24)
    expect(y).toBeGreaterThan(24);expect(y).toBeLessThan(h-24)
   }
   // An earlier ancestor remains visible below the selected pair.
   const ancestor=orbitBandRadii(bands,1),r=(ancestor.outer-.5)*unit
   const y=h/2+camera.y*h-Math.cos(angle)*r*camera.zoom
   expect(y).toBeGreaterThan(h/2);expect(y).toBeLessThan(h)
  }
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
