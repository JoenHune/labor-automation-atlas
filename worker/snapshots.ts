import { z } from 'zod'
import { type Env,HttpError,json,now } from './types'
import {authenticate} from './auth'
import {readLimitedBody,sha256} from './security'
import {Scope} from '../src/annotations/schema'
const maxBytes=4*1024*1024
export function validatePng(bytes:Uint8Array) {
 const signature=[137,80,78,71,13,10,26,10]
 if(bytes.length<57||signature.some((b,i)=>bytes[i]!==b))throw new HttpError(415,'snapshot-type','快照必须是PNG图片')
 const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength)
 const type=(at:number)=>String.fromCharCode(...bytes.slice(at,at+4))
 if(view.getUint32(8)!==13||type(12)!=='IHDR')throw new HttpError(415,'snapshot-header','快照格式无效')
 const width=view.getUint32(16),height=view.getUint32(20)
 if(width<1||height<1||width>4096||height>4096||width*height>8000000)throw new HttpError(413,'snapshot-dimensions','选区过大，请缩小框选范围')
 let offset=8,ended=false,hasImage=false
 const crcTable=Array.from({length:256},(_,i)=>{let c=i;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;return c>>>0})
 while(offset+12<=bytes.length) {
  const size=view.getUint32(offset),name=type(offset+4)
  if(size>maxBytes||offset+12+size>bytes.length)throw new HttpError(415,'snapshot-chunk','快照数据不完整')
  let crc=0xffffffff
  for(let i=offset+4;i<offset+8+size;i++)crc=crcTable[(crc^bytes[i])&255]^(crc>>>8)
  if(((crc^0xffffffff)>>>0)!==view.getUint32(offset+8+size))throw new HttpError(415,'snapshot-crc','快照校验失败')
  // Canvas PNGs need no metadata or remote references. Reject text/exif and
  // animations so uploads cannot carry hidden page data alongside the crop.
  if(!['IHDR','IDAT','IEND','sRGB','gAMA','cHRM','pHYs','PLTE','tRNS'].includes(name))throw new HttpError(415,'snapshot-metadata','快照含不支持的附加数据，请重新生成')
  if(name==='IDAT')hasImage=true
  offset+=size+12
  if(name==='IEND'){ended=size===0&&offset===bytes.length;break}
 }
 if(!ended||!hasImage)throw new HttpError(415,'snapshot-incomplete','快照数据不完整')
 return {width,height}
}
export async function snapshotRoute(request:Request,env:Env):Promise<Response|null> {
 const path=new URL(request.url).pathname
 if(path==='/snapshots'&&request.method==='POST') {
  const user=await authenticate(request,env),id=z.uuid().parse(request.headers.get('X-Atlas-Snapshot-Id'))
  const country=Scope.parse(request.headers.get('X-Atlas-Country')),page=decodeURIComponent(request.headers.get('X-Atlas-Page')??'')
  const pageScope=page.startsWith('/cn/')?'cn':page.startsWith('/us/')?'us':'shared'
  if(country!==pageScope||!/^\/(?:cn\/|us\/|methodology(?:\/|$)|$)/.test(page)||page.length>500||page.includes('..')||/[?#]/.test(page))throw new HttpError(400,'snapshot-scope','快照页面与国家不符')
  if(request.headers.get('Content-Type')!=='image/png')throw new HttpError(415,'snapshot-type','快照只接受PNG图片')
  const bytes=await readLimitedBody(request,maxBytes),{width,height}=validatePng(bytes),hash=await sha256(bytes)
  const existing=await env.DB.prepare('SELECT user_id,sha256,country,page FROM snapshots WHERE id=?').bind(id).first<{user_id:number;sha256:string;country:string;page:string}>()
  if(existing) {
   if(existing.user_id!==user.user_id||existing.sha256!==hash||existing.country!==country||existing.page!==page)throw new HttpError(409,'snapshot-conflict','同一快照编号对应不同内容')
   return json({id,width,height})
  }
  const usage=await env.DB.prepare('SELECT COUNT(*) AS count FROM snapshots WHERE user_id=? AND created_at>?').bind(user.user_id,now()-3600).first<{count:number}>()
  if((usage?.count??0)>=60)throw new HttpError(429,'snapshot-limit','快照上传过于频繁；草稿已保留，请稍后重试')
  const objectKey='regions/'+country+'/'+id+'.png'
  await env.SNAPSHOTS.put(objectKey,bytes,{httpMetadata:{contentType:'image/png'},customMetadata:{sha256:hash}})
  await env.DB.prepare('INSERT INTO snapshots(id,user_id,country,page,object_key,sha256,bytes,width,height,created_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)')
   .bind(id,user.user_id,country,page,objectKey,hash,bytes.length,width,height,now(),now()+86400).run()
  return json({id,width,height},201)
 }
 const match=path.match(/^\/snapshots\/([a-f0-9-]{36})$/)
 if(match&&request.method==='GET') {
  const row=await env.DB.prepare('SELECT * FROM snapshots WHERE id=?').bind(match[1]).first<{object_key:string;user_id:number;annotation_id:string|null}>()
  if(!row)throw new HttpError(404,'snapshot-not-found','选区快照不存在')
  if(!row.annotation_id&&(await authenticate(request,env)).user_id!==row.user_id)throw new HttpError(403,'snapshot-permission','无权读取未发布的快照')
  const object=await env.SNAPSHOTS.get(row.object_key)
  if(!object)throw new HttpError(404,'snapshot-missing','原始快照暂时不可用')
  return new Response(object.body,{headers:{'Content-Type':'image/png','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; sandbox",'Cache-Control':row.annotation_id?'public,max-age=86400,immutable':'no-store'}})
 }
 return null
}
