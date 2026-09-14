from pathlib import Path
import json,hashlib,copy,re
R=Path(__file__).resolve().parent;REPO=R.parents[3]
def write(n,d):(R/n).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
requests=json.loads((R/'request-log.json').read_text());req={x['filename']:x for x in requests}
S=[];O=[];C=[];F=[];V=[];A=[]
N=['cn-io-group-39','cn-gbt2017-39'];day='2026-09-14'
regions={'tj':'天津','he':'河北','sx':'山西','nm':'内蒙古','ln':'辽宁','jl':'吉林','hl':'黑龙江','ah':'安徽','fj':'福建','jx':'江西','sd':'山东','ha':'河南','hb':'湖北','hn':'湖南','gx':'广西','hi':'海南','gz':'贵州','yn':'云南','xz':'西藏','sn':'陕西','gs':'甘肃','qh':'青海','nx':'宁夏','xj':'新疆'}
rev='原表出版版本值；未见该表独立修订日期，不与不同版本直接计算可比增长'
def source(id,filename,title,region,period,date=None,member=None,parent=None,limitations=None):
 q=req[parent or filename];p=R/'originals'/filename
 d={'id':'dr-or-'+id,'title':title,'publisher':(regions.get(region,region)+('市' if region=='tj' else '省'))+'统计局','url':q['url'],'published':date,'retrieved':day,'country':'cn','kind':'official-statistics','archive':str(p.relative_to(REPO)),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'evidencePeriod':period,'publishedLabel':('入口页面发布日期 '+date+'；表格为所列出版版本。' if date else '原表未标注精确上线日期；版次与资料年分别记录。'),'limitations':limitations or ['只读取标题、单位、C39目标行及本文所列关联行；不代表整卷逐页核查。']}
 if member:d['limitations'].append('ZIP成员：'+member+'；本地保存该成员原件，整包URL及hash见archive-policy.json。')
 S.append(d);return d['id']
def ev(s,l):return [{'sourceId':s,'locator':l}]
def obs(region,period,metric,value,unit,s,locator,industry='39',name='计算机、通信和其他电子设备制造业',scope='规模以上工业企业',edition=None,note=None):
 o={'id':f'dr-or-{region}-{period}-{industry}-{metric}-{len(O)+1}','country':'cn','region':regions[region],'regionId':region,'industryCode':industry,'industryName':name,'period':str(period),'publicationEdition':edition or f'{int(period)+1}年统计年鉴','metric':metric,'value':value,'unit':unit,'currency':'CNY' if '元' in unit else None,'scope':scope,'releaseDate':next(x['published'] for x in S if x['id']==s),'revision':rev,'evidenceKind':'fact','evidence':ev(s,locator),'notes':note or []}
 O.append(o);return o
metricNames={'enterprise-count':'企业单位数','assets':'资产总计','revenue':'营业收入','cost':'营业成本','profit':'利润总额','average-workers':'平均用工人数','average-employees':'从业人员平均人数','annual-all-employees':'全部从业人员年平均人数','principal-revenue':'主营业务收入','real-va-growth':'实际增加值增长率','real-va-index':'工业发展指数','output':'工业总产值','wages-payable':'本年应付职工薪酬','loss-enterprises':'亏损企业数','industry-share':'占全省规上工业增加值比重'}
def simple(region,year,filename,title,vals,unit='亿元人民币',worker=None,date=None,scope='规模以上工业企业',table=None):
 s=source(f'{region}-{year}-{filename.split(".")[0]}',filename,f'{regions[region]}统计年鉴{year+1}：{title}',region,str(year),date)
 for metric,value in vals.items():
  u='个' if metric in ['enterprise-count','loss-enterprises'] else (worker[1] if worker and metric==worker[0] else unit)
  obs(region,year,metric,value,u,s,f'{table or title}，C39“计算机、通信和其他电子设备制造业”行，{metricNames[metric]}列',scope=scope)
 return s
