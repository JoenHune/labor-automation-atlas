<script setup lang="ts">
import {computed,ref,watch,onMounted,onBeforeUnmount,nextTick} from 'vue'
import {withBase} from 'vitepress'
import type {Country,Research} from '../../../../src/research/schema'
import {analysisComparisons,analysisRowAmount,analysisUnit,comparisonRows,signedScale,valueDistribution,type AnalysisSection} from '../../../../src/research/industry-analysis'
import {convertMoney,formatAmount} from '../../../../src/research/currency'
import {useCurrency} from '../../../../src/preferences/currency'
import EvidenceList from './EvidenceList.vue'

const props=defineProps<{research:Research;country:Country;basis:string;nodeId:string;nodeName:string;section:AnalysisSection}>()
const {settings,unit}=useCurrency()
const dataset=computed(()=>props.research.industryAnalysis)
const distribution=computed(()=>valueDistribution(props.research,props.country,props.basis,props.nodeId))
const barScale=computed(()=>signedScale(distribution.value?.components.map(c=>c.value)??[]))
const tables=computed(()=>analysisComparisons(dataset.value,props.country,props.nodeId,props.section))
const metric=ref(''),sort=ref<'value'|'name'>('value'),message=ref('')
const table=computed(()=>tables.value.find(t=>t.id===metric.value)??tables.value[0])
const rows=computed(()=>table.value?comparisonRows(table.value,props.nodeId,sort.value,settings.value):[])
const displayUnit=computed(()=>table.value?analysisUnit(table.value,settings.value):unit.value)
const findings=computed(()=>dataset.value?.findings.filter(f=>f.country===props.country&&f.section===props.section&&f.nodeIds.includes(props.nodeId))??[])
const comparisonScale=computed(()=>signedScale(rows.value.map(r=>analysisRowAmount(r,table.value!,settings.value)??0)))
const colors=['#416c9c','#a47d5c','#799db9','#abc0d0']
const pct=(value:number|null)=>value===null?'—':formatAmount(value,1)+'%'
const amount=(value:number)=>{const t=distribution.value!.table;return formatAmount(convertMoney(value,t.unit,t.currency,settings.value),1)}
let mounted=false
function restore(){
  const q=new URLSearchParams(location.search)
  metric.value=tables.value.some(t=>t.id===q.get('filter.analysisMetric'))?q.get('filter.analysisMetric')!:tables.value[0]?.id??''
  sort.value=q.get('filter.analysisSort')==='name'?'name':'value'
}
function sync(){
  if(!mounted)return
  const url=new URL(location.href)
  for(const [key,value] of Object.entries({'filter.analysisMetric':props.section==='structure'?'':table.value?.id??'','filter.analysisSort':props.section==='structure'||sort.value==='value'?'':sort.value})){
    if(value)url.searchParams.set(key,value);else url.searchParams.delete(key)
  }
  if(url.href!==location.href){history.replaceState(null,'',url);window.dispatchEvent(new CustomEvent('atlas:view-change'))}
}
function exportData(){
  const record={version:props.research.version,analysisVersion:dataset.value?.version,checkedAt:dataset.value?.checkedAt,country:props.country,nodeId:props.nodeId,section:props.section,basis:props.basis||'annual-industry',viewState:Object.fromEntries(new URLSearchParams(location.search)),settings:settings.value,
    distribution:distribution.value,comparison:table.value?{...table.value,rows:rows.value.map(r=>({...r,displayValue:analysisRowAmount(r,table.value!,settings.value),displayUnit:displayUnit.value}))}:null,
    findings:findings.value,sources:dataset.value?.sources.filter(s=>s.country===props.country||s.country==='global')}
  const url=URL.createObjectURL(new Blob([JSON.stringify(record,null,2)],{type:'application/json'})),a=document.createElement('a')
  a.href=url;a.download=props.nodeId+'-'+props.section+'-analysis.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)
  message.value='已导出当前分析、原值、计算口径和来源。'
}
watch([metric,sort],sync)
watch(()=>[props.nodeId,props.section,props.country],()=>{if(mounted){restore();sync()}})
async function restoreNavigation(){await nextTick();restore()}
onMounted(()=>{restore();mounted=true;sync();window.addEventListener('popstate',restoreNavigation)})
onBeforeUnmount(()=>window.removeEventListener('popstate',restoreNavigation))
</script>

