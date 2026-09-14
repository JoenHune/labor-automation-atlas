"""Allocate household-calibrated employment to IO activities, with explicit alternative scenarios."""
from pathlib import Path
import json,hashlib,math,collections
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def read(p):return json.loads((ROOT/p).read_text())
def save(name,x):(HERE/name).write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n')
def sha(p):return hashlib.sha256((ROOT/p).read_bytes()).hexdigest()
def evunique(es):return list({(e['sourceId'],e['locator']):e for e in es}.values())
cal_path='research/employment/cn-industry/population-calibration.json'
alt_path='research/employment/cn-industry/calibration.json'
cal=read(cal_path);alt=read(alt_path)
io=read('research/macro/cn-io-2023-extract.json');product={r['code']:r for r in io['rows']}
maps=read('research/employment/cn-products/mapping.json')['records']
inventory=[n for n in read('research/employment/node-inventory.json')['records'] if n['country']=='cn' and n['basis']=='cn-io2023']
assert len({n['nodeId'] for n in inventory})==len(inventory)
est={r['code']:r for r in cal['estimates'] if r['year']==2023}
alt_est={r['code']:r for r in alt['estimates'] if r['year']==2023}
control=next(c for c in cal['controls'] if c['year']==2023)
# Pools partition all 211 products. Agriculture now uses the observed 01/02/03/04
# household industry shares, rather than treating seven products as one primary pool.
pool_products=collections.defaultdict(list)
for m in maps:pool_products['+'.join(m['industryDivisions'])].append(m['productCode'])
pools=[]
for key,codes in pool_products.items():
 divs=key.split('+');assert all(d in est for d in divs),(key,divs)
 rows=[est[d] for d in divs];alt_rows=[alt_est[d] for d in divs if d in alt_est]
 assert len(alt_rows) in (0,len(divs)),key
 primary=all(int(d)<5 for d in divs);assert bool(alt_rows)!=primary,key
 persons=sum(r['employmentPersons'] for r in rows)
 alternative=sum(r['employmentPersons'] for r in alt_rows) if alt_rows else persons
 raw=sum(r['censusWeightPersons'] for r in alt_rows) if alt_rows else None
 src=[]
 for r in rows+alt_rows:
  src.extend(r.get('sourceInputIds',[]));src.extend(r.get('inputIds',[]))
  if 'householdSamplePersons' in r:src.append('cn-emp-pop2020-'+r['code'])
  src.extend(r[k] for k in ['legalInputId','populationInputId','sampleInputId','controlId'] if k in r)
 assumptions=list(dict.fromkeys(a for r in rows for a in r['assumptions']))
 alternative_assumptions=list(dict.fromkeys(a for r in alt_rows for a in r['assumptions'])) if alt_rows else ['经济普查不覆盖01—04；替代情景的第一产业维持住户结构主模型，不能当经济普查农业观测。']
 pools.append({'id':'emp-cn-products-pool-'+key+'-2023',
 'key':key,
 'country':'cn',
 'year':2023,
 'productCodes':codes,
 'employmentPersons':persons,
 'alternativeCensusCalibratedPersons':alternative,
 'hasAlternativeIndustryStructure':not primary,
 'referenceCensusWeightPersons':raw,
 'laborCompensationWanCny':sum(product[c]['components'][0] for c in codes),
 'sourceInputIds':list(dict.fromkeys(src)),
 'evidence':evunique(e for r in rows for e in r['evidence']),
 'alternativeEvidence':evunique(e for r in alt_rows for e in r['evidence']) if alt_rows else evunique(e for r in rows for e in r['evidence']),
 'assumptions':assumptions,
 'alternativeAssumptions':alternative_assumptions,
 'industryCalibrationInputs':rows,
 'alternativeIndustryCalibrationInputs':alt_rows})
