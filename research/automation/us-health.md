# 美国卫生与社会援助：100项候选的自动化首轮研究

2026-09-09。原稿 `9ccb13a0421f068081b614cf679f1ed5a8131788271734102acff37418d62537` 经独立审校后，作者修订已应用，待限定复检。仍为9场景、100既有候选，未冻结、未完成行业覆盖。

本批按美国私人医疗、护理、居家服务、托育及社会援助执行者归属；政府机构和外包执行者边界逐项保留。全部人工和现金参数为空，不生成回收期。

## 修订与证据边界

修正CLIA接收日期时间的条款定位、SMARTSPONGE物理/印刷页及机制段；补维护、召回、家庭用水、托育签到与OBI完整利益披露定位。PDF文本按LF分行，原有8项有效LF定位未挪动。空引文不再算逐字匹配。

法规版次、文件准备、许可函、报告日期和公开日分开。OBI研究只保留2026年，精确发表月日未获保留的出版方原文支持；没有取得JMIR全文。FDA采血授权限成人门诊及受训采血人员监督，找不到静脉不穿刺、移动过度脱针停止、其他传感器暂停报警分别陈述。

8项正例已降为相邻动作/阶段；原27项未确认正例保留。现65项为限定机制或辅助证据、8项相邻证据、27项无本任务正例，均不证明完整任务持续商业成功。35父项有拟议拆分（原14+新增21），不新增任务数；2阶段只在显示建议中更正，原始任务快照不改。

## 检索与计算方法

200条动作查询计划与50批结果关联已核对；仅有作者记录日期2026-09-09，没有原search_query请求包或逐批UTC，未独立重跑。多query合并结果池不能拆成候选的单query归属。正反检索未穷尽，未获材料不能证明不可行。

以W_t表示相对无项目基线的第t期期末增量营运资金余额。期初扣W_0，年度扣W_t−W_(t−1)，末期仅回收实际余额一次；若已在末年变化中释放，不重复计期末回收。完整部署、残留人工、维护、能源水耗材、异常停机、税费及更新投入均保留。增产需需求与瓶颈、下游能力依据。

## 逐任务结果

