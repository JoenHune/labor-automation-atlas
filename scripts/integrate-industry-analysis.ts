import {readFile,writeFile,mkdir} from 'node:fs/promises'
import {readResearch,writeResearch} from '../src/research/storage'
import {validateIndustryAnalysis} from '../src/research/industry-analysis'
import {applyAnalysisAmendments,type AnalysisAmendment} from '../src/research/analysis-amendments'
import type {IndustryAnalysis} from '../src/research/schema'

const root=new URL('../',import.meta.url)
const read=async(path:string)=>JSON.parse(await readFile(new URL(path,root),'utf8'))
const distribution=await read('research/industry-analysis/distribution/data.json')
const sections=[]
for(const section of ['official','regions','companies']){
  const path='research/industry-analysis/'+section+'/panel-data.json'
  sections.push(await read(path))
}
// All listed modules are required; a missing reading record must fail generation visibly.
const readingModules=['national','priority-regions','other-regions','company-notes']
const deepReading=[]
for(const module of readingModules){
  const path='research/industry-analysis/deep-reading/'+module+'/'
  const panel=await read(path+'panel-data.json')
  sections.push(panel)
  deepReading.push({module,panel,readLog:await read(path+'read-log.json'),
    observations:await read(path+'observations.json'),amendments:await read(path+'amendments.json') as AnalysisAmendment[],
    ...(module==='national'?{reconciliation:await read(path+'reconciliation.json')}:{}),
  })
}
const sources=new Map<string,IndustryAnalysis['sources'][number]>()
for(const source of [distribution,...sections].flatMap(s=>s.sources)){
  const previous=sources.get(source.id)
  if(previous&&JSON.stringify(previous)!==JSON.stringify(source))throw new Error('分析来源编号冲突：'+source.id)
  sources.set(source.id,source)
}
const data=await readResearch(new URL('data/research.json',root))
data.industryAnalysis=validateIndustryAnalysis(applyAnalysisAmendments({
  version:data.version,checkedAt:'2026-09-14',sources:[...sources.values()],
  distributions:[distribution.distribution],comparisons:sections.flatMap(s=>s.comparisons??[]),
  findings:sections.flatMap(s=>s.findings??[]),coverage:sections.flatMap(s=>s.coverage??[]),
},deepReading.flatMap(section=>section.amendments)))
await writeResearch(new URL('data/research.json',root),data)
await mkdir(new URL('docs/public/exports/',root),{recursive:true})
await writeFile(new URL('docs/public/exports/industry-analysis.json',root),JSON.stringify(data.industryAnalysis,null,2)+'\n')
await writeFile(new URL('research/industry-analysis/dataset.json',root),JSON.stringify(data.industryAnalysis,null,2)+'\n')
const researchPackage={version:data.version,checkedAt:data.industryAnalysis.checkedAt,view:data.industryAnalysis,
  official:await read('research/industry-analysis/official/analysis.json'),
  regions:{observations:await read('research/industry-analysis/regions/observations.json'),coverage:await read('research/industry-analysis/regions/coverage.json'),sources:await read('research/industry-analysis/regions/sources.json')},
  companies:Object.fromEntries(await Promise.all(['companies','metrics','derived','segments','sources','coverage'].map(async name=>[name,await read('research/industry-analysis/companies/'+name+'.json')]))),
  deepReading,
  note:'原件见每条来源URL与SHA-256；图表数据和完整观测同时提供，重复记录不能重复求和。企业样本和地区经营资料不替代全国增加值。',
}
await writeFile(new URL('docs/public/exports/industry-analysis-research.json',root),JSON.stringify(researchPackage,null,2)+'\n')
await writeFile(new URL('docs/public/exports/industry-reading-log.json',root),JSON.stringify({version:data.version,checkedAt:data.industryAnalysis.checkedAt,
  note:'按模块保存实际读表/读页范围、仅定位与未读边界；下载、OCR和候选页命中不等于阅读。旧数据保留在完整研究包，amendments明确当前视图的修订。',
  modules:deepReading.map(({module,readLog,amendments})=>({module,readLog,amendments})),
},null,2)+'\n')
console.log('Integrated industry analysis:',data.industryAnalysis.distributions[0].rows.length,'product records;',data.industryAnalysis.comparisons.length,'comparison tables;',sections.length,'research sections.')
