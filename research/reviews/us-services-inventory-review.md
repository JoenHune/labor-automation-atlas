# 美国服务业任务盘点独立审查

审查结论：本快照可作为**未冻结的工作清单**使用，需先合入来源降级、原子化及阶段纠正；不能作为全部行业任务盘点完成或自动化证据研究完成的交付。审查没有修改作者清单。

审查日期：2026-09-09。输入为 `research/reviews/us-services-inventory-input.json`，SHA256：`9835baa697e79fe62ca0d266b2b44eca325856cd9af95ab96f0df824c34b02ba`。复制后只读该快照，不将作者后续新增项混入本轮。快照共 **168 项、16 场景、6 行业、27 来源**。逐项结构化裁决见 [us-services-inventory-decisions.json](./us-services-inventory-decisions.json)。

## 范围、方法与实做记录

1. 复制原始字节并计算SHA；核对168个唯一ID、US国家标签、全部输入/输出/验收及来源定位；原有135项source-backed、33项proposed；未见空字段或悬空sourceRef。
2. 独立通过官方HTTP重新读取16个O*NET职业的全部Tasks条目。裁决JSON保存原文动作句及响应SHA，不只读取作者摘要，也没有用职业频率、职业名称推工时或行业就业。
3. 复读FEMA照片全3段、NGS标志恢复正文和4步骤、APHIS送检正文；FDA直接下载PDF并提取指定页；HUD、KeHE、NIST通过官方web读取指定页/段；NHTSA复读全文并区分“监管认定”和“Zipcar said”。
4. OSHA 1910.268与OSHA3192直接访问失败。改为复读**官方域名搜索索引返回的条文原文/第12页原文**，不声称全文已读。其他直接访问失败而web成功的来源在JSON分别记明。
5. 对168项分别检查动作对象、输入输出验收、阶段、每个引用的语义强度、实体/必要数字支持、所属执行单位、重复触发及遗漏。此轮没有展开自动化成功/失败检索，全部保持not-started。

“未在所引原文找到”意味着当前引用不能证明该细节，**不意味着现实中不存在该任务**。拆分粒度是基于独立描述、验收、核算目标的研究判断；原文将多个动作写在一句里，也不代表它们必须是同一任务。

## 结果计数

|检查维度|结果|
|---|---|
|动作来源直接支持|104项；仅支持发现动作，非整条流程部署验证|
|部分支持 / 仅推导 / 当前定位未找到|34 / 23 / 7项|
|原source-backed建议整体先降proposed|31项；拆分后的已证实子动作可恢复动作来源标签|
|需拆分 / 需具体化对象|89 / 3项；不把增加拆分数量视为覆盖提升|
|可保留为候选单元|76项；仍含来源/阶段需改项|
|阶段需要修改|11项；其他任务拆分后子项阶段详见裁决|
|原输入记录整体需修订 / 可按候选保留|122 / 46项|
|自动化与反例检索|168项均not-started|

全部168项验收均为作者明确标注的research-definition，本审查未将其提升为已验证现场SOP。部分验收只说“符合要求”，后续仍须补具体对象、方法版本、允许状态、责任及异常条件；不凭空添加数值阈值。FI-CASH-T03/T05/T10与RT-CHECKOUT-T11另有标题、验收或输出不完全对应的具体修正。

## 应优先合入的纠错

