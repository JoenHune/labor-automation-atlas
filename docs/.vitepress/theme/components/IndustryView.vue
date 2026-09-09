<script setup lang="ts">
import {computed} from 'vue'
import {withBase} from 'vitepress'
import raw from '../../../../data/research.json'
import type {Research} from '../../../../src/research/schema'
import EvidenceList from './EvidenceList.vue'
const props=defineProps<{industryId:string}>()
const data=raw as Research
const industry=computed(()=>data.industries.find(i=>i.id===props.industryId)!)
const tasks=computed(()=>data.tasks.filter(t=>t.industryId===props.industryId))
const observation=computed(()=>data.observations.find(o=>o.industryId===props.industryId&&o.period==='2025'&&o.measure==='value-added'))
</script>
<template>
 <article class="industry-view" :data-country="industry.country">
 <a :href="withBase('/'+industry.country+'/')">← {{industry.country==='cn'?'中国':'美国'}}行业全景</a>
 <p class="eyebrow">行业流程 · {{industry.selectionReason==='sector-supplement'?'榜外产业补充':'2025 全年入选行业'}}</p>
 <h1 :data-content-id="industry.id+'-title'" tabindex="0">{{industry.name}}</h1>
 <section :data-content-id="industry.id+'-scale-2025'" tabindex="0" class="task-conclusion"><p><strong>{{observation?.value?.toLocaleString('zh-CN')}} {{observation?.unit}}</strong> · 2025 年现价增加值</p><p>{{industry.coverage}}</p><p class="scope-note">发布 {{observation?.releaseDate}} · {{observation?.revision}}</p><EvidenceList v-if="observation" :items="observation.evidence"/></section>
 <h2>已研究任务</h2>
 <p class="scope-note" :data-content-id="industry.id+'-coverage-status'" tabindex="0">全流程任务清单正在按子行业、场景与职业职责交叉盘点。这里的样板用于验证完整研究路径，不代表该行业全部任务。</p>
 <div v-if="tasks.length" class="task-cards"><a v-for="t in tasks" :key="t.id" :data-content-id="t.id+'-index'" :href="withBase('/'+industry.country+'/tasks/'+t.id)" class="task-link"><span class="tag">{{t.researchStatus==='reviewed'?'公开证据已复核':'研究中'}}</span><h3>{{t.title}}</h3><p>{{t.summary}}</p><small>{{t.evidenceAge}}</small><span class="entry-link">查看条件、证据与回报 →</span></a></div>
 <p v-else class="work-note">该行业尚无完成证据研究的任务。流程清单、逐项检索、反例和独立复核完成后才会计入研究覆盖。</p>
 </article>
</template>

