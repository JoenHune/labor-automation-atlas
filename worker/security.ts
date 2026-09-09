import { HttpError } from './types'
const encoder=new TextEncoder(),decoder=new TextDecoder()
export const b64url=(input:Uint8Array)=>btoa(String.fromCharCode(...input)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')
export const unb64=(input:string)=>Uint8Array.from(atob(input.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0))
export const randomToken=()=>b64url(crypto.getRandomValues(new Uint8Array(32)))
export async function sha256(value:string|Uint8Array) { return b64url(new Uint8Array(await crypto.subtle.digest('SHA-256',typeof value==='string'?encoder.encode(value):new Uint8Array(value)))) }
export function constantEqual(a:string,b:string) {
 const left=encoder.encode(a),right=encoder.encode(b)
 let diff=left.length^right.length
 for(let i=0;i<Math.max(left.length,right.length);i++)diff|=(left[i]??0)^(right[i]??0)
 return diff===0
}
async function encryptionKey(secret:string) {
 const bytes=unb64(secret)
 if(bytes.length!==32)throw new HttpError(503,'configuration','服务尚未完成密钥配置')
 return crypto.subtle.importKey('raw',bytes,'AES-GCM',false,['encrypt','decrypt'])
}
export async function encrypt(value:string,secret:string) {
 const iv=crypto.getRandomValues(new Uint8Array(12)),key=await encryptionKey(secret)
 const encrypted=await crypto.subtle.encrypt({name:'AES-GCM',iv},key,encoder.encode(value))
 return b64url(iv)+'.'+b64url(new Uint8Array(encrypted))
}
export async function decrypt(value:string,secret:string) {
 const [iv,payload,...rest]=value.split('.')
 if(!iv||!payload||rest.length)throw new HttpError(401,'session-expired','授权已过期，请重新登录；草稿已保留')
 return decoder.decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:unb64(iv)},await encryptionKey(secret),unb64(payload)))
}
export async function sign(value:string,secret:string) {
 const key=await crypto.subtle.importKey('raw',encoder.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign'])
 return b64url(new Uint8Array(await crypto.subtle.sign('HMAC',key,encoder.encode(value))))
}
export async function verifyWebhook(body:string,signature:string|null,secret:string) {
 if(!signature||!/^sha256=[a-f0-9]{64}$/.test(signature)||!secret)return false
 const expected=unb64(await sign(body,secret))
 const hex=Array.from(expected).map(b=>b.toString(16).padStart(2,'0')).join('')
 return constantEqual(signature,'sha256='+hex)
}
export function safeReturnUrl(input:string,siteOrigin:string,basePath:string) {
 let url:URL
 try{url=new URL(input,siteOrigin)}catch{throw new HttpError(400,'return-url','返回地址无效')}
 const base=basePath.endsWith('/')?basePath:basePath+'/'
 if(url.origin!==siteOrigin||!url.pathname.startsWith(base)||url.username||url.password)throw new HttpError(400,'return-url','返回地址不属于本站')
 return url.href
}
export async function readJson(request:Request,maxBytes=160000) {
 const declared=Number(request.headers.get('Content-Length')??0)
 if(declared>maxBytes)throw new HttpError(413,'too-large','内容过大')
 const bytes=await readLimitedBody(request,maxBytes)
 try{return JSON.parse(decoder.decode(bytes))}catch{throw new HttpError(400,'invalid-json','提交内容无效')}
}
export async function readLimitedBody(request:Request,maxBytes:number) {
 const reader=request.body?.getReader()
 if(!reader)return new Uint8Array()
 const chunks:Uint8Array[]=[];let size=0
 while(true) {
  const {done,value}=await reader.read();if(done)break
  size+=value.byteLength
  if(size>maxBytes){await reader.cancel();throw new HttpError(413,'too-large','内容过大')}
  chunks.push(value)
 }
 const all=new Uint8Array(size);let offset=0
 for(const chunk of chunks){all.set(chunk,offset);offset+=chunk.byteLength}
 return all
}