# Read-only transcription from official table images, including complete headers and the target row.
simple('he',2024,'he2025-1202.jpg','12-2 按行业分规模以上工业企业主要指标（2024）',{'enterprise-count':277,'assets':1806.36,'revenue':883.35,'cost':757.31,'profit':23.05,'average-workers':70797},worker=('average-workers','人'))
simple('he',2023,'he2024-1202.jpg','12-2 按行业分规模以上工业企业主要指标（2023）',{'enterprise-count':266,'assets':1577.07,'revenue':760.34,'cost':656.84,'profit':14.97,'average-workers':67892},worker=('average-workers','人'))
simple('hn',2024,'hn2025-13-03.jpg','13-3 规模以上工业企业行业大类主要经济指标（2024）',{'enterprise-count':1126,'assets':4440.34,'revenue':3307.61,'cost':2797.82,'profit':180.93,'average-workers':29.96},worker=('average-workers','万人'),date='2026-01-19')
simple('tj',2024,'tj2025-13-04.jpg','13-4 按行业分规模以上工业企业主要经济指标（2024）',{'enterprise-count':267,'assets':24831855,'revenue':21460628,'profit':993098,'average-workers':85913},unit='万元人民币',worker=('average-workers','人'))
simple('sd',2024,'sd2025-14-01.jpg','14-1 规模以上工业企业主要经济指标（2024）',{'enterprise-count':1086,'assets':7125.7,'revenue':6168.0,'cost':5598.5,'profit':119.4,'average-workers':29.4},worker=('average-workers','万人'))
for year,vals in [(2024,[142,1208.15,666.94,12.64,672.58]),(2023,[145,1024.08,704.43,49.41,675.15])]:
 simple('gz',year,f'gz{year+1}-14-11.jpg',f'14-11 规模以上工业企业分行业主要经济指标（{year}）',dict(zip(['enterprise-count','assets','revenue','profit','output'],vals)))
# 2023 Heilongjiang title omits threshold. Preserve its source scope ambiguity.
for year,vals in [(2024,[26,1140481,258555,192456,1646]),(2023,[22,921040,173956,126437,27])]:
 simple('hl',year,f'hl{year+1}-12-02.jpg',f'12-2 工业企业主要经济指标（{year}）',dict(zip(['enterprise-count','assets','revenue','cost','profit'],vals)),unit='万元人民币',scope='规模以上工业企业' if year==2024 else '本表工业企业；标题未重复规模门槛，章内范围仍待核')
simple('sn',2024,'sn2025-1304.jpg','13-4 规模以上工业企业分行业主要经济指标（2024）',{'enterprise-count':304,'assets':35571858,'revenue':20334609,'cost':17521827,'profit':1556172,'average-workers':82489},unit='万元人民币',worker=('average-workers','人'))
for year,vals in [(2024,[1780,61930253,64358301,58217816,2574535,427488]),(2023,[1512,52212473,55823572,49731875,2561557,381853])]:
 simple('jx',year,f'jx{year+1}-1306.jpg',f'13-6 规模以上工业企业主要经济指标（{year}）',dict(zip(['enterprise-count','assets','revenue','cost','profit','annual-all-employees'],vals)),unit='万元人民币',worker=('annual-all-employees','人'),date='2026-01-30' if year==2024 else '2025-03-04')
s=source('jx2025-growth','jx2025-1301.jpg','江西统计年鉴2025：13-1规模以上工业企业增加值增速','jx','2023—2024','2026-01-30')
for y,v in [(2023,9.2),(2024,10.6)]:obs('jx',y,'real-va-growth',v,'%',s,f'表13-1，C39行，{y}年比上年增长列',edition='2025年统计年鉴')
for year,vals in [(2024,[182,663.4,605.3,509.7,31.4]),(2023,[170,576.4,733.8,632.9,34.9])]:
 simple('ln',year,f'ln{year+1}-14-04.jpg',f'14-4 按行业分规模以上工业企业主要指标（{year}）',dict(zip(['enterprise-count','assets','revenue','cost','profit'],vals)))
