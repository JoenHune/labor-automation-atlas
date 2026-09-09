# 中国纺织服装鞋革17—19批独立审校

审校日期：2026-09-09。作者：china_data；独立复核：us_data。

**结论：需要作者回修后才能进入经审校的未冻结工作版。** 已逐项审阅136候选、14场景、35来源的81处相关定位及四项定义来源。没有冻结、改库存或新增计数任务。

## 输入与实际工作范围

| 文件 | SHA-256 |
|---|---|
| research/automation/cn-industry-textiles-garments-footwear-17-19.json | 15a81fa85bbe17d9ae53cdee4bae62335194f68f8ba5ed375fce78efa8cea12f |
| research/automation/cn-industry-textiles-garments-footwear-17-19.md | d296d42e4f582e733a1693250761eff4acd93e47d816f29843b8cd4897486f1e |
| research/automation/cn-industry-textiles-garments-footwear-17-19-search-audit.json | 765fb656ba65b2ea7ae0b0715d35d12cf32b1607324b89ee6440d4dc065480bf |
| research/automation/cn-industry-textiles-garments-footwear-17-19-validation.json | 742f8e5d9b7fdc75f59907493a208394e2e04bb3aa2445b1c3a2298790a96e8b |
| research/inventories/cn-core.json | 5388db09742709d606032d030ced3985f802a6e221441b59cd1302064ee8983e |

整份输入原字节私存，指纹清单 SHA-256：`2c1d1de449263c28da66859356611741df365112a687f6640295f35f2760b994`。136个originalTask与稳定cn-core逐项相同；库存共1820候选，其中工业1313。35缓存SHA均与作者索引一致。

复读范围是各来源的实际相关段落及上下文，不是所有候选网页全文。81短锚在对应行内均可定位；215个研究sourceRef均能解析。短锚存在不等于其整个结论成立，下方另给语义裁决。

PDF读了职业physical342—345、347—351、353，HJ861 physical6—9，HJ1123 physical6—10，特步EIA physical1、25—26。目视职业343/348/353、HJ861第7页、HJ1123第8页、EIA第25页和JUKI目录第1—2页。职业文件是570页的2022社会公示稿，不是正式更新版；EIA第26页明确项目当时未生产。

本次独立下载三份官方定义PDF，并复读复旦当前网页相关原段；People.cn新HTTP访问失败，使用指纹固定的既有正文，不声称刷新成功。新获取请求有UTC，不能用于补造旧查询UTC。没有重新执行272+16旧查询。

## 确认错误与必须回修

### E01 · 金属检出没有明确的自动停车联锁原句

将断条/异常速度等已明示自停与金属检测分开；删除金属检出也会自停的已证实说法，除非补独立说明书。该定位未进入任务方案，不改变136任务数量。

定位：CN-TEXTILE-DONGJIA-CARD stops 归一化文本97–105；105只列金属检出。

### E02 · 纺纱职业条款误挂棉前处理页

15–18、21把纺纱支持改到spinning的具体任务；19保留梳理cotton-pre并将纺纱7拆出；20补spinning7；22补spinning8及粗纱6 physical344，不能把cotton-pre全部删掉。原库存和originalTask不改。

涉及：cn-ind-cotton-spinning-007、cn-ind-cotton-spinning-008、cn-ind-cotton-spinning-009、cn-ind-cotton-spinning-010、cn-ind-cotton-spinning-011、cn-ind-cotton-spinning-012、cn-ind-cotton-spinning-013、cn-ind-cotton-spinning-014。

定位：cn-occ-2022-draft spinning physical344／正文337，6-04-02-01任务1–8；粗纱任务6也在此页左上延续。

### E03 · 职业直接动作角色与其明确保留的拟议/设计依据不符

7项仅背景（1/6/7/8/23/59/60）；6项只部分动作（29/40/51/62/74/84）；14项制鞋具体动作由设计EIA支持，职业仅场景（91–100中的所列项、102/105/107/108）。逐项改新显示引用的supportRole/detail，不以HJ/EIA证据冒充职业直接条款，不改变原proposed标记。

涉及：cn-ind-wool-preparation-001、cn-ind-wool-preparation-006、cn-ind-wool-preparation-007、cn-ind-wool-preparation-008、cn-ind-cotton-spinning-015、cn-ind-warp-weaving-006、cn-ind-warp-weaving-017、cn-ind-dye-pretreatment-011、cn-ind-textile-dyeing-008、cn-ind-textile-dyeing-009、cn-ind-textile-dyeing-011、cn-ind-textile-printing-012、cn-ind-textile-finishing-010、cn-ind-shoe-upper-cut-sew-007、cn-ind-shoe-upper-cut-sew-008、cn-ind-shoe-coldglue-form-001、cn-ind-shoe-coldglue-form-002、cn-ind-shoe-coldglue-form-003、cn-ind-shoe-coldglue-form-004、cn-ind-shoe-coldglue-form-005、cn-ind-shoe-coldglue-form-006、cn-ind-shoe-coldglue-form-007、cn-ind-shoe-coldglue-form-008、cn-ind-shoe-coldglue-form-010、cn-ind-shoe-coldglue-form-013、cn-ind-shoe-finish-pack-002、cn-ind-shoe-finish-pack-003。

定位：cn-occ-2022-draft  physical343、345、347–349、353逐条职业段；cn-shoe-xtep-eia-2022  physical25／正文24⑤–⑦。

### E04 · 配套目录与相邻工艺不应计为本任务已读直接/局部机制

64改equipment-scope-only，67改adjacent-digital-printing-workflow（本场景当前以平/圆网版网色浆为主，数字印花分支另建才可直接适配），119改adjacent-material-handling-not-shaping。保留原文与候选，不删除其有限价值；直接/局部机制统计由65降62，另列1目录/2相邻，71无匹配不变。119的柔料操控条件不能归为已证实热定型障碍。

涉及：cn-ind-textile-printing-002、cn-ind-textile-printing-005、cn-ind-garment-sew-003。

定位：CN-TEXTILE-BOYAN screen 184–207选配设备名录；CN-TEXTILE-XRITE measure 234–249数码印花色表与ICC；CN-TEXTILE-AITU handling 99–118、131–147分离/对齐/模板机应用；cn-occ-2022-draft  physical350／正文343，缝纫工任务2使用熨烫等设备或专用工具整理定型。

### E05 · 机会OP2的管路清洗引用错用染机喷嘴/滤毛

液体助剂管路清洗引用应为DONPRO-DOSE.clean；确保机会关联的染机清洁任务新增的是同一助剂管路子范围，或改关联已有管路清洗候选。两来源不能互换为同一清洗对象。

