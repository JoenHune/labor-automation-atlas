import {createHash,randomUUID} from 'node:crypto'
import {promises as fs,readFileSync,realpathSync,statSync} from 'node:fs'
import {basename,dirname,isAbsolute,relative,resolve,sep} from 'node:path'
import {fileURLToPath} from 'node:url'
import {TextDecoder} from 'node:util'
import type {Research} from './schema'

export const RESEARCH_STORAGE_FORMAT='labor-automation-atlas-research-shards-v1' as const
const collections=['countries','industries','observations','scenarios','tasks','sources','claims','searches'] as const
type Collection=typeof collections[number]
type JsonObject=Record<string,unknown>
interface Shard {path:string;sha256:string;bytes:number;recordCount:number}
export interface ResearchStorageManifest {
  format:typeof RESEARCH_STORAGE_FORMAT
  /** All non-collection properties; keyOrder restores original top-level order. */
  metadata:JsonObject
  keyOrder:string[]
  totalRecords:number
  totalShards:number
  totalBytes:number
  collections:{name:Collection;recordCount:number;shards:Shard[]}[]
}
const assert:(ok:unknown,message:string)=>asserts ok=(ok,message)=>{if(!ok)throw new Error('研究存储：'+message)}
const isObject=(value:unknown):value is JsonObject=>value!==null && typeof value==='object' && !Array.isArray(value)
const own=(value:object,key:string)=>Object.prototype.hasOwnProperty.call(value,key)
const safeInteger=(value:unknown):value is number=>typeof value==='number' && Number.isSafeInteger(value) && value>=0
const sha256=(bytes:Uint8Array)=>createHash('sha256').update(bytes).digest('hex')
const pathFor=(path:string|URL)=>resolve(path instanceof URL?fileURLToPath(path):path)
const inside=(root:string,target:string)=>{const path=relative(root,target);return path!=='' && !isAbsolute(path) && path!=='..' && !path.startsWith('..'+sep)}
const shardName=(manifestPath:string,name:Collection,index:number,sha:string)=>`${basename(manifestPath)}.shards/${name}-${index}-${sha}.json`
const exactKeys=(object:JsonObject,keys:string[])=>Object.keys(object).length===keys.length && keys.every(k=>own(object,k))

function parse(bytes:Uint8Array,label:string):unknown {
  try{return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes))}
  catch(error){throw new Error('研究存储：无效 JSON 或 UTF-8：'+label,{cause:error})}
}

/** JSON storage deliberately performs no research-schema normalization. Call
 * validateResearch separately: it may reorder object properties or add defaults. */
function assertResearchShape(value:unknown):asserts value is Research {
  assert(isObject(value),'研究必须是对象')
  for(const name of collections)assert(own(value,name) && Array.isArray(value[name]),'缺少研究数组：'+name)
}

function decodeManifest(value:unknown,path:string):Research|ResearchStorageManifest {
  assert(isObject(value),'研究文件必须是对象')
  if(!own(value,'format')){assertResearchShape(value);return value}
  assert(value.format===RESEARCH_STORAGE_FORMAT,'未知存储 format')
  assert(exactKeys(value,['format','metadata','keyOrder','totalRecords','totalShards','totalBytes','collections']),'清单字段不完整或未知')
  assert(isObject(value.metadata),'metadata 必须是对象')
  assert(collections.every(k=>!own(value.metadata as object,k)),'metadata 不得重复包含研究数组')
  const keys=[...Object.keys(value.metadata),...collections]
  assert(Array.isArray(value.keyOrder) && value.keyOrder.every(k=>typeof k==='string') && value.keyOrder.length===keys.length && new Set(value.keyOrder).size===keys.length && keys.every(k=>(value.keyOrder as string[]).includes(k)),'keyOrder 存在重复或缺失字段')
  assert(safeInteger(value.totalRecords) && safeInteger(value.totalShards) && safeInteger(value.totalBytes),'总计必须是非负安全整数')
  assert(Array.isArray(value.collections) && value.collections.length===collections.length,'研究集合重复或缺失')
  let totalRecords=0,totalShards=0,totalBytes=0
  const paths=new Set<string>()
  for(const [index,c] of value.collections.entries()){
    assert(isObject(c) && exactKeys(c,['name','recordCount','shards']) && c.name===collections[index] && safeInteger(c.recordCount) && Array.isArray(c.shards),'研究集合顺序、名称或计数错误')
    let count=0
    for(const [i,s] of c.shards.entries()){
      assert(isObject(s) && exactKeys(s,['path','sha256','bytes','recordCount']),'分片字段不完整或未知')
      assert(typeof s.path==='string' && !isAbsolute(s.path) && !s.path.includes('\\') && !s.path.split('/').some(p=>p==='..' || p==='.' || p===''),'分片路径必须位于清单相对目录内')
      assert(typeof s.sha256==='string' && /^[a-f0-9]{64}$/.test(s.sha256) && safeInteger(s.bytes) && s.bytes>0 && safeInteger(s.recordCount) && s.recordCount>0,'分片哈希、字节数或记录数错误')
      assert(s.path===shardName(path,c.name as Collection,i,s.sha256),'分片路径、序号与内容哈希不匹配')
      assert(!paths.has(s.path),'重复分片路径');paths.add(s.path)
      count+=s.recordCount;totalBytes+=s.bytes;totalShards++
    }
    assert(Number.isSafeInteger(count) && count===c.recordCount,'集合记录总数不匹配：'+c.name)
    totalRecords+=count
  }
  assert(Number.isSafeInteger(totalRecords) && Number.isSafeInteger(totalBytes) && totalRecords===value.totalRecords && totalShards===value.totalShards && totalBytes===value.totalBytes,'清单总数不匹配')
  return value as unknown as ResearchStorageManifest
}