# Machine-readable originals: retain exact row and column addresses.
s=source('fj2025-1105','fj2025-11-05.xls','福建统计年鉴2025：11-5规模以上工业企业主要指标（2024年）','fj','2024')
d=json.loads((R/'extracted/fj2025-11-05.json').read_text());cells=d['cells'];row=cells[110];assert '计算机' in row[0]
for metric,c in [('enterprise-count',1),('assets',2),('revenue',7),('profit',9)]:obs('fj',2024,metric,row[c],'个' if c==1 else '万元人民币',s,f'11-05.xls，Sheet1，Excel第111行，第{c+1}列（{metricNames[metric]}）；表头第1、4、5行')
for year,fn in [(2024,'jl2025-13-2.html'),(2023,'jl2024-B13_2.htm')]:
 s=source(f'jl{year+1}-132',fn,f'吉林统计年鉴{year+1}：13-2规模以上工业企业主要经济指标','jl',str(year))
 cells=json.loads((R/'extracted'/(Path(fn).stem+'-rows.json')).read_text()); row=next(x for x in cells if any('计算机、通信和其他电子' in c['text'] for c in x));textrow=[x['text'] for x in row]
 for metric,c in [('enterprise-count',1),('assets',4),('revenue',9),('cost',10),('profit',15),('average-employees',17)]:
  obs('jl',year,metric,float(textrow[c].replace(',','')),'个' if c==1 else '人' if c==17 else '万元人民币',s,f'表13-2，HTML第41个tr，C39行，第{c+1}个td（{metricNames[metric]}）')
 obs('jl',year,'official-revenue-per-person',float(textrow[20]),'万元人民币/人',s,'表13-2，HTML第41个tr，C39行，官方人均营业收入列',note=['原表该列与营业收入÷从业人员平均人数并不相等；未以自行计算覆盖原数，也不作跨省效率排名。'])
# Hubei ZIP members preserve table title and separate continuations.
for year in [2023,2024]:
 for suffix,fields in [(7,[('enterprise-count',2),('assets',3)]),(10,[('revenue',2),('cost',4)]),(12,[('profit',6)]),(13,[('wages-payable',3),('annual-all-employees',5)])]:
  p=next((R/'extracted').glob(f'hb{year+1}-1302-{suffix}-*.json'));d=json.loads(p.read_text());fn=p.stem+'.xls'
  s=source(f'hb{year+1}-132-{suffix}',fn,f'湖北统计年鉴{year+1}：13-2续{suffix}', 'hb',str(year),'2025-12-31' if year==2024 else '2024-12-31',member=d.get('member',''),parent=f'hb{year+1}.zip')
  ri,row=next((i+1,x) for i,x in enumerate(d['cells']) if '计算机、通信和其他电子' in str(x[0]))
  for metric,c in fields:obs('hb',year,metric,row[c],'个' if metric=='enterprise-count' else '万人' if metric=='annual-all-employees' else '亿元人民币',s,f'13-2续{suffix}，Excel第{ri}行第{c+1}列（{metricNames[metric]}）；原始单位/合并表头第3—8行')
# Hunan census: all nine middle categories, 1-A-6 scope above designated size.
base='湖南经济普查年鉴（2023）（EXCEL）/2 第二产业卷 上/01 工业企业生产经营及财务状况篇/'
cs={}
for pg in [0,20,21,22,44,45,46,68,69,70]:
 fn=f'hn-census-1-A-06-{pg:02d}.xls';cs[pg]=source(f'hn-census-1a6-{pg:02d}',fn,f'湖南经济普查年鉴2023：1-A-6 第{pg+1}页','hn','2023','2026-01-09',member=base+f'1-A-06-{pg:02d}.xls',parent='hn-census2023.zip')
rows=[('39',20,34),('391',20,35),('392',21,7),('393',21,10),('394',21,16),('395',21,17),('396',21,21),('397',21,27),('398',21,35),('399',22,7)]
for code,pg,ri in rows:
 row=json.loads((R/'extracted'/f'hn-census-1-A-06-{pg:02d}.json').read_text())['cells'][ri-1];name=row[0].strip()
 for metric,p,c in [('enterprise-count',pg,1),('assets',pg,2),('revenue',pg+24,12),('cost',pg+48,1),('profit',pg+48,10),('average-workers',pg+48,12)]:
  v=json.loads((R/'extracted'/f'hn-census-1-A-06-{p:02d}.json').read_text())['cells'][ri-1][c]
  obs('hn',2023,metric,v,'个' if metric=='enterprise-count' else '万人' if metric=='average-workers' else '亿元人民币',cs[p],f'1-A-06-{p:02d}.xls，第{ri}行第{c+1}列；{name}（C{code}），{metricNames[metric]}；规模门槛见1-A-06-00.xls标题',industry=code,name=name,edition='湖南经济普查年鉴2023（2026-01-09上线）')
