"""Build this bounded reading package; never mutate the frozen regions module."""
from pathlib import Path
import json, hashlib, copy

P=Path(__file__).resolve().parent
ROOT=P.parents[3]
DAY='2026-09-14'
PREFIX='research/industry-analysis/deep-reading/priority-regions/'
NODES=['cn-io-group-39','cn-gbt2017-39']
receipts=[json.loads(x) for x in (P/'fetch-log.jsonl').read_text().splitlines()]
urls={r['id']:r['url'] for r in receipts if r['success']}
sources=[]; observations=[]; logs=[]; comparisons=[]; findings=[]; coverage=[]

def dump(name,value):
    (P/name).write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')

def source(id,title,publisher,file,period,url=None,published=None,limitations=None,edition=None):
    value={'id':id,'title':title,'publisher':publisher,'url':url or urls[file],
      'published':published,'retrieved':DAY,'country':'cn','kind':'official-statistics',
      'archive':PREFIX+'originals/'+file,'sha256':hashlib.sha256((P/'originals'/file).read_bytes()).hexdigest(),
      'evidencePeriod':period,'readStatus':'本轮指定目标已实际读取，具体范围见read-log；非全书阅读',
      'limitations':limitations or []}
    if published is None:value['publishedLabel']=f'{edition}版；目标内表未注明独立发布日期' if edition else '目标内表未注明独立发布日期'
    if edition:value['dates']=[{'kind':'document-version','value':str(edition),'note':'年鉴版次；不是数据年度或精确上线日期'}]
    sources.append(value);return id

def ev(id,locator):return {'sourceId':id,'locator':locator}

def log(id,region,edition,period,table,read,unread,evidence,status='obtained',notes=None):
    logs.append({'id':id,'region':region,'edition':edition,'dataPeriod':period,'tableOrPages':table,
      'status':status,'actuallyRead':read,'notRead':unread,'evidence':evidence,'checkedAt':DAY,'notes':notes or []})

metricUnits={'revenue':'亿元人民币','profit':'亿元人民币','assets':'亿元人民币','cost':'亿元人民币',
 'gross-output':'亿元人民币','liabilities':'亿元人民币','enterprise-count':'个','loss-enterprise-count':'个',
 'average-workers':'万人','average-employment':'万人','yearend-employment':'万人'}
metricNames={'revenue':'营业收入','profit':'利润总额','assets':'资产总计','cost':'营业成本','gross-output':'工业总产值',
 'liabilities':'负债合计','enterprise-count':'企业单位数','loss-enterprise-count':'亏损企业单位数',
 'average-workers':'平均用工人数','average-employment':'从业/就业人员年度平均人数','yearend-employment':'期末从业人员'}
def obs(region,period,metric,value,sourceId,locator,scope,edition=None,unit=None,notes=None):
    u=unit or metricUnits[metric]; money='元' in u and '%' not in u
    s=next(s for s in sources if s['id']==sourceId)
    item={'id':f'deep-region-{region}-{period}-{metric}'+(f'-yb{edition}' if edition else ''),
      'country':'cn','industryId':'cn-gbt2017-39','period':period,'frequency':'annual',
      'measure':'revenue' if metric=='revenue' else 'other','priceBasis':'current' if money else 'not-applicable',
      'value':value,'unit':u,'currency':'CNY' if money else None,'annualized':False,
      'seasonalAdjustment':'not-applicable','releaseDate':s['published'],
      'publicationDateNote':s.get('publishedLabel','来源页明确标注日期'),
      'revision':f'{edition}版年鉴披露原值；未把跨版现值差额解释为可比增长' if edition else '本次读取的官方原表；未见目标行独立修订说明',
      'coverage':scope,'evidence':[ev(sourceId,locator)],'evidenceKind':'fact','label':metricNames.get(metric,metric),
      'regionId':region,'metric':metric,'edition':edition,'notes':notes or []}
    observations.append(item);return item

