# -*- coding: utf-8 -*-
"""Rebuild Chinese employment observations and explicit calibration scenarios from checked official cells.
No web calls. Original cell transcriptions below are preserved; models do not overwrite facts.
"""
from pathlib import Path
import json,hashlib,math
ROOT=Path(__file__).resolve().parents[3]; HERE=Path(__file__).resolve().parent

def out(name,obj): (HERE/name).write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n')
# Table 4-2, China Statistical Yearbook 2025; nationwide persons, end of year, 10,000 persons.
controls={2021:[74652,17072,21712,35868],2022:[73351,17663,21105,34583],2023:[74041,16882,21520,35639],2024:[73439,16298,21275,35866],2025:[72504,16130,20576,35798]}
# Fifth census bulletin 2, table 2-3, 10,000 persons; all legal entities and individual businesses.
section_values={
'A':[133.5,207.7], 'B':[469.8,6.8], 'C':[10481.5,1836.1], 'D':[478.2,29.6], 'E':[5117.2,961.8],
'F':[5325.8,8224.1], 'G':[1582.7,1272.7], 'H':[894.2,2541.0], 'I':[1517.9,154.2], 'J':[1248.4,None],
'K':[1443.5,76.4], 'L':[3906.6,501.6], 'M':[1700.3,111.7], 'N':[485.5,52.0], 'O':[673.6,1497.4],
'P':[2677.0,77.1], 'Q':[1461.9,132.8], 'R':[519.5,273.4], 'S':[2781.1,None]}
# A1-08, national first employment column. ALL major rows visually rechecked against four full-resolution crops.
# 01-04 and 53 are blank; blank is NOT an observed zero. Department exclusions apply (editor note 2).
major_values={
'01':None,'02':None,'03':None,'04':None,'05':1335252,
'06':2772385,'07':511880,'08':313245,'09':293673,'10':493184,'11':299281,'12':13614,
'13':4062211,'14':2538401,'15':1594467,'16':180567,'17':3844129,'18':4491581,'19':2505906,
'20':2205224,'21':1985705,'22':1682019,'23':1544587,'24':2870658,'25':855939,'26':4367254,'27':2366022,
'28':495069,'29':4926350,'30':7118765,'31':2011367,'32':1784459,'33':7589602,'34':7907882,'35':6131870,
'36':5549941,'37':1490547,'38':8103295,'39':10308701,'40':1504734,'41':547924,'42':422703,'43':853566,
'44':3374448,'45':454911,'46':952128,'47':25870412,'48':11264451,'49':3849722,'50':10187730,
'51':29931601,'52':23324403,'53':None,'54':8467731,'55':477993,'56':655711,'57':42119,'58':1348826,'59':1434011,'60':1579676,
'61':2798224,'62':6143596,'63':1630091,'64':2435527,'65':11076074,'66':133724,'67':57075,'68':4564,'69':90047,
'70':14433863,'71':2957173,'72':36092868,'73':2165908,'74':9804913,'75':4861654,
'76':323725,'77':495555,'78':3907109,'79':125935,'80':2975700,'81':1641252,'82':2119105,'83':26769212,
'84':13462549,'85':1154294,'86':314554,'87':798007,'88':1369038,'89':634083,'90':2078848,
'91':947827,'92':20773706,'93':121504,'94':138042,'95':1418060,'96':4388415}
section_legal_table={'A':1335252,'B':4697262,'C':103841445,'D':4781487,'E':51172315,'F':53256004,'G':14006067,'H':8941820,'I':15141692,'J':285410,'K':14433863,'L':39050041,'M':16832475,'N':4852324,'O':6736057,'P':26769212,'Q':14616843,'R':5194530,'S':27787554}
major_ranges={'A':(1,5),'B':(6,12),'C':(13,43),'D':(44,46),'E':(47,50),'F':(51,52),'G':(53,60),'H':(61,62),'I':(63,65),'J':(66,69),'K':(70,70),'L':(71,72),'M':(73,75),'N':(76,79),'O':(80,82),'P':(83,83),'Q':(84,85),'R':(86,90),'S':(91,96)}
# A1-03, 70 sector medium rows: all legal entities in census table scope; visually checked 12,000 px crop.
property_values={'701':2712633,'702':8555975,'703':1872651,'704':1208581,'709':84023}
# Bulletin 4 table 4-4 and 4-13. Covers responsible departments but enterprise legal only, used as proportions (not all-legal facts).
department_enterprise={'53':1817000,'66':4155000,'67':732000,'68':7298000,'69':171000}
# Official classification labels, received from parallel product module; save local immutable labels for offline reproduction.
labels_file=HERE/'classification-labels.json'
if not labels_file.exists():
 src=json.loads((ROOT/'research/employment/cn-products/extracted/gb2017-annotations.json').read_text())
 labels={str(r['cells'][0]):r['cells'][3] for r in src if len(r['cells'])>3 and r['cells'][0] and r['cells'][3]}
 out('classification-labels.json',labels)
