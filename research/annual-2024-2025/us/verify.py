"""Independent raw-cell and scope checks for the US annual candidate.

Run after extract.py. Does not invoke or import the extraction implementation.
"""
import hashlib
import json
from collections import Counter
from pathlib import Path
import openpyxl

here = Path(__file__).resolve().parent
data = json.loads((here / "us-annual-va-candidate.json").read_text())
nodes = {n["id"]: n for n in data["nodes"]}
assert len(nodes) == len(data["nodes"])
workbooks = {s["file"]: openpyxl.load_workbook(here/s["file"], data_only=True) for s in data["sources"]}
for source in data["sources"]:
    assert hashlib.sha256((here/source["file"]).read_bytes()).hexdigest() == source["sha256"]

cell_checks = 0
for obs in data["observations"]:
    assert obs["country"] == "us" and obs["year"] in (2024, 2025)
    assert obs["unit"] == "USD million" and obs["priceBasis"] == "current"
    loc = obs["sourceLocator"]
    sheet = workbooks[loc["file"]][loc["sheet"]]
    if obs["value"] is None:
        assert obs["year"] == 2025 and obs["status"] == "not-yet-published"
        assert 2025 not in [int(c.value) for c in sheet[8] if str(c.value).isdigit()]
        assert obs["releaseDate"] is None and loc["cell"] is None
    else:
        assert sheet[loc["cell"]].value == obs["value"]
        assert int(sheet[loc["periodHeaderCell"]].value) == obs["year"]
        assert sheet[loc["unitCell"]].value == "[Millions of dollars]"
        cell_checks += 1
    cursor, seen = obs["nodeId"], set()
    while cursor:
        assert cursor not in seen
        seen.add(cursor)
        node = nodes[cursor]
        assert node["country"] == "us" and node["parentIndustryId"] == obs["parentIndustryId"]
        cursor = node["parentId"]

old = json.loads((here.parents[2]/"research/us/subindustry-productivity.json").read_text())
actual = {(o["nodeId"],o["year"]):o["value"] for o in data["observations"]}
legacy_checks = 0
legacy_ids = set()
for parent in old["parents"]:
    for row in parent["rows"]:
        if row["year"] in (2024,2025) and row["valueAdded"]["value"] is not None:
            key = row["id"].removesuffix(f'-{row["year"]}')
            assert actual[(key,row["year"])] == row["valueAdded"]["value"]
            legacy_ids.add(key)
            legacy_checks += 1
assert legacy_checks == 88 and len(legacy_ids) == 44

detail = workbooks["UnderlyingValueAdded-2026-09-14.xlsx"]["UVA205-A"]
main = workbooks["ValueAdded-2026-09-14.xlsx"]["TVA105-A"]
# Literal raw rows independently establish the unusual construction and wholesale partitions.
construction = [detail[f"AE{r}"].value for r in range(24,32)]
wholesale = [detail[f"AE{r}"].value for r in range(81,92)]
assert len(construction) == 8 and sum(construction) == 1305402 == main["AE19"].value
assert len(wholesale) == 11 and sum(wholesale) == 1706289 == main["AE42"].value
assert detail["B91"].value.strip() == "Customs duties" and detail["AE91"].value == 83587
assert nodes["us-wholesale-uva-83"]["categoryKind"] == "tax-accounting-component"
assert not any("naics-23" in n or "naics-42" in n for n in nodes)

# No private health observation is routed into the government subtree, or the reverse.
assert nodes["us-government-uva-186"]["parentId"] == "us-government-bea-96"
assert nodes["us-health-uva-157"]["parentId"] == "us-health-bea-77"
assert sum(detail[f"AE{r}"].value for r in (193,194,195)) == detail["AE192"].value - 1
assert sum(main[f"AF{r}"].value for r in (100,101)) == main["AF99"].value + 1
assert sum(main[f"AF{r}"].value for r in (99,102)) == main["AF98"].value

new2025 = sorted(n["id"] for n in nodes.values() if n["parentId"] and n["id"] not in legacy_ids
                 and not n["optionalGroupingNode"] and actual[(n["id"],2025)] is not None)
assert len(new2025) == 8
report = {"checkedAt":"2026-09-14","rawCellChecks":cell_checks,"legacy2024And2025RowsUnchanged":legacy_checks,
          "officialFileHashesMatch":True,"countryYearCurrencyAndHierarchyChecks":True,
          "construction2024ChildSum":sum(construction),"wholesale2024ChildSum":sum(wholesale),
          "customsDuties2024":83587,"new2025NodesExcludingOptionalManufacturingGroups":new2025,
          "classificationSeparationChecked":["BEA construction types vs NAICS 236/237/238", "wholesale customs duties accounting component", "private health vs government health", "government general government vs government enterprises"]}
(here/"independent-verification.json").write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n")
print(json.dumps(report,ensure_ascii=False))