# Every number here has been read from the specified table, including headers and units.
regions={
 'bj':{'name':'北京','publisher':'北京市统计局','table':'12-5','file':'bj-2025-c1205.xls','oldfile':'bj-2024-c12-05.xls',
   'locator':'Sheet1 第46—47行C39；B企业数/E平均用工/Q收入/R成本/F资产/W利润；表头第3—8行，金额万元、人数人',
   'values':{'enterprise-count':350,'average-workers':10.8866,'revenue':6317.514,'cost':5478.922,'assets':11929.9806,'profit':390.2336,'gross-output':3910.9923},
   'old':{'enterprise-count':334,'average-workers':10.8193,'revenue':5305.4397,'cost':4551.7217,'assets':10551.28,'profit':108.0869,'gross-output':3342.5127},
   'scope':'北京市C39规模以上法人工业企业；年主营业务收入2000万元及以上；GB/T4754-2017。',
   'worker':'平均用工人数 10.8866 万人（原表108866人）。金额原表为万元，本包除以10000转为亿元。'},
 'sh':{'name':'上海','publisher':'上海市统计局','table':'12.1','file':'sh-2025-c1201e.html','oldfile':'sh-2024-c1201e.html',
   'locator':'C1201A标题、C1201C第2行列头、C1201D第40行C39；C1201E第40行第1/2/5/6列：产值/资产/收入/利润，单位亿元',
   'values':{'revenue':5350.30,'assets':9079.76,'profit':119.45,'gross-output':4936.47,'liabilities':4118.08},
   'old':{'revenue':4997.64,'assets':7673.48,'profit':109.43,'gross-output':4611.57,'liabilities':3564.51},
   'scope':'上海市C39规模以上工业企业，表12.1；就业表2.16另为规上工业企业期末人数，不能当年度平均用工。',
   'worker':'另表2.16规上C39期末从业20.69万人；原表未给对应年度平均用工，未计算人均营收。'},
 'js':{'name':'江苏','publisher':'江苏省统计局','table':'11-6','file':'js-2025-11-6-selected-dom.json','oldfile':'js-2024-11-6-selected-dom.json',
   'url':'https://tj.jiangsu.gov.cn/2025/nj11/nj1106.htm','oldurl':'https://tj.jiangsu.gov.cn/2024/nj11/nj1106.htm',
   'locator':'浏览器实际渲染DOM第83行C39：企业/资产；第187行C39：收入/成本/费用/利润/平均用工；第113、163行列头，单位亿元、万人',
   'oldlocator':'2024版11-6，DOM第59行C39，第3行表头；企业4175、收入23766.82亿元、平均用工151.10万人',
   'values':{'enterprise-count':4500,'average-workers':149.33,'revenue':24930.83,'cost':22231.43,'assets':28455.89,'profit':1042.00,'liabilities':15018.65},
   'old':{'enterprise-count':4175,'average-workers':151.10,'revenue':23766.82,'cost':21049.41,'assets':25926.57,'profit':963.62,'liabilities':13173.30},
   'scope':'江苏C39规上工业统计；工业章说明明确2021年起包括年主营收入2000万元及以上工业法人单位和个体经营户。',
   'worker':'平均用工人数149.33万人。江苏统计范围明确含符合门槛的个体经营户，本轮不与仅法人口径组成严格排名。'},
 'zj':{'name':'浙江','publisher':'浙江省统计局','table':'7-5','file':'zj-2025-7-5.html','oldfile':'zj-2024-7-5.html',
   'locator':'嵌入页面的JSON data：C39行；表头第1—2行，企业第2列、资产第5列、收入第9列、利润第15列、平均用工第18列；金额亿元/人数万人',
   'values':{'enterprise-count':2870,'loss-enterprise-count':837,'average-workers':70.34,'revenue':10659.39,'cost':8953.76,'assets':16205.80,'profit':486.92,'gross-output':10109.88,'liabilities':8488.48},
   'old':{'enterprise-count':2553,'loss-enterprise-count':695,'average-workers':64.06,'revenue':9562.68,'cost':7932.44,'assets':14203.03,'profit':599.77,'gross-output':8964.34,'liabilities':7219.68},
   'scope':'浙江省C39规模以上工业企业，表7-5；非私营单位就业表2-22为另一个统计总体。',
   'worker':'平均用工人数70.34万人。非私营C39单位2024年末就业45.23万人另表披露，两数不作相减或替代。'},
 'gd':{'name':'广东','publisher':'广东省统计局','table':'12-11','file':'gd-2025-cd.zip','oldfile':'gd-2024-cd.zip',
   'locator':'官方ZIP内 directory/12/excel/12-11.xls，Sheet1第61行C39；C企业、G资产、I收入、J成本、L利润、O全部就业人员年平均人数；表头第3—10行',
   'values':{'enterprise-count':10574,'average-employment':319.34,'revenue':53787.20,'cost':44065.49,'assets':66064.35,'profit':2944.59,'gross-output':52470.18},
   'old':{'enterprise-count':9966,'average-employment':317.53,'revenue':47689.96,'cost':38846.36,'assets':62221.23,'profit':3628.09,'gross-output':47168.02},
   'scope':'广东省C39规模以上工业企业，官方光盘表12-11；分母为同表全部就业人员年平均人数。',
   'worker':'全部就业人员年平均人数319.34万人。该项保留原指标名称，不改称期末就业。'},
 'cq':{'name':'重庆','publisher':'重庆市统计局','table':'12-6','file':'cq-2025-yearbook.pdf','oldfile':'cq-2024-yearbook.pdf',
   'locator':'PDF第248—255页表12-6；C39名称/企业数见250页，第251页第19数据行平均从业22.26万人；第255页第19数据行收入56770946.5万元、利润1527947.3万元',
   'oldlocator':'PDF第253—260页表12-6；255页C39名称/企业数，第256/260页第19数据行，金额万元、平均从业万人',
   'values':{'enterprise-count':537,'average-employment':22.26,'revenue':5677.09465,'cost':5283.59919,'assets':4199.31116,'profit':152.79473,'gross-output':5568.20592,'liabilities':2346.93154},
   'old':{'enterprise-count':520,'average-employment':24.02,'revenue':5659.76838,'cost':5189.01315,'assets':4436.75007,'profit':229.33222,'gross-output':5775.37253,'liabilities':2606.08799},
   'scope':'重庆C39规模以上工业企业；本章说明规模门槛为年主营业务收入2000万元及以上。',
   'worker':'从业人员平均人数22.26万人。金额原表为万元，本包除以10000转为亿元；利润按中文列名“利润总额”。'},
 'sc':{'name':'四川','publisher':'四川省统计局','table':'14-3','file':'sc-2025-14-03.jpg','oldfile':'sc-2024-14-03.jpg',
   'locator':'整张原图14-3，C39行（电气机械下、仪器仪表上）；企业/资产/营业收入/成本/利润/平均用工列；金额亿元、人数万人',
   'values':{'enterprise-count':1045,'average-workers':42.69,'revenue':8142.46,'cost':7465.81,'assets':8674.13,'profit':213.83,'liabilities':5095.17},
   'old':{'enterprise-count':956,'average-workers':43.35,'revenue':8537.38,'cost':7802.45,'assets':8394.15,'profit':275.22,'liabilities':4872.89},
   'scope':'四川省C39规模以上工业企业，表14-3；平均用工与年末非私营就业表4-7不同。',
   'worker':'平均用工人数42.69万人。4-7就业表只到制造业门类，未据此估计C39从业。'},
}

