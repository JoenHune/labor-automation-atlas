import {fingerprint,normalizeText,relativeRect,intersect,absoluteRect,quoteMatches,sameContentView} from './anchors'
import {AnchorSchema,type Anchor,type Rect,type Target,type ViewState} from './schema'
import {ownedTargetId,unambiguousTargets,quoteForSpan,assertTextCoverage} from './text-targets'
import {normalizeTextOffsets} from './text-offsets'
export interface LiveBlock {id:string;element:HTMLElement;rect:Rect;fingerprint:string;text:string;kind:Target['kind'];points:Target['dataPoints'];pointRects:(Target['dataPoints'][number]&{rect:Rect})[];space?:boolean;ownedContent?:boolean;virtual?:boolean}
export const rectOf=(r:DOMRect|DOMRectReadOnly):Rect=>({x:r.x,y:r.y,width:r.width,height:r.height})
export function contentRoot(){return document.querySelector<HTMLElement>('.VPContent')??document.querySelector<HTMLElement>('main')!}
export function pageScope(base:string) {
 let page=(decodeURI(location.pathname.slice(base.replace(/\/$/,'').length))||'/').replace(/\.html$/,'').replace(/\/index$/,'/')
 if(page==='/cn'||page==='/us')page+='/'
 const country=page.startsWith('/cn/')?'cn':page.startsWith('/us/')?'us':'shared'
 return {page,country} as {page:string;country:Anchor['country']}
}
export function currentView():ViewState {
 const q=new URLSearchParams(location.search),year=q.get('year')
 return {year:year&&/^\d{4}$/.test(year)?Number(year):null,focus:q.get('focus'),sort:q.get('sort')==='name'?'name':q.get('sort')==='value'?'value':null,filters:Object.fromEntries([...q].filter(([k])=>k.startsWith('filter.')).map(([k,v])=>[k.slice(7),v]))}
}
export async function ensureContentIds() {
 const root=contentRoot();if(!root)return
 const scope=pageScope('/labor-automation-atlas/').country
 for(const el of root.querySelectorAll<HTMLElement>('p,h1,h2,h3,h4,h5,h6,li,tr,img,pre,blockquote')) {
  if(el.closest('[data-annotation-ui]')||el.hasAttribute('data-content-id')||el.parentElement?.closest('[data-content-id]'))continue
  const text=normalizeText(el.textContent??'')||el.getAttribute('src')||el.tagName
  const digest=await fingerprint(scope+':'+el.tagName+':'+text)
  const id=scope+'-content-'+digest.slice(0,24)
  // Identical unnumbered blocks cannot be distinguished safely; leave them
  // covered by surrounding explicit targets until the author assigns IDs.
  if(root.querySelector('[data-content-id="'+id+'"]'))continue
  el.dataset.contentId=id;el.tabIndex=0
 }
}
const ignoredText='script,style,[data-annotation-ui],[data-zr-dom-id],.echarts-tooltip'
function contentText(el:HTMLElement,ownedContent=false) {
 // The semantic payload excludes generated tooltips and annotation controls.
 const clone=el.cloneNode(true) as HTMLElement
 clone.querySelectorAll('[data-annotation-ui],[data-zr-dom-id],.echarts-tooltip').forEach(n=>n.remove())
 if(ownedContent)clone.querySelectorAll('[data-content-id],script,style').forEach(n=>n.remove())
 return normalizeText(clone.textContent??'')
}
export async function liveBlocks(options:{includeAmbiguous?:boolean}={}):Promise<LiveBlock[]> {
 const root=contentRoot();if(!root)return []
 const candidates=Array.from(root.querySelectorAll<HTMLElement>('[data-content-id]')).filter(el=>!el.closest('[data-annotation-ui]'))
 const blocks:LiveBlock[]=[]
 for(const el of candidates) {
  const rect=rectOf(el.getBoundingClientRect())
  if(rect.width<=0||rect.height<=0||getComputedStyle(el).visibility==='hidden')continue
  const ownedContent=Boolean(el.querySelector('[data-content-id]'))
  const text=contentText(el,ownedContent)
  const points=ownedContent?[]:JSON.parse(el.dataset.annotationPoints??'[]') as Target['dataPoints']
  const pointRects=ownedContent?[]:JSON.parse(el.dataset.annotationPointRects??'[]') as LiveBlock['pointRects']
  for(const p of pointRects){p.rect.x+=rect.x;p.rect.y+=rect.y}
  const image=ownedContent?null:el.matches('img')?el as HTMLImageElement:el.querySelector('img')
  const semantic=JSON.stringify({text,points,image:image?.getAttribute('src')??null})
  // Previously valid leaf IDs and their semantic fingerprint are unchanged.
  // A non-leaf owner contributes only its own text, excluding numbered subtrees.
  if(!ownedContent||text)blocks.push({id:ownedContent?await ownedTargetId(el.dataset.contentId!,'text'):el.dataset.contentId!,element:el,rect,fingerprint:await fingerprint(semantic),text,kind:ownedContent?'block':el.matches('tr')?'table-row':el.querySelector('[role="img"]')||el.dataset.annotationPoints?'chart':image?'image':'block',points,pointRects,...(ownedContent?{ownedContent:true,virtual:true}:{})})
  if(ownedContent)for(const img of el.querySelectorAll<HTMLImageElement>('img')) {
   if(img.closest('[data-content-id]')!==el||img.closest('[data-annotation-ui]'))continue
   const imageRect=rectOf(img.getBoundingClientRect());if(imageRect.width<=0||imageRect.height<=0||getComputedStyle(img).visibility==='hidden')continue
   const src=img.getAttribute('src')??'',imageText=contentText(img)
   blocks.push({id:await ownedTargetId(el.dataset.contentId!,'image',JSON.stringify({src,semanticId:img.id||null})),element:img,rect:imageRect,fingerprint:await fingerprint(JSON.stringify({text:imageText,points:[],image:src})),text:imageText,kind:'image',points:[],pointRects:[],virtual:true})
  }
 }
 return options.includeAmbiguous?blocks:unambiguousTargets(blocks)
}
function spaceBlock(blocks:LiveBlock[],selection:Rect):LiveBlock|null {
 blocks=blocks.filter(b=>!b.virtual)
 const root=contentRoot(),bounds=root?.getBoundingClientRect();if(!bounds)return null
 const cx=selection.x+selection.width/2,cy=selection.y+selection.height/2
 const nearest=[...blocks].sort((a,b)=>Math.abs(a.rect.y+a.rect.height/2-cy)-Math.abs(b.rect.y+b.rect.height/2-cy))[0]
 if(!nearest)return null
 const before=blocks.filter(b=>b!==nearest&&b.rect.y+b.rect.height<=nearest.rect.y).sort((a,b)=>b.rect.y+b.rect.height-a.rect.y-a.rect.height)[0]
 const after=blocks.filter(b=>b!==nearest&&b.rect.y>=nearest.rect.y+nearest.rect.height).sort((a,b)=>a.rect.y-b.rect.y)[0]
 const top=before?(before.rect.y+before.rect.height+nearest.rect.y)/2:bounds.y
 const bottom=after?(after.rect.y+nearest.rect.y+nearest.rect.height)/2:bounds.bottom
 return {...nearest,id:'space:'+nearest.id,kind:'whitespace',space:true,text:'',points:[],rect:{x:bounds.x,y:top,width:bounds.width,height:Math.max(1,bottom-top)}}
}
interface TextPart {node:Text;start:number;end:number}
interface TextCell {start:number;end:number;parts:TextPart[]}
function textMap(element:HTMLElement,ownedContent=false) {
 const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT,{acceptNode:node=>node.parentElement?.closest(ignoredText)||(ownedContent&&node.parentElement?.closest('[data-content-id]')!==element)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT})
 let raw='',node:Node|null;const original:{node:Text;offset:number}[]=[]
 while((node=walker.nextNode())) {
  const value=node.textContent??''
  raw+=value
  for(let i=0;i<value.length;i++)original.push({node:node as Text,offset:i})
 }
 const {text,spans}=normalizeTextOffsets(raw),cells=new Map<string,TextCell>()
 const positions=spans.map(span=>{
  const key=span.start+':'+span.end,existing=cells.get(key);if(existing)return existing
  const parts:TextPart[]=[]
  for(let i=span.start;i<span.end;i++) {
   const p=original[i],last=parts.at(-1)
   if(last?.node===p.node&&last.end===p.offset)last.end=p.offset+1
   else parts.push({node:p.node,start:p.offset,end:p.offset+1})
  }
  const cell={...span,parts};cells.set(key,cell);return cell
 })
 return {text,positions}
}
function cellRects(cells:TextCell[]):Rect[] {
 // Separate text-node ranges cannot accidentally include excluded descendants.
 const parts:TextPart[]=[]
 for(const cell of new Set(cells))for(const p of cell.parts) {
  const last=parts.at(-1)
  if(last?.node===p.node&&p.start<=last.end)last.end=Math.max(last.end,p.end)
  else parts.push({...p})
 }
 return parts.flatMap(p=>{
  const range=document.createRange();range.setStart(p.node,p.start);range.setEnd(p.node,p.end)
  return Array.from(range.getClientRects()).filter(r=>r.width>0&&r.height>0).map(rectOf)
 })
}
export function locateQuote(el:HTMLElement,quote:NonNullable<Target['text']>,ownedContent=false):Rect[]|null {
 const map=textMap(el,ownedContent),matches=quoteMatches(map.text,quote)
 if(matches.length!==1)return null
 const from=matches[0],to=from+normalizeText(quote.exact).length,start=map.positions[from],end=map.positions[to-1]
 if(!start||!end)return null
 if((map.positions[from-1]?.end??0)>start.start||(map.positions[to]?.start??Infinity)<end.end)return null
 const rects=cellRects(map.positions.slice(from,to));return rects.length?rects:null
}
function rectangleText(el:HTMLElement,selection:Rect,ownedContent=false):NonNullable<Target['text']>[] {
 const map=textMap(el,ownedContent),segments:NonNullable<Target['text']>[]=[],hits=new Map<TextCell,boolean>()
 let start=-1,last=-1
 const finish=()=>{
  if(start<0)return
  const exact=normalizeText(map.text.slice(start,last+1))
  if(exact) {
   const quote=quoteForSpan(map.text,start,last+1)
   if(!quote)throw new Error('选区中的重复文字无法唯一定位，请调整选区后重试；草稿正文会保留。')
   segments.push(quote)
  }
  start=-1;last=-1
 }
 for(let i=0;i<map.positions.length;i++) {
  const p=map.positions[i]
  if(!hits.has(p))hits.set(p,cellRects([p]).some(box=>Boolean(intersect(box,selection))))
  const hit=hits.get(p)
  if(hit){if(start<0)start=i;last=i}else finish()
 }
 finish();return segments
}
function selectedTextNodes(range:Range):Map<Text,{start:number;end:number}> {
 const selected=new Map<Text,{start:number;end:number}>(),ancestor=range.commonAncestorContainer
 const nodes:Node[]=[]
 if(ancestor.nodeType===Node.TEXT_NODE)nodes.push(ancestor)
 else {const walker=document.createTreeWalker(ancestor,NodeFilter.SHOW_TEXT);let node:Node|null;while((node=walker.nextNode()))nodes.push(node)}
 for(const node of nodes) {
  if(node.parentElement?.closest(ignoredText)||!range.intersectsNode(node))continue
  const start=node===range.startContainer?range.startOffset:0,end=node===range.endContainer?range.endOffset:(node.textContent??'').length
  if(end>start)selected.set(node as Text,{start,end})
 }
 return selected
}
export async function createAnchor(selection:Rect,scope:{country:Anchor['country'];page:string},version:string,textSelection:Range|null=null):Promise<Anchor> {
 await ensureContentIds()
 const allBlocks=await liveBlocks({includeAmbiguous:true}),blocks=unambiguousTargets(allBlocks),targets:Target[]=[]
 // An ambiguous visible image or text fragment is content, not empty space.
 // Refuse partial rectangle capture even when other targets can be mapped.
 if(!textSelection) {
  const accepted=new Set(blocks)
  for(const b of allBlocks)if(!accepted.has(b)&&intersect(selection,b.rect)) {
   if(['image','chart'].includes(b.kind)||rectangleText(b.element,selection,b.ownedContent).length)throw new Error('选区中的图片或文字存在重复编号，无法唯一定位；请调整选区后重试，草稿正文会保留。')
  }
 }
 const selected=textSelection?selectedTextNodes(textSelection):null,owners:Text[][]=[]
 for(const b of blocks) {
  const relative=relativeRect(selection,b.rect);if(!relative)continue
  let quote:Target['text']=null
  if(textSelection) {
   if(!textSelection.intersectsNode(b.element))continue
   const map=textMap(b.element,b.ownedContent),indices:number[]=[],covered=new Set<Text>()
   for(const [i,p] of map.positions.entries()) {
    if(/\s/.test(map.text[i]))continue
    const overlaps=p.parts.some(part=>{const s=selected!.get(part.node);return s&&part.end>s.start&&part.start<s.end})
    if(!overlaps)continue
    if(!p.parts.every(part=>{const s=selected!.get(part.node);return s&&s.start<=part.start&&s.end>=part.end}))throw new Error('请完整选择字符或表情后重试；草稿正文会保留。')
    indices.push(i)
    for(const part of p.parts)if(normalizeText(part.node.data.slice(selected!.get(part.node)!.start,selected!.get(part.node)!.end)))covered.add(part.node)
   }
   if(!indices.length)continue
   quote=quoteForSpan(map.text,indices[0],indices[indices.length-1]+1)
   if(!quote||!b.text.includes(quote.exact))continue
   owners.push([...covered])
  }
  const textSegments=!quote&&['block','table-row'].includes(b.kind)?rectangleText(b.element,selection,b.ownedContent):[]
  if(b.ownedContent&&!quote&&!textSegments.length)continue
  targets.push({contentId:b.id,kind:quote?'text':b.kind,fingerprint:b.fingerprint,text:quote,textSegments,rect:relative,dataPoints:b.pointRects.filter(p=>intersect(p.rect,selection)).map(({rect,...p})=>p)})
 }
 // A partially mapped text range is also unsafe; never substitute whitespace.
 if(selected)assertTextCoverage([...selected].filter(([node,part])=>normalizeText(node.data.slice(part.start,part.end))).map(([node])=>node),owners)
 if(!targets.length) {
  const space=spaceBlock(blocks,selection),relative=space&&relativeRect(selection,space.rect)
  if(space&&relative)targets.push({contentId:space.id,kind:'whitespace',fingerprint:space.fingerprint,text:null,rect:relative,dataPoints:[]})
 }
 if(!targets.length)throw new Error('请在网站内容范围内选择区域')
 return AnchorSchema.parse({schema:1,id:crypto.randomUUID(),...scope,researchVersion:version,targets,view:currentView(),selectedText:textSelection?normalizeText(textSelection.toString()):targets.map(t=>t.text?.exact??t.textSegments?.map(s=>s.exact).join('\n')??'').filter(Boolean).join('\n'),snapshotId:crypto.randomUUID(),capturedAt:new Date().toISOString()})
}
export async function resolveAnchor(anchor:Anchor,scope:{country:string;page:string},blocks?:LiveBlock[]) {
 const view=currentView()
 if(anchor.country!==scope.country||anchor.page!==scope.page||!sameContentView(anchor.view,view))return {status:'wrong-view' as const,rects:[] as Rect[]}
 const current=blocks??await liveBlocks(),rects:Rect[]=[]
 for(const target of anchor.targets) {
  let b=current.find(b=>b.id===target.contentId)
  if(target.kind==='whitespace') {
   const original=current.find(b=>'space:'+b.id===target.contentId)
   if(original)b=spaceBlock(current,original.rect)??undefined
   if(b&&b.id!==target.contentId)b=undefined
  }
  if(!b||b.fingerprint!==target.fingerprint)return {status:'changed' as const,rects:[] as Rect[]}
  if(target.dataPoints.some(p=>!b!.points.some(x=>x.key===p.key&&x.period===p.period&&x.value===p.value)))return {status:'changed' as const,rects:[] as Rect[]}
  if(target.text) {
   const ranges=locateQuote(b.element,target.text,b.ownedContent)
   if(!ranges?.length)return {status:'changed' as const,rects:[] as Rect[]}
   rects.push(...ranges)
  }else if(target.textSegments?.length) {
   for(const segment of target.textSegments) {
    const ranges=locateQuote(b.element,segment,b.ownedContent)
    if(!ranges?.length)return {status:'changed' as const,rects:[] as Rect[]}
    rects.push(...ranges)
   }
  }else if(target.dataPoints.length) {
   const found=target.dataPoints.map(p=>b!.pointRects.find(x=>x.key===p.key&&x.period===p.period&&x.value===p.value))
   if(found.some(p=>!p))return {status:'changed' as const,rects:[] as Rect[]}
   rects.push(...found.map(p=>p!.rect))
  }else rects.push(absoluteRect(target.rect,b.rect))
 }
 return {status:'resolved' as const,rects}
}
export async function snapshotRegion(selection:Rect,masks:Rect[]=[]) {
 if(selection.width<1||selection.height<1||selection.width>4096||selection.height>4096||selection.width*selection.height>8000000)throw new Error('选区过大，请缩小后重试')
 const root=contentRoot(),box=root.getBoundingClientRect()
 const {toCanvas}=await import('html-to-image')
 const canvas=await toCanvas(root,{
  width:Math.ceil(selection.width),height:Math.ceil(selection.height),canvasWidth:Math.ceil(selection.width),canvasHeight:Math.ceil(selection.height),pixelRatio:1,backgroundColor:'#ffffff',fontEmbedCSS:'',
  style:{width:box.width+'px',height:box.height+'px',transform:'translate('+(box.x-selection.x)+'px,'+(box.y-selection.y)+'px)',transformOrigin:'top left',margin:'0'},
  filter:node=>!(node instanceof Element&&node.matches('[data-annotation-ui],iframe,video,audio,script,input,textarea')),
 })
 if(masks.length) {
  const masked=document.createElement('canvas');masked.width=canvas.width;masked.height=canvas.height
  const ctx=masked.getContext('2d')!;ctx.fillStyle='#fff';ctx.fillRect(0,0,masked.width,masked.height)
  for(const m of masks) {
   const part=intersect(m,selection);if(!part)continue
   const x=part.x-selection.x,y=part.y-selection.y
   ctx.drawImage(canvas,x,y,part.width,part.height,x,y,part.width,part.height)
  }
  return new Promise<Blob>((resolve,reject)=>masked.toBlob(b=>b?resolve(b):reject(new Error('快照生成失败')),'image/png'))
 }
 return new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('快照生成失败')),'image/png'))
}
