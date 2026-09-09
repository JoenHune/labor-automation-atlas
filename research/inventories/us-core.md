# 美国核心行业任务盘点（持续扩展）

状态：proposed/source-backed；全部任务的自动化证据研究未开始；未冻结。验收是拟议研究边界，实际SOP、数值阈值及工时尚待补齐。

按执行机构所有制与BEA行业分类归属，不按资金来源或服务地点归属；外包服务仅在执行行业计一次，需求行业保留交接引用。

引用限制：目前sourceRefs定位到已读章节，部分引用为场景上下文。每项的具体来源涵盖范围仍需独立审查；禁止将所有同场景引用都当作整条任务及验收的直接事实证明。

source-backed 仅表示职业/流程层面有动作基础，不代表具体工位已经确认。全部任务短句级来源匹配与独立复核仍待完成。

当前共 66 个场景、788 项候选任务；完整性状态：未完成。

## 制造业

私营制造机构。政府购置设备仍归生产厂商制造业；政府自营工厂按BEA政府边界待逐机构识别。厂内自营检验、清洁、搬运计入本机构；外包实验室、清洁和承运人计执行行业，本站只记交接。

### US-MFG-POULTRY 禽肉分割、去骨与冷链包装

屠宰加工厂内，入料至厂内冷库交付；活禽养殖归农业

流程来源：M-POULTRY；职业来源：O51-3022.00。read-specified-sections; plant-SOP-not-verified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-POULTRY-001|准备|检查待分割胴体的批次与缺陷|外观缺陷和批次去向可追溯|source-backed|
|US-MFG-POULTRY-002|准备|分发适用刀具与切割用具|刀具状态与用途经确认|source-backed|
|US-MFG-POULTRY-003|作业|切分胴体为指定部位|部位与工单一致|source-backed|
|US-MFG-POULTRY-004|作业|剔除部位肉的骨与皮|残骨残皮按产品规格检查|source-backed|
|US-MFG-POULTRY-005|作业|修除可修整肉品的缺陷与多余脂肪|修整范围与可用部分分开|source-backed|
|US-MFG-POULTRY-006|交接|将肉与副产品分流至指定容器|类别不混淆|source-backed|
|US-MFG-POULTRY-007|检测|复检去骨肉的残骨与外观|不合格件已识别|source-backed|
|US-MFG-POULTRY-008|异常|隔离无法判定或受污染肉品|等待授权处置，未混入合格品|source-backed|
|US-MFG-POULTRY-009|返工|按允许范围重修不合格肉块|重新检验后决定放行|source-backed|
|US-MFG-POULTRY-010|作业|称量肉品并标注包装内容|重量与内容标签对应|source-backed|
|US-MFG-POULTRY-011|作业|封合内袋及外箱|封口和容器状态符合包装要求|source-backed|
|US-MFG-POULTRY-012|交付|将封装箱码托并交厂内冷库|批次、箱数和温控要求交接|source-backed|
|US-MFG-POULTRY-013|清洁维护|清洁切割器具与接触表面|按厂内卫生程序验收|source-backed|

缺口：活禽接收、致昏、放血、去内脏、熟制需另拆；未以本场景覆盖所有食品工艺。

### US-MFG-FOODBATCH 配料、调制和热处理食品/饮料

食品/饮料配方批次；不含烟草或所有酒类法定要求

流程来源：M-FOOD；职业来源：O51-3092.00。read-specified-sections; plant-SOP-not-verified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-FOODBATCH-001|准备|核对原料及过敏原身份|批次和过敏原匹配|source-backed|
|US-MFG-FOODBATCH-002|准备|称量配方原料|按批准配方复核|source-backed|
|US-MFG-FOODBATCH-003|作业|投放原料进入混合容器|投料批次顺序记录|source-backed|
|US-MFG-FOODBATCH-004|作业|调节混合设备完成规定混合|配方规定状态经确认|source-backed|
|US-MFG-FOODBATCH-005|作业|监控批次热处理过程|按已验证厂内工艺记录，数值待查|source-backed|
|US-MFG-FOODBATCH-006|检测|抽取批次样品并记录性质|对应批次与检验方法|source-backed|
|US-MFG-FOODBATCH-007|交接|将中间产品移交下一加工点|时间与批次不丢失|source-backed|
|US-MFG-FOODBATCH-008|异常|隔离偏离工艺条件的批次|暂停放行并提交偏差|source-backed|
|US-MFG-FOODBATCH-009|返工|按批准处置再处理可返工食品|重新检验；不默认所有食品可返工|source-backed|
|US-MFG-FOODBATCH-010|清洁维护|清洗并检查混合槽的残留|清洁程序及过敏原控制验收|source-backed|
|US-MFG-FOODBATCH-011|作业|灌装食品进入指定容器|包装规格与防污染要求满足|source-backed|
|US-MFG-FOODBATCH-012|交付|交接批记录与放行包装品|状态、批次与接收方可追溯|source-backed|

缺口：发酵、烘焙、冷冻、乳制品、饮料吹瓶与具体杀菌参数另拆；不共用虚构SOP。

### US-MFG-SEW 服装、软装及缝制品制造

裁片到缝制成品；皮革只覆盖已裁好部件缝合，不包含制革

流程来源：M-SEW；职业来源：O51-6031.00。read-specified-sections; plant-SOP-not-verified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-SEW-001|准备|按色批与图案配齐裁片|色批图案对应|source-backed|
|US-MFG-SEW-002|准备|安装针线与导向附件|规格与工单相符|source-backed|
|US-MFG-SEW-003|作业|对齐裁片并定位夹具|缝线基准与顺序正确|source-backed|
|US-MFG-SEW-004|作业|引导裁片完成规定线迹|线迹与工单对应|source-backed|
|US-MFG-SEW-005|作业|安装拉链或纽扣附件|位置与附件规格确认|source-backed|
|US-MFG-SEW-006|检测|测量缝制品尺寸并检查线迹|尺寸及漏针缺陷标识|source-backed|
|US-MFG-SEW-007|异常|停机识别断线及断针异常|产品和断针相关区域按现场程序隔离|source-backed|
|US-MFG-SEW-008|返工|补缝缺失线迹或更换缺陷部件|缺陷消除并复检|source-backed|
|US-MFG-SEW-009|清洁维护|更换针具并清洁润滑缝纫机|按设备程序恢复|source-backed|
|US-MFG-SEW-010|交接|修剪余线并移交后整工序|余线去除且数量交接|source-backed|
|US-MFG-SEW-011|交付|清点完成品与生产记录|款式、数量和记录一致|source-backed|

缺口：裁剪排料、染整、鞋楦成型及胶合另列，不视为本场景已覆盖。

### US-MFG-WEAVE 纺织机穿纱、织造与布匹检查

机织/针织机运行；纺纱、染整尚缺专门流程规范

流程来源：M-SEW, M-ENERGY；职业来源：O51-6063.00。partial: occupation-and-general-maintenance-read; dedicated-production-workflow-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-WEAVE-001|准备|按花型单设定织机组件|组件与订单匹配|source-backed|
|US-MFG-WEAVE-002|准备|穿引纱线通过导向机构|路径与张力设定确认|source-backed|
|US-MFG-WEAVE-003|作业|运行织机并调整织造参数|符合现场工艺设定|source-backed|
|US-MFG-WEAVE-004|检测|抽查布面织疵|位置与缺陷分类记录|source-backed|
|US-MFG-WEAVE-005|异常|识别停台的断纱或机械原因|可由操作人员处理范围明确|proposed|
|US-MFG-WEAVE-006|返工|移除可修织疵并恢复织造|修复后复查|proposed|
|US-MFG-WEAVE-007|交接|交接布匹与机台设定记录|批次与设定对应|source-backed|
|US-MFG-WEAVE-008|清洁维护|清洁润滑织机并更换磨损组件|适用能源控制及试运验收|source-backed|
|US-MFG-WEAVE-009|交付|完成布匹批次计量与登记|订单数量可核对|proposed|

缺口：独立纺织生产规范未齐；M-SEW只支持缝制相邻流程，不能替代织造SOP。

### US-MFG-WOOD 木件加工与家具装配

木料到柜体/家具；森林采伐归农业

流程来源：M-WOOD, M-ENERGY；职业来源：O51-7011.00。read-specified-sections; plant-SOP-not-verified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-WOOD-001|准备|按纹理和缺陷选配木料|颜色纹理与可用范围确认|source-backed|
|US-MFG-WOOD-002|准备|在木料标注切割尺寸|与图纸对应|source-backed|
|US-MFG-WOOD-003|作业|锯切木料形成规定毛坯|尺寸留量符合工单|source-backed|
|US-MFG-WOOD-004|作业|加工木件榫槽和孔位|连接位置符合图纸|source-backed|
|US-MFG-WOOD-005|检测|试配木件并量测尺寸|配合偏差标记|source-backed|
|US-MFG-WOOD-006|作业|涂胶夹紧或紧固木件|连接与固定状态确认|source-backed|
|US-MFG-WOOD-007|作业|安装铰链把手及滑轨|位置及动作检查|source-backed|
|US-MFG-WOOD-008|异常|隔离开裂或配合不良木件|禁止误装|source-backed|
|US-MFG-WOOD-009|返工|修整可返修接缝或更换木件|再次检查配合|source-backed|
|US-MFG-WOOD-010|清洁维护|清理设备积尘并维护刀具|按适用机台程序验收|source-backed|
|US-MFG-WOOD-011|交接|打磨表面并交涂饰工序|表面缺陷与粉尘检查|source-backed|
|US-MFG-WOOD-012|交付|核对完工家具与订单|数量、外观与配件一致|source-backed|

缺口：原木制材、单板胶合、复合板、涂装固化与软体家具填充另拆。

### US-MFG-PAPER 纸板转换与纸箱成型

从纸卷/纸板到成型包装；制浆造纸上游仅留流程覆盖缺口

流程来源：M-PAPER, M-ENERGY；职业来源：O51-9196.00。read-specified-sections; plant-SOP-not-verified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-PAPER-001|准备|安装切割折叠及涂胶附件|尺寸设定复核|source-backed|
|US-MFG-PAPER-002|准备|吊装纸卷并穿纸|路径与张力确认|source-backed|
|US-MFG-PAPER-003|作业|补充胶料并调节供胶|胶种与工单匹配|source-backed|
|US-MFG-PAPER-004|作业|切割压线折叠纸板|尺寸与折线对应|source-backed|
|US-MFG-PAPER-005|作业|粘合箱坯形成纸箱|接合状态符合产品要求|source-backed|
|US-MFG-PAPER-006|检测|抽查成箱尺寸与胶合|偏差记录并可追批|source-backed|
|US-MFG-PAPER-007|异常|处置输送与落箱卡阻|适用能源控制后恢复|proposed|
|US-MFG-PAPER-008|返工|调整机台并重做不合格箱|原废品剔除且复检|proposed|
|US-MFG-PAPER-009|清洁维护|清理供胶和切割机构|残胶及磨损检查|source-backed|
|US-MFG-PAPER-010|交接|堆叠成箱并移交下游|规格数量对应|source-backed|
|US-MFG-PAPER-011|交付|标注批次并完成完工登记|标记及数量核对|proposed|

缺口：制浆、漂白、抄纸、回收化学品是独立任务群，不能用纸箱11项代替。

### US-MFG-PRINT 印前、印刷与印后整饰

工单与材料至印刷制品；出版内容生产不在本场景

流程来源：M-PRINT, M-ENERGY；职业来源：O51-5112.00。read-specified-sections; plant-SOP-not-verified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-PRINT-001|准备|核对纸张油墨与印刷工单|颜色纸型匹配|source-backed|
|US-MFG-PRINT-002|准备|安装印版并调校套准|版次与定位正确|source-backed|
|US-MFG-PRINT-003|作业|配墨并补充墨槽|墨种配方符合工单|source-backed|
|US-MFG-PRINT-004|作业|上纸穿纸并调节张力|走纸稳定且规格正确|source-backed|
|US-MFG-PRINT-005|检测|抽印样张检查色密度与套准|与批准样比较|source-backed|
|US-MFG-PRINT-006|作业|运行印机并监控印刷质量|按抽检计划留样|source-backed|
|US-MFG-PRINT-007|异常|记录印机报警并处置停机|不得混入未判状态纸张|source-backed|
|US-MFG-PRINT-008|返工|修正设定并重印不合格批|样张重新确认|source-backed|
|US-MFG-PRINT-009|清洁维护|清洗墨槽印版与滚筒|按适用能源与清洗程序验收|source-backed|
|US-MFG-PRINT-010|交接|交接印张进入裁切折页|版次与数量一致|source-backed|
|US-MFG-PRINT-011|交付|核对整饰成品与印刷记录|规格、数量、留样关联|source-backed|

缺口：数字印刷、装订、覆膜分别需深入原子化；未采旧EPA技术占比。

### US-MFG-REFINE 炼油装置投运、巡检与物料转移

炼厂内部；油田采掘及外部管输不计入本场景

流程来源：M-REFINE, M-ENERGY；职业来源：O51-8093.00。read-specified-sections; plant-SOP-not-verified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-REFINE-001|准备|核对物料路线与罐容|来源去向和可用罐容明确|source-backed|
|US-MFG-REFINE-002|作业|按调度启停泵阀转移原油|计量路线正确|source-backed|
|US-MFG-REFINE-003|作业|调节分馏或处理单元参数|按批准工艺设定监控|source-backed|
|US-MFG-REFINE-004|检测|巡检泵阀管线与储罐|泄漏或异常已记录|source-backed|
|US-MFG-REFINE-005|检测|采集油品样品送检|取样点与批次可追溯|source-backed|
|US-MFG-REFINE-006|交接|交接班次参数和化验结果|接班人员确认异常与状态|source-backed|
|US-MFG-REFINE-007|异常|报告泄漏或失控参数并执行授权处置|依装置应急程序，不提供替代操作规程|source-backed|
|US-MFG-REFINE-008|返工|按化验建议调整可处理油品路线|检验合格后放行|source-backed|
|US-MFG-REFINE-009|清洁维护|清洗隔离后的工艺单元|维护许可与恢复验收|source-backed|
|US-MFG-REFINE-010|清洁维护|润滑阀门并修复已授权小缺陷|检验与复运确认|source-backed|
|US-MFG-REFINE-011|交付|核对出厂油品计量与质量状态|接收方、计量、质量一致|source-backed|

缺口：催化剂更换、焦化、沥青、润滑油与每种装置异常细分未完成。

### US-MFG-CHEM 化学批次配制与反应装置操作

化工生产机构，不包含临床配药；药品无菌生产需专门规范

流程来源：M-ENERGY；职业来源：O51-9011.00, O51-8091.00。partial: occupation-and-general-maintenance-read; dedicated-production-workflow-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-CHEM-001|准备|核对反应配方与原料身份|牌号与批次一致|source-backed|
|US-MFG-CHEM-002|准备|计量反应原料|按批准配方复核|source-backed|
|US-MFG-CHEM-003|作业|加料并开启混合反应设备|加料记录与许可条件一致|source-backed|
|US-MFG-CHEM-004|作业|调节温压流量与反应时长|按现场工艺范围记录|source-backed|
|US-MFG-CHEM-005|检测|采集样品检验浓度或黏度|方法及批次关联|source-backed|
|US-MFG-CHEM-006|交接|转移产品至指定储罐|罐位与兼容性经现场确认|source-backed|
|US-MFG-CHEM-007|异常|发现泄漏或溢流后通知授权响应|按现场应急程序升级|source-backed|
|US-MFG-CHEM-008|返工|按授权配方修正可返工批次|复检后确认，不默认化学品可任意再处理|source-backed|
|US-MFG-CHEM-009|清洁维护|冲洗排空后的设备|清洗方法及隔离条件由厂内批准|source-backed|
|US-MFG-CHEM-010|交付|核对装运容器与批次资料|标识、检验状态与接收匹配|source-backed|

缺口：目前只有职业动作及维护规范双来源；独立化学生产SOP路径不足，整个场景不作完备声明。

### US-MFG-PLASTIC 热塑性注塑制件

颗粒到成型制件；不覆盖橡胶硫化和复材铺层

流程来源：M-PLASTIC, M-ENERGY；职业来源：O51-4072.00。read-specified-sections; plant-SOP-not-verified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-PLASTIC-001|准备|核对树脂配料与模具|牌号和模号一致|source-backed|
|US-MFG-PLASTIC-002|准备|安装模具及冷却连接|装夹与冷却按机台程序确认|source-backed|
|US-MFG-PLASTIC-003|作业|补给塑料颗粒进入料斗|物料身份不混淆|source-backed|
|US-MFG-PLASTIC-004|作业|设置并监控注塑循环|按批准工艺参数记录|source-backed|
|US-MFG-PLASTIC-005|交接|取出并转运冷却成型件|取件在适用防护条件下进行|source-backed|
|US-MFG-PLASTIC-006|检测|量测制件尺寸及表面缺陷|与批准图纸比较|source-backed|
|US-MFG-PLASTIC-007|异常|隔离卡模或联锁异常设备|维护权限与能源隔离确认|source-backed|
|US-MFG-PLASTIC-008|返工|修整允许修除的飞边|不损伤规定表面并复检|source-backed|
|US-MFG-PLASTIC-009|清洁维护|拆模后清洁维护模腔|残料和磨损检查|source-backed|
|US-MFG-PLASTIC-010|交付|清点包装合格制件|料号数量与追溯标识一致|source-backed|

缺口：实际人工取件/机器人取件分工、换色清机及回料比例均待查。

### US-MFG-METAL 金属熔炼、取样与熔体交接

初级金属熔炼场景；与下游焊接不是一个连续班组。

流程来源：M-ENERGY；职业来源：O51-4051.00。partial: occupation-and-general-maintenance-read; dedicated-production-workflow-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-METAL-001|准备|称量待入炉金属料|成分来源与质量记录|source-backed|
|US-MFG-METAL-002|作业|操作加料设备装入炉料|按批准装料规程验收|source-backed|
|US-MFG-METAL-003|作业|调节炉温与供能|按炉型工艺范围记录|source-backed|
|US-MFG-METAL-004|检测|采集熔融金属样品分析|样品与炉次对应|source-backed|
|US-MFG-METAL-005|作业|扒除熔体表面杂质|由现场工艺确认清理状态|source-backed|
|US-MFG-METAL-006|交接|转运熔融金属至浇注容器|炉次与接收容器确认|source-backed|
|US-MFG-METAL-014|清洁维护|清理停用熔炼设备的残留物|按具体熔炼设备程序验收|source-backed|

缺口：尚需铸型制芯、连续铸造、轧制、锻压、热处理、电镀等专门流程；维护规范不能替代冶金或焊接SOP。

### US-MFG-CNC 机械零件切削与上下料

美国制造厂机加工；沿用已核对的美国手册/职责，不复用中国流程

流程来源：M-CNC, M-ENERGY；职业来源：O51-9161.00。read-specified-sections; plant-SOP-not-verified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-CNC-001|准备|核对图纸程序与毛坯批次|版次和材质匹配|source-backed|
|US-MFG-CNC-002|准备|安装并校正刀具夹具|偏置与夹持按程序确认|source-backed|
|US-MFG-CNC-003|作业|装夹待加工毛坯|定位与夹紧验收|source-backed|
|US-MFG-CNC-004|作业|监控切削循环及刀具状态|异常声音振动及时标识|source-backed|
|US-MFG-CNC-005|交接|卸下完成工件并分流|工件身份及状态保留|source-backed|
|US-MFG-CNC-006|检测|量测首件及抽样件尺寸|与图纸公差核对，具体数值待取|source-backed|
|US-MFG-CNC-007|异常|报告加工报警并隔离疑似件|未判件不流入合格品|source-backed|
|US-MFG-CNC-008|返工|按授权补加工可返修件|重新量测确认|source-backed|
|US-MFG-CNC-009|清洁维护|清洁夹具与工作区切屑|依适用机台能源控制与维护程序|source-backed|
|US-MFG-CNC-010|清洁维护|更换磨损刀具并复核偏置|换刀记录与首件确认|source-backed|
|US-MFG-CNC-011|交付|标识包装合格机加工件|料号数量检验状态齐备|source-backed|

