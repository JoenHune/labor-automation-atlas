# 中国批发零售：53 项候选研究修订工作版


2026-09-09。仅五个食品/成品油经营场景。原稿和审计完整字节已归档；独立审校的 53 条裁决已应用，限定复检待完成，未冻结或新增任务计数。


26 项有局部动作机制，15 项仅相邻证据，12 项未保留新匹配机制。原 106 主查询和 22 补查询未重跑；有同批请求文本与回包，缺独立调用前日志及精确 UTC。


直接事实与证据缺口分开。缺货检测不等于补架，已装盘包膜不等于分配散料；机器人保护功能不作人工接管记录。朝阳报警未响应是管理事件，不能证明停运报告失败。历史物理故障、管理和成本分析按站点年份分别列出。


已补 HJ1249—2022 与 HJ1118 的后续自行监测关系；仅据各自范围描述工况、监测及维护记录，不把旧表频次阈值当当前 SOP。原 18 组拆分建议尚未批准，新增 0。


## 条件化机会


- **CN-TR-OP-TEMP**：有中国运营方集中温控和人员测温并行的原文，可先测记录与异常响应环节的实际增量。 条件：分清食品本体测温与环境监测；取得校准、误报、人工响应和故障记录；验证可取消现金工时；实际执行者行业和共享工具/系统投入分摊需确认；完整现金流与当前使用证据未取得前不计算收益；运输环境/到货食品本体/在售冷柜测温分开；湿度机制未验证。。下一步：选品类匹配仓店跟班，对照系统时间戳与实际测点、异常纠正耗时。

- **CN-TR-OP-FULFIL**：货到人产品与苏南加工后分播的相邻案例提供局部机制，可在匹配的批发自营仓验证走动、拣配和核对；二维码字段为生产厂家而非供应商。 条件：经营者自营仓边界及加工环节剔除；匹配SKU包装批次与FIFO策略；总需求和设备利用可验证；实际执行者行业和共享工具/系统投入分摊需确认；完整现金流与当前使用证据未取得前不计算收益。下一步：逐订单核整箱/拆零/多规格差错和人工例外，取得完整供应商报价与运维记录。

- **CN-TR-OP-LABEL**：价签更新与排面检测可分别核验；实体纠错仍无完整替代证据。 条件：主数据及价签绑定正确；遮挡/错放商品例外可控；核长期维护而非只开业表现；实际执行者行业和共享工具/系统投入分摊需确认；完整现金流与当前使用证据未取得前不计算收益。下一步：抽样真实改价及错位场景，核失败、补查和人工纠错成本。

- **CN-TR-OP-VAPOR**：中国实际使用与监管故障记录并存，值得验证数据质量、报警到处置闭环。 条件：逐枪/逐罐校准和人工比对；报告与停用权限明确；维护商响应及停机成本可查；实际执行者行业和共享工具/系统投入分摊需确认；完整现金流与当前使用证据未取得前不计算收益；按 HJ1118 与后续 HJ1249 的相关范围核工况、监测及运维记录；报警输入、维护和停运报告分别验收。。下一步：取得当前站点三方日志，逐条回溯报警、记录、派单、维修及恢复，避免把历史问题外推。


## 来源与事实定位


### CN-TR-AUTO-TESTO — [食品配送中心的高效温度与环境监控解决方案](https://www.testo.com/zh-CN/solutions/distribution-centers)


德图仪器国际贸易（上海）有限公司；发布日期：未确认；读取：2026-09-09；vendor-product-description。

日期未标，上海为供应商地址而非部署地。L10、14、19—25支持温度、环境和电子检查；未说明食品中心测点或湿度具体装置。

- CN-TR-CLAIM-TEMP｜L10、L14、L19—25：产品将温度和环境监测接入数字检查表，并提示偏差。

  研究边界：页面未说明到货品种的测点选择、自动接触和覆盖；本任务适用仍待验证。

### CN-TR-AUTO-HANSHOW — [汉朔巡检机器人](https://www.hanshow.com/zh-cn/spatrol)


汉朔科技；发布日期：未确认；读取：2026-09-09；vendor-product-description-lab-metrics-excluded。

无正文日期；L190—191和203—204明确实验室数据，排除恰当。L172、227、233为商品排面/价签/缺货；L238、244为员工协作和管理者路径，不是实物补架。

- CN-TR-CLAIM-SHELF-CHECK｜L172、L225—233：机器人巡场拍摄排面，结合商品识别与价签绑定核对陈列和价签，向后台发送缺货提醒。

- CN-TR-CLAIM-SHELF-HUMAN｜L193—199、L236—244：系统提供导航避障与视频巡检；管理者指定巡检路径，并可与门店员工远程视频协作。

