import { z } from 'zod'
import {CreateAnnotationSchema,ReplySchema,StateChangeSchema,Scope,type Annotation} from '../src/annotations/schema'
import {type Env,type Session,HttpError,json,now} from './types'
import {authenticate,userToken} from './auth'
import {readJson} from './security'
import {github,installationToken,repoPath} from './github'
import {annotationTitle,embedMarker} from './metadata'
import {annotationRow,readIssue,syncIssue,refreshIndex,canManage,recoverOperationIssue,recoverOperationComment,issueComments,type AnnotationRow,type GitHubIssue,type GitHubComment} from './discussions'
import {beginOperation,sendOnce,completeOperation,unlockOperation,unresolvedOperation} from './operations'
async function optionalUser(request:Request,env:Env) {
 return request.headers.has('Authorization')?authenticate(request,env):null
}
async function refresh(number:number,env:Env,user:Session|null=null) {
 const token=await installationToken(env),issue=await readIssue(number,env,token)
 const annotation=await syncIssue(issue,env,token)
 if(!annotation)throw new HttpError(404,'annotation-not-found','未找到有效的区域批注')
 annotation.canClose=await canManage(issue,user,env)
 return annotation
}
export async function annotationRoute(request:Request,env:Env):Promise<Response|null> {
 const url=new URL(request.url),path=url.pathname
 if(path==='/annotations'&&request.method==='GET') {
  const country=Scope.parse(url.searchParams.get('country')),page=url.searchParams.get('page')??''
  const prefix=page.startsWith('/cn/')?'cn':page.startsWith('/us/')?'us':'shared'
  if(country!==prefix||!page.startsWith('/')||page.length>500)throw new HttpError(400,'scope','页面与国家不符')
  let warning:string|null=null
  try{await refreshIndex(env)}catch{warning='最新状态暂时无法刷新；以下为上次同步结果'}
  const rows=await env.DB.prepare('SELECT * FROM annotations WHERE country=? AND page=? AND deleted_at IS NULL ORDER BY github_updated_at DESC LIMIT 301').bind(country,page).all<AnnotationRow>()
  if(rows.results.length>300)throw new HttpError(503,'page-overflow','本页批注过多，需启用分页后加载，当前不返回不完整结果')
  return json({annotations:rows.results.map(r=>JSON.parse(r.cached_json)),warning,indexFetchedAt:(await env.DB.prepare('SELECT fetched_at FROM github_cache WHERE cache_key=?').bind('issue-index').first<{fetched_at:number}>())?.fetched_at??null})
 }
 const match=path.match(/^\/annotations\/([a-f0-9-]{36})(?:\/(comments|state))?$/)
 if(match&&request.method==='GET'&&!match[2]) {
  const row=await annotationRow(match[1],env),user=await optionalUser(request,env)
  try{return json({annotation:await refresh(row.issue_number,env,user),warning:null})}
  catch(error) {
   if(error instanceof HttpError&&error.status===401)throw error
   const annotation=JSON.parse(row.cached_json) as Annotation
   annotation.canClose=false
   return json({annotation,warning:'最新状态与权限暂时无法刷新；请留意显示的更新时间'})
  }
 }
 if(path==='/annotations'&&request.method==='POST') {
  const user=await authenticate(request,env),input=CreateAnnotationSchema.parse(await readJson(request))
  if(!input.anchor.snapshotId)throw new HttpError(400,'snapshot-required','请先保存选区快照；失败时可保留草稿重试')
  const snapshot=await env.DB.prepare('UPDATE snapshots SET expires_at=CASE WHEN annotation_id IS NULL THEN ? ELSE NULL END WHERE id=? AND user_id=? AND country=? AND page=? AND (annotation_id IS NULL OR annotation_id=?) RETURNING id')
   .bind(now()+3600,input.anchor.snapshotId,user.user_id,input.anchor.country,input.anchor.page,input.anchor.id).first()
  if(!snapshot)throw new HttpError(400,'snapshot-scope','选区快照不属于当前用户和页面')
  const token=await userToken(user,env)
  const {operation,cached}=await beginOperation(env,user,input.idempotencyKey,'create',input)
  if(cached)return json(cached)
  try {
   let issue:GitHubIssue|null=null
   if(operation.attempted_at)issue=await recoverOperationIssue(input.idempotencyKey,user.user_id,env,token)
   if(!issue&&operation.attempted_at)unresolvedOperation()
   if(!issue) {
    const body=await embedMarker(input.body,{kind:'anchor',anchor:input.anchor,operationKey:input.idempotencyKey,authorId:user.user_id},env.METADATA_SIGNING_KEY)
    issue=await sendOnce(env,operation,()=>github<GitHubIssue>(repoPath(env)+'/issues',token,{method:'POST',body:JSON.stringify({title:annotationTitle(input.body,input.anchor.country),body})}))
   }
   const annotation=await syncIssue(issue,env,token)
   if(!annotation)throw new HttpError(503,'index-pending','GitHub已保存；选区索引正在恢复，请用同一提交重试')
   annotation.canClose=true
   return json(await completeOperation(env,operation,{annotation},issue.id),201)
  }finally{await unlockOperation(env,operation)}
 }
 if(match&&request.method==='POST'&&match[2]==='comments') {
  const user=await authenticate(request,env),row=await annotationRow(match[1],env)
  const input=ReplySchema.parse(await readJson(request,24000)),token=await userToken(user,env)
  const {operation,cached}=await beginOperation(env,user,input.idempotencyKey,'reply:'+row.id,input)
  if(cached)return json(cached)
  try {
   let comment=operation.attempted_at?await recoverOperationComment(row.issue_number,input.idempotencyKey,user.user_id,env,token):null
   if(!comment&&operation.attempted_at)unresolvedOperation()
   if(!comment) {
    if(input.parentCommentId!==null) {
     const comments=await issueComments(row.issue_number,env,token)
     if(!comments.some(c=>c.id===input.parentCommentId))throw new HttpError(410,'parent-deleted','被回复的评论已删除；草稿保留，可改为回复首评后提交')
    }
    const body=await embedMarker(input.body,{kind:'reply',annotationId:row.id,parentCommentId:input.parentCommentId,operationKey:input.idempotencyKey,authorId:user.user_id},env.METADATA_SIGNING_KEY)
    comment=await sendOnce(env,operation,()=>github<GitHubComment>(repoPath(env)+'/issues/'+row.issue_number+'/comments',token,{method:'POST',body:JSON.stringify({body})}))
   }
   const annotation=await syncIssue(await readIssue(row.issue_number,env,token),env,token)
   return json(await completeOperation(env,operation,{annotation,commentId:comment.id},comment.id),201)
  }finally{await unlockOperation(env,operation)}
 }
 if(match&&request.method==='POST'&&match[2]==='state') {
  const user=await authenticate(request,env),row=await annotationRow(match[1],env)
  const input=StateChangeSchema.parse(await readJson(request,12000)),token=await userToken(user,env)
  const issue=await readIssue(row.issue_number,env,token)
  if(!await canManage(issue,user,env))throw new HttpError(403,'state-permission','只有议题作者或具有GitHub处理权限的用户可以关闭或重开')
  const {operation,cached}=await beginOperation(env,user,input.idempotencyKey,'state:'+row.id,input)
  if(cached)return json(cached)
  try {
   let record=operation.attempted_at?await recoverOperationComment(row.issue_number,input.idempotencyKey,user.user_id,env,token):null
   if(!record&&operation.attempted_at)unresolvedOperation()
   if(!record) {
    const labels={resolved:'已解决',duplicate:'重复议题',outdated:'内容已更新','not-planned':'暂不处理'}
    const text=(input.state==='closed'?'关闭申请 · '+labels[input.reason!]: '重开申请')+'\n\n'+(input.explanation||'重新开始核查')+'\n\n处理是否完成以议题当前状态及处理记录为准。'
    const body=await embedMarker(text,{kind:'state',annotationId:row.id,state:input.state,reason:input.reason,explanation:input.explanation,operationKey:input.idempotencyKey,authorId:user.user_id},env.METADATA_SIGNING_KEY)
    record=await sendOnce(env,operation,()=>github<GitHubComment>(repoPath(env)+'/issues/'+row.issue_number+'/comments',token,{method:'POST',body:JSON.stringify({body})}))
   }
   // State PATCH is idempotent. The explanatory comment is recovered first,
   // so a failure between these two requests cannot duplicate that comment.
   const updated=await github<GitHubIssue>(repoPath(env)+'/issues/'+row.issue_number,token,{method:'PATCH',body:JSON.stringify({state:input.state,state_reason:input.state==='open'?'reopened':input.reason==='resolved'?'completed':'not_planned'})})
   const annotation=await syncIssue(updated,env,token)
   if(annotation)annotation.canClose=true
   return json(await completeOperation(env,operation,{annotation},record.id))
  }finally{await unlockOperation(env,operation)}
 }
 return null
}
