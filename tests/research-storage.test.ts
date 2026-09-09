import {createHash} from 'node:crypto'
import {promises as fs} from 'node:fs'
import {tmpdir} from 'node:os'
import {dirname,join} from 'node:path'
import {pathToFileURL} from 'node:url'
import {afterEach,describe,expect,it,vi} from 'vitest'
import {RESEARCH_STORAGE_FORMAT,readResearch,readResearchSync,writeResearch} from '../src/research/storage'
import type {ResearchStorageManifest} from '../src/research/storage'
import type {Research} from '../src/research/schema'

type Raw=Record<string,any>
const roots:string[]=[]
const names=['countries','industries','observations','scenarios','tasks','sources','claims','searches'] as const
const digest=(bytes:Buffer)=>createHash('sha256').update(bytes).digest('hex')
const location=async()=>{const root=await fs.mkdtemp(join(tmpdir(),'atlas-storage-'));roots.push(root);return join(root,'研究 manifest.json')}
const manifest=async(path:string):Promise<ResearchStorageManifest>=>JSON.parse(await fs.readFile(path,'utf8'))
const editManifest=async(path:string,change:(m:Raw)=>void)=>{const m=await manifest(path);change(m);await fs.writeFile(path,JSON.stringify(m))}
const firstShard=async(path:string)=>{const m=await manifest(path);return m.collections.flatMap(c=>c.shards)[0]!}
const rejectBoth=async(path:string,pattern:RegExp)=>{await expect(readResearch(path)).rejects.toThrow(pattern);expect(()=>readResearchSync(path)).toThrow(pattern)}

// A tiny JSON-domain fixture exercises storage without coupling it to the
// current research schema. Domain validation remains the caller's responsibility.
const fixture=():Research=>({
  note:{z:'中文，𠀋🙂 and \"quoted\"\n\t',a:null,n:0,negative:-2.75,order:{last:1,first:2}},
  tasks:Array.from({length:9},(_,i)=>({z:'任务 '+i,a:{right:[null,0,'ä中'],left:'交付'},n:i})),
  version:'test-json-storage',countries:[{country:'cn',label:'中国'},{country:'us',label:'美国'}],
  checkedAt:'2026-09-09',sources:[{id:'source-1',value:'evidence'},{id:'source-2',value:null}],
  publishedAt:null,freezeStatus:'working',observations:[{value:0,currency:'CNY'},{value:2.125,currency:'USD'}],
  industries:[{id:'cn-trade'},{id:'us-trade'}],scenarios:[{id:'scenario-2'},{id:'scenario-1'}],
  claims:[{id:'claim-2',text:'有限适用'},{id:'claim-1',text:'待核'}],searches:[{query:'真实检索',time:null}],
  extra:Object.fromEntries([['__proto__',{safe:'own key'}],['second','b'],['first','a']]),
}) as unknown as Research

afterEach(async()=>{vi.restoreAllMocks();await Promise.all(roots.splice(0).map(root=>fs.rm(root,{recursive:true,force:true})))})

