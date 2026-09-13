import {readFile,writeFile} from 'node:fs/promises'
import {readResearch,writeResearch} from '../src/research/storage'
import {validateAnnualDetails} from '../src/research/annual-details'

const root=new URL('../',import.meta.url)
const candidate=JSON.parse(await readFile(new URL('research/annual-2024-2025/us/us-annual-va-candidate.json',root),'utf8'))
const sourceRoot='research/annual-2024-2025/us/'
const sources=candidate.sources.map((s:any)=>({
 id:s.id,title:s.title,publisher:s.publisher,url:s.url,published:s.releaseDate,retrieved:s.checkedAt,
 country:s.country,kind:s.kind,archive:sourceRoot+s.file,sha256:s.sha256,
 limitations:[...(s.qualityNote?[s.qualityNote]:[]),'年度现价增加值；保留官方原值及舍入差异。'],
}))
sources.push({id:'us-bea-tariffs-faq-2025-03-04',title:'How are tariffs reflected in BEA’s National Economic Accounts?',publisher:'U.S. Bureau of Economic Analysis',url:'https://www.bea.gov/help/faq/1476',published:'2025-03-04',retrieved:'2026-09-14',country:'us',kind:'official-statistics',archive:sourceRoot+'bea-tariffs-faq.html',limitations:['关税收入归政府；行业账户中归入批发业的生产及进口税核算，不是独立经营行业。']})
const nodes=candidate.nodes.filter((n:any)=>!n.optionalGroupingNode)
const branches=[]
for(const year of [2024,2025])for(const parent of nodes.filter((n:any)=>!n.parentId)){
 const get=(id:string)=>candidate.observations.find((o:any)=>o.nodeId===id&&o.year===year)
 branches.push({country:'us',year,parentId:parent.id,parentValue:get(parent.id).value,unit:'百万美元',currency:'USD',classification:parent.classification,
  nodes:nodes.filter((n:any)=>n.parentIndustryId===parent.id&&n.id!==parent.id).map((n:any)=>{
   const o=get(n.id)
   if(o.measure!=='value-added'||o.priceBasis!=='current'||o.frequency!=='annual'||o.annualRate)throw new Error('年度细分指标口径错误')
   const evidence=[{sourceId:o.sourceId,locator:o.evidenceLocator,excerpt:o.sourceExcerpt}]
   if(n.categoryKind==='tax-accounting-component')evidence.push({sourceId:'us-bea-tariffs-faq-2025-03-04',locator:'Within the IEAs，第1项：Components of Value Added by Industry 的 TOPI 与批发业',excerpt:'Customs duties are included in line 135, which presents total TOPI remitted by the wholesale trade industry (net of subsidies received) to governments.'})
   return {id:n.id,parentId:n.displayParentId,name:n.name,nameEn:n.nameEn,code:n.code,value:o.value,
    coverage:[o.coverage,...n.notes].join(' '),releaseDate:o.releaseDate,
    revision:o.value===null?'未发布所选年份的细表观测':`截至 2026-09-14 的最新可用官方表；发布版本 ${o.releaseDate}，可再修订`,
    evidence,qualityNote:o.value!==null&&o.qualityNote?'BEA 提示：这些细分估计的质量明显低于所属上层汇总。':'',gap:o.gap??'',
   }
  }),
 })
}
const data=await readResearch(new URL('data/research.json',root))
sources.push({id:'cn-nbs-annual-industry-checked-2026-09-14',title:'国家数据：年度数据／国民经济核算／分行业增加值',publisher:'国家统计局',url:'https://data.stats.gov.cn/dg/website/page.html#/pc/national/yearData',published:null,retrieved:'2026-09-14',country:'cn',kind:'official-statistics',archive:'research/annual-2024-2025/nbs-annual-industry-dom.json',limitations:['动态表未显示精确发布日期；归档记录实际可见表头和全部行。','该表“其他行业”包含信息软件及租赁商务，不能替换本站十个具名行业以外的“其他行业”。']})
const baseline=JSON.parse(await readFile(new URL('research/annual-2024-2025/baseline.json',root),'utf8'))
const gaps=baseline.rows.filter((n:any)=>n.country==='cn'&&n.depth>0&&n.value===null).map((n:any)=>({country:'cn',year:n.year,nodeId:n.id,
 gap:`已核查国家统计局年度“分行业增加值”表，未分列此细项；目前未取得 ${n.year} 年同口径现价增加值。`,
 evidence:[{sourceId:'cn-nbs-annual-industry-checked-2026-09-14',locator:`年度数据 → 国民经济核算 → 分行业增加值；${n.year} 年列及全部10行（GDP和9个行业汇总），未分列“${n.name}”；2026-09-14 实读归档。`}],
}))
data.annualDetails=validateAnnualDetails({version:data.version,checkedAt:'2026-09-14',sources,branches,gaps})
for(const country of data.countries){
 country.checkedAt='2026-09-14'
 country.publicationRecheck='2026-09-14'
 if(country.country==='cn')country.gaps=country.gaps.map(g=>g.includes('HTTP403')?'2026-09-14 已读取新版国家数据年度库；其分行业增加值表只列GDP与9个行业汇总，未提供当前缺少的工业和服务业细项。主榜保留2024最终核实、2025初步核算公报的成套精度；数据库更高精度另有归档。':g)
}
await writeFile(new URL('research/annual-2024-2025/annual-details.json',root),JSON.stringify(data.annualDetails,null,2)+'\n')
await writeResearch(new URL('data/research.json',root),data)
console.log('Integrated annual details:',branches.length,'branches')
