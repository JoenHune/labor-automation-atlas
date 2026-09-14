"""Rebuild the C39 official analysis from visually checked official table cells.

Image transcriptions deliberately remain explicit. OCR files are navigation aids,
never the numeric source. Run from the repository root.
"""
from pathlib import Path
import hashlib
import json
from html.parser import HTMLParser

ROOT = Path(__file__).resolve().parent

class Text(HTMLParser):
    def __init__(self):
        super().__init__(); self.skip = 0; self.parts = []
    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'): self.skip += 1
    def handle_endtag(self, tag):
        if tag in ('script', 'style'): self.skip -= 1
    def handle_data(self, data):
        if not self.skip and data.strip(): self.parts.append(data.strip())

for path in (ROOT / 'originals').glob('*.html'):
    parser = Text(); parser.feed(path.read_bytes().decode('utf-8-sig', errors='replace'))
    path.with_suffix('.txt').write_text('\n'.join(parser.parts))

manifest = json.loads((ROOT / 'source-manifest.json').read_text())
sources = {item['id']: item for item in manifest}
# This original was downloaded in the earlier annual-table work and was read
# again in full for the present C39 analysis. Reuse its archive and checked hash.
prior_manifest=json.loads((ROOT.parents[2]/'research/annual-2024-2025/cn-industry/source-manifest.json').read_text())['sources']
yearbook=next(s for s in prior_manifest if s['id']=='yearbook2025-C13-02')
yearbook_path='research/annual-2024-2025/cn-industry/'+yearbook['archive']
assert hashlib.sha256((ROOT.parents[2]/yearbook_path).read_bytes()).hexdigest()==yearbook['sha256']
sources['prior-yearbook2025-c13-02']=dict(id='prior-yearbook2025-c13-02',url=yearbook['url'],path=yearbook_path,sha256=yearbook['sha256'],bytes=(ROOT.parents[2]/yearbook_path).stat().st_size,retrievedAt='2026-09-14',artifactType='前轮原始JPG；本轮重新目视完整表头和C39行')
dates = {'miit2024': '2025-02-06', 'miit2025': '2026-01-30',
         'miit2026-06': '2026-07-31', 'miit2026-07': '2026-08-31',
         'census2023-industrial': '2024-12-26', 'census2023-rd': '2024-12-26',
         'nbs2024-rd': '2025-09-29', 'nbs2026-07-financial': '2026-08-27',
         'nbs2026-07-commentary': '2026-08-27', 'nbs-va-overview': '2024-09-09'}
for source in sources.values():
    source['releaseDate'] = dates.get(source['id'])
    source['releaseMonth'] = '2025-03' if source['id'] in ('census2023-detailed', 'census2023-rd-personnel', 'census2023-rd-expense', 'census2023-editor', 'census2023-indicator') else None
    source['revisionStatus'] = '官方公开版本，页面未另列修订状态；不推定未经修订'
sources['prior-yearbook2025-c13-02']['revisionStatus']='中国统计年鉴2025所列2024年度版本，晚于工信部2024年度快报；原图未明确修订原因，不称为最终核实数'
sources['miit2024']['revisionStatus']='2025-02-06发布的2024年度运行快报；营收、成本、利润已有较晚年鉴数，保留作发布版本对照，非最新历史金额'

