import {readFileSync} from 'node:fs'
import {describe,it,expect} from 'vitest'
import {ProductivityDatasetSchema} from '../src/research/schema'
import {productivityView,productivityDisplay,validateProductivityDataset} from '../src/research/productivity'
const read=(country:string)=>ProductivityDatasetSchema.parse(JSON.parse(readFileSync(`research/${country}/subindustry-productivity.json`,'utf8')))
const cn=read('cn'),us=read('us')
describe('official subindustry data works with the published calculation model',()=>{
 it('covers each country separately and leaves every 2025 denominator gap unranked',()=>{
  for(const [country,data,count] of [['cn',cn,10],['us',us,11]] as const){
   validateProductivityDataset(data);expect(data.parents).toHaveLength(count)
   for(const p of data.parents){
    expect(p.country).toBe(country)
    const view=productivityView(data,country,p.parentIndustryId,2025,'productivity',2025)
    expect(view.groups).toEqual([])
    expect(view.rows.every(r=>r.productivityBase===null)).toBe(true)
   }
  }
 })
 it('uses annual VA and year-end persons for the compatible Chinese historical subgroup',()=>{
  const view=productivityView(cn,'cn','cn-agriculture',2025,'productivity',2024)
  expect(view.historical).toBe(true);expect(view.groups).toHaveLength(1)
  const row=view.groups[0].rows[0]
  expect(row.row.employment.denominatorKind).toBe('persons')
  expect(row.row.employment.periodBasis).toBe('year-end')
  expect(row.productivityBase).toBeCloseTo(91636*1e8/(16298*1e4),7)
  expect(productivityDisplay(row,{mode:'usd-million',usdCny:6.71}).productivity).toBeCloseTo(row.productivityBase!/6.71,7)
  expect(view.unranked.some(r=>r.row.name==='农林牧渔专业及辅助性活动')).toBe(true)
 })
 it('produces different real manufacturing leaders for VA and VA per job',()=>{
  const perJob=productivityView(us,'us','us-manufacturing',2025,'productivity',2022)
  const value=productivityView(us,'us','us-manufacturing',2025,'value',2022)
  expect(perJob.groups[0].rows).toHaveLength(19)
  expect(perJob.groups[0].rows[0].row.nameEn).toBe('Petroleum and coal products')
  expect(perJob.groups[0].rows[0].productivityBase).toBeCloseTo(231030*1e6/110900,6)
  expect(value.groups[0].rows[0].row.nameEn).toBe('Chemical products')
  expect(value.groups[0].rows[0].valueAddedBase).toBe(509453*1e6)
 })
 it('retains disjoint employment sum inputs and VA difference inputs after schema normalization',()=>{
  const sums=us.parents.flatMap(p=>p.rows).filter(r=>r.employment.calculation?.kind==='sum-of-official-disjoint-rows')
  expect(sums).toHaveLength(16)
  for(const row of sums)expect(row.employment.calculation!.inputs.reduce((a,b)=>a+b,0)).toBe(row.employment.value)
  const differences=cn.parents.flatMap(p=>p.rows).filter(r=>r.valueAdded.evidenceKind==='calculation')
  expect(differences).toHaveLength(3)
  for(const row of differences){const values=row.valueAdded.computation!.inputs;expect(values[0]-values[1]).toBeCloseTo(row.valueAdded.value!,6)}
 })
 it('retains government employee counts but withholds ratios when annual timing is unverified',()=>{
  const government=productivityView(us,'us','us-government',2025,'productivity',2024)
  expect(government.groups).toEqual([])
  expect(government.unranked).toHaveLength(2)
  expect(government.unranked.every(r=>r.row.employment.periodBasis==='unknown' && r.row.employment.value!==null && r.productivityBase===null)).toBe(true)
  const privateServices=productivityView(us,'us','us-professional',2025,'productivity',2024)
  expect(privateServices.groups).toEqual([])
 })
})
