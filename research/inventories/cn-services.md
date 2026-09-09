# 中国服务行业候选任务盘点

数据源：`cn-services.json`。读取截至 2026-09-09，状态为 **partial-task-inventory**，待独立复核。

本轮登记 5 个行业、14 个场景、146 个候选任务。全部自动化研究状态为 **not-started**。这不是全行业研究完成或任务清单冻结；每个行业的子行业缺口均保留。

`source-backed` 只表示动作或场景有可定位资料支持。输入、输出和验收由研究者用于界定任务，尚需现场 SOP 确认；它不证明当前部署、工时、经济收益或行业普遍采用。

子行业登记数是本轮覆盖清单的条目数，不是官方分类总数或增加值覆盖率。

|行业|场景|候选任务|子行业登记|部分覆盖|缺口|非就业任务项|
|---|---:|---:|---:|---:|---:|---:|
|住宿和餐饮业|4|47|6|5|1|0|
|金融业|2|21|4|2|2|0|
|房地产业|2|22|5|4|1|0|
|信息传输、软件和信息技术服务业|2|21|3|3|0|0|
|租赁和商务服务业|4|35|9|4|5|0|

## 统计归属与适用边界

按执行单位的主要活动归属；自营与外包分开，不能把客户的付款重复当成客户行业的人工。职业来源只能说明动作，不能说明该动作在哪个行业占多少工时。来源发布日期未知保留空值，转载、修订、征求意见稿和历史案例分别说明。

## 住宿和餐饮业（cn-accommodation-food）

按场景 scope 核对执行单位与实体劳动边界。

|主要子行业或覆盖维度|状态|具体缺口|
|---|---|---|
|旅游饭店、一般旅馆|partial|工程设备、自营洗衣、宴会与前厅实名登记专属任务待补|
|民宿、露营地及其他住宿|partial|旅店草案支持部分一般服务；露营地卫生设施、营位交付和户外异常未展开|
|正餐、快餐|partial|中餐烹调有双源；快餐装配、西餐和特殊菜单流程待补|
|饮料及冷饮服务|gap|咖啡、茶饮、酒吧的现行职业与制作SOP未读取；不得用堂食服务替代制作任务|
|餐饮配送及外卖送餐服务|partial|中央厨房/团餐配送封装温控、路线交接和骑手雇主边界待查|
|小吃及其他餐饮服务|partial|面点烘焙、小吃预制与移动餐车专属工艺未拆|

### 住客房间周转、用品及布草交接（CN-AF-ROOM）

仅住宿经营单位自营客房服务；独立外包洗衣、保洁及专业维修按服务商行业计，本场景只记交接与验收。

来源状态：source-backed。流程来源：CN-SVC-HYG；职业来源：CN-SVC-HOTEL。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|CN-AF-ROOM-T01|准备|核对房态与进房许可|房号及许可一致|CN-SVC-HOTEL-rooms|
|CN-AF-ROOM-T02|准备|装配分区清洁工具和客用品|洁污工具分开且用品可识别|CN-SVC-HOTEL-rooms|
|CN-AF-ROOM-T03|作业|拆收用过的床单被套|件数登记且不污染洁净用品|CN-SVC-HYG-rooms|
|CN-AF-ROOM-T04|作业|更换床品并整理卧具|无可见污损并符合房型配置|CN-SVC-HYG-rooms；CN-SVC-HOTEL-rooms|
|CN-AF-ROOM-T05|作业|擦洗卫生间洁具与接触面|按区使用工具且污渍已清除|CN-SVC-HOTEL-rooms|
|CN-AF-ROOM-T06|作业|清洁客房地面家具与用品|可见杂物和污渍清除|CN-SVC-HYG-rooms|
|CN-AF-ROOM-T07|交接|交接待洗布草及特殊污损记录〔待验证〕|品类件数差异已登记|CN-SVC-HYG-records|
|CN-AF-ROOM-T08|检测|检查房间清洁设备及客用品|缺陷逐项定位并禁止误改可售房态|CN-SVC-HOTEL-rooms|
|CN-AF-ROOM-T09|异常|登记遗留物与损坏设备并移交〔待验证〕|物品身份和接收者可追溯|CN-SVC-HYG-records|
|CN-AF-ROOM-T10|返工|重做检查不合格区域〔待验证〕|原缺陷关闭且未新增污染|CN-SVC-HOTEL-rooms|
|CN-AF-ROOM-T11|清洁维护|清洗消毒杯具与可复用品|过程记录完整且洁污隔离|CN-SVC-HYG-rooms；CN-SVC-HOTEL-rooms|
|CN-AF-ROOM-T12|清洁维护|分类清出废弃物并清洁容器|去向和清洁状态符合现场方案|CN-SVC-HYG-rooms；CN-SVC-HOTEL-rooms|
|CN-AF-ROOM-T13|交付|提交清洁记录并移交可用房间〔待验证〕|授权放房且记录与房间一致|CN-SVC-HOTEL-rooms|

场景缺口：

- 尚未用正式客房服务员标准替换旅店草案；酒店星级/房型/入住及退房清扫差异待补SOP
- 病媒防制、集中空调和消防专业维护只登记外包边界，未计为客房员工必做任务

### 餐饮原料进入厨房至合格餐品出品（CN-AF-KITCHEN）

餐饮单位厨房，包括正餐、快餐及餐饮经营者中央厨房；学校/医院自办厨房须按该统计单位归属，独立食品制造另计。

