"""Archive public official sources; extract visible HTML text for reproducible locators."""
import json,hashlib,re,urllib.request,concurrent.futures
from pathlib import Path
from html.parser import HTMLParser
BASE=Path(__file__).resolve().parent
class Visible(HTMLParser):
 def __init__(self): super().__init__();self.skip=0;self.parts=[]
 def handle_starttag(self,t,a):
  if t in ['script','style','noscript']: self.skip+=1
  elif t in ['p','div','tr','h1','h2','h3','li','br']: self.parts.append('\n')
  elif t in ['td','th']: self.parts.append(' | ')
 def handle_endtag(self,t):
  if t in ['script','style','noscript']: self.skip=max(0,self.skip-1)
  elif t in ['p','div','tr','h1','h2','h3','li']: self.parts.append('\n')
 def handle_data(self,d):
  if not self.skip:self.parts.append(d)
 def text(self):return '\n'.join(s for l in ''.join(self.parts).splitlines() if (s:=re.sub(r'\s+',' ',l).strip()))+'\n'
def fetch(s):
 try:
  req=urllib.request.Request(s['url'],headers={'User-Agent':'Mozilla/5.0'})
  with urllib.request.urlopen(req,timeout=35) as r:data=r.read();status=r.status;ctype=r.headers.get('Content-Type','')
  ext='jpg' if 'image' in ctype else 'html'
  dest=BASE/'raw'/f"{s['id']}.{ext}";dest.write_bytes(data)
  s.update(status=status,sha256=hashlib.sha256(data).hexdigest(),archivedPath=str(dest.relative_to(BASE)),retrievedAt='2026-09-14')
  if ext=='html':
   encoding='utf-8'
   m=re.search(rb'charset=["\s]*([\w-]+)',data[:6000],re.I)
   if m:encoding=m.group(1).decode('ascii')
   try:html=data.decode(encoding)
   except UnicodeDecodeError:html=data.decode('gb18030',errors='replace')
   p=Visible();p.feed(html);text=p.text();dest.with_suffix('.txt').write_text(text,encoding='utf-8');s['textPath']=str(dest.with_suffix('.txt').relative_to(BASE))
  return s
 except Exception as e:s.update(status='access_error',error=str(e),retrievedAt='2026-09-14');return s
if __name__=='__main__':
 sources=json.loads((BASE/'sources.json').read_text())
 with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:out=list(ex.map(fetch,sources))
 (BASE/'sources.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
 for s in out:print(s['id'],s['status'],s.get('sha256','')[:8])