labels=json.loads(labels_file.read_text())
section_of=lambda c:next(s for s,(lo,hi) in major_ranges.items() if lo<=int(c[:2])<=hi)
# Files actually fetched/read in this research. Dates refer to content, not path or HTTP modification date.
source_defs=[
('cn-emp-yb2025-4-2','中国统计年鉴2025：4-2 按三次产业分就业人员数（年底数）','https://www.stats.gov.cn/sj/ndsj/2025/html/C04-02.jpg','yearbook2025-employment-history.jpg',None,'2021—2024四行与表头，旧年2020亦核作交叉参考。'),
('cn-emp-yb2025-explanation','中国统计年鉴2025：就业和工资简要说明','https://www.stats.gov.cn/sj/ndsj/2025/html/sm04.htm','yearbook2025-employment-explanation.html',None,'全部四节；全国城乡住户劳动力调查与单位报表范围区别；1991—2019按七人普修订。'),
('cn-emp-census2','第五次全国经济普查公报（第二号）：单位基本情况','https://www.stats.gov.cn/xxgk/sjfb/zxfb2020/202412/t20241226_1957897.html','census-bulletin2.html','2024-12-26','二、从业人员全部文字与表2-3全19门类；注释三产业划分、法人及产业活动单位。'),
('cn-emp-census-1-8','中国经济普查年鉴2023：1-8 按行业（大类）、地区分组的法人单位从业人员数','https://www.stats.gov.cn/sj/pcsj/jjpc/5jp/zk/html/A1-08.jpg','census-all-legal-major-regions.jpg',None,'首个全国从业人数列：合计、19门类、96大类行（含5空白）；各地区列未通读。'),
('cn-emp-census-1-3','中国经济普查年鉴2023：1-3 按行业（中类）分组的法人单位数及从业人员数','https://www.stats.gov.cn/sj/pcsj/jjpc/5jp/zk/html/A1-03.jpg','census-all-legal-medium.jpg',None,'表头、A/05、B11、C43、I/J/K、701—709与全表末行；其他中类OCR仅定位，未全部取数。'),
('cn-emp-census-1-19','中国经济普查年鉴2023：1-19 按行业门类分组的个体经营户数和从业人员数','https://www.stats.gov.cn/sj/pcsj/jjpc/5jp/zk/html/A1-19.jpg','census-individual-sections.jpg',None,'全表，从业人员19门类及空白说明；J/S空白不记官方零。'),
('cn-emp-census-editor','中国经济普查年鉴2023：编者说明','https://www.stats.gov.cn/sj/pcsj/jjpc/5jp/zk/html/note.jpg','census-editor.jpg',None,'全部7条；编者落款2025年3月，确切出版日未给出；第2条部门及无分组单位排除最关键。'),
('cn-emp-census4','第五次全国经济普查公报（第四号）：第三产业基本情况之一','https://www.stats.gov.cn/xxgk/sjfb/zxfb2020/202412/t20241226_1957894.html','census-bulletin4.html','2024-12-26','交通表4-4铁路181.7万人；金融表4-13四大类及其部门覆盖脚注；其他表有旧研究，不声称此次通读。'),
('cn-emp-all-industry-limit','国家统计局人口和就业统计司：每个行业的就业总数该采用哪几类数据','https://www.stats.gov.cn/hd/lyzx/zxgk/202502/t20250211_1958681.html','industry-employment-official-limits.html',None,'咨询及三点完整答复；答复时间2024-12-20；网页未明示独立公开日，URL日期不能替代；meta PubDate为咨询提交日2024-12-10。'),
('cn-emp-not-additive','国家统计局人口和就业统计司：单位、私营与个体就业不可直接加总','https://www.stats.gov.cn/hd/lyzx/zxgk/202312/t20231206_1945236.html','employment-not-additive.html',None,'咨询及两点完整答复；答复2023-10-13；未明示独立公开日期，URL目录日期不能替代。'),
('cn-emp-2025-bulletin','中华人民共和国2025年国民经济和社会发展统计公报','https://www.stats.gov.cn/sj/zxfb/202602/t20260228_1962662.html','bulletin2025.html','2026-02-28','一、综合：年末全国就业72504万人、城镇47535万人；注1—4初步统计/现价/官方全员劳动生产率不变价。'),
('cn-emp-yearbook-index','国家统计局：中国统计年鉴入口','https://www.stats.gov.cn/sj/ndsj/','yearbook-index.html',None,'版本目录，2026候选入口另请求404，不把不存在版本作为事实数据源。'),
('cn-emp-yb2025-index','中国统计年鉴2025目录','https://www.stats.gov.cn/sj/ndsj/2025/left.htm','yearbook2025-left.html',None,'就业和工资全部表名，工业/贸易等专章列名，港澳章节行业就业不能替换内地。'),
('cn-emp-census-index','中国经济普查年鉴2023目录','https://www.stats.gov.cn/sj/pcsj/jjpc/5jp/zk/left.htm','census-left.html',None,'综合卷第一二篇全表名；个体从业只见门类表1-19，未发现个体大中类从业表。')]
sources=[]
for sid,title,url,fn,date,read in source_defs:
 p=HERE/'originals'/fn
 sources.append(dict(id=sid,title=title,publisher='国家统计局',country='cn',kind='official-statistics',url=url,published=date,retrieved='2026-09-14',archive=str(p.relative_to(ROOT)),sha256=hashlib.sha256(p.read_bytes()).hexdigest(),readStatus=read))
