import type {Country,Research} from './schema'
import {convertMoney,moneyInBaseUnits,currencyDisclosure,currencyLabels,validExchangeRate,type CurrencySettings} from './currency'

export type ProductivitySort='productivity'|'value'
export type DenominatorKind='persons'|'jobs'|'employees'|'unknown'
export interface ProductivityEvidence {sourceId:string;locator:string;excerpt?:string}
export interface ProductivityValueAdded {
  value:number|null;unit:string;currency:'CNY'|'USD';year:number
  measure:'value-added';priceBasis:'current'|'constant'|'unknown'
  coverage:string;coverageKey:string;releaseDate:string|null;revision:string
  evidence:ProductivityEvidence[]
  evidenceKind?:'fact'|'calculation'
  computation?:{expression:string;inputs:number[];note:string}
}
export interface ProductivityEmployment {
  value:number|null;unit:string;year:number|null
  definition:string;coverage:string;coverageKey:string
  denominatorKind:DenominatorKind
  periodBasis:'annual-average'|'year-end'|'other'|'unknown'
  releaseDate:string|null;revision:string;evidence:ProductivityEvidence[]
  calculation?:{kind:'direct-fact'|'sum-of-official-disjoint-rows';inputs:number[];lineCodes:number[];expression:string}
}
export interface ProductivityRow {
  id:string;country:Country;parentIndustryId:string;name:string;nameEn?:string;year:number
  valueAdded:ProductivityValueAdded;employment:ProductivityEmployment
  /** Both coverageKeys must identify the same verified statistical population.
   * A matching industry label alone is not evidence of compatible coverage. */
  comparable:boolean;comparabilityReasons:string[];gaps:string[]
}
export interface ProductivityParent {
  country:Country;parentIndustryId:string;name?:string;classification:string
  coverage:string;gaps:string[];nonOverlapping:boolean;rows:ProductivityRow[]
}
export interface ProductivityDataset {
  version:string;checkedAt:string;sources:Research['sources'];parents:ProductivityParent[]
}

export const denominatorLabels:Record<DenominatorKind,string>={persons:'每从业人员增加值',jobs:'每就业岗位增加值',employees:'每名雇员增加值（仅雇员）',unknown:'分母口径待核'}
export const periodBasisLabels:Record<ProductivityEmployment['periodBasis'],string>={'annual-average':'全年平均就业规模','year-end':'年末就业规模',other:'其他已注明统计时点',unknown:'就业统计时点未确认'}
const employmentScales:Record<string,number>={'人':1,'千人':1e3,'万人':1e4,'百万人':1e6,'岗位':1,'个岗位':1,'千个岗位':1e3,'万个岗位':1e4,'百万个岗位':1e6,'雇员':1,'名雇员':1,'千名雇员':1e3,'万名雇员':1e4,'百万名雇员':1e6,persons:1,'thousand persons':1e3,'thousands of persons':1e3,'million persons':1e6,jobs:1,'thousand jobs':1e3,'thousands of jobs':1e3,'million jobs':1e6,employees:1,'thousand employees':1e3,'thousands of employees':1e3}
const assert:(ok:unknown,message:string)=>asserts ok=(ok,message)=>{if(!ok)throw new Error('细分比较：'+message)}
const yearValid=(year:unknown):year is number=>typeof year==='number' && Number.isSafeInteger(year) && year>0 && year<10000
const unique=(values:string[])=>[...new Set(values)]
const currencyFor=(country:Country)=>country==='cn'?'CNY':'USD'
const evidenceId=(e:ProductivityEvidence)=>e.sourceId+'|'+e.locator

