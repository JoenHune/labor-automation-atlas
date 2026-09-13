# 美国 2024—2025 年宏观层级补数

核查日：2026-09-14。仅增加值与行业结构，不恢复人工任务研究，也不因就业分母缺失阻止现价增加值展示。

## 可直接接入的结果

`us-annual-va-candidate.json` 含 11 个现有入选根行业，以及全部已从两张官方增加值表辨认并归属于这些根的节点。节点共 145 个：11 个根、132 个细分或中间节点、2 个可选制造业分组（耐用品与非耐用品）。跨层节点不能理解为同层互斥行业数。

2024 年 145 个节点均有官方值；剔除根与两个可选分组后，细分从现有 44 个有值节点增至 132 个，增加 88 个。2025 年共 65 个节点有官方值，其中细分 52 个（比现有增加 8 个）；其余 80 个细分为明确的未发布空值，不拿 2024 年填补。

| 入选根行业 | 2024 有值细分及中间节点 | 2025 有值细分及中间节点 |
|---|---:|---:|
| 农林渔猎 | 4 | 2 |
| 建筑 | 8 | 0 |
| 制造 | 45 | 19 |
| 批发 | 11 | 0 |
| 零售 | 10 | 4 |
| 信息 | 12 | 4 |
| 金融保险 | 7 | 4 |
| 房地产及租赁 | 6 | 4 |
| 专业科技服务 | 9 | 3 |
| 医疗社助 | 9 | 4 |
| 政府 | 11 | 8 |

表中不计根及两个可选制造分组，计数为树上所有层级节点，不是同层行业数量。

## 官方来源与版本