p=ROOT/'research/employment/nbs-trisector-2025-dom.txt'
sources.append(dict(id='cn-emp-national-annual-2025',title='国家数据：年度→就业人员和工资→按三次产业分就业人员数',publisher='国家统计局',country='cn',kind='official-statistics',url='https://data.stats.gov.cn/dg/website/page.html#/pc/national/yearData',published=None,retrieved='2026-09-14',archive=str(p.relative_to(ROOT)),sha256=hashlib.sha256(p.read_bytes()).hexdigest(),readStatus='主代理浏览器读取完整4行（总量/第一/第二/第三产业）及2021—2025各列；动态表无发布日期。'))
out('sources.json',sources)
obs=[]
def fact(id,code,name,year,value,unit,scope,source,locator,**extra):
 r=dict(id=id,country='cn',classification='GB/T 4754—2017',code=code,name=name,year=year,measure='employment',value=value,unit=unit,periodBasis='year-end',denominatorKind='persons',evidenceKind='fact',coverage=scope,coverageKey=extra.pop('coverageKey',scope),releaseDate=next((s['published'] for s in sources if s['id']==source),None),revision='按2026-09-14取得的官方版本；普查与住户调查保留独立序列',evidence=[dict(sourceId=source,locator=locator)],**extra);obs.append(r);return r
for year,vals in controls.items():
 for code,name,v in zip(['total','primary','secondary','tertiary'],['全国全部就业','第一产业就业','第二产业就业','第三产业就业'],vals): fact(f'cn-emp-all-{code}-{year}',code,name,year,v,'万人','中国内地城乡全社会就业，住户劳动力调查推算','cn-emp-national-annual-2025',f'年度就业表：{year}年列，{name}行（万人）',coverageKey=f'cn-household-employment-{code}')
fact('cn-emp-bulletin-total-2025','total','全国全部就业',2025,72504,'万人','中国内地城乡全社会就业，年末总量','cn-emp-2025-bulletin','一、综合：年末全国就业人员72504万人；注1初步统计',coverageKey='cn-household-employment-total')
for s,vals in section_values.items():
 for component,v in zip(['legal','individual'],vals):fact(f'cn-emp-census-{component}-{s}-2023',s,labels[s],2023,v,'万人',f'五经普2023年末'+('全部法人单位（包含部门负责普查单位）' if component=='legal' else '个体经营户')+('；A仅05专业辅助活动' if s=='A' else ''),'cn-emp-census2',f'表2-3，{labels[s]}行，'+('法人单位从业人员' if component=='legal' else '个体经营户从业人员')+'列',component=component,coverageKey=f'cn-census-{component}-{s}',nullReason='原表为“-”/空白；模型视为无列示个体权重，非已观察到0' if v is None else None)
for c,v in major_values.items():fact('cn-emp-legal-major-'+c+'-2023',c,labels[c],2023,v,'人','五经普综合卷全部法人；排除无分组单位、部门负责普查的金融/铁路单位；A仅05；详编者说明第2条','cn-emp-census-1-8',f'表1-8：代码{c} {labels[c]}行，全国从业人员数（人）首数列',component='legal',coverageKey=f'cn-census-general-volume-legal-{c}',nullReason='综合卷未列该范围的从业人数，不能当作零' if v is None else None)
for c,v in property_values.items():fact('cn-emp-legal-medium-'+c+'-2023',c,labels[c],2023,v,'人','五经普综合卷法人单位；详编者说明第2条','cn-emp-census-1-3',f'表1-3：代码{c} {labels[c]}行，从业人员数列',component='legal',coverageKey=f'cn-census-general-volume-legal-{c}')
for c,v in department_enterprise.items():fact('cn-emp-enterprise-'+c+'-2023',c,labels[c],2023,v/10000,'万人','五经普企业法人，包含铁路/金融部门负责普查单位；非全部法人','cn-emp-census4',f'表'+('4-4' if c=='53' else '4-13')+f'：{labels[c]}行，从业人员列及脚注',component='enterprise-legal',coverageKey=f'cn-census-enterprise-{c}')
out('observations.json',obs)
# Economic-census employment weights. Distribute ALL-LEGAL bulletin section totals proportionally to the more detailed table.
# Finance uses enterprise departmental coverage proportions, railway 53 filled from departmental enterprise count before G scaling.
weights=[]
for s,(lo,hi) in major_ranges.items():
 codes=[f'{c:02}' for c in range(lo,hi+1) if c>4]
 input_values={c:department_enterprise[c] if s=='J' or c=='53' else major_values[c] for c in codes}
 denom=sum(v or 0 for v in input_values.values())
 for c in codes:
  share=input_values[c]/denom
  legal=section_values[s][0]*10000*share
  individual=(section_values[s][1] or 0)*10000*share
  sector='tertiary' if s not in 'BCDE' or c in ['11','43'] else 'secondary'
  input_id='cn-emp-enterprise-'+c+'-2023' if s=='J' or c=='53' else 'cn-emp-legal-major-'+c+'-2023'
  weights.append(dict(code=c,name=labels[c],section=s,controlSector=sector,legalInputId=input_id,withinSectionShare=share,rawLegalPersons=input_values[c],legalPersons=legal,individualPersons=individual,censusWeightPersons=legal+individual,estimateKind='model-estimate',assumptions=['公报门类全部法人总量，按细类可见从业结构比例校准。','门类个体经营户就业，按本模型同门类法人份额分到大类；并非官方个体细类就业。']+(['金融采用覆盖部门的企业法人四大类分布，假定非企业法人分布相同。'] if s=='J' else [])+(['铁路采用公报企业法人数补综合卷空列后，与G同门类再校准。'] if s=='G' else []),evidence=[dict(sourceId='cn-emp-census2',locator=f'表2-3，{labels[s]}行，法人/个体列'),dict(sourceId='cn-emp-census4' if s=='J' or c=='53' else 'cn-emp-census-1-8',locator=f'代码{c} 从业人员列'),dict(sourceId='cn-emp-census-editor',locator='第2条：综合卷汇总的部门及无分组排除')]))
