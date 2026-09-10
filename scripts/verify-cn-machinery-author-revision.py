"""Verify provenance, references and unknown-value boundaries, not factual acceptance."""
import json
from collections import Counter
from fractions import Fraction
from pathlib import Path
from research_revision_recovery import digest, load_author_revision

ROOT = Path(__file__).resolve().parents[1]
STEM = 'cn-industry-machinery-medical-auto-transport-34-37'
ledger, current, originals, original_bytes = load_author_revision(ROOT, STEM)
main_path = f'research/automation/{STEM}.json'
audit_path = f'research/automation/{STEM}-search-audit.json'
main, audit = current[main_path], current[audit_path]
old, old_audit = originals[main_path], originals[audit_path]
validation = json.loads((ROOT / f'research/automation/{STEM}-validation.json').read_text())
assert validation['outputSha256'] == digest((ROOT / main_path).read_bytes())
assert validation['searchAuditSha256'] == digest((ROOT / audit_path).read_bytes())
assert validation['markdownSha256'] == digest((ROOT / f'research/automation/{STEM}.md').read_bytes())
assert validation['recoveryLedgerSha256'] == digest((ROOT / f'research/reviews/{STEM}-author-revision.json').read_bytes())
assert all(validation['checks'].values()) and not validation['errors']
assert not validation['independentFinalAcceptance'] and not validation['publicImportReady']
assert ledger['independentRecheckRequired'] and not ledger['importedToPublicResearch']
assert main['independentReview']['currentRevisionTasksIndependentlyRechecked'] == 0
assert not main['independentReview']['currentRevisionAccepted'] and not main['isFrozen']
assert len(main['tasks']) == 125 and len({t['scenarioId'] for t in main['tasks']}) == 18
assert len(main['sources']) == 43 and sum(len(s['locators']) for s in main['sources']) == 66
assert len(main['definitionSources']) == 8
for key in ['taskQueries', 'supplementalSearches', 'resultPools']:
    assert audit[key] == old_audit[key], key
assert [len(audit[key]) for key in ['taskQueries', 'supplementalSearches', 'resultPools']] == [250, 4, 64]
assert len(audit['authorRevisionSourceRereads']) == 13
assert len(audit['authorRevisionDefinitionRereads']) == 2
assert len(audit['additionalSourceReads']) == 1

for task, original, assessed in zip(main['tasks'], old['tasks'], audit['currentTaskAssessments']):
    assert task['id'] == original['id'] == assessed['taskId']
    assert task['originalTask'] == original['originalTask'] and task['humanInput'] == original['humanInput']
    assert task['country'] == 'CN' and task['industryId'] == 'cn-industry' and not task['isFrozen']
    assert task['independentReviewStatus'] == 'original-draft-reviewed-author-revision-awaiting-independent-recheck'
    assert task['economics']['parameterValues'] == original['economics']['parameterValues']
    assert len(task['economics']['parameterValues']) == 23
    for key in ['parameterValues', 'additionalParameterValues', 'initialTransitionAmounts', 'laterTransitionAmounts']:
        assert all(value is None for value in task['economics'][key].values())
    for key in ['npv', 'paybackYears', 'breakEvenAvoidedPaidCash', 'breakEvenPaidHours']:
        assert task['economics'][key] is None
    own_queries = [q for q in audit['taskQueries'] if q['taskId'] == task['id']]
    assert len(own_queries) == 2 and {q['direction'] for q in own_queries} == {'positive', 'negative'}
    assert assessed['researchStatus'] == task['researchStatus']
    assert assessed['counterEvidence'] == task['counterEvidence']['records']
    assert len(task['alternatives']) == len(assessed['alternativeAssessments'])
    for alternative, item in zip(task['alternatives'], assessed['alternativeAssessments']):
        assert alternative['id'] == item['alternativeId']
        assert alternative['evidenceSupportLevel'] == item['supportLevel']
        for key in ['sourceRefs', 'supportBoundary', 'deploymentStage']:
            assert alternative[key] == item[key]
        assert alternative['currentTaskDirectMechanism'] == (alternative['evidenceSupportLevel'] == 'partial')
        for key in ['currentSiteInputCompatibilityVerified', 'currentContinuousOperationVerified', 'fullTaskAcceptanceVerified']:
            assert not alternative[key]
    assert task['successfulCounterexamples']['boundedAlternativeIds'] == [a['id'] for a in task['alternatives'] if a['currentTaskDirectMechanism']]
    for record in task['counterEvidence']['records']:
        assert set(record['boundedAlternativeIds']) <= {a['id'] for a in task['alternatives']}
        assert not record['directCandidateConstraintWithinSourceScope'] or record['boundedAlternativeIds']
    for record in task['barriers']['technical']['directLimitingEvidence']:
        assert record in task['counterEvidence']['records']
        assert any(a['id'] in record['boundedAlternativeIds'] and a['currentTaskMatched'] for a in task['alternatives'])