export interface ProductivityComputedRow {
  row:ProductivityRow
  valueAddedBase:number|null
  employmentCount:number|null
  productivityBase:number|null
  valueGaps:string[]
  productivityGaps:string[]
  rank:number|null
}
export interface ProductivityView {
  country:Country;parentIndustryId:string;requestedYear:number;year:number|null
  sort:ProductivitySort;parent:ProductivityParent|null;availableYears:number[]
  notice:string;historical:boolean
  groups:{id:string;label:string;rows:ProductivityComputedRow[]}[]
  unranked:ProductivityComputedRow[];rows:ProductivityComputedRow[]
}

/** Runtime checks reject mixed-country or mis-parented content rather than
 * silently dropping a foreign observation from an apparently valid ranking. */
export function validateProductivityDataset(dataset:ProductivityDataset):void {
  assert(dataset && typeof dataset.version==='string' && dataset.version.length && /^\d{4}-\d{2}-\d{2}$/.test(dataset.checkedAt),'数据集版本或核查日期缺失')
  assert(Array.isArray(dataset.sources) && Array.isArray(dataset.parents),'来源或父行业列表缺失')
  const sources=new Map(dataset.sources.map(s=>[s.id,s]))
  assert(sources.size===dataset.sources.length,'来源编号重复')
  for(const s of sources.values()){
    let url:URL|null=null;try{url=new URL(s.url)}catch{}
    assert(url && ['https:','http:'].includes(url.protocol) && ['cn','us','global'].includes(s.country),'来源网址或国家无效：'+s.id)
  }
  const parents=new Set<string>(),rowKeys=new Set<string>()
  for(const parent of dataset.parents){
    assert(['cn','us'].includes(parent.country) && parent.parentIndustryId && Array.isArray(parent.rows) && typeof parent.nonOverlapping==='boolean','父行业范围缺失')
    const key=parent.country+'|'+parent.parentIndustryId
    assert(!parents.has(key),'父行业重复：'+key);parents.add(key)
    for(const row of parent.rows){
      assert(row.country===parent.country && row.parentIndustryId===parent.parentIndustryId,'任务行串入另一国家或父行业：'+row.id)
      assert(/^[a-z0-9][a-z0-9._:-]*$/.test(row.id) && row.name && yearValid(row.year),'细分编号、名称或年份无效')
      const rowKey=key+'|'+row.id+'|'+row.year
      assert(!rowKeys.has(rowKey),'同年细分编号重复：'+row.id);rowKeys.add(rowKey)
      assert(row.valueAdded.currency===currencyFor(row.country),'原始增加值币种与国家不符：'+row.id)
      assert(row.employment.denominatorKind in denominatorLabels && row.employment.periodBasis in periodBasisLabels,'就业分母口径无效')
      for(const ref of [...row.valueAdded.evidence,...row.employment.evidence]){
        const source=sources.get(ref.sourceId)
        assert(source && (source.country===row.country || source.country==='global'),'证据缺失或串国：'+ref.sourceId)
        assert(typeof ref.locator==='string' && ref.locator.trim().length,'证据缺少原文定位：'+ref.sourceId)
      }
    }
  }
}

export function employmentInBaseUnits(value:number|null,unit:string):number|null {
  const scale=employmentScales[unit]
  if(value===null || !Number.isFinite(value) || !scale)return null
  const total=value*scale
  return Number.isFinite(total)?total:null
}

