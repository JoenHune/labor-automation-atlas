<script setup lang="ts">
import {computed,ref,watch,onMounted,onBeforeUnmount} from 'vue'
import record from '../../../../data/site.json'
import type {Research} from '../../../../src/research/schema'
import {analysisRowAmount,analysisUnit} from '../../../../src/research/industry-analysis'
import {formatAmount} from '../../../../src/research/currency'
import {useCurrency} from '../../../../src/preferences/currency'
import EvidenceList from './EvidenceList.vue'
const data=(record as Research).industryAnalysis
const {settings}=useCurrency()
const selected=ref(''),group=ref('all'),status=ref('all')
const tables=computed(()=>data?.comparisons.filter(t=>t.country==='cn'&&t.section==='official')??[])
const table=computed(()=>tables.value.find(t=>t.id===selected.value)??tables.value[0])
const groups=computed(()=>[...new Set(data?.coverage.filter(c=>c.country==='cn').map(c=>c.group))])
const coverage=computed(()=>data?.coverage.filter(c=>c.country==='cn'&&(group.value==='all'||c.group===group.value)&&(status.value==='all'||c.status===status.value))??[])
const findings=computed(()=>data?.findings.filter(f=>f.country==='cn'&&f.section==='official')??[])
const labels={'obtained':'已取得','checked-no-metric':'已查 · 无目标指标','not-comparable':'已查 · 口径不同','pending':'待核实','not-checked':'尚未检查'}
let mounted=false
const message=ref('')
function restore(){
 const q=new URLSearchParams(location.search),metric=q.get('filter.officialMetric')??'',g=q.get('filter.coverageGroup')??'all',s=q.get('filter.coverageStatus')??'all'
 selected.value=tables.value.some(t=>t.id===metric)?metric:tables.value[0]?.id??''
 group.value=groups.value.includes(g)?g:'all';status.value=s in labels?s:'all'
}
function sync(){
 if(!mounted)return
 const url=new URL(location.href)
 for(const [key,value] of Object.entries({'filter.officialMetric':selected.value,'filter.coverageGroup':group.value==='all'?'':group.value,'filter.coverageStatus':status.value==='all'?'':status.value})){
  if(value)url.searchParams.set(key,value);else url.searchParams.delete(key)
 }
 if(url.href!==location.href){history.replaceState(null,'',url);window.dispatchEvent(new CustomEvent('atlas:view-change'))}
}
async function share(){sync();try{await navigator.clipboard.writeText(location.href);message.value='已复制链接，包含当前指标和资料筛选。'}catch{message.value='复制地址栏即可分享当前指标和筛选。'}}
watch([selected,group,status],sync)
onMounted(()=>{restore();mounted=true;sync();window.addEventListener('popstate',restore)})
onBeforeUnmount(()=>window.removeEventListener('popstate',restore))
</script>

