import fs from 'node:fs';
import {validateIndustryAnalysis,analysisRowAmount} from '../../../../src/research/industry-analysis';
const dir='research/industry-analysis/deep-reading/other-regions/';
const p=JSON.parse(fs.readFileSync(dir+'panel-data.json','utf8'));
const a=JSON.parse(fs.readFileSync(dir+'amendments.json','utf8'));
const data=validateIndustryAnalysis({...p,version:'2026-09-14.other-regions',checkedAt:'2026-09-14',distributions:[],coverage:[...p.coverage,...a.filter((x:any)=>x.collection==='coverage').map((x:any)=>x.replacement)]});
let n=0;for(const t of data.comparisons)for(const r of t.rows)for(const mode of ['cny-100m','usd-million'] as const){const v=analysisRowAmount(r,t,{mode,usdCny:6.71});if(v!==null&&!Number.isFinite(v))throw new Error('Nonfinite');n++}
console.log(JSON.stringify({sources:data.sources.length,comparisons:data.comparisons.length,findings:data.findings.length,coverage:data.coverage.length,currencyRowsChecked:n}));
