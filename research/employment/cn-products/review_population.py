"""Independent arithmetic/source-subset audit. Does not modify industry research files."""
from pathlib import Path
import json,hashlib,math,collections
P=Path(__file__).resolve().parent;ROOT=P.parents[2]
def read(x):return json.loads((ROOT/x).read_text())
def sha(x):return hashlib.sha256((ROOT/x).read_bytes()).hexdigest()
calpath='research/employment/cn-industry/population-calibration.json'
cal=read(calpath);rows=[r for r in cal['estimates'] if r['year']==2023];by={r['code']:r for r in rows}
# Independently read the national row in five original-image crops; these named
# cells are audited directly, while the remaining cells receive arithmetic checks.
checked_cells={'01':11758509,'02':239237,'03':1052844,'04':248734,'05':196688,'06':310763,'07':50559,'08':37227,'09':46592,'10':59746,'11':54395,'12':9376,'13':457267,'14':332094,'15':148707,'16':22867,'17':534072,'18':1208698,'20':298861,'21':340048,'22':207429,'23':151634,'24':397460,'25':89134,'26':369187,'27':184430,'28':34029,'29':520748,'30':681005,'31':232253,'32':141540,'33':900738,'34':781753,'35':433005,'36':455706,'37':190748,'38':660654,'39':1198567,'40':93996,'41':100594,'42':84964,'44':392926,'45':82973,'46':97336,'47':4071308,'48':674856,'49':417697,'50':2236149,'51':2580725,'52':6681671,'53':140873,'54':2134244,'55':56217,'56':68318,'57':2735,'58':99684,'59':313428,'60':461709,'61':365935,'63':261138,'64':341419,'65':526986,'66':449264,'67':79342,'68':347413,'69':86561,'70':1251428,'71':130303,'72':1669350,'73':139564,'74':533210,'75':172131,'76':33953,'77':44667,'78':433059,'79':6209,'80':1353845,'81':566293,'82':369213,'83':2715648,'84':1289254,'85':52228,'86':42831,'87':65960,'88':91242,'89':65013,'90':207148,'91':60404,'92':2049147,'93':7339,'94':13346,'95':123371,'96':404641}
checks=[]
def check(label,ok,detail=None):
 checks.append({'check':label,'passed':bool(ok),'detail':detail});assert ok,(label,detail)
def close(x,y):return abs(x-y)<=max(1e-5,abs(y)*1e-12)
for code,v in checked_cells.items():check('original-national-sample-'+code,by[code]['householdSamplePersons']==v,{'originalPersons':v,'locator':'B0404 全国行 '+by[code]['name']+' 列'})
check('sample-97-original-excluded',cal['excluded'][0]['code']=='97' and cal['excluded'][0]['householdSamplePersons']==562)
check('original-sample-total',cal['sampleTotal']==65631786)
check('domestic-sample-total',sum(r['householdSamplePersons'] for r in rows)==65631786-562==cal['domesticSampleTotal'])
def sector(code):
 n=int(code)
 if n<=4:return 'primary'
 if code in ['05','11','43'] or n>=51:return 'tertiary'
 return 'secondary'
sums=collections.defaultdict(int)
for row in rows:
 check('classification-'+row['code'],row['controlSector']==sector(row['code']))
 sums[sector(row['code'])]+=row['householdSamplePersons']
check('three-sample-pools',dict(sums)=={'primary':13299324,'secondary':20231920,'tertiary':32099980})
controls={c['year']:c for c in cal['controls']}
for row in cal['estimates']:
 sec=sector(row['code']);control=controls[row['year']][sec]*10000
 expected=control*row['householdSamplePersons']/sums[sec]
 check('all-estimates-'+str(row['year'])+'-'+row['code'],close(expected,row['employmentPersons']))
for year,c in controls.items():
 for sec in sums:
  observed=sum(r['employmentPersons'] for r in cal['estimates'] if r['year']==year and sector(r['code'])==sec)
  check('control-sum-'+str(year)+'-'+sec,close(observed,c[sec]*10000))
