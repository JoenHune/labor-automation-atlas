import {readResearch} from '../src/research/storage'
import {readFile,writeFile,mkdir,rm} from 'node:fs/promises'
import {validateResearch} from '../src/research/validate'
import {createTaskPageBuilder,type IndustryPage} from '../src/research/site'
const root=new URL('../',import.meta.url)
const data=validateResearch(await readResearch(new URL('data/research.json',root)))
const taskPage=createTaskPageBuilder(data)
const json=(v:unknown)=>JSON.stringify(v,null,2)+'\n'
const put=async(path:string,body:string)=>{if(await readFile(new URL(path,root),'utf8').catch(()=>null)===body)return;await mkdir(new URL(path.slice(0,path.lastIndexOf('/'))+'/',root),{recursive:true});await writeFile(new URL(path,root),body)}
const samples=data.tasks.filter(t=>!t.discovery)
const sampleIds=new Set(samples.map(t=>t.id))
await put('data/site.json',json({...data,tasks:samples,claims:data.claims.filter(c=>c.taskId&&sampleIds.has(c.taskId)),searches:data.searches.filter(s=>sampleIds.has(s.taskId)),scenarios:data.scenarios.filter(s=>samples.some(t=>t.scenarioId===s.id))}))
for(const country of ['cn','us'])await put('docs/public/exports/task-search-'+country+'.json',json({country,version:data.version,tasks:data.tasks.filter(t=>t.country===country).map(({id,title,country,industryId,scenarioId,phase,researchStatus,countingRole})=>({id,title,country,industryId,scenarioId,phase,researchStatus,countingRole})),industries:data.industries.filter(i=>i.country===country&&i.selected).map(({id,name})=>({id,name}))}))
const files:string[]=[]
function page(title:string,component:string,path:string) {return '---\ntitle: '+JSON.stringify(title)+'\n---\n<script setup>\nimport record from '+JSON.stringify(path)+'\n</script>\n<'+component+' :record="record" />\n'}
for(const i of data.industries.filter(i=>i.selected)) {
 const record:IndustryPage={industry:i,observation:data.observations.find(o=>o.industryId===i.id&&o.period==='2025'&&o.measure==='value-added')??null,scenarios:data.scenarios.filter(s=>s.industryId===i.id),tasks:data.tasks.filter(t=>t.industryId===i.id).map(({id,title,country,industryId,scenarioId,phase,researchStatus,summary,countingRole})=>({id,title,country,industryId,scenarioId,phase,researchStatus,summary,countingRole}))}
 const path='docs/'+i.country+'/industries/'+i.id+'.md';files.push(path)
 await put('docs/.generated/industries/'+i.id+'.json',json(record))
 await put(path,page(i.name,'IndustryView','../../.generated/industries/'+i.id+'.json'))
}
for(const t of data.tasks) {
 const record=taskPage(t)
 const path='docs/'+t.country+'/tasks/'+t.id+'.md';files.push(path)
 if(t.discovery){await put('docs/.generated/tasks/'+t.id+'.json',json(record));await put(path,page(t.title,'CandidateTaskView','../../.generated/tasks/'+t.id+'.json'))}
 else await put(path,'---\ntitle: '+JSON.stringify(t.title)+'\n---\n<TaskView task-id="'+t.id+'" />\n')
 await put('docs/public/exports/'+t.id+'.json',json(record))
}
const old:string[]=JSON.parse(await readFile(new URL('docs/.generated/pages-manifest.json',root),'utf8').catch(()=>'[]'))
for(const path of old)if(!files.includes(path)&&/^docs\/(cn|us)\/(industries|tasks)\/[a-z0-9.-]+\.md$/.test(path))await rm(new URL(path,root),{force:true})
await put('docs/.generated/pages-manifest.json',json(files))
await put('docs/public/exports/research.json',json(data))
await put('docs/methodology.md',await readFile(new URL('research/methodology.md',root),'utf8'))
console.log('Generated',data.industries.filter(i=>i.selected).length,'industry pages and',data.tasks.length,'task pages. Detailed records load with their own page.')