control_sums={s:sum(w['censusWeightPersons'] for w in weights if w['controlSector']==s) for s in ['secondary','tertiary']}
# 2025 exact controls verified in live national table by root agent, archived with DOM hash.
calibrated=[]
for year,vals in controls.items():
 for w in weights:
  control=vals[2 if w['controlSector']=='secondary' else 3]*10000
  calibrated.append(dict(**{k:v for k,v in w.items() if k!='assumptions'},year=year,employmentPersons=w['censusWeightPersons']/control_sums[w['controlSector']]*control,controlPersons=control,controlIsOfficial=True,controlId=f'cn-emp-all-{w["controlSector"]}-{year}',formula='(section legal employment × within-section share + section individual employment × same share) / same-sector census weights sum × year sector control',assumptions=w['assumptions']+['按2023普查行业权重比例对齐全社会三产业就业；差异按比例分摊只是情景，并不解释漏计、兼职或调查差异。']+(['产业内2023份额固定，回推/前推本年；不代表实际行业就业变化。'] if year!=2023 else [])))
out('calibration.json',dict(version='cn-employment-model-2026-09-14-1',controlUnit='万人',controls=[dict(year=y,total=v[0],primary=v[1],secondary=v[2],tertiary=v[3],sectorControlsOfficial=True) for y,v in controls.items()],weights2023=weights,controlWeightSumsPersons=control_sums,estimates=calibrated,warning='这些是明确假设的分配情景，不是官方行业就业估计，区间不是置信区间。'))
# Source table reconciliation checks; numbers are exact listed values, not corrected to make balances.
checks={s:dict(tableParent=section_legal_table[s],sumMajors=sum(major_values[f'{n:02}'] or 0 for n in range(lo,hi+1)),residual=section_legal_table[s]-sum(major_values[f'{n:02}'] or 0 for n in range(lo,hi+1))) for s,(lo,hi) in major_ranges.items()}
assert all(v['residual']==0 for v in checks.values()),checks
assert sum(section_legal_table.values())==413731653
assert sum(property_values.values())==major_values['70']
assert all(abs(sum(v[1:])-v[0])<1e-8 for v in controls.values())
# Bulletin rounded cells need not add exactly to rounded total; retain and disclose residuals.
out('validation.json',dict(majorTable=checks,majorCount=len(major_values),propertySum=sum(property_values.values()),bulletinLegalSum10k=sum(v[0] for v in section_values.values()),bulletinLegalPublishedTotal10k=42898.4,bulletinIndividualSum10k=sum(v[1] or 0 for v in section_values.values()),bulletinIndividualPublishedTotal10k=17956.4,censusPublishedTotal10k=60854.8,householdSecondaryTertiary2023_10k=57159,difference10k=60854.8-57159,explanation='不同体系合计差额；不将全部差额归因某单一原因。'))
print('Wrote',len(obs),'official observations,',len(weights),'industry weights,',len(calibrated),'annual estimates')
# Independent household-survey allocation: chosen MAIN model after observed sensitivity invalidated generic individual-business allocation.
from population2020 import population_values,population_section_values
for sid,title,url,fn,read in [
('cn-emp-pop2020-b0404','中国人口普查年鉴2020：4-4 各地区分性别、行业大类的就业人口','https://www.stats.gov.cn/sj/pcsj/rkpc/7rp/zk/html/B0404.jpg','population2020-industry.jpg','全部全国行：总量、20门类、97大类；地区及男/女行未通读。全国行未扩大样本65631786人，含国际组织562人。'),
('cn-emp-pop2020-note','中国人口普查年鉴2020：编辑说明','https://www.stats.gov.cn/sj/pcsj/rkpc/7rp/zk/html/note.htm','population2020-note.html','全部六节，标准时点2020-11-01、按户10%长表、直接汇总未纠偏、不得机械乘10。'),
('cn-emp-pop2020-index','中国人口普查年鉴2020：长表就业目录','https://www.stats.gov.cn/sj/pcsj/rkpc/7rp/zk/left.htm','population2020-left.html','长表第四卷就业全表名：大类就业4-4/4-5，未列个体就业身份×行业交叉表。')]:
 p=HERE/'originals'/fn
 sources.append(dict(id=sid,title=title,publisher='国家统计局',country='cn',kind='official-statistics',url=url,published=None,retrieved='2026-09-14',archive=str(p.relative_to(ROOT)),sha256=hashlib.sha256(p.read_bytes()).hexdigest(),readStatus=read))
for sid,title,url,fn,date,read in [
('cn-emp-sample2025-bulletin','2025年全国1%人口抽样调查主要数据公报','https://www.stats.gov.cn/xxgk/sjfb/zxfb2020/202605/t20260522_1963788.html','sample2025-bulletin.html','2026-05-22','完整六节及七条注释：人口、家庭户、年龄、受教育程度、城乡、流动人口；没有行业就业表。'),
('cn-emp-sample2025-qa','国家统计局有关负责人就2025年全国1%人口抽样调查答记者问','https://www.stats.gov.cn/zt_18555/zdtjgz/cydc/2025cydc/dcyw/202506/t20250618_1960203.html','sample2025-qa.html','2024-09-14','全文6问：调查含行业/职业，详细分类年鉴发布；网页实际显示2024-09-14，不用URL的2025-06日期。'),
('cn-emp-sample2025-index','国家统计局2025年全国1%人口抽样调查专题','https://www.stats.gov.cn/zt_18555/zdtjgz/cydc/2025cydc/','sample2025-index.html',None,'当前通知公告与资料入口；最新主要数据公报2026-05-22，未在可见目录找到行业就业详细汇总表。')]:
 p=HERE/'originals'/fn
 sources.append(dict(id=sid,title=title,publisher='国家统计局',country='cn',kind='official-statistics',url=url,published=date,retrieved='2026-09-14',archive=str(p.relative_to(ROOT)),sha256=hashlib.sha256(p.read_bytes()).hexdigest(),readStatus=read))
