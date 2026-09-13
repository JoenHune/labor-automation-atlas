"""Re-extract the audited annual industry totals from the saved official HTML.
Only writes this research directory; does not alter published site inputs.
"""
from html.parser import HTMLParser
from pathlib import Path
import hashlib,json,re

ROOT=Path(__file__).resolve().parent
class Rows(HTMLParser):
 def __init__(self):super().__init__();self.rows=[];self.cells=[];self.cell=None
 def handle_starttag(self,tag,attrs):
  if tag=='tr': self.cells=[]
  elif tag in ('td','th'): self.cell=[]
 def handle_data(self,data):
  if self.cell is not None:self.cell.append(data)
 def handle_endtag(self,tag):
  if tag in ('td','th') and self.cell is not None:
   self.cells.append(re.sub(r'\s+','', ''.join(self.cell)));self.cell=None
  elif tag=='tr' and self.cells:self.rows.append(self.cells)

SOURCES=[
 {'id':'cn-industry-gdp2024-final','file':'gdp2024-final.html','url':'https://www.stats.gov.cn/xxgk/sjfb/zxfb2020/202512/t20251226_1962144.html','year':2024,'publishedAt':'2025-12-26','revisionStatus':'最终核实','valueColumn':1,'table':'附件1：2024年GDP最终核实数','column':'现价总量（亿元）'},
 {'id':'cn-industry-gdp2025-preliminary','file':'gdp2025-preliminary.html','url':'https://www.stats.gov.cn/sj/zxfbhjd/202601/t20260120_1962349.html','year':2025,'publishedAt':'2026-01-20','revisionStatus':'初步核算','valueColumn':2,'table':'表1：2025年四季度和全年GDP初步核算数据','column':'绝对额（亿元）／全年'}
]
allrows=[]
for s in SOURCES:
 b=(ROOT/'originals'/s['file']).read_bytes();p=Rows();p.feed(b.decode('utf-8'))
 s['sha256']=hashlib.sha256(b).hexdigest();s['checkedAt']='2026-09-14'
 for name,code,node,parent in [('工业','B+C+D','cn-industry',None),('制造业','C','cn-manufacturing','cn-industry')]:
  rows=[r for r in p.rows if r[0].replace('#','')==name]
  values={r[s['valueColumn']] for r in rows};assert len(values)==1,(s,rows)
  val=values.pop();assert val.isdigit(),val
  allrows.append({'country':'CN','nodeId':node,'parentId':parent,'name':name,'industryCode':code,'classification':'GB/T 4754-2017','year':s['year'],'value':int(val),'unit':'亿元','currency':'CNY','priceBasis':'current','annualized':False,'coverage':'中国全国常住生产单位；不含港澳台；工业为B+C+D门类，制造业为C门类，不局限规模以上企业','revisionStatus':s['revisionStatus'],'publishedAt':s['publishedAt'],'checkedAt':s['checkedAt'],'evidenceType':'direct_fact','status':'existing_value_reverified','evidence':[{'sourceId':s['id'],'url':s['url'],'locator':{'table':s['table'],'row':name,'column':s['column']},'verbatimValue':val,'rawCells':rows[0],'archive':'originals/'+s['file'],'sha256':s['sha256']}]})
 for code,name in [('B','采矿业'),('D','电力、热力、燃气及水生产和供应业')]:
  assert not any(r[0]==name for r in p.rows),(s['file'],'unexpected new row',name)
assert [r['value'] for r in allrows]==[404519,334881,416826,346747]
(ROOT/'candidates.json').write_text(json.dumps({'schemaVersion':'1.0','country':'CN','checkedAt':'2026-09-14','newDirectValueCount':0,'reverifiedDirectValueCount':4,'publicationReady':False,'reason':'This is an independent research candidate packet. Parent must review and integrate. Parent checked National Data; see parent-crosscheck.json for greater precision on industrial totals, with no new industrial child values.','observations':allrows,'sources':SOURCES},ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'reverified':len(allrows),'new':0,'values':[r['value'] for r in allrows]},ensure_ascii=False))