来源状态：source-backed。流程来源：CN-SVC-FOOD；职业来源：CN-SVC-COOK。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|CN-AF-KITCHEN-T01|准备|核对菜单及原料需求〔待验证〕|品种与份量对应有效订单|CN-SVC-COOK-tasks|
|CN-AF-KITCHEN-T02|检测|验收原料标识状态与交货记录|来源身份和状态可追溯|CN-SVC-FOOD-procure|
|CN-AF-KITCHEN-T03|作业|分区贮存原料及轮转库存|生熟及适用储存条件区分|CN-SVC-FOOD-procure|
|CN-AF-KITCHEN-T04|作业|清洗整理并去除不可食部分|异物去除且不交叉污染|CN-SVC-COOK-tasks|
|CN-AF-KITCHEN-T05|作业|分档去骨与涨发干货|对应菜品规格且无不应保留部位|CN-SVC-COOK-tasks|
|CN-AF-KITCHEN-T06|作业|按菜品规格切配原料|形状和配比符合厨房配方|CN-SVC-COOK-tasks|
|CN-AF-KITCHEN-T07|作业|对原料预熟挂浆与组合配菜|工序和批次可辨识|CN-SVC-COOK-tasks|
|CN-AF-KITCHEN-T08|作业|调味烹制热菜或制作冷菜|适用工艺条件和防污染要求满足|CN-SVC-COOK-tasks；CN-SVC-FOOD-cook|
|CN-AF-KITCHEN-T09|检测|核对熟制状态和出品要求|按现场验证工艺检查并留记录|CN-SVC-FOOD-cook|
|CN-AF-KITCHEN-T10|交接|装盘并按订单移交出餐口|菜品桌号或餐盒编号一致|CN-SVC-COOK-tasks；CN-SVC-FOOD-serve|
|CN-AF-KITCHEN-T11|异常|隔离可疑原料或失控餐品〔待验证〕|不得继续混入可供餐品|CN-SVC-FOOD-cook|
|CN-AF-KITCHEN-T12|返工|按批准方案重制不合格餐品〔待验证〕|食品不安全品不因返工名义重新供餐|CN-SVC-FOOD-cook|
|CN-AF-KITCHEN-T13|清洁维护|清洗消毒刀具砧板与设备接触面|清洁消毒及保洁过程可检查|CN-SVC-FOOD-clean|
|CN-AF-KITCHEN-T14|清洁维护|收集并交接厨余及废弃油脂|与食品原料分离|CN-SVC-FOOD-clean|
|CN-AF-KITCHEN-T15|交付|完成必要留样和出品记录|仅按适用场景执行留样并关联餐次|CN-SVC-FOOD-cook|

场景缺口：

- 烹调职责直接支持中餐；西餐、烘焙、饮品制作及特定过敏原流程尚缺各自职业/SOP全文
- 中央厨房和集体配送专属温控、封装、运输节点未完整展开，不把一般厨房等同全部餐饮

### 堂食服务、餐具回收与餐后周转（CN-AF-DINING）

餐饮经营单位自营堂食；酒店自营早餐可链接本组，不与客房送餐重复；平台骑手配送按执行者行业另计。

来源状态：source-backed。流程来源：CN-SVC-FOOD；职业来源：CN-SVC-WAITER。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|CN-AF-DINING-T01|准备|准备并摆放餐酒具和工作台|器具完整洁净并匹配座位|CN-SVC-WAITER-prepare|
|CN-AF-DINING-T02|作业|迎接引导顾客并确认用餐需求|座位和特殊要求已确认|CN-SVC-WAITER-prepare|
|CN-AF-DINING-T03|交接|将点餐要求传达至厨房〔待验证〕|桌位菜品与限制信息一致|CN-SVC-WAITER-service|
|CN-AF-DINING-T04|作业|运送餐品并提供席间服务|防溢洒且对应桌位|CN-SVC-WAITER-service；CN-SVC-FOOD-serve|
|CN-AF-DINING-T05|检测|核对出餐订单及餐具状态〔待验证〕|错菜污损不继续交付|CN-SVC-FOOD-serve|
|CN-AF-DINING-T06|异常|处理洒漏错餐及顾客反馈〔待验证〕|危险区域控制且请求已移交|CN-SVC-WAITER-service|
|CN-AF-DINING-T07|返工|更换错配餐具并重新配送合格餐品〔待验证〕|退回与新供餐品分开|CN-SVC-WAITER-service|
|CN-AF-DINING-T08|交接|回收并分类移交餐具残食|残食和器具分流|CN-SVC-FOOD-clean；CN-SVC-WAITER-service|
|CN-AF-DINING-T09|清洁维护|清洁餐台并将餐具洗消保洁|洁污线路分离且无可见污损|CN-SVC-FOOD-clean|
|CN-AF-DINING-T10|交付|核对账单并完成结账和交班〔待验证〕|实物交付与订单账务一致|CN-SVC-WAITER-service|

场景缺口：

- 餐厅标准已读取相关页；宴会、西式席间、饮品调制和外卖包装仍需展开专属任务

### 旅店物品、行李与客房送餐交接（CN-AF-GUEST）

仅住宿经营者的在店实体递送；预订结算为必要支持数字流程；纯营销定价不在实体主视图。

来源状态：source-backed。流程来源：CN-SVC-HYG；职业来源：CN-SVC-HOTEL。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|CN-AF-GUEST-T01|准备|核对住客请求房号与递送物品〔待验证〕|房号和授权接收者可核|CN-SVC-HOTEL-front|
|CN-AF-GUEST-T02|作业|搬运并暂存住客行李|物件身份和领取关系一致|CN-SVC-HOTEL-front|
|CN-AF-GUEST-T03|作业|递送客用品邮件和餐食|完整送达且不得错交|CN-SVC-HOTEL-rooms；CN-SVC-HOTEL-front|
|CN-AF-GUEST-T04|交接|交接衣物洗涤需求与污损说明|件数材质标识与原污损记载一致|CN-SVC-HOTEL-front|
|CN-AF-GUEST-T05|检测|核对返还衣物或租借物品〔待验证〕|件数和状态可核|CN-SVC-HOTEL-front|
|CN-AF-GUEST-T06|异常|登记丢失错送及损坏投诉|保护实物及原记录并有负责人|CN-SVC-HOTEL-front|
|CN-AF-GUEST-T07|返工|追回错送物品并重新核验交付〔待验证〕|授权领取关系重新确认|CN-SVC-HOTEL-front|
|CN-AF-GUEST-T08|清洁维护|清洁递送托盘与租借物品〔待验证〕|清洁状态明确且与污物隔离|CN-SVC-HYG-records|
|CN-AF-GUEST-T09|交付|归还行李衣物并关闭住客请求|物品数量和接收者一致|CN-SVC-HOTEL-front|

