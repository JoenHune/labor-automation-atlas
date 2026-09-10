<script setup lang="ts">
import { computed,onMounted,onBeforeUnmount,ref,watch,nextTick } from 'vue'
import { withBase } from 'vitepress'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent,TooltipComponent } from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'
import researchJson from '../../../../data/site.json'
import { annualRanking } from '../../../../src/research/ranking'
import {chartRecord,downloadChartData,downloadChartSvg} from '../../../../src/research/chart-export'
import type { Country,Research } from '../../../../src/research/schema'
import EvidenceList from './EvidenceList.vue'
import ObservationDetails from './ObservationDetails.vue'
import CountryTaskSearch from './CountryTaskSearch.vue'
import {useCurrency} from '../../../../src/preferences/currency'
import IndustryScaleChart from './IndustryScaleChart.vue'
echarts.use([LineChart,GridComponent,TooltipComponent,SVGRenderer])
const props=defineProps<{country:Country}>()
const research=researchJson as Research
const profile=computed(()=>research.countries.find(p=>p.country===props.country)!)
const year=ref(2025),focus=ref(props.country+'-gdp'),sort=ref<'value'|'name'>('value')
const scaleView=ref<InstanceType<typeof IndustryScaleChart>>()
const trendEl=ref<HTMLDivElement>()
let trend:echarts.ECharts|undefined,resize:ResizeObserver|undefined
const rank=computed(()=>annualRanking(props.country,year.value,research.industries,research.observations))
const rows=computed(()=>sort.value==='value'?rank.value.top10:[...rank.value.top10].sort((a,b)=>a.industry.name.localeCompare(b.industry.name,'zh-CN')))
const obs=(id:string,period:string,measure='value-added')=>research.observations.find(o=>o.country===props.country&&o.industryId===id&&o.period===period&&o.measure===measure)
const gdp=computed(()=>obs(props.country+'-gdp',String(year.value)))
const other=computed(()=>obs(props.country==='cn'?'cn-other':'us-other-services',String(year.value)))
const latest=computed(()=>obs(props.country+'-gdp',profile.value.latestPeriod))
const latestGrowth=computed(()=>obs(props.country+'-gdp',profile.value.latestPeriod,'real-growth'))
const {settings:currencySettings,unit,value:moneyValue,amount,disclosure:currencyNote}=useCurrency()
const format=(value:number|null|undefined)=>value==null?'—':value.toLocaleString('zh-CN',{maximumFractionDigits:1})
const coverage=computed(()=>gdp.value?.value?rank.value.top10.reduce((sum,r)=>sum+(r.observation?.value??0),0)/gdp.value.value*100:null)
const focusIndustry=computed(()=>research.industries.find(i=>i.id===focus.value))
const progress=computed(()=>research.observations.filter(o=>o.country===props.country&&(o.frequency==='month'||o.frequency==='year-to-date')))
const latestIndustries=computed(()=>research.industries.filter(i=>i.country===props.country&&i.selected).map(industry=>({industry,value:obs(industry.id,profile.value.latestPeriod),growth:obs(industry.id,profile.value.latestPeriod,'real-growth')})))
const trendPoints=computed(()=>[2021,2022,2023,2024,2025].map(y=>obs(focus.value,String(y))))
const exportNotice=ref('')
const chartId=(kind:'ranking'|'trend')=>props.country+'-'+kind+'-chart'
function exportRecord() {
 return chartRecord(research,props.country,`${profile.value.name} · ${focusIndustry.value?.name} · 2021—2025`,trendPoints.value,currencySettings.value)
}
function exportData(){downloadChartData(exportRecord(),props.country+'-trend-'+focus.value)}
function exportSvg() {
 if(!trend)return
 const record=exportRecord();downloadChartSvg(trend,record.title,`${unit.value} · 现价 · 1美元=${currencySettings.value.usdCny}人民币 · 核查 ${research.checkedAt} · 原值与换算见配套数据`,props.country+'-trend-'+focus.value)
}
async function shareChart() {
 const url=new URL(location.href);url.hash=chartId('trend')
 try{await navigator.clipboard.writeText(url.href);exportNotice.value='已复制图表链接，包含国家、年份和当前筛选。'}catch{history.replaceState(null,'',url);exportNotice.value='请复制地址栏中的图表链接。'}
}
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
async function expandIndustry(id:string){await scaleView.value?.reveal(id)}
function draw() {
 if(!trend) return
 trend.setOption({
  animation:false,grid:{left:8,right:20,top:20,bottom:24,containLabel:true},
  tooltip:{trigger:'axis',confine:true,valueFormatter:(v:unknown)=>format(Number(v))+' '+unit.value},
  xAxis:{type:'category',data:['2021','2022','2023','2024','2025'],axisLine:{lineStyle:{color:'#cbd5e1'}}},
  yAxis:{type:'value',axisLabel:{fontSize:12},splitLine:{lineStyle:{color:'#edf0f5'}}},
  series:[{type:'line',data:trendPoints.value.map(o=>moneyValue(o)),connectNulls:false,symbolSize:7,lineStyle:{color:'#2461d5',width:3},itemStyle:{color:'#2461d5'}}],
 },true)
 syncChartAnchors()
}
function syncChartAnchors() {
 if(!trend||!trendEl.value)return
 const el=trendEl.value,host=el.closest<HTMLElement>('[data-content-id]')!,box=el.getBoundingClientRect(),outer=host.getBoundingClientRect()
 const points=trendPoints.value.map((o,i)=>({key:focus.value,period:String(2021+i),value:o?.value??null,displayValue:moneyValue(o),index:i}))
 host.dataset.annotationPoints=JSON.stringify(points.map(({index,displayValue,...p})=>p))
 host.dataset.annotationPointRects=JSON.stringify(points.filter(p=>p.value!==null).map(p=>{
  const pos=trend!.convertToPixel({seriesIndex:0},[p.index,p.displayValue]) as number[]
  return {key:p.key,period:p.period,value:p.value,rect:{x:box.x-outer.x+pos[0]-8,y:box.y-outer.y+pos[1]-8,width:16,height:16}}
 }))
}
watch([year,focus,sort,currencySettings],async()=>{syncState();await nextTick();draw()})
onMounted(async()=>{
 restore();await nextTick()
 trend=echarts.init(trendEl.value!,undefined,{renderer:'svg'})
 resize=new ResizeObserver(()=>{trend?.resize();syncChartAnchors()});resize.observe(trendEl.value!)
 window.addEventListener('popstate',restore);syncState();draw()
})
onBeforeUnmount(()=>{trend?.dispose();resize?.disconnect();window.removeEventListener('popstate',restore)})
</script>
<template>
 <div class="atlas-country" :data-country="country">
  <div class="page-top"><div><p class="eyebrow">{{country==='cn'?'CHINA':'UNITED STATES'}} · 数据核查 {{profile.checkedAt}}</p><h1>{{profile.name}} · 行业全景</h1></div>
   <label class="year-control">查看年份 <select v-model="year" aria-label="查看年份"><option v-for="y in [2025,2024,2023,2022,2021]" :value="y">{{y}}{{y===2025?' · 最新全年':''}}</option></select></label>
  </div>
  <p v-if="year!==2025" class="historical-note" :data-content-id="country+'-historical-notice'" tabindex="0">正在查看 {{year}} 年历史数据。最新完整年度为 2025 年，最新行业进展为 {{profile.latestPeriod}}。</p>
  <p class="scope-note" :data-content-id="country+'-scope'" tabindex="0">{{profile.scope}} {{country==='cn'?'仅在最新官方发布的十个具名大类内排名；其他行业保留未拆分汇总。':'20 组非重叠行业构成排名范围；政府整体与私人行业分别列示。'}}</p>
  <p class="scope-note" :data-content-id="country+'-currency-display'" tabindex="0">{{currencyNote}}</p>
  <div class="stats-row">
   <section :data-content-id="country+'-gdp-'+year" tabindex="0"><span>{{year}} 全年 GDP</span><strong>{{amount(gdp)}}</strong><span>{{unit}} · 现价</span><small>发布 {{gdp?.releaseDate??'年鉴未标具体日期'}}<br>{{gdp?.revision}}</small><ObservationDetails v-if="gdp" :observation="gdp"/></section>
   <section :data-content-id="country+'-coverage-'+year" tabindex="0"><span>具名 Top 10 占 GDP</span><strong>{{coverage?.toFixed(2)}}<em>%</em></strong><span>计算：入榜行业现价之和 ÷ GDP</span><small>覆盖规模用于研究筛选，不能视为可自动化市场。</small><details class="observation-details"><summary>计算与来源</summary><p>{{year}}年，{{unit}}，现价。分子 {{rank.top10.map(r=>amount(r.observation)).join(' + ')}}；分母 {{amount(gdp)}}；结果乘100并四舍五入到两位小数。</p><EvidenceList :items="[...new Map([...rank.top10.flatMap(r=>r.observation?.evidence??[]),...(gdp?.evidence??[])].map(r=>[r.sourceId+'|'+r.locator,r])).values()]"/></details></section>
   <section :data-content-id="country+'-latest-'+profile.latestPeriod" tabindex="0"><span>最新进展 · {{profile.latestPeriod}}</span><strong>{{amount(latest)}}</strong><span>{{unit}}{{latest?.annualized?' · 季调年率':' · 当期现价'}}</span><small>发布 {{profile.latestRelease}} · 实际增长 {{latestGrowth?.value??'—'}}%{{country==='us'?'（环比折年）':'（同比）'}}</small><ObservationDetails v-if="latest" :observation="latest"/><ObservationDetails v-if="latestGrowth" :observation="latestGrowth"/></section>
  </div>
  <IndustryScaleChart ref="scaleView" :research="research" :country="country" :year="year" @year="year=$event"/>
  <section :data-content-id="country+'-ranking-table'" tabindex="0">
   <div class="section-header"><h2>行业榜单</h2><label>排序 <select v-model="sort" aria-label="表格排序"><option value="value">增加值</option><option value="name">名称</option></select></label></div>
   <div class="table-scroll"><table class="atlas-table"><thead><tr><th>排名</th><th>行业</th><th class="numeric">{{year}} 年 · {{unit}}</th><th>证据与趋势</th></tr></thead><tbody>
    <tr v-for="r in rows" :key="r.industry.id" :data-content-id="r.industry.id+'-annual-'+year" :data-observation-id="r.observation?.id" tabindex="0">
     <td>{{rank.top10.findIndex(x=>x.industry.id===r.industry.id)+1}}</td><th scope="row"><a v-if="r.industry.selected" :href="withBase('/'+country+'/industries/'+r.industry.id)">{{r.industry.name}}</a><span v-else>{{r.industry.name}}</span></th><td class="numeric">{{amount(r.observation)}}</td><td><button :aria-label="r.industry.name+'细分行业'" @click="expandIndustry(r.industry.id)">细分行业</button> · <button @click="focus=r.industry.id">看五年趋势</button><ObservationDetails v-if="r.observation" :observation="r.observation"/></td>
    </tr>
    <tr v-for="r in rank.supplements" :key="r.industry.id" :data-content-id="r.industry.id+'-annual-'+year" tabindex="0"><td>补充</td><th scope="row"><a :href="withBase('/'+country+'/industries/'+r.industry.id)">{{r.industry.name}}</a><small>补充榜单未覆盖产业</small></th><td class="numeric">{{amount(r.observation)}}</td><td><button :aria-label="r.industry.name+'细分行业'" @click="expandIndustry(r.industry.id)">细分行业</button> · <button @click="focus=r.industry.id">看五年趋势</button><ObservationDetails v-if="r.observation" :observation="r.observation"/></td></tr>
   </tbody></table></div>
   <p class="scope-note">{{country==='cn'?'工业整体入榜，制造业为子项，不再同时排名。三次产业合计不参与行业榜。':'排名以官方行值计算；不同时列入父级汇总和子行业。'}}</p>
  </section>
  <section :id="chartId('trend')" :data-content-id="focus+'-trend'" tabindex="0" class="chart-section">
   <div class="section-header"><h2>{{focusIndustry?.name}} · 2021—2025</h2><label>趋势对象 <select v-model="focus" aria-label="趋势行业"><option :value="country+'-gdp'">GDP</option><option v-for="i in research.industries.filter(i=>i.country===country&&i.rankingUniverse)" :value="i.id">{{i.name}}</option></select></label></div>
   <div ref="trendEl" :data-content-id="focus+'-trend-plot'" tabindex="0" class="trend-chart" role="img" :aria-label="focusIndustry?.name+'近五年趋势'"></div>
   <div class="chart-actions"><button @click="shareChart()">分享趋势图</button><button @click="exportSvg()">导出趋势图 SVG</button><button @click="exportData()">导出趋势数据与来源</button></div>
   <div class="trend-values"><div v-for="(o,i) in trendPoints" :key="i" :data-content-id="focus+'-trend-value-'+(2021+i)" tabindex="0"><span>{{2021+i}} 年</span><strong>{{amount(o)}}</strong><small>{{unit}} · {{o?.releaseDate??'发布日期未注明'}}</small><ObservationDetails v-if="o" :observation="o"/></div></div>
   <p class="scope-note">{{country==='cn'?'2021—2023：2025版年鉴的修订后历史值；2024：最终核实；2025：初步核算。':'五年均采用2026-06-25版最新可获取修订序列。'}}</p>
  </section>
  <section :data-content-id="country+'-other-'+year" tabindex="0" class="coverage-box"><h2>未拆分汇总与覆盖缺口</h2><p>{{country==='cn'?'其他行业':'其他服务业（不含政府）'}}：<strong>{{amount(other)}} {{unit}}</strong> · {{year}} 年现价。{{country==='cn'?'不将旧年度细分值当作当前规模。':'保留官方行业汇总，不编造细分；九个未入选行业仍在数据下载中。'}}</p><ObservationDetails v-if="other" :observation="other"/></section>
  <section :data-content-id="country+'-industry-progress'" tabindex="0"><h2>行业最新一期 · {{profile.latestPeriod}}</h2><p class="scope-note">发布 {{profile.latestRelease}}。{{country==='us'?'现价列为季度季调年率，实际增长为环比折年率；不参与年度排名。':'现价列为上半年累计增加值，实际增长为同比；不参与年度排名。'}}</p><div class="table-scroll"><table class="atlas-table"><thead><tr><th>入选行业</th><th>{{profile.latestPeriod}} · {{unit}}{{country==='us'?'（季调年率）':''}}</th><th>实际增长</th><th>来源与统计范围</th></tr></thead><tbody><tr v-for="row in latestIndustries" :key="row.industry.id" :data-content-id="row.industry.id+'-progress-'+profile.latestPeriod" tabindex="0"><th>{{row.industry.name}}</th><td class="numeric">{{amount(row.value)}}</td><td class="numeric">{{format(row.growth?.value)}}%</td><td><ObservationDetails v-if="row.value" :observation="row.value"/><ObservationDetails v-if="row.growth" :observation="row.growth"/></td></tr></tbody></table></div></section>
  <section v-if="progress.length" :data-content-id="country+'-monthly-progress'" tabindex="0"><h2>月度进度 · {{profile.monthlyPeriod}}</h2><p>发布 {{profile.monthlyRelease}}。这些增长指标反映进展，不用于年度规模排名。</p><ul class="progress-list"><li v-for="p in progress" :key="p.id" :data-content-id="p.id" tabindex="0">{{p.period}} · {{research.industries.find(i=>i.id===p.industryId)?.name}} · {{p.label}} <strong>{{p.value}}%</strong><ObservationDetails :observation="p"/></li></ul></section>
  <details class="method-details"><summary>统计范围、修订与当前缺口</summary><ul><li v-for="text in profile.caveats">{{text}}</li><li v-for="text in profile.gaps">{{text}}</li></ul><EvidenceList :items="profile.evidence"/></details>
  <CountryTaskSearch :country="country"/>
  <p v-if="exportNotice" role="status">{{exportNotice}}</p>
  <p><a :href="withBase('/exports/research.json')" download>下载完整数据及来源</a> · <a :href="withBase('/methodology')">研究方法</a></p>
 </div>
</template>
<style scoped>
.chart-actions{display:flex;flex-wrap:wrap;gap:14px;margin:8px 0 18px;font-size:12px;color:#245cb5}.chart-actions button{cursor:pointer;text-decoration:underline;text-underline-offset:3px}.chart-section{scroll-margin-top:112px}
</style>
