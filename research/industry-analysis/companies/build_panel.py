"""Build site panels and narrative tables from the source observations."""
from pathlib import Path
import json,re,hashlib
B=Path(__file__).parent
J=lambda f:json.loads((B/f).read_text())
def write(f,x):(B/f).write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n')
meta=[
('inspur','浪潮信息','000977',[39126,39127,39128],9,'服务器品牌与系统产品','服务器产品为主要分部；存储/交换业务同时相关，不能把该分部全额重复分配。',14),
('kaifa','深科技','000021',[39127,39132],12,'电子制造服务与存储封测','高端制造包含硬盘零部件及多种电子产品；计量智能终端保留为非C39纯口径业务。',22),
('zte','中兴通讯','000063',[39126,39128,39129],25,'通信系统、企业设备与终端','运营商网络、政企、消费者按市场划分，均可能含硬件与服务；外包生产商存在。',28),
('transsion','传音控股','688036',[39129],12,'手机品牌与渠道','手机相关样本，其他业务没有强行归入智能消费；合并集团不等于境内手机生产。',34),
('haige','海格通信','002465',[39128,39129],9,'专用通信及技术服务','按业务分部关联。公司工业收入仅占41.68%、服务业58.32%，不能将集团全额当制造业。',21),
('hisense','海信视像','600060',[39131],12,'显示终端品牌','智慧显示终端与非专业视听相关，但新显示和商显等混合业务不归入单一产品。',27),
('boe','京东方A','000725',[39132,39126,39131,39134],16,'面板制造与终端方案','显示器件为主要分部；物联网创新业务跨类且有内部抵销，A/B股合为一个集团样本。',19),
('smic','中芯国际','688981',[39132],13,'晶圆制造代工','使用A股企业会计准则人民币财报，A/H股不重复计数；客户地域不等于生产地域。',26),
('luxshare','立讯精密','002475',[39129,39133,39134,39128],11,'零组件、模组与整机制造','消费电子分部混合零件与整机，另含汽车电子。2025新增Leoni与通讯ODM范围。',18),
('sytech','生益科技','600183',[39133],10,'电子材料与PCB制造','覆铜板/粘结片与PCB均相关；已合并上市子公司生益电子，后者不再单列。',13),
('goer','歌尔股份','002241',[39133,39131,39134],11,'精密零组件及智能硬件ODM/JDM','智能声学整机和智能硬件可能跨产品分类；境外生产和品牌客户外包结构影响比较。',14),
('wus','沪电股份','002463',[39133],15,'PCB制造','数据通讯、智能汽车为PCB用途分组，不把通讯用途PCB归为通信系统设备。',20),
('suncreate','四创电子','600990',[39130],9,'雷达产品与配套','仅雷达及配套分部直接关联，公共安全、电源和机动保障未一并当雷达制造。',23)]
M=J('metrics.json')['observations'];D=J('derived.json')['observations'];S=J('segments.json')['segments'];idx={x['id']:x for x in M+D}
names={x[0]:x[1] for x in meta};companies=[]
for k,name,code,products,page,model,note,boundaryPage in meta:
 companies.append({'id':k,'name':name,'stockCode':code,'country':'cn','countryMeaning':'中国企业观察样本；指标为集团合并口径，不限境内生产','businessModel':model,'nodeIds':['cn-io-group-39','cn-gbt2017-39']+['cn-io-'+str(i) for i in products],'selection':'分层目的抽样；为九类产品提供实际业务线索，不是随机样本或上市公司全覆盖','mappingEvidence':[{'sourceId':k+'-ar2025','locator':f'PDF第{page}页：主要业务；第{boundaryPage}页：业务分部/边界','excerpt':note}],'mappingNote':note,'aggregationPolicy':'不跨企业或跨产品加总；关联上下游存在交易重复；上市母子只保留一个合并层级。','geographyNote':'集团包括境内外业务；披露的销售地区不替代工厂所在地。','headcountNote':'员工表通常为年末母公司及主要子公司，尚未与全年平均、所有子公司和外包人数统一；人均数仅描述性代理。','segmentIds':[s['id'] for s in S if s['companyId']==k]})