for r,d in regions.items():
    for edition,file,period,vals in [(2025,d['file'],'2024',d['values']),(2024,d['oldfile'],'2023',d['old'])]:
        sid=f'deep-region-{r}-yb{edition}-c39';d['sid' if edition==2025 else 'oldSid']=sid
        loc=d.get('oldlocator',d['locator']) if edition==2024 else d['locator']
        url=d.get('url' if edition==2025 else 'oldurl')
        if r=='sh':url=f'https://tjj.sh.gov.cn/tjnj/{edition}tjnj/C1201.htm'
        limitations=['只读取工业目标表C39行及表头；未读完本书全部章节。','营业收入、工业总产值、资产均不是增加值。']
        if edition==2024:limitations.append('这是2024版对2023年的历史披露；不替换既有全国五经普表的最新修订2023值，也不用于计算可比增速。')
        if r=='sh':limitations.append('标题、表头、行业名、数字分帧；同版C1201A/C/D/E均已另行保存并列入来源清单。')
        if r=='js':limitations.append('原始直连返回403；保存浏览器实际渲染的目标表头和行，不把截断的整页DOM当完整原件。')
        source(sid,f'{d["name"]}统计年鉴{edition}：{d["table"]} C39主要经济指标（{period}年）',d['publisher'],file,period,url,limitations=limitations,edition=edition)
        for metric,value in vals.items():obs(r,period,metric,value,sid,loc,d['scope'],edition=edition)
        log(f'read-{r}-yb{edition}-industry',d['name'],str(edition),period,d['table'],
          '实际读取标题、金额/人数单位、C39行的企业数及经营/用工列；重庆跨页按同一行序对应，上海读取分帧列头/行名/数值。',
          '其他行业各行、工业篇其他内表、全书其他篇章未逐表逐数读取。',[ev(sid,loc)],notes=limitations)
    notes=[d['worker'],f'资产总计 {d["values"]["assets"]:g} 亿元人民币；利润总额 {d["values"]["profit"]:g} 亿元人民币。',
       '仅展示本地区年度披露值；不组成七地严格同口径排名，不占全国增加值分母。',
       '2024版年鉴中的2023值已另行归档，尚未建立跨版同样本修订桥接，因此这里不显示同比。']
    if 'enterprise-count' in d['values']:notes.append(f'同表企业单位数 {d["values"]["enterprise-count"]} 个。')
    comparisons.append({'id':f'deep-region-{r}-revenue2024','country':'cn','section':'regions','nodeIds':NODES,
      'title':f'{d["name"]}：2024年电子设备制造业营业收入','metric':'revenue','period':'2024','unit':'亿元人民币','currency':'CNY',
      'coverage':d['scope'],'comparisonKey':f'{r}-c39-own-annual-reported-revenue-2024',
      'coverageLabel':f'{d["name"]}单地区 · 2025版年鉴 · 已读取内表',
      'notes':['这是单地区经营数据卡；地区间统计总体与分母定义需逐项核齐后才可另建排行榜。','收入不得代替增加值；未提供人均增加值。'],
      'rows':[{'id':f'cn-region-{r}-2024','name':d['name'],'nodeIds':[],'value':d['values']['revenue'],
        'evidence':[ev(d['sid'],d['locator'])],'releaseDate':None,'revision':'2025版年鉴原表；未注明目标行独立修订日期',
        'notes':notes,'missingReason':None,'url':next(s['url'] for s in sources if s['id']==d['sid'])}]})