缺口：上下料样板不替代刀具磨削、电火花、磨削或其他制造业任务；现场工时未知。

### US-MFG-ELECTRIC 电气与电子设备部件装配

布线、组件安装与通电检测；电池化学工艺另列

流程来源：M-ENERGY；职业来源：O51-2022.00。partial: occupation-and-general-maintenance-read; dedicated-production-workflow-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-ELECTRIC-001|准备|按电路图配齐组件与线束|料号版次一致|source-backed|
|US-MFG-ELECTRIC-002|准备|标识并分发组件到工位|身份可追踪|source-backed|
|US-MFG-ELECTRIC-003|作业|定位固定电气组件|位置与紧固符合图纸|source-backed|
|US-MFG-ELECTRIC-004|作业|连接线束或焊接规定接点|线路对应与接点状态确认|source-backed|
|US-MFG-ELECTRIC-005|检测|测量线路电阻或功能|按批准测试规程判定|source-backed|
|US-MFG-ELECTRIC-006|交接|移交装配与测试状态|未测和合格状态分离|source-backed|
|US-MFG-ELECTRIC-007|异常|隔离不合格电气组件|待工程处置|source-backed|
|US-MFG-ELECTRIC-008|返工|更换或调整授权缺陷组件|重复功能检验|source-backed|
|US-MFG-ELECTRIC-009|清洁维护|清洁零件和维护装配设备|材料兼容性与设备安全程序确认|source-backed|
|US-MFG-ELECTRIC-010|交付|包装已检验总成|防损与标识按工单验收|source-backed|

缺口：PCB印锡/贴片/回流、线圈绕制、电机总装、家电、变压器各需独立工艺；现流程规范仅维护路径，生产SOP不足。

### US-MFG-SEMI 晶圆工序上料、加工与检验

半导体制造厂晶圆工序；1999工艺图仅帮助识别动作类别

流程来源：M-SEMI；职业来源：O51-9141.00。read-specified-sections; plant-SOP-not-verified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-SEMI-001|准备|核对晶圆批次与工艺路线|批次及路线一致|source-backed|
|US-MFG-SEMI-002|作业|装载晶圆进入工艺载具|晶圆身份与朝向按工艺确认|source-backed|
|US-MFG-SEMI-003|作业|清洗晶圆表面|按该工艺洁净验收|source-backed|
|US-MFG-SEMI-004|作业|对准光罩并执行授权曝光工序|工艺记录与设备状态合格|source-backed|
|US-MFG-SEMI-005|作业|启动并监控刻蚀或沉积工序|依批准配方，不把旧资料参数迁入|source-backed|
|US-MFG-SEMI-006|检测|检测晶圆缺陷或电路性质|缺陷与批次关联|source-backed|
|US-MFG-SEMI-007|异常|隔离设备泄漏或异常批次|交工程与安全授权处理|proposed|
|US-MFG-SEMI-008|返工|对允许返工批执行批准重处理|工程批准且重新检测|proposed|
|US-MFG-SEMI-009|交接|卸载晶圆并送下道工序|批次与状态连续|source-backed|
|US-MFG-SEMI-010|清洁维护|更换耗液并清洁工艺腔体|按机台方法验收与恢复资格|source-backed|
|US-MFG-SEMI-011|交付|登记检测状态并交付合格批|追溯与质量状态齐全|proposed|

缺口：具体先进制程、重复工序、封装键合与测试分选未细拆；返工任务为拟议边界，需要厂内批准路线证实。

### US-MFG-AIRCRAFT 民用航空结构件与系统装配

FAA生产批准范围的飞机结构装配；不用于推汽车船舶流程

流程来源：M-AIR；职业来源：O51-2011.00。read-specified-sections; plant-SOP-not-verified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-AIRCRAFT-001|准备|核对批准图纸与供应件状态|当前批准版次与检验状态一致|source-backed|
|US-MFG-AIRCRAFT-002|准备|定位大型分组件到装配夹具|基准点与图纸匹配|source-backed|
|US-MFG-AIRCRAFT-003|作业|修整孔位或边缘以满足装配|按批准工艺与尺寸复检|source-backed|
|US-MFG-AIRCRAFT-004|作业|连接结构件并安装紧固件|连接按批准设计验收|source-backed|
|US-MFG-AIRCRAFT-005|作业|安装系统管路或控制线缆|路线与连接位置一致|source-backed|
|US-MFG-AIRCRAFT-006|检测|检验装配间隙与系统功能|采用校准量具与批准方法|source-backed|
|US-MFG-AIRCRAFT-007|交接|标识总成并交接检验状态|状态标识与产品一致|source-backed|
|US-MFG-AIRCRAFT-008|异常|隔离设计不符或漏检部件|仅授权人员决定处置|source-backed|
|US-MFG-AIRCRAFT-009|返工|按批准方案修复装配缺陷|重检合格后恢复状态|source-backed|
|US-MFG-AIRCRAFT-010|清洁维护|清洁结构件并移除加工废料|异物与材料兼容性检查|source-backed|
|US-MFG-AIRCRAFT-011|交付|提交可放行总成与质量记录|授权放行流程完成|source-backed|

缺口：整机试飞、发动机试车、复合材料成型、汽车/铁路/船舶场景须独立扩展。

### US-MFG-DENTALPRODUCT 牙科修复体制造

独立牙科实验室制造修复体；临床诊疗与口腔内操作归医疗

流程来源：M-ENERGY；职业来源：O51-9081.00。partial: occupation-and-general-maintenance-read; dedicated-production-workflow-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-DENTALPRODUCT-001|准备|核对处方与牙模或扫描件|身份与处方对应|source-backed|
|US-MFG-DENTALPRODUCT-002|作业|制作或扫描牙列模型|模型完整可供设计|source-backed|
|US-MFG-DENTALPRODUCT-003|作业|制作蜡型或修复体框架|符合批准处方设计|source-backed|
|US-MFG-DENTALPRODUCT-004|作业|敷加瓷或树脂并完成成型|材料与工艺状态记录|source-backed|
|US-MFG-DENTALPRODUCT-005|检测|使用咬合架检查修复体配合|按处方与试配要求验收|source-backed|
|US-MFG-DENTALPRODUCT-006|异常|反馈处方或模型不清问题|未澄清不擅自生产|proposed|
|US-MFG-DENTALPRODUCT-007|返工|补修缺损或调整修复体|再次检查咬合与尺寸|proposed|
|US-MFG-DENTALPRODUCT-008|清洁维护|打磨抛光后清理修复体与工具|按实验室/临床交接要求验收|source-backed|
|US-MFG-DENTALPRODUCT-009|交接|交接修复体设计与返修信息|身份与处方一致|source-backed|
|US-MFG-DENTALPRODUCT-010|交付|封装修复体并交诊疗机构|标识与清洁状态明确|proposed|

缺口：独立医疗器械生产质量规范路径未齐；本场景临时proposed，不代表2026QMSR已逐条核对；首饰、体育用品、玩具另拆。

### US-MFG-CEMENT 水泥生料、窑烧与粉磨装运

水泥厂实体生产；独立采石矿山不纳入水泥厂人工。

流程来源：M-CEMENT, M-ENERGY；职业来源：O51-9051.00, O51-9023.00, O51-9111.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-CEMENT-001|准备|核对到厂矿物原料与储位|身份和储位明确|source-backed|
|US-MFG-CEMENT-002|作业|向配料系统输送原料|物料与投料路径一致|source-backed|
|US-MFG-CEMENT-003|作业|称配并混合生料组分|批次和称量记录对应|source-backed|
|US-MFG-CEMENT-004|作业|操控生料粉磨及干燥设备|工艺状态按本线要求监测|source-backed|
|US-MFG-CEMENT-005|检测|采集生料样本送检|样本时间和物料来源关联|source-backed|
|US-MFG-CEMENT-006|交接|将合格生料输送至窑系统|入窑条件和交接记录明确|source-backed|
|US-MFG-CEMENT-007|作业|监控并调节窑烧过程|异常参数按本线控制要求识别|source-backed|
|US-MFG-CEMENT-008|作业|监控熟料冷却与转运|设备和物料状态记录|source-backed|
|US-MFG-CEMENT-009|作业|将熟料与规定组分进行终粉磨|组分和细度按产品计划检验|source-backed|
|US-MFG-CEMENT-010|检测|核查成品取样与质量状态|放行与留置状态清楚|source-backed|
|US-MFG-CEMENT-011|异常|停止并隔离异常输送或窑辅机|专门处置与恢复条件明确|source-backed|
|US-MFG-CEMENT-012|返工|按批准流程重处理不合格物料|不能任意回掺掩盖不合格|source-backed|
|US-MFG-CEMENT-013|清洁维护|清理停用粉料设备并检查磨损|具体粉尘和能源程序另核|source-backed|
|US-MFG-CEMENT-014|交付|将放行水泥装载并交付批次资料|产品类型批次及接收方对应|source-backed|

缺口：回转窑内部检修、矿山、余热系统和不同水泥产品配方仍需专门场景。

### US-MFG-GLASS 钠钙玻璃配料、熔化与成形后处理

容器和浮法存在不同成形分支，下列操作按目标产品选用；基础流程来自1986旧资料。

流程来源：M-GLASS, M-ENERGY；职业来源：O51-9051.00, O51-9195.00, O51-9111.00。partial: dedicated-process-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-GLASS-001|准备|核对玻璃原料与回用碎玻璃|批次和可用碎玻璃条件明确|source-backed|
|US-MFG-GLASS-002|作业|称量并混合玻璃配合料|按本线配方核查|source-backed|
|US-MFG-GLASS-003|作业|向熔窑投送配合料|入料路径与运行状态监控|source-backed|
|US-MFG-GLASS-004|作业|监控并调整玻璃熔化状态|按本线适用工艺范围记录|source-backed|
|US-MFG-GLASS-005|交接|将熔融玻璃供至成形环节|供料与下游工况衔接|source-backed|
|US-MFG-GLASS-006|作业|按产品分支操控玻璃成形设备|容器压吹或平板浮法须选明确分支|source-backed|
|US-MFG-GLASS-007|作业|实施规定退火后处理|产品要求及设备运行可追溯|source-backed|
|US-MFG-GLASS-008|检测|检查玻璃外形与可见缺陷|按目标产品标准判定|source-backed|
|US-MFG-GLASS-009|异常|隔离破损或异常玻璃|避免和正常成品混同|source-backed|
|US-MFG-GLASS-010|返工|将获准回用碎玻璃转入配料回收|成分适用性确认|source-backed|
|US-MFG-GLASS-011|清洁维护|清理停用模具和成形设备|清洁润滑与磨损问题确认|source-backed|
|US-MFG-GLASS-012|交付|保护包装并交付放行玻璃|产品和批次身份明确|source-backed|

缺口：尚须将容器压吹、浮法、深加工钢化/镀膜各自完整拆分；1986资料不可证明现用设备与自动化条件。

### US-MFG-CERAMIC 陶瓷成形、干燥施釉与烧成

陶瓷厂生产，采用所用产品工艺组合；技术陶瓷与日用陶瓷条件分开。

流程来源：M-CERAMIC, M-ENERGY；职业来源：O51-9195.00, O51-9051.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-CERAMIC-001|准备|核对陶瓷粉料与目标配方|原料批次和成分身份明确|source-backed|
|US-MFG-CERAMIC-002|作业|对原料进行规定粉碎分级|按产品工艺检查|source-backed|
|US-MFG-CERAMIC-003|作业|混合粉料或制备成形浆料|所选干湿工艺和批次明确|source-backed|
|US-MFG-CERAMIC-004|准备|装配并检查产品模具|尺寸和缺陷状态检查|source-backed|
|US-MFG-CERAMIC-005|作业|将成形料压制或浇注成规定坯体|按实际成形分支确认外形|source-backed|
|US-MFG-CERAMIC-006|作业|修整生坯粗边与规定开孔|尺寸与外观符合工序要求|source-backed|
|US-MFG-CERAMIC-007|交接|将生坯装入干燥设备|批次和装载配置记录|source-backed|
|US-MFG-CERAMIC-008|作业|监控坯体干燥状态|变形裂纹异常可识别|source-backed|
|US-MFG-CERAMIC-009|作业|对适用产品施加釉层|釉料和产品一致|source-backed|
|US-MFG-CERAMIC-010|作业|装窑并运行产品烧成周期|批次周期按本产品方案记录|source-backed|
|US-MFG-CERAMIC-011|检测|检查烧成品尺寸与表面缺陷|按目标用途检验|source-backed|
|US-MFG-CERAMIC-012|返工|按批准工艺精整可返修制品|不能推定全部裂纹可修复|source-backed|
|US-MFG-CERAMIC-013|异常|隔离窑炉异常或不合格批次|原因和处置记录|source-backed|
|US-MFG-CERAMIC-014|清洁维护|清理停用模具窑具和输送设施|缺陷和清洁状态明确|source-backed|
|US-MFG-CERAMIC-015|交付|包装并移交放行陶瓷|批次与质量状态对应|source-backed|

缺口：压力烧结、半导体陶瓷、卫生陶瓷和砖瓦产品需单独条件与人工拆分。

### US-MFG-TIRE 轮胎成形、硫化与检验

新胎成形与翻新虽共用职业代码，返工不得把翻新作业当新胎缺陷修理。

流程来源：M-TIRE, M-ENERGY；职业来源：O51-9197.00, O51-9023.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-TIRE-001|准备|核对胶料帘布与胎圈组件|规格批次与产品型号匹配|source-backed|
|US-MFG-TIRE-002|作业|按配方混合胶料|配方与混料状态可追溯|source-backed|
|US-MFG-TIRE-003|准备|按规格设定成形鼓与压辊|规格适合目标轮胎|source-backed|
|US-MFG-TIRE-004|作业|将内衬及帘布层定位至成形鼓|层序和接头位置按本产品检查|source-backed|
|US-MFG-TIRE-005|作业|装入胎圈并完成胎体层组合|组件位置和层序确认|source-backed|
|US-MFG-TIRE-006|作业|将带束与胎面组合至胎体|规格与外观按工序要求|source-backed|
|US-MFG-TIRE-007|交接|将生胎转入适配硫化模具|模具型号和生胎相符|source-backed|
|US-MFG-TIRE-008|作业|运行所选硫化工艺|工艺参数依厂家记录|source-backed|
|US-MFG-TIRE-009|作业|取出硫化轮胎并送至冷却|状态和批次保持可识别|source-backed|
|US-MFG-TIRE-010|检测|检查轮胎外观与规定测试结果|测试按产品规范决定|source-backed|
|US-MFG-TIRE-011|异常|隔离胎体缺陷或硫化异常产品|放行与报废边界由质量方决定|source-backed|
|US-MFG-TIRE-012|返工|执行获准的外观修整|不把结构缺陷默认为可返修|source-backed|
|US-MFG-TIRE-013|清洁维护|清理停用成形与硫化工具|缺陷部件标识|source-backed|
|US-MFG-TIRE-014|交付|交付放行轮胎与标识资料|型号批次和质量状态一致|source-backed|

缺口：翻新轮胎胎体检验、打磨、补胶与硫化需独立分支，当前虽列覆盖码但不称已穷尽；胶条挤出/压延/切裁专用流程待补。

### US-MFG-PHARMA 药品物料核对、批生产与灌装支持

非无菌制剂一般物料/混合/灌包装支持；具体剂型成形/无菌环境不能被通用批次取代。

流程来源：M-PHARMA；职业来源：O51-9011.00, O51-9111.00。partial: dedicated-process-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-PHARMA-001|准备|核对设备清洁标记与使用日志|标记与日志对应|source-backed|
|US-MFG-PHARMA-002|准备|核对待用组分与批准批记录|身份及放行状态确认|source-backed|
|US-MFG-PHARMA-003|检测|按适用条件采集包装容器样本|采样不能破坏声称的质量条件|source-backed|
|US-MFG-PHARMA-004|作业|称取本批药品生产物料|称量身份和数量复核|source-backed|
|US-MFG-PHARMA-005|作业|按批准批指令装料并运行混合|过程实际步骤按批记录记录|source-backed|
|US-MFG-PHARMA-006|检测|采集在制品样本检查混合与质量|采样范围与目的适当|source-backed|
|US-MFG-PHARMA-007|交接|将合格在制品移交指定下工序|状态和转移记录保持|source-backed|
|US-MFG-PHARMA-008|准备|核对并上载本批灌装包装材料|身份与本批匹配|source-backed|
|US-MFG-PHARMA-009|作业|操作适用剂型灌装包装设备|剂型和产品专用条件待细化|source-backed|
|US-MFG-PHARMA-010|检测|检查包装重量密封及标签|按本产品批准标准逐项确认|source-backed|
|US-MFG-PHARMA-011|异常|隔离偏差批次并提交调查|未查明不自行放行|source-backed|
|US-MFG-PHARMA-012|返工|仅执行已批准并验证的重处理|重处理记录与质量处置齐全|source-backed|
|US-MFG-PHARMA-013|清洁维护|按书面程序清洗生产设备|具体残留验证方案待补|source-backed|
|US-MFG-PHARMA-014|交付|向质量放行与成品接收方移交批记录|生产操作者不代替质量单位最终放行|source-backed|

缺口：缺片剂制粒压片包衣、冻干/无菌灌装、生物制品细分及其专用SOP；上述不是完整医药工艺链。

### US-MFG-AUTO 美国汽车厂车身后段总装与质量交接

美国Toyota工艺段自报作为地域边界，细部装配暂为研究提案，不采用海外工厂细节。

流程来源：M-AUTO；职业来源：O51-2092.00, O51-2022.00。partial: dedicated-process-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-AUTO-001|准备|核对车身身份与工位装配单|车型配置和身份一致|source-backed|
|US-MFG-AUTO-002|准备|配齐本车装配组件|组件身份可核对|source-backed|
|US-MFG-AUTO-003|交接|将待装車身交至指定工位|工位及配置同步|source-backed|
|US-MFG-AUTO-004|作业|定位并安装规定内饰组件|连接和外观按工位要求|proposed|
|US-MFG-AUTO-005|作业|安装规定线束和连接器|配置及接头按图核对|proposed|
|US-MFG-AUTO-006|作业|安装规定动力底盘模块|紧固和连接按具体车型验收|proposed|
|US-MFG-AUTO-007|作业|安装车轮及规定外装件|具体紧固标准待工厂SOP|proposed|
|US-MFG-AUTO-008|检测|执行装配工位质量检查|缺陷和身份绑定|source-backed|
|US-MFG-AUTO-009|异常|暂停异常车辆并发出质量工单|异常不流入正常放行|source-backed|
|US-MFG-AUTO-010|返工|按批准方法修正装配缺陷|返工与原缺陷关联|source-backed|
|US-MFG-AUTO-011|检测|执行出厂前适用功能检验|具体试验集待工厂验证|proposed|
|US-MFG-AUTO-012|清洁维护|清理工位并检查停用装配工具|缺陷和余料处理|source-backed|
|US-MFG-AUTO-013|交付|移交已放行车辆与生产记录|车型身份和质量状态对应|source-backed|

缺口：汽车主要冲压、焊装、涂装只有厂商段落路径确认，尚未逐工艺盘点；总装具体模块为proposed，不能称美国工厂岗位现场实证。

### US-MFG-WELD 金属构件焊接与返修

工厂金属制品焊接，独立于上游熔炼；不包含施工现场或造船专用工法。

