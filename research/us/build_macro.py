"""Reproduce the atlas's US industry selection from the archived BEA workbook."""
import csv
import hashlib
import json
from pathlib import Path

import openpyxl
from openpyxl.utils import get_column_letter

ROOT = Path(__file__).resolve().parent
RAW = ROOT / 'raw'
BOOK = 'ValueAdded.xlsx'
wb = openpyxl.load_workbook(RAW / BOOK, read_only=True, data_only=True)
AS_OF = '2026-09-09'
VINTAGE = '2026-06-25'
SOURCE = 'us-bea-value-added-2026-06-25'
URL = 'https://apps.bea.gov/industry/Release/XLS/GDPxInd/ValueAdded.xlsx'

# An exhaustive, disjoint partition. Parent aggregations are not ranked.
SECTORS = [
    (3, 'agriculture', '11', '农业、林业、渔业和狩猎业', 'primary'),
    (6, 'mining', '21', '采矿业', 'secondary'),
    (10, 'utilities', '22', '公用事业', 'secondary'),
    (11, 'construction', '23', '建筑业', 'secondary'),
    (12, 'manufacturing', '31-33', '制造业', 'secondary'),
    (34, 'wholesale', '42', '批发业', 'tertiary'),
    (35, 'retail', '44-45', '零售业', 'tertiary'),
    (40, 'transport', '48-49', '运输和仓储业', 'tertiary'),
    (49, 'information', '51', '信息业', 'tertiary'),
    (55, 'finance', '52', '金融和保险业', 'tertiary'),
    (60, 'real-estate', '53', '房地产及租赁业', 'tertiary'),
    (66, 'professional', '54', '专业、科学和技术服务业', 'tertiary'),
    (70, 'management', '55', '公司和企业管理', 'tertiary'),
    (71, 'administrative', '56', '行政及废弃物管理服务业', 'tertiary'),
    (75, 'education', '61', '教育服务业', 'tertiary'),
    (76, 'health', '62', '医疗保健和社会援助', 'tertiary'),
    (82, 'arts', '71', '艺术、娱乐和休闲业', 'tertiary'),
    (85, 'hospitality', '72', '住宿和餐饮业', 'tertiary'),
    (88, 'other-services', '81', '其他服务业（政府除外）', 'tertiary'),
    (89, 'government', 'G', '政府', 'tertiary'),
]


def sheet_rows(sheet):
    ws = wb[sheet]
    return {
        int(row[0]): (excel_row, row)
        for excel_row, row in enumerate(ws.iter_rows(min_row=9, values_only=True), 9)
        if str(row[0]).isdigit()
    }


def observation(sheet, line, period):
    ws = wb[sheet]
    cols = {str(c.value): i for i, c in enumerate(ws[8], 1) if c.value is not None}
    rownum, row = TABLES[sheet][line]
    col = cols[period]
    raw_value = row[col - 1]
    value = raw_value if isinstance(raw_value, (int, float)) else None
    return {
        'period': period,
        'value': value,
        'unit': 'percent' if sheet.startswith('TVA101') else 'USD million',
        'priceBasis': 'real chain-type quantity index' if sheet.startswith('TVA101') else 'current prices',
        'frequency': 'annual' if sheet.endswith('-A') else 'quarterly',
        'seasonalAdjustment': 'not applicable' if sheet.endswith('-A') else 'seasonally adjusted',
        'annualRate': sheet.endswith('-Q'),
        'releaseDate': VINTAGE,
        'vintage': VINTAGE,
        'revisionStatus': 'latest available vintage; subject to BEA revision',
        'kind': 'direct_fact',
        'sourceId': SOURCE,
        'sourceLocator': {
            'file': BOOK, 'sheet': sheet, 'beaLine': line,
            'cell': f'{get_column_letter(col)}{rownum}',
            'periodHeaderCell': f'{get_column_letter(col)}8',
            'titleCell': 'A1', 'unitCell': 'A2', 'releaseDateCell': 'A5',
        },
        **({'missingReason': f'BEA published placeholder: {raw_value}'} if value is None else {}),
    }


