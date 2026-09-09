import { describe,it,expect } from 'vitest'
import { AnchorSchema,StateChangeSchema, type Anchor } from '../src/annotations/schema'
import { fingerprint,resolveTargets,relativeRect,clusterMarkers } from '../src/annotations/anchors'
async function fixture() {
 const text='工业 416826 亿元',hash=await fingerprint(text)
 const anchor:Anchor={schema:1,id:'b461522f-9b34-4b6e-bb6f-7a1bbdc68c7d',country:'cn',page:'/cn/',researchVersion:'v1',targets:[{contentId:'cn-industry-row',kind:'text',fingerprint:hash,text:{exact:'416826',prefix:'工业',suffix:'亿元'},rect:{x:0.2,y:0.2,width:0.5,height:0.5},dataPoints:[]}],view:{year:2025,focus:null,sort:'value',filters:{}},selectedText:'416826',snapshotId:null,capturedAt:'2026-09-09T04:00:00.000Z'}
 return {anchor,block:{id:'cn-industry-row',fingerprint:hash,rect:{x:10,y:20,width:100,height:40},text},scope:{country:'cn',page:'/cn/',year:2025}}
}
describe('选区恢复避免错误挂载',()=>{
 it('换行和空白变化不改变内容指纹',async()=>expect(await fingerprint('工业\n416826   亿元')).toBe(await fingerprint('工业 416826 亿元')))
 it('排序与缩放跟随内容编号及相对坐标',async()=>{
  const {anchor,block,scope}=await fixture()
  const result=resolveTargets(anchor,[{...block,rect:{x:20,y:300,width:200,height:80}}],scope)
  expect(result).toMatchObject({status:'resolved',rects:[{x:60,y:316,width:100,height:40}]})
 })
 it('更新、删除、跨组件部分变化一律展示原快照而不部分挂载',async()=>{
  const {anchor,block,scope}=await fixture()
  expect(resolveTargets(anchor,[],scope).status).toBe('changed')
  expect(resolveTargets(anchor,[{...block,fingerprint:await fingerprint('工业 430000 亿元')}],scope).rects).toEqual([])
  anchor.targets.push({...anchor.targets[0],contentId:'cn-another'})
  expect(resolveTargets(anchor,[block],scope)).toMatchObject({status:'changed',rects:[]})
 })
 it('重复文本没有唯一上下文时不猜选区',async()=>{
  const {anchor,block,scope}=await fixture()
  block.text='416826 416826';block.fingerprint=await fingerprint(block.text)
  anchor.targets[0].fingerprint=block.fingerprint;anchor.targets[0].text={exact:'416826',prefix:'',suffix:''}
  expect(resolveTargets(anchor,[block],scope).status).toBe('changed')
 })
 it('年份/国家/页面不符拒绝恢复',async()=>{
  const {anchor,block,scope}=await fixture()
  expect(resolveTargets(anchor,[block],{...scope,year:2024}).status).toBe('wrong-view')
  expect(resolveTargets(anchor,[block],{...scope,country:'us'}).status).toBe('wrong-view')
  anchor.targets[0].contentId='us-industry-row'
  expect(AnchorSchema.safeParse(anchor).success).toBe(false)
 })
 it('筛选隐藏内容时提示视图不符；筛选键顺序与表格排序不破坏定位',async()=>{
  const {anchor,block,scope}=await fixture()
  anchor.view.filters={taskQuery:'清洁',taskStatus:'in-progress'}
  expect(resolveTargets(anchor,[],{...scope,filters:{taskQuery:'维修'}})).toMatchObject({status:'wrong-view',changed:[]})
  anchor.view.sort='name'
  expect(resolveTargets(anchor,[block],{...scope,filters:{taskStatus:'in-progress',taskQuery:'清洁',empty:''}}).status).toBe('resolved')
  expect(resolveTargets(anchor,[block],{...scope,focus:'cn-another',filters:anchor.view.filters}).status).toBe('wrong-view')
 })
 it('跨组件截取仅保留每个交集；重叠标记聚合',()=>{
  expect(relativeRect({x:80,y:0,width:40,height:30},{x:0,y:0,width:100,height:30})).toEqual({x:.8,y:0,width:.2,height:1})
  expect(clusterMarkers([{id:'a',x:0,y:0},{id:'b',x:10,y:0},{id:'c',x:100,y:0}]).map(g=>g.items.length)).toEqual([2,1])
 })
 it('关闭必须具备原因和说明',()=>expect(StateChangeSchema.safeParse({state:'closed',reason:null,explanation:'',idempotencyKey:'b461522f-9b34-4b6e-bb6f-7a1bbdc68c7d'}).success).toBe(false))
})
