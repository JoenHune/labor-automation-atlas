"""Verify saved author-revision artifacts; this is not an independent fact review."""
import copy
import hashlib
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STEM = 'cn-industry-fuel-chemical-pharma-fiber-rubber-plastic-25-29'
AUTO = ROOT / 'research' / 'automation'
REVIEWS = ROOT / 'research' / 'reviews'


def digest(data):
    return hashlib.sha256(data).hexdigest()


def serialize(obj):
    return (json.dumps(obj, ensure_ascii=False, indent=2) + '\n').encode()


def read(path):
    return json.loads(path.read_text())


ledger = read(REVIEWS / (STEM + '-author-revision.json'))
validation = read(AUTO / (STEM + '-validation.json'))
documents = {file: read(ROOT / file) for file in ledger['preparedOutputSha256']}
for file, expected in ledger['preparedOutputSha256'].items():
    assert digest((ROOT / file).read_bytes()) == expected, file
    assert serialize(documents[file]) == (ROOT / file).read_bytes(), file
assert digest((REVIEWS / (STEM + '-automation-decisions.json')).read_bytes()) == ledger['originalReviewSha256']
for archive in ledger['originalAuxiliaryArchive']:
    assert digest((ROOT / archive['archiveFile']).read_bytes()) == archive['sha256'], archive['archiveFile']
for suffix, key in [('metadata-repair-proposal', 'metadataProposalSha256'), ('source-repair-proposal', 'sourceProposalSha256')]:
    assert digest((REVIEWS / (STEM + '-' + suffix + '.json')).read_bytes()) == ledger[key]


def replay(objects, reverse):
    result = copy.deepcopy(objects)
    rows = reversed(ledger['changes']) if reverse else ledger['changes']
    for change in rows:
        parent = result[change['file']]
        for key in change['path'][:-1]:
            parent = parent[key]
        key = change['path'][-1]
        before, after = ('after', 'before') if reverse else ('before', 'after')
        if change[before + 'Present']:
            assert parent[key] == change[before], change['path']
        else:
            assert key not in parent, change['path']
        if change[after + 'Present']:
            parent[key] = copy.deepcopy(change[after])
        else:
            del parent[key]
    return result


originals = replay(documents, True)
for file, obj in originals.items():
    assert digest(serialize(obj)) == ledger['originalInputSha256'][file], file
assert replay(originals, False) == documents
main_file = 'research/automation/' + STEM + '.json'
audit_file = 'research/automation/' + STEM + '-search-audit.json'
main, audit = documents[main_file], documents[audit_file]
original_main, original_audit = originals[main_file], originals[audit_file]
assert len(main['tasks']) == 178 and len(main['scenarios']) == 32
assert len(main['sources']) == 98 and len(main['inventorySources']) == 6
assert not main['isFrozen'] and not validation['independentFinalAcceptance']
assert not validation['publicImportReady'] and ledger['independentRecheckRequired']
assert not ledger['importedToPublicResearch']
assert audit['taskQueries'] == original_audit['taskQueries']
assert len(audit['taskQueries']) == 356
assert [q['queries'] for q in audit['supplementalSearches']] == [q['queries'] for q in original_audit['supplementalSearches']]
assert sum(len(q['queries']) for q in audit['supplementalSearches']) == 8
task_ids = {task['id'] for task in main['tasks']}
scenario_ids = {scenario['id'] for scenario in main['scenarios']}
for task, original in zip(main['tasks'], original_main['tasks']):
    assert task['id'] == original['id'] and task['originalTask'] == original['originalTask']
    assert task['country'] == 'CN' and task['industryId'] == 'cn-industry'
    assert task['scenarioId'] in scenario_ids and not task['isFrozen']
    assert task['humanInput'] == original['humanInput'] and task['cashFlow'] == original['cashFlow']
    assert len(task['cashFlow']['parameters']) == 23 and all(value is None for value in task['cashFlow']['parameters'].values())
    assert all(task['cashFlow'][key] is None for key in ['npv', 'paybackYears', 'breakEvenPaidHours'])
    assert task['independentReviewStatus'] == 'original-draft-reviewed-author-revision-awaiting-independent-recheck'
    assert len(task['counterEvidence']['records']) == len(original['counterEvidence']['records'])
    own_queries = [q for q in audit['taskQueries'] if q['taskId'] == task['id']]
    assert len(own_queries) == 2 and {q['direction'] for q in own_queries} == {'positive', 'negative'}
    assert task['successfulCounterexamples']['boundedAlternativeIds'] == [a['id'] for a in task['alternatives'] if a['currentTaskDirectMechanism']]
    for alternative in task['alternatives']:
        assert not alternative['currentContinuousOperationVerified'] and not alternative['fullTaskAcceptanceVerified']
assert Counter(t['conclusion']['coverageLevel'] for t in main['tasks']) == main['statistics']['evidenceSupportTierCounts']
assert all(o['economicRank'] is None and o['country'] == 'CN' and set(o['taskIds']) <= task_ids for o in main['opportunities'])

sources = {s['id']: s for s in main['sources'] + main['inventorySources']}
reference_count = 0


def verify_references(obj):
    global reference_count
    if isinstance(obj, dict):
        if 'sourceId' in obj and 'locatorId' in obj:
            assert obj['sourceId'] in sources, obj['sourceId']
            assert any(l['id'] == obj['locatorId'] for l in sources[obj['sourceId']]['locators']), obj['locatorId']
            reference_count += 1
        for key, value in obj.items():
            if key != 'originalTask':
                verify_references(value)
    elif isinstance(obj, list):
        for value in obj:
            verify_references(value)


verify_references(main)
assert reference_count == validation['resolvedCurrentContentReferenceCount']
for source in main['sources']:
    assert all(l.get('sourceFact', l['claim']) == l['claim'] for l in source['locators'])
for row in audit['sourceReads']:
    assert set(row['locatorIds']) <= {l['id'] for l in sources[row['sourceId']]['locators']}
markdown = (AUTO / (STEM + '.md')).read_bytes()
assert digest(markdown) == validation['markdownSha256']
assert sum(line.startswith('### cn-ind-') for line in markdown.decode().splitlines()) == 178
assert validation['outputSha256'] == digest((AUTO / (STEM + '.json')).read_bytes())
assert validation['searchAuditSha256'] == digest((AUTO / (STEM + '-search-audit.json')).read_bytes())
assert all(validation['checks'].values()) and validation['errors'] == []
print(json.dumps({'status': 'saved-author-artifacts-verified-not-independent-factual-acceptance', 'tasks': 178, 'queries': 356, 'supplementalQueries': 8, 'currentReferences': reference_count, 'reversibleChanges': len(ledger['changes']), 'originalBytesRecovered': True, 'publicImportReady': False}, indent=2))
