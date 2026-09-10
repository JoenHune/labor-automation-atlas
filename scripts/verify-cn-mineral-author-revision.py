"""Check saved research artifacts and recovery, not independent factual acceptance."""
import copy
import hashlib
import json
from collections import Counter
from fractions import Fraction
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STEM = 'cn-industry-mineral-steel-nonferrous-foundry-30-33'
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
forward = replay(originals, False)
for file, obj in forward.items():
    assert serialize(obj) == serialize(documents[file]), file
main_file = 'research/automation/' + STEM + '.json'
audit_file = 'research/automation/' + STEM + '-search-audit.json'
main, audit = documents[main_file], documents[audit_file]
old_main, old_audit = originals[main_file], originals[audit_file]
assert len(main['tasks']) == 133 and len({t['scenarioId'] for t in main['tasks']}) == 16
assert len(main['sources']) == 61 and len(main['definitionSources']) == 6
assert sum(len(s['locators']) for s in main['sources']) == 118
assert not main['isFrozen'] and not validation['independentFinalAcceptance']
assert not validation['publicImportReady'] and ledger['independentRecheckRequired']
assert not ledger['importedToPublicResearch']
assert main['independentReview']['currentRevisionTasksIndependentlyRechecked'] == 0
assert audit['queries'] == old_audit['queries'] and len(audit['queries']) == 266
for current, previous in zip(audit['supplementalSearches'], old_audit['supplementalSearches']):
    for field in ['queries', 'requestedAtUTC', 'receivedAtUTC']:
        assert current[field] == previous[field]
assert sum(len(x['queries']) for x in audit['supplementalSearches']) == 12
for task, original, screening in zip(main['tasks'], old_main['tasks'], audit['taskScreening']):
    assert task['id'] == original['id'] == screening['taskId']
    assert task['originalTask'] == original['originalTask'] and task['humanInput'] == original['humanInput']
    assert task['country'] == 'CN' and task['industryId'] == 'cn-industry' and not task['isFrozen']
    assert task['economics']['parameterValues'] == original['economics']['parameterValues']
    assert len(task['economics']['parameterValues']) == 23
    for field in ['parameterValues', 'additionalParameterValues', 'transitionCostAmounts']:
        assert all(value is None for value in task['economics'][field].values())
    assert task['economics']['npv'] is None and task['economics']['paybackYears'] is None
    assert task['independentReviewStatus'] == 'original-draft-reviewed-author-revision-awaiting-independent-recheck'
    assert len(task['counterEvidence']['records']) == len(original['counterEvidence']['records'])
    own_queries = [q for q in audit['queries'] if q['taskId'] == task['id']]
    assert len(own_queries) == 2 and {q['direction'] for q in own_queries} == {'positive', 'negative'}
    assert task['successfulCounterexamples']['boundedAlternativeIds'] == [a['id'] for a in task['alternatives'] if a['currentTaskDirectMechanism']]
    assert len(screening['alternativeAssessments']) == len(task['alternatives'])
    assert screening['researchStatus'] == task['researchStatus']
    for alternative, assessment in zip(task['alternatives'], screening['alternativeAssessments']):
        assert not alternative['currentContinuousOperationVerified'] and not alternative['fullTaskAcceptanceVerified']
        assert assessment['supportLevel'] == alternative['evidenceSupportLevel']
        assert assessment['sourceRefs'] == alternative['sourceRefs']
        assert assessment['screeningBoundary'] == alternative['supportBoundary']
assert dict(Counter(t['researchStatus'] for t in main['tasks'])) == main['coverage']['researchStatusCounts']
assert all(o['economicRank'] is None and o['country'] == 'CN' and set(o['taskIds']) <= {t['id'] for t in main['tasks']} for o in main['opportunities'])
assert len(main['conditionalSplitProposals']) == 7
assert sum(p['proposedChildCount'] for p in main['conditionalSplitProposals']) == 16
assert all(p['newCountedTasks'] == 0 for p in main['conditionalSplitProposals'])
assert len(main['scopeExpansionCandidates']) == 4
assert all(p['newCountedTasks'] == 0 and p['siteAcceptance'] is None and p['independentCashBoundary'] is None for p in main['scopeExpansionCandidates'])
assert all(not m['siteRelationshipVerified'] for m in main['sharedOperationMappings'])

sources = {s['id']: s for s in main['sources'] + main['definitionSources']}
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
for i in range(55, 60):
    for field in ['hashRepresentation', 'locatorConvention', 'originalContentSha256']:
        assert main['sources'][i][field] == old_main['sources'][i][field]
assert not main['tasks'][37]['alternatives']
assert main['tasks'][112]['alternatives'][1]['deploymentStage'] == 'laboratory-device-description-no-test-results'
for i in [0, 16, 17, 18, 118]:
    assert not main['tasks'][i]['executionConditions']['sourceBackedRequirements']
    assert not main['tasks'][i]['residualHuman']['sourceBackedRequirements']
    assert not main['tasks'][i]['barriers']['technical']['directLimitingEvidence']
assert sources['CN-METAL-CSM-ROBOT']['latestLiveRetrieval']['result'] == 'timeout-no-new-body'
model = main['cashFlowModels'][0]
assert model['parameters'] == old_main['cashFlowModels'][0]['parameters']
assert all(x['amount'] is None and x['year'] is None for x in model['laterReplacementAndExitBreakdown'])
assert model['additionalParameters'] == {'interim_disposal_cash_proceeds': None, 'interim_exit_costs': None}
# Synthetic checks exercise the algebra only; no test value enters research data.
for years, rate, investment, working, other, terminal in [
    (1, Fraction(0), 100, 20, [30], 10),
    (3, Fraction(1, 10), 100, 20, [-10, 20, 30], 25),
    (2, Fraction(1, 5), 20, 0, [100, 100], 0),
]:
    weights = [1 / (1 + rate) ** t for t in range(1, years + 1)]
    threshold = (investment + working - sum(Fraction(b) * w for b, w in zip(other, weights)) - terminal * weights[-1]) / sum(weights)
    npv = -investment - working + sum((threshold + b) * w for b, w in zip(other, weights)) + terminal * weights[-1]
    assert npv == 0
markdown = (AUTO / (STEM + '.md')).read_bytes()
assert digest(markdown) == validation['markdownSha256']
assert sum(line.startswith('### cn-ind-') for line in markdown.decode().splitlines()) == 133
assert validation['outputSha256'] == digest((AUTO / (STEM + '.json')).read_bytes())
assert validation['searchAuditSha256'] == digest((AUTO / (STEM + '-search-audit.json')).read_bytes())
assert all(validation['checks'].values()) and validation['errors'] == []
print(json.dumps({'status': 'saved-author-artifacts-verified-not-independent-factual-acceptance', 'tasks': 133, 'queries': 266, 'supplementalQueries': 12, 'currentReferences': reference_count, 'reversibleChanges': len(ledger['changes']), 'originalBytesRecovered': True, 'publicImportReady': False}, indent=2))
