import {readResearch} from '../src/research/storage'
import { readFile } from 'node:fs/promises'
import { validateResearch,researchCoverage } from '../src/research/validate'
import {assertPublicUrls} from '../src/research/public-urls'
import {createHash} from 'node:crypto'
const data=validateResearch(await readResearch(new URL('../data/research.json',import.meta.url)))
assertPublicUrls(data)
const manifest=JSON.parse(await readFile(new URL('../research/versions/'+data.version+'.json',import.meta.url),'utf8'))
await Promise.all(Object.entries(manifest.inputs as Record<string,string>).map(async([file,expected])=>{
 const raw=await readFile(new URL('../'+file,import.meta.url),'utf8')
 if(createHash('sha256').update(raw).digest('hex')!==expected)throw new Error('研究版本输入已变更：'+file)
 assertPublicUrls(file.endsWith('.json')?JSON.parse(raw):raw,file)
}))
console.log(JSON.stringify({version:data.version,freezeStatus:data.freezeStatus,coverage:researchCoverage(data)},null,2))