场景缺口：

- 前台身份证件核验、公安登记、钥匙发放与行李保管专门规范未读取；此场景仅部分覆盖
- 洗涤加工不在本场景：自营洗衣房待建单独流程，独立洗涤企业另归统计行业

行业缺口：

- 未声称行业任务完整；全部候选任务的自动化/失败案例研究尚未开始
- 就业规模、工时和现金投入均无本阶段量化结果

## 金融业（cn-finance）

按场景 scope 核对执行单位与实体劳动边界。

|主要子行业或覆盖维度|状态|具体缺口|
|---|---|---|
|货币金融服务|partial|央行现金处理、ATM、金库、贵金属与信贷抵押物查验未完整拆解|
|资本市场服务|gap|主要为知识和数字工作；实物凭证托管及商品交割须核执行者，不能把交易所客户仓库归证券|
|保险业|partial|查勘仅职业来源；人身险与再保险主要知识流程，资料实物归档仍缺SOP|
|其他金融业（信托、金融控股、典当等）|gap|典当验物保管赎回及信托实物资产查验未取得双源；融资租赁与经营租赁分类须据单位活动核对|

### 银行柜面现金与实物凭证核对（CN-FI-CASH）

银行自营柜面及现金后台；现金押运/外包清分按执行单位另计，银行只保留交接；不把数字信贷决策算实体劳动。

来源状态：source-backed。流程来源：CN-SVC-CASH；职业来源：CN-SVC-OCC。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|CN-FI-CASH-T01|准备|核对柜面现金及凭证交班清单〔待验证〕|实物与登记差异已处理|CN-SVC-OCC-bank|
|CN-FI-CASH-T02|准备|检查鉴别机具工作状态|鉴别能力满足适用要求|CN-SVC-CASH-identify|
|CN-FI-CASH-T03|作业|清点客户现金并核对存取凭证|币种金额与凭证一致|CN-SVC-OCC-bank|
|CN-FI-CASH-T04|检测|鉴别钞币并记录可疑结果|可疑币转入规定流程|CN-SVC-CASH-identify|
|CN-FI-CASH-T05|作业|按批准交易收付现金及打印凭据|收付实物与账务一致|CN-SVC-OCC-bank|
|CN-FI-CASH-T06|交接|核对票款并移交业务凭证|凭证完整且关联交易|CN-SVC-OCC-bank|
|CN-FI-CASH-T07|异常|按规定收缴封装并登记假币|符合该币种收缴规定且账实对应|CN-SVC-CASH-custody|
|CN-FI-CASH-T08|异常|登记误收误付并提交追溯材料|保留原记录并按授权处理|CN-SVC-CASH-identify|
|CN-FI-CASH-T09|返工|复点不平现金并更正经核实差错〔待验证〕|不以无依据调账消除差额|CN-SVC-OCC-bank|
|CN-FI-CASH-T10|清洁维护|停用故障机具并移交维护〔待验证〕|不得将设备清洁等同鉴别校准|CN-SVC-CASH-internal|
|CN-FI-CASH-T11|交接|清分现金并按用途整装交库〔待验证〕|类别金额可追溯且双方核验|CN-SVC-OCC-bank|
|CN-FI-CASH-T12|交付|完成现金凭证对账与档案封存|实物账务及未决事项对应|CN-SVC-OCC-bank|

场景缺口：

- 整点扎把、ATM加钞、金库双人控制及残损兑换专门规程尚未读取；当前交库节点为研究提出
- 现金自动化、假币误判率和人工工时均not-started

### 保险标的现场查勘与残值实物交接（CN-FI-LOSS）

保险公估机构或保险公司自营查勘；修理厂维修不归保险，第三方检测按检测机构归属；本场景不作保险责任或赔款自动决策。

来源状态：proposed。流程来源：缺失；职业来源：CN-SVC-OCC。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|CN-FI-LOSS-T01|准备|核对委托保险标的及现场进入条件|标的身份和委托范围明确|CN-SVC-OCC-insurance|
|CN-FI-LOSS-T02|作业|现场观察并记录受损物状态|记录原状态且不擅自改变证物|CN-SVC-OCC-insurance|
|CN-FI-LOSS-T03|作业|测量受损部位并收集实物资料〔待验证〕|数据能回到具体部位|CN-SVC-OCC-insurance|
|CN-FI-LOSS-T04|交接|将需专检物件移交检测方〔待验证〕|封识身份和接收者一致|CN-SVC-OCC-insurance|
|CN-FI-LOSS-T05|检测|核验照片测量和物件记录一致性|标的与证据不混案|CN-SVC-OCC-insurance|
|CN-FI-LOSS-T06|异常|隔离不安全现场并补充查勘安排〔待验证〕|权限及安全条件明确|CN-SVC-OCC-insurance|
|CN-FI-LOSS-T07|返工|补拍复测有争议部位〔待验证〕|原证据保留且注明变化|CN-SVC-OCC-insurance|
|CN-FI-LOSS-T08|清洁维护|检查并清洁查勘仪器〔待验证〕|不污染证物且功能可核|CN-SVC-OCC-insurance|
|CN-FI-LOSS-T09|交付|移交残值清单及公估报告|身份与处置授权一致|CN-SVC-OCC-insurance|

