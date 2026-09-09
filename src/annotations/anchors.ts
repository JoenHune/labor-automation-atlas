import type { Anchor,Target,Rect,ViewState } from './schema'
export function sameContentView(a:Pick<ViewState,'year'|'focus'|'filters'>,b:Pick<ViewState,'year'|'focus'|'filters'>) {
 const filters=(values:ViewState['filters'])=>Object.entries(values).filter(([,value])=>value!=='').sort(([a],[b])=>a.localeCompare(b))
 return a.year===b.year&&a.focus===b.focus&&JSON.stringify(filters(a.filters))===JSON.stringify(filters(b.filters))
}
export function normalizeText(text:string) { return text.normalize('NFC').replace(/\s+/g,' ').trim() }
export async function fingerprint(text:string) {
 const bytes=new TextEncoder().encode(normalizeText(text))
 return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(x=>x.toString(16).padStart(2,'0')).join('')
}
export function intersect(a:Rect,b:Rect):Rect|null {
 const x=Math.max(a.x,b.x),y=Math.max(a.y,b.y),r=Math.min(a.x+a.width,b.x+b.width),bottom=Math.min(a.y+a.height,b.y+b.height)
 return r>x&&bottom>y?{x,y,width:r-x,height:bottom-y}:null
}
export function relativeRect(selection:Rect,block:Rect) {
 const part=intersect(selection,block)
 if(!part) return null
 return {x:(part.x-block.x)/block.width,y:(part.y-block.y)/block.height,width:part.width/block.width,height:part.height/block.height}
}
export function absoluteRect(relative:Rect,block:Rect):Rect {
 return {x:block.x+relative.x*block.width,y:block.y+relative.y*block.height,width:relative.width*block.width,height:relative.height*block.height}
}
export interface ContentBlock {id:string;fingerprint:string;rect:Rect;text:string;dataPoints?:{key:string,period:string,value:number|null,rect:Rect}[]}
export function quoteMatches(text:string,quote:{exact:string,prefix:string,suffix:string}):number[] {
 const source=normalizeText(text),exact=normalizeText(quote.exact),prefix=normalizeText(quote.prefix),suffix=normalizeText(quote.suffix)
 if(!exact)return []
 const matches:number[]=[]
 let pos=source.indexOf(exact)
 while(pos!==-1) {
  const before=source.slice(0,pos).trimEnd(),after=source.slice(pos+exact.length).trimStart()
  if((!prefix||before.endsWith(prefix))&&(!suffix||after.startsWith(suffix)))matches.push(pos)
  pos=source.indexOf(exact,pos+Math.max(1,exact.length))
 }
 return matches
}
export function resolveTargets(anchor:Anchor,blocks:ContentBlock[],scope:{country:string,page:string,year:number|null,focus?:string|null,filters?:ViewState['filters']}) {
 if(anchor.country!==scope.country||anchor.page!==scope.page||!sameContentView(anchor.view,{year:scope.year,focus:scope.focus??null,filters:scope.filters??{}})) return {status:'wrong-view' as const,rects:[],changed:[]}
 const rects:Rect[]=[],changed:string[]=[]
 for(const target of anchor.targets) {
  const block=blocks.find(b=>b.id===target.contentId)
  if(!block||block.fingerprint!==target.fingerprint){changed.push(target.contentId);continue}
  if(target.text && quoteMatches(block.text,target.text).length!==1){changed.push(target.contentId);continue}
  if(target.textSegments?.some(q=>quoteMatches(block.text,q).length!==1)){changed.push(target.contentId);continue}
  if(target.dataPoints.length) {
   const points=target.dataPoints.map(p=>block.dataPoints?.find(b=>b.key===p.key&&b.period===p.period&&b.value===p.value))
   if(points.some(p=>!p)){changed.push(target.contentId);continue}
   rects.push(...points.map(p=>p!.rect))
  }else rects.push(absoluteRect(target.rect,block.rect))
 }
 // Never partly attach a cross-component region to changed content.
 return changed.length?{status:'changed' as const,rects:[],changed}:{status:'resolved' as const,rects,changed}
}
export function clusterMarkers(markers:{id:string,x:number,y:number}[],distance=28) {
 const remaining=[...markers],groups:typeof markers[]=[]
 while(remaining.length) {
  const group=[remaining.shift()!]
  let changed=true
  while(changed) {
   changed=false
   for(let i=remaining.length-1;i>=0;i--) if(group.some(m=>Math.hypot(m.x-remaining[i].x,m.y-remaining[i].y)<=distance)) {
    group.push(...remaining.splice(i,1));changed=true
   }
  }
  groups.push(group)
 }
 return groups.map(items=>({x:items.reduce((s,i)=>s+i.x,0)/items.length,y:items.reduce((s,i)=>s+i.y,0)/items.length,items}))
}