1. [主表 ValueAdded.xlsx](https://apps.bea.gov/industry/Release/XLS/GDPxInd/ValueAdded.xlsx)，`TVA105-A`，单位百万美元，现价，年度 1997—2025，发布日期 2026-06-25。核查下载与既有原件 SHA 完全一致：`87b7484af9f75a06930151004f7f76a84b715e2ccb7ad20162e3c338e39b3e6c`。
2. [Underlying Detail ValueAdded.xlsx](https://apps.bea.gov/industry/Release/XLS/UGdpxInd/ValueAdded.xlsx)，`UVA205-A`，单位百万美元，现价，年度 1997—2024，发布日期 2025-09-25。SHA：`9238bd28af17bd50eb14a6b404e159b5e199dd11f03f6359d1f237f48a1f7193`。
3. [BEA 官方分类对照](https://www.bea.gov/sites/default/files/2023-10/BEA-Industry-and-Commodity-Codes-and-NAICS-Concordance.xlsx)，`NAICS Codes`，A2 说明 21/71/138/402/414 层级，各产品可用程度不同。E:F 为 138 级别代码和名称，L 为相关 2017 NAICS。不能把 402 或 414 类名称当作 2024/2025 有值证据。
4. [GDP by Industry 发布状态](https://www.bea.gov/data/gdp/gdp-industry)核查仍写当前发布 2026-06-25、下一次 2026-09-30；[年度更新页](https://www.bea.gov/information-updates-national-regional-economic-accounts)将下一次行业账户及细表更新安排在 2026-09-30。预计日不是已发布数据，届时仍需重新下载核对。

两个文件虽然发布日不同，**2024 年全部 96 个重叠产业行逐项完全相等，GDP 也相等**。因此本次在相同年份、相同现价范围且父值完全相同的条件下整合。2024 重叠行优先使用主表值，细表独有节点保留自身 2025-09-25 发布信息；绝不将所有叶值改写为 2026-06-25。

细表 A205 明示底层估计质量显著低于所属上层汇总。请在展开这些细项的位置显示这一提示；不能只在总方法页写一次。A206 允许细目因舍入不完全相加，本次保留原数，没有强行校准到总值。

## 图谱结构与既有 ID

- 现有 44 个已赋值细分的 `us-*-bea-*` ID、名称和 2024/2025 数值全部保持。`parentIndustryId` 是原有国家页根 ID；`parentId` 是官方层级直接父节点。新增主表节点仍按 `us-*-bea-{TVA105行号}`；细表独有节点按 `us-*-uva-{UVA205行号}`。
- 当前仓库实际 ID 不是 `us-prod-*`；`data/research.json.metadata.subindustryProductivity.parents` 与 `industry-scale.ts` 均使用去掉年份后缀的 `us-*-bea-*`，已按此映射。
- `code=UVA205:{行号}` 是唯一官方表行定位；`officialCodes` 和 `concordance` 保存能够按名称直接核对的 BEA 类代码、NAICS 和单元格。部分汇总行没有独立 NAICS 代码，不编造。图谱代码可直接用稳定 ID，不必靠中文名称拼接。
- 制造业官方有“耐用品 / 非耐用品”两个中间分组。若维持现有 19 个制造业同层类别，应跳过 `optionalGroupingNode=true` 的两个节点，让其直属子项用 `displayParentId`。不能把耐用品汇总与木制品等叶类同榜叠加。
- 2024 建筑必须使用 **8 个 BEA 工程类型**，替换该年原先没有数值的 NAICS 236/237/238 分解视图。它们来自增加值表，不是施工支出或总产出。对照表列 L 是 `23*`，说明不是 NAICS 三类的一一对应。旧分类可保留在研究库存，不能与新 8 类同时算占比。
- 2024 批发必须用官方 **11 项**，替换原先三个没有数值的 NAICS 行。第 11 项是关税；只放 423/424/425 会漏掉 83,587 百万美元。若另设“耐用品商贸批发 / 非耐用品商贸批发”中间分组，需明确由官方子项求和为计算项，而非伪称 BEA 直接发布的 423/424 增加值。
- 2025 建筑与批发尚未在此细表发布，不应出现可假装展开的 2024 数值。可显示父级总值和具体缺口，以及明确的“切到 2024 年看已发布细分”入口。

## 特殊口径检查

**批发与关税。** `UVA205-A!AE91=83587`、行业行 83，分类对照 `NAICS Codes!E346=42ID`，`L346=n.a.`。[BEA FAQ 1476](https://www.bea.gov/help/faq/1476)明确进口关税收入归政府，同时列入批发业增加值中的生产税减补贴。它是批发父值的核算组成，不是一个独立经营行业，也不是政府行业增加值。候选节点标为 `tax-accounting-component`；不能与企业批发数值混解释。

**政府。** 全部政府子层直接取 GDP by Industry 原表缩进结构，没有接入 COFOG 功能支出，也没有用 NIPA 政府消费替换行业增加值。联邦 = 一般政府 + 政府企业；一般政府 = 国防 + 非国防。州与地方 = 一般政府 + 政府企业。2024 的州与地方一般政府再分公立教育、公立医院医疗、其他服务（合计与父值差 1 百万美元，属舍入范围）。2025 最后这三级未发布，保持空白。公立医院/教育归政府，不与私人医疗/教育类别叠加。

**住房。** 房地产含住房服务、其他房地产；2024 的住房再分业主自住与出租住房服务。业主自住含估算租金，不解释为房地产雇员独立创造的产出。2025 主表能新增住房和其他房地产两项，但更末级住房明细为空。

## 检索记录与排除

| 路径 / 查询 | 实际检查及结论 |
|---|---|
| BEA GDP by Industry 当前发布及 `ValueAdded.xlsx` | 下载完整文件，读 TVA105-A 的 2024/2025 列与所有行；确认主表还有房地产、政府层级未接入。 |
| BEA “Underlying Estimates”、GDP by Industry → Underlying Detail | 官方入口迁移说明，解析该公开交互表的下载菜单；取得官方 `/UGdpxInd/ValueAdded.xlsx`，UVA205-A 末年 2024。公开返回保存在 `underlying-download-menu.json` 和 `underlying-value-added.json`。 |
| `site.bea.gov industry data 2025 2024 underlying detail value added 138 industries annual input output` | 找到官方行业账户 138 年度细分说明；读取并使用增加值表而非仅引用分类名称。 |
| `site.bea.gov "wholesale" "customs duties" "value added"` | 找到并读 FAQ 1476；厘清关税核算，避免把其混进普通批发经营类别。 |
| `site.bea.gov "construction" "underlying" "value added" "structures"` | 用真实 UVA205 8 行与官方 2017 NAICS 对照核对范围；未采用施工支出数据。 |
| `site.bea.gov "2024" "2025" "138" "value added"` | 仍以实际工作簿的末年判定，不将新闻发布中的“年度”或未来更新安排当作 2025 细表已出。 |
| 年度 IO、402 级 benchmark、414 级 Gross Output | [官方 IO 页](https://www.bea.gov/data/industries/input-output-accounts-data)区分年度与约每五年 benchmark；分类对照中的 402/414 名称不证明目标年有 VA。此次不引入非目标年的 benchmark 份额，也不把 gross output 当 VA。 |
| Census “value added by manufacture” 等旁系来源 | 检索发现其定义与 BEA GDP 行业 VA 不可仅凭同名视为一致；没有接入，也没有用出货、收入、就业份额回填 BEA 子行业。参考 [EIA 官方释义](https://www.eia.gov/tools/glossary/index.php?id=Value+added+by+manufacture)中的出货减材料口径。 |
| 第三方 UnderlyingGDPbyIndustry API 元数据镜像 | 仅辅助定位官方 API/表名，不作为任何金额、发布时间或分类事实来源；最终全部取官方工作簿。 |

2025 细表属于当前官方目标表未发布，不等于技术上无法估计；本项目约束是不将估计伪装官方值。未取得的更细行业数字不以零表示。

## 复核

在仓库根运行：

```sh
python3 research/annual-2024-2025/us/extract.py
python3 research/annual-2024-2025/us/verify.py
```

`validation.json` 保存 96 个重叠行业行＋GDP 的表间一致记录和 50 组实际数值完整的父子合计；缺值组没有被伪装为通过。`verify.py` 不导入提取实现，独立打开原件逐单元格复核，检查 SHA、年份、单位、国家、树无环、原有 88 个年度值未改变、建筑 8 类与批发 11 类的字面原表合计、关税及政府/私人医疗边界。结果见 `independent-verification.json`。

每条候选观测都有单位、年度、现价、覆盖、源表发布日期、修订状态、核查日、URL、行号、数值单元格、年份表头与来源摘录。数据细化完成不代表发布验收完成；页面适配、国家隔离、状态恢复与公开部署由父代理验证。