### CN-TR-AUTO-QUICKTRON — [货架到人拣选](https://www.quicktron.com.cn/zh_CN/solutions/shelf-to-person)


快仓智能；发布日期：未确认；读取：2026-09-09；vendor-product-description。

中国产品页无部署地或日期；L63、90、100明确机器人到工作站、人拣。效率和回收期不采用恰当；不得转写无人散件拣选。

- CN-TR-CLAIM-GTP｜L63、L90、L98—100：机器人把货架或托盘送到拣选工作站，软件分配储位、任务与顺序，操作人员继续完成拣取和配送末端动作。

### CN-TR-AUTO-LABEL — [智慧零售解决方案](https://www.boe.com.cn/Enterprise/SmartRetail)


京东方科技集团；发布日期：未确认；读取：2026-09-09；vendor-product-description。

ESL定位L256准确；RESTOCK-TASK所述摄像头与价签监测在L246—250尤其L250，原L260—264、274—281只通知/任务功能，应补精确锚。客户logo不验证每功能。

- CN-TR-CLAIM-ESL｜L252—256：系统从 ERP/POS 等接口取得价格和商品资料，批量更新电子价签。

  研究边界：未证明实物错位由系统自动纠正。

- CN-TR-CLAIM-RESTOCK-TASK｜L250、L260—264、L274—281：摄像头与价签识别缺货后通知门店员工补充，陈列系统下发并跟踪员工执行任务。

### CN-TR-AUTO-WALMART — [沃尔玛供应商食品安全要求](https://www.walmart.cn/food/)


沃尔玛中国；发布日期：未确认；读取：2026-09-09；operator-self-report-undated。

无正文日期；供应商准入、运输、联网冷柜和员工SPARK须分场景。L128—131明确加工间工具餐具，不能概括普通销售/分装器具已采用；CLEAN-TOOLS显式加对象。

- CN-TR-CLAIM-DOC-CHECK｜L67—69：沃尔玛中国说明由专门人员配合电子文件系统检查供应商证照及检测报告，线上跟踪供应商和商品。

- CN-TR-CLAIM-COLD-CHAIN｜L92—94、L108—109：运营方说明配送冷链连续测温，联网冷柜由总部系统集中监控温度并预警。

- CN-TR-CLAIM-TEMP-HUMAN｜L115—117：门店员工定时检查易腐食品温度，SPARK系统记录检测数据；异常温度仍需要纠正处理。

- CN-TR-CLAIM-CLEAN-TOOLS｜L128—131：沃尔玛中国自述为加工间工具、餐具及相应清洁对象配置清洁用具、用剂并制定程序。

  研究边界：向普通销售表面、分装台和其他器具的适配属于相邻场景判断；未证明自动清洗全部对象。

### CN-TR-AUTO-DIGI — [AW-5600ATII 称重包装贴标系统](https://www.digisystem.com.cn/cn/products/PRD00348/)


上海寺冈电子有限公司；发布日期：未确认；读取：2026-09-09；vendor-product-description。

中国产品页主体英文；L251、258预装盘人工进料、称重包膜贴标有效，L293—294是尺寸组合/薄膜限制。海外用户案例与速度值排除正确。

- CN-TR-CLAIM-WRAP｜L249—260、L286—294：该机对送入的产品托盘进行称重、包膜和贴标；可包尺寸还受托盘组合尺寸与薄膜影响。

- CN-TR-CLAIM-WRAP-FEED｜L251、L258：产品说明保留操作员放置盛有商品的托盘到进料口。

  研究边界：未提供自动分配散装食品进托盘的证据；上料用时和工资影响不明。

- CN-TR-CLAIM-WRAP-LABEL｜L258、L273—275、L305—308：系统打印并自动贴产品标签，承载重量价格等预设信息。

  研究边界：未证明原始批次日期自动核真。

### CN-TR-AUTO-POSPAL — [银豹生鲜称重收银系统](https://www.pospal.cn/main/pages/industry/fresh.html)


准动网络科技（厦门）有限公司；发布日期：未确认；读取：2026-09-09；vendor-product-description。

原HTML成功，本地文本每行已有一基行号，241—247、130—132对应；不把版权或服务用户数当日期/劳动效果。库存数据汇总可留，实物批次自动感知无证。

- CN-TR-CLAIM-WEIGH｜本地cn-tr-pospal.txt第241—247行：方案将放到秤盘的散装商品识别、称重和计价关联，并支持电子秤对接。

  研究边界：上秤动作执行方式未充分说明；不能据此认定目标工位必须人工或已经自动供料。

- CN-TR-CLAIM-PHONE-STOCK｜本地cn-tr-pospal.txt第130—132、244—249行：手机支持多人分组盘点和损耗登记，系统汇总库存及损耗数据。

  研究边界：未证明独立感知全部实物、批次和日期。