write('companies.json',{'checkedAt':'2026-09-14','sampling':'13家分层目的样本；不具总体代表性，不计算全国行业份额','companies':companies})
sources=[]
annual=J('download-manifest.json');interim=J('interim-manifest.json')
for r in annual+interim:
 k=r['companyId'];isH='period' in r;sid=k+('-h12026' if isH else '-ar2025');u=r['url'];p=Path(r['path']);p=p if p.is_absolute() else Path.cwd()/p
 date=r.get('releaseDate') or (re.search(r'/finalpage/(\d{4}-\d{2}-\d{2})/',u).group(1) if '/finalpage/' in u else ('2026-03-07' if k=='zte' else '2026-03-28'))
 lim=['公司披露的合并集团口径，含境内外，不能代表全国行业或对应投入产出部门。','2026半年报未经审计且不年化。' if isH else '会计财报金额不等于国民经济核算增加值；员工/成本结构未强制统一。']
 if 'sina.com.cn' in u:lim.append('原件为公司编制的完整财报，由新浪公告镜像提供下载；保留哈希与原公告链接，不采用财经媒体摘要作为数值来源。')
 if k=='boe' and isH:lim.append('同一集团B股英文版，报表货币仍为人民币；不另计B股样本。')
 src={'id':sid,'title':names[k]+('2026年半年度报告' if isH else '2025年年度报告')+('（英文版）' if k=='boe' and isH else ''),'publisher':names[k],'url':u.replace('http://file.finance','https://file.finance'),'published':date,'retrieved':'2026-09-14','country':'cn','kind':'operator','archive':str(p.relative_to(Path.cwd())),'sha256':r['sha256'],'limitations':lim,'evidencePeriod':'2026-H1及2025-H1比较列' if isH else '2025及2024比较列','evidenceLevel':'上市公司财务披露','readStatus':'已下载完整原件并实际读取财务表、分部、员工及适用成本页；未声称逐字阅读全部法律附注。'}
 sources.append(src)
write('sources.json',{'sources':sources})
srcidx={s['id']:s for s in sources};ci={c['id']:c for c in companies}
def refs(x):
 if x['evidence']['type']=='calculated':return list({(r['sourceId'],r['locator']):r for a in x['evidence']['inputs'] for r in refs(idx[a])}.values())
 loc=x['locator'];return [{'sourceId':x['sourceId'],'locator':f"PDF第{loc['pdfPage']}页，{loc.get('row',x['metric'])}"}]
comparisons=[]
allnodes=list(dict.fromkeys(n for c in companies for n in c['nodeIds']))
def table(metric,title,year,unit,currency,note,derived=False):
 rows=[]
 for c in companies:
  k=c['id'];dataset=D if derived else M;x=next((x for x in dataset if x['companyId']==k and x['metric']==metric and x['period']==year and not x.get('segmentId')),None)
  if not x:continue
  ev=refs(x);r={'id':f'{k}-{year.lower()}-{metric}','name':c['name'],'nodeIds':c['nodeIds'],'value':x['value'],'evidence':ev,'releaseDate':srcidx[ev[0]['sourceId']]['published'],'revision':x.get('revisionNote','按引用原值复算；同年比较。'),'notes':[c['mappingNote'],x.get('note') or note],'missingReason':x.get('note') if x['value'] is None else None,'url':srcidx[ev[0]['sourceId']]['url']+'#page='+re.search(r'第(\d+)页',ev[0]['locator']).group(1)}
  prev='2024' if year=='2025' else '2025-H1';old=next((a for a in dataset if a['companyId']==k and a['metric']==metric and a['period']==prev and a['value'] is not None and not a.get('segmentId')),None)
  if old:r['previous']={'period':prev,'value':old['value'],'evidence':refs(old),'note':'同一最新报告可比列/由该列复算；不拼接旧版。'}
  if derived:
   r['computation']={'expression':x['evidence'].get('formula') or x['note'],'inputs':[idx[a]['value'] for a in x['evidence']['inputs']],'note':x['note']}
  rows.append(r)
 comparisons.append({'id':'cn-c39-company-'+year.lower()+'-'+metric.replace('_','-'),'country':'cn','section':'companies','nodeIds':allnodes,'title':title,'metric':metric,'period':year,'unit':unit,'currency':currency,'coverage':'13家分层目的样本；各行是公司合并口径，含境内外及跨行业业务；仅在点击产品后筛选关联样本。','comparisonKey':'cn-companies-'+year+'-'+metric,'coverageLabel':'企业样本，非行业总量','notes':[note,'不将企业营业收入或人均收入替代图谱增加值，不计算全国行业市场份额。'],'rows':rows})
