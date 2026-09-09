<script setup lang="ts">
import {computed} from 'vue'
import {withBase} from 'vitepress'
import EvidenceList from './EvidenceList.vue'
import research from '../../../../data/site.json'
import {evidenceDateNames} from '../../../../src/research/evidence-labels'
import type {Research} from '../../../../src/research/schema'
const props=defineProps<{items:Record<string,any>[];country:'cn'|'us'}>()
const visible=computed(()=>props.items.filter(x=>x.record.country.toLowerCase()===props.country))
const periods=(item:Record<string,any>)=>[...new Set<string>([...item.definitionEvidence,...item.claimEvidence].map(e=>e.sourceId))].map(id=>research.sources.find(s=>s.id===id) as Research['sources'][number]|undefined).filter((s):s is Research['sources'][number]=>!!s).map(s=>({id:s.id,text:[s.title+'：'+(s.evidencePeriod??'资料时期未确认'),'网页发布 '+(s.publishedLabel??s.published??'日期未确认'),...(s.dates??[]).map(d=>evidenceDateNames[d.kind]+' '+d.value)].join(' · ')}))
</script>
<template>
 <details v-for="item in visible" :key="item.id" :id="item.id.toLowerCase()" :data-content-id="item.id.toLowerCase()" tabindex="0" class="pending-definition">
  <summary>{{item.record.title}} · 定义待确认</summary>
  <p>{{item.record.conclusion.summary}}</p>
  <p>{{item.record.definitionReview.note}}</p>
  <ul class="historical-note"><li v-for="s in periods(item)" :key="s.id">{{s.text}}</li></ul>
  <p><strong>输入：</strong>{{item.record.inputs.join('；')}}<br/><strong>输出：</strong>{{item.record.outputs.join('；')}}<br/><strong>拟议验收：</strong>{{item.record.acceptance}}</p>
  <p class="scope-note">{{item.record.acceptanceBasis}}</p>
  <p>{{item.record.executionConditions.performerBoundary}} {{item.record.executionConditions.sopGap}}</p>
  <p v-if="item.parentTaskIds.length">涉及已有任务：<a v-for="id in item.parentTaskIds" :key="id" :href="withBase('/'+country+'/tasks/'+id)">{{id}} </a></p>
  <p v-else>尚未关联到已有父任务，需要确认新增范围、实际执行者与去重关系。</p>
  <p class="scope-note">原有任务数量与研究状态保持原值；本条目的证据不能直接继承到父任务。</p>
  <EvidenceList :items="item.definitionEvidence"/>
  <ul><li v-for="a in item.record.alternatives" :key="a.type"><strong>{{a.type}}：</strong><template v-if="a.mechanisms.length"><span v-for="(m,index) in a.mechanisms" :key="index">{{m.summary}}。{{m.boundary}}</span></template><template v-else>本轮未保留匹配机制，仍需核查。</template></li></ul>
  <EvidenceList v-if="item.claimEvidence.length" :items="item.claimEvidence"/>
  <p>{{item.record.negativeFinding.interpretation}} {{item.record.successfulCounterexamples.note}}；尚未确认完整任务持续商业运行。</p>
  <ul><li v-for="gap in item.record.evidenceGaps">{{gap}}</li></ul>
  <p v-if="item.record.definitionReview.splitSuggestions.length">拟议拆分：{{item.record.definitionReview.splitSuggestions.map((s:any)=>s.title).join('；')}}。子项尚未分别核查。</p>
  <details><summary>待访谈问题与检索范围</summary><ol><li v-for="q in item.record.interviewQuestions">{{q}}</li></ol><p>本条目的正向查询：{{item.queryRecord.positiveQuery}}</p><p>本条目的反向查询：{{item.queryRecord.negativeQuery}}</p><p class="scope-note">保留查询结果记录；主查询的原始请求及执行日期未获独立记录。以上查询未算作父任务的新检索。</p><p>人工、部署、维护异常停机及增量收入参数缺失，回收期留空。</p></details>
 </details>
</template>
<style scoped>
.pending-definition{margin:12px 0;padding:12px 16px;border:1px solid #dce4ef;border-radius:8px;overflow-wrap:anywhere}.pending-definition>summary{cursor:pointer;font-weight:600}.pending-definition a{margin-right:8px}
</style>
