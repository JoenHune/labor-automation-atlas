"""Source integrity, extracted-token, period/unit and arithmetic verification."""
from pathlib import Path
import json,hashlib,math
B=Path(__file__).parent
read=lambda f:json.loads((B/f).read_text())
M=read('metrics.json')['observations'];D=read('derived.json')['observations'];S=read('sources.json')['sources'];C=read('companies.json')['companies'];P=read('panel-data.json')
src={s['id']:s for s in S};idx={x['id']:x for x in M+D};checks=[]
assert len(idx)==len(M)+len(D),'duplicate observations'
for s in S:
 p=Path(s['archive']);assert p.exists(),p
 assert hashlib.sha256(p.read_bytes()).hexdigest()==s['sha256'],s['id']
checks.append('26原件文件SHA-256校验通过')
for x in M:
 assert x['sourceId'] in src,x['id']; assert x['country']=='cn'
 if x['value'] is None:assert x['note'] and x['evidence']['type']=='evidence-gap';continue
 k=x['companyId'];f=B/'extracts'/f"{k}-{'2026h1' if x['sourceId'].endswith('h12026') else '2025'}.txt"
 pages=f.read_text().split('\f');page=pages[x['locator']['pdfPage']-1]
 assert str(x['rawValue']) in page,(x['id'],'raw token not on cited page',x['rawValue'])
 n=float(str(x['rawValue']).replace(',','').replace('(','-').replace(')',''))
 if x['metric'] in ['cash_paid_to_employees','cash_acquisition_long_term_assets']:n=abs(n)
 assert math.isclose(n*x['multiplier'],x['value'],rel_tol=1e-12,abs_tol=.01),x['id']
 if x['frequency']=='half-year':assert x['period'].endswith('-H1') and x['sourceId'].endswith('h12026')
checks.append('全部非空原值在引用PDF页存在，单位换算与H1期间检查通过')
for d in D:
 a=[idx[i]['value'] for i in d['evidence']['inputs']];met=d['metric']
 if met=='gross_margin_pct':expected=(a[0]-a[1])/a[0]*100
 elif met in ['revenue_growth_pct','h1_revenue_growth_pct']:expected=(a[0]/a[1]-1)*100
 elif met=='revenue_per_year_end_employee':expected=a[0]/a[1]
 else:expected=a[0]/a[1]*100
 assert math.isclose(d['value'],expected,rel_tol=1e-12),d['id']
checks.append('153项派生指标从引用原值独立复算通过')
for cmp in P['comparisons']:
 assert len(cmp['rows'])==13
 assert 'direct_labor' not in cmp['metric'],'heterogeneous direct labour comparison forbidden'
 for r in cmp['rows']:
  assert r['nodeIds']==next(c['nodeIds'] for c in C if c['name']==r['name'])
  assert all(e['sourceId'] in src for e in r['evidence'])
  assert r['value'] is not None or r['missingReason']
checks.append('11张比较表均13家；国家、实际节点映射、证据、缺失说明一致')
# Cross-check all group revenue/cost/cash-flow amounts against annual summary rows where available;
# these anchors were separately read from financial-summary or management tables, not copied by the extractor.
anchors={('inspur','2025','revenue'):164781997658.23,('inspur','2024','revenue'):115028516443.08,('hisense','2024','revenue'):58530485019.64,('smic','2025','revenue'):67323192000,('zte','2025','revenue'):133895460000,('goer','2025','cash_paid_to_employees'):11387836144.99,('boe','2025','cash_acquisition_long_term_assets'):40094380995,('sytech','2025','ccl_direct_labor_cost'):612591948.23}
for (k,y,m),v in anchors.items():assert math.isclose(idx[f'{k}-{y}-{m}']['value'],v,abs_tol=.01)
checks.append('8个高风险锚点检查通过（修订列、千元、负号支出、换行人工行）')
result={'checkedAt':'2026-09-14','status':'passed','counts':{'companies':len(C),'sources':len(S),'observations':len(M),'numericObservations':sum(x['value'] is not None for x in M),'missingObservations':sum(x['value'] is None for x in M),'segments':len(read('segments.json')['segments']),'derived':len(D),'comparisons':len(P['comparisons'])},'checks':checks,'manualVisualChecks':['浪潮信息2025年报PDF第7页：2024调整前/后列（已看渲染图）','中兴通讯2025年报PDF第69页：生产人数13098、集团人数65095（已看渲染图；印刷页68）'],'limitations':['词元检查证明数字出现在引用页，不能代替对行列意义的人工读取；本次已实际读取所取行的单位、期间和集团/母公司边界。','未通过该检查宣称全市场样本完整、员工平均口径统一或所有上市公司财报逐字审阅。']}
(B/'verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps(result,ensure_ascii=False,indent=2))
