"""Reproduce reviewed source-row extraction and null gap inventory (no imputation)."""
from pathlib import Path
import json,re,hashlib
BASE=Path(__file__).resolve().parent
ROOT=BASE.parents[2]
SOURCES={s['id']:s for s in json.loads((BASE/'sources.json').read_text())}
def read(ident): return (BASE/SOURCES[ident]['textPath']).read_text().splitlines()
def cite(ident,needle,locator):
 s=SOURCES[ident];ls=read(ident);line=next(i for i,l in enumerate(ls) if needle in l)
 return {'sourceId':ident,'url':s['url'],'locator':locator,'textPath':s['textPath'],'line':line+1,'excerpt':ls[line]}
def row_value(ident,name,year):
 ls=read(ident);line=ls.index(name);numbers=[]
 for idx in range(line+1,len(ls)):
  if re.fullmatch(r'-?\d+(?:\.\d+)?',ls[idx]): numbers.append((idx,float(ls[idx])))
  if len(numbers)>=4:break
 idx,value=numbers[1 if year==2025 else 0]
 s=SOURCES[ident]
 return value,{'sourceId':ident,'url':s['url'],'locator':('2025年四季度和全年GDP初步核算数据，'+name+'行，绝对额（亿元）—全年列' if year==2025 else '附件1：2024年GDP最终核实数，'+name+'行，现价总量（亿元）列'),'textPath':s['textPath'],'rowLine':line+1,'valueLine':idx+1,'excerpt':name+' | '+ls[idx]}
parents=[('cn-agriculture','A','农林牧渔业'),('cn-construction','E','建筑业'),('cn-wholesale-retail','F','批发和零售业'),('cn-transport','G','交通运输、仓储和邮政业'),('cn-accommodation-food','H','住宿和餐饮业'),('cn-information','I','信息传输、软件和信息技术服务业'),('cn-finance','J','金融业'),('cn-real-estate','K','房地产业'),('cn-business-services','L','租赁和商务服务业')]
values=[]
for year in [2024,2025]:
 ident='gdp2024final' if year==2024 else 'gdp2025prelim';s=SOURCES[ident]
 for nodeId,code,name in parents+[('cn-sub-a01-a04','A01-A04','第一产业')]:
  value,evidence=row_value(ident,name,year)
  values.append({'id':f'{nodeId}-{year}','country':'cn','nodeId':nodeId,'parentId':'cn-agriculture' if nodeId=='cn-sub-a01-a04' else 'cn-gdp','industryCode':code,'industryName':name,'year':year,'value':value,'unit':'亿元','currency':'CNY','measure':'value-added','priceBasis':'current','coverage':'中国大陆全国全部常住生产单位；不含港澳台；行业分类 GB/T 4754—2017','evidenceKind':'direct_fact','publishedAt':s['publishedAt'],'revisionStatus':s['revisionStatus'],'checkedAt':'2026-09-14','alreadyInBaseline':True,'evidence':[evidence]})
  if nodeId=='cn-sub-a01-a04':
   values[-1]['coverage']+='；A01—A04 合组，不含农林牧渔专业及辅助性活动（A05）'
   values[-1]['classificationEvidence']=[cite(ident,'第一产业是指农、林、牧、渔业','GDP核算说明 2.1 分类体系，三次产业分类')]
 a=next(v for v in values if v['nodeId']=='cn-agriculture' and v['year']==year)
 b=next(v for v in values if v['nodeId']=='cn-sub-a01-a04' and v['year']==year)
 values.append({**b,'id':f'cn-sub-a05-{year}','nodeId':'cn-sub-a05','industryCode':'A05','industryName':'农林牧渔专业及辅助性活动','value':a['value']-b['value'],'evidenceKind':'calculation','coverage':'中国大陆全国 A05 全部常住生产单位；按同次GDP核算农林牧渔业门类减第一产业差额推算，继承官方取整误差','calculation':{'formula':'A-A01_A04','inputs':[a['id'],b['id']],'expression':f"{a['value']:g} - {b['value']:g}"},'evidence':a['evidence']+b['evidence']})
