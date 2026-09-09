# 人力与自动化图谱
以中国、美国最新官方行业增加值为入口，沿行业流程研究实体劳动任务、自动化证据与成立条件；内容支持任意区域批注。

研究工作版：https://joen.site/labor-automation-atlas/ 。项目正在研究与实现，尚未完成最终验收；在线任务页明确展示候选状态及证据缺口，批注服务仍待账号配置与真实身份联调。完整范围见 [执行计划](research/accepted-plan.md)，实际进度见 [STATUS](research/STATUS.md)。

技术：VitePress、Vue、TypeScript、ECharts、GitHub Pages；Cloudflare Workers、D1、R2；自建 GitHub App 以真实用户身份写入 Issues 和 Comments。

所有缺失参数保留为空；来源、自报性质、试点与持续运行分开标记。批注不自动转为研究事实。

仓库中的 `data/research.json` 是研究存储清单，关联 `data/research.json.shards/` 中按内容摘要命名的分片。读写统一经过 `src/research/storage.ts`，检查字节数、SHA256、记录数与路径；原记录、空值、顺序和证据关联保持不变。构建时从这份逻辑数据生成页面、图表及网站可下载的完整 `exports/research.json`，完整导出仍是普通JSON。已有单文件格式可用 `npx tsx scripts/migrate-research-storage.ts` 无损迁移；不要把存储清单当作完整研究数据直接解析。
