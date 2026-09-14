"""Restore cached report originals from explicit URLs; verify frozen SHA-256 before use."""
from pathlib import Path
import json,hashlib,urllib.request,subprocess
B=Path(__file__).parent
for s in json.loads((B/'sources.json').read_text())['sources']:
 suffix='2026h1' if s['id'].endswith('-h12026') else '2025';company=s['id'].rsplit('-',1)[0]
 p=B/'originals'/f'{company}-{suffix}.pdf';p.parent.mkdir(exist_ok=True)
 if not p.exists():
  data=urllib.request.urlopen(s['url'],timeout=60).read()
  if hashlib.sha256(data).hexdigest()!=s['sha256']:raise RuntimeError(f"Source content changed: {s['id']}; review before accepting")
  p.write_bytes(data)
 assert hashlib.sha256(p.read_bytes()).hexdigest()==s['sha256'],s['id']
 t=B/'extracts'/f'{company}-{suffix}.txt';t.parent.mkdir(exist_ok=True)
 subprocess.run(['pdftotext','-layout',str(p),str(t)],check=True)
 print('verified',s['id'])