流程来源：M-ENERGY；职业来源：O51-4121.00。partial: occupation-and-general-maintenance-read; dedicated-production-workflow-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-MFG-WELD-014|准备|清理待焊构件表面|表面状态按焊接工艺核对|source-backed|
|US-MFG-METAL-007|准备|对齐并夹紧待焊构件|间隙和定位按图纸确认|source-backed|
|US-MFG-METAL-008|作业|焊接规定接头|采用批准焊接工艺|source-backed|
|US-MFG-METAL-009|检测|检查焊缝外观与构件尺寸|按产品规范判定|source-backed|
|US-MFG-METAL-010|异常|隔离缺陷材料或异常焊接设备|报告后待授权处理|source-backed|
|US-MFG-METAL-011|返工|修整允许返修的焊接构件|返修后重新检验|source-backed|
|US-MFG-METAL-012|清洁维护|维护停用焊接设备|按焊接设备适用程序检查|source-backed|
|US-MFG-METAL-013|交付|交接炉次或构件追溯记录|身份与检验状态对应|source-backed|

缺口：尚需铸型制芯、连续铸造、轧制、锻压、热处理、电镀等专门流程；维护规范不能替代冶金或焊接SOP。

行业缺口：未对全部六位NAICS产品线穷尽盘点；当前不冻结。；烟草加工、制鞋制革、船舶、锂电、医药无菌制剂、生物制品、汽车冲压焊装涂装等仍需专门扩展；玻璃/陶瓷/橡胶新增切片不等于全部产品覆盖。；自营与外包的合同/机构归属待现场确认；不从职业代码推所有制。

## 政府

按BEA G行业分类，分别标联邦国防/非国防、政府企业、州地方教育/卫生/其他服务。私人承包机构不因位于政府设施就归政府。政府自营学校/医院不归private education/health；公费私人医疗仍归private health。

### US-GOV-SCHOOLMEAL 公立学校自营供餐

政府学校自营厨房；承包餐饮只记录餐盘/食品交接

流程来源：G-SCHOOLFOOD；职业来源：O35-2012.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-GOV-SCHOOLMEAL-001|准备|检查配送食品与订单|品种数量和状态符合收货要求|source-backed|
|US-GOV-SCHOOLMEAL-002|准备|标识食品日期并轮换库存|先进先出及品类存储要求确认|source-backed|
|US-GOV-SCHOOLMEAL-003|作业|清洗并切配蔬菜原料|卫生与规格检查|source-backed|
|US-GOV-SCHOOLMEAL-004|作业|按食谱烹制当餐食品|饮食限制与批准食谱一致|source-backed|
|US-GOV-SCHOOLMEAL-005|检测|测量并记录餐食温度|按厨房批准HACCP标准判定|source-backed|
|US-GOV-SCHOOLMEAL-006|异常|隔离温控或过敏原信息异常餐食|未查明不得供应|source-backed|
|US-GOV-SCHOOLMEAL-007|返工|按获准方法处置可修正餐食|复核后放行或弃置|source-backed|
|US-GOV-SCHOOLMEAL-008|交接|将餐食移交供餐位置|餐次与饮食要求传递|source-backed|
|US-GOV-SCHOOLMEAL-009|作业|分餐并向学生发放餐食|份量与特殊饮食对应|source-backed|
|US-GOV-SCHOOLMEAL-010|清洁维护|清洗餐具和厨房工作面|卫生程序验收|source-backed|
|US-GOV-SCHOOLMEAL-011|交付|核对发餐及食品耗用记录|差异留痕|source-backed|

缺口：普通餐食、冷食和复杂冷却再加热应分别建工艺；具体阈值不由本清单生成。

### US-GOV-SCHOOLAID 公立学校课堂实体支持与校内活动

以学校自营人员布置/搬运/监督为对象；知识讲授未全部列入实体劳动

流程来源：G-SCHOOL；职业来源：O25-9042.00。partial: dedicated-process-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-GOV-SCHOOLAID-001|准备|布置教学材料与演示器材|按教师要求摆放|source-backed|
|US-GOV-SCHOOLAID-002|作业|向学生分发教材与操作材料|学生与数量匹配|source-backed|
|US-GOV-SCHOOLAID-003|作业|协助学生使用活动器材|按教师计划与安全要求监督|source-backed|
|US-GOV-SCHOOLAID-004|交接|护送学生在校内活动地点间移动|人数和责任人确认|source-backed|
|US-GOV-SCHOOLAID-005|检测|检查材料器材损坏与使用状况|问题器材移出使用|source-backed|
|US-GOV-SCHOOLAID-006|异常|报告学生不适或活动异常|交教师或校内授权人员|source-backed|
|US-GOV-SCHOOLAID-007|返工|重新布置不适合活动的材料空间|教师确认可用|proposed|
|US-GOV-SCHOOLAID-008|清洁维护|清理课堂与回收活动器材|器材齐全且卫生达标|source-backed|
|US-GOV-SCHOOLAID-009|交付|交接学生观察与材料使用记录|身份与事件对应|source-backed|

缺口：特殊教育护理、校车专门装载、大学实验/维修另拆；IDEA只支持移动范围，课堂规范尚不齐备。

### US-GOV-HOSPITAL 政府医院/VA床旁照护与移动

政府医院直接雇员床旁服务；私营医院相似任务使用US-HLT独立ID

流程来源：G-VA, G-VAAPP；职业来源：O31-1131.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-GOV-HOSPITAL-001|准备|核对护理计划与活动限制|患者身份与限制匹配|source-backed|
|US-GOV-HOSPITAL-002|检测|评估患者当次移动能力|使用机构批准评估并记录|source-backed|
|US-GOV-HOSPITAL-003|准备|配置患者移位器具|类型状态及人员配置确认|source-backed|
|US-GOV-HOSPITAL-004|作业|协助患者床椅转移|按个体计划完成并观察反应|source-backed|
|US-GOV-HOSPITAL-005|作业|为卧床患者调整体位|舒适度及皮肤状况报告|source-backed|
|US-GOV-HOSPITAL-006|作业|协助患者进食与饮水|记录摄入与困难|source-backed|
|US-GOV-HOSPITAL-007|作业|协助患者洗浴穿衣和如厕|隐私与个体能力限制满足|source-backed|
|US-GOV-HOSPITAL-008|交接|传递患者症状及照护变化|异常及时交接|source-backed|
|US-GOV-HOSPITAL-009|异常|响应呼叫并上报异常症状|按职责升级，非自行诊断|source-backed|
|US-GOV-HOSPITAL-010|返工|复核未达目标的移位安排|授权人员重新评估后再尝试|proposed|
|US-GOV-HOSPITAL-011|清洁维护|更换床品并清洁使用器具|按医院卫生程序|source-backed|
|US-GOV-HOSPITAL-012|交付|完成当班照护与交班记录|患者和任务状态对应|source-backed|

缺口：政府医院的诊疗、手术、检验、康复、药房与设备供应需继续展开；不由移动样板代替。

### US-GOV-ROAD 政府自营道路巡查与坑槽维修

政府养护班组；承包铺路施工归construction

流程来源：G-ROAD；职业来源：O47-4051.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-GOV-ROAD-001|准备|检查维修车辆工具与材料|适用班前检查完成|source-backed|
|US-GOV-ROAD-002|准备|布设维修区域交通标志|与批准交通方案一致|source-backed|
|US-GOV-ROAD-003|检测|巡查并标识路面坑槽|位置范围可复查|source-backed|
|US-GOV-ROAD-004|作业|清除坑槽内积水与杂物|适合所选维修方法|source-backed|
|US-GOV-ROAD-005|作业|修整拟修补区域边界|按所选方法与现场规范|source-backed|
|US-GOV-ROAD-006|作业|填放修补混合料|材料批次和覆盖范围确认|source-backed|
|US-GOV-ROAD-007|作业|压实适用修补层|按方法验收；喷射法不强加此步骤|source-backed|
|US-GOV-ROAD-008|检测|检查修补表面与后续表现|高差松散缺陷记录|source-backed|
|US-GOV-ROAD-009|异常|发现更大结构或排水问题后升级|不以简单补坑掩盖问题|source-backed|
|US-GOV-ROAD-010|返工|返修未达要求的修补区域|重新验收|source-backed|
|US-GOV-ROAD-011|清洁维护|清理施工遗留并保养设备|无遗留交通障碍|source-backed|
|US-GOV-ROAD-012|交接|交接维修记录给道路管理方|位置材料与方法可追踪|source-backed|
|US-GOV-ROAD-013|交付|按授权撤除封闭并恢复交通|人员设备离开且授权确认|source-backed|

缺口：道路除雪、标线、护栏、桥涵、绿化另拆；未采用1999工时/成本。

### US-GOV-POST USPS邮件分拣与城市投递

USPS执行；私人快递承运人不进入本政府场景

流程来源：G-POST；职业来源：O43-5053.00, O43-5052.00。partial: dedicated-process-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-GOV-POST-001|准备|卸收并标识邮件容器|来源与容器标识确认|source-backed|
|US-GOV-POST-002|检测|检查邮件地址邮资与包装状态|不足信息转异常流程|source-backed|
|US-GOV-POST-003|作业|将邮件送入分拣设备|目的地路由正确|source-backed|
|US-GOV-POST-004|作业|手工分类异形或无法机分邮件|特殊处理状态保留|source-backed|
|US-GOV-POST-005|异常|处置分拣卡阻与不可辨地址|按设备与邮件规则处理|source-backed|
|US-GOV-POST-006|返工|重包破损包裹或更正误分流|原件身份与去向不丢失|source-backed|
|US-GOV-POST-007|交接|捆扎标识已分邮件并交投递班|路线与数量状态确认|source-backed|
|US-GOV-POST-008|作业|按路线顺序装配投递邮件|地址顺序核对|source-backed|
|US-GOV-POST-009|作业|投递邮件并取得必要签收|签收和受控邮件规则遵守|source-backed|
|US-GOV-POST-010|异常|为未能投递邮件留通知并回局|去向和原因可追踪|source-backed|
|US-GOV-POST-011|交付|交回收集邮件收据与款项|邮件款项收据核对|source-backed|
|US-GOV-POST-012|清洁维护|报告损坏投递设施或分拣设备|不得自行省略保管责任|proposed|

缺口：当前完整M-41、投递车维护与受控邮件规范尚未齐读；此处历史范围+当前职责作拟议盘点。

### US-GOV-WATER 政府自营水处理与设备巡检

政府水务机构；私人水务机构属于utilities，不因服务公众而计政府

流程来源：G-WATERFLOW, G-WATER；职业来源：O51-8031.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-GOV-WATER-001|准备|核对处理计划与药剂库存|药剂身份与库存确认|source-backed|
|US-GOV-WATER-002|检测|采集原水或出水样品|取样点方法时间明确|source-backed|
|US-GOV-WATER-003|作业|调节处理设备运行条件|依水厂许可和SOP|source-backed|
|US-GOV-WATER-004|作业|按批准程序投加处理药剂|不由本清单提供剂量|source-backed|
|US-GOV-WATER-005|作业|操作过滤设备并监视状态|异常压差/水质变化识别|source-backed|
|US-GOV-WATER-006|交接|交接班次仪表与水质结果|异常与设备状态清晰|source-backed|
|US-GOV-WATER-007|异常|上报水质或设备偏差|按水厂程序隔离与通报|source-backed|
|US-GOV-WATER-008|返工|按批准方案重新处理或调整水流|获准后按标准检测|proposed|
|US-GOV-WATER-009|清洁维护|清洗滤床储罐或更换失效介质|依设备和卫生程序验收|source-backed|
|US-GOV-WATER-010|清洁维护|维护泵阀和安全设备|试运行及权限确认|source-backed|
|US-GOV-WATER-011|交付|提交水质运行与维护记录|批次/时间段可追溯|source-backed|

缺口：污水格栅、曝气、脱水、管网检漏及政府电力还需各自场景。

### US-GOV-TRANSIT 地方公共机构自营公交服务

公营运营机构车辆与人员；私人外包班次归private transportation

流程来源：G-TRANSIT；职业来源：O53-3052.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-GOV-TRANSIT-001|准备|检查公交车辆与油液状态|缺陷上报后决定可用|source-backed|
|US-GOV-TRANSIT-002|准备|核对运营路线与班次|路线和调度一致|source-backed|
|US-GOV-TRANSIT-003|作业|停靠站点并协助乘客上车|无障碍需求按规范协助|source-backed|
|US-GOV-TRANSIT-004|作业|协助使用轮椅固定装置|依无障碍规则与设备说明|source-backed|
|US-GOV-TRANSIT-005|作业|按核定路线驾驶运营车辆|遵守行车和调度规则|source-backed|
|US-GOV-TRANSIT-006|交接|通告停站并交接换乘信息|与实际线路一致|source-backed|
|US-GOV-TRANSIT-007|检测|观察乘客安全及车辆异常|需要响应的信息及时识别|source-backed|
|US-GOV-TRANSIT-008|异常|处置乘客紧急情况并报告延误|按运营机构程序|source-backed|
|US-GOV-TRANSIT-009|返工|复核无法完成的无障碍乘降安排|不默认强制乘客转座|proposed|
|US-GOV-TRANSIT-010|清洁维护|清洁车辆乘坐区域|按机构清洁要求|source-backed|
|US-GOV-TRANSIT-011|交付|交接车辆故障及班次记录|车辆状态与记录对应|source-backed|

缺口：轨道列车驾驶、车站服务、轨道维护和校车另拆；FTA来源仅覆盖无障碍流程。

### US-GOV-CUSTODY 联邦羁押机构接收、生活保障与移交

只盘点公开接收、生活保障和记录动作；州地方规程不得直接照搬

流程来源：G-BOP；职业来源：O33-3012.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-GOV-CUSTODY-001|准备|核对接收人员身份与交接资料|身份与授权资料一致|source-backed|
|US-GOV-CUSTODY-002|作业|登记并保管准许留存财物|数量与归属可核对|source-backed|
|US-GOV-CUSTODY-003|作业|发放服装寝具与卫生用品|接收记录完整|source-backed|
|US-GOV-CUSTODY-004|交接|将入所健康问题转介医疗评估|由医疗人员评估|source-backed|
|US-GOV-CUSTODY-005|检测|清点人数并记录当班状态|差异必须核实|source-backed|
|US-GOV-CUSTODY-006|检测|检查居住区域卫生与设施|问题可追踪整改|source-backed|
|US-GOV-CUSTODY-007|异常|上报人数或财物记录不一致|按授权程序复核|source-backed|
|US-GOV-CUSTODY-008|返工|复点并纠正已核实登记差错|原记录与更正留痕|source-backed|
|US-GOV-CUSTODY-009|清洁维护|转派损坏设施与寝具清洁需求|自营和外包执行分清|source-backed|
|US-GOV-CUSTODY-010|交付|移交人员及其财物记录|身份财物及照护信息一致|source-backed|

缺口：警务巡逻/执法、监所设施维修及释放后服务另拆；医疗操作不与同场所医疗人员重复。

### US-GOV-LOGISTICS 联邦机构一般物资收储与发放

以DLA公开美国库场流程为基础；合同作业不自动计政府，仅一般物资无作战步骤

流程来源：G-DLA, G-DLACONTRACT；职业来源：O53-7065.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-GOV-LOGISTICS-001|准备|核对入库单据与货位条件|货位与物资属性适配|source-backed|
|US-GOV-LOGISTICS-002|检测|清点检查到货物资|数量身份状态一致|source-backed|
|US-GOV-LOGISTICS-003|作业|拆包并标识物资单元|身份可追踪|source-backed|
|US-GOV-LOGISTICS-004|作业|存放物资到指定库位|货位和记录对应|source-backed|
|US-GOV-LOGISTICS-005|检测|盘点库存并检查保存状态|缺失或劣化被识别|source-backed|
|US-GOV-LOGISTICS-006|交接|按领用指令拣取物资|品种数量与授权一致|source-backed|
|US-GOV-LOGISTICS-007|异常|隔离损坏或过期物资|转授权处置|source-backed|
|US-GOV-LOGISTICS-008|返工|修复允许重包的外包装|身份与防护状态保持|source-backed|
|US-GOV-LOGISTICS-009|清洁维护|维护库区与搬运工具|按库场适用程序|source-backed|
|US-GOV-LOGISTICS-010|交付|包装标记并交运一般物资|收方及单据一致|source-backed|

缺口：军械专门保养、危险物完整规程、海外设施边界未覆盖；不假设全部DLA员工为公职。

### US-GOV-FIRE 地方政府消防响应与装备复位

地方政府消防队雇员实体响应；私营工业消防队、非政府志愿组织不可自动归政府。

流程来源：G-FIRE, G-FIREPPE；职业来源：O33-2011.00。partial: dedicated-process-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-GOV-FIRE-001|准备|检查呼吸器与消防防护装备|按本队现行SOP检查可用性|source-backed|
|US-GOV-FIRE-002|准备|穿戴与任务匹配的防护装备|装备适配和佩戴状态确认|source-backed|
|US-GOV-FIRE-003|作业|驾驶消防车辆到指定响应位置|按指挥安排完成到位|source-backed|
|US-GOV-FIRE-004|检测|观察现场火势建筑与进入条件|风险与可进入范围提交指挥|source-backed|
|US-GOV-FIRE-005|作业|布设供水管线并连接适用水枪|按战术指令确认|source-backed|
|US-GOV-FIRE-006|作业|操作消防泵并维持指定供水|供水状态与前端反馈一致|source-backed|
|US-GOV-FIRE-007|作业|按指令实施火源压制|实际效果持续反馈|source-backed|
|US-GOV-FIRE-008|作业|搜索指定区域内待救人员|区域完成与未搜索位置记录|source-backed|
|US-GOV-FIRE-009|作业|将可移送待救人员转移至接收位置|转移后向医疗或其他接收方交接|source-backed|
|US-GOV-FIRE-010|交接|向医疗接收人员移交伤员状态|已实施处置和异常明确|source-backed|
|US-GOV-FIRE-011|异常|报告结构或危险物异常并执行指挥调整|不自行扩大未授权作业区|source-backed|
|US-GOV-FIRE-012|检测|按现场许可检查残余火点|兼顾调查证据保全，未获准不随意翻动|source-backed|
|US-GOV-FIRE-013|返工|处置复查确认的残余火点|再次检查后记录|source-backed|
|US-GOV-FIRE-014|清洁维护|清洁污染装备并标识待修件|按本队SOP，不套历史服役年限|source-backed|
|US-GOV-FIRE-015|清洁维护|补充车辆消耗物资并恢复值勤配置|补充与设备状态记录|source-backed|
|US-GOV-FIRE-016|交付|移交现场观察及响应记录|保全线索与后续责任清楚|source-backed|

缺口：USFA资料重点调查保全和装备，不是全部战术；高空、危化、潜水、山火、车辆破拆、技术救援待独立流程。

行业缺口：联邦/州地方不是同一操作制度；目前逐场景列来源范围。；公安巡逻、司法法院、边境口岸、监测检验、公共科研/图书档案、发电配电、市政垃圾、国防维修与全部公立大学实验室尚未细盘。；政府预算或购买金额不当作该任务增加值、人工投入。

## 医疗卫生与社会援助

BEA private health care and social assistance（621/622/623/624）。私人营利与非营利机构均可在内；医保/政府购买不改变私人机构归属。政府自营医院和护理服务另列us-government；私人机构内部支持任务计一次，外包清洁/洗涤/承运按承包机构行业归属。

### US-HLT-SPECIMEN 门诊/医院检验标本采集与交接

私人医疗机构采集与实验室接收；独立运输商只记交接

