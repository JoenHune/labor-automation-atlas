<script setup lang="ts">
import { computed,onMounted,onBeforeUnmount,ref,watch,nextTick } from 'vue'
import { withBase } from 'vitepress'
import * as echarts from 'echarts/core'
import { BarChart,LineChart } from 'echarts/charts'
import { GridComponent,TooltipComponent } from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'
import researchJson from '../../../../data/research.json'
import { annualRanking } from '../../../../src/research/ranking'
import type { Country,Research } from '../../../../src/research/schema'
import EvidenceList from './EvidenceList.vue'
echarts.use([BarChart,LineChart,GridComponent,TooltipComponent,SVGRenderer])
const props=defineProps<{country:Country}>()
const research=researchJson as Research
const profile=computed(()=>research.countries.find(p=>p.country===props.country)!)
const year=ref(2025),focus=ref(props.country+'-gdp'),sort=ref<'value'|'name'>('value')
const chartEl=ref<HTMLDivElement>(),trendEl=ref<HTMLDivElement>()
let chart:echarts.ECharts|undefined,trend:echarts.ECharts|undefined,resize:ResizeObserver|undefined
const rank=computed(()=>annualRanking(props.country,year.value,research.industries,research.observations))
const rows=computed(()=>sort.value==='value'?rank.value.top10:[...rank.value.top10].sort((a,b)=>a.industry.name.localeCompare(b.industry.name,'zh-CN')))
const obs=(id:string,period:string,measure='value-added')=>research.observations.find(o=>o.country===props.country&&o.industryId===id&&o.period===period&&o.measure===measure)
const gdp=computed(()=>obs(props.country+'-gdp',String(year.value)))
const other=computed(()=>obs(props.country==='cn'?'cn-other':'us-other-services',String(year.value)))
const latest=computed(()=>obs(props.country+'-gdp',profile.value.latestPeriod))
const latestGrowth=computed(()=>obs(props.country+'-gdp',profile.value.latestPeriod,'real-growth'))
const unit=computed(()=>props.country==='cn'?'亿元':'百万美元')
const format=(value:number|null|undefined)=>value==null?'—':value.toLocaleString('zh-CN',{maximumFractionDigits:1})
const coverage=computed(()=>gdp.value?.value?rank.value.top10.reduce((sum,r)=>sum+(r.observation?.value??0),0)/gdp.value.value*100:null)
const focusIndustry=computed(()=>research.industries.find(i=>i.id===focus.value))
const progress=computed(()=>research.observations.filter(o=>o.country===props.country&&(o.frequency==='month'||o.frequency==='year-to-date')))
const trendPoints=computed(()=>[2021,2022,2023,2024,2025].map(y=>obs(focus.value,String(y))))
function syncState() {
 if(typeof window==='undefined') return
 const q=new URLSearchParams(location.search);q.set('year',String(year.value));q.set('focus',focus.value);q.set('sort',sort.value)
 history.replaceState(null,'',location.pathname+'?'+q+location.hash)
 window.dispatchEvent(new CustomEvent('atlas:view-change',{detail:{country:props.country,year:year.value,focus:focus.value,sort:sort.value}}))
}
function restore() {
 const q=new URLSearchParams(location.search),y=Number(q.get('year'))
 if([2021,2022,2023,2024,2025].includes(y))year.value=y
 const f=q.get('focus')
 focus.value=f&&research.industries.some(i=>i.id===f&&i.country===props.country)?f:props.country+'-gdp'
 sort.value=q.get('sort')==='name'?'name':'value'
}
function draw() {
 if(!chart||!trend) return
 const list=[...rank.value.top10].reverse()
 chart.setOption({
  animation:false,textStyle:{fontFamily:'system-ui,sans-serif'},
  grid:{left:8,right:30,top:12,bottom:20,containLabel:true},
  tooltip:{trigger:'axis',confine:true,valueFormatter:(v:unknown)=>format(Number(v))+' '+unit.value},
  xAxis:{type:'value',axisLabel:{fontSize:12},splitLine:{lineStyle:{color:'#edf0f5'}}},
  yAxis:{type:'category',data:list.map(x=>x.industry.name),axisTick:{show:false},axisLine:{show:false},axisLabel:{fontSize:12,width:160,overflow:'break'}},
  series:[{type:'bar',data:list.map(x=>({value:x.observation?.value??null,name:x.industry.name,id:x.industry.id})),barMaxWidth:21,itemStyle:{color:'#2461d5',borderRadius:[0,3,3,0]}}],
 },true)
 trend.setOption({
  animation:false,grid:{left:8,right:20,top:20,bottom:24,containLabel:true},
  tooltip:{trigger:'axis',confine:true,valueFormatter:(v:unknown)=>format(Number(v))+' '+unit.value},
  xAxis:{type:'category',data:['2021','2022','2023','2024','2025'],axisLine:{lineStyle:{color:'#cbd5e1'}}},
  yAxis:{type:'value',axisLabel:{fontSize:12},splitLine:{lineStyle:{color:'#edf0f5'}}},
  series:[{type:'line',data:trendPoints.value.map(o=>o?.value??null),connectNulls:false,symbolSize:7,lineStyle:{color:'#2461d5',width:3},itemStyle:{color:'#2461d5'}}],
 },true)
 syncChartAnchors()
}
function syncChartAnchors() {
 if(!chart||!trend||!chartEl.value||!trendEl.value)return
 const list=[...rank.value.top10].reverse()
 for(const [el,instance,points] of [
  [chartEl.value,chart,list.map((r,i)=>({key:r.industry.id,period:String(year.value),value:r.observation?.value??null,index:i}))],
  [trendEl.value,trend,trendPoints.value.map((o,i)=>({key:focus.value,period:String(2021+i),value:o?.value??null,index:i}))],
 ] as const) {
  const host=el.closest<HTMLElement>('[data-content-id]')!,box=el.getBoundingClientRect(),outer=host.getBoundingClientRect()
  host.dataset.annotationPoints=JSON.stringify(points.map(({index,...p})=>p))
  host.dataset.annotationPointRects=JSON.stringify(points.filter(p=>p.value!==null).map(p=>{
   const pos=instance.convertToPixel({seriesIndex:0},instance===chart?[p.value,p.index]:[p.index,p.value]) as number[]
   const zero=instance===chart?instance.convertToPixel({xAxisIndex:0},0) as number:pos[0]
   return {key:p.key,period:p.period,value:p.value,rect:{x:box.x-outer.x+(instance===chart?zero:pos[0]-8),y:box.y-outer.y+pos[1]-(instance===chart?11:8),width:instance===chart?Math.max(1,pos[0]-zero):16,height:instance===chart?22:16}}
  }))
 }
}
watch([year,focus,sort],async()=>{syncState();await nextTick();draw()})
onMounted(async()=>{
 restore();await nextTick()
 chart=echarts.init(chartEl.value!,undefined,{renderer:'svg'});trend=echarts.init(trendEl.value!,undefined,{renderer:'svg'})
 chart.on('click',(e:any)=>{if(e.data?.id)focus.value=e.data.id})
 resize=new ResizeObserver(()=>{chart?.resize();trend?.resize();syncChartAnchors()});resize.observe(chartEl.value!);resize.observe(trendEl.value!)
 window.addEventListener('popstate',restore);syncState();draw()
})
onBeforeUnmount(()=>{chart?.dispose();trend?.dispose();resize?.disconnect();window.removeEventListener('popstate',restore)})
</script>
<template>
 <div class="atlas-country" :data-country="country">
  <div class="page-top"><div><p class="eyebrow">{{country==='cn'?'CHINA':'UNITED STATES'}} · 数据核查 {{profile.checkedAt}}</p><h1>{{profile.name}} · 行业全景</h1></div>
   <label class="year-control">查看年份 <select v-model="year" aria-label="查看年份"><option v-for="y in [2025,2024,2023,2022,2021]" :value="y">{{y}}{{y===2025?' · 最新全年':''}}</option></select></label>
  </div>
  <p v-if="year!==2025" class="historical-note" :data-content-id="country+'-historical-notice'" tabindex="0">正在查看 {{year}} 年历史数据。最新完整年度为 2025 年，最新行业进展为 {{profile.latestPeriod}}。</p>
  <p class="scope-note" :data-content-id="country+'-scope'" tabindex="0">{{profile.scope}} {{country==='cn'?'仅在最新官方发布的十个具名大类内排名；其他行业保留未拆分汇总。':'20 组非重叠行业构成排名范围；政府整体与私人行业分别列示。'}}</p>
  <div class="stats-row">
   <section :data-content-id="country+'-gdp-'+year" tabindex="0"><span>{{year}} 全年 GDP</span><strong>{{format(gdp?.value)}}</strong><span>{{unit}} · 现价</span><small>发布 {{gdp?.releaseDate??'年鉴未标具体日期'}}<br>{{gdp?.revision}}</small><EvidenceList v-if="gdp" :items="gdp.evidence"/></section>
   <section :data-content-id="country+'-coverage-'+year" tabindex="0"><span>具名 Top 10 占 GDP</span><strong>{{coverage?.toFixed(2)}}<em>%</em></strong><span>计算：入榜行业现价之和 ÷ GDP</span><small>覆盖规模用于研究筛选，不能视为可自动化市场。</small></section>
   <section :data-content-id="country+'-latest-'+profile.latestPeriod" tabindex="0"><span>最新进展 · {{profile.latestPeriod}}</span><strong>{{format(latest?.value)}}</strong><span>{{unit}}{{latest?.annualized?' · 季调年率':' · 当期现价'}}</span><small>发布 {{profile.latestRelease}} · 实际增长 {{latestGrowth?.value??'—'}}%{{country==='us'?'（环比折年）':'（同比）'}}</small><EvidenceList v-if="latest" :items="latest.evidence"/></section>
  </div>
  <section :data-content-id="country+'-ranking-chart-'+year" tabindex="0" class="chart-section">
   <div class="section-header"><h2>{{year}} 年行业规模</h2><span>现价增加值 · {{unit}}</span></div>
   <div ref="chartEl" class="rank-chart" role="img" :aria-label="year+'年'+profile.name+'行业增加值，精确值见下表'"></div>
  </section>
  <section :data-content-id="country+'-ranking-table'" tabindex="0">
   <div class="section-header"><h2>行业榜单</h2><label>排序 <select v-model="sort" aria-label="表格排序"><option value="value">增加值</option><option value="name">名称</option></select></label></div>
   <div class="table-scroll"><table class="atlas-table"><thead><tr><th>排名</th><th>行业</th><th class="numeric">{{year}} 年 · {{unit}}</th><th>证据与趋势</th></tr></thead><tbody>
    <tr v-for="r in rows" :key="r.industry.id" :data-content-id="r.industry.id+'-annual-'+year" :data-observation-id="r.observation?.id" tabindex="0">
     <td>{{rank.top10.findIndex(x=>x.industry.id===r.industry.id)+1}}</td><th scope="row"><a v-if="r.industry.selected" :href="withBase('/'+country+'/industries/'+r.industry.id)">{{r.industry.name}}</a><span v-else>{{r.industry.name}}</span></th><td class="numeric">{{format(r.observation?.value)}}</td><td><button @click="focus=r.industry.id">看五年趋势</button><EvidenceList v-if="r.observation" :items="r.observation.evidence"/></td>
    </tr>
    <tr v-for="r in rank.supplements" :key="r.industry.id" :data-content-id="r.industry.id+'-annual-'+year" tabindex="0"><td>补充</td><th scope="row">{{r.industry.name}}<small>补充榜单未覆盖产业</small></th><td class="numeric">{{format(r.observation?.value)}}</td><td><button @click="focus=r.industry.id">看五年趋势</button><EvidenceList v-if="r.observation" :items="r.observation.evidence"/></td></tr>
   </tbody></table></div>
   <p class="scope-note">{{country==='cn'?'工业整体入榜，制造业为子项，不再同时排名。三次产业合计不参与行业榜。':'排名以官方行值计算；不同时列入父级汇总和子行业。'}}</p>
  </section>
  <section :data-content-id="focus+'-trend'" tabindex="0" class="chart-section">
   <div class="section-header"><h2>{{focusIndustry?.name}} · 2021—2025</h2><label>趋势对象 <select v-model="focus" aria-label="趋势行业"><option :value="country+'-gdp'">GDP</option><option v-for="i in research.industries.filter(i=>i.country===country&&i.rankingUniverse)" :value="i.id">{{i.name}}</option></select></label></div>
   <div ref="trendEl" class="trend-chart" role="img" :aria-label="focusIndustry?.name+'近五年趋势'"></div>
   <div class="trend-values"><div v-for="(o,i) in trendPoints" :key="i" :data-content-id="focus+'-trend-value-'+(2021+i)" tabindex="0"><span>{{2021+i}} 年</span><strong>{{format(o?.value)}}</strong><small>{{unit}} · {{o?.releaseDate??'发布日期未注明'}}</small><EvidenceList v-if="o" :items="o.evidence"/></div></div>
   <p class="scope-note">{{country==='cn'?'2021—2023：2025版年鉴的修订后历史值；2024：最终核实；2025：初步核算。':'五年均采用2026-06-25版最新可获取修订序列。'}}</p>
  </section>
  <section :data-content-id="country+'-other-'+year" tabindex="0" class="coverage-box"><h2>未拆分汇总与覆盖缺口</h2><p>{{country==='cn'?'其他行业':'其他服务业（不含政府）'}}：<strong>{{format(other?.value)}} {{unit}}</strong> · {{year}} 年现价。{{country==='cn'?'不将旧年度细分值当作当前规模。':'保留官方行业汇总，不编造细分；九个未入选行业仍在数据下载中。'}}</p><EvidenceList v-if="other" :items="other.evidence"/></section>
  <section v-if="progress.length" :data-content-id="country+'-monthly-progress'" tabindex="0"><h2>月度进度 · {{profile.monthlyPeriod}}</h2><p>发布 {{profile.monthlyRelease}}。这些增长指标反映进展，不用于年度规模排名。</p><ul class="progress-list"><li v-for="p in progress" :key="p.id" :data-content-id="p.id" tabindex="0">{{p.period}} · {{research.industries.find(i=>i.id===p.industryId)?.name}} · {{p.label}} <strong>{{p.value}}%</strong><EvidenceList :items="p.evidence"/></li></ul></section>
  <details class="method-details"><summary>统计范围、修订与当前缺口</summary><ul><li v-for="text in profile.caveats">{{text}}</li><li v-for="text in profile.gaps">{{text}}</li></ul><EvidenceList :items="profile.evidence"/></details>
  <p><a :href="withBase('/exports/research.json')" download>下载完整数据及来源</a> · <a :href="withBase('/methodology')">研究方法</a></p>
 </div>
</template>