function calculate(row:ProductivityRow,parent:ProductivityParent):ProductivityComputedRow {
  const va=row.valueAdded,employment=row.employment,valueGaps:string[]=[],productivityGaps:string[]=[]
  let valueAddedBase:number|null=null
  if(va.value===null || !Number.isFinite(va.value))valueGaps.push('现价增加值缺失或不是有限数值。')
  else{
    try{valueAddedBase=moneyInBaseUnits(va.value,va.unit)}catch{valueGaps.push('增加值单位尚无已定义换算：'+va.unit+'。')}
    if(valueAddedBase!==null && !Number.isFinite(valueAddedBase)){valueAddedBase=null;valueGaps.push('增加值换算超出可计算范围。')}
  }
  if(va.measure!=='value-added' || va.priceBasis!=='current')valueGaps.push('分子不是已确认的现价增加值，不用营业收入、实际增速或不变价替代。')
  if(va.year!==row.year)valueGaps.push(`增加值为 ${va.year} 年，与当前行 ${row.year} 年不同。`)
  if(!va.evidence.length)valueGaps.push('增加值尚缺来源原文定位。')
  const computation=va.computation
  if(va.evidenceKind==='calculation' && (!computation || typeof computation.expression!=='string' || !computation.expression.trim() || !Array.isArray(computation.inputs) || !computation.inputs.length || !computation.inputs.every(Number.isFinite)))valueGaps.push('增加值为计算结果，但表达式或有限输入值缺失，暂不入榜。')
  if(!parent.nonOverlapping)valueGaps.push('父行业的细分类尚未确认互斥，保留数据但不编号排名。')
  productivityGaps.push(...valueGaps)
  const employmentCount=employmentInBaseUnits(employment.value,employment.unit)
  if(employment.value===null || !Number.isFinite(employment.value))productivityGaps.push('就业规模缺失或不是有限数值。')
  else if(employmentCount===null)productivityGaps.push('就业单位尚无已定义换算：'+employment.unit+'。')
  else if(employmentCount<=0)productivityGaps.push('就业分母不大于零，不能相除。')
  if(employment.year!==row.year)productivityGaps.push(`就业数据期 ${employment.year??'未注明'} 与增加值行 ${row.year} 年不同，不跨年拼接。`)
  if(employment.denominatorKind==='unknown')productivityGaps.push('未确认分母是人员、岗位还是雇员。')
  const unitKind=/岗位|jobs/.test(employment.unit)?'jobs':/雇员|employees/.test(employment.unit)?'employees':'persons'
  if(employmentCount!==null && employment.denominatorKind!=='unknown' && unitKind!==employment.denominatorKind && !(unitKind==='persons' && employment.denominatorKind==='employees'))productivityGaps.push('就业单位与人员、岗位或雇员口径不一致。')
  if(employment.periodBasis==='unknown')productivityGaps.push('就业统计时点或全年平均口径未确认。')
  if(!employment.definition.trim())productivityGaps.push('就业分母定义缺失。')
  if(!employment.evidence.length)productivityGaps.push('就业规模尚缺来源原文定位。')
  const denominatorCalculation=employment.calculation
  if(denominatorCalculation){
    const c=denominatorCalculation
    if(!['direct-fact','sum-of-official-disjoint-rows'].includes(c.kind) || !Array.isArray(c.inputs) || !c.inputs.length || !c.inputs.every(v=>Number.isFinite(v)&&v>=0) || !Array.isArray(c.lineCodes) || c.lineCodes.length!==c.inputs.length || !c.lineCodes.every(v=>Number.isSafeInteger(v)&&v>0) || new Set(c.lineCodes).size!==c.lineCodes.length || typeof c.expression!=='string' || !c.expression.trim())productivityGaps.push('就业取数或合计说明含缺失、重复行号、非法输入或缺少表达式，不能作为分母。')
    else{
      const sum=c.inputs.reduce((a,b)=>a+b,0),tolerance=Math.max(1,Math.abs(employment.value??0))*1e-12
      if(!Number.isFinite(sum) || employment.value===null || Math.abs(sum-employment.value)>tolerance || (c.kind==='direct-fact' && c.inputs.length!==1))productivityGaps.push('就业原值与直接取数或互斥官方行加总不一致，不能作为分母。')
    }
  }
  if(!row.comparable)productivityGaps.push('分子与就业分母尚未获准比较。',...row.comparabilityReasons)
  if(!va.coverageKey.trim() || !employment.coverageKey.trim() || va.coverageKey!==employment.coverageKey)productivityGaps.push('增加值与就业的统计范围未确认一致。')
  if(!va.coverage.trim() || !employment.coverage.trim())productivityGaps.push('统计覆盖范围说明缺失。')
  const result=!productivityGaps.length && valueAddedBase!==null && employmentCount!==null?valueAddedBase/employmentCount:null
  if(result!==null && !Number.isFinite(result))productivityGaps.push('每人或每岗位结果超出可计算范围。')
  return {row,valueAddedBase,employmentCount,productivityBase:productivityGaps.length?null:result,valueGaps:unique(valueGaps),productivityGaps:unique(productivityGaps),rank:null}
}

