import type {Annotation,Anchor} from './schema'
export const apiOrigin=(import.meta.env.VITE_ATLAS_API_ORIGIN??'').replace(/\/$/,'')
export interface SiteUser {id:number;login:string;avatarUrl:string}
export interface SiteSession {sessionToken:string;expiresAt:number;user:SiteUser}
export class ApiError extends Error {constructor(public status:number,public code:string,message:string){super(message)}}
export function storedSession():SiteSession|null {
 try {
  const value=JSON.parse(sessionStorage.getItem('atlas-session')??'null') as SiteSession|null
  if(value&&value.expiresAt*1000>Date.now())return value
  sessionStorage.removeItem('atlas-session')
 }catch{}
 return null
}
export async function api<T>(path:string,init:RequestInit={}):Promise<T> {
 if(!apiOrigin)throw new ApiError(503,'unconfigured','批注服务尚未配置；可保存草稿后继续阅读')
 const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),25000)
 const session=storedSession()
 try {
  const response=await fetch(apiOrigin+path,{...init,signal:controller.signal,credentials:'omit',headers:{...(session?{Authorization:'Bearer '+session.sessionToken}:{}),...init.headers}})
  const result=await response.json() as T&{error?:string;message?:string}
  if(!response.ok) {
   if(response.status===401)sessionStorage.removeItem('atlas-session')
   throw new ApiError(response.status,result.error??'request-failed',result.message??'提交失败，请稍后重试')
  }
  return result
 }catch(error) {
  if(error instanceof ApiError)throw error
  throw new ApiError(0,'network','网络中断，尚未确认提交结果；请保留当前草稿并重试')
 }finally{clearTimeout(timeout)}
}
export const post=<T>(path:string,body:unknown)=>api<T>(path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
const url64=(bytes:Uint8Array)=>btoa(String.fromCharCode(...bytes)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')
export async function beginLogin() {
 if(!apiOrigin)throw new ApiError(503,'unconfigured','登录服务尚未配置')
 const verifier=url64(crypto.getRandomValues(new Uint8Array(32)))
 sessionStorage.setItem('atlas-login-verifier',verifier)
 const challenge=url64(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier))))
 const target=new URL(apiOrigin+'/auth/login')
 target.searchParams.set('challenge',challenge);target.searchParams.set('return',location.href)
 location.assign(target.href)
}
export async function finishLogin() {
 const params=new URLSearchParams(location.hash.slice(1)),ticket=params.get('atlas_login')
 if(!ticket)return storedSession()
 const original=params.get('restore_hash')??''
 history.replaceState(null,'',location.pathname+location.search+(original.startsWith('#')?original:''))
 const verifier=sessionStorage.getItem('atlas-login-verifier')
 sessionStorage.removeItem('atlas-login-verifier')
 if(!verifier)throw new ApiError(401,'login-browser','请在发起登录的同一浏览器标签页完成授权')
 const session=await post<SiteSession>('/auth/exchange',{ticket,verifier})
 sessionStorage.setItem('atlas-session',JSON.stringify(session))
 return session
}
export function shareUrl(annotation:Annotation,base:string) {
 const url=new URL(base.replace(/\/$/,'')+annotation.page,location.origin),v=annotation.anchor.view
 if(v.year!==null)url.searchParams.set('year',String(v.year))
 if(v.focus)url.searchParams.set('focus',v.focus)
 if(v.sort)url.searchParams.set('sort',v.sort)
 for(const [key,value] of Object.entries(v.filters))url.searchParams.set('filter.'+key,value)
 url.hash='annotation='+annotation.id
 return url.href
}
export interface Draft {
 id:string;page:string;country:Anchor['country'];kind:'new'|'reply'|'state';body:string;updatedAt:string;
 anchor:Anchor|null;snapshot:Blob|null;annotationId:string|null;parentCommentId:number|null;
 state:'open'|'closed';reason:'resolved'|'duplicate'|'outdated'|'not-planned'|null;
 // Once a network POST is attempted, keep this exact payload and key.
 submitted:boolean;
}
async function db() {
 return new Promise<IDBDatabase>((resolve,reject)=>{
  const request=indexedDB.open('labor-automation-atlas',1)
  request.onupgradeneeded=()=>request.result.createObjectStore('drafts',{keyPath:'id'})
  request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)
 })
}
export async function saveDraft(draft:Draft) {
 const database=await db()
 try {await new Promise<void>((resolve,reject)=>{
  const tx=database.transaction('drafts','readwrite');tx.objectStore('drafts').put({...draft,updatedAt:new Date().toISOString()})
  tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error)
 })}finally{database.close()}
}
export async function draftsForPage(page:string,country:string) {
 const database=await db()
 try {return await new Promise<Draft[]>((resolve,reject)=>{
  const request=database.transaction('drafts').objectStore('drafts').getAll()
  request.onsuccess=()=>resolve((request.result as Draft[]).filter(d=>d.page===page&&d.country===country).sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt)))
  request.onerror=()=>reject(request.error)
 })}finally{database.close()}
}
export async function deleteDraft(id:string) {
 const database=await db()
 try{await new Promise<void>((resolve,reject)=>{
  const tx=database.transaction('drafts','readwrite');tx.objectStore('drafts').delete(id)
  tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)
 })}finally{database.close()}
}
