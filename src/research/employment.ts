import {EmploymentDatasetSchema,type EmploymentDataset,type EmploymentRecord,type EmploymentMeasure,type Country} from './schema'
import type {ScaleNode} from './industry-scale'
import {convertMoney,formatAmount,type CurrencySettings} from './currency'

export type EmploymentMetric='employment'|'productivity'
export const employmentStatusLabels:Record<EmploymentMeasure['status'],string>={official:'官方统计',calculated:'官方数计算',estimated:'估算',unavailable:'数据缺口','not-applicable':'不适用'}
export const employmentUnitLabels:Record<EmploymentMeasure['denominatorKind'],string>={persons:'人',jobs:'岗位',employees:'雇员',fte:'全职当量'}
export const employmentPeriodLabels:Record<EmploymentMeasure['periodBasis'],string>={'annual-average':'全年平均','year-end':'年末规模',other:'所注明统计时点'}
const key=(country:Country,basis:string,nodeId:string,year:number)=>[country,basis||'annual-industry',nodeId,year].join('|')
const close=(a:number,b:number)=>Math.abs(a-b)<=Math.max(1,Math.abs(a),Math.abs(b))*1e-9
const assert:(ok:unknown,message:string)=>asserts ok=(ok,message)=>{if(!ok)throw new Error('就业与人均：'+message)}

/** Typed arithmetic makes every displayed denominator independently reproducible.
 * share inputs are [employment pool, target weight, total weight]. */
export function employmentCalculation(c:NonNullable<EmploymentMeasure['calculation']>):number {
 const n=c.inputs.map(x=>x.value)
 let value:number
 if(c.operation==='identity'){assert(n.length===1,'直接引用必须有一个输入');value=n[0]}
 else if(c.operation==='sum')value=n.reduce((a,b)=>a+b,0)
 else if(c.operation==='difference'){assert(n.length>=2,'求差至少有两个输入');value=n[0]-n.slice(1).reduce((a,b)=>a+b,0)}
 else{assert(n.length===3&&n[2]>0&&n[0]>=0&&n[1]>=0,'权重分配需要非负总量、权重及正权重和');value=n[0]*n[1]/n[2]}
 assert(Number.isFinite(value)&&value>=0,'就业计算结果不是有效非负数')
 return value
}

export function validateEmployment(input:EmploymentDataset):EmploymentDataset {
 const data=EmploymentDatasetSchema.parse(input),sources=new Map(data.sources.map(s=>[s.id,s]))
 assert(sources.size===data.sources.length,'来源编号重复')
 const ids=new Set<string>(),keys=new Set<string>()
 for(const record of data.records){
  const k=key(record.country,record.basis,record.nodeId,record.year)
  assert(!ids.has(record.id)&&!keys.has(k),'记录或同年节点重复：'+record.id);ids.add(record.id);keys.add(k)
  assert(record.nodeId.startsWith(record.country+'-'),'节点国家错误：'+record.id)
  assert(record.valueAddedAnchor.currency===(record.country==='cn'?'CNY':'USD'),'增加值货币串国：'+record.id)
  assert(record.employment.year===record.year,'主就业分母与视图年份不同：'+record.id)
  for(const m of [record.employment,...record.references.map(r=>r.measure)]){
   const numeric=['official','calculated','estimated'].includes(m.status)
   assert(numeric===(m.value!==null),'就业状态与数值不一致：'+record.id)
   assert(!numeric||m.evidence.length>0,'就业数缺原文定位：'+record.id)
   const refs=[...m.evidence,...(m.calculation?.inputs.flatMap(i=>i.evidence)??[])]
   for(const e of refs){const source=sources.get(e.sourceId);assert(source&&(source.country===record.country||source.country==='global'),'就业证据不存在或串国：'+e.sourceId)}
   if(m.status==='estimated'||m.status==='calculated')assert(m.calculation,'派生就业缺可复算输入：'+record.id)
   if(m.status==='estimated')assert(m.calculation!.assumptions.length,'就业估算缺假设：'+record.id)
   if(m.calculation)assert(m.value!==null&&close(employmentCalculation(m.calculation),m.value),'就业数与算式输入不符：'+record.id)
   if(m.sensitivity){assert(m.status==='estimated'&&m.value!==null,'敏感性范围仅用于模型估算');assert(m.sensitivity.lower<=m.value&&m.sensitivity.upper>=m.value,'敏感性范围未包含点估算：'+record.id)}
  }
  if(record.employment.value===null)assert(record.gap.trim(),'就业缺失没有具体原因：'+record.id)
  if(['matched','proxy'].includes(record.pairing.status))assert(record.pairing.comparisonGroup,'可比较记录缺少可比组：'+record.id)
  if(record.employment.status==='estimated')assert(record.pairing.status!=='matched','模型就业不能标为官方同口径直接计算：'+record.id)
 }
 return data
}

