"""Re-extract verified rows and recompute descriptive ratios. No investment or VA estimates."""
from pathlib import Path
import json,re,hashlib
B=Path(__file__).parent
J=lambda f:json.loads((B/f).read_text())
write=lambda f,x:(B/f).write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n')
names={'inspur':'浪潮信息','kaifa':'深科技','zte':'中兴通讯','transsion':'传音控股','haige':'海格通信','hisense':'海信视像','boe':'京东方A','smic':'中芯国际','luxshare':'立讯精密','sytech':'生益科技','goer':'歌尔股份','wus':'沪电股份','suncreate':'四创电子'}
periods={k:(B/'extracts'/f'{k}-2025.txt').read_text().split('\f') for k in names}
obs=[]
rev={k:'采用2025年报合并报表所列2024年可比数；不另拼接旧年报。' for k in names}
rev['inspur']='2025年报披露同一控制下企业合并，2024年比较数已追溯调整；使用调整后合并报表（PDF第7页）。'
rev['hisense']='2025年报列示2024年调整前/调整后数；使用调整后合并报表数（PDF第8页）。'
rev['luxshare']='2025年包含新增Leoni及通讯ODM业务合并范围，2024比较数不代表恒定企业边界（PDF第18页）。'
def add(k,metric,page,term,unit='元',years=(2025,2024),scope='合并集团',occurrence=0,values=None,note='',offset=0):
 ls=periods[k][page-1].splitlines();ix=[j for j,l in enumerate(ls) if term in re.sub(r'\s','',l)]
 assert len(ix)>occurrence,(k,page,term)
 j=ix[occurrence];found=[];last=j
 for n in range(j+offset,min(len(ls),j+offset+4)):
  found+=re.findall(r'(?<![\d.])[-(]?\d{1,3}(?:,\d{3})+(?:\.\d+)?\)?',ls[n]);last=n
  if len(found)>=len(years):break
 if values is not None:found=values
 assert len(found)>=len(years),(k,metric,page,found)
 factor={'元':1,'千元':1000,'万元':10000,'百万元':1000000,'人':1}[unit]
 for y,v in zip(years,found):
  n=float(str(v).replace(',','').replace('(','-').replace(')',''));normalized=abs(n) if metric in ['cash_paid_to_employees','cash_acquisition_long_term_assets'] else n
  obs.append({'id':f'{k}-{y}-{metric}','companyId':k,'country':'cn','period':str(y),'frequency':'annual','metric':metric,'scope':scope,'value':round(normalized*factor,2),'unit':'人' if unit=='人' else '元','currency':None if unit=='人' else 'CNY','rawValue':v,'rawUnit':unit,'multiplier':factor,'sourceId':f'{k}-ar2025','locator':{'pdfPage':page,'row':term,'textLine':j+1},'evidence':{'type':'direct-fact','excerpt':'\n'.join(ls[j:last+1]).strip()},'revisionNote':rev[k],'note':note})
