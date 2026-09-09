# 美国服务行业候选任务盘点

数据源：`us-services.json`。读取截至 2026-09-09，状态为 **partial-task-inventory**，待独立复核。

本轮登记 6 个行业、16 个场景、168 个候选任务。全部自动化研究状态为 **not-started**。这不是全行业研究完成或任务清单冻结；每个行业的子行业缺口均保留。

`source-backed` 只表示动作或场景有可定位资料支持。输入、输出和验收由研究者用于界定任务，尚需现场 SOP 确认；它不证明当前部署、工时、经济收益或行业普遍采用。

子行业登记数是本轮覆盖清单的条目数，不是官方分类总数或增加值覆盖率。

|行业|场景|候选任务|子行业登记|部分覆盖|缺口|非就业任务项|
|---|---:|---:|---:|---:|---:|---:|
|金融和保险|2|20|4|2|2|0|
|房地产、租赁和租借|3|30|6|3|2|1|
|专业、科学和技术服务|3|33|9|3|6|0|
|零售业|3|31|9|8|1|0|
|批发业|2|22|10|7|3|0|
|信息业|3|32|6|3|3|0|

## 统计归属与适用边界

按执行单位的主要活动归属；自营与外包分开，不能把客户的付款重复当成客户行业的人工。职业来源只能说明动作，不能说明该动作在哪个行业占多少工时。来源发布日期未知保留空值，转载、修订、征求意见稿和历史案例分别说明。

## 金融和保险（us-finance）

按场景 scope 核对执行单位与实体劳动边界。

|主要子行业或覆盖维度|状态|具体缺口|
|---|---|---|
|Federal Reserve banks / credit intermediation|partial|央行现金后台、各类存贷机构ATM金库及抵押查验待专属流程|
|Securities and other financial investments|gap|纸质/实物证券保管及其他实物托管缺口；不将电子交易改写机械任务|
|Insurance carriers and related activities|partial|仅财产查勘影像部分，险种专属流程仍缺|
|Funds, trusts and other financial vehicles|gap|主业为资产权利与知识流程；其不动产实际服务不可与房地产运营重复计|

### 银行收付、整点与准备现金入库（US-FI-CASH）

美国金融机构自营现金柜面；外包押运现金保管按承包方行业另计，银行只计接收/移交。

来源状态：source-backed。流程来源：US-SVC-FEDCASH；职业来源：US-SVC-TELLER。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|US-FI-CASH-T01|准备|核对现金抽屉及票据期初余额|实物与开班余额一致|US-SVC-TELLER-tasks|
|US-FI-CASH-T02|作业|清点客户现金及核对存款单|币种数量与凭据一致|US-SVC-TELLER-tasks|
|US-FI-CASH-T03|检测|检验钞币真伪及物理状态|污染与严重毁损不混普通入库|US-SVC-FEDCASH-prepare；US-SVC-FEDCASH-exception|
|US-FI-CASH-T04|作业|按交易授权付现金并出具收据|金额账户及实物一致|US-SVC-TELLER-tasks|
|US-FI-CASH-T05|作业|整平钞券并去除夹杂固定物|不夹硬币或其他物品|US-SVC-FEDCASH-prepare|
|US-FI-CASH-T06|作业|按券别扎把捆包并标识核验信息|符合对应包装规则|US-SVC-FEDCASH-prepare|
|US-FI-CASH-T07|交接|核对押运交存实物及清单|金额标识与实物对应|US-SVC-TELLER-tasks|
|US-FI-CASH-T08|异常|隔离污染钞币并联系适用接收渠道|先确认渠道再交存|US-SVC-FEDCASH-exception|
|US-FI-CASH-T09|返工|复点并纠正不合规包装和账差〔待验证〕|更正可追溯且未掩盖差额|US-SVC-FEDCASH-prepare|
|US-FI-CASH-T10|清洁维护|清理机具作业区并报修卡钞设备〔待验证〕|按机具说明处理且不遗失现金|US-SVC-TELLER-tasks|
|US-FI-CASH-T11|交付|平衡现金票据余额并移交班次|余额与未决差异同时交接|US-SVC-TELLER-tasks|

场景缺口：

- 硬币、ATM及金库专门任务尚未完整拆；工作区维护仅研究提出
- 未使用FedCash包装单位推算银行员工速度或现金处理量

### 财产保险现场查勘与影像证据交付（US-FI-LOSS）

美国保险承保者或保险相关服务单位；第三方承包修理不归保险；FEMA材料仅用于NFIP照片流程，不外推其他险种技术阈值。

来源状态：source-backed。流程来源：US-SVC-FEMA；职业来源：US-SVC-CLAIMS。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|US-FI-LOSS-T01|准备|核对保单标的查勘权限与资料|案号标的与任务一致|US-SVC-CLAIMS-tasks|
|US-FI-LOSS-T02|作业|查看受损及未受损财产并拍照|足以辨识损害或无损害|US-SVC-FEMA-photos|
|US-FI-LOSS-T03|作业|标注照片日期位置和损害描述|可回到具体房间和时点|US-SVC-FEMA-photos|
|US-FI-LOSS-T04|检测|核验影像质量及标的对应关系|模糊或错位证据被标识|US-SVC-FEMA-photos|
|US-FI-LOSS-T05|交接|向理赔审查方移交物证及影像清单〔待验证〕|案号和资料来源完整|US-SVC-CLAIMS-tasks|
|US-FI-LOSS-T06|异常|登记不安全或无法进入部位〔待验证〕|未进入部位不视作已检查|US-SVC-CLAIMS-tasks|
|US-FI-LOSS-T07|返工|重拍缺失或不清晰部位|新旧证据均保留|US-SVC-FEMA-photos|
|US-FI-LOSS-T08|清洁维护|检查并整理现场测量和摄录工具〔待验证〕|器材完整且资料妥善保管|US-SVC-CLAIMS-tasks|
|US-FI-LOSS-T09|交付|完成事实记录供授权理赔决定|事实和责任判断分开|US-SVC-CLAIMS-tasks|

场景缺口：

- NFIP全手册尚未逐章读取，照片仅覆盖查勘部分
- 健康、人寿、机动车以及再保险大部分知识流程未当实体任务生成

行业缺口：

- 所有自动化证据研究尚未开始

## 房地产、租赁和租借（us-real-estate）

按物业经营/管理统计单位的自营巡检和小修归入美国房地产；独立清洁公司、专业维修承包商的执行工时归其本行业，本处仅保留委托、验收、钥匙交接。自有住房虚拟租金不是可直接换算的雇佣劳动。

|主要子行业或覆盖维度|状态|具体缺口|
|---|---|---|
|不动产出租与房地产管理|partial|住房漏水与一般自营维护已有候选；商业/工业不动产及土地管理仍缺完整SOP。|
|房地产代理、经纪与其他房地产相关活动|gap|看房、现场测量、估价勘查与钥匙管理需本国经纪/估价职业和作业规范；财务交易不默认拆成实体任务。|
|机动车出租|partial|交付归还与召回分支；清洗、加油充电、调车和救援工序待补。|
|消费用品及商业工业设备租赁|partial|仅泛租赁职责，分设备SOP及履约单位仍缺。|
|无形资产出租|gap|主要为许可与合同知识工作；实物档案等支持任务须证实规模和执行单位，不能虚构实体生产。|
|自有住房服务归算|not-an-employment-task|BEA房地产增加值含归算住房服务，规模不能等同物业可自动化工时。|

### 物业漏水巡检、工单维修与空间交接（US-RE-PROPERTY）

按物业经营/管理统计单位的自营巡检和小修归入美国房地产；独立清洁公司、专业维修承包商的执行工时归其本行业，本处仅保留委托、验收、钥匙交接。自有住房虚拟租金不是可直接换算的雇佣劳动。