TABLES = {s: sheet_rows(s) for s in ['TVA105-A', 'TVA105-Q', 'TVA101-Q']}
years = ['2021', '2022', '2023', '2024', '2025']
industries = []
for line, slug, code, zh, sector in SECTORS:
    industries.append({
        'id': f'us-{slug}', 'country': 'US', 'name': zh,
        'nameEn': TABLES['TVA105-A'][line][1][1].strip(),
        'beaLine': line, 'naicsSectorGroup': code,
        'researchSector': sector,
        'scope': 'Government, including federal and state/local general government and enterprises' if code == 'G' else 'Private industries only; as classified in BEA GDP by Industry',
        'annual': [observation('TVA105-A', line, year) for year in years],
        'latestQuarter': {
            'nominalValueAdded': observation('TVA105-Q', line, '2026Q1'),
            'realGrowthQoqAnnualized': observation('TVA101-Q', line, '2026Q1'),
        },
    })

rankings = {}
for year in years:
    ordered = sorted(industries, key=lambda i: next(o['value'] for o in i['annual'] if o['period'] == year), reverse=True)
    rankings[year] = [i['id'] for i in ordered]
    for rank, item in enumerate(ordered, 1):
        next(o for o in item['annual'] if o['period'] == year)['rankWithinDeclaredUniverse'] = rank

top10 = rankings['2025'][:10]
covered = {i['researchSector'] for i in industries if i['id'] in top10}
supplements = []
for missing in set(['primary', 'secondary', 'tertiary']) - covered:
    item = next(i for ident in rankings['2025'] for i in industries if i['id'] == ident and i['researchSector'] == missing)
    supplements.append({'industryId': item['id'], 'reason': f'Top 10 does not cover {missing}; highest-value identifiable industry in this sector', 'rank': rankings['2025'].index(item['id']) + 1, 'outsideTop10': True})

totals = [observation('TVA105-A', 1, y) for y in years]
validation = []
for year, total in zip(years, totals):
    actual = sum(next(o['value'] for o in i['annual'] if o['period'] == year) for i in industries)
    validation.append({'period': year, 'sectorSum': actual, 'publishedGDP': total['value'], 'difference': actual-total['value'], 'unit': 'USD million', 'kind': 'calculation', 'formula': 'sum of the 20 declared non-overlapping industry values minus published GDP', 'withinRoundingTolerance': abs(actual-total['value']) <= 10})

