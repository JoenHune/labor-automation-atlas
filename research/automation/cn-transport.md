# 中国交通、仓储和邮政：83项作者修订工作版

中国交通8场景83原候选按独审作作者修订，等待限定复检；45局部、14相邻、1相邻采购要求、23无匹配。全行业覆盖、当前整任务商用、工时和现金仍有缺口；7父15拟议子不新增，不冻结。

原研究输入 SHA256 `17d7e466a6b1e36222aec4ece6eb42cc8214fe2c798f95ef12d9c023df62b6e7`；独审 `bf379726aabfbb6fc2d024041d9d9e0a192c6a2df81c24b49810dae02b671633`。本修订不是独立复检结果。

## 方法与范围

- 83项各一正一反实际查询；初查道路11项被正式法规措辞主导后追加22条聚焦复查；另外8个专题批次22条。每对/批请求与原始回包完整保留，搜索结果只联合归因，不为每一查询捏造独立排序。
- 2026-09-09
- 厂商功能、具名供应商案例、运营者历史/试运行/运行、官方案例、专利、相邻行业样机、采购要求和规范责任分别标记。
- CN与CNY独立；海外案例图片不进入中国部署，国内供应商欧美车型产品亦未作为国内匹配机制。
- 原清单83份完整快照保持；逐项有效定义区分职业动作、部分动作、上下文、法规要求和拟议返工。7父15子仅建议，无新增或继承搜索/工时。作者应用独审后仍待限定复检。
- 未读全文的候选不支撑实质结论；检索无匹配并非不可行，不给第2/3类无场景判断。
- WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again
- WC_inc,t=项目营运资金余额_t−基准方案营运资金余额_t；每期只扣WC_inc,t−WC_inc,t−1。期初只投入WC_inc,0；期末有依据才回收，已反映在余额下降中的回收不得再计。
- 比较同一交付质量/数量的增量现金流，已进入贡献的成本不重复扣；全部输入、回收期与门槛为null。
- 公开审计去除临时授权参数和过长正文误识别标题，原文及原始回包仅留内部。
- 道路货运、货站、快递与干散货港口8场景；53/56/57/58/59全大类及54/55/60剩余场景显式未覆盖。
- 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。
- 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。

### 完整现金框架

`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`

后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。

WC_inc,t=项目营运资金余额_t−基准方案营运资金余额_t；每期只扣WC_inc,t−WC_inc,t−1。期初只投入WC_inc,0；期末有依据才回收，已反映在余额下降中的回收不得再计。

所有人工、回收期、盈亏门槛及更换/退出现金参数仍为空。

## 来源与逐条声明

### EPOD · 物流业条形码读码器应用案例

