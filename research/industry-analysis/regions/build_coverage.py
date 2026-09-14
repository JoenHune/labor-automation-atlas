from pathlib import Path
import json,re
from urllib.parse import urlparse
P=Path(__file__).resolve().parent;DATE='2026-09-14'
data=json.loads((P/'observations.json').read_text());ids=['bj','tj','he','sx','nm','ln','jl','hl','sh','js','zj','ah','fj','jx','sd','ha','hb','hn','gd','gx','hi','cq','sc','gz','yn','xz','sn','gs','qh','nx','xj'];priority={'bj','js','zj','sh','cq','gd','sc'};localVerified=priority-{'zj'}
yearbookLogs={}
for path in P.glob('extracted/yearbook-search-*.json'):
 item=json.loads(path.read_text())
 for rid in item['regionIds']:yearbookLogs[rid]=(path,item)
rows=[]
for r,id in zip(data['regions'],ids):
 text=(P/f'extracted/search-{id}.txt').read_text()
 candidates=[]
 for title,url in re.findall(r'^(.+) \((https?://[^\s]+)\)$',text,re.M):
  host=urlparse(url).hostname or ''
  if host.endswith('.gov.cn') and not host.endswith('stats.gov.cn'):candidates.append({'title':title,'url':url,'status':'search-located-not-read'})
 def family(pattern):
  found=[c for c in candidates if re.search(pattern,c['title'])]
  return {'status':'located-pending-reading' if found else 'searched-not-obtained','candidates':found,'depth':'首轮定域组合检索；未穷尽站内目录、分页、附件或年鉴内页','nextStep':'进入官方目录核对资料年度、取得C39分行业原表；未取得不表示不存在。'}
 yearPath,yearLog=yearbookLogs[id]
 yearDomain=next(q['domains'][0] for q,rid in zip(yearLog['queries'],yearLog['regionIds']) if rid==id)
 yearCandidates=[]
 for title,url in re.findall(r'^(.+) \((https?://[^\s]+)\)$',yearLog['response'],re.M):
  host=urlparse(url).hostname or ''
  if host==yearDomain or host.endswith('.'+yearDomain):yearCandidates.append({'title':title,'url':url,'status':'search-located-not-read'})
 def yearbook(year):
  matched=[c for c in yearCandidates if '年鉴' in c['title'] and str(year) in c['title']]
  return {'status':'located-pending-reading' if matched else 'searched-not-obtained','candidates':matched,'searchLog':'research/industry-analysis/regions/'+str(yearPath.relative_to(P)),'depth':'2024/2025年鉴专门定域入口检索，未逐页读完工业和就业篇','nextStep':'打开官方年鉴目录及工业/劳动就业原表，核资料年、规上范围、企业数与平均用工。'}
 local=family('第五次.*经济普查|经济普查年鉴')
 if id in localVerified:local.update(status='obtained',sourceId=id+'-census2023',depth='已读第二产业公报C39行；企业数、期末就业、收入已提取',nextStep='如发布修订，保留旧值并核对；扩展到本省市内地区/细行业须另读表。')
 if id=='zj':local.update(status='located-pending-reading',sourceId='zj-census2023',depth='已见统计局署名公报索引；PDF直接404，候选数值保留待核，正式比较留空',nextStep='恢复官方原件或找到另一份官方全文，逐项复核后入值。')
 io=family('投入产出表')
 if id in {'bj','cq'}:io.update(status='obtained',sourceId=id+'-io2023',depth='已下载42部门xlsx，提取对外主表部门20四项增加值构成与表内合计',nextStep='可继续分析产业联系；其他部门和省际流量需要独立口径审查。')
 if id=='zj':io.update(status='historical-only-located',candidates=[{'title':'浙江省2012年42部门投入产出表','url':'https://tjj.zj.gov.cn/art/2020/10/23/art_1229418434_58891189.html','status':'page-read-attachment-not-extracted'}],nextStep='当前已读页只提供2012表；进入浙江投入产出目录继续核2020/2023，不判断后续不存在。')
 annual=family('2025.*国民经济.*公报|2025.*经济运行')
 if id in priority:
  annual.update(status='obtained-c39-growth' if id in {'bj','js','zj','cq','sc'} else ('obtained-not-comparable' if id=='sh' else 'located-pending-reading'),sourceId=id+('-economy2025' if id in {'sh','gd'} else '-bulletin2025'),nextStep='上海需取得增加值增速；广东需读取完整原文；其它地区可补2024及2026最新一期，不能由增速反推现价规模。')
 rows.append({'region':r['region'],'regionId':id,'priority':id in priority,'checkedAt':DATE,'nationalCensus2023':{'status':'obtained','sourceId':'nbs-5ec-c39-regions','scope':'全国统一表1-B-46的本地区C39行，规上企业，九项指标'},'localCensus2023':local,'localYearbook2024':yearbook(2024),'localYearbook2025':yearbook(2025),'annualBulletin2025':annual,'localIo2023':io,'searchLog':f'research/industry-analysis/regions/extracted/search-{id}.txt','officialCandidates':candidates})
