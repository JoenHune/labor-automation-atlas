# 中国非金属矿物、钢铁、有色金属、铸造 30—33 独立审校

结论：需要作者修订，修订后再做限定复检。133 个原任务保持不变，7 父项的 16 个拟议子项仍不计为新增；没有任务冻结或可计算回收期。

本轮复读 60 个保留来源的 113 条定位、6 份流程/职业 PDF 相关页，逐项审查 133 个任务。266 条主查询对应 67 个原合并批，12 条补查询对应 3 批。已核原请求及回包字段，没有重跑作者检索，也没有声称所有搜索候选网页均已读。

输入 raw `f753ed3090657493530afe30d6360e4c7e36fcc8cec2a6a321983416f55c179e`；audit `79ae47fbb2f7bff6a2884e3460a2081ba78f395489c4c68558c08b03e20a4922`；MD `d8d3dc40fbec0cecc4d0398afe327afd591faa247151874053005668b3823531`；validation `09e3796f8582a18a4c59115f966eb3a135573c329a03100dcd8663ae6d4f4a98`；inventory `5388db09742709d606032d030ced3985f802a6e221441b59cd1302064ee8983e`。实际字节已私有归档，作者文件未改。

## 确认问题与修改要求

### E01 · 网页更新日与发布日期、项目事件日期混用

TSZJJX 2026-07-27 与 HUASHUN 2019-02-21 明标更新时间，publishedAt 改 null 并另列 updatedAt；ROCKWELL-AL 原缓存 L60/本次网页 L75 明示 2018-08-02 发布，保留项目 2016-02 上线。同步 evidencePeriod、相关方案与审计来源日期。

