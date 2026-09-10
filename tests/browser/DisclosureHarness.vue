<script setup lang="ts">
import {nextTick,ref} from 'vue'
import {createAnchor,ensureContentIds,pageScope,rectOf,resolveAnchor,restoreAnchorDisclosures} from '../../src/annotations/dom'
import {observeContentChanges} from '../../src/annotations/content-observer'
import type {Anchor} from '../../src/annotations/schema'
const outer=ref<HTMLDetailsElement>(),inner=ref<HTMLDetailsElement>(),other=ref<HTMLDetailsElement>(),table=ref<HTMLDetailsElement>()
const text=ref<HTMLElement>(),before=ref<HTMLElement>(),after=ref<HTMLElement>(),image=ref<HTMLImageElement>()
const extra=ref<HTMLDetailsElement>(),blank=ref<HTMLElement>(),chart=ref<HTMLElement>(),fixture=ref<HTMLElement>()
const message=ref('可以独立验收的原始证据。'),show=ref(true),reverse=ref(false),narrow=ref(false),large=ref(false)
const results=ref<{name:string;passed:boolean;detail?:unknown}[]>([]),busy=ref(false)
const rows=[{id:'shared-disclosure-row-one',text:'甲行：取样后移交。'},{id:'shared-disclosure-row-two',text:'乙行：包装后交付。'}]
const scope=()=>pageScope('/labor-automation-atlas/')
const rangeOf=(el:Node)=>{const r=document.createRange();r.selectNodeContents(el);return r}
const capture=(r:Range)=>createAnchor(rectOf(r.getBoundingClientRect()),scope(),'disclosure-qa',r)
const check=(ok:unknown,name:string,detail?:unknown)=>{results.value.push({name,passed:Boolean(ok),detail});if(!ok)throw new Error(name)}
const close=()=>{outer.value!.open=false;inner.value!.open=false;other.value!.open=false}
const legacy=(anchor:Anchor)=>{const copy=structuredClone(anchor);delete copy.view.disclosures;return copy}
async function run(){
 busy.value=true;results.value=[]
 try{
  message.value='可以独立验收的原始证据。';show.value=true;reverse.value=false;narrow.value=false;large.value=false;await nextTick();await ensureContentIds()
  close();outer.value!.open=true;inner.value!.open=true
  const anchor=await capture(rangeOf(text.value!))
  check(anchor.view.disclosures?.length===2&&anchor.view.disclosures.every(d=>d.open),'记录选区内的两层展开状态')
  close();const hidden=await resolveAnchor(anchor,scope())
  check(hidden.status==='hidden'&&hidden.rects.length===0,'折叠不冒充内容改写，也不保留旧矩形',hidden)
  const restored=await restoreAnchorDisclosures(anchor,scope())
  check(restored.status==='resolved'&&outer.value!.open&&inner.value!.open&&!other.value!.open,'恢复两层选区，不展开无关同名摘要')
  inner.value!.open=false;await resolveAnchor(anchor,scope())
  check(!inner.value!.open,'普通定位刷新保持读者的折叠选择')
  close();const old=legacy(anchor),oldResult=await restoreAnchorDisclosures(old,scope())
  check(oldResult.status==='resolved'&&outer.value!.open&&inner.value!.open,'无展开元数据的旧文字草稿按唯一内容恢复')
  close();const wrong=structuredClone(anchor);wrong.view.year=2024
  check((await restoreAnchorDisclosures(wrong,scope())).status==='wrong-view'&&!outer.value!.open,'年份不符时不展开任何面板')
  const wrongCountry=structuredClone(anchor);wrongCountry.country='cn'
  check((await restoreAnchorDisclosures(wrongCountry,scope())).status==='wrong-view'&&!outer.value!.open,'国家不符时不展开面板')
  message.value='内容已经实质改写。';await nextTick()
  check((await restoreAnchorDisclosures(anchor,scope())).status==='changed'&&!outer.value!.open&&!inner.value!.open,'新锚点遇到改写时整条停止，不部分展开')
  check((await restoreAnchorDisclosures(old,scope())).status==='changed'&&!outer.value!.open,'旧锚点也不向改写文字猜测挂载')
  message.value='可以独立验收的原始证据。';await nextTick()
  show.value=false;await nextTick()
  check((await restoreAnchorDisclosures(anchor,scope())).status==='changed'&&!outer.value!.open,'原段落删除时保留变更状态')
  show.value=true;await nextTick();await ensureContentIds()
  check((await restoreAnchorDisclosures(anchor,scope())).status==='resolved','原始文字恢复后仍可定位')
  narrow.value=true;large.value=true;await nextTick();close()
  const resized=await restoreAnchorDisclosures(anchor,scope()),expected=rectOf(rangeOf(text.value!).getBoundingClientRect())
  check(resized.status==='resolved'&&resized.rects.length>0&&Math.abs(resized.rects[0].x-expected.x)<0.5,'窄屏并放大文字后按原内容恢复')
  narrow.value=false;large.value=false;await nextTick();close()
  const summary=outer.value!.querySelector('summary')!,summaryAnchor=await capture(rangeOf(summary))
  check(summaryAnchor.view.disclosures?.length===1&&summaryAnchor.view.disclosures[0].open===false,'折叠摘要本身可批注并记录关闭状态')
  outer.value!.open=true
  check((await restoreAnchorDisclosures(summaryAnchor,scope())).status==='resolved'&&!outer.value!.open,'恢复摘要批注时保留原关闭状态')
  outer.value!.open=true;inner.value!.open=false
  const cross=rangeOf(before.value!);cross.setEndAfter(after.value!)
  const crossAnchor=await capture(cross)
  check(!crossAnchor.selectedText.includes(message.value)&&!crossAnchor.targets.some(t=>t.text?.exact.includes(message.value)||t.textSegments?.some(q=>q.exact.includes(message.value))),'跨越关闭面板选择文字时不夹带隐藏正文',crossAnchor.targets.map(t=>({text:t.text,segments:t.textSegments})))
  check((await resolveAnchor(crossAnchor,scope())).status==='resolved','跳过隐藏正文的多段文字仍能完整恢复')
  inner.value!.open=true
  const picture=await createAnchor(rectOf(image.value!.getBoundingClientRect()),scope(),'disclosure-qa')
  close();check((await resolveAnchor(picture,scope())).status==='hidden','折叠图片不误记为已删除')
  check((await restoreAnchorDisclosures(picture,scope())).status==='resolved'&&inner.value!.open,'图片选区恢复所需两层面板')
  const oldPicture=legacy(picture);close()
  check((await restoreAnchorDisclosures(oldPicture,scope())).status==='resolved','旧图片锚点按匹配图片恢复')
  table.value!.open=true;await nextTick()
  const first=table.value!.querySelector('[data-content-id="shared-disclosure-row-one"]')!,rowAnchor=await capture(rangeOf(first))
  reverse.value=true;await nextTick();table.value!.open=false
  check((await restoreAnchorDisclosures(rowAnchor,scope())).status==='resolved'&&table.value!.open,'表格排序后恢复同一行及所在折叠面板')
  const crossPanel=rangeOf(text.value!);crossPanel.setEndAfter(table.value!.querySelector('[data-content-id="shared-disclosure-row-one"]')!)
  const crossPanels=await capture(crossPanel)
  close();table.value!.open=false
  check((await restoreAnchorDisclosures(crossPanels,scope())).status==='resolved'&&outer.value!.open&&inner.value!.open&&table.value!.open,'跨组件多面板选区一起恢复')
  close();table.value!.open=false;message.value='跨组件中的一处已改写';await nextTick()
  check((await restoreAnchorDisclosures(crossPanels,scope())).status==='changed'&&!table.value!.open&&!outer.value!.open,'跨组件部分改写时不恢复另一半')
  message.value='可以独立验收的原始证据。';await nextTick();await restoreAnchorDisclosures(anchor,scope())
  text.value!.style.display='none'
  check((await resolveAnchor(anchor,scope())).status==='hidden','CSS暂时隐藏与内容实质变化分开')
  check((await restoreAnchorDisclosures(anchor,scope())).status==='hidden','无法通过面板恢复的CSS隐藏不猜位置')
  text.value!.style.removeProperty('display')
  check((await resolveAnchor(anchor,scope())).status==='resolved','显示恢复后自动重新定位')
  inner.value!.style.contentVisibility='hidden'
  check((await resolveAnchor(picture,scope())).status==='hidden','保留布局的内容隐藏不留下图片标记')
  inner.value!.style.removeProperty('content-visibility')
  check((await resolveAnchor(picture,scope())).status==='resolved','内容可见性恢复后图片仍匹配')
  extra.value!.open=true
  const emptyBox=rectOf(blank.value!.getBoundingClientRect()),blankAnchor=await createAnchor({x:emptyBox.x+8,y:emptyBox.y+8,width:30,height:20},scope(),'disclosure-qa')
  check(blankAnchor.targets.length===1&&!blankAnchor.selectedText,'折叠面板内空白区域保留独立目标')
  extra.value!.open=false
  check((await resolveAnchor(blankAnchor,scope())).status==='hidden','关闭面板后空白选区也隐藏')
  check((await restoreAnchorDisclosures(blankAnchor,scope())).status==='resolved'&&extra.value!.open,'空白区域恢复同一面板')
  const chartBox=rectOf(chart.value!.getBoundingClientRect()),chartAnchor=await createAnchor({x:chartBox.x+20,y:chartBox.y+15,width:40,height:30},scope(),'disclosure-qa')
  check(chartAnchor.targets.length===1&&chartAnchor.targets[0].kind==='chart'&&chartAnchor.targets[0].dataPoints[0]?.key==='sample-value','面板图表选区保存数据点身份')
  extra.value!.open=false
  check((await resolveAnchor(chartAnchor,scope())).status==='hidden','关闭面板不误报图表数据删除')
  check((await restoreAnchorDisclosures(chartAnchor,scope())).status==='resolved'&&extra.value!.open,'图表恢复后重新定位数据点')
  const savedPoints=chart.value!.dataset.annotationPoints!
  chart.value!.dataset.annotationPoints='[{"key":"sample-value","period":"2025","value":99}]';extra.value!.open=false
  check((await restoreAnchorDisclosures(chartAnchor,scope())).status==='changed'&&!extra.value!.open,'图表数值改变后不挂载旧批注')
  chart.value!.dataset.annotationPoints=savedPoints
  const duplicate=extra.value!.cloneNode(true) as HTMLDetailsElement;extra.value!.parentElement!.insertBefore(duplicate,extra.value!.nextSibling)
  try{check((await restoreAnchorDisclosures(chartAnchor,scope())).status==='changed'&&!extra.value!.open&&!duplicate.open,'相同编号及内容的重复面板拒绝猜测')}
  finally{duplicate.remove()}
  const changes:boolean[]=[],watcher=observeContentChanges(fixture.value!,needsIds=>changes.push(needsIds)),settle=()=>new Promise<void>(resolve=>setTimeout(resolve,0))
  try{
   text.value!.style.visibility='hidden';await settle()
   check(changes.length===1&&!changes[0],'固定布局中的可见性属性变化触发位置刷新')
   changes.length=0;text.value!.style.removeProperty('visibility');await settle();changes.length=0
   const controls=document.createElement('div');controls.setAttribute('data-annotation-ui','');fixture.value!.appendChild(controls);await settle();controls.textContent='测试批注正文';controls.style.display='none';await settle()
   check(changes.length===0,'批注浮层自身变化不触发内容刷新循环')
   controls.remove();await settle();changes.length=0
   const ancestor=fixture.value!.parentElement!;ancestor.classList.add('qa-visibility-test');await settle()
   check(changes.length===1&&!changes[0],'内容根节点祖先的样式变化也触发刷新')
   ancestor.classList.remove('qa-visibility-test');await settle();changes.length=0
   text.value!.firstChild!.textContent='审校后的新原文';await settle()
   check(changes.includes(true),'原文字符变化同时请求内容编号核查')
  }finally{watcher.disconnect();text.value!.textContent=message.value}
 }catch(e){if(!results.value.some(r=>!r.passed))results.value.push({name:'运行异常',passed:false,detail:String(e)})}
 finally{busy.value=false}
}
</script>
<template>
 <div data-annotation-ui class="disclosure-qa-controls"><button :disabled="busy" @click="run">{{busy?'检查中':'运行折叠恢复检查'}}</button><p role="status">{{results.filter(r=>r.passed).length}} / {{results.length}} 通过</p><pre>{{JSON.stringify(results,null,2)}}</pre></div>
 <section ref="fixture" class="disclosure-qa" :style="{maxWidth:narrow?'230px':'760px',fontSize:large?'28px':'16px'}" data-content-id="shared-disclosure-fixture">
  <details ref="outer" data-content-id="shared-disclosure-outer"><summary>现金流计算依据</summary><p ref="before">前段内容：部署投入。</p>
   <details ref="inner"><summary>来源与原文定位</summary><p v-if="show" ref="text">{{message}}</p><img ref="image" data-content-id="shared-disclosure-image" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='40'%3E%3Crect width='60' height='40' fill='blue'/%3E%3C/svg%3E" width="60" height="40" alt="独立选区图片"/></details>
   <p ref="after">后段内容：维护支出。</p>
  </details>
  <details ref="other" data-content-id="shared-disclosure-other"><summary>来源与原文定位</summary><p>无关的另一组来源。</p></details>
  <details ref="table" data-content-id="shared-disclosure-table"><summary>排序后的作业记录</summary><table><tbody><tr v-for="row in reverse?[...rows].reverse():rows" :key="row.id" :data-content-id="row.id"><td>{{row.text}}</td></tr></tbody></table></details>
  <details ref="extra" data-content-id="shared-disclosure-extra"><summary>图表与空白测试区域</summary>
   <div ref="blank" data-content-id="shared-disclosure-blank" style="height:64px;background:#f8fafc"></div>
   <div ref="chart" data-content-id="shared-disclosure-chart" data-annotation-points='[{"key":"sample-value","period":"2025","value":40}]' data-annotation-point-rects='[{"key":"sample-value","period":"2025","value":40,"rect":{"x":20,"y":15,"width":40,"height":30}}]' style="height:80px"><svg role="img" aria-label="定位测试柱状图" width="180" height="80"><rect x="20" y="15" width="40" height="30" fill="#2563eb"/></svg></div>
  </details>
 </section>
</template>
<style scoped>
.disclosure-qa-controls{height:260px;overflow:auto;border:1px solid #ddd;padding:12px}.disclosure-qa-controls pre{white-space:pre-wrap}.disclosure-qa{line-height:1.6;margin:24px 0}.disclosure-qa details{border:1px solid #bbb;padding:12px;margin:12px 0}.disclosure-qa p{margin:12px 0}.disclosure-qa img{display:block}
</style>