|任务|修订结论与条件|证据状态|拟议拆分数|
|---|---|---|---|
|US-HLT-SPECIMEN-001 核对患者身份与检验申请|条码核对与申请对账辅助人员确认患者；不是自动确定真实身份 条件：患者、申请、管标签三方对应及系统接口是否能够在床旁核验|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-SPECIMEN-002 准备采样器材与工作盘|器材清单与标准工作盘为候选；未核到按患者申请自动备齐并验收全部采样用品的实证 条件：器材规格、无菌包装与缺货替代能否按本次申请确认|no-task-specific-positive-counterexample-confirmed|0|
|US-HLT-SPECIMEN-003 向患者说明采集并核对准备状态|数字说明与核对表为候选；许可采血机器人仍处于人员监督范围 条件：患者是否理解说明、完成所需准备并能够表达不适|no-task-specific-positive-counterexample-confirmed|2|
|US-HLT-SPECIMEN-004 由授权人员采集规定标本|采集对象尚过宽；静脉、毛细、动脉及其他标本须分别展开许可/流程条件，不能共享设备许可。 条件：本次标本是否属于许可患者与采集范围，监督者能否随时介入|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-SPECIMEN-005 检查标本容器与识别信息|多视角条码读取辅助识别核对，容器完好与标本状态仍须另验 条件：标签可读性、容器破损与填充异常是否分别能被发现|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|
|US-HLT-SPECIMEN-006 处理标本以满足检验前条件|检验前处理包含不同动作和方法；开盖不覆盖离心、分样和所有处理，待方法分解。 条件：管型、盖型和所需前处理是否在设备经过验证的组合内|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-SPECIMEN-007 包装保存并交实验室或承运方|原正例已为未确认，保留该判断；实验室内追踪与外运包装/保存只是相邻证据。 条件：包装完整、保温与接收责任是否覆盖院外运输全程|no-task-specific-positive-counterexample-confirmed|3|
|US-HLT-SPECIMEN-008 拒收或隔离标识不清和不合格标本|信息不足标本保留与沟通有流程依据；规则预警和物理隔离为候选 条件：拒收条件是否可编码，授权者能否处理身份不明与紧急检验例外|no-task-specific-positive-counterexample-confirmed|0|
|US-HLT-SPECIMEN-009 依据授权重新采集所需标本|成人门诊机器人采血机制可能用于重新采集，但重采授权和原因判定未验证 条件：重采授权、患者条件及上次失败原因是否允许再次应用同一装置|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-SPECIMEN-010 处置锐器并清洁采集环境|采血设备包含针具处置，患者间设备清洁仍需专业人员；环境清洁须另计 条件：针具封闭处置与环境清洁是否分别验收且不造成交叉污染|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|
|US-HLT-SPECIMEN-011 登记实验室接收时间与流转结果|条码追踪和LIS接口辅助接收及流转记录；接收主体必须确认实际收件 条件：接收时间戳与实物流转是否一致，断网补录能否审计|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-IMAGING-001 核对影像申请与病史相关信息|申请核对清单和设备协议不匹配提示辅助检查；病史与临床必要性由人员判断 条件：申请部位、临床目的与病史是否足以支持本次检查而无接口错配|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-IMAGING-002 检查影像设备与质控状态|设备质控程序为依据，自动QC测试为候选；未核到覆盖完整设备状态的无人验收 条件：设备每日与周期质控是否按规定通过且缺陷能阻止使用|no-task-specific-positive-counterexample-confirmed|0|
|US-HLT-IMAGING-003 协助患者定位到检查体位|吊移设备可辅助转移，三维模型自动调整的是影像机器位置；患者实际体位仍另核 条件：患者移动能力、吊带与检查台是否适配，目标解剖体位能否安全稳定|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-IMAGING-004 设置并执行经批准的影像采集|厂商设备根据患者模型调整机器及曝光参数；临床批准和实际采集仍在人员控制边界 条件：患者范围、部位、协议与曝光设置是否在经验证的适用组合内|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-IMAGING-005 检查影像可诊断质量|协议和肺野截断检测提示技师检查特定影像，不能概括所有影像可诊断质量 条件：检测提示是否覆盖本次部位与病变，误报漏报如何由人员复核|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-IMAGING-006 记录剂量指标和设备设置|DICOM结构化剂量报告辅助设备设置与剂量指标归档 条件：设备输出字段、单位和患者检查标识是否准确传入档案|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-IMAGING-007 报告设备故障或患者不良反应|设备日志与临床通知流程为候选；未核到同一机制同时判定硬件故障和患者不良反应 条件：设备报警和患者反应能否分别识别、升级并保留处置记录|no-task-specific-positive-counterexample-confirmed|2|
|US-HLT-IMAGING-008 由临床团队决定必要的重采|图像截断提示支持技师判断是否重拍；没有自主替临床团队决定重采证据 条件：补采获益、重复暴露和已有影像是否由有权限者综合判断|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-IMAGING-009 移交影像与患者检查信息|图像方向校正和剂量结构文件是交接前的数字处理，未证影像与患者信息传到正确接收端。 条件：图像、患者身份和相关报告是否在正确检查号下完整到达接收端|adjacent-evidence-only|0|
|US-HLT-IMAGING-010 清洁接触面并交修异常设备|适配表面清洁工具与设备报修工单为候选；普通清洁指导不证明自动交修 条件：接触材料能否采用选定清洁方式，故障设备是否独立停用并交修|no-task-specific-positive-counterexample-confirmed|2|
|US-HLT-IMAGING-011 完成患者离室协助与检查记录|患者转移辅助器具可覆盖离室一部分，检查记录与离室交接须独立验证 条件：患者离室移动、接收人员确认与档案关闭是否分别完成|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|
|US-HLT-STERILE-001 接收清点用后器械|器械扫描更新位置并对照数字清单，不能自行判断来件数量与污染状态 条件：来件标识、清点差异与污染防护是否在接收时核实|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-STERILE-002 拆分器械并清除可见污物|手工与适配机械预清洗结合；复杂器械拆分方法需按器械核对 条件：器械能否按型号拆开并去除会妨碍后续处理的污物|no-task-specific-positive-counterexample-confirmed|2|
|US-HLT-STERILE-003 执行兼容的器械清洗|超声、清洗消毒机及相应手工步骤组成候选流程 条件：材料与通道是否适合所选设备，规定手工步骤能否保持|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-STERILE-004 检查清洁度与器械完整性|原正例已为未确认，保留；人查污物属于残留人工，不新增自动检验结论。 条件：微小残留、通道污染和机械损伤是否能按器械分别发现|no-task-specific-positive-counterexample-confirmed|2|
|US-HLT-STERILE-005 组装器械包并选择兼容包装|数字清单辅助组盘，Wellstar旧试点完成部分小盘组装；包装兼容另核 条件：器械型号、抓取摆放与包装兼容能否满足本机构盘型变动|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|
|US-HLT-STERILE-006 装载灭菌设备并运行批准循环|批准灭菌设备执行循环，装载方式和负载适配由人员确认 条件：负载排列与程序是否允许介质到达各部位，放行职责是否明确|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|
|US-HLT-STERILE-007 读取机械化学生物监测结果|机械、化学、生物指标的时间和放行要求不同，按设备/周期展开后分别验收，不能统一成功率。 条件：各类监测的对象、时间和异常状态是否准确关联本负载|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-STERILE-008 隔离监测失败或破包器械|数字规则硬停止和召回提醒可辅助阻止流转，实物隔离与检索仍需人员或另验设备 条件：失败结果能否关联所有受影响器械并实际隔离未发放与已发放物品|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-STERILE-009 重包装并重处理允许返工器械|重新包装与再处理有规定流程，包装机器人未获本场景合格实证 条件：器械和包装损坏是否允许返工，返工后全部监测是否重新满足|no-task-specific-positive-counterexample-confirmed|2|
|US-HLT-STERILE-010 标记循环批号并转无菌储存|标签打印、扫码存位可辅助批号与储存关联，物理存放仍单独验收 条件：标签批号、存位与防护条件能否贯穿取放过程|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|
|US-HLT-STERILE-011 清洁保养再处理设备|预防维护流程与维护工单为候选；未核到自行诊断并维修再处理设备的完整实证 条件：停机维护权限、维修后验证和设备重新放行能否形成闭环|no-task-specific-positive-counterexample-confirmed|0|
|US-HLT-STERILE-012 发放器械并核对包状态|器械追踪可辅助出库登记；包状态检查及交付仍由人员核验 条件：包装完整、所需器械和接收方是否在发放前匹配|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-OR-001 按手术清单备齐器械与耗材|排程关联的拣选清单与数字组盘清单辅助备物，不替代全部实物准备 条件：手术偏好清单、器械版本和临时变更是否同步到本次物料准备|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-OR-002 检查并布置无菌工作区|无菌区布置与包装检查辅助工具为候选，未核到全区自主搭建和无菌验收实证 条件：无菌区边界、包装状态与接触污染是否在使用前得到确认|no-task-specific-positive-counterexample-confirmed|0|
|US-HLT-OR-003 按临床指令协助患者体位摆放|辅助床台转移不等于达到具体术式体位，后者仍须单独适配与验收。 条件：手术台接口、患者状况和所需体位是否允许使用所选辅助装置|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-OR-004 清点手术器械敷料与针具|带标签敷料、针具、金属器械的计数机制不同，先按对象展开再冻结。 条件：标签适配、无标签物品及手术中新增物品能否完整对账|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-OR-005 按请求传递器械与耗材|实验室原型地域未确认，不能串为美国临床部署；只保留全球技术线索。 条件：请求歧义、器械遮挡和无菌交接能否在患者在场条件下满足验收|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-OR-006 标识并移交术中标本|条码与申请对账为数字辅助候选，尚未确认术中封装和运送整体自动化 条件：患者、取材部位和申请是否同步到接收病理系统并取得回执|no-task-specific-positive-counterexample-confirmed|0|
|US-HLT-OR-007 报告器械计数差异或无菌破坏|敷料标签差异提示辅助部分计数异常报告；无菌破坏识别和上报另待验证 条件：未标记器械的计数差异和无菌事件能否分别及时升级|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|
|US-HLT-OR-008 更换污染器械或重新布置受影响无菌区|库存与追踪系统可能辅助查找替换器械，实际污染去除和无菌区恢复仍未证实自动化 条件：受污染物品范围能否确认，替换后无菌区是否由有权限者重新验收|no-task-specific-positive-counterexample-confirmed|2|
|US-HLT-OR-009 清点回收器械并移交再处理|扫描追踪与敷料计数辅助回收登记；锐器清点和污染器械输送另核 条件：污染器械、锐器和敷料是否按各自流程清点分离并交接|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|
|US-HLT-OR-010 补充手术室物料并完成记录|按排程数字清单可辅助补货与记录，实体拿取和库存异常仍需另验 条件：已消耗物料能否准确补回且记录不重复计入下次手术|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|
|US-HLT-WARD-001 核对照护计划与膳食限制|移动评估工具不支持自动核验当班膳食限制，场景背景保留。 条件：饮食、活动及患者偏好是否经过授权更新并向执行者一致展示|adjacent-evidence-only|0|
|US-HLT-WARD-002 观察并记录生命体征与皮肤变化|生命体征监测器可发送数据到病历，皮肤观察尚未获对应自主机制 条件：患者关联、传感器读数与皮肤检查是否分别合格且有人复核异常|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|
|US-HLT-WARD-003 协助床椅转移与行走|减重步行目录与住院/护理机构场景分别适配，不能推所有病区都可采用。 条件：移位与步行时承重、患者配合和支持设备能否分别匹配|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|
|US-HLT-WARD-004 调整卧床患者体位|纵向床头复位不能代表侧翻、俯卧等全部体位。 条件：患者是否适合床头纵向复位，其余体位调整是否仍需要人工或另一装置|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-WARD-005 协助进食并记录摄入|一周居家试用为相邻场景，医院与护理机构患者/支付条件需分开。 条件：吞咽状况、食物形态及开关操控是否适配，摄入量能否独立准确记录|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|
|US-HLT-WARD-006 协助洗浴更衣与如厕|浴室扶手、座椅及移位器具可辅助部分洗浴如厕；穿衣全流程未获本任务实证 条件：洗浴、更衣和如厕各自空间、隐私及患者能力是否适配器具|bounded-mechanism-or-assisted-task-not-full-commercial-success|3|
|US-HLT-WARD-007 向护士交接症状与护理需求|生命体征接口与临床预警辅助信息传递，主诉与护理需求仍需人员记录 条件：症状文字与监测值能否被正确患者的责任护士及时确认|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-WARD-008 响应呼叫并报告突发不适|生命体征预警与响应呼叫/患者主诉是不同触发路径，不能作为本任务的已证正例。 条件：呼叫来源、急迫性与责任人员能否确认，未被传感器覆盖的主诉如何处理|adjacent-evidence-only|0|
|US-HLT-WARD-009 复核不适配的照护安排|照护评估工具辅助复核，护理院HIT退用研究仅提供信息系统采用背景 条件：谁有权限改变照护安排，患者反应与修改理由能否得到复核|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-WARD-010 更换床品并清洁照护用具|床单释放机构辅助人工换单，器具清洁依材料采用相容方法；未证实自动清洁全部用具 条件：污染床单撤除和用具清洁是否分别完成且不造成交叉污染|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|
|US-HLT-WARD-011 完成当班护理记录|生命体征接口减少部分重复录入，综合当班护理记录仍须人员核对 条件：观测值、实际照护和异常交接是否在同一班次正确关联患者|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-REHAB-001 核对个体治疗计划与活动限制|既有康复记录系统支持照护方案，人员仍须核对个体限制与处方 条件：治疗版本、禁忌与本次训练目标是否一致且已获授权|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-REHAB-002 调整训练器材与支持装置|设备服务目录证明存在训练服务，不证明调整/设定器材这个准备动作被辅助或自动完成。 条件：患者尺寸、支撑量与训练装置连接能否按处方安全设定|adjacent-evidence-only|0|
|US-HLT-REHAB-003 协助患者进入训练位置|移位辅助器具与训练支撑设备可协助进入位置，不能省略患者评估 条件：进出训练区路线、吊带和目标支撑是否连续适配患者|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-REHAB-004 指导并支持规定功能活动|减重步行与上肢辅助训练有运营方服务描述，远程活动应用可辅助已批准运动 条件：所选设备是否支持规定功能活动，治疗师能否识别代偿和不耐受|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-REHAB-005 协助穿脱或适配支具|支具门诊与上肢支持设备提供场景依据；自主穿脱及个体适配实证未取得 条件：支具尺寸、压力和穿戴方向能否按个体处方核验|no-task-specific-positive-counterexample-confirmed|2|
|US-HLT-REHAB-006 记录关节活动或活动反应|远程运动监测和数字报表辅助记录运动反应；临床关节活动测量精度须单独验证 条件：动作识别误差和关节范围测量是否满足该治疗评价用途|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-REHAB-007 识别不耐受并报告治疗师|远程运动数据和生命体征预警可作为局部提示，不能自行诊断全部不耐受 条件：疼痛、呼吸变化和运动异常是否有可执行停止及上报规则|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-REHAB-008 按修订方案重设支持与训练条件|数字方案与辅助器具支持人员重设，未核到自动批准并调整完整训练条件 条件：修订版本和装置设定是否经授权并在下一次活动前复核|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-REHAB-009 向照护者示范已批准辅助活动|远程训练应用可展示活动并反馈数据，不能替代照护者实际操作验收 条件：照护者能否理解示范并正确支持患者，数字访问不足如何补充|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-REHAB-010 清洁检查并归位训练设备|适配清洁工具和设备检查清单为候选；未核到归位、检查及清洁全流程自主实证 条件：各器材接触面能否按材料清洁，归位后是否记录失效部件|no-task-specific-positive-counterexample-confirmed|3|
|US-HLT-REHAB-011 向治疗师提交进展记录|康复记录系统从已填资料生成进展报告，远程监测可传入运动资料 条件：报告与实际活动是否一致且治疗师能收到并处理异常|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-HOME-001 核对居家服务计划与家庭环境|数字服务计划与居家器具适配评估为候选，未核到自动完成家庭环境核验 条件：家庭通道、电源、照护者与服务计划是否支持本次器具和任务|no-task-specific-positive-counterexample-confirmed|0|
|US-HLT-HOME-002 协助客户床椅或浴室移动|移位装置、浴室扶手和座椅辅助居家移动，入户空间和照护者能力需现场核实 条件：门宽、吊带、地面和实际移动路线是否适配患者与器具|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-HOME-003 协助洗浴穿衣与个人清洁|扶手、浴椅和移位器具辅助洗浴；穿衣与其他个人清洁分别保留人工边界 条件：洗浴、穿衣和清洁各自是否在居家空间及患者能力下可安全验收|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|
|US-HLT-HOME-004 按规定饮食准备并供应餐食|家用烹饪辅助工具为候选，进食辅助机器人只递送已备食物，不代替按饮食要求备餐 条件：饮食处方、过敏与食物质地是否由准备者确认且器具可兼容|no-task-specific-positive-counterexample-confirmed|2|
|US-HLT-HOME-005 更换床品并处理照护相关洗涤|幼教织物机洗与护理床品是相邻材质/感染控制场景；床单释放产品在家庭使用未核。 条件：家庭设备、织物说明与污染分流是否满足照护用品洗涤要求|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|
|US-HLT-HOME-006 观察并记录客户状态变化|监护器入病历机制与具体家庭环境/设备适用说明分别核对，不当作已验证入户案例。 条件：患者身份、观测值和状态叙述是否一致并传给责任人员|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-HOME-007 陪同客户外出并移交就诊信息|所读FHIR原型限DME/居家医疗订单，不证明一般外出就诊的接收信息交接。 条件：到诊人员、检查资料与接收单位是否同步，运输延误如何补交|adjacent-evidence-only|2|
|US-HLT-HOME-008 报告跌倒风险或突发不适|居家器具报警与人工风险评估为候选；未获自主识别全部跌倒风险和突发不适证据 条件：背景噪声、响应联系人和未触发报警的主诉是否得到覆盖|no-task-specific-positive-counterexample-confirmed|0|
|US-HLT-HOME-009 重新安排未能完成的照护任务|2018康复记录/排程功能不证明对未完成居家照护的原因、优先级和人员条件作出重排。 条件：取消原因、风险、人员技能与客户可用时间能否共同满足改排条件|adjacent-evidence-only|0|
|US-HLT-HOME-010 清洁家庭内照护器具|低风险非共享器具的清洁指导支持流程；自主清洁和确认所有家庭器具尚未证实 条件：器具类型、共用情况与家庭清洁资源是否允许所选清洁方法|no-task-specific-positive-counterexample-confirmed|0|
|US-HLT-HOME-011 提交服务记录与后续需求|DME/居家医疗转介与康复文书的限定范围须在服务记录结论旁显示。 条件：服务实际完成记录与下一服务接收状态是否可追溯|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-CHILD-001 核对儿童签到与照护事项|签到签退软件形成时间与签名记录，照护事项由家庭和机构人员核对 条件：儿童、授权联系人与当日照护提醒能否一致关联|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-CHILD-002 布置并检查游戏环境|检查清单与吸尘工具为候选，普通清洁不等于自动布置和安全检查 条件：游戏布局、绊倒与吞咽风险是否按儿童年龄逐项检查|no-task-specific-positive-counterexample-confirmed|2|
|US-HLT-CHILD-003 监督儿童游戏与身体活动|人员监督配合活动记录工具为候选；未核到可替代成人身体活动监督的完整自动化证据 条件：活动中儿童位置、互动与需要帮助的情形是否能及时被人员发现|no-task-specific-positive-counterexample-confirmed|0|
|US-HLT-CHILD-004 协助儿童进食饮水|适配餐具和分餐工具为候选；未核到符合儿童吞咽及照护要求的自主喂食实证 条件：儿童年龄、过敏、食物质地和进食反应是否由照护者确认|no-task-specific-positive-counterexample-confirmed|0|
|US-HLT-CHILD-005 协助更衣换尿布与如厕|原正例已为未确认；卫生规定仅作流程依据，不能新增机器喂养或个人护理实证。 条件：每种护理是否分别满足卫生、隐私和儿童身体支持条件|no-task-specific-positive-counterexample-confirmed|3|
|US-HLT-CHILD-006 组织休息并观察儿童状态|汇总午睡记录发生在人员观察之后，不能证明组织休息和观察状态的替代。 条件：休息环境和儿童状态是否持续由责任成人核验|adjacent-evidence-only|0|
|US-HLT-CHILD-007 记录活动和健康变化|活动与健康报告汇总教师已填记录；不是自动观察儿童健康变化 条件：记录是否对应实际儿童、活动时间和有意义的异常|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-CHILD-008 发现不适或突发事件后执行通知|活动信息共享可辅助通知家长，紧急识别、联系方式与响应流程仍待机构验证 条件：紧急事件分类和责任联系人是否能及时确认并回复|no-task-specific-positive-counterexample-confirmed|0|
|US-HLT-CHILD-009 更换污染用品并重清活动区|相容织物可机洗烘干并使用清洁工具，取换污染用品与区域重置仍保留人工 条件：污染范围、材质和清洁后区域是否允许儿童重新使用|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|
|US-HLT-CHILD-010 清洁消毒玩具和用具|清洗、消毒为顺序条件，不把放入设备以外的分选/装载/干燥归位人工省去。 条件：玩具材质、孔隙与设备程序是否兼容且清洗后可安全使用|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-CHILD-011 向授权监护人交接儿童与记录|授权联系人签到与每日活动共享辅助交接，实体儿童交付仍需现场核实 条件：接领者实时权限、现场身份和交接记录是否同时确认|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-CHILD-012 归整物品并完成班次清点|物品清单和班次记录为候选；未核到自动归整并清点所有照护用品的实证 条件：小件物品和待清洁用品是否按规定归位并完整核对|no-task-specific-positive-counterexample-confirmed|2|
|US-HLT-SOCIAL-001 登记入住或援助对象的实际需求|HMIS建档查询与扫码服务记录辅助登记，实际需求通过人员了解 条件：避免重复档案的核查与需求访谈是否不阻断拒供敏感信息者服务|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-SOCIAL-002 检查分配住宿空间的基本状态|人员检查后系统可生成记录，床位状态软件不自动检查住宿设施 条件：空间卫生、缺陷和可用状态是否由实际检查者确认|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-SOCIAL-003 交付寝具与必要生活用品|寝具与小件用品包装尺寸和补货方式不同；未确认寝具自助发放。 条件：寝具和用品尺寸、领取权限、补货与卡货处理是否满足服务对象需要|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-SOCIAL-004 组织住客使用共用生活设施|床位状态与服务记录不同于共用设施使用安排和现场协助；仅相邻数字环节。 条件：共用设施容量、无障碍需求和冲突是否能由工作人员及时协调|adjacent-evidence-only|0|
|US-HLT-SOCIAL-005 准备并供应符合需求的集中餐食|其他非营利厨房仅相邻供餐机制；免费志愿者重新分配不计薪资现金节省。 条件：菜单、原料形态、需求量与分装精度是否稳定到足以抵偿部署及残留操作|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|
|US-HLT-SOCIAL-006 观察服务对象的身体与生活困难|数字需求记录可辅助保存访谈资料，身体与生活困难识别未获自主评估实证 条件：服务对象表达、观察结果和升级条件是否由合适人员复核|no-task-specific-positive-counterexample-confirmed|0|
|US-HLT-SOCIAL-007 联系并移交专业机构接续服务|HMIS转介流程由人员选择需求与接收机构并保存资料，实际接续服务另核 条件：信息许可、接收能力与回执是否满足本次转介|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-SOCIAL-008 报告住所危险或服务突发问题|巡查异常自动生成个案记录可辅助通知，危险发现和急迫程度仍由人员判断 条件：住所异常能否定位到责任人、紧急事项是否有独立升级通道|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-SOCIAL-009 按重新评估调整不适配生活安排|床位状态软件辅助调整安排，重新评估适配性仍需与住客及服务者确认 条件：住客需求、可用空间与支持条件是否在新安排生效前被重新核验|bounded-mechanism-or-assisted-task-not-full-commercial-success|0|
|US-HLT-SOCIAL-010 协调寝具洗涤与住所清洁|全球野外营地产品仅机制线索，不能当美国庇护所持续运行。 条件：场地水电、污染分流与实际承包洗衣边界能否匹配选定设备|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|
|US-HLT-SOCIAL-011 完成离所物品与接续服务交接|HMIS退出及转介记录辅助接续信息，离所物品的实际清点交付尚未获自动化实证 条件：物品交付、当晚去向与接续方确认能否分别留下可核记录|bounded-mechanism-or-assisted-task-not-full-commercial-success|2|