inputs=read('research/employment/cn-products/model-inputs.json');raw=read('research/employment/cn-products/observations.json')['records'];rb={r['nodeId']:r for r in raw}
mapping=read('research/employment/cn-products/mapping.json')['records'];mapby={m['productCode']:m for m in mapping};pools={p['key']:p for p in inputs['pools']}
io={r['code']:r for r in read('research/macro/cn-io-2023-extract.json')['rows']}
check('all-96-industries-once',sorted(d for key in pools for d in key.split('+'))==[str(i).zfill(2) for i in range(1,97)])
check('01-04-four-separate-pools',all(k in pools for k in ['01','02','03','04']) and '01-04' not in pools)
check('05-tertiary-product-pool',pools['05']['productCodes']==['05008'] and pools['05']['industryCalibrationInputs'][0]['controlSector']=='tertiary')
for code,prod in io.items():
 m=mapby[code];p=pools['+'.join(m['industryDivisions'])]
 # Recalculate the pool from the source sample and annual control, not the
 # generated pool employment, then apply the raw original IO compensation.
 poolcount=sum(controls[2023][sector(d)]*10000*by[d]['householdSamplePersons']/sums[sector(d)] for d in m['industryDivisions'])
 lc=sum(io[c]['components'][0] for c in p['productCodes'])
 expected=poolcount*prod['components'][0]/lc
 check('independent-product-'+code,close(expected,rb['cn-io-'+code]['employmentPersons']))
inv=[n for n in read('research/employment/node-inventory.json')['records'] if n['basis']=='cn-io2023' and n['country']=='cn']
for n in inv:
 r=rb[n['nodeId']]
 if n['children']:
  for field in ['employmentPersons','alternativeCensusCalibratedPersons']:
   check('parent-'+n['nodeId']+'-'+field,close(r[field],sum(rb[c][field] for c in n['children'])))
 selected=set(r['memberCodes']);bounds={'main':[0,0],'alternative':[0,0]}
 for p in inputs['pools']:
  chosen=selected.intersection(p['productCodes'])
  if not chosen:continue
  s=sum(io[c]['components'][0] for c in chosen)/sum(io[c]['components'][0] for c in p['productCodes'])
  for model,field in [('main','employmentPersons'),('alternative','alternativeCensusCalibratedPersons')]:
   bounds[model][0]+=p[field]*(s/2)/(s/2+1-s)
   bounds[model][1]+=p[field]*(s/.5)/(s/.5+1-s)
 check('scenario-'+n['nodeId'],close(r['employmentLowPersons'],min(v[0] for v in bounds.values())) and close(r['employmentHighPersons'],max(v[1] for v in bounds.values())))
check('C39-whole-pool-visible-structure-sensitivity',rb['cn-io-group-39']['sensitivity']['hasScenarioSensitivity'] and close(rb['cn-io-group-39']['employmentLowPersons'],rb['cn-io-group-39']['employmentPersons']) and close(rb['cn-io-group-39']['employmentHighPersons'],rb['cn-io-group-39']['alternativeCensusCalibratedPersons']))
check('real-estate-employment-retained-ratio-null',rb['cn-io-70183']['employmentPersons']>0 and rb['cn-io-70183']['valueAddedPerPersonCny'] is None)
check('all-product-controls-conserved',close(rb['cn-orbit-cn-io2023']['employmentPersons'],740410000))
report={'checkedAt':'2026-09-14','passed':True,'mainCalibrationSha256':sha(calpath),'originalB0404Sha256':sha('research/employment/cn-industry/originals/population2020-industry.jpg'),'productInputsSha256':sha('research/employment/cn-products/model-inputs.json'),'originalNationalMajorCellsIndependentlyRead':len(checked_cells),'sampleTotal':cal['sampleTotal'],'sample97Excluded':562,'domesticSampleTotal':cal['domesticSampleTotal'],'checkCount':len(checks),'checks':checks,'scope':'直接核读全国合计与93个大类原图单元格、97国际组织；其余大类只做算式和归并校验。本审计不证明2020结构保持到2023，或产品等人均报酬假设成立。'}
report['scope']=report['scope'].replace('93个',str(len(checked_cells))+'个')
(P/'population-review-calculations.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print('Independent checks',len(checks),'national source cells',len(checked_cells))
