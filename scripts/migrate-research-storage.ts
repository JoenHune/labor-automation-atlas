import {createHash} from 'node:crypto'
import {readResearch,readResearchSync,writeResearch} from '../src/research/storage'
import {validateResearch} from '../src/research/validate'

const path=new URL('../data/research.json',import.meta.url)
const digest=(value:unknown)=>createHash('sha256').update(JSON.stringify(value)).digest('hex')
const before=await readResearch(path),expected=digest(before)
validateResearch(before)
await writeResearch(path,before)
const after=await readResearch(path),sync=readResearchSync(path)
if(digest(after)!==expected || digest(sync)!==expected)throw new Error('研究分片迁移未能保留完整逻辑数据')
console.log(JSON.stringify({version:after.version,logicalSha256:expected,tasks:after.tasks.length,claims:after.claims.length,asyncAndSyncReadsIdentical:true}))