p=HERE/'originals/census-definitions.pdf'
sources.append(dict(id='cn-emp-census-definitions',title='中国经济普查年鉴2023综合卷：主要指标解释',publisher='国家统计局',country='cn',kind='official-statistics',url='https://www.stats.gov.cn/sj/pcsj/jjpc/5jp/zk/html/zb01.pdf',published=None,retrieved='2026-09-14',archive=str(p.relative_to(ROOT)),sha256=hashlib.sha256(p.read_bytes()).hexdigest(),readStatus='PDF第1页（印刷451页），法人、企业法人、多产业单位、从业人数定义：年度最后一日本单位在岗、派遣和其他从业；不含离岗保留关系领生活费、在校实习生。其余页仅关键词定位未通读。'))
for s in sources:s['limitations']=[s['readStatus']]+(['原件未给确切发布日期，页面路径/读日不替代发布日期。'] if s['published'] is None else [])
out('sources.json',sources)
for c,v in population_values.items():
 obs.append(dict(id='cn-emp-pop2020-'+c,country='cn',classification='GB/T 4754—2017',code=c,name=labels.get(c,'国际组织'),year=2020,measure='employment',value=v,unit='人',periodBasis='other',denominatorKind='persons',evidenceKind='fact',coverage='2020七人普10%住户长表直接汇总全国样本就业人口；非推算全国总量',coverageKey='cn-population-census-long-form-2020-'+c,releaseDate=None,revision='2020人口普查年鉴原表；未扩大样本',evidence=[dict(sourceId='cn-emp-pop2020-b0404',locator=f'4-4，全国行，{labels.get(c,"国际组织")}列（单位：人）')],component='household-long-form'))
out('observations.json',obs)
pop_sector=lambda c:'primary' if int(c)<5 else 'tertiary' if c in ['05','11','43'] or int(c)>=51 else 'secondary'
pop_sums={s:sum(v for c,v in population_values.items() if c!='97' and pop_sector(c)==s) for s in ['primary','secondary','tertiary']}
pop_estimates=[]
for year,vals in controls.items():
 for c,v in population_values.items():
  if c=='97':continue
  sector=pop_sector(c);control=vals[['total','primary','secondary','tertiary'].index(sector)]*10000
  pop_estimates.append(dict(code=c,name=labels[c],section=section_of(c),controlSector=sector,year=year,employmentPersons=control*v/pop_sums[sector],controlPersons=control,controlId=f'cn-emp-all-{sector}-{year}',householdSamplePersons=v,controlSamplePersons=pop_sums[sector],structureYear=2020,controlIsOfficial=True,formula='当年官方三产业就业人数 × 本大类2020长表就业样本 / 该产业2020长表国内行业就业样本合计',estimateKind='model-estimate',assumptions=['假定2020年人口普查的产业内行业就业份额保持到目标年；不是目标年官方行业就业。','长表为10%住户样本的直接登记数；只用相对份额、不机械乘10。编辑说明指出不含漏登人口及200万现役军人，各指标登记/抽样误差未校正。','国际组织97的562名长表就业样本单列排除，国内第三产业分母重新求和；全国控制总量未单列驻华国际组织就业，分配范围是本图可识别国内行业。'],evidence=[dict(sourceId='cn-emp-pop2020-b0404',locator=f'4-4，全国行，代码{c} {labels[c]}列及该产业国内行业各列合计'),dict(sourceId='cn-emp-pop2020-note',locator='二、普查表式；四、数据汇总口径及推算说明'),dict(sourceId='cn-emp-national-annual-2025',locator=f'年度就业表{year}列，{sector}产业行')]))
out('population-calibration.json',dict(version='cn-household-employment-2026-09-14-1',mainModel=True,structureYear=2020,scope='全国国内行业；国际组织97另列未分配',excluded=[dict(code='97',name='国际组织',householdSamplePersons=562,reason='本图不单列国际组织行业；保留原样本数，不归零也不归入其他行业，分配分母采用其余国内行业。')],sampleTotal=65631786,domesticSampleTotal=65631224,controlSampleSums=pop_sums,controls=[dict(year=y,total=v[0],primary=v[1],secondary=v[2],tertiary=v[3],unit='万人') for y,v in controls.items()],estimates=pop_estimates))
oldcal=json.loads((HERE/'calibration.json').read_text());oldcal['mainModel']=False;oldcal['rejectedAsDefault']='个体门类按法人份额拆分对批发/零售、住宿/餐饮与铁路产生重大结构偏差；保留为敏感性对照，不能以默认模型或官方行业就业呈现。';out('calibration.json',oldcal)
comparison=[]
eclookup={(r['year'],r['code']):r for r in oldcal['estimates']}
for p in pop_estimates:
 alt=eclookup.get((p['year'],p['code']))
 if alt:comparison.append(dict(year=p['year'],code=p['code'],name=p['name'],mainHouseholdModel=p['employmentPersons'],alternativeEconomicCensusModel=alt['employmentPersons'],ratioEconomicToHousehold=alt['employmentPersons']/p['employmentPersons'],differencePersons=alt['employmentPersons']-p['employmentPersons'],note='两种结构分配情景差异，不是统计置信区间。'))
