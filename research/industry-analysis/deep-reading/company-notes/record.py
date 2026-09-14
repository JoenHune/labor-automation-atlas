from pathlib import Path
import json
B=Path(__file__).parent
P=B/'research-notes.json'
data=json.loads(P.read_text())
def report(company,period,pages,topics,unread):
 data['reports'].append({'companyId':company,'period':period,'pdfPagesRead':sorted(set(pages)),'topics':topics,'notCovered':unread})
def add(company,period,metric,value,page,row,unit='元',note='',previous=None):
 data['observations'].append({'id':f'dr-{company}-{period.lower()}-{metric}','companyId':company,'period':period,'metric':metric,'value':value,'unit':unit,'currency':'CNY' if unit in ['元','千元','万元','人民币千元'] else None,'scope':'合并集团；境内外','pdfPage':page,'row':row,'note':note,'previous':previous})
def finding(company,text,pages,amends=None):
 data['interpretations'].append({'companyId':company,'type':'qualification','text':text,'pages':pages,'amends':amends,'amendmentKind':'补充解释和成立条件；不改变冻结原值' if amends else None})
def save():P.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
