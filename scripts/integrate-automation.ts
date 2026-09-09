import {readFile,writeFile} from 'node:fs/promises'
import {createHash} from 'node:crypto'
import {importCnServices} from '../src/research/import-cn-services'
import {importCnAgriculture} from '../src/research/import-cn-agriculture'
import {importUsAgriculture} from '../src/research/import-us-agriculture'
import {importUsCore} from '../src/research/import-us-core'
import {importUsServices} from '../src/research/import-us-services'
import {validateResearch} from '../src/research/validate'
const root=new URL('../',import.meta.url)
const read=async(file:string)=>{const text=await readFile(new URL(file,root),'utf8');return {data:JSON.parse(text),sha256:createHash('sha256').update(text).digest('hex')}}
const data=(await read('data/research.json')).data
const file='research/automation/cn-services.json',auditFile='research/automation/cn-services-search-audit.json'
const raw=await read(file),audit=await read(auditFile)
importCnServices(data,raw.data,audit.data,{file,sha256:raw.sha256,auditFile,auditSha256:audit.sha256})
const usFile='research/automation/us-agriculture.json',usAuditFile='research/automation/us-agriculture-search-audit.json',reviewFile='research/reviews/us-agriculture-automation-decisions.json'
const us=await read(usFile),usAudit=await read(usAuditFile),review=await read(reviewFile)
const revisions=await read('research/automation/us-agriculture-revisions.json'),recheck=await read('research/reviews/us-agriculture-automation-followup-recheck.json')
if(revisions.data.reviewInputSha256!==review.data.inputSha256||revisions.data.reviewFileSha256!==review.sha256||revisions.data.followupRevisions.at(-1)?.afterSha256!==us.sha256||recheck.data.inputSha256!==us.sha256||recheck.data.isFrozen!==false)throw new Error('美国农业修订与复检输入不匹配')
const technical=await read('research/reviews/us-agriculture-technical-field-decisions.json')
const technicalRecheck=await read('research/reviews/us-agriculture-technical-field-recheck.json')
if(technicalRecheck.data.inputSha256!==us.sha256||technicalRecheck.data.decisionSha256!==technical.sha256||technicalRecheck.data.canFreeze!==false)throw new Error('美国农业技术字段复检输入不匹配')
importUsAgriculture(data,us.data,usAudit.data,review.data,{file:usFile,sha256:us.sha256,auditFile:usAuditFile,auditSha256:usAudit.sha256,reviewFile,reviewSha256:review.sha256},technical.data)
const cnAgFile='research/automation/cn-agriculture.json',cnAgAuditFile='research/automation/cn-agriculture-search-audit.json',cnAgReviewFile='research/reviews/cn-agriculture-automation-decisions.json'
const cnAg=await read(cnAgFile),cnAgAudit=await read(cnAgAuditFile),cnAgReview=await read(cnAgReviewFile),cnAgRevision=await read('research/automation/cn-agriculture-revisions.json'),cnAgRecheck=await read('research/reviews/cn-agriculture-automation-recheck.json')
if(cnAgRevision.data.afterSha256!==cnAg.sha256||cnAgRevision.data.reviewInputSha256!==cnAgReview.data.input.sha256||cnAgRevision.data.reviewSha256!==cnAgReview.sha256||cnAgRecheck.data.revisionSha256!==cnAgRevision.sha256)throw new Error('中国农业修订与复检输入不匹配')
importCnAgriculture(data,cnAg.data,cnAgAudit.data,cnAgReview.data,cnAgRecheck.data,{file:cnAgFile,sha256:cnAg.sha256,auditFile:cnAgAuditFile,auditSha256:cnAgAudit.sha256,reviewFile:cnAgReviewFile,reviewSha256:cnAgReview.sha256})
const servicesFile='research/automation/us-services.json',servicesAuditFile='research/automation/us-services-search-audit.json',servicesReviewFile='research/reviews/us-services-automation-decisions.json'
const services=await read(servicesFile),servicesAudit=await read(servicesAuditFile),servicesReview=await read(servicesReviewFile)
const servicesRevision=await read('research/automation/us-services-revisions.json'),servicesRecheck=await read('research/reviews/us-services-automation-recheck.json')
if(servicesRevision.data.afterSha256!==services.sha256||servicesRevision.data.reviewSha256!==servicesReview.sha256||servicesRevision.data.reviewInputSha256!==servicesReview.data.inputSha256||servicesRecheck.data.inputSha256!==services.sha256||servicesRecheck.data.reviewSha256!==servicesReview.sha256||servicesRecheck.data.canFreeze!==false)throw new Error('美国服务业修订与复检输入不匹配')
importUsServices(data,services.data,servicesAudit.data,servicesReview.data,{file:servicesFile,sha256:services.sha256,auditFile:servicesAuditFile,auditSha256:servicesAudit.sha256,reviewFile:servicesReviewFile,reviewSha256:servicesReview.sha256})
for(const industry of ['manufacturing','government']) {
 const file='research/automation/us-'+industry+'.json',auditFile='research/automation/us-'+industry+'-search-audit.json',reviewFile='research/reviews/us-'+industry+'-automation-decisions.json'
 const raw=await read(file),audit=await read(auditFile),review=await read(reviewFile),revision=await read('research/automation/us-'+industry+'-revisions.json'),recheck=await read('research/reviews/us-'+industry+'-automation-recheck.json')
 if(revision.data.afterSha256!==raw.sha256||revision.data.reviewInputSha256!==review.data.input.sha256||revision.data.reviewSha256!==review.sha256||recheck.data.inputSha256!==raw.sha256||recheck.data.reviewSha256!==review.sha256||recheck.data.canFreeze!==false)throw new Error('美国行业修订与复检输入不匹配：'+industry)
 importUsCore(data,raw.data,audit.data,review.data,{file,sha256:raw.sha256,auditFile,auditSha256:audit.sha256,reviewFile,reviewSha256:review.sha256})
 console.log('Integrated',raw.data.tasks.length,industry,'task research records; independent corrections applied, no task frozen.')
}
const result=validateResearch(data)
await writeFile(new URL('data/research.json',root),JSON.stringify(result,null,2)+'\n')
console.log('Integrated',raw.data.tasks.length,'CN service task research records. Definition revisions remain open; none are frozen.')
console.log('Integrated',us.data.tasks.length,'US agriculture task research records. Partial dates, evidence limits and unresolved task definitions retained.')
console.log('Integrated',services.data.tasks.length,'US service task research records. Original source claims, country scope and unknown cash-flow inputs retained.')
console.log('Integrated',cnAg.data.tasks.length,'CN agriculture task research records. Split proposals and followups remain open; no task frozen.')
