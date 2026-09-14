# -*- coding: utf-8 -*-
from pathlib import Path
import json,csv,re,hashlib,openpyxl,collections,math
P=Path(__file__).resolve().parent;R=P.parents[2]
def load(f):return json.loads(f.read_text())
x=load(P/'dataset.json');raw=load(P/'observations.json');inv=[r for r in load(R/'research/employment/node-inventory.json')['records'] if r['country']=='us']
keys=lambda r:(r['nodeId'],r['year'],r['basis'])
assert {keys(r) for r in x['records']}=={keys(r) for r in inv}
i={keys(r):r for r in inv};ridx={keys(r):r for r in x['records']}
assert all(r['nodeName']==i[keys(r)]['name'] and r['valueAddedAnchor']['baseValue']==i[keys(r)]['valueAddedBase'] and r['valueAddedAnchor']['coverage']==i[keys(r)]['coverage'] for r in x['records'])
archives=[]
for s in x['sources']:
 if s.get('archive') and s.get('sha256'):
  p=R/s['archive'];actual=hashlib.sha256(p.read_bytes()).hexdigest();assert actual==s['sha256'];archives.append({'id':s['id'],'archive':s['archive'],'sha256':actual})
book=openpyxl.load_workbook(P/'originals/Section6All.xlsx',data_only=True)
checks=[];counts=collections.Counter()
for r in raw:
 for m in [r['employment']]+r['alternatives']+([r['latestEmployment']] if r['latestEmployment'] else []):
  if not m or m.get('status') in ['estimated','calculated'] or 'typedCalculation' in m:continue
  for e in m['evidence']:
   if e['sourceId']=='us-employment-bea-nipa-2025-09-26' and not m.get('calculation'):
    matches=re.findall(r'(T60[45]00D-A)!([A-Z]+\d+)',e['locator'])
    if matches:
     sheet,cell=matches[0];assert book[sheet][cell].value*1000==m['value'];counts['nipaCells']+=1
   if e['sourceId'].startswith('us-employment-qcew-') and re.match(r'us-employment-qcew-\d',e['sourceId']) and '/area/US000.csv;' in e['locator']:
    latest='2026q1' in e['sourceId'];year=2026 if latest else m['year'];filename='qcew-2026q1-us.csv' if latest else f'qcew-{year}-us.csv'
    table=list(csv.DictReader((P/'originals'/filename).open()));v=[]
    for t in m['calculation']['inputs']:
     row=table[t['csvRow']-2];key='month3_emplvl' if latest else 'annual_avg_emplvl'
     assert row['own_code']==t['own_code'] and row['industry_code']==t['industry_code'] and row['size_code']=='0' and not row['disclosure_code'];assert int(row[key])==t['value'];v.append(int(row[key]));counts['qcewCells']+=1
    assert sum(v)==m['value']
# Census survey inputs and complete construction/real-estate allocations are independently reread.
census=list(csv.DictReader((P/'originals/GS00EMP01/GS00EMP01.dat').open(),delimiter='|'))
ci={(int(r['#YEAR']),r['AGG_DESC']):r for r in census if r['GEO_ID']=='0100000US' and r['GOVTYPE']=='001'}
io=openpyxl.load_workbook(P/'originals/Use_SUT_Detail.xlsx',data_only=True)['2017']
for r in x['records']:
 for m in [r['employment']]+[t['measure'] for t in r['references']]:
  c=m.get('calculation',{})
  if c.get('methodId')=='us-census-march-government-functions':
   for j in c['inputs']:assert int(ci[(m['year'],j['id'])]['TOT_EMP'])==j['value'];counts['censusInputs']+=1
  if c.get('methodId') in ['us-io2017-construction-comp-share','us-io2017-real-estate-comp-share']:
   for j in c['inputs'][1:]:
    cells=re.findall(r'([A-Z]+410)',j['evidence'][0]['locator']);assert sum(io[t].value for t in cells)==j['value'];counts['ioCompensationCells']+=len(cells)
