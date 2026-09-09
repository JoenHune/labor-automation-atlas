<script setup lang="ts">
import {computed,ref,onMounted,onBeforeUnmount,watch} from 'vue'
import {withBase} from 'vitepress'
import type {IndustryPage} from '../../../../src/research/site'
import {phaseNames,taskStatus} from '../../../../src/research/site'
import EvidenceList from './EvidenceList.vue'
import PendingDefinitionItems from './PendingDefinitionItems.vue'
import ObservationDetails from './ObservationDetails.vue'
const props=defineProps<{record:IndustryPage}>()
const industry=computed(()=>props.record.industry),observation=computed(()=>props.record.observation)
const query=ref(''),phase=ref('all'),scenario=ref('all'),status=ref('all')
const fields={q:query,phase,scenario,status}
const filtered=computed(()=>props.record.tasks.filter(t=>t.country===industry.value.country&&t.industryId===industry.value.id&&(phase.value==='all'||t.phase===phase.value)&&(scenario.value==='all'||t.scenarioId===scenario.value)&&(status.value==='all'||t.researchStatus===status.value)&&(!query.value||t.title.toLocaleLowerCase().includes(query.value.trim().toLocaleLowerCase()))))
const scenes=computed(()=>props.record.scenarios.filter(s=>(scenario.value==='all'||s.id===scenario.value)&&((!query.value&&phase.value==='all'&&status.value==='all')||filtered.value.some(t=>t.scenarioId===s.id))))
const candidates=computed(()=>props.record.tasks.filter(t=>t.countingRole!=='composite-reference'))
const references=computed(()=>props.record.tasks.filter(t=>t.countingRole==='composite-reference'))
const reviewed=computed(()=>candidates.value.filter(t=>t.researchStatus==='reviewed').length)
const phaseTasks=(id:string,p:string)=>filtered.value.filter(t=>t.scenarioId===id&&t.phase===p)
const subsectors=computed(()=>(industry.value.inventory?.subsectorCoverage??[]) as Record<string,any>[])
const pendingDefinitions=computed(()=>{
 const followups=industry.value.inventory?.agricultureFollowups as Record<string,any>|undefined
 return ((followups?.supplement?.items??[]) as Record<string,any>[]).filter(item=>item.record.country.toLowerCase()===industry.value.country&&(scenario.value==='all'||item.record.scenarioId===scenario.value)&&(!query.value||item.record.title.toLocaleLowerCase().includes(query.value.trim().toLocaleLowerCase())))
})
function restore(){const q=new URLSearchParams(location.search);for(const [key,value] of Object.entries(fields))value.value=q.get('filter.'+key)??(key==='q'?'':'all')}
function sync(){const url=new URL(location.href);for(const [key,value] of Object.entries(fields)){if(value.value&&value.value!=='all')url.searchParams.set('filter.'+key,value.value);else url.searchParams.delete('filter.'+key)}history.replaceState(null,'',url);window.dispatchEvent(new CustomEvent('atlas:view-change'))}
watch([query,phase,scenario,status],()=>{if(typeof window!=='undefined')sync()})
onMounted(()=>{restore();window.addEventListener('popstate',restore)})
onBeforeUnmount(()=>window.removeEventListener('popstate',restore))
</script>
<template>
 <article class="industry-view" :data-country="industry.country">
 <a :href="withBase('/'+industry.country+'/')">← {{industry.country==='cn'?'中国':'美国'}}行业全景</a>
 <p class="eyebrow">行业流程 · {{industry.selectionReason==='sector-supplement'?'榜外产业补充':'2025 全年入选行业'}}</p>
 <h1 :data-content-id="industry.id+'-title'" tabindex="0">{{industry.name}}</h1>
 <section :data-content-id="industry.id+'-scale-2025'" tabindex="0" class="task-conclusion"><p><strong>{{observation?.value?.toLocaleString('zh-CN')}} {{observation?.unit}}</strong> · 2025 年现价增加值</p><p>{{industry.coverage}}</p><p class="scope-note">发布 {{observation?.releaseDate}} · {{observation?.revision}}</p><ObservationDetails v-if="observation" :observation="observation"/></section>
 <section :data-content-id="industry.id+'-coverage-status'" tabindex="0"><h2>场景与任务进度</h2><p>当前 {{record.scenarios.filter(s=>s.inventory).length}} 个盘点场景、{{candidates.length}} 项候选任务，{{reviewed}} 项已完成公开证据独立复核。</p><p v-if="references.length">另有 {{references.length}} 份组合流程样板，其中 {{references.filter(t=>t.researchStatus==='reviewed').length}} 份公开证据已复核。样板与所含原子任务不重复累计数量或工时。</p><p class="work-note">任务清单仍在扩展并修订粒度；数量不代表行业任务覆盖率、人工规模或自动化市场。未完成方案、反例和来源复核的任务保持待研究状态。</p></section>
 <details v-if="subsectors.length" class="method-details"><summary>子行业范围与未覆盖部分</summary><ul><li v-for="(sub,i) in subsectors" :key="i" :data-content-id="industry.id+'-subsector-'+i" tabindex="0"><strong>{{sub.name??sub.subsector??sub.code??sub.naics??sub.classification}}</strong><p>{{sub.gap??sub.uncovered??sub.coverageMeaning}}</p><small>{{sub.scope??sub.countingNote}}</small></li></ul></details>
 <div class="task-filters"><label>搜索本行业任务 <input v-model="query" type="search" placeholder="任务动作或对象"/></label><label>场景 <select v-model="scenario"><option value="all">全部场景</option><option v-for="s in record.scenarios" :value="s.id">{{s.title}}</option></select></label><label>流程阶段 <select v-model="phase"><option value="all">全部阶段</option><option v-for="(label,key) in phaseNames" :value="key">{{label}}</option></select></label><label>研究状态 <select v-model="status"><option value="all">全部状态</option><option v-for="(label,key) in taskStatus" :value="key">{{label}}</option></select></label></div>
 <section v-if="pendingDefinitions.length" :data-content-id="industry.id+'-pending-definitions'" tabindex="0"><h2>待确认的任务边界</h2><p>以下 {{pendingDefinitions.length}} 项补研范围与当前场景、文字搜索匹配。已保留原文、方案与反例检索结果，但定义、执行者或与旧任务的重叠仍需确认，未计入候选任务数量；流程阶段和研究状态筛选仅作用于已有任务。</p><PendingDefinitionItems :items="pendingDefinitions" :country="industry.country"/></section>
 <p class="scope-note">筛选结果 {{filtered.length}} 项；筛选条件随批注分享链接保存。</p>
 <section v-for="s in scenes" :key="s.id" class="industry-scenario" :data-content-id="s.id+'-flow'" tabindex="0">
  <h2>{{s.title}}</h2><p v-if="references.some(t=>t.scenarioId===s.id)" class="historical-note">组合流程样板：用于查看完整证据链，不作为额外原子任务计数。</p><p :data-content-id="s.id+'-scope'" tabindex="0">{{s.scope}}</p>
  <div class="workflow-columns"><section v-for="(label,key) in phaseNames" :key="key" :data-content-id="s.id+'-phase-'+key" tabindex="0"><h3>{{label}}</h3><ul v-if="phaseTasks(s.id,key).length"><li v-for="t in phaseTasks(s.id,key)" :key="t.id" :data-content-id="t.id+'-index'" tabindex="0"><a :href="withBase('/'+industry.country+'/tasks/'+t.id)">{{t.title}}</a><small>{{taskStatus[t.researchStatus]}}</small></li></ul><p v-else class="scope-note">{{s.coverage.find(c=>c.phase===label)?.gap??'当前筛选下没有任务。'}}</p></section></div>
  <details><summary>流程发现来源与遗漏检查</summary><p>流程规范与职业职责用于交叉发现任务，条目级对应仍需复核；不据此推算工时或自动化程度。</p><EvidenceList :items="[...s.workflowSources,...s.occupationSources]"/><ul><li v-for="text in s.exclusions">{{text}}</li></ul></details>
 </section>
 </article>
</template>
<style scoped>
.task-filters{display:flex;flex-wrap:wrap;gap:16px;margin:28px 0 12px}.task-filters label{display:grid;gap:5px;font-size:13px;min-width:140px;max-width:100%}.task-filters input,.task-filters select{border:1px solid #cbd5e1;border-radius:6px;padding:8px;background:white;max-width:100%}.industry-scenario{margin-top:36px;padding-top:12px;border-top:1px solid #dbe3f0}.workflow-columns{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin:20px 0}.workflow-columns>section{border:1px solid #dce4ef;border-radius:8px;padding:12px;min-width:0}.workflow-columns h3{margin-top:0;font-size:15px}.workflow-columns ul{padding-left:16px}.workflow-columns li{margin-bottom:14px;overflow-wrap:anywhere}.workflow-columns li>a{display:block}.workflow-columns small{display:block;color:#64748b;font-size:11px;line-height:1.5;margin-top:4px}@media(max-width:960px){.workflow-columns{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:540px){.workflow-columns{grid-template-columns:1fr}.task-filters label{width:100%}}
</style>