assert len([c for p in pools for c in p['productCodes']])==211
assert len({c for p in pools for c in p['productCodes']})==211
assert abs(sum(p['employmentPersons'] for p in pools)-control['total']*10000)<1e-5
assert abs(sum(p['alternativeCensusCalibratedPersons'] for p in pools)-control['total']*10000)<1e-5
assert all(p['laborCompensationWanCny']>0 for p in pools)
leaf={}
for p in pools:
 for code in p['productCodes']:
  w=product[code]['components'][0]/p['laborCompensationWanCny']
  leaf[code]={'poolId':p['id'],
 'employmentPersons':p['employmentPersons']*w,
 'alternativeCensusCalibratedPersons':p['alternativeCensusCalibratedPersons']*w,
 'weight':w,
 'referenceCensusPersons':None if p['referenceCensusWeightPersons'] is None else p['referenceCensusWeightPersons']*w}
COMMON=[
 '产品部门与行业单位不是同一个统计对象；假设关联大类的就业可归属到本组产品，尚无副产品劳动流量桥矩阵验证。',
 '在每一大类产品池内，基准情景假设各产品每人劳动者报酬相同，以2023劳动者报酬份额分配人数；没有按增加值份额分人。',
 '主模型用2020人口普查长表的行业就业样本结构，校准到2023全社会三次产业年末就业控制量；固定2020年结构是假设，没有把样本人数直接乘10。',
 '分母为2023年末人数估算，行业结构输入来自2020人口普查长表；不是2023就业结构直接观测，也不是全年平均人数、全时当量或工时。',
 '劳动者报酬包含非工资福利，自雇混合收入还需划分；用它分人是可调整假设。',
 '产品归并不含国际组织97；主行业模型按01—96的国内活动结构重新归一化，97未识别部分不能声称已逐产品调查。',
]
ALLOCATION_LABEL='固定住户结构行业池，产品相对人均劳动者报酬为0.5—2倍的条件情景；不含抽样及行业结构误差。'
SCENARIO_LABEL='方法情景范围：2020住户结构与2023普查结构分别校准，叠加产品相对报酬0.5—2倍假设；不是统计置信区间。'
map_by={r['productCode']:r for r in maps};node_by={n['nodeId']:n for n in inventory};cache={}
def members(n):
 if n['nodeId'] in cache:return cache[n['nodeId']]
 if not n['children']:
  c=n['nodeId'].removeprefix('cn-io-');assert c in product,(n['nodeId'],c);v=[c]
 else:v=[c for child in n['children'] for c in members(node_by[child])]
 assert len(v)==len(set(v)),n['nodeId'];cache[n['nodeId']]=v;return v