<template>
 <div v-if="dataset" class="industry-analysis" :data-content-id="nodeId+'-analysis-'+section">
  <template v-if="section==='structure'&&distribution">
   <details class="distribution-disclosure">
    <summary>增加值如何分配 <span>{{distribution.table.year}} 年 · {{distribution.codes.length}} 个产品部门</span></summary>
    <div class="distribution-content">
     <p class="analysis-context">{{distribution.name}} · {{distribution.table.year}} 年投入产出表</p>
     <p class="distribution-total">增加值 <strong>{{amount(distribution.total)}}</strong> {{unit}}</p>
     <div class="distribution-bars" role="group" aria-label="增加值四项分量，负值向左、正值向右">
      <div v-for="(c,i) in distribution.components" :key="c.id" class="component-row" :data-content-id="nodeId+'-distribution-'+distribution.table.year+'-'+c.id" tabindex="0">
       <div class="component-label"><span>{{c.label}}</span><strong>{{amount(c.value)}} <small>{{unit}}</small></strong></div>
       <div class="component-track"><i class="zero-line" :style="{left:barScale.zero+'%'}"></i><span class="component-bar" :class="{'is-negative':c.value<0}" :style="{left:barScale.bar(c.value).left+'%',width:barScale.bar(c.value).width+'%',background:colors[i]}"></span></div>
       <small>占增加值 {{pct(c.share)}}</small>
      </div>
     </div>
     <p class="analysis-note">四项按同一金额刻度绘制。负值保留原方向，分项占比可以超过 100%。</p>
     <p v-if="distribution.roundingDifference" class="analysis-note">四分量合计与增加值相差 {{formatAmount(distribution.roundingDifference,0)}} {{distribution.table.unit}}，保留原表舍入差异。</p>
     <details class="analysis-method"><summary>计算、口径与来源</summary>
      <p>分项占比＝分项金额 ÷ 增加值 × 100%。归并层级先对所列互斥产品求和，再计算比例。</p>
      <p v-for="note in distribution.table.notes" :key="note">{{note}}</p>
      <p>{{distribution.table.scope}} · {{distribution.table.revision}} · 发布 {{distribution.table.releaseDate??'原表未注明具体日期'}}</p>
      <EvidenceList :items="distribution.evidence" :catalog="dataset.sources"/>
     </details>
    </div>
   </details>
  </template>
  <template v-if="section!=='structure'&&table">
   <div class="analysis-heading"><span>{{section==='regions'?'地区分布':'上市公司样本'}}</span><h3>{{nodeName}}</h3></div>
   <label class="analysis-metric">比较指标<select v-model="metric" aria-label="分析指标"><option v-for="item in tables" :key="item.id" :value="item.id">{{item.title}} · {{item.period}}</option></select></label>
   <p class="analysis-context">{{table.period}} · {{table.coverageLabel}} · {{displayUnit}}</p>
   <p class="analysis-note">{{table.coverage}}</p>
   <div class="comparison-toolbar"><span>{{rows.filter(r=>r.value!==null).length}} / {{rows.length}} 项有值</span><label>排序<select v-model="sort" aria-label="分析排序"><option value="value">数值</option><option value="name">名称</option></select></label></div>
   <div class="analysis-comparison" role="group" :aria-label="table.title+'比较'">
    <details v-for="r in rows" :key="r.id" class="analysis-row" :data-content-id="table.id+'-'+r.id" tabindex="0">
     <summary><span class="comparison-name">{{r.name}}</span><strong>{{formatAmount(analysisRowAmount(r,table,settings),1)}}</strong><span class="comparison-track"><i class="zero-line" :style="{left:comparisonScale.zero+'%'}"></i><span v-if="r.value!==null" :style="{left:comparisonScale.bar(analysisRowAmount(r,table,settings)!).left+'%',width:comparisonScale.bar(analysisRowAmount(r,table,settings)!).width+'%'}"></span></span></summary>
     <div class="comparison-detail">
      <p v-if="r.missingReason">{{r.missingReason}}</p><p v-for="note in r.notes" :key="note">{{note}}</p>
      <p>原值 {{formatAmount(r.value,4)}} {{r.unit??table.unit}}{{r.currency?' · '+r.currency:''}} · {{table.period}} · 发布 {{r.releaseDate??'未注明具体日期'}} · {{r.revision}}</p>
      <p v-if="r.previous">{{r.previous.period}} 可比原值 {{formatAmount(r.previous.value,4)}} {{r.unit??table.unit}}。{{r.previous.note}}</p>
      <p v-if="r.computation">计算：{{r.computation.expression}}。{{r.computation.note}}</p>
      <a v-if="r.url" :href="r.url" target="_blank" rel="noopener noreferrer">查看原始披露 ↗</a>
      <EvidenceList :items="[...r.evidence,...(r.previous?.evidence??[])]" :catalog="dataset.sources"/>
     </div>
    </details>
   </div>
   <details class="analysis-method"><summary>样本与比较方法</summary><p v-for="note in table.notes" :key="note">{{note}}</p></details>
  </template>
  <article v-for="finding in findings" :key="finding.id" class="analysis-finding" :data-content-id="finding.id" tabindex="0">
   <span>{{finding.evidenceKind==='fact'?'直接事实':finding.evidenceKind==='calculation'?'计算结果':'研究判断'}} · {{finding.period}}</span>
   <h4>{{finding.title}}</h4><p>{{finding.body}}</p><details><summary>依据与成立条件</summary><p v-for="condition in finding.conditions" :key="condition">{{condition}}</p><EvidenceList :items="finding.evidence" :catalog="dataset.sources"/></details>
  </article>
  <p v-if="findings.length" class="analysis-note">比较表随全站币种换算；研究叙述与证据保留所标注的原始币种。</p>
  <div v-if="distribution||table||findings.length" class="analysis-actions"><button @click="exportData">导出当前分析</button><a :href="withBase('/industry-analysis')">方法与资料覆盖 ↗</a></div>
  <p v-if="message" class="analysis-note" role="status">{{message}}</p>
 </div>
