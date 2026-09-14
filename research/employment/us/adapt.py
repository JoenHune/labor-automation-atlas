# -*- coding: utf-8 -*-
from pathlib import Path
import json,re,openpyxl
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def load(p):return json.loads(p.read_text())
rows=load(HERE/'observations.json');sources=load(HERE/'sources.json')
inv={(r['nodeId'],r['year']):r for r in load(ROOT/'research/employment/node-inventory.json')['records'] if r['country']=='us'}
book=openpyxl.load_workbook(HERE/'originals/Section6All.xlsx',data_only=True)['T60400D-A']
def measure(m,year,reason='',special=False):
 if m is None:return {'value':None,'year':year,'denominatorKind':'jobs','periodBasis':'other','status':'not-applicable' if special else 'unavailable','definition':reason or '未取得同年就业分母','coverage':'当前图谱所注明的BEA行业核算范围；尚缺就业对应','releaseDate':None,'revision':'2026-09-14实际检索结果；无值不补零。','evidence':[]}
 out={k:m[k] for k in ['value','year','definition','coverage','releaseDate','revision','evidence']}
 out['denominatorKind']='fte' if m['unit']=='FTE' else 'jobs'
 out['periodBasis']='annual-average' if m['periodBasis']=='annual-average' else 'other'
 out['status']=m.get('status','official')
 if m.get('periodNote'):out['definition']+=' '+m['periodNote']
 if m.get('sensitivity'):out['sensitivity']=m['sensitivity']
 if out['status']=='estimated':out['modelBasis']=m.get('modelBasis','2021年分类份额')
 if m.get('typedCalculation'):out['calculation']=m['typedCalculation']
 elif m.get('calculation'):
  c=m['calculation'];inputs=[]
  if c.get('lines'):
   for n,line in enumerate(c['lines']):
    cell=book.cell(int(line)+8,year-1994);inputs.append({'id':'nipa-'+str(line),'label':book.cell(int(line)+8,2).value.strip(),'value':cell.value*1000,'unit':'jobs','evidence':[{'sourceId':'us-employment-bea-nipa-2025-09-26','locator':'T60400D-A!'+cell.coordinate+'; thousands × 1000'}]})
  else:
   for i,val in enumerate(c.get('inputs',[])):
    value=val['value'] if isinstance(val,dict) else val
    inputs.append({'id':'input-'+str(i),'label':('QCEW '+val['own_code']+':'+val['industry_code']) if isinstance(val,dict) else '原统计输入 '+str(i+1),'value':value,'unit':'jobs','evidence':m['evidence']})
  if inputs:
   out['status']='calculated' if len(inputs)>1 else out['status']
   out['calculation']={'methodId':'us-official-employment-sum' if len(inputs)>1 else 'us-official-employment-identity','label':'非重叠官方就业行加总' if len(inputs)>1 else '官方就业观测','expression':' + '.join(str(x['value']) for x in inputs),'operation':'sum' if len(inputs)>1 else 'identity','inputs':inputs,'assumptions':[]}
 return out
out=[]
for r in rows:
 i=inv[(r['nodeId'],r['year'])];gap='；'.join(r['gaps']);main=measure(r['employment'],r['year'],gap,r['status']=='not-applicable')
 if not r['employment']:pstatus='not-applicable' if r['status']=='not-applicable' else 'incompatible';group=None;explain=gap or '缺就业配对'
 else:
  pstatus='proxy';d=r['employment'];is_bea=any(x['sourceId']=='us-employment-bea-nipa-2025-09-26' for x in d['evidence']) and d['denominatorKind']!='covered-employee-jobs'
  scope='government' if r['nodeId'].startswith('us-government') else 'domestic-total' if r['nodeId']=='us-orbit-economy' else 'private'
  group=('bea-nipa-annual-employees' if is_bea else 'qcew-covered-annual-jobs')+'-'+scope
  if d['denominatorKind']=='census-government-jobs':group='census-apes-march-government-functions'
  if main['status']=='estimated':group+='-'+main.get('calculation',{}).get('methodId','model')
  explain='分子为本行业同年全部现价增加值；分母为雇员岗位，未含业主，不是全口径自然人人均劳动生产率。'
  if scope=='government' and not is_bea and d['denominatorKind']!='census-government-jobs':explain+='QCEW仅覆盖文职岗位，缺军人及其他BEA覆盖调整，政府比率仅为受保雇员代理。'
  if main['status']=='estimated':explain+='就业按明确基期份额建模；详细假设与情景范围见算式。'
  if r['nameEn'] in ['Real estate','Housing','Owner-occupied housing','Tenant-occupied housing','Other real estate'] or r['nodeId']=='us-real-estate':explain+='房地产增加值含住房资本服务和自有住房估算租金；不能解释为房地产员工创造的价值。'
  if d['denominatorKind']=='census-government-jobs':explain+='Census分母为3月份政府功能岗位，与BEA年度核算边界不同，单独比较组。'
 refs=[]
 for m in r['alternatives']:
  if m==r['employment']:continue
  label={'census-government-jobs':'Census 州地方政府功能3月岗位','fte-employees':'BEA 全职等价雇员（FTE）','covered-employee-jobs':'QCEW 受保雇员岗位','employee-and-owner-jobs':'历史 BEA 雇员及业主岗位（非去重人数）'}.get(m['denominatorKind'],'其他就业口径')
  refs.append({'label':label,'measure':measure(m,m['year'])})
 if r.get('latestEmployment'):refs.append({'label':'最新进展：2026年3月工资期受保岗位（不用于年度人均计算）','measure':measure(r['latestEmployment'],2026)})
 out.append({'id':r['id'],'country':'us','basis':i['basis'],'nodeId':i['nodeId'],'nodeName':i['name'],'year':i['year'],'valueAddedAnchor':{'baseValue':i['valueAddedBase'],'currency':i['currency'],'coverage':i['coverage']},'employment':main,'pairing':{'status':pstatus,'explanation':explain,'comparisonGroup':group},'references':refs,'notes':[g for g in r['gaps'] if g]+(['官方就业岗位不等于去重自然人数；全职和兼职均计一个岗位。'] if r['employment'] else []),'gap':gap})
# Every source used by primary/reference estimates exists in this self-contained dataset.
source_ids={e['sourceId'] for r in out for m in [r['employment']]+[x['measure'] for x in r['references']] for e in m['evidence']+(sum([x['evidence'] for x in m.get('calculation',{}).get('inputs',[])],[]))}
known={s['id'] for s in sources}
assert source_ids.issubset(known),source_ids-known
result={'version':'2026-09-14.us-employment-1','checkedAt':'2026-09-14','sources':sources,'records':out}
(HERE/'dataset.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print({'records':len(out),'sources':len(sources),'estimated':sum(r['employment']['status']=='estimated' for r in out)})