场景缺口：

- 已读取官方职业职责，尚缺保险公估现场SOP/流程规范第二来源，故场景proposed
- 车险、财产险、农险和灾害查勘工具及验收不同，不能用本场景替代所有险种

行业缺口：

- 两场景不能代表全部金融任务；自动化检索尚未开始

## 房地产业（cn-real-estate）

按场景 scope 核对执行单位与实体劳动边界。

|主要子行业或覆盖维度|状态|具体缺口|
|---|---|---|
|房地产开发经营|partial|仅交付接口；开发商自营现场管理和样板房实体作业未完整拆|
|物业管理|partial|专项设备/绿化/停车待展开，外包按承包方归属|
|房地产中介服务|partial|带看、钥匙管理、验房部分职业支持，缺中介专项SOP|
|房地产租赁经营|partial|换租清退、家居资产清点和长短租差别待补|
|其他房地产业及自有住房服务估算|gap|剩余统计范围待细核；估算租金不是雇佣劳动任务，不能按规模同比例生成任务|

### 房屋及共用设施现场查验与交接（CN-RE-HANDOVER）

开发经营/物业管理/中介单位的查验及交接；施工整改由施工单位完成时归建筑业，此处只记发单、复检和接收。

来源状态：source-backed。流程来源：CN-SVC-PROPERTY；职业来源：CN-SVC-OCC。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|CN-RE-HANDOVER-T01|准备|核对交付图纸设备清单及查验范围|资料缺项与责任方明确|CN-SVC-PROPERTY-handover|
|CN-RE-HANDOVER-T02|准备|清点查验工具并匹配设备条件〔待验证〕|量具状态和适用范围可核|CN-SVC-OCC-property|
|CN-RE-HANDOVER-T03|作业|现场核对公共部位配置与外观|部位编号对应图纸|CN-SVC-PROPERTY-handover|
|CN-RE-HANDOVER-T04|检测|试用并检测给排水电气及门窗设施|按授权测试且缺陷可定位|CN-SVC-PROPERTY-handover；CN-SVC-OCC-property|
|CN-RE-HANDOVER-T05|检测|核对表计钥匙与设备技术文件〔待验证〕|实物身份数量与文件一致|CN-SVC-PROPERTY-handover|
|CN-RE-HANDOVER-T06|交接|把查验缺陷移交建设维修责任方|位置现象和责任明确|CN-SVC-PROPERTY-handover|
|CN-RE-HANDOVER-T07|异常|登记未移交资料及不能试验设备|不将未查验写成合格|CN-SVC-PROPERTY-handover|
|CN-RE-HANDOVER-T08|返工|复检整改部位并核对闭环证据|原缺陷状态可追溯|CN-SVC-PROPERTY-handover|
|CN-RE-HANDOVER-T09|清洁维护|收回检测仪器并恢复受检部位〔待验证〕|测试临时状态消除且工具齐全|CN-SVC-OCC-property|
|CN-RE-HANDOVER-T10|交付|签认查验结果并移交房屋档案|双方确认范围和未决责任|CN-SVC-PROPERTY-handover|

场景缺口：

- 住宅、商业、工业物业的设备与交付标准不同；本阶段不设通用数值阈值
- 新房销售、二手经纪和住房租赁带看钥匙交付仍需专属合同/流程

### 物业自营巡检、维修派工与环境维护（CN-RE-OPERATE）

物业服务统计单位自营人员计入本组；独立保洁、保安、园林、电梯等专项服务按承包方主要活动归属，物业只记协调验收。

来源状态：source-backed。流程来源：CN-SVC-PROPERTY；职业来源：CN-SVC-OCC。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|CN-RE-OPERATE-T01|准备|编排设施巡检及环境服务任务|对象区域和责任明确|CN-SVC-OCC-property|
|CN-RE-OPERATE-T02|作业|巡视共用设备并记录运行状态|对象时间和异常可追溯|CN-SVC-OCC-property|
|CN-RE-OPERATE-T03|作业|按授权调整中央空调运行参数|调整在授权参数范围内|CN-SVC-OCC-property|
|CN-RE-OPERATE-T04|作业|清扫公共区域并收集散落垃圾〔待验证〕|通道可通行且未扩散污物|CN-SVC-OCC-property|
|CN-RE-OPERATE-T05|检测|核对报修部位与故障现象〔待验证〕|一般维修与专业维修边界明确|CN-SVC-OCC-property|
|CN-RE-OPERATE-T06|交接|向自营维修或专业承包方派工|执行单位与费用边界记录|CN-SVC-OCC-property|
|CN-RE-OPERATE-T07|异常|控制漏水停电等异常并通知相关方〔待验证〕|不越过人员资质和设备授权|CN-SVC-PROPERTY-operate|
|CN-RE-OPERATE-T08|作业|更换许可范围内耗材或小部件|规格匹配且拆装记录完整|CN-SVC-OCC-property|
|CN-RE-OPERATE-T09|检测|验证维修后功能与环境质量〔待验证〕|故障消除且无新增影响|CN-SVC-OCC-property|
|CN-RE-OPERATE-T10|返工|退回不合格维修并再次检验〔待验证〕|同一故障链保留完整|CN-SVC-PROPERTY-operate|
|CN-RE-OPERATE-T11|清洁维护|清洁保养服务工具及设备耗材|状态与库存变动记录|CN-SVC-OCC-property|
|CN-RE-OPERATE-T12|交付|向住户回告并交接未决工单|住户请求和处理结果对应|CN-SVC-OCC-property|

场景缺口：

- 承接后维护义务不是详细现场SOP；环境清洁和一般维修的动作拆分为研究提出，待正式专业流程
- 绿化、消防、电梯、二次供水和停车自营作业各需专项流程，不能由本表代表

行业缺口：

- 现有通用流程不能冻结房地产业任务清单