# All numeric columns below have been inspected in Ba1-A-06.jpg and the retained
# header/C39 crops. The first line is a parent and MUST NOT be added to children.
# code, label, enterprise count, assets, fixed assets net, revenue, costs,
# total profit, average workers (10,000 persons), original image y coordinate
finance = [
    ['C39','计算机、通信和其他电子设备制造业',27776,190719.96,34643.50,152540.26,131787.35,7599.38,921.32,23443],
    ['C391','计算机制造',2989,16621.35,1383.68,22846.78,21025.09,613.67,105.30,23475],
    ['C392','通信设备制造',2404,47117.92,3136.77,44407.59,37159.26,3398.21,184.10,23699],
    ['C393','广播电视设备制造',620,2052.02,426.82,1576.59,1271.85,108.88,13.62,23795],
    ['C394','雷达及配套设备制造',165,1289.51,140.10,461.29,359.27,8.03,4.71,23987],
    ['C395','非专业视听设备制造',1143,5562.61,541.31,6585.51,5894.97,189.41,36.16,24019],
    ['C396','智能消费设备制造',1828,7470.91,1055.24,8243.22,7115.06,272.38,51.48,24147],
    ['C397','电子器件制造',6426,61588.52,17544.28,29879.90,26036.22,530.04,204.13,24339],
    ['C398','电子元件及电子专用材料制造',10581,44850.72,9993.84,35352.04,30393.15,2256.63,288.79,24595],
    ['C399','其他电子设备制造',1620,4076.39,421.46,3187.35,2532.49,222.13,33.05,24819],
]
# R&D expense is 10,000 yuan; personnel headcounts and FTE person-years are
# distinct. Do not divide FTE by average headcount to call it a worker share.
rd = [
    ['C39',43927705,1088924,875515],
    ['C391',3406201,114997,91337], ['C392',15916052,282809,244216],
    ['C393',480527,18872,15298], ['C394',259544,7559,5793],
    ['C395',1228124,38012,31154], ['C396',2136600,69677,55991],
    ['C397',11232092,245315,194906], ['C398',8057518,272970,207164],
    ['C399',1209406,38654,29615],
]

observations = []
def add(id, label, value, unit, source_id, locator, period='2023', frequency='annual', scope='中国大陆规模以上工业企业法人单位，GB/T 4754—2017 C39', sector='C39', kind='direct-fact', formula=None, inputs=None):
    source = sources[source_id]
    observations.append(dict(id=id, country='cn', sector=sector, period=period, frequency=frequency,
        label=label, value=value, unit=unit, scope=scope, priceBasis='财务/实物指标原口径，不是增加值',
        releaseDate=source.get('releaseDate'), releaseMonth=source.get('releaseMonth'),
        revisionStatus=source['revisionStatus'], sourceId=source_id, sourceUrl=source['url'],
        sourceLocator=locator, sourcePath=source['path'], sourceSha256=source['sha256'],
        evidenceType=kind, formula=formula, inputIds=inputs or []))

nodes = []
for row, r in zip(finance, rd):
    code,name,count,assets,fixed,revenue,cost,profit,workers,y = row
    assert code == r[0]
    loc = f'1-A-6，{name}行；原图y={y}附近，列名见census2023-detailed-header.png'
    fields = [('enterpriseCount', '企业单位数', count, '个'), ('assets', '资产总计', assets, '亿元人民币'),
              ('fixedAssetsNet', '固定资产净额', fixed, '亿元人民币'), ('revenue', '营业收入', revenue, '亿元人民币'),
              ('cost', '营业成本', cost, '亿元人民币'), ('profit', '利润总额', profit, '亿元人民币'),
              ('averageWorkers', '平均用工人数', workers, '万人')]
    for key,label,value,unit in fields:
        add(f'{code}-2023-{key}',label,value,unit,'census2023-detailed',loc+'；'+label+'列',sector=code)
    for key,label,value,unit,source,table in [('rdExpense','R&D经费内部支出',r[1],'万元人民币','census2023-rd-expense','1-C-1.3'),
         ('rdPersons','R&D人员合计',r[2],'人','census2023-rd-personnel','1-B-3'),
         ('rdFte','R&D人员折合全时当量',r[3],'人年','census2023-rd-personnel','1-B-3')]:
        add(f'{code}-2023-{key}',label,value,unit,source,f'{table}，{name}行，{label}列',sector=code)
    calcs = [('revenueShare','占C39营业收入',revenue/finance[0][5]*100,'%', '本中类营业收入 / C39营业收入 × 100',[f'{code}-2023-revenue','C39-2023-revenue']),
             ('profitMargin','营业收入利润率',profit/revenue*100,'%', '利润总额 / 营业收入 × 100',[f'{code}-2023-profit',f'{code}-2023-revenue']),
             ('revenuePerWorker','按平均用工计算的人均营业收入',revenue/workers,'万元人民币/人','营业收入（亿元） / 平均用工（万人）',[f'{code}-2023-revenue',f'{code}-2023-averageWorkers']),
             ('rdIntensity','R&D经费/营业收入',r[1]/10000/revenue*100,'%', 'R&D经费内部支出（万元） / 10000 / 营业收入（亿元） × 100',[f'{code}-2023-rdExpense',f'{code}-2023-revenue'])]
    for key,label,value,unit,formula,ids in calcs:
        add(f'{code}-2023-{key}',label,value,unit,'census2023-detailed',loc,sector=code,kind='calculation',formula=formula,inputs=ids)
    nodes.append(dict(id=code,name=name,parentId=None if code=='C39' else 'C39',level='parent' if code=='C39' else 'middle-industry',observationIds=[o['id'] for o in observations if o['sector']==code and o['period']=='2023']))

