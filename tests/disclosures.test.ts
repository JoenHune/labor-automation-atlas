import {describe,it,expect} from 'vitest'
import {DisclosureStateSchema,AnchorSchema,type Anchor} from '../src/annotations/schema'
import {disclosurePlan,type DisclosureBlock} from '../src/annotations/disclosures'
const hash='a'.repeat(64),otherHash='b'.repeat(64)
const panel={id:'cn-disclosure-one',fingerprint:hash,open:true}
const block={...panel,element:{} as HTMLDetailsElement}
const anchor:Anchor={schema:1,id:'b461522f-9b34-4b6e-bb6f-7a1bbdc68c7d',country:'cn',page:'/cn/',researchVersion:'v1',targets:[{contentId:'cn-row',kind:'block',fingerprint:hash,text:null,rect:{x:0,y:0,width:1,height:1},dataPoints:[]}],view:{year:2025,focus:null,sort:null,filters:{}},selectedText:'',snapshotId:null,capturedAt:'2026-09-09T04:00:00.000Z'}
describe('disclosure state is recoverable without positional guesses',()=>{
 it('keeps existing anchors without adding metadata they never recorded',()=>{
  expect(AnchorSchema.parse(anchor)).toEqual(anchor)
  expect(AnchorSchema.parse({...anchor,view:{...anchor.view,disclosures:[panel]}}).view.disclosures).toEqual([panel])
 })
 it('rejects duplicate and cross-country panel identities',()=>{
  for(const disclosures of [[panel,panel],[{...panel,id:'us-disclosure-one'}]])expect(AnchorSchema.safeParse({...anchor,view:{...anchor.view,disclosures}}).success).toBe(false)
 })
 it('does not accept an arbitrary script selector, oversized list or invalid fingerprint',()=>{
  expect(DisclosureStateSchema.safeParse({...panel,id:'details > *'}).success).toBe(false)
  expect(DisclosureStateSchema.safeParse({...panel,fingerprint:'not-a-hash'}).success).toBe(false)
  expect(AnchorSchema.safeParse({...anchor,view:{...anchor.view,disclosures:Array.from({length:129},(_,i)=>({...panel,id:'cn-disclosure-'+i}))}}).success).toBe(false)
 })
 it('matches by identity and content even when panels are reordered',()=>{
  const second={...block,id:'cn-disclosure-two',fingerprint:otherHash}
  expect(disclosurePlan([panel,second],[second,block])).toEqual([block,second])
 })
 it('refuses an entire plan if one panel changed, disappeared or became ambiguous',()=>{
  for(const blocks of [[],[{...block,fingerprint:otherHash}],[block,block]])expect(disclosurePlan([panel],blocks)).toBeNull()
  expect(disclosurePlan([panel,{...panel,id:'cn-disclosure-missing'}],[block])).toBeNull()
  expect(disclosurePlan([panel,panel],[block])).toBeNull()
 })
 it('makes a read-only plan; opening is reserved for explicit restoration',()=>{
  const closed={...block,open:false},before=JSON.stringify(closed)
  expect(disclosurePlan([panel],[closed])).toEqual([closed]);expect(JSON.stringify(closed)).toBe(before)
  expect(disclosurePlan([],[] as DisclosureBlock[])).toEqual([])
 })
})
