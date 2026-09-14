<script setup lang="ts">
import {computed,ref,watch,onMounted,onBeforeUnmount,nextTick} from 'vue'
import {withBase} from 'vitepress'
import type {Country,Research} from '../../../../src/research/schema'
import {annualRanking} from '../../../../src/research/ranking'
import {industryScale,scaleAmount,scaleSources,type ScaleNode} from '../../../../src/research/industry-scale'
import {employmentDisplay,employmentGroups,employmentExport,type EmploymentView,type EmploymentMetric} from '../../../../src/research/employment'
import {formatAmount} from '../../../../src/research/currency'
import {chartRecord} from '../../../../src/research/chart-export'
import {useCurrency} from '../../../../src/preferences/currency'
import {employmentRanking} from '../../../../src/research/employment-ranking'
import EmploymentPanel from './EmploymentPanel.vue'

const props=defineProps<{research:Research;country:Country;year:number;employmentState:'loading'|'ready'|'failed';employmentError:string}>()
const emit=defineEmits<{inspect:[id:string,analysis:'structure'|'employment'];trend:[id:string];retry:[]}>()
const {settings,unit}=useCurrency()
const highlighted=ref(''),notice=ref(''),query=ref(''),detail=ref('')
const metric=ref<EmploymentMetric>('productivity'),rankingRoot=ref<HTMLElement>(),backButton=ref<HTMLButtonElement>(),page=ref(1)
const pageSize=10
const ranking=computed(()=>annualRanking(props.country,props.year,props.research.industries,props.research.observations))
const nodes=computed(()=>industryScale(props.research,props.country,props.year))
const supplements=computed(()=>new Set(ranking.value.supplements.map(r=>r.industry.id)))
const complete=computed(()=>employmentRanking(props.research,props.country,props.year))
const views=computed(()=>complete.value.views)
const detailResearch=computed(()=>({...props.research,employment:complete.value.dataset}))
const selected=computed(()=>views.value.find(v=>v.node.id===detail.value))
const comparison=computed(()=>{
 const result=employmentGroups(views.value,metric.value)
 // Special accounting scopes remain outside the ordinary industry ranking.
 result.groups.sort((a,b)=>Number(!!a.rows[0].record?.pairing.scopeNote)-Number(!!b.rows[0].record?.pairing.scopeNote)||b.rows.length-a.rows.length)
 return result
})
const sizeMax=computed(()=>Math.max(1,...nodes.value.map(n=>Math.abs(n.baseValue??0))))
const metricValue=(view:EmploymentView)=>metric.value==='employment'?view.count:view.productivity
const perMax=computed(()=>Math.max(1,...views.value.map(v=>Math.abs(metricValue(v)??0))))
const filtered=computed(()=>comparison.value.groups.map(g=>({...g,rows:g.rows.map((view,i)=>({view,rank:i+1})).filter(r=>r.view.node.name.toLocaleLowerCase().includes(query.value.trim().toLocaleLowerCase()))})).filter(g=>g.rows.length))
const matchedCount=computed(()=>filtered.value.reduce((n,g)=>n+g.rows.length,0))
const pageCount=computed(()=>Math.max(1,Math.ceil(matchedCount.value/pageSize)))
const currentPage=computed(()=>Math.min(page.value,pageCount.value))
const paged=computed(()=>{let offset=0;const start=(currentPage.value-1)*pageSize,end=start+pageSize;return filtered.value.map(group=>{const before=offset;offset+=group.rows.length;return {...group,rows:group.rows.filter((_,i)=>before+i>=start&&before+i<end)}}).filter(group=>group.rows.length)})
const metricLabel=(view:EmploymentView)=>metric.value==='employment'?formatAmount(view.count===null?null:view.count/10000,2):shown(view).productivity
const width=(n:number|null,max:number)=>Math.abs(n??0)/max*100+'%'
const money=(n:ScaleNode)=>formatAmount(scaleAmount(n,settings.value),1)
const shown=(v:EmploymentView)=>employmentDisplay(v,settings.value)
const groupLabel=(group:{label:string;rows:EmploymentView[]})=>(props.country==='us'&&!group.rows[0].record?.pairing.scopeNote?(group.rows.every(v=>v.node.id==='us-government')?'政府整体 · ':'私营行业 · '):'')+group.label
const modelBases=(rows:EmploymentView[])=>[...new Set(rows.filter(v=>v.record?.employment.status==='estimated').map(v=>v.record?.employment.modelBasis).filter(Boolean))].join('；')
const perTitle=computed(()=>props.country==='us'?'每岗位增加值':'人均增加值')
const perUnit=computed(()=>metric.value==='employment'?(props.country==='us'?'万岗位':'万人'):(settings.value.mode==='cny-100m'?'元':'美元')+(props.country==='us'?'/岗位':'/人'))
const point=(key:string,value:number|null,year=props.year)=>JSON.stringify([{key,period:String(year),value}])
function restore(){
 const q=new URLSearchParams(location.search)
 metric.value=q.get('filter.rankingMetric')==='employment'?'employment':'productivity'
 query.value=(q.get('filter.rankingQuery')??'').slice(0,100)
 page.value=Math.max(1,Math.min(1000,Math.floor(Number(q.get('filter.rankingPage')))||1))
 const id=q.get('filter.rankingDetail')??'';detail.value=id.startsWith(props.country+'-')?id:''
}
function sync(){
 const url=new URL(location.href)
 for(const [k,v] of Object.entries({rankingMetric:metric.value,rankingQuery:query.value,rankingDetail:detail.value,rankingPage:String(currentPage.value)})){if(v)url.searchParams.set('filter.'+k,v);else url.searchParams.delete('filter.'+k)}
 history.replaceState(null,'',url);window.dispatchEvent(new CustomEvent('atlas:view-change'))
}
async function inspectEmployment(id:string){if(window.getSelection()?.toString().trim())return;detail.value=id;sync();await nextTick();backButton.value?.focus({preventScroll:true})}
async function back(){const id=detail.value;detail.value='';sync();await nextTick();rankingRoot.value?.querySelector<HTMLButtonElement>('[data-content-id="'+id+'-employment-ranking-'+complete.value.year+'-'+metric.value+'"] button')?.focus({preventScroll:true})}
function filterChanged(){page.value=1;sync()}
function turnPage(delta:number){page.value=Math.min(pageCount.value,Math.max(1,currentPage.value+delta));sync()}
onMounted(()=>{restore();window.addEventListener('popstate',restore)})
onBeforeUnmount(()=>window.removeEventListener('popstate',restore))
watch(()=>props.country,()=>{detail.value='';query.value='';page.value=1;sync()})
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
 if(props.employmentState!=='ready')return
 const observations=[...ranking.value.top10,...ranking.value.supplements].flatMap(r=>r.observation?[r.observation]:[])
 const sourceIds=new Set(views.value.flatMap(v=>v.node.evidence.map(e=>e.sourceId)))
 const data={...chartRecord(props.research,props.country,props.year+' 年度行业增加值与人均榜单',observations,settings.value),year:props.year,basis:'annual-industry',scope:'左列：年度增加值Top10及补充行业；右列：独立全行业就业榜',employmentScope:complete.value.scope,employmentYear:complete.value.year,employmentBasis:complete.value.basis,metric:metric.value,notes:complete.value.notes,employmentValueAdded:views.value.map(v=>({nodeId:v.node.id,year:v.node.year,value:v.node.value,unit:v.node.unit,currency:v.node.currency,coverage:v.node.coverage,revision:v.node.revision,releaseDate:v.node.releaseDate,evidence:v.node.evidence})),employmentValueAddedSources:scaleSources(props.research,props.country).filter(s=>sourceIds.has(s.id)),supplements:[...supplements.value],employment:employmentExport(complete.value.dataset,views.value,settings.value)}
 const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'})),a=document.createElement('a')
 a.href=url;a.download=props.country+'-industry-rankings-'+props.year+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)
}
</script>

