"""Archive public statistical originals; no private sessions or credentials."""
import concurrent.futures, hashlib, html, json, pathlib, re, requests, subprocess
from urllib.parse import urljoin
ROOT=pathlib.Path(__file__).resolve().parent

def fetch(item):
    ident,url=item
    path=ROOT/'raw'/ident
    try:
        r=requests.get(url,timeout=15)
        if r.status_code>=400: raise ValueError('HTTP '+str(r.status_code))
        path.write_bytes(r.content)
        result={'id':ident,'url':url,'bytes':len(r.content),'sha256':hashlib.sha256(r.content).hexdigest(),'status':'acquired','retrievedAt':'2026-09-14'}
        if '.html' in ident or '.htm' in ident:
            r.encoding=r.apparent_encoding
            clean=html.unescape(re.sub('<[^>]+>',' ',r.text))
            clean=re.sub(r'[ \t]+',' ',clean)
            (ROOT/'extracted'/f'{ident}.txt').write_text(clean)
            anchors=[]
            for href,label in re.findall(r'<a\b[^>]*href=[\"\']([^\"\']+)[\"\'][^>]*>(.*?)</a>',r.text,re.S|re.I):
                label=html.unescape(re.sub('<[^>]+>','',label)).strip()
                if any(w in label for w in ['普查','产出','年鉴','2025','2024','下载','附件']):anchors.append([label,urljoin(url,href)])
            result['links']=anchors
        return result
    except Exception as e:
        fallback=subprocess.run(['curl','-f','-sS','-L','--max-time','25','-o',str(path),url],capture_output=True)
        if fallback.returncode==0:
            data=path.read_bytes()
            return {'id':ident,'url':url,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'status':'acquired','retrievedAt':'2026-09-14','transport':'curl'}
        if path.exists():path.unlink()
        return {'id':ident,'url':url,'status':'not_acquired','error':type(e).__name__,'retrievedAt':'2026-09-14'}
if __name__=='__main__':
    import sys
    (ROOT/'raw').mkdir(exist_ok=True);(ROOT/'extracted').mkdir(exist_ok=True)
    items=json.loads(pathlib.Path(sys.argv[1]).read_text())
    results=list(concurrent.futures.ThreadPoolExecutor(8).map(fetch,items))
    (ROOT/'extracted'/f'{pathlib.Path(sys.argv[1]).stem}-receipt.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
    print(json.dumps(results,ensure_ascii=False,indent=2))
