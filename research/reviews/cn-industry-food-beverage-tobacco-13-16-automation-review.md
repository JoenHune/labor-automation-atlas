# 中国食品、饮料与烟草13—16批次独立审校

196项均已逐项审查。需要修正5条明确错误，以及相邻动作、目录级方案和场景边界后，才能作为保留证据缺口的未冻结工作版。**不冻结、不修改库存或原稿、不改变196项计数。**

## 输入与实际审查范围

- 作者稿SHA：`5b8ff19c717934b575300a6f2d69e88b60fa46682021be5c2df2a7aafe875225`。
- 原库存SHA：`5388db09742709d606032d030ced3985f802a6e221441b59cd1302064ee8983e`。
- 配套JSON逐任务裁决：`cn-industry-food-beverage-tobacco-13-16-automation-decisions.json`。
- 27场景、196项；逐任务裁决：gap 93项、revise 64项、bounded 37项、error 2项。35个父任务有拟议拆分，不代表新增已研究任务。

本次人工逐项读动作、输入输出、验收、原职业/流程定位、方案及反证。46项来源目录的相关原段已读，实际44项被用于任务方案；其余目录项也作范围核对。85个作者缓存SHA均与索引一致。哈希验证与内容核读是不同检查，本报告只声称读过列出的相关段。

5份官方流程PDF重新下载并复读；职业公示稿采用核实SHA的570页全文，未用28页样板片段替代。5份规范关键表格及职业重点双栏页目视核对。CMES两页论文已目视；其他论文只读公开摘要。糖化系统与糊化锅只取得原网址索引的相关正文，不能说直接访问整页成功。

## 明确错误与可合入修正

|编号|问题|具体修正|
|---|---|---|
|E01|把饲料日常保养条款当成故障诊断和处理的直接证据|保持originalTask与库存不变；在显示任务的inventoryDisposition中把该故障任务降为proposed，区分日常保养与另行拟议的故障处理；不删除已执行查询。|
|E02|浸出来源短锚不在给定行区间|extract locator补规范化585行，或改619—625中实际短锚；检查导出引用。机制段本身有据，无需删浸出机制。|
|E03|酵母镜检要求省略实验室阶段限定|human.claim明确实验室扩大培养阶段每次移植接种后镜检；任务observedHumanBoundary同样限定实验室，不向生产现场全部接种泛化。|
|E04|原料水制冷职业职责不能直接证明饮料料液冷却|实际动作仍以HJ1028表1-2碳酸饮料冷却系统为直接流程来源；职业饮料制作任务1降相邻原水处理。通过inventoryDisposition保存，不改originalTask。|
|E05|光明来源目录题名与原题不一致|来源title恢复原题“智能工厂：光明乳业打造全球最大单体乳制品全产业链智能工厂”；另设简短显示摘要，题名中的最大声明不因此升级为独立核实事实。|

直接定位：饲料职业任务7在物理324/印刷317页；饮料职业任务1在物理338/印刷331页，料液冷却的流程依据在HJ1028物理11/印刷8页。MYANDE的短锚“固液萃取”位于规范化585行；酵母页的“实验室扩大培养的技术要求”在124行，“镜检”在128行。以上是具体引用范围纠正，不要求删除原始查询或原任务快照。

## 场景、机制与任务边界

- **R01 光明报道的工厂地址未独立确认**：countryScope/geography收窄为中国光明乳业历史工厂报道，上海地址须补具名工厂与地点原文后再填；2023和未核2026仍保留。
- **R02 相邻物流或场景需单独分级**：增加adjacent-action或transfer-hypothesis层级；当前任务的完整或直接动作正例不得计为已匹配。细项见逐任务裁决，保留相邻方案供后续验证。
- **R03 35个父任务建议按独立产物和验收拆分**：仅记录拟议拆分及原ID映射；逐条按现场输出/交接/计量确认后才能合并。当前196计数不变，不把建议子任务算已研究。
- **R04 发酵乳包装输入需限定产品路线**：本任务“发酵乳→包装”限定搅拌型等相应分支；凝固型按实际先包装后发酵另建映射，不能只在场景注释说路线不同。
- **R05 部分验收比源动作窄或新增目的**：把原文动作、研究者验收细化及场景迁移分开：凝乳乳清分离靠HJ干酪行；筛粉不是已证实分级产品；冷热处理不是已给稳定性标准；过滤不是已给精滤级别；烟叶预投料限打叶复烤；成品烟支抽样需补相应对象原文。
- **R06 设备目录及路线节点不能与具体原理同级**：保留设备目录/工序范围候选，增加equipment-scope-only和provisional-application等级；统计和呈现分别列该层级，不声称所有97都有已核具体动作机制。
- **R07 需要同步的局部技术和材料边界**：发酵扰动风险限定下游冷却输送；打浆方案输入明确已破碎物料；加料机故障对加香仅共用部件推导；滤棒成型机制应改引成型纸/刀头和同步驱动段，不能只写开松辊。
- **R08 实际加工动作的阶段标签可调整**：制水、标准化、接种和培养属于作业；分拣/清选兼具实体分流与检测，标作业兼检测。若项目阶段定义以总线相对位置为准备，应写明以避免混乱。
- **R09 共用回路和转运任务须显式去重**：建立002调质与005软化、物理脱酸/脱臭、共用制水、调配控制/检测、滤棒输送/通用在制品转运的互斥或共享映射；保留原任务，不相加推工时或收益。
- **R10 机会标题和评估输出需同步**：OP4标题改为麦汁过滤控制与人工清亮度检验，避免与发酵后啤酒过滤混淆；OP5按出窖、装甑两个输出分别验收，勿称一个可验收输出。

所有originalTask与原库存逐值一致。拆分仅写建议：清理/输送、破碎/分级、出窖/装甑、清洗/消毒等有独立产物或验收；压榨与产物流出、单次定量包装、同一CIP回路、同包装层级组合封装等没有因多个动词被自动拆。35项建议详见附表。

## 查询审计

392条主查询的ID、任务、方向、查询全文和执行日期，与98批私存逐条一致；全文392条均不同，每任务一正一负，日期都是2026-09-09。原作者保存的是调用后同批写入的请求字段和响应结果，**没有独立调用前请求日志，也没有逐条UTC时间**。本次没有重跑原任务查询。

15条补充查询分4批，只有作者转录的请求和原结果缓存，缺独立原请求。其审核层级低于主批，不用当前重新搜索去冒充原始执行证明。每批响应是四query合并池，候选不能被虚构为属于单一query。

一正一负已执行不等于反例研究完成。长动作关键词尚未系统补齐设备别名、五类方案、停用退出、运营方未采用、经济采用条件；部分补充含类似site.myande.com的普通字符串而非标准域过滤语法，仍按实际查询文字保存，不追改执行历史。

## 现金流和机会

增量框架可保留：部署投入排除期初营运资金，期初占用、随后年度变化和期末余额回收分别计一次。避免付薪毛额与残留人工、净节省的去重规则明确；维护、软件、能源水药剂、异常、停机、税费、更新投资和退出支出列出。增产按需求、瓶颈及下游约束后的可用能力取最小。196项全部参数及回报为空，没有虚构回收期。

6项机会均是研究优先级假设，无经济排名。OP4应明确麦汁过滤，OP5应分别验收出窖和装甑；光明CIP机会保留2023历史报道及厂址待核条件。配方、工况、付薪可撤销性、报价、接管/清洗和真实未采用记录是下一步验证资料。

## 来源与缓存核读