# All financial rows are from consolidated statements, never parent-company statements.
spec={
'inspur':{'revenue':(61,'营业收入'),'cost_of_revenue':(62,'营业成本'),'fixed_assets_net':(58,'固定资产'),'operating_cash_flow':(65,'经营活动产生的现金流量净额'),'cash_paid_to_employees':(65,'支付给职工'),'cash_acquisition_long_term_assets':(66,'购建固定资产'),'rd_input':(15,'研发投入金额','万元')},
'kaifa':{'revenue':(105,'营业收入'),'cost_of_revenue':(105,'营业成本'),'fixed_assets_net':(101,'固定资产'),'operating_cash_flow':(107,'经营活动产生的现金流量净额'),'cash_paid_to_employees':(107,'支付给职工'),'cash_acquisition_long_term_assets':(107,'购建固定资产'),'rd_input':(29,'研发投入金额')},
'zte':{'revenue':(102,'营业收入','千元'),'cost_of_revenue':(102,'营业成本','千元'),'fixed_assets_net':(99,'固定资产','千元'),'operating_cash_flow':(106,'经营活动产生的现金流量净额','千元'),'cash_paid_to_employees':(106,'支付给职工','千元'),'cash_acquisition_long_term_assets':(106,'购建固定资产','千元'),'rd_input':(29,'研发投入金额','百万元')},
'hisense':{'revenue':(89,'营业收入'),'cost_of_revenue':(89,'营业成本'),'fixed_assets_net':(85,'固定资产'),'operating_cash_flow':(30,'经营活动产生的现金流量净额'),'cash_paid_to_employees':(92,'支付给职工'),'cash_acquisition_long_term_assets':(92,'购建固定资产')},
'boe':{'revenue':(100,'营业收入'),'cost_of_revenue':(100,'营业成本'),'fixed_assets_net':(97,'固定资产'),'operating_cash_flow':(104,'经营活动产生的现金流量净额'),'cash_paid_to_employees':(104,'支付给职工'),'cash_acquisition_long_term_assets':(104,'购建固定资产'),'rd_input':(25,'研发投入金额')},
'goer':{'revenue':(82,'营业收入'),'cost_of_revenue':(82,'营业成本'),'fixed_assets_net':(79,'固定资产'),'operating_cash_flow':(85,'经营活动产生的现金流量净额'),'cash_paid_to_employees':(85,'支付给职工'),'cash_acquisition_long_term_assets':(85,'购建固定资产'),'rd_input':(19,'研发投入金额')},
'haige':{'revenue':(77,'营业收入'),'cost_of_revenue':(77,'营业成本'),'fixed_assets_net':(73,'固定资产'),'operating_cash_flow':(80,'经营活动产生的现金流量净额'),'cash_paid_to_employees':(80,'支付给职工'),'cash_acquisition_long_term_assets':(80,'购建固定资产'),'rd_input':(26,'研发投入金额')},
'luxshare':{'revenue':(121,'营业收入'),'cost_of_revenue':(121,'营业成本'),'fixed_assets_net':(117,'固定资产'),'operating_cash_flow':(124,'经营活动产生的现金流量净额'),'cash_paid_to_employees':(124,'支付给职工'),'cash_acquisition_long_term_assets':(124,'购建固定资产'),'rd_input':(41,'研发投入金额')},
'smic':{'revenue':(127,'营业收入','千元'),'cost_of_revenue':(127,'营业成本','千元'),'fixed_assets_net':(124,'固定资产','千元'),'operating_cash_flow':(129,'经营活动产生的现金流量净额','千元'),'cash_paid_to_employees':(129,'支付给职工','千元'),'cash_acquisition_long_term_assets':(129,'购建固定资产','千元'),'rd_input':(17,'研发投入合计','千元')},
'sytech':{'revenue':(91,'营业收入'),'cost_of_revenue':(91,'营业成本'),'fixed_assets_net':(88,'固定资产'),'operating_cash_flow':(13,'经营活动产生的现金流量净额'),'cash_paid_to_employees':(95,'支付给职工'),'cash_acquisition_long_term_assets':(96,'购建固定资产')},
 'transsion':{'revenue':(110,'营业收入'),'cost_of_revenue':(110,'营业成本'),'fixed_assets_net':(106,'固定资产'),'operating_cash_flow':(114,'经营活动产生的现金流量净额'),'cash_paid_to_employees':(114,'支付给职工'),'cash_acquisition_long_term_assets':(115,'购建固定资产'),'rd_input':(22,'研发投入合计')},
'wus':{'revenue':(87,'营业收入'),'cost_of_revenue':(87,'营业成本'),'fixed_assets_net':(83,'固定资产'),'operating_cash_flow':(89,'经营活动产生的现金流量净额'),'cash_paid_to_employees':(89,'支付给职工'),'cash_acquisition_long_term_assets':(89,'购建固定资产'),'rd_input':(24,'研发投入金额')},
'suncreate':{'revenue':(73,'营业收入'),'cost_of_revenue':(73,'营业成本'),'fixed_assets_net':(69,'固定资产'),'operating_cash_flow':(77,'经营活动产生的现金流量净额'),'cash_paid_to_employees':(77,'支付给职工'),'cash_acquisition_long_term_assets':(77,'购建固定资产')}
}
for k,items in spec.items():
 for metric,args in items.items():add(k,metric,*args)