### CN-TR-AUTO-HAIDING — [海鼎WMS—智慧仓储管理系统](https://www.hd123.com/product-matrix/supply-chain-digital-intelligence/haiding-smart-logistics/iwms)


上海海鼎信息工程股份有限公司；发布日期：未确认；读取：2026-09-09；vendor-product-description。

无日期；L202、206、210、218、240功能支持数量/重量/条码/批次与接口，货主自营及第三方物流都适用，不能从软件厂商页面判客户统计归属。

- CN-TR-CLAIM-WMS-IDENTITY｜L200—206、L238—240：软件关联货位、容器、条码、商品与批次，支持数量/重量收货与移动端扫码。

- CN-TR-CLAIM-WMS-PICK｜L208—218：软件支持整零拣配、退货库存和多种拣货模式，并可集成扫码终端、电子标签、电子秤及自动化设备。

### CN-TR-AUTO-CHECK — [使用WMS进行复核验货](https://help.xlwms.com/12d0/d5f9/d14c/f520)


领星WMS帮助中心；发布日期：未确认；读取：2026-09-09；vendor-operation-documentation。

复读网页内容定位相同；L102为裸日期2026-07-28，无发布/修改标签。建议pageDate保留、publishedAt=null或标类型未确认；L23、59—61档案加总不是实物称重。

网页裸日期 2026-07-28，发布或修改类型未确认。

- CN-TR-CLAIM-SCAN-CHECK｜L4—6、L15、L29—40：操作员扫描订单与SKU，系统核对数量并可打印面单；操作员添加包材及处理实际重量差异。

- CN-TR-CLAIM-COMPUTED-WEIGHT｜L23、L59—61：名为自动计算重量的选项累加SKU档案与包材重量，不是自动称量实物。

- CN-TR-CLAIM-SCAN-ERROR｜L74—88：文档要求人工排查波次状态、订单类型和错误条码造成的复核提示。

  研究边界：产品条件与排错说明不是具名设备事故、失败率或弃用案例。

### CN-TR-AUTO-SUNAN — [苏南食材—海鼎仓储案例](https://www.hd123.com/customer-case/warehousing-logistics/data_164.html)


上海海鼎信息工程股份有限公司；发布日期：未确认；读取：2026-09-09；vendor-case-self-report-undated。

案例无日期，地点锡山明确，净菜加工后分播是相邻场景。SUNAN-CODE原L204二维码显示“生产厂家”，不是“供应商”；须改事实字段，供应商来货检验另述。L213、215条码/整零可留。

- CN-TR-CLAIM-SUNAN-MOVE｜L198—207：供应商报告锡山仓采用半自动模式，加工后的食品由 AGV 搬运到分播区域。

  研究边界：加工后搬移与食品到货验收、分区入库存在边界差异；不能直接认定目标父任务已部署。

- CN-TR-CLAIM-SUNAN-PICK｜L209—215：电子屏显示分播图片和进度，整箱由电子标签引导、拆零配电子秤；操作员执行分播，多包装规格是文中指出的易错情境。

- CN-TR-CLAIM-SUNAN-CODE｜L203—204、L212—213：供应商报告二维码可追溯生产厂家、批次号及农产品检测结果；仓内容器以条码管理，出库读取子容器信息，返还容器经过RFID门记录。

### CN-TR-AUTO-SHENNONG — [食材配送](https://snfood.com.cn/html/scpsyw.html)


深圳市深农厨房有限公司；发布日期：未确认；读取：2026-09-09；operator-self-report-undated。

原页主体深圳加工配送/食材经营混合，无日期。L23、29系统溯源，L47、53是出入库肉眼质检，L58温区；未证明库存巡检或机器人质量判定。

- CN-TR-CLAIM-SHENNONG-TRACE｜L21—29：运营方说明使用供应链系统贯穿采购、仓储、物流和结算，实现商品溯源，并组合自检与第三方检测。

- CN-TR-CLAIM-SHENNONG-HUMAN｜L45—58：食材出入库质量检查包含肉眼可见的腐烂、霉变、压伤等，物料按品类进入不同温控区域。

### CN-TR-AUTO-CRATE-WASH — [周转筐清洗机](https://www.zclongyuanjixie.com/container-washers/turnover-basket-washing.html)


诸城市隆远机械有限公司；发布日期：未确认；读取：2026-09-09；vendor-product-description。

中国厂商无日期/站点。L31对象筐箱容器；L59三段清洗、63—71喷头速度维护，不能证明消毒微生物终点、任意器具或固定表面。

