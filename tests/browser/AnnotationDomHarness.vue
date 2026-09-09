<script setup lang="ts">
import {nextTick,ref} from 'vue'
import {createAnchor,ensureContentIds,liveBlocks,locateQuote,pageScope,rectOf,resolveAnchor} from '../../src/annotations/dom'
import {fingerprint,normalizeText} from '../../src/annotations/anchors'
import {ownedTargetId} from '../../src/annotations/text-targets'
import type {Anchor} from '../../src/annotations/schema'
const owner=ref<HTMLElement>(),heading=ref<HTMLElement>(),blank=ref<HTMLElement>(),duplicateOwner=ref<HTMLElement>(),unicode=ref<HTMLElement>()
const title=ref('父标题：独立选择与恢复'),showTitle=ref(true),reversed=ref(false),narrow=ref(false),large=ref(false),busy=ref(false)
const unicodeText=ref('前e\u0301后😀末'),unicodeParts=ref<string[]>([])
const results=ref<{name:string;passed:boolean;detail?:unknown}[]>([])
const rows=[{id:'shared-qa-first',text:'第一条独立内容，验收后交接。'},{id:'shared-qa-second',text:'第二条独立内容，保持语义编号。'}]
const repeated='前'.repeat(100)+'检查'+'后'.repeat(100)
const svg='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="70" height="45"><rect width="70" height="45" fill="blue"/></svg>')
const check=(ok:unknown,name:string,detail?:unknown)=>{results.value.push({name,passed:Boolean(ok),detail});if(!ok)throw new Error(name)}
const rectangle=(el:Element)=>rectOf(el.getBoundingClientRect())
const rangeOf=(el:Node)=>{const range=document.createRange();range.selectNodeContents(el);return range}
const scope=()=>pageScope('/labor-automation-atlas/')
const capture=(range:Range)=>createAnchor(rectOf(range.getBoundingClientRect()),scope(),'qa',range)
const unicodeRange=(start:number,end:number)=>{
 const p=unicode.value!.querySelector('p')!,walker=document.createTreeWalker(p,NodeFilter.SHOW_TEXT),range=document.createRange()
 let node:Node|null,offset=0,started=false
 while((node=walker.nextNode())){
  const length=node.textContent!.length
  if(!started&&start<offset+length){range.setStart(node,start-offset);started=true}
  if(started&&end<=offset+length){range.setEnd(node,end-offset);return range}
  offset+=length
 }
 throw new Error('测试文字范围不存在')
}
const sameBox=(rects:ReturnType<typeof rectangle>[],expected:ReturnType<typeof rectangle>)=>rects.length>0&&Math.abs(Math.min(...rects.map(r=>r.x))-expected.x)<0.5&&Math.abs(Math.max(...rects.map(r=>r.x+r.width))-expected.x-expected.width)<0.5&&rects.every(r=>r.y>=expected.y-0.5&&r.y+r.height<=expected.y+expected.height+0.5)
const expectReject=async(action:()=>Promise<unknown>,name:string)=>{let message='';try{await action()}catch(e){message=String(e)}check(/无法唯一定位|未能唯一定位|重复文字/.test(message),name,message)}
let parentAnchor:Anchor|null=null,crossAnchor:Anchor|null=null
async function run(){
 busy.value=true;results.value=[]
 try{
  title.value='父标题：独立选择与恢复';showTitle.value=true;reversed.value=false;narrow.value=false;large.value=false;unicodeText.value='前e\u0301后😀末';unicodeParts.value=[];await nextTick();await ensureContentIds()
  const selectedUnicode=unicodeRange(3,4)
  const unicodeExpected=rectOf(selectedUnicode.getBoundingClientRect()),unicodeAnchor=await capture(selectedUnicode),unicodeResult=await resolveAnchor(unicodeAnchor,scope())
  check(unicodeResult.status==='resolved'&&unicodeResult.rects.length===1&&Math.abs(unicodeResult.rects[0].x-unicodeExpected.x)<0.5&&Math.abs(unicodeResult.rects[0].width-unicodeExpected.width)<0.5,'组合字符之后的汉字准确恢复',{expected:unicodeExpected,actual:unicodeResult})
  for(const glyph of ['e\u0301','a\u0315\u0300','가','😀','👩🏽‍🔬','🇨🇳','क्‍ष']){
   unicodeText.value='前'+glyph+'后';await nextTick()
   const range=unicodeRange(1,1+glyph.length),expected=rectOf(range.getBoundingClientRect()),anchor=await capture(range),resolved=await resolveAnchor(anchor,scope())
   check(anchor.targets[0].text?.exact===normalizeText(glyph)&&resolved.status==='resolved'&&sameBox(resolved.rects,expected),'完整字素恢复：'+glyph)
   // Inset the selection to avoid browser glyph rectangles overlapping by 1/64 px.
   const area=await createAnchor({...expected,x:expected.x+0.1,width:expected.width-0.2},scope(),'qa'),areaResolved=await resolveAnchor(area,scope())
   check(area.targets.length===1&&area.targets[0].textSegments?.some(s=>s.exact===normalizeText(glyph))&&areaResolved.status==='resolved'&&sameBox(areaResolved.rects,expected),'矩形按完整字素定位：'+glyph,area.targets.map(t=>t.textSegments))
   unicodeText.value=unicodeText.value.normalize('NFC');await nextTick()
   const normalizedRange=unicodeRange(1,1+glyph.normalize('NFC').length),normalizedResolved=await resolveAnchor(anchor,scope())
   check(normalizedResolved.status==='resolved'&&sameBox(normalizedResolved.rects,rectOf(normalizedRange.getBoundingClientRect())),'等价字符编码改变后恢复：'+glyph)
  }
  unicodeParts.value=['前e','\u0301后'];await nextTick()
  const splitRange=unicodeRange(1,3),splitAnchor=await capture(splitRange),splitResolved=await resolveAnchor(splitAnchor,scope())
  check(splitResolved.status==='resolved'&&sameBox(splitResolved.rects,rectOf(splitRange.getBoundingClientRect())),'跨文字节点的组合字符完整定位')
  unicodeParts.value=['前','é','后'];await nextTick()
  const recomposed=await resolveAnchor(splitAnchor,scope())
  check(recomposed.status==='resolved'&&sameBox(recomposed.rects,rectOf(unicodeRange(1,2).getBoundingClientRect())),'节点拆分与编码同时变化后恢复')
  for(const glyph of ['e\u0301','😀','👩🏽‍🔬']){
   unicodeParts.value=[];unicodeText.value='前'+glyph+'后';await nextTick()
   let message='';try{await capture(unicodeRange(1,2))}catch(e){message=String(e)}
   check(message.includes('完整选择字符或表情'),'不保存半个字符或表情：'+glyph,message)
   check(locateQuote(unicode.value!,{exact:glyph.slice(0,1),prefix:'前',suffix:glyph.slice(1)+'后'})===null,'既有不完整字素锚点拒绝错挂：'+glyph)
  }
  unicodeText.value='前e\u0301后😀末';unicodeParts.value=[];await nextTick()
  const parentId=await ownedTargetId('shared-qa-parent','text')
  parentAnchor=await capture(rangeOf(heading.value!))
  check(parentAnchor.targets.length===1&&parentAnchor.targets[0].contentId===parentId&&parentAnchor.targets[0].text?.exact===title.value,'父标题只属于虚拟父文字目标',parentAnchor.targets.map(t=>({id:t.contentId,text:t.text?.exact})))
  check((await resolveAnchor(parentAnchor,scope())).status==='resolved','父标题立即恢复')
  const leaf=owner.value!.querySelector<HTMLElement>('[data-content-id="shared-qa-first"]')!
  const leafAnchor=await capture(rangeOf(leaf))
  const oldHash=await fingerprint(JSON.stringify({text:normalizeText(leaf.textContent??''),points:[],image:null}))
  check(leafAnchor.targets.length===1&&leafAnchor.targets[0].contentId==='shared-qa-first'&&leafAnchor.targets[0].fingerprint===oldHash,'既有叶子编号与指纹保持')
  const cross=rangeOf(heading.value!),end=leaf.querySelector('p')!;cross.setEndAfter(end)
  crossAnchor=await capture(cross)
  check(crossAnchor.targets.length===2&&new Set(crossAnchor.targets.map(t=>t.contentId)).size===2&&crossAnchor.targets.some(t=>t.contentId===parentId)&&crossAnchor.targets.some(t=>t.contentId==='shared-qa-first'),'跨父标题与子块完整且不重复',crossAnchor.targets.map(t=>({id:t.contentId,text:t.text?.exact})))
  const parentTarget=crossAnchor.targets.find(t=>t.contentId===parentId)!,parentRects=locateQuote(owner.value!,parentTarget.text!,true)!,head=rectangle(heading.value!)
  check(parentRects.every(r=>r.y>=head.y-1&&r.y+r.height<=head.y+head.height+1),'父标题恢复矩形不包含子块',parentRects)
  const childRectAnchor=await createAnchor(rectangle(leaf),scope(),'qa')
  check(childRectAnchor.targets.length===1&&childRectAnchor.targets[0].contentId==='shared-qa-first','只框子块不会多挂父目标')
  reversed.value=true;await nextTick()
  check((await resolveAnchor(parentAnchor,scope())).status==='resolved'&&(await resolveAnchor(crossAnchor,scope())).status==='resolved','对子块排序后父子锚点保持')
  narrow.value=true;large.value=true;await nextTick()
  check((await resolveAnchor(parentAnchor,scope())).status==='resolved'&&(await resolveAnchor(crossAnchor,scope())).status==='resolved','变窄并放大文字后仍按内容恢复')
  title.value='父标题已实质改写';await nextTick()
  const changed=await resolveAnchor(crossAnchor,scope())
  check(changed.status==='changed'&&changed.rects.length===0,'父文字改变时整条批注停止挂载')
  showTitle.value=false;await nextTick()
  const deleted=await resolveAnchor(parentAnchor,scope())
  check(deleted.status==='changed'&&deleted.rects.length===0,'父原文删除后不转挂子块')
  title.value='父标题：独立选择与恢复';showTitle.value=true;narrow.value=false;large.value=false;await nextTick()
  check((await resolveAnchor(parentAnchor,scope())).status==='resolved','原文恢复后按相同内容匹配')
  const all=await liveBlocks(),images=all.filter(b=>b.kind==='image'&&b.id.startsWith('shared-qa-parent'))
  check(images.length===1,'父块内具名图片成为独立目标')
  const imageAnchor=await createAnchor(rectangle(owner.value!.querySelector('img')!),scope(),'qa')
  check(imageAnchor.targets.length===1&&imageAnchor.targets[0].kind==='image'&&(await resolveAnchor(imageAnchor,scope())).status==='resolved','图片框选与恢复不夹带父文字')
  const blankBox=rectangle(blank.value!),space=await createAnchor({x:blankBox.x+5,y:blankBox.y+5,width:20,height:20},scope(),'qa')
  check(space.targets.length===1&&space.targets[0].kind==='whitespace'&&(await resolveAnchor(space,scope())).status==='resolved','真正空白区域仍能恢复')
  const repeatedNode=duplicateOwner.value!.querySelector('p')!.firstChild!,repeatRange=document.createRange()
  repeatRange.setStart(repeatedNode,100);repeatRange.setEnd(repeatedNode,102)
  await expectReject(()=>capture(repeatRange),'重复文字上下文不足时拒绝保存')
  await expectReject(()=>createAnchor(rectOf(repeatRange.getBoundingClientRect()),scope(),'qa'),'矩形命中重复文字时同样拒绝')
  const duplicateImage=duplicateOwner.value!.querySelector('img')!
  await expectReject(()=>createAnchor(rectangle(duplicateImage),scope(),'qa'),'重复图片不能降为关联空白')
  const whole=rectangle(duplicateOwner.value!)
  await expectReject(()=>createAnchor(whole,scope(),'qa'),'部分可定位区域也不能掩盖歧义内容')
 }catch(e){if(!results.value.some(r=>!r.passed))results.value.push({name:'运行异常',passed:false,detail:String(e)})}
 finally{busy.value=false}
}
</script>