assert dict(Counter(t['researchStatus'] for t in main['tasks'])) == main['coverage']['researchStatusCounts']
assert len(main['conditionalSplitProposals']) == 28
assert sum(len(p['children']) for p in main['conditionalSplitProposals']) == 57
for proposal in main['conditionalSplitProposals']:
    assert not proposal['siteSequenceVerified'] and proposal['newCountedTasks'] == 0
    for child in proposal['children']:
        assert child['siteAcceptance'] is None and child['independentCashBoundary'] is None
        assert not child['automaticCountEligible']
assert len(main['scopeExpansionCandidates']) == 3
for candidate in main['scopeExpansionCandidates']:
    assert candidate['positiveNegativeSearchStatus'] == 'new-task-specific-search-not-yet-executed'
    assert candidate['newCountedTasks'] == 0 and not candidate['isFrozen']
assert len(main['sharedOperationMappings']) == 4
assert all(not e['siteRelationshipVerified'] for e in main['sharedOperationMappings'])
assert len(main['authorRevisionFindings']) == 19
assert all(not f['independentlyClosed'] for f in main['authorRevisionFindings'])
assert main['opportunities'][1]['taskIds'] == [main['tasks'][58]['id']]
assert all(o['country'] == 'CN' and o['economicRanking'] is None for o in main['opportunities'])

sources = {s['id']: s for s in main['sources'] + main['definitionSources']}
references = []
def inspect(obj, path=''):
    if isinstance(obj, dict):
        if 'sourceId' in obj and 'locatorId' in obj:
            loc = next(l for l in sources[obj['sourceId']]['locators'] if l['id'] == obj['locatorId'])
            if 'section' in obj:
                assert obj['section'] == loc.get('section', loc.get('location')), path
            references.append(path)
        for key, value in obj.items():
            if key != 'originalTask':
                inspect(value, path + '/' + key)
    elif isinstance(obj, list):
        for index, value in enumerate(obj):
            inspect(value, path + '/' + str(index))
inspect(main)
assert len(references) == validation['resolvedCurrentContentReferenceCount']
assert not main['tasks'][23]['barriers']['technical']['directLimitingEvidence']
assert not main['tasks'][23]['counterEvidence']['records'][0]['boundedAlternativeIds']
for n in [24, 60, 109, 111]:
    assert main['tasks'][n-1]['alternatives'][0]['evidenceSupportLevel'] == 'adjacent'
assert main['tasks'][8]['alternatives'][0]['evidenceSupportLevel'] == 'catalog'
assert main['tasks'][8]['alternatives'][1]['evidenceSupportLevel'] == 'partial'
assert main['tasks'][95]['alternatives'][0]['evidenceSupportLevel'] == 'catalog'
assert [a['sourceRefs'][0]['locatorId'] for a in main['tasks'][76]['alternatives']] == ['generic-hose-clamp', 'test']
assert main['tasks'][85]['alternatives'][2]['sourceRefs'][0]['locatorId'] == 'free-edge-grind'
assert sources['CN-MACHTR-SJTU-SHIP-ASSEMBLY']['evidenceType'] == 'research-developer-description-deployment-stage-unspecified'
assert sources['CN-MACHTR-SMT-SHIP-PIPE']['publishedAt'] is None
assert sources['CN-MACHTR-SMT-SHIP-PIPE']['pageDateKind'] == 'unspecified-publication-or-update'
assert sources['CN-MACHTR-FDA-CHINA-SYRINGE']['updatedAt'] == '2024-08-16'
for n in [27, 28]:
    assert any(any(r['sourceId'] == 'CN-MACHTR-FDA-CHINA-SYRINGE-EN' for r in record['sourceRefs']) for record in main['tasks'][n-1]['counterEvidence']['records'])
assert main['cashFlowModels'][0]['parameters'] == old['cashFlowModels'][0]['parameters']
assert main['cashFlowModels'][0]['additionalParameters'] == {'interim_disposal_cash_proceeds': None, 'interim_exit_costs': None}
for years, rate, investment, working, other, terminal in [
    (1, Fraction(0), 100, 20, [30], 10),
    (3, Fraction(1, 10), 100, 20, [-10, 20, 30], 25),
    (2, Fraction(1, 5), 20, 0, [100, 100], 0),
]:
    weights = [1 / (1 + rate) ** t for t in range(1, years + 1)]
    threshold = (investment + working - sum(Fraction(b) * w for b, w in zip(other, weights)) - terminal * weights[-1]) / sum(weights)
    assert -investment - working + sum((threshold + b) * w for b, w in zip(other, weights)) + terminal * weights[-1] == 0
print(json.dumps({'status': 'author-provenance-verified-not-independent-factual-acceptance', 'tasks': 125, 'references': len(references), 'reversibleChanges': len(ledger['changes']), 'newCountedTasks': 0, 'originalBytesRecovered': True}))