# Yunnan 2025 workbook: do not silently rename principal-business income as total revenue.
s=source('yn2025-industry','yn2025-industry.xlsx','云南统计年鉴2025：八、工业和能源(1-34)','yn','2020—2024','2026-05-07',member='2025云南统计年鉴/8.工业和能源/八、工业和能源(1-34).xlsx',parent='yn2025.zip')
ys=json.loads((R/'extracted/yn2025-industry.json').read_text())
for prefix,fields in [('8-4-2',[('enterprise-count',5),('loss-enterprises',6),('output',7),('assets',8)]),('8-4-3',[('principal-revenue',6),('profit',10),('average-employees',14)])]:
 d=next(x for x in ys if x['sheet'].startswith(prefix));ri,row=next((i+1,x) for i,x in enumerate(d['cells']) if '计算机、通信和其他电子' in str(x[0]))
 for metric,c in fields:obs('yn',2024,metric,row[c],'个' if metric in ['enterprise-count','loss-enterprises'] else '万人' if metric=='average-employees' else '亿元人民币',s,f'{d["sheet"]}，第{ri}行第{c+1}列；表头第3—5行')
d=next(x for x in ys if x['sheet'].startswith('8-2'));ri,row=next((i+1,x) for i,x in enumerate(d['cells']) if '计算机、通信和其他电子' in str(x[0]))
for y in range(2020,2025):
 for metric,c in [('real-va-growth',2+(y-2020)*2),('industry-share',3+(y-2020)*2)]:obs('yn',y,metric,row[c],'%',s,f'{d["sheet"]}，第{ri}行第{c+1}列；表头第4—7行，{y}年'+('比上年增长' if metric=='real-va-growth' else '占比'),edition='2025年统计年鉴')
# Price basis is anchored in the same workbook's development-index header.
for o in O:
 if o['regionId']=='yn' and o['metric']=='real-va-growth':
  o['evidence']+=ev(s,'8-3规模以上工业发展指数（2013-2024年）工作表，A4：按可比价格计算，上年=100；第45行C39，2024年M45=122，与8-2的22%衔接')
# Latest Hunan bulletin has its own official comparable growth; do not recompute against older yearbooks.
s=source('hn2025-bulletin','hn2025-bulletin.html','湖南省2025年国民经济和社会发展统计公报','hn','2025','2026-03-25')
obs('hn',2025,'profit',159.6,'亿元人民币',s,'工业利润段落：“计算机、通信和其他电子设备制造业利润159.6亿元，下降10.7%”',edition='2025年统计公报')
obs('hn',2025,'profit-growth-comparable',-10.7,'%',s,'同上，按公报直接公布下降10.7%保留',edition='2025年统计公报',note=['公报给出的同比；不拿159.6与2025年鉴中2024年180.93直接重算。'])
# Comparison panels: only same-year C39 revenue and profit; history kept in observations.
def compare(id,title,metric,unit,rows,notes,period='2024',coverage=None):
 C.append({'id':id,'country':'cn','section':'regions','nodeIds':N,'title':title,'metric':metric,'period':period,'unit':unit,'currency':'CNY' if '元' in unit else None,'coverage':coverage or '本轮实际读到的地方2025年鉴C39规模以上工业企业原表；是13省读取子集，非全国31省完整排名。','comparisonKey':id,'coverageLabel':f'{period} · 地方原表已读子集','notes':notes,'rows':rows})
