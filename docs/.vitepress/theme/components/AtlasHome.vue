<script setup lang="ts">
import { withBase } from 'vitepress'
import research from '../../../../data/site.json'
import type {Observation} from '../../../../src/research/schema'
import ObservationDetails from './ObservationDetails.vue'
const labels={cn:'中国',us:'美国'}
const latest=(country:string)=>research.observations.find(o=>o.industryId===country+'-gdp'&&o.period==='2025'&&o.measure==='value-added')
const fmt=(n:number|null|undefined)=>n==null?'—':n.toLocaleString('zh-CN')
</script>
<template>
 <div class="atlas-home">
  <p class="eyebrow">研究工作版 · 数据核查 2026-09-09</p>
  <h1>人力与自动化图谱</h1>
  <p class="intro">从行业规模进入流程，逐项查看人工任务、自动化证据与成立条件。</p>
  <div class="country-grid">
   <section v-for="p in research.countries" :key="p.country" :data-content-id="p.country+'-home-summary'" tabindex="0" class="country-entry">
    <span class="eyebrow">{{p.country==='cn'?'CHINA':'UNITED STATES'}}</span>
    <h2>{{labels[p.country as 'cn'|'us']}}</h2>
    <p class="metric">{{fmt(latest(p.country)?.value)}}<span>{{latest(p.country)?.unit}}</span></p>
    <p>2025 全年 GDP · 现价</p>
    <p class="scope-note">全年值发布 {{latest(p.country)?.releaseDate}} · {{latest(p.country)?.revision}}</p>
    <ObservationDetails v-if="latest(p.country)" :observation="latest(p.country) as Observation"/>
    <dl><dt>行业最新一期</dt><dd>{{p.latestPeriod}}</dd><dt>发布日期</dt><dd>{{p.latestRelease}}</dd><dt>研究范围</dt><dd>{{p.country==='cn'?'10 个具名大类':'Top 10 ＋农林渔猎业'}}</dd></dl>
    <a class="entry-link" :href="withBase('/'+p.country+'/')">进入{{labels[p.country as 'cn'|'us']}}全景 <span aria-hidden="true">→</span></a>
   </section>
  </div>
  <p class="work-note" data-content-id="global-working-status" tabindex="0">当前已建立官方数据底表，行业任务研究与区域批注系统正在推进。本版尚未冻结或完成公开发布验收。</p>
  <a :href="withBase('/exports/research.json')" download>下载当前完整研究数据（JSON）</a>
 </div>
</template>
