import { readFile,writeFile,mkdir } from 'node:fs/promises'
import { validateResearch } from '../src/research/validate'
const root=new URL('../',import.meta.url)
const data=validateResearch(JSON.parse(await readFile(new URL('data/research.json',root),'utf8')))
for(const country of ['cn','us']) {
 await mkdir(new URL('docs/'+country+'/industries/',root),{recursive:true})
 await mkdir(new URL('docs/'+country+'/tasks/',root),{recursive:true})
}
for(const i of data.industries.filter(i=>i.selected)) await writeFile(new URL('docs/'+i.country+'/industries/'+i.id+'.md',root),'---\ntitle: '+i.name+'\n---\n<IndustryView industry-id="'+i.id+'" />\n')
for(const t of data.tasks) {
 await writeFile(new URL('docs/'+t.country+'/tasks/'+t.id+'.md',root),'---\ntitle: '+t.title+'\n---\n<TaskView task-id="'+t.id+'" />\n')
 await writeFile(new URL('docs/public/exports/'+t.id+'.json',root),JSON.stringify(t.dossier??t,null,2)+'\n')
}
await writeFile(new URL('docs/methodology.md',root),await readFile(new URL('research/methodology.md',root),'utf8'))
console.log('Generated',data.industries.filter(i=>i.selected).length,'industry pages and',data.tasks.length,'task pages.')

