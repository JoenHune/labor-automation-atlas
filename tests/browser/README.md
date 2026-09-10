# 浏览器中的批注定位回归

`AnnotationDomHarness.vue` 在真实 DOM 中调用生产使用的定位代码，检查嵌套文字与图片、跨组件选区、排序、换行、文字放大、删除及歧义拒绝。它不模拟 GitHub 登录、评论或快照服务。

本地运行时临时创建 `docs/methodology/annotation-qa.md`：

```md
---
layout: page
---
<script setup>
import AnnotationDomHarness from '../../tests/browser/AnnotationDomHarness.vue'
import DisclosureHarness from '../../tests/browser/DisclosureHarness.vue'
import KeyboardAnnotationHarness from '../../tests/browser/KeyboardAnnotationHarness.vue'
</script>
<KeyboardAnnotationHarness />
<AnnotationDomHarness />
<DisclosureHarness />
```

启动网站后访问 `/labor-automation-atlas/methodology/annotation-qa`，分别点击三个检查按钮。DOM 定位应为 48 / 48，折叠恢复应为 39 / 39，键盘批注应为 15 / 15；可见结果列出实际选区目标和拒绝原因。键盘检查覆盖嵌套段落、表格行、数据定义、折叠标题、Mac Option 字符以及原有内容编号兼容。文字检查覆盖 NFC 组合字符、韩文组合字母、表情符号、跨节点字素、等价编码变化，以及拒绝不完整字素。矩形字符检查向内收缩 0.1 像素，避开浏览器相邻字形矩形的 1/64 像素重叠。检查结束后删除临时 Markdown 页面，避免将测试入口发布到站点。

真实任务页面仍须通过文字拖选、浮层、快照与草稿恢复检查；该测试页不能替代真实 GitHub 身份及服务异常的完整验收。