for label,value,unit,table,key in [('企业法人单位数',17.4,'万个','表3-2','allEnterprises'),('年末从业人员',1047.9,'万人','表3-2','yearEndWorkers'),('资产总计',205083.5,'亿元人民币','表3-3','allAssets'),('营业收入',158580.9,'亿元人民币','表3-3','allRevenue')]:
    add('C39-2023-'+key,label,value,unit,'census2023-industrial',table+'，计算机、通信和其他电子设备制造业行；'+label+'列',scope='中国大陆全部工业企业法人单位C39；人数为2023年末，财务为2023年全年/年末')
add('C39-2024-rdExpense','R&D经费',4775.5,'亿元人民币','nbs2024-rd','附表1，计算机、通信和其他电子设备制造业行，R&D经费列',period='2024')
add('C39-2024-rdIntensity','R&D经费/营业收入',2.95,'%','nbs2024-rd','附表1，C39行，R&D经费与营业收入之比列',period='2024')

# Table 13-2 has no value-added column. All C39 cells below were independently
# read against the original full header, including the different persons unit.
for key,label,value,unit in [
    ('enterpriseCount','企业单位数',29945,'个'),('assets','资产总计',209411.2,'亿元人民币'),
    ('currentAssets','流动资产合计',128333.3,'亿元人民币'),('receivables','应收账款',46566.7,'亿元人民币'),
    ('inventories','存货',22698.1,'亿元人民币'),('finishedGoods','其中：产成品',7874.6,'亿元人民币'),
    ('liabilities','负债合计',115009.9,'亿元人民币'),('revenue','营业收入',164047.1,'亿元人民币'),
    ('cost','营业成本',142437.9,'亿元人民币'),('sellingExpense','销售费用',3314.4,'亿元人民币'),
    ('managementExpense','管理费用',12435.8,'亿元人民币'),('financialExpense','财务费用',265.5,'亿元人民币'),
    ('profit','利润总额',6822.1,'亿元人民币'),('averageWorkers','平均用工人数',934.5,'万人')]:
    add(f'C39-2024-yearbook-{key}',label,value,unit,'prior-yearbook2025-c13-02',
        f'表13-2（2024年），计算机、通信和其他电子设备制造业行，{label}列；原图表头单位亿元、企业数个、平均用工万人；注管理费用包含研发费用',period='2024')