/** Explicit selectedYear may show a user-chosen later year. The default never
 * silently falls forward beyond the requested main-view year. */
export function productivityView(dataset:ProductivityDataset,country:Country,parentIndustryId:string,requestedYear:number,sort:ProductivitySort='productivity',selectedYear?:number):ProductivityView {
  validateProductivityDataset(dataset)
  assert(['cn','us'].includes(country) && yearValid(requestedYear) && ['productivity','value'].includes(sort),'国家、年份或排序无效')
  const parent=dataset.parents.find(p=>p.country===country && p.parentIndustryId===parentIndustryId)??null
  if(!parent)assert(!dataset.parents.some(p=>p.parentIndustryId===parentIndustryId && p.country!==country),'所选父行业属于另一国家')
  const availableYears=unique((parent?.rows??[]).map(r=>String(r.year))).map(Number).sort((a,b)=>b-a)
  const year=selectedYear===undefined?availableYears.find(y=>y<=requestedYear)??null:availableYears.includes(selectedYear)?selectedYear:null
  const historical=year!==null && (year<requestedYear || year<(availableYears[0]??year))
  const notice=parent===null?'此父行业尚未纳入可追溯的细分数据。':year===null?`没有 ${selectedYear??requestedYear} 年${selectedYear===undefined?'及以前':''}可用细分数据；未自动采用更晚年份。`:year<requestedYear?`历史细分资料：${year} 年。主视图为 ${requestedYear} 年；此处不代表主视图当年规模。`:year>requestedYear?`已明确选择 ${year} 年细分资料；主视图仍为 ${requestedYear} 年。`:historical?`正在查看 ${year} 年历史细分资料。`:`正在查看 ${year} 年细分资料。`
  const rows=year===null?[]:parent!.rows.filter(r=>r.year===year).map(r=>calculate(r,parent!))
  const grouped=new Map<string,ProductivityView['groups'][number]>(),unranked:ProductivityComputedRow[]=[]
  const metric=(r:ProductivityComputedRow)=>sort==='value'?r.valueAddedBase:r.productivityBase
  for(const r of rows){
    if((sort==='value'?r.valueGaps:r.productivityGaps).length || metric(r)===null){unranked.push(r);continue}
    const key=sort==='value'?'value':r.row.employment.denominatorKind+'-'+r.row.employment.periodBasis
    if(!grouped.has(key))grouped.set(key,{id:key,label:sort==='value'?'现价增加值':denominatorLabels[r.row.employment.denominatorKind]+' · '+periodBasisLabels[r.row.employment.periodBasis],rows:[]})
    grouped.get(key)!.rows.push(r)
  }
  const groups=[...grouped.values()]
  for(const group of groups){
    group.rows.sort((a,b)=>metric(b)!-metric(a)! || a.row.id.localeCompare(b.row.id))
    group.rows.forEach((r,i)=>{r.rank=i>0 && metric(r)===metric(group.rows[i-1])?group.rows[i-1].rank:i+1})
  }
  return {country,parentIndustryId,requestedYear,year,sort,parent,availableYears,notice,historical,groups,unranked,rows:[...groups.flatMap(g=>g.rows),...unranked]}
}

