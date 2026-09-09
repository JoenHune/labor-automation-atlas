# 中国核心五行业人工任务盘点（进行中）

研究日期：2026-09-09。本文件是可追溯的任务发现增量，未冻结，也未完成全任务自动化证据研究。

当前 92 个场景、1050 条已识别/待核任务。任务数是清单行数，不是工人数、工时或统计覆盖率。

## 阅读与计数规则

- 场景采用流程/生产单元资料与职业职责两条路径；职业源目前是2022社会公示稿，正式版仍待核对。
- source-backed只表示所引原文支持相关动作存在；验收文字是研究者的定性操作化，参数和完整SOP待补。proposed表示具体步骤或场景归属尚待来源验证。
- 生产单元表不是完整操作规程。每条任务的来源支持范围见JSON；未覆盖阶段明确留缺口。
- 2026年新公布的部分排污许可规范2027年才实施，工序结构可以参考，不能写成研究日现行要求。
- 所有人工投入保持null；自动化研究状态全部not-started，不据职业描述生成工时、比例或回报。
- 场景与阶段汇总不重复计任务；替代工艺分支不能叠加；外包按执行单位行业归属。

## 来源与具体位置

- **cn-occ-2022-draft** [中华人民共和国职业分类大典（2022年版）（社会公示稿）](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf)；发布：未核实完整日期；读取：2026-09-09；2022 年社会公示稿，非正式现行版
  - agronomy：PDF 第 301 页，5-01-02-01 农艺工，主要工作任务 1—8。耕整、种子处理、播种移苗、中耕、水肥药、收割、秸秆处理、机具保养
  - horticulture：PDF 第 301—302 页，5-01-02-02 园艺工，主要工作任务 1—10。耕整、育苗、栽插、水肥、环境、修剪、授粉、采收、整理分级包装、保养
  - seedling：PDF 第 300—301 页，5-01-01-02 种苗繁育员，主要工作任务 1—6。繁殖材料、苗床基质、播种扦插嫁接、环境、灌溉炼苗、起苗检查包装
  - mushroom：PDF 第 302 页，5-01-02-03 食用菌生产工，主要工作任务 1—10。菌种、培养料、菌袋、接种、发菌、环境、采摘、保鲜和设施
  - forestry：PDF 第 303 页，5-02-02-00 造林更新工，主要工作任务 1—6；第 304 页，5-02-03-02 森林抚育工。整地、播种植苗补植、抚育、防护、成活率验收
  - logging：PDF 第 304 页，5-02-04-01 林木采伐工和 5-02-04-02 集材作业工。标木采倒、方向控制、打枝造材、集材挂钩和设备保养
  - livestock：PDF 第 306 页，5-03-02-01 家畜饲养员，主要工作任务 1—8。饲喂放牧、乳毛采集、分娩护理、粪污、生产记录、防疫
  - poultry：PDF 第 306 页，5-03-02-02 家禽饲养员，主要工作任务 1—7。投料、转禽收蛋、环境、消毒、健康免疫、死亡处置、记录
  - aquaculture：PDF 第 308—309 页，5-04-02-01 水生动物饲养工，主要工作任务 1—8。清池、测水、放苗、投饵、生长观察、起捕、设备保养
  - aquatic-seed：PDF 第 308 页，5-04-01-01 水生动物苗种繁育工。设施、亲体、孵化、饵料、培育、优选计数包装
  - fishing：PDF 第 309—310 页，5-04-03-01 水产捕捞工及 5-04-03-02 渔业船员。渔具、起收网、渔获分拣加工、船机维护
  - crop-protection：PDF 第 312 页，5-05-02-01 农作物植保员。病虫调查、施药、生物物理防治、药械保养
  - mechanization：PDF 第 316 页，5-05-05-01 农机驾驶操作员，主要工作任务 1—9。机具地块检查、挂接、参数试作业、耕种防收、故障诊断、保养
  - initial-processing：PDF 第 317 页，5-05-06-01 园艺产品加工工。整理、分级、切分、包装冷藏；职业划分不等于行业归属
  - coal-mining：PDF 第431页，6-16-01-05 井下采矿工，主要工作任务1—8。凿岩、采煤、装运、放顶煤、推溜、维护与记录
  - coal-support：PDF 第432页，6-16-01-06 井下支护工，主要工作任务1—11。架棚锚喷、移架、回撤、放顶、充填、供液、维护
  - steel-charge：PDF 第444页，6-17-02-01 炼钢原料工，主要工作任务1—10。废钢加工检验配料装料、铁水接送及预处理
  - steelmaking：PDF 第445页，6-17-02-02 炼钢工，主要工作任务1—11。炉料、吹氧、熔化、造渣合金、测温取样、出钢、精炼与炉体维护
  - steelcasting：PDF 第445页，6-17-02-03 炼钢浇铸工，主要工作任务1—9。钢包吊运、中间包液面、浇铸、连铸调节、切割、精整标记与维护
  - pulp：PDF 第357—358页，6-07-01-01 制浆工，主要工作任务1—10。备料除杂、机械或化学制浆、洗筛漂浓缩、废纸碎解脱墨
  - papermaking：PDF 第358页，6-07-01-03 造纸工和6-07-01-04 纸张整饰工。打浆调料抄造压榨干燥压光、复卷接头切纸选纸包装
  - pulp-recovery：PDF 第358页，6-07-01-02 制浆废液回收利用工，主要工作任务1—7。过滤氧化蒸发燃烧碱回收、白泥煅烧、有机物提取
  - paperbox：PDF 第359页，6-07-02-00 纸箱纸盒制作工，主要工作任务1—6。瓦楞轧制黏合烘干、印刷开槽模切钉粘箱、纸板裱合
  - furniture：PDF 第357页，6-06-04-00 家具制作工，主要工作任务1—11。材料及零部件加工、表面处理、软体绷装、检查装配包装
  - autoassembly：PDF 第493页，6-22-02-01 汽车装调工，主要工作任务1—16。各系统装配调整、车架铆接、总装合装、检测试验与设备维护
  - pcb：PDF 第517—518页，6-25-01-13 印制电路制作工，主要工作任务1—4。图形制作、腐蚀电镀孔金属化表面处理、钻孔外形层压、助焊阻焊
  - power-fuel：PDF 第527页，6-28-01-02 燃料值班员，主要工作任务1—8。接卸存贮制备启动掺配、巡检故障、维护、计量验收、检修试验与记录
  - power-boiler：PDF 第527页，6-28-01-01 锅炉运行值班员，主要工作任务1—6。启停、燃烧除尘脱硫脱硝调整、参数监测、巡检消缺、检修试验、记录
  - power-turbine：PDF 第527页，6-28-01-03 汽轮机运行值班员，主要工作任务1—6。启停调整、参数、控制切换、巡检故障、保养试验与验收
  - power-electric：PDF 第528页，6-28-01-06 发电机组电气值班员，主要工作任务1—8。并网解列、负荷与电气监视、倒闸、故障、维护验收与记录
  - gas：PDF 第530—531页，6-28-02-01 燃气储运工，主要工作任务1—9。储存装卸调压充装、管网检漏处置、入户检修、安全装置与维护
  - wastewater：PDF 第533—534页，6-28-03-03 工业废水处理工，主要工作任务1—6。预处理、生化物化与回用、污泥废气浓液、投药中和消毒、设备仪表维护
  - retail：PDF第187页，4-01-02-03 商品营业员，任务1—7。陈列补货价签、组装展示、验收保养盘点、检查包装交付
  - warehouse：PDF第200—201页，4-02-06-01 仓储管理员，任务1—6。出入库、货位和凭证、盘点残损、付货复核、储存维护与信息
  - tally：PDF第201页，4-02-06-02 理货员，任务1—9。核对拣选复核包装置唛、店面整理、发运分流、堆码残损与交接
  - loader：PDF第199—200页，4-02-05-01 装卸搬运工，任务1—4。装卸搬运、数量去向、机具维护、场地清洁
  - truck：PDF第195页，4-02-02-02 道路货运汽车驾驶员，任务1—4。驾驶、称重、检查维护、故障与事故
  - freight-station：PDF第195页，4-02-02-04 道路货运业务员，任务1—6。场站、受理单据、配载装卸、计划结算、安全
  - courier：PDF第204页，4-02-07-08 快递员，任务1—8。揽收验视封装称重、交接开包、投递再投改退
  - express-sort：PDF第204—205页，4-02-07-09 快件处理员，任务1—8。接收卸载核对、分拨集包、路单装车、异常件及信息
  - masonry：PDF第535页，6-29-01-01 砌筑工。砖块砌筑、挂铺块瓦、自检整改
  - concrete：PDF第535页，6-29-01-03 混凝土工。配搅泵送浇筑、模板搭拆、养护缺陷修补、机具维护
  - rebar：PDF第535页，6-29-01-04 钢筋工。外观、分类码放、配料放样、除锈调直切弯、连接绑扎安装、维护
  - scaffold：PDF第535—536页，6-29-01-05 架子工。架体搭拆、安全网、升降脚手架吊篮、检测材料堆放
  - prefab：PDF第536页，6-29-01-06 装配式建筑施工员。构件现场堆放放线吊装调平临支、套筒灌浆、吊点凹槽处理
  - electrical-install：PDF第542页，6-29-03-02 电气设备安装工。来料检测、设备电缆安装、系统试验、故障及记录
  - pipe-install：PDF第543页，6-29-03-04 管工。管件搬运分类、切丝弯槽、连接、试验冲洗调试维修记录
  - decoration：PDF第545页，6-29-04-01 装饰装修工。清理、抹涂裱镶铺缝、隔墙吊顶、设施安装
  - window：PDF第545页，6-29-04-02 建筑门窗幕墙安装工。部件加工、测量、装配安装调试密封及机具维护
  - earthwork：PDF第553页，6-30-05-05 挖掘铲运和桩工机械司机。挖铲填运、成桩、机械设置调试、保养故障记录
  - mechanical-install：PDF第542页，6-29-03-01 机械设备安装工，任务1—6。开箱就位调整测试、组装、空负荷和负荷试运、排故及记录
  - rural-builder：PDF第536页，6-29-01-07 乡村建设工匠，任务1—9。识图材料准备、砌抹防水钢筋混凝土、给排水电气及乡村基础设施施工、自检记录
  - waterproof：PDF第539页，6-29-02-08 防水工，任务1—5。基底处理、防水层与细部施工、缺陷修补和保护
  - fiber-pre：PDF第343页，6-04-01-02，主要工作任务。丝麻毛开松清洗脱胶煮茧等预处理
  - cotton-pre：PDF第342—343页，6-04-01-01/03/04/05，主要工作任务。开清梳并粗纱、接换落卷清洁和异常
  - spinning：PDF第344页，6-04-02-01，主要工作任务。换粗纱、细纱络筒并捻、断头纱疵及机台清洁
  - weaving：PDF第344—345页，6-04-03-01/02/03，主要工作任务。整经上浆穿经上轴织布、断经纬处置、落布验修
  - dye-pre：PDF第347页，6-04-06-01，主要工作任务。配液缝头引布、烧毛退煮漂丝光、质量检查异常清洁
  - dyeing：PDF第347—348页，6-04-06-02，主要工作任务。打样染前检验、化料染色洗固脱烘、异常废物清洁
  - textile-print：PDF第348页，6-04-06-03/04，主要工作任务。花网检查、打样印花走布固色、版网制作修补及回收
  - textile-finish：PDF第348—349页，6-04-06-05/06，主要工作任务。配液送料、拉幅定型功能整理、落布质量异常记录和剩料回收
  - rubber：PDF第413页，6-14-01-01，主要工作任务。计配混炼、压延挤出成型硫化、检验维护记录
  - tyre-retread：PDF第413—414页，6-14-01-02，主要工作任务。选胎检验修补削磨、胎面贴合和硫化
  - plastic：PDF第414页，6-14-02-00，主要工作任务。混合造粒测色、挤注压延模压泡沫吹塑烧结及焊接
  - foundry：PDF第466页，6-18-02-01，主要工作任务。型芯砂回用、造型制芯合箱、熔炼浇注、清理修补及维护
  - oil-processing：PDF第324页，6-01-01-03，主要工作任务。油料预处理、压榨浸出、溶剂回收、精炼、油脂与粕壳包装仓储、监控维护
  - feed-processing：PDF第324页，6-01-02-00，主要工作任务。原料添加剂核验、清理粉碎、按配方称量混合、调质成型干燥、质量检验与维护
  - fish-processing：PDF第326页，6-01-05-01，主要工作任务。腌制、分割采肉制糜、配料、干燥熟化熏制、成型计量杀菌包装与清洁消毒
  - fish-refining：PDF第327页，6-01-05-02，主要工作任务。水产原料浸泡洗涤绞碎、消化、分离提纯、浓缩脱水干燥、磨粉配料杀菌包装与清洁
  - bulk-mechanic：PDF第552页，6-30-05-01，主要工作任务。起重装卸机械检查调整、吊运叉运、散货专用装卸、翻车机和设备维护
  - conveyor：PDF第553页，6-30-05-03，主要工作任务。输送机运料、给卸料分配、检查跑偏托辊、除尘泵、胶接皮带与清扫维护
  - ship-agent：PDF第197页，4-02-03-02，主要工作任务。水路运输票据、靠港中转装卸保管交接的业务办理；不证明装卸工时
  - cement-production：PDF第415页，6-15-01-01，主要工作任务。生料制备、熟料煅烧、水泥粉磨包装、环保检测和设备维护
  - glass-melt：PDF第420页，6-15-03-01，主要工作任务。原料均化称混投料、熔窑燃烧换向、熔液取样检查和维护
  - glass-form：PDF第420页，6-15-03-02，主要工作任务。料液输送、浮法或压延成型、退火切裁、质量剔除、换件维护
  - prepress：PDF第359—360页，6-08-01-01，主要工作任务。图文输入排版打样、制版显影、凹版滚筒和印版质量检查
  - printing：PDF第360页，6-08-01-02，主要工作任务。调墨备料、供纸收纸供墨调压、印刷检验排故以及设备清洁维护
  - postpress：PDF第360—361页，6-08-01-03，主要工作任务。上光覆膜裁切、折叠装订、插页、压凹凸烫印模切压痕、包装与质量判断
  - battery：PDF第509—510页，6-24-04-00，主要工作任务。活性物质、隔膜、浆料电极电解液、单体装配、化成电测、组件及固态材料
  - pv-module：PDF第506页，6-24-02-04，主要工作任务。电池片分选焊接、层叠封装装框、薄膜沉积刻划连接及电性能安全测试
  - drug-formulation：PDF第408页，6-12-03-00，主要工作任务。生产前确认计配制剂成型、包装器具洗干灭菌、制水净化消毒、液体灯检包装扫码、排故清洁记录
- **cn-wheat-service-2024** [安徽省小麦农业社会化服务规范（试行）](https://hzjjs.moa.gov.cn/nyshhfw/202402/t20240228_6449268.htm)；发布：2024-02-28；读取：2026-09-09
  - requirements：第 4 章基本要求，第 5 章服务内容（5.1 耕整地、5.2 种子、5.3 播种及收获、运输、干燥、储存项目）。小麦社会化服务的机具、耕整、种子播种及后续作业质量
- **cn-vegetable-2021** [冬季蔬菜稳产保供机械化生产技术指导意见](https://njhs.moa.gov.cn/tzggjzcjd/202111/t20211123_6382709.htm)；发布：2021-11-23；读取：2026-09-09
  - prepare：三、8—11，茬口衔接、施肥、耕地、整地。前茬清理、撒肥、旋耕、起垄开沟铺膜
  - grow：三、12—18，直播至植株调整。育苗播种、移栽、水肥环控、病虫防治和果菜整枝
  - harvest：三、19，采收和运输。叶菜一次切割收获与果菜人工采摘、输送装箱、运输
  - abnormal：一、1—3及二、4—7。设施加固、保温、通风、排涝和寒潮前抢收
- **cn-apple-autumn-2023** [2023年苹果园秋季生产技术指导意见](https://jgs.moa.gov.cn/fxpg/202309/t20230928_6437593.htm)；发布：2023-09-28；读取：2026-09-09
  - soil：一、土肥管理。分产区刈草、改土和施肥
  - prune：二、整形修剪。枝条疏除和拉枝
  - fruit：三、花果管理。摘袋、垫果、摘叶、转果、反光膜和采收
  - health：四、病虫害防治。病虫防治与病残枝叶处理
- **cn-apple-summer-2022** [苹果园夏季生产技术指导意见](https://zzys.moa.gov.cn/gzdt/202206/t20220621_6403019.htm)；发布：2022-06-21；读取：2026-09-09
  - disaster：灾后恢复管理：涝灾和雹灾果园段落。排水、扶正、清理受损果枝和恢复土壤
- **cn-mushroom-2026** [2026年全省夏季食用菌生产管理技术指导意见](https://jnny.jinan.gov.cn/col/col553/art/2026/art_3fecf5fd25844bb39b0b87379179dc09.html)；发布：2026-06-24；读取：2026-09-09
  - facility：01 优化设施条件：（一）遮阳降温、（二）通风除湿、（三）防汛。棚体、通风、遮阳和排水
  - bags：02 菌棒制作与规范化接种：（一）科学拌料装袋、（二）接种。原料防潮、低温拌料、及时灭菌、冷却、防污染接种
- **cn-mushroom-hygiene-2023** [食用菌生产用药安全管控技术性指导意见](https://jgs.moa.gov.cn/fxpg/202301/t20230128_6419291.htm)；发布：2023-01-28；读取：2026-09-09
  - contamination：（五）全程把控防污染，一至七。基质、灭菌、冷却、器具消毒、接种和发菌出菇环境
  - pests：物理防控菇蚊菇蝇及清水浸杀段。防虫网、粘虫板、诱虫灯及管理
- **cn-pig-health-2023** [秋冬季生猪疫病防控技术要点](https://xmsyj.moa.gov.cn/zcjd/202401/t20240109_6445184.htm)；发布：2023-11-08；读取：2026-09-09
  - inspection：一、做好临床巡查。临床观察、病猪隔离、送样、报告
  - immunization：二、做好疫苗免疫。疫苗储运和操作、抗体监测
  - hygiene：三至五、卫生消毒、生物安全、病死猪无害化处理。人员车辆物资消毒隔离、引种出猪、死亡物处理
  - husbandry：六、做好饲养管理。补料、饮水设备清洗、粪尿、通风温湿度
  - transfer：八、非洲猪瘟及猪繁殖与呼吸综合征段。车辆洗消、引种前后检测、隔离观察和混群
- **cn-milk-station-2009** [生鲜乳收购站标准化管理技术规范（农牧发〔2009〕4号）](https://nync.ln.gov.cn/nync/index/lnsnyfzfwzx/zcfg/A7B5DED1857C4FCABF7918529CBB917B/index.shtml)；发布：2009-03-23；读取：2026-09-09
  - equipment：2.6.1—2.6.4，设备维护。真空、奶杯内衬、脉动、阀及皮带检查
  - test：3.1—3.2，质量检测。留样编号和常规检测
  - milking：5.1—5.6，操作规范。牛只筛查、乳头清洁、前奶检查、套杯观察、脱杯药浴、冷却
  - clean：7.2—7.7，卫生保障。密闭铅封、洗消和排水、罐管清洁
- **cn-aquaculture-summer-2023** [夏季水产养殖技术指引](https://yyj.moa.gov.cn/scyz/202306/t20230620_6430587.htm)；发布：2023-06-20；读取：2026-09-09
  - fish：一、（一）鱼类 1—3。清池消毒、分池、测水、增氧、投饵
  - shrimp：一、（二）虾蟹类 1—4。苗种检测、处理水、水草、分级养殖与转池
  - shellfish：一、（三）贝类 1、4。稚贝转移、设施检查、过滤、清淤晒池
  - disease：二、（一）积极预防，鱼类段；（三）规范用药。观察、送检、隔离器具、死鱼和尾水处理
- **cn-forest-restoration-2021** [云南省恢复植被和林业生产条件及树木补种标准的实施意见（试行）](https://lcj.yn.gov.cn/html/2021/gfxwj_1206/127.html)；发布：2021-12-06；读取：2026-09-09
  - land：附件：恢复林业生产条件中的回填、坡面与土壤质量段。整地、覆土、压实和植被保持
  - plant：附件：恢复植被及树木补种标准，植物选择、造林密度、整地与栽植段。适地适树、乡土植物、整地栽植
  - accept：附件：恢复验收及保存要求段。恢复目标核验与补种
- **cn-ag-outsourcing-2019** [农业农村部办公厅 财政部办公厅关于进一步做好农业生产社会化服务工作的通知](https://jcs.moa.gov.cn/trzgl/201908/t20190827_6323158.htm)；发布：2019-08-27；读取：2026-09-09
  - service：农业生产托管、关键和薄弱环节社会化服务相关段。耕种防收及烘干等服务可由社会化服务组织承担
- **cn-coal-rule-2025** [煤矿安全规程（应急管理部令第17号）](https://www.mem.gov.cn/gk/zfxxgkpt/fdzdgknr/gz11/202508/W020250804639453346681.pdf)；发布：2025-07-24；读取：2026-09-09；实施：2026-02-01；已实施；2025修订
  - longwall：PDF第45—46页，第129条。综采设备安装、支架、推溜、煤壁顶板、乳化液及矿压
  - miner：PDF第53页，第140条相关款。采煤机开机安全确认、停机隔离、割煤与截齿滚筒更换
  - scraper：PDF第56页，第144条。刮板输送机信号、维护、推移及风险控制
- **cn-power-hj953-2026** [排污许可证申请与核发技术规范 火电（HJ953.1—2026）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202609/W020260903351863274869.pdf)；发布：2026-07-31；读取：2026-09-09；实施：2027-01-01；2026已公布、尚未实施；仅作已公开工序结构依据，不能写成2026现行强制要求
  - units：PDF第6—8页表1；第11页表2。燃料接卸存储输送制备、锅炉汽轮机发电机、公用和污染治理
- **cn-steel-hj846-2026** [排污许可证申请与核发技术规范 钢铁工业（HJ846—2026）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202609/W020260903364560555505.pdf)；发布：2026-07-31；读取：2026-09-09；实施：2027-01-01；2026已公布、尚未实施；仅作已公开工序结构依据，不能写成2026现行强制要求
  - units：PDF第6—7页表1。原辅料处理、烧结球团、炼铁炼钢精炼连铸及轧钢
- **cn-paper-hj1482-2026** [排污许可证申请与核发技术规范 造纸和纸制品业（HJ1482—2026）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202609/W020260903355217681908.pdf)；发布：2026-07-31；读取：2026-09-09；实施：2027-01-01；2026已公布、尚未实施；仅作已公开工序结构依据，不能写成2026现行强制要求
  - pulp：PDF第6—7页表1与表2。化学浆、机械浆、废纸浆及碱回收各单元
  - paper：PDF第8页表2续表。造纸白水回收、加工纸与纸制品设施
- **cn-auto-hj971-2026** [排污许可证申请与核发技术规范 汽车制造业（HJ971—2026）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202609/W020260903357835401097.pdf)；发布：2026-07-31；读取：2026-09-09；实施：2027-01-01；2026已公布、尚未实施；仅作已公开工序结构依据，不能写成2026现行强制要求
  - units：PDF第7页4.2.1及表1；第8—9页续表。20类主要生产单元，机加冲焊粘接预处理涂装，明确装配及检测试验单元
- **cn-electronics-hj1031-2019** [排污许可证申请与核发技术规范 电子工业（HJ1031—2019）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/201907/W020190726463360946225.pdf)；发布：2019-07-23；读取：2026-09-09；实施：2019-07-23
  - pcb：PDF第9页，表1-3印制电路板制造。开料表面处理、图形制作、钻孔、镀铜锡、阻焊及表面处理和成型
  - components：PDF第8—10页表1-1—1-5。电子器件元件及公用单元；不是全部装配工序清单
- **cn-furniture-hj1027-2019** [排污许可证申请与核发技术规范 家具制造工业（HJ1027—2019）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/201906/W020190606477512248323.pdf)；发布：2019-05-31；读取：2026-09-09；实施：2019-05-31
  - wood：PDF第7—8页4.3.2及表1。木工开料刨铣封边砂光、施胶及涂装
  - scope：PDF第7页4.2。木质、竹藤、金属、塑料、其他家具范围
- **cn-wastewater-hj978-2018** [排污许可证申请与核发技术规范 水处理（试行）（HJ978—2018）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/201811/W020181115298062287807.pdf)；发布：2018-11-12；读取：2026-09-09；实施：2018-11-12；试行；官网发布版
  - treatment：PDF第7页4.3.3—4.3.4。进水类别、预处理、生化、深度处理及设施
  - outlet：PDF第8页4.3.5—4.4。出水去向、排放口、废气处理
- **cn-gas-gb55009-2021** [燃气工程项目规范（GB55009—2021）](https://www.jingtai.gov.cn/zfxxgk/bmhxzxxgk/xzfzcbmzsjgml/xzjj/fdzdgknr/lzyj/zcfg/art/2025/art_3d1bfff86a94436483c1dcd3d14cba3d.html)；发布：未核实完整日期；读取：2026-09-09；实施：2022-01-01
  - scope：1.0.2。城镇燃气工程；排除门站前长输管道、工业内部工艺气等
  - operations：2.3.1—2.3.7；3.0.6—3.0.9。投运验收、操作维护、泄漏现场、安全、气质与加臭
  - lng：4.2.4、4.2.8—4.2.12、4.2.19—4.2.20；4.3.2。紧急切断、车位约束装卸连接、预冷、防静电、储罐参数
  - cylinder：4.3.12。合格可追溯气瓶，充后检漏及重量或压力检验、标识
- **cn-food-retail-gb31621-2014** [食品安全国家标准 食品经营过程卫生规范（GB31621—2014）](https://zjjcmspublic.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/jcms_files/jcms1/web3424/site/upload/20170830/20170830161219_49896.pdf)；发布：2014-12-24；读取：2026-09-09；实施：2015-05-24；2014发布版；已核卫生部门2023目录仍收录，本研究日正式现行目录交叉复核待补
  - receipt：PDF第2—3页，2采购、3运输、4验收。证明核验、感官温度、批次信息、不合格隔离及运输清洁
  - storage：PDF第3页，5.1—5.12贮存。温湿分区、先进先出、库存质量、虫害、清洁和出入库记录
  - sales：PDF第3—4页，6.1—6.10销售。分区温控、废弃物、散装标识、分包装及批发追溯
  - recall：PDF第4—5页，7、8、11。停止经营通知召回、卫生和记录
- **cn-roadfreight-2026** [道路货物运输及站场管理规定（2026年第八次修正）](https://xxgk.mot.gov.cn/gz/202602/t20260213_4200294.html)；发布：2026-02-06；读取：2026-09-09；2026年第5号令修正；部网站现行有效栏
  - scope：第2条、第6条。社会营业货运与站场范围、车辆技术和装载条件
  - road：第22—34条。驾驶记录、载质量尺寸、禁限运、货损与防撒漏、应急
  - station：第37—48条。安全检查、分类储存、包装装卸、清洁、配载与台账
- **cn-express-rule-2023** [快递市场管理办法（交通运输部令2023年第22号）](https://xxgk.mot.gov.cn/jigou/fgs/202401/t20240104_3980683.html)；发布：2023-12-17；读取：2026-09-09；实施：2024-03-01
  - receive：第15—17条、第25—26条。包装回收、实名验视、重量地址、分区处理及轨迹
  - deliver：第26条第9项及第27—30条。按址投递、当面验收、本人或约定代收、无着及投诉
  - safety：第31—36条。收寄验视安检、场所隔离紧急制动、维护检测、单据及信息安全
- **cn-concrete-db1832-2021** [建筑工程施工工艺规程 第3部分：混凝土结构工程（DB11/T 1832.3—2021）](https://leadingcloudread.oss-cn-beijing.aliyuncs.com/lizhengyun/1105009575860244482)；发布：2021-04-01；读取：2026-09-09；实施：2021-07-01
  - steel-form：PDF第28—31页，§4.3—4.7（印刷页20—23）。钢大模验收放线、支撑角模和内外模连接、校正验收拆卸、养护和变形修理
  - rebar-machine：PDF第82—87页，§12.3.7—12.4.12（印刷页74—79）。核料、调直、切断、标弯成型、打捆标识、异常切除检验
  - rebar-coupling：PDF第91—94页，§13.3.4—13.6.4（印刷页83—86）。丝头加工、保护、对接拧紧、逐个自检抽验、重拧复检及成品保护
  - rebar-raft：PDF第104—107页，§15.1—15.4.10（印刷页96—99）。钢筋及基底验收、底板与梁钢筋布置绑扎、马凳垫块、预埋交接、整改隐检
  - concrete-pump：PDF第154—161页，§22.3—22.7（印刷页146—153）。到场检验、泵管安装润泵、泵送监视、堵塞卸压处理、清洗余料污水回收
  - concrete-cast：PDF第164—170页，§23.3.9—23.7.17（印刷页156—162）。输送到场状态、柱梁板分层浇振、施工缝、湿养护、试件、缺陷及变形停工、落地灰清理
- **cn-decoration-db1832-2022** [建筑工程施工工艺规程 第10部分：装饰装修工程（DB11/T 1832.10—2022）](https://dbba.sacinfo.org.cn/portal/download/d3c0e94118703a2dbe066b1c1247108e1d031f6ded8596e3a616df7fa417d45d)；发布：2022-12-28；读取：2026-09-09；实施：2023-04-01
  - general：PDF第7—9页，§1.0.2—2.0.10（印刷页1—3）。北京适用范围、材料验收、每道工序及跨专业交接检验、成品防护和废弃物分类
  - external-tile：PDF第10—13页，§3.1—3.5.6（印刷页4—7）。选材样板、基底处理排砖弹线、浸砖、拌胶粘贴调整、填缝清理和粘结检验
  - interior-coat：PDF第35—40页，§7.1—7.5.10（印刷页29—34）。涂料批色验收、基底及水分条件、修补底涂、刮磨腻子、刷滚喷面涂与表面验收
  - mortar-plaster：PDF第44—49页，§8.1—8.7.1（印刷页38—43）。砂浆验收、基面处理、定位灰饼底灰加强网、分格面灰滴水槽、养护检验保护
  - partition：PDF第57—61页，§10.1—10.5.10（印刷页51—55）。轻钢龙骨定位连接、单侧面板、管线隐检及填充封板、板缝和钉头处理、填料及连接验收
  - ceiling：PDF第109—113页，§21.1—21.5.10（印刷页103—107）。吊顶内设备交接、吊杆和龙骨固定、面板钉接补钉、防锈嵌缝、设备开口及检验
- **cn-rural-water-ln-2013** [辽宁省农村饮水安全工程质量技术要求（正文落款2013年6月，2025年网页转载）](https://slt.ln.gov.cn/slt/zfxxgk/fdzdgknr/lzyj/bbmgfxwj/2025042116584218642/index.shtml)；发布：未核实完整日期；读取：2026-09-09
  - materials：§1.0.3、2.1.3、2.2.1—2.2.5及文末日期。地域范围、隐蔽交接、到货验收和储存；2013年6月落款
  - pipeline：§4.1—4.2。沟槽基底、垫层回填、管道清理安装连接及轴线高程复测
  - pressure-flush：§4.3—4.5。管道排气浸泡、强度严密性、冲洗消毒取样，阀表及井盖
  - water-tank：§6.1—6.4。防水基层分层砂浆、砌筑预埋防渗与养护、清洗消毒、分阶段充水测漏
  - pump-equipment：§5.0.1—5.0.5、7.1、7.4。基础及预埋条件、机泵安装试运和处理消毒设备组装试压
  - electrical：§7.2—7.3。变压器安装交接试验与防雷连接位置焊缝防腐
- **cn-textile-hj861-2017** [排污许可证申请与核发技术规范 纺织印染工业（HJ 861—2017）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/201710/W020171010507884353215.pdf)；发布：2017-09-29；读取：2026-09-09；实施：2017-09-29
  - units：PDF第6—9页，§3.1、3.4、4.3.2—4.3.4、4.4.1—4.4.2（印刷页3—6）。洗毛脱胶缫丝、织造、前处理染印整理成衣水洗单元，以及可选纺纱服装家纺与原辅料；不是所有企业均包含全部工序
- **cn-foundry-hj1115-2020** [排污许可证申请与核发技术规范 金属铸造工业（HJ1115—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200310519293485501.pdf)；发布：2020-03-04；读取：2026-09-09；实施：2020-03-04
  - scope：PDF第6页，§3.1—3.6（印刷页3）。金属铸造C3391/C3392，区别于冶炼连续铸坯；熔炼和铸造定义
  - units：PDF第8—10页，§4.1.3.2表1与§4.1.4.2（印刷页5—7）。熔炼造型制芯浇冷落砂再生清理热处理涂装及原辅料
- **cn-rubber-plastic-hj1122-2020** [排污许可证申请与核发技术规范 橡胶和塑料制品工业（HJ1122—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202004/W020200401327032592051.pdf)；发布：2020-03-27；读取：2026-09-09；实施：2020-03-27
  - rubber：PDF第9—11页，第一部分§4.1.2—4.1.3.4，表1（印刷页5—7）。轮胎、胶板管带零件、乳胶制品的炼胶成型硫化浸胶烘干脱模等单元及产品
  - plastic：PDF第75—78页，第二部分§4.1.2—4.1.3.2，表1（印刷页71—74）。膜、管型材、泡沫、容器、日用零件、人造革草坪等工艺及混配挤出吹塑注塑层压等单元
- **cn-feed-oil-hj1110-2020** [排污许可证申请与核发技术规范 农副食品加工工业—饲料加工、植物油加工工业（HJ1110—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304702000053087.pdf)；发布：2020-02-28；读取：2026-09-09；实施：2020-02-28
  - scope：PDF第5页，§3.1—3.2（印刷页2）。农牧及宠物饲料加工、食用非食用植物油加工范围
  - units：PDF第7—8页，§4.3.2表1、4.3.4及4.4.2（印刷页4—5）。饲料清理粉碎混合调质制粒、植物油预处理压榨浸出精炼包装输运及原辅料；生产单元表不能替代完整SOP
- **cn-fish-hj1109-2020** [排污许可证申请与核发技术规范 农副食品加工工业—水产品加工工业（HJ1109—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304699417594541.pdf)；发布：2020-02-28；读取：2026-09-09；实施：2020-02-28
  - scope：PDF第5页，§3.1（印刷页2）。水产动物和藻类初加工及鱼糜、腌干、精制产品等范围
  - units：PDF第7—8页，§4.3.2表1及4.4.2（印刷页4—5）。卸料储存、分级宰杀去除清洗漂烫盐渍分割、采肉脱水干制熟制精制及原辅料
- **cn-harbor-hj1107-2020** [排污许可证申请与核发技术规范 码头（HJ1107—2020）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304692515262514.pdf)；发布：2020-02-28；读取：2026-09-09；实施：2020-02-28
  - scope：PDF第5页，§3.1、4.2（印刷页2）。仅覆盖专业化及通用干散货码头；填报行业为水上运输业-货运港口
  - units：PDF第7—8页，§4.3.2表1—2（印刷页4—5）。船岸装卸、堆场堆取、陆侧车装卸、转运输送；车辆可自有或委托外部
  - dust：PDF第10—11页，§4.4表3—4（印刷页7—8）。各干散货单元的湿式抑尘、封闭、覆盖和干式除尘设施
- **cn-cement-hj847-2017** [排污许可证申请与核发技术规范 水泥工业（HJ847—2017）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/201708/W020170802617396676231.pdf)；发布：2017-07-27；读取：2026-09-09；实施：2017-07-27
  - scope：PDF第4—5页，§1、3.1（印刷页1—2）。熟料制造和独立粉磨站，排污范围可包含配套矿山及协同处置；不等同统计产业归属
  - units：PDF第6—8页，§4.3.1表1、4.3.3及4.4.2（印刷页3—5）。原料破碎预均化、生料与煤粉制备、煅烧冷却、熟料粉磨包装及原辅料
- **cn-flatglass-hj856-2017** [排污许可证申请与核发技术规范 玻璃工业—平板玻璃（HJ856—2017）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/201709/W020170918582848574342.pdf)；发布：2017-09-12；读取：2026-09-09；实施：2017-09-12
  - scope：PDF第4—5页，§1、3.1（印刷页1—2）。采用浮法压延工艺的平板玻璃工业
  - units：PDF第6—9页，§4.3.1表1及4.4.1（印刷页3—6）。破碎备料混配、熔化、浮法锡槽或压延成型、退火切裁装箱、公辅及原辅料
- **cn-print-hj1066-2019** [排污许可证申请与核发技术规范 印刷工业（HJ1066—2019）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/201912/W020240730350115357933.pdf)；发布：2019-12-10；读取：2026-09-09；实施：2019-12-10
  - scope：PDF第4—7页，§1、3.1—3.9、4.2（印刷页1—4）。印前制版、印刷、印后涂布等范围；C2311/C2312/C2319
  - units：PDF第8—10页，§4.3.2表1—2、4.3.4（印刷页5—7）。调墨制版、平凹柔孔版及数字印刷、复合涂布糊盒裱糊等单元和产品
- **cn-battery-hj967-2018** [排污许可证申请与核发技术规范 电池工业（HJ967—2018）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/201809/W020180927573097842473.pdf)；发布：2018-09-23；读取：2026-09-09；实施：2018-09-23
  - scope：PDF第5—7页，§3.1、4.2—4.3.2（印刷页2—4）。电池制造C384含化学电池和太阳电池，具体统计小类须与现行分类复核
  - lead：PDF第8页，表1（印刷页5）。铅酸极板制粉和膏板栅灌粉分片化成、称片包片焊接充放电清洗
  - lithium：PDF第10页，表4（印刷页7）。锂原电池与锂离子路线分别列；锂离子投料涂布烘烤注液
  - solar：PDF第10—11页，表5—7（印刷页7—8）。晶硅电池切片制绒扩散刻蚀沉积、薄膜电池清洗镀膜激光刻化与电极接线
- **cn-pharma-hj1063-2019** [排污许可证申请与核发技术规范 制药工业—化学药品制剂制造（HJ1063—2019）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/201912/W020200103326295794926.pdf)；发布：2019-12-10；读取：2026-09-09；实施：2019-12-10
  - scope：PDF第6页，§3.1、4.2（印刷页3）。化学药品制剂制造及兽药制剂相应申报范围；本轮只研究人用化学制剂场景
  - solid：PDF第7页，§4.3.2表1固体制剂单元（印刷页4）。干燥粉碎筛分混合制粒压片包衣分装灭菌；路线因剂型选择
  - liquid：PDF第8—9页，表1续表及§4.3.4（印刷页5—6）。液体制剂洗瓶干燥过滤灌装、固液半固体气体剂型及公用单元
  - utilities：PDF第8页，表1公用单元（印刷页5）。质检、洁净区、物料储运、制水废水废气及固废暂存

## 农林牧渔业

in-progress

| 门类 | 状态 | 当前场景 | 未覆盖说明 |
| --- | --- | --- | --- |
| 01 农业 | partial | wheat-field、vegetable-seedling、vegetable-fruiting、vegetable-leafy、apple-orchard、mushroom-bags | 稻作育秧插秧与水田收获；玉米收获与青贮；棉花、油料、糖料、烟草、麻类；花卉、茶叶、热带作物、药材；制种去雄授粉和种子分级加工；设施工厂化各物种差异 |
| 02 林业 | partial | forest-restoration | 林草种苗繁育；生产性伐木、打枝、造材与集材；森林抚育间伐、巡护及防火；竹材、非木林产品采集；不同地形和树种造林；公园绿化不自动归本类 |
| 03 畜牧业 | partial | pig-husbandry、dairy-milking | 家畜配种繁殖、助产和仔畜护理；肉牛羊放牧饲养、剪毛；家禽育雏、肉禽出栏、蛋禽收蛋；禽苗孵化与种禽授精；养蜂养蚕等特种经济动物 |
| 04 渔业 | partial | pond-fish、pond-shrimp | 海洋与内陆合法捕捞；海上网箱、筏架、滩涂贝类养殖；海藻栽培与采收；水产苗种繁育完整流程；工厂化循环水系统；潜水设施维护及采捕 |
| 05 农林牧渔专业及辅助性活动 | partial-cross-reference | wheat-field、vegetable-seedling | 独立农机维修服务；独立植保、检疫与繁育服务；棉花、热带作物等初加工；林业专业辅助活动；水产品原料处理；农业生产废弃物收运处理的统计单位归属 |

### 小麦田间农机社会化服务

安徽小麦耕整、播种、植保、收获；干燥仓储只作为后续交接待单独拓展。

流程来源：cn-wheat-service-2024。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ag-wheat-field-001 | 准备 | 检查机具与地块作业条件 | 农机、田块、作物 → 已确认作业条件的服务单 | 机具状态和进出条件可核查 | source-backed | cn-occ-2022-draft#mechanization；cn-wheat-service-2024#requirements |
| cn-ag-wheat-field-002 | 准备 | 挂接小麦耕作机具 | 动力机械与配套农具 → 挂接并检查的机组 | 连接与防护经检查 | source-backed | cn-occ-2022-draft#mechanization；cn-wheat-service-2024#requirements |
| cn-ag-wheat-field-003 | 准备 | 调整播种或收割参数并试作业 | 机组、种子或成熟麦株 → 试作业样段 | 参数和样段质量有记录 | source-backed | cn-occ-2022-draft#mechanization；cn-wheat-service-2024#requirements |
| cn-ag-wheat-field-004 | 作业 | 翻耕小麦田土壤 | 待耕田块 → 完成翻耕的土壤 | 耕深与翻垡符合委托要求 | source-backed | cn-occ-2022-draft#mechanization；cn-wheat-service-2024#requirements |
| cn-ag-wheat-field-005 | 作业 | 旋耕碎土平整小麦田 | 翻耕土壤 → 可播种土床 | 碎土和平整程度经检查 | source-backed | cn-occ-2022-draft#mechanization；cn-wheat-service-2024#requirements |
| cn-ag-wheat-field-006 | 作业 | 开通田间排灌沟道 | 田块沟线 → 贯通沟道 | 排灌路径畅通 | source-backed | cn-occ-2022-draft#mechanization；cn-wheat-service-2024#requirements |
| cn-ag-wheat-field-007 | 作业 | 处理小麦播前种子 | 原种和处理材料 → 可播种种子 | 种子批次和处理记录可查 | proposed | cn-occ-2022-draft#mechanization；cn-wheat-service-2024#requirements |
| cn-ag-wheat-field-008 | 作业 | 向田垄定量播入小麦种子 | 种子、田块、播种机 → 播入种子的田块 | 行距播深及漏播抽查记录完整 | source-backed | cn-occ-2022-draft#mechanization；cn-wheat-service-2024#requirements |
| cn-ag-wheat-field-009 | 作业 | 灌溉田间小麦 | 田块、水源、泵管 → 完成灌溉的田块 | 供水覆盖与积水情况经检查 | source-backed | cn-occ-2022-draft#mechanization；cn-wheat-service-2024#requirements |
| cn-ag-wheat-field-010 | 作业 | 向小麦施用批准的肥料 | 肥料、作物、施肥机 → 完成施肥的地块 | 施用材料与作业记录一致 | source-backed | cn-occ-2022-draft#mechanization；cn-wheat-service-2024#requirements |
| cn-ag-wheat-field-011 | 作业 | 对小麦病虫地块执行防治 | 批准方案、药械或物理工具 → 完成防治的地块 | 范围与作业条件有记录 | source-backed | cn-occ-2022-draft#mechanization；cn-wheat-service-2024#requirements |
| cn-ag-wheat-field-012 | 作业 | 收割并脱粒成熟小麦 | 成熟麦株、收割机 → 分离麦粒与秸秆 | 收获损失和杂质抽查可验 | source-backed | cn-occ-2022-draft#mechanization；cn-wheat-service-2024#requirements |
| cn-ag-wheat-field-013 | 作业 | 处理小麦秸秆并还田或归集 | 收获后秸秆 → 还田秸秆或归集料 | 处置方式符合地块委托要求 | proposed | cn-occ-2022-draft#mechanization；cn-wheat-service-2024#requirements |
| cn-ag-wheat-field-014 | 交接 | 将麦粒转交指定接收方 | 机仓麦粒、接收容器 → 带批次的粮食交接单 | 批次重量及双方确认可查 | proposed | cn-occ-2022-draft#mechanization；cn-wheat-service-2024#requirements |
| cn-ag-wheat-field-015 | 检测 | 抽查小麦农机作业质量 | 作业田块和试样 → 质量检查记录 | 检查点和不合格项可复核 | source-backed | cn-occ-2022-draft#mechanization；cn-wheat-service-2024#requirements |
| cn-ag-wheat-field-016 | 异常 | 诊断并排除农机运转故障 | 停机设备与故障信息 → 故障处置记录 | 试运行满足恢复作业条件 | source-backed | cn-occ-2022-draft#mechanization；cn-wheat-service-2024#requirements |
| cn-ag-wheat-field-017 | 返工 | 修正已确认的漏播或漏耕区域 | 不合格作业区 → 修正后的地块 | 复查记录确认问题关闭 | proposed | cn-occ-2022-draft#mechanization |
| cn-ag-wheat-field-018 | 清洁维护 | 清理和保养农机作业机构 | 作业后的农机 → 清洁保养后的农机 | 检查表与保养记录完整 | source-backed | cn-occ-2022-draft#mechanization；cn-wheat-service-2024#requirements |
| cn-ag-wheat-field-019 | 交付 | 提交田块作业结果与验收资料 | 作业量、质量和服务记录 → 服务验收包 | 委托方可核对作业范围 | proposed | cn-occ-2022-draft#mechanization |

阶段缺口：

- 播前处理、秸秆处置的职业引用需补录农艺工 locator；暂作 proposed。
- 机械收获与脱粒是否独立核算须按机型及承包方式复核；当前作为一次联合作业，不能再计设备内部自动步骤。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 蔬菜穴盘育苗与苗木出圃

蔬菜种苗繁育；同一批苗由育苗场交到种植场，移栽动作归后续场景。

流程来源：cn-vegetable-2021。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ag-vegetable-seedling-001 | 准备 | 检验并选取蔬菜繁殖材料 | 种子或接穗砧木 → 合格繁殖材料批次 | 品种来源和外观可核对 | source-backed | cn-occ-2022-draft#seedling；cn-vegetable-2021#grow |
| cn-ag-vegetable-seedling-002 | 准备 | 清洁消毒育苗设施和容器 | 苗床、穴盘、工具 → 可投入育苗的器具 | 洗消记录及洁净状况可查 | source-backed | cn-occ-2022-draft#seedling；cn-vegetable-2021#grow |
| cn-ag-vegetable-seedling-003 | 准备 | 配制并填装育苗基质 | 基质原料、穴盘 → 填充穴盘 | 装填一致且可追溯 | source-backed | cn-occ-2022-draft#seedling；cn-vegetable-2021#grow |
| cn-ag-vegetable-seedling-004 | 作业 | 向穴盘播入蔬菜种子 | 填充穴盘与种子 → 播种穴盘 | 播种位置和漏播可检查 | source-backed | cn-occ-2022-draft#seedling；cn-vegetable-2021#grow |
| cn-ag-vegetable-seedling-005 | 作业 | 调节育苗棚温湿度与光照 | 苗盘、环境设施 → 按苗龄控制的环境 | 环境和调节记录对应 | source-backed | cn-occ-2022-draft#seedling；cn-vegetable-2021#grow |
| cn-ag-vegetable-seedling-006 | 作业 | 向蔬菜幼苗供水供肥 | 幼苗、水肥及管路 → 完成灌溉施肥的苗盘 | 供给均匀并有批次记录 | source-backed | cn-occ-2022-draft#seedling；cn-vegetable-2021#grow |
| cn-ag-vegetable-seedling-007 | 作业 | 对出圃前菜苗实施炼苗 | 已育成菜苗 → 经适应处理的菜苗 | 炼苗状态经检查 | source-backed | cn-occ-2022-draft#seedling；cn-vegetable-2021#abnormal |
| cn-ag-vegetable-seedling-008 | 检测 | 检查菜苗出圃质量 | 待出圃苗盘 → 质量分选记录 | 弱苗病苗与合格苗区分 | source-backed | cn-occ-2022-draft#seedling；cn-vegetable-2021#grow |
| cn-ag-vegetable-seedling-009 | 异常 | 隔离并处理异常苗盘 | 病弱或污染苗盘 → 隔离标识与处置单 | 异常苗不混入出圃批次 | proposed | cn-occ-2022-draft#seedling |
| cn-ag-vegetable-seedling-010 | 交接 | 包装并移交合格菜苗 | 合格苗与包装材料 → 已标识苗批 | 品种数量和完整性可核对 | source-backed | cn-occ-2022-draft#seedling；cn-vegetable-2021#grow |

阶段缺口：返工、清洁维护、交付

- 扦插、嫁接与组织培养尚未分品种展开。
- 当前流程源提供育苗机械化要求，对包装、防病和弱苗返工细节支持不足。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 设施果菜种植与分次采摘

番茄、黄瓜、辣椒等果菜的设施内种植管理；育苗在前场景，采后只到集果箱交接。

流程来源：cn-vegetable-2021。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ag-vegetable-fruiting-001 | 准备 | 清除前茬秸秆与残膜 | 带前茬残留物的棚地 → 清理后的种植地 | 可见残留物处理到位 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#prepare |
| cn-ag-vegetable-fruiting-002 | 准备 | 撒施基肥并整平棚地 | 棚地与基肥 → 备耕棚地 | 撒施分布与整地结果可检查 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#prepare |
| cn-ag-vegetable-fruiting-003 | 作业 | 开沟起垄并铺设地膜 | 整理土床、地膜 → 覆盖种植垄 | 垄形与膜边固定经检查 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#prepare |
| cn-ag-vegetable-fruiting-004 | 交接 | 接收并核对果菜种苗 | 苗批和种植计划 → 待栽合格苗 | 品种数量与计划一致 | proposed | cn-occ-2022-draft#horticulture |
| cn-ag-vegetable-fruiting-005 | 作业 | 将果菜苗栽入指定穴位 | 果菜苗与栽植垄 → 定植果菜苗 | 栽植位置深度及苗体经检查 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#grow |
| cn-ag-vegetable-fruiting-006 | 作业 | 配置支架并绑扶果菜藤蔓 | 生长藤蔓、支架、绑带 → 固定藤蔓 | 固定稳定且无明显勒伤 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#grow |
| cn-ag-vegetable-fruiting-007 | 作业 | 修除果菜侧枝与指定叶片 | 果菜植株与修剪工具 → 调整后的植株 | 按植株整形要求留枝留叶 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#grow |
| cn-ag-vegetable-fruiting-008 | 作业 | 疏除多余花果 | 花果与疏果方案 → 保留目标负载的植株 | 保留数量和果位可检查 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#grow |
| cn-ag-vegetable-fruiting-009 | 作业 | 向果菜灌溉并追肥 | 植株、水肥、滴灌系统 → 完成水肥供给的植株 | 水肥记录对应地块 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#grow |
| cn-ag-vegetable-fruiting-010 | 作业 | 调整棚室温湿度与光照 | 棚室、环控设施 → 适应作物的棚内环境 | 观察值和设备状态可核对 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#grow |
| cn-ag-vegetable-fruiting-011 | 检测 | 巡查植株病虫和成熟状况 | 在田果菜 → 病虫与成熟检查记录 | 异常位置和可采批次清晰 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#grow |
| cn-ag-vegetable-fruiting-012 | 作业 | 采摘达到条件的果菜 | 成熟果实与采收容器 → 未明显损伤的采收果 | 果实成熟和损伤情况可检查 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#harvest |
| cn-ag-vegetable-fruiting-013 | 交接 | 将采收果输送至集果箱 | 采收果、输送设备、果箱 → 分批集果箱 | 果箱批次与采区一致 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#harvest |
| cn-ag-vegetable-fruiting-014 | 异常 | 清除病叶病株并隔离处置 | 已识别病株病叶 → 清除记录与隔离物 | 异常物不残留种植区 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#grow |
| cn-ag-vegetable-fruiting-015 | 异常 | 加固棚体并执行风雪排险 | 棚架、覆盖物和天气预警 → 完成排险的棚体 | 危险点处理或受控记录完整 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#abnormal |
| cn-ag-vegetable-fruiting-016 | 清洁维护 | 维护果菜修剪与环控器具 | 工具、风机、卷帘等 → 经检查的器具 | 保养记录可查 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#grow |
| cn-ag-vegetable-fruiting-017 | 交付 | 移交已分批集装果菜 | 集果箱和批次资料 → 发运交接批次 | 数量质量条件双方可确认 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#harvest |

阶段缺口：返工

- 花朵授粉、落蔓和植株更换需按具体品种另补流程源；不能由本场景代表全部设施园艺。
- 返工常是重新绑蔓/补栽，尚缺可验证作业依据。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 露地叶菜直播与一次采收

成熟度适于一次收获的茎叶菜；和分次果菜采摘分开。

流程来源：cn-vegetable-2021。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ag-vegetable-leafy-001 | 准备 | 清理叶菜田前茬残留 | 前茬残留与田块 → 清洁田块 | 残留处置可验 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#prepare |
| cn-ag-vegetable-leafy-002 | 作业 | 旋耕并整平叶菜播种床 | 田块与旋耕机 → 细碎平整土床 | 土床状态可抽查 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#prepare |
| cn-ag-vegetable-leafy-003 | 准备 | 调整叶菜播种机株行距和播深 | 播种机与作物方案 → 设定参数的播种机 | 试播结果符合方案 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#grow |
| cn-ag-vegetable-leafy-004 | 作业 | 向土床直播叶菜种子 | 种子、播种机、土床 → 播种地块 | 漏播重播和粒距可抽查 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#grow |
| cn-ag-vegetable-leafy-005 | 检测 | 观察播种机下种连续性 | 运行中的排种器 → 观察记录 | 故障或漏播位置可追踪 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#grow |
| cn-ag-vegetable-leafy-006 | 异常 | 停止并修复异常排种 | 停机排种器与异常记录 → 恢复排种的设备 | 试播复核后可继续 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#grow |
| cn-ag-vegetable-leafy-007 | 作业 | 按长势供水施肥 | 叶菜、水肥、喷滴灌装置 → 完成管理的叶菜田 | 投入品和施用区可核对 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#grow |
| cn-ag-vegetable-leafy-008 | 检测 | 检查叶菜群体采收条件 | 待收叶菜田 → 采收批次判定 | 成熟一致性有检查依据 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#harvest |
| cn-ag-vegetable-leafy-009 | 作业 | 切割并收集成熟叶菜 | 成熟叶菜与割刀式机具 → 输送中的叶菜 | 切割位置与损伤可检查 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#harvest |
| cn-ag-vegetable-leafy-010 | 交接 | 将收获叶菜装入周转箱 | 叶菜与周转箱 → 待运菜箱 | 装箱量和批次可核对 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#harvest |
| cn-ag-vegetable-leafy-011 | 异常 | 排除叶菜田积水 | 淹水田块与排水设备 → 排水后的田块 | 沟渠畅通及积水退去可查 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#abnormal |
| cn-ag-vegetable-leafy-012 | 清洁维护 | 清理收菜刀具及输送机构 | 收获机具 → 清洁保养后的机具 | 残留清理和运行检查记录可查 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#harvest |
| cn-ag-vegetable-leafy-013 | 交付 | 交付装箱叶菜至场边承运点 | 菜箱与运单 → 已点交的菜箱 | 数量批次和外观双方确认 | source-backed | cn-occ-2022-draft#horticulture；cn-vegetable-2021#harvest |

阶段缺口：返工

- 移栽型叶菜、分次叶片采摘、根茎菜挖收尚未覆盖。
- 跨田块重复作业仅用于差异研究，不直接累加为国家用工。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 苹果园秋季管理、分批采果与灾后恢复

环渤海湾及黄土高原苹果园秋季；果园外道路运输与深加工另属执行者行业。

流程来源：cn-apple-autumn-2023、cn-apple-summer-2022。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ag-apple-orchard-001 | 准备 | 刈割苹果园行间草被 | 果园草被与刈割器具 → 经管理的行间草被 | 行间作业和覆盖条件可查 | source-backed | cn-occ-2022-draft#horticulture；cn-apple-autumn-2023#soil |
| cn-ag-apple-orchard-002 | 作业 | 改良苹果树下土壤 | 待改良土壤和批准材料 → 完成改土的树盘 | 施用位置和材料有记录 | source-backed | cn-occ-2022-draft#horticulture；cn-apple-autumn-2023#soil |
| cn-ag-apple-orchard-003 | 作业 | 向苹果根区施用基肥 | 果树、肥料、施用工具 → 完成施肥的根区 | 树区与投入品记录对应 | source-backed | cn-occ-2022-draft#horticulture；cn-apple-autumn-2023#soil |
| cn-ag-apple-orchard-004 | 作业 | 疏除影响树形的苹果枝条 | 果树与修枝工具 → 符合树形方案的枝组 | 保留枝和剪口可复核 | source-backed | cn-occ-2022-draft#horticulture；cn-apple-autumn-2023#prune |
| cn-ag-apple-orchard-005 | 作业 | 拉枝固定苹果枝组 | 枝组与牵引材料 → 调整角度的枝组 | 枝位稳定且无明显损伤 | source-backed | cn-occ-2022-draft#horticulture；cn-apple-autumn-2023#prune |
| cn-ag-apple-orchard-006 | 作业 | 按成熟安排解除苹果套袋 | 套袋苹果 → 已摘袋的果实 | 摘袋批次与果面状态可查 | source-backed | cn-occ-2022-draft#horticulture；cn-apple-autumn-2023#fruit |
| cn-ag-apple-orchard-007 | 作业 | 调整苹果受光面与周边叶片 | 目标果实和遮挡叶片 → 调整受光的果实 | 不造成明显果枝损伤 | source-backed | cn-occ-2022-draft#horticulture；cn-apple-autumn-2023#fruit |
| cn-ag-apple-orchard-008 | 作业 | 铺设果园反光膜 | 树行地面与反光膜 → 铺设完成的反光面 | 位置和平整固定情况可查 | source-backed | cn-occ-2022-draft#horticulture；cn-apple-autumn-2023#fruit |
| cn-ag-apple-orchard-009 | 检测 | 判定苹果采收批次 | 待采苹果和成熟指标 → 可采果批清单 | 采收依据和地块对应 | source-backed | cn-occ-2022-draft#horticulture；cn-apple-autumn-2023#fruit |
| cn-ag-apple-orchard-010 | 作业 | 采下符合条件的苹果 | 成熟果实与采果容器 → 保持完整的采收苹果 | 果柄和果面损伤可检查 | source-backed | cn-occ-2022-draft#horticulture；cn-apple-autumn-2023#fruit |
| cn-ag-apple-orchard-011 | 交接 | 将苹果分批装入周转容器 | 采收苹果、容器与地块信息 → 标识苹果批次 | 品种地块与数量可追溯 | proposed | cn-occ-2022-draft#horticulture |
| cn-ag-apple-orchard-012 | 异常 | 排除受涝苹果园积水 | 涝水果园与排水工具 → 完成排水的果园 | 沟渠通畅且处置记录完整 | source-backed | cn-occ-2022-draft#horticulture；cn-apple-summer-2022#disaster |
| cn-ag-apple-orchard-013 | 返工 | 扶正受灾倾斜苹果树 | 倒伏果树与支撑材料 → 重新固定的果树 | 树体稳固并记录伤损 | source-backed | cn-occ-2022-draft#horticulture；cn-apple-summer-2022#disaster |
| cn-ag-apple-orchard-014 | 异常 | 清理雹伤苹果及折损枝条 | 受损果枝 → 分类处置的受损物 | 树上异常与地面残留可查 | source-backed | cn-occ-2022-draft#horticulture；cn-apple-summer-2022#disaster |
| cn-ag-apple-orchard-015 | 清洁维护 | 收集病残枝叶并清理作业器具 | 病残枝叶及采剪器具 → 清理场地和保养器具 | 病残物去向和器具状态可查 | source-backed | cn-occ-2022-draft#horticulture；cn-apple-autumn-2023#health |
| cn-ag-apple-orchard-016 | 交付 | 核交采收苹果批次 | 待运苹果批次 → 点交记录 | 数量与质量异议有记录 | proposed | cn-occ-2022-draft#horticulture |

阶段缺口：

- 苹果春季授粉、疏花疏果与套袋未被秋季资料完整覆盖，须另建春季场景。
- 绑扶、清理的动作组合是否能独立验收，需访谈再细分；目前不用于估算工时。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 食用菌菌棒制作、接种及培养管理

山东夏季袋栽菌棒，分清熟料灭菌与发酵料路线；当前以熟料菌袋为主。

流程来源：cn-mushroom-2026、cn-mushroom-hygiene-2023。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ag-mushroom-bags-001 | 准备 | 检查并防潮储放菌袋原料 | 基质原料与库房 → 受控储存的原料 | 霉变和受潮批次分开 | source-backed | cn-occ-2022-draft#mushroom；cn-mushroom-2026#bags |
| cn-ag-mushroom-bags-002 | 准备 | 清理消毒菌棒接种空间与器具 | 接种室、台面、器具 → 可接种的环境 | 消毒与使用记录可查 | source-backed | cn-occ-2022-draft#mushroom；cn-mushroom-hygiene-2023#contamination |
| cn-ag-mushroom-bags-003 | 作业 | 粉碎并配制食用菌培养料 | 原辅料、清水、搅拌装置 → 均匀培养料 | 配比和含水情况可检查 | source-backed | cn-occ-2022-draft#mushroom；cn-mushroom-2026#bags |
| cn-ag-mushroom-bags-004 | 作业 | 向菌袋定量填装培养料 | 培养料与袋材 → 填装菌袋 | 袋体完整且装量可复核 | source-backed | cn-occ-2022-draft#mushroom；cn-mushroom-2026#bags |
| cn-ag-mushroom-bags-005 | 作业 | 对装料菌袋执行灭菌 | 填装菌袋与灭菌设施 → 完成灭菌的菌袋批次 | 工艺过程记录可核对 | source-backed | cn-occ-2022-draft#mushroom；cn-mushroom-2026#bags |
| cn-ag-mushroom-bags-006 | 交接 | 将灭菌菌袋送入受控冷却区 | 热菌袋、冷却设施 → 待接种冷却菌袋 | 批次清楚且污染防护完整 | source-backed | cn-occ-2022-draft#mushroom；cn-mushroom-hygiene-2023#contamination |
| cn-ag-mushroom-bags-007 | 作业 | 向菌袋接入目标菌种 | 冷却菌袋、菌种、接种工具 → 接种菌袋 | 菌种批次与接种记录对应 | source-backed | cn-occ-2022-draft#mushroom；cn-mushroom-hygiene-2023#contamination |
| cn-ag-mushroom-bags-008 | 交接 | 将接种菌袋移入培养位置 | 已接种菌袋、培养架 → 定位培养批次 | 架位和菌袋批次可追溯 | source-backed | cn-occ-2022-draft#mushroom；cn-mushroom-hygiene-2023#contamination |
| cn-ag-mushroom-bags-009 | 作业 | 调节菌棒培养温湿度和通风 | 培养菌袋和环境设施 → 受控培养环境 | 环境异常与调节可追溯 | source-backed | cn-occ-2022-draft#mushroom；cn-mushroom-2026#facility |
| cn-ag-mushroom-bags-010 | 作业 | 补充菌棒培养所需水分 | 菌棒、清水、补水工具 → 完成补水的菌棒 | 方法与菌种阶段匹配 | source-backed | cn-occ-2022-draft#mushroom；cn-mushroom-hygiene-2023#pests |
| cn-ag-mushroom-bags-011 | 检测 | 检查菌棒发菌与污染状况 | 培养菌袋 → 批次生长检查记录 | 污染或异常位置可定位 | source-backed | cn-occ-2022-draft#mushroom；cn-mushroom-hygiene-2023#contamination |
| cn-ag-mushroom-bags-012 | 异常 | 隔离受污染菌棒 | 污染菌袋和隔离容器 → 隔离待处置菌棒 | 异常批次不回流正常生产 | proposed | cn-occ-2022-draft#mushroom |
| cn-ag-mushroom-bags-013 | 作业 | 采收达到条件的食用菌子实体 | 成熟子实体与容器 → 采收鲜菇 | 损伤和成熟状态可检查 | source-backed | cn-occ-2022-draft#mushroom |
| cn-ag-mushroom-bags-014 | 交付 | 整理并保鲜交付鲜菇 | 鲜菇与保鲜容器 → 可追溯鲜菇批次 | 质量和移交时间可核对 | proposed | cn-occ-2022-draft#mushroom |
| cn-ag-mushroom-bags-015 | 异常 | 加固菌棚并疏通排水沟 | 菌棚与堵塞沟道 → 完成防汛处置的设施 | 棚体风险和水路检查完成 | source-backed | cn-occ-2022-draft#mushroom；cn-mushroom-2026#facility |
| cn-ag-mushroom-bags-016 | 清洁维护 | 清理更换防虫设施 | 防虫网、粘板、诱虫装置 → 可用防虫设施 | 破损和污染状态经检查 | source-backed | cn-occ-2022-draft#mushroom；cn-mushroom-hygiene-2023#pests |

阶段缺口：返工

- 母种原种培养和菌种保藏尚需专门规范，不能由制包接种替代。
- 食用菌采收、菌渣回收、冷藏与异常菌包销毁需补充品种专用流程源。
- 本清单不记录灭菌温度、时长或药剂使用建议；须按具体菌種及设备验证。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 受损林地整地、补种与植被恢复

云南恢复植被和林业生产条件场景；不把受损林地恢复代表全国营造林。

流程来源：cn-forest-restoration-2021。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ag-forest-restoration-001 | 准备 | 调查恢复地块立地条件 | 受损林地与调查器具 → 地块现状记录 | 土壤坡面与植被现状可复核 | source-backed | cn-occ-2022-draft#forestry；cn-forest-restoration-2021#land |
| cn-ag-forest-restoration-002 | 准备 | 核对拟种植苗木与恢复方案 | 苗木和恢复设计 → 核准苗木批次 | 树种与地块方案相符 | source-backed | cn-occ-2022-draft#forestry；cn-forest-restoration-2021#plant |
| cn-ag-forest-restoration-003 | 作业 | 清理恢复地块并整理栽植位置 | 受损林地与作业工具 → 可栽植地块 | 范围与原有植被保护情况可查 | source-backed | cn-occ-2022-draft#forestry；cn-forest-restoration-2021#land |
| cn-ag-forest-restoration-004 | 作业 | 回填并压实需恢复的土层 | 回填土和恢复区 → 恢复土层 | 土层和坡面符合设计验收项 | source-backed | cn-occ-2022-draft#forestry；cn-forest-restoration-2021#land |
| cn-ag-forest-restoration-005 | 作业 | 开挖苗木栽植穴 | 整备地块与工具 → 可栽植穴位 | 位置尺寸按设计检查 | source-backed | cn-occ-2022-draft#forestry；cn-forest-restoration-2021#plant |
| cn-ag-forest-restoration-006 | 交接 | 运入并点交待栽苗木 | 合格苗木与包装 → 现场点交苗木 | 树种数量及失水损伤可查 | proposed | cn-occ-2022-draft#forestry |
| cn-ag-forest-restoration-007 | 作业 | 将苗木栽入恢复地块 | 穴位、苗木和覆土 → 完成栽植的苗木 | 栽植姿态和覆土符合设计 | source-backed | cn-occ-2022-draft#forestry；cn-forest-restoration-2021#plant |
| cn-ag-forest-restoration-008 | 作业 | 对幼林除草松土及补充水肥 | 幼林、杂草、水肥 → 完成抚育的幼林地 | 作业范围与苗木损伤可查 | source-backed | cn-occ-2022-draft#forestry |
| cn-ag-forest-restoration-009 | 检测 | 调查苗木成活与保存情况 | 已造林地块和样地 → 成活保存调查记录 | 样地位置和苗木状态可追溯 | source-backed | cn-occ-2022-draft#forestry；cn-forest-restoration-2021#accept |
| cn-ag-forest-restoration-010 | 返工 | 在缺株位置补植苗木 | 缺株点、补植苗木 → 补植完成地块 | 补植范围及复查记录完整 | source-backed | cn-occ-2022-draft#forestry；cn-forest-restoration-2021#accept |
| cn-ag-forest-restoration-011 | 清洁维护 | 清理恢复现场施工残留 | 施工残留与恢复地块 → 清理后的林地 | 残留物去向可核对 | source-backed | cn-occ-2022-draft#forestry |
| cn-ag-forest-restoration-012 | 交付 | 提交植被恢复验收记录 | 恢复地块和调查资料 → 可复核验收资料 | 位置面积与保存情况一致 | source-backed | cn-occ-2022-draft#forestry；cn-forest-restoration-2021#accept |

阶段缺口：异常

- 该源适用效力与 2026 最新替代规范需再核；旧 2002 造林暂行办法未作为现行规范采用。
- 苗圃繁育、生产采伐、集材、森林巡护、灭火等尚未完成场景化流程双源。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 圈养生猪饲喂、巡检、防疫与转群

秋冬季猪场日常饲养与引种出猪接口；兽医专业诊治独立执行时按实际统计单位归属。

流程来源：cn-pig-health-2023。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ag-pig-husbandry-001 | 准备 | 检查饲料槽与供料状态 | 料槽、料斗、饲料 → 已检查供料系统 | 存料和故障状态可查 | source-backed | cn-occ-2022-draft#livestock；cn-pig-health-2023#husbandry |
| cn-ag-pig-husbandry-002 | 作业 | 向猪群供给配定饲料 | 饲料、供料设备、猪群 → 完成饲喂的猪群 | 饲料批次和供料记录可核对 | source-backed | cn-occ-2022-draft#livestock；cn-pig-health-2023#husbandry |
| cn-ag-pig-husbandry-003 | 作业 | 检查并恢复猪群饮水供给 | 储水桶、饮水嘴和供水管 → 正常供水系统 | 供水状态和故障记录可查 | source-backed | cn-occ-2022-draft#livestock；cn-pig-health-2023#husbandry |
| cn-ag-pig-husbandry-004 | 作业 | 调节猪舍温湿度和通风 | 猪舍、风机、保温设施 → 调整后的舍内环境 | 现场环境与调节记录对应 | source-backed | cn-occ-2022-draft#livestock；cn-pig-health-2023#husbandry |
| cn-ag-pig-husbandry-005 | 检测 | 逐栏观察猪只临床表现 | 猪群和观察表 → 临床巡查记录 | 异常猪只与栏位可定位 | source-backed | cn-occ-2022-draft#livestock；cn-pig-health-2023#inspection |
| cn-ag-pig-husbandry-006 | 异常 | 将异常猪只移入隔离栏 | 已识别病猪和隔离栏 → 隔离猪只 | 身份栏位及转入时间可追溯 | source-backed | cn-occ-2022-draft#livestock；cn-pig-health-2023#inspection |
| cn-ag-pig-husbandry-007 | 检测 | 协助采集并移交猪只检测样本 | 指定猪只与采样材料 → 编号检测样本 | 样本身份和交接链一致 | source-backed | cn-occ-2022-draft#livestock；cn-pig-health-2023#inspection |
| cn-ag-pig-husbandry-008 | 准备 | 按保存要求接收与储放疫苗 | 疫苗和冷藏设施 → 可核对疫苗批次 | 冷链与有效期检查可查 | source-backed | cn-occ-2022-draft#livestock；cn-pig-health-2023#immunization |
| cn-ag-pig-husbandry-009 | 作业 | 协助固定猪只并实施免疫 | 猪只、批准疫苗与针具 → 完成免疫的猪只记录 | 个体和免疫批次对应 | source-backed | cn-occ-2022-draft#livestock；cn-pig-health-2023#immunization |
| cn-ag-pig-husbandry-010 | 交接 | 核查引入猪只并转入隔离区 | 引种猪只和检测记录 → 隔离观察猪群 | 来源个体与健康记录一致 | source-backed | cn-occ-2022-draft#livestock；cn-pig-health-2023#transfer |
| cn-ag-pig-husbandry-011 | 交接 | 将获准猪群按批次转栏或出猪 | 核准猪群、通道、接收方 → 转出转入记录 | 猪只数量身份及去向一致 | source-backed | cn-occ-2022-draft#livestock；cn-pig-health-2023#transfer |
| cn-ag-pig-husbandry-012 | 清洁维护 | 移除猪舍粪便与尿液 | 猪舍粪尿和收集设施 → 清理后的圈舍 | 粪污收集去向明确 | source-backed | cn-occ-2022-draft#livestock；cn-pig-health-2023#husbandry |
| cn-ag-pig-husbandry-013 | 清洁维护 | 拆洗消毒猪舍饮水组件 | 饮水嘴接头与清洗材料 → 清洁复装饮水组件 | 清洗和复装检查可查 | source-backed | cn-occ-2022-draft#livestock；cn-pig-health-2023#husbandry |
| cn-ag-pig-husbandry-014 | 清洁维护 | 按流程清洗消毒进出车辆 | 指定车辆、洗消设施 → 洗消车辆记录 | 流程各步及检测结果可核对 | source-backed | cn-occ-2022-draft#livestock；cn-pig-health-2023#transfer |
| cn-ag-pig-husbandry-015 | 清洁维护 | 清洗消毒猪舍与周转器具 | 猪舍、器具与消毒物料 → 完成洗消的设施 | 使用和洗消记录可查 | source-backed | cn-occ-2022-draft#livestock；cn-pig-health-2023#hygiene |
| cn-ag-pig-husbandry-016 | 异常 | 归集并移交病死猪及污染物 | 病死猪、污染物、专用容器 → 无害化处置交接记录 | 身份数量去向可追溯 | source-backed | cn-occ-2022-draft#livestock；cn-pig-health-2023#hygiene |
| cn-ag-pig-husbandry-017 | 交付 | 交付猪群健康与饲养记录 | 栏位、饲养和转移记录 → 班次与出栏资料 | 记录可对应实际猪群 | source-backed | cn-occ-2022-draft#livestock；cn-pig-health-2023#inspection |

阶段缺口：返工

- 免疫、采样等必须由相应合格人员按实际专业分工执行；此处不提供诊疗药物方案。
- 分娩、仔猪护理、采精、授精、发情鉴定尚需独立繁育规程。
- 病死猪生产端归集与独立处理厂处置不得重复计数。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 奶牛入厅、机械挤奶与生鲜乳交接

牧场自营机械挤奶；独立收购站实际行业属性需核查，不能因职业同名直接划入牧业。

流程来源：cn-milk-station-2009。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ag-dairy-milking-001 | 准备 | 检查挤奶真空和奶杯组件 | 挤奶设备与检查表 → 经检查挤奶设备 | 漏气破损和读数异常有记录 | source-backed | cn-occ-2022-draft#livestock；cn-milk-station-2009#equipment |
| cn-ag-dairy-milking-002 | 检测 | 筛查奶牛入厅挤奶资格 | 牛只健康用药记录 → 获准和隔离名单 | 奶牛身份及限制原因可核对 | source-backed | cn-occ-2022-draft#livestock；cn-milk-station-2009#milking |
| cn-ag-dairy-milking-003 | 交接 | 引导获准奶牛进入待挤位 | 获准奶牛、通道、栏位 → 定位待挤奶牛 | 牛位与牛只身份匹配 | source-backed | cn-occ-2022-draft#livestock；cn-milk-station-2009#milking |
| cn-ag-dairy-milking-004 | 作业 | 清洁消毒并擦干奶牛乳头 | 乳头、清洁材料 → 备挤乳头 | 清洁步骤和材料使用可查 | source-backed | cn-occ-2022-draft#livestock；cn-milk-station-2009#milking |
| cn-ag-dairy-milking-005 | 检测 | 挤取前奶并检查异常 | 前奶与专用检查容器 → 前奶检查结果 | 异常牛只可追溯 | source-backed | cn-occ-2022-draft#livestock；cn-milk-station-2009#milking |
| cn-ag-dairy-milking-006 | 异常 | 分开采集和存放异常乳 | 异常牛只与独立容器 → 隔离异常乳 | 不混入正常乳且有报告 | source-backed | cn-occ-2022-draft#livestock；cn-milk-station-2009#milking |
| cn-ag-dairy-milking-007 | 作业 | 将奶杯套接奶牛乳头 | 备挤牛只和奶杯 → 稳定套接奶杯组 | 杯位和漏气经观察 | source-backed | cn-occ-2022-draft#livestock；cn-milk-station-2009#milking |
| cn-ag-dairy-milking-008 | 检测 | 观察挤奶真空与奶流 | 工作杯组和奶流 → 挤奶过程检查记录 | 异常位置和牛只可定位 | source-backed | cn-occ-2022-draft#livestock；cn-milk-station-2009#milking |
| cn-ag-dairy-milking-009 | 返工 | 重新调整偏位挤奶杯组 | 偏位奶杯组 → 调整后杯组 | 奶流与真空恢复稳定 | source-backed | cn-occ-2022-draft#livestock；cn-milk-station-2009#milking |
| cn-ag-dairy-milking-010 | 作业 | 关闭真空后移除奶杯 | 挤奶结束牛只与杯组 → 完成脱杯的牛只 | 移杯顺序和乳头状态可查 | source-backed | cn-occ-2022-draft#livestock；cn-milk-station-2009#milking |
| cn-ag-dairy-milking-011 | 作业 | 对挤后乳头进行药浴处理 | 完成挤奶牛只和专用材料 → 完成后处理的牛只 | 处理记录可对应牛只 | source-backed | cn-occ-2022-draft#livestock；cn-milk-station-2009#milking |
| cn-ag-dairy-milking-012 | 作业 | 将生鲜乳密闭冷却储存 | 生鲜乳、冷却储罐 → 受控冷藏乳批 | 温度时间与批次记录可查 | source-backed | cn-occ-2022-draft#livestock；cn-milk-station-2009#milking |
| cn-ag-dairy-milking-013 | 检测 | 采样编号并检查生鲜乳 | 待交乳批和样品容器 → 可追溯样品及检测记录 | 样品编号对应乳批 | proposed | cn-occ-2022-draft#livestock；cn-milk-station-2009#test |
| cn-ag-dairy-milking-014 | 交付 | 将合格乳批封罐交付承运方 | 合格乳、运输罐和交接单 → 已封识乳罐 | 封识批次与数量记录一致 | source-backed | cn-occ-2022-draft#livestock；cn-milk-station-2009#clean |
| cn-ag-dairy-milking-015 | 清洁维护 | 清洗消毒挤奶管罐并排净残水 | 使用后的杯组管路和奶罐 → 完成洗消的乳接触面 | 清洗过程与排水记录完整 | source-backed | cn-occ-2022-draft#livestock；cn-milk-station-2009#clean |
| cn-ag-dairy-milking-016 | 清洁维护 | 更换破损内衬并检查密封 | 异常杯组和替换件 → 恢复完整的杯组 | 复查无明显泄漏 | source-backed | cn-occ-2022-draft#livestock；cn-milk-station-2009#equipment |

阶段缺口：

- 2009 原规范被 2022 官方转载，但不能称 2026 最新规范；需核对替代版本。
- 挤奶人工分钟数、牛只干预频率、机器人残留人工均未研究。
- 牛只引导、乳样化验及设备维修的职业双路径需更细标准补足。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 池塘鱼类养殖、巡塘及起捕交接

淡水池塘鱼类；不将鱼类水质和病害要求套用虾蟹或海洋网箱。

流程来源：cn-aquaculture-summer-2023。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ag-pond-fish-001 | 准备 | 清理消毒放苗池塘 | 待放苗池塘与清塘工具 → 清整后的池塘 | 清塘消毒及放苗条件可查 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#fish |
| cn-ag-pond-fish-002 | 交接 | 接收并放入鱼苗批次 | 鱼苗袋箱和池塘 → 入池鱼苗记录 | 苗种来源数量与池号对应 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#fish |
| cn-ag-pond-fish-003 | 作业 | 将规格分化的鱼苗分池 | 待分级鱼苗、网具、目标池 → 分池鱼苗 | 批次池号与转移情况可追溯 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#fish |
| cn-ag-pond-fish-004 | 检测 | 采测池塘水质指标 | 池水和测量器具 → 水质检查记录 | 样点时间和仪器记录完整 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#fish |
| cn-ag-pond-fish-005 | 作业 | 按池塘状态调控供水和增氧 | 池水、进排水和增氧设施 → 调整后的养殖水体 | 水位和溶氧变化可复核 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#fish |
| cn-ag-pond-fish-006 | 准备 | 检查并配取鱼类饲料 | 饲料批次和称量工具 → 待投饵料 | 品质和数量可核对 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#fish |
| cn-ag-pond-fish-007 | 作业 | 向养殖鱼投喂饵料 | 待投饵料和投饵装置 → 投饵记录 | 池号投喂量和摄食状况对应 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#fish |
| cn-ag-pond-fish-008 | 检测 | 巡查鱼群摄食和异常行为 | 池塘鱼群和观察表 → 巡塘记录 | 异常池号和症状可定位 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#disease |
| cn-ag-pond-fish-009 | 异常 | 送检疑似患病鱼样 | 指定鱼样和采样材料 → 可追溯检测样本 | 样品与池塘批次一致 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#disease |
| cn-ag-pond-fish-010 | 异常 | 捞出并隔离病死鱼 | 病死鱼、专用捞具和容器 → 隔离待处置物 | 数量和去向可追溯 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#disease |
| cn-ag-pond-fish-011 | 作业 | 起捕获准上市的养殖鱼 | 可捕鱼群和网具 → 已捕获鱼批 | 品种数量及损伤可检查 | source-backed | cn-occ-2022-draft#aquaculture |
| cn-ag-pond-fish-012 | 交付 | 将养殖鱼批点交接收方 | 鱼批、容器与交接单 → 完成点交鱼批 | 池号批次与数量一致 | proposed | cn-occ-2022-draft#aquaculture |
| cn-ag-pond-fish-013 | 清洁维护 | 清洗消毒跨池使用的器具 | 网具、容器和洗消材料 → 洗消后专用器具 | 不同健康区器具分开 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#disease |
| cn-ag-pond-fish-014 | 清洁维护 | 维护池塘增氧机和投饵设备 | 增氧机、投饵机和备件 → 保养后设备 | 运行和防护检查可查 | source-backed | cn-occ-2022-draft#aquaculture |
| cn-ag-pond-fish-015 | 异常 | 按确认方案处置异常水体及尾水 | 异常池水与尾水设施 → 处置与排放记录 | 与池号检测处置方案对应 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#disease |

阶段缺口：返工

- 鱼苗人工繁殖、鱼体注射、工厂化循环水、养殖尾水工程完整运行任务尚未展开。
- 公开指引中的疾病处置不作为通用当前药物操作建议；须先确诊并按现行要求执行。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 池塘虾蟹种苗选择、处理水、分级养殖与水草管理

池塘虾蟹，以对虾分级养殖和淡水虾蟹水草管理为两种有条件分支，不能推断所有池塘都用同一方式。

流程来源：cn-aquaculture-summer-2023。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ag-pond-shrimp-001 | 检测 | 核对虾蟹苗种病原检测 | 苗种批次和检测报告 → 苗种接收判定 | 样品批次和结果对应 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#shrimp |
| cn-ag-pond-shrimp-002 | 准备 | 检查加固虾蟹塘堤坝和水电设施 | 塘堤、供电、泵管 → 完成检查加固的设施 | 隐患清单有处置结果 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#shrimp |
| cn-ag-pond-shrimp-003 | 作业 | 将外源水送入一级处理池 | 外源水和一级蓄水池 → 处理中的水批 | 来源批次和处理记录可查 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#shrimp |
| cn-ag-pond-shrimp-004 | 作业 | 对一级池水消毒并沉淀 | 一级池水和批准处理材料 → 完成初次处理的水体 | 处理时序和检测可核对 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#shrimp |
| cn-ag-pond-shrimp-005 | 交接 | 将表层水转入二级池 | 初次处理水和二级池 → 二级处理水体 | 转移池号和时序一致 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#shrimp |
| cn-ag-pond-shrimp-006 | 作业 | 对二级池水处理并曝气 | 二级池水和曝气设施 → 待入养殖池水体 | 检测确认后方可转入 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#shrimp |
| cn-ag-pond-shrimp-007 | 作业 | 将获准种苗移入标粗或养殖池 | 合格苗种和目标池 → 入池苗种批次 | 池号批次与健康检查对应 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#shrimp |
| cn-ag-pond-shrimp-008 | 交接 | 将合格对虾分级转池 | 标粗或暂养虾、检测记录 → 下阶段养殖虾群 | 健康检查与目标池匹配 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#shrimp |
| cn-ag-pond-shrimp-009 | 检测 | 检查虾蟹生长与健康状态 | 养殖虾蟹和样本 → 生长健康检查记录 | 池号与异常可定位 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#shrimp |
| cn-ag-pond-shrimp-010 | 作业 | 按水质和阶段调整投饵 | 虾蟹饲料与投饵设施 → 完成投饵的虾蟹塘 | 投饵与养殖记录一致 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#shrimp |
| cn-ag-pond-shrimp-011 | 清洁维护 | 清理腐败水草并维护水草带 | 适用池塘水草和工具 → 恢复水草管理的池塘 | 腐败物清理范围可查 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#shrimp |
| cn-ag-pond-shrimp-012 | 作业 | 收获达到条件的虾蟹 | 养殖虾蟹与起捕器具 → 起捕产品批次 | 批次和损伤状态可核对 | source-backed | cn-occ-2022-draft#aquaculture |
| cn-ag-pond-shrimp-013 | 异常 | 阻断病原风险区器具混用 | 器具、健康区和洗消区 → 区隔后的器具与记录 | 器具归区和洗消可追溯 | source-backed | cn-occ-2022-draft#aquaculture；cn-aquaculture-summer-2023#disease |

阶段缺口：返工、交付

- 对虾三级养殖并非适用每个养殖场；当前仅作条件分支。
- 蟹类水草管理与对虾转池不是同一个完整生产流程，冻结前须拆成物种分支。
- 起捕、分选、活体装箱、尾水回用和返工条件的流程证据待补。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

## 工业

partial-inventory-in-progress

| 门类 | 状态 | 当前场景 | 未覆盖说明 |
| --- | --- | --- | --- |
| 06 煤炭开采和洗选业 | partial | cn-ind-coal-longwall | 未覆盖巷道掘进、钻爆、瓦斯通风防灭火、井下轨道和提升、露天矿、选煤；不得用本场景代表代码06全行业。；正常生产的返工与事故处置不同，尚未识别可独立核算的常规返工任务。；本门类其他子行业和作业场景仍待盘点；partial不表示覆盖率可量化。 |
| 07 石油和天然气开采业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 08 黑色金属矿采选业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 09 有色金属矿采选业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 10 非金属矿采选业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 11 开采专业及辅助性活动 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 12 其他采矿业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 13 农副食品加工业 | partial | cn-ind-feed-pellets、cn-ind-oil-pretreat-press、cn-ind-oil-solvent-extract、cn-ind-oil-refine-fill、cn-ind-fish-mince、cn-ind-fish-cure-dry、cn-ind-aquatic-refining | 谷物碾磨、淀粉、制糖、畜禽屠宰肉加工、蔬菜水果坚果、豆制品蛋品尚未展开；油种路线、水产精制产品与干熟制分支仍需细化；动作族不得与未来子动作重复计数；规范是工艺单元表；完整操作、质量验收、换线清洁和失败批处理仍需补证 |
| 14 食品制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 15 酒、饮料和精制茶制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 16 烟草制品业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 17 纺织业 | partially-covered | cn-ind-wool-preparation、cn-ind-cotton-spinning、cn-ind-warp-weaving、cn-ind-dye-pretreatment、cn-ind-textile-dyeing、cn-ind-textile-printing、cn-ind-textile-finishing | 蚕丝煮缫、麻纤维脱胶、化纤纯纺混纺、毛纺等具体差异未完整覆盖；经编纬编袜品横机、针刺水刺纺粘熔喷等非织造未展开；织物裁缝制成品、产业用纺织品、成衣水洗及功能性整理细目未完整展开；流程来源为生产单元规范，现场SOP和完整成品验收标准待补 |
| 18 纺织服装、服饰业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 19 皮革、毛皮、羽毛及其制品和制鞋业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 20 木材加工和木、竹、藤、棕、草制品业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 21 家具制造业 | partial | cn-ind-wood-furniture | 实木榫卯、定制板件异形、软体绷装、金属塑料竹藤玻璃家具仍分别待盘点。；生产单元表不支持声称所有工厂配置机械手或自动喷涂；机器人部署研究尚未开始。；本门类其他子行业和作业场景仍待盘点；partial不表示覆盖率可量化。 |
| 22 造纸和纸制品业 | partial | cn-ind-chemical-pulp、cn-ind-recovered-paper-pulp、cn-ind-machine-paper、cn-ind-paper-recovery、cn-ind-paper-box | 氧脱木素虽在流程表存在，职业稿未独立说明；具体加氧反应控制作为待补，不假设与漂白工时重复。；危险化学品接收、堵塞断料、蒸煮异常、洗网清洗和检维修待专项规程补证。；废纸接收解包、胶黏物控制、浮选废渣、脱墨污泥和设备清洗尚待原始规范。；纸机穿纸、断纸事故、毛毯网部清洗和设备保养需操作标准；不得把专线已列自动生产线推断为无人。；回收炉安全联锁、熔融物事故、蒸发器结垢清洗及检维修缺专项已读资料。；机器换纸接纸、调版换模、糊箱堵料、废纸分拣、清洁维护尚缺已读专门SOP。；本门类其他子行业和作业场景仍待盘点；partial不表示覆盖率可量化。 |
| 23 印刷和记录媒介复制业 | partial | cn-ind-print-prepress、cn-ind-print-sheet-offset、cn-ind-print-postfinish | 卷筒印刷、凹版柔版孔版数字印刷、实体滚筒制版、书刊装订与记录媒介复制未展开；制版及印后部分动作仍需按产品原子化；源为工艺单元规范而非完整现场SOP |
| 24 文教、工美、体育和娱乐用品制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 25 石油、煤炭及其他燃料加工业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 26 化学原料和化学制品制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 27 医药制造业 | partial | cn-ind-tablet-granulate-press、cn-ind-sterile-liquid-fill、cn-ind-drug-pack-trace、cn-ind-drug-water-cleanroom | 化学原料药、中药饮片中成药、生物药疫苗血液制品、兽药和药用辅料包装制造尚未展开；化学制剂仅部分片剂液体包装公辅单元；其他剂型、完整质量控制和偏差返工仍需正式GMP流程；所有药品场景仅盘点，不生成处方、生产参数或放行结论 |
| 28 化学纤维制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 29 橡胶和塑料制品业 | partially-covered | cn-ind-rubber-mixing-forming、cn-ind-tyre-retreading、cn-ind-plastic-compounding、cn-ind-plastic-extrusion、cn-ind-plastic-injection | 轮胎和胶管胶带零件成型目前仍有产品族汇总，必须继续原子化；乳胶浸渍医用制品未展开；塑料膜吹塑/流延/拉伸、泡沫、吹瓶容器、压延人造革、合成革及层压制品未展开；塑料挤注详细上下料、冷却脱模、修边、质量检验和包装流程多数仍proposed，未冻结 |
| 30 非金属矿物制品业 | partial | cn-ind-cement-rawmeal、cn-ind-cement-clinker、cn-ind-cement-grind-pack、cn-ind-flatglass-melt、cn-ind-floatglass-form、cn-ind-rolledglass-form | 陶瓷砖瓦卫生陶瓷、石灰石膏及制品、混凝土构件、玻纤与复合材料、耐火材料、石墨炭素和其他矿物材料未展开；水泥协同处置、玻璃深加工以及设备异常清理返修还需专项操作规范；配套矿山在排污许可证中的范围不能用于跨行业统计重复计数 |
| 31 黑色金属冶炼和压延加工业 | partial | cn-ind-steel-charge、cn-ind-steel-refine、cn-ind-steel-continuous-cast | 流程来源是2026已公布、2027实施的工序表，不能代替实际炼钢作业规程。；未取得废钢放射性、密闭物与含水检查的原始操作标准，未虚构其现场步骤或限值。；各炉型精炼分支按实际路线选择；不把LF、真空、喂线等假设为每炉必经。；不合格炉次补吹、改判、回炉的现场准则待补，暂未编造统一返工流程。；开浇准备、结晶器更换、漏钢处置和铸坯修磨需专项原始流程；不能把精整概称当作所有返工已识别。；本门类其他子行业和作业场景仍待盘点；partial不表示覆盖率可量化。 |
| 32 有色金属冶炼和压延加工业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 33 金属制品业 | partially-covered | cn-ind-sand-foundry | 压力/熔模/离心等特种铸造未展开；锻压冲切钣金、焊接、工具紧固件和金属结构制品制造未展开；热处理电镀涂层及其维护返修工序未完整覆盖 |
| 34 通用设备制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 35 专用设备制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 36 汽车制造业 | partial | cn-ind-auto-final-assembly | 汽车冲压白车身焊接、涂装、电池模组、发动机和变速器内部装配、商用车上装及再制造仍未完整盘点。；HJ流程表只证明有装配及检验单元，不能支持各车型力矩和劳动投入。；本门类其他子行业和作业场景仍待盘点；partial不表示覆盖率可量化。 |
| 37 铁路、船舶、航空航天和其他运输设备制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 38 电气机械和器材制造业 | partial | cn-ind-lithium-electrode、cn-ind-lithium-cell-finish、cn-ind-lead-battery-plate、cn-ind-lead-battery-assembly、cn-ind-thinfilm-solar | 电机、输配电控制、电线电缆及光缆、家电、照明和电工器材尚未展开；电池仅有锂离子、铅酸和薄膜太阳局部单元；镍氢锌锰等化学路线与晶硅光伏尚未展开；电池完整上下料装配检验异常清洁及模组PACK等还未取得足够已读流程 |
| 39 计算机、通信和其他电子设备制造业 | partial | cn-ind-pcb-fabrication | 尚缺钻污处理、棕化、化学配液槽液分析、独立电测、清洗用水和危险废物处理的详细人工作业规范。；步骤按单双多层和终饰路线选择；非所有订单必经同一工序，不能求和生成单板人工工时。；本门类其他子行业和作业场景仍待盘点；partial不表示覆盖率可量化。 |
| 40 仪器仪表制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 41 其他制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 42 废弃资源综合利用业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 43 金属制品、机械和设备修理业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 44 电力、热力生产和供应业 | partial | cn-ind-power-fuel、cn-ind-thermal-power-generation | 煤场自燃、粉尘防爆、采制化样、除铁、皮带撕裂等尚待专项规程；消防动作不能简化为一般清洁。；装置和控制系统的实际现场/远程劳动分工尚待核实；不得把有自动控制参数当作人工需求已消失。；启停并网是必要数字及设备操作；跨部门监护和许可细节待专项规程。；本门类其他子行业和作业场景仍待盘点；partial不表示覆盖率可量化。 |
| 45 燃气生产和供应业 | partial | cn-ind-lng-station、cn-ind-lpg-cylinder | 气化器运行、BOG回收、装卸脱开、置换放散和受限空间检修尚缺逐项原始流程；未把设计要求当作实际人工作业时间。；残液残气回收、超装倒气、阀门更换、气瓶搬运与返修须进一步核对许可边界和作业规范。；本门类其他子行业和作业场景仍待盘点；partial不表示覆盖率可量化。 |
| 46 水的生产和供应业 | partial | cn-ind-central-wastewater | 工艺分支因来水与排放要求选择；不把A/O、SBR、MBR及多种膜法当作同一厂全部必经。；清池、膜反洗化学清洗、污泥脱水运输、加药搬运、有限空间作业仍缺详细已读流程；工业废水职业不能自动代表全部城镇污水厂分工。；本门类其他子行业和作业场景仍待盘点；partial不表示覆盖率可量化。 |

### 井工煤矿综采工作面割煤、推溜与移架

代码06；限滚筒采煤机综采工作面，掘进、露天矿、选煤独立补充。煤矿自营内部运输计本行业，外包按执行单位另标。

流程来源：cn-coal-rule-2025。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-coal-longwall-001 | 准备 | 检查采煤机周围人员与障碍并发出开机预警 | 停机采煤机及现场 → 已确认的开机条件 | 危险区人员撤离且警示完成 | source-backed | cn-occ-2022-draft#coal-mining；cn-coal-rule-2025#miner |
| cn-ind-coal-longwall-002 | 准备 | 检查工作面顶板及支架支护状态 | 待割煤工作面 → 顶板支护确认记录 | 异常顶板与支护状态得到识别 | source-backed | cn-occ-2022-draft#coal-mining；cn-coal-rule-2025#longwall；cn-occ-2022-draft#coal-support |
| cn-ind-coal-longwall-003 | 作业 | 操纵滚筒割取工作面煤体 | 已支护煤壁 → 割落煤 | 采高及推进符合本工作面规程 | source-backed | cn-occ-2022-draft#coal-mining；cn-coal-rule-2025#miner |
| cn-ind-coal-longwall-004 | 作业 | 推移刮板输送机承接割落煤 | 已割煤区与输送机 → 推移后的输送机 | 煤壁输送机支架关系符合工作面要求 | source-backed | cn-occ-2022-draft#coal-mining；cn-coal-rule-2025#scraper |
| cn-ind-coal-longwall-005 | 作业 | 操纵液压支架跟机移架 | 割煤后待支护区 → 接顶支架 | 及时支护且接顶状态符合要求 | source-backed | cn-occ-2022-draft#coal-mining；cn-coal-rule-2025#longwall；cn-occ-2022-draft#coal-support |
| cn-ind-coal-longwall-006 | 检测 | 监测工作面矿压与支架状态 | 工作面监测数据与现场 → 矿压异常识别结果 | 异常情况可定位至作业区 | source-backed | cn-occ-2022-draft#coal-mining；cn-coal-rule-2025#longwall；cn-occ-2022-draft#coal-support |
| cn-ind-coal-longwall-007 | 异常 | 遇顶板破碎或空顶超限停止割煤并处理支护 | 破碎顶板或不安全间距 → 停止推进与处置确认 | 达到安全恢复条件后方可续作 | source-backed | cn-occ-2022-draft#coal-mining；cn-coal-rule-2025#longwall；cn-occ-2022-draft#coal-support |
| cn-ind-coal-longwall-008 | 异常 | 处置倒架歪架及压架 | 异常液压支架 → 恢复支护功能的支架 | 按专门措施处置且重新接顶 | source-backed | cn-occ-2022-draft#coal-mining；cn-coal-rule-2025#longwall |
| cn-ind-coal-longwall-009 | 清洁维护 | 停电闭锁采煤机及关联输送机后更换截齿 | 磨损截齿及隔离设备 → 更换完成的截齿 | 隔离确认且更换后可安全恢复 | source-backed | cn-occ-2022-draft#coal-mining；cn-coal-rule-2025#miner |
| cn-ind-coal-longwall-010 | 清洁维护 | 检查并维护刮板输送机液力偶合器 | 输送机液力偶合器 → 完好设备 | 保护件及工况符合规程要求 | source-backed | cn-occ-2022-draft#coal-mining；cn-coal-rule-2025#scraper |
| cn-ind-coal-longwall-011 | 清洁维护 | 清除支架间浮煤并保持作业空间 | 支架间浮煤 → 清理后的工作面 | 支架操作及通道不受浮煤阻挡 | source-backed | cn-occ-2022-draft#coal-mining；cn-coal-rule-2025#longwall；cn-occ-2022-draft#coal-support |
| cn-ind-coal-longwall-012 | 准备 | 配制并检查液压支架供液介质 | 乳化液原液与水 → 合格供液 | 浓度和水质按设备及矿规要求核对 | source-backed | cn-occ-2022-draft#coal-mining；cn-coal-rule-2025#longwall；cn-occ-2022-draft#coal-support |
| cn-ind-coal-longwall-013 | 交接 | 记录并交接采煤设备异常和当班作业状态 | 当班作业信息 → 可追溯运行记录 | 接班人员可识别未结事项 | proposed | cn-occ-2022-draft#coal-mining |
| cn-ind-coal-longwall-014 | 交付 | 把割落煤转送至顺槽运输衔接点 | 工作面煤流 → 到达衔接点的煤流 | 运输衔接无遗失和堵塞 | proposed | cn-occ-2022-draft#coal-mining |

阶段缺口：返工

- 未覆盖巷道掘进、钻爆、瓦斯通风防灭火、井下轨道和提升、露天矿、选煤；不得用本场景代表代码06全行业。
- 正常生产的返工与事故处置不同，尚未识别可独立核算的常规返工任务。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 炼钢原料准备与铁水预处理

代码31；限钢厂原料工段至炼钢炉前，废钢专业回收企业另属42；与炼钢熔炼场景以入炉交接为界。

流程来源：cn-steel-hj846-2026。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-steel-charge-001 | 准备 | 检查进厂炼钢原料质量 | 废钢和辅助原料 → 验收结果 | 原料类别与可接收状态可追溯 | source-backed | cn-occ-2022-draft#steel-charge；cn-steel-hj846-2026#units |
| cn-ind-steel-charge-002 | 作业 | 切割或破碎超规格废钢 | 大块废钢 → 符合入炉规格的废钢 | 尺寸按炉型装料要求确认 | source-backed | cn-occ-2022-draft#steel-charge；cn-steel-hj846-2026#units |
| cn-ind-steel-charge-003 | 作业 | 压块打包松散废钢 | 松散废钢 → 废钢包块 | 包块适合运输和装炉 | source-backed | cn-occ-2022-draft#steel-charge；cn-steel-hj846-2026#units |
| cn-ind-steel-charge-004 | 作业 | 称量并配比炼钢原料 | 原料与炉次配料单 → 已称量炉料 | 配料重量和种类对应炉次 | source-backed | cn-occ-2022-draft#steel-charge；cn-steel-hj846-2026#units |
| cn-ind-steel-charge-005 | 交接 | 吊装或输送炉料至装料位置 | 已配炉料 → 炉前炉料 | 炉次与料位一致 | source-backed | cn-occ-2022-draft#steel-charge；cn-steel-hj846-2026#units |
| cn-ind-steel-charge-006 | 交接 | 接收并转运铁水包 | 来自炼铁的铁水 → 指定位置铁水包 | 容器与炉次标识一致 | source-backed | cn-occ-2022-draft#steel-charge；cn-steel-hj846-2026#units |
| cn-ind-steel-charge-007 | 作业 | 操作混铁炉储存和均匀铁水 | 入炉铁水 → 待用铁水 | 符合后续预处理或炼钢要求 | source-backed | cn-occ-2022-draft#steel-charge；cn-steel-hj846-2026#units |
| cn-ind-steel-charge-008 | 作业 | 对铁水实施炉外预处理 | 铁水与预处理剂 → 预处理铁水 | 按炉次成分和工艺要求验收 | source-backed | cn-occ-2022-draft#steel-charge；cn-steel-hj846-2026#units |
| cn-ind-steel-charge-009 | 异常 | 排查原料处理设备故障 | 异常加工或输送设备 → 故障处置记录 | 具备安全恢复条件 | source-backed | cn-occ-2022-draft#steel-charge |
| cn-ind-steel-charge-010 | 清洁维护 | 保养原料加工与输送设备 | 停机设备 → 完成保养的设备 | 维护项目按设备规程确认 | source-backed | cn-occ-2022-draft#steel-charge |
| cn-ind-steel-charge-011 | 交付 | 交付已预处理铁水及炉次记录 | 铁水与处置信息 → 炼钢接收信息 | 炉次原料质量和未结异常可追溯 | proposed | cn-occ-2022-draft#steel-charge |

阶段缺口：检测、返工

- 流程来源是2026已公布、2027实施的工序表，不能代替实际炼钢作业规程。
- 未取得废钢放射性、密闭物与含水检查的原始操作标准，未虚构其现场步骤或限值。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 炼钢炉熔炼、出钢与炉外精炼

代码31；包含转炉和电炉路线的不同分支；两条路线不能按同一炉次叠加计时。

流程来源：cn-steel-hj846-2026。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-steel-refine-001 | 作业 | 向炼钢炉装入已配炉料 | 炉料和炉次单 → 完成装料的炉体 | 炉料种类和加入量按炉次确认 | source-backed | cn-occ-2022-draft#steelmaking；cn-steel-hj846-2026#units |
| cn-ind-steel-refine-002 | 作业 | 操纵氧枪向转炉吹氧 | 转炉熔池 → 完成吹炼的钢液 | 吹炼按转炉工艺终点要求确认 | source-backed | cn-occ-2022-draft#steelmaking；cn-steel-hj846-2026#units |
| cn-ind-steel-refine-003 | 作业 | 操作电炉熔化炉料 | 电炉炉料 → 熔化钢液 | 熔化按电炉工艺条件确认 | source-backed | cn-occ-2022-draft#steelmaking；cn-steel-hj846-2026#units |
| cn-ind-steel-refine-004 | 作业 | 加入造渣料并调整炉渣 | 熔池与造渣料 → 目标炉渣状态 | 按炉次渣系要求确认 | source-backed | cn-occ-2022-draft#steelmaking；cn-steel-hj846-2026#units |
| cn-ind-steel-refine-005 | 作业 | 加入合金调整钢液成分 | 钢液和合金 → 完成调整的钢液 | 合金批次和加入量可追溯 | source-backed | cn-occ-2022-draft#steelmaking；cn-steel-hj846-2026#units |
| cn-ind-steel-refine-006 | 检测 | 测量炉内钢液温度 | 钢液和测温器 → 炉次温度记录 | 结果与炉次和测点对应 | source-backed | cn-occ-2022-draft#steelmaking；cn-steel-hj846-2026#units |
| cn-ind-steel-refine-007 | 检测 | 抽取钢液试样供成分检验 | 钢液和取样器 → 标识钢样 | 样品可追溯至炉次 | source-backed | cn-occ-2022-draft#steelmaking；cn-steel-hj846-2026#units |
| cn-ind-steel-refine-008 | 交接 | 倾炉出钢至钢包 | 达到出钢条件的钢液 → 钢包内钢液 | 钢包和炉次一致且移交记录完整 | source-backed | cn-occ-2022-draft#steelmaking；cn-steel-hj846-2026#units |
| cn-ind-steel-refine-009 | 作业 | 排放炉渣至指定容器 | 炉渣与渣罐 → 已转移炉渣 | 不与成品钢液交付混计 | source-backed | cn-occ-2022-draft#steelmaking；cn-steel-hj846-2026#units |
| cn-ind-steel-refine-010 | 作业 | 吹氩搅拌钢包内钢液 | 钢液与供氩系统 → 完成搅拌的钢液 | 按精炼工艺确认均匀性条件 | source-backed | cn-occ-2022-draft#steelmaking；cn-steel-hj846-2026#units |
| cn-ind-steel-refine-011 | 作业 | 喂入精炼线材调整钢液 | 钢液与线材 → 完成喂线的钢液 | 线材与加入量对应精炼要求 | source-backed | cn-occ-2022-draft#steelmaking；cn-steel-hj846-2026#units |
| cn-ind-steel-refine-012 | 作业 | 加热精炼炉内钢液 | 精炼钢液 → 目标温度钢液 | 温度记录满足炉次工艺要求 | source-backed | cn-occ-2022-draft#steelmaking；cn-steel-hj846-2026#units |
| cn-ind-steel-refine-013 | 作业 | 抽真空处理钢液 | 真空装置及钢液 → 经真空处理钢液 | 真空工艺记录满足炉次要求 | source-backed | cn-occ-2022-draft#steelmaking；cn-steel-hj846-2026#units |
| cn-ind-steel-refine-014 | 清洁维护 | 修补炉衬和出钢口 | 磨损炉体及修补料 → 修补后的炉体 | 耐火材料及出钢口具备再投用条件 | source-backed | cn-occ-2022-draft#steelmaking；cn-steel-hj846-2026#units |
| cn-ind-steel-refine-015 | 异常 | 处置炼钢设备运行故障 | 故障信号与现场 → 处置结果 | 安全条件确认后恢复 | source-backed | cn-occ-2022-draft#steelmaking |
| cn-ind-steel-refine-016 | 交付 | 转送精炼钢包至浇铸工段 | 精炼钢液及炉次信息 → 浇铸接收钢包 | 炉次温度与成分记录对应 | source-backed | cn-occ-2022-draft#steelmaking；cn-steel-hj846-2026#units |

阶段缺口：准备、返工

- 各炉型精炼分支按实际路线选择；不把LF、真空、喂线等假设为每炉必经。
- 不合格炉次补吹、改判、回炉的现场准则待补，暂未编造统一返工流程。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 钢液连续浇铸与铸坯切割交付

代码31；仅连铸路线；模铸另列待覆盖。炉外精炼到达的钢包由本场景接收不重复计上游转运工时。

流程来源：cn-steel-hj846-2026。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-steel-continuous-cast-001 | 准备 | 吊运钢包至连铸浇注位置 | 待浇钢包 → 就位钢包 | 炉次与浇次对应 | source-backed | cn-occ-2022-draft#steelcasting；cn-steel-hj846-2026#units |
| cn-ind-steel-continuous-cast-002 | 作业 | 调节中间包钢液液面 | 中间包钢液 → 稳定液面 | 满足连铸操作要求 | source-backed | cn-occ-2022-draft#steelcasting；cn-steel-hj846-2026#units |
| cn-ind-steel-continuous-cast-003 | 作业 | 向结晶器浇注钢液 | 中间包钢液 → 结晶器内钢液 | 按浇注条件保持连续供流 | source-backed | cn-occ-2022-draft#steelcasting；cn-steel-hj846-2026#units |
| cn-ind-steel-continuous-cast-004 | 作业 | 清除浇注过程钢液表面浮渣 | 表面浮渣 → 清渣后钢液表面 | 按浇注工艺避免夹杂带入 | source-backed | cn-occ-2022-draft#steelcasting；cn-steel-hj846-2026#units |
| cn-ind-steel-continuous-cast-005 | 作业 | 调节铸坯拉速 | 铸机及初生铸坯 → 目标拉速 | 拉速与铸坯工艺相符 | source-backed | cn-occ-2022-draft#steelcasting；cn-steel-hj846-2026#units |
| cn-ind-steel-continuous-cast-006 | 作业 | 调节铸坯二次冷却 | 热铸坯与冷却系统 → 冷却铸坯 | 冷却制度对应钢种断面 | source-backed | cn-occ-2022-draft#steelcasting；cn-steel-hj846-2026#units |
| cn-ind-steel-continuous-cast-007 | 作业 | 控制连铸电磁搅拌系统 | 搅拌设备与钢液 → 运行中的搅拌过程 | 按钢种工艺设置运行 | source-backed | cn-occ-2022-draft#steelcasting；cn-steel-hj846-2026#units |
| cn-ind-steel-continuous-cast-008 | 作业 | 切割连续铸坯至规定长度 | 连续铸坯 → 定尺铸坯 | 长度按订单和切割要求确认 | source-backed | cn-occ-2022-draft#steelcasting；cn-steel-hj846-2026#units |
| cn-ind-steel-continuous-cast-009 | 检测 | 检查并整理铸坯表面状态 | 切割铸坯 → 检查结果及整理铸坯 | 表面问题与铸坯编号对应 | source-backed | cn-occ-2022-draft#steelcasting；cn-steel-hj846-2026#units |
| cn-ind-steel-continuous-cast-010 | 交付 | 标识并运送铸坯至下道工段 | 合格铸坯 → 带标识交付铸坯 | 钢种炉次与目的位置可追溯 | source-backed | cn-occ-2022-draft#steelcasting；cn-steel-hj846-2026#units |
| cn-ind-steel-continuous-cast-011 | 异常 | 排查连铸设备异常 | 设备故障或不稳工况 → 异常处理记录 | 达到恢复运行条件 | source-backed | cn-occ-2022-draft#steelcasting |
| cn-ind-steel-continuous-cast-012 | 清洁维护 | 保养连铸机及附属设备 | 待保养设备 → 可用设备 | 维护项目完成且状态有记录 | source-backed | cn-occ-2022-draft#steelcasting |

阶段缺口：交接、返工

- 开浇准备、结晶器更换、漏钢处置和铸坯修磨需专项原始流程；不能把精整概称当作所有返工已识别。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 木竹原料备料与化学制浆

代码22；木竹制浆路线，草浆、机械浆和废纸浆具有不同步骤，不将不同路线混作一条必经流程。

流程来源：cn-paper-hj1482-2026。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-chemical-pulp-001 | 准备 | 剥除原木树皮 | 原木 → 去皮原木 | 树皮去除符合制浆备料要求 | source-backed | cn-occ-2022-draft#pulp；cn-paper-hj1482-2026#pulp |
| cn-ind-chemical-pulp-002 | 作业 | 截断制浆原木 | 去皮原木 → 适长木段 | 木段适合削片机进料 | source-backed | cn-occ-2022-draft#pulp；cn-paper-hj1482-2026#pulp |
| cn-ind-chemical-pulp-003 | 作业 | 削切木竹原料制成片料 | 木段或竹材 → 片料 | 片料规格满足制浆要求 | source-backed | cn-occ-2022-draft#pulp；cn-paper-hj1482-2026#pulp |
| cn-ind-chemical-pulp-004 | 检测 | 筛分片料剔除不适合粒级 | 混合片料 → 分级片料 | 粒级按蒸煮工艺确认 | source-backed | cn-occ-2022-draft#pulp；cn-paper-hj1482-2026#pulp |
| cn-ind-chemical-pulp-005 | 检测 | 探测并剔除原料金属杂物 | 备料 → 除金属后的原料 | 检出杂物已移除且不进入制浆设备 | source-backed | cn-occ-2022-draft#pulp |
| cn-ind-chemical-pulp-006 | 准备 | 配制化学法制浆蒸煮液 | 化学品和工艺水 → 蒸煮液 | 配液与批次可追溯 | source-backed | cn-occ-2022-draft#pulp；cn-paper-hj1482-2026#pulp |
| cn-ind-chemical-pulp-007 | 作业 | 向蒸煮器输送片料及蒸煮液 | 片料蒸煮液 → 装料完成的蒸煮器 | 投料与工艺批次一致 | source-backed | cn-occ-2022-draft#pulp；cn-paper-hj1482-2026#pulp |
| cn-ind-chemical-pulp-008 | 作业 | 控制蒸煮过程分离纤维 | 装料蒸煮器 → 化学浆 | 蒸煮过程按原料和工艺确认 | source-backed | cn-occ-2022-draft#pulp；cn-paper-hj1482-2026#pulp |
| cn-ind-chemical-pulp-009 | 作业 | 洗涤粗浆分离残液 | 粗浆 → 洗后浆及分离液 | 洗涤效果满足下道工序 | source-backed | cn-occ-2022-draft#pulp；cn-paper-hj1482-2026#pulp |
| cn-ind-chemical-pulp-010 | 检测 | 筛选浆料并去除杂物 | 洗后浆 → 筛选浆 | 杂质按产品工艺限度控制 | source-backed | cn-occ-2022-draft#pulp；cn-paper-hj1482-2026#pulp |
| cn-ind-chemical-pulp-011 | 作业 | 漂白浆料 | 待漂浆及漂剂 → 漂白浆 | 白度和浆质量按产品工艺确认 | source-backed | cn-occ-2022-draft#pulp；cn-paper-hj1482-2026#pulp |
| cn-ind-chemical-pulp-012 | 作业 | 浓缩洗漂后的浆料 | 稀浆 → 目标浓度浆料 | 浓度满足后续储存或抄造条件 | source-backed | cn-occ-2022-draft#pulp；cn-paper-hj1482-2026#pulp |
| cn-ind-chemical-pulp-013 | 交接 | 移交纸浆与批次信息至储浆工段 | 成浆及批次记录 → 接收纸浆 | 批次质量和数量记录对应 | proposed | cn-occ-2022-draft#pulp |

阶段缺口：异常、返工、清洁维护、交付

- 氧脱木素虽在流程表存在，职业稿未独立说明；具体加氧反应控制作为待补，不假设与漂白工时重复。
- 危险化学品接收、堵塞断料、蒸煮异常、洗网清洗和检维修待专项规程补证。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 废纸碎解、脱墨与浆料净化

代码22；仅采用脱墨的废纸浆路线，不把脱墨假定为瓦楞原纸等全部废纸浆必需。

流程来源：cn-paper-hj1482-2026。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-recovered-paper-pulp-001 | 准备 | 分选投入碎浆机的废纸原料 | 废纸料包 → 可投入废纸 | 明显不适合物料已区分 | proposed | cn-occ-2022-draft#pulp |
| cn-ind-recovered-paper-pulp-002 | 作业 | 碎解废纸释放纤维 | 废纸与水 → 碎解浆 | 碎解状态满足后续筛净要求 | source-backed | cn-occ-2022-draft#pulp；cn-paper-hj1482-2026#pulp |
| cn-ind-recovered-paper-pulp-003 | 作业 | 去除废纸浆中的杂物 | 碎解浆 → 净化浆 | 杂物按目标纸种要求去除 | source-backed | cn-occ-2022-draft#pulp；cn-paper-hj1482-2026#pulp |
| cn-ind-recovered-paper-pulp-004 | 作业 | 浮选或洗涤脱除油墨 | 含墨浆 → 脱墨浆 | 油墨残留按目标产品要求确认 | source-backed | cn-occ-2022-draft#pulp；cn-paper-hj1482-2026#pulp |
| cn-ind-recovered-paper-pulp-005 | 作业 | 洗选废纸浆 | 脱墨浆 → 洗选浆 | 符合后续浆料要求 | source-backed | cn-occ-2022-draft#pulp；cn-paper-hj1482-2026#pulp |
| cn-ind-recovered-paper-pulp-006 | 作业 | 浓缩废纸浆 | 稀废纸浆 → 浓缩浆 | 浓度适合后续抄造 | source-backed | cn-occ-2022-draft#pulp；cn-paper-hj1482-2026#pulp |
| cn-ind-recovered-paper-pulp-007 | 检测 | 抽检废纸浆杂质与白度 | 工序浆样 → 质量记录 | 结果能对应废纸批次 | proposed | cn-occ-2022-draft#pulp |
| cn-ind-recovered-paper-pulp-008 | 交付 | 移交废纸浆及原料批次信息 | 合格浆与记录 → 下工段接收信息 | 纸浆批次可追溯 | proposed | cn-occ-2022-draft#pulp |

阶段缺口：交接、异常、返工、清洁维护

- 废纸接收解包、胶黏物控制、浮选废渣、脱墨污泥和设备清洗尚待原始规范。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 机制纸抄造与复卷切纸交付

代码22；从商品浆或自制浆接收到成纸，不重复计算制浆场景；纸种专用涂布单列。

流程来源：cn-paper-hj1482-2026。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-machine-paper-001 | 准备 | 打浆或磨浆调整纸浆纤维 | 纸浆 → 经处理浆料 | 浆料状态满足纸种配方 | source-backed | cn-occ-2022-draft#papermaking；cn-paper-hj1482-2026#paper |
| cn-ind-machine-paper-002 | 准备 | 向纸浆施胶并加入填料 | 浆料和辅料 → 配制浆 | 辅料与配方批次一致 | source-backed | cn-occ-2022-draft#papermaking；cn-paper-hj1482-2026#paper |
| cn-ind-machine-paper-003 | 作业 | 在纸机网部脱水成形 | 配制浆 → 湿纸幅 | 纸幅形成并符合纸种工艺 | source-backed | cn-occ-2022-draft#papermaking；cn-paper-hj1482-2026#paper |
| cn-ind-machine-paper-004 | 作业 | 压榨湿纸幅 | 湿纸幅 → 压榨纸幅 | 纸幅脱水和完整性满足下工序 | source-backed | cn-occ-2022-draft#papermaking；cn-paper-hj1482-2026#paper |
| cn-ind-machine-paper-005 | 作业 | 干燥纸幅 | 压榨纸幅 → 干纸幅 | 含水状态按产品要求确认 | source-backed | cn-occ-2022-draft#papermaking；cn-paper-hj1482-2026#paper |
| cn-ind-machine-paper-006 | 作业 | 压光纸面 | 干纸幅 → 整饰纸幅 | 表面平滑状态满足产品要求 | source-backed | cn-occ-2022-draft#papermaking；cn-paper-hj1482-2026#paper |
| cn-ind-machine-paper-007 | 作业 | 复卷卷筒纸 | 原纸卷 → 规格纸卷 | 卷径张力和宽度按产品确认 | source-backed | cn-occ-2022-draft#papermaking；cn-paper-hj1482-2026#paper |
| cn-ind-machine-paper-008 | 返工 | 剔除复卷纸病并接合断头 | 带纸病或断头纸幅 → 修整纸幅 | 接头及缺陷处置符合产品要求 | source-backed | cn-occ-2022-draft#papermaking |
| cn-ind-machine-paper-009 | 作业 | 分切纸卷或平板纸 | 整饰纸 → 定规格纸张 | 尺寸符合产品规格 | source-backed | cn-occ-2022-draft#papermaking |
| cn-ind-machine-paper-010 | 检测 | 挑拣平板纸中的纸病 | 平板纸 → 合格纸与剔除纸 | 不合格张已分离且可记录 | source-backed | cn-occ-2022-draft#papermaking |
| cn-ind-machine-paper-011 | 交付 | 计数并包装成品纸 | 合格纸 → 计数包装成品 | 件数标识与纸种相符 | source-backed | cn-occ-2022-draft#papermaking |
| cn-ind-machine-paper-012 | 作业 | 回收纸机白水 | 白水 → 回用水与回收纤维 | 回用状态满足纸机要求 | proposed | cn-occ-2022-draft#papermaking；cn-paper-hj1482-2026#paper |

阶段缺口：交接、异常、清洁维护

- 纸机穿纸、断纸事故、毛毯网部清洗和设备保养需操作标准；不得把专线已列自动生产线推断为无人。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 化学制浆黑液浓缩与碱回收

代码22内部配套，按实际执行主体；不与发电行业重复计企业自用余热动作。

流程来源：cn-paper-hj1482-2026。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-paper-recovery-001 | 准备 | 过滤并预处理制浆废液 | 制浆废液 → 预处理废液 | 适合蒸发系统进料 | source-backed | cn-occ-2022-draft#pulp-recovery；cn-paper-hj1482-2026#pulp |
| cn-ind-paper-recovery-002 | 作业 | 蒸发浓缩制浆废液 | 稀废液 → 浓缩废液 | 浓度满足碱回收工艺 | source-backed | cn-occ-2022-draft#pulp-recovery；cn-paper-hj1482-2026#pulp |
| cn-ind-paper-recovery-003 | 作业 | 燃烧浓缩废液回收碱和热能 | 浓缩废液 → 碱回收产物与热能 | 燃烧和回收状态满足装置要求 | source-backed | cn-occ-2022-draft#pulp-recovery；cn-paper-hj1482-2026#pulp |
| cn-ind-paper-recovery-004 | 作业 | 溶解碱回收炉熔融物 | 熔融物及溶解液 → 绿液 | 符合后续苛化条件 | proposed | cn-occ-2022-draft#pulp-recovery；cn-paper-hj1482-2026#pulp |
| cn-ind-paper-recovery-005 | 作业 | 苛化回收液制备白液 | 待苛化液及石灰 → 白液 | 白液浓度满足制浆工艺 | proposed | cn-occ-2022-draft#pulp-recovery；cn-paper-hj1482-2026#pulp |
| cn-ind-paper-recovery-006 | 作业 | 煅烧白泥回收石灰 | 白泥 → 回收石灰 | 品质符合苛化再用要求 | source-backed | cn-occ-2022-draft#pulp-recovery；cn-paper-hj1482-2026#pulp |
| cn-ind-paper-recovery-007 | 检测 | 检查回用白液和石灰的工艺状态 | 回用物料样品 → 检验结果 | 结果可与生产批次对应 | proposed | cn-occ-2022-draft#pulp-recovery；cn-paper-hj1482-2026#pulp |
| cn-ind-paper-recovery-008 | 交付 | 将回收白液及石灰转供制浆系统 | 回收物料 → 制浆接收物料 | 数量品质和接收位置可追溯 | proposed | cn-occ-2022-draft#pulp-recovery；cn-paper-hj1482-2026#pulp |

阶段缺口：交接、异常、返工、清洁维护

- 回收炉安全联锁、熔融物事故、蒸发器结垢清洗及检维修缺专项已读资料。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 瓦楞纸板成型与纸箱制作

代码22；从外购原纸至纸箱，不重复计算造纸；印刷是纸箱厂内工序，外包印刷按执行单位归属。

流程来源：cn-paper-hj1482-2026。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-paper-box-001 | 作业 | 轧制瓦楞原纸 | 瓦楞原纸 → 瓦楞芯纸 | 楞型符合纸板设计 | source-backed | cn-occ-2022-draft#paperbox；cn-paper-hj1482-2026#paper |
| cn-ind-paper-box-002 | 作业 | 黏合瓦楞芯纸与面纸 | 芯纸面纸与黏合剂 → 多层纸板 | 层数与黏合状态符合产品要求 | source-backed | cn-occ-2022-draft#paperbox；cn-paper-hj1482-2026#paper |
| cn-ind-paper-box-003 | 作业 | 烘干瓦楞纸板 | 湿纸板 → 干纸板 | 含水与结合状态满足后续加工 | source-backed | cn-occ-2022-draft#paperbox；cn-paper-hj1482-2026#paper |
| cn-ind-paper-box-004 | 作业 | 裁切瓦楞纸板 | 连续纸板 → 定尺纸板 | 尺寸符合订单 | source-backed | cn-occ-2022-draft#paperbox；cn-paper-hj1482-2026#paper |
| cn-ind-paper-box-005 | 作业 | 印刷纸箱图文 | 纸板与版面 → 印刷纸板 | 图文位置与订单相符 | source-backed | cn-occ-2022-draft#paperbox |
| cn-ind-paper-box-006 | 作业 | 开槽或模切箱坯 | 印刷纸板 → 箱坯 | 槽口或模切轮廓符合箱型 | source-backed | cn-occ-2022-draft#paperbox |
| cn-ind-paper-box-007 | 作业 | 钉合或粘合纸箱接缝 | 箱坯 → 成型纸箱 | 接缝符合箱型和连接要求 | source-backed | cn-occ-2022-draft#paperbox；cn-paper-hj1482-2026#paper |
| cn-ind-paper-box-008 | 检测 | 检查纸箱成型和印刷状态 | 成型纸箱 → 验收结果 | 错版或接缝问题可识别 | proposed | cn-occ-2022-draft#paperbox |
| cn-ind-paper-box-009 | 交付 | 打包并交付订单纸箱 | 验收纸箱 → 订单交付件 | 型号数量可追溯 | proposed | cn-occ-2022-draft#paperbox |

阶段缺口：准备、交接、异常、返工、清洁维护

- 机器换纸接纸、调版换模、糊箱堵料、废纸分拣、清洁维护尚缺已读专门SOP。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 板木家具部件加工、涂饰和装配

代码21木质家具，不把金属塑料竹藤家具操作合并；厂内物流仅记内部接口。

流程来源：cn-furniture-hj1027-2019。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-wood-furniture-001 | 准备 | 干燥或调理木材原料 | 原木锯材 → 可加工木材 | 含水和材料状态按产品工艺确认 | source-backed | cn-occ-2022-draft#furniture；cn-furniture-hj1027-2019#wood |
| cn-ind-wood-furniture-002 | 作业 | 开料切割家具板件 | 锯材或板材 → 毛料板件 | 尺寸及纹理方向按图确认 | source-backed | cn-occ-2022-draft#furniture；cn-furniture-hj1027-2019#wood |
| cn-ind-wood-furniture-003 | 作业 | 刨削或铣削家具板件轮廓 | 毛料板件 → 净料板件 | 轮廓尺寸符合图纸 | source-backed | cn-occ-2022-draft#furniture；cn-furniture-hj1027-2019#wood |
| cn-ind-wood-furniture-004 | 作业 | 加工家具部件连接孔槽 | 板件 → 孔槽部件 | 位置规格符合装配图 | source-backed | cn-occ-2022-draft#furniture；cn-furniture-hj1027-2019#wood |
| cn-ind-wood-furniture-005 | 作业 | 施胶拼接家具板件 | 板件及胶 → 拼合部件 | 拼合强度和位置按产品工艺确认 | source-backed | cn-occ-2022-draft#furniture；cn-furniture-hj1027-2019#wood |
| cn-ind-wood-furniture-006 | 作业 | 封贴板件边部 | 板件及封边料 → 封边部件 | 边部贴合和修边符合产品要求 | source-backed | cn-occ-2022-draft#furniture；cn-furniture-hj1027-2019#wood |
| cn-ind-wood-furniture-007 | 作业 | 砂磨家具部件表面 | 待涂部件 → 砂磨部件 | 表面适合下一道涂饰 | source-backed | cn-occ-2022-draft#furniture；cn-furniture-hj1027-2019#wood |
| cn-ind-wood-furniture-008 | 准备 | 调配并供应家具涂料 | 涂料辅料 → 配制涂料 | 配方批次满足涂饰要求 | source-backed | cn-occ-2022-draft#furniture；cn-furniture-hj1027-2019#wood |
| cn-ind-wood-furniture-009 | 作业 | 向家具部件施涂底漆或色漆 | 部件与涂料 → 涂装部件 | 涂层覆盖按产品要求确认 | source-backed | cn-occ-2022-draft#furniture；cn-furniture-hj1027-2019#wood |
| cn-ind-wood-furniture-010 | 作业 | 干燥家具部件涂层 | 湿涂部件 → 干燥部件 | 达到后续操作所需固化状态 | source-backed | cn-occ-2022-draft#furniture；cn-furniture-hj1027-2019#wood |
| cn-ind-wood-furniture-011 | 返工 | 砂磨待重涂部件的局部缺陷 | 有缺陷涂层 → 修整部位 | 满足复涂工艺要求 | proposed | cn-occ-2022-draft#furniture |
| cn-ind-wood-furniture-012 | 作业 | 装配家具部件与连接件 | 合格部件及五金 → 家具组件或成品 | 连接与位置符合装配要求 | source-backed | cn-occ-2022-draft#furniture |
| cn-ind-wood-furniture-013 | 检测 | 检查装配家具的外观和连接状态 | 装配家具 → 检查记录 | 可识别错装损伤和连接问题 | source-backed | cn-occ-2022-draft#furniture |
| cn-ind-wood-furniture-014 | 交付 | 包装家具成品及配件 | 合格家具及配件 → 包装件 | 产品配件数量与标识对应 | source-backed | cn-occ-2022-draft#furniture |
| cn-ind-wood-furniture-015 | 清洁维护 | 清理木工与涂装设备的加工残留 | 设备木屑胶漆残留 → 清洁设备 | 按设备和涂料要求恢复可用 | proposed | cn-occ-2022-draft#furniture |

阶段缺口：交接、异常

- 实木榫卯、定制板件异形、软体绷装、金属塑料竹藤玻璃家具仍分别待盘点。
- 生产单元表不支持声称所有工厂配置机械手或自动喷涂；机器人部署研究尚未开始。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 刚性印制电路板图形、孔和表面加工

代码39；限PCB制造，PCBA元件贴装焊接、半导体和整机组装独立待补。

流程来源：cn-electronics-hj1031-2019。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-pcb-fabrication-001 | 准备 | 开料裁切覆铜板 | 覆铜板 → 生产板 | 板型尺寸对应生产批次 | source-backed | cn-occ-2022-draft#pcb；cn-electronics-hj1031-2019#pcb |
| cn-ind-pcb-fabrication-002 | 准备 | 清洁并预处理覆铜板表面 | 生产板 → 洁净板面 | 表面适合成像或镀覆 | source-backed | cn-occ-2022-draft#pcb；cn-electronics-hj1031-2019#pcb |
| cn-ind-pcb-fabrication-003 | 作业 | 在覆铜板形成感光或丝印图形 | 板材与图形介质 → 待加工电路图形 | 图形与工作版一致 | source-backed | cn-occ-2022-draft#pcb；cn-electronics-hj1031-2019#pcb |
| cn-ind-pcb-fabrication-004 | 作业 | 显影感光图形 | 已曝光板 → 显影电路图形 | 图形区域符合工艺设计 | source-backed | cn-occ-2022-draft#pcb；cn-electronics-hj1031-2019#pcb |
| cn-ind-pcb-fabrication-005 | 作业 | 蚀刻去除非线路铜 | 带保护图形铜板 → 电路图形铜层 | 线路按设计保留且非线路铜去除 | source-backed | cn-occ-2022-draft#pcb；cn-electronics-hj1031-2019#pcb |
| cn-ind-pcb-fabrication-006 | 作业 | 退除图形保护膜 | 蚀刻后板 → 退膜板 | 残膜按下工序要求去除 | source-backed | cn-occ-2022-draft#pcb；cn-electronics-hj1031-2019#pcb |
| cn-ind-pcb-fabrication-007 | 作业 | 钻制印制板连接孔 | 生产板 → 钻孔板 | 孔位置与孔径符合图纸 | source-backed | cn-occ-2022-draft#pcb；cn-electronics-hj1031-2019#pcb |
| cn-ind-pcb-fabrication-008 | 作业 | 实施孔金属化 | 钻孔板 → 导电孔板 | 孔壁导电层满足工艺要求 | source-backed | cn-occ-2022-draft#pcb；cn-electronics-hj1031-2019#pcb |
| cn-ind-pcb-fabrication-009 | 作业 | 电镀线路及孔壁铜层 | 待镀板 → 镀铜板 | 镀层按产品要求确认 | source-backed | cn-occ-2022-draft#pcb；cn-electronics-hj1031-2019#pcb |
| cn-ind-pcb-fabrication-010 | 作业 | 层压多层印制板 | 内层板与结合材料 → 层压板 | 层间位置结合符合产品要求 | source-backed | cn-occ-2022-draft#pcb；cn-electronics-hj1031-2019#pcb |
| cn-ind-pcb-fabrication-011 | 作业 | 涂覆并固化阻焊层 | 线路板与阻焊材料 → 阻焊板 | 阻焊开口与覆盖符合设计 | source-backed | cn-occ-2022-draft#pcb；cn-electronics-hj1031-2019#pcb |
| cn-ind-pcb-fabrication-012 | 作业 | 处理焊盘表面形成规定终饰 | 待终饰板 → 终饰板 | 所选终饰满足产品规范 | source-backed | cn-occ-2022-draft#pcb；cn-electronics-hj1031-2019#pcb |
| cn-ind-pcb-fabrication-013 | 作业 | 加工印制电路板外形 | 加工完成板 → 成型板 | 外形轮廓与订单一致 | source-backed | cn-occ-2022-draft#pcb；cn-electronics-hj1031-2019#pcb |
| cn-ind-pcb-fabrication-014 | 检测 | 检查电路图形及孔加工缺陷 | 在制板或成型板 → 缺陷记录 | 缺陷与板号位置对应 | proposed | cn-occ-2022-draft#pcb |
| cn-ind-pcb-fabrication-015 | 返工 | 对允许返修的印制板缺陷执行修整 | 缺陷板与批准处置 → 返修板 | 返修限度与再检要求经确认 | proposed | cn-occ-2022-draft#pcb |
| cn-ind-pcb-fabrication-016 | 交付 | 包装并交付合格印制板 | 合格板与批次记录 → 交付板 | 板号版本数量及保护状态一致 | proposed | cn-occ-2022-draft#pcb |

阶段缺口：交接、异常、清洁维护

- 尚缺钻污处理、棕化、化学配液槽液分析、独立电测、清洗用水和危险废物处理的详细人工作业规范。
- 步骤按单双多层和终饰路线选择；非所有订单必经同一工序，不能求和生成单板人工工时。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 汽车底盘系统装配、整车合装及下线检查

代码36；从已制造零部件至总装检验，不重复计发动机等零部件制造；不同动力及乘商车型按适用分支。

流程来源：cn-auto-hj971-2026。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-auto-final-assembly-001 | 准备 | 核对总装待用零部件与车型配置 | 零部件及车型单 → 配置核对结果 | 错件缺件在装配前识别 | proposed | cn-occ-2022-draft#autoassembly；cn-auto-hj971-2026#units |
| cn-ind-auto-final-assembly-002 | 作业 | 装配并调整传动装置 | 传动零部件 → 传动组件 | 连接和调节符合车型要求 | source-backed | cn-occ-2022-draft#autoassembly；cn-auto-hj971-2026#units |
| cn-ind-auto-final-assembly-003 | 作业 | 装配并调整前后桥 | 桥及关联部件 → 车桥组件 | 位置连接和调整符合车型要求 | source-backed | cn-occ-2022-draft#autoassembly；cn-auto-hj971-2026#units |
| cn-ind-auto-final-assembly-004 | 作业 | 装配并调整悬架系统 | 悬架零部件 → 悬架组件 | 安装和调节符合车型要求 | source-backed | cn-occ-2022-draft#autoassembly；cn-auto-hj971-2026#units |
| cn-ind-auto-final-assembly-005 | 作业 | 装配车辆线束及电器 | 线束电器及车体 → 连接完成的电器系统 | 连接位置与车型线图一致 | source-backed | cn-occ-2022-draft#autoassembly；cn-auto-hj971-2026#units |
| cn-ind-auto-final-assembly-006 | 作业 | 装配并调整制动系统 | 制动零部件 → 制动系统 | 安装调节按车型工艺完成 | source-backed | cn-occ-2022-draft#autoassembly；cn-auto-hj971-2026#units |
| cn-ind-auto-final-assembly-007 | 作业 | 装配并调整转向系统 | 转向零部件 → 转向系统 | 安装调节按车型工艺完成 | source-backed | cn-occ-2022-draft#autoassembly；cn-auto-hj971-2026#units |
| cn-ind-auto-final-assembly-008 | 作业 | 装配车轮总成 | 轮胎轮辋相关件 → 车轮总成 | 轮胎和轮辋配置匹配 | source-backed | cn-occ-2022-draft#autoassembly；cn-auto-hj971-2026#units |
| cn-ind-auto-final-assembly-009 | 检测 | 平衡车轮总成 | 已装车轮 → 平衡结果 | 符合车型平衡要求 | source-backed | cn-occ-2022-draft#autoassembly；cn-auto-hj971-2026#units |
| cn-ind-auto-final-assembly-010 | 检测 | 检验车轮总成气密状态 | 充气车轮 → 气密检验结果 | 按车型要求确认漏气状态 | source-backed | cn-occ-2022-draft#autoassembly；cn-auto-hj971-2026#units |
| cn-ind-auto-final-assembly-011 | 作业 | 铆接适用车型车架 | 车架构件与铆钉 → 车架总成 | 铆接位置与连接状态符合图纸 | source-backed | cn-occ-2022-draft#autoassembly；cn-auto-hj971-2026#units |
| cn-ind-auto-final-assembly-012 | 交接 | 合装车身、动力和底盘模块 | 各合格模块 → 合装车辆 | 模块配置与车号一致 | source-backed | cn-occ-2022-draft#autoassembly；cn-auto-hj971-2026#units |
| cn-ind-auto-final-assembly-013 | 作业 | 调整整车机械和电器连接 | 合装车辆 → 调整车辆 | 系统调节符合下线条件 | source-backed | cn-occ-2022-draft#autoassembly；cn-auto-hj971-2026#units |
| cn-ind-auto-final-assembly-014 | 检测 | 执行下线系统功能检验 | 调整车辆 → 功能检验记录 | 动力底盘电器结果对应车号 | source-backed | cn-occ-2022-draft#autoassembly；cn-auto-hj971-2026#units |
| cn-ind-auto-final-assembly-015 | 检测 | 执行规定道路或试验场检验 | 满足试验条件车辆 → 行驶试验记录 | 试验结果可追溯至车辆 | source-backed | cn-occ-2022-draft#autoassembly；cn-auto-hj971-2026#units |
| cn-ind-auto-final-assembly-016 | 返工 | 按缺陷工单调整未通过检验的系统 | 不合格车辆与工单 → 待复检车辆 | 缺陷处置并再次检验 | proposed | cn-occ-2022-draft#autoassembly |
| cn-ind-auto-final-assembly-017 | 清洁维护 | 保养汽车装调生产线设备 | 生产线设备 → 保养完成设备 | 维护项目按设备要求确认 | source-backed | cn-occ-2022-draft#autoassembly；cn-auto-hj971-2026#units |
| cn-ind-auto-final-assembly-018 | 交付 | 移交下线车辆及检验状态 | 完成检验车辆 → 交付车辆和记录 | 车号配置和未结缺陷对应 | proposed | cn-occ-2022-draft#autoassembly |

阶段缺口：异常

- 汽车冲压白车身焊接、涂装、电池模组、发动机和变速器内部装配、商用车上装及再制造仍未完整盘点。
- HJ流程表只证明有装配及检验单元，不能支持各车型力矩和劳动投入。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 火电厂燃料接卸、储存和锅炉前制备

代码44；仅发电厂内部燃料工段，矿山开采和社会物流不混计；燃煤为主，生物质差异待补。

流程来源：cn-power-hj953-2026。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-power-fuel-001 | 准备 | 检查燃料接卸及输送设备启动条件 | 待启动设备 → 启动确认 | 设备状态和作业区满足安全投运要求 | source-backed | cn-occ-2022-draft#power-fuel；cn-power-hj953-2026#units |
| cn-ind-power-fuel-002 | 检测 | 计量并验收进厂燃料 | 煤等燃料与交货单 → 接收记录 | 数量品质及批次可追溯 | source-backed | cn-occ-2022-draft#power-fuel；cn-power-hj953-2026#units |
| cn-ind-power-fuel-003 | 作业 | 接卸运输工具内燃料 | 到厂燃料 → 卸入接收设施的燃料 | 指定接收位置和批次对应 | source-backed | cn-occ-2022-draft#power-fuel；cn-power-hj953-2026#units |
| cn-ind-power-fuel-004 | 作业 | 输送燃料至储场或煤仓 | 已卸燃料 → 指定储位燃料 | 输送目标和批次对应 | source-backed | cn-occ-2022-draft#power-fuel；cn-power-hj953-2026#units |
| cn-ind-power-fuel-005 | 作业 | 按锅炉需求掺配燃料 | 不同燃料批次 → 配制燃料 | 配比按机组工况和燃料特性确认 | source-backed | cn-occ-2022-draft#power-fuel；cn-power-hj953-2026#units |
| cn-ind-power-fuel-006 | 作业 | 破碎并制备入炉燃料 | 大块或待制备燃料 → 适用粒级燃料 | 粒级适合锅炉供料 | source-backed | cn-occ-2022-draft#power-fuel；cn-power-hj953-2026#units |
| cn-ind-power-fuel-007 | 交接 | 输送制备燃料至锅炉供料接口 | 制备燃料 → 锅炉前燃料 | 供料与机组需求衔接 | source-backed | cn-occ-2022-draft#power-fuel；cn-power-hj953-2026#units |
| cn-ind-power-fuel-008 | 检测 | 巡检燃料输送及储存设施 | 运行燃料系统 → 巡检结果 | 异常位置和状态得到记录 | source-backed | cn-occ-2022-draft#power-fuel；cn-power-hj953-2026#units |
| cn-ind-power-fuel-009 | 异常 | 排除燃料设备堵塞或运行故障 | 异常燃料系统 → 处置结果 | 达到安全恢复条件 | source-backed | cn-occ-2022-draft#power-fuel |
| cn-ind-power-fuel-010 | 清洁维护 | 维护燃料接卸和输送设备 | 待保养设备 → 保养设备 | 保养项目完成且记录可查 | source-backed | cn-occ-2022-draft#power-fuel |
| cn-ind-power-fuel-011 | 检测 | 参加燃料设备检修后试运验收 | 检修设备 → 试运验收记录 | 设备具备移交运行条件 | source-backed | cn-occ-2022-draft#power-fuel |
| cn-ind-power-fuel-012 | 交付 | 交接燃料存量和设备未结异常 | 当班记录 → 交班记录 | 后班可识别库存与设备状态 | proposed | cn-occ-2022-draft#power-fuel |

阶段缺口：返工

- 煤场自燃、粉尘防爆、采制化样、除铁、皮带撕裂等尚待专项规程；消防动作不能简化为一般清洁。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 燃煤锅炉、汽轮机及发电电气运行

代码44；燃煤机组热力与电气流程，燃气水电核电风光不以本场景替代。控制任务仅记录必要数字流程与现场执行关系。

流程来源：cn-power-hj953-2026。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-thermal-power-generation-001 | 准备 | 按启动顺序投运锅炉及辅助设备 | 可用锅炉与辅机 → 启动锅炉 | 达到相应启动阶段工艺条件 | source-backed | cn-occ-2022-draft#power-boiler；cn-power-hj953-2026#units |
| cn-ind-thermal-power-generation-002 | 作业 | 调整锅炉燃料和配风 | 运行锅炉 → 调整后的燃烧状态 | 燃烧参数符合机组工况 | source-backed | cn-occ-2022-draft#power-boiler；cn-power-hj953-2026#units |
| cn-ind-thermal-power-generation-003 | 作业 | 调整除尘脱硫脱硝装置 | 环保装置和工况 → 协调运行的装置 | 按装置运行及排放要求确认 | source-backed | cn-occ-2022-draft#power-boiler；cn-power-hj953-2026#units |
| cn-ind-thermal-power-generation-004 | 检测 | 监测锅炉汽水烟气和灰渣参数 | 运行参数与现场 → 参数记录 | 异常参数可识别并追溯 | source-backed | cn-occ-2022-draft#power-boiler；cn-power-hj953-2026#units |
| cn-ind-thermal-power-generation-005 | 作业 | 启停并调整汽轮机及辅助设备 | 汽轮机系统 → 相应运行状态 | 启动停运按机组条件完成 | source-backed | cn-occ-2022-draft#power-boiler；cn-power-hj953-2026#units；cn-occ-2022-draft#power-turbine |
| cn-ind-thermal-power-generation-006 | 检测 | 检查汽轮机温度压力和振动 | 汽轮机运行信息 → 检查记录 | 异常与设备位置可对应 | source-backed | cn-occ-2022-draft#power-boiler；cn-power-hj953-2026#units；cn-occ-2022-draft#power-turbine |
| cn-ind-thermal-power-generation-007 | 作业 | 切换汽轮机控制和辅机运行方式 | 运行需求与设备 → 切换后的系统 | 切换过程满足机组条件 | source-backed | cn-occ-2022-draft#power-boiler；cn-power-hj953-2026#units；cn-occ-2022-draft#power-turbine |
| cn-ind-thermal-power-generation-008 | 交接 | 同步并网或解列发电机组 | 具备条件的发电机 → 并网或解列状态 | 按电气操作要求完成状态确认 | source-backed | cn-occ-2022-draft#power-boiler；cn-power-hj953-2026#units；cn-occ-2022-draft#power-electric |
| cn-ind-thermal-power-generation-009 | 作业 | 调节发电机组电气负荷 | 调度指令及机组 → 目标负荷运行 | 负荷及电气参数符合许可范围 | source-backed | cn-occ-2022-draft#power-boiler；cn-power-hj953-2026#units；cn-occ-2022-draft#power-electric |
| cn-ind-thermal-power-generation-010 | 检测 | 巡查锅炉汽机及电气设备 | 运行设备 → 现场巡查结果 | 异常位置和状态得到记录 | source-backed | cn-occ-2022-draft#power-boiler；cn-power-hj953-2026#units；cn-occ-2022-draft#power-turbine；cn-occ-2022-draft#power-electric |
| cn-ind-thermal-power-generation-011 | 异常 | 隔离故障设备并执行运行处置 | 故障信号及现场 → 故障隔离状态 | 按实际设备规程确认后续运行条件 | proposed | cn-occ-2022-draft#power-boiler |
| cn-ind-thermal-power-generation-012 | 清洁维护 | 执行运行设备规定保养项目 | 已获作业条件设备 → 保养完成设备 | 设备状态满足运行或检修要求 | source-backed | cn-occ-2022-draft#power-boiler |
| cn-ind-thermal-power-generation-013 | 检测 | 验收检修后设备试运行 | 检修设备 → 试运验收记录 | 按设备试运要求确认可移交 | source-backed | cn-occ-2022-draft#power-boiler |
| cn-ind-thermal-power-generation-014 | 交付 | 交接机组运行参数和未结事项 | 运行记录 → 接班信息 | 参数异常与检修状态完整可追溯 | proposed | cn-occ-2022-draft#power-boiler |

阶段缺口：返工

- 装置和控制系统的实际现场/远程劳动分工尚待核实；不得把有自动控制参数当作人工需求已消失。
- 启停并网是必要数字及设备操作；跨部门监护和许可细节待专项规程。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 城镇燃气LNG站接收、储存及供气操作

代码45；城镇燃气站，门站前长输管线属其他场景。液化工厂和上游油气开采不包含。

流程来源：cn-gas-gb55009-2021。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-lng-station-001 | 准备 | 确认LNG装卸车辆停位和防移动措施 | 罐车及装卸位 → 固定车辆 | 车辆移动风险按装卸要求受控 | source-backed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#lng |
| cn-ind-lng-station-002 | 准备 | 检查装卸连接及紧急切断装置 | 装卸臂和联锁 → 可用连接 | 连接和切断能力符合场站要求 | source-backed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#lng |
| cn-ind-lng-station-003 | 准备 | 确认装卸设备防静电状态 | 车辆设备及接地 → 确认记录 | 防静电状态满足作业条件 | source-backed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#lng |
| cn-ind-lng-station-004 | 准备 | 预冷低温设备及管路 | 低温设备管路 → 预冷系统 | 具备接收低温介质条件 | source-backed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#lng |
| cn-ind-lng-station-005 | 作业 | 卸收LNG并转入指定储罐 | 罐车LNG → 储罐内LNG | 储罐与批次及操作条件相符 | source-backed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#lng |
| cn-ind-lng-station-006 | 检测 | 监测储罐液位温度压力 | LNG储罐 → 监测结果 | 报警和运行偏差可识别 | source-backed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#lng |
| cn-ind-lng-station-007 | 作业 | 处理并调节燃气供气压力 | 待供燃气 → 调压燃气 | 供气状态满足下游条件 | source-backed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#operations |
| cn-ind-lng-station-008 | 检测 | 检查供出燃气质量状态 | 燃气检验信息 → 质量判定 | 不合格气体在供出前识别 | proposed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#operations |
| cn-ind-lng-station-009 | 异常 | 处置紧急切断原因后现场复位 | 切断设备及故障原因 → 已确认复位设备 | 先消除故障再按规范人工复位 | source-backed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#lng |
| cn-ind-lng-station-010 | 清洁维护 | 检查并保养储运设备及阀件 | 场站设备阀件 → 保养后设备 | 状态符合投用要求 | source-backed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#operations |
| cn-ind-lng-station-011 | 交付 | 计量并交接供出燃气 | 可供燃气及计量系统 → 下游接收记录 | 气量气质和时间可追溯 | source-backed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#operations |

阶段缺口：交接、返工

- 气化器运行、BOG回收、装卸脱开、置换放散和受限空间检修尚缺逐项原始流程；未把设计要求当作实际人工作业时间。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 液化石油气气瓶接收、充装与交付

代码45；限充装单位，气瓶制造与定期检验单位按执行主体另计。

流程来源：cn-gas-gb55009-2021。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-lpg-cylinder-001 | 准备 | 核验待充气瓶身份和检验状态 | 回收气瓶 → 可充装判定 | 只接收符合追溯和检验要求气瓶 | source-backed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#cylinder |
| cn-ind-lpg-cylinder-002 | 作业 | 将气瓶连接至充装设备 | 可充气瓶 → 连接气瓶 | 连接按设备要求确认 | proposed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#cylinder |
| cn-ind-lpg-cylinder-003 | 作业 | 充装液化石油气至气瓶 | 气瓶及LPG → 充装气瓶 | 充装量按气瓶和规定要求确认 | source-backed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#cylinder |
| cn-ind-lpg-cylinder-004 | 检测 | 检验充装气瓶泄漏 | 充装气瓶 → 检漏结果 | 不合格气瓶不交付 | source-backed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#cylinder |
| cn-ind-lpg-cylinder-005 | 检测 | 复核气瓶充装重量 | 充装气瓶 → 复核记录 | 充装量按气瓶要求确认 | source-backed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#cylinder |
| cn-ind-lpg-cylinder-006 | 异常 | 隔离不符合交付要求气瓶 | 不合格气瓶 → 待处置气瓶 | 与合格瓶物理区分并记录 | proposed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#cylinder |
| cn-ind-lpg-cylinder-007 | 交付 | 标识并移交合格充装气瓶 | 合格气瓶 → 可追溯交付气瓶 | 标识检验结果与瓶号一致 | source-backed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#cylinder |
| cn-ind-lpg-cylinder-008 | 清洁维护 | 保养充装阀件和安全装置 | 充装设备 → 可用装置 | 按设备要求检查维护 | source-backed | cn-occ-2022-draft#gas；cn-gas-gb55009-2021#operations |

阶段缺口：交接、返工

- 残液残气回收、超装倒气、阀门更换、气瓶搬运与返修须进一步核对许可边界和作业规范。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 集中污水处理的预处理、生化与深度处理

代码46候选：集中处理单位；制造企业厂内污水处理归其执行主体并去重，危险废物处置不自动归46。

流程来源：cn-wastewater-hj978-2018。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-central-wastewater-001 | 交接 | 核对接收废水的来源及约定水质水量 | 进水与接收协议 → 接收信息 | 来源及超约定情况可追溯 | source-backed | cn-occ-2022-draft#wastewater；cn-wastewater-hj978-2018#treatment |
| cn-ind-central-wastewater-002 | 作业 | 通过格栅去除进水大块杂物 | 进水 → 筛后水与栅渣 | 满足后续设备进水条件 | source-backed | cn-occ-2022-draft#wastewater；cn-wastewater-hj978-2018#treatment |
| cn-ind-central-wastewater-003 | 作业 | 调节进水池水量与水质波动 | 进水和调节池 → 均衡进水 | 适合后续处理设施工况 | source-backed | cn-occ-2022-draft#wastewater；cn-wastewater-hj978-2018#treatment |
| cn-ind-central-wastewater-004 | 作业 | 分离废水油污及悬浮杂物 | 含油或悬浮物废水 → 预处理水和分离物 | 适合后续处理路线 | source-backed | cn-occ-2022-draft#wastewater；cn-wastewater-hj978-2018#treatment |
| cn-ind-central-wastewater-005 | 准备 | 配制并投加废水处理药剂 | 药剂工艺水及废水 → 投加药液 | 药剂与处理工艺匹配 | source-backed | cn-occ-2022-draft#wastewater；cn-wastewater-hj978-2018#treatment |
| cn-ind-central-wastewater-006 | 作业 | 调节废水酸碱状态 | 待中和废水 → 中和水 | 满足后续工艺或排放要求 | source-backed | cn-occ-2022-draft#wastewater；cn-wastewater-hj978-2018#treatment |
| cn-ind-central-wastewater-007 | 作业 | 混凝沉淀分离废水污染物 | 废水和絮凝剂 → 澄清水与污泥 | 沉淀工艺状态满足处理要求 | source-backed | cn-occ-2022-draft#wastewater；cn-wastewater-hj978-2018#treatment |
| cn-ind-central-wastewater-008 | 作业 | 运行厌氧或缺氧处理设施 | 适用进水与污泥 → 阶段处理水 | 按具体生物工艺维持条件 | source-backed | cn-occ-2022-draft#wastewater；cn-wastewater-hj978-2018#treatment |
| cn-ind-central-wastewater-009 | 作业 | 运行好氧曝气处理设施 | 阶段处理水与空气 → 生化处理水 | 曝气及工艺参数符合运行要求 | source-backed | cn-occ-2022-draft#wastewater；cn-wastewater-hj978-2018#treatment |
| cn-ind-central-wastewater-010 | 作业 | 分离生化处理水与污泥 | 混合液 → 出水与污泥 | 泥水分离满足后续条件 | source-backed | cn-occ-2022-draft#wastewater；cn-wastewater-hj978-2018#treatment |
| cn-ind-central-wastewater-011 | 作业 | 采用适用滤池或膜设备深度处理 | 待深度处理水 → 深度处理水 | 按所选工艺确认出水要求 | source-backed | cn-occ-2022-draft#wastewater；cn-wastewater-hj978-2018#treatment |
| cn-ind-central-wastewater-012 | 作业 | 消毒待排或回用水 | 处理水与消毒系统 → 消毒水 | 按出水用途满足消毒要求 | source-backed | cn-occ-2022-draft#wastewater；cn-wastewater-hj978-2018#treatment |
| cn-ind-central-wastewater-013 | 作业 | 处理污水工艺产生的污泥和浓液 | 污泥及浓液 → 待利用或处置物料 | 去向及处理状态可追溯 | source-backed | cn-occ-2022-draft#wastewater；cn-wastewater-hj978-2018#outlet |
| cn-ind-central-wastewater-014 | 检测 | 检查进出水及运行仪表状态 | 水样与仪表数据 → 运行质量记录 | 结果对应采样点和时段 | proposed | cn-occ-2022-draft#wastewater |
| cn-ind-central-wastewater-015 | 异常 | 调整异常水质条件下的处理运行 | 异常水质及设备 → 运行处置记录 | 按处理能力和许可要求决定恢复条件 | proposed | cn-occ-2022-draft#wastewater |
| cn-ind-central-wastewater-016 | 清洁维护 | 维护废水处理设备和仪表 | 待保养设施 → 维护后设施 | 检测控制与设备功能按要求恢复 | source-backed | cn-occ-2022-draft#wastewater |
| cn-ind-central-wastewater-017 | 交付 | 将符合要求出水排放或交付回用单位 | 出水和排放信息 → 可追溯出水记录 | 出口去向水质和时间对应 | source-backed | cn-occ-2022-draft#wastewater；cn-wastewater-hj978-2018#outlet |

阶段缺口：返工

- 工艺分支因来水与排放要求选择；不把A/O、SBR、MBR及多种膜法当作同一厂全部必经。
- 清池、膜反洗化学清洗、污泥脱水运输、加药搬运、有限空间作业仍缺详细已读流程；工业废水职业不能自动代表全部城镇污水厂分工。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 动物原毛开松、清洗和炭化

纺织17的纺前毛纤维加工；原毛分级详细检验及精梳、羊毛纺后续另待拓展，洗毛工法按实际选择。

流程来源：cn-textile-hj861-2017。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-wool-preparation-001 | 准备 | 接收并按原毛类别建立加工批次 | 分选后动物原毛 → 待加工原毛批 | 原料来源类别及混批规则可追踪 | proposed | cn-occ-2022-draft#fiber-pre；cn-textile-hj861-2017#units |
| cn-ind-wool-preparation-002 | 作业 | 开松原毛并除去夹杂 | 原毛与开松设备 → 初步开松毛 | 适合后续清洗且粗杂移除 | source-backed | cn-occ-2022-draft#fiber-pre；cn-textile-hj861-2017#units |
| cn-ind-wool-preparation-003 | 准备 | 配制洗毛或炭化所需工作液 | 原料及工艺配方 → 可用工作液 | 浓度用量依毛种与产品工艺确认 | source-backed | cn-occ-2022-draft#fiber-pre；cn-textile-hj861-2017#units |
| cn-ind-wool-preparation-004 | 作业 | 清洗原毛上的污垢和汗脂 | 开松毛与洗毛设施 → 清洗毛 | 清洁程度满足纺前质量要求 | source-backed | cn-occ-2022-draft#fiber-pre；cn-textile-hj861-2017#units |
| cn-ind-wool-preparation-005 | 作业 | 按需炭化处理原毛草杂 | 需炭化原毛及设施 → 处理毛 | 去杂且纤维品质满足所用工艺 | source-backed | cn-occ-2022-draft#fiber-pre；cn-textile-hj861-2017#units |
| cn-ind-wool-preparation-006 | 作业 | 将洗后毛进行脱水和烘干 | 湿净毛 → 待后续加工净毛 | 含水及温度按产品工艺确认 | proposed | cn-occ-2022-draft#fiber-pre；cn-textile-hj861-2017#units |
| cn-ind-wool-preparation-007 | 检测 | 检查洗净毛残杂水分及损伤 | 处理毛样本 → 质量状态 | 按产品标准评定后方可流转 | proposed | cn-occ-2022-draft#fiber-pre；cn-textile-hj861-2017#units |
| cn-ind-wool-preparation-008 | 交付 | 分批交出处理毛至纺纱工序 | 完成净毛 → 可追溯毛料批 | 批号与处置状态清楚 | proposed | cn-occ-2022-draft#fiber-pre |

阶段缺口：交接、异常、返工、清洁维护

- 异常、返工、清洗设备和排污处理的逐步SOP缺口保留。麻脱胶、蚕茧加工和丝纺不由本洗毛场景代表。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 棉纺开清梳并粗纱至细纱络筒

纺织17棉纺链条；按纱种及设备选择工艺，不把所有可选机组视作每条生产线必经。

流程来源：cn-textile-hj861-2017。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-cotton-spinning-001 | 准备 | 拆包排放原棉并拣除杂物 | 棉包与排包图 → 已排棉台 | 品种批次顺序按配棉计划 | source-backed | cn-occ-2022-draft#cotton-pre；cn-textile-hj861-2017#units |
| cn-ind-cotton-spinning-002 | 作业 | 开清混棉并形成可梳理纤维 | 已排棉料 → 开松混合纤维 | 去杂混合满足纺纱工艺 | source-backed | cn-occ-2022-draft#cotton-pre；cn-textile-hj861-2017#units |
| cn-ind-cotton-spinning-003 | 作业 | 梳理纤维并形成生条 | 开松纤维 → 生条 | 单纤维化混合和条状态满足工艺 | source-backed | cn-occ-2022-draft#cotton-pre；cn-textile-hj861-2017#units |
| cn-ind-cotton-spinning-004 | 作业 | 并合牵伸纤维条形成熟条 | 生条或半制条 → 熟条或条卷 | 配条及牵伸状态满足工艺 | source-backed | cn-occ-2022-draft#cotton-pre；cn-textile-hj861-2017#units |
| cn-ind-cotton-spinning-005 | 作业 | 给粗纱机换条接头并制成粗纱 | 熟条条筒 → 粗纱 | 喂入及粗纱成形满足工艺 | source-backed | cn-occ-2022-draft#cotton-pre；cn-textile-hj861-2017#units |
| cn-ind-cotton-spinning-006 | 交接 | 落取粗纱并转至细纱供给位置 | 满粗纱管或自动落纱装置 → 细纱待用粗纱 | 批次对应且卷装不受损 | source-backed | cn-occ-2022-draft#cotton-pre；cn-textile-hj861-2017#units；cn-occ-2022-draft#spinning |
| cn-ind-cotton-spinning-007 | 作业 | 给细纱机换粗纱并生头纺纱 | 粗纱或条筒 → 连续纺成管纱 | 纱支卷装按工艺确认 | source-backed | cn-occ-2022-draft#cotton-pre；cn-textile-hj861-2017#units；cn-occ-2022-draft#spinning |
| cn-ind-cotton-spinning-008 | 作业 | 落取满管细纱并重新生头开车 | 满管纱及落纱装置 → 下机管纱与恢复运行机台 | 纱管流转和重启状态正常 | source-backed | cn-occ-2022-draft#cotton-pre；cn-textile-hj861-2017#units；cn-occ-2022-draft#spinning |
| cn-ind-cotton-spinning-009 | 作业 | 络筒清纱并完成接头 | 管纱及络筒设施 → 筒子纱 | 筒形接头和清纱质量满足规格 | source-backed | cn-occ-2022-draft#cotton-pre；cn-textile-hj861-2017#units；cn-occ-2022-draft#spinning |
| cn-ind-cotton-spinning-010 | 作业 | 按产品要求并线捻线或制线 | 筒纱与指定机组 → 多股线或线团 | 股数捻度卷装按订单要求 | source-backed | cn-occ-2022-draft#cotton-pre；cn-textile-hj861-2017#units；cn-occ-2022-draft#spinning |
| cn-ind-cotton-spinning-011 | 检测 | 巡检各纺纱机台的运行及纱线质量 | 在制纱条与机台 → 巡检状态 | 断头纱疵和运转异常可识别 | source-backed | cn-occ-2022-draft#cotton-pre；cn-textile-hj861-2017#units；cn-occ-2022-draft#spinning |
| cn-ind-cotton-spinning-012 | 异常 | 查明纺纱停台与断头原因 | 断头停台机位 → 处置结果 | 异常原因和恢复条件确认 | source-backed | cn-occ-2022-draft#cotton-pre；cn-textile-hj861-2017#units |
| cn-ind-cotton-spinning-013 | 返工 | 重接断纱并剔除可处理纱疵 | 断头或纱疵段 → 可继续加工纱线 | 接头及品质符合纱种工艺 | source-backed | cn-occ-2022-draft#cotton-pre；cn-textile-hj861-2017#units；cn-occ-2022-draft#spinning |
| cn-ind-cotton-spinning-014 | 清洁维护 | 回收回花并清洁纺纱机台地面 | 回花落料与机台 → 已分类回收物和清洁区域 | 清扫防混纤及机台恢复按制度执行 | source-backed | cn-occ-2022-draft#cotton-pre；cn-textile-hj861-2017#units |
| cn-ind-cotton-spinning-015 | 交付 | 标识并交出成形纱卷筒 | 完成纱卷与生产记录 → 后道待用纱线批 | 批号和质量状态与订单对应 | proposed | cn-occ-2022-draft#cotton-pre |

阶段缺口：

- 纺纱在HJ861中为选填单元，不是完整过程规范；全流程主依据目前来自职业任务，棉纱产品验收标准和现场SOP待补。精梳差异、自动接头失败人工处置未完成研究。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 经纱整经上浆、机织与坯布验修

织造17的经纬机织；不代表经编、纬编、非织造或工艺手织。

流程来源：cn-textile-hj861-2017。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-warp-weaving-001 | 准备 | 插挂纱筒并整理整经通道 | 纱筒和整经架 → 可运行经纱阵列 | 接头过结和排列满足经轴要求 | source-backed | cn-occ-2022-draft#weaving；cn-textile-hj861-2017#units |
| cn-ind-warp-weaving-002 | 作业 | 整经并完成经轴落轴倒轴 | 纱线及整经设备 → 经轴或织轴 | 纱线顺序张力和轴卷符合品种 | source-backed | cn-occ-2022-draft#weaving；cn-textile-hj861-2017#units |
| cn-ind-warp-weaving-003 | 准备 | 配轴上机并调制浆纱工作液 | 经轴配方和浆料 → 待浆经轴和浆液 | 配轴批次及浆液符合工艺 | source-backed | cn-occ-2022-draft#weaving；cn-textile-hj861-2017#units |
| cn-ind-warp-weaving-004 | 作业 | 调控浆槽烘房及速度完成上浆 | 经纱浆液与机组 → 浆轴 | 上浆与伸长状态符合品种工艺 | source-backed | cn-occ-2022-draft#weaving；cn-textile-hj861-2017#units |
| cn-ind-warp-weaving-005 | 检测 | 核对浆染纱色光与纱线状态 | 浆染纱线和标样 → 质量检查结果 | 色差色条及断头缺陷有记录 | source-backed | cn-occ-2022-draft#weaving；cn-textile-hj861-2017#units |
| cn-ind-warp-weaving-006 | 交接 | 落下浆轴并交入织造准备 | 完成浆轴 → 可穿经上机轴 | 轴号与织物任务对应 | source-backed | cn-occ-2022-draft#weaving；cn-textile-hj861-2017#units |
| cn-ind-warp-weaving-007 | 作业 | 穿经或结经并更换织机经轴 | 经轴与穿经工具 → 可织织轴 | 经路连接及安装按组织结构核对 | source-backed | cn-occ-2022-draft#weaving；cn-textile-hj861-2017#units |
| cn-ind-warp-weaving-008 | 准备 | 安装织机附件并设定织造参数 | 织轴附件和品种工艺 → 待运行织机 | 绞边经路和参数核对完成 | source-backed | cn-occ-2022-draft#weaving；cn-textile-hj861-2017#units |
| cn-ind-warp-weaving-009 | 作业 | 供应或更换纬纱并处理回丝 | 纬纱管筒与机台 → 稳定纬纱供给 | 品种和供纬位置正确 | source-backed | cn-occ-2022-draft#weaving；cn-textile-hj861-2017#units |
| cn-ind-warp-weaving-010 | 作业 | 操控织机形成经纬织物 | 经纬纱和设定织机 → 坯布 | 织物组织与运行状态符合工艺 | source-backed | cn-occ-2022-draft#weaving；cn-textile-hj861-2017#units |
| cn-ind-warp-weaving-011 | 检测 | 巡检布面织轴和纬纱状态 | 在织坯布与纱路 → 巡检结果 | 异常疵点及时识别 | source-backed | cn-occ-2022-draft#weaving；cn-textile-hj861-2017#units |
| cn-ind-warp-weaving-012 | 异常 | 查明并处理断经断纬停台 | 停台织机 → 恢复条件 | 断纱及相关隐患已处理 | source-backed | cn-occ-2022-draft#weaving；cn-textile-hj861-2017#units |
| cn-ind-warp-weaving-013 | 作业 | 落取满布辊并送至验布 | 织机布辊 → 待验坯布卷 | 卷布与批次标识对应 | source-backed | cn-occ-2022-draft#weaving；cn-textile-hj861-2017#units |
| cn-ind-warp-weaving-014 | 检测 | 运行验布机检查织物缺陷 | 坯布卷与验布设备 → 缺陷及等级结果 | 检验范围与标识按产品要求 | source-backed | cn-occ-2022-draft#weaving；cn-textile-hj861-2017#units |
| cn-ind-warp-weaving-015 | 返工 | 修补清洗或开剪允许处理的布疵 | 验出的缺陷布 → 处理后坯布 | 按产品可修范围处理并复检 | source-backed | cn-occ-2022-draft#weaving；cn-textile-hj861-2017#units |
| cn-ind-warp-weaving-016 | 清洁维护 | 清洗浆槽机台并处理废纱 | 结束机台及残浆废纱 → 洁净机台和回收物 | 防混纱污染且设备按规程复位 | source-backed | cn-occ-2022-draft#weaving；cn-textile-hj861-2017#units |
| cn-ind-warp-weaving-017 | 交付 | 记录并交出验修后的坯布批次 | 合格布卷与记录 → 后续染整可接收坯布 | 批号米数与等级信息待产品SOP补核 | proposed | cn-occ-2022-draft#weaving |

阶段缺口：

- 织机型号及产品结构改变补纱接头等作业；机台自动功能不证明无需人工。提花制版与机织前端张力验收细则待补。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 织物染整前处理和进出布

含棉织物退煮漂烧毛与适用丝光工法；蚕丝脱胶、涤纶碱减量条件各异，暂列未展开。

流程来源：cn-textile-hj861-2017。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-dye-pretreatment-001 | 准备 | 配制并测定前处理工作液 | 工艺配方与原辅料 → 合格工作液 | 浓度和配比满足所用织物工艺 | source-backed | cn-occ-2022-draft#dye-pre；cn-textile-hj861-2017#units |
| cn-ind-dye-pretreatment-002 | 作业 | 缝头接布并穿引织物 | 待处理坯布 → 连续进布端 | 接头方向牢固且与机组匹配 | source-backed | cn-occ-2022-draft#dye-pre；cn-textile-hj861-2017#units |
| cn-ind-dye-pretreatment-003 | 作业 | 调节吸边对中装置保持平直进布 | 引入织物与导布装置 → 稳定进布 | 位置张力和展幅符合工艺 | source-backed | cn-occ-2022-draft#dye-pre；cn-textile-hj861-2017#units |
| cn-ind-dye-pretreatment-004 | 作业 | 按含棉织物工艺操控烧毛处理 | 适用织物与烧毛设施 → 烧毛后织物 | 毛羽处理满足品种质量要求 | source-backed | cn-occ-2022-draft#dye-pre；cn-textile-hj861-2017#units |
| cn-ind-dye-pretreatment-005 | 作业 | 操控退浆煮练漂白或丝光工序 | 织物工作液与处理设施 → 完成指定化学前处理织物 | 温压车速时间和浓度按产品工艺控制 | source-backed | cn-occ-2022-draft#dye-pre；cn-textile-hj861-2017#units |
| cn-ind-dye-pretreatment-006 | 作业 | 堆置或汽蒸并水洗烘燥织物 | 按工艺反应的织物 → 后处理织物 | 步骤时间及残液状态符合工艺 | source-backed | cn-occ-2022-draft#dye-pre；cn-textile-hj861-2017#units |
| cn-ind-dye-pretreatment-007 | 检测 | 检查落布毛效白度纬斜和残液指标 | 处理织物与测量条件 → 落布检验结果 | 指标依品种标准判定 | source-backed | cn-occ-2022-draft#dye-pre；cn-textile-hj861-2017#units |
| cn-ind-dye-pretreatment-008 | 异常 | 处置前处理设备运行异常 | 异常机组或布面信号 → 处置记录 | 按SOP隔离原因并确认恢复 | source-backed | cn-occ-2022-draft#dye-pre；cn-textile-hj861-2017#units |
| cn-ind-dye-pretreatment-009 | 返工 | 处理前处理布面病疵 | 已识别病疵织物 → 返修待验织物 | 可返修范围与复验依产品工艺 | source-backed | cn-occ-2022-draft#dye-pre；cn-textile-hj861-2017#units |
| cn-ind-dye-pretreatment-010 | 清洁维护 | 分类收集废物并清洁维护设备 | 废料与处理设施 → 已清洁设备及分类废物 | 按物料性质分类并防交叉污染 | source-backed | cn-occ-2022-draft#dye-pre；cn-textile-hj861-2017#units |
| cn-ind-dye-pretreatment-011 | 交付 | 登记批次工艺与检验记录交下一工序 | 完成前处理织物 → 染色印花待用批次 | 处理状态与批次对应 | proposed | cn-occ-2022-draft#dye-pre |

阶段缺口：交接

- 不同前处理化学工序目前是可选择子工艺，需逐品种展开而不能按一个全能设备折算工时。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 纤维纱线织物染色及后洗

染整17；具体纤维与连续/间歇染色分别保留工艺条件，当前不输出通用色差阈值。

流程来源：cn-textile-hj861-2017。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-textile-dyeing-001 | 准备 | 按标样试染并核对染色处方 | 染物标样与打样设备 → 确认色样及处方 | 色样和技术数据按订单确认 | source-backed | cn-occ-2022-draft#dyeing；cn-textile-hj861-2017#units |
| cn-ind-textile-dyeing-002 | 检测 | 检查被染物的染前质量条件 | 待染批次 → 染前接收结果 | 毛效幅宽含碱及平整满足工艺 | source-backed | cn-occ-2022-draft#dyeing；cn-textile-hj861-2017#units |
| cn-ind-textile-dyeing-003 | 准备 | 配制染液并供至染缸或轧槽 | 配方染化料与化料设备 → 已供工作液 | 批次浓度用量按处方核对 | source-backed | cn-occ-2022-draft#dyeing；cn-textile-hj861-2017#units |
| cn-ind-textile-dyeing-004 | 作业 | 操控染色设备完成规定染色程序 | 被染物与染液 → 染色织物或纱纤 | 过程条件符合材料品种工艺 | source-backed | cn-occ-2022-draft#dyeing；cn-textile-hj861-2017#units |
| cn-ind-textile-dyeing-005 | 作业 | 洗涤并按工艺固色染成品 | 染成品 → 完成后洗固色材料 | 残液及色牢度目标按工艺确认 | source-backed | cn-occ-2022-draft#dyeing；cn-textile-hj861-2017#units |
| cn-ind-textile-dyeing-006 | 作业 | 对染成品脱水并烘干 | 湿染成品 → 可进入后整材料 | 干湿状态满足后续工艺 | source-backed | cn-occ-2022-draft#dyeing；cn-textile-hj861-2017#units |
| cn-ind-textile-dyeing-007 | 异常 | 查明并处理染色过程异常 | 异常染色批次或设备 → 处置记录 | 原因及继续或隔离条件确认 | source-backed | cn-occ-2022-draft#dyeing；cn-textile-hj861-2017#units |
| cn-ind-textile-dyeing-008 | 检测 | 对完成染批复核色光与色牢度 | 染成品与标样 → 质量结果 | 检验方法及判据待产品标准确认 | proposed | cn-occ-2022-draft#dyeing |
| cn-ind-textile-dyeing-009 | 返工 | 按确认处方复染不合格染批 | 允许返染批次 → 待复验染物 | 可返染条件和品质风险须现场确认 | proposed | cn-occ-2022-draft#dyeing |
| cn-ind-textile-dyeing-010 | 清洁维护 | 回收分类废料并清洁维护染色设备 | 余液废物与染机 → 已处理废物和洁净机台 | 批次切换防污染且按规程排放回收 | source-backed | cn-occ-2022-draft#dyeing；cn-textile-hj861-2017#units |
| cn-ind-textile-dyeing-011 | 交付 | 登记染色过程并交付后整理批次 | 染批与记录 → 后整接收材料 | 批次和异常处置状态可追溯 | proposed | cn-occ-2022-draft#dyeing |

阶段缺口：交接

- 质量复核和返染拟定任务显式proposed；不得据此声称所有不合格批次能够返染。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 织物印花制网、印制及固色

平网圆网工艺为主，传统制网与数码印花不应叠加；花版制备按本企业执行记录，外协时移至实际执行行业。

流程来源：cn-textile-hj861-2017。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-textile-printing-001 | 准备 | 分色处理花稿并制作印花版数据 | 花稿与色版要求 → 分色版稿 | 花型尺寸套色与客户稿相符 | source-backed | cn-occ-2022-draft#textile-print；cn-textile-hj861-2017#units |
| cn-ind-textile-printing-002 | 作业 | 配制感光材料并制成平网或圆网 | 版稿网材和感光材料 → 完成印花网 | 制网清洗曝光烘焙按工艺完成 | source-backed | cn-occ-2022-draft#textile-print；cn-textile-hj861-2017#units |
| cn-ind-textile-printing-003 | 返工 | 修整印花网的纹样瑕疵 | 有瑕疵版网 → 修复版网 | 样纹与版稿核对通过 | source-backed | cn-occ-2022-draft#textile-print；cn-textile-hj861-2017#units |
| cn-ind-textile-printing-004 | 准备 | 检查布坯花网并排列版网刮刀 | 布坯版网刮刀 → 可印配置 | 幅宽纬斜毛效及工具质量符合工艺 | source-backed | cn-occ-2022-draft#textile-print；cn-textile-hj861-2017#units |
| cn-ind-textile-printing-005 | 检测 | 印制小样并核对色光和印制效果 | 配置好的印花条件 → 样印确认结果 | 图案色光与标样相符 | source-backed | cn-occ-2022-draft#textile-print；cn-textile-hj861-2017#units |
| cn-ind-textile-printing-006 | 作业 | 操作印花机将图案印到织物 | 合格布坯及版网色浆 → 印花织物 | 套色图案及布面质量依订单 | source-backed | cn-occ-2022-draft#textile-print；cn-textile-hj861-2017#units |
| cn-ind-textile-printing-007 | 作业 | 调整吸边整纬与张力保持布料运行 | 运行布坯衬布 → 稳定印制路径 | 布面平直张力符合工艺 | source-backed | cn-occ-2022-draft#textile-print；cn-textile-hj861-2017#units |
| cn-ind-textile-printing-008 | 作业 | 汽蒸或焙烘印花织物完成固色 | 印后织物 → 固色织物 | 所选染料体系规定条件完成 | source-backed | cn-occ-2022-draft#textile-print；cn-textile-hj861-2017#units |
| cn-ind-textile-printing-009 | 异常 | 查明并处置印花机组运行异常 | 异常机组或布面信号 → 处置记录 | 原因和恢复条件确认 | source-backed | cn-occ-2022-draft#textile-print；cn-textile-hj861-2017#units |
| cn-ind-textile-printing-010 | 交接 | 卸下版网刮刀并送制网间 | 使用后的辅助工具 → 可追溯返还工具 | 与版号对应且返还状态明确 | source-backed | cn-occ-2022-draft#textile-print；cn-textile-hj861-2017#units |
| cn-ind-textile-printing-011 | 清洁维护 | 回收剩余色浆并清洁制版机台 | 剩浆和制版设施 → 回收物及清洁机台 | 防混色且记录使用回收量 | source-backed | cn-occ-2022-draft#textile-print；cn-textile-hj861-2017#units |
| cn-ind-textile-printing-012 | 交付 | 记录并交出固色后的印花批次 | 完成印花织物和记录 → 后整待接收批次 | 版号工艺和检验状态可追溯 | proposed | cn-occ-2022-draft#textile-print |

阶段缺口：

- 数码墨路维护、喷头堵塞和数码印制控制未完整覆盖；印后水洗及完整质量检验要求待补。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 染整织物定型、功能整理与落布

拉幅、定型、轧光或起绒按品种选择；各工法是可展开子流程而非所有产品必经链。

流程来源：cn-textile-hj861-2017。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-textile-finishing-001 | 检测 | 检查待整理织物幅宽色牢度和干湿状态 | 待整织物 → 整理前验收状态 | 来料条件满足指定整理工艺 | source-backed | cn-occ-2022-draft#textile-finish；cn-textile-hj861-2017#units |
| cn-ind-textile-finishing-002 | 准备 | 称配并测定功能整理工作液 | 配方和助剂 → 合格整理液 | 浓度配比与产品功能要求一致 | source-backed | cn-occ-2022-draft#textile-finish；cn-textile-hj861-2017#units |
| cn-ind-textile-finishing-003 | 作业 | 缝接并引入织物后调节对中 | 待整布卷 → 平直连续进布 | 接头方向与进布路径满足工艺 | source-backed | cn-occ-2022-draft#textile-finish；cn-textile-hj861-2017#units |
| cn-ind-textile-finishing-004 | 作业 | 操控拉幅干湿热或表面整理设备 | 织物与工艺设备 → 完成指定整理织物 | 幅宽手感外观及功能依工艺验收 | source-backed | cn-occ-2022-draft#textile-finish；cn-textile-hj861-2017#units |
| cn-ind-textile-finishing-005 | 作业 | 操作定型机并检查废气余热系统 | 织物及定型机组 → 定型织物与运行状态 | 定型过程及配套系统按规程运行 | source-backed | cn-occ-2022-draft#textile-finish；cn-textile-hj861-2017#units |
| cn-ind-textile-finishing-006 | 检测 | 核对落布质量与标样 | 整理后织物 → 落布检验记录 | 幅宽和所需质量达到品种要求 | source-backed | cn-occ-2022-draft#textile-finish；cn-textile-hj861-2017#units |
| cn-ind-textile-finishing-007 | 返工 | 处理允许修整的落布病疵 | 有病疵织物 → 修整待验布 | 处理范围按产品SOP确认 | source-backed | cn-occ-2022-draft#textile-finish；cn-textile-hj861-2017#units |
| cn-ind-textile-finishing-008 | 异常 | 排查后整理设备异常 | 异常机组 → 处置记录 | 设备恢复条件明确 | source-backed | cn-occ-2022-draft#textile-finish；cn-textile-hj861-2017#units |
| cn-ind-textile-finishing-009 | 清洁维护 | 记录并回收可利用剩余整理液 | 未使用整理液 → 回收料及记录 | 品种浓度与再次使用条件可追踪 | source-backed | cn-occ-2022-draft#textile-finish；cn-textile-hj861-2017#units |
| cn-ind-textile-finishing-010 | 交付 | 登记工艺与检验状态并交出整理布 | 完成布卷及记录 → 下道待用布卷 | 批次和质量状态对应 | proposed | cn-occ-2022-draft#textile-finish |

阶段缺口：交接

- 各功能整理的产品性能检验、分卷包装、清洗换色及异常恢复SOP未完全展开。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 砂型金属铸件的造型制芯、浇注与清理

C3391/3392金属制品制造；区别于钢厂连续铸坯。砂型工艺，熔模压铸离心等特殊铸造另待展开。

流程来源：cn-foundry-hj1115-2020。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-sand-foundry-001 | 准备 | 核对铸造金属炉料及辅料批次 | 生铁废钢回炉料和配料计划 → 待用炉料 | 材质及批次满足目标铸件要求 | proposed | cn-occ-2022-draft#foundry；cn-foundry-hj1115-2020#units |
| cn-ind-sand-foundry-002 | 作业 | 配制型砂芯砂及铸型涂料 | 砂料黏结剂和工艺配方 → 型芯材料 | 配料和工艺性能依铸件要求确认 | source-backed | cn-occ-2022-draft#foundry；cn-foundry-hj1115-2020#units |
| cn-ind-sand-foundry-003 | 作业 | 使用造型设备或工具制成铸型 | 型砂与模样 → 铸型 | 型腔几何及完整性满足工艺 | source-backed | cn-occ-2022-draft#foundry；cn-foundry-hj1115-2020#units |
| cn-ind-sand-foundry-004 | 作业 | 制成并烘干砂芯 | 芯砂和芯盒 → 可装配砂芯 | 芯形强度干燥条件符合工艺 | source-backed | cn-occ-2022-draft#foundry；cn-foundry-hj1115-2020#units |
| cn-ind-sand-foundry-005 | 作业 | 装配砂芯并合箱 | 铸型砂芯及合箱装置 → 待浇铸型 | 定位和封合满足铸件工艺 | source-backed | cn-occ-2022-draft#foundry；cn-foundry-hj1115-2020#units |
| cn-ind-sand-foundry-006 | 作业 | 熔化炉料并调整金属液质量 | 炉料与熔炼炉 → 合格待浇金属液 | 温度成分纯净度按材质目标控制 | source-backed | cn-occ-2022-draft#foundry；cn-foundry-hj1115-2020#units |
| cn-ind-sand-foundry-007 | 检测 | 测量熔炼金属温度与成分 | 金属液和检测工具 → 熔炼检验结果 | 所需温度成分有可核对记录 | source-backed | cn-occ-2022-draft#foundry；cn-foundry-hj1115-2020#scope |
| cn-ind-sand-foundry-008 | 交接 | 确认待浇型与金属液的批次匹配 | 合箱型与炉次信息 → 浇注准备确认 | 材质型号和就绪状态相符 | proposed | cn-occ-2022-draft#foundry |
| cn-ind-sand-foundry-009 | 作业 | 将金属液浇入铸型并控制凝固冷却 | 待浇型与金属液 → 凝固铸件 | 浇冷过程按铸件工艺执行 | source-backed | cn-occ-2022-draft#foundry；cn-foundry-hj1115-2020#units |
| cn-ind-sand-foundry-010 | 作业 | 落砂分离铸件并回收旧砂 | 冷却型砂铸件 → 初清铸件和旧砂 | 分离不损坏铸件且材料分流 | source-backed | cn-occ-2022-draft#foundry；cn-foundry-hj1115-2020#units |
| cn-ind-sand-foundry-011 | 清洁维护 | 处理回用旧砂并补配新砂 | 分离旧砂 → 可再利用砂料 | 再生质量及回用条件经确认 | source-backed | cn-occ-2022-draft#foundry；cn-foundry-hj1115-2020#units |
| cn-ind-sand-foundry-012 | 作业 | 抛丸或打磨清理铸件表面 | 脱砂铸件 → 清理后铸件 | 表面残砂和规定余量处理完成 | source-backed | cn-occ-2022-draft#foundry；cn-foundry-hj1115-2020#units |
| cn-ind-sand-foundry-013 | 检测 | 检查清理铸件尺寸表面及内部缺陷 | 清理铸件 → 质量判定记录 | 检验方式和项目待产品图样SOP补核 | proposed | cn-occ-2022-draft#foundry |
| cn-ind-sand-foundry-014 | 返工 | 修补准许返修的铸件缺陷 | 已确认可修铸件 → 修补待验铸件 | 返修方案批准且复验符合用途要求 | source-backed | cn-occ-2022-draft#foundry；cn-foundry-hj1115-2020#units |
| cn-ind-sand-foundry-015 | 异常 | 隔离不可放行铸件并报告异常炉次 | 质量异常铸件 → 隔离处置批次 | 失效影响及去向待专业评审 | proposed | cn-occ-2022-draft#foundry |
| cn-ind-sand-foundry-016 | 清洁维护 | 维护保养造型熔炼和清理工装 | 结束运行工装 → 可用工艺装备 | 按设备规程检查复位 | source-backed | cn-occ-2022-draft#foundry；cn-foundry-hj1115-2020#units |
| cn-ind-sand-foundry-017 | 交付 | 标识合格铸件并交下一机械加工环节 | 合格铸件和炉次记录 → 可追溯铸件批 | 批号材质质量状态对应 | proposed | cn-occ-2022-draft#foundry |

阶段缺口：

- 热处理涂装和机加工虽在生产单元中识别，本场景未展开；浇冒口切除、夹芯吊运、浇包维护、防错浇和特殊缺陷试验仍需补规范。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 橡胶配料混炼、半成品与轮胎胶管胶带成型

29门类，配方胶到硫化制品；轮胎、胶管、胶带、零件有不同成型装配条件，现为工艺骨架，后续必须逐产品展开。

流程来源：cn-rubber-plastic-hj1122-2020。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-rubber-mixing-forming-001 | 准备 | 计量橡胶与配合剂组成批料 | 橡胶助剂和配方 → 已计量批料 | 组分批号和用量与配方一致 | source-backed | cn-occ-2022-draft#rubber；cn-rubber-plastic-hj1122-2020#rubber |
| cn-ind-rubber-mixing-forming-002 | 作业 | 破胶塑炼并混炼胶料 | 计配胶料和炼胶设备 → 塑炼胶或混炼胶 | 混炼工艺与质量状态符合配方要求 | source-backed | cn-occ-2022-draft#rubber；cn-rubber-plastic-hj1122-2020#rubber |
| cn-ind-rubber-mixing-forming-003 | 作业 | 挤出或压延混炼胶形成半成品 | 混炼胶 → 规定截面或胶片 | 几何和材料状态满足产品工艺 | source-backed | cn-occ-2022-draft#rubber；cn-rubber-plastic-hj1122-2020#rubber |
| cn-ind-rubber-mixing-forming-004 | 作业 | 将胶片复贴到纤维或钢丝帘线 | 胶片及增强材料 → 增强胶半成品 | 层位和结合符合工艺要求 | source-backed | cn-occ-2022-draft#rubber；cn-rubber-plastic-hj1122-2020#rubber |
| cn-ind-rubber-mixing-forming-005 | 交接 | 确认半成品批次并送入指定成型工序 | 胶半成品与流转信息 → 匹配的成型投料 | 配方规格和待用状态可追踪 | proposed | cn-occ-2022-draft#rubber |
| cn-ind-rubber-mixing-forming-006 | 作业 | 将胶半成品组装成指定产品坯件 | 胶半成品和产品工装 → 轮胎或管带等指定坯件 | 结构及尺寸按对应产品分别确认 | proposed | cn-occ-2022-draft#rubber；cn-rubber-plastic-hj1122-2020#rubber |
| cn-ind-rubber-mixing-forming-007 | 作业 | 操控硫化设备完成胶坯硫化 | 成型坯与硫化设备 → 硫化制品 | 温度压力时间按配方和产品工艺 | source-backed | cn-occ-2022-draft#rubber；cn-rubber-plastic-hj1122-2020#rubber |
| cn-ind-rubber-mixing-forming-008 | 检测 | 使用检验设备检查橡胶制品质量 | 完成胶制品 → 检验结论 | 尺寸外观性能按产品规格验收 | source-backed | cn-occ-2022-draft#rubber；cn-rubber-plastic-hj1122-2020#rubber |
| cn-ind-rubber-mixing-forming-009 | 异常 | 排查胶料加工设备异常与故障 | 异常工艺或设备 → 处置记录 | 异常原因和恢复条件确认 | source-backed | cn-occ-2022-draft#rubber；cn-rubber-plastic-hj1122-2020#rubber |
| cn-ind-rubber-mixing-forming-010 | 返工 | 评估并处理准许重新混炼的胶料 | 不合格未硫化胶料 → 待复验胶料 | 再加工适用条件与配方风险待核 | proposed | cn-occ-2022-draft#rubber |
| cn-ind-rubber-mixing-forming-011 | 清洁维护 | 检查维护炼胶成型硫化设备 | 生产设备 → 维护后设备 | 按设备要求确认可用 | source-backed | cn-occ-2022-draft#rubber；cn-rubber-plastic-hj1122-2020#rubber |
| cn-ind-rubber-mixing-forming-012 | 交付 | 保存胶料与硫化批记录并交出制品 | 合格制品及生产数据 → 可追溯产品批 | 配方硫化和检验数据对应 | proposed | cn-occ-2022-draft#rubber |

阶段缺口：

- 本场景不是轮胎完整成型原子任务终稿，胎圈帘布裁断卷绕胎胚装配及脱模修边必须继续拆解。成型汇总暂作proposed，不能和未来子任务叠加计数。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 旧轮胎胎体检查、修补与翻新

29轮胎翻新；检验准入是先决条件，不代表所有旧胎均能翻新。

流程来源：cn-rubber-plastic-hj1122-2020。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-tyre-retreading-001 | 检测 | 检查旧胎胎体并确认可翻修性 | 旧胎和检查设备 → 胎体准入结果 | 完整性和可修条件依翻胎规范确认 | source-backed | cn-occ-2022-draft#tyre-retread；cn-rubber-plastic-hj1122-2020#rubber |
| cn-ind-tyre-retreading-002 | 准备 | 制备翻新中垫胶和预硫化胎面 | 胶料及专用设备 → 可用中垫胶胎面 | 配方及型面与待修胎体适配 | source-backed | cn-occ-2022-draft#tyre-retread；cn-rubber-plastic-hj1122-2020#rubber |
| cn-ind-tyre-retreading-003 | 返工 | 使用补片和工具修补准入胎体 | 准许修补缺陷和补片 → 修补后胎体 | 修补范围与质量经复核 | source-backed | cn-occ-2022-draft#tyre-retread；cn-rubber-plastic-hj1122-2020#rubber |
| cn-ind-tyre-retreading-004 | 作业 | 削磨胎面至翻新工艺轮廓 | 经检查旧胎和削磨机 → 可贴胶胎体 | 轮廓和剩余胎体状态符合工艺 | source-backed | cn-occ-2022-draft#tyre-retread；cn-rubber-plastic-hj1122-2020#rubber |
| cn-ind-tyre-retreading-005 | 作业 | 铺中垫胶并缠贴预硫化胎面 | 处理胎体与胎面 → 翻新成型轮胎 | 贴合定位和界面质量满足工艺 | source-backed | cn-occ-2022-draft#tyre-retread；cn-rubber-plastic-hj1122-2020#rubber |
| cn-ind-tyre-retreading-006 | 作业 | 在硫化罐内完成翻新胎硫化 | 已成型轮胎 → 硫化后翻新胎 | 过程条件按产品翻修工艺 | source-backed | cn-occ-2022-draft#tyre-retread；cn-rubber-plastic-hj1122-2020#rubber |
| cn-ind-tyre-retreading-007 | 检测 | 检查翻新胎成品并判定放行 | 完成翻新胎 → 检验判定 | 合格标准及检验方式按使用条件确认 | source-backed | cn-occ-2022-draft#tyre-retread；cn-rubber-plastic-hj1122-2020#rubber |
| cn-ind-tyre-retreading-008 | 交付 | 标识并交付检验合格翻新胎 | 合格翻新胎与记录 → 可追溯翻新胎 | 原胎和修补硫化检验记录关联 | proposed | cn-occ-2022-draft#tyre-retread |

阶段缺口：交接、异常、清洁维护

- 异常退出胎体的去向、翻胎设备清理和使用等级限制待补；不存在可恢复所有旧胎使用性能的结论。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 塑料原辅料混配、塑化与造粒

29产品成型前配混场景；独立树脂合成属于26，不在此重复。

流程来源：cn-rubber-plastic-hj1122-2020。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-plastic-compounding-002 | 作业 | 初混并捏合塑料原辅料 | 树脂助剂与混合设备 → 均匀配混料 | 混配状态符合所需成型料要求 | source-backed | cn-occ-2022-draft#plastic；cn-rubber-plastic-hj1122-2020#plastic |
| cn-ind-plastic-compounding-003 | 作业 | 混炼塑化并造粒成型用料 | 配混料和造粒机组 → 成型用塑料粒 | 温度剪切和粒料质量按材料工艺 | source-backed | cn-occ-2022-draft#plastic；cn-rubber-plastic-hj1122-2020#plastic |
| cn-ind-plastic-compounding-004 | 检测 | 测定塑料试样颜色 | 成型用料试样 → 测色结果 | 与标准色样依方法比较 | source-backed | cn-occ-2022-draft#plastic；cn-rubber-plastic-hj1122-2020#plastic |

阶段缺口：准备、交接、异常、返工、清洁维护、交付

- 职业路径未给人工工时；清机、降温开停车、滤网更换、加料和包装微动作待现场SOP补齐。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。
- 原先可想到的通用开停机/检测/返工/包装候选现保存在evidencePendingCandidates且不计任务；不以这些模板填满八阶段。

### 塑料管、板及型材挤出成型

29管板型材，模具后定型牵引切割流程仍需行业产品规范补全，不能视为已完成挤出全线。

流程来源：cn-rubber-plastic-hj1122-2020。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-plastic-extrusion-002 | 作业 | 操控挤出机将塑料形成管板型材 | 塑料料及挤出设施 → 挤出型材 | 截面和材料状态满足工艺 | source-backed | cn-occ-2022-draft#plastic；cn-rubber-plastic-hj1122-2020#plastic |

阶段缺口：准备、交接、检测、异常、返工、清洁维护、交付

- 这是流程未完整验证的场景骨架；source-backed仅挤出动作，proposed不得作为冻结清单或自动化结论。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。
- 原先可想到的通用开停机/检测/返工/包装候选现保存在evidencePendingCandidates且不计任务；不以这些模板填满八阶段。

### 塑料工业配件或日用品注塑成型

29具体注塑件类型尚需按产品拆场景；与样板研究文件的工件上下料证据不自动合并。

流程来源：cn-rubber-plastic-hj1122-2020。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-plastic-injection-002 | 作业 | 操作注塑机将物料塑化成型 | 树脂模具与注塑机 → 成型塑料件 | 成型过程符合产品工艺窗口 | source-backed | cn-occ-2022-draft#plastic；cn-rubber-plastic-hj1122-2020#plastic |

阶段缺口：准备、交接、检测、异常、返工、清洁维护、交付

- 只有工艺单元及操作注塑存在双路径；换模、干燥、嵌件、取件、修边、测量和包装均须继续细化验证。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。
- 原先可想到的通用开停机/检测/返工/包装候选现保存在evidencePendingCandidates且不计任务；不以这些模板填满八阶段。

### 配合饲料配料与制粒

农副食品13的农牧或水产用颗粒饲料；发酵、膨化及宠物食品不假设为本路线必经。

流程来源：cn-feed-oil-hj1110-2020。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-feed-pellets-001 | 准备 | 核对饲料原料与添加剂的标识及入库记录 | 待用原料和记录 → 已核对批次 | 原料与指定批次对应 | source-backed | cn-occ-2022-draft#feed-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-feed-pellets-002 | 作业 | 清理并输送饲料原料入仓 | 原料 → 入仓原料 | 杂物清理且目标仓对应 | source-backed | cn-occ-2022-draft#feed-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-feed-pellets-003 | 作业 | 粉碎饲料原料 | 已清理原料 → 粉碎料 | 符合产品粒度要求 | source-backed | cn-occ-2022-draft#feed-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-feed-pellets-004 | 作业 | 按配方称量饲料原料和添加剂 | 配方与原料 → 各组分称量料 | 各组分与本批配方对应 | source-backed | cn-occ-2022-draft#feed-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-feed-pellets-005 | 作业 | 混合称量后的饲料组分 | 称量料 → 混合料 | 达到本批混合要求 | source-backed | cn-occ-2022-draft#feed-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-feed-pellets-006 | 作业 | 调质混合饲料 | 混合料 → 调质料 | 达到后续成型条件 | source-backed | cn-occ-2022-draft#feed-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-feed-pellets-007 | 作业 | 将调质料制成颗粒 | 调质料 → 颗粒饲料 | 形态满足本产品要求 | source-backed | cn-occ-2022-draft#feed-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-feed-pellets-008 | 作业 | 干燥成型饲料 | 湿颗粒 → 干燥饲料 | 达到本产品水分要求 | source-backed | cn-occ-2022-draft#feed-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-feed-pellets-009 | 作业 | 破碎并分级饲料颗粒 | 制粒料 → 分级颗粒料 | 指定粒级单独收集 | source-backed | cn-occ-2022-draft#feed-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-feed-pellets-010 | 交付 | 计量包装成品饲料 | 成品料与包装 → 包装批次 | 包装与产品批次对应 | source-backed | cn-occ-2022-draft#feed-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-feed-pellets-011 | 检测 | 检验成品饲料质量 | 本批饲料 → 检验记录 | 所检项目对应产品要求 | source-backed | cn-occ-2022-draft#feed-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-feed-pellets-012 | 异常 | 排查并处理饲料加工设备故障 | 故障设备和记录 → 恢复或移交检修的设备 | 异常及处理结果已记录 | source-backed | cn-occ-2022-draft#feed-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-feed-pellets-013 | 清洁维护 | 维护保养饲料加工设备 | 待保养设备 → 保养记录 | 规定保养项目已完成 | source-backed | cn-occ-2022-draft#feed-processing；cn-feed-oil-hj1110-2020#units |

阶段缺口：交接、返工

- 验收指标和取样规则未取得产品专用正式规范，不把定性验收当数值标准。
- 出仓换线清洁、防交叉污染、霉变拒收、返料及返工路径仍缺已读流程依据。
- 发酵、水产饲料脱臭和粉状预混料各有独立分支，尚未展开。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 植物油料预处理与压榨

植物油加工13的油料预处理和机械压榨；脱壳、膨化等按原料选用，不能一律相加。

流程来源：cn-feed-oil-hj1110-2020。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-oil-pretreat-press-001 | 作业 | 筛选和风选植物油料 | 进厂油料 → 清选油料 | 杂质分离并对应批次 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-pretreat-press-002 | 作业 | 干燥调质植物油料 | 清选油料 → 调质油料 | 满足后续处理要求 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-pretreat-press-003 | 作业 | 脱除植物油料外壳 | 适用油料 → 仁料和壳料 | 仁壳分别收集 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-pretreat-press-004 | 作业 | 破碎植物油料 | 油料或仁料 → 碎料 | 满足轧胚路线要求 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-pretreat-press-005 | 作业 | 软化并轧制油料胚片 | 碎料 → 胚片 | 胚片满足本路线规格 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-pretreat-press-006 | 作业 | 蒸炒油料胚片 | 胚片 → 蒸炒料 | 达到压榨工艺条件 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-pretreat-press-007 | 作业 | 压榨油料并收集毛油与饼粕 | 调制油料 → 毛油和饼粕 | 两股产物按路线分流 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-pretreat-press-008 | 作业 | 分离毛油中的固体残渣 | 含渣毛油 → 分离油和油渣 | 分离结果符合后续工序要求 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-pretreat-press-009 | 交付 | 计量包装并入库油粕和壳料 | 副产物 → 可发放批次 | 重量批次与库位对应 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-pretreat-press-010 | 异常 | 排查压榨单元设备故障并记录 | 异常设备 → 处置记录 | 故障已处置或明确移交 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-pretreat-press-011 | 清洁维护 | 保养油料处理及压榨设备 | 停机设备 → 保养记录 | 规定保养项目完成 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |

阶段缺口：准备、交接、检测、返工

- 热榨冷榨及各油料脱皮脱壳路线需继续拆解；焙炒芝麻等专用场景未展开。
- 物料接收检验、压榨堵塞处理、清机换料及油渣返榨尚缺操作规范。
- 机组步骤存在合并操作，原子动作工时不得直接求和。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 植物油浸出与溶剂回收

植物油13的溶剂浸出路线；与压榨是可并联或串联的具体工艺选择，不能视作每厂必经。

流程来源：cn-feed-oil-hj1110-2020。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-oil-solvent-extract-001 | 作业 | 浸出油料中的油脂 | 预处理油料与溶剂 → 混合油和湿粕 | 产物流向符合浸出工艺 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-solvent-extract-002 | 作业 | 蒸脱湿粕中的溶剂 | 湿粕 → 脱溶粕和蒸汽 | 达到本工艺脱溶要求 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-solvent-extract-003 | 作业 | 蒸发并汽提混合油 | 混合油 → 浸出毛油与溶剂蒸汽 | 油和溶剂分别进入后续工序 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-solvent-extract-004 | 作业 | 冷凝回收溶剂蒸汽 | 溶剂蒸汽 → 冷凝液 | 回收流向对应规定回路 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-solvent-extract-005 | 作业 | 分离冷凝液中的溶剂和水 | 冷凝液 → 回收溶剂与水 | 两相按规定去向分离 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-solvent-extract-006 | 作业 | 回收浸出尾气中的溶剂 | 含溶剂尾气 → 回收溶剂及处理后气流 | 回收单元按规定运行 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-solvent-extract-007 | 异常 | 排查浸出回收设备故障并记录 | 设备异常 → 处置记录 | 异常已处置或移交 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-solvent-extract-008 | 清洁维护 | 保养浸出与溶剂回收设备 | 待保养设备 → 保养记录 | 规定项目已完成 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |

阶段缺口：准备、交接、检测、返工、交付

- 泄漏报警、火灾防爆、受限空间、开停机置换和危险检修必须另查专项流程，不能据此清单执行。
- 残溶检验、物料交接和不合格粕返工未获足够已读来源。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 植物油精炼与灌装

植物油13的精炼及工厂内成品灌装；脱胶脱酸脱色脱臭脱蜡按油种和路线选择。

流程来源：cn-feed-oil-hj1110-2020。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-oil-refine-fill-001 | 作业 | 脱除毛油中的胶质 | 毛油 → 脱胶油与胶脚 | 达到所选精炼路线要求 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-refine-fill-002 | 作业 | 脱除油脂中的游离脂肪酸 | 待脱酸油 → 脱酸油及副产物 | 达到本品种工艺要求 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-refine-fill-003 | 作业 | 脱除油脂中的色素 | 待脱色油 → 脱色油 | 达到本品种脱色要求 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-refine-fill-004 | 作业 | 蒸汽脱除油脂中的异味物质 | 待脱臭油 → 脱臭油 | 达到本品种脱臭要求 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-refine-fill-005 | 作业 | 冷却结晶并分离油脂中的蜡 | 待脱蜡油 → 脱蜡油和蜡相 | 满足本品种低温要求 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-refine-fill-006 | 作业 | 输送计量油脂至灌装工位 | 成品油 → 待灌装定量油 | 油种批次与计量对应 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-refine-fill-007 | 作业 | 灌装并充氮封装油脂 | 油脂与包装 → 包装成品 | 按所选包装工艺封装 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-refine-fill-008 | 交付 | 办理包装油脂入库与出库交接 | 包装批次和库单 → 库存或出库批次 | 实物批次数量与交接记录相符 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-refine-fill-009 | 异常 | 排查精炼或灌装设备故障 | 异常设备 → 处置记录 | 异常已处置或移交 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |
| cn-ind-oil-refine-fill-010 | 清洁维护 | 保养精炼和灌装设备 | 待保养设备 → 保养记录 | 规定项目完成 | source-backed | cn-occ-2022-draft#oil-processing；cn-feed-oil-hj1110-2020#units |

阶段缺口：准备、交接、检测、返工

- 精炼理化检测、过滤器更换、吸附剂处理、清洗及产品改判返工仍需专用规范。
- HJ表1包装设备列有注塑机，可能对应包装制造或表述问题，本清单不采用该设备结论；灌装充氮来自职业稿。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 水产品预处理与鱼糜加工

农副食品13的鱼类预处理、采肉制糜及成型；不同鱼种、甲壳类和贝类不能共用全部去除步骤。

流程来源：cn-fish-hj1109-2020。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-fish-mince-001 | 交接 | 卸收并储存水产原料 | 到厂水产原料 → 储存原料批次 | 批次进入对应储存单元 | source-backed | cn-occ-2022-draft#fish-processing；cn-fish-hj1109-2020#units |
| cn-ind-fish-mince-002 | 检测 | 对水产原料分拣分级 | 原料批次 → 分级原料 | 按本加工路线分流 | source-backed | cn-occ-2022-draft#fish-processing；cn-fish-hj1109-2020#units |
| cn-ind-fish-mince-003 | 作业 | 宰杀并放血鱼类原料 | 适用鲜活鱼 → 宰杀鱼体 | 完成本品种规定宰杀处理 | source-backed | cn-occ-2022-draft#fish-processing；cn-fish-hj1109-2020#units |
| cn-ind-fish-mince-004 | 作业 | 去除鱼体鳃鳞与内脏 | 宰杀鱼体 → 净膛鱼体和废弃物 | 需去除部位分离 | source-backed | cn-occ-2022-draft#fish-processing；cn-fish-hj1109-2020#units |
| cn-ind-fish-mince-005 | 作业 | 清洗预处理鱼体 | 鱼体 → 清洗鱼体 | 满足后续分割条件 | source-backed | cn-occ-2022-draft#fish-processing；cn-fish-hj1109-2020#units |
| cn-ind-fish-mince-006 | 作业 | 分割鱼体并采集鱼肉 | 鱼体 → 鱼肉及分离物 | 可用鱼肉按规定分离 | source-backed | cn-occ-2022-draft#fish-processing；cn-fish-hj1109-2020#units |
| cn-ind-fish-mince-007 | 作业 | 将采集鱼肉制成鱼糜 | 鱼肉 → 鱼糜 | 达到本产品细度和状态要求 | source-backed | cn-occ-2022-draft#fish-processing；cn-fish-hj1109-2020#units |
| cn-ind-fish-mince-008 | 作业 | 给鱼糜配料并调味混合 | 鱼糜和配料 → 混合鱼糜 | 配方与本批产品对应 | source-backed | cn-occ-2022-draft#fish-processing；cn-fish-hj1109-2020#units |
| cn-ind-fish-mince-009 | 作业 | 成型并计量鱼糜制品 | 混合鱼糜 → 定型定量制品 | 形态和份量符合本产品要求 | source-backed | cn-occ-2022-draft#fish-processing；cn-fish-hj1109-2020#units |
| cn-ind-fish-mince-010 | 作业 | 杀菌并包装鱼糜制品 | 待处理制品和包装 → 包装制品 | 执行本产品经验证的杀菌包装工艺 | source-backed | cn-occ-2022-draft#fish-processing；cn-fish-hj1109-2020#units |
| cn-ind-fish-mince-011 | 清洁维护 | 清洗消毒鱼糜加工场所和设备 | 待清洁区域设备 → 清洁消毒记录 | 规定区域和设备完成清洁消毒 | source-backed | cn-occ-2022-draft#fish-processing；cn-fish-hj1109-2020#units |

阶段缺口：准备、异常、返工、交付

- 冰鲜冷冻保鲜、温度记录、金属异物及微生物检测、过敏原换线、解冻滴水和退货返工未完成规范补证。
- 原料验收、杀菌条件和冷链条件未给出统一数值；不可据本任务列表执行食品安全控制。
- 表1前处理动作支持原子任务存在，职业条目未逐一重复；sourceRefs已注明单路径细节。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 水产品腌制干燥熟化加工

农副食品13的腌干、熟制和熏制产品分支；按实际产品选择步骤。

流程来源：cn-fish-hj1109-2020。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-fish-cure-dry-001 | 作业 | 腌制预处理水产品 | 净制水产原料和盐料 → 腌制原料 | 达到本产品腌制要求 | source-backed | cn-occ-2022-draft#fish-processing；cn-fish-hj1109-2020#units |
| cn-ind-fish-cure-dry-002 | 作业 | 配制并混合水产制品调味料 | 原料和调味配方 → 调味料或混合物 | 用料与配方对应 | source-backed | cn-occ-2022-draft#fish-processing；cn-fish-hj1109-2020#units |
| cn-ind-fish-cure-dry-003 | 作业 | 干燥水产制品 | 待干燥制品 → 干制品 | 达到本产品干燥要求 | source-backed | cn-occ-2022-draft#fish-processing；cn-fish-hj1109-2020#units |
| cn-ind-fish-cure-dry-004 | 作业 | 熟化水产制品 | 待熟制品 → 熟制品 | 执行本产品规定熟化程序 | source-backed | cn-occ-2022-draft#fish-processing；cn-fish-hj1109-2020#units |
| cn-ind-fish-cure-dry-005 | 作业 | 熏制水产制品 | 适用制品 → 熏制品 | 达到本产品熏制要求 | source-backed | cn-occ-2022-draft#fish-processing；cn-fish-hj1109-2020#units |
| cn-ind-fish-cure-dry-006 | 交付 | 计量并包装水产干熟制品 | 成品和包装 → 包装批次 | 产品与批次及包装规格对应 | source-backed | cn-occ-2022-draft#fish-processing；cn-fish-hj1109-2020#units |
| cn-ind-fish-cure-dry-007 | 清洁维护 | 清洗消毒腌干熟制设备及场所 | 待清洁设备区域 → 清洁消毒记录 | 规定项目完成 | source-backed | cn-occ-2022-draft#fish-processing；cn-fish-hj1109-2020#units |

阶段缺口：准备、交接、检测、异常、返工

- 熟化仍为蒸煮、烘烤或油炸的路线级动作，需继续按产品分解上料、翻动、取出等可独立验收操作；本条未来展开后应退出计数避免重复。
- 感官理化检测、腌液循环处置、失败批处理、炉体清焦与废气单元维护均未展开。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 水产原料精制提取

农副食品13的水产精制品操作族入口；鱼油、海藻胶等化学成分与工艺不同，尚不作为单一完整工厂流程。

流程来源：cn-fish-hj1109-2020。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-aquatic-refining-001 | 作业 | 浸泡洗涤并绞碎水产原料 | 适用原料 → 净化细化原料 | 满足所选精制路线输入条件 | source-backed | cn-occ-2022-draft#fish-refining；cn-fish-hj1109-2020#units |
| cn-ind-aquatic-refining-002 | 作业 | 消化处理水产原料 | 预处理原料 → 消化物 | 达到本产品消化程序要求 | source-backed | cn-occ-2022-draft#fish-refining；cn-fish-hj1109-2020#units |
| cn-ind-aquatic-refining-003 | 作业 | 分离并提纯水产中间物 | 消化物或提取物 → 提纯中间物 | 目标相与残渣分离 | source-backed | cn-occ-2022-draft#fish-refining；cn-fish-hj1109-2020#units |
| cn-ind-aquatic-refining-004 | 作业 | 浓缩水产精制中间液 | 中间液 → 浓缩液 | 达到后续处理浓度要求 | source-backed | cn-occ-2022-draft#fish-refining；cn-fish-hj1109-2020#units |
| cn-ind-aquatic-refining-005 | 作业 | 压榨脱水并干燥精制物 | 湿中间物 → 干燥精制物 | 达到所选产品干燥要求 | source-backed | cn-occ-2022-draft#fish-refining；cn-fish-hj1109-2020#units |
| cn-ind-aquatic-refining-006 | 作业 | 磨粉并配制精制水产产品 | 精制物和配料 → 配制产品 | 细度与配方对应 | source-backed | cn-occ-2022-draft#fish-refining；cn-fish-hj1109-2020#units |
| cn-ind-aquatic-refining-007 | 交付 | 杀菌并包装精制水产产品 | 待处理产品和包装 → 包装批次 | 执行本产品规定工艺并标识批次 | source-backed | cn-occ-2022-draft#fish-refining；cn-fish-hj1109-2020#units |
| cn-ind-aquatic-refining-008 | 清洁维护 | 清洗消毒水产精制设备与场所 | 待清洁设备区域 → 清洁消毒记录 | 规定项目完成 | source-backed | cn-occ-2022-draft#fish-refining；cn-fish-hj1109-2020#units |

阶段缺口：准备、交接、检测、异常、返工

- 本场景为职业动作族入口，鱼油、鱼粉、藻胶等不同原料与产品必须继续分开；联合动作需取得详细SOP后拆分并删除对应汇总条。
- HJ表1支持精制分离过滤溶剂脱脂等单元；职业稿中的消化不代表所有水产品路线使用。
- 残留检测、物料交接、批失败返工以及溶剂与药剂操作尚缺逐项规范。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 水泥生料制备

非金属矿物制品30的水泥厂原料加工；原料矿山采掘另按执行者的采矿门类登记。

流程来源：cn-cement-hj847-2017。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-cement-rawmeal-001 | 作业 | 破碎水泥原料 | 原料块料 → 破碎原料 | 粒级满足后续粉磨路线 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-rawmeal-002 | 作业 | 烘干水泥原料 | 含水原料 → 干燥原料 | 满足本工艺水分要求 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-rawmeal-003 | 准备 | 按生料配比配制水泥原料 | 原料和配比 → 配合原料 | 组分符合本批配料要求 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-rawmeal-004 | 作业 | 粉磨配合原料制成水泥生料 | 配合原料 → 生料 | 达到本线生料要求 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-rawmeal-005 | 作业 | 均化水泥生料 | 待均化生料 → 均化料 | 达到后续煅烧输入要求 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-rawmeal-006 | 异常 | 排查生料制备设备故障 | 设备异常 → 处置记录 | 故障已处置或移交 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-rawmeal-007 | 清洁维护 | 保养生料制备设备 | 待保养设备 → 保养记录 | 规定项目完成 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |

阶段缺口：交接、检测、返工、交付

- 原料检验、料仓切换、防混料和计量校准、堵料清仓及余料返配仍未取得具体已读规程。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 水泥熟料煅烧与冷却

非金属矿物制品30熟料窑线；煤粉制备、协同处置和余热发电属于独立待展开单元。

流程来源：cn-cement-hj847-2017。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-cement-clinker-001 | 作业 | 预热水泥生料 | 生料 → 预热料 | 满足所选窑线下游条件 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-clinker-002 | 作业 | 预分解水泥生料 | 预热料 → 分解料 | 达到本窑线分解要求 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-clinker-003 | 作业 | 煅烧生料形成水泥熟料 | 分解料或适用生料 → 熟料 | 达到本产品煅烧要求 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-clinker-004 | 作业 | 冷却水泥熟料 | 高温熟料 → 冷却熟料 | 达到储运与粉磨条件 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-clinker-005 | 检测 | 检测水泥线环保设施排放 | 排放流 → 检测记录 | 记录所测项目及达标判断依据 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-clinker-006 | 异常 | 排查熟料生产设备故障 | 设备异常 → 处置记录 | 故障已处置或移交 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-clinker-007 | 清洁维护 | 保养熟料生产设备 | 待维护设备 → 维护记录 | 规定项目完成 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |

阶段缺口：准备、交接、返工、交付

- 窑开停机、喷煤点火、结圈结皮处理、篦冷机故障、热工取样和不合格熟料改判未取得专项流程。
- 环保检测跨原料/熟料/粉磨系统由同一团队执行时只计一次，不按场景重复累加工时。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 水泥粉磨与装运

非金属矿物制品30的熟料制水泥及厂内包装散装；袋装和散装为产品交付分支。

流程来源：cn-cement-hj847-2017。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-cement-grind-pack-001 | 作业 | 破碎水泥熟料及缓凝剂 | 熟料和缓凝剂 → 碎料 | 满足粉磨入料规格 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-grind-pack-002 | 准备 | 配混熟料与水泥用辅料 | 碎料及混合材 → 配合料 | 配比对应本产品 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-grind-pack-003 | 作业 | 烘干水泥混合料 | 含水混合料 → 干燥料 | 满足粉磨条件 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-grind-pack-004 | 作业 | 粉磨水泥配合料 | 配合料 → 水泥粉 | 达到本产品粉磨要求 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-grind-pack-005 | 作业 | 分选水泥粉粒 | 粉磨出料 → 合适粒级和回料 | 各股物料进入规定去向 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-grind-pack-006 | 交付 | 将水泥计量装包 | 水泥及包装袋 → 袋装水泥 | 按产品规格完成包装 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-grind-pack-007 | 交付 | 将散装水泥装入运输容器 | 散装水泥及容器 → 散装批次 | 产品与容器及出料批次对应 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-grind-pack-008 | 异常 | 排查水泥粉磨包装设备故障 | 设备异常 → 处置记录 | 故障已处置或移交 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |
| cn-ind-cement-grind-pack-009 | 清洁维护 | 保养水泥粉磨包装设备 | 待维护设备 → 保养记录 | 规定项目完成 | source-backed | cn-occ-2022-draft#cement-production；cn-cement-hj847-2017#units |

阶段缺口：交接、检测、返工

- 包装插袋、封口检查、码垛、破包回收、装车交接和成品取样检验仍未完整展开。
- 选粉机回料为正常工艺循环，不视作独立产品返工并重复计入产量。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 平板玻璃配料与熔化

非金属矿物制品30平板玻璃配合料及熔窑；浮法与压延共享的前段只登记一次。

流程来源：cn-flatglass-hj856-2017。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-flatglass-melt-001 | 作业 | 均化平板玻璃原料 | 石英砂等原料 → 均化原料 | 达到本品种配料条件 | source-backed | cn-occ-2022-draft#glass-melt；cn-flatglass-hj856-2017#units |
| cn-ind-flatglass-melt-002 | 准备 | 称量玻璃配合料各组分 | 配方及原料 → 称量组分 | 重量与配方对应 | source-backed | cn-occ-2022-draft#glass-melt；cn-flatglass-hj856-2017#units |
| cn-ind-flatglass-melt-003 | 作业 | 混合玻璃配合料 | 称量组分 → 配合料 | 符合本线混合要求 | source-backed | cn-occ-2022-draft#glass-melt；cn-flatglass-hj856-2017#units |
| cn-ind-flatglass-melt-004 | 交接 | 输送玻璃配合料至窑头仓 | 配合料 → 仓内配合料 | 批次与窑头仓对应 | source-backed | cn-occ-2022-draft#glass-melt；cn-flatglass-hj856-2017#units |
| cn-ind-flatglass-melt-005 | 作业 | 将配合料投进玻璃熔窑 | 配合料 → 熔窑入料 | 供料与液面控制要求一致 | source-backed | cn-occ-2022-draft#glass-melt；cn-flatglass-hj856-2017#units |
| cn-ind-flatglass-melt-006 | 作业 | 调节玻璃熔窑燃烧条件 | 熔窑及热工读数 → 受控熔液 | 温压气氛满足本线熔化要求 | source-backed | cn-occ-2022-draft#glass-melt；cn-flatglass-hj856-2017#units |
| cn-ind-flatglass-melt-007 | 作业 | 切换玻璃熔窑预热空气方向 | 换向设备 → 切换后风路 | 按适用窑型程序完成换向 | source-backed | cn-occ-2022-draft#glass-melt；cn-flatglass-hj856-2017#units |
| cn-ind-flatglass-melt-008 | 检测 | 取样检查玻璃液熔化缺陷 | 玻璃液样品 → 缺陷检查记录 | 结石气泡等检查有记录 | source-backed | cn-occ-2022-draft#glass-melt；cn-flatglass-hj856-2017#units |
| cn-ind-flatglass-melt-009 | 异常 | 排查玻璃熔窑及设备故障 | 设备异常 → 处置记录 | 故障已处置或移交 | source-backed | cn-occ-2022-draft#glass-melt；cn-flatglass-hj856-2017#units |
| cn-ind-flatglass-melt-010 | 清洁维护 | 检查维护玻璃窑炉及附属设备 | 待维护设备 → 维护记录 | 规定项目完成 | source-backed | cn-occ-2022-draft#glass-melt；cn-flatglass-hj856-2017#units |

阶段缺口：返工、交付

- 原料化验、碎玻璃分选清洗、炉窑冷修、换料以及熔化缺陷纠偏需专项规范；没有把热工调节当作软件岗位。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 浮法平板玻璃成型退火切裁

非金属矿物制品30的浮法路线，从供料至切裁质检；上游配料熔化不重复列。

流程来源：cn-flatglass-hj856-2017。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-floatglass-form-001 | 交接 | 将玻璃液送入锡槽 | 玻璃液 → 槽内玻璃液 | 供液符合本线条件 | source-backed | cn-occ-2022-draft#glass-form；cn-flatglass-hj856-2017#units |
| cn-ind-floatglass-form-002 | 作业 | 调控锡槽条件形成玻璃带 | 槽内玻璃液 → 成型玻璃带 | 保护气氛及带形符合产品要求 | source-backed | cn-occ-2022-draft#glass-form；cn-flatglass-hj856-2017#units |
| cn-ind-floatglass-form-003 | 作业 | 退火成型玻璃带 | 成型玻璃带 → 退火玻璃 | 执行本产品退火程序 | source-backed | cn-occ-2022-draft#glass-form；cn-flatglass-hj856-2017#units |
| cn-ind-floatglass-form-004 | 作业 | 切裁平板玻璃 | 退火玻璃带 → 规定尺寸玻璃片 | 切裁尺寸符合订单 | source-backed | cn-occ-2022-draft#glass-form；cn-flatglass-hj856-2017#units |
| cn-ind-floatglass-form-005 | 检测 | 检查玻璃片质量 | 玻璃片 → 质量记录 | 所检项目对应产品要求 | source-backed | cn-occ-2022-draft#glass-form；cn-flatglass-hj856-2017#units |
| cn-ind-floatglass-form-006 | 异常 | 剔除不合格玻璃片 | 不合格玻璃片 → 分离的不合格品 | 与合格品隔离 | source-backed | cn-occ-2022-draft#glass-form；cn-flatglass-hj856-2017#units |
| cn-ind-floatglass-form-007 | 准备 | 更换成型设备的适用替换件 | 产品要求及备件 → 换件后设备 | 配置符合本产品 | source-backed | cn-occ-2022-draft#glass-form；cn-flatglass-hj856-2017#units |
| cn-ind-floatglass-form-008 | 异常 | 排查浮法成型设备故障 | 设备异常 → 处置记录 | 故障已处置或移交 | source-backed | cn-occ-2022-draft#glass-form；cn-flatglass-hj856-2017#units |
| cn-ind-floatglass-form-009 | 清洁维护 | 维护浮法成型退火切裁设备 | 待维护设备 → 维护记录 | 规定项目完成 | source-backed | cn-occ-2022-draft#glass-form；cn-flatglass-hj856-2017#units |

阶段缺口：返工、交付

- 在线镀膜、玻璃上片下片、隔纸码架装箱、厚度缺陷仪校准及破板处理尚缺逐项操作规范。
- 不合格品剔除是异常分流，破碎回炉工序尚未完整识别，不能假定为一次返工即合格。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 压延平板玻璃成型

非金属矿物制品30压延路线；本场景仅列区别于浮法的成型动作，退火切裁共性需按压延设备再验证，不能把浮法场景直接当已验证。

流程来源：cn-flatglass-hj856-2017。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-rolledglass-form-001 | 作业 | 操作压延成型机形成平板玻璃 | 玻璃液 → 压延玻璃带 | 达到本产品厚度和表面要求 | source-backed | cn-occ-2022-draft#glass-form；cn-flatglass-hj856-2017#units |
| cn-ind-rolledglass-form-002 | 作业 | 将压延玻璃送入退火炉 | 压延玻璃带 → 退火炉来料 | 按本线顺序输送 | source-backed | cn-occ-2022-draft#glass-form；cn-flatglass-hj856-2017#units |
| cn-ind-rolledglass-form-003 | 作业 | 退火压延玻璃带 | 压延玻璃带 → 退火玻璃 | 执行本产品退火程序 | source-backed | cn-occ-2022-draft#glass-form；cn-flatglass-hj856-2017#units |
| cn-ind-rolledglass-form-004 | 作业 | 切裁压延平板玻璃 | 退火玻璃 → 规定尺寸玻璃片 | 尺寸符合产品要求 | source-backed | cn-occ-2022-draft#glass-form；cn-flatglass-hj856-2017#units |
| cn-ind-rolledglass-form-005 | 检测 | 检查压延玻璃片并记录结果 | 玻璃片 → 质量记录 | 所检项目对应产品要求 | source-backed | cn-occ-2022-draft#glass-form；cn-flatglass-hj856-2017#units |
| cn-ind-rolledglass-form-006 | 异常 | 剔除不合格压延玻璃片 | 不合格片 → 隔离品 | 与合格品分离 | source-backed | cn-occ-2022-draft#glass-form；cn-flatglass-hj856-2017#units |
| cn-ind-rolledglass-form-007 | 清洁维护 | 保养压延成型退火切裁设备 | 待维护设备 → 维护记录 | 规定项目完成 | source-backed | cn-occ-2022-draft#glass-form；cn-flatglass-hj856-2017#units |

阶段缺口：准备、交接、返工、交付

- 花纹辊拆装、压延辊调整、供液波动、清辊和压延玻璃包装尚缺专项已读流程。
- 与浮法的共同动作作为不同设备条件研究，不相加生成同一生产线工时。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 印前文件检查打样与制版

印刷23的订单生产准备及实体印版制作；纯艺术设计不列入，必要图文处理保留。

流程来源：cn-print-hj1066-2019。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-print-prepress-001 | 准备 | 输入或扫描订单图文 | 订单文字图像 → 数字图文 | 内容能进入排版流程 | source-backed | cn-occ-2022-draft#prepress；cn-print-hj1066-2019#units |
| cn-ind-print-prepress-002 | 准备 | 分色处理待印图像 | 数字图像 → 分色文件 | 满足选定印刷路线 | source-backed | cn-occ-2022-draft#prepress；cn-print-hj1066-2019#units |
| cn-ind-print-prepress-003 | 准备 | 排版并拼版订单图文 | 图文与版式 → 生产版面文件 | 版面对应订单 | source-backed | cn-occ-2022-draft#prepress；cn-print-hj1066-2019#units |
| cn-ind-print-prepress-004 | 检测 | 输出数字样张供印前核对 | 生产文件 → 样张 | 样张对应本次文件版本 | source-backed | cn-occ-2022-draft#prepress；cn-print-hj1066-2019#units |
| cn-ind-print-prepress-005 | 作业 | 将生产文件输出为胶片或直接制版数据 | 已定文件 → 胶片或制版输出 | 输出与定版文件对应 | source-backed | cn-occ-2022-draft#prepress；cn-print-hj1066-2019#units |
| cn-ind-print-prepress-006 | 作业 | 曝光制作印版 | 版材与图文 → 曝光版材 | 执行本版材曝光程序 | source-backed | cn-occ-2022-draft#prepress；cn-print-hj1066-2019#units |
| cn-ind-print-prepress-007 | 作业 | 显影并冲洗印版 | 曝光版材 → 可用印版 | 完成本版材显影冲洗 | source-backed | cn-occ-2022-draft#prepress；cn-print-hj1066-2019#units |
| cn-ind-print-prepress-008 | 检测 | 检查印版及胶片质量 | 印版胶片 → 检查记录 | 图文及版面质量被核对 | source-backed | cn-occ-2022-draft#prepress；cn-print-hj1066-2019#units |

阶段缺口：交接、异常、返工、清洁维护、交付

- PS/CTP、网版和柔性版具体版材及处理路线需继续拆分；免处理CTP不套用显影步骤。
- 凹版滚筒车磨焊接电镀雕刻和打样为另一个实体制版场景，尚未展开。
- 文件改版重制、废液更换、制版机清洁及版材交接尚缺详细流程。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 单张纸平版印刷供纸印刷与收纸

印刷23单张纸胶印场景；卷筒纸、凹版、柔版、孔版和数字喷绘不视为已覆盖。

流程来源：cn-print-hj1066-2019。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-print-sheet-offset-001 | 准备 | 调配本印件油墨及适用溶剂 | 油墨配方及原料 → 调配油墨 | 色墨与订单要求对应 | source-backed | cn-occ-2022-draft#printing；cn-print-hj1066-2019#units |
| cn-ind-print-sheet-offset-002 | 准备 | 准备承印纸张与印版 | 纸张印版及订单 → 待开印材料 | 材料与订单对应 | source-backed | cn-occ-2022-draft#printing；cn-print-hj1066-2019#units |
| cn-ind-print-sheet-offset-003 | 准备 | 调整纸台与输纸装置 | 印刷机和纸张规格 → 输纸设置 | 适配本批纸张 | source-backed | cn-occ-2022-draft#printing；cn-print-hj1066-2019#units |
| cn-ind-print-sheet-offset-004 | 准备 | 调整印刷压力 | 印刷机和材料 → 压力设置 | 满足本版材纸张工艺 | source-backed | cn-occ-2022-draft#printing；cn-print-hj1066-2019#units |
| cn-ind-print-sheet-offset-005 | 作业 | 控制供墨装置供给油墨 | 调配油墨 → 连续供墨状态 | 供墨符合本印件要求 | source-backed | cn-occ-2022-draft#printing；cn-print-hj1066-2019#units |
| cn-ind-print-sheet-offset-006 | 作业 | 操作平版印刷机转印图文 | 纸张印版油墨 → 印刷纸张 | 完成指定图文转印 | source-backed | cn-occ-2022-draft#printing；cn-print-hj1066-2019#units |
| cn-ind-print-sheet-offset-007 | 作业 | 控制收纸装置收集印张 | 印刷纸张 → 收集印张 | 印张进入规定收纸位置 | source-backed | cn-occ-2022-draft#printing；cn-print-hj1066-2019#units |
| cn-ind-print-sheet-offset-008 | 检测 | 检查并评估印张质量 | 印张样品 → 质量记录 | 本印件颜色和图文质量被评估 | source-backed | cn-occ-2022-draft#printing；cn-print-hj1066-2019#units |
| cn-ind-print-sheet-offset-009 | 异常 | 诊断并排除印刷运行故障 | 故障信息 → 处置记录 | 故障被处置或移交 | source-backed | cn-occ-2022-draft#printing；cn-print-hj1066-2019#units |
| cn-ind-print-sheet-offset-010 | 清洁维护 | 清洁印刷机及供墨部件 | 待清洁设备 → 清洁设备 | 完成规定清洁项目 | source-backed | cn-occ-2022-draft#printing；cn-print-hj1066-2019#units |
| cn-ind-print-sheet-offset-011 | 清洁维护 | 维护调整印刷设备 | 待维护设备 → 维护记录 | 规定项目完成 | source-backed | cn-occ-2022-draft#printing；cn-print-hj1066-2019#units |

阶段缺口：交接、返工、交付

- 上版定位套准、堆纸翻面、加纸接纸、橡皮布清洗、首样签字、色差纠偏及补印单应继续取得专项作业规范。
- 通用职业稿支持动作存在，胶印专用水墨平衡和套准验收还未有双源细节。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 印后表面整饰与裁切成型

印刷23的印后加工分支；成品整饰与包装纸盒制造22边界按实际经营活动和执行者核定，同一物料转换不重复计数。

流程来源：cn-print-hj1066-2019。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-print-postfinish-001 | 作业 | 给印刷品上光 | 印刷品及上光材料 → 上光印品 | 达到本产品表面要求 | source-backed | cn-occ-2022-draft#postpress；cn-print-hj1066-2019#units |
| cn-ind-print-postfinish-002 | 作业 | 给印刷品覆膜 | 印刷品及膜材 → 覆膜印品 | 膜层符合本产品要求 | source-backed | cn-occ-2022-draft#postpress；cn-print-hj1066-2019#units |
| cn-ind-print-postfinish-003 | 准备 | 设定自动裁切程序 | 印品尺寸要求 → 裁切程序 | 程序对应本订单尺寸 | source-backed | cn-occ-2022-draft#postpress；cn-print-hj1066-2019#units |
| cn-ind-print-postfinish-004 | 作业 | 裁切印刷品 | 待裁印品 → 裁切印品 | 尺寸符合本订单 | source-backed | cn-occ-2022-draft#postpress；cn-print-hj1066-2019#units |
| cn-ind-print-postfinish-005 | 作业 | 光整裁切印品边缘 | 裁切印品 → 边缘整齐印品 | 边缘满足本产品要求 | source-backed | cn-occ-2022-draft#postpress；cn-print-hj1066-2019#units |
| cn-ind-print-postfinish-006 | 作业 | 对印刷品压凹凸 | 印品及模具 → 凹凸印品 | 位置及形状对应本产品 | source-backed | cn-occ-2022-draft#postpress；cn-print-hj1066-2019#units |
| cn-ind-print-postfinish-007 | 作业 | 烫印印刷品表面 | 印品及烫印材料 → 烫印印品 | 位置图案符合本产品要求 | source-backed | cn-occ-2022-draft#postpress；cn-print-hj1066-2019#units |
| cn-ind-print-postfinish-008 | 作业 | 模切印刷品 | 印品及模具 → 模切印品 | 轮廓符合本产品要求 | source-backed | cn-occ-2022-draft#postpress；cn-print-hj1066-2019#units |
| cn-ind-print-postfinish-009 | 作业 | 给印刷品压痕 | 印品及压痕模具 → 压痕印品 | 折线位置对应本产品 | source-backed | cn-occ-2022-draft#postpress；cn-print-hj1066-2019#units |
| cn-ind-print-postfinish-010 | 作业 | 修饰印刷品成品 | 待修饰印品 → 修饰成品 | 完成本产品规定修饰 | source-backed | cn-occ-2022-draft#postpress；cn-print-hj1066-2019#units |
| cn-ind-print-postfinish-011 | 交付 | 包装印后成品 | 成品及包装 → 包装批次 | 产品批次及包装规格对应 | source-backed | cn-occ-2022-draft#postpress；cn-print-hj1066-2019#units |
| cn-ind-print-postfinish-012 | 检测 | 检查印后成品质量并追查工序原因 | 成品与工序信息 → 检查及归因记录 | 问题对应印前印中或印后工序 | source-backed | cn-occ-2022-draft#postpress；cn-print-hj1066-2019#units |

阶段缺口：交接、异常、返工、清洁维护

- 装订书本的折页、配页、锁线胶订、封面上壳、插页等职业已识别，尚缺本轮已读详细流程规范，未在本场景冒充完整书刊生产。
- 上光覆膜压凹凸烫印等为按产品选用的分支，不是每个订单必经。
- 修饰动作仍需继续拆成可独立验收的具体产品工步，展开后删除当前汇总条。
- 剥膜重覆、补印重订及废料回收、胶黏剂换线清洗尚缺实际流程。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 锂离子电池浆料与涂布烘烤

电气机械38的锂离子电池电极前段；活性物质粉体制造需按化学品26或材料工艺实际归属另查。

流程来源：cn-battery-hj967-2018。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-lithium-electrode-001 | 准备 | 按配方配入电极活性物质及辅料 | 活性物质导电料黏结剂溶剂 → 配料批次 | 组分对应本电极配方 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lithium |
| cn-ind-lithium-electrode-002 | 作业 | 混合电极浆料 | 配入原辅料 → 浆料 | 达到本极片涂布输入要求 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lithium |
| cn-ind-lithium-electrode-003 | 作业 | 将电极材料涂布成极片 | 浆料及基材 → 湿涂布极片 | 涂层满足本电极工艺要求 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lithium |
| cn-ind-lithium-electrode-004 | 作业 | 烘烤涂布极片 | 湿极片 → 干燥极片 | 达到本极片干燥要求 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lithium |

阶段缺口：交接、检测、异常、返工、清洁维护、交付

- 分散除泡过滤、涂布上下卷接带、辊压分切模切、极耳焊接、在线缺陷检测及溶剂回收清洁均未取得详细已读流程，不以4条代表完整极片制造。
- 材料称量误投、厚度偏差返工和粉尘溶剂异常处置仍待专项规范。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 锂离子单体电池注液化成与测试

电气机械38锂离子电芯装配后段入口；卷绕叠片入壳等细分暂缺规范，不把整装单体概称计作已完成任务。

流程来源：cn-battery-hj967-2018。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-lithium-cell-finish-001 | 准备 | 配制本电池所需电解液 | 溶剂电解质及辅料 → 电解液批次 | 配方与目标电池对应 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lithium |
| cn-ind-lithium-cell-finish-002 | 作业 | 向单体电池装入电解液 | 待注液单体及电解液 → 注液单体 | 按本产品规定量与程序注液 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lithium |
| cn-ind-lithium-cell-finish-003 | 作业 | 对电池进行化成充放电 | 待化成电池 → 化成电池 | 执行本产品化成程序 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lithium |
| cn-ind-lithium-cell-finish-004 | 检测 | 测试单体电池电性能 | 单体电池 → 电性能记录 | 测试项目与本产品要求对应 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lithium |

阶段缺口：交接、异常、返工、清洁维护、交付

- 真空干燥、卷绕叠片、装壳焊接封口、静置分容老化、检漏安全测试、模组PACK及返修暂未取得逐项流程依据。
- 注液量、露点、容量和化成参数均未提供统一值；不推算用工和合格率。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 铅酸电池极板制造

电气机械38铅酸极板的不同工艺分支；板栅铸造/拉网、管式灌粉/挤膏是选择关系。

流程来源：cn-battery-hj967-2018。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-lead-battery-plate-001 | 作业 | 制取铅酸极板用铅粉 | 铅料 → 铅粉 | 满足本极板工艺要求 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lead |
| cn-ind-lead-battery-plate-002 | 作业 | 混合铅粉和辅料制成铅膏 | 铅粉及辅料 → 铅膏 | 达到本产品配膏要求 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lead |
| cn-ind-lead-battery-plate-003 | 作业 | 铸造铅酸电池板栅 | 铅合金料 → 铸板栅 | 形状符合本极板要求 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lead |
| cn-ind-lead-battery-plate-004 | 作业 | 拉网形成铅酸电池板栅 | 适用铅带 → 拉网板栅 | 网形符合本产品要求 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lead |
| cn-ind-lead-battery-plate-005 | 作业 | 向管式电极灌入活性粉料 | 管式部件与粉料 → 灌粉电极 | 按本产品装填要求完成 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lead |
| cn-ind-lead-battery-plate-006 | 作业 | 向管式电极挤入铅膏 | 管式部件与铅膏 → 挤膏电极 | 按本产品挤膏要求完成 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lead |
| cn-ind-lead-battery-plate-007 | 作业 | 分切铅酸电池极板 | 联片极板 → 单片极板 | 片形符合本产品要求 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lead |
| cn-ind-lead-battery-plate-008 | 作业 | 刷理极板边缘及极耳 | 待刷理极板 → 整理极板 | 边缘及极耳符合装配要求 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lead |
| cn-ind-lead-battery-plate-009 | 作业 | 对适用极板进行槽式化成 | 待化成极板 → 化成极板 | 完成本工艺化成程序 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lead |
| cn-ind-lead-battery-plate-010 | 检测 | 称量铅酸极板 | 极板 → 称量记录 | 质量与指定分组要求对应 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lead |

阶段缺口：准备、交接、异常、返工、清洁维护、交付

- 平板涂膏、固化干燥、极板水洗及污染物清扫尚缺本轮已读完整操作依据。
- 铅尘作业隔离、个体防护和职业卫生不能用本工艺表代替专项要求。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 铅酸电池包片焊组与内化成

电气机械38铅酸电池装配后段；内外化成随产品工艺选择不重复计算同一电池。

流程来源：cn-battery-hj967-2018。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-lead-battery-assembly-001 | 作业 | 包裹铅酸极板隔离层 | 极板与隔离材料 → 包片极板 | 包覆满足本产品绝缘隔离要求 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lead |
| cn-ind-lead-battery-assembly-002 | 作业 | 焊接铅酸电池极板组 | 包片极板及连接件 → 焊接极板组 | 连接符合本产品要求 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lead |
| cn-ind-lead-battery-assembly-003 | 作业 | 对适用铅酸电池进行内化成 | 装配电池 → 内化成电池 | 完成本产品充放电程序 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lead |
| cn-ind-lead-battery-assembly-004 | 作业 | 清洗铅酸电池表面 | 待清洗电池 → 清洗电池 | 表面满足本工序要求 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lead |
| cn-ind-lead-battery-assembly-005 | 检测 | 测试铅酸电池电性能 | 成品电池 → 电性能记录 | 测试项目对应产品要求 | source-backed | cn-occ-2022-draft#battery；cn-battery-hj967-2018#lead |

阶段缺口：准备、交接、异常、返工、清洁维护、交付

- 组装入槽、灌酸、盖封端子焊接、气密检测、配组包装和漏液不良品处理仍需详细作业标准。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 薄膜太阳电池沉积刻划与连接

电气机械38薄膜太阳电池及组件；各材料体系沉积刻蚀化学条件不同，不将其概称为统一量产路线。

流程来源：cn-battery-hj967-2018。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-thinfilm-solar-001 | 作业 | 清洗薄膜太阳电池基板 | 基板 → 清洁基板 | 满足本薄膜工艺输入要求 | source-backed | cn-occ-2022-draft#pv-module；cn-battery-hj967-2018#solar |
| cn-ind-thinfilm-solar-002 | 作业 | 在电池基板沉积薄膜层 | 基板及沉积材料 → 镀膜基板 | 层结构符合本产品要求 | source-backed | cn-occ-2022-draft#pv-module；cn-battery-hj967-2018#solar |
| cn-ind-thinfilm-solar-003 | 作业 | 激光刻划薄膜电池层 | 镀膜基板 → 刻划电池 | 图形与设计对应 | source-backed | cn-occ-2022-draft#pv-module；cn-battery-hj967-2018#solar |
| cn-ind-thinfilm-solar-004 | 作业 | 清洗电池组件背板 | 背板 → 清洁背板 | 满足后续封装要求 | source-backed | cn-occ-2022-draft#pv-module；cn-battery-hj967-2018#solar |
| cn-ind-thinfilm-solar-005 | 作业 | 焊接薄膜电池引线 | 电池及引线 → 连接电池 | 电极连接对应设计 | source-backed | cn-occ-2022-draft#pv-module；cn-battery-hj967-2018#solar |
| cn-ind-thinfilm-solar-006 | 作业 | 安装薄膜电池接线盒 | 组件和接线盒 → 装盒组件 | 连接和安装符合本产品要求 | source-backed | cn-occ-2022-draft#pv-module；cn-battery-hj967-2018#solar |
| cn-ind-thinfilm-solar-007 | 作业 | 封装薄膜电池组件 | 电池及封装材料 → 封装组件 | 执行本产品封装工艺 | source-backed | cn-occ-2022-draft#pv-module；cn-battery-hj967-2018#solar |
| cn-ind-thinfilm-solar-008 | 检测 | 测试薄膜电池组件电性能 | 组件 → 电性能记录 | 测试项目对应本产品 | source-backed | cn-occ-2022-draft#pv-module；cn-battery-hj967-2018#solar |
| cn-ind-thinfilm-solar-009 | 检测 | 测试薄膜电池组件安全性能 | 组件 → 安全性能记录 | 完成本产品规定试验 | source-backed | cn-occ-2022-draft#pv-module；cn-battery-hj967-2018#solar |

阶段缺口：准备、交接、异常、返工、清洁维护、交付

- 不同薄膜材料的靶材补换、真空腔清洁、激光调焦、封装层压返修、抽检与分选尚需专项标准。
- 晶硅片制绒扩散刻蚀沉积路线及晶硅组件焊片叠层装框未覆盖，不能以薄膜场景代替。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 化学药品片剂配料制粒与压片

医药制造27非无菌片剂生产的主要操作；湿法、干法和直接压片按实际处方路线选择。

流程来源：cn-pharma-hj1063-2019。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-tablet-granulate-press-001 | 准备 | 确认片剂生产前作业状态 | 本批工艺文件与场地设备 → 开工确认记录 | 本批规定开工项目已确认 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#solid |
| cn-ind-tablet-granulate-press-002 | 准备 | 计量片剂原辅料 | 原辅料及批配方 → 计量物料 | 物料与本批配方对应 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#solid |
| cn-ind-tablet-granulate-press-003 | 作业 | 粉碎片剂原辅料 | 适用原辅料 → 粉碎物料 | 符合本产品粒度要求 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#solid |
| cn-ind-tablet-granulate-press-004 | 作业 | 筛分片剂粉料 | 粉料 → 筛分物料 | 规定粒级分别收集 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#solid |
| cn-ind-tablet-granulate-press-005 | 作业 | 混合片剂物料 | 按批计量物料 → 混合料 | 满足本产品混合要求 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#solid |
| cn-ind-tablet-granulate-press-006 | 作业 | 制取片剂用颗粒 | 适用混合料 → 颗粒 | 达到所选制粒路线要求 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#solid |
| cn-ind-tablet-granulate-press-007 | 作业 | 干燥片剂用颗粒 | 湿颗粒 → 干颗粒 | 达到本产品规定干燥状态 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#solid |
| cn-ind-tablet-granulate-press-008 | 作业 | 整粒筛分干燥颗粒 | 干颗粒 → 压片用颗粒 | 符合本产品压片粒级 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#solid |
| cn-ind-tablet-granulate-press-009 | 作业 | 压制药物片剂 | 压片物料 → 片芯 | 片形和份量对应本产品 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#solid |
| cn-ind-tablet-granulate-press-010 | 作业 | 包覆片剂衣层 | 适用片芯和衣料 → 包衣片 | 达到本产品衣层要求 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#solid |
| cn-ind-tablet-granulate-press-011 | 异常 | 判断并处理片剂生产设备故障 | 设备异常 → 处置记录 | 故障已处置或移交 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#solid |
| cn-ind-tablet-granulate-press-012 | 清洁维护 | 清洁片剂生产现场 | 待清洁区域 → 清洁记录 | 规定项目完成 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#solid |
| cn-ind-tablet-granulate-press-013 | 清洁维护 | 保养片剂生产设备 | 待保养设备 → 保养记录 | 规定项目完成 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#solid |

阶段缺口：交接、检测、返工、交付

- 称量复核、过筛异物、取样检验、工序中转、清场验证、偏差与不合格批处置尚未按现行GMP逐条补证。
- 以上工艺只作任务盘点，不以列出的设备规格或定性验收代替经批准的产品参数；物料生产与批放行未完成完整清单。
- 胶囊、颗粒剂、粉针冻干、缓控释等剂型不由本场景代表。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 灭菌液体制剂容器处理与灌装灯检

医药制造27已批准工艺中的液体制剂生产；终端灭菌与无菌灌装路线必须另行验证，不将两者步骤混成一条。

流程来源：cn-pharma-hj1063-2019。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-sterile-liquid-fill-001 | 准备 | 确认液体制剂生产前作业状态 | 本批文件与作业状态 → 确认记录 | 规定开工项目已确认 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#liquid |
| cn-ind-sterile-liquid-fill-002 | 准备 | 计量液体制剂原辅料 | 原辅料与配方 → 计量物料 | 物料与本批配方对应 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#liquid |
| cn-ind-sterile-liquid-fill-003 | 作业 | 配制液体药物料液 | 计量物料 → 待过滤料液 | 执行本产品配制工艺 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#liquid |
| cn-ind-sterile-liquid-fill-004 | 作业 | 清洗直接接触药品的容器 | 待清洗容器 → 清洗容器 | 达到本容器清洗要求 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#liquid |
| cn-ind-sterile-liquid-fill-005 | 作业 | 干燥清洗后的药品容器 | 湿容器 → 干燥容器 | 达到后续处理要求 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#liquid |
| cn-ind-sterile-liquid-fill-006 | 作业 | 灭菌适用的药品包装材料及器具 | 待灭菌材料器具 → 灭菌批次 | 执行本工艺规定灭菌程序 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#liquid |
| cn-ind-sterile-liquid-fill-007 | 作业 | 过滤液体制剂料液 | 料液和过滤设备 → 过滤料液 | 完成本产品规定过滤程序 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#liquid |
| cn-ind-sterile-liquid-fill-008 | 作业 | 灌装液体药物制剂 | 料液与容器 → 灌装制剂 | 灌装量与本产品规格对应 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#liquid |
| cn-ind-sterile-liquid-fill-009 | 作业 | 封闭液体制剂容器 | 灌装容器 → 封闭制剂 | 封闭符合本包装系统要求 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#liquid |
| cn-ind-sterile-liquid-fill-010 | 检测 | 检查灭菌后液体制剂中的可见异物 | 待检液体制剂 → 异物检查记录 | 按本产品程序完成灯检或目检 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#liquid |
| cn-ind-sterile-liquid-fill-011 | 异常 | 判断并处理液体制剂设备故障 | 设备异常 → 处置记录 | 故障已处置或移交 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#liquid |
| cn-ind-sterile-liquid-fill-012 | 清洁维护 | 清洁液体制剂生产现场 | 待清洁区域 → 清洁记录 | 规定项目完成 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#liquid |

阶段缺口：交接、返工、交付

- 容器完整性、灌装前过滤器完整性、无菌保证、微生物取样、介入操作和成品灭菌程序均待专项GMP及批工艺补证。
- 工作任务8明确为灭菌后液体制剂异物检查；不把灯检等同全部质量检验或无菌合格。
- 本清单未添加无依据的成品灭菌操作或自动返工路径；异常批必须有具体处置资料后研究。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 药物制剂成品包装与追溯操作

医药制造27工厂内成品分装包装扫码；批零药品仓储销售和医院调剂不计入。

流程来源：cn-pharma-hj1063-2019。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-drug-pack-trace-001 | 作业 | 按产品规格分装药物制剂 | 制剂与包装 → 分装单元 | 数量或份量符合本规格 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#liquid |
| cn-ind-drug-pack-trace-002 | 作业 | 包装制剂成品 | 分装制剂和包装材料 → 包装成品 | 产品与包装规格对应 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#liquid |
| cn-ind-drug-pack-trace-003 | 交付 | 扫描制剂包装追溯标识 | 包装成品和标识 → 扫码记录 | 记录对应实际包装单元 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#liquid |
| cn-ind-drug-pack-trace-004 | 交接 | 填写并移交制剂操作记录 | 操作信息与记录载体 → 本批操作记录 | 记录能关联所做操作 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#liquid |
| cn-ind-drug-pack-trace-005 | 清洁维护 | 清洁制剂包装现场 | 待清洁包装区域 → 清洁记录 | 规定项目完成 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#liquid |

阶段缺口：准备、检测、异常、返工

- 包装材料核对销毁、印码检验、装盒装箱、防混批清场及成品检验放行尚未有逐项已读流程规范。
- 分装可能与压片后包装或液体灌装存在边界重叠；同一实际分装动作只归一个场景，不能重复计时。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 药品制剂用水与洁净环境操作

医药制造27厂内公辅物料和洁净环境；公用设施服务多条剂型线时只计一次。

流程来源：cn-pharma-hj1063-2019。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-ind-drug-water-cleanroom-001 | 作业 | 制备药品生产用水 | 原水及制水设备 → 制药用水 | 符合本产品适用的药典用水要求 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#utilities |
| cn-ind-drug-water-cleanroom-002 | 作业 | 运行空气净化设备制备洁净空气 | 供气和净化设施 → 洁净空气 | 达到本区域适用要求 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#utilities |
| cn-ind-drug-water-cleanroom-003 | 清洁维护 | 消毒制剂生产环境 | 指定区域 → 消毒记录 | 规定区域完成消毒 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#utilities |
| cn-ind-drug-water-cleanroom-004 | 清洁维护 | 消毒制剂生产设备 | 设备 → 消毒记录 | 规定设备完成消毒 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#utilities |
| cn-ind-drug-water-cleanroom-005 | 清洁维护 | 消毒药品生产器具 | 器具 → 消毒器具 | 规定器具完成消毒 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#utilities |
| cn-ind-drug-water-cleanroom-006 | 清洁维护 | 维护制剂公辅生产设备 | 待维护设备 → 维护记录 | 规定维护项目完成 | source-backed | cn-occ-2022-draft#drug-formulation；cn-pharma-hj1063-2019#utilities |

阶段缺口：准备、交接、检测、异常、返工、交付

- 制水各单元、纯化水/注射用水分路、取样检测、过滤器更换、洁净区监测及验证未完整展开。
- 用水和空气质量要求不赋统一数值，必须对应适用药典和区域要求。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

## 建筑业

in-progress-not-frozen

| 门类 | 状态 | 当前场景 | 未覆盖说明 |
| --- | --- | --- | --- |
| 47 房屋建筑业 | partially-covered | cn-const-steel-wall-form、cn-const-rebar-machining、cn-const-rebar-thread-coupling、cn-const-rebar-raft、cn-const-concrete-pumping、cn-const-concrete-frame-cast | 砌体、钢结构、装配式、木结构、其他模架体系尚未展开；基坑支护、降排水、桩基和防水施工尚未展开；剪力墙、预应力、大体积及其他特殊混凝土尚未展开；各类住宅/工业/公共房屋场景差异、返工拆除与完整交付清单尚未交叉查尽 |
| 48 土木工程建筑业 | partially-covered-historical-source-current-update-pending | cn-const-rural-water-pipe、cn-const-rural-water-tank | 铁路道路桥梁隧道港口机场与大中型水利工程未展开；农村供水井、完整土建池塔、非开挖敷管、基坑支护及临时设施未完整覆盖 |
| 49 建筑安装业 | partially-covered-historical-source-current-update-pending | cn-const-water-plant-equipment、cn-const-water-plant-electrical | 房屋电气照明消防弱电系统未覆盖；电梯扶梯、通风空调、锅炉和其他工艺设备安装未覆盖；管道焊接、专业调试、系统联动试验和运维边界未完整覆盖 |
| 50 建筑装饰、装修和其他建筑业 | partially-covered | cn-const-external-tile、cn-const-interior-coating、cn-const-mortar-plaster、cn-const-light-steel-partition、cn-const-fixed-panel-ceiling | 内墙砖石、外墙涂饰、木金属玻璃陶瓷装饰板、其他隔断体系尚未逐项展开；地板地坪、裱糊软包、栏杆扶手、细部柜体及厨卫整装尚未展开；建筑门窗幕墙安装、拆除和场地准备、古建筑修缮尚未覆盖 |

### 现浇混凝土墙体钢大模板安装与拆回

房屋建筑现浇墙体；现场周转模板，模板工厂制造不在本场景。仅该模板体系，不代表全部模架。

流程来源：cn-concrete-db1832-2021。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-const-steel-wall-form-001 | 准备 | 验收进场钢大模板及连接配件 | 模板及设计清单 → 验收状态标记 | 尺寸孔距配件和拼缝符合专项方案 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#steel-form |
| cn-const-steel-wall-form-002 | 准备 | 测放墙身洞口和模板控制线 | 施工图和楼层基准 → 位置控制线 | 位置标高经核对 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#steel-form |
| cn-const-steel-wall-form-003 | 准备 | 清理并检查模板落位基层 | 基层与测量工具 → 洁净平整落位面 | 杂物清除且平整度按方案复核 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#steel-form |
| cn-const-steel-wall-form-004 | 准备 | 清理模板接触面并涂隔离剂 | 待装模板 → 可用模板表面 | 无附着残渣且不污染钢筋接缝 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#steel-form |
| cn-const-steel-wall-form-005 | 作业 | 搭设模板支撑平台和防护架 | 架材及专项方案 → 稳定操作支撑平台 | 支撑与防护按专项方案核验 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#steel-form；cn-occ-2022-draft#scaffold |
| cn-const-steel-wall-form-006 | 作业 | 固定洞口模板与阴角模板 | 洞口角模及连接件 → 固定洞口角模 | 位置正确且连接稳固 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#steel-form |
| cn-const-steel-wall-form-007 | 作业 | 吊放并连接内外墙大模板 | 内外墙板及起吊条件 → 成组墙体模板 | 落位稳定且相邻板可靠拉结 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#steel-form |
| cn-const-steel-wall-form-008 | 作业 | 连接阳角模板并加设背楞 | 阳角板连接器背楞 → 加固阳角 | 连接形式匹配模板构造 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#steel-form |
| cn-const-steel-wall-form-009 | 作业 | 安装穿墙螺栓并校正墙模 | 螺栓胶套和就位模板 → 锁固校正模板 | 墙宽垂直度和密封按方案验收 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#steel-form |
| cn-const-steel-wall-form-010 | 检测 | 检查模板轴线拼缝预留件与整体稳定 | 装成模板 → 验收记录 | 位置尺寸密封预埋项无漏检 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#steel-form |
| cn-const-steel-wall-form-011 | 交接 | 将合格模架交给混凝土浇筑班组 | 模板验收记录 → 可浇筑作业面 | 检查签认完成后进入浇筑 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#steel-form |
| cn-const-steel-wall-form-012 | 准备 | 核实拆模条件并解除模板连接 | 已达拆模条件墙体 → 可安全起吊模板 | 强度及拆除顺序符合设计方案 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#steel-form |
| cn-const-steel-wall-form-013 | 异常 | 处理与墙面粘附不能脱开的模板 | 粘附模板 → 受控脱离模板 | 不用撞砸方式损坏墙体 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#steel-form |
| cn-const-steel-wall-form-014 | 作业 | 吊运拆下模板至指定存放位置 | 脱开模板及起吊装置 → 稳定存放模板 | 落位稳固且保留操作通道 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#steel-form |
| cn-const-steel-wall-form-015 | 返工 | 修理不平或破损变形模板 | 缺陷模板 → 修复模板 | 复检满足再次安装要求 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#steel-form |
| cn-const-steel-wall-form-016 | 清洁维护 | 清除残浆并养护模板螺杆丝扣 | 周转模板连接件 → 清洁防护模板组件 | 接触面及丝扣清理和保护完成 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#steel-form |
| cn-const-steel-wall-form-017 | 交付 | 分规格码放并标识周转模板 | 清理养护后模板 → 下一循环可领用模板 | 规格分区清楚且防倾覆措施完好 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#steel-form |

阶段缺口：

- 起重驾驶与指挥为协作边界，未另复制为模板任务；脚手架细分体系另待完整场景。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 现场钢筋调直、切断与弯曲成型

房建现场原材到成型半成品；工厂商品钢筋加工若独立经营按制造业执行者归属，不重复计入建筑。

流程来源：cn-concrete-db1832-2021。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-const-rebar-machining-001 | 准备 | 核对钢筋料单与图纸的型号数量尺寸 | 原材料牌和施工图 → 加工配料单 | 编号规格数量及下料长度经核对 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-machine |
| cn-const-rebar-machining-002 | 准备 | 调整钢筋调直模压辊和导向装置 | 钢筋及调直设备 → 适配进料设置 | 与钢筋规格和试调结果相符 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-machine |
| cn-const-rebar-machining-003 | 作业 | 将盘条或弯曲钢筋调直 | 待调直钢筋 → 平直钢筋 | 无局部弯曲且性能要求待检验 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-machine |
| cn-const-rebar-machining-004 | 检测 | 试弯样料并核对成型尺寸 | 样料与下料表 → 批量加工放行结论 | 实际成型尺寸和料表一致 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-machine |
| cn-const-rebar-machining-005 | 作业 | 量划并切断钢筋至下料长度 | 直筋和下料单 → 切断钢筋 | 长度符合料单且切口满足后续连接要求 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-machine |
| cn-const-rebar-machining-006 | 作业 | 在钢筋上标出各弯曲点 | 切断钢筋和成型图 → 弯曲标记 | 标点复核后与成型图相符 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-machine |
| cn-const-rebar-machining-007 | 作业 | 配置芯轴并弯曲钢筋至设计形状 | 标点钢筋和弯曲设备 → 成型钢筋 | 形状弯弧和弯钩依设计验收 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-machine |
| cn-const-rebar-machining-008 | 检测 | 检查成型钢筋并完成预验收 | 成型半成品 → 质量状态标记 | 几何尺寸和表面质量完成检查 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-machine |
| cn-const-rebar-machining-009 | 异常 | 隔离异常脆断或硬度异常钢筋并报验 | 异常加工材料 → 待专项检验批次 | 批次可追踪且未经确认不继续加工 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-machine |
| cn-const-rebar-machining-010 | 返工 | 切除钢筋劈裂或严重弯折端部 | 存在端部缺陷钢筋 → 切除缺陷端的钢筋 | 余料尺寸性能重新确认 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-machine |
| cn-const-rebar-machining-011 | 作业 | 打捆成型钢筋并系上料牌 | 合格半成品与料牌 → 有标识钢筋捆 | 编号部位规格形状数量可读 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-machine |
| cn-const-rebar-machining-012 | 交付 | 按施工部位码放和交出成型钢筋 | 已标识钢筋捆 → 待绑扎领用批次 | 堆放稳定且部位规格不混淆 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-machine |
| cn-const-rebar-machining-013 | 清洁维护 | 维护钢筋加工设备和手工具 | 加工机具 → 维护后可用设备 | 依据设备维护规程确认可用 | source-backed | cn-occ-2022-draft#rebar |

阶段缺口：交接

- 除锈动作在职业职责中存在，具体场景与工艺原文还需读取后补入；不从规范的设备枚举推断现场机械化比例。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 钢筋直螺纹丝头加工与现场套筒连接

机械连接子流程；前序常规下料见钢筋加工，后续整体钢筋网安装见底板绑扎，避免重算。

流程来源：cn-concrete-db1832-2021。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-const-rebar-thread-coupling-001 | 准备 | 验收连接套筒与钢筋端部适配状态 | 套筒钢筋和质量材料 → 适配连接组件 | 规格质量证明和端部外观合格 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-coupling |
| cn-const-rebar-thread-coupling-002 | 检测 | 制作并送检批量加工前的接头工艺试件 | 同厂同规格钢筋套筒 → 试验报告 | 检验通过后才批量加工 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-coupling |
| cn-const-rebar-thread-coupling-003 | 返工 | 修平端面并去除钢筋头毛刺飞边 | 不平整端头 → 可加工端面 | 端面平整垂直且无妨碍螺纹缺陷 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-coupling |
| cn-const-rebar-thread-coupling-004 | 准备 | 按规格调整滚丝刀具导套和定位尺 | 合格钢筋与加工设备 → 丝头加工设置 | 直径螺距和长度与工艺要求相符 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-coupling |
| cn-const-rebar-thread-coupling-005 | 作业 | 剥肋滚轧或套制钢筋连接螺纹 | 已准备钢筋端部 → 加工丝头 | 外形尺寸和丝扣质量待量规检查 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-coupling |
| cn-const-rebar-thread-coupling-006 | 检测 | 使用量规检查并目检加工丝头 | 加工丝头和量规 → 检验标记 | 螺纹及外观符合连接型式要求 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-coupling |
| cn-const-rebar-thread-coupling-007 | 交接 | 装保护帽并分规格交出丝头钢筋 | 合格丝头钢筋 → 受保护连接半成品 | 丝扣不损伤且规格可辨 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-coupling |
| cn-const-rebar-thread-coupling-008 | 清洁维护 | 清除待连接丝扣上的杂物和锈蚀 | 现场丝头和套筒 → 清洁丝扣 | 连接前螺纹完好且无污染 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-coupling |
| cn-const-rebar-thread-coupling-009 | 作业 | 托平对正钢筋并用套筒拧紧连接 | 配对钢筋和套筒 → 拧紧接头 | 位置及拧紧程度符合型式和规格要求 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-coupling |
| cn-const-rebar-thread-coupling-010 | 作业 | 对已完成连接接头作防漏拧标记 | 完成接头 → 可辨已拧紧接头 | 每个接头完成后即时标识 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-coupling |
| cn-const-rebar-thread-coupling-011 | 检测 | 逐个自检接头并配合外观力矩抽检 | 已连接接头 → 接头检查记录 | 规格外露丝扣和拧紧程度可复核 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-coupling |
| cn-const-rebar-thread-coupling-012 | 异常 | 对不合格接头所在批次扩大检查 | 抽检不合格批 → 批次处置清单 | 缺陷范围与处理责任明确 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-coupling |
| cn-const-rebar-thread-coupling-013 | 返工 | 重拧或按批准方案加固异常接头 | 外露丝扣等异常接头 → 返修接头 | 返修后重新检验合格 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-coupling |
| cn-const-rebar-thread-coupling-014 | 检测 | 截取验收批接头试件并送拉伸检验 | 按批标识接头 → 试验报告 | 抽样复检和判定记录完整 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-coupling |
| cn-const-rebar-thread-coupling-015 | 交付 | 提交接头检验记录和可使用批次 | 完成检验接头 → 下一道安装放行批 | 批次对应试验及现场检查可追溯 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-coupling |

阶段缺口：

- 套筒生产和第三方力学检测实验室为外部任务归属，现场截取送检在此记录，实验室试验不重复计建筑人工。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 筏形基础底板钢筋铺放、绑扎与隐蔽交接

房建基础下层网、支撑、上层网及墙柱插筋；一般钢筋加工和套筒接头加工在其他场景，不重复列。

流程来源：cn-concrete-db1832-2021。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-const-rebar-raft-001 | 准备 | 验收进场成型钢筋和保护层垫块 | 钢筋垫块及证明材料 → 可用材料批次 | 规格外观和质量资料符合设计 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-raft |
| cn-const-rebar-raft-002 | 准备 | 清理基层并复核防水保护层交接 | 底板基层及隐检记录 → 可绑扎基底 | 基层洁净且防水隐检已完成 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-raft |
| cn-const-rebar-raft-003 | 准备 | 在垫层测放底板筋梁筋与插筋位置 | 施工图和基准线 → 钢筋定位线 | 位置与保护层设计一致 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-raft |
| cn-const-rebar-raft-004 | 作业 | 排放并绑扎基础梁纵筋箍筋和拉筋 | 已加工梁筋 → 基础梁骨架 | 排布次序连接和尺寸满足图纸 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-raft |
| cn-const-rebar-raft-005 | 作业 | 铺放并绑扎底板下层双向钢筋 | 下层筋和位置线 → 下层钢筋网 | 方向间距交叉点及接头位置经检查 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-raft |
| cn-const-rebar-raft-006 | 作业 | 布置下层保护层垫块和层间马凳 | 垫块马凳及下层网 → 稳定层间支撑 | 保护层厚度及支撑位置按方案核验 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-raft |
| cn-const-rebar-raft-007 | 交接 | 将下层钢筋作业面交给水电预埋施工 | 完成下层网与基础梁 → 预埋可进入作业面 | 阶段检查完成且交接位置明确 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-raft |
| cn-const-rebar-raft-008 | 作业 | 铺放并绑扎底板上层钢筋 | 已交接预埋作业面和上层筋 → 上层钢筋网 | 方向层次搭接和绑点符合图纸 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-raft |
| cn-const-rebar-raft-009 | 作业 | 定位并固定墙柱预埋插筋 | 插筋与放线基准 → 固定墙柱插筋 | 位置锚固与上部稳定措施符合图纸 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-raft |
| cn-const-rebar-raft-010 | 检测 | 分阶段检查底板钢筋排布及连接 | 下层及上层网 → 自检和专项验收记录 | 各阶段钢筋及预埋无漏项 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-raft |
| cn-const-rebar-raft-011 | 返工 | 局部调整绑扎不到位钢筋和插筋 | 检查指出缺陷点 → 整改钢筋网 | 整改项复核满足设计 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-raft |
| cn-const-rebar-raft-012 | 清洁维护 | 清走绑扎遗留杂物并保护钢筋网 | 完成钢筋网 → 清洁受保护作业面 | 杂物移除且人员作业不损伤钢筋 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-raft |
| cn-const-rebar-raft-013 | 交付 | 办理钢筋隐蔽验收并交给浇筑工序 | 通过检验钢筋网和记录 → 隐蔽验收单 | 交接检查及签认完整 | source-backed | cn-occ-2022-draft#rebar；cn-concrete-db1832-2021#rebar-raft |

阶段缺口：异常

- 排水、基坑支护和完整水电预埋操作尚未在此展开；不能据本场景视作基础工程完整覆盖。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 现场预拌混凝土泵送及泵管回收

从进场交接至入模接口；预拌站制造和道路运输由实际执行者分别归制造/运输，现场浇筑振捣单列。

流程来源：cn-concrete-db1832-2021。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-const-concrete-pumping-001 | 准备 | 核对模板钢筋验收和泵送作业条件 | 施工面与验收资料 → 泵送作业确认 | 承接结构和通道通讯条件已核验 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-pump |
| cn-const-concrete-pumping-002 | 准备 | 安放稳定混凝土泵并试运行 | 泵机场地与电水条件 → 可工作泵机 | 放置稳固且试运转正常 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-pump |
| cn-const-concrete-pumping-003 | 作业 | 铺设固定泵管及布料设备 | 合格管段支架与布置图 → 可送浆管路 | 连接密封支撑稳定且不依附钢筋模板 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-pump |
| cn-const-concrete-pumping-004 | 交接 | 核对到场混凝土供货与浇筑任务单 | 运抵混凝土和任务单 → 现场收料交接 | 部位用量技术要求及联络责任一致 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-pump |
| cn-const-concrete-pumping-005 | 检测 | 抽测入泵混凝土状态与工作性能 | 到场拌合物 → 入泵验收结果 | 无超过允许状态的凝结离析且检验合格 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-pump |
| cn-const-concrete-pumping-006 | 准备 | 润湿泵体并用砂浆润滑输送管 | 已检查泵管和润管料 → 可开始泵送管路 | 润管完成且润滑料布置受控 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-pump |
| cn-const-concrete-pumping-007 | 作业 | 控制泵送速度和料斗供料 | 验收混凝土与泵机 → 连续送至布料端的混凝土 | 供料油压和连续性处于批准范围 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-pump |
| cn-const-concrete-pumping-008 | 检测 | 观察进料筛网油压油温与管路振动 | 运行泵机管路 → 运行检查状态 | 异物或异常信号及时识别 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-pump |
| cn-const-concrete-pumping-009 | 异常 | 协调供应间断或可泵性异常的处置 | 中断供料或泌水离析拌合物 → 经确认处置措施 | 与供货和浇筑方确认后受控恢复 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-pump |
| cn-const-concrete-pumping-010 | 异常 | 停止异常泵送并定位堵塞点 | 高压波动或堵管 → 隔离待排故管段 | 不强行继续泵送且原因已排查 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-pump |
| cn-const-concrete-pumping-011 | 返工 | 卸压后拆解堵管并清除堵塞 | 已隔离卸压管段 → 排障恢复管路 | 压力释放确认且重启前排气保护到位 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-pump |
| cn-const-concrete-pumping-012 | 交付 | 向浇筑班组移交布料端混凝土 | 受控泵出混凝土 → 按施工区域的供料 | 质量和时间状态在现场交接中确认 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-pump |
| cn-const-concrete-pumping-013 | 清洁维护 | 清洗泵机和输送管并收集余料污水 | 结束泵送设备 → 清洁设备及集中收集物 | 管路洗净且余料污水收集处理 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-pump |
| cn-const-concrete-pumping-014 | 清洁维护 | 拆回分类堆放泵管并检查损伤 | 已清洗管路 → 下次可用管段 | 规格清楚且损坏件隔离 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-pump |

阶段缺口：

- 泵送事故处置须按设备和专项安全程序；这里是劳动任务边界，不能替代操作规程。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 框架柱梁板混凝土浇筑、振捣与养护

泵送接口之后的房建框架现场；柱梁板差异在动作条件中保留，不代表剪力墙、大体积、预应力或水下混凝土。

流程来源：cn-concrete-db1832-2021。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-const-concrete-frame-cast-001 | 准备 | 检查振捣设备计量器具和作业通道 | 浇筑作业面与机具 → 可施工状态 | 器具检验和作业防护已确认 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-cast |
| cn-const-concrete-frame-cast-002 | 准备 | 凿清并润湿施工缝结合面 | 达到续浇条件的施工缝 → 可续浇接合面 | 软弱层杂物去除并按方案接浆 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-cast |
| cn-const-concrete-frame-cast-003 | 交接 | 接收合格混凝土并确认浇筑区和强度等级 | 供料信息及作业区域 → 对应部位浇筑安排 | 不同等级及浇筑次序不混淆 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-cast |
| cn-const-concrete-frame-cast-004 | 作业 | 将柱混凝土按层布料入模 | 确认供料与柱模 → 分层柱混凝土 | 无不允许离析且层厚依方案控制 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-cast |
| cn-const-concrete-frame-cast-005 | 作业 | 连续铺布梁板混凝土至设计标高 | 梁板区域和供料 → 布料后的梁板面 | 分层顺序标高和施工缝符合图纸方案 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-cast |
| cn-const-concrete-frame-cast-006 | 作业 | 使用振捣器逐点压实混凝土 | 已布料混凝土 → 振实混凝土 | 均匀振实且不损伤钢筋预埋件 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-cast |
| cn-const-concrete-frame-cast-007 | 检测 | 观察浇筑时模板钢筋与预埋件位移 | 浇筑中的结构与支撑 → 监视及异常标记 | 移动变形堵塞及时发现 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-cast |
| cn-const-concrete-frame-cast-008 | 异常 | 停止变形松动模架区域浇筑并组织撤离 | 异常模架和正在作业人员 → 隔离暂停作业区 | 人员撤离且经批准处理后才复工 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-cast |
| cn-const-concrete-frame-cast-009 | 返工 | 在允许时间内校正移位预埋件或钢筋 | 浇筑中发现的偏移 → 复位结构部件 | 按方案复核且处理记录保留 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-cast |
| cn-const-concrete-frame-cast-010 | 作业 | 刮平压实梁板表面并处理收面 | 完成布料振捣楼板 → 已收面楼板 | 标高平整和表面状态符合设计 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-cast |
| cn-const-concrete-frame-cast-011 | 检测 | 在浇筑点取样并制作养护试件 | 现场拌合物及试模 → 可追溯混凝土试件 | 部位批次养护方式和送检记录对应 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-cast |
| cn-const-concrete-frame-cast-012 | 清洁维护 | 覆盖保湿或涂养护剂养护混凝土 | 已浇筑结构和养护材料 → 持续养护结构 | 方式温度时长按现行方案监测 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-cast |
| cn-const-concrete-frame-cast-013 | 检测 | 检查拆模后外观和结构尺寸质量 | 达到检查条件结构 → 质量检查结果 | 缺陷位置尺寸和试验结果有记录 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-cast |
| cn-const-concrete-frame-cast-014 | 返工 | 按批准方案修补混凝土构件缺陷 | 检查确认缺陷 → 修补后待复验构件 | 处理和复验依据由工程责任方确认 | source-backed | cn-occ-2022-draft#concrete |
| cn-const-concrete-frame-cast-015 | 清洁维护 | 清除落地混凝土并回收养护覆盖物 | 落地料及用后覆盖物 → 清洁施工面和收集废物 | 不污染环境且结构成品受保护 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-cast |
| cn-const-concrete-frame-cast-016 | 交付 | 保护达到规定条件的结构并办理工序交接 | 结构及检验养护资料 → 后序可进入作业面 | 强度验收及成品保护条件满足方案 | source-backed | cn-occ-2022-draft#concrete；cn-concrete-db1832-2021#concrete-cast |

阶段缺口：

- 拆模动作引用模板场景，不在此再计；缺陷修补仅职业路径支持，需补批准修补工艺，未将其声称为规范允许任意补修。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 外墙饰面砖选配、粘贴与填缝

北京地方工艺所述陶瓷外墙饰面砖；高处平台由架设专业交接，幕墙干挂、地砖和内墙砖的差异尚待单列。

流程来源：cn-decoration-db1832-2022。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-const-external-tile-001 | 准备 | 核对饰面砖胶粘剂填缝料并挑出缺陷砖 | 进场砖材和配套材料 → 经检合格材料 | 型号色差表面及复验记录符合设计 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#external-tile |
| cn-const-external-tile-002 | 准备 | 核验外窗洞口及脚手架先行工序 | 窗框洞口外墙平台 → 可贴砖作业面 | 封堵预留和平台验收完成 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#external-tile |
| cn-const-external-tile-003 | 检测 | 制作各类基层贴砖样板并进行粘结检验 | 基底砖胶和样板区 → 确认后的工艺样板 | 粘结检验和相关方确认完成 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#external-tile |
| cn-const-external-tile-004 | 准备 | 清理加固并找平待粘贴基层 | 墙体基层 → 合格粘贴基层 | 强度平整及水分条件符合材料体系 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#external-tile |
| cn-const-external-tile-005 | 准备 | 按排砖图弹分格线和控制点 | 排砖深化图与墙面 → 排砖控制标记 | 洞口角部伸缩缝和非整砖位置明确 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#external-tile |
| cn-const-external-tile-006 | 作业 | 清洗并按适用砖种浸泡晾干饰面砖 | 所选饰面砖 → 可粘贴砖 | 按砖种适用工艺处理且表面无浮粉 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#external-tile |
| cn-const-external-tile-007 | 作业 | 按产品比例搅拌粘结材料 | 胶粘材料及水 → 均匀粘结料 | 配比拌合时限依产品要求 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#external-tile |
| cn-const-external-tile-008 | 作业 | 套割洞口砖并涂胶对线压贴 | 墙面粘结料和砖材 → 定位粘贴饰面砖 | 套割吻合且位置缝宽平整受控 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#external-tile |
| cn-const-external-tile-009 | 检测 | 随贴检查垂直平整缝线和空鼓 | 粘贴中的砖面 → 检查结果 | 几何和粘结状态按样板复核 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#external-tile |
| cn-const-external-tile-010 | 返工 | 在允许调整时间内校正或返贴不合格砖 | 发现偏位或不合格砖 → 整改砖面 | 复检合格且不违反胶粘材料时限 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#external-tile |
| cn-const-external-tile-011 | 作业 | 清缝拌填缝料并嵌填普通缝及伸缩缝 | 经自检砖面 → 完成接缝 | 密实连续且材料适配缝类型 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#external-tile |
| cn-const-external-tile-012 | 清洁维护 | 清除填缝残留并保护完成砖面 | 填缝完成面 → 洁净受保护饰面 | 无污染破损且后续作业保护明确 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#external-tile |
| cn-const-external-tile-013 | 检测 | 配合完工粘结强度和饰面检查 | 完成外墙砖面 → 竣工检验记录 | 外观粘结和材料工艺一致性核验完成 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#external-tile |
| cn-const-external-tile-014 | 交付 | 办理砖饰面工序交接并提交检验材料 | 合格墙面及过程记录 → 可接收装饰成品 | 工序验收与相关专业交接有记录 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#general |

阶段缺口：交接、异常

- 外墙饰面可使用性受地方政策、设计和基底体系约束；本文不推断所有新建项目都采用外贴砖。施工失效后的安全拆换工艺尚未展开。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 室内墙顶基层修补、腻子与涂料施工

室内水性墙顶平涂为主要条件；刷涂、滚涂、喷涂是相同面层任务的替代工法，不相加为三遍人工作业。

流程来源：cn-decoration-db1832-2022。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-const-interior-coating-001 | 准备 | 按批号颜色验收并分区保管涂饰材料 | 涂料腻子及检验资料 → 可领用配套涂饰材料 | 颜色型号兼容性与复验记录一致 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#interior-coat |
| cn-const-interior-coating-002 | 准备 | 制作并留存涂饰样板 | 选定材料及样板墙 → 已认可涂饰样板 | 工序色泽与建设方确认一致 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#interior-coat |
| cn-const-interior-coating-003 | 检测 | 检查墙顶基层牢固清洁平整和水分状态 | 待涂墙顶面 → 基层接收结果 | 基层及温湿通风条件适合所选材料 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#interior-coat |
| cn-const-interior-coating-004 | 准备 | 遮护邻近门窗设备与装修面 | 相邻成品及保护材料 → 防污染边界 | 喷滚刷作业不污染衔接内容 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#interior-coat |
| cn-const-interior-coating-005 | 返工 | 剔除松散旧层并修填基层孔缝 | 粉化旧层及孔缝 → 平整牢固基层 | 污物和松散物清除且填补密实 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#interior-coat |
| cn-const-interior-coating-006 | 作业 | 按基层类型施涂界面剂或封闭底漆 | 修复清洁基层 → 处理后基面 | 需要处理部位无遗漏且符合材料体系 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#interior-coat |
| cn-const-interior-coating-007 | 作业 | 分遍批刮腻子找平墙顶与阴阳角 | 待找平基层与腻子 → 找平腻子层 | 干燥间隔和厚度按材料工艺确认 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#interior-coat |
| cn-const-interior-coating-008 | 作业 | 打磨干燥腻子并清除粉尘 | 干燥腻子层 → 光洁可涂基面 | 不磨穿且阴阳角和表面平整 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#interior-coat |
| cn-const-interior-coating-009 | 作业 | 调匀涂料并完成首遍墙顶面层 | 准备基面与涂料 → 首遍涂层 | 选定刷滚喷工法下无遗漏流坠 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#interior-coat |
| cn-const-interior-coating-010 | 返工 | 修补首涂后坑点并磨除颗粒毛刺 | 首涂后的表面缺陷 → 可续涂面层 | 缺陷处理干燥并除尘完成 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#interior-coat |
| cn-const-interior-coating-011 | 作业 | 按配套工艺完成后续面层涂布 | 已干燥处理涂层 → 完整涂饰面 | 遍次间隔色泽及质感按样板验收 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#interior-coat |
| cn-const-interior-coating-012 | 检测 | 在养护期满后检查涂饰外观与粘结 | 完成涂饰面及材料记录 → 批次验收结果 | 无不允许露底开裂起皮掉粉 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#interior-coat |
| cn-const-interior-coating-013 | 清洁维护 | 清理完成空间并保护涂饰面 | 施工残留和涂饰成品 → 洁净受保护房间 | 相邻构件无污染且成品保护到位 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#general |
| cn-const-interior-coating-014 | 交付 | 交出涂饰区域样板及过程验收记录 | 已验收房间与档案 → 后续专业接收记录 | 材料基层施工记录可追溯 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#interior-coat |

阶段缺口：交接、异常

- 多彩、砂壁、艺术涂层的分格和中间层工序未完全展开；危险旧涂层拆除及基底污染异常需要独立工艺。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 预拌砂浆墙面抹灰、分格与养护

混凝土、砖砌体及加气混凝土基底；基底材料改变界面处理与层厚条件，不能共用未经验证的参数。

流程来源：cn-decoration-db1832-2022。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-const-mortar-plaster-001 | 准备 | 验收预拌砂浆材料和检验资料 | 进场砂浆及证明 → 合格砂浆批次 | 外观批次与复验符合设计 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#mortar-plaster |
| cn-const-mortar-plaster-002 | 交接 | 核查主体门窗预埋及防水先行工序 | 待抹灰作业面 → 已接收基层 | 先行工程验收且孔槽预埋条件满足 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#mortar-plaster |
| cn-const-mortar-plaster-003 | 准备 | 清理墙面并填补凸凹与门窗周缝 | 不平基底及缝隙 → 坚实平整基底 | 浮尘油污和不牢部位已处理 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#mortar-plaster |
| cn-const-mortar-plaster-004 | 准备 | 按基底湿润并施作界面处理 | 清理后的墙体 → 可抹灰界面 | 基底类型适配且无不允许明水 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#mortar-plaster |
| cn-const-mortar-plaster-005 | 作业 | 测垂直套方并设置灰饼控制厚度 | 墙面与测量工具 → 定位灰饼 | 垂直平整和抹灰厚度基准明确 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#mortar-plaster |
| cn-const-mortar-plaster-006 | 作业 | 分层抹底灰并刮平搓毛 | 可施工基面及砂浆 → 底灰层 | 层间条件厚度和平整依工艺控制 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#mortar-plaster |
| cn-const-mortar-plaster-007 | 作业 | 在异材交界或需加强处铺设加强网 | 设计指定位置与加强网 → 增强连接层 | 搭接和固定按现行方案验收 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#mortar-plaster |
| cn-const-mortar-plaster-008 | 作业 | 弹线安装分格条和滴水槽 | 底灰面与分格设计 → 已定位分格滴水构件 | 位置连贯且排水要求明确 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#mortar-plaster |
| cn-const-mortar-plaster-009 | 返工 | 修整箱槽洞口和管后底灰 | 洞口管后不齐表面 → 平齐方正边界 | 不堵封预留孔并符合设备接口 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#mortar-plaster |
| cn-const-mortar-plaster-010 | 作业 | 施抹面层砂浆并压光成面 | 底灰与面层砂浆 → 面层灰面 | 面层粘结平整且阴阳角顺直 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#mortar-plaster |
| cn-const-mortar-plaster-011 | 作业 | 取出分格条并完成踢脚和滴水细部 | 面灰及细部区域 → 完整边缝细部 | 边棱不破损且滴水坡槽符合设计 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#mortar-plaster |
| cn-const-mortar-plaster-012 | 清洁维护 | 在适宜条件下湿养护抹灰层 | 已抹灰墙面 → 养护记录和墙面 | 硬化期保湿防晒冻和撞击受控 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#mortar-plaster |
| cn-const-mortar-plaster-013 | 检测 | 检查抹灰空鼓裂缝平整和分格质量 | 养护后灰面 → 验收结果 | 几何粘结和表面质量符合要求 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#mortar-plaster |
| cn-const-mortar-plaster-014 | 清洁维护 | 清除框边管后残浆并保护墙角 | 完成抹灰区域 → 洁净受保护墙面 | 门窗孔槽和墙角不污染损伤 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#mortar-plaster |
| cn-const-mortar-plaster-015 | 交付 | 办理抹灰面与后续饰面工序交接 | 检验合格墙面及记录 → 后序施工接收记录 | 强度养护和基面条件经确认 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#general |

阶段缺口：异常

- 石膏抹灰、机械喷抹具体控制、脱落后的受控清除与重新施工尚待独立盘点。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 轻钢龙骨纸面石膏板隔墙安装

地枕可有可无；主场景纸面石膏板，纤维水泥/木基板的差异尚未完全展开。墙内电气安装归专业安装场景，只计交接。

流程来源：cn-decoration-db1832-2022。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-const-light-steel-partition-001 | 准备 | 验收隔墙龙骨面板与填充材料 | 板材骨架配件及资料 → 可用材料批次 | 尺寸外观及防潮防火隔声性能适配 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#partition |
| cn-const-light-steel-partition-002 | 准备 | 测放隔墙门洞和顶地龙骨位置 | 平面设计和施工基准 → 隔墙控制线 | 墙线门洞和标高复核一致 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#partition |
| cn-const-light-steel-partition-003 | 作业 | 在设计要求处制作地枕基座 | 地面和基座材料 → 合格地枕 | 连接基底处理且达到后续安装条件 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#partition |
| cn-const-light-steel-partition-004 | 作业 | 固定沿顶沿地及门洞龙骨 | 位置线与骨架件 → 边界骨架 | 锚固可靠并符合门洞构造 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#partition |
| cn-const-light-steel-partition-005 | 作业 | 安装校正竖龙骨横撑和角部加强件 | 边界骨架及竖横构件 → 完整隔墙骨架 | 模数垂直和连接按设计复核 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#partition |
| cn-const-light-steel-partition-006 | 检测 | 检查封板前龙骨安装质量 | 骨架及门洞 → 封板前检查记录 | 间距连接加强及洞口符合设计 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#partition |
| cn-const-light-steel-partition-007 | 作业 | 切配并固定隔墙一侧石膏板 | 合格骨架与面板 → 单侧封板墙体 | 板边和螺钉固定满足构造 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#partition |
| cn-const-light-steel-partition-008 | 交接 | 与电气专业确认墙内管盒安装及隐检 | 开放墙腔与预埋线路 → 隐蔽交接记录 | 管线验收且不擅自切断龙骨 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#partition |
| cn-const-light-steel-partition-009 | 作业 | 铺填墙体防火隔声防潮材料 | 墙腔及指定填料 → 已填充墙腔 | 密实均匀无下坠并完成隐检 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#partition |
| cn-const-light-steel-partition-010 | 作业 | 错缝安装另一侧和设计附加层面板 | 验收墙腔与面板 → 封闭隔墙 | 板缝布置与固定符合设计 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#partition |
| cn-const-light-steel-partition-011 | 作业 | 清缝嵌填腻子并粘贴拉接带 | 封板接缝 → 接缝防裂层 | 嵌实刮平且带材无气泡 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#partition |
| cn-const-light-steel-partition-012 | 作业 | 对板面钉帽作防锈并填平 | 面板固定钉帽 → 完成钉眼 | 防锈和填平无漏点 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#partition |
| cn-const-light-steel-partition-013 | 检测 | 检查隔墙表面连接填料及洞口质量 | 封闭隔墙和隐检记录 → 隔墙验收记录 | 牢固平整孔槽吻合且性能资料齐全 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#partition |
| cn-const-light-steel-partition-014 | 清洁维护 | 清理隔墙施工残留并保护面板 | 完成隔墙及废料 → 可交付施工面 | 废料分类且板面不受潮损坏 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#general |
| cn-const-light-steel-partition-015 | 交付 | 交出验收隔墙供后续面层施工 | 隔墙和过程档案 → 饰面工序接收记录 | 隐检与完成面状态可核查 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#general |

阶段缺口：异常、返工

- 纸面石膏板异常返工的具体工艺未在本次读取段落中取得；不得用另一板材的修补条款代替。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 固定式石膏罩面板吊顶安装

主体顶板至固定式板面；吊顶内设备管线和独立重型设备吊挂按执行专业归属，此场景记录接口核验。

流程来源：cn-decoration-db1832-2022。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-const-fixed-panel-ceiling-001 | 准备 | 验收吊杆龙骨面板及连接配件 | 进场材料和质量资料 → 已验收吊顶材料 | 设计规格与防火环保资料一致 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#ceiling |
| cn-const-fixed-panel-ceiling-002 | 交接 | 核对吊顶净高和内部管线设备验收 | 现场顶面设备与各专业记录 → 封顶前交接结果 | 标高空间及管线试压调试已确认 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#ceiling |
| cn-const-fixed-panel-ceiling-003 | 准备 | 测放吊顶标高及龙骨吊杆位置 | 吊顶图和水准基准 → 控制线与定位点 | 面板高度和吊点布置可复核 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#ceiling |
| cn-const-fixed-panel-ceiling-004 | 作业 | 钻孔固定吊杆及需要的反支撑 | 定位顶板和吊挂组件 → 可靠吊挂体系 | 锚固承载防锈及加强符合设计 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#ceiling |
| cn-const-fixed-panel-ceiling-005 | 作业 | 固定边龙骨并安装调平主龙骨 | 边界基准与主龙骨 → 调平主框架 | 连接稳定且起拱标高符合设计 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#ceiling |
| cn-const-fixed-panel-ceiling-006 | 作业 | 安装次龙骨和洞口补强骨架 | 主框架与次龙骨 → 板面承托骨架 | 板缝承托设备检修洞口构造完整 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#ceiling |
| cn-const-fixed-panel-ceiling-007 | 检测 | 核对封板前吊挂骨架及设备接口 | 完成骨架和设备点位 → 封板检查记录 | 间距稳定防锈及接口符合设计 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#ceiling |
| cn-const-fixed-panel-ceiling-008 | 作业 | 配切石膏板并从中部向周边固定 | 面板与验收骨架 → 固定式吊顶板面 | 面板自然就位且接缝错开有承托 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#ceiling |
| cn-const-fixed-panel-ceiling-009 | 返工 | 剔除变形螺钉并在合适位置补钉 | 弯曲变形固定螺钉 → 重新固定板面 | 不损伤纸面且钉位满足工艺 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#ceiling |
| cn-const-fixed-panel-ceiling-010 | 作业 | 防锈填平钉眼并清填板缝贴防裂带 | 已固定板面 → 接缝钉眼处理面 | 嵌填饱满平整且防裂层连续 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#ceiling |
| cn-const-fixed-panel-ceiling-011 | 作业 | 配合开设设备检修口并修整板面交界 | 设计洞口与板面 → 吻合检修设备接口 | 位置形状与刚度完整性符合设计 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#ceiling |
| cn-const-fixed-panel-ceiling-012 | 检测 | 检查吊顶标高造型表面和连接质量 | 完成吊顶与过程记录 → 吊顶验收结论 | 尺寸平整接缝牢固及接口无漏检 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#ceiling |
| cn-const-fixed-panel-ceiling-013 | 清洁维护 | 清洁板面并分类收集吊顶废材 | 完成板面和施工余料 → 清洁保护后的吊顶 | 表面无污染且废料按要求回收 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#general |
| cn-const-fixed-panel-ceiling-014 | 交付 | 移交吊顶验收和隐蔽交接资料 | 完成吊顶与档案 → 后续接收记录 | 检修口及内藏专业记录可追溯 | source-backed | cn-occ-2022-draft#decoration；cn-decoration-db1832-2022#general |

阶段缺口：异常

- 活动板、金属板、造型吊顶与声学特殊空间未完整展开；不存在由本清单推出自动封顶可行性的结论。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 农村供水埋地管线施工与通水前验证

辽宁农村供水历史工艺范围；市政/水利输配主管施工候选48，建筑内部管道另归49。现场执行者分类待核，不能以管工职业代替行业统计分类。

流程来源：cn-rural-water-ln-2013。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-const-rural-water-pipe-001 | 准备 | 核对进场管材管件外观尺寸和质量资料 | 管件合同及证明 → 可安装管材批次 | 规格数量材质防腐与检测资料一致 | source-backed | cn-occ-2022-draft#pipe-install；cn-rural-water-ln-2013#materials |
| cn-const-rural-water-pipe-002 | 准备 | 分类存放管材并设置遮阳防损保护 | 进场管材和场地 → 受保护材料堆 | 标识清楚且满足材料储存条件 | source-backed | cn-occ-2022-draft#pipe-install；cn-rural-water-ln-2013#materials |
| cn-const-rural-water-pipe-003 | 作业 | 按设计开挖管道沟槽 | 放线路由和土层 → 待验收沟槽 | 几何和基础条件按现行设计验收 | source-backed | cn-rural-water-ln-2013#pipeline；cn-occ-2022-draft#rural-builder；cn-occ-2022-draft#earthwork |
| cn-const-rural-water-pipe-004 | 作业 | 处理硬质槽底并铺设要求的管底垫层 | 已开挖沟槽和垫层料 → 承管基底 | 材料及厚度依地基管材条件确认 | source-backed | cn-rural-water-ln-2013#pipeline；cn-occ-2022-draft#rural-builder |
| cn-const-rural-water-pipe-005 | 交接 | 核验土建沟槽后接收管道安装面 | 基底与土建检查记录 → 可安装沟槽 | 前序检查合格且记录完成 | source-backed | cn-rural-water-ln-2013#pipeline；cn-occ-2022-draft#rural-builder |
| cn-const-rural-water-pipe-006 | 准备 | 清除管内杂物和外表面污物 | 待安装管节 → 洁净管件 | 无妨碍连接和通水的污染物 | source-backed | cn-occ-2022-draft#pipe-install；cn-rural-water-ln-2013#pipeline |
| cn-const-rural-water-pipe-007 | 作业 | 逐节放管对中并调整安装高程 | 管件及测量基准 → 已定位管线 | 中线高程符合设计且无损伤 | source-backed | cn-occ-2022-draft#pipe-install；cn-rural-water-ln-2013#pipeline |
| cn-const-rural-water-pipe-008 | 作业 | 用适配连接工艺组对管件与阀件 | 定位管节和接口材料 → 连通管段 | 连接强度和密封依管材体系确认 | source-backed | cn-occ-2022-draft#pipe-install；cn-rural-water-ln-2013#pipeline |
| cn-const-rural-water-pipe-009 | 检测 | 复测安装管节的中心线和高程 | 已连接管线 → 测量检查记录 | 定位误差满足现行设计要求 | source-backed | cn-occ-2022-draft#pipe-install；cn-rural-water-ln-2013#pipeline |
| cn-const-rural-water-pipe-010 | 作业 | 装设阀门计量装置并检验开闭动作 | 阀表及随机文件 → 可操作阀表 | 装配完整方向正确且功能检查完成 | source-backed | cn-occ-2022-draft#pipe-install；cn-rural-water-ln-2013#pressure-flush |
| cn-const-rural-water-pipe-011 | 准备 | 向试验管段充水排气并按管材浸泡 | 隔离试验段和试验水 → 可试压管段 | 排气浸泡及试验边界按批准程序完成 | source-backed | cn-occ-2022-draft#pipe-install；cn-rural-water-ln-2013#pressure-flush |
| cn-const-rural-water-pipe-012 | 检测 | 开展管道强度和严密性试验 | 准备管段及测试仪表 → 试压和渗漏记录 | 压力保压及允许渗漏按当前标准确认 | source-backed | cn-occ-2022-draft#pipe-install；cn-rural-water-ln-2013#pressure-flush |
| cn-const-rural-water-pipe-013 | 返工 | 处理检查确认的不合格连接并复测 | 不合格管段 → 修复待复验管段 | 处置方案确认且重检通过 | source-backed | cn-occ-2022-draft#pipe-install |
| cn-const-rural-water-pipe-014 | 清洁维护 | 冲洗消毒安装管段并再冲洗 | 合格试压管线 → 可取样管内水 | 采用经批准现行消毒工艺 | source-backed | cn-occ-2022-draft#pipe-install；cn-rural-water-ln-2013#pressure-flush |
| cn-const-rural-water-pipe-015 | 检测 | 采集冲洗后水样交检 | 完成冲洗管线 → 可追溯水质样本 | 检测合格才进入供水交付 | source-backed | cn-occ-2022-draft#pipe-install；cn-rural-water-ln-2013#pressure-flush |
| cn-const-rural-water-pipe-016 | 作业 | 用适宜材料回填保护管周和沟槽 | 通过相关验收管线和回填料 → 回填沟槽 | 材料层厚及管线保护按现行方案验收 | source-backed | cn-rural-water-ln-2013#pipeline；cn-occ-2022-draft#rural-builder；cn-occ-2022-draft#earthwork |
| cn-const-rural-water-pipe-017 | 作业 | 安装匹配道路条件的阀井井盖 | 完成阀井及井盖 → 可用阀井出入口 | 井盖类别承载及路面高程符合设计 | source-backed | cn-rural-water-ln-2013#pressure-flush；cn-occ-2022-draft#rural-builder |
| cn-const-rural-water-pipe-018 | 异常 | 围护当日未完成回填的井槽 | 开放井槽和警示设施 → 受控施工边界 | 围栏标识完整且人员风险受控 | source-backed | cn-rural-water-ln-2013#pressure-flush；cn-occ-2022-draft#rural-builder；cn-occ-2022-draft#earthwork |
| cn-const-rural-water-pipe-019 | 清洁维护 | 清理管道阀井施工遗留物 | 完工现场和废物 → 清洁场地 | 遗留土方和杂物清理完成 | source-backed | cn-occ-2022-draft#pipe-install；cn-rural-water-ln-2013#pressure-flush |
| cn-const-rural-water-pipe-020 | 交付 | 汇交隐检试压水质与安装记录 | 验收管网及记录 → 供水运行方接收材料 | 位置质量及试验记录可追溯 | source-backed | cn-occ-2022-draft#pipe-install；cn-rural-water-ln-2013#materials |

阶段缺口：

- 依据2013历史资料发现任务，绝不将网页2025日期当作标准修订。沟槽支护、管线探测、交通组织、顶管和不停水接驳未展开；完整现行SOP待补。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 农村供水砖石蓄水构筑物及防渗验证

历史资料所述砌筑蓄水池与防水层；钢筋混凝土池结构主体、塔身与供水井尚未展开。

流程来源：cn-rural-water-ln-2013。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-const-rural-water-tank-001 | 准备 | 检查并湿润砌筑砖石表面 | 砖石及清洁水 → 可砌筑砖石 | 污物移除并按材料要求处理 | source-backed | cn-occ-2022-draft#masonry；cn-rural-water-ln-2013#water-tank |
| cn-const-rural-water-tank-002 | 作业 | 按设计错缝搭砌池壁砖石 | 砖石砂浆和位置基准 → 已砌池壁 | 搭砌灰缝与预埋件符合设计 | source-backed | cn-occ-2022-draft#masonry；cn-rural-water-ln-2013#water-tank |
| cn-const-rural-water-tank-003 | 作业 | 固定穿池预埋管并施工防渗细部 | 预埋管与池壁 → 防渗连接节点 | 固定和防渗构造按设计确认 | source-backed | cn-occ-2022-draft#masonry；cn-rural-water-ln-2013#water-tank；cn-occ-2022-draft#waterproof |
| cn-const-rural-water-tank-004 | 准备 | 清理湿润并修整防水施工基层 | 池壁池底 → 可做防水基层 | 坚实洁净粗糙适宜且无积水 | source-backed | cn-occ-2022-draft#masonry；cn-rural-water-ln-2013#water-tank；cn-occ-2022-draft#waterproof |
| cn-const-rural-water-tank-005 | 作业 | 分层铺抹防水砂浆并处理转角接茬 | 基层及防水砂浆 → 连续防水层 | 层次搭接转角及厚度符合方案 | source-backed | cn-occ-2022-draft#masonry；cn-rural-water-ln-2013#water-tank；cn-occ-2022-draft#waterproof |
| cn-const-rural-water-tank-006 | 清洁维护 | 覆盖洒水养护池壁与防水层 | 新砌池壁及防水面 → 养护状态记录 | 时长环境和保护依现行方案确认 | source-backed | cn-occ-2022-draft#masonry；cn-rural-water-ln-2013#water-tank；cn-occ-2022-draft#waterproof |
| cn-const-rural-water-tank-007 | 检测 | 分阶段充水并测读水位计算渗漏 | 达到试验条件水池 → 满水试验记录 | 外观和渗漏结果满足现行验收 | source-backed | cn-occ-2022-draft#masonry；cn-rural-water-ln-2013#water-tank |
| cn-const-rural-water-tank-008 | 返工 | 按批准修复方案处理防水缺陷 | 经检查确认渗漏点 → 返修待复验水池 | 修复后重新试验通过 | source-backed | cn-occ-2022-draft#masonry；cn-occ-2022-draft#waterproof |
| cn-const-rural-water-tank-009 | 清洁维护 | 按供水要求清洗消毒构筑物 | 完成施工容器 → 可取样检验容器 | 具体消毒工艺和合格判据待现行SOP确认 | proposed | cn-occ-2022-draft#masonry；cn-occ-2022-draft#rural-builder |
| cn-const-rural-water-tank-010 | 交付 | 完成满水试验后的外壁及回填交接 | 合格水池和记录 → 后续工序接收记录 | 验收记录与回填条件明确 | source-backed | cn-occ-2022-draft#masonry；cn-rural-water-ln-2013#water-tank |

阶段缺口：交接、异常

- 清洗消毒对所读原文明确的是水塔，拓展到本砖石蓄水池列proposed，不能偷换来源。满水试验执行职业职责依据偏弱，需补水工职业标准。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 供水泵房机泵与处理消毒设备安装调试

农村供水工程内机械设备安装的候选49场景；若随主体工程由48单位执行，按执行者主营活动归属，不在两个行业重复计。

流程来源：cn-rural-water-ln-2013。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-const-water-plant-equipment-001 | 准备 | 开箱核对机泵设备和配件随机资料 | 到货设备与合同 → 设备接收记录 | 规格外观附件和质量文件一致 | source-backed | cn-occ-2022-draft#mechanical-install；cn-rural-water-ln-2013#materials |
| cn-const-water-plant-equipment-002 | 交接 | 核验机泵基础标高预埋和强度条件 | 基础及土建记录 → 可安装设备基础 | 地基防水和加载条件已验收 | source-backed | cn-occ-2022-draft#mechanical-install；cn-rural-water-ln-2013#pump-equipment |
| cn-const-water-plant-equipment-003 | 作业 | 就位并调整机泵或处理设备 | 安装基础和设备 → 定位设备 | 平面标高及安装条件符合设计 | source-backed | cn-occ-2022-draft#mechanical-install；cn-rural-water-ln-2013#pump-equipment |
| cn-const-water-plant-equipment-004 | 作业 | 按随机文件组装连接设备组件 | 处理消毒设备组件 → 组装设备 | 连接构造与产品安装要求一致 | source-backed | cn-occ-2022-draft#mechanical-install；cn-rural-water-ln-2013#pump-equipment |
| cn-const-water-plant-equipment-005 | 检测 | 开展处理设备强度及严密性试验 | 安装处理消毒设备 → 设备试验记录 | 压力稳压及密封满足现行产品要求 | source-backed | cn-occ-2022-draft#mechanical-install；cn-rural-water-ln-2013#pump-equipment |
| cn-const-water-plant-equipment-006 | 作业 | 调试机泵并进行规定条件试运转 | 安装机泵与能源介质 → 试运转结果 | 运行工况符合设计和现行验收程序 | source-backed | cn-occ-2022-draft#mechanical-install；cn-rural-water-ln-2013#pump-equipment |
| cn-const-water-plant-equipment-007 | 异常 | 排查试运行发现的设备故障 | 试运异常设备 → 故障处置记录 | 隔离原因查明并形成修复安排 | source-backed | cn-occ-2022-draft#mechanical-install |
| cn-const-water-plant-equipment-008 | 返工 | 重新调整或连接不合格设备接口 | 安装调试缺陷 → 待复验设备 | 按制造商方案修复并通过复验 | source-backed | cn-occ-2022-draft#mechanical-install |
| cn-const-water-plant-equipment-009 | 清洁维护 | 整理安装区域并移除保护包装 | 安装结束设备周边 → 可交接区域 | 按卫生安全要求清理且开口受保护 | proposed | cn-occ-2022-draft#mechanical-install |
| cn-const-water-plant-equipment-010 | 交付 | 移交安装试运记录及随机文件 | 通过验收设备和档案 → 运行方接收包 | 设备编号对应记录和维护资料 | source-backed | cn-occ-2022-draft#mechanical-install；cn-rural-water-ln-2013#materials |

阶段缺口：

- 故障排查有职业依据但无具体型号SOP；清洁边界暂为proposed。泵体制造不在此计，电缆及电气试验另场景。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 农村供水泵房变压器与防雷装置安装

安装49候选；仅历史原文明确的变压器、防雷连接，未代表完整电力施工或泵房控制系统。

流程来源：cn-rural-water-ln-2013。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-const-water-plant-electrical-001 | 准备 | 检查到场电气设备和配件质量 | 变压器防雷器件及资料 → 验收电气材料 | 外观规格和质量文件符合设计 | source-backed | cn-occ-2022-draft#electrical-install；cn-rural-water-ln-2013#materials |
| cn-const-water-plant-electrical-002 | 作业 | 就位安装供水泵房变压器 | 安装条件与变压器 → 安装变压器 | 位置连接按现行产品及电气标准确认 | source-backed | cn-occ-2022-draft#electrical-install；cn-rural-water-ln-2013#electrical |
| cn-const-water-plant-electrical-003 | 检测 | 对变压器进行交接试验并接受检查 | 安装变压器及测试器具 → 电气交接试验记录 | 试验项目及检查认定满足现行要求 | source-backed | cn-occ-2022-draft#electrical-install；cn-rural-water-ln-2013#electrical |
| cn-const-water-plant-electrical-004 | 作业 | 安装连接防雷装置和引下电气通路 | 防雷器件与金属构件 → 可靠电气连接 | 位置正确连接连续且符合设计 | source-backed | cn-occ-2022-draft#electrical-install；cn-rural-water-ln-2013#electrical |
| cn-const-water-plant-electrical-005 | 作业 | 补刷防雷连接焊接部位防腐涂层 | 检验焊接部位 → 受保护接头 | 焊缝和防腐无遗漏 | source-backed | cn-occ-2022-draft#electrical-install；cn-rural-water-ln-2013#electrical |
| cn-const-water-plant-electrical-006 | 异常 | 排查安装试验发现的电气故障 | 电气异常记录 → 故障处置记录 | 原因与修复责任已确认 | source-backed | cn-occ-2022-draft#electrical-install |
| cn-const-water-plant-electrical-007 | 交付 | 移交电气安装调试及验收记录 | 合格电气设备和档案 → 运行方接收材料 | 设备标识与试验记录一致 | source-backed | cn-occ-2022-draft#electrical-install；cn-rural-water-ln-2013#materials |

阶段缺口：交接、返工、清洁维护

- 防雷测量、停送电、线缆敷设与控制联调需补完整当前规范；没有从历史条款推断今日合规清单。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

## 批发和零售业

partial-inventory-in-progress

| 门类 | 状态 | 当前场景 | 未覆盖说明 |
| --- | --- | --- | --- |
| 51 批发业 | partial | cn-trade-food-receiving | 只覆盖食品批零部分场景；非食品与专业贸易、线上业务和其他销售模式未完成。；按本场景gaps继续拓展，不能称本门类清单已完整。 |
| 52 零售业 | partial | cn-trade-food-store、cn-trade-bulk-food-pack | 只覆盖食品批零部分场景；非食品与专业贸易、线上业务和其他销售模式未完成。；按本场景gaps继续拓展，不能称本门类清单已完整。 |

### 食品批发企业到货验收、分区储存及订单出货

代码51；批发经营单位自营收储发流程，第三方仓储另属交通仓储，不与同批货物门店接收合并核算。

流程来源：cn-food-retail-gb31621-2014。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-trade-food-receiving-001 | 准备 | 核对食品供货证明和到货单据 | 供货证明到货单 → 文件核对结果 | 证明与供货者及食品一致 | source-backed | cn-occ-2022-draft#tally；cn-food-retail-gb31621-2014#receipt |
| cn-trade-food-receiving-002 | 交接 | 清点到货食品品种与数量 | 到货食品 → 到货记录 | 品种规格数量对应单据 | source-backed | cn-occ-2022-draft#tally；cn-food-retail-gb31621-2014#receipt |
| cn-trade-food-receiving-003 | 检测 | 抽查到货食品感官状态 | 到货食品 → 感官检验记录 | 异常食品得到识别 | source-backed | cn-occ-2022-draft#tally；cn-food-retail-gb31621-2014#receipt |
| cn-trade-food-receiving-004 | 检测 | 测量温控食品到货温度 | 温控食品与测温器 → 到货温度记录 | 测点结果对应批次并按品类要求判定 | source-backed | cn-occ-2022-draft#tally；cn-food-retail-gb31621-2014#receipt |
| cn-trade-food-receiving-005 | 异常 | 隔离并标记未通过验收的食品 | 不合格到货食品 → 隔离货物 | 与可售食品区分并有处置记录 | source-backed | cn-occ-2022-draft#tally；cn-food-retail-gb31621-2014#receipt |
| cn-trade-food-receiving-006 | 作业 | 将合格食品分区堆码入库 | 验收合格食品 → 指定储位库存 | 按生熟品类和储存条件分区 | source-backed | cn-occ-2022-draft#tally；cn-food-retail-gb31621-2014#storage |
| cn-trade-food-receiving-007 | 作业 | 标识食品储位和生产批次 | 库存与批次资料 → 储位标识 | 货位与食品日期批次对应 | source-backed | cn-occ-2022-draft#tally；cn-food-retail-gb31621-2014#storage；cn-occ-2022-draft#warehouse |
| cn-trade-food-receiving-008 | 检测 | 巡查库存食品质量和保质状态 | 库存食品 → 巡查记录 | 变质过期或残损品可定位 | source-backed | cn-occ-2022-draft#tally；cn-food-retail-gb31621-2014#storage；cn-occ-2022-draft#warehouse |
| cn-trade-food-receiving-009 | 检测 | 监测仓储温湿环境 | 储存设施与仪表 → 环境记录 | 环境满足所储食品要求 | source-backed | cn-occ-2022-draft#tally；cn-food-retail-gb31621-2014#storage；cn-occ-2022-draft#warehouse |
| cn-trade-food-receiving-010 | 作业 | 按订单与库存顺序拣选食品 | 出库凭证与库存 → 订单拣货 | 品种批次数量与凭证一致 | source-backed | cn-occ-2022-draft#tally；cn-food-retail-gb31621-2014#storage；cn-occ-2022-draft#warehouse |
| cn-trade-food-receiving-011 | 检测 | 复核订单食品与包装状态 | 拣选货品 → 复核货品 | 订单数量批次及包装符合出货要求 | source-backed | cn-occ-2022-draft#tally；cn-food-retail-gb31621-2014#sales |
| cn-trade-food-receiving-012 | 作业 | 包装或加固待运食品 | 待运食品与适用包装 → 运输包装件 | 包装符合食品与运输要求 | source-backed | cn-occ-2022-draft#tally；cn-food-retail-gb31621-2014#receipt |
| cn-trade-food-receiving-013 | 交付 | 移交食品并记录购货者和批次 | 包装件及出库单 → 接收凭证 | 批发销售记录可追溯购货者 | source-backed | cn-occ-2022-draft#tally；cn-food-retail-gb31621-2014#sales |
| cn-trade-food-receiving-014 | 返工 | 更正获准调整的包装或拣配差错 | 差错订单或破损外包装 → 重新复核订单 | 不改变食品生产日期且重新核验 | proposed | cn-occ-2022-draft#tally |
| cn-trade-food-receiving-015 | 清洁维护 | 清洁仓库货架容器及搬运工具 | 仓储设施和工具 → 清洁设施 | 避免食品交叉污染 | source-backed | cn-occ-2022-draft#tally；cn-food-retail-gb31621-2014#storage |
| cn-trade-food-receiving-016 | 异常 | 下架隔离召回批次并记录流向 | 召回通知与库存 → 隔离库存及追溯记录 | 相关批次停止流出且去向可查 | source-backed | cn-occ-2022-draft#tally；cn-food-retail-gb31621-2014#recall；cn-occ-2022-draft#warehouse |

阶段缺口：

- 粮油、果蔬、肉蛋乳水产等物性不同，此为食品批发共用交接场景；活禽活畜、散粮筒仓和大宗原料贸易场景仍需独立盘点。
- 批发企业分装不等于食品加工制造，跨过实质加工边界需另核行业。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 实体食品门店接收、补货和陈列销售

代码52；限预包装及散装食品销售，不含厨房现制、线上拣配和餐饮。后仓属于门店自营，食品批发上游接收不重复计。

流程来源：cn-food-retail-gb31621-2014。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-trade-food-store-001 | 交接 | 核验配送食品和随货证明 | 到店食品及随货信息 → 门店接收记录 | 品种批次数量与随货证明相符 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#receipt |
| cn-trade-food-store-002 | 检测 | 抽查食品外观及要求控制的温度 | 到店食品 → 质量验收记录 | 异常包装感官温控状态得到识别 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#receipt |
| cn-trade-food-store-003 | 异常 | 隔离未通过验收的到店食品 | 不合格到货 → 隔离退货区物品 | 不得进入可售库存 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#receipt |
| cn-trade-food-store-004 | 作业 | 将食品放入对应后仓储位 | 验收食品 → 分区库存 | 储位温控及生熟分隔符合要求 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#storage |
| cn-trade-food-store-005 | 作业 | 按库存顺序补充货架食品 | 后仓食品与缺货货架 → 补充货架 | 批次顺序和品种位置正确 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#storage |
| cn-trade-food-store-006 | 作业 | 整理食品陈列排面 | 货架食品 → 整齐陈列 | 食品分区且便于取用和检查 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#sales |
| cn-trade-food-store-007 | 检测 | 核对食品与价签信息 | 陈列食品及价签 → 价签核对结果 | 商品规格价格位置一致 | source-backed | cn-occ-2022-draft#retail |
| cn-trade-food-store-008 | 检测 | 检查陈列食品日期和质量 | 在售食品 → 检查结果 | 变质过期品及时发现 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#storage |
| cn-trade-food-store-009 | 异常 | 下架变质过期或召回食品 | 问题食品 → 隔离下架物品 | 问题食品停止销售且批次记录完整 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#recall |
| cn-trade-food-store-010 | 检测 | 检查冷藏冷冻销售设备运行 | 冷柜和陈列食品 → 设备检查记录 | 保持所售品类要求温控 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#sales |
| cn-trade-food-store-011 | 作业 | 包装并检查售出食品 | 顾客所选食品与包装 → 可交付商品 | 商品无误且包装适用 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#sales |
| cn-trade-food-store-012 | 交付 | 向顾客交付食品及必要票据 | 已核售出商品 → 顾客接收商品 | 品种数量与交易记录对应 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#sales |
| cn-trade-food-store-013 | 返工 | 纠正货架错位和价签不一致 | 错位食品或价签 → 纠正陈列 | 复查商品价签一致 | source-backed | cn-occ-2022-draft#retail |
| cn-trade-food-store-014 | 清洁维护 | 清洁食品销售器具和接触表面 | 器具柜台 → 清洁表面 | 不引入交叉污染 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#sales |
| cn-trade-food-store-015 | 清洁维护 | 收集并移走销售区废弃物 | 销售区废弃物 → 指定容器内废弃物 | 专用容器清晰标识及时处理 | proposed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#sales |
| cn-trade-food-store-016 | 检测 | 盘点门店食品库存并核对记录 | 店面及后仓库存 → 盘点记录 | 账实差异可定位批次 | source-backed | cn-occ-2022-draft#retail |

阶段缺口：准备

- 收银单独职业下的现金找零、自助结账干预及退货核销尚需原始业务规范，未以商品营业员替代。
- 生鲜切分称量、活鲜维护、药品器械、燃油加注、服饰试穿整理、家具电器展示安装等尚待独立盘点。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 实体店散装食品分装、标识与交付

代码52；非现制现售，限经营环节分包装。与门店共用收货补货不另计。

流程来源：cn-food-retail-gb31621-2014。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-trade-bulk-food-pack-001 | 准备 | 检查分装容器和包装材料适用性 | 食品接触容器包装 → 可用容器 | 材料清洁且符合食品接触要求 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#sales |
| cn-trade-bulk-food-pack-002 | 准备 | 清洁分装操作表面和工具 | 工作台工具 → 清洁分装区域 | 避免交叉污染 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#recall |
| cn-trade-bulk-food-pack-003 | 作业 | 将散装食品分配至销售包装 | 散装食品与包装 → 分装食品 | 分装量和品种与销售要求一致 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#sales |
| cn-trade-bulk-food-pack-004 | 作业 | 标注分装食品必要信息 | 原批次信息及包装 → 标识包装 | 保留原生产日期与保质信息 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#sales |
| cn-trade-bulk-food-pack-005 | 检测 | 复核包装食品品名批次及完整性 | 分装包装 → 复核记录 | 标签与原食品信息相符 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#sales |
| cn-trade-bulk-food-pack-006 | 异常 | 隔离受污染或批次信息不明的分装品 | 异常分装品 → 待处置物品 | 异常商品不交付 | proposed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#recall |
| cn-trade-bulk-food-pack-007 | 交付 | 交付完成包装和信息核验的食品 | 分装食品 → 可追溯销售件 | 包装与消费者选购食品一致 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#sales |
| cn-trade-bulk-food-pack-008 | 清洁维护 | 清洁消毒分装工具及容器 | 使用后工具容器 → 清洁工具 | 适合后续食品接触 | source-backed | cn-occ-2022-draft#retail；cn-food-retail-gb31621-2014#recall |

阶段缺口：交接、返工

- 人工称重操作、计量器检定、夹取多品类防混用、过敏原控制需要补充相应已读来源；未生成每份耗时。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

## 交通运输、仓储和邮政业

partial-inventory-in-progress

| 门类 | 状态 | 当前场景 | 未覆盖说明 |
| --- | --- | --- | --- |
| 53 铁路运输业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 54 道路运输业 | partial | cn-trans-road-truck、cn-trans-freight-terminal | 本门类其他模式及具体场景未覆盖，逐场景gaps继续拓展；不计算覆盖率。 |
| 55 水上运输业 | partial | cn-trans-bulk-berth、cn-trans-bulk-yard-transfer、cn-trans-bulk-landside | 海洋内河船舶航行、轮机值守、系解缆和客运未覆盖；集装箱、液体散货与件杂货码头未覆盖；本规范仅适用干散货；货运港口为55水上运输业；58代理、59独立装卸、54场外承运按实际执行者登记，不能将同一任务计入多个行业 |
| 56 航空运输业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 57 管道运输业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 58 多式联运和运输代理业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 59 装卸搬运和仓储业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 60 邮政业 | partial | cn-trans-express-collection、cn-trans-express-sort、cn-trans-express-lastmile | 本门类其他模式及具体场景未覆盖，逐场景gaps继续拓展；不计算覆盖率。 |

### 营业性道路普通货运装车核验、驾驶及交货

代码54；普货公路运输，装卸由承运人自营时记入；危险品、大件、冷链另列。车辆制造与专业修理不计本任务劳动。

流程来源：cn-roadfreight-2026。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-trans-road-truck-001 | 准备 | 检查货运车辆出车技术状态 | 车辆及检查工具 → 出车检查结果 | 车辆达到本次运输适用条件 | source-backed | cn-occ-2022-draft#truck；cn-roadfreight-2026#scope |
| cn-trans-road-truck-002 | 准备 | 查验托运货物及限运手续 | 货物与运输单据 → 运输准入确认 | 禁止运输物不装运且限运手续齐全 | source-backed | cn-occ-2022-draft#truck；cn-roadfreight-2026#road；cn-occ-2022-draft#freight-station |
| cn-trans-road-truck-003 | 检测 | 称量装车前后车辆重量 | 空载或已装车辆 → 称重记录 | 装载质量对应车辆与运单 | source-backed | cn-occ-2022-draft#truck；cn-roadfreight-2026#road |
| cn-trans-road-truck-004 | 检测 | 检查货物载量和外廓尺寸 | 已装货物 → 装载检查记录 | 不超核定载质量或允许尺寸 | source-backed | cn-occ-2022-draft#truck；cn-roadfreight-2026#road |
| cn-trans-road-truck-005 | 准备 | 检查货物固定及防脱落覆盖 | 已装货物与捆固覆盖 → 固定确认 | 运输中脱落扬撒风险受控 | source-backed | cn-occ-2022-draft#truck；cn-roadfreight-2026#road |
| cn-trans-road-truck-006 | 作业 | 驾驶货车运输至约定目的地 | 合格装载车辆 → 到达车辆 | 货物和目的地对应且行车符合要求 | source-backed | cn-occ-2022-draft#truck；cn-roadfreight-2026#road |
| cn-trans-road-truck-007 | 检测 | 途中检查车辆和货物装载状态 | 运行车辆及货物 → 途中检查记录 | 故障或货物位移等异常可识别 | source-backed | cn-occ-2022-draft#truck；cn-roadfreight-2026#road |
| cn-trans-road-truck-008 | 异常 | 停车报告并处置途中故障事故 | 故障或事故 → 应急处置记录 | 人货车按应急方案处置 | source-backed | cn-occ-2022-draft#truck；cn-roadfreight-2026#road |
| cn-trans-road-truck-009 | 交付 | 向收货方移交货物及运单 | 到达货物与运单 → 签收或差异记录 | 收货人数量外观与运单可核对 | proposed | cn-occ-2022-draft#truck |
| cn-trans-road-truck-010 | 返工 | 调整不符合要求的货物装载 | 不合格装载 → 重新检查装载 | 达到装载要求后再发车 | proposed | cn-occ-2022-draft#truck；cn-roadfreight-2026#station |
| cn-trans-road-truck-011 | 清洁维护 | 执行车辆日常检查保养 | 车辆 → 维护记录 | 保养项目按车辆规定完成 | source-backed | cn-occ-2022-draft#truck |

阶段缺口：交接

- 驾驶员与专门装卸工职责分界需承运合同，装卸工实际作业另见场站场景，不能重复计同次装车。
- 路线调度、进出场排队、油电补能、胎检故障恢复等需继续细分原始工作规范。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 道路货运站接货、分类暂存、配载与装卸

代码54站场自营服务，具体统计执行主体须核；独立通用仓库代码59另列未覆盖，不能将本站场当成所有仓储。

流程来源：cn-roadfreight-2026。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-trans-freight-terminal-001 | 交接 | 核对进站货物及交接单 | 到站货物与单据 → 接货记录 | 品类数量目的地对应 | source-backed | cn-occ-2022-draft#loader；cn-roadfreight-2026#station；cn-occ-2022-draft#tally |
| cn-trans-freight-terminal-002 | 作业 | 卸下到站货物 | 车辆及货物 → 待理货货物 | 按货物要求轻卸且无新增损伤 | source-backed | cn-occ-2022-draft#loader；cn-roadfreight-2026#station |
| cn-trans-freight-terminal-003 | 检测 | 检查货物包装及外观损伤 | 到站货物 → 损伤记录 | 异常件定位并与交接记录对应 | source-backed | cn-occ-2022-draft#loader；cn-roadfreight-2026#station；cn-occ-2022-draft#tally |
| cn-trans-freight-terminal-004 | 作业 | 按性质和保管条件分类暂存货物 | 到站货物 → 分区暂存货物 | 不相容货物分隔且货物完好 | source-backed | cn-occ-2022-draft#loader；cn-roadfreight-2026#station |
| cn-trans-freight-terminal-005 | 作业 | 搬运货物至出站装车区 | 配载货物 → 装车区货物 | 去向和装车批次一致 | source-backed | cn-occ-2022-draft#loader；cn-roadfreight-2026#station |
| cn-trans-freight-terminal-006 | 作业 | 按配载方案装载货物 | 货物与车辆 → 装载车辆 | 数量去向符合配载且不混装禁配物 | source-backed | cn-occ-2022-draft#loader；cn-roadfreight-2026#station |
| cn-trans-freight-terminal-007 | 作业 | 修整或加固运输包装 | 待运货物及包装材料 → 适运包装 | 按物品特性满足运输保护要求 | source-backed | cn-occ-2022-draft#loader；cn-roadfreight-2026#station；cn-occ-2022-draft#tally |
| cn-trans-freight-terminal-008 | 检测 | 检查出站车辆与货物装载 | 装载车辆 → 出站检查记录 | 安全检查合格且无超载后放行 | source-backed | cn-occ-2022-draft#loader；cn-roadfreight-2026#station；cn-occ-2022-draft#tally |
| cn-trans-freight-terminal-009 | 交付 | 交接装车货物及出站台账 | 车辆货物及记录 → 承运接收信息 | 数量目的地与记录一致 | source-backed | cn-occ-2022-draft#loader；cn-roadfreight-2026#station；cn-occ-2022-draft#tally |
| cn-trans-freight-terminal-010 | 异常 | 隔离撒漏破损或不适宜混存货物 | 异常货物 → 待处置货物 | 损伤污染风险不扩散 | proposed | cn-occ-2022-draft#loader；cn-roadfreight-2026#station |
| cn-trans-freight-terminal-011 | 清洁维护 | 清理场站散落货物和污染物 | 作业场地 → 清洁场地 | 通道和作业区符合使用要求 | source-backed | cn-occ-2022-draft#loader；cn-roadfreight-2026#station |
| cn-trans-freight-terminal-012 | 清洁维护 | 保养装卸搬运工具和设施 | 机具设施 → 可用机具设施 | 完成要求的检查保养 | source-backed | cn-occ-2022-draft#loader |

阶段缺口：准备、返工

- 货物堆码高度、叉车吊具选配、重心约束、装卸机操作细节依货种设备待补；不得用法规原则替代详细SOP。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 快件上门或网点收寄、验视与封装

代码60；国内快递收寄，国际验关另列未覆盖；订单商家拣货不自动归快递。

流程来源：cn-express-rule-2023。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-trans-express-collection-001 | 准备 | 确认寄递地址和收件服务范围 | 寄件请求 → 收寄条件确认 | 地址及服务范围信息可核对 | source-backed | cn-occ-2022-draft#courier；cn-express-rule-2023#receive |
| cn-trans-express-collection-002 | 检测 | 核验寄件人身份 | 证件及寄件信息 → 实名核验记录 | 身份信息满足收寄要求 | source-backed | cn-occ-2022-draft#courier；cn-express-rule-2023#receive |
| cn-trans-express-collection-003 | 检测 | 验视交寄物品并登记品名 | 非信件交寄物品 → 验视结果 | 内件与申报一致且可寄递 | source-backed | cn-occ-2022-draft#courier；cn-express-rule-2023#receive |
| cn-trans-express-collection-004 | 异常 | 拒收不符合验视或禁限寄要求物品 | 不符合条件物品 → 拒收处置记录 | 不合规物品未进入寄递链路 | source-backed | cn-occ-2022-draft#courier；cn-express-rule-2023#receive |
| cn-trans-express-collection-005 | 作业 | 选择适用包装并封装快件 | 可收物品与包装 → 封装快件 | 内件得到适当保护且避免过度包装 | source-backed | cn-occ-2022-draft#courier；cn-express-rule-2023#receive |
| cn-trans-express-collection-006 | 检测 | 称量封装快件并核对运单重量 | 快件与秤 → 重量信息 | 运单如实反映快件重量 | source-backed | cn-occ-2022-draft#courier；cn-express-rule-2023#receive |
| cn-trans-express-collection-007 | 作业 | 生成并附着快递运单 | 寄件信息及快件 → 带运单快件 | 码号与地址内件信息关联 | proposed | cn-occ-2022-draft#courier；cn-express-rule-2023#safety |
| cn-trans-express-collection-008 | 交接 | 向处理网点交接收寄快件 | 揽收快件与清单 → 网点接收快件 | 数量码号和异常与清单一致 | source-backed | cn-occ-2022-draft#courier；cn-express-rule-2023#receive |
| cn-trans-express-collection-009 | 返工 | 纠正获确认的收寄信息差错 | 错误地址或重量信息 → 更正记录 | 保留变更依据且不虚构轨迹 | proposed | cn-occ-2022-draft#courier；cn-express-rule-2023#receive |
| cn-trans-express-collection-010 | 清洁维护 | 回收可复用快递包装 | 用户交回包装 → 回收包装物 | 按材料状态分类并避免信息泄露 | proposed | cn-occ-2022-draft#courier；cn-express-rule-2023#receive |

阶段缺口：交付

- 单证收费与当日缴款仅保留必要交接接口，完整收银流程待补；取件骑行驾驶和车辆保养需专门操作规范。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 快件处理中心卸包、分拨、集包与封发

代码60国内处理中心；每次处理节点区分发件、中转、到件，不按同一包裹全国总人工推算。

流程来源：cn-express-rule-2023。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-trans-express-sort-001 | 交接 | 核对接收快件总包与路单 | 到站总包和路单 → 接收记录 | 总包码号数量与路单对应 | source-backed | cn-occ-2022-draft#express-sort；cn-express-rule-2023#receive |
| cn-trans-express-sort-002 | 作业 | 卸载快件或总包 | 车辆及总包 → 卸货区快件 | 货物未因野蛮装卸受损 | source-backed | cn-occ-2022-draft#express-sort；cn-express-rule-2023#receive |
| cn-trans-express-sort-003 | 作业 | 开拆总包并复核内装快件 | 总包与清单 → 散件及核对记录 | 件数重量规格差异被记录 | source-backed | cn-occ-2022-draft#express-sort；cn-express-rule-2023#receive |
| cn-trans-express-sort-004 | 检测 | 识读并检查快件名址信息 | 散件及运单 → 路向判定 | 路向与快件地址信息一致 | source-backed | cn-occ-2022-draft#express-sort；cn-express-rule-2023#receive |
| cn-trans-express-sort-005 | 作业 | 按区域和时限分拨快件 | 待分拨快件 → 分流快件 | 快件进入正确区域和服务流 | source-backed | cn-occ-2022-draft#express-sort；cn-express-rule-2023#receive |
| cn-trans-express-sort-006 | 异常 | 登记并处置破损油污或名址错误快件 | 问题快件 → 问题件处置记录 | 问题码号与原因处理结果对应 | source-backed | cn-occ-2022-draft#express-sort；cn-express-rule-2023#receive |
| cn-trans-express-sort-007 | 返工 | 重新分拨误分快件 | 误分件与核实路向 → 正确分流快件 | 纠正后路向信息一致 | source-backed | cn-occ-2022-draft#express-sort；cn-express-rule-2023#receive |
| cn-trans-express-sort-008 | 作业 | 集包并封发同向快件 | 同向散件与包容器 → 封发总包 | 包内快件与清单一致 | source-backed | cn-occ-2022-draft#express-sort；cn-express-rule-2023#receive |
| cn-trans-express-sort-009 | 准备 | 核对发运路由并制作路单 | 发运计划及总包 → 路单 | 目的站总包及车辆对应 | source-backed | cn-occ-2022-draft#express-sort；cn-express-rule-2023#receive |
| cn-trans-express-sort-010 | 作业 | 装载待发总包 | 待发总包和车辆 → 装车总包 | 装载安全且数量路向一致 | source-backed | cn-occ-2022-draft#express-sort；cn-express-rule-2023#receive |
| cn-trans-express-sort-011 | 交付 | 交接发运快件并上传处理信息 | 装载车辆与记录 → 发运确认及轨迹 | 码号节点和真实发运状态一致 | source-backed | cn-occ-2022-draft#express-sort；cn-express-rule-2023#receive |
| cn-trans-express-sort-012 | 检测 | 检查分拣场所安全装置状态 | 通信报警急停和隔离设施 → 检查记录 | 安全装置保持适用 | proposed | cn-occ-2022-draft#express-sort；cn-express-rule-2023#safety |
| cn-trans-express-sort-013 | 清洁维护 | 维护检测处理中心设施设备 | 输送分拣设施 → 维护记录 | 检查与处置结果可追溯 | proposed | cn-occ-2022-draft#express-sort；cn-express-rule-2023#safety |

阶段缺口：

- 供包姿态整理、称量读码失败、滑槽清堵、满格换容器、异形重件处理和安检图像判读待设备及安全规范；法规未披露具体劳动分工。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 快件到站分装、按址投递与退改再投

代码60末端服务，包括本人同意的自提设施路线；不假设所有快件默认入柜。

流程来源：cn-express-rule-2023。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-trans-express-lastmile-001 | 交接 | 接收末端总包并核对快件 | 到站总包 → 接收快件 | 清单件数与码号对应 | source-backed | cn-occ-2022-draft#courier；cn-express-rule-2023#receive |
| cn-trans-express-lastmile-002 | 作业 | 开拆并按投递地址分装快件 | 到站总包 → 投递分组快件 | 地址归属与组别一致 | source-backed | cn-occ-2022-draft#courier；cn-express-rule-2023#receive |
| cn-trans-express-lastmile-003 | 准备 | 核对投递方式与用户约定 | 快件及用户约定 → 投递方式确认 | 自提入柜等方式取得所需同意 | source-backed | cn-occ-2022-draft#courier；cn-express-rule-2023#deliver |
| cn-trans-express-lastmile-004 | 作业 | 运送快件至约定收件地址 | 分装快件 → 到址快件 | 按照约定地址及承诺服务送达 | source-backed | cn-occ-2022-draft#courier；cn-express-rule-2023#deliver |
| cn-trans-express-lastmile-005 | 检测 | 提示并协助收件人验收快件 | 到址快件 → 验收结果 | 破损和易碎内件按规定告知验收 | source-backed | cn-occ-2022-draft#courier；cn-express-rule-2023#deliver |
| cn-trans-express-lastmile-006 | 交付 | 核实并记录本人或指定代收人收件 | 验收快件 → 明示签收记录 | 收件确认可保存识别且未经授权不代签 | source-backed | cn-occ-2022-draft#courier；cn-express-rule-2023#deliver |
| cn-trans-express-lastmile-007 | 作业 | 依用户同意将快件放入自提设施 | 授权快件与设施 → 待用户领取快件 | 设施方式与用户同意一致 | source-backed | cn-occ-2022-draft#courier；cn-express-rule-2023#deliver |
| cn-trans-express-lastmile-008 | 异常 | 记录拒收或无法投递原因 | 未交付快件 → 异常记录 | 快件状态真实且原因可追溯 | source-backed | cn-occ-2022-draft#courier；cn-express-rule-2023#deliver |
| cn-trans-express-lastmile-009 | 返工 | 按约定再次投递未交付快件 | 再投快件与约定 → 再投结果 | 再次投递结果如实记录 | source-backed | cn-occ-2022-draft#courier；cn-express-rule-2023#deliver |
| cn-trans-express-lastmile-010 | 交接 | 封发并移交改寄退回快件 | 改退快件与处置指令 → 转退总包 | 路向及快件码号一致 | source-backed | cn-occ-2022-draft#courier；cn-express-rule-2023#deliver |
| cn-trans-express-lastmile-011 | 异常 | 核实并保管无法投递又无法退回快件 | 无着快件 → 保管与查询记录 | 按要求保留查询和处置依据 | source-backed | cn-occ-2022-draft#courier；cn-express-rule-2023#deliver |
| cn-trans-express-lastmile-012 | 清洁维护 | 检查末端储存设备及作业区状态 | 末端设施 → 检查维护记录 | 设施安全且快件保管完整 | proposed | cn-occ-2022-draft#courier；cn-express-rule-2023#safety |

阶段缺口：

- 代收点出入库、货架查找、排队交付、超期回收、智能柜故障开柜等细场景待专门流程；车辆骑行不在本场景重复计。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 干散货码头船岸装卸

水上运输业55的货运港口经营者执行的煤炭矿石等干散货船岸装卸；不覆盖集装箱、液体散货或船舶航行。

流程来源：cn-harbor-hj1107-2020。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-trans-bulk-berth-001 | 准备 | 检查并调整船岸装卸机械 | 待作业装卸机 → 可开工设备状态 | 检查项目符合本设备要求 | source-backed | cn-occ-2022-draft#bulk-mechanic；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-berth-002 | 作业 | 操作抓斗卸船机卸取散货 | 舱内散货 → 岸侧接料货物 | 按指定舱位与接料路线卸取 | source-backed | cn-occ-2022-draft#bulk-mechanic；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-berth-003 | 作业 | 操作连续卸船机卸取散货 | 舱内散货 → 岸侧连续货流 | 按指定路线连续输送 | source-backed | cn-occ-2022-draft#bulk-mechanic；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-berth-004 | 作业 | 操作连续装船机装入散货 | 岸侧来料 → 装入船舱货物 | 来料按指定舱位装入 | source-backed | cn-occ-2022-draft#bulk-mechanic；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-berth-005 | 作业 | 操作门座起重机装卸通用散货 | 船岸待运散货 → 目标接料点货物 | 按指定方向完成吊运 | source-backed | cn-occ-2022-draft#bulk-mechanic；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-berth-006 | 异常 | 排查船岸装卸机械故障 | 异常设备 → 处置记录 | 故障已处置或移交维修 | source-backed | cn-occ-2022-draft#bulk-mechanic；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-berth-007 | 清洁维护 | 保养船岸起重装卸机械 | 待保养设备 → 保养记录 | 规定项目完成 | source-backed | cn-occ-2022-draft#bulk-mechanic；cn-harbor-hj1107-2020#units |

阶段缺口：交接、检测、返工、交付

- 靠离泊系解缆、装载计划、舱口启闭、平舱清舱、吃水计重和船岸签收未获具体已读操作规程。
- 不同设备路线互斥或组合，不能全部相加计算单船人工；通用门机工步还需按吊具和货物继续拆解。
- 风速停机、吊具检查、危险区隔离等安全步骤不能从排污工艺表推导。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

### 干散货码头堆取料与输送

货运港口55厂界内干散货堆场和输送系统；独立装卸服务执行者需按59登记，外包公路干线运输归54，不因规范列有外包车辆而计入港口工时。

流程来源：cn-harbor-hj1107-2020。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-trans-bulk-yard-transfer-001 | 作业 | 将到达散货堆放至指定堆位 | 来料 → 指定货堆 | 物料与堆位对应 | source-backed | cn-occ-2022-draft#conveyor；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-yard-transfer-002 | 作业 | 从指定货堆取出散货 | 堆存货物 → 后续输送来料 | 货类和目标路线对应 | source-backed | cn-occ-2022-draft#conveyor；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-yard-transfer-003 | 作业 | 启动并操作输送机转运散货 | 接料点散货 → 下游散货 | 沿指定路线完成输送 | source-backed | cn-occ-2022-draft#conveyor；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-yard-transfer-004 | 作业 | 向输送机给入散货 | 待转运散货 → 连续输送来料 | 给料与指定路线对应 | source-backed | cn-occ-2022-draft#conveyor；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-yard-transfer-005 | 作业 | 调整卸料位置向指定料仓配料 | 输送散货 → 指定仓内散货 | 物料与目标仓对应 | source-backed | cn-occ-2022-draft#conveyor；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-yard-transfer-006 | 检测 | 巡查输送机运行状态 | 运行输送机 → 检查记录 | 跑偏及部件异常被识别 | source-backed | cn-occ-2022-draft#conveyor；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-yard-transfer-007 | 异常 | 纠正输送带跑偏 | 跑偏输送带 → 调整后设备 | 恢复规定运行位置 | source-backed | cn-occ-2022-draft#conveyor；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-yard-transfer-008 | 清洁维护 | 更换损坏的输送机托辊 | 故障托辊 → 更换后部件 | 更换后检查符合设备要求 | source-backed | cn-occ-2022-draft#conveyor；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-yard-transfer-009 | 清洁维护 | 胶接损坏或更换的输送带 | 待连接输送带 → 接头连接带 | 连接满足设备使用要求 | source-backed | cn-occ-2022-draft#conveyor；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-yard-transfer-010 | 清洁维护 | 清扫输送机沿线撒料 | 撒落散货 → 清理后作业区 | 散落物进入规定收集去向 | source-backed | cn-occ-2022-draft#conveyor；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-yard-transfer-011 | 清洁维护 | 保养输送机及附属设施 | 待维护设备 → 维护记录 | 规定项目完成 | source-backed | cn-occ-2022-draft#conveyor；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-yard-transfer-012 | 作业 | 运行输送单元除尘设施与水泵 | 尘源与除尘设施 → 运行记录 | 所选抑尘除尘单元按规定运行 | source-backed | cn-occ-2022-draft#conveyor；cn-harbor-hj1107-2020#dust |

阶段缺口：准备、交接、返工、交付

- 堆取料机回转行走对位、货堆测量、防混料、雨污水收集、苫盖洒水具体分工仍缺详细规程。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。
- 更换托辊和胶接输送带归清洁维护中的设备维修；未把设备维修冒充货物返工。

### 干散货码头陆侧装卸

货运港口55经营者的陆侧车辆装卸；铁路列车运行归53，场外公路承运归54，独立受托装卸服务按执行者归59并避免重复。

流程来源：cn-harbor-hj1107-2020。职业来源：cn-occ-2022-draft。

| 稳定编号 | 阶段 | 动作 | 输入 → 输出 | 验收 | 支持状态 | 引文位置 |
| --- | --- | --- | --- | --- | --- | --- |
| cn-trans-bulk-landside-001 | 准备 | 检查陆侧装卸机械和作业机具 | 待开工设备 → 检查结果 | 符合本设备开工要求 | source-backed | cn-occ-2022-draft#bulk-mechanic；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-landside-002 | 作业 | 操作翻车机卸出铁路敞车散货 | 装货铁路车辆 → 卸出散货 | 按指定接料路线卸货 | source-backed | cn-occ-2022-draft#bulk-mechanic；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-landside-003 | 作业 | 操作装车机装入散货 | 待装散货及车辆 → 装货车辆 | 物料与目标车辆对应 | source-backed | cn-occ-2022-draft#bulk-mechanic；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-landside-004 | 作业 | 操作抓斗或装载机装卸陆侧散货 | 散货和车辆 → 装卸后散货 | 完成指定装卸任务 | source-backed | cn-occ-2022-draft#bulk-mechanic；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-landside-005 | 异常 | 排查陆侧装卸设备故障 | 异常设备 → 处置记录 | 故障已处置或移交 | source-backed | cn-occ-2022-draft#bulk-mechanic；cn-harbor-hj1107-2020#units |
| cn-trans-bulk-landside-006 | 清洁维护 | 保养陆侧装卸机械及机具 | 待保养设备 → 保养记录 | 规定项目完成 | source-backed | cn-occ-2022-draft#bulk-mechanic；cn-harbor-hj1107-2020#units |

阶段缺口：交接、检测、返工、交付

- 车辆定位止挡、摘挂联接、平车清扫、衡器过磅、抑尘苫盖、超载退载和交接凭证需铁路及港口作业规程补证。
- 职业路径暂用明确标注的 2022 社会公示稿；正式版和对应职业技能标准尚待交叉复核。
- 没有据任务描述推断人工工时或自动化效果。

## 未解决项

全门类与全场景继续拓展；正式职业标准、企业具体SOP、跨场景去重和独立复核仍待完成。成功/失败/退出/未采用证据及回报参数属于下一研究阶段，本清单不能表示已经检索完成。