- CN-TR-CLAIM-CRATE｜L31、L55—71：设备以喷淋、热水冲洗及漂洗清洗周转容器，喷头可调拆卸，速度可调并留有维护观察入口。

### CN-TR-AUTO-PALLET — [托盘搬运车](https://www.crown.com/zh-cn/forklifts/pallet-trucks.html)


科朗叉车中国产品站；发布日期：未确认；读取：2026-09-09；vendor-product-description。

科朗中国产品目录，客户部署地未知。PTH/WP等手动/动力型及L194、200、211操作者控车有据；未给食品冷链机型验证，不拿承重数核算收益。

- CN-TR-CLAIM-PALLET｜L46—85、L184—211：产品页提供手动升降及电动托盘搬运车，由操作员控制托盘移动与放置。

  研究边界：未证明自动散件码垛、上架或食品温区合格。

### CN-TR-AUTO-OKET — [加油站油品计量及环境监测系统](https://instrument.oket-cn.com/products/jiayouzhananquanhuanbaojiance/youpinjiliangjihuanjingjiancexitong/jiayouzhanyoupinjiliangjihuanjingjiancexitong.html)


青岛澳科仪器有限责任公司；发布日期：未确认；读取：2026-09-09；vendor-product-and-adoption-self-report。

厂商自述国内用户采用但无站点/年期。L150、169、173、177、181与203—228是数据、监测报警和设备管理，不是自动维修或报告主管部门。

- CN-TR-CLAIM-OIL-DATA｜L150、L167—181：平台采集液位与测漏传感器数据，保存库存、卸油和销售记录，并提供油气回收运行监测及报警记录。

- CN-TR-CLAIM-OIL-ALARMS｜L175—181、L203—204、L228：软件提供设备运行、液位和测漏报警及油枪启停功能。

  研究边界：未证明自动维修或向当地生态环境主管部门提交规定停运报告。

### CN-TR-AUTO-INTERLOCK — [加油站卸油安全联锁联控解决方案](https://instrument.oket-cn.com/news/jiejuefangan/gas_station_oil_unloading_safety_interlock_and_control_solution.html)


青岛澳科仪器有限责任公司；发布日期：未确认；读取：2026-09-09；vendor-product-description。

无正文日期；L116整合设备、119顺序和人员值守、123高液位防混油接入。UNLOAD-HUMAN把声光提示对象写“监管人员”宜改原文“值守人员”；“监管机器人”是比喻。

- CN-TR-CLAIM-UNLOAD-LOCK｜L108—123：控制器整合静电接地、轮挡、管路测试等信号，按顺序放行并接收高液位/防混油报警。

- CN-TR-CLAIM-UNLOAD-HUMAN｜L105、L119、L123：卸油方案保留现场值守、步骤操作和异常响应；倒计时、声光和语音用于提示值守人员。

### CN-TR-AUTO-VAPOR1 — [加油站一次油气回收](https://www.ticolt.com/solution/359.html)


上海泰特石油设备科技/服务有限公司；发布日期：2025-03-06；读取：2026-09-09；supplier-product-description。

L32明确发布时间2025-03-06；产品/代理方案非站点投运。L34—47一次气相回路、匹配快接与罐车软管支持局部机制，实际密封和接拆待验。

- CN-TR-CLAIM-VAPOR1｜L34—47：一次油气回收方案列出自密封快接头、匹配软管和下装罐车接头，维持卸油气相回路连通。

  研究边界：将地下罐排出油气沿该回路导回槽车是基于回路的机制解释；具体接管、密封与实际回收效果仍待验收。

### CN-TR-AUTO-VAPOR2 — [加油站二次油气回收](https://www.ticolt.com/solution/360.html)


上海泰特石油设备科技/服务有限公司；发布日期：2025-03-06；读取：2026-09-09；supplier-product-description。

L91明确发布时间2025-03-06；L93—101车箱至地下罐、主动泵及机型适配。未把更高效/认证/气液比数值转化为现场表现，保留此界限。

- CN-TR-CLAIM-VAPOR2｜L93—101：主动式二次回收系统使用马达真空泵，在加油时将车辆油箱油气送回站内储罐。

  研究边界：现场加油机、回收回路和控制配置是否兼容，仍须按具体型号验证。

### CN-TR-AUTO-OIL-ROBOT — [国内首款智能加油机器人在南宁投入试运行](https://www.nea.gov.cn/2021-09/10/c_1310180483.htm)


国家能源局转载新华网据中国石化新闻办消息；发布日期：2021-09-10；读取：2026-09-09；operator-announcement-reposted-trial。

能源局2021-09-10转载新华网据中石化新闻办消息；南宁南站西试运行不是2026持续运行。L5第4段保护功能不能在remainingHuman中标已经记载的人工残留；车型筛选不证明发生失败。