def row(o,value=None):return {'id':o['id'],'name':o['region'] if o['industryCode']=='39' else o['industryName'],'nodeIds':[],'value':o['value'] if value is None else value,'evidence':o['evidence'],'releaseDate':o['releaseDate'],'revision':o['revision'],'notes':o['notes'],'missingReason':None}
for code,name in regions.items():
 os=[o for o in O if o['period']=='2024' and o['regionId']==code and o['industryCode']=='39']
 income=next((o for o in os if o['metric'] in ['revenue','principal-revenue']),None)
 if not income:continue
 originalnotes=[]
 refs=[]
 for o in os:
  if o['metric'] in ['profit','assets','average-workers','average-employees','annual-all-employees']:
   originalnotes.append(metricNames[o['metric']]+'：'+str(o['value'])+o['unit']+'（原表单位）。');refs+=o['evidence']
 r=row(income,income['value']/10000 if income['unit']=='万元人民币' else income['value']);r['notes']+=originalnotes;r['evidence']+=refs
 if income['unit']=='万元人民币':r['computation']={'expression':'原表万元金额 / 10000','inputs':[income['value'],10000],'note':'仅将万元人民币统一显示为亿元人民币；原格数值与原单位留在observations。'}
 compare('cn-c39-local2024-'+code+'-'+income['metric'],name+'：2024年C39'+metricNames[income['metric']],income['metric'],'亿元人民币',[r],['本卡单独阅读该省年鉴；不将地方不同修订批次和就业字段拼成统一效率排名。','原始利润、资产与用工只在同省说明中披露，所有观测保留原单位。','收入含中间投入，不是现价增加值；不用于分配GDP扇区面积。'],coverage=name+'2025年鉴C39规模以上工业企业；2024全年出版版本值。')
for metric in ['revenue','assets','average-workers']:
 os=[o for o in O if o['regionId']=='hn' and o['period']=='2023' and len(o['industryCode'])==3 and o['metric']==metric]
 compare('cn-c39-hn2023-middle-'+metric,'湖南电子制造九个中类：'+metricNames[metric],metric,'万人' if metric=='average-workers' else '亿元人民币',[row(o) for o in os],['同一普查表、同一规模以上范围；九个行业中类互不重叠。','与全国投入产出表的产品部门不是一一对应，不能配成产品人均增加值。'],period='2023',coverage='湖南第五次经济普查1-A-6，C39九个行业中类，规模以上工业企业。')
