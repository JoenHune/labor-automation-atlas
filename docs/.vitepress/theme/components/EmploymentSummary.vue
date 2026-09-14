<script setup lang="ts">
import {computed} from 'vue'
import type {EmploymentDataset} from '../../../../src/research/schema'
import type {ScaleNode} from '../../../../src/research/industry-scale'
import {employmentView,employmentDisplay,employmentPeriodLabels} from '../../../../src/research/employment'
import {useCurrency} from '../../../../src/preferences/currency'
const props=defineProps<{dataset?:EmploymentDataset;node:ScaleNode;basis:string;compact?:boolean}>()
const {settings}=useCurrency()
const view=computed(()=>employmentView(props.dataset,props.node,props.basis))
const display=computed(()=>employmentDisplay(view.value,settings.value))
const estimated=computed(()=>view.value.record?.employment.status==='estimated')
const employeeCoverage=computed(()=>{const r=view.value.record;if(r?.country!=='us'||r.employment.value===null||r.employment.denominatorKind!=='jobs')return '';return '雇员岗位，不含业主'})
</script>
<template>
 <div :class="['employment-summary',{'is-compact':compact}]" :data-content-id="node.id+'-employment-summary-'+node.year" tabindex="0">
  <div class="employment-numbers">
   <div><span>就业规模 <em v-if="estimated">估算</em></span><strong>{{display.count}}<small>{{display.countUnit}}</small></strong></div>
   <div><span>{{view.productivityLabel}} <em v-if="estimated">估算</em><em v-else-if="view.record?.pairing.status==='proxy'">代理</em></span><strong>{{display.productivity}}<small>{{display.productivityUnit}}</small></strong></div>
  </div>
  <p v-if="view.record">{{node.year}} 年 · {{employmentPeriodLabels[view.record.employment.periodBasis]}}<template v-if="!estimated"> · {{view.statusLabel}}</template></p>
  <p v-if="estimated&&view.record?.employment.modelBasis">估算依据：{{view.record.employment.modelBasis}}</p>
  <p v-if="employeeCoverage">{{employeeCoverage}}</p>
  <p v-if="view.record?.pairing.scopeNote">{{view.record.pairing.scopeNote}}</p>
  <p v-if="!compact&&view.reason" class="employment-gap">{{view.reason}}</p>
 </div>
</template>
<style scoped>
.employment-summary{padding:14px 0;color:#284763}.employment-numbers{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px}.employment-numbers>div>span{display:block;font-size:11px;color:#687f94;line-height:1.6}.employment-numbers strong{display:block;font-size:21px;font-weight:500;letter-spacing:-.025em;line-height:1.5;font-variant-numeric:tabular-nums;margin-top:5px}.employment-numbers small{display:block;font-size:10px;font-weight:400;letter-spacing:0;color:#677f94}.employment-numbers em{font-style:normal;color:#456d93;border:1px solid #d3e0ed;border-radius:3px;padding:1px 4px;font-size:9px;white-space:nowrap}.employment-summary p{font-size:11px;line-height:1.65;margin:9px 0 0;color:#718497}.employment-gap{color:#657e94!important}.is-compact{padding:8px 0 0;border-top:1px solid #e2e9f0;margin-top:5px}.is-compact .employment-numbers strong{font-size:16px;margin-top:2px}.is-compact .employment-numbers>div>span{font-size:10px}.is-compact p{font-size:10px;margin-top:5px}
@media(max-width:700px){.employment-numbers strong{font-size:23px}.is-compact .employment-numbers strong{font-size:16px}}
</style>
