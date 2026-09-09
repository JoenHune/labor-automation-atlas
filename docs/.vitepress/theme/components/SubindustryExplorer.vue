<script setup lang="ts">
import {computed,nextTick,onBeforeUnmount,onMounted,ref,watch} from 'vue'
import {useCurrency} from '../../../../src/preferences/currency'
import {formatAmount} from '../../../../src/research/currency'
import {denominatorLabels,latestComparableProductivityYear,periodBasisLabels,productivityDisplay,productivityEvidence,productivityExport,productivityShareUrl,productivityView,type ProductivityComputedRow,type ProductivityDataset,type ProductivitySort} from '../../../../src/research/productivity'

const props=defineProps<{country:'cn'|'us';parentIndustryId:string;requestedYear:number;dataset:ProductivityDataset}>()
const {settings,unit,disclosure}=useCurrency()
const employmentUnit=(u:string)=>({jobs:'岗位',persons:'人',employees:'雇员','thousand employees':'千名雇员','thousands of employees':'千名雇员','thousands of jobs':'千个岗位'} as Record<string,string>)[u]??u
const selectedYear=ref<number>(),sort=ref<ProductivitySort>('productivity'),notice=ref('')
let mounted=false,restoring=false
const result=computed(()=>{
  try{return{view:productivityView(props.dataset,props.country,props.parentIndustryId,props.requestedYear,sort.value,selectedYear.value),error:''}}
  catch(error){return{view:null,error:error instanceof Error?error.message:'细分数据未通过范围校验。'}}
})
const view=computed(()=>result.value.view)
const comparableYear=computed(()=>view.value && !view.value.groups.length && sort.value==='productivity'?latestComparableProductivityYear(props.dataset,props.country,props.parentIndustryId,props.requestedYear):null)
const sourceMap=computed(()=>new Map(props.dataset.sources.map(s=>[s.id,s])))
const sections=computed(()=>view.value?[...view.value.groups,...(view.value.unranked.length?[{id:'unranked',label:sort.value==='value'?'暂不参与增加值排名':'暂无可比的每人或每岗位结果',rows:view.value.unranked}]:[])]:[])
const display=(r:ProductivityComputedRow)=>productivityDisplay(r,settings.value)
const amount=(value:number|null)=>formatAmount(value!==null&&Number.isFinite(value)?value:null,2)
const titleId=computed(()=>'subindustry-'+props.parentIndustryId)
const blockId=(suffix:string)=>`${props.country}-${props.parentIndustryId}-sub-${view.value?.year??props.requestedYear}-${suffix}`
const rowId=(r:ProductivityComputedRow)=>blockId(r.row.id)
const gaps=(r:ProductivityComputedRow)=>sort.value==='value'?r.valueGaps:r.productivityGaps
const metric=(r:ProductivityComputedRow)=>sort.value==='value'?r.valueAddedBase:r.productivityBase
const width=(r:ProductivityComputedRow,rows:ProductivityComputedRow[])=>{
  const max=Math.max(0,...rows.map(row=>Math.abs(metric(row)??0)))
  return max?Math.abs(metric(r)??0)/max*100:0
}
const evidenceLabel=(id:string)=>sourceMap.value.get(id)?.title??'未找到来源'
const evidenceDate=(id:string)=>{
  const s=sourceMap.value.get(id)
  return s?[s.publisher,'发布：'+(s.publishedLabel??s.published??'未确认'),'读取：'+s.retrieved,...(s.evidencePeriod?[s.evidencePeriod]:[]),...(s.dates??[]).map(d=>d.note+'：'+d.value)].join(' · '):''
}
function restore(){
  if(typeof window==='undefined')return
  restoring=true
  const query=new URLSearchParams(location.search),sameParent=query.get('filter.subindustry')===props.parentIndustryId,rawYear=query.get('filter.subyear')
  selectedYear.value=sameParent && rawYear!==null && /^\d{4}$/.test(rawYear)?Number(rawYear):undefined
  sort.value=sameParent && query.get('filter.subsort')==='value'?'value':'productivity'
  restoring=false
}
function sync(){
  if(!mounted || restoring || !view.value)return
  const url=new URL(productivityShareUrl(location.href,view.value,settings.value));url.hash=location.hash
  history.replaceState(null,'',url)
  window.dispatchEvent(new CustomEvent('atlas:view-change'))
}
function chooseYear(event:Event){selectedYear.value=Number((event.target as HTMLSelectElement).value)}
async function share(){
  if(!view.value)return
  const url=productivityShareUrl(location.href,view.value,settings.value)
  try{await navigator.clipboard.writeText(url);notice.value='已复制细分链接，包含父行业、统计年、排序、币种和汇率。'}
  catch{history.replaceState(null,'',url);notice.value='链接已更新到地址栏，可直接复制。'}
}
function download(){
  if(!view.value)return
  const record=productivityExport(props.dataset,view.value,settings.value),blob=new Blob([JSON.stringify(record,null,2)],{type:'application/json;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a')
  a.href=url;a.download=`${props.country}-${props.parentIndustryId}-subindustry-${view.value.year??'missing'}-${sort.value}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),0)
  notice.value='已导出当前表的原始值、显示换算、汇率假设、计算和来源。'
}
watch([selectedYear,sort],sync)
// The parent clears filter.subyear synchronously for a manual main-year change;
// a popstate navigation retains it, so restoring here preserves explicit links.
watch(()=>props.requestedYear,()=>{restore();sync()})
watch(()=>[props.country,props.parentIndustryId],()=>{restore();sync()})
watch(()=>props.dataset,sync)
onMounted(async()=>{restore();mounted=true;sync();window.addEventListener('popstate',restore);await nextTick();if(location.hash==='#'+titleId.value)document.getElementById(titleId.value)?.scrollIntoView({block:'start'})})
onBeforeUnmount(()=>{mounted=false;window.removeEventListener('popstate',restore)})
</script>

<template>
 <section :id="titleId" tabindex="-1" class="subindustry-explorer" :data-country="country" :data-research-version="dataset.version" :data-content-id="blockId('explorer')" :aria-labelledby="titleId+'-heading'">
  <div class="sub-heading"><div><p class="sub-eyebrow">{{country==='cn'?'中国':'美国'}} · {{view?.parent?.name??parentIndustryId}}</p><h2 :id="titleId+'-heading'">细分行业<span v-if="view?.year"> · {{view.year}} 年</span></h2></div>
   <div class="sub-controls">
    <label>统计年 <select :value="view?.year??''" :disabled="!view?.availableYears.length" aria-label="细分行业统计年" @change="chooseYear"><option v-if="view?.year===null" value="" disabled>无对应年份</option><option v-for="year in view?.availableYears??[]" :key="year" :value="year">{{year}} 年</option></select></label>
    <label>排序 <select v-model="sort" aria-label="细分行业排序"><option value="productivity">人均产值（增加值÷就业规模）</option><option value="value">增加值</option></select></label>
   </div>
  </div>
  <p v-if="result.error" role="alert" class="sub-warning">{{result.error}} 未显示可能串国或错配的数据。</p>
  <template v-else-if="view">
   <p class="sub-period" :class="{'sub-historical':view.historical||view.year===null||view.year>requestedYear}" :data-content-id="blockId('period')" tabindex="0">{{view.notice}}</p>
   <p v-if="view.parent" class="sub-scope" :data-content-id="blockId('scope')" tabindex="0">{{view.parent.classification}}。{{view.parent.coverage}}</p>
   <p class="sub-scope">{{disclosure}} 人均产值以从业人数为本义；就业岗位、仅雇员及不同统计时点分别单列，不能相互替代。增加值除以就业规模不代表自动化收益。</p>
   <div v-if="sort==='productivity'&&!view.groups.length&&view.rows.length" class="sub-warning" :data-content-id="blockId('no-productivity')" tabindex="0"><p>本年尚无满足同年、同统计范围要求的每人或每岗位结果。下列细分完整保留，不编号排名；可切换“增加值”查看规模。</p><button v-if="comparableYear!==null" class="sub-year-suggestion" @click="selectedYear=comparableYear!">查看最近有可比结果的年份 · {{comparableYear}}</button></div>
   <div class="sub-actions"><button :disabled="!view.parent" @click="share">分享当前细分</button><button :disabled="!view.parent" @click="download">导出当前表与来源</button><span role="status" aria-live="polite">{{notice}}</span></div>
   <section v-for="section in sections" :key="section.id" class="sub-group" :data-content-id="blockId('group-'+section.id)">
    <h3>{{section.label}}<small>{{section.rows.length}} 项</small></h3>
    <p v-if="section.id!=='unranked'&&section.rows.some(r=>(metric(r)??0)<0)" class="sub-scope">条形长度显示绝对规模；负值用灰色条形并标明负号。</p>
    <ol class="sub-rows">
     <li v-for="row in section.rows" :key="row.row.id+'-'+row.row.year" :data-content-id="rowId(row)" tabindex="0">
      <div class="sub-row-heading"><span class="sub-rank">{{row.rank===null?'未排名':row.rank}}</span><div><strong>{{row.row.name}}</strong><small v-if="row.row.nameEn">{{row.row.nameEn}}</small></div></div>
      <div class="sub-numbers">
       <div><span>增加值 · {{unit}}</span><strong>{{amount(display(row).valueAdded)}}</strong><small>{{row.row.valueAdded.year}} 年 · {{row.row.valueAdded.priceBasis==='current'?'现价':'非现价，不入榜'}} · {{row.row.valueAdded.evidenceKind==='calculation'?'计算结果':'来源值'}}</small></div>
       <div><span>就业规模 · {{employmentUnit(row.row.employment.unit)}}</span><strong>{{amount(row.row.employment.value)}}</strong><small>{{row.row.employment.year??'年份缺失'}} · {{periodBasisLabels[row.row.employment.periodBasis]}}<br>{{row.row.employment.denominatorKind==='jobs'?'就业岗位':row.row.employment.denominatorKind==='employees'?'仅雇员':row.row.employment.denominatorKind==='persons'?'从业人员':'口径未确认'}}</small></div>
       <div><span>{{denominatorLabels[row.row.employment.denominatorKind]}}</span><strong>{{amount(display(row).productivity)}}</strong><small>{{display(row).productivityUnit}}</small></div>
      </div>
      <div v-if="row.rank!==null" class="sub-bar-track" :data-content-id="rowId(row)+'-bar'" :data-annotation-points="JSON.stringify([{key:row.row.id,period:String(row.row.year),value:metric(row)}])" tabindex="0" role="img" :aria-label="row.row.name+'，'+section.label+'：'+amount(sort==='value'?display(row).valueAdded:display(row).productivity)"><span :class="{'sub-negative':(metric(row)??0)<0}" :style="{width:width(row,section.rows)+'%'}"></span></div>
      <p v-if="gaps(row).length" class="sub-row-gap">{{gaps(row).slice(0,3).join(' ')}}<span v-if="gaps(row).length>3">其余限制见下方展开。</span></p>
      <details :data-content-id="rowId(row)+'-evidence'"><summary>公式、统计范围与来源原文</summary>
       <p><strong>分子：</strong>{{row.row.valueAdded.value??'缺失'}} {{row.row.valueAdded.unit}}，{{row.row.valueAdded.year}} 年。{{row.row.valueAdded.coverage}} 发布 {{row.row.valueAdded.releaseDate??'未确认'}}；{{row.row.valueAdded.revision}}</p>
       <p v-if="row.row.valueAdded.evidenceKind==='calculation'"><strong>增加值计算：</strong>{{row.row.valueAdded.computation?.expression??'表达式缺失'}}；输入 {{row.row.valueAdded.computation?.inputs.join('，')??'缺失'}}。{{row.row.valueAdded.computation?.note}}</p>
       <p><strong>分母：</strong>{{row.row.employment.value??'缺失'}} {{row.row.employment.unit}}，{{row.row.employment.year??'年份缺失'}}。{{row.row.employment.definition}} {{row.row.employment.coverage}} 发布 {{row.row.employment.releaseDate??'未确认'}}；{{row.row.employment.revision}}</p>
       <p v-if="row.row.employment.calculation"><strong>分母{{row.row.employment.calculation.kind==='direct-fact'?'直接取数':'加总计算'}}：</strong>{{row.row.employment.calculation.expression}}；输入 {{row.row.employment.calculation.inputs.join('，')}}；官方行号 {{row.row.employment.calculation.lineCodes.join('，')}}。</p>
       <p><strong>公式：</strong>同年现价增加值（原币元） ÷ 同统计范围的{{row.row.employment.denominatorKind==='jobs'?'就业岗位数':row.row.employment.denominatorKind==='employees'?'雇员数':row.row.employment.denominatorKind==='unknown'?'就业单位数（口径待核）':'从业人数'}}。<template v-if="row.productivityBase!==null">{{amount(row.valueAddedBase)}} ÷ {{amount(row.employmentCount)}} = {{amount(row.productivityBase)}} {{row.row.valueAdded.currency==='CNY'?'元':'美元'}}／{{row.row.employment.denominatorKind==='jobs'?'就业岗位':row.row.employment.denominatorKind==='employees'?'雇员':'从业人员'}}。</template><template v-else>当前不计算结果。</template></p>
       <p>{{row.row.comparabilityReasons.join('；')}}</p>
       <ul v-if="row.productivityGaps.length||row.row.gaps.length"><li v-for="gap in [...new Set([...row.productivityGaps,...row.row.gaps])]" :key="gap">{{gap}}</li></ul>
       <ul class="sub-evidence"><li v-for="ref in productivityEvidence(row.row)" :key="ref.sourceId+'|'+ref.locator"><a :href="sourceMap.get(ref.sourceId)?.url" target="_blank" rel="noopener noreferrer">{{evidenceLabel(ref.sourceId)}}</a><p>{{ref.locator}}</p><small>{{evidenceDate(ref.sourceId)}}</small><p v-for="limit in sourceMap.get(ref.sourceId)?.limitations??[]" :key="limit">{{limit}}</p><p v-if="ref.excerpt">{{ref.excerpt}}</p></li></ul>
      </details>
     </li>
    </ol>
   </section>
   <details v-if="view.parent?.gaps.length" class="sub-coverage-gaps" :data-content-id="blockId('coverage-gaps')" open><summary>统计覆盖与待补资料</summary><ul><li v-for="gap in view.parent.gaps" :key="gap">{{gap}}</li></ul></details>
   <p class="sub-scope">资料版本 {{dataset.version}} · 核查 {{dataset.checkedAt}}。原值、换算值与缺口随当前表导出。</p>
  </template>
 </section>
</template>

<style scoped>
.sub-year-suggestion{color:#184b9b;border:1px solid #a8bfdc;border-radius:5px;padding:.3rem .65rem;background:#fff;font-size:.82rem;cursor:pointer}.sub-warning>p{margin:0 0 .5rem}
.subindustry-explorer{margin:1.3rem 0;padding:1.15rem;border:1px solid #d9e2ef;border-radius:10px;background:#fff;color:#172235;scroll-margin-top:150px}.sub-heading{display:flex;justify-content:space-between;gap:1rem;align-items:flex-start}.sub-heading h2{border:0;margin:.1rem 0 .7rem;padding:0;font-size:1.35rem}.sub-eyebrow{margin:0;color:#47617e;font-size:.8rem}.sub-controls,.sub-actions{display:flex;flex-wrap:wrap;align-items:center;gap:.6rem}.sub-controls label{font-size:.8rem;display:grid;gap:.2rem}.sub-controls select{max-width:100%;padding:.35rem;border:1px solid #bdcadd;border-radius:5px;background:white;color:#172235}.sub-actions{margin:.75rem 0;font-size:.8rem}.sub-actions button{border:1px solid #b6c7e0;border-radius:5px;padding:.3rem .6rem;color:#174dab}.sub-actions button:disabled{opacity:.45;cursor:not-allowed}.sub-period{font-weight:650;margin:.5rem 0}.sub-historical,.sub-warning{background:#f0f5ff;border-left:3px solid #2862c7;padding:.65rem .8rem}.sub-scope{font-size:.82rem;color:#495d75;line-height:1.6}.sub-group h3{font-size:1rem;margin:1.15rem 0 .6rem}.sub-group h3 small{margin-left:.65rem;font-size:.78rem;color:#5a6d83;font-weight:400}.sub-rows{list-style:none!important;margin:0!important;padding:0!important}.sub-rows>li{margin:0!important;padding:.8rem 0;border-top:1px solid #e7edf5}.sub-row-heading{display:flex;gap:.7rem;align-items:flex-start}.sub-rank{color:#285eb5;min-width:2.5rem;font-size:.78rem;line-height:1.4rem}.sub-row-heading strong{font-size:.95rem}.sub-row-heading small{display:block;color:#69788d;font-size:.75rem}.sub-numbers{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.7rem;margin:.6rem 0}.sub-numbers>div{display:flex;flex-direction:column;overflow-wrap:anywhere}.sub-numbers span,.sub-numbers small{font-size:.74rem;line-height:1.4;color:#53677d}.sub-numbers strong{font-size:1.05rem;font-variant-numeric:tabular-nums;margin:.16rem 0}.sub-bar-track{height:9px;border-radius:3px;background:#f0f3f8;overflow:hidden;margin:.55rem 0}.sub-bar-track>span{display:block;height:100%;background:#2862c7;min-width:0}.sub-bar-track .sub-negative{background:#64748b;margin-left:auto}.sub-row-gap{font-size:.78rem;color:#5b6071;margin:.4rem 0}.sub-rows details{font-size:.8rem;margin-top:.5rem}.sub-rows summary,.sub-coverage-gaps summary{color:#2558a5;cursor:pointer}.sub-rows details p{line-height:1.6;margin:.5rem 0}.sub-evidence{padding-left:1.2rem}.sub-evidence>li{margin:.5rem 0}.sub-evidence a{overflow-wrap:anywhere}.sub-evidence small{color:#5a6b80}.sub-coverage-gaps{font-size:.82rem;margin:1rem 0}.subindustry-explorer :focus-visible{outline:2px solid #2862c7;outline-offset:3px}@media(max-width:640px){.subindustry-explorer{padding:.85rem}.sub-heading{display:block}.sub-controls{margin-bottom:.8rem}.sub-numbers{grid-template-columns:1fr;gap:.45rem}.sub-numbers>div{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:.2rem .65rem}.sub-numbers strong{text-align:right}.sub-numbers small{grid-column:1/-1}.sub-controls label{flex:1;min-width:140px}.sub-controls select{width:100%}.sub-row-heading strong{font-size:.95rem}}
</style>
