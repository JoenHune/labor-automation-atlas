# 美国 CNC 上下料样板独立复核

复核日期：2026-09-09。对象：`research/samples/us-cnc-machine-tending.json`，任务 `US-MFG-MACHINING-TENDING-001`，研究版本 `sample-2026-09-09-v1`。受审文件 SHA-256：`14234626ff37dcbd8e078f6efc9fc69016f4cbd38a3f9d5a2145d284fd050ece`。

结论：**可作公开资料工作版；应完成以下三项修复后再将本样板标记为独立复核通过。不能据此冻结制造业全任务清单。** 11 条 claim 的事实、判断、假设分类与来源基本匹配；未发现虚构工时、虚构回收期、国家混用，或把订单取消写成机械失败。独立反例检索新发现同厂 2025 年 OSHA 记录，需要补入维护与培训证据。历史商业自报不等于 2026 年持续在运，现金回报仍为参数不足。

## 需修复

| 编号 | 位置 | 发现与处置 |
|---|---|---|
| R1 | `conclusion.text` | “可移交的编程技能、通用工装和真实需求，比仅比较机械臂单价更能决定适用性”带有未验证的比较因果强度。一个参与方自报案例没有建立因素权重或比较效果。改为“该案例提示，适用性还取决于真实订单、可再部署工装和企业掌握编程技能，不能仅凭机械臂单价判断”；继续标为研究判断。 |
| R2 | `barriers.US-B2.text` | “会新增硬件与残留人工”过于确定，且部分依据 US-C11 本身是待验证假设。改为“可能需要额外清屑、监测设备和异常处理人工；是否净增及其数量须按现有基准方案核实”。既有机台可能已有相关功能，不能把所有残留人工都算作新增。 |
| R3 | `counterEvidence`、来源、检索记录 | 补入下面新发现的 OSHA 官方 01002A 项，记录其加工中心清洁/设置培训范围、2025 年历史状态及整改信息。它是与任务相关的同厂采用/维护条件反证，不是 UR10e 机械失败或事故记录。不得只保留宣传材料后将失败检索判定为完成。其余 OSHA 项逐项按设备和任务边界排除或保留待查。 |

## 实际独立复核步骤

1. 阅读受审 JSON 全文及 `research/samples/search-log.json` 中美国查询记录；检查任务边界、12 个流程步骤、人工参数、备选方案、障碍、反证、经济公式与访谈缺口。
2. 重新打开全部 9 个原始来源页面/论文，而非依赖作者摘要或搜索结果；逐条比对 US-C1—US-C11 的引用小节与上下文，核对短摘录。
3. 重读 NIST 工作单元论文 PDF 第 3 页的 Section 2 / Figure 1 所在上下文；重读 NIST AMS 100-41 的 PDF 第 12、13、18 页，核查实验、专家指导与商业实证的边界。
4. 独立重复带失败/退出/最近年份的 WST 检索，并查询 OSHA；对新出现的第三方处罚线索追到 OSHA 官方检查及单项原文。没有把第三方摘要当事实终点。
5. 代数检查增量现金流、NPV 与等额年度劳动盈亏门槛的关系；未代入假设数字或运行示范回收期。

本复核未取得客户原始生产记录、完整报价、工资台账、订单合同或现场访谈；未观看 PCC 嵌入视频；未完成全部 OSHA 项的原文核查。以上不计作已完成验证。

## 逐条 claim 审计

“确认”表示来源确实如此记载，且受审表述保持该来源等级；不表示对厂商所述现场事实完成独立实测。

