# 中国工业25—29：178项自动化首轮独立审校

结论：当前稿须按本报告修订后再做限定复检；可以保留为未冻结研究输入，不能据此宣称完整行业覆盖或通过最终验收。原作者稿、库存和网站未改。

本报告绑定结构化逐项裁决 `cn-industry-fuel-chemical-pharma-fiber-rubber-plastic-25-29-automation-decisions.json`，SHA256 `9c35d7261ac175a9b622bfc492b9813719fc00b9e9fd0d2e8211aa725bb42bc8`。审阅日期以 JSON 的实际 UTC 为准；作者研究资料截至 2026-09-09，未将跨午夜复核日期回填成原查询日期。

## 锁定输入

| 文件 | SHA256 |
|---|---|
| cn-industry-fuel-chemical-pharma-fiber-rubber-plastic-25-29.json | `19f105a88759355c0b7d351f581cfe429bbfd4a0ce2a8811655435e72044e25f` |
| cn-industry-fuel-chemical-pharma-fiber-rubber-plastic-25-29.md | `296a6a47b74e242f72e53b8544a7ccc912a8968483433fcae1cbd83396a30d97` |
| cn-industry-fuel-chemical-pharma-fiber-rubber-plastic-25-29-search-audit.json | `699e363f39b4aacd7e0b3c5c8a3b13dfdfb1d1981bbb5feaccd234d55ceb7fe8` |
| cn-industry-fuel-chemical-pharma-fiber-rubber-plastic-25-29-validation.json | `896c883058c7b2eb102a254b4beb0c7e8c7a4b74db61558a27eb2b2582f2c826` |
| cn-core-inventory-input.json | `5388db09742709d606032d030ced3985f802a6e221441b59cd1302064ee8983e` |

原始字节与完整库存快照保存于忽略目录 `research/.private/cn-chem-independent-review-19f1/`。子对象 SHA 用排序键、紧凑 JSON 的 UTF-8 编码，不能与整文件原始字节 SHA 混用。

## 独立执行与边界

逐项读取 178 个候选的动作、输入输出、定性验收、五类替代筛选、全部已列方案、反证及执行条件，并与锁定库存逐项比对。98 份自动化来源的 201 个已用定位读取相关正文、摘要或专利段；不声称读完全部网站、论文全文或整个专利。200 个短锚在准确定位匹配，1 个 Shell 短锚需纠正。

6 份定义 PDF 原字节 SHA 均复核一致。读了作者所列 38 个物理页，另补 HJ1104 第5—6页、HJ1102 第6—7及13页、HJ853 第26—28页，共46页；实际看7张页图。HJ853 第26页图有少数字形告警，但A.2/A.3表字段可辨，并结合文本核读；没有把坏字形当原文错误。职业材料是2022社会公示稿，正式版和现场SOP仍待核。HJ853—2026封面确认2026-07-31发布、2027-01-01实施，本轮只用工艺目录，未当2026现行操作要求。

对官方 GMP 和上海药监追溯公告进行了实际重新打开，保留请求、UTC和回包哈希。其余原文主要复读原作者缓存，不把读取缓存说成重新访问网页；没有重新执行作者的364条检索。机器检查仅用于重放字段、指纹和引用解析；语义裁决来自逐项原段阅读。

## 需要修订的核心问题

| 编号 | 裁决 | 具体处理 |
|---|---|---|
| E01 | confirmed-error | GMP厂房与设备条款错配，新增第41条精确定位 |
| E02 | confirmed-classification-error | 原文事实和研究边界混标direct-source-statement |
| E03 | metadata-correction | 四来源页面日期可恢复，更新与发布时间须区分 |
| E04 | confirmed-error | Shell三页共同哈希表示不实及circulation短锚非原文 |
| E05 | confirmed-support-attribution-error | 职业细项与HJ表、部分动作和场景背景混用 |
| E06 | confirmed-scope-error | 泵送方向、进料物态、皂坯、纯化水、黄化中间料范围 |
| E07 | confirmed-wording-or-mechanism-error | 加热阀/插嵌件/压片/手持扫码/柱塞/阀泵等不受所引段支持 |
| E08 | research-judgment-repair | 10任务按输入原文重定证据级别；不是技术不可行结论 |
| E09 | confirmed-applicability-or-classification-error | 相邻故障或正向报警被放入当前技术限制 |
| E10 | audit-provenance-limitation | 调用前时序断言须降为作者说明，保留匹配记录 |

E01：片剂现场、液体制剂现场、包装现场与生产环境消毒，不应由GMP第84条设备清洁直接支持。原缓存规范化行196—197、独审官方网页L307对应第41条厂房维护清洁及必要时消毒。新增精确定位后同步四任务的要求和引用；设备第84条保留。生产器具能否适用设备条款另留边界。依据：[GMP官方正文](https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2023/art_d5e1dbaa8f284277a5f6c3e2fc840d00.html)。

E02：46个具体定位把事实和“未核、不能证明、不是当前机制”等研究边界写成整条direct-source-statement。逐源清单已经给出。将来源事实与研究边界分栏，或整句降为研究判断；同步119个声明镜像中的受影响部分，不要求所有119条都有错误。1100个sourceId/locatorId引用结构均可解析，结构可解析不等于语义正确。

E03：金宗发布时间为2026-03-06（行16—18）；同墨标更新日期2026-03-17 11:25:34（行94—95）；海思纤发布时间2022-01-26 13:57:52（行59、65—66）；迅捷页面日期2014-03-14 15:43:52（行50、55）。保留原标签，更新日不冒充首次发布，网页日期不证明部署或持续运营。

E04：Shell三页共同4e90ca…指纹属于三页工具回包容器，不是各页规范化TXT；需改hashRepresentation或改用三页各自真实指纹，并明确L行号来源。FCC circulation原网页L52是“汽提塔和再生塔竖管”，短锚“立管”并非逐字原文。其他四个Shell短锚复核可接受，不能把初始文本行号解析不匹配误报成四个引文错误。

E05—E09：详细逐项修订见JSON，尤其固体先熔化后泵入；真空入主锅与泵出主锅不同；压模输入为已切皂坯；多效蒸馏入口为RO+EDI纯化水；黄化给料只涉及中间原料；“加热阀”“插嵌件”“干法压片后整粒”“柱塞/活塞”“阀泵”须按所引原段修正。加氢裂化的结焦摘要不能直接成为去杂加氢处理的技术障碍；灌装嘴堵塞只是过滤下游的使用条件；检测异常并报警是正向机制。

证据等级按当前输入有10项调整：轮胎成型、PUPSIT过滤、锦纶聚合、涤纶熔融、卷绕及化纤打包等不能仅凭类型清单说具体机制。液体洗涤剂灌装当前NPACK仅目录；本批另已读SIEHE活塞进出阀机理可供作者实际加入新引用后重新评估，不提前计入本次等级。天然香料蒸馏中的同墨烟草挥发油设备可保留受限机制，另一小试来源仍保留实验室层级。

## 查询审计

89个主批次共356条请求，每任务一正一负；另2组8条补查。公开queryId、任务、查询全文、日期、请求/收回UTC及结果池均与私有记录逐值一致，89个回包有内容。未把合并结果池的候选分配到某一条查询。

独立请求文件与结果文件确实存在，但没有额外保存调用前写入执行代码或工具运行转录；作者确认请求时钟通常两批并行共用。因此“调用前持久化”仅能写作者说明，不能声称已被独立证实。公开审计有3处断言需降低：auditBoundary及两组supplementalSearches.requestProvenance。原时刻保留，不补造逐查询时间。

SUP02前两条实际查询写作site.unimat.com.cn与site.xrite.com，没有site:算子，也没有工具domains过滤；不能称严格官方域限定检索。本轮已实际读用到的原发布者，但不由此升级旧查询范围。原查询都含具体动作，但一对查询不能代表所有技术别名、未采用经济原因或退出案例穷尽。

## 现金流与机会

178项各23个现金参数及NPV、回收期、盈亏工时均为空；人工人数、工时、工资与可撤销人工现金亦为空。模型已包含完整初始部署、初始营运资金、残留人工、维护、能源水、异常停机、保险合规税费、更新资本、年度营运资金变化及退出处置；增产受需求、瓶颈和下游有效产能约束。没有虚假回收期。

建议补明年度增量营运资金变化为ΔNWCₜ=NWC增量余额ₜ−NWC增量余额ₜ₋₁，并说明退出拆除/恢复/切换成本的范围；这两项是可复算表达的澄清，不是本批漏了更新资本。6条机会是条件性的研究优先方向，不是经济排名。OP1补材料适配限制定位，OP2补操作者观察/试压定位，OP3补悬浮液限制定位，OP6按活塞及泵阀原段修正。

## 覆盖和粒度

独审按当前输入分类如下；不是178个已获现场验证任务。

| 当前证据级别 | 任务数 |
|---|---:|
| 受限直接/局部机制 | 55 |
| 设备/路线目录 | 34 |
| 未获匹配机制 | 62 |
| 相邻场景证据 | 8 |
| 迁移适用待验证 | 8 |
| 仅实验室机制 | 2 |
| 专利设计机制 | 9 |

7个原作者拟拆父项保留，另有中垫胶涂敷/胎面贴合、锦纶物料接收/配制两父项的条件性建议，共9父项，新增计数为0。正常翻新修补、洗衣粉充填、液体洗涤剂灌装建议显示为作业，原phase与originalTask不改。原容器隧道、粘胶切断、润滑油调合共享映射保留；独立验收和成本分配未核前不凭多个动词拆分。

178项是32个已识别入口场景。炼焦煤加工、基础化工/肥料农药、原料药/生物药/中药、更多化纤和橡塑产品、异常维护交接细项仍未覆盖。不得将本轮条数当作完整行业任务总数。

## 逐任务裁决索引

每项的双路径角色、原始快照指纹、方案引用、反证、查询记录和修订路径见JSON；下表是逐项阅读结论。

