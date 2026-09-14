from pathlib import Path
import hashlib
import json

ROOT=Path(__file__).resolve().parent
d=json.loads((ROOT/'analysis.json').read_text())
obs={o['id']:o for o in d['observations']}
node_ids=['cn-io-group-39','cn-gbt2017-39']
titles={'census2023-detailed':'中国经济普查年鉴2023：1-A-6规上工业企业主要经济指标',
 'census2023-rd-personnel':'中国经济普查年鉴2023：1-B-3分行业R&D人员',
 'census2023-rd-expense':'中国经济普查年鉴2023：1-C-1.3分行业R&D经费',
 'census2023-editor':'中国经济普查年鉴2023编者说明',
 'census2023-industrial':'第五次全国经济普查公报第三号',
 'census2023-rd':'第五次全国经济普查公报第六号',
 'census2023-directory':'中国经济普查年鉴2023官方目录',
 'nbs2024-rd':'2024年全国科技经费投入统计公报',
 'nbs2026-07-financial':'2026年1—7月份规模以上工业企业利润',
 'nbs2026-07-commentary':'2026年1—7月份工业企业利润官方解读',
 'io2023-independent-dom':'2023年全国投入产出表：电子设备四分项独立复核',
 'miit2024':'2024年电子信息制造业运行情况',
 'miit2025':'2025年电子信息制造业运行情况',
 'miit2026-06':'2026年1—6月电子信息制造业运行情况',
 'miit2026-07':'2026年1—7月电子信息制造业运行情况',
 'miit2024-editor':'2024年电子信息制造业年度统计数据编辑说明',
 'nbs2025-va-method':'中国统计年鉴2025：国民经济核算指标解释',
 'census2023-indicator':'中国经济普查年鉴2023：工业指标解释',
 'nbs-va-overview':'国内（地区）生产总值概述',
 'prior-yearbook2025-c13-02':'中国统计年鉴2025：表13-2规模以上工业企业主要经济指标（2024年）'}
sources=[]
for s in d['sources']:
    source=dict(id='ia-official-'+s['id'],title=titles.get(s['id'],s['id']),publisher='工业和信息化部' if s['id'].startswith('miit') else '国家统计局',url=s['url'],published=s.get('releaseDate'),retrieved='2026-09-14',country='cn',kind='official-statistics',archive=s['path'],sha256=s['sha256'],limitations=['保留原始资料统计期、范围、修订与取位；不能将企业财务数据替代全国增加值。'])
    if s.get('releaseMonth'):
        source['publishedLabel']='编者说明2025年3月，确切发布日期未取得'
        source['dates']=[dict(kind='document-version',value=s['releaseMonth'],note='来自本书编者说明落款，非网站精确公开日')]
    sources.append(source)

# Reuse the actual earlier primary artifacts for coverage assertions. A review
# narrative alone is not evidence that a specific official table was read.
repo=ROOT.parents[2]
prior_manifest=json.loads((repo/'research/annual-2024-2025/cn-industry/source-manifest.json').read_text())['sources']
prior_ids={'gdp2024-final':('2024年GDP最终核实数','2025-12-26'),
           'gdp2025-preliminary':('2025年四季度和全年GDP初步核算','2026-01-20'),
           'yearbook2025-C13-02':('中国统计年鉴2025：表13-2规模以上工业企业主要经济指标',None)}
for id,(title,published) in prior_ids.items():
    if any(s['id']=='ia-official-prior-'+id.lower() for s in sources):continue
    item=next(s for s in prior_manifest if s['id']==id)
    archive='research/annual-2024-2025/cn-industry/'+item['archive']
    assert hashlib.sha256((repo/archive).read_bytes()).hexdigest()==item['sha256']
    sources.append(dict(id='ia-official-prior-'+id.lower(),title=title,publisher='国家统计局',url=item['url'],published=published,retrieved='2026-09-14',country='cn',kind='official-statistics',archive=archive,sha256=item['sha256'],limitations=['实际前轮原件，本轮再次读取与核对；不将版次/检索日期代替数据期。']))
