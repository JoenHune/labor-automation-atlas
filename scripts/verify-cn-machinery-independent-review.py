"""Validate review provenance and coverage; this is not a factual re-review."""
import collections
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STEM = 'cn-industry-machinery-medical-auto-transport-34-37'


def read(path):
    return json.loads((ROOT / path).read_text())


def digest(value):
    return hashlib.sha256(json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode()).hexdigest()


def pointer(value, path):
    for key in path.split('/')[1:]:
        key = key.replace('~1', '/').replace('~0', '~')
        value = value[int(key)] if isinstance(value, list) else value[key]
    return value


review = read(f'research/reviews/{STEM}-independent-decisions.json')
for record in review['inputFiles']:
    raw = (ROOT / record['path']).read_bytes()
    assert len(raw) == record['bytes'], record['path']
    assert hashlib.sha256(raw).hexdigest() == record['sha256'], record['path']

main = read(f'research/automation/{STEM}.json')
audit = read(f'research/automation/{STEM}-search-audit.json')
tasks = {t['id']: t for t in main['tasks']}
sources = {s['id']: s for s in main['sources'] + main['definitionSources']}
findings = {f['id']: f for f in review['findings']}
assert len(findings) == len(review['findings']) == review['summary']['openFindings']
for finding in findings.values():
    assert finding['resolution'] == 'open'
    assert set(finding['taskIds']) <= set(tasks)
    for path in finding['inputPointers']:
        pointer(main, path)
    for ref in finding['sourceRefs']:
        assert ref['locatorId'] in {loc['id'] for loc in sources[ref['sourceId']]['locators']}

decisions = review['taskDecisions']
assert {t['taskId'] for t in decisions} == set(tasks)
assert len(decisions) == len(tasks) == review['summary']['tasksReviewed'] == 125
assert len({t['scenarioId'] for t in tasks.values()}) == review['summary']['scenariosReviewed'] == 18
query_ids = {q['id'] for q in audit['taskQueries']}
for row in decisions:
    task = tasks[row['taskId']]
    assert row['inputTaskSha256'] == digest(task)
    assert row['originalTaskSnapshotSha256'] == digest(task['originalTask'])
    assert row['queryIds'] == task['search']['queryIds']
    assert set(row['queryIds']) <= query_ids
    expected = {f['id'] for f in findings.values() if row['taskId'] in f['taskIds']}
    assert set(row['issueIds']) == expected
    must_revise = any(findings[id]['gate'] == 'before-first-pass-acceptance' for id in expected)
    assert (row['reviewOutcome'] == 'revise-task-before-acceptance') == must_revise
    assert row['taskReviewNote'] and row['freezeApproved'] is False
    assert task['country'] == 'CN' and task['isFrozen'] is False
    assert task['independentReviewStatus'] == 'pending'
    assert len(task['economics']['parameterValues']) == 23
    assert all(value is None for value in task['economics']['parameterValues'].values())
    assert task['economics']['npv'] is None and task['economics']['paybackYears'] is None
    for key in ['workersPerCycle', 'minutesPerUnit', 'paidHoursPerYear', 'unit', 'loadedHourlyCashWageCNY', 'avoidablePaidLaborCNY']:
        assert task['humanInput'][key] is None

assert dict(collections.Counter(t['reviewOutcome'] for t in decisions)) == review['summary']['reviewOutcomeCounts']
assert len(review['sourceReads']) == review['summary']['automationSourcesRead'] == 42
assert sum(len(s['locators']) for s in review['sourceReads']) == review['summary']['automationLocatorsRead'] == 60
for row in review['sourceReads']:
    source = sources[row['sourceId']]
    assert digest(source) == row['inputSourceSha256']
    assert row['cachedTextSha256'] == source['originalContentSha256']
    assert {l['locatorId'] for l in row['locators']} == {l['id'] for l in source['locators']}
    for loc in row['locators']:
        assert loc['originalRead'] is True and loc['shortAnchorMatches'] is True
        assert set(loc['issueIds']) <= set(findings)
assert len(review['definitionReads']) == review['summary']['definitionSourcesRead'] == 8
assert sum(len(s['pageRecords']) for s in review['definitionReads']) == review['summary']['definitionPdfPagesRead'] == 45
for row in review['definitionReads']:
    assert row['originalContentSha256'] == sources[row['sourceId']]['originalContentSha256']
assert len(review['additionalContextReads']) == review['summary']['additionalContextPassagesRead'] == 5
assert len(review['visualReadReceipts']) == review['summary']['visualPagesRead'] == 3
assert len(review['freshPrimaryReads']) == review['summary']['freshUrlsAttempted'] == 8
assert sum(r['status'] == 'relevant-live-body-read' for r in review['freshPrimaryReads']) == review['summary']['freshRelevantBodiesRead'] == 4
assert len(audit['taskQueries']) == review['summary']['mainQueriesChecked'] == 250
assert len(audit['supplementalSearches']) == review['summary']['supplementalQueriesChecked'] == 4
assert len(review['requestResponseAudit']) == review['summary']['savedRequestResponsePairsChecked'] == 64
assert all(p['checksPassed'] for p in review['requestResponseAudit'])
assert set(q for p in review['requestResponseAudit'] for q in p['queryIds']) == query_ids | {q['id'] for q in audit['supplementalSearches']}
assert review['cashReview']['inputModelSha256'] == digest(main['cashFlowModels'][0])
assert review['reviewStatus'] == 'needs-author-revision'
assert review['independentFirstPassAccepted'] is False
for key in ['newCountedTasks', 'websiteResearchCountIncrease']:
    assert review['summary'][key] == 0
for key in ['taskListFrozen', 'authorFilesModified']:
    assert review['summary'][key] is False

print('PASS: 125 exact-input task reviews; 42 sources / 60 locators; 8 definitions; 254 saved queries; no acceptance or count promotion.')
