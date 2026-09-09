# 浏览器中的批注定位回归

`AnnotationDomHarness.vue` 在真实 DOM 中调用生产使用的定位代码，检查嵌套文字与图片、跨组件选区、排序、换行、文字放大、删除及歧义拒绝。它不模拟 GitHub 登录、评论或快照服务。

本地运行时临时创建 `docs/methodology/annotation-qa.md`：

```md
---
layout: page
---
<script setup>
import AnnotationDomHarness from '../../tests/browser/AnnotationDomHarness.vue'
</script>
<AnnotationDomHarness />
```

启动网站后访问 `/labor-automation-atlas/methodology/annotation-qa`，点击“运行 DOM 定位检查”。当前应为 18 / 18 通过；可见结果列出实际选区目标和拒绝原因。检查结束后删除临时 Markdown 页面，避免将测试入口发布到站点。

真实任务页面仍须通过文字拖选、浮层、快照与草稿恢复检查；该测试页不能替代真实 GitHub 身份及服务异常的完整验收。
