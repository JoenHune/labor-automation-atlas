<script setup lang="ts">
import {ref,computed,onMounted,onBeforeUnmount,watch} from 'vue'
import {withBase} from 'vitepress'
import type {Country} from '../../../../src/research/schema'
import {taskStatus,type TaskCard} from '../../../../src/research/site'
const props=defineProps<{country:Country}>()
interface SearchIndex{country:Country;version:string;tasks:TaskCard[];industries:{id:string;name:string}[]}
const query=ref(''),index=ref<SearchIndex|null>(null),error=ref(''),loading=ref(false),limit=ref(30)
const matches=computed(()=>{const q=query.value.trim().toLocaleLowerCase();return q?index.value?.tasks.filter(t=>t.country===props.country&&t.title.toLocaleLowerCase().includes(q))??[]:[]})
let restoring=false
function restore(){const params=new URLSearchParams(location.search),amount=Number(params.get('filter.taskLimit'));restoring=true;query.value=params.get('filter.task')??'';limit.value=Number.isSafeInteger(amount)&&amount>=30?Math.min(amount,100000):30;restoring=false;load()}
function saveView(){if(restoring||typeof window==='undefined')return;const url=new URL(location.href);if(query.value)url.searchParams.set('filter.task',query.value);else url.searchParams.delete('filter.task');if(query.value&&limit.value>30)url.searchParams.set('filter.taskLimit',String(limit.value));else url.searchParams.delete('filter.taskLimit');history.replaceState(null,'',url);window.dispatchEvent(new CustomEvent('atlas:view-change'))}
async function load(){if(index.value||loading.value||!query.value.trim())return;loading.value=true;error.value='';try{const response=await fetch(withBase('/exports/task-search-'+props.country+'.json'));if(!response.ok)throw new Error();const data=await response.json() as SearchIndex;if(data.country!==props.country||!Array.isArray(data.tasks)||!Array.isArray(data.industries)||data.tasks.some((t:TaskCard)=>t.country!==props.country))throw new Error();index.value=data}catch{error.value='任务索引暂时无法加载，请重试'}finally{loading.value=false;window.dispatchEvent(new CustomEvent('atlas:view-change'))}}
watch(query,()=>{if(restoring)return;limit.value=30;saveView();load()},{flush:'sync'})
watch(limit,saveView,{flush:'sync'})
onMounted(()=>{restore();load();window.addEventListener('popstate',restore)});onBeforeUnmount(()=>window.removeEventListener('popstate',restore))
</script>
<template>
 <section :data-content-id="country+'-task-search'" :aria-busy="loading" :data-view-error="Boolean(error)" tabindex="0" class="country-task-search"><h2>搜索{{country==='cn'?'中国':'美国'}}任务目录</h2><p>仅检索本国入选行业中的当前任务；研究进度逐项显示。</p><label>任务动作或对象 <input v-model="query" type="search" placeholder="例如：装卸、检测、清洁"/></label><p v-if="loading" role="status">正在加载任务目录…</p><p v-if="error" role="alert">{{error}} <button @click="load">重试</button></p><template v-if="query.trim()&&index"><p class="scope-note">找到 {{matches.length}} 项 · {{index.version}}</p><ul><li v-for="t in matches.slice(0,limit)" :key="t.id" :data-content-id="t.id+'-country-index'" tabindex="0"><a :href="withBase('/'+country+'/tasks/'+t.id)">{{t.title}}</a><small>{{index.industries.find(i=>i.id===t.industryId)?.name}} · {{t.countingRole==='composite-reference'?'组合流程样板 · ':''}}{{taskStatus[t.researchStatus]}}</small></li></ul><button v-if="matches.length>limit" @click="limit+=30">继续显示 {{Math.min(30,matches.length-limit)}} 项</button></template></section>
</template>
<style scoped>
.country-task-search{border-top:1px solid #dbe3ef;margin-top:32px;padding-top:12px}.country-task-search label{display:grid;gap:6px;font-size:14px;max-width:460px}.country-task-search input{border:1px solid #cbd5e1;border-radius:6px;padding:10px;width:100%;background:white}.country-task-search small{display:block;color:#64748b;margin-top:3px}.country-task-search li{padding:10px 0}
</style>
