<script setup lang="ts">
import {computed,ref,watch,onMounted,onBeforeUnmount,nextTick} from 'vue'
import {withBase} from 'vitepress'
import * as echarts from 'echarts/core'
import {PieChart} from 'echarts/charts'
import {SVGRenderer} from 'echarts/renderers'
import type {Country,Research} from '../../../../src/research/schema'
import {scaleIndex,scaleAmount,scaleSources,type ScaleNode} from '../../../../src/research/industry-scale'
import {orbitRoot,orbitLayer,orbitPath,restoreOrbit,orbitShare,canDrill,orbitBands,restoreOrbitExpanded,orbitExpansionParams,type OrbitSector} from '../../../../src/research/orbit'
import {macroStructure} from '../../../../src/research/macro-structure'
import {useCurrency} from '../../../../src/preferences/currency'
import {formatAmount,moneyInBaseUnits} from '../../../../src/research/currency'
import {downloadChartSvg} from '../../../../src/research/chart-export'
import EvidenceList from './EvidenceList.vue'
echarts.use([PieChart,SVGRenderer])
const props=defineProps<{research:Research;country:Country;year:number}>()
const {settings,unit}=useCurrency()
const basis=ref(''),focusId=ref(''),detailId=ref(''),hoverId=ref(''),notice=ref('')
const expandedIds=ref<string[]>([]),viewZoom=ref(1),panX=ref(0),panY=ref(0)
const viewport=ref<HTMLElement>()
const plot=ref<HTMLElement>(),host=ref<HTMLElement>(),centerButton=ref<HTMLButtonElement>()
const root=computed(()=>orbitRoot(props.research,props.country,props.year,basis.value))
const index=computed(()=>scaleIndex([root.value]))
const focus=computed(()=>index.value.get(focusId.value)??root.value)
const layer=computed(()=>orbitLayer(focus.value))
const bands=computed(()=>orbitBands(root.value,new Set(expandedIds.value)))
const visibleSectors=computed(()=>bands.value.flat())
const path=computed(()=>orbitPath(index.value,focus.value.id))
const detail=computed(()=>index.value.get(detailId.value)??visibleSectors.value.find(s=>s.node.id===detailId.value)?.node)
const hovered=computed(()=>visibleSectors.value.find(s=>s.node.id===hoverId.value)?.node)
const display=computed(()=>hovered.value??detail.value??focus.value)
const structure=computed(()=>macroStructure(props.research,props.country,basis.value))
const sources=computed(()=>scaleSources(props.research,props.country))
const totalShare=computed(()=>orbitShare(focus.value,root.value))
const money=(n:ScaleNode)=>formatAmount(scaleAmount(n,settings.value),1)
const pct=(v:number|null)=>v===null?'—':v<0.01&&v>0?'<0.01%':v.toFixed(2)+'%'
const palette=['#244f87','#4b82b7','#80accc','#466879','#819dad','#b1c7d5','#58739a','#a0b0c7','#4d8a97','#91b9ba','#657889','#c4d1dc']
const color=(n:ScaleNode,i:number)=>n.kind==='remainder'?'#dce3eb':palette[i%palette.length]
const evidenceNode=computed(()=>detail.value??focus.value)
const currentRefs=computed(()=>[...new Map([...evidenceNode.value.evidence,...focus.value.evidence].map(e=>[e.sourceId+'|'+e.locator,e])).values()])
const childGap=computed(()=>detail.value?.children.length&&!canDrill(detail.value))
let chart:echarts.ECharts|undefined,observer:ResizeObserver|undefined,mounted=false,reduced=false
let drag:{x:number;y:number;panX:number;panY:number;id:number}|undefined,ignoreClickUntil=0
const colorFor=(s:OrbitSector)=>{const i=bands.value[0].findIndex(n=>n.node.id===s.branch);const base=color(s.node,i<0?0:i);if(!s.depth||s.node.kind==='remainder')return base;const rank=bands.value[s.depth].filter(n=>n.branch===s.branch).findIndex(n=>n.node.id===s.node.id),mix=.12+(rank%6)*.09;return '#'+[1,3,5].map(p=>Math.round(parseInt(base.slice(p,p+2),16)*(1-mix)+255*mix).toString(16).padStart(2,'0')).join('')}
const nodeColor=(n:ScaleNode)=>{const sector=visibleSectors.value.find(s=>s.node.id===n.id);return sector?colorFor(sector):'#dce3eb'}
function setZoom(value:number){viewZoom.value=Math.min(4,Math.max(1,value));if(viewZoom.value===1){panX.value=0;panY.value=0}sync();void nextTick(anchors)}
function panKey(e:KeyboardEvent){if(e.target!==viewport.value||viewZoom.value<=1)return;const delta:Record<string,[number,number]>={ArrowLeft:[-.1,0],ArrowRight:[.1,0],ArrowUp:[0,-.1],ArrowDown:[0,.1]},d=delta[e.key];if(!d)return;e.preventDefault();const limit=(viewZoom.value-1)/2;panX.value=Math.max(-limit,Math.min(limit,panX.value+d[0]));panY.value=Math.max(-limit,Math.min(limit,panY.value+d[1]));sync();void nextTick(anchors)}
function startPan(e:PointerEvent){if(document.querySelector('.annotation-draw-plane')||viewZoom.value<=1||e.button!==0||(e.target as HTMLElement).closest('button'))return;drag={x:e.clientX,y:e.clientY,panX:panX.value,panY:panY.value,id:e.pointerId}}
function movePan(e:PointerEvent){if(!drag||!viewport.value)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)<5)return;viewport.value.setPointerCapture(e.pointerId);const box=viewport.value.getBoundingClientRect(),limit=(viewZoom.value-1)/2;panX.value=Math.max(-limit,Math.min(limit,drag.panX+dx/box.width));panY.value=Math.max(-limit,Math.min(limit,drag.panY+dy/box.height));ignoreClickUntil=Date.now()+250;clearHover();anchors()}
function endPan(){if(!drag)return;drag=undefined;sync();anchors()}
function sync(){
 if(!mounted)return
 const url=new URL(location.href)
 for(const key of ['filter.scaleExpanded','filter.scaleDetail','filter.subindustry','filter.subyear','filter.subsort'])url.searchParams.delete(key)
 if(structure.value)url.searchParams.set('filter.scaleBasis',basis.value);else url.searchParams.delete('filter.scaleBasis')
 if(focus.value.id!==root.value.id)url.searchParams.set('filter.orbitFocus',focus.value.id);else url.searchParams.delete('filter.orbitFocus')
 for(const key of [...url.searchParams.keys()])if(/^filter\.orbitExpanded\d*$/.test(key))url.searchParams.delete(key)
 for(const [key,value] of Object.entries({...orbitExpansionParams(expandedIds.value),'filter.orbitZoom':viewZoom.value===1?'':String(viewZoom.value),'filter.orbitX':panX.value?panX.value.toFixed(4):'','filter.orbitY':panY.value?panY.value.toFixed(4):''})){if(value)url.searchParams.set(key,value);else url.searchParams.delete(key)}
 if(detailId.value)url.searchParams.set('filter.orbitDetail',detailId.value);else url.searchParams.delete('filter.orbitDetail')
 history.replaceState(null,'',url);window.dispatchEvent(new CustomEvent('atlas:view-change'))
}
function restore(){
 const query=new URLSearchParams(location.search),requested=query.get('filter.scaleBasis')??''
 basis.value=macroStructure(props.research,props.country,requested)?requested:''
 const state=restoreOrbit(root.value,query);focusId.value=state.focus;detailId.value=state.detail;hoverId.value='';expandedIds.value=restoreOrbitExpanded(root.value,query,state.focus)
 const number=(key:string,fallback:number)=>{const raw=query.get(key),n=raw===null?fallback:Number(raw);return Number.isFinite(n)?n:fallback};viewZoom.value=Math.min(4,Math.max(1,number('filter.orbitZoom',1)));const limit=(viewZoom.value-1)/2;panX.value=Math.max(-limit,Math.min(limit,number('filter.orbitX',0)));panY.value=Math.max(-limit,Math.min(limit,number('filter.orbitY',0)))
}
function go(id:string){
 const node=index.value.get(id);if(!node)return
 hoverId.value='';detailId.value=''
 if(node.id===root.value.id){focusId.value=id;expandedIds.value=[];viewZoom.value=1;panX.value=0;panY.value=0}
 else if(canDrill(node)){focusId.value=id;expandedIds.value=[...new Set([...expandedIds.value,...orbitPath(index.value,id).filter(n=>n.id!==root.value.id&&canDrill(n)).map(n=>n.id)])]}
 else {detailId.value=id;focusId.value=node.parentId??root.value.id}
 sync();void nextTick(()=>centerButton.value?.focus({preventScroll:true}))
}
function choose(node:ScaleNode){
 if(index.value.has(node.id))go(node.id)
 else {detailId.value=node.id;focusId.value=node.parentId??root.value.id;hoverId.value='';sync()}
}
function back(){if(detailId.value){detailId.value='';sync();return}const id=focus.value.id;expandedIds.value=expandedIds.value.filter(key=>!orbitPath(index.value,key).some(n=>n.id===id));focusId.value=focus.value.parentId??root.value.id;hoverId.value='';sync()}
function changeBasis(value:string,target=''){
 basis.value=value;focusId.value=index.value.has(target)?target:root.value.id;detailId.value='';hoverId.value='';expandedIds.value=orbitPath(index.value,focusId.value).filter(n=>n.id!==root.value.id&&canDrill(n)).map(n=>n.id);viewZoom.value=1;panX.value=0;panY.value=0;sync()
}
function historical(){
 const current=detail.value??focus.value
 const aliases:Record<string,string>={'cn-accommodation-food':'cn-io-hospitality','cn-business-services':'cn-io-business'}
 const target=aliases[current.id]??current.id.replace(/^cn-/,'cn-io-')
 changeBasis('cn-io2023',target)
}
function emphasize(id:string){
 hoverId.value=id;chart?.dispatchAction({type:'downplay'})
 bands.value.forEach((band,seriesIndex)=>{const sector=band.find(s=>s.node.id===id);if(sector)chart?.dispatchAction({type:'highlight',seriesIndex,name:sector.node.id})})
}
function clearHover(){hoverId.value='';chart?.dispatchAction({type:'downplay'})}
function radii(depth:number){const count=bands.value.length,inner=count===1?48:count===2?32:24,step=(80-inner)/count;return {inner:inner+depth*step,outer:inner+(depth+1)*step-1}}
function anchors(){
 if(!viewport.value||!chart)return
 const el=viewport.value,w=chart.getWidth(),h=chart.getHeight(),z=viewZoom.value
 const points=visibleSectors.value.map(s=>{const radius=radii(s.depth),r=Math.min(w,h)*(radius.inner+radius.outer)/400,mid=-Math.PI/2+(s.start+s.share/2)*Math.PI*2;return {key:s.node.id,period:String(s.node.year),value:s.node.value,rect:{x:w/2+Math.cos(mid)*r*z+panX.value*w-9,y:h/2+Math.sin(mid)*r*z+panY.value*h-9,width:18,height:18}}}).filter(p=>p.rect.x>=0&&p.rect.y>=0&&p.rect.x+18<=w&&p.rect.y+18<=h)
 el.dataset.annotationPoints=JSON.stringify(points.map(({rect,...p})=>p));el.dataset.annotationPointRects=JSON.stringify(points)
}
function draw(){
 if(!chart)return
 chart.setOption({animation:!reduced,animationDuration:450,animationDurationUpdate:450,animationEasingUpdate:'cubicOut',series:bands.value.map((band,depth)=>{
  let cursor=0;const data:any[]=[]
  const gap=(start:number,end:number)=>{if(end-start>1e-10)data.push({name:'gap-'+depth+'-'+start,value:end-start,itemStyle:{color:'transparent',borderWidth:0},emphasis:{disabled:true},tooltip:{show:false},cursor:'default'})}
  for(const s of band){gap(cursor,s.start);data.push({id:s.node.id,name:s.node.id,nodeId:s.node.id,value:s.share,itemStyle:{color:colorFor(s)},cursor:'pointer'});cursor=s.start+s.share}gap(cursor,1)
  const radius=radii(depth)
  return {id:'band-'+depth,type:'pie',radius:[radius.inner+'%',radius.outer+'%'],center:['50%','50%'],startAngle:90,clockwise:true,minAngle:0,padAngle:0,selectedMode:false,label:{show:false},labelLine:{show:false},animationType:'scale',animationTypeUpdate:'transition',emphasis:{focus:'self',scale:true,scaleSize:4,itemStyle:{shadowBlur:14,shadowColor:'rgba(37,75,122,.16)'}},blur:{itemStyle:{opacity:.35}},itemStyle:{borderColor:'#fff',borderWidth:1.5,borderRadius:1.5},data}
 })},{replaceMerge:['series']});anchors()
}
async function share(){sync();try{await navigator.clipboard.writeText(location.href.split('#')[0]+'#'+props.country+'-ranking-chart');notice.value='已复制链接，包含当前层级、年份和币种。'}catch{notice.value='复制地址栏即可分享当前层级。'}}
function exportData(){
 const visible=layer.value.sectors.map(n=>({...n,displayValue:scaleAmount(n,settings.value),shareOfLevel:orbitShare(n,focus.value),shareOfEconomy:orbitShare(n,root.value)}))
 const record={version:props.research.version,basis:structure.value?.id??'annual-industry',country:props.country,year:root.value.year,settings:settings.value,focus:focus.value.id,path:path.value.map(n=>n.id),detail:detailId.value,root:root.value,visible,missing:layer.value.missing,sources:sources.value.filter(s=>[...index.value.values()].some(n=>n.evidence.some(e=>e.sourceId===s.id))),expanded:expandedIds.value,zoom:viewZoom.value,pan:{x:panX.value,y:panY.value},bands:bands.value.map(b=>b.map(s=>({id:s.node.id,start:s.start,share:s.share}))),note:'子项在父项原有角度内向外展开；缩放作用于整张图，不改变份额。灰色表示未展开规模。'}
 const url=URL.createObjectURL(new Blob([JSON.stringify(record,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=props.country+'-orbit-'+root.value.year+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)
}
function exportSvg(){if(chart){clearHover();downloadChartSvg(chart,root.value.year+' · '+root.value.name+'分层图','当前：'+focus.value.name+' · '+money(focus.value)+' '+unit.value+' · '+(structure.value?'历史产品部门':'行业现价增加值')+' · 占全体 '+pct(totalShare.value)+' · 1美元='+settings.value.usdCny+'人民币',props.country+'-orbit-'+root.value.year,visibleSectors.value.map(s=>({label:'　'.repeat(s.depth)+s.node.name,detail:money(s.node)+' '+unit.value+' · 占全体 '+pct(orbitShare(s.node,root.value)),color:colorFor(s)})))}}
async function reveal(id:string){if(basis.value)changeBasis('');go(id);await nextTick();host.value?.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'})}
defineExpose({reveal})
watch([bands,settings],async()=>{await nextTick();draw()})
watch(()=>[props.country,props.year],async()=>{restore();await nextTick();draw()})
onMounted(async()=>{
 restore();await nextTick();reduced=matchMedia('(prefers-reduced-motion: reduce)').matches
 chart=echarts.init(plot.value!,undefined,{renderer:'svg'});mounted=true
 chart.on('click',(e:any)=>{if(Date.now()<ignoreClickUntil)return;const node=visibleSectors.value.find(s=>s.node.id===e.data?.nodeId)?.node;if(node)choose(node)})
 chart.on('mouseover',(e:any)=>{if(!drag)hoverId.value=e.data?.nodeId??''})
 chart.on('mouseout',()=>{hoverId.value=''})
 observer=new ResizeObserver(()=>{chart?.resize();anchors()});observer.observe(plot.value!);draw();sync()
 window.addEventListener('popstate',restore)
})
onBeforeUnmount(()=>{observer?.disconnect();chart?.dispose();window.removeEventListener('popstate',restore)})
</script>
<template>
 <section ref="host" class="orbit" :id="country+'-ranking-chart'" :data-content-id="country+'-orbit-navigation-'+root.year+'-'+(basis||'annual')" @keydown.esc="back">
  <header class="orbit-toolbar">
   <div class="orbit-basis" aria-label="图谱统计口径"><button :aria-pressed="!structure" @click="changeBasis('')">{{year}} 行业全景</button><button v-if="country==='cn'" :aria-pressed="!!structure" @click="changeBasis('cn-io2023')">2023 产品结构 <span>历史</span></button></div>
   <span class="orbit-unit">{{structure?'当年生产者价格':'现价增加值'}} / {{unit}}</span>
  </header>
  <p v-if="structure" class="orbit-historical">2023 年历史产品部门 · 独立口径，不代表 {{year}} 年行业规模。<a :href="withBase('/macro-data')">数据说明 ↗</a></p>
  <nav class="orbit-breadcrumb" aria-label="当前图谱层级"><template v-for="(n,i) in path" :key="n.id"><span v-if="i" aria-hidden="true">/</span><button :aria-current="i===path.length-1?'location':undefined" @click="go(n.id)">{{i===0?'全国总览':n.name}}</button></template><button ref="centerButton" v-if="focus.id!==root.id||detail" class="breadcrumb-back" @click="back" aria-label="收起当前层级">← 上一级</button></nav>
  <div class="orbit-layout">
   <div class="orbit-stage"><div ref="viewport" :class="['orbit-viewport',{'can-pan':viewZoom>1}]" :data-content-id="country+'-orbit-plot-'+root.year+'-'+focus.id" role="img" :aria-label="root.year+' 年经济构成分层环形图；细分保持父项扇区角度，明细列表可用键盘操作'" tabindex="0" @keydown="panKey" @pointerdown="startPan" @pointermove="movePan" @pointerup="endPan" @pointercancel="endPan"><div class="orbit-canvas" :style="{transform:`translate(${panX*100}%,${panY*100}%) scale(${viewZoom})`}">
    <div ref="plot" class="orbit-plot"></div>
    <div :class="['orbit-center',{'is-compact':bands.length>1}]" aria-live="polite" aria-atomic="true">
     <span class="center-kicker">{{hovered?'所选分区':focus.id===root.id?'经济总量':'当前层级'}}</span>
     <h2>{{display.name}}</h2><strong>{{money(display)}}</strong><span class="center-unit">{{unit}} · {{root.year}}</span>
     <span v-if="hovered||detail" class="center-share">占全体 {{pct(orbitShare(display,root))}}</span>
     <span v-else-if="focus.parentId" class="center-share">占上一级 {{pct(orbitShare(focus,index.get(focus.parentId)!))}}</span>
     <button v-if="focus.id!==root.id||detail" @click="back" aria-label="返回上一级">↑ 返回上一级</button><span v-else class="center-hint">点击扇区，逐层探索</span>
    </div>
    </div></div><div class="orbit-zoom" aria-label="图表缩放"><button @click="setZoom(viewZoom-.5)" :disabled="viewZoom<=1" aria-label="缩小图表">−</button><span>{{Math.round(viewZoom*100)}}%</span><button @click="setZoom(viewZoom+.5)" :disabled="viewZoom>=4" aria-label="放大图表">＋</button><button @click="setZoom(1)">适配</button><small>放大后可拖动</small></div><div class="orbit-scale"><span class="scale-dot"></span><span>细分保留父项扇形 · 向外逐层展开</span><span class="scale-divider">/</span><span>当前行业占{{structure?'本表总量':'全国 GDP'}} {{pct(totalShare)}}</span></div>
   </div>
   <aside class="orbit-inspector" :data-content-id="focus.id+'-orbit-inspector-'+root.year">
    <div class="inspector-top"><span>{{detail?'分区详情':'本层组成'}}</span><span>{{detail?root.year+' 年':layer.sectors.length+' 个分区'}}</span></div>
    <template v-if="detail">
     <button class="back-list" @click="detailId='';sync()">← 返回本层清单</button><h3>{{detail.name}}</h3>
     <div class="detail-value">{{money(detail)}}<small>{{unit}}</small></div>
     <div class="detail-shares"><p>占本层<strong>{{pct(orbitShare(detail,focus))}}</strong></p><p>占{{structure?'本表总量':'全国 GDP'}}<strong>{{pct(orbitShare(detail,root))}}</strong></p></div>
     <p class="detail-gap">{{detail.gap||(childGap?'已知分类，尚未取得同年细分金额。':'已到当前资料的最细层级。')}}</p>
     <button v-if="childGap&&country==='cn'&&!structure" class="history-link" @click="historical">查看 2023 年相关产品结构 →</button>
     <div v-if="childGap" class="missing-list"><p v-for="n in detail.children" :key="n.id">{{n.name}}<span>待补</span></p></div>
    </template>
    <template v-else>
     <div class="inspector-title"><h3>{{focus.id===root.id?'从一个行业开始':focus.name}}</h3><div v-if="focus.id!==root.id" class="focus-value">{{money(focus)}} <small>{{unit}}</small><span>占上一级 {{pct(orbitShare(focus,index.get(focus.parentId!)!))}} · 占全体 {{pct(totalShare)}}</span></div><p>{{focus.id===root.id?'悬停查看份额，点击进入下一层。':'细分在原扇区外侧展开，其他行业保留。'}}</p></div>
     <div class="sector-list" role="group" aria-label="本层分区明细">
      <button v-for="(n,i) in layer.sectors" :key="n.id" :class="['sector-row',{'is-hovered':hoverId===n.id,'is-muted':n.kind==='remainder'}]" @pointerenter="emphasize(n.id)" @pointerleave="clearHover" @focus="emphasize(n.id)" @blur="clearHover" @click="choose(n)" :aria-label="n.name+'，'+money(n)+' '+unit+'，占本层 '+pct(orbitShare(n,focus))+(canDrill(n)?'，点击下钻':'，查看详情')" :data-content-id="n.id+'-orbit-row-'+n.year">
       <span class="sector-dot" :style="{background:nodeColor(n)}"></span><span class="sector-label">{{n.name}}<small>{{money(n)}} {{unit}}</small></span><strong>{{pct(orbitShare(n,focus))}}</strong><span class="sector-arrow">{{canDrill(n)?'↗':'→'}}</span>
      </button>
     </div>
     <details v-if="layer.missing.length" class="orbit-missing"><summary>{{layer.missing.length}} 项细分金额待补</summary><p v-for="n in layer.missing" :key="n.id">{{n.name}} · —</p><button v-if="country==='cn'&&!structure" class="history-link" @click="historical">查看 2023 年相关产品结构 →</button></details>
     <details v-if="layer.nonpositive.length" class="orbit-missing"><summary>{{layer.nonpositive.length}} 项零值或负值不绘制扇区</summary><p v-for="n in layer.nonpositive" :key="n.id">{{n.name}} · {{money(n)}} {{unit}}</p></details>
     <p v-if="layer.delta!==null&&Math.abs(layer.delta)>1" class="rounding-note">子项与父项原值相差 {{formatAmount(Math.abs(layer.delta)/moneyInBaseUnits(1,focus.unit)!,4)}} {{focus.unit}}；保留原表差异，扇区按子项合计绘制。</p>
    </template>
    <details class="orbit-evidence"><summary>统计口径与来源 <span>↗</span></summary><p>{{evidenceNode.coverage}}</p><p>{{evidenceNode.year}} 年 · {{evidenceNode.revision}} · 发布 {{evidenceNode.releaseDate??'未注明确切日期'}}</p><EvidenceList :items="currentRefs" :catalog="sources"/></details>
   </aside>
  </div>
  <footer class="orbit-footer"><p><span class="gesture-icon">↗</span> 由内向外，始终保留原有份额</p><div><button @click="share">分享此视图</button><button @click="exportSvg">导出图表</button><button @click="exportData">数据与来源 ↓</button></div></footer>
  <p v-if="notice" role="status" class="orbit-notice">{{notice}}</p>
 </section>
</template>
<style scoped>
.orbit{margin:20px 0 44px;scroll-margin-top:88px;color:#203349}.orbit button{text-decoration:none}.orbit-toolbar{display:flex;align-items:center;justify-content:space-between;gap:18px;border-top:1px solid #dce4eb;padding-top:18px}.orbit-basis{display:flex;gap:22px}.orbit-basis button{font-size:13px;color:#7d8997;padding:6px 0 12px;border-bottom:2px solid transparent}.orbit-basis button[aria-pressed=true]{color:#233d5c;border-color:#355f91}.orbit-basis span{font-size:9px;padding:2px 4px;background:#f0f3f7;border-radius:3px;margin-left:4px;color:#7d8997}.orbit-unit{font-size:11px;letter-spacing:.04em;color:#8a96a3}.orbit-historical{font-size:11px;color:#7f8c9b;background:#f6f8fb;padding:8px 12px;line-height:1.7!important;margin:10px 0 0!important}.orbit-historical a{float:right;color:#4c719b}.orbit-breadcrumb{display:flex;align-items:center;flex-wrap:wrap;gap:10px;min-height:44px;font-size:11px;color:#b0bcc8}.orbit-breadcrumb button{color:#8a96a3}.orbit-breadcrumb button[aria-current]{color:#264463}.orbit-layout{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(0,1fr);gap:38px;align-items:start}.orbit-stage{position:relative;min-width:0;background:radial-gradient(ellipse at 50% 46%,#eff4f9 0,white 64%)}.orbit-plot{height:440px;width:100%}.orbit-center{position:absolute;left:50%;top:255px;transform:translate(-50%,-50%);width:41%;display:flex;flex-direction:column;align-items:center;text-align:center;pointer-events:none}.center-kicker{font-size:10px;letter-spacing:.12em;color:#91a0ad;margin-bottom:13px}.orbit-center h2{font-size:16px;line-height:1.6;font-weight:500;max-width:100%;margin:0 0 12px!important;overflow-wrap:anywhere}.orbit-center strong{font-size:31px;font-weight:450;letter-spacing:-.055em;line-height:1.25;font-variant-numeric:tabular-nums;color:#193e68}.center-unit{font-size:10px;color:#8c9aa8;margin-top:7px}.center-share{font-size:11px;color:#547698;margin-top:10px}.center-hint,.orbit-center button{font-size:10px;color:#6887a6;margin-top:22px}.orbit-center button{pointer-events:auto;border-bottom:1px solid #bacbdc;padding-bottom:3px}.orbit-scale{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:8px;font-size:10px;color:#7a8ea2;margin:10px 0 22px}.scale-dot{height:5px;width:5px;border-radius:50%;background:#6e8da9}.scale-divider{color:#bdc8d4;margin:0 2px}.orbit-inspector{min-width:0;padding-top:14px}.inspector-top{display:flex;justify-content:space-between;font-size:10px;letter-spacing:.07em;color:#91a0ae;border-bottom:1px solid #dce4eb;padding-bottom:13px}.inspector-title{padding:23px 0 17px}.orbit-inspector h3{font-size:21px;line-height:1.5;font-weight:500;letter-spacing:-.025em;margin:0!important}.inspector-title p{font-size:11px;color:#9ba6b1;margin:7px 0 0;line-height:1.6}.sector-list{max-height:265px;overflow:auto;padding-right:7px;scrollbar-width:thin;scrollbar-color:#d6dfe8 transparent}.sector-row{width:100%;display:grid;grid-template-columns:8px minmax(0,1fr) auto 16px;gap:12px;align-items:center;text-align:left;padding:12px 7px;border-bottom:1px solid #edf1f5;transition:background .18s,transform .18s;color:#344b63}.sector-row:hover,.sector-row.is-hovered{background:#f1f6fb;border-radius:5px;transform:translateX(2px)}.sector-dot{width:6px;height:6px;border-radius:50%;align-self:start;margin-top:7px}.sector-label{font-size:12px;line-height:1.6}.sector-label small{display:block;font-size:10px;font-weight:400;color:#9aa7b3;margin-top:4px;font-variant-numeric:tabular-nums}.sector-row strong{font-size:12px;font-weight:500;letter-spacing:-.02em;font-variant-numeric:tabular-nums;color:#536c85}.sector-arrow{font-size:13px;color:#9aafc3;text-align:right}.is-muted .sector-label{color:#8c9baa}.orbit-evidence{border-top:1px solid #dce4eb;margin-top:19px;padding-top:14px;font-size:11px;color:#7c8c9c}.orbit-evidence summary{display:flex;justify-content:space-between;cursor:pointer;color:#6e86a0;list-style:none}.orbit-evidence p{font-size:11px}.orbit-missing{font-size:11px;color:#8b98a5;margin-top:15px}.orbit-missing summary{cursor:pointer}.orbit-missing p{margin:5px 0}.orbit-footer{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #e5ebf1;padding:19px 0;gap:18px}.orbit-footer p{font-size:11px;color:#91a0ad;margin:0}.gesture-icon{margin-right:6px;color:#456b95}.orbit-footer>div{display:flex;gap:22px}.orbit-footer button{font-size:11px;color:#6f86a0}.orbit-notice{font-size:12px;color:#4a729e}.back-list{font-size:11px;color:#7890a7;margin:18px 0}.detail-value{font-size:30px;letter-spacing:-.04em;margin:20px 0}.detail-value small{font-size:11px;color:#8c9cac;display:block;letter-spacing:0;margin-top:6px}.detail-shares{display:flex;gap:32px}.detail-shares p{font-size:10px;color:#8d9caa;margin:0}.detail-shares strong{display:block;font-size:19px;font-weight:450;color:#476783;margin-top:4px}.detail-gap{font-size:12px;color:#8595a4;margin:20px 0 10px}.history-link{font-size:11px;color:#3c6c9a;padding:7px 0}.missing-list{max-height:160px;overflow:auto;font-size:11px;color:#8d9ca9}.missing-list p{display:flex;justify-content:space-between;margin:5px 0}.missing-list span{color:#b0bac5}.rounding-note{font-size:10px;color:#98a4b0}
@media(min-width:1250px){.orbit-plot{height:430px}.orbit-center{top:275px}.sector-list{max-height:265px}}
@media(max-width:960px){.orbit-layout{gap:22px;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr)}.orbit-plot{height:400px}.orbit-center{top:225px}.orbit-center strong{font-size:26px}.orbit-center h2{font-size:13px}.center-kicker{margin-bottom:9px}.center-hint,.orbit-center button{margin-top:14px}.sector-row{gap:8px}.sector-label{font-size:11px}.sector-list{max-height:280px}.orbit-inspector h3{font-size:18px}}
@media(max-width:700px){.orbit{margin-top:20px}.orbit-toolbar{align-items:flex-start;gap:10px;flex-direction:column}.orbit-unit{font-size:10px}.orbit-basis{gap:22px}.orbit-breadcrumb{min-height:48px}.orbit-layout{grid-template-columns:1fr;gap:8px}.orbit-plot{height:auto;aspect-ratio:1}.orbit-center{top:calc((100vw - 48px)/2);width:42%}.orbit-stage{max-width:480px;width:100%;margin:auto}.orbit-center{top:46%}.orbit-center strong{font-size:28px}.orbit-center h2{font-size:14px;line-height:1.4;margin-bottom:8px!important}.center-kicker{font-size:9px;margin-bottom:8px}.center-unit,.center-hint,.orbit-center button{font-size:9px}.center-share{font-size:10px;margin-top:6px}.center-hint,.orbit-center button{margin-top:12px}.orbit-scale{font-size:9px;margin:0 0 8px}.orbit-inspector{padding-top:14px}.inspector-title{padding:15px 0 10px}.sector-list{max-height:360px}.sector-label{font-size:12px}.sector-row{padding:13px 7px}.orbit-footer{align-items:flex-start;flex-direction:column;gap:12px}.orbit-historical a{float:none;margin-left:8px}}
.focus-value{font-size:23px;letter-spacing:-.03em;margin:12px 0}.focus-value small{font-size:10px}.focus-value span{display:block;font-size:11px;letter-spacing:0;color:#617d99;margin-top:5px}.orbit-viewport{position:relative;overflow:hidden}.orbit-viewport.can-pan{cursor:grab;touch-action:none}.orbit-canvas{position:relative;transform-origin:center}.breadcrumb-back{margin-left:auto;font-size:11px}.orbit-zoom{position:absolute;top:0;right:0;z-index:2;background:rgba(255,255,255,.9);border-radius:5px;display:flex;justify-content:center;align-items:center;gap:14px;font-size:11px;color:#617d99;margin-top:8px}.orbit-zoom button{padding:4px 7px}.orbit-zoom button:disabled{opacity:.35;cursor:default}.orbit-zoom small{font-size:10px;color:#667b8f}.orbit-center.is-compact{width:min(20%,88px)!important}.is-compact .center-kicker,.is-compact .center-unit,.is-compact .center-share,.is-compact .center-hint,.is-compact button{display:none}.orbit-center.is-compact h2{font-size:11px!important;line-height:1.35;margin-bottom:5px!important}.orbit-center.is-compact strong{font-size:14px!important}.orbit-canvas .orbit-center{top:50%;width:min(42%,190px)}
.orbit-unit,.center-unit,.center-kicker,.inspector-top,.inspector-title p,.sector-label small,.orbit-footer p,.orbit-missing,.detail-gap,.detail-shares p,.rounding-note,.is-muted .sector-label{color:#667b8f}.orbit button:focus-visible{outline:2px solid #356ea7;outline-offset:3px}.center-kicker,.center-unit,.center-hint,.orbit-center button,.orbit-scale{font-size:11px}.sector-label{font-size:13px}.sector-label small{font-size:11px}
@media(max-width:700px){.orbit-center strong{font-size:clamp(18px,5.2vw,25px)}.center-kicker{display:none}.orbit-center h2{font-size:12px;margin-bottom:6px!important}.center-unit,.center-share,.center-hint,.orbit-center button{font-size:9px;margin-top:6px}.orbit-scale{font-size:10px}}
@media(prefers-reduced-motion:reduce){.sector-row{transition:none}}
</style>
