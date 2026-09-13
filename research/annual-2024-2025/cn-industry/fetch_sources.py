"""Download only the public official sources selected in this bounded review.
Archives no credentials, cookies, or error response bodies. No site inputs edited.
"""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime,timezone
import json,hashlib,re,html
import requests
ROOT=Path(__file__).resolve().parent
URLS={
'yearbook2025-C03-06.jpg':'https://www.stats.gov.cn/sj/ndsj/2025/html/C03-06.jpg',
'yearbook2025-C13-02.jpg':'https://www.stats.gov.cn/sj/ndsj/2025/html/C13-02.jpg',
'yearbook2025-accounts-note.html':'https://www.stats.gov.cn/sj/ndsj/2025/html/sm03.htm',
'yearbook2025-index.html':'https://www.stats.gov.cn/sj/ndsj/2025/left.htm',
'yearbooks-current-index.html':'https://www.stats.gov.cn/sj/ndsj/',
'gdp2024-preliminary.html':'https://www.stats.gov.cn/xxgk/sjfb/zxfb2020/202501/t20250118_1958363.html',
'gdp2024-final.html':'https://www.stats.gov.cn/xxgk/sjfb/zxfb2020/202512/t20251226_1962144.html',
'gdp2025-preliminary.html':'https://www.stats.gov.cn/sj/zxfbhjd/202601/t20260120_1962349.html',
'industrial-growth2024.html':'https://www.stats.gov.cn/sj/zxfb/202501/t20250117_1958331.html',
'industrial-growth2025.html':'https://www.stats.gov.cn/sj/zxfbhjd/202601/t20260119_1962329.html',
'industrial-statistics-faq.html':'https://www.stats.gov.cn/hd/cjwtjd/202302/t20230207_1902277.html',
'industrial-growth-method.html':'https://www.stats.gov.cn/zs/tjws/zytjzbqs/gysczzsd/202410/t20241025_1957170.html',
'digital-economy2024.html':'https://www.stats.gov.cn/xxgk/sjfb/zxfb2020/202512/t20251230_1962177.html',
'patent-intensive2024.html':'https://www.stats.gov.cn/sj/zxfbhjd/202512/t20251231_1962229.html',
'miit-electronics2024.html':'https://www.miit.gov.cn/gxsj/tjfx/dzxx/art/2025/art_1700821f77774a368eaa88e6c9fb3807.html',
'miit-electronics2025.html':'https://www.miit.gov.cn/gxsj/tjfx/dzxx/art/2026/art_92806ace120f403b8c87cb703721520f.html',
'miit-electronics2024-annual-note.html':'https://www.miit.gov.cn/dznj2024/tz/%E7%BC%96%E8%80%85%E8%AF%B4%E6%98%8E.html',
'statistical-abstract2026-catalog.html':'https://www.zgtjcbs.com/xinshushangshi/5918',
'nbs-release-calendar2026.html':'https://www.stats.gov.cn/xw/tjxw/tzgg/202512/t20251224_1962137.html'
}
PREVIOUS={s['id']:s for s in json.loads((ROOT/'source-manifest.json').read_text()).get('sources',[])} if (ROOT/'source-manifest.json').exists() else {}
def fetch(item):
 filename,url=item;meta={'id':filename.rsplit('.',1)[0],'url':url,'checkedAt':'2026-09-14'};f=ROOT/'originals'/filename
 prior=PREVIOUS.get(meta['id'],{})
 if not f.exists() and prior.get('httpStatus',200)!=200:return prior
 meta={**prior,**meta}
 if f.exists():meta['archiveAction']='previously_downloaded_in_this_review';b=f.read_bytes()
 else:
  try:
   rr=requests.get(url,timeout=25);meta.update({'httpStatus':rr.status_code,'retrievedAt':datetime.now(timezone.utc).isoformat()})
   if rr.status_code!=200:return meta
   b=rr.content;f.write_bytes(b)
  except requests.RequestException as exc:meta['archiveError']=type(exc).__name__;return meta
 meta.update({'archive':'originals/'+filename,'sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b)})
 if filename.endswith('.html'):
  charset=re.search(br'charset[=\"\\s]+([A-Za-z0-9_-]+)',b[:4096],re.I)
  encoding=charset.group(1).decode('ascii') if charset else 'utf-8'
  text=b.decode(encoding,errors='replace');text=html.unescape(re.sub('<[^>]+>',' ',text));text=re.sub(r'\s+',' ',text);f.with_suffix('.txt').write_text(text)
 return meta
with ThreadPoolExecutor(max_workers=4) as pool: sources=list(pool.map(fetch,URLS.items()))
(ROOT/'source-manifest.json').write_text(json.dumps({'checkedAt':'2026-09-14','sources':sources},ensure_ascii=False,indent=2)+'\n')
print(json.dumps([{'id':s['id'],'archived':'archive' in s,'bytes':s.get('bytes'),'status':s.get('httpStatus')} for s in sources],ensure_ascii=False))
