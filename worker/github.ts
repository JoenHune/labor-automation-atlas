import { type Env,HttpError,now } from './types'
import { b64url,encrypt,decrypt } from './security'
const encode=(value:unknown)=>b64url(new TextEncoder().encode(JSON.stringify(value)))
// GitHub downloads PKCS#1; Web Crypto imports PKCS#8. Wrap the original DER,
// retaining the key only in Worker memory.
export function privateKeyDer(input:string) {
 const pem=input.replace(/\\n/g,'\n')
 const bytes=Uint8Array.from(atob(pem.replace(/-----[^-]+-----/g,'').replace(/\s/g,'')),c=>c.charCodeAt(0))
 if(!pem.includes('BEGIN RSA PRIVATE KEY'))return bytes
 const length=(n:number)=>n<128?[n]:n<256?[0x81,n]:[0x82,n>>8,n&255]
 const octet=[4,...length(bytes.length),...bytes]
 const content=[2,1,0,48,13,6,9,42,134,72,134,247,13,1,1,1,5,0,...octet]
 return new Uint8Array([48,...length(content.length),...content])
}
export const repoPath=(env:Env)=>'/repos/'+encodeURIComponent(env.GITHUB_OWNER)+'/'+encodeURIComponent(env.GITHUB_REPO)
export async function github<T>(path:string,token:string,init:RequestInit={}):Promise<T> {
 if(!path.startsWith('/')||path.startsWith('//'))throw new Error('Invalid GitHub path')
 const response=await fetch('https://api.github.com'+path,{
  ...init,headers:{'Accept':'application/vnd.github+json','Authorization':'Bearer '+token,'X-GitHub-Api-Version':'2026-03-10','User-Agent':'labor-automation-atlas','Content-Type':'application/json',...init.headers},
 })
 if(!response.ok) {
  if(response.status===401)throw new HttpError(401,'github-expired','GitHub授权已过期；草稿已保留')
  if(response.status===403||response.status===429)throw new HttpError(response.headers.get('X-RateLimit-Remaining')==='0'||response.status===429?429:403,'github-permission','GitHub暂时限制操作或当前账号没有权限；草稿已保留')
  if(response.status===404)throw new HttpError(404,'github-not-found','GitHub内容不存在或当前账号不可访问')
  if(response.status===422)throw new HttpError(422,'github-validation','GitHub拒绝了当前内容；请检查正文和议题状态，草稿已保留')
  throw new HttpError(502,'github-unavailable','GitHub暂时不可用；提交状态将核验，草稿已保留')
 }
 return response.status===204?undefined as T:await response.json() as T
}
export async function installationToken(env:Env) {
 const key='installation-token:'+env.GITHUB_INSTALLATION_ID
 const cached=await env.DB.prepare('SELECT value_json FROM github_cache WHERE cache_key=? AND expires_at>?').bind(key,now()+60).first<{value_json:string}>()
 if(cached)return decrypt(cached.value_json,env.TOKEN_ENCRYPTION_KEY)
 if(!env.GITHUB_APP_PRIVATE_KEY||!env.GITHUB_APP_ID||!env.GITHUB_INSTALLATION_ID)throw new HttpError(503,'configuration','GitHub App尚未配置完成')
 const bytes=privateKeyDer(env.GITHUB_APP_PRIVATE_KEY)
 const cryptoKey=await crypto.subtle.importKey('pkcs8',bytes,{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['sign'])
 const payload=encode({alg:'RS256',typ:'JWT'})+'.'+encode({iat:now()-30,exp:now()+540,iss:env.GITHUB_APP_ID})
 const sig=await crypto.subtle.sign('RSASSA-PKCS1-v1_5',cryptoKey,new TextEncoder().encode(payload))
 const jwt=payload+'.'+b64url(new Uint8Array(sig))
 const result=await github<{token:string,expires_at:string}>('/app/installations/'+env.GITHUB_INSTALLATION_ID+'/access_tokens',jwt,{
  method:'POST',body:JSON.stringify({repositories:[env.GITHUB_REPO],permissions:{issues:'read',metadata:'read'}}),
 })
 await env.DB.prepare('INSERT INTO github_cache(cache_key,value_json,fetched_at,expires_at) VALUES(?,?,?,?) ON CONFLICT(cache_key) DO UPDATE SET value_json=excluded.value_json,fetched_at=excluded.fetched_at,expires_at=excluded.expires_at')
  .bind(key,await encrypt(result.token,env.TOKEN_ENCRYPTION_KEY),now(),Math.floor(Date.parse(result.expires_at)/1000)).run()
 return result.token
}