来源：[CN-METAL-TSZJJX](https://www.tszjjx.com/Article-220712.html)（机械原理行26—29）；[CN-METAL-HUASHUN](https://huashunyy.com/Products/14.html)（用途/特点/概述行43—52）；[CN-METAL-ROCKWELL-AL](https://www.rockwellautomation.com.cn/company/news/case-studies/mpcxitongzhuli.html)（正文行24—32、48—56）

### E02 · 5 个网页工具 L 编号来源误声明为文本物理行号

RAMON 三源、CHALCO-CONTROL/ACS 的缓存是带 L 标签的网页工具文本；声明为 embedded-web-L-labels，哈希说明指工具文本缓存字节。不要把声明的 L148 等当文件第148行。原缓存哈希保留，引用和 sourceReads 同步。

### E03 · 来源陈述字段混入研究者边界判断

本裁决 claimDecisions 中指定的混合句应拆成 source fact 与 research boundary 两段，并分别标记；未给 proposedFact 的保守做法是整句改 research-judgment，不能把否定外推范围当直接事实。保留来源角色、限制及原定位。对应任务和机会的同句镜像同步，不用关键词对所有句子自动归类。

### E04 · 铁矿粉熔样与铁钢渣复测混入炼钢原料验收

铁矿粉加助熔剂是制样过程；助熔剂不是被验收的熔剂原料样品。砂眼二次制样在铁钢渣分析区。任务 001 限废钢及炼钢辅助原料，保留铁矿/煤系统为相邻场景，不认定该父任务直接检验链；FANGDA 保持调试范围。样片转移自动程度未说明，生产技术室审核须保留。把砂眼事件从当前任务 sourceBackedRequirements/directLimitingEvidence 移出并保留相邻反证。

来源：[CN-METAL-ANSTEEL](https://nginx-agxwcm.newsansteel.cn/agxwcm/epaper/content/202604/17/c175235.html)（正文行11—12）；[CN-METAL-ANSTEEL](https://nginx-agxwcm.newsansteel.cn/agxwcm/epaper/content/202604/17/c175235.html)（正文行15—18）

### E05 · 人工故障分析和维修行动被标为直接自动化方案

CUT-FAULT 对机械限位、电气信号的分析是作者排障经过；换传感器、改时序、确认补切是人工维修或工程改造。011 移为人工基线/历史经验，现稿无匹配自动诊断机制；012 的控制时序改良仅相邻防故障能力，不能称辅助工具已经替代维护。保留真实历史故障及改进，不因此推技术不可行。

来源：[CN-METAL-CUT-FAULT](https://www.ces-transaction.com/xhtml1/report/2201/1588-1.htm)（故障分析行36—43）；[CN-METAL-CUT-FAULT](https://www.ces-transaction.com/xhtml1/report/2201/1588-1.htm)（故障处理行45—59）

### E06 · 换辊维护可达性被扩大为人工外侧换辊机制

GREN-LEHR 只说运行中换辊无需进入安全区域，未写执行者、动力、工具或设备外侧。改为维护可达性陈述；浮法007/009从 direct 降 scope，压延007保留待适配并说明基底仅范围能力。既不证明人工方式，也不证明机器人，维护工作量继续 null。

来源：[CN-METAL-GREN-LEHR](https://www.grenzebach.com/en/products/production-technology/flat-glass/annealing-lehr/)（操作维护行387—388）

### E07 · 高分辨率/快速算法被改写为高速相机

RAMON-SURFACE 原文 L68–74 没有高速相机属性。删除该属性，保留表面图像获取、算法识别分类定位与报警，精整动作仍缺证。

来源：[CN-METAL-RAMON-SURFACE](https://m.ramon.com.cn/product/348.html)（正文L68—74）

### E08 · 内外尺寸误写为内外缺陷

ZEISS L60 的内外修饰尺寸；L62–63说明内部缺陷。改为内外尺寸与内部缺陷分别表述，不能将其当全部外观缺陷检验。同步任务013 A2、结论、条件及机会引用。

来源：[CN-METAL-ZEISS-CAST](https://www.zeiss.com.cn/metrology/industries/processes/casting.html)（X射线行60—68）

### E09 · 缺料预警不能确定补料和例外处置的人工身份

PEOPLE-TAP L183–184 支持人工室内启动、探头自动装拆及缺料预警；未交代补给/例外处理的执行者。事实里删保留补料和例外处置，把人员、工具和工时作为待访谈问题。

来源：[CN-METAL-PEOPLE-TAP](https://kpzg.people.com.cn/n1/2026/0227/c404214-40670996.html)（行181—184）

### E10 · 吸铝前赴槽定位错作出铝后运输局部

JIUGANG L35–37 是天车赴待作业槽、核对计划再启动吸铝。保留相邻准备能力，不能当已装铝包到下一工段的物理运输。XANWAY 调度/车辆呼叫仍支持当前任务局部数字流程，父任务不必降为全无机制。

来源：[CN-METAL-JIUGANG-AL](https://www.jiugang.com/news/article/3211)（正文行31、35—37）；[CN-METAL-XANWAY](https://www.xanway.com/solution/electrolytic-aluminium)（出铝全流程行95—100）

### R01 · 定位须覆盖声明的实际子句

ZIPPE-BATCH 的塔式直接入混合机补 L97–100；ROCKWELL 自动进料/燃料等补 L58（效果段，数字不采用）；水泥原料003职业任务1把计量原料定位改配料，不把鹏飞计量动作归给职业逐字原文。

来源：[CN-METAL-ZIPPE-BATCH](https://www.zippe.de/en/batch-plants/)（Inline plants行75—83）；[CN-METAL-ROCKWELL-AL](https://www.rockwellautomation.com.cn/company/news/case-studies/mpcxitongzhuli.html)（正文行24—32、48—56）

### R02 · 历史系统与实施前问题不能标为当前已核限制

CERI 2020 异常响应与 PEOPLE 2026 太钢系统是不同配置，不把前者列后者已核残留人工。ROCKWELL L42 开头明确系统设计实施前；改为历史基线约束。保留验证问题和历史反证，直接当前约束 false，移出当前 sourceBackedRequirements/directLimitingEvidence，或新增清楚的时期/配置字段后按角色展示。

来源：[CN-METAL-CERI](https://www.ceri.com.cn/xwzx/jcyw/202004/t20200409_5092.html)（安全预警行94—95）；[CN-METAL-ROCKWELL-AL](https://www.rockwellautomation.com.cn/company/news/case-studies/mpcxitongzhuli.html)（问题分析行42—47）

### R03 · 实验用途设备与已执行实验结果分开

CHALCO-CONTROL L303 是实验用途水浴分解槽能力介绍，无本批实验数据。A2 deploymentStage 明确 laboratory-device-description-no-test-results；lab 只表示实验场景的机制边界，不能显示为已完成实验验证。

来源：[CN-METAL-CHALCO-CONTROL](https://www.chalco.com.cn/kjcx/zdcg/cg/yhl/202012/t20201206_61261.html)（正文L303）

### R04 · 相邻父任务的同一混砂或换辊事件去重

砂型002/011同一水/黏土反馈可能是同一混砂循环；浮法007/009同一换辊可能只是不同管理分类。保留父ID和输出，另写接口与事件去重规则，未明确独立工时前不得累加。不要因为两个动词机械拆分，原7父16子建议仍0新增。

### C01 · 完整现金模型还需明确相邻期营运资金和后续更换/退出切换

现稿已有维护、税费、营运资金、更新资本与终期退出，且所有参数 null。补 ΔW_t=W_t−W_(t−1) 的余额/流量区别，期初占用与终期回收仅各一次；后续更新/退出时的停机、临时并行人工、重新集成/验证培训、旧设备处置/合同解约等按增量差额列 unknown/null，并与现有停机/维保/残值去重。给 NPV 与避免劳动现金门槛的可复算代数式；不得填报回收期或假设收益。

### G01 · 已读来源中的局部清洁/更换能力还需复核收录

JIUCHANG L118 定时自动振打清袋、CSM-ROBOT 的滑板油缸拆装和水口碗部清理已能指向具体动作。不能以未覆盖整套设备维护为理由排除所有局部机制；作者按父任务对象/作业触发补研并保留匹配或排除理由。新增来源或机制须再独审，不直接更改本裁决状态计数。

来源：[CN-METAL-JIUCHANG](https://www.chinajiuchang.cn/products/shengchanxian/p34.html)（规范化文本 L118，袋式收尘器定时振打）；[review-lead-CSM-ROBOT](https://www.csm.org.cn/col/col6317/art/2023/art_9ea00db9a8dc4a8bbc0038b0ecbde260.html)（作者缓存 L25–37、53–63；本次网页 L17–23、42、75–86）

### R05 · 排除候选与查询时间的证据层级可追溯

11 个 rejectedOrLimitedLeads 只有 key 和原因，公开补原 URL/出版者/读取结果定位（失败原文不伪造）。主67请求与回包、补3请求与回包均独立文件保存，字段一致；未另存执行源码，先保存再调用的写入先后仍是作者说明，不能称独立签名时间证明。补01/02本次实际有 receivedAtUTC，审计限制改为实存状态而非条件句。合并回包不能单条归因；五类别布尔不等于各自独立检索。

### R06 · 限定条件验收在来源事实句也须可见

CHALCO-SINTER 的阶段和任务正文已写限定条件，但 source.locators.sinter.claim 省略限定。补同一限定，保留最近测试/验收与长期运行未核，不扩大到常规持续商业运行。

来源：[CN-METAL-CHALCO-SINTER](https://zlwebsite.chinalco.com.cn/pub/zljt/xwzx/xwzx_qydt/202607/t20260701_172646.html)（正文行188—200）

### R07 · 企业自列生产设备与设备供应商角色分开

SINOTEC 已标为企业设备目录，但部分地域/方案元数据写成设备供应商说明。统一为企业自列砂型铸造产能与设备范围；具体厂址、验收与当前运行未核，不升级为商业验收。涉及砂型铸造 004/006/007/012。[原设备目录](https://www.sinotec.cn/sand-casting-capacity.html)，缓存 L58–129。

## 证据分级与可比边界

按本裁决必要降级，当前已保留记录分为：searched-adjacent 22；searched-direct 67；searched-insufficient-matched-evidence 22；searched-scope 18；searched-provisional 3；searched-lab 1。这只是待作者应用的状态，G01 的新增局部机制还没有加入。局部直接机制不表示直接商业部署；目录、相邻、适配待核与实验用途装置必须分开。

133 份 originalTask 与库存逐字段一致。职业公示稿只确认动作或职业范围，工艺表不是逐项操作 SOP。HJ846—2026 已发布但 2027-01-01 才实施，旧标准与历史资料保留原年代；本裁决未验证任何旧版标准在 2026 年的全面适用性。

真实历史故障、手动配置、设计限制、不同系统的残留人工和相邻深井铸造事故不互换。失败/退出仍有缺口；无匹配证据不能证明技术不可行。

## 现金与去重

原稿已有较完整成本框架，人工、资本、现金、NPV 和回收期全部空缺。本次补足要求是逐期营运资金余额差分、后续更新/退出切换的增量现金项目及去重。完整代数式在 JSON cashReview，恒定避免劳动现金只是门槛计算的明确假设，未填写任何数值。

同一砂混制反馈、换辊事件、温度/取样设备及维护事件不能因关联多个任务而重复累计工时或资本。外包作业依执行者行业归属，钢厂内废钢处理不能与独立回收行业重复归属。

## 查询审计

请求与回包分文件可读且字段匹配，主查询实际每任务一正一反；原始五类型布尔只表示本轮保留的方案类别。记录有批次 UTC，但执行源码未另存，调用前写入的事实仍依作者说明；本轮没有倒造独立时间证明。补 01/02 的回包 UTC 确实已保存，应把审计中的条件句改为实际状态。

所有公开候选 URL 均在相应原合并结果池找到，不能据此把每个候选归到某一条查询。Q022 只保留一份请求和回包，作者记载的保存误判没有导致重复检索记录。11 个排除线索需补 URL 与原文/读取失败定位。

## 逐任务裁决索引

下表 issue 指向上文及 JSON 中精确路径。每项还共同适用 C01 现金缺口、R05 审计层级说明。完整来源定位、方案与镜像路径、拆分边界和访谈问题见同名 decisions.json。

|任务 ID|任务|裁决后证据状态|须处理项|
|---|---|---|---|
|cn-ind-steel-charge-001|检查进厂炼钢原料质量（原料类别与可接收状态可追溯）|searched-adjacent|E03, E04|
|cn-ind-steel-charge-002|切割或破碎超规格废钢（尺寸按炉型装料要求确认）|searched-direct|E01|
|cn-ind-steel-charge-003|压块打包松散废钢（包块适合运输和装炉）|searched-direct|E01, E03|
|cn-ind-steel-charge-004|称量并配比炼钢原料（配料重量和种类对应炉次）|searched-adjacent|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-charge-005|吊装或输送炉料至装料位置（炉次与料位一致）|searched-adjacent|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-charge-006|接收并转运铁水包（容器与炉次标识一致）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-charge-007|操作混铁炉储存和均匀铁水（符合后续预处理或炼钢要求）|searched-adjacent|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-charge-008|对铁水实施炉外预处理（按炉次成分和工艺要求验收）|searched-adjacent|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-charge-009|排查原料处理设备故障（具备安全恢复条件）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-charge-010|保养原料加工与输送设备（维护项目按设备规程确认）|searched-insufficient-matched-evidence|G01|
|cn-ind-steel-charge-011|交付已预处理铁水及炉次记录（炉次原料质量和未结异常可追溯）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-refine-001|向炼钢炉装入已配炉料（炉料种类和加入量按炉次确认）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-refine-002|操纵氧枪向转炉吹氧（吹炼按转炉工艺终点要求确认）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-refine-003|操作电炉熔化炉料（熔化按电炉工艺条件确认）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-refine-004|加入造渣料并调整炉渣（按炉次渣系要求确认）|searched-direct|E02, E03|
|cn-ind-steel-refine-005|加入合金调整钢液成分（合金批次和加入量可追溯）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-refine-006|测量炉内钢液温度（结果与炉次和测点对应）|searched-direct|E03, E09|
|cn-ind-steel-refine-007|抽取钢液试样供成分检验（样品可追溯至炉次）|searched-direct|E03, E09|
|cn-ind-steel-refine-008|倾炉出钢至钢包（钢包和炉次一致且移交记录完整）|searched-direct|R02|
|cn-ind-steel-refine-009|排放炉渣至指定容器（不与成品钢液交付混计）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-refine-010|吹氩搅拌钢包内钢液（按精炼工艺确认均匀性条件）|searched-direct|E02|
|cn-ind-steel-refine-011|喂入精炼线材调整钢液（线材与加入量对应精炼要求）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-refine-012|加热精炼炉内钢液（温度记录满足炉次工艺要求）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-refine-013|抽真空处理钢液（真空工艺记录满足炉次要求）|searched-direct|E03|
|cn-ind-steel-refine-014|修补炉衬和出钢口（耐火材料及出钢口具备再投用条件）|searched-adjacent|E03|
|cn-ind-steel-refine-015|处置炼钢设备运行故障（安全条件确认后恢复）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-refine-016|转送精炼钢包至浇铸工段（炉次温度与成分记录对应）|searched-adjacent|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-continuous-cast-001|吊运钢包至连铸浇注位置（炉次与浇次对应）|searched-adjacent|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-continuous-cast-002|调节中间包钢液液面（满足连铸操作要求）|searched-adjacent|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-continuous-cast-003|向结晶器浇注钢液（按浇注条件保持连续供流）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-continuous-cast-004|清除浇注过程钢液表面浮渣（按浇注工艺避免夹杂带入）|searched-adjacent|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-continuous-cast-005|调节铸坯拉速（拉速与铸坯工艺相符）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-continuous-cast-006|调节铸坯二次冷却（冷却制度对应钢种断面）|searched-adjacent|E03|
|cn-ind-steel-continuous-cast-007|控制连铸电磁搅拌系统（按钢种工艺设置运行）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-continuous-cast-008|切割连续铸坯至规定长度（长度按订单和切割要求确认）|searched-direct|E03|
|cn-ind-steel-continuous-cast-009|检查并整理铸坯表面状态（表面问题与铸坯编号对应）|searched-direct|E02, E07|
|cn-ind-steel-continuous-cast-010|标识并运送铸坯至下道工段（钢种炉次与目的位置可追溯）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-steel-continuous-cast-011|排查连铸设备异常（达到恢复运行条件）|searched-insufficient-matched-evidence|E05|
|cn-ind-steel-continuous-cast-012|保养连铸机及附属设备（维护项目完成且状态有记录）|searched-adjacent|E05, G01|
|cn-ind-sand-foundry-001|核对铸造金属炉料及辅料批次（材质及批次满足目标铸件要求）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-sand-foundry-002|配制型砂芯砂及铸型涂料（配料和工艺性能依铸件要求确认）|searched-direct|R04|
|cn-ind-sand-foundry-003|使用造型设备或工具制成铸型（型腔几何及完整性满足工艺）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-sand-foundry-004|制成并烘干砂芯（芯形强度干燥条件符合工艺）|searched-scope|R07|
|cn-ind-sand-foundry-005|装配砂芯并合箱（定位和封合满足铸件工艺）|searched-scope|E03|
|cn-ind-sand-foundry-006|熔化炉料并调整金属液质量（温度成分纯净度按材质目标控制）|searched-scope|R07|
|cn-ind-sand-foundry-007|测量熔炼金属温度与成分（所需温度成分有可核对记录）|searched-scope|R07|
|cn-ind-sand-foundry-008|确认待浇型与金属液的批次匹配（材质型号和就绪状态相符）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-sand-foundry-009|将金属液浇入铸型并控制凝固冷却（浇冷过程按铸件工艺执行）|searched-scope|E03|
|cn-ind-sand-foundry-010|落砂分离铸件并回收旧砂（分离不损坏铸件且材料分流）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-sand-foundry-011|处理回用旧砂并补配新砂（再生质量及回用条件经确认）|searched-direct|E03, R04|
|cn-ind-sand-foundry-012|抛丸或打磨清理铸件表面（表面残砂和规定余量处理完成）|searched-scope|R07|
|cn-ind-sand-foundry-013|检查清理铸件尺寸表面及内部缺陷（检验方式和项目待产品图样SOP补核）|searched-direct|E03, E08|
|cn-ind-sand-foundry-014|修补准许返修的铸件缺陷（返修方案批准且复验符合用途要求）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-sand-foundry-015|隔离不可放行铸件并报告异常炉次（失效影响及去向待专业评审）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-sand-foundry-016|维护保养造型熔炼和清理工装（按设备规程检查复位）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-sand-foundry-017|标识合格铸件并交下一机械加工环节（批号材质质量状态对应）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-cement-rawmeal-001|破碎水泥原料（粒级满足后续粉磨路线）|searched-direct|E03|
|cn-ind-cement-rawmeal-002|烘干水泥原料（满足本工艺水分要求）|searched-direct|E03|
|cn-ind-cement-rawmeal-003|按生料配比配制水泥原料（组分符合本批配料要求）|searched-direct|E03, R01|
|cn-ind-cement-rawmeal-004|粉磨配合原料制成水泥生料（达到本线生料要求）|searched-direct|E03|
|cn-ind-cement-rawmeal-005|均化水泥生料（达到后续煅烧输入要求）|searched-direct|E03|
|cn-ind-cement-rawmeal-006|排查生料制备设备故障（故障已处置或移交）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-cement-rawmeal-007|保养生料制备设备（规定项目完成）|searched-adjacent|现有边界可保留；共同现金/审计修订|
|cn-ind-cement-clinker-001|预热水泥生料（满足所选窑线下游条件）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-cement-clinker-002|预分解水泥生料（达到本窑线分解要求）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-cement-clinker-003|煅烧生料形成水泥熟料（达到本产品煅烧要求）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-cement-clinker-004|冷却水泥熟料（达到储运与粉磨条件）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-cement-clinker-005|检测水泥线环保设施排放（记录所测项目及达标判断依据）|searched-direct|E03|
|cn-ind-cement-clinker-006|排查熟料生产设备故障（故障已处置或移交）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-cement-clinker-007|保养熟料生产设备（规定项目完成）|searched-adjacent|现有边界可保留；共同现金/审计修订|
|cn-ind-cement-grind-pack-001|破碎水泥熟料及缓凝剂（满足粉磨入料规格）|searched-direct|E03|
|cn-ind-cement-grind-pack-002|配混熟料与水泥用辅料（配比对应本产品）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-cement-grind-pack-003|烘干水泥混合料（满足粉磨条件）|searched-direct|E03|
|cn-ind-cement-grind-pack-004|粉磨水泥配合料（达到本产品粉磨要求）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-cement-grind-pack-005|分选水泥粉粒（各股物料进入规定去向）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-cement-grind-pack-006|将水泥计量装包（按产品规格完成包装）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-cement-grind-pack-007|将散装水泥装入运输容器（产品与容器及出料批次对应）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-cement-grind-pack-008|排查水泥粉磨包装设备故障（故障已处置或移交）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-cement-grind-pack-009|保养水泥粉磨包装设备（规定项目完成）|searched-adjacent|现有边界可保留；共同现金/审计修订|
|cn-ind-flatglass-melt-001|均化平板玻璃原料（达到本品种配料条件）|searched-adjacent|E03|
|cn-ind-flatglass-melt-002|称量玻璃配合料各组分（重量与配方对应）|searched-direct|E03, R01|
|cn-ind-flatglass-melt-003|混合玻璃配合料（符合本线混合要求）|searched-direct|E03, R01|
|cn-ind-flatglass-melt-004|输送玻璃配合料至窑头仓（批次与窑头仓对应）|searched-direct|E03|
|cn-ind-flatglass-melt-005|将配合料投进玻璃熔窑（供料与液面控制要求一致）|searched-direct|E03|
|cn-ind-flatglass-melt-006|调节玻璃熔窑燃烧条件（温压气氛满足本线熔化要求）|searched-scope|E03|
|cn-ind-flatglass-melt-007|切换玻璃熔窑预热空气方向（按适用窑型程序完成换向）|searched-scope|E03|
|cn-ind-flatglass-melt-008|取样检查玻璃液熔化缺陷（结石气泡等检查有记录）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-flatglass-melt-009|排查玻璃熔窑及设备故障（故障已处置或移交）|searched-scope|E03|
|cn-ind-flatglass-melt-010|检查维护玻璃窑炉及附属设备（规定项目完成）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-floatglass-form-001|将玻璃液送入锡槽（供液符合本线条件）|searched-scope|E03|
|cn-ind-floatglass-form-002|调控锡槽条件形成玻璃带（保护气氛及带形符合产品要求）|searched-scope|E03|
|cn-ind-floatglass-form-003|退火成型玻璃带（执行本产品退火程序）|searched-direct|E03|
|cn-ind-floatglass-form-004|切裁平板玻璃（切裁尺寸符合订单）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-floatglass-form-005|检查玻璃片质量（所检项目对应产品要求）|searched-direct|E03|
|cn-ind-floatglass-form-006|剔除不合格玻璃片（与合格品隔离）|searched-direct|E03|
|cn-ind-floatglass-form-007|更换成型设备的适用替换件（配置符合本产品）|searched-scope|E03, E06, R04|
|cn-ind-floatglass-form-008|排查浮法成型设备故障（故障已处置或移交）|searched-adjacent|E03|
|cn-ind-floatglass-form-009|维护浮法成型退火切裁设备（规定项目完成）|searched-scope|E03, E06, R04|
|cn-ind-rolledglass-form-001|操作压延成型机形成平板玻璃（达到本产品厚度和表面要求）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-rolledglass-form-002|将压延玻璃送入退火炉（按本线顺序输送）|searched-scope|E03|
|cn-ind-rolledglass-form-003|退火压延玻璃带（执行本产品退火程序）|searched-provisional|现有边界可保留；共同现金/审计修订|
|cn-ind-rolledglass-form-004|切裁压延平板玻璃（尺寸符合产品要求）|searched-provisional|现有边界可保留；共同现金/审计修订|
|cn-ind-rolledglass-form-005|检查压延玻璃片并记录结果（所检项目对应产品要求）|searched-adjacent|现有边界可保留；共同现金/审计修订|
|cn-ind-rolledglass-form-006|剔除不合格压延玻璃片（与合格品分离）|searched-adjacent|E03|
|cn-ind-rolledglass-form-007|保养压延成型退火切裁设备（规定项目完成）|searched-provisional|E03, E06|
|cn-ind-alumina-feed-001|破碎氧化铝生产用铝矿石（粒度达到本配浆工序要求）|searched-direct|E03|
|cn-ind-alumina-feed-002|均化氧化铝生产矿料（物料达到本配料要求）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-alumina-feed-003|将氧化铝原料磨制成原矿浆（浆料符合本溶出或烧结路线）|searched-scope|E02, E03|
|cn-ind-alumina-bayer-001|在高压溶出机组中处理铝矿浆（完成本拜耳法溶出工序）|searched-scope|E02, E03|
|cn-ind-alumina-bayer-002|分离氧化铝溶出浆液中的固体（达到本分离工序要求）|searched-scope|E02, E03|
|cn-ind-alumina-bayer-003|洗涤氧化铝赤泥（完成本赤泥洗涤工序）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-alumina-bayer-004|精制氧化铝粗液（达到本后续分解条件）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-alumina-bayer-005|从铝酸钠溶液分解氢氧化铝（完成本分解工序）|searched-lab|E02, E03, R03|
|cn-ind-alumina-bayer-006|蒸发增浓氧化铝分解母液（达到本循环使用条件）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-alumina-sinter-001|烧制氧化铝生料浆成熟料（完成本熟料烧结工序）|searched-direct|R06|
|cn-ind-alumina-sinter-002|破碎氧化铝烧结熟料（达到本熟料溶出条件）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-alumina-sinter-003|溶出氧化铝熟料制取浆液（完成本烧结法溶出工序）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-alumina-sinter-004|对适用铝酸钠溶液脱硅（达到本分解前要求）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-alumina-calcine-check-001|焙烧氢氧化铝制取氧化铝（完成本焙烧工序）|searched-direct|E01, R01, R02|
|cn-ind-alumina-calcine-check-002|检测氧化铝过程物料理化指标（完成本工序规定项目）|searched-adjacent|E03|
|cn-ind-alumina-calcine-check-003|检测氧化铝产品理化指标（完成本产品规定项目）|searched-adjacent|E03|
|cn-ind-al-electrolysis-operate-001|打壳开启电解铝投料部位（按本槽型完成打壳）|searched-direct|E03|
|cn-ind-al-electrolysis-operate-002|向电解铝槽加入氧化铝及适用氟化盐（投料按本槽型程序完成）|searched-scope|E03|
|cn-ind-al-electrolysis-operate-003|操作槽控机调整电解槽技术参数（本槽规定参数调整完成）|searched-direct|E02|
|cn-ind-al-electrolysis-operate-004|更换电解铝槽阳极（按本槽型更换要求完成）|searched-direct|E03|
|cn-ind-al-electrolysis-operate-005|使用阳极框架提升电解槽母线（完成本设备提升程序）|searched-direct|现有边界可保留；共同现金/审计修订|
|cn-ind-al-electrolysis-operate-006|从电解槽吸出铝液（按本出铝要求完成）|searched-direct|E03|
|cn-ind-al-electrolysis-operate-007|运送电解铝液至下一工段（对应本批流向及接收工段）|searched-direct|E03, E10|
|cn-ind-al-electrolysis-operate-008|测量电解槽阳极电流（规定测点完成测量记录）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-al-electrolysis-operate-009|测量电解质温度（规定测点完成测量记录）|searched-adjacent|现有边界可保留；共同现金/审计修订|
|cn-ind-al-cast-001|在混合炉中精炼原铝或适用合金（达到本铸锭前条件）|searched-insufficient-matched-evidence|现有边界可保留；共同现金/审计修订|
|cn-ind-al-cast-002|将精炼铝液铸造成型（形状与本铸造规格对应）|searched-direct|E03|
|cn-ind-al-cast-003|将适用铝锭打捆（捆装与本交付规格对应）|searched-direct|现有边界可保留；共同现金/审计修订|

## 尚未完成的研究范围

本批只覆盖水泥/平板玻璃、炼钢精炼连铸、铝冶炼和砂型铸造等 16 个场景。原文已经声明大量其他子行业未展开；本次补列的燃煤制备、除尘清理、连铸开浇组件及铝设备异常维护仍为后续盘点，0 新增。公开来源不能替代现场验收、完整 SOP、采用/退出原因和一手现金数据。

机器可回放裁决：[cn-industry-mineral-steel-nonferrous-foundry-30-33-automation-decisions.json](./cn-industry-mineral-steel-nonferrous-foundry-30-33-automation-decisions.json)。