for k,pg in [('hisense',29),('sytech',17),('suncreate',25)]:add(k,'rd_input',pg,'研发投入合计',years=(2025,))
emp={'inspur':(29,29),'kaifa':(52,53),'boe':(48,48),'goer':(44,44),'haige':(45,45),'hisense':(50,50),'luxshare':(65,66),'smic':(61,61),'sytech':(48,48),'transsion':(59,59),'wus':(55,55),'suncreate':(41,41)}
for k,(e,p) in emp.items():
 add(k,'employees_year_end',e,'在职员工的数量合计',unit='人',years=(2025,),scope='年报员工表：母公司和主要子公司',note='期末人数，不是全年平均人数；境内外及劳务派遣覆盖以年报定义为准。')
 # Small production counts need explicit strings because the money-oriented matcher requires commas.
 val=['707'] if k=='suncreate' else None
 add(k,'production_employees_year_end',p,'生产人员',unit='人',years=(2025,),scope='年报员工表：生产/运营生产类别',values=val,note='不同企业专业分类不同；不是行业生产从业人数。')
add('zte','employees_year_end',69,'本集团员工共',unit='人',years=(2025,),values=['65,095'],scope='本集团',note='2025年末员工总数；PDF页69，印刷页68。')
add('zte','production_employees_year_end',69,'生产人员',unit='人',years=(2025,),values=['13,098'],scope='本集团员工专业分类',note='数字位于“生产人员”标签上一行；已逐页读取核对。')
write('metrics.json',{'checkedAt':'2026-09-14','observations':obs})
print('wrote',len(obs),'direct observations')
# H1 progress is an independent period with the same half-year comparator; never annualised.
interim=J('interim-manifest.json')
for k,pg,unit,term in [('inspur',7,'万元','营业收入'),('kaifa',7,'元','营业收入'),('zte',8,'千元','营业收入'),('transsion',7,'元','营业收入'),('haige',7,'元','营业收入'),('hisense',6,'元','营业收入'),('boe',8,'元','Operatingrevenue'),('smic',7,'千元','营业收入'),('luxshare',8,'元','营业收入'),('sytech',5,'元','营业收入'),('goer',8,'元','营业收入'),('wus',7,'元','营业收入'),('suncreate',5,'元','营业收入')]:
 original=periods[k];periods[k]=(B/'extracts'/f'{k}-2026h1.txt').read_text().split('\f');start=len(obs)
 add(k,'revenue',pg,term,unit,years=('2026-H1','2025-H1'))
 for x in obs[start:]:
  x['frequency']='half-year';x['sourceId']=f'{k}-h12026';x['revisionNote']='2026年半年报所列本期及上年同期比较数；未审计，未年化。';x['note']='仅比较1—6月，不能与2025全年金额混排。'
 periods[k]=original
# Segment lines are company management disclosures. Related IO products are a mapping, not a numerical allocation.
segments=[]
def seg(k,key,name,page,revenue,cost,unit='元',previous=None,products=(),note=''):
 factor={'元':1,'千元':1000,'万元':10000,'百万元':1000000}[unit]
 vals={};start=len(obs)
 for metric,v in [('segment_revenue',revenue),('segment_cost',cost)]:
  if v is None:continue
  # Exact numeric token must exist on this inspected page.
  assert str(v) in periods[k][page-1],(k,page,name,v)
  value=float(v.replace(',',''))*factor
  idx=f'{k}-2025-{key}-{metric}'
  obs.append({'id':idx,'companyId':k,'country':'cn','period':'2025','frequency':'annual','metric':metric,'segmentId':key,'scope':f'公司披露分部：{name}','value':round(value,2),'unit':'元','currency':'CNY','rawValue':v,'rawUnit':unit,'multiplier':factor,'sourceId':f'{k}-ar2025','locator':{'pdfPage':page,'row':name},'evidence':{'type':'direct-fact','excerpt':f'{name}：{metric} {v} {unit}'},'revisionNote':rev[k],'note':note});vals[metric]=idx
 if previous:
  p,v=previous;assert v in periods[k][p-1],(k,p,name,v)
  obs.append({'id':f'{k}-2024-{key}-segment_revenue','companyId':k,'country':'cn','period':'2024','frequency':'annual','metric':'segment_revenue','segmentId':key,'scope':f'公司披露分部：{name}','value':float(v.replace(',',''))*factor,'unit':'元','currency':'CNY','rawValue':v,'rawUnit':unit,'multiplier':factor,'sourceId':f'{k}-ar2025','locator':{'pdfPage':p,'row':name},'evidence':{'type':'direct-fact','excerpt':f'{name}：2024 {v} {unit}'},'revisionNote':rev[k],'note':note})
 segments.append({'id':key,'companyId':k,'name':name,'productIds':['cn-io-'+str(x) for x in products],'metricIds':vals,'attribution':'相关业务分部，不等于对应IO产品部门规模','note':note})