## 机会与后续验证

### US-HLT-OP-SPECIMEN · 先验证标本身份、申请与接收回执闭环

成立条件：床旁核实患者身份；实验室与送检端使用可关联标识；未匹配标本进入受控人工处置。

取得一所私人机构去标识的标本交接、暂缓原因和修复记录，比较原流程与拟议对账流程漏项、返工及完整投入。

### US-HLT-OP-STERILE · 按器械兼容性比较机械清洗、组盘辅助与监测接口

成立条件：按器械与负载而非统一盘数验收；保留污物、功能及包装检查；装载与停机维护工时计入。

选定盘型收集现行洗涤、组盘、监测与返工工单，测量全部人工和不合格原因，再做受控设备适配试验。

### US-HLT-OP-MOVE · 按患者与空间配置移位和床头复位辅助工具

成立条件：个体临床评估通过；吊带床体及路线相容；准备、清洁、等待和残留护理均计入。

在批准的照护情景观察完整任务，并核对器具可用性、实际人员操作、异常和采购维护成本，避免用产品秒数当任务工时。

### US-HLT-OP-RECORD · 验证临床数据自动传入后的复核与接续处理

成立条件：正确患者与实际任务关联；保留人员观察和授权；拒收、断网与未响应能追踪。

比较传感器、病历与实际照护记录的对应关系，测量异常处理负担和可兑现的重复录入现金成本。