unselected = [i for i in industries if i['id'] not in top10 and i['id'] not in [s['industryId'] for s in supplements]]
unselected_value = sum(i['annual'][-1]['value'] for i in unselected)
sources = [
    {'id': SOURCE, 'publisher': 'U.S. Bureau of Economic Analysis', 'title': 'Value Added by Industry', 'url': URL, 'localFile': 'research/us/raw/ValueAdded.xlsx', 'releaseDate': VINTAGE, 'retrievedDate': AS_OF, 'sha256': hashlib.sha256((RAW/BOOK).read_bytes()).hexdigest(), 'type': 'official_statistical_workbook', 'locators': 'Annual: TVA105-A; quarterly nominal SAAR: TVA105-Q; quarterly real annualized growth: TVA101-Q. A1 title, A2 units, A3 coverage, A5 publication date, row 8 period headers.'},
    {'id': 'us-bea-industry-release-calendar', 'publisher': 'U.S. Bureau of Economic Analysis', 'title': 'GDP by Industry', 'url': 'https://www.bea.gov/data/gdp/gdp-industry', 'retrievedDate': AS_OF, 'locator': 'Current release / Next release and note that industry statistics accompany the third GDP estimate'},
    {'id': 'us-bea-2025-first-full-year', 'publisher': 'U.S. Bureau of Economic Analysis', 'title': 'GDP (Third Estimate), Industries, Corporate Profits, State GDP, and State Personal Income, 4th Quarter and Year 2025', 'url': 'https://www.bea.gov/news/2026/gdp-third-estimate-industries-corporate-profits-state-gdp-and-state-personal-income-4th', 'releaseDate': '2026-04-09', 'retrievedDate': AS_OF, 'locator': 'Release dateline; Annual estimates; this is the first 2025 full-year industry release, not the vintage used for numbers'},
    {'id': 'us-bea-2026q1-release', 'publisher': 'U.S. Bureau of Economic Analysis', 'title': 'GDP (Third Estimate), Industries, Corporate Profits, State GDP, and State Personal Income, 1st Quarter 2026', 'url': 'https://www.bea.gov/news/2026/gdp-third-estimate-industries-corporate-profits-state-gdp-and-state-personal-income-1st', 'releaseDate': VINTAGE, 'retrievedDate': AS_OF, 'locator': 'Release dateline; GDP by industry; quarterly percent-change convention footnote'},
    {'id': 'us-bea-2026-annual-update-schedule', 'publisher': 'U.S. Bureau of Economic Analysis', 'title': 'Information on 2026 Annual Updates to the National, Industry, State, and County Statistics', 'url': 'https://www.bea.gov/information-updates-national-regional-economic-accounts', 'retrievedDate': AS_OF, 'locator': 'Opening paragraphs: September 30 start; NEA open revision period 2021Q1–2026Q1'},
    {'id': 'us-bea-concordance', 'publisher': 'U.S. Bureau of Economic Analysis', 'title': 'BEA Industry and Commodity Codes and NAICS Concordance', 'url': 'https://www.bea.gov/sites/default/files/2023-10/BEA-Industry-and-Commodity-Codes-and-NAICS-Concordance.xlsx', 'retrievedDate': AS_OF, 'dataRole': 'classification reference only; 2023 document is not the ranking dataset'},
    {'id': 'us-bea-housing-scope', 'publisher': 'U.S. Bureau of Economic Analysis', 'title': 'Why is GDP by state so large for the real estate industry?', 'url': 'https://www.bea.gov/help/faq/95', 'retrievedDate': AS_OF, 'locator': 'Answer paragraph: real estate includes imputed rental value of owner-occupied housing'},
]

