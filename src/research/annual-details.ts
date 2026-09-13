import {AnnualDetailsSchema,type Research} from './schema'
import {moneyInBaseUnits} from './currency'
import type {ScaleNode} from './industry-scale'

export function validateAnnualDetails(input:unknown){
 const data=AnnualDetailsSchema.parse(input),sources=new Map(data.sources.map(s=>[s.id,s]))
 if(sources.size!==data.sources.length)throw new Error('年度细分来源编号重复')
 const gapIds=new Set<string>()
 for(const gap of data.gaps){
  const key=gap.country+'|'+gap.year+'|'+gap.nodeId
  if(gapIds.has(key)||!gap.nodeId.startsWith(gap.country+'-'))throw new Error('年度缺口重复或串国')
  gapIds.add(key)
  for(const ref of gap.evidence)if(sources.get(ref.sourceId)?.country!==gap.country)throw new Error('年度缺口来源缺失或串国')
 }
 const ids=new Set<string>(),branches=new Set<string>()
 for(const branch of data.branches){
  const key=branch.country+'|'+branch.year+'|'+branch.parentId
  if(branches.has(key))throw new Error('年度细分父项重复：'+key)
  branches.add(key)
  if(branch.currency!==(branch.country==='cn'?'CNY':'USD')||branch.unit!==(branch.country==='cn'?'亿元':'百万美元'))throw new Error('年度细分币种或单位错误')
  const nodes=new Map(branch.nodes.map(n=>[n.id,n]))
  if(nodes.has(branch.parentId))throw new Error('年度细分不得重复父行业总值')
  for(const node of branch.nodes){
   const nodeKey=branch.country+'|'+branch.year+'|'+node.id
   if(ids.has(nodeKey))throw new Error('年度细分节点重复：'+nodeKey)
   ids.add(nodeKey)
   if(!node.id.startsWith(branch.country+'-')||!branch.parentId.startsWith(branch.country+'-'))throw new Error('年度细分国家串入')
   if(node.value===null&&!node.gap)throw new Error('年度细分缺失值没有说明')
   if(node.value!==null&&!node.releaseDate)throw new Error('年度细分有值但缺发布日期')
   for(const ref of node.evidence){
    const source=sources.get(ref.sourceId)
    if(!source||source.country!==branch.country)throw new Error('年度细分证据缺失或国家串入')
   }
   const path=new Set([node.id]);let parent=node.parentId
   while(parent!==branch.parentId){
    if(path.has(parent))throw new Error('年度细分循环归属')
    path.add(parent)
    const ancestor=nodes.get(parent)
    if(!ancestor)throw new Error('年度细分父节点缺失：'+parent)
    parent=ancestor.parentId
   }
  }
  // Published whole-unit rounding is retained. A larger mismatch cannot silently
  // become a misleading ring; check every disjoint sibling set, including roots.
  for(const parent of [{id:branch.parentId,value:branch.parentValue},...branch.nodes]){
   const children=branch.nodes.filter(n=>n.parentId===parent.id)
   if(!children.length||parent.value===null)continue
   const known=children.reduce((sum,n)=>sum+(n.value??0),0)
   const tolerance=(children.length+1)/2+1e-6
   if(children.every(n=>n.value!==null)?Math.abs(known-parent.value)>tolerance:known-parent.value>tolerance)throw new Error('年度细分子项与父项不能核对：'+parent.id)
  }
 }
 return data
}

/** Replace only the explicitly supplied country/year branch. Never fall back. */
export function applyAnnualDetails(roots:ScaleNode[],research:Research,country:'cn'|'us',year:number){
 for(const branch of research.annualDetails?.branches??[]){
  if(branch.country!==country||branch.year!==year)continue
  const root=roots.find(n=>n.id===branch.parentId)
  if(!root)continue // A historical ranking may not select this branch.
  if(root.currency!==branch.currency||root.baseValue!==moneyInBaseUnits(branch.parentValue,branch.unit))throw new Error('年度细分父项与当前版本不一致：'+branch.parentId)
  const make=(parentId:string):ScaleNode[]=>branch.nodes.filter(n=>n.parentId===parentId).map(n=>({
   ...n,country,year,unit:branch.unit,currency:branch.currency,kind:'industry' as const,
   baseValue:moneyInBaseUnits(n.value,branch.unit),children:make(n.id),
  })).sort((a,b)=>(b.baseValue??-Infinity)-(a.baseValue??-Infinity)||a.id.localeCompare(b.id))
  root.children=make(root.id)
 }
 const index=new Map<string,ScaleNode>()
 const visit=(node:ScaleNode)=>{index.set(node.id,node);node.children.forEach(visit)}
 roots.forEach(visit)
 for(const gap of research.annualDetails?.gaps??[]){
  if(gap.country!==country||gap.year!==year)continue
  const node=index.get(gap.nodeId)
  if(node&&node.value===null){node.gap=gap.gap;node.evidence=[...node.evidence,...gap.evidence]}
 }
 return roots
}
