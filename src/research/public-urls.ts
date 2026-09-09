const sensitiveKey=(key:string)=>/^(?:x-amz-.+|awsaccesskeyid|signature|access_token|refresh_token|token|credential|credentials|authorization|auth|api_key|apikey)$/i.test(key)
export function publicResourceUrl(value:string) {
 const url=new URL(value)
 const parameters=[...url.searchParams.keys(),...new URLSearchParams(url.hash.slice(1)).keys()]
 const removed=parameters.some(sensitiveKey)||Boolean(url.username||url.password)
 if(removed){url.search='';url.hash='';url.username='';url.password=''}
 return {url:removed?url.toString():value,removed}
}
export function assertPublicUrls(value:unknown,path='root'):void {
 if(Array.isArray(value)){value.forEach((v,i)=>assertPublicUrls(v,path+'['+i+']'));return}
 if(value&&typeof value==='object'){for(const [key,v] of Object.entries(value))assertPublicUrls(v,path+'.'+key);return}
 if(typeof value!=='string')return
 for(const candidate of value.matchAll(/https?:\/\/[^\s<>"`]+/g)) {
  let result:ReturnType<typeof publicResourceUrl>
  try{result=publicResourceUrl(candidate[0])}catch{continue}
  // Report the structured field only; never echo a credential-bearing URL.
  if(result.removed)throw new Error('公开来源包含临时授权参数：'+path)
 }
}
