<script setup lang="ts">
import {computed,onMounted,onBeforeUnmount,ref,watch} from 'vue'
import {withBase} from 'vitepress'
import type {Research} from '../../../../src/research/schema'
import {scaleSources,type ScaleNode} from '../../../../src/research/industry-scale'
import {employmentView,employmentDisplay,employmentGroups,employmentExport,employmentPeriodLabels,employmentStatusLabels,type EmploymentMetric,type EmploymentView} from '../../../../src/research/employment'
import {useCurrency} from '../../../../src/preferences/currency'
import EvidenceList from './EvidenceList.vue'
import EmploymentSummary from './EmploymentSummary.vue'
const props=defineProps<{research:Research;node:ScaleNode;peers:ScaleNode[];basis:string;contentPrefix?:string}>()
const emit=defineEmits<{select:[node:ScaleNode];hover:[id:string];clear:[]}>()
const {settings}=useCurrency()
const metric=ref<EmploymentMetric>('productivity'),observedOnly=ref(false)
const view=computed(()=>employmentView(props.research.employment,props.node,props.basis))
const record=computed(()=>view.value.record)
const display=computed(()=>employmentDisplay(view.value,settings.value))
const peers=computed(()=>props.peers.map(n=>employmentView(props.research.employment,n,props.basis)))
const grouped=computed(()=>employmentGroups(peers.value,metric.value,observedOnly.value))
const shown=(v:EmploymentView)=>employmentDisplay(v,settings.value)
const allSources=computed(()=>[...(props.research.employment?.sources??[]),...scaleSources(props.research,props.node.country)])
const value=(v:EmploymentView)=>metric.value==='employment'?v.count:v.productivity
const bar=(v:EmploymentView,rows:EmploymentView[])=>{const max=Math.max(...rows.map(r=>Math.abs(value(r)??0)),1);return Math.abs(value(v)??0)/max*100+'%'}
const label=(v:EmploymentView)=>metric.value==='employment'?shown(v).count+' '+shown(v).countUnit:shown(v).productivity+' '+shown(v).productivityUnit
function restore(){const q=new URLSearchParams(location.search);metric.value=q.get('filter.employmentSort')==='employment'?'employment':'productivity';observedOnly.value=q.get('filter.employmentMode')==='observed'}
function sync(){const url=new URL(location.href);url.searchParams.set('filter.employmentSort',metric.value);if(observedOnly.value)url.searchParams.set('filter.employmentMode','observed');else url.searchParams.delete('filter.employmentMode');history.replaceState(null,'',url);window.dispatchEvent(new CustomEvent('atlas:view-change'))}
function exportData(){
 const views=[view.value,...peers.value.filter(v=>v.node.id!==props.node.id)],ids=new Set(views.flatMap(v=>v.node.evidence.map(e=>e.sourceId)))
 const result={...employmentExport(props.research.employment,views,settings.value),country:props.node.country,basis:props.basis||'annual-industry',year:props.node.year,sort:metric.value,observedOnly:observedOnly.value,viewState:Object.fromEntries(new URLSearchParams(location.search)),valueAdded:views.map(v=>({nodeId:v.node.id,value:v.node.value,unit:v.node.unit,currency:v.node.currency,year:v.node.year,coverage:v.node.coverage,revision:v.node.revision,releaseDate:v.node.releaseDate,evidence:v.node.evidence})),valueAddedSources:allSources.value.filter(s=>ids.has(s.id))}
 const url=URL.createObjectURL(new Blob([JSON.stringify(result,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=props.node.country+'-employment-'+props.node.year+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)
}
onMounted(()=>{restore();window.addEventListener('popstate',restore)})
onBeforeUnmount(()=>window.removeEventListener('popstate',restore))
watch(()=>[props.node.country,props.node.year],()=>restore())
</script>
<template>
 <section class="employment-panel" :data-content-id="(contentPrefix??'')+node.id+'-employment-panel-'+node.year">
  <div class="employment-eyebrow">就业与人均 <span>{{node.year}} 年</span></div>
  <h3>{{node.name}}</h3>
  <EmploymentSummary :dataset="research.employment" :node="node" :basis="basis" :content-prefix="contentPrefix"/>
  <p v-if="record" class="employment-context">{{record.pairing.explanation}}</p>
  <details v-if="record" class="employment-method">
   <summary>人数、估算方法与来源 <span>↗</span></summary>
   <p>{{record.employment.definition}}</p><p>{{record.employment.coverage}}</p>
   <p>{{record.employment.year}} 年 · {{employmentPeriodLabels[record.employment.periodBasis]}} · {{employmentStatusLabels[record.employment.status]}}<br>发布 {{record.employment.releaseDate??'未注明确切日期'}} · {{record.employment.revision}}</p>
   <template v-if="record.employment.calculation">
    <h4>{{record.employment.calculation.label}}</h4><p class="employment-formula">{{record.employment.calculation.expression}}</p>
    <ul><li v-for="(assumption,i) in record.employment.calculation.assumptions" :key="i">{{assumption}}</li></ul>
    <details><summary>复算输入</summary><dl><template v-for="(input,i) in record.employment.calculation.inputs" :key="input.id+'-'+i"><dt>{{input.label}}</dt><dd>{{input.value.toLocaleString('zh-CN',{maximumFractionDigits:6})}} {{input.unit}}<EvidenceList :items="input.evidence" :catalog="allSources"/></dd></template></dl></details>
   </template>
   <template v-if="record.employment.sensitivity"><h4>假设变化时</h4><p>{{record.employment.sensitivity.label}}</p><p>就业 {{display.employmentRange}}<br v-if="display.productivityRange"><template v-if="display.productivityRange">{{view.productivityLabel}} {{display.productivityRange}}</template></p><ul><li v-for="(assumption,i) in record.employment.sensitivity.assumptions" :key="i">{{assumption}}</li></ul></template>
   <p v-for="(note,i) in record.notes" :key="i">{{note}}</p>
   <EvidenceList :items="record.employment.evidence" :catalog="allSources"/>
   <details v-for="reference in record.references" :key="reference.label"><summary>{{reference.label}} · {{reference.measure.year}}</summary><p>{{reference.measure.value===null?'—':reference.measure.value.toLocaleString('zh-CN',{maximumFractionDigits:1})}} {{reference.measure.denominatorKind==='persons'?'人':reference.measure.denominatorKind==='jobs'?'岗位':reference.measure.denominatorKind==='fte'?'全职当量':'雇员'}} · {{employmentStatusLabels[reference.measure.status]}}</p><p>{{reference.measure.definition}}</p><p>{{reference.measure.coverage}}</p><p v-if="reference.measure.calculation">{{reference.measure.calculation.expression}}</p><EvidenceList :items="reference.measure.evidence" :catalog="allSources"/></details>
   <h4>人均计算的分子</h4><p>{{node.year}} 年 · {{node.value?.toLocaleString('zh-CN')??'—'}} {{node.unit}} · {{node.coverage}}</p><EvidenceList :items="node.evidence" :catalog="allSources"/>
  </details>
  <div v-if="peers.length>1" class="employment-comparison">
   <div class="employment-controls"><label>本层比较<select v-model="metric" aria-label="就业比较指标" @change="sync"><option value="productivity">人均 / 每岗位增加值</option><option value="employment">就业规模</option></select></label><label class="employment-estimates"><input type="checkbox" v-model="observedOnly" @change="sync">仅统计人数</label></div>
   <p class="employment-legend">扇区大小表示增加值；下列按所选指标排列。不同就业口径分组比较。</p>
   <div v-for="group in grouped.groups" :key="group.key" class="employment-group" :aria-label="group.label+'比较'">
    <h4>{{group.label}}</h4>
    <button v-for="peer in group.rows" :key="peer.node.id" :class="['employment-row',{'is-active':peer.node.id===node.id}]" :data-content-id="peer.node.id+'-employment-row-'+peer.node.year+'-'+metric" @click="emit('select',peer.node)" @pointerenter="emit('hover',peer.node.id)" @pointerleave="emit('clear')" @focus="emit('hover',peer.node.id)" @blur="emit('clear')" :aria-label="peer.node.name+'，'+label(peer)+'，'+peer.statusLabel">
     <span>{{peer.node.name}}<small v-if="peer.record?.employment.status==='estimated'">估算</small></span><strong>{{label(peer)}}</strong><span class="employment-bar-track" aria-hidden="true"><span :class="{'is-negative':(value(peer)??0)<0}" :style="{width:bar(peer,group.rows)}"></span></span>
    </button>
   </div>
   <details v-if="grouped.unranked.length" class="employment-unranked"><summary>{{grouped.unranked.length}} 项未进入比较</summary><button v-for="peer in grouped.unranked" :key="peer.node.id" @click="emit('select',peer.node)"><span>{{peer.node.name}}</span><strong>{{label(peer)}}</strong><small>{{observedOnly&&peer.record?.employment.status==='estimated'?'当前仅显示统计人数；此项为估算。':peer.reason||peer.record?.pairing.explanation}}</small></button></details>
  </div>
  <footer><button @click="exportData">导出就业与人均数据 ↓</button><a :href="withBase('/employment-methodology')">方法与覆盖 ↗</a></footer>
 </section>
</template>
<style scoped>
.employment-panel{color:#294862;min-width:0}.employment-eyebrow{display:flex;justify-content:space-between;font-size:11px;color:#73879a;margin:2px 0 12px}.employment-panel h3{font-size:21px!important;font-weight:500!important;line-height:1.5;margin:0!important}.employment-context{font-size:11px;color:#687f93;line-height:1.8;margin:3px 0 12px}.employment-method{font-size:11px;color:#617a91;border-top:1px solid #e3eaf1;padding:12px 0}.employment-method summary{cursor:pointer;color:#426788;line-height:1.6}.employment-method>summary{display:flex;justify-content:space-between}.employment-method p,.employment-method li{font-size:11px;line-height:1.8;margin:9px 0}.employment-method h4{font-size:12px;font-weight:500;margin:15px 0 6px}.employment-method details{margin:10px 0}.employment-method dt{font-weight:500;margin:10px 0 3px}.employment-method dd{margin:0 0 10px}.employment-method ul{padding-left:18px}.employment-formula{background:#f3f7fa;border-radius:5px;padding:10px}.employment-comparison{border-top:1px solid #dce5ee;padding-top:16px}.employment-controls{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.employment-controls label{font-size:11px;display:flex;gap:9px;align-items:center;color:#657d92}.employment-controls select{min-width:0;max-width:100%;border:1px solid #dce5ee;background:white;border-radius:5px;padding:6px 18px 6px 8px;font:inherit;color:#294c6b}.employment-estimates{margin-left:auto;white-space:nowrap}.employment-estimates input{accent-color:#3e6e9c}.employment-legend{font-size:10px;line-height:1.7;color:#74899b;margin:11px 0}.employment-group h4{font-size:10px;letter-spacing:.03em;font-weight:400;color:#788c9e;margin:17px 0 4px}.employment-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px 10px;width:100%;text-align:left;padding:11px 5px 9px;border-bottom:1px solid #eaf0f5;color:#35566f;border-radius:4px}.employment-row:hover,.employment-row.is-active{background:#f2f6fa}.employment-row>span:first-child{font-size:12px;line-height:1.6}.employment-row small{font-size:9px;white-space:nowrap;color:#6e8dab;margin-left:5px}.employment-row strong{font-size:11px;font-weight:500;white-space:nowrap;line-height:1.8;font-variant-numeric:tabular-nums}.employment-bar-track{grid-column:1/-1;display:block;height:3px;background:#eff3f7;overflow:hidden}.employment-bar-track>span{display:block;height:100%;background:#5b88af;border-radius:2px;min-width:1px}.employment-bar-track>span.is-negative{background:#b0886b}.employment-unranked{font-size:11px;margin:15px 0;color:#6f8598}.employment-unranked summary{cursor:pointer}.employment-unranked button{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px;width:100%;text-align:left;padding:12px 0;border-bottom:1px solid #e9eff5}.employment-unranked strong{font-size:10px;font-weight:400}.employment-unranked small{grid-column:1/-1;line-height:1.6;color:#7e91a1}.employment-panel footer{display:flex;flex-wrap:wrap;gap:12px;justify-content:space-between;margin-top:18px;font-size:11px;color:#537999}.employment-panel button:focus-visible,.employment-panel select:focus-visible,.employment-panel summary:focus-visible{outline:2px solid #356ea7;outline-offset:3px}
@media(max-width:700px){.employment-controls{gap:12px}.employment-estimates{margin-left:0}.employment-row strong{font-size:11px}.employment-method p,.employment-method li,.employment-context{font-size:12px}.employment-group{max-height:420px;overflow:auto;padding-right:6px}}
</style>