# Employment chapter readings. Non-private totals and end-period measures stay separate.
employment=[
 ('bj','bj-2025-c0313.xls','3-13','非私营/私营单位总量及工资；未细分C39。',None,None),
 ('sh','sh-2025-c0216b.html','2.16','表头及第44行C39：期末20.69万人；管理1.36、技术4.72、办事2.04、服务0.39、生产制造12.19万人。',20.69,'上海C39规模以上工业企业，期末从业人员，职业类型分组。'),
 ('js','js-2025-3-14-browser.html','3-14','城镇非私营单位就业年末数；仅到制造业门类，无C39行。',None,None),
 ('zj','zj-2025-2-23.html','2-23','2021—2024年规上单位年末就业；仅到制造业门类，无C39行。',None,None),
 ('zj','zj-2025-2-22.html','2-22','非私营工业/建筑业年末就业；C39行2022/2023/2024分别38.64/41.61/45.23万人。',45.23,'浙江C39非私营单位工业企业，年底就业人数；不同于规上全体单位。'),
 ('gd','gd-2025-04-07.xls','4-7','城镇非私营单位就业人员与在岗职工年末数；第16行制造业，无C39行。',None,None),
 ('cq','cq-2025-yearbook.pdf','3-17（PDF第96页，印刷第74页）','2023—2024城镇非私营单位在岗职工；只有制造业门类，无C39行。',None,None),
 ('sc','sc-2025-04-07.jpg','4-7','2003—2024城镇非私营年末就业；制造业为门类列，未提供C39。',None,None),
]
for r,file,table,read,value,scope in employment:
    sid=f'deep-region-{r}-employment-{table.split("（")[0].replace(".","-")}'
    url=None
    if r=='js':url='https://tj.jiangsu.gov.cn/2025/nj03/nj0314.htm'
    if r=='gd':url=urls['gd-2025-cd.zip']
    if r=='sh':url='https://tjj.sh.gov.cn/tjnj/2025tjnj/C0216.htm'
    source(sid,f'{regions[r]["name"]}统计年鉴2025：就业表{table}',regions[r]['publisher'],file,'2024',url,edition=2025,
      limitations=['就业时点和单位范围按此表独立定义，不作为其他经营表的人均分母。'])
    locator=f'{table}标题、表头及行业行；'+read
    log(f'read-{sid}',regions[r]['name'],'2025','2024',table,read,'未逐项读取就业篇其余所有内表。',[ev(sid,locator)],
      status='obtained' if value is not None else 'checked-no-metric')
    if value is not None:
        item=obs(r,'2024','yearend-employment',value,sid,locator,scope,edition=2025)
        if r=='zj':
            for year,v in [('2022',38.64),('2023',41.61)]:obs(r,year,'yearend-employment',v,sid,locator,scope,edition=2025)
        if r=='sh':
            for key,name,v in [('management','中层及以上管理人员',1.36),('professional','专业技术人员',4.72),('clerical','办事及有关人员',2.04),('service','社会生产服务和生活服务人员',0.39),('production','生产制造及有关人员',12.19)]:
                obs(r,'2024','occupation-'+key,v,sid,locator,scope,edition=2025,unit='万人',notes=[name,'分项取位之和20.70与总量20.69的0.01万人差额未机械调整。'])
    if r in ['sh','zj'] and value is not None:
        regionrow=comparisons[list(regions).index(r)]['rows'][0];regionrow['evidence'].append(ev(sid,locator))