| 稳定任务ID | 当前原文支持等级 | 个别修订代码 | 独立说明 |
|---|---|---|---|
| cn-ind-rubber-mixing-forming-001 | 受限直接/局部机制 | 保持边界/缺口 | 计量动作职业任务1直接支持；负压大料及独立小秤分别有据，批号核对仍缺，不能推全配方识别或工时。 |
| cn-ind-rubber-mixing-forming-002 | 受限直接/局部机制 | 保持边界/缺口 | 职业任务2包含破胶/塑炼/混炼；转子与下辅机只支持后两段。作者条件拆分保留，前段破胶不获自动机制。 |
| cn-ind-rubber-mixing-forming-003 | 设备/路线目录 | 保持边界/缺口 | 职业任务3两条产品路线，不强行并为一个循环；赛轮半成品仅目录，胶管表面条件限胶管，不泛化压延。 |
| cn-ind-rubber-mixing-forming-004 | 未获匹配机制 | 保持边界/缺口 | 职业任务3明确复贴纤维或钢丝帘线；本轮没有匹配新方案，实际层位与粘结验收需产品SOP。 |
| cn-ind-rubber-mixing-forming-005 | 设备/路线目录 | E05 | 职业任务3—4没有逐批确认或指定成型投料交接动作；显示定义角色应降上下游场景背景，候选保持proposed。集团物流目录不能补齐批次签认。 |
| cn-ind-rubber-mixing-forming-006 | 设备/路线目录 | E08 | 职业任务4给产品坯件范围；赛轮form仅成型机组合成胎胚的功能概括，无部件定位/组合执行原段，应将A1与任务降equipment-or-route-scope-only；胶管胶带继续缺证。 |
| cn-ind-rubber-mixing-forming-007 | 受限直接/局部机制 | 保持边界/缺口 | 职业任务5及赛轮硫化模腔温时压/自动装锅支持轮胎局部过程；参数、工厂、合格率均未继承。 |
| cn-ind-rubber-mixing-forming-008 | 设备/路线目录 | 保持边界/缺口 | 职业任务7支持检测动作，机器检验维度列表不代具体方法；外观仍人工的集团自述与质量全项验收分开。 |
| cn-ind-rubber-mixing-forming-009 | 设备/路线目录 | 保持边界/缺口 | 职业任务8支持排障范围；炼胶平台验收仅项目层，供应商胶管挤出故障原段可作限定约束，混合statement需分事实与研究边界。 |
| cn-ind-rubber-mixing-forming-010 | 未获匹配机制 | E05 | 返炼未硫化半成品与职业任务6废旧胶再生不是同物料工序。职业角色应为背景并保留候选；2011采访提供历史返炼语境，不能证明本厂批准或自动回炼。 |
| cn-ind-rubber-mixing-forming-011 | 未获匹配机制 | 保持边界/缺口 | 职业任务8支持检查维护范围；胶管挤出故障/检修不覆盖炼胶成型硫化全体设备，来源mixed statement及其镜像应分开。 |
| cn-ind-rubber-mixing-forming-012 | 未获匹配机制 | E05 | 职业任务9只支持记录保存，不支持实物交付。定义显示改部分动作支持并明确交付待核；已有记录/交付条件拆分不自动增计。 |
| cn-ind-tyre-retreading-001 | 设备/路线目录 | 保持边界/缺口 | 职业轮胎翻修任务2支持激光扫描胎体检验，不提供准入阈值；2011获奖设备列表适当只列目录。 |
| cn-ind-tyre-retreading-002 | 未获匹配机制 | 保持边界/缺口 | 职业任务1支持中垫胶与预硫化胎面，两物料配方和验收不同，保留作者拟拆0计数；本轮无匹配新机制。 |
| cn-ind-tyre-retreading-003 | 设备/路线目录 | R06 | 职业任务3是旧胎翻新中的正常修补步骤，建议显示phase为作业而非暗示制造不合格后的返工；历史线只目录无补片机理。 |
| cn-ind-tyre-retreading-004 | 设备/路线目录 | 保持边界/缺口 | 职业任务4直接支持削磨；所引2011目录未描述轮廓形成和余胎判定，保持目录与阈值缺口。 |
| cn-ind-tyre-retreading-005 | 受限直接/局部机制 | E05,R06 | 职业任务5只支持向已经粘中垫胶胎体缠贴胎面，铺中垫胶并非所引子条动作；VMI另有涂敷、移机和贴合机制，需分定义支持范围。可条件提议中垫胶涂敷与胎面贴合两独立输出，未核分核算不新增。 |
| cn-ind-tyre-retreading-006 | 受限直接/局部机制 | 保持边界/缺口 | 职业任务6支持罐硫化，2020匿名线的包封冷翻机制只限该路线；装套、当前产品与实际工时未核。 |
| cn-ind-tyre-retreading-007 | 相邻场景证据 | 保持边界/缺口 | 职业任务2成品检验有据；AT旧胎分类激光是相邻场景，原型/国外边界保留，不提供翻新成品放行。 |
| cn-ind-tyre-retreading-008 | 未获匹配机制 | E05 | 职业翻修条目无标识交付记录操作，显示职业角色降背景、任务保持proposed，不能把原职业存在当具体交付SOP。 |
| cn-ind-plastic-compounding-002 | 未获匹配机制 | 保持边界/缺口 | 职业任务1初混/捏合与HJ混料单元支持定义；未获新匹配机制，保持缺口，不由后段双螺杆造粒倒推初混替代。 |
| cn-ind-plastic-compounding-003 | 受限直接/局部机制 | E07 | 职业任务2混炼塑化造粒支持工步，三路线原文局部机制可保留；A3加热阀术语超出原文，按温控仪表/加热线路/阀组合改；按工序不同设备联合与共享核算，不仅三个动词机械拆分。 |
| cn-ind-plastic-compounding-004 | 受限直接/局部机制 | 保持边界/缺口 | 职业任务3测色明确；Ci64是手持辅助工具+测色数据，制样定位与基准仍人工/未知；选配事实和研究条件应分离，局部机制等级不变。 |
| cn-ind-plastic-extrusion-002 | 未获匹配机制 | 保持边界/缺口 | 职业任务4挤出型材明确，HJ78表列对应行业挤出单元；未获新方案仍留缺口，无须从橡胶挤出直接迁移。 |
| cn-ind-plastic-injection-002 | 受限直接/局部机制 | E07 | 职业任务5注塑成型与2023华南匿名塑料零件案例的射胶、保压冷却顶出过程适配；支持边界把匿名客户直接说成插嵌件客户超出所读原段，应去掉客户产品断言；机型通用适用含嵌件不等于自动放嵌件。 |
| cn-ind-tablet-granulate-press-001 | 未获匹配机制 | 保持边界/缺口 | 生产前准备职业1与GMP199/203支持；无匹配机制保持缺口。 |
| cn-ind-tablet-granulate-press-002 | 受限直接/局部机制 | 保持边界/缺口 | 职业计配与Xelum分包定量局部适配，保持非恒流/完整给料硬件缺口。 |
| cn-ind-tablet-granulate-press-003 | 未获匹配机制 | E05 | 粉碎直接定义来自HJ1063固体单元；职业3仅制剂成型，把表1粉碎写在职业角色下需改成两套支持。 |
| cn-ind-tablet-granulate-press-004 | 迁移适用待验证 | E05 | 同粉碎，HJ筛分与职业泛成型角色分开；干法辊压后颗粒筛分迁移到前端粉末筛分仍待验证。 |
| cn-ind-tablet-granulate-press-005 | 受限直接/局部机制 | E05 | HJ混合单元/职业计配及成型分别定位；天禾桨混合局部支持，不把表1内容归给职业。 |
| cn-ind-tablet-granulate-press-006 | 受限直接/局部机制 | E05 | HJ制粒与职业成型角色分开；湿法桨/切刀与干法辊压两路线局部；2018汤臣倍健产品药品属性未核，不作现行制药厂案例。 |
| cn-ind-tablet-granulate-press-007 | 受限直接/局部机制 | E05 | HJ干燥与职业成型角色分开；Xelum流化床制粒干燥同腔路线局部适配。 |
| cn-ind-tablet-granulate-press-008 | 迁移适用待验证 | E05,E07 | HJ整粒与职业泛成型区分；A1干法压片后整粒改辊压薄片/带后破碎整粒，避免成品片剂歧义；干湿迁移待验证。 |
| cn-ind-tablet-granulate-press-009 | 受限直接/局部机制 | E05 | HJ压片和职业成型角色精确化；模冲轨道压片局部适配，原料水分/间隙仅供应商条件，人工试片不据此估工时。 |
| cn-ind-tablet-granulate-press-010 | 受限直接/局部机制 | E05,R04 | HJ包衣与职业泛成型角色分开；锅内桨和喷枪HMI机制可保留，标准/选配与研究条件分离。 |
| cn-ind-tablet-granulate-press-011 | 未获匹配机制 | 保持边界/缺口 | 职业10故障维护支持定义；本轮无匹配自动排障，缺口不作技术不可行。 |
| cn-ind-tablet-granulate-press-012 | 未获匹配机制 | E01 | 职业11现场清洁有据，GMP84只设备不覆盖整个现场；换用实读41条厂房清洁，所有要求及声明镜像同步。 |
| cn-ind-tablet-granulate-press-013 | 未获匹配机制 | 保持边界/缺口 | 职业10、GMP72/79/80支持维护规范，无匹配新机制。 |
| cn-ind-sterile-liquid-fill-001 | 未获匹配机制 | 保持边界/缺口 | 职业准备+GMP199/203支持，无自动化匹配保持。 |
| cn-ind-sterile-liquid-fill-002 | 设备/路线目录 | 保持边界/缺口 | 职业称量计配直接；温控配制罐不证明计量，保留设备目录等级。 |
| cn-ind-sterile-liquid-fill-003 | 设备/路线目录 | 保持边界/缺口 | 职业成型/配制泛范围，模块罐仅目录，保持具体配制机制缺口。 |
| cn-ind-sterile-liquid-fill-004 | 迁移适用待验证 | E05 | 职业4和HJ容器清洗支持；口服瓶超声喷洗机制真实，但注射迁移待验证。原场景包含口服与注射，显示具体支路后再定，不自动升级。 |
| cn-ind-sterile-liquid-fill-005 | 受限直接/局部机制 | 保持边界/缺口 | 职业4/HJ容器干燥支持；HQL热风只预洗耐热容器，和灭菌共享周期不重复计收益。 |
| cn-ind-sterile-liquid-fill-006 | 受限直接/局部机制 | 保持边界/缺口 | 职业5/HJ灭菌支持；HQL仅耐热容器部分，其他器具另核；保留作者条件拆分而不新增。 |
| cn-ind-sterile-liquid-fill-007 | 设备/路线目录 | E05,E08,R04 | 过滤具体定义来自HJ液体单元，职业泛成型不得冒称表1；PUPSIT只用途/构件目录，没有当前料液处理机制，应降设备路线范围。 |
| cn-ind-sterile-liquid-fill-008 | 受限直接/局部机制 | E05 | 职业3/HJ灌装，泵/质量或时压分支局部适配，完整无菌验证留空。 |
| cn-ind-sterile-liquid-fill-009 | 受限直接/局部机制 | E05 | 职业3泛成型和HJ安瓿拉丝灌封范围分开；安瓿火焰与胶塞容器路线不合并验收。 |
| cn-ind-sterile-liquid-fill-010 | 受限直接/局部机制 | 保持边界/缺口 | 职业8明确灭菌后灯检；相机照明局部适配，悬浮液另条件，不替代CCIT/无菌放行。 |
| cn-ind-sterile-liquid-fill-011 | 未获匹配机制 | 保持边界/缺口 | 职业10异常维护支持，无匹配自动机制。 |
| cn-ind-sterile-liquid-fill-012 | 未获匹配机制 | E01 | 职业11现场清洁直接；GMP84设备条款误作现场，改41条并同步镜像。 |
| cn-ind-drug-pack-trace-001 | 设备/路线目录 | 保持边界/缺口 | 职业9分装直接；楚天二次包装目录不证明药品计数/计量分装，保持目录；与实际灌装/包装输出避免重复。 |
| cn-ind-drug-pack-trace-002 | 设备/路线目录 | 保持边界/缺口 | 职业9包装直接，原文只包装工序目录，缺具体执行机构和品种包装SOP。 |
| cn-ind-drug-pack-trace-003 | 受限直接/局部机制 | E07,E09 | MTS视觉码/箱级关联局部适配；UROVO手持只仓储扫码/RFID，打印来自独立打印机与贴标，不可把手持写成打印采集。冷库条件限定低温，不是常温故障。 |
| cn-ind-drug-pack-trace-004 | 未获匹配机制 | E05 | 职业12仅填写记录，移交未明确；GMP记录管理不能替代本批交接SOP，显示部分定义支持和交接缺口，不机械拆单一输出。 |
| cn-ind-drug-pack-trace-005 | 未获匹配机制 | E01 | 职业11清洁有据；GMP84设备不等于现场，改41条。 |
| cn-ind-drug-water-cleanroom-001 | 受限直接/局部机制 | E06 | 职业6制药用水有据；MOLE蒸馏机制原料为RO+EDI纯化水，任务输入原水，方案/执行条件须限定后段蒸馏并保留前处理独立缺口。 |
| cn-ind-drug-water-cleanroom-002 | 未获匹配机制 | 保持边界/缺口 | 职业7净化空气与GMP48规范有据，无匹配机制；source air事实和部署判断分离。 |
| cn-ind-drug-water-cleanroom-003 | 未获匹配机制 | E01 | 职业7环境消毒有据；GMP84设备误扩环境，改厂房41条必要消毒。 |
| cn-ind-drug-water-cleanroom-004 | 受限直接/局部机制 | R02 | 职业7设备消毒直接，纯蒸汽SIP设备罐管路灭菌仅水系统部分；方案补实际纯蒸汽机制，消毒与灭菌程序验收不可自动等同，当前范围可保留局部。 |
| cn-ind-drug-water-cleanroom-005 | 未获匹配机制 | R01 | 职业7器具消毒支持；GMP84只生产设备，不能不加说明覆盖全部器具；其角色限设备背景并保留器具具体规程缺口。 |
| cn-ind-drug-water-cleanroom-006 | 未获匹配机制 | 保持边界/缺口 | 职业10与GMP设备维护直接范围；公辅跨线/外包边界已在条件中，未有新自动化机制。 |
| cn-ind-detergent-spray-powder-001 | 受限直接/局部机制 | 保持边界/缺口 | 职业1及HJ前配料输送支持；AZO气力输送局部，人工拆包/接收接口不自动完成。 |
| cn-ind-detergent-spray-powder-002 | 未获匹配机制 | 保持边界/缺口 | 职业2直接中和，HJ只制浆工段背景；未匹配新机制保持缺口。 |
| cn-ind-detergent-spray-powder-003 | 未获匹配机制 | 保持边界/缺口 | 职业3配成料浆与HJ混合制浆匹配；浓缩团聚粉不替代此路线，无新机制。 |
| cn-ind-detergent-spray-powder-004 | 设备/路线目录 | 保持边界/缺口 | 职业4喷雾干燥与HJ喷粉单元直接；美宝2018高塔目录保持，无完整喷雾控制。 |
| cn-ind-detergent-spray-powder-005 | 受限直接/局部机制 | 保持边界/缺口 | 职业5与HJ后配料支持；AZO仅喷香混合，其他热敏助剂待适配，不机械拆同一混合验收动作。 |
| cn-ind-detergent-spray-powder-006 | 迁移适用待验证 | R06 | 职业9粉体充填有据；浓缩粉包装迁高喷粉维持待验证，人工放袋与复检不是技术失败。 |
| cn-ind-detergent-liquid-001 | 受限直接/局部机制 | 保持边界/缺口 | 职业6直接计量；世赫152可选称重/流量计支持局部计量，选配边界保留。 |
| cn-ind-detergent-liquid-002 | 未获匹配机制 | 保持边界/缺口 | 职业7明确先熔化；未借金宗预混溶解当熔化，保持新机制缺口。 |
| cn-ind-detergent-liquid-003 | 相邻场景证据 | E06,E08,E09 | 职业7是固体先熔化后同液体泵入，显示输入须限定熔融/可泵物料。世赫140为真空入主锅、泵从主锅出料，不可写真空吸入并经泵输送进罐。需新增匹配入罐泵原文或降相邻；金宗粉末直投结块不是已熔物料泵送直接约束，降前处理相邻、directCurrentActionConstraint=false并移出技术直接事实。 |
| cn-ind-detergent-liquid-004 | 受限直接/局部机制 | R03 | 职业7混合明确；世赫转定子及桨局部机制保留。金宗化妆品粉体溶解结块须限定本配方存在该物料且迁移未核，不能无条件列合成洗涤剂直接实证。 金宗为化妆品液洗说明，具体产品/配方与本洗涤剂入口的适配待核，不从标题直接断定全部归属2682。 |
| cn-ind-detergent-liquid-005 | 迁移适用待验证 | E08,E09,R03 | 职业8过滤明确；金宗为化妆品液洗路线，机理有但向当前合成洗涤剂产品未核，建议provisional-application-only。灌装嘴堵塞是下游风险，不是过滤设备失败；records/technical directCurrentActionConstraint改false并移相邻下游需求条件。 金宗为化妆品液洗说明，具体产品/配方与本洗涤剂入口的适配待核，不从标题直接断定全部归属2682。 |
| cn-ind-detergent-liquid-006 | 设备/路线目录 | E07,E08,R03,R05,R06 | 职业9/HJ灌装支持；NPACK仅列选型机制类别无执行顺序，建议equipment-or-route-scope-only，柱塞改原文活塞；金宗喷嘴风险按化妆品配方条件迁移保守分级。当前充填不等于封口交付，建议显示phase作业。 金宗为化妆品液洗说明，具体产品/配方与本洗涤剂入口的适配待核，不从标题直接断定全部归属2682。 |
| cn-ind-soap-base-001 | 设备/路线目录 | 保持边界/缺口 | 职业肥皂1熔化明确，HJ油脂精炼只上位背景；福尔斯特目录范围保持。 |
| cn-ind-soap-base-002 | 未获匹配机制 | 保持边界/缺口 | 职业2去脂肪酸和杂质支持，HJ脱胶/过滤非全部精炼动作；无匹配新机制。 |
| cn-ind-soap-base-003 | 未获匹配机制 | 保持边界/缺口 | 职业2脱色明确；HJ油脂精炼上位范围，尚无新匹配脱色机理。 |
| cn-ind-soap-base-004 | 未获匹配机制 | 保持边界/缺口 | 职业2脱臭明确；HJ上位范围，未获新匹配脱臭设备原文。 |
| cn-ind-soap-base-005 | 受限直接/局部机制 | 保持边界/缺口 | 职业3皂化与HJ大锅/连续皂化直接；锅搅拌加热局部，不采目测作为最终验收。 |
| cn-ind-soap-base-006 | 未获匹配机制 | 保持边界/缺口 | 职业4皂基调和明确；不将后续皂粒配混冒充液态皂基，新机制缺口。 |
| cn-ind-soap-base-007 | 受限直接/局部机制 | 保持边界/缺口 | 职业5干燥/HJ皂粒干燥支持；宇收真空闪蒸局部，未承袭化学成分/含水数字，和后续固化共享核算。 |
| cn-ind-soap-base-008 | 设备/路线目录 | 保持边界/缺口 | 职业5真空/冷板冷却支持，HJ皂粒成型目录不等于冷却；宇收干燥固化只路线范围，保持无独立冷却机制。 |
| cn-ind-soap-bar-finish-001 | 受限直接/局部机制 | 保持边界/缺口 | 职业6混合皂粒添加剂支持；宇收齿轮电机搅拌局部；不移给皂基调和。 |
| cn-ind-soap-bar-finish-002 | 受限直接/局部机制 | 保持边界/缺口 | 职业6均化碾磨与差速辊筒匹配；精炼是皂料均化非油脂化学精炼。 |
| cn-ind-soap-bar-finish-003 | 受限直接/局部机制 | 保持边界/缺口 | 职业6压条和益鑫双螺杆真空机制匹配；2018产品不证2026生产，压印另工序。 |
| cn-ind-soap-bar-finish-004 | 受限直接/局部机制 | E06,R04 | 职业7块压支持；Hebei原soap billet为皂坯，需说明皂条预切/整形供料条件，不把连续皂条直接进模当已证；供货明确不含真空泵模具，应保留采购投入，手动润滑是人工/维护。 |
| cn-ind-soap-bar-finish-005 | 未获匹配机制 | 保持边界/缺口 | 职业7压印明确；压块来源不证明标识模纹，保持未匹配。 |
| cn-ind-soap-bar-finish-006 | 未获匹配机制 | 保持边界/缺口 | 职业7烘晾明确；不以皂基干燥替代块皂包装前烘晾。 |
| cn-ind-soap-bar-finish-007 | 受限直接/局部机制 | 保持边界/缺口 | 职业7包装/HJ包装直接，薄膜送料制袋拉膜热封切刀局部成立；配置影响费用不是采用失败，不算ROI。 |
| cn-ind-natural-fragrance-extract-001 | 受限直接/局部机制 | E05,E08,R03 | 职业香料1蒸馏/HJ天然蒸馏支持；烟草属于本任务天然原料子范围，仝莫原文蒸气冷凝油水分离可判局部机制，限烟草适用成分，不迁全部植物。建议任务最高级改bounded-direct-or-partial-action-mechanism并保留A2小试/作坊等级；更新日期非投产日。 |
| cn-ind-natural-fragrance-extract-002 | 未获匹配机制 | E05 | 职业1浸提/HJ天然浸提支持；original detail表3应归HJ角色不是职业文句，未获新匹配。 |
| cn-ind-natural-fragrance-extract-003 | 未获匹配机制 | E05 | 职业1压榨与HJ冷榨支持，冷条件直接由HJ提供；原detail分源说明，无新机制。 |
| cn-ind-natural-fragrance-extract-004 | 未获匹配机制 | 保持边界/缺口 | 职业3蒸馏精制直接；HJ天然提取蒸馏不是粗品精制专属表证，过程角色限背景，提取设备不继承。 |
| cn-ind-natural-fragrance-extract-005 | 未获匹配机制 | 保持边界/缺口 | 职业闻香任务4在物理406页；原fragrance复合定位已覆盖405—406，确认没有定位错误。HJ表3不规定闻香验收，保留本轮没有新匹配机制和感官判定缺口。 |
| cn-ind-essence-heat-mix-001 | 仅实验室机制 | 保持边界/缺口 | 职业香精2称量与HJ配料范围有据；小批PLC目录及GERSTEL微量台式试样分级保留，不能移用生产批。 |
| cn-ind-essence-heat-mix-002 | 设备/路线目录 | E05 | 职业2均质明确，HJ4只有配料混合范围；高剪切机目录保持，不为无客户福州方案捏造在运。 |
| cn-ind-essence-heat-mix-003 | 受限直接/局部机制 | 保持边界/缺口 | 职业2搅拌直接/HJ混合支路；夹套搅拌局部但这里只反应香精，非热拌和另适配；结焦设计动因不作失败频率。 |
| cn-ind-essence-heat-mix-004 | 受限直接/局部机制 | E05 | 职业2加热/HJ4热反应支路支持；夹套盘管热交换局部，风味终点和热敏品条件未知。 |
| cn-ind-essence-heat-mix-005 | 专利设计机制 | E05 | 职业2喷雾干燥/HJ4胶囊粉末路线分源；专利2021喷雾热空气干燥机理为设计层级，粘壁仅申请人背景非独立运行。 |
| cn-ind-essence-heat-mix-006 | 未获匹配机制 | 保持边界/缺口 | 职业3称量成品直接；配料秤和小试样机不替代成品重量复检，未匹配新机制。 |
| cn-ind-essence-heat-mix-007 | 设备/路线目录 | 保持边界/缺口 | 职业3包装/HJ4包装直接；福州方案灌装仅设备目录，不证称量/封口/标识完整操作。 |
| cn-ind-viscose-dope-001 | 专利设计机制 | E06 | 职业原液1混配投料支持；专利仅黄化阶段碱纤维与CS2给料，不等于前段浆粕混料/老成前投料。方案/结论须明确仅中间原料黄化供料局部，完整配制/批号仍缺，专利层级保留。 |
| cn-ind-viscose-dope-002 | 未获匹配机制 | 保持边界/缺口 | 职业2老成和HJ3老成直接；不借黄化控制冒充碱纤老成，无新机制。 |
| cn-ind-viscose-dope-003 | 专利设计机制 | 保持边界/缺口 | 职业2/HJ3黄化直接；专利夹套搅拌参数控制局部为设计，历史2010顺控另一目录；接口/工序相关风险是条件非事故，人工参数设置归残留人工。 |
| cn-ind-viscose-dope-004 | 专利设计机制 | E07 | 职业4/HJ溶解直接；专利按流量PID和阀分两次加溶解碱，原文536—537无泵，mechanism阀泵改流量阀；只供碱局部而非终点。 |
| cn-ind-viscose-dope-005 | 受限直接/局部机制 | 保持边界/缺口 | 职业4/HJ原液过滤直接；2010人机界面仅反洗参数/记录操作支持必要数字辅助，不能继承过滤质量判定或自动反洗全控制；人工设置不可作失败障碍。 |
| cn-ind-viscose-dope-006 | 未获匹配机制 | 保持边界/缺口 | 职业5/HJ脱泡直接；黄化釜为安全抽真空不等于最终原液脱泡，无新机制。 |
| cn-ind-viscose-dope-007 | 受限直接/局部机制 | 保持边界/缺口 | 职业7异常+记录是同一处置闭环，暂不机械拆分；DCS自诊断限定通信/卡件，不能扩到全生产机械。报警重下载风险仅JX-300X，人工分析明确。 |
| cn-ind-viscose-staple-spin-001 | 未获匹配机制 | 保持边界/缺口 | 职业纺丝2直接送入，HJ3纺练仅工序背景；实验计量泵属于后段喷丝供料，前端原液送入仍未匹配。 |
| cn-ind-viscose-staple-spin-002 | 未获匹配机制 | 保持边界/缺口 | 职业3凝固浴供液直接，HJ3纺练背景；实验可加热水槽不是供液泵，缺口正确。 |
| cn-ind-viscose-staple-spin-003 | 仅实验室机制 | 保持边界/缺口 | 职业4计量过滤喷丝连贯成丝输出/HJ3精过滤纺丝；小试计量泵到凝固浴路线真实但只能实验机理，不拿工时产能。 |
| cn-ind-viscose-staple-spin-004 | 受限直接/局部机制 | 保持边界/缺口 | 职业5牵伸/HJ3后集束牵伸；2010DCS纺牵切电机速度启停仅驱动控制辅助，倍率和质量未知。 |
| cn-ind-viscose-staple-spin-005 | 设备/路线目录 | 保持边界/缺口 | 职业5水洗/HJ3水洗；2010精炼段电机不是完整水洗，设备范围等级可保留。 |
| cn-ind-viscose-staple-spin-006 | 受限直接/局部机制 | 保持边界/缺口 | 职业5/HJ3切断直接；2010纺牵切驱动参数控制可保留局部，刀具长度控制未知，不能跨材料。 |
| cn-ind-nylon6-polymer-001 | 设备/路线目录 | R06 | 职业聚合1接收和配料/HJ5储罐上位范围；海新仅配比功能目录。可条件提议原料接收核验与配制两输出分别验收/核算，原号保留0新增。 |
| cn-ind-nylon6-polymer-002 | 相邻场景证据 | 保持边界/缺口 | 职业1投料直接；海新氮输送为成品切片，相邻等级正确且日期改2022。 |
| cn-ind-nylon6-polymer-003 | 设备/路线目录 | E05,E08 | 职业2聚合泛范围与HJ5水解聚合应分两角色；海新只两/三段反应器路线和条件可调，未给测量/执行回路，建议equipment-or-route-scope-only，保留2022产品说明。 |
| cn-ind-nylon6-polymer-004 | 未获匹配机制 | 保持边界/缺口 | 职业3/HJ5切粒直接，无本任务新机理；铸带和切粒前处理关系须现场，不机械增项。 |
| cn-ind-nylon6-polymer-005 | 设备/路线目录 | 保持边界/缺口 | 职业3/HJ5萃取直接，海新目录没有传质过程，保持目录。 |
| cn-ind-nylon6-polymer-006 | 设备/路线目录 | 保持边界/缺口 | 职业3/HJ5干燥直接，海新连续干燥仅功能/结果宣称，保持目录。 |
| cn-ind-polyester-melt-polymer-001 | 未获匹配机制 | E05 | 职业1配料与HJ6酯化浆料槽分源；未获浆料调配新机制，不拿注入前馈作为全部混配。 |
| cn-ind-polyester-melt-polymer-002 | 受限直接/局部机制 | E05,R03 | 职业2泛聚合与HJ6酯化明确分源；惠特各反应器液位和浆料前馈为部分调节辅助，不能所有釜都套黏度或笼搅拌。 |
| cn-ind-polyester-melt-polymer-003 | 受限直接/局部机制 | E05,R03 | 职业2泛聚合/HJ6预缩聚釜分源；DCS液位可保留，浆料入口前馈不是该釜独立进料控制，声明按阶段限定。 |
| cn-ind-polyester-melt-polymer-004 | 受限直接/局部机制 | E05,R03 | 职业2泛聚合/HJ6终缩聚釜分源；料位与熔体黏度控制局部，不能把前浆料注入当全部终缩聚机制。 |
| cn-ind-polyester-melt-polymer-005 | 受限直接/局部机制 | 保持边界/缺口 | 职业3直纺供料/HJ6熔体输送；泵过滤增压冷却分配直接局部，截在纺丝箱入口防止和喷丝重复核算。 |
| cn-ind-polyester-melt-polymer-006 | 迁移适用待验证 | 保持边界/缺口 | 职业3/HJ6切片路线；通用PET水下切粒迁纤维级聚合后质量未核，provisional等级正确。 |
| cn-ind-polyester-filament-spin-001 | 未获匹配机制 | 保持边界/缺口 | 职业纺丝1干燥/HJ6仅切片企业填报干燥系统；直纺分支不加此步骤，无新匹配。 |
| cn-ind-polyester-filament-spin-002 | 设备/路线目录 | E08 | 职业1熔融/HJ6切片螺杆挤出直接，泰丝达37—43仅螺杆和管路组件表，没有熔融加热或剪切机制，应equipment-or-route-scope-only。 |
| cn-ind-polyester-filament-spin-003 | 受限直接/局部机制 | R03 | 职业4/HJ6纺丝连贯输出；格拉夫泵/喷板/气冷局部成立，过滤在114前段，应明确复合定位覆盖前段熔体过滤器，非仅中段。 |
| cn-ind-polyester-filament-spin-004 | 受限直接/局部机制 | E05 | 职业5牵伸/HJ6明确FDY热辊，泰丝达热管均温局部热控；FDY改POY只相邻变更，不作直接FDY失败。 |
| cn-ind-polyester-filament-spin-005 | 设备/路线目录 | E08 | 职业5/HJ6卷绕直接；泰丝达45只有全自动换筒头功能配置，没有卷绕/切换执行机理，建议equipment-or-route-scope-only，后段ADR不继承。 |
| cn-ind-fiber-postprocess-maintain-001 | 未获匹配机制 | E05 | 职业后处理1卷曲/HJ4醋酯卷曲直接分源；材料路线需限定，本轮无新机理。 |
| cn-ind-fiber-postprocess-maintain-002 | 未获匹配机制 | E05 | 职业1定型泛范围与HJ6短纤热定型分源；不借牵伸热辊当独立热定型，无新匹配。 |
| cn-ind-fiber-postprocess-maintain-003 | 受限直接/局部机制 | E05,R03 | 职业1上油/HJ5锦纶范围，但实际方案格拉夫为聚酯长丝，定义补HJ6上油并限定涤纶支路；原句方案须写油嘴/油轮接触上油实际局部，而非仅配置上油。 |
| cn-ind-fiber-postprocess-maintain-004 | 设备/路线目录 | 保持边界/缺口 | 职业2干燥/HJ3粘胶短纤烘干；2010DCS只是电机控制范围，不能证明换热除水，目录正确。 |
| cn-ind-fiber-postprocess-maintain-005 | 未获匹配机制 | E05 | 职业3加弹与HJ6牵伸假捻分源支持，连续一条变形丝输出不按两动词机械拆；无新机制。 |
| cn-ind-fiber-postprocess-maintain-006 | 受限直接/局部机制 | E05 | 职业3切断泛范围、HJ6涤纶短纤，实际证据粘胶与112同设备步骤，只作为粘胶子范围，保留可能重叠映射不得重复现金；定义角色不把粘胶证据写涤纶。 |
| cn-ind-fiber-postprocess-maintain-007 | 设备/路线目录 | E08 | 职业5包装/HJ3短纤包装与实际NITR长丝卷装不同；本任务适用化纤包含长丝可候选，但原文仅套袋绑件裹膜工序目录，机器人为码垛不是套袋，建议equipment-or-route-scope-only并改设备功能归属。 |
| cn-ind-refinery-distillation-001 | 受限直接/局部机制 | R01 | 职业蒸馏1电脱盐直接，HJ853表A.1只上位蒸馏且2027生效，另物理7列电脱盐罐可补定义角色；电场聚水局部成立，2026匿名摘要波动是真运行条件但不推自动化失败率。 |
| cn-ind-refinery-distillation-002 | 相邻场景证据 | R01 | 职业2原油加热换热直接，当前引用中段回流不是原油前换热，维持相邻无当前机制。 |
| cn-ind-refinery-distillation-003 | 受限直接/局部机制 | R01 | 职业3分馏直接，供应商常压塔侧线前馈解耦局部，可保留不推广减压所有塔，延时必须试验。 |
| cn-ind-refinery-distillation-004 | 受限直接/局部机制 | R01 | 职业4热回收直接，优稳96—99炉烟气预热/炉压挡板局部；中段热负荷人工设定是另子系统，原counter false正确。 |
| cn-ind-refinery-catalytic-cracking-001 | 受限直接/局部机制 | R01 | 职业裂化1原料反应支持；Shell提升管喷嘴/内件油剂接触局部，不把中科院烯芳中试当燃料FCC持续商业。修Shell容器SHA表示。 |
| cn-ind-refinery-catalytic-cracking-002 | 相邻场景证据 | R01 | 职业2分馏等产品切割，Shell旋风和汽提仅催化剂气固/烃分离；相邻等级正确。 |
| cn-ind-refinery-catalytic-cracking-003 | 专利设计机制 | R01 | 职业4添加催化剂支持；专利新鲜剂气力输送至汽提段设计成立，不混现有空气送再生器；热崩为申请人背景。 |
| cn-ind-refinery-catalytic-cracking-004 | 未获匹配机制 | R01 | 职业4再生直接，Shell循环增强不是再生化学/控制机制，本轮缺口正确。 |
| cn-ind-refinery-catalytic-cracking-005 | 未获匹配机制 | E05,R01 | 职业4只回收催化剂，尚未明确装置退出卸出收集还是循环回收；具体退出收集是研究拟议操作化，definitionSupport须部分/待核，不拿Shell循环当证。 |
| cn-ind-refinery-heavy-hydrogen-001 | 未获匹配机制 | R01 | 职业加氢1蜡油/中间馏分裂化直接；渣油沸腾床其他路线未硬套，无新机制。 |
| cn-ind-refinery-heavy-hydrogen-002 | 设备/路线目录 | E09,R01 | 职业2去杂加氢处理直接，Shell沸腾床加氢裂化仅相邻路线设备背景；蜡油/柴油共氢摘要可保留设备范围。HYDRO-COKE明确沸腾床渣油加氢裂化，不能直接作此去杂处理任务技术障碍，directCurrentActionConstraint=false并移相邻流程条件。 |
| cn-ind-refinery-heavy-hydrogen-003 | 未获匹配机制 | R01 | 职业3加氢产物分馏直接，共氢例子蜡油支路不设分馏，本轮无匹配正确；不是技术不可行。 |
| cn-ind-refinery-thermal-cracking-001 | 未获匹配机制 | R01 | 职业热加工1焦化直接，减粘不产同样焦炭，未冒用专利。 |
| cn-ind-refinery-thermal-cracking-002 | 专利设计机制 | R01 | 职业2减粘直接，1995上流渣油反应/闪蒸分馏是设计层级；沟流结焦背景不改为当前失败。 |
| cn-ind-refinery-naphtha-001 | 设备/路线目录 | R01 | 职业石脑油1预处理直接，2012能源局只有切馏程去杂范围，目录等级正确。 |
| cn-ind-refinery-naphtha-002 | 设备/路线目录 | R01 | 职业2重整直接，官方术语是反应原理非控制装置实现，保持路线范围。 |
| cn-ind-refinery-naphtha-003 | 未获匹配机制 | R01 | 职业2明确碳五碳六异构单元；重整含异构反应不证独立装置，无匹配正确。 |
| cn-ind-refinery-gas-treat-001 | 相邻场景证据 | R01 | 职业炼厂气1脱硫直接，长岭案例贫液冷却器为部件而非净化本身，维持相邻。 |
| cn-ind-refinery-gas-treat-002 | 未获匹配机制 | R01 | 职业1再生溶剂明确；贫液冷却不是再生加热汽提，本轮缺口。 |
| cn-ind-refinery-gas-treat-003 | 相邻场景证据 | R01 | 职业1汽提含硫氨水直接（物理375—376）；HJscope-class只有类别定义不直接列动作，物理7酸性水汽提塔可补设备背景；Pall预除油相邻/限制false正确。 |
| cn-ind-refinery-gas-treat-004 | 设备/路线目录 | R01 | 职业2精馏或吸附为两可选工艺，PSA只制氢子范围；吸附剂和阀失效摘要确为历史运行问题，无2026/全气体泛化。不同输出/原料如独立核算可拟分，不按或字增数。 |
| cn-ind-refinery-gas-treat-005 | 未获匹配机制 | R01 | 职业4产硫或硫酸泛范围，本任务取硫回收需说明支路；尾气焚烧故障下游相邻false正确，不作硫回收反应器失败。 |
| cn-ind-refinery-lube-wax-001 | 未获匹配机制 | R01 | 职业润滑1溶剂精制直接，白土/异构不能继承，本轮无匹配。 |
| cn-ind-refinery-lube-wax-002 | 相邻场景证据 | R01 | 职业2油蜡分离和原输出两相明确；MSDW异构化学转化相邻等级正确，不把盈利广告带入现金。 |
| cn-ind-refinery-lube-wax-003 | 专利设计机制 | R01 | 职业3白土精制直接；2013先加热再混白土过滤专利支持设计，沉积只是专利对旧路线批评。 |
| cn-ind-refinery-lube-wax-004 | 未获匹配机制 | R01 | 职业3石蜡成型直接，未借蜡催化改变分子取代制品成型，无新匹配。 |
| cn-ind-refinery-lube-blend-fill-001 | 受限直接/局部机制 | R01,R03 | 职业6润滑油调合直接，腾嘉83—87称重添加定时搅拌真实局部；若写泵阀需补75等源段或删出当前只83—87未具体阀泵的词，不能把搅拌泵当一种泵。 |
| cn-ind-refinery-lube-blend-fill-002 | 专利设计机制 | R01 | 职业7润滑脂反应直接，历史专利基础油载体加稠化组分搅拌升温限定，非基础油皂化；配方未核。 |
| cn-ind-refinery-lube-blend-fill-003 | 设备/路线目录 | R01 | 职业7均质直接；专利循环可均化不等于均质机内部作用，保持单机设备目录。 |
| cn-ind-refinery-lube-blend-fill-004 | 受限直接/局部机制 | E07,R01 | 职业6—7润滑油/脂灌装不同黏性分支，世赫活塞（不是柱塞）阀序具体机理只可流润滑油；迅捷流量计线清洁强光条件不移为所有活塞故障。补2014原网页日期。 |
| cn-ind-refinery-asphalt-001 | 未获匹配机制 | R01 | 职业8渣油溶剂萃取两相直接，无新匹配，不拿Pall酸水除油替代。 |
| cn-ind-refinery-asphalt-002 | 未获匹配机制 | R01 | 职业9沥青氧化直接，乳化/改性不是氧化，本轮无新机制。 |
| cn-ind-refinery-asphalt-003 | 专利设计机制 | R01 | 职业9沥青调合直接，市政专利加改性剂分切搅拌仅设计，行业执行者待核；与170前混可能同次操作须共享不重复收益。 |
| cn-ind-refinery-asphalt-004 | 受限直接/局部机制 | R01 | 职业9改性与乳化不同物料产品，保留作者拟分路线0新增；专利改性和厂商皂液胶体磨乳化分开，前者市政产权非部署。 |
| cn-ind-refinery-fuel-finish-001 | 设备/路线目录 | R01 | 职业精制1轻馏分加氢直接，2023摘要仅柴油支路设备范围，汽煤油当前机制不承袭。 |
| cn-ind-refinery-fuel-finish-002 | 未获匹配机制 | R01 | 职业2催化汽油吸附脱硫直接，不用氢PSA气体案例，无新匹配。 |
| cn-ind-refinery-fuel-finish-003 | 未获匹配机制 | R01 | 职业3混合器精制罐轻馏分直接，白土基础油路线非本物料，缺口正确。 |
| cn-ind-refinery-oil-transfer-001 | 未获匹配机制 | R01 | 职业储运1接收直接；HJ储罐/装載类别只环境申报背景，不是接收SOP，无新机制。 |
| cn-ind-refinery-oil-transfer-002 | 未获匹配机制 | R01 | 职业2油品计量直接；配方称重非贸易/交接计量，本轮缺口正确。 |
| cn-ind-refinery-oil-transfer-003 | 迁移适用待验证 | R01 | 职业1输送直接，腾嘉润滑油调合内部泵阀迁全厂物料未核，维持provisional并限定物料。 |
| cn-ind-refinery-oil-transfer-004 | 迁移适用待验证 | R01 | 职业3添加调合直接，腾嘉只润滑油，与163潜在同一次；保持其他汽煤柴油迁移待核，不计两次收益。 |