for met,title,u,c,n,d in [
 ('revenue','企业营业收入','元','CNY','同为2025完整年报合并收入，保留2024比较列；规模差异不等于行业增加值差异。',False),
 ('gross_margin_pct','企业综合毛利率','%',None,'由合并营业收入与营业成本计算；业务组合不同，不作纯产品盈利排名。',True),
 ('cash_acquisition_long_term_assets','购建长期资产现金支出','元','CNY','购建固定资产、无形资产和其他长期资产支付的现金；不等于完整资本开支，也不代表自动化投入。',False),
 ('capex_cash_to_revenue_pct','长期资产现金支出／收入','%',None,'同年购建长期资产现金/营业收入；包含扩产及替换支出，不能分辨自动化。',True),
 ('fixed_assets_net','期末固定资产账面价值','元','CNY','年末净账面值；折旧政策、资产年龄和租赁模式会影响比较。',False),
 ('rd_input_to_revenue_pct','研发投入／收入','%',None,'研发投入含适用资本化部分，不能与研发费用混用。',True),
 ('operating_cash_flow_to_revenue_pct','经营现金流／收入','%',None,'回款、采购、库存和支付节奏都会影响经营现金比率。',True),
 ('employees_year_end','期末员工规模','人',None,'员工表的集团/主要子公司边界并非完全一致；没有当作年平均从业人数。',False),
 ('production_employee_pct','生产类员工占期末员工比例','%',None,'公司专业类别不同；不是人工成本、工时或可替代比例。',True),
 ('revenue_per_year_end_employee','全年收入／年末员工（代理）','元/年末员工','CNY','全年合并收入÷年末员工表人数；不等于人均增加值。平均人数、外包和并购边界不足，不能由高低判断劳动生产率。',True),
 ('direct_labor_cost','已披露直接人工成本及缺口','元','CNY','各公司生产成本范围不同，禁止把本表原值排为行业人工强度；缺少统一全集团口径时保留空白，已取得的细分成本见证据。',False)]:
 table(met,title,'2025',u,c,n,d)
# Direct labour varies by scope: do not publish a misleading same-scope comparison table.
comparisons=[c for c in comparisons if not c['id'].endswith('direct-labor-cost')]
table('revenue','2026上半年营业收入','2026-H1','元','CNY','最新一期单独与2025上半年比较；未经审计，不乘2、不混入全年。')
findings=[]
def finding(key,title,body,nodeIds,ids,conditions=(),kind='calculation',period='2025'):
 evidence=list({(r['sourceId'],r['locator']):r for a in ids for r in refs(idx[a])}.values())
 findings.append({'id':'cn-c39-company-finding-'+key,'country':'cn','section':'companies','nodeIds':['cn-io-group-39','cn-gbt2017-39']+nodeIds,'period':period,'title':title,'body':body,'evidenceKind':kind,'evidence':evidence,'conditions':list(conditions)})
