from pathlib import Path
from html.parser import HTMLParser
import json,hashlib
OUT=Path(__file__).resolve().parent;P=OUT.parent/'cn-industry'
class Tables(HTMLParser):
 def __init__(self):super().__init__();self.tables=[];self.rows=None;self.row=None;self.cell=None
 def handle_starttag(self,t,a):
  if t=='table':self.rows=[]
  if t=='tr':self.row=[]
  if t in ('td','th'):self.cell=[]
 def handle_data(self,s):
  if self.cell is not None:self.cell.append(s)
 def handle_endtag(self,t):
  if t in ('td','th') and self.cell is not None:
   if self.row is not None:self.row.append(''.join(''.join(self.cell).split()))
   self.cell=None
  if t=='tr' and self.rows is not None and self.row:self.rows.append(self.row);self.row=None
  if t=='table' and self.rows:self.tables.append(self.rows);self.rows=None
raws={}
for fn in ['census-bulletin2.html','census-bulletin4.html']:
 t=Tables();t.feed((P/'originals'/fn).read_bytes().decode('utf8'));raws[fn]=t.tables
sec=next(t for t in raws['census-bulletin2.html'] if any('法人单位从业人员' in c for row in t[:3] for c in row))
fin=next(t for t in raws['census-bulletin4.html'] if any('货币金融服务' in row for row in t) and any('从业人员' in c for row in t[:3] for c in row))
rail=next(t for t in raws['census-bulletin4.html'] if any('铁路运输业' in row for row in t) and any('从业人员' in c for row in t[:3] for c in row))
cal=json.loads((P/'calibration.json').read_text());w=cal['weights2023'];checks=[]
for codes,table in [(['66','67','68','69'],fin),(['53'],rail)]:
 for code in codes:
  x=next(r for r in w if r['code']==code);row=next(r for r in table if r[0]==x['name']);n=float(row[-1])*10000
  checks.append({'check':'专项公报人员原值','code':code,'sourceRow':row,'expectedPersons':n,'modelInputPersons':x['rawLegalPersons'],'pass':n==x['rawLegalPersons']})
labels=json.loads((P/'classification-labels.json').read_text())
for s in sorted(set(x['section'] for x in w)):
 subset=[x for x in w if x['section']==s];expectedName=labels[s].replace('、','').replace(' ','');row=next(r for r in sec if r[0].replace('、','').replace(' ','').replace('*','')==expectedName);legal=float(row[1])*10000;individual=0 if row[3]=='-' else float(row[3])*10000
 for x in subset:
  assert abs(x['withinSectionShare']-x['rawLegalPersons']/sum(y['rawLegalPersons'] for y in subset))<1e-12
  assert abs(x['individualPersons']-individual*x['withinSectionShare'])<1e-6
  assert abs(x['legalPersons']-legal*x['withinSectionShare'])<1e-6
 checks.append({'check':'独立公报门类法人/个体按同一原法人权重分配','section':s,'sourceRow':row,'codeCount':len(subset),'sourceLegalPersons':legal,'sourceIndividualPersons':individual,'modelLegalPersons':sum(x['legalPersons'] for x in subset),'modelIndividualPersons':sum(x['individualPersons'] for x in subset),'pass':True})
for year in [2021,2022,2023,2024,2025]:
 ctrl=next(c for c in cal['controls'] if c['year']==year)
 for s in ['secondary','tertiary']:
  subset=[x for x in cal['estimates'] if x['year']==year and x['controlSector']==s];total=sum(x['employmentPersons'] for x in subset);expected=ctrl[s]*10000
  checks.append({'check':'三产业控制量守恒','year':year,'sector':s,'sum':total,'expected':expected,'pass':abs(total-expected)<1e-5})
for code in ['11','43']:
 x=next(x for x in w if x['code']==code);checks.append({'check':'辅助/修理归第三产业，与公报2注释1核对','code':code,'value':x['controlSector'],'pass':x['controlSector']=='tertiary'})
result={'checkedAt':'2026-09-14','calibrationSha256':hashlib.sha256((P/'calibration.json').read_bytes()).hexdigest(),'sourceParsing':'独立解析公报HTML表格，另实读A1-08原图、编者说明及根归档国家数据DOM','checks':checks,'pass':all(x['pass'] for x in checks),'modelBoundaryExamples':[{'code':'53','individualPersonsAssigned':next(x for x in w if x['code']=='53')['individualPersons'],'meaning':'个体就业按门类法人份额分配的假设结果，不是铁路个体就业官方观测'}]}
(OUT/'cross-review-calculations.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print('checks',len(checks),'all',result['pass'])
