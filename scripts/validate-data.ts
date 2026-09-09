import { readFile } from 'node:fs/promises'
import { validateResearch,researchCoverage } from '../src/research/validate'
const data=validateResearch(JSON.parse(await readFile(new URL('../data/research.json',import.meta.url),'utf8')))
console.log(JSON.stringify({version:data.version,freezeStatus:data.freezeStatus,coverage:researchCoverage(data)},null,2))