来源状态：source-backed。流程来源：US-SVC-HUD；职业来源：US-SVC-PROPERTY、US-SVC-MAINT。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|US-RE-PROPERTY-T01|准备|核对房间访问授权与报修位置〔待验证〕|进入权限及目标房间一致|US-SVC-PROPERTY-tasks|
|US-RE-PROPERTY-T02|准备|检查巡检工具与待用维修材料|工具状态及适用材料经检查|US-SVC-MAINT-tasks|
|US-RE-PROPERTY-T03|作业|查看屋内水迹和门窗渗漏证据|区分活动漏水与历史水迹并记录依据|US-SVC-HUD-inspection|
|US-RE-PROPERTY-T04|作业|观察可接近管道接口和供水器具|检查对象及可见状态有记录|US-SVC-HUD-inspection|
|US-RE-PROPERTY-T05|交接|向住户或业主代理核实漏水及维修经过|陈述对象时间与观察证据分开保存|US-SVC-HUD-inspection|
|US-RE-PROPERTY-T06|检测|诊断自营设备故障并界定小修范围|故障可复现或注明无法复现|US-SVC-MAINT-tasks|
|US-RE-PROPERTY-T07|异常|隔离待处置问题并联系专业承包商〔待验证〕|责任单位及后续联络清楚|US-SVC-PROPERTY-tasks|
|US-RE-PROPERTY-T08|作业|更换许可范围内损坏的小部件|材料和操作符合物业批准的维修规程|US-SVC-MAINT-tasks|
|US-RE-PROPERTY-T09|返工|重新处理复检未合格的维修点〔待验证〕|再次检查达到工单要求|US-SVC-MAINT-tasks|
|US-RE-PROPERTY-T10|清洁维护|清洁公共空间并保养自营设备|作业范围及遗留问题有记录|US-SVC-PROPERTY-tasks；US-SVC-MAINT-tasks|
|US-RE-PROPERTY-T11|检测|检查承包商交回的维修范围〔待验证〕|对照委托范围核对并保留未解决问题|US-SVC-PROPERTY-tasks|
|US-RE-PROPERTY-T12|交付|移交空间钥匙和维修记录〔待验证〕|对象、钥匙数量和待办项一致|US-SVC-PROPERTY-tasks|

场景缺口：

- HUD流程只支持适用住房漏水检查；其他商业建筑设备、消防、电梯、园林、除雪和搬入搬出全套SOP待补。
- 独立物业清洁与自营维护须先核雇主、合同和统计单位；职业任务不证明工时。

### 租车领取、归还和召回状态拦截（US-RE-CAR）

美国机动车无驾驶员租赁经营单位内交付、接收与可用性检查；外包修理/清洗由实际承包单位核算，不将同一工时重复分配给出租企业。

来源状态：source-backed。流程来源：US-SVC-RECALL；职业来源：US-SVC-RENTAL。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|US-RE-CAR-T01|准备|核对车辆预订与客户取车资料|客户、车辆类别和期间对应|US-SVC-RENTAL-tasks|
|US-RE-CAR-T02|准备|核查拟交车辆的召回和可出租状态|未解决召回按适用要求阻断出租|US-SVC-RECALL-recall|
|US-RE-CAR-T03|作业|检查待交车辆外观与配置|原有损伤与配置可追溯|US-SVC-RENTAL-tasks|
|US-RE-CAR-T04|交接|向客户交付车辆与租赁文件|车辆身份与客户签收相符|US-SVC-RENTAL-tasks|
|US-RE-CAR-T05|作业|接收归还车辆并核对归还情况|归还物品及车辆状态登记完整|US-SVC-RENTAL-tasks|
|US-RE-CAR-T06|检测|检查归还车辆损伤和需维修事项|新旧损伤按证据区分|US-SVC-RENTAL-tasks|
|US-RE-CAR-T07|异常|阻断召回车辆继续预订并转补救|受影响车辆与预约限制对应|US-SVC-RECALL-recall|
|US-RE-CAR-T08|返工|复核维修或召回补救后车辆状态|只有符合放行条件的车辆恢复可用|US-SVC-RECALL-recall|
|US-RE-CAR-T09|清洁维护|整理归还车辆的待清洁待修队列〔待验证〕|可用车与待处理车区分明确|US-SVC-RENTAL-tasks|
|US-RE-CAR-T10|交付|结清租赁记录并更新车辆可用性|车辆状态与实际去向一致|US-SVC-RENTAL-tasks|

场景缺口：

- 清洗、加油/充电、拖救及维修的美国出租企业具体流程与承包关系待补。
- 召回来源为2023历史案例，不证明2026该企业状态；营收与工时均未估算。

### 工具、设备和用品租出回收（US-RE-EQUIP）

美国非机动车设备及消费用品的无操作员出租单位；带操作员设备服务按实际主要活动另分类。职业职责为泛租赁，具体设备技术流程尚需逐类补齐。

来源状态：proposed。流程来源：缺失；职业来源：US-SVC-RENTAL。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|US-RE-EQUIP-T01|准备|识别租赁需求与可用物品|规格与用途限制已核对|US-SVC-RENTAL-tasks|
|US-RE-EQUIP-T02|作业|检查并调整拟出租物品|可见缺损与调节结果有记录|US-SVC-RENTAL-tasks|
|US-RE-EQUIP-T03|交接|演示物品使用并办理签收|客户收到对应物品及使用说明|US-SVC-RENTAL-tasks|
|US-RE-EQUIP-T04|检测|核对归还物品完整性与损坏|附件及损坏状态逐项核对|US-SVC-RENTAL-tasks|
|US-RE-EQUIP-T05|异常|标记缺件或损坏物品并停止再出租〔待验证〕|问题物品不混入待出租库位|US-SVC-RENTAL-tasks|
|US-RE-EQUIP-T06|返工|补齐附件并复核重新出租条件〔待验证〕|附件齐全且检查结果可追溯|US-SVC-RENTAL-tasks|
|US-RE-EQUIP-T07|清洁维护|清洁整理归还物品和存放位置〔待验证〕|遵守对应器具清洁保养要求|US-SVC-RENTAL-tasks|
|US-RE-EQUIP-T08|交付|更新租赁结算与库存可用记录|物品编号、去向和状态一致|US-SVC-RENTAL-tasks|

场景缺口：

- 未取得美国建筑设备、农业设备、医疗设备及消费用品分别适用的操作规范；本场景为职业职责支持的候选流程。
- 不得用小工具出租任务替代整个租赁行业；设备维修安全规程和是否带操作员需逐类调查。

行业缺口：

- 尚未完成全部细分租赁物品与各类不动产完整任务盘点；不冻结行业清单。

## 专业、科学和技术服务（us-professional）

优先盘点检测实验室、外业测量、兽医服务的实体操作；法律、会计、咨询、软件设计等主要知识工作只在支持现场实体交付时登记必要数字动作，不能人为转化为实体工时。

|主要子行业或覆盖维度|状态|具体缺口|
|---|---|---|
|法律服务|gap|庭审/档案递送、实物证据保管等支持作业需实际执行单位和流程证据；法律分析不属于本次实体主线。|
|会计、税务和记账服务|gap|主要知识与数字工作；纸质凭证处理是否有规模和独立执行任务待实证，不能从行业增加值推算。|
|建筑、工程、测量与检测服务|partial|已覆盖实验室与测量候选；工程现场检查、地质勘探、环境采样等作业SOP待补。|
|专业设计服务|gap|模型打样、材料样板布置与现场安装是否由本企业执行待核；制造外包不重复归入设计单位。|
|计算机系统设计及相关服务|gap|现场安装迁移的合同和主活动分类待核；纯软件开发不作为实体任务。|
|管理、科学及技术咨询|gap|现场实物盘点、计量等支持作业需证明由咨询单位执行；知识交付不强行实体化。|
|科学研究与开发服务|partial|仅通用实验样品链参考；生命科学、物理工程、社会科学的专门流程未覆盖，不能以化学检测替代研发。|
|广告、公关和市场研究|gap|实物展示与现场调查设备作业、媒体制作分工及雇主待核；广告策略/数字投放不属实体主线。|
|其他专业科学技术服务|partial|兽医服务已有候选；摄影现场器材/布景、翻译及其他细分覆盖不足。|

