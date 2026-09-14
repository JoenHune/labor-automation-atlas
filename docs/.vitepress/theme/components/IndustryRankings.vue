<script setup lang="ts">
import {computed,ref} from 'vue'
import {withBase} from 'vitepress'
import type {Country,Research} from '../../../../src/research/schema'
import {annualRanking} from '../../../../src/research/ranking'
import {industryScale,scaleAmount,type ScaleNode} from '../../../../src/research/industry-scale'
import {employmentView,employmentDisplay,employmentGroups,employmentExport,type EmploymentView} from '../../../../src/research/employment'
import {formatAmount} from '../../../../src/research/currency'
import {chartRecord} from '../../../../src/research/chart-export'
import {useCurrency} from '../../../../src/preferences/currency'

const props=defineProps<{research:Research;country:Country;year:number;employmentState:'loading'|'ready'|'failed';employmentError:string}>()
const emit=defineEmits<{inspect:[id:string,analysis:'structure'|'employment'];trend:[id:string];retry:[]}>()
const {settings,unit}=useCurrency()
const highlighted=ref(''),notice=ref('')
const ranking=computed(()=>annualRanking(props.country,props.year,props.research.industries,props.research.observations))
const nodes=computed(()=>industryScale(props.research,props.country,props.year))
const supplements=computed(()=>new Set(ranking.value.supplements.map(r=>r.industry.id)))
const views=computed(()=>nodes.value.map(n=>employmentView(props.research.employment,n)))
const comparison=computed(()=>{
 const result=employmentGroups(views.value,'productivity')
 // Special accounting scopes remain outside the ordinary industry ranking.
 result.groups.sort((a,b)=>Number(!!a.rows[0].record?.pairing.scopeNote)-Number(!!b.rows[0].record?.pairing.scopeNote)||b.rows.length-a.rows.length)
 return result
})
const sizeMax=computed(()=>Math.max(1,...nodes.value.map(n=>Math.abs(n.baseValue??0))))
const perMax=computed(()=>Math.max(1,...views.value.map(v=>Math.abs(v.productivity??0))))
const width=(n:number|null,max:number)=>Math.abs(n??0)/max*100+'%'
const money=(n:ScaleNode)=>formatAmount(scaleAmount(n,settings.value),1)
const shown=(v:EmploymentView)=>employmentDisplay(v,settings.value)
const groupLabel=(group:{label:string;rows:EmploymentView[]})=>(props.country==='us'&&!group.rows[0].record?.pairing.scopeNote?(group.rows.every(v=>v.node.id==='us-government')?'政府整体 · ':'其他入选行业 · '):'')+group.label
const modelBases=(rows:EmploymentView[])=>[...new Set(rows.filter(v=>v.record?.employment.status==='estimated').map(v=>v.record?.employment.modelBasis).filter(Boolean))].join('；')
const perTitle=computed(()=>props.country==='us'?'每岗位增加值榜单':'人均增加值榜单')
const perUnit=computed(()=>(settings.value.mode==='cny-100m'?'元':'美元')+(props.country==='us'?'/岗位':'/人'))
const point=(key:string,value:number|null)=>JSON.stringify([{key,period:String(props.year),value}])
function select(id:string,analysis:'structure'|'employment'){
 // Dragging a label selects text for annotation; it must not navigate the chart.
 if(window.getSelection()?.toString().trim())return
 emit('inspect',id,analysis)
}
async function share(){
 const url=new URL(location.href);url.hash=props.country+'-industry-rankings'
 try{await navigator.clipboard.writeText(url.href);notice.value='已复制榜单链接，包含年份与币种。'}catch{history.replaceState(null,'',url);notice.value='可复制地址栏分享当前榜单。'}
}
function download(){
 const observations=[...ranking.value.top10,...ranking.value.supplements].flatMap(r=>r.observation?[r.observation]:[])
 const data={...chartRecord(props.research,props.country,props.year+' 年度行业增加值与人均榜单',observations,settings.value),year:props.year,basis:'annual-industry',scope:'年度增加值Top10及补充行业；人均比值仅在这批行业内按统计口径分组排序',supplements:[...supplements.value],employment:employmentExport(props.research.employment,views.value,settings.value)}
 const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'})),a=document.createElement('a')
 a.href=url;a.download=props.country+'-industry-rankings-'+props.year+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)
}
</script>

