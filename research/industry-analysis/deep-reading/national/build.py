"""Transcribe visually checked source rows; OCR only locates candidates, never supplies facts."""
import json
from pathlib import Path
B=Path(__file__).parent
D='2026-09-14'
def save(name,x): (B/name).write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n')
fetch=json.loads((B/'fetch-log.json').read_text()); fm={x['id']:x for x in fetch if 'sha256' in x}
titles={'Bb1-D-03':'第五次经济普查年鉴：1-D-3 分行业企业新产品开发及销售情况','Bb1-E-03':'第五次经济普查年鉴：1-E-3 分行业企业自主知识产权及相关情况','Ba1-A-07':'第五次经济普查年鉴：1-A-7 国有控股工业企业主要经济指标','A2-12':'第五次经济普查年鉴：2-12 按行业、控股情况分组的企业法人单位数','A2-13':'第五次经济普查年鉴：2-13 按行业、控股情况分组的企业法人单位从业人员数','miit-economics-image':'工信部2024年电子信息制造业年度统计：主要经济指标（跨C39范围）','census-science-definitions':'第五次经济普查年鉴：主要指标解释（科技），书页465'}
sources=[]
for k,title in titles.items():
 f=fm[k];sources.append(dict(id='ia-deep-national-'+k.lower(),title=title,publisher='工业和信息化部' if k.startswith('miit') else '国家统计局',url=f['url'],published=None,retrieved=D,country='cn',kind='official-statistics',sha256=f['sha256'],archive=f['path'],limitations=['实读范围详见read-log；不代表整本资料已阅读。','原页未核到准确发布日期；普查年鉴编者说明为2025年3月。'] if not k.startswith('miit') else ['年度统计范围含电气机械、仪器仪表等，不能等同国民经济行业C39。','原图未给发布时间或修订标记；不是2024运行快报，也不替代中国统计年鉴C39行。']))
def ev(k,loc): return {'sourceId':'ia-deep-national-'+k.lower(),'locator':loc}
cn=['cn-io-group-39','cn-gbt2017-39']; ind=['cn-industry']; comparisons=[]; findings=[]; observations=[]
rev='2023年经济普查年鉴原图；编者说明2025年3月，具体发布日期未核，未另列修订状态'
names=['计算机制造','通信设备制造','广播电视设备制造','雷达及配套设备制造','非专业视听设备制造','智能消费设备制造','电子器件制造','电子元件及电子专用材料制造','其他电子设备制造']
newproducts=[[14995,4654154,72468580,41156536],[14058,21742180,197819588,91564559],[2903,653064,6829740,1965923],[1197,142493,520409,10514],[5050,1610029,29202799,11833205],[9944,3221134,42776068,22171765],[34727,15119171,117495997,38007515],[43502,10235249,136951485,36003531],[7028,1674957,13182104,2698941]]
patents=[[23950,11954,45816,19405,300],[76046,63256,313643,100569,821],[5613,2338,7584,6032,82],[1277,691,1838,892,14],[8622,3666,16458,7270,90],[22529,9544,23389,29331,316],[70068,43458,155861,22806,761],[50951,21078,74442,17809,3934],[11951,4032,13365,11005,209]]
for k,rows,cols,total in [('Bb1-D-03',newproducts,[('新产品开发项目数','项'),('新产品开发经费支出','万元'),('新产品销售收入','万元'),('新产品销售收入其中出口','万元')],[133541,59052432,617246770,245412488]),('Bb1-E-03',patents,[('专利申请数','件'),('其中发明专利申请','件'),('有效发明专利数','件'),('拥有注册商标数','件'),('形成国家或行业标准数','项')],[271007,160017,652396,215119,6527])]:
 for code,name,values in [('39','C39合计',total)]+[(str(391+i),n,r) for i,(n,r) in enumerate(zip(names,rows))]:
  for (metric,unit),v in zip(cols,values): observations.append(dict(id=f'{k}-{code}-{metric}',period='2023',scope='全国规模以上工业企业，企业行业分类',name=name,metric=metric,value=v,unit=unit,evidence=[ev(k,f'{name}行；{metric}列；表头单位{unit}')],revision=rev))
# Components are source values; retain unclassified residual rather than forcing balance.
reconciliation=[]
for k,rows,total in [('Bb1-D-03',newproducts,[133541,59052432,617246770,245412488]),('Bb1-E-03',patents,[271007,160017,652396,215119,6527])]:
 reconciliation.append(dict(source=k,parent=total,childrenSum=[sum(r[i] for r in rows) for i in range(len(total))],residualParentMinusChildren=[total[i]-sum(r[i] for r in rows) for i in range(len(total))],note='逐格目核后检查原表差额；零表示衔接，非零保留且不推断原因。'))