流程来源：H-CLIA；职业来源：O31-9097.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-HLT-SPECIMEN-001|准备|核对患者身份与检验申请|身份申请采样容器匹配|source-backed|
|US-HLT-SPECIMEN-002|准备|准备采样器材与工作盘|按机构采样规范检查|source-backed|
|US-HLT-SPECIMEN-003|作业|向患者说明采集并核对准备状态|必要准备和沟通完成|source-backed|
|US-HLT-SPECIMEN-004|作业|由授权人员采集规定标本|按临床规范执行，无自行生成方法参数|source-backed|
|US-HLT-SPECIMEN-005|检测|检查标本容器与识别信息|身份来源时间及容器可核对|source-backed|
|US-HLT-SPECIMEN-006|作业|处理标本以满足检验前条件|依实验室具体方法|source-backed|
|US-HLT-SPECIMEN-007|交接|包装保存并交实验室或承运方|时间温控和保管链记录|source-backed|
|US-HLT-SPECIMEN-008|异常|拒收或隔离标识不清和不合格标本|通知申请/采集人员|source-backed|
|US-HLT-SPECIMEN-009|返工|依据授权重新采集所需标本|不得擅自重贴身份；新采原因记录|source-backed|
|US-HLT-SPECIMEN-010|清洁维护|处置锐器并清洁采集环境|感染控制与废物程序验收|source-backed|
|US-HLT-SPECIMEN-011|交付|登记实验室接收时间与流转结果|申请与标本状态对应|source-backed|

缺口：具体分析测试、培养、切片与病理阅片需另拆；最新CLIA条文仍待复核。

### US-HLT-IMAGING 私人诊疗机构X线影像检查

常规X线/CT等按各模式分别核算；MRI/超声不套用X线流程

流程来源：H-XRAY；职业来源：O29-2034.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-HLT-IMAGING-001|准备|核对影像申请与病史相关信息|部位与检查必要性由临床确定|source-backed|
|US-HLT-IMAGING-002|准备|检查影像设备与质控状态|维护与质控未失效|source-backed|
|US-HLT-IMAGING-003|作业|协助患者定位到检查体位|按检查方案及患者能力确认|source-backed|
|US-HLT-IMAGING-004|作业|设置并执行经批准的影像采集|由合格人员按模式规程执行|source-backed|
|US-HLT-IMAGING-005|检测|检查影像可诊断质量|以临床任务要求判定|source-backed|
|US-HLT-IMAGING-006|检测|记录剂量指标和设备设置|不把参考水平等同硬性剂量上限|source-backed|
|US-HLT-IMAGING-007|异常|报告设备故障或患者不良反应|暂停并交授权人员处理|source-backed|
|US-HLT-IMAGING-008|返工|由临床团队决定必要的重采|避免自动重复曝光|source-backed|
|US-HLT-IMAGING-009|交接|移交影像与患者检查信息|患者与检查身份一致|source-backed|
|US-HLT-IMAGING-010|清洁维护|清洁接触面并交修异常设备|依器械与院内规程|source-backed|
|US-HLT-IMAGING-011|交付|完成患者离室协助与检查记录|患者安全及记录齐备|source-backed|

缺口：介入影像、造影药物、乳腺与儿科细分尚需专门规范；未使用国外剂量指标。

### US-HLT-STERILE 私人医院消毒供应器械再处理

从用后器械接收到无菌储存交付；外包灭菌服务须另辨执行机构

流程来源：H-STERILE；职业来源：O31-9093.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-HLT-STERILE-001|准备|接收清点用后器械|器械身份数量及污染状态明确|source-backed|
|US-HLT-STERILE-002|作业|拆分器械并清除可见污物|依器械说明分解|source-backed|
|US-HLT-STERILE-003|作业|执行兼容的器械清洗|清洗方法与器械材料兼容|source-backed|
|US-HLT-STERILE-004|检测|检查清洁度与器械完整性|残留与破损可识别|source-backed|
|US-HLT-STERILE-005|作业|组装器械包并选择兼容包装|清单完整与包装适用|source-backed|
|US-HLT-STERILE-006|作业|装载灭菌设备并运行批准循环|按器械/设备厂家说明|source-backed|
|US-HLT-STERILE-007|检测|读取机械化学生物监测结果|按机构标准决定负载状态|source-backed|
|US-HLT-STERILE-008|异常|隔离监测失败或破包器械|不可按无菌品发出|source-backed|
|US-HLT-STERILE-009|返工|重包装并重处理允许返工器械|原因修正并重新监测|source-backed|
|US-HLT-STERILE-010|交接|标记循环批号并转无菌储存|标识与负载记录对应|source-backed|
|US-HLT-STERILE-011|清洁维护|清洁保养再处理设备|恢复使用前按程序验收|source-backed|
|US-HLT-STERILE-012|交付|发放器械并核对包状态|包装完整与质量状态可追溯|source-backed|

缺口：软式内镜另有漏检/管腔步骤；不将所有器械用同一灭菌模式处理。

### US-HLT-OR 私人医院手术室实体支持

限围手术期器械、体位、无菌场与标本交接；手术治疗动作另由专科拆解

流程来源：H-STERILE, G-VAAPP；职业来源：O29-2055.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-HLT-OR-001|准备|按手术清单备齐器械与耗材|类型数量与清单对应|source-backed|
|US-HLT-OR-002|准备|检查并布置无菌工作区|完整性与操作权限确认|source-backed|
|US-HLT-OR-003|作业|按临床指令协助患者体位摆放|个体计划与设备适配|source-backed|
|US-HLT-OR-004|检测|清点手术器械敷料与针具|手术前后记录对应|source-backed|
|US-HLT-OR-005|作业|按请求传递器械与耗材|无菌状态与请求核对|source-backed|
|US-HLT-OR-006|交接|标识并移交术中标本|患者部位身份和容器对应|source-backed|
|US-HLT-OR-007|异常|报告器械计数差异或无菌破坏|不自行忽略差异|source-backed|
|US-HLT-OR-008|返工|更换污染器械或重新布置受影响无菌区|按临床团队指令复核|source-backed|
|US-HLT-OR-009|清洁维护|清点回收器械并移交再处理|清点责任与污染状态传递|source-backed|
|US-HLT-OR-010|交付|补充手术室物料并完成记录|记录与补充物料核对|source-backed|

缺口：具体术式、麻醉、止血缝合和机器人手术均未研究；不把支持动作代替手术任务。

### US-HLT-WARD 私人医院与护理机构日常照护

需要分别标医院/护理机构合同；同一服务时段只归实际机构一次

流程来源：G-VAAPP；职业来源：O31-1131.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-HLT-WARD-001|准备|核对照护计划与膳食限制|身份限制对应|source-backed|
|US-HLT-WARD-002|检测|观察并记录生命体征与皮肤变化|按护理指令记录并上报|source-backed|
|US-HLT-WARD-003|作业|协助床椅转移与行走|依个体评估及人员配置|source-backed|
|US-HLT-WARD-004|作业|调整卧床患者体位|反应与照护状态记录|source-backed|
|US-HLT-WARD-005|作业|协助进食并记录摄入|膳食限制与吞咽困难上报|source-backed|
|US-HLT-WARD-006|作业|协助洗浴更衣与如厕|个体能力隐私与照护计划|source-backed|
|US-HLT-WARD-007|交接|向护士交接症状与护理需求|变化清晰可追踪|source-backed|
|US-HLT-WARD-008|异常|响应呼叫并报告突发不适|由授权临床人员评估|source-backed|
|US-HLT-WARD-009|返工|复核不适配的照护安排|经评估后改变支持方法|proposed|
|US-HLT-WARD-010|清洁维护|更换床品并清洁照护用具|按机构卫生程序|source-backed|
|US-HLT-WARD-011|交付|完成当班护理记录|患者与任务状态一致|source-backed|

缺口：VA工具允许非VA参考但须当地治理批准；药物、伤口、导管等不能由护理助理职责推定。

### US-HLT-REHAB 私人康复机构功能活动与辅助器具训练

依物理治疗师个体计划；设备/程序仅作任务定义不作自行康复处方

流程来源：G-VAAPP；职业来源：O31-2021.00。partial: dedicated-process-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-HLT-REHAB-001|准备|核对个体治疗计划与活动限制|患者身份与计划一致|source-backed|
|US-HLT-REHAB-002|准备|调整训练器材与支持装置|与患者能力及计划适配|source-backed|
|US-HLT-REHAB-003|作业|协助患者进入训练位置|转移支持按评估执行|source-backed|
|US-HLT-REHAB-004|作业|指导并支持规定功能活动|观察反应与完成情况|source-backed|
|US-HLT-REHAB-005|作业|协助穿脱或适配支具|按治疗人员要求检查|source-backed|
|US-HLT-REHAB-006|检测|记录关节活动或活动反应|方法与前次记录可比较|source-backed|
|US-HLT-REHAB-007|异常|识别不耐受并报告治疗师|按授权计划暂停|source-backed|
|US-HLT-REHAB-008|返工|按修订方案重设支持与训练条件|不将重复动作当作自动治疗收益|source-backed|
|US-HLT-REHAB-009|交接|向照护者示范已批准辅助活动|理解与执行限制确认|source-backed|
|US-HLT-REHAB-010|清洁维护|清洁检查并归位训练设备|卫生与故障检查|source-backed|
|US-HLT-REHAB-011|交付|向治疗师提交进展记录|关联患者与方案|source-backed|

缺口：专用康复临床流程路径不足；神经、儿童、言语、职业治疗等须另列。

### US-HLT-HOME 私人居家照护服务

私人机构雇员到户照护；纯私人家佣在其他服务/私人家庭边界待辨

流程来源：G-VAAPP；职业来源：O31-1121.00。partial: dedicated-process-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-HLT-HOME-001|准备|核对居家服务计划与家庭环境|个体限制和紧急联系人明确|source-backed|
|US-HLT-HOME-002|作业|协助客户床椅或浴室移动|依据评估与家中条件|source-backed|
|US-HLT-HOME-003|作业|协助洗浴穿衣与个人清洁|隐私与个体计划遵守|source-backed|
|US-HLT-HOME-004|作业|按规定饮食准备并供应餐食|膳食限制与卫生要求|source-backed|
|US-HLT-HOME-005|作业|更换床品并处理照护相关洗涤|与家务外包服务不重复|source-backed|
|US-HLT-HOME-006|检测|观察并记录客户状态变化|及时向主管报告|source-backed|
|US-HLT-HOME-007|交接|陪同客户外出并移交就诊信息|人员与信息交付确认|source-backed|
|US-HLT-HOME-008|异常|报告跌倒风险或突发不适|按机构紧急程序响应|source-backed|
|US-HLT-HOME-009|返工|重新安排未能完成的照护任务|主管批准且客户意愿确认|proposed|
|US-HLT-HOME-010|清洁维护|清洁家庭内照护器具|按适用设备要求|source-backed|
|US-HLT-HOME-011|交付|提交服务记录与后续需求|任务与时间记录完整|source-backed|

缺口：州资质与具体允许给药/伤口操作未核对，未在此据O*NET列为通用可执行操作。

### US-HLT-CHILD 私人日托与儿童照护

非政府、非单纯学科教学的日托；政府自营学校/幼儿园归政府

流程来源：H-CHILD；职业来源：O39-9011.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-HLT-CHILD-001|准备|核对儿童签到与照护事项|身份授权和特殊事项确认|source-backed|
|US-HLT-CHILD-002|准备|布置并检查游戏环境|危险物和损坏物移除|source-backed|
|US-HLT-CHILD-003|作业|监督儿童游戏与身体活动|按机构计划与发展阶段|source-backed|
|US-HLT-CHILD-004|作业|协助儿童进食饮水|过敏和饮食要求遵守|source-backed|
|US-HLT-CHILD-005|作业|协助更衣换尿布与如厕|按卫生与隐私规程|source-backed|
|US-HLT-CHILD-006|作业|组织休息并观察儿童状态|按年龄适用安全要求|source-backed|
|US-HLT-CHILD-007|检测|记录活动和健康变化|变化及时沟通|source-backed|
|US-HLT-CHILD-008|异常|发现不适或突发事件后执行通知|按机构紧急计划|source-backed|
|US-HLT-CHILD-009|返工|更换污染用品并重清活动区|卫生检查后恢复|proposed|
|US-HLT-CHILD-010|清洁维护|清洁消毒玩具和用具|适用产品说明与机构程序|source-backed|
|US-HLT-CHILD-011|交接|向授权监护人交接儿童与记录|授权身份核对|source-backed|
|US-HLT-CHILD-012|交付|归整物品并完成班次清点|儿童及物品状态明确|source-backed|

缺口：年龄分层、残障日托、夜间照护与州许可要求未逐项展开。

### US-HLT-SOCIAL 私人社会援助机构住宿与生活支持

非营利或私人机构直接服务；政府资助不改变私人执行归属

流程来源：H-SHELTER；职业来源：O21-1093.00, O35-2012.00。partial: dedicated-process-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-HLT-SOCIAL-001|准备|登记入住或援助对象的实际需求|身份与隐私保护|source-backed|
|US-HLT-SOCIAL-002|准备|检查分配住宿空间的基本状态|卫生与安全问题记录|source-backed|
|US-HLT-SOCIAL-003|作业|交付寝具与必要生活用品|数量与使用人确认|proposed|
|US-HLT-SOCIAL-004|作业|组织住客使用共用生活设施|卫生规则与必要协助清晰|source-backed|
|US-HLT-SOCIAL-005|作业|准备并供应符合需求的集中餐食|由适任人员按食品程序|proposed|
|US-HLT-SOCIAL-006|检测|观察服务对象的身体与生活困难|风险上报及转介需求识别|source-backed|
|US-HLT-SOCIAL-007|交接|联系并移交专业机构接续服务|得到授权且确认接收|source-backed|
|US-HLT-SOCIAL-008|异常|报告住所危险或服务突发问题|按项目应急程序|source-backed|
|US-HLT-SOCIAL-009|返工|按重新评估调整不适配生活安排|与对象及主管确认|proposed|
|US-HLT-SOCIAL-010|清洁维护|协调寝具洗涤与住所清洁|自营外包和住客劳动各自记录|proposed|
|US-HLT-SOCIAL-011|交付|完成离所物品与接续服务交接|物品和服务信息可核对|source-backed|

缺口：不从社会工作职责推全部由该岗位亲自清洗烹饪；食品与寝具动作需具体项目规程证实。

行业缺口：未完成所有疾病、专科、诊疗技术和社会服务细分；不将下列护理/检验清单称为全部医疗任务。；急救、透析、口腔诊疗、输液给药、伤口处置、产科、精神卫生住院、临终照护等需进一步细盘。；没有由患者体力、职业职责或床位数推定人工工时。

## 建筑业

NAICS 23：私营施工机构承担的住宅/非住宅/土木工程及专业分包；政府付费的承包工程仍按执行企业归建筑。政府雇员施工或检查属政府；材料工厂制造属制造，独立设计/检测属专业服务。项目自有班组维护与专业外包按实际执行机构分别归属。

### US-CON-EARTH 施工场地开挖、回填与整平

承包商土方班组；政府公路工程手册作为流程路径，审批不分配给施工工人。

流程来源：C-EARTH；职业来源：O47-2061.00, O47-2073.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-CON-EARTH-001|准备|核对开挖区地下设施标记|疑点上报并在开工前得到处理|source-backed|
|US-CON-EARTH-002|准备|放样开挖标高与边线|边线及标高可追溯至项目控制点|source-backed|
|US-CON-EARTH-003|准备|布置施工交通与人员隔离设施|出入口与设备路径按方案区分|source-backed|
|US-CON-EARTH-004|作业|剥离地表与清运障碍物|清除对象及保留对象符合图纸|source-backed|
|US-CON-EARTH-005|作业|操控设备分层开挖土石|未越过批准边界|source-backed|
|US-CON-EARTH-006|交接|引导装载机向运输车装料|车辆位置与装载对象确认|source-backed|
|US-CON-EARTH-007|检测|检查开挖土质和渗水异常|不适用材料与不明管线被识别|source-backed|
|US-CON-EARTH-008|异常|停止不明设施附近开挖并保护现场|信息提交指定负责人|source-backed|
|US-CON-EARTH-009|返工|移除不合格回填材料|被拒材料与原批次隔离|source-backed|
|US-CON-EARTH-010|作业|摊铺回填材料并分层压实|层次和操作符合项目方案|source-backed|
|US-CON-EARTH-011|检测|采集压实层质量检测样本|对应填层可重识别；独立试验室另归属|source-backed|
|US-CON-EARTH-012|清洁维护|清理停用土方设备并检查磨损|影响作业的缺陷被记录处理|source-backed|
|US-CON-EARTH-013|交付|复测完成面并移交下道工序|标高与边界按图核对|source-backed|

缺口：深基坑支护安装、爆破及污染土处置需独立场景；未以常规土方流程覆盖。

### US-CON-CONCRETE 现浇结构模板、配筋、浇筑与养护

将配筋、木模板、混凝土不同班组动作分列；本场景是现浇构件而非工厂预制。

流程来源：C-CONCRETE；职业来源：O47-2051.00, O47-2171.00, O47-2031.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-CON-CONCRETE-001|准备|核对构件配筋和预埋图|版本与构件编号匹配|source-backed|
|US-CON-CONCRETE-002|准备|卸下并分置钢筋材料|规格标识与数量可核对|source-backed|
|US-CON-CONCRETE-003|作业|切弯钢筋至图定形状|形状及长度符合项目单|source-backed|
|US-CON-CONCRETE-004|作业|绑扎钢筋并设置支撑垫块|位置与保护层按设计检查|source-backed|
|US-CON-CONCRETE-005|作业|组装并支撑模板|尺寸、刚度和接缝按方案检查|source-backed|
|US-CON-CONCRETE-006|准备|清除模板内杂物与积水|无影响浇筑的可见杂物积水|source-backed|
|US-CON-CONCRETE-007|检测|复核模板内尺寸及预埋件位置|未完成项在浇筑前处置|source-backed|
|US-CON-CONCRETE-008|交接|引导搅拌运输车对接布料位置|构件与供料批次确认|source-backed|
|US-CON-CONCRETE-009|作业|按构件顺序布放混凝土|布料顺序及位置符合方案|source-backed|
|US-CON-CONCRETE-010|作业|振捣新浇混凝土|按项目方法检查密实与离析|source-backed|
|US-CON-CONCRETE-011|检测|观察浇筑中模板位移|超出项目控制条件即报告|source-backed|
|US-CON-CONCRETE-012|异常|暂停异常构件浇筑并执行批准调整|恢复前取得项目技术处置|source-backed|
|US-CON-CONCRETE-013|作业|收平并完成混凝土表面|表面按构件要求检查|source-backed|
|US-CON-CONCRETE-014|作业|实施混凝土养护保护|方法及持续记录按项目要求|source-backed|
|US-CON-CONCRETE-015|返工|按批准方案修补混凝土缺陷|修补质量重新验收|source-backed|
|US-CON-CONCRETE-016|清洁维护|拆卸并清理获准拆除的模板|拆模许可及构件保护确认|source-backed|
|US-CON-CONCRETE-017|交付|移交构件质量与养护记录|未闭合缺陷单独标识|source-backed|

缺口：泵送、取样试件、预应力张拉及水下混凝土须进一步拆解；本任务没有假定统一强度和养护时间。

### US-CON-STEEL 结构钢件吊装与连接

钢结构专业承包现场架设；工厂钢件加工另属制造。