## 信息传输、软件和信息技术服务业（cn-information）

按场景 scope 核对执行单位与实体劳动边界。

|主要子行业或覆盖维度|状态|具体缺口|
|---|---|---|
|电信、广播电视和卫星传输服务|partial|广播电视传输、卫星地面站及海缆专属流程缺口|
|互联网及相关服务|partial|互联网平台知识工作边界明确；经营性数据中心实物设备流程尚需各类SOP|
|软件和信息技术服务|partial|现场系统集成与运维的经营主体归属待核；开发测试知识流程未按实体扩写|

### 通信线路、接入设备安装维护与故障恢复（CN-IN-LINE）

仅电信经营单位或经核定归信息服务的代维单位；新建通信土建/工程施工及独立终端修理按施工/维修单位归属，不能重复记在运营商。

来源状态：source-backed。流程来源：CN-SVC-NETWORK、CN-SVC-ICT2026；职业来源：CN-SVC-OCC。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|CN-IN-LINE-T01|准备|核对线路工单与现场作业许可|线路身份及作业权限明确|CN-SVC-ICT2026-change；CN-SVC-OCC-telecom|
|CN-IN-LINE-T02|准备|检查测试仪表备件及接入工具|规格状态符合任务|CN-SVC-OCC-telecom|
|CN-IN-LINE-T03|作业|敷设或调整授权范围内接入线缆|端口路由与标识一致|CN-SVC-OCC-telecom|
|CN-IN-LINE-T04|作业|安装配置通信终端或替换模块|资产端口和配置匹配|CN-SVC-OCC-telecom|
|CN-IN-LINE-T05|检测|测试传输质量及终端业务|对照该线路验收指标|CN-SVC-OCC-telecom|
|CN-IN-LINE-T06|交接|与网管协同割接并登记状态|现场与远端记录一致|CN-SVC-OCC-telecom；CN-SVC-ICT2026-change|
|CN-IN-LINE-T07|异常|定位线路告警并分派修复|避免未经定位反复更换|CN-SVC-OCC-telecom|
|CN-IN-LINE-T08|返工|重新接续或更换不合格连接|复测达到工单指标|CN-SVC-OCC-telecom|
|CN-IN-LINE-T09|清洁维护|清洁保养测试仪器及整理线缆现场〔待验证〕|工具完备且遗留影响清除|CN-SVC-OCC-telecom|
|CN-IN-LINE-T10|交付|开通验证业务并提交竣工记录|用户端与网管端确认一致|CN-SVC-OCC-telecom|

场景缺口：

- 光纤熔接、铜缆、无线天馈、海缆与卫星地面站差异尚未分成独立任务
- 高处/有限空间/带电作业必须按适用专门规程，盘点不是操作指导

### 数据中心及核心机房实体巡检、设备更换与交班（CN-IN-DC）

提供信息服务的经营单位机房；银行/工厂自营机房按雇主行业；设备供应商售后、独立机电维护按执行者主要活动核定。

来源状态：source-backed。流程来源：CN-SVC-ICT2026、CN-SVC-NETWORK；职业来源：CN-SVC-OCC。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|CN-IN-DC-T01|准备|核对机房资产工单及变更风险|设备业务影响及授权明确|CN-SVC-ICT2026-change|
|CN-IN-DC-T02|准备|准备可替换模块电源及维护工装|型号版本与资产对应|CN-SVC-ICT2026-change|
|CN-IN-DC-T03|作业|巡视供配电空调及动力环境设备|记录与指定测点对应|CN-SVC-OCC-telecom|
|CN-IN-DC-T04|作业|按批准工单更换故障模块和连接|序列号连接与配置可追溯|CN-SVC-ICT2026-change；CN-SVC-OCC-telecom|
|CN-IN-DC-T05|检测|测试电源空调及接地设施状态|现场适用指标已验证|CN-SVC-OCC-telecom|
|CN-IN-DC-T06|检测|验证业务倒换及备份恢复路径|回退条件和业务完整性确认|CN-SVC-ICT2026-change|
|CN-IN-DC-T07|交接|陪同代维并核对操作记录|执行者与授权范围对应|CN-SVC-NETWORK-operation|
|CN-IN-DC-T08|异常|处置供电温控告警并升级抢修|依据批准预案且状态可追踪|CN-SVC-OCC-telecom；CN-SVC-ICT2026-exception|
|CN-IN-DC-T09|返工|回退失败变更并复测〔待验证〕|原配置与恢复结果均留存|CN-SVC-ICT2026-change|
|CN-IN-DC-T10|清洁维护|清洁维护环境设备及更换许可耗材〔待验证〕|不引入新的运行干扰|CN-SVC-OCC-telecom|
|CN-IN-DC-T11|交付|更新设备台账并交接未决告警|资产状态与责任人明确|CN-SVC-ICT2026-exception；CN-SVC-OCC-network|

场景缺口：

- 服务器上架、介质擦除销毁、液冷泄漏与冷却液维护未有该场景专门SOP，不用一般运维规范冒充
- 仅使用2026通知与职业职责发现任务，具体机房设施验收阈值及实际采用未研究

行业缺口：

- 不能将本国职业同名人员全部视为信息行业就业，须按雇主主要活动确认

## 租赁和商务服务业（cn-business-services）

按场景 scope 核对执行单位与实体劳动边界。

