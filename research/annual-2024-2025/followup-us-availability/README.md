# 美国 2025 年剩余 80 个细项：发布状态复核

核查日：2026-09-14。本轮只追查尚无 2025 值的 80 个 Underlying Detail 节点，未修改站点，未重新估计或替换已发布数值。

**结论：没有发现可合法补入的新 2025 增加值。** 官方交互表与 Excel 的可用年份一致；组成法所需的 2025 同级分量也未发布。证据及每个空值节点见 `availability-audit.json`。

## 交互表与 Data API

重新请求 [BEA 官方 GDP by Industry — Underlying Detail](https://apps.bea.gov/iTable/?Categories=UGDPxInd&isURI=1&reqid=1603&step=2) 的 `UVA205`，原始请求和响应为 `itable-uva-current-request.json`、`itable-uva-current-response.json`。

- 实际表头最后一年：2024；最后修订信息：2025-09-25；单位：百万美元。
- `First_Year` 和 `Last_Year` 官方选项都以 2024 为最大值，`Last_Year` 默认 2024。
- 行业代码直接来自同一响应 `Rows.PromtData.Table`。本轮已为剩余 80 个节点补存准确官方代码，例如 `3344`（半导体）、`3254`（医药）、`23EH`（教育与医疗建筑）。这是代码/可用年份核对，没有创造新金额。

额外强制发送 `First_Year=Last_Year=2025`，响应内嵌表格 JSON 不完整，年份选择仍只到 2024，且没有有效 2025 表头。不能因为请求里写了 2025，就把返回残留的旧数字命名为 2025。此响应完整保存于 `itable-2025-response.json`，作为拒收样例。

[BEA 公共 Data API](https://apps.bea.gov/api/signup/) 另需有效 UserID。当前没有可用配置，明确传空 UserID 的官方响应为 `APIErrorCode=1 / Invalid Request - Invalid API UserId.`，保存于 `api-empty-userid-response.txt`。**这不是“API 没有 2025 数据”的证据，也没有冒充已完成授权 API 核验。** 数据可用年份的结论依据是已经成功取得的官方 iTable 表头、年份元数据、Excel 和发布状态页。

另一次未传 UserID 的请求没有取得响应正文，零字节原样保存在 `api-no-key-response.empty.txt`；它不是有效 JSON，也不支持数据可用性判断。

## 能否按增加值三分量计算

公式原则上成立：

`现价增加值 = 雇员报酬 + 生产及进口税减补贴 + 总营业盈余`

要求同年、同行业、同地理范围、同计价、同修订版本。必须使用含固定资本消耗的总营业盈余，不能拿净营业盈余、企业净利润、工资或居民收入代替。官方依据为保存的 `ComponentsOfVaInfo.xlsx`：`Definitions!A4:B15` 的父子结构及 `A27/A29/A35/A37` 的定义。

实际数据不满足 2025 输入条件：

| 来源 | 核查到的末年 | 发布 / 状态 | 定位 |
|---|---:|---|---|
| 主表 `TVA113-A`：Components of Value Added by Industry | 2024 | 2026-06-25 发布，仍继续 | [当前 ValueAdded.xlsx](https://apps.bea.gov/industry/Release/XLS/GDPxInd/ValueAdded.xlsx)，A3/A5/D8:AE8；官方交互响应也到 2024 |
| 主表 `TVA112-A`：组成占比 | 2024 | 2026-06-25 发布 | 同上；这还是占比，不能用旧占比拆 2025 增加值 |
| `UVCT2-A`：雇员报酬 | 2023 | 2024-09-26 最后发布，2025-09-25 宣布停发 | `ComponentsOfVA.xlsx`，A3/A5/D8:AC8 |
| `UVCT3-A`：生产及进口税减补贴 | 2023 | 同上 | 同上 |
| `UVCT40-A`：总营业盈余 | 2023 | 同上 | 同上 |
| 同一档案中的直接增加值 `UVCT1-A` | 2023 | 同上 | 同上 |

官方 [Industry Tables No Longer Published](https://www.bea.gov/data/industry-tables-no-longer-published) 直接提供 [ComponentsOfVa.zip](https://www.bea.gov/sites/default/files/2025-09/ComponentsOfVa.zip)，并写明最后发布 2024-09-26。ZIP 内三份完整工作簿已保存。URL 目录中的 `2025-09` 是归档位置，**不是其数据末年或最后数据发布时间**。

官方 [Discontinued or Delayed Statistics](https://www.bea.gov/data/discontinued-or-delayed-statistics) 的 `9/25/2025 / National / Industry / Underlying detail Components of Value Added` 行明确列为停发。不能沿用更早迁移说明页面“已搬到交互表”的文字，推断它还在更新；较新的停发清单与实际档案优先。

所以本轮没有把 2023 或 2024 的分量与 2025 总量拼接，也没有用别的口径补全总营业盈余。

## 什么变化之后才能继续补数

官方 [2026 年度更新安排](https://www.bea.gov/information-updates-national-regional-economic-accounts) 的 `Data availability / On September 30, 2026` 列出行业账户及其底层细表；[GDP by Industry 当前发布页](https://www.bea.gov/data/gdp/gdp-industry) 也将下一次发布安排为 **2026-09-30**。这些页面本轮已重新读取和保存。

可继续填入剩余空值，须出现下列一种真实数据变化：

1. BEA 发布 `UVA205` / `UnderlyingGDPbyIndustry` 的 2025 观测，行业代码、年份表头、现价单位、版本信息和父子范围均可核对；或
2. BEA 发布这 80 个对应行业的完整 2025 三分量，同范围同版本可复算，再将结果明确标为计算值。

日期到了、网络恢复、拿到 API key，都不等于这些数字已经发布。年度更新安排也不保证每一个节点届时有值；实际下载后再判定。停发的组成细表如果要采用，还需要 BEA 明确恢复发布或推出可比替代系列，不能将普通年度更新安排视为停发表自动恢复。

## 可复核文件

`availability-audit.json` 提供接口表头、年份选项、两类组成表状态、组成公式要求、80 个缺口节点及继续条件；原始响应、官方网页、ZIP 和工作簿均在本目录。执行 `python3 research/annual-2024-2025/followup-us-availability/audit.py` 可重做离线核验。`files-manifest.json` 保存逐文件 SHA。