- CN-TR-CLAIM-ROBOT-FUEL｜L5第1—4自然段：报道描述车主下单后机器人识别油箱盖，开盖插枪、加注后拔枪复位；系统会筛选车型。

- CN-TR-CLAIM-ROBOT-FUEL-LIMIT｜L5第4自然段：试运行系统列有入侵报警、紧急停车联锁和车辆异常驶离拉断保护。

  研究边界：未交代实际触发率、人工接管和全部不适配车型；这些保护功能不是残留人工的直接记录。

### CN-TR-AUTO-OIL-POS — [加油站管理系统](https://www.wudb.cn/)


郑州讯龙软件科技有限公司；发布日期：未确认；读取：2026-09-09；vendor-product-description。

原站页脚郑州讯龙软件、无正文日期；2015—2022版权不是版本时间。L21、33、52、64有结算及卡资料互通，“需要用户授权”是研究条件，不能标源载自动鉴权事实。

- CN-TR-CLAIM-OIL-POS｜L21、L31—33、L48—64：油站系统整合收银与会员业务，可同步实体卡、电子卡信息及余额。

  研究边界：用户授权、账户与本次油品交易正确关联为待验证条件，非已证实自动鉴权。

### CN-TR-AUTO-OIL-FAIL-2020 — [加强加油站油气回收在线监控执法 强化VOCs排放精细化监管](https://sthjj.beijing.gov.cn/bjhrb/index/xxgk69/sthjlyzwg/wrygl/10906068/index.html)


北京市生态环境局；发布日期：2020-12-16；读取：2026-09-09；regulator-observed-operations-and-failures。

L34发布2020-12-16；L40当年6月朝阳报警未检查/记录维修属管理响应；L49当年5月顺义数据失真；L50当年7月大兴设备故障/自查遗漏。分别保存，不称停运报告失败或设备普遍失效。

- CN-TR-CLAIM-MONITOR-USE｜L36—40：监管机关记载已安装站点通过在线油气监控发现运行异常，并由执法人员现场核实。

- CN-TR-CLAIM-MONITOR-NORESPONSE｜L40：2020年朝阳某站油枪连续报警后仍使用，监管调查指出站方未及时检查、记录或维修。

- CN-TR-CLAIM-MONITOR-INACCURATE｜L49—50：2020年顺义某站在线值与手测不符，大兴某站在线设备故障导致营业期间数据缺失；自查没有及时发现故障。

### CN-TR-AUTO-OIL-FAIL-2021 — [全文实录｜北京市2021年生态环境执法工作新闻发布会](https://sthjj.beijing.gov.cn/bjhrb/index/xxgk69/zfxxgk43/fdzdgknr2/ywdt28/xwfb/325729926/index.html)


北京市生态环境局；发布日期：2022-03-22；读取：2026-09-09；regulator-observed-failure。

L34发布2022-03-22，L36发布会2022-03-18，L108事件2021-09；站名北京顺亦彩源。堵管/液阻事件与维修要求有据，但没有指定本批厂商型号。

事件月份 2021-09；不是网页发布日期。

- CN-TR-CLAIM-VAPOR-BLOCK｜L106—110：监管检查发现该站汽油堵塞回收管道，导致油气回收装置不能正常使用；报道要求现场检查维护。

### CN-TR-AUTO-OIL-FAIL-2014 — [我市加强油气回收执法检查力度 5家违法加油站受罚](https://sthjj.beijing.gov.cn/bjhrb/index/xxgk69/zfxxgk43/fdzdgknr2/ywdt28/xwfb/607318/index.html)


北京市生态环境局；发布日期：2014-05-20；读取：2026-09-09；regulator-historical-failure-and-repair-delay。

L34发布2014-05-20，L40监管分析维护成本顾虑；同段有朝阳后处理部件停机与西便门/滨河路回收泵不能工作，不应全部合成二次回收泵技术失败。

- CN-TR-CLAIM-VAPOR-REPAIR-COST｜L40：监管机关分析部分老设备损坏后，经营者顾虑成本而延迟维修；并点名回收泵失效和后处理部件停机个案。

### CN-TR-AUTO-HANSHOW-CASE — [汉朔科技携手天虹数科、灵智数科，以物理AI助力sp@ce天虹超市3.0深圳沙河店智慧焕新](https://www.hanshow.com/zh-cn/news/%E6%B1%89%E6%9C%94%E7%A7%91%E6%8A%80%E6%90%BA%E6%89%8B%E5%A4%A9%E8%99%B9%E6%95%B0%E7%A7%91%E3%80%81%E7%81%B5%E6%99%BA%E6%95%B0%E7%A7%91%EF%BC%8C%E4%BB%A5%E7%89%A9%E7%90%86ai%E5%8A%A9%E5%8A%9Bsp%40ce%E5%A4%A9%E8%99%B9%E8%B6%85%E5%B8%823.0%E6%B7%B1%E5%9C%B3%E6%B2%99%E6%B2%B3%E5%BA%97%E6%99%BA%E6%85%A7%E7%84%95%E6%96%B0)


