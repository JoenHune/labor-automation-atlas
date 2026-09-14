from html.parser import HTMLParser
from pathlib import Path
import json,sys
P=Path(__file__).resolve().parent
class Table(HTMLParser):
 def __init__(self):super().__init__();self.rows=[];self.row=None;self.cell=None
 def handle_starttag(self,t,a):
  if t=='tr':self.row=[]
  if t in ['td','th']:self.cell=[]
 def handle_data(self,d):
  if self.cell is not None:self.cell.append(d)
 def handle_endtag(self,t):
  if t in ['td','th'] and self.cell is not None:
   if self.row is not None:self.row.append(' '.join(' '.join(self.cell).split()))
   self.cell=None
  if t=='tr' and self.row is not None:self.rows.append(self.row);self.row=None
def read(path):
 if path.suffix=='.xls':
  sys.path.insert(0,str(P/'.deps'));import xlrd
  b=xlrd.open_workbook(str(path));result={s.name:[s.row_values(i) for i in range(s.nrows)] for s in b.sheets()}
 else:
  b=path.read_bytes()
  try:text=b.decode('utf-8-sig')
  except:text=b.decode('gb18030',errors='replace')
  parser=Table();parser.feed(text);result={'rows':parser.rows}
 out=P/'extracted'/(path.stem+'-cells.json');out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
 return result
if __name__=='__main__':
 for name in sys.argv[1:]:
  result=read(P/'originals'/name);print(name)
  for sheet,rows in result.items():
   for i,r in enumerate(rows):
    if i<9 or any('计算机' in str(x) for x in r):print(sheet,i+1,r)
