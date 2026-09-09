# 中国建筑207项自动化首轮独立审查

审查日期：2026-09-09。作者输入 SHA-256：`07e1a6bedf599539657998cf24321d2c6d6659a33d6b481111b937af239fbbd5`。207项、15场景、25个保留机制来源、36条主张。原稿、库存与代码均未改；207个 originalTask 与库存逐字段一致。

结论：**修订后可作为未冻结工作版；当前不能通过全行业最终验收。** 本轮不是重新执行研究，而是独立核读原文、逐任务裁决与审计层级检查。137项没有保留匹配机制，传统工具比较仍有明确遗漏，工时与现金流数据全部不足。

## 裁决与范围

| 裁决 | 项数 |
|---|---:|
| evidence-gap | 104 |
| bounded-first-pass-acceptable | 52 |
| revision-or-proposed-granularity | 40 |
| confirmed-error | 11 |

另有25项提出按独立产出/计量边界拆分的建议；全是拟议，不改变207计数，也不把父项与子项并计。其余多动词任务如模板同步锁固校正、一次丝头加工、同一修复点的拆补钉，未因标题形式机械拆开。

## 可合入的纠错清单

### E01 · confirmed-error

范围：CN-CT-CLAIM-RB-PACK; rebar-machining-011/012。分箱未被该源原文明确支持。

改成按构件分类至料仓/分拣包装；保留料牌核验、现场码放和签收缺证。

### E02 · confirmed-error

范围：CN-CT-CLAIM-PL-LIMIT; mortar-plaster-005/006/010。水泥砂浆基面被简化为砂浆材料适配，混淆基底和投料。

逐字保留基面限定，原配方/料性适配未证；首型号定位加入L97，并同步counterEvidence及结论。

### E03 · confirmed-error

范围：cn-const-light-steel-partition-012。纸面石膏板钉眼填平未由当前所引该材料条款支持，邻段是纤维水泥板。

仅保留纸面板防锈为source-backed；填平降proposed或补纸面板隔墙专源，不用吊顶或纤维板自动认证。

### E04 · confirmed-error

范围：rural-water-tank-004/005/006/008/009。masonry定位下填写了防水工或乡村建设工匠的任务号。追加正确定位没有删除错误定位。

删除错挂masonry引用，防水分别用PDF539任务1、2—3、5、4；009用PDF536乡村工匠7但只保留宽职责、proposed与消毒SOP缺口。

### E05 · confirmed-error

范围：CN-CT-OPP-CONCRETE.why。具名项目分别报告布料的概括过强；布料源只有上海徐家汇一重点示范工程，未具名。

改为首秀报道与部分具名工程分别报告局部布料、振捣、整平，不拼接成一条已运行链。

### R01 · revision

范围：CO-SPRAY全部引用位置。机械臂事实在L44、46；当前L49—61不足以定位这一部分。

claims/sources.locators/任务sourceRefs/报告同时补L44、46，不删除已有正确事实。

### R02 · revision

范围：FORM-CLEAN、REBAR-CASE、SCREW-MANUAL。可选配置、现场使用定位及手册日期类型需更清晰。

吸尘/边缘感知按部分实施方式配置；REBAR-CASE部署加L46武宜段；博世2023-02-07标说明书页脚版次日期，勿称网站上线日。

### R03 · revision

范围：全部207 economics.workingCapitalDefinition与formula。相对该基准的余额变化可能被误读为每期重复扣累计资金占用；taxes也需明确增量口径。没有实际数值错误。

明定WC_inc,t=项目WC_t-基准方案WC_t；CF_t扣WC_inc,t-WC_inc,t-1，期初只投WC_inc,0，期末有依据才回收；税费/能源/租赁/残值均同一增量边界。空值保持null。

### R04 · revision

范围：逐任务定义sourceRefs。多数流程定位仍为整节加该节对应动作，精度不足；职业多为宽职责，不证明每个准备/检测/交接动作。

使用taskDecisions.definitionLocator建议精确到条款。职业仅context的项不得声称双路径逐动作全部已证实；补SOP、职业技能标准和验收责任后再冻结。

### R05 · revision

范围：任务拆分、交接及实验室边界。若干原任务具有独立交付物/计量单位；070/075是同一泵送交接的供需两方。

按逐任务备注提出拟议子项，不修改库存、不自动增数量；实验室报告移为外部验收输入；同一次实物交接建立关联避免全额双计。

### G01 · gap

范围：414主查询、16补充查询。主日志只有taskId与raw，query和日期只在公开作者审计；补充有queries与raw但无独立执行时间。

保留作者声明和真实返回，审计层级应降为返回可核、请求/日期部分不可独立复核；本次没有重新执行414或16查询，不补造UTC记录。

### G02 · gap

范围：五类替代比较与137无保留机制任务。现流程原文已明确多种传统机械/手工具，自动化研究尚未吸收，不能把五个空类别当五类比较完成。

先按精确原文补局部基线机制：调直机/卷扬机、塔吊索具、砂轮、量规力矩扳手、空压机清洗球、搅拌机、手持喷枪、冲击电锤等；再对型号/场景实际正反证追查。规范机制存在不等于商业绩效通过。

### G03 · gap

范围：全部207公开研究完备性。均无同一目标场景完整工时/全投入/残留人工现金序列，反例多未获保留，137任务没有保留匹配机制。

研究状态保持first-pass-with-gaps；没有发现不等于不可行，产品条件不是已失败，2021/2023历史材料不是2026在运。

### G04 · gap

范围：现行规范状态及完整覆盖。本次核读北京2021/2022、辽宁2013与2022职业公示稿的动作，不认证这些旧引用为2026全国合规要求。15场景不是全国建筑全量覆盖。

发布前另核现行规范与正式职业版；交通土建、桥隧、钢结构、暖通消防、电缆、防水等未展开场景继续列缺口。

### G05 · gap

范围：部分16补充queries中的site.写法。多条写site.sanygroup.com/site.cscec.com等而非site:运算符，且未设置domains。

如作者欲声明限定官网检索应纠正该声明；已返回原站仍可核为证据，但这类请求不能当域名过滤执行成功。后续必要时补正确限定检索。

## 实际复核步骤与限度

- 逐207核读动作、输入、输出、定性验收、阶段、五类替代及全部保留反证，不按数量自动通过。
- 复读25原缓存相关全文段落与36主张定位；两产品PDF使用页图；新增下载北京混凝土/装饰规范与辽宁供水HTML，实际复读全部被引施工章节。
- 核SHA后复用570页2022职业社会公示稿；复读PDF535、536、539、542、543、545、553相关职业正文；535/539/545另目视。
- 新打开5网页：滚丝/布料成功，三一指导/前海/徐工超时；这些用原缓存并不声称已成功刷新。
- 207私有返回与207公开审计逐taskId对应，414题名查询唯一且包含任务动作，全部候选URL可在原返回中核对；原请求参数和日期限制如G01。

两北京规范已重新取得PDF并读相关章节；封面日期及关键材料/连接页做视觉核对。职业公示稿为570页原件，SHA见JSON。辽宁页面正文落款2013年6月，仍属于历史动作来源。本次不提供规范现行效力的法律认证，也没有把旧技术阈值写入现场执行要求。

主查询私存只有taskId和结果字符串。作者确认当时一任务两条query合并返回，但没有另存原请求参数；因此不能独立证明每次请求完全等同公开审计中的字符串、顺序或日期。16补充在原缓存有queries和结果，可比文字，但时间只来自公开审计。此次没有重新执行430条查询，也不把结果混排误写成单条正向或负向搜索排名。

每个来源的相关段落、时间层级、地域及阶段裁决如下。这里仅给短描述；原缓存和长搜索结果不公开。

