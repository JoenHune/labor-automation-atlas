import { readFile,writeFile,mkdir } from 'node:fs/promises'
import { validateResearch } from '../src/research/validate'
import { annualRanking } from '../src/research/ranking'
import type { Research,Observation,Industry } from '../src/research/schema'
type Raw=Record<string,any>
const read=async(path:string)=>JSON.parse(await readFile(new URL('../'+path,import.meta.url),'utf8')) as Raw
const cn=await read('research/cn/macro.json'), us=await read('research/us/macro.json')
const existing=await read('data/research.json')
const data:Research={
 version:'2026-09-09.working',checkedAt:'2026-09-09',publishedAt:null,freezeStatus:'working',
 countries:[],sources:[],industries:[],observations:[],scenarios:existing.scenarios??[],tasks:existing.tasks??[],claims:existing.claims??[],searches:existing.searches??[],
}
const locator=(v:unknown):string=> typeof v==='string'?v:Object.entries(v as Record<string,unknown>).map(([k,value])=>k+': '+value).join(' · ')
const refs=(items:Raw[]|Raw)=>(Array.isArray(items)?items:[items]).map(e=>({sourceId:e.sourceId,locator:locator(e.locator),...(e.verbatimValue?{excerpt:String(e.verbatimValue)}:{})}))
for(const s of cn.sources) data.sources.push({
 id:s.id,title:s.title,publisher:s.publisher,url:s.url,published:s.publishedAt,retrieved:s.retrievedAt,country:'cn',kind:'official-statistics',
 archive:s.archivedPath,sha256:s.sha256,limitations:[s.publicationDateNote,s.revisionStatus].filter(Boolean),
})
for(const s of us.sources) data.sources.push({
 id:s.id,title:s.title,publisher:s.publisher,url:s.url,published:s.releaseDate??null,retrieved:s.retrievedDate,country:'us',kind:'official-statistics',
 archive:s.localFile,sha256:s.sha256,limitations:[s.dataRole].filter(Boolean),
})
data.sources.push(...(existing.sources??[]).filter((s:Raw)=>!data.sources.some(x=>x.id===s.id)))
for(const i of cn.industries) data.industries.push({
 id:i.id,country:'cn',code:i.classificationCode,name:i.name,classification:cn.selection.classification,sectors:i.sectors,parentId:null,
 rankingUniverse:true,unallocated:false,selected:true,selectionReason:'top10',coverage:i.scopeNote??cn.coverage,
 evidence:[{sourceId:cn.selection.sourceId,locator:'表1 · '+i.name+' · 全年现价绝对额；核算说明2.1分类体系'}],
})
const extraNames=new Map<string,string>(cn.observations.map((o:Raw)=>[o.industryId,o.industryName]))
for(const [id,name] of extraNames) {
 if(data.industries.some(i=>i.id===id)) continue
 const other=id==='cn-other'
 data.industries.push({
  id,country:'cn',code:id,name,classification:cn.selection.classification,
  sectors:id==='cn-primary'?['primary']:id==='cn-secondary'||id==='cn-manufacturing'?['secondary']:id==='cn-gdp'?['primary','secondary','tertiary']:['tertiary'],
  parentId:id==='cn-manufacturing'?'cn-industry':null,rankingUniverse:false,unallocated:other,selected:false,selectionReason:other?'unallocated':'not-selected',
  coverage:other?cn.otherIndustry.scopeNote:cn.coverage,evidence:[{sourceId:cn.selection.sourceId,locator:'表1 · '+name}],
 })
}
for(const o of cn.observations) {
 const base:Observation={
  id:o.id.toLowerCase(),country:'cn',industryId:o.industryId,period:o.period,frequency:o.frequency==='quarterly'?'quarter':o.frequency,measure:'value-added',priceBasis:'current',
  value:o.value,unit:o.unit,currency:'CNY',annualized:false,seasonalAdjustment:'unadjusted',releaseDate:o.publishedAt,
  publicationDateNote:o.publicationDateNote??undefined,revision:o.revisionStatus,coverage:o.coverage,evidence:refs(o.evidence),
  evidenceKind:o.evidenceType==='calculation'?'calculation':'fact',
  ...(o.calculation?{computation:{expression:o.calculation.formula,inputs:o.calculation.operands,note:o.calculation.note}}:{}),
 }
 data.observations.push(base)
 if(o.realGrowthPct!=null) data.observations.push({
  ...base,id:o.id.toLowerCase()+'-real-growth',measure:'real-growth',priceBasis:'constant',value:o.realGrowthPct,unit:'%',currency:null,
  label:'不变价同比增长',evidence:refs(o.realGrowthEvidence??o.evidence),evidenceKind:'fact',computation:undefined,
 })
}
cn.monthlyProgress.forEach((o:Raw,index:number)=>data.observations.push({
 id:'cn-progress-'+index,country:'cn',industryId:o.industryId,period:o.period,frequency:o.period.includes('/')?'year-to-date':'month',
 measure:o.priceBasis==='production_index'?'production-index':'real-growth',priceBasis:o.priceBasis==='production_index'?'not-applicable':'constant',
 value:o.value,unit:o.unit,currency:null,annualized:false,seasonalAdjustment:'unadjusted',releaseDate:o.publishedAt,
 revision:o.revisionStatus,coverage:o.scopeNote+'；'+o.label,evidence:[{sourceId:o.sourceId,locator:o.locator}],
 evidenceKind:'fact',label:o.label,
}))
const selectedUS=new Set<string>([...us.selection.top10,...us.selection.supplements.map((s:Raw)=>s.industryId)])
function usObservation(industryId:string,o:Raw,measure:'value-added'|'real-growth'):Observation {
 return {
  id:industryId+'-'+o.period.toLowerCase()+'-'+measure,country:'us',industryId,period:o.period,frequency:o.frequency==='quarterly'?'quarter':'annual',
  measure,priceBasis:measure==='value-added'?'current':'constant',value:o.value,unit:measure==='value-added'?'百万美元':'%',
  currency:measure==='value-added'?'USD':null,annualized:o.annualRate,seasonalAdjustment:o.seasonalAdjustment==='seasonally adjusted'?'adjusted':'not-applicable',
  releaseDate:o.releaseDate,revision:'截至 '+o.vintage+' 最新可获取修订版；BEA后续可修订',coverage:industryId==='us-gdp'?'美国全国国内生产总值':'美国境内生产；BEA行业核算口径',
  evidence:[{sourceId:o.sourceId,locator:locator(o.sourceLocator)}],evidenceKind:'fact',
  label:measure==='real-growth'?'实际增加值环比折年增速':o.annualRate?'现价增加值（季调年率）':'年度现价增加值',
 }
}
for(const i of us.industries) {
 data.industries.push({
  id:i.id,country:'us',code:i.naicsSectorGroup??String(i.beaLine),name:i.name,nameEn:i.nameEn,classification:us.rankingUniverse.id,
  sectors:[i.researchSector],parentId:null,rankingUniverse:true,unallocated:i.id==='us-other-services',selected:selectedUS.has(i.id),
  selectionReason:us.selection.top10.includes(i.id)?'top10':selectedUS.has(i.id)?'sector-supplement':i.id==='us-other-services'?'unallocated':'not-selected',
  coverage:i.id==='us-government'?'BEA政府整体；含联邦、州及地方，不与私人行业重复':i.id==='us-real-estate'?'私人房地产业及租赁；含自有住房虚拟租金服务':i.id==='us-other-services'?'BEA其他服务业（不含政府）官方汇总；本版不进一步拆分':'BEA私人行业；'+i.nameEn,
  evidence:[{sourceId:'us-bea-value-added-2026-06-25',locator:'TVA105-A · BEA行 '+i.beaLine+' · '+i.nameEn}],
 })
 i.annual.forEach((o:Raw)=>data.observations.push(usObservation(i.id,o,'value-added')))
 data.observations.push(usObservation(i.id,i.latestQuarter.nominalValueAdded,'value-added'),usObservation(i.id,i.latestQuarter.realGrowthQoqAnnualized,'real-growth'))
}
data.industries.push({
 id:'us-gdp',country:'us',code:'GDP',name:'GDP',classification:us.rankingUniverse.id,sectors:['primary','secondary','tertiary'],parentId:null,
 rankingUniverse:false,unallocated:false,selected:false,selectionReason:'not-selected',coverage:'美国全国国内生产总值',
 evidence:[{sourceId:'us-bea-value-added-2026-06-25',locator:'TVA105-A · BEA行1'}],
})
us.annualGDP.forEach((o:Raw)=>data.observations.push(usObservation('us-gdp',o,'value-added')))
data.observations.push(usObservation('us-gdp',us.latestQuarter.nominalGDP,'value-added'),usObservation('us-gdp',us.latestQuarter.realGDPGrowthQoqAnnualized,'real-growth'))
data.countries=[
 {country:'cn',name:'中国',latestYear:cn.defaultYear,latestPeriod:cn.latestPeriod.gdp,latestRelease:cn.latestPeriod.publishedAt,
  monthlyPeriod:cn.latestPeriod.monthlyProgress,monthlyRelease:cn.latestPeriod.monthlyPublishedAt,nextIndustryRelease:cn.latestPeriod.nextGdpPlannedRelease,
  rankingLabel:cn.selection.rankingTitle,scope:cn.coverage,caveats:[cn.selection.scopeWarning,cn.selection.parentChildExclusion,'农林牧渔业含专业辅助活动，不等于第一产业；工业含部分第三产业辅助及修理活动。','2021—2023来自2025版年鉴的五经普后修订序列；年鉴未标明具体发布日期。','2024采用2025-12-26最终核实；2025为2026-01-20初步核算。'],
  gaps:cn.gaps.map((g:Raw)=>g.description).filter(Boolean),checkedAt:cn.asOf,publicationRecheck:null,
  evidence:[{sourceId:cn.selection.sourceId,locator:'表1 / 核算说明2.1'},{sourceId:cn.latestPeriod.sourceId,locator:'表1'}]},
 {country:'us',name:'美国',latestYear:us.latestFullYear,latestPeriod:us.latestQuarter.period,latestRelease:us.latestQuarter.releaseDate,
  monthlyPeriod:null,monthlyRelease:null,nextIndustryRelease:us.nextIndustryReleaseDate,
  rankingLabel:'2025年 BEA 20组非重叠行业中的 Top 10',scope:'美国全国；19组私人行业及政府整体，共20组覆盖GDP。',
  caveats:['榜单为本研究按官方现价值计算，BEA不直接发布此Top10。','季度现价值为季调年率；实际增速为环比折年，不与全年规模混排。','房地产业包含自有住房虚拟租金服务；行业增加值不能视为可替代人工市场。','三次产业为本研究映射标签，非BEA官方三次产业分类。','其他服务业保留官方汇总；未入选行业的规模和覆盖缺口单列。'],
  gaps:['2026Q2行业明细尚未发布；预计2026-09-30发布，不能从二季度GDP总量推算。'],checkedAt:us.asOf,publicationRecheck:null,
  evidence:[{sourceId:'us-bea-industry-release-calendar',locator:'Current release / Next release'},{sourceId:'us-bea-value-added-2026-06-25',locator:'TVA105-A · A1/A2/A3/A5及选定20行'}]},
]
const validated=validateResearch(data)
const output=JSON.stringify(validated,null,2)+'\n'
await writeFile(new URL('../data/research.json',import.meta.url),output)
await mkdir(new URL('../docs/public/exports/',import.meta.url),{recursive:true})
await writeFile(new URL('../docs/public/exports/research.json',import.meta.url),output)
for(const c of ['cn','us'] as const) {
 const rank=annualRanking(c,2025,data.industries,data.observations)
 console.log(c,rank.top10.map(x=>x.industry.name+': '+x.observation!.value).join(' / '),'补项',rank.supplements.map(x=>x.industry.name))
}
console.log('Normalized',data.industries.length,'industries,',data.observations.length,'observations,',data.sources.length,'sources.')
