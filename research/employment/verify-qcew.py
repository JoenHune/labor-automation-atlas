"""Independent source check: compare displayed QCEW recipe inputs with raw CSV rows."""
import csv
import hashlib
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parent
base = root / 'us'
data = json.loads((base / 'dataset.json').read_text())
tables = {}
hashes = {}
for path in (base / 'originals').glob('qcew-*-us.csv'):
    key = path.name.removeprefix('qcew-').removesuffix('-us.csv')
    tables[key] = {(r['own_code'], r['industry_code']): r for r in csv.DictReader(path.open())}
    hashes[str(path.relative_to(root.parent.parent))] = hashlib.sha256(path.read_bytes()).hexdigest()
checks = {}
errors = []
for record in data['records']:
    for measure in [record['employment']] + [r['measure'] for r in record['references']]:
        for item in (measure.get('calculation') or {}).get('inputs', []):
            match = re.fullmatch(r'QCEW (\d):(.+)', item['label'])
            if not match:
                continue
            source = next((e['sourceId'] for e in item['evidence'] if re.fullmatch(r'us-employment-qcew-(\d{4}|2026q1)', e['sourceId'])), None)
            if not source:
                errors.append([record['id'], 'missing source', item['label']])
                continue
            year = source.removeprefix('us-employment-qcew-')
            row = tables[year].get(match.groups())
            column = 'month3_emplvl' if year == '2026q1' else 'annual_avg_emplvl'
            key = '|'.join((year, *match.groups(), column))
            if not row or float(row[column]) != item['value']:
                errors.append([record['id'], key, item['value'], row[column] if row else None])
            checks[key] = item['value']
result = {
    'checkedAt': '2026-09-14',
    'reviewer': 'root independent of US extraction/model scripts',
    'scope': 'Every explicitly labeled QCEW recipe input in main and reference employment records; checks numbers, ownership, industry, source year and annual/quarterly column. Does not establish BEA/NAICS mapping or model validity.',
    'datasetSha256': hashlib.sha256((base / 'dataset.json').read_bytes()).hexdigest(),
    'sourceHashes': hashes,
    'distinctChecks': len(checks), 'errors': errors, 'checkedValues': checks,
}
(root / 'qcew-independent-check.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'distinctChecks': len(checks), 'errors': errors}, ensure_ascii=False))
assert not errors