| Claim | 状态 | 原文定位与边界判断 |
|---|---|---|
| US-C1 | confirmed | [UR 案例](https://www.universal-robots.com/case-stories/wst-fab/) How they did it / Complete package，含 UR10e、末端、底座、进出料与 CNC 集成；Dan Carney 引述支持使用数月。厂商/集成商自报标签正确，没有客户日志支撑当前连续商业运行。 |
| US-C2 | confirmed | 同页 In short、The business transformation 和 Charlie Lenn 引述支持交付日订单取消、重编程、工装和打印夹指，以及该采购场景未选固定方案。正文已将需求风险与机械故障分开。$550,000 是客户比较说法，非同边界正式报价。 |
| US-C3 | confirmed | [O*NET 51-9161.00](https://www.onetonline.org/link/details/51-9161.00) Updated 2026、Tasks 中装夹、卸件、监测、量测、清洁及异常协同职责吻合。职业条目不能证明工时比例、单厂人员数量或工资可避免性；JSON 已保留这些限制。 |
| US-C4 | confirmed | [NIST 工作单元论文](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=936285) Section 2、PDF 第 3 页：输入、CNC 装卸、测量、输出及返工缓冲区吻合。是美国实验室模型，非 WST 流程观察；不能由建模说明推完整数字孪生已实现。 |
| US-C5 | confirmed | [NIST AMS 100-41](https://nvlpubs.nist.gov/nistpubs/ams/NIST.AMS.100-41.pdf) Sections 3.3/3.4、4.1/4.2、Appendix A D，印刷第 7、8、13 页（PDF 第 12、13、18 页）：人工参与、风险评估导致速度限制、工装与接口、支持维护和培训。专家指导来源等级正确。 |
| US-C6 | confirmed | [Haas 铣床安全手册](https://www.haascnc.com/service/online-operator-s-manuals/mill-operator-s-manual/mill---safety.html) 3.2、3.4、Robot Cells 支持流程条件。人工装卸与机器人接口须各按适用方式理解；JSON 已防止将手册写成 WST 所用设备证据。 |
| US-C7 | confirmed | [Haas What to Automate](https://www.haascnc.com/machines/automation-systems/what-to-automate.html) Bar Feeder / Pallet Pools、Automatic Parts Loader：提前人工夹紧托盘和 APL 零件装卸适配条件确有区别。只证明方案及厂商声明，未转为回报参数。 |
| US-C8 | confirmed | [Haas JET](https://www.haascnc.com/productivity/chip-and-coolant-management/jet.html) Overview 描述适用主轴的自动气吹及自动装卸场景。受审 scope 限定了适配机型，未声称 WST 已安装或所有碎屑均被消除。 |
| US-C9 | confirmed as judgment | US-E1 的需求变动及再部署故事、US-E4 的集成建议能支持这一研究方向；不是统计因果或投资收益实证。换型验收、订单和瓶颈仍需目标企业验证。 |
| US-C10 | confirmed as judgment | US-E6 支持预夹托盘替代路径，US-E4 支持比较整项流程。措辞“应比较”“可能”与未证最优限制相符。 |
| US-C11 | confirmed as hypothesis | 换型、补料、碎屑、报警、维修对收益的实际幅度没有 WST 分项记录。已明确为未验证假设且不量化；B2 不应再将它提升为必然净增成本。 |

## 短摘录、时间和来源身份

9 个来源的 10 个短摘录均在对应正文中找到。摘录只用作定位，不代替完整上下文。

| 来源 | 原文短摘录 | 定位核查 |
|---|---|---|
| US-E1-L1/L2 | “over the course of months”；“a large customer order unexpectedly fell through” | 分别位于集成商引述、案例开头；前者不能推当前仍在运，后者是订单失败。 |
| US-E2 | “Stop machines to remove finished workpieces” | Tasks；页面 Updated 2026 已确认，不能将所有子字段都推定为 2026 实测。 |
| US-E3 | “sent to the rework buffer” | Section 2，PDF 第 3 页；2023 会议论文时间与实验室边界相符。 |
| US-E4 | “Calculate the human involvement level” | Section 3.3，PDF 第 12 页；成本/速度/培训其余部分需一并阅读，JSON 已列多个页码。 |
| US-E5 | “your machining process may not be safe to operate unmonitored” | 3.4 Unattended Operation；附带条件没有被删掉。 |
| US-E6 | “Manually clamp parts ahead of time” | Pallet Pools，后接自动交换语境。 |
| US-E7 | “keeps your workpiece and/or workholding clear of chips” | Overview；机型、主轴范围在来源与样板限制中明确。 |
| US-E8 | “06/24/2022” | [PCC 文章](https://afs.gogcg.com/blog/2022/06/24/rolling-with-the-punches-at-wst-fab) 作者 Dan Carney 日期栏。是集成商参与的旧材料，不是独立第三方运行审计，也不替代无日期 UR 页的发布日期。 |
| US-E9 | “Manitowoc, WI 54220, USA” | [WST 能力页](https://wstfab.com/cnc-machining) 联系方式；仅支持工厂位置与机加工业务背景。 |

来源组合具备职责、流程、方案和采用条件四类路径；UR 和 PCC 不能算两份独立运行实证。Haas 手册和 NIST 实验没有被拼接成 WST 实际 SOP。12 步流程均标现场分工待核实，可以用于访谈和研究组织，不能标为同厂逐步观察结果。

## 反例与退出检索复核

独立查询包括 `"WST Fab" robot failed removed cancelled 2026`、`"WST Fab" robot "2025" "2026"`、`site.osha.gov "CNC" "robot" "loading" accident`、`site.osha.gov "WST FAB" 2025`、`"WST FAB LLC" OSHA "2025"`。未找到可验证的 WST UR10e 永久退出或机械故障记录；这只代表本次查询未获证据，不证明不存在。无关企业 CNC 事故、焊接机器人事故和论坛传闻没有套到本任务。

新发现的 [OSHA 检查 1818506.015](https://www.osha.gov/ords/imis/establishment.inspection_detail?id=1818506.015) 于 2025-04-17 开始，同一 WST 地址；单项发出日期为 2025-09-12。检查汇总显示 OPEN，个别项显示整改完成，二者不能混为整案已关闭。它提供了比营销材料更新的同厂条件信息，但不证明 2026 UR10e 在运。

| 官方项 | 本次已读原文与使用方式 |
|---|---|
| [01002A](https://www.osha.gov/ords/imis/establishment.violation_detail?citation_id=01002A&id=1818506.015) | Text for Citation 包含 “cleaning and setting up horizontal and vertical machining centers”。OSHA 监管检查引用记录称，相关操作人员在危险能源识别、隔离与控制授权培训方面不足。发出日期 2025-09-12；该项页面 Initial Penalty 为 $11,585，Current Penalty 为 $5,792；事件表显示 2025-11-13 的 `I: Informal Settlement`，Contest Date 栏为空，Final Order 栏显示 11/13/2025。页面标记 Abatement Completed，整改日期 2025-12-15。以上是网页字段转录，不推定未公开的争议/司法状态，不称整案终局裁决。应作为加工中心清洁/设置的同厂培训与维护条件证据补入；没有点名 UR10e，不能写成这套上下料单元故障、伤亡或永久停用。 |
| [01003A](https://www.osha.gov/ords/imis/establishment.violation_detail?citation_id=01003A&id=1818506.015) | 原文具体设备为折弯机、激光切割机和 Yaskawa 焊接机器人，涉及能源控制程序。可供制造业清单后续任务使用；不得与 UR10e CNC 上下料单元混同。 |
| [01002D](https://www.osha.gov/ords/imis/establishment.violation_detail?citation_id=01002D&id=1818506.015) | 涉及进入激光切割机内部清洁的受限空间评估。该项设备/动作不是样板 CNC 装卸，不用于证明本任务机械失败。 |
| [01005](https://www.osha.gov/ords/imis/establishment.violation_detail?citation_id=01005&id=1818506.015) | 汇总有机器防护标准条目，但本次正文访问返回 403，搜索未恢复完整内容；保留待查，不据标准号推测设备或事故。其余未逐项阅读的条目亦不宣称已排除。 |

对固定传统自动化的“未采用”证据仍仅为客户经厂商转述的采购判断，没有正式投标方案或同边界工程评估。成功后重部署的自报可以与原订单取消并列；取消是原需求假设失败，并非机器人技术失败。

## 现金流与证据缺口

现有公式包含完整部署投入、常规残留人工、异常与返工人工、净增维护、非重复停机、税、后续投资及营运资金；增产受需求与瓶颈约束。没有使用 $550,000 或“三分之一”反推实际采购额，没有用 O*NET 职责或职业工资生成节省人数。全部实际参数为空，`paybackYears` 和 `npv` 为 null，处置正确。

`NPV = -I0 + Σ CF_t/(1+r)^t + SV_N/(1+r)^N` 正确。在年度净项目恒定、给定税费等输入、`w>0`、`N>0` 条件下，令 NPV 为零并乘资本回收系数，受审 `Hsave_required` 式符号正确；`r=0` 时 `CRF=1/N` 正确。若税等随工时变化，样板要求求解完整 NPV，边界明确。

投入实际计算器前应补清三项参数定义，当前不构成已计算金额错误：

- `dNWC_t` 应明确为本期新增占用/释放的现金流变化，不是每期反复扣除同一资金余额；期末回收不能与末期负 `dNWC` 重复。
- `(H0-Hr-He)*w` 隐含共同小时现金成本率；不同技能、班次、加班和外包的现金成本应分别核算。新方案工资全数保留时须按实际可避免支出判断，而非按“释放小时”自动产生现金节省。
- `Squality` 的返工现金节省须排除已经计入人工项的同一返工劳动；`new_sellable_capacity` 明确写作新增有效可销售产能，避免被误填为总产能。

仍缺客户连续运行/异常日志、全班次工时、完整部署与运维发票、工件与夹具适配边界、订单与瓶颈、工资现金可避免性、同边界替代报价。访谈清单应追加“OSHA 所涉加工中心是否包含本单元关联机台、整改后的培训及能源隔离程序如何进入换型/维护流程”，不能由研究方自行补答案。

## 交付判定

- 工作版：可用，需保留旧案例年份、来源等级、现场待核实和无回收期标签。
- 本样板独立复核通过：待 R1—R3 修复后由主研究者更新 `research.independentReview`；本报告未改源 JSON。
- 全行业冻结：未通过，也未在此次小复核范围内评估。制造业所有子行业、场景和全部任务仍需清单及逐任务研究。

## 当日修订复核补记

主研究者收到初步发现后已修改源文件。本代理重新读取版本 SHA-256 `6227833b2e1d092674fffd4b79293fe64a0d824b3209d3f82b6dce164351aa9a`，确认 **R1、R2 已修复**：结论明确现有证据不能量化相对设备单价的重要性，B2 改为依具体配置判断的可能新增。R3 待补官方检查引用与状态记录。

01002A 已通过网页工具读取完整正文；随后标准公开 HTTP 直连复取返回 403。因此不声称两种路径均获取成功，也不将访问失败理解为记录不存在。审校依据是本次成功读取的 OSHA 原页面正文、日期和事件表；应在正式纳入时保留原文抓取及访问日期。