<template>
 <section :id="country+'-industry-rankings'" :data-content-id="country+'-ranking-table'" class="industry-rankings" tabindex="0" aria-label="年度行业双榜">
  <div class="rankings-caption"><span>年度行业 <b>{{year}}</b></span><p>同一批行业，从规模与人均两个角度比较</p></div>
  <div class="rankings-columns" @mouseleave="highlighted=''">
   <section class="ranking-column" :aria-label="year+' 年行业增加值柱状排行榜'">
    <header><span class="column-number">01</span><h2>行业榜单</h2><span class="ranking-unit">{{unit}}</span></header>
    <p class="ranking-description">现价增加值 · Top 10<template v-if="supplements.size"> ＋ 产业补充</template></p>
    <ol class="ranking-bars">
     <li v-for="(node,i) in nodes" :key="node.id" :class="{'is-highlighted':highlighted===node.id,'is-supplement':supplements.has(node.id)}" :data-content-id="node.id+'-annual-'+year" :data-annotation-points="point(node.id,node.value)">
      <div class="ranking-row">
       <button class="ranking-bar-button" :aria-label="node.name+'，'+money(node)+' '+unit+'，查看行业组成'" @click="select(node.id,'structure')" @mouseenter="highlighted=node.id" @focus="highlighted=node.id" @blur="highlighted=''">
        <span class="ranking-label"><span class="ranking-order">{{supplements.has(node.id)?'补':String(i+1).padStart(2,'0')}}</span><span class="ranking-name">{{node.name}}</span><strong>{{money(node)}}</strong></span>
        <span class="ranking-track" aria-hidden="true"><span :style="{width:width(node.baseValue,sizeMax)}"></span></span>
       </button>
       <button class="ranking-trend" :aria-label="node.name+'五年趋势'" title="五年趋势" @click="emit('trend',node.id)">↗</button>
      </div>
     </li>
    </ol>
    <p class="ranking-footnote">点击柱子查看组成，↗ 查看五年趋势。<template v-if="country==='cn'">工业整体入榜，制造业不重复列入。</template><template v-else>补充行业单独标记，不占 Top 10 名次。</template></p>
   </section>
   <section class="ranking-column productivity-column" :aria-label="year+' 年'+perTitle+'柱状图'" :aria-busy="employmentState==='loading'">
    <header><span class="column-number">02</span><h2>{{perTitle}}</h2><span class="ranking-unit">{{perUnit}}</span></header>
    <p class="ranking-description">同年现价增加值 ÷ 就业规模 · 左列行业范围</p>
    <template v-if="employmentState==='ready'">
     <div v-for="group in comparison.groups" :key="group.key" class="ranking-comparison-group">
      <h3>{{groupLabel(group)}}<span v-if="modelBases(group.rows)" class="ranking-model-basis">估算依据：{{modelBases(group.rows)}}</span></h3>
      <ol class="ranking-bars">
       <li v-for="(view,i) in group.rows" :key="view.node.id" :class="{'is-highlighted':highlighted===view.node.id}" :data-content-id="view.node.id+'-productivity-ranking-'+year" :data-annotation-points="point(view.node.id+'-productivity',view.productivity)">
        <button class="ranking-bar-button" :aria-label="view.node.name+'，'+shown(view).productivity+' '+shown(view).productivityUnit+'，'+view.statusLabel+'，查看就业与人均'" @click="select(view.node.id,'employment')" @mouseenter="highlighted=view.node.id" @focus="highlighted=view.node.id" @blur="highlighted=''">
         <span class="ranking-label"><span class="ranking-order">{{String(i+1).padStart(2,'0')}}</span><span class="ranking-name">{{view.node.name}}<small v-if="supplements.has(view.node.id)">补充</small></span><strong>{{shown(view).productivity}}</strong></span>
         <span class="ranking-track" aria-hidden="true"><span :style="{width:width(view.productivity,perMax)}"></span></span>
        </button>
       </li>
      </ol>
     </div>
     <div v-if="comparison.unranked.length" class="ranking-gaps"><p>未纳入人均排序</p><button v-for="view in comparison.unranked" :key="view.node.id" @click="select(view.node.id,'employment')">{{view.node.name}} <span>— 查看缺口</span></button></div>
     <p class="ranking-footnote">各组共用标尺，组内排序；特殊核算口径另列。<template v-if="country==='us'">分母为雇员岗位，不含业主。</template>点击柱子查看就业人数、估算依据与来源。</p>
    </template>
    <p v-else class="ranking-loading" role="status">{{employmentState==='failed'?employmentError:'正在读取就业与人均数据…'}}<button v-if="employmentState==='failed'" @click="emit('retry')">重新读取</button></p>
   </section>
  </div>
  <div class="rankings-actions"><button @click="share">分享榜单</button><button @click="download">下载两项榜单</button><a :href="withBase('/employment-methodology')">方法与覆盖 ↗</a><span v-if="notice" role="status">{{notice}}</span></div>
 </section>
</template>