finding('scale','收入规模要结合业务组合阅读','浪潮信息2025年合并营业收入1,647.82亿元、同比增长43.25%，综合毛利率4.88%；其服务器分部毛利率约4.52%。这能描述企业的收入和成本结构，不能据此给计算机整机部门计算增加值。',['cn-io-39126'],['inspur-2025-revenue','inspur-2025-revenue_growth_pct','inspur-2025-gross_margin_pct','inspur-2025-servers-segment_revenue','inspur-2025-servers-segment_cost'],['集团及分部口径分别标注；2024数已追溯调整。'])
finding('assets','制造环节的长期资产投入差异很大','按购建长期资产现金/收入计算，中芯国际2025年为89.05%，京东方为19.60%，浪潮信息为0.14%。这是晶圆、面板、系统产品三个企业样本的差异，提示要结合制造环节、扩产周期和外包边界看规模。',['cn-io-39132','cn-io-39126'],['smic-2025-capex_cash_to_revenue_pct','boe-2025-capex_cash_to_revenue_pct','inspur-2025-capex_cash_to_revenue_pct'],['含无形资产及其他长期资产；不等于完整资本开支或自动化投资。'])
finding('pcb','同为PCB，终端用途的盈利结构不同','沪电股份披露数据通讯PCB收入146.56亿元、毛利率约39.68%，智能汽车PCB收入30.45亿元、毛利率约22.84%。同一公司内不同用途的差异，比把整家公司归到一个行业后求平均更有解释力。',['cn-io-39133'],['wus-2025-datacom-segment_revenue','wus-2025-datacom-segment_cost','wus-2025-automotive-segment_revenue','wus-2025-automotive-segment_cost'],['用途分部均属于PCB；不将其重新分类为通信设备或汽车整车。'])
finding('components','材料与电路板应分别看成本','生益科技覆铜板和粘结片分部收入177.74亿元、毛利率约23.91%；印制线路板分部收入91.44亿元、毛利率约28.61%。两者直接人工占各自成本的比例分别约4.53%和8.53%，已披露的细分比集团平均更有解释力。',['cn-io-39133'],['sytech-2025-ccl-segment_revenue','sytech-2025-ccl-segment_cost','sytech-2025-pcb-segment_revenue','sytech-2025-pcb-segment_cost','sytech-2025-ccl_direct_labor_cost','sytech-2025-pcb_direct_labor_cost'],['集团已含生益电子，不重复加入上市子公司；不是行业人工工时。'])
finding('labor','收入与人工支出可以反向变化','歌尔股份2025年营业收入下降4.36%，电子元器件业务直接人工成本从38.94亿元增至52.54亿元，增长约34.93%。公司在年报中解释了越南生产旺季劳动力短缺、加大招聘激励和薪酬投入；这是企业解释，尚不能作为行业统一因果结论。',['cn-io-39131','cn-io-39133','cn-io-39134'],['goer-2025-revenue_growth_pct','goer-2025-direct_labor_cost','goer-2024-direct_labor_cost'],['直接人工为业务生产成本，职工现金支付是另一口径。'])
findings[-1]['evidence'].append({'sourceId':'goer-ar2025','locator':'PDF第14页：2025年越南劳动力供给与工资说明'})
finding('scope','集团增长需要拆开并购与自身业务','立讯2025年消费电子收入2,642.66亿元、汽车电子392.55亿元、通讯及数据中心245.68亿元；报告说明汽车业务增加包含并入Leoni，内销增加包含通讯ODM并表。将集团增长一概理解为同口径产量增长会失真。',['cn-io-39129','cn-io-39133','cn-io-39134','cn-io-39128'],['luxshare-2025-consumer-segment_revenue','luxshare-2025-automotive-segment_revenue','luxshare-2025-communication-segment_revenue'],['年末员工也受合并范围变动影响；人均收入仅作代理。'])
findings[-1]['evidence'].append({'sourceId':'luxshare-ar2025','locator':'PDF第18页：同比变动原因，Leoni及通讯ODM'})
finding('services','统计行业代码不能决定全部公司收入的产品归属','海格2025年公司披露工业业务收入占41.68%、服务业占58.32%；四创雷达及配套分部8.15亿元也只是其17.45亿元集团收入的一部分。样本通过业务分部关联到图谱，保留跨行业与服务业务。',['cn-io-39128','cn-io-39129','cn-io-39130'],['haige-2025-revenue','suncreate-2025-revenue','suncreate-2025-radar-segment_revenue'],['上市行业标签不是全部业务的国民经济核算分类。'],kind='judgement')
findings[-1]['evidence'].append({'sourceId':'haige-ar2025','locator':'PDF第21页：分行业工业/服务业收入'})
latest=[]
for k in ['wus','sytech','suncreate']:
 old=idx[k+'-2025-H1-revenue']['value'];new=idx[k+'-2026-H1-revenue']['value'];growth=idx[k+'-2026-H1-h1_revenue_growth_pct']['value']
 latest.append(f'{names[k]}集团收入由2025上半年的{old/1e8:.2f}亿元变为2026上半年的{new/1e8:.2f}亿元（同比{growth:+.2f}%）')