<template>
 <section ref="rankingRoot" :id="country+'-industry-rankings'" :data-content-id="country+'-ranking-table'" class="industry-rankings" tabindex="0" aria-label="年度行业双榜">
  <div class="rankings-caption"><span>全国榜单</span><p>行业规模与全行业就业，分别排序</p></div>
  <div class="rankings-columns" @mouseleave="highlighted=''">
   <section class="ranking-column" :aria-label="year+' 年行业增加值柱状排行榜'">
    <header><span class="column-number">01</span><h2>行业榜单</h2><span class="ranking-unit">{{unit}}</span></header>
    <p class="ranking-description"><b>{{year}} 年</b> · 现价增加值 · Top 10<template v-if="supplements.size"> ＋ 产业补充</template></p>
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
   <section class="ranking-column productivity-column" aria-label="全行业岗位柱状排行榜" :aria-busy="employmentState==='loading'">
    <header><span class="column-number">02</span><h2>岗位榜单 <small>全行业</small></h2><span class="ranking-unit">{{perUnit}}</span></header>
    <p class="ranking-description"><b>{{complete.year}} 年</b> · {{complete.scope}}<br>按行业汇总就业，不随上方扇区选择缩小范围。</p>
    <template v-if="employmentState==='ready'">
     <div v-if="selected" class="ranking-detail">
      <button ref="backButton" class="ranking-back" @click="back">← 返回全行业榜单</button>
      <EmploymentPanel :research="detailResearch" :node="selected.node" :peers="[]" :basis="complete.basis" :content-prefix="country+'-all-ranking-'"/>
     </div>
     <template v-else>
      <div class="ranking-controls"><label>排序<select v-model="metric" aria-label="全行业岗位榜排序" @change="filterChanged"><option value="productivity">{{perTitle}}</option><option value="employment">就业人数 / 岗位数</option></select></label><input v-model="query" aria-label="搜索全行业岗位榜" placeholder="搜索全行业" maxlength="100" @input="filterChanged"></div>
      <p class="ranking-count">{{matchedCount}} / {{views.length}} 项<span v-if="country==='cn'"> · 就业与人均均为估算</span></p>
      <div class="ranking-list" :aria-label="'全行业岗位榜第 '+currentPage+' 页'">
       <div v-for="group in paged" :key="group.key" class="ranking-comparison-group">
        <h3>{{groupLabel({label:group.label,rows:group.rows.map(r=>r.view)})}}</h3>
        <ol class="ranking-bars">
         <li v-for="{view,rank} in group.rows" :key="view.node.id" :class="{'is-highlighted':highlighted===view.node.id}" :data-content-id="view.node.id+'-employment-ranking-'+complete.year+'-'+metric" :data-annotation-points="point(view.node.id+'-'+metric,metricValue(view),complete.year)">
          <button class="ranking-bar-button" :aria-label="view.node.name+'，'+metricLabel(view)+' '+perUnit+'，'+view.statusLabel+'，查看就业详情'" @click="inspectEmployment(view.node.id)" @mouseenter="highlighted=view.node.id" @focus="highlighted=view.node.id" @blur="highlighted=''">
           <span class="ranking-label"><span class="ranking-order">{{String(rank).padStart(2,'0')}}</span><span class="ranking-name">{{view.node.name}}</span><strong>{{metricLabel(view)}}</strong></span>
           <span class="ranking-track" aria-hidden="true"><span :style="{width:width(metricValue(view),perMax)}"></span></span>
          </button>
         </li>
        </ol>
       </div>
       <p v-if="!matchedCount" class="ranking-empty">没有符合搜索条件的可排序行业。</p>
       <div v-if="comparison.unranked.length" class="ranking-gaps"><p>未纳入当前排序</p><button v-for="view in comparison.unranked.filter(v=>v.node.name.includes(query.trim()))" :key="view.node.id" @click="inspectEmployment(view.node.id)">{{view.node.name}} <span>— 查看缺口</span></button></div>
      </div>
      <nav v-if="pageCount>1" class="ranking-pagination" aria-label="全行业岗位榜分页"><button :disabled="currentPage===1" @click="turnPage(-1)">上一页</button><span>{{currentPage}} / {{pageCount}} 页</span><button :disabled="currentPage===pageCount" @click="turnPage(1)">下一页</button></nav>
      <p class="ranking-footnote">各组共用标尺、组内排序；点击柱子在此查看人数、计算与来源。<template v-if="country==='us'">分母为雇员岗位，不含业主。</template></p>
      <details class="ranking-scope"><summary>口径与覆盖说明</summary><p v-for="note in complete.notes" :key="note">{{note}}</p><p v-if="modelBases(views)">估算依据：{{modelBases(views)}}</p><p>这里按行业及产品部门汇总就业，并非具体职业类别的排名。</p></details>
     </template>
    </template>
    <p v-else class="ranking-loading" role="status">{{employmentState==='failed'?employmentError:'正在读取全行业就业与人均数据…'}}<button v-if="employmentState==='failed'" @click="emit('retry')">重新读取</button></p>
   </section>
  </div>
  <div class="rankings-actions"><button @click="share">分享榜单</button><button :disabled="employmentState!=='ready'" @click="download">下载两项榜单</button><a :href="withBase('/employment-methodology')">方法与覆盖 ↗</a><span v-if="notice" role="status">{{notice}}</span></div>
 </section>