seg('inspur','servers','服务器产品',13,'15,460,525.29','14,761,975.41','万元',(12,'10,468,100.49'),(39126,))
seg('inspur','storage-switch','存储类、交换类等产品',13,'977,128.95','891,709.43','万元',(12,'1,005,245.74'),(39127,39128),'混合分部；不能把同一分部全额分配给多个产品。')
seg('kaifa','memory','存储半导体',21,'4,090,725,850.30','3,256,015,917.72',previous=(21,'3,521,643,123.28'),products=(39132,))
seg('kaifa','manufacturing','高端制造',21,'8,535,402,038.94','7,706,997,512.83',previous=(21,'8,292,420,536.41'),products=(39127,),note='包含硬盘零部件和多种产品，只有部分与计算机零部件对应。')
seg('kaifa','meter','计量智能终端',21,'3,020,599,484.63','1,834,773,425.48',previous=(21,'2,935,130,329.72'),note='保留样本的非C39纯口径业务，不强塞电子设备产品。')
seg('zte','carrier','运营商网络',25,'62,857.0','32,628.1','百万元',products=(39128,),note='含服务，不是纯设备制造收入。')
seg('zte','enterprise','政企业务',25,'37,222.1','33,138.5','百万元',products=(39126,39128),note='服务器、存储、通信及服务混合。')
seg('zte','consumer','消费者业务',25,'33,816.4','27,624.7','百万元',products=(39129,))
seg('transsion','phone','手机',34,'58,447,548,685.12','47,673,966,547.77',products=(39129,))
seg('transsion','other','其他主营业务',34,'6,078,305,779.75','4,408,829,531.37',note='没有将其他主营业务直接归为智能消费设备。')
seg('haige','wireless','无线通信',22,'1,099,899,392.24','745,944,201.89',previous=(21,'1,582,443,306.37'),products=(39128,39129),note='设备、系统、芯片及服务混合，行业相关样本而非纯制造。')
seg('haige','navigation','北斗导航',22,'515,390,387.29','274,009,666.08',previous=(21,'452,978,937.13'),products=(39128,39129),note='导航、芯片和终端混合，不计算IO归属金额。')
seg('hisense','display-terminal','智慧显示终端',27,'4,496,372.07','3,815,722.90','万元',products=(39131,),note='含显示终端业务，不能视为全部非专业视听设备行业。')
seg('hisense','new-display','新显示新业务',27,'845,789.89','608,342.26','万元',note='激光/商显/芯片等混合，不将分部全额计入单一产品。')
seg('boe','display-devices','显示器件业务',20,'166,417,015,418.00','144,918,410,654.00',previous=(19,'165,003,592,549.00'),products=(39132,),note='分部间交易与其他业务存在抵销；分部金额不能无抵销加总。')
seg('boe','iot','物联网创新业务',20,'38,949,236,781.00','34,398,776,981.00',previous=(19,'33,828,880,608.00'),products=(39126,39131,39134),note='整机与物联网方案混合，存在分部抵销。')
seg('smic','foundry','集成电路晶圆制造代工',26,'62,794,043','49,450,277','千元',products=(39132,),note='中国企业集团口径，不以客户所在国认定生产地。')
seg('smic','other-main','其他主营业务',26,'3,786,198','2,574,795','千元',note='其他主营业务保留未拆分。')
seg('luxshare','consumer','消费电子',17,'264,265,914,303.66','236,153,149,062.72',previous=(17,'233,096,019,919.78'),products=(39129,39133,39134),note='零件/模组/整机混合；不按收入估计各产品增加值。')
seg('luxshare','automotive','汽车电子',17,'39,255,371,878.90','33,072,039,295.80',previous=(17,'13,757,628,639.98'),note='非C39纯口径，2025并入Leoni影响范围。')
seg('luxshare','communication','通讯及数据中心',17,'24,567,610,128.22','20,046,698,308.42',previous=(17,'18,359,940,363.70'),products=(39128,39133),note='零组件和系统混合。')
seg('sytech','ccl','覆铜板和粘结片',14,'17,774,100,611.83','13,523,605,546.25',products=(39133,))
seg('sytech','pcb','印制线路板',14,'9,144,009,119.00','6,528,111,852.61',products=(39133,),note='集团已合并生益电子；样本不再单列生益电子，防止重复。')
seg('goer','components','精密零组件',15,'17,977,957,315.09','13,750,311,081.88',previous=(15,'15,050,929,866.12'),products=(39133,),note='声光学及微电子相关混合业务。')
seg('goer','acoustic','智能声学整机',15,'22,978,234,115.31','22,093,096,063.96',previous=(15,'26,296,149,936.78'),products=(39131,39134),note='耳机/音箱等，产品分类存在交叉，不能重复计量。')
seg('goer','smart','智能硬件',15,'53,768,552,978.94','47,653,543,390.97',previous=(15,'57,198,506,011.44'),products=(39134,))
seg('wus','datacom','数据通讯PCB',20,'14,656,300,288','8,840,650,665',products=(39133,),note='按终端用途分组，仍是PCB，不等于通信系统设备制造收入。')
seg('wus','automotive','智能汽车PCB',20,'3,044,579,100','2,349,294,026',products=(39133,))
seg('wus','industrial','工业控制及其他PCB',20,'442,428,873','256,173,473',products=(39133,))
seg('suncreate','radar','雷达及配套产品',23,'814,912,646.43','678,317,600.17',products=(39130,))
seg('suncreate','security','公共安全产品',23,'496,119,591.54','477,095,266.49',note='不将公共安全应用全额列入雷达制造。')
# Direct labour costs use company-defined production cost scope, not total group payroll.
for k,pg,term,u,scope in [('kaifa',22,'人工成本','元','计算机、通信和其他电子设备制造业成本构成'),('goer',16,'直接人工','元','电子元器件业务成本构成'),('smic',27,'直接人工','千元','集成电路晶圆制造代工成本构成'),('wus',21,'直接人工','元','印制电路板成本构成'),('suncreate',23,'雷达及雷达配套人工费用','元','雷达及雷达配套产品成本构成')]:
 add(k,'direct_labor_cost',pg,term,u,scope=scope)