汉朔科技；发布日期：2026-09-04；读取：2026-09-09；vendor-site-launch-self-report。

正文日期L153为04-09-2026，L159开业9月4日，L170明确2026；勿误用导航L66的09-09-2026。开业供应商自报技术支持，不代表实体补架机器人已执行或长周期商业运行。

- CN-TR-CLAIM-HANSHOW-CASE｜L159、L178—179、L191—203：供应商报告沙河店开业落地电子价签、AI视觉和智能终端，支持缺货识别、定位与陈列管理；员工及消费者继续参与执行。

### CN-TR-REVIEW-HJ1249-2022 — [排污单位自行监测技术指南 储油库、加油站（HJ1249—2022）](https://www.mee.gov.cn/ywgz/fgbz/bz/bzwb/jcffbz/202205/W020220517401736344972.pdf)


生态环境部；发布日期：2022-04-27；读取：2026-09-09；official-industry-monitoring-guideline。

HJ1118 §5.4.1 及表8注1指向后续行业自行监测指南；本指南支持监测和工况、运维记录要求，不是设备已部署或自动维修证据。未将旧频次或阈值作为当前工地SOP。

- HJ1249-monitor｜PDF 物理7—8，§5.2.4：在线监测功能及校准相关要求。

- HJ1249-production｜物理9，§6.1.2.2(c)：加油、卸油的生产记录内容。

- HJ1249-maintenance｜物理10，§6.1.2.3(c)：储罐和加油枪等设施运维记录内容。

- HJ1249-context｜物理9 §6.1.1；物理10 §7：监测信息与手工/自动监测工况记录要求。


## 任务边界与结果


| 原有候选 | 显示任务 | 证据状态 | 审校后范围 |

| --- | --- | --- | --- |

| cn-trade-food-receiving-001 | 核对食品供货证明和到货单据 | adjacent-evidence-only | 电子文件辅助核验确有原文，但沃尔玛为供应商准入/文件管理、深农为综合溯源，未证明每批到货证件自动匹配。 |

| cn-trade-food-receiving-002 | 清点到货食品品种与数量 | partial-mechanism | 海鼎数量/重量收货和移动条码机制适配数据录入；实物独立计数未获证。 |

| cn-trade-food-receiving-003 | 抽查到货食品感官状态 | no-retained-mechanism | 深农出入库肉眼质检支持人工基线；没有被保留的自动感官机制，不能借货架商品识别代替。 |

| cn-trade-food-receiving-004 | 核验到货食品运输温控状态 | adjacent-evidence-only | SPARK是门店产品定时测温的相邻案例；TESTO只泛述入库与环境监测，均不能认定本任务已自动定位测点。 |

| cn-trade-food-receiving-005 | 隔离并标记未通过验收的食品 | no-retained-mechanism | 本轮未保留实物隔离机制，缺口准确；数字库存状态不等于搬移标记。 |

| cn-trade-food-receiving-006 | 将合格食品分区堆码入库 | partial-mechanism | 托盘车为有操作者的托盘搬移；GTP为可移动载体到工作站，均未证实散件堆码或指定温区合格。 |

| cn-trade-food-receiving-007 | 标识食品储位和生产批次 | partial-mechanism | 海鼎关联货位与批次有据，未覆盖物理标牌打印贴附与原日期核真。 |

| cn-trade-food-receiving-008 | 巡查库存食品质量和保质状态 | no-retained-mechanism | 深农是入/出库质检，不能作为储存期间巡查的已部署正例；原无匹配机制状态应保持。 |

| cn-trade-food-receiving-009 | 监测仓储温湿环境 | partial-mechanism | 沃尔玛直接支持温度监控，非湿度测控；TESTO环境监测也没有本页湿度传感机制。 |

| cn-trade-food-receiving-010 | 按订单与库存顺序拣选食品 | partial-mechanism | GTP减少行走而保留拣选；苏南电子标签/秤为加工后学校配餐分播，正反都限多包装规格与人工分播。 |

| cn-trade-food-receiving-011 | 复核订单食品与包装状态 | partial-mechanism | 领星扫描与苏南容器关联只支持身份/数量的数据核验，未支持食品品质和包装完整性。 |

| cn-trade-food-receiving-012 | 包装或加固待运食品 | no-retained-mechanism | 未保留匹配设备型号，不等于无传统机械；原职责已含包装操作基线，未读的打包机候选继续列发现线索。 |

