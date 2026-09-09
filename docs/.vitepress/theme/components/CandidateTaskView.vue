<script setup lang="ts">
import {computed} from 'vue'
import {withBase} from 'vitepress'
import type {TaskPage} from '../../../../src/research/site'
import {taskStatus,phaseNames} from '../../../../src/research/site'
import EvidenceList from './EvidenceList.vue'
const props=defineProps<{record:TaskPage}>()
const t=computed(()=>props.record.task)
const stages={'not-applicable':'背景／规范','vendor-report':'厂商自报',laboratory:'实验室',pilot:'试点','commercial-operation':'持续商业运行',unknown:'阶段不明'}
const kinds={fact:'直接事实',calculation:'计算结果',judgment:'研究判断',hypothesis:'待验证假设'}
</script>
<template>
 <article class="task-view" :data-country="t.country">
  <nav class="breadcrumbs"><a :href="withBase('/'+t.country+'/')">{{t.country==='cn'?'中国':'美国'}}</a><span> / </span><a :href="withBase('/'+t.country+'/industries/'+t.industryId)">{{record.industry.name}}</a></nav>
  <p class="eyebrow">{{record.scenario.title}} · {{phaseNames[t.phase]}}</p>
  <h1 :data-content-id="t.id+'-title'" tabindex="0">{{t.title}}</h1>
  <section class="task-conclusion" :data-content-id="t.id+'-conclusion'" tabindex="0"><span class="tag">{{taskStatus[t.researchStatus]}}</span><p>{{t.summary}}</p><p v-if="t.researchStatus==='not-started'" class="scope-note">本页是任务发现记录。尚未完成自动化及反例检索，不能据此判断方案不可行或没有商业案例。</p></section>
  <section :data-content-id="t.id+'-boundary'" tabindex="0"><h2>执行范围与验收定义</h2><p>{{t.boundary}}</p><p class="scope-note">{{t.discovery?.acceptanceStatus}}</p><p><strong>输入：</strong>{{t.inputs.join('；')}}</p><p><strong>输出：</strong>{{t.outputs.join('；')}}</p><ul><li v-for="a in t.acceptance">{{a}}</li></ul></section>
  <section :data-content-id="t.id+'-discovery'" tabindex="0"><h2>任务发现依据</h2><p class="scope-note">原始编号 {{t.discovery?.originalId}}。来源支持程度和拆分建议仍可能在独立审查中修订；职业描述不证明实际工时或人工占比。</p><details open><summary>流程规范路径</summary><EvidenceList v-if="t.workflowEvidence.length" :items="t.workflowEvidence"/><p v-else>尚未取得绑定到本任务的流程依据。</p></details><details open><summary>职业职责路径</summary><EvidenceList v-if="t.occupationEvidence.length" :items="t.occupationEvidence"/><p v-else>尚未取得绑定到本任务的职业职责依据。</p></details><div v-if="t.discovery?.sourceLimitations.length" class="historical-note"><strong>使用资料的年份与适用限制</strong><ul><li v-for="text in t.discovery.sourceLimitations">{{text}}</li></ul></div></section>
  <section :data-content-id="t.id+'-alternatives'" tabindex="0"><h2>替代方案与残留人工</h2><p v-if="!t.alternatives.length">尚未完成传统机械、专机、机器人、辅助工具与必要数字流程的逐项比较。残留人工及部署阶段仍缺证据。</p><article v-for="(a,i) in t.alternatives" :key="i" :data-content-id="t.id+'-alternative-'+i" tabindex="0"><h3>{{a.description}}</h3><p>条件：{{a.conditions.join('；')}}</p><p>残留人工：{{a.remainingLabor.join('；')}}</p></article></section>
  <section :data-content-id="t.id+'-barriers'" tabindex="0"><h2>障碍与反例检查</h2><p v-if="!t.barriers.length">技术、经济与采用障碍尚未完成场景化研究；失败、退出、未采用和成功反例均待逐项核查。</p><ul><li v-for="b in t.barriers">{{b.scenario}}</li></ul></section>
  <section :data-content-id="t.id+'-economics'" tabindex="0"><h2>人工投入与回报</h2><p class="work-note">尚未取得完整增量现金流参数，不计算回收期。币种为 {{t.country==='cn'?'人民币 CNY':'美元 USD'}}。</p><dl><template v-for="m in t.manualInputs"><dt>{{m.name}}</dt><dd>{{m.value??'缺失'}} · {{m.unit}}<p>{{m.gap}}</p><EvidenceList v-if="m.evidence.length" :items="m.evidence"/></dd></template></dl></section>
  <section v-if="record.claims.length" :data-content-id="t.id+'-claims'" tabindex="0"><h2>结论与证据</h2><details v-for="c in record.claims" :key="c.id" :data-content-id="c.id" tabindex="0"><summary>{{kinds[c.kind]}} · {{c.text}}</summary><p>{{stages[c.deployment]}} · {{c.conditions.join('；')}}</p><EvidenceList :items="c.evidence"/></details></section>
  <section :data-content-id="t.id+'-gaps'" tabindex="0"><h2>证据缺口</h2><ul><li v-for="g in t.evidenceGaps">{{g}}</li></ul></section>
  <section :data-content-id="t.id+'-interviews'" tabindex="0"><h2>待访谈问题</h2><ol><li v-for="q in t.interviewQuestions">{{q}}</li></ol></section>
  <p class="scope-note">研究版本 {{record.version}} · {{record.checkedAt}}。当前未冻结；评论不会自动成为研究事实。</p>
  <a :href="withBase('/exports/'+t.id+'.json')" download>导出本任务、来源与检索记录</a>
 </article>
</template>
