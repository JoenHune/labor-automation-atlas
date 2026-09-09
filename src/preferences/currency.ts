import {computed,ref} from 'vue'
import {currencyLabels,currencyDisclosure,DEFAULT_USD_CNY,displayObservation,formatAmount,validExchangeRate,type DisplayCurrency,type CurrencySettings} from '../research/currency'
const mode=ref<DisplayCurrency>('cny-100m'),usdCny=ref(DEFAULT_USD_CNY)
const storageKey='atlas-currency-v1'
let ready=false
function apply(value:Partial<CurrencySettings>){if(value.mode==='cny-100m'||value.mode==='usd-million')mode.value=value.mode;if(typeof value.usdCny==='number'&&validExchangeRate(value.usdCny))usdCny.value=value.usdCny}
function restore(){
 if(typeof window==='undefined')return
 if(!ready){try{apply(JSON.parse(localStorage.getItem(storageKey)??'{}'))}catch{}ready=true}
 const q=new URLSearchParams(location.search)
 apply({mode:q.get('filter.currency') as DisplayCurrency,usdCny:q.has('filter.fx')?Number(q.get('filter.fx')):undefined})
}
function persist(){
 if(typeof window==='undefined')return
 const settings={mode:mode.value,usdCny:usdCny.value}
 try{localStorage.setItem(storageKey,JSON.stringify(settings))}catch{}
 const url=new URL(location.href);url.searchParams.set('filter.currency',settings.mode);url.searchParams.set('filter.fx',String(settings.usdCny));history.replaceState(null,'',url)
 window.dispatchEvent(new CustomEvent('atlas:currency-change'));window.dispatchEvent(new CustomEvent('atlas:view-change'))
}
export function setCurrency(next:Partial<CurrencySettings>){apply(next);persist()}
export function restoreCurrency(){restore();persist()}
export function useCurrency(){
 const settings=computed(()=>({mode:mode.value,usdCny:usdCny.value})),unit=computed(()=>currencyLabels[mode.value])
 return {mode,usdCny,settings,unit,disclosure:computed(()=>currencyDisclosure(settings.value)),value:(o:Parameters<typeof displayObservation>[0])=>displayObservation(o,settings.value),amount:(o:Parameters<typeof displayObservation>[0])=>formatAmount(displayObservation(o,settings.value))}
}