流程来源：C-STEEL, C-HOIST；职业来源：O47-2221.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-CON-STEEL-001|准备|核对钢构件编号及架设图|连接位置和构件身份明确|source-backed|
|US-CON-STEEL-002|准备|检查吊索具和吊点|缺陷索具退出待用集合|source-backed|
|US-CON-STEEL-003|交接|卸载并摆放待吊钢件|构件稳定且编号可见|source-backed|
|US-CON-STEEL-004|作业|将吊索连接至指定钢件吊点|起吊前连接复核|source-backed|
|US-CON-STEEL-005|作业|引导起吊钢件进入连接位置|按统一指挥信号定位|source-backed|
|US-CON-STEEL-006|作业|安装初始连接螺栓及临时支撑|达到项目脱钩条件|source-backed|
|US-CON-STEEL-007|检测|测量钢件垂直度与相对位置|偏差与项目允许范围比对|source-backed|
|US-CON-STEEL-008|返工|调整偏位钢件至批准位置|重新测量通过|source-backed|
|US-CON-STEEL-009|作业|完成钢结构永久连接|按连接设计检验；焊接细分另补|source-backed|
|US-CON-STEEL-010|异常|停止有疑义吊装并隔离载荷区域|原因排查与批准恢复记录|source-backed|
|US-CON-STEEL-011|清洁维护|回收卸载索具并检查损伤|状态标识清楚|source-backed|
|US-CON-STEEL-012|交付|移交已稳定结构及临时防护|剩余支撑和防护责任明确|source-backed|

缺口：金属压型板、开口腹杆钢梁、双连接等子类不能以本场景覆盖全部细则。

### US-CON-FRAME 住宅木框架与门窗洞口构建

现场木框架；高级洞口框架只是流程已读分支，不推为全部住宅标准。

流程来源：C-FRAME；职业来源：O47-2031.00。partial: dedicated-process-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-CON-FRAME-001|准备|按框架图核对木材及连接件|规格与构件位置相符|source-backed|
|US-CON-FRAME-002|准备|在木材标记切割线|尺寸方向明确|source-backed|
|US-CON-FRAME-003|作业|切割木材至构件尺寸|尺寸按图检查|source-backed|
|US-CON-FRAME-004|作业|拼装墙架立柱和上下枋|构件配置符合结构图|source-backed|
|US-CON-FRAME-005|作业|安装门窗洞口过梁与支承构件|承载细节按批准图纸|source-backed|
|US-CON-FRAME-006|交接|将墙架移交起立定位班组|墙架身份与安装区一致|source-backed|
|US-CON-FRAME-007|作业|立起墙架并设置临时支撑|稳定状态按安装方案确认|source-backed|
|US-CON-FRAME-008|检测|检查墙架铅直和洞口尺寸|偏差按项目要求核对|source-backed|
|US-CON-FRAME-009|异常|标记腐朽或损伤木构件|不直接隐蔽问题|source-backed|
|US-CON-FRAME-010|返工|替换获准拆除的缺陷木构件|支承和连接重新检查|source-backed|
|US-CON-FRAME-011|清洁维护|清理锯切木屑与停用工具|钉件木屑妥善收集|source-backed|
|US-CON-FRAME-012|交付|移交框架及隐蔽前检查记录|机电开孔和剩余问题明确|source-backed|

缺口：屋架吊装、楼板、剪力墙及现场制造装配房需扩展。

### US-CON-ELECTRIC 建筑配管、穿线、接线与检测

持适用资格的电气承包班组；数据中心运维不重复列此。

流程来源：C-ELEC, C-AIRSEAL；职业来源：O47-2111.00。partial: dedicated-process-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-CON-ELECTRIC-001|准备|核对回路图与设备安装位置|版本和回路编号明确|source-backed|
|US-CON-ELECTRIC-002|准备|对施工相关电路实施隔离标识|按适用电气程序确认施工状态|source-backed|
|US-CON-ELECTRIC-003|作业|安装电气导管与接线盒|位置和固定符合项目要求|source-backed|
|US-CON-ELECTRIC-004|作业|将导线穿入指定导管|线号与回路对应|source-backed|
|US-CON-ELECTRIC-005|作业|将导线连接至开关设备端子|端子与线路图匹配|source-backed|
|US-CON-ELECTRIC-006|作业|安装保护接地连接|按适用验收程序核查|source-backed|
|US-CON-ELECTRIC-007|检测|测试回路连续性与规定电气指标|测试条件和仪器可追溯|source-backed|
|US-CON-ELECTRIC-008|异常|定位故障回路并保留停用标识|未经授权不送电|source-backed|
|US-CON-ELECTRIC-009|返工|更换缺陷导线或接线元件|再次检测通过|source-backed|
|US-CON-ELECTRIC-010|交接|将穿透孔封堵要求移交相关班组|不同防火气密要求分清|source-backed|
|US-CON-ELECTRIC-011|清洁维护|回收线头并检查停用工具|裸露余线和工具缺陷处理|source-backed|
|US-CON-ELECTRIC-012|交付|移交回路编号和测试资料|试运行权限和遗留项明确|source-backed|

缺口：专用防火封堵、消防报警、光纤端接和高压开关试验尚未细化。

### US-CON-PLUMB 建筑给排水管道及洁具安装

给排水专业施工；工厂工艺管道和市政主管需另拆。

流程来源：C-AIRSEAL；职业来源：O47-2152.00。partial: dedicated-process-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-CON-PLUMB-001|准备|核对管材管径与阀件清单|规格和用途一致|source-backed|
|US-CON-PLUMB-002|准备|测量标记管道路径和穿孔点|与其他机电接口核对|source-backed|
|US-CON-PLUMB-003|准备|隔离待改造管段内介质|按现场介质程序确认状态|source-backed|
|US-CON-PLUMB-004|作业|切割并加工管端接口|长度和接口形式符合图纸|source-backed|
|US-CON-PLUMB-005|作业|固定管道支吊架|位置和承载按项目要求|source-backed|
|US-CON-PLUMB-006|作业|连接管段与阀件|接口工艺与材料相容|source-backed|
|US-CON-PLUMB-007|作业|安装洁具及末端连接|安装位置及固定检查|source-backed|
|US-CON-PLUMB-008|检测|对指定管段进行压力或渗漏测试|按所用系统的批准程序判定|source-backed|
|US-CON-PLUMB-009|异常|定位渗漏并隔离测试失败区|禁止未经复验隐蔽|source-backed|
|US-CON-PLUMB-010|返工|重做缺陷管道接口|复测结果达项目要求|source-backed|
|US-CON-PLUMB-011|交接|移交管道穿透孔封堵位置|气密与防火专业责任明确|source-backed|
|US-CON-PLUMB-012|清洁维护|清理施工残料与停用管工具|残料不留入管内|source-backed|
|US-CON-PLUMB-013|交付|提交管段测试和阀件标识|管段范围与测试对应|source-backed|

缺口：流程路径目前只读穿透点气密清单；系统冲洗/消毒、燃气、消防、焊接工艺和当地规范待补，不声称给排水全流程已双路径确认。

### US-CON-HVAC 住宅无风管热泵安装与调试

施工或维修承包商安装住宅mini-split；物业自雇日常维护依执行机构归属。

流程来源：C-HEATPUMP；职业来源：O49-9021.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-CON-HVAC-001|准备|核对设计负荷与室内外机组合|对应区间及厂家组合资料确认|source-backed|
|US-CON-HVAC-002|准备|勘查设备位置与管线路径|维护空间与环境限制记录|source-backed|
|US-CON-HVAC-003|作业|固定室内机与室外机支承|固定按厂家说明检查|source-backed|
|US-CON-HVAC-004|作业|切割去毛刺并扩口铜管|管端无可见损伤且尺寸核查|source-backed|
|US-CON-HVAC-005|作业|连接冷媒管道并按要求紧固|紧固结果按厂家要求记录|source-backed|
|US-CON-HVAC-006|作业|安装冷凝水排放管路|排水连接和走向检查|source-backed|
|US-CON-HVAC-007|检测|按厂家程序对回路压力检漏|测试介质与条件有记录|source-backed|
|US-CON-HVAC-008|返工|重做确认泄漏的管路连接|再次检漏通过|source-backed|
|US-CON-HVAC-009|检测|实施回路抽真空与保持检验|按设备说明判定而不套统一阈值|source-backed|
|US-CON-HVAC-010|作业|由具适用资格人员调整冷媒充注|方法与重量等参数按具体设备核对|source-backed|
|US-CON-HVAC-011|作业|连接控制线路并设定控制器|按厂家模式核查|source-backed|
|US-CON-HVAC-012|检测|测试各工作模式及排水运行|异常模式单独记录|source-backed|
|US-CON-HVAC-013|异常|排查运行异常并建立维修工单|不以主观舒适感替代检测|source-backed|
|US-CON-HVAC-014|清洁维护|清洁滤网并说明维护方法|采用适用设备说明|source-backed|
|US-CON-HVAC-015|交付|移交调试记录及使用维护说明|设备身份和遗留问题明确|source-backed|

缺口：中央风管、冷水机组、锅炉、商用冷冻与大型通风仍待独立场景。

### US-CON-ROOF 住宅重铺屋面及穿透点泛水

现场坡屋面及穿透点，雨水控制流程；材料生产属制造。

流程来源：C-ROOF；职业来源：O47-2181.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-CON-ROOF-001|准备|检查既有屋面与穿透点损伤|底层与泛水缺陷区分|source-backed|
|US-CON-ROOF-002|准备|建立屋面安全进入与工作位置|按现场安全条件确认|source-backed|
|US-CON-ROOF-003|作业|清除施工区积水碎屑及旧损材料|缺陷基层被暴露并记录|source-backed|
|US-CON-ROOF-004|作业|裁切穿透点防水膜|覆盖和搭接按系统说明|source-backed|
|US-CON-ROOF-005|作业|将防水膜整合到屋面排水层|搭接方向将水导向外侧|source-backed|
|US-CON-ROOF-006|作业|安装管道泛水金属套件|与上下层铺材关系核对|source-backed|
|US-CON-ROOF-007|作业|围绕穿透点铺设屋面覆盖层|固定与搭接按厂家要求|source-backed|
|US-CON-ROOF-008|检测|检查接缝和泛水连续性|可见开口及错误搭接记录|source-backed|
|US-CON-ROOF-009|异常|隔离遇潮湿腐朽的基层部位|不能直接覆盖隐蔽|source-backed|
|US-CON-ROOF-010|返工|替换或重装缺陷泛水件|重新检查排水关系|source-backed|
|US-CON-ROOF-011|清洁维护|回收钉件和屋面残料|排水路径无施工遗留堵塞|source-backed|
|US-CON-ROOF-012|交付|移交屋面处理位置与材料资料|未覆盖区域明确|source-backed|

缺口：低坡屋面热焊膜、沥青热作业、瓦种差异及现场渗漏试验待补。

### US-CON-DRYWALL 室内隔墙骨架与石膏板封板

现场隔墙封板；接缝批嵌不是本职业清单已读的完整范围。

流程来源：C-AIRSEAL；职业来源：O47-2081.00。partial: dedicated-process-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-CON-DRYWALL-001|准备|核对隔墙位置与机电开孔图|可封闭条件与接口明确|source-backed|
|US-CON-DRYWALL-002|作业|测量并标记隔墙定位线|与图纸位置一致|source-backed|
|US-CON-DRYWALL-003|作业|切割并固定隔墙龙骨|垂直位置按项目检查|source-backed|
|US-CON-DRYWALL-004|作业|裁切石膏板及设备开口|边缘与开口尺寸检查|source-backed|
|US-CON-DRYWALL-005|作业|抬升并固定石膏板|板位与紧固符合项目要求|source-backed|
|US-CON-DRYWALL-006|检测|检查墙板接缝和粗糙边缘|缝隙和损伤清楚标识|source-backed|
|US-CON-DRYWALL-007|返工|修整或更换损伤板件|再次检查接缝和开口|source-backed|
|US-CON-DRYWALL-008|交接|将接缝区域移交批嵌班组|未完开孔和机电接口明确|source-backed|
|US-CON-DRYWALL-009|作业|按密封方案封闭板顶空气缝隙|不能以纤维保温代替气密材料|source-backed|
|US-CON-DRYWALL-010|异常|停止覆盖尚未处理的漏水损伤区|湿损原因移交处理|source-backed|
|US-CON-DRYWALL-011|清洁维护|清理板材粉尘和边角废料|按现场粉尘控制方案收集|source-backed|
|US-CON-DRYWALL-012|交付|移交封板与气密处理记录|隐蔽边界和遗留项明确|source-backed|

缺口：防火隔墙认证系统、吸音吊顶、批嵌和喷涂尚需专用流程；目前气密清单不是整套干墙SOP。

### US-CON-PAINT 建筑表面准备与涂装

建筑现场涂装，不含工厂产品涂层。

流程来源：；职业来源：O47-2141.00。partial: dedicated-process-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-CON-PAINT-001|准备|核对涂装工作单与表面范围|颜色和基材要求明确|source-backed|
|US-CON-PAINT-002|准备|遮蔽非涂装表面和已装部件|保护边界按工程范围检查|source-backed|
|US-CON-PAINT-003|作业|清除不合格旧涂层|适用危害程序先行；不默认可普通打磨|source-backed|
|US-CON-PAINT-004|作业|填补基材裂缝与孔洞|修补位置和材料相容|source-backed|
|US-CON-PAINT-005|作业|打磨并清理待涂基层|表面状态按涂料说明核对|source-backed|
|US-CON-PAINT-006|作业|调配涂装材料至工作要求|批次和配比记录|source-backed|
|US-CON-PAINT-007|作业|涂布底漆或封闭层|覆盖与施工条件按产品说明|source-backed|
|US-CON-PAINT-008|作业|涂布规定面漆层|颜色和表面状态可检验|source-backed|
|US-CON-PAINT-009|检测|检查完成涂层覆盖与可见缺陷|按样板和项目要求检查|source-backed|
|US-CON-PAINT-010|异常|标记需专门处置的旧涂层或潮湿基材|原因与处置责任明确|source-backed|
|US-CON-PAINT-011|返工|修复局部涂层缺陷|返修后按同标准复检|source-backed|
|US-CON-PAINT-012|清洁维护|清洗停用涂装工具并收集废料|按所用材料和当地处置要求处理|source-backed|
|US-CON-PAINT-013|交付|拆除遮蔽并移交完工表面|剩余缺陷与养护条件明确|source-backed|

缺口：当前只有职业职责路径，缺涂料系统施工说明及铅漆/石棉等适用危害流程；全部验收为建议边界。

行业缺口：尚未逐工艺覆盖道路新铺沥青、隧道/桩基、水下工程、输电线路、油气管道、电梯、消防喷淋、砌筑石材、玻璃幕墙、保温和拆除危害处置。；各州执照、项目图纸、现行建筑规范和厂商安装说明尚未逐项目读取；本清单不提供施工操作指令或全国统一参数。

## 农林渔猎业

BEA大类含NAICS11中的作物、畜牧与水产养殖、林业采伐、捕捞狩猎及农业林业辅助。农场自用储粮/包装与独立商业仓储、食品加工分界按机构活动；承包收获/林业辅助仍属11，不能在业主与承包商重复算人。政府自营林地/监管/公共孵化场实体任务归政府；本页为私营生产执行主体。

### US-AGR-PLANT 大田玉米耕整、播种与田间管理

美国玉米农场或农业机械作业承包商；明尼苏达流程须经当地土壤气候调整。

流程来源：A-CORN；职业来源：O45-2091.00, O45-2092.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-AGR-PLANT-001|准备|核对地块边界与本次作业要求|品种及地块身份明确|source-backed|
|US-AGR-PLANT-002|准备|连接拖拉机与指定农具|适用连接和防护状态检查|source-backed|
|US-AGR-PLANT-003|准备|装入本次地块所需种子|种子批次与品种记录|source-backed|
|US-AGR-PLANT-004|作业|按地块方案进行必要耕整|表土状态符合当地方案|source-backed|
|US-AGR-PLANT-005|作业|调节播种机排种与入土设置|不将统一播深套用于全部土壤|source-backed|
|US-AGR-PLANT-006|作业|操控播种机播入玉米种子|排种持续状态可观察|source-backed|
|US-AGR-PLANT-007|检测|抽查种子落位与覆土接触|与地块要求逐点核对|source-backed|
|US-AGR-PLANT-008|返工|重播获准处理的缺播区|补播地段与日期记录|source-backed|
|US-AGR-PLANT-009|作业|布置并运行灌溉管路|覆盖及供水异常记录|source-backed|
|US-AGR-PLANT-010|检测|巡查作物长势与虫草异常|位置与症状可回查|source-backed|
|US-AGR-PLANT-011|异常|停机处理播种或农具异常|恢复作业前状态核对|source-backed|
|US-AGR-PLANT-012|清洁维护|清理农具并检查易损部件|清洁和缺陷处理完成|source-backed|
|US-AGR-PLANT-013|交接|交接地块作业记录与剩余物料|地块批次不混同|source-backed|
|US-AGR-PLANT-014|交付|向农场交付完成地块与异常图|未播区与后续行动清楚|source-backed|

缺口：施肥施药有职业动作但尚缺具体应用流程与资格边界，未将通用化学品处理拆成已验证任务；除草机械和无人机另补。

### US-AGR-GRAIN 小麦大麦机械收获与农场储粮

收获和农场储粮；独立商业谷仓与批发按其他行业执行主体归属。

流程来源：A-GRAIN；职业来源：O45-2091.00, O45-2041.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-AGR-GRAIN-001|准备|清除粮仓及输送设备前批残粮|前批残粮和可见污染清除|source-backed|
|US-AGR-GRAIN-002|准备|检查仓体与收获输送设备缺陷|影响入仓问题先处理|source-backed|
|US-AGR-GRAIN-003|作业|调节联合收割机脱粒与清选设置|破碎和杂质按品种要求监测|source-backed|
|US-AGR-GRAIN-004|作业|操控收获设备收割脱粒|作业范围与收获批次记录|source-backed|
|US-AGR-GRAIN-005|交接|将收获粮装入接运容器|身份和去向清楚|source-backed|
|US-AGR-GRAIN-006|检测|测量入仓粮水分并检查杂质|采样代表范围记录|source-backed|
|US-AGR-GRAIN-007|作业|清除粮粒中的细杂|细杂处置与合格粮分开|source-backed|
|US-AGR-GRAIN-008|作业|将粮粒输送并分布至储粮仓|批次与仓位对应|source-backed|
|US-AGR-GRAIN-009|作业|按储粮方案实施通风或干燥|具体气候与品种条件记录|source-backed|
|US-AGR-GRAIN-010|检测|检查储粮温度虫害与霉变迹象|多位置结果可追溯|source-backed|
|US-AGR-GRAIN-011|异常|隔离可疑粮批并提出处置要求|不与正常粮混同|source-backed|
|US-AGR-GRAIN-012|返工|对获准返工粮批重新清选或调质|复检达收货方要求|source-backed|
|US-AGR-GRAIN-013|清洁维护|清理停用粮食输送装置|按适用机械和粮仓安全程序|source-backed|
|US-AGR-GRAIN-014|交付|按批次出仓并交付检验记录|重量和质量资料关联；运输工时另属执行者|source-backed|

缺口：联合收割机具体割台/脱粒/维修SOP未读；玉米、稻谷和草籽参数不能由小麦大麦外推。

### US-AGR-APPLE 苹果选择性采摘与果箱转运

鲜食苹果果园采收；长季树体管理待另场景。