| cn-trade-food-receiving-013 | 移交食品并记录购货者和批次 | adjacent-evidence-only | 深农供应链溯源及苏南条码是记录输入，均未证实交付签收和购货者字段闭环。 |

| cn-trade-food-receiving-014 | 更正获准调整的包装或拣配差错 | adjacent-evidence-only | 领星错误提示帮助定位问题，未证明重拣或重包实体纠错。 |

| cn-trade-food-receiving-015 | 清洁仓库货架容器及搬运工具 | partial-mechanism | 洗筐机仅匹配容器，未覆盖固定货架及搬运工具，原文字限制正确。 |

| cn-trade-food-receiving-016 | 下架隔离召回批次并记录流向 | adjacent-evidence-only | 海鼎批次库存关联是追溯输入，无自动执行召回的证据。 |

| cn-trade-food-store-001 | 核验配送食品和随货证明 | adjacent-evidence-only | 沃尔玛供应商证照检查是相邻准入步骤，不证明门店每批随货证明自动复核。 |

| cn-trade-food-store-002 | 抽查食品外观及要求控制的温度 | adjacent-evidence-only | SPARK支持门店产品定时测温，未证明到货抽检；外观质检无自动机制。 |

| cn-trade-food-store-003 | 隔离未通过验收的到店食品 | no-retained-mechanism | 无保留的物理隔离机制，当前不能从数字拒收推得实物移出。 |

| cn-trade-food-store-004 | 将食品放入对应后仓储位 | partial-mechanism | 托盘车对可通行的托盘载荷是搬移辅助；WMS只提供储位信息，散件上架及分隔待验证。 |

| cn-trade-food-store-005 | 按库存顺序补充货架食品 | adjacent-evidence-only | 汉朔巡检/开业案例与京东方只支持发现缺货和派工，无实体上架机制。 |

| cn-trade-food-store-006 | 整理食品陈列排面 | adjacent-evidence-only | 机器人核查与系统派工只是整理前后步骤，实际扶正、前推、分区排列未证明。 |

| cn-trade-food-store-007 | 核对食品与价签信息 | partial-mechanism | 汉朔商品/价签绑定检查局部匹配，京东方更新是相邻纠错手段；主数据准确不证明实物匹配。 |

| cn-trade-food-store-008 | 检查陈列食品日期和质量 | no-retained-mechanism | 货架识别不证明效期或变质检查，原无机制状态可保留。 |

| cn-trade-food-store-009 | 下架变质过期或召回食品 | no-retained-mechanism | 无保留实物下架机制，告警和通知不能替代取下隔离。 |

| cn-trade-food-store-010 | 检查冷藏冷冻销售设备运行 | partial-mechanism | 沃尔玛联网温度监测是检查的部分输入，非压缩机、门封和结霜检查维修。 |

| cn-trade-food-store-011 | 包装并检查售出食品 | partial-mechanism | DIGI在已装盘产品上称重包膜贴标，未验证食品选品或包装缺陷；厂商中国产品页不是中国运营案例。 |

| cn-trade-food-store-012 | 向顾客交付食品及必要票据 | adjacent-evidence-only | POSPAL称重计价仅交付前置，不支持递交食品或票据。 |

| cn-trade-food-store-013 | 纠正货架错位和价签不一致 | partial-mechanism | 电子更新只对正确主数据下的价签内容变化，机器人只查错位，未执行实物移正。 |

| cn-trade-food-store-014 | 清洁食品销售器具和接触表面 | adjacent-evidence-only | 沃尔玛L128—131明确加工间工具餐具；原边界已注明相邻，不能升为普通销售表面正例。 |

| cn-trade-food-store-015 | 收集并移走销售区废弃物 | no-retained-mechanism | 空瓶回收不是混合食品/包装废弃物，缺匹配动作证据的表述正确。 |

| cn-trade-food-store-016 | 盘点门店食品库存并核对记录 | partial-mechanism | POSPAL多人手机盘点和损耗登记可作辅助，未证明自动感知实货或独立核查全部日期批次。 |

| cn-trade-bulk-food-pack-001 | 检查分装容器和包装材料适用性 | no-retained-mechanism | 原五类未保留机制正确，不可把包膜可运行等同材料食品接触资格。 |

| cn-trade-bulk-food-pack-002 | 清洁分装操作表面和工具 | adjacent-evidence-only | 沃尔玛加工间清洁是相邻对象经验，非本分装台的已运行措施。 |

| cn-trade-bulk-food-pack-003 | 将散装食品分配至销售包装 | adjacent-evidence-only | POSPAL只上秤后识别计价，DIGI还要求预装盘，均未支持分配散装食品进包装。 |