<style scoped>
.industry-rankings{margin:46px 0 54px;scroll-margin-top:100px}.rankings-caption{display:flex;align-items:baseline;gap:22px;padding:0 0 21px;border-bottom:1px solid #d9e2eb}.rankings-caption>span{font-size:12px;color:#60768d;white-space:nowrap}.rankings-caption b{font-size:14px;color:#294964;font-weight:500;margin-left:7px;font-variant-numeric:tabular-nums}.rankings-caption p{font-size:12px;color:#8795a3;margin:0!important}.rankings-columns{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:44px}.ranking-column{min-width:0;padding-top:27px}.ranking-column+section{padding-left:32px;border-left:1px solid #e7edf2}.ranking-column header{display:flex;align-items:baseline;gap:11px;flex-wrap:wrap}.column-number{font-size:11px;letter-spacing:.08em;color:#91a3b5}.ranking-column h2{font-size:19px;font-weight:500;letter-spacing:-.025em;color:#263e56}.ranking-unit{font-size:10px;color:#8293a5;margin-left:auto;white-space:nowrap}.ranking-description{font-size:11px;line-height:1.7;color:#7d8fa1;margin:9px 0 22px!important}.ranking-bars{list-style:none!important;margin:0!important;padding:0!important}.ranking-bars li{margin:0 0 14px;padding:0;border-radius:4px;transition:background-color .15s}.ranking-row{display:flex;align-items:center;gap:8px}.ranking-bar-button{display:block;flex:1;min-width:0;width:100%;padding:3px 0 4px;text-align:left;color:#334f6c;user-select:text}.ranking-bar-button:hover{text-decoration:none}.ranking-label{display:flex;align-items:baseline;gap:9px;min-width:0;margin-bottom:8px;font-size:12px;line-height:1.55}.ranking-order{font-size:10px;color:#9aaabb;min-width:17px;font-variant-numeric:tabular-nums}.ranking-name{flex:1;min-width:0;overflow-wrap:anywhere}.ranking-name small{font-size:9px;color:#8b9aad;margin-left:5px}.ranking-label strong{font-size:12px;font-weight:500;white-space:nowrap;letter-spacing:-.025em;font-variant-numeric:tabular-nums;color:#304f72}.ranking-track{display:block;margin-left:26px;background:#f0f4f8;height:15px;position:relative;overflow:hidden;border-radius:1px}.ranking-track>span{display:block;height:100%;background:#5c85ad;transition:width .28s,background .15s}.productivity-column .ranking-track>span{background:#87a8c5}.is-highlighted{background:#f5f8fc}.is-highlighted .ranking-track>span{background:#285e91}.is-highlighted .ranking-name{color:#173f66}.ranking-trend{flex:0 0 18px;padding:4px 0;color:#9aaec1;font-size:13px;align-self:flex-start;margin-top:1px}.ranking-trend:hover{color:#315d89}.is-supplement{border-top:1px dashed #d9e3ed;padding-top:13px!important;margin-top:19px!important}.ranking-comparison-group h3{font-size:10px;font-weight:400;line-height:1.7;color:#7890a8;border:0;margin:0 0 13px;padding:0}.ranking-comparison-group+.ranking-comparison-group{border-top:1px dashed #dce5ee;margin-top:20px;padding-top:16px}.ranking-footnote{font-size:10px;line-height:1.8;color:#8a9bad;margin:18px 0 0!important}.ranking-gaps{font-size:11px;margin-top:18px;color:#7b8fa4}.ranking-gaps p{margin:0 0 8px}.ranking-gaps button{display:block;text-align:left;margin:6px 0;color:#58738d}.ranking-gaps span{color:#98a6b4}.ranking-loading{padding:34px 0;color:#8295a7;font-size:12px}.ranking-loading button{margin-left:10px}.rankings-actions{display:flex;gap:20px;flex-wrap:wrap;border-top:1px solid #e3eaf1;margin-top:25px;padding-top:14px;font-size:11px}.rankings-actions button,.rankings-actions a{color:#67849f}.rankings-actions span{color:#8195a9}
@media(max-width:900px){.rankings-columns{gap:24px}.ranking-column+section{padding-left:22px}.ranking-column h2{font-size:17px}.ranking-label{font-size:11px;gap:6px}.ranking-label strong{font-size:11px}.ranking-track{margin-left:23px}.rankings-caption{gap:14px}}
@media(max-width:640px){.rankings-columns{grid-template-columns:minmax(0,1fr);gap:26px}.ranking-column+section{padding-left:0;border-left:0;border-top:1px solid #dce5ed}.rankings-caption{align-items:flex-start;flex-direction:column;gap:6px}.ranking-column h2{font-size:19px}.ranking-label{font-size:12px;gap:9px}.ranking-label strong{font-size:12px}.ranking-track{margin-left:26px}.industry-rankings{margin-top:32px}.ranking-bars li{margin-bottom:16px}}
@media(prefers-reduced-motion:reduce){.ranking-bars li,.ranking-track>span{transition:none}}
.ranking-model-basis{display:block;margin-top:3px;color:#8196aa}
</style>