### 检测样品从接收到报告与处置（US-PR-LAB）

私人检测实验室作为专业科学技术服务执行单位的收样、制样、检测与报告支持流程。FDA实验室只作为美国流程参考，政府实验室工时不转归私人行业；制造企业内部检测也不能重复归入本行业。

来源状态：source-backed。流程来源：US-SVC-FDALAB；职业来源：US-SVC-CHEM。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|US-PR-LAB-T01|准备|核对委托项目与样品接收条件|项目和样品要求可对应|US-SVC-FDALAB-sample|
|US-PR-LAB-T02|作业|检查送达样品并建立唯一标识|实物、编号、送检信息匹配|US-SVC-FDALAB-sample|
|US-PR-LAB-T03|交接|登记样品在接收区与分析区的转移|转移对象和接收去向连续|US-SVC-FDALAB-sample|
|US-PR-LAB-T04|作业|按方法要求分取和制备试验样品|分样身份、处理步骤和条件可追溯|US-SVC-FDALAB-sample；US-SVC-CHEM-tasks|
|US-PR-LAB-T05|准备|配制试剂并核对设备适用状态|对应方法的试剂与设备记录齐全|US-SVC-CHEM-tasks；US-SVC-FDALAB-equipment|
|US-PR-LAB-T06|作业|操作仪器对分样实施测定|数据关联样品及操作条件|US-SVC-CHEM-tasks|
|US-PR-LAB-T07|检测|实施质控样和设备功能检查|与批准质控条件比对且异常有记录|US-SVC-FDALAB-quality|
|US-PR-LAB-T08|异常|隔离接收偏差样品并联系委托方|分析前取得必要确认并保留偏差|US-SVC-FDALAB-sample|
|US-PR-LAB-T09|异常|停止不符合工作并评估已发结果影响|责任人及需要通知的结果已识别|US-SVC-FDALAB-exception；US-SVC-FDALAB-equipment|
|US-PR-LAB-T10|返工|依授权重新制样或复测并保留原记录〔待验证〕|复测依据与原始数据均保留|US-SVC-FDALAB-exception；US-SVC-FDALAB-quality|
|US-PR-LAB-T11|清洁维护|清洁仪器器皿并记录设备维护|后续使用状态经确认|US-SVC-CHEM-tasks；US-SVC-FDALAB-equipment|
|US-PR-LAB-T12|作业|按要求保存或处置剩余样品|样品完整性与去向可追溯|US-SVC-FDALAB-sample|
|US-PR-LAB-T13|交付|复核并授权签发检测报告|报告与样品、方法及原记录关联|US-SVC-FDALAB-quality|

场景缺口：

- FDA政府流程不能证明私人实验室采用；行业场景仍需商业实验室SOP交叉验证。
- 材料力学、环境、微生物及校准等细分所用操作对象不同；本场景不覆盖全部检测，更不代替研发全流程。

### 测量标志查找、外业观测与成果交接（US-PR-SURVEY）

美国专业测量服务单位的实地控制点识别、测量与记录工作；建筑承包单位自身放线须归建筑业，不能按职业名称重复计入专业服务。

来源状态：source-backed。流程来源：US-SVC-NGS；职业来源：US-SVC-SURVEY。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|US-PR-SURVEY-T01|准备|查阅目标测量标志的描述和既有编号|目标位置和标志身份可核对|US-SVC-NGS-recovery|
|US-PR-SURVEY-T02|准备|检查携行测量仪器和记录介质|设备与测量任务相符|US-SVC-SURVEY-tasks|
|US-PR-SURVEY-T03|作业|现场寻找并辨认目标测量标志|刻印、位置和描述相互对应|US-SVC-NGS-recovery|
|US-PR-SURVEY-T04|作业|架设仪器并观测角度距离高程|观测对象与仪器记录对应|US-SVC-SURVEY-tasks|
|US-PR-SURVEY-T05|交接|传递控制点身份与现场观测记录〔待验证〕|交接版本、位置和观测编号一致|US-SVC-SURVEY-tasks|
|US-PR-SURVEY-T06|检测|核对观测数据并计算闭合等检查结果|采用项目规定的检查方法及限差|US-SVC-SURVEY-tasks|
|US-PR-SURVEY-T07|异常|登记受损缺失或无法确认的测量标志|不把未找到直接判为已毁|US-SVC-NGS-recovery|
|US-PR-SURVEY-T08|返工|重新查找身份存疑标志或补充观测〔待验证〕|原记录保留且改动依据清楚|US-SVC-SURVEY-tasks；US-SVC-NGS-recovery|
|US-PR-SURVEY-T09|清洁维护|整理保护外业仪器和现场物件〔待验证〕|器材完整且现场遗留物已检查|US-SVC-SURVEY-tasks|
|US-PR-SURVEY-T10|交付|提交标志状态及项目测量成果|标志ID、描述与成果版本对应|US-SVC-NGS-recovery；US-SVC-SURVEY-tasks|

场景缺口：

- NGS文件覆盖标志恢复与提交，不是所有项目的测量规范；GNSS、地籍、水文测量、航摄和地下探测等须补专门流程。
- 清洁维护和不合格观测返工条件是研究定义，需美国项目SOP确认。

### 动物检查辅助、标本送检和诊室周转（US-PR-VET）

美国兽医服务机构的动物检查辅助、标本采集送检与诊室恢复；兽医服务属于专业科学技术服务边界。政府动物防疫、农场自营及独立实验室各按实际执行单位，不由服务对象归类。

来源状态：source-backed。流程来源：US-SVC-VETSUBMIT；职业来源：US-SVC-VET。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|US-PR-VET-T01|准备|核对动物身份、检查请求与所需标本|动物和检查项目对应|US-SVC-VET-tasks；US-SVC-VETSUBMIT-submit|
|US-PR-VET-T02|准备|向接收实验室确认标本采送要求|种类、条件和所需表单已确认|US-SVC-VETSUBMIT-submit|
|US-PR-VET-T03|作业|按授权辅助保定动物并完成检查准备|操作者资质、动物状态和项目相符|US-SVC-VET-tasks|
|US-PR-VET-T04|作业|采集并标识授权检验所需标本|动物、标本和委托信息可追溯|US-SVC-VET-tasks；US-SVC-VETSUBMIT-submit|
|US-PR-VET-T05|检测|核对标本质量与送检单一致性|符合接收实验室要求或记录差异|US-SVC-VETSUBMIT-submit|
|US-PR-VET-T06|交接|包装标本并办理运送交接|包装标识及接收去向按当前要求核对|US-SVC-VETSUBMIT-submit|
|US-PR-VET-T07|异常|登记不符合送检要求的标本并求证〔待验证〕|未自行补写不确定身份|US-SVC-VETSUBMIT-submit|
|US-PR-VET-T08|返工|依兽医和实验室指令重新准备标本〔待验证〕|补做原因和原记录关联|US-SVC-VETSUBMIT-submit|
|US-PR-VET-T09|清洁维护|清洁消毒诊室器械并整理耗材|遵循适用器械和机构清洁要求|US-SVC-VET-tasks|
|US-PR-VET-T10|交付|记录动物状态并移交照护和检验信息|信息交至有权限的接收者|US-SVC-VET-tasks|

场景缺口：

- 外科、麻醉监护、牙科、影像、住院护理、畜群出诊等主要兽医实体流程仍需单独展开。
- 未使用诊疗参数或治疗建议；各州资格、具体生物安全和运输条件待逐场景核查。

行业缺口：

- 当前为三个实体流程的候选清单，不能声称整个专业服务行业完成研究或自动化检索。

## 零售业（us-retail）

美国零售经营单位内接货、补货和销售交付；批发商自有仓、第三方物流及供应商驻店执行活动须根据雇主和统计单位区分，客户零售单位不重复计入外包作业工时。

