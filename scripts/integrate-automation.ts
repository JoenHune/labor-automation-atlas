import {readResearch,writeResearch} from '../src/research/storage'
import {preserveRecordOrder} from '../src/research/record-order'
import {readFile,writeFile} from 'node:fs/promises'
import {createHash} from 'node:crypto'
import {importCnServices} from '../src/research/import-cn-services'
import {importCnAgriculture} from '../src/research/import-cn-agriculture'
import {importCnAgricultureFollowups,cnAgricultureFollowupFiles} from '../src/research/import-cn-agriculture-followups'
import {importCnConstruction,cnConstructionFiles} from '../src/research/import-cn-construction'
import {importCnMining} from '../src/research/import-cn-mining'
import {importUsAgriculture} from '../src/research/import-us-agriculture'
import {importUsCore} from '../src/research/import-us-core'
import {importUsHealth} from '../src/research/import-us-health'
import {importUsServices} from '../src/research/import-us-services'
import {importCnIndustryFood,cnIndustryFoodFiles} from '../src/research/import-cn-industry-food'
import {importCnIndustryTextiles,cnIndustryTextilesFiles} from '../src/research/import-cn-industry-textiles'
import {importCnTrade,cnTradeFiles} from '../src/research/import-cn-trade'
import {importUsConstruction,usConstructionFiles} from '../src/research/import-us-construction'
import {validateResearch} from '../src/research/validate'
const root=new URL('../',import.meta.url)
const read=async(file:string)=>{const text=await readFile(new URL(file,root),'utf8');return {data:JSON.parse(text),sha256:createHash('sha256').update(text).digest('hex')}}
let data=await readResearch(new URL('data/research.json',root))
const recordOrder={sources:data.sources.map(s=>s.id),claims:data.claims.map(c=>c.id),searches:data.searches.map(s=>s.id)}
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
const miningFile='research/automation/cn-industry-mining-06-12.json',miningAuditFile='research/automation/cn-industry-mining-06-12-search-audit.json',miningReviewFile='research/reviews/cn-industry-mining-06-12-automation-decisions.json'
const mining=await read(miningFile),miningAudit=await read(miningAuditFile),miningReview=await read(miningReviewFile),miningRevision=await read('research/automation/cn-industry-mining-06-12-revisions.json'),miningRecheck=await read('research/reviews/cn-industry-mining-06-12-automation-recheck.json')
if(miningRevision.data.afterSha256!==mining.sha256||miningRevision.data.reviewSha256!==miningReview.sha256||miningRevision.data.reviewInputSha256!==mining.data.reviewedInputSha256||miningRecheck.data.followupFieldReceipt.authorRevisionReceiptSha256!==miningRevision.sha256||miningRecheck.sha256!=='e3b1f137b4c4d9343af5cac570a7737c7ec3f2895f02e3eadc7b467d5d7cd41c')throw new Error('中国矿业修订与限定复检输入不匹配')
importCnMining(data,mining.data,miningAudit.data,miningReview.data,miningRecheck.data,{file:miningFile,sha256:mining.sha256,auditFile:miningAuditFile,auditSha256:miningAudit.sha256,reviewFile:miningReviewFile,reviewSha256:miningReview.sha256})
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
const healthFile='research/automation/us-health.json',healthAuditFile='research/automation/us-health-search-audit.json',healthReviewFile='research/reviews/us-health-automation-decisions.json'
const health=await read(healthFile),healthAudit=await read(healthAuditFile),healthReview=await read(healthReviewFile),healthRevision=await read('research/automation/us-health-revisions.json'),healthRecheck=await read('research/reviews/us-health-automation-recheck.json')
if(healthRevision.data.afterSha256!==health.sha256||healthRevision.data.beforeSha256!==healthReview.data.input.sha256||healthRevision.data.independentReviewInput.sha256!==healthReview.sha256||healthRecheck.data.authorRevisionReceiptSHA256!==healthRevision.sha256||healthRecheck.sha256!=='49abc134eab8932af4f079707590ca2f9af1c900f1a698b7c73f209b14b50276')throw new Error('美国卫生修订与限定复检文件不匹配')
importUsHealth(data,health.data,healthAudit.data,healthReview.data,healthRecheck.data,{file:healthFile,sha256:health.sha256,auditFile:healthAuditFile,auditSha256:healthAudit.sha256,reviewFile:healthReviewFile,reviewSha256:healthReview.sha256})
const agricultureFollowupTexts=Object.fromEntries(await Promise.all(Object.values(cnAgricultureFollowupFiles).map(async({file})=>[file,await readFile(new URL(file,root),'utf8')])))
data=importCnAgricultureFollowups(data,agricultureFollowupTexts)
const constructionTexts=Object.fromEntries(await Promise.all(Object.values(cnConstructionFiles).map(async({file})=>[file,await readFile(new URL(file,root),'utf8')])))
data=importCnConstruction(data,constructionTexts)
for(const [manifest,importer] of [[cnIndustryFoodFiles,importCnIndustryFood],[cnIndustryTextilesFiles,importCnIndustryTextiles]] as const) {
 const texts=Object.fromEntries(await Promise.all(Object.values(manifest).map(async({file})=>[file,await readFile(new URL(file,root),'utf8')])))
 data=importer(data,texts)
}
const tradeTexts=Object.fromEntries(await Promise.all(Object.values(cnTradeFiles).map(async({file})=>[file,await readFile(new URL(file,root),'utf8')])))
data=importCnTrade(data,tradeTexts)
const usConstructionTexts=Object.fromEntries(await Promise.all(Object.values(usConstructionFiles).map(async({file})=>[file,await readFile(new URL(file,root),'utf8')])))
data=importUsConstruction(data,usConstructionTexts)
data.sources=preserveRecordOrder(data.sources,recordOrder.sources)
data.claims=preserveRecordOrder(data.claims,recordOrder.claims)
data.searches=preserveRecordOrder(data.searches,recordOrder.searches)
const result=validateResearch(data)
await writeResearch(new URL('data/research.json',root),result)
console.log('Integrated',raw.data.tasks.length,'CN service task research records. Definition revisions remain open; none are frozen.')
console.log('Integrated',us.data.tasks.length,'US agriculture task research records. Partial dates, evidence limits and unresolved task definitions retained.')
console.log('Integrated',services.data.tasks.length,'US service task research records. Original source claims, country scope and unknown cash-flow inputs retained.')
console.log('Integrated',cnAg.data.tasks.length,'CN agriculture task research records. Split proposals and followups remain open; no task frozen.')
console.log('Integrated',mining.data.tasks.length,'CN mining task research records. Reviewed display corrections applied; original snapshots preserved, no task frozen.')
console.log('Integrated',health.data.tasks.length,'US health task research records. Adjacent evidence, source dates, proposed splits and unknown costs retained.')
console.log('Integrated 53 CN trade and 131 US construction candidates. Reviewed revisions, original snapshots and evidence gaps retained; none frozen.')
