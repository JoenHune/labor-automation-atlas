"""Adapter to the site's shared EmploymentDataset; each model scenario stays auditable."""
from pathlib import Path
import json,copy,hashlib
P=Path(__file__).resolve().parent;ROOT=P.parents[2]
def r(path):return json.loads((ROOT/path).read_text())
raw=r('research/employment/cn-products/observations.json')['records'];raw_by={x['nodeId']:x for x in raw}
inputs=r('research/employment/cn-products/model-inputs.json');pools={p['id']:p for p in inputs['pools']}
products={x['code']:x for x in r('research/macro/cn-io-2023-extract.json')['rows']}
inv={n['nodeId']:n for n in r('research/employment/node-inventory.json')['records'] if n['basis']=='cn-io2023' and n['country']=='cn'}
sources=r('research/employment/cn-products/sources.json')['sources']+r('research/employment/cn-industry/sources.json')+r('research/macro/structures.json')['sources']
sources.append({'id':'emp-cn-products-model-inputs','country':'cn','kind':'other','title':'2023产品就业估算：2020住户结构、2023普查替代情景及产品劳动报酬池','publisher':'人力与自动化图谱研究项目','url':'https://github.com/JoenHune/labor-automation-atlas/blob/main/research/employment/cn-products/model-inputs.json','published':'2026-09-14','retrieved':'2026-09-14','archive':'research/employment/cn-products/model-inputs.json','sha256':hashlib.sha256((P/'model-inputs.json').read_bytes()).hexdigest(),'limitations':['这是本项目模型和输入清单，不是官方产品就业统计。','行业就业校准与产品劳动报酬分配都需要假设；方法情景范围不是统计置信区间。']})
normalized=[]
for s in sources:
 s=copy.deepcopy(s)
 if s['kind']=='official-methodology':s['kind']='standard'
 s.setdefault('limitations',[])
 if s['id'].startswith('emp-cn-products-') and not s['limitations']:s['limitations']=['仅用于所定位章节和分类信息；不能据此声称已有官方产品就业人数。']
 normalized.append(s)
