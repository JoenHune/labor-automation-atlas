# 服务配置与联调准备

状态：准备稿；未表示任何账号或线上资源已创建。

## 目标资源
- 公开仓库：JoenHune/labor-automation-atlas。
- 前台：https://joenhune.github.io/labor-automation-atlas/（仅在Pages成功部署后可访问）。
- Worker：labor-automation-atlas-api；最终workers.dev域名由账号界面确认。
- D1：labor-automation-atlas，绑定DB；执行worker/migrations中的两项迁移。
- R2：labor-automation-atlas-snapshots，绑定SNAPSHOTS，不开放桶列表。
- GitHub App：拟用labor-automation-atlas-joenhune；Issues读写、Metadata只读，仅安装到此仓库。

## 配置顺序
1. 检查本地类型、单元/模拟测试、数据验证、页面构建、Worker打包及D1本地迁移。
2. 创建公开代码仓库；完整第三方原文缓存只留本地，公开原始来源URL、读取定位、校验摘要及本项目研究数据。
3. Computer Use进入Cloudflare，确认账号并创建Worker、D1和R2。若R2必须本人添加付款资料，提出具体操作要求，不擅自开通付费计划。
4. 根据实际Worker域名注册GitHub App：主页为Pages网址、用户回调为Worker/auth/callback、Webhook为Worker/webhook；订阅issues和issue_comment。生成客户端密钥、私钥与Webhook密钥，安装指定仓库。
5. 通过Cloudflare界面保存秘密：GITHUB_CLIENT_SECRET、GITHUB_APP_PRIVATE_KEY、TOKEN_ENCRYPTION_KEY、METADATA_SIGNING_KEY、GITHUB_WEBHOOK_SECRET。非秘密变量包括API_ORIGIN、SITE_ORIGIN、SITE_BASE_PATH、GITHUB_OWNER、GITHUB_REPO、GITHUB_REPOSITORY_ID、GITHUB_APP_ID、GITHUB_CLIENT_ID、GITHUB_INSTALLATION_ID。
6. 部署Worker并核对绑定、迁移和每小时清理计划。保存实际域名到前台VITE_ATLAS_API_ORIGIN；GitHub Pages构建从仓库变量读取该值。
7. 部署带工作版提示的样板页面进行完整链路实测；只对验收清单记录的实际结果标通过。研究完整版发布仍需全任务检索、复核、冻结和发布前数据更新核查。

## 验证脚本场景
两国各一个样板任务，使用本人GitHub身份创建区域批注、首评、主评论、回复评论及回复另一条回复；关闭须理由+说明，再重开。对无处理权限账号必须实际观察GitHub拒绝；不能以模拟测试代替第二身份验收。

从GitHub直接添加普通评论和变更状态，核对站内与Webhook记录；重复Webhook不得重复显示。删除父评论、过期授权、服务网络故障、快照失败时保留草稿。验证刷新时间与分享链接国家/年份/筛选/选区恢复。

批注是公开讨论，后续研究修订需人工审校。密钥与用户凭证不得输出到公开仓库、构建产物或日志。