# Sytech's label wraps over two lines; exact source values from inspected PDF p16.
add('sytech','ccl_direct_labor_cost',16,'直接人','元',scope='覆铜板和粘结片',values=['612,591,948.23','530,900,820.29'])
add('sytech','pcb_direct_labor_cost',16,'直接人','元',scope='印制线路板',occurrence=1,values=['556,847,941.03','366,689,658.93'])
# Explicit missing observations distinguish inspected evidence limits from zero.
for k in names:
 for metric,why in [('employees_average','本次实际读取的年报员工表给出期末人数，未取得可复核全年平均人数；不将其假定为平均人数。'),('employees_year_end_2024','2025年报员工表未列2024可比员工数；未另取得2024年员工明细。'),('value_added','企业会计财报未按本研究的国民经济核算口径编制增加值；未做替代估算。')]:
  obs.append({'id':f'{k}-2025-{metric}-gap','companyId':k,'country':'cn','period':'2025','frequency':'annual','metric':metric,'scope':'未取得匹配口径','value':None,'unit':None,'currency':None,'rawValue':None,'rawUnit':None,'sourceId':f'{k}-ar2025','locator':{'pdfPage':69 if k=='zte' else emp[k][0],'row':'员工情况' if metric!='value_added' else '财务报表与核算口径比较'},'evidence':{'type':'evidence-gap'},'revisionNote':rev[k],'note':why})
 if not any(x['companyId']==k and x['metric']=='direct_labor_cost' for x in obs):
  obs.append({'id':f'{k}-2025-direct_labor_cost-gap','companyId':k,'country':'cn','period':'2025','frequency':'annual','metric':'direct_labor_cost','scope':'全集团统一口径','value':None,'unit':'元','currency':'CNY','rawValue':None,'rawUnit':None,'sourceId':f'{k}-ar2025','locator':{'pdfPage':{'inspur':13,'zte':28,'hisense':28,'boe':20,'haige':23,'luxshare':18,'sytech':16,'transsion':35}.get(k)},'evidence':{'type':'evidence-gap'},'revisionNote':rev[k],'note':'实际读取成本构成，未取得统一全集团直接人工成本；分部金额、混合成本和职工现金支出不作替代。'})