|主要子行业或覆盖维度|状态|具体缺口|
|---|---|---|
|机动车及零部件零售|partial|泛销售/交接不足以覆盖试驾、整备、配件适配与车辆交付；经销商内修理与独立修理需区分。|
|家具、家居用品、电子和电器零售|partial|大件搬运、演示安装、旧机回收及售后拆检待专门流程。|
|建筑材料、园林设备及用品零售|partial|切割配料、散装装载、植物照护与危险材料分区待补。|
|食品和饮料零售|partial|补货和前端为候选；冷链、鲜切、烘焙、熟食、肉类加工清洁流程未覆盖。|
|健康与个人护理商品零售|partial|处方调剂、受控品、验配等任务需职业和药品/器械规程，不能用一般收银代替。|
|加油站及燃料零售|gap|油品收卸、储罐/加注设备巡检、加油与事故处置需独立美国流程。|
|服装、配饰、运动、文娱和书刊等专业零售|partial|试穿整理、修配、定制与器材调试等差异尚未逐类展开。|
|综合商品零售|partial|通用流程候选；店内专业服务及全品类异常待补。|
|其他店铺及非店铺/电商履约形态|partial|按商品与经营单位主活动分类，非店铺只是覆盖维度不另计排名；上门、自动售货补货等专门流程待补。|

### 门店到货、后仓入位与货架补货（US-RT-STOCK）

美国零售经营单位内接货、补货和销售交付；批发商自有仓、第三方物流及供应商驻店执行活动须根据雇主和统计单位区分，客户零售单位不重复计入外包作业工时。

来源状态：source-backed；流程资料读取范围：partial-indexed-page。流程来源：US-SVC-GROCERY；职业来源：US-SVC-STOCK。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|US-RT-STOCK-T01|准备|核对到货安排和拟补货清单|目标商品和位置可识别|US-SVC-STOCK-tasks|
|US-RT-STOCK-T02|作业|卸下并清点送达商品|数量与预期及差异记录一致|US-SVC-STOCK-tasks|
|US-RT-STOCK-T03|检测|检查包件与商品可售状态|损坏和不符合条件品有标记|US-SVC-STOCK-tasks|
|US-RT-STOCK-T04|交接|将接收商品移入后仓指定位置|商品和位置记录对应|US-SVC-STOCK-tasks|
|US-RT-STOCK-T05|作业|拆箱并按货架位置补放商品|商品规格与陈列位置一致|US-SVC-STOCK-tasks；US-SVC-GROCERY-overview|
|US-RT-STOCK-T06|作业|附加或更新商品价格标识|标识与商品及当前价格对应|US-SVC-STOCK-tasks|
|US-RT-STOCK-T07|检测|盘点货架与后仓实物数量|盘点范围与差异可复核|US-SVC-STOCK-tasks|
|US-RT-STOCK-T08|异常|隔离破损或位置不明的商品〔待验证〕|异常品不混作正常可售库存|US-SVC-STOCK-tasks|
|US-RT-STOCK-T09|返工|纠正错放商品及错误价签〔待验证〕|重新核对商品、位置和标识一致|US-SVC-STOCK-tasks|
|US-RT-STOCK-T10|清洁维护|清理补货包装与货架通道|包装回收且通路符合门店要求|US-SVC-STOCK-tasks|
|US-RT-STOCK-T11|交付|更新已补货记录与未解决缺货项|变动对应实物及责任人|US-SVC-STOCK-tasks|

场景缺口：

- 流程侧OSHA仅已读概览页，详细门店收货及品类SOP仍缺；不能视为完整双源全流程验证。
- 冷藏温度、保质期、危险品、损耗统计和寄售供应商作业归属均待细化。

### 商品演示、收款装袋和退换接收（US-RT-CHECKOUT）

美国零售经营单位内接货、补货和销售交付；批发商自有仓、第三方物流及供应商驻店执行活动须根据雇主和统计单位区分，客户零售单位不重复计入外包作业工时。

来源状态：source-backed；流程资料读取范围：partial-indexed-page。流程来源：US-SVC-GROCERY；职业来源：US-SVC-CASHIER、US-SVC-SALES。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|US-RT-CHECKOUT-T01|准备|检查收款工位和交易用品〔待验证〕|所需设备用品状态经确认|US-SVC-CASHIER-tasks|
|US-RT-CHECKOUT-T02|作业|向客户演示或协助选配实物商品|具体商品功能或适配范围已说明|US-SVC-SALES-tasks|
|US-RT-CHECKOUT-T03|作业|识别扫描或称量待售商品|商品、数量和计价单位一致|US-SVC-CASHIER-tasks|
|US-RT-CHECKOUT-T04|检测|核对商品价格和交易明细|价格差异经核实后更正|US-SVC-CASHIER-tasks|
|US-RT-CHECKOUT-T05|作业|收取付款并出具交易凭据|金额和方式按实际交易登记|US-SVC-CASHIER-tasks|
|US-RT-CHECKOUT-T06|交接|装袋包装并交付已付款商品|物品与交易明细一致|US-SVC-CASHIER-tasks；US-SVC-GROCERY-overview|
|US-RT-CHECKOUT-T07|异常|处理价格或付款异常并取得授权|无权限事项交由授权人员处理|US-SVC-CASHIER-tasks|
|US-RT-CHECKOUT-T08|作业|接收退换商品并核对交易和物品|商品身份与退款条件分别核对|US-SVC-CASHIER-tasks；US-SVC-SALES-tasks|
|US-RT-CHECKOUT-T09|返工|更正误录或重新包装不合格交付件〔待验证〕|更改有记录且实物与交易恢复一致|US-SVC-CASHIER-tasks|
|US-RT-CHECKOUT-T10|清洁维护|清洁收款工位与演示用品|保持设备可用并报告故障|US-SVC-CASHIER-tasks；US-SVC-SALES-tasks|
|US-RT-CHECKOUT-T11|交付|核对班末款项与交易记录|收付记录与实存相核对|US-SVC-CASHIER-tasks|

场景缺口：

- 退换政策、年龄/处方等受限商品核验、收银异常与防损的本国门店SOP待补。
- 现金转运由银行或安保执行时不归入门店收款任务；没有计算收银占比或自动化率。

### 零售订单拣货、打包与自提移交（US-RT-ORDER）

美国零售经营单位内接货、补货和销售交付；批发商自有仓、第三方物流及供应商驻店执行活动须根据雇主和统计单位区分，客户零售单位不重复计入外包作业工时。

来源状态：proposed。流程来源：缺失；职业来源：US-SVC-STOCK、US-SVC-SHIP、US-SVC-SALES。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|US-RT-ORDER-T01|准备|核对待履约订单和可用库存|商品、数量和交付方式明确|US-SVC-STOCK-tasks|
|US-RT-ORDER-T02|作业|从货架或后仓拣取订单商品|商品身份数量与订单对应|US-SVC-STOCK-tasks|
|US-RT-ORDER-T03|检测|检查已拣商品和订单一致性|规格、数量及可售状态经检查|US-SVC-SHIP-tasks|
|US-RT-ORDER-T04|异常|登记缺货或受损商品并发起替代确认〔待验证〕|未授权替换不作为已履约|US-SVC-STOCK-tasks|
|US-RT-ORDER-T05|返工|纠正错拣件并复核整单〔待验证〕|整单复核且原差异保留|US-SVC-SHIP-tasks|
|US-RT-ORDER-T06|作业|包装订单并附上交付标识|标识与订单及交付地点一致|US-SVC-SHIP-tasks|
|US-RT-ORDER-T07|交接|将包件移交自提工位或运输接收方|对象、包件和接收者对应|US-SVC-SHIP-tasks|
|US-RT-ORDER-T08|清洁维护|清理拣货包装区域与工具|商品与废弃物区分且通道可用|US-SVC-STOCK-tasks|
|US-RT-ORDER-T09|交付|记录签收并关闭或挂起履约记录〔待验证〕|已交付和待处理项明确分开|US-SVC-SHIP-tasks|

场景缺口：