sources=list({s['id']:s for s in normalized}.values())
def evunique(e):return list({(x['sourceId'],x['locator']):x for x in e}.values())
FIELDS={'main':'employmentPersons','alternative':'alternativeCensusCalibratedPersons','census':'referenceCensusPersons'}
POOL_FIELDS={'main':'employmentPersons','alternative':'alternativeCensusCalibratedPersons','census':'referenceCensusWeightPersons'}
def measure(row,kind='main'):
 codes=row['memberCodes'];one=len(codes)==1 and row['nodeId'].removeprefix('cn-io-') in products
 val=row[FIELDS[kind]];assert val is not None
 main=kind=='main';original=kind=='census';has_primary=any(int(c[:2])<5 for c in codes)
 if main:
  definition=row['employmentDefinition'];coverage='中国大陆全社会就业；2023三次产业官方年末控制量，2020人口普查住户行业份额、2023产品劳动者报酬条件分配'
  model_basis=row['modelBasis'];assumptions=row['assumptions'];evidence=row['evidence']
 else:
  definition='2023年末普查就业权重按产品活动归属（模型，非产品就业实测）' if original else '以2023单位及个体普查行业权重校准至同年全社会三产业总量，再按产品劳动者报酬归属的替代情景'
  coverage='中国大陆；2023经济普查法人及个体覆盖的模型归属，未校准全社会人数' if original else '2023全社会控制总量；二三产业改用2023普查模型权重，第一产业如涉及则保持主模型'
  model_basis='2023年普查结构 · 2023年报酬分配' if not has_primary else '2023年普查结构 · 第一产业沿用2020年结构'
  assumptions=row['assumptions'][:2]+[row['assumptions'][4]]+row['alternativeAssumptions']
  assumptions+=['这是替代口径/方法对照，不能解释为产品就业实测；个体在大类之间按法人就业份额分配缺少直接观察。']
  if original:assumptions+=['未对齐劳动力调查全社会就业；不能将普查法人、个体就业权重当作同范围全部自然人人数。']
  evidence=row['alternativeEvidence']
 m={'value':val,'year':2023,'denominatorKind':'persons','periodBasis':'year-end','status':'estimated','modelBasis':model_basis,'definition':definition,'coverage':coverage,'releaseDate':None,'revision':'2026-09-14研究估算；官方输入发布日期见来源，模型不标为官方修订','evidence':evunique(evidence+[{'sourceId':'emp-cn-products-model-inputs','locator':'pools 中 '+', '.join(row['modelInputIds'])}])}
 if one:
  p=pools[row['modelInputIds'][0]];code=codes[0];poolval=p[POOL_FIELDS[kind]]
  pool_evidence=p['evidence'] if main else p['alternativeEvidence']
  label={'main':'住户结构校准后的行业人数池（估算）','alternative':'普查结构校准后的行业人数池（替代情景）','census':'未校准全社会的普查就业权重池（估算）'}[kind]
  calc={'methodId':'cn-io2023-'+kind+'-labor-compensation-share','label':'同一产品池按劳动者报酬份额归属就业','expression':'产品就业 = 行业就业池 × 产品劳动者报酬 ÷ 产品池劳动者报酬合计','operation':'share','inputs':[
   {'id':p['id']+'-'+kind,'label':label,'value':poolval,'unit':'人','evidence':evunique(pool_evidence+[{'sourceId':'emp-cn-products-model-inputs','locator':'pools[id='+p['id']+']：industryCalibrationInputs/alternativeIndustryCalibrationInputs、就业池及控制总量'}])},
   {'id':'cn-io2023-lc-'+code,'label':products[code]['name']+'劳动者报酬','value':products[code]['components'][0],'unit':'万元人民币','evidence':[{'sourceId':'macro-cn-io2023-211','locator':'VA001劳动者报酬行，'+code+' '+products[code]['name']+'列'}]},
   {'id':p['id']+'-lc','label':'同池全部产品劳动者报酬合计','value':p['laborCompensationWanCny'],'unit':'万元人民币','evidence':[{'sourceId':'macro-cn-io2023-211','locator':'VA001劳动者报酬行；'+', '.join(p['productCodes'])+'列求和'}]},
  ],'assumptions':assumptions}
 else:
  calc={'methodId':'cn-io2023-sum-disjoint-product-employment-'+kind,'label':'互不重叠的末级产品就业估算相加','expression':'本节点就业 = 同一方法下所有末级产品就业估算之和；每个产品仅加一次','operation':'sum','inputs':[],'assumptions':assumptions}
  for code in codes:
   child=raw_by['cn-io-'+code]
   calc['inputs'].append({'id':child['id']+'-'+kind,'label':child['name']+'就业估算','value':child[FIELDS[kind]],'unit':'人','evidence':evunique((child['evidence'] if main else child['alternativeEvidence'])+[{'sourceId':'emp-cn-products-model-inputs','locator':'pools[id='+child['modelInputIds'][0]+']；按该池VA001份额分到'+code}])})
 m['calculation']=calc
 if main and row['sensitivity']['hasScenarioSensitivity']:
  m['sensitivity']={'lower':min(val,row['employmentLowPersons']),'upper':max(val,row['employmentHighPersons']),'label':row['sensitivity']['label'],'assumptions':['分别用完整的2020住户主模型、2023普查替代模型计算，不逐池挑选偏大或偏小的行业结构。','每个方法下，选中产品集合的人均报酬相对同池其余产品设为0.5—2倍；第一产业替代情景维持住户结构。','父项按池内选中集合重新归一化，不能相加互不兼容的叶子极端值。','这是两种有限方法与指定报酬假设的情景包络；不包含全部抽样误差、年份结构变化或产品就业桥误差，不能解释为置信区间。']}
 return m
records=[]
for row in raw:
 n=inv[row['nodeId']];refs=[]
 if row['hasAlternativeIndustryStructure']:refs.append({'label':'2023普查行业结构替代情景（同一全社会控制总量）','measure':measure(row,'alternative')})
 if row['referenceCensusPersons'] is not None:refs.append({'label':'普查就业归属估算（未经全社会控制总量校准）','measure':measure(row,'census')})
 rec={'id':row['id'],'country':'cn','basis':'cn-io2023','nodeId':row['nodeId'],'nodeName':n['name'],'year':2023,'valueAddedAnchor':{'baseValue':n['valueAddedBase'],'currency':n['currency'],'coverage':n['coverage']},'employment':measure(row),'pairing':{'status':'incompatible' if row['ratioStatus']=='scope-limited' else 'proxy','explanation':row['ratioUnavailableReason'] or '2023产品现价增加值与按2020住户行业结构、2023产品劳动者报酬归属的就业估算之比；未取得官方产品就业桥矩阵。','comparisonGroup':None if row['ratioStatus']=='scope-limited' else 'cn-products-calibrated'},'references':refs,'notes':row['assumptions']+[row['sensitivity']['label']],'gap':''}
 records.append(rec)
out={'version':'2026-09-14.preview-18','checkedAt':'2026-09-14','sources':sources,'records':records}
(P/'dataset.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print('dataset',len(records),'sources',len(sources),'references',sum(len(r['references']) for r in records))
