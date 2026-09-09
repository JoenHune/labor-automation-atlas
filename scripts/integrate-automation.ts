import {readFile,writeFile} from 'node:fs/promises'
import {createHash} from 'node:crypto'
import {importCnServices} from '../src/research/import-cn-services'
import {validateResearch} from '../src/research/validate'
const root=new URL('../',import.meta.url)
const read=async(file:string)=>{const text=await readFile(new URL(file,root),'utf8');return {data:JSON.parse(text),sha256:createHash('sha256').update(text).digest('hex')}}
const data=(await read('data/research.json')).data
const file='research/automation/cn-services.json',auditFile='research/automation/cn-services-search-audit.json'
const raw=await read(file),audit=await read(auditFile)
const result=validateResearch(importCnServices(data,raw.data,audit.data,{file,sha256:raw.sha256,auditFile,auditSha256:audit.sha256}))
await writeFile(new URL('data/research.json',root),JSON.stringify(result,null,2)+'\n')
console.log('Integrated',raw.data.tasks.length,'CN service task research records. Definition revisions remain open; none are frozen.')