finding('latest-h1','2026上半年，PCB和材料样本增长，雷达相关样本回落','；'.join(latest)+'。最新一期显示企业经营方向分化，不能将某个产品方向的增长推广为整个电子设备行业共同景气。',['cn-io-39133','cn-io-39130'],[k+'-2026-H1-h1_revenue_growth_pct' for k in ['wus','sytech','suncreate']],['半年报未经审计，不乘2推算全年；同比采用同一2026半年报的2025同期比较列。','均为合并集团收入；生益包含材料与PCB，四创也含公共安全等业务，四创集团下降不能直接认定为雷达分部下降。','未剔除并购、汇率、收入确认和订单交付时点影响；三个样本不代表C39总体或对应产品市场总量。'],period='2026-H1')
coverage=[]
for c in companies:
 k=c['id'];coverage.append({'id':'cn-company-coverage-'+k,'country':'cn','group':'上市公司财报样本','title':c['name']+'：已读完整原件并提取核心表','period':'2025；2024比较列；2026-H1','status':'obtained','detail':'已取得2025年报和2026半年报原件、PDF定位、哈希；提取收入/成本/现金流/资产/研发/员工及相关分部。缺失指标逐项保留null。','evidence':[{'sourceId':k+'-ar2025','locator':'合并财务报表、主要业务、员工与成本构成；精确页码见metrics.json'},{'sourceId':k+'-h12026','locator':'主要会计数据，收入本期与上年同期'}],'nextStep':'如需推断行业总体，先建立全量企业名录与纳入排除规则、取得非上市企业覆盖分母。'})
coverage.extend([{'id':'cn-company-coverage-population','country':'cn','group':'上市公司财报样本','title':'样本总体覆盖率','period':'2025','status':'pending','detail':'13家为分层目的样本，九个产品均有直接业务或部分关联，不代表全体企业；没有匹配增加值分母，因此不计算国家行业覆盖百分比。','evidence':[{'sourceId':'boe-ar2025','locator':'PDF第19—21页：多业务分部及其他抵销'},{'sourceId':'sytech-ar2025','locator':'PDF第13页：生益电子列作集团子公司'}],'nextStep':'按具体产品建立全体上市企业/非上市重点企业名单，解决合并集团边界。'},{'id':'cn-company-coverage-headcount','country':'cn','group':'上市公司财报样本','title':'平均员工与外包边界','period':'2025','status':'checked-no-metric','detail':'所读员工表以期末人数为主；统一全年平均人数、派遣和供应链外包人数未取得。劳务外包栏“不适用”不证明全产业链没有外包。','evidence':[{'sourceId':'zte-ar2025','locator':'PDF第28页：供应商包括外包生产商；第69页：集团员工'},{'sourceId':'inspur-ar2025','locator':'PDF第29—30页：员工与劳务外包栏'}],'nextStep':'取得各企业平均用工定义、主要子公司范围、境内外及外包口径，后再比较人均增加值。'}])
write('coverage.json',{'coverage':coverage})
write('panel-data.json',{'sources':sources,'comparisons':comparisons,'findings':findings,'coverage':coverage})
print('panel',len(comparisons),'comparisons',len(findings),'findings',len(coverage),'coverage entries')
