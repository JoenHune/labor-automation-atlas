import {MacroDatasetSchema,type Research,type Country} from './schema'
import type {ScaleNode} from './industry-scale'
import {moneyInBaseUnits} from './currency'

export function validateMacroStructures(input:unknown){
 const data=MacroDatasetSchema.parse(input)
 const sources=new Map(data.sources.map(s=>[s.id,s]))
 const fail=(ok:unknown,message:string)=>{if(!ok)throw new Error('宏观结构：'+message)}
 fail(sources.size===data.sources.length,'来源重复')
 fail(new Set(data.structures.map(s=>s.id)).size===data.structures.length,'视图编号重复')
 for(const view of data.structures){
  fail(view.currency===(view.country==='cn'?'CNY':'USD'),'币种串国')
  moneyInBaseUnits(1,view.unit)
  const nodes=new Map(view.nodes.map(n=>[n.id,n]))
  fail(nodes.size===view.nodes.length,'节点重复')
  const codes=new Set<string>()
  for(const node of view.nodes){
   fail(node.id.startsWith(view.country+'-'),'节点串国')
   fail(!node.parentId||nodes.has(node.parentId),'父节点缺失')
   const seen=new Set<string>();let cursor:typeof node|undefined=node
   while(cursor){fail(!seen.has(cursor.id),'层级循环');seen.add(cursor.id);cursor=cursor.parentId?nodes.get(cursor.parentId):undefined}
   for(const ref of node.evidence){const s=sources.get(ref.sourceId);fail(s&&(s.country===view.country||s.country==='global'),'来源缺失或串国')}
   fail(new Set(node.memberCodes).size===node.memberCodes.length,'同组产品重复')
   const children=view.nodes.filter(n=>n.parentId===node.id)
   if(children.length){
    fail(node.evidenceKind==='calculation','归并金额未标计算')
    const memberCodes=children.flatMap(c=>c.memberCodes)
    fail(new Set(memberCodes).size===memberCodes.length,'子组重叠')
    fail(memberCodes.length===node.memberCodes.length&&memberCodes.every(c=>node.memberCodes.includes(c)),'父子产品范围不同')
    fail(Math.abs(children.reduce((a,c)=>a+c.value,0)-node.value)<0.000001,'父子金额不相等')
   }else{
    fail(node.evidenceKind==='fact'&&node.memberCodes.length===1,'末级必须为具名原始产品')
    fail(!codes.has(node.memberCodes[0]),'产品多次挂载');codes.add(node.memberCodes[0])
   }
  }
 }
 return data
}

export function macroStructure(research:Research,country:Country,id:string){return research.macroStructures?.structures.find(v=>v.country===country&&v.id===id)}
export function macroScale(research:Research,country:Country,id:string):ScaleNode[]{
 const view=macroStructure(research,country,id);if(!view)return[]
 const nodes=new Map(view.nodes.map(n=>[n.id,{
  ...n,country,year:view.year,unit:view.unit,currency:view.currency,baseValue:moneyInBaseUnits(n.value,view.unit),
  coverage:view.coverage+'；'+(n.evidenceKind==='calculation'?'计算：所列互斥子项之和':'官方原值'),
  revision:view.revision,releaseDate:view.releaseDate,children:[],gap:'',kind:'industry',
 } as ScaleNode]))
 const roots:ScaleNode[]=[]
 for(const node of nodes.values()){if(node.parentId)nodes.get(node.parentId)!.children.push(node);else roots.push(node)}
 const sort=(list:ScaleNode[])=>{list.sort((a,b)=>b.baseValue!-a.baseValue!||a.id.localeCompare(b.id));list.forEach(n=>sort(n.children))}
 sort(roots);return roots
}
