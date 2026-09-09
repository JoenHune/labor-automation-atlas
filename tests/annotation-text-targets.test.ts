import {describe,expect,it} from 'vitest'
import {ownedTargetId,unambiguousTargets,quoteForSpan,assertTextCoverage} from '../src/annotations/text-targets'
import {fingerprint,normalizeText,quoteMatches,resolveTargets} from '../src/annotations/anchors'
import {AnchorSchema,type Anchor} from '../src/annotations/schema'

describe('nested annotation ownership and text capture policy',()=>{
 it('derives parent text identity from the semantic owner, independently of payload or layout',async()=>{
  const first=await ownedTargetId('us-con-drywall-005-alternatives','text')
  expect(first).toBe(await ownedTargetId('us-con-drywall-005-alternatives','text'))
  expect(first).not.toBe(await ownedTargetId('us-con-drywall-005-barriers','text'))
  expect(first).not.toBe('us-con-drywall-005-alternatives')
 })
 it('does not collapse long owner IDs with equal truncated prefixes',async()=>{
  const a=await ownedTargetId('cn-'+ 'a'.repeat(175)+'x','text'),b=await ownedTargetId('cn-'+'a'.repeat(175)+'y','text')
  expect(a.length).toBeLessThanOrEqual(180);expect(b.length).toBeLessThanOrEqual(180)
  expect(a).not.toBe(b);expect(a).toMatch(/^cn-/)
 })
 it('repeated images under the same owner remain ambiguous; different semantic owners do not',async()=>{
  const key=JSON.stringify({src:'/same.png',semanticId:null}),same=await ownedTargetId('cn-task-a','image',key),other=await ownedTargetId('cn-task-b','image',key)
  const targets=[{id:same,which:'first'},{id:other,which:'other owner'},{id:same,which:'second'}]
  expect(unambiguousTargets(targets)).toEqual([{id:other,which:'other owner'}])
  expect(unambiguousTargets([...targets].reverse())).toEqual([{id:other,which:'other owner'}])
 })
 it('an explicit image semantic key can distinguish equal resources without using row order',async()=>{
  expect(await ownedTargetId('cn-owner','image',JSON.stringify({src:'/a.png',semanticId:'before'}))).not.toBe(await ownedTargetId('cn-owner','image',JSON.stringify({src:'/a.png',semanticId:'after'})))
 })
 it('keeps all unique targets and their order while rejecting every duplicate, including equal payloads',()=>{
  const targets=[{id:'a',text:'相同'},{id:'b',text:'相同'},{id:'c',text:'不同'}]
  expect(unambiguousTargets(targets)).toEqual(targets)
  expect(unambiguousTargets([targets[0],targets[0],targets[1]])).toEqual([targets[1]])
 })
 it('creates a unique quote using content context for repeated words',()=>{
  const text='准备：检查。 交付：检查。',start=text.lastIndexOf('检查'),quote=quoteForSpan(text,start,start+2)!
  expect(quote.exact).toBe('检查');expect(quoteMatches(text,quote)).toEqual([start])
  expect(quoteMatches('准备：检查。\n交付：检查。',quote)).toEqual([start])
 })
 it('refuses repeated content when the stored context window cannot uniquely identify it',()=>{
  const unit='前'.repeat(100)+'检查'+'后'.repeat(100),text=unit+' '+unit,start=100
  expect(quoteForSpan(text,start,start+2)).toBeNull()
 })
 it.each([[-1,2],[0,20],[2,2],[2,1],[0.5,2]])('rejects invalid quote bounds %s..%s',(start,end)=>expect(quoteForSpan('检查',start,end)).toBeNull())
 it('accepts complete ownership across separate components without depending on target iteration order',()=>{
  const heading={},firstBody={},secondBody={}
  expect(()=>assertTextCoverage([heading,firstBody,secondBody],[[heading],[secondBody],[firstBody]])).not.toThrow()
 })
 it('rejects an unmapped heading even when the child body produced a valid target',()=>{
  const heading={},body={}
  expect(()=>assertTextCoverage([heading,body],[[body]])).toThrow('未能唯一定位')
 })
 it('rejects unmapped text and parent/child overlap rather than treating either as whitespace',()=>{
  const node={}
  expect(()=>assertTextCoverage([node],[])).toThrow('草稿正文会保留')
  expect(()=>assertTextCoverage([node],[[node],[node]])).toThrow('未能唯一定位')
  expect(()=>assertTextCoverage([],[])).toThrow()
 })
 it('multiple characters in one text node do not create artificial duplicate owners',()=>{
  const node={}
  expect(()=>assertTextCoverage([node],[[node,node,node]])).not.toThrow()
 })
 it('restores parent-owned and leaf targets together, preserving the leaf fingerprint contract',async()=>{
  const owner='us-con-drywall-005-alternatives',text='替代方案与残留人工',parentId=await ownedTargetId(owner,'text')
  const semantic=(text:string)=>fingerprint(JSON.stringify({text,points:[],image:null}))
  const parentHash=await semantic(text),leafText='专机\n带条件的方案',leafHash=await semantic(normalizeText(leafText))
  const anchor:Anchor=AnchorSchema.parse({schema:1,id:'b461522f-9b34-4b6e-bb6f-7a1bbdc68c7d',country:'us',page:'/us/tasks/us-con-drywall-005',researchVersion:'v1',targets:[{contentId:parentId,kind:'text',fingerprint:parentHash,text:quoteForSpan(text,0,text.length),rect:{x:0,y:0,width:1,height:1},dataPoints:[]},{contentId:owner+'-0',kind:'text',fingerprint:leafHash,text:{exact:'方案',prefix:'带条件的',suffix:''},rect:{x:0,y:0,width:1,height:1},dataPoints:[]}],view:{year:null,focus:null,sort:null,filters:{}},selectedText:text+' 专机带条件的方案',snapshotId:null,capturedAt:'2026-09-09T04:00:00.000Z'})
  const blocks=[{id:parentId,fingerprint:parentHash,text,rect:{x:10,y:20,width:200,height:30}},{id:owner+'-0',fingerprint:leafHash,text:leafText,rect:{x:10,y:100,width:200,height:80}}]
  const scope={country:'us',page:anchor.page,year:null}
  expect(resolveTargets(anchor,[blocks[1],blocks[0]],scope).status).toBe('resolved')
  expect(resolveTargets(anchor,[blocks[0]],scope)).toMatchObject({status:'changed',rects:[]})
  expect(resolveTargets(anchor,[{...blocks[0],fingerprint:await semantic('变更标题')},blocks[1]],scope)).toMatchObject({status:'changed',rects:[]})
 })
})
