# 机械、医疗器械、汽车与运输设备：125 项任务独立复核

**结论：需要作者修订，暂不接纳为已通过独审的首轮研究。** 本报告对应原作者稿 `438c048d…682606`。125 项任务、18 个场景均已逐项复核；任务清单未冻结，本轮未增加网站研究完成数。

复核读取了42份自动化来源的60处定位，以及8份任务定义资料（45个PDF选定页和1份HTML选定段）。另补读5处相邻正文或元数据。250条主查询、4条补充查询与64组保存的请求回包相符。候选池含1216条记录；这不是1216个原网站全文已读的声明。

其中26项任务需要先修订具体结论或证据关系，其余保留有范围限定的首轮结果及覆盖缺口。结构校验确认125份原任务快照与原盘点一致；全部人工数字、23项现金参数、NPV和回收期仍为空。

本次另尝试8个官方或原发布者网页，4个相关正文成功读取；其余访问失败或未取得正文时，明确使用已保存的原始相关段。未以访问成功推定资料反映当前持续运行。

## 必须修订的证据关系

### E01 粘结后封边误作结构胶接的直接局部证据

原文：[航空航天点胶应用](https://www.viscotec.com/cn/applications/aerospace/)（行67—73）。

所引行67—73明确是已有粘结部件的边缘、凹槽填充密封。当前 partial 标签和“只替代混胶涂胶”省略这一工序条件。

**处理要求：** 将本任务的来源关系收窄为邻接；保留双组分混合涂布机制，并另登记粘结后封边的任务候选。若要恢复直接支持，补结构胶接的匹配原文。

验收时点：首轮研究接纳前。涉及任务：`cn-ind-civil-plane-structure-004`。

### E02 铁路软管要求与通用胶管夹紧配置混合

原文：[微控软管试验台技术要求](https://www.simingte.com/weikrgsytjsyq.htm)（行43—53）。

行43—51为铁路试验要求；行52另起胶管气密检测设备，行53才说明气动或液压夹紧。没有证据确认两段是同一铁路配置。

**处理要求：** 拆开来源定位与设备范围，铁路条目保留试验目录，通用胶管夹紧只作邻接或适配假设，未补证前不维持77的直接 partial。

验收时点：首轮研究接纳前。涉及任务：`cn-ind-rail-vehicle-assembly-004`, `cn-ind-rail-brake-subassembly-003`, `cn-ind-rail-brake-subassembly-004`。

### E03 前序分离与废物收容混合，并串入另一产品限制

原文：[智能集中供回液系统](https://chinaftech.com/cn/productline/5gxz14xgmhm)（行85—98）；[SMT500V 移动式切削液净化机](https://friess.cn/product/smt500v/)（行120—128）。

24以已分离残渣废液为输入，却用前序屑液分离支撑收容。唯一候选是FTECH，FRIESS限制仍被标为直接候选限制；没有指定候选关系。

**处理要求：** 分清物理分离、收容和记录辅助；24不再将分离当当前动作直接支持。限制绑定具体 alternativeId；无对应候选的FRIESS限制移为邻接记录，勿影响22中FRIESS的真实边界。

验收时点：首轮研究接纳前。涉及任务：`cn-ind-bearing-fluid-loop-001`, `cn-ind-bearing-fluid-loop-003`。

### E04 合装供钉案例迁入已合装车辆调整

原文：[车身、内饰、底盘三线并进：某新能源整车厂携手砺星完成总装自动化升级](https://www.leetx.com/gyinfo/157.html)（行125—133）；[车身、内饰、底盘三线并进：某新能源整车厂携手砺星完成总装自动化升级](https://www.leetx.com/gyinfo/157.html)（行117—124）。

资料描述合装工位供钉；60的输入是合装车辆，任务为后续机械和电器调整。未证该供钉系统适用于调整或返工触发。

**处理要求：** 60改为邻接或明确待验证迁移，除非补对应调整证据。机会清单以59已匹配局部为中心，59/60同一供料事件不得重复计。

验收时点：首轮研究接纳前。涉及任务：`cn-ind-auto-final-assembly-013`。

### E05 装配测量迁入待装配件检查关口

原文：[多场融合测量驱动的飞机大部件对接质量控制](https://www.qk.sjtu.edu.cn/ktfy/CN/abstract/abstract49031.shtml)（L13—34）。

摘要报告装配全周期几何关系管控，没有明确待装配件来件检查的采样、判定与放行关口。

**处理要求：** 标为从装配测量迁移的候选假设或邻接，说明尚未建立该检查关口的直接适用。不得把所有几何检查或材质状态纳入。

验收时点：首轮研究接纳前。涉及任务：`cn-ind-civil-plane-structure-002`。

### E06 套圈清洗机名录与已描述机制的等级未分开

原文：[全自动深沟球轴承装配线](https://www.jscst.com.cn/newsinfo/5875512.html)（L7—16）；[装配（HCH 制造与质量页面）](https://www.hchbearing.com/cn/Manuquality.aspx?Seccid=169&cid=24)（行49—53）。

CST相关段只列套圈清洗机与连线，9-A1却标partial；HCH另有超声清洗陈述，不能跨来源补足CST的机构。

**处理要求：** 9-A1收窄为目录；9-A2按本身清洗机制保留局部候选。任务总体可因A2维持局部研究状态。

验收时点：首轮研究接纳前。涉及任务：`cn-ind-bearing-assembly-001`。

### E07 开发描述未明确样机阶段

原文：[基于数字孪生的船舶小组立无人化生产线](https://cxo.sjtu.edu.cn/info/1211/9671.htm)（行68—73）；[基于数字孪生的船舶小组立无人化生产线](https://cxo.sjtu.edu.cn/info/1211/9671.htm)（行74—80）。

行64—89描述自主研发装备和技术转移场景，但没有明确样机或验收阶段。现标research-developer-prototype-description。

**处理要求：** 用开发方技术描述、具体部署阶段未明的标签；不能自行升级或降格成实验样机。保留局部机制与未有具名验收的边界。

验收时点：首轮研究接纳前。涉及任务：`cn-ind-ship-plate-parts-003`, `cn-ind-ship-block-assemble-001`。

### E08 FDA中英文范围差异与更新时间需在使用处体现

原文：[评估中国制造的塑料注射器的潜在器械故障：FDA 安全通报](https://www.fda.gov/medical-devices/safety-communications/gengxinpingguzhongguozhizaodesuliaozhusheqideqianzaiqixieguzhangmeiguoshipinyaopinjianduguanliju-fda)（L54—75）；[FDA 英文通报](https://www.fda.gov/medical-devices/safety-communications/update-evaluating-plastic-syringes-made-china-potential-device-failures-fda-safety-communication)（更新及排除范围段）。

中文页把口服列入普遍排除，当前英文页没有此项且涉及特定肠内产品；两页都排除预充式。来源证据期只列首发日期，更新日期仅在限制说明。

**处理要求：** 保留2024-03-19首发及2024-08-16更新，记录语言差异。当前任务只使用已一致核实的预充式排除，避免合写“口服局部用途”。不得推本项目受影响或自动化导致缺陷。

验收时点：首轮研究接纳前。涉及任务：`cn-ind-medical-syringe-assemble-001`, `cn-ind-medical-syringe-assemble-002`。

### E09 工具干燥被额外限定为晾干

原文：[北京市高分子材料类医疗器械生产质量管理规范检查指南（2023版）](https://yjj.beijing.gov.cn/yjj/ztzl48/ylqxjgfwzn/jdjczn61/436310266/index.html)（七、生产管理 洁净室卫生与清场；本批文本行287—295）。

北京指南行291相关条款为清洁工具的洗涤、干燥与存放，并未限定采用自然晾干。

**处理要求：** 改为干燥，方式保持未知；同步结论、残留人工、证据缺口和引用镜像。

验收时点：首轮研究接纳前。涉及任务：`cn-ind-medical-polymer-clean-tools-004`。

### E10 医疗焊接资料的夹钳混称仅藏在全局限制

原文：[华工激光焊接技术推动医疗改革进步](https://www.hglaser.com/about/news-detail-41915.htm)（补读规范化正文行214—240及原定位）。

原文前文讲止血夹、组织夹，所引焊接段转称止血钳与活检钳。全局限制已披露，但任务处只写本厂夹型待核，仍容易误读为同一器械。

**处理要求：** 在使用处标注原网页混称、产品同一性未核。保留金属连接一般候选和历史研发困难，不把临床投诉归因为焊接或自动化。

验收时点：首轮研究接纳前。涉及任务：`cn-ind-medical-hemostatic-clip-003`, `cn-ind-medical-hemostatic-clip-004`, `cn-ind-medical-hemostatic-clip-005`。

### E11 机械夹紧与人工上件混称

原文：[铁路车辆制动阀研磨机（CN207508984U）](https://patents.google.com/patent/CN207508984U/zh)（L81—106）。

专利公开气缸驱动夹爪固定及往复研磨。任务写人工定位装夹仍待测，未把已描述的机械夹紧与未明确操作者的放件区分。

**处理要求：** 列清上件、初定位、气缸夹紧、研磨及取件；未说明的执行者为未知，机械夹紧不归为必然人工。仍保持专利设计、非商业运行。

验收时点：首轮研究接纳前。涉及任务：`cn-ind-rail-brake-subassembly-001`。

### E12 管切断功能摘要被当成已展开的执行机制

原文：[船舶管系柔性智能化管加工生产线解决方案及研制](https://www.71dhj.com/zh/article/doi/10.7512/j.issn.1001-2303.2023.05.19/)（行109—110）。

摘要提出工单驱动的各加工动作和适配难点，未展开切断执行机构或对应现场验收。直接切管候选与partial容易高于同批仅功能目录的标准。

**处理要求：** 保留研究摘要中的功能流程和中控思路，将实体切断机制设为未展开、范围级候选；除非补到匹配执行机构。不得由摘要能力宣称推持续运行。

验收时点：首轮研究接纳前。涉及任务：`cn-ind-ship-pipe-fit-001`, `cn-ind-ship-pipe-fit-002`。

### M01 可见网页时间没有进入元数据

原文：[船用管试水压机｜船用水压试验机](https://www.smt-y.com/cpzs/jcsyj/915.html)（补读规范化正文行61—66，可见时间在行64）。

所存页面在标题后显示2021-03-04 08:18:01，但当前写网页未显示可核发布日期。时间字段未标明究竟是首发或更新，不能擅定性质。

**处理要求：** 记录页面可见时间和原文位置，日期性质设为未明确；调整证据期说明，不把访问日作为持续运行。

验收时点：首轮研究接纳前。涉及任务：`cn-ind-ship-pipe-fit-005`, `cn-ind-ship-pipe-fit-008`。

### G01 同批已读来源的自由边打磨与管焊接机制未登记

原文：[基于数字孪生的船舶小组立无人化生产线](https://cxo.sjtu.edu.cn/info/1211/9671.htm)（规范化正文行64—89，特别是自由边打磨行72—73）；[船用管系制造](https://www.huahengrobot.com/case/126.html)（规范化正文行280—290，特别是焊接机制行288）。

SJTU行72—73明确自由边几何、轨迹及双边打磨；华恒行288明确多层多道程序和激光跟踪。前者可继续核边缘加工，后者属于管系焊接，不能只用笼统设备目录排除。

**处理要求：** 补准确定位和独立局部机制。自由边打磨按86实际边缘产出匹配；管焊接另登记流程缺口，不伪装成弯管、校管或船上安装。不得填写网页宣传收益。

验收时点：首轮研究接纳前。涉及任务：`cn-ind-ship-plate-parts-005`, `cn-ind-ship-block-assemble-002`, `cn-ind-ship-pipe-fit-002`, `cn-ind-ship-pipe-fit-003`。

### G02 医疗流程图的装配前检验未单列

原文：[宁波英赛迪医疗科技有限公司注射器塑料件及止血夹生产线环境影响报告表（2024年10月拟建）](https://zjjcmspublic.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/jcms_files/jcms1/web3462/site/attach/0/b3f28c7ee3e34f8281e72e85c14f6bd6.pdf)物理PDF第23页图2-2：修边与组装之间的检验方框，本次视觉补读。。

物理PDF23页图2-2显示修边后经检验，合格针筒芯杆再进入组装；现有28是组装后测试，不覆盖前一关口。

**处理要求：** 保留原始任务快照，新增未计数的装配前检验候选和待补具体项目。原有回料合法适用缺口保持；不要由环评图推定返工获准。

验收时点：首轮研究接纳前。涉及任务：`cn-ind-medical-syringe-plastic-002`, `cn-ind-medical-syringe-assemble-001`。

### R01 复合任务仍需可验收的拆分记录

作者保持候选和零新增数量是正确的；但样板样箱、防锈包装、清洁消毒、系统装配调整等仍以复合动作存在，不能据125条认定原子任务清单冻结。

**处理要求：** 为列出的父候选补阶段、输入、验收和同一次事件边界。仅在能独立描述验收核算时拆为子候选；原父级与子级不得同时计数。

验收时点：任务清单冻结前。涉及任务：`cn-ind-bearing-ring-common-003`, `cn-ind-bearing-ring-common-008`, `cn-ind-bearing-assembly-010`, `cn-ind-bearing-assembly-011`, `cn-ind-bearing-assembly-012`, `cn-ind-bearing-fluid-loop-003`, `cn-ind-medical-syringe-assemble-001`, `cn-ind-medical-syringe-assemble-002`, `cn-ind-medical-polymer-incoming-001`, `cn-ind-medical-polymer-clean-tools-001`, `cn-ind-medical-polymer-clean-tools-002`, `cn-ind-auto-final-assembly-002`, `cn-ind-auto-final-assembly-003`, `cn-ind-auto-final-assembly-004`, `cn-ind-auto-final-assembly-005`, `cn-ind-auto-final-assembly-006`, `cn-ind-auto-final-assembly-007`, `cn-ind-auto-final-assembly-009`, `cn-ind-auto-final-assembly-012`, `cn-ind-auto-final-assembly-013`, `cn-ind-auto-final-assembly-014`, `cn-ind-auto-final-assembly-016`, `cn-ind-auto-final-assembly-017`, `cn-ind-auto-final-assembly-018`, `cn-ind-ship-plate-parts-002`, `cn-ind-ship-plate-parts-004`, `cn-ind-ship-plate-parts-005`, `cn-ind-ship-block-assemble-001`。

### R02 共有测量或供料事件只有文字去重原则

振动测量与成品质检、合装供钉与后调、组立点焊与结构焊接、大部件与整机测量存在同一次物理事件的潜在重叠；并非已证实每次都相同。

**处理要求：** 增加明确的共享事件核对表，列任务编号、可分开的对象/触发条件与共享资本人工收益的唯一归集规则。待现场确定后再核算。

验收时点：定量机会排序前。涉及任务：`cn-ind-bearing-assembly-010`, `cn-ind-bearing-assembly-011`, `cn-ind-auto-final-assembly-012`, `cn-ind-auto-final-assembly-013`, `cn-ind-ship-block-assemble-001`, `cn-ind-ship-block-assemble-002`, `cn-ind-civil-plane-structure-005`, `cn-ind-civil-plane-structure-006`。

### C01 初始切换和中途退出的现金归集仍不够明确

23项参数和全部任务的NPV/回收期均为null，未发现伪回收期。框架已含维护、异常、停机、税和营运资金，但旧资产处置、提前解约、切换期间人员和中途退出现金没有明确互斥字段映射。

**处理要求：** 补初始/年度/终期归集定义或独立字段，保留未知值。解释毛劳动支出、残留人工和增产贡献的去重；仅在参数齐备时计算NPV或有明确假设的门槛。

验收时点：填写任何现金结果前。

### M02 覆盖说明的场景数量残留旧值

37大类的说明仍写七场景，而coveredScenarios及identifiedScenarioCount均为8。

**处理要求：** 按本稿实际8个场景更新说明；不能据此扩大为全行业覆盖。

验收时点：首轮研究接纳前。

## 复核保留的边界

- 两份环评是拟建流程；职业资料是2022社会公示稿。汽车HJ971—2026自2027-01-01实施，不能写成2026已经实施。
- 轴承环评图文的内外圈后段冲突保留，不能为了凑齐流程而擅自纠正。医疗回料适用资格原有缺口也保留。
- 列车运行控制、汽车部件制造、离线试压、外部废钢货场等邻接资料不证明当前制造任务已替代人工。
- 厂商、开发者自报、验收新闻、实验和专利阶段分别保留；没有检得失败案例不代表没有失败。
- 125条仅为当前盘点范围。四个大类的其他产品、返工、维护和交付仍有缺口，不能形成全行业覆盖率。

## 可核对的记录

- [逐任务决定、来源定位、输入哈希与请求回包指纹](./cn-industry-machinery-medical-auto-transport-34-37-independent-decisions.json)
- [原作者研究稿](../automation/cn-industry-machinery-medical-auto-transport-34-37.json)
- [原作者搜索审计](../automation/cn-industry-machinery-medical-auto-transport-34-37-search-audit.json)

FDA语言差异按[英文通报](https://www.fda.gov/medical-devices/safety-communications/update-evaluating-plastic-syringes-made-china-potential-device-failures-fda-safety-communication)与同页链接的中文通报核对，仅使用一致的预充式排除范围。

此报告不改写原稿。作者修订完成后，需按新的文件哈希重新复检；评论或修订意见不会自动成为研究事实。
