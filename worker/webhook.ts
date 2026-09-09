import {type Env,HttpError,json,now} from './types'
import {verifyWebhook,readLimitedBody} from './security'
import {installationToken} from './github'
import {readIssue,syncIssue} from './discussions'
export async function webhookRoute(request:Request,env:Env):Promise<Response|null> {
 if(new URL(request.url).pathname!=='/webhook'||request.method!=='POST')return null
 const raw=new TextDecoder().decode(await readLimitedBody(request,2*1024*1024))
 if(!await verifyWebhook(raw,request.headers.get('X-Hub-Signature-256'),env.GITHUB_WEBHOOK_SECRET))throw new HttpError(401,'webhook-signature','Webhook签名无效')
 const delivery=request.headers.get('X-GitHub-Delivery')??'',event=request.headers.get('X-GitHub-Event')??''
 if(!/^[a-f0-9-]{36}$/.test(delivery))throw new HttpError(400,'webhook-id','Webhook编号无效')
 const payload=JSON.parse(raw) as {action?:string;repository?:{id:number;full_name:string};issue?:{number:number};installation?:{id:number}}
 if(event==='ping')return json({ok:true})
 if(String(payload.repository?.id)!==env.GITHUB_REPOSITORY_ID||payload.repository?.full_name.toLowerCase()!==(env.GITHUB_OWNER+'/'+env.GITHUB_REPO).toLowerCase()||String(payload.installation?.id)!==env.GITHUB_INSTALLATION_ID)throw new HttpError(403,'webhook-repository','Webhook仓库或安装不匹配')
 if(!['issues','issue_comment'].includes(event))return json({ignored:true})
 if(!Number.isInteger(payload.issue?.number)||payload.issue!.number<=0)throw new HttpError(400,'webhook-issue','Webhook议题无效')
 const claimed=await env.DB.prepare('INSERT INTO webhook_deliveries(id,event,status,received_at) VALUES(?,?,?,?) ON CONFLICT(id) DO UPDATE SET status=excluded.status,received_at=excluded.received_at WHERE webhook_deliveries.status=? OR (webhook_deliveries.status=? AND webhook_deliveries.received_at<?) RETURNING id')
  .bind(delivery,event,'processing',now(),'failed','processing',now()-120).first()
 if(!claimed)return json({duplicate:true})
 try {
  if(event==='issues'&&payload.action==='deleted')await env.DB.prepare('UPDATE annotations SET deleted_at=? WHERE issue_number=?').bind(now(),payload.issue!.number).run()
  else {
   const token=await installationToken(env)
   // Read current state instead of trusting event order or payload contents.
   await syncIssue(await readIssue(payload.issue!.number,env,token),env,token)
  }
  await env.DB.prepare('UPDATE webhook_deliveries SET status=?,finished_at=?,error_code=NULL WHERE id=?').bind('complete',now(),delivery).run()
  return json({ok:true})
 }catch(error) {
  await env.DB.prepare('UPDATE webhook_deliveries SET status=?,error_code=? WHERE id=?').bind('failed',error instanceof HttpError?error.code:'sync-failed',delivery).run()
  throw error
 }
}