out('model-comparison.json',comparison)
# Contract adapter covers actual runtime nodes (including missing-value names and transient remainders).
inventory=json.loads((ROOT/'research/employment/node-inventory.json').read_text())['records']
cn=[r for r in inventory if r['country']=='cn' and r['basis']=='annual-industry']
annual={y:{r['nodeId']:r for r in cn if r['year']==y} for y in controls}
poplookup={(r['year'],r['code']):r for r in pop_estimates}
section_node={'cn-mining':'B','cn-manufacturing':'C','cn-utilities':'D','cn-wholesale-retail':'F','cn-finance':'J','cn-construction':'E','cn-real-estate':'K','cn-information':'I','cn-business-services':'L','cn-transport':'G','cn-accommodation-food':'H'}
def codes_for(node):
 if node=='cn-industry':return [c for c in population_values if c!='97' and section_of(c) in 'BCD']
 if node=='cn-orbit-other':return [c for c in population_values if c!='97' and section_of(c) in 'MNOPQRS']
 if node=='cn-agriculture':return ['01','02','03','04','05']
 if node=='cn-prod-a01-a04':return ['01','02','03','04']
 if node=='cn-prod-a05':return ['05']
 if node in section_node:return [c for c in population_values if c!='97' and section_of(c)==section_node[node]]
 if node.startswith('cn-gbt2017-'):return [node.rsplit('-',1)[-1]]
 if node.startswith('cn-prod-') and node.rsplit('-',1)[-1].isdigit():return [node.rsplit('-',1)[-1]]
 return []
def refs_unique(refs):return list({(e['sourceId'],e['locator']):e for e in refs}.values())
def main_num(code,year):
 if len(code)==3:return poplookup[(year,'70')]['employmentPersons']*property_values[code]/sum(property_values.values())
 return poplookup[(year,code)]['employmentPersons']
def alt_num(code,year):
 if len(code)==3:return eclookup[(year,'70')]['employmentPersons']*property_values[code]/sum(property_values.values())
 if int(code)<5:return main_num(code,year)
 return eclookup[(year,code)]['employmentPersons']
def code_evidence(code,year):
 return poplookup[(year,code[:2])]['evidence']+([dict(sourceId='cn-emp-census-1-3',locator=f'表1-3，房地产业701—709就业列；按2023综合卷法人比例拆分2020住户70大类对应估算人数。')] if len(code)==3 else [])
def numeric(node,year,alt=False):
 if node=='cn-orbit-economy':return controls[year][0]*10000
 if node.endswith('-unallocated'):
  parent=node[:-12];r=annual[year][parent]
  positive=[annual[year][id] for id in r['children'] if id in annual[year] and annual[year][id]['valueAddedBase'] is not None and annual[year][id]['valueAddedBase']>0]
  return numeric(parent,year,alt)-sum(numeric(x['nodeId'],year,alt) for x in positive)
 codes=codes_for(node)
 if not codes:raise ValueError('Unmapped '+node)
 return sum((alt_num if alt else main_num)(c,year) for c in codes)