records=[]
for n in inventory:
 codes=members(n);selected=set(codes);relevant=[p for p in pools if selected.intersection(p['productCodes'])]
 amount=sum(leaf[c]['employmentPersons'] for c in codes);alt_amount=sum(leaf[c]['alternativeCensusCalibratedPersons'] for c in codes)
 low=high=alt_low=alt_high=0.;components=[]
 for p in relevant:
  chosen=[c for c in p['productCodes'] if c in selected];s=sum(product[c]['components'][0] for c in chosen)/p['laborCompensationWanCny']
  lo_share=(s/2)/(s/2+1-s);hi_share=(s/.5)/(s/.5+1-s)
  lo=p['employmentPersons']*lo_share;hi=p['employmentPersons']*hi_share
  alo=p['alternativeCensusCalibratedPersons']*lo_share;ahi=p['alternativeCensusCalibratedPersons']*hi_share
  low+=lo;high+=hi;alt_low+=alo;alt_high+=ahi
  components.append({'poolId':p['id'],
 'productCodes':chosen,
 'laborCompensationShare':s,
 'employmentPersons':p['employmentPersons']*s,
 'alternativeCensusCalibratedPersons':p['alternativeCensusCalibratedPersons']*s,
 'lowPersons':lo,
 'highPersons':hi,
 'alternativeLowPersons':alo,
 'alternativeHighPersons':ahi})
 # Each bound is calculated for an entire coherent industry model, then the scenario
 # envelope is formed. Never mix whichever per-pool model makes a wider parent bound.
 scenario_low=min(amount,alt_amount,low,alt_low);scenario_high=max(amount,alt_amount,high,alt_high)
 va=sum(product[c]['value'] for c in codes)*10000
 census=None if any(leaf[c]['referenceCensusPersons'] is None for c in codes) else sum(leaf[c]['referenceCensusPersons'] for c in codes)
 housing=codes==['70183'];ratio=None if housing else va/amount
 names=['2023就业估算；结构输入2020年、产品报酬2023年。不得无年份标签用于2024—2026。']
 if housing:names.append('房地产整项增加值含居民自有住房虚拟服务；保留就业估算，但不发布这一整项的人均数。')
 elif '70183' in codes:names.append('本汇总含自有住房虚拟服务，其人均增加值只作宏观规模比值，不能解释为个人生产贡献。')
 for c in codes:
  if map_by[c]['detailBoundaryGap']:names.append(map_by[c]['detailBoundaryGap']['note'])
 names=list(dict.fromkeys(names))
 source_ids=list(dict.fromkeys(['macro-cn-io2023-211','emp-cn-products-gb2017-annotations','emp-cn-products-national-account-system-2016']+[sid for p in relevant for sid in p['sourceInputIds']]))
 ev=evunique(e for p in relevant for e in p['evidence']);ev.append({'sourceId':'macro-cn-io2023-211',
 'locator':'VA001劳动者报酬和TVA增加值行；产品列 '+', '.join(codes)})
 alt_ev=evunique(e for p in relevant for e in p['alternativeEvidence']);alt_ev.append(ev[-1])
 records.append({'id':'cn-emp-product-'+n['nodeId']+'-2023',
 'nodeId':n['nodeId'],
 'parentId':n['parentId'],
 'name':n['name'],
 'country':'cn',
 'basis':'cn-io2023',
 'year':2023,
 'status':'estimate',
 'employmentType':'all-employed-calibrated-product-attribution',
 'employmentLabel':'就业估算（全社会校准）',
 'modelBasis':'2020年行业结构 · 2023年报酬分配',
 'employmentPersons':amount,
 'employmentUnit':'人',
 'employmentDefinition':'2023年末全社会就业，按2020住户行业结构及2023产品劳动者报酬权重归属；产品维度为模型估算',
 'alternativeCensusCalibratedPersons':alt_amount,
 'hasAlternativeIndustryStructure':any(p['hasAlternativeIndustryStructure'] for p in relevant),
 'referenceCensusPersons':census,
 'referenceCensusLabel':'按同组报酬份额分配的普查就业权重（估算）' if census is not None else '第一产业缺同范围经济普查人数，不与二三产业普查人数直接求和',
 'valueAddedCny':va,
 'valueAddedPerPersonCny':ratio,
 'ratioStatus':'scope-limited' if housing else 'estimate',
 'ratioLabel':'现价增加值 / 年末就业估算',
 'ratioUnavailableReason':'含居民自有住房虚拟服务，整项无法解释为人均生产水平' if housing else None,
 'employmentLowPersons':scenario_low,
 'employmentHighPersons':scenario_high,
 'valueAddedPerPersonLowCny':None if housing else va/scenario_high,
 'valueAddedPerPersonHighCny':None if housing else va/scenario_low,
 'sensitivity':{'kind':'method-and-assumption-sensitivity',
 'qLow':0.5,
 'qBase':1,
 'qHigh':2,
 'label':SCENARIO_LABEL if any(p['hasAlternativeIndustryStructure'] for p in relevant) else ALLOCATION_LABEL+'不是统计置信区间。',
 'hasScenarioSensitivity':scenario_high-scenario_low>max(1e-5,amount*1e-12),
 'mainAllocationOnly':{'lower':min(amount,low),
 'upper':max(amount,high),
 'label':ALLOCATION_LABEL},
 'alternativeAllocationOnly':{'lower':min(alt_amount,alt_low),
 'upper':max(alt_amount,alt_high)},
 'industryStructureOnly':{'lower':min(amount,alt_amount),
 'upper':max(amount,alt_amount),
 'label':'固定产品报酬份额，仅替换行业结构；2020住户主模型与2023普查替代情景。'}},
 'memberCodes':codes,
 'allocationComponents':components,
 'sourceInputIds':source_ids,
 'modelInputIds':[p['id'] for p in relevant],
 'assumptions':COMMON+names,
 'alternativeAssumptions':list(dict.fromkeys(a for p in relevant for a in p['alternativeAssumptions'])),
 'evidence':ev,
 'alternativeEvidence':alt_ev,
 'researchMappingIds':['emp-cn-product-map-'+c for c in codes]})
