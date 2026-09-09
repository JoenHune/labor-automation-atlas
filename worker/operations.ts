import { type Env,type Session,HttpError,now } from './types'
import { sha256 } from './security'
export interface Operation {
 user_id:number;operation_key:string;kind:string;request_hash:string;status:string;
 lock_until:number;attempted_at:number|null;github_id:number|null;response_json:string|null;created_at:number;
}
export async function beginOperation(env:Env,user:Session,key:string,kind:string,input:unknown) {
 const hash=await sha256(JSON.stringify(input))
 await env.DB.prepare('INSERT OR IGNORE INTO write_operations(user_id,operation_key,kind,request_hash,status,created_at) VALUES(?,?,?,?,?,?)')
  .bind(user.user_id,key,kind,hash,'pending',now()).run()
 const row=await env.DB.prepare('SELECT * FROM write_operations WHERE user_id=? AND operation_key=?').bind(user.user_id,key).first<Operation>()
 if(!row||row.request_hash!==hash||row.kind!==kind)throw new HttpError(409,'operation-conflict','同一提交编号对应不同内容；请保留草稿并核查原提交')
 if(row.status==='complete'&&row.response_json)return {operation:row,cached:JSON.parse(row.response_json)}
 const claimed=await env.DB.prepare('UPDATE write_operations SET lock_until=? WHERE user_id=? AND operation_key=? AND lock_until<=? AND status!=? RETURNING *')
  .bind(now()+90,user.user_id,key,now(),'complete').first<Operation>()
 if(!claimed)throw new HttpError(409,'operation-busy','此条提交正在处理；请稍后用同一草稿重试')
 return {operation:claimed,cached:null}
}
export async function attempted(env:Env,op:Operation) {
 await env.DB.prepare('UPDATE write_operations SET attempted_at=?,status=? WHERE user_id=? AND operation_key=?').bind(now(),'reconciling',op.user_id,op.operation_key).run()
}
export async function sendOnce<T>(env:Env,op:Operation,send:()=>Promise<T>) {
 await attempted(env,op)
 try{return await send()}catch(error) {
  // A definitive rejection proves this POST did not create a resource.
  // Transport failures / 5xx remain uncertain and must be reconciled.
  if(error instanceof HttpError&&[401,403,404,422,429].includes(error.status))await env.DB.prepare('UPDATE write_operations SET attempted_at=NULL,status=? WHERE user_id=? AND operation_key=?').bind('pending',op.user_id,op.operation_key).run()
  throw error
 }
}
export async function completeOperation(env:Env,op:Operation,result:unknown,githubId:number) {
 await env.DB.prepare('UPDATE write_operations SET status=?,response_json=?,github_id=?,lock_until=0 WHERE user_id=? AND operation_key=?')
  .bind('complete',JSON.stringify(result),githubId,op.user_id,op.operation_key).run()
 return result
}
export async function unlockOperation(env:Env,op:Operation) {
 await env.DB.prepare('UPDATE write_operations SET lock_until=0 WHERE user_id=? AND operation_key=?').bind(op.user_id,op.operation_key).run()
}
export function unresolvedOperation():never {
 throw new HttpError(409,'operation-reconciling','上次提交结果尚未确认，系统将继续核验。草稿已保留，请用同一提交重试，避免重复发布')
}
