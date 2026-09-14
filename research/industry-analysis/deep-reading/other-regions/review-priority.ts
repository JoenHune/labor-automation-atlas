import fs from 'node:fs';
import {validateIndustryAnalysis} from '../../../../src/research/industry-analysis';
const parse=(p:string)=>JSON.parse(fs.readFileSync(p,'utf8'));
const dir='research/industry-analysis/deep-reading/priority-regions/';
const p=parse(dir+'panel-data.json'),a=parse(dir+'amendments.json'),old=parse('research/industry-analysis/regions/panel-data.json');
const all={...p,sources:[...new Map([...old.sources,...p.sources].map((s:any)=>[s.id,s])).values()]};
for(const group of ['comparisons','findings','coverage']) all[group]=[...p[group],...a.filter((x:any)=>x.collection===group).map((x:any)=>x.replacement)];
const d=validateIndustryAnalysis({...all,version:'2026-09-14.independent-priority',checkedAt:'2026-09-14',distributions:[]});
console.log(JSON.stringify({comparisons:d.comparisons.length,coverage:d.coverage.length,sources:d.sources.length}));