[基恩士中国](https://www.keyence.com.cn/ss/products/auto_id/handheld-terminals/example/logistics.jsp)；资料期/发布日期：未知；L60—85、92—94、99、105、111、116、122、126（所读产品正文未确认日期）；正文没有可确认发布日期，留null；中国产品页不证明国内用户。；证据等级：vendor-product-description。

条码与物流数据采集功能；中国站不证明国内具名实际部署。 收货/发货/集货扫描、目的地区域分流及交付时点数据有原文；配载确认、先确认收件人超出原段。

- CN-TP-CLAIM-SCAN-RECEIVE · 原文事实：手持终端扫描码号并核对入出库或交接记录。（L60—85、L105、L116）
  - 残留/未替代范围判断：操作者持机扫描；实物损傷与无标识物仍需另核。
- CN-TP-CLAIM-SCAN-PICKUP · 原文事实：揽收扫描可上传数据并打印分区标签。（L99、L105）
  - 残留/未替代范围判断：司机采集、装卸与贴附未被此功能消除。
- CN-TP-CLAIM-SCAN-ROUTE · 原文事实：条码与目的地区域关联用于分流和工序跟踪；调度人员据流程信息优化配送路线与驾驶员配置。（L92—94、L111）
  - 研究边界：分流与路程优化不证明装载方案核验、车内配载或绑固确认。
- CN-TP-CLAIM-SCAN-DELIVERY · 原文事实：终端接收配送时间变更信息；货物按计划完成签收后，驾驶员扫描发货单并通知总部配送完毕。（L122、L126）
  - 研究边界：签收后扫描不证明此前进行本人/指定代收人身份查验，也不证明用户授权或同意。
  - 残留/未替代范围判断：原文仅说明司机在按计划完成签收后扫描发货单；身份查验与用户授权程序未给出，属于待核边界。

### FREIGHT-LOAD · 机器人全自动装卸车解决方案

[星猿哲科技](https://www.xyzrobotics.com.cn/publicity/robotic-loading-unloading-with-rocky-bing)；资料期/发布日期：未知；L47—52、64（所读产品正文未确认日期）；正文未见日期；页面日本/美国案例图不作中国部署。；证据等级：vendor-product-description。

纸箱机器人装卸方案；页面日本和美国图片案例均不作为中国部署。 纸箱装卸、机械臂和输送线仅产品机制；对软袋、无托盘货、车内绑固未证。

- CN-TP-CLAIM-BOX-ROBOT · 原文事实：机械臂与输送线处理纸箱卸载、分流、码垛或装车。（L47—52、L64）
  - 残留/未替代范围判断：系统上料、车辆对接、异常箱与空托盘人工量未披露。

### ADDRESS · 地址诊断服务

[京东物流地图平台](https://lbsapi.jd.com/doc/guide/addressAnalyze/addressVerificationService/)；资料期/发布日期：未知；L190；L190为最后更新2022-09-09，非首发日，publishedAt=null可保留。；证据等级：operator-api-documentation。

地址文本诊断；最后更新2022-09-09，未证明任意快递企业实际服务范围。 缺项、嵌套、模糊地址文本诊断与提示；不核本快递企业服务范围，不授权改原始订单。

- CN-TP-CLAIM-ADDRESS-CHECK · 原文事实：接口诊断地址缺失、嵌套和模糊，返回修改提示。（L107—122、L133—139、L190）
  - 残留/未替代范围判断：用户或业务人员确认更正，非自行编造地址。

### POST-ROBOT-2023 · 中国邮政启动全国首个“机器人+”AI寄递解决方案

[中国邮政](https://www.chinapost.com.cn/cn/report/2306/11864-1.html)；资料期/发布日期：2023-06-20；L17；试运营起点另见L18—24；L17发布日期2023-06-20；L18—24为6月16日起总部试运营，二者不混。；证据等级：operator-pilot-self-report。

2023-06-16启动的总部场景试运营；户外与室内联动，不代表所有住宅上门服务。 室内外机器人与门禁电梯通知联调；遥控模式保留，不能推住宅普遍适用或2026持续运行。

- CN-TP-CLAIM-DELIVERY-PILOT · 原文事实：总部试运营联动室外车辆与室内机器人，并与门禁电梯及通知系统集成。（L17—24）
  - 残留/未替代范围判断：保留自主、现场遥控与远程操控模式；接管工时未披露。

### POST-MISROUTE-PLAN · 2026年广东邮政省际中心AI错分监测报警系统建设项目采购需求公开征求意见公告

[中国邮政](https://www.chinapost.com.cn/cn/report/2607/6699-1.htm)；资料期/发布日期：2026-07-22；L32；采购阶段L40；L32为2026-07-22；L40采购前征求意见。；证据等级：procurement-requirement-not-deployment。

采购征求意见和性能要求；不得推为已部署、实际误报或失败率。 错分视频回溯/扫码关联及人工复核为计划需求，非已部署；与破损油污名址错误相邻。

- CN-TP-CLAIM-MISROUTE-PLAN · 原文事实：采购方拟引入视频与扫码联动的错分报警、回溯及人工复核。（L40、L50—63、L97、L132—142）
  - 残留/未替代范围判断：无法匹配的事件要求人工复核，现场取件重分不由报警功能证明。

### POST-BAG · 东莞邮政创新提升物流仓配集包效率

[中国邮政](https://www.chinapost.com.cn/cn/report/2404/5675-1.htm)；资料期/发布日期：2024-04-10；L35；L35为2024-04-10，历史运营者报道。；证据等级：operator-running-self-report。

东莞自研半自动集包，保留人工装袋；按场地和业务量选型。 东莞半自动粗分/灯光集包和人工投袋；大型分拣设备不适合场地邮件量，不能当独立地址读码器失败。

- CN-TP-CLAIM-BAG-HALFAUTO · 原文事实：东莞使用扫码粗分与灯光提示集包，人员将分流邮件投入袋中。（L37—42）
  - 残留/未替代范围判断：人工投件、装袋；封袋和异常工时未披露。
- CN-TP-CLAIM-BAG-NONADOPT · 原文事实：该场地与邮件量不适合大型分拣设备，采用半自动方案。（L39—42）

### POST-YARD · 数智化场院管理 处理中心数字化迈出新步伐

[中国邮政](https://www.chinapost.com.cn/cn/report/2211/30021-1.htm)；资料期/发布日期：2022-11-23；L35；当时运行一个多月的叙述另见正文；L35为2022-11-23，文内当时运行一个多月；未核2026。；证据等级：operator-initial-operation-self-report。

报道时运行一个多月；司机与接发调度人员仍现场交接。 场院指令、垛口车辆识别和人工查验交接；不将计划信息当实际发运。

- CN-TP-CLAIM-YARD-DIGITAL · 原文事实：场院系统派发垛口指令、核对车辆并记录交接；司机与调度员现场配合。（L50—61、L65—72、L84—95）
  - 残留/未替代范围判断：司机执行行车装卸衔接，接发人员查验车辆状态。

### CPTE-DWS · 称重读码设备

[中邮科技](https://www.cpte.com/product-detail/35)；资料期/发布日期：未知；L93—95、140（所读产品正文未确认日期）；产品页未见可靠日期，留null；无具名运行用户。；证据等级：vendor-product-description。

视觉与电子称重取得码号、重量和体积信息；无具名用户。 视觉条码与电子称重体积数据采集；不证明名址真实性、法定计量或任意包形。

- CN-TP-CLAIM-DWS · 原文事实：视觉与电子称重设备采集条码、重量和体积并传入业务系统。（L93—95、L140）

### PRINT-LABEL · 自动打印贴标机的工作原理是什么？

[伟迪捷中国](https://www.videojet.com.cn/cn/homepage/resources/faqs/general/lpa-principle.html)；资料期/发布日期：未知；L120—131（所读产品正文未确认日期）；产品说明未见可确认日期，留null。；证据等级：vendor-product-description。

打印及贴附功能；不证明收寄信息真实或快递企业已安装。 滚贴、吹贴、压贴及缺标签故障报警只局部打印贴附；非信息核验或收寄部署。

- CN-TP-CLAIM-LABEL · 原文事实：在线打印后可采用滚贴、吹贴或压贴；用尽标签和故障触发报警。（L120—131）
  - 残留/未替代范围判断：标签补充、贴标位置调整及排障待计。

### PORT-ROBOT · 山东日照港矿石管带运输智能化巡检项目

[天创机器人](https://tetrabot.com/lists/456.html)；资料期/发布日期：未知；L53—59、69（所读产品正文未确认日期）；未列可核部署/发布日期，留null；具名日照港仍为供应商自报。；证据等级：vendor-named-deployment-self-report。

日照港指定管带廊道的挂轨巡检；不是自主维修，持续日期未披露。 挂轨巡检裂纹、托辊异常与噪声，报警后确认维修不是其执行机制。

- CN-TP-CLAIM-PORT-INSPECT · 原文事实：供应商称日照港挂轨机器人识别皮带裂纹、托辊异常并诊断噪音。（L53—59、L69）
  - 残留/未替代范围判断：报警后的确认与部件维修不在巡检功能内。

### BAG-OPEN-PATENT · CN111559551A 快递流转包自动拆包方法和装置

[上海中通吉网络技术有限公司（专利公开文本）](https://patents.google.com/patent/CN111559551A/zh)；资料期/发布日期：2020-08-21；L37；CN111559551A公开时间线；L37/公开时间线2020-08-21为CN111559551A公开日，不是装机日。；证据等级：patent-disclosure-not-deployment。

视觉抓袋、切口、倒包专利；描述人工回收袋子，无独立商用验证。 视觉定位抓袋切口倒出与人工回收空袋的专利实施描述；未证内装数重核验或商业运营。

- CN-TP-CLAIM-BAG-OPEN · 原文事实：专利提出视觉定位袋边、机械抓持切开后倒包。（L180—206）
  - 残留/未替代范围判断：实施例安排人工回收空袋；件数重量复核并未由拆袋机械证明。

### MOT-BULK-BODY · 交通强国建设试点典型案例集（第一辑）案例14、15

[交通运输部加快建设交通强国领导小组办公室](https://xxgk.mot.gov.cn/jigou/zhghs/202509/P020250916422010117400.pdf)；资料期/发布日期：2025-09；PDF物理第1页封面，2025年9月；物理1封面2025年9月，只有月精度；URL发布日期日不推定为封面日。；证据等级：official-case-report-of-operation。

青岛港前港和国能黄骅港分别归属；部委案例汇编不等于独立现场审计。 青岛前港与黄骅港分开；部委汇编收录地方/企业试点成效，不是独立现场审计。黄骅说明跨物理47—48/正文43—44。

- CN-TP-CLAIM-MOT-PORT-CONTROL · 原文事实：青岛前港报告堆取料、卸船和皮带设备自动化改造，门机防摇及协同控制。（PDF第45页/印刷页41，L723—731）
- CN-TP-CLAIM-MOT-PORT-DUST · 原文事实：青岛前港将粉尘监测与自动喷淋联动，并建设皮带巡检。（PDF第45页/印刷页41，L732—738）
- CN-TP-CLAIM-MOT-TIPPLER · 原文事实：黄骅港翻堆取装体系以料位感测调节给料速度，生产指令下达到设备。（PDF第47—48页/印刷页43—44，L766—778）
  - 残留/未替代范围判断：运行模式仍以监护为主、操作为辅。

### BELT-JOIN · ZLJ系列组合式输送胶带硫化接头机

[青岛巨航胶带](https://www.qdjuhang.cn/detail-50.html)；资料期/发布日期：未知；L8—10（所读产品正文未确认日期）；产品无可靠日期；侧栏2024等新闻日期不当产品发布日期。；证据等级：vendor-product-description。

电加热、液压加压及水冷胶接工具，未证明自动备带或全接头验收。 电热液压/水冷型胶带接头工具，未证带端准备、参数选择及接头验收全自动。

- CN-TP-CLAIM-VULCANIZE · 原文事实：接头机以电加热和液压加压完成胶带硫化，另有通水冷却型。（L8—10）
  - 残留/未替代范围判断：带端加工、组装、工艺选择和接头验收未说明自动完成。

### BELT-IDLER · 带式输送机不停机更换托辊机器人研究与应用

[田立勇等／中国机械工程](https://www.cmemo.org.cn/EN/10.3969/j.issn.1004-132X.2024.05.019)；资料期/发布日期：2024-06-26；L18：Online与Published分别列示；L18分别Online2024-05-25、Published2024-06-26，原日可保留并并列日期类型。；证据等级：research-prototype-tests-adjacent-industry。

王家岭煤矿地面及井下样机试验；不是港口部署，页面另列Online 2024-05-25。 王家岭煤矿地面/井下样机试验，相邻港口；不停机的标题不可升格港口可用。

- CN-TP-CLAIM-IDLER-ADJACENT · 原文事实：煤矿托辊机器人样机经地面及井下测试，包含举带和机械手拆装。（L18、L37—46）
  - 残留/未替代范围判断：仅煤矿试验，港口断能条件、廊道尺寸和托辊接口须另核。

### ROAD-PILOT · 全国首个跨省市高速公路自动驾驶货运测试在京津塘高速正式启动

[招商公路](https://www.cmhighway.com/xwzx/qyxw/content/1991755486905913346_1991755500805836802.html)；资料期/发布日期：2024-01-29；L82；L89为2024-01-22启动沟通会及后续道路测试叙述；L82为2024-01-29报道，L89叙述1月22日启动，商业试运行为随后探索计划。；证据等级：operator-road-test-self-report。

限定京津塘测试路段，主驾安全员；后续商业试运行是当时计划。 京津塘道路测试主驾安全员实际保留；不是无安全员运营和可取消司机工资。

- CN-TP-CLAIM-ROAD-TEST · 原文事实：京津塘货车道路测试使用自动驾驶，并设置主驾安全员。（L82—89）
  - 残留/未替代范围判断：安全员与试验保障仍在，商业化探索不能等同取消驾驶成本。

### CROWN-MOVE · WJ系列紧凑型托盘搬运车

[科朗设备中国](https://www.crown.com/zh-cn/forklifts/pallet-trucks/compact-pallet-truck-wj.html)；资料期/发布日期：未知；L24、41—55、94—101、160—168（所读产品正文未确认日期）；产品页未确认日期，留null；中文站非国内具名用户。；证据等级：vendor-product-description。

电动步行式托盘升降搬运；需要操作员，国内用户部署未提供。 步行人控电动托盘车行驶升降定位辅助，不是自动配载绑扎。

- CN-TP-CLAIM-PALLET-MOVE · 原文事实：步行式电动托盘车助力行驶、升降与定位。（L24、L41—55、L94—101、L160—168）
  - 残留/未替代范围判断：操作者控制车和托盘位置，货物配载与绑扎不在功能证明内。

### POST-MAINT-RETRY · 邮政寄递建强集中维保体系 全网设备故障数下降超九成

[中国邮政](https://www.chinapost.com.cn/cn/report/2609/0746-1.htm)；资料期/发布日期：2026-09-03；L35；L37为截至2026年7月底数据；L35=2026-09-03报道，L37数据截至2026年7月底，不能标9月现场普查。；证据等级：operator-running-self-report。

SCADA及集中维保，数据截至2026年7月底；效率百分比不用于人工或回报。 SCADA与人工渠道收故障、定位指导维修；保留现场班组备件。运行故障不是退出；整体降幅未采入任务现金流。

- CN-TP-CLAIM-POST-MAINT-DIGITAL · 原文事实：邮政集中维保通过SCADA与人工值守渠道收集故障、定位并指导修复。（L35—44）
  - 残留/未替代范围判断：现场维保班组值守、维修及备件调拨保留。
- CN-TP-CLAIM-POST-FAULTS · 原文事实：运行报道仍记录设备故障及电控程序问题，采取远程指导和现场维修。（L37—44）

### PORT-MAINT · 神华黄骅港运维项目

[中交第一航务工程局](https://www.ccccyhj.com/article/38/detail-701.html)；资料期/发布日期：未知；L4历史2016口径及2001起服务，不是网页日；L4正文历史2016口径/2001起服务；网页发布日期未知留null。；证据等级：service-provider-historical-self-report。

正文以2016年资料为背景，未给网页发布日期；外包运行维修责任案例，不证明自动维修。 服务商黄骅巡视、清扫、皮带秤检修及大机维护责任；只有执行者/人工上下文，不是自动方案。

- CN-TP-CLAIM-OUTSOURCE-MAINT · 原文事实：黄骅港项目服务商列明巡视、清扫、皮带秤检修和大型设备维护责任。（L4—12）

### BELT-CORRECT · CN101244777A 输送带自动纠偏装置和方法

[上海海事大学（专利公开文本）](https://patents.google.com/patent/CN101244777A/zh)；资料期/发布日期：2008-08-20；L39、L42，CN101244777A公开时间线；L39/42公开2008-08-20；专利法律状态不当撤机失败。；证据等级：patent-disclosure-not-deployment。

跑偏测量反馈控制托辊角度的设计；非现行商业采用或根因全处置证据。 反馈偏移驱动托辊的专利机制，缺港口长周期运行。

- CN-TP-CLAIM-BELT-FEEDBACK · 原文事实：专利以跑偏量反馈驱动电机转动纠偏托辊，使皮带回位。（L110—156）

### ROAD-TPMS-CN · 商用车胎压与胎温监测系统方案

[东莞赛富特汽车安全技术有限公司](https://www.saftire.com/)；资料期/发布日期：未知；L96—121，尤其117—120（所读产品正文未确认日期）；产品无日期，留null；没有车队清单。；证据等级：vendor-product-description。

轮胎数据显示和挂车连接仅限所列胎压胎温监测方案；UDS 诊断位于卡车前装胎压（胎温）监测小节，不推整车诊断；无可审计承运车队清单。 轮胎信息/挂车连接支持，UDS在卡车前装胎压胎温监测小节，不能泛称整车诊断。

- CN-TP-CLAIM-TPMS · 原文事实：页面分别列出单机版的轮胎数据显示及挂车连接，以及卡车前装胎压（胎温）监测系统的 UDS 诊断。（L96—121）
  - 研究边界：所列UDS仅限轮胎监测系统，不证明制动、转向或整车适行诊断。

### ROAD-WEIGH-PATENT · CN213209231U 一种无人值守称重装置

[紫金矿业集团（专利公开文本）](https://patents.google.com/patent/CN213209231U/zh)；资料期/发布日期：2021-05-14；L40，CN213209231U公开日；L40=2021-05-14公开日，2020申请不是部署日。；证据等级：patent-disclosure-not-deployment。

地磅称重实施例与清理推板设计；明确司机、门卫参与，非承运场站商用证明。 前后称重、磅单与门卫/司机职责为专利实施例；无人值守命名不等于无人。

- CN-TP-CLAIM-TRUCK-SCALE · 原文事实：地磅实施例安排货车装卸前后称量并打印磅单。（L89、L124）
  - 残留/未替代范围判断：司机进出磅，门卫或自助发卡，门卫核单；称谓无人值守不等于无人。

### ROAD-FIX-MON · CN208013426U 运输途中货物装载加固状态实时监测装置

[北京交通大学（专利公开文本）](https://patents.google.com/patent/CN208013426U/zh)；资料期/发布日期：2018-10-26；L39公开日；L40另列2018-04-17申请日；L39—40公开2018-10-26，申请2018-04-17另列。；证据等级：patent-disclosure-not-deployment。

超声位移监测设计含公路扩展；实验背景含铁路，不当公路持续运行证明。 超声距离判断货物移动有公路扩展；不直接查绑带张力或覆盖状态。

- CN-TP-CLAIM-LOAD-SHIFT · 原文事实：专利按超声距离变化判断货物偏移并报警，含公路扩展说明。（L85—91、L118—129、L167）
  - 残留/未替代范围判断：人员安装探头、设阈值并处理移位；未检验所有绑带张力与覆盖状态。

### PORT-CONTINUOUS · 关于学习借鉴国投港口《港口生产标准作业法（卸船作业线）》的通知

[福建省湄洲湾港口发展中心](https://jtyst.fujian.gov.cn/mzwgk/mzwzfxxgk/mzwzfxxgk/qtyzdgkdzfxx/202411/t20241105_6560445.htm)；资料期/发布日期：2024-11-05；L21网页日；L40文件落款日；网页L21=2024-11-05，文件落款L40=2023-12-13，原双日期说明正确。；证据等级：operator-workflow-normative-context。

文件成文2023-12-13，网页2024-11-05；检查与试操作等职责，不作为自动化部署。 作业法点检、试转、异常移交和交接是规范流程上下文；不是连续卸船自动运行案例。

- CN-TP-CLAIM-PORT-CHECK-CONTEXT · 原文事实：港口作业法安排设备试转、点检、异常移交和交接。（L21、L40、L100—104、L114—123）

### PACK-HPRT · 什么是快递打包机？怎样操作？

[厦门汉印电子科技](https://www.hprt.com.cn/News/2361.html)；资料期/发布日期：2024-07-08；L74；L74=2024-07-08发布；销售产品说明。；证据等级：vendor-product-description-adjacent-performer。

电商商家包装机步骤；只作收寄封袋工序可迁移机制，不能将商家劳动计入邮政。 商家电商投料、打印贴标、热封等局部机制，仅相邻快递收寄。

- CN-TP-CLAIM-PACK-BAG-ADJACENT · 原文事实：电商封袋机由人投产品，按订单打印贴标并热封。（L74、L84—113、L123—134）
  - 残留/未替代范围判断：操作人员装耗材、调参数、投物；商家执行者不能直接计入快递。

### FREIGHT-CLEAN · 全场景清洁解决方案：物流仓库

[扬子清洁设备](https://www.yangziqj.com/solution/)；资料期/发布日期：未知；L128—136（所读产品正文未确认日期）；没有正文发布日期；版权2017—2028非文稿日期，留null。；证据等级：vendor-product-description-adjacent-site。

物流仓库洗地、扫地组合；道路货站同类地面适配待核，不推危险泄漏清理。 物流仓库纸屑/轮胎印扫洗推荐；货站垃圾或危险泄漏不同条件，维持相邻。

- CN-TP-CLAIM-FLOOR-CLEAN · 原文事实：厂商为物流仓库纸箱碎屑与轮胎印推荐洗地机和扫地机。（L128—136）
  - 残留/未替代范围判断：货站材质、通行、垃圾清运和危险泄漏另核。

### YANTAI-OPERATOR · 烟台港干散货专业化码头控制技术正式发布

[山东省港口集团](https://www.sd-port.com/groupMainNews/2021-12-23/658591897748504576.html)；资料期/发布日期：2021-12-22；L99正文日；L99正文2021-12-22，与URL12-23区分，采用正文日正确。；证据等级：operator-deployment-self-report。

烟台西港区专业化矿石码头，操作自动化与远程清舱分别描述；不是2026全港无人化。 矿石码头抓斗、铁路装车、堆取、装船机制可各有限映射；是历史运营者自报，非2026独立验证。

- CN-TP-CLAIM-YT-GRAB · 原文事实：烟台矿石码头以防摇和抓取路径控制实现抓斗卸船自动动作。（L99、L111—114）
- CN-TP-CLAIM-YT-RAILLOAD · 原文事实：装车系统识别铁路车厢顺序并控制换厢及翻板。（L116—118）
- CN-TP-CLAIM-YT-PILE · 原文事实：扫描成像建立堆场模型，控制堆取料寻址及流量。（L120—122）
- CN-TP-CLAIM-YT-SHIPLOAD · 原文事实：识别舱边并按配载图换舱，装船机与取料系统连锁。（L127—129）

### LASTMILE-TOOLS · “作业神器”让邮政“双11”服务更赞

[中国邮政](https://www.chinapost.com.cn/cn/report/1911/9337-1.htm)；资料期/发布日期：2019-11-18；L37；L37=2019-11-18，历史双11多个地点案例不能合成一个站。；证据等级：operator-historical-deployment-self-report。

不同城市案例分别识别；只取邮袋辅助与输送、人工扎袋及场地改造条件。 输送、撑袋架/缝包/人工扎袋局部；深圳旧场地与迁址条件不能算技术失败或全国门槛。

- CN-TP-CLAIM-BAG-BASELINE · 原文事实：邮政历史案例使用输送带、撑袋架与缝包机，人员扎袋后转运。（L37、L46、L55—56）
  - 残留/未替代范围判断：分流后扎袋和人工移动仍出现，不能将全程不落地视为无人。
- CN-TP-CLAIM-SORT-SPACE · 原文事实：深圳大浪旧场地以皮带和手工作业为主，迁址后安装分拣设备。（L48）

### CABINET-OPERATOR · 中邮速递易智能信报箱落地北京

[中国邮政](https://www.chinapost.com.cn/html1/report/181312/9573-1.htm)；资料期/发布日期：2018-08-21；L39；L39=2018-08-21，不用路径日期替代正文。；证据等级：operator-historical-deployment-self-report。

2018北京信报箱兼包裹柜，仍由投递员入格；不证明用户同意流程。 北京信报箱空格地址匹配、人员入格、用户凭码取件；没有本人身份或用户同意证明。

- CN-TP-CLAIM-CABINET · 原文事实：北京智能信报箱匹配地址与空格，投递员入格，用户凭码开启。（L39—46）
  - 残留/未替代范围判断：人工投递与用户取出仍存在；用户同意和本人核验流程未给出。

### ROAD-SIZE-PATENT · CN206177238U 车辆外廓尺寸检测仪

[佛山分析仪有限公司（专利公开文本）](https://patents.google.com/patent/CN206177238U/zh)；资料期/发布日期：2017-05-17；L34，CN206177238U公开日；L34公开2017-05-17；2016-08-23为申请日。；证据等级：patent-disclosure-not-deployment。

车辆检测站激光外廓设计；载货货物外伸识别及道路货站应用均待确认。 检测站外廓激光光电测量与引车员为相邻路线；不能等于运输中货物外伸与许可对照。

- CN-TP-CLAIM-VEHICLE-SIZE · 原文事实：检测站专利以激光与光电传感器获取通过车辆外廓。（L87、L100—104、L138—141）
  - 残留/未替代范围判断：引车员驾驶；载货外伸与实际许可参数对照待核。

### CONTINUOUS-PATENT · CN105016099B 链斗式连续型卸船机全自动智能控制系统

[上海振华相关申请人（专利公开文本）](https://patents.google.com/patent/CN105016099B/zh)；资料期/发布日期：2017-07-07；L43、L48，CN105016099B授权公告日；L43/48=2017-07-07授权公告；2015A初次公开另有，不当同日期。；证据等级：patent-with-self-described-testing-not-independent-deployment。

2015公开A文本，2017B文本；手动示教与逐作业面确认，未提供具名持续用户。 链斗示教、分面确认及协调卸取的专利机制和自述测试，不外推螺旋/气吸或长期商业。

- CN-TP-CLAIM-CONTINUOUS · 原文事实：链斗卸船控制专利通过司机示教学习路径，控制机构协同卸取。（L101—105、L126—139、L173—176）
  - 残留/未替代范围判断：司机示教、逐作业面确认及必要干预；未给持续商用站点。

## 逐任务结果

### cn-trans-road-truck-001 · 检查货运车辆出车技术状态

已保留局部机制；完整任务替代尚未证实。 TPMS仅轮胎压力/温度与挂车配对信息辅助；无整车适行判定机制。

- 执行边界：只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 输入：车辆及检查工具
- 输出：出车检查结果
- 验收：车辆达到本次运输适用条件
- 定义与粒度：检查结果可单独验收；检查项目清单尚缺。
- 适用条件：车型、传感器安装和挂车配对必须匹配
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理195/正文188，4-02-02-02 道路货运汽车驾驶员，任务3；角色：职业原文直接列出动作（限所引文字）；truck 物理195/正文188任务3直接支持检查车辆；不能推整车项目或工时。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第2条、第6条；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；TPMS仅轮胎压力/温度与挂车配对信息辅助；无整车适行判定机制。；未证范围：TPMS仅轮胎压力/温度与挂车配对信息辅助；无整车适行判定机制。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；TPMS仅轮胎压力/温度与挂车配对信息辅助；无整车适行判定机制。；未证范围：TPMS仅轮胎压力/温度与挂车配对信息辅助；无整车适行判定机制。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；TPMS仅轮胎压力/温度与挂车配对信息辅助；无整车适行判定机制。；未证范围：TPMS仅轮胎压力/温度与挂车配对信息辅助；无整车适行判定机制。 |
| 辅助工具 | source-described-see-binding-role；partial-mechanism；TPMS仅轮胎压力/温度与挂车配对信息辅助；无整车适行判定机制。；未证范围：TPMS仅轮胎压力/温度与挂车配对信息辅助；无整车适行判定机制。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；TPMS仅轮胎压力/温度与挂车配对信息辅助；无整车适行判定机制。；未证范围：TPMS仅轮胎压力/温度与挂车配对信息辅助；无整车适行判定机制。 |

- CN-TP-CLAIM-TPMS · partial-mechanism：TPMS仅轮胎压力/温度与挂车配对信息辅助；无整车适行判定机制。；[商用车胎压与胎温监测系统方案](https://www.saftire.com/) · L96—121
- 部署层级：vendor-product-description；轮胎数据显示和挂车连接仅限所列胎压胎温监测方案；UDS 诊断位于卡车前装胎压（胎温）监测小节，不推整车诊断；无可审计承运车队清单。；当前任务：TPMS仅轮胎压力/温度与挂车配对信息辅助；无整车适行判定机制。；L96—121，尤其117—120（所读产品正文未确认日期）；产品无日期，留null；没有车队清单。
- 残留/未替代范围：TPMS仅轮胎压力/温度与挂车配对信息辅助；无整车适行判定机制。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：车型、传感器安装和挂车配对必须匹配；TPMS仅轮胎压力/温度与挂车配对信息辅助；无整车适行判定机制。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-road-truck-001、CN-TP-SEARCH-cn-trans-road-truck-001-scoped；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：车型、传感器安装和挂车配对必须匹配；TPMS仅轮胎压力/温度与挂车配对信息辅助；无整车适行判定机制。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；检查结果可单独验收；检查项目清单尚缺。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：TPMS仅轮胎压力/温度与挂车配对信息辅助；无整车适行判定机制。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；检查结果可单独验收；检查项目清单尚缺。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E03']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-road-truck-002 · 查验托运货物及限运手续

本轮没有保留匹配机制；不据此判断技术不可行。 未保留本动作匹配方案，仍是资料与许可类别缺口。

- 执行边界：只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 输入：货物与运输单据
- 输出：运输准入确认
- 验收：禁止运输物不装运且限运手续齐全
- 定义与粒度：单据/许可核查输出可识别；不把大件审批纳入已验证普货。
- 适用条件：品名、实物特征、运输许可与合同应一致
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理195/正文188，4-02-02-04 道路货运业务员，任务2；角色：职业原文直接列出动作（限所引文字）；道路货运业务员任务2支持营运单据查验；驾驶员条目未提供该项支持，已从有效引用移除。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第29条、第31条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；未保留本动作匹配方案，仍是资料与许可类别缺口。；未证范围：未保留本动作匹配方案，仍是资料与许可类别缺口。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；未保留本动作匹配方案，仍是资料与许可类别缺口。；未证范围：未保留本动作匹配方案，仍是资料与许可类别缺口。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；未保留本动作匹配方案，仍是资料与许可类别缺口。；未证范围：未保留本动作匹配方案，仍是资料与许可类别缺口。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；未保留本动作匹配方案，仍是资料与许可类别缺口。；未证范围：未保留本动作匹配方案，仍是资料与许可类别缺口。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；未保留本动作匹配方案，仍是资料与许可类别缺口。；未证范围：未保留本动作匹配方案，仍是资料与许可类别缺口。 |

- 残留/未替代范围：未保留本动作匹配方案，仍是资料与许可类别缺口。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：品名、实物特征、运输许可与合同应一致；未保留本动作匹配方案，仍是资料与许可类别缺口。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-road-truck-002、CN-TP-SEARCH-cn-trans-road-truck-002-scoped；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：品名、实物特征、运输许可与合同应一致；未保留本动作匹配方案，仍是资料与许可类别缺口。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；单据/许可核查输出可识别；不把大件审批纳入已验证普货。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：未保留本动作匹配方案，仍是资料与许可类别缺口。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；单据/许可核查输出可识别；不把大件审批纳入已验证普货。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E05']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-road-truck-003 · 称量装车前后车辆重量

已保留局部机制；完整任务替代尚未证实。 地磅专利局部称量和磅单；门卫、司机及真假货物核对仍在，不称当前车队商用。

- 执行边界：只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 输入：空载或已装车辆
- 输出：称重记录
- 验收：装载质量对应车辆与运单
- 定义与粒度：一次前后称重得到一份载重记录，可保留；不与004同次称量双计。
- 适用条件：同车装卸前后称重且去除无关载荷变化
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理195/正文188，4-02-02-02 道路货运汽车驾驶员，任务2；角色：职业原文直接列出动作（限所引文字）；truck 195/188任务2直接写装货前后称重和载重记录。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第26条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism；地磅专利局部称量和磅单；门卫、司机及真假货物核对仍在，不称当前车队商用。；未证范围：地磅专利局部称量和磅单；门卫、司机及真假货物核对仍在，不称当前车队商用。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；地磅专利局部称量和磅单；门卫、司机及真假货物核对仍在，不称当前车队商用。；未证范围：地磅专利局部称量和磅单；门卫、司机及真假货物核对仍在，不称当前车队商用。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；地磅专利局部称量和磅单；门卫、司机及真假货物核对仍在，不称当前车队商用。；未证范围：地磅专利局部称量和磅单；门卫、司机及真假货物核对仍在，不称当前车队商用。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；地磅专利局部称量和磅单；门卫、司机及真假货物核对仍在，不称当前车队商用。；未证范围：地磅专利局部称量和磅单；门卫、司机及真假货物核对仍在，不称当前车队商用。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；地磅专利局部称量和磅单；门卫、司机及真假货物核对仍在，不称当前车队商用。；未证范围：地磅专利局部称量和磅单；门卫、司机及真假货物核对仍在，不称当前车队商用。 |

- CN-TP-CLAIM-TRUCK-SCALE · partial-mechanism：地磅专利局部称量和磅单；门卫、司机及真假货物核对仍在，不称当前车队商用。；[CN213209231U 一种无人值守称重装置](https://patents.google.com/patent/CN213209231U/zh) · L89、L124
- 部署层级：patent-disclosure-not-deployment；地磅称重实施例与清理推板设计；明确司机、门卫参与，非承运场站商用证明。；当前任务：地磅专利局部称量和磅单；门卫、司机及真假货物核对仍在，不称当前车队商用。；L40，CN213209231U公开日；L40=2021-05-14公开日，2020申请不是部署日。
- 残留/未替代范围：司机进出磅，门卫或自助发卡，门卫核单；称谓无人值守不等于无人。；地磅专利局部称量和磅单；门卫、司机及真假货物核对仍在，不称当前车队商用。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：地磅专利局部称量和磅单；门卫、司机及真假货物核对仍在，不称当前车队商用。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：同车装卸前后称重且去除无关载荷变化；地磅专利局部称量和磅单；门卫、司机及真假货物核对仍在，不称当前车队商用。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-road-truck-003、CN-TP-SEARCH-cn-trans-road-truck-003-scoped；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：同车装卸前后称重且去除无关载荷变化；地磅专利局部称量和磅单；门卫、司机及真假货物核对仍在，不称当前车队商用。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；一次前后称重得到一份载重记录，可保留；不与004同次称量双计。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：地磅专利局部称量和磅单；门卫、司机及真假货物核对仍在，不称当前车队商用。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；一次前后称重得到一份载重记录，可保留；不与004同次称量双计。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-road-truck-004 · 核对货物载重与尺寸是否符合装载要求

已保留局部机制；完整任务替代尚未证实。 称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。

- 执行边界：只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 输入：已装货物
- 输出：装载检查记录
- 验收：以已确认的重量及货物装载尺寸对照核定载质量与适用装载要求，并记录合规核对结果；原始测量过程另核。
- 定义与粒度：重量部分与003重叠；建议将显示范围收窄为核对载重与尺寸是否合规，重量输入引用003，尺寸测量另候选待补。
- 适用条件：车型限值、外伸物、称重状态和实际车道共同核验
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理195/正文188，4-02-02-02 道路货运汽车驾驶员，任务2（仅重量记录）；角色：职业原文仅覆盖部分动作；truck任务2仅重量；未直接覆盖货物外廓测量。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第26条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。
- 外部验收输入：前后过磅载重记录；来源任务：cn-trans-road-truck-003；仅引用同次称重结果，不重新计一次过磅劳动。
- 外部验收输入：货物实际装载尺寸及适用许可/限值；来源任务：待补；具体尺寸测量尚待补；检测站车辆外廓专利仅相邻。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism；称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。；未证范围：称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。 |
| 专机 | source-described-see-binding-role；adjacent-mechanism；称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。；未证范围：称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。；未证范围：称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。；未证范围：称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism、adjacent-mechanism；称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。；未证范围：称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。 |

- CN-TP-CLAIM-TRUCK-SCALE · partial-mechanism：称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。；[CN213209231U 一种无人值守称重装置](https://patents.google.com/patent/CN213209231U/zh) · L89、L124
- CN-TP-CLAIM-VEHICLE-SIZE · adjacent-mechanism：称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。；[CN206177238U 车辆外廓尺寸检测仪](https://patents.google.com/patent/CN206177238U/zh) · L87、L100—104、L138—141
- 部署层级：patent-disclosure-not-deployment；地磅称重实施例与清理推板设计；明确司机、门卫参与，非承运场站商用证明。；当前任务：称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。；L40，CN213209231U公开日；L40=2021-05-14公开日，2020申请不是部署日。
- 部署层级：patent-disclosure-not-deployment；车辆检测站激光外廓设计；载货货物外伸识别及道路货站应用均待确认。；当前任务：称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。；L34，CN206177238U公开日；L34公开2017-05-17；2016-08-23为申请日。
- 残留/未替代范围：司机进出磅，门卫或自助发卡，门卫核单；称谓无人值守不等于无人。；称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：引车员驾驶；载货外伸与实际许可参数对照待核。；称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：车型限值、外伸物、称重状态和实际车道共同核验；称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-road-truck-004、CN-TP-SEARCH-cn-trans-road-truck-004-scoped；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：车型限值、外伸物、称重状态和实际车道共同核验；称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；重量部分与003重叠；建议将显示范围收窄为核对载重与尺寸是否合规，重量输入引用003，尺寸测量另候选待补。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：称重专利只重量；检测站车辆外廓专利仅相邻，不能等于货物外伸或超限许可对照。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；重量部分与003重叠；建议将显示范围收窄为核对载重与尺寸是否合规，重量输入引用003，尺寸测量另候选待补。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R03']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-road-truck-005 · 检查货物固定及防脱落覆盖

本轮仅保留相邻机制或上下文；不视为本任务匹配部署。 货移报警只距离变化，正确保留相邻；不证明固定强度或覆盖检查。

- 执行边界：只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 输入：已装货物与捆固覆盖
- 输出：固定确认
- 验收：运输中脱落扬撒风险受控
- 定义与粒度：可拟议一次固定/覆盖验收，但需绑固方式和装卸责任SOP。
- 适用条件：货物外形与探头位置能形成可解释的距离变化
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理195/正文188，4-02-02-02 道路货运汽车驾驶员，任务1（驾驶运输上下文）；角色：职业场景上下文；truck任务1是驾驶运输，不直接列检查绑扎和覆盖；改职业场景上下文。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第32条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；货移报警只距离变化，正确保留相邻；不证明固定强度或覆盖检查。；未证范围：货移报警只距离变化，正确保留相邻；不证明固定强度或覆盖检查。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；货移报警只距离变化，正确保留相邻；不证明固定强度或覆盖检查。；未证范围：货移报警只距离变化，正确保留相邻；不证明固定强度或覆盖检查。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；货移报警只距离变化，正确保留相邻；不证明固定强度或覆盖检查。；未证范围：货移报警只距离变化，正确保留相邻；不证明固定强度或覆盖检查。 |
| 辅助工具 | source-described-see-binding-role；adjacent-mechanism；货移报警只距离变化，正确保留相邻；不证明固定强度或覆盖检查。；未证范围：货移报警只距离变化，正确保留相邻；不证明固定强度或覆盖检查。 |
| 数字流程 | source-described-see-binding-role；adjacent-mechanism；货移报警只距离变化，正确保留相邻；不证明固定强度或覆盖检查。；未证范围：货移报警只距离变化，正确保留相邻；不证明固定强度或覆盖检查。 |

- CN-TP-CLAIM-LOAD-SHIFT · adjacent-mechanism：货移报警只距离变化，正确保留相邻；不证明固定强度或覆盖检查。；[CN208013426U 运输途中货物装载加固状态实时监测装置](https://patents.google.com/patent/CN208013426U/zh) · L85—91、L118—129、L167
- 部署层级：patent-disclosure-not-deployment；超声位移监测设计含公路扩展；实验背景含铁路，不当公路持续运行证明。；当前任务：货移报警只距离变化，正确保留相邻；不证明固定强度或覆盖检查。；L39公开日；L40另列2018-04-17申请日；L39—40公开2018-10-26，申请2018-04-17另列。
- 残留/未替代范围：人员安装探头、设阈值并处理移位；未检验所有绑带张力与覆盖状态。；货移报警只距离变化，正确保留相邻；不证明固定强度或覆盖检查。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：货移报警只距离变化，正确保留相邻；不证明固定强度或覆盖检查。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：货物外形与探头位置能形成可解释的距离变化；货移报警只距离变化，正确保留相邻；不证明固定强度或覆盖检查。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-road-truck-005、CN-TP-SEARCH-cn-trans-road-truck-005-scoped；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：货物外形与探头位置能形成可解释的距离变化；货移报警只距离变化，正确保留相邻；不证明固定强度或覆盖检查。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；可拟议一次固定/覆盖验收，但需绑固方式和装卸责任SOP。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：货移报警只距离变化，正确保留相邻；不证明固定强度或覆盖检查。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；可拟议一次固定/覆盖验收，但需绑固方式和装卸责任SOP。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R01']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-road-truck-006 · 驾驶货车运输至约定目的地

已保留局部机制；完整任务替代尚未证实。 京津塘2024道路测试为局部驾驶证据，主驾安全员；当时商业试运行计划不是2026商业在运。

- 执行边界：只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 输入：合格装载车辆
- 输出：到达车辆
- 验收：货物和目的地对应且行车符合要求
- 定义与粒度：运输路线是验收单元；路线、车货及安全员范围先限定。
- 适用条件：限定测试道路、车辆、速度和安全员安排
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理195/正文188，4-02-02-02 道路货运汽车驾驶员，任务1；角色：职业原文直接列出动作（限所引文字）；truck任务1直接驾驶至目的地。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第22—34条；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；京津塘2024道路测试为局部驾驶证据，主驾安全员；当时商业试运行计划不是2026商业在运。；未证范围：京津塘2024道路测试为局部驾驶证据，主驾安全员；当时商业试运行计划不是2026商业在运。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；京津塘2024道路测试为局部驾驶证据，主驾安全员；当时商业试运行计划不是2026商业在运。；未证范围：京津塘2024道路测试为局部驾驶证据，主驾安全员；当时商业试运行计划不是2026商业在运。 |
| 机器人 | source-described-see-binding-role；partial-mechanism；京津塘2024道路测试为局部驾驶证据，主驾安全员；当时商业试运行计划不是2026商业在运。；未证范围：京津塘2024道路测试为局部驾驶证据，主驾安全员；当时商业试运行计划不是2026商业在运。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；京津塘2024道路测试为局部驾驶证据，主驾安全员；当时商业试运行计划不是2026商业在运。；未证范围：京津塘2024道路测试为局部驾驶证据，主驾安全员；当时商业试运行计划不是2026商业在运。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；京津塘2024道路测试为局部驾驶证据，主驾安全员；当时商业试运行计划不是2026商业在运。；未证范围：京津塘2024道路测试为局部驾驶证据，主驾安全员；当时商业试运行计划不是2026商业在运。 |

- CN-TP-CLAIM-ROAD-TEST · partial-mechanism：京津塘2024道路测试为局部驾驶证据，主驾安全员；当时商业试运行计划不是2026商业在运。；[全国首个跨省市高速公路自动驾驶货运测试在京津塘高速正式启动](https://www.cmhighway.com/xwzx/qyxw/content/1991755486905913346_1991755500805836802.html) · L82—89
- 部署层级：operator-road-test-self-report；限定京津塘测试路段，主驾安全员；后续商业试运行是当时计划。；当前任务：京津塘2024道路测试为局部驾驶证据，主驾安全员；当时商业试运行计划不是2026商业在运。；L82；L89为2024-01-22启动沟通会及后续道路测试叙述；L82为2024-01-29报道，L89叙述1月22日启动，商业试运行为随后探索计划。
- 残留/未替代范围：安全员与试验保障仍在，商业化探索不能等同取消驾驶成本。；京津塘2024道路测试为局部驾驶证据，主驾安全员；当时商业试运行计划不是2026商业在运。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：京津塘2024道路测试为局部驾驶证据，主驾安全员；当时商业试运行计划不是2026商业在运。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：限定测试道路、车辆、速度和安全员安排；京津塘2024道路测试为局部驾驶证据，主驾安全员；当时商业试运行计划不是2026商业在运。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-road-truck-006、CN-TP-SEARCH-cn-trans-road-truck-006-scoped；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：限定测试道路、车辆、速度和安全员安排；京津塘2024道路测试为局部驾驶证据，主驾安全员；当时商业试运行计划不是2026商业在运。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；运输路线是验收单元；路线、车货及安全员范围先限定。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：京津塘2024道路测试为局部驾驶证据，主驾安全员；当时商业试运行计划不是2026商业在运。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；运输路线是验收单元；路线、车货及安全员范围先限定。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-road-truck-007 · 途中检查车辆和货物装载状态

已保留局部机制；完整任务替代尚未证实。 轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。

- 执行边界：只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 输入：运行车辆及货物
- 输出：途中检查记录
- 验收：故障或货物位移等异常可识别
- 定义与粒度：车辆状态检查与货物位移检查有不同对象和异常记录，建议2子候选；0新增计数。
- 适用条件：传感器读数须与本车本货、报警规则和途中环境一致
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理195/正文188，4-02-02-02 道路货运汽车驾驶员，任务3（仅车辆检查）；角色：职业原文仅覆盖部分动作；truck任务3直接检查车辆，不直接列货物沿途状态；货物部分属研究拟议。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第26条、第32条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。
- 拟议子项（不新增、不继承查询或成功）：检查在途车辆状态并记录；检查在途货物位移或装载状态并记录

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。；未证范围：轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。；未证范围：轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。；未证范围：轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。 |
| 辅助工具 | source-described-see-binding-role；partial-mechanism、partial-mechanism；轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。；未证范围：轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism、partial-mechanism；轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。；未证范围：轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。 |

- CN-TP-CLAIM-TPMS · partial-mechanism：轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。；[商用车胎压与胎温监测系统方案](https://www.saftire.com/) · L96—121
- CN-TP-CLAIM-LOAD-SHIFT · partial-mechanism：轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。；[CN208013426U 运输途中货物装载加固状态实时监测装置](https://patents.google.com/patent/CN208013426U/zh) · L85—91、L118—129、L167
- 部署层级：vendor-product-description；轮胎数据显示和挂车连接仅限所列胎压胎温监测方案；UDS 诊断位于卡车前装胎压（胎温）监测小节，不推整车诊断；无可审计承运车队清单。；当前任务：轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。；L96—121，尤其117—120（所读产品正文未确认日期）；产品无日期，留null；没有车队清单。
- 部署层级：patent-disclosure-not-deployment；超声位移监测设计含公路扩展；实验背景含铁路，不当公路持续运行证明。；当前任务：轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。；L39公开日；L40另列2018-04-17申请日；L39—40公开2018-10-26，申请2018-04-17另列。
- 残留/未替代范围：人员安装探头、设阈值并处理移位；未检验所有绑带张力与覆盖状态。；轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：传感器读数须与本车本货、报警规则和途中环境一致；轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-road-truck-007、CN-TP-SEARCH-cn-trans-road-truck-007-scoped；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：传感器读数须与本车本货、报警规则和途中环境一致；轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；车辆状态检查与货物位移检查有不同对象和异常记录，建议2子候选；0新增计数。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：轮胎辅助与货移专利各覆盖一个子范围；不得把两项拼成整车整货持续核验。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；车辆状态检查与货物位移检查有不同对象和异常记录，建议2子候选；0新增计数。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E03', 'R04']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-road-truck-008 · 停车报告并处置途中故障事故

本轮没有保留匹配机制；不据此判断技术不可行。 未保留全链机制；没有匹配不等于所有报警、报告工具不存在。

- 执行边界：只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 输入：故障或事故
- 输出：应急处置记录
- 验收：人货车按应急方案处置
- 定义与粒度：可分现场安全保护、报告、按预案实体处置3个待定义子输出；需现场预案后确认。
- 适用条件：事故类型、现场条件及承运应急责任逐项确定
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理195/正文188，4-02-02-02 道路货运汽车驾驶员，任务4（报告和突发事件处置，细项未列）；角色：职业原文仅覆盖部分动作；truck任务4直接报告故障事故和处理突发事件，但没有每种处置动作SOP。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第33—34条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。
- 拟议子项（不新增、不继承查询或成功）：按预案停车并实施现场安全保护；报告故障或事故并形成可追溯通报；按获准预案实施具体实体应急处置（场景待补）

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；未保留全链机制；没有匹配不等于所有报警、报告工具不存在。；未证范围：未保留全链机制；没有匹配不等于所有报警、报告工具不存在。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；未保留全链机制；没有匹配不等于所有报警、报告工具不存在。；未证范围：未保留全链机制；没有匹配不等于所有报警、报告工具不存在。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；未保留全链机制；没有匹配不等于所有报警、报告工具不存在。；未证范围：未保留全链机制；没有匹配不等于所有报警、报告工具不存在。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；未保留全链机制；没有匹配不等于所有报警、报告工具不存在。；未证范围：未保留全链机制；没有匹配不等于所有报警、报告工具不存在。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；未保留全链机制；没有匹配不等于所有报警、报告工具不存在。；未证范围：未保留全链机制；没有匹配不等于所有报警、报告工具不存在。 |

- 残留/未替代范围：未保留全链机制；没有匹配不等于所有报警、报告工具不存在。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：事故类型、现场条件及承运应急责任逐项确定；未保留全链机制；没有匹配不等于所有报警、报告工具不存在。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-road-truck-008、CN-TP-SEARCH-cn-trans-road-truck-008-scoped；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：事故类型、现场条件及承运应急责任逐项确定；未保留全链机制；没有匹配不等于所有报警、报告工具不存在。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；可分现场安全保护、报告、按预案实体处置3个待定义子输出；需现场预案后确认。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：未保留全链机制；没有匹配不等于所有报警、报告工具不存在。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；可分现场安全保护、报告、按预案实体处置3个待定义子输出；需现场预案后确认。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R04']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-road-truck-009 · 向收货方移交货物及运单

已保留局部机制；完整任务替代尚未证实。 扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。

- 执行边界：只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 输入：到达货物与运单
- 输出：签收或差异记录
- 验收：收货人数量外观与运单可核对
- 定义与粒度：实物与单证一致的交接输出可保留；具体责任未认证。
- 适用条件：物品码号和真实交付时点可绑定
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理195/正文188，4-02-02-02 道路货运汽车驾驶员，任务1；角色：职业场景上下文；驾驶员任务1仅运输上下文；理货员任务9列交接动作，但承运人现场实际执行者尚待核。本任务保留拟议定义。
- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理201/正文194，4-02-06-02 理货员，任务9（交接动作；承运人实际执行尚待核）；角色：职业原文仅覆盖部分动作；驾驶员任务1仅运输上下文；理货员任务9列交接动作，但承运人现场实际执行者尚待核。本任务保留拟议定义。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第31条（电子运单鼓励，不是实物签收程序）；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。；未证范围：扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。；未证范围：扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。；未证范围：扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。 |
| 辅助工具 | source-described-see-binding-role；partial-mechanism；扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。；未证范围：扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism、partial-mechanism；扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。；未证范围：扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。 |

- CN-TP-CLAIM-SCAN-RECEIVE · partial-mechanism：扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。；[物流业条形码读码器应用案例](https://www.keyence.com.cn/ss/products/auto_id/handheld-terminals/example/logistics.jsp) · L60—85、L105、L116
- CN-TP-CLAIM-SCAN-DELIVERY · partial-mechanism：扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。；[物流业条形码读码器应用案例](https://www.keyence.com.cn/ss/products/auto_id/handheld-terminals/example/logistics.jsp) · L122、L126
- 部署层级：vendor-product-description；条码与物流数据采集功能；中国站不证明国内具名实际部署。；当前任务：扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。；L60—85、92—94、99、105、111、116、122、126（所读产品正文未确认日期）；正文没有可确认发布日期，留null；中国产品页不证明国内用户。
- 残留/未替代范围：操作者持机扫描；实物损傷与无标识物仍需另核。；扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：原文仅说明司机在按计划完成签收后扫描发货单；身份查验与用户授权程序未给出，属于待核边界。；扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：物品码号和真实交付时点可绑定；扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-road-truck-009、CN-TP-SEARCH-cn-trans-road-truck-009-scoped；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：物品码号和真实交付时点可绑定；扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；实物与单证一致的交接输出可保留；具体责任未认证。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：扫码上传仅交接信息；EPOD原文是签收后扫描，不证明先身份核查。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；实物与单证一致的交接输出可保留；具体责任未认证。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E01', 'R01']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-road-truck-010 · 调整不符合要求的货物装载

已保留局部机制；完整任务替代尚未证实。 人控托盘车支持相容载荷位移；装载规划、受力及重新固定无直接证据。

- 执行边界：只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 输入：不合格装载
- 输出：重新检查装载
- 验收：达到装载要求后再发车
- 定义与粒度：一次重新摆放可单验；若还包括重新绑固则需另限定。
- 适用条件：仅兼容托盘与车厢空间，散装异形货另核
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理195/正文188，4-02-02-02 道路货运汽车驾驶员，任务2（称重，不是调整装载）；角色：职业场景上下文；truck任务2是称重，不是调整配载；保留proposed。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第40条、第46条（站场经营者要求，承运人自营装卸仅条件引用）；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism；人控托盘车支持相容载荷位移；装载规划、受力及重新固定无直接证据。；未证范围：人控托盘车支持相容载荷位移；装载规划、受力及重新固定无直接证据。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；人控托盘车支持相容载荷位移；装载规划、受力及重新固定无直接证据。；未证范围：人控托盘车支持相容载荷位移；装载规划、受力及重新固定无直接证据。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；人控托盘车支持相容载荷位移；装载规划、受力及重新固定无直接证据。；未证范围：人控托盘车支持相容载荷位移；装载规划、受力及重新固定无直接证据。 |
| 辅助工具 | source-described-see-binding-role；partial-mechanism；人控托盘车支持相容载荷位移；装载规划、受力及重新固定无直接证据。；未证范围：人控托盘车支持相容载荷位移；装载规划、受力及重新固定无直接证据。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；人控托盘车支持相容载荷位移；装载规划、受力及重新固定无直接证据。；未证范围：人控托盘车支持相容载荷位移；装载规划、受力及重新固定无直接证据。 |

- CN-TP-CLAIM-PALLET-MOVE · partial-mechanism：人控托盘车支持相容载荷位移；装载规划、受力及重新固定无直接证据。；[WJ系列紧凑型托盘搬运车](https://www.crown.com/zh-cn/forklifts/pallet-trucks/compact-pallet-truck-wj.html) · L24、L41—55、L94—101、L160—168
- 部署层级：vendor-product-description；电动步行式托盘升降搬运；需要操作员，国内用户部署未提供。；当前任务：人控托盘车支持相容载荷位移；装载规划、受力及重新固定无直接证据。；L24、41—55、94—101、160—168（所读产品正文未确认日期）；产品页未确认日期，留null；中文站非国内具名用户。
- 残留/未替代范围：操作者控制车和托盘位置，货物配载与绑扎不在功能证明内。；人控托盘车支持相容载荷位移；装载规划、受力及重新固定无直接证据。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：人控托盘车支持相容载荷位移；装载规划、受力及重新固定无直接证据。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：仅兼容托盘与车厢空间，散装异形货另核；人控托盘车支持相容载荷位移；装载规划、受力及重新固定无直接证据。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-road-truck-010、CN-TP-SEARCH-cn-trans-road-truck-010-scoped；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：仅兼容托盘与车厢空间，散装异形货另核；人控托盘车支持相容载荷位移；装载规划、受力及重新固定无直接证据。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；一次重新摆放可单验；若还包括重新绑固则需另限定。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：人控托盘车支持相容载荷位移；装载规划、受力及重新固定无直接证据。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；一次重新摆放可单验；若还包括重新绑固则需另限定。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R01']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-road-truck-011 · 执行车辆日常检查保养

本轮仅保留相邻机制或上下文；不视为本任务匹配部署。 TPMS读数/诊断仅相邻，不完成润滑、换件或全部日常维护。

- 执行边界：只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 输入：车辆
- 输出：维护记录
- 验收：保养项目按车辆规定完成
- 定义与粒度：当前是维护任务族；不得声称覆盖全部保养，待按可核算项目补清单。
- 适用条件：按具体车型维护项目确认诊断与保养区别
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理195/正文188，4-02-02-02 道路货运汽车驾驶员，任务3（维护任务族）；角色：职业原文直接列出动作（限所引文字）；truck任务3直接维护车辆，但不列具体保养工序。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第6条（车辆技术条件）；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；TPMS读数/诊断仅相邻，不完成润滑、换件或全部日常维护。；未证范围：TPMS读数/诊断仅相邻，不完成润滑、换件或全部日常维护。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；TPMS读数/诊断仅相邻，不完成润滑、换件或全部日常维护。；未证范围：TPMS读数/诊断仅相邻，不完成润滑、换件或全部日常维护。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；TPMS读数/诊断仅相邻，不完成润滑、换件或全部日常维护。；未证范围：TPMS读数/诊断仅相邻，不完成润滑、换件或全部日常维护。 |
| 辅助工具 | source-described-see-binding-role；adjacent-mechanism；TPMS读数/诊断仅相邻，不完成润滑、换件或全部日常维护。；未证范围：TPMS读数/诊断仅相邻，不完成润滑、换件或全部日常维护。 |
| 数字流程 | source-described-see-binding-role；adjacent-mechanism；TPMS读数/诊断仅相邻，不完成润滑、换件或全部日常维护。；未证范围：TPMS读数/诊断仅相邻，不完成润滑、换件或全部日常维护。 |

- CN-TP-CLAIM-TPMS · adjacent-mechanism：TPMS读数/诊断仅相邻，不完成润滑、换件或全部日常维护。；[商用车胎压与胎温监测系统方案](https://www.saftire.com/) · L96—121
- 部署层级：vendor-product-description；轮胎数据显示和挂车连接仅限所列胎压胎温监测方案；UDS 诊断位于卡车前装胎压（胎温）监测小节，不推整车诊断；无可审计承运车队清单。；当前任务：TPMS读数/诊断仅相邻，不完成润滑、换件或全部日常维护。；L96—121，尤其117—120（所读产品正文未确认日期）；产品无日期，留null；没有车队清单。
- 残留/未替代范围：TPMS读数/诊断仅相邻，不完成润滑、换件或全部日常维护。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：按具体车型维护项目确认诊断与保养区别；TPMS读数/诊断仅相邻，不完成润滑、换件或全部日常维护。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计道路普货承运人实际执行的驾驶与自营检查交接；检测站检验、专业维修、独立装卸另按执行者登记，同次装卸与货站任务不得重复核算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-road-truck-011、CN-TP-SEARCH-cn-trans-road-truck-011-scoped；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：按具体车型维护项目确认诊断与保养区别；TPMS读数/诊断仅相邻，不完成润滑、换件或全部日常维护。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；当前是维护任务族；不得声称覆盖全部保养，待按可核算项目补清单。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：TPMS读数/诊断仅相邻，不完成润滑、换件或全部日常维护。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；当前是维护任务族；不得声称覆盖全部保养，待按可核算项目补清单。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E03', 'R05']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-freight-terminal-001 · 核对进站货物及交接单

已保留局部机制；完整任务替代尚未证实。 条码采集只码号记录；货损、无标签和漏件未证自动核完。

- 执行边界：代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 输入：到站货物与单据
- 输出：接货记录
- 验收：品类数量目的地对应
- 定义与粒度：以一份实物接收记录验收可保留，不将每次扫描另算独立接货。
- 适用条件：来货、单据、码号的关联可靠
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理199—200/正文192—193，4-02-05-01 装卸搬运工，任务2（数量去向记录）；角色：职业原文仅覆盖部分动作；loader 199—200/192—193任务2数量去向、tally201/194任务1与9核对交接直接支持。
- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理201/正文194，4-02-06-02 理货员，任务1、9（核对与交接）；角色：职业原文直接列出动作（限所引文字）；loader 199—200/192—193任务2数量去向、tally201/194任务1与9核对交接直接支持。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第38条、第48条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；条码采集只码号记录；货损、无标签和漏件未证自动核完。；未证范围：条码采集只码号记录；货损、无标签和漏件未证自动核完。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；条码采集只码号记录；货损、无标签和漏件未证自动核完。；未证范围：条码采集只码号记录；货损、无标签和漏件未证自动核完。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；条码采集只码号记录；货损、无标签和漏件未证自动核完。；未证范围：条码采集只码号记录；货损、无标签和漏件未证自动核完。 |
| 辅助工具 | source-described-see-binding-role；partial-mechanism；条码采集只码号记录；货损、无标签和漏件未证自动核完。；未证范围：条码采集只码号记录；货损、无标签和漏件未证自动核完。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；条码采集只码号记录；货损、无标签和漏件未证自动核完。；未证范围：条码采集只码号记录；货损、无标签和漏件未证自动核完。 |

- CN-TP-CLAIM-SCAN-RECEIVE · partial-mechanism：条码采集只码号记录；货损、无标签和漏件未证自动核完。；[物流业条形码读码器应用案例](https://www.keyence.com.cn/ss/products/auto_id/handheld-terminals/example/logistics.jsp) · L60—85、L105、L116
- 部署层级：vendor-product-description；条码与物流数据采集功能；中国站不证明国内具名实际部署。；当前任务：条码采集只码号记录；货损、无标签和漏件未证自动核完。；L60—85、92—94、99、105、111、116、122、126（所读产品正文未确认日期）；正文没有可确认发布日期，留null；中国产品页不证明国内用户。
- 残留/未替代范围：操作者持机扫描；实物损傷与无标识物仍需另核。；条码采集只码号记录；货损、无标签和漏件未证自动核完。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：条码采集只码号记录；货损、无标签和漏件未证自动核完。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：来货、单据、码号的关联可靠；条码采集只码号记录；货损、无标签和漏件未证自动核完。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-freight-terminal-001；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：来货、单据、码号的关联可靠；条码采集只码号记录；货损、无标签和漏件未证自动核完。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；以一份实物接收记录验收可保留，不将每次扫描另算独立接货。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：条码采集只码号记录；货损、无标签和漏件未证自动核完。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；以一份实物接收记录验收可保留，不将每次扫描另算独立接货。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-freight-terminal-002 · 卸下到站货物

已保留局部机制；完整任务替代尚未证实。 纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。

- 执行边界：代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 输入：车辆及货物
- 输出：待理货货物
- 验收：按货物要求轻卸且无新增损伤
- 定义与粒度：卸至确定接料区域可单验；纸箱/托盘与异形对象分条件而非重复计数。
- 适用条件：箱型、码垛、车厢高度及承载与设备相容
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理199—200/正文192—193，4-02-05-01 装卸搬运工，任务1；角色：职业原文直接列出动作（限所引文字）；loader任务1直接卸载搬运。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第40条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism、partial-mechanism；纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。；未证范围：纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。；未证范围：纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。 |
| 机器人 | source-described-see-binding-role；partial-mechanism；纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。；未证范围：纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。 |
| 辅助工具 | source-described-see-binding-role；partial-mechanism；纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。；未证范围：纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。；未证范围：纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。 |

- CN-TP-CLAIM-BOX-ROBOT · partial-mechanism：纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。；[机器人全自动装卸车解决方案](https://www.xyzrobotics.com.cn/publicity/robotic-loading-unloading-with-rocky-bing) · L47—52、L64
- CN-TP-CLAIM-PALLET-MOVE · partial-mechanism：纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。；[WJ系列紧凑型托盘搬运车](https://www.crown.com/zh-cn/forklifts/pallet-trucks/compact-pallet-truck-wj.html) · L24、L41—55、L94—101、L160—168
- 部署层级：vendor-product-description；纸箱机器人装卸方案；页面日本和美国图片案例均不作为中国部署。；当前任务：纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。；L47—52、64（所读产品正文未确认日期）；正文未见日期；页面日本/美国案例图不作中国部署。
- 部署层级：vendor-product-description；电动步行式托盘升降搬运；需要操作员，国内用户部署未提供。；当前任务：纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。；L24、41—55、94—101、160—168（所读产品正文未确认日期）；产品页未确认日期，留null；中文站非国内具名用户。
- 残留/未替代范围：系统上料、车辆对接、异常箱与空托盘人工量未披露。；纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：操作者控制车和托盘位置，货物配载与绑扎不在功能证明内。；纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：箱型、码垛、车厢高度及承载与设备相容；纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-freight-terminal-002；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：箱型、码垛、车厢高度及承载与设备相容；纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；卸至确定接料区域可单验；纸箱/托盘与异形对象分条件而非重复计数。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：纸箱机械臂和人控托盘车局部；海外案例图不当中国部署。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；卸至确定接料区域可单验；纸箱/托盘与异形对象分条件而非重复计数。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-freight-terminal-003 · 检查货物包装及外观损伤

本轮没有保留匹配机制；不据此判断技术不可行。 未保留本轮匹配检测机制，留缺口。

- 执行边界：代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 输入：到站货物
- 输出：损伤记录
- 验收：异常件定位并与交接记录对应
- 定义与粒度：货损检测输出可单验，接受阈值需现场SOP。
- 适用条件：运输损伤类别、隐蔽面、责任交接与成像条件
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理199—200/正文192—193，4-02-05-01 装卸搬运工，任务2（数量去向）；角色：职业场景上下文；loader任务2仅数量去向；tally任务3包装、7残损支持实际查验范围。
- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理201/正文194，4-02-06-02 理货员，任务3、7（包装及残损）；角色：职业原文仅覆盖部分动作；loader任务2仅数量去向；tally任务3包装、7残损支持实际查验范围。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第38条、第40条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；未保留本轮匹配检测机制，留缺口。；未证范围：未保留本轮匹配检测机制，留缺口。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；未保留本轮匹配检测机制，留缺口。；未证范围：未保留本轮匹配检测机制，留缺口。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；未保留本轮匹配检测机制，留缺口。；未证范围：未保留本轮匹配检测机制，留缺口。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；未保留本轮匹配检测机制，留缺口。；未证范围：未保留本轮匹配检测机制，留缺口。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；未保留本轮匹配检测机制，留缺口。；未证范围：未保留本轮匹配检测机制，留缺口。 |

- 残留/未替代范围：未保留本轮匹配检测机制，留缺口。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：运输损伤类别、隐蔽面、责任交接与成像条件；未保留本轮匹配检测机制，留缺口。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-freight-terminal-003；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：运输损伤类别、隐蔽面、责任交接与成像条件；未保留本轮匹配检测机制，留缺口。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；货损检测输出可单验，接受阈值需现场SOP。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：未保留本轮匹配检测机制，留缺口。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；货损检测输出可单验，接受阈值需现场SOP。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R01']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-freight-terminal-004 · 按性质和保管条件分类暂存货物

已保留局部机制；完整任务替代尚未证实。 托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。

- 执行边界：代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 输入：到站货物
- 输出：分区暂存货物
- 验收：不相容货物分隔且货物完好
- 定义与粒度：按类别到指定暂存位可单验；类别判定与搬运分工待核。
- 适用条件：危害性质和保管条件先完成业务判定
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理199—200/正文192—193，4-02-05-01 装卸搬运工，任务1（移动/堆垛）；角色：职业原文仅覆盖部分动作；loader任务1搬运堆垛支持移动，分类规则更直接可引tally任务6。
- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理201/正文194，4-02-06-02 理货员，任务6（按运输方式、流向、收货地点分类；性质/保管条件另由规定§38支持）；角色：职业场景上下文；loader任务1搬运堆垛支持移动，分类规则更直接可引tally任务6。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第38条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism；托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。；未证范围：托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。；未证范围：托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。；未证范围：托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。 |
| 辅助工具 | source-described-see-binding-role；adjacent-mechanism、partial-mechanism；托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。；未证范围：托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。 |
| 数字流程 | source-described-see-binding-role；adjacent-mechanism；托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。；未证范围：托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。 |

- CN-TP-CLAIM-SCAN-RECEIVE · adjacent-mechanism：托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。；[物流业条形码读码器应用案例](https://www.keyence.com.cn/ss/products/auto_id/handheld-terminals/example/logistics.jsp) · L60—85、L105、L116
- CN-TP-CLAIM-PALLET-MOVE · partial-mechanism：托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。；[WJ系列紧凑型托盘搬运车](https://www.crown.com/zh-cn/forklifts/pallet-trucks/compact-pallet-truck-wj.html) · L24、L41—55、L94—101、L160—168
- 部署层级：vendor-product-description；条码与物流数据采集功能；中国站不证明国内具名实际部署。；当前任务：托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。；L60—85、92—94、99、105、111、116、122、126（所读产品正文未确认日期）；正文没有可确认发布日期，留null；中国产品页不证明国内用户。
- 部署层级：vendor-product-description；电动步行式托盘升降搬运；需要操作员，国内用户部署未提供。；当前任务：托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。；L24、41—55、94—101、160—168（所读产品正文未确认日期）；产品页未确认日期，留null；中文站非国内具名用户。
- 残留/未替代范围：操作者持机扫描；实物损傷与无标识物仍需另核。；托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：操作者控制车和托盘位置，货物配载与绑扎不在功能证明内。；托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：危害性质和保管条件先完成业务判定；托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-freight-terminal-004；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：危害性质和保管条件先完成业务判定；托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；按类别到指定暂存位可单验；类别判定与搬运分工待核。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：托盘移动为局部机制；扫码分类为相邻机制。相容性判断、性质/保管条件分区及环境控制尚未获匹配证据。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；按类别到指定暂存位可单验；类别判定与搬运分工待核。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E06']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-freight-terminal-005 · 搬运货物至出站装车区

已保留局部机制；完整任务替代尚未证实。 托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。

- 执行边界：代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 输入：配载货物
- 输出：装车区货物
- 验收：去向和装车批次一致
- 定义与粒度：运至出站暂存位独立输出；装车同物料下一阶段不双计搬运段。
- 适用条件：通道与交接面适配且批次已确定
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理199—200/正文192—193，4-02-05-01 装卸搬运工，任务1；角色：职业原文直接列出动作（限所引文字）；loader任务1直接场内移动；不证明调度决策。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第40条、第45条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism、partial-mechanism；托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。；未证范围：托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。；未证范围：托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。 |
| 机器人 | source-described-see-binding-role；partial-mechanism；托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。；未证范围：托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。 |
| 辅助工具 | source-described-see-binding-role；partial-mechanism；托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。；未证范围：托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。；未证范围：托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。 |

- CN-TP-CLAIM-PALLET-MOVE · partial-mechanism：托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。；[WJ系列紧凑型托盘搬运车](https://www.crown.com/zh-cn/forklifts/pallet-trucks/compact-pallet-truck-wj.html) · L24、L41—55、L94—101、L160—168
- CN-TP-CLAIM-BOX-ROBOT · partial-mechanism：托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。；[机器人全自动装卸车解决方案](https://www.xyzrobotics.com.cn/publicity/robotic-loading-unloading-with-rocky-bing) · L47—52、L64
- 部署层级：vendor-product-description；纸箱机器人装卸方案；页面日本和美国图片案例均不作为中国部署。；当前任务：托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。；L47—52、64（所读产品正文未确认日期）；正文未见日期；页面日本/美国案例图不作中国部署。
- 部署层级：vendor-product-description；电动步行式托盘升降搬运；需要操作员，国内用户部署未提供。；当前任务：托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。；L24、41—55、94—101、160—168（所读产品正文未确认日期）；产品页未确认日期，留null；中文站非国内具名用户。
- 残留/未替代范围：操作者控制车和托盘位置，货物配载与绑扎不在功能证明内。；托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：系统上料、车辆对接、异常箱与空托盘人工量未披露。；托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：通道与交接面适配且批次已确定；托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-freight-terminal-005；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：通道与交接面适配且批次已确定；托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；运至出站暂存位独立输出；装车同物料下一阶段不双计搬运段。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：托盘车和固定纸箱转运可局部适用；自主路线/货类指派未证。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；运至出站暂存位独立输出；装车同物料下一阶段不双计搬运段。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-freight-terminal-006 · 按配载方案装载货物

已保留局部机制；完整任务替代尚未证实。 纸箱/托盘机械局部装载，不证明相容性判断或绑固。

- 执行边界：代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 输入：货物与车辆
- 输出：装载车辆
- 验收：数量去向符合配载且不混装禁配物
- 定义与粒度：装车至指定位置可单验；配载方案作为输入，不兼计方案设计。
- 适用条件：配载方案与物料信息先经确认
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理199—200/正文192—193，4-02-05-01 装卸搬运工，任务1；角色：职业原文直接列出动作（限所引文字）；loader任务1装载直接；freight-station任务3仅组织配载。
- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理195/正文188，4-02-02-04 道路货运业务员，任务3（组织配载，不是实体装载）；角色：职业场景上下文；loader任务1装载直接；freight-station任务3仅组织配载。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第40条、第46条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism、partial-mechanism；纸箱/托盘机械局部装载，不证明相容性判断或绑固。；未证范围：纸箱/托盘机械局部装载，不证明相容性判断或绑固。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；纸箱/托盘机械局部装载，不证明相容性判断或绑固。；未证范围：纸箱/托盘机械局部装载，不证明相容性判断或绑固。 |
| 机器人 | source-described-see-binding-role；partial-mechanism；纸箱/托盘机械局部装载，不证明相容性判断或绑固。；未证范围：纸箱/托盘机械局部装载，不证明相容性判断或绑固。 |
| 辅助工具 | source-described-see-binding-role；partial-mechanism；纸箱/托盘机械局部装载，不证明相容性判断或绑固。；未证范围：纸箱/托盘机械局部装载，不证明相容性判断或绑固。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；纸箱/托盘机械局部装载，不证明相容性判断或绑固。；未证范围：纸箱/托盘机械局部装载，不证明相容性判断或绑固。 |

- CN-TP-CLAIM-BOX-ROBOT · partial-mechanism：纸箱/托盘机械局部装载，不证明相容性判断或绑固。；[机器人全自动装卸车解决方案](https://www.xyzrobotics.com.cn/publicity/robotic-loading-unloading-with-rocky-bing) · L47—52、L64
- CN-TP-CLAIM-PALLET-MOVE · partial-mechanism：纸箱/托盘机械局部装载，不证明相容性判断或绑固。；[WJ系列紧凑型托盘搬运车](https://www.crown.com/zh-cn/forklifts/pallet-trucks/compact-pallet-truck-wj.html) · L24、L41—55、L94—101、L160—168
- 部署层级：vendor-product-description；纸箱机器人装卸方案；页面日本和美国图片案例均不作为中国部署。；当前任务：纸箱/托盘机械局部装载，不证明相容性判断或绑固。；L47—52、64（所读产品正文未确认日期）；正文未见日期；页面日本/美国案例图不作中国部署。
- 部署层级：vendor-product-description；电动步行式托盘升降搬运；需要操作员，国内用户部署未提供。；当前任务：纸箱/托盘机械局部装载，不证明相容性判断或绑固。；L24、41—55、94—101、160—168（所读产品正文未确认日期）；产品页未确认日期，留null；中文站非国内具名用户。
- 残留/未替代范围：系统上料、车辆对接、异常箱与空托盘人工量未披露。；纸箱/托盘机械局部装载，不证明相容性判断或绑固。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：操作者控制车和托盘位置，货物配载与绑扎不在功能证明内。；纸箱/托盘机械局部装载，不证明相容性判断或绑固。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：纸箱/托盘机械局部装载，不证明相容性判断或绑固。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：配载方案与物料信息先经确认；纸箱/托盘机械局部装载，不证明相容性判断或绑固。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-freight-terminal-006；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：配载方案与物料信息先经确认；纸箱/托盘机械局部装载，不证明相容性判断或绑固。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；装车至指定位置可单验；配载方案作为输入，不兼计方案设计。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：纸箱/托盘机械局部装载，不证明相容性判断或绑固。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；装车至指定位置可单验；配载方案作为输入，不兼计方案设计。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-freight-terminal-007 · 修整或加固运输包装

本轮没有保留匹配机制；不据此判断技术不可行。 未匹配；商家电商封袋不能自动移作货站重包装。

- 执行边界：代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 输入：待运货物及包装材料
- 输出：适运包装
- 验收：按物品特性满足运输保护要求
- 定义与粒度：修复包装至可发运状态是一验收单元，具体破损类型待核。
- 适用条件：按货物脆弱性、受力和运输保护要求选材料
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理201/正文194，4-02-06-02 理货员，任务3（改装或加固包装）；角色：职业原文直接列出动作（限所引文字）；理货员任务3直接列改装或加固包装；装卸搬运工不作为该动作的有效直接引用。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第39条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；未匹配；商家电商封袋不能自动移作货站重包装。；未证范围：未匹配；商家电商封袋不能自动移作货站重包装。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；未匹配；商家电商封袋不能自动移作货站重包装。；未证范围：未匹配；商家电商封袋不能自动移作货站重包装。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；未匹配；商家电商封袋不能自动移作货站重包装。；未证范围：未匹配；商家电商封袋不能自动移作货站重包装。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；未匹配；商家电商封袋不能自动移作货站重包装。；未证范围：未匹配；商家电商封袋不能自动移作货站重包装。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；未匹配；商家电商封袋不能自动移作货站重包装。；未证范围：未匹配；商家电商封袋不能自动移作货站重包装。 |

- 残留/未替代范围：未匹配；商家电商封袋不能自动移作货站重包装。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：按货物脆弱性、受力和运输保护要求选材料；未匹配；商家电商封袋不能自动移作货站重包装。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-freight-terminal-007；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：按货物脆弱性、受力和运输保护要求选材料；未匹配；商家电商封袋不能自动移作货站重包装。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；修复包装至可发运状态是一验收单元，具体破损类型待核。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：未匹配；商家电商封袋不能自动移作货站重包装。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；修复包装至可发运状态是一验收单元，具体破损类型待核。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E05']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-freight-terminal-008 · 检查出站车辆与货物装载

已保留局部机制；完整任务替代尚未证实。 称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。

- 执行边界：代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 输入：装载车辆
- 输出：出站检查记录
- 验收：安全检查合格且无超载后放行
- 定义与粒度：放行核验可为单一控制点；车辆安全、货物重量分别留检验记录。
- 适用条件：实际出站货车与称重/尺寸记录绑定
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理195/正文188，4-02-02-04 道路货运业务员，任务6（安全保卫，不是整车检查）；角色：职业场景上下文；道路货运业务员任务6仅安全保卫上下文；理货员只支持重量、包装等货物检查部分，均不支持整车检查。整车出站检查要求单独来自法规第37条。
- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理201/正文194，4-02-06-02 理货员，任务1、3（数量重量及包装，不是整车检查）；角色：职业原文仅覆盖部分动作；道路货运业务员任务6仅安全保卫上下文；理货员只支持重量、包装等货物检查部分，均不支持整车检查。整车出站检查要求单独来自法规第37条。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第37条、第46条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism；称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。；未证范围：称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。 |
| 专机 | source-described-see-binding-role；adjacent-mechanism；称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。；未证范围：称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。；未证范围：称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。；未证范围：称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism、adjacent-mechanism；称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。；未证范围：称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。 |

- CN-TP-CLAIM-TRUCK-SCALE · partial-mechanism：称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。；[CN213209231U 一种无人值守称重装置](https://patents.google.com/patent/CN213209231U/zh) · L89、L124
- CN-TP-CLAIM-VEHICLE-SIZE · adjacent-mechanism：称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。；[CN206177238U 车辆外廓尺寸检测仪](https://patents.google.com/patent/CN206177238U/zh) · L87、L100—104、L138—141
- 部署层级：patent-disclosure-not-deployment；地磅称重实施例与清理推板设计；明确司机、门卫参与，非承运场站商用证明。；当前任务：称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。；L40，CN213209231U公开日；L40=2021-05-14公开日，2020申请不是部署日。
- 部署层级：patent-disclosure-not-deployment；车辆检测站激光外廓设计；载货货物外伸识别及道路货站应用均待确认。；当前任务：称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。；L34，CN206177238U公开日；L34公开2017-05-17；2016-08-23为申请日。
- 残留/未替代范围：司机进出磅，门卫或自助发卡，门卫核单；称谓无人值守不等于无人。；称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：引车员驾驶；载货外伸与实际许可参数对照待核。；称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：实际出站货车与称重/尺寸记录绑定；称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-freight-terminal-008；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：实际出站货车与称重/尺寸记录绑定；称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；放行核验可为单一控制点；车辆安全、货物重量分别留检验记录。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：称重局部；检测站外廓相邻，不能覆盖制动、绑扎、手续等放行条件。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；放行核验可为单一控制点；车辆安全、货物重量分别留检验记录。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E05']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-freight-terminal-009 · 交接装车货物及出站台账

已保留局部机制；完整任务替代尚未证实。 扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。

- 执行边界：代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 输入：车辆货物及记录
- 输出：承运接收信息
- 验收：数量目的地与记录一致
- 定义与粒度：发运交接确认可单验，区别装车动作和计划记录。
- 适用条件：交接时点与批次不可只依计划
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理199—200/正文192—193，4-02-05-01 装卸搬运工，任务2；角色：职业原文仅覆盖部分动作；loader任务2记录与tally任务9交接直接支持。
- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理201/正文194，4-02-06-02 理货员，任务9；角色：职业原文直接列出动作（限所引文字）；loader任务2记录与tally任务9交接直接支持。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第45条、第48条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。；未证范围：扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。；未证范围：扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。；未证范围：扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。 |
| 辅助工具 | source-described-see-binding-role；partial-mechanism；扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。；未证范围：扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism、partial-mechanism；扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。；未证范围：扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。 |

- CN-TP-CLAIM-SCAN-RECEIVE · partial-mechanism：扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。；[物流业条形码读码器应用案例](https://www.keyence.com.cn/ss/products/auto_id/handheld-terminals/example/logistics.jsp) · L60—85、L105、L116
- CN-TP-CLAIM-SCAN-ROUTE · partial-mechanism：扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。；[物流业条形码读码器应用案例](https://www.keyence.com.cn/ss/products/auto_id/handheld-terminals/example/logistics.jsp) · L92—94、L111
- 部署层级：vendor-product-description；条码与物流数据采集功能；中国站不证明国内具名实际部署。；当前任务：扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。；L60—85、92—94、99、105、111、116、122、126（所读产品正文未确认日期）；正文没有可确认发布日期，留null；中国产品页不证明国内用户。
- 残留/未替代范围：操作者持机扫描；实物损傷与无标识物仍需另核。；扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：交接时点与批次不可只依计划；扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-freight-terminal-009；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：交接时点与批次不可只依计划；扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；发运交接确认可单验，区别装车动作和计划记录。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：扫描与路向关联仅局部支持交接信息记录；EPOD不直接支持车内装载方案、绑固或配载确认。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；发运交接确认可单验，区别装车动作和计划记录。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E02']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-freight-terminal-010 · 隔离撒漏破损或不适宜混存货物

本轮没有保留匹配机制；不据此判断技术不可行。 无本动作匹配机制，别用未命中证明危险泄漏难自动化。

- 执行边界：代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 输入：异常货物
- 输出：待处置货物
- 验收：损伤污染风险不扩散
- 定义与粒度：保留proposed，隔离对象、去向和污染种类须先界定。
- 适用条件：泄漏性质和隔离容器、区域及处置资格
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理201/正文194，4-02-06-02 理货员，任务7（残损记录，不是物理隔离）；角色：职业场景上下文；理货员任务7仅货物残损识别及记录，不是物理隔离；本动作的实体隔离程序仍待补。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第38条、第40条、第47条（防混杂撒漏和应急目标，不是隔离SOP）；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；无本动作匹配机制，别用未命中证明危险泄漏难自动化。；未证范围：无本动作匹配机制，别用未命中证明危险泄漏难自动化。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；无本动作匹配机制，别用未命中证明危险泄漏难自动化。；未证范围：无本动作匹配机制，别用未命中证明危险泄漏难自动化。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；无本动作匹配机制，别用未命中证明危险泄漏难自动化。；未证范围：无本动作匹配机制，别用未命中证明危险泄漏难自动化。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；无本动作匹配机制，别用未命中证明危险泄漏难自动化。；未证范围：无本动作匹配机制，别用未命中证明危险泄漏难自动化。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；无本动作匹配机制，别用未命中证明危险泄漏难自动化。；未证范围：无本动作匹配机制，别用未命中证明危险泄漏难自动化。 |

- 残留/未替代范围：无本动作匹配机制，别用未命中证明危险泄漏难自动化。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：泄漏性质和隔离容器、区域及处置资格；无本动作匹配机制，别用未命中证明危险泄漏难自动化。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-freight-terminal-010；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：泄漏性质和隔离容器、区域及处置资格；无本动作匹配机制，别用未命中证明危险泄漏难自动化。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；保留proposed，隔离对象、去向和污染种类须先界定。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：无本动作匹配机制，别用未命中证明危险泄漏难自动化。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；保留proposed，隔离对象、去向和污染种类须先界定。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E05', 'R01']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-freight-terminal-011 · 清理场站散落货物和污染物

本轮仅保留相邻机制或上下文；不视为本任务匹配部署。 仓库扫洗机是相邻推荐；通行、尘土与货站地面相容性未核。

- 执行边界：代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 输入：作业场地
- 输出：清洁场地
- 验收：通道和作业区符合使用要求
- 定义与粒度：清扫收集一般垃圾可验；危险泄漏另场景。
- 适用条件：地面、粒径、液体成分及人车混行须勘测
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理199—200/正文192—193，4-02-05-01 装卸搬运工，任务4；角色：职业原文直接列出动作（限所引文字）；loader任务4直接场地清洁卫生。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第44条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；adjacent-mechanism；仓库扫洗机是相邻推荐；通行、尘土与货站地面相容性未核。；未证范围：仓库扫洗机是相邻推荐；通行、尘土与货站地面相容性未核。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；仓库扫洗机是相邻推荐；通行、尘土与货站地面相容性未核。；未证范围：仓库扫洗机是相邻推荐；通行、尘土与货站地面相容性未核。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；仓库扫洗机是相邻推荐；通行、尘土与货站地面相容性未核。；未证范围：仓库扫洗机是相邻推荐；通行、尘土与货站地面相容性未核。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；仓库扫洗机是相邻推荐；通行、尘土与货站地面相容性未核。；未证范围：仓库扫洗机是相邻推荐；通行、尘土与货站地面相容性未核。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；仓库扫洗机是相邻推荐；通行、尘土与货站地面相容性未核。；未证范围：仓库扫洗机是相邻推荐；通行、尘土与货站地面相容性未核。 |

- CN-TP-CLAIM-FLOOR-CLEAN · adjacent-mechanism：仓库扫洗机是相邻推荐；通行、尘土与货站地面相容性未核。；[全场景清洁解决方案：物流仓库](https://www.yangziqj.com/solution/) · L128—136
- 部署层级：vendor-product-description-adjacent-site；物流仓库洗地、扫地组合；道路货站同类地面适配待核，不推危险泄漏清理。；当前任务：仓库扫洗机是相邻推荐；通行、尘土与货站地面相容性未核。；L128—136（所读产品正文未确认日期）；没有正文发布日期；版权2017—2028非文稿日期，留null。
- 残留/未替代范围：货站材质、通行、垃圾清运和危险泄漏另核。；仓库扫洗机是相邻推荐；通行、尘土与货站地面相容性未核。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：仓库扫洗机是相邻推荐；通行、尘土与货站地面相容性未核。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：地面、粒径、液体成分及人车混行须勘测；仓库扫洗机是相邻推荐；通行、尘土与货站地面相容性未核。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-freight-terminal-011；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：地面、粒径、液体成分及人车混行须勘测；仓库扫洗机是相邻推荐；通行、尘土与货站地面相容性未核。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；清扫收集一般垃圾可验；危险泄漏另场景。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：仓库扫洗机是相邻推荐；通行、尘土与货站地面相容性未核。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；清扫收集一般垃圾可验；危险泄漏另场景。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-freight-terminal-012 · 保养装卸搬运工具和设施

本轮没有保留匹配机制；不据此判断技术不可行。 本轮未匹配；不得把所有机具维修宣称未被自动化。

- 执行边界：代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 输入：机具设施
- 输出：可用机具设施
- 验收：完成要求的检查保养
- 定义与粒度：保留维护任务族，待确定机具和保养项目后展开。
- 适用条件：按实际机具点检清单和修理外包边界
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理199—200/正文192—193，4-02-05-01 装卸搬运工，任务3（保养任务族）；角色：职业原文直接列出动作（限所引文字）；loader任务3直接维护搬运机具设施。
- 定义引用：[道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html) · 第37条（安全条件，非维护SOP）；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；本轮未匹配；不得把所有机具维修宣称未被自动化。；未证范围：本轮未匹配；不得把所有机具维修宣称未被自动化。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；本轮未匹配；不得把所有机具维修宣称未被自动化。；未证范围：本轮未匹配；不得把所有机具维修宣称未被自动化。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；本轮未匹配；不得把所有机具维修宣称未被自动化。；未证范围：本轮未匹配；不得把所有机具维修宣称未被自动化。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；本轮未匹配；不得把所有机具维修宣称未被自动化。；未证范围：本轮未匹配；不得把所有机具维修宣称未被自动化。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；本轮未匹配；不得把所有机具维修宣称未被自动化。；未证范围：本轮未匹配；不得把所有机具维修宣称未被自动化。 |

- 残留/未替代范围：本轮未匹配；不得把所有机具维修宣称未被自动化。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：按实际机具点检清单和修理外包边界；本轮未匹配；不得把所有机具维修宣称未被自动化。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码54货运站自营活动；通用独立仓储不是本场景。托盘车、码号系统案例来自其他经营主体时只迁移机制，不迁移其劳动量。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-freight-terminal-012；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：按实际机具点检清单和修理外包边界；本轮未匹配；不得把所有机具维修宣称未被自动化。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；保留维护任务族，待确定机具和保养项目后展开。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：本轮未匹配；不得把所有机具维修宣称未被自动化。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；保留维护任务族，待确定机具和保养项目后展开。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R05']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-collection-001 · 确认寄递地址和收件服务范围

已保留局部机制；完整任务替代尚未证实。 京东地址诊断仅文本提示，不查本承运人服务地域。

- 执行边界：收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 输入：寄件请求
- 输出：收寄条件确认
- 验收：地址及服务范围信息可核对
- 定义与粒度：地址文本与服务地区核查输出可合为收寄可达性判断；两个证据边界分别列。
- 适用条件：企业路由字典、区域变化与用户确认
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务1、6（揽收及客户需求）；角色：职业场景上下文；courier204/197任务1/6仅收寄和客户需求；服务范围核对非该职责明列动作。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第22条、第24条；第26条第6项仅地址记录；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；京东地址诊断仅文本提示，不查本承运人服务地域。；未证范围：京东地址诊断仅文本提示，不查本承运人服务地域。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；京东地址诊断仅文本提示，不查本承运人服务地域。；未证范围：京东地址诊断仅文本提示，不查本承运人服务地域。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；京东地址诊断仅文本提示，不查本承运人服务地域。；未证范围：京东地址诊断仅文本提示，不查本承运人服务地域。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；京东地址诊断仅文本提示，不查本承运人服务地域。；未证范围：京东地址诊断仅文本提示，不查本承运人服务地域。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；京东地址诊断仅文本提示，不查本承运人服务地域。；未证范围：京东地址诊断仅文本提示，不查本承运人服务地域。 |

- CN-TP-CLAIM-ADDRESS-CHECK · partial-mechanism：京东地址诊断仅文本提示，不查本承运人服务地域。；[地址诊断服务](https://lbsapi.jd.com/doc/guide/addressAnalyze/addressVerificationService/) · L107—122、L133—139、L190
- 部署层级：operator-api-documentation；地址文本诊断；最后更新2022-09-09，未证明任意快递企业实际服务范围。；当前任务：京东地址诊断仅文本提示，不查本承运人服务地域。；L190；L190为最后更新2022-09-09，非首发日，publishedAt=null可保留。
- 残留/未替代范围：用户或业务人员确认更正，非自行编造地址。；京东地址诊断仅文本提示，不查本承运人服务地域。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：京东地址诊断仅文本提示，不查本承运人服务地域。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：企业路由字典、区域变化与用户确认；京东地址诊断仅文本提示，不查本承运人服务地域。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-collection-001；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：企业路由字典、区域变化与用户确认；京东地址诊断仅文本提示，不查本承运人服务地域。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；地址文本与服务地区核查输出可合为收寄可达性判断；两个证据边界分别列。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：京东地址诊断仅文本提示，不查本承运人服务地域。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；地址文本与服务地区核查输出可合为收寄可达性判断；两个证据边界分别列。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E07', 'R01']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-collection-002 · 核验寄件人身份

本轮没有保留匹配机制；不据此判断技术不可行。 无匹配身份证明机制，保留缺口。

- 执行边界：收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 输入：证件及寄件信息
- 输出：实名核验记录
- 验收：身份信息满足收寄要求
- 定义与粒度：身份检查记录可单验；勿与内件验视混成一项。
- 适用条件：证件类型、本人一致性、授权与留存要求
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务1（非身份查验细则）；角色：职业场景上下文；courier任务1揽收是职业上下文，不直接写寄件人身份查验。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第3项；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；无匹配身份证明机制，保留缺口。；未证范围：无匹配身份证明机制，保留缺口。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；无匹配身份证明机制，保留缺口。；未证范围：无匹配身份证明机制，保留缺口。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；无匹配身份证明机制，保留缺口。；未证范围：无匹配身份证明机制，保留缺口。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；无匹配身份证明机制，保留缺口。；未证范围：无匹配身份证明机制，保留缺口。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；无匹配身份证明机制，保留缺口。；未证范围：无匹配身份证明机制，保留缺口。 |

- 残留/未替代范围：无匹配身份证明机制，保留缺口。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：证件类型、本人一致性、授权与留存要求；无匹配身份证明机制，保留缺口。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-collection-002；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：证件类型、本人一致性、授权与留存要求；无匹配身份证明机制，保留缺口。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；身份检查记录可单验；勿与内件验视混成一项。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：无匹配身份证明机制，保留缺口。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；身份检查记录可单验；勿与内件验视混成一项。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R01']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-collection-003 · 验视交寄物品并登记品名

本轮没有保留匹配机制；不据此判断技术不可行。 未保留匹配，不推X光或其他手段可完整替代开验。

- 执行边界：收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 输入：非信件交寄物品
- 输出：验视结果
- 验收：内件与申报一致且可寄递
- 定义与粒度：内件验视结果可单验，物品种类与信息登记标准待核。
- 适用条件：不得以扫码或包装影像代替内件与准入核验
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务1（验视）；角色：职业原文直接列出动作（限所引文字）；courier任务1明确验视。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第4项（信件例外）；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；未保留匹配，不推X光或其他手段可完整替代开验。；未证范围：未保留匹配，不推X光或其他手段可完整替代开验。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；未保留匹配，不推X光或其他手段可完整替代开验。；未证范围：未保留匹配，不推X光或其他手段可完整替代开验。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；未保留匹配，不推X光或其他手段可完整替代开验。；未证范围：未保留匹配，不推X光或其他手段可完整替代开验。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；未保留匹配，不推X光或其他手段可完整替代开验。；未证范围：未保留匹配，不推X光或其他手段可完整替代开验。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；未保留匹配，不推X光或其他手段可完整替代开验。；未证范围：未保留匹配，不推X光或其他手段可完整替代开验。 |

- 残留/未替代范围：未保留匹配，不推X光或其他手段可完整替代开验。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：不得以扫码或包装影像代替内件与准入核验；未保留匹配，不推X光或其他手段可完整替代开验。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-collection-003；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：不得以扫码或包装影像代替内件与准入核验；未保留匹配，不推X光或其他手段可完整替代开验。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；内件验视结果可单验，物品种类与信息登记标准待核。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：未保留匹配，不推X光或其他手段可完整替代开验。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；内件验视结果可单验，物品种类与信息登记标准待核。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-collection-004 · 拒收不符合验视或禁限寄要求物品

本轮没有保留匹配机制；不据此判断技术不可行。 未保留匹配；不能把法规拒收要求当自动判定技术。

- 执行边界：收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 输入：不符合条件物品
- 输出：拒收处置记录
- 验收：不合规物品未进入寄递链路
- 定义与粒度：根据既有查验结果作拒收输出，可保留，具体异常类型不可无限扩展。
- 适用条件：拒收证据、用户交还和疑似危险物处置
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务1（验视，不是拒收决策）；角色：职业场景上下文；courier任务1验视不是拒收决策本身，职业只相邻。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第3、4项；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；未保留匹配；不能把法规拒收要求当自动判定技术。；未证范围：未保留匹配；不能把法规拒收要求当自动判定技术。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；未保留匹配；不能把法规拒收要求当自动判定技术。；未证范围：未保留匹配；不能把法规拒收要求当自动判定技术。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；未保留匹配；不能把法规拒收要求当自动判定技术。；未证范围：未保留匹配；不能把法规拒收要求当自动判定技术。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；未保留匹配；不能把法规拒收要求当自动判定技术。；未证范围：未保留匹配；不能把法规拒收要求当自动判定技术。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；未保留匹配；不能把法规拒收要求当自动判定技术。；未证范围：未保留匹配；不能把法规拒收要求当自动判定技术。 |

- 残留/未替代范围：未保留匹配；不能把法规拒收要求当自动判定技术。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：拒收证据、用户交还和疑似危险物处置；未保留匹配；不能把法规拒收要求当自动判定技术。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-collection-004；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：拒收证据、用户交还和疑似危险物处置；未保留匹配；不能把法规拒收要求当自动判定技术。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；根据既有查验结果作拒收输出，可保留，具体异常类型不可无限扩展。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：未保留匹配；不能把法规拒收要求当自动判定技术。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；根据既有查验结果作拒收输出，可保留，具体异常类型不可无限扩展。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R01']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-collection-005 · 选择适用包装并封装快件

本轮仅保留相邻机制或上下文；不视为本任务匹配部署。 电商人投料封袋机仅相邻主体和物料；未证快递网点部署。

- 执行边界：收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 输入：可收物品与包装
- 输出：封装快件
- 验收：内件得到适当保护且避免过度包装
- 定义与粒度：封装包裹一个验收对象，材料选择可作为同一操作条件，不因双动词自动拆。
- 适用条件：执行者由商家改为收寄企业时另核责任与封装工况
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务1（封装；选材细则未列）；角色：职业原文仅覆盖部分动作；courier任务1封装直接支持；材料选择细则未明列。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第15—17条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；电商人投料封袋机仅相邻主体和物料；未证快递网点部署。；未证范围：电商人投料封袋机仅相邻主体和物料；未证快递网点部署。 |
| 专机 | source-described-see-binding-role；adjacent-mechanism；电商人投料封袋机仅相邻主体和物料；未证快递网点部署。；未证范围：电商人投料封袋机仅相邻主体和物料；未证快递网点部署。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；电商人投料封袋机仅相邻主体和物料；未证快递网点部署。；未证范围：电商人投料封袋机仅相邻主体和物料；未证快递网点部署。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；电商人投料封袋机仅相邻主体和物料；未证快递网点部署。；未证范围：电商人投料封袋机仅相邻主体和物料；未证快递网点部署。 |
| 数字流程 | source-described-see-binding-role；adjacent-mechanism；电商人投料封袋机仅相邻主体和物料；未证快递网点部署。；未证范围：电商人投料封袋机仅相邻主体和物料；未证快递网点部署。 |

- CN-TP-CLAIM-PACK-BAG-ADJACENT · adjacent-mechanism：电商人投料封袋机仅相邻主体和物料；未证快递网点部署。；[什么是快递打包机？怎样操作？](https://www.hprt.com.cn/News/2361.html) · L74、L84—113、L123—134
- 部署层级：vendor-product-description-adjacent-performer；电商商家包装机步骤；只作收寄封袋工序可迁移机制，不能将商家劳动计入邮政。；当前任务：电商人投料封袋机仅相邻主体和物料；未证快递网点部署。；L74；L74=2024-07-08发布；销售产品说明。
- 残留/未替代范围：操作人员装耗材、调参数、投物；商家执行者不能直接计入快递。；电商人投料封袋机仅相邻主体和物料；未证快递网点部署。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：电商人投料封袋机仅相邻主体和物料；未证快递网点部署。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：执行者由商家改为收寄企业时另核责任与封装工况；电商人投料封袋机仅相邻主体和物料；未证快递网点部署。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-collection-005；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：执行者由商家改为收寄企业时另核责任与封装工况；电商人投料封袋机仅相邻主体和物料；未证快递网点部署。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；封装包裹一个验收对象，材料选择可作为同一操作条件，不因双动词自动拆。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：电商人投料封袋机仅相邻主体和物料；未证快递网点部署。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；封装包裹一个验收对象，材料选择可作为同一操作条件，不因双动词自动拆。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-collection-006 · 称量封装快件并核对运单重量

已保留局部机制；完整任务替代尚未证实。 DWS电子称重读码局部，不能用额定通量推工资节省。

- 执行边界：收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 输入：快件与秤
- 输出：重量信息
- 验收：运单如实反映快件重量
- 定义与粒度：重量关联一包一码可验，法定计量检定另缺。
- 适用条件：秤量范围、包形、运行速度与有效校准
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务1（称重）；角色：职业原文直接列出动作（限所引文字）；courier任务1称重直接。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第5项；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；DWS电子称重读码局部，不能用额定通量推工资节省。；未证范围：DWS电子称重读码局部，不能用额定通量推工资节省。 |
| 专机 | source-described-see-binding-role；partial-mechanism；DWS电子称重读码局部，不能用额定通量推工资节省。；未证范围：DWS电子称重读码局部，不能用额定通量推工资节省。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；DWS电子称重读码局部，不能用额定通量推工资节省。；未证范围：DWS电子称重读码局部，不能用额定通量推工资节省。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；DWS电子称重读码局部，不能用额定通量推工资节省。；未证范围：DWS电子称重读码局部，不能用额定通量推工资节省。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；DWS电子称重读码局部，不能用额定通量推工资节省。；未证范围：DWS电子称重读码局部，不能用额定通量推工资节省。 |

- CN-TP-CLAIM-DWS · partial-mechanism：DWS电子称重读码局部，不能用额定通量推工资节省。；[称重读码设备](https://www.cpte.com/product-detail/35) · L93—95、L140
- 部署层级：vendor-product-description；视觉与电子称重取得码号、重量和体积信息；无具名用户。；当前任务：DWS电子称重读码局部，不能用额定通量推工资节省。；L93—95、140（所读产品正文未确认日期）；产品页未见可靠日期，留null；无具名运行用户。
- 残留/未替代范围：DWS电子称重读码局部，不能用额定通量推工资节省。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：秤量范围、包形、运行速度与有效校准；DWS电子称重读码局部，不能用额定通量推工资节省。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-collection-006；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：秤量范围、包形、运行速度与有效校准；DWS电子称重读码局部，不能用额定通量推工资节省。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；重量关联一包一码可验，法定计量检定另缺。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：DWS电子称重读码局部，不能用额定通量推工资节省。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；重量关联一包一码可验，法定计量检定另缺。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-collection-007 · 生成并附着快递运单

已保留局部机制；完整任务替代尚未证实。 打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。

- 执行边界：收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 输入：寄件信息及快件
- 输出：带运单快件
- 验收：码号与地址内件信息关联
- 定义与粒度：生成贴附同一运单可为一验收单元；信息源核验单列条件。
- 适用条件：数据接口、面单格式、表面和贴附位置
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务1（未直接列打印贴附）；角色：职业场景上下文；courier任务1不直接列打印贴附，原proposed保留；不可凭方案存在升级职业直接支持。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第25条、第26条第5、6项；第35—36条为单据和信息管理；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。；未证范围：打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。 |
| 专机 | source-described-see-binding-role；partial-mechanism、adjacent-mechanism；打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。；未证范围：打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。；未证范围：打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。；未证范围：打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。 |
| 数字流程 | source-described-see-binding-role；adjacent-mechanism；打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。；未证范围：打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。 |

- CN-TP-CLAIM-LABEL · partial-mechanism：打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。；[自动打印贴标机的工作原理是什么？](https://www.videojet.com.cn/cn/homepage/resources/faqs/general/lpa-principle.html) · L120—131
- CN-TP-CLAIM-PACK-BAG-ADJACENT · adjacent-mechanism：打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。；[什么是快递打包机？怎样操作？](https://www.hprt.com.cn/News/2361.html) · L74、L84—113、L123—134
- 部署层级：vendor-product-description；打印及贴附功能；不证明收寄信息真实或快递企业已安装。；当前任务：打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。；L120—131（所读产品正文未确认日期）；产品说明未见可确认日期，留null。
- 部署层级：vendor-product-description-adjacent-performer；电商商家包装机步骤；只作收寄封袋工序可迁移机制，不能将商家劳动计入邮政。；当前任务：打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。；L74；L74=2024-07-08发布；销售产品说明。
- 残留/未替代范围：标签补充、贴标位置调整及排障待计。；打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：操作人员装耗材、调参数、投物；商家执行者不能直接计入快递。；打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：数据接口、面单格式、表面和贴附位置；打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-collection-007；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：数据接口、面单格式、表面和贴附位置；打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；生成贴附同一运单可为一验收单元；信息源核验单列条件。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：打印滚贴/吹贴/压贴产品为局部机制，不证明寄件数据真实或本网点已采用。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；生成贴附同一运单可为一验收单元；信息源核验单列条件。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R01']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-collection-008 · 向处理网点交接收寄快件

已保留局部机制；完整任务替代尚未证实。 揽收扫描仅记录，人工持机和搬移不被消除。

- 执行边界：收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 输入：揽收快件与清单
- 输出：网点接收快件
- 验收：数量码号和异常与清单一致
- 定义与粒度：移交实体和对应记录同一交接控制点可保留。
- 适用条件：交接码与揽收清单一致且扫描时点真实
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务2（快件交接）；角色：职业原文直接列出动作（限所引文字）；courier任务2直接快件交接。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第7、10项；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；揽收扫描仅记录，人工持机和搬移不被消除。；未证范围：揽收扫描仅记录，人工持机和搬移不被消除。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；揽收扫描仅记录，人工持机和搬移不被消除。；未证范围：揽收扫描仅记录，人工持机和搬移不被消除。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；揽收扫描仅记录，人工持机和搬移不被消除。；未证范围：揽收扫描仅记录，人工持机和搬移不被消除。 |
| 辅助工具 | source-described-see-binding-role；partial-mechanism、partial-mechanism；揽收扫描仅记录，人工持机和搬移不被消除。；未证范围：揽收扫描仅记录，人工持机和搬移不被消除。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism、partial-mechanism；揽收扫描仅记录，人工持机和搬移不被消除。；未证范围：揽收扫描仅记录，人工持机和搬移不被消除。 |

- CN-TP-CLAIM-SCAN-PICKUP · partial-mechanism：揽收扫描仅记录，人工持机和搬移不被消除。；[物流业条形码读码器应用案例](https://www.keyence.com.cn/ss/products/auto_id/handheld-terminals/example/logistics.jsp) · L99、L105
- CN-TP-CLAIM-SCAN-RECEIVE · partial-mechanism：揽收扫描仅记录，人工持机和搬移不被消除。；[物流业条形码读码器应用案例](https://www.keyence.com.cn/ss/products/auto_id/handheld-terminals/example/logistics.jsp) · L60—85、L105、L116
- 部署层级：vendor-product-description；条码与物流数据采集功能；中国站不证明国内具名实际部署。；当前任务：揽收扫描仅记录，人工持机和搬移不被消除。；L60—85、92—94、99、105、111、116、122、126（所读产品正文未确认日期）；正文没有可确认发布日期，留null；中国产品页不证明国内用户。
- 残留/未替代范围：司机采集、装卸与贴附未被此功能消除。；揽收扫描仅记录，人工持机和搬移不被消除。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：操作者持机扫描；实物损傷与无标识物仍需另核。；揽收扫描仅记录，人工持机和搬移不被消除。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：揽收扫描仅记录，人工持机和搬移不被消除。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：交接码与揽收清单一致且扫描时点真实；揽收扫描仅记录，人工持机和搬移不被消除。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-collection-008；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：交接码与揽收清单一致且扫描时点真实；揽收扫描仅记录，人工持机和搬移不被消除。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；移交实体和对应记录同一交接控制点可保留。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：揽收扫描仅记录，人工持机和搬移不被消除。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；移交实体和对应记录同一交接控制点可保留。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-collection-009 · 纠正获确认的收寄信息差错

本轮仅保留相邻机制或上下文；不视为本任务匹配部署。 地址诊断相邻，只返回提示，不自行确认或改变原业务数据。

- 执行边界：收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 输入：错误地址或重量信息
- 输出：更正记录
- 验收：保留变更依据且不虚构轨迹
- 定义与粒度：已核实信息的更正及审计记录可拟议；原值保护和授权SOP缺。
- 适用条件：原始错误、授权来源和更正时间可追溯
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务1、8（未直接列字段更正）；角色：职业场景上下文；courier任务1/8收寄投诉只是上下文，未直接列更正收寄字段；原proposed保留。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第6、10项（真实信息，不是授权更正程序）；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；地址诊断相邻，只返回提示，不自行确认或改变原业务数据。；未证范围：地址诊断相邻，只返回提示，不自行确认或改变原业务数据。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；地址诊断相邻，只返回提示，不自行确认或改变原业务数据。；未证范围：地址诊断相邻，只返回提示，不自行确认或改变原业务数据。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；地址诊断相邻，只返回提示，不自行确认或改变原业务数据。；未证范围：地址诊断相邻，只返回提示，不自行确认或改变原业务数据。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；地址诊断相邻，只返回提示，不自行确认或改变原业务数据。；未证范围：地址诊断相邻，只返回提示，不自行确认或改变原业务数据。 |
| 数字流程 | source-described-see-binding-role；adjacent-mechanism；地址诊断相邻，只返回提示，不自行确认或改变原业务数据。；未证范围：地址诊断相邻，只返回提示，不自行确认或改变原业务数据。 |

- CN-TP-CLAIM-ADDRESS-CHECK · adjacent-mechanism：地址诊断相邻，只返回提示，不自行确认或改变原业务数据。；[地址诊断服务](https://lbsapi.jd.com/doc/guide/addressAnalyze/addressVerificationService/) · L107—122、L133—139、L190
- 部署层级：operator-api-documentation；地址文本诊断；最后更新2022-09-09，未证明任意快递企业实际服务范围。；当前任务：地址诊断相邻，只返回提示，不自行确认或改变原业务数据。；L190；L190为最后更新2022-09-09，非首发日，publishedAt=null可保留。
- 残留/未替代范围：用户或业务人员确认更正，非自行编造地址。；地址诊断相邻，只返回提示，不自行确认或改变原业务数据。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：地址诊断相邻，只返回提示，不自行确认或改变原业务数据。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：原始错误、授权来源和更正时间可追溯；地址诊断相邻，只返回提示，不自行确认或改变原业务数据。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-collection-009；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：原始错误、授权来源和更正时间可追溯；地址诊断相邻，只返回提示，不自行确认或改变原业务数据。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；已核实信息的更正及审计记录可拟议；原值保护和授权SOP缺。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：地址诊断相邻，只返回提示，不自行确认或改变原业务数据。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；已核实信息的更正及审计记录可拟议；原值保护和授权SOP缺。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R01']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-collection-010 · 回收可复用快递包装

本轮没有保留匹配机制；不据此判断技术不可行。 未保留匹配回收方案，不表述不可行。

- 执行边界：收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 输入：用户交回包装
- 输出：回收包装物
- 验收：按材料状态分类并避免信息泄露
- 定义与粒度：回收容器的移交记录可拟议；清洁、隐私去除与再投用另补。
- 适用条件：回收对象是消费端包装，不能用中心空袋回收代替
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务1（未明列包装回收）；角色：职业场景上下文；快递员职责未单列包装回收，仅保留职业场景上下文；回收要求另由流程法规限定。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第17条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；未保留匹配回收方案，不表述不可行。；未证范围：未保留匹配回收方案，不表述不可行。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；未保留匹配回收方案，不表述不可行。；未证范围：未保留匹配回收方案，不表述不可行。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；未保留匹配回收方案，不表述不可行。；未证范围：未保留匹配回收方案，不表述不可行。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；未保留匹配回收方案，不表述不可行。；未证范围：未保留匹配回收方案，不表述不可行。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；未保留匹配回收方案，不表述不可行。；未证范围：未保留匹配回收方案，不表述不可行。 |

- 残留/未替代范围：未保留匹配回收方案，不表述不可行。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：回收对象是消费端包装，不能用中心空袋回收代替；未保留匹配回收方案，不表述不可行。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；收寄由邮政/快递企业执行归60；商家生产包装、仓配备货按其实际主业及合同确定，电商封装机仅作相邻工序路线。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-collection-010；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：回收对象是消费端包装，不能用中心空袋回收代替；未保留匹配回收方案，不表述不可行。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；回收容器的移交记录可拟议；清洁、隐私去除与再投用另补。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：未保留匹配回收方案，不表述不可行。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；回收容器的移交记录可拟议；清洁、隐私去除与再投用另补。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R01']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-sort-001 · 核对接收快件总包与路单

已保留局部机制；完整任务替代尚未证实。 条码扫描局部，不保证实包完整或袋内件数。

- 执行边界：只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 输入：到站总包和路单
- 输出：接收记录
- 验收：总包码号数量与路单对应
- 定义与粒度：总包接收核对为单一输出，可保留。
- 适用条件：总包码号与路单、处理节点一致
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204—205/正文197—198，4-02-07-09 快件处理员，任务1（接收验视核对）；角色：职业原文直接列出动作（限所引文字）；express-sort204/197任务1直接接收验视核对。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第7、8、10项；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；条码扫描局部，不保证实包完整或袋内件数。；未证范围：条码扫描局部，不保证实包完整或袋内件数。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；条码扫描局部，不保证实包完整或袋内件数。；未证范围：条码扫描局部，不保证实包完整或袋内件数。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；条码扫描局部，不保证实包完整或袋内件数。；未证范围：条码扫描局部，不保证实包完整或袋内件数。 |
| 辅助工具 | source-described-see-binding-role；partial-mechanism；条码扫描局部，不保证实包完整或袋内件数。；未证范围：条码扫描局部，不保证实包完整或袋内件数。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；条码扫描局部，不保证实包完整或袋内件数。；未证范围：条码扫描局部，不保证实包完整或袋内件数。 |

- CN-TP-CLAIM-SCAN-RECEIVE · partial-mechanism：条码扫描局部，不保证实包完整或袋内件数。；[物流业条形码读码器应用案例](https://www.keyence.com.cn/ss/products/auto_id/handheld-terminals/example/logistics.jsp) · L60—85、L105、L116
- 部署层级：vendor-product-description；条码与物流数据采集功能；中国站不证明国内具名实际部署。；当前任务：条码扫描局部，不保证实包完整或袋内件数。；L60—85、92—94、99、105、111、116、122、126（所读产品正文未确认日期）；正文没有可确认发布日期，留null；中国产品页不证明国内用户。
- 残留/未替代范围：操作者持机扫描；实物损傷与无标识物仍需另核。；条码扫描局部，不保证实包完整或袋内件数。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：条码扫描局部，不保证实包完整或袋内件数。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：总包码号与路单、处理节点一致；条码扫描局部，不保证实包完整或袋内件数。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-sort-001；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：总包码号与路单、处理节点一致；条码扫描局部，不保证实包完整或袋内件数。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；总包接收核对为单一输出，可保留。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：条码扫描局部，不保证实包完整或袋内件数。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；总包接收核对为单一输出，可保留。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-sort-002 · 卸载快件或总包

已保留局部机制；完整任务替代尚未证实。 纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。

- 执行边界：只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 输入：车辆及总包
- 输出：卸货区快件
- 验收：货物未因野蛮装卸受损
- 定义与粒度：将车内货卸至约定接料面可独立验收。
- 适用条件：柔性袋、纸箱和异形件分别做卸车测试
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204—205/正文197—198，4-02-07-09 快件处理员，任务1（卸载）；角色：职业原文直接列出动作（限所引文字）；express-sort任务1直接卸载。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第8项；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism、partial-mechanism；纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。；未证范围：纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。；未证范围：纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。 |
| 机器人 | source-described-see-binding-role；partial-mechanism；纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。；未证范围：纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。 |
| 辅助工具 | source-described-see-binding-role；partial-mechanism；纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。；未证范围：纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。；未证范围：纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。 |

- CN-TP-CLAIM-BOX-ROBOT · partial-mechanism：纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。；[机器人全自动装卸车解决方案](https://www.xyzrobotics.com.cn/publicity/robotic-loading-unloading-with-rocky-bing) · L47—52、L64
- CN-TP-CLAIM-BAG-BASELINE · partial-mechanism：纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。；[“作业神器”让邮政“双11”服务更赞](https://www.chinapost.com.cn/cn/report/1911/9337-1.htm) · L37、L46、L55—56
- 部署层级：vendor-product-description；纸箱机器人装卸方案；页面日本和美国图片案例均不作为中国部署。；当前任务：纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。；L47—52、64（所读产品正文未确认日期）；正文未见日期；页面日本/美国案例图不作中国部署。
- 部署层级：operator-historical-deployment-self-report；不同城市案例分别识别；只取邮袋辅助与输送、人工扎袋及场地改造条件。；当前任务：纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。；L37；L37=2019-11-18，历史双11多个地点案例不能合成一个站。
- 残留/未替代范围：系统上料、车辆对接、异常箱与空托盘人工量未披露。；纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：分流后扎袋和人工移动仍出现，不能将全程不落地视为无人。；纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：柔性袋、纸箱和异形件分别做卸车测试；纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-sort-002；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：柔性袋、纸箱和异形件分别做卸车测试；纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；将车内货卸至约定接料面可独立验收。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：纸箱机器人与历史袋件输送两对象分别限定；国内码头案例不混入快递。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；将车内货卸至约定接料面可独立验收。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-sort-003 · 开拆总包并复核内装快件

已保留局部机制；完整任务替代尚未证实。 专利抓袋切开倒出只开拆，人工收空袋；不覆盖内件复核。

- 执行边界：只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 输入：总包与清单
- 输出：散件及核对记录
- 验收：件数重量规格差异被记录
- 定义与粒度：开拆输出散件，复核输出差异记录；建议2子候选，0新增。
- 适用条件：袋形、封口和抓持/刀口安全范围
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204—205/正文197—198，4-02-07-09 快件处理员，任务1（开拆与复核数量重量规格）；角色：职业原文直接列出动作（限所引文字）；express-sort任务1分别开拆与复核数量重量规格。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第7、8项；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。
- 拟议子项（不新增、不继承查询或成功）：开拆快件总包并输出散件；复核袋内快件数量重量规格并记录差异

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；专利抓袋切开倒出只开拆，人工收空袋；不覆盖内件复核。；未证范围：专利抓袋切开倒出只开拆，人工收空袋；不覆盖内件复核。 |
| 专机 | source-described-see-binding-role；partial-mechanism；专利抓袋切开倒出只开拆，人工收空袋；不覆盖内件复核。；未证范围：专利抓袋切开倒出只开拆，人工收空袋；不覆盖内件复核。 |
| 机器人 | source-described-see-binding-role；partial-mechanism；专利抓袋切开倒出只开拆，人工收空袋；不覆盖内件复核。；未证范围：专利抓袋切开倒出只开拆，人工收空袋；不覆盖内件复核。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；专利抓袋切开倒出只开拆，人工收空袋；不覆盖内件复核。；未证范围：专利抓袋切开倒出只开拆，人工收空袋；不覆盖内件复核。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；专利抓袋切开倒出只开拆，人工收空袋；不覆盖内件复核。；未证范围：专利抓袋切开倒出只开拆，人工收空袋；不覆盖内件复核。 |

- CN-TP-CLAIM-BAG-OPEN · partial-mechanism：专利抓袋切开倒出只开拆，人工收空袋；不覆盖内件复核。；[CN111559551A 快递流转包自动拆包方法和装置](https://patents.google.com/patent/CN111559551A/zh) · L180—206
- 部署层级：patent-disclosure-not-deployment；视觉抓袋、切口、倒包专利；描述人工回收袋子，无独立商用验证。；当前任务：专利抓袋切开倒出只开拆，人工收空袋；不覆盖内件复核。；L37；CN111559551A公开时间线；L37/公开时间线2020-08-21为CN111559551A公开日，不是装机日。
- 残留/未替代范围：实施例安排人工回收空袋；件数重量复核并未由拆袋机械证明。；专利抓袋切开倒出只开拆，人工收空袋；不覆盖内件复核。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：专利抓袋切开倒出只开拆，人工收空袋；不覆盖内件复核。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：袋形、封口和抓持/刀口安全范围；专利抓袋切开倒出只开拆，人工收空袋；不覆盖内件复核。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-sort-003；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：袋形、封口和抓持/刀口安全范围；专利抓袋切开倒出只开拆，人工收空袋；不覆盖内件复核。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；开拆输出散件，复核输出差异记录；建议2子候选，0新增。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：专利抓袋切开倒出只开拆，人工收空袋；不覆盖内件复核。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；开拆输出散件，复核输出差异记录；建议2子候选，0新增。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R04']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-sort-004 · 识读并检查快件名址信息

已保留局部机制；完整任务替代尚未证实。 DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。

- 执行边界：只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 输入：散件及运单
- 输出：路向判定
- 验收：路向与快件地址信息一致
- 定义与粒度：路向识读/核对可保留；条码关联不是逐字地址验证。
- 适用条件：无读、重码、覆标和条码对应地址的处理
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204—205/正文197—198，4-02-07-09 快件处理员，任务2（名址）；角色：职业原文直接列出动作（限所引文字）；express-sort任务2直接检查名址。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第7项；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。；未证范围：DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。 |
| 专机 | source-described-see-binding-role；partial-mechanism、partial-mechanism；DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。；未证范围：DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。；未证范围：DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。 |
| 辅助工具 | source-described-see-binding-role；partial-mechanism；DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。；未证范围：DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism、partial-mechanism；DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。；未证范围：DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。 |

- CN-TP-CLAIM-DWS · partial-mechanism：DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。；[称重读码设备](https://www.cpte.com/product-detail/35) · L93—95、L140
- CN-TP-CLAIM-BAG-HALFAUTO · partial-mechanism：DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。；[东莞邮政创新提升物流仓配集包效率](https://www.chinapost.com.cn/cn/report/2404/5675-1.htm) · L37—42
- 部署层级：operator-running-self-report；东莞自研半自动集包，保留人工装袋；按场地和业务量选型。；当前任务：DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。；L35；L35为2024-04-10，历史运营者报道。
- 部署层级：vendor-product-description；视觉与电子称重取得码号、重量和体积信息；无具名用户。；当前任务：DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。；L93—95、140（所读产品正文未确认日期）；产品页未见可靠日期，留null；无具名运行用户。
- 残留/未替代范围：人工投件、装袋；封袋和异常工时未披露。；DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：无读、重码、覆标和条码对应地址的处理；DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 采用待验证：
- 反证/未采用：reported-nonadoption-condition；该场地与邮件量不适合大型分拣设备，采用半自动方案。；东莞大型分拣系统的场地/邮件量限制；不能证明独立名址读码器未采用、失败或不适用。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-sort-004；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：无读、重码、覆标和条码对应地址的处理；DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；路向识读/核对可保留；条码关联不是逐字地址验证。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：DWS和粗分扫描局部；大型分拣设备未选用仅系统场地量约束，非独立识读器反证。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；路向识读/核对可保留；条码关联不是逐字地址验证。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E08']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-sort-005 · 按区域和时限分拨快件

已保留局部机制；完整任务替代尚未证实。 东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。

- 执行边界：只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 输入：待分拨快件
- 输出：分流快件
- 验收：快件进入正确区域和服务流
- 定义与粒度：按规则分流一件可验，规则作为输入。
- 适用条件：粗分路线与人工细分格口按业务量配置
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204—205/正文197—198，4-02-07-09 快件处理员，任务2（按区域分拨，时限从法规补）；角色：职业原文仅覆盖部分动作；express-sort任务2按区域分拨直接；时限从法规补。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第7项；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism；东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。；未证范围：东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。 |
| 专机 | source-described-see-binding-role；partial-mechanism；东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。；未证范围：东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。；未证范围：东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。 |
| 辅助工具 | source-described-see-binding-role；partial-mechanism、partial-mechanism；东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。；未证范围：东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。；未证范围：东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。 |

- CN-TP-CLAIM-BAG-HALFAUTO · partial-mechanism：东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。；[东莞邮政创新提升物流仓配集包效率](https://www.chinapost.com.cn/cn/report/2404/5675-1.htm) · L37—42
- CN-TP-CLAIM-BAG-BASELINE · partial-mechanism：东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。；[“作业神器”让邮政“双11”服务更赞](https://www.chinapost.com.cn/cn/report/1911/9337-1.htm) · L37、L46、L55—56
- 部署层级：operator-running-self-report；东莞自研半自动集包，保留人工装袋；按场地和业务量选型。；当前任务：东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。；L35；L35为2024-04-10，历史运营者报道。
- 部署层级：operator-historical-deployment-self-report；不同城市案例分别识别；只取邮袋辅助与输送、人工扎袋及场地改造条件。；当前任务：东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。；L37；L37=2019-11-18，历史双11多个地点案例不能合成一个站。
- 残留/未替代范围：人工投件、装袋；封袋和异常工时未披露。；东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：分流后扎袋和人工移动仍出现，不能将全程不落地视为无人。；东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：粗分路线与人工细分格口按业务量配置；东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 采用待验证：
- 采用待验证：
- 反证/未采用：reported-nonadoption-condition；该场地与邮件量不适合大型分拣设备，采用半自动方案。；限该来源所述系统、时期、场地及实际角色，不外推当前失败率。
- 反证/未采用：reported-adoption-condition；深圳大浪旧场地以皮带和手工作业为主，迁址后安装分拣设备。；限该来源所述系统、时期、场地及实际角色，不外推当前失败率。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-sort-005；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：粗分路线与人工细分格口按业务量配置；东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；按规则分流一件可验，规则作为输入。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：东莞粗分和历史分流有局部采用，场地邮件量反证适配该组合系统，不能移算全国。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；按规则分流一件可验，规则作为输入。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-sort-006 · 登记并处置破损油污或名址错误快件

仅有相邻采购要求；不是本动作的匹配机制，也未证已部署。 拟建错分视频回溯仅相邻采购要求，不是破损油污或名址错误的匹配机制。

- 执行边界：只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 输入：问题快件
- 输出：问题件处置记录
- 验收：问题码号与原因处理结果对应
- 定义与粒度：当前问题件任务族；按修复、隔离、名址更正等独立输出补具体流程后再拆，不自动增数。
- 适用条件：问题件种类、证据视频与责任审核分别核验
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204—205/正文197—198，4-02-07-09 快件处理员，任务5（问题件任务族）；角色：职业原文直接列出动作（限所引文字）；express-sort任务5直接问题快件登记处理，具体处置方式未给。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第8、10项；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；拟建错分视频回溯仅相邻采购要求，不是破损油污或名址错误的匹配机制。；未证范围：拟建错分视频回溯仅相邻采购要求，不是破损油污或名址错误的匹配机制。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；拟建错分视频回溯仅相邻采购要求，不是破损油污或名址错误的匹配机制。；未证范围：拟建错分视频回溯仅相邻采购要求，不是破损油污或名址错误的匹配机制。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；拟建错分视频回溯仅相邻采购要求，不是破损油污或名址错误的匹配机制。；未证范围：拟建错分视频回溯仅相邻采购要求，不是破损油污或名址错误的匹配机制。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；拟建错分视频回溯仅相邻采购要求，不是破损油污或名址错误的匹配机制。；未证范围：拟建错分视频回溯仅相邻采购要求，不是破损油污或名址错误的匹配机制。 |
| 数字流程 | adjacent-planned-requirement-only；adjacent-planned-requirement；拟建错分视频回溯仅相邻采购要求，不是破损油污或名址错误的匹配机制。；未证范围：拟建错分视频回溯仅相邻采购要求，不是破损油污或名址错误的匹配机制。 |

- CN-TP-CLAIM-MISROUTE-PLAN · adjacent-planned-requirement：拟建错分视频回溯仅相邻采购要求，不是破损油污或名址错误的匹配机制。；[2026年广东邮政省际中心AI错分监测报警系统建设项目采购需求公开征求意见公告](https://www.chinapost.com.cn/cn/report/2607/6699-1.htm) · L40、L50—63、L97、L132—142
- 部署层级：procurement-requirement-not-deployment；采购征求意见和性能要求；不得推为已部署、实际误报或失败率。；当前任务：拟建错分视频回溯仅相邻采购要求，不是破损油污或名址错误的匹配机制。；L32；采购阶段L40；L32为2026-07-22；L40采购前征求意见。
- 残留/未替代范围：无法匹配的事件要求人工复核，现场取件重分不由报警功能证明。；拟建错分视频回溯仅相邻采购要求，不是破损油污或名址错误的匹配机制。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：拟建错分视频回溯仅相邻采购要求，不是破损油污或名址错误的匹配机制。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：问题件种类、证据视频与责任审核分别核验；拟建错分视频回溯仅相邻采购要求，不是破损油污或名址错误的匹配机制。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-sort-006；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：问题件种类、证据视频与责任审核分别核验；拟建错分视频回溯仅相邻采购要求，不是破损油污或名址错误的匹配机制。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；当前问题件任务族；按修复、隔离、名址更正等独立输出补具体流程后再拆，不自动增数。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：拟建错分视频回溯仅相邻采购要求，不是破损油污或名址错误的匹配机制。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；当前问题件任务族；按修复、隔离、名址更正等独立输出补具体流程后再拆，不自动增数。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E09', 'R05']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-sort-007 · 重新分拨误分快件

本轮仅保留相邻机制或上下文；不视为本任务匹配部署。 正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。

- 执行边界：只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 输入：误分件与核实路向
- 输出：正确分流快件
- 验收：纠正后路向信息一致
- 定义与粒度：重分输出明确，但纠正路向作为已核输入；勿与正常分拨双计循环原件。
- 适用条件：先获核实路向，回流来源与设备入口明确
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204—205/正文197—198，4-02-07-09 快件处理员，任务2、5（未列实体重分闭环）；角色：职业场景上下文；express-sort任务2/5提供分流和异常上下文，未直接写取回、校正、重新投入全闭环。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第7、10项（质量目标，不是实体重分程序）；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。；未证范围：正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。 |
| 专机 | source-described-see-binding-role；adjacent-mechanism；正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。；未证范围：正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。；未证范围：正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。 |
| 辅助工具 | source-described-see-binding-role；adjacent-mechanism；正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。；未证范围：正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。 |
| 数字流程 | source-described-see-binding-role；adjacent-mechanism、adjacent-planned-requirement；正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。；未证范围：正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。 |

- CN-TP-CLAIM-BAG-HALFAUTO · adjacent-mechanism：正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。；[东莞邮政创新提升物流仓配集包效率](https://www.chinapost.com.cn/cn/report/2404/5675-1.htm) · L37—42
- CN-TP-CLAIM-MISROUTE-PLAN · adjacent-planned-requirement：正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。；[2026年广东邮政省际中心AI错分监测报警系统建设项目采购需求公开征求意见公告](https://www.chinapost.com.cn/cn/report/2607/6699-1.htm) · L40、L50—63、L97、L132—142
- 部署层级：procurement-requirement-not-deployment；采购征求意见和性能要求；不得推为已部署、实际误报或失败率。；当前任务：正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。；L32；采购阶段L40；L32为2026-07-22；L40采购前征求意见。
- 部署层级：operator-running-self-report；东莞自研半自动集包，保留人工装袋；按场地和业务量选型。；当前任务：正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。；L35；L35为2024-04-10，历史运营者报道。
- 残留/未替代范围：人工投件、装袋；封袋和异常工时未披露。；正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：无法匹配的事件要求人工复核，现场取件重分不由报警功能证明。；正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：先获核实路向，回流来源与设备入口明确；正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 相邻/上下文来源（非本动作成功）：CN-TP-AUTO-POST-BAG；adjacent-mechanism；正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-sort-007；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：先获核实路向，回流来源与设备入口明确；正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；重分输出明确，但纠正路向作为已核输入；勿与正常分拨双计循环原件。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：正常粗分相邻，错分报警采购要求相邻；无已运行实体返工机制。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；重分输出明确，但纠正路向作为已核输入；勿与正常分拨双计循环原件。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R01', 'E09', 'R07']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-sort-008 · 集包并封发同向快件

已保留局部机制；完整任务替代尚未证实。 人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。

- 执行边界：只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 输入：同向散件与包容器
- 输出：封发总包
- 验收：包内快件与清单一致
- 定义与粒度：集齐入袋与封口分别产生未封袋/封发总包，机制和计量可不同，建议2子候选。
- 适用条件：袋容器、封口方式、满袋与码号关联
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204—205/正文197—198，4-02-07-09 快件处理员，任务2（建立总包，封口细则未列）；角色：职业原文仅覆盖部分动作；express-sort任务2建立总包直接，但封口及清单规则需流程补。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第15—16条；第26条第7、8项；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。
- 拟议子项（不新增、不继承查询或成功）：将同向快件集入总包；封闭并标识待发总包

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism；人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。；未证范围：人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。 |
| 专机 | source-described-see-binding-role；partial-mechanism；人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。；未证范围：人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。；未证范围：人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。 |
| 辅助工具 | source-described-see-binding-role；partial-mechanism、partial-mechanism；人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。；未证范围：人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。；未证范围：人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。 |

- CN-TP-CLAIM-BAG-HALFAUTO · partial-mechanism：人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。；[东莞邮政创新提升物流仓配集包效率](https://www.chinapost.com.cn/cn/report/2404/5675-1.htm) · L37—42
- CN-TP-CLAIM-BAG-BASELINE · partial-mechanism：人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。；[“作业神器”让邮政“双11”服务更赞](https://www.chinapost.com.cn/cn/report/1911/9337-1.htm) · L37、L46、L55—56
- 部署层级：operator-running-self-report；东莞自研半自动集包，保留人工装袋；按场地和业务量选型。；当前任务：人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。；L35；L35为2024-04-10，历史运营者报道。
- 部署层级：operator-historical-deployment-self-report；不同城市案例分别识别；只取邮袋辅助与输送、人工扎袋及场地改造条件。；当前任务：人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。；L37；L37=2019-11-18，历史双11多个地点案例不能合成一个站。
- 残留/未替代范围：人工投件、装袋；封袋和异常工时未披露。；人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：分流后扎袋和人工移动仍出现，不能将全程不落地视为无人。；人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：袋容器、封口方式、满袋与码号关联；人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 采用待验证：
- 采用待验证：
- 反证/未采用：reported-nonadoption-condition；该场地与邮件量不适合大型分拣设备，采用半自动方案。；限该来源所述系统、时期、场地及实际角色，不外推当前失败率。
- 反证/未采用：reported-adoption-condition；深圳大浪旧场地以皮带和手工作业为主，迁址后安装分拣设备。；限该来源所述系统、时期、场地及实际角色，不外推当前失败率。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-sort-008；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：袋容器、封口方式、满袋与码号关联；人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；集齐入袋与封口分别产生未封袋/封发总包，机制和计量可不同，建议2子候选。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：人工投袋、撑袋、灯光、缝包为局部；不等于全自动集包。场地量反证可保留系统层级。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；集齐入袋与封口分别产生未封袋/封发总包，机制和计量可不同，建议2子候选。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R04']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-sort-009 · 核对发运路由并制作路单

已保留局部机制；完整任务替代尚未证实。 场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。

- 执行边界：只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 输入：发运计划及总包
- 输出：路单
- 验收：目的站总包及车辆对应
- 定义与粒度：经核对形成路单可作一控制输出，不因两动词机械拆分。
- 适用条件：班次、目的站、车辆和总包可对应
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204—205/正文197—198，4-02-07-09 快件处理员，任务3（核路由及制路单）；角色：职业原文直接列出动作（限所引文字）；express-sort任务3核路由、制路单直接。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第7、10项；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。；未证范围：场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。；未证范围：场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。；未证范围：场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。；未证范围：场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism、partial-mechanism；场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。；未证范围：场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。 |

- CN-TP-CLAIM-YARD-DIGITAL · partial-mechanism：场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。；[数智化场院管理 处理中心数字化迈出新步伐](https://www.chinapost.com.cn/cn/report/2211/30021-1.htm) · L50—61、L65—72、L84—95
- CN-TP-CLAIM-SCAN-ROUTE · partial-mechanism：场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。；[物流业条形码读码器应用案例](https://www.keyence.com.cn/ss/products/auto_id/handheld-terminals/example/logistics.jsp) · L92—94、L111
- 部署层级：vendor-product-description；条码与物流数据采集功能；中国站不证明国内具名实际部署。；当前任务：场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。；L60—85、92—94、99、105、111、116、122、126（所读产品正文未确认日期）；正文没有可确认发布日期，留null；中国产品页不证明国内用户。
- 部署层级：operator-initial-operation-self-report；报道时运行一个多月；司机与接发调度人员仍现场交接。；当前任务：场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。；L35；当时运行一个多月的叙述另见正文；L35为2022-11-23，文内当时运行一个多月；未核2026。
- 残留/未替代范围：司机执行行车装卸衔接，接发人员查验车辆状态。；场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：班次、目的站、车辆和总包可对应；场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-sort-009；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：班次、目的站、车辆和总包可对应；场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；经核对形成路单可作一控制输出，不因两动词机械拆分。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：场院垛口、车辆数据及条码路向关联局部支持装发信息核对；未证明车内装载方案或配载确认。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；经核对形成路单可作一控制输出，不因两动词机械拆分。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E02']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-sort-010 · 装载待发总包

已保留局部机制；完整任务替代尚未证实。 历史输送袋件局部，仅到车端不等于自动车内堆装绑固。

- 执行边界：只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 输入：待发总包和车辆
- 输出：装车总包
- 验收：装载安全且数量路向一致
- 定义与粒度：装载为实体输出，不另计输送到车旁与同一次递送总量。
- 适用条件：输送交接面与袋型相容，车内人员工时另计
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204—205/正文197—198，4-02-07-09 快件处理员，任务3（装车发运）；角色：职业原文直接列出动作（限所引文字）；express-sort任务3装车发运直接。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第8项；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism；历史输送袋件局部，仅到车端不等于自动车内堆装绑固。；未证范围：历史输送袋件局部，仅到车端不等于自动车内堆装绑固。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；历史输送袋件局部，仅到车端不等于自动车内堆装绑固。；未证范围：历史输送袋件局部，仅到车端不等于自动车内堆装绑固。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；历史输送袋件局部，仅到车端不等于自动车内堆装绑固。；未证范围：历史输送袋件局部，仅到车端不等于自动车内堆装绑固。 |
| 辅助工具 | source-described-see-binding-role；partial-mechanism；历史输送袋件局部，仅到车端不等于自动车内堆装绑固。；未证范围：历史输送袋件局部，仅到车端不等于自动车内堆装绑固。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；历史输送袋件局部，仅到车端不等于自动车内堆装绑固。；未证范围：历史输送袋件局部，仅到车端不等于自动车内堆装绑固。 |

- CN-TP-CLAIM-BAG-BASELINE · partial-mechanism：历史输送袋件局部，仅到车端不等于自动车内堆装绑固。；[“作业神器”让邮政“双11”服务更赞](https://www.chinapost.com.cn/cn/report/1911/9337-1.htm) · L37、L46、L55—56
- 部署层级：operator-historical-deployment-self-report；不同城市案例分别识别；只取邮袋辅助与输送、人工扎袋及场地改造条件。；当前任务：历史输送袋件局部，仅到车端不等于自动车内堆装绑固。；L37；L37=2019-11-18，历史双11多个地点案例不能合成一个站。
- 残留/未替代范围：分流后扎袋和人工移动仍出现，不能将全程不落地视为无人。；历史输送袋件局部，仅到车端不等于自动车内堆装绑固。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：历史输送袋件局部，仅到车端不等于自动车内堆装绑固。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：输送交接面与袋型相容，车内人员工时另计；历史输送袋件局部，仅到车端不等于自动车内堆装绑固。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-sort-010；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：输送交接面与袋型相容，车内人员工时另计；历史输送袋件局部，仅到车端不等于自动车内堆装绑固。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；装载为实体输出，不另计输送到车旁与同一次递送总量。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：历史输送袋件局部，仅到车端不等于自动车内堆装绑固。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；装载为实体输出，不另计输送到车旁与同一次递送总量。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-sort-011 · 交接发运快件并上传处理信息

已保留局部机制；完整任务替代尚未证实。 数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。

- 执行边界：只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 输入：装载车辆与记录
- 输出：发运确认及轨迹
- 验收：码号节点和真实发运状态一致
- 定义与粒度：交接发运事件与信息可一控制点验；若另设独立上传录入岗位需现场确认。
- 适用条件：驾驶员与接发员交接数据可审计
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204—205/正文197—198，4-02-07-09 快件处理员，任务3、7（装发及处理信息）；角色：职业原文直接列出动作（限所引文字）；express-sort204—205/197—198任务3/7装发及处理信息直接。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第7、10项；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。；未证范围：数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。；未证范围：数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。；未证范围：数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。；未证范围：数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism、partial-mechanism；数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。；未证范围：数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。 |

- CN-TP-CLAIM-YARD-DIGITAL · partial-mechanism：数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。；[数智化场院管理 处理中心数字化迈出新步伐](https://www.chinapost.com.cn/cn/report/2211/30021-1.htm) · L50—61、L65—72、L84—95
- CN-TP-CLAIM-SCAN-ROUTE · partial-mechanism：数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。；[物流业条形码读码器应用案例](https://www.keyence.com.cn/ss/products/auto_id/handheld-terminals/example/logistics.jsp) · L92—94、L111
- 部署层级：vendor-product-description；条码与物流数据采集功能；中国站不证明国内具名实际部署。；当前任务：数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。；L60—85、92—94、99、105、111、116、122、126（所读产品正文未确认日期）；正文没有可确认发布日期，留null；中国产品页不证明国内用户。
- 部署层级：operator-initial-operation-self-report；报道时运行一个多月；司机与接发调度人员仍现场交接。；当前任务：数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。；L35；当时运行一个多月的叙述另见正文；L35为2022-11-23，文内当时运行一个多月；未核2026。
- 残留/未替代范围：司机执行行车装卸衔接，接发人员查验车辆状态。；数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：驾驶员与接发员交接数据可审计；数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-sort-011；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：驾驶员与接发员交接数据可审计；数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；交接发运事件与信息可一控制点验；若另设独立上传录入岗位需现场确认。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：数字交接局部支持记录流转；计划指令不等于实际已发，EPOD条码分流和路程优化不证明配载确认。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；交接发运事件与信息可一控制点验；若另设独立上传录入岗位需现场确认。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E02']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-sort-012 · 检查分拣场所安全装置状态

本轮仅保留相邻机制或上下文；不视为本任务匹配部署。 维保信息归集相邻，不是急停和隔离设施物理测试。

- 执行边界：只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 输入：通信报警急停和隔离设施
- 输出：检查记录
- 验收：安全装置保持适用
- 定义与粒度：检查记录可单验，安全回路清单与阈值待补。
- 适用条件：设备安全回路与软件状态分开验证
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204—205/正文197—198，4-02-07-09 快件处理员，任务1—8（未独立列安全装置检查）；角色：职业场景上下文；快件处理员任务1—8未独立列安全装置检查，仅保留职业场景上下文；相应安全设施要求来自法规第34条。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第34条第1、2、4项；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；维保信息归集相邻，不是急停和隔离设施物理测试。；未证范围：维保信息归集相邻，不是急停和隔离设施物理测试。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；维保信息归集相邻，不是急停和隔离设施物理测试。；未证范围：维保信息归集相邻，不是急停和隔离设施物理测试。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；维保信息归集相邻，不是急停和隔离设施物理测试。；未证范围：维保信息归集相邻，不是急停和隔离设施物理测试。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；维保信息归集相邻，不是急停和隔离设施物理测试。；未证范围：维保信息归集相邻，不是急停和隔离设施物理测试。 |
| 数字流程 | source-described-see-binding-role；adjacent-mechanism；维保信息归集相邻，不是急停和隔离设施物理测试。；未证范围：维保信息归集相邻，不是急停和隔离设施物理测试。 |

- CN-TP-CLAIM-POST-MAINT-DIGITAL · adjacent-mechanism：维保信息归集相邻，不是急停和隔离设施物理测试。；[邮政寄递建强集中维保体系 全网设备故障数下降超九成](https://www.chinapost.com.cn/cn/report/2609/0746-1.htm) · L35—44
- 部署层级：operator-running-self-report；SCADA及集中维保，数据截至2026年7月底；效率百分比不用于人工或回报。；当前任务：维保信息归集相邻，不是急停和隔离设施物理测试。；L35；L37为截至2026年7月底数据；L35=2026-09-03报道，L37数据截至2026年7月底，不能标9月现场普查。
- 残留/未替代范围：现场维保班组值守、维修及备件调拨保留。；维保信息归集相邻，不是急停和隔离设施物理测试。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：维保信息归集相邻，不是急停和隔离设施物理测试。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：设备安全回路与软件状态分开验证；维保信息归集相邻，不是急停和隔离设施物理测试。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 相邻/上下文来源（非本动作成功）：CN-TP-AUTO-POST-MAINT-RETRY；adjacent-mechanism；维保信息归集相邻，不是急停和隔离设施物理测试。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-sort-012；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：设备安全回路与软件状态分开验证；维保信息归集相邻，不是急停和隔离设施物理测试。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；检查记录可单验，安全回路清单与阈值待补。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：维保信息归集相邻，不是急停和隔离设施物理测试。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；检查记录可单验，安全回路清单与阈值待补。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R01', 'R07']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-sort-013 · 维护检测处理中心设施设备

已保留局部机制；完整任务替代尚未证实。 集中SCADA/人工维修局部；报道故障可作为运行故障但非撤机/商业退出。

- 执行边界：只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 输入：输送分拣设施
- 输出：维护记录
- 验收：检查与处置结果可追溯
- 定义与粒度：当前维护任务族；监控诊断、清洁、部件更换具体范围待补。
- 适用条件：接入设备型号、故障范围、维护班组和备件路径
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204—205/正文197—198，4-02-07-09 快件处理员，任务1—8（未独立列设备维修）；角色：职业场景上下文；express-sort未列独立设备维修；岗位上下文，按实际维修执行者登记。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第34条第3项；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；集中SCADA/人工维修局部；报道故障可作为运行故障但非撤机/商业退出。；未证范围：集中SCADA/人工维修局部；报道故障可作为运行故障但非撤机/商业退出。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；集中SCADA/人工维修局部；报道故障可作为运行故障但非撤机/商业退出。；未证范围：集中SCADA/人工维修局部；报道故障可作为运行故障但非撤机/商业退出。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；集中SCADA/人工维修局部；报道故障可作为运行故障但非撤机/商业退出。；未证范围：集中SCADA/人工维修局部；报道故障可作为运行故障但非撤机/商业退出。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；集中SCADA/人工维修局部；报道故障可作为运行故障但非撤机/商业退出。；未证范围：集中SCADA/人工维修局部；报道故障可作为运行故障但非撤机/商业退出。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；集中SCADA/人工维修局部；报道故障可作为运行故障但非撤机/商业退出。；未证范围：集中SCADA/人工维修局部；报道故障可作为运行故障但非撤机/商业退出。 |

- CN-TP-CLAIM-POST-MAINT-DIGITAL · partial-mechanism：集中SCADA/人工维修局部；报道故障可作为运行故障但非撤机/商业退出。；[邮政寄递建强集中维保体系 全网设备故障数下降超九成](https://www.chinapost.com.cn/cn/report/2609/0746-1.htm) · L35—44
- 部署层级：operator-running-self-report；SCADA及集中维保，数据截至2026年7月底；效率百分比不用于人工或回报。；当前任务：集中SCADA/人工维修局部；报道故障可作为运行故障但非撤机/商业退出。；L35；L37为截至2026年7月底数据；L35=2026-09-03报道，L37数据截至2026年7月底，不能标9月现场普查。
- 残留/未替代范围：现场维保班组值守、维修及备件调拨保留。；集中SCADA/人工维修局部；报道故障可作为运行故障但非撤机/商业退出。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：集中SCADA/人工维修局部；报道故障可作为运行故障但非撤机/商业退出。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：接入设备型号、故障范围、维护班组和备件路径；集中SCADA/人工维修局部；报道故障可作为运行故障但非撤机/商业退出。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；只计代码60处理节点运营者劳动；外包班组按合同和统计主体核定，不能把整网同一快件多节点与同一节点重复工序混算。
- 反证/未采用：reported-operation-faults-not-exit；运行报道仍记录设备故障及电控程序问题，采取远程指导和现场维修。；限该来源所述系统、时期、场地及实际角色，不外推当前失败率。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-sort-013；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：接入设备型号、故障范围、维护班组和备件路径；集中SCADA/人工维修局部；报道故障可作为运行故障但非撤机/商业退出。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；当前维护任务族；监控诊断、清洁、部件更换具体范围待补。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：集中SCADA/人工维修局部；报道故障可作为运行故障但非撤机/商业退出。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；当前维护任务族；监控诊断、清洁、部件更换具体范围待补。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R01', 'R05']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-lastmile-001 · 接收末端总包并核对快件

已保留局部机制；完整任务替代尚未证实。 扫描局部，实物数量异常责任未证。

- 执行边界：代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 输入：到站总包
- 输出：接收快件
- 验收：清单件数与码号对应
- 定义与粒度：接收核对记录可验；袋内散件核对应与后续开拆关联避免先验未见实物。
- 适用条件：本站点清单、总包与散件匹配
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务3（接收开拆）；角色：职业原文仅覆盖部分动作；courier任务3接收开拆直接，码单核对细节来自操作化。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第7、8、10项；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；扫描局部，实物数量异常责任未证。；未证范围：扫描局部，实物数量异常责任未证。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；扫描局部，实物数量异常责任未证。；未证范围：扫描局部，实物数量异常责任未证。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；扫描局部，实物数量异常责任未证。；未证范围：扫描局部，实物数量异常责任未证。 |
| 辅助工具 | source-described-see-binding-role；partial-mechanism；扫描局部，实物数量异常责任未证。；未证范围：扫描局部，实物数量异常责任未证。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；扫描局部，实物数量异常责任未证。；未证范围：扫描局部，实物数量异常责任未证。 |

- CN-TP-CLAIM-SCAN-RECEIVE · partial-mechanism：扫描局部，实物数量异常责任未证。；[物流业条形码读码器应用案例](https://www.keyence.com.cn/ss/products/auto_id/handheld-terminals/example/logistics.jsp) · L60—85、L105、L116
- 部署层级：vendor-product-description；条码与物流数据采集功能；中国站不证明国内具名实际部署。；当前任务：扫描局部，实物数量异常责任未证。；L60—85、92—94、99、105、111、116、122、126（所读产品正文未确认日期）；正文没有可确认发布日期，留null；中国产品页不证明国内用户。
- 残留/未替代范围：操作者持机扫描；实物损傷与无标识物仍需另核。；扫描局部，实物数量异常责任未证。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：扫描局部，实物数量异常责任未证。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：本站点清单、总包与散件匹配；扫描局部，实物数量异常责任未证。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-lastmile-001；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：本站点清单、总包与散件匹配；扫描局部，实物数量异常责任未证。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；接收核对记录可验；袋内散件核对应与后续开拆关联避免先验未见实物。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：扫描局部，实物数量异常责任未证。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；接收核对记录可验；袋内散件核对应与后续开拆关联避免先验未见实物。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-lastmile-002 · 开拆并按投递地址分装快件

本轮仅保留相邻机制或上下文；不视为本任务匹配部署。 中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。

- 执行边界：代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 输入：到站总包
- 输出：投递分组快件
- 验收：地址归属与组别一致
- 定义与粒度：开袋成散件和按址成投递组独立输出，建议2子候选。
- 适用条件：处理中心方案缩至末端的空间与件量条件
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务3（开拆、按址分装）；角色：职业原文直接列出动作（限所引文字）；courier任务3直接开拆并按址分装。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第7项；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。
- 拟议子项（不新增、不继承查询或成功）：开拆末端到站总包；按投递地址分装散件

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。；未证范围：中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。 |
| 专机 | source-described-see-binding-role；adjacent-mechanism、adjacent-mechanism；中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。；未证范围：中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。 |
| 机器人 | source-described-see-binding-role；adjacent-mechanism；中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。；未证范围：中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。 |
| 辅助工具 | source-described-see-binding-role；adjacent-mechanism；中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。；未证范围：中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。 |
| 数字流程 | source-described-see-binding-role；adjacent-mechanism；中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。；未证范围：中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。 |

- CN-TP-CLAIM-BAG-OPEN · adjacent-mechanism：中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。；[CN111559551A 快递流转包自动拆包方法和装置](https://patents.google.com/patent/CN111559551A/zh) · L180—206
- CN-TP-CLAIM-BAG-HALFAUTO · adjacent-mechanism：中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。；[东莞邮政创新提升物流仓配集包效率](https://www.chinapost.com.cn/cn/report/2404/5675-1.htm) · L37—42
- 部署层级：operator-running-self-report；东莞自研半自动集包，保留人工装袋；按场地和业务量选型。；当前任务：中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。；L35；L35为2024-04-10，历史运营者报道。
- 部署层级：patent-disclosure-not-deployment；视觉抓袋、切口、倒包专利；描述人工回收袋子，无独立商用验证。；当前任务：中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。；L37；CN111559551A公开时间线；L37/公开时间线2020-08-21为CN111559551A公开日，不是装机日。
- 残留/未替代范围：实施例安排人工回收空袋；件数重量复核并未由拆袋机械证明。；中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：人工投件、装袋；封袋和异常工时未披露。；中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：处理中心方案缩至末端的空间与件量条件；中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 相邻/上下文来源（非本动作成功）：CN-TP-AUTO-POST-BAG；adjacent-mechanism；中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-lastmile-002；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：处理中心方案缩至末端的空间与件量条件；中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；开袋成散件和按址成投递组独立输出，建议2子候选。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：中心拆包专利/半自动粗分迁末端为相邻；维持空间件量等迁移限制。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；开袋成散件和按址成投递组独立输出，建议2子候选。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R04', 'R07']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-lastmile-003 · 核对投递方式与用户约定

本轮仅保留相邻机制或上下文；不视为本任务匹配部署。 EPOD配送时间变更仅为相邻信息流程，不证明入柜授权；原文签收后扫描不证明先取得用户同意。

- 执行边界：代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 输入：快件及用户约定
- 输出：投递方式确认
- 验收：自提入柜等方式取得所需同意
- 定义与粒度：约定记录可单验；不得用收到通知当同意。
- 适用条件：投递方式约定与地址、收件人一致
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务4（投递，未列同意获取）；角色：职业场景上下文；courier任务4投递只上下文，不能证明用户同意获取动作。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第28条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；EPOD配送时间变更仅为相邻信息流程，不证明入柜授权；原文签收后扫描不证明先取得用户同意。；未证范围：EPOD配送时间变更仅为相邻信息流程，不证明入柜授权；原文签收后扫描不证明先取得用户同意。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；EPOD配送时间变更仅为相邻信息流程，不证明入柜授权；原文签收后扫描不证明先取得用户同意。；未证范围：EPOD配送时间变更仅为相邻信息流程，不证明入柜授权；原文签收后扫描不证明先取得用户同意。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；EPOD配送时间变更仅为相邻信息流程，不证明入柜授权；原文签收后扫描不证明先取得用户同意。；未证范围：EPOD配送时间变更仅为相邻信息流程，不证明入柜授权；原文签收后扫描不证明先取得用户同意。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；EPOD配送时间变更仅为相邻信息流程，不证明入柜授权；原文签收后扫描不证明先取得用户同意。；未证范围：EPOD配送时间变更仅为相邻信息流程，不证明入柜授权；原文签收后扫描不证明先取得用户同意。 |
| 数字流程 | source-described-see-binding-role；adjacent-mechanism；EPOD配送时间变更仅为相邻信息流程，不证明入柜授权；原文签收后扫描不证明先取得用户同意。；未证范围：EPOD配送时间变更仅为相邻信息流程，不证明入柜授权；原文签收后扫描不证明先取得用户同意。 |

- CN-TP-CLAIM-SCAN-DELIVERY · adjacent-mechanism：EPOD配送时间变更仅为相邻信息流程，不证明入柜授权；原文签收后扫描不证明先取得用户同意。；[物流业条形码读码器应用案例](https://www.keyence.com.cn/ss/products/auto_id/handheld-terminals/example/logistics.jsp) · L122、L126
- 部署层级：vendor-product-description；条码与物流数据采集功能；中国站不证明国内具名实际部署。；当前任务：EPOD配送时间变更仅为相邻信息流程，不证明入柜授权；原文签收后扫描不证明先取得用户同意。；L60—85、92—94、99、105、111、116、122、126（所读产品正文未确认日期）；正文没有可确认发布日期，留null；中国产品页不证明国内用户。
- 残留/未替代范围：原文仅说明司机在按计划完成签收后扫描发货单；身份查验与用户授权程序未给出，属于待核边界。；EPOD配送时间变更仅为相邻信息流程，不证明入柜授权；原文签收后扫描不证明先取得用户同意。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：EPOD配送时间变更仅为相邻信息流程，不证明入柜授权；原文签收后扫描不证明先取得用户同意。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：投递方式约定与地址、收件人一致；EPOD配送时间变更仅为相邻信息流程，不证明入柜授权；原文签收后扫描不证明先取得用户同意。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-lastmile-003；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：投递方式约定与地址、收件人一致；EPOD配送时间变更仅为相邻信息流程，不证明入柜授权；原文签收后扫描不证明先取得用户同意。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；约定记录可单验；不得用收到通知当同意。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：EPOD配送时间变更仅为相邻信息流程，不证明入柜授权；原文签收后扫描不证明先取得用户同意。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；约定记录可单验；不得用收到通知当同意。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R01', 'E01']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-lastmile-004 · 运送快件至约定收件地址

已保留局部机制；完整任务替代尚未证实。 2023总部室内外试运营局部，电梯门禁联调条件保留，不推全国/2026在运。

- 执行边界：代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 输入：分装快件
- 输出：到址快件
- 验收：按照约定地址及承诺服务送达
- 定义与粒度：运至明确约定地址可单验，交付与身份另项。
- 适用条件：仅门禁电梯已联调且服务路线确定的场所
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务4（按址投递）；角色：职业原文直接列出动作（限所引文字）；courier任务4按址投递直接。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第9项、第27—28条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；2023总部室内外试运营局部，电梯门禁联调条件保留，不推全国/2026在运。；未证范围：2023总部室内外试运营局部，电梯门禁联调条件保留，不推全国/2026在运。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；2023总部室内外试运营局部，电梯门禁联调条件保留，不推全国/2026在运。；未证范围：2023总部室内外试运营局部，电梯门禁联调条件保留，不推全国/2026在运。 |
| 机器人 | source-described-see-binding-role；partial-mechanism；2023总部室内外试运营局部，电梯门禁联调条件保留，不推全国/2026在运。；未证范围：2023总部室内外试运营局部，电梯门禁联调条件保留，不推全国/2026在运。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；2023总部室内外试运营局部，电梯门禁联调条件保留，不推全国/2026在运。；未证范围：2023总部室内外试运营局部，电梯门禁联调条件保留，不推全国/2026在运。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；2023总部室内外试运营局部，电梯门禁联调条件保留，不推全国/2026在运。；未证范围：2023总部室内外试运营局部，电梯门禁联调条件保留，不推全国/2026在运。 |

- CN-TP-CLAIM-DELIVERY-PILOT · partial-mechanism：2023总部室内外试运营局部，电梯门禁联调条件保留，不推全国/2026在运。；[中国邮政启动全国首个“机器人+”AI寄递解决方案](https://www.chinapost.com.cn/cn/report/2306/11864-1.html) · L17—24
- 部署层级：operator-pilot-self-report；2023-06-16启动的总部场景试运营；户外与室内联动，不代表所有住宅上门服务。；当前任务：2023总部室内外试运营局部，电梯门禁联调条件保留，不推全国/2026在运。；L17；试运营起点另见L18—24；L17发布日期2023-06-20；L18—24为6月16日起总部试运营，二者不混。
- 残留/未替代范围：保留自主、现场遥控与远程操控模式；接管工时未披露。；2023总部室内外试运营局部，电梯门禁联调条件保留，不推全国/2026在运。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：2023总部室内外试运营局部，电梯门禁联调条件保留，不推全国/2026在运。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：仅门禁电梯已联调且服务路线确定的场所；2023总部室内外试运营局部，电梯门禁联调条件保留，不推全国/2026在运。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-lastmile-004；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：仅门禁电梯已联调且服务路线确定的场所；2023总部室内外试运营局部，电梯门禁联调条件保留，不推全国/2026在运。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；运至明确约定地址可单验，交付与身份另项。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：2023总部室内外试运营局部，电梯门禁联调条件保留，不推全国/2026在运。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；运至明确约定地址可单验，交付与身份另项。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-lastmile-005 · 提示并协助收件人验收快件

本轮没有保留匹配机制；不据此判断技术不可行。 未匹配；法规不证明自动提示能完成实体验收。

- 执行边界：代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 输入：到址快件
- 输出：验收结果
- 验收：破损和易碎内件按规定告知验收
- 定义与粒度：提醒协助验收是服务输出；实际开验由谁做要明确，不自动当全部快件开验。
- 适用条件：用户在场、内件可见和争议处置
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务4（未列提示验收细则）；角色：职业场景上下文；courier任务4只投递上下文，没有提示验收细则。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第27条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；未匹配；法规不证明自动提示能完成实体验收。；未证范围：未匹配；法规不证明自动提示能完成实体验收。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；未匹配；法规不证明自动提示能完成实体验收。；未证范围：未匹配；法规不证明自动提示能完成实体验收。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；未匹配；法规不证明自动提示能完成实体验收。；未证范围：未匹配；法规不证明自动提示能完成实体验收。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；未匹配；法规不证明自动提示能完成实体验收。；未证范围：未匹配；法规不证明自动提示能完成实体验收。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；未匹配；法规不证明自动提示能完成实体验收。；未证范围：未匹配；法规不证明自动提示能完成实体验收。 |

- 残留/未替代范围：未匹配；法规不证明自动提示能完成实体验收。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：用户在场、内件可见和争议处置；未匹配；法规不证明自动提示能完成实体验收。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-lastmile-005；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：用户在场、内件可见和争议处置；未匹配；法规不证明自动提示能完成实体验收。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；提醒协助验收是服务输出；实际开验由谁做要明确，不自动当全部快件开验。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：未匹配；法规不证明自动提示能完成实体验收。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；提醒协助验收是服务输出；实际开验由谁做要明确，不自动当全部快件开验。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R01']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-lastmile-006 · 核实并记录本人或指定代收人收件

本轮仅保留相邻机制或上下文；不视为本任务匹配部署。 EPOD仅签收后上传，为相邻机制；不能据此认定已完成本人或指定代收人身份、授权查验。

- 执行边界：代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 输入：验收快件
- 输出：明示签收记录
- 验收：收件确认可保存识别且未经授权不代签
- 定义与粒度：核验收件及保存确认可为一控制点，身份认证细节需SOP。
- 适用条件：保留明示收件确认与真实操作者
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务4（未列身份查验细则）；角色：职业场景上下文；courier任务4仅投递上下文。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第28条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；EPOD仅签收后上传，为相邻机制；不能据此认定已完成本人或指定代收人身份、授权查验。；未证范围：EPOD仅签收后上传，为相邻机制；不能据此认定已完成本人或指定代收人身份、授权查验。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；EPOD仅签收后上传，为相邻机制；不能据此认定已完成本人或指定代收人身份、授权查验。；未证范围：EPOD仅签收后上传，为相邻机制；不能据此认定已完成本人或指定代收人身份、授权查验。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；EPOD仅签收后上传，为相邻机制；不能据此认定已完成本人或指定代收人身份、授权查验。；未证范围：EPOD仅签收后上传，为相邻机制；不能据此认定已完成本人或指定代收人身份、授权查验。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；EPOD仅签收后上传，为相邻机制；不能据此认定已完成本人或指定代收人身份、授权查验。；未证范围：EPOD仅签收后上传，为相邻机制；不能据此认定已完成本人或指定代收人身份、授权查验。 |
| 数字流程 | source-described-see-binding-role；adjacent-mechanism；EPOD仅签收后上传，为相邻机制；不能据此认定已完成本人或指定代收人身份、授权查验。；未证范围：EPOD仅签收后上传，为相邻机制；不能据此认定已完成本人或指定代收人身份、授权查验。 |

- CN-TP-CLAIM-SCAN-DELIVERY · adjacent-mechanism：EPOD仅签收后上传，为相邻机制；不能据此认定已完成本人或指定代收人身份、授权查验。；[物流业条形码读码器应用案例](https://www.keyence.com.cn/ss/products/auto_id/handheld-terminals/example/logistics.jsp) · L122、L126
- 部署层级：vendor-product-description；条码与物流数据采集功能；中国站不证明国内具名实际部署。；当前任务：EPOD仅签收后上传，为相邻机制；不能据此认定已完成本人或指定代收人身份、授权查验。；L60—85、92—94、99、105、111、116、122、126（所读产品正文未确认日期）；正文没有可确认发布日期，留null；中国产品页不证明国内用户。
- 残留/未替代范围：原文仅说明司机在按计划完成签收后扫描发货单；身份查验与用户授权程序未给出，属于待核边界。；EPOD仅签收后上传，为相邻机制；不能据此认定已完成本人或指定代收人身份、授权查验。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：EPOD仅签收后上传，为相邻机制；不能据此认定已完成本人或指定代收人身份、授权查验。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：保留明示收件确认与真实操作者；EPOD仅签收后上传，为相邻机制；不能据此认定已完成本人或指定代收人身份、授权查验。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-lastmile-006；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：保留明示收件确认与真实操作者；EPOD仅签收后上传，为相邻机制；不能据此认定已完成本人或指定代收人身份、授权查验。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；核验收件及保存确认可为一控制点，身份认证细节需SOP。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：EPOD仅签收后上传，为相邻机制；不能据此认定已完成本人或指定代收人身份、授权查验。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；核验收件及保存确认可为一控制点，身份认证细节需SOP。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R01', 'E01']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-lastmile-007 · 依用户同意将快件放入自提设施

已保留局部机制；完整任务替代尚未证实。 北京2018柜体选格/开门局部；人工投件和用户取件仍在，无2026持续证明。

- 执行边界：代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 输入：授权快件与设施
- 输出：待用户领取快件
- 验收：设施方式与用户同意一致
- 定义与粒度：已获同意快件入指定格口可单验，同意在003记录不双计。
- 适用条件：先有用户同意，柜容、格口与码号一致
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务4（投递，未列实体入柜）；角色：职业场景上下文；courier任务4投递分支只上下文，入柜动作未明确列。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第28条（同意条件；机械入柜程序未给）；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；北京2018柜体选格/开门局部；人工投件和用户取件仍在，无2026持续证明。；未证范围：北京2018柜体选格/开门局部；人工投件和用户取件仍在，无2026持续证明。 |
| 专机 | source-described-see-binding-role；partial-mechanism；北京2018柜体选格/开门局部；人工投件和用户取件仍在，无2026持续证明。；未证范围：北京2018柜体选格/开门局部；人工投件和用户取件仍在，无2026持续证明。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；北京2018柜体选格/开门局部；人工投件和用户取件仍在，无2026持续证明。；未证范围：北京2018柜体选格/开门局部；人工投件和用户取件仍在，无2026持续证明。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；北京2018柜体选格/开门局部；人工投件和用户取件仍在，无2026持续证明。；未证范围：北京2018柜体选格/开门局部；人工投件和用户取件仍在，无2026持续证明。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；北京2018柜体选格/开门局部；人工投件和用户取件仍在，无2026持续证明。；未证范围：北京2018柜体选格/开门局部；人工投件和用户取件仍在，无2026持续证明。 |

- CN-TP-CLAIM-CABINET · partial-mechanism：北京2018柜体选格/开门局部；人工投件和用户取件仍在，无2026持续证明。；[中邮速递易智能信报箱落地北京](https://www.chinapost.com.cn/html1/report/181312/9573-1.htm) · L39—46
- 部署层级：operator-historical-deployment-self-report；2018北京信报箱兼包裹柜，仍由投递员入格；不证明用户同意流程。；当前任务：北京2018柜体选格/开门局部；人工投件和用户取件仍在，无2026持续证明。；L39；L39=2018-08-21，不用路径日期替代正文。
- 残留/未替代范围：人工投递与用户取出仍存在；用户同意和本人核验流程未给出。；北京2018柜体选格/开门局部；人工投件和用户取件仍在，无2026持续证明。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：北京2018柜体选格/开门局部；人工投件和用户取件仍在，无2026持续证明。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：先有用户同意，柜容、格口与码号一致；北京2018柜体选格/开门局部；人工投件和用户取件仍在，无2026持续证明。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-lastmile-007；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：先有用户同意，柜容、格口与码号一致；北京2018柜体选格/开门局部；人工投件和用户取件仍在，无2026持续证明。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；已获同意快件入指定格口可单验，同意在003记录不双计。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：北京2018柜体选格/开门局部；人工投件和用户取件仍在，无2026持续证明。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；已获同意快件入指定格口可单验，同意在003记录不双计。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R01']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-lastmile-008 · 记录拒收或无法投递原因

本轮没有保留匹配机制；不据此判断技术不可行。 未匹配；不能用软件有码表证明识别真实拒收。

- 执行边界：代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 输入：未交付快件
- 输出：异常记录
- 验收：快件状态真实且原因可追溯
- 定义与粒度：异常原因记录可操作化，来源事件与更正权限待核。
- 适用条件：原因由实际事件支持，不能用默认失败码代替
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务5（再投改退上下文）；角色：职业场景上下文；courier任务5再投改退仅异常处理上下文，不直接细分拒收原因登记。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第10项、第28条（真实信息及交付条件）；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；未匹配；不能用软件有码表证明识别真实拒收。；未证范围：未匹配；不能用软件有码表证明识别真实拒收。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；未匹配；不能用软件有码表证明识别真实拒收。；未证范围：未匹配；不能用软件有码表证明识别真实拒收。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；未匹配；不能用软件有码表证明识别真实拒收。；未证范围：未匹配；不能用软件有码表证明识别真实拒收。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；未匹配；不能用软件有码表证明识别真实拒收。；未证范围：未匹配；不能用软件有码表证明识别真实拒收。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；未匹配；不能用软件有码表证明识别真实拒收。；未证范围：未匹配；不能用软件有码表证明识别真实拒收。 |

- 残留/未替代范围：未匹配；不能用软件有码表证明识别真实拒收。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：原因由实际事件支持，不能用默认失败码代替；未匹配；不能用软件有码表证明识别真实拒收。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-lastmile-008；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：原因由实际事件支持，不能用默认失败码代替；未匹配；不能用软件有码表证明识别真实拒收。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；异常原因记录可操作化，来源事件与更正权限待核。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：未匹配；不能用软件有码表证明识别真实拒收。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；异常原因记录可操作化，来源事件与更正权限待核。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R01']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-lastmile-009 · 按约定再次投递未交付快件

本轮仅保留相邻机制或上下文；不视为本任务匹配部署。 EPOD时点变化只准备，相邻，不完成再次实体送达。

- 执行边界：代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 输入：再投快件与约定
- 输出：再投结果
- 验收：再次投递结果如实记录
- 定义与粒度：再次送达独立返工输出，可保留，正常投递与返工工时不得双重累计同次行为。
- 适用条件：新约定、再投次数与用户是否在场
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务5（再投）；角色：职业原文直接列出动作（限所引文字）；courier任务5直接再投。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第9项、第28条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；EPOD时点变化只准备，相邻，不完成再次实体送达。；未证范围：EPOD时点变化只准备，相邻，不完成再次实体送达。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；EPOD时点变化只准备，相邻，不完成再次实体送达。；未证范围：EPOD时点变化只准备，相邻，不完成再次实体送达。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；EPOD时点变化只准备，相邻，不完成再次实体送达。；未证范围：EPOD时点变化只准备，相邻，不完成再次实体送达。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；EPOD时点变化只准备，相邻，不完成再次实体送达。；未证范围：EPOD时点变化只准备，相邻，不完成再次实体送达。 |
| 数字流程 | source-described-see-binding-role；adjacent-mechanism；EPOD时点变化只准备，相邻，不完成再次实体送达。；未证范围：EPOD时点变化只准备，相邻，不完成再次实体送达。 |

- CN-TP-CLAIM-SCAN-DELIVERY · adjacent-mechanism：EPOD时点变化只准备，相邻，不完成再次实体送达。；[物流业条形码读码器应用案例](https://www.keyence.com.cn/ss/products/auto_id/handheld-terminals/example/logistics.jsp) · L122、L126
- 部署层级：vendor-product-description；条码与物流数据采集功能；中国站不证明国内具名实际部署。；当前任务：EPOD时点变化只准备，相邻，不完成再次实体送达。；L60—85、92—94、99、105、111、116、122、126（所读产品正文未确认日期）；正文没有可确认发布日期，留null；中国产品页不证明国内用户。
- 残留/未替代范围：原文仅说明司机在按计划完成签收后扫描发货单；身份查验与用户授权程序未给出，属于待核边界。；EPOD时点变化只准备，相邻，不完成再次实体送达。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：EPOD时点变化只准备，相邻，不完成再次实体送达。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：新约定、再投次数与用户是否在场；EPOD时点变化只准备，相邻，不完成再次实体送达。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-lastmile-009；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：新约定、再投次数与用户是否在场；EPOD时点变化只准备，相邻，不完成再次实体送达。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；再次送达独立返工输出，可保留，正常投递与返工工时不得双重累计同次行为。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：EPOD时点变化只准备，相邻，不完成再次实体送达。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；再次送达独立返工输出，可保留，正常投递与返工工时不得双重累计同次行为。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E01']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-lastmile-010 · 封发并移交改寄退回快件

本轮仅保留相邻机制或上下文；不视为本任务匹配部署。 历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。

- 执行边界：代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 输入：改退快件与处置指令
- 输出：转退总包
- 验收：路向及快件码号一致
- 定义与粒度：授权改退后封发移交可作为一个交接单元；实体封口若独立产线另核。
- 适用条件：改退路向已授权并与原码号建立关系
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务5（改退、封发转退快件）；角色：职业原文直接列出动作（限所引文字）；courier任务5直接改退、封发转退快件。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第26条第7、10项、第28条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；adjacent-mechanism；历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。；未证范围：历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。；未证范围：历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。；未证范围：历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。 |
| 辅助工具 | source-described-see-binding-role；adjacent-mechanism；历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。；未证范围：历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。；未证范围：历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。 |

- CN-TP-CLAIM-BAG-BASELINE · adjacent-mechanism：历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。；[“作业神器”让邮政“双11”服务更赞](https://www.chinapost.com.cn/cn/report/1911/9337-1.htm) · L37、L46、L55—56
- 部署层级：operator-historical-deployment-self-report；不同城市案例分别识别；只取邮袋辅助与输送、人工扎袋及场地改造条件。；当前任务：历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。；L37；L37=2019-11-18，历史双11多个地点案例不能合成一个站。
- 残留/未替代范围：分流后扎袋和人工移动仍出现，不能将全程不落地视为无人。；历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：改退路向已授权并与原码号建立关系；历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 相邻/上下文来源（非本动作成功）：CN-TP-AUTO-LASTMILE-TOOLS；adjacent-mechanism；历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-lastmile-010；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：改退路向已授权并与原码号建立关系；历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；授权改退后封发移交可作为一个交接单元；实体封口若独立产线另核。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：历史常规封袋工具为相邻，缺指令/标签修改和转退追踪匹配。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；授权改退后封发移交可作为一个交接单元；实体封口若独立产线另核。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R07']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-lastmile-011 · 核实并保管无法投递又无法退回快件

本轮没有保留匹配机制；不据此判断技术不可行。 无匹配，不能省去持续查询和保管责任。

- 执行边界：代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 输入：无着快件
- 输出：保管与查询记录
- 验收：按要求保留查询和处置依据
- 定义与粒度：首次核实无着状态与持续保管不同记录/周期，建议2子候选，依法处理另待流程。
- 适用条件：区分尚可再投、可退回与最终无着状态
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务5、8（改退/投诉，不直接列无着核实保管）；角色：职业场景上下文；courier任务5/8改退投诉仅上下文，不直接证明无着核实保管。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第29条；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。
- 拟议子项（不新增、不继承查询或成功）：核实无法投递且无法退回的状态；按制度保管无着快件并保留查询记录

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；无匹配，不能省去持续查询和保管责任。；未证范围：无匹配，不能省去持续查询和保管责任。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；无匹配，不能省去持续查询和保管责任。；未证范围：无匹配，不能省去持续查询和保管责任。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；无匹配，不能省去持续查询和保管责任。；未证范围：无匹配，不能省去持续查询和保管责任。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；无匹配，不能省去持续查询和保管责任。；未证范围：无匹配，不能省去持续查询和保管责任。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；无匹配，不能省去持续查询和保管责任。；未证范围：无匹配，不能省去持续查询和保管责任。 |

- 残留/未替代范围：无匹配，不能省去持续查询和保管责任。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：区分尚可再投、可退回与最终无着状态；无匹配，不能省去持续查询和保管责任。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-lastmile-011；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：区分尚可再投、可退回与最终无着状态；无匹配，不能省去持续查询和保管责任。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；首次核实无着状态与持续保管不同记录/周期，建议2子候选，依法处理另待流程。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：无匹配，不能省去持续查询和保管责任。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；首次核实无着状态与持续保管不同记录/周期，建议2子候选，依法处理另待流程。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R01', 'R04']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-express-lastmile-012 · 检查末端储存设备及作业区状态

本轮没有保留匹配机制；不据此判断技术不可行。 本轮未保留与末端设施及作业区检查相匹配的完整机制；检查结果和缺陷移交尚缺方案证据，柜体传感器不能推作业区全项目已检，实际维修另待定义。

- 执行边界：代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 输入：末端设施
- 输出：设施与作业区检查结果、缺陷移交记录
- 验收：按确认的检查项目形成结果，发现缺陷后按权限记录及移交；不以已完成维护修理作为本检查验收。
- 定义与粒度：标题是检查，输出却含维护记录；先限定检查结果，实际修理另候选待SOP。
- 适用条件：柜体、货架、温湿度等实际设施清单先确定
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理204/正文197，4-02-07-08 快递员，任务1—8（未明列设施检查维护）；角色：职业场景上下文；快递员职责未列设施检查，仅保留场景上下文；仓储管理员任务5局部支持设施检查维护，但末端站点实际执行岗位和具体检查项目仍待核。
- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理200—201/正文193—194，4-02-06-01 仓储管理员，任务5（仓储管理员检查维护设施；本站实际岗位尚待核）；角色：职业原文仅覆盖部分动作；快递员职责未列设施检查，仅保留场景上下文；仓储管理员任务5局部支持设施检查维护，但末端站点实际执行岗位和具体检查项目仍待核。
- 定义引用：[快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html) · 第34条第3、4项（处理场所适用，末端网点归类需核）；角色：流程/法规所列动作或要求（限所引版本）；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；本轮未保留与末端设施及作业区检查相匹配的完整机制；检查结果和缺陷移交尚缺方案证据，柜体传感器不能推作业区全项目已检，实际维修另待定义。；未证范围：本轮未保留与末端设施及作业区检查相匹配的完整机制；检查结果和缺陷移交尚缺方案证据，柜体传感器不能推作业区全项目已检，实际维修另待定义。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；本轮未保留与末端设施及作业区检查相匹配的完整机制；检查结果和缺陷移交尚缺方案证据，柜体传感器不能推作业区全项目已检，实际维修另待定义。；未证范围：本轮未保留与末端设施及作业区检查相匹配的完整机制；检查结果和缺陷移交尚缺方案证据，柜体传感器不能推作业区全项目已检，实际维修另待定义。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；本轮未保留与末端设施及作业区检查相匹配的完整机制；检查结果和缺陷移交尚缺方案证据，柜体传感器不能推作业区全项目已检，实际维修另待定义。；未证范围：本轮未保留与末端设施及作业区检查相匹配的完整机制；检查结果和缺陷移交尚缺方案证据，柜体传感器不能推作业区全项目已检，实际维修另待定义。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；本轮未保留与末端设施及作业区检查相匹配的完整机制；检查结果和缺陷移交尚缺方案证据，柜体传感器不能推作业区全项目已检，实际维修另待定义。；未证范围：本轮未保留与末端设施及作业区检查相匹配的完整机制；检查结果和缺陷移交尚缺方案证据，柜体传感器不能推作业区全项目已检，实际维修另待定义。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；本轮未保留与末端设施及作业区检查相匹配的完整机制；检查结果和缺陷移交尚缺方案证据，柜体传感器不能推作业区全项目已检，实际维修另待定义。；未证范围：本轮未保留与末端设施及作业区检查相匹配的完整机制；检查结果和缺陷移交尚缺方案证据，柜体传感器不能推作业区全项目已检，实际维修另待定义。 |

- 残留/未替代范围：本轮未保留与末端设施及作业区检查相匹配的完整机制；检查结果和缺陷移交尚缺方案证据，柜体传感器不能推作业区全项目已检，实际维修另待定义。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：柜体、货架、温湿度等实际设施清单先确定；本轮未保留与末端设施及作业区检查相匹配的完整机制；检查结果和缺陷移交尚缺方案证据，柜体传感器不能推作业区全项目已检，实际维修另待定义。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；代码60末端投递；用户取件和物业协作保留为转移劳动，不能视为劳动消失。入柜必须先满足用户约定。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-express-lastmile-012；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：柜体、货架、温湿度等实际设施清单先确定；本轮未保留与末端设施及作业区检查相匹配的完整机制；检查结果和缺陷移交尚缺方案证据，柜体传感器不能推作业区全项目已检，实际维修另待定义。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；标题是检查，输出却含维护记录；先限定检查结果，实际修理另候选待SOP。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：本轮未保留与末端设施及作业区检查相匹配的完整机制；检查结果和缺陷移交尚缺方案证据，柜体传感器不能推作业区全项目已检，实际维修另待定义。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；标题是检查，输出却含维护记录；先限定检查结果，实际修理另候选待SOP。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R01', 'R06']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-berth-001 · 检查并调整船岸装卸机械

本轮没有保留匹配机制；不据此判断技术不可行。 作业法仅人工作业要求，非自动检查机制。

- 执行边界：货运港口经营者属55；船方、引航、独立受托装卸/专业维修分别按执行者归属。本文只研究干散货船岸机械，不包含航行与集装箱。
- 输入：待作业装卸机
- 输出：可开工设备状态
- 验收：检查项目符合本设备要求
- 定义与粒度：设备达到开工状态一验收输出可保留，不因检查调整两词拆分。
- 适用条件：按实际机型与维修后状态执行试转
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理552/正文545，6-30-05-01 起重装卸机械操作工，任务1；角色：职业原文直接列出动作（限所引文字）；bulk-mechanic552/545任务1检查调整直接。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；作业法仅人工作业要求，非自动检查机制。；未证范围：作业法仅人工作业要求，非自动检查机制。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；作业法仅人工作业要求，非自动检查机制。；未证范围：作业法仅人工作业要求，非自动检查机制。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；作业法仅人工作业要求，非自动检查机制。；未证范围：作业法仅人工作业要求，非自动检查机制。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；作业法仅人工作业要求，非自动检查机制。；未证范围：作业法仅人工作业要求，非自动检查机制。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；作业法仅人工作业要求，非自动检查机制。；未证范围：作业法仅人工作业要求，非自动检查机制。 |

- CN-TP-CLAIM-PORT-CHECK-CONTEXT · workflow-human-context：作业法仅人工作业要求，非自动检查机制。；[关于学习借鉴国投港口《港口生产标准作业法（卸船作业线）》的通知](https://jtyst.fujian.gov.cn/mzwgk/mzwzfxxgk/mzwzfxxgk/qtyzdgkdzfxx/202411/t20241105_6560445.htm) · L21、L40、L100—104、L114—123
- 部署层级：operator-workflow-normative-context；文件成文2023-12-13，网页2024-11-05；检查与试操作等职责，不作为自动化部署。；当前任务：作业法仅人工作业要求，非自动检查机制。；L21网页日；L40文件落款日；网页L21=2024-11-05，文件落款L40=2023-12-13，原双日期说明正确。
- 残留/未替代范围：作业法仅人工作业要求，非自动检查机制。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：按实际机型与维修后状态执行试转；作业法仅人工作业要求，非自动检查机制。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；货运港口经营者属55；船方、引航、独立受托装卸/专业维修分别按执行者归属。本文只研究干散货船岸机械，不包含航行与集装箱。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 相邻/上下文来源（非本动作成功）：CN-TP-AUTO-PORT-CONTINUOUS；workflow-human-context；作业法仅人工作业要求，非自动检查机制。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-berth-001；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：按实际机型与维修后状态执行试转；作业法仅人工作业要求，非自动检查机制。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；设备达到开工状态一验收输出可保留，不因检查调整两词拆分。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：作业法仅人工作业要求，非自动检查机制。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；设备达到开工状态一验收输出可保留，不因检查调整两词拆分。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R07']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-berth-002 · 操作抓斗卸船机卸取散货

已保留局部机制；完整任务替代尚未证实。 烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。

- 执行边界：货运港口经营者属55；船方、引航、独立受托装卸/专业维修分别按执行者归属。本文只研究干散货船岸机械，不包含航行与集装箱。
- 输入：舱内散货
- 输出：岸侧接料货物
- 验收：按指定舱位与接料路线卸取
- 定义与粒度：抓斗卸取单一输出，边舱残料和连续卸船为另路线条件。
- 适用条件：干散货、舱型、抓斗路径与接料路线适配
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理552/正文545，6-30-05-01 起重装卸机械操作工，任务4（抓斗种类由HJ表1限定）；角色：职业原文仅覆盖部分动作；bulk-mechanic任务4专用散料装卸直接，抓斗由HJ工艺设备确定。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism；烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。；未证范围：烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。 |
| 专机 | source-described-see-binding-role；partial-mechanism、partial-mechanism；烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。；未证范围：烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。；未证范围：烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。；未证范围：烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism、partial-mechanism；烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。；未证范围：烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。 |

- CN-TP-CLAIM-YT-GRAB · partial-mechanism：烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。；[烟台港干散货专业化码头控制技术正式发布](https://www.sd-port.com/groupMainNews/2021-12-23/658591897748504576.html) · L99、L111—114
- CN-TP-CLAIM-MOT-PORT-CONTROL · partial-mechanism：烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。；[交通强国建设试点典型案例集（第一辑）案例14、15](https://xxgk.mot.gov.cn/jigou/zhghs/202509/P020250916422010117400.pdf) · PDF第45页/印刷页41，L723—731
- 部署层级：official-case-report-of-operation；青岛港前港和国能黄骅港分别归属；部委案例汇编不等于独立现场审计。；当前任务：烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。；PDF物理第1页封面，2025年9月；物理1封面2025年9月，只有月精度；URL发布日期日不推定为封面日。
- 部署层级：operator-deployment-self-report；烟台西港区专业化矿石码头，操作自动化与远程清舱分别描述；不是2026全港无人化。；当前任务：烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。；L99正文日；L99正文2021-12-22，与URL12-23区分，采用正文日正确。
- 残留/未替代范围：烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：干散货、舱型、抓斗路径与接料路线适配；烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；货运港口经营者属55；船方、引航、独立受托装卸/专业维修分别按执行者归属。本文只研究干散货船岸机械，不包含航行与集装箱。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-berth-002；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：干散货、舱型、抓斗路径与接料路线适配；烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；抓斗卸取单一输出，边舱残料和连续卸船为另路线条件。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：烟台2021与青岛2025官方汇编局部动作，非独立全班劳动验证。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；抓斗卸取单一输出，边舱残料和连续卸船为另路线条件。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-berth-003 · 操作连续卸船机卸取散货

已保留局部机制；完整任务替代尚未证实。 2017授权专利示教/逐面确认；只有局部机制和自述试验，无商业站点。

- 执行边界：货运港口经营者属55；船方、引航、独立受托装卸/专业维修分别按执行者归属。本文只研究干散货船岸机械，不包含航行与集装箱。
- 输入：舱内散货
- 输出：岸侧连续货流
- 验收：按指定路线连续输送
- 定义与粒度：链斗与抓斗是替代路线不加总同批卸货；保持链斗限定。
- 适用条件：链斗机构，不推广至螺旋、气吸等其他连续卸船机
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理552/正文545，6-30-05-01 起重装卸机械操作工，任务4（链斗种类由HJ表1限定）；角色：职业原文仅覆盖部分动作；bulk-mechanic任务4直接散料装卸，设备种类需HJ表1核。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism；2017授权专利示教/逐面确认；只有局部机制和自述试验，无商业站点。；未证范围：2017授权专利示教/逐面确认；只有局部机制和自述试验，无商业站点。 |
| 专机 | source-described-see-binding-role；partial-mechanism；2017授权专利示教/逐面确认；只有局部机制和自述试验，无商业站点。；未证范围：2017授权专利示教/逐面确认；只有局部机制和自述试验，无商业站点。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；2017授权专利示教/逐面确认；只有局部机制和自述试验，无商业站点。；未证范围：2017授权专利示教/逐面确认；只有局部机制和自述试验，无商业站点。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；2017授权专利示教/逐面确认；只有局部机制和自述试验，无商业站点。；未证范围：2017授权专利示教/逐面确认；只有局部机制和自述试验，无商业站点。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；2017授权专利示教/逐面确认；只有局部机制和自述试验，无商业站点。；未证范围：2017授权专利示教/逐面确认；只有局部机制和自述试验，无商业站点。 |

- CN-TP-CLAIM-CONTINUOUS · partial-mechanism：2017授权专利示教/逐面确认；只有局部机制和自述试验，无商业站点。；[CN105016099B 链斗式连续型卸船机全自动智能控制系统](https://patents.google.com/patent/CN105016099B/zh) · L101—105、L126—139、L173—176
- 部署层级：patent-with-self-described-testing-not-independent-deployment；2015公开A文本，2017B文本；手动示教与逐作业面确认，未提供具名持续用户。；当前任务：2017授权专利示教/逐面确认；只有局部机制和自述试验，无商业站点。；L43、L48，CN105016099B授权公告日；L43/48=2017-07-07授权公告；2015A初次公开另有，不当同日期。
- 残留/未替代范围：司机示教、逐作业面确认及必要干预；未给持续商用站点。；2017授权专利示教/逐面确认；只有局部机制和自述试验，无商业站点。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：2017授权专利示教/逐面确认；只有局部机制和自述试验，无商业站点。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：链斗机构，不推广至螺旋、气吸等其他连续卸船机；2017授权专利示教/逐面确认；只有局部机制和自述试验，无商业站点。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；货运港口经营者属55；船方、引航、独立受托装卸/专业维修分别按执行者归属。本文只研究干散货船岸机械，不包含航行与集装箱。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-berth-003；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：链斗机构，不推广至螺旋、气吸等其他连续卸船机；2017授权专利示教/逐面确认；只有局部机制和自述试验，无商业站点。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；链斗与抓斗是替代路线不加总同批卸货；保持链斗限定。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：2017授权专利示教/逐面确认；只有局部机制和自述试验，无商业站点。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；链斗与抓斗是替代路线不加总同批卸货；保持链斗限定。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-berth-004 · 操作连续装船机装入散货

已保留局部机制；完整任务替代尚未证实。 烟台换舱/联锁局部，不能证明全船配载和收尾。

- 执行边界：货运港口经营者属55；船方、引航、独立受托装卸/专业维修分别按执行者归属。本文只研究干散货船岸机械，不包含航行与集装箱。
- 输入：岸侧来料
- 输出：装入船舱货物
- 验收：来料按指定舱位装入
- 定义与粒度：将指定来料装指定舱可验，配载图审批作为输入。
- 适用条件：舱缘扫描、装船机定位与来料系统联动
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理552/正文545，6-30-05-01 起重装卸机械操作工，任务4；角色：职业原文仅覆盖部分动作；bulk-mechanic任务4散料装卸直接。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；烟台换舱/联锁局部，不能证明全船配载和收尾。；未证范围：烟台换舱/联锁局部，不能证明全船配载和收尾。 |
| 专机 | source-described-see-binding-role；partial-mechanism；烟台换舱/联锁局部，不能证明全船配载和收尾。；未证范围：烟台换舱/联锁局部，不能证明全船配载和收尾。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；烟台换舱/联锁局部，不能证明全船配载和收尾。；未证范围：烟台换舱/联锁局部，不能证明全船配载和收尾。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；烟台换舱/联锁局部，不能证明全船配载和收尾。；未证范围：烟台换舱/联锁局部，不能证明全船配载和收尾。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；烟台换舱/联锁局部，不能证明全船配载和收尾。；未证范围：烟台换舱/联锁局部，不能证明全船配载和收尾。 |

- CN-TP-CLAIM-YT-SHIPLOAD · partial-mechanism：烟台换舱/联锁局部，不能证明全船配载和收尾。；[烟台港干散货专业化码头控制技术正式发布](https://www.sd-port.com/groupMainNews/2021-12-23/658591897748504576.html) · L127—129
- 部署层级：operator-deployment-self-report；烟台西港区专业化矿石码头，操作自动化与远程清舱分别描述；不是2026全港无人化。；当前任务：烟台换舱/联锁局部，不能证明全船配载和收尾。；L99正文日；L99正文2021-12-22，与URL12-23区分，采用正文日正确。
- 残留/未替代范围：烟台换舱/联锁局部，不能证明全船配载和收尾。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：舱缘扫描、装船机定位与来料系统联动；烟台换舱/联锁局部，不能证明全船配载和收尾。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；货运港口经营者属55；船方、引航、独立受托装卸/专业维修分别按执行者归属。本文只研究干散货船岸机械，不包含航行与集装箱。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-berth-004；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：舱缘扫描、装船机定位与来料系统联动；烟台换舱/联锁局部，不能证明全船配载和收尾。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；将指定来料装指定舱可验，配载图审批作为输入。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：烟台换舱/联锁局部，不能证明全船配载和收尾。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；将指定来料装指定舱可验，配载图审批作为输入。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-berth-005 · 操作门座起重机装卸通用散货

已保留局部机制；完整任务替代尚未证实。 青岛门机防摇双机控制局部；吊具适配和接管未核。

- 执行边界：货运港口经营者属55；船方、引航、独立受托装卸/专业维修分别按执行者归属。本文只研究干散货船岸机械，不包含航行与集装箱。
- 输入：船岸待运散货
- 输出：目标接料点货物
- 验收：按指定方向完成吊运
- 定义与粒度：门机指定吊运为替代路线，和抓斗卸船重合设备需现场区分计量。
- 适用条件：按指定干散货门机与双机安全边界验证
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理552/正文545，6-30-05-01 起重装卸机械操作工，任务2、4；角色：职业原文仅覆盖部分动作；bulk-mechanic任务2/4起重散料操作直接。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism；青岛门机防摇双机控制局部；吊具适配和接管未核。；未证范围：青岛门机防摇双机控制局部；吊具适配和接管未核。 |
| 专机 | source-described-see-binding-role；partial-mechanism；青岛门机防摇双机控制局部；吊具适配和接管未核。；未证范围：青岛门机防摇双机控制局部；吊具适配和接管未核。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；青岛门机防摇双机控制局部；吊具适配和接管未核。；未证范围：青岛门机防摇双机控制局部；吊具适配和接管未核。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；青岛门机防摇双机控制局部；吊具适配和接管未核。；未证范围：青岛门机防摇双机控制局部；吊具适配和接管未核。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；青岛门机防摇双机控制局部；吊具适配和接管未核。；未证范围：青岛门机防摇双机控制局部；吊具适配和接管未核。 |

- CN-TP-CLAIM-MOT-PORT-CONTROL · partial-mechanism：青岛门机防摇双机控制局部；吊具适配和接管未核。；[交通强国建设试点典型案例集（第一辑）案例14、15](https://xxgk.mot.gov.cn/jigou/zhghs/202509/P020250916422010117400.pdf) · PDF第45页/印刷页41，L723—731
- 部署层级：official-case-report-of-operation；青岛港前港和国能黄骅港分别归属；部委案例汇编不等于独立现场审计。；当前任务：青岛门机防摇双机控制局部；吊具适配和接管未核。；PDF物理第1页封面，2025年9月；物理1封面2025年9月，只有月精度；URL发布日期日不推定为封面日。
- 残留/未替代范围：青岛门机防摇双机控制局部；吊具适配和接管未核。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：按指定干散货门机与双机安全边界验证；青岛门机防摇双机控制局部；吊具适配和接管未核。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；货运港口经营者属55；船方、引航、独立受托装卸/专业维修分别按执行者归属。本文只研究干散货船岸机械，不包含航行与集装箱。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-berth-005；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：按指定干散货门机与双机安全边界验证；青岛门机防摇双机控制局部；吊具适配和接管未核。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；门机指定吊运为替代路线，和抓斗卸船重合设备需现场区分计量。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：青岛门机防摇双机控制局部；吊具适配和接管未核。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；门机指定吊运为替代路线，和抓斗卸船重合设备需现场区分计量。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-berth-006 · 排查船岸装卸机械故障

本轮没有保留匹配机制；不据此判断技术不可行。 本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。

- 执行边界：货运港口经营者属55；船方、引航、独立受托装卸/专业维修分别按执行者归属。本文只研究干散货船岸机械，不包含航行与集装箱。
- 输入：异常设备
- 输出：故障排查结果与维修转交记录
- 验收：完成获授权范围内的排查，记录诊断结果、未确定问题及维修转交；不以设备已修复作为本诊断任务验收。
- 定义与粒度：标题排查，验收却已处置或移交，需限定为诊断结果/维修移交，不把完整修复混入。 实际修理、更换与恢复验证另待设备SOP定义，不计为本诊断已完成。
- 适用条件：区分诊断、断能、修理和重启许可
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理552/正文545，6-30-05-01 起重装卸机械操作工，任务8（故障处置任务族，未细分诊断）；角色：职业场景上下文；bulk-mechanic任务8排除故障，支持维修任务族，未细分诊断。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。；未证范围：本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。；未证范围：本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。；未证范围：本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。；未证范围：本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。；未证范围：本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。 |

- CN-TP-CLAIM-OUTSOURCE-MAINT · performer-and-human-context：本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。；[神华黄骅港运维项目](https://www.ccccyhj.com/article/38/detail-701.html) · L4—12
- CN-TP-CLAIM-PORT-CHECK-CONTEXT · workflow-human-context：本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。；[关于学习借鉴国投港口《港口生产标准作业法（卸船作业线）》的通知](https://jtyst.fujian.gov.cn/mzwgk/mzwzfxxgk/mzwzfxxgk/qtyzdgkdzfxx/202411/t20241105_6560445.htm) · L21、L40、L100—104、L114—123
- 部署层级：service-provider-historical-self-report；正文以2016年资料为背景，未给网页发布日期；外包运行维修责任案例，不证明自动维修。；当前任务：本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。；L4历史2016口径及2001起服务，不是网页日；L4正文历史2016口径/2001起服务；网页发布日期未知留null。
- 部署层级：operator-workflow-normative-context；文件成文2023-12-13，网页2024-11-05；检查与试操作等职责，不作为自动化部署。；当前任务：本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。；L21网页日；L40文件落款日；网页L21=2024-11-05，文件落款L40=2023-12-13，原双日期说明正确。
- 残留/未替代范围：本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：区分诊断、断能、修理和重启许可；本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；货运港口经营者属55；船方、引航、独立受托装卸/专业维修分别按执行者归属。本文只研究干散货船岸机械，不包含航行与集装箱。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 相邻/上下文来源（非本动作成功）：CN-TP-AUTO-PORT-MAINT；performer-and-human-context；本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。
- 相邻/上下文来源（非本动作成功）：CN-TP-AUTO-PORT-CONTINUOUS；workflow-human-context；本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-berth-006；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：区分诊断、断能、修理和重启许可；本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；标题排查，验收却已处置或移交，需限定为诊断结果/维修移交，不把完整修复混入。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：本轮未保留与船岸设备故障排查匹配的机制；所读作业法和外包职责仅支持人工检查、故障移交及责任范围。诊断输出、定位准确性和维修转交仍待验证，实际修理另待定义。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；标题排查，验收却已处置或移交，需限定为诊断结果/维修移交，不把完整修复混入。 实际修理、更换与恢复验证另待设备SOP定义，不计为本诊断已完成。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R06', 'R07']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-berth-007 · 保养船岸起重装卸机械

本轮没有保留匹配机制；不据此判断技术不可行。 历史外包职责只主体上下文，无已保留保养执行机制。

- 执行边界：货运港口经营者属55；船方、引航、独立受托装卸/专业维修分别按执行者归属。本文只研究干散货船岸机械，不包含航行与集装箱。
- 输入：待保养设备
- 输出：保养记录
- 验收：规定项目完成
- 定义与粒度：当前设备保养任务族，须按绳索/润滑/结构等可验项目继续盘点。
- 适用条件：起重、钢丝绳、润滑、结构及安全保护按设备清单
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理552/正文545，6-30-05-01 起重装卸机械操作工，任务8（保养任务族）；角色：职业原文直接列出动作（限所引文字）；bulk-mechanic任务8维护保养直接，细项清单缺。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；历史外包职责只主体上下文，无已保留保养执行机制。；未证范围：历史外包职责只主体上下文，无已保留保养执行机制。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；历史外包职责只主体上下文，无已保留保养执行机制。；未证范围：历史外包职责只主体上下文，无已保留保养执行机制。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；历史外包职责只主体上下文，无已保留保养执行机制。；未证范围：历史外包职责只主体上下文，无已保留保养执行机制。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；历史外包职责只主体上下文，无已保留保养执行机制。；未证范围：历史外包职责只主体上下文，无已保留保养执行机制。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；历史外包职责只主体上下文，无已保留保养执行机制。；未证范围：历史外包职责只主体上下文，无已保留保养执行机制。 |

- CN-TP-CLAIM-OUTSOURCE-MAINT · performer-and-human-context：历史外包职责只主体上下文，无已保留保养执行机制。；[神华黄骅港运维项目](https://www.ccccyhj.com/article/38/detail-701.html) · L4—12
- 部署层级：service-provider-historical-self-report；正文以2016年资料为背景，未给网页发布日期；外包运行维修责任案例，不证明自动维修。；当前任务：历史外包职责只主体上下文，无已保留保养执行机制。；L4历史2016口径及2001起服务，不是网页日；L4正文历史2016口径/2001起服务；网页发布日期未知留null。
- 残留/未替代范围：历史外包职责只主体上下文，无已保留保养执行机制。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：起重、钢丝绳、润滑、结构及安全保护按设备清单；历史外包职责只主体上下文，无已保留保养执行机制。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；货运港口经营者属55；船方、引航、独立受托装卸/专业维修分别按执行者归属。本文只研究干散货船岸机械，不包含航行与集装箱。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 相邻/上下文来源（非本动作成功）：CN-TP-AUTO-PORT-MAINT；performer-and-human-context；历史外包职责只主体上下文，无已保留保养执行机制。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-berth-007；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：起重、钢丝绳、润滑、结构及安全保护按设备清单；历史外包职责只主体上下文，无已保留保养执行机制。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；当前设备保养任务族，须按绳索/润滑/结构等可验项目继续盘点。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：历史外包职责只主体上下文，无已保留保养执行机制。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；当前设备保养任务族，须按绳索/润滑/结构等可验项目继续盘点。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R05', 'R07']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-yard-transfer-001 · 将到达散货堆放至指定堆位

已保留局部机制；完整任务替代尚未证实。 烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。

- 执行边界：港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 输入：来料
- 输出：指定货堆
- 验收：物料与堆位对应
- 定义与粒度：堆放到指定垛位输出可验，路线与后续输送不能重复核算。
- 适用条件：码头堆场坐标、堆位容量和物料模型可靠
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理553/正文546，6-30-05-03 输送机操作工，任务3—4（给/卸料，不是货堆堆料）；角色：职业场景上下文；conveyor553/546任务3—4是向输送机和料仓给卸料，非货堆堆放；可新引bulk-mechanic552/545任务4及堆取料机工种。
- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理552/正文545，6-30-05-01 起重装卸机械操作工，任务4及堆取料机司机工种；角色：职业原文仅覆盖部分动作；conveyor553/546任务3—4是向输送机和料仓给卸料，非货堆堆放；可新引bulk-mechanic552/545任务4及堆取料机工种。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism；烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。；未证范围：烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。 |
| 专机 | source-described-see-binding-role；partial-mechanism、partial-mechanism；烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。；未证范围：烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。；未证范围：烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。；未证范围：烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism、partial-mechanism；烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。；未证范围：烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。 |

- CN-TP-CLAIM-YT-PILE · partial-mechanism：烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。；[烟台港干散货专业化码头控制技术正式发布](https://www.sd-port.com/groupMainNews/2021-12-23/658591897748504576.html) · L120—122
- CN-TP-CLAIM-MOT-PORT-CONTROL · partial-mechanism：烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。；[交通强国建设试点典型案例集（第一辑）案例14、15](https://xxgk.mot.gov.cn/jigou/zhghs/202509/P020250916422010117400.pdf) · PDF第45页/印刷页41，L723—731
- 部署层级：official-case-report-of-operation；青岛港前港和国能黄骅港分别归属；部委案例汇编不等于独立现场审计。；当前任务：烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。；PDF物理第1页封面，2025年9月；物理1封面2025年9月，只有月精度；URL发布日期日不推定为封面日。
- 部署层级：operator-deployment-self-report；烟台西港区专业化矿石码头，操作自动化与远程清舱分别描述；不是2026全港无人化。；当前任务：烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。；L99正文日；L99正文2021-12-22，与URL12-23区分，采用正文日正确。
- 残留/未替代范围：烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：码头堆场坐标、堆位容量和物料模型可靠；烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-yard-transfer-001；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：码头堆场坐标、堆位容量和物料模型可靠；烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；堆放到指定垛位输出可验，路线与后续输送不能重复核算。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：烟台堆料寻址/青岛堆取改造局部，货类核真与实际堆界未证。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；堆放到指定垛位输出可验，路线与后续输送不能重复核算。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E10']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-yard-transfer-002 · 从指定货堆取出散货

已保留局部机制；完整任务替代尚未证实。 烟台定位恒流局部，自报且料堆变化和收尾工时缺。

- 执行边界：港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 输入：堆存货物
- 输出：后续输送来料
- 验收：货类和目标路线对应
- 定义与粒度：从指定货堆取出至下游输入可验。
- 适用条件：指定货垛与目标皮带路线连锁
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理553/正文546，6-30-05-03 输送机操作工，任务3—4（给/卸料，不是从货堆取料）；角色：职业场景上下文；输送机操作工任务3—4为输送机给卸料，仅上下文；起重装卸机械操作工任务4及堆取料机司机工种局部支持堆场取料。
- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理552/正文545，6-30-05-01 起重装卸机械操作工，任务4及堆取料机司机工种；角色：职业原文仅覆盖部分动作；输送机操作工任务3—4为输送机给卸料，仅上下文；起重装卸机械操作工任务4及堆取料机司机工种局部支持堆场取料。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；烟台定位恒流局部，自报且料堆变化和收尾工时缺。；未证范围：烟台定位恒流局部，自报且料堆变化和收尾工时缺。 |
| 专机 | source-described-see-binding-role；partial-mechanism；烟台定位恒流局部，自报且料堆变化和收尾工时缺。；未证范围：烟台定位恒流局部，自报且料堆变化和收尾工时缺。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；烟台定位恒流局部，自报且料堆变化和收尾工时缺。；未证范围：烟台定位恒流局部，自报且料堆变化和收尾工时缺。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；烟台定位恒流局部，自报且料堆变化和收尾工时缺。；未证范围：烟台定位恒流局部，自报且料堆变化和收尾工时缺。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；烟台定位恒流局部，自报且料堆变化和收尾工时缺。；未证范围：烟台定位恒流局部，自报且料堆变化和收尾工时缺。 |

- CN-TP-CLAIM-YT-PILE · partial-mechanism：烟台定位恒流局部，自报且料堆变化和收尾工时缺。；[烟台港干散货专业化码头控制技术正式发布](https://www.sd-port.com/groupMainNews/2021-12-23/658591897748504576.html) · L120—122
- 部署层级：operator-deployment-self-report；烟台西港区专业化矿石码头，操作自动化与远程清舱分别描述；不是2026全港无人化。；当前任务：烟台定位恒流局部，自报且料堆变化和收尾工时缺。；L99正文日；L99正文2021-12-22，与URL12-23区分，采用正文日正确。
- 残留/未替代范围：烟台定位恒流局部，自报且料堆变化和收尾工时缺。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：指定货垛与目标皮带路线连锁；烟台定位恒流局部，自报且料堆变化和收尾工时缺。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-yard-transfer-002；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：指定货垛与目标皮带路线连锁；烟台定位恒流局部，自报且料堆变化和收尾工时缺。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；从指定货堆取出至下游输入可验。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：烟台定位恒流局部，自报且料堆变化和收尾工时缺。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；从指定货堆取出至下游输入可验。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E10']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-yard-transfer-003 · 启动并操作输送机转运散货

已保留局部机制；完整任务替代尚未证实。 青岛皮带自动化局部；当前路线下游就绪与异常断能待核。

- 执行边界：港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 输入：接料点散货
- 输出：下游散货
- 验收：沿指定路线完成输送
- 定义与粒度：启动作为输送操作准备可保持单一输送输出，不机械拆。
- 适用条件：整条输送路径、下游准备和断能权限明确
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理553/正文546，6-30-05-03 输送机操作工，任务1；角色：职业原文直接列出动作（限所引文字）；conveyor任务1操作带式等输送机直接。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism；青岛皮带自动化局部；当前路线下游就绪与异常断能待核。；未证范围：青岛皮带自动化局部；当前路线下游就绪与异常断能待核。 |
| 专机 | source-described-see-binding-role；partial-mechanism；青岛皮带自动化局部；当前路线下游就绪与异常断能待核。；未证范围：青岛皮带自动化局部；当前路线下游就绪与异常断能待核。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；青岛皮带自动化局部；当前路线下游就绪与异常断能待核。；未证范围：青岛皮带自动化局部；当前路线下游就绪与异常断能待核。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；青岛皮带自动化局部；当前路线下游就绪与异常断能待核。；未证范围：青岛皮带自动化局部；当前路线下游就绪与异常断能待核。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；青岛皮带自动化局部；当前路线下游就绪与异常断能待核。；未证范围：青岛皮带自动化局部；当前路线下游就绪与异常断能待核。 |

- CN-TP-CLAIM-MOT-PORT-CONTROL · partial-mechanism：青岛皮带自动化局部；当前路线下游就绪与异常断能待核。；[交通强国建设试点典型案例集（第一辑）案例14、15](https://xxgk.mot.gov.cn/jigou/zhghs/202509/P020250916422010117400.pdf) · PDF第45页/印刷页41，L723—731
- 部署层级：official-case-report-of-operation；青岛港前港和国能黄骅港分别归属；部委案例汇编不等于独立现场审计。；当前任务：青岛皮带自动化局部；当前路线下游就绪与异常断能待核。；PDF物理第1页封面，2025年9月；物理1封面2025年9月，只有月精度；URL发布日期日不推定为封面日。
- 残留/未替代范围：青岛皮带自动化局部；当前路线下游就绪与异常断能待核。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：整条输送路径、下游准备和断能权限明确；青岛皮带自动化局部；当前路线下游就绪与异常断能待核。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-yard-transfer-003；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：整条输送路径、下游准备和断能权限明确；青岛皮带自动化局部；当前路线下游就绪与异常断能待核。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；启动作为输送操作准备可保持单一输送输出，不机械拆。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：青岛皮带自动化局部；当前路线下游就绪与异常断能待核。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；启动作为输送操作准备可保持单一输送输出，不机械拆。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-yard-transfer-004 · 向输送机给入散货

已保留局部机制；完整任务替代尚未证实。 黄骅煤种料位速度反馈局部，非所有给料器；MOT定位跨47—48。

- 执行边界：港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 输入：待转运散货
- 输出：连续输送来料
- 验收：给料与指定路线对应
- 定义与粒度：给入指定线路一输出；翻车给料环节与陆侧002同动作不双计。
- 适用条件：多煤种给料与本料位/设备接口匹配
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理553/正文546，6-30-05-03 输送机操作工，任务3；角色：职业原文直接列出动作（限所引文字）；conveyor任务3操作给料设备或手动装置上料直接。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism；黄骅煤种料位速度反馈局部，非所有给料器；MOT定位跨47—48。；未证范围：黄骅煤种料位速度反馈局部，非所有给料器；MOT定位跨47—48。 |
| 专机 | source-described-see-binding-role；partial-mechanism；黄骅煤种料位速度反馈局部，非所有给料器；MOT定位跨47—48。；未证范围：黄骅煤种料位速度反馈局部，非所有给料器；MOT定位跨47—48。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；黄骅煤种料位速度反馈局部，非所有给料器；MOT定位跨47—48。；未证范围：黄骅煤种料位速度反馈局部，非所有给料器；MOT定位跨47—48。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；黄骅煤种料位速度反馈局部，非所有给料器；MOT定位跨47—48。；未证范围：黄骅煤种料位速度反馈局部，非所有给料器；MOT定位跨47—48。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；黄骅煤种料位速度反馈局部，非所有给料器；MOT定位跨47—48。；未证范围：黄骅煤种料位速度反馈局部，非所有给料器；MOT定位跨47—48。 |

- CN-TP-CLAIM-MOT-TIPPLER · partial-mechanism：黄骅煤种料位速度反馈局部，非所有给料器；MOT定位跨47—48。；[交通强国建设试点典型案例集（第一辑）案例14、15](https://xxgk.mot.gov.cn/jigou/zhghs/202509/P020250916422010117400.pdf) · PDF第47—48页/印刷页43—44，L766—778
- 部署层级：official-case-report-of-operation；青岛港前港和国能黄骅港分别归属；部委案例汇编不等于独立现场审计。；当前任务：黄骅煤种料位速度反馈局部，非所有给料器；MOT定位跨47—48。；PDF物理第1页封面，2025年9月；物理1封面2025年9月，只有月精度；URL发布日期日不推定为封面日。
- 残留/未替代范围：运行模式仍以监护为主、操作为辅。；黄骅煤种料位速度反馈局部，非所有给料器；MOT定位跨47—48。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：黄骅煤种料位速度反馈局部，非所有给料器；MOT定位跨47—48。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：多煤种给料与本料位/设备接口匹配；黄骅煤种料位速度反馈局部，非所有给料器；MOT定位跨47—48。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-yard-transfer-004；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：多煤种给料与本料位/设备接口匹配；黄骅煤种料位速度反馈局部，非所有给料器；MOT定位跨47—48。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；给入指定线路一输出；翻车给料环节与陆侧002同动作不双计。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：黄骅煤种料位速度反馈局部，非所有给料器；MOT定位跨47—48。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；给入指定线路一输出；翻车给料环节与陆侧002同动作不双计。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E04']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-yard-transfer-005 · 调整卸料位置向指定料仓配料

本轮没有保留匹配机制；不据此判断技术不可行。 未匹配；不能以配煤/堆取控制代替移动卸料位置。

- 执行边界：港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 输入：输送散货
- 输出：指定仓内散货
- 验收：物料与目标仓对应
- 定义与粒度：指定仓分配输出清楚，卸料位置为完成该输出的控制动作。
- 适用条件：料仓、卸料小车或分料门类型先确定
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理553/正文546，6-30-05-03 输送机操作工，任务4；角色：职业原文直接列出动作（限所引文字）；conveyor任务4放料车/移动皮带/分料板向料仓放料直接。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；未匹配；不能以配煤/堆取控制代替移动卸料位置。；未证范围：未匹配；不能以配煤/堆取控制代替移动卸料位置。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；未匹配；不能以配煤/堆取控制代替移动卸料位置。；未证范围：未匹配；不能以配煤/堆取控制代替移动卸料位置。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；未匹配；不能以配煤/堆取控制代替移动卸料位置。；未证范围：未匹配；不能以配煤/堆取控制代替移动卸料位置。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；未匹配；不能以配煤/堆取控制代替移动卸料位置。；未证范围：未匹配；不能以配煤/堆取控制代替移动卸料位置。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；未匹配；不能以配煤/堆取控制代替移动卸料位置。；未证范围：未匹配；不能以配煤/堆取控制代替移动卸料位置。 |

- 残留/未替代范围：未匹配；不能以配煤/堆取控制代替移动卸料位置。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：料仓、卸料小车或分料门类型先确定；未匹配；不能以配煤/堆取控制代替移动卸料位置。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-yard-transfer-005；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：料仓、卸料小车或分料门类型先确定；未匹配；不能以配煤/堆取控制代替移动卸料位置。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；指定仓分配输出清楚，卸料位置为完成该输出的控制动作。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：未匹配；不能以配煤/堆取控制代替移动卸料位置。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；指定仓分配输出清楚，卸料位置为完成该输出的控制动作。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-yard-transfer-006 · 巡查输送机运行状态

已保留局部机制；完整任务替代尚未证实。 日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。

- 执行边界：港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 输入：运行输送机
- 输出：检查记录
- 验收：跑偏及部件异常被识别
- 定义与粒度：巡检记录可单验，跑偏和部件缺陷要具名判据。
- 适用条件：挂轨及巡检点与具体跑偏、托辊和带面异常一致
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理553/正文546，6-30-05-03 输送机操作工，任务2（检查运行）；角色：职业原文直接列出动作（限所引文字）；conveyor任务2检查运行直接。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。；未证范围：日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。 |
| 专机 | source-described-see-binding-role；partial-mechanism；日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。；未证范围：日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。 |
| 机器人 | source-described-see-binding-role；partial-mechanism；日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。；未证范围：日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。；未证范围：日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism、partial-mechanism；日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。；未证范围：日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。 |

- CN-TP-CLAIM-PORT-INSPECT · partial-mechanism：日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。；[山东日照港矿石管带运输智能化巡检项目](https://tetrabot.com/lists/456.html) · L53—59、L69
- CN-TP-CLAIM-MOT-PORT-DUST · partial-mechanism：日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。；[交通强国建设试点典型案例集（第一辑）案例14、15](https://xxgk.mot.gov.cn/jigou/zhghs/202509/P020250916422010117400.pdf) · PDF第45页/印刷页41，L732—738
- 部署层级：vendor-named-deployment-self-report；日照港指定管带廊道的挂轨巡检；不是自主维修，持续日期未披露。；当前任务：日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。；L53—59、69（所读产品正文未确认日期）；未列可核部署/发布日期，留null；具名日照港仍为供应商自报。
- 部署层级：official-case-report-of-operation；青岛港前港和国能黄骅港分别归属；部委案例汇编不等于独立现场审计。；当前任务：日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。；PDF物理第1页封面，2025年9月；物理1封面2025年9月，只有月精度；URL发布日期日不推定为封面日。
- 残留/未替代范围：报警后的确认与部件维修不在巡检功能内。；日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：挂轨及巡检点与具体跑偏、托辊和带面异常一致；日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-yard-transfer-006；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：挂轨及巡检点与具体跑偏、托辊和带面异常一致；日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；巡检记录可单验，跑偏和部件缺陷要具名判据。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：日照厂商挂轨与青岛官方巡检局部；不能扩成故障修复。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；巡检记录可单验，跑偏和部件缺陷要具名判据。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-yard-transfer-007 · 纠正输送带跑偏

已保留局部机制；完整任务替代尚未证实。 2008专利反馈纠偏机制局部，未核港口部署，不作停用/失效推断。

- 执行边界：港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 输入：跑偏输送带
- 输出：调整后设备
- 验收：恢复规定运行位置
- 定义与粒度：输送带位置恢复可单验，根因处理另条件。
- 适用条件：跑偏成因、带速、载荷及纠偏行程限值
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理553/正文546，6-30-05-03 输送机操作工，任务2（处理跑偏）；角色：职业原文直接列出动作（限所引文字）；conveyor任务2处理跑偏直接。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；2008专利反馈纠偏机制局部，未核港口部署，不作停用/失效推断。；未证范围：2008专利反馈纠偏机制局部，未核港口部署，不作停用/失效推断。 |
| 专机 | source-described-see-binding-role；partial-mechanism；2008专利反馈纠偏机制局部，未核港口部署，不作停用/失效推断。；未证范围：2008专利反馈纠偏机制局部，未核港口部署，不作停用/失效推断。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；2008专利反馈纠偏机制局部，未核港口部署，不作停用/失效推断。；未证范围：2008专利反馈纠偏机制局部，未核港口部署，不作停用/失效推断。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；2008专利反馈纠偏机制局部，未核港口部署，不作停用/失效推断。；未证范围：2008专利反馈纠偏机制局部，未核港口部署，不作停用/失效推断。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；2008专利反馈纠偏机制局部，未核港口部署，不作停用/失效推断。；未证范围：2008专利反馈纠偏机制局部，未核港口部署，不作停用/失效推断。 |

- CN-TP-CLAIM-BELT-FEEDBACK · partial-mechanism：2008专利反馈纠偏机制局部，未核港口部署，不作停用/失效推断。；[CN101244777A 输送带自动纠偏装置和方法](https://patents.google.com/patent/CN101244777A/zh) · L110—156
- 部署层级：patent-disclosure-not-deployment；跑偏测量反馈控制托辊角度的设计；非现行商业采用或根因全处置证据。；当前任务：2008专利反馈纠偏机制局部，未核港口部署，不作停用/失效推断。；L39、L42，CN101244777A公开时间线；L39/42公开2008-08-20；专利法律状态不当撤机失败。
- 残留/未替代范围：2008专利反馈纠偏机制局部，未核港口部署，不作停用/失效推断。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：跑偏成因、带速、载荷及纠偏行程限值；2008专利反馈纠偏机制局部，未核港口部署，不作停用/失效推断。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-yard-transfer-007；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：跑偏成因、带速、载荷及纠偏行程限值；2008专利反馈纠偏机制局部，未核港口部署，不作停用/失效推断。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；输送带位置恢复可单验，根因处理另条件。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：2008专利反馈纠偏机制局部，未核港口部署，不作停用/失效推断。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；输送带位置恢复可单验，根因处理另条件。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-yard-transfer-008 · 更换损坏的输送机托辊

本轮仅保留相邻机制或上下文；不视为本任务匹配部署。 王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。

- 执行边界：港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 输入：故障托辊
- 输出：更换后部件
- 验收：更换后检查符合设备要求
- 定义与粒度：一托辊更换且验收可单独计量。
- 适用条件：港口检修程序、举带空间和托辊接口另验
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理553/正文546，6-30-05-03 输送机操作工，任务2（更换托辊）；角色：职业原文直接列出动作（限所引文字）；conveyor任务2更换托辊直接。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。；未证范围：王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。；未证范围：王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。 |
| 机器人 | source-described-see-binding-role；adjacent-mechanism；王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。；未证范围：王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。；未证范围：王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。；未证范围：王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。 |

- CN-TP-CLAIM-IDLER-ADJACENT · adjacent-mechanism：王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。；[带式输送机不停机更换托辊机器人研究与应用](https://www.cmemo.org.cn/EN/10.3969/j.issn.1004-132X.2024.05.019) · L18、L37—46
- 部署层级：research-prototype-tests-adjacent-industry；王家岭煤矿地面及井下样机试验；不是港口部署，页面另列Online 2024-05-25。；当前任务：王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。；L18：Online与Published分别列示；L18分别Online2024-05-25、Published2024-06-26，原日可保留并并列日期类型。
- 残留/未替代范围：仅煤矿试验，港口断能条件、廊道尺寸和托辊接口须另核。；王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：港口检修程序、举带空间和托辊接口另验；王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 相邻/上下文来源（非本动作成功）：CN-TP-AUTO-BELT-IDLER；adjacent-mechanism；王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-yard-transfer-008；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：港口检修程序、举带空间和托辊接口另验；王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；一托辊更换且验收可单独计量。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：王家岭煤矿样机地面/井下试验保持相邻；港口不停机不可推。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；一托辊更换且验收可单独计量。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R07']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-yard-transfer-009 · 胶接损坏或更换的输送带

已保留局部机制；完整任务替代尚未证实。 硫化工具局部电热液压，材料准备及接头验收未自动证实。

- 执行边界：港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 输入：待连接输送带
- 输出：接头连接带
- 验收：连接满足设备使用要求
- 定义与粒度：一个合格接头可验，拆旧/端面处理作为条件按实际分工补。
- 适用条件：胶带结构、胶料、工艺曲线与电水条件
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理553/正文546，6-30-05-03 输送机操作工，任务6（限定胶接）；角色：职业原文直接列出动作（限所引文字）；conveyor任务6粘接/铆接/卡接胶带；本任务限定胶接。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；硫化工具局部电热液压，材料准备及接头验收未自动证实。；未证范围：硫化工具局部电热液压，材料准备及接头验收未自动证实。 |
| 专机 | source-described-see-binding-role；partial-mechanism；硫化工具局部电热液压，材料准备及接头验收未自动证实。；未证范围：硫化工具局部电热液压，材料准备及接头验收未自动证实。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；硫化工具局部电热液压，材料准备及接头验收未自动证实。；未证范围：硫化工具局部电热液压，材料准备及接头验收未自动证实。 |
| 辅助工具 | source-described-see-binding-role；partial-mechanism；硫化工具局部电热液压，材料准备及接头验收未自动证实。；未证范围：硫化工具局部电热液压，材料准备及接头验收未自动证实。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；硫化工具局部电热液压，材料准备及接头验收未自动证实。；未证范围：硫化工具局部电热液压，材料准备及接头验收未自动证实。 |

- CN-TP-CLAIM-VULCANIZE · partial-mechanism：硫化工具局部电热液压，材料准备及接头验收未自动证实。；[ZLJ系列组合式输送胶带硫化接头机](https://www.qdjuhang.cn/detail-50.html) · L8—10
- 部署层级：vendor-product-description；电加热、液压加压及水冷胶接工具，未证明自动备带或全接头验收。；当前任务：硫化工具局部电热液压，材料准备及接头验收未自动证实。；L8—10（所读产品正文未确认日期）；产品无可靠日期；侧栏2024等新闻日期不当产品发布日期。
- 残留/未替代范围：带端加工、组装、工艺选择和接头验收未说明自动完成。；硫化工具局部电热液压，材料准备及接头验收未自动证实。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：硫化工具局部电热液压，材料准备及接头验收未自动证实。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：胶带结构、胶料、工艺曲线与电水条件；硫化工具局部电热液压，材料准备及接头验收未自动证实。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-yard-transfer-009；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：胶带结构、胶料、工艺曲线与电水条件；硫化工具局部电热液压，材料准备及接头验收未自动证实。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；一个合格接头可验，拆旧/端面处理作为条件按实际分工补。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：硫化工具局部电热液压，材料准备及接头验收未自动证实。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；一个合格接头可验，拆旧/端面处理作为条件按实际分工补。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-yard-transfer-010 · 清扫输送机沿线撒料

本轮没有保留匹配机制；不据此判断技术不可行。 外包清扫职责仅执行者证据，无保留匹配地面收集机制。

- 执行边界：港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 输入：撒落散货
- 输出：清理后作业区
- 验收：散落物进入规定收集去向
- 定义与粒度：沿线撒料收集去向可验；带面清扫器不当同任务。
- 适用条件：撒料粒径、粉尘、沿线间隙和回收去向
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理553/正文546，6-30-05-03 输送机操作工，任务7（清扫落料）；角色：职业原文直接列出动作（限所引文字）；conveyor任务7清扫落料直接。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；外包清扫职责仅执行者证据，无保留匹配地面收集机制。；未证范围：外包清扫职责仅执行者证据，无保留匹配地面收集机制。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；外包清扫职责仅执行者证据，无保留匹配地面收集机制。；未证范围：外包清扫职责仅执行者证据，无保留匹配地面收集机制。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；外包清扫职责仅执行者证据，无保留匹配地面收集机制。；未证范围：外包清扫职责仅执行者证据，无保留匹配地面收集机制。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；外包清扫职责仅执行者证据，无保留匹配地面收集机制。；未证范围：外包清扫职责仅执行者证据，无保留匹配地面收集机制。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；外包清扫职责仅执行者证据，无保留匹配地面收集机制。；未证范围：外包清扫职责仅执行者证据，无保留匹配地面收集机制。 |

- CN-TP-CLAIM-OUTSOURCE-MAINT · performer-and-human-context：外包清扫职责仅执行者证据，无保留匹配地面收集机制。；[神华黄骅港运维项目](https://www.ccccyhj.com/article/38/detail-701.html) · L4—12
- 部署层级：service-provider-historical-self-report；正文以2016年资料为背景，未给网页发布日期；外包运行维修责任案例，不证明自动维修。；当前任务：外包清扫职责仅执行者证据，无保留匹配地面收集机制。；L4历史2016口径及2001起服务，不是网页日；L4正文历史2016口径/2001起服务；网页发布日期未知留null。
- 残留/未替代范围：外包清扫职责仅执行者证据，无保留匹配地面收集机制。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：撒料粒径、粉尘、沿线间隙和回收去向；外包清扫职责仅执行者证据，无保留匹配地面收集机制。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 相邻/上下文来源（非本动作成功）：CN-TP-AUTO-PORT-MAINT；performer-and-human-context；外包清扫职责仅执行者证据，无保留匹配地面收集机制。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-yard-transfer-010；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：撒料粒径、粉尘、沿线间隙和回收去向；外包清扫职责仅执行者证据，无保留匹配地面收集机制。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；沿线撒料收集去向可验；带面清扫器不当同任务。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：外包清扫职责仅执行者证据，无保留匹配地面收集机制。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；沿线撒料收集去向可验；带面清扫器不当同任务。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R07']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-yard-transfer-011 · 保养输送机及附属设施

本轮仅保留相邻机制或上下文；不视为本任务匹配部署。 外包责任不是自动维护机制。

- 执行边界：港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 输入：待维护设备
- 输出：维护记录
- 验收：规定项目完成
- 定义与粒度：维护任务族，不能宣称清单已穷尽，待SOP继续拆项目。
- 适用条件：部件故障工单与实际检修项目关联
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理553/正文546，6-30-05-03 输送机操作工，任务7（维护保养任务族）；角色：职业原文直接列出动作（限所引文字）；conveyor任务7维护保养直接。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；外包责任不是自动维护机制。；未证范围：外包责任不是自动维护机制。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；外包责任不是自动维护机制。；未证范围：外包责任不是自动维护机制。 |
| 机器人 | source-described-see-binding-role；adjacent-mechanism；外包责任不是自动维护机制。；未证范围：外包责任不是自动维护机制。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；外包责任不是自动维护机制。；未证范围：外包责任不是自动维护机制。 |
| 数字流程 | source-described-see-binding-role；adjacent-mechanism；外包责任不是自动维护机制。；未证范围：外包责任不是自动维护机制。 |

- CN-TP-CLAIM-PORT-INSPECT · adjacent-mechanism：外包责任不是自动维护机制。；[山东日照港矿石管带运输智能化巡检项目](https://tetrabot.com/lists/456.html) · L53—59、L69
- CN-TP-CLAIM-OUTSOURCE-MAINT · performer-and-human-context：外包责任不是自动维护机制。；[神华黄骅港运维项目](https://www.ccccyhj.com/article/38/detail-701.html) · L4—12
- 部署层级：vendor-named-deployment-self-report；日照港指定管带廊道的挂轨巡检；不是自主维修，持续日期未披露。；当前任务：外包责任不是自动维护机制。；L53—59、69（所读产品正文未确认日期）；未列可核部署/发布日期，留null；具名日照港仍为供应商自报。
- 部署层级：service-provider-historical-self-report；正文以2016年资料为背景，未给网页发布日期；外包运行维修责任案例，不证明自动维修。；当前任务：外包责任不是自动维护机制。；L4历史2016口径及2001起服务，不是网页日；L4正文历史2016口径/2001起服务；网页发布日期未知留null。
- 残留/未替代范围：报警后的确认与部件维修不在巡检功能内。；外包责任不是自动维护机制。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：外包责任不是自动维护机制。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：部件故障工单与实际检修项目关联；外包责任不是自动维护机制。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 相邻/上下文来源（非本动作成功）：CN-TP-AUTO-PORT-ROBOT；adjacent-mechanism；外包责任不是自动维护机制。
- 相邻/上下文来源（非本动作成功）：CN-TP-AUTO-PORT-MAINT；performer-and-human-context；外包责任不是自动维护机制。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-yard-transfer-011；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：部件故障工单与实际检修项目关联；外包责任不是自动维护机制。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；维护任务族，不能宣称清单已穷尽，待SOP继续拆项目。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：外包责任不是自动维护机制。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；维护任务族，不能宣称清单已穷尽，待SOP继续拆项目。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R05', 'R07']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-yard-transfer-012 · 运行输送单元抑尘除尘设施

已保留局部机制；完整任务替代尚未证实。 MOT监测联动喷淋只抑尘局部，排水缺证。

- 执行边界：港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 输入：尘源与除尘设施
- 输出：运行记录
- 验收：所选抑尘除尘单元按规定运行
- 定义与粒度：尘源控制与排水是不同目的/验收记录，建议2子候选；抑尘泵可并入抑尘系统但需明确用途。 有效显示仅尘源控制；职业水泵排水独立留在拟议子范围，本项MOT自动喷淋证据不支持排水。
- 适用条件：具体尘源、湿抑尘允许条件及供水压力
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理553/正文546，6-30-05-03 输送机操作工，任务5（除尘器用于除尘、水泵用于排水；本显示仅尘源控制）；角色：职业原文仅覆盖部分动作；conveyor任务5小除尘器和水泵对应除尘、排水；不能把原泵用途直接译成喷淋供水。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理10—11/正文7—8，§4.4表3—4；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。
- 子范围：除尘/抑尘；监测联动喷淋只作用于尘源控制。；状态：partial-mechanism
- 子范围：排水泵运行；职业任务5明确排水用途；工况、输出和自动化证据待补，不继承喷淋声明。；状态：proposed-scope-no-retained-mechanism
- 拟议子项（不新增、不继承查询或成功）：运行适配尘源的抑尘除尘设施；运行输送单元排水泵（具体条件待补）

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；MOT监测联动喷淋只抑尘局部，排水缺证。；未证范围：MOT监测联动喷淋只抑尘局部，排水缺证。 |
| 专机 | source-described-see-binding-role；partial-mechanism；MOT监测联动喷淋只抑尘局部，排水缺证。；未证范围：MOT监测联动喷淋只抑尘局部，排水缺证。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；MOT监测联动喷淋只抑尘局部，排水缺证。；未证范围：MOT监测联动喷淋只抑尘局部，排水缺证。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；MOT监测联动喷淋只抑尘局部，排水缺证。；未证范围：MOT监测联动喷淋只抑尘局部，排水缺证。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；MOT监测联动喷淋只抑尘局部，排水缺证。；未证范围：MOT监测联动喷淋只抑尘局部，排水缺证。 |

- CN-TP-CLAIM-MOT-PORT-DUST · partial-mechanism：MOT监测联动喷淋只抑尘局部，排水缺证。；[交通强国建设试点典型案例集（第一辑）案例14、15](https://xxgk.mot.gov.cn/jigou/zhghs/202509/P020250916422010117400.pdf) · PDF第45页/印刷页41，L732—738
- 部署层级：official-case-report-of-operation；青岛港前港和国能黄骅港分别归属；部委案例汇编不等于独立现场审计。；当前任务：MOT监测联动喷淋只抑尘局部，排水缺证。；PDF物理第1页封面，2025年9月；物理1封面2025年9月，只有月精度；URL发布日期日不推定为封面日。
- 残留/未替代范围：MOT监测联动喷淋只抑尘局部，排水缺证。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：具体尘源、湿抑尘允许条件及供水压力；MOT监测联动喷淋只抑尘局部，排水缺证。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；港口55厂界内堆取输送；独立装卸服务59、场外公路承运54和工业专修按实际执行者分别登记，不重复计全系统与组成任务。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-yard-transfer-012；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：具体尘源、湿抑尘允许条件及供水压力；MOT监测联动喷淋只抑尘局部，排水缺证。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；尘源控制与排水是不同目的/验收记录，建议2子候选；抑尘泵可并入抑尘系统但需明确用途。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：MOT监测联动喷淋只抑尘局部，排水缺证。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；尘源控制与排水是不同目的/验收记录，建议2子候选；抑尘泵可并入抑尘系统但需明确用途。 有效显示仅尘源控制；职业水泵排水独立留在拟议子范围，本项MOT自动喷淋证据不支持排水。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E11', 'R04']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-landside-001 · 检查陆侧装卸机械和作业机具

本轮没有保留匹配机制；不据此判断技术不可行。 服务商检查责任仅人工作业上下文，无全检查机制。

- 执行边界：港口经营者55的陆侧机械装卸；铁路列车驾驶53、场外货车54、独立装卸59另列，铁路装车机制不能推定已用于公路车辆。
- 输入：待开工设备
- 输出：检查结果
- 验收：符合本设备开工要求
- 定义与粒度：开工检查结果可单验，翻车/装车/流机项目分别补。
- 适用条件：本机具的机械和安全保护状态逐项验
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理552/正文545，6-30-05-01 起重装卸机械操作工，任务1；角色：职业原文直接列出动作（限所引文字）；bulk-mechanic任务1检查调整直接。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；服务商检查责任仅人工作业上下文，无全检查机制。；未证范围：服务商检查责任仅人工作业上下文，无全检查机制。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；服务商检查责任仅人工作业上下文，无全检查机制。；未证范围：服务商检查责任仅人工作业上下文，无全检查机制。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；服务商检查责任仅人工作业上下文，无全检查机制。；未证范围：服务商检查责任仅人工作业上下文，无全检查机制。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；服务商检查责任仅人工作业上下文，无全检查机制。；未证范围：服务商检查责任仅人工作业上下文，无全检查机制。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；服务商检查责任仅人工作业上下文，无全检查机制。；未证范围：服务商检查责任仅人工作业上下文，无全检查机制。 |

- CN-TP-CLAIM-OUTSOURCE-MAINT · performer-and-human-context：服务商检查责任仅人工作业上下文，无全检查机制。；[神华黄骅港运维项目](https://www.ccccyhj.com/article/38/detail-701.html) · L4—12
- 部署层级：service-provider-historical-self-report；正文以2016年资料为背景，未给网页发布日期；外包运行维修责任案例，不证明自动维修。；当前任务：服务商检查责任仅人工作业上下文，无全检查机制。；L4历史2016口径及2001起服务，不是网页日；L4正文历史2016口径/2001起服务；网页发布日期未知留null。
- 残留/未替代范围：服务商检查责任仅人工作业上下文，无全检查机制。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：本机具的机械和安全保护状态逐项验；服务商检查责任仅人工作业上下文，无全检查机制。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；港口经营者55的陆侧机械装卸；铁路列车驾驶53、场外货车54、独立装卸59另列，铁路装车机制不能推定已用于公路车辆。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 相邻/上下文来源（非本动作成功）：CN-TP-AUTO-PORT-MAINT；performer-and-human-context；服务商检查责任仅人工作业上下文，无全检查机制。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-landside-001；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：本机具的机械和安全保护状态逐项验；服务商检查责任仅人工作业上下文，无全检查机制。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；开工检查结果可单验，翻车/装车/流机项目分别补。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：服务商检查责任仅人工作业上下文，无全检查机制。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；开工检查结果可单验，翻车/装车/流机项目分别补。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R07']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-landside-002 · 操作翻车机卸出铁路敞车散货

已保留局部机制；完整任务替代尚未证实。 MOT黄骅翻堆取装/给料反馈局部；夹持定位、卸空检测未证，定位跨47—48。

- 执行边界：港口经营者55的陆侧机械装卸；铁路列车驾驶53、场外货车54、独立装卸59另列，铁路装车机制不能推定已用于公路车辆。
- 输入：装货铁路车辆
- 输出：卸出散货
- 验收：按指定接料路线卸货
- 定义与粒度：铁路敞车卸出为可验输出；与yard004同次给料只分摊一次。
- 适用条件：铁路敞车与翻车机匹配，接料路径准备完成
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理552/正文545，6-30-05-01 起重装卸机械操作工，任务7；角色：职业原文直接列出动作（限所引文字）；bulk-mechanic任务7翻转铁路车厢至料槽直接。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | source-described-see-binding-role；partial-mechanism；MOT黄骅翻堆取装/给料反馈局部；夹持定位、卸空检测未证，定位跨47—48。；未证范围：MOT黄骅翻堆取装/给料反馈局部；夹持定位、卸空检测未证，定位跨47—48。 |
| 专机 | source-described-see-binding-role；partial-mechanism；MOT黄骅翻堆取装/给料反馈局部；夹持定位、卸空检测未证，定位跨47—48。；未证范围：MOT黄骅翻堆取装/给料反馈局部；夹持定位、卸空检测未证，定位跨47—48。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；MOT黄骅翻堆取装/给料反馈局部；夹持定位、卸空检测未证，定位跨47—48。；未证范围：MOT黄骅翻堆取装/给料反馈局部；夹持定位、卸空检测未证，定位跨47—48。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；MOT黄骅翻堆取装/给料反馈局部；夹持定位、卸空检测未证，定位跨47—48。；未证范围：MOT黄骅翻堆取装/给料反馈局部；夹持定位、卸空检测未证，定位跨47—48。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；MOT黄骅翻堆取装/给料反馈局部；夹持定位、卸空检测未证，定位跨47—48。；未证范围：MOT黄骅翻堆取装/给料反馈局部；夹持定位、卸空检测未证，定位跨47—48。 |

- CN-TP-CLAIM-MOT-TIPPLER · partial-mechanism：MOT黄骅翻堆取装/给料反馈局部；夹持定位、卸空检测未证，定位跨47—48。；[交通强国建设试点典型案例集（第一辑）案例14、15](https://xxgk.mot.gov.cn/jigou/zhghs/202509/P020250916422010117400.pdf) · PDF第47—48页/印刷页43—44，L766—778
- 部署层级：official-case-report-of-operation；青岛港前港和国能黄骅港分别归属；部委案例汇编不等于独立现场审计。；当前任务：MOT黄骅翻堆取装/给料反馈局部；夹持定位、卸空检测未证，定位跨47—48。；PDF物理第1页封面，2025年9月；物理1封面2025年9月，只有月精度；URL发布日期日不推定为封面日。
- 残留/未替代范围：运行模式仍以监护为主、操作为辅。；MOT黄骅翻堆取装/给料反馈局部；夹持定位、卸空检测未证，定位跨47—48。；原文的人机关系见中央声明；跨场景映射以claimBindings的effectiveRole为准，不当本任务人工定额。
- 残留/未替代范围：MOT黄骅翻堆取装/给料反馈局部；夹持定位、卸空检测未证，定位跨47—48。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：铁路敞车与翻车机匹配，接料路径准备完成；MOT黄骅翻堆取装/给料反馈局部；夹持定位、卸空检测未证，定位跨47—48。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；港口经营者55的陆侧机械装卸；铁路列车驾驶53、场外货车54、独立装卸59另列，铁路装车机制不能推定已用于公路车辆。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-landside-002；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：铁路敞车与翻车机匹配，接料路径准备完成；MOT黄骅翻堆取装/给料反馈局部；夹持定位、卸空检测未证，定位跨47—48。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；铁路敞车卸出为可验输出；与yard004同次给料只分摊一次。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：MOT黄骅翻堆取装/给料反馈局部；夹持定位、卸空检测未证，定位跨47—48。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；铁路敞车卸出为可验输出；与yard004同次给料只分摊一次。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['E04']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-landside-003 · 操作装车机装入散货

已保留局部机制；完整任务替代尚未证实。 烟台铁路换厢翻板局部，不等同公路装车。

- 执行边界：港口经营者55的陆侧机械装卸；铁路列车驾驶53、场外货车54、独立装卸59另列，铁路装车机制不能推定已用于公路车辆。
- 输入：待装散货及车辆
- 输出：装货车辆
- 验收：物料与目标车辆对应
- 定义与粒度：装入目标车辆输出可验；本轮机制只铁路车厢。
- 适用条件：先限定铁路车厢，不能将车厢识别当公路卡车已验证
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理552/正文545，6-30-05-01 起重装卸机械操作工，任务4；角色：职业原文仅覆盖部分动作；bulk-mechanic任务4专用散货装卸直接。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；烟台铁路换厢翻板局部，不等同公路装车。；未证范围：烟台铁路换厢翻板局部，不等同公路装车。 |
| 专机 | source-described-see-binding-role；partial-mechanism；烟台铁路换厢翻板局部，不等同公路装车。；未证范围：烟台铁路换厢翻板局部，不等同公路装车。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；烟台铁路换厢翻板局部，不等同公路装车。；未证范围：烟台铁路换厢翻板局部，不等同公路装车。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；烟台铁路换厢翻板局部，不等同公路装车。；未证范围：烟台铁路换厢翻板局部，不等同公路装车。 |
| 数字流程 | source-described-see-binding-role；partial-mechanism；烟台铁路换厢翻板局部，不等同公路装车。；未证范围：烟台铁路换厢翻板局部，不等同公路装车。 |

- CN-TP-CLAIM-YT-RAILLOAD · partial-mechanism：烟台铁路换厢翻板局部，不等同公路装车。；[烟台港干散货专业化码头控制技术正式发布](https://www.sd-port.com/groupMainNews/2021-12-23/658591897748504576.html) · L116—118
- 部署层级：operator-deployment-self-report；烟台西港区专业化矿石码头，操作自动化与远程清舱分别描述；不是2026全港无人化。；当前任务：烟台铁路换厢翻板局部，不等同公路装车。；L99正文日；L99正文2021-12-22，与URL12-23区分，采用正文日正确。
- 残留/未替代范围：烟台铁路换厢翻板局部，不等同公路装车。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：先限定铁路车厢，不能将车厢识别当公路卡车已验证；烟台铁路换厢翻板局部，不等同公路装车。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；港口经营者55的陆侧机械装卸；铁路列车驾驶53、场外货车54、独立装卸59另列，铁路装车机制不能推定已用于公路车辆。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-landside-003；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：先限定铁路车厢，不能将车厢识别当公路卡车已验证；烟台铁路换厢翻板局部，不等同公路装车。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；装入目标车辆输出可验；本轮机制只铁路车厢。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：烟台铁路换厢翻板局部，不等同公路装车。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；装入目标车辆输出可验；本轮机制只铁路车厢。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-landside-004 · 操作抓斗或装载机装卸陆侧散货

本轮没有保留匹配机制；不据此判断技术不可行。 未匹配；船岸门机和堆料不能直接替代陆侧装载机。

- 执行边界：港口经营者55的陆侧机械装卸；铁路列车驾驶53、场外货车54、独立装卸59另列，铁路装车机制不能推定已用于公路车辆。
- 输入：散货和车辆
- 输出：装卸后散货
- 验收：完成指定装卸任务
- 定义与粒度：抓斗或装载机为替代路线，不因或字新增两份劳动；接料与散货规格待核。
- 适用条件：机型、抓斗/铲斗、货种和车体接近条件
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理552/正文545，6-30-05-01 起重装卸机械操作工，任务2、4（散料起重）；角色：职业原文仅覆盖部分动作；起重装卸机械操作工任务2/4局部支持散料起重；挖掘铲运和桩工机械司机任务1及装载机工种局部支持土石物料装载。港口具体货类适用与执行归属仍待核。
- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理553/正文546，6-30-05-05 挖掘铲运和桩工机械司机，任务1及装载机司机工种（土石物料；港口货类适用仍待核）；角色：职业原文仅覆盖部分动作；起重装卸机械操作工任务2/4局部支持散料起重；挖掘铲运和桩工机械司机任务1及装载机工种局部支持土石物料装载。港口具体货类适用与执行归属仍待核。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；未匹配；船岸门机和堆料不能直接替代陆侧装载机。；未证范围：未匹配；船岸门机和堆料不能直接替代陆侧装载机。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；未匹配；船岸门机和堆料不能直接替代陆侧装载机。；未证范围：未匹配；船岸门机和堆料不能直接替代陆侧装载机。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；未匹配；船岸门机和堆料不能直接替代陆侧装载机。；未证范围：未匹配；船岸门机和堆料不能直接替代陆侧装载机。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；未匹配；船岸门机和堆料不能直接替代陆侧装载机。；未证范围：未匹配；船岸门机和堆料不能直接替代陆侧装载机。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；未匹配；船岸门机和堆料不能直接替代陆侧装载机。；未证范围：未匹配；船岸门机和堆料不能直接替代陆侧装载机。 |

- 残留/未替代范围：未匹配；船岸门机和堆料不能直接替代陆侧装载机。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：机型、抓斗/铲斗、货种和车体接近条件；未匹配；船岸门机和堆料不能直接替代陆侧装载机。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；港口经营者55的陆侧机械装卸；铁路列车驾驶53、场外货车54、独立装卸59另列，铁路装车机制不能推定已用于公路车辆。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-landside-004；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：机型、抓斗/铲斗、货种和车体接近条件；未匹配；船岸门机和堆料不能直接替代陆侧装载机。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；抓斗或装载机为替代路线，不因或字新增两份劳动；接料与散货规格待核。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：未匹配；船岸门机和堆料不能直接替代陆侧装载机。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；抓斗或装载机为替代路线，不因或字新增两份劳动；接料与散货规格待核。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：[]；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-landside-005 · 排查陆侧装卸设备故障

本轮没有保留匹配机制；不据此判断技术不可行。 本轮未保留与陆侧设备故障排查匹配的机制；外包维护责任仅为执行者上下文。诊断结果、未确定问题和维修转交是当前验收范围，实际修理另待定义。

- 执行边界：港口经营者55的陆侧机械装卸；铁路列车驾驶53、场外货车54、独立装卸59另列，铁路装车机制不能推定已用于公路车辆。
- 输入：异常设备
- 输出：故障排查结果与维修转交记录
- 验收：完成获授权范围内的排查，记录诊断结果、未确定问题及维修转交；不以设备已修复作为本诊断任务验收。
- 定义与粒度：标题排查但验收处置/移交，收窄成诊断结果及维修转交；实际修理另候选。 实际修理、更换与恢复验证另待设备SOP定义，不计为本诊断已完成。
- 适用条件：按翻车机、装车机及流机故障类别验证
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理552/正文545，6-30-05-01 起重装卸机械操作工，任务8（故障处置任务族，未细分诊断）；角色：职业场景上下文；bulk-mechanic任务8故障处置任务族，未独立列诊断步骤。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；本轮未保留与陆侧设备故障排查匹配的机制；外包维护责任仅为执行者上下文。诊断结果、未确定问题和维修转交是当前验收范围，实际修理另待定义。；未证范围：本轮未保留与陆侧设备故障排查匹配的机制；外包维护责任仅为执行者上下文。诊断结果、未确定问题和维修转交是当前验收范围，实际修理另待定义。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；本轮未保留与陆侧设备故障排查匹配的机制；外包维护责任仅为执行者上下文。诊断结果、未确定问题和维修转交是当前验收范围，实际修理另待定义。；未证范围：本轮未保留与陆侧设备故障排查匹配的机制；外包维护责任仅为执行者上下文。诊断结果、未确定问题和维修转交是当前验收范围，实际修理另待定义。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；本轮未保留与陆侧设备故障排查匹配的机制；外包维护责任仅为执行者上下文。诊断结果、未确定问题和维修转交是当前验收范围，实际修理另待定义。；未证范围：本轮未保留与陆侧设备故障排查匹配的机制；外包维护责任仅为执行者上下文。诊断结果、未确定问题和维修转交是当前验收范围，实际修理另待定义。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；本轮未保留与陆侧设备故障排查匹配的机制；外包维护责任仅为执行者上下文。诊断结果、未确定问题和维修转交是当前验收范围，实际修理另待定义。；未证范围：本轮未保留与陆侧设备故障排查匹配的机制；外包维护责任仅为执行者上下文。诊断结果、未确定问题和维修转交是当前验收范围，实际修理另待定义。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；本轮未保留与陆侧设备故障排查匹配的机制；外包维护责任仅为执行者上下文。诊断结果、未确定问题和维修转交是当前验收范围，实际修理另待定义。；未证范围：本轮未保留与陆侧设备故障排查匹配的机制；外包维护责任仅为执行者上下文。诊断结果、未确定问题和维修转交是当前验收范围，实际修理另待定义。 |

- CN-TP-CLAIM-OUTSOURCE-MAINT · performer-and-human-context：本轮未保留与陆侧设备故障排查匹配的机制；外包维护责任仅为执行者上下文。诊断结果、未确定问题和维修转交是当前验收范围，实际修理另待定义。；[神华黄骅港运维项目](https://www.ccccyhj.com/article/38/detail-701.html) · L4—12
- 部署层级：service-provider-historical-self-report；正文以2016年资料为背景，未给网页发布日期；外包运行维修责任案例，不证明自动维修。；当前任务：本轮未保留与陆侧设备故障排查匹配的机制；外包维护责任仅为执行者上下文。诊断结果、未确定问题和维修转交是当前验收范围，实际修理另待定义。；L4历史2016口径及2001起服务，不是网页日；L4正文历史2016口径/2001起服务；网页发布日期未知留null。
- 残留/未替代范围：本轮未保留与陆侧设备故障排查匹配的机制；外包维护责任仅为执行者上下文。诊断结果、未确定问题和维修转交是当前验收范围，实际修理另待定义。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：按翻车机、装车机及流机故障类别验证；本轮未保留与陆侧设备故障排查匹配的机制；外包维护责任仅为执行者上下文。诊断结果、未确定问题和维修转交是当前验收范围，实际修理另待定义。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；港口经营者55的陆侧机械装卸；铁路列车驾驶53、场外货车54、独立装卸59另列，铁路装车机制不能推定已用于公路车辆。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 相邻/上下文来源（非本动作成功）：CN-TP-AUTO-PORT-MAINT；performer-and-human-context；本轮未保留与陆侧设备故障排查匹配的机制；外包维护责任仅为执行者上下文。诊断结果、未确定问题和维修转交是当前验收范围，实际修理另待定义。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-landside-005；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：按翻车机、装车机及流机故障类别验证；本轮未保留与陆侧设备故障排查匹配的机制；外包维护责任仅为执行者上下文。诊断结果、未确定问题和维修转交是当前验收范围，实际修理另待定义。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；标题排查但验收处置/移交，收窄成诊断结果及维修转交；实际修理另候选。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：本轮未保留与陆侧设备故障排查匹配的机制；外包维护责任仅为执行者上下文。诊断结果、未确定问题和维修转交是当前验收范围，实际修理另待定义。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；标题排查但验收处置/移交，收窄成诊断结果及维修转交；实际修理另候选。 实际修理、更换与恢复验证另待设备SOP定义，不计为本诊断已完成。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R06', 'R07']；C01、R08；作者已应用，仍待限定复检。

### cn-trans-bulk-landside-006 · 保养陆侧装卸机械及机具

本轮没有保留匹配机制；不据此判断技术不可行。 无已保留机械保养执行机制；未命中不等于技术不可行。

- 执行边界：港口经营者55的陆侧机械装卸；铁路列车驾驶53、场外货车54、独立装卸59另列，铁路装车机制不能推定已用于公路车辆。
- 输入：待保养设备
- 输出：保养记录
- 验收：规定项目完成
- 定义与粒度：保养任务族，需各机型项目与验收清单后扩展，不新增虚拟子数。
- 适用条件：作业间歇、保养工序和外包维修记录完整
- 人工：缺失。未取得本任务可复算整班工时或实际可取消现金工资；岗位描述、产品额定速度和系统整体减员均不换算本项人工占比。

- 定义引用：[中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf) · PDF物理552/正文545，6-30-05-01 起重装卸机械操作工，任务8（保养任务族）；角色：职业原文直接列出动作（限所引文字）；bulk-mechanic任务8保养直接，未覆盖每种工序。
- 定义引用：[排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf) · PDF物理7—8/正文4—5，§4.3.2表1—2；角色：流程、工艺或适用范围上下文；原文要求或范围不证明当前现场全动作、人数、验收阈值或商业部署。

| 路线 | 本轮结果与适用边界 |
|---|---|
| 传统机械 | no-retained-matching-mechanism-after-task-search；；无已保留机械保养执行机制；未命中不等于技术不可行。；未证范围：无已保留机械保养执行机制；未命中不等于技术不可行。 |
| 专机 | no-retained-matching-mechanism-after-task-search；；无已保留机械保养执行机制；未命中不等于技术不可行。；未证范围：无已保留机械保养执行机制；未命中不等于技术不可行。 |
| 机器人 | no-retained-matching-mechanism-after-task-search；；无已保留机械保养执行机制；未命中不等于技术不可行。；未证范围：无已保留机械保养执行机制；未命中不等于技术不可行。 |
| 辅助工具 | no-retained-matching-mechanism-after-task-search；；无已保留机械保养执行机制；未命中不等于技术不可行。；未证范围：无已保留机械保养执行机制；未命中不等于技术不可行。 |
| 数字流程 | no-retained-matching-mechanism-after-task-search；；无已保留机械保养执行机制；未命中不等于技术不可行。；未证范围：无已保留机械保养执行机制；未命中不等于技术不可行。 |

- CN-TP-CLAIM-OUTSOURCE-MAINT · performer-and-human-context：无已保留机械保养执行机制；未命中不等于技术不可行。；[神华黄骅港运维项目](https://www.ccccyhj.com/article/38/detail-701.html) · L4—12
- 部署层级：service-provider-historical-self-report；正文以2016年资料为背景，未给网页发布日期；外包运行维修责任案例，不证明自动维修。；当前任务：无已保留机械保养执行机制；未命中不等于技术不可行。；L4历史2016口径及2001起服务，不是网页日；L4正文历史2016口径/2001起服务；网页发布日期未知留null。
- 残留/未替代范围：无已保留机械保养执行机制；未命中不等于技术不可行。；；尚未证明被替代的范围，不推断必须人工或技术不可行。
- 技术待验证：在以下条件下，如何验证原子输出及异常边界：作业间歇、保养工序和外包维修记录完整；无已保留机械保养执行机制；未命中不等于技术不可行。
- 经济缺口：完整增量现金流和可取消人工缺失，不能因此认定不经济。
- 采用待验证：由谁购买、操作、验收与维护；港口经营者55的陆侧机械装卸；铁路列车驾驶53、场外货车54、独立装卸59另列，铁路装车机制不能推定已用于公路车辆。
- 失败/退出检索：每项真实正反回包联合筛选；专利失效、计划性能指标或无命中不证明撤机、商业退出或不存在失败。
- 正例边界：具名运行、历史采用、供应商自报、试验、专利和计划分开；不升格为2026持续商用整任务成功。
- 相邻/上下文来源（非本动作成功）：CN-TP-AUTO-PORT-MAINT；performer-and-human-context；无已保留机械保养执行机制；未命中不等于技术不可行。
- 实际查询编号：CN-TP-SEARCH-cn-trans-bulk-landside-006；请求文本、startedAtUTC/completedAtUTC与原始回包在同对象；没有独立调用前持久日志，不能由该对象证明写入先后。 94成对批和8专题批的联合结果；不拆成每查询独立候选排序，不声称逐候选网页全文全部重读。 首轮若干并行open共有起止区间，只证明批次区间而非各源精确完成瞬间。
- 现金：全部参数为空；同交付量与质量比较现金流；一码多节点、共用分拣/场院/码头系统和组成动作只分摊一次，用户与外包劳动不得遗漏。 后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 回报公式：`WC_inc_t = WC_project_t - WC_baseline_t; delta_WC_inc_t = WC_inc_t - WC_inc_(t-1); CF_t = avoidable_baseline_cash_labor_before_residual_t + demand_and_bottleneck_supported_incremental_contribution_t - project_residual_cash_labor_t - incremental_maintenance_consumables_energy_rent_service_t - incremental_exception_rework_downtime_t - incremental_taxes_t - delta_WC_inc_t - replacement_capex_t - incremental_exit_transfer_switch_cost_t; CF_0 = -(incremental_equipment_site_integration_training_commissioning_0 + incremental_initial_switch_downtime_0 + WC_inc_0); terminal_net_recovery_T added once only if evidenced; replacement_capex_t and incremental_exit_transfer_switch_cost_t are project-minus-baseline cash differences, allocated once at their actual occurrence; terminal costs already deducted in terminal_net_recovery_T are not deducted again`
- 盈亏门槛：设定T、r后，期初全增量投入（含WC_inc,0）的盈亏门槛 = Σ[t=1..T](CF_t/(1+r)^t) + 有依据且未在CF_t计入的期末净回收/(1+r)^T；所有输入和结果留空。 CF_t包含后续replacement_capex_t及退出/转场/切换成本差额；初期改造停产在CF_0单列一次，期末处置若已计净残值不得再扣。
- 待访谈：请在该场景核对：作业间歇、保养工序和外包维修记录完整；无已保留机械保养执行机制；未命中不等于技术不可行。；请保留本动作正常与异常各次投入、交接时间、供料/复核/保养及用户或外包劳动的原始记录。；请提供设备误报漏检、卡滞、撤机、弃购、停用及人工接管记录与统计分母。；请提供设备到部署、全周期维保和营运资金逐期差额；若以增产获益，请证明需求、瓶颈与下游承接。；保养任务族，需各机型项目与验收清单后扩展，不新增虚拟子数。；按本任务对象/输出取得实际作业SOP与正常、异常、未采用或停机记录。；完成C01逐期全增量现金输入后再计算；不存在参数不估回收期。；请提供项目与基准后续设备更换、停产转场切换、退出处置的发生期及现金差额，和已计停机/净残值逐笔去重。
- 证据缺口：无已保留机械保养执行机制；未命中不等于技术不可行。；2026目标现场持续部署、整班人工及停机数据尚待独立核实。；未取得完整逐期增量现金流。；职业职责与法规不证明本场景整班工时；场景SOP、异常与残留人工和真实可取消工资未完整取得。；未独立核实2026目标现场持续运行；旧报道、产品页和专利不能代替。；保养任务族，需各机型项目与验收清单后扩展，不新增虚拟子数。；独审已给限定定义与粒度裁决；本作者修订仍待限定复检，未冻结。；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- 独立裁决：['R05', 'R07']；C01、R08；作者已应用，仍待限定复检。

## 条件化机会

### CN-TP-OPP-01 · 收寄称重与面单贴附的局部改善

已有明确称重/读码与贴附机制，可以用同一真实收寄批次核对输出。

- 成立条件：码号、重量和地址接口可靠；保留验视与授权职责；低量网点应与普通秤和手持打印基线比较；各方案必须按各自任务/来源地点与阶段独立验证，不构成投资回报或全行业排序。
- 下一步验证：分包形记录首件、换耗材、异常重称/重贴和真实现金工资；核对全投入及停机，不使用额定速度估回报；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- [称重读码设备](https://www.cpte.com/product-detail/35) · L93—95、L140；视觉与电子称重取得码号、重量和体积信息；无具名用户。
- [自动打印贴标机的工作原理是什么？](https://www.videojet.com.cn/cn/homepage/resources/faqs/general/lpa-principle.html) · L120—131；打印及贴附功能；不证明收寄信息真实或快递企业已安装。

### CN-TP-OPP-02 · 按场地与件量选择半自动集包

有运营者明确未选大型设备的场景依据，可比较人工工具、半自动与全线改造。

- 成立条件：限定本网点可用空间及路向数；人工投袋扎袋独立计时；不要把其他站成本节约迁移；各方案必须按各自任务/来源地点与阶段独立验证，不构成投资回报或全行业排序。
- 下一步验证：观察整班峰谷件量、等待、错分回流和接管；同时索取弃购方案报价与空间约束；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- [东莞邮政创新提升物流仓配集包效率](https://www.chinapost.com.cn/cn/report/2404/5675-1.htm) · L37—42；东莞自研半自动集包，保留人工装袋；按场地和业务量选型。
- [东莞邮政创新提升物流仓配集包效率](https://www.chinapost.com.cn/cn/report/2404/5675-1.htm) · L39—42；东莞自研半自动集包，保留人工装袋；按场地和业务量选型。
- [“作业神器”让邮政“双11”服务更赞](https://www.chinapost.com.cn/cn/report/1911/9337-1.htm) · L37、L46、L55—56；不同城市案例分别识别；只取邮袋辅助与输送、人工扎袋及场地改造条件。

### CN-TP-OPP-03 · 车货交接记录与场院指令联动

操作记录与物理交接可对照审计，适于先找重复录入与误联数据。

- 成立条件：场院邮政案例迁至道路货站须另验证；司机、接发人员现场确认保留；状态不能早于实际发运；各方案必须按各自任务/来源地点与阶段独立验证，不构成投资回报或全行业排序。
- 下一步验证：抽查设备事件与录像/签收时点；记录网络中断和人工接管流程，核算系统共用成本；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- [数智化场院管理 处理中心数字化迈出新步伐](https://www.chinapost.com.cn/cn/report/2211/30021-1.htm) · L50—61、L65—72、L84—95；报道时运行一个多月；司机与接发调度人员仍现场交接。
- [物流业条形码读码器应用案例](https://www.keyence.com.cn/ss/products/auto_id/handheld-terminals/example/logistics.jsp) · L60—85、L105、L116；条码与物流数据采集功能；中国站不证明国内具名实际部署。

### CN-TP-OPP-04 · 干散货皮带巡检与人工维保衔接

存在具名廊道与官方巡检案例，但报警至修复劳动需要补齐。

- 成立条件：点位、可见范围和安装通道匹配；不能把煤矿换托辊样机当港口可用；外包维修按合同归属；各方案必须按各自任务/来源地点与阶段独立验证，不构成投资回报或全行业排序。
- 下一步验证：复核漏检/误报与实际故障台账；分开统计巡检、确认、断能和维修动作，并取得费用差额；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- [山东日照港矿石管带运输智能化巡检项目](https://tetrabot.com/lists/456.html) · L53—59、L69；日照港指定管带廊道的挂轨巡检；不是自主维修，持续日期未披露。
- [交通强国建设试点典型案例集（第一辑）案例14、15](https://xxgk.mot.gov.cn/jigou/zhghs/202509/P020250916422010117400.pdf) · PDF第45页/印刷页41，L732—738；青岛港前港和国能黄骅港分别归属；部委案例汇编不等于独立现场审计。
- [神华黄骅港运维项目](https://www.ccccyhj.com/article/38/detail-701.html) · L4—12；正文以2016年资料为背景，未给网页发布日期；外包运行维修责任案例，不证明自动维修。

### CN-TP-OPP-05 · 既有港机的控制改造与辅助胶接工具

具名自动动作与传统工序辅助工具可分别比较，不需要假设整港无人化。

- 成立条件：按煤种/矿种、舱型、轨道车厢和设备接口限定；监护、维修和收尾始终纳入测量；源案例的组合系统及子动作不重复记收益；各方案必须按各自任务/来源地点与阶段独立验证，不构成投资回报或全行业排序。
- 下一步验证：取同设备改造前后班次日志和验收标准；核对改造停产、传感器维护、调试及来船需求；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- [烟台港干散货专业化码头控制技术正式发布](https://www.sd-port.com/groupMainNews/2021-12-23/658591897748504576.html) · L99、L111—114；烟台西港区专业化矿石码头，操作自动化与远程清舱分别描述；不是2026全港无人化。
- [烟台港干散货专业化码头控制技术正式发布](https://www.sd-port.com/groupMainNews/2021-12-23/658591897748504576.html) · L120—122；烟台西港区专业化矿石码头，操作自动化与远程清舱分别描述；不是2026全港无人化。
- [烟台港干散货专业化码头控制技术正式发布](https://www.sd-port.com/groupMainNews/2021-12-23/658591897748504576.html) · L127—129；烟台西港区专业化矿石码头，操作自动化与远程清舱分别描述；不是2026全港无人化。
- [烟台港干散货专业化码头控制技术正式发布](https://www.sd-port.com/groupMainNews/2021-12-23/658591897748504576.html) · L116—118；烟台西港区专业化矿石码头，操作自动化与远程清舱分别描述；不是2026全港无人化。
- [交通强国建设试点典型案例集（第一辑）案例14、15](https://xxgk.mot.gov.cn/jigou/zhghs/202509/P020250916422010117400.pdf) · PDF第47—48页/印刷页43—44，L766—778；青岛港前港和国能黄骅港分别归属；部委案例汇编不等于独立现场审计。
- [ZLJ系列组合式输送胶带硫化接头机](https://www.qdjuhang.cn/detail-50.html) · L8—10；电加热、液压加压及水冷胶接工具，未证明自动备带或全接头验收。

### CN-TP-OPP-06 · 适配纸箱或托盘的货站装卸辅助

可将已读厂商描述的人控升降助力与纸箱机械臂路线按对象做实测；没有独立市场成熟度证据。

- 成立条件：国内具名机器人用户尚未独立验证；货物、车厢与装卸接口一致；异形货和破损件分流；各方案必须按各自任务/来源地点与阶段独立验证，不构成投资回报或全行业排序。
- 下一步验证：记录整车兼容件占比、准备和异常时间；取得本地运行用户及未采用客户回访；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- [机器人全自动装卸车解决方案](https://www.xyzrobotics.com.cn/publicity/robotic-loading-unloading-with-rocky-bing) · L47—52、L64；纸箱机器人装卸方案；页面日本和美国图片案例均不作为中国部署。
- [WJ系列紧凑型托盘搬运车](https://www.crown.com/zh-cn/forklifts/pallet-trucks/compact-pallet-truck-wj.html) · L24、L41—55、L94—101、L160—168；电动步行式托盘升降搬运；需要操作员，国内用户部署未提供。

### CN-TP-OPP-07 · 道路车辆检查辅助与限定自动驾驶试验

轮胎/重量数据与驾驶试验可分别核查，先明确可替代输出和残留驾驶责任。

- 成立条件：不把专利、检测站技术或测试道路升格承运全程部署；安全员及驾驶工资是否可取消必须有实际依据；各方案必须按各自任务/来源地点与阶段独立验证，不构成投资回报或全行业排序。；TPMS所列UDS只属卡车前装胎压胎温系统；轮胎数据、整车出车检查与驾驶试验分别取证。
- 下一步验证：索取当前车队车型、路线和2026运行资质/日志；核查全车检查、事故、货移报警和出车放行的真实关联；后续更换资本、退出/转场/切换支出均按项目相对基准的现金差额及实际发生期列出；初始改造停产、期中更换、期末退出分别计时，已经计入异常停机或处置净残值的同一笔支出不得重复扣除。
- [商用车胎压与胎温监测系统方案](https://www.saftire.com/) · L96—121；轮胎数据显示和挂车连接仅限所列胎压胎温监测方案；UDS 诊断位于卡车前装胎压（胎温）监测小节，不推整车诊断；无可审计承运车队清单。
- [CN213209231U 一种无人值守称重装置](https://patents.google.com/patent/CN213209231U/zh) · L89、L124；地磅称重实施例与清理推板设计；明确司机、门卫参与，非承运场站商用证明。
- [全国首个跨省市高速公路自动驾驶货运测试在京津塘高速正式启动](https://www.cmhighway.com/xwzx/qyxw/content/1991755486905913346_1991755500805836802.html) · L82—89；限定京津塘测试路段，主驾安全员；后续商业试运行是当时计划。

## 拆分与后续覆盖

7组15子项均为建议，原83任务计数不变。

- cn-trans-road-truck-007：检查在途车辆状态并记录；检查在途货物位移或装载状态并记录。0新增。
- cn-trans-road-truck-008：按预案停车并实施现场安全保护；报告故障或事故并形成可追溯通报；按获准预案实施具体实体应急处置（场景待补）。0新增。
- cn-trans-express-sort-003：开拆快件总包并输出散件；复核袋内快件数量重量规格并记录差异。0新增。
- cn-trans-express-sort-008：将同向快件集入总包；封闭并标识待发总包。0新增。
- cn-trans-express-lastmile-002：开拆末端到站总包；按投递地址分装散件。0新增。
- cn-trans-express-lastmile-011：核实无法投递且无法退回的状态；按制度保管无着快件并保留查询记录。0新增。
- cn-trans-bulk-yard-transfer-012：运行适配尘源的抑尘除尘设施；运行输送单元排水泵（具体条件待补）。0新增。

### 仍未覆盖的大类和场景

- 53 铁路运输业：本大类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点。待与国民经济行业分类及本项目主榜口径复核；登记不表示已研究
- 54 道路运输业：本大类其他模式及具体场景未覆盖，逐场景gaps继续拓展；不计算覆盖率。。待与国民经济行业分类及本项目主榜口径复核；登记不表示已研究
- 55 水上运输业：海洋内河船舶航行、轮机值守、系解缆和客运未覆盖；集装箱、液体散货与件杂货码头未覆盖；本规范仅适用干散货；货运港口为55水上运输业；58代理、59独立装卸、54场外承运按实际执行者登记，不能将同一任务计入多个行业。待与国民经济行业分类及本项目主榜口径复核；登记不表示已研究
- 56 航空运输业：本大类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点。待与国民经济行业分类及本项目主榜口径复核；登记不表示已研究
- 57 管道运输业：本大类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点。待与国民经济行业分类及本项目主榜口径复核；登记不表示已研究
- 58 多式联运和运输代理业：本大类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点。待与国民经济行业分类及本项目主榜口径复核；登记不表示已研究
- 59 装卸搬运和仓储业：本大类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点。待与国民经济行业分类及本项目主榜口径复核；登记不表示已研究
- 60 邮政业：本大类其他模式及具体场景未覆盖，逐场景gaps继续拓展；不计算覆盖率。。待与国民经济行业分类及本项目主榜口径复核；登记不表示已研究
- 54：客运、市内服务、危险品/大件/冷链及其清洗应急等未由本83覆盖。
- 55：海洋/内河航行、轮机、系解缆、港口调度/理货/取样、液散/集装箱/件杂货、船舱清扫和环保异常未全盘点。
- 60：国际通关、函件报刊、退件销毁、包装回收后清洁、网点设施维护、极端天气及特殊件未穷尽。
- 铁路53、航空56、管道57、多式联运代理58、独立装卸仓储59整类未盘点；本批不能宣称交通仓储邮政全行业完成。

道路货运、货站、快递与干散货港口8场景；53/56/57/58/59全大类及54/55/60剩余场景显式未覆盖。

未完成一手访谈、全行业全任务覆盖或研究冻结；讨论和评论也不自动成为研究事实。