|来源ID|实际核读|结论|
|---|---|---|
|[CN-FOOD-FDSP](https://www.fdsp.com/m/premix-feed-production-line/sfyh1000yuhunliaojizu.html)|规范化97—112|预混料清理/称量/混合/包装与选配微量添加有原文；人工添加明确，不能转成全价颗粒饲料现场部署。|
|[CN-FOOD-HYMIX](https://www.buhlergroup.cn/global/zh/products/hymix_conditioner.html)|规范化281—296|Hymix Plus预热调质直至目标温度，全球中文产品；温度与零残留宣传未作为验收数字。|
|[CN-FOOD-LC-CRUMB](https://www.lcmj.com/products/fensuishebei/sslg.html)|规范化82—97|冷却后碎粒，差速辊与X型自动喂料；分级筛为下游另机，不能称本碎粒机筛分。|
|[CN-FOOD-ZC-SIEVE](https://www.zcme.com/productinfo/111.html)|规范化72—81|颗粒筛分和原料初清明确；没有全质量检测或自动换筛。|
|[CN-FOOD-ZC-MONITOR](https://www.zcme.com/productinfo/126.html)|规范化72—84|在线取样筛分检测与流路切换明确；指标未披露，不能称营养/毒素/微生物全检。|
|[CN-FOOD-CHEMSTA](https://www.sdchemsta.com/products_details/19.html)|规范化86—109|只是设备目录和重复整线宣传；原作者已限制具体机理证据，客户/投用/逐动作自动化缺。|
|[CN-FOOD-MYANDE-PRE](https://www.myande.com/program/view/53.html)|规范化643—807|清理/调质/破碎/皮仁分离/轧胚/蒸炒/压榨各段已读；不同油料分支不得顺序全相加，原料与蒸炒条件适配需任务再核。|
|[CN-FOOD-MYANDE-COOK](https://www.myande.com/product/view/268.html)|规范化576—593|原文以蒸汽/导热油控制入榨水温及自动料门，进口传感器无型号；不推自动传感校准或无磨损。|
|[CN-FOOD-ALFA-DEODOR](https://www.alfalaval.cn/products/process-solutions/vegetable-oil-solutions/edible-oil-refining-process-systems/continuous-deodorization-systems/softcolumn/)|规范化14—22|真空脱气预热、汽提、保留热处理直接机制；全球中文产品，热漂白不等于吸附脱色。|
|[CN-FOOD-TETRA-STANDARD](https://www.tetrapak.com/zh-cn/solutions/integrated-solutions-equipment/processing-equipment/standardization)|规范化214—226|分离后重混脂肪与自动在线测控有据；英国Arla案例未借为中国。|
|[CN-FOOD-TETRA-PASTEUR](https://www.tetrapak.com/zh-cn/solutions/integrated-solutions-equipment/processing-equipment/pasteurization/tetra-pak-pasteurizer-d)|规范化222—240|D型产品范围与D标准型自动化有据；需配方温时验收，非中国现场。|
|[CN-FOOD-TETRA-UHT](https://www.tetrapak.com/zh-cn/solutions/integrated-solutions-equipment/processing-equipment/uht-treatment/tetra-therm-aseptic-vtis)|规范化226—237|直接蒸汽连续UHT用于适配液态低酸产品，非所有食品或中国部署。|
|[CN-FOOD-TRIOWIN-CHEESE](https://www.triowin.com/solution/solve/food/194.html)|规范化611—616、635—647|凝块形成/乳清排放/质构盐化/压榨包装为整线设备范围；未详加凝乳剂/切割/成熟机制，任务须逐项限制。|
|[CN-FOOD-TRIOWIN-POWDER](https://www.triowin.com/solution/solve/food/203.html)|规范化616—620、624—630|降膜蒸发与流化床后干燥冷却明确；正文614混液态灌装不能用，喷雾机理由独立手册补。|
|[CN-FOOD-BRIGHT](https://www.gzw.sh.gov.cn/shgzw_zxzx_gqdt/20230531/db27caa8d9d24709a27894dc1d79621b.html)|规范化8—17；新原页L1/3/7/15/22/30|title删改了原题打造全球最大单体，应复原源题并另设摘要；正文未给工厂地址，上海获评不自动证明所有光明厂都在沪。2023日期及管道CIP明确。|
|[CN-FOOD-ALFA-DEWAX](https://www.alfalaval.cn/products/process-solutions/vegetable-oil-solutions/edible-oil-refining-process-systems/dewaxing-systems/)|规范化29—33、42—51|湿/干/组合分路；冷却/结晶/叶滤与助滤剂耗材限制有据，未采用原料蜡阈值作国内现场事实。|
|[CN-FOOD-BEER-YEAST](https://www.zhbrew.com/product-14.html)|规范化107—111、118—131|PLC为现场扩培设备能力；各移植后镜检处于实验室技术要求段，不能直接外推全现场接种必经人工。|
|[CN-FOOD-BEER-CIP](https://www.sdetma.com/Product/quanzidongCIPqingxixitongshebei)|规范化57—80|自动回路、水/碱/酸/终末程序及温液位监测有据；药剂补给/人孔/拆洗卫生验收仍需现场证据。|
|[CN-FOOD-MALT-DECULM](https://www.buhlergroup.com/global/zh/process-technologies/Malting/Deculming-and-cleaning-malt.html)|规范化241—250|除根绞龙和TAS筛清，取样检查后调风；无抛光装置机制或全自动取样判断。|
|[CN-FOOD-BAIJIU-FENJIN](https://www.fenjin.cn/niangzaoshengchanxianxitong_plans.html)|规范化45—54|产线列表不足逐工序机制；起重机物料操作、上甑批量使用为供应方未具名自报，不支持封窖/陈酿。|
|[CN-FOOD-BAIJIU-EMERGEN](https://www.emergen.cn/products/application-products/upper-steamer/20.html)|规范化124—128、139—148|视觉红外温度和冒气点/机械臂路径上甑有据；不支持出窖或整线黑灯已实现。|
|[CN-FOOD-BAIJIU-WUTONG](https://www.scwtkj.com/product/1769.html)|规范化65—74|定级人员保留，已设配方泵阀计量混合/转储自动；不支持自动感官评判或陈化加速。|
|[CN-FOOD-JUICE-JUMP-WASH](https://www.sinojump.com/alone_33.html)|规范化150—156|气泡/滚动刷/喷淋有据；水压和风力不同配置，农残/卫生结果未核。|
|[CN-FOOD-JUICE-JUMP-PULP](https://www.sinojump.com/alone_44.html)|规范化150—156|已破碎水果输入，刮板筛筒分离浆皮籽；不能冒充前道破碎设备。|
|[CN-FOOD-JUICE-EASYREAL](https://www.easyreal.cn/solutions/fruit-vegetable-processing/)|规范化223—271、276—352、409—428|多原料产品分支、工况/卫生/能力验收工程建议明确；不当实际客户失败，设备目录需再区分具体机制。|
|[CN-FOOD-SUGAR-TETRA](https://www.tetrapak.com/zh-cn/solutions/integrated-solutions-equipment/processing-equipment/sugar-dissolving/continuous-sugar-dissolver)|规范化256—265、272—281|文丘里润湿、射流混合与在线浓度/自动转罐；罐满后重启可人工可自动。堵塞/起泡是厂商设计动机。|
|[CN-FOOD-BLEND-TETRA](https://www.tetrapak.com/zh-cn/solutions/integrated-solutions-equipment/processing-equipment/blending/tetra-alblend-final-beverage)|规范化217—221、233—237、243—247、253—257|白利糖度/密度反馈修流和回收支路有据；并非所有质量指标，啤酒回收不能继承。|
|[CN-FOOD-NEWAMSTAR](https://www.newamstar.com/products/ultra-clean-combiblock/)|规范化102—114|快慢灌装/瓶盖消毒/CIP配套有据；无菌监测只是泛功能，不能给微生物实时全检能力，版权2026非出版。|
|[CN-FOOD-TOBACCO-FILTER](https://www.gongkong.com/article/201712/77977.html)|规范化25—42|2017匿名烟机企业改造，开松/成型驱动及联锁确有据；竞争机型成本不稳/未引进只是当时厂商市场说法。|
|[CN-FOOD-TOBACCO-FOCUSIGHT](https://www.focusight.net/zh-cn/product/pro3/202.html)|规范化62—85|初烤烟叶收购定级相邻，规格保留人工辅助；不能直说卷烟厂入库自动化。|
|[CN-FOOD-FISH-GUT](https://fishmachine.cn/pd.jsp?fromColId=2&id=125)|规范化88—96|鲜/解冻鱼勾刀毛刷高压水开肚去脏清洗，物料具体适配；未说明去鳞/去鳃/放血。|
|[CN-FOOD-FISH-MINCE](https://fishmachine.cn/pd.jsp?id=173)|规范化73—78|去鳞洗鱼采肉筛分漂洗精滤脱水细切成型目录有据；工序动作设备类别存在，不是全部设备原理/无人验收实证。|
|[CN-FOOD-FISH-STUDENT](https://me.sjtu.edu.cn/bkjx/me3220/Projects2026/890.html)|规范化48—62|成果段摇杆滑块鳞刀开合和丝杆平台维持方向；学生小原型，相邻家庭餐饮，不把项目目标当测试率。|
|[CN-FOOD-MYANDE-EXTRACT](https://www.myande.com/program/view/54.html)|规范化585、617—654|extract短锚固液萃取在585而非当前619—625，需补定位；分水/冷凝/脱溶/矿物油吸收段机制直接，阶段分离。|
|[CN-FOOD-MYANDE-REFINE](https://www.myande.com/program/view/128.html)|规范化615—656|多种脱胶、碱炼/吸附脱色/过滤切换/脱臭/结晶及真空能源条件直接；无客户在运证明或现金量。|
|[CN-FOOD-YOGURT-TRIOWIN](https://www.triowin.com/solution/solve/food/192.html)|规范化613—618|泵送发酵剂与搅拌、可选pH计、特殊板换柔和冷却有据；搅拌型过程不能外借所有酸奶路线。|
|[CN-FOOD-WINE-TIANTAI](https://www.tiantai-group.com/products/%E8%BD%AC%E7%AD%92%E5%BC%8F%E9%99%A4%E6%A2%97%E6%9C%BA)|规范化606—614|只除梗不破碎、辊选生青干缩果明确；粒选可为局部正例但不能对清洗/破碎全覆盖。|
|[CN-FOOD-FISH-DRY-PACK](https://www.cn-elemotion.com/Sp/S-720.html)|规范化47—57|给袋真空取开袋投料排气封口，未称重装置；搭桥/封边污染是厂商设计风险，非具名事故/采用比例实证。|
|[CN-FOOD-FISH-KELP](https://www.aeeisp.com/nygcxb/cn/article/doi/10.11975/j.issn.1002-6819.2020.19.034)|规范化115—119|2020中文和英文摘要均读，挂杆搬运定位桥接及干燥试验；不代表冻干/鱼干/所有水产或商业持续运行。|
|[CN-FOOD-FISH-RETORT](https://www.retort-machine.cn/custom-automated-sterilization-production-line-can-products-for-sale-for-manufacturer-supplier-in-china-factory.html)|规范化83—100|主要罐装后装笼/台车/卸笼输送，杀菌前后衔接，不是灌装机理、杀菌参数验证；后段包装另阶段。|
|[CN-FOOD-TOBACCO-BOX](https://www.tobst.cn/cn/article/doi/10.3969/j.issn.1002-0861.2013.02.005)|缓存网页L76—80；新原页超时|纸箱辅料解带识别抓取上料AGV，不是装烟/封箱本体；仅旧摘要，日期只DOI待补。|
|[CN-FOOD-TOBACCO-MIX-NEW](https://www.tobst.cn/article/doi/10.16135/j.issn1002-0861.2017.0073)|缓存及新原页L74—77|在线固体混配+清筛金属检查/打梗+气送及旧新比较明确；DOI2017非精确出版日期。|
|[CN-FOOD-TOBACCO-FAULT-CMES](https://qikan.cmes.org/sbglywx/CN/article/downloadArticleFile.do?attachType=PDF&id=63751)|PDF物理1—2（印刷77—78）均目视；提取1—39；supplement4期刊元数据|2022-06-30出版/09-19网页发布分开。一般故障机理，不能说海南红塔已发生或故障率；刀刃、负荷、烘丝温控、加料滚筒匹配后再用。|
|[CN-FOOD-BEER-BREW](https://www.tiantai-group.com/products/2719.html)|supplement4原网址糖化系统全文相关设备/自动控制各段|已读水合器及变频搅拌，温时、过滤与耕刀、煮沸/冷却反馈；清亮度人工检验明确。直连403未实读活原页，索引缓存层级需保留。|
|[CN-FOOD-BEER-GEL](https://www.tiantai-group.com/products/%E7%B3%8A%E5%8C%96%E9%94%85)|supplement4原网址糊化锅段|已调浆谷物泵入夹套蒸汽、搅拌和PLC温控计时，调浆动作非本设备证明；直连超时。|
|[CN-FOOD-POWDER-HANDBOOK](https://dairyprocessinghandbook.tetrapak.com/zh-hans/chapter/naifenyuruqingfenyuanliao)|beer-powder-web-read网页L149—178|喷雾雾化/热风/分粉/后流化床及成分温湿粘附机理明确；全球供应商手册非中国工厂失败。|

新取得/复用的定义资料：

|来源|核读范围|原件SHA|
|---|---|---|
|[cn-feed-oil-hj1110-2020](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304702000053087.pdf)|物理7—8/印刷4—5，表1与4.3.4/4.4.2|`56df7c945f0f443e6108b8dbf08eabde4f725c0ffe49238bf48c16ed2a0a2692`|
|[cn-fish-hj1109-2020](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/202003/W020200304699417594541.pdf)|物理7—8/印刷4—5，表1与4.3.4/4.4.2|`4c3bedb88842bb8a6a9002a2c9c8f20c79699b11216209c697317ef34c76c165`|
|[cn-dairy-hj1030-2019](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/201906/W020190626544583840983.pdf)|物理6—8/印刷3—5，表1与4.3.4/4.4.2|`9030d098de8078e518e266c31097995b6d0126e4a0ea71bd7126c082fc11b541`|
|[cn-beverage-hj1028-2019](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/pwxk/201906/W020190726495340348192.pdf)|物理7—9表1-1、10—12表1-2/表2；印刷4—9|`67f13731b7045cbe7eaa6539d8f94ef2c7645213ef449d414427cd862a5fbf70`|
|[cn-tobacco-hjt401-2007](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/other/qjscbz/200712/W020111214532811187085.pdf)|物理6—8/印刷1—3，§1、4.2表1及续表第五部分3|`753b88ac41020df2474be8fd0c3d514d1d8325a55c35f677d299283733ebb7ec`|
|[cn-occ-2022-draft](https://www.bdagh.com/upload/1/cms/content/editor/1712798188409.pdf)|13个职业段全部相关任务；物理324/326/327/332/336—338/340—342|`6d21f69331883b200af8d78e73c48564e219dbdf11f8b44409a7794d4027170c`|

2019/2020规范用于工序与设备范围，不把设施表当SOP、工时或现场自动化证明；未声称重新认证所有现行合规规定。2007烟草规范的旧时期在使用位置保留。2022职业来源为社会公示稿。缓存正文和长检索结果不写入公开报告，JSON仅保存短锚、URL、定位、哈希和裁决。

## 未完成部分

- G01：全部主查询确有不同动作全文，仍多为长动作+自动化设备应用/故障失效未采用的首轮检索；未逐任务扩展设备别名、传统机械/专机/辅助工具、退出/未采用运营证据及经济采用检索。392个执行匹配不能等同完成正反验证。
- G02：职业与HJ已明确粉碎、制粒、洗瓶、输送、制水、包装、平衡箱等传统设备。99项缺已读新机制不能表达为没有现有机械；应补设备存在级基线，再研究配置、残留人工和验收。
- G03：所有工时、可撤销付薪、部署、能源水耗材、维护、异常停机、需求瓶颈等现金参数空；没有本任务完整持续商业成功或2026在运核验。
- G04：196仅27个既有候选场景。13类聚焦饲料油料水产，14聚焦乳品，未覆盖其余门类；各场景准备交接、检测、异常、返工、保养和交付仍不完整。数量不代表行业全部任务。
- G05：2022职业公示稿不是现行逐工序SOP或工时标准；2019/2020 HJ表格用于工艺/设备范围，未重新认证所有现行合规条款，固废章节后续替代不在本次引用用途；2007烟草范围/时期须保留。
- G06：98主批为执行后持久化的请求字段和响应；本次能重比该记录但没有独立调用前日志/UTC。15补充仅公开请求转录与结果缓存，没有独立请求日志。未重跑原查询。
- G07：糖化系统/糊化锅实际复读的是原网址索引相关段，直接原页403/超时；此层级与完整页面缓存分开。论文摘要与整篇论文同样分开。
- G08：剩余证据不足逐任务保留；未找到案例不能证明不可行，设计风险/文献机理/旧供应商比较不能代替具名中国失败或未采用原因。

## 196项独立裁决

`bounded`指限定内容可接受，仍未完成全任务证据验收；`gap`为待补证；`revise`为边界、验收或拟议结构修正；`error`为该任务直接支持错误。来源层的5条错误另计，不能与任务状态机械相加。

|任务ID|裁决|拆分建议|逐项说明|
|---|---|---|---|
|cn-ind-feed-pellets-001|gap|保留/待现场细化|查验/标识/出入库记录有职业1依据；本条仅核对批次，未量化验收。核对方案未匹配。|
|cn-ind-feed-pellets-002|revise|拟议，未计数|清理与输送到指定仓的产物和验收独立，应拟拆并保留父映射；FDSP仅预混粉料清理，不能覆盖所有颗粒饲料原料入仓。交叉污染反证为预混路线设计取舍。|
|cn-ind-feed-pellets-003|gap|保留/待现场细化|粉碎动作及粉碎设备由职业2/HJ表1明确；自动化目录为空应补传统粉碎机基线，不能以未核产品效果抹去设备存在。|
|cn-ind-feed-pellets-004|bounded|保留/待现场细化|配料秤有职业3与FDSP直接依据；小料人工/自动选配分开正确，不构成未采用原因。|
|cn-ind-feed-pellets-005|bounded|保留/待现场细化|预混设备混合机制可接受；不能外推所有全价料配方。FDSP污染风险限混合后输送及整线设计。|
|cn-ind-feed-pellets-006|bounded|保留/待现场细化|调质器热处理与预热为全球产品机制，已标非中国部署；成型验收未测。|
|cn-ind-feed-pellets-007|gap|保留/待现场细化|制粒机由HJ表1明确；应补已有传统机制目录，当前缺口是配置和效果，不是无方案。|
|cn-ind-feed-pellets-008|gap|保留/待现场细化|职业4含干燥设备；颗粒工艺中独立干燥是否必经需条件化，不能替代缺失冷却路线。传统设备基础应列。|
|cn-ind-feed-pellets-009|revise|拟议，未计数|破碎与筛分有独立设备、产物和粒级验收，应拟拆；原料制粒料须加冷却条件，与已核差速辊原文一致。|
|cn-ind-feed-pellets-010|revise|保留/待现场细化|HJ包装机仅支持包装单元，职业无包装；称重由FDSP产品补证但限预混料。验收需增加目标净重/封口/标识分别检查，不能只有批次对应。|
|cn-ind-feed-pellets-011|gap|保留/待现场细化|职业6为全产品质量，在线取样筛分只部分指标且未明确检测量；应把质量指标清单设缺口，不能把取样设备当完整检验。|
|cn-ind-feed-pellets-012|error|保留/待现场细化|职业7只日常维护保养，未直接列故障诊断/处理；将当前source-backed降为由维护派生的拟议故障任务，检索结果仍不足。|
|cn-ind-feed-pellets-013|gap|保留/待现场细化|日常保养职业7支持；具体项目/停机条件/工具待SOP。未核方案与工时。|
|cn-ind-oil-pretreat-press-001|bounded|保留/待现场细化|筛/风/磁选作为同一清杂结果的配置组合可保留；油种杂质谱与设备设置待核。|
|cn-ind-oil-pretreat-press-002|gap|保留/待现场细化|职业明确干燥调质；MYANDE调质只水热处理，干燥终点无证，应继续限定部分机制；与005软化边界需在场景中定义。|
|cn-ind-oil-pretreat-press-003|bounded|保留/待现场细化|职业仁壳分离及MYANDE皮仁路线可用；原文只限定种类，不证明所有油料完整分离损失验收。|
|cn-ind-oil-pretreat-press-004|bounded|保留/待现场细化|对辊破碎直接匹配动作；入料粒度/温升与供料劳动未测。|
|cn-ind-oil-pretreat-press-005|revise|拟议，未计数|软化与轧胚分属水热处理、机械成片并可独立验收，拟拆；软化与002调质须按实际油种路由去重，不累计相同调质工时。|
|cn-ind-oil-pretreat-press-006|bounded|保留/待现场细化|蒸炒设备热媒/传感闸门直接匹配，但未核实际配方和水分终点。|
|cn-ind-oil-pretreat-press-007|bounded|保留/待现场细化|压榨与两股产物分流是同一分离操作，可保留；供应商毛油收集没有证实饼粕全部处理。|
|cn-ind-oil-pretreat-press-008|bounded|保留/待现场细化|过滤/澄清对含渣毛油直接；滤渣后处置是独立下游任务，不额外纳入本任务效果。|
|cn-ind-oil-pretreat-press-009|revise|拟议，未计数|称重包装和入库有独立验收/核算，拟拆；MYANDE出仓输送仅相邻原料环节，不能作为副产物入库直接机制，降为邻近候选。|
|cn-ind-oil-pretreat-press-010|gap|保留/待现场细化|职业8明确处理故障及记录；记录可作为同一处置验收保留。具体自动排障方案未核。|
|cn-ind-oil-pretreat-press-011|gap|保留/待现场细化|职业8维护有据；停机状态是研究者条件，需现场SOP核对，非所有维护均一律停机的已证实结论。|
|cn-ind-oil-solvent-extract-001|revise|保留/待现场细化|浸出器接触和产物有直接机制；来源extract短引固液萃取在585而非619—625，须补精确定位。验收流向不足以证明浸出效果。|
|cn-ind-oil-solvent-extract-002|bounded|保留/待现场细化|蒸脱与后接干燥冷却已分界；不得把整机系统全部劳动计给本脱溶动作。|
|cn-ind-oil-solvent-extract-003|revise|拟议，未计数|蒸发与汽提有独立设备和进出物流，可分别测量溶剂去除量，拟拆并保留共同溶剂回收边界；现验收仅去向需补各段终点。|
|cn-ind-oil-solvent-extract-004|bounded|保留/待现场细化|冷凝器回收蒸气直接；与分水和尾气吸收分开正确，热负荷及操作人工仍缺。|
|cn-ind-oil-solvent-extract-005|bounded|保留/待现场细化|分水系统与两相回用直接匹配；溶剂纯度和水相去向验收待核。|
|cn-ind-oil-solvent-extract-006|bounded|保留/待现场细化|矿物油吸收/解析是闭环回收系统机制；可保留单一回收目标，不能给出无排放保证或全自动效果。|
|cn-ind-oil-solvent-extract-007|gap|保留/待现场细化|职业8故障处置可支撑；浸出装置特定防爆隔离及维修SOP未核，不能转为已证实技术障碍。|
|cn-ind-oil-solvent-extract-008|gap|保留/待现场细化|保养动作有职业8，具体浸出装置保养对象与验收仍需实证；全方案目录为空只表本轮缺证。|
|cn-ind-oil-refine-fill-001|bounded|保留/待现场细化|水化及其他脱胶按油种选择，MYANDE原文直接；胶脚后处理不自动纳入本任务。|
|cn-ind-oil-refine-fill-002|bounded|保留/待现场细化|碱炼和物理脱酸作为替代路线正确；物理脱酸可能与004脱臭同设备同循环，场景需防共用蒸汽汽提劳动重复归因。|
|cn-ind-oil-refine-fill-003|bounded|保留/待现场细化|吸附脱色与过滤切换直接，未把热脱色冒充吸附；清渣劳动无数字保留缺口。|
|cn-ind-oil-refine-fill-004|bounded|保留/待现场细化|真空蒸汽脱臭直接；与002的物理精炼分支可能共循环，仅可分别标目标不能相加工时。|
|cn-ind-oil-refine-fill-005|revise|拟议，未计数|结晶与过滤蜡有不同设备及中间品验收，拟拆；原文工艺堵塞风险和不可复用助滤剂属于全球工艺约束，不是中国失败案例。|
|cn-ind-oil-refine-fill-006|gap|保留/待现场细化|职业5已有输送计量设备；以同一次定量送油结果可保留，补传统设备基线及计量容差，当前缺自动化效果。|
|cn-ind-oil-refine-fill-007|revise|拟议，未计数|灌装与充氮封口可独立验收容积/顶空与密封，拟拆；充氮为所选路线条件，职业有相应设备但未补机制研究。|
|cn-ind-oil-refine-fill-008|revise|拟议，未计数|入库和出库发生在不同时间、方向且数量单据可独立核算，应拟拆；职业5仅储存/接收/发放，交接单据属操作化。|
|cn-ind-oil-refine-fill-009|gap|保留/待现场细化|职业8支持故障处置；精炼与灌装可保持按触发设备选择的任务族，需设备子类型再细化而非两词自动拆。|
|cn-ind-oil-refine-fill-010|gap|保留/待现场细化|职业8支持维护；生产设备族差异较大，现场项目清单未读不能宣称所有保养已覆盖。|
|cn-ind-fish-mince-001|revise|拟议，未计数|卸货与持续储存分别具有到货和储存状态验收，拟拆；HJ表1明确输运带/保鲜仓，需补传统辅助设备基线，职业段不直接支持卸储。|
|cn-ind-fish-mince-002|revise|保留/待现场细化|HJ为挑选分类/连续选别分级机；存在实际分流作业不只是检测，建议phase作业兼检测；等级指标与设备效果未核。|
|cn-ind-fish-mince-003|revise|拟议，未计数|宰杀和放血可按不同结果/时点验收，拟拆；HJ表1速杀放血只单元范围，不证明完整操作条件。|
|cn-ind-fish-mince-004|revise|拟议，未计数|去鳃/去鳞/去内脏去除对象和残留验收独立，拟拆；开膛机只内脏/局部刷洗，脱鳞仅目录列项，去鳃仍缺。|
|cn-ind-fish-mince-005|bounded|保留/待现场细化|HJ清洗与开膛设备局部刷洗可对应；不证明鱼体全部表面及微生物指标，限制写明可保留。|
|cn-ind-fish-mince-006|revise|拟议，未计数|分割与采肉分别产出切块和肉骨分离物，拟拆；采肉装置仅产品目录，降为设备存在/局部功能，不能称完整分割机制。|
|cn-ind-fish-mince-007|gap|保留/待现场细化|职业2采集鱼肉鱼糜和HJ采肉擂溃只支持流程；产品斩拌装置为目录功能，须明确鱼糜/制品擂溃路线与配方差异，非独立完整机制。|
|cn-ind-fish-mince-008|gap|保留/待现场细化|职业配料调味及HJ搅拌机支持，但添加与混合的独立计量边界须现场确认；配方对应不等同混匀合格，无产品机制证据。|
|cn-ind-fish-mince-009|gap|保留/待现场细化|按成型机一次输出定重制品可先保留；计量若另工位再拟拆，鱼丸成型目录不证明定量动作与其他鱼糜形态。|
|cn-ind-fish-mince-010|revise|拟议，未计数|杀菌与包装各有独立安全/密封验收，应拟拆并按产品选顺序；已装罐搬运系统仅邻接釜杀菌，不能作为杀菌或包装直接替代，降邻近候选。|
|cn-ind-fish-mince-011|revise|拟议，未计数|清洁去污与消毒分别有完成/卫生效果验收，拟拆；场所和设备暂保任务族但需不同表面/剂量SOP，不据职业推机器人洗消可行。|
|cn-ind-fish-cure-dry-001|gap|保留/待现场细化|职业1腌制/HJ盐渍池和腌制罐明确；可补传统容器辅助基线，腌制终点、人工和自动化程度未核。|
|cn-ind-fish-cure-dry-002|gap|保留/待现场细化|调味配方批次混合作为单次配制作业可保留，配方/混合验收待SOP；HJ搅拌机属通用基础而非持续运行。|
|cn-ind-fish-cure-dry-003|revise|保留/待现场细化|海带挂杆定位/桥接热泵是干燥物流辅助且2020试验，应把该方案kind与coverage降为局部搬运机制；不能描述为已验证水产干燥主体替代。|
|cn-ind-fish-cure-dry-004|gap|保留/待现场细化|熟化是路线入口而非单一确定任务；HJ烤/炸/蒸煮设备分别列，需按产品补子任务，不把备选路线全相加。|
|cn-ind-fish-cure-dry-005|gap|保留/待现场细化|职业熏蒸及HJ烟熏炉给出基线；冷熏/热熏需独立条件，未核设备配置和清洁人工。|
|cn-ind-fish-cure-dry-006|revise|保留/待现场细化|给袋真空封口直接限干小黄鱼，称重无据；应补质量验收包含重量和封口，是否独立称量工位待核，不预先机械拆分。搭桥等为厂商风险。|
|cn-ind-fish-cure-dry-007|revise|拟议，未计数|去污与消毒有不同验证目标，拟拆；腌盐腐蚀与清洁剂适配仅待验证条件，缺自动化方案。|
|cn-ind-aquatic-refining-001|revise|拟议，未计数|浸泡、清洗、细化各有独立出料条件，拟拆且先指定产品；职业切碎并不等同特定绞碎机器，绞碎应降动作细化假设。|
|cn-ind-aquatic-refining-002|gap|保留/待现场细化|职业消化有动作依据，目标鱼油/蛋白/藻胶与化学路线未指定，仍任务族入口不能完成方案验收。|
|cn-ind-aquatic-refining-003|revise|拟议，未计数|相分离与纯化不同质量目标可独立验收，拟拆；当前验收仅分离不足纯度，需确定目标产品和纯化指标。|
|cn-ind-aquatic-refining-004|gap|保留/待现场细化|职业4及定义的蒸发设备支持浓缩基线；未知中间液成分，不应以缺产品网页判无机械。|
|cn-ind-aquatic-refining-005|revise|拟议，未计数|机械压榨脱水与热干燥独立水分终点/设备，拟拆；产品未知导致干燥温度和降解约束尚为缺口。|
|cn-ind-aquatic-refining-006|revise|拟议，未计数|磨粉与配制具有粒度和配方两套验收及独立设备，拟拆；职业粉碎/配料支持存在，不证明所列精制路线必需。|
|cn-ind-aquatic-refining-007|revise|拟议，未计数|杀菌和包装独立验收，拟拆并按实际产品排序；包装交付phase不能覆盖杀菌操作全阶段。|
|cn-ind-aquatic-refining-008|revise|拟议，未计数|清洗与消毒独立效果验收，拟拆；仍未指定水产产品及设备，清洁剂/残留指标待核。|
|cn-ind-raw-milk-preparation-001|revise|保留/待现场细化|光明2023阀阵物流可支持厂内接收控制，不能支持原奶放行；来源及任务上海地点未明确到厂址，应降地理精度并修来源标题。|
|cn-ind-raw-milk-preparation-002|gap|保留/待现场细化|职业1明确原奶冷却，厂内边界正确；传统换热/制冷设备实际匹配和温度验收仍未研究。|
|cn-ind-raw-milk-preparation-003|revise|保留/待现场细化|分离重混与测量反馈直接，英国案例已排除；标准化实际改动物料应phase作业而非仅准备。|
|cn-ind-raw-milk-preparation-004|gap|保留/待现场细化|职业2操作设备均质有据，应列传统均质设备基线；产品压力/组织状态验收未核。|
|cn-ind-raw-milk-preparation-005|gap|保留/待现场细化|职业2脱气动作与设备有据；气体终点指标、真空配置和工时仍缺，不判技术障碍。|
|cn-ind-milk-heat-fill-001|bounded|保留/待现场细化|巴氏系统连续热处理直接且全球产品分级正确；只是过程执行验收，不等于全部杀菌效果现场验证。|
|cn-ind-milk-heat-fill-002|bounded|保留/待现场细化|VTIS直接蒸汽UHT匹配液态乳路线；无菌接口、灭菌验证、残留劳动仍空，未以全球资料冒充中国运行。|
|cn-ind-milk-heat-fill-003|gap|保留/待现场细化|HJ表1回收瓶路线有洗瓶机；乳品职业未单列洗瓶，双路径不算两份直接动作；应补传统洗瓶机基线。|
|cn-ind-milk-heat-fill-004|revise|保留/待现场细化|职业12专用包装设备/HJ无菌包装线可列基础；定量灌装同一次包装输出可保留，但批次对应不足需补净含量/密封/相应卫生验收。|
|cn-ind-fermented-milk-001|bounded|保留/待现场细化|酸奶混料巴氏设备适用范围直接；热处理和发酵分开，仍需配方热史验证。|
|cn-ind-fermented-milk-002|revise|保留/待现场细化|泵入发酵剂并搅拌原文直接；接种是实际作业可改phase作业，菌种对应外需剂量和卫生条件，非只有准备。|
|cn-ind-fermented-milk-003|gap|保留/待现场细化|隔热罐和可选pH只局部监测，自动终点未证；凝块扰动反证在下游冷却输送，需标相邻工序约束而非发酵控制失败。|
|cn-ind-fermented-milk-004|revise|保留/待现场细化|输入仅发酵后物料适用搅拌型等分支，凝固型包装可在发酵前；需在本任务输入/标题限定分支，不能仅场景注释说路线不同。|
|cn-ind-cheese-curd-001|bounded|保留/待现场细化|巴氏产品范围含干酪乳；仅该热处理动作可用，后段成熟无继承。|
|cn-ind-cheese-curd-002|revise|保留/待现场细化|职业发酵剂/酶制剂/酸味剂支持添加，具体凝乳剂方案仍空；实际加剂建议phase作业且加剂量/分布待核。|
|cn-ind-cheese-curd-003|gap|保留/待现场细化|TRIOWIN只凝块形成/处理设备节点，保留目录级候选，不应把统计中的机制匹配与直接工作原理混为一类。|
|cn-ind-cheese-curd-004|revise|保留/待现场细化|HJ干酪行乳清分离机直接；职业6是脱脂乳分离酪蛋白/乳清，并非本干酪凝乳流程，职业5只能相邻压制背景，精确支持应分开。|
|cn-ind-cheese-curd-005|gap|保留/待现场细化|压榨成型同一压制输出可保留；目录填充压制节点与职业5有存在依据，无压制机制/脱模人力实证。|
|cn-ind-cheese-curd-006|gap|保留/待现场细化|职业5明确成熟或不成熟分支；需列温湿、翻转等具体动作而非等待成熟名称，当前操作族仍拟细化。|
|cn-ind-cheese-curd-007|revise|保留/待现场细化|包装设备仅目录级候选且已承认；验收只批次需补包装完整与材料/净含量等适用品种条件。|
|cn-ind-milk-powder-001|gap|保留/待现场细化|通用乳料巴氏为干燥前候选已条件化，不能在机制统计中称此配方直接适配验证；需奶粉配方热史。|
|cn-ind-milk-powder-002|bounded|保留/待现场细化|降膜蒸发与流程控制有直接源；清洗结垢和浓缩终点仍缺，不因普通设备列名判全部自动化。|
|cn-ind-milk-powder-003|bounded|保留/待现场细化|手册雾化/热风/粉气分离直接；粘附机理限配方温湿条件且不是中国事故。无热风参数或效果数字外推。|
|cn-ind-milk-powder-004|revise|保留/待现场细化|HJ筛粉晾粉/旋转筛支持筛除或筛分，不直接证明将规定粒级分别收集的分级生产；该验收降拟议并核实际筛上物处理，补传统筛基线。|
|cn-ind-milk-powder-005|bounded|保留/待现场细化|流化床终干/冷却直接；前段温度损伤为工艺权衡，不能将正向去水冷却机制整体当失败证据。|
|cn-ind-milk-powder-006|revise|保留/待现场细化|职业/HJ有包装设备，目录为空需补基线；验收需净重/密封/卫生而不止批次。|
|cn-ind-dairy-cip-001|gap|保留/待现场细化|职业13/HJ CIP支持设备清洗基础，但光明管线报道不能证明全部设备清洗；保留缺口，区分接液面/外表面/拆洗。|
|cn-ind-dairy-cip-002|revise|保留/待现场细化|光明2023 CIP原文直接限管路，地点精度降级同BRIGHT；浓度温时流量程序不等同清洁卫生放行。|
|cn-ind-beer-malt-001|revise|拟议，未计数|去杂清选和等级分流分别有可验收产物，可拟拆；职业明确振动筛/分级筛/旋风/去石设备。phase至少包含作业，缺中国自动化效果。|
|cn-ind-beer-malt-002|gap|保留/待现场细化|职业2输送入仓明确，库存交接边界可保留；输送设备已有基础，不能以未核新产品否认机械。|
|cn-ind-beer-malt-003|revise|拟议，未计数|清洗去杂与浸麦吸水终点可独立验收，拟拆；职业3浸麦设备控制系统已有基础。|
|cn-ind-beer-malt-004|revise|拟议，未计数|布麦料层和持续发芽状态不同验收/工时，拟拆；职业刮板/翻麦/发芽箱控制有机械基础，任务族尚非原子。|
|cn-ind-beer-malt-005|gap|保留/待现场细化|职业5干燥炉/烘烤炉明确传统设备；发芽麦水分/酶活与特种麦芽焙烤不得混同。|
|cn-ind-beer-malt-006|revise|拟议，未计数|除根与抛光可独立检验残根和表面，拟拆；全球除根绞龙及筛分只前者，没有原大麦或抛光效果证据。|
|cn-ind-beer-malt-007|gap|保留/待现场细化|职业8专用焙炒设备与设置参数直接，特种麦芽独立路线合理，需补基线和产品终点。|
|cn-ind-beer-malt-008|revise|拟议，未计数|储存与包装是可替代交付路径且验收不同，应拟分支拆开，不将同批两个备选一律相加。|
|cn-ind-beer-brewing-001|revise|保留/待现场细化|水处理设备有职业1/HJ公用制水，仍需源水水质/工艺链细化；制水为实际作业，phase准备可改作业兼前处理。|
|cn-ind-beer-brewing-002|revise|拟议，未计数|清杂与粉碎独立杂质/粒度验收，拟拆；职业2粉碎机已有传统基线。|
|cn-ind-beer-brewing-003|gap|保留/待现场细化|水合器搅拌机制直接匹配调浆，但仅索引原文相关段而非成功复取整页，证据层级须保留index-only。|
|cn-ind-beer-brewing-004|gap|保留/待现场细化|已调浆谷物夹套蒸汽糊化直接，不能继承自动调浆；仅原网址索引段可读，产品原页未复得。|
|cn-ind-beer-brewing-005|gap|保留/待现场细化|升温保温温程为糖化控制机制；原文仅索引相关段，糖化终点需独立分析，未测工时。|
|cn-ind-beer-brewing-006|gap|保留/待现场细化|过滤控制与耕刀联动直接限麦汁，原文明示人员验清亮；不得移作发酵后啤酒过滤。原页未直接复得。|
|cn-ind-beer-brewing-007|gap|保留/待现场细化|压力/泡沫蒸汽控制限煮沸且原文索引可读；酒花加料/取样不由该控制代替。|
|cn-ind-beer-brewing-008|gap|保留/待现场细化|换热测温阀控直接冷却机制，仅索引原文核读；接种卫生验收仍未证实。|
|cn-ind-beer-brewing-009|revise|保留/待现场细化|PLC生产扩培与实验室阶段分开正确，但显微检查原段属于实验室每次移植接种，observedHuman应明确局部阶段不能泛化整生产扩培；培养属作业，阶段可调整。|
|cn-ind-beer-brewing-010|gap|保留/待现场细化|职业定义与HJ发酵罐支持存在，职业工作任务未单列发酵控制；需补监测/操作动作而非笼统控制终点。|
|cn-ind-beer-brewing-011|gap|保留/待现场细化|职业定义及HJ过滤机可支撑过滤存在，不能沿用110麦汁过滤机制；传统基线可补，清亮度检验阈值待核。|
|cn-ind-beer-brewing-012|gap|保留/待现场细化|职业5/8重复合并正确；除菌/灭菌作为备选路线保留并明确产品条件，需区分过滤除菌、热灭菌及瓶前瓶后位置。|
|cn-ind-beer-brewing-013|bounded|保留/待现场细化|罐管内部CIP酸碱水循环直接；同一回路可保留，不机械拆设备/管道，外表面拆洗与卫生放行另列缺口。|
|cn-ind-beer-brewing-014|revise|拟议，未计数|酒液、水、碱液、二次蒸汽有不同回收设备、质量用途与现金价值，应按介质拟拆；共用回路劳动仍不得相加。|
|cn-ind-baijiu-solid-001|revise|拟议，未计数|粮料清杂和粉碎独立杂质/粒度验收，拟拆；职业3传统设备已有，后续需核具体粮种。|
|cn-ind-baijiu-solid-002|revise|拟议，未计数|润粮与配制粮醅具有吸水状态和粮醅比两个独立验收，拟拆；FENJIN仅润粮设备节点，不是完整复合任务机制。|
|cn-ind-baijiu-solid-003|gap|保留/待现场细化|职业蒸料/HJ蒸煮装置有传统依据；不能用上甑机器人替蒸制本身，实际温时/卫生终点仍缺。|
|cn-ind-baijiu-solid-004|gap|保留/待现场细化|摊晾设备仅目录功能，不算已读完整晾冷原理，终温与均匀性未核；职业扬冷支持原动作。|
|cn-ind-baijiu-solid-005|revise|保留/待现场细化|掺曲与酵母为按路线选择的接种操作，保留但明确配方不必两者都外加；phase宜作业，剂量/均匀性验收需补。|
|cn-ind-baijiu-solid-006|revise|拟议，未计数|入窖物料量位和封窖密闭分别可验收，拟拆；机器人行车只搬入，封窖没有机制证据。|
|cn-ind-baijiu-solid-007|gap|保留/待现场细化|职业发酵动作有据但控制未展开；温度/窖况检查等实际动作需补，不能把静置发酵全算人工。|
|cn-ind-baijiu-solid-008|revise|拟议，未计数|出窖与装甑独立地点设备和完成标准，拟拆；两个机器人证据各自适配，不能共用上甑效果到出窖。|
|cn-ind-baijiu-solid-009|gap|保留/待现场细化|蒸馏/摘酒仅系统节点，已承认边界，应统计为目录级；分段摘酒可能独立操作待补，不能只流向证明蒸馏终点。|
|cn-ind-baijiu-solid-010|bounded|保留/待现场细化|泵阀按配方计量混合直接，组合调味可保同一调配输出；人员品评定级有独立作用，不由流量控制证明酒质。|
|cn-ind-baijiu-solid-011|gap|保留/待现场细化|原酒陈化输入对应职业人工老熟入口，需将可执行动作细化；液位温度监测只是贮存辅助，不能把等待时间算人工或证明陈化加速。|
|cn-ind-grape-wine-001|revise|拟议，未计数|清洗与拣选独立去污/原料合格验收，拟拆；辊轮筛除差果只分选且除梗后输入，原文明确不破碎，phase作业兼检测。|
|cn-ind-grape-wine-002|gap|保留/待现场细化|职业破碎/HJ破碎机明确，未错引只除梗机；传统设备基线可补，葡萄不同路线是否破碎另核。|
|cn-ind-grape-wine-003|gap|保留/待现场细化|压榨单一液固分离操作可保留；红白路线前后发酵时间已留条件，职业原料预处理位置不能证明发酵后压榨细节。|
|cn-ind-grape-wine-004|revise|保留/待现场细化|职业2酵母活化设备支持，缺专机机制；是培养操作建议phase作业，接种活力和剂量需验收。|
|cn-ind-grape-wine-005|gap|保留/待现场细化|职业2控温发酵与HJ发酵罐支持；缺压帽/淋皮等具体产品动作，不能把通用控制当全流程覆盖。|
|cn-ind-grape-wine-006|gap|保留/待现场细化|职业3调配/HJ调酒罐支持；配方计量/混合与人工品评需另证，未继承白酒泵阀效果。|
|cn-ind-grape-wine-007|gap|保留/待现场细化|职业6加入澄清剂制清酒直接；一次下胶澄清目标可先保留，投料与去渣是否独立再按SOP，当前无设备机制。|
|cn-ind-grape-wine-008|gap|保留/待现场细化|职业3过滤/HJ过滤机有基础；当前产品过滤精度和操作负荷未核，不能使用麦汁过滤证据。|
|cn-ind-grape-wine-009|gap|保留/待现场细化|职业3仅冷热处理，稳定处理为研究者功能细化需标拟议验收；冷/热按所选工艺分支，不能要求所有葡萄酒顺序做两种。|
|cn-ind-grape-wine-010|revise|保留/待现场细化|职业8专用包装设备支持；批次对应不足密封/净含量要求，包装分装整箱细节未覆盖。|
|cn-ind-fruit-juice-001|revise|保留/待现场细化|HJ挑选台支持人工辅助设备；职业饮料制作4未列挑选，不能把双路径都算直接。实际剔选应phase作业兼检测。|
|cn-ind-fruit-juice-002|bounded|保留/待现场细化|气泡/刷/喷淋清洗直接机制；卫生和农残不自动保证，原料损伤与投料人力待核。|
|cn-ind-fruit-juice-003|gap|保留/待现场细化|产品路线只有破碎节点，原料粒径与工作机理未说明，应标目录/路线候选，不宣称具体设备机制核实。|
|cn-ind-fruit-juice-004|revise|保留/待现场细化|刮板筛网处理已破碎物料直接；当前inputs适用原料过宽，方案分支需明确已破碎输入，与原料破碎动作去重。|
|cn-ind-fruit-juice-005|gap|保留/待现场细化|压榨/打浆路线选择正确，但只路线节点，缺压榨结构和工况；不得把两条备选收益相加。|
|cn-ind-fruit-juice-006|gap|保留/待现场细化|HJ粗滤/筛滤机支持存在，EASYREAL泛过滤节点未核粗滤精度；应明确目录级而非完整直接机制。|
|cn-ind-fruit-juice-007|gap|保留/待现场细化|清汁离心澄清属于局部工艺选择，不适用含浆汁；酶制剂等未证，保留限定机制且无全任务验收。|
|cn-ind-fruit-juice-008|gap|保留/待现场细化|HJ过滤单元未给精滤具体等级，精滤是拟议产品要求；EASYREAL进一步过滤节点不补足精度证据。|
|cn-ind-fruit-juice-009|gap|保留/待现场细化|含浆均质为路线节点，不能从设备名称推出均质压力/稳定性；清汁分支不必采用，来源边界正确。|
|cn-ind-fruit-juice-010|gap|保留/待现场细化|配料混合节点支持流程存在，计量/配方批准无证；场景原榨汁与加水果汁饮料应分支，不能同物料按两种分类累计。|
|cn-ind-fruit-juice-011|gap|保留/待现场细化|热处理缓冲仅方案级，需明确设备过程/微生物验证缺口；未提升为具名中国投产。|
|cn-ind-carbonated-drink-001|revise|保留/待现场细化|职业1过滤软化杀菌制冷设备明确但水处理路线未定；实际制水宜phase作业，共用制水站不得在各饮料线重计。|
|cn-ind-carbonated-drink-002|bounded|保留/待现场细化|文丘里糖湿润/混合直接，传统投糖堵塞泡沫为厂商比较风险；不可当客户事故，投料与起停残留正确。|
|cn-ind-carbonated-drink-003|bounded|保留/待现场细化|糖度密度反馈校正流量直接；全配方成分不由物性唯一决定，边界已明确。|
|cn-ind-carbonated-drink-004|error|保留/待现场细化|职业饮料任务1是原料水制成饮料成品水的制冷，不直接支持成品料液冷却；本任务用HJ表1-2碳酸料液冷却/换热器直接，职业引用应降相邻。|
|cn-ind-carbonated-drink-005|gap|保留/待现场细化|HJ碳酸化及混合机支持工序，职业未单列CO2充入；需补含气量和卫生控制，不能称两条直接支持。|
|cn-ind-carbonated-drink-006|gap|保留/待现场细化|HJ碳酸饮料过滤机有依据，但实际在碳酸化前后待产品流程确认；不以表格列序作SOP顺序。|
|cn-ind-beverage-fill-clean-001|gap|保留/待现场细化|职业7清洗设备明确；新包装气洗和回收瓶清洗不同，未错用NEWAMSTAR气洗宣传证明回收瓶去污。|
|cn-ind-beverage-fill-clean-002|gap|保留/待现场细化|包装材料/瓶盖消毒功能列述可做部分候选，具体杀灭过程未公开，不能当无菌验证；清洗输入只适用所选路线。|
|cn-ind-beverage-fill-clean-003|gap|保留/待现场细化|灌装装置产品功能有据，原文没有完整定量方式/误差；建议功能级而非已读充分mechanism，现场验收待核。|
|cn-ind-beverage-fill-clean-004|gap|保留/待现场细化|职业8封口明确，NEWAMSTAR组合机页有封盖邻接功能但未选入；不新增实效，需补传统封盖设备基线。|
|cn-ind-beverage-fill-clean-005|gap|保留/待现场细化|职业9在线检容器有据；验收容器缺陷被识别须列缺陷种类/漏检容许，不能作绝对全缺陷识别承诺。|
|cn-ind-beverage-fill-clean-006|bounded|保留/待现场细化|物性反馈对调配检验部分指标直接；可能与碳酸003同一传感回路，应防检测和控制重复算节省。|
|cn-ind-beverage-fill-clean-007|revise|拟议，未计数|容器清洗质量与灌装量/质量在不同工序、不同验收，拟拆；过程数据记录只是监控辅助，不能当成品无菌放行。|
|cn-ind-beverage-fill-clean-008|gap|保留/待现场细化|NEWAMSTAR清洗系统仅节点级配置；HJ原位清洗为公用单元，不能推所有设备内外拆洗均自动。|
|cn-ind-tobacco-input-001|gap|保留/待现场细化|已正确标拟议；HJT原辅料检验计量只管理要求，烟叶评级职责不覆盖全部辅料，需执行者与计量器具补证。|
|cn-ind-tobacco-input-002|revise|保留/待现场细化|职业1—2直接评级；初烤单叶收购视觉属相邻场景，不能归为卷烟厂实际对标动作机制，改邻近候选并保留厂内适配缺口。|
|cn-ind-tobacco-input-003|revise|保留/待现场细化|职业5明确打叶复烤预投料挑选，不一定是卷烟厂已复烤片烟投料；需限定工厂内部打叶复烤或降场景拟议。视觉收购分选同样仅相邻。|
|cn-ind-tobacco-input-004|gap|保留/待现场细化|职业7仓储品质评析直接；烟叶/片烟仓库须按执行者区分，历史样与异常记录为操作化，未核自动监测。|
|cn-ind-tobacco-input-005|gap|保留/待现场细化|已正确承认职业未规定交接，保持拟议；独立等级记录移交可能有实体搬运与信息流程两部分待SOP。|
|cn-ind-tobacco-leaf-conditioning-001|bounded|保留/待现场细化|职业2回潮与CMES设备原理直接；2022一般分析非海南红塔具名事件/2026在运，日期层级保存正确。|
|cn-ind-tobacco-leaf-conditioning-002|bounded|保留/待现场细化|加料滚筒泵流量喷嘴机制及加料机故障分析可对应；配方/剂量验收仍缺，故障不提升为某厂事故。|
|cn-ind-tobacco-leaf-conditioning-003|bounded|保留/待现场细化|切叶/切梗设备直接，刀刃负荷风险为工程分析；两类物料可保任务族分支但不同宽度/刀具规格待核。|
|cn-ind-tobacco-leaf-conditioning-004|gap|保留/待现场细化|职业3增温增湿直接，但源回潮器只相邻前处理未被误用；传统设备存在级基础可补，缺机制和参数。|
|cn-ind-tobacco-leaf-conditioning-005|bounded|保留/待现场细化|烘丝调水分与温控故障机理直接，实际水分验收已明示缺口；不证明停机发生率。|
|cn-ind-tobacco-leaf-conditioning-006|gap|保留/待现场细化|正向加香滚筒泵机制有据，负向原文是加料机故障，对加香只共用部件推导，应在counterEvidence单独标派生适用而非直接故障适配。|
|cn-ind-tobacco-expanded-strip-001|gap|保留/待现场细化|职业4膨胀设备浸渍存在，具体介质与密闭工况未定；浸渍条件记录不足工艺终点，需现场验收。|
|cn-ind-tobacco-expanded-strip-002|gap|保留/待现场细化|职业4与HJT膨胀工艺支持基础，1690独立企业边界仍缺；外形/质量验收空缺正确，不据无新机制断不可行。|
|cn-ind-tobacco-expanded-strip-003|gap|保留/待现场细化|职业4后膨胀回潮直接，不能继承叶梗回潮机机制；膨胀介质和终水分待验证。|
|cn-ind-tobacco-reconstituted-001|bounded|保留/待现场细化|再造混料动作只入口不是整线；已复读2017论文摘要固体物料混合罐原文，在线罐称谓有据。旧混配缺点是历史比较分析非2026事件。|
|cn-ind-tobacco-filter-cigarette-001|bounded|保留/待现场细化|2017中国匿名OEM同步电驱/开松辊直接；维护复杂和进口未采用说法均厂商历史观点，未提升采购事实。|
|cn-ind-tobacco-filter-cigarette-002|revise|保留/待现场细化|任务为开松后成棒，复用开松辊空气处理描述仍偏上游；应补原文成型/切割及同步驱动具体段，或仅同步驱动辅助而非完整滤棒成型机制。|
|cn-ind-tobacco-filter-cigarette-003|gap|保留/待现场细化|职业6/9辅联与转运设备支持滤棒输送；与烟草packing004通用转运须排除重计，当前无具体输送自动化原理。|
|cn-ind-tobacco-filter-cigarette-004|gap|保留/待现场细化|职业7卷接机组直接支持卷制，未误继承滤棒驱动改造；传统设备基线可补，接嘴前尺寸与缺陷验收待核。|
|cn-ind-tobacco-filter-cigarette-005|gap|保留/待现场细化|职业7接装滤嘴直接，独立于卷制结果正确；机组共用人工不能双算，具体自动接嘴机制未核。|
|cn-ind-tobacco-packing-001|gap|保留/待现场细化|装烟支并盒封是一次包装成品目标，可保留不机械拆；职业8盒装设备已有传统基础，缺过程验收及人力。|
|cn-ind-tobacco-packing-002|gap|保留/待现场细化|烟盒组条与封条输出同一成品包装层级，可保留；职业8条装设备支持，不能与盒/箱件数混算工作量。|
|cn-ind-tobacco-packing-003|revise|保留/待现场细化|供箱机器人只装封箱前空辅料物流，应降相邻候选并将全任务状态标无直接匹配；职业8箱装设备能支撑传统存在，不能说无设备。|
|cn-ind-tobacco-packing-004|revise|保留/待现场细化|职业9转运支持，但本厂所有在制品会包含filter003滤棒输送等，应显式排除已单列路径或建立共享任务映射；泛转运不是所有路线覆盖。|
|cn-ind-tobacco-packing-005|gap|保留/待现场细化|职业9储存可支撑本厂成品存放，箱成品精确对象为操作化；与承运商运输边界已正确，缺搬运及库位技术。|
|cn-ind-tobacco-sensory-prep-001|gap|保留/待现场细化|职业1调整评吸室温湿明确，限检验准备；温湿控制设备/范围未核，不能把所有质量检验共用阈值。|
|cn-ind-tobacco-sensory-prep-006|gap|保留/待现场细化|职业1标准样准备直接且编号006位置不影响稳定ID；标准样身份可验但取放/校准方式仍缺。|
|cn-ind-tobacco-sensory-prep-002|gap|保留/待现场细化|职业2列取样器具与制样原料，抽烟支成品则需结合职业4补对象依据；取样方案代表性未核，不能由来源追溯等同合格抽样。|
|cn-ind-tobacco-sensory-prep-003|gap|保留/待现场细化|职业2切丝机支持物理制样，传统工具基线应补；切样规格与试验方法未核，保持空值。|
|cn-ind-tobacco-sensory-prep-007|gap|保留/待现场细化|职业2平衡箱/平衡水分直接，不能把平衡等待全部算人工；终点判定与环境干预需数据。|
|cn-ind-tobacco-sensory-prep-004|gap|保留/待现场细化|职业3—4感官评价直接，实验室电子鼻等不可未经验证代替人员；本轮无自动感官判断方案，正确保留缺口。|
|cn-ind-tobacco-sensory-prep-005|revise|拟议，未计数|原始记录整理与报告编制审核/交付可独立验收和执行者，拟拆；职业5明确记录处理编审，提交是研究操作化，不证明数字自动判定。|
