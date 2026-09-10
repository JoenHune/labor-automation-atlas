<script setup lang="ts">
import {ref} from 'vue'
import {createAnchor,ensureContentIds,liveBlocks,pageScope,rectOf,resolveAnchor} from '../../src/annotations/dom'
import {isAnnotationShortcut,keyboardAnnotationTarget,prepareKeyboardTargets} from '../../src/annotations/keyboard'
const owner=ref<HTMLElement>(),results=ref<{name:string;passed:boolean;detail?:unknown}[]>([]),busy=ref(false)
const check=(ok:unknown,name:string,detail?:unknown)=>{results.value.push({name,passed:Boolean(ok),detail});if(!ok)throw new Error(name)}
async function run(){
 busy.value=true;results.value=[]
 try{
  await ensureContentIds()
  const root=owner.value!,p=root.querySelector('p')!,summary=root.querySelector('summary')!,dd=root.querySelector('dd')!,row=root.querySelector('tr')!
  const before=(await liveBlocks()).filter(b=>root.contains(b.element)).map(b=>({id:b.id,fingerprint:b.fingerprint}))
  prepareKeyboardTargets(root)
  const after=(await liveBlocks()).filter(b=>root.contains(b.element)).map(b=>({id:b.id,fingerprint:b.fingerprint}))
  check(JSON.stringify(before)===JSON.stringify(after),'增加键盘焦点不改变既有目标或语义指纹')
  check([p,dd,row].every(el=>el.tabIndex===0&&!el.hasAttribute('data-content-id')),'嵌套段落、数据定义和行可聚焦，并沿用原有内容编号')
  check(keyboardAnnotationTarget(p,root)===p,'聚焦段落只选择该段落')
  check(keyboardAnnotationTarget(p.querySelector('em'),root)===p,'段落内文字仍归属该段落')
  check(keyboardAnnotationTarget(summary,root)===summary,'折叠标题只选择标题')
  check(keyboardAnnotationTarget(dd,root)===dd,'数据定义只选择当前值')
  check(keyboardAnnotationTarget(row.querySelector('td'),root)===row,'表格单元格关联当前行')
  check(keyboardAnnotationTarget(root.querySelector('input'),root)===null&&keyboardAnnotationTarget(root.querySelector('[contenteditable]'),root)===null,'输入框与可编辑文本不触发批注快捷键')
  check(keyboardAnnotationTarget(root.querySelector('[data-annotation-ui] p'),root)===null,'批注界面不成为内容选区')
  check(keyboardAnnotationTarget(document.body,root)===null&&keyboardAnnotationTarget(null,root)===null,'拒绝网站内容范围之外的目标')
  check(root.querySelector('[tabindex="-1"]')?.getAttribute('tabindex')==='-1','保留作者指定的负焦点顺序')
  check(isAnnotationShortcut(new KeyboardEvent('keydown',{altKey:true,shiftKey:true,key:'Å',code:'KeyA'})),'macOS Option 改写字符时仍可使用快捷键')
  check(!isAnnotationShortcut(new KeyboardEvent('keydown',{altKey:true,shiftKey:true,key:'a',code:'KeyA',repeat:true}))&&!isAnnotationShortcut(new KeyboardEvent('keydown',{altKey:true,shiftKey:true,key:'a',code:'KeyA',isComposing:true})),'长按和输入法组合输入不重复生成选区')
  const scope=pageScope('/labor-automation-atlas/'),anchor=await createAnchor(rectOf(p.getBoundingClientRect()),scope,'keyboard-qa')
  check(anchor.targets.length===1&&anchor.targets[0].contentId==='shared-keyboard-owner'&&anchor.targets[0].textSegments?.map(s=>s.exact).join('')===p.textContent,'生产框选锚点仅包含聚焦段落的文字',anchor.targets)
  const restored=await resolveAnchor(anchor,scope),box=p.getBoundingClientRect()
  check(restored.status==='resolved'&&restored.rects.every(r=>r.y>=box.y-.5&&r.y+r.height<=box.bottom+.5),'恢复后的高亮不扩张到整张卡片',restored)
 }catch(e){if(!results.value.some(r=>!r.passed))results.value.push({name:'运行异常',passed:false,detail:String(e)})}
 finally{busy.value=false}
}
</script>
<template>
 <div data-annotation-ui class="keyboard-qa-controls"><button @click="run" :disabled="busy">运行键盘批注检查</button><p role="status">{{results.filter(r=>r.passed).length}} / {{results.length}} 通过</p><pre>{{JSON.stringify(results,null,2)}}</pre></div>
 <section ref="owner" data-content-id="shared-keyboard-owner" class="keyboard-qa-owner">
  <h2>可独立聚焦的内容</h2><p>当前段落：<em>只对这里添加批注。</em></p>
  <details open><summary>查看数据口径</summary><dl><dt>年份</dt><dd>2025</dd></dl></details>
  <table><tbody><tr><td>第一行</td><td>行的说明</td></tr></tbody></table>
  <p tabindex="-1">作者保留的程序焦点</p>
  <input aria-label="测试输入框"/><div contenteditable="true" aria-label="测试可编辑内容">编辑内容</div>
  <div data-annotation-ui><p>浮动批注自身的文字</p></div>
 </section>
</template>
<style scoped>
.keyboard-qa-controls{height:280px;overflow:auto}.keyboard-qa-controls pre{white-space:pre-wrap}
.keyboard-qa-owner{max-width:650px;padding:20px;border:1px solid #ccc;margin:20px}.keyboard-qa-owner p{margin:20px 0}
button{border:1px solid #2563eb;padding:8px 16px}
</style>
