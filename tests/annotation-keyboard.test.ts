import {describe,expect,it} from 'vitest'
import {isAnnotationShortcut} from '../src/annotations/keyboard'
const key=(overrides:Partial<KeyboardEvent>={})=>({altKey:true,shiftKey:true,ctrlKey:false,metaKey:false,repeat:false,isComposing:false,key:'A',code:'KeyA',...overrides}) as KeyboardEvent
describe('annotation shortcut across keyboard layouts',()=>{
 it('accepts macOS Option characters and layouts without a physical code',()=>{
  expect(isAnnotationShortcut(key({key:'Å'}))).toBe(true)
  expect(isAnnotationShortcut(key({key:'a',code:''}))).toBe(true)
 })
 it.each([{altKey:false},{shiftKey:false},{ctrlKey:true},{metaKey:true},{repeat:true},{isComposing:true},{key:'B',code:'KeyB'}])('does not capture other commands or duplicate events: %j',change=>{
  expect(isAnnotationShortcut(key(change))).toBe(false)
 })
})
