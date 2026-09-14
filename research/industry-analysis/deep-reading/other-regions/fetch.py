"""Archive explicitly selected public sources; preserve every failed request."""
from pathlib import Path
import urllib.request, urllib.parse, hashlib, json, sys, concurrent.futures
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parent
class Links(HTMLParser):
    def __init__(self):super().__init__();self.items=[];self.text=[];self.active=None
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        for k in ('href','src'):
            if a.get(k):self.items.append({'tag':tag,'attribute':k,'url':a[k],'text':''});self.active=len(self.items)-1
    def handle_data(self,s):
        if s.strip():self.text.append(s.strip())
        if self.active is not None:self.items[self.active]['text']+=s.strip()
    def handle_endtag(self,tag):self.active=None
def fetch(x):
    out=dict(x,retrieved='2026-09-14')
    path=ROOT/'originals'/x['filename']
    try:
        if path.exists():b=path.read_bytes();out['cached']=True
        else:
            req=urllib.request.Request(x['url'],headers={'User-Agent':'Mozilla/5.0'})
            with urllib.request.urlopen(req,timeout=45) as r:b=r.read();out['finalUrl']=r.url;out['contentType']=r.headers.get('Content-Type')
            path.write_bytes(b)
        out.update(status='downloaded',archive=str(path.relative_to(ROOT.parents[3])),bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
        if path.suffix.lower() in ['.htm','.html']:
            try:t=b.decode('utf-8-sig')
            except UnicodeDecodeError:t=b.decode('gb18030',errors='replace')
            p=Links();p.feed(t)
            for a in p.items:a['url']=urllib.parse.urljoin(x['url'],a['url'])
            (ROOT/'extracted'/(path.stem+'-links.json')).write_text(json.dumps(p.items,ensure_ascii=False,indent=2))
            (ROOT/'extracted'/(path.stem+'.txt')).write_text('\n'.join(p.text))
    except Exception as e:out.update(status='failed',failure=type(e).__name__+': '+str(e))
    return out
if __name__=='__main__':
    batch=json.loads(Path(sys.argv[1]).read_text())
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:result=list(pool.map(fetch,batch))
    log=ROOT/'request-log.json';old=json.loads(log.read_text()) if log.exists() else []
    log.write_text(json.dumps(old+result,ensure_ascii=False,indent=2))
    for x in result:print(x['filename'],x['status'],x.get('bytes',x.get('failure')))
