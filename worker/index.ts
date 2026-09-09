import { ZodError } from 'zod'
import { type Env,HttpError,json } from './types'
import {authRoute} from './auth'
import {annotationRoute} from './annotations'
import {snapshotRoute} from './snapshots'
import {webhookRoute} from './webhook'
import {cleanup} from './maintenance'
export default {
 async scheduled(_event:ScheduledController,env:Env,ctx:ExecutionContext){ctx.waitUntil(cleanup(env))},
 async fetch(request:Request,env:Env):Promise<Response> {
  const origin=request.headers.get('Origin')
  const cors:Record<string,string>={'Vary':'Origin','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'}
  if(origin===env.SITE_ORIGIN)Object.assign(cors,{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Authorization,Content-Type,X-Atlas-Snapshot-Id,X-Atlas-Country,X-Atlas-Page','Access-Control-Max-Age':'600'})
  try {
   if(origin&&origin!==env.SITE_ORIGIN)throw new HttpError(403,'origin','请求来源不属于本站')
   if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors})
   const path=new URL(request.url).pathname
   if(path==='/health') {
    const configured=Boolean(env.DB&&env.SNAPSHOTS&&env.SITE_ORIGIN&&env.API_ORIGIN&&env.GITHUB_REPOSITORY_ID&&env.GITHUB_CLIENT_ID&&env.GITHUB_CLIENT_SECRET&&env.GITHUB_APP_ID&&env.GITHUB_INSTALLATION_ID&&env.TOKEN_ENCRYPTION_KEY&&env.GITHUB_APP_PRIVATE_KEY&&env.METADATA_SIGNING_KEY&&env.GITHUB_WEBHOOK_SECRET)
    let databaseReady=false
    if(env.DB)try{databaseReady=(await env.DB.prepare("SELECT COUNT(*) AS count FROM d1_migrations WHERE name IN ('0001_initial.sql','0002_tombstone.sql','0003_snapshot_recovery.sql')").first<{count:number}>())?.count===3}catch{}
    return json({service:'labor-automation-atlas',stage:configured&&databaseReady?'ready-for-integration':'integration-pending',configured,databaseReady,annotationsReady:configured&&databaseReady},200,cors)
   }
   if(request.method!=='GET'&&request.method!=='OPTIONS'&&path!=='/webhook'&&!origin)throw new HttpError(403,'origin','写入请求需要本站来源')
   const response=await authRoute(request,env)??await annotationRoute(request,env)??await snapshotRoute(request,env)??await webhookRoute(request,env)
   if(response) {
    const headers=new Headers(response.headers);for(const [key,value] of Object.entries(cors))headers.set(key,value)
    return new Response(response.body,{status:response.status,headers})
   }
   throw new HttpError(404,'not-found','接口不存在或仍在实现')
  }catch(error) {
   if(error instanceof ZodError)return json({error:'invalid-input',message:'提交格式不正确，草稿已保留'},400,cors)
   if(error instanceof HttpError)return json({error:error.code,message:error.message},error.status,cors)
   return json({error:'service-unavailable',message:'服务暂时不可用，草稿已保留'},503,cors)
  }
 }
} satisfies ExportedHandler<Env>