for year in [2024,2025]:
 get=lambda node:next(r['employment']['value'] for r in x['records'] if r['nodeId']==node and r['year']==year)
 assert math.isclose(sum(get('us-construction-uva-'+str(n)) for n in range(16,24)),get('us-construction'))
 assert math.isclose(get('us-real-estate-bea-62')+get('us-real-estate-bea-63'),get('us-real-estate-bea-61'))
for parent,children in [('us-government-bea-90',['us-government-bea-91','us-government-bea-94']),('us-government-bea-95',['us-government-bea-96','us-government-bea-97'])]:
 get=lambda node:next(r['employment']['value'] for r in x['records'] if r['nodeId']==node and r['year']==2025)
 assert math.isclose(sum(get(n) for n in children),get(parent))
# The archived national accounts' integer-thousand employee totals have published rounding.
reconciliations=[]
for year in range(2021,2026):
 rows=[r for r in raw if r['year']==year];root=next(r for r in rows if r['nodeId']=='us-orbit-economy');parts=[r for r in rows if r['parentId']=='us-orbit-economy'];delta=sum(r['employment']['value'] for r in parts)-root['employment']['value'];tol=6500 if year<=2024 else len(parts)/2+10
 assert abs(delta)<=tol,(year,delta)
 reconciliations.append({'year':year,'root':root['employment']['value'],'sumSelectedAndOther':sum(r['employment']['value'] for r in parts),'differenceJobs':delta,'toleranceJobs':tol,'note':'年度NIPA千岗位发布舍入' if year<=2024 else 'QCEW年均岗位发布舍入；全覆盖部门合计'})
# Guards for same-ID/year meaning changes and sector boundary traps.
a=next(r for r in x['records'] if r['nodeId']=='us-real-estate-bea-64' and r['year']==2021)
b=next(r for r in x['records'] if r['nodeId']=='us-real-estate-bea-62' and r['year']==2024)
assert a['nodeName']!=b['nodeName'] and a['employment']['value'] is not None and b['employment']['status']=='estimated'
for r in x['records']:
 if r['nodeId']=='us-wholesale-uva-83':assert r['employment']['status']=='not-applicable'
 if r['nodeId']=='us-real-estate-uva-131':assert r['employment']['status']=='not-applicable'
 if r['nodeId'] in ['us-government-bea-92','us-government-bea-93'] and r['year']>=2024:assert r['employment']['value'] is None
 if r['nodeId'] in ['us-manufacturing-uva-45','us-manufacturing-uva-46'] and r['year']>=2024:assert r['employment']['status']=='estimated'
 for m in [r['employment']]+[q['measure'] for q in r['references']]:
  c=m.get('calculation')
  if c:
   n=[z['value'] for z in c['inputs']];val=sum(n) if c['operation']=='sum' else n[0] if c['operation']=='identity' else n[0]*n[1]/n[2] if c['operation']=='share' else n[0]-sum(n[1:]);assert math.isclose(val,m['value'],rel_tol=1e-9);counts['typedCalculations']+=1
report={'checkedAt':'2026-09-14','records':len(x['records']),'archivesVerified':len(archives),'archives':archives,'sourceCellsRechecked':dict(counts),'nationalEmployeeReconciliation':reconciliations,'criticalGuards':['historical rental versus current housing verified by name/year/anchor','Customs duties not an employment industry','Owner-occupied imputed housing is not assigned employees','Federal defense not substituted with military-only employment','NAICS automobile/light-truck merge requires explicit model'],'status':'passed','limits':['本验证对归档行值和算式独立重读；跨账户口径适配和模型恒定份额假设是研究判断，不因算式通过就变成事实。','QCEW源行值复核可重复引用同一单元格；sourceCellsRechecked不是独立来源数量。']}
(P/'validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items() if k!='archives'},ensure_ascii=False,indent=2))
