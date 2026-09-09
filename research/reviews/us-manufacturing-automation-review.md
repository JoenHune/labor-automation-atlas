# 美国制造业自动化独立复核

复核日：2026-09-09。输入 SHA-256：1dc867c0cdf58b5afc59431705a56c2af4af390363c6ef6e75f9a59616bb7fe3。作者文件保持未改。

结论：本次独立复核已完成，存在需要修复的定位、任务范围与证据分类；不能冻结。260 项均有逐项裁决，131 个来源核读相关段落，520 条正反查询结构逐项校验。确认的是限定事实或明确缺口，不是全部任务已有商业成功。

本次 95 项需要表述、定位或分类修订，165 项有限证据表述可保留；全部仍缺完整现场验证。33 项建议把超出职业动作的部分降为拟议；20 项正向证据状态需从统一“已证机理”改为流程/相邻背景/研发目标或待验证候选。

逐项裁决、输入哈希、来源定位与拆分判定见 [机器可读审查](us-manufacturing-automation-decisions.json)。本报告不修改原研究结论，也不把评论或研究判断写成事实。

## 必须修复的定位

不能仅证明短引词在网页中出现。FDA 的包装抽样、局部抗菌剂偏差审查、微生物超标批次和自动校准分别落在具体问题的答案中；原稿部分落到目录或其他问答。两页官方原文已重新核读。可按 [FDA生产与过程控制问答](https://www.fda.gov/drugs/guidances-drugs/questions-and-answers-current-good-manufacturing-practice-regulations-production-and-process) 与 [FDA设备问答](https://www.fda.gov/drugs/guidances-drugs/questions-and-answers-current-good-manufacturing-practice-requirements-equipment) 的问题号稳定定位。

|来源|原定位问题与修订范围|
|---|---|
|MP-WARE|现行只覆盖安全堆放，设备检查另在63/71。 [{"id": "vehicle", "old": 91, "new": [63, 71, 91]}]|
|MF-HACCP|原表声明可获全文支持，但目前短词定位落在监控段。 [{"id": "correct", "old": 460, "new": 468}, {"id": "verify", "old": 462, "new": 471}] 1997-08-14在原文标为Adopted；建议单列adoptedAt，publishedAt不应无说明当作已核发布日，网页2022-02-25更新另列。|
|MC-PCA|jam为假设开篇，maintenance为技术人员所见；PAPER007/008反向分类需区分。 []|
|MC-MANUAL|引文内容正确但章节名错误。 [{"id": "safe", "line": 253, "section": "安全规则（3.0 Technical Data之前；不是8.0 Maintenance）"}]|
|MR-METER|24支持设备组合、30说明常见设计允许周期校验；原文不是统一强制周期规范。“现场周期验证不可省略”应改成该配置支持周期校验或另附适用规范。 [{"id": "meter", "old": 24, "new": [24, 30]}]|
|ME-FAST|应同时定位手持、固定和机器人三个目录标题；供钉细节仍只是产品类别，不能当已验证工位。 [{"id": "screw", "old": 18, "new": [14, 22]}]|
|MA-NWI|160只支持人工定位自动铆接，NC钻孔紧固在146，美国Nashville运营范围在123。 [{"id": "rivet", "old": 160, "new": [123, 146, 160]}]|
|MD-OTEC|603仅讲换容器，清洁/粗磨/细磨/抛光四项在629。 [{"id": "finish", "old": 603, "new": [603, 629, 632]}]|
|M-CEMENT|210是低质燃料经济描述附近；窑灰回用、弃置/浸出及碱含量限制在263—269。 [{"id": "recycle", "old": 210, "new": [263, 269], "section": "11.6.2 p.11.6-7"}]|
|MG-CULLET|791只列计量系统，检测机及外来碎玻璃输入在769，输送/破碎设施在779—788。 [{"id": "return", "old": 791, "new": [769, 797]}]|
|M-CERAMIC|175始为厚膜糊料成型，干压/挤出在165—173，需扩大范围才覆盖全部三条路径。 [{"id": "form", "old": 175, "new": [163, 191]}]|
|M-PHARMA|sample指目录；control与reject误落其他问答。FDA网页独立重读确认Q2、Q12、Q19各有支持，应按问题号定位。 [{"id": "sample", "old": 255, "new": 306, "section": "Q2答案"}, {"id": "control", "old": 330, "new": [393, 407], "section": "Q12，主要支持400—407"}, {"id": "reject", "old": 327, "new": [485, 487], "section": "Q19答案"}]|
|MPR-EQUIP|自动校准loc指目录问题，不是答案。 [{"id": "cal", "old": 255, "new": 306, "section": "Q1答案；2004-08-04"}]|
|MPR-CLEAN|原缓存整页为转义字符串（cacheLine 1），操作员装卸和非关键应用限制均在这些网页行。来源section已含网页行，可保留并规范化缓存。 [{"id": "clean", "webLines": [238, 239, 262]}]|
|MPR-EBR|288为数字化记录产品入口，异常及投料追踪的实际句子在268和272。 [{"id": "record", "old": 288, "new": [268, 272]}]|
|MAU-WORKSHOP|原缓存把整页存为转义字符串（cacheLine 3），需给网页行号与日期/Speakers章节，避免只打开巨大字符串首部。会议日期和GM报告人可核。 [{"id": "date", "webLines": [131, 136, 161]}]|
|MWELD-MAINT|原缓存正文同时显示Published April 26, 2019与Last Updated August 25, 2026。保留首发2019，但须补更新日；无法由更新日判断每条维护建议何时改动。 [{"field": "revisedAt", "new": "2026-08-25", "cacheLines": [859, 860, 862, 863]}]|

上述缓存行均指对应原文件的物理行；MPR-CLEAN、MAU-WORKSHOP另外给网页行号，因为原缓存保存成单条转义字符串。缓存仅内部，不公开整篇原文。

## 动作、证据层级和国家

2003 年禽肉试验、2005 年经纱传感研究、1996 年木尘控制、2009 年以前工艺资料与近年产品说明均保留各自时期。WST 为历史厂商/集成商案例，不能证明 2026 持续运行；ARM 航空检验仍为项目目标。波音 2019 年改变的是前后机身装配技术路线，同页仍保留其他机器人应用，不能概括为全面放弃。

PCA 的卡箱开篇为假设排查示例，PAPER-007/008 应改为假设故障条件；其维护问题是服务技术人员转述客户情形，不是目标工厂独立故障统计。传感器限制、规范条件、保留人工与商业退出须保持不同分类。

典型范围修订包括：记录材料数量不直接证明清点完工品，调整生产参数不直接证明获准返工，检验/通知不直接证明隔离，包装不直接证明质量放行。全球产品可保留为机制参考，未核国家的案例不能升级为美国部署；Clean Harbors 的服务执行与炼厂自营人工须分开。

## 187 项拆分建议

原稿给出了候选标题，但没有逐候选独立输出、验收和核算字段，故本次批准新增原子任务为 0。此处是定义缺口，不是断言不能拆；不得据此给任务数翻倍或重复分摊设备投入。

|判定|数量|
|---|---:|
|plausible-different-actions-pending-independent-outputs|133|
|overlap-must-be-removed-before-split|3|
|retain-combined-unless-independent-boundary-demonstrated|15|
|product-or-failure-branch-not-unconditional-serial-tasks|20|
|scope-expanded-by-split-needs-separate-evidence|16|

例如，启停泵阀是输送的手段、装紧固件可能就是连接结构件的实现、标记与日志一致性是一次关系核查，不能机械拆开。刀具属于接触表面，夹具可能属于工作区，范围须排除重叠。压制/注浆、灌模/扫描等按产品路径处理；“已合格”不能自动产生本执行者的质量审批任务。其余 133 项有继续区分动作的理由，但要先给每个输出的验收者、记录和工作量分母。

## 计算和机会

260 项人工投入与回报结果均为空；统一框架包括完整初始部署、残留人工、能源水、维护、异常/返工/停机、税费、更新投入和期末处置。初始营运资金只扣一次，年度计变化，期末回收实际余额；毛额劳动撤销和新流程残留分开，损失与增产不能重复。建议明确定义有效增量产能同时受下游能力限制。

六项机会均可作为条件化访谈与实验清单，不能当回报排名：机床装卸、水泥取样与分析接口、轮胎混炼秤重、连接器移动视觉、焊接夹具与外表检查、非关键部件离位柜洗。必须先修复相关源定位，再取得同一现场的记录与完整现金参数。

## 逐任务结果

“可保留”只指当前有限证据陈述和缺口分隔合理；所有条目均未证明完整商业成功、未冻结。原子性列保留逐项判定；详见 JSON 的源/动作/经济字段。

|任务|审查结果|主要修订或边界|拆分判定|
|---|---|---|
|US-MFG-POULTRY-001 检查待分割胴体的批次与缺陷|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-POULTRY-002 分发适用刀具与切割用具|needs-repair|磨刀是分发的相邻工序；闭合容器配送仅候选，不宜把候选整体置为已记录机理。|retain-current-candidate-boundary-unfrozen|
|US-MFG-POULTRY-003 切分胴体为指定部位|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-POULTRY-004 剔除部位肉的骨与皮|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-POULTRY-005 修除可修整肉品的缺陷与多余脂肪|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-POULTRY-006 将肉与副产品分流至指定容器|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-POULTRY-007 复检去骨肉的残骨与外观|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-POULTRY-008 隔离无法判定或受污染肉品|needs-repair|目标剔除是2007—2009研发目标而非实证机构；已说明阶段，正向机制状态仍应改为研发计划/待验证候选。；当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。|retain-current-candidate-boundary-unfrozen|
|US-MFG-POULTRY-009 按允许范围重修不合格肉块|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-POULTRY-010 称量肉品并标注包装内容|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-POULTRY-011 封合内袋及外箱|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-POULTRY-012 将封装箱码托并交厂内冷库|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-POULTRY-013 清洁切割器具与接触表面|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|overlap-must-be-removed-before-split|
|US-MFG-FOODBATCH-001 核对原料及过敏原身份|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-combined-unless-independent-boundary-demonstrated|
|US-MFG-FOODBATCH-002 称量配方原料|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-FOODBATCH-003 投放原料进入混合容器|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-FOODBATCH-004 调节混合设备完成规定混合|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-FOODBATCH-005 监控批次热处理过程|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|retain-current-candidate-boundary-unfrozen|
|US-MFG-FOODBATCH-006 抽取批次样品并记录性质|needs-repair|任务含抽取样品，但所引职业第14/15项只说明观察、检验既有样品；抽样动作的直接支持不足，宜部分拟议。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-FOODBATCH-007 将中间产品移交下一加工点|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-FOODBATCH-008 隔离偏离工艺条件的批次|needs-repair|MF-HACCP/correct当前缓存460在监控段，可作背景，但直接支持需468纠正措施三项。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|retain-current-candidate-boundary-unfrozen|
|US-MFG-FOODBATCH-009 按批准处置再处理可返工食品|needs-repair|职业第13项是过程中依取样调整烹调成型，并非重新处理不合格批；法规允许条件不证明本任务已存在。source-backed宜改部分拟议。|retain-current-candidate-boundary-unfrozen|
|US-MFG-FOODBATCH-010 清洗并检查混合槽的残留|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-FOODBATCH-011 灌装食品进入指定容器|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-FOODBATCH-012 交接批记录与放行包装品|needs-repair|职业记录与包装不直接支撑质量授权放行或移交包装品，宜部分拟议。；MF-HACCP/verify当前缓存462在监控段，应改471复核监控及纠正记录段。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-SEW-001 按色批与图案配齐裁片|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-SEW-002 安装针线与导向附件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-SEW-003 对齐裁片并定位夹具|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-combined-unless-independent-boundary-demonstrated|
|US-MFG-SEW-004 引导裁片完成规定线迹|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-SEW-005 安装拉链或纽扣附件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-SEW-006 测量缝制品尺寸并检查线迹|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-SEW-007 停机识别断线及断针异常|needs-repair|职业第1项含断线及机台故障，不明确断针定位/找回；断针分支应部分拟议，绣花机误报不能升级为所有缝机证据。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-SEW-008 补缝缺失线迹或更换缺陷部件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-SEW-009 更换针具并清洁润滑缝纫机|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-SEW-010 修剪余线并移交后整工序|needs-repair|职业第5/8项证明卸件及修线，不直接证明移交后整，交接分支应拟议。|plausible-different-actions-pending-independent-outputs|
|US-MFG-SEW-011 清点完成品与生产记录|needs-repair|职业第12项记录处理材料数量不等于清点完成品，清点分支应拟议或改标题为记录处理数量。|plausible-different-actions-pending-independent-outputs|
|US-MFG-WEAVE-001 按花型单设定织机组件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-WEAVE-002 穿引纱线通过导向机构|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-WEAVE-003 运行织机并调整织造参数|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-combined-unless-independent-boundary-demonstrated|
|US-MFG-WEAVE-004 抽查布面织疵|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。|retain-current-candidate-boundary-unfrozen|
|US-MFG-WEAVE-005 识别停台的断纱或机械原因|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-WEAVE-006 移除可修织疵并恢复织造|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-WEAVE-007 交接布匹与机台设定记录|needs-repair|职业第10/15项沟通订单和记工况，不直接证明实物布卷移交，实物分支应拟议。|plausible-different-actions-pending-independent-outputs|
|US-MFG-WEAVE-008 清洁润滑织机并更换磨损组件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-WEAVE-009 完成布匹批次计量与登记|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-WOOD-001 按纹理和缺陷选配木料|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-WOOD-002 在木料标注切割尺寸|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-WOOD-003 锯切木料形成规定毛坯|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-WOOD-004 加工木件榫槽和孔位|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-WOOD-005 试配木件并量测尺寸|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-WOOD-006 涂胶夹紧或紧固木件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-WOOD-007 安装铰链把手及滑轨|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-WOOD-008 隔离开裂或配合不良木件|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。|retain-current-candidate-boundary-unfrozen|
|US-MFG-WOOD-009 修整可返修接缝或更换木件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-WOOD-010 清理设备积尘并维护刀具|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-WOOD-011 打磨表面并交涂饰工序|needs-repair|职业第3/13项支撑砂磨和准备涂饰，未直接规定交涂饰的实物交接；该分支部分拟议。|plausible-different-actions-pending-independent-outputs|
|US-MFG-WOOD-012 核对完工家具与订单|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-PAPER-001 安装切割折叠及涂胶附件|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PAPER-002 吊装纸卷并穿纸|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PAPER-003 补充胶料并调节供胶|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PAPER-004 切割压线折叠纸板|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PAPER-005 粘合箱坯形成纸箱|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|retain-current-candidate-boundary-unfrozen|
|US-MFG-PAPER-006 抽查成箱尺寸与胶合|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PAPER-007 处置输送与落箱卡阻|needs-repair|MC-PCA/jam开篇为Imagine假设卡箱；应分类为假设故障排查条件，不能用operator-described故障类。；职业第8项监看落箱防堵，不直接说明清除既有堵塞；应部分拟议，维护手册仅规定隔离条件。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-PAPER-008 调整机台并重做不合格箱|needs-repair|MC-PCA/jam为假设示例，不是实际故障记录。；职业第1/9项调整设备不直接证明原不合格箱返工/重制。该路径应部分拟议。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PAPER-009 清理供胶和切割机构|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PAPER-010 堆叠成箱并移交下游|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PAPER-011 标注批次并完成完工登记|needs-repair|职业第12项印日期等标识，不证明完工登记，后半部分拟议。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PRINT-001 核对纸张油墨与印刷工单|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-combined-unless-independent-boundary-demonstrated|
|US-MFG-PRINT-002 安装印版并调校套准|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PRINT-003 配墨并补充墨槽|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PRINT-004 上纸穿纸并调节张力|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PRINT-005 抽印样张检查色密度与套准|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PRINT-006 运行印机并监控印刷质量|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-combined-unless-independent-boundary-demonstrated|
|US-MFG-PRINT-007 记录印机报警并处置停机|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PRINT-008 修正设定并重印不合格批|needs-repair|机台调整与归档以便复制不直接证明不合格批授权重印；返工定义仍应部分拟议。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PRINT-009 清洗墨槽印版与滚筒|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PRINT-010 交接印张进入裁切折页|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-PRINT-011 核对整饰成品与印刷记录|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-REFINE-001 核对物料路线与罐容|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-combined-unless-independent-boundary-demonstrated|
|US-MFG-REFINE-002 按调度启停泵阀转移原油|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-combined-unless-independent-boundary-demonstrated|
|US-MFG-REFINE-003 调节分馏或处理单元参数|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-REFINE-004 巡检泵阀管线与储罐|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-REFINE-005 采集油品样品送检|needs-repair|职业取样不直接规定送检移交，采样有支持、送样边界拟议。|plausible-different-actions-pending-independent-outputs|
|US-MFG-REFINE-006 交接班次参数和化验结果|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-combined-unless-independent-boundary-demonstrated|
|US-MFG-REFINE-007 报告泄漏或失控参数并执行授权处置|needs-repair|职业第3项检出/报告不直接支持执行处置；该分支需其他动作支持或拟议。|plausible-different-actions-pending-independent-outputs|
|US-MFG-REFINE-008 按化验建议调整可处理油品路线|needs-repair|职业第17项为生产参数设定，并非不合格再处理许可；宜将返工分支拟议。|retain-current-candidate-boundary-unfrozen|
|US-MFG-REFINE-009 清洗隔离后的工艺单元|needs-repair|MR-CLEAN为Clean Harbors服务商方案；仅作外包技术参考，不得把其现场服务工时计作炼厂自营。总纲已划界，任务位置仍需显式执行者标签。|retain-current-candidate-boundary-unfrozen|
|US-MFG-REFINE-010 润滑阀门并修复已授权小缺陷|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-REFINE-011 核对出厂油品计量与质量状态|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CHEM-001 核对反应配方与原料身份|needs-repair|职业第15项读工艺规格，不直接核实原料实物身份；该分支应部分拟议。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CHEM-002 计量反应原料|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-CHEM-003 加料并开启混合反应设备|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CHEM-004 调节温压流量与反应时长|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-CHEM-005 采集样品检验浓度或黏度|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CHEM-006 转移产品至指定储罐|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-CHEM-007 发现泄漏或溢流后通知授权响应|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-combined-unless-independent-boundary-demonstrated|
|US-MFG-CHEM-008 按授权配方修正可返工批次|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-CHEM-009 冲洗排空后的设备|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-CHEM-010 核对装运容器与批次资料|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PLASTIC-001 核对树脂配料与模具|needs-repair|读工单和混称材料不直接证明树脂实物身份、配料与模具相互核对；核实分支宜部分拟议。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PLASTIC-002 安装模具及冷却连接|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PLASTIC-003 补给塑料颗粒进入料斗|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-PLASTIC-004 设置并监控注塑循环|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PLASTIC-005 取出并转运冷却成型件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PLASTIC-006 量测制件尺寸及表面缺陷|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PLASTIC-007 隔离卡模或联锁异常设备|needs-repair|职业连续观察/故障调整及机门联锁规范不等于实际隔离卡模或失效联锁任务，宜部分拟议。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-PLASTIC-008 修整允许修除的飞边|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-PLASTIC-009 拆模后清洁维护模腔|needs-repair|原职业兼金属铸造；清理模内表面有支持，拆模与热塑模具维护应标专场景待核，不能直接迁入耐火填补动作。|overlap-must-be-removed-before-split|
|US-MFG-PLASTIC-010 清点包装合格制件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-METAL-001 称量待入炉金属料|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-METAL-002 操作加料设备装入炉料|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-METAL-003 调节炉温与供能|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-METAL-004 采集熔融金属样品分析|needs-repair|职业条目明确取样供分析和计算加料，但不明确本执行者亲自分析；成分检验归属需核查，任务宜部分拟议。|plausible-different-actions-pending-independent-outputs|
|US-MFG-METAL-005 扒除熔体表面杂质|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-METAL-006 转运熔融金属至浇注容器|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-METAL-014 清理停用熔炼设备的残留物|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-CNC-001 核对图纸程序与毛坯批次|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CNC-002 安装并校正刀具夹具|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CNC-003 装夹待加工毛坯|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-CNC-004 监控切削循环及刀具状态|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-combined-unless-independent-boundary-demonstrated|
|US-MFG-CNC-005 卸下完成工件并分流|needs-repair|职业卸件与堆放不直接证明按质量状态分流；WST也没有质量判定分流。分流分支应拟议。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CNC-006 量测首件及抽样件尺寸|needs-repair|成品尺寸测量有据，但首件/批内抽样制度没有直接职业定位；这是测量任务的采样策略分支，不应直接生成两个已证实原子任务。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-CNC-007 报告加工报警并隔离疑似件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CNC-008 按授权补加工可返修件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-CNC-009 清洁夹具与工作区切屑|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|overlap-must-be-removed-before-split|
|US-MFG-CNC-010 更换磨损刀具并复核偏置|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CNC-011 标识包装合格机加工件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-ELECTRIC-001 按电路图配齐组件与线束|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-ELECTRIC-002 标识并分发组件到工位|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-ELECTRIC-003 定位固定电气组件|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|retain-current-candidate-boundary-unfrozen|
|US-MFG-ELECTRIC-004 连接线束或焊接规定接点|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-ELECTRIC-005 测量线路电阻或功能|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-ELECTRIC-006 移交装配与测试状态|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-ELECTRIC-007 隔离不合格电气组件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-ELECTRIC-008 更换或调整授权缺陷组件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-ELECTRIC-009 清洁零件和维护装配设备|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-ELECTRIC-010 包装已检验总成|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-SEMI-001 核对晶圆批次与工艺路线|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-SEMI-002 装载晶圆进入工艺载具|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-SEMI-003 清洗晶圆表面|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-SEMI-004 对准光罩并执行授权曝光工序|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-SEMI-005 启动并监控刻蚀或沉积工序|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-SEMI-006 检测晶圆缺陷或电路性质|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-SEMI-007 隔离设备泄漏或异常批次|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-SEMI-008 对允许返工批执行批准重处理|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-SEMI-009 卸载晶圆并送下道工序|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-SEMI-010 更换耗液并清洁工艺腔体|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-SEMI-011 登记检测状态并交付合格批|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-AIRCRAFT-001 核对批准图纸与供应件状态|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。|plausible-different-actions-pending-independent-outputs|
|US-MFG-AIRCRAFT-002 定位大型分组件到装配夹具|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-AIRCRAFT-003 修整孔位或边缘以满足装配|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-AIRCRAFT-004 连接结构件并安装紧固件|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|retain-combined-unless-independent-boundary-demonstrated|
|US-MFG-AIRCRAFT-005 安装系统管路或控制线缆|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-AIRCRAFT-006 检验装配间隙与系统功能|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-AIRCRAFT-007 标识总成并交接检验状态|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-AIRCRAFT-008 隔离设计不符或漏检部件|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。|retain-current-candidate-boundary-unfrozen|
|US-MFG-AIRCRAFT-009 按批准方案修复装配缺陷|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-AIRCRAFT-010 清洁结构件并移除加工废料|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-AIRCRAFT-011 提交可放行总成与质量记录|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。|plausible-different-actions-pending-independent-outputs|
|US-MFG-DENTALPRODUCT-001 核对处方与牙模或扫描件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-DENTALPRODUCT-002 制作或扫描牙列模型|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-DENTALPRODUCT-003 制作蜡型或修复体框架|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-DENTALPRODUCT-004 敷加瓷或树脂并完成成型|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-DENTALPRODUCT-005 使用咬合架检查修复体配合|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-DENTALPRODUCT-006 反馈处方或模型不清问题|needs-repair|讨论器械的职业项不直接证明处方或模型不清时的反馈责任；可保留为沟通动作下的拟议异常场景。|retain-current-candidate-boundary-unfrozen|
|US-MFG-DENTALPRODUCT-007 补修缺损或调整修复体|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-DENTALPRODUCT-008 打磨抛光后清理修复体与工具|needs-repair|职业第5项仅磨抛修复体/框架；工具清理维护不在定位，须降级为部分拟议。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-DENTALPRODUCT-009 交接修复体设计与返修信息|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-DENTALPRODUCT-010 封装修复体并交诊疗机构|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CEMENT-001 核对到厂矿物原料与储位|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CEMENT-002 向配料系统输送原料|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|retain-current-candidate-boundary-unfrozen|
|US-MFG-CEMENT-003 称配并混合生料组分|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CEMENT-004 操控生料粉磨及干燥设备|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CEMENT-005 采集生料样本送检|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CEMENT-006 将合格生料输送至窑系统|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|scope-expanded-by-split-needs-separate-evidence|
|US-MFG-CEMENT-007 监控并调节窑烧过程|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CEMENT-008 监控熟料冷却与转运|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CEMENT-009 将熟料与规定组分进行终粉磨|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|retain-current-candidate-boundary-unfrozen|
|US-MFG-CEMENT-010 核查成品取样与质量状态|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|scope-expanded-by-split-needs-separate-evidence|
|US-MFG-CEMENT-011 停止并隔离异常输送或窑辅机|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CEMENT-012 按批准流程重处理不合格物料|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|scope-expanded-by-split-needs-separate-evidence|
|US-MFG-CEMENT-013 清理停用粉料设备并检查磨损|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CEMENT-014 将放行水泥装载并交付批次资料|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-GLASS-001 核对玻璃原料与回用碎玻璃|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-GLASS-002 称量并混合玻璃配合料|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-GLASS-003 向熔窑投送配合料|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-GLASS-004 监控并调整玻璃熔化状态|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-GLASS-005 将熔融玻璃供至成形环节|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|scope-expanded-by-split-needs-separate-evidence|
|US-MFG-GLASS-006 按产品分支操控玻璃成形设备|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-GLASS-007 实施规定退火后处理|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-GLASS-008 检查玻璃外形与可见缺陷|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。|plausible-different-actions-pending-independent-outputs|
|US-MFG-GLASS-009 隔离破损或异常玻璃|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|scope-expanded-by-split-needs-separate-evidence|
|US-MFG-GLASS-010 将获准回用碎玻璃转入配料回收|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|retain-current-candidate-boundary-unfrozen|
|US-MFG-GLASS-011 清理停用模具和成形设备|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-GLASS-012 保护包装并交付放行玻璃|needs-repair|职业保护包装与固定包件不支持批准放行/交付记录；后半部分应拟议。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CERAMIC-001 核对陶瓷粉料与目标配方|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CERAMIC-002 对原料进行规定粉碎分级|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CERAMIC-003 混合粉料或制备成形浆料|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-CERAMIC-004 装配并检查产品模具|needs-repair|模具选型、装组件及定位有据，检查模具状态/机器人准备未获得具体源定位，检查分支应拟议。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CERAMIC-005 将成形料压制或浇注成规定坯体|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-CERAMIC-006 修整生坯粗边与规定开孔|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CERAMIC-007 将生坯装入干燥设备|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|retain-current-candidate-boundary-unfrozen|
|US-MFG-CERAMIC-008 监控坯体干燥状态|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|retain-current-candidate-boundary-unfrozen|
|US-MFG-CERAMIC-009 对适用产品施加釉层|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|retain-current-candidate-boundary-unfrozen|
|US-MFG-CERAMIC-010 装窑并运行产品烧成周期|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CERAMIC-011 检查烧成品尺寸与表面缺陷|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CERAMIC-012 按批准工艺精整可返修制品|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|scope-expanded-by-split-needs-separate-evidence|
|US-MFG-CERAMIC-013 隔离窑炉异常或不合格批次|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CERAMIC-014 清理停用模具窑具和输送设施|needs-repair|职业定位只支持模具与模具部件清洁，不支持窑具和输送设施清理；整体source-backed宜改部分拟议。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-CERAMIC-015 包装并移交放行陶瓷|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-TIRE-001 核对胶料帘布与胎圈组件|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。|plausible-different-actions-pending-independent-outputs|
|US-MFG-TIRE-002 按配方混合胶料|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-TIRE-003 按规格设定成形鼓与压辊|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-combined-unless-independent-boundary-demonstrated|
|US-MFG-TIRE-004 将内衬及帘布层定位至成形鼓|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-TIRE-005 装入胎圈并完成胎体层组合|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-TIRE-006 将带束与胎面组合至胎体|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-TIRE-007 将生胎转入适配硫化模具|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。|scope-expanded-by-split-needs-separate-evidence|
|US-MFG-TIRE-008 运行所选硫化工艺|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-TIRE-009 取出硫化轮胎并送至冷却|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。|plausible-different-actions-pending-independent-outputs|
|US-MFG-TIRE-010 检查轮胎外观与规定测试结果|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-TIRE-011 隔离胎体缺陷或硫化异常产品|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|scope-expanded-by-split-needs-separate-evidence|
|US-MFG-TIRE-012 执行获准的外观修整|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-TIRE-013 清理停用成形与硫化工具|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-TIRE-014 交付放行轮胎与标识资料|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PHARMA-001 核对设备清洁标记与使用日志|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|retain-combined-unless-independent-boundary-demonstrated|
|US-MFG-PHARMA-002 核对待用组分与批准批记录|needs-repair|读配方与库存记录不直接证明批准批记录对原料实物身份的校核；该分支拟议。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PHARMA-003 按适用条件采集包装容器样本|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|scope-expanded-by-split-needs-separate-evidence|
|US-MFG-PHARMA-004 称取本批药品生产物料|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|retain-current-candidate-boundary-unfrozen|
|US-MFG-PHARMA-005 按批准批指令装料并运行混合|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PHARMA-006 采集在制品样本检查混合与质量|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PHARMA-007 将合格在制品移交指定下工序|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|scope-expanded-by-split-needs-separate-evidence|
|US-MFG-PHARMA-008 核对并上载本批灌装包装材料|needs-repair|所引职业仅上料补料，不直接核对包装材料批次；核对分支应拟议。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PHARMA-009 操作适用剂型灌装包装设备|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|retain-combined-unless-independent-boundary-demonstrated|
|US-MFG-PHARMA-010 检查包装重量密封及标签|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PHARMA-011 隔离偏差批次并提交调查|needs-repair|FDA要求偏差评估/纠正，但所引职业巡检停机和通知维修不证明批次实物隔离与提交质量调查的完整任务；应部分拟议。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-PHARMA-012 仅执行已批准并验证的重处理|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|scope-expanded-by-split-needs-separate-evidence|
|US-MFG-PHARMA-013 按书面程序清洗生产设备|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|scope-expanded-by-split-needs-separate-evidence|
|US-MFG-PHARMA-014 向质量放行与成品接收方移交批记录|needs-repair|记录操作数据并非向质量单元和接收者移交完整批记录的职责；保留数字记录机理，交付分支拟议。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|scope-expanded-by-split-needs-separate-evidence|
|US-MFG-AUTO-001 核对车身身份与工位装配单|needs-repair|当前来源仅为人工职责/流程规范/研发目标或不匹配动作的背景，正文已说明不足；positiveCounterexample.status及alternatives.deploymentStage不能统一显示已证机理，应明确workflow-only/adjacent-or-proposed/no-qualified-task-mechanism。|plausible-different-actions-pending-independent-outputs|
|US-MFG-AUTO-002 配齐本车装配组件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-AUTO-003 将待装車身交至指定工位|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-AUTO-004 定位并安装规定内饰组件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|scope-expanded-by-split-needs-separate-evidence|
|US-MFG-AUTO-005 安装规定线束和连接器|needs-repair|O*NET仅协助线束生产，未直接写整车线束布置与连接器锁止；视觉案例只有检查。该安装任务应部分拟议。|plausible-different-actions-pending-independent-outputs|
|US-MFG-AUTO-006 安装规定动力底盘模块|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-AUTO-007 安装车轮及规定外装件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-AUTO-008 执行装配工位质量检查|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-AUTO-009 暂停异常车辆并发出质量工单|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-AUTO-010 按批准方法修正装配缺陷|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|scope-expanded-by-split-needs-separate-evidence|
|US-MFG-AUTO-011 执行出厂前适用功能检验|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|scope-expanded-by-split-needs-separate-evidence|
|US-MFG-AUTO-012 清理工位并检查停用装配工具|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-AUTO-013 移交已放行车辆与生产记录|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-WELD-014 清理待焊构件表面|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|product-or-failure-branch-not-unconditional-serial-tasks|
|US-MFG-METAL-007 对齐并夹紧待焊构件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-combined-unless-independent-boundary-demonstrated|
|US-MFG-METAL-008 焊接规定接头|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|retain-current-candidate-boundary-unfrozen|
|US-MFG-METAL-009 检查焊缝外观与构件尺寸|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-METAL-010 隔离缺陷材料或异常焊接设备|needs-repair|职业第4项发现并通知，不直接执行缺陷材料/异常焊机隔离；应部分拟议。；按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-METAL-011 修整允许返修的焊接构件|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|
|US-MFG-METAL-012 维护停用焊接设备|needs-repair|按独立sourceDecisions逐定位修复；原文中的有限事实可保留，错误落点不能作为已通过追溯。|plausible-different-actions-pending-independent-outputs|
|US-MFG-METAL-013 交接炉次或构件追溯记录|bounded-evidence-acceptable-with-gaps|有限机制/职责范围可保留；现场验收、工时、失败样本与回报仍不足。|plausible-different-actions-pending-independent-outputs|

本轮不声称覆盖全部制造子行业，不冻结行业，也不重新解释既有候选任务数量。原始搜索与缓存继续私存；独立复核后新增访谈仍需进入版本审校。