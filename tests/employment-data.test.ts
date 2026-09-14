import {readFileSync,existsSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {describe,it,expect} from 'vitest'
import type {Research,EmploymentDataset} from '../src/research/schema'
import {employmentView,validateEmployment,employmentGroups} from '../src/research/employment'
import {orbitRoot,orbitLayer} from '../src/research/orbit'
import {scaleIndex} from '../src/research/industry-scale'
const research=JSON.parse(readFileSync('data/site.json','utf8')) as Research
const data=JSON.parse(readFileSync('research/employment/dataset.json','utf8')) as EmploymentDataset
const roots=(['cn','us'] as const).flatMap(country=>[2021,2022,2023,2024,2025].map(year=>({basis:'annual-industry',root:orbitRoot(research,country,year)})))
roots.push({basis:'cn-io2023',root:orbitRoot(research,'cn',2023,'cn-io2023')})

describe('发布就业研究的完整性与统计边界',()=>{
 it('当前运行时树的所有节点年均有定义匹配的研究，所有算式复算通过',()=>{
  validateEmployment(data)
  const keys=new Set<string>()
  for(const {basis,root} of roots){
   const index=scaleIndex([root])
   for(const n of [...index.values()])for(const r of orbitLayer(n).sectors.filter(c=>c.kind==='remainder'))index.set(r.id,r)
   for(const node of index.values()){
    const view=employmentView(data,node,basis)
    expect(view.record,node.id+'|'+node.year).not.toBeNull();expect(view.stale,node.id).toBe(false)
    keys.add(view.record!.id)
    if(view.record!.employment.status==='estimated')expect(view.record!.employment.modelBasis,node.id).toBeTruthy()
    if(view.count===null){expect(view.reason,node.id).toBeTruthy();expect(view.record!.employment.evidence.length,node.id).toBeGreaterThan(0)}
   }
  }
  expect(keys.size).toBe(data.records.length)
 })
 it('211末级产品只计一次并与每个父级就业加总一致',()=>{
  const root=roots.find(r=>r.basis==='cn-io2023')!.root,nodes=[...scaleIndex([root]).values()]
  const value=(node:typeof root)=>employmentView(data,node,'cn-io2023').count!
  expect(nodes.filter(n=>!n.children.length)).toHaveLength(211)
  for(const parent of nodes.filter(n=>n.children.length))expect(parent.children.reduce((sum,n)=>sum+value(n),0)).toBeCloseTo(value(parent),4)
  expect(value(root)).toBeCloseTo(740410000,4)
 })
 it('中美含住房服务的宏观比值独立成组，自住住房及关税不编造分母',()=>{
  for(const country of ['cn','us'] as const){
   const root=orbitRoot(research,country,2025),index=scaleIndex([root]),housing=index.get(country+'-real-estate')!,industry=index.get(country==='cn'?'cn-industry':'us-manufacturing')!
   const h=employmentView(data,housing),i=employmentView(data,industry)
   expect(h.productivity).not.toBeNull();expect(h.record?.pairing.scopeNote).toContain('住房资本服务')
   expect(employmentGroups([h,i],'productivity').groups).toHaveLength(2)
  }
  for(const id of ['us-real-estate-uva-131','us-wholesale-uva-83'])for(const r of data.records.filter(r=>r.nodeId===id)){expect(r.employment.value).toBeNull();expect(r.pairing.status).toBe('not-applicable')}
 })
 it('发布中保留的官方档案与来源哈希一致',()=>{
  let checked=0
  for(const source of data.sources){
   if(typeof source.archive!=='string'||typeof source.sha256!=='string')continue
   expect(existsSync(source.archive),source.id).toBe(true)
   expect(createHash('sha256').update(readFileSync(source.archive)).digest('hex'),source.id).toBe(source.sha256);checked++
  }
  expect(checked).toBeGreaterThan(40)
 })
})
