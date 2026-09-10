<script setup lang="ts">
import {computed,ref,watch,nextTick,onMounted,onBeforeUnmount} from 'vue'
import * as echarts from 'echarts/core'
import {BarChart} from 'echarts/charts'
import {GridComponent,TooltipComponent,GraphicComponent} from 'echarts/components'
import {SVGRenderer} from 'echarts/renderers'
import type {Country,Research} from '../../../../src/research/schema'
import {industryScale,scaleSources,scaleIndex,scaleRows,scaleState,scaleShare,scaleAmount,scaleRemainder,type ScaleNode} from '../../../../src/research/industry-scale'
import {useCurrency} from '../../../../src/preferences/currency'
import {formatAmount} from '../../../../src/research/currency'
import {downloadChartSvg} from '../../../../src/research/chart-export'
import EvidenceList from './EvidenceList.vue'
echarts.use([BarChart,GridComponent,TooltipComponent,GraphicComponent,SVGRenderer])
const props=defineProps<{research:Research;country:Country;year:number}>()
const emit=defineEmits<{year:[number]}>()
const {settings,unit}=useCurrency()
const roots=computed(()=>industryScale(props.research,props.country,props.year))
const sources=computed(()=>scaleSources(props.research,props.country))
const index=computed(()=>scaleIndex(roots.value))
const expanded=ref(new Set<string>()),selectedId=ref(''),notice=ref('')
const rows=computed(()=>scaleRows(roots.value,expanded.value))
const selected=computed(()=>index.value.get(selectedId.value))
const parent=computed(()=>selected.value?.parentId?index.value.get(selected.value.parentId):undefined)
const selectedShare=computed(()=>selected.value?scaleShare(selected.value,parent.value):null)
const selectedRemainder=computed(()=>selected.value?scaleRemainder(selected.value):null)
const chartEl=ref<HTMLDivElement>(),host=ref<HTMLElement>(),drawer=ref<HTMLElement>()
const closeButton=ref<HTMLButtonElement>()
const compact=ref(false)
const height=computed(()=>Math.max(420,rows.value.length*(compact.value?66:46)+36))
let chart:echarts.ECharts|undefined,resize:ResizeObserver|undefined,mounted=false,restoring=false,returnFocus:HTMLElement|null=null
const money=(node:ScaleNode)=>formatAmount(scaleAmount(node,settings.value),1)
const pct=(value:number|null)=>value===null?'—':value.toFixed(2)+'%'
const countryName=computed(()=>props.country==='cn'?'中国':'美国')
const trail=computed(()=>{
 const result:ScaleNode[]=[];let node=selected.value
 while(node){result.unshift(node);node=node.parentId?index.value.get(node.parentId):undefined}
 return result
})
const completeYears=computed(()=>{
 const id=trail.value[0]?.id??[...expanded.value][0]
 const parent=props.research.subindustryProductivity?.parents.find(p=>p.country===props.country&&p.parentIndustryId===id)
 return [...new Set(parent?.rows.map(r=>r.year)??[])].filter(y=>y!==props.year&&parent!.rows.filter(r=>r.year===y).every(r=>r.valueAdded.value!==null)).sort((a,b)=>b-a)
})
const gapsVisible=computed(()=>rows.value.some(r=>r.depth>0&&r.node.value===null))
function sync(){
 if(!mounted||restoring)return
 const url=new URL(location.href)
 for(const key of ['filter.subindustry','filter.subyear','filter.subsort'])url.searchParams.delete(key)
 if(expanded.value.size||selectedId.value)url.searchParams.set('filter.scaleExpanded',[...expanded.value].join(','));else url.searchParams.delete('filter.scaleExpanded')
 if(selectedId.value)url.searchParams.set('filter.scaleDetail',selectedId.value);else url.searchParams.delete('filter.scaleDetail')
 history.replaceState(null,'',url);window.dispatchEvent(new CustomEvent('atlas:view-change'))
}
function restore(){
 restoring=true
 const state=scaleState(index.value,new URLSearchParams(location.search))
 expanded.value=state.expanded;selectedId.value=state.selected
 restoring=false
}
function toggle(id:string){
 const node=index.value.get(id);if(!node?.children.length)return
 const next=new Set(expanded.value)
 if(next.has(id)){
  const remove=(n:ScaleNode)=>{next.delete(n.id);n.children.forEach(remove)};remove(node)
  if(trail.value.some(n=>n.id===id))selectedId.value=''
 }else next.add(id)
 expanded.value=next;sync()
}
async function details(id:string){
 if(!index.value.has(id))return
 if(!selectedId.value)returnFocus=document.activeElement instanceof HTMLElement?document.activeElement:null
 selectedId.value=id;chart?.dispatchAction({type:'hideTip'});sync();await nextTick();drawer.value?.scrollTo({top:0});closeButton.value?.focus({preventScroll:true})
}
function activate(id:string){const n=index.value.get(id);if(!n)return;if(!n.parentId&&n.children.length)toggle(id);else void details(id)}
function close(){selectedId.value='';sync();(returnFocus?.isConnected?returnFocus:chartEl.value)?.focus({preventScroll:true})}
function reset(){expanded.value=new Set();selectedId.value='';sync();chartEl.value?.focus({preventScroll:true})}
function expandSelected(){if(selected.value&&!expanded.value.has(selected.value.id))toggle(selected.value.id);close()}
function keydown(event:KeyboardEvent){if(event.key==='Escape'&&selectedId.value){event.stopPropagation();close()}}
function syncAnchors(){
 if(!chart||!host.value||!chartEl.value)return
 const box=chartEl.value.getBoundingClientRect(),outer=host.value.getBoundingClientRect()
 const points=rows.value.filter(r=>!r.expanded&&r.node.baseValue!==null).map(r=>({key:r.node.id,period:String(props.year),value:r.node.value}))
 host.value.dataset.annotationPoints=JSON.stringify(points)
 host.value.dataset.annotationPointRects=JSON.stringify(rows.value.flatMap((r,i)=>{
  if(r.expanded||r.node.baseValue===null)return[]
  const pos=chart!.convertToPixel({seriesIndex:0},[scaleAmount(r.node,settings.value),i]) as number[]
  const zero=chart!.convertToPixel({xAxisIndex:0},0) as number
  return [{key:r.node.id,period:String(props.year),value:r.node.value,rect:{x:box.x-outer.x+Math.min(zero,pos[0]),y:box.y-outer.y+pos[1]-10,width:Math.max(1,Math.abs(pos[0]-zero)),height:20}}]
 }))
}
function draw(){
 if(!chart)return
 const list=rows.value,left=compact.value?136:228,right=compact.value?80:125
 const rowHeight=compact.value?66:46
 const max=Math.max(...roots.value.map(n=>scaleAmount(n,settings.value)??0),1)
 chart.resize({height:height.value})
 chart.setOption({animation:false,textStyle:{fontFamily:'system-ui,sans-serif'},
  grid:{left,right,top:12,bottom:24},
  tooltip:{trigger:'item',confine:true,renderMode:'richText',formatter:(p:any)=>{
   const row=list[p.dataIndex];if(!row)return''
   const n=row.node,share=scaleShare(n,n.parentId?index.value.get(n.parentId):undefined)
   return n.name+'\n'+props.year+' 年 · '+money(n)+' '+unit.value+(share===null?'':'\n占'+index.value.get(n.parentId!)?.name+' '+pct(share))
  }},
  xAxis:{type:'value',max,axisLabel:{fontSize:10,formatter:(v:number)=>Intl.NumberFormat('zh-CN',{notation:'compact',maximumFractionDigits:1}).format(v)},splitLine:{lineStyle:{color:'#edf0f5'}},axisLine:{show:false},axisTick:{show:false}},
  yAxis:{type:'category',inverse:true,data:list.map(r=>r.node.id),triggerEvent:true,axisLine:{show:false},axisTick:{show:false},axisLabel:{interval:0,fontSize:compact.value?11:12,width:left-16,overflow:'break',lineHeight:16,formatter:(id:string)=>{
   const r=list.find(x=>x.node.id===id)!
   return (r.depth?'　'.repeat(Math.min(r.depth,2))+'↳ ':r.node.children.length?(r.expanded?'▾ ':'▸ '):'')+r.node.name
  },color:'#263548'}},
  series:[{type:'bar',barMaxWidth:20,data:list.map(r=>({id:r.node.id,name:r.node.name,value:r.expanded||r.node.baseValue===null?null:scaleAmount(r.node,settings.value),itemStyle:{color:r.node.kind==='remainder'?'#aeb9c9':r.depth?'#74a2eb':'#2461d5',borderRadius:[0,3,3,0]},label:{show:true,position:'right',distance:8,color:'#263548',fontSize:compact.value?10:12,formatter:()=>money(r.node)}}))}],
  graphic:list.flatMap((r,i)=>r.expanded||r.node.baseValue===null?[{id:r.node.id+'-note',type:'text',left,y:12+i*rowHeight+rowHeight/2-7,silent:true,style:{text:r.expanded?money(r.node)+' '+unit.value+' · 分组总量':'—  同年金额待补',fontSize:compact.value?10:12,fill:r.expanded?'#245cb5':'#788596'}}]:[]),
 },true)
 syncAnchors()
}
async function share(){try{await navigator.clipboard.writeText(location.href.split('#')[0]+'#'+props.country+'-ranking-chart');notice.value='已复制链接，包含展开层级、侧栏、年份、币种和汇率。'}catch{notice.value='可复制地址栏分享当前视图。'}}
function exportData(){
 const nodes=[...index.value.values()],visible=rows.value.map(({node,depth,expanded})=>({id:node.id,name:node.name,parentId:node.parentId,depth,expanded,kind:node.kind,originalValue:node.value,originalUnit:node.unit,displayValue:scaleAmount(node,settings.value),displayUnit:unit.value,shareOfParent:scaleShare(node,node.parentId?index.value.get(node.parentId):undefined),evidence:node.evidence,gap:node.gap}))
 const refs=new Set(nodes.flatMap(n=>n.evidence.map(e=>e.sourceId)))
 const record={version:props.research.version,checkedAt:props.research.checkedAt,country:props.country,year:props.year,settings:settings.value,expanded:[...expanded.value],selected:selectedId.value,visibleRows:visible,nodes,sources:sources.value.filter(s=>refs.has(s.id)),note:'分组总量不与子行业重复相加；未分列规模为总量减已列子项，未分配给缺值行业。'}
 const a=document.createElement('a'),url=URL.createObjectURL(new Blob([JSON.stringify(record,null,2)],{type:'application/json'}));a.href=url;a.download=props.country+'-industry-scale-'+props.year+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)
}
function exportSvg(){if(chart)downloadChartSvg(chart,countryName.value+' · '+props.year+' 年行业规模',unit.value+' · 同一金额刻度 · 1美元='+settings.value.usdCny+'人民币 · 分组总量不重复计入',props.country+'-industry-scale-'+props.year)}
async function reveal(id:string){
 const node=index.value.get(id);if(!node)return
 if(node.children.length&&!expanded.value.has(id))toggle(id);else if(!node.children.length)await details(id)
 host.value?.scrollIntoView({behavior:'smooth',block:'start'})
}
defineExpose({reveal})
watch([rows,settings,compact],async()=>{await nextTick();draw()})
watch(()=>[props.country,props.year],async()=>{restore();await nextTick();draw()})
onMounted(async()=>{
 restore();await nextTick();chart=echarts.init(chartEl.value!,undefined,{renderer:'svg'});mounted=true
 compact.value=chartEl.value!.clientWidth<600
 chart.on('click',(event:any)=>{const id=event.data?.id??(event.componentType==='yAxis'?event.value:undefined);if(id)activate(id)})
 resize=new ResizeObserver(()=>{compact.value=(chartEl.value?.clientWidth??0)<600;draw()});resize.observe(chartEl.value!)
 window.addEventListener('popstate',restore);draw()
})
onBeforeUnmount(()=>{chart?.dispose();resize?.disconnect();window.removeEventListener('popstate',restore)})
</script>
<template>
 <section ref="host" :id="country+'-ranking-chart'" :data-content-id="country+'-industry-scale-v2-'+year" class="scale-section" tabindex="0" @keydown="keydown">
  <div class="scale-heading"><div><p class="scale-eyebrow">从总量看组成</p><h2>{{year}} 年行业规模</h2></div><span>现价增加值 · {{unit}}</span></div>
  <div class="scale-guide"><p>点击行业，在原图展开组成；点击细分行业，在侧栏查看规模与下一级。</p><button v-if="expanded.size" class="scale-reset" @click="reset">收起全部 · 回到总览</button></div>
  <div ref="chartEl" :style="{height:height+'px'}" class="scale-chart" tabindex="0" role="img" :aria-label="countryName+' '+year+' 年行业规模，可展开的同刻度柱状图'"></div>
  <p v-if="expanded.size" class="scale-footnote">浅蓝色为展开的细分行业，所有柱沿用同一金额刻度。分组标题显示总量，不重复计入子行业。</p>
  <div v-if="gapsVisible" class="scale-gap"><span>部分细分尚无 {{year}} 年金额。灰柱为总量减已列子项的未分列规模，不代表某个具名行业。</span><button v-if="completeYears.length" @click="emit('year',completeYears[0])">查看 {{completeYears[0]}} 年完整细分</button></div>
  <div class="scale-actions"><button @click="share">分享当前图谱</button><button @click="exportSvg">导出 SVG</button><button @click="exportData">导出数据与来源</button><details><summary>键盘浏览行业</summary><div class="scale-keyboard"><button v-for="r in rows.filter(r=>r.node.kind==='industry')" :key="r.node.id" :aria-expanded="r.node.children.length?expanded.has(r.node.id):undefined" @click="activate(r.node.id)">{{r.depth?'↳ ':''}}{{r.node.name}} · {{money(r.node)}} {{unit}} · {{r.node.parentId?'查看详情':r.expanded?'收起':'展开 / 查看'}}</button></div></details></div>
  <p v-if="notice" role="status" class="scale-footnote">{{notice}}</p>
  <aside v-if="selected" ref="drawer" role="dialog" :aria-labelledby="country+'-scale-detail-title'" class="scale-drawer" :data-content-id="selected.id+'-scale-detail-'+year" tabindex="-1">
   <div class="drawer-top"><span>{{countryName}} · {{year}} 年</span><button ref="closeButton" aria-label="关闭行业详情" @click="close">×</button></div>
   <nav aria-label="行业层级" class="scale-trail"><button v-for="node in trail.slice(0,-1)" :key="node.id" @click="details(node.id)">{{node.name}} ›</button></nav>
   <h2 :id="country+'-scale-detail-title'">{{selected.name}}</h2>
   <div class="drawer-metrics"><div><span>现价增加值</span><strong>{{money(selected)}}</strong><small>{{unit}} · {{year}} 年</small></div><div v-if="parent"><span>占{{parent.name}}</span><strong>{{pct(selectedShare)}}</strong><small>同年增加值 ÷ 上级总量</small></div></div>
   <p v-if="selected.gap" class="scale-gap">{{selected.gap}}；占比保留为空。</p>
   <div v-if="selectedShare!==null" class="scale-share-track" role="img" :aria-label="'占'+parent?.name+' '+pct(selectedShare)"><span :style="{width:Math.max(0,Math.min(100,selectedShare))+'%'}"></span></div>
   <p class="drawer-meta">{{selected.revision}} · 发布 {{selected.releaseDate??'未注明具体日期'}}</p>
   <section class="drawer-children"><div class="children-heading"><h3>下一级组成</h3><span v-if="selected.children.length">{{selected.children.length}} 项</span></div>
    <p v-if="!selected.children.length" class="scale-footnote">当前资料尚未提供下一级分类与同年增加值。</p>
    <template v-else><p v-if="selected.children.every(n=>n.value===null)" class="scale-footnote">已列出分类名称；{{year}} 年金额待补，暂不绘制比例。</p>
     <button v-if="selected.children.some(n=>n.value!==null)&&!expanded.has(selected.id)" class="expand-in-chart" @click="expandSelected">在原图中继续展开</button>
     <ul><li v-for="node in selected.children" :key="node.id" :data-content-id="node.id+'-scale-child-'+year"><button @click="details(node.id)"><span>{{node.name}}</span><span class="child-number">{{money(node)}}<small>{{node.value===null?'金额待补':pct(scaleShare(node,selected))}}</small></span><span aria-hidden="true">›</span></button></li></ul>
     <p v-if="selectedRemainder" class="scale-footnote">未分列规模 {{money(selectedRemainder)}} {{unit}}，占 {{pct(scaleShare(selectedRemainder,selected))}}。计算：{{money(selected)}} − 已列子项。</p>
    </template>
   </section>
   <details class="drawer-source"><summary>统计口径与来源</summary><p>{{selected.coverage}}</p><p>原值 {{formatAmount(selected.value)}} {{selected.unit}} · {{selected.year}} 年；{{selected.currency}}。显示汇率：1 美元＝{{settings.usdCny}} 元人民币。</p><p v-if="selectedShare!==null">占比计算：{{money(selected)}} ÷ {{money(parent!)}} × 100% ＝ {{pct(selectedShare)}}。</p><EvidenceList v-if="selected.evidence.length" :catalog="sources" :items="[...selected.evidence,...(parent?.evidence??[])]"/></details>
  </aside>
 </section>
