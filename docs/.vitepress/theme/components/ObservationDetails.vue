<script setup lang="ts">
import type { Observation } from '../../../../src/research/schema'
import EvidenceList from './EvidenceList.vue'
defineProps<{observation:Observation}>()
const basis={current:'现价',constant:'不变价','not-applicable':'不适用'}
const adjustment={adjusted:'经季节调整',unadjusted:'未季节调整','not-applicable':'不适用',unspecified:'来源未明确'}
</script>
<template>
 <details class="observation-details">
  <summary>{{observation.measure==='real-growth'?'增速口径与来源':'数据口径与来源'}}</summary>
  <dl>
   <dt>原始数值</dt><dd>{{observation.value??'缺失'}} {{observation.unit}} · 原币种记录，不随显示换算改写</dd>
   <dt>数据期</dt><dd>{{observation.period}}{{observation.annualized?' · 季调年率，非当期累计':''}}</dd>
   <dt>发布日期</dt><dd>{{observation.releaseDate??observation.publicationDateNote}}</dd>
   <dt>修订状态</dt><dd>{{observation.revision}}</dd>
   <dt>原始单位与价格</dt><dd>{{observation.unit}} · {{basis[observation.priceBasis]}}</dd>
   <dt>季节调整</dt><dd>{{adjustment[observation.seasonalAdjustment]}}</dd>
   <dt>覆盖范围</dt><dd>{{observation.coverage}}</dd>
   <template v-if="observation.computation"><dt>计算</dt><dd>{{observation.computation.expression}}<br>输入：{{observation.computation.inputs.join('，')}}<br>{{observation.computation.note}}</dd></template>
   <template v-if="observation.missingReason"><dt>缺失原因</dt><dd>{{observation.missingReason}}</dd></template>
  </dl>
  <EvidenceList :items="observation.evidence"/>
 </details>
</template>
<style scoped>
.observation-details{font-size:12px;font-weight:400;line-height:1.65;margin-top:8px;white-space:normal;min-width:112px}
summary{color:#245cb5;cursor:pointer}dl{margin:8px 0;text-align:left}dt{font-weight:650;color:#455269}dd{margin:0 0 6px;overflow-wrap:anywhere;max-width:40rem}
</style>
