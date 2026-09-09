import type { Anchor,Annotation,ThreadComment } from '../src/annotations/schema'
import { type Env,type Session,HttpError,now } from './types'
import {github,installationToken,repoPath} from './github'
import {userToken} from './auth'
import {readMarker,stripMarkers,type Marker} from './metadata'
export interface GitHubUser {id:number;login:string;avatar_url:string}
export interface GitHubIssue {id:number;number:number;title:string;body:string|null;state:'open'|'closed';user:GitHubUser;html_url:string;created_at:string;updated_at:string;pull_request?:unknown;locked:boolean}
export interface GitHubComment {id:number;body:string|null;user:GitHubUser;created_at:string;updated_at:string;issue_url:string}
export interface GitHubEvent {id:number;event:string;actor:GitHubUser|null;created_at:string}
export interface AnnotationRow {id:string;country:string;page:string;anchor_json:string;issue_number:number;author_id:number;state:string;cached_json:string;synced_at:number;deleted_at:number|null}
export async function paginated<T>(path:string,token:string,maxPages=20):Promise<T[]> {
 const all:T[]=[]
 for(let page=1;page<=maxPages;page++) {
  const items=await github<T[]>(path+(path.includes('?')?'&':'?')+'per_page=100&page='+page,token)
  all.push(...items)
  if(items.length<100)return all
 }
 throw new HttpError(503,'pagination-incomplete','GitHub内容量超出单次同步范围，暂时保留上次结果')
}
export async function annotationRow(id:string,env:Env) {
 const row=await env.DB.prepare('SELECT * FROM annotations WHERE id=?').bind(id).first<AnnotationRow>()
 if(!row)throw new HttpError(404,'annotation-not-found','批注尚未同步或不存在')
 if(row.deleted_at)throw new HttpError(410,'annotation-deleted','原GitHub议题已删除')
 return row
}
export async function canManage(issue:GitHubIssue,user:Session|null,env:Env) {
 if(!user)return false
 if(issue.user.id===user.user_id)return true
 const repo=await github<{permissions?:{admin?:boolean;maintain?:boolean;push?:boolean;triage?:boolean}}>(repoPath(env),await userToken(user,env))
 return Boolean(repo.permissions?.admin||repo.permissions?.maintain||repo.permissions?.push||repo.permissions?.triage)
}
export async function readIssue(number:number,env:Env,token?:string) {
 return github<GitHubIssue>(repoPath(env)+'/issues/'+number,token??await installationToken(env))
}
export async function issueComments(number:number,env:Env,token:string) {
 return paginated<GitHubComment>(repoPath(env)+'/issues/'+number+'/comments',token)
}
export async function syncIssue(issue:GitHubIssue,env:Env,token:string):Promise<Annotation|null> {
 if(issue.pull_request)return null
 const old=await env.DB.prepare('SELECT * FROM annotations WHERE issue_number=?').bind(issue.number).first<AnnotationRow>()
 const marker=await readMarker(issue.body??'',env.METADATA_SIGNING_KEY,issue.user.id)
 // Only signed anchors create an index. If an Issue body is edited and its
 // marker removed, retain the existing anchor instead of silently moving it.
 const anchor:Anchor|undefined=old?JSON.parse(old.anchor_json):marker?.kind==='anchor'?marker.anchor:undefined
 if(!anchor)return null
 if(!old) {
  const collision=await env.DB.prepare('SELECT issue_number FROM annotations WHERE id=?').bind(anchor.id).first<{issue_number:number}>()
  if(collision&&collision.issue_number!==issue.number)return null
 }
 const [comments,events]=await Promise.all([
  issueComments(issue.number,env,token),
  paginated<GitHubEvent>(repoPath(env)+'/issues/'+issue.number+'/events',token),
 ])
 const recovered: {comment:GitHubComment;marker:Marker|null}[]=[]
 for(const comment of comments)recovered.push({comment,marker:await readMarker(comment.body??'',env.METADATA_SIGNING_KEY,comment.user.id)})
 const ids=new Set(comments.map(c=>c.id))
 const threadComments:ThreadComment[]=recovered.map(({comment,marker})=>{
  const parent=marker?.kind==='reply'&&marker.annotationId===anchor.id?marker.parentCommentId:null
  return {id:comment.id,body:stripMarkers(comment.body??''),author:comment.user.login,avatarUrl:comment.user.avatar_url,createdAt:comment.created_at,parentCommentId:parent,parentDeleted:parent!==null&&!ids.has(parent)}
 })
 for(const c of threadComments) {
  const visited=new Set<number>([c.id]);let parent=c.parentCommentId
  while(parent!==null) {
   if(visited.has(parent)){c.parentCommentId=null;c.parentInvalid=true;c.parentDeleted=false;break}
   visited.add(parent);parent=threadComments.find(x=>x.id===parent)?.parentCommentId??null
  }
 }
 const history:Annotation['history']=events.filter(e=>e.event==='closed'||e.event==='reopened').map(event=>{
  const state=event.event==='closed'?'closed':'open'
  const matched=recovered.filter(x=>x.marker?.kind==='state'&&x.marker.annotationId===anchor.id&&x.marker.state===state&&x.comment.user.login===event.actor?.login&&Date.parse(x.comment.created_at)<=Date.parse(event.created_at)&&Date.parse(event.created_at)-Date.parse(x.comment.created_at)<120000).at(-1)
  const reason=matched?.marker?.kind==='state'?matched.marker.reason:null
  const explanation=matched?.marker?.kind==='state'?matched.marker.explanation:'在GitHub直接操作；未提供站内处理说明'
  return {actor:event.actor?.login??'GitHub',state,reason,explanation,at:event.created_at}
 })
 const annotation:Annotation={id:anchor.id,country:anchor.country,page:anchor.page,anchor,issueNumber:issue.number,title:issue.title,body:stripMarkers(issue.body??''),author:issue.user.login,avatarUrl:issue.user.avatar_url,state:issue.state,createdAt:issue.created_at,updatedAt:issue.updated_at,fetchedAt:new Date().toISOString(),comments:threadComments,canClose:false,issueUrl:issue.html_url,history}
 const statements=[env.DB.prepare('INSERT INTO annotations(id,country,page,anchor_json,issue_number,author_id,state,cached_json,github_updated_at,synced_at) VALUES(?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET state=excluded.state,cached_json=excluded.cached_json,github_updated_at=excluded.github_updated_at,synced_at=excluded.synced_at,deleted_at=NULL')
  .bind(anchor.id,anchor.country,anchor.page,JSON.stringify(anchor),issue.number,issue.user.id,issue.state,JSON.stringify(annotation),issue.updated_at,now()),
  env.DB.prepare('UPDATE comment_metadata SET deleted=1 WHERE annotation_id=?').bind(anchor.id)]
 for(const {comment,marker} of recovered)if(marker?.kind==='reply'&&marker.annotationId===anchor.id)statements.push(env.DB.prepare('INSERT INTO comment_metadata(comment_id,annotation_id,parent_comment_id,metadata_json) VALUES(?,?,?,?) ON CONFLICT(comment_id) DO UPDATE SET parent_comment_id=excluded.parent_comment_id,metadata_json=excluded.metadata_json,deleted=0').bind(comment.id,anchor.id,marker.parentCommentId,JSON.stringify(marker)))
 // cached_json contains the entire recovered thread in one write. Auxiliary
 // metadata is repaired in bounded atomic batches and is not used for display.
 for(let offset=0;offset<statements.length;offset+=80)await env.DB.batch(statements.slice(offset,offset+80))
 if(anchor.snapshotId)await env.DB.prepare('UPDATE snapshots SET annotation_id=?,expires_at=NULL WHERE id=? AND country=? AND page=?').bind(anchor.id,anchor.snapshotId,anchor.country,anchor.page).run()
 return annotation
}
export async function refreshIndex(env:Env) {
 const key='issue-index',stamp=await env.DB.prepare('SELECT fetched_at FROM github_cache WHERE cache_key=?').bind(key).first<{fetched_at:number}>()
 if(stamp&&now()-stamp.fetched_at<30)return
 const started=now(),token=await installationToken(env)
 const since=stamp?'&since='+encodeURIComponent(new Date((stamp.fetched_at-120)*1000).toISOString()):''
 const issues=await paginated<GitHubIssue>(repoPath(env)+'/issues?state=all&sort=updated&direction=desc'+since,token)
 for(const issue of issues)await syncIssue(issue,env,token)
 await env.DB.prepare('INSERT INTO github_cache(cache_key,value_json,fetched_at,expires_at) VALUES(?,?,?,?) ON CONFLICT(cache_key) DO UPDATE SET fetched_at=excluded.fetched_at,expires_at=excluded.expires_at').bind(key,'{}',started,started+30).run()
}
export async function recoverOperationIssue(key:string,userId:number,env:Env,token:string) {
 const issues=await paginated<GitHubIssue>(repoPath(env)+'/issues?state=all&sort=created&direction=desc',token)
 for(const issue of issues)if(!issue.pull_request&&issue.user.id===userId) {
  const marker=await readMarker(issue.body??'',env.METADATA_SIGNING_KEY,issue.user.id)
  if(marker?.kind==='anchor'&&marker.operationKey===key)return issue
 }
 return null
}
export async function recoverOperationComment(number:number,key:string,userId:number,env:Env,token:string) {
 const comments=await issueComments(number,env,token)
 for(const comment of comments)if(comment.user.id===userId) {
  const marker=await readMarker(comment.body??'',env.METADATA_SIGNING_KEY,comment.user.id)
  if(marker&&marker.kind!=='anchor'&&marker.operationKey===key)return comment
 }
 return null
}