- 泛职业职责支持动作，但未取得美国零售全渠道订单SOP，本场景为proposed。
- 冷链时窗、称重替代、路边自提身份确认及逆向物流需专门证据。

行业缺口：

- 主要品类已登记覆盖/缺口，尚未逐品类穷尽实体任务；尤其食品加工、处方调剂、燃料零售不能用通用场景替代。

## 批发业（us-wholesale）

美国批发商经营统计单位自有或其直接管理的货物收存和订单履约；独立仓储、货运及制造商自营仓的执行作业归其本行业。无货权经纪代理不自动拥有本场景的仓库作业。

|主要子行业或覆盖维度|状态|具体缺口|
|---|---|---|
|机动车及零部件商人批发|partial|泛包件流程可作候选；车辆调运、件号适配、大型总成及返修件流程待补。|
|家具、家居和建筑材料商人批发|partial|大件/长材/易碎件装卸、切割与现场堆场专门流程待补。|
|专业商业设备、金属矿物及机器设备商人批发|partial|重载吊装、计量、设备调试、特殊环境储存待补，不能套用食品纸箱流程。|
|电气电子、五金管道及其他耐用品商人批发|partial|小件配套、防静电、序列号保修和多种耐用品专门流程待补。|
|纸品、服装、药品及其他非耐用品商人批发|partial|药品追溯/温控/退货、纺织分色尺码等须独立规范，不用泛收货证明合规。|
|食品和杂货商人批发|partial|历史食品批发仓实流程有证据；冷链、食品安全、召回和特殊包装缺完整规程。|
|农畜原料商人批发|gap|散装粮油、牲畜活体、取样分级和筒仓作业不能由纸箱仓库覆盖。|
|石油、化学品及相关产品商人批发|gap|罐区收发、采样、危险品兼容储存与应急须专门流程。|
|酒类及其他非耐用品商人批发|partial|容器破损、许可核验、回收周转容器和品类异常待补。|
|批发代理和经纪|gap|主要撮合与文件工作；只有证实自营验货取样/实物交接才新增实体任务，不赋予代理商人批发库存。|

### 批发仓到货检查、入位和库存保管（US-WH-IN）

美国批发商经营统计单位自有或其直接管理的货物收存和订单履约；独立仓储、货运及制造商自营仓的执行作业归其本行业。无货权经纪代理不自动拥有本场景的仓库作业。

来源状态：source-backed。流程来源：US-SVC-KEHE；职业来源：US-SVC-STOCK、US-SVC-SHIP。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|US-WH-IN-T01|准备|核对到货单据与卸货安排|供应商、货物及收货位置对应|US-SVC-SHIP-tasks|
|US-WH-IN-T02|准备|检查接货工位与承载用品状态〔待验证〕|不合格用品已标识待处理|US-SVC-STOCK-tasks|
|US-WH-IN-T03|作业|接收并卸下送达商品|接收数量和包件身份有记录|US-SVC-KEHE-flow；US-SVC-STOCK-tasks|
|US-WH-IN-T04|检测|比对货物与订单并检查损坏|数量、品项和可见损坏分别记录|US-SVC-SHIP-tasks|
|US-WH-IN-T05|交接|办理接收或待处理货物交接|接收范围和未接收范围清楚|US-SVC-SHIP-tasks|
|US-WH-IN-T06|作业|附加货物标识并搬入指定存储位|货物、标识和库位相符|US-SVC-STOCK-tasks；US-SVC-KEHE-flow|
|US-WH-IN-T07|检测|清点存储位实物并核对记录|差异可定位到货物和位置|US-SVC-STOCK-tasks|
|US-WH-IN-T08|异常|隔离损坏或单据不符货物〔待验证〕|不合格品未混入可出库库存|US-SVC-SHIP-tasks|
|US-WH-IN-T09|返工|纠正错位或错标的库存〔待验证〕|复核实物与库存记录一致|US-SVC-STOCK-tasks|
|US-WH-IN-T10|清洁维护|整理储位并清理包装和通道|库存物品与废弃物分离|US-SVC-STOCK-tasks|
|US-WH-IN-T11|交付|更新可用库存和未完成接收记录|状态与实际货物去向对应|US-SVC-SHIP-tasks|

场景缺口：

- 流程依据来自2024公布的历史单仓事实，不是全行业操作规程；美国各批发品类入库SOP、设备安全检查与质量阈值待补。

### 订单拣选、异常分流、组托包装和发运（US-WH-OUT）

美国批发商经营统计单位自有或其直接管理的货物收存和订单履约；独立仓储、货运及制造商自营仓的执行作业归其本行业。无货权经纪代理不自动拥有本场景的仓库作业。

来源状态：source-backed。流程来源：US-SVC-KEHE；职业来源：US-SVC-STOCK、US-SVC-SHIP。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|US-WH-OUT-T01|准备|核对客户订单并形成拣选清单|客户、商品和数量对应|US-SVC-STOCK-tasks|
|US-WH-OUT-T02|作业|按订单拣出商品并转至组托区域|商品与订单可对应|US-SVC-KEHE-flow；US-SVC-STOCK-tasks|
|US-WH-OUT-T03|作业|将商品放入对应订单托盘|不同订单货物清楚区分|US-SVC-KEHE-flow|
|US-WH-OUT-T04|检测|核对订单托盘商品和数量|差异有定位和处置记录|US-SVC-KEHE-flow|
|US-WH-OUT-T05|异常|查明分流未识别商品的订单归属|不能确认的商品保留待核|US-SVC-KEHE-flow|
|US-WH-OUT-T06|返工|更换包装受损商品或移回正确托盘|商品与订单恢复一致|US-SVC-KEHE-flow|
|US-WH-OUT-T07|作业|包装固定订单托盘并附发货标识|包件与目的地及单据对应|US-SVC-KEHE-flow；US-SVC-SHIP-tasks|
|US-WH-OUT-T08|交接|将发货单元移交装车作业|包件数量身份和接收人员可追溯|US-SVC-SHIP-tasks|
|US-WH-OUT-T09|检测|核对实际装载货物与发运单据|目的地、货物和单据一致|US-SVC-SHIP-tasks|
|US-WH-OUT-T10|清洁维护|清理拣选包装工位并归还周转用品|遗留商品及废料已分类|US-SVC-STOCK-tasks|
|US-WH-OUT-T11|交付|提交发运记录及未完成订单项|未履约项不被记为已交付|US-SVC-SHIP-tasks|

场景缺口：

- 货运承包商后续配送不计为批发商的装车任务；自营运输需另登记执行单位。
- 退货接收、食品召回、温控失败、危险品、超大件和跨境报关等分支尚未展开。

行业缺口：

- 本轮重点为商人批发货物实体链；代理经纪、散装原料及危险液体作业缺口明确保留。

## 信息业（us-information）

实体主线为通信基础设施、数据中心硬件和广播器材；软件出版、信息检索、内容编辑主要为知识工作。纸质档案、现场制作、机房等实体支撑需核执行单位，不能把所有IT职业归入信息业。

|主要子行业或覆盖维度|状态|具体缺口|
|---|---|---|
|出版业及软件出版|gap|编辑与软件主要知识工作；实体出版样书/资料库支持待核，独立印刷制造不重复归本行业。|
|电影、视频和录音业|gap|布景搭建、器材安装、灯光收音、拍摄、道具归还及介质交付须完整本国流程与职业证据；播出任务不能替代制作。|
|广播电视及节目分发|partial|器材准备播出维护已有职业支持候选；场站SOP、发射链、EAS和不同媒体完整流程待补。|
|有线、无线、卫星及其他电信|partial|通用中心/现场操作和安全条文有依据；海缆、卫星地面站、无线塔、光纤熔接等须专门任务展开。|
|数据处理、托管及相关服务|partial|硬件/介质链候选；机柜上架、供配电、制冷、消防、批量运维和机房清洁完整SOP待补。|
|其他信息服务（含档案、图书馆及相关服务）|gap|馆藏接收编目、上架借还、数字化扫描与保护修复需按公共/私人单位及行业分类单独核对；检索服务知识工作不强行实体化。|

