# -*- coding: utf-8 -*-
"""Restore missing raw sources only; refuse changed vintages or edits to old research."""
from pathlib import Path
import json,hashlib,urllib.request,zipfile
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
for s in json.loads((HERE/'sources.json').read_text()):
 archive=s.get('archive');expected=s.get('sha256')
 if not archive or not expected:continue
 p=(ROOT/archive).resolve()
 if HERE not in p.parents:continue
 if p.exists():
  assert hashlib.sha256(p.read_bytes()).hexdigest()==expected,(archive,'archive changed');continue
 if p.suffix=='.json':raise RuntimeError(f'{archive}: Web-tool readable capture requires a fresh explicit capture, not a URL download')
 p.parent.mkdir(parents=True,exist_ok=True)
 with urllib.request.urlopen(s['url'],timeout=60) as r:data=r.read()
 assert hashlib.sha256(data).hexdigest()==expected,(s['url'],'online vintage differs; create a new research version')
 p.write_bytes(data)
for archive,files in [('SUPPLY-USE.zip',['Use_SUT_Detail.xlsx']),('GS00EMP01.zip',['GS00EMP01.dat','GS00EMP01_FIELDS.txt','GS00EMP01_README.txt'])]:
 z=zipfile.ZipFile(HERE/'originals'/archive)
 for name in files:
  target=HERE/'originals'/('GS00EMP01' if archive=='GS00EMP01.zip' else '')/name
  target.parent.mkdir(parents=True,exist_ok=True)
  if not target.exists():target.write_bytes(z.read(name))
print('Present archives verified; missing approved-vintage originals restored.')
