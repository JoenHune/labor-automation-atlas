<script setup lang="ts">
import {computed} from 'vue'
import type {TaskPage} from '../../../../src/research/site'
import EvidenceList from './EvidenceList.vue'
import PendingDefinitionItems from './PendingDefinitionItems.vue'
const props=defineProps<{record:TaskPage}>()
const followups=computed(()=>props.record.task.country==='cn'&&props.record.task.industryId==='cn-agriculture'?props.record.task.dossier?.agricultureFollowups as Record<string,any>|undefined:undefined)
const scoped=computed(()=>followups.value?.scoped)
const selected=computed(()=>new Set<string>([...(scoped.value?.claimIds??[]),...(followups.value?.scopedAdditional?.canonicalClaimIds??[])]))
const claims=computed(()=>props.record.claims.filter(c=>selected.value.has(c.id)))
const pending=computed(()=>Object.values(followups.value?.supplementItems??{}) as Record<string,any>[])
const patches=computed(()=>Object.values(followups.value?.supplementPatches??{}) as Record<string,any>[])
const outcomeNames:Record<string,string>={'partial-mechanism-with-conditions':'新增有条件的局部机制','adjacent-process-only':'新增证据仅适用于相邻流程','no-additional-retained-matching-mechanism':'本次补检未保留新增的匹配机制'}
</script>
<template>
 <section v-if="followups" class="work-note" :data-content-id="record.task.id+'-followups'" tabindex="0">
  <h2>补充研究与边界更新</h2>
  <p v-if="scoped"><strong>{{outcomeNames[scoped.outcome.status]}}</strong>。已复核本轮新增证据，原有证据继续保留，任务定义尚未冻结。</p>
  <p v-if="followups.scopedAdditional">从已读取来源补充关联到本任务；本次关联没有新增本任务的独立查询。</p>
  <div v-for="c in claims" :key="c.id"><p>{{c.text}}</p><p class="scope-note">{{c.conditions.join('；')}}</p><EvidenceList :items="c.evidence"/></div>
  <div v-for="patch in patches" :key="patch.id"><p>{{patch.proposedBoundary??patch.conditions}}</p><p v-if="patch.residualGap">{{patch.residualGap}}</p><EvidenceList v-if="patch.references?.length" :items="patch.references"/></div>
  <template v-if="pending.length"><p>以下范围与本任务有关，仍待确认定义、执行者及去重关系。其研究记录单独保留：</p><PendingDefinitionItems :items="pending" :country="record.task.country"/></template>
 </section>
</template>
