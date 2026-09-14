import type {IndustryAnalysis} from './schema'

type Collection='comparisons'|'findings'|'coverage'
export type AnalysisAmendment={
  [K in Collection]:{collection:K,id:string,reason:string,replacement:IndustryAnalysis[K][number]}
}[Collection]

/** Preserve old research inputs; apply explicit, attributable corrections to the current view. */
export function applyAnalysisAmendments(data:IndustryAnalysis,amendments:AnalysisAmendment[]){
  const result=structuredClone(data),seen=new Set<string>()
  for(const amendment of amendments){
    const {collection,id,replacement,reason}=amendment
    if(!['comparisons','findings','coverage'].includes(collection)||!reason?.trim())throw new Error('补读修订缺少有效类别或理由：'+id)
    const key=collection+':'+id
    if(seen.has(key))throw new Error('重复修订同一记录：'+id)
    seen.add(key)
    const rows=result[collection],index=rows.findIndex(row=>row.id===id)
    if(index<0)throw new Error('修订目标不存在：'+id)
    if(replacement.id!==id||replacement.country!==rows[index].country)throw new Error('修订改变稳定编号或国家：'+id)
    rows[index]=structuredClone(replacement)
  }
  return result
}