for r in ['gd','zj']:
    file='gd-2024-04-07.xls' if r=='gd' else 'zj-2024-2-25.html'
    sid=f'deep-region-{r}-employment-yb2024'
    source(sid,f'{regions[r]["name"]}统计年鉴2024：就业内表复核',regions[r]['publisher'],file,'2023',
      url=urls['gd-2024-cd.zip'] if r=='gd' else None,edition=2024)
    log(f'read-{sid}',regions[r]['name'],'2024','2023','4-7' if r=='gd' else '2-25','已读标题、范围、行业分组；只有制造业门类，无C39行。','其余就业篇内表未逐项读完。',[ev(sid,'标题、列头及制造业行')],status='checked-no-metric')

# Separately archive decisive methodology sources.
for r,file,url,title,loc in [
 ('bj','bj-2025-industrial-notes.pdf',None,'工业章简要说明','PDF第1页：二、统计范围；三、行业分类；四、历史资料修订'),
 ('js','js-2025-industrial-notes.txt','https://tj.jiangsu.gov.cn/2025/nj11/nj1100.htm','工业章简要说明','二、统计范围；四、数据使用注意事项'),
 ('js','js-2025-industrial-definitions.txt','https://tj.jiangsu.gov.cn/2025/nj11/nj1119.htm','工业章指标解释','平均用工人数定义'),
 ('gd','gd-2025-indicators.html',urls['gd-2025-cd.zip'],'工业章指标解释','工业统计调查单位；全部职工平均人数定义'),
 ('cq','cq-2025-yearbook.pdf',None,'工业章简要说明','PDF第238页、印刷216页，年主营业务收入2000万元门槛')]:
    sid=f'deep-region-{r}-'+('definitions' if '定义' in loc else 'scope')
    source(sid,f'{regions[r]["name"]}统计年鉴2025：{title}',regions[r]['publisher'],file,'2024',url,edition=2025)
    log(f'read-{sid}',regions[r]['name'],'2025','2024',title,loc,'未外推为其他地区的统计制度。',[ev(sid,loc)])
    comparisons[list(regions).index(r)]['rows'][0]['evidence'].append(ev(sid,loc))

