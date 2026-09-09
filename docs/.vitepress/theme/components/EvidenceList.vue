<script setup lang="ts">
import research from '../../../../data/site.json'
defineProps<{items:{sourceId:string,locator:string,excerpt?:string}[]}>()
const source=(id:string)=>research.sources.find(s=>s.id===id)
</script>
<template>
 <details class="evidence-list"><summary>来源与原文定位</summary>
 <ol><li v-for="e in items" :key="e.sourceId+e.locator">
  <a :href="source(e.sourceId)?.url" target="_blank" rel="noopener noreferrer">{{source(e.sourceId)?.title??e.sourceId}}</a>
  <p>{{e.locator}}</p><p v-if="e.excerpt">原值：{{e.excerpt}}</p>
  <small>{{source(e.sourceId)?.publisher}} · 发布 {{source(e.sourceId)?.published??'未标具体日期'}} · 获取 {{source(e.sourceId)?.retrieved}}</small><ul v-if="source(e.sourceId)?.limitations.length"><li v-for="limit in source(e.sourceId)?.limitations">{{limit}}</li></ul>
 </li></ol></details>
</template>