## 来源与定位

|来源|时期与证据层级|范围|
|---|---|---|
|[FDA-ALETTA · FDA Authorizes First-Of-Its-Kind Robotic Blood Draw Device](https://www.fda.gov/news-events/press-announcements/fda-authorizes-first-its-kind-robotic-blood-draw-device)|2026-08-19获准上市；不是美国机构持续运营记录；official-regulatory-authorization|监管摘要非独立长期经营效果；临床批准不等于无需人工，更不支持全部种类标本或儿科。|
|[ATELLICA · Atellica Integrated Automation on Atellica Solution](https://www.siemens-healthineers.com/en-us/laboratory-automation/atellica-integrated-automation)|未署期美国产品页；vendor-product-description|限于所定位动作、指导或事件；不证明整个任务自动完成、当前持续在用或完整现金回报。|
|[SPECIMEN-LOST · Specimen Almost Lost](https://psnet.ahrq.gov/web-mm/specimen-almost-lost)|2017匿名病例及作者所在实验室的流程评论；clinical-case-and-author-workflow-commentary|病例所在机构未具名，作者署名Beth Israel Deaconess不证明病例就发生在该院；文内二手统计不采用。|
|[H-CLIA · 42 CFR 493 Subpart K, 2022 edition](https://www.govinfo.gov/content/pkg/CFR-2022-title42-vol5/pdf/CFR-2022-title42-vol5-part493-subpartK.pdf)|2022-10-01历史条文，本轮未完成2026现行文本逐条核对；historical-official-rule-text|仅旧版任务流程定位，不作为2026合规意见；双栏原PDF文字按标题及打印页定位。|
|[H-XRAY · Medical X-ray Imaging](https://www.fda.gov/radiation-emitting-products/medical-imaging/medical-x-ray-imaging)|网页含历史项目和持续指导，正式发布日期未确认；official-radiation-protection-guidance|限于所定位动作、指导或事件；不证明整个任务自动完成、当前持续在用或完整现金回报。|
|[UI-RAD · United Imaging Announces the uDR Aurora CX](https://usa.united-imaging.com/news/press/united-imaging-announces-the-udr-aurora-cx)|2025-09厂商新品发布，称已FDA cleared，未独立复核许可号；vendor-product-launch|限于所定位动作、指导或事件；不证明整个任务自动完成、当前持续在用或完整现金回报。|
|[GE-QUALITY · Quality Care Suite 2.0](https://www.gehealthcare.com/en-us/products/radiography-and-fluoroscopy/quality-care-suite)|页面文号JB22535XX February 2026；vendor-product-description|厂商内部节省工时、点击次数、覆盖率和AUC未纳入任务数字；仅机制、范围与人工决策边界。|
|[FDA-REPROCESS · Factors Affecting Quality of Reprocessing](https://www.fda.gov/medical-devices/reprocessing-reusable-medical-devices/factors-affecting-quality-reprocessing)|未署期监管汇总；official-regulatory-risk-assessment|限于所定位动作、指导或事件；不证明整个任务自动完成、当前持续在用或完整现金回报。|
|[H-STERILE · Recommendations for Disinfection and Sterilization in Healthcare Facilities](https://www.cdc.gov/infection-control/hcp/disinfection-sterilization/summary-recommendations.html)|2008指导；页面2023-12-07及明确历次更新；official-process-guidance|按推荐编号定位；不发布临床操作参数；内镜特有条款不可套全部器械。非单一私人医院现场SOP或设备效果证据。|
|[RIF-WELLSTAR · RIF Robotics pioneers autonomous surgical tray assembly](https://catalyst.wellstar.org/casestudies/rif-robotics/)|2023-08试点，2023-12组盘里程碑；未确认页面发布日期；operator-investor-pilot-report|Wellstar同时投资方和试点运营方，非独立验证；2026持续运行与成本未确认。|
|[CENSITRAC · Surgical Instrument Tracking Software](https://censis.com/products/censitrac/)|无署期美国产品页，包含2026推广语；vendor-product-description|限于所定位动作、指导或事件；不证明整个任务自动完成、当前持续在用或完整现金回报。|
|[SMARTSPONGE · ClearCount SmartSponge 510(k) summary K071355](https://www.accessdata.fda.gov/cdrh_docs/pdf7/K071355.pdf)|2006-10申报材料准备，2007-05-24许可函；不证明2026销售或在运；historical-manufacturer-regulatory-submission|已核公开申报摘要机制；本稿未以该页独立证明长期临床效果。|
|[COUNT2008 · The frequency and significance of discrepancies in the surgical count](https://pubmed.ncbi.nlm.nih.gov/18650646/)|2008发表美国择期普外现场观察；historical-primary-observational-study|只读PubMed索引摘要；工时为整台手术计数活动，不能分摊到原子任务或作2026基线。|
|[FDA-LIFT · Patient Lifts](https://www.fda.gov/medical-devices/general-hospital-devices-and-supplies/patient-lifts)|内容更新2018-08-22的设备指导；official-device-guidance|跨主体设备指导；不证明任何特定私人机构的采购、工时或事故。|
|[G-VAAPP · Safe Patient Handling](https://mobile.va.gov/app/safe-patient-handling)|无署期工具目录；official-tool-description|限于所定位动作、指导或事件；不证明整个任务自动完成、当前持续在用或完整现金回报。|
|[HERCULES · The Hercules System](https://morelcompany.com/products/)|无署期产品说明；vendor-product-description|床头纵向复位不等于左右翻身、重新铺单或全部体位护理；不采用自报人数和秒数。|
|[OBI · Meet Obi: the Independent Eating Device](https://meetobi.com/)|无署期当前产品页；vendor-product-description|不据此证实吞咽评估、准备食物、喂水或自动摄入记录；须经个体评估。|
|[OBI-STUDY · Usability and Functional Outcomes of the Obi3 Robotic Feeding Device](https://www.sciencedirect.com/science/article/pii/S2369252926000700)|2026年短期居家使用研究；观察期一周；精确发表月日未从保留的出版方原文确认；primary-usability-study-with-manufacturer-conflicts|已读出版商摘要、方法概述和利益披露，未把居家短测当美国私人护理院持续商业效果；不采用效果分数与减工时数字。 本轮按独立审校将未获保留原文佐证的2026-08-12撤为null，仅保留发表年份；没有另行取得JMIR全文。|
|[NH-ABANDON · A Survey of Technology Abandonment in US Nursing Homes](https://pubmed.ncbi.nlm.nih.gov/37837997/)|2019–2021两期调查；2023-10在线发表、2024-01卷期；primary-longitudinal-survey|仅PubMed摘要；没有分辨每个照护动作或机器，不能作为喂饭、洗浴或移位机器人弃用证据。|
|[INOVA-REHAB · Inova Inpatient Rehabilitation](https://www.inova.org/inova-rehabilitation-services/inpatient-rehabilitation)|未署期机构服务目录，2026-09-09读取；operator-service-description|服务目录不提供日常运行频率、逐任务工时或效果，雇佣关系和具体院区仍待核对；不把所有列出的器具视为动力机器人。|
|[BAXTER-VITAL · Baxter Launches Welch Allyn Connex 360 Vital Signs Monitor](https://investor.baxter.com/investors/events-and-news/news/press-release-details/2025/Baxter-Launches-Welch-Allyn-Connex-360-Vital-Signs-Monitor-to-Advance-Connected-Patient-Monitoring/default.aspx)|2025-09新品发布，厂商称美国可订购；vendor-product-launch|限于所定位动作、指导或事件；不证明整个任务自动完成、当前持续在用或完整现金回报。|
|[HHS-RPM · Physical therapy and remote patient monitoring](https://telehealth.hhs.gov/providers/best-practice-guides/telehealth-for-physical-therapy/physical-therapy-and-remote-patient-monitoring)|页面更新2025-07-29；official-technology-guidance|限于所定位动作、指导或事件；不证明整个任务自动完成、当前持续在用或完整现金回报。|
|[APTA-CONNECT · APTA Connect](https://www.apta.org/your-practice/documentation/connect)|2018产品合作说明，2026销售/运行未核；historical-partner-product-description|APTA为产品合作方，不视作独立商业效果验证。|
|[FDA-HOME · Unique Considerations in the Home](https://www.fda.gov/medical-devices/home-use-devices/unique-considerations-home)|无署期居家器械指导；official-environmental-risk-guidance|限于所定位动作、指导或事件；不证明整个任务自动完成、当前持续在用或完整现金回报。|
|[BATH-NEED · Unmet Need for Equipment to Help With Bathing and Toileting Among Older US Adults](https://pmc.ncbi.nlm.nih.gov/articles/PMC7985819/)|2015–2019 NHATS；2021-03-22发表；primary-observational-cohort-analysis|已读原研究索引摘要与Methods/Results选段；机构雇员参与照护、当年实际成本与2026覆盖未核。|
|[CMS-FHIR · Post-acute FHIR Order and Referrals](https://www.cms.gov/data-research/computer-data-systems/emdi/post-acute-fhir-order-and-referrals)|页面2026-03-04更新，原型与已结束试点项目；official-prototype-and-pilot-program-description|限于所定位动作、指导或事件；不证明整个任务自动完成、当前持续在用或完整现金回报。|
|[HOME-OIG · Home Health Agencies Failed To Report Over Half of Falls With Major Injury and Hospitalization Among Their Medicare Patients](https://www.oig.hhs.gov/reports/all/2023/home-health-agencies-failed-to-report-over-half-of-falls-with-major-injury-and-hospitalization-among-their-medicare-patients/)|2023审核；所读摘要未给出完整索赔观察期；official-independent-reporting-audit|不采用标题比例作为任务数字；主体含营利、非营利及政府机构，不能推为所有私人机构状况。|
|[H-CHILD · Health and Safety Requirements](https://www.childcare.gov/consumer-education/regulated-child-care/health-and-safety-requirements)|未署期说明，州级具体规范另查；official-process-overview|未覆盖各州详细标准和指定设施SOP，不能由此确认全自动照护验收。|
|[BRIGHT-CHECK · Check-in Report](https://help.mybrightwheel.com/en/articles/2652805-check-in-report)|页面2026-07-01；vendor-user-documentation|限于所定位动作、指导或事件；不证明整个任务自动完成、当前持续在用或完整现金回报。|
|[BRIGHT-REPORT · Overview of reports & data available in brightwheel](https://help.mybrightwheel.com/en/articles/942384-overview-of-reports-data-available-in-brightwheel)|2025-10-30产品帮助文档；vendor-user-documentation|不采用自报节省时间；信息来自教师或联系人填写，不等于机器判断健康。|
|[BRIGHT-FEED · View your child’s activity feed](https://help.mybrightwheel.com/en/articles/942392-view-your-child-s-activity-feed)|帮助页2025-05-13；vendor-user-documentation|限于所定位动作、指导或事件；不证明整个任务自动完成、当前持续在用或完整现金回报。|
|[BRIGHT-PICKUP · Everything you need to know about student check-in](https://help.mybrightwheel.com/en/articles/942374-everything-you-need-to-know-about-student-check-in)|帮助页可见日期2025-12-11；尚未区分首次发表或更新时间；vendor-user-documentation|限于所定位动作、指导或事件；不证明整个任务自动完成、当前持续在用或完整现金回报。|
|[FDA-INFANT · Do Not Use Unauthorized Infant Devices for Monitoring Vital Signs](https://www.fda.gov/medical-devices/safety-communications/do-not-use-unauthorized-infant-devices-monitoring-vital-signs-fda-safety-communication)|安全通告2025-09-16；official-device-safety-communication|针对生命体征设备，不扩展为所有摄像头违法或全部儿童睡眠设备失效。|
|[CDC-CHILD-CLEAN · How To Clean and Disinfect Early Care and Education Settings](https://www.cdc.gov/hygiene/about/how-to-clean-and-disinfect-early-care-and-education-settings.html)|页面2024-04-19；official-process-guidance|限于所定位动作、指导或事件；不证明整个任务自动完成、当前持续在用或完整现金回报。|
|[H-SHELTER · 24 CFR 576 Subpart E, 2022 edition](https://www.govinfo.gov/content/pkg/CFR-2022-title24-vol3/pdf/CFR-2022-title24-vol3-part576-subpartE.pdf)|2022-04-01历史版，现行逐条核查未完成；historical-official-rule-text|仅紧急庇护所(b)，不混永久住房(c)；原文是设施条件，不证明某职业亲自完成所有动作。|
|[ANDGO-BED · Bed Management](https://andgocm.com/features/bed-management/)|无署期产品页；vendor-product-description|限于所定位动作、指导或事件；不证明整个任务自动完成、当前持续在用或完整现金回报。|
|[FREEVEND · freevend](https://reversebus.com/freevend/)|网页2026-09-08更新计数；方案发布日期未知；operator-service-marketing|页面包含规划放置场所，具体美国已部署地点和长期持续性未核；不声称已有某庇护所自动发寝具；不采用动态发放数量。|
|[CHEF-OPENHAND · How Project Open Hand Makes Medically Tailored Meals With Chef’s AI-Enabled Robots](https://www.chefrobotics.ai/case-studies/project-open-hand)|无署期具名旧部署叙述，2026持续性另核；vendor-named-US-nonprofit-case|不采用宣传生产率和份数；仅分装机制与志愿者边界，厂商与运营方引述未构成独立审计。|
|[GAO-SHELTER · Homelessness: Agency Actions Could Improve Data on Shelter Program Use](https://files.gao.gov/reports/GAO-26-107502/index.html)|2024-05至2025-09审计；2025-12-23发报告、2026-01-22公开；official-independent-data-audit|2026-01-22为公开日。统计估计审计只为数据边界，不作为洗衣、配餐等动作反例。|
|[SOCIAL-LAUNDRY · Support Systems: Laundry](https://www.weatherhaven.com/support-systems/laundry/)|无署期全球野外设施产品说明；vendor-global-product-description|限于所定位动作、指导或事件；不证明整个任务自动完成、当前持续在用或完整现金回报。|
|[ROBONURSE · RoboNurse-VLA: Robotic Scrub Nurse System based on Vision-Language-Action Model](https://arxiv.org/abs/2409.19590)|2024-09-29预印本摘要；research-prototype-not-clinical-deployment|本轮只读摘要，不使用成功率或比较效果。需全文复核实验地点、样本与失败定义。|
|[HMIS-CLIENT · Creating a Client](https://www.councilforthehomeless.org/wp-content/uploads/2021/06/HMIS-Cheat-Sheet-Create-a-Client.pdf)|未署期旧界面讲义，URL年月不当发布日期；operator-digital-workflow-guide|地方运营机构旧讲义；未确认2026界面版本，不能代表全美HMIS或所有社会服务。|
|[HMIS-REFERRAL · Making a Referral](https://www.councilforthehomeless.org/wp-content/uploads/2021/06/HMIS-Cheat-Sheet-Add-a-Referral.pdf)|未署期旧界面讲义；operator-digital-workflow-guide|地方运营机构流程；未确认2026界面版本及接受方实际服务结果。|
|[HMIS-EXIT · Close Out an Entry](https://www.councilforthehomeless.org/wp-content/uploads/2021/06/HMIS-Cheat-Sheet-Exit-a-Client-From-Program.pdf)|未署期旧界面讲义；operator-digital-workflow-guide|地方运营机构旧界面流程；不是离所全过程自动完成案例。|
|[HMIS-SCAN · Add a Service in SkanPoint](https://www.councilforthehomeless.org/wp-content/uploads/2021/06/HMIS-Cheat-Sheet-Use-SkanPoint-to-Add-Services.pdf)|未署期旧界面讲义；operator-digital-workflow-guide|地方服务记录流程；未核2026版本，不能以扫码速度当实体服务工时。|
|[O21-1093.00 · O*NET Detailed Report 21-1093.00](https://www.onetonline.org/link/details/21-1093.00)|2026-09-09网页快照；各职业更新时点未单独确认；official-occupation-task-description|职业范围含不同执行者，不能证明私营照护机构场景、现场验收、劳动时长或自动化比例。|
|[O29-2034.00 · O*NET Detailed Report 29-2034.00](https://www.onetonline.org/link/details/29-2034.00)|2026-09-09网页快照；各职业更新时点未单独确认；official-occupation-task-description|职业范围含不同执行者，不能证明私营照护机构场景、现场验收、劳动时长或自动化比例。|
|[O29-2055.00 · O*NET Detailed Report 29-2055.00](https://www.onetonline.org/link/details/29-2055.00)|2026-09-09网页快照；各职业更新时点未单独确认；official-occupation-task-description|职业范围含不同执行者，不能证明私营照护机构场景、现场验收、劳动时长或自动化比例。|
|[O31-1121.00 · O*NET Detailed Report 31-1121.00](https://www.onetonline.org/link/details/31-1121.00)|2026-09-09网页快照；各职业更新时点未单独确认；official-occupation-task-description|职业范围含不同执行者，不能证明私营照护机构场景、现场验收、劳动时长或自动化比例。|
|[O31-1131.00 · O*NET Detailed Report 31-1131.00](https://www.onetonline.org/link/details/31-1131.00)|2026-09-09网页快照；各职业更新时点未单独确认；official-occupation-task-description|职业范围含不同执行者，不能证明私营照护机构场景、现场验收、劳动时长或自动化比例。|
|[O31-2021.00 · O*NET Detailed Report 31-2021.00](https://www.onetonline.org/link/details/31-2021.00)|2026-09-09网页快照；各职业更新时点未单独确认；official-occupation-task-description|职业范围含不同执行者，不能证明私营照护机构场景、现场验收、劳动时长或自动化比例。|
|[O31-9093.00 · O*NET Detailed Report 31-9093.00](https://www.onetonline.org/link/details/31-9093.00)|2026-09-09网页快照；各职业更新时点未单独确认；official-occupation-task-description|职业范围含不同执行者，不能证明私营照护机构场景、现场验收、劳动时长或自动化比例。|
|[O31-9097.00 · O*NET Detailed Report 31-9097.00](https://www.onetonline.org/link/details/31-9097.00)|2026-09-09网页快照；各职业更新时点未单独确认；official-occupation-task-description|职业范围含不同执行者，不能证明私营照护机构场景、现场验收、劳动时长或自动化比例。|
|[O35-2012.00 · O*NET Detailed Report 35-2012.00](https://www.onetonline.org/link/details/35-2012.00)|2026-09-09网页快照；各职业更新时点未单独确认；official-occupation-task-description|职业范围含不同执行者，不能证明私营照护机构场景、现场验收、劳动时长或自动化比例。|
|[O39-9011.00 · O*NET Detailed Report 39-9011.00](https://www.onetonline.org/link/details/39-9011.00)|2026-09-09网页快照；各职业更新时点未单独确认；official-occupation-task-description|职业范围含不同执行者，不能证明私营照护机构场景、现场验收、劳动时长或自动化比例。|

完整短锚、LF缓存行号、PDF物理/印刷页和缓存SHA见同名JSON sources；长第三方原文和完整查询结果仅作私下审计。

## 仍待完成

- 当前100项9场景只是已有候选，不能把职业、流程或一个设备目录视为行业全量任务清单。
- 原200查询日期只到日，未获得原请求包和逐批UTC；本次没有重复执行全部查询，也不声称检索穷尽。
- 访谈、实测人工、同一执行者完整现金流、连续商业运行及任务专属退出原因不足。
- 历史CLIA/ESG条文现行逐条核对未完成，未用其作现行法律结论；没有提供临床操作参数。
- 数字接口、许可、厂商宣传、实验室原型、试点、机构服务目录与持续运行分别保留层级。
- {"scene": "SPECIMEN", "work": "静脉/毛细/动脉与其他标本流程、检验前离心分样、检验分析/培养/制片的独立任务；当前仅宽泛处理条目。"}
- {"scene": "IMAGING", "work": "按常规X线/CT区分流程，专门准备、药物、儿科与特殊体位、患者运输和非X线模式另盘点。"}
- {"scene": "STERILE", "work": "软式内镜漏检/管腔处理、设备专属维护与各监测类别的装载/读取/放行工作。"}
- {"scene": "OR", "work": "临床术式、麻醉、止血缝合等治疗任务另拆；敷料、针具与器械清点对象分别展开。"}
- {"scene": "WARD", "work": "医院和护理机构场景分开，支持器具准备、呼叫现场处理、药物/伤口/导管等依法按执行者盘点。"}
- {"scene": "REHAB", "work": "具体功能训练、支具、言语/职业治疗及儿童/神经场景；不以物理治疗辅助职责覆盖全部康复。"}
- {"scene": "HOME", "work": "不同器具的入户适配、消耗品补充/废物处置与任务中实际雇主、家庭无偿劳动边界。"}
- {"scene": "CHILD", "work": "年龄、过敏/残障照护、户外/接送等子场景；奶瓶与奶液准备等原职业动作没有逐项进入清单。"}
- {"scene": "SOCIAL", "work": "设施分配、物资分发、厨房/洗衣/清洁直接作业的执行者及SOP；非住宿社会援助与特殊人群服务另盘点。"}
- {"scene": "industry", "work": "院前急救、牙科、专业诊疗、精神健康、药房实体调配与其他未列主要卫生社会援助场景。"}