censusId=source('deep-region-zj-census2023-official','浙江省第五次全国经济普查公报（第三号）——第二产业基本情况',
 '浙江省统计局、浙江省第五次全国经济普查领导小组办公室','zj-census-third-official.html','2023',published='2025-03-13',
 limitations=['全部工业企业法人单位口径；期末从业，非规模以上年度平均用工。'])
for metric,value,table in [('enterprise-count',13797,'3-2'),('yearend-employment',75.3,'3-2'),('assets',16247.8,'3-3'),('liabilities',8213.9,'3-3'),('revenue',10123.4,'3-3')]:
    obs('zj','2023',metric,value,censusId,f'表{table}“计算机、通信和其他电子设备制造业”行；结构化HTML提取第42/84行',
      '浙江全部C39工业企业法人单位；企业及就业为2023年末，营业收入为2023全年。')
log('read-zj-census-restored','浙江','第五次全国经济普查公报','2023','第三号表3-2、3-3','实际读取C39名称、企业数/年末就业/资产/负债/营业收入及表头单位。',
 '公报其他工业行业行、建筑业表未逐项取数。',[ev(censusId,'表3-2、3-3 C39行')],notes=['先前报纸PDF404；这次从浙江统计局历次普查栏目发现JS跳转到col1229856887，取得官方完整HTML。'])

latestId=source('deep-region-gd-2026-jul','2026年1—7月广东规模以上工业生产运行简况','广东省统计局','gd-2026-jul.html','2026-01—2026-07',published='2026-08-21',
 limitations=['累计实际增加值同比；没有给出当期现价增加值，不据此推算规模。'])
observations.append({'id':'deep-region-gd-c39-growth2026-jul','regionId':'gd','country':'cn','industryId':'cn-gbt2017-39',
 'period':'2026-01—2026-07','frequency':'year-to-date','measure':'real-growth','priceBasis':'constant','value':11.5,'unit':'%','currency':None,
 'annualized':False,'seasonalAdjustment':'unadjusted','releaseDate':'2026-08-21','revision':'本次读取官方月度简况；未见目标数独立修订说明',
 'coverage':'广东规模以上C39工业企业；累计实际增加值同比','evidence':[ev(latestId,'分行业看，计算机、通信和其他电子设备制造业增加值同比增长11.5%；附注指标解释/范围')],
 'evidenceKind':'fact','label':'C39实际增加值同比增长'})
log('read-gd-2026-jul','广东','月度进展','2026-01—2026-07','分行业段落及附注','C39增加值同比11.5%；附注价格缩减法、规上门槛及行业分类。','其他六地2026同期公告本轮未全部读取，未组成最新跨省增速榜。',[ev(latestId,'分行业看及附注1—4')])

def finding(id,title,body,evidence,period='2024',conditions=None,kind='fact'):
    findings.append({'id':id,'country':'cn','section':'regions','nodeIds':NODES,'period':period,'title':title,'body':body,'evidenceKind':kind,
       'evidence':evidence,'conditions':conditions or []})
finding('deep-region-annual2024-obtained','七地已补到2024年度经营原值',
 '北京、上海、江苏、浙江、广东、重庆、四川的2025版年鉴工业内表均已实读C39行；七地2024版对应2023内表也已实读。2024年的营业收入、资产与利润可以作为地区经营背景，但这些金额不等于增加值。',
 [ev(d['sid'],d['locator']) for d in regions.values()],conditions=['只审读目标表，不表示七本年鉴全部章节已审读完。','2024版历史值保留版本，不覆盖原有2023五经普统一地区表。'])