定位：CN-TEXTILE-DONPRO-DOSE clean 204–207，205管路清洗；CN-TEXTILE-DONPRO-DYE clean 194–199、228–232喷嘴与毛絮。

### E06 · 布鞋主辅料复合职责被扩到全部运动鞋材料

限定为所述布鞋主辅材料路线，或将运动鞋网布/皮革具体复合路线标为待验证推导；HJ设备名录不能补成该材料路线的直接作业验证。两任务分别黏合和烘干的输出可保留。

涉及：cn-ind-shoe-upper-cut-sew-001、cn-ind-shoe-upper-cut-sew-002。

定位：cn-occ-2022-draft shoemaking physical353／正文346，6-05-04-01任务1明确布鞋主辅料黏合烘干；cn-shoe-hj1123-2020  physical8表1合布机为设备范围。

### R01 · 查询记录可以对应，独立执行时序不能从日期日志证明

主68批请求日志与回包/公开272文本匹配，有2026-09-09日期；补7批16条请求与回包匹配，但私存请求无日期、公开转录为2026-09-09。均无独立调用前UTC与顺序证明。调用前保存仅作者陈述，应明确该层级限制，不改造旧日志/补造UTC或用新检索覆盖旧事实。

### R02 · 定型本体与常规络筒返修须显式去重

78与79的定型本体建立互斥/组合映射，仅其废气余热检查另核；17常规络筒切疵捻接与21额外返修明确触发条件。仍为原136候选，不把潜在重叠称已发生的重复劳动，更不把同设备收益相加。

涉及：cn-ind-cotton-spinning-009、cn-ind-cotton-spinning-013、cn-ind-textile-finishing-004、cn-ind-textile-finishing-005。

定位：cn-occ-2022-draft  physical344纺纱任务4/7；physical348–349后整理任务5/6。

### R03 · 相邻人工/试验阶段反证须写清当前动作覆盖范围

94的DESMA手动置入鞋面/底不证明套入鞋楦仍需人工；119 Fudan模板演示/柔料条件是相邻操作研究背景；132人工挂取推车是洗烘转序而非设参失败，程序人工动作另用其真实段落。可保留为相邻边界，不能算本动作专属失败个案。

涉及：cn-ind-shoe-coldglue-form-002、cn-ind-garment-sew-003、cn-ind-garment-wash-003。

### R04 · 破底破面对象与工具等价仍需现场规范

分别写出已证实术语、研究推定加工对象、待证实工具对应；99机器人打粗只作为条件性候选，缺同义与验收证明。不可新增砂磨参数。

涉及：cn-ind-shoe-coldglue-form-006、cn-ind-shoe-coldglue-form-007。

定位：cn-shoe-xtep-eia-2022  physical25／正文24⑥仅列术语，未解释对象工具阈值；CN-TEXTILE-IHUA rough 117–124带楦鞋面打粗。

### R05 · 复合输出候选需保留拆分审查及原编号

原11项建议保留，另12项按独立输出/路线补审；下列granularityReviews逐项说明。共23父项拟议，新增子任务计数为0；不能按动词数机械切分或先加总所有备选工艺。

涉及：cn-ind-wool-preparation-006、cn-ind-cotton-spinning-005、cn-ind-cotton-spinning-007、cn-ind-cotton-spinning-008、cn-ind-cotton-spinning-010、cn-ind-cotton-spinning-014、cn-ind-warp-weaving-002、cn-ind-warp-weaving-003、cn-ind-warp-weaving-007、cn-ind-warp-weaving-009、cn-ind-warp-weaving-016、cn-ind-dye-pretreatment-005、cn-ind-dye-pretreatment-006、cn-ind-dye-pretreatment-010、cn-ind-textile-dyeing-005、cn-ind-textile-dyeing-006、cn-ind-textile-dyeing-008、cn-ind-textile-dyeing-010、cn-ind-textile-printing-002、cn-ind-textile-printing-011、cn-ind-textile-finishing-003、cn-ind-textile-finishing-005、cn-ind-shoe-coldglue-form-009。

## 查询与现金流审计

主查询68批、272条的ID、动作全文、正负方向、任务和日期全部一致，请求JSONL与返回JSON/JSONL均保留。补查7批16条文字一致，回包存在，但私存请求没有日期，公开审计写2026-09-09。两组都没有独立精确UTC/先后顺序证明；“调用前保存”只能记为作者说明。每池混合多条正负查询，不能把池内每个命中当作本任务负例。

查看了全部68个主回包的前4条候选标题以抽查范围；没有读取其余所有候选全文，也没有逐一重跑五类设备失败史。现有24任务的限制性记录主要是材料条件、供应商故障指南、保留人工、计划/试验阶段；不是24个已核失败、退出或经济不采用案例。

现金框架核对通过：所有任务和模型参数保持null，含初始全投入、残留人工、运营异常、税与更新资本，营运资金期初、后续变化和实际终期回收分开。增产受需求、瓶颈与下游有效产能约束；同设备、同人工和同损失不重复。未算任何回收期或NPV，不能由本次审校推出经济成立。

## 逐来源复读