|主要子行业或覆盖维度|状态|具体缺口|
|---|---|---|
|机械设备经营租赁|partial|汽车有流程+职责，其他设备仅职业路径|
|文体设备用品及日用品出租|partial|各品类清洁、检验与交接标准待补|
|组织管理、综合管理服务|gap|纯总部/投资管理等知识活动边界；自营收发室档案实物流程未取得|
|法律、咨询与调查|gap|纸质证据/档案交接以及现场调查未取得双源；不能用保安巡逻替代|
|广告业|gap|广告实物样品制作、布置拍摄任务需按制作承包方归属核对|
|人力资源服务|gap|派遣人员不能一律归客户或派遣方；须依据统计单位口径核雇主，不将其所有岗位重复展开|
|安全保护服务|partial|押运、专业安检与应急响应专属流程缺口|
|旅行社及相关服务|gap|票证材料、行李协调与导游现场服务待职业/旅行流程双源|
|其他商务服务（会展、包装、办公等）|partial|会展仅职业路径；包装服务、复印档案及其他未细分服务尚缺流程，不能当零任务|

### 无驾驶劳务的小微客车租赁取还周转（CN-BS-CAR）

经营租赁单位的车辆交接和自营整备；随车驾驶劳务不属此场景；独立修理厂维修另计，融资租赁须与金融类别分开。

来源状态：source-backed。流程来源：CN-SVC-RENT；职业来源：CN-SVC-OCC。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|CN-BS-CAR-T01|准备|核对订单承租身份与车辆适配|承租身份查验且车辆匹配|CN-SVC-RENT-service|
|CN-BS-CAR-T02|检测|检查交车安全功能和外观状态|功能及原损伤可追溯|CN-SVC-RENT-service|
|CN-BS-CAR-T03|作业|清洁车内外并准备随车物品|卫生及随车文件齐备|CN-SVC-RENT-service|
|CN-BS-CAR-T04|交接|展示车辆状态并交付钥匙文件|车辆身份与交车状态双方确认|CN-SVC-RENT-service；CN-SVC-OCC-rental|
|CN-BS-CAR-T05|异常|受理故障并安排救援换车|依合同执行且故障车状态标识|CN-SVC-RENT-service|
|CN-BS-CAR-T06|交接|接回车辆钥匙及随车物件|物件数量和变化可记录|CN-SVC-OCC-rental|
|CN-BS-CAR-T07|检测|复核还车损伤里程及燃能状态〔待验证〕|差异有原状态对照|CN-SVC-OCC-rental|
|CN-BS-CAR-T08|返工|将不合格车辆退整备并复验〔待验证〕|未复验不得改为可租|CN-SVC-RENT-service|
|CN-BS-CAR-T09|清洁维护|执行自营许可保养或交外修|执行者资质和车辆身份明确|CN-SVC-RENT-service|
|CN-BS-CAR-T10|交付|核对费用并更新可租状态|争议事项记录而非默认扣款|CN-SVC-RENT-records；CN-SVC-OCC-rental|

场景缺口：

- 充电/加油、调度挪车、异地还车和特定车型检查未展开；不能据此认定全租赁流程已穷尽

### 机械设备和耐用消费品租赁实物交接（CN-BS-EQUIP）

经营租赁交付及自营保管；带操作人员的工程机械服务须按实际活动核归建筑/运输等，客户使用时操作不计入出租方。

来源状态：proposed。流程来源：缺失；职业来源：CN-SVC-OCC。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|CN-BS-EQUIP-T01|准备|匹配租赁需求和资产附件清单|规格附件与承租用途一致|CN-SVC-OCC-rental|
|CN-BS-EQUIP-T02|作业|搬出并组配租赁物及附件〔待验证〕|资产身份及附件完整|CN-SVC-OCC-rental|
|CN-BS-EQUIP-T03|检测|检查功能损伤及必要防护件〔待验证〕|按该类设备规范确认状态|CN-SVC-OCC-rental|
|CN-BS-EQUIP-T04|交接|示范使用限制并签认实物|接收者与资产编号一致|CN-SVC-OCC-rental|
|CN-BS-EQUIP-T05|异常|受理损坏缺件并暂停受影响资产出租〔待验证〕|状态标识阻止误出库|CN-SVC-OCC-rental|
|CN-BS-EQUIP-T06|返工|补齐附件或委托修复后复检〔待验证〕|缺陷关闭且有责任凭据|CN-SVC-OCC-rental|
|CN-BS-EQUIP-T07|清洁维护|保养清洁并妥善储存归还资产|按品类保管且状态可查|CN-SVC-OCC-rental|
|CN-BS-EQUIP-T08|交付|更新租还记录及保管位置|资产账与实物一致|CN-SVC-OCC-rental|

场景缺口：

- 缺工程机械、医疗设备、办公设备与文娱用品分别适用的流程规范；仅职业路径已读，场景proposed

### 专业保安门禁、巡查及事件移交（CN-BS-GUARD）

保安服务企业对外服务；客户自招保安按客户行业，自营物业秩序维护按物业单位；押运另建场景，不能重复记在银行。

来源状态：source-backed。流程来源：CN-SVC-SECURITY；职业来源：CN-SVC-OCC。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|CN-BS-GUARD-T01|准备|核对当班区域钥匙及设备状态〔待验证〕|区域及未决事项明确|CN-SVC-SECURITY-manage|
|CN-BS-GUARD-T02|作业|查验证件并登记进出车辆物品|仅在授权范围查验|CN-SVC-SECURITY-service|
|CN-BS-GUARD-T03|作业|巡查指定区域并记录隐患|关键点状态可追溯|CN-SVC-SECURITY-service；CN-SVC-OCC-security|
|CN-BS-GUARD-T04|检测|核实报警画面及现场情况|不得把未核实报警写成安全|CN-SVC-SECURITY-service|
|CN-BS-GUARD-T05|交接|向有权限人员移交可疑事件|接收对象和证据完整|CN-SVC-SECURITY-service|
|CN-BS-GUARD-T06|异常|报告违法或危险事件并保护现场|不越权搜身或扣押财物|CN-SVC-SECURITY-service|
|CN-BS-GUARD-T07|返工|补巡遗漏点并纠正错误登记〔待验证〕|保留原始记录及更正原因|CN-SVC-SECURITY-manage|
|CN-BS-GUARD-T08|清洁维护|检查清洁通信及巡查工具〔待验证〕|设备故障已报修|CN-SVC-SECURITY-manage|
|CN-BS-GUARD-T09|交付|交班钥匙器材及未决事件〔待验证〕|物件数量事件状态一致|CN-SVC-SECURITY-manage|

