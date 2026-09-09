import { z } from 'zod'
import { type Env,type Session,HttpError,now,json } from './types'
import { randomToken,sha256,encrypt,decrypt,constantEqual,safeReturnUrl,readJson } from './security'
import {github} from './github'
const cookieName='__Host-atlas-oauth'
const cookie=(request:Request,name:string)=>request.headers.get('Cookie')?.split(';').map(c=>c.trim()).find(c=>c.startsWith(name+'='))?.slice(name.length+1)??''
export async function authenticate(request:Request,env:Env):Promise<Session> {
 const token=request.headers.get('Authorization')?.match(/^Bearer ([A-Za-z0-9_-]{43})$/)?.[1]
 if(!token)throw new HttpError(401,'login-required','请用GitHub登录；草稿已保留')
 const session=await env.DB.prepare('SELECT * FROM sessions WHERE token_hash=? AND expires_at>? AND github_expires_at>?').bind(await sha256(token),now(),now()).first<Session>()
 if(!session)throw new HttpError(401,'session-expired','登录已过期；草稿已保留')
 return session
}
export const userToken=(session:Session,env:Env)=>decrypt(session.token_cipher,env.TOKEN_ENCRYPTION_KEY)
export async function authRoute(request:Request,env:Env):Promise<Response|null> {
 const url=new URL(request.url),path=url.pathname
 if(path==='/auth/login'&&request.method==='GET') {
  if(!env.GITHUB_CLIENT_ID||!env.GITHUB_CLIENT_SECRET)throw new HttpError(503,'configuration','登录服务尚未配置完成')
  const challenge=url.searchParams.get('challenge')??''
  if(!/^[A-Za-z0-9_-]{43}$/.test(challenge))throw new HttpError(400,'pkce','登录校验参数无效')
  const returnUrl=safeReturnUrl(url.searchParams.get('return')??env.SITE_BASE_PATH,env.SITE_ORIGIN,env.SITE_BASE_PATH)
  const state=randomToken(),verifier=randomToken(),binding=randomToken()
  await env.DB.prepare('INSERT INTO oauth_states(state_hash,verifier_cipher,binding_hash,site_challenge,return_url,expires_at) VALUES(?,?,?,?,?,?)')
   .bind(await sha256(state),await encrypt(verifier,env.TOKEN_ENCRYPTION_KEY),await sha256(binding),challenge,returnUrl,now()+600).run()
  const target=new URL('https://github.com/login/oauth/authorize')
  target.searchParams.set('client_id',env.GITHUB_CLIENT_ID);target.searchParams.set('redirect_uri',env.API_ORIGIN+'/auth/callback')
  target.searchParams.set('state',state);target.searchParams.set('code_challenge',await sha256(verifier));target.searchParams.set('code_challenge_method','S256')
  return new Response(null,{status:302,headers:{Location:target.href,'Set-Cookie':cookieName+'='+binding+'; Secure; HttpOnly; SameSite=Lax; Path=/; Max-Age=600','Cache-Control':'no-store','Referrer-Policy':'no-referrer'}})
 }
 if(path==='/auth/callback'&&request.method==='GET') {
  const state=url.searchParams.get('state')??'',code=url.searchParams.get('code')??'',binding=cookie(request,cookieName)
  if(!/^[A-Za-z0-9_-]{43}$/.test(state)||!binding||!code)throw new HttpError(400,'oauth-state','登录未完成或校验失效；回到原页面可重试，草稿仍保留')
  type OAuthState={verifier_cipher:string,binding_hash:string,site_challenge:string,return_url:string,expires_at:number}
  const row=await env.DB.prepare('SELECT * FROM oauth_states WHERE state_hash=? AND expires_at>?').bind(await sha256(state),now()).first<OAuthState>()
  if(!row||!constantEqual(row.binding_hash,await sha256(binding)))throw new HttpError(400,'oauth-state','登录校验失效')
  const consumed=await env.DB.prepare('DELETE FROM oauth_states WHERE state_hash=? AND binding_hash=? RETURNING state_hash').bind(await sha256(state),row.binding_hash).first()
  if(!consumed)throw new HttpError(400,'oauth-used','登录凭证已经使用')
  const tokenResponse=await fetch('https://github.com/login/oauth/access_token',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({
   client_id:env.GITHUB_CLIENT_ID,client_secret:env.GITHUB_CLIENT_SECRET,code,redirect_uri:env.API_ORIGIN+'/auth/callback',
   code_verifier:await decrypt(row.verifier_cipher,env.TOKEN_ENCRYPTION_KEY),repository_id:env.GITHUB_REPOSITORY_ID,
  })})
  const tokens=await tokenResponse.json() as {access_token?:string,expires_in?:number,error?:string}
  if(!tokenResponse.ok||!tokens.access_token||tokens.error)throw new HttpError(401,'oauth-exchange','GitHub授权失败；请回原页面重试')
  const user=await github<{id:number,login:string,avatar_url:string}>('/user',tokens.access_token)
  const ticket=randomToken()
  await env.DB.prepare('INSERT INTO login_tickets(ticket_hash,site_challenge,user_id,user_login,avatar_url,token_cipher,github_expires_at,expires_at) VALUES(?,?,?,?,?,?,?,?)')
   .bind(await sha256(ticket),row.site_challenge,user.id,user.login,user.avatar_url,await encrypt(tokens.access_token,env.TOKEN_ENCRYPTION_KEY),now()+Math.min(tokens.expires_in??28800,28800),now()+60).run()
  const returnUrl=new URL(row.return_url)
  const originalHash=returnUrl.hash
  returnUrl.hash=new URLSearchParams({atlas_login:ticket,restore_hash:originalHash}).toString()
  return new Response(null,{status:302,headers:{Location:returnUrl.href,'Set-Cookie':cookieName+'=; Secure; HttpOnly; SameSite=Lax; Path=/; Max-Age=0','Cache-Control':'no-store','Referrer-Policy':'no-referrer'}})
 }
 if(path==='/auth/exchange'&&request.method==='POST') {
  const body=z.object({ticket:z.string().regex(/^[A-Za-z0-9_-]{43}$/),verifier:z.string().regex(/^[A-Za-z0-9_-]{43}$/)}).parse(await readJson(request,4096))
  type Ticket={ticket_hash:string,site_challenge:string,user_id:number,user_login:string,avatar_url:string,token_cipher:string,github_expires_at:number}
  const ticket=await env.DB.prepare('DELETE FROM login_tickets WHERE ticket_hash=? AND site_challenge=? AND expires_at>? RETURNING *')
   .bind(await sha256(body.ticket),await sha256(body.verifier),now()).first<Ticket>()
  if(!ticket)throw new HttpError(401,'ticket-expired','登录凭证失效；请重新登录，草稿已保留')
  const sessionToken=randomToken(),expiresAt=Math.min(now()+3600,ticket.github_expires_at)
  await env.DB.prepare('INSERT INTO sessions(token_hash,user_id,user_login,avatar_url,token_cipher,created_at,expires_at,github_expires_at) VALUES(?,?,?,?,?,?,?,?)')
   .bind(await sha256(sessionToken),ticket.user_id,ticket.user_login,ticket.avatar_url,ticket.token_cipher,now(),expiresAt,ticket.github_expires_at).run()
  return json({sessionToken,expiresAt,user:{id:ticket.user_id,login:ticket.user_login,avatarUrl:ticket.avatar_url}})
 }
 if(path==='/session'&&request.method==='GET') {
  const session=await authenticate(request,env)
  return json({expiresAt:session.expires_at,user:{id:session.user_id,login:session.user_login,avatarUrl:session.avatar_url}})
 }
 if(path==='/logout'&&request.method==='POST') {
  const session=await authenticate(request,env)
  await env.DB.prepare('DELETE FROM sessions WHERE token_hash=?').bind(session.token_hash).run()
  return json({ok:true})
 }
 return null
}