<template>
 <div data-annotation-ui class="qa-controls">
  <button @click="run" :disabled="busy">{{busy?'检查中':'运行 DOM 定位检查'}}</button>
  <p role="status">{{results.filter(r=>r.passed).length}} / {{results.length}} 通过</p>
  <pre>{{JSON.stringify(results,null,2)}}</pre>
 </div>
 <section ref="owner" data-content-id="shared-qa-parent" tabindex="0" :style="{maxWidth:narrow?'230px':'760px',fontSize:large?'30px':'16px'}" class="qa-owner">
  <h2 v-if="showTitle" ref="heading">{{title}}</h2>
  <article v-for="row in reversed?[...rows].reverse():rows" :key="row.id" :data-content-id="row.id" tabindex="0">
   <h3>独立子块 {{row.id}}</h3><p>{{row.text}}</p>
  </article>
  <img id="shared-qa-unique-image" :src="svg" width="70" height="45" alt="具名测试图片" />
  <p>父块末尾文字。</p>
 </section>
 <div ref="blank" style="height:100px"></div>
 <section ref="unicode" data-content-id="shared-qa-unicode" class="qa-owner"><p v-if="!unicodeParts.length">{{unicodeText}}</p><p v-else><span v-for="(part,index) in unicodeParts" :key="index">{{part}}</span></p></section>
 <section ref="duplicateOwner" data-content-id="shared-qa-duplicate-owner" class="qa-owner">
  <p>{{repeated+' '+repeated}}</p>
  <div data-content-id="shared-qa-duplicate-child">用于构成嵌套结构的子块。</div>
  <img :src="svg" width="70" height="45" alt="重复图片一" />
  <img :src="svg" width="70" height="45" alt="重复图片二" />
 </section>
</template>

<style scoped>
.qa-owner{border:1px solid #ccc;padding:16px;margin:24px 0;line-height:1.5;overflow-wrap:anywhere}
.qa-owner article{padding:14px;margin:12px 0;border:1px solid #bbb}
.qa-owner h2,.qa-owner h3{font-size:1.2em;line-height:1.5}
.qa-owner img{display:inline-block;margin:12px}
button{border:1px solid #2563eb;padding:8px 16px}
pre{white-space:pre-wrap}
.qa-controls{height:240px;overflow:auto}
</style>
