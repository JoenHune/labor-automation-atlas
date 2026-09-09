import {readResearch,writeResearch} from '../src/research/storage'
import {readFile,writeFile} from 'node:fs/promises'
import {ProductivityDatasetSchema} from '../src/research/schema'
import {validateResearch} from '../src/research/validate'
import {validateProductivityDataset} from '../src/research/productivity'

const root=new URL('../',import.meta.url)
const read=async(path:string)=>JSON.parse(await readFile(new URL(path,root),'utf8'))
const data=await readResearch(new URL('data/research.json',root))
const datasets=await Promise.all((['cn','us'] as const).map(async country=>{
  const dataset=ProductivityDatasetSchema.parse(await read(`research/${country}/subindustry-productivity.json`))
  validateProductivityDataset(dataset)
  if(dataset.parents.some(p=>p.country!==country)||dataset.sources.some(s=>s.country!==country&&s.country!=='global'))throw new Error(country+'细分文件含另一国家数据')
  const selected=data.industries.filter((i:{country:string;selected:boolean})=>i.country===country&&i.selected)
  if(selected.some((i:{id:string})=>!dataset.parents.some(p=>p.parentIndustryId===i.id)))throw new Error(country+'入选行业尚缺细分资料或具体缺口说明')
  return dataset
}))
data.subindustryProductivity={version:data.version,checkedAt:data.checkedAt,sources:datasets.flatMap(d=>d.sources),parents:datasets.flatMap(d=>d.parents)}
const validated=validateResearch(data)
await writeResearch(new URL('data/research.json',root),validated)
console.log('Integrated subindustry data:',validated.subindustryProductivity!.parents.length,'parents;',validated.subindustryProductivity!.parents.reduce((n,p)=>n+p.rows.length,0),'year-specific rows.')
