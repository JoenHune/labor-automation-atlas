import majorInputs from '../../research/employment/us/major-ranking-inputs.json'
import type {Country,EmploymentDataset,Research} from './schema'
import {employmentView,validateEmployment,type EmploymentView} from './employment'
import {macroScale,macroStructure} from './macro-structure'
import {scaleIndex,type ScaleNode} from './industry-scale'
import {moneyInBaseUnits} from './currency'
import {annualRanking} from './ranking'

export interface EmploymentRanking {
 views:EmploymentView[]
 dataset:EmploymentDataset|undefined
 basis:string
 year:number
 scope:string
 notes:string[]
}

const additional=validateEmployment(majorInputs.dataset as EmploymentDataset)
const overlays=new WeakMap<EmploymentDataset,EmploymentDataset>()
const recordKey=(record:EmploymentDataset['records'][number])=>[record.country,record.basis,record.nodeId,record.year].join('|')

/** Only fills absent records; current canonical research always takes precedence.
 * Keep the original anchors so a later change of value/definition invalidates a pairing. */
function usOverlay(base:EmploymentDataset|undefined):EmploymentDataset|undefined {
 if(!base)return undefined
 const cached=overlays.get(base)
 if(cached)return cached
 const keys=new Set(base.records.map(recordKey))
 const records=additional.records.filter(record=>!keys.has(recordKey(record)))
 const sources=new Map(base.sources.map(source=>[source.id,source]))
 for(const source of additional.sources){
  const current=sources.get(source.id)
  if(current?.sha256&&source.sha256&&current.sha256!==source.sha256)throw new Error('全行业就业来源已变更，需要重新核对补充输入：'+source.id)
  if(!current)sources.set(source.id,source)
 }
 const dataset={...base,sources:[...sources.values()],records:[...base.records,...records]}
 overlays.set(base,dataset)
 return dataset
}

/** The independent page-level ranking has its own complete, non-overlapping universe.
 * It does not inherit the orbit's Top 10, focus, expansion, or remainder nodes. */
export function employmentRanking(research:Research,country:Country,year:number):EmploymentRanking {
 if(country==='cn'){
  const basis='cn-io2023',structure=macroStructure(research,country,basis)
  const nodes=[...scaleIndex(macroScale(research,country,basis)).values()].filter(node=>node.children.length===0)
  return {
   views:nodes.map(node=>employmentView(research.employment,node,basis)),dataset:research.employment,basis,year:structure?.year??2023,
   scope:structure?'全国产品部门 · 全部 211 类':'全国产品结构尚未加载',
   notes:['211个互斥末级产品全部列入，不受左侧入选行业限制；产品活动与职业岗位不是同一分类。',
    '就业为2020年住户行业结构与2023年劳动者报酬分配模型；本榜2023年数值不替代年度行业视图。',
    '按可比口径分组；住房资本服务单列。'],
  }
 }
 // Reuse the annual ranking's checks for parent overlap and incompatible/duplicate observations.
 annualRanking(country,year,research.industries,research.observations)
 const nodes:ScaleNode[]=research.industries.filter(industry=>industry.country===country&&industry.rankingUniverse).map(industry=>{
  const observation=research.observations.find(o=>o.country===country&&o.industryId===industry.id&&o.period===String(year)&&o.frequency==='annual'&&o.measure==='value-added'&&o.priceBasis==='current'&&!o.annualized)
  return {id:industry.id,name:industry.name,country,parentId:null,year,value:observation?.value??null,
   unit:observation?.unit??'百万美元',currency:'USD',baseValue:observation?moneyInBaseUnits(observation.value,observation.unit):null,
   coverage:observation?.coverage??industry.coverage,revision:observation?.revision??'未取得同年现价增加值',
   releaseDate:observation?.releaseDate??null,evidence:observation?.evidence??industry.evidence,children:[],
   gap:observation?.missingReason??(observation?.value==null?'尚无 '+year+' 年现价增加值':''),kind:'industry',original:observation,
  }
 })
 const dataset=usOverlay(research.employment)
 return {views:nodes.map(node=>employmentView(dataset,node,'annual-industry')),dataset,basis:'annual-industry',year,
  scope:'全国行业 · 全部 20 个大类',
  notes:['19个私人行业与政府整体构成20个非重叠大类；不是全部细分行业或职业岗位清单。',
   '雇员岗位不含业主；住房资本服务、政府及其他不可比口径分组。',
   ...(year===2025?['QCEW另有201,162个未分类私营岗位，没有独立增加值，不分配到具名行业。']:[]),
   '未入原Top10的行业就业复用已归档的独立官方行；原值、定位与复算见补充数据下载。'],
 }
}
