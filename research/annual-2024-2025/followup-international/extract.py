"""Reproduce the international-channel audit from archived official source bytes.

Run from any directory with Python 3.9+; writes only beside this file.
No prices, shares or growth rates are used to estimate unavailable values.
"""
import csv
import hashlib
import json
from decimal import Decimal
from pathlib import Path
import xml.etree.ElementTree as ET
import zipfile

BASE = Path(__file__).resolve().parent
RAW = BASE / 'raw'
CHECKED = '2026-09-14'


def write(name, data):
    (BASE / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')


def number(raw, factor=1):
    # Excel serializes binary decimals such as 8886.2800000000007.
    return float((Decimal(raw) * Decimal(factor)).quantize(Decimal('.0001')))


ns = {'m': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
with zipfile.ZipFile(RAW / 'adb-all-2026.xlsx') as archive:
    shared = [''.join(s.itertext()) for s in ET.fromstring(archive.read('xl/sharedStrings.xml'))]
    workbook = ET.fromstring(archive.read('xl/workbook.xml'))
    sheet = next(s for s in workbook.findall('.//m:sheet', ns) if s.get('name') == 'PRC')
    rid = sheet.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
    rels = ET.fromstring(archive.read('xl/_rels/workbook.xml.rels'))
    target = next(r.get('Target') for r in rels if r.get('Id') == rid)
    xml = archive.read('xl/' + target)
    (RAW / 'adb-prc-sheet.xml').write_bytes(xml)
    cells = {}
    for c in ET.fromstring(xml).findall('.//m:sheetData/m:row/m:c', ns):
        v = c.find('m:v', ns)
        text = v.text if v is not None else ''
        if c.get('t') == 's':
            text = shared[int(text)]
        elif c.get('t') == 'inlineStr':
            text = ''.join(c.find('m:is', ns).itertext())
        if text:
            cells[c.get('r')] = text
write('raw/adb-prc-cells.json', cells)
assert cells['AA7'] == '2024' and cells['AB7'] == '2025'
assert 'CNY billion' in cells['B88'] and cells['B89'] == 'At Current Prices'
assert 'Includes mining' in cells['B556']
assert 'combined with other service activities' in cells['B557']
assert '11 March 2026' in cells['C635']

adb_rows = [
    (90, 'GDP', None, '中国 GDP', 'cn-gdp', '国内生产总值'),
    (91, 'A', 'GDP', '农林牧渔业', 'cn-agriculture', '与中国门类 A 对应；包含农业辅助活动，不是第一产业就业口径'),
    (93, 'B+C+D+E', 'GDP', '工业', 'cn-industry', '脚注 m 扩大 Manufacturing 行至采矿、制造、电气水等工业总量'),
    (96, 'F', 'GDP', '建筑业', 'cn-construction', '按 ADB 当前价国民核算建筑业行'),
    (97, 'G', 'GDP', '批发零售业', 'cn-wholesale-retail', '表内国际行名含车辆维修，不能据行名进一步拆分中国行业'),
    (98, 'H', 'GDP', '交通运输仓储邮政业', 'cn-transport', '按 ADB Transportation and storage 行；无运输方式细分'),
    (99, 'I', 'GDP', '住宿餐饮业', 'cn-accommodation-food', '住宿与餐饮合计'),
    (101, 'K', 'GDP', '金融业', 'cn-finance', '金融与保险合计'),
    (102, 'L', 'GDP', '房地产业', 'cn-real-estate', '房地产业总体'),
    (109, 'OTHER_INCLUDING_J_M_N_O_P_Q_R_S_T', 'GDP', '其他服务业（含信息和多项服务）', None, '脚注 o：包含信息、专业科学技术、行政支持、公共管理、教育、卫生等，不等于网站其他行业'),
]
adb = []
for row, code, parent, label, atlas, scope in adb_rows:
    for year, column in [(2024, 'AA'), (2025, 'AB')]:
        cell = f'{column}{row}'
        adb.append({
            'country': 'cn', 'year': year, 'sourceId': 'adb-ki2026',
            'sourceCode': code, 'sourceCodeBasis': 'ISIC-style economy-table headings, interpreted with country footnotes',
            'parentSourceCode': parent, 'name': label, 'atlasIndustryId': atlas,
            'rawLabel': cells[f'B{row}'], 'rawValue': cells[cell], 'rawUnit': 'CNY billion',
            'valueCny100m': number(cells[cell], 10), 'priceBasis': 'current-market-prices',
            'scope': scope, 'periodBasis': 'calendar-year', 'publicationEdition': '2026',
            'publishedMonth': '2026-08', 'datasetUpdated': '2026-08-31',
            'originalSourceVersion': cells['C635'], 'checkedAt': CHECKED,
            'locator': f'PRC!{cell}; row label B{row}; years AA7/AB7; unit B88; price B89; source C635',
            'footnotes': {f'PRC!B{n}': cells[f'B{n}'] for n in ([556] if row == 93 else [557, 558] if row == 109 else [])},
            'decision': 'corroborates-existing-parent-only' if atlas else 'broader-other-aggregate-not-attachable',
            'newChildValue': False,
        })
adb_missing = []
for row in [92, 94, 95, 100, 103, 104, 105, 106, 107, 108, 110]:
    assert f'AA{row}' not in cells and f'AB{row}' not in cells
    for year, column in [(2024, 'AA'), (2025, 'AB')]:
        adb_missing.append({'year': year, 'rawLabel': cells[f'B{row}'], 'value': None,
                            'locator': f'PRC!{column}{row} (no cell value); B{row} label',
                            'reason': 'included-in-industry-total-footnote-m' if row in [92, 94, 95] else 'included-in-other-services-footnotes-n-o'})
write('adb-candidates.json', {'checkedAt': CHECKED, 'values': adb, 'explicitBlankRows': adb_missing,
      'agricultureDetail': 'Only one agriculture/forestry/fishing amount row (91); no crop/forestry/livestock/fishing child amount rows.',
      'newAcceptedChildValues': 0})

with (RAW / 'undata-china-table2-4.csv').open(newline='') as f:
    reader = csv.DictReader(f)
    un = [(index + 2, r) for index, r in enumerate(reader) if r['Country or Area'] == 'China']
assert len(un) == 110
assert sorted({int(r['Year']) for _, r in un}) == list(range(2015, 2025))
un_values = []
for line, r in un:
    if r['Year'] != '2024':
        continue
    un_values.append({'country': 'cn', 'year': 2024, 'sourceId': 'undata-table2-4',
                      'sourceCode': r['SNA93 Item Code'], 'parentSourceCode': None if r['SNA93 Item Code'] == 'B.1*g' else 'B.1*g',
                      'rawLabel': r['Item'], 'rawValue': r['Value'], 'rawUnit': r['Currency'],
                      'valueCny100m': number(r['Value'], Decimal('0.00000001')),
                      'priceBasis': 'current-prices; industries include taxes less subsidies on production and imports',
                      'scope': 'China country_code=156; ISIC Rev.4-style 2.4; SNA2008; series1000',
                      'periodBasis': r['Fiscal Year Type'], 'datasetUpdated': '2025-10-14',
                      'nextScheduledUpdate': '2026-10-01', 'checkedAt': CHECKED,
                      'footnoteId': r['Value Footnotes'], 'locator': f'raw/undata-china-table2-4.csv line {line}; Value column',
                      'decision': 'older-vintage-no-new-detail', 'newChildValue': False})
write('undata-candidates.json', {'checkedAt': CHECKED, 'yearsActuallyDownloaded': list(range(2015, 2025)),
                               'recordCount': len(un), '2025Records': 0, 'values': un_values})

oecd_ns = {'s': 'http://www.sdmx.org/resources/sdmxml/schemas/v2_1/structure'}
constraints = []
for filename in ['oecd-table6-structure.xml', 'oecd-table1-output-structure.xml']:
    root = ET.parse(RAW / filename).getroot()
    cr = next(c for c in root.findall('.//s:ContentConstraint', oecd_ns) if c.get('type') == 'Actual')
    region = next(k for k in cr.findall('.//s:CubeRegion/*', oecd_ns) if k.get('id') == 'REF_AREA')
    regions = [v.text for v in region]
    constraints.append({'rawFile': filename, **cr.attrib, 'referenceAreas': regions,
                        'includesCHN': 'CHN' in regions, 'locator': 'ContentConstraint[@type="Actual"]/CubeRegion/KeyValue[@id="REF_AREA"]'})
assert constraints[0]['includesCHN'] is False and len(constraints[0]['referenceAreas']) == 57
assert constraints[1]['includesCHN'] is True
rows = list(csv.DictReader((RAW / 'oecd-table1-output-china-2024-2025.csv').open(newline='')))
assert len(rows) == 30 and {r['TIME_PERIOD'] for r in rows} == {'2024'}
oecd = []
for line, r in enumerate(rows, 2):
    if r['UNIT_MEASURE'] != 'XDC' or r['PRICE_BASE'] != 'V':
        continue
    assert r['UNIT_MULT'] == '6' and r['CURRENCY'] == 'CNY'
    oecd.append({'country': 'cn', 'year': 2024, 'sourceId': 'oecd-table1-output',
                 'sourceCode': r['ACTIVITY'], 'transaction': r['TRANSACTION'], 'rawLabel': r['Economic activity'],
                 'rawValue': r['OBS_VALUE'], 'rawUnit': 'CNY million',
                 'valueCny100m': number(r['OBS_VALUE'], Decimal('.01')), 'priceBasis': r['Price base'],
                 'scope': 'OECD SNA annual Table1 output; activity codelist ISIC4; source labels may describe broader country aggregates',
                 'observationStatus': r['OBS_STATUS'], 'version': 'DSD_NAMAIN10@DF_TABLE1_OUTPUT,2.0',
                 'checkedAt': CHECKED, 'publishedAt': None,
                 'locator': f'raw/oecd-table1-output-china-2024-2025.csv line {line}; REF_AREA=CHN; TIME_PERIOD=2024; UNIT_MEASURE=XDC; PRICE_BASE=V',
                 'decision': 'older-vintage-no-new-detail', 'newChildValue': False})
write('oecd-candidates.json', {'checkedAt': CHECKED, 'constraints': constraints,
                            'table6China2024to2025': {'httpStatus': 404, 'body': 'NoRecordsFound'},
                            'table1China2024to2025': {'rawRecordCount': 30, 'years': [2024], 'records2025': 0},
                            'currentNationalCurrencyValues': oecd,
                            'excludedOtherUnits': '20 records are USD exchange-rate conversions or constant-converter prices; no further native industry detail.'})

# Compare only directly corresponding rows from complete vintages. This is a revision check,
# never an instruction to replace or subdivide the current NBS parents.
adb24 = {r['sourceCode']: r for r in adb if r['year'] == 2024}
comparisons = []
for r in un_values:
    key = 'GDP' if r['sourceCode'] == 'B.1*g' else r['sourceCode']
    if key not in adb24:
        continue
    current = adb24[key]
    comparisons.append({'year': 2024, 'code': key, 'name': current['name'],
                        'un20251014Cny100m': r['valueCny100m'],
                        'adb2026Nbs20260311Cny100m': current['valueCny100m'],
                        'differenceOldMinusNew': number(str(r['valueCny100m'] - current['valueCny100m'])),
                        'oldLocator': r['locator'], 'newLocator': current['locator']})
write('revision-comparison.json', comparisons)

# Retain download outcome and non-secret transport metadata. A failed response is not a table.
allowed_headers = {'date', 'content-type', 'content-disposition', 'last-modified', 'content-length', 'cache-control'}
for meta_file in RAW.glob('*.meta.json'):
    meta = json.loads(meta_file.read_text())
    meta['headers'] = {k: v for k, v in meta.get('headers', {}).items() if k.lower() in allowed_headers}
    meta_file.write_text(json.dumps(meta, ensure_ascii=False, indent=2) + '\n')
sources = []
for file in sorted(RAW.iterdir()):
    if file.is_file() and not file.name.endswith('.meta.json'):
        sources.append({'file': 'raw/' + file.name, 'bytes': file.stat().st_size,
                        'sha256': hashlib.sha256(file.read_bytes()).hexdigest()})
write('archive-manifest.json', {'checkedAt': CHECKED, 'files': sources})
write('validation.json', {'checkedAt': CHECKED, 'unCountryRows': len(un), 'un2024Rows': len(un_values),
                        'un2025Rows': 0, 'adbParentAmountRows': len(adb), 'adbExplicitBlankYearRows': len(adb_missing),
                        'oecdTable6ActualAreas': len(constraints[0]['referenceAreas']), 'oecdTable6ChinaPresent': False,
                        'oecdTable1RawRows': len(rows), 'oecdTable1NativeCurrentRows': len(oecd), 'oecdTable1Years': [2024],
                        'newAcceptedChildValues': 0, 'arithmeticRule': 'unit conversion only; no back-casting, shares, revenue or growth-rate inference'})
print('Validated: UN 110 observations; ADB 20 parent amounts / 22 explicit blank year rows; OECD 30 observations, no 2025; 0 new child amounts.')