def table(key,title,metric,period,unit,currency,scope,rows,source,notes=None,nodeids=cn):
 out=[]
 for i,(name,v,comp) in enumerate(rows):
  r=dict(id='ia-deep-national-'+key+'-'+str(i),name=name,nodeIds=nodeids,value=v,evidence=[ev(source,f'{name}行；{metric}列及表头')],releaseDate=None,revision=rev if period.startswith('2023') else '2024年度统计原图，未另列发布时间与修订标记',notes=[],missingReason=None)
  if comp:r['computation']=comp
  out.append(r)
 comparisons.append(dict(id='ia-deep-national-'+key,country='cn',section='official',nodeIds=nodeids,title=title,metric=metric,period=period,unit=unit,currency=currency,coverage=scope,comparisonKey='cn-deep-'+key,coverageLabel=scope,notes=notes or [],rows=out))
table('new-sales','2023年C39九中类：新产品销售收入','新产品销售收入','2023年（历史结构）','万元','CNY','全国规上C39九个中类；同表同年',[(n,r[2],None) for n,r in zip(names,newproducts)],'Bb1-D-03',['新产品按普查科技指标定义，包含一定范围的改进产品，不等于全新技术或AI产品。','子项与总项差额详见补读复核；不强平，不与产品增加值混合。'])
table('new-export-share','2023年C39九中类：新产品销售中的出口占比','新产品销售收入其中出口 / 新产品销售收入','2023年（历史结构）','%',None,'全国规上C39九个中类；同表分子分母',[(n,r[3]/r[2]*100,dict(expression=f'{r[3]} / {r[2]} × 100',inputs=[r[3],r[2]],note='分子分母均为万元；仅新产品销售范围，不是行业全部收入出口占比。')) for n,r in zip(names,newproducts)],'Bb1-D-03')
table('inventions','2023年C39九中类：有效发明专利数','有效发明专利数','2023年末（历史结构）','件',None,'全国规上C39九个中类；有效专利存量',[(n,r[2],None) for n,r in zip(names,patents)],'Bb1-E-03',['有效专利存量不等于当年申请量或专利商业价值。'])
owner_names=['国有控股','集体控股','私人控股','港澳台商控股','外商控股']; counts=[1131,394,164236,3977,3734]; people=[675116,79289,6382614,1628084,1539473]
for k,vals,metric,unit,total in [('A2-12',counts,'企业法人单位数','个',173480),('A2-13',people,'从业人员数','人',10308607)]:
 table('ownership-'+('entities' if unit=='个' else 'workers'),'2023年C39：'+metric+'按控股类型分布',metric,'2023年末（历史结构）',unit,None,'全国C39企业法人；含规上和规下，五个“其中”项',[(n,v,None) for n,v in zip(owner_names,vals)],k,['原表五个其中项不是穷尽分类；与合计差额不擅自命名或分配。','本表人数是企业法人从业人员，不能替代规上全年平均用工分母。'])
 for r,n in zip(comparisons[-1]['rows'],owner_names):r['evidence']=[ev(k,f'C39行；{n}列；单位{unit}')]
 for n,v in zip(['C39合计']+owner_names,[total]+vals):observations.append(dict(id=f'{k}-{n}',period='2023年末',scope='全国C39企业法人（非仅规上）',name=n,metric=metric,value=v,unit=unit,evidence=[ev(k,f'C39行；{n}列；单位{unit}')],revision=rev))
 reconciliation.append(dict(source=k,parent=total,childrenSum=sum(vals),residualParentMinusChildren=total-sum(vals),note='五列标记为其中项，不是完整控股类型分类。'))