def finding(id,title,body,period,kind,evidence,conditions):F.append({'id':id,'country':'cn','section':'regions','nodeIds':N,'period':period,'title':title,'body':body,'evidenceKind':kind,'evidence':evidence,'conditions':conditions})
def get(region,metric,year=2024,code='39'):return next(o for o in O if o['regionId']==region and o['metric']==metric and o['period']==str(year) and o['industryCode']==code)
a=get('hn','revenue',2023,'398');b=get('hn','average-workers',2023,'397');p=get('hn','revenue',2023);w=get('hn','average-workers',2023);assets=get('hn','assets',2023,'397');totalassets=get('hn','assets',2023)
finding('cn-c39-hn-structure-deep','湖南：收入中心与用工、资产中心不同',f'2023年湖南规上C39中，电子元件及电子专用材料制造收入最高，为{a["value"]:.2f}亿元，占全行业{a["value"]/p["value"]*100:.2f}%；电子器件制造用工最多，为{b["value"]:.2f}万人，占{b["value"]/w["value"]*100:.2f}%，其资产占比为{assets["value"]/totalassets["value"]*100:.2f}%。','2023','calculation',a['evidence']+b['evidence']+p['evidence']+w['evidence']+assets['evidence']+totalassets['evidence'],['分母均为湖南同表C39父行业；同一普查版本。','这是企业行业结构，不替代全国2023投入产出产品部门结构。'])
a=get('yn','real-va-growth');b=get('yn','profit');r=get('yn','principal-revenue')
finding('cn-c39-yn-output-and-profit','云南：实际产出扩张与行业亏损同时出现','2024年云南规上C39实际增加值增长22.0%，同年利润总额为−61.35亿元。该表还记录主营业务收入1398.60亿元；这一收入字段与其他地方的营业收入分开保留。','2024','fact',a['evidence']+b['evidence']+r['evidence'],['产出增长是可比价指标，利润是当年会计金额，反映不同维度。','这些表不能单独证明亏损由价格、扩产、折旧或某一家企业造成；需公司及产品证据后再判断原因。'])
a=get('jl','official-revenue-per-person');b=get('jl','revenue');c=get('jl','average-employees')
finding('cn-c39-local-employment-boundary','人均指标需要先核对就业分母',f'吉林2024年原表人均营业收入为{a["value"]:.1f}万元/人，而同表营业收入÷从业人员平均人数约为{b["value"]/c["value"]:.2f}万元/人，二者不相等。本轮保留原数与差异，不自行补一个“正确”分母。湖南、河北等表用平均用工人数；湖北、江西表用全部从业人员年平均人数。','2024','calculation',a['evidence']+b['evidence']+c['evidence']+get('hn','average-workers')['evidence']+get('hb','annual-all-employees')['evidence']+get('jx','annual-all-employees')['evidence'],['差异不能仅凭标题归因为用工定义；还可能涉及公式或原表数据，需要向发布方核实。','不把这些从业人数接到2023产品投入产出增加值下计算每人增加值。'])
# Every province gets edition-specific reading boundaries; network/entry failures are request-log facts, not data nonexistence.
old=json.loads((REPO/'research/industry-analysis/regions/panel-data.json').read_text());oldcov={x['id']:x for x in old['coverage']}
read=[]
for code,name in regions.items():
 os=[o for o in O if o['regionId']==code];sources=list(dict.fromkeys(e['sourceId'] for o in os for e in o['evidence']))
 related=[q for q in requests if q['filename'].startswith(code)]
 editions=[]
 for edition,year in [('2024年统计年鉴','2023'),('2025年统计年鉴','2024'),('2023年地方经济普查年鉴','2023')]:
  matched=[o for o in os if o['period']==year and (('经济普查' in o['publicationEdition']) if '经济普查' in edition else o['publicationEdition'].startswith(edition[:4]) and '统计年鉴' in o['publicationEdition'])]
  paths=list(dict.fromkeys(e['sourceId'] for o in matched for e in o['evidence']))
  editions.append({'publicationEdition':edition,'dataYear':year,'stage':'target-table-read' if matched else 'not-read','readScope':sorted(set(o['metric'] for o in matched)),'observationCount':len(matched),'evidence':[e for o in matched[:1] for e in o['evidence']],'sourceIds':paths,'unreadScope':'其余行业、地域细表和研发表未纳入本次目标读取。' if matched else '该版C39目标内表本轮未读；请结合入口请求结果区分未定位、仅目录与访问受限。'})
 if code=='yn':
  editions[0]['stage']='target-table-partial';editions[0]['readScope']=['8-2、8-3 C39增长/指数头行；8-4拆分页结构已看，未将错位行拼接为观测'];editions[0]['unreadScope']='2024版拆分页行高不一致；未提取经营数。2023增长27.7已取2025版同序列。'
 if code=='hn':editions[0]['stage']='directory-read';editions[0]['unreadScope']='2024年鉴13-3目标图片未读；2023经营数本轮采用五经普1-A-6。'
 if code=='jx':editions[2]['stage']='table-downloaded-not-transcribed';editions[2]['unreadScope']='1-A-6原长图已取得；尚未将全行业长图内C39细类转成正式观察，不能声称本表全读。'
 if code=='gz':editions[2]['stage']='publication-notice-read';editions[2]['unreadScope']='公告称书附电子光盘，公告内未取得可下载内表；不等于没有资料。'
 failures=[{'url':q['url'],'filename':q['filename'],'status':q['status'],'error':q.get('failure') or q.get('error')} for q in related if q['status']!='downloaded']
 detail=('实际取得并读取：'+ '；'.join(x['publicationEdition']+'资料'+x['dataYear']+'，'+str(x['observationCount'])+'项观测' for x in editions if x['observationCount'])+'。' if os else '本轮未取得可发布的地方C39目标内表观测。')
 detail+='仍未覆盖：'+'；'.join(x['publicationEdition']+'（'+x['stage']+'）' for x in editions if x['stage']!='target-table-read')+'。' if any(x['stage']!='target-table-read' for x in editions) else '三类目标均部分读到，未声称整卷穷尽。'
 if failures:detail+='本轮官网请求未成功：连接建立、证书验证或访问响应阶段的具体错误已记入read-log；对应内表未读。'
 if not os and related and not failures:detail+='官网/目录页面已读，尚未进入目标统计表。'
 if code=='hl':detail+='2023年表标题未重复规模门槛，范围待核，未混入跨省比较。'
 if code=='yn':detail+='2024主营业务收入与营业收入字段分离。'
 detail+='未取得或未读均不证明数据不存在。2023地方投入产出表本轮未扩查。'
 e=[e for o in os for e in o['evidence']];e=list({(v['sourceId'],v['locator']):v for v in e}.values())[:4]
 replacement=copy.deepcopy(oldcov[f'cn-c39-region-audit-{code}']);replacement.update(title=f'{name}：'+('地方C39内表已部分读取' if os else '地方目标内表仍未取得'),status='obtained' if os else 'pending',detail=detail,evidence=e,nextStep='按read-log逐版补未读内表；先核范围/修订与就业定义，再扩展同年比较。')
 A.append({'collection':'coverage','id':replacement['id'],'reason':'本轮从入口检索推进到原表实际读取，或明确请求失败阶段；不将旧搜索日志等同已读。','replacement':replacement})
 read.append({'region':name,'regionId':code,'checkedAt':day,'editions':editions,'actualObservationCount':len(os),'requests':related,'failures':failures,'summary':detail})
