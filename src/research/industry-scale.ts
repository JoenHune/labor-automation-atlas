import type {Country, Observation, Research} from './schema'
import {annualRanking} from './ranking'
import {moneyInBaseUnits, convertMoney, type CurrencySettings} from './currency'
import {productivityView, type ProductivityDataset, type ProductivityRow} from './productivity'

export interface ScaleNode {
 id:string; name:string; country:Country; parentId:string|null; year:number
 value:number|null; unit:string; currency:'CNY'|'USD'; baseValue:number|null
 coverage:string; revision:string; releaseDate:string|null
 evidence:{sourceId:string;locator:string;excerpt?:string}[]
 children:ScaleNode[]; gap:string; kind:'industry'|'remainder'
 original?:Observation|ProductivityRow
}
export interface ScaleRow {node:ScaleNode;depth:number;expanded:boolean}
export function scaleSources(research:Research,country:Country):Research['sources']{
 return [...new Map([...research.sources,...(research.subindustryProductivity?.sources??[]),...(research.macroStructures?.sources??[])].filter(s=>s.country===country||s.country==='global').map(s=>[s.id,s])).values()]
}
const childAliases:Record<string,string>={'cn-prod-b':'cn-mining','cn-prod-c':'cn-manufacturing','cn-prod-d':'cn-utilities'}
const childKey=(row:ProductivityRow)=>(childAliases[row.id.replace(/-\d{4}$/,'')]??row.id.replace(/-\d{4}$/,''))
const order=(a:ScaleNode,b:ScaleNode)=>(b.baseValue??-Infinity)-(a.baseValue??-Infinity)||a.id.localeCompare(b.id)

/** A year change never silently supplies an older child value. */
export function industryScale(research:Research,country:Country,year:number):ScaleNode[] {
 const ranking=annualRanking(country,year,research.industries,research.observations)
 const dataset=research.subindustryProductivity as ProductivityDataset|undefined
 const currency=country==='cn'?'CNY':'USD',unit=country==='cn'?'亿元':'百万美元'
 const make=(id:string,name:string,parentId:string|null):ScaleNode=>({id,name,country,parentId,year,value:null,unit,currency,baseValue:null,coverage:'',revision:'未取得同年现价增加值',releaseDate:null,evidence:[],children:[],gap:`尚无 ${year} 年现价增加值`,kind:'industry'})
 const roots=[...ranking.top10,...ranking.supplements].map(({industry,observation})=>{
  const root=make(industry.id,industry.name,null)
  if(observation)Object.assign(root,{...observation,id:industry.id,name:industry.name,parentId:null,baseValue:moneyInBaseUnits(observation.value,observation.unit),original:observation,gap:observation.missingReason??''})
  const parent=dataset?.parents.find(p=>p.country===country&&p.parentIndustryId===industry.id)
  if(parent&&dataset){
   const sameYear=productivityView(dataset,country,industry.id,year,'value',year)
   const current=new Map(sameYear.rows.map(r=>[childKey(r.row),r]))
   const names=new Map<string,ProductivityRow>()
   for(const row of [...parent.rows].sort((a,b)=>b.year-a.year))if(!names.has(childKey(row)))names.set(childKey(row),row)
   root.children=[...names].map(([id,template])=>{
    const row=current.get(id),node=make(id,template.name,root.id)
    node.coverage=parent.coverage
    if(row){
     const va=row.row.valueAdded
     Object.assign(node,{value:row.valueGaps.length?null:va.value,unit:va.unit,currency:va.currency,baseValue:row.valueGaps.length?null:row.valueAddedBase,coverage:va.coverage,revision:va.revision,releaseDate:va.releaseDate,evidence:va.evidence,original:row.row,gap:row.valueGaps.length?`尚无可比较的 ${year} 年现价增加值`:''})
    }
    return node
   }).sort(order)
  }
  return root
 })
 // Existing classification inventory supplies names only, never invented values.
 const industrial=roots.find(n=>n.id==='cn-industry')
 if(country==='cn'&&industrial){
  const inventory=research.industries.find(i=>i.id==='cn-industry')?.inventory
  const categories=(inventory?.subsectorCoverage??[]) as {code:string;name:string}[]
  for(const child of industrial.children){
   const range=child.id==='cn-mining'?[6,12]:child.id==='cn-manufacturing'?[13,43]:child.id==='cn-utilities'?[44,46]:null
   if(!range)continue
   child.children=categories.filter(c=>/^\d{2}$/.test(c.code)&&Number(c.code)>=range[0]&&Number(c.code)<=range[1]).map(c=>({
    ...make('cn-gbt2017-'+c.code,c.name,child.id),coverage:'GB/T 4754—2017 分类名称；金额未取得',
    evidence:research.sources.some(s=>s.id==='inventory-cn-core-cn-gb4754-notes-2017')?[{sourceId:'inventory-cn-core-cn-gb4754-notes-2017',locator:`${child.name}对应大类 ${c.code}：${c.name}（仅分类名称）`}]:[],
   }))
  }
 }
 return roots
}