</template>
<style scoped>
.scale-section{scroll-margin-top:100px;position:relative;margin:30px 0 44px}.scale-heading,.scale-guide,.scale-actions,.children-heading,.drawer-top{display:flex;align-items:center;justify-content:space-between;gap:16px}.scale-heading h2{margin:0!important;border:0!important;padding:0!important}.scale-heading>span,.scale-eyebrow,.scale-footnote,.drawer-meta{font-size:12px;color:#6c7788}.scale-eyebrow{color:#245cb5;letter-spacing:.06em;margin:0 0 8px}.scale-guide{margin:14px 0 8px;align-items:flex-start}.scale-guide p{font-size:13px;color:#657186;margin:0}.scale-reset{white-space:nowrap;color:#245cb5;font-size:12px}.scale-chart{width:100%;min-height:420px}.scale-footnote{line-height:1.75;margin:10px 0}.scale-gap{display:flex;align-items:center;flex-wrap:wrap;gap:10px;padding:12px 14px;background:#f4f7fb;color:#62728a;font-size:12px;line-height:1.7}.scale-gap button{color:#245cb5;text-decoration:underline}.scale-actions{justify-content:flex-start;flex-wrap:wrap;font-size:12px;color:#245cb5;margin-top:16px}.scale-actions>button{text-decoration:underline;text-underline-offset:3px}.scale-keyboard{display:flex;flex-direction:column;align-items:flex-start;gap:10px;padding:16px;background:#f5f8fd;position:relative;z-index:2}.scale-section button,.scale-section summary{cursor:pointer}.scale-section button:focus-visible,.scale-section summary:focus-visible{outline:2px solid #2461d5;outline-offset:4px}.scale-drawer{position:fixed;right:0;top:132px;bottom:0;width:min(460px,46vw);background:white;border-left:1px solid #dce3ee;box-shadow:-12px 0 40px #1b355b12;z-index:65;padding:24px;overflow:auto;overscroll-behavior:contain}.drawer-top{font-size:12px;color:#6c7788}.drawer-top button{font-size:25px;width:36px;height:36px;border:1px solid #e0e6f0;border-radius:8px}.scale-trail{display:flex;flex-wrap:wrap;gap:8px;font-size:12px;color:#245cb5;margin:22px 0 10px}.scale-drawer h2{font-size:24px;line-height:1.4;margin:8px 0 24px!important;border:0!important;padding:0!important}.drawer-metrics{display:grid;grid-template-columns:1.2fr 1fr;gap:20px}.drawer-metrics>div{display:flex;flex-direction:column;gap:8px}.drawer-metrics span,.drawer-metrics small{font-size:12px;color:#788596}.drawer-metrics strong{font-size:26px;letter-spacing:-.025em;font-variant-numeric:tabular-nums;color:#1d2c43}.scale-share-track{height:6px;margin:22px 0 12px;background:#edf2f9;border-radius:3px;overflow:hidden}.scale-share-track span{height:100%;display:block;background:#2461d5}.drawer-children{margin-top:30px}.children-heading h3{font-size:15px;margin:0}.children-heading>span{font-size:12px;color:#788596}.drawer-children ul{list-style:none;padding:0;margin:12px 0}.drawer-children li{border-bottom:1px solid #eaf0f6;margin:0}.drawer-children li button{width:100%;display:grid;grid-template-columns:1fr auto 12px;gap:12px;align-items:center;text-align:left;padding:13px 0;color:#30445e;font-size:13px}.drawer-children li button:hover{color:#2461d5}.child-number{text-align:right;font-variant-numeric:tabular-nums}.child-number small{display:block;font-size:11px;color:#8a96a7;margin-top:4px}.expand-in-chart{margin-top:14px;color:#245cb5;background:#eef4ff;border-radius:6px;padding:8px 12px;font-size:12px}.drawer-source{border-top:1px solid #e0e6ef;padding-top:18px;margin-top:28px;font-size:12px;color:#657186}.drawer-source summary{color:#245cb5}.drawer-source p{line-height:1.7}
@media(max-width:700px){.scale-section{margin-top:22px}.scale-heading{align-items:flex-start;flex-direction:column;gap:8px}.scale-guide{flex-direction:column;gap:12px}.scale-drawer{top:auto;bottom:0;left:0;right:0;width:100%;max-height:78dvh;border-left:0;border-top:1px solid #dce3ee;border-radius:18px 18px 0 0;padding:16px 20px calc(24px + env(safe-area-inset-bottom));box-shadow:0 -12px 40px #1b355b22}.scale-drawer h2{font-size:22px}.drawer-metrics strong{font-size:24px}.scale-actions{gap:14px}.scale-trail{margin-top:14px}}
@media(max-width:640px){.scale-drawer{padding-bottom:calc(100px + env(safe-area-inset-bottom))}}
</style>