# These are release-vintage observations. Reported comparable-basis growth is
# retained separately; it must not be regenerated by dividing different vintages.
for year,values in [('2024',[161900,141100,6408,7.3,3.4,11.8,12.0,4.0]),('2025',[174000,151000,7509,7.4,19.5,10.6,-3.8,4.3])]:
    keys=[('revenue','营业收入','亿元人民币','三'),('cost','营业成本','亿元人民币','三'),('profit','利润总额','亿元人民币','三'),('revenueGrowth','营业收入同比','%','三'),('profitGrowth','利润总额同比','%','三'),('realVaGrowth','增加值实际同比','%','一'),('investmentGrowth','固定资产投资同比','%','四'),('profitMargin','官方营业收入利润率','%','三')]
    for value,(key,label,unit,section) in zip(values,keys):
        add(f'C39-{year}-{key}',label,value,unit,'miit'+year,f'第{section}节，全年指标句',period=year,scope='中国大陆规模以上C39；固定资产投资采用该行业投资统计范围，不能当作规上企业资产增量')
    for product,unit,value,growth in ([('手机','亿台',16.7,7.8),('智能手机','亿台',12.5,8.2),('微型计算机设备','亿台',3.4,2.7),('集成电路','亿块',4514,22.2)] if year=='2024' else [('手机','亿台',15.4,-5.8),('智能手机','亿台',12.7,-0.9),('微型计算机设备','亿台',3.32,-2.9),('集成电路','亿块',4843,10.9)]):
        add(f'product-{year}-{product}-output',product+'产量',value,unit,'miit'+year,'第一节，主要产品中句',period=year,scope='规模以上工业主要产品产量；智能手机为手机子集，各产品不同单位不可相加')
        add(f'product-{year}-{product}-outputGrowth',product+'产量同比',growth,'%','miit'+year,'第一节，主要产品中句',period=year,scope='官方可比口径主要产品产量同比；不能按不同发布批次绝对量重算')
    for product,unit,value,growth in ([('笔记本电脑','亿台',1.43,1.7),('手机','亿台',8.14,1.5),('集成电路','亿块',2981,11.6)] if year=='2024' else [('笔记本电脑','亿台',1.33,-7.1),('手机','亿台',7.51,-7.7),('集成电路','亿个',3495,17.4)]):
        add(f'product-{year}-{product}-export',product+'出口数量',value,unit,'miit'+year,'第二节，据海关统计句',period=year,scope='海关商品出口统计，由工信部转载；不等同境内规上C39企业产出，不直接相除计算出口率')
        add(f'product-{year}-{product}-exportGrowth',product+'出口数量同比',growth,'%','miit'+year,'第二节，据海关统计句',period=year,scope='海关商品出口统计，由工信部转载')

for key,label,value,unit in [('revenue','营业收入',110747.3,'亿元人民币'),('cost','营业成本',93807.4,'亿元人民币'),('profit','利润总额',7057.0,'亿元人民币'),('revenueGrowth','营业收入同比',19.4,'%'),('costGrowth','营业成本同比',16.0,'%'),('profitGrowth','利润总额同比',105.0,'%')]:
    add(f'C39-2026-07-{key}',label,value,unit,'nbs2026-07-financial','表3，计算机、通信和其他电子设备制造业行，对应金额或同比列',period='2026-01/2026-07',frequency='year-to-date')
for key,label,value,unit,section in [('realVaGrowth','增加值实际同比',15.4,'%','一'),('investmentGrowth','固定资产投资同比',7.8,'%','四'),('icOutput','集成电路产量',3342,'亿块','一'),('icOutputGrowth','集成电路产量同比',23.1,'%','一'),('componentOutput','电子元件产量',5.3,'万亿只','一'),('componentOutputGrowth','电子元件产量同比',15,'%','一')]:
    add(f'C39-2026-07-{key}',label,value,unit,'miit2026-07',f'第{section}节，1—7月份指标句',period='2026-01/2026-07',frequency='year-to-date')

claims = [
    dict(id='official-exploration-not-exhausted',kind='research-judgment',text='已有探索不充分。此前已读年度主核算表，但此次仍从官方经济普查年鉴获得可用的C39中类财务、平均用工和研发数据；地方资料与专业年鉴覆盖还不完整。',evidence=['census2023-detailed','census2023-rd-personnel','census2023-rd-expense'],locator='1-A-6、1-B-3、1-C-1.3；coverage-matrix.json'),
    dict(id='latest-growth-concentrated',kind='attributed-official-analysis',text='国家统计局2026年1—7月解读称，集成电路行业利润同比增长18.5倍，对电子行业利润增长贡献超过八成；这是利润增量贡献，不是行业利润金额占比，也不证明每家企业都增长。',sourceId='nbs2026-07-commentary',locator='电子相关行业利润高速增长段'),
    dict(id='output-divergence-2025',kind='research-judgment',text='2025年手机与微型计算机产量同比下降，集成电路产量及出口数量增长，电子设备行业内部方向分化；不能把C39整体增长解释为所有产品同步增长。',inputIds=['product-2025-手机-outputGrowth','product-2025-微型计算机设备-outputGrowth','product-2025-集成电路-outputGrowth','product-2025-集成电路-exportGrowth']),
    dict(id='negative-tax-not-extraction-error',kind='direct-fact',text='2023年投入产出原表独立重读确认，计算机整机及广播电视雷达产品部门生产税净额为负，劳动报酬/增加值可超过100%；不按正份额归一，不推断具体补贴政策原因。',sourceId='io2023-independent-dom',locator='39126、39130列 × VA001、VA002、TVA行'),
    dict(id='annual-vintage-2024',kind='direct-fact',text='中国统计年鉴2025的2024年C39营业收入164047.1亿元、营业成本142437.9亿元、利润6822.1亿元、平均用工934.5万人。营收、成本、利润均不同于更早工信部年度快报；历史年度金额优先采用较晚年鉴，旧值保留版本对照，不按两版差额计算经营增长。',sourceId='prior-yearbook2025-c13-02',locator='表13-2，C39行及完整表头'),
]