finding('deep-region-scope-and-time','统计范围与就业时点限制跨省比较',
 '江苏工业章明确2021年起纳入符合门槛的工业法人和个体经营户，北京说明使用法人工业企业。上海就业表是期末人数；浙江另有非私营单位期末就业。因范围与时点不同，新取得的2024经营值按地区分别展示，不生成七地人均增加值排名。',
 [ev('deep-region-js-scope','二、统计范围'),ev('deep-region-bj-scope','二、统计范围'),ev('deep-region-sh-employment-2-16','标题及C39行'),ev('deep-region-zj-employment-2-22','标题及C39行')],
 conditions=['年度平均用工、年度平均就业、期末就业保留原指标名。','营业收入除以任何就业数都不是人均增加值。'])
finding('deep-region-zj-census-restored','浙江全部法人数据的缺口已修复',
 '重新定位统计局官方公报后，核实浙江2023年C39工业企业法人13797个、年末从业75.3万人、全年营业收入10123.4亿元；三项由原来的待核空值转为正式值。',
 [ev(censusId,'第三号表3-2、3-3 C39行')],period='2023',conditions=['原报纸PDF仍404；新增证据来自统计局完整HTML，而不是搜索摘要。'])
finding('deep-region-gd-latest2026','广东最新进展已推进到2026年1—7月',
 '广东2026年1—7月规模以上C39增加值同比增长11.5%。这是价格因素经处理后的增长指标，和2024年鉴营收并列用于理解近期方向，不换算为现价增加值。',
 [ev(latestId,'分行业看及附注1')],period='2026-01—2026-07',conditions=['未取得其他六地同期间完整原文，不作同期跨省排名。'])

# Seven individual cards and the exact dated scope of this round.
for r,d in regions.items():
    coverage.append({'id':f'deep-region-{r}-yearbook-inner-tables','country':'cn','group':'地方年鉴实读',
      'title':f'{d["name"]}：2024、2025两版工业C39内表已读','period':'2023—2024','status':'obtained',
      'detail':f'两版{d["table"]}的C39行及表头单位均已读取；2025版就业相关目标表已读。尚未逐表读完全部工业与就业章节。',
      'evidence':[ev(d['sid'],d['locator']),ev(d['oldSid'],d.get('oldlocator',d['locator']))],
      'nextStep':'按需读取市内地区、C39细类及经济效益内表；若构建跨省2024榜，先统一法人/个体范围与用工定义。'})
coverage.append({'id':'deep-region-2026-local-progress','country':'cn','group':'地方最新进展','title':'七地2026最新一期：广东已读，其他六地仍待补齐',
 'period':'2026','status':'pending','detail':'本轮实读广东2026年1—7月原文；未宣称七地2026公告已全部探索完。',
 'evidence':[ev(latestId,'2026年1—7月分行业段落')],'nextStep':'读取其他六地2026最近一期C39公告，并分别标出实际覆盖月份。'})

# Amend full existing records under the parent's integration contract.
old=json.loads((ROOT/'research/industry-analysis/regions/panel-data.json').read_text());amendments=[]
for item in old['comparisons']:
    mapping={'cn-c39-regions-census2023-enterprisecount':(13797,'3-2'),'cn-c39-regions-census2023-workers':(75.3,'3-2'),
      'cn-c39-regions-census2023-revenue':(10123.4,'3-3')}
    if item['id'] not in mapping:continue
    replacement=copy.deepcopy(item);value,table=mapping[item['id']]
    row=next(r for r in replacement['rows'] if r['id']=='cn-region-zj')
    row.update(value=value,missingReason=None,url=next(s['url'] for s in sources if s['id']==censusId),
      evidence=[ev(censusId,f'表{table}C39行，已读取统计局完整HTML原表')],notes=['本轮恢复统计局官方原件并核实；原报纸PDF404不再作为该值唯一证据。'])
    replacement['coverageLabel']='7个重点地区 · 7地已取得 · 2023'
    replacement['notes'][0]='覆盖七个重点地区；浙江原件已从统计局官方HTML恢复，七地目标数据均已取得；不是全国排名。'
    amendments.append({'collection':'comparisons','id':item['id'],'reason':'恢复浙江官方原件，核实此前缺失的同年同口径值；其余六地行保持不变。','replacement':replacement})