流程来源：A-APPLE, A-GAP2024, A-GAP；职业来源：O45-2092.00, O45-2041.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-AGR-APPLE-001|准备|检查采果容器清洁与破损|破损与不洁容器被隔离|source-backed|
|US-AGR-APPLE-002|准备|调整采摘携带容器位置|容器固定且不会直接挤压已采果|source-backed|
|US-AGR-APPLE-003|准备|摆放采摘梯至所需树冠位置|按园区安全方法检查|source-backed|
|US-AGR-APPLE-004|检测|确认采收对象的品种与成熟要求|与指定采收批次一致|source-backed|
|US-AGR-APPLE-005|作业|将符合要求苹果从树上分离|按鲜食质量要求检查果皮果柄|source-backed|
|US-AGR-APPLE-006|作业|轻放苹果进入采摘容器|避免不必要碰撞挤压|source-backed|
|US-AGR-APPLE-007|异常|将落地或腐败果与正常采果分开|不混入正常采摘果箱|source-backed|
|US-AGR-APPLE-008|交接|将采摘桶内果实转入果箱|转入时保护原箱果实|source-backed|
|US-AGR-APPLE-009|作业|移除果箱可见枝叶杂物|无可见非果实杂物|source-backed|
|US-AGR-APPLE-010|检测|检查果箱装满程度与果实损伤|堆放条件和损伤问题明确|source-backed|
|US-AGR-APPLE-011|返工|重新分选检查发现的不合格果箱|处理后重新检查|source-backed|
|US-AGR-APPLE-012|作业|将果箱搬运到指定装卸点|箱位与批次相符|source-backed|
|US-AGR-APPLE-013|清洁维护|清理采摘工具并撤下损坏容器|清洁与损伤状态可见|source-backed|
|US-AGR-APPLE-014|交付|交付采收批次与果箱数量|采收地段和去向可追溯|source-backed|

缺口：梯具设置及现场搬运不能替代专业培训；低矮果墙/平台作业需独立条件。

### US-AGR-VEG 鲜菜采收、农场清选与冷却包装

以生鲜蔬菜轻柔采收和农场后处理为边界；切割熟制食品加工移至制造。

流程来源：A-PRODUCE, A-GAP2024, A-GAP；职业来源：O45-2092.00, O45-2041.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-AGR-VEG-001|准备|检查采收器具与周转容器|适合本蔬菜品种且批次明确|source-backed|
|US-AGR-VEG-002|检测|检查作物是否达到本次采收要求|成熟与缺陷条件按品种规定|source-backed|
|US-AGR-VEG-003|作业|摘取或切取指定蔬菜|不增加超标机械损伤|source-backed|
|US-AGR-VEG-004|作业|将蔬菜排列放入周转箱|方向与容量适应品种|source-backed|
|US-AGR-VEG-005|异常|剔除损伤腐败或受污染蔬菜|不混入合格品|source-backed|
|US-AGR-VEG-006|交接|将采后周转箱转入遮阴接收区|采收至接收信息关联|source-backed|
|US-AGR-VEG-007|作业|按品种适用方法清理采后蔬菜|不默认所有蔬菜都适合水洗|source-backed|
|US-AGR-VEG-008|作业|将蔬菜送入相应冷却流程|方法与品种匹配|source-backed|
|US-AGR-VEG-009|检测|核查冷却批次状态与损伤|按本地产品要求确认|source-backed|
|US-AGR-VEG-010|作业|按等级装箱并标识批次|等级和身份一致|source-backed|
|US-AGR-VEG-011|返工|重分选或重包装可处理批次|复检通过才重新放行|source-backed|
|US-AGR-VEG-012|清洁维护|清理分选台和停用周转设施|防止前后批次污染|source-backed|
|US-AGR-VEG-013|交付|交付包装批次与储运要求|品种批次和接收方要求一致|source-backed|

缺口：洗水卫生监测、不同品种冷却和特定处理参数尚未逐条读；不能据此判断全部洗菜场景自动化。

### US-AGR-NURSERY 番茄等蔬菜育苗与移栽交付

商业蔬菜育苗，家庭园艺资料未用于产能推断；苗木零售分销另归零售。

流程来源：A-NURSERY；职业来源：O45-2092.00。partial: dedicated-process-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-AGR-NURSERY-001|准备|清洁消毒育苗台和工具|按本场卫生方法记录|source-backed|
|US-AGR-NURSERY-002|准备|检查并分离不适用旧苗盘|损伤和污染风险明确|source-backed|
|US-AGR-NURSERY-003|作业|装填育苗容器并播入种子|品种批次与苗盘对应|source-backed|
|US-AGR-NURSERY-004|作业|按苗情调节灌溉与温室条件|不以统一参数套全部品种|source-backed|
|US-AGR-NURSERY-005|检测|检查幼苗叶片与生长异常|症状与批次可追溯|source-backed|
|US-AGR-NURSERY-006|异常|隔离疑似病害幼苗|避免未经判断混入健康苗|source-backed|
|US-AGR-NURSERY-007|作业|将达到条件的幼苗移入目标容器|根部与标签得到保护|source-backed|
|US-AGR-NURSERY-008|交接|将苗盘移交炼苗或出圃区|批次位置明确|source-backed|
|US-AGR-NURSERY-009|返工|重新标记身份不清的可核实苗盘|不可核实者不推定品种|source-backed|
|US-AGR-NURSERY-010|清洁维护|清理育苗废料并维护灌溉设备|异常设备及时处置|source-backed|
|US-AGR-NURSERY-011|交付|按订单交付合格苗盘|品种批次数量和状态一致|source-backed|

缺口：专用播种/基质/炼苗SOP未读；卫生路径支持局部，未证明完整育苗过程在任一企业采用。

### US-AGR-MILK 奶牛进厅、乳房准备与挤奶交接

奶牛场挤奶设施。后续乳品巴氏杀菌/包装属制造；兽医专业处置另归专业服务。

流程来源：A-MILK, A-MILK2025；职业来源：O45-2093.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-AGR-MILK-001|准备|核对待挤奶牛群与异常牛标记|身份与需特殊处理个体明确|source-backed|
|US-AGR-MILK-002|作业|引导奶牛从栏舍进入挤奶区|牛只按场内通道有序到位|source-backed|
|US-AGR-MILK-003|准备|清除乳头表面可见污物|符合本场预处理要求|source-backed|
|US-AGR-MILK-004|检测|挤取前奶并观察异常|异常奶与牛只身份关联|source-backed|
|US-AGR-MILK-005|异常|按场内规程隔离异常奶流|不混入正常储奶批|source-backed|
|US-AGR-MILK-006|作业|施用适用挤奶前乳头处理剂|覆盖及接触按产品标签和本场SOP|source-backed|
|US-AGR-MILK-007|作业|擦净并干燥预处理乳头|按同一奶牛场方法检查|source-backed|
|US-AGR-MILK-008|作业|连接挤奶杯组|连接状态可观察|source-backed|
|US-AGR-MILK-009|检测|观察挤奶过程与杯组状态|异常奶流或连接及时报告|source-backed|
|US-AGR-MILK-010|作业|在挤奶完成后卸除杯组|按本场结束条件确认|source-backed|
|US-AGR-MILK-011|作业|施用挤奶后乳头处理剂|处理覆盖按本场规程|source-backed|
|US-AGR-MILK-012|交接|将完成奶牛引回指定群组|个体去向清楚|source-backed|
|US-AGR-MILK-013|清洁维护|按设施SOP清洗停用挤奶器具|具体清洗程序与验证待场内补充|proposed|
|US-AGR-MILK-014|交付|移交本班奶牛异常与挤奶记录|异常牛及奶流处置可追踪|source-backed|

缺口：职业资料不直接列出全部杯组动作，挤奶步骤主要来自大学推广SOP；储奶制冷、清洗验证、奶罐车取样交接仍缺独立流程。

### US-AGR-TMR 反刍牲畜配料投喂与圈舍维护

具体混料来源是奶牛TMR；肉牛采用条件待验证，不把奶牛配方迁移至肉牛。

流程来源：A-TMR, A-MANURE；职业来源：O45-2093.00, O45-2091.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-AGR-TMR-001|准备|核对饲料库存与牲畜分群|批次与目标群组对应|source-backed|
|US-AGR-TMR-002|检测|采集饲料样本送检|批次和采样范围明确|source-backed|
|US-AGR-TMR-003|检测|检查称量与混料设备状态|异常设备先处理|source-backed|
|US-AGR-TMR-004|作业|按当前配方称取饲料组分|称量值与实际配方可核对|source-backed|
|US-AGR-TMR-005|作业|混合称量完成的饲料|按设备和本场要求判断混合状态|source-backed|
|US-AGR-TMR-006|作业|将配合饲料送入指定料槽|群组与投放记录一致|source-backed|
|US-AGR-TMR-007|检测|观察采食余料与供水状态|异常采食供水条件记录|source-backed|
|US-AGR-TMR-008|异常|隔离变质饲料并报告配方偏差|不直接掺回正常配料|source-backed|
|US-AGR-TMR-009|返工|按批准更正方式处理不合格配料|不擅自以加料掩盖偏差|source-backed|
|US-AGR-TMR-010|作业|移送粪污至规定收集设施|按场地粪污计划记录去向|source-backed|
|US-AGR-TMR-011|作业|按堆肥方案翻动粪污堆体|作业区和批次明确|source-backed|
|US-AGR-TMR-012|清洁维护|清理停用饲喂设备与料槽|维护缺陷记录|source-backed|
|US-AGR-TMR-013|交接|交接投喂量余料及动物异常|实际喂养群组匹配|source-backed|
|US-AGR-TMR-014|交付|移交饲喂及粪污去向资料|外运或委托处理不重复计人|source-backed|

缺口：不同牛群日粮、牧场放牧和兽医护理需另场景；地下储粪池作业与危害处置未纳入常规清洁。

### US-AGR-EGG 蛋鸡小群饲养与农场蛋品收集

现有流程证据限定小规模非笼养；不能代表大型集约系统。

流程来源：A-FLOCK, A-EGG；职业来源：O45-2093.00, O45-2041.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-AGR-EGG-001|准备|检查饮水与供料器具|可用性和污染异常清楚|source-backed|
|US-AGR-EGG-002|作业|向鸡群提供指定饲料与饮水|按饲养阶段计划核查|source-backed|
|US-AGR-EGG-003|检测|观察鸡群异常行为与健康迹象|异常及时移交负责人|source-backed|
|US-AGR-EGG-004|异常|隔离需进一步评估的异常禽只|具体健康处理由适用人员决定|source-backed|
|US-AGR-EGG-005|准备|清理收蛋容器与蛋巢环境|污染容器不用于合格蛋|source-backed|
|US-AGR-EGG-006|作业|将鸡蛋轻放入收集容器|明显破损与正常蛋分开|source-backed|
|US-AGR-EGG-007|检测|检查蛋壳破损与污染|按本场销售/处理规则分类|source-backed|
|US-AGR-EGG-008|作业|按适用程序清洗可处理鸡蛋|清洗参数按现行适用规则和本场SOP|source-backed|
|US-AGR-EGG-009|交接|将处理蛋移入指定储存环节|身份与处理状态清楚|source-backed|
|US-AGR-EGG-010|返工|重分选误混的可追溯蛋批|不能把不合格壳蛋包装成正常蛋|source-backed|
|US-AGR-EGG-011|清洁维护|清洗饮水和收蛋器具|污水与养殖区域按计划分开|source-backed|
|US-AGR-EGG-012|交付|交付蛋批及生产处置记录|收集批次和去向相符|source-backed|

缺口：冷藏、照蛋分级、包装洗蛋全线、孵化和肉鸡出栏专用SOP待补；清洗段不是全部现行商用蛋规则。

### US-AGR-SWINE 生猪育肥喂养、分群与出栏交接

这里只盘点育肥段，繁殖妊娠分娩在缺口中，不以育肥代替全部养猪。

流程来源：A-SWINE；职业来源：O45-2093.00。partial: dedicated-process-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-AGR-SWINE-001|准备|核对入群猪只身份与栏舍状态|身份和异常状态记录|source-backed|
|US-AGR-SWINE-002|作业|按体重和状况将猪只分群|个体与群组可追踪|source-backed|
|US-AGR-SWINE-003|作业|投送符合饲养阶段的饲料|饲料批次和群组匹配|source-backed|
|US-AGR-SWINE-004|检测|检查猪群供水与采食情况|断水堵料问题可识别|source-backed|
|US-AGR-SWINE-005|检测|观察猪只损伤疾病与生长状况|异常个体与栏位记录|source-backed|
|US-AGR-SWINE-006|异常|隔离异常猪并安排专业评估|兽医等专业服务另归执行方|source-backed|
|US-AGR-SWINE-007|作业|称量待分群或出栏猪只|身份与称量匹配|source-backed|
|US-AGR-SWINE-008|交接|将符合条件猪只引至装运交接位|身份数量与交接单核对|source-backed|
|US-AGR-SWINE-009|作业|将圈舍粪污送至收集设施|按场内粪污去向记录|source-backed|
|US-AGR-SWINE-010|返工|纠正可核实的错群与标签错误|不可核实身份保留缺口|source-backed|
|US-AGR-SWINE-011|清洁维护|清洗空栏及停用饲喂器具|按场内生物安全要求确认|source-backed|
|US-AGR-SWINE-012|交付|移交猪群生长及处置记录|移交兽药等追踪信息按适用要求|source-backed|

缺口：已有资料为行业分支和饲喂概述，不是商业猪场全SOP；专用分娩、仔猪护理、动物装载方案待补。

### US-AGR-FOREST 商业林木采伐、打枝造材与集材

商业采伐与承包林业作业；公共机构巡护及公园工作不混入。

流程来源：A-LOG, A-BUCK；职业来源：O45-4021.00, O45-4022.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-AGR-FOREST-001|准备|核对采伐树木标记与作业地形|树种对象及边界确认|source-backed|
|US-AGR-FOREST-002|准备|评估树木倾斜腐朽和上方危险|异常树另行标识与处理|source-backed|
|US-AGR-FOREST-003|准备|清理指定作业区和撤离路径|按专业作业方案检查|source-backed|
|US-AGR-FOREST-004|检测|检查链锯或采伐机械状态|故障设备不投入正常作业|source-backed|
|US-AGR-FOREST-005|作业|按批准方案伐倒指定树木|目标树和保留树按方案区分|source-backed|
|US-AGR-FOREST-006|检测|检查倒木与周边悬挂物状态|不将倒木自动视为稳定|source-backed|
|US-AGR-FOREST-007|作业|去除倒木树枝|按规格留下所需材段|source-backed|
|US-AGR-FOREST-008|作业|按材种要求将树干截为原木|长度及材质按订单检查|source-backed|
|US-AGR-FOREST-009|检测|测量并分级原木|对象身份与等级对应|source-backed|
|US-AGR-FOREST-010|返工|重截获准更改规格的原木|复测且更新等级|source-backed|
|US-AGR-FOREST-011|异常|隔离不稳定倒木或设备故障区|指定专业人员处理|source-backed|
|US-AGR-FOREST-012|作业|将原木集运至装载场|集运对象和地点确认|source-backed|
|US-AGR-FOREST-013|交接|将原木装载并交给运输方|装载固定按适用运输要求另核|source-backed|
|US-AGR-FOREST-014|清洁维护|维护停用链锯和采伐机械|清洁润滑磨损按设备要求|source-backed|
|US-AGR-FOREST-015|交付|交付材积等级和作业地段记录|计量方法和范围可追溯|source-backed|

缺口：机械伐木与人工链锯已区分替代执行方式，但索道、陡坡、风倒木专用工法需另拆；不提供锯切或解悬木步骤。

### US-AGR-REFOREST 商用林地树苗接收、栽植与抚育

商业造林或林业承包；政府直接雇员执行归政府。

流程来源：A-TREE；职业来源：O45-4011.00。partial: dedicated-process-gap

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-AGR-REFOREST-001|准备|核对树苗来源批次与植区要求|树种和来源按植区要求确认|source-backed|
|US-AGR-REFOREST-002|检测|分选不适合栽植的树苗|质量分类按本地标准|source-backed|
|US-AGR-REFOREST-003|准备|保护待植树苗根部免受干燥冻结|按苗型和现场条件记录|source-backed|
|US-AGR-REFOREST-004|交接|向栽植人员分配当班苗批|数量和植区明确|source-backed|
|US-AGR-REFOREST-005|作业|整理栽植点植被与地表|处理范围符合造林方案|source-backed|
|US-AGR-REFOREST-006|作业|在指定点位开穴并栽入树苗|根系与栽深按当地方案检查|source-backed|
|US-AGR-REFOREST-007|检测|抽查已栽树苗位置和状态|不合格点位可重新找到|source-backed|
|US-AGR-REFOREST-008|返工|重植确认栽植不合格的点位|再次检查|source-backed|
|US-AGR-REFOREST-009|异常|标记病害或不宜继续栽植区域|原因移交专业负责人|source-backed|
|US-AGR-REFOREST-010|作业|按抚育计划疏除竞争植被|目标与保留植株区分|source-backed|
|US-AGR-REFOREST-011|清洁维护|清理栽植工具与周转包装|工具状态和废料处置确认|source-backed|
|US-AGR-REFOREST-012|交付|交付植区位置与树苗批次记录|未种和补种点明确|source-backed|

缺口：流程路径只读树苗现场储护，栽植参数/存活调查与抚育质量规范待补。

### US-AGR-FISHPOT 海洋笼壶捕捞与渔获交接

具体为笼壶渔法；区域捕捞许可与渔获法规须按海域另核。

流程来源：A-POTS；职业来源：O45-3031.00, O45-2041.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-AGR-FISHPOT-001|准备|检查笼具绳索浮标与船上设备|故障和不适用渔具分离|source-backed|
|US-AGR-FISHPOT-002|准备|装载本次航次渔具与物资|航次清单匹配|source-backed|
|US-AGR-FISHPOT-003|作业|将饵料装入笼壶|适用渔法配置核对|source-backed|
|US-AGR-FISHPOT-004|作业|部署笼壶并记录位置|按适用海域方案核对|source-backed|
|US-AGR-FISHPOT-005|作业|回收笼壶并取出渔获|渔具和渔获状态记录|source-backed|
|US-AGR-FISHPOT-006|检测|识别渔获并测量需核查个体|依据当地可保留要求判断|source-backed|
|US-AGR-FISHPOT-007|异常|对不可保留或受保护物种执行适用处置|遵循指定培训规程；不提供解救操作|source-backed|
|US-AGR-FISHPOT-008|作业|将保留渔获放入适用保管容器|鱼种和批次清楚|source-backed|
|US-AGR-FISHPOT-009|返工|修补可修复的破损笼具|复查后再用|source-backed|
|US-AGR-FISHPOT-010|交接|卸载渔获并交给接收方|品种数量和接收记录关联|source-backed|
|US-AGR-FISHPOT-011|清洁维护|清洗甲板与停用渔具|污物和损坏部件处理|source-backed|
|US-AGR-FISHPOT-012|交付|移交航次渔获与异常记录|渔获来源可追溯|source-backed|

缺口：活蟹龙虾保管条件、绞机细分、区域渔获放流和港口验收流程待补；不能用本场景覆盖拖网围网。

### US-AGR-LONGLINE 远洋延绳钓设置、回收与分选

远洋延绳钓特定渔法；不是全部近岸或底层延绳钓。

流程来源：A-LONGLINE；职业来源：O45-3031.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-AGR-LONGLINE-001|准备|检查主线支线钩具与定位附件|适用钩型配置另按渔区核对|source-backed|
|US-AGR-LONGLINE-002|作业|给指定钓钩挂饵|饵料钩具按作业单匹配|source-backed|
|US-AGR-LONGLINE-003|作业|连接支线与位置标记附件|连接和标记状态检查|source-backed|
|US-AGR-LONGLINE-004|作业|按航次方案投放延绳钓具|位置及投放记录完整|source-backed|
|US-AGR-LONGLINE-005|检测|监视船况天气与渔具位置|异常状况及时上报|source-backed|
|US-AGR-LONGLINE-006|异常|按适用流程停止或调整异常航次作业|船长等责任主体决定并记录|source-backed|
|US-AGR-LONGLINE-007|作业|回收钓具并从钩具卸下渔获|渔获与人员状态受监测|source-backed|
|US-AGR-LONGLINE-008|检测|识别渔获的可保留状态|物种及尺寸条件按当地规则|source-backed|
|US-AGR-LONGLINE-009|异常|将受保护或不可保留渔获移交规定处置|具体释放规程需另读取|source-backed|
|US-AGR-LONGLINE-010|返工|更换破损支线或钩具|状态核查|source-backed|
|US-AGR-LONGLINE-011|清洁维护|清洗甲板设备并维护回收装置|故障记录移交|source-backed|
|US-AGR-LONGLINE-012|交付|交付渔获及航次来源记录|处理保管参数另核|source-backed|

