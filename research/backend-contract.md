# 批注后台实现约定
状态：接口与界面首轮代码可运行；34项单元/模拟测试通过，尚无已部署服务及真实身份联调。

## 身份
GitHub App 仅申请本仓库 Issues 读写，Metadata 只读；安装仅选择 labor-automation-atlas。用户写入必须使用 GitHub App user access token，安装令牌仅用于读取和同步。GitHub权限为用户与应用权限的交集；匿名只读，不接受前端提交的作者身份。

OAuth 同时使用 state、服务端保存的 S256 verifier、短期HttpOnly浏览器绑定Cookie。GitHub凭证AES-GCM加密存于D1；不会返回浏览器。回调发一次性60秒站点交换票据，需原标签页私有verifier才能兑换；站点会话最多1小时。票据位于fragment且消费后清除；不依赖跨站第三方Cookie作为业务会话。失效保留草稿，重新授权。

## 路由
- GET /health
- GET /auth/login、GET /auth/callback、POST /auth/exchange
- GET /session、POST /logout
- GET /annotations?country=&page=，GET /annotations/:id
- POST /annotations、POST /annotations/:id/comments、POST /annotations/:id/state
- POST /snapshots、GET /snapshots/:id
- POST /webhook

正文和状态以GitHub为准。D1保存带country/page索引、缓存时间和回复父链；R2保存用户网站选区的PNG。创建Issue时首评为正文；追加回复为Issue Comment，结构化标记保存anchor、parentCommentId、operationKey及版本，并以服务端HMAC保护关联元数据。站外普通评论没有有效元数据时作为主评论呈现；父评论被删除时保留原父编号并显示已删除。

## 失败与恢复
每个用户写操作使用UUID幂等键和请求摘要，D1锁防并发。GitHub写成功但D1失败的重试应通过结构化操作标记对账，不能盲目再写。关闭先保存原因说明处理记录，再变更Issue状态；部分完成要保留可恢复阶段。Webhook对原始请求体验签，以delivery id去重；乱序事件应重新获取GitHub现态再入库。

选区恢复先核国家/页面/年份，再核稳定编号/内容指纹/精确文字上下文/图表键；部分跨组件目标变更时整条转“原内容已变更”，显示原快照而不挂到新内容。布局空白作为相对页面/相邻内容锚点，不把浏览器像素坐标当永久定位。

## 当前实现边界
已有：上述完整路由、D1/R2绑定代码、GitHub用户写入、幂等锁及响应丢失对账、签名Webhook、回复父链与删除处理、权限检查、关闭/重开记录、大小/格式校验、短会话与定期清理、文字/矩形批注界面、浏览器草稿、手机底部浮层。

验证：34项单元/模拟测试；页面与Worker打包通过。模拟使用内存SQLite和可控GitHub响应，不能代替真实GitHub权限验收。手机框选生成280×160 PNG并在就地浮层核对，未包含选区外页面内容。

未完成：GitHub App/Cloudflare账号配置、真实D1/R2读写与全流程联调；完整桌面手势、文字换行/排序/缩放/更新/删除等浏览器验证仍须逐项执行。当前单页索引超过300条或一次GitHub同步超过2000条会明确报不完整而不静默丢弃；发布前须补齐分页。

官方依据：
- [GitHub App用户令牌与PKCE](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [GitHub App权限](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app)
- [D1准备语句](https://developers.cloudflare.com/d1/worker-api/prepared-statements/)
- [Cloudflare密钥](https://developers.cloudflare.com/workers/configuration/secrets/)

