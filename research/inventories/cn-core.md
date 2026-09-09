# 中国核心五行业人工任务盘点（进行中）

研究日期：2026-09-09。本文件是可追溯的任务发现增量，未冻结，也未完成全任务自动化证据研究。

当前 42 个场景、564 条已识别/待核任务。任务数是清单行数，不是工人数、工时或统计覆盖率。

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
| 13 农副食品加工业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 14 食品制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 15 酒、饮料和精制茶制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 16 烟草制品业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 17 纺织业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 18 纺织服装、服饰业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 19 皮革、毛皮、羽毛及其制品和制鞋业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 20 木材加工和木、竹、藤、棕、草制品业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 21 家具制造业 | partial | cn-ind-wood-furniture | 实木榫卯、定制板件异形、软体绷装、金属塑料竹藤玻璃家具仍分别待盘点。；生产单元表不支持声称所有工厂配置机械手或自动喷涂；机器人部署研究尚未开始。；本门类其他子行业和作业场景仍待盘点；partial不表示覆盖率可量化。 |
| 22 造纸和纸制品业 | partial | cn-ind-chemical-pulp、cn-ind-recovered-paper-pulp、cn-ind-machine-paper、cn-ind-paper-recovery、cn-ind-paper-box | 氧脱木素虽在流程表存在，职业稿未独立说明；具体加氧反应控制作为待补，不假设与漂白工时重复。；危险化学品接收、堵塞断料、蒸煮异常、洗网清洗和检维修待专项规程补证。；废纸接收解包、胶黏物控制、浮选废渣、脱墨污泥和设备清洗尚待原始规范。；纸机穿纸、断纸事故、毛毯网部清洗和设备保养需操作标准；不得把专线已列自动生产线推断为无人。；回收炉安全联锁、熔融物事故、蒸发器结垢清洗及检维修缺专项已读资料。；机器换纸接纸、调版换模、糊箱堵料、废纸分拣、清洁维护尚缺已读专门SOP。；本门类其他子行业和作业场景仍待盘点；partial不表示覆盖率可量化。 |
| 23 印刷和记录媒介复制业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 24 文教、工美、体育和娱乐用品制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 25 石油、煤炭及其他燃料加工业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 26 化学原料和化学制品制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 27 医药制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 28 化学纤维制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 29 橡胶和塑料制品业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 30 非金属矿物制品业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 31 黑色金属冶炼和压延加工业 | partial | cn-ind-steel-charge、cn-ind-steel-refine、cn-ind-steel-continuous-cast | 流程来源是2026已公布、2027实施的工序表，不能代替实际炼钢作业规程。；未取得废钢放射性、密闭物与含水检查的原始操作标准，未虚构其现场步骤或限值。；各炉型精炼分支按实际路线选择；不把LF、真空、喂线等假设为每炉必经。；不合格炉次补吹、改判、回炉的现场准则待补，暂未编造统一返工流程。；开浇准备、结晶器更换、漏钢处置和铸坯修磨需专项原始流程；不能把精整概称当作所有返工已识别。；本门类其他子行业和作业场景仍待盘点；partial不表示覆盖率可量化。 |
| 32 有色金属冶炼和压延加工业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 33 金属制品业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 34 通用设备制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 35 专用设备制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 36 汽车制造业 | partial | cn-ind-auto-final-assembly | 汽车冲压白车身焊接、涂装、电池模组、发动机和变速器内部装配、商用车上装及再制造仍未完整盘点。；HJ流程表只证明有装配及检验单元，不能支持各车型力矩和劳动投入。；本门类其他子行业和作业场景仍待盘点；partial不表示覆盖率可量化。 |
| 37 铁路、船舶、航空航天和其他运输设备制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 38 电气机械和器材制造业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
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

## 建筑业

in-progress-not-frozen

| 门类 | 状态 | 当前场景 | 未覆盖说明 |
| --- | --- | --- | --- |
| 47 房屋建筑业 | partially-covered | cn-const-steel-wall-form、cn-const-rebar-machining、cn-const-rebar-thread-coupling、cn-const-rebar-raft、cn-const-concrete-pumping、cn-const-concrete-frame-cast | 砌体、钢结构、装配式、木结构、其他模架体系尚未展开；基坑支护、降排水、桩基和防水施工尚未展开；剪力墙、预应力、大体积及其他特殊混凝土尚未展开；各类住宅/工业/公共房屋场景差异、返工拆除与完整交付清单尚未交叉查尽 |
| 48 土木工程建筑业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 49 建筑安装业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
| 50 建筑装饰、装修和其他建筑业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |

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
| 55 水上运输业 | not-yet-covered |  | 本门类所有主要子行业和作业场景尚待流程规范与职业职责双路径盘点 |
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

## 未解决项

全门类与全场景继续拓展；正式职业标准、企业具体SOP、跨场景去重和独立复核仍待完成。成功/失败/退出/未采用证据及回报参数属于下一研究阶段，本清单不能表示已经检索完成。