| 源 | 原文定位与裁决 |
|---|---|
| [CN-CT-AUTO-REBAR-LINE](https://www.we-i-build.com/rebar-processing.html) | L46、76、80、82、84、88、100、110—116；日期未载，产品页；L82为按构件分类到料仓，L100分拣打包，未写分箱。直棒料范围和人工入仓/下料明确；不证明盘条调直或现场持续商业运行。 |
| [CN-CT-AUTO-REBAR-CASE](https://www.roboticplus.com/index/news/details/cate_id/7/id/457.html) | L39、43、45—46、52、58、76、79；2023-11-15页头；L46具体写沪渝蓉高铁武宜段落地，可保留中国使用自报并补此部署定位。功能来自联合开发厂商；现场/工厂具体分工、当前运行和独立工时未证。 |
| [CN-CT-AUTO-ROLL-THREAD](https://www.we-i-build.com/news/198.html) | L28、33、37、51、62—66；新打开页面确认2025-02-17与原功能；剥肋滚丝/自动调径明确，长度及磨损补偿不等于独立丝头量规检查，产品层级正确。 |
| [CN-CT-AUTO-FORM-RELEASE](https://patents.google.com/patent/CN109296200A/zh) | L41、44、92、127、135—139；2019-02-01是A公开日期；结构及使用方法明确人安装/转手柄。只证明专利设计，不能当商业在用或拆模许可。 |
| [CN-CT-AUTO-FORM-CLEAN](https://patents.google.com/patent/CN120307314A/zh) | L35、38、142、154、158、168；2025-07-15专利公开；磁轮/磨头有据，吸尘罩和边缘感知是在部分实施方式中说明，建议标可选配置。不能证明隔离剂喷涂或螺纹润滑。 |
| [CN-CT-AUTO-FORM-REPAIR](https://patents.google.com/patent/CN2383597Y/zh) | L104—108、114及公开日期字段；2000-06-21历史专利；机床滚压矫平/清浆及人手轮调整明确。2003费用法律状态不是技术失败，已正确排除；大型墙模适配未验证。 |
| [CN-CT-AUTO-COATING](https://www.we-i-build.com/propainter.html) | L44、46、49—61、83—84、94—96、104—105、115—117；未载发布日期；机械臂实际出现在L44、46，现CO-SPRAY的L49—61不完整应补。型号通行/材料约束为规格，不是失败；喷敷不能直接证明批刮压平与界面剂通用适配。 |
| [CN-CT-AUTO-PLASTER](https://www.we-i-build.com/plastering-robot.html) | L42—55、88、97—100、107、116；原参数行标题虽称适用材料，值为适用于水泥砂浆基面；应如实保留基面限定，不能推成任意砂浆料适配。当前PL-LIMIT也漏第一型号L97；未载发布日期，视觉找平不直接证明省去灰饼。 |
| [CN-CT-AUTO-PLASTER-CASE](https://www.itsgc.com.cn/index.php?c=show&id=80) | L52、70、83—85；原文只写10月17日未给年份，publishedAt=null正确；常熟具体工程用例为厂商自报，泵送上墙压抹和遥控有据，不能当2026在用。 |
| [CN-CT-AUTO-PUMP-STOP](https://www.sanygroup.com/activity/3927.html) | L235、243—263；原缓存页头2016.06.30；此次新打开超时。堵泵/振捣器/供应中断是历史指导，不是发生记录；可补任务条件证据，但不得改成已确认退出。 |
| [CN-CT-AUTO-PUMP-MANUAL](https://cos-www.sanygroup.com/2021/8/b0c81cfba6394172b2865ba757be40f3.pdf) | PDF物理7、印刷11—12；页图cn-ct-pump-p7.png；已目视读图，压力换向、自动退活塞、设备故障诊断有据；印刷图形的曲线不是现场数据；URL的2021/8不是出版日期。具体管堵定位/拆管未知。 |
| [CN-CT-AUTO-DISTRIBUTION-CASE](https://www.zoomlion.com/content/details18_21361.html) | L336—349；日期L338；此次重新打开确认2021-01-29首秀；地点为上海徐家汇一重点示范工程，未具名。路径/定点布料/告警和远程监控有据，不证明完整柱梁质量控制。 |
| [CN-CT-AUTO-CAST-VIBRATION](https://www.crecg.com/web/xwzx61/gsyw87/2025080714523279795/index.html) | L165、169、173—174；正文日期2025-08-06与URL8月7日区分正确；青岛地铁5号线板类/仰拱，运营方自报，自动振捣与人工参数/遥控有据。不能扩大到房建柱梁板实证。 |
| [CN-CT-AUTO-GRIND](https://www.bzlrobot.com/contents/10/335.html) | L18、72—79、98—106；2023年2月活动而非网页发布日期，publishedAt=null正确。腻子、打磨集尘、测量和楼面清扫分别为不同设备观摩，不证明一机包办或今日持续运行。 |
| [CN-CT-AUTO-SCREED](https://www.bm-robot.com/detail/321.html) | L66—72；未载发布日期；遥控半自动、激光控制、初凝前整平明确，不能归全自动。房间/楼层可用宣传不等于已验证每个梁板表面。 |
| [CN-CT-AUTO-TROWEL](https://www.bm-robot.com/detail/322.html) | L66—70；未载发布日期；大面积地面自动/遥控抹光产品说明，非柱立面；未提供独立完整施工工时。 |
| [CN-CT-AUTO-QIANHAI](https://en.cscec.com/CompanyNews/CorporateNews/202601/3926827.html) | L51、59—60；原缓存12.01.2026；新打开超时。前海博物馆具体项目方自报，墙面打磨、集尘和整平功能分设备记载，不证明其全链无人化。 |
| [CN-CT-AUTO-LAYOUT2](https://www.roadiant.com/digitalConstruction/constructionLayoutRobot/) | L24、33、43、55；未载发布日期；BIM/CAD取点打印和平板操作明确，地墙顶适用为厂商声称。客户名单不作为各施工部位实际部署证据。 |
| [CN-CT-AUTO-NAILER](https://www.bosch-pt.com.cn/cn/zh/products/gnb-18v-38-06019L7080) | L427—429、553—556；中国官网工具产品说明，未载日期；金属轨/龙骨固定到混凝土或钢基层需配钉。只证明人工持工具紧固，不负责构件搬举定位。 |
| [CN-CT-AUTO-SCREW-MANUAL](https://media.bosch-pt.com.sg/binary/manualsmedia/o410132v21_160992A8JY_202302.pdf) | PDF物理/印刷37—38；页脚1 609 92A 8JY (07.02.2023)；页37/38已目视并与提取文字交叉核对；限深停转、手动置钉、逆转及温感过载降速均支持。日期是说明书版次页脚，建议dateType明示，不声称网站上线日；德企中文说明非部署案例。 |
| [CN-CT-AUTO-DIGITAL-ACCEPT](https://www.ricent.com/features/procedure-acceptance.html) | L28、36、44、52、59；未载发布日期；模板、报验、整改、离线采集后同步为软件说明。用于任务只能称邻近留痕，不证明现场检验、责任签认或实物清洁自动完成。 |
| [CN-CT-AUTO-EARTHWORK](https://www.xcmg.com/aboutus/news-detail-1128756.htm) | L497、501、514、527；缓存日期2026-04-27、4月22日展会区分；此次新打开超时。山地设备遥控/爬坡及属具展示不是农村沟槽自动施工案例，范围已限。 |
| [CN-CT-AUTO-PIPE-WELD](https://www.bipt.edu.cn/pub/xyh/xwzx/mxyw/219129.htm) | L15、17、30、35；2021-05-28发布，4月28日至5月22日应用；北京钢制给水管具名工程，研发合作方自报。焊工/辅助工/研发支持、供电干扰及狭窄空间有据，非PE/PVC、非关闭退出。 |
| [CN-CT-AUTO-LIMITS-2021](https://ind-building.cscec.com/hyzx/202104/3306112.html) | L160、162、188—192、214；2021-04-14转载署名住建部调研组；匿名广东住宅装修机器人现场限制，未指特定型号。只作历史邻近观察，不是2026设备失效定论。 |
| [CN-CT-AUTO-TILE-PATENT](https://patents.google.com/patent/CN204960260U/zh) | 公开日期2016-01-13；L72、99—114、173—174；悬挂外墙取砖、涂浆、压贴为专利设计，依建筑附着结构；没有洞口套割、完整现场施工或持续商业记录。 |

## 逐任务结果

C＝北京混凝土2021；D＝北京装饰2022；W＝辽宁农村供水2013；O＝2022职业公示稿。以下定位是独立复读后给出的修订建议；表中的可接受仅限所述局部首轮证据，不代表全任务已证实。

| 编号 | 裁决 | 定位与具体要求 |
|---|---|---|
| cn-const-steel-wall-form-001 | evidence-gap | C4.3.1、4.5.2；按进场批次验收可独立交付；混凝土工4只支持模板职责，不直接证明尺寸孔距验收。补量测/资料核验工具。 |
| cn-const-steel-wall-form-002 | bounded-first-pass-acceptable | C4.3.2、4.4.2；墙身洞口控制线可按同一放线单验收；LY-MARK只支持导入定位打印，基准复核仍缺。 |
| cn-const-steel-wall-form-003 | revision-or-proposed-granularity | C4.4.3；建议拆清除基层杂物与靠尺找平检测：输出分别为洁净面、测量记录；FN-CLEAN不证明后者。 |
| cn-const-steel-wall-form-004 | revision-or-proposed-granularity | C4.3.4、4.5.1(3)、4.6.1；建议拆钢模板面清理与隔离剂涂布；磁吸专利只及磨削/可选吸尘，不能代表涂布。 |
| cn-const-steel-wall-form-005 | revision-or-proposed-granularity | C4.4.4、4.7.1、4.7.5；平台架与外围防护架构造和验收独立，建议条件性拆项；架子工1有职责，模板组只记实际执行或交接。 |
| cn-const-steel-wall-form-006 | revision-or-proposed-granularity | C4.4.5—6；洞口模与阴角模连接对象/固定方法不同，建议两个拟议子任务并保留当前父编号映射。 |
| cn-const-steel-wall-form-007 | evidence-gap | C4.4.7—8、4.7.4；一次安装到稳固拉结可作为验收单元；内外模顺序分条件。补塔吊/索具传统方案，驾驶指挥工时归执行者。 |
| cn-const-steel-wall-form-008 | evidence-gap | C4.4.9；阳角连接及背楞共同完成同一加固节点，可保留；补适配连接器/扳手，禁止外推成通用机器人安装。 |
| cn-const-steel-wall-form-009 | evidence-gap | C4.4.10；原文明确安装与校正同步，同一锁固校正单元不机械拆分；补尺线/扳手辅助机制。 |
| cn-const-steel-wall-form-010 | bounded-first-pass-acceptable | C4.4.11、4.5.1—2；模板几何、稳定、预埋综合验收可按检查单计量；FN-SCAN为墙面扫描邻近机制，不能声称能测模板稳定或连接力。 |
| cn-const-steel-wall-form-011 | bounded-first-pass-acceptable | C4.4.1、4.4.11；验收后浇筑交接成立；数字报验仅过程留痕，权限签认和现场实物交接没有被替代。 |
| cn-const-steel-wall-form-012 | revision-or-proposed-granularity | C4.4.12(1—2)、4.6.4；建议把拆模强度许可核实与解除连接拆开：前者放行结论、后者可吊模板，执行者和计量不同。 |
| cn-const-steel-wall-form-013 | bounded-first-pass-acceptable | C4.4.12(3)、4.6.3—4；受控脱离可独立验收；FM-RELEASE为人装置、人转手柄专利。规范对撬动有不同条件表达，不能由专利替代专项许可。 |
| cn-const-steel-wall-form-014 | evidence-gap | C4.4.12(5)、4.7.3—4；吊运至稳定落位为同一搬运单元；规范明确塔吊，可补传统机械基线及索具/指挥残留人工。 |
| cn-const-steel-wall-form-015 | bounded-first-pass-acceptable | C4.6.5；按缺陷单修复可保留条件分支；轧压矫平仅部分钢模板，裂损修复和大型墙模适配未获证据。 |
| cn-const-steel-wall-form-016 | revision-or-proposed-granularity | C4.6.6；建议模板面清浆与丝杠/螺栓清洁润滑分开计量；两专利均不能支持螺纹抹油自动完成。 |
| cn-const-steel-wall-form-017 | evidence-gap | C4.3.5、4.4.12(6)、4.6.7、4.7.2；周转模板分类存放可验收；标牌依据是堆放区挂标识牌，不应推成每片自动标签。 |
| cn-const-rebar-machining-001 | bounded-first-pass-acceptable | C12.3.7；O钢筋工3、7；核图与料单为同一一致性审核；RB-BILL仅导入/排单，审核尚未验证，不能当核对自动化成功案例。 |
| cn-const-rebar-machining-002 | evidence-gap | C12.4.3；按规格试调模辊导孔为一次设置单元；条文已说明传统调直机，方案栏应补，尚缺自动调整证据。 |
| cn-const-rebar-machining-003 | evidence-gap | C12.4.2—4；调直输出明确；盘条机调/卷扬冷拉与粗筋手扳是条件不同替代分支。直条加工线未覆盖盘条，保持缺口并补已有传统机制。 |
| cn-const-rebar-machining-004 | evidence-gap | C12.4.5(2)；试弯及对尺寸共同产生放行结论，可保留；补弯曲机试样和尺量辅助，不能把设备加工精度视为独立检验。 |
| cn-const-rebar-machining-005 | bounded-first-pass-acceptable | C12.4.5(1—7)；定尺切断有直接机制；机械连接端切口要求与机器人剪切适配待验证，供料下料不从宣传剔除。 |
| cn-const-rebar-machining-006 | evidence-gap | C12.4.6(1—2)；弯点标记是独立输出；可补石笔/放样辅助。自动弯曲可免标点属待验证工艺替代，不证明机器人画点。 |
| cn-const-rebar-machining-007 | revision-or-proposed-granularity | C12.4.6(3)；芯轴换装设置与逐根弯曲可独立核算，建议拟议拆分；RB-ADJUST只支持规格内自动弯曲，不证明所有芯轴安装。 |
| cn-const-rebar-machining-008 | evidence-gap | C12.4.8(1)、12.5；O钢筋工4；加工后尺寸/表面检验可验收；机器人运行记录不是成品独立量测证据。 |
| cn-const-rebar-machining-009 | evidence-gap | C12.4.9、12.4.11；异常批隔离报验可作为同一异常单；条文支持上报/专项检验，实体隔离措施为合理拟议操作化，需SOP。 |
| cn-const-rebar-machining-010 | evidence-gap | C12.4.5(5)、12.4.9；缺陷端切除可独立计量；补切断机/无齿锯局部机制，缺陷识别与余长放行仍未证明。 |
| cn-const-rebar-machining-011 | confirmed-error | C12.4.8(1、3)；修RB-PACK分箱为分类分拣/包装；原文并未确认自动系料牌。打捆和标签可按同一可追溯钢筋捆验收。 |
| cn-const-rebar-machining-012 | confirmed-error | C12.4.8(2—3)；修分箱措辞；源料仓分类不等于施工部位现场码放与签收。保持邻近机制，不与028重复归因包装工时。 |
| cn-const-rebar-machining-013 | evidence-gap | O钢筋工6，PDF535；职业支持维护维修机具，但型号/维护项目/验收SOP缺失；任务过宽，应按设备维护工单细化后评方案。 |
| cn-const-rebar-thread-coupling-001 | evidence-gap | C13.1.2—3、13.5.1—2；套筒与端头适配检查明确；补止通塞规局部工具。当前引用页91—94遗漏具体套筒检验页90，应补定位。 |
| cn-const-rebar-thread-coupling-002 | revision-or-proposed-granularity | C13.3.4(3)，PDF91；现场任务输出应为编号试件及送检交接，外部实验室报告是放行输入；不得把拉伸试验工时计建筑。可保留送样组合但厘清输出。 |
| cn-const-rebar-thread-coupling-003 | evidence-gap | C13.4.2加工(1、3)；修平和去毛刺共同形成可加工端面；原文砂轮片机制可补，自动缺陷定位缺证。 |
| cn-const-rebar-thread-coupling-004 | bounded-first-pass-acceptable | C13.4.2加工(4、6)；一次规格设置可验收；自动调径直接支持，导套/定位尺和全部螺距范围仍待目标机型确认。 |
| cn-const-rebar-thread-coupling-005 | bounded-first-pass-acceptable | C13.4.2加工(4—6)；滚轧与套丝作为工法分支不叠计；原文允许剥肋滚丝同机一次成型，保留为同一丝头产出。 |
| cn-const-rebar-thread-coupling-006 | evidence-gap | C13.4.2加工(7)、13.5.3表；量规及目检共同形成丝头检验结果；可补通止规/卡尺辅助，不能由滚丝自调推量规自动检查。 |
| cn-const-rebar-thread-coupling-007 | evidence-gap | C13.4.2加工(7—8)、13.6.1—4；保护后交出半成品可保留；保护帽与标识包装机制不足，注意不得重复计常规成型钢筋交付。 |
| cn-const-rebar-thread-coupling-008 | evidence-gap | C13.4.2连接(1)，PDF91—92；清除连接丝扣污染可验收；条文明示钢丝刷，应补人工辅助方案，维护状态不代表自动除锈。 |
| cn-const-rebar-thread-coupling-009 | evidence-gap | C13.4.2连接(1.2—4)，PDF92；托平/对正/拧紧为一个接头形成单元；力矩扳手明确，应保留传统工具并按接头型式分支。 |
| cn-const-rebar-thread-coupling-010 | evidence-gap | C13.4.2连接(1.5)；已拧接头油漆标记为独立防漏动作；未获得自动标记机制，补油漆手工基线。 |
| cn-const-rebar-thread-coupling-011 | revision-or-proposed-granularity | C13.4.2连接(2.1)；建议逐个自检与质检员外观/力矩抽检分开，执行者、抽样总体与验收记录不同；扭矩工具不能替代全部外观。 |
| cn-const-rebar-thread-coupling-012 | evidence-gap | C13.4.2连接(2.1)；扩大至全数检查有条文支持，作为异常批检查可留；不能把安装扳手和校核扳手混同。 |
| cn-const-rebar-thread-coupling-013 | evidence-gap | C13.5.3(1)；重拧和加固是缺陷条件分支；补力矩扳手局部工具，加固仍须批准方案，不推通用自动返修。 |
| cn-const-rebar-thread-coupling-014 | revision-or-proposed-granularity | C13.4.2连接(2.2—6)；现场截样送检输出为样本交接包，试验报告由实验室生成；批次放行与现场取样计量分开。 |
| cn-const-rebar-thread-coupling-015 | bounded-first-pass-acceptable | C13.4.2连接(2)、13.5.1；资料与批次放行为一个交付包可保留；软件只支持记录，不作机械接头法定判定。 |
| cn-const-rebar-raft-001 | evidence-gap | C15.1.2—4；钢筋/垫块材料可按进场批验收；外包加工厂检验与现场接收分别记录，不能复制其工时。 |
| cn-const-rebar-raft-002 | revision-or-proposed-granularity | C15.3.2、15.3.6；建议基层清扫与防水隐检交接分开；清扫演示不证明防水保护层承载/无损伤。 |
| cn-const-rebar-raft-003 | bounded-first-pass-acceptable | C15.4.3；垫层定位线可独立验收；定位打印为局部候选，保护层和现场基准仍需校核。 |
| cn-const-rebar-raft-004 | revision-or-proposed-granularity | C15.4.4；基础梁纵筋、箍筋、拉筋属较大的骨架任务族；建议先按可独立验收的分层骨架界定子单元，不按每个动词拆。 |
| cn-const-rebar-raft-005 | evidence-gap | C15.4.5(1、6—7)；下层网铺放绑扎共同形成网片；补钢筋钩等辅助基线，电动绑扎和机器人尚缺本结构适配证据。 |
| cn-const-rebar-raft-006 | revision-or-proposed-granularity | C15.4.6—7；保护层垫块与层间马凳支承不同层、验收高度和数量不同，建议拟议拆分。 |
| cn-const-rebar-raft-007 | bounded-first-pass-acceptable | C15.4.8、15.4.10；下层网交接给预埋专业有直接流程支持；数字流程只保留交接记录，预埋安装不再计钢筋任务。 |
| cn-const-rebar-raft-008 | evidence-gap | C15.4.5(2、6—7)；上层网独立于下层网，保留；补绑扎工具机制，不能从切弯线推装配机器人。 |
| cn-const-rebar-raft-009 | evidence-gap | C15.4.9；插筋定位固定可按一根/一组锚固单元验收；线坠和连接工具有局部支持，焊接仅必要且获批分支。 |
| cn-const-rebar-raft-010 | evidence-gap | C15.4.10、15.5；分阶段钢筋验收可按各阶段检查单计量；职业4主要加工后检查，现场验收精确职责只属上下文。 |
| cn-const-rebar-raft-011 | evidence-gap | C15.4.10；O钢筋工5；整改至合格网片有源；未保留替代方案不证明自动调整不可行，需按偏位类型补工艺。 |
| cn-const-rebar-raft-012 | revision-or-proposed-granularity | C15.4.10；O钢筋工2、5；建议清走杂物与成品防踩踏保护分开评估，前者清洁输出、后者持续防护；职业并非直接杂物清理计量证据。 |
| cn-const-rebar-raft-013 | bounded-first-pass-acceptable | C15.4.10；隐蔽验收单与工序交接明确；不要与052的预埋前交接重复计同一签认。 |
| cn-const-concrete-pumping-001 | evidence-gap | C22.3.1—2、22.3.6—7、22.3.10；泵送前条件核对是检查单单元；原职业仅泵送职责，具体验收来源为流程条文。 |
| cn-const-concrete-pumping-002 | revision-or-proposed-granularity | C22.3.3—4；建议泵机稳固安放与设备试运行拆分，实物位置和运行放行有不同验收输出；缺对应机械安装方案。 |
| cn-const-concrete-pumping-003 | revision-or-proposed-granularity | C22.4.5；泵管安装与布料设备安装是不同设备交接节点，建议拟议拆分；不得由布料机器人运行推自行铺管。 |
| cn-const-concrete-pumping-004 | bounded-first-pass-acceptable | C22.3.8、22.3.10；供货任务核对有源；DG-RECORD属通用留痕的邻近软件，不证明材料单自动匹配。 |
| cn-const-concrete-pumping-005 | evidence-gap | C22.3.9、22.5.2；入泵坍落度等现场检验成立；补检验器具，作业描述不证明抽测工时。 |
| cn-const-concrete-pumping-006 | bounded-first-pass-acceptable | C22.4.6(1)；清水/砂浆润管是一次泵前流程；机械输送有直接原文，人工投料及效果检查仍未知。 |
| cn-const-concrete-pumping-007 | bounded-first-pass-acceptable | C22.4.6(2—5)；控制泵速/供料可同一运行控制单元；压力换向/诊断不等于闭环控制全部料斗筛网与供应链。 |
| cn-const-concrete-pumping-008 | bounded-first-pass-acceptable | C22.7.4—5；状态监视可按运行时段/检查单计；诊断功能只覆盖设备部分信号，人工接管时间未量化。 |
| cn-const-concrete-pumping-009 | evidence-gap | C22.3.10、22.7.3；供料和可泵性异常协调有源；可补PU-REMAIN历史故障指导为条件证据，不能算已发生退出案例。 |
| cn-const-concrete-pumping-010 | revision-or-proposed-granularity | C22.7.4、22.7.6；建议紧急停泵与确认具体堵点拆成不同状态转换；PU-CONTROL未证明定位管内堵点。 |
| cn-const-concrete-pumping-011 | evidence-gap | C22.7.6—7；卸压拆管清堵为受控修复循环，可保留但验收须包括压力确认；未取得自动清堵机制。 |
| cn-const-concrete-pumping-012 | bounded-first-pass-acceptable | C22.4.7、22.3.8；布料端交接与075是供需双方同一接口，须标为关联两方角色，汇总工时不得重复整次交接。 |
| cn-const-concrete-pumping-013 | evidence-gap | C22.4.8；规范已明确空压机推动清洗球、水洗/气洗回收，应补传统机械机制；监视压力与污水收集没有自动化证明。 |
| cn-const-concrete-pumping-014 | revision-or-proposed-granularity | C22.4.8(1)、22.4.2(6)；管道拆回分规格有直接支持；再检损伤依据在前期选管条款，列下循环检查/拟议而非本段直接动作。可拆检查与拆运。 |
| cn-const-concrete-frame-cast-001 | evidence-gap | C23.3.9—11；振捣/计量器具及通道检查可按开工清单验收，动作不等于工具自检自动完成。 |
| cn-const-concrete-frame-cast-002 | evidence-gap | C23.4.3(3.7)、23.4.4(4)；施工缝基底准备可成单元；空压机吹碎渣明确，须补传统机制，不能挪用楼面清扫机器人。 |
| cn-const-concrete-frame-cast-003 | bounded-first-pass-acceptable | C23.4.2、23.7.6；供料接收与070同一接口需避免全额双计；不同强度等级确认仍依人工/系统验证。 |
| cn-const-concrete-frame-cast-004 | bounded-first-pass-acceptable | C23.4.3(2)；柱分层布料独立于梁板；智能布料首秀未确认柱层厚闭环，保留局部或邻近证据。 |
| cn-const-concrete-frame-cast-005 | bounded-first-pass-acceptable | C23.4.3(3.1—2、5)；梁板连续布料可按浇筑段验收；布料与078振实边界明确，需记录供料与凝结窗口。 |
| cn-const-concrete-frame-cast-006 | bounded-first-pass-acceptable | C23.4.3(1.3—4、2.2、3.3)；振实输出明确；地铁板类/仰拱案例不能算房建柱梁成功，另补插入/平板振捣器传统机械基线。 |
| cn-const-concrete-frame-cast-007 | evidence-gap | C23.4.3(1.5)；浇筑中位移监视有源，职业5只涉及养护修补不是现场位移仪表证据；具体传感方案待查。 |
| cn-const-concrete-frame-cast-008 | evidence-gap | C23.7.8；停浇撤离是同一紧急响应到安全状态，可保留；只在异常模架触发条件适用，不能捏造发生事故。 |
| cn-const-concrete-frame-cast-009 | evidence-gap | C23.4.3(1.5)；凝结前复位整改有源；职业5修补为宽职责，结构受控复位SOP仍需工程方提供。 |
| cn-const-concrete-frame-cast-010 | bounded-first-pass-acceptable | C23.4.3(3.5)；表面收面单元可保留，但整平与抹光分时段记录不重复面积；半自动整平不能写全自动。 |
| cn-const-concrete-frame-cast-011 | revision-or-proposed-granularity | C23.5.1(4、7)；取样制作试件与后续养护/实验室检验不同交付节点；建议现场输出为编号试件，养护责任及送检另标边界。 |
| cn-const-concrete-frame-cast-012 | evidence-gap | C23.4.5；覆盖/洒水/养护剂为条件替代工法，不三重计量；补喷洒/覆盖辅助方法而保留温度时长缺口。 |
| cn-const-concrete-frame-cast-013 | bounded-first-pass-acceptable | C23.5.1—2、表23.5.2；外观尺寸检查可按结构验收单保留；表面扫描不支持内部缺陷或强度试验，范围已限。 |
| cn-const-concrete-frame-cast-014 | evidence-gap | O混凝土工5，PDF535；职业直接支持缺陷修补存在，未取得批准修补SOP；按缺陷类型细化，不能认定全国同一种任务方法。 |
| cn-const-concrete-frame-cast-015 | revision-or-proposed-granularity | C23.7.16—17；落地混凝土清除与覆盖物回收对象/时间不同，建议拆分；楼面碎石机器人不能替代凝固混凝土剔凿。 |
| cn-const-concrete-frame-cast-016 | bounded-first-pass-acceptable | C23.6.1—4、23.5；可按结构移交条件验收，保护是持续措施须单列时段，数字流程仅档案签认辅助。 |
| cn-const-external-tile-001 | evidence-gap | D3.1.1—8、3.3.1—2；材料验收与挑缺陷砖可组成进场批状态；配套胶/砖分类及力学复试仍非自动化证据。 |
| cn-const-external-tile-002 | evidence-gap | D3.3.4—5；外窗与脚手架前置交接是同一开工检查清单；不得计入其专业安装人工。 |
| cn-const-external-tile-003 | revision-or-proposed-granularity | D3.3.7；样板制作与第三方粘结检验验收节点不同；建议按样板成品/送检协作边界计量，试验不归贴砖人工全额。 |
| cn-const-external-tile-004 | evidence-gap | D3.4.2；处理基层到合格粘贴面可保留工艺族，具体加固方式须按基底；不能继承内墙机器人能力。 |
| cn-const-external-tile-005 | bounded-first-pass-acceptable | D3.4.3—4；排砖深化与定位标记不能混同；LY-MARK只是邻近地墙顶产品功能，外立面可达性未验证。 |
| cn-const-external-tile-006 | evidence-gap | D3.4.5；清洗浸泡晾干为同批砖预处理；通体/联片可不浸泡的分支必须保留，不能统一湿泡。 |
| cn-const-external-tile-007 | evidence-gap | D3.4.6(1)；条文明示搅拌机拌胶，方案栏空是研究遗漏；补机制并不等于已验证自动配比及节省。 |
| cn-const-external-tile-008 | revision-or-proposed-granularity | D3.4.3(8)、3.4.6(2—5)；套割成型砖与墙上涂胶压贴有独立产出/工具，建议拆分；外墙专利仅贴砖部分，不承担洞口切割。 |
| cn-const-external-tile-009 | evidence-gap | D3.4.6(6)、3.4.7(1)；随贴检查和填缝前空鼓自检应标不同检查时点；靠尺/线坠辅助有源，自动粘结检测缺证。 |
| cn-const-external-tile-010 | evidence-gap | D3.4.6(4、6)；允许调整窗口内返贴可作为缺陷闭环；不能把早期修位推至粘结固化后安全拆换。 |
| cn-const-external-tile-011 | revision-or-proposed-granularity | D3.4.7；普通填缝与伸缩缝密封胶的材料、功能和验收不同，建议拟议拆分；清缝拌料为各自前置不能重复。 |
| cn-const-external-tile-012 | revision-or-proposed-granularity | D3.4.8、D2.0.5；清残留和防护是不同输出，建议分别核算；普通海绵/刮具基线未研究，不借用粉尘清扫。 |
| cn-const-external-tile-013 | evidence-gap | D3.5.2—6；完工粘结试验与外观验收可归检查包，但实验室与施工配合执行者分开；机制证据不足。 |
| cn-const-external-tile-014 | bounded-first-pass-acceptable | D2.0.4；工序交接记录有直接支持，软件不证明墙砖粘结合格。 |
| cn-const-interior-coating-001 | evidence-gap | D7.1.1、7.1.7；批号颜色验收保管可按材料批追踪；缺物料识别/仓储保护具体方案，勿推全自动材料验收。 |
| cn-const-interior-coating-002 | evidence-gap | D7.1.7(6)；样板制作封样可组成认可样板产出；缺完整自动制作/保存机制，认可签字不属机器人效果。 |
| cn-const-interior-coating-003 | evidence-gap | D7.3.2、7.3.4；基层强度/水分/几何与环境构成开工检查单；表面几何机器人不能包办含水/粘结检验。 |
| cn-const-interior-coating-004 | evidence-gap | D7.3.3；遮护形成明确防污染边界；材料铺贴、拆护各有工时，现任务仅准备遮护，拆护列遗漏而不追加计数。 |
| cn-const-interior-coating-005 | revision-or-proposed-granularity | D7.4.2、7.4.3(1)；旧层剔除与孔缝修填分别产出清除面和修补面，建议拆分并另列危险旧涂层条件。 |
| cn-const-interior-coating-006 | revision-or-proposed-granularity | D7.4.3；界面剂与封闭底漆为基底条件分支；喷涂源只支持适用材料，不确认所有界面剂。CO-SPRAY应补L44、46机械臂定位。 |
| cn-const-interior-coating-007 | revision-or-proposed-granularity | D7.4.4；刮腻子包含层间干燥循环，单遍/最终找平计量待设；喷敷只替代上料，不等同刮平和阴阳角成型。修CO-SPRAY定位。 |
| cn-const-interior-coating-008 | bounded-first-pass-acceptable | D7.4.4；集尘打磨是同一表面处理循环，可保留；缺磨穿率、边角和滤材清理实测，2023观摩非2026持续运行。 |
| cn-const-interior-coating-009 | revision-or-proposed-granularity | D7.4.5(1)、7.4.6—7；涂料调匀是批次准备，面层是按面积施工，建议拟议拆分；机器人只及施涂。修CO-SPRAY定位。 |
| cn-const-interior-coating-010 | evidence-gap | D7.4.5(1—2)；修补/磨颗粒是续涂前整面修整，可按缺陷类型细化；没有局部自动补涂质量证据。 |
| cn-const-interior-coating-011 | revision-or-proposed-granularity | D7.4.5(2—3)、7.4.6—7；后续遍次按材料干燥条件记录，刷滚喷是替代而非额外工时；补机械臂准确定位，名义效率不可算节省。 |
| cn-const-interior-coating-012 | evidence-gap | D7.5.1、7.5.8—10；养护后外观及粘结状态检查有源；不是强度自动检测，现场与资料验收分责任。 |
| cn-const-interior-coating-013 | bounded-first-pass-acceptable | D2.0.5、2.0.9—10；O装饰1；楼面清扫仅房间交付的局部动作；墙面去污/保护未证实，不用FN-CLEAN填全部清洁范围。 |
| cn-const-interior-coating-014 | bounded-first-pass-acceptable | D7.5.2、D2.0.4；资料交付包可验收；软件需现场录入，原文未承诺无人生成实物检验结果。 |
| cn-const-mortar-plaster-001 | evidence-gap | D8.1.5—6；砂浆批验收成立；材料机喷配方与普通抹灰不同，须具体试配，缺替代方案。 |
| cn-const-mortar-plaster-002 | evidence-gap | D8.3.1、8.3.3、8.3.6、8.3.8；前置工序交接可用一张开工清单；门窗/防水施工不再计抹灰劳动。 |
| cn-const-mortar-plaster-003 | revision-or-proposed-granularity | D8.3.6—8、8.4.2(1)、8.4.3(1)；清污与凸凹/周缝修补产出不同，建议拆分；油污/孔缝需不同工具不能泛配抹灰机器人。 |
| cn-const-mortar-plaster-004 | evidence-gap | D8.4.2(1—2)、8.4.3(3)；湿润/界面处理受基底条件约束；同一就绪界面可保留条件工法，补滚刷/洒水辅助。 |
| cn-const-mortar-plaster-005 | confirmed-error | D8.4.2(3)、8.4.3(2)；PL-LIMIT误把水泥砂浆基面泛为砂浆材料，应收紧；视觉找平可能替代灰饼是研究判断，不能标直接已验证免灰饼。 |
| cn-const-mortar-plaster-006 | confirmed-error | D8.4.2(4)、8.4.3(3)；修PL-LIMIT基面/材料边界；产品压刮和未标年份案例仅局部，不证明底层搓毛及层间间隔控制。 |
| cn-const-mortar-plaster-007 | evidence-gap | D8.4.2(5)、8.4.3(4)、8.5.3；增强网铺设是独立产出；缺材料裁配、固定工具方案，不由视觉接茬推自动铺网。 |
| cn-const-mortar-plaster-008 | evidence-gap | D8.4.2(6)、8.4.3(5)；分格条/滴水槽可按构件条段安装，具体外墙滴水条件分支明确；放线产品不能代表粘条。 |
| cn-const-mortar-plaster-009 | evidence-gap | D8.4.2(7)、8.4.3(6)；洞口管后修整单元可留，但常规细部修整不一定是缺陷返工，phase建议作业/细部收口。 |
| cn-const-mortar-plaster-010 | confirmed-error | D8.4.2(8)、8.4.3(7)；修PL-LIMIT材质解释；墙面压抹为局部机制，当前项目、细部验收和全班组效益不足。 |
| cn-const-mortar-plaster-011 | revision-or-proposed-granularity | D8.4.2(9—11)、8.4.3(8、10—11)；起分格条、踢脚铺抹、滴水细部有不同部位与独立成品，建议三个拟议子任务；原父项不得另加计。 |
| cn-const-mortar-plaster-012 | evidence-gap | D8.4.2(12)、8.4.3(9、12)、8.6.7；湿养护为连续条件维护，职业1只宽泛养护，不能推出频次工时；缺自动喷水/覆盖控制证据。 |
| cn-const-mortar-plaster-013 | bounded-first-pass-acceptable | D8.5.4、8.5.6—11；综合灰面检查可按检查单；几何扫描只及部分可见表面，历史装修定位问题不证明本测量型号失效。 |
| cn-const-mortar-plaster-014 | revision-or-proposed-granularity | D8.6.1—6；残浆清除与防护墙角是不同对象/持续时间，建议拆分；阴角清洁不适用楼面扫尘案例。 |
| cn-const-mortar-plaster-015 | bounded-first-pass-acceptable | D2.0.4；抹灰交接数字留痕为局部支持，养护及基面含水条件仍要实际检验。 |
| cn-const-light-steel-partition-001 | evidence-gap | D10.1.1—8、10.5.1；按材料批验收可保留；纸面板/其他板材性能分支要维持，不统一套产品参数。 |
| cn-const-light-steel-partition-002 | bounded-first-pass-acceptable | D10.3.2、10.4.2；隔墙控制线可验收；模型导入不自动审核门洞设计与现场偏差。 |
| cn-const-light-steel-partition-003 | evidence-gap | D10.3.3、10.4.3；仅设计需要的地枕条件动作；缺基座实际工法，不能假设所有隔墙必有地枕。 |
| cn-const-light-steel-partition-004 | bounded-first-pass-acceptable | D10.4.4—5；顶地/洞口框属边界骨架阶段，可按安装单元保留；钉枪只对适配硬基层紧固，门框全部构造未证。 |
| cn-const-light-steel-partition-005 | evidence-gap | D10.4.7—9；竖龙骨横撑和转角补强为骨架子系统，保留但明确单位；抽芯铆钉/螺栓工具机制已有规范支持待补。 |
| cn-const-light-steel-partition-006 | evidence-gap | D10.4.10；封板前骨架质量检查明确；定位与承载连接检查不能从螺钉工具功能推自动化。 |
| cn-const-light-steel-partition-007 | revision-or-proposed-granularity | D10.4.12(1)；板材切配与搬举安装为不同可交付对象，建议拟议拆分；螺钉工具仅紧固，纸面保护与错缝未知。 |
| cn-const-light-steel-partition-008 | bounded-first-pass-acceptable | D10.4.11；开放墙腔隐检交接成立，管盒安装归电气专业；数字记录仅支持交接过程。 |
| cn-const-light-steel-partition-009 | evidence-gap | D10.4.12(3)、10.5.9；填充形成完整墙腔，隐检为放行节点；填料防下坠与自动投放方案尚缺。 |
| cn-const-light-steel-partition-010 | bounded-first-pass-acceptable | D10.4.12(2、4)；另一侧及附加层作为逐层封板同类动作可留；动力旋入不负责板材搬举、错缝或层数判定。 |
| cn-const-light-steel-partition-011 | evidence-gap | D10.4.12(5)；清缝、腻子和拉接带组成一道防裂层，可保留工艺循环但按干燥阶段计量；补刮刀辅助。 |
| cn-const-light-steel-partition-012 | confirmed-error | D10.4.12(6)，PDF60；纸面石膏板本条只明确钉帽防锈；填平来自10.4.13(4)纤维水泥板，不能继承。保留防锈，填平降拟议或补专门纸面板来源。 |
| cn-const-light-steel-partition-013 | evidence-gap | D10.5.2—10；综合隔墙验收可按检查单；隐检填料不由完成面视觉推断，缺适配检验设备。 |
| cn-const-light-steel-partition-014 | evidence-gap | D2.0.5、2.0.9—10；O装饰1；施工废料清理/防潮保护为交付条件族，需具体清洁工具；未将机器人邻近演示冒充整任务。 |
| cn-const-light-steel-partition-015 | bounded-first-pass-acceptable | D2.0.4；完成隔墙交给面层有源，勿与139的封板前隐检混成一次签认。 |
| cn-const-fixed-panel-ceiling-001 | evidence-gap | D21.1.1—4、21.3.4；吊顶材料验收成立；不同面板环保/防火检验不由外观代替。 |
| cn-const-fixed-panel-ceiling-002 | bounded-first-pass-acceptable | D21.3.2—5；吊顶净高与隐蔽管线交接是一份封顶前检查单；软件记录不替代水管试压调试。 |
| cn-const-fixed-panel-ceiling-003 | bounded-first-pass-acceptable | D21.3.8、21.4.2；顶面定位点明确；需要测量基准，BIM定位不解决内藏设备干涉。 |
| cn-const-fixed-panel-ceiling-004 | revision-or-proposed-granularity | D21.4.3；吊杆锚固与条件性反撑有不同受力体系/验收，建议拟议分支拆项；冲击电锤局部机制需补。 |
| cn-const-fixed-panel-ceiling-005 | revision-or-proposed-granularity | D21.4.4—5；边龙骨锚固与主龙骨吊挂调平是两种部件交付，建议拟议拆分；射钉/螺栓辅助尚未纳入。 |
| cn-const-fixed-panel-ceiling-006 | evidence-gap | D21.4.6；次骨架与洞口补强构成板面承托，可按构件清单计量；拉铆等工具机制有源待补。 |
| cn-const-fixed-panel-ceiling-007 | bounded-first-pass-acceptable | D21.3.6、21.4.3—6；封板前结构/接口检查可独立验收；软件只及记录，非自动识别防锈、牢固。 |
| cn-const-fixed-panel-ceiling-008 | revision-or-proposed-granularity | D21.4.7(1—4、6)；建议配切面板与举板固定分开，独立产出与搬运条件明显；动力螺钉功能仍局部。 |
| cn-const-fixed-panel-ceiling-009 | bounded-first-pass-acceptable | D21.4.7(4)；变形螺钉移除/补钉构成修复点，工具逆转是松卸机制但不保证弯钉可直接旋出，已留识别及纸面缺口。 |
| cn-const-fixed-panel-ceiling-010 | revision-or-proposed-granularity | D21.4.7(5、7)；钉眼处理与板缝防裂为点状/线状不同产出，建议拆分；别从螺钉驱动推自动防锈填缝。 |
| cn-const-fixed-panel-ceiling-011 | evidence-gap | D21.4.10；设备口吻合与边缘修整可按接口验收；设备实际安装归相应专业，缺专机切口机制。 |
| cn-const-fixed-panel-ceiling-012 | evidence-gap | D21.5.1—10；完成吊顶检查为记录单元；几何、连接、性能资料不可由单一传感器覆盖。 |
| cn-const-fixed-panel-ceiling-013 | revision-or-proposed-granularity | D2.0.5、2.0.10；O装饰1；板面清洁与施工废材分类对象/方法不同，建议拟议拆分；地面扫尘不证明顶棚表面清洁。 |
| cn-const-fixed-panel-ceiling-014 | bounded-first-pass-acceptable | D2.0.4、21.3.4；吊顶交付资料有源，内藏专业记录由其执行者生成，不能自动计入吊顶工时。 |
| cn-const-rural-water-pipe-001 | evidence-gap | W2.2.3—4；进场管件查验有流程，管工1主要搬运标识，精确检验职责只是宽关联；需量测/无损/资料工具。 |
| cn-const-rural-water-pipe-002 | evidence-gap | W2.2.5；O管工1；材料储存防护成立，遮阳针对塑料管条件，不推全部金属管必须同条件。 |
| cn-const-rural-water-pipe-003 | bounded-first-pass-acceptable | W4.1.1；O土方司机1；机械开挖和遥控为局部可选方案，徐工展会山地设备不证明目标农村沟槽自动成型。 |
| cn-const-rural-water-pipe-004 | bounded-first-pass-acceptable | W4.1.2；硬基底处理/垫层是一个承管面准备族；筛分属具只及材料预处理，未证明铺料厚度/压实自动合格。 |
| cn-const-rural-water-pipe-005 | bounded-first-pass-acceptable | W4.2.1、2.1.3；沟槽土建交接明确；数字软件是邻近过程，不支持自动地基承载验收。 |
| cn-const-rural-water-pipe-006 | evidence-gap | W4.2.1；安装前逐管清内部/表面明确；管工1—3无明确清洗，职业只能上下文。未留机制不等于不能机械清管。 |
| cn-const-rural-water-pipe-007 | evidence-gap | W4.2.5；O管工3；放管对中调整形成定位管节；须补搬举、吊运与测量辅助方案，材质口径不同不能统一。 |
| cn-const-rural-water-pipe-008 | bounded-first-pass-acceptable | W4.2.4—6；O管工3；钢管导轨焊只覆盖条件分支，不能迁移PE/PVC及阀件；北京2021团队配置/干扰为自报现场证据。 |
| cn-const-rural-water-pipe-009 | evidence-gap | W4.2.5；复测已安装管节独立于就位调整；补水准/测量器具，自动焊不证明高程合格。 |
| cn-const-rural-water-pipe-010 | revision-or-proposed-granularity | W4.4.1—4；阀表装配与空载开闭试验有不同放行节点，建议拟议拆分；计量装置与阀驱动也须分型号条件。 |
| cn-const-rural-water-pipe-011 | evidence-gap | W4.3.1—2；充水排气浸泡共同形成可试压状态，保留但时间/介质按管材分支，当前历史阈值不可直接执行。 |
| cn-const-rural-water-pipe-012 | evidence-gap | W4.3.1—2；强度/严密试验同一试压程序可保留并分指标；压力泵/记录仪替代方案待补，不填虚构参数。 |
| cn-const-rural-water-pipe-013 | evidence-gap | O管工5，PDF543；职业支持管路修复，具体不合格连接SOP缺；不同管材返修方法需独立查证。 |
| cn-const-rural-water-pipe-014 | revision-or-proposed-granularity | W4.3.3；O管工4；冲洗与化学消毒/再冲洗有不同卫生验收及介质，建议拟议子动作计量；职业仅冲洗吹扫，不直接支持消毒。 |
| cn-const-rural-water-pipe-015 | evidence-gap | W4.3.3(2)；条文支持取样检验，采样封装链仍缺细则；管工4只是系统试验，不证明水质采样精确职责。 |
| cn-const-rural-water-pipe-016 | evidence-gap | W4.1.4—5；O土方司机1；管周保护填土与远离管周的机械回填按区域分支；历史文本管周明确人工，不能由一般填土职责判该区机械适用。 |
| cn-const-rural-water-pipe-017 | evidence-gap | W4.5.3—4；O乡村工匠7、9；按道路条件核井盖并安装可验收；缺搬举专机/辅助，不能借焊管案例填补。 |
| cn-const-rural-water-pipe-018 | evidence-gap | W4.5.2；当日未回填围护是预防/收工准备，不是设备异常；phase建议准备或现场防护，土方司机1不直接支持围栏职责。 |
| cn-const-rural-water-pipe-019 | bounded-first-pass-acceptable | W4.5.2；废料清场有源；筛分抓取属具仅可达土方局部，管工5维护不直接证明现场垃圾清理职责。 |
| cn-const-rural-water-pipe-020 | bounded-first-pass-acceptable | W2.1.3、2.2.3；O管工6；安装资料包可验收，水质与检测报告归原生成方，软件仅关联记录。 |
| cn-const-rural-water-tank-001 | evidence-gap | W6.2.2(1)；O砌筑1、3；砖石预处理可按批验收；砖/石湿润工艺分条件，缺机械清洗/供料证据。 |
| cn-const-rural-water-tank-002 | evidence-gap | W6.2.2(5)；O砌筑1、3；池壁搭砌产出明确；砖与石形状工法不同，缺相应砌筑设备证据而非技术不可行。 |
| cn-const-rural-water-tank-003 | evidence-gap | W6.2.2(2)、6.1.3；O防水3；穿池预埋防渗节点可作为同一验收单元；砌筑3只宽职责，关键防水依据为防水工/流程。 |
| cn-const-rural-water-tank-004 | confirmed-error | W6.1.2(1)；O防水1，PDF539；删masonry→防水工任务1错挂；已有waterproof应精确到任务1，基面处理可保留但工具方案不足。 |
| cn-const-rural-water-tank-005 | confirmed-error | W6.1.2(2—5)；O防水2—3；删masonry错挂改防水工；原文明确机械喷涂条件，可补局部传统机械，不把水池砂浆推作已验证墙面机器人。 |
| cn-const-rural-water-tank-006 | confirmed-error | W6.1.2(6)、6.2.2(4)；O防水5；删masonry→防水工5错挂；池壁与防水层养护需分别记录部位/时长，不能把职业保护直接当自动喷水。 |
| cn-const-rural-water-tank-007 | evidence-gap | W6.4.1—2；O砌筑5宽关联；充水测位计算形成满水试验结果，可保留；砌筑自检不证明全部水工试验职责，仪表/蒸发等当前方法待核。 |
| cn-const-rural-water-tank-008 | confirmed-error | O防水4，PDF539；删masonry→防水工4错挂；防水修补存在有源，但仅职业依据，修复后满水复验方案仍需另证。 |
| cn-const-rural-water-tank-009 | confirmed-error | W6.3.7仅水塔；O乡村工匠7，PDF536；删masonry→乡村工匠7错挂，保留原proposed；乡村公共设施职责不能证明蓄水池消毒工艺，须补本池现行SOP。 |
| cn-const-rural-water-tank-010 | bounded-first-pass-acceptable | W6.4.2；满水合格后外壁/回填条件交接成立；任务不包括实际外壁施工回填，数字记录为局部机制。 |
| cn-const-water-plant-equipment-001 | bounded-first-pass-acceptable | W2.2.3；O机械安装1；开箱核验可独立交付；通用报验软件不是自动识别随机资料，实际核对保留缺口。 |
| cn-const-water-plant-equipment-002 | evidence-gap | W5.0.1、5.0.3—5；O机械安装1—2；设备基础交接有源，职业只宽泛测试/识图；原始强度阈值不被当2026适用参数。 |
| cn-const-water-plant-equipment-003 | evidence-gap | W7.1.1、7.4.1；O机械安装1；就位调整可按单台设备验收，机械搬举/精调方案尚缺；机泵与静置设备按不同型号分支。 |
| cn-const-water-plant-equipment-004 | evidence-gap | W7.4.2；O机械安装3；按随机文件组装设备组件有源，缺具体连接工具/型号，不以供水厂运营自动化代替安装劳动。 |
| cn-const-water-plant-equipment-005 | evidence-gap | W7.4.3；O机械安装1、4；设备强度严密性试验与管网试压区分，具体试验装置资料未保留。 |
| cn-const-water-plant-equipment-006 | evidence-gap | W7.1.1；O机械安装4；机组调试及试运构成一次运行放行；负荷试运是配合使用方，不能全数归安装方。 |
| cn-const-water-plant-equipment-007 | evidence-gap | O机械安装5，PDF542；设备故障诊断存在有职业源但没有型号SOP；泵送混凝土故障手册不得挪用供水机泵。 |
| cn-const-water-plant-equipment-008 | evidence-gap | O机械安装1、3、5；不合格接口修复作为拟议具体化，职业只宽泛装连排故；补按接口类型的批准修复及复验方法。 |
| cn-const-water-plant-equipment-009 | evidence-gap | O机械安装1、6不直接支持清洁；保持原proposed；开箱与记录不能证明完工清场/拆包装流程，须增加安装说明和现场卫生源。 |
| cn-const-water-plant-equipment-010 | bounded-first-pass-acceptable | W2.2.3、2.1.3；O机械安装6；安装试运文档交付成立；运行维护劳务与安装记录分开，软件不会自动产生真实性证据。 |
| cn-const-water-plant-electrical-001 | evidence-gap | W2.2.3；O电气安装1；电气进场设备检验直接有职责，具体仪表/合规项目缺型号依据。 |
| cn-const-water-plant-electrical-002 | evidence-gap | W7.2.2；O电气安装2；变压器安装任务仍过宽，搬运定位、接线细分需SOP；不能以通用机器人展示替代方案。 |
| cn-const-water-plant-electrical-003 | evidence-gap | W7.2.1—2；O电气安装3；交接试验可按试验包验收，但设备型号和项目仪器待补，电力部门认定不等于施工机器人验收。 |
| cn-const-water-plant-electrical-004 | evidence-gap | W7.3.1；O电气安装2；防雷连续电气通路为同一系统节点输出，具体连接工法待核，不自动类比给水管焊接。 |
| cn-const-water-plant-electrical-005 | evidence-gap | W7.3.2；焊接接头防腐涂刷独立于204通路连接；缺涂刷辅助方案，室内墙涂机器人不适用于该构件。 |
| cn-const-water-plant-electrical-006 | evidence-gap | O电气安装5，PDF542；电气故障处置存在有源，原因隔离与修复责任可按故障单输出；具体诊断试验技术缺证。 |
| cn-const-water-plant-electrical-007 | bounded-first-pass-acceptable | W2.1.3、2.2.3；O电气安装7；电气安装调试档案交付有源，软件辅助不替代测试记录生成或运维接收。 |

## 现金流与机会

所有目标人工、部署投入、集成培训、残留人工、维护停机、需求、瓶颈和下游容量参数保持null，未查到虚构回收期。增量现金流形式可以继续使用，但须按R03明确营运资金逐期差分，并防止租赁/购买、可取消人工/残留人工以及末期回收重复计入。现场制造与独立制造厂、施工与水务运营、送样与实验室试验应分别计量。

钢筋连续加工、标准房间喷涂打磨抹灰、分工序混凝土施工、特定钢管焊接可保留为四条条件性研究机会。其理由是已有可复读局部机制和需要验证的接口，不能据此排商业优先级。先修基面/材料及具名项目描述，再向实际采用、退场或弃购单位索取作业台账、失败记录与完整投入。

评论、访谈或后续证据须经过审校后进入版本；本审查不冻结库存，也不认定15场景覆盖中国建筑全行业。

结构化裁决文件 SHA-256：`63b1904d233b0073af28bf6ec04a79ead7860fa1a98991115dba8e1fa9b77c6c`。各输入和私有证据缓存SHA及207条查询返回定位见该JSON。
