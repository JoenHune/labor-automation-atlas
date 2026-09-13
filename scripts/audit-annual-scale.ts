import {readFile,writeFile,mkdir} from 'node:fs/promises'
import {dirname} from 'node:path'
import {industryScale} from '../src/research/industry-scale'
import type {ScaleNode} from '../src/research/industry-scale'
import type {Country,Research} from '../src/research/schema'

const research=JSON.parse(await readFile(new URL('../data/site.json',import.meta.url),'utf8')) as Research
const rows:{country:Country;year:number;id:string;parentId:string|null;name:string;depth:number;value:number|null;unit:string;revision:string;releaseDate:string|null;coverage:string;evidence:ScaleNode['evidence'];gap:string}[]=[]
for(const country of ['cn','us'] as const)for(const year of [2024,2025]){
 const visit=(node:ScaleNode,depth:number)=>{
  rows.push({country,year,id:node.id,parentId:node.parentId,name:node.name,depth,value:node.value,unit:node.unit,revision:node.revision,releaseDate:node.releaseDate,coverage:node.coverage,evidence:node.evidence,gap:node.gap})
  node.children.forEach(n=>visit(n,depth+1))
 }
 industryScale(research,country,year).forEach(n=>visit(n,0))
}
const summary=(['cn','us'] as const).flatMap(country=>[2024,2025].map(year=>{
 const selected=rows.filter(r=>r.country===country&&r.year===year)
 return {country,year,rootCount:selected.filter(r=>r.depth===0).length,identifiedChildren:selected.filter(r=>r.depth>0).length,childrenWithValue:selected.filter(r=>r.depth>0&&r.value!==null).length,childrenWithoutValue:selected.filter(r=>r.depth>0&&r.value===null).length}
}))
const report={researchVersion:research.version,scope:'图谱中已识别的行业分类及2024/2025金额接入状态；分类清单不构成完整官方统计层级证明，未接入数值不等于官方未公开。',summary,rows}
const output=process.argv[2]
if(output){await mkdir(dirname(output),{recursive:true});await writeFile(output,JSON.stringify(report,null,2)+'\n')}
console.log(JSON.stringify(summary,null,2))