## 逐源复读索引

所有98源的相关定位均实际阅读；日期、地点与源层级的具体复核说明如下。

| 来源ID | 独立原文/时期/范围结论 |
|---|---|
| [CN-CHEM-MACH-DOSE](https://www.bjmachtech.com/products/1.html) | 大料负压与小料多种给料配独立秤是不同配置；配料周期及吸潮粉条件为供应商直接原段，未采用量化周期。日期缺失保留。 |
| [CN-CHEM-XI-HUA-MILL](https://www.xihuamach.com/plczdklj/zdfjklj.html) | XH-401正文明确研发、配方、物性测试和教学用途；PLC及兼容自动调距/翻胶是试验设备，页面后部2023—2026相关链接日期不是本产品发布日期。 |
| [CN-CHEM-CHINA-KNEADER](https://chinakneader.com/display.asp?id=6) | 2013-04-18页头与产品用途/辊筒结构有据；急停、拉绳是配置，不证明风险消除或实际事故。 |
| [CN-CHEM-DXS-LINE](https://www.dxs1907.cn/product/16.html) | 密炼母炼后开炼补充混炼，与下辅机翻胶摆胶出片有明确段落；无人和效益为厂商自报，不承袭为真实工时。 |
| [CN-CHEM-SINOCHEM-MIX](https://www.sinochemeqpt.com/index/product/details.html?id=26) | 相对回转转子及密闭可调温压与配套系统支撑局部混炼；原文间隙性按间歇语义理解，不支持前处理破胶。 |
| [CN-CHEM-SAILUN-PROCESS](https://www.sailungroup.com/about/quality.html) | 集团描述不对应具名工厂。semi是工序目录；form只概括成型机组合半成品为胎胚，尚无组合执行机理，task006需降目录。cure含模腔温时压及自动装锅局部机制；inspect保留人工外观与机器分支。 |
| [CN-CHEM-SHUANGDA-FAULT](https://www.shuangdajx.cn/news_details/26.html) | 页头日期2021-09-15与正文行61—63匹配；是供应商胶管表面缺陷/挤出机排查建议，非具名事故。所读页面可能修订历史未给，不能用发布时间证明内容从未改动。 |
| [CN-CHEM-CRIA-REWORK](https://cria.org.cn/a/1766265621523251201) | 2011-10-20行业采访返炼条件与天津锦湖管理评论有据；是历史采访观点，不是监管独立调查。本文区分返炼与废旧再生，禁止拿职业废胶再生作当前任务直接依据。 |
| [CN-CHEM-CRIA-AI-ACCEPT](https://www.cria.org.cn/a/2085235197121499137) | 2026-08-05转载报道7月30日河南焦作验收，含现场部署/试点及3企应用自述；没有每任务量产验收日志，不能量化接管效率。 |
| [CN-CHEM-VMI-RETREAD](https://cn.vmi-group.com/specifications/retrax-with-builder/) | 中垫胶挤出涂敷、再移至胎面贴合器、自动对中测量压合有实际步骤；不匹配报警给人是残留接管条件，不是已确认失败。全球中文产品不能当中国客户。 |
| [CN-CHEM-QDECOLAN](https://www.qdecolan.com/fangan/52.html) | 原文明确2020年下半年江苏东海未具名客户线，冷翻包封套+罐硫化支持局部路线；未采用耐磨耐扎和无限次翻新等宣传，胎体准入仍缺。 |
| [CN-CHEM-CRIA-RETREAD](https://www.cria.org.cn/a/1766265922280013825) | 2011-08-23报道8月19日研发项目获奖，设备清单而非每动作机理；不使用未核试验指标作为真实成品验收。 |
| [CN-CHEM-AT-TYRE](https://www.at-sensors.com/zh/applications/3d-tire-inspection/) | inVISION2023、2019原型与推向市场阶段原段存在；激光表面点云/标记分类面向旧胎去向，不适配翻新成品全量放行。 |
| [CN-CHEM-RICH-TABLET](https://www.richpacking.cn/News/Show_1101.html) | 2024-06-02日期、转台模冲轨道压片机理、物料水分/间隙/密封条件及人工试片原段已读；operator尾只作说明属研究边界；不采用15分钟等供应商数值作为GMP。 |
| [CN-CHEM-TIANHE-GRANULATE](https://www.tablet-press.cn/zhang2013-Article-308228/) | 2026-02-05日期、桨混合加黏合剂与切刀湿制粒、观察窗人工调整有据；人工残留已正确未当技术失败。 |
| [CN-CHEM-LINLU-GRANULATE](https://www.linlumachine.com/nd.jsp?id=182) | 2026-07-11日期；螺杆给料、液压辊压薄片、破碎筛分和回流均有据；任务32干法压片须明确为辊压薄片/带，不是成品片剂。 |
| [CN-CHEM-YIBU-GRANULATE](https://www.yibu.com/products/933.html) | 产品无发布日期，相关项目2026-09-01不属于本页发布日期；仅干法制粒设备路线/配置，未展开完整机理。 |
| [CN-CHEM-SYNTEGON-CONTINUOUS](https://www.syntegon.com.cn/solutions/pharma/continuous-manufacturing/) | 分包定量XKey与连续恒流不同；剂量混合claim尾边界分离；同腔流化床制粒干燥原段直接，不证明工厂收益。 |
| [CN-CHEM-SYNTEGON-COMPRESSION](https://www.syntegon.com.cn/solutions/pharma/tablet-compression-machines/) | 双桨及选配第三桨独立/联动给料有据；tool和contain末未证/并非全型范围属于研究边界；TPR200Plus研发小批OEB3选配保持。 |
| [CN-CHEM-SYNTEGON-COAT](https://www.syntegon.com.cn/solutions/pharma/tablet-coating-machines/) | 焊桨、HMI喷枪距离、配方清洗区与喷嘴有据；optional整句区分标准选配为研究说明，需写原文激光/IR/供液选配事实与边界分开；清洗依介质和产品明确。 |
| [CN-CHEM-CANAAN-GRANULATE](https://www.canaan-tech.com/Article-174494.html) | 页2022-05-25更新与2018验收/2019和2021复购分开；汤臣倍健氨糖产品药品注册未核，不作注射/所有制剂厂实证；黏附转运难度与非全部路线为供应商观点。 |
| [CN-CHEM-SYNTEGON-STERILE](https://www.syntegon.com.cn/solution-finder/pharma/pharmaceutical-sterilization/) | 配制罐/容器清洗目录，活塞/蠕动/质量/时间压力灌装及火焰封口/抽真空加塞分支有据；compound/wash研究边界分开；灭菌负载路线及可见物检测与CCIT不可混。 |
| [CN-CHEM-SYNTEGON-TUNNEL](https://www.syntegon.com.cn/solutions/pharma/sterlization-tunnels/) | HQL干热单向流用于预洗耐热容器，干燥灭菌除热原共享周期；不能覆盖全部器具。 |
| [CN-CHEM-EASTCHINA-ORAL](https://www.eastchinagroup.com/oral-liquid-line.html) | 口服瓶超声及水气喷洗、热风干燥与跟踪灌装/单刀轧盖有据；不继承注射验证。 |
| [CN-CHEM-LEPURE-PUPSIT](https://lepurebiotech.com.cn/product/automated-pupsit-system/) | PUPSIT仅末端过滤用途和滤器/阀/泵/压力/称重及选配控制组成，没有料液路径/截留或控制顺序；任务44须降设备或路线目录；config事实与并非所有配置边界分开。 |
| [CN-CHEM-SYNTEGON-INSPECT](https://www.syntegon.com.cn/solutions/pharma/automated-visual-inspection-systems/) | AIM2／5明晰液体/溶液/冻干相机照明和SD有据；悬浮液需旋转照明局部；AIMPREP是离线参数设置训练，不是药品放行规范，setup边界分开。 |
| [CN-CHEM-KOERBER-INSPECT](https://www.koerber-pharma.cn/solutions/inspection/automatic-inspection) | 只摄像/高压/激光模块组合目录，未给当前任务完整验收；claim事实与目录范围判断分离。 |
| [CN-CHEM-KOERBER-PROCESS](https://www.koerber-pharma.cn/solutions/inspection/in-process-control) | 灌装前空容器光学/相机检查和加塞位置有据；半加塞冻干与全加塞路线明确，不合并全部阶段。 |
| [CN-CHEM-TRUKING-SOLUTION](https://www.truking.com/Solutions/index_itemid_1289.html) | 口服/安瓿及制水设备工序目录；oral尾具体机制判断分开；原安瓿栏目局部误出现西林瓶外洗，不能继承至安瓿；pack仅二次包装工序范围。 |
| [CN-CHEM-MTS-TRACE](https://www.mtscitech.com/1354/IlCJdDIf.html) | 2026-01-19日期；视觉采码、层级绑定和异常报警/线控有据，anomaly末报警处置未核研究边界分离；不是完整法规合规证据。 |
| [CN-CHEM-UROVO-TRACE](https://www.urovo.com/solutions/healthcare/109.html) | 391行打印机/自动贴标与393手持扫码或RFID是独立设备和环节；任务52A2把手持与打印合并须修。手持原段为仓储，产线包装关联须另限；cold只低温电池/凝雾，非常温失败。 |
| [CN-CHEM-MOLE-WATER](https://www.molewater.com/zh-CN/1000lph-multi-effect-distilled-water-system-for-water-for-injection-in-china) | 匿名制药企业多效蒸馏前端已用RO+EDI纯化水，蒸发及液位控制有据；任务55原水输入不能跳过纯化阶段。SIP95—96明确纯蒸汽设备/罐/管道灭菌，任务58应写实际机制并保留与消毒验收区分；来源sip研究边界分离。 |
| [CN-CHEM-SH-GMP](https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2023/art_d5e1dbaa8f284277a5f6c3e2fc840d00.html) | 七组2011GMP条款原段与2021网页日期均实读，另鲜读官方网页。84条为生产设备，不能泛指现场/环境；新41条规范化196—197/鲜网页307支持厂房书面规程清洁必要消毒。air尾未部署边界分离；不声称读全部现行附录。 |
| [CN-CHEM-NMPA-TRACE-2026](https://yjj.sh.gov.cn/qtgzwj/20260901/ad6710acfa03492f9c2e4048476f9d89.html) | 2026-09-01网页与8月31文件日期分开；再次鲜读完整47行，生产销售单元采码/激活/上传条款有例外；零售使用异常停收售不移作生产通则。 |
| [CN-CHEM-ZJMB-POWDER](https://www.zjmb.net/prod_view.aspx?FId=t3%3A81%3A3&Id=200&TypeId=81) | 2020-09-28与浓缩附聚实心粉路线有据；人工拆包、减重计量、泵送和半自动人工套袋复检明确；不是高塔料浆/空心粉。同页其他发布时间不混。 |
| [CN-CHEM-SIEHE-DETERGENT](https://www.siehechina.com/product_detail/detergent-complete-production-line) | 140真空由副锅入主锅；加压或泵送是主锅出料，不是同一路依次真空后泵入配制罐。143/155转定子+桨及156刮壁有据；称重/流量为152选配。 |
| [CN-CHEM-JINZONG-LIQUID](https://m.jinzong.com.cn/displaynews.html?id=6734213190009664) | 确认页16题名/17—18发布日期2026-03-06，应修日期与镜像。21明确化妆品液洗（洗发/沐浴/洁面/卸妆等），原metadata应补此范围，不泛为全部合成洗涤剂。29原料输送、32粉末溶解结块、50螺杆泵压滤机理有据；filter尾滤材保留组分和nozzle-limit尾非事件为研究边界。 |
| [CN-CHEM-AZO-DETERGENT](https://www.azo.com/zh-cn/%E4%BA%A7%E5%93%81%E5%8F%8A%E5%BA%94%E7%94%A8/%E6%B4%97%E6%B6%A4%E5%89%82) | 全球中文干粉洗涤剂配置；气力输送/抽吸称重/螺杆配料、喷香与排料有原段；只喷香局部并非所有热敏助剂。 |
| [CN-CHEM-VSTAR-DOSE](https://www.v-star.cn/mobile/proshow.asp?Id=84) | 2014-07-13历史拟采用设计，称重零位/阀泵/启动/放料与记录流程原段明确，不能变为部署或当前工时。 |
| [CN-CHEM-NPACK-LIQUID](https://www.npackpm.com/zh/%E6%97%A5%E7%94%A8%E5%8C%96%E5%AD%A6%E5%93%81%E8%A3%85%E7%93%B6%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88) | 139—160仅按黏度/起泡列活塞、重力、溢流类别及半自动/自动，未展开当前计量控制过程；任务72宜目录级且柱塞改原文活塞。material尾非全品类验证是研究边界；原材料广告不构成全面腐蚀验证。 |
| [CN-CHEM-FUERSTAR-SOAP](https://www.fuerstargroup.com/youzhiyanshengchanpin/fei-zao-sheng-chan-she-bei.html) | 皂线目录含油脂熔化皂化等，无各设备机理，保持目录；不采用人少等宣传。 |
| [CN-CHEM-YIXIN-SOAP](https://www.jx-yixin.com/product/167.html) | 2018-11-29原头日期；双级螺旋/中间真空/出口电加热机理明确，挤条不是成型压印。 |
| [CN-CHEM-TIANHUI-SOAP-PACK](https://tianhuipackingmachine.com/zh/soap-packaging-machines/) | 输送、制袋、拉膜、热封切刀和PLC包装参数支持局部；cost-config报价因配置影响事实与无具体成本研究边界分开。 |
| [CN-CHEM-TONGMO-OIL](https://www.shtongmo.com/pro/11877063.html) | 实际题名/简介烟草挥发油，94—95明确更新日期2026-03-17 11:25:34，不是首次发布日期或投产日。水蒸气共蒸馏/冷凝油水分离有据；适用蒸馏不破坏水稳定難溶成分。天然香料任务本已含烟草子范围，应可给此子范围局部机制，不必仅因不能迁全部植物判无直接。 |
| [CN-CHEM-SHRY-OIL](https://www.sh-ryjx.com/s18/p21076455.html) | 小型实验室/小作坊/基地装置蒸气料层、冷凝密度分层及PLC有据；不引用全部冷凝/低温活性或7x24等保证。 |
| [CN-CHEM-SHUNFU-ESSENCE](https://www.bjshunfu.com/fanying/1478.html) | 加热反应香精釜夹套盘管、搅拌/温控有原段；foul事实为供应商称结焦难洗设计问题，未给故障率边界需分离。 |
| [CN-CHEM-NANYANG-ESSENCE](https://www.cn-nanyang.com/solutioninfo-115.html) | 福州网页题名不等于客户投产；管路配料/可调搅拌及可选高剪切均质有据，灌装仅功能范围；fill与people末未给称重/工时研究边界分离。 |
| [CN-CHEM-GERSTEL-MIXTURE](https://www.gerstel.com/zh-Hans/%E4%BA%A7%E5%93%81/%E8%BD%AF%E4%BB%B6%E5%92%8C%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90/MixtureMaker%E8%B0%83%E9%A6%99%E4%BB%AA) | GERSTEL实验台微量配样/称量/偏差记录原段明确，不能变工业投料、闻香评价或持续在运。 |
| [CN-CHEM-RUMI-DOSE](https://www.rumichina.com/ProductDetail/10258076.html) | 称重传感器PLC记录及香精应用目录有据，无供料执行流程；设备目录保持。 |
| [CN-CHEM-ZJMB-SPRAY](https://www.zjmb.net/prod_view.aspx?TypeId=84&Id=190&FId=t3%3A84%3A3) | 2018-04-02高塔喷粉目录；简单人工至计算机配置有据，不承袭环保零排放或年产数字。tower尾未展开部件是研究边界。 |
| [CN-CHEM-YUSHOU-KETTLE](https://www.bbjq.cn/youzhizaohuaguo-4.html) | 传统皂化锅搅拌加热有据；react尾只作传统过程属研究分类，应分离原事实，不把目测不分层当统一终点验收。 |
| [CN-CHEM-YUSHOU-MIX](https://www.bbjq.cn/jiaobannieheji-9.html) | 减速电机及混合皂粒添加物原段支持局部，自动确认配方未述是研究边界。 |
| [CN-CHEM-YUSHOU-MILL](https://www.bbjq.cn/sangunzaoliyanmoji-10.html) | 水平差速辊筒挤压研磨原段支持局部，不自动采细度范围为任务验收。 |
| [CN-CHEM-HEBEI-STAMP](https://www.hebeitech.com/vertical-soap-stamper-with-freezing-dies-of-6-cavities-model-2000esi-mfs-6-product/) | 54原文soap billet是皂坯，不证明未切断长皂条直接进入。分度与旋转压模PLC真空压气机理有据；62明确真空泵和模具不在供货内，不是简单选配。70手动润滑，supply末无残留人工判断分开；2017/2018评论日期非产品发表。 |
| [CN-CHEM-HISCIEN-PA6](https://www.hiscien.com/intro/7.html) | 59题名/65—66发布时间2022-01-26 13:57:52有据，应补publishedAt而不把1998首线投产当本路线在运。prepare配比功能目录；polymer两/三段路线+回料条件可调，没有具体测量/执行回路，应设备路线级；extract-dry只有范围，transfer成品切片氮输送不作前段投料。3定位尾范围判断应分离。 |
| [CN-CHEM-PHITE-POLYESTER](https://www.phite.cn/technology/cp) | 四/五釜连续聚酯、笼式缩聚器和立式预缩聚原段有据，未嫁接酯化；DCS各釜液位、浆料前馈、黏度调节属部分控制，逐釜工况缺口；reactors末逐釜未给边界分离。2003历史推出不是网页发表或当前运行。 |
| [CN-CHEM-GRAEFF-SPIN](https://www.graeff.cn/3388.html) | 114整段独立实读：熔体泵过滤增压冷却分配、计量喷丝及侧吹冷却、油嘴/油轮/卷绕有据；文中具体GR配置和FDY染色表述未采用，不据该广告建立全行业路线；压力PLC/DCS115—117辅助成立。 |
| [CN-CHEM-TESDA-POLYESTER](https://www.tesda.com.cn/product_detail.asp?id=1796) | 37—43只是切片/直纺FDY组件目录，没展开螺杆熔融的加热/剪切；44热管均温热牵伸辊局部热控；45自动换筒头是配置功能而非换筒执行顺序，task129宜目录。wind末并非所有异常研究边界分离；2021/2022相关信息不是页日期。 |
| [CN-CHEM-FIELD-WIND](https://www.field-china.com/pages/solution/fiber/winding.html) | 无轨ADR落筒、挂丝和ATS转运是卷绕后交接目录，不能当丝线卷绕或其实际机理；未采用无需土建/避免全部错误的广告保证。 |
| [CN-CHEM-LEGION-POY](https://www.legion.com.cn/show-167.html) | 2022-11-03与FDY装置改POY两路线历史供应商讨论有据；调整拆热辊工作量/精度只改产路线，不是FDY牵伸当前失败；未采文中温度速度数字。 |
| [CN-CHEM-NITR-PACK](https://www.nitr.cn/solution/2.html) | 41—52是输送、套袋绑件裹膜/码垛工序和设备表，未描述夹取套袋或绑扎执行机理。只能目录，不应称机器人执行套袋/捆扎（原机器人为码垛）；夹具适配原文有据非现场验收。 |
| [CN-CHEM-ZZFJ](https://www.zzfj.com/index.php?act=show&aid=609&case=archive) | 粘胶短纤原液/纺炼/酸站设备目录有据，没有从目录倒推出各工步机制；产量广告不采用。 |
| [CN-CHEM-VISCOSE-CONTROL](https://chem.jgvogel.cn/c/2010-11-29/537611.shtml) | 2010-11-29作者/文章来源及江苏金维卡项目原段有据，运营者和供应商共稿非独立验证；电机总线启停速度、KK反洗/黄化参数和操作员回看真实局部；dependency为可能停车和跨厂设备接口，不是实际事故。filter-control末部分范围为研究边界。 |
| [CN-CHEM-VISCOSE-DCS](https://www.pcachina.com/article/110216) | 南京化纤技改历史正文未可确认发表时间；自诊断只控制站通信/卡件而非所有生产机器，运行修改报警后下载恢复旧值仅此系统版本；scope未给日期和alarm-limit局限为研究边界分离。 |
| [CN-CHEM-VISCOSE-PATENT](https://patents.google.com/patent/CN102393694B/zh) | CN102393694B于2014-08-20公开的授权文，2012-03-28另为A公开，不误改；称重皮带/真空/流量阀、夹套温控和搅拌、分次溶解碱给料有据。536—537没有泵，任务103删阀泵的泵；dissolve末终点未证与prior-art专利背景归属边界分离。 |
| [CN-CHEM-VISCOSE-TEST](https://www.zhiyankeyan.com/productdetails.html?product_id=160) | 45明科研微量原理教学、49湿纺连线、81普通粘胶适用材料支持实验装置；水槽控温不证明自动浴液输送，water末未写供液为研究边界分离。 |
| [CN-CHEM-UWNTEK-DISTILL](https://www.uwntek.com/m/solution/show-224.html) | 45—52电脱盐电场聚滴有据；91—99中段回流串级热负荷与炉烟气预热/炉压挡板两子系统分开。108—111侧线解耦进料前馈和延时试验支持局部。people末自主质量目标未证属研究边界，desalt末后续换热分开亦范围说明。 |
| [CN-CHEM-SINOPEC-DESALT](https://qikan.lpec.sinopec.com/lyjsygc/CN/abstract/abstract971.shtml) | 2026刊期6月15与网页7月22分开正确，仅出版社摘要，作者大连石化不等于某厂样本。原油性质/注水/温度/混合条件及脱盐波动有据，未采用10Mt、温度比例合格率数字。 |
| [CN-CHEM-SINOPEC-HYDRO-COKE](https://qikan.lpec.sinopec.com/lyjsygc/CN/abstract/abstract540.shtml) | 2024-01-15刊/01-29网页，原文明确沸腾床渣油加氢裂化而不是笼统加氢处理。匿名结焦堵塞及反应分馏工况有据；task147去杂加氢处理的direct约束必须改相邻裂化路线，不套全部处理装置。 |
| [CN-CHEM-SINOPEC-H2-SYSTEM](https://qikan.lpec.sinopec.com/lyjsygc/CN/abstract/abstract394.shtml) | 2023-03-15刊/03-20页、作者单位与未具名样本分开；蜡油/柴油并联共氢并热低分直接送FCC有据，明确不设分馏；no-fraction后不能当设备证据属研究边界。 |
| [CN-CHEM-SINOPEC-PSA](https://qikan.lpec.sinopec.com/lyjsygc/EN/abstract/abstract570.shtml) | 2024-03-15刊/03-21页英文摘要实读；匿名PSA吸附剂破碎、程控阀问题及均压气速水分部件有据，非全气体精馏也无总体发生率。 |
| [CN-CHEM-NEA-REFORM](https://www.nea.gov.cn/2012-06/06/c_131633363.htm) | 2012-06-06能源局术语段有据，重整反应与预处理范围不能变自动操作；pretreat末未给控制为研究边界分离。 |
| [CN-CHEM-ACCESSEN-SULFUR](https://www.accessen.cn/case_details_id_18.html) | 长岭岳阳厂家案例只硫磺回收贫液冷却器AW全焊板框替管式；无日期，集团2013/2016及他案例2025/2026非本项目时间；只部件不代表全部脱硫/再生。 |
| [CN-CHEM-SINOPEC-TAILGAS](https://qikan.lpec.sinopec.com/lyjsygc/CN/Y2024/V54/I11/54) | 2024-11-17刊/11-28页；匿名尾气加热器泄漏/熄火/积硫原摘要有据，是硫回收下游焚烧，未据作者四川确定现场；不采排放限数为本任务阈值。 |
| [CN-CHEM-PALL-SOURWATER](https://www.pall.cn/zh_cn/oil-gas/refining/sour-water-stripping1.html) | 预过滤和聚结控制颗粒/油、乳化细滴惯性局限有据，均为汽提前处理；emulsion末不是汽提机理属研究判断。 |
| [CN-CHEM-EXXON-DEWAX](https://www.exxonmobilchemical.com.cn/zh-cn/catalysts-and-technology-licensing/lubes-production/msdw-basestock-dewaxing) | 择形催化剂异构正构烷烃及抑制裂化原文明确，化学转化不是分出蜡相；claim尾研究边界分離。盈利数字不采用。 |
| [CN-CHEM-SIEHE-FILL](https://www.siehe.cn/product_detail/multi-heads-linear-filling-machine) | 141明确可流润滑油和洗涤剂，145进出阀互换+活塞后抽前推具体机理及瓶定位有据；当前task166柱塞应改活塞。可作为本批task72真正机理补充，但需明确新增引用/读源，NPACK仍目录，不能偷偷当旧原文已支持。 |
| [CN-CHEM-TEN-LUBE](https://www.ten-auto.com/index.php?a=show&c=index&catid=29&id=191&m=content) | 润滑油罐区阀泵/称量配方/定时搅拌及记录有据，75原文泵根据工艺可能笔误不照抄；transfer末贸易计量/原油另核为研究边界，未给其他油品通用条件。 |
| [CN-CHEM-XUNJIE-LUBE](https://www.xunjiecn.cn/qzdstrhygzscx.asp) | 50标题/55日期2014-3-14 15:43:52明确关联本产品。应记录原网页dateLabel及历史时期，不推首次发表/当前运行。184—192精过滤和红外清洁强光误动作是此流量计线维护建议，不是所有活塞线故障。 |
| [CN-CHEM-FLEXEM-FILL](https://www.flexem.cn/case_detail/7.html) | 电子凸轮同步输送灌装头及跟随/活塞轴、配方换型有据；134—139瓶距检测/夹瓶阀时序/洗衣液高黏过载为厂家条件，不作具名实际故障或通用粉末灌装证明。 |
| [CN-CHEM-CAS-PROCESS](https://ipe.cas.cn/cgzh/xmk/202604/t20260422_8189603.html) | 中科院成果页95—111明确中试、百吨工业试验自述，未具名商业线；URL含20260422不能当已核可见发布日期。原油到烯芳目标不同FCC燃料路线，数值不引用。 |
| [CN-CHEM-SHELL-FCC](https://www.shell.com.cn/business-customers/catalysts-technologies/licensed-technologies/refinery-technology/fluidised-catalytic-cracking.html) | 已实际整份读shell-web-read.json对应FCC网页L34—52，riser/separate定位有效；circulation短引立管并非原文，原文L52为汽提塔和再生塔竖管，须改精确锚。共用SHA是三网页工具回包容器不是单页规范化文本；需标hashRepresentation/容器定位或用单页真SHA。separate/circulation事实和不等于分馏/加剂等研究边界分离。 |
| [CN-CHEM-SHELL-RESIDUE](https://www.shell.com.cn/business-customers/catalysts-technologies/licensed-technologies/refinery-technology/residue-upgrading-technologies.html) | 已读共容器渣油页L27—35，沸腾床加氢裂化及Shell运营外部Axens/CLG许可技术和供催化剂有据，无中国具名现场；共用SHA表示须纠正。 |
| [CN-CHEM-SHELL-DEWAX](https://www.shell.com.cn/business-customers/catalysts-technologies/licensed-technologies/refinery-technology/catalytic-dewaxing/base-oil-dewaxing.html) | 已读共容器脱蜡页L33—35与40—42，正构烷烃异构/裂化与卡塔尔Pearl GTL外国地点真实；独立蜡相未产是研究边界，不能当中国事实；共用SHA表示须纠正。 |
| [CN-CHEM-DELTA-INJECTION](https://www.delta-china.com.cn/support/attached/web/publications/ia/189/html/5.html) | 2023.01电子报及华南匿名塑料零件客户在页头/7行有据；6行含插件制品为通用适用场景，不证明该匿名客户产品必含插件。任务24的插嵌件客户修为塑料零件客户，机制保留。 |
| [CN-CHEM-YUSHOU-DRY](http://www.bbjq.cn/zaohuazhenkongganzaoshebei-5.html) | 真空闪蒸皂基液态变片态及后续挤磨有据；原文主要成分脂肪酸等化学表述不采用；独立冷却/成粒控制未展开。 |
| [CN-CHEM-FCC-FEED-PATENT](https://patents.google.com/patent/CN103242890B/zh) | CN103242890B2015-02-18授权文，2013A另日期；新鲜剂储罐/加料器/氮或干气送汽提段有据，144为现有技术空气送再生器人工或自动，不能混新方案气源和注入处。thermal末非独立调查边界分离，专利未证投产。 |
| [CN-CHEM-VISBREAK-PATENT](https://patents.google.com/patent/CN1100746A/zh) | CN1100746A1995-03-29历史设计，加热渣油上流挡板筛板、闪蒸急冷和分馏实际方案有据；作者批评其他下流工艺/沟流结焦不是当前独立验证。coke末完全解决未证研究分離；未采数量和国外案例到中国。 |
| [CN-CHEM-CLAY-PATENT](https://patents.google.com/patent/CN102899075A/zh) | CN102899075A2013-01-30，2015另授权B日期；先热油后混白土精制过滤有据，原混后加热堵塞/局过热仅申请人背景；未移作溶剂精制。 |
| [CN-CHEM-GREASE-PATENT](https://patents.google.com/patent/CN201762303U/zh) | CN201762303U2011-03-16原公开；基础油入皂化釜加稠化剂搅拌升温不能解释为基础油自身皂化，配方缺口应分研究；自循环均化与单独均质机为不同范围。react及homogenize末未核内容分离。 |
| [CN-CHEM-ASPHALT-PATENT](https://patents.google.com/patent/CN111535117B/zh) | CN111535117B2021-09-21授权文，A2020另公开；原申请人市政业不证明炼厂。基质沥青/改性剂泵送分切喷洒搅拌挤压明确，原乳化工序为改性方案内部步骤，不等于水皂液乳化商品；modify/limit边界分離。 |
| [CN-CHEM-ASPHALT-VENDOR](https://www.xxztlq.com/proinfo/29.html) | 117—124设备明确皂液罐泵阀/计量和沥青保温、转定子内齿剪切研磨，乳化局部机制有据；移炼厂需执行者归属，公路厂商不证明实际施工/炼厂。数值不转本任务阈值。 |
| [CN-CHEM-ESSENCE-SPRAY-PATENT](https://patents.google.com/patent/CN214436552U/zh) | 2021-10-22专利公开、雾化热空气干燥及回风/吹壁结构有据；申请人背景粘壁不是独立客户故障；wall后未给频次研究边界分离。 |
| [CN-CHEM-XRITE-PLASTIC](https://www.xrite.com/industry-solutions/plastics) | 塑料测色全球产品组合有据；claim末端需分别选型属研究边界，宜拆开。 |
| [CN-CHEM-XRITE-CI64](https://www.xrite.com/zh-cn/categories/portable-spectrophotometers/ci6x-family/ci64) | 积分球、SPIN/SPEX、UV选配和口径有据；option.claim的须核和并非全配置通用混入研究解释，事实只保留可选UV LED/口径，条件单列。 |
| [CN-CHEM-GIANT-PELLET](https://www.giant-china.com/goods-show-200.aspx) | 正文列双螺杆/换网/分流/水下切粒配置，并明确刀切、水流输送离心脱水；前段设备组合不是全部树脂路线证明，不据匿名客户宣传推当前验收。 |
| [CN-CHEM-JWELL-PVC](https://www.jwell.cn/contents/81/998.html) | PVC填充料及锥双螺杆、模面切粒、风送/振动冷却原段匹配，与水下路线备选分开。 |
| [CN-CHEM-BEYOND-PELLET](https://www.beyondyf.com/cn/product.asp?id=2402) | 组合螺杆和温控/加热线路/电磁阀与针形阀有据；原文未把阀具体称加热阀，任务21A3及所有镜像改为温控仪表、加热线路和阀组合调温。 |

未修改任何作者输入。所有建议须由作者修订并保留完整原字节，然后限定复检；本报告不冻结清单。