for x in obs:
 if x['metric']=='employees_year_end_2024':
  x['metric']='employees_year_end';x['period']='2024';x['id']=f"{x['companyId']}-2024-employees_year_end-gap"
for k,pg in [('hisense',29),('sytech',17),('suncreate',25)]:
 obs.append({'id':f'{k}-2024-rd_input-gap','companyId':k,'country':'cn','period':'2024','frequency':'annual','metric':'rd_input','scope':'合并集团研发投入','value':None,'unit':'元','currency':'CNY','rawValue':None,'rawUnit':None,'sourceId':f'{k}-ar2025','locator':{'pdfPage':pg,'row':'研发投入情况'},'evidence':{'type':'evidence-gap'},'revisionNote':rev[k],'note':'2025年研发投入表未取得2024研发投入可比总额；不以2024研发费用代替研发投入。'})
write('metrics.json',{'checkedAt':'2026-09-14','observations':obs})
write('segments.json',{'segments':segments})
# Recomputed metrics retain exact input ids and formula.
derived=[]
def calc(k,y,metric,args,fn,unit,note=''):
 rows=[]
 for a in args:
  r=next((x for x in obs if x['companyId']==k and x['period']==y and x['metric']==a and not x.get('segmentId') and x['value'] is not None),None)
  if r is None:return
  rows.append(r)
 v=fn(*[r['value'] for r in rows]);derived.append({'id':f'{k}-{y}-{metric}','companyId':k,'country':'cn','period':y,'frequency':'half-year' if 'H1' in y else 'annual','metric':metric,'value':v,'unit':unit,'currency':'CNY' if '元' in unit else None,'scope':'合并集团/员工表边界，非行业增加值','evidence':{'type':'calculated','inputs':[r['id'] for r in rows]},'note':note})
for k in names:
 for y in ['2025','2024']:
  calc(k,y,'gross_margin_pct',['revenue','cost_of_revenue'],lambda r,c:(r-c)/r*100,'%', '(营业收入-营业成本)/营业收入×100')
  calc(k,y,'capex_cash_to_revenue_pct',['cash_acquisition_long_term_assets','revenue'],lambda c,r:c/r*100,'%', '购建固定资产、无形资产和其他长期资产现金/收入；不含并购支出，不代表完整资本开支。')
  calc(k,y,'rd_input_to_revenue_pct',['rd_input','revenue'],lambda c,r:c/r*100,'%', '研发投入/收入；部分研发已资本化，因此不等于研发费用。')
  calc(k,y,'operating_cash_flow_to_revenue_pct',['operating_cash_flow','revenue'],lambda c,r:c/r*100,'%', '经营现金流净额/收入，受回款、采购、存货和结算节奏影响。')
 calc(k,'2025','revenue_per_year_end_employee',['revenue','employees_year_end'],lambda r,e:r/e,'元/年末员工','分子为全年合并收入，分母为期末员工表人数；仅为规模比率，不是人均增加值、劳动生产率或生产工人产值。平均人数缺失；跨境、外包、并购边界未统一。')
 calc(k,'2025','production_employee_pct',['production_employees_year_end','employees_year_end'],lambda p,e:p/e*100,'%', '期末员工专业分类，不代表劳动成本或工时占比。')
 for current,previous,metric in [('2025','2024','revenue_growth_pct'),('2026-H1','2025-H1','h1_revenue_growth_pct')]:
  a=next(x for x in obs if x['companyId']==k and x['period']==current and x['metric']=='revenue' and not x.get('segmentId'));c=next(x for x in obs if x['companyId']==k and x['period']==previous and x['metric']=='revenue' and not x.get('segmentId'))
  derived.append({'id':f'{k}-{current}-{metric}','companyId':k,'country':'cn','period':current,'frequency':'half-year' if 'H1' in current else 'annual','metric':metric,'value':(a['value']/c['value']-1)*100,'unit':'%','currency':None,'scope':'合并集团','evidence':{'type':'calculated','inputs':[a['id'],c['id']],'formula':'(current/previous-1)*100'},'note':'同期间比较；不剔除并购及汇率影响。'})
write('derived.json',{'observations':derived})
print('final',len(obs),'source observations,',len(segments),'segments,',len(derived),'computed measures')