records=[]
for n in cn:
 node=n['nodeId'];year=n['year'];value=numeric(node,year);alt=numeric(node,year,True);codes=codes_for(node)
 if value<-1e-7:raise ValueError('Negative remainder '+node)
 official=node in ['cn-orbit-economy','cn-prod-a01-a04']
 ev=[dict(sourceId='cn-emp-national-annual-2025',locator=f'年度就业表，{year}年列，'+('全部就业' if node=='cn-orbit-economy' else '第一产业')+'行')]
 if not official:
  if node.endswith('-unallocated'):
   ev=[dict(sourceId='cn-emp-pop2020-b0404',locator='全国行，各国内行业分布；按当前父行业减已有金额子行业就业模型求差'),dict(sourceId='cn-emp-national-annual-2025',locator=f'{year}年三产业官方就业控制总量')]
  else:ev=refs_unique([e for c in codes for e in code_evidence(c,year)])
 calc=None
 assumptions=['固定2020住户长表产业内行业份额，乘目标年官方三产业年末人数；目标年行业人数属于模型估算。','年末人数作全年增加值分母，不等于全年平均或工时生产率。','未将城镇单位/企业法人/规上人数直接配全行业GDP。']
 if any(len(c)==3 for c in codes):assumptions.append('房地产70大类向701—709细分再按2023普查综合卷法人份额分配；个体与自有住房无直接对应岗位，细类强假设保留。')
 inp=lambda id,label,v,e:dict(id=id,label=label,value=v,unit='人',evidence=e)
 if not official:
  if node.endswith('-unallocated'):
   parent=node[:-12];r=annual[year][parent]
   ids=[id for id in r['children'] if id in annual[year] and annual[year][id]['valueAddedBase'] is not None and annual[year][id]['valueAddedBase']>0]
   inputs=[inp(parent,annual[year][parent]['name'],numeric(parent,year),ev)]+[inp(i,annual[year][i]['name'],numeric(i,year),ev) for i in ids]
   if len(inputs)==1:operation='identity'
   else:operation='difference'
   expression='父行业估算就业人数 - 已有增加值子行业估算就业人数；同一模型求差'
  elif len(codes)==1 and len(codes[0])==2:
   p=poplookup[(year,codes[0])];operation='share';inputs=[inp(p['controlId'],f'{year}年{p["controlSector"]}官方就业控制量',p['controlPersons'],[ev[-1]]),inp('cn-pop2020-'+codes[0],labels[codes[0]]+'2020长表样本就业',p['householdSamplePersons'],[ev[0]]),inp('cn-pop2020-'+p['controlSector'],p['controlSector']+'长表国内行业样本合计',p['controlSamplePersons'],[dict(sourceId='cn-emp-pop2020-b0404',locator='全国行，同产业国内大类就业列合计；排除97国际组织')])];expression='当年产业就业控制量 × 2020本行业长表样本 / 2020本产业国内长表样本合计'
  elif len(codes)==1 and len(codes[0])==3:
   c=codes[0];operation='share';inputs=[inp('cn-main-70-'+str(year),'本年房地产业就业模型',main_num('70',year),ev),inp('cn-census-'+c,labels[c]+'2023法人就业',property_values[c],[ev[-1]]),inp('cn-census-70','房地产业2023综合卷法人就业合计',sum(property_values.values()),[ev[-1]])];expression='房地产业主模型就业 × 子类法人就业 / 同表房地产业法人合计'
  else:operation='sum';inputs=[inp('cn-main-'+c+'-'+str(year),labels[c],main_num(c,year),code_evidence(c,year)) for c in codes];expression='所列互斥大类的同年同模型就业人数求和'
  calc=dict(methodId='cn-household2020-fixed-share-v1',label='2020住户行业结构 × 当年官方就业总量',expression=expression,operation=operation,inputs=inputs,assumptions=assumptions)
 measure=dict(value=max(0,value),year=year,denominatorKind='persons',periodBasis='year-end',status='official' if official else 'estimated',definition='全国城乡全部就业人员年末规模'+('（官方统计）' if official else '的行业分配估算；目标年总量官方，行业份额固定2020'),coverage='中国内地城乡全社会就业'+('；第一产业A01—A04，不含A05辅助活动' if node=='cn-prod-a01-a04' else '；97国际组织长表样本单列排除，国内行业分布归一化'),releaseDate=None,revision='2026-09-14读取最新国家数据；2020结构固定模型v1',evidence=ev)
 if calc:measure['calculation']=calc
 if not official and abs(alt-value)>1e-7:measure['sensitivity']=dict(lower=min(value,alt),upper=max(value,alt),label='住户2020结构与经济普查2023结构情景跨度',assumptions=['替代情景按2023经济普查门类法人+个体分布，个体细类按法人份额分摊；该假设对铁路、批零和住餐明显不稳健，未作为默认。','两种不同统计框架与基年结构的差异，不是统计置信区间或可能真实值上下界。'])
 references=[]
 # Actual census observations displayed separately without relabeling estimated all-scope counts as direct facts.
 if codes and all(len(c)==2 for c in codes):
  sections=sorted({section_of(c) for c in codes if int(c)>4})
  complete=all(set(c for c in codes if int(c)>4 and section_of(c)==s)==set(f'{i:02}' for i in range(*[major_ranges[s][0],major_ranges[s][1]+1]) if i>4) for s in sections)
  if complete and sections:
   for component,index in [('legal',0),('individual',1)]:
    vals=[section_values[s][index] for s in sections]
    if any(v is None for v in vals):continue
    re=[dict(sourceId='cn-emp-census2',locator=f'表2-3，{labels[s]}行，'+('法人单位' if index==0 else '个体经营户')+'从业人员列') for s in sections]
    rm=dict(value=sum(vals)*10000,year=2023,denominatorKind='persons',periodBasis='year-end',status='official' if len(vals)==1 else 'calculated',definition='2023五经普'+('全部法人单位' if index==0 else '个体经营户')+'从业人员；并非全社会就业',coverage='公报2-3相应门类，法人含部门负责普查单位；A仅专业辅助活动',releaseDate='2024-12-26',revision='2023第五次经济普查官方公报原值',evidence=re)
    if len(vals)>1:rm['calculation']=dict(methodId='cn-ec2023-direct-sum',label='同一公报门类相加',expression='互斥门类人数相加',operation='sum',inputs=[inp('cn-census-'+s+'-'+component,labels[s],v*10000,[e]) for s,v,e in zip(sections,vals,re)],assumptions=[])
    references.append(dict(label=('2023农林牧渔辅助活动' if node=='cn-agriculture' else '2023普查')+('法人' if index==0 else '个体')+'从业参考',measure=rm))
  elif len(codes)==1:
   c=codes[0];o=next((o for o in obs if o['id']=='cn-emp-legal-major-'+c+'-2023' and o['value'] is not None),None)
   if o:references.append(dict(label='2023综合卷法人从业（有限覆盖）',measure=dict(value=o['value'],year=2023,denominatorKind='persons',periodBasis='year-end',status='official',definition='表1-8可见法人从业人员，未扩样、未分配个体',coverage=o['coverage'],releaseDate=None,revision=o['revision'],evidence=o['evidence'])))
 if not official:
  references.append(dict(label='经济普查结构替代情景（不作为默认）',measure=dict(value=max(0,alt),year=year,denominatorKind='persons',periodBasis='year-end',status='estimated',definition='2023法人/个体结构校准到本年三产业人数；个体大类比例可能严重偏离',coverage='与主模型相同本年全社会控制总量；结构来自2023单位普查',releaseDate=None,revision='保留的模型敏感性情景',evidence=[dict(sourceId='cn-emp-census2',locator='表2-3法人+个体从业'),dict(sourceId='cn-emp-census-1-8',locator='全国大类从业列，部门缺项以公报4补足'),dict(sourceId='cn-emp-national-annual-2025',locator=f'{year}年三产业就业')],calculation=dict(methodId='cn-ec2023-alternative-node',label='2023经济普查结构替代情景',expression='引用calibration.json及model-comparison.json对应节点聚合；输入保留为人数',operation='identity',inputs=[inp('cn-ec-alternative-'+node+'-'+str(year),'替代情景同节点人数（完整多层算式见研究数据）',max(0,alt),[dict(sourceId='cn-emp-census2',locator='表2-3及大类分配，见研究数据calibration.json')])],assumptions=['法人和个体大类分布相同；该假设被住户数据对照指出明显不稳健，仅作模型差异演示。','跨年保持2023产业内份额，按官方目标年三产业人数校准。']))))
 realestate=node=='cn-real-estate' or node=='cn-real-estate-unallocated'
 pairing=dict(status='matched' if official else 'proxy',explanation=('全年现价增加值除以官方全国年末就业人数；名义值，非工时生产率。' if official else '现价行业增加值除以同年全社会就业的结构分配估算；2020行业结构固定、年末分母，非官方行业劳动生产率。')+(' 房地产增加值包含居民自有住房虚拟服务，部分产出没有对应直接岗位，暂不进行人均排序。' if realestate else ''),comparisonGroup='cn-all-employed-calibrated' if not realestate else None)
 if realestate:pairing['status']='incompatible'
 records.append(dict(id=f'cn-employment-{node}-{year}',country='cn',basis='annual-industry',nodeId=node,nodeName=n['name'],year=year,valueAddedAnchor=dict(baseValue=n['valueAddedBase'],currency=n['currency'],coverage=n['coverage']),employment=measure,pairing=pairing,references=references,notes=['目标年就业控制量：'+str(year)+'；固定行业结构：2020人口普查。']+(['行业增加值尚缺；就业可看，人均增加值留空。'] if n['valueAddedBase'] is None else [])+(['动态未分列规模按父模型减已有金额子类同模型求差；不能与父子重复相加。'] if node.endswith('-unallocated') else []),gap='' if n['valueAddedBase'] is not None else '现价增加值缺失，不计算人均值。'))