- **来源层级**：界面将source-backed写为“动作有来源”，另设完整流程验证状态。设备出租、零售订单、广播3个场景已经proposed，应保留。其余13个场景有局部流程参考，不能显示成全流程验证。职业描述、监管安全条文、政府流程类比均不能证明特定私人经营单位已采用。
- **出处性质**：NHTSA公告中的召回系统和补救放行改进明确是Zipcar自称。添加“官方公告转述公司自报／2023历史材料”；不要将官方发布者误写为独立现场验证。[NHTSA公告](https://www.nhtsa.gov/press-releases/nhtsa-announces-consent-order-zipcar)
- **条件范围**：OSHA §1910.268(l)涉及高压电缆故障定位/测试前告知，不能泛化为全部信号测试；结构标记具体位于(n)(4)，不是(b)(6)检查条款。[OSHA条文](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.268)
- **术语和定位**：NIST sanitization建议译“介质净化/数据消除”，Clear只是方法之一。§4.5.2内容跨印刷24–25页，execution定位延至PDF34页。保留T06 verification和T07 validation两个不同任务。[NIST Rev2](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-88r2.pdf)
- **司法材料**：KeHE流程属历史单仓事实认定，可发现组托和QA任务；裁决撤销相关传票的说明正确，应继续保留，不能推为2026在运或自动化失败。[KeHE裁决](https://www.oshrc.gov/wp-content/uploads/Final-Decision-and-Order-22-0696-KeHE-Distributors.html)
- **阶段**：物业问询是检查信息收集，车辆维修后复核是检测，待洗待修队列只是排程，后仓移位只是搬运；修好既有故障通常为维修作业，只有前次作业未验收通过后的重做才称返工。

31项状态降级和11项阶段修改都在JSON `recommendedMergeEdits` 按ID列出；所有拆分建议在逐任务correction中。应用时比对快照内容与现行任务，避免把基于旧标题的建议直接覆盖已改好的任务。

## 行业归属、重复与覆盖

- **us-finance**：金融机构自营柜面/保险相关服务限定合理；Federal Reserve banks在BEA私人金融行业，不能因名称Federal改入government；联储理事会另论。押运/外包维修只留银行端交接。
- **us-real-estate**：自营物业与无驾驶员/无操作员出租归属条件合理；HUD住房检查不自动证明私人经营执行。政府住房单位自行执行与私人管理承包须分；独立清洁/修理不因客户是房东而归房地产。自有住房归算价值不是雇佣工时。
- **us-professional**：兽医服务为NAICS541940，政府FDA实验室仅类比流程；企业制造内部检测不得双计。独立兽医检测可能仍541940，不能一律转一般检测541380。按实际经营单位/主业核合同。
- **us-retail**：仅零售经营单位自行承担；供应商驻店、独立物流、专门修理和政府直营设施要核实际经营单位，不能只看作业地点。通用收银/上架不能证明每个品类完整覆盖。
- **us-wholesale**：无货权经纪不自动具有仓储任务正确；“直接管理”不等于实际自行执行，3PL仍需按经营单位核；KeHE是食品单仓，不覆盖全部批发商品类型。
- **us-information**：仅信息经营单位自行执行；政府机房/公共图书馆、企业内部IT按对应统计边界另计。受控外包介质保管是安全控制关系，不能当作经济行业自营归属。独立影视制作可能仍信息业，独立仅意味着不能重复计入广播统计单位，并非一定属于其他行业。

以上为条件性归属检查，不是已取得所有经营单位合同。Census的541940定义包含为执业兽医提供测试的经营单位，不应一律归入一般检测实验室；NAICS行业与BEA政府机构边界也须分别核对。[Census兽医服务定义](https://data.census.gov/profile/541940_-_Veterinary_services?codeset=naics~541940) BEA已明确将Federal Reserve banks列入私人服务业金融保险行业，不因“Federal”名称归政府。[BEA行业发布](https://www.bea.gov/index.php/news/2024/gross-domestic-product-third-estimate-corporate-profits-revised-estimate-and-gdp-0)

建议每个后续任务实例增加实际执行经营单位、公私属性、外包关系、触发条件及共享动作实例号。没有现场资料的值保留unknown。16个场景恰好都标齐8阶段并不能证明全流程覆盖；纠正阶段后自然出现的缺口应保留，不能以拟议任务填成已验证。

重复风险：

- US-RT-STOCK-T10, US-RT-ORDER-T08：同一零售后仓拣补货区域清洁可共享作业；按相同时间区域只记一次。
- US-RT-CHECKOUT-T03, US-RT-CHECKOUT-T04：首次扫码计价与独立复核需分触发和输入，不能把同一自动计算重复计为人工检测。
- US-RE-CAR-T02, US-RE-CAR-T07, US-RE-CAR-T08：正常放行检查、召回禁租、补救后检核是条件分支，不是每车每单全部串行执行。
- US-WH-OUT-T04, US-WH-OUT-T09：组托QA与装车核单可以不同，但应给时点/对象；仅同一清单核对则合并实例。
- US-IN-BROADCAST-T04, US-IN-BROADCAST-T09：交班与末班待办若同一份移交，不重复核算。
- US-IN-DC-T06, US-IN-DC-T07：不是重复：NIST verification和validation分别是完成性核查与有效性接受/拒绝，必须保留区别。

需要继续扩展的覆盖缺口：

- **us-finance**：银行仅纸钞主线/保险仅照片；已读TELLER的支票背书身份文书检查、实物凭证分拣归档、现金库存补给尚未独立展开。 下一步：补银行现金/票据/ATM/金库SOP与险种完整现场流程，不把知识交易强拆实体。
- **us-real-estate**：物业小修、清洁仍任务族；车辆调车/加油充电/清洗及按类租赁功能试验已承认gap；当前车辆队列任务不能占据清潔維護已覆盖。 下一步：按住宅/商业/工业设施、车辆/各类器具分别取具体SOP，明确自营执行。
- **us-professional**：FDA §7.4E样品环境条件维持/监测/记录、§6.4.8校准状态标识、§6.4.9异常设备停用没有完整独立任务；测量立标持杆、兽医麻醉监护等主要过程仍gap。 下一步：补私人实验室、外业测量、兽医各子流程；每类动作含方法对象而非“操作仪器”总任务。
- **us-retail**：通用三场景无法代表药房调剂、燃料、鲜食等；已读CASHIER班初现金准备、退换后退款/找零与STOCK退供应商/报废尚未独立展开。 下一步：先补具体商品规范，再展开正常、受限品、逆向流和异常；OSHA p12不构成双源完整流程。
- **us-wholesale**：KeHE单个食品仓正常组托及识别异常有实证；危险液体、散粮、超大件、温控召回等仍缺。SHIP运输单据与承运安排是必要接口，实物装载独立步骤也未完全展开。 下一步：建立品类/场地/雇主矩阵，不能把同一收发流程复制到所有商人批发细分后称覆盖。
- **us-information**：电信安全前置/故障定位未覆盖全部运营；硬件与sanitization为任务族；广播仅职业动作，实际麦克风定位、发射读数记录、外场天线对准等已读动作未充分展开。 下一步：取得运营商/托管商/台站当前SOP及实际执行单位，分清影视制作、出版和私人档案；不要以广播替整个制作。

上述只是已读来源和当前边界暴露的缺口，不是穷尽的遗漏列表。作者已经注明的大量未覆盖细分应保留；没有对未读的细分流程作已审定承诺。

## 27项来源的独立复读范围

|来源|实际复读范围|限制/发现|
|---|---|---|
|[US-SVC-TELLER](https://www.onetonline.org/link/summary/43-3071.00)|Occupation-Specific Information → Tasks（全部展开在HTML中的动作条目）|仅确认职业动作存在；不证明某行业/经营单位的流程顺序、工时、采用率或具体验收。|
|[US-SVC-CLAIMS](https://www.onetonline.org/link/summary/13-1031.00)|Occupation-Specific Information → Tasks（全部展开在HTML中的动作条目）|仅确认职业动作存在；不证明某行业/经营单位的流程顺序、工时、采用率或具体验收。|
|[US-SVC-PROPERTY](https://www.onetonline.org/link/summary/11-9141.00)|Occupation-Specific Information → Tasks（全部展开在HTML中的动作条目）|仅确认职业动作存在；不证明某行业/经营单位的流程顺序、工时、采用率或具体验收。|
|[US-SVC-MAINT](https://www.onetonline.org/link/summary/49-9071.00)|Occupation-Specific Information → Tasks（全部展开在HTML中的动作条目）|仅确认职业动作存在；不证明某行业/经营单位的流程顺序、工时、采用率或具体验收。|
|[US-SVC-RENTAL](https://www.onetonline.org/link/summary/41-2021.00)|Occupation-Specific Information → Tasks（全部展开在HTML中的动作条目）|仅确认职业动作存在；不证明某行业/经营单位的流程顺序、工时、采用率或具体验收。|
|[US-SVC-CHEM](https://www.onetonline.org/link/summary/19-4031.00)|Occupation-Specific Information → Tasks（全部展开在HTML中的动作条目）|仅确认职业动作存在；不证明某行业/经营单位的流程顺序、工时、采用率或具体验收。|
|[US-SVC-SURVEY](https://www.onetonline.org/link/summary/17-3031.00)|Occupation-Specific Information → Tasks（全部展开在HTML中的动作条目）|仅确认职业动作存在；不证明某行业/经营单位的流程顺序、工时、采用率或具体验收。|
|[US-SVC-VET](https://www.onetonline.org/link/summary/29-2056.00)|Occupation-Specific Information → Tasks（全部展开在HTML中的动作条目）|仅确认职业动作存在；不证明某行业/经营单位的流程顺序、工时、采用率或具体验收。|
|[US-SVC-STOCK](https://www.onetonline.org/link/summary/53-7065.00)|Occupation-Specific Information → Tasks（全部展开在HTML中的动作条目）|仅确认职业动作存在；不证明某行业/经营单位的流程顺序、工时、采用率或具体验收。|
|[US-SVC-CASHIER](https://www.onetonline.org/link/summary/41-2011.00)|Occupation-Specific Information → Tasks（全部展开在HTML中的动作条目）|仅确认职业动作存在；不证明某行业/经营单位的流程顺序、工时、采用率或具体验收。|
|[US-SVC-SALES](https://www.onetonline.org/link/summary/41-2031.00)|Occupation-Specific Information → Tasks（全部展开在HTML中的动作条目）|仅确认职业动作存在；不证明某行业/经营单位的流程顺序、工时、采用率或具体验收。|
|[US-SVC-SHIP](https://www.onetonline.org/link/summary/43-5071.00)|Occupation-Specific Information → Tasks（全部展开在HTML中的动作条目）|仅确认职业动作存在；不证明某行业/经营单位的流程顺序、工时、采用率或具体验收。|
|[US-SVC-TELECOM](https://www.onetonline.org/link/summary/49-2022.00)|Occupation-Specific Information → Tasks（全部展开在HTML中的动作条目）|仅确认职业动作存在；不证明某行业/经营单位的流程顺序、工时、采用率或具体验收。|
|[US-SVC-TOWER](https://www.onetonline.org/link/summary/49-2021.00)|Occupation-Specific Information → Tasks（全部展开在HTML中的动作条目）|仅确认职业动作存在；不证明某行业/经营单位的流程顺序、工时、采用率或具体验收。|
|[US-SVC-BROADCAST](https://www.onetonline.org/link/summary/27-4012.00)|Occupation-Specific Information → Tasks（全部展开在HTML中的动作条目）|仅确认职业动作存在；不证明某行业/经营单位的流程顺序、工时、采用率或具体验收。|
|[US-SVC-FEDCASH](https://www.frbservices.org/resources/financial-services/cash/depositing-ordering/visual-reference-guide.html)|Preparing Currency Deposits/Straps/Bands/Bundles；Contaminated Currency|2023-11-01网页修订确认；包装/验钞依据，未证明银行工时；直接HTTP404但官方web可读。|
|[US-SVC-FEMA](https://emilms.fema.gov/IS1104/groups/32.html)|Proper Photographs全部3段|未规定重拍与旧图留存；照片要求仅作为NFIP场景来源。|
|[US-SVC-HUD](https://www.hud.gov/sites/dfiles/PIH/documents/NSPIRE-Standard-Leak-Water_20230620.pdf)|V3.0 PDF1–6：定义、环境水侵入与管道漏水检查条目|2023-06-20版本确认；仅适用住房检验，不能证明商业物业维修工艺；HTTP403。|
|[US-SVC-RECALL](https://www.nhtsa.gov/press-releases/nhtsa-announces-consent-order-zipcar)|NHTSA 2023-10-16正文，尤末段Zipcar said|日期确认；禁租系统/补救放行改进为官方发布者转述公司自报，非独立采用验证。|
|[US-SVC-FDALAB](https://www.fda.gov/media/187901/download?attachment=)|PDF16–17 §§6.4.1–10；27–31 §§7.3–7.8.1；34–35 §§7.8.9、7.10|2025-07-01 Rev07确认；政府实验室流程参考，未取得QMiS或私人实验室SOP。|
|[US-SVC-NGS](https://geodesy.noaa.gov/surveys/mark-recovery/)|Survey Mark Recovery正文与Form Instructions步骤1–4|恢复标志提交页实际已读；底部Last modified Sep08 2022，不据此推所有内容精确发布日期；Mark Condition子页未复读。|
|[US-SVC-VETSUBMIT](https://www.aphis.usda.gov/nvap/reference-guide/laboratory-submissions)|开头责任/诊断送检复杂性；routine State/university/NVSL及regulatory sample联系要求|2026-01-11 Last Modified确认；导向当前实验室/运输规则，不能代表完整具体包装SOP。|
|[US-SVC-GROCERY](https://www.osha.gov/sites/default/files/publications/OSHA3192.pdf)|印刷12 Implementing Solutions场景清单及非穷尽说明|HTTP403、web-open内部错误；官方检索索引原文复读成功，仅p12概览，不声称全文已读。|
|[US-SVC-KEHE](https://www.oshrc.gov/wp-content/uploads/Final-Decision-and-Order-22-0696-KeHE-Distributors.html)|IV.a Respondent’s Business/Tr129–143；VI/VII结论及署名日期|2024-06-24日期确认；历史单仓流程/司法事实认定；撤销传票，非2026采用/机械失败结论。|
|[US-SVC-OSHA268](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.268)|§1910.268(a)(1–3)、(b)(6)、(g)(2)(iii–iv)、(k)(1–2)、(l)(1–2)、(n)(4)|HTTP403与web-open失败；官方索引条文复读，不声称全文；(l)高压电缆测试条件不能泛化。|
|[US-SVC-HARDWARE](https://www.onetonline.org/link/summary/49-2011.00)|Occupation-Specific Information → Tasks（全部展开在HTML中的动作条目）|仅确认职业动作存在；不证明某行业/经营单位的流程顺序、工时、采用率或具体验收。|
|[US-SVC-NIST88](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-88r2.pdf)|§4.3 print20–23/PDF29–32；§4.4–4.5 print23–25/PDF32–34；§4.6 print25–26/PDF34–35|2025-09-26 Final由CSRC Document History核实；2026-07-17 planning note指向FAQ不构成Rev2重发。execution定位应延至PDF34；Sanitization不等同Clear。|

## 逐任务裁决（168/168）

“直接”仅指动作；“部分”“推导”“未找到”建议将当前整条记录先降或维持proposed。可拆出有原文依据的子动作，再保留source-backed。所有条目仍需要现场验收条件，且自动化/反例研究均未开始。

### US-FI-CASH · 银行收付、整点与准备现金入库

|任务|来源/原子化|阶段建议|原文定位与可合入修改|
|---|---|---|---|
|US-FI-CASH-T01 · 核对现金抽屉及票据期初余额|部分；候选单元；proposed|准备|TELLER Tasks: Balance currency…at ends of shifts；Receive and count daily inventories。期初抽屉及票据对账并非所引原文的明确阶段；保留期初场景须降proposed并补银行开班SOP，勿用班末职责证明。|
|US-FI-CASH-T02 · 清点客户现金及核对存款单|直接；候选单元；source-backed|作业|TELLER Tasks: Receive checks and cash for deposit, verify amounts, and check accuracy of deposit slips。可保留一次存款实物金额核验单元；验收是研究定义，票据真实性审核需另列。|
|US-FI-CASH-T03 · 检验钞币真伪及物理状态|直接；需拆分；source-backed|检测|FEDCASH Preparing Currency Deposits：piece counted and verified for authenticity；Contaminated Currency。拆真伪检查与物理状态分流；对象收窄为钞券，当前定位不支持硬币鉴伪；验收补真伪判定，现只有污染验收。|
|US-FI-CASH-T04 · 按交易授权付现金并出具收据|直接；需拆分；source-backed|作业|TELLER Tasks: Cash checks and pay out money；Enter customers’ transactions…issue…receipts。拆授权出钞与交易凭证生成，分别保留金额/账户核对及凭证可追溯验收。|
|US-FI-CASH-T05 · 整平钞券并去除夹杂固定物|直接；候选单元；source-backed|作业|FEDCASH Preparing Currency Deposits/Straps：straightened；paper clips…removed。同一钞券整理单元可保留；验收补平整/边角状态，不能只有无夹杂物。|
|US-FI-CASH-T06 · 按券别扎把捆包并标识核验信息|直接；需拆分；source-backed|作业|FEDCASH Preparing Currency Straps/Strap Bands/Preparing Currency Bundles。扎把、捆包、标识分别有中间成品和验收，至少拆三项；只适用相应券别和正常钞券包装规则。|
|US-FI-CASH-T07 · 核对押运交存实物及清单|直接；候选单元；source-backed|交接|TELLER Tasks: Count, verify, and post armored car deposits。动作可保留；接收发生在银行，押运运输不计本任务。|
|US-FI-CASH-T08 · 隔离污染钞币并联系适用接收渠道|直接；需拆分；source-backed|异常|FEDCASH Contaminated Currency：Separate…；obtain…information…before contacting。拆污染实物隔离和接收渠道确认；严重毁损另分BEP渠道，不能混入污染钞券同一接收途径。|
|US-FI-CASH-T09 · 复点并纠正不合规包装和账差|推导；需拆分；proposed|返工|FEDCASH介绍不合规存款可被拒收；无账差调查步骤。维持proposed，拆重新包装与账差调查；后者改引TELLER识别交易差错条目并补SOP。|
|US-FI-CASH-T10 · 清理机具作业区并报修卡钞设备|未找到；需拆分；proposed|清洁维护|TELLER Tasks未列清理机具或卡钞报修。维持proposed；清洁作业区与设备故障报修分别列，报修phase异常；补厂商设备手册/银行SOP。|
|US-FI-CASH-T11 · 平衡现金票据余额并移交班次|部分；需拆分；proposed|交付|TELLER Tasks首项明确班末现金票据平衡。拆班末对账与交班实物/未决事项移交；前者有来源，后者具体交接方式为proposed。|

### US-FI-LOSS · 财产保险现场查勘与影像证据交付

|任务|来源/原子化|阶段建议|原文定位与可合入修改|
|---|---|---|---|
|US-FI-LOSS-T01 · 核对保单标的查勘权限与资料|部分；候选单元；proposed|准备|CLAIMS Tasks: Examine claims forms…determine insurance coverage。标的与资料审核有依据；现场查勘权限核对是扩展，降proposed或把标题改为核查索赔资料中的保险范围。|
|US-FI-LOSS-T02 · 查看受损及未受损财产并拍照|直接；候选单元；source-backed|作业|FEMA Proper Photographs第1段：damage…pre-existing…undamaged property。作为一次取景拍摄单元可保留；明确NFIP影像场景，不能外推其他险种。|
|US-FI-LOSS-T03 · 标注照片日期位置和损害描述|直接；候选单元；source-backed|作业|FEMA Proper Photographs第3段：date…room location…description。标签动作和字段直接支持；保持图像来源记录。|
|US-FI-LOSS-T04 · 核验影像质量及标的对应关系|直接；候选单元；source-backed|检测|FEMA Proper Photographs第2段：sufficient quality；blurry…not acceptable。质量检查有来源；标的对应关系通过标签交叉核对属研究定义，须明确。|
|US-FI-LOSS-T05 · 向理赔审查方移交物证及影像清单|推导；候选单元；proposed|交接|CLAIMS Tasks collect evidence/maintain claim files，无物证影像交接单。维持proposed；分别定义实体物证与数字照片交接对象后再决定拆分。|
|US-FI-LOSS-T06 · 登记不安全或无法进入部位|未找到；候选单元；proposed|异常|CLAIMS Tasks未列不安全/不可进入查勘分支。维持proposed；需要现场进入与安全授权SOP，不能由职业调查职责推定。|
|US-FI-LOSS-T07 · 重拍缺失或不清晰部位|推导；候选单元；proposed|返工|FEMA仅规定照片质量；未规定重拍或新旧图保留流程。从source-backed降proposed；补查勘质量返工规程，原图留存仍为研究定义。|
|US-FI-LOSS-T08 · 检查并整理现场测量和摄录工具|未找到；需拆分；proposed|清洁维护|CLAIMS Tasks未列摄录器材整理检查。维持proposed；器材状态检查与器材归还/数据保管分开。|
|US-FI-LOSS-T09 · 完成事实记录供授权理赔决定|直接；候选单元；source-backed|交付|CLAIMS Tasks: Analyze information…report findings and recommendations。报告交付动作有依据；事实/责任判断分开是合理研究验收，不能说是该职业原文要求。|

### US-RE-PROPERTY · 物业漏水巡检、工单维修与空间交接

|任务|来源/原子化|阶段建议|原文定位与可合入修改|
|---|---|---|---|
|US-RE-PROPERTY-T01 · 核对房间访问授权与报修位置|推导；候选单元；proposed|准备|PROPERTY Tasks有物业协调/投诉调查，无房间进入授权核对。维持proposed，补住户许可与工单流程。|
|US-RE-PROPERTY-T02 · 检查巡检工具与待用维修材料|部分；需拆分；proposed|准备|MAINT Tasks维修策划/采购/设备诊断；无巡检工具与待用材料预检明文。降proposed；拆巡检仪器检查与材料规格核对，避免用被修设备检查证明工具检查。|
|US-RE-PROPERTY-T03 · 查看屋内水迹和门窗渗漏证据|直接；候选单元；source-backed|作业 → 检测|HUD V3.0 PDF2–3 Inspection Process。动作直接支持；phase改检测，限定HUD适用住房，活动水迹与历史水迹判断保留观察依据。|
|US-RE-PROPERTY-T04 · 观察可接近管道接口和供水器具|直接；候选单元；source-backed|作业 → 检测|HUD PDF4–6 visually inspect…active plumbing leak/connections。phase改检测；不仅凭器具存在，须记录检查可见范围。|
|US-RE-PROPERTY-T05 · 向住户或业主代理核实漏水及维修经过|直接；候选单元；source-backed|交接 → 检测|HUD PDF2–3 Request for Help/Action：ask resident or POA；determine repair。这是询问核实检查证据，非对象或责任移交；phase改检测，可单列信息采集。|
|US-RE-PROPERTY-T06 · 诊断自营设备故障并界定小修范围|直接；需拆分；source-backed|检测|MAINT Tasks诊断故障；determine how to correct them。拆故障定位检测与维修计划准备；限定具体设备后才可评价技术/经济可替代性。|
|US-RE-PROPERTY-T07 · 隔离待处置问题并联系专业承包商|部分；需拆分；proposed|异常|PROPERTY Tasks联络/承包计划有据，无实物隔离步骤。维持proposed；拆问题设施隔离与委托承包商，前者需设施安全SOP。|
|US-RE-PROPERTY-T08 · 更换许可范围内损坏的小部件|直接；需具体化；source-backed|作业|MAINT Tasks repair/replace/install components。更换小部件过宽，按灯泡、滤芯、阀件等对象拆出下一级后核许可和验收；职业职责不授予维修资质。|
|US-RE-PROPERTY-T09 · 重新处理复检未合格的维修点|推导；候选单元；proposed|返工|MAINT Tasks支持维修，无失败复检后的返工决策。维持proposed；补工单返修触发条件并衔接独立复检任务。|
|US-RE-PROPERTY-T10 · 清洁公共空间并保养自营设备|直接；需拆分；source-backed|清洁维护|PROPERTY Tasks clean common areas；MAINT routine maintenance。公共区域清洁与设备保养可分别核算，必须拆；保养还须按设备类型细化。|
|US-RE-PROPERTY-T11 · 检查承包商交回的维修范围|部分；候选单元；proposed|检测|PROPERTY Tasks evaluate staff/contract personnel performance。维持proposed，绩效评价不等于具体工单范围验收；补合同验收清单。|
|US-RE-PROPERTY-T12 · 移交空间钥匙和维修记录|未找到；需拆分；proposed|交付|PROPERTY Tasks有租售记录，无钥匙交接明文。维持proposed；空间/钥匙实物移交与维修记录归档拆开。|

### US-RE-CAR · 租车领取、归还和召回状态拦截

|任务|来源/原子化|阶段建议|原文定位与可合入修改|
|---|---|---|---|
|US-RE-CAR-T01 · 核对车辆预订与客户取车资料|直接；候选单元；source-backed|准备|RENTAL Tasks reserve items；prepare rental forms/signature/licenses。泛租赁动作直接支持；车辆/驾照专属细则未证实，保持条件化。|
|US-RE-CAR-T02 · 核查拟交车辆的召回和可出租状态|直接；候选单元；source-backed|准备|NHTSA 2023-10-16末段Zipcar said…recall…unavailable…post-remedy。可保留召回状态核验候选；材料是监管稿转述公司改进自报，非独立验证2026采用。|
|US-RE-CAR-T03 · 检查待交车辆外观与配置|直接；候选单元；source-backed|作业 → 检测|RENTAL Tasks inspect and adjust rental items。改phase检测；外观/配置细项及损伤基线是车辆化研究定义，需车企SOP。|
|US-RE-CAR-T04 · 向客户交付车辆与租赁文件|直接；候选单元；source-backed|交接|RENTAL Tasks rent items/prepare forms/customer signature。车辆文件钥匙可视一份交接包，验收列车辆身份、钥匙件数、签收对象。|
|US-RE-CAR-T05 · 接收归还车辆并核对归还情况|直接；候选单元；source-backed|作业 → 交接|RENTAL Tasks accept returns。改phase交接；归还初接收与下一条损伤检测分界清楚。|
|US-RE-CAR-T06 · 检查归还车辆损伤和需维修事项|部分；候选单元；proposed|检测|RENTAL Tasks inspect rental items；receive examine tag articles…repair。泛检查有据，但归还车辆新旧损伤比对未直接出现；降proposed或明确仅动作来源、车辆方法待证。|
|US-RE-CAR-T07 · 阻断召回车辆继续预订并转补救|直接；需拆分；source-backed|异常|NHTSA末段公司自称禁预约与补救状态管理。拆禁租状态变更与送维修交接；前者动作可保留自报，实体补救工单仍需实际流程。|
|US-RE-CAR-T08 · 复核维修或召回补救后车辆状态|直接；候选单元；source-backed|返工 → 检测|NHTSA末段release of vehicles post-remedy。补救后复核是检测，不是返工本身；限定召回补救，普通维修复核需另源；保留公司自报标签。|
|US-RE-CAR-T09 · 整理归还车辆的待清洁待修队列|推导；候选单元；proposed|清洁维护 → 准备|RENTAL接收/标记待修物品，未写车辆队列。维持proposed；这里仅分类排程，没有清洗或维修动作，phase改准备，清洗维护阶段仍gap。|
|US-RE-CAR-T10 · 结清租赁记录并更新车辆可用性|部分；需拆分；proposed|交付|RENTAL Tasks compute charges/receive payments；keep transaction/rental records。拆租金结算与车辆可用状态更新；前者直接支持，后者具体状态流转为proposed。|

### US-RE-EQUIP · 工具、设备和用品租出回收

|任务|来源/原子化|阶段建议|原文定位与可合入修改|
|---|---|---|---|
|US-RE-EQUIP-T01 · 识别租赁需求与可用物品|直接；候选单元；source-backed|准备|RENTAL Tasks discuss type quality quantity；provide availability information。泛需求核对可保留动作来源；具体设备适用限制依制造商/出租方SOP。|
|US-RE-EQUIP-T02 · 检查并调整拟出租物品|直接；需拆分；source-backed|作业|RENTAL Tasks inspect and adjust rental items。拆外观功能检查（检测）与参数调节（作业）；按器具种类定义验收，避免所有出租物共用调节动作。|
|US-RE-EQUIP-T03 · 演示物品使用并办理签收|部分；需拆分；proposed|交接|RENTAL Tasks provide operation information/advise use；prepare forms。拆使用说明与签收；原文未明确实际操作演示，保留演示须proposed。|
|US-RE-EQUIP-T04 · 核对归还物品完整性与损坏|直接；候选单元；source-backed|检测|RENTAL Tasks accept returns；inspect rental items。完整性检查为可用候选；附件清单与损伤标准仍研究定义，限定对象。|
|US-RE-EQUIP-T05 · 标记缺件或损坏物品并停止再出租|推导；需拆分；proposed|异常|RENTAL Tasks examine/tag待清洗维修物；无禁租状态流程。维持proposed；问题标识与停止出租分别核算，补隔离和状态权限SOP。|
|US-RE-EQUIP-T06 · 补齐附件并复核重新出租条件|推导；需拆分；proposed|返工|RENTAL无补件后重新出租复核明文。维持proposed；补附件（作业/返工）与再出租功能检测拆分。|
|US-RE-EQUIP-T07 · 清洁整理归还物品和存放位置|部分；需拆分；proposed|清洁维护|RENTAL仅接收拟清洗物，不证明出租单位清洁执行。维持proposed；物品清洁与库位整理拆开，核是否承包给独立清洗单位。|
|US-RE-EQUIP-T08 · 更新租赁结算与库存可用记录|部分；需拆分；proposed|交付|RENTAL Tasks compute charges；keep records items rented。拆结算和可用库存状态更新，后者状态机未直接支持；不得以记录职责证明已完成实物检查。|

### US-PR-LAB · 检测样品从接收到报告与处置

|任务|来源/原子化|阶段建议|原文定位与可合入修改|
|---|---|---|---|
|US-PR-LAB-T01 · 核对委托项目与样品接收条件|直接；候选单元；source-backed|准备|FDA PDF28 §7.4C接受标准/analysis requested/consult customer。动作来源成立；仅FDA政府实验室流程参考，私人商业实验室场景适用性仍proposed。|
|US-PR-LAB-T02 · 检查送达样品并建立唯一标识|直接；需拆分；source-backed|作业|FDA PDF28 §7.3E/7.4B/C唯一编号与接收异常。拆接收状态检查（检测）与唯一身份登记（作业）；两项可独立验收。|
|US-PR-LAB-T03 · 登记样品在接收区与分析区的转移|直接；候选单元；source-backed|交接|FDA PDF28 §7.4B transfer within/across laboratories traceability。来源支持内部转移追溯；接收区至分析区是研究场景化，非原文空间布局。|
|US-PR-LAB-T04 · 按方法要求分取和制备试验样品|直接；需拆分；source-backed|作业|FDA PDF28 §7.3F先混合/制备保证均一再分取；CHEM Tasks test preparation。拆均质/前处理与分样，不能将不同制样技术视同一可核算动作；补方法ID。|
|US-PR-LAB-T05 · 配制试剂并核对设备适用状态|直接；需拆分；source-backed|准备|CHEM Tasks prepare chemical solutions；FDA PDF16–17 §6.4.4/8。配试剂与仪器状态核对为不同对象，拆两项；设备状态检测可另列检测phase。|
|US-PR-LAB-T06 · 操作仪器对分样实施测定|直接；需具体化；source-backed|作业|CHEM Tasks conduct tests；chromatography/spectroscopy等方法。操作仪器过泛；按检测方法/上样对象拆解后才可比较自动化，当前只作任务族。|
|US-PR-LAB-T07 · 实施质控样和设备功能检查|直接；需拆分；source-backed|检测|FDA PDF30 §7.7.1B.1质控材料及B.3设备功能检查。拆质控样测定和设备功能核验；引用精确到§7.7.1B.1及B.3，不能用笼统质量章节覆盖全部方法。|
|US-PR-LAB-T08 · 隔离接收偏差样品并联系委托方|部分；需拆分；proposed|异常|FDA PDF28 §7.4C记录偏差并在分析前联系客户；未写样品隔离。把标题改为登记接收偏差并联系委托方，或将隔离另列proposed；偏差登记与沟通可分两项。|
|US-PR-LAB-T09 · 停止不符合工作并评估已发结果影响|直接；需拆分；source-backed|异常|FDA PDF17 §6.4.9停用设备及旧结果影响；PDF34–35 §7.10。拆暂停设备/工作与已出结果影响评估，均有依据，执行责任不同。|
|US-PR-LAB-T10 · 依授权重新制样或复测并保留原记录|推导；需拆分；proposed|返工|FDA PDF30 §7.7.1B.6/7复测；PDF35 §7.10补救授权。维持proposed，质量复测不必然是不合格返工；按调查授权区分重新制样与复测，记录关联不替代触发条件。|
|US-PR-LAB-T11 · 清洁仪器器皿并记录设备维护|直接；需拆分；source-backed|清洁维护|CHEM Tasks maintain clean sterilize instruments；FDA §6.4.3。器皿清洁/消毒和设备维护分开，再关联维护记录；当前验收仅后续可用，需污染控制/设备状态各自条件。|
|US-PR-LAB-T12 · 按要求保存或处置剩余样品|直接；需拆分；source-backed|作业|FDA PDF28 §7.4A storage retention disposal。保存与处置为互斥去向、不同验收，拆分，明确期限/授权，不能用一个完成状态表示两者。|
|US-PR-LAB-T13 · 复核并授权签发检测报告|直接；需拆分；source-backed|交付|FDA PDF31 §7.8.1B reviewed and authorized…by supervisors/designees。报告技术复核与授权发布拆分；属于必要数字/知识支持，不应计作机械可替代实体工时。|

### US-PR-SURVEY · 测量标志查找、外业观测与成果交接

|任务|来源/原子化|阶段建议|原文定位与可合入修改|
|---|---|---|---|
|US-PR-SURVEY-T01 · 查阅目标测量标志的描述和既有编号|直接；候选单元；source-backed|准备|NGS Form Instructions步骤1 PID、datasheet、review/update descriptive fields。动作候选成立；任务前查看的时间顺序是研究组织方式。|
|US-PR-SURVEY-T02 · 检查携行测量仪器和记录介质|未找到；候选单元；proposed|准备|SURVEY Tasks有调整操作仪器，无携行前检查条目。降proposed并补仪器外业准备SOP，不能由操作职责推出检查已完成。|
|US-PR-SURVEY-T03 · 现场寻找并辨认目标测量标志|直接；候选单元；source-backed|作业|NGS recovery定义；SURVEY Tasks search survey points未列为本条引用。NGS足以支持找回识别的大类动作；刻印核对细则需补Mark Stamping说明或加入已读SURVEY引用。|
|US-PR-SURVEY-T04 · 架设仪器并观测角度距离高程|直接；需拆分；source-backed|作业|SURVEY Tasks adjust/operate instruments；position targets；measure angles distances elevations。按测量方法拆仪器架设和角距/高程观测，现为任务族；不能将GNSS、全站仪、水准统一验收。|
|US-PR-SURVEY-T05 · 传递控制点身份与现场观测记录|推导；候选单元；proposed|交接|SURVEY记录/录入数据职责，未指定人员交接版本。维持proposed；补外业内业交接SOP。|
|US-PR-SURVEY-T06 · 核对观测数据并计算闭合等检查结果|直接；候选单元；source-backed|检测|SURVEY Tasks traverse closures；compare computations with applicable standards。质量核算动作直接支持；限差为空，保持方法/项目条件待补。|
|US-PR-SURVEY-T07 · 登记受损缺失或无法确认的测量标志|直接；候选单元；source-backed|异常|NGS步骤3 include mark condition descriptors；正文damage/destroyed。状态登记有据；未找到不得判毁属于研究谨慎规则，未由当前落点明确规定，补Mark Condition子页。|
|US-PR-SURVEY-T08 · 重新查找身份存疑标志或补充观测|推导；需拆分；proposed|返工|SURVEY correction/map accuracy；NGS review/update fields非外业重测。维持proposed；身份重新查找与观测补测拆开，补触发阈值。|
|US-PR-SURVEY-T09 · 整理保护外业仪器和现场物件|未找到；需拆分；proposed|清洁维护|SURVEY Tasks无仪器清洁维护/现场物件回收。维持proposed；仪器清洁保护和现场物件回收拆分并补SOP。|
|US-PR-SURVEY-T10 · 提交标志状态及项目测量成果|直接；需拆分；source-backed|交付|NGS步骤4 Submit recovery；SURVEY Tasks maps/reports。NGS公共标志状态提交与客户测量成果交付拆分；接收方/审核标准不同。|

### US-PR-VET · 动物检查辅助、标本送检和诊室周转

|任务|来源/原子化|阶段建议|原文定位与可合入修改|
|---|---|---|---|
|US-PR-VET-T01 · 核对动物身份、检查请求与所需标本|部分；候选单元；proposed|准备|VET Tasks采样标识/记录；APHIS开头样品与表单。身份核对与采样需求合理，但前置核对程序未明确；降proposed或标题限于准备指定标本采送资料。|
|US-PR-VET-T02 · 向接收实验室确认标本采送要求|直接；候选单元；source-backed|准备|APHIS routine samples联系接收实验室确认collect prepare package ship。直接支持；记录所用要求版本，不把文章概览当具体运输包装规则。|
|US-PR-VET-T03 · 按授权辅助保定动物并完成检查准备|直接；需拆分；source-backed|作业|VET Tasks restrain animals；provide instruments；assist examination。保定与检查器材/部位准备分别验收，拆分；资格为约束不由O*NET授权。|
|US-PR-VET-T04 · 采集并标识授权检验所需标本|直接；需拆分；source-backed|作业|VET Tasks collect prepare label samples；APHIS开头identified。采集和身份标识分别验收，至少拆两个任务；按标本对象细分。|
|US-PR-VET-T05 · 核对标本质量与送检单一致性|直接；候选单元；source-backed|检测|APHIS开头properly collected…identified…appropriate forms。可保留基于要求的检核动作，具体质量阈值由接收实验室现行要求确定。|
|US-PR-VET-T06 · 包装标本并办理运送交接|直接；需拆分；source-backed|交接|APHIS开头packed and sent along with appropriate forms。拆标本包装（作业）与交承运方（交接）；当前文章只导向运输规则，不能当危险品完整操作指引。|
|US-PR-VET-T07 · 登记不符合送检要求的标本并求证|推导；候选单元；proposed|异常|APHIS指导联系实验室，未给不合格标本例外流程。维持proposed，补接收拒样/身份冲突的实验室流程。|
|US-PR-VET-T08 · 依兽医和实验室指令重新准备标本|推导；候选单元；proposed|返工|APHIS无返工采样规则。维持proposed；区分重新采样与标签/表单纠正，必须有兽医与接收方具体授权。|
|US-PR-VET-T09 · 清洁消毒诊室器械并整理耗材|直接；需拆分；source-backed|清洁维护|VET Tasks clean/sterilize instruments；clean rooms；inventory supplies。诊室表面清洁、器械清洁灭菌和补耗材拆分；同一验收不能覆盖感染控制和库存数量。|
|US-PR-VET-T10 · 记录动物状态并移交照护和检验信息|部分；需拆分；proposed|交付|VET Tasks observe condition/records/discuss postoperative status。状态记录有据；向权限接收者移交照护/检验信息是研究定义，拆移交任务并降proposed。|

### US-RT-STOCK · 门店到货、后仓入位与货架补货

|任务|来源/原子化|阶段建议|原文定位与可合入修改|
|---|---|---|---|
|US-RT-STOCK-T01 · 核对到货安排和拟补货清单|部分；需拆分；proposed|准备|STOCK Tasks inventory/replenishment；read orders；无到货排程核对。拆核对补货清单与到货安排，后者补收货SOP或proposed。|
|US-RT-STOCK-T02 · 卸下并清点送达商品|直接；需拆分；source-backed|作业|STOCK Tasks receive unload；receive and count。卸货与清点分别有实体/数量结果，拆分，清点phase检测。|
|US-RT-STOCK-T03 · 检查包件与商品可售状态|直接；候选单元；source-backed|检测|STOCK Tasks examine wear/defects/report damage。收窄为包件/可见缺损；可售状态还受保质期、温控、召回等影响，当前来源未全覆盖。|
|US-RT-STOCK-T04 · 将接收商品移入后仓指定位置|直接；候选单元；source-backed|交接 → 作业|STOCK Tasks store items orderly/accessibly。当前只是搬运入位，没有接收人/责任移交，phase改作业；后仓接管若另有证据再建交接。|
|US-RT-STOCK-T05 · 拆箱并按货架位置补放商品|直接；需拆分；source-backed|作业|STOCK Tasks unpack；stock shelves；GROCERY p12仅Stocking概览。拆拆箱与货架补放；OSHA概览只支持场景存在，不能支持本条具体位置/动作顺序。|
|US-RT-STOCK-T06 · 附加或更新商品价格标识|直接；候选单元；source-backed|作业|STOCK Tasks stamp attach change price tags referring to price list。动作/对象明确；本任务仅标签更新，不包含后台定价或电子价签采用判断。|
|US-RT-STOCK-T07 · 盘点货架与后仓实物数量|直接；候选单元；source-backed|检测|STOCK Tasks take inventory；receive/count/record。可保留一次指定盘点范围的实物计数，须给盘点基准时点而非全店库存一致假定。|
|US-RT-STOCK-T08 · 隔离破损或位置不明的商品|推导；候选单元；proposed|异常|STOCK Tasks缺陷检查/退供应商，无隔离区与未知库位流程。维持proposed，破损隔离与位置不明应分触发条件，补门店处理SOP。|
|US-RT-STOCK-T09 · 纠正错放商品及错误价签|推导；需拆分；proposed|返工|STOCK标价/储位正常动作；无纠错流程。维持proposed；实物纠位与价签改正拆分。|
|US-RT-STOCK-T10 · 清理补货包装与货架通道|直接；候选单元；source-backed|清洁维护|STOCK Tasks clean supplies/tools/storage areas；clean shelves/aisles。可保留一次补货区域复位清洁；验收补残留包装及通行结果，不证明特定回收体系。|
|US-RT-STOCK-T11 · 更新已补货记录与未解决缺货项|部分；需拆分；proposed|交付|STOCK Tasks record received stock；requisition based on stock。库存变动记录有据；未解决缺货责任待办未明，拆分且后者proposed。|

### US-RT-CHECKOUT · 商品演示、收款装袋和退换接收

|任务|来源/原子化|阶段建议|原文定位与可合入修改|
|---|---|---|---|
|US-RT-CHECKOUT-T01 · 检查收款工位和交易用品|部分；需拆分；proposed|准备|CASHIER Tasks monitor adequate cash；非设备/包装用品功能检查。维持proposed；开班现金备付和设备/包装检查拆分，前者可补直接条目。|
|US-RT-CHECKOUT-T02 · 向客户演示或协助选配实物商品|直接；需拆分；source-backed|作业|SALES Tasks demonstrate operation；help try on/fit merchandise。演示功能与协助实物适配分别核算，拆分并指定商品种类。|
|US-RT-CHECKOUT-T03 · 识别扫描或称量待售商品|直接；需拆分；source-backed|作业|CASHIER Tasks optical scanners；weigh items。扫码识别与称重计价对应不同物品/设备，拆分，保留无条码例外待查。|
|US-RT-CHECKOUT-T04 · 核对商品价格和交易明细|直接；候选单元；source-backed|检测|CASHIER Tasks identify prices/tabulate bills。明细核对候选可保留；与T03首次计价边界需写清，避免重复核算同一扫码结果。|
|US-RT-CHECKOUT-T05 · 收取付款并出具交易凭据|直接；需拆分；source-backed|作业|CASHIER Tasks receive payment；issue receipts/refunds/change。拆付款受理与出具凭据/找零；支付异常单列，不能只以登记等同现金到账。|
|US-RT-CHECKOUT-T06 · 装袋包装并交付已付款商品|直接；需拆分；source-backed|交接|CASHIER Tasks bag box wrap；carry-out；GROCERY p12前端概览。拆装袋包装（作业）与交付顾客（交接）；OSHA仅场景支持。|
|US-RT-CHECKOUT-T07 · 处理价格或付款异常并取得授权|部分；需拆分；proposed|异常|CASHIER Tasks resolve complaints/request assistance，未明确授权流程。价格核验异常和付款失败不是同一任务；降proposed并补收银授权与支付处理SOP。|
|US-RT-CHECKOUT-T08 · 接收退换商品并核对交易和物品|直接；需拆分；source-backed|作业 → 交接|CASHIER returns/exchanges；SALES accept returns。拆接收退货（交接）与商品/原交易核验（检测）；退款执行目前缺少独立任务。|
|US-RT-CHECKOUT-T09 · 更正误录或重新包装不合格交付件|推导；需拆分；proposed|返工|CASHIER无误录更正或包装返工流程。维持proposed；数据更正与重新包装拆开，不共用输出/验收。|
|US-RT-CHECKOUT-T10 · 清洁收款工位与演示用品|部分；需拆分；proposed|清洁维护|CASHIER clean checkout；SALES clean shelves/counters/tables。工位清洁有依据，演示用品清洁/故障报告未直接支持；拆出并proposed或补商品维护说明。|
|US-RT-CHECKOUT-T11 · 核对班末款项与交易记录|直接；候选单元；source-backed|交付|CASHIER calculate total payments/reconcile sales。班末对账成立；输出中的款项移交属于另一个动作，移交另列proposed。|

### US-RT-ORDER · 零售订单拣货、打包与自提移交

|任务|来源/原子化|阶段建议|原文定位与可合入修改|
|---|---|---|---|
|US-RT-ORDER-T01 · 核对待履约订单和可用库存|直接；候选单元；source-backed|准备|STOCK Tasks read orders；take inventory。动作支持；全渠道订单状态和交付方式是研究定义，维持场景proposed。|
|US-RT-ORDER-T02 · 从货架或后仓拣取订单商品|直接；候选单元；source-backed|作业|STOCK Tasks obtain merchandise from bins/shelves。单次按单拣货可保留；不同品类路径/抓取条件须下拆。|
|US-RT-ORDER-T03 · 检查已拣商品和订单一致性|直接；候选单元；source-backed|检测|SHIP Tasks examine contents compare manifests/orders。数量规格核对有据；可售状态应引用STOCK缺陷检查并补品类规则。|
|US-RT-ORDER-T04 · 登记缺货或受损商品并发起替代确认|推导；需拆分；proposed|异常|STOCK欠货/缺陷信息，无客户替代授权流程。维持proposed；缺货登记与向客户请求替代拆分。|
|US-RT-ORDER-T05 · 纠正错拣件并复核整单|推导；需拆分；proposed|返工|SHIP rectify damages/shortages，不明确错拣重拣与整单复核。维持proposed；错件更换与整单检查分别列。|
|US-RT-ORDER-T06 · 包装订单并附上交付标识|直接；需拆分；source-backed|作业|SHIP Tasks pack seal label affix postage。包装与交付标识粘贴可独立验收，拆分；标识应关联包件ID而非仅订单。|
|US-RT-ORDER-T07 · 将包件移交自提工位或运输接收方|部分；候选单元；proposed|交接|SHIP Tasks route materials to departments/contact carrier。运输接收方安排有据，零售自提签交程序未证；降proposed或收窄为将包件移至指定交接位置。|
|US-RT-ORDER-T08 · 清理拣货包装区域与工具|直接；候选单元；source-backed|清洁维护|STOCK Tasks clean tools/equipment/storage areas。一次工位恢复可保留；与STOCK-T10共享同一工位时实例只记一次。|
|US-RT-ORDER-T09 · 记录签收并关闭或挂起履约记录|推导；需拆分；proposed|交付|SHIP shipment recordkeeping，无签收后关闭/挂起状态机。维持proposed；签收记录和履约状态处理拆分，补门店/配送系统SOP。|

### US-WH-IN · 批发仓到货检查、入位和库存保管

|任务|来源/原子化|阶段建议|原文定位与可合入修改|
|---|---|---|---|
|US-WH-IN-T01 · 核对到货单据与卸货安排|部分；需拆分；proposed|准备|SHIP Tasks compare shipment documents；contact carriers安排运输。入库单据核对有据；卸货到达排程是新增，拆开或降proposed并补收货SOP。|
|US-WH-IN-T02 · 检查接货工位与承载用品状态|未找到；需拆分；proposed|准备|STOCK Tasks操作/清洁用品，无托盘承载用品作业前检查。维持proposed；工位检查和承载用品检查分别列，补装卸设备/托盘检验规则。|
|US-WH-IN-T03 · 接收并卸下送达商品|直接；候选单元；source-backed|作业|KEHE IV.a接收制造商货物；STOCK receive/unload。接货卸下可作为同一卸货作业单元，但签收责任属于T05，数量核验属于T04，勿双计。|
|US-WH-IN-T04 · 比对货物与订单并检查损坏|直接；需拆分；source-backed|检测|SHIP Tasks examine contents/compare records。身份数量核对与可见损伤检查具有不同结果，拆分或在子检查项内独立计时。|
|US-WH-IN-T05 · 办理接收或待处理货物交接|部分；候选单元；proposed|交接|SHIP Tasks记录shipment damages/discrepancies，无签收范围决策。降proposed，引用不能证明接收/拒收交接规则；补收货责任与签单SOP。|
|US-WH-IN-T06 · 附加货物标识并搬入指定存储位|直接；需拆分；source-backed|作业|STOCK Tasks mark stock/store items；KEHE processing/stocking/storage。标识与搬入库位拆分；各自有中间成品和验收。|
|US-WH-IN-T07 · 清点存储位实物并核对记录|直接；候选单元；source-backed|检测|STOCK Tasks take inventory/count/record。动作可保留；盘点是周期/触发分支而非每次入库必经工序，标明触发。|
|US-WH-IN-T08 · 隔离损坏或单据不符货物|推导；候选单元；proposed|异常|SHIP Tasks rectify shortages/damages，无隔离方法。维持proposed；隔离放行权限与库位规则待实证。|
|US-WH-IN-T09 · 纠正错位或错标的库存|推导；需拆分；proposed|返工|STOCK标识储位正常职责未描述差错返工。维持proposed；错位实物搬回与错标更正拆分。|
|US-WH-IN-T10 · 整理储位并清理包装和通道|直接；候选单元；source-backed|清洁维护|STOCK Tasks clean storage areas/shelves/aisles。区域恢复单元可保留；按实际清洁责任和区域范围核算。|
|US-WH-IN-T11 · 更新可用库存和未完成接收记录|部分；需拆分；proposed|交付|SHIP Tasks shipment data记录；非可用库存放行决定。拆收货记录归档和可用库存状态释放；后者降proposed并补WMS/质检流程。|

### US-WH-OUT · 订单拣选、异常分流、组托包装和发运

|任务|来源/原子化|阶段建议|原文定位与可合入修改|
|---|---|---|---|
|US-WH-OUT-T01 · 核对客户订单并形成拣选清单|直接；候选单元；source-backed|准备|STOCK Tasks read orders catalog numbers/sizes/quantities。读单形成待拣任务有据，自动生成拣单是否已存在未调查。|
|US-WH-OUT-T02 · 按订单拣出商品并转至组托区域|直接；需拆分；source-backed|作业|STOCK取货；KEHE conveyors/PITs move product to palletizing。拆库位拣取与转运至组托区，后者可能由机械设备执行，不能凭流程证明全段人工。|
|US-WH-OUT-T03 · 将商品放入对应订单托盘|直接；候选单元；source-backed|作业|KEHE IV.a Tr.140–141 manually assemble orders on pallets。组托动作直接支持历史该仓，不能代表所有批发品类或2026状态。|
|US-WH-OUT-T04 · 核对订单托盘商品和数量|直接；候选单元；source-backed|检测|KEHE IV.a Tr.142–143 QAAs audit orders for accuracy。核对任务直接支持；具体验收仍需订单定义和差错处置规则。|
|US-WH-OUT-T05 · 查明分流未识别商品的订单归属|直接；候选单元；source-backed|异常|KEHE IV.a Tr.141–142 unrecognized sortation products require QAA determine why。分流异常辨认有据，标题归属判定比原文略窄；保留无法判断待核分支。|
|US-WH-OUT-T06 · 更换包装受损商品或移回正确托盘|直接；需拆分；source-backed|返工|KEHE IV.a QAA replace damaged packaging product OR move to proper pallet。两种不同返工动作明确存在，拆更换受损包件商品与搬回正确托盘。|
|US-WH-OUT-T07 · 包装固定订单托盘并附发货标识|直接；需拆分；source-backed|作业|KEHE wrap pallets；SHIP pack seal label。托盘缠膜固定与发运标识拆分；各自验收包括稳定性/包件身份。|
|US-WH-OUT-T08 · 将发货单元移交装车作业|部分；候选单元；proposed|交接|SHIP route materials/contact carrier；没有装车班组签交明文。降proposed；若改为搬运至装车待发区则phase作业并补KEHE原文，签交需流程证据。|
|US-WH-OUT-T09 · 核对实际装载货物与发运单据|直接；候选单元；source-backed|检测|SHIP examine shipment contents compare manifests。发运核对动作可保留；实际装载后检核时点是研究定义，勿声称原文规定。|
|US-WH-OUT-T10 · 清理拣选包装工位并归还周转用品|部分；需拆分；proposed|清洁维护|STOCK Tasks clean tools/storage areas，无周转用品归还明文。清理工位有据；归还周转用品另列proposed，不以清洁职责推还盘流程。|
|US-WH-OUT-T11 · 提交发运记录及未完成订单项|部分；需拆分；proposed|交付|SHIP shipment data recordkeeping；未完成订单管理未明确。发运记录有据；未完成项待办拆出并proposed，保留订单状态规则缺口。|

### US-IN-TELECOM · 通信设备现场安装维护与服务恢复

|任务|来源/原子化|阶段建议|原文定位与可合入修改|
|---|---|---|---|
|US-IN-TELECOM-T01 · 核对服务工单、设备位置和故障描述|直接；候选单元；source-backed|准备|TELECOM Tasks review manuals/work orders；analyze trouble reports/site location。工单对象确认有据，授权字段为研究定义；不能根据职业页面证明该单位自行执行。|
|US-IN-TELECOM-T02 · 检查支撑结构与攀登工作装备|直接；需拆分；source-backed|准备|OSHA §1910.268(b)(6)支撑结构；(g)(2)(iii)脚扣每日检查。结构与攀登脚扣不同对象/能力要求，拆开；保留competent person等适用限制，非所有场景必攀登；其他安全带/装备逐条补定位。|
|US-IN-TELECOM-T03 · 整理电缆和备件并检查存放固定|部分；需拆分；proposed|准备|OSHA(k)(1)卸载前检查货载；(k)(2)线盘防滚；TELECOM无备件领用核对。拆线盘约束检查与备件身份整理；前者有条件支持，后者proposed，不能扩成所有材料固定规则。|
|US-IN-TELECOM-T04 · 安装或重新连接通信设备和线缆|直接；需拆分；source-backed|作业|TELECOM assemble/install equipment；run/connect wires；OSHA(a)仅适用范围。设备安装与线缆端接拆分并按设备/端口类型细化；移除OSHA(a)作为具体动作证明，仅留范围证据。|
|US-IN-TELECOM-T05 · 对准并固定无线传输设备|直接；需拆分；source-backed|作业|TOWER Tasks bolt equipment；check antenna positioning/adjust。固定与方位/倾角调整可独立验收，拆分；不得所有无线设备共用同一对准任务。|
|US-IN-TELECOM-T06 · 将测试影响范围交至相关作业人员|部分；候选单元；proposed|交接 → 准备|OSHA(l)(1)高压电缆故障测试；(l)(2)施压前隔离/briefing tagging。改为高压电缆测试前告知受影响人员，phase准备；当前泛化为所有测试不受原文支持，实物隔离还需独立任务。|
|US-IN-TELECOM-T07 · 测量信号或电路并定位故障段|直接；需拆分；source-backed|检测|TELECOM test circuits isolate malfunctions；OSHA(l)仅高压电缆故障测试安全。按信号质量测量与故障定位拆分；不把OSHA告知隔离条文当测量方法SOP。|
|US-IN-TELECOM-T08 · 标识危险结构或无法排除故障并升级|部分；需拆分；proposed|异常|TELECOM request support when onsite fails；OSHA(b)(6)检查不证明危险标记，标记在(n)(4)。拆危险结构停用标记与技术故障升级；前者补正确(n)(4)定位，后者已有职业动作。|
|US-IN-TELECOM-T09 · 替换故障部件或重做连接后复测|直接；需拆分；source-backed|返工|TELECOM repair/replace parts；remove/remake connections；test repaired equipment。拆换件、重接、修后测试；既有故障维修属于作业，只有先前作业验收失败重做才叫返工。|
|US-IN-TELECOM-T10 · 清洁设备工具并完成例行保养|直接；需拆分；source-backed|清洁维护|TELECOM clean tools/test equipment；routine maintenance；TOWER maintenance repair。工具清洁与现场设备例行保养拆分并细化对象；TOWER广义维修不是清洁证据。|
|US-IN-TELECOM-T11 · 提交设备变更与服务恢复记录|部分；需拆分；proposed|交付|TELECOM records facilities/equipment；report status to base。设备变更记录有据，服务恢复签收尚未直接支持；拆签收并proposed或补运营商验收SOP。|

### US-IN-DC · 数据中心硬件换件与存储介质退出

|任务|来源/原子化|阶段建议|原文定位与可合入修改|
|---|---|---|---|
|US-IN-DC-T01 · 核对待处理设备、资产标识和操作授权|部分；需拆分；proposed|准备|NIST §4.3识别介质及处置决策；HARDWARE规格阅读无变更授权工单。拆资产身份核对与变更授权核验；后者proposed；介质决策来源不能证明全部机房硬件授权流程。|
|US-IN-DC-T02 · 确定介质复用去向及清除要求|直接；候选单元；source-backed|准备|NIST §4.3.3–4.3.6 reuse/control/data protection/disposal。可保留一个介质去向决策单元；术语改介质净化/数据消除（sanitization），与Clear方法区别。|
|US-IN-DC-T03 · 拆检或更换获准处理的硬件部件|直接；需拆分；source-backed|作业|HARDWARE Tasks disassemble/examine；repair/replace；reassemble。拆拆解检查、部件更换与回装；指定硬件族再定义功能验收。|
|US-IN-DC-T04 · 登记取下介质并移交受控保管|直接；候选单元；source-backed|交接|NIST §4.6 PDF35记录离开原位置及后续去向，§4.3.4受控运输。追溯交接动作候选可保留；受控保管方法/场所未由此证明，补资产交接SOP。|
|US-IN-DC-T05 · 执行组织批准的介质清除作业|直接；需具体化；source-backed|作业|NIST §4.4 clear/purge/destroy per selected method。sanitization不宜只译清除以免等同Clear；按覆写、密码净化、消磁、物理销毁等具体适用方法建立任务，当前是任务族。|
|US-IN-DC-T06 · 核查清除工具结果或物理残留状态|直接；需拆分；source-backed|检测|NIST §4.5.1工具完成/异常与破坏后残片检查。非破坏工具日志核查与销毁残片检查分不同场景；通用完成性结果不能证明数据已不可恢复。|
|US-IN-DC-T07 · 判断介质清除是否达到批准要求|直接；候选单元；source-backed|检测|NIST §4.5.2 PDF33–34有效性接受或拒绝决定。与T06完成性核查区分正确；来源定位应扩至印刷25/PDF34以覆盖风险评估及反例。|
|US-IN-DC-T08 · 隔离无法确认身份或清除不合格介质|推导；候选单元；proposed|异常|NIST §4.3/4.5拒绝处理结果；无身份冲突实物隔离队列流程。维持proposed；身份未知与净化失败设不同触发分支，受控队列由组织SOP确认。|
|US-IN-DC-T09 · 按授权重复或升级不合格介质处理|直接；需拆分；source-backed|返工|NIST §4.5/4.5.2 repeated technique/escalating method。重做操作与再次核验分别列；补重检介质是否仍可复用，原文明确此前操作可使介质不可用。|
|US-IN-DC-T10 · 测试更换后的设备功能|直接；候选单元；source-backed|检测|HARDWARE Tasks operate/test functioning；test new systems。更换后功能测试动作成立；具体数据中心设备/冗余/恢复门槛须SOP确认。|
|US-IN-DC-T11 · 整理维修工具与部件并清洁许可区域|部分；需拆分；proposed|清洁维护|HARDWARE clean/oil/adjust mechanical parts，无维修区工具部件分类。维持proposed；部件分拣、工具回收、许可区域清洁拆分；避免把机械部件润滑泛化为电子硬件清洁方法。|
|US-IN-DC-T12 · 签发介质处理记录并登记最终去向|直接；候选单元；source-backed|交付|NIST §4.6 PDF34–35证书字段/介质来源最终去向。可保留一个完成证明记录单元；如含实物交给回收商则另列交接，避免T04重复。|

### US-IN-BROADCAST · 播出器材准备、信号监看和设备恢复

|任务|来源/原子化|阶段建议|原文定位与可合入修改|
|---|---|---|---|
|US-IN-BROADCAST-T01 · 按节目和现场安排准备播出器材|直接；候选单元；source-backed|准备|BROADCAST Tasks organize sessions/prepare areas；schedule logs/select equipment。任务准备有职业动作支持，独立广播机构流程仍proposed。|
|US-IN-BROADCAST-T02 · 架设并连接传输录放设备|直接；需拆分；source-backed|作业|BROADCAST install broadcast equipment；set up portable field transmission。设备架设和信号连接拆分，按演播室/外场具体对象界定。|
|US-IN-BROADCAST-T03 · 检查音视频信号和设备工作状态|直接；候选单元；source-backed|检测|BROADCAST preview programs/signals；monitor strength clarity reliability。保留指定信号链检核；标准阈值缺失，不能将监视画面正常等同全链正常。|
|US-IN-BROADCAST-T04 · 向当班人员移交信号源和器材状态|推导；候选单元；proposed|交接|BROADCAST无班次技术交接明文。维持proposed；补台站交班SOP与责任接收记录。|
|US-IN-BROADCAST-T05 · 操作播出设备并监看输出信号|直接；需拆分；source-backed|作业|BROADCAST play/record programs；observe monitors；monitor outgoing signals。设备播放与信号监看（检测）可分别核算，拆分，不能因play使用automation systems推无人值守。|
|US-IN-BROADCAST-T06 · 按授权切换备用信号并报告故障|直接；需拆分；source-backed|异常|BROADCAST substitute programs when signals fail；report equipment problems。切换节目/信号与故障上报拆分；原文是substitute programs，不保证存在备用设备链。|
|US-IN-BROADCAST-T07 · 调整或小修设备后重新检查信号|直接；需拆分；source-backed|返工 → 作业|BROADCAST adjust/repair/monitor signals。小修调整与修后检测拆分；当前故障维修通常为作业，只有验收失败的再次处理列返工。|
|US-IN-BROADCAST-T08 · 整理回收器材并完成例行维护|部分；需拆分；proposed|清洁维护|BROADCAST maintenance/minor repairs明确，无器材回收缺件清点。维护有依据；器材回收清点降proposed并与设备保养拆开。|
|US-IN-BROADCAST-T09 · 提交播出技术记录及设备待办|部分；需拆分；proposed|交付|BROADCAST maintain programming logs/report equipment problems。播出日志有据，下一班设备待办移交未明确；拆出后者proposed，不与T04交班重复计。|

## 最终可用性

工作版：可以保留，经上述修正后作为公开、未冻结的任务发现清单。首版任务清单冻结：**不通过**。全行业覆盖：**未完成**。自动化正反证据、完整部署投入、残留人工、回报参数及访谈验证：**均须继续研究**。此审查没有把评论、合理推导、职业职责或未检索到案例提升为研究事实。