<template>
 <div v-if="data" class="analysis-overview">
  <p class="audit-stamp">核查于 {{data.checkedAt}} · {{data.version}}</p>
  <button class="overview-share" @click="share">分享当前指标与筛选 ↗</button><p v-if="message" class="audit-stamp" role="status">{{message}}</p>
  <section v-if="table" data-content-id="cn-analysis-official-comparison">
   <h2>全国电子行业：同一统计表内比较</h2>
   <label class="overview-control">指标<select v-model="selected" aria-label="全国分析指标"><option v-for="t in tables" :value="t.id" :key="t.id">{{t.title}} · {{t.period}}</option></select></label>
   <p>{{table.period}} · {{table.coverageLabel}} · {{analysisUnit(table,settings)}}</p><p class="scope-note">{{table.coverage}}</p>
   <div class="official-rows">
    <details v-for="r in table.rows" :key="r.id" :data-content-id="table.id+'-'+r.id" tabindex="0">
     <summary><span>{{r.name}}</span><strong>{{formatAmount(analysisRowAmount(r,table,settings),1)}}</strong></summary>
     <p v-if="r.missingReason">{{r.missingReason}}</p><p v-for="note in r.notes" :key="note">{{note}}</p>
     <p>原值 {{formatAmount(r.value,4)}} {{r.unit??table.unit}} · 发布 {{r.releaseDate??'未核实具体日期'}} · {{r.revision}}</p>
     <p v-if="r.computation">计算：{{r.computation.expression}}。{{r.computation.note}}</p>
     <EvidenceList :items="r.evidence" :catalog="data.sources"/>
    </details>
   </div>
   <details><summary>比较口径</summary><p v-for="note in table.notes" :key="note">{{note}}</p></details>
  </section>
  <article v-for="f in findings" :key="f.id" :data-content-id="f.id" tabindex="0">
   <p class="audit-stamp">{{f.period}} · {{f.evidenceKind==='fact'?'直接事实':f.evidenceKind==='calculation'?'计算结果':'研究判断'}}</p>
   <h3>{{f.title}}</h3><p>{{f.body}}</p><details><summary>证据与条件</summary><p v-for="note in f.conditions" :key="note">{{note}}</p><EvidenceList :items="f.evidence" :catalog="data.sources"/></details>
  </article>
  <section data-content-id="cn-analysis-coverage">
   <h2>资料探索到了哪里</h2>
   <p>“已取得”只描述这条记录中的资料，不代表该渠道已被穷尽。每个缺口保留下一步。</p>
   <div class="coverage-controls"><label class="overview-control">资料范围<select v-model="group" aria-label="资料覆盖范围"><option value="all">全部范围</option><option v-for="g in groups" :key="g" :value="g">{{g}}</option></select></label><label class="overview-control">状态<select v-model="status" aria-label="资料覆盖状态"><option value="all">全部状态</option><option v-for="(name,key) in labels" :key="key" :value="key">{{name}}</option></select></label></div>
   <p class="audit-stamp">当前 {{coverage.length}} 条记录</p>
   <details v-for="c in coverage" :key="c.id" class="coverage-row" :data-content-id="c.id" tabindex="0">
    <summary><span>{{c.title}}</span><small>{{labels[c.status]}}</small></summary><p class="audit-stamp">{{c.period}} · {{c.group}}</p><p>{{c.detail}}</p><p>下一步：{{c.nextStep}}</p><EvidenceList v-if="c.evidence.length" :items="c.evidence" :catalog="data.sources"/>
   </details>
  </section>
 </div>
</template>

<style scoped>
.analysis-overview{margin-top:32px}.audit-stamp,.scope-note{color:#698095;font-size:12px}.analysis-overview section{margin:32px 0}.analysis-overview article{border-left:2px solid #b5cce1;padding-left:20px;margin:32px 0}.analysis-overview article h3{margin-top:8px}.analysis-overview summary{cursor:pointer}.overview-control{display:flex;flex-direction:column;gap:7px;font-size:12px;color:#57718a}.overview-control select{max-width:100%;min-width:0;background:#f7f9fc;border:1px solid #d4dfeb;border-radius:5px;padding:10px;font-size:14px;color:#2e547a}.coverage-controls{display:grid;grid-template-columns:1fr 1fr;gap:15px}.official-rows{margin:18px 0}.official-rows details,.coverage-row{border-bottom:1px solid #e1e8ef;padding:12px 0}.official-rows summary,.coverage-row summary{display:flex;justify-content:space-between;gap:20px;font-size:14px}.official-rows strong{font-weight:500;font-variant-numeric:tabular-nums}.official-rows details>p,.coverage-row>p{font-size:13px}.coverage-row summary small{flex-shrink:0;color:#66839d;font-size:11px}.analysis-overview details:focus-visible{outline:2px solid #386f9f;outline-offset:4px}@media(max-width:600px){.coverage-controls{grid-template-columns:1fr}.overview-control select{font-size:16px}.coverage-row summary{display:block}.coverage-row summary small{display:block;margin-top:4px}}
</style>