export function productivityDisplay(row:ProductivityComputedRow,settings:CurrencySettings) {
  assert(settings.mode in currencyLabels && validExchangeRate(settings.usdCny),'显示币种或汇率无效')
  const currency=row.row.valueAdded.currency
  return {valueAdded:row.valueAddedBase===null?null:convertMoney(row.valueAddedBase,currency==='CNY'?'元':'美元',currency,settings),valueAddedUnit:currencyLabels[settings.mode],productivity:row.productivityBase===null?null:convertMoney(row.productivityBase,currency==='CNY'?'元':'美元',currency,settings,true),productivityUnit:(settings.mode==='cny-100m'?'元':'美元')+(row.row.employment.denominatorKind==='jobs'?'/就业岗位':row.row.employment.denominatorKind==='employees'?'/雇员':row.row.employment.denominatorKind==='unknown'?'/就业单位（口径待核）':'/从业人员')}
}

/** Suggest a dated alternative; callers must require a user action to select it. */
export function latestComparableProductivityYear(dataset:ProductivityDataset,country:Country,parentIndustryId:string,requestedYear:number):number|null {
  const view=productivityView(dataset,country,parentIndustryId,requestedYear)
  if(!view.parent)return null
  return view.availableYears.find(year=>year<=requestedYear && view.parent!.rows.some(row=>row.year===year && calculate(row,view.parent!).productivityBase!==null))??null
}

export function productivityExport(dataset:ProductivityDataset,view:ProductivityView,settings:CurrencySettings) {
  const sourceIds=new Set(view.rows.flatMap(r=>[...r.row.valueAdded.evidence,...r.row.employment.evidence].map(e=>e.sourceId)))
  return {version:dataset.version,checkedAt:dataset.checkedAt,country:view.country,parentIndustryId:view.parentIndustryId,requestedYear:view.requestedYear,selectedYear:view.year,sort:view.sort,classification:view.parent?.classification??null,coverage:view.parent?.coverage??null,notice:view.notice,gaps:view.parent?.gaps??[],exchangeRate:{...settings,assumedUsdCny:settings.usdCny,disclosure:currencyDisclosure(settings)},rankingGroups:view.groups.map(g=>({id:g.id,label:g.label,rowIds:g.rows.map(r=>r.row.id)})),rows:view.rows.map(r=>({rank:r.rank,original:r.row,computed:{valueAddedInOriginalCurrencyBaseUnits:r.valueAddedBase,employmentBaseCount:r.employmentCount,productivityInOriginalCurrencyBaseUnits:r.productivityBase,formula:'同年现价增加值（原币元） ÷ 已核同范围就业人数、岗位数或雇员数',valueGaps:r.valueGaps,productivityGaps:r.productivityGaps},display:productivityDisplay(r,settings)})),sources:dataset.sources.filter(s=>sourceIds.has(s.id))}
}

export function productivityShareUrl(base:string,view:Pick<ProductivityView,'country'|'parentIndustryId'|'year'|'sort'>,settings:CurrencySettings):string {
  assert(settings.mode in currencyLabels && validExchangeRate(settings.usdCny),'显示币种或汇率无效')
  const url=new URL(base),pageCountry=url.pathname.match(/(?:^|\/)(cn|us)(?:\/|$)/)?.[1]
  assert(pageCountry===view.country,'分享页面国家与细分范围不一致')
  url.searchParams.set('filter.subindustry',view.parentIndustryId)
  if(view.year===null)url.searchParams.delete('filter.subyear');else url.searchParams.set('filter.subyear',String(view.year))
  url.searchParams.set('filter.subsort',view.sort);url.searchParams.set('filter.currency',settings.mode);url.searchParams.set('filter.fx',String(settings.usdCny))
  url.hash='subindustry-'+view.parentIndustryId
  return url.href
}

export function productivityEvidence(row:ProductivityRow):ProductivityEvidence[] {
  return [...new Map([...row.valueAdded.evidence,...row.employment.evidence].map(e=>[evidenceId(e),e])).values()]
}
