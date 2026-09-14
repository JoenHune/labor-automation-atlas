import requests,json,pathlib,concurrent.futures,urllib.parse,re,subprocess,hashlib,html
b=pathlib.Path(__file__).parent
ids={'inspur':'000977','kaifa':'000021','zte':'000063','transsion':'688036','haige':'002465','hisense':'600060','boe':'000725','smic':'688981','luxshare':'002475','sytech':'600183','goer':'002241','wus':'002463','suncreate':'600990'}
def anchors(text):
 return [(html.unescape(u), re.sub('<[^>]*>','',t)) for u,t in re.findall(r'<a[^>]+href=[\"\']([^\"\']+)[\"\'][^>]*>(.*?)</a>',text,re.S|re.I)]
def get(kv):
 k,code=kv;url=f'https://vip.stock.finance.sina.com.cn/corp/go.php/vCB_Bulletin/stockid/{code}/page_type/zqbg.phtml';row={'companyId':k,'period':'2026-H1','checkedAt':'2026-09-14','listingUrl':url}
 try:
  r=requests.get(url,timeout=30);r.encoding='gb18030';matches=[a for a in anchors(r.text) if '2026' in a[1] and '半年度报告' in a[1] and '摘要' not in a[1] and '英文' not in a[1]]
  if not matches:row['status']='not-found-in-inspected-list';return row
  a=matches[0];link=urllib.parse.urljoin(url,a[0]);r=requests.get(link,timeout=30);r.encoding='gb18030';d=next((a for a in anchors(r.text) if '下载公告' in a[1]),None)
  row['landingUrl']=link;row['title']=a[1];row['releaseDate']=(re.search(r'公告日期:(\d{4}-\d{2}-\d{2})',r.text) or [None,None])[1]
  if not d:row['status']='pdf-link-not-found';return row
  pdf=urllib.parse.urljoin(link,d[0]);r=requests.get(pdf,timeout=60);r.raise_for_status();assert r.content[:4]==b'%PDF';p=b/'originals'/f'{k}-2026h1.pdf';p.write_bytes(r.content);subprocess.run(['pdftotext','-layout',str(p),str(b/'extracts'/f'{k}-2026h1.txt')],check=True,capture_output=True);row.update({'status':'downloaded','url':pdf,'sha256':hashlib.sha256(r.content).hexdigest(),'bytes':len(r.content),'path':str(p)})
 except Exception as e:row.update({'status':'error','error':str(e)})
 return row
if __name__=='__main__':
 rows=list(concurrent.futures.ThreadPoolExecutor(max_workers=4).map(get,ids.items()));(b/'interim-manifest.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2));print(json.dumps(rows,ensure_ascii=False,indent=2))