export function scaleIndex(roots:ScaleNode[]):Map<string,ScaleNode>{
 const map=new Map<string,ScaleNode>()
 const visit=(node:ScaleNode)=>{if(map.has(node.id))throw new Error('行业层级编号重复');map.set(node.id,node);node.children.forEach(visit)}
 roots.forEach(visit);return map
}
export function scaleShare(node:ScaleNode,parent:ScaleNode|undefined):number|null{
 if(!parent||node.parentId!==parent.id||node.country!==parent.country||node.year!==parent.year||node.currency!==parent.currency||node.baseValue===null||parent.baseValue===null||parent.baseValue<=0)return null
 return node.baseValue/parent.baseValue*100
}
export function scaleAmount(node:ScaleNode,settings:CurrencySettings):number|null{return convertMoney(node.value,node.unit,node.currency,settings)}
export function scaleRemainder(parent:ScaleNode):ScaleNode|null{
 if(parent.baseValue===null||!parent.children.some(n=>n.baseValue===null))return null
 const known=parent.children.reduce((sum,n)=>sum+(n.baseValue??0),0),remainder=parent.baseValue-known
 if(remainder<=0)return null
 const scale=moneyInBaseUnits(1,parent.unit)!
 return {...parent,id:parent.id+'-unallocated',name:'未分列规模',parentId:parent.id,value:remainder/scale,baseValue:remainder,children:[],kind:'remainder',original:undefined,
  revision:'计算：父行业总量减已列子行业',releaseDate:null,gap:'这部分尚不能分配到具体子行业。',
  evidence:[...parent.evidence,...parent.children.filter(n=>n.baseValue!==null).flatMap(n=>n.evidence)]}
}
export function scaleRows(roots:ScaleNode[],expanded:ReadonlySet<string>):ScaleRow[]{
 const rows:ScaleRow[]=[]
 const visit=(node:ScaleNode,depth:number)=>{
  const open=node.children.length>0&&expanded.has(node.id)
  rows.push({node,depth,expanded:open})
  if(open){node.children.forEach(child=>visit(child,depth+1));const remainder=scaleRemainder(node);if(remainder)rows.push({node:remainder,depth:depth+1,expanded:false})}
 }
 roots.forEach(root=>visit(root,0));return rows
}
export function scaleState(index:Map<string,ScaleNode>,query:URLSearchParams){
 const requested=(query.get('filter.scaleExpanded')??query.get('filter.subindustry')??'').split(',')
 const expanded=new Set<string>()
 const addParents=(node:ScaleNode)=>{if(node.parentId){const parent=index.get(node.parentId);if(parent){expanded.add(parent.id);addParents(parent)}}}
 for(const id of requested){const node=index.get(id);if(node?.children.length){expanded.add(id);addParents(node)}}
 const detail=query.get('filter.scaleDetail')??''
 const selected=index.has(detail)?detail:''
 // An explicit chart state also preserves branches browsed only in the drawer.
 if(selected&&!query.has('filter.scaleExpanded'))addParents(index.get(selected)!)
 return {expanded,selected}
}
