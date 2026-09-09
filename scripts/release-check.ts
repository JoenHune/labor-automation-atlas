import {readResearch} from '../src/research/storage'
import { readFile } from 'node:fs/promises'
import { validateResearch } from '../src/research/validate'
const data=validateResearch(await readResearch(new URL('../data/research.json',import.meta.url)))
const acceptance=JSON.parse(await readFile(new URL('../research/acceptance.json',import.meta.url),'utf8'))
const errors:string[]=[]
if(data.freezeStatus!=='frozen') errors.push('研究清单尚未冻结')
for(const i of data.industries.filter(i=>i.selected)) {
  const scenarios=data.scenarios.filter(s=>s.industryId===i.id)
  if(!scenarios.length) errors.push(i.id+': 没有场景和任务覆盖')
  if(!data.tasks.some(t=>t.industryId===i.id)) errors.push(i.id+': 没有任务')
}
for(const c of ['cn','us']) if(!data.industries.some(i=>i.country===c && i.selected)) errors.push(c+': 没有行业榜单')
for(const item of acceptance.checks) if(item.status!=='passed'||!item.evidence?.length) errors.push(item.id+': 验收未通过或没有证据')
if(errors.length) { console.error(errors.join('\n')); process.exit(1) }
console.log('发布验收记录完整。')