### 通信设备现场安装维护与服务恢复（US-IN-TELECOM）

美国电信运营统计单位的自营通信设备现场作业；新建土木/线路施工及独立安装承包商按实际主要活动归施工等行业，运营商这里只记录自身执行与承包验收，不双计。

来源状态：source-backed；流程资料读取范围：partial-indexed-sections。流程来源：US-SVC-OSHA268；职业来源：US-SVC-TELECOM、US-SVC-TOWER。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|US-IN-TELECOM-T01|准备|核对服务工单、设备位置和故障描述|地点、对象和授权范围一致|US-SVC-TELECOM-tasks|
|US-IN-TELECOM-T02|准备|检查支撑结构与攀登工作装备|发现不合格条件时不开始相关作业|US-SVC-OSHA268-prepare|
|US-IN-TELECOM-T03|准备|整理电缆和备件并检查存放固定|材料身份状态及存放固定经核对|US-SVC-OSHA268-prepare；US-SVC-TELECOM-tasks|
|US-IN-TELECOM-T04|作业|安装或重新连接通信设备和线缆|端口、设备和连接记录对应|US-SVC-TELECOM-tasks；US-SVC-OSHA268-scope|
|US-IN-TELECOM-T05|作业|对准并固定无线传输设备|设备按批准要求定位固定|US-SVC-TOWER-tasks|
|US-IN-TELECOM-T06|交接|将测试影响范围交至相关作业人员|受影响位置和相关人员已识别|US-SVC-OSHA268-testing|
|US-IN-TELECOM-T07|检测|测量信号或电路并定位故障段|测试记录关联端口设备及工单|US-SVC-TELECOM-tasks；US-SVC-OSHA268-testing|
|US-IN-TELECOM-T08|异常|标识危险结构或无法排除故障并升级|问题与影响范围可追踪|US-SVC-OSHA268-prepare；US-SVC-TELECOM-tasks|
|US-IN-TELECOM-T09|返工|替换故障部件或重做连接后复测|问题已复核或记录残留故障|US-SVC-TELECOM-tasks|
|US-IN-TELECOM-T10|清洁维护|清洁设备工具并完成例行保养|按适用设备要求保养并记录问题|US-SVC-TELECOM-tasks；US-SVC-TOWER-tasks|
|US-IN-TELECOM-T11|交付|提交设备变更与服务恢复记录|实际设备状态与提交记录一致|US-SVC-TELECOM-tasks|

场景缺口：

- OSHA条文已读部分通过官方索引，完整运营商SOP与全部专门规程未读；本场景不作现场安全操作指引。
- 承包施工与运营自营维护的统计边界仍须现场合同与经营单位确认。

### 数据中心硬件换件与存储介质退出（US-IN-DC）

美国数据处理/托管经营统计单位内部硬件换件和存储介质交接；专业IT维修商及资产处置/回收商执行部分归其行业。企业自建机房并不自动属于信息业，须核统计单位。

来源状态：source-backed。流程来源：US-SVC-NIST88；职业来源：US-SVC-HARDWARE。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|US-IN-DC-T01|准备|核对待处理设备、资产标识和操作授权|设备身份及授权目标对应|US-SVC-HARDWARE-tasks；US-SVC-NIST88-decision|
|US-IN-DC-T02|准备|确定介质复用去向及清除要求|去向、控制关系与处理方式有记录|US-SVC-NIST88-decision|
|US-IN-DC-T03|作业|拆检或更换获准处理的硬件部件|部件与操作记录对应|US-SVC-HARDWARE-tasks|
|US-IN-DC-T04|交接|登记取下介质并移交受控保管|介质身份、离开原位置与接收去向连续|US-SVC-NIST88-record|
|US-IN-DC-T05|作业|执行组织批准的介质清除作业|操作结果与目标介质关联|US-SVC-NIST88-execution|
|US-IN-DC-T06|检测|核查清除工具结果或物理残留状态|错误、异常和工具状态纳入核查|US-SVC-NIST88-execution|
|US-IN-DC-T07|检测|判断介质清除是否达到批准要求|有效性决定与完成性核查分开记录|US-SVC-NIST88-execution|
|US-IN-DC-T08|异常|隔离无法确认身份或清除不合格介质〔待验证〕|未获接受的介质不作为可自由流转|US-SVC-NIST88-decision；US-SVC-NIST88-execution|
|US-IN-DC-T09|返工|按授权重复或升级不合格介质处理|新方法结果及原失败记录关联|US-SVC-NIST88-execution|
|US-IN-DC-T10|检测|测试更换后的设备功能|设备在批准要求下通过测试|US-SVC-HARDWARE-tasks|
|US-IN-DC-T11|清洁维护|整理维修工具与部件并清洁许可区域〔待验证〕|废件、待处理介质和可用部件分离|US-SVC-HARDWARE-tasks|
|US-IN-DC-T12|交付|签发介质处理记录并登记最终去向|介质身份、方法、人员和去向可追溯|US-SVC-NIST88-record|

场景缺口：

- NIST指导不证明信息行业自营或外包采用；49-2011职业跨行业，数据中心雇主和授权仍需验证。
- 实际破碎回收若由独立处置商执行仅记录交接，不能把其执行劳动重复算在机房。
- 机柜搬运、批量线缆、供电制冷和数据中心完整变更回退SOP仍缺。

### 播出器材准备、信号监看和设备恢复（US-IN-BROADCAST）

美国广播电视运营单位自营信号链与播出器材操作；独立活动制作、设备租赁、工程安装或电信传输服务按实际单位划分。必要数字配置用于实体设备工作，不代替编辑创作研究。

来源状态：proposed。流程来源：缺失；职业来源：US-SVC-BROADCAST。

|任务编号|阶段|动作与对象|研究定义的验收|定位引用|
|---|---|---|---|---|
|US-IN-BROADCAST-T01|准备|按节目和现场安排准备播出器材|信号源、接口和所需器材明确|US-SVC-BROADCAST-tasks|
|US-IN-BROADCAST-T02|作业|架设并连接传输录放设备|连接对应预定信号路径|US-SVC-BROADCAST-tasks|
|US-IN-BROADCAST-T03|检测|检查音视频信号和设备工作状态|采用机构批准的技术要求检验|US-SVC-BROADCAST-tasks|
|US-IN-BROADCAST-T04|交接|向当班人员移交信号源和器材状态〔待验证〕|接收者了解当前配置及未解决问题|US-SVC-BROADCAST-tasks|
|US-IN-BROADCAST-T05|作业|操作播出设备并监看输出信号|异常信号被识别并记录|US-SVC-BROADCAST-tasks|
|US-IN-BROADCAST-T06|异常|按授权切换备用信号并报告故障|切换依据及影响范围有记录|US-SVC-BROADCAST-tasks|
|US-IN-BROADCAST-T07|返工|调整或小修设备后重新检查信号|未解决缺陷继续保留标记|US-SVC-BROADCAST-tasks|
|US-IN-BROADCAST-T08|清洁维护|整理回收器材并完成例行维护|器材状态和缺件可追溯|US-SVC-BROADCAST-tasks|
|US-IN-BROADCAST-T09|交付|提交播出技术记录及设备待办|实际事件、调整和待办相互关联|US-SVC-BROADCAST-tasks|

场景缺口：

- 当前只有官方职业任务支持，本场景为proposed；美国播出机构SOP、EAS及发射设备当前规则需下一轮补齐。
- 影视拍摄、录音制作和后期创作不能由播出器材场景代替。

行业缺口：

- 信息行业的实体范围仅部分盘点；全部细分流程、执行者统计归属及自动化正反证据仍未完成。

## 已读取来源与定位

### US-SVC-TELLER

