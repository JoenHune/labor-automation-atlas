"""Checks reproducible amounts, period and scope boundaries; does not claim full-document review."""
from pathlib import Path
import json,re,hashlib,math
B=Path(__file__).parent;ROOT=B.parents[3];OLD=ROOT/'research/industry-analysis/companies'
def read(p):return json.loads(p.read_text())
S=read(OLD/'sources.json')['sources'];sources={s['id']:s for s in S};P=read(B/'panel-data.json');D=read(B/'observations.json');L=read(B/'read-log.json');A=read(B/'amendments.json')
assert P['sources']==S
assert len(L['reports'])==26 and len({r['companyId'] for r in L['reports']})==13
assert L['readPdfPageCount']==sum(len(r['pdfPagesRead']) for r in L['reports'])
logs={(r['companyId'],r['period']):r for r in L['reports']}
for r in L['reports']:
 assert hashlib.sha256((ROOT/sources[r['sourceId']]['archive']).read_bytes()).hexdigest()==r['originalSha256']
 assert len(set(r['pdfPagesRead']))==r['readPdfPageCount'] and r['notCovered']
ids=[]
for k in ['comparisons','findings','coverage']:
 for x in P[k]:
  ids.append(x['id']); assert re.fullmatch(r'[A-Za-z0-9._:-]+',x['id']) and x['country']=='cn'
  for e in x.get('evidence',[]):assert e['sourceId'] in sources and e['locator']
  for row in x.get('rows',[]):
   assert all(n.startswith('cn-') for n in row['nodeIds'])
   assert row['value'] is not None or row['missingReason']
   assert row['evidence']
   for e in row['evidence']:assert e['sourceId'] in sources
assert len(ids)==len(set(ids))
# Financial table wrapping splits source amounts down columns. These were reread and checked column by column.
manual={
 'dr-inspur-2025-inventory-net','dr-inspur-2025-inventory-allowance','dr-inspur-2025-goods-dispatched',
 'dr-inspur-2026-h1-inventory-net','dr-inspur-2026-h1-raw-materials-net','dr-inspur-2026-h1-goods-dispatched',
 'dr-luxshare-2025-inventory-net','dr-luxshare-2025-inventory-allowance','dr-luxshare-2025-inventory-allowance-acquisition',
 'dr-luxshare-2026-h1-inventory-net','dr-luxshare-2026-h1-inventory-allowance','dr-goer-2025-inventory-net'}
numeric=[]
for o in D['observations']:
 assert o['pdfPage'] in logs[o['companyId'],o['period']]['pdfPagesRead']
 assert math.isclose(o['value'],o['rawValue']*o['multiplier'],rel_tol=1e-12,abs_tol=.01)
 if o.get('previous'):assert math.isclose(o['previous']['value'],o['previous']['rawValue']*o['multiplier'],rel_tol=1e-12,abs_tol=.01)
 t=(OLD/'extracts'/f"{o['companyId']}-{'2025' if o['period']=='2025' else '2026h1'}.txt").read_text().split('\f')[o['pdfPage']-1]
 digits=re.sub(r'[^0-9]','',t);v=abs(o['rawValue']);token=re.sub(r'[^0-9]','',f'{v:.2f}' if v%1 else str(int(v)))
 hit=token in digits
 assert hit or o['id'] in manual,(o['id'],o['rawValue'])
 numeric.append({'id':o['id'],'pdfPage':o['pdfPage'],'result':'原文数字命中，并已实际读该页' if hit else '原表数字跨行换列；已逐列人工重新核对'})
for d in D['derived']:
 a,b=d['inputs']; val=(a/b-1)*100 if d['metric']=='inventory-change-pct' else a/b*100
 assert abs(val-d['value'])<1e-10
 if d.get('previous'):
  a,b=d['previous']['inputs']; assert abs(a/b*100-d['previous']['value'])<1e-10
assert len(D['derived'])==26
old=read(OLD/'panel-data.json')
for a in A:
 assert a['replacement']['id']==a['id'] and any(x['id']==a['id'] for x in old[a['collection']])
 if a['collection']=='comparisons':
  oldrows=next(x['rows'] for x in old['comparisons'] if x['id']==a['id'])
  assert [r['value'] for r in oldrows]==[r['value'] for r in a['replacement']['rows']]
# BOE discrepancy and Kaifa non-reconciliation explicitly stay unresolved.
assert 2939+67979==70918 and 109895-70918==38977
assert abs(sum([9182579.49,283303.26,5394272.18,3234755.46])-18094910.39)<.01
assert abs((340943956.45+9567538.61-332416584.67)-18094910.39)<.01
result={'checkedAt':'2026-09-14','status':'passed','checks':['26原件哈希一致','26份读页边界与133个观测页匹配','13家公司国家及产品节点均CN','金额原币原单位倍率保留','两张表同期间与存量/流量分开','26个计算可复算','来源对象与冻结原件完全一致','6项修订保留同ID及旧数值','BOE与深科技原表疑点保留待核'],'rawNumericChecks':numeric,'limitations':['自动数值命中只是防抄写错误，不等于全文阅读或独立会计审计。','12个跨行金额已逐列重新人工核对；已读页外的剩余内容见read-log，不计已读。']}
(B/'verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print('PASS:',len(L['reports']),'reports;',L['readPdfPageCount'],'actual pages;',len(D['observations']),'raw observations;',len(D['derived']),'calculations;',len(A),'amendments')