</template>

<style scoped>
.industry-rankings{margin:46px 0 54px;scroll-margin-top:100px}.rankings-caption{display:flex;align-items:baseline;gap:22px;padding:0 0 21px;border-bottom:1px solid #d9e2eb}.rankings-caption>span{font-size:12px;color:#60768d;white-space:nowrap}.rankings-caption b{font-size:14px;color:#294964;font-weight:500;margin-left:7px;font-variant-numeric:tabular-nums}.rankings-caption p{font-size:12px;color:#8795a3;margin:0!important}.rankings-columns{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:44px}.ranking-column{min-width:0;padding-top:27px}.ranking-column+section{padding-left:32px;border-left:1px solid #e7edf2}.ranking-column header{display:flex;align-items:baseline;gap:11px;flex-wrap:wrap}.column-number{font-size:11px;letter-spacing:.08em;color:#91a3b5}.ranking-column h2{font-size:19px;font-weight:500;letter-spacing:-.025em;color:#263e56}.ranking-unit{font-size:10px;color:#8293a5;margin-left:auto;white-space:nowrap}.ranking-description{font-size:11px;line-height:1.7;color:#7d8fa1;margin:9px 0 22px!important}.ranking-bars{list-style:none!important;margin:0!important;padding:0!important}.ranking-bars li{margin:0 0 14px;padding:0;border-radius:4px;transition:background-color .15s}.ranking-row{display:flex;align-items:center;gap:8px}.ranking-bar-button{display:block;flex:1;min-width:0;width:100%;padding:3px 0 4px;text-align:left;color:#334f6c;user-select:text}.ranking-bar-button:hover{text-decoration:none}.ranking-label{display:flex;align-items:baseline;gap:9px;min-width:0;margin-bottom:8px;font-size:12px;line-height:1.55}.ranking-order{font-size:10px;color:#9aaabb;min-width:17px;font-variant-numeric:tabular-nums}.ranking-name{flex:1;min-width:0;overflow-wrap:anywhere}.ranking-name small{font-size:9px;color:#8b9aad;margin-left:5px}.ranking-label strong{font-size:12px;font-weight:500;white-space:nowrap;letter-spacing:-.025em;font-variant-numeric:tabular-nums;color:#304f72}.ranking-track{display:block;margin-left:26px;background:#f0f4f8;height:15px;position:relative;overflow:hidden;border-radius:1px}.ranking-track>span{display:block;height:100%;background:#5c85ad;transition:width .28s,background .15s}.productivity-column .ranking-track>span{background:#87a8c5}.is-highlighted{background:#f5f8fc}.is-highlighted .ranking-track>span{background:#285e91}.is-highlighted .ranking-name{color:#173f66}.ranking-trend{flex:0 0 18px;padding:4px 0;color:#9aaec1;font-size:13px;align-self:flex-start;margin-top:1px}.ranking-trend:hover{color:#315d89}.is-supplement{border-top:1px dashed #d9e3ed;padding-top:13px!important;margin-top:19px!important}.ranking-comparison-group h3{font-size:10px;font-weight:400;line-height:1.7;color:#7890a8;border:0;margin:0 0 13px;padding:0}.ranking-comparison-group+.ranking-comparison-group{border-top:1px dashed #dce5ee;margin-top:20px;padding-top:16px}.ranking-footnote{font-size:10px;line-height:1.8;color:#8a9bad;margin:18px 0 0!important}.ranking-gaps{font-size:11px;margin-top:18px;color:#7b8fa4}.ranking-gaps p{margin:0 0 8px}.ranking-gaps button{display:block;text-align:left;margin:6px 0;color:#58738d}.ranking-gaps span{color:#98a6b4}.ranking-loading{padding:34px 0;color:#8295a7;font-size:12px}.ranking-loading button{margin-left:10px}.rankings-actions{display:flex;gap:20px;flex-wrap:wrap;border-top:1px solid #e3eaf1;margin-top:25px;padding-top:14px;font-size:11px}.rankings-actions button,.rankings-actions a{color:#67849f}.rankings-actions span{color:#8195a9}
@media(max-width:900px){.rankings-columns{gap:24px}.ranking-column+section{padding-left:22px}.ranking-column h2{font-size:17px}.ranking-label{font-size:11px;gap:6px}.ranking-label strong{font-size:11px}.ranking-track{margin-left:23px}.rankings-caption{gap:14px}}
@media(max-width:640px){.rankings-columns{grid-template-columns:minmax(0,1fr);gap:26px}.ranking-column+section{padding-left:0;border-left:0;border-top:1px solid #dce5ed}.rankings-caption{align-items:flex-start;flex-direction:column;gap:6px}.ranking-column h2{font-size:19px}.ranking-label{font-size:12px;gap:9px}.ranking-label strong{font-size:12px}.ranking-track{margin-left:26px}.industry-rankings{margin-top:32px}.ranking-bars li{margin-bottom:16px}}
@media(prefers-reduced-motion:reduce){.ranking-bars li,.ranking-track>span{transition:none}}
.ranking-column h2 small{font-size:11px;color:#7d94a8;font-weight:400;margin-left:4px}.ranking-controls{display:flex;gap:12px;align-items:center;flex-wrap:wrap}.ranking-controls label{display:flex;align-items:center;gap:7px;font-size:11px;color:#7d8fa1}.ranking-controls select,.ranking-controls input{min-width:0;max-width:100%;background:white;border:1px solid #dce5ee;border-radius:4px;padding:7px 8px;color:#35566f;font-size:11px}.ranking-controls input{flex:1;width:100px}.ranking-count{font-size:10px;color:#8295a8;margin:12px 0!important}.ranking-pagination{display:flex;gap:18px;align-items:center;justify-content:space-between;border-top:1px solid #e5ecf2;padding-top:14px;margin-top:14px;font-size:11px;color:#6b859d}.ranking-pagination button:disabled,.rankings-actions button:disabled{opacity:.4;cursor:default}.ranking-detail{min-width:0}.ranking-back{font-size:12px;color:#4e7395;margin:0 0 22px}.ranking-empty{font-size:12px;color:#8195a9;padding:30px 0}.ranking-scope{font-size:10px;color:#7b90a4;margin-top:10px;line-height:1.7}.ranking-scope summary{cursor:pointer}.ranking-scope p{font-size:10px;margin:7px 0}.ranking-description b{font-weight:500;color:#456b8f}.ranking-column button:focus-visible,.ranking-controls select:focus-visible,.ranking-controls input:focus-visible{outline:2px solid #5480aa;outline-offset:3px}
.ranking-model-basis{display:block;margin-top:3px;color:#8196aa}
</style>