rb={r['nodeId']:r for r in records}
for n in inventory:
 if n['children']:
  for field in ['employmentPersons','alternativeCensusCalibratedPersons']:
   assert abs(sum(rb[c][field] for c in n['children'])-rb[n['nodeId']][field])<1e-5,(n['nodeId'],field)
for r in records:
 assert r['employmentLowPersons']<=r['employmentPersons']<=r['employmentHighPersons'],r['nodeId']
 if r['valueAddedPerPersonCny'] is not None:assert math.isfinite(r['valueAddedPerPersonCny'])
assert len([r for r in records if len(r['memberCodes'])==1 and r['nodeId'].removeprefix('cn-io-') in product])==211
save('model-inputs.json',{'version':'2026-09-14.product-employment-2',
 'year':2023,
 'industryCalibrationPath':cal_path,
 'industryCalibrationSha256':sha(cal_path),
 'alternativeIndustryCalibrationPath':alt_path,
 'alternativeIndustryCalibrationSha256':sha(alt_path),
 'ioExtractSha256':sha('research/macro/cn-io-2023-extract.json'),
 'control':control,
 'pools':pools,
 'formula':'E_i=E_pool × LC_i / sum(LC_pool); group scenario: E_pool×(s/q)/(s/q+1−s), q in [0.5,2], evaluated separately for each complete industry model',
 'sensitivityDefinition':SCENARIO_LABEL})
save('observations.json',{'version':'2026-09-14.product-employment-2',
 'checkedAt':'2026-09-14',
 'country':'cn',
 'basis':'cn-io2023',
 'records':records})
save('coverage.json',{'checkedAt':'2026-09-14',
 'scope':'211原始产品及全部现有汇总节点，2023单年，2020行业结构权重',
 'summary':{'productNodes':211,
 'allNodes':len(records),
 'calibrationPools':len(pools),
 'employmentEstimates':len(records),
 'ratioEstimates':sum(r['valueAddedPerPersonCny'] is not None for r in records),
 'scopeLimitedRatios':sum(r['ratioStatus']=='scope-limited' for r in records),
 'officialProductEmploymentCounts':0},
 'records':[{'nodeId':r['nodeId'],
 'name':r['name'],
 'year':2023,
 'status':'model-estimated',
 'employmentType':r['employmentType'],
 'ratioStatus':r['ratioStatus'],
 'mappingStatus':map_by[r['memberCodes'][0]]['mappingKind'] if r['nodeId'].removeprefix('cn-io-') in product else 'sum-of-disjoint-product-attributions',
 'missingEvidence':['官方产品就业卫星表','实际产品相对人均劳动者报酬','行业与产品之间的劳动流量桥矩阵','2023同范围住户行业结构']+(['房地产虚拟住房增加值与市场就业分母对应'] if r['ratioStatus']=='scope-limited' else []),
 'modelInputIds':r['modelInputIds']} for r in records]})
save('validation.json',{'checkedAt':'2026-09-14',
 'passed':True,
 'nodeCount':len(records),
 'leafCount':211,
 'poolCount':len(pools),
 'employmentTotalPersons':sum(leaf[c]['employmentPersons'] for c in leaf),
 'alternativeEmploymentTotalPersons':sum(leaf[c]['alternativeCensusCalibratedPersons'] for c in leaf),
 'officialControlPersons':control['total']*10000,
 'allParentSumsMatch':True,
 'allIntervalsContainPoint':True,
 'nonpositiveLaborCompensationProductCodes':[],
 'scopeLimitedRatioNodeIds':[r['nodeId'] for r in records if r['ratioStatus']=='scope-limited'],
 'note':'仅验证模型算术/覆盖，不验证归属假设；情景范围不是统计置信区间。'})
print('nodes',len(records),'pools',len(pools),'persons',sum(leaf[c]['employmentPersons'] for c in leaf))
for code in ['01001','39126','39132','70183']:
 r=rb['cn-io-'+code];print(code,r['employmentPersons'],r['alternativeCensusCalibratedPersons'],r['valueAddedPerPersonCny'])
