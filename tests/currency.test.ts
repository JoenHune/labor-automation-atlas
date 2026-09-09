import {describe,it,expect} from 'vitest'
import {convertMoney,displayObservation,DEFAULT_USD_CNY,validExchangeRate} from '../src/research/currency'
import type {Observation} from '../src/research/schema'
import type {Research} from '../src/research/schema'
import {chartRecord} from '../src/research/chart-export'
const cny={mode:'cny-100m' as const,usdCny:DEFAULT_USD_CNY},usd={mode:'usd-million' as const,usdCny:DEFAULT_USD_CNY}
describe('global currency display keeps canonical amounts intact',()=>{
 it('converts 100 million CNY to million USD and reverses exactly within arithmetic precision',()=>{
  expect(convertMoney(6.71,'亿元','CNY',usd)).toBeCloseTo(100)
  expect(convertMoney(100,'百万美元','USD',cny)).toBeCloseTo(6.71)
  expect(convertMoney(100,'百万美元','USD',usd)).toBe(100)
  expect(convertMoney(100,'USD million','USD',cny)).toBeCloseTo(6.71)
  expect(convertMoney(6.71,'亿元','CNY',cny)).toBe(6.71)
 })
 it('uses the editable rate and keeps null and zero distinct',()=>{
  expect(convertMoney(7,'亿元','CNY',{...usd,usdCny:7})).toBeCloseTo(100)
  expect(convertMoney(null,'亿元','CNY',usd)).toBeNull()
  expect(convertMoney(0,'亿元','CNY',usd)).toBe(0)
 })
 it('converts per-person money in base currency units rather than million units',()=>{
  expect(convertMoney(67100,'元','CNY',usd,true)).toBeCloseTo(10000)
  expect(convertMoney(10000,'美元','USD',cny,true)).toBe(67100)
 })
 it.each([0,-1,NaN,Infinity,-Infinity])('rejects invalid exchange rate %s',rate=>{
  expect(validExchangeRate(rate)).toBe(false)
  expect(()=>convertMoney(1,'亿元','CNY',{...usd,usdCny:rate})).toThrow('汇率')
 })
 it('rejects unknown amount units instead of guessing',()=>expect(()=>convertMoney(1,'未知倍数','CNY',usd)).toThrow('单位'))
 it('does not convert percentage observations or mutate their source records',()=>{
  const growth={value:4.5,currency:null,unit:'%'} as Observation
  const value={value:100,currency:'USD',unit:'百万美元'} as Observation
  const before=structuredClone(value)
  expect(displayObservation(growth,cny)).toBe(4.5)
  expect(displayObservation(value,cny)).toBeCloseTo(6.71)
  expect(value).toEqual(before)
 })
 it('exports raw source values alongside reproducible display values and the selected rate',()=>{
  const point={id:'cn-test-2025',country:'cn',industryId:'cn-test',value:6.71,currency:'CNY',unit:'亿元',evidence:[]} as unknown as Observation
  const missing={...point,id:'cn-test-2024',value:null}
  const research={version:'test',checkedAt:'2026-09-09',countries:[],industries:[],sources:[]} as unknown as Research
  const exported=chartRecord(research,'cn','test',[point,missing],usd)
  expect(exported.observations).toEqual([point,missing])
  expect(exported.display?.usdCny).toBe(6.71)
  expect(exported.display?.values[0].value).toBeCloseTo(100)
  expect(exported.display?.values[1].value).toBeNull()
  expect(exported.display?.values.every(v=>v.unit==='百万美元')).toBe(true)
 })
})