out={'checkedAt':DATE,'country':'cn','scope':'中国大陆31省级地区C39；本轮采用全国统一地区表完成比较，同时对地方资料作有记录的首轮检索','notAnExhaustiveAudit':True,'definitions':{'obtained':'原表已读取且目标指标已提取','located-pending-reading':'检索或目录已定位入口，内页/数值仍待取得','searched-not-obtained':'已执行记录中的检索，未取得对应原表；不推断不存在','obtained-not-comparable':'取得资料但指标与目标不同，不混入比较','not-checked-year-by-year':'尚未完成该资料年度的独立逐项核查，不能称为检索后无数据'},'summary':{'nationalComparableRegions':31,'nationalOriginalMetrics':9,'localCensusRegions':6,'localCensusPendingRegions':1,'localIoRegions':2,'latestComparableGrowthRegions':5,'searchedLocalRegionDomains':31,'allLocalYearbooksRead':False,'allLocalIoTablesRead':False},'regions':rows}
(P/'coverage.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
# UI includes summary statements and a separate entry for every province.
panel=json.loads((P/'panel-data.json').read_text())
panel['coverage']=[
 {'id':'cn-c39-31-regional-table','country':'cn','group':'地区来源覆盖','title':'全国统一31省C39地区表','period':'2023','status':'obtained','detail':'九项原始指标已提取；收入、利润、资产、平均用工等地区合计已按原表舍入容差检查。','evidence':[{'sourceId':'nbs-5ec-c39-regions','locator':'表1-B-46，31省级地区及全国行'},{'sourceId':'nbs-5ec-c39-scope','locator':'表1-A-6标题及C39行；与地区表全国值交叉核验'}],'nextStep':'新增同范围年度数据才能扩展趋势；不得用地方增速反推现价金额。'},
 {'id':'cn-c39-seven-local-census','country':'cn','group':'地区来源覆盖','title':'七个重点地区五经普公报：六地已取，浙江待核','period':'2023','status':'obtained','detail':'广东、江苏、上海、北京、重庆、四川的全部C39工业企业法人数量、年末就业和营业收入已提取；浙江原PDF404，候选数值未进入正式比较。','evidence':[{'sourceId':id+'-census2023','locator':'第二产业基本情况，C39单位/从业人员及主要经济指标行'} for id in ['gd','js','sh','bj','cq','sc']],'nextStep':'恢复浙江原件并补其他24省全体法人原表；不要与规上平均用工混排。'},
 {'id':'cn-c39-two-local-io','country':'cn','group':'地区来源覆盖','title':'北京、重庆地方投入产出表','period':'2023','status':'obtained','detail':'两张42部门公开主表已取得，电子产品部门增加值四项与合计已核算。','evidence':[{'sourceId':id+'-io2023','locator':'部门20，W50:W54；增加值合计AT54'} for id in ['bj','cq']],'nextStep':'继续核对其他省份可比产品部门表；本轮两地不是全国地区排名。'},
 {'id':'cn-c39-local-search-boundary','country':'cn','group':'地区来源覆盖','title':'地方年鉴和投入产出表仍有覆盖缺口','period':'2023—2025','status':'pending','detail':'已对31省级地区作首轮来源检索并保留查询词与结果；未逐页读取全部2024/2025地方年鉴，也未取得所有地方投入产出表，不能声称探索完。','evidence':[],'nextStep':'按覆盖矩阵进入具体年鉴工业/就业篇、地方IO附件和市内地区表；先核重点产业省份。'},
 {'id':'cn-c39-regions-latest2025','country':'cn','group':'地区来源覆盖','title':'最新全年地区C39增速','period':'2025','status':'obtained','detail':'五地取得同口径规上增加值增速；上海当前是产值增速，广东仅已定位索引，二者保留缺口。','evidence':[{'sourceId':id+'-bulletin2025','locator':'工业和建筑业，C39增加值增速段'} for id in ['bj','js','zj','cq','sc']],'nextStep':'补齐广东完整正文、上海增加值指标及各地2024和2026最新期，保持与现价规模分开。'}]

for r in rows:
 id=r['regionId'];detail=[]
 for label,key in [('五经普公报','localCensus2023'),('2024年鉴','localYearbook2024'),('2025年鉴','localYearbook2025'),('2025年度进展','annualBulletin2025'),('2023地方IO','localIo2023')]:
  item=r[key];st=item['status'];translated={'obtained':'已提取','located-pending-reading':'已定位，内页待读','searched-not-obtained':'首轮检索未取得原表','obtained-c39-growth':'已取得C39同口径增速','obtained-not-comparable':'已读，指标不一致','historical-only-located':'仅已取得更早年份入口'}
  detail.append(label+'：'+translated.get(st,st))
 evidence=[{'sourceId':'nbs-5ec-c39-regions','locator':'1-B-46，'+r['region']+'行'}]
 if id in localVerified:evidence.append({'sourceId':id+'-census2023','locator':'第二产业基本情况，C39行'})
 if id in {'bj','cq'}:evidence.append({'sourceId':id+'-io2023','locator':'公开主表，部门20'})
 panel['coverage'].append({'id':'cn-c39-region-audit-'+id,'country':'cn','group':'逐省来源矩阵','title':r['region']+'：已取得全国地区表，地方内页继续核查','period':'2023—2025','status':'pending','detail':'；'.join(detail)+'。官方入口检索不是逐页穷尽，未取得不等于不存在。','evidence':evidence,'nextStep':'按可下载的coverage.json与查询日志继续取得当地2024/2025年鉴工业、就业内页及2023地方IO；补齐同年同口径值后再扩大排名。'})
(P/'panel-data.json').write_text(json.dumps(panel,ensure_ascii=False,indent=2)+'\n')
print(len(rows),'regions documented;',len(panel['coverage']),'UI coverage statements')
