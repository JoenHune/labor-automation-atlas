import {IndustryAnalysisSchema,type IndustryAnalysis,type Country,type Research} from './schema'
import {convertMoney,type CurrencySettings} from './currency'

export type AnalysisSection='structure'|'regions'|'companies'
export type AnalysisComparison=IndustryAnalysis['comparisons'][number]
export type AnalysisRow=AnalysisComparison['rows'][number]

export function validateIndustryAnalysis(input:unknown){
  const data=IndustryAnalysisSchema.parse(input)
  const fail=(ok:unknown,message:string)=>{if(!ok)throw new Error('行业分析：'+message)}
  const sources=new Map(data.sources.map(s=>[s.id,s]))
  const ids=[...data.distributions,...data.comparisons,...data.findings,...data.coverage].map(s=>s.id)
  fail(new Set(ids).size===ids.length,'分析编号重复')
  fail(sources.size===data.sources.length,'来源编号重复')
  const checkEvidence=(country:Country,refs:{sourceId:string}[])=>{
    for(const ref of refs){const source=sources.get(ref.sourceId);fail(source&&(source.country===country||source.country==='global'),'来源缺失或串国：'+ref.sourceId)}
  }
  const checkNodes=(country:Country,nodeIds:string[])=>fail(nodeIds.every(id=>id.startsWith(country+'-')),'节点串国')
  for(const table of data.distributions){
    fail(table.currency===(table.country==='cn'?'CNY':'USD'),'分量币种串国')
    fail(new Set(table.rows.map(r=>r.code)).size===table.rows.length,'产品分量重复')
    fail(new Set(table.components.map(c=>c.id)).size===4,'分量名称重复')
    for(const row of table.rows){
      checkEvidence(table.country,row.evidence)
      fail(Math.abs(row.values.reduce((sum,n)=>sum+n,0)-row.valueAdded)<=1,'分量与增加值不衔接：'+row.code)
    }
  }
  for(const table of data.comparisons){
    checkNodes(table.country,table.nodeIds)
    if(table.section!=='companies')fail(!table.currency||table.currency===(table.country==='cn'?'CNY':'USD'),'官方比较币种串国')
    fail(new Set(table.rows.map(r=>r.id)).size===table.rows.length,'比较行重复')
    for(const row of table.rows){
      checkNodes(table.country,row.nodeIds);checkEvidence(table.country,row.evidence)
      fail(!row.currency||table.currency&&row.unit,'公司原币种缺少金额单位')
      fail(row.value!==null||row.missingReason,'缺值未说明：'+row.id)
      if(row.previous){checkEvidence(table.country,row.previous.evidence);fail(row.previous.period!==table.period,'比较期与当期相同')}
      analysisRowAmount(row,table,{mode:'cny-100m',usdCny:6.71})
    }
  }
  for(const finding of data.findings){checkNodes(finding.country,finding.nodeIds);checkEvidence(finding.country,finding.evidence)}
  for(const item of data.coverage){checkEvidence(item.country,item.evidence);fail(item.status==='not-checked'||item.status==='pending'||item.evidence.length,'已核查状态无证据')}
  return data
}

/** Products use their actual IO basis and year; industry employment never supplies a product denominator. */
export function valueDistribution(research:Research,country:Country,basisId:string,nodeId:string){
  const table=research.industryAnalysis?.distributions.find(d=>d.country===country&&d.basisId===basisId)
  const view=research.macroStructures?.structures.find(v=>v.country===country&&v.id===basisId)
  if(!table||!view||table.year!==view.year)return null
  const node=view.nodes.find(n=>n.id===nodeId)
  const codes=node?.memberCodes??(nodeId===country+'-orbit-'+basisId?view.nodes.filter(n=>!n.parentId).flatMap(n=>n.memberCodes):[])
  if(!codes.length||new Set(codes).size!==codes.length)return null
  const rows=codes.map(code=>table.rows.find(r=>r.code===code))
  if(rows.some(r=>!r))return null
  const complete=rows as typeof table.rows
  const total=complete.reduce((sum,row)=>sum+row.valueAdded,0)
  const components=table.components.map((component,i)=>{
    const value=complete.reduce((sum,row)=>sum+row.values[i],0)
    return {...component,value,share:total>0?value/total*100:null}
  })
  return {table,name:node?.name??view.title,total,components,
    roundingDifference:components.reduce((sum,c)=>sum+c.value,0)-total,
    evidence:[...new Map(complete.flatMap(r=>r.evidence).map(e=>[e.sourceId+'|'+e.locator,e])).values()],
    codes,
  }
}

export function analysisComparisons(data:IndustryAnalysis|undefined,country:Country,nodeId:string,section:AnalysisSection){
  return data?.comparisons.filter(t=>t.country===country&&t.section===section&&t.nodeIds.includes(nodeId))??[]
}
export function analysisSections(data:IndustryAnalysis|undefined,country:Country,nodeId:string):AnalysisSection[]{
  return ['structure',...(['regions','companies'] as const).filter(section=>analysisComparisons(data,country,nodeId,section).length)]
}
export function comparisonRows(table:AnalysisComparison,nodeId:string,sort:'value'|'name'='value',settings:CurrencySettings={mode:'cny-100m',usdCny:6.71}){
  return table.rows.filter(row=>!row.nodeIds.length||row.nodeIds.includes(nodeId)).sort((a,b)=>sort==='name'?a.name.localeCompare(b.name,'zh-CN'):(analysisRowAmount(b,table,settings)??-Infinity)-(analysisRowAmount(a,table,settings)??-Infinity)||a.name.localeCompare(b.name,'zh-CN'))
}
export function analysisRowAmount(row:AnalysisRow,table:AnalysisComparison,settings:CurrencySettings){return analysisAmount(row.value,{unit:row.unit??table.unit,currency:row.currency??table.currency},settings)}
export function analysisAmount(value:number|null,table:Pick<AnalysisComparison,'unit'|'currency'>,settings:CurrencySettings){
  if(!table.currency)return value
  const perPerson=table.unit.match(/^(元|美元|万元人民币)\/(人|年末员工)$/)
  if(perPerson)return convertMoney(value,perPerson[1]==='万元人民币'?'万元':perPerson[1],table.currency,settings,true)
  return convertMoney(value,table.unit,table.currency,settings)
}
export function analysisUnit(table:Pick<AnalysisComparison,'unit'|'currency'>,settings:CurrencySettings){
  if(!table.currency)return table.unit
  const perPerson=table.unit.match(/^(元|美元|万元人民币)\/(人|年末员工)$/)
  if(perPerson)return (settings.mode==='cny-100m'?'元/':'美元/')+perPerson[2]
  return settings.mode==='cny-100m'?'亿元人民币':'百万美元'
}
/** Positive and negative lengths use the same scale; never turn signed components into pie shares. */
export function signedScale(values:number[]){
  const negative=Math.max(0,...values.map(v=>-v)),positive=Math.max(0,...values)
  const span=negative+positive||1
  return {zero:negative/span*100,bar:(value:number)=>({left:(value<0?negative+value:negative)/span*100,width:Math.abs(value)/span*100})}
}
