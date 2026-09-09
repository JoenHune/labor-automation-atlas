<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import raw from '../../../../data/site.json'
import type { Research } from '../../../../src/research/schema'
import EvidenceList from './EvidenceList.vue'
const props=defineProps<{taskId:string}>()
const research=raw as Research
const task=computed(()=>research.tasks.find(t=>t.id===props.taskId)!)
const d=computed(()=>task.value.dossier as Record<string,any>)
const industry=computed(()=>research.industries.find(i=>i.id===task.value.industryId)!)
const claims=computed(()=>research.claims.filter(c=>c.taskId===task.value.id))
const claimKinds={fact:'直接事实',judgment:'研究判断',hypothesis:'待验证假设',calculation:'计算结果'}
const stages={'not-applicable':'背景／规范','vendor-report':'厂商或集成商自报',laboratory:'实验室',pilot:'试点','commercial-operation':'持续商业运行',unknown:'阶段不明'}
const alternatives={'traditional-machine':'传统机械','dedicated-machine':'专机',robot:'机器人','assistive-tool':'辅助工具','digital-process':'数字流程',unclassified:'方案类别待细分'}
const barrierTypes={technical:'技术',economic:'经济',adoption:'采用'}
const refs=(ids:string[])=>claims.value.filter(c=>ids.map(x=>x.toLowerCase()).includes(c.id)).flatMap(c=>c.evidence)
</script>
<template>
 <article class="task-view" :data-country="task.country">
  <nav class="breadcrumbs"><a :href="withBase('/'+task.country+'/')">{{task.country==='cn'?'中国':'美国'}}</a><span> / </span><a :href="withBase('/'+task.country+'/industries/'+industry.id)">{{industry.name}}</a></nav>
  <p class="eyebrow">具体任务 · 公开资料样板 · {{research.checkedAt}}</p>
  <h1 :data-content-id="task.id+'-title'" tabindex="0">{{task.title}}</h1>
  <p v-if="task.countingRole==='composite-reference'" class="work-note" :data-content-id="task.id+'-counting-boundary'" tabindex="0">本页研究一个包含多步动作的组合循环，用于验证完整证据链。它与组成的原子任务不能重复累计任务数量、工时或收益；单项动作仍须独立核对。</p>
  <section class="task-conclusion" :data-content-id="task.id+'-conclusion'" tabindex="0">
   <span class="tag">研究判断</span><p>{{task.summary}}</p>
   <p class="evidence-age">{{task.evidenceAge}}</p>
   <EvidenceList :items="refs(task.conclusionIds)"/>
  </section>
  <section :data-content-id="task.id+'-scope'" tabindex="0"><h2>任务边界与验收</h2><p>{{task.boundary}}</p><p class="scope-note">{{d.boundary.acceptanceStatus}}</p><ul><li v-for="text in task.acceptance">{{text}}</li></ul>
   <details><summary>输入、输出和相邻任务</summary><p><strong>输入</strong>：{{task.inputs.join('；')}}</p><p><strong>输出</strong>：{{task.outputs.join('；')}}</p><p><strong>相邻但独立核算</strong>：{{d.boundary.excludedButLinked.join('；')}}</p></details>
  </section>
  <section :data-content-id="task.id+'-conditions'" tabindex="0"><h2>适用场景与成立条件</h2><div class="scenario-grid"><div v-for="s in d.scenarios" :key="s.id" :data-content-id="s.id.toLowerCase()+'-conditions'" tabindex="0"><h3>{{s.name}}</h3><ul><li v-for="c in s.conditions">{{c}}</li></ul><p class="scope-note">{{s.status}}</p><EvidenceList :items="refs(s.basisClaimIds)"/></div></div></section>
  <section :data-content-id="task.id+'-flow'" tabindex="0"><h2>从流程检查遗漏</h2><p class="scope-note">以下是依据公开资料提出的研究流程定义。客户现场动作、分工与验收待验证；相邻步骤将纳入行业任务清单独立研究。</p>
   <ol class="flow-grid"><li v-for="(p,i) in d.process" :key="p.id" :data-content-id="p.id.toLowerCase()" tabindex="0"><span class="flow-number">{{String(Number(i)+1).padStart(2,'0')}}</span><strong>{{p.label}}</strong><small>{{p.boundary==='upstream'?'上游':p.boundary==='downstream'?'下游':'流程节点'}} · 研究定义</small><details><summary>依据与缺口</summary><p>{{p.supportBoundary??p.researchStatus}}</p><EvidenceList :items="refs(p.basisClaimIds)"/></details></li></ol>
   <details><summary>流程规范与职业职责交叉检查</summary><p>职责补充：{{d.dualPathAudit.addedFromOccupation.join('；')}}</p><p>流程补充：{{d.dualPathAudit.addedFromProcess.join('；')}}</p><p>{{d.dualPathAudit.deduplicationRule}}</p><p>{{d.dualPathAudit.remainingGap}}</p><EvidenceList :items="[...task.workflowEvidence,...task.occupationEvidence]"/></details>
  </section>
  <section :data-content-id="task.id+'-alternatives'" tabindex="0"><h2>替代方案与残留人工</h2><div class="alternatives-list"><article v-for="(a,i) in task.alternatives" :key="a.category" :data-content-id="task.id+'-alternative-'+a.category" tabindex="0"><span class="tag">{{alternatives[a.category]}}</span><h3>{{d.alternatives[i].name}}</h3><p>{{d.alternatives[i].status}}</p><p><strong>成立条件</strong>：{{a.conditions.join('；')}}</p><p><strong>残留人工</strong>：{{a.remainingLabor.join('；')}}</p><p class="scope-note">证据性质：{{d.alternatives[i].stage.evidenceOrigin}}</p><EvidenceList :items="refs(a.claimIds)"/></article></div></section>
  <section :data-content-id="task.id+'-barriers'" tabindex="0"><h2>障碍可以同时存在</h2><ul class="barrier-list"><li v-for="(b,i) in task.barriers" :key="i" :data-content-id="task.id+'-barrier-'+i" tabindex="0"><span class="tag">{{barrierTypes[b.type]}}</span><p>{{b.scenario}}</p><EvidenceList :items="refs(b.claimIds)"/></li></ul></section>
  <section :data-content-id="task.id+'-counterevidence'" tabindex="0"><h2>成功反例、未采用与限制证据</h2><p><strong>成功反例的范围</strong>：{{d.counterEvidence.successCounterexample.scopeLimit}}</p><ul><li v-for="text in d.counterEvidence.failureAndWithdrawalSearch.identified">{{text}}</li></ul><p>{{d.counterEvidence.notAdopted.note}}</p><p class="scope-note">{{d.counterEvidence.failureAndWithdrawalSearch.interpretation}}</p><EvidenceList :items="refs(task.counterevidenceIds)"/>
   <details><summary>本次仍未取得的证据</summary><ul><li v-for="text in d.counterEvidence.failureAndWithdrawalSearch.noVerifiedEvidenceFor">{{text}}</li></ul></details>
  </section>
  <section :data-content-id="task.id+'-economics'" tabindex="0"><h2>回报：参数不足</h2><p class="work-note">未生成回收期或净现值。货币为 {{task.country==='cn'?'人民币（CNY）':'美元（USD）'}}，先补齐可避免的付薪投入、完整部署费用、维护和异常停机，再检验需求与产能。</p>
   <div class="table-scroll"><table class="atlas-table"><thead><tr><th>人工输入</th><th>值</th><th>证据缺口</th></tr></thead><tbody><tr v-for="m in task.manualInputs" :key="m.name" :data-content-id="task.id+'-manual-'+task.manualInputs.indexOf(m)" tabindex="0"><th>{{m.name}}</th><td>{{m.value??'未披露'}} {{m.unit}}</td><td>{{m.gap}}</td></tr></tbody></table></div>
   <details><summary>可复算现金流与盈亏门槛公式</summary><ul><li v-for="text in d.economics.assumptions">{{text}}</li></ul><div v-for="f in d.economics.formulas" :key="f.id" :data-content-id="task.id+'-formula-'+f.id.replaceAll('_','-')" tabindex="0"><pre class="formula">{{f.expression}}</pre><p>{{f.explanation}}</p></div>
   <div class="table-scroll"><table class="atlas-table"><thead><tr><th>参数</th><th>定义</th><th>值／单位</th><th>待补</th></tr></thead><tbody><tr v-for="p in d.economics.parameters" :key="p.id"><th>{{p.id}}</th><td>{{p.label}}</td><td>{{p.value??'缺失'}}／{{p.unit}}</td><td>{{p.missingWhy}}</td></tr></tbody></table></div></details>
  </section>
  <section :data-content-id="task.id+'-claims'" tabindex="0"><h2>逐条结论与原文</h2><details class="claim-item" v-for="c in claims" :key="c.id" :id="c.id" :data-content-id="c.id" tabindex="0"><summary><span class="tag">{{claimKinds[c.kind]}}</span>{{c.text}}</summary><p class="scope-note">{{stages[c.deployment]}} · {{c.conditions.join('；')}}</p><EvidenceList :items="c.evidence"/></details></section>
  <section :data-content-id="task.id+'-interviews'" tabindex="0"><h2>下一步验证</h2><article v-for="o in d.opportunities" :key="o.id"><h3>{{o.name}}</h3><p>{{o.why}}</p><p>成立条件：{{o.holdsIf.join('；')}}</p><p>{{o.nextVerification}}</p><EvidenceList :items="refs(o.basisClaimIds)"/></article><details><summary>证据缺口与待访谈清单</summary><ul><li v-for="q in task.interviewQuestions">{{q}}</li></ul><ul><li v-for="g in task.evidenceGaps">{{g}}</li></ul></details></section>
  <p class="scope-note">已完成本任务公开证据独立复核，保留上述缺口。行业全任务清单仍在扩展，研究版本尚未冻结。评论须经审校才可能形成新研究版本。</p>
  <a :href="withBase('/exports/'+task.id+'.json')" download>导出该任务与证据</a>
 </article>
</template>