for r in records:
 for m in [r['employment']]+[x['measure'] for x in r['references']]:
  if m['status']=='estimated':m['modelBasis']='2023年普查结构' if m['calculation']['methodId'].startswith('cn-ec') else '2020年住户行业结构'+(' · 2023年房地产细分' if any(len(c)==3 for c in codes_for(r['nodeId'])) else '')
out('dataset.json',dict(version='cn-employment-2026-09-14-1',checkedAt='2026-09-14',sources=sources,records=records))
# Each actual runtime sector is checked against its original definition, year and money anchor.
out('coverage.json',[dict(country='cn',basis='annual-industry',nodeId=r['nodeId'],year=r['year'],status=r['employment']['status'],officialInputYears=[2020,r['year']],employmentPersons=r['employment']['value'],pairingStatus=r['pairing']['status'],valueAddedAvailable=r['valueAddedAnchor']['baseValue'] is not None,searchResult='已读2025国家数据全社会三产业、2023五经普门类与大类、2020七人普全国大类就业长表；直接行业全社会年度数未发布，采用可复算住户份额模型。',nextStep='取得2025年1%人口抽样调查行业长表后更新结构；原年份模型保留版本及敏感性。') for r in records])
out('read-log.json',dict(checkedAt='2026-09-14',entries=[dict(sourceId=s['id'],archive=s.get('archive'),readScope=s['readStatus'],sha256=s.get('sha256')) for s in sources],notRead=['2020各地区/男女性别行业列未通读','2023全法人表1-3中类未逐行全部转录；原件已归档，只有本模型用到701—709细类与范围说明已实读','2023个体大中类表未发现；不能说存在而未下载','2025中国人口和就业统计年鉴全文未取得；劳动力调查行业总人数限制按官方明确答复','2026年中国统计年鉴候选路径404；国家数据2025最新三产业表已由主代理浏览器读取'] ))
# Reconcile all node-level totals and sectors once; changes will fail loudly.
root_checks=[]
for y,nodes in annual.items():
 top=nodes['cn-orbit-economy']['children'];s=sum(numeric(i,y) for i in top);target=numeric('cn-orbit-economy',y)
 assert abs(s-target)<1e-5,(y,s,target)
 for sector in ['primary','secondary','tertiary']:
  group=[p for p in pop_estimates if p['year']==y and p['controlSector']==sector];assert abs(sum(r['employmentPersons'] for r in group)-group[0]['controlPersons'])<1e-5
 root_checks.append(dict(year=y,rootPersons=target,sumTopLevelPersons=s,difference=s-target))
out('node-validation.json',dict(records=len(records),years=sorted(controls),rootChecks=root_checks,populationSampleSum=sum(population_values.values()),sampleDomesticSum=sum(v for c,v in population_values.items() if c!='97'),excludedInternationalOrganizationSample=562,allInventoryKeysCovered=len(records)==len(cn),note='Typed TypeScript schema/arithmetic validation is run separately via check-dataset.ts.'))
print('MAIN household model:',len(pop_estimates),'major-year estimates;',len(records),'runtime industry node-year records')
