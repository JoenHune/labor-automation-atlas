# 美国卫生与社会援助：首轮自动化研究独立复核

审查原稿 SHA-256：`9ccb13a0421f068081b614cf679f1ed5a8131788271734102acff37418d62537`。审查者为原作者之外的根代理。

本次核对100项既有候选、55来源的325定位；45来源按相关段阅读，10职业读取完整Tasks。全部仍未冻结；不是行业完整覆盖、临床验收或商业运行认证。

## 原文与判断修订

### HLT-E01 · confirmed-error

接收日期与时间的定位271实际是§493.1239质量活动记录；同短句命中不能证明结论。
改§493.1242(b)LF328—330、物理5/印刷744左栏，并同步所有嵌套引用。

### HLT-E02 · confirmed-error

原quote在LF210/物理6/印刷4-1，section却定位印刷5-2；进出差额另需机制段。
保留有效短引，修物理页/印刷页并添加1—2页机制定位。

### HLT-E03 · metadata-correction

历史法规版次不等于网页发布日期；GAO公开与报告日期不同；Brightwheel已有可见日期；OBI精确日缺所保留原文佐证。
按sourceDecisions分列日期性质，不能用抓取日、文件URL或搜索摘要补精确刊日。OBI若补到发布方原文可再审后保留。

### HLT-E04 · locator-completeness

部分复合概述超出单个短锚附近文字，或定位到了搜索摘要而非已存在的正文。
添加已读完整支持段及行号；OBI利益披露定位到缓存尾部正文。

### HLT-E05 · validation-metadata-correction

职业定位quote为空而rawQuoteMatch为true，空串匹配不能算逐字引文核验。PDF的LF与splitlines也不能混用。
空引文保持无引文状态，以可复查行号和动作概述验证；声明LF分行及PDF页码。无需抄录整份职业任务表。

### HLT-E06 · scope-clarification

找不到静脉、移动过度和其他传感器风险的停止/暂停/报警机制不是同一句条件。
按sourceDecisions逐条件陈述，授权范围及人员监督紧邻显示。

### HLT-J01 · research-judgment-revision

8项所引功能只支持相邻阶段或相邻任务，原正例标签容易高估当前任务的替代程度。
按逐任务repairs降为adjacent-evidence-only，并保留实际支持动作和证据不足。

### HLT-J02 · research-judgment-revision

原14项拆分建议之外仍有可分别验收核算的组合项；2项阶段需调整。
新增建议只作拟议，不新增正式任务数；保留原快照，按逐项atomicityReview和phaseReview处理。

### HLT-G01 · evidence-gap

200条query计划及50批结果存在，但没有保存原search_query请求包或逐批UTC。
只声明作者记录的执行日期与结果关联已检查，不能标成独立重放或原始请求核验。后续检索保存实际请求和UTC。

### HLT-G02 · framework-clarification

年度营运资金只写后续变化，未把相邻期增量余额差分明确到公式。
令W_t为相对无项目基线的增量营运资金余额，年度扣W_t-W_(t-1)；期初与期末各一次，末期余额回收不双算。所有结果继续留空。

### HLT-G03 · evidence-gap

9场景与100候选并非整个医疗社会援助行业完整覆盖，反例和所有技术类别对照未穷尽。
保留场景缺口，补充本报告遗漏组、传统机械/专机基线、实体参数和逐项访谈，不冻结。

## 来源审查

