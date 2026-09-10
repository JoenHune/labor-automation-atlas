/** Content can disappear without changing its text or the page's outer size.
 * Observe semantic and visibility attributes, including root ancestors, while
 * ignoring annotation controls and generated chart hover/animation nodes. */
export function observeContentChanges(root:HTMLElement,onChange:(needsIds:boolean)=>void):MutationObserver {
 const ignored='[data-annotation-ui],[data-zr-dom-id],.echarts-tooltip'
 const observer=new MutationObserver(records=>{
  let changed=false,needsIds=false
  for(const record of records){
   const target=record.target instanceof Element?record.target:record.target.parentElement
   if(!target||target.closest(ignored))continue
   const within=root.contains(target)
   if(!within&&!(record.type==='attributes'&&target.contains(root)))continue
   if(record.type==='childList'&&[...record.addedNodes,...record.removedNodes].every(n=>n instanceof Element&&n.matches(ignored)))continue
   changed=true;needsIds ||= within&&record.type!=='attributes'
  }
  if(changed)onChange(needsIds)
 })
 observer.observe(root.ownerDocument.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class','style','hidden','open','src','alt','data-content-id','data-annotation-points','data-annotation-point-rects']})
 return observer
}