场景缺口：

- 武装押运、人员安检及大型活动安全需各自流程；当前不按通用保安模板展开武装动作

### 会展场馆设备布置调试与撤收（CN-BS-EVENT）

会展经营单位的设施设备服务；外包搭建施工、酒店餐饮、交通接送分别归执行者，本组只记其委托接口。

来源状态：proposed。流程来源：缺失；职业来源：CN-SVC-OCC。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|CN-BS-EVENT-T01|准备|核对场地排期设备清单与布置图|区域时间和设备需求明确|CN-SVC-OCC-exhibition|
|CN-BS-EVENT-T02|作业|布置会场家具标识和租用设备〔待验证〕|符合批准图且不阻断通道|CN-SVC-OCC-exhibition|
|CN-BS-EVENT-T03|检测|调试会展设备并检查场馆隐患|功能满足活动要求且隐患有处置|CN-SVC-OCC-exhibition|
|CN-BS-EVENT-T04|交接|向主办方交接场地设备与使用要求〔待验证〕|资产身份和责任明确|CN-SVC-OCC-exhibition|
|CN-BS-EVENT-T05|异常|处理设备故障并移交突发事件|活动影响与临时状态可查|CN-SVC-OCC-exhibition|
|CN-BS-EVENT-T06|返工|重布或复调未达要求设施〔待验证〕|原缺陷关闭且不影响其他区域|CN-SVC-OCC-exhibition|
|CN-BS-EVENT-T07|清洁维护|撤收清洁设备并归还仓储〔待验证〕|件数状态与出库一致|CN-SVC-OCC-exhibition|
|CN-BS-EVENT-T08|交付|完成场地归还及损耗确认〔待验证〕|场馆设备损耗有确认依据|CN-SVC-OCC-exhibition|

场景缺口：

- 官方职业职责已读；主办方/场馆会展安全和撤展SOP第二来源尚缺，场景proposed

行业缺口：

- 独立建筑清洁一般不自动归租赁商务；按最新统计分类与雇主活动核定，不能把客户所有外包服务汇总到本行业

## 已读取来源与定位

### CN-SVC-HYG

