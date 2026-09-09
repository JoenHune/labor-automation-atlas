<script setup lang="ts">
import research from '../../../../data/site.json'
import {evidenceLevelNames,evidenceReadNames,evidenceDateNames} from '../../../../src/research/evidence-labels'
import type {Research} from '../../../../src/research/schema'
defineProps<{items:{sourceId:string,locator:string,excerpt?:string}[]}>()
const source=(id:string):Research['sources'][number]|undefined=>research.sources.find(s=>s.id===id) as Research['sources'][number]|undefined
</script>
<template>
 <details class="evidence-list"><summary>来源与原文定位</summary>
 <ol><li v-for="e in items" :key="e.sourceId+e.locator">
  <a :href="source(e.sourceId)?.url" target="_blank" rel="noopener noreferrer">{{source(e.sourceId)?.title??e.sourceId}}</a>
  <p>{{e.locator}}</p><p v-if="e.excerpt">原值：{{e.excerpt}}</p>
  <small>{{source(e.sourceId)?.publisher}} · 首次发布 {{source(e.sourceId)?.published??'未确认具体日期'}} · 获取 {{source(e.sourceId)?.retrieved}}</small>
  <p v-if="source(e.sourceId)?.evidencePeriod" class="historical-note">使用资料时期：{{source(e.sourceId)?.evidencePeriod}}</p>
  <p v-if="source(e.sourceId)?.evidenceLevel">{{evidenceLevelNames[source(e.sourceId)!.evidenceLevel!]??source(e.sourceId)?.evidenceLevel}} · {{evidenceReadNames[source(e.sourceId)!.readStatus!]??source(e.sourceId)?.readStatus}}</p>
  <ul v-if="source(e.sourceId)?.dates?.length"><li v-for="date in source(e.sourceId)?.dates">{{evidenceDateNames[date.kind]}} {{date.value}}：{{date.note}}</li></ul>
  <ul v-if="source(e.sourceId)?.limitations.length"><li v-for="limit in source(e.sourceId)?.limitations">{{limit}}</li></ul>
 </li></ol></details>
</template>
