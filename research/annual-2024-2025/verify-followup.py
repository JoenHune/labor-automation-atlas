"""Independently cross-check follow-up source archives and unchanged atlas gaps.

Reads public source archives; writes only followup-validation.json.
Python 3.9+ and openpyxl are required. No network or website mutation.
"""
from pathlib import Path
from decimal import Decimal
import csv
import hashlib
import json
import openpyxl

BASE = Path(__file__).resolve().parent


def read(path):
    return json.loads((BASE / path).read_text())


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


checked_hashes = 0
for item in read('followup-cn-books/source-manifest.json')['sources']:
    assert digest(BASE / 'followup-cn-books' / item['raw']) == item['sha256']
    checked_hashes += 1
for item in read('followup-international/archive-manifest.json')['files']:
    assert digest(BASE / 'followup-international' / item['file']) == item['sha256']
    checked_hashes += 1
for item in read('followup-us-availability/files-manifest.json'):
    assert digest(BASE / 'followup-us-availability' / item['file']) == item['sha256']
    checked_hashes += 1

# Independently decode the workbook, rather than reuse its extracted candidate JSON.
sheet = openpyxl.load_workbook(
    BASE / 'followup-international/raw/adb-all-2026.xlsx', data_only=True
)['PRC']
assert (sheet['AA7'].value, sheet['AB7'].value) == (2024, 2025)
assert 'CNY billion' in sheet['B88'].value
assert sheet['B89'].value == 'At Current Prices'
assert 'Includes mining' in sheet['B556'].value
assert 'combined with other service activities' in sheet['B557'].value
assert '11 March 2026' in sheet['C635'].value
assert round(sheet['AA93'].value * 10, 1) == 404518.5
assert round(sheet['AB93'].value * 10, 1) == 416826.0
for row in [92, 94, 95, 100, 103, 104, 105, 106, 107, 108, 110]:
    assert sheet[f'AA{row}'].value is None and sheet[f'AB{row}'].value is None

with (BASE / 'followup-international/raw/undata-china-table2-4.csv').open(newline='') as f:
    un = [r for r in csv.DictReader(f) if r['Country or Area'] == 'China']
assert len(un) == 110 and max(int(r['Year']) for r in un) == 2024
un_industry = next(r for r in un if r['Year'] == '2024' and r['SNA93 Item Code'] == 'B+C+D+E')
assert Decimal(un_industry['Value']) / Decimal(100_000_000) == Decimal('405442.1')
assert Decimal(un_industry['Value']) / Decimal(100_000_000) != Decimal('404518.5')

# Browser tables keep values and the fixed indicator column in separate tables.
nbs = read('followup-nbs/quarterly-industry-dom.json')['tables']
labels = [r[0].replace('\ue6c9', '').strip() for r in nbs[3]]
values = nbs[1]
assert len(labels) == len(values) == 32
quarter_headers = nbs[0][0]
annual_column = quarter_headers.index('2025年第四季度')
manufacturing = next(i for i, label in enumerate(labels) if label == '制造业增加值累计值 (亿元)')
assert Decimal(values[manufacturing][annual_column]) == Decimal('346747.4')
assert not any('采矿业增加值' in label for label in labels)
assert not any('电力、热力、燃气及水' in label for label in labels)
quick_rows = read('followup-nbs/quick-national-accounts-dom.json')['table']
assert quick_rows[1] == ['指标', '1978年', '1990年', '2000年', '2022年', '2023年']

details = read('annual-details.json')
after = read('after.json')
assert details['version'] == after['researchVersion'] == '2026-09-14.preview-15'
expected_counts = {('cn', 2024): (3, 73), ('cn', 2025): (3, 73),
                   ('us', 2024): (132, 0), ('us', 2025): (52, 80)}
for row in after['summary']:
    assert (row['childrenWithValue'], row['childrenWithoutValue']) == expected_counts[(row['country'], row['year'])]
us_missing = {node['id'] for branch in details['branches'] if branch['country'] == 'us'
              and branch['year'] == 2025 for node in branch['nodes'] if node['value'] is None}
availability = read('followup-us-availability/availability-audit.json')
assert len(us_missing) == 80
assert us_missing == {node['nodeId'] for node in availability['missingNodes']}
assert all(node['officialIndustryCode'] for node in availability['missingNodes'])
assert availability['underlyingDirectVA']['maximumSelectableYear'] == 2024
assert availability['currentComponents']['maximumSelectableYear'] == 2024
assert availability['archivedComponentsDiscontinued']['latestDataYear'] == 2023
assert availability['nextScheduledIndustryUpdate']['date'] == '2026-09-30'
assert availability['nextScheduledIndustryUpdate']['isGuaranteeOfEveryRequested2025Node'] is False

report = {
    'checkedAt': '2026-09-14',
    'researchVersionUnchanged': details['version'],
    'sourceArchiveHashesVerified': checked_hashes,
    'independentWorkbookChecks': 'ADB PRC years, units, current prices, footnotes, source date and absent child cells',
    'independentRevisionCheck': 'UN 2024 industry is 405442.1; latest NBS/ADB is 404518.5 CNY 100 million; not mixed',
    'nbsQuarterlyIndicatorRows': len(labels),
    'usMissingNodesMatchedToCanonicalData': len(us_missing),
    'coverage': after['summary'],
    'newEligibleAmounts': 0,
    'allRequestedAmountsCompleted': False,
    'passed': True,
}
(BASE / 'followup-validation.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
print(json.dumps(report, ensure_ascii=False))