checks={'2024':{'cn-agriculture':96976,'cn-construction':88863,'cn-wholesale-retail':139192,'cn-transport':59045,'cn-accommodation-food':24894,'cn-information':63958,'cn-finance':96956,'cn-real-estate':84047,'cn-business-services':56941,'cn-sub-a01-a04':91636,'cn-sub-a05':5340},'2025':{'cn-agriculture':99107,'cn-construction':86425,'cn-wholesale-retail':145808,'cn-transport':62092,'cn-accommodation-food':26403,'cn-information':70599,'cn-finance':101337,'cn-real-estate':83024,'cn-business-services':63666,'cn-sub-a01-a04':93347,'cn-sub-a05':5760}}
for v in values:assert v['value']==checks[str(v['year'])][v['nodeId']]
common={'country':'cn','unit':'亿元','currency':'CNY','priceBasis':'current','value':None,'checkedAt':'2026-09-14','status':'searched_not_obtained','interpretation':'已核读的公报、年鉴和主管部门来源未取得该年度全国全行业现价增加值；不等同于证明未核算或永久不公开。国家数据新入口年度库已由主代理实读，记录见 ../nbs-annual-industry-dom.json；其中未列本细分。'}
by_parent={
 'cn-wholesale-retail':(['trade2024','trade2025','yearbook2025-15-02','yearbook2025-15-04'],'商务部两年发布仍合并批发和零售业；年鉴分批零/细类列进销存、营业收入和财务指标，限额以上范围亦非全行业。'),
 'cn-finance':(['finance-method','yearbook2025-18-19','service2025'],'四大类核算存在有方法依据，但未取得两年全国货币金融、资本市场、保险、其他金融现价金额；保费、赔款、资金存量及商务活动指数不能替代增加值。2021方法只确认分类，不能反推2024/2025数值。'),
 'cn-construction':(['yearbook2025-14-08','gdp2024final','gdp2025prelim'],'年鉴14-8按房屋/土木/安装/装饰列的是建筑业总产值（万元）；GDP公告只有建筑业门类合计，不能以总产值份额分配增加值。'),
 'cn-real-estate':(['yearbook2025-19-13','housing-method','gdp2024final','gdp2025prelim'],'年鉴19-13为开发企业主营收入、商品房销售收入、土地转让收入等，不是各中类VA；自有住房服务属于GDP房地产业覆盖，不能以企业表穷尽全部范围。旧住房FAQ仅作覆盖依据，不引用其改革前核算方法。'),
 'cn-information':(['telecom2024','telecom2025','software2024','software2025','internet2024','internet2025'],'通信、软件、互联网两年主管部门原文均为业务收入、利润、业务量；互联网还限上年互联网相关收入2000万元及以上，不能代替I63/I64/I65全行业增加值。'),
 'cn-business-services':(['service2024','service2025','gdp2024final','gdp2025prelim'],'国家统计局服务业解读把租赁商务增加值合并，商务服务单列指标为规上企业营业收入增速；未取得租赁与商务服务分项VA。'),
 'cn-transport':(['transport2025','post2024','post2025','gdp2024final','gdp2025prelim'],'交通运输公报分方式列基础设施、运输装备、客货运量、投资等；邮政两年公报为业务收入与业务量。未取得G53—G60全行业分项VA，不能按货运量或营收分摊父项。'),
 'cn-accommodation-food':(['yearbook2025-17-02','yearbook2025-17-04','tourism2024','gdp2024final','gdp2025prelim'],'年鉴住宿/餐饮表为限额以上企业营业额及财务指标；2024旅游住宿3869亿元、旅游餐饮9223亿元是游客相关活动的派生分类，不能直接挂为H61/H62全行业VA。')}
old=json.loads((ROOT/'research/cn/subindustry-productivity.json').read_text());gaps=[]
for p in old['parents']:
 pid=p['parentIndustryId']
 if pid not in by_parent:continue
 sources,reason=by_parent[pid]
 children={r['childId']:r for r in p['rows']}
 for child,r in children.items():
  for year in [2024,2025]:gaps.append({**common,'id':f'{child}-{year}','nodeId':child,'parentId':pid,'industryCode':child.removeprefix('cn-sub-'),'industryName':r['name'],'year':year,'sourceIds':sources,'reason':reason})
for code,name in [('01','农业'),('02','林业'),('03','畜牧业'),('04','渔业')]:
 for year in [2024,2025]:gaps.append({**common,'id':f'cn-sub-a{code}-{year}','nodeId':f'cn-sub-a{code}','parentId':'cn-sub-a01-a04','industryCode':'A'+code,'industryName':name,'year':year,'sourceIds':['yearbook2025-12-03','agriculture2025review','fishery2024','fishery2025','agriculture2024'],'reason':'2025年鉴12-3确有2024农业/林业/牧业/渔业分项，但列名为总产值；2025成就报告也列总产值份额。渔业公报明确当年价格总产值。现价总产值不能代替现价增加值。'})
output={'checkedAt':'2026-09-14','scope':'中国2024、2025年九个非工业主行业及其可识别下级现价增加值核查','status':'official-release-and-ministry-search-complete; annual-database-result-cross-read','values':values,'gaps':gaps,'counts':{'reverifiedExistingValues':len(values),'newValueAddedNumbers':0,'explicitMissingChildYears':len(gaps)},'notes':['values 是复核基线，不能宣称新增22个数字。','不将2023 IO产品部门值或其份额推算成年份2024/2025。','农林牧渔A01—A04与A05的两组值已在基线中；更细A01—A04缺口单独列出。','研究未取得并非未公开或不可取得的证明；已交叉读取主代理的国家数据新入口年度库记录；该表未列这些服务业细分，仍不声称其他官方渠道永久无数据。']}
(BASE/'candidates.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n')
print(output['counts'])
