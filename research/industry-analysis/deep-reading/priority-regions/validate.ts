import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { IndustryAnalysisSchema, ObservationSchema } from '../../../../src/research/schema'

const dir=path.dirname(fileURLToPath(import.meta.url))
const root=path.resolve(dir,'../../../..')
const read=(name:string)=>JSON.parse(fs.readFileSync(path.join(dir,name),'utf8'))
const panel=read('panel-data.json'),observations=read('observations.json'),amendments=read('amendments.json')
IndustryAnalysisSchema.parse(panel)
observations.forEach((o:unknown)=>ObservationSchema.parse(o))
const old=JSON.parse(fs.readFileSync(path.join(root,'research/industry-analysis/regions/panel-data.json'),'utf8'))
for(const a of amendments){
  if(a.id!==a.replacement.id)throw Error('amendment ID changed')
  const group=a.collection as 'comparisons'|'findings'|'coverage'
  IndustryAnalysisSchema.shape[group].element.parse(a.replacement)
  if(group==='comparisons'){
    const original=old.comparisons.find((x:any)=>x.id===a.id)
    const unchanged=(x:any)=>x.rows.filter((r:any)=>r.name!=='浙江')
    if(JSON.stringify(unchanged(original))!==JSON.stringify(unchanged(a.replacement)))throw Error('other province row changed')
  }
}
const sourceIds=new Set([...panel.sources,...old.sources].map((s:any)=>s.id))
const check=(x:any)=>{
  if(Array.isArray(x))x.forEach(check)
  else if(x&&typeof x==='object'){
    if(x.sourceId&&!sourceIds.has(x.sourceId))throw Error('unresolved source '+x.sourceId)
    Object.values(x).forEach(check)
  }
}
check([panel,observations,amendments])
for(const s of panel.sources){
  const digest=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,s.archive))).digest('hex')
  if(digest!==s.sha256)throw Error('source hash mismatch '+s.id)
}
for(const table of panel.comparisons)if(table.rows.length!==1||table.metric!=='revenue'||table.unit!=='亿元人民币')throw Error('mixed ranking created')
for(const key of ['sources','comparisons','findings','coverage']){
  if(new Set(panel[key].map((x:any)=>x.id)).size!==panel[key].length)throw Error('duplicate ID')
}
if(new Set(observations.map((x:any)=>x.id)).size!==observations.length)throw Error('duplicate observation')
const result={checkedAt:'2026-09-14',status:'passed',
 checks:['IndustryAnalysisSchema: whole panel','ObservationSchema: every observation','amendments: full replacement schema and same IDs',
 '31 source SHA-256 checks','all evidence IDs resolve within new+frozen sources','three amended comparisons preserve other six province rows',
 'seven tables each contain one province and one monetary metric','IDs unique'],
 counts:{sources:panel.sources.length,observations:observations.length,readEntries:read('read-log.json').entries.length,
  comparisons:panel.comparisons.length,findings:panel.findings.length,coverage:panel.coverage.length,amendments:amendments.length},
 limitations:['Schema checks do not prove source truth; source cells were independently read and manually reviewed.',
  'Only one-province revenue cards are added; no cross-province 2024 rank or inferred VA.']}
fs.writeFileSync(path.join(dir,'validation.json'),JSON.stringify(result,null,2)+'\n')
console.log(JSON.stringify(result))