</template>

<style scoped>
.industry-analysis{margin-top:18px;border-top:1px solid #dce4eb;color:#344b63;font-size:12px;line-height:1.7}
.industry-analysis summary{cursor:pointer;margin:0;line-height:1.7}.industry-analysis p{margin:9px 0}.industry-analysis h3{font-size:20px;margin:7px 0 18px}.industry-analysis h4{font-size:14px;margin:6px 0 8px}
.distribution-disclosure>summary{padding:14px 0;color:#345b84;font-size:13px}.distribution-disclosure>summary>span{display:block;margin-left:14px;color:#718399;font-size:11px}.distribution-content{padding-bottom:6px}
.analysis-context{color:#667b8f;font-size:11px}.distribution-total{font-size:11px}.distribution-total strong{font-size:21px;font-weight:500;color:#294f77;margin:0 3px}
.component-row{margin:16px 0}.component-label{display:flex;justify-content:space-between;gap:12px}.component-label strong{font-size:12px;font-weight:500;font-variant-numeric:tabular-nums}.component-label small{font-weight:400;font-size:10px;color:#6c8094}.component-row>small{display:block;text-align:right;color:#708399;font-size:10px;margin-top:3px}
.component-track,.comparison-track{display:block;position:relative;height:8px;background:#f1f4f7;border-radius:2px;margin-top:6px}.component-bar,.comparison-track>span{position:absolute;top:0;height:100%;border-radius:2px;background:#6086ae}.zero-line{position:absolute;top:-3px;bottom:-3px;width:1px;background:#b0bfcd;z-index:1}.is-negative{background-image:repeating-linear-gradient(45deg,transparent,transparent 3px,#ffffff55 3px,#ffffff55 4px)!important}
.analysis-note{font-size:11px;color:#667b8f}.analysis-method{margin:14px 0;border-top:1px solid #edf1f5;padding-top:12px;font-size:11px;color:#667b8f}.analysis-method summary{color:#4c7096}
.analysis-heading{padding-top:15px}.analysis-heading>span{color:#738599;font-size:10px}.analysis-metric{display:flex;flex-direction:column;gap:5px;font-size:11px;color:#667b8f}.analysis-metric select{min-width:0;max-width:100%;font-size:12px;padding:9px}
.comparison-toolbar{display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:10px;color:#6d8094;margin:15px 0 5px}.comparison-toolbar label{display:flex;gap:6px;align-items:center}.comparison-toolbar select{padding:4px;font-size:11px}.analysis-comparison{max-height:390px;overflow:auto;padding-right:7px;scrollbar-width:thin;scrollbar-color:#c8d6e2 transparent}
.analysis-row{border-bottom:1px solid #e8edf2}.analysis-row>summary{list-style:none;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:1px 14px;padding:12px 3px}.analysis-row>summary::-webkit-details-marker{display:none}.comparison-name{font-size:12px}.analysis-row strong{font-variant-numeric:tabular-nums;font-weight:500}.comparison-track{grid-column:1/-1;height:4px;margin-bottom:4px}.analysis-row[open]>summary{color:#23578d}.analysis-row[open]{background:#f6f9fc}.comparison-detail{padding:0 8px 12px;font-size:11px;color:#5e768d}.comparison-detail a{color:#356b9e;text-decoration:underline}.analysis-finding{border-left:2px solid #bdd0e1;margin:18px 0;padding-left:13px}.analysis-finding>span{color:#72889e;font-size:10px}.analysis-finding>p{font-size:12px}.analysis-finding details{font-size:11px;color:#647d94}
.analysis-actions{display:flex;justify-content:space-between;gap:12px;margin:17px 0 3px;font-size:11px;color:#3f6a94}.industry-analysis button:focus-visible,.industry-analysis summary:focus-visible,.industry-analysis select:focus-visible{outline:2px solid #356ea7;outline-offset:3px}
@media(max-width:700px){.analysis-comparison{max-height:410px}.analysis-metric select{font-size:16px}.analysis-row>summary{padding:15px 4px}.component-label small{font-size:11px}}
</style>