for id,title,url,archive in [
    ('nbs-annual-dom','国家数据年度：分行业增加值（2026-09-14实读）','https://data.stats.gov.cn/dg/website/page.html#/pc/national/yearData','research/annual-2024-2025/nbs-annual-industry-dom.json'),
    ('nbs-quarter-dom','国家数据季度：国内生产总值现价（2026-09-14实读）','https://data.stats.gov.cn/dg/website/page.html#/pc/national/quarterData','research/annual-2024-2025/followup-nbs/quarterly-industry-dom.json')]:
    b=(repo/archive).read_bytes()
    sources.append(dict(id='ia-official-prior-'+id,title=title,publisher='国家统计局',url=url,published=None,retrieved='2026-09-14',country='cn',kind='official-statistics',archive=archive,sha256=hashlib.sha256(b).hexdigest(),limitations=['前轮实际浏览器可见DOM摘录；本轮读取归档复核，非原始Excel。','页面未给精确发布日期，不以读取日替代。']))

def ev(source,locator):return dict(sourceId='ia-official-'+source,locator=locator)
def oe(o):
    result=[ev(o['sourceId'],o['sourceLocator'])]
    for i in o['inputIds']:
        ref=ev(obs[i]['sourceId'],obs[i]['sourceLocator'])
        if ref not in result:result.append(ref)
    return result
comparisons=[]
for key,title,unit,currency in [('revenue','2023年C39九个中类：营业收入','亿元人民币','CNY'),('averageWorkers','2023年C39九个中类：平均用工','万人',None),('profitMargin','2023年C39九个中类：营业收入利润率','%',None),('revenuePerWorker','2023年C39九个中类：人均营业收入','元/人','CNY'),('rdIntensity','2023年C39九个中类：研发强度','%',None)]:
    rows=[]
    for n in d['nodes'][1:]:
        o=obs[f"{n['id']}-2023-{key}"]
        row=dict(id='ia-official-'+n['id'].lower()+'-'+key.lower(),name=n['name'],nodeIds=node_ids,value=o['value'],evidence=oe(o),releaseDate=None,revision=o['revisionStatus'],notes=['2023年历史数据；编者说明2025年3月。'],missingReason=None,url=o['sourceUrl'])
        if o['formula']:row['computation']=dict(expression=o['formula'],inputs=[obs[i]['value'] for i in o['inputIds']],note='原单位见逐项来源；经费为万元时先除10000换为亿元。')
        if key=='revenuePerWorker':
            row['value']*=10000
            row['computation']['expression']='营业收入（亿元） / 平均用工（万人） × 10000'
            row['computation']['note']='将研究原值万元/人换为元/人，分母仍为全年平均用工；非人均增加值。'
        rows.append(row)
    notes=['全国规模以上企业C39的9个互斥中类；仅同表同年比较，不与IO产品部门混为一个口径。','平均用工是期间平均，不能与年末从业人员直接互换。']
    if key=='revenuePerWorker':notes.append('这是营业收入/平均用工，不是人均增加值或劳动生产率。')
    if key=='rdIntensity':notes.append('R&D原表中类合计与C39总项尚有1641万元、59人、41人年未解释差额；保留原值，未强平。')
    comparisons.append(dict(id='ia-official-c39-2023-'+key.lower(),country='cn',section='official',nodeIds=node_ids,title=title,metric=title.split('：')[-1],period='2023年全年（历史结构）',unit=unit,currency=currency,coverage='全国规模以上工业企业法人C39及9个中类',comparisonKey='cn-c39-above-designated-2023-'+key.lower(),coverageLabel='9个中类；同年同表，按企业主要活动分类',notes=notes,rows=rows))