function restore(manifest:ResearchStorageManifest,records:Record<Collection,unknown[]>):Research {
  const data=Object.fromEntries(manifest.keyOrder.map(k=>[k,own(records,k)?records[k as Collection]:manifest.metadata[k]]))
  assertResearchShape(data)
  return data
}

function checkShard(bytes:Buffer,s:Shard):unknown[] {
  assert(bytes.byteLength===s.bytes,'分片字节数不匹配：'+s.path)
  assert(sha256(bytes)===s.sha256,'分片 SHA256 不匹配：'+s.path)
  const rows=parse(bytes,s.path)
  assert(Array.isArray(rows) && rows.length===s.recordCount,'分片记录数不匹配：'+s.path)
  return rows
}

async function realShard(root:string,path:string):Promise<string> {
  const actual=await fs.realpath(path)
  assert(inside(root,actual),'分片符号链接越出清单目录')
  assert((await fs.stat(actual)).isFile(),'分片必须是普通文件')
  return actual
}
function realShardSync(root:string,path:string):string {
  const actual=realpathSync(path)
  assert(inside(root,actual),'分片符号链接越出清单目录')
  assert(statSync(actual).isFile(),'分片必须是普通文件')
  return actual
}

export async function readResearch(path:string|URL):Promise<Research> {
  const target=pathFor(path),value=decodeManifest(parse(await fs.readFile(target),target),target)
  if(!own(value,'format'))return value as Research
  const manifest=value as ResearchStorageManifest,root=await fs.realpath(dirname(target)),records={} as Record<Collection,unknown[]>
  for(const c of manifest.collections){
    const rows:unknown[]=[]
    for(const s of c.shards){
      const actual=await realShard(root,resolve(dirname(target),s.path))
      for(const row of checkShard(await fs.readFile(actual),s))rows.push(row)
    }
    assert(rows.length===c.recordCount,'集合读取数不匹配：'+c.name);records[c.name]=rows
  }
  return restore(manifest,records)
}

export function readResearchSync(path:string|URL):Research {
  const target=pathFor(path),value=decodeManifest(parse(readFileSync(target),target),target)
  if(!own(value,'format'))return value as Research
  const manifest=value as ResearchStorageManifest,root=realpathSync(dirname(target)),records={} as Record<Collection,unknown[]>
  for(const c of manifest.collections){
    const rows:unknown[]=[]
    for(const s of c.shards){
      const actual=realShardSync(root,resolve(dirname(target),s.path))
      for(const row of checkShard(readFileSync(actual),s))rows.push(row)
    }
    assert(rows.length===c.recordCount,'集合读取数不匹配：'+c.name);records[c.name]=rows
  }
  return restore(manifest,records)
}

/** Standard JSON semantics omit undefined object properties. Other non-JSON
 * values are rejected rather than silently becoming null or changing a number. */