[住宿业卫生规范（2007年附件）](https://dcj.mofcom.gov.cn/article/bh/200703/20070304421014.shtml) — 卫生部/商务部。发布日期：未知；读取：2026-09-09。版本：2007年旧规范；本轮作为流程发现材料，现行适用性待正式标准复核

- CN-SVC-HYG-records：第二十七条 记录管理：用品采购、清洗消毒、维护、检查与异常处理记录；读取状态 indexed-section-text-read。
- CN-SVC-HYG-rooms：第二十九条 环境卫生管理：客房、布草、公共用品及废弃物；读取状态 indexed-section-text-read。

访问限制：官方搜索索引正文已读；直接访问TLS失败，未宣称全文重取

### CN-SVC-HOTEL

[旅店服务员国家职业标准（征求意见稿）](https://www.osta.org.cn/zcwj/attachment/20230830_08.pdf) — 中国就业培训技术指导中心/技能人才评价工作网。发布日期：未知；读取：2026-09-09。版本：2023公示路径中的征求意见稿；仅职责参考，未确认生效

- CN-SVC-HOTEL-rooms：PDF第9—11页，3.1/3.2客房清扫、递送、消毒、检查与整理；读取状态 read。
- CN-SVC-HOTEL-front：PDF第11—13页，预订、行李、入住、送餐、结账；读取状态 read。
- CN-SVC-HOTEL-meeting：PDF第13—15页，会场、夜床、酒水、陈设；读取状态 read。

### CN-SVC-FOOD

[餐饮服务食品安全操作规范（2018年修订）](https://scjgj.cq.gov.cn/zz/jjq/zwgk/fdzdgknr_146781/jdjc_146793/spyp/202104/t20210409_9112102.html) — 国家市场监督管理总局；重庆市市场监管局转载。发布日期：2018-06-22；读取：2026-09-09。版本：2018版，发布公告明确2018-10-01实施；本轮不把规范年限当部署时间

- CN-SVC-FOOD-procure：原料采购、运输、验收与贮存相关条款；读取状态 read。
- CN-SVC-FOOD-cook：第7章加工制作：粗加工、烹饪、再加热、食品留样；读取状态 read。
- CN-SVC-FOOD-serve：供餐与配送相关条款；读取状态 read。
- CN-SVC-FOOD-clean：清洗消毒、保洁及废弃物处理相关条款；读取状态 read。

### CN-SVC-COOK

[中式烹调师职业画像](https://chinajob.mohrss.gov.cn/c/2022-06-08/352032.shtml) — 中国就业培训技术指导中心。发布日期：2022-06-08；读取：2026-09-09。

- CN-SVC-COOK-tasks：主要工作任务1—11：原料、净料、切配、预熟、调味、热菜、冷菜、装盘；读取状态 read。

### CN-SVC-WAITER

[餐厅服务员国家职业技能标准（2020年版）](https://www.osta.org.cn/api/sys/downloadFile/decrypt?fileName=4eNsZIOv3WFNDfbnldJHeA%2F2024%2F4%2F30%2Fedd9e20d4cc443558711001a18ccbbf3.pdf) — 人力资源和社会保障部/技能人才评价工作网。发布日期：未知；读取：2026-09-09。版本：2020年版；单独发布日期未核，下载接口content-type异常但PDF已读取

- CN-SVC-WAITER-prepare：PDF第11页，3.1餐前准备与接待；读取状态 read。
- CN-SVC-WAITER-service：PDF第12—15页，餐中服务、餐后整理及更高等级服务；读取状态 read。

### CN-SVC-OCC

[中华人民共和国职业分类大典（2022年版）](https://srsj.cngy.gov.cn/Files/UploadFile/SiteFile/20160720104022026/2026/04/14/8a8384d8e7d34d90b1a8e191a4f585cb.pdf) — 人力资源社会保障部等编制；广元市人社局公开。发布日期：未知；读取：2026-09-09。版本：2022年版；官网转载单独日期未知；职业定义不决定雇主行业、不提供工时

- CN-SVC-OCC-bank：PDF第219—220页：4-05-01-01银行综合柜员、4-05-01-04信用卡业务员；读取状态 read。
- CN-SVC-OCC-insurance：PDF第221页：4-05-03-03保险公估人；读取状态 read。
- CN-SVC-OCC-property：PDF第223页：物业管理师、中央空调系统运行操作员；第224—225页房地产经纪人、验房师；读取状态 read。
- CN-SVC-OCC-rental：PDF第225—226页：4-07-01-01租赁业务员；读取状态 read。
- CN-SVC-OCC-security：PDF第232页：4-07-05-01保安员及安检员；读取状态 read。
- CN-SVC-OCC-exhibition：PDF第234页：4-07-07-01会展服务师；读取状态 read。
- CN-SVC-OCC-telecom：PDF第211—212页：网络机务、线务、动力及测量职业；读取状态 read。
- CN-SVC-OCC-network：PDF第214页：网络运行管理员、信息化系统管理员；读取状态 read。

### CN-SVC-CASH

[中国人民银行货币鉴别及假币收缴、鉴定管理办法](https://www.pbc.gov.cn/zhengwugongkai/attachDir/2025/11/2025111914465162248.pdf) — 中国人民银行。发布日期：2019-10-16；读取：2026-09-09。版本：2019令第3号，2020-04-01施行；官网当前提供文本；不引用已废止2009通知

- CN-SVC-CASH-identify：PDF第3—4页第8—13条：鉴别、机具、冠字号码、误收误付；读取状态 read。
- CN-SVC-CASH-custody：PDF第5—6页第14—19条：收缴、封装、登记、解缴；读取状态 read。
- CN-SVC-CASH-internal：PDF第10页第30—32条：内部规范与自查；读取状态 read。

### CN-SVC-PROPERTY

[物业承接查验办法](https://jsj.yueyang.gov.cn/54027/54028/54042/content_1396022.html) — 住房和城乡建设部；岳阳市房产局转载。发布日期：2012-06-18；读取：2026-09-09。版本：旧办法转载日期；作为流程资料使用，现行地方细则和合同要求待核，不声称2026新规

- CN-SVC-PROPERTY-handover：第13—20条：查验方案、资料、现场检查、结果和整改；读取状态 read。
- CN-SVC-PROPERTY-operate：第33—34条：隐蔽工程修复责任与承接后维护义务；读取状态 read。

### CN-SVC-NETWORK

[关于印发电信网络运行监督管理办法的通知](https://wap.miit.gov.cn/jgsj/xgj/gzzd/art/2020/art_01e36db302234d8b8b460e92a9889540.html) — 工业和信息化部。发布日期：未知；读取：2026-09-09。版本：2009年办法；页面迁移年月不作为发布日；现行具体企业SOP未取得

- CN-SVC-NETWORK-operation：第二章电信网络运行维护，第15条外包资质、保密、操作记录及评价；事故预防报告处理各章；读取状态 read。

### CN-SVC-ICT2026

[关于做好2026年信息通信业安全生产和网络运行安全工作的通知](https://www.miit.gov.cn/jgsj/xgj/wjfb/art/2026/art_2abb2e88da574f41869dbb61a062eebe.html) — 工业和信息化部办公厅。发布日期：2026-03-23；读取：2026-09-09。

- CN-SVC-ICT2026-change：二（三）专项风险评估；二（四）倒换备份测试、变更和备件更换；读取状态 read。
- CN-SVC-ICT2026-field：二（五）危险作业、锂电池/供电线路隐患及代维管理；读取状态 read。
- CN-SVC-ICT2026-exception：二（六）抢修应急；二（七）巡查、整改及评估验收；读取状态 read。

### CN-SVC-RENT

[小微型客车租赁经营服务管理办法（2021修正）](https://xxgk.mot.gov.cn/2020/jigou/fgs/202108/t20210825_3616598.html) — 交通运输部。发布日期：2021-08-25；读取：2026-09-09。版本：2021年第17号修正文本，非2020未修正页

- CN-SVC-RENT-service：第二章第11—14条：安全卫生、交付、检测维护、救援换车、身份查验；读取状态 read。
- CN-SVC-RENT-records：第12条经营档案；第17条投诉；读取状态 read。

### CN-SVC-SECURITY

[保安服务管理条例](https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2023/art_d6183810037a43c88fca676b346ca190.html) — 国务院；市场监管总局法规库。发布日期：未知；读取：2026-09-09。版本：官网所载修订文本；本轮不引用处罚金额和行政权限数值

- CN-SVC-SECURITY-service：第五章保安服务，第29—30条查验、巡逻、报警监控、保护现场及禁止行为；读取状态 read。
- CN-SVC-SECURITY-manage：第36条管理制度、岗位责任及紧急情况预案；读取状态 read。

## 后续工作

- 先补齐各子行业的流程规范、异常与清洁维护分支，并核对实际执行者，复核去重后才冻结清单。
- 对每个候选任务分别检索传统设备、专机、机器人和辅助工具，以及失败、退出、未采用和残留人工证据。
- 当前没有工时、成本、采用率和回收期结论；参数不足时保留缺口，不能用职业任务描述代替测时或现金流。

