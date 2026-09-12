import type {Country,Research} from './schema'
import {industryScale,scaleIndex,scaleRemainder,type ScaleNode} from './industry-scale'
import {macroScale,macroStructure} from './macro-structure'
import {moneyInBaseUnits} from './currency'

/** The overview denominator is the full economy, never just the selected Top 10. */
export function orbitRoot(research:Research,country:Country,year:number,basis=''):ScaleNode {
 const structure=macroStructure(research,country,basis)
 const children=structure?macroScale(research,country,basis):industryScale(research,country,year)
 const gdp=research.observations.find(o=>o.country===country&&o.industryId===country+'-gdp'&&o.period===String(year)&&o.frequency==='annual'&&o.measure==='value-added'&&o.priceBasis==='current'&&!o.annualized)
 const id=country+'-orbit-'+(structure?.id??'economy'),unit=structure?.unit??gdp?.unit??(country==='cn'?'亿元':'百万美元')
 const value=structure?children.reduce((sum,n)=>sum+(n.value??0),0):gdp?.value??null
 const root:ScaleNode={id,name:structure?'全国产品部门':'全国经济',parentId:null,country,year:structure?.year??year,unit,value,currency:country==='cn'?'CNY':'USD',baseValue:moneyInBaseUnits(value,unit),coverage:structure?.coverage??gdp?.coverage??'',revision:structure?.revision??gdp?.revision??'',releaseDate:structure?.releaseDate??gdp?.releaseDate??null,evidence:structure?children.flatMap(n=>n.evidence):gdp?.evidence??[],children,kind:'industry',gap:value===null?'未取得同年总量':''}
 children.forEach(n=>n.parentId=id)
 if(!structure&&root.baseValue!==null){
  const rest=root.baseValue-children.reduce((n,c)=>n+(c.baseValue??0),0)
  if(rest>0){
   const official=country==='cn'?research.observations.find(o=>o.industryId==='cn-other'&&o.country===country&&o.period===String(year)&&o.frequency==='annual'&&o.measure==='value-added'&&o.priceBasis==='current'&&!o.annualized):undefined
   root.children.push({...root,id:country+'-orbit-other',name:country==='cn'?'其他行业（未拆分）':'其余行业（未展开）',parentId:id,value:official?.value??rest/moneyInBaseUnits(1,unit)!,unit:official?.unit??unit,baseValue:official?moneyInBaseUnits(official.value,official.unit):rest,children:[],kind:'remainder',revision:official?.revision??'计算：GDP 减当前列示行业合计',releaseDate:official?.releaseDate??root.releaseDate,evidence:official?.evidence??[...root.evidence,...children.flatMap(n=>n.evidence)],gap:'保留未展开规模，不推估其细分组成。'})
  }
 }
 return root
}
export function orbitLayer(node:ScaleNode){
 const positive=node.children.filter(c=>c.baseValue!==null&&c.baseValue>0)
 const missing=node.children.filter(c=>c.baseValue===null)
 const remainder=scaleRemainder(node)
 const sectors=[...positive,...(remainder?[remainder]:[])]
 const sum=sectors.reduce((s,n)=>s+n.baseValue!,0)
 return {sectors,missing,nonpositive:node.children.filter(c=>c.baseValue!==null&&c.baseValue<=0),sum,delta:node.baseValue===null?null:sum-node.baseValue}
}
export function canDrill(node:ScaleNode){return node.children.some(c=>c.baseValue!==null&&c.baseValue>0)}
export function orbitPath(index:Map<string,ScaleNode>,id:string){
 const path:ScaleNode[]=[];let node=index.get(id)
 while(node){path.unshift(node);node=node.parentId?index.get(node.parentId):undefined}
 return path
}
export function restoreOrbit(root:ScaleNode,query:URLSearchParams){
 const index=scaleIndex([root]),requested=query.get('filter.orbitFocus')
 // A legacy chart showing several branches maps to its common ancestor, not an arbitrary branch.
 const expanded=(query.get('filter.scaleExpanded')??'').split(',').filter(id=>index.has(id))
 const paths=expanded.map(id=>orbitPath(index,id))
 const common=paths.length?paths[0].filter((n,i)=>paths.every(p=>p[i]?.id===n.id)).at(-1)?.id:root.id
 const candidate=index.get(requested??common??root.id)
 const focus=candidate&&canDrill(candidate)?candidate.id:root.id
 const detail=query.get('filter.orbitDetail')??query.get('filter.scaleDetail')??''
 const selected=index.get(detail)??orbitLayer(index.get(focus)!).sectors.find(n=>n.id===detail)
 // An old side panel may refer to a deeper branch. Restore it beside its actual parent.
 const parent=selected?.parentId?index.get(selected.parentId):undefined
 return {focus:parent&&canDrill(parent)?parent.id:focus,detail:selected&&parent&&canDrill(parent)?selected.id:''}
}
export function orbitShare(node:ScaleNode,total:ScaleNode){
 return node.country===total.country&&node.year===total.year&&node.currency===total.currency&&node.baseValue!==null&&total.baseValue!==null&&total.baseValue>0?node.baseValue/total.baseValue*100:null
}

export interface OrbitSector {node:ScaleNode;start:number;share:number;depth:number;branch:string}
/** All bands use the same angular coordinate system. Children inherit their parent's wedge. */
export function orbitBands(root:ScaleNode,expanded:ReadonlySet<string>):OrbitSector[][]{
 const make=(parent:ScaleNode,start:number,share:number,depth:number,branch=''):OrbitSector[]=>{
  const layer=orbitLayer(parent);let cursor=start
  return layer.sectors.map(node=>{
   const width=layer.sum>0?node.baseValue!/layer.sum*share:0
   const sector={node,start:cursor,share:width,depth,branch:branch||node.id};cursor+=width;return sector
  })
 }
 const bands=[make(root,0,1,0)]
 while(bands.at(-1)!.some(s=>expanded.has(s.node.id)&&canDrill(s.node))){
  bands.push(bands.at(-1)!.flatMap(s=>expanded.has(s.node.id)?make(s.node,s.start,s.share,s.depth+1,s.branch):[]))
 }
 return bands
}
export function restoreOrbitExpanded(root:ScaleNode,query:URLSearchParams,focus:string){
 const index=scaleIndex([root]),ids=new Set<string>()
 const chunks:string[]=[]
 for(let i=0;query.has('filter.orbitExpanded'+(i||''));i++)chunks.push(query.get('filter.orbitExpanded'+(i||''))!)
 const requested=(chunks.length?chunks.join(','):query.get('filter.scaleExpanded')??focus).split(',')
 for(const id of [...requested,focus])for(const node of orbitPath(index,id))if(node.id!==root.id&&canDrill(node))ids.add(node.id)
 return [...ids]
}
/** Keep each view filter within the annotation schema's length limit. */
export function orbitExpansionParams(ids:string[]){
 const chunks:string[]=[];let chunk=''
 for(const id of ids){if(chunk&&chunk.length+id.length+1>300){chunks.push(chunk);chunk=''}chunk+=(chunk?',':'')+id}
 if(chunk)chunks.push(chunk)
 return Object.fromEntries(chunks.map((value,i)=>['filter.orbitExpanded'+(i||''),value]))
}