缺口：渔获降温加工、海鸟措施、缠绕事故处理和大型绞机设备流程尚缺。

### US-AGR-AQUA 池塘鮰鱼育成、投饲与收获

美国淡水鮰鱼商业池塘；不外推海水网箱或循环水养殖。

流程来源：A-CATFISH, A-FISHFEED, A-FISHWATER；职业来源：O45-2093.00, O45-2041.00。specified-workflow-and-occupation-sections-read; local-SOP-unverified

|编号|阶段|动作与对象|验收|状态|
|---|---|---|---|---|
|US-AGR-AQUA-001|准备|核对投放鱼种与目标池塘记录|鱼种来源及池塘身份明确|source-backed|
|US-AGR-AQUA-002|交接|将鱼种转入目标育成池塘|数量估计方法及不确定性记录|source-backed|
|US-AGR-AQUA-003|检测|检查池塘水质与鱼群摄食状态|采样位置和异常明确|source-backed|
|US-AGR-AQUA-004|作业|按池塘状态投送适用饲料|不将固定日粮套于所有池塘|source-backed|
|US-AGR-AQUA-005|作业|按场站计划操控增氧或水循环|运行状态和异常可追溯|source-backed|
|US-AGR-AQUA-006|异常|对缺氧或异常摄食发出响应工单|具体处置由场站SOP确定|source-backed|
|US-AGR-AQUA-007|检测|采集收获前鱼样供质量确认|样本与池塘批次绑定|source-backed|
|US-AGR-AQUA-008|作业|使用适用围网收集目标鱼群|目标规格和池塘库存变化记录|source-backed|
|US-AGR-AQUA-009|检测|按接收要求分选收获鱼|不同规格分清|source-backed|
|US-AGR-AQUA-010|返工|对获准重分选鱼群再次分级|重新确认规格|source-backed|
|US-AGR-AQUA-011|交接|将合格鱼交给收购运输方|数量和质量接收记录关联|source-backed|
|US-AGR-AQUA-012|清洁维护|检查并维护停用投饲增氧及网具|故障和耗损件明确|source-backed|
|US-AGR-AQUA-013|交付|移交投放投饲与收获记录|库存不确定性不伪装为准确计数|source-backed|

缺口：O*NET动物养殖职责为通用路径，池塘动作主要来自美国大学推广；孵化、疫苗、病原处置、鱼运保活与循环水系统未完整覆盖。

行业缺口：种植暂以玉米作业、小麦大麦储藏、苹果和鲜菜、番茄育苗为具体切片，不代表全品种：水稻、棉花、烟草、糖料、坚果、葡萄、花卉及草料仍待扩展。；畜牧缺繁育接产、肉禽捕捉装笼、羊毛、蜂业等专用流程；林业缺索道集材、苗圃种子处理；捕捞缺围网/拖网/潜捕/贝类及狩猎捕兽具体流程。；不使用职业职责推导工时；没有自动化正反检索或现金流参数。本轮尚未冻结清单。

## 已读来源