io = ROOT/'originals/io2023-components-independent-dom.json'
io_data=json.loads(io.read_text())
sources['io2023-independent-dom']=dict(id='io2023-independent-dom',url=io_data['url'],path=str(io.relative_to(ROOT.parents[2])),sha256=hashlib.sha256(io.read_bytes()).hexdigest(),bytes=io.stat().st_size,retrievedAt='2026-09-14',releaseDate=None,revisionStatus='动态网页未列精确发布日期和修订状态',artifactType='本次独立浏览器可见DOM摘录，非原始Excel')
data=dict(schemaVersion=1,title='中国C39官方宏观分析',country='cn',checkedAt='2026-09-14',sources=list(sources.values()),
    classifications={'finance':'GB/T 4754—2017 C39及9个中类，按企业主要活动归类','io':'2023年211产品部门中代码39开头的9项；不能与企业中类一一等同'},
    nodes=nodes,observations=observations,claims=claims,
    caveats=['2023规上中类财务与研发是历史结构，不填补2024/2025现价增加值。',
             '人均营业收入使用同表平均用工，单位万元/人；不是人均增加值或劳动生产率。',
             'R&D会计统计经费不等于财报研发费用；人员合计不等于全时当量。',
             '图书编辑说明日期2025年3月；没有确切公开日，因此releaseDate为null。',
             '不同发布批次金额及名录调整使相邻绝对量的商不必等于官方可比同比；两者均保留原披露。'])
data['caveats'].extend(['C39-2024-yearbook-*为较晚年鉴的年度经营金额；C39-2024-revenue/cost/profit等旧ID保留原快报，不可作为最新历史金额。',
    '2024研发强度2.95%仍保留科技经费公报原值；不能用该经费除以另版年鉴营收重写官方强度，跨表分母版本需核查。'])
(ROOT/'analysis.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
(ROOT/'source-manifest.json').write_text(json.dumps(list(sources.values()),ensure_ascii=False,indent=2))

old=json.loads((ROOT.parents[1]/'macro/cn-io-2023-extract.json').read_text())
io_matches=[]
for item in io_data['c39']:
    previous=next(r for r in old['rows'] if r['code']==item['code'])
    vals=[c['value'] for c in item['components']]
    assert vals[:4]==previous['components'] and vals[4]==previous['value']
    io_matches.append(dict(code=item['code'],matchesPrior=True,componentSumMinusVa=sum(vals[:4])-vals[4]))
audit=dict(checkedAt='2026-09-14',sourceHashesValid=all(hashlib.sha256(Path(s['path']).read_bytes()).hexdigest()==s['sha256'] for s in sources.values()),
    scope='C39官方已摘录字段、已保存原件、9个产品四分项独立复核；不声称全国地方资料已穷尽',
    independentIoChecks=io_matches,
    financeChildrenMinusParent={k:round(sum(r[i] for r in finance[1:])-finance[0][i],6) for k,i in [('enterpriseCount',2),('revenue',5),('cost',6),('profit',7),('averageWorkers',8)]},
    rdChildrenMinusParent={'expense10000Cny':sum(r[1] for r in rd[1:])-rd[0][1],'persons':sum(r[2] for r in rd[1:])-rd[0][2],'ftePersonYears':sum(r[3] for r in rd[1:])-rd[0][3]},
    rdReconciliation='原表数值已目视复核，细项合计仍与总项存在差额；不得强平，也不能在没有依据时将整数人数差额解释为舍入。保留差额作为待核。',
    observations=len(observations),nodes=len(nodes))
(ROOT/'validation.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2))
print(json.dumps(audit,ensure_ascii=False,indent=2))
