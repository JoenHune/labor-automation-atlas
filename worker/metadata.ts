import { AnchorSchema,type Anchor } from '../src/annotations/schema'
import { b64url,unb64,sign,constantEqual } from './security'
import { HttpError } from './types'
export type Marker = ({kind:'anchor',anchor:Anchor}|{kind:'reply',annotationId:string,parentCommentId:number|null}|{kind:'state',annotationId:string,state:'open'|'closed',reason:string|null,explanation:string}) & {operationKey:string;authorId:number}
export async function embedMarker(body:string,marker:Marker,secret:string) {
 if(!secret)throw new HttpError(503,'configuration','批注签名尚未配置')
 if(body.includes('<!-- atlas:'))throw new HttpError(400,'reserved-marker','正文包含系统保留标记')
 const encoded=new TextEncoder().encode(JSON.stringify(marker))
 if(encoded.length>35000)throw new HttpError(413,'anchor-large','选区包含的内容过多，请缩小范围后重试')
 const payload=b64url(encoded)
 const result=body+'\n\n<!-- atlas:v1:'+payload+':'+await sign(payload,secret)+' -->'
 if(new TextEncoder().encode(result).length>64000)throw new HttpError(413,'comment-large','批注正文与选区合计过大，请缩短正文或缩小选区')
 return result
}
export async function readMarker(body:string,secret:string,authorId?:number):Promise<Marker|null> {
 const matches=[...body.matchAll(/<!-- atlas:v1:([A-Za-z0-9_-]+):([A-Za-z0-9_-]+) -->/g)]
 if(matches.length!==1)return null
 const [,payload,signature]=matches[0]
 if(payload.length>200000||!constantEqual(signature,await sign(payload,secret)))return null
 try {
  const marker=JSON.parse(new TextDecoder().decode(unb64(payload))) as Marker
  if(!Number.isInteger(marker.authorId)||marker.authorId<=0||(authorId!==undefined&&marker.authorId!==authorId))return null
  if(!/^[0-9a-f-]{36}$/.test(marker.operationKey))return null
  if(marker.kind==='anchor')AnchorSchema.parse(marker.anchor)
  else if(marker.kind==='reply') {
   if(!/^[0-9a-f-]{36}$/.test(marker.annotationId)||(marker.parentCommentId!==null&&(!Number.isInteger(marker.parentCommentId)||marker.parentCommentId<=0)))return null
  }else if(marker.kind==='state') {
   if(!/^[0-9a-f-]{36}$/.test(marker.annotationId)||!['open','closed'].includes(marker.state)||typeof marker.explanation!=='string'||marker.explanation.length>4000)return null
   if(marker.state==='closed'&&(!['resolved','duplicate','outdated','not-planned'].includes(marker.reason??'')||!marker.explanation.trim()))return null
  }else return null
  return marker
 }catch{return null}
}
export const stripMarkers=(body:string)=>body.replace(/\n*<!-- atlas:[\s\S]*?-->/g,'').trim()
export function annotationTitle(body:string,country:string) {
 const text=body.replace(/[#*\x60>_\[\]]/g,'').replace(/\s+/g,' ').trim()
 return '['+(country==='cn'?'中国':country==='us'?'美国':'全站')+'批注] '+Array.from(text).slice(0,70).join('')
}