V.append({'id':'cn-c39-other-regions-reading-boundary','country':'cn','group':'逐省实际读表','title':'剩余24地：13地已读目标内表，11地未取得正式观测','period':'2023—2025','status':'obtained','detail':'本轮覆盖24地入口与读表日志；13地有C39观察值。8地在首次官网访问阶段遇到HTTP/TLS错误，宁夏、西藏、新疆仍止于入口或目录。年度年鉴、五经普版次分别记录。不是对24地所有年鉴的穷尽。','evidence':get('hn','revenue',2023)['evidence']+get('yn','principal-revenue')['evidence']+get('ln','revenue')['evidence'],'nextStep':'优先补已定位未读的2024年鉴和江西普查内表；受限入口待恢复后再读，不重复无界检索。'})
# Archive policy: whole downloads retained locally; selected original members and explicit restores commit.
archives=[]
for q in requests:
 if q['filename'].endswith('.zip') and q['status']=='downloaded':archives.append({**q,'commitPolicy':'local-cache-only','restore':f'python3 research/industry-analysis/deep-reading/other-regions/fetch.py research/industry-analysis/deep-reading/other-regions/'+next(p.name for p in sorted(R.glob('batch*.json')) if any(z['filename']==q['filename'] for z in json.loads(p.read_text()))),'verification':'sha256 exact bytes; selected member originals remain versioned'})
write('archive-policy.json',{'wholeArchivePolicy':'ZIP整包、云南整本PDF和全文文本保留本地缓存、不提交。版本库保存目标XLS/XLSX/图片、读取定位、URL及SHA-256；fetch.py可按batch恢复。','archives':archives,'excludedFiles':['originals/*.zip','originals/*-full.pdf','extracted/*-full.txt','.deps/']})
write('observations.json',{'checkedAt':day,'records':O,'notes':['这是原始观察集；同地区、同年、不同出版版次不自动覆写。','本轮未取得24地2025年鉴之外更全面现价增加值；经营数据不补GDP扇区。']})
write('panel-data.json',{'sources':S,'comparisons':C,'findings':F,'coverage':V})
write('read-log.json',{'checkedAt':day,'regions':read,'summary':{'regionsAttempted':24,'regionsWithObservations':len(set(o['regionId'] for o in O)),'observations':len(O),'unreadMeaning':'未读/仅目录/访问失败均不代表无数据'}})
write('amendments.json',A)
write('source-manifest.json',S)
print('built',len(O),'observations',len(S),'sources',len(C),'comparisons',len(A),'amendments')