- O51-3022.00 [Meat, Poultry, and Fish Cutters and Trimmers](https://www.onetonline.org/link/details/51-3022.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-3092.00 [Food Batchmakers](https://www.onetonline.org/link/details/51-3092.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-6031.00 [Sewing Machine Operators](https://www.onetonline.org/link/details/51-6031.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-6063.00 [Textile Knitting and Weaving Machine Setters, Operators, and Tenders](https://www.onetonline.org/link/details/51-6063.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-7011.00 [Cabinetmakers and Bench Carpenters](https://www.onetonline.org/link/details/51-7011.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-9196.00 [Paper Goods Machine Setters, Operators, and Tenders](https://www.onetonline.org/link/details/51-9196.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-5112.00 [Printing Press Operators](https://www.onetonline.org/link/details/51-5112.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-8093.00 [Petroleum Pump System Operators, Refinery Operators, and Gaugers](https://www.onetonline.org/link/details/51-8093.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-8091.00 [Chemical Plant and System Operators](https://www.onetonline.org/link/details/51-8091.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-9011.00 [Chemical Equipment Operators and Tenders](https://www.onetonline.org/link/details/51-9011.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-4072.00 [Molding, Coremaking, and Casting Machine Setters, Operators, and Tenders, Metal and Plastic](https://www.onetonline.org/link/details/51-4072.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-4051.00 [Metal-Refining Furnace Operators and Tenders](https://www.onetonline.org/link/details/51-4051.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-4121.00 [Welders, Cutters, Solderers, and Brazers](https://www.onetonline.org/link/details/51-4121.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-2022.00 [Electrical and Electronic Equipment Assemblers](https://www.onetonline.org/link/details/51-2022.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-2092.00 [Team Assemblers](https://www.onetonline.org/link/details/51-2092.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-9023.00 [Mixing and Blending Machine Setters, Operators, and Tenders](https://www.onetonline.org/link/details/51-9023.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-9141.00 [Semiconductor Processing Technicians](https://www.onetonline.org/link/details/51-9141.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-2011.00 [Aircraft Structure, Surfaces, Rigging, and Systems Assemblers](https://www.onetonline.org/link/details/51-2011.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-9081.00 [Dental Laboratory Technicians](https://www.onetonline.org/link/details/51-9081.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-9161.00 [Computer Numerically Controlled Tool Operators](https://www.onetonline.org/link/details/51-9161.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；full-tasks-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- M-BLS [Manufacturing: NAICS 31–33](https://www.bls.gov/iag/tgs/iag31-33.htm)；BLS；资料日期 未核定；2026-09-09读取；About Manufacturing / 21 subsectors；indexed-source-section-read。
- M-POULTRY [Poultry Processing eTool User Guide](https://www.osha.gov/etools/poultry-processing/user-guide)；OSHA；资料日期 未核定；2026-09-09读取；Site Map：Receiving & Killing / Evisceration / Cutting & Deboning / Packout / Warehousing / Sanitation；indexed-source-section-read; direct-open-403。任务目录与工艺顺序已读，不能作为食品安全数值验收规范。
- M-FOOD [21 CFR 117.80 Processes and controls](https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-117/subpart-B/section-117.80)；FDA / eCFR；资料日期 未核定；2026-09-09读取；(a) general; (b) raw materials; (c) manufacturing, rework, packaging；source-page-read。读取时title截至2026-09-04；法规适用范围需按食品类型核对，不套用到烟草。
- M-SEW [Sewing and Related Procedures eTool](https://www.osha.gov/etools/sewing)；OSHA；资料日期 未核定；2026-09-09读取；Overview：sewing stations, stitching, fine work, scissor work, material handling；indexed-source-section-read; direct-open-403。人体工学流程指导，不是全部纺织生产规范。
- M-WOOD [Wood Product Manufacturing: NAICS 321](https://www.bls.gov/iag/tgs/iag321.htm)；BLS；资料日期 未核定；2026-09-09读取；About：sawing, planing, shaping, laminating, assembling；source-page-read。行业工艺描述；家具具体作业指导书尚缺。
- M-PAPER [Episodic Air Pollution Control Measures](https://archive.epa.gov/sectors/web/pdf/episodic.pdf)；EPA；资料日期 2008-01；2026-09-09读取；January 2008，印刷第5页：Pulp and Paper工艺五阶段；indexed-original-page-read。2008旧资料只作流程分类；不使用产能、技术占比或排放值。
- M-PRINT [Monitoring Information By Industry – Printing and Publishing](https://www.epa.gov/air-emissions-monitoring-knowledge-base/monitoring-information-industry-printing-and-publishing)；EPA；资料日期 未核定；2026-09-09读取；The Printing Industry / Major Types / Post-Press Operations / ancillary washing；source-page-read。含旧行业背景，只取印前、印刷、印后和清洗动作，不采用其旧占比。
- M-REFINE [OSHA Technical Manual Section IV Chapter 2](https://www.osha.gov/otm/section-4-safety-hazards/chapter-2)；OSHA；资料日期 未核定；2026-09-09读取；III Refining Operations; IV Desalting / Distillation; auxiliary sampling maintenance；indexed-source-section-read; direct-open-403。通用炼油流程；不证明2026工厂采用率。
- M-PLASTIC [Horizontal Injection Molding Machines](https://www.osha.gov/etools/machine-guarding/plastics-machinery/horizontal-injection-molding-machines)；OSHA；资料日期 未核定；2026-09-09读取；Operator Involvement / Opening gate / Servicing and maintenance；indexed-source-section-read。仅热塑性注塑；不得替代橡胶硫化/复材工艺。
- M-ENERGY [29 CFR 1910.147 Control of hazardous energy](https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-J/section-1910.147)；OSHA / eCFR；资料日期 未核定；2026-09-09读取；(a) scope; (b) servicing definition; (c) program/procedure/training; (d–f) energy control；source-page-read。本清单仅用于适用制造业设备维护，不套用到被其排除的建筑、农业、船厂等；不把一般生产一概视为维修。
- M-SEMI [EIIP Vol II Chapter 6: Semiconductor Manufacturing](https://www.epa.gov/sites/default/files/2015-08/documents/ii06.pdf)；EPA；资料日期 1999-02-24；2026-09-09读取；2.1.2 Wafer Fabrication，印刷6.2-2；清洗/曝光/沉积/刻蚀/分割工艺；source-page-read。1999旧工艺分类；具体产线顺序可重复，不代表当前先进制程或人工比例。
- M-AIR [14 CFR 21.137 Quality system](https://www.ecfr.gov/current/title-14/chapter-I/subchapter-C/part-21/subpart-G/section-21.137)；FAA / eCFR；资料日期 未核定；2026-09-09读取；(a–j) design/supplier/process/inspection/calibration/nonconforming/handling; (n–o) escapes/release；source-page-read。FAA生产许可范围；不直接套用汽车或船舶。
- M-CNC [Haas Mill Safety](https://www.haascnc.com/service/online-operator-s-manuals/mill-operator-s-manual/mill---safety.html)；Haas Automation；资料日期 未核定；2026-09-09读取；Read Before Operating / Unattended Operation / Robot Cells；source-page-read。此前美国样板已独立重读；只适用Haas手册条件，非WST现厂SOP。
- O35-2012.00 [Cooks, Institution and Cafeteria](https://www.onetonline.org/link/details/35-2012.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O31-1131.00 [Nursing Assistants](https://www.onetonline.org/link/details/31-1131.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O33-2011.00 [Firefighters](https://www.onetonline.org/link/details/33-2011.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O47-4051.00 [Highway Maintenance Workers](https://www.onetonline.org/link/details/47-4051.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O43-5052.00 [Postal Service Mail Carriers](https://www.onetonline.org/link/details/43-5052.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O43-5053.00 [Postal Service Mail Sorters, Processors, and Processing Machine Operators](https://www.onetonline.org/link/details/43-5053.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-8031.00 [Water and Wastewater Treatment Plant and System Operators](https://www.onetonline.org/link/details/51-8031.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O53-3052.00 [Bus Drivers, Transit and Intercity](https://www.onetonline.org/link/details/53-3052.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O33-3012.00 [Correctional Officers and Jailers](https://www.onetonline.org/link/details/33-3012.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O53-7065.00 [Stockers and Order Fillers](https://www.onetonline.org/link/details/53-7065.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O25-9042.00 [Teaching Assistants, Preschool, Elementary, Middle, and Secondary School, Except Special Education](https://www.onetonline.org/link/details/25-9042.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- G-BEA [BEA Industry and Commodity Codes and NAICS Concordance](https://www.bea.gov/sites/default/files/2023-10/BEA-Industry-and-Commodity-Codes-and-NAICS-Concordance.xlsx)；BEA；资料日期 2023-10；2026-09-09读取；G rows: GFGD/GFGN/GFE/GSLGE/GSLGH/GSLGO/GSLE; postal491000, transitS00201；specified-source-section-read。2023分类对应表，不作为主榜规模年份；已读取官方原表政府各行。NIPA的business-sector不等于行业表private-industries。
- G-SCHOOLFOOD [Preserving Locally Harvested Produce in School Meals](https://www.fns.usda.gov/fs/produce-safety/preserving)；USDA FNS；资料日期 未核定；2026-09-09读取；Product Flow and Handling / Receiving / SOPs / Processing；specified-source-section-read。页面流程适用于学校厨房；不使用其中旧法规编号作为2026法律判断。
- G-SCHOOL [IDEA 300.34(c)(16) Transportation](https://sites.ed.gov/idea/regs/b/a/300.34/c/16)；U.S. Department of Education；资料日期 2017-05-02；2026-09-09读取；Travel to/from/between school; movement in school; adapted buses/lifts/ramps；specified-source-section-read。只证明校内外移动支持范围；课堂动作来自O*NET，具体学生计划待取。
- G-VA [Safe Patient Handling and Mobility](https://publichealth.va.gov/PUBLICHEALTH/employeehealth/patient-handling/index.asp)；Veterans Health Administration；资料日期 未核定；2026-09-09读取；Patient assessment, equipment selection, staff huddles; mobility；specified-source-section-read。VA公开流程框架，非每一医院科室现有SOP。
- G-VAAPP [Safe Patient Handling](https://mobile.va.gov/app/safe-patient-handling)；VA；资料日期 未核定；2026-09-09读取；Comprehensive assessments / specific tasks / equipment guides / handoff governance；specified-source-section-read。适用VA及非VA须各机构批准；并非单厂效益证据。
- G-ROAD [Materials and Procedures for Repair of Potholes in Asphalt-Surfaced Pavements](https://www.fhwa.dot.gov/publications/research/infrastructure/pavements/ltpp/99168/99168.pdf)；FHWA；资料日期 1999；2026-09-09读取；3.2.1–3.2.4，印刷8–16页/PDF21–29页；4.1 traffic;5 performance；specified-source-section-read。1999旧维修方法；不取旧工时/费用/效率作为2026参数。
- G-POST [Handbook M-41 Revision: Names Changes and Package Simplification Process](https://about.usps.com/postal-bulletin/2013/pb22368/html/updt_009.htm)；USPS；资料日期 2013-07-25；2026-09-09读取；122.13 Delivery and Collection / parcel delivery and collection；specified-source-section-read。只核对历史投递流程范围；当前完整M-41和异常件SOP尚缺，不冒充已读完整手册。
- G-WATER [Drinking Water Treatment Technologies Overview](https://www.epa.gov/sdwa/overview-drinking-water-treatment-technologies)；EPA；资料日期 未核定；2026-09-09读取；GAC use/replacement/regeneration; treatment alternatives；specified-source-section-read。处理技术条件，具体水厂组合与许可须逐场景确认。
- G-WATERFLOW [Drinking Water Treatment](https://archive.epa.gov/water/archive/web/pdf/2009_08_28_sdwa_fs_30ann_treatment_web.pdf)；EPA；资料日期 2004；2026-09-09读取；EPA816-F-04-034 Water Treatment Plant flow diagram；specified-source-section-read。旧通用工艺图，仅识别处理顺序；不作为当年全国设施技术占比。
- G-TRANSIT [Questions and Answers Concerning Wheelchairs and Bus and Rail Service](https://www.transit.dot.gov/regulations-and-guidance/civil-rights-ada/questions-and-answers-concerning-wheelchairs-and-bus-and)；FTA；资料日期 未核定；2026-09-09读取；Personnel assistance, securement and training；specified-source-section-read。无障碍乘降流程，不替代行车或车辆保养全部规范。
- G-BOP [Entering Prison](https://www.bop.gov/inmates/custody_and_care/entering_prison.jsp?device=mobile)；Federal Bureau of Prisons；资料日期 未核定；2026-09-09读取；After Arriving / Personal Property / clothing bedding and laundry；specified-source-section-read。联邦接收与财物流程；州地方设施需各自规程。
- G-DLA [DLA Distribution San Diego](https://www.dla.mil/Distribution/Locations/San-Diego/)；Defense Logistics Agency；资料日期 未核定；2026-09-09读取；About：receipt/store/ship/issue/preservation/packaging/marking/care in storage；specified-source-section-read。仅一般物资支持任务，无武器使用、机密部署或作战步骤。
- G-DLACONTRACT [Distribution Small Business](https://www.dla.mil/Small-Business/Resource-Center/Training-Resources/Details/Article/4161299/distribution-small-business/)；DLA；资料日期 2026-08-12；2026-09-09读取；General Information / What Does Distribution Procure；specified-source-section-read。明确公职与合同执行并存；未采用人数或采购额。
- O31-9093.00 [Medical Equipment Preparers](https://www.onetonline.org/link/details/31-9093.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O31-9097.00 [Phlebotomists](https://www.onetonline.org/link/details/31-9097.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O29-2034.00 [Radiologic Technologists and Technicians](https://www.onetonline.org/link/details/29-2034.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O29-2055.00 [Surgical Technologists](https://www.onetonline.org/link/details/29-2055.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O31-2021.00 [Physical Therapist Assistants](https://www.onetonline.org/link/details/31-2021.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O31-1121.00 [Home Health Aides](https://www.onetonline.org/link/details/31-1121.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O39-9011.00 [Childcare Workers](https://www.onetonline.org/link/details/39-9011.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O21-1093.00 [Social and Human Service Assistants](https://www.onetonline.org/link/details/21-1093.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- H-STERILE [Recommendations for Disinfection and Sterilization in Healthcare Facilities](https://www.cdc.gov/infection-control/hcp/disinfection-sterilization/summary-recommendations.html)；CDC；资料日期 2023-12-07；2026-09-09读取；Recommendations2 cleaning;7 endoscopes;15 packaging;16 monitoring;17 load;18 storage;19 quality；specified-source-section-read。网页承载2008指南及后续更新；按具体器械与厂商说明使用，非2026效果数据。
- H-CLIA [42 CFR 493.1242 / 493.1251](https://www.govinfo.gov/content/pkg/CFR-2022-title42-vol5/pdf/CFR-2022-title42-vol5-part493-subpartK.pdf)；CMS / GovInfo；资料日期 2022；2026-09-09读取；印刷744页：specimen collection/labeling/storage/transport/processing/rejection; procedure manual；indexed-original-page-read。2022年版流程条目已读；2025/2026原条文访问失败，最新修订待复核，不当作现行法律结论。
- H-XRAY [Medical X-ray Imaging](https://www.fda.gov/radiation-emitting-products/medical-imaging/medical-x-ray-imaging)；FDA；资料日期 未核定；2026-09-09读取；Information for Healthcare Providers / Imaging Team / QA dose monitoring；specified-source-section-read。只盘点影像执行/监测/质控职责；不提供个体曝光参数。
- H-CHILD [Health and Safety Requirements](https://www.childcare.gov/consumer-education/regulated-child-care/health-and-safety-requirements)；HHS / ChildCare.gov；资料日期 未核定；2026-09-09读取；Sanitation/diapering/toileting; activity/rest; sick child; building; emergencies；indexed-source-page-read; direct-open-error。州许可标准和每机构规程须补；政府幼儿园在政府而非私人624。
- H-SHELTER [24 CFR 576.403(b), 2022 edition: ESG emergency shelter standards](https://www.govinfo.gov/content/pkg/CFR-2022-title24-vol3/pdf/CFR-2022-title24-vol3-part576-subpartE.pdf)；HUD / GovInfo；资料日期 2022-04-01；2026-09-09读取；§576.403(b)(3),(6),(9),(10),(11), printed p.204；indexed-source-section-read; 2025 PDF direct retrieval failed。仅2022版(b)紧急收容设施最低条件已读；2025 PDF未成功读取；不能将永久住房(c)旧版当2026现行规则。设施条件不证明各动作由社会服务助理执行。
- O47-2061.00 [Construction Laborers](https://www.onetonline.org/link/details/47-2061.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O47-2073.00 [Operating Engineers](https://www.onetonline.org/link/details/47-2073.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O47-2031.00 [Carpenters](https://www.onetonline.org/link/details/47-2031.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O47-2051.00 [Cement Masons and Concrete Finishers](https://www.onetonline.org/link/details/47-2051.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O47-2171.00 [Reinforcing Iron and Rebar Workers](https://www.onetonline.org/link/details/47-2171.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O47-2221.00 [Structural Iron and Steel Workers](https://www.onetonline.org/link/details/47-2221.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O47-2111.00 [Electricians](https://www.onetonline.org/link/details/47-2111.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O47-2152.00 [Plumbers, Pipefitters, and Steamfitters](https://www.onetonline.org/link/details/47-2152.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O49-9021.00 [Heating, Air Conditioning, and Refrigeration Mechanics and Installers](https://www.onetonline.org/link/details/49-9021.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O47-2181.00 [Roofers](https://www.onetonline.org/link/details/47-2181.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O47-2081.00 [Drywall and Ceiling Tile Installers](https://www.onetonline.org/link/details/47-2081.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O47-2141.00 [Painters, Construction and Maintenance](https://www.onetonline.org/link/details/47-2141.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- C-EARTH [Construction Manual 4-19 Earthwork](https://dot.ca.gov/programs/construction/construction-manual/section-4-19-earthwork)；Caltrans；资料日期 2019-07；2026-09-09读取；4-1901 / 4-1902 before work / 4-1903 excavation, unsuitable materials, embankments and compaction；specified-source-section-read。加州公路工程检查手册，施工动作与政府驻地工程师审批分开；不把加州要求推为全国统一规范。
- C-CONCRETE [Construction Manual 4-51 Concrete Structures](https://dot.ca.gov/programs/construction/construction-manual/section-4-51-concrete-structures)；Caltrans；资料日期 2022-12；2026-09-09读取；4-5102; 4-5103A placement, D forms, E joints, G finishing; 4-5104 quality control；specified-source-section-read。州公路工程流程；政府验收与承包商自检是不同执行主体。
- C-STEEL [Steel Erection: Structural Stability](https://www.osha.gov/etools/steel-erection/structural-stability)；OSHA；资料日期 未核定；2026-09-09读取；Structural steel assembly; steel joists and girders; erection bridging；indexed-source-sections-read。安全流程约束，不是全部建造方法；本清单不引用页面具体尺寸或事故发生率。
- C-HOIST [Steel Erection: Cranes](https://www.osha.gov/etools/steel-erection/cranes)；OSHA；资料日期 未核定；2026-09-09读取；Hoisting and Rigging: General, Inspection, Working under loads；indexed-source-sections-read。页面含旧法规交叉引用；任务存在识别，不代替当前工程安全合规审查。
- C-FRAME [Advanced Framing: Minimal Framing at Doors and Windows](https://basc.pnnl.gov/resource-guides/advanced-framing-minimal-framing-doors-and-windows)；DOE / PNNL；资料日期 未核定；2026-09-09读取；Scope; How to Install Minimal Framing at Doors and Windows steps 1–3；specified-source-section-read。限所述高级木框架方案，未将此方案当成全部美国木结构；不采用成本或节材数字。
- C-ELEC [29 CFR 1926.417 Lockout and tagging of circuits](https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.417)；OSHA；资料日期 未核定；2026-09-09读取；1926.417(a) Controls, (b) Equipment and circuits, (c) Tags；indexed-source-full-section-read。只支持施工电路隔离标识；不把不适用于施工的1910.147套入。
- C-HEATPUMP [Ductless (Mini-Split) Heat Pumps](https://basc.pnnl.gov/resource-guides/ductless-mini-split-heat-pumps)；DOE / PNNL；资料日期 未核定；2026-09-09读取；How to Select and Install Ductless Heat Pumps steps 1–12; Maintenance of Ductless Systems；specified-source-section-read。住宅无风管热泵流程；设备参数/经济收益均未采用。维护段已读过滤说明，其他细部须查OEM。
- C-ROOF [Flashing of Penetrations in Existing Roofs](https://basc.pnnl.gov/resource-guides/flashing-penetrations-existing-roofs)；DOE / PNNL；资料日期 未核定；2026-09-09读取；Scope; Description; pipe penetration membrane and metal collar sequence；indexed-source-sections-read。限既有住宅穿透点泛水，不覆盖全部低坡屋面、瓦种或商业屋面。
- C-AIRSEAL [Home Improvement Expert Checklist: Home Air Sealing](https://basc.pnnl.gov/file-download/download/private/6348)；DOE / PNNL；资料日期 未核定；2026-09-09读取；Preparation inspection and blower door; installation gaps, blocking, top plates, penetrations；indexed-source-checklist-read。节能改造清单，只支持密封接口；不是石膏板、油漆或给排水全部施工SOP。
- O45-2091.00 [Agricultural Equipment Operators](https://www.onetonline.org/link/details/45-2091.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O45-2092.00 [Farmworkers and Laborers, Crop, Nursery, and Greenhouse](https://www.onetonline.org/link/details/45-2092.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O45-2093.00 [Farmworkers, Farm, Ranch, and Aquacultural Animals](https://www.onetonline.org/link/details/45-2093.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O45-2041.00 [Graders and Sorters, Agricultural Products](https://www.onetonline.org/link/details/45-2041.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O45-4021.00 [Fallers](https://www.onetonline.org/link/details/45-4021.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O45-4022.00 [Logging Equipment Operators](https://www.onetonline.org/link/details/45-4022.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O45-3031.00 [Fishing and Hunting Workers](https://www.onetonline.org/link/details/45-3031.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O45-4011.00 [Forest and Conservation Workers](https://www.onetonline.org/link/details/45-4011.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- A-CORN [Strategies for successful corn planting](https://extension.umn.edu/agriculture/crop-production/corn/strategies-successful-corn-planting)；University of Minnesota Extension；资料日期 未核定；2026-09-09读取；Avoid excessive preplant tillage; Optimal planting depth; planting speed and seed-to-soil contact；indexed-source-sections-read。明尼苏达玉米栽培建议，不把当地播深作为全国阈值。
- A-GRAIN [Storing wheat and barley](https://extension.umn.edu/agriculture/crop-production/small-grains/storing-wheat-and-barley)；University of Minnesota Extension；资料日期 未核定；2026-09-09读取；Clean bins; Manage fines; aeration; How to check stored grain；indexed-source-sections-read。限小麦大麦储藏；未采用温湿度或时间数值，不代表全部粮食品种。
- A-APPLE [Guía para Mejorar la Cosecha de Manzana / Harvest success video transcript](https://extension.psu.edu/guia-para-mejorar-la-cosecha-de-manzana)；Penn State Extension；资料日期 未核定；2026-09-09读取；English transcript: Preparation; Ladder Skills; Picking; bin transfer; Hauling；indexed-source-transcript-read。标题西班牙文，实际读取网页所载英文视频稿；不证明任何果园工时。
- A-PRODUCE [Keeping Produce Fresh: Best Practices for Producers](https://extension.psu.edu/keeping-produce-fresh-best-practices-for-producers)；Penn State Extension；资料日期 未核定；2026-09-09读取；Harvest; Prevent Bruising and Scraping; Minimize Hauling; Room Cooling；indexed-source-sections-read。品种和市场要求仍需具体SOP；温度/收益参数未采用。
- A-GAP [USDA Harmonized GAP Standard v3.1](https://www.ams.usda.gov/sites/default/files/media/Harmonized_GAP_Standard_Version_3.1.pdf)；USDA AMS；资料日期 2025-07-01；2026-09-09读取；F-10.4, printed 51 of 167: designated harvest containers; only this indexed row read；indexed-specific-row-read; PDF opened but other sections retrieval failed。173个PDF页面，正文167页。官方网页说明2025-07-03生效；本次只确认F-10.4，不声称全表已读。
- A-GAP2024 [USDA Harmonized GAP Standard v3.0, historical container detail](https://www.ams.usda.gov/sites/default/files/media/HarmonizedGAPStandardVersion3.0.pdf)；USDA AMS；资料日期 2024-02-09；2026-09-09读取；F-10.1–F-10.3, printed50 of144: storage, inspection, commodity suitability；indexed-specific-table-read。2024旧版仅帮助盘点容器动作；v3.1已发布，不能视为现行审核标准已全比对。
- A-NURSERY [Tomato Transplants & Bacterial Disease](https://blog-fruit-vegetable-ipm.extension.umn.edu/2022/04/tomato-transplants-bacterial-disease.html)；University of Minnesota Extension；资料日期 2024-04-25；2026-09-09读取；Greenhouse Sanitation: trays, tables, tools and seasonal cleaning；indexed-source-section-read。URL含2022但页面显式日期2024-04-25；仅育苗卫生，不是完整播种育苗SOP。
- A-MILK [Standard Operating Procedure for the Milking Facility](https://extension.psu.edu/standard-operating-procedure-for-the-milking-facility)；Penn State Extension；资料日期 2024-09-12；2026-09-09读取；Steps1–5: cow movement, udder prep, dip contact, wipe dry/attach, postdip；indexed-source-full-procedure-read。工序识别而非本项目奶牛场人时，具体数值不采用。
- A-MILK2025 [Milking Management: Consistency is the Key!](https://extension.psu.edu/milking-management-consistency-is-the-key)；Penn State Extension；资料日期 2025-12-03；2026-09-09读取；pre-dip; fore-stripping and abnormal milk; drying; unit attachment/removal; post-dip；indexed-source-procedure-read。2025更新与2024文的挤取次数存在差异，本清单不采用次数或时长阈值，按当地奶牛场SOP验证。
- A-TMR [Total Mixed Rations for Dairy Cows](https://extension.psu.edu/total-mixed-rations-for-dairy-cows)；Penn State Extension；资料日期 2023-09-14；2026-09-09读取；Introduction feed inventory/testing; Advantages mixing and scales; Disadvantages mixing; forage analysis and dry matter；indexed-source-sections-read。仅流程/条件；所有历史成本、损耗、工时和示例饲喂数字均不采用。
- A-MANURE [Beef Cattle Manure and Nutrient Management](https://extension.psu.edu/animals-and-livestock/beef-cattle/manure-and-nutrient-management)；Penn State Extension；资料日期 未核定；2026-09-09读取；Manure management plans; applications; compost mixing/turning; storage hazards；indexed-source-sections-read。含宾州法律说明，不推为全国相同；只盘点粪污过程，未验证具体储池工程。
- A-EGG [Proper Handling of Eggs: From Hen to Consumption](https://extension.psu.edu/proper-handling-of-eggs-from-hen-to-consumption)；Penn State Extension；资料日期 未核定；2026-09-09读取；Proper Egg Cleaning and Handling steps1–5; collecting, container stacking, cleaning；indexed-source-procedure-read。小群饲养者指导，仅已读收集清洗段；不把温度浓度等数值用为全国商用规则。
- A-FLOCK [Small-Scale Egg Production (Organic and Conventional)](https://extension.psu.edu/small-scale-egg-production-organic-and-non-organic)；Penn State Extension；资料日期 未核定；2026-09-09读取；feeding and watering; litter/housing; biosecurity scope；indexed-source-sections-read; direct403。小规模非笼养场景；大型笼养、繁育孵化及肉禽捕捉不能由此覆盖。预算数字未采用。
- A-SWINE [Swine Production](https://extension.psu.edu/swine-production)；Penn State Extension；资料日期 未核定；2026-09-09读取；Three Enterprises and Characteristics; Feeding; health and water considerations；indexed-source-sections-read。页面含很旧预算和产量数据且更新时间未确认，不用于2026经济参数；只用来识别繁育/育肥等分支。
- A-LOG [Logging eTool: process directory](https://www.osha.gov/etools/logging)；OSHA；资料日期 未核定；2026-09-09读取；Manual Operations and Mechanical Operations directory: harvesting, felling, limbing/bucking, yarding, loading；indexed-source-directory-read。目录识别全流程，不声称所有子页面都已读。
- A-BUCK [Logging: Limbing and Bucking](https://www.osha.gov/etools/logging/manual-operations/limbing-bucking)；OSHA；资料日期 未核定；2026-09-09读取；definition; five pre-limbing hazard checks; highlights of requirements；indexed-source-full-section-read。不转写危险操作的锯切步骤；作为条件与任务边界资料。
- A-TREE [Reforestation Toolbox: Handling in the Field, Southern Conifers](https://www.fs.usda.gov/t-d/seedlings/field/southern.htm)；US Forest Service；资料日期 未核定；2026-09-09读取；field storage, daily allocation, protect roots from freezing/drying；indexed-source-section-read; direct retrieval failed。南方针叶树苗现场保管，未读完整栽植质量检查方案。
- A-POTS [Fishing Gear: Traps and Pots](https://www.fisheries.noaa.gov/national/bycatch/fishing-gear-traps-and-pots)；NOAA Fisheries；资料日期 2025-05-12；2026-09-09读取；gear definition, bait/retrieve/rebait; gear configuration; bycatch reduction；indexed-source-full-page-read。不同海域渔法和规则有别，不采用统一深度、绳制或渔获数量。
- A-LONGLINE [Fishing Gear: Pelagic Longlines](https://www.fisheries.noaa.gov/national/bycatch/fishing-gear-pelagic-longlines)；NOAA Fisheries；资料日期 2025-11-14；2026-09-09读取；mainline, gangions and baited hooks; gear positioning; safe handling/release protocols；indexed-source-full-page-read。没有读取具体受保护物种解救手册，不提供替代培训的处理指令。
- A-CATFISH [Production Phases and Systems](https://extension.msstate.edu/agriculture/catfish/production-phases-and-systems)；Mississippi State University Extension；资料日期 未核定；2026-09-09读取；Production Systems; Maintaining brood stock; Foodfish production; Split-ponds；indexed-source-sections-read。斑点叉尾鮰池塘养殖，不推及所有美国水产；库存估计不确定性保留，未采用数量时间经济数值。
- A-FISHFEED [Catfish Feeds and Feeding](https://www.accessibility.extension.msstate.edu/agriculture/catfish/catfish-feeds-and-feeding)；Mississippi State University Extension；资料日期 未核定；2026-09-09读取；Feeding section: monitor conditions; mechanical surface feeding; avoid overfeeding；indexed-source-section-read。具体饲喂取决于水质、鱼体和当地管理，不引用配方或饲喂频率数值。
- A-FISHWATER [Catfish Water Quality](https://extension.msstate.edu/agriculture/catfish/catfish-water-quality)；Mississippi State University Extension；资料日期 未核定；2026-09-09读取；oxygen demand; preharvest flavor sampling acceptance；indexed-source-section-read。仅特定段落；异常处置、水质采样方法和阈值仍需场站SOP。
- O51-9195.00 [Molders, Shapers, and Casters, Except Metal and Plastic](https://www.onetonline.org/link/details/51-9195.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-9051.00 [Furnace, Kiln, Oven, Drier, and Kettle Operators and Tenders](https://www.onetonline.org/link/details/51-9051.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-9111.00 [Packaging and Filling Machine Operators and Tenders](https://www.onetonline.org/link/details/51-9111.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- O51-9197.00 [Tire Builders](https://www.onetonline.org/link/details/51-9197.00)；O*NET / U.S. Department of Labor；资料日期 未核定；2026-09-09读取；Occupation-Specific Information → Tasks（使用 Show all）；本次读取动作列表。页面条目顺序会修订，具体任务短句绑定待下一轮逐项复核。；specified-source-section-read。O*NET职责用于识别动作，不证明本机构实施、人工工时或所有制；当前清单为章节级引用，任务短句级匹配尚待独立审查。
- M-CEMENT [AP-42 11.6 Portland Cement Manufacturing](https://www.epa.gov/system/files/documents/2025-02/c11s06_final_2-2025_0.pdf)；US EPA；资料日期 2025-02；2026-09-09读取；11.6.1 process description, printed11.6-1 to11.6-7, raw handling/milling/kiln/clinker/finish grinding；specified-source-section-read。只用工艺识别，未采用排放因子/市场占比/温度等数字；采石矿山劳动不自动算水泥厂。
- M-GLASS [AP-42 11.15 Glass Manufacturing](https://www.epa.gov/sites/default/files/2020-10/documents/c11s15.pdf)；US EPA；资料日期 1986-10；2026-09-09读取；11.15.1, printed11.15-1: raw materials/melting/forming/finishing/annealing/inspection/cullet；specified-source-section-read。1986旧工艺，1995重排、2007排放图勘误；不证明2026产线配置，不采用其份额和产能。
- M-CERAMIC [AP-42 11.7 Ceramic Products Manufacturing](https://www.epa.gov/system/files/documents/2025-06/c11s07_2025_final.pdf)；US EPA；资料日期 2025-05；2026-09-09读取；11.7.2 process description; 11.7.2.3–11.7.2.10 mixing/forming/green machining/drying/glazing/firing/finishing；specified-source-section-read。2025版，排放因子不是许可限值；本清单不采用排放数字。产品工艺组合需逐厂确认。
- M-PHARMA [CGMP Questions and Answers: Production and Process Controls](https://www.fda.gov/drugs/guidances-drugs/questions-and-answers-current-good-manufacturing-practice-regulations-production-and-process)；FDA；资料日期 未核定；2026-09-09读取；Q1 equipment status/cleaning log; Q2 container sampling; Q12 manufacturing control/deviation/testing; Q17/18 blend sampling context；specified-source-section-read。各问答有各自历史日期，不能用页面抓取时间表示制度新发布；本次只用已读流程约束。
- M-TIRE [How Tires are Made](https://www.tireindustry.org/resources/consumer-education/consumer-safety-overview/how-tires-are-made/)；Tire Industry Association；资料日期 未核定；2026-09-09读取；manufacturing paragraphs: liner/plies/beads/drum building/curing/cooling/inspection/test wheel；specified-source-section-read。美国行业协会流程概览，不等于任一厂家现场持续运行证明；新胎和翻新胎分清。
- M-AUTO [Toyota Mississippi Plant: A Model for Sustainable Initiatives](https://pressroom.toyota.com/toyotas-mississippi-plant-a-model-for-sustainable-initiatives/)；Toyota Motor North America；资料日期 未核定；2026-09-09读取；opening manufacturing passage: stamping, welding, painting, assembling and inspecting Corollas；indexed-source-specific-passage-read; direct retrieval failed。约2021旧厂商文章；仅确认美国工厂包含工艺段，不证明2026产能/人数或细部动作，具体装配步骤为待现场验证。
- G-FIRE [Fire Investigation: The First Responder’s Role](https://www.usfa.fema.gov/a-z/arson-fire-investigation/fire-investigations-first-responders.html)；USFA / FEMA；资料日期 2026-05-01；2026-09-09读取；Responding to the scene; Observation; Tactics; After the fire；specified-source-section-read。页面last reviewed日期；重点现场观察与证据保全，不是完整消防战术SOP。
- G-FIREPPE [Critical Health and Safety Issues in the Volunteer Fire Service](https://www.usfa.fema.gov/downloads/pdf/publications/critical_health_and_safety_issues.pdf)；USFA / National Volunteer Fire Council；资料日期 未核定；2026-09-09读取；PPE cleaning/storing, SCBA inspection, record keeping paragraph；indexed-source-specific-section-read。历史培训资料；没有把文中NFPA版次、服役年限或检查频率作为2026现行要求。