| cn-trade-bulk-food-pack-004 | 标注分装食品必要信息 | partial-mechanism | DIGI只支持已输入资料的打印贴附，允许局部证据；原始批次日期自动校验无据。 |

| cn-trade-bulk-food-pack-005 | 复核包装食品品名批次及完整性 | no-retained-mechanism | 未保留标签/批次/包装完整性联合自动核验；原无机制不应被打印机证据补成通过。 |

| cn-trade-bulk-food-pack-006 | 隔离受污染或批次信息不明的分装品 | no-retained-mechanism | 无匹配实物隔离证据，不可由软件报警推定完成。 |

| cn-trade-bulk-food-pack-007 | 交付完成包装和信息核验的食品 | adjacent-evidence-only | DIGI包膜贴标是前置，与交付对象确认和移交无直接机制。 |

| cn-trade-bulk-food-pack-008 | 清洁消毒分装工具及容器 | partial-mechanism | 洗筐机喷淋流程支持容器清洗；没有消毒效果或剂液残留验证。沃尔玛加工间对象需显式相邻。 |

| cn-retail-fuel-receive-store-001 | 接收成品油并卸入目标储罐 | partial-mechanism | 澳科联锁只控制步骤和报警，现场接拆管/对罐等动作未替代。 |

| cn-retail-fuel-receive-store-002 | 计量收储成品油 | partial-mechanism | 澳科采集液位、库存及卸油数据可作计量输入，但罐容表和修正方法未证明。 |

| cn-retail-fuel-receive-store-003 | 采集成品油样品 | no-retained-mechanism | 新检索未保留具体采样自动机制，但原职业已明确人工器具基线，不能把五类空白解释成无工具可用。 |

| cn-retail-fuel-receive-store-004 | 运行卸油油气回收系统 | partial-mechanism | 泰特一次回路快接软管机制适配，未证实接管、密封验收或无人运行。 |

| cn-retail-fuel-receive-store-005 | 记录卸油时间来源和数量 | partial-mechanism | 澳科有卸油记录和分析功能，没有本页来源供应商/批次字段闭环详情。 |

| cn-retail-fuel-receive-store-006 | 检查保养加油站储罐 | partial-mechanism | 液位/测漏传感器只辅助检查，不能证明结构检验、清洗和部件维修。 |

| cn-retail-motor-fuel-retail-001 | 使用加油机向车辆添加指定油品 | partial-mechanism | 2021南宁具名试运行完整描写车辆接口与加注循环，车型筛选及保护是设计功能，非已观测失败。 |

| cn-retail-motor-fuel-retail-002 | 运行加油油气回收系统 | partial-mechanism | 泰特主动泵机制有据；2020/2021/2014历史事件来自不同站/系统，不能指称泰特设备失效。朝阳未检查报警属管理响应，非传感器技术故障。 |

| cn-retail-motor-fuel-retail-003 | 处理加油卡及相关交易信息 | partial-mechanism | 油客里里说明会员卡数据与余额互通、混合结算；“授权”是应验证的操作条件，非来源证明的自动鉴权功能。 |

| cn-retail-motor-fuel-retail-004 | 记录加油油品及销售数量 | partial-mechanism | 澳科销售记录有据，本次枪号/油种/计量绑定仍缺证。 |

| cn-retail-motor-fuel-retail-005 | 检查保养加油枪和油气设施 | partial-mechanism | 监管通过在线监控发现异常是报警检查局部输入，未证明自动维修保养；现partial正例须改inspection-input-only。 |

| cn-retail-motor-fuel-retail-006 | 报告油气治理设施停止运行事件 | adjacent-evidence-only | 2020朝阳未检查/未安排记录维修，只证明报警未响应，没有陈述治理设施停运报告未提交；本任务不得标直接报告失败。 |

| cn-retail-motor-fuel-retail-007 | 记录油气系统监测结果与生产工况 | partial-mechanism | 澳科在线数据与北京监管数据异常案例支持局部机制和历史数据质量问题，未证明所有生产工况自动对应。 |


详细 reviewedDefinition、原快照、每类替代、残留人工、事件、拟拆分和访谈问题见 JSON。共享食品包装/交付、清洁周期及油气回收循环不得重复计算。


经济参数全部缺失，不生成回收期。W_t 为相对无项目基线的期末增量营运资金，期初扣 W_0、逐期扣相邻期差分；维护、残留人工、异常停机、更新资本及退役均纳入，末期实际回收只计一次。


仍未覆盖非食品商品、其他经营形态和当前场景中全部异常/清洁/维护动作。公开首轮及审校不代表行业研究完成，后续证据仍需现场与原文复核。
