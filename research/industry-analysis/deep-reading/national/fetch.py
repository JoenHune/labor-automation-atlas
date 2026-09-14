"""Restore archived public sources and verify the original byte hashes."""
import hashlib,json,urllib.request
from pathlib import Path
ROOT=Path(__file__).resolve().parents[4]
records=json.loads(Path(__file__).with_name('fetch-log.json').read_text())
for record in records:
    if 'sha256' not in record: continue
    destination=ROOT/record['path']
    if destination.exists() and hashlib.sha256(destination.read_bytes()).hexdigest()==record['sha256']: continue
    request=urllib.request.Request(record['url'],headers={'User-Agent':'Mozilla/5.0'})
    body=urllib.request.urlopen(request,timeout=45).read()
    if hashlib.sha256(body).hexdigest()!=record['sha256']: raise ValueError('Source changed; review a new version: '+record['id'])
    destination.parent.mkdir(parents=True,exist_ok=True)
    destination.write_bytes(body)
