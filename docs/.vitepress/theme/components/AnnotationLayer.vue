<script setup lang="ts">
import {computed,nextTick,onMounted,onBeforeUnmount,ref,shallowRef,watch} from 'vue'
import {useData,useRoute,useRouter} from 'vitepress'
import research from '../../../../data/site.json'
import type {Annotation,Rect,Anchor,ThreadComment} from '../../../../src/annotations/schema'
import {clusterMarkers,intersect} from '../../../../src/annotations/anchors'
import {contentRoot,currentView,pageScope,ensureContentIds,liveBlocks,createAnchor,resolveAnchor,restoreAnchorDisclosures,snapshotRegion,rectOf} from '../../../../src/annotations/dom'
import {readDisclosureBlocks} from '../../../../src/annotations/disclosures'
import {observeContentChanges} from '../../../../src/annotations/content-observer'
import {api,post,apiOrigin,ApiError,storedSession,beginLogin,finishLogin,shareUrl,saveDraft,draftsForPage,deleteDraft,type Draft,type SiteSession} from '../../../../src/annotations/client'
import {safeMarkdown} from '../../../../src/annotations/markdown'
const {site}=useData(),route=useRoute(),router=useRouter()
const ready=ref(false),mode=ref(false),markersVisible=ref(true),filter=ref<'open'|'closed'|'mine'|'all'>('open')
const session=shallowRef<SiteSession|null>(null),annotations=shallowRef<Annotation[]>([]),draft=shallowRef<Draft|null>(null),savedDrafts=shallowRef<Draft[]>([])
const active=shallowRef<Annotation|null>(null),rect=ref<Rect|null>(null),textPopup=ref<Rect|null>(null),error=ref(''),warning=ref(''),notice=ref(''),busy=ref(false),draftSaved=ref(false)
type Position=Awaited<ReturnType<typeof resolveAnchor>>
const resolved=shallowRef<Record<string,Position>>({}),groupChoices=ref<string[]>([])
const draftPosition=shallowRef<{id:string;status:Position['status']}|null>(null)
const currentDraftPosition=computed(()=>draft.value?.anchor?.id===draftPosition.value?.id?draftPosition.value?.status:null)
const textarea=ref<HTMLTextAreaElement>(),card=ref<HTMLElement>(),viewportWidth=ref(1200),viewportHeight=ref(900)
const draftSnapshotUrl=ref('')
watch(()=>draft.value?.snapshot,blob=>{if(draftSnapshotUrl.value)URL.revokeObjectURL(draftSnapshotUrl.value);draftSnapshotUrl.value=blob?URL.createObjectURL(blob):''})
let range:Range|null=null,observer:MutationObserver|undefined,resizeObserver:ResizeObserver|undefined,poll:number|undefined,debounce:number|undefined,repositionTimer:number|undefined
let drag:{startX:number;startY:number;original:Rect|null;edge:string}|null=null,generation=0,loadingGeneration=0
const scope=computed(()=>{route.path;return ready.value?pageScope(site.value.base):{country:'shared' as const,page:'/'}})
const filtered=computed(()=>annotations.value.filter(a=>filter.value==='all'||filter.value===a.state||filter.value==='mine'&&session.value&&(a.author===session.value.user.login||a.comments.some(c=>c.author===session.value!.user.login))))
const groups=computed(()=>clusterMarkers(filtered.value.flatMap(a=>{
 const r=resolved.value[a.id];return r?.status==='resolved'&&r.rects[0]?[{id:a.id,x:r.rects[0].x+r.rects[0].width-3,y:r.rects[0].y-8}]:[]
})))
const orphaned=computed(()=>filtered.value.filter(a=>resolved.value[a.id]?.status==='changed'))
const hiddenAnnotations=computed(()=>filtered.value.filter(a=>resolved.value[a.id]?.status==='hidden'))
const highlights=computed(()=>active.value?resolved.value[active.value.id]?.rects??[]:[])
const showCard=computed(()=>Boolean(draft.value||active.value||groupChoices.value.length))
const cardStyle=computed(()=>{
 if(viewportWidth.value<=640)return {}
 const position=rect.value??highlights.value[0]??{x:viewportWidth.value-430,y:120,width:0,height:0}
 const preferred=position.x+position.width+16
 return {left:Math.max(12,Math.min(preferred+390<=viewportWidth.value?preferred:position.x-406,viewportWidth.value-406))+'px',top:Math.max(78,Math.min(position.y,viewportHeight.value-260))+'px',maxHeight:Math.max(180,viewportHeight.value-Math.max(78,Math.min(position.y,viewportHeight.value-260))-16)+'px'}
})
const rectStyle=(r:Rect)=>({left:r.x+'px',top:r.y+'px',width:r.width+'px',height:r.height+'px'})
const fmtTime=(t:string)=>new Date(t).toLocaleString('zh-CN',{hour12:false})
const threadComments=computed(()=>{
 const comments=active.value?.comments??[],map=new Map(comments.map(c=>[c.id,c]))
 const root=(c:ThreadComment)=>{
  const seen=new Set<number>();let p=c
  while(p.parentCommentId!==null&&map.has(p.parentCommentId)&&!seen.has(p.id)) {seen.add(p.id);p=map.get(p.parentCommentId)!}
  return p.id
 }
 return comments.filter(c=>c.parentCommentId===null||c.parentDeleted).map(c=>({comment:c,replies:comments.filter(r=>r.id!==c.id&&root(r)===c.id)}))
})
function findComment(id:number|null){return active.value?.comments.find(c=>c.id===id)}
async function persist() {
 const captured=draft.value;if(!captured)return
 clearTimeout(debounce)
 try{await saveDraft(captured);if(draft.value===captured)draftSaved.value=true;savedDrafts.value=await draftsForPage(scope.value.page,scope.value.country)}
 catch{draftSaved.value=false;throw new Error('浏览器未能保存草稿，请复制正文后重试或保持本页打开')}
}
function changeBody(event:Event) {
 if(!draft.value||draft.value.submitted)return
 draft.value={...draft.value,body:(event.target as HTMLTextAreaElement).value};draftSaved.value=false
 clearTimeout(debounce);debounce=window.setTimeout(()=>persist().catch(e=>error.value=e.message),200)
}
function updateDraft(field:'reason'|'state',value:any){if(draft.value&&!draft.value.submitted){draft.value={...draft.value,[field]:value};persist().catch(e=>error.value=e.message)}}
function newDraft(kind:Draft['kind'],annotationId:string|null=null,parentCommentId:number|null=null):Draft {
 return {id:crypto.randomUUID(),...scope.value,kind,body:'',updatedAt:new Date().toISOString(),anchor:null,snapshot:null,annotationId,parentCommentId,state:'closed',reason:null,submitted:false}
}
async function refreshPositions() {
 const token=++generation,capturedScope={...scope.value},capturedAnchor=draft.value?.anchor
 viewportWidth.value=window.innerWidth;viewportHeight.value=window.innerHeight
 const [blocks,panels]=await Promise.all([liveBlocks({includeHidden:true}),readDisclosureBlocks(contentRoot(),capturedScope)]),next:typeof resolved.value={}
 for(const a of annotations.value)next[a.id]=await resolveAnchor(a.anchor,capturedScope,blocks,panels)
 if(token===generation)resolved.value=next
 if(capturedAnchor&&!drag&&!busy.value){
  const position=await resolveAnchor(capturedAnchor,capturedScope,blocks,panels)
  if(token===generation&&draft.value?.anchor===capturedAnchor&&!drag&&!busy.value){rect.value=position.rects.length?selectionBounds(position.rects):null;draftPosition.value={id:capturedAnchor.id,status:position.status}}
 }
}
function selectionBounds(rects:Rect[]):Rect {
 const x=Math.min(...rects.map(r=>r.x)),y=Math.min(...rects.map(r=>r.y))
 return {x,y,width:Math.max(...rects.map(r=>r.x+r.width))-x,height:Math.max(...rects.map(r=>r.y+r.height))-y}
}
async function waitForView() {
 await nextTick()
 await new Promise<void>(resolve=>requestAnimationFrame(()=>resolve()))
 const root=contentRoot()
 if(root.querySelector('[aria-busy="true"]'))await new Promise<void>((resolve,reject)=>{
  const observer=new MutationObserver(check),timer=window.setTimeout(()=>finish(new Error('页面筛选仍在加载，草稿与原快照已保留，请稍后重试')),15000)
  function finish(error?:Error){observer.disconnect();clearTimeout(timer);error?reject(error):resolve()}
  function check(){if(!root.querySelector('[aria-busy="true"]'))finish()}
  observer.observe(root,{subtree:true,attributes:true,childList:true});check()
 })
 if(root.querySelector('[data-view-error="true"]'))throw new Error('原页面筛选暂时无法恢复，草稿与原快照已保留，请加载任务目录后重试')
 await nextTick();await ensureContentIds()
}
function schedulePositions(){clearTimeout(repositionTimer);repositionTimer=window.setTimeout(()=>refreshPositions().catch(()=>{}),80)}
function disclosureToggled(event:Event){if(event.target instanceof HTMLDetailsElement&&!event.target.closest('[data-annotation-ui]'))schedulePositions()}
async function loadPage() {
 const token=++loadingGeneration
 active.value=null;rect.value=null;draft.value=null;mode.value=false;groupChoices.value=[];range=null;textPopup.value=null;annotations.value=[];resolved.value={};warning.value='';error.value=''
 await nextTick();await ensureContentIds()
 savedDrafts.value=await draftsForPage(scope.value.page,scope.value.country).catch(()=>[])
 await reload()
 if(token===loadingGeneration)await openShared()
}
async function reload() {
 const captured={...scope.value}
 try {
  const collected=new Map<string,Annotation>(),seen=new Set<string>();let cursor:string|null=null,pageWarning=''
  do {
   const query=new URLSearchParams(captured);if(cursor)query.set('cursor',cursor)
   const result=await api<{annotations:Annotation[];warning:string|null;nextCursor:string|null}>('/annotations?'+query)
   if(scope.value.page!==captured.page||scope.value.country!==captured.country)return
   for(const a of result.annotations)if(a.page===captured.page&&a.country===captured.country)collected.set(a.id,a)
   if(result.warning)pageWarning=result.warning
   cursor=result.nextCursor??null
   if(cursor&&seen.has(cursor))throw new Error('批注分页未能继续，保留上次完整结果；请稍后刷新')
   if(cursor)seen.add(cursor)
  }while(cursor)
  annotations.value=[...collected.values()];warning.value=pageWarning
 }catch(e){warning.value=e instanceof Error?e.message:'批注状态暂时不可用'}
 await refreshPositions()
}
function selectionChanged() {
 if(mode.value||drag||draft.value)return
 const selection=window.getSelection(),root=contentRoot()
 if(!selection||selection.isCollapsed||!selection.rangeCount||!root){textPopup.value=null;return}
 const candidate=selection.getRangeAt(0)
 if(!root.contains(candidate.startContainer)||!root.contains(candidate.endContainer)||!selection.toString().trim()){textPopup.value=null;return}
 range=candidate.cloneRange();textPopup.value=rectOf(range.getBoundingClientRect())
}
async function captureArea(selection:Rect,selectedRange:Range|null=null,existing:Draft|null=null) {
 if(draft.value&&draft.value!==existing)try{await persist()}catch(e){error.value=(e as Error).message;return}
 busy.value=true;error.value='';mode.value=false;active.value=null;groupChoices.value=[];textPopup.value=null
 const next=existing??newDraft('new');draft.value=next;rect.value=selection
 try {
  const anchor=await createAnchor(selection,scope.value,research.version,selectedRange)
  if(next.anchor)anchor.id=next.anchor.id
  const masks=selectedRange?Array.from(selectedRange.getClientRects()).map(rectOf):[]
  const snapshot=await snapshotRegion(selection,masks)
  draft.value={...next,anchor,snapshot}
  draftPosition.value={id:anchor.id,status:'resolved'}
  await persist();await nextTick();textarea.value?.focus()
 }catch(e){error.value=e instanceof Error?e.message:'选区保存失败；可调整范围重试'}
 finally{busy.value=false;window.getSelection()?.removeAllRanges();range=null}
}
async function captureText(){if(range&&textPopup.value)await captureArea(textPopup.value,range.cloneRange())}
async function toggleMode() {
 if(busy.value)return
 if(draft.value)try{await persist()}catch(e){error.value=(e as Error).message;return}
 draft.value=null;active.value=null;rect.value=null;mode.value=!mode.value;notice.value=''
 if(mode.value&&window.innerWidth<=640) {
  const bounds=contentRoot().getBoundingClientRect(),x=Math.max(20,bounds.x+12),y=Math.max(120,bounds.y+24)
  await captureArea({x,y,width:Math.min(280,window.innerWidth-x-20),height:160})
 }
}
function startDraw(event:PointerEvent,edge='new') {
 if(busy.value||draft.value?.submitted)return
 const root=contentRoot().getBoundingClientRect()
 if(edge==='new'&&!intersect({x:event.clientX,y:event.clientY,width:1,height:1},rectOf(root)))return
 event.preventDefault();event.stopPropagation();(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
 drag={startX:event.clientX,startY:event.clientY,original:rect.value?{...rect.value}:null,edge}
 if(edge==='new')rect.value={x:event.clientX,y:event.clientY,width:1,height:1}
}
function moveDraw(event:PointerEvent) {
 if(!drag)return
 const bounds=contentRoot().getBoundingClientRect(),x=Math.max(bounds.x,Math.min(event.clientX,Math.min(bounds.right,innerWidth))),y=Math.max(Math.max(70,bounds.y),Math.min(event.clientY,Math.min(bounds.bottom,innerHeight)))
 const d=drag,o=d.original,dx=x-d.startX,dy=y-d.startY
 if(d.edge==='new')rect.value={x:Math.min(d.startX,x),y:Math.min(d.startY,y),width:Math.max(1,Math.abs(x-d.startX)),height:Math.max(1,Math.abs(y-d.startY))}
 else if(o&&d.edge==='move')rect.value={...o,x:Math.max(bounds.x,Math.min(o.x+dx,Math.min(bounds.right,innerWidth)-o.width)),y:Math.max(70,Math.min(o.y+dy,innerHeight-o.height))}
 else if(o) {
  let left=o.x,right=o.x+o.width,top=o.y,bottom=o.y+o.height
  if(d.edge.includes('w'))left=Math.min(right-12,x);if(d.edge.includes('e'))right=Math.max(left+12,x)
  if(d.edge.includes('n'))top=Math.min(bottom-12,y);if(d.edge.includes('s'))bottom=Math.max(top+12,y)
  rect.value={x:left,y:top,width:right-left,height:bottom-top}
 }
}
async function endDraw() {
 if(!drag)return;drag=null
 if(rect.value&&rect.value.width>5&&rect.value.height>5)await captureArea({...rect.value},null,draft.value)
}
async function keyboard(event:KeyboardEvent) {
 if(event.key==='Escape') {mode.value=false;textPopup.value=null;if(showCard.value)await closeCard();return}
 const el=(event.target as HTMLElement).closest<HTMLElement>('[data-content-id]')
 if(event.altKey&&event.shiftKey&&event.key.toLowerCase()==='a'&&el&&!el.closest('[data-annotation-ui]')) {
  event.preventDefault();await captureArea(rectOf(el.getBoundingClientRect()))
 }
}
async function closeCard() {
 if(busy.value)return
 if(draft.value)try{await persist()}catch(e){error.value=(e as Error).message;return}
 active.value=null;draft.value=null;rect.value=null;groupChoices.value=[];error.value=''
}
async function openAnnotation(id:string,scroll=false) {
 if(draft.value)try{await persist()}catch(e){error.value=(e as Error).message;return}
 busy.value=true;error.value='';rect.value=null;draft.value=null;groupChoices.value=[]
 try {
  const response=await api<{annotation:Annotation;warning:string|null}>('/annotations/'+id),a=response.annotation
  if(a.country!==scope.value.country||a.page!==scope.value.page){await router.go(shareUrl(a,site.value.base));return}
  const view=currentView()
  if(a.anchor.view.year!==view.year||a.anchor.view.focus!==view.focus||a.anchor.view.sort!==view.sort||JSON.stringify(a.anchor.view.filters)!==JSON.stringify(view.filters)) {
   history.replaceState(null,'',shareUrl(a,site.value.base));window.dispatchEvent(new PopStateEvent('popstate'))
  }
  await waitForView()
  await restoreAnchorDisclosures(a.anchor,scope.value)
  active.value=a;warning.value=response.warning??''
  annotations.value=[...annotations.value.filter(x=>x.id!==a.id),a]
  markersVisible.value=true;filter.value='all'
  await refreshPositions()
  if(scroll) {
   const target=resolved.value[a.id]?.rects[0]
   if(target){window.scrollBy({top:target.y-140,behavior:'instant'});await refreshPositions()}
  }
  history.replaceState(null,'',shareUrl(a,site.value.base));await nextTick();card.value?.focus()
 }catch(e){error.value=(e as Error).message}
 finally{busy.value=false}
}
async function openShared() {
 const id=new URLSearchParams(location.hash.slice(1)).get('annotation')
 if(id&&/^[a-f0-9-]{36}$/.test(id))await openAnnotation(id,true)
}
async function openGroup(ids:string[]){if(ids.length===1)await openAnnotation(ids[0]);else{try{await persist()}catch(e){error.value=(e as Error).message;return}groupChoices.value=ids;active.value=null;draft.value=null;rect.value=null}}
async function reply(parent:number|null) {
 if(!active.value)return
 try{await persist()}catch(e){error.value=(e as Error).message;return}
 draft.value=newDraft('reply',active.value.id,parent);error.value='';await persist();await nextTick();textarea.value?.focus()
}
async function stateChange() {
 if(!active.value)return
 try{await persist()}catch(e){error.value=(e as Error).message;return}
 draft.value={...newDraft('state',active.value.id),state:active.value.state==='open'?'closed':'open'}
 await persist();await nextTick();textarea.value?.focus()
}
async function restoreDraft(saved:Draft) {
 try{await persist()}catch(e){error.value=(e as Error).message;return}
 error.value='';active.value=null;rect.value=null
 if(saved.annotationId)await openAnnotation(saved.annotationId)
 draft.value=saved
 if(saved.anchor) {
  busy.value=true
  try {
  const url=new URL(location.href),v=saved.anchor.view
  if(v.year!==null)url.searchParams.set('year',String(v.year));else url.searchParams.delete('year')
  for(const key of ['focus','sort'] as const){if(v[key])url.searchParams.set(key,v[key]);else url.searchParams.delete(key)}
  for(const key of Array.from(url.searchParams.keys()))if(key.startsWith('filter.'))url.searchParams.delete(key)
  for(const [key,value] of Object.entries(v.filters))url.searchParams.set('filter.'+key,value)
  history.replaceState(null,'',url);window.dispatchEvent(new PopStateEvent('popstate'));await waitForView()
  const result=await restoreAnchorDisclosures(saved.anchor,scope.value)
  draftPosition.value={id:saved.anchor.id,status:result.status}
  rect.value=result.rects.length?selectionBounds(result.rects):null
  if(result.status==='resolved') {
   if(result.rects[0])window.scrollBy({top:result.rects[0].y-140,behavior:'instant'})
   const positioned=await resolveAnchor(saved.anchor,scope.value)
   rect.value=positioned.rects.length?selectionBounds(positioned.rects):null
  }
  }catch(e){error.value=(e as Error).message;rect.value=null}
  finally{busy.value=false}
 }
 draftSaved.value=true;await nextTick();textarea.value?.focus()
}
async function login() {
 try{if(draft.value)await persist();await beginLogin()}catch(e){error.value=(e as Error).message}
}
async function logout() {
 try{await post('/logout',{})}catch{}sessionStorage.removeItem('atlas-session');session.value=null
}
async function submit() {
 const d=draft.value;if(!d||busy.value)return
 if(!d.body.trim()&&!(d.kind==='state'&&d.state==='open')){error.value='请先填写评论或处理说明';return}
 if(d.kind==='state'&&d.state==='closed'&&!d.reason){error.value='关闭前请选择原因并填写说明';return}
 if(d.kind==='new'&&(!d.anchor||!d.snapshot)){error.value='选区快照未完成，请调整选区重试';return}
 busy.value=true;error.value=''
 try {
  await persist()
  session.value=storedSession()
  if(!session.value){await beginLogin();return}
  if(d.kind==='new')await api('/snapshots',{method:'POST',headers:{'Content-Type':'image/png','X-Atlas-Snapshot-Id':d.anchor!.snapshotId!,'X-Atlas-Country':d.country,'X-Atlas-Page':encodeURIComponent(d.page)},body:d.snapshot})
  draft.value={...d,submitted:true};await persist()
  let result:{annotation:Annotation}
  if(d.kind==='new')result=await post('/annotations',{anchor:d.anchor,body:d.body,idempotencyKey:d.id})
  else if(d.kind==='reply')result=await post('/annotations/'+d.annotationId+'/comments',{body:d.body,parentCommentId:d.parentCommentId,idempotencyKey:d.id})
  else result=await post('/annotations/'+d.annotationId+'/state',{state:d.state,reason:d.reason,explanation:d.body,idempotencyKey:d.id})
  await deleteDraft(d.id);draft.value=null;rect.value=null;draftSaved.value=false;savedDrafts.value=await draftsForPage(scope.value.page,scope.value.country)
  active.value=result.annotation;annotations.value=[...annotations.value.filter(a=>a.id!==result.annotation.id),result.annotation];await refreshPositions();notice.value='已保存到GitHub，作者为 '+session.value.user.login
 }catch(e) {
  error.value=(e as Error).message
  if(e instanceof ApiError) {
   if(e.status===401)session.value=null
   if([400,403,404,410,413,415,422,429].includes(e.status)&&draft.value){const old=draft.value.id;draft.value={...draft.value,id:crypto.randomUUID(),submitted:false};await persist().then(()=>deleteDraft(old)).catch(()=>{})}
  }
 }finally{busy.value=false}
}
async function copyShare(){if(active.value)try{await navigator.clipboard.writeText(shareUrl(active.value,site.value.base));notice.value='批注链接已复制'}catch{notice.value='请复制地址栏中的批注链接'}}
function changeToRoot(){if(draft.value&&!draft.value.submitted){draft.value={...draft.value,parentCommentId:null};persist().catch(e=>error.value=e.message)}}
async function exportDraft(){
 const captured=draft.value;if(!captured)return
 const snapshotDataUrl=captured.snapshot?await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=()=>reject(reader.error);reader.readAsDataURL(captured.snapshot!)}):null
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify({...captured,snapshot:undefined,snapshotDataUrl},null,2)],{type:'application/json'}));a.download='annotation-draft-'+captured.id+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)
}
const routeGuard:NonNullable<typeof router.onBeforeRouteChange>=async()=>{
 try{await persist()}catch(e){error.value=(e as Error).message;return false}
}
watch(()=>route.path,()=>{if(ready.value)loadPage()})
onMounted(async()=>{
 router.onBeforeRouteChange=routeGuard
 ready.value=true;session.value=storedSession()
 const returning=new URLSearchParams(location.hash.slice(1)).has('atlas_login');let loginError=''
 try{session.value=await finishLogin()}catch(e){loginError=(e as Error).message}
 document.addEventListener('mouseup',selectionChanged);document.addEventListener('keyup',selectionChanged);document.addEventListener('keydown',keyboard)
 document.addEventListener('toggle',disclosureToggled,true)
 window.addEventListener('scroll',schedulePositions,true);window.addEventListener('resize',schedulePositions);window.addEventListener('atlas:view-change',schedulePositions);window.addEventListener('hashchange',openShared)
 await loadPage()
 if(returning&&savedDrafts.value[0])await restoreDraft(savedDrafts.value[0])
 if(loginError)error.value=loginError
 observer=observeContentChanges(contentRoot(),needsIds=>{if(needsIds)ensureContentIds().then(schedulePositions);else schedulePositions()})
 resizeObserver=new ResizeObserver(schedulePositions);resizeObserver.observe(contentRoot())
 poll=window.setInterval(()=>{if(!document.hidden&&!busy.value)reload()},60000)
})
onBeforeUnmount(()=>{
 if(router.onBeforeRouteChange===routeGuard)router.onBeforeRouteChange=undefined
 document.removeEventListener('mouseup',selectionChanged);document.removeEventListener('keyup',selectionChanged);document.removeEventListener('keydown',keyboard)
 document.removeEventListener('toggle',disclosureToggled,true)
 window.removeEventListener('scroll',schedulePositions,true);window.removeEventListener('resize',schedulePositions);window.removeEventListener('atlas:view-change',schedulePositions);window.removeEventListener('hashchange',openShared)
 observer?.disconnect();resizeObserver?.disconnect();clearInterval(poll);clearTimeout(debounce);clearTimeout(repositionTimer);if(draftSnapshotUrl.value)URL.revokeObjectURL(draftSnapshotUrl.value)
})
</script>
<template>
 <Teleport v-if="ready" to="body">
  <div class="annotation-toolbar" data-annotation-ui role="toolbar" aria-label="内容批注工具">
   <button :class="{selected:mode}" :aria-pressed="mode" @click="toggleMode">{{mode?'退出框选':'框选批注'}}</button>
   <button :aria-pressed="!markersVisible" @click="markersVisible=!markersVisible">{{markersVisible?'隐藏标记':'显示标记'}}</button>
   <select v-model="filter" aria-label="筛选批注"><option value="open">Open</option><option value="closed">Closed</option><option value="mine">本人参与</option><option value="all">全部状态</option></select>
   <details v-if="savedDrafts.length" class="annotation-menu"><summary>草稿 {{savedDrafts.length}}</summary><div><button v-for="d in savedDrafts" :key="d.id" @click="restoreDraft(d)">{{d.body.slice(0,26)||'尚未填写正文'}} · {{fmtTime(d.updatedAt)}}</button></div></details>
   <details v-if="orphaned.length" class="annotation-menu"><summary>原内容已变更 {{orphaned.length}}</summary><div><button v-for="a in orphaned" :key="a.id" @click="openAnnotation(a.id)">{{a.state==='open'?'Open':'Closed'}} · {{a.title}}</button></div></details>
   <details v-if="hiddenAnnotations.length" class="annotation-menu"><summary>内容已折叠或隐藏 {{hiddenAnnotations.length}}</summary><div><button v-for="a in hiddenAnnotations" :key="a.id" @click="openAnnotation(a.id,true)">{{a.state==='open'?'Open':'Closed'}} · {{a.title}}</button></div></details>
   <button v-if="!session" @click="login">GitHub 登录</button><button v-else @click="logout" :title="'退出 '+session.user.login">@{{session.user.login}}</button>
  </div>
  <p v-if="mode" class="annotation-instruction" data-annotation-ui>在内容上拖出矩形，拖动四角调整。Esc 退出；键盘聚焦内容后按 Alt＋Shift＋A。</p>
  <div v-if="mode" class="annotation-draw-plane" data-annotation-ui @pointerdown="startDraw($event)" @pointermove="moveDraw" @pointerup="endDraw" @pointercancel="endDraw"></div>
  <button v-if="textPopup" class="annotation-text-button" data-annotation-ui :style="{left:Math.max(8,Math.min(textPopup.x,viewportWidth-130))+'px',top:Math.max(74,textPopup.y-42)+'px'}" @mousedown.prevent @click="captureText">添加批注</button>
  <div v-if="markersVisible" class="annotation-markers" data-annotation-ui>
   <button v-for="g in groups" :key="g.items.map(i=>i.id).join(',')" class="annotation-marker" :class="{closed:g.items.every(i=>annotations.find(a=>a.id===i.id)?.state==='closed')}" :style="{left:Math.max(0,Math.min(g.x,viewportWidth-72))+'px',top:g.y+'px'}" :aria-label="'展开'+g.items.length+'条区域批注'" @click="openGroup(g.items.map(i=>i.id))">{{g.items.length>1?g.items.length+' · ':''}}{{g.items.every(i=>annotations.find(a=>a.id===i.id)?.state==='closed')?'Closed':'Open'}}</button>
  </div>
  <div v-for="(h,i) in highlights" :key="i" class="annotation-highlight" data-annotation-ui :style="rectStyle(h)"></div>
  <div v-if="rect" class="annotation-selection" data-annotation-ui :style="rectStyle(rect)" @pointerdown="startDraw($event,'move')" @pointermove="moveDraw" @pointerup="endDraw" @pointercancel="endDraw">
   <button v-for="edge in ['nw','ne','sw','se']" :key="edge" :class="['annotation-handle',edge]" :aria-label="'调整选区'+edge" :disabled="busy||draft?.submitted" @pointerdown="startDraw($event,edge)" @pointermove="moveDraw" @pointerup="endDraw"></button>
   <span>选区 · {{Math.round(rect.width)}} × {{Math.round(rect.height)}}</span>
  </div>
  <aside v-if="showCard" ref="card" class="annotation-card" :style="cardStyle" data-annotation-ui role="dialog" aria-modal="false" :aria-label="draft?.kind==='new'?'添加区域批注':'区域批注与回复'" tabindex="-1">
   <div class="annotation-card-header"><strong>{{draft?.kind==='new'?'添加区域批注':active?active.state==='open'?'Open · 区域批注':'Closed · 区域批注':'此处的批注'}}</strong><button aria-label="收起批注，保留草稿" :disabled="busy" @click="closeCard">×</button></div>
   <div v-if="groupChoices.length" class="annotation-group"><button v-for="id in groupChoices" :key="id" @click="openAnnotation(id)">{{annotations.find(a=>a.id===id)?.state==='open'?'Open':'Closed'}} · {{annotations.find(a=>a.id===id)?.title}}</button></div>
   <template v-if="active">
    <div class="annotation-card-actions"><button @click="copyShare">分享选区</button><a :href="active.issueUrl" target="_blank" rel="noopener noreferrer">GitHub #{{active.issueNumber}}</a><button :disabled="busy" @click="openAnnotation(active.id)">刷新</button></div>
    <p class="annotation-timestamp">同步于 {{fmtTime(active.fetchedAt)}}<br>研究版本 {{active.anchor.researchVersion}}</p>
    <p v-if="resolved[active.id]?.status==='changed'" class="annotation-alert">原内容已变更。此批注保留原始快照，不再挂载到当前内容。</p>
    <p v-if="resolved[active.id]?.status==='hidden'" class="annotation-timestamp" role="status">选区内容当前折叠或隐藏，未判定为原文变更。<button :disabled="busy" @click="openAnnotation(active.id,true)">展开并定位</button></p>
    <details v-if="active.anchor.snapshotId" :open="resolved[active.id]?.status==='changed'"><summary>查看原始选区快照</summary><img class="annotation-snapshot" :src="apiOrigin+'/snapshots/'+active.anchor.snapshotId" alt="创建批注时用户选中的网站内容" @error="warning='原始快照暂时无法读取；选区文本与上下文仍保留'"/><blockquote v-if="active.anchor.selectedText">{{active.anchor.selectedText}}</blockquote></details>
    <article class="annotation-comment"><header>@{{active.author}} · {{fmtTime(active.createdAt)}}</header><div class="annotation-markdown" v-html="safeMarkdown(active.body)"></div><button @click="reply(null)">回复首评</button></article>
    <div v-for="group in threadComments" :key="group.comment.id" class="annotation-comment-group">
     <article class="annotation-comment"><header>@{{group.comment.author}} · {{fmtTime(group.comment.createdAt)}}</header><p v-if="group.comment.parentInvalid" class="annotation-parent">原回复关系无法恢复，按主评论展示</p><p v-if="group.comment.parentDeleted" class="annotation-parent">被回复的评论已删除 · #{{group.comment.parentCommentId}}</p><div class="annotation-markdown" v-html="safeMarkdown(group.comment.body)"></div><button @click="reply(group.comment.id)">回复</button></article>
     <article v-for="c in group.replies" :key="c.id" class="annotation-comment annotation-reply"><header>@{{c.author}} · {{fmtTime(c.createdAt)}}</header><p class="annotation-parent">回复 @{{findComment(c.parentCommentId)?.author??'已删除用户'}} · #{{c.parentCommentId}}</p><div class="annotation-markdown" v-html="safeMarkdown(c.body)"></div><button @click="reply(c.id)">回复</button></article>
    </div>
    <details v-if="active.history.length"><summary>处理记录 {{active.history.length}}</summary><ol><li v-for="(h,i) in active.history" :key="i">{{h.state==='open'?'Open':'Closed'}} · @{{h.actor}} · {{fmtTime(h.at)}}<p>{{h.reason?({resolved:'已解决',duplicate:'重复议题',outdated:'内容已更新','not-planned':'暂不处理'} as Record<string,string>)[h.reason]:''}} {{h.explanation}}</p></li></ol></details>
    <button v-if="active.canClose" :disabled="busy" @click="stateChange">{{active.state==='open'?'关闭并填写处理说明':'重开批注'}}</button>
    <p v-else class="annotation-timestamp">关闭与重开遵循当前 GitHub 账号的议题权限。</p>
   </template>
   <form v-if="draft" class="annotation-compose" @submit.prevent="submit">
    <p v-if="draft.kind==='new'" class="annotation-timestamp">首条评论提交后自动生成议题标题。评论公开，并显示你的 GitHub 身份。</p>
    <p v-if="currentDraftPosition==='changed'" class="annotation-alert" role="status">草稿原内容已变更；保留原快照，可提交关于原内容的批注。</p>
    <p v-if="currentDraftPosition==='hidden'" class="annotation-timestamp" role="status">选区内容当前折叠或隐藏，未判定为原文变更。<button type="button" :disabled="busy" @click="restoreDraft(draft)">展开并定位</button></p>
    <details v-if="draftSnapshotUrl"><summary>查看本次选区快照</summary><img :src="draftSnapshotUrl" class="annotation-snapshot" alt="仅包含当前选区的快照预览"/></details>
    <p v-if="draft.kind==='reply'" class="annotation-parent">{{draft.parentCommentId===null?'回复首评':'回复 @'+(findComment(draft.parentCommentId)?.author??'原评论')+' · #'+draft.parentCommentId}} <button v-if="draft.parentCommentId!==null&&!draft.submitted" type="button" @click="changeToRoot">改为回复首评</button></p>
    <label v-if="draft.kind==='state'&&draft.state==='closed'">关闭原因 <select :value="draft.reason??''" :disabled="draft.submitted" @change="updateDraft('reason',($event.target as HTMLSelectElement).value)"><option value="" disabled>请选择</option><option value="resolved">已解决</option><option value="duplicate">重复议题</option><option value="outdated">内容已更新</option><option value="not-planned">暂不处理</option></select></label>
    <label>{{draft.kind==='state'?'处理说明':'评论正文'}}<textarea ref="textarea" :value="draft.body" :readonly="draft.submitted" :maxlength="draft.kind==='state'?4000:16000" rows="5" :placeholder="draft.kind==='state'?'说明关闭或重开的依据':'说明选区中的问题、证据或待验证条件…'" @input="changeBody"></textarea></label>
    <p v-if="draft.submitted" class="annotation-alert">此草稿已发起提交。核验期间保持正文与提交编号不变；重试不会另发一条。</p>
    <p class="annotation-timestamp">{{draftSaved?'草稿已保存在此浏览器':'草稿尚未保存'}} <button type="button" @click="exportDraft">导出草稿</button></p>
    <button class="annotation-primary" type="submit" :disabled="busy">{{busy?'处理中…':draft.submitted?'核验并重试':!session?'登录 GitHub 并提交':draft.kind==='state'?draft.state==='closed'?'确认关闭':'确认重开':'提交评论'}}</button>
   </form>
   <p v-if="error" class="annotation-alert" role="alert">{{error}}</p><p v-if="warning" class="annotation-timestamp" role="status">{{warning}}</p>
  </aside>
  <div v-if="(notice||error||warning)&&!showCard" class="annotation-notice" data-annotation-ui role="status">{{error||notice||warning}} <button v-if="notice||error" aria-label="关闭提示" @click="notice='';error=''">×</button></div>
 </Teleport>
</template>
