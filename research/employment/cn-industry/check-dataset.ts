import fs from 'node:fs'
import { validateEmployment } from '../../../src/research/employment'
const file = new URL('./dataset.json', import.meta.url)
const data = validateEmployment(JSON.parse(fs.readFileSync(file,'utf8')))
const inventory = JSON.parse(fs.readFileSync(new URL('../node-inventory.json', import.meta.url),'utf8')).records.filter((x:any)=>x.country==='cn'&&x.basis==='annual-industry')
for(const node of inventory){
 const r=data.records.find(r=>r.nodeId===node.nodeId&&r.year===node.year)
 if(!r || r.nodeName!==node.name || r.valueAddedAnchor.baseValue!==node.valueAddedBase || r.valueAddedAnchor.coverage!==node.coverage)throw new Error('Inventory mismatch '+node.nodeId)
}
const result={checkedAt:'2026-09-14',schemaArithmeticPassed:true,records:data.records.length,inventoryRecords:inventory.length,allKeysCovered:data.records.length===inventory.length,estimatedRecords:data.records.filter(r=>r.employment.status==='estimated').length,officialRecords:data.records.filter(r=>r.employment.status==='official').length,sourceCount:data.sources.length,modelBasisComplete:data.records.every(r=>r.employment.status!=='estimated'||!!r.employment.modelBasis)}
fs.writeFileSync(new URL('./schema-validation.json',import.meta.url),JSON.stringify(result,null,2)+'\n')
console.log(result)
