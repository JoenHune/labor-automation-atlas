import {readFile} from 'node:fs/promises'
import {readResearch,writeResearch} from '../src/research/storage'
import {validateMacroStructures} from '../src/research/macro-structure'
const root=new URL('../',import.meta.url)
const data=await readResearch(new URL('data/research.json',root))
data.version='2026-09-10.preview-14'
data.checkedAt='2026-09-10'
data.macroStructures=validateMacroStructures(JSON.parse(await readFile(new URL('research/macro/structures.json',root),'utf8')))
if(data.subindustryProductivity)data.subindustryProductivity.version=data.version
await writeResearch(new URL('data/research.json',root),data)
console.log('Integrated macro structures:',data.macroStructures.structures.length)
