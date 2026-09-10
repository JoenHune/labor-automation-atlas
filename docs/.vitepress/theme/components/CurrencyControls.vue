<script setup lang="ts">
import {onMounted,onBeforeUnmount,ref,watch} from 'vue'
import {useRoute} from 'vitepress'
import {restoreCurrency,setCurrency,useCurrency} from '../../../../src/preferences/currency'
import {validExchangeRate,DEFAULT_USD_CNY,type DisplayCurrency} from '../../../../src/research/currency'
const {mode,usdCny,unit}=useCurrency(),route=useRoute(),open=ref(false),draft=ref(String(usdCny.value)),error=ref('')
function restore(){restoreCurrency();draft.value=String(usdCny.value)}
function changeMode(event:Event){setCurrency({mode:(event.target as HTMLSelectElement).value as DisplayCurrency})}
function save(){const rate=Number(draft.value);if(!draft.value.trim()||!validExchangeRate(rate)){error.value='请输入大于零的汇率';return}error.value='';setCurrency({usdCny:rate})}
function reset(){draft.value=String(DEFAULT_USD_CNY);save()}
watch(()=>route.path,()=>{restore();open.value=false})
onMounted(()=>{restore();window.addEventListener('popstate',restore)})
onBeforeUnmount(()=>window.removeEventListener('popstate',restore))
</script>
<template>
 <div class="currency-settings" data-annotation-ui @keydown.esc="open=false">
  <button class="currency-toggle" aria-controls="currency-panel" :aria-expanded="open" @click="open=!open">{{unit}} <span aria-hidden="true">⌄</span></button>
  <div v-if="open" id="currency-panel" class="currency-panel">
   <label>全站金额单位<select :value="mode" aria-label="全站金额单位" @change="changeMode"><option value="cny-100m">亿元人民币</option><option value="usd-million">百万美元</option></select></label>
   <label for="currency-rate">1 美元兑换人民币<input id="currency-rate" :value="draft" @input="draft=($event.target as HTMLInputElement).value" type="number" min="0.000001" step="any" inputmode="decimal" @keydown.enter.prevent="save"/></label>
   <div class="actions"><button @click="save">应用汇率</button><button @click="reset">恢复 6.71</button><button @click="open=false">收起</button></div>
   <p v-if="error" role="alert">{{error}}</p><p>当前 1 美元＝{{usdCny}} 元人民币。换算假设可编辑，非实时汇率；原始口径保留在数据详情中。</p>
  </div>
 </div>
</template>
<style scoped>
:global(.VPNav:has(.currency-panel)){z-index:89}
.currency-panel{white-space:normal;overflow-wrap:anywhere}
.currency-settings{position:relative;margin-left:14px;font-size:12px;line-height:1.5;color:#334155}.currency-toggle{cursor:pointer;border:1px solid #cbd5e1;border-radius:6px;padding:5px 9px;background:white;white-space:nowrap}.currency-panel{position:absolute;right:0;top:calc(100% + 12px);width:292px;max-width:calc(100vw - 28px);padding:18px;border:1px solid #d5deeb;border-radius:10px;background:white;box-shadow:0 12px 36px #15273b22;z-index:80}.currency-panel label{display:grid;gap:6px;margin-bottom:12px;font-weight:600}.currency-panel input,.currency-panel select{border:1px solid #cbd5e1;border-radius:6px;padding:8px;background:white;width:100%;color:#17243a}.actions{display:flex;gap:14px;flex-wrap:wrap}.actions button{color:#245cb5;cursor:pointer;text-decoration:underline}.currency-panel p{margin:12px 0 0;color:#64748b;font-size:12px;font-weight:400}.currency-panel [role=alert]{color:#b42318}@media(max-width:540px){.currency-settings{margin-left:6px}.currency-toggle{font-size:11px;padding:5px 6px}.currency-panel{position:fixed;right:12px;top:64px}}
</style>
