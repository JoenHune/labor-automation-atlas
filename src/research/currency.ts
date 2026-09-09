import type {Observation} from './schema'
export const DEFAULT_USD_CNY=6.71
export type DisplayCurrency='cny-100m'|'usd-million'
export interface CurrencySettings {mode:DisplayCurrency;usdCny:number}
export const currencyLabels:Record<DisplayCurrency,string>={'cny-100m':'亿元人民币','usd-million':'百万美元'}
export const personCurrencyLabels:Record<DisplayCurrency,string>={'cny-100m':'元/人','usd-million':'美元/人'}
export function validExchangeRate(rate:number){return Number.isFinite(rate)&&rate>0}
export function moneyInBaseUnits(value:number|null|undefined,unit:string):number|null {
 if(value==null)return null
 const scale:Record<string,number>={'亿元':1e8,'亿元人民币':1e8,'人民币亿元':1e8,'百万美元':1e6,'USD million':1e6,'百万人民币':1e6,'万元':1e4,'元':1,'人民币元':1,'美元':1,'USD':1,'CNY':1}
 if(!(unit in scale))throw new Error('尚未定义金额单位换算：'+unit)
 return value*scale[unit]!
}
export function convertMoney(value:number|null|undefined,unit:string,currency:'CNY'|'USD',settings:CurrencySettings,perPerson=false):number|null {
 if(!validExchangeRate(settings.usdCny))throw new Error('汇率必须是大于零的有限数值')
 const base=moneyInBaseUnits(value,unit);if(base===null)return null
 const target=settings.mode==='cny-100m'?'CNY':'USD'
 const converted=currency===target?base:target==='CNY'?base*settings.usdCny:base/settings.usdCny
 return converted/(perPerson?1:settings.mode==='cny-100m'?1e8:1e6)
}
export function displayObservation(o:Observation|null|undefined,settings:CurrencySettings):number|null {
 if(!o)return null
 return o.currency?convertMoney(o.value,o.unit,o.currency,settings):o.value
}
export function formatAmount(value:number|null|undefined,digits=1){return value==null?'—':value.toLocaleString('zh-CN',{maximumFractionDigits:digits})}
export function currencyDisclosure(settings:CurrencySettings){return `显示换算：1 美元＝${settings.usdCny} 元人民币（可编辑假设，非实时汇率）；原始数据与排名不变。`}