findings=[
 dict(id='ia-official-coverage-open',country='cn',section='official',nodeIds=node_ids,period='核查日2026-09-14',title='官方资料尚未充分利用',body='过去以现价增加值补数为目标，尚未充分利用企业财务、就业与研发资料。本轮在经济普查年鉴取得C39全部9个中类经营表；专业年鉴内页、全部地方资料和海关细项仍有覆盖缺口。',evidenceKind='judgement',evidence=[ev('census2023-detailed','1-A-6，C39及9个中类'),ev('census2023-rd-personnel','1-B-3，C39及9个中类')],conditions=['覆盖登记按具体资料、指标和年份管理，不宣称国家及地方全部查完。']),
 dict(id='ia-official-revenue-employment',country='cn',section='structure',nodeIds=node_ids,period='2023年（企业行业历史结构）',title='收入最多与用工最多的方向不同',body='规上企业中，通信设备营收44407.59亿元，电子元件及材料平均用工288.79万人，分别为C39中类最高。两者反映经营和用工分布；不会改变产品增加值图的扇区。',evidenceKind='calculation',evidence=[ev('census2023-detailed','1-A-6，C39下全部9个中类，营业收入与平均用工列')],conditions=['全国规上企业行业口径，非2023投入产出产品部门。','所有排名仅覆盖C39九个中类。']),
 dict(id='ia-official-products-2025',country='cn',section='structure',nodeIds=node_ids,period='2025年全年（最新已核全年进展）',title='整体增长中，产品方向分化',body='2025年手机、微型计算机产量同比下降5.8%、2.9%，集成电路产量增长10.9%，出口数量增长17.4%。电子行业整体增长不能解释为所有产品同步增长。',evidenceKind='judgement',evidence=[ev('miit2025','第一节主要产品、第二节据海关统计')],conditions=['采用官方可比同比；各产品实物单位不相加。','出口为海关商品统计，不直接与规上产量相除。']),
 dict(id='ia-official-profit-2026',country='cn',section='structure',nodeIds=node_ids,period='2026年1—7月（最新已核期）',title='最新利润增量集中于集成电路',body='国家统计局解读指出，集成电路行业利润同比增长18.5倍，对电子行业利润增量贡献超过八成。C39同期营收110747.3亿元、利润7057.0亿元，官方同比为19.4%、105.0%。',evidenceKind='fact',evidence=[ev('nbs2026-07-commentary','电子相关行业利润高速增长段'),ev('nbs2026-07-financial','表3，C39行')],conditions=['超过八成是利润增量贡献，不是利润总额或市场份额。','官方总体分析不等于每家企业都增长。']),
 dict(id='ia-official-negative-components',country='cn',section='structure',nodeIds=node_ids,period='2023年投入产出产品口径',title='分配比例可能超过100%',body='原表独立复核确认，广播电视雷达产品增加值62.8539亿元、生产税净额−382.0957亿元，劳动者报酬占增加值约354.7%。负分项可使正分项占比超过100%，应查看正负金额，不重新归一。',evidenceKind='calculation',evidence=[ev('io2023-independent-dom','39130列 × VA001、VA002、TVA行'),ev('nbs2025-va-method','PDF第1页、书页98，生产税净额/营业盈余解释')],conditions=['生产税净额=生产税减生产补贴；具体负数原因原表未分解。','劳动者报酬不是可被自动化替代的工资池。']),
 dict(id='ia-official-rd-reconciliation',country='cn',section='official',nodeIds=node_ids,period='2023年研发统计',title='研发细项保留未解释差额',body='C39九中类R&D经费之和比父项少1641万元，研发人员少59人、全时当量少41人年。各行已目视核对原图，但差额原因未取得说明；单行比较保留原值，不能声称完全加总平衡。',evidenceKind='calculation',evidence=[ev('census2023-rd-expense','1-C-1.3，C39及9中类内部支出列'),ev('census2023-rd-personnel','1-B-3，C39及9中类人员合计、全时当量列')],conditions=['不强行将子项归一到父项。','整数人员差额不自动归因于四舍五入。']),
 dict(id='ia-official-2024-vintage',country='cn',section='official',nodeIds=node_ids,period='2024年全年；2025年鉴版',title='2024年度经营数据已有较晚版本',body='中国统计年鉴2025列C39营收164047.1亿元、利润6822.1亿元、平均用工934.5万人。较早工信部快报营收161900亿元、利润6408亿元保留作版本对照；不能将差额或跨版本金额之比解释为可比增长。',evidenceKind='fact',evidence=[ev('prior-yearbook2025-c13-02','表13-2（2024年），C39行，营业收入、利润总额、平均用工人数列及完整表头'),ev('miit2024','第三节，2024全年营业收入、利润总额句')],conditions=['年鉴原图没有增加值列；该表无法补成2024细分现价增加值。','原表未给修订原因，不将较晚版本称为最终核实数。','研发公报强度2.95%保留自身来源分母，不能除以另版年鉴收入改写。']),
]