# MIIT image is a different, explicitly broader scope. All 12 industry rows visually read.
miit_names=['雷达及配套设备制造','通信设备制造','广播电视设备制造','电子计算机制造','非专用视听设备制造','仪器仪表制造业','电子和电工机械专用设备制造','电子元件及专用材料制造〔原表名称含重复字样〕','电子器件制造','电气机械和器材制造业','智能硬件设备制造','其他电子设备制造']
miit=[[134,139.1,7.2,1.5,332.1],[2418,47801.0,2281.9,155.9,47320.3],[676,2038.5,118.1,16.3,2694.1],[3396,25100.4,664.7,112.1,19659.7],[1222,6934.9,185.9,35.9,6263.4],[2006,3413.0,403.8,32.5,6145.1],[2532,4643.5,288.6,38.4,9767.3],[10903,34488.6,1483.4,279.8,47348.5],[9312,36525.1,1434.0,240.0,69700.1],[5231,36422.2,1590.6,158.7,51425.9],[2092,8896.3,298.1,55.5,9019.5],[1878,5031.1,275.2,37.3,5783.6]]
miit_total=[41800,211433.7,9031.5,1163.9,275459.6]
for name,vals in zip(['总计']+miit_names,[miit_total]+miit):
 for (metric,unit),v in zip([('企业个数','个'),('营业收入','亿元'),('利润总额','亿元'),('平均用工人数','万人'),('资产总计','亿元')],vals):observations.append(dict(id='miit-'+name+'-'+metric,period='2024',scope='工信部电子信息制造业年度统计制度，含C39以外类别',name=name,metric=metric,value=v,unit=unit,evidence=[ev('miit-economics-image',f'按行业分类；{name}行；{metric}列，单位{unit}')],revision='年度统计原图，未另列发布时间或修订标记'))
for key,label,col,unit in [('miit-revenue','营业收入',1,'亿元'),('miit-profit','利润总额',2,'亿元'),('miit-workers','平均用工人数',3,'万人')]:
 table(key,'2024年工信部扩展范围：'+label,label,'2024年全年',unit,'CNY' if unit=='亿元' else None,'工信部12个行业分类；含C39以外类别，不能视作C39构成',[(n,r[col],None) for n,r in zip(miit_names,miit)],'miit-economics-image',['只能在本表范围内比较；合计211433.7亿元营收不能替代C39增加值或营业收入。','电子元件原行含重复文字，保留注明；智能硬件等分类与国民经济中类不能未经映射直接等同。'],nodeids=ind)
reconciliation.append(dict(source='miit-economics-image',parent=miit_total,childrenSum=[round(sum(r[i] for r in miit),4) for i in range(5)],residualParentMinusChildren=[round(miit_total[i]-sum(r[i] for r in miit),4) for i in range(5)],note='五项汇总均衔接；未据此调整任一分项。'))
for metric,v,unit in [('企业个数',1014,'个'),('资产总计',33164.89,'亿元'),('营业收入',16191.43,'亿元'),('利润总额',333.02,'亿元'),('平均用工人数',80.95,'万人')]:observations.append(dict(id='state-c39-'+metric,period='2023',scope='国有控股工业企业C39（按本表；规模门槛待核，不与综合卷企业法人直接互换）',name='C39国有控股工业企业',metric=metric,value=v,unit=unit,evidence=[ev('Ba1-A-07',f'C39行；{metric}列')],revision=rev))
def finding(key,title,body,kind,evidence,conditions,section='official',period='2023年（历史结构）'):
 findings.append(dict(id='ia-deep-national-'+key,country='cn',section=section,nodeIds=cn,period=period,title=title,body=body,evidenceKind=kind,evidence=evidence,conditions=conditions))