const indexes=new WeakMap<EmploymentDataset,Map<string,EmploymentRecord>>()
export function employmentRecord(dataset:EmploymentDataset|undefined,node:ScaleNode,basis=''):EmploymentRecord|null {
 if(!dataset)return null
 let index=indexes.get(dataset)
 if(!index){index=new Map(dataset.records.map(r=>[key(r.country,r.basis,r.nodeId,r.year),r]));indexes.set(dataset,index)}
 return index.get(key(node.country,basis,node.id,node.year))??null
}
export interface EmploymentView {
 node:ScaleNode;record:EmploymentRecord|null;count:number|null;productivity:number|null;
 employmentRange:[number,number]|null;productivityRange:[number,number]|null;
 statusLabel:string;unitLabel:string;productivityLabel:string;groupKey:string|null;reason:string;stale:boolean;
}
export function employmentView(dataset:EmploymentDataset|undefined,node:ScaleNode,basis=''):EmploymentView {
 const r=employmentRecord(dataset,node,basis),m=r?.employment
 const stale=!!r&&(r.nodeName!==node.name||r.valueAddedAnchor.currency!==node.currency||r.valueAddedAnchor.coverage!==node.coverage||((r.valueAddedAnchor.baseValue===null)!==(node.baseValue===null))||(r.valueAddedAnchor.baseValue!==null&&node.baseValue!==null&&!close(r.valueAddedAnchor.baseValue,node.baseValue)))
 const count=!stale&&m?.year===node.year?m.value:null
 let reason=stale?'行业定义或增加值已更新，原就业配对需要复核。':r?.gap??'该节点的就业资料尚未完成研究。'
 const permitted=r&&!stale&&['matched','proxy'].includes(r.pairing.status)
 const productivity=permitted&&count!==null&&count>0&&node.baseValue!==null?node.baseValue/count:null
 if(count===0)reason='就业分母为零，不能计算人均指标。'
 else if(node.baseValue===null&&count!==null)reason='就业规模已取得；尚缺同年现价增加值，不能计算人均指标。'
 else if(r&&!permitted&&!stale)reason=r.pairing.explanation
 const employmentRange=!stale&&m?.sensitivity?[m.sensitivity.lower,m.sensitivity.upper] as [number,number]:null
 const productivityRange=productivity!==null&&employmentRange&&employmentRange[0]>0&&node.baseValue!==null?[node.baseValue/employmentRange[1],node.baseValue/employmentRange[0]].sort((a,b)=>a-b) as [number,number]:null
 const denominator=m?employmentUnitLabels[m.denominatorKind]:'人'
 const productivityLabel=m?.denominatorKind==='fte'?'每全职当量增加值':m?.denominatorKind==='jobs'?'每岗位增加值':m?.denominatorKind==='employees'?'每雇员增加值':'人均增加值'
 const groupKey=r&&!stale&&count!==null&&r.pairing.comparisonGroup?[r.country,r.year,r.basis,r.pairing.comparisonGroup,m?.denominatorKind,m?.periodBasis,m?.status==='estimated'?'estimated':'observed'].join('|'):null
 return {node,record:r,count,productivity,employmentRange,productivityRange,statusLabel:m?employmentStatusLabels[m.status]:'待研究',unitLabel:denominator,productivityLabel,groupKey,reason,stale}
}
export function employmentDisplay(view:EmploymentView,settings:CurrencySettings){
 const currency=view.node.currency
 const per=(n:number|null)=>n===null?null:convertMoney(n,currency==='CNY'?'元':'美元',currency,settings,true)
 const countUnit=view.count!==null&&view.count>=10000?'万'+view.unitLabel:view.unitLabel
 const countScale=countUnit.startsWith('万')?10000:1
 const estimated=view.record?.employment.status==='estimated'
 const number=(n:number|null,d=1)=>formatAmount(n,d)
 return {count:number(view.count===null?null:view.count/countScale,estimated?1:2),countUnit,productivity:number(per(view.productivity),0),productivityUnit:(settings.mode==='cny-100m'?'元':'美元')+'/'+view.unitLabel,
  employmentRange:view.employmentRange?view.employmentRange.map(n=>number(n/countScale,1)).join('—')+' '+countUnit:null,
  productivityRange:view.productivityRange?view.productivityRange.map(n=>number(per(n),0)).join('—')+' '+(settings.mode==='cny-100m'?'元':'美元')+'/'+view.unitLabel:null}
}
export function employmentGroups(views:EmploymentView[],metric:EmploymentMetric,observedOnly=false){
 const groups=new Map<string,{key:string;label:string;rows:EmploymentView[]}>(),unranked:EmploymentView[]=[]
 const value=(v:EmploymentView)=>metric==='employment'?v.count:v.productivity
 for(const view of views){
  const m=view.record?.employment
  if(value(view)===null||!m||!view.groupKey||(observedOnly&&m.status==='estimated')){unranked.push(view);continue}
  const aggregate=view.node.id.endsWith('-unallocated')
  const k=view.groupKey+(aggregate?'|unallocated':'')
  if(!groups.has(k))groups.set(k,{key:k,label:[...(aggregate?['未分列汇总（含缺金额子项）']:[]),...(view.record!.pairing.scopeNote?[view.record!.pairing.scopeNote]:[]),m.status==='estimated'?'模型估算':view.record!.pairing.status==='proxy'?'覆盖口径代理':'官方就业',employmentPeriodLabels[m.periodBasis],view.unitLabel].join(' · '),rows:[]})
  groups.get(k)!.rows.push(view)
 }
 for(const group of groups.values())group.rows.sort((a,b)=>value(b)!-value(a)!||a.node.name.localeCompare(b.node.name,'zh-CN'))
 return {groups:[...groups.values()],unranked}
}

export function employmentExport(dataset:EmploymentDataset|undefined,views:EmploymentView[],settings:CurrencySettings){
 const records=views.flatMap(v=>v.record?[v.record]:[]),sourceIds=new Set(records.flatMap(r=>[r.employment,...r.references.map(x=>x.measure)].flatMap(m=>[...m.evidence,...(m.calculation?.inputs.flatMap(i=>i.evidence)??[])])).map(e=>e.sourceId))
 return {version:dataset?.version??null,checkedAt:dataset?.checkedAt??null,settings,formula:'当前节点同年现价增加值（原币元） ÷ 同年就业分母；估算和代理性质保留',records,computed:views.map(v=>({nodeId:v.node.id,country:v.node.country,year:v.node.year,valueAddedBase:v.node.baseValue,employmentCount:v.count,productivityBase:v.productivity,employmentRange:v.employmentRange,productivityRange:v.productivityRange,reason:v.reason,display:employmentDisplay(v,settings)})),sources:dataset?.sources.filter(s=>sourceIds.has(s.id))??[]}
}
