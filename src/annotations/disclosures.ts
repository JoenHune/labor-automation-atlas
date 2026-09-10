import {fingerprint,intersect,normalizeText} from './anchors'
import type {Anchor,Rect,ViewState} from './schema'

export type DisclosureState=NonNullable<ViewState['disclosures']>[number]
export interface DisclosureBlock extends DisclosureState {element:HTMLDetailsElement}
const ignored='script,style,[data-annotation-ui],[data-zr-dom-id],.echarts-tooltip'

/** A closed details element still renders its first summary. Its other children
 * can report stale Range rectangles in Chromium, so inspect this explicitly. */
export function closedDisclosures(node:Node):HTMLDetailsElement[] {
 const result:HTMLDetailsElement[]=[]
 let parent=node.parentElement
 while(parent){
  if(parent instanceof HTMLDetailsElement&&!parent.open){
   const summary=Array.from(parent.children).find(el=>el.tagName==='SUMMARY')
   if(!summary?.contains(node))result.push(parent)
  }
  parent=parent.parentElement
 }
 return result
}
export function renderedElement(el:Element):boolean {
 const style=getComputedStyle(el),box=el.getBoundingClientRect()
 return !closedDisclosures(el).length&&style.visibility!=='hidden'&&style.visibility!=='collapse'&&!hiddenByAncestorStyle(el)&&box.width>0&&box.height>0
}
function hiddenByAncestorStyle(element:Element):boolean {
 for(let el:Element|null=element;el;el=el.parentElement){const s=getComputedStyle(el);if(s.display==='none'||s.contentVisibility==='hidden')return true}
 return false
}
export function hiddenTextNode(node:Text):boolean {
 const parent=node.parentElement
 if(!parent||closedDisclosures(node).length)return true
 if(['hidden','collapse'].includes(getComputedStyle(parent).visibility))return true
 return hiddenByAncestorStyle(parent)
}
function semanticPart(el:Element) {
 const clone=el.cloneNode(true) as Element
 clone.querySelectorAll(ignored+',[data-content-id]').forEach(n=>n.remove())
 const images=clone.matches('img')?[clone]:Array.from(clone.querySelectorAll('img'))
 return {tag:el.tagName,text:normalizeText(clone.textContent??''),images:images.map(i=>({src:i.getAttribute('src'),alt:i.getAttribute('alt'),id:i.id})),points:el.getAttribute('data-annotation-points')??null}
}
export async function readDisclosureBlocks(root:HTMLElement,scope:Pick<Anchor,'country'|'page'>):Promise<DisclosureBlock[]> {
 return Promise.all(Array.from(root.querySelectorAll('details')).filter(el=>!el.closest('[data-annotation-ui]')).map(async element=>{
  // Numbered descendants are independent semantic pieces. Sorting table rows
  // must not invalidate a containing disclosure solely by changing row order.
  const children=Array.from(element.querySelectorAll<HTMLElement>('[data-content-id]')).filter(el=>!el.closest('[data-annotation-ui]')).map(el=>({id:el.dataset.contentId,part:semanticPart(el)})).sort((a,b)=>{const x=JSON.stringify(a),y=JSON.stringify(b);return x<y?-1:x>y?1:0})
  const hash=await fingerprint(JSON.stringify({own:semanticPart(element),children}))
  const owner=element.closest<HTMLElement>('[data-content-id]')?.dataset.contentId??null
  const explicit=(element.dataset.contentId??element.id)||null
  const key=await fingerprint(JSON.stringify({country:scope.country,page:scope.page,owner,explicit,semantic:explicit?null:hash}))
  return {id:scope.country+'-disclosure-'+key,fingerprint:hash,open:element.open,element}
 }))
}
/** Match every panel before opening any of them; duplicates never use an index. */
export function disclosurePlan(states:readonly DisclosureState[],blocks:readonly DisclosureBlock[]):DisclosureBlock[]|null {
 if(new Set(states.map(s=>s.id)).size!==states.length)return null
 const matches:DisclosureBlock[]=[]
 for(const state of states){const found=blocks.filter(b=>b.id===state.id);if(found.length!==1||found[0].fingerprint!==state.fingerprint)return null;matches.push(found[0])}
 return matches
}
export async function captureDisclosures(root:HTMLElement,scope:Pick<Anchor,'country'|'page'>,selection:Rect):Promise<DisclosureState[]> {
 const all=await readDisclosureBlocks(root,scope),selected=all.filter(b=>renderedElement(b.element)&&intersect(selection,b.element.getBoundingClientRect()))
 if(!disclosurePlan(selected,all))throw new Error('选区中的折叠面板无法唯一定位，请缩小范围或选择具体内容；草稿正文会保留。')
 return selected.map(({id,fingerprint,open})=>({id,fingerprint,open}))
}