for item in old['coverage']:
    if item['id']=='cn-c39-seven-local-census':
        x=copy.deepcopy(item);x.update(title='七个重点地区五经普公报：七地目标值均已取得',
          detail='原有六地数据保持不变；浙江统计局完整公报HTML已取得，表3-2/3-3核实C39全部法人企业数、年末就业、营业收入。',
          nextStep='补其他24省全体法人原表；不能与规上年度平均用工混排。')
        x['evidence'].append(ev(censusId,'表3-2、3-3 C39行'))
    elif item['id'] in [f'cn-c39-region-audit-{r}' for r in regions]:
        r=item['id'].split('-')[-1];d=regions[r];x=copy.deepcopy(item)
        x.update(title=f'{d["name"]}：两版C39工业内表已读，就业与其他内表按需继续',status='obtained',
          detail=f'本轮已实读2024版及2025版{d["table"]}C39经营/用工目标行，另读2025版就业相关内表；七地五经普C39目标值现均已取得。2026最新一期仅广东本轮取得，其他地区待继续；未宣称全书或全站已穷尽。',
          nextStep='核定2024跨省总体差异；继续市内分布、行业细类及2026最新一期原文。')
        x['evidence'] += [ev(d['sid'],d['locator']),ev(d['oldSid'],d.get('oldlocator',d['locator']))]
        if r=='zj':x['evidence'].append(ev(censusId,'表3-2、3-3'))
    else:continue
    amendments.append({'collection':'coverage','id':item['id'],'reason':'由入口检索推进为实际内表阅读；明确已读边界与仍未读部分。','replacement':x})

manifest=[]
for f in sorted((P/'originals').glob('*')):
    if not f.is_file():continue
    row={'file':PREFIX+'originals/'+f.name,'bytes':f.stat().st_size,'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),
      'url':urls.get(f.name),'capture':'download' if f.name in urls else 'browser DOM/text or extracted official ZIP member'}
    if f.name=='js-2025-11-6-browser.html':row['warning']='整页DOM返回被截断，只用于访问诊断；正式数值使用完整目标表头/行的selected-dom.json。'
    manifest.append(row)

dump('sources.json',sources);dump('source-manifest.json',manifest);dump('observations.json',observations)
dump('read-log.json',{'checkedAt':DAY,'scope':'七地2024/2025年鉴C39目标内表、就业相关表、浙江五经普恢复与广东2026进展',
 'notWholeBooksRead':True,'entries':logs,'failedAttempts':[r for r in receipts if not r['success']],
 'unreadAttachments':[{'file':PREFIX+'originals/sc-2025-industrial-definitions.pdf','stage':'PDF文字层提取',
   'reason':'下载成功；pdftotext没有取得可读文字。本轮未进一步逐页图像阅读，不计入已读说明。'}],
 'remaining':['未逐表逐数读完14本年鉴的全部工业、就业章节。','除广东外六地2026最新同期原文未在本轮补齐。','市内地区、C39中小类内表及投入产出更多地区未在本轮推进。']})
dump('panel-data.json',{'version':'2026-09-14.priority-regions-2','checkedAt':DAY,'sources':sources,'distributions':[],
 'comparisons':comparisons,'findings':findings,'coverage':coverage})
dump('amendments.json',amendments)
print(json.dumps({'sources':len(sources),'observations':len(observations),'readEntries':len(logs),'comparisons':len(comparisons),
 'findings':len(findings),'coverage':len(coverage),'amendments':len(amendments)},ensure_ascii=False))
