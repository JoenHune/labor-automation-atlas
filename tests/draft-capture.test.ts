import {describe,it,expect} from 'vitest'
import {captureDraftSelection} from '../src/annotations/draft-capture'
import type {Draft} from '../src/annotations/client'
import type {Anchor} from '../src/annotations/schema'

const anchor:Anchor={schema:1,id:'b461522f-9b34-4b6e-bb6f-7a1bbdc68c7d',country:'cn',page:'/cn/',researchVersion:'v1',targets:[{contentId:'cn-row',kind:'block',fingerprint:'a'.repeat(64),text:null,rect:{x:0,y:0,width:1,height:1},dataPoints:[]}],view:{year:2025,focus:null,sort:null,filters:{}},selectedText:'',snapshotId:null,capturedAt:'2026-09-10T03:00:00.000Z'}
const draft:Draft={id:'draft-one',country:'cn',page:'/cn/',kind:'new',body:'original comment',updatedAt:anchor.capturedAt,anchor:null,snapshot:null,annotationId:null,parentCommentId:null,state:'closed',reason:null,submitted:false}
const selection={anchor,snapshot:new Blob(['snapshot'],{type:'image/png'})}
function pending() {
 let current:Draft|null={...draft},finish!:(result:typeof selection)=>void,fail!:(error:Error)=>void
 const capture=new Promise<typeof selection>((resolve,reject)=>{finish=resolve;fail=reject})
 const result=captureDraftSelection(draft,()=>current,()=>capture)
 return {result,finish,fail,set:(value:Draft|null)=>current=value,current:()=>current}
}

describe('comments edited while a selection snapshot is being captured',()=>{
 it.each(['newly typed comment','original comment with additions',''])('keeps the latest text, including intentional deletion: %s',async body=>{
  const p=pending();p.set({...draft,body});p.finish(selection)
  expect(await p.result).toEqual({...draft,body,...selection})
  expect(draft.body).toBe('original comment')
 })
 it.each([
  ['closed draft',null],
  ['another draft',{...draft,id:'draft-two'}],
  ['another country',{...draft,country:'us' as const}],
  ['another page',{...draft,page:'/cn/other'}],
  ['reply',{...draft,kind:'reply' as const}],
  ['submitted draft',{...draft,submitted:true}]
 ] as const)('discards a late selection result for %s',async(_,current)=>{
  const p=pending();p.set(current);p.finish(selection)
  expect(await p.result).toBeNull()
  expect(p.current()).toEqual(current)
 })
 it('keeps text typed before a capture failure and never substitutes a stale snapshot',async()=>{
  const p=pending(),edited={...draft,body:'comment typed before snapshot failed'}
  p.set(edited);p.fail(new Error('snapshot failed'))
  await expect(p.result).rejects.toThrow('snapshot failed')
  expect(p.current()).toEqual(edited)
  expect(p.current()?.anchor).toBeNull();expect(p.current()?.snapshot).toBeNull()
 })
})
