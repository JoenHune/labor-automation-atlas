import {fingerprint,normalizeText,relativeRect,intersect,absoluteRect,quoteMatches,sameContentView} from './anchors'
import {AnchorSchema,type Anchor,type Rect,type Target,type ViewState} from './schema'
export interface LiveBlock {id:string;element:HTMLElement;rect:Rect;fingerprint:string;text:string;kind:Target['kind'];points:Target['dataPoints'];pointRects:(Target['dataPoints'][number]&{rect:Rect})[];space?:boolean}
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
function contentText(el:HTMLElement) {
 // The semantic payload excludes generated tooltips and annotation controls.
 const clone=el.cloneNode(true) as HTMLElement
 clone.querySelectorAll('[data-annotation-ui],[data-zr-dom-id],.echarts-tooltip').forEach(n=>n.remove())
 return normalizeText(clone.textContent??'')
}
export async function liveBlocks():Promise<LiveBlock[]> {
 const root=contentRoot();if(!root)return []
 const candidates=Array.from(root.querySelectorAll<HTMLElement>('[data-content-id]')).filter(el=>!el.closest('[data-annotation-ui]')&&!el.querySelector('[data-content-id]'))
 const blocks:LiveBlock[]=[]
 for(const el of candidates) {
  const rect=rectOf(el.getBoundingClientRect())
  if(rect.width<=0||rect.height<=0||getComputedStyle(el).visibility==='hidden')continue
  const text=contentText(el)
  const points=JSON.parse(el.dataset.annotationPoints??'[]') as Target['dataPoints']
  const pointRects=JSON.parse(el.dataset.annotationPointRects??'[]') as LiveBlock['pointRects']
  for(const p of pointRects){p.rect.x+=rect.x;p.rect.y+=rect.y}
  const image=el.matches('img')?el as HTMLImageElement:el.querySelector('img')
  const semantic=JSON.stringify({text,points,image:image?.getAttribute('src')??null})
  blocks.push({id:el.dataset.contentId!,element:el,rect,fingerprint:await fingerprint(semantic),text,kind:el.matches('tr')?'table-row':el.querySelector('[role="img"]')||el.dataset.annotationPoints?'chart':image?'image':'block',points,pointRects})
 }
 return blocks
}
function spaceBlock(blocks:LiveBlock[],selection:Rect):LiveBlock|null {
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
function textMap(element:HTMLElement) {
 const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT,{acceptNode:node=>node.parentElement?.closest('script,style,[data-annotation-ui]')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT})
 let text='',node:Node|null;const positions:{node:Text;offset:number}[]=[]
 while((node=walker.nextNode())) {
  const value=node.textContent??''
  for(let i=0;i<value.length;i++) {
   const char=value[i]
   if(/\s/.test(char)) {
    if(text&&!text.endsWith(' ')){text+=' ';positions.push({node:node as Text,offset:i})}
   }else{text+=char;positions.push({node:node as Text,offset:i})}
  }
 }
 while(text.endsWith(' ')){text=text.slice(0,-1);positions.pop()}
 return {text,positions}
}
export function locateQuote(el:HTMLElement,quote:NonNullable<Target['text']>):Rect[]|null {
 const map=textMap(el),matches=quoteMatches(map.text,quote)
 if(matches.length!==1)return null
 const start=map.positions[matches[0]],end=map.positions[matches[0]+normalizeText(quote.exact).length-1]
 if(!start||!end)return null
 const range=document.createRange();range.setStart(start.node,start.offset);range.setEnd(end.node,end.offset+1)
 return Array.from(range.getClientRects()).filter(r=>r.width>0&&r.height>0).map(rectOf)
}
function rectangleText(el:HTMLElement,selection:Rect):NonNullable<Target['text']>[] {
 const map=textMap(el),segments:NonNullable<Target['text']>[]=[],range=document.createRange()
 let start=-1,last=-1
 const finish=()=>{
  if(start<0)return
  const exact=normalizeText(map.text.slice(start,last+1))
  if(exact)segments.push({exact,prefix:map.text.slice(Math.max(0,start-90),start).trimEnd(),suffix:map.text.slice(last+1,last+91).trimStart()})
  start=-1;last=-1
 }
 for(let i=0;i<map.positions.length;i++) {
  const p=map.positions[i];range.setStart(p.node,p.offset);range.setEnd(p.node,p.offset+1)
  const box=range.getBoundingClientRect(),hit=box.width>0&&intersect(rectOf(box),selection)
  if(hit){if(start<0)start=i;last=i}else finish()
 }
 finish();return segments
}
export async function createAnchor(selection:Rect,scope:{country:Anchor['country'];page:string},version:string,textSelection:Range|null=null):Promise<Anchor> {
 const blocks=await liveBlocks(),targets:Target[]=[]
 for(const b of blocks) {
  const relative=relativeRect(selection,b.rect);if(!relative)continue
  let quote:Target['text']=null
  if(textSelection) {
   if(!textSelection.intersectsNode(b.element))continue
   const range=document.createRange();range.selectNodeContents(b.element)
   if(textSelection.compareBoundaryPoints(Range.START_TO_START,range)>0)range.setStart(textSelection.startContainer,textSelection.startOffset)
   if(textSelection.compareBoundaryPoints(Range.END_TO_END,range)<0)range.setEnd(textSelection.endContainer,textSelection.endOffset)
   const exact=normalizeText(range.toString())
   if(!exact||!b.text.includes(exact))continue
   const before=document.createRange(),after=document.createRange()
   before.selectNodeContents(b.element);before.setEnd(range.startContainer,range.startOffset)
   after.selectNodeContents(b.element);after.setStart(range.endContainer,range.endOffset)
   quote={exact,prefix:normalizeText(before.toString()).slice(-90),suffix:normalizeText(after.toString()).slice(0,90)}
  }
  const textSegments=!quote&&['block','table-row'].includes(b.kind)?rectangleText(b.element,selection):[]
  targets.push({contentId:b.id,kind:quote?'text':b.kind,fingerprint:b.fingerprint,text:quote,textSegments,rect:relative,dataPoints:b.pointRects.filter(p=>intersect(p.rect,selection)).map(({rect,...p})=>p)})
 }
 if(!targets.length) {
  const space=spaceBlock(blocks,selection),relative=space&&relativeRect(selection,space.rect)
  if(space&&relative)targets.push({contentId:space.id,kind:'whitespace',fingerprint:space.fingerprint,text:null,rect:relative,dataPoints:[]})
 }
 if(!targets.length)throw new Error('请在网站内容范围内选择区域')
 return AnchorSchema.parse({schema:1,id:crypto.randomUUID(),...scope,researchVersion:version,targets,view:currentView(),selectedText:targets.map(t=>t.text?.exact??t.textSegments?.map(s=>s.exact).join('\n')??'').filter(Boolean).join('\n'),snapshotId:crypto.randomUUID(),capturedAt:new Date().toISOString()})
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
   const ranges=locateQuote(b.element,target.text)
   if(!ranges?.length)return {status:'changed' as const,rects:[] as Rect[]}
   rects.push(...ranges)
  }else if(target.textSegments?.length) {
   for(const segment of target.textSegments) {
    const ranges=locateQuote(b.element,segment)
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
