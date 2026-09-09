# 美国农业自动化独立审校报告

审校日期：2026-09-09。审校对象：182项任务、14场景、67项来源的实际引用段落，以及对应原始检索审计。

输入SHA-256：043ae94f13c5bf5befdef17851a29c7790aff0220d536a18d716db7a9a9360fc。作者原文件及来源缓存未修改；本报告和裁决JSON独立保存。

结论：需修复后复核，不能冻结或标记全任务通过。155项的局部动作或机制有有限支持，21项只有候选/流程背景，6项有任务级范围或表述错误。这些是证据支持范围分类，均不代表整项自动化已验证；182项采用障碍引用都缺具体定位。

## 已确认问题及待修复项

遵循本次独立审查分工，没有直接修改作者原文。下表列出确认错误与待补证内容；完整逐任务影响和建议见裁决JSON。

|编号|级别|来源|发现|修复要求|
|---|---|---|---|
|LOC-LONGLINE|error|[E-LONGLINEGEAR](https://www.fisheries.noaa.gov/s3/2024-05/0648-XD861-Scoping-5.1.24withcover508.pdf)|cacheLine 593不在目标段；正确609–611。|动力起线器、主线、浮标和支线定义。|
|LOC-RELEASE|error|[E-RELEASE](https://media.fisheries.noaa.gov/dam-migration/nmfs_sefsc_sea_turtle_handling_protocols.pdf)|cacheLine 357不在所引句；正确367–369。|海龟钩线处理指南范围，工具章节另需定位。|
|LOC-GAP|error|[A-GAP](https://www.ams.usda.gov/sites/default/files/media/Harmonized_GAP_Standard_Version_3.1.pdf)|F-10.1/F-10.2应1793/1803行；1738为用水处理段。|版本3.1采收容器储存与使用前检查。|
|LOC-GAP2024|error|[A-GAP2024](https://www.ams.usda.gov/sites/default/files/media/HarmonizedGAPStandardVersion3.0.pdf)|F-10.1/F-10.2应1768/1778行；1714为用水处理段。|版本3.0历史容器条款。|
|LOC-SCRAPER|error|[E-SCRAPER](https://extension.missouri.edu/publications/g2531)|当前cacheLine 2为搜索摘要；改用正文29行及结构限制段。|密苏里改造的直接描述。|
|LOC-POTFAIL|error|[E-POTFAIL](https://www.fisheries.noaa.gov/s3/2025-05/May-21-TRT-Webinar-On-Demand-Gear.pdf)|当前cacheLine 2为搜索摘要；本地摘录正文17/19行定义成功与未成功。|原PDF第17页已独立渲染核对定义；改用页码/正文定义，不能指向搜索摘要。|
|DATE-SWINERFID|error|[E-SWINERFID](https://plf.tennessee.edu/wp-content/uploads/sites/229/2024/01/Feasibility-of-a-UHF-RFID-system-to-identify-nursery-pigs-moving-through-a-hallway.pdf)|evidencePeriod说未给试验年，但正文71–72明确2022年12月。|发表日期仍未知；2024托管路径不能作发表日。|
|DATE-AERATION|error|[E-AERATION](https://bookstore.ksre.ksu.edu/pubs/questions-and-answers-about-aeration-controllers_MF2090.pdf)|核读PDF缓存322/328明示May 2002，1995-03及1995资料没有本文件支持。|将所读版本记录为2002-05；首版1995如保留须另证。|
|DATE-GAP|gap|[A-GAP](https://www.ams.usda.gov/sites/default/files/media/Harmonized_GAP_Standard_Version_3.1.pdf)|封面/版本日期2025-07-01；USDA项目官网L131说明2025-07-03发布和生效。|区分版本日期、发布日期、生效日；保留官网与文件日期差异。|
|DATE-TRANSPLANT|gap|[E-TRANSPLANT](https://propg.ifas.ufl.edu/04-seeds/03-germination/14-seedsgermination-transplanting.html)|2023-02-24在缓存33行是Last Modified，不是已证实首次发表日。|移入revisedAt，首发时间未知。|
|DATE-LONGLINE|gap|[E-LONGLINEGEAR](https://www.fisheries.noaa.gov/s3/2024-05/0648-XD861-Scoping-5.1.24withcover508.pdf)|文件封面只见MAY 2024；05-01精确日目前来自URL/文件名。|发布日期日精度未独立确认，保留月精度或补发布页。|
|READ-SWINEPLF|gap|[E-SWINEPLF](https://www.canr.msu.edu/news/will-precision-livestock-farming-be-adopted-on-swine-farms)|本次官网读取403，现有缓存只是官方索引摘录。|不能评为完整原文核验；调查样本与日期仍不足。|
|READ-TERRAIN|gap|[E-TERRAIN](https://www.fs.usda.gov/t-d/pubs/pdfpubs/pdf11512815/pdf11512815dpi72.pdf)|本次官网PDF读取403，仅能对照已有官方索引第10页摘录。|可保留摘录级地形限制，未核全PDF和日期。|
|DATE-UPDATES|gap|跨任务或指定任务|若页面只给Updated/Reviewed，publishedAt不能不加说明视为首发。|涉及E-DRONE、E-APPLEMATURITY等；已显示数据期较旧，未把它们当2026试验。|
|ADOPTION-LOCATORS|gap|跨任务或指定任务|182项barriers.adoption都只有sourceIds，缺逐条支持定位。|改为sourceRefs并拆明来源事实/研究假设；研究假设不必强挂并未支持的来源。|
|COUNTER-TYPE|gap|跨任务或指定任务|88项统计混有正向机制、研究范围缺口和条件限制。|按观察失败、已述操作条件、外国背景、试验阶段缺口、纯缺证分别计数；不能称88项失败证据。|
|CF-WORKING-CAPITAL|gap|跨任务或指定任务|初始投入组成含增量营运资金，initialCashFlow又单独减该参数。|明确full_deployment_investment排除营运资金，避免未来重复计算；目前没有错误数值结果。|
|SCOPE-VEG006|error|跨任务或指定任务|VEG-006引用O45-2092 task-23为容器苗木搬移，不是蔬菜周转箱。|换用蔬菜装运或农机作物装卸条目，并保留遮阴流程来源。|
|WORD-TMR002|error|跨任务或指定任务|TMR-002实验室营养分析未自动化为无支持的否定断言。|改为本轮未获得本任务完整自动化证据；外包化验按实际执行行业。|
|WORD-FOREST007|error|跨任务或指定任务|FOREST-007异常枝干需人工无所引处理头原文支持。|改为异常枝干的处理方式与残留人工待验证。|
|SCOPE-LONGLINE004|error|跨任务或指定任务|LONGLINE-004从动力起线器定义推为动力放收线装置，超出原文动作。|放线设备应补原文或标候选；起线机制不能直接证明布放。|
|BARRIER-EGG008|error|跨任务或指定任务|EGG-008旧设备价格障碍写入technical。|移至economic并保留旧资料定性限制。|
|COUNTER-MILK010|error|跨任务或指定任务|MILK-010把自动脱杯正向机制同句置入有限反例来源。|未证实反例应留为gap，不据此计限制证据。|
|OP5-CONDITION|gap|跨任务或指定任务|OP5将无需逐头补读作为净节省必要条件过强。|应比较可取消成本与补读及其他残留现金流，不能假定必须零补读。|
|SOURCE-POTFAIL-TOTAL|gap|[E-POTFAIL](https://www.fisheries.noaa.gov/s3/2025-05/May-21-TRT-Webinar-On-Demand-Gear.pdf)|第17页逐年Hauls为79、623、1851、2714、6796、1382，合计13445；表列Program Totals为13446，相差1。|作者未采用这些次数或率，不影响定性失败定义；未来引用总次数前需向来源核对。|

## 数字、时间和国家边界

- 2021年美国奶量中6%由机器人挤奶生产，与USDA正文一致；2026-06-02是发布日期。不能改读成2026采用比例。 [USDA ERS](https://ers.usda.gov/data-products/charts-of-note/114194)
- 典型商业池塘围网至少5人的原文与AQUA-008组合流程记录一致，没有拆成每个子任务各5人；资料未给具体观察年份。 [MSU流程](https://www.extension.msstate.edu/agriculture/catfish/harvesting-loading-and-transport)
- 55项拆分、65项降拟议的计数与作者182项记录一致。拆分可作为独立验收候选，仍需现场验证；“proposed”不能抹去原文已经支持的基础动作。另建议10项完整任务边界降拟议，清单见后表。
- 本次唯一明确指出的试验时间错误是猪只RFID试验：材料方法写2022年12月，发表日期仍未知。通风控制PDF的所读版本为2002年5月，不能继续标为1995年资料。
- 欧洲乳头清洁研究没有被当成美国失败率；但应继续给该部分单独国家/定位。NIOSH具体事故是虾船绞机背景，不是笼捕或延绳钓任务事故。苹果采果综述的历史判断、2017 Bin-dog原型、2012蛋加工厂试验都不能升级为2026经营部署。
- 所有任务的人工分钟、现金回报和回收期没有数值结果，未发现由职业重要性或岗位人数推工时比例。共享现金流的营运资金边界须在实际计算前修正。

## 查询与原文核读限制

原审计逐项存在正向及反向查询、日期和返回结果；本审查没有重新执行全部查询，因此只确认审计记录的对应关系。原始长摘录和完整缓存仅内部核对，不在本报告复制。

对67项来源逐一核对实际引用段和缓存SHA；全部缓存SHA匹配。MSU猪业网页与USFS地形PDF本次均403，索引摘录能支持的窄范围与完整原文通过分开。NOAA按需渔具PDF第17页已独立渲染核对；定性不成功定义正确，但原表合计有1次内部差异，作者尚未采用这些次数。

88项“有限制证据”原统计包含不同性质：本次划分为65项条件或试验背景、11项纯阶段/范围缺口、10项共享背景、1项欧洲清洁研究、1项美国按需起收试验。另94项无确认的任务专属反证。不要把这些合称88项失败案例。

## 中国与美国的隔离

本报告仅审美国农业。中国服务业案例未进入本文件；职业工具、厂商或推广机制、外国比较以及美国具体试验分别限界。外包实验室、蛋加工厂和其他船型的工作不能未经执行单位核对并入当前农业任务。

## 逐项裁决

下表每项都已独立查看作者方案、源定位、人工和反证边界；“待修复”包含共同的采用障碍定位缺口，不表示每项基础机制都错误。

|任务|动作证据裁决|独立审查意见|原清单拆分/降级|
|---|---|---|---|
|US-AGR-PLANT-001 核对地块边界与本次作业要求|candidate-or-workflow-evidence-only|导航/土壤图采用调查只支持地图背景；没有地块边界核对或接单动作直接证据，应降为拟议。|proposed；新增降级建议|
|US-AGR-PLANT-002 连接拖拉机与指定农具|bounded-action-or-mechanism-supported-with-gaps|O*NET task-8明确人工连接农具；自动对接未证，当前限制可保留。|source-backed-action-only|
|US-AGR-PLANT-003 装入本次地块所需种子|bounded-action-or-mechanism-supported-with-gaps|task-2、task-9支持装种和料斗供料；品种防混是额外待验边界。|source-backed-action-only|
|US-AGR-PLANT-004 按地块方案进行必要耕整|bounded-action-or-mechanism-supported-with-gaps|操机耕整与导航有据；湿土限制应定位A-CORN缓存167–172，不用泛main。|source-backed-action-only|
|US-AGR-PLANT-005 调节播种机排种与入土设置|bounded-action-or-mechanism-supported-with-gaps|量块只直接支持播深；排种机构校核是另一候选，保留拆分和证据缺口。|拆分2项；proposed|
|US-AGR-PLANT-006 操控播种机播入玉米种子|bounded-action-or-mechanism-supported-with-gaps|导航调查不证明播种机无人驾驶；实际播种动作与导航采用需分别引用。|source-backed-action-only|
|US-AGR-PLANT-007 抽查种子落位与覆土接触|bounded-action-or-mechanism-supported-with-gaps|挖种验证播深有据；覆土接触验收须加A-CORN对应段或明确未支持。|source-backed-action-only|
|US-AGR-PLANT-008 重播获准处理的缺播区|candidate-or-workflow-evidence-only|一般播种职业动作不能直接证明获准缺播重播流程；完整任务应降拟议。|proposed；新增降级建议|
|US-AGR-PLANT-009 布置并运行灌溉管路|candidate-or-workflow-evidence-only|所引职业条目支持管泵及布管；计时控制未在这些条目出现，须补来源或标候选。|拆分2项；proposed|
|US-AGR-PLANT-010 巡查作物长势与虫草异常|bounded-action-or-mechanism-supported-with-gaps|航拍避障、通信和续航限制有据；地面确认不能被写成已替代。|source-backed-action-only|
|US-AGR-PLANT-011 停机处理播种或农具异常|candidate-or-workflow-evidence-only|观察故障和维护有据；机具报警、自动停机还缺专门资料，拆开停机与修复。|拆分2项；proposed|
|US-AGR-PLANT-012 清理农具并检查易损部件|bounded-action-or-mechanism-supported-with-gaps|职业维修与清场有据；易损件检查验收与自动清残尚不足，拆分合理。|拆分2项；proposed|
|US-AGR-PLANT-013 交接地块作业记录与剩余物料|bounded-action-or-mechanism-supported-with-gaps|作业记录职业动作可保留；剩料盘点签收为独立候选，不能由记录推出实物正确。|拆分2项；proposed|
|US-AGR-PLANT-014 向农场交付完成地块与异常图|bounded-action-or-mechanism-supported-with-gaps|图像采集与向农场报告可作背景；整地验收和异常图交付尚属拟议。|拆分2项；proposed|
|US-AGR-GRAIN-001 清除粮仓及输送设备前批残粮|candidate-or-workflow-evidence-only|A-GRAIN缓存167–170支持清仓；当前main定位测温，且吸尘机型不是本段直接事实。|拆分2项；proposed|
|US-AGR-GRAIN-002 检查仓体与收获输送设备缺陷|bounded-action-or-mechanism-supported-with-gaps|职业机况观察不覆盖仓体缺陷；两对象拆分合理，报警功能须标候选。|拆分2项；proposed|
|US-AGR-GRAIN-003 调节联合收割机脱粒与清选设置|bounded-action-or-mechanism-supported-with-gaps|联合机减损清选设置在A-GRAIN191；脱粒/清选分开记录，自动最优参数未证。|拆分2项；proposed|
|US-AGR-GRAIN-004 操控收获设备收割脱粒|bounded-action-or-mechanism-supported-with-gaps|职业task-6明确操纵联合机；不推无人收获和工时。|source-backed-action-only|
|US-AGR-GRAIN-005 将收获粮装入接运容器|bounded-action-or-mechanism-supported-with-gaps|task-1/9支持输送和装卸工具；移动对位及溢撒仍待验证。|source-backed-action-only|
|US-AGR-GRAIN-006 测量入仓粮水分并检查杂质|bounded-action-or-mechanism-supported-with-gaps|代表性取样和水分分别在E-SAMPLE143与155–156，当前定位应拆开；杂质独立验收。|拆分2项；proposed|
|US-AGR-GRAIN-007 清除粮粒中的细杂|bounded-action-or-mechanism-supported-with-gaps|细杂清除见A-GRAIN196；源文未指定自动清选机性能，方案机型为候选。|source-backed-action-only|
|US-AGR-GRAIN-008 将粮粒输送并分布至储粮仓|bounded-action-or-mechanism-supported-with-gaps|布料器在A-GRAIN198；均匀分布是机制说明，不是无偏析保证。|source-backed-action-only|
|US-AGR-GRAIN-009 按储粮方案实施通风或干燥|bounded-action-or-mechanism-supported-with-gaps|简单控制器不用于干燥的边界有据，但所读PDF为2002-05，修正1995日期。|拆分2项；proposed|
|US-AGR-GRAIN-010 检查储粮温度虫害与霉变迹象|bounded-action-or-mechanism-supported-with-gaps|温度电缆、探样和虫霉观察可保留，温度/虫害/霉变拆分合理；旧通风版本日期须修。|拆分3项；proposed|
|US-AGR-GRAIN-011 隔离可疑粮批并提出处置要求|bounded-action-or-mechanism-supported-with-gaps|问题粮转移和处置见A-GRAIN236；标签、隔离责任与处置要求不由该段全部证明。|拆分2项；proposed|
|US-AGR-GRAIN-012 对获准返工粮批重新清选或调质|bounded-action-or-mechanism-supported-with-gaps|重干燥和处置需按问题分流；不能保证污染粮变为合格，返工候选应保留。|拆分2项；proposed|
|US-AGR-GRAIN-013 清理停用粮食输送装置|bounded-action-or-mechanism-supported-with-gaps|清洁要求可引用A-GRAIN167–170；停用盲区自动清洁缺口合理。|source-backed-action-only|
|US-AGR-GRAIN-014 按批次出仓并交付检验记录|bounded-action-or-mechanism-supported-with-gaps|官方散粮称重体系有据；农场出仓和交付记录需分开，执行单位范围待核。|拆分2项；proposed|
|US-AGR-APPLE-001 检查采果容器清洁与破损|bounded-action-or-mechanism-supported-with-gaps|容器清洁与破损见A-APPLE616；main当前落在摘果段，需动作定位。|拆分2项；proposed|
|US-AGR-APPLE-002 调整采摘携带容器位置|bounded-action-or-mechanism-supported-with-gaps|可调背带见A-APPLE616；仅是辅助工具，无省工数值。|source-backed-action-only|
|US-AGR-APPLE-003 摆放采摘梯至所需树冠位置|bounded-action-or-mechanism-supported-with-gaps|梯具在A-APPLE623–628；E-HARVEST主要为其他蔬菜平台，不证明果园平台替梯采用。|source-backed-action-only|
|US-AGR-APPLE-004 确认采收对象的品种与成熟要求|bounded-action-or-mechanism-supported-with-gaps|Honeycrisp成熟度限制有据；品种与产区限定保留，2015为更新日期。|source-backed-action-only|
|US-AGR-APPLE-005 将符合要求苹果从树上分离|bounded-action-or-mechanism-supported-with-gaps|2025文章历史判断有据；不能据此排除2026任何商业采果，树冠约束须具体段定位。|source-backed-action-only|
|US-AGR-APPLE-006 轻放苹果进入采摘容器|bounded-action-or-mechanism-supported-with-gaps|输送已采苹果的原型有据；轻放验收和延迟碰伤不能由原型总描述证明。|source-backed-action-only|
|US-AGR-APPLE-007 将落地或腐败果与正常采果分开|bounded-action-or-mechanism-supported-with-gaps|质量分级不识别落地接触史；A-APPLE635直接支持落地果隔离边界。|source-backed-action-only|
|US-AGR-APPLE-008 将采摘桶内果实转入果箱|bounded-action-or-mechanism-supported-with-gaps|传送和缓冲有机制；人工倒桶动作见A-APPLE637，自动全流程缺口正确。|source-backed-action-only|
|US-AGR-APPLE-009 移除果箱可见枝叶杂物|bounded-action-or-mechanism-supported-with-gaps|去异物职业动作有据，A-APPLE637可提供苹果专用定位；不得称视觉执行取枝。|source-backed-action-only|
|US-AGR-APPLE-010 检查果箱装满程度与果实损伤|bounded-action-or-mechanism-supported-with-gaps|单果原型不直接提供满箱/延迟伤检验；这是研究缺口，不能算已观察的失败。|拆分2项；proposed|
|US-AGR-APPLE-011 重新分选检查发现的不合格果箱|candidate-or-workflow-evidence-only|职业分选不直接证明苹果返工流程；保留一般动作，完整返选边界降拟议。|proposed；新增降级建议|
|US-AGR-APPLE-012 将果箱搬运到指定装卸点|bounded-action-or-mechanism-supported-with-gaps|Bin-dog只验证2017导航功能；常规叉具箱运描述可留，不能升商业部署。|source-backed-action-only|
|US-AGR-APPLE-013 清理采摘工具并撤下损坏容器|bounded-action-or-mechanism-supported-with-gaps|清洁与撤坏箱两输出合理；A-APPLE616/621和E-CLEAN分开定位。|拆分2项；proposed|
|US-AGR-APPLE-014 交付采收批次与果箱数量|bounded-action-or-mechanism-supported-with-gaps|标记编号可作背景；采收批次/果箱数签收并非所引职业条目全支持。|source-backed-action-only|
|US-AGR-VEG-001 检查采收器具与周转容器|bounded-action-or-mechanism-supported-with-gaps|清洗资料不能单独支持容器合格检查；检查动作可补GAP F-10.2原文定位。|source-backed-action-only|
|US-AGR-VEG-002 检查作物是否达到本次采收要求|bounded-action-or-mechanism-supported-with-gaps|分次成熟与选择判断有据；成熟量具具体机型仍为候选。|source-backed-action-only|
|US-AGR-VEG-003 摘取或切取指定蔬菜|bounded-action-or-mechanism-supported-with-gaps|加工番茄与鲜食软果边界明确，不能把加工案例算鲜食部署。|source-backed-action-only|
|US-AGR-VEG-004 将蔬菜排列放入周转箱|bounded-action-or-mechanism-supported-with-gaps|低冲击输送有据；排列装箱姿态及箱满切换未获得实测。|source-backed-action-only|
|US-AGR-VEG-005 剔除损伤腐败或受污染蔬菜|bounded-action-or-mechanism-supported-with-gaps|剔除次品/异物有职业依据；污染历史和内部状态必须限定为待验证。|source-backed-action-only|
|US-AGR-VEG-006 将采后周转箱转入遮阴接收区|unsupported-or-scope-error-needs-repair|O*NET task-23对象是容器苗木，不是蔬菜周转箱；换用task-11或机械操作task-1，另引遮阴原文。|source-backed-action-only|
|US-AGR-VEG-007 按品种适用方法清理采后蔬菜|bounded-action-or-mechanism-supported-with-gaps|清洗输送和污染风险可留；按品种用水规则需定位A-PRODUCE对应段。|source-backed-action-only|
|US-AGR-VEG-008 将蔬菜送入相应冷却流程|bounded-action-or-mechanism-supported-with-gaps|强制风冷和水冷的品种/水质条件有据，不能直接算自动装入或出库。|source-backed-action-only|
|US-AGR-VEG-009 核查冷却批次状态与损伤|bounded-action-or-mechanism-supported-with-gaps|温度与损伤分检合理；温度记录不能判定全部冷害。|拆分2项；proposed|
|US-AGR-VEG-010 按等级装箱并标识批次|bounded-action-or-mechanism-supported-with-gaps|分级装箱及标记有独立职业动作，拆分后分别验收。|拆分2项；proposed|
|US-AGR-VEG-011 重分选或重包装可处理批次|bounded-action-or-mechanism-supported-with-gaps|基础分选/包装可借作候选；重作触发和批次处置还未证。|拆分2项；proposed|
|US-AGR-VEG-012 清理分选台和停用周转设施|bounded-action-or-mechanism-supported-with-gaps|清洁表面要求有据；隐蔽部位与设施复装只是待验证残留任务。|source-backed-action-only|
|US-AGR-VEG-013 交付包装批次与储运要求|candidate-or-workflow-evidence-only|职业装运不完整覆盖交付储运要求；保留背景并降完整任务边界为拟议。|proposed；新增降级建议|
|US-AGR-NURSERY-001 清洁消毒育苗台和工具|bounded-action-or-mechanism-supported-with-gaps|育苗卫生与疾病传播原文可支持流程；清洁和消毒分别验收合理。|拆分2项；proposed|
|US-AGR-NURSERY-002 检查并分离不适用旧苗盘|bounded-action-or-mechanism-supported-with-gaps|旧盘不复用建议可留；检查分离动作需具体卫生段，自动剔盘无证。|source-backed-action-only|
|US-AGR-NURSERY-003 装填育苗容器并播入种子|bounded-action-or-mechanism-supported-with-gaps|填土与种植职业动作不等于专用填盘播种线；移栽页面是邻近工序，候选性质正确。|拆分2项；proposed|
|US-AGR-NURSERY-004 按苗情调节灌溉与温室条件|bounded-action-or-mechanism-supported-with-gaps|灌溉计时和漏堵检查在E-IRRIGATION54–67；温室控制须另标职业动作。|拆分2项；proposed|
|US-AGR-NURSERY-005 检查幼苗叶片与生长异常|bounded-action-or-mechanism-supported-with-gaps|番茄可无症状传播有据；不能把视觉未检出描述成已诊断健康。|source-backed-action-only|
|US-AGR-NURSERY-006 隔离疑似病害幼苗|bounded-action-or-mechanism-supported-with-gaps|移除疑病及相邻苗有直接指导；无交叉污染机械抓取未证。|source-backed-action-only|
|US-AGR-NURSERY-007 将达到条件的幼苗移入目标容器|bounded-action-or-mechanism-supported-with-gaps|机械移栽与补空穴直接有据；2023-02-24是网页最后修改日，应另列修订日期。|source-backed-action-only|
|US-AGR-NURSERY-008 将苗盘移交炼苗或出圃区|bounded-action-or-mechanism-supported-with-gaps|容器苗运输职业动作支持一般搬移；自动目的地调度未证。|source-backed-action-only|
|US-AGR-NURSERY-009 重新标记身份不清的可核实苗盘|bounded-action-or-mechanism-supported-with-gaps|重新确认身份不等于普通贴签，保留拟议降级正确。|proposed|
|US-AGR-NURSERY-010 清理育苗废料并维护灌溉设备|bounded-action-or-mechanism-supported-with-gaps|灌溉维护和清场分别有依据；拆分后仍需场内器具与废料条件。|拆分2项；proposed|
|US-AGR-NURSERY-011 按订单交付合格苗盘|bounded-action-or-mechanism-supported-with-gaps|售苗与包装交付职业条目可支持一般流程；具体订单准确性没有实证。|source-backed-action-only|
|US-AGR-MILK-001 核对待挤奶牛群与异常牛标记|candidate-or-workflow-evidence-only|治疗牛号输入是自动弃奶前提；RFID机制不能仅靠此段和全国采用调查推出，需补机型说明。|source-backed-action-only|
|US-AGR-MILK-002 引导奶牛从栏舍进入挤奶区|bounded-action-or-mechanism-supported-with-gaps|牛流门与人工赶牛均有推广依据；不能称全部牛自愿进站。|source-backed-action-only|
|US-AGR-MILK-003 清除乳头表面可见污物|bounded-action-or-mechanism-supported-with-gaps|欧洲清洁失败样本已明确限定为欧洲，方向正确；美国采纳背景和欧洲限制须分别定位。|source-backed-action-only|
|US-AGR-MILK-004 挤取前奶并观察异常|bounded-action-or-mechanism-supported-with-gaps|乳房炎可能漏检有据；前奶挤取与观察拆开，不把监测当全部前奶程序完成。|拆分2项；proposed|
|US-AGR-MILK-005 按场内规程隔离异常奶流|bounded-action-or-mechanism-supported-with-gaps|按正确牛号弃奶有直接说明；异常奶的其他成因需独立验证。|source-backed-action-only|
|US-AGR-MILK-006 施用适用挤奶前乳头处理剂|bounded-action-or-mechanism-supported-with-gaps|预处理因机型而异的限定正确；不能把刷洗自动等同施药。|source-backed-action-only|
|US-AGR-MILK-007 擦净并干燥预处理乳头|bounded-action-or-mechanism-supported-with-gaps|乳头干燥时间可调见E-AMS210；源文需精确定位，干净和干燥的双验收合理。|拆分2项；proposed|
|US-AGR-MILK-008 连接挤奶杯组|candidate-or-workflow-evidence-only|美国机器人挤奶采用有据；特定挂杯机械臂动作和美国成功率不能由汇总调查直接推导。|source-backed-action-only|
|US-AGR-MILK-009 观察挤奶过程与杯组状态|candidate-or-workflow-evidence-only|不完整挤奶问题有据；流量报警/过程画面具体功能尚未明确，名称须标候选。|source-backed-action-only|
|US-AGR-MILK-010 在挤奶完成后卸除杯组|unsupported-or-scope-error-needs-repair|按乳区自动脱杯是正向机制；相同句放反例栏不构成限制证据，需重判反例状态。|source-backed-action-only|
|US-AGR-MILK-011 施用挤奶后乳头处理剂|bounded-action-or-mechanism-supported-with-gaps|后处理是来源明确挑战，可作有限反证；不等于所有系统后处理失败。|source-backed-action-only|
|US-AGR-MILK-012 将完成奶牛引回指定群组|bounded-action-or-mechanism-supported-with-gaps|牛流门自动分群及布局限制直接有据，保留牛行为及现场改造缺口。|source-backed-action-only|
|US-AGR-MILK-013 按设施SOP清洗停用挤奶器具|candidate-or-workflow-evidence-only|原文只要求清洁设备，并未验证CIP程序；自动清洗程序名称要标候选，不能作采用结论。|source-backed-action-only|
|US-AGR-MILK-014 移交本班奶牛异常与挤奶记录|bounded-action-or-mechanism-supported-with-gaps|系统资料与交班签收应分开；E-AMSECON是经济背景，不能计本动作失败。|source-backed-action-only|
|US-AGR-TMR-001 核对饲料库存与牲畜分群|bounded-action-or-mechanism-supported-with-gaps|库存与分群要求相关，但两实体信息源不同；拆分有利验收。|拆分2项；proposed|
|US-AGR-TMR-002 采集饲料样本送检|unsupported-or-scope-error-needs-repair|取样和水分仪有据；“实验室营养分析未自动化”无支持，应改为本任务未获证，且外包检测另归执行者。|source-backed-action-only|
|US-AGR-TMR-003 检查称量与混料设备状态|bounded-action-or-mechanism-supported-with-gaps|秤与混料设备检查须分别验证；A-TMR613/618比泛main更精确。|拆分2项；proposed|
|US-AGR-TMR-004 按当前配方称取饲料组分|bounded-action-or-mechanism-supported-with-gaps|带秤配料有直接说明；原料水分和可取消人工仍缺。|source-backed-action-only|
|US-AGR-TMR-005 混合称量完成的饲料|bounded-action-or-mechanism-supported-with-gaps|混合时长影响颗粒和均匀性有据；不能用延长混合保证合格。|source-backed-action-only|
|US-AGR-TMR-006 将配合饲料送入指定料槽|bounded-action-or-mechanism-supported-with-gaps|混料车/固定输送等机制直接有据；没有连续无人运行证据。|source-backed-action-only|
|US-AGR-TMR-007 观察采食余料与供水状态|bounded-action-or-mechanism-supported-with-gaps|余料和供水是两项独立观察；摄像只是候选，不能当营养摄入计量。|拆分2项；proposed|
|US-AGR-TMR-008 隔离变质饲料并报告配方偏差|bounded-action-or-mechanism-supported-with-gaps|变质与营养偏差不能混同；隔离和上报应保留拟议边界。|拆分2项；proposed|
|US-AGR-TMR-009 按批准更正方式处理不合格配料|candidate-or-workflow-evidence-only|一致性问题不直接支持获准返配动作，完整任务建议降拟议。|proposed；新增降级建议|
|US-AGR-TMR-010 移送粪污至规定收集设施|bounded-action-or-mechanism-supported-with-gaps|奶场刮粪与猪场具体改造已区分；E-SCRAPER应改正文29等定位。|source-backed-action-only|
|US-AGR-TMR-011 按堆肥方案翻动粪污堆体|bounded-action-or-mechanism-supported-with-gaps|原职业没有粪堆翻堆动作，拟议降级正确；不能把清栏支持当翻堆证据。|proposed|
|US-AGR-TMR-012 清理停用饲喂设备与料槽|bounded-action-or-mechanism-supported-with-gaps|职业刷洗、软管泵清栏设备可支持工具；自动料槽卫生验收未证。|source-backed-action-only|
|US-AGR-TMR-013 交接投喂量余料及动物异常|bounded-action-or-mechanism-supported-with-gaps|生产记录条目不全部支持余料/动物异常交接字段；需分别补细定位。|source-backed-action-only|
|US-AGR-TMR-014 移交饲喂及粪污去向资料|bounded-action-or-mechanism-supported-with-gaps|一般生产记录不足以证明粪污去向，拆分和拟议状态合理。|拆分2项；proposed|
|US-AGR-EGG-001 检查饮水与供料器具|bounded-action-or-mechanism-supported-with-gaps|喂饮设施清洁完好有直接指导；水与料分别检查的建议合理。|拆分2项；proposed|
|US-AGR-EGG-002 向鸡群提供指定饲料与饮水|bounded-action-or-mechanism-supported-with-gaps|喂料和饮水器具有据；两供给动作分别计量，自动补料未证。|拆分2项；proposed|
|US-AGR-EGG-003 观察鸡群异常行为与健康迹象|bounded-action-or-mechanism-supported-with-gaps|病伤观察职业动作可留；行为影像不得升级为诊断部署。|source-backed-action-only|
|US-AGR-EGG-004 隔离需进一步评估的异常禽只|bounded-action-or-mechanism-supported-with-gaps|按体况分群支持一般隔离；抓禽移送机具仍无匹配证据。|source-backed-action-only|
|US-AGR-EGG-005 清理收蛋容器与蛋巢环境|bounded-action-or-mechanism-supported-with-gaps|脏巢影响鸡蛋滚出有据；收蛋容器与巢清洁分开。|拆分2项；proposed|
|US-AGR-EGG-006 将鸡蛋轻放入收集容器|bounded-action-or-mechanism-supported-with-gaps|滚落巢只使蛋到收集区；最终轻放装箱未证的边界准确。|source-backed-action-only|
|US-AGR-EGG-007 检查蛋壳破损与污染|bounded-action-or-mechanism-supported-with-gaps|2012蛋加工厂短期试验已限定，不能当小规模养殖场长期采用；裂纹与污染分开。|拆分2项；proposed|
|US-AGR-EGG-008 按适用程序清洗可处理鸡蛋|unsupported-or-scope-error-needs-repair|旧资料设备价格困难属于经济约束，应从technical移到economic；不用于2026报价。|source-backed-action-only|
|US-AGR-EGG-009 将处理蛋移入指定储存环节|bounded-action-or-mechanism-supported-with-gaps|冷藏与储存指导存在，但机械移送未证；不是已发生失败。|source-backed-action-only|
|US-AGR-EGG-010 重分选误混的可追溯蛋批|candidate-or-workflow-evidence-only|普通分级不支持误混蛋批的追溯重分流程，完整任务建议降拟议。|proposed；新增降级建议|
|US-AGR-EGG-011 清洗饮水和收蛋器具|bounded-action-or-mechanism-supported-with-gaps|饮水器与收蛋器具分开清洗合理；应分别定位家畜清洗与蛋处理资料。|拆分2项；proposed|
|US-AGR-EGG-012 交付蛋批及生产处置记录|bounded-action-or-mechanism-supported-with-gaps|等级编号记录不等于完整生产处置交付，应保留字段证据缺口。|source-backed-action-only|
|US-AGR-SWINE-001 核对入群猪只身份与栏舍状态|bounded-action-or-mechanism-supported-with-gaps|RFID试验身份读取与栏舍检查分开；试验期应更正为2022-12，只有美国试验无部署证明。|拆分2项；proposed|
|US-AGR-SWINE-002 按体重和状况将猪只分群|bounded-action-or-mechanism-supported-with-gaps|动物分群职业动作有据；RFID只辅助身份，不保证分群结果，试验日期须修。|source-backed-action-only|
|US-AGR-SWINE-003 投送符合饲养阶段的饲料|bounded-action-or-mechanism-supported-with-gaps|ESF母猪适用边界已保留；MSU仅索引摘录，不能作完整原文或当前采用证据。|source-backed-action-only|
|US-AGR-SWINE-004 检查猪群供水与采食情况|bounded-action-or-mechanism-supported-with-gaps|潜在监测用途不是已有料位/水流报警部署；索引资料及样本不足。|拆分2项；proposed|
|US-AGR-SWINE-005 观察猪只损伤疾病与生长状况|bounded-action-or-mechanism-supported-with-gaps|职业病伤观察可留；影像/秤用途和真实疾病诊断严格分开。|source-backed-action-only|
|US-AGR-SWINE-006 隔离异常猪并安排专业评估|bounded-action-or-mechanism-supported-with-gaps|隔离与专业评估两动作分别有职业依据；自动搬猪和临床判断仍缺。|拆分2项；proposed|
|US-AGR-SWINE-007 称量待分群或出栏猪只|bounded-action-or-mechanism-supported-with-gaps|猪秤线索只来自索引和引牛至秤职业动作；地磅/通道秤具体机型为候选。|source-backed-action-only|
|US-AGR-SWINE-008 将符合条件猪只引至装运交接位|bounded-action-or-mechanism-supported-with-gaps|引导牲畜入车是有据动作；坡道工具名称若作事实需补原文。|source-backed-action-only|
|US-AGR-SWINE-009 将圈舍粪污送至收集设施|bounded-action-or-mechanism-supported-with-gaps|密苏里刮粪改造有正文依据，应从检索摘录移到缓存29；不是2026持续在运。|source-backed-action-only|
|US-AGR-SWINE-010 纠正可核实的错群与标签错误|bounded-action-or-mechanism-supported-with-gaps|漏读试验不能自动纠正来源标签或错群；拆分正确，修正2022试验期。|拆分2项；proposed|
|US-AGR-SWINE-011 清洗空栏及停用饲喂器具|bounded-action-or-mechanism-supported-with-gaps|职业刷具软管泵清洗有据；“压力清洗”参数/压力机型须标候选。|source-backed-action-only|
|US-AGR-SWINE-012 移交猪群生长及处置记录|bounded-action-or-mechanism-supported-with-gaps|普通生产记录可留；自动数据工具只索引线索，交付签认仍未证。|source-backed-action-only|
|US-AGR-FOREST-001 核对采伐树木标记与作业地形|bounded-action-or-mechanism-supported-with-gaps|职业选树地况评估可支持一般准备；树木标记与地形核对不直接证明产权审核。|source-backed-action-only|
|US-AGR-FOREST-002 评估树木倾斜腐朽和上方危险|bounded-action-or-mechanism-supported-with-gaps|腐朽、倾斜和重枝有职业条目；上方危险完整评估仍需场地方案。|source-backed-action-only|
|US-AGR-FOREST-003 清理指定作业区和撤离路径|bounded-action-or-mechanism-supported-with-gaps|锯具/推土机清障及撤离路径职业动作直接支持，可保留。|source-backed-action-only|
|US-AGR-FOREST-004 检查链锯或采伐机械状态|candidate-or-workflow-evidence-only|锯具保养条目不直接提供诊断显示或自动状态检查，具体显示工具标候选。|source-backed-action-only|
|US-AGR-FOREST-005 按批准方案伐倒指定树木|bounded-action-or-mechanism-supported-with-gaps|机械抓持切伐有OSHA机制；坡地限制只保留USFS索引摘录，不能称全文已核读。|source-backed-action-only|
|US-AGR-FOREST-006 检查倒木与周边悬挂物状态|bounded-action-or-mechanism-supported-with-gaps|机械移动与危险识别无法覆盖悬挂物整体检查，拟议状态正确。|proposed|
|US-AGR-FOREST-007 去除倒木树枝|unsupported-or-scope-error-needs-repair|处理头去枝有据；“异常枝干需人工”没有该原文支持，改为异常处理方式待验证。|source-backed-action-only|
|US-AGR-FOREST-008 按材种要求将树干截为原木|bounded-action-or-mechanism-supported-with-gaps|处理头定长截断有据；材质优化/自动等级决定不在证据内。|source-backed-action-only|
|US-AGR-FOREST-009 测量并分级原木|bounded-action-or-mechanism-supported-with-gaps|长度质量检查职业动作支持量测背景；分级方案和专用测径器仍需证据。|拆分2项；proposed|
|US-AGR-FOREST-010 重截获准更改规格的原木|candidate-or-workflow-evidence-only|重复截断作为机制候选合理；获准规格变更流程不由原文直接支持，建议完整任务降拟议。|proposed；新增降级建议|
|US-AGR-FOREST-011 隔离不稳定倒木或设备故障区|bounded-action-or-mechanism-supported-with-gaps|危险树标记不等于设备故障区隔离，拟议降级合理。|proposed|
|US-AGR-FOREST-012 将原木集运至装载场|bounded-action-or-mechanism-supported-with-gaps|集运机抓取运输原木有据；泥土地况是适配判断，索引来源限制须保留。|source-backed-action-only|
|US-AGR-FOREST-013 将原木装载并交给运输方|bounded-action-or-mechanism-supported-with-gaps|集运到楞场不证明装公路车和运输签收；两输出拆分合理。|拆分2项；proposed|
|US-AGR-FOREST-014 维护停用链锯和采伐机械|bounded-action-or-mechanism-supported-with-gaps|职业链锯维护有据；采伐机械全部维护的外推范围需明确。|source-backed-action-only|
|US-AGR-FOREST-015 交付材积等级和作业地段记录|bounded-action-or-mechanism-supported-with-gaps|标木身份不是材积等级交付，拟议降级正确。|proposed|
|US-AGR-REFOREST-001 核对树苗来源批次与植区要求|candidate-or-workflow-evidence-only|选苗与保护资料不直接提供来源批次审核；地图应引用O45-4011 task-18，完整匹配为拟议。|proposed；新增降级建议|
|US-AGR-REFOREST-002 分选不适合栽植的树苗|bounded-action-or-mechanism-supported-with-gaps|剔除不合格苗有职业条目；活力质量自动检测未证。|source-backed-action-only|
|US-AGR-REFOREST-003 保护待植树苗根部免受干燥冻结|bounded-action-or-mechanism-supported-with-gaps|保湿保护及温度防冻要求有据；根系状态与包装持续检查仍待实测。|source-backed-action-only|
|US-AGR-REFOREST-004 向栽植人员分配当班苗批|bounded-action-or-mechanism-supported-with-gaps|机植备苗补给有指导；按当班班组配苗是研究定义，工具或步骤需补细定位。|source-backed-action-only|
|US-AGR-REFOREST-005 整理栽植点植被与地表|bounded-action-or-mechanism-supported-with-gaps|机械整地和经济适用限制有依据，具体费用不得外推项目。|source-backed-action-only|
|US-AGR-REFOREST-006 在指定点位开穴并栽入树苗|bounded-action-or-mechanism-supported-with-gaps|机植与人工对比有据；开放穴与栽入压实拆开，不能把半自动机构叫全无人。|拆分2项；proposed|
|US-AGR-REFOREST-007 抽查已栽树苗位置和状态|bounded-action-or-mechanism-supported-with-gaps|抽样查间距/数量/固着见E-PLANTTREE331；当前main在植苗机构，需新增具体定位。|source-backed-action-only|
|US-AGR-REFOREST-008 重植确认栽植不合格的点位|bounded-action-or-mechanism-supported-with-gaps|补植决策见E-PLANTTREE333–336；按死苗空区补植不等于所有初次栽植不合格返工。|source-backed-action-only|
|US-AGR-REFOREST-009 标记病害或不宜继续栽植区域|bounded-action-or-mechanism-supported-with-gaps|识别病树与不适宜区域不是同一动作，维持拟议并考虑继续拆分。|proposed|
|US-AGR-REFOREST-010 按抚育计划疏除竞争植被|bounded-action-or-mechanism-supported-with-gaps|抚育喷药/动力疏伐职业动作有据；一次整地不能证明后续全周期控制。|source-backed-action-only|
|US-AGR-REFOREST-011 清理栽植工具与周转包装|bounded-action-or-mechanism-supported-with-gaps|设备检查职业条目不能支持包装回收，拟议降级正确。|proposed|
|US-AGR-REFOREST-012 交付植区位置与树苗批次记录|bounded-action-or-mechanism-supported-with-gaps|地图和树计数有据；苗批来源及交付签认未由这些动作证明。|source-backed-action-only|
|US-AGR-FISHPOT-001 检查笼具绳索浮标与船上设备|bounded-action-or-mechanism-supported-with-gaps|渔具维护和组成有据；船上设备与笼绳检查分别验收合理。|拆分2项；proposed|
|US-AGR-FISHPOT-002 装载本次航次渔具与物资|bounded-action-or-mechanism-supported-with-gaps|船上吊装职业动作有据；固定与调度为待验证人工边界。|source-backed-action-only|
|US-AGR-FISHPOT-003 将饵料装入笼壶|bounded-action-or-mechanism-supported-with-gaps|笼中固定诱饵的原理有据；自动装饵没有本次匹配证据。|source-backed-action-only|
|US-AGR-FISHPOT-004 部署笼壶并记录位置|bounded-action-or-mechanism-supported-with-gaps|按需渔具的受许可试验已限界；起收不成功不能自动算布放任务失败，反例需按子动作。|拆分2项；proposed|
|US-AGR-FISHPOT-005 回收笼壶并取出渔获|bounded-action-or-mechanism-supported-with-gaps|绞机牵引和按需起收有机制；取出渔获未替代，E-POTFAIL应正文17/19定位。|拆分2项；proposed|
|US-AGR-FISHPOT-006 识别渔获并测量需核查个体|bounded-action-or-mechanism-supported-with-gaps|尺寸测量职业条目有据；物种判断与尺寸测量拆开，留放规则待具体渔业核查。|拆分2项；proposed|
|US-AGR-FISHPOT-007 对不可保留或受保护物种执行适用处置|candidate-or-workflow-evidence-only|逃逸设计和混获风险不证明主动处置全部保护物种；完整任务建议维持拟议而非source-backed。|proposed；新增降级建议|
|US-AGR-FISHPOT-008 将保留渔获放入适用保管容器|bounded-action-or-mechanism-supported-with-gaps|职业冰盐存放是通用渔获背景，活养容器适用物种未证，不得跨物种套用。|source-backed-action-only|
|US-AGR-FISHPOT-009 修补可修复的破损笼具|bounded-action-or-mechanism-supported-with-gaps|渔具维修职业动作可留；具体笼绳自动修补缺证。|source-backed-action-only|
|US-AGR-FISHPOT-010 卸载渔获并交给接收方|candidate-or-workflow-evidence-only|职业装卸条目对象设备物资，送鱼买方支持运输；实际卸鱼吊机需另证，拆分合理。|拆分2项；proposed|
|US-AGR-FISHPOT-011 清洗甲板与停用渔具|candidate-or-workflow-evidence-only|职业明确甲板/工具刷洗；清洗泵作为机型尚属候选，不能证明无人洗净。|source-backed-action-only|
|US-AGR-FISHPOT-012 移交航次渔获与异常记录|bounded-action-or-mechanism-supported-with-gaps|航次申报字段未获具体渔业来源，拟议状态恰当。|proposed|
|US-AGR-LONGLINE-001 检查主线支线钩具与定位附件|bounded-action-or-mechanism-supported-with-gaps|渔具组成与维护相符；E-LONGLINEGEAR正确缓存609–611，当前593错位。|source-backed-action-only|
|US-AGR-LONGLINE-002 给指定钓钩挂饵|bounded-action-or-mechanism-supported-with-gaps|表层饵钩构成有据；海底自动延绳系统不外推，限定正确。|source-backed-action-only|
|US-AGR-LONGLINE-003 连接支线与位置标记附件|bounded-action-or-mechanism-supported-with-gaps|连接浮标等附件职业条目及支线组成可留；自动接装完整性未证。|source-backed-action-only|
|US-AGR-LONGLINE-004 按航次方案投放延绳钓具|unsupported-or-scope-error-needs-repair|来源仅定义动力起线器，不能支持动力放线已实现；应为布放候选且修引用609。|source-backed-action-only|
|US-AGR-LONGLINE-005 监视船况天气与渔具位置|bounded-action-or-mechanism-supported-with-gaps|智能浮标商品可购自述不证明船况/天气判断，拆分和可靠性缺口正确。|拆分2项；proposed|
|US-AGR-LONGLINE-006 按适用流程停止或调整异常航次作业|bounded-action-or-mechanism-supported-with-gaps|天气响应与牵引危险不是自动综合避险，拟议状态恰当。|proposed|
|US-AGR-LONGLINE-007 回收钓具并从钩具卸下渔获|bounded-action-or-mechanism-supported-with-gaps|动力起线和海龟脱钩工具属于不同动作/对象；更正两来源行号并限定为海龟工具背景。|拆分2项；proposed|
|US-AGR-LONGLINE-008 识别渔获的可保留状态|bounded-action-or-mechanism-supported-with-gaps|2019夏威夷审片物种识别不足有据；人工审片不是自动留放许可。|source-backed-action-only|
|US-AGR-LONGLINE-009 将受保护或不可保留渔获移交规定处置|bounded-action-or-mechanism-supported-with-gaps|海龟钩线指南范围已明确，必须保持不外推其他物种；原缓存应367而非357。|source-backed-action-only|
|US-AGR-LONGLINE-010 更换破损支线或钩具|bounded-action-or-mechanism-supported-with-gaps|渔具维修可作背景；自动诊断与更换验收未证。|source-backed-action-only|
|US-AGR-LONGLINE-011 清洗甲板设备并维护回收装置|bounded-action-or-mechanism-supported-with-gaps|清洗与机械维护可分开；缠绕机制不能代替设备修复证据。|拆分2项；proposed|
|US-AGR-LONGLINE-012 交付渔获及航次来源记录|bounded-action-or-mechanism-supported-with-gaps|美国特定渔业EM和人工审片有据；不代表整航次来源记录/交付自动完整。|source-backed-action-only|
|US-AGR-AQUA-001 核对投放鱼种与目标池塘记录|bounded-action-or-mechanism-supported-with-gaps|多批次方案与存量估计困难有据；鱼种核对和账面真实库存不是同一事实。|source-backed-action-only|
|US-AGR-AQUA-002 将鱼种转入目标育成池塘|bounded-action-or-mechanism-supported-with-gaps|成年鱼装载不能直接支持小苗安全转移，已正确标为邻近候选。|source-backed-action-only|
|US-AGR-AQUA-003 检查池塘水质与鱼群摄食状态|bounded-action-or-mechanism-supported-with-gaps|水质与摄食两类观测有指导，传感闭环/校准尚缺。|拆分2项；proposed|
|US-AGR-AQUA-004 按池塘状态投送适用饲料|bounded-action-or-mechanism-supported-with-gaps|机械吹料在美国行业实践有据；风与摄食/水质限制需定位Feeding段。|source-backed-action-only|
|US-AGR-AQUA-005 按场站计划操控增氧或水循环|candidate-or-workflow-evidence-only|机械增氧有据；循环设备不能由增氧资料推出，分项并补循环方案。|拆分2项；proposed|
|US-AGR-AQUA-006 对缺氧或异常摄食发出响应工单|bounded-action-or-mechanism-supported-with-gaps|原文及时增氧需求不证明工单派发，拟议降级正确。|proposed|
|US-AGR-AQUA-007 采集收获前鱼样供质量确认|bounded-action-or-mechanism-supported-with-gaps|2013鱼片电子鼻实验与池塘取样分开，试验不证明商业放行；限定正确。|source-backed-action-only|
|US-AGR-AQUA-008 使用适用围网收集目标鱼群|bounded-action-or-mechanism-supported-with-gaps|典型围网至少5人仅为该组合流程，并未逐项分配；量值有据，主引用应加seining-crew。|source-backed-action-only|
|US-AGR-AQUA-009 按接收要求分选收获鱼|bounded-action-or-mechanism-supported-with-gaps|分级网与暂养场地有机制背景；主定位应移至分级说明而非仅装车段。|source-backed-action-only|
|US-AGR-AQUA-010 对获准重分选鱼群再次分级|candidate-or-workflow-evidence-only|重复分级需要本场授权规则，基础分级不直接支持返工；建议完整任务降拟议。|proposed；新增降级建议|
|US-AGR-AQUA-011 将合格鱼交给收购运输方|bounded-action-or-mechanism-supported-with-gaps|液压吊网/吊秤装车有直接说明；没有替代运输供氧或接收质量审核。|source-backed-action-only|
|US-AGR-AQUA-012 检查并维护停用投饲增氧及网具|bounded-action-or-mechanism-supported-with-gaps|畜牧设备通用检查不足以覆盖水产投饲增氧网具，拆分与拟议降级适当。|拆分4项；proposed|
|US-AGR-AQUA-013 移交投放投饲与收获记录|bounded-action-or-mechanism-supported-with-gaps|生产体系和投饵说明不直接证明台账移交；批次记录自动完整性仍无证据。|source-backed-action-only|

## 后续处理

先修复引用、版本日期、否定断言、错误对象和反例类型；将182项采用障碍拆成有定位事实和明确研究问题。作者7条机会均为条件化研究清单，没有收益排名；OP5无需逐头补读的必要条件过强，需要改成包含补读残留成本的比较。完成修订后按稳定编号复核差异，再决定哪些窄范围结论可发布。所有任务仍缺完整经营参数或现场验证，不能冻结整个行业。
