"""Apply the independent review to presentation semantics; never change source counts."""
from pathlib import Path
import copy, hashlib, json

root = Path(__file__).resolve().parent
housing = {
    'cn': {'cn-real-estate', 'cn-real-estate-unallocated', 'cn-io-real-estate', 'cn-io-70183'},
    'us': {'us-real-estate', 'us-real-estate-bea-61', 'us-real-estate-bea-62', 'us-real-estate-bea-62-unallocated'},
}
government_gaps = {
    'us-government-bea-92': '已核 BEA NIPA 6.4D 的一般政府、文职与军人行。国防活动也有文职人员，不能用 Military 一行充作国防全部岗位；QCEW 所有权表没有国防/非国防的完整活动桥，当前仍缺同年完整分母。',
    'us-government-bea-93': '已核 BEA NIPA 6.4D 与 QCEW 联邦所有权表。Civilian 一行同时含国防和非国防文职，不能全部归给非国防；需要先分离国防文职及机构活动、再核对 BEA 年度覆盖，当前不能可靠相减。',
    'us-government-uva-187': '已核 BEA NIPA 6.4D 州地方一般政府/教育分项，以及 Census 政府功能就业表。NIPA 非教育还包含医院卫生，不能直接作为其他服务；Census 医院卫生为3月份岗位，与 NIPA 年度人数覆盖和时点不同，不能直接相减。',
}
patches, inputs = [], {}
for module in ['cn-industry', 'cn-products', 'us']:
    path = root / module / 'dataset.json'
    inputs[module] = hashlib.sha256(path.read_bytes()).hexdigest()
    for r in json.loads(path.read_text())['records']:
        pairing, notes, gap = copy.deepcopy(r['pairing']), list(r['notes']), r['gap']
        evidence = copy.deepcopy(r['employment']['evidence'])
        changed = False
        if r['nodeId'] in housing[r['country']]:
            pairing.update(status='proxy', comparisonGroup='housing-capital-services-' + r['employment']['denominatorKind'], scopeNote='含住房资本服务 · 宏观比值')
            pairing['explanation'] = '同年整项现价增加值 ÷ 同年所列就业分母。分子含居民自有住房等住房资本服务，部分服务没有对应直接岗位；这是含资本服务的宏观比值，不是员工劳动效率，与普通行业分组展示。' + (' 就业本身也是明确条件的估算。' if r['employment']['status'] == 'estimated' else ' 分母仅为所注明范围的雇员岗位。')
            notes = [n for n in notes if not any(s in n for s in ['不发布这一整项的人均数', '整项无法解释为人均生产水平', '暂不进行人均排序'])]
            notes.append('审校修订：中美采用一致的宏观比值解释，住房资本服务单列比较组；纯自住住房核算项仍不填就业或比率。')
            gap = '' if r['valueAddedAnchor']['baseValue'] is not None else '就业保留；尚缺同年现价增加值，不能计算比值。'
            changed = True
        if r['nodeId'] in government_gaps:
            gap = government_gaps[r['nodeId']]
            pairing['explanation'] = gap
            notes.append('后续需取得政府机构—BEA活动的完整就业桥；机构时点数不能直接替代年度活动人数。')
            evidence.append({'sourceId': 'us-employment-bea-nipa-2025-09-26', 'locator': 'T60400D-A，联邦 General government / Civilian / Military 与州地方 General government / Education / Other 行；2024年列。研究判断：这些发布分类没有提供当前节点所需的完整活动就业桥。'})
            if r['nodeId'] == 'us-government-uva-187':
                evidence.append({'sourceId': 'us-employment-census-apes-2025', 'locator': 'GS00EMP01；全国，州地方，功能 Health / Hospitals；EMP 为3月岗位，不是同年 NIPA 年度非教育就业的同口径可扣减项。'})
            changed = True
        if r['nodeId'] == 'us-real-estate-uva-131':
            evidence.append({'sourceId': 'us-bea-productivity-housing-scope', 'locator': '房地产增加值中的 owner-occupied housing；研究判断：自有住房虚拟服务没有与其核算增加值可直接配对的雇员。'})
            changed = True
        if r['nodeId'] == 'us-wholesale-uva-83':
            evidence.append({'sourceId': 'us-bea-tariffs-faq-2025-03-04', 'locator': '关税在国家经济核算中的归属；研究判断：税收核算调整本身不是独立雇佣劳动的行业。'})
            changed = True
        if r['year'] == 2025 and r['nodeId'] in {'us-government-bea-90', 'us-government-bea-91', 'us-government'}:
            pairing['comparisonGroup'] = 'qcew-federal-containing-civilian-denominator'
            pairing['scopeNote'] = '含军人产出 · 分母仅文职岗位'
            changed = True
        if r['year'] == 2025 and r['nodeId'].startswith('us-government') and r['nodeId'] not in {'us-government', 'us-government-bea-90', 'us-government-bea-91', 'us-government-bea-92', 'us-government-bea-93'}:
            pairing['explanation'] = pairing['explanation'].replace('QCEW仅覆盖文职岗位，缺军人及其他BEA覆盖调整，政府比率仅为受保雇员代理。', 'QCEW只覆盖受保文职雇员岗位，与BEA覆盖调整仍有差异，比率为受保雇员代理。')
            changed = changed or pairing != r['pairing']
        if changed:
            patches.append({'id': r['id'], 'country': r['country'], 'basis': r['basis'], 'nodeId': r['nodeId'], 'year': r['year'], 'pairing': pairing, 'notes': notes, 'gap': gap, 'employmentEvidence': evidence})
out = {'checkedAt': '2026-09-14', 'reason': '独立审校：住房资本服务单列；政府文职覆盖与军人产出单列；政府空值记录落实具体统计桥缺口。保留作者就业值、原值来源和估算输入。', 'inputHashes': inputs, 'records': patches}
(root / 'amendments.json').write_text(json.dumps(out, ensure_ascii=False, indent=2) + '\n')
print('Presentation amendments:', len(patches))