[O*NET — Tellers](https://www.onetonline.org/link/summary/43-3071.00) — U.S. Department of Labor / O*NET。发布日期：未知；读取：2026-09-09。版本：2026-09-09在线版本；页面更新年不作为精确发布日期；不使用职业频率推算工时或行业就业

- US-SVC-TELLER-tasks：Occupation-Specific Information → Tasks（已实际读取动作条目）；读取状态 read。

### US-SVC-CLAIMS

[O*NET — Claims Adjusters, Examiners, and Investigators](https://www.onetonline.org/link/summary/13-1031.00) — U.S. Department of Labor / O*NET。发布日期：未知；读取：2026-09-09。版本：2026-09-09在线版本；页面更新年不作为精确发布日期；不使用职业频率推算工时或行业就业

- US-SVC-CLAIMS-tasks：Occupation-Specific Information → Tasks（已实际读取动作条目）；读取状态 read。

### US-SVC-PROPERTY

[O*NET — Property, Real Estate, and Community Association Managers](https://www.onetonline.org/link/summary/11-9141.00) — U.S. Department of Labor / O*NET。发布日期：未知；读取：2026-09-09。版本：2026-09-09在线版本；页面更新年不作为精确发布日期；不使用职业频率推算工时或行业就业

- US-SVC-PROPERTY-tasks：Occupation-Specific Information → Tasks（已实际读取动作条目）；读取状态 read。

### US-SVC-MAINT

[O*NET — Maintenance and Repair Workers, General](https://www.onetonline.org/link/summary/49-9071.00) — U.S. Department of Labor / O*NET。发布日期：未知；读取：2026-09-09。版本：2026-09-09在线版本；页面更新年不作为精确发布日期；不使用职业频率推算工时或行业就业

- US-SVC-MAINT-tasks：Occupation-Specific Information → Tasks（已实际读取动作条目）；读取状态 read。

### US-SVC-RENTAL

[O*NET — Counter and Rental Clerks](https://www.onetonline.org/link/summary/41-2021.00) — U.S. Department of Labor / O*NET。发布日期：未知；读取：2026-09-09。版本：2026-09-09在线版本；页面更新年不作为精确发布日期；不使用职业频率推算工时或行业就业

- US-SVC-RENTAL-tasks：Occupation-Specific Information → Tasks（已实际读取动作条目）；读取状态 read。

### US-SVC-CHEM

[O*NET — Chemical Technicians](https://www.onetonline.org/link/summary/19-4031.00) — U.S. Department of Labor / O*NET。发布日期：未知；读取：2026-09-09。版本：2026-09-09在线版本；页面更新年不作为精确发布日期；不使用职业频率推算工时或行业就业

- US-SVC-CHEM-tasks：Occupation-Specific Information → Tasks（已实际读取动作条目）；读取状态 read。

### US-SVC-SURVEY

[O*NET — Surveying and Mapping Technicians](https://www.onetonline.org/link/summary/17-3031.00) — U.S. Department of Labor / O*NET。发布日期：未知；读取：2026-09-09。版本：2026-09-09在线版本；页面更新年不作为精确发布日期；不使用职业频率推算工时或行业就业

- US-SVC-SURVEY-tasks：Occupation-Specific Information → Tasks（已实际读取动作条目）；读取状态 read。

### US-SVC-VET

[O*NET — Veterinary Technologists and Technicians](https://www.onetonline.org/link/summary/29-2056.00) — U.S. Department of Labor / O*NET。发布日期：未知；读取：2026-09-09。版本：2026-09-09在线版本；页面更新年不作为精确发布日期；不使用职业频率推算工时或行业就业

- US-SVC-VET-tasks：Occupation-Specific Information → Tasks（已实际读取动作条目）；读取状态 read。

### US-SVC-STOCK

[O*NET — Stockers and Order Fillers](https://www.onetonline.org/link/summary/53-7065.00) — U.S. Department of Labor / O*NET。发布日期：未知；读取：2026-09-09。版本：2026-09-09在线版本；页面更新年不作为精确发布日期；不使用职业频率推算工时或行业就业

- US-SVC-STOCK-tasks：Occupation-Specific Information → Tasks（已实际读取动作条目）；读取状态 read。

### US-SVC-CASHIER

[O*NET — Cashiers](https://www.onetonline.org/link/summary/41-2011.00) — U.S. Department of Labor / O*NET。发布日期：未知；读取：2026-09-09。版本：2026-09-09在线版本；页面更新年不作为精确发布日期；不使用职业频率推算工时或行业就业

- US-SVC-CASHIER-tasks：Occupation-Specific Information → Tasks（已实际读取动作条目）；读取状态 read。

### US-SVC-SALES

[O*NET — Retail Salespersons](https://www.onetonline.org/link/summary/41-2031.00) — U.S. Department of Labor / O*NET。发布日期：未知；读取：2026-09-09。版本：2026-09-09在线版本；页面更新年不作为精确发布日期；不使用职业频率推算工时或行业就业

- US-SVC-SALES-tasks：Occupation-Specific Information → Tasks（已实际读取动作条目）；读取状态 read。

### US-SVC-SHIP

[O*NET — Shipping, Receiving, and Inventory Clerks](https://www.onetonline.org/link/summary/43-5071.00) — U.S. Department of Labor / O*NET。发布日期：未知；读取：2026-09-09。版本：2026-09-09在线版本；页面更新年不作为精确发布日期；不使用职业频率推算工时或行业就业

- US-SVC-SHIP-tasks：Occupation-Specific Information → Tasks（已实际读取动作条目）；读取状态 read。

### US-SVC-TELECOM

[O*NET — Telecommunications Equipment Installers and Repairers, Except Line Installers](https://www.onetonline.org/link/summary/49-2022.00) — U.S. Department of Labor / O*NET。发布日期：未知；读取：2026-09-09。版本：2026-09-09在线版本；页面更新年不作为精确发布日期；不使用职业频率推算工时或行业就业

- US-SVC-TELECOM-tasks：Occupation-Specific Information → Tasks（已实际读取动作条目）；读取状态 read。

### US-SVC-TOWER

[O*NET — Radio, Cellular, and Tower Equipment Installers and Repairers](https://www.onetonline.org/link/summary/49-2021.00) — U.S. Department of Labor / O*NET。发布日期：未知；读取：2026-09-09。版本：2026-09-09在线版本；页面更新年不作为精确发布日期；不使用职业频率推算工时或行业就业

- US-SVC-TOWER-tasks：Occupation-Specific Information → Tasks（已实际读取动作条目）；读取状态 read。

### US-SVC-BROADCAST

[O*NET — Broadcast Technicians](https://www.onetonline.org/link/summary/27-4012.00) — U.S. Department of Labor / O*NET。发布日期：未知；读取：2026-09-09。版本：2026-09-09在线版本；页面更新年不作为精确发布日期；不使用职业频率推算工时或行业就业

- US-SVC-BROADCAST-tasks：Occupation-Specific Information → Tasks（已实际读取动作条目）；读取状态 read。

### US-SVC-FEDCASH

[Deposit Visual Reference Guide](https://www.frbservices.org/resources/financial-services/cash/depositing-ordering/visual-reference-guide.html) — Federal Reserve Financial Services。发布日期：未知；读取：2026-09-09。版本：网页注明2023-11-01修订；在线流程，不是银行工时

- US-SVC-FEDCASH-prepare：Preparing Currency Deposits / Preparing Currency Straps / Strap Bands / Preparing Currency Bundles；读取状态 read。
- US-SVC-FEDCASH-exception：Preparing Contaminated Currency；正常、污染及严重毁损货币分流；读取状态 read。

### US-SVC-FEMA

[Adjustment Standards and Requirements — Proper Photographs](https://emilms.fema.gov/IS1104/groups/32.html) — FEMA Emergency Management Institute。发布日期：未知；读取：2026-09-09。版本：网页未标日期；培训中的NFIP照片要求，不能代替全部保险SOP

- US-SVC-FEMA-photos：正文：受损及未受损财产拍照、清晰度、日期房间位置及损害描述标注；读取状态 read。

### US-SVC-HUD

[NSPIRE Standard — Leak — Water](https://www.hud.gov/sites/dfiles/PIH/documents/NSPIRE-Standard-Leak-Water_20230620.pdf) — U.S. Department of Housing and Urban Development。发布日期：2023-06-20；读取：2026-09-09。版本：V3.0

- US-SVC-HUD-inspection：PDF第2–6页：环境水侵入和管道漏水的检查位置、可见证据及询问住户/业主代理步骤；读取状态 read。

适用边界：HUD NSPIRE适用住房的检查规程；不是美国全部商业物业规范，维修工艺未由本文件证明。

### US-SVC-RECALL

[NHTSA Announces Consent Order with Zipcar](https://www.nhtsa.gov/press-releases/nhtsa-announces-consent-order-zipcar) — National Highway Traffic Safety Administration。发布日期：2023-10-16；读取：2026-09-09。

- US-SVC-RECALL-recall：正文：开放召回车辆出租的调查、召回信息集中管理、限制预订和完成补救后的放行流程；读取状态 read。

适用边界：2023年美国租赁企业的官方执法案例，提供召回处理流程，不代表2026全行业采用情况。

### US-SVC-FDALAB

[Regulatory Testing Laboratory Manual of Quality Policies, MAN-000025, Revision 07](https://www.fda.gov/media/187901/download?attachment=) — Food and Drug Administration。发布日期：未知；读取：2026-09-09。版本：Revision 07；公开PDF要求以内部QMiS为当前正式版本，本次无法访问QMiS。 文件修订：2025-07-01。

- US-SVC-FDALAB-equipment：PDF第16–17页§6.4：设备处理维护、投入/恢复使用前验证、校准状态及停用；读取状态 read。
- US-SVC-FDALAB-sample：PDF第27–28页§7.3–7.4：接收、编号、保存、转移、异常样品及分样；读取状态 read。
- US-SVC-FDALAB-quality：PDF第29–31页§7.5、7.7、7.8：原始记录、质控和授权报告；读取状态 read。
- US-SVC-FDALAB-exception：PDF第34–35页§7.8.9、7.10：修改报告、不符合工作和恢复授权；读取状态 read。

适用边界：FDA自有监管实验室流程参考；这些政府实验室不计入私人专业科学技术行业。用于发现同类实验动作，商业检测实验室适用SOP仍待取得。

### US-SVC-NGS

[Survey Mark Recovery — Mark Recovery Form Instructions](https://geodesy.noaa.gov/surveys/mark-recovery/) — NOAA National Geodetic Survey。发布日期：未知；读取：2026-09-09。

- US-SVC-NGS-recovery：Survey Mark Recovery及Form Instructions第1–4步：识别PID、核对描述、记录恢复者与标志状态、提交处理；读取状态 read。

适用边界：测量标志查找与记录提交参考，不是全部商业测量流程或精度规范。

### US-SVC-VETSUBMIT

[NVAP Reference Guide: Laboratory Submissions](https://www.aphis.usda.gov/nvap/reference-guide/laboratory-submissions) — USDA APHIS。发布日期：未知；读取：2026-09-09。 页面修改：2026-01-11。

- US-SVC-VETSUBMIT-submit：正文开头及routine diagnostic samples各段：与实验室确认取样准备、标识、包装、发送和送检表；读取状态 read。

适用边界：美国认可兽医送检流程；具体标本种类须遵循接收实验室当前要求。

### US-SVC-GROCERY

[Guidelines for Retail Grocery Stores — Ergonomics for the Prevention of Musculoskeletal Disorders](https://www.osha.gov/sites/default/files/publications/OSHA3192.pdf) — Occupational Safety and Health Administration。发布日期：未知；读取：2026-09-09。版本：OSHA Publication 3192（官方行业索引标2004）；当前PDF上传日期不视为原始发布日期。

- US-SVC-GROCERY-overview：印刷第12页 Implementing Solutions：前端收款装袋提货、补货、烘焙、肉类熟食和果蔬作业范围；读取状态 indexed-page-excerpt-read。

访问限制：仅实际读取官方PDF搜索索引的第12页正文；原PDF大写/小写及旧URL直接读取均受访问错误限制，不能声称全文已读。

适用边界：人机工程流程识别参考，非强制全部采用的方案清单，也未证明当前自动化采用。

### US-SVC-KEHE

[KEHE DISTRIBUTORS, LLC — OSHRC Docket No. 22-0696, Decision and Order](https://www.oshrc.gov/wp-content/uploads/Final-Decision-and-Order-22-0696-KeHE-Distributors.html) — Occupational Safety and Health Review Commission。发布日期：2024-06-24；读取：2026-09-09。

- US-SVC-KEHE-flow：IV.a Respondent’s Business，网页第84–90行：制造商到货、加工/上架/存储、订单组托、包裹装车；QA处理未识别或破损商品及订单核对；读取状态 read。

适用边界：美国一家食品批发配送仓的历史事实认定，提供执行流程证据，不代表整个批发业或2026在运状态。该案所涉传票被撤销，不把背景事故解释为确认违法或自动化失败。

### US-SVC-OSHA268

[29 CFR 1910.268 — Telecommunications](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.268) — Occupational Safety and Health Administration。发布日期：未知；读取：2026-09-09。版本：2026-09-09在线条文检索版本，未另推定具体修订日。

- US-SVC-OSHA268-scope：§1910.268(a)：通信中心与现场安装、运行、维护、重排、拆除范围；读取状态 indexed-section-text-read。
- US-SVC-OSHA268-prepare：§1910.268(b)(6)、(g)、(k)：支撑结构、攀登设备及材料存储检查；读取状态 indexed-section-text-read。
- US-SVC-OSHA268-testing：§1910.268(l)：电缆故障定位和测试隔离/告知；(n)木杆检查及(o)地下线路条件；读取状态 indexed-section-text-read。

访问限制：官方页面直接读取返回403；实际读取官方搜索索引返回的各列明条文正文，未声称整份标准全文读取。

适用边界：作业安全与任务发现参考，不是完整运营商安装SOP或部署采用证据。

### US-SVC-HARDWARE

[O*NET OnLine 49-2011.00 — Computer, Automated Teller, and Office Machine Repairers](https://www.onetonline.org/link/summary/49-2011.00) — U.S. Department of Labor / O*NET。发布日期：未知；读取：2026-09-09。版本：页面标Updated 2026；确切发布日期未知。

- US-SVC-HARDWARE-tasks：Tasks全25项，网页第125–168行：拆检替换、组装配置、测试、维修记录、清洁保养；读取状态 read。

适用边界：跨行业职业职责不证明信息行业就业份额；只将由信息行业经营单位自行执行的任务归入信息业。

### US-SVC-NIST88

[NIST SP 800-88 Rev.2 — Guidelines for Media Sanitization](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-88r2.pdf) — National Institute of Standards and Technology。发布日期：2025-09-26；读取：2026-09-09。版本：September 2025 final；元数据发布日期2025-09-26；2026 FAQ计划说明不等于Rev.2修订。

- US-SVC-NIST88-decision：印刷第20–23页/PDF第29–32页§4.3：介质控制、复用、数据保护及处置决策；读取状态 read。
- US-SVC-NIST88-execution：印刷第23–24页/PDF第32–33页§4.4–4.5：执行清除、核查结果、判断有效性及失败重做；读取状态 read。
- US-SVC-NIST88-record：印刷第25–26页/PDF第34–35页§4.6：介质识别、方法工具、验证人员、出入库去向与证明记录；读取状态 read。

适用边界：美国政府技术指导，适用于发现介质生命周期任务；不证明任何具体美国数据中心采用、回报或无人化。

## 后续工作

- 先补齐各子行业的流程规范、异常与清洁维护分支，并核对实际执行者，复核去重后才冻结清单。
- 对每个候选任务分别检索传统设备、专机、机器人和辅助工具，以及失败、退出、未采用和残留人工证据。
- 当前没有工时、成本、采用率和回收期结论；参数不足时保留缺口，不能用职业任务描述代替测时或现金流。