- **FDA-ALETTA** [FDA Authorizes First-Of-Its-Kind Robotic Blood Draw Device](https://www.fda.gov/news-events/press-announcements/fda-authorizes-first-its-kind-robotic-blood-draw-device)：成人门诊、训练采血人员监督；上市授权不能当持续商业运行。移动过度时脱针停止与其他传感器暂停报警分别表述。
- **ATELLICA** [Atellica Integrated Automation on Atellica Solution](https://www.siemens-healthineers.com/en-us/laboratory-automation/atellica-integrated-automation)：管条码、开盖、实验室内追踪和接口局部机制；不确认床旁患者身份、管完整性或院外包装。
- **SPECIMEN-LOST** [Specimen Almost Lost](https://psnet.ahrq.gov/web-mm/specimen-almost-lost)：2017病例的申请/标本接口中断及作者对账建议，非机器人故障或效果对照试验。
- **H-CLIA** [42 CFR 493 Subpart K, 2022 edition](https://www.govinfo.gov/content/pkg/CFR-2022-title42-vol5/pdf/CFR-2022-title42-vol5-part493-subpartK.pdf)：2022历史版§493.1241/1242相关正文及物理第5页图像已读；接收时间定位必须从同短句的错误条款移到328—330。
- **H-XRAY** [Medical X-ray Imaging](https://www.fda.gov/radiation-emitting-products/medical-imaging/medical-x-ray-imaging)：必要性、足够成像质量与剂量监测；参考水平不是硬性上限，不提供自动临床决策依据。
- **UI-RAD** [United Imaging Announces the uDR Aurora CX](https://usa.united-imaging.com/news/press/united-imaging-announces-the-udr-aurora-cx)：2025厂商新品的机器位置、准直和参数调整，不证明搬动患者身体，也不推所有影像模式。
- **GE-QUALITY** [Quality Care Suite 2.0](https://www.gehealthcare.com/en-us/products/radiography-and-fluoroscopy/quality-care-suite)：协议与肺野提示由技师判断；图像转正不等于患者体位或接收端交接完成。
- **FDA-REPROCESS** [Factors Affecting Quality of Reprocessing](https://www.fda.gov/medical-devices/reprocessing-reusable-medical-devices/factors-affecting-quality-reprocessing)：具体设计、验证与培训风险；已读285—329。不是所有机械清洗不可行或本机构事故。
- **H-STERILE** [Recommendations for Disinfection and Sterilization in Healthcare Facilities](https://www.cdc.gov/infection-control/hcp/disinfection-sterilization/summary-recommendations.html)：按材料与具体程序区分手工、机械、灭菌、监测和返工；19.d服务记录与19.i维护人员须补齐定位。
- **RIF-WELLSTAR** [RIF Robotics pioneers autonomous surgical tray assembly](https://catalyst.wellstar.org/casestudies/rif-robotics/)：2023院内试点小盘部分组装；技师仍查污物/功能，自动查污属计划，流程改型非已证机器故障。
- **CENSITRAC** [Surgical Instrument Tracking Software](https://censis.com/products/censitrac/)：扫码、清单、兼容读数器/接口及数字阻止；原召回通知须补279或935—936，未证明物理隔离。
- **SMARTSPONGE** [ClearCount SmartSponge 510(k) summary K071355](https://www.accessdata.fda.gov/cdrh_docs/pdf7/K071355.pdf)：RFID专用纱布、垫、毛巾计数；所引句实际在物理6/印刷4-1，进出差额机制另在物理1—2。
- **COUNT2008** [The frequency and significance of discrepancies in the surgical count](https://pubmed.ncbi.nlm.nih.gov/18650646/)：历史术中计数差异观察，不能作为RFID或机器人失效研究。
- **FDA-LIFT** [Patient Lifts](https://www.fda.gov/medical-devices/general-hospital-devices-and-supplies/patient-lifts)：电动和手动液压辅助转移；患者状态、吊带、承重和检查条件及跌落事件均限原设备语境。
- **G-VAAPP** [Safe Patient Handling](https://mobile.va.gov/app/safe-patient-handling)：可供VA及非VA参考的评估工具，不确认私人机构实际采用，也非膳食限制核验。
- **HERCULES** [The Hercules System](https://morelcompany.com/products/)：人按键使床单纵向卷动；释放床单辅助人工换单，不证明左右翻身或自动换床品。
- **OBI** [Meet Obi: the Independent Eating Device](https://meetobi.com/)：使用者开关控制已准备食物递送；不证明备餐、所有吞咽条件或儿童照护。
- **OBI-STUDY** [Usability and Functional Outcomes of the Obi3 Robotic Feeding Device](https://www.sciencedirect.com/science/article/pii/S2369252926000700)：ScienceDirect可读摘要、贡献和完整利益披露已读，JMIR全文未获；一周居家试用不推长期效果。精确发表日尚未佐证。
- **NH-ABANDON** [A Survey of Technology Abandonment in US Nursing Homes](https://pubmed.ncbi.nlm.nih.gov/37837997/)：2019—2021护理院HIT能力变化的退用，混合所有制；不是实体护理机器退出。
- **INOVA-REHAB** [Inova Inpatient Rehabilitation](https://www.inova.org/inova-rehabilitation-services/inpatient-rehabilitation)：机构提供步行、上肢及支具服务，目录不证明自动设定器材或持续运行效果。
- **BAXTER-VITAL** [Baxter Launches Welch Allyn Connex 360 Vital Signs Monitor](https://investor.baxter.com/investors/events-and-news/news/press-release-details/2025/Baxter-Launches-Welch-Allyn-Connex-360-Vital-Signs-Monitor-to-Advance-Connected-Patient-Monitoring/default.aspx)：2025新品采集并传入病历、评分提示；不替代皮肤观察，也未证家庭用机或主诉响应。
- **HHS-RPM** [Physical therapy and remote patient monitoring](https://telehealth.hhs.gov/providers/best-practice-guides/telehealth-for-physical-therapy/physical-therapy-and-remote-patient-monitoring)：运动指导、动作监测和数据传递；RPM与RTM区别保留，数字可及性是潜在条件。
- **APTA-CONNECT** [APTA Connect](https://www.apta.org/your-practice/documentation/connect)：2018康复记录系统从输入生成方案与文书，不能自动重排居家照护优先级。
- **FDA-HOME** [Unique Considerations in the Home](https://www.fda.gov/medical-devices/home-use-devices/unique-considerations-home)：空间、电力、清洁、水源和报警环境条件；水源在303，不能只用废物段291支持。
- **BATH-NEED** [Unmet Need for Equipment to Help With Bathing and Toileting Among Older US Adults](https://pmc.ncbi.nlm.nih.gov/articles/PMC7985819/)：2015—2019美国社区老人观察；2021发表。不是住院/护理院样本或设备故障证据。
- **CMS-FHIR** [Post-acute FHIR Order and Referrals](https://www.cms.gov/data-research/computer-data-systems/emdi/post-acute-fhir-order-and-referrals)：DME和居家医疗订单/转介原型与试点已结束，不是技术失败，不自动覆盖所有门诊交接。
- **HOME-OIG** [Home Health Agencies Failed To Report Over Half of Falls With Major Injury and Hospitalization Among Their Medicare Patients](https://www.oig.hhs.gov/reports/all/2023/home-health-agencies-failed-to-report-over-half-of-falls-with-major-injury-and-hospitalization-among-their-medicare-patients/)：OASIS与住院索赔漏报审计，非物理报警器失败；当前只采用摘要，观察期缺口保留。
- **H-CHILD** [Health and Safety Requirements](https://www.childcare.gov/consumer-education/regulated-child-care/health-and-safety-requirements)：托育卫生、活动、休息、病情与设施要求，具体州规范和机构SOP未核，不证明无人照护。
- **BRIGHT-CHECK** [Check-in Report](https://help.mybrightwheel.com/en/articles/2652805-check-in-report)：2026-07-01帮助页签到记录与管理员补录；纠错功能不等于实测差错率。
- **BRIGHT-REPORT** [Overview of reports & data available in brightwheel](https://help.mybrightwheel.com/en/articles/942384-overview-of-reports-data-available-in-brightwheel)：汇总已录入活动、健康和饮食记录，不能替代成人观察。
- **BRIGHT-FEED** [View your child’s activity feed](https://help.mybrightwheel.com/en/articles/942392-view-your-child-s-activity-feed)：家长查看学校填入的记录；不能由此证明紧急响应或实物交接。
- **BRIGHT-PICKUP** [Everything you need to know about student check-in](https://help.mybrightwheel.com/en/articles/942374-everything-you-need-to-know-about-student-check-in)：缓存17有2025-12-11页面日期；授权联系人见60，扫码与代码见21、28—35及46—48。现场身份核对是研究条件。
- **FDA-INFANT** [Do Not Use Unauthorized Infant Devices for Monitoring Vital Signs](https://www.fda.gov/medical-devices/safety-communications/do-not-use-unauthorized-infant-devices-monitoring-vital-signs-fda-safety-communication)：2025-09-16针对未授权婴儿生命体征设备；不推所有摄像头、所有儿童或所有休息监测。
- **CDC-CHILD-CLEAN** [How To Clean and Disinfect Early Care and Education Settings](https://www.cdc.gov/hygiene/about/how-to-clean-and-disinfect-early-care-and-education-settings.html)：符合材料要求的机洗烘干、消毒洗碗和吸尘步骤；必须先处理污物，其他场景标相邻。
- **H-SHELTER** [24 CFR 576 Subpart E, 2022 edition](https://www.govinfo.gov/content/pkg/CFR-2022-title24-vol3/pdf/CFR-2022-title24-vol3-part576-subpartE.pdf)：2022历史版ESG紧急庇护所§576.403(b)，物理5/印刷204两栏及图像已读；排除(c)永久住房。
- **ANDGO-BED** [Bed Management](https://andgocm.com/features/bed-management/)：人检查不通过后自动生成记录与床位状态管理，不能自动发现设施危险。
- **FREEVEND** [freevend](https://reversebus.com/freevend/)：凭手机号/凭证发放适配物品机制；指定美国场所、寝具及长期采用尚未确认，不采用动态发放数。
- **CHEF-OPENHAND** [How Project Open Hand Makes Medically Tailored Meals With Chef’s AI-Enabled Robots](https://www.chefrobotics.ai/case-studies/project-open-hand)：厂商转述旧金山非营利厨房局部分装、固定自动化不适配和志愿者重新分配；不证明工资节省。
- **GAO-SHELTER** [Homelessness: Agency Actions Could Improve Data on Shelter Program Use](https://files.gao.gov/reports/GAO-26-107502/index.html)：报告日期2025-12-23、公开2026-01-22分列；HMIS自报质量与估计透明性问题不作实体服务失败。
- **SOCIAL-LAUNDRY** [Support Systems: Laundry](https://www.weatherhaven.com/support-systems/laundry/)：全球野外营地洗涤脱水烘干产品，不能当美国庇护所采用。
- **ROBONURSE** [RoboNurse-VLA: Robotic Scrub Nurse System based on Vision-Language-Action Model](https://arxiv.org/abs/2409.19590)：2024预印本摘要的语音器械递送原型；全文、场地和临床美国部署未核。
- **HMIS-CLIENT** [Creating a Client](https://www.councilforthehomeless.org/wp-content/uploads/2021/06/HMIS-Cheat-Sheet-Create-a-Client.pdf)：旧地方讲义先查档再建档，不以SSN拒供阻断服务；URL年月不作发布日期。
- **HMIS-REFERRAL** [Making a Referral](https://www.councilforthehomeless.org/wp-content/uploads/2021/06/HMIS-Cheat-Sheet-Add-a-Referral.pdf)：先检查资料披露许可，人选服务和接收方，未证明接收方实际履约。
- **HMIS-EXIT** [Close Out an Entry](https://www.councilforthehomeless.org/wp-content/uploads/2021/06/HMIS-Cheat-Sheet-Exit-a-Client-From-Program.pdf)：人记录离所原因及当晚去向，去向未知保留状态，不证明物品交付。
- **HMIS-SCAN** [Add a Service in SkanPoint](https://www.councilforthehomeless.org/wp-content/uploads/2021/06/HMIS-Cheat-Sheet-Use-SkanPoint-to-Add-Services.pdf)：卡扫描或手输再由人核姓名照片，记录不是实物分发；旧界面现行版本未知。
- **O21-1093.00** [O*NET Detailed Report 21-1093.00](https://www.onetonline.org/link/details/21-1093.00)：已读此职业完整Tasks原缓存；仅支持相应动作发现，不推当前行业、所有制、验收或工时。
- **O29-2034.00** [O*NET Detailed Report 29-2034.00](https://www.onetonline.org/link/details/29-2034.00)：已读此职业完整Tasks原缓存；仅支持相应动作发现，不推当前行业、所有制、验收或工时。
- **O29-2055.00** [O*NET Detailed Report 29-2055.00](https://www.onetonline.org/link/details/29-2055.00)：已读此职业完整Tasks原缓存；仅支持相应动作发现，不推当前行业、所有制、验收或工时。
- **O31-1121.00** [O*NET Detailed Report 31-1121.00](https://www.onetonline.org/link/details/31-1121.00)：已读此职业完整Tasks原缓存；仅支持相应动作发现，不推当前行业、所有制、验收或工时。
- **O31-1131.00** [O*NET Detailed Report 31-1131.00](https://www.onetonline.org/link/details/31-1131.00)：已读此职业完整Tasks原缓存；仅支持相应动作发现，不推当前行业、所有制、验收或工时。
- **O31-2021.00** [O*NET Detailed Report 31-2021.00](https://www.onetonline.org/link/details/31-2021.00)：已读此职业完整Tasks原缓存；仅支持相应动作发现，不推当前行业、所有制、验收或工时。
- **O31-9093.00** [O*NET Detailed Report 31-9093.00](https://www.onetonline.org/link/details/31-9093.00)：已读此职业完整Tasks原缓存；仅支持相应动作发现，不推当前行业、所有制、验收或工时。
- **O31-9097.00** [O*NET Detailed Report 31-9097.00](https://www.onetonline.org/link/details/31-9097.00)：已读此职业完整Tasks原缓存；仅支持相应动作发现，不推当前行业、所有制、验收或工时。
- **O35-2012.00** [O*NET Detailed Report 35-2012.00](https://www.onetonline.org/link/details/35-2012.00)：已读此职业完整Tasks原缓存；仅支持相应动作发现，不推当前行业、所有制、验收或工时。
- **O39-9011.00** [O*NET Detailed Report 39-9011.00](https://www.onetonline.org/link/details/39-9011.00)：已读此职业完整Tasks原缓存；仅支持相应动作发现，不推当前行业、所有制、验收或工时。

## 逐项裁决

| 任务 | 适用范围判断 | 拆分建议数 | 状态 |
| --- | --- | ---: | --- |
| US-HLT-SPECIMEN-001 核对患者身份与检验申请 | 条码核对与申请对账辅助人员确认患者；不是自动确定真实身份 | 0 | corrections-required；未冻结 |
| US-HLT-SPECIMEN-002 准备采样器材与工作盘 | 器材清单与标准工作盘为候选；未核到按患者申请自动备齐并验收全部采样用品的实证 | 0 | corrections-required；未冻结 |
| US-HLT-SPECIMEN-003 向患者说明采集并核对准备状态 | 数字说明与核对表为候选；许可采血机器人仍处于人员监督范围 | 2 | corrections-required；未冻结 |
| US-HLT-SPECIMEN-004 由授权人员采集规定标本 | 采集对象尚过宽；静脉、毛细、动脉及其他标本须分别展开许可/流程条件，不能共享设备许可。 | 0 | corrections-required；未冻结 |
| US-HLT-SPECIMEN-005 检查标本容器与识别信息 | 多视角条码读取辅助识别核对，容器完好与标本状态仍须另验 | 2 | corrections-required；未冻结 |
| US-HLT-SPECIMEN-006 处理标本以满足检验前条件 | 检验前处理包含不同动作和方法；开盖不覆盖离心、分样和所有处理，待方法分解。 | 0 | corrections-required；未冻结 |
| US-HLT-SPECIMEN-007 包装保存并交实验室或承运方 | 原正例已为未确认，保留该判断；实验室内追踪与外运包装/保存只是相邻证据。 | 3 | corrections-required；未冻结 |
| US-HLT-SPECIMEN-008 拒收或隔离标识不清和不合格标本 | 信息不足标本保留与沟通有流程依据；规则预警和物理隔离为候选 | 0 | corrections-required；未冻结 |
| US-HLT-SPECIMEN-009 依据授权重新采集所需标本 | 成人门诊机器人采血机制可能用于重新采集，但重采授权和原因判定未验证 | 0 | corrections-required；未冻结 |
| US-HLT-SPECIMEN-010 处置锐器并清洁采集环境 | 采血设备包含针具处置，患者间设备清洁仍需专业人员；环境清洁须另计 | 2 | corrections-required；未冻结 |
| US-HLT-SPECIMEN-011 登记实验室接收时间与流转结果 | 条码追踪和LIS接口辅助接收及流转记录；接收主体必须确认实际收件 | 0 | corrections-required；未冻结 |
| US-HLT-IMAGING-001 核对影像申请与病史相关信息 | 申请核对清单和设备协议不匹配提示辅助检查；病史与临床必要性由人员判断 | 0 | corrections-required；未冻结 |
| US-HLT-IMAGING-002 检查影像设备与质控状态 | 设备质控程序为依据，自动QC测试为候选；未核到覆盖完整设备状态的无人验收 | 0 | corrections-required；未冻结 |
| US-HLT-IMAGING-003 协助患者定位到检查体位 | 吊移设备可辅助转移，三维模型自动调整的是影像机器位置；患者实际体位仍另核 | 0 | corrections-required；未冻结 |
| US-HLT-IMAGING-004 设置并执行经批准的影像采集 | 厂商设备根据患者模型调整机器及曝光参数；临床批准和实际采集仍在人员控制边界 | 0 | corrections-required；未冻结 |
| US-HLT-IMAGING-005 检查影像可诊断质量 | 协议和肺野截断检测提示技师检查特定影像，不能概括所有影像可诊断质量 | 0 | corrections-required；未冻结 |
| US-HLT-IMAGING-006 记录剂量指标和设备设置 | DICOM结构化剂量报告辅助设备设置与剂量指标归档 | 0 | corrections-required；未冻结 |
| US-HLT-IMAGING-007 报告设备故障或患者不良反应 | 设备日志与临床通知流程为候选；未核到同一机制同时判定硬件故障和患者不良反应 | 2 | corrections-required；未冻结 |
| US-HLT-IMAGING-008 由临床团队决定必要的重采 | 图像截断提示支持技师判断是否重拍；没有自主替临床团队决定重采证据 | 0 | corrections-required；未冻结 |
| US-HLT-IMAGING-009 移交影像与患者检查信息 | 图像方向校正和剂量结构文件是交接前的数字处理，未证影像与患者信息传到正确接收端。 | 0 | corrections-required；未冻结 |
| US-HLT-IMAGING-010 清洁接触面并交修异常设备 | 适配表面清洁工具与设备报修工单为候选；普通清洁指导不证明自动交修 | 2 | corrections-required；未冻结 |
| US-HLT-IMAGING-011 完成患者离室协助与检查记录 | 患者转移辅助器具可覆盖离室一部分，检查记录与离室交接须独立验证 | 2 | corrections-required；未冻结 |
| US-HLT-STERILE-001 接收清点用后器械 | 器械扫描更新位置并对照数字清单，不能自行判断来件数量与污染状态 | 0 | corrections-required；未冻结 |
| US-HLT-STERILE-002 拆分器械并清除可见污物 | 手工与适配机械预清洗结合；复杂器械拆分方法需按器械核对 | 2 | corrections-required；未冻结 |
| US-HLT-STERILE-003 执行兼容的器械清洗 | 超声、清洗消毒机及相应手工步骤组成候选流程 | 0 | corrections-required；未冻结 |
| US-HLT-STERILE-004 检查清洁度与器械完整性 | 原正例已为未确认，保留；人查污物属于残留人工，不新增自动检验结论。 | 2 | corrections-required；未冻结 |
| US-HLT-STERILE-005 组装器械包并选择兼容包装 | 数字清单辅助组盘，Wellstar旧试点完成部分小盘组装；包装兼容另核 | 2 | corrections-required；未冻结 |
| US-HLT-STERILE-006 装载灭菌设备并运行批准循环 | 批准灭菌设备执行循环，装载方式和负载适配由人员确认 | 2 | corrections-required；未冻结 |
| US-HLT-STERILE-007 读取机械化学生物监测结果 | 机械、化学、生物指标的时间和放行要求不同，按设备/周期展开后分别验收，不能统一成功率。 | 0 | corrections-required；未冻结 |
| US-HLT-STERILE-008 隔离监测失败或破包器械 | 数字规则硬停止和召回提醒可辅助阻止流转，实物隔离与检索仍需人员或另验设备 | 0 | corrections-required；未冻结 |
| US-HLT-STERILE-009 重包装并重处理允许返工器械 | 重新包装与再处理有规定流程，包装机器人未获本场景合格实证 | 2 | corrections-required；未冻结 |
| US-HLT-STERILE-010 标记循环批号并转无菌储存 | 标签打印、扫码存位可辅助批号与储存关联，物理存放仍单独验收 | 2 | corrections-required；未冻结 |
| US-HLT-STERILE-011 清洁保养再处理设备 | 预防维护流程与维护工单为候选；未核到自行诊断并维修再处理设备的完整实证 | 0 | corrections-required；未冻结 |
| US-HLT-STERILE-012 发放器械并核对包状态 | 器械追踪可辅助出库登记；包状态检查及交付仍由人员核验 | 0 | corrections-required；未冻结 |
| US-HLT-OR-001 按手术清单备齐器械与耗材 | 排程关联的拣选清单与数字组盘清单辅助备物，不替代全部实物准备 | 0 | corrections-required；未冻结 |
| US-HLT-OR-002 检查并布置无菌工作区 | 无菌区布置与包装检查辅助工具为候选，未核到全区自主搭建和无菌验收实证 | 0 | corrections-required；未冻结 |
| US-HLT-OR-003 按临床指令协助患者体位摆放 | 辅助床台转移不等于达到具体术式体位，后者仍须单独适配与验收。 | 0 | corrections-required；未冻结 |
| US-HLT-OR-004 清点手术器械敷料与针具 | 带标签敷料、针具、金属器械的计数机制不同，先按对象展开再冻结。 | 0 | corrections-required；未冻结 |
| US-HLT-OR-005 按请求传递器械与耗材 | 实验室原型地域未确认，不能串为美国临床部署；只保留全球技术线索。 | 0 | corrections-required；未冻结 |
| US-HLT-OR-006 标识并移交术中标本 | 条码与申请对账为数字辅助候选，尚未确认术中封装和运送整体自动化 | 0 | corrections-required；未冻结 |
| US-HLT-OR-007 报告器械计数差异或无菌破坏 | 敷料标签差异提示辅助部分计数异常报告；无菌破坏识别和上报另待验证 | 2 | corrections-required；未冻结 |
| US-HLT-OR-008 更换污染器械或重新布置受影响无菌区 | 库存与追踪系统可能辅助查找替换器械，实际污染去除和无菌区恢复仍未证实自动化 | 2 | corrections-required；未冻结 |
| US-HLT-OR-009 清点回收器械并移交再处理 | 扫描追踪与敷料计数辅助回收登记；锐器清点和污染器械输送另核 | 2 | corrections-required；未冻结 |
| US-HLT-OR-010 补充手术室物料并完成记录 | 按排程数字清单可辅助补货与记录，实体拿取和库存异常仍需另验 | 2 | corrections-required；未冻结 |
| US-HLT-WARD-001 核对照护计划与膳食限制 | 移动评估工具不支持自动核验当班膳食限制，场景背景保留。 | 0 | corrections-required；未冻结 |
| US-HLT-WARD-002 观察并记录生命体征与皮肤变化 | 生命体征监测器可发送数据到病历，皮肤观察尚未获对应自主机制 | 2 | corrections-required；未冻结 |
| US-HLT-WARD-003 协助床椅转移与行走 | 减重步行目录与住院/护理机构场景分别适配，不能推所有病区都可采用。 | 2 | corrections-required；未冻结 |
| US-HLT-WARD-004 调整卧床患者体位 | 纵向床头复位不能代表侧翻、俯卧等全部体位。 | 0 | corrections-required；未冻结 |
| US-HLT-WARD-005 协助进食并记录摄入 | 一周居家试用为相邻场景，医院与护理机构患者/支付条件需分开。 | 2 | corrections-required；未冻结 |
| US-HLT-WARD-006 协助洗浴更衣与如厕 | 浴室扶手、座椅及移位器具可辅助部分洗浴如厕；穿衣全流程未获本任务实证 | 3 | corrections-required；未冻结 |
| US-HLT-WARD-007 向护士交接症状与护理需求 | 生命体征接口与临床预警辅助信息传递，主诉与护理需求仍需人员记录 | 0 | corrections-required；未冻结 |
| US-HLT-WARD-008 响应呼叫并报告突发不适 | 生命体征预警与响应呼叫/患者主诉是不同触发路径，不能作为本任务的已证正例。 | 0 | corrections-required；未冻结 |
| US-HLT-WARD-009 复核不适配的照护安排 | 照护评估工具辅助复核，护理院HIT退用研究仅提供信息系统采用背景 | 0 | corrections-required；未冻结 |
| US-HLT-WARD-010 更换床品并清洁照护用具 | 床单释放机构辅助人工换单，器具清洁依材料采用相容方法；未证实自动清洁全部用具 | 2 | corrections-required；未冻结 |
| US-HLT-WARD-011 完成当班护理记录 | 生命体征接口减少部分重复录入，综合当班护理记录仍须人员核对 | 0 | corrections-required；未冻结 |
| US-HLT-REHAB-001 核对个体治疗计划与活动限制 | 既有康复记录系统支持照护方案，人员仍须核对个体限制与处方 | 0 | corrections-required；未冻结 |
| US-HLT-REHAB-002 调整训练器材与支持装置 | 设备服务目录证明存在训练服务，不证明调整/设定器材这个准备动作被辅助或自动完成。 | 0 | corrections-required；未冻结 |
| US-HLT-REHAB-003 协助患者进入训练位置 | 移位辅助器具与训练支撑设备可协助进入位置，不能省略患者评估 | 0 | corrections-required；未冻结 |
| US-HLT-REHAB-004 指导并支持规定功能活动 | 减重步行与上肢辅助训练有运营方服务描述，远程活动应用可辅助已批准运动 | 0 | corrections-required；未冻结 |
| US-HLT-REHAB-005 协助穿脱或适配支具 | 支具门诊与上肢支持设备提供场景依据；自主穿脱及个体适配实证未取得 | 2 | corrections-required；未冻结 |
| US-HLT-REHAB-006 记录关节活动或活动反应 | 远程运动监测和数字报表辅助记录运动反应；临床关节活动测量精度须单独验证 | 0 | corrections-required；未冻结 |
| US-HLT-REHAB-007 识别不耐受并报告治疗师 | 远程运动数据和生命体征预警可作为局部提示，不能自行诊断全部不耐受 | 0 | corrections-required；未冻结 |
| US-HLT-REHAB-008 按修订方案重设支持与训练条件 | 数字方案与辅助器具支持人员重设，未核到自动批准并调整完整训练条件 | 0 | corrections-required；未冻结 |
| US-HLT-REHAB-009 向照护者示范已批准辅助活动 | 远程训练应用可展示活动并反馈数据，不能替代照护者实际操作验收 | 0 | corrections-required；未冻结 |
| US-HLT-REHAB-010 清洁检查并归位训练设备 | 适配清洁工具和设备检查清单为候选；未核到归位、检查及清洁全流程自主实证 | 3 | corrections-required；未冻结 |
| US-HLT-REHAB-011 向治疗师提交进展记录 | 康复记录系统从已填资料生成进展报告，远程监测可传入运动资料 | 0 | corrections-required；未冻结 |
| US-HLT-HOME-001 核对居家服务计划与家庭环境 | 数字服务计划与居家器具适配评估为候选，未核到自动完成家庭环境核验 | 0 | corrections-required；未冻结 |
| US-HLT-HOME-002 协助客户床椅或浴室移动 | 移位装置、浴室扶手和座椅辅助居家移动，入户空间和照护者能力需现场核实 | 0 | corrections-required；未冻结 |
| US-HLT-HOME-003 协助洗浴穿衣与个人清洁 | 扶手、浴椅和移位器具辅助洗浴；穿衣与其他个人清洁分别保留人工边界 | 2 | corrections-required；未冻结 |
| US-HLT-HOME-004 按规定饮食准备并供应餐食 | 家用烹饪辅助工具为候选，进食辅助机器人只递送已备食物，不代替按饮食要求备餐 | 2 | corrections-required；未冻结 |
| US-HLT-HOME-005 更换床品并处理照护相关洗涤 | 幼教织物机洗与护理床品是相邻材质/感染控制场景；床单释放产品在家庭使用未核。 | 2 | corrections-required；未冻结 |
| US-HLT-HOME-006 观察并记录客户状态变化 | 监护器入病历机制与具体家庭环境/设备适用说明分别核对，不当作已验证入户案例。 | 0 | corrections-required；未冻结 |
| US-HLT-HOME-007 陪同客户外出并移交就诊信息 | 所读FHIR原型限DME/居家医疗订单，不证明一般外出就诊的接收信息交接。 | 2 | corrections-required；未冻结 |
| US-HLT-HOME-008 报告跌倒风险或突发不适 | 居家器具报警与人工风险评估为候选；未获自主识别全部跌倒风险和突发不适证据 | 0 | corrections-required；未冻结 |
| US-HLT-HOME-009 重新安排未能完成的照护任务 | 2018康复记录/排程功能不证明对未完成居家照护的原因、优先级和人员条件作出重排。 | 0 | corrections-required；未冻结 |
| US-HLT-HOME-010 清洁家庭内照护器具 | 低风险非共享器具的清洁指导支持流程；自主清洁和确认所有家庭器具尚未证实 | 0 | corrections-required；未冻结 |
| US-HLT-HOME-011 提交服务记录与后续需求 | DME/居家医疗转介与康复文书的限定范围须在服务记录结论旁显示。 | 0 | corrections-required；未冻结 |
| US-HLT-CHILD-001 核对儿童签到与照护事项 | 签到签退软件形成时间与签名记录，照护事项由家庭和机构人员核对 | 0 | corrections-required；未冻结 |
| US-HLT-CHILD-002 布置并检查游戏环境 | 检查清单与吸尘工具为候选，普通清洁不等于自动布置和安全检查 | 2 | corrections-required；未冻结 |
| US-HLT-CHILD-003 监督儿童游戏与身体活动 | 人员监督配合活动记录工具为候选；未核到可替代成人身体活动监督的完整自动化证据 | 0 | corrections-required；未冻结 |
| US-HLT-CHILD-004 协助儿童进食饮水 | 适配餐具和分餐工具为候选；未核到符合儿童吞咽及照护要求的自主喂食实证 | 0 | corrections-required；未冻结 |
| US-HLT-CHILD-005 协助更衣换尿布与如厕 | 原正例已为未确认；卫生规定仅作流程依据，不能新增机器喂养或个人护理实证。 | 3 | corrections-required；未冻结 |
| US-HLT-CHILD-006 组织休息并观察儿童状态 | 汇总午睡记录发生在人员观察之后，不能证明组织休息和观察状态的替代。 | 0 | corrections-required；未冻结 |
| US-HLT-CHILD-007 记录活动和健康变化 | 活动与健康报告汇总教师已填记录；不是自动观察儿童健康变化 | 0 | corrections-required；未冻结 |
| US-HLT-CHILD-008 发现不适或突发事件后执行通知 | 活动信息共享可辅助通知家长，紧急识别、联系方式与响应流程仍待机构验证 | 0 | corrections-required；未冻结 |
| US-HLT-CHILD-009 更换污染用品并重清活动区 | 相容织物可机洗烘干并使用清洁工具，取换污染用品与区域重置仍保留人工 | 2 | corrections-required；未冻结 |
| US-HLT-CHILD-010 清洁消毒玩具和用具 | 清洗、消毒为顺序条件，不把放入设备以外的分选/装载/干燥归位人工省去。 | 0 | corrections-required；未冻结 |
| US-HLT-CHILD-011 向授权监护人交接儿童与记录 | 授权联系人签到与每日活动共享辅助交接，实体儿童交付仍需现场核实 | 0 | corrections-required；未冻结 |
| US-HLT-CHILD-012 归整物品并完成班次清点 | 物品清单和班次记录为候选；未核到自动归整并清点所有照护用品的实证 | 2 | corrections-required；未冻结 |
| US-HLT-SOCIAL-001 登记入住或援助对象的实际需求 | HMIS建档查询与扫码服务记录辅助登记，实际需求通过人员了解 | 0 | corrections-required；未冻结 |
| US-HLT-SOCIAL-002 检查分配住宿空间的基本状态 | 人员检查后系统可生成记录，床位状态软件不自动检查住宿设施 | 0 | bounded-evidence-with-gaps；未冻结 |
| US-HLT-SOCIAL-003 交付寝具与必要生活用品 | 寝具与小件用品包装尺寸和补货方式不同；未确认寝具自助发放。 | 0 | bounded-evidence-with-gaps；未冻结 |
| US-HLT-SOCIAL-004 组织住客使用共用生活设施 | 床位状态与服务记录不同于共用设施使用安排和现场协助；仅相邻数字环节。 | 0 | corrections-required；未冻结 |
| US-HLT-SOCIAL-005 准备并供应符合需求的集中餐食 | 其他非营利厨房仅相邻供餐机制；免费志愿者重新分配不计薪资现金节省。 | 2 | corrections-required；未冻结 |
| US-HLT-SOCIAL-006 观察服务对象的身体与生活困难 | 数字需求记录可辅助保存访谈资料，身体与生活困难识别未获自主评估实证 | 0 | corrections-required；未冻结 |
| US-HLT-SOCIAL-007 联系并移交专业机构接续服务 | HMIS转介流程由人员选择需求与接收机构并保存资料，实际接续服务另核 | 0 | corrections-required；未冻结 |
| US-HLT-SOCIAL-008 报告住所危险或服务突发问题 | 巡查异常自动生成个案记录可辅助通知，危险发现和急迫程度仍由人员判断 | 0 | corrections-required；未冻结 |
| US-HLT-SOCIAL-009 按重新评估调整不适配生活安排 | 床位状态软件辅助调整安排，重新评估适配性仍需与住客及服务者确认 | 0 | corrections-required；未冻结 |
| US-HLT-SOCIAL-010 协调寝具洗涤与住所清洁 | 全球野外营地产品仅机制线索，不能当美国庇护所持续运行。 | 2 | corrections-required；未冻结 |
| US-HLT-SOCIAL-011 完成离所物品与接续服务交接 | HMIS退出及转介记录辅助接续信息，离所物品的实际清点交付尚未获自动化实证 | 2 | corrections-required；未冻结 |

## 补充盘点与采访

- SPECIMEN：静脉/毛细/动脉与其他标本流程、检验前离心分样、检验分析/培养/制片的独立任务；当前仅宽泛处理条目。
- IMAGING：按常规X线/CT区分流程，专门准备、药物、儿科与特殊体位、患者运输和非X线模式另盘点。
- STERILE：软式内镜漏检/管腔处理、设备专属维护与各监测类别的装载/读取/放行工作。
- OR：临床术式、麻醉、止血缝合等治疗任务另拆；敷料、针具与器械清点对象分别展开。
- WARD：医院和护理机构场景分开，支持器具准备、呼叫现场处理、药物/伤口/导管等依法按执行者盘点。
- REHAB：具体功能训练、支具、言语/职业治疗及儿童/神经场景；不以物理治疗辅助职责覆盖全部康复。
- HOME：不同器具的入户适配、消耗品补充/废物处置与任务中实际雇主、家庭无偿劳动边界。
- CHILD：年龄、过敏/残障照护、户外/接送等子场景；奶瓶与奶液准备等原职业动作没有逐项进入清单。
- SOCIAL：设施分配、物资分发、厨房/洗衣/清洁直接作业的执行者及SOP；非住宿社会援助与特殊人群服务另盘点。
- industry：院前急救、牙科、专业诊疗、精神健康、药房实体调配与其他未列主要卫生社会援助场景。

## 审查限制

- 当前100项9场景只是已有候选，不能把职业、流程或一个设备目录视为行业全量任务清单。
- 原200查询日期只到日，未获得原请求包和逐批UTC；本次没有重复执行全部查询，也不声称检索穷尽。
- 访谈、实测人工、同一执行者完整现金流、连续商业运行及任务专属退出原因不足。
- 历史CLIA/ESG条文现行逐条核对未完成，未用其作现行法律结论；没有提供临床操作参数。
- 数字接口、许可、厂商宣传、实验室原型、试点、机构服务目录与持续运行分别保留层级。

只有应用修订并复检后才可接入公开工作版；评论和采访线索不自动变成研究事实。