a=164236/173480*100;b=6382614/10308607*100;c=(1628084+1539473)/10308607*100
finding('ownership','企业数量与就业分布呈现不同的控股结构',f'2023年C39企业法人中，私人控股占单位数{a:.2f}%，占从业人员{b:.2f}%；港澳台商与外商控股合计占从业人员{c:.2f}%。企业个数占比不能代表就业占比，更不能推成增加值份额。','calculation',[ev('A2-12','C39行，总计及私人控股列'),ev('A2-13','C39行，总计、私人控股、港澳台商和外商控股列')],['同为企业法人全范围，不是规上平均用工。','私人控股164236/173480×100；人数6382614/10308607×100；港澳台与外商(1628084+1539473)/10308607×100。','五个其中项存在未列明余项，不将它们归一到100%。'],section='structure')
finding('new-product','新产品销售提供了产品更新与外需的另一条线索',f'2023年C39新产品销售收入为61724.677亿元，其中出口24541.2488亿元，占{245412488/617246770*100:.2f}%。这能补充观察产品更新后的销售去向；不能直接解释成高技术收入、AI收入或行业整体出口依赖。','calculation',[ev('Bb1-D-03','C39行，新产品销售收入及其中出口列（万元）'),ev('census-science-definitions','PDF第1页、书页465右栏，新产品销售收入定义')],['原值617246770、245412488万元，除10000换亿元；占比245412488/617246770×100。','新产品包括认定有效期内产品和企业自行研制、未经认定、投产两年内产品；不是仅当年推出。','新产品项目数父子差137项，开发经费差1万元、出口差−1万元；销售收入恰好衔接。原因未核，不强平。'],section='structure')
finding('patent-stock','通信设备集中了较多有效发明专利',f'2023年规上C39有效发明专利652396件，其中通信设备313643件，占{313643/652396*100:.2f}%。这是有效专利存量的分布，不能据此给各细分的技术先进性或商业价值排名。','calculation',[ev('Bb1-E-03','C39与通信设备行，有效发明专利数列')],['313643/652396×100；不同专利的价值和权利范围未评估。','年度申请与有效存量分别列示，不能相加。'],section='structure')
finding('miit-boundary','工信部年度统计与运行快报的范围不能互换','2024年工信部年度主要经济指标表列营收211433.7亿元、平均用工1163.9万人，并列出电气机械、仪器仪表、电子和电工机械专用设备等行业。该表比C39口径更宽，不能将其总额或行业分类直接塞入C39的扇区，也不能把与C39年鉴数的差额全部称为修订。','fact',[ev('miit-economics-image','总计、按行业分类12行、表尾统计制度说明')],['本轮只将12行业表放在全国补充比较；原图省份行已浏览，尚未逐格转录复核。','未将2024快报同口径说明外推到这个不同年度统计表。'],period='2024年全年')
old=json.loads((B.parent.parent/'official/panel-data.json').read_text())
amendments=[]
for key,detail,nextstep,es in [('ia-official-coverage-miit-yearbook','已实读2024年度主要经济指标原图的完整表头、总计和12个行业行，转录企业数、收入、利润、平均用工和资产五指标。发现统计范围含C39以外类别。仅阅读本表，不代表全套年度数据读完。','继续定位产品产量、分省市产量等其他章节；本表省份行未逐格转录复核。',[ev('miit-economics-image','主要经济指标完整原图')]),('ia-official-coverage-census-other-tables','已补读1-D-3新产品、1-E-3自主知识产权C39及全部九中类；2-12、2-13控股分类C39行；1-A-7国有控股工业C39关键列和科技指标解释。仍未完整读取所有普查附表。','继续其他登记注册分类、科技经费外部支出及地区细项；既有未衔接差额保留。',[ev('Bb1-D-03','C39及9中类'),ev('Bb1-E-03','C39及9中类'),ev('A2-12','C39'),ev('A2-13','C39')])]:
 prior=next((x for x in old['coverage'] if x['id']==key),None)
 if prior:
  replacement={**prior,'status':'obtained','detail':detail,'nextStep':nextstep,'evidence':es}
  amendments.append(dict(collection='coverage',id=key,reason='从入口定位推进为限定范围内表实读，保留其余未读边界。',replacement=replacement))
 else:raise ValueError(key)
readlog=[]
for k in titles:
 scope={'Bb1-D-03':'表头、C39及全部9中类，4指标；裁图逐格目核','Bb1-E-03':'表头、C39及全部9中类，5指标；裁图逐格目核','A2-12':'表头及C39行，合计与5个其中项','A2-13':'表头及C39行，合计与5个其中项','Ba1-A-07':'表头及C39行，企业数、资产、收入、利润、平均用工5列；其余列未转录核验','miit-economics-image':'完整表头、总计与12行业行：企业数、收入、利润、平均用工、资产5指标；表尾统计制度说明','census-science-definitions':'唯一1页（书页465）全部指标解释'}[k]
 readlog.append(dict(id='ia-read-national-'+k.lower(),sourceId='ia-deep-national-'+k.lower(),period='2024' if k.startswith('miit') else '2023',status='read',readScope=scope,unreadScope='其它行业、地区行和其余关联表未逐格读取' if k!='census-science-definitions' else '本页已读完；不代表其他解释篇已读',method='原图目核及明确单位/行列定位；OCR仅辅助定位' if k!='census-science-definitions' else '原PDF文字页完整读取',archive=fm[k]['path'],sha256=fm[k]['sha256'],checkedAt=D))
save('sources.json',sources);save('observations.json',observations);save('reconciliation.json',reconciliation);save('read-log.json',readlog);save('panel-data.json',dict(sources=sources,comparisons=comparisons,findings=findings,coverage=[]));save('amendments.json',amendments)
print('observations',len(observations),'comparisons',len(comparisons),'findings',len(findings));print(json.dumps(reconciliation,ensure_ascii=False,indent=2))