coverage_rows=[
 ('annual-national','国家年度/季度GDP及新版国家数据','2024—2026','obtained','前轮已实际读大类增加值及年度/季度表；本次审计读取其原件核查记录，不重复计为新增细分。',None,'保持整套修订，等待下一版新增细类；当前缺少的行业金额仍留空。'),
 ('yearbook-industrial','中国统计年鉴2025工业表13-2','2024','obtained','前轮下载原图，本轮重新目视完整表头并实际录入C39的14项经营/用工数据；晚于MIIT快报的年度营收、成本、利润采用年鉴值。没有增加值列。',None,'继续取得其他年份/细类；保留发布版本差异，不用跨版金额重算可比增长。'),
 ('census-finance','五经普年鉴C39中类财务','2023','obtained','本轮取得1-A-6原图，目视C39和9中类营收、利润、平均用工、资产等；全国C39与统一地区表总项一致。','census2023-detailed','继续核查细类和相关年份，保持企业行业口径。'),
 ('census-rd','五经普研发人员及经费','2023','obtained','已取得1-B-3、1-C-1.3并目视C39和9中类；父子小差额未解释，保留原值。','census2023-rd-expense','核对父子经费、人数和人年差额的来源，不强平。'),
 ('io-components','全国投入产出四分项','2023','obtained','现有211项结构摘录，本次重新读取9个电子产品的45个值；负税和超过100%比例属原表。','io2023-independent-dom','取得产品/企业行业及GDP衔接说明；不直接配企业人数。'),
 ('miit-annual','工信部电子行业年度运行稿','2024—2025','obtained','本轮归档实物产品、出口及官方可比同比；2024营收、成本、利润快报金额已有较晚年鉴版，仅保留版本对照。2025仍用本次取得的年度运行稿。','miit2025','继续核查后续年度表更新；保留发表批次及官方可比同比，不用相邻发布金额重算同比。'),
 ('latest-2026','2026最新已核全国经营及解读','2026年1—7月','obtained','NBS8月27日金额表和利润解读、MIIT8月31日稿已读；东北月度异常已隔离。','nbs2026-07-financial','有更晚发布再更新，并核查异常是否修订。'),
 ('rd-latest','国家科技经费行业表','2024','obtained','2024公报有C39研发4775.5亿元、强度2.95%；本轮未取得2025行业详表。','nbs2024-rd','在正式发布2025行业详表后更新，缺值不外推。'),
 ('miit-yearbook','工信部2024年度统计数据内表','2024','pending','编辑说明已读，证实统计对象和主要经济指标来源；全部内表未系统取得。','miit2024-editor','实际逐表核读可用的细产品、地区产量，不能仅据目录宣称完成。'),
 ('professional-books','统计摘要2026/工业统计年鉴2025','2024—2025候选','pending','前轮已核出版社/图书馆目录，但核心内页未取得；目录不是书内无指标的证明。',None,'取得合法可读内页和表注。'),
 ('census-other-tables','经济普查其他经营及研发详表','2023','not-checked','当前C39实读三张核心表；完整目录其余细分、所有权、新产品、产能表尚未逐表分析。','census2023-directory','按新增问题筛选有价值表，不宣称整个年鉴已充分探索。'),
 ('customs-details','海关HS细分/出口额与量价','2024—2026','pending','已采用工信部转引的海关产品数量；未取得同产品HS完整金额、数量与统计范围衔接。','miit2025','直接读取海关细表，拆量价、贸易方式，先核HS与行业映射。'),
 ('local-statistics','省市统计局及主管部门全部资料','2023—2026','not-checked','本审计负责国家级资料；地方研究独立进行，不能据取得一张全国地区表声称每省所有资料查完。',None,'合并地区研究的逐省覆盖清单。'),
]
coverage=[]
for id,title,period,status,detail,source,next_step in coverage_rows:
    coverage.append(dict(id='ia-official-coverage-'+id,country='cn',group='全国官方资料',title=title,period=period,status=status,detail=detail,evidence=[ev(source,'本轮保存原件与对应表/编辑说明，详见来源')] if source else [],nextStep=next_step))
    if id=='annual-national':
        coverage[-1]['evidence']=[
            ev('prior-gdp2024-final','附件1：2024年GDP最终核实数，现价总量列全部行业行'),
            ev('prior-gdp2025-preliminary','表1：2025年四季度和全年GDP初步核算数据，绝对额全年列及核算说明'),
            ev('prior-nbs-annual-dom','年度→国民经济核算→分行业增加值，2021—2025列与全部10个指标行，归档rows/labels'),
            ev('prior-nbs-quarter-dom','季度→国民经济核算→国内生产总值（现价），2026Q2/2026Q1及2025各季，当季/累计行与表注')]
    if id=='yearbook-industrial':
        coverage[-1]['evidence']=[ev('prior-yearbook2025-c13-02','表13-2原图完整表头及41大类行：资产、营收、成本、利润、平均用工等；无增加值列')]
