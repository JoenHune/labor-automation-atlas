"""Build auditable regional comparisons from transcribed official tables."""
from pathlib import Path
import json,hashlib,re
P=Path(__file__).resolve().parent
DATE='2026-09-14';NODES=['cn-io-group-39','cn-gbt2017-39']
def dump(name,data): (P/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
def source(id,title,publisher,url,published,archive=None,notes=[]):
 s=dict(id=id,title=title,publisher=publisher,url=url,published=published,retrieved=DATE,country='cn',kind='official-statistics',limitations=notes,evidencePeriod='2023' if '2023' in id or '5ec' in id else '2025')
 if archive and (P/archive).exists():s.update(archive=str((P/archive).resolve().relative_to(P.parents[2])),sha256=hashlib.sha256((P/archive).read_bytes()).hexdigest())
 if published is None:s['publishedLabel']='官方表格未标注准确发布日期；本次核查日期为2026-09-14'
 return s
sources=[
 source('nbs-5ec-editor','中国经济普查年鉴2023：编者说明','国务院第五次全国经济普查领导小组办公室','https://www.stats.gov.cn/sj/pcsj/jjpc/5jp/zk/html/note.jpg',None,'../official/originals/census2023-editor.jpg',['编者说明落款2025年3月；未当作精确上线日期。','第四条：除建筑业以外按法人单位经营地汇总；第六条：空白表示零或不足最小单位。']),
 source('nbs-5ec-c39-scope','中国经济普查年鉴2023：1-A-6 规模以上工业企业主要经济指标','国家统计局','https://www.stats.gov.cn/sj/pcsj/jjpc/5jp/zk/html/Ba1-A-06.jpg',None,'../official/originals/census2023-detailed.jpg',['C39全国行与1-B-46地区表全国行收入、成本、利润、用工一致，交叉确认规模以上范围。']),
 source('nbs-5ec-c39-regions','中国经济普查年鉴2023：1-B-46 按地区分组的计算机、通信和其他电子设备制造业主要经济指标','国家统计局','https://www.stats.gov.cn/sj/pcsj/jjpc/5jp/zk/html/Ba1-B-46.jpg',None,'raw/nbs-5ec-c39-regions.jpg',['2023年历史资料；货币指标亿元，平均用工万人。','编者说明第六条：空白表示零或不足最小单位；本数据以null保留未给出精确数值的空白，不假定精确零。','营业收入不能替代增加值；平均用工不能替代年末从业人员。']),
 source('nbs-5ec-definitions','中国经济普查年鉴2023：第二产业主要指标解释','国家统计局','https://www.stats.gov.cn/sj/pcsj/jjpc/5jp/zk/html/zb02.pdf',None,'raw/nbs-5ec-definitions.pdf',['平均用工人数指报告期企业平均实际拥有的、参与本企业生产经营活动的人员数。']),
 source('bj-census2023','北京市第五次全国经济普查公报（第三号）','北京市统计局、北京市第五次全国经济普查领导小组办公室','https://tjj.beijing.gov.cn/zt/bjsdwcqgjjpc/wjppcyw/202503/P020250313414054067991.pdf','2025-03-13','raw/bj-census2023.pdf'),
 source('sh-census2023','上海市第五次全国经济普查主要数据公报（第二号）','上海市统计局、上海市第五次全国经济普查领导小组办公室','https://tjj.sh.gov.cn/cmsres/42/4245ede056ad44d29f7c7410088be277/1fe46fa421193dfbc009dd59490aefdc.pdf','2025-04-24','raw/sh-census2023.pdf'),
 source('js-census2023','江苏省第五次全国经济普查公报（第三号）','江苏省统计局','https://tj.jiangsu.gov.cn/art/2025/3/13/art_87595_11513965.html','2025-03-13','raw/js-census2023.html',['原表图片另存 js-census-table32.png 和 js-census-table33.png。']),
 source('cq-census2023','重庆市第五次全国经济普查公报（第三号）','重庆市统计局、重庆市第五次全国经济普查工作领导小组办公室','https://tjj.cq.gov.cn/zwgk_233/fdzdgknr/tjxx/sjzl_55471/tjgb_55472/202503/t20250321_14427445.html','2025-03-21','raw/cq-census2023.html',['页面模板另含2019-11-05占位日期；采用索引栏发布日期及正文落款2025-03-21。']),
 source('gd-census2023','广东省第五次全国经济普查公报（第三号）','广东省统计局官方澎湃号','https://m.thepaper.cn/newsDetail_forward_30383816','2025-03-13','raw/gd-census2023.html',['表格图片单独保存；企业数原表按万个保留两位小数。','公开发布渠道为统计局官方账号；不是澎湃记者自行估计。']),
 source('sc-census2023','四川省第五次全国经济普查公报（第三号）','四川省统计局官方澎湃号','https://m.thepaper.cn/newsDetail_forward_30534488','2025-03-31','raw/sc-census2023.html',['表格图片单独保存；官方账号发布渠道。']),
 source('zj-census2023','浙江省第五次全国经济普查公报（第三号）：浙江日报公告版','浙江省统计局、浙江省第五次全国经济普查领导小组办公室','https://zjrb.zjol.com.cn/images/2025-03/13/zjrb2025031300010v01n.pdf','2025-03-13',None,['官方署名公报索引指向浙江日报2025-03-13第10版；原PDF当前404，只有索引候选值，正式比较保留null待核。']),
 source('bj-io2023','2023年北京地区42部门投入产出表','北京市统计局','https://tjj.beijing.gov.cn/ztzl/trccdc/dcsj/202606/P020260630604077928412.xlsx','2026-06-30','raw/bj-io2023.xlsx',['历史产品部门口径，非2025年度行业规模；不与C39企业营业收入拼接。']),
 source('cq-io2023','2023年重庆市投入产出表：42IO工作表','重庆市统计局','https://tjj.cq.gov.cn/ztlm_233/trccdc/202512/t20251218_15253734_wap.html','2025-12-18','raw/cq-io2023.xlsx',['只使用对外显示的42IO工作表；隐藏转换表不作为研究事实来源。','历史产品部门口径，非2025年度行业规模。']),
 source('bj-bulletin2025','北京市2025年国民经济和社会发展统计公报','北京市统计局、国家统计局北京调查总队（北京市政府转载）','https://www.beijing.gov.cn/cs/gncs/zcwj/202603/t20260327_4568228.html','2026-03-27','raw/bj-bulletin2025.html',['本链接转载日期2026-03-27，公报原数据发布时间2026-03-25。']),
 source('js-bulletin2025','2025年江苏省国民经济和社会发展统计公报','江苏省统计局、国家统计局江苏调查总队（省政府公报转载）','https://www.jiangsu.gov.cn/art/2026/4/23/art_64797_11761592.html','2026-04-23','raw/js-bulletin2025.html',['本链接时间为政府公报转载日期；非最早发布日期。','正文称电子行业；与全年运行材料C39全称及13.5%交叉核对。']),
 source('zj-bulletin2025','2025年浙江省国民经济和社会发展统计公报','浙江省统计局、国家统计局浙江调查总队','https://tjj.zj.gov.cn/col/col1229129205/art/2026/art_724c5ad52b8c4ac89def939cb9dee18c.html','2026-03-03','raw/zj-bulletin2025.html',['页面发布时间2026-03-03；正文落款2026-02-26。']),
 source('cq-bulletin2025','2025年重庆市国民经济和社会发展统计公报','重庆市统计局、国家统计局重庆调查总队','https://tjj.cq.gov.cn/zwgk_233/fdzdgknr/tjxx/sjjd_55469/202603/t20260326_15568538_wap.html','2026-03-26','raw/cq-bulletin2025.html',['2025年数据为初步统计数。']),
 source('sc-bulletin2025','2025年四川省国民经济和社会发展统计公报','四川省统计局、国家统计局四川调查总队（四川在线全文转载）','https://sichuan.scol.com.cn/m/ggxw/202603/83223344.html','2026-03-17','raw/sc-bulletin2025.html',['使用统计局署名的公报全文转载；统计局官网原页本次未取得。']),
 source('sh-economy2025','2025年上海市国民经济运行情况','上海市统计局、国家统计局上海调查总队','https://tjj.sh.gov.cn/tjxw/20260120/d3f4918a77484c77bed173db6aaef33c.html','2026-01-21','extracted/sh-economy2025-web.txt',['C39公布的是工业总产值增长7.7%，不得混入其他省的增加值增速表。','归档是本次网页读取工具返回的全文记录，非原始HTML。']),
 source('gd-economy2025','2025年广东经济运行数据出炉','广东省人民政府侨务办公室（转载）','https://www.qb.gd.gov.cn/qwdt/content/post_1317873.html',None,None,['本次仅取得搜索索引，直接正文多次抓取失败；7.1%暂不进入已读原表的数值比较。'])
]
lookup={s['id']:s for s in sources}
lookup['gd-economy2025']['publishedLabel']='完整正文未取得，发布日期待核'
raw=json.loads((P/'extracted/nbs-5ec-c39-regions-manual.json').read_text());cols=raw['columns'];records=[dict(zip(cols,r)) for r in raw['rows']];national=records[0];regions=records[1:]
local=json.loads((P/'extracted/local-census2023.json').read_text())['rows']
comparisons=[]
ids=['bj','tj','he','sx','nm','ln','jl','hl','sh','js','zj','ah','fj','jx','sd','ha','hb','hn','gd','gx','hi','cq','sc','gz','yn','xz','sn','gs','qh','nx','xj'];nameids=dict(zip([r['region'] for r in regions],ids))
scope='2023年中国大陆31省级地区，规模以上C39工业企业；货币指标为当年会计金额，平均用工为全年平均；地区按法人单位经营地归集。'
notes=['这是2023年历史截面，不代表2025年地区规模。','收入含中间投入和企业间交易，不能作为增加值或GDP份额。','按编者说明第四条，以法人单位经营地汇总；不用上市公司注册地推算，也不视为各工厂的生产地普查。']
def row(region,value,unit,sid,locator,notes=[],missing=None,computation=None):
 o=dict(id='cn-region-'+nameids[region],name=region,nodeIds=[],value=value,evidence=[dict(sourceId=sid,locator=locator)],releaseDate=lookup[sid]['published'],revision='已发布原表；未见该表独立修订说明',notes=notes,missingReason=missing,url=lookup[sid]['url'])
 if computation:o['computation']=computation
 return o
for metric,title,unit in [('revenue','各地区电子设备制造业营业收入','亿元人民币'),('averageWorkers','各地区电子设备制造业平均用工','万人'),('profitMargin','各地区电子设备制造业利润率','%'),('revenuePerWorker','各地区电子设备制造业人均营业收入','万元人民币/人'),('assets','各地区电子设备制造业资产总计','亿元人民币')]:
 rows=[]
 for r in regions:
  v=r.get(metric);comp=None;extra=[];loc=f"表1-B-46，{r['region']}行，"
  if metric=='profitMargin':
   v=None if r['totalProfit'] is None else r['totalProfit']/r['revenue']*100
   loc+='利润总额、营业收入列';extra=['利润率＝利润总额÷营业收入；含营业外收支，非毛利率。']
   if v is not None:comp=dict(expression='totalProfit / revenue * 100',inputs=[r['totalProfit'],r['revenue']],note='两个分项均以亿元计，所得单位%。')
  elif metric=='revenuePerWorker':
   v=r['revenue']/r['averageWorkers'];loc+='营业收入、平均用工人数列';extra=['人均营业收入不是人均增加值，也不是技术效率或工人工资。'];comp=dict(expression='revenue / averageWorkers',inputs=[r['revenue'],r['averageWorkers']],note='亿元÷万人＝万元/人；分母采用全年平均用工。')
  else:loc+=dict(revenue='营业收入列',averageWorkers='平均用工人数（万人）列',assets='资产总计列')[metric]
  rows.append(row(r['region'],v,unit,'nbs-5ec-c39-regions',loc,extra,'原表留空；编者说明指零或不足最小单位，未披露精确值，保留null。' if v is None else None,comp))
 comparisons.append(dict(id='cn-c39-regions-2023-'+metric.lower(),country='cn',section='regions',nodeIds=NODES,title=title,metric=metric,period='2023',unit=unit,currency='CNY' if metric in ['revenue','assets','revenuePerWorker'] else None,coverage=scope,comparisonKey='cn-c39-above-designated-2023-'+metric,coverageLabel='31省级地区 · 规模以上 · 2023',notes=notes,rows=rows))
for metric,title,unit,loc in [('enterpriseCount','重点地区全部电子设备制造法人企业数','个','countLocator'),('workers','重点地区全部电子设备制造法人企业年末就业','万人','countLocator'),('revenue','重点地区全部电子设备制造法人企业收入','亿元人民币','financeLocator')]:
 rows=[row(r['region'],r[metric],unit,r['sourceId'],r[loc],[r.get('enterpriseCountOriginal','原表数值或单位换算')] if metric=='enterpriseCount' else [],r.get('missingReason')) for r in local]
 comparisons.append(dict(id='cn-c39-regions-census2023-'+metric.lower(),country='cn',section='regions',nodeIds=NODES,title=title,metric=metric,period='2023',unit=unit,currency='CNY' if metric=='revenue' else None,coverage='广东、江苏、浙江、上海、北京、重庆、四川七省市，全体C39工业企业法人单位；不含个体经营户。',comparisonKey='cn-c39-all-legal-units-2023-'+metric,coverageLabel='7个重点地区 · 6地已取得 · 2023',notes=['覆盖七个重点地区；六地已读原件，浙江仅索引候选值、原件404，保留空白；不是全国排名。','期末就业与31省规上表的平均用工不同，不能混列或直接计算就业覆盖率。'],rows=rows))
io=[]
for id,name,sheet in [('bj','北京','xl/worksheets/sheet1.xml'),('cq','重庆','xl/worksheets/sheet3.xml')]:
 cells=json.loads((P/f'extracted/{id}-io2023-cells.json').read_text())[sheet];data={k:cells['W'+str(i)] for k,i in [('labourCompensation',50),('netProductionTax',51),('depreciation',52),('operatingSurplus',53),('valueAdded',54)]};data.update(region=name,sourceId=id+'-io2023',unit='万元',code='20',scope='42部门产品口径：通信设备、计算机和其他电子设备',sheet='2023年北京地区投入产出表' if id=='bj' else '42IO',totalValueAdded=cells['AT54']);io.append(data)
dump('extracted/local-io2023.json',io)
for metric,title,unit in [('valueAdded','北京与重庆电子产品部门增加值','亿元人民币'),('labourShare','北京与重庆电子产品部门劳动者报酬占比','%'),('localShare','电子产品部门占本地区投入产出表增加值','%')]:
 rows=[]
 for r in io:
  if metric=='valueAdded':v=r['valueAdded']/10000;expr='valueAdded / 10000';inputs=[r['valueAdded']];loc='W54'
  elif metric=='labourShare':v=r['labourCompensation']/r['valueAdded']*100;expr='labourCompensation / valueAdded * 100';inputs=[r['labourCompensation'],r['valueAdded']];loc='W50、W54'
  else:v=r['valueAdded']/r['totalValueAdded']*100;expr='valueAdded / tableTotalValueAdded * 100';inputs=[r['valueAdded'],r['totalValueAdded']];loc='W54、AT54'
  rows.append(row(r['region'],v,unit,r['sourceId'],r['sheet']+'，'+loc,[],None,dict(expression=expr,inputs=inputs,note='直接使用同一42部门表的原始万元数值；不桥接年度GDP。')))
 comparisons.append(dict(id='cn-electronics-products-regions2023-'+metric.lower(),country='cn',section='regions',nodeIds=NODES,title=title,metric=metric,period='2023',unit=unit,currency='CNY' if metric=='valueAdded' else None,coverage='北京与重庆2023年42部门投入产出表，产品部门20；均为万元原始值。',comparisonKey='cn-io42-product20-2023-'+metric,coverageLabel='2个地区 · 产品部门 · 2023',notes=['仅比较两张已取得的地方表，不是全国地区排名。','与C39企业收入口径不同；地域份额的分母是本地区投入产出表增加值合计。','劳动者报酬含工资及雇主社会缴费等，不等于可节省的人工成本。'],rows=rows))
growth={'北京':(20.2,'bj-bulletin2025','四、工业和建筑业，重点行业增加值段'),'江苏':(13.5,'js-bulletin2025','三、工业和建筑业，装备制造业支撑有力段'),'浙江':(16.5,'zj-bulletin2025','三、工业和建筑业，计算机通信电子行业增加值段'),'重庆':(-4.4,'cq-bulletin2025','工业和建筑业，分行业增加值段'),'四川':(12.9,'sc-bulletin2025','四、工业和建筑业，分行业增加值段'),'上海':(None,'sh-economy2025','二、工业生产平稳增长；C39指标为产值增速'),'广东':(None,'gd-economy2025','全文待取得，目前仅搜索索引有C39增长7.1%')}
comparisons.append(dict(id='cn-c39-regions-growth2025',country='cn',section='regions',nodeIds=NODES,title='重点地区电子设备制造业2025年增加值增速',metric='real-value-added-growth',period='2025',unit='%',currency=None,coverage='七个重点地区规模以上C39工业增加值实际增长率；只纳入已读正文且指标一致的五地。',comparisonKey='cn-c39-above-designated-real-growth-2025',coverageLabel='5地有同口径值 · 2地缺口 · 2025',notes=['增速不表示规模，不与2023年的收入、产品增加值联结成金额趋势。','上海目前取得的是工业总产值增长7.7%，不能替代增加值增速；广东正文抓取未完成。','江苏、浙江原文使用电子行业简称；按C39全称全年运行材料交叉核验。'],rows=[row(name,v,'%',sid,loc,[],('已读原文为产值增速；缺同口径增加值增速。' if name=='上海' else '已定位资料，完整正文暂未取得，不从索引直接入值。') if v is None else None) for name,(v,sid,loc) in growth.items()]))
findings=[
 dict(id='cn-c39-region-concentration2023',country='cn',section='regions',nodeIds=NODES,period='2023',title='广东、江苏、浙江贡献过半规上收入',body=f"2023年广东、江苏、浙江规上C39营业收入分别为47689.96、23766.82、9562.68亿元，三地合计占全国规上同行业收入53.11%。广东和江苏的平均用工合计471.72万人，占全国51.20%。",evidenceKind='calculation',evidence=[dict(sourceId='nbs-5ec-c39-regions',locator='全国、广东、江苏、浙江行；营业收入与平均用工人数列')],conditions=['分母为原表全国行，非省级收入总和重造的全国值。','只能说明规上企业收入与用工的地区集中，不能解释为GDP份额或所有生产地点分布。']),
 dict(id='cn-c39-region-profit2023',country='cn',section='regions',nodeIds=NODES,period='2023',title='收入规模与盈利状况是不同维度',body='2023年广东规上C39利润率为7.61%，江苏为4.05%；安徽、湖北利润总额分别为-26.13亿元、-129.47亿元。相同收入规模并不保证相同盈利。',evidenceKind='calculation',evidence=[dict(sourceId='nbs-5ec-c39-regions',locator='广东、江苏、安徽、湖北行，营业收入及利润总额列')],conditions=['利润率=利润总额/营业收入；不是毛利率。','单年区域总量差异不能独立归因于技术水平、自动化、补贴或管理。']),
 dict(id='cn-c39-region-scale-mismatch',country='cn',section='regions',nodeIds=NODES,period='2023',title='地方公报能补充规上以外的企业与就业',body='广东五经普公报披露全部C39工业企业法人数量、期末从业人员、营业收入。广东公布8.29万个企业、380.82万名期末从业人员；全国地区表的广东平均用工为320.62万人。两者同时受企业覆盖和时点定义影响，不能相减当作小企业就业。',evidenceKind='fact',evidence=[dict(sourceId='gd-census2023',locator='表3-2 C39行'),dict(sourceId='nbs-5ec-c39-regions',locator='广东行，平均用工人数列'),dict(sourceId='nbs-5ec-definitions',locator='平均用工人数释义')],conditions=['公报覆盖全部企业法人、就业为期末；全国地区比较表为规上平均用工。']),
 dict(id='cn-electronics-local-io2023',country='cn',section='regions',nodeIds=NODES,period='2023',title='地方投入产出表已经提供可用的产品增加值',body='2023年通信设备、计算机和其他电子设备产品部门增加值，北京为698.65亿元，重庆为930.09亿元。对应表内本地区增加值占比分别为1.48%、3.04%。这说明已有地方来源可直接补充产品结构分析，但本轮只比较这两个地区。',evidenceKind='calculation',evidence=[dict(sourceId='bj-io2023',locator='2023年北京地区投入产出表，W54、AT54'),dict(sourceId='cq-io2023',locator='42IO，W54、AT54')],conditions=['地方42部门产品口径；不与C39企业收入混用。','表内地域份额不称最新GDP占比。']),
 dict(id='cn-c39-regions2025-divergence',country='cn',section='regions',nodeIds=NODES,period='2025',title='最新全年增加值增速存在地区分化',body='已读同口径材料显示，2025年北京、浙江、江苏、四川的规上C39增加值分别增长20.2%、16.5%、13.5%、12.9%，重庆下降4.4%。这些是实际增速，可以比较增长方向，不能据此推算2025年的现价规模。',evidenceKind='fact',evidence=[dict(sourceId=sid,locator=loc) for v,sid,loc in growth.values() if v is not None],conditions=['五地有可比值；上海产值增速和广东仅索引线索未混入。','四川使用官方署名公报的四川在线全文转载。'])
]
dump('sources.json',sources)
dump('observations.json',dict(period='2023',country='cn',industryCode='C39',scope=scope,units={'monetary':'亿元人民币','averageWorkers':'万人'},national=national,regions=regions,regionalIo=io,localCensus=local,latestGrowth=growth))
dump('panel-data.json',dict(sources=sources,comparisons=comparisons,findings=findings,coverage=[]))
# A substantive transcription check, including preserved blanks.
checks=[]
for c in cols[1:]:
 vals=[r[c] for r in regions];summed=sum(v for v in vals if v is not None);difference=summed-national[c]
 checks.append(dict(metric=c,regionalSum=round(summed,6),national=national[c],difference=round(difference,6),nullCount=vals.count(None),withinRoundingTolerance=abs(difference)<=.16))
assert all(c['withinRoundingTolerance'] for c in checks)
assert len(regions)==31 and len({r['region'] for r in regions})==31
for r in io:assert abs(sum(r[c] for c in ['labourCompensation','netProductionTax','depreciation','operatingSurplus'])-r['valueAdded'])<.0001
dump('validation.json',dict(checkedAt=DATE,regionCount=31,sourceImageRead=True,checks=checks,ioFourComponentsReconcile=True,notes=['合计只作抄录复核；原表空白表示零或不足最小单位，未补精确零。','9指标中2个单元格为空；各指标差异在32行各保留两位小数的舍入容差内。']))
print('Built',len(comparisons),'comparisons;',len(findings),'findings;',len(sources),'sources')
