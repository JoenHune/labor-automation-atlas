import {beforeEach,afterEach,it,expect,vi} from 'vitest'
import {DatabaseSync} from 'node:sqlite'
import {readFileSync} from 'node:fs'
import {generateKeyPairSync} from 'node:crypto'
import worker from '../worker/index'
import type {Env} from '../worker/types'
import {encrypt,randomToken,sha256,sign,unb64} from '../worker/security'
import {privateKeyDer} from '../worker/github'
import {validatePng} from '../worker/snapshots'
import {cleanup} from '../worker/maintenance'
import {safeMarkdown} from '../src/annotations/markdown'
import type {GitHubIssue,GitHubComment,GitHubEvent} from '../worker/discussions'
let sql:DatabaseSync,env:Env,siteToken:string,issues:GitHubIssue[],comments:GitHubComment[],events:GitHubEvent[],sequence:number,dropAfterCreate:boolean,postCount:number
const actor={id:42,login:'reviewer',avatar_url:'https://avatars.githubusercontent.com/u/42'}
function fakeD1(database:DatabaseSync) {
 function prepare(query:string,values:unknown[]=[]) {
  return {bind:(...params:unknown[])=>prepare(query,params),first:async(column?:string)=>{const result=database.prepare(query).get(...values as any[]) as any;return column?result?.[column]??null:result??null},
   all:async()=>({success:true,results:database.prepare(query).all(...values as any[]),meta:{}}),
   run:async()=>({success:true,results:[],meta:database.prepare(query).run(...values as any[])})}
 }
 return {prepare,batch:async(statements:any[])=>{database.exec('BEGIN');try{const out=[];for(const statement of statements)out.push(await statement.run());database.exec('COMMIT');return out}catch(error){database.exec('ROLLBACK');throw error}}} as unknown as D1Database
}
const timestamp=()=>new Date().toISOString()
async function request(path:string,body?:unknown,method?:string) {
 return worker.fetch(new Request('https://api.example.test'+path,{method:method??(body?'POST':'GET'),headers:{Origin:env.SITE_ORIGIN,Authorization:'Bearer '+siteToken,...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined}),env)
}
async function fixture() {
 const snapshotId=crypto.randomUUID(),id=crypto.randomUUID()
 sql.prepare('INSERT INTO snapshots(id,user_id,country,page,object_key,sha256,bytes,width,height,created_at) VALUES(?,?,?,?,?,?,?,?,?,?)').run(snapshotId,42,'cn','/cn/','regions/cn/'+snapshotId,'hash',10,1,1,Math.floor(Date.now()/1000))
 return {idempotencyKey:crypto.randomUUID(),body:'人工工时是否已测量？',anchor:{schema:1,id,country:'cn',page:'/cn/',researchVersion:'test-version',targets:[{contentId:'cn-gdp-2025',kind:'block',fingerprint:'a'.repeat(64),text:null,rect:{x:0,y:0,width:1,height:1},dataPoints:[]}],view:{year:2025,focus:'cn-gdp',sort:'value',filters:{}},selectedText:'',snapshotId,capturedAt:timestamp()}}
}
beforeEach(async()=>{
 sql=new DatabaseSync(':memory:');for(const name of ['0001_initial.sql','0002_tombstone.sql','0003_snapshot_recovery.sql'])sql.exec(readFileSync(new URL('../worker/migrations/'+name,import.meta.url),'utf8'))
 env={DB:fakeD1(sql),SNAPSHOTS:{} as R2Bucket,SITE_ORIGIN:'https://site.example.test',SITE_BASE_PATH:'/atlas/',API_ORIGIN:'https://api.example.test',GITHUB_OWNER:'owner',GITHUB_REPO:'atlas',GITHUB_REPOSITORY_ID:'91',GITHUB_INSTALLATION_ID:'73',GITHUB_APP_ID:'99',GITHUB_APP_PRIVATE_KEY:'',GITHUB_CLIENT_ID:'client',GITHUB_CLIENT_SECRET:'client-secret',TOKEN_ENCRYPTION_KEY:randomToken(),METADATA_SIGNING_KEY:randomToken(),GITHUB_WEBHOOK_SECRET:'webhook-secret'}
 siteToken=randomToken();const now=Math.floor(Date.now()/1000)
 sql.prepare('INSERT INTO sessions VALUES(?,?,?,?,?,?,?,?)').run(await sha256(siteToken),42,'reviewer',actor.avatar_url,await encrypt('user-access',env.TOKEN_ENCRYPTION_KEY),now,now+3600,now+3600)
 sql.prepare('INSERT INTO github_cache VALUES(?,?,?,?)').run('installation-token:73',await encrypt('installation-read',env.TOKEN_ENCRYPTION_KEY),now,now+3600)
 issues=[];comments=[];events=[];sequence=100;dropAfterCreate=false;postCount=0
 vi.stubGlobal('fetch',vi.fn(async(input:string,init:RequestInit={})=>{
  const url=new URL(input),method=init.method??'GET',body=init.body?JSON.parse(String(init.body)):null
  if(url.origin!=='https://api.github.com')throw new Error('Unexpected network')
  const p=url.pathname,headers=new Headers(init.headers),isWrite=['POST','PATCH'].includes(method)
  if(isWrite)expect(headers.get('Authorization')).toBe('Bearer user-access')
  if(p==='/repos/owner/atlas')return Response.json({permissions:{push:false,triage:false}})
  if(p==='/repos/owner/atlas/issues'&&method==='POST') {
   postCount++;const issue:GitHubIssue={id:++sequence,number:issues.length+1,title:body.title,body:body.body,state:'open',user:actor,html_url:'https://github.com/owner/atlas/issues/'+(issues.length+1),created_at:timestamp(),updated_at:timestamp(),locked:false};issues.push(issue)
   if(dropAfterCreate){dropAfterCreate=false;throw new TypeError('Simulated dropped response')}
   return Response.json(issue,{status:201})
  }
  if(p==='/repos/owner/atlas/issues')return Response.json(issues)
  const match=p.match(/\/issues\/(\d+)(?:\/(comments|events))?$/)
  if(!match)throw new Error('Unexpected GitHub path '+p)
  const issue=issues.find(i=>i.number===Number(match[1]));if(!issue)return Response.json({}, {status:404})
  if(match[2]==='events')return Response.json(events)
  if(match[2]==='comments'&&method==='GET')return Response.json(comments.filter(c=>c.issue_url.endsWith('/'+issue.number)))
  if(match[2]==='comments'&&method==='POST') {
   postCount++;const c:GitHubComment={id:++sequence,body:body.body,user:actor,created_at:timestamp(),updated_at:timestamp(),issue_url:'https://api.github.com/repos/owner/atlas/issues/'+issue.number};comments.push(c);return Response.json(c,{status:201})
  }
  if(method==='PATCH'){issue.state=body.state;issue.updated_at=timestamp();events.push({id:++sequence,event:body.state==='open'?'reopened':'closed',actor,created_at:timestamp()})}
  return Response.json(issue)
 }))
})
afterEach(()=>{sql.close();vi.unstubAllGlobals()})
it('真实用户令牌写入，重复提交同一批注只发一个Issue',async()=>{
 const input=await fixture(),first=await request('/annotations',input)
 expect(first.status).toBe(201);const result=await first.json() as any
 expect(result.annotation.author).toBe('reviewer');expect(result.annotation.anchor.country).toBe('cn')
 expect((await request('/annotations',input)).status).toBe(200);expect(postCount).toBe(1)
 expect((await request('/annotations',{...input,body:'不同正文'})).status).toBe(409)
})
it('GitHub已创建但响应丢失时从签名标记恢复，不重复POST',async()=>{
 const input=await fixture();dropAfterCreate=true
 expect((await request('/annotations',input)).status).toBe(503)
 expect(issues).toHaveLength(1)
 expect((await request('/annotations',input)).status).toBe(201)
 expect(postCount).toBe(1)
})
it('折叠视图经提交和结构化Issue标记重建后保持原值（本地模拟）',async()=>{
 const base=await fixture(),disclosures=[{id:'cn-disclosure-cash',fingerprint:'b'.repeat(64),open:true},{id:'cn-disclosure-source',fingerprint:'c'.repeat(64),open:false}]
 const input={...base,anchor:{...base.anchor,view:{...base.anchor.view,disclosures}}}
 const created=await request('/annotations',input)
 expect(created.status).toBe(201)
 expect((await created.json() as any).annotation.anchor.view.disclosures).toEqual(disclosures)
 const stored=sql.prepare('SELECT anchor_json FROM annotations WHERE id=?').get(input.anchor.id) as {anchor_json:string}
 expect(JSON.parse(stored.anchor_json).view.disclosures).toEqual(disclosures)
 sql.exec("UPDATE snapshots SET annotation_id=NULL; DELETE FROM annotations; DELETE FROM github_cache WHERE cache_key='issue-index'")
 const rebuilt=await request('/annotations?country=cn&page=%2Fcn%2F')
 expect(rebuilt.status).toBe(200)
 expect((await rebuilt.json() as any).annotations[0].anchor.view.disclosures).toEqual(disclosures)
 expect(issues).toHaveLength(1);expect(postCount).toBe(1)
})
it('拒绝跨国家快照和伪造父评论，删除父评论后回复关联仍可恢复',async()=>{
 const input=await fixture()
 expect((await request('/annotations',{...input,anchor:{...input.anchor,country:'us'}})).status).toBe(400)
 await request('/annotations',input);const id=input.anchor.id
 expect((await request('/annotations/'+id+'/comments',{body:'回复',parentCommentId:999,idempotencyKey:crypto.randomUUID()})).status).toBe(410)
 const parent=await request('/annotations/'+id+'/comments',{body:'普通补充',parentCommentId:null,idempotencyKey:crypto.randomUUID()});const parentId=(await parent.json() as any).commentId
 await request('/annotations/'+id+'/comments',{body:'回复该补充',parentCommentId:parentId,idempotencyKey:crypto.randomUUID()})
 comments=comments.filter(c=>c.id!==parentId)
 comments.push({id:888,body:'直接在GitHub发表',user:actor,created_at:timestamp(),updated_at:timestamp(),issue_url:'https://api.github.com/repos/owner/atlas/issues/1'})
 const fresh=await (await request('/annotations/'+id)).json() as any
 expect(fresh.annotation.comments.find((c:any)=>c.body==='回复该补充').parentDeleted).toBe(true)
 expect(fresh.annotation.comments.find((c:any)=>c.id===888).parentCommentId).toBeNull()
})
it('关闭原因必填、非作者拒绝，站内关闭/重开恢复处理记录',async()=>{
 const input=await fixture();await request('/annotations',input);const path='/annotations/'+input.anchor.id+'/state'
 expect((await request(path,{state:'closed',reason:null,explanation:'',idempotencyKey:crypto.randomUUID()})).status).toBe(400)
 issues[0].user={...actor,id:777}
 expect((await request(path,{state:'closed',reason:'resolved',explanation:'证据已核对',idempotencyKey:crypto.randomUUID()})).status).toBe(403)
 issues[0].user=actor
 const key=crypto.randomUUID(),close={state:'closed',reason:'resolved',explanation:'证据已核对',idempotencyKey:key}
 const closed=await (await request(path,close)).json() as any
 expect(closed.annotation.state).toBe('closed');expect(closed.annotation.history[0].explanation).toBe('证据已核对')
 await request(path,close);expect(comments).toHaveLength(1)
 const reopened=await (await request(path,{state:'open',reason:null,explanation:'新增资料',idempotencyKey:crypto.randomUUID()})).json() as any
 expect(reopened.annotation.state).toBe('open');expect(reopened.annotation.history).toHaveLength(2)
})
it('Webhook验签、仓库隔离、去重及直接GitHub状态同步',async()=>{
 const input=await fixture();await request('/annotations',input);issues[0].state='closed'
 const raw=JSON.stringify({action:'closed',repository:{id:91,full_name:'owner/atlas'},installation:{id:73},issue:{number:1}}),digest=unb64(await sign(raw,env.GITHUB_WEBHOOK_SECRET))
 const signature='sha256='+Array.from(digest).map(b=>b.toString(16).padStart(2,'0')).join(''),delivery=crypto.randomUUID()
 const call=(sig:string)=>worker.fetch(new Request('https://api.example.test/webhook',{method:'POST',headers:{'X-Hub-Signature-256':sig,'X-GitHub-Delivery':delivery,'X-GitHub-Event':'issues'},body:raw}),env)
 expect((await call('sha256='+'0'.repeat(64))).status).toBe(401)
 expect((await call(signature)).status).toBe(200)
 expect((await (await call(signature)).json() as any).duplicate).toBe(true)
 expect((sql.prepare('SELECT state FROM annotations').get() as any).state).toBe('closed')
})
it('不向客户端返回GitHub凭证，授权过期拒绝写入',async()=>{
 const response=await request('/session'),text=await response.text();expect(text).not.toContain('user-access');expect(text).not.toContain('token_cipher')
 sql.prepare('UPDATE sessions SET expires_at=1').run()
 expect((await request('/annotations',await fixture())).status).toBe(401);expect(postCount).toBe(0)
})
it('超过100条批注分页无遗漏且同更新时间不重复，国家及删除记录隔离',async()=>{
 const stamp=timestamp(),at=Math.floor(Date.now()/1000),expected:string[]=[]
 sql.prepare('INSERT INTO github_cache VALUES(?,?,?,?)').run('issue-index','{}',at,at+30)
 const insert=sql.prepare('INSERT INTO annotations(id,country,page,anchor_json,issue_number,author_id,state,cached_json,github_updated_at,synced_at,deleted_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)')
 for(let i=0;i<109;i++) {
  const id=crypto.randomUUID(),country=i<107?'cn':'us',deleted=i===106?at:null
  if(country==='cn'&&!deleted)expected.push(id)
  insert.run(id,country,'/'+country+'/','{}',i+1,42,'open',JSON.stringify({id,country}),stamp,at,deleted)
 }
 const first=await (await request('/annotations?country=cn&page=%2Fcn%2F')).json() as any
 expect(first.annotations).toHaveLength(100);expect(first.nextCursor).toBeTruthy()
 const second=await (await request('/annotations?country=cn&page=%2Fcn%2F&cursor='+first.nextCursor)).json() as any
 expect(second.annotations).toHaveLength(6);expect(second.nextCursor).toBeNull()
 expect([...first.annotations,...second.annotations].map((a:any)=>a.id).sort()).toEqual(expected.sort())
 expect((await request('/annotations?country=cn&page=%2Fus%2F')).status).toBe(400)
 expect((await request('/annotations?country=cn&page=%2Fcn%2F&cursor=bad')).status).toBe(400)
})
it('支持GitHub下载的PKCS#1私钥及PKCS#8',async()=>{
 const {privateKey}=generateKeyPairSync('rsa',{modulusLength:2048})
 for(const type of ['pkcs1','pkcs8'] as const) {
  const key=await crypto.subtle.importKey('pkcs8',privateKeyDer(privateKey.export({type,format:'pem'}).toString()),{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['sign'])
  expect((await crypto.subtle.sign('RSASSA-PKCS1-v1_5',key,new TextEncoder().encode('test'))).byteLength).toBe(256)
 }
})
it('评论Markdown禁用脚本、事件和远程图片自动加载',()=>{
 const rendered=safeMarkdown('<img src=x onerror=alert(1)>\n\n[unsafe](javascript:alert(1))\n\n![pic](https://remote.test/p.png)')
 expect(rendered).not.toMatch(/<img|<script|href="javascript:/)
 expect(rendered).toContain('&lt;img');expect(rendered).toContain('noopener noreferrer nofollow')
})
it('快照拒绝伪装文件、校验损坏及尾部附加数据',()=>{
 const png=Uint8Array.from(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAADUlEQVQImWP4////fwAJ+wP9CNHoHgAAAABJRU5ErkJggg==','base64'))
 expect(validatePng(png)).toEqual({width:1,height:1})
 expect(()=>validatePng(new TextEncoder().encode('<svg onload="alert(1)"/>'))).toThrow()
 const bad=png.slice();bad[16]=255;expect(()=>validatePng(bad)).toThrow()
 expect(()=>validatePng(new Uint8Array([...png,1,2,3]))).toThrow()
})
const snapshotPng=()=>Uint8Array.from(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAADUlEQVQImWP4////fwAJ+wP9CNHoHgAAAABJRU5ErkJggg==','base64'))
async function uploadSnapshot(id:string,country='cn',page='/cn/') {
 return worker.fetch(new Request('https://api.example.test/snapshots',{method:'POST',headers:{Origin:env.SITE_ORIGIN,Authorization:'Bearer '+siteToken,'Content-Type':'image/png','X-Atlas-Snapshot-Id':id,'X-Atlas-Country':country,'X-Atlas-Page':encodeURIComponent(page)},body:snapshotPng()}),env)
}
it('快照存储失败保留可重试上传，未完成上传不能创建Issue',async()=>{
 const input=await fixture();sql.prepare('DELETE FROM snapshots').run()
 const put=vi.fn().mockRejectedValueOnce(new Error('storage unavailable')).mockResolvedValue({})
 env.SNAPSHOTS={put} as unknown as R2Bucket
 expect((await uploadSnapshot(input.anchor.snapshotId)).status).toBe(503)
 expect((sql.prepare('SELECT upload_status FROM snapshots').get() as any).upload_status).toBe('pending')
 expect((await request('/annotations',input)).status).toBe(400);expect(postCount).toBe(0)
 expect((await uploadSnapshot(input.anchor.snapshotId)).status).toBe(201)
 expect((sql.prepare('SELECT upload_status FROM snapshots').get() as any).upload_status).toBe('ready')
 expect((await request('/annotations',input)).status).toBe(201)
 expect((await uploadSnapshot(input.anchor.snapshotId)).status).toBe(200);expect(put).toHaveBeenCalledTimes(2)
})
it('并发争用同一快照编号时不同页面的请求不能覆盖获胜内容',async()=>{
 const id=crypto.randomUUID(),put=vi.fn().mockResolvedValue({});env.SNAPSHOTS={put} as unknown as R2Bucket
 const responses=await Promise.all([uploadSnapshot(id,'cn','/cn/'),uploadSnapshot(id,'us','/us/')])
 expect(responses.map(r=>r.status).sort()).toEqual([201,409]);expect(put).toHaveBeenCalledTimes(1)
 const row=sql.prepare('SELECT country,object_key FROM snapshots').get() as any
 expect(put.mock.calls[0][0]).toBe(row.object_key);expect(row.object_key).toContain('/'+row.country+'/')
})
it('快照清理遇存储故障保留删除队列，不删除仍附着的快照',async()=>{
 const input=await fixture();await request('/annotations',input)
 const second=await fixture();sql.prepare('UPDATE snapshots SET expires_at=1').run()
 const remove=vi.fn().mockRejectedValueOnce(new Error('storage unavailable')).mockResolvedValue(undefined)
 env.SNAPSHOTS={delete:remove} as unknown as R2Bucket
 await cleanup(env)
 expect(sql.prepare('SELECT id FROM snapshots WHERE id=?').get(input.anchor.snapshotId)).toBeTruthy()
 expect(sql.prepare('SELECT id FROM snapshots WHERE id=?').get(second.anchor.snapshotId)).toBeUndefined()
 expect(sql.prepare('SELECT * FROM snapshot_gc').all()).toHaveLength(1)
 await cleanup(env);expect(sql.prepare('SELECT * FROM snapshot_gc').all()).toHaveLength(0)
 expect(remove).toHaveBeenCalledTimes(2)
})
