import {readFile,writeFile,mkdir} from 'node:fs/promises'
import {readResearch,writeResearch} from '../src/research/storage'
import {validateIndustryAnalysis} from '../src/research/industry-analysis'
import type {IndustryAnalysis} from '../src/research/schema'

const root=new URL('../',import.meta.url)
const read=async(path:string)=>JSON.parse(await readFile(new URL(path,root),'utf8'))
const distribution=await read('research/industry-analysis/distribution/data.json')
const sections=[]
for(const section of ['official','regions','companies']){
  const path='research/industry-analysis/'+section+'/panel-data.json'
  sections.push(await read(path))
}
const sources=new Map<string,IndustryAnalysis['sources'][number]>()
for(const source of [distribution,...sections].flatMap(s=>s.sources)){
  const previous=sources.get(source.id)
  if(previous&&JSON.stringify(previous)!==JSON.stringify(source))throw new Error('分析来源编号冲突：'+source.id)
  sources.set(source.id,source)
}
const data=await readResearch(new URL('data/research.json',root))
data.industryAnalysis=validateIndustryAnalysis({
  version:data.version,checkedAt:'2026-09-14',sources:[...sources.values()],
  distributions:[distribution.distribution],comparisons:sections.flatMap(s=>s.comparisons??[]),
  findings:sections.flatMap(s=>s.findings??[]),coverage:sections.flatMap(s=>s.coverage??[]),
})
await writeResearch(new URL('data/research.json',root),data)
await mkdir(new URL('docs/public/exports/',root),{recursive:true})
await writeFile(new URL('docs/public/exports/industry-analysis.json',root),JSON.stringify(data.industryAnalysis,null,2)+'\n')
await writeFile(new URL('research/industry-analysis/dataset.json',root),JSON.stringify(data.industryAnalysis,null,2)+'\n')
const researchPackage={version:data.version,checkedAt:data.industryAnalysis.checkedAt,view:data.industryAnalysis,
  official:await read('research/industry-analysis/official/analysis.json'),
  regions:{observations:await read('research/industry-analysis/regions/observations.json'),coverage:await read('research/industry-analysis/regions/coverage.json'),sources:await read('research/industry-analysis/regions/sources.json')},
  companies:Object.fromEntries(await Promise.all(['companies','metrics','derived','segments','sources','coverage'].map(async name=>[name,await read('research/industry-analysis/companies/'+name+'.json')]))),
  note:'原件见每条来源URL与SHA-256；图表数据和完整观测同时提供，重复记录不能重复求和。企业样本和地区经营资料不替代全国增加值。',
}
await writeFile(new URL('docs/public/exports/industry-analysis-research.json',root),JSON.stringify(researchPackage,null,2)+'\n')
console.log('Integrated industry analysis:',data.industryAnalysis.distributions[0].rows.length,'product records;',data.industryAnalysis.comparisons.length,'comparison tables;',sections.length,'research sections.')
