"""Verify the regional module's numbers, evidence and stated completion counts."""
from pathlib import Path
import hashlib
import json
import math

P=Path(__file__).resolve().parent
def read(name):return json.loads((P/name).read_text())
def write(name,value):(P/name).write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')
panel=read('panel-data.json');data=read('observations.json');coverage=read('coverage.json');validation=read('validation.json')
sources={s['id']:s for s in panel['sources']}
assert len(sources)==len(panel['sources'])
archive_checks=[]
for source in sources.values():
 if 'archive' in source:
  path=P.parents[2]/source['archive']
  assert path.is_file(),path
  assert hashlib.sha256(path.read_bytes()).hexdigest()==source['sha256'],path
  archive_checks.append(source['id'])

numeric=missing=calculated=0
for comparison in panel['comparisons']:
 assert comparison['country']=='cn'
 assert set(comparison['nodeIds'])=={'cn-io-group-39','cn-gbt2017-39'}
 assert len({r['id'] for r in comparison['rows']})==len(comparison['rows'])
 for row in comparison['rows']:
  for ref in row['evidence']:assert ref['sourceId'] in sources and ref['locator'].strip()
  if row['value'] is None:
   missing+=1
   assert row['missingReason']
  else:
   numeric+=1
   assert math.isfinite(row['value'])
  if 'computation' in row:
   inputs=row['computation']['inputs'];expr=row['computation']['expression']
   if expr=='valueAdded / 10000':expected=inputs[0]/10000
   elif expr=='revenue / averageWorkers':expected=inputs[0]/inputs[1]
   else:
    assert expr in {'totalProfit / revenue * 100','labourCompensation / valueAdded * 100','valueAdded / tableTotalValueAdded * 100'}
    expected=inputs[0]/inputs[1]*100
   assert math.isclose(row['value'],expected,rel_tol=1e-12,abs_tol=1e-12)
   calculated+=1
for item in panel['findings']+panel['coverage']:
 for ref in item['evidence']:assert ref['sourceId'] in sources and ref['locator'].strip()
 if item.get('status')=='obtained':assert item['evidence']

assert len(coverage['regions'])==31
assert len({r['regionId'] for r in coverage['regions']})==31
assert len([r for r in panel['coverage'] if r['group']=='逐省来源矩阵'])==31
assert all((P.parents[2]/r['searchLog']).is_file() for r in coverage['regions'])
zj=next(r for r in data['localCensus'] if r['region']=='浙江')
assert all(zj[k] is None for k in ['enterpriseCount','workers','revenue','assets','liabilities'])
assert zj['candidateValues'] and zj['missingReason']
assert sum(r['revenue'] is not None for r in data['localCensus'])==6
assert len(data['regionalIo'])==2
assert sum(v[0] is not None for v in data['latestGrowth'].values())==5
metrics=[k for k in data['national'] if k!='region']
original_numeric=sum(r[k] is not None for r in data['regions'] for k in metrics)
assert original_numeric==277 and len(metrics)==9
assert all(c['withinRoundingTolerance'] for c in validation['checks'])

validation.update(
 counts={'sources':len(sources),'sourcesWithVerifiedArchives':len(archive_checks),
 'comparisons':len(panel['comparisons']),'findings':len(panel['findings']),
 'coverageEntries':len(panel['coverage']),'provinceCoverageEntries':31,
 'originalRegionalCells':31*len(metrics),'originalNumericCells':original_numeric,'originalBlankCells':2,
 'panelNumericValues':numeric,'panelMissingValues':missing,'recomputedPanelValues':calculated,
 'verifiedLocalCensusRegions':6,'pendingLocalCensusRegions':1,'localIoRegions':2,
 'comparableLatestGrowthRegions':5,'latestGrowthMissingRegions':2},
 archiveHashesVerified=archive_checks,evidenceReferencesResolve=True,
 formulasRecomputed=True,allNullRowsExplainReason=True,countryAndNodeScopeChecked=True,
 excludedCandidateValuesStayNull=True,allLocalSourcesExhausted=False)
write('validation.json',validation)
print(json.dumps(validation['counts'],ensure_ascii=False))