function stringify(value:unknown):string {
  const text=JSON.stringify(value,function(key,item:unknown){
    const original=(this as JsonObject)[key]
    assert(original===null || typeof original!=='object' || Array.isArray(original) || Object.getPrototypeOf(original)===Object.prototype || Object.getPrototypeOf(original)===null,'不可保存非 JSON 对象')
    assert(typeof item!=='number' || (Number.isFinite(item) && !Object.is(item,-0)),'不可无损保存非有限数值或负零')
    assert(!['bigint','function','symbol'].includes(typeof item),'不可保存非 JSON 值')
    assert(item!==undefined || (!Array.isArray(this) && key!==''),'数组或顶层不能含 undefined')
    return item
  })
  assert(typeof text==='string','不可保存空 JSON 值')
  return text
}

async function atomicWrite(path:string,bytes:Buffer):Promise<void> {
  const temp=path+'.tmp-'+randomUUID()
  try{
    const file=await fs.open(temp,'wx')
    try{await file.writeFile(bytes);await file.sync()}finally{await file.close()}
    await fs.rename(temp,path)
  }finally{
    // No operation that can turn a successful publication into a failure follows
    // rename. Abandoned content shards are intentionally not garbage-collected.
    await fs.unlink(temp).catch(()=>{})
  }
}

/** 3 MiB target, with single oversized records stored alone. Content-addressed
 * shards are completed before the manifest atomically switches to the new set.
 * Old shards stay available to readers that have already loaded an old manifest. */
export async function writeResearch(path:string|URL,data:Research,options:{targetShardBytes?:number}={}):Promise<void> {
  assertResearchShape(data)
  const target=pathFor(path),limit=options.targetShardBytes??3*1024*1024
  assert(Number.isSafeInteger(limit) && limit>0,'targetShardBytes 必须是正安全整数')
  const keyOrder=Object.keys(data),metadata=Object.fromEntries(keyOrder.filter(k=>!(collections as readonly string[]).includes(k)).map(k=>[k,(data as unknown as JsonObject)[k]]))
  const storedMetadata=parse(Buffer.from(stringify(metadata)),'metadata') as JsonObject
  // Optional undefined metadata follows JSON semantics; no phantom key survives.
  const storedKeys=keyOrder.filter(k=>(collections as readonly string[]).includes(k) || own(storedMetadata,k))
  const manifest:ResearchStorageManifest={format:RESEARCH_STORAGE_FORMAT,metadata:storedMetadata,keyOrder:storedKeys,totalRecords:0,totalShards:0,totalBytes:0,collections:[]}
  await fs.mkdir(dirname(target),{recursive:true})
  const root=await fs.realpath(dirname(target)),shardDir=resolve(dirname(target),basename(target)+'.shards')
  await fs.mkdir(shardDir,{recursive:true})
  assert(inside(root,await fs.realpath(shardDir)),'分片目录符号链接越出清单目录')
  for(const name of collections){
    const c:ResearchStorageManifest['collections'][number]={name,recordCount:data[name].length,shards:[]}
    let pieces:string[]=[],bytes=5
    const flush=async()=>{
      if(!pieces.length)return
      const content=Buffer.from('[\n'+pieces.join(',\n')+'\n]\n','utf8'),sha=sha256(content),relativePath=shardName(target,name,c.shards.length,sha),absolute=resolve(dirname(target),relativePath)
      const shard:Shard={path:relativePath,sha256:sha,bytes:content.byteLength,recordCount:pieces.length}
      try{
        // Existing names are immutable: refuse corruption instead of overwriting
        // a file that an older manifest or concurrent reader could be using.
        const actual=await realShard(root,absolute)
        const existing=await fs.readFile(actual)
        assert(existing.byteLength===content.byteLength && sha256(existing)===sha,'已有内容哈希分片损坏，拒绝覆盖：'+relativePath)
      }catch(error){
        if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error
        await atomicWrite(absolute,content)
      }
      c.shards.push(shard);manifest.totalBytes+=shard.bytes;manifest.totalShards++;pieces=[];bytes=5
    }
    for(const record of data[name]){
      const text=stringify(record),size=Buffer.byteLength(text,'utf8')
      if(pieces.length && bytes+2+size>limit)await flush()
      bytes+=size+(pieces.length?2:0);pieces.push(text)
      if(bytes>=limit)await flush()
    }
    await flush();manifest.totalRecords+=c.recordCount;manifest.collections.push(c)
  }
  // Validate our own complete descriptor before publishing. This also rejects
  // unsafe manifest basenames that would make generated relative paths invalid.
  decodeManifest(manifest,target)
  await atomicWrite(target,Buffer.from(JSON.stringify(manifest,null,2)+'\n','utf8'))
}