(ROOT/'coverage-matrix.json').write_text(json.dumps(dict(checkedAt='2026-09-14',scope='按资料入口审计，非全部官方网站穷尽检索',rows=coverage),ensure_ascii=False,indent=2))
(ROOT/'panel-data.json').write_text(json.dumps(dict(sources=sources,comparisons=comparisons,findings=findings,coverage=coverage),ensure_ascii=False,indent=2))
anomalies=[
 dict(id='miit-ne-july2026',status='quarantined-for-derived-trends',sourceIds=['ia-official-miit2026-06','ia-official-miit2026-07'],periods=['2026-01/2026-06','2026-01/2026-07','2026-07'],values=[441,369,-72],unit='亿元人民币',locator='两期第五节东北地区营收',issue='前7月低于前6月，单7月为负但同时报告正同比；没有取得可比调整说明。',decision='存档原值，不发表东北月度增量/份额/趋势，不改写或推测纠正值。'),
 dict(id='census-rd-residual',status='unresolved-retain-source-values',sourceIds=['ia-official-census2023-rd-personnel','ia-official-census2023-rd-expense'],periods=['2023'],values=[-1641,-59,-41],unit='分别为万元、人员、人年',locator='C39九个中类求和减C39父项',issue='目视原图后的未解释差额，不是OCR自动入库。',decision='保留单行数值和差额，暂不将图作完全加总平衡分解。'),
 dict(id='release-vintage-growth',status='separate-comparable-growth-from-levels',sourceIds=['ia-official-miit2024','ia-official-miit2025'],periods=['2024','2025'],values=[12.5,12.7,-0.9],unit='前两项亿台；第三项%',locator='第一节智能手机产量与官方同比',issue='两次发布绝对量之比与官方可比同比不一致，缺少同基期修订值。',decision='分别保留官方原量与同比，不用商改写增长率，不擅自判定原文错误。'),
 dict(id='c39-2024-annual-vintage',status='prefer-later-yearbook-retain-early-release',sourceIds=['ia-official-miit2024','ia-official-prior-yearbook2025-c13-02'],periods=['2024'],unit='亿元人民币',locator='MIIT第三节全年金额；中国统计年鉴2025表13-2 C39行',values={'revenue':[161900,164047.1],'cost':[141100,142437.9],'profit':[6408,6822.1]},issue='同一2024年，两次发布的营收、成本、利润有差异；年鉴未给差异的细项修订原因。',decision='2024历史经营金额采用较晚年鉴；旧快报保留并标识版本，不拼接求可比增长，不改写官方同比。')]
(ROOT/'anomalies.json').write_text(json.dumps(anomalies,ensure_ascii=False,indent=2))
print('panel:',len(sources),'sources;',len(comparisons),'comparisons;',len(findings),'findings;',len(coverage),'coverage rows')