| 来源 | 独立核查结果 |
|---|---|
| [CN-TEXTILE-WTU-FIBER](https://nel.wtu.edu.cn/info/1428/1039.htm) | 大学设备说明；仅山羊绒/牦牛绒分梳链、落物回收与除尘，2023-02-20是原页日期。设备组成不等于工厂部署，更不证明洗毛质量。 |
| [CN-TEXTILE-WOOLMARK](https://www.woolmark.cn/industry/product-development/wool-processing/woollen-scouring-carbonising/) | Woolmark全球粗纺洗毛/碳化过程；槽洗、烘干、辊压机制及毡缩条件可留，非中国案例。中文化学式误写未用于报告，不引用危险配方数字。 |
| [CN-TEXTILE-DONGJIA-CARD](https://www.dongjia.cn/cn/product/FA206B.html) | FA206B棉/棉型化纤梳棉成条和多点吸尘原文支持；安全自停列表最后105行仅金属检出，未明确金属与自停联锁，stops.claim须收窄。 |
| [CN-TEXTILE-CTMTC-SPIN](https://www.ctmtc.com.cn/products/spinning/blowroom-line/3) | CTMTC各段材料/机型不同，开清棉段偏化纤再生棉，环锭与转杯不能混用；备筒/紧密纺/检测选配须保留，海外出口不证中国现场。 |
| [CN-TEXTILE-KAICHENG](https://www.chinakaicheng.com/nd.jsp?id=755) | 2025-12-20供应商络筒宣传，光电清纱切除捻接有段落；匿名效率/精度数字未入参，不能证2026运营或全部纺纱工序接头。 |
| [CN-TEXTILE-JIESUER](https://www.jiesuer.cn/portal/integrated/detail/id/47.html) | JSE-32经纱穿综穿筘设备说明；搬到织机不意味着自动搬运或安装经轴，按材料规格限定、无日期无客户验收。 |
| [CN-TEXTILE-QDU-WARP](https://ctc.qdu.edu.cn/info/1076/3209.htm) | 青大2021-09-04设备登记，电脑小样短码整经；登记正常不证明2026持续使用，不覆盖规模整经和全套落轴倒轴。 |
| [CN-TEXTILE-CHANGLING-STUDY](https://www.cltme.com/Qikan/detail/classid/229/id/402.html) | 2013-12-25 FS220研发介绍，棉本色坯布离线视觉检测/标记供人工修补；历史全人工评价不能作当前比例。 |
| [CN-TEXTILE-SHAOYANG](https://www.syefj.com/Product_Con_cn/id/24.html) | 邵阳退煮漂联合线限定含棉/所列混纺等，支持同步传动温控、水洗轧水烘筒；蒸箱手轮、组合或分段路线不等于无人全流程。 |
| [CN-TEXTILE-DONPRO-DOSE](https://donpro.com/color-studio) | DONPRO液态助剂计量泵送、配送记录和管路清洗有据；人扫码/系统对接是选项，粉/稠料预溶可选，未证处方批准与浓度验收。 |
| [CN-TEXTILE-DONPRO-DYE](https://donpro.com/fabric-dyeing/soft-flow-pro-ecodye) | DONPRO溢流织物染色循环及喷嘴清洁、滤毛可留；智能水洗/刮毛/pH可能选配，不能推纤维和筒纱全部适配，喷嘴清洗不等于助剂管道清洗。 |
| [CN-TEXTILE-BUENTEX-STENTER](https://www.buentex.com/cn/product/stenter.html) | Buentex定型流程有对中整纬纠偏、烘房冷却落布；定制配置与用途为厂商能力说明，不证明所有后整理品种质量。 |
| [CN-TEXTILE-HUCEEN](https://www.huceen.cn/hyfa/461-cn.html) | Huceen2022-05-11匿名定型项目说明，牵布温区冷却与温度时间张力要求有据；参数条件非具名失败、没有客户长期数据。 |
| [CN-TEXTILE-XRITE](https://www.xrite.cn/college/case-studies/digital-printing/) | X-Rite数码印花色表/ICC与染样色光品控；保留人工试染及目测批准，不测幅宽毛效牢度。数字印花相对平/圆网场景为相邻工艺。 |
| [CN-TEXTILE-BOYAN](https://www.boyank3.com/product-center/k3-table-printing-production-line) | BOYAN台板机电动行走刮印有机制；油墨干燥不证织物蒸化固色，感光胶涂布/显影清洗仅选配设备目录，应与机制层分开。 |
| [CN-TEXTILE-RICHPEACE-CUT](https://www.richpeace.cn/index.php?c=show&id=311) | Richpeace裁剪CAD设计放码排料为数据支持，非在面料实体划线或物理裁切的运行案例。 |
| [CN-TEXTILE-JINGWEI](https://www.jingwei.com.cn/products/v21.html) | Jingwei CB03E样衣/定制平台，铺平面料后视觉对条格刀切、台面清废可留；不能证全部量产材料/分类回收和整机维护。 |
| [CN-TEXTILE-JUKI-BUTTON](https://www.jukichina.com/industrial_c/products_c/apparel_c/automatic_c/detail.php?cd=AMB-289_C) | JUKI AMB289电子钉扣缝型与驱动有据；操作员放扣、定位和少量润滑明确，产品保护功能不是客户失败事件。 |
| [CN-TEXTILE-AITU](https://www.aitu-ai.com/products/robot) | AITU页面写工厂测试与2026计划上市，未证当前投产；分离对齐/模板上下料是操作柔料的能力声明，不支持熨烫定型，不能与Fudan合成同一案例。 |
| [CN-TEXTILE-SUNRISE](https://www.sunrise.com.cn/Smart-Production) | Sunrise自动上领含领骨定位与差动送料，可用于局部缝领；成衣除绒不等于工位清洁，吊挂穿过工段不等于执行各工段。 |
| [CN-TEXTILE-SAILSTAR](https://www.sailstar.com.cn/en/nd.jsp?fromMid=1029&id=35) | 申洲水洗车间客户余敏勇文章出自2018期刊、2021-11-15供应商转载；泵送水气冲洗/程序/洗烘转序有据，但手动挂取、干预和推车仍在，不证2026。 |
| [CN-TEXTILE-SOLIDOT](https://www.solidotech.com/cn/cases/the-application-of-solidot-io-modules-in-the-automation-production-line-for-shoe-spray-treatment-and-glue-spraying) | Solidot未具名产线应用，处理剂/胶/3D检查/压合节点分开；处理剂烘烤不等于涂胶后干燥，未证材料适配或客户验收。 |
| [CN-TEXTILE-DESMA](https://www.desma-china.com/cn/automation/amirc/) | DESMA全球说明中文工艺译名混有直接注塑/冷粘；只可用清楚的打粗施胶与人工铺底句，手动装入不证套楦动作。 |
| [CN-TEXTILE-IHUA](https://www.ihua-institute.com/workstations.html) | IHUA鞋底/鞋面喷胶、带楦鞋面打粗和皮鞋抛光分站；皮鞋抛光不套运动鞋，打粗与EIA破面术语等价仍需现场核实。 |
| [CN-TEXTILE-DELIIT](https://www.deliit.net/product/145.html) | DELIIT压底液压动作和可设置程序有据，占地约束为该方案例，不推出全国部署收益；无日期/未具名验收。 |
| [CN-TEXTILE-CHANXAN](https://www.chanxan.cn/eyht/234.html) | CHANXAN卷材画线激光切出、人工装卷有据；激光和刀模工艺不同，鞋面卷材不推全部底片和材料，参数未入回报。 |
| [CN-TEXTILE-SHOE-REPORT](https://ah.people.com.cn/n2/2026/0709/c374164-41634118.html) | 人民日报安徽2026-07-09现场文章，喜宝厂长称6月投产；扫码针车与机械协同施胶压合属于报道，保留人工上下料/抽检，中央连接是计划。 |
| [CN-TEXTILE-GBOS](https://www.gboslaser.com/video_details/smarter-sole-bonding) | GBOS英文演示页只核了文字字幕的3D路径喷胶/清喷嘴能力，未分析视频；标题Sole Bonding不证明贴底压合，更非具名中国工厂。 |
| [CN-TEXTILE-STAUBLI-TOPMATIC](https://www.staubli.com/global/en/textile/products/warp-tying-machine/topmatic.html) | Staubli全球TOPMATIC单/双结和按机型适配可留；PC双纱检测不是全部机型，备经/上轴未完成，全球资料不当中国案例。 |
| [CN-TEXTILE-AVA](https://avacadcam.com/zh/software/%E5%88%86%E8%89%B2/) | AVA全球分色软件中文页面，分色师使用与流程重复自动化有据；不证物理制网和美术审稿无人化。 |
| [CN-TEXTILE-DONGJIA-LOOM](https://www.dongjia.cn/cn/product/JA30.html) | JA30喷气引纬、打纬、送经卷取及断经断纬停机/显示/找梭口有据；集中供油有手动/自动版本，不等于自动清洁接头与维修。 |
| [CN-TEXTILE-LOOM-FAULT](https://www.qdkaishuokeji.com/news/news39.html) | 铠硕2021-06-30工程故障指南列边撑绞边卷取、张力传感器和机械件情况；不属于具名事故/退出，不能跨品牌归因JA30。 |
| [CN-TEXTILE-JUKI-TACK](https://www.jukichina.com/industrial_c/products_c/apparel_c/tacking_c/detail.php?cd=LK-1900C_C) | JUKI LK1900C按机型材料/花型套结、压脚、张力设定有据，面料拿放与旋梭供油保留，不提固定省人工。 |
| [CN-TEXTILE-JUKI-BUTTONHOLE](https://www.jukichina.com/industrial_c/admin/pdata/filedata/473/lbh1790an_ch.pdf) | JUKI两页目录已目视：physical2电子控制、切刀多次落刀及穿线/张力切换；physical1内容截至05/2026可读，发布日仍null；文本乱码数字未用。 |
| [CN-TEXTILE-FUDAN](https://www.fudan.edu.cn/2025/1007/c24a146860/page.htm) | 复旦2025-10-07报道CISMA2025模拟模板抓取/行走/下料协同，优化后将实地试用；研发团队柔软变形解释只作该研究背景，不证工业普遍失败。 |

## 136项逐项裁决

各项完整的正反查询核对、方案定位、定义角色、现金空值和拟拆分回执见配套JSON。下表保留每项独立结论；“不足结果可留”不代表研究范围或全任务验收完成。

|序|稳定任务ID|裁决|独立意见|
|---:|---|---|---|
| 1 | cn-ind-wool-preparation-001 | 确认错误需修 | 职业只列开松已分选毛，未列收货建批；保持proposed，职业引用降为场景背景，批次规则待SOP。 |
| 2 | cn-ind-wool-preparation-002 | 限定结果可留 | 开松除杂动作见职业任务1；WTU只给山羊绒/牦牛绒分梳链内开松罗拉，不支持全部原毛洗前验收。 |
| 3 | cn-ind-wool-preparation-003 | 不足结果可留 | 职业任务3直接列调配预处理制剂；无匹配配液机制，配方浓度与计量仍缺，不能从设备名称补自动化。 |
| 4 | cn-ind-wool-preparation-004 | 限定结果可留 | 职业任务2支持洗毛；Woolmark槽洗是全球过程资料，毡缩缠结属于过程质量条件，非中国失败个案。 |
| 5 | cn-ind-wool-preparation-005 | 限定结果可留 | 职业任务2支持按需炭化；Woolmark辊压去草杂属粗纺路线，不给危险配方，也不证明纤维损伤验收。 |
| 6 | cn-ind-wool-preparation-006 | 确认错误需修 | 职业未列本原毛脱水烘干；HJ列设施，Woolmark只支持连续烘干。保持候选并条件性拆分脱水/烘干。 |
| 7 | cn-ind-wool-preparation-007 | 确认错误需修 | 残杂水分损伤检验未由本职业直接列出；Woolmark缠结仅解释检验背景，不能证明自动检测或检验失败。 |
| 8 | cn-ind-wool-preparation-008 | 确认错误需修 | 职业未列净毛交付追溯；proposed和无匹配机制正确，背景引用不可标动作直接依据。 |
| 9 | cn-ind-cotton-spinning-001 | 不足结果可留 | 棉台拆包排包拣杂见开清棉任务1；以已排棉台为单一准备输出可以保留，自动化机制不足。 |
| 10 | cn-ind-cotton-spinning-002 | 限定结果可留 | 职业开清棉任务2支持动作；CTMTC所列化纤/再生棉/落棉材料与原棉有差异，已限定且不能证拆包与混棉验收。 |
| 11 | cn-ind-cotton-spinning-003 | 限定结果可留 | 梳理任务1—2直接列单纤维化和成生条；东佳仅棉/棉型化纤机内机制，换筒与条干仍缺。 |
| 12 | cn-ind-cotton-spinning-004 | 限定结果可留 | 并条任务1直接支持成熟条；CTMTC匀整牵伸控制可保留，多备筒选配，不证明人工接头消失。 |
| 13 | cn-ind-cotton-spinning-005 | 需修订边界 | 粗纱任务1—2及职业定义支持供条和成纱；设备只支持牵伸张力，换条接头与连续成纱输出需分核，保留原拆建议。 |
| 14 | cn-ind-cotton-spinning-006 | 限定结果可留 | 粗纱任务4落纱与纺纱任务1供应可合为定点交接输出；外置自动落纱不证明转运和批次核对。 |
| 15 | cn-ind-cotton-spinning-007 | 确认错误需修 | 纺纱任务1—2在physical344/spinning，cotton-pre不含此段；修显示引用，供粗纱/生头/连续纺纱仍待独立计量。 |
| 16 | cn-ind-cotton-spinning-008 | 确认错误需修 | 纺纱任务3在physical344/spinning，错误cotton-pre引用须纠；集落仅落管，重启输出另验，原拆建议保留。 |
| 17 | cn-ind-cotton-spinning-009 | 确认错误需修 | 纺纱任务4在spinning而非cotton-pre；络筒清纱切疵捻接可保留，须与013区分常规清纱循环和另行返修。 |
| 18 | cn-ind-cotton-spinning-010 | 确认错误需修 | 纺纱任务5—6在spinning而非cotton-pre；并线捻线与制线产生不同产品/路线，须建备选分支，不能作为已原子化统一任务。 |
| 19 | cn-ind-cotton-spinning-011 | 确认错误需修 | 梳理任务4与纺纱任务7属于两处职业段；cotton-pre只保留梳理支持，粗纱断纱报警不代表全部机台质量。 |
| 20 | cn-ind-cotton-spinning-012 | 确认错误需修 | 开清棉/并条停台段可留，纺纱任务7须补physical344/spinning；原因调查和恢复条件是操作化，不能据职责推自动排障。 |
| 21 | cn-ind-cotton-spinning-013 | 确认错误需修 | 纺纱任务2/4/7须指向spinning；络筒切疵捻接与009常规循环可能重复，仅故障后另行返修作为候选边界。 |
| 22 | cn-ind-cotton-spinning-014 | 确认错误需修 | 回花回收/并条清地面/粗纱清台可分段指引；粗纱任务6跨physical344，纺纱任务8在spinning。回收与清洁不同输出原拆建议合理。 |
| 23 | cn-ind-cotton-spinning-015 | 确认错误需修 | 棉卷票签不能直接证明最终筒纱贴标交付；CTMTC质量追踪仅信息辅助，保持拟议、降职业直接角色。 |
| 24 | cn-ind-warp-weaving-001 | 不足结果可留 | 整经任务1列插挂接头整理；未核完整自动插纱路径，单一可运行纱阵列输出可以保留。 |
| 25 | cn-ind-warp-weaving-002 | 需修订边界 | 整经任务2—4支持整经、落轴、倒轴；大学小样短码设备仅第一阶段，轴卷形成和搬离/倒轴应按独立输出补拆分审查。 |
| 26 | cn-ind-warp-weaving-003 | 需修订边界 | 浆纱任务1—2为经轴安装与浆液配制两种对象；原拆分建议合理，无方案不等于不可行。 |
| 27 | cn-ind-warp-weaving-004 | 不足结果可留 | 浆纱任务3直接支持温度车速控制；无匹配机制，联合工艺控制可暂作一循环，阈值仍需品种SOP。 |
| 28 | cn-ind-warp-weaving-005 | 不足结果可留 | 浆纱任务6支持标样色光与纱疵检查；没有把颜色仪泛例套给全部纱线状态，证据缺口保留。 |
| 29 | cn-ind-warp-weaving-006 | 确认错误需修 | 浆纱任务5直接列落轴但不列织造接收签认；须将职业支持限定落轴、转序追溯作为推导条件。 |
| 30 | cn-ind-warp-weaving-007 | 需修订边界 | 穿经/结经为替代分支，经轴安装另有输出；JIESUER穿引与Staubli全球结经各有限定，不证整轴自动安装。 |
| 31 | cn-ind-warp-weaving-008 | 限定结果可留 | 织布任务3直接列附件和参数准备；JA30触屏只支持设参信息，不能据此证明附件安装；同一待织机输出暂不机械拆分。 |
| 32 | cn-ind-warp-weaving-009 | 需修订边界 | 织布任务6—7支持供纬与回丝处理，但稳定供给和废纱输出不同；建议补回丝处置输出并核是否独立计量。 |
| 33 | cn-ind-warp-weaving-010 | 限定结果可留 | 织布任务4与JA30引纬打纬送经卷取相适；供应商故障说明不归因JA30实际故障，现有反证分类合理。 |
| 34 | cn-ind-warp-weaving-011 | 限定结果可留 | 织布任务5巡检有据；断经断纬传感仅局部信号，不覆盖布面质量；故障指南可作检查范围背景。 |
| 35 | cn-ind-warp-weaving-012 | 限定结果可留 | 织布任务4停台处理有据；显示/自停/找梭口只是定位辅助，不能称自动接头；故障指南不代表客户退出。 |
| 36 | cn-ind-warp-weaving-013 | 不足结果可留 | 织布任务8列落布车卸卷，送验交接属延伸；建议显示phase交接并补接收边界，不将卸卷另计一次。 |
| 37 | cn-ind-warp-weaving-014 | 限定结果可留 | 织布任务9验布有据；2013 FS220离线棉本色布视觉研究保留历史层级，人工修布是流程边界。 |
| 38 | cn-ind-warp-weaving-015 | 限定结果可留 | 织布任务9列检验修补清洗开剪；视觉只帮找疵，不执行修织；按不同可修缺陷建立路线，不先增任务数。 |
| 39 | cn-ind-warp-weaving-016 | 需修订边界 | 整经清机、浆槽清洗、织机清洁跨不同设备与废物；须按实际工位拆分候选，不能把各工段当同一可调度任务。 |
| 40 | cn-ind-warp-weaving-017 | 确认错误需修 | 织布9—10支持验修和记录但不支持交货米数/等级字段；保留proposed，职业标部分动作支持而非完整交付依据。 |
| 41 | cn-ind-dye-pretreatment-001 | 限定结果可留 | 前处理任务1列配制和浓度测定；助剂泵送只支持液体计量配送，完整配方和浓度检测仍缺。 |
| 42 | cn-ind-dye-pretreatment-002 | 不足结果可留 | 前处理任务2直接列缝头穿引；同一连续进布端可作准备循环输出，无匹配自动化保留。 |
| 43 | cn-ind-dye-pretreatment-003 | 不足结果可留 | 前处理任务3吸边对中直接支持；调节与连续导布不同人机边界待SOP，不以通用定型机补证。 |
| 44 | cn-ind-dye-pretreatment-004 | 不足结果可留 | 前处理任务6限棉及含棉织物烧毛，当前范围吻合；无匹配已读机制，不可据此否定烧毛专机。 |
| 45 | cn-ind-dye-pretreatment-005 | 需修订边界 | 职业定义及任务4支持若干前处理分支；退煮漂联合机不支持丝光。已有路线建议应保留且不累加工时。 |
| 46 | cn-ind-dye-pretreatment-006 | 需修订边界 | 前处理任务5支持堆置/汽蒸水洗烘燥；联合机局部连续机构可留，分离堆置路线后核湿洗/烘燥可独立验收的候选。 |
| 47 | cn-ind-dye-pretreatment-007 | 不足结果可留 | 前处理任务9明确毛效白度纬斜等；无匹配检验自动化，产品标准与各指标测试方法需补，不从设备读取代替。 |
| 48 | cn-ind-dye-pretreatment-008 | 不足结果可留 | 前处理任务10支持异常处理；原因隔离恢复为定性操作化，未获自动排障机制，不能写成技术障碍事实。 |
| 49 | cn-ind-dye-pretreatment-009 | 不足结果可留 | 前处理任务9病疵处理有据；可返修范围/方法缺证，保留返工候选，不断言所有病疵可处理。 |
| 50 | cn-ind-dye-pretreatment-010 | 需修订边界 | 任务11—12收废/清洁/维护有据却不同输出；DOSE仅管路清洗，建议分核废物分类与设备清洁维护的独立验收。 |
| 51 | cn-ind-dye-pretreatment-011 | 确认错误需修 | 任务12记录有据，检验签认和交下一工序属扩展；DOSE只投料记录，职业角色降为部分动作支持。 |
| 52 | cn-ind-textile-dyeing-001 | 限定结果可留 | 染色任务1直接支持打样核处方；X-Rite软件+仪器为配色辅助，实际试染和调色师批准明确保留。 |
| 53 | cn-ind-textile-dyeing-002 | 不足结果可留 | 染色任务2直接列平整毛效幅宽含碱；没有用色差仪替代这些指标，保留缺证和测试方法待补。 |
| 54 | cn-ind-textile-dyeing-003 | 限定结果可留 | 染色任务3配液输送有据；DOSE仅指定液态料泵送，溶解/配方批准不由其证明。 |
| 55 | cn-ind-textile-dyeing-004 | 限定结果可留 | 染色任务4范围包括纤维纱织物；DONPRO溢流机仅适用织物分支，完整装卸与质量验收未核。 |
| 56 | cn-ind-textile-dyeing-005 | 需修订边界 | 染色任务5后洗固色有据；智能水洗的选配限制已留，固色与洗涤若能独立验收应候选拆分，不视水洗为牢度合格。 |
| 57 | cn-ind-textile-dyeing-006 | 需修订边界 | 染色任务5直接列脱水烘干；两种湿度状态/设备可独立计量，建议候选拆分，当前未获机制。 |
| 58 | cn-ind-textile-dyeing-007 | 不足结果可留 | 染色任务6异常处理直接支持；处置记录和隔离恢复需SOP，缺机制不能升级为不可行判断。 |
| 59 | cn-ind-textile-dyeing-008 | 确认错误需修 | 染色职业未直接列成品色光/牢度复核；保持proposed并降角色，X-Rite只色光；牢度试验应独立验收候选。 |
| 60 | cn-ind-textile-dyeing-009 | 确认错误需修 | 职业没有具体返染工艺；保持proposed，职业仅场景背景，不能将异常处理泛化成任意批次可复染。 |
| 61 | cn-ind-textile-dyeing-010 | 需修订边界 | 染色任务7—8收废清洁维护有据，输出复合；喷嘴/滤毛只局部清洁，建议分核回收分类与设备维护。 |
| 62 | cn-ind-textile-dyeing-011 | 确认错误需修 | 染色任务8支持记录而非后整理交付；配送数据仅工艺一部分，职业改部分支持，交付验收仍待核。 |
| 63 | cn-ind-textile-printing-001 | 限定结果可留 | 制版任务1—2支持分色制稿；AVA软件输出印制文件可保留，分色师确认与中国部署未核。 |
| 64 | cn-ind-textile-printing-002 | 确认错误需修 | 制版任务3—7覆盖感光材料与多工段制网；BOYAN仅选配目录，不是已核动作机制，需降equipment-scope候选并同步统计。 |
| 65 | cn-ind-textile-printing-003 | 不足结果可留 | 制版任务8直接列修网瑕疵；可修范围和版型复核为操作化，无自动修版证据保留。 |
| 66 | cn-ind-textile-printing-004 | 不足结果可留 | 印花任务1支持布坯/花网检查及排列刮刀；可按一套可印配置暂留，独立检查/磨刀工时待SOP，不自动增加任务。 |
| 67 | cn-ind-textile-printing-005 | 确认错误需修 | 印花任务2支持打样和核色；X-Rite是数字印花色表流程，相对本场景平/圆网只相邻分支辅助，不作丝网完整小样机制。 |
| 68 | cn-ind-textile-printing-006 | 限定结果可留 | 印花任务3与BOYAN台板刮印相适；上料铺布/套版未自动化，厂商性能不作实际产能。 |
| 69 | cn-ind-textile-printing-007 | 不足结果可留 | 印花任务4直接列吸边整纬张力；未获该印制工段匹配机制，其他场景导布机不能替代。 |
| 70 | cn-ind-textile-printing-008 | 不足结果可留 | 印花任务5直接列蒸化/焙烘固色；普通台板油墨干燥未用于证明固色，保留缺口正确。 |
| 71 | cn-ind-textile-printing-009 | 不足结果可留 | 印花任务6异常处理直接支持；恢复条件需SOP，未读故障案例不能说明不存在故障。 |
| 72 | cn-ind-textile-printing-010 | 不足结果可留 | 印花任务7支持卸版网刀具送制网间；可追溯返还工具是统一交接输出，无完整自动机制。 |
| 73 | cn-ind-textile-printing-011 | 需修订边界 | 印花任务7回收浆与制版任务8清机涉及不同地点/对象；应分别保留来源并候选拆分，不能称同一原子清洁循环。 |
| 74 | cn-ind-textile-printing-012 | 确认错误需修 | 印花任务7仅生产记录，成品交付字段扩展；保持proposed，职业部分支持，无替代方案结果可留。 |
| 75 | cn-ind-textile-finishing-001 | 不足结果可留 | 后整理任务1直接支持幅宽牢度干湿检验；无匹配机制，定型产品宣称不替代测试。 |
| 76 | cn-ind-textile-finishing-002 | 限定结果可留 | 后整理2与配制1—3支持工作液；DOSE计量泵送不证明浓度测定或功能处方合格。 |
| 77 | cn-ind-textile-finishing-003 | 需修订边界 | 后整理3—4支持缝接引布/对中；Buentex仅连续对中段。初次接布与稳定导布应按可独立调度条件核候选拆分。 |
| 78 | cn-ind-textile-finishing-004 | 需修订边界 | 后整理任务5为多种路线族；本条拉幅定型分支与005定型本体重叠，应互斥或组合路径引用，不能两行重复计人时。 |
| 79 | cn-ind-textile-finishing-005 | 需修订边界 | 后整理任务6明列定型及配套系统检查；与004同一定型动作须去重，废气/余热检查另验，原拆建议保留。 |
| 80 | cn-ind-textile-finishing-006 | 限定结果可留 | 后整理任务7核标样质量有据；X-Rite只颜色维度，可作限定辅助，不能替代幅宽/牢度/功能测试。 |
| 81 | cn-ind-textile-finishing-007 | 不足结果可留 | 后整理任务7处理病疵直接支持；复验和可修范围需产品SOP，无机制结果保留。 |
| 82 | cn-ind-textile-finishing-008 | 不足结果可留 | 后整理任务8异常检查处理直接支持；未获自动排障案例，技术字段作为待验证条件合理。 |
| 83 | cn-ind-textile-finishing-009 | 不足结果可留 | 配制任务4记录回收剩料直接支持；同一回用料交接及记录可保留一个输出，复用安全条件未核。 |
| 84 | cn-ind-textile-finishing-010 | 确认错误需修 | 后整理任务8支持记录，不列整理布交付验收；保持proposed并限制职业角色，DOSE仅部分投料记录。 |
| 85 | cn-ind-shoe-upper-cut-sew-001 | 确认错误需修 | 制鞋职业任务1限定布鞋主辅料黏合；当前运动鞋网布/皮革范围更宽，须在显示定义收窄或保持适用性待核，不称全部材料直接有据。 |
| 86 | cn-ind-shoe-upper-cut-sew-002 | 确认错误需修 | 制鞋职业任务1限定布鞋复合料烘干；运动鞋支路未直接证实，须与001同步收窄材料/路线，烘干输出与黏合分开合理。 |
| 87 | cn-ind-shoe-upper-cut-sew-003 | 限定结果可留 | 制鞋任务2直接列帮底片划样；CHANXAN限定卷材鞋面画线且人工装卷，不能扩到底片所有材质。 |
| 88 | cn-ind-shoe-upper-cut-sew-004 | 限定结果可留 | 制鞋任务3/EIA②刀模冲裁有据；激光为工艺替代候选，切边热影响不自动等效刀模验收。 |
| 89 | cn-ind-shoe-upper-cut-sew-005 | 不足结果可留 | 制鞋任务4镶接帮样有据；黏合定位单一输出可留，机器人喷整鞋胶不能直接替代本镶接步骤。 |
| 90 | cn-ind-shoe-upper-cut-sew-006 | 限定结果可留 | 职业任务5/EIA⑤支持鞋帮缝合及同双缝线要求；喜宝报道2026新线针车程序，不证明自动摆料或持续运营。 |
| 91 | cn-ind-shoe-upper-cut-sew-007 | 确认错误需修 | 鞋帮检查直接据设计EIA⑤，职业仅缝制场景；应修职业角色，项目当时未生产和非2026现场检验仍保留。 |
| 92 | cn-ind-shoe-upper-cut-sew-008 | 确认错误需修 | 剪多余线头直接据EIA⑤而非制鞋职业任务5；修职业角色，独立清理鞋帮输出可以保留。 |
| 93 | cn-ind-shoe-coldglue-form-001 | 确认错误需修 | 成型配料直接据EIA⑥，职业6—7只范围；修角色，订单配套不由机器产品方案证明。 |
| 94 | cn-ind-shoe-coldglue-form-002 | 确认错误需修 | EIA⑥套鞋楦直接有词，职业6仅绷帮/鞋楦定型；DESMA手动装入鞋面鞋底不是套楦动作反证，须降相邻装载边界。 |
| 95 | cn-ind-shoe-coldglue-form-003 | 确认错误需修 | 压前帮由EIA⑥支持，职业6仅绷帮成型范围；修角色，专属机理不足保留。 |
| 96 | cn-ind-shoe-coldglue-form-004 | 确认错误需修 | 敲中帮由EIA⑥支持，职业6仅范围；修角色，不以整线成型替代此局部动作。 |
| 97 | cn-ind-shoe-coldglue-form-005 | 确认错误需修 | 压后帮由EIA⑥支持，职业6仅范围；修角色，前中后帮当前不同形状验收可分别保留候选。 |
| 98 | cn-ind-shoe-coldglue-form-006 | 确认错误需修 | EIA⑥列破底但未解释加工对象/工具/阈值；鞋底表面和施胶条件属研究推定，须单独标待验证，职业7降范围。 |
| 99 | cn-ind-shoe-coldglue-form-007 | 确认错误需修 | EIA⑥仅列破面，鞋面打粗与其对应需SOP确认；IHUA打粗机制可作条件候选，不能把术语等价作为直接事实，职业7降范围。 |
| 100 | cn-ind-shoe-coldglue-form-008 | 确认错误需修 | EIA⑥直接列鞋底鞋面刷处理剂，职业7仅胶合范围；修角色，SOLIDOT匿名喷涂路线材料相容性仍缺。 |
| 101 | cn-ind-shoe-coldglue-form-009 | 需修订边界 | 职业7胶合与EIA⑥涂胶有据；IHUA产品与喜宝2026现场分层正确，双工位施胶拆分须避免共用机器人收益重复。 |
| 102 | cn-ind-shoe-coldglue-form-010 | 确认错误需修 | EIA⑥涂胶后烘干直接支持，职业7仅范围；修角色，未以处理剂烘烤替代胶层干燥。 |
| 103 | cn-ind-shoe-coldglue-form-011 | 限定结果可留 | 职业7及EIA⑥帮底组合有据；DESMA辅助铺底仅局部且有人，不能认自动配准或中国场景在运。 |
| 104 | cn-ind-shoe-coldglue-form-012 | 限定结果可留 | 职业7/EIA⑥压合有据，DELIIT液压和喜宝报道均有限定；人工/压力曲线/粘合验收未核不生成回报。 |
| 105 | cn-ind-shoe-coldglue-form-013 | 确认错误需修 | EIA⑥运动鞋冷却直接支持，职业6—7仅范围；修角色，冷却输出与压合区分合理。 |
| 106 | cn-ind-shoe-finish-pack-001 | 不足结果可留 | 职业8泛指成鞋抛光，当前运动鞋限定下皮鞋IHUA抛光只相邻线索；保持无匹配机制并记录这种范围筛除。 |
| 107 | cn-ind-shoe-finish-pack-002 | 确认错误需修 | 成鞋检查直接据EIA⑦，职业只整饰范围；修角色，喜宝人工抽检是观察而非自动检验不可行证据。 |
| 108 | cn-ind-shoe-finish-pack-003 | 确认错误需修 | 包装直接据EIA⑦而非职业整饰；修角色，实际装箱配双条码细节未展开，不能称完整包装流程。 |
| 109 | cn-ind-garment-cut-001 | 不足结果可留 | 裁剪任务1备料确认直接支持；HJ只服装单元，完整订单/材料验收仍需SOP，自动化缺证。 |
| 110 | cn-ind-garment-cut-002 | 限定结果可留 | 裁剪任务2划样有据；Richpeace仅CAD数据，不执行面料实体划线，现有辅助边界可留。 |
| 111 | cn-ind-garment-cut-003 | 限定结果可留 | 裁剪任务3直接支持裁成坯料；Jingwei样衣/定制刀具与视觉为局部机制，铺平材料和量产适配未核。 |
| 112 | cn-ind-garment-cut-004 | 不足结果可留 | 裁剪任务4查验片直接支持；定性验收尚缺尺寸公差与缺陷方法，无机制结果可留。 |
| 113 | cn-ind-garment-cut-005 | 不足结果可留 | 裁剪任务4打号标记直接支持；切床刀切能力不等于标号，未误继承相邻机制。 |
| 114 | cn-ind-garment-cut-006 | 不足结果可留 | 裁剪任务4配片分类扎包输出一个可交接套件；不因多个动词机械拆分，无已读自动机制。 |
| 115 | cn-ind-garment-cut-007 | 不足结果可留 | 裁剪任务5回收边角料有据；台面清废不等于分类回用，缺证保留正确。 |
| 116 | cn-ind-garment-cut-008 | 限定结果可留 | 裁剪任务5清设备工地有据；Jingwei运动台面清废仅局部，刀头地面维护不被覆盖。 |
| 117 | cn-ind-garment-sew-001 | 不足结果可留 | 缝纫任务1正反面纹路疵点识别有据；AITU抓取对齐不自动证明缺陷分类，无匹配机制可留。 |
| 118 | cn-ind-garment-sew-002 | 不足结果可留 | 缝纫任务1核裁片编号有据；与前序打号区分发送/接收边界，不重复同一次扫描工时，当前机制不足。 |
| 119 | cn-ind-garment-sew-003 | 确认错误需修 | 缝纫任务2以熨烫/专用工具作整理定型；AITU分离摆放对齐不支持该热定型动作，需降相邻搬运线索并修结论/统计；Fudan仅布料操控背景。 |
| 120 | cn-ind-garment-sew-004 | 限定结果可留 | 缝纫任务3为缝合动作族；AITU模板协同属测试声明、Sunrise领部仅专用工序，两个品牌/Fudan演示不能合并为一个投产案例。 |
| 121 | cn-ind-garment-sew-005 | 限定结果可留 | 缝纫任务4锁眼直接支持；JUKI PDF物理2电子送布切线切刀、定位穿线条件已目视，05/2026是目录内容版期非发布日期。 |
| 122 | cn-ind-garment-sew-006 | 限定结果可留 | 缝纫任务4钉扣直接支持；AMB-289仍须放扣定位与润滑，不能据专机推固定工时或完整无人循环。 |
| 123 | cn-ind-garment-sew-007 | 限定结果可留 | 缝纫任务4套结直接支持；LK1900C预设花型/抬压脚/张力按机型，面料拿放和换底线保留。 |
| 124 | cn-ind-garment-sew-008 | 不足结果可留 | 缝纫任务5清机清场直接支持；成衣除绒不是工作地清洁，无机制结果可留。 |
| 125 | cn-ind-garment-press-001 | 不足结果可留 | 整型任务2设温度时间直接支持；控制面板目录不足证明制造场景程序自动批准，缺证可留。 |
| 126 | cn-ind-garment-press-002 | 不足结果可留 | 整型任务3成衣熨烫直接支持；酒店布草熨平目录已筛除，待相同款式/面料的成衣工艺机制。 |
| 127 | cn-ind-garment-press-003 | 不足结果可留 | 整型任务4复核规格直接支持；定性验收还需测量点公差，不以衣物输送信息替代实际规格检验。 |
| 128 | cn-ind-garment-press-004 | 不足结果可留 | 整型任务4按规格码放直接支持；与003检验有独立交接输出，吊挂输送不等于规格分类，缺证保留。 |
| 129 | cn-ind-garment-press-005 | 不足结果可留 | 整型任务5清机清场直接支持；无清洁自动化，保留SOP/停机维护要求缺口。 |
| 130 | cn-ind-garment-wash-001 | 不足结果可留 | 服装水洗任务1配化学原料直接支持；申洲泵送不是配制工作液，保持无匹配机制正确。 |
| 131 | cn-ind-garment-wash-002 | 不足结果可留 | 水洗任务1添加浮石直接支持且限石磨洗路线；普通洗烘传输不证明装浮石机制。 |
| 132 | cn-ind-garment-wash-003 | 需修订边界 | 水洗任务1—2设时间水温有据；历史条码/ERP读程序是辅助，人工挂取仅邻接流程边界，负证应逐动作说明非设参失败。 |
| 133 | cn-ind-garment-wash-004 | 不足结果可留 | 水洗任务2退浆直接支持；普通水洗运行不能证明退浆配方完成，保留无匹配机制。 |
| 134 | cn-ind-garment-wash-005 | 不足结果可留 | 水洗任务3磨洗直接支持；石磨路线的浮石分离和效果检验未展开，不能用普通洗涤过程替代。 |
| 135 | cn-ind-garment-wash-006 | 限定结果可留 | 水洗任务3烘干直接支持；2018申洲案例有输送/烘干控制和人工挂取干预，2021转载不得改写成2026持续在运。 |
| 136 | cn-ind-garment-wash-007 | 限定结果可留 | 水洗任务4清设备工地有据；申洲投料管路水/压缩空气冲洗仅局部，洗衣主机拆洗与地面清洁未被证实。 |

## 覆盖与后续验证

原11个拟拆分父项保留，新增12个候选建议，共23父项；实际新增子任务计数为0。推荐把原65个限定机制任务分成62个局部/必要辅助、1个设备目录、2个相邻工艺；71个无匹配机制保留。此分类仍待作者修订后的限定复检。

没有核到每项2026持续商业运行、完整质量验收或可撤销付薪工时；未读原材料、专利候选及案例仍需继续。针织/非织造/丝麻、服装各款式部件、原皮鞣制/皮具/羽绒及非冷粘制鞋均未完整覆盖；136不等于17—19大类全部人工任务。

机会清单仍为访谈和验证优先方向：验布找疵协作、液体助剂配送清残、运动鞋施胶压合、服装专机扣眼钉扣套结、成衣洗烘转序。OP2须先修清洗对象与引用。每方向取得同材料工单、异常/返工/接管日志、完整报价和付薪记录后才能核经济条件。评论或新线索不能直接转成研究事实。

作者稿、库存、总数据和网站均未修改；本审校未冻结任务清单。
