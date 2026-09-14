import {describe,expect,it} from 'vitest'
import {selectionToolbarPosition} from '../src/annotations/selection-toolbar'

const desktop={width:1280,height:900},toolbar={width:284,height:90}
describe('content selection toolbar positioning',()=>{
 it('appears beside the selection and switches to the left near the right edge',()=>{
  expect(selectionToolbarPosition({x:200,y:180,width:160,height:30},desktop,toolbar)).toMatchObject({left:372,top:180})
  expect(selectionToolbarPosition({x:980,y:240,width:160,height:30},desktop,toolbar)).toMatchObject({left:684,top:240})
 })
 it('places a full-width selection below its content, or above near the viewport bottom',()=>{
  expect(selectionToolbarPosition({x:20,y:180,width:1160,height:30},desktop,toolbar)).toMatchObject({left:20,top:222})
  expect(selectionToolbarPosition({x:20,y:830,width:1160,height:30},desktop,toolbar)).toMatchObject({left:20,top:728})
 })
 it('keeps narrow and expanded controls inside the visible viewport',()=>{
  const mobile={width:320,height:568}
  const position=selectionToolbarPosition({x:24,y:400,width:275,height:120},mobile,{width:284,height:380})!
  expect(position.left).toBeGreaterThanOrEqual(8)
  expect(position.left+284).toBeLessThanOrEqual(312)
  expect(position.top).toBeGreaterThanOrEqual(72)
  expect(position.top+380).toBeLessThanOrEqual(560)
  expect(position.maxWidth).toBe(304)
  expect(position.maxHeight).toBe(488)
 })
 it('keeps controls on screen when a tall selection is partially scrolled away',()=>{
  expect(selectionToolbarPosition({x:200,y:-100,width:160,height:300},desktop,toolbar)).toMatchObject({left:372,top:72})
 })
 it.each([
  {x:100,y:10,width:100,height:20},
  {x:100,y:900,width:100,height:20},
  {x:1280,y:180,width:100,height:20},
  {x:-200,y:180,width:100,height:20}
 ])('hides controls after the selected content leaves the viewport: %j',selection=>{
  expect(selectionToolbarPosition(selection,desktop,toolbar)).toBeNull()
 })
})