output = {
    'schemaVersion': '1.0', 'country': 'US', 'title': '美国行业增加值底表',
    'asOf': AS_OF, 'researchVersion': 'us-macro-2026-09-09-v1',
    'latestFullYear': 2025, 'latestFullYearInitialReleaseDate': '2026-04-09',
    'vintage': VINTAGE, 'nextIndustryReleaseDate': '2026-09-30',
    'rankingMetric': 'annual current-dollar value added', 'rankingUnit': 'USD million',
    'rankingUniverse': {
        'id': 'bea-private-naics-sector-groups-plus-government-20',
        'description': '19 private NAICS sector groups plus BEA Government; all 20 are mutually exclusive and collectively cover GDP. This partition is an atlas selection rule applied to official BEA rows, not a BEA-published Top 10.',
        'includesGovernment': True,
        'privateIndustryLines': [s[0] for s in SECTORS if s[2] != 'G'],
        'governmentLine': 89,
        'excludedParentAggregationLines': [1, 2, 54, 65, 74, 81, 98, 99, 100],
        'rule': 'Never rank a parent and any descendant together. Finance/insurance and real estate/rental fully replace line 54; lines 66,70,71 replace 65; 75,76 replace 74; 82,85 replace 81. Government remains whole, so federal/state/local are not separate ranking rows.',
        'researchSectorNote': 'Primary/secondary/tertiary are atlas research labels, not an official BEA three-sector classification. Agriculture is primary; mining/utilities/construction/manufacturing secondary; remaining groups tertiary. BEA private-goods/private-services aggregates use a different convention, including utilities in services.',
    },
    'annualGDP': totals,
    'latestQuarter': {'period': '2026Q1', 'releaseDate': VINTAGE, 'nominalGDP': observation('TVA105-Q',1,'2026Q1'), 'realGDPGrowthQoqAnnualized': observation('TVA101-Q',1,'2026Q1'), 'notComparableToAnnualRanking': True, 'status': 'Latest actually published industry detail as of the research date. 2026Q2 industry detail is not yet published; do not infer it from 2026Q2 aggregate GDP.'},
    'industries': industries,
    'rankingsByYear': rankings,
    'selection': {'year': 2025, 'top10': top10, 'supplements': supplements, 'kind': 'calculation', 'formula': 'sort the 20 official annual nominal values descending; take 10; add highest industry from any uncovered researchSector outside the ranking'},
    'coverage': {
        'statisticalCoverage': 'All 20 declared groups and all requested annual observations are present.',
        'rankingUniverseCoveragePercent': 100,
        'top10SharePercent': round(sum(i['annual'][-1]['value'] for i in industries if i['id'] in top10)/totals[-1]['value']*100,4),
        'selectedSharePercent': round((totals[-1]['value']-unselected_value)/totals[-1]['value']*100,4),
        'notSelectedValue': unselected_value, 'unit': 'USD million',
        'notSelectedIndustryIds': [i['id'] for i in unselected],
        'unresolvedOtherServicesAggregate': {'industryId': 'us-other-services', 'value': next(i for i in industries if i['id']=='us-other-services')['annual'][-1]['value'], 'status': 'Retain as the official aggregate; do not invent finer current-year splits.'},
        'kind': 'calculation', 'formula': 'selected or top10 annual current-dollar value added divided by annual GDP; outside-scope value is the sum of unselected official rows',
    },
    'interpretationNotes': [
        {'text': 'GDP industry size is a selection criterion, not an addressable automation market or a measure of physical labor. Real estate includes imputed owner-occupied housing services.', 'kind': 'research_judgment', 'sourceIds': ['us-bea-housing-scope', SOURCE]},
        {'text': 'Government contains federal and state/local general government and government enterprises in this industry table. Do not add those descendants, or government spending totals, to the main ranking.', 'kind': 'direct_fact', 'sourceIds': [SOURCE], 'locator': 'TVA105-A lines 89–97'},
        {'text': 'All five years use one latest available workbook vintage. The June 25 vintage date does not assert that every historical cell changed on June 25. BEA values remain subject to later annual revisions.', 'kind': 'method', 'sourceIds': [SOURCE, 'us-bea-2026-annual-update-schedule']},
    ],
    'gaps': [
        {'id': 'us-2026q2-industry-not-yet-published', 'status': 'not_yet_released', 'period': '2026Q2', 'expectedReleaseDate': '2026-09-30', 'sourceId': 'us-bea-industry-release-calendar'},
        {'id': 'us-task-economics-not-in-macro', 'status': 'requires_task_research', 'detail': 'The macro workbook provides no task hours, residual staffing, capital cost, or automation ROI; these must be evidenced separately.'},
    ],
    'validation': validation, 'sources': sources,
}
(ROOT/'macro.json').write_text(json.dumps(output, ensure_ascii=False, indent=2)+'\n')

# Preserve every detailed official row for downstream subindustry research, without ranking it.
details = []
for line, (rownum, row) in TABLES['TVA105-A'].items():
    details.append({'beaLine': line, 'nameEn': row[1].strip(), 'annual': [observation('TVA105-A', line, y) for y in years], 'latestQuarter': observation('TVA105-Q', line, '2026Q1')})
(ROOT/'detail-series.json').write_text(json.dumps({'country':'US','vintage':VINTAGE,'sourceId':SOURCE,'warning':'Hierarchical rows overlap. Do not sum or rank all rows together.','rows':details},ensure_ascii=False,indent=2)+'\n')
with (ROOT/'annual-industry-series.csv').open('w',newline='') as f:
    writer=csv.writer(f); writer.writerow(['country','industry_id','name_zh','name_en','bea_line','period','current_value_added_usd_million','source_url','sheet','cell','release_date','vintage'])
    for i in industries:
        for o in i['annual']:
            writer.writerow(['US',i['id'],i['name'],i['nameEn'],i['beaLine'],o['period'],o['value'],URL,'TVA105-A',o['sourceLocator']['cell'],VINTAGE,VINTAGE])
assert len(industries)==20 and len(top10)==10
assert all(v['withinRoundingTolerance'] for v in validation)
assert all(o['value'] is not None for i in industries for o in i['annual'])
print(json.dumps({'selected':top10,'supplements':supplements,'validation':validation,'coverage':output['coverage']},ensure_ascii=False,indent=2))
