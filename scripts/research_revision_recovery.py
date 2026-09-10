"""Recover reviewed inputs from a reversible author ledger, without accepting facts."""
import copy
import hashlib
import json


def serialize(value):
    return (json.dumps(value, ensure_ascii=False, indent=2) + '\n').encode()


def digest(value):
    return hashlib.sha256(value).hexdigest()


def load_author_revision(root, stem):
    ledger = json.loads((root / 'research/reviews' / (stem + '-author-revision.json')).read_text())
    assert digest((root / ledger['originalReviewFile']).read_bytes()) == ledger['originalReviewSha256']
    documents = {}
    for path, expected in ledger['preparedOutputSha256'].items():
        raw = (root / path).read_bytes()
        assert digest(raw) == expected, path
        documents[path] = json.loads(raw)
        assert serialize(documents[path]) == raw, path

    def replay(objects, reverse):
        result = copy.deepcopy(objects)
        for change in reversed(ledger['changes']) if reverse else ledger['changes']:
            assert change['file'] in result and change['path']
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
    original_bytes = {path: serialize(obj) for path, obj in originals.items()}
    for path, raw in original_bytes.items():
        assert digest(raw) == ledger['originalInputSha256'][path], path
    for path, obj in replay(originals, False).items():
        assert serialize(obj) == serialize(documents[path]), path
    for archive in ledger['originalAuxiliaryArchive']:
        raw = (root / archive['archiveFile']).read_bytes()
        assert digest(raw) == archive['sha256'] and len(raw) == archive['bytes']
        original_bytes[archive['originalFile']] = raw
    return ledger, documents, originals, original_bytes