describe('immutable research shards and atomic manifest publication',()=>{
  it('reads legacy full JSON through paths and file URLs without normalization or writes',async()=>{
    const path=await location(),data=fixture(),serialized=JSON.stringify(data)
    await fs.writeFile(path,serialized)
    expect(JSON.stringify(await readResearch(path))).toBe(serialized)
    expect(JSON.stringify(readResearchSync(pathToFileURL(path)))).toBe(serialized)
    expect(await fs.readdir(dirname(path))).toEqual(['研究 manifest.json'])
  })

  it('round-trips Unicode, null, zero, metadata and all object-key/array orders exactly',async()=>{
    const path=await location(),data=fixture(),serialized=JSON.stringify(data)
    await writeResearch(pathToFileURL(path),data,{targetShardBytes:190})
    expect(JSON.stringify(data)).toBe(serialized)
    expect(JSON.stringify(await readResearch(pathToFileURL(path)))).toBe(serialized)
    expect(JSON.stringify(readResearchSync(path))).toBe(serialized)
    const m=await manifest(path)
    expect(m.format).toBe(RESEARCH_STORAGE_FORMAT)
    expect(m.keyOrder).toEqual(Object.keys(data))
    expect(m.collections.map(c=>c.name)).toEqual(names)
    expect(Object.keys(m.metadata)).toEqual(Object.keys(data).filter(k=>!names.includes(k as typeof names[number])))
    expect(Object.prototype.hasOwnProperty.call((await readResearch(path) as unknown as Raw).extra,'__proto__')).toBe(true)
    let records=0,bytes=0,shards=0
    for(const c of m.collections){
      expect(c.recordCount).toBe(data[c.name].length)
      for(const s of c.shards){
        const body=await fs.readFile(join(dirname(path),s.path))
        expect(s.bytes).toBe(body.byteLength);expect(s.sha256).toBe(digest(body));expect(s.path).toContain(s.sha256)
        expect(s.recordCount).toBe(JSON.parse(new TextDecoder().decode(body)).length)
        expect(body.byteLength).toBeLessThanOrEqual(190)
        records+=s.recordCount;bytes+=s.bytes;shards++
      }
    }
    expect(m.totalRecords).toBe(records);expect(m.totalBytes).toBe(bytes);expect(m.totalShards).toBe(shards)
  })

  it('stores an oversized record alone and distinct repeated chunks retain their positions',async()=>{
    const path=await location(),data=fixture()
    ;(data as unknown as Raw).tasks=[{s:'重复中'},{s:'重复中'},{s:'中'.repeat(400)},{s:'末项'}]
    await writeResearch(path,data,{targetShardBytes:25})
    const c=(await manifest(path)).collections.find(c=>c.name==='tasks')!
    expect(c.shards).toHaveLength(4)
    expect(c.shards[0].sha256).toBe(c.shards[1].sha256)
    expect(c.shards[0].path).not.toBe(c.shards[1].path)
    expect(c.shards[2].bytes).toBeGreaterThan(25);expect(c.shards[2].recordCount).toBe(1)
    expect(JSON.stringify(await readResearch(path))).toBe(JSON.stringify(data))
  })

  it('represents empty arrays with zero shards while preserving all eight arrays',async()=>{
    const path=await location(),data=fixture()
    for(const name of names)data[name]=[]
    await writeResearch(path,data)
    const m=await manifest(path)
    expect(m.totalRecords).toBe(0);expect(m.totalShards).toBe(0);expect(m.totalBytes).toBe(0)
    expect(m.collections.every(c=>c.shards.length===0 && c.recordCount===0)).toBe(true)
    expect(await readResearch(path)).toStrictEqual(data);expect(readResearchSync(path)).toStrictEqual(data)
  })

  it.each(['different-size','same-size','missing'] as const)('rejects %s chunk damage in async and sync readers',async mode=>{
    const path=await location();await writeResearch(path,fixture(),{targetShardBytes:190})
    const s=await firstShard(path),file=join(dirname(path),s.path),body=await fs.readFile(file)
    if(mode==='missing')await fs.unlink(file)
    else if(mode==='different-size')await fs.appendFile(file,' ')
    else{body[body.indexOf(Buffer.from('cn'))]='x'.charCodeAt(0);await fs.writeFile(file,body)}
    await rejectBoth(path,mode==='missing'?/ENOENT/:mode==='same-size'?/SHA256/:/字节数/)
  })

  it.each(['total-records','total-bytes','total-shards','collection-count','record-count','duplicate-shard','missing-shard','duplicate-collection','missing-collection','reordered-shards','duplicate-key','missing-key','metadata-array','unknown-field'] as const)('rejects manifest %s corruption',async mode=>{
    const path=await location();await writeResearch(path,fixture(),{targetShardBytes:100})
    await editManifest(path,m=>{
      const c=m.collections.find((c:Raw)=>c.name==='tasks')
      if(mode==='total-records')m.totalRecords++
      if(mode==='total-bytes')m.totalBytes++
      if(mode==='total-shards')m.totalShards++
      if(mode==='collection-count')c.recordCount++
      if(mode==='record-count'){c.shards[0].recordCount++;c.recordCount++;m.totalRecords++}
      if(mode==='duplicate-shard'){c.shards.push(c.shards[0]);c.recordCount+=c.shards[0].recordCount;m.totalRecords+=c.shards[0].recordCount;m.totalShards++;m.totalBytes+=c.shards[0].bytes}
      if(mode==='missing-shard')c.shards.pop()
      if(mode==='duplicate-collection')m.collections[1]=m.collections[0]
      if(mode==='missing-collection')m.collections.pop()
      if(mode==='reordered-shards')c.shards.reverse()
      if(mode==='duplicate-key')m.keyOrder[1]=m.keyOrder[0]
      if(mode==='missing-key')m.keyOrder.pop()
      if(mode==='metadata-array')m.metadata.tasks=[]
      if(mode==='unknown-field')c.shards[0].extra='not-in-v1'
    })
    await rejectBoth(path,/研究存储：/)
  })

  it.each(['../outside.json','/absolute.json','https://example.com/chunk.json','chunks\\outside.json','./chunk.json','a//chunk.json'] as const)('rejects unsafe relative path %s',async unsafe=>{
    const path=await location();await writeResearch(path,fixture())
    await editManifest(path,m=>{m.collections[0].shards[0].path=unsafe})
    await rejectBoth(path,/路径/)
  })

  it('rejects a shard symlink that leaves the manifest directory even with correct bytes',async()=>{
    const path=await location(),outside=await location();await writeResearch(path,fixture())
    const s=await firstShard(path),target=join(dirname(path),s.path)
    await fs.copyFile(target,outside);await fs.unlink(target);await fs.symlink(outside,target)
    await rejectBoth(path,/符号链接越出/)
    const original=await fs.readFile(path)
    await expect(writeResearch(path,fixture())).rejects.toThrow('符号链接越出')
    expect(await fs.readFile(path)).toEqual(original)
  })

  it('refuses a shard-directory symlink outside the manifest directory before writing shards',async()=>{
    const path=await location(),outside=dirname(await location()),data=fixture()
    await fs.writeFile(path,JSON.stringify(data));await fs.symlink(outside,path+'.shards','dir')
    await expect(writeResearch(path,data)).rejects.toThrow('符号链接越出')
    expect(await fs.readdir(outside)).toEqual([]);expect(await readResearch(path)).toEqual(data)
  })

  it.each(['unknown-format','non-object','missing-array','invalid-utf8'] as const)('rejects %s input without misreading it as legacy research',async mode=>{
    const path=await location(),data=fixture() as unknown as Raw
    if(mode==='unknown-format')data.format='labor-automation-atlas-research-shards-v2'
    if(mode==='missing-array')delete data.tasks
    await fs.writeFile(path,mode==='invalid-utf8'?Buffer.from([0xff,0x7b,0x7d]):JSON.stringify(mode==='non-object'?[]:data))
    await rejectBoth(path,/研究存储：/)
  })

  it('writes the same bytes and shard names for identical data without rewriting existing shards',async()=>{
    const path=await location(),data=fixture();await writeResearch(path,data,{targetShardBytes:190})
    const first=await fs.readFile(path),m=await manifest(path),paths=m.collections.flatMap(c=>c.shards.map(s=>s.path))
    const states=await Promise.all(paths.map(async p=>({p,bytes:await fs.readFile(join(dirname(path),p)),mtime:(await fs.stat(join(dirname(path),p))).mtimeMs})))
    await writeResearch(path,structuredClone(data),{targetShardBytes:190})
    expect(await fs.readFile(path)).toEqual(first)
    expect((await manifest(path)).collections.flatMap(c=>c.shards.map(s=>s.path))).toEqual(paths)
    for(const s of states){expect(await fs.readFile(join(dirname(path),s.p))).toEqual(s.bytes);expect((await fs.stat(join(dirname(path),s.p))).mtimeMs).toBe(s.mtime)}
  })

  it('keeps the old manifest readable if publication rename fails after new shards finish',async()=>{
    const path=await location(),old=fixture();await writeResearch(path,old,{targetShardBytes:190})
    const oldBytes=await fs.readFile(path),oldManifest=await manifest(path),updated=fixture()
    ;(updated as unknown as Raw).tasks.push({new:'新证据'});
    const realRename=fs.rename.bind(fs)
    vi.spyOn(fs,'rename').mockImplementation(async(from,to)=>{if(String(to)===path)throw Object.assign(new Error('injected publication failure'),{code:'EIO'});return realRename(from,to)})
    await expect(writeResearch(path,updated,{targetShardBytes:190})).rejects.toThrow('injected publication failure')
    expect(await fs.readFile(path)).toEqual(oldBytes)
    expect(await readResearch(path)).toStrictEqual(old);expect(readResearchSync(path)).toStrictEqual(old)
    for(const s of oldManifest.collections.flatMap(c=>c.shards))expect(await fs.readFile(join(dirname(path),s.path))).toBeDefined()
    expect((await fs.readdir(dirname(path))).some(p=>p.includes('.tmp-'))).toBe(false)
    expect((await fs.readdir(path+'.shards')).some(p=>p.includes('.tmp-'))).toBe(false)
  })

  it('does not garbage-collect old shards when publishing a new manifest',async()=>{
    const path=await location(),old=fixture();await writeResearch(path,old,{targetShardBytes:100})
    const bytes=await fs.readFile(path),m=await manifest(path),next=fixture()
    next.tasks=[];next.sources=[];await writeResearch(path,next,{targetShardBytes:100})
    expect(await readResearch(path)).toStrictEqual(next)
    for(const s of m.collections.flatMap(c=>c.shards))expect(digest(await fs.readFile(join(dirname(path),s.path)))).toBe(s.sha256)
    // This simulates a reader's already-loaded old manifest at the same location.
    await fs.writeFile(path,bytes);expect(await readResearch(path)).toStrictEqual(old)
  })

  it('refuses to overwrite corrupted files bearing an existing content hash',async()=>{
    const path=await location(),data=fixture();await writeResearch(path,data)
    const original=await fs.readFile(path),s=await firstShard(path),file=join(dirname(path),s.path)
    await fs.writeFile(file,'corrupted')
    await expect(writeResearch(path,data)).rejects.toThrow('已有内容哈希分片损坏')
    expect(await fs.readFile(path)).toEqual(original);expect(await fs.readFile(file,'utf8')).toBe('corrupted')
  })

  it.each([0,-1,1.5,Infinity,NaN])('rejects invalid shard target %s without touching a legacy manifest',async target=>{
    const path=await location(),data=fixture(),text=JSON.stringify(data);await fs.writeFile(path,text)
    await expect(writeResearch(path,data,{targetShardBytes:target})).rejects.toThrow('targetShardBytes')
    expect(await fs.readFile(path,'utf8')).toBe(text)
  })

  it.each(['nan','infinity','negative-zero','undefined-array','date','map','bigint','cyclic'] as const)('rejects non-JSON %s without publishing over the old data',async mode=>{
    const path=await location(),old=fixture();await writeResearch(path,old)
    const bytes=await fs.readFile(path),data=fixture() as unknown as Raw
    const value:Record<typeof mode,unknown>={nan:NaN,infinity:Infinity,'negative-zero':-0,'undefined-array':undefined,date:new Date('2026-09-09'),map:new Map([['a',1]]),bigint:1n,cyclic:data}
    data.tasks=[value[mode]]
    await expect(writeResearch(path,data as Research)).rejects.toThrow()
    expect(await fs.readFile(path)).toEqual(bytes);expect(await readResearch(path)).toStrictEqual(old)
  })

  it('uses ordinary JSON semantics for optional undefined object fields',async()=>{
    const path=await location(),data=fixture() as unknown as Raw
    data.optional=undefined;data.tasks[0].optional=undefined
    await writeResearch(path,data as Research)
    expect(JSON.stringify(await readResearch(path))).toBe(JSON.stringify(data))
    expect((await manifest(path)).keyOrder).not.toContain('optional')
  })
})
