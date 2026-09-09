import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {describe,it,expect} from 'vitest'
import {importUsServices} from '../src/research/import-us-services'
import {validateResearch} from '../src/research/validate'
import type {Research} from '../src/research/schema'
const read=(file:string)=>JSON.parse(readFileSync(new URL('../'+file,import.meta.url),'utf8'))
const sha=(file:string)=>createHash('sha256').update(readFileSync(new URL('../'+file,import.meta.url))).digest('hex')
const file='research/automation/us-services.json',auditFile='research/automation/us-services-search-audit.json',reviewFile='research/reviews/us-services-automation-decisions.json'
const raw=read(file),audit=read(auditFile),review=read(reviewFile),provenance={file,sha256:sha(file),auditFile,auditSha256:sha(auditFile),reviewFile,reviewSha256:sha(reviewFile)}
const fixture=()=>read('data/research.json') as Research
describe('美国服务业经审校研究接入',()=>{
 it('保留372项逐任务查询与原子来源声明，全球产品资料不升级为美国持续运行',()=>{
  const result=validateResearch(importUsServices(fixture(),raw,audit,review,provenance))
  const selected=result.tasks.filter(t=>raw.tasks.some((r:any)=>r.id.toLowerCase()===t.id))
  expect(selected).toHaveLength(372)
  expect(selected.every(t=>t.country==='us'&&t.researchStatus==='in-progress'&&t.searchIds.length===2)).toBe(true)
  expect(selected.flatMap(t=>t.searchIds).map(id=>result.searches.find(s=>s.id===id)).every(s=>s?.results.length===0&&s.audit?.sha256===provenance.auditSha256)).toBe(true)
  const cash=selected.find(t=>t.id==='us-fi-cash-t01')!,claim=result.claims.find(c=>c.id===cash.alternatives[0].claimIds[0])!
  expect(claim.text).toContain('连续进钞、鉴别、分类和盒内储存')
  expect(claim.text).toContain('没有期初票据和历史账面余额完整核对证据')
  expect(claim.text).not.toContain('请按所列来源')
  expect(claim.deployment).toBe('vendor-report')
  expect(claim.conditions).toContain('来源范围：global-product-US-market')
  expect(claim.evidence[0].locator).toContain('124')
  const details=cash.dossier?.publicResearch as any
  expect(details.canFreeze).toBe(false)
  expect(details.economics).toMatchObject({currency:'USD',incrementalEnergyWater:null,paybackYears:null,npv:null})
  expect(details.economics.periodFormula).toContain('incremental_energy_water')
  const price=selected.find(t=>t.id==='us-rt-stock-t09-b')!
  const priceClaims=price.alternatives.flatMap(a=>a.claimIds).map(id=>result.claims.find(c=>c.id===id)!)
  expect(priceClaims.some(c=>c.evidence.some(e=>e.sourceId.endsWith('uss-e-badger')&&e.locator.includes('30')))).toBe(true)
 })
 it('拒绝国家、执行范围、阶段和清单变化造成的旧研究错挂',()=>{
  for(const mutate of [(t:any)=>{t.country='cn'},(t:any)=>{t.boundary='其他执行单位'},(t:any)=>{t.discovery.inputSha256='changed'},(t:any)=>{t.dossier.originalTask.phase='交付'}]) {
   const data=fixture();mutate(data.tasks.find(t=>t.id===raw.tasks[0].id.toLowerCase()))
   expect(()=>importUsServices(data,raw,audit,review,provenance)).toThrow()
  }
 })
 it('阻止未执行或重复查询、缺失原文声明和未绑定现金参数',()=>{
  const unexecuted=structuredClone(audit);unexecuted.requests[0].status='planned'
  expect(()=>importUsServices(fixture(),raw,unexecuted,review,provenance)).toThrow('查询未执行')
  const duplicate=structuredClone(audit);duplicate.requests[0].queries.push(duplicate.requests[0].queries[0])
  expect(()=>importUsServices(fixture(),raw,duplicate,review,provenance)).toThrow('重复')
  const noClaim=structuredClone(raw);noClaim.sources[0].locators[0].claim=''
  expect(()=>importUsServices(fixture(),noClaim,audit,review,provenance)).toThrow('原文声明')
  const numbers=structuredClone(raw);numbers.tasks[0].economics.paybackYears=2
  expect(()=>importUsServices(fixture(),numbers,audit,review,provenance)).toThrow('现金流数值')
 })
})
