"""Apply the dated, source-backed corrections once; preserve the reviewed input hash."""
import copy
import hashlib
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
path = root / 'research/automation/cn-services.json'
review_path = root / 'research/reviews/cn-services-automation-decisions.json'
original = path.read_bytes()
review = json.loads(review_path.read_text())
assert hashlib.sha256(original).hexdigest() == review['inputSha256'], 'Review applies only to its exact input'
data = json.loads(original)
sources = {s['id']: s for s in data['sources']}
decisions = {s['sourceId']: s for s in review['sources']}
tasks = {t['id']: t for t in data['tasks']}

for sid, source in sources.items():
    decision = decisions[sid]
    source['previousLocators'] = source['locators']
    source['locators'] = [decision['locator']]
    source['independentReview'] = copy.deepcopy(decision)
    source['dateNotes'] = []

def metadata(alias, **fields):
    sources['CN-AUTO-' + alias].update(fields)

metadata('RFIDLINEN', updatedAt='2026-07-10')
metadata('WASHREG', authoredAt='2026-03-25', dateNotes=['页面标为撰写时间；没有独立发布字段。'])
metadata('BOCATM', publishedAt=None, urlDate='2019-04-17', evidencePeriod='2019', dateNotes=['2019 年见正文标题；精确日仅见 URL，首次发布日期未证实。'])
metadata('BOCOP', publishedAt=None, urlDate='2025-05-27', effectiveAt='2024-12-11', evidenceLevel='operator-versioned-procedure', evidencePeriod='2024-12-11 生效版本', dateNotes=['PDF 正文没有明确发布日期；未核实此版本是否在 2026 年仍为最新版。'], supportBoundary='该行总行及所列境内机构，明确不含港澳台；只支持所核读版本的操作边界，不泛化全国其他银行。')
metadata('CPIC', publishedAt=None, displayedDate='2020-12-29', urlDate='2020-12-30', evidencePeriod='2020', dateNotes=['标题括号日期与 URL 路径差一天，精确首次发布日期未证实；不证明 2026 年仍运行。'])
metadata('GZSALE', publishedAt=None, authoredAt='2025-04-28', effectiveAt='2025-05-01', dateNotes=['通知成文与生效日期分开；用于二手房出售，不是住房租赁采用证据。'])
metadata('CK100', displayedDate='2020-01-01', dateNotes=['页面显示日期可能是站点默认，不能判定型号版本或首次发布日期。'])
metadata('BGY', publishedAt='2025-10-27', evidencePeriod='2025 年报道所述案例')
metadata('KEYCAB', publishedAt='2025-03-21')
metadata('LUGGAGE', publishedAt='2025-12-18')
metadata('JINGWU', evidencePeriod='2021 年加入产品系列', dateNotes=['产品档案说明年份；页面首次发表日未知，不证明 2026 年持续运行。'])
metadata('ZTEZJ', evidencePeriod='2025 年厂商现网自报')
metadata('HOTELCOMP', evidencePeriod='2026 年赛事与当次访谈')
metadata('CITIC', evidencePeriod='2026-05-15 采购变更公告')

def repair(v):
    if isinstance(v, dict):
        for k, x in list(v.items()):
            v[k] = repair(x)
        sid = v.get('sourceId')
        if sid in sources and 'locator' in v:
            v['locator'] = decisions[sid]['locator']
        if sid == 'CN-AUTO-BOCOP':
            for key in ['level', 'evidenceLevel']:
                if key in v:
                    v[key] = 'operator-versioned-procedure'
        return v
    if isinstance(v, list):
        return [repair(x) for x in v]
    if isinstance(v, str):
        return v.replace('吞卡及扣账未吐钞', '吞卡或不吐钞').replace('缺页或被改动的事实识别、取证和上报责任仍未自动化', '本轮未取得缺页或被改动的事实识别、取证和上报流程自动完成的证据')
    return v

data['tasks'] = repair(data['tasks'])
data['opportunities'] = repair(data['opportunities'])
tasks = {t['id']: t for t in data['tasks']}
for t in data['tasks']:
    t['economics']['workingCapitalDefinition'] = '期初投入包含初始营运资金；各期仅扣除相对上期余额的增加额，首期以上述期初余额为基准，不再重复扣除初始营运资金。期末回收仅在有依据时计入。'
    t['independentReviewStatus'] = 'review-complete-revisions-applied-definition-work-pending'
    t['independentReview'] = next(copy.deepcopy(x) for x in review['tasks'] if x['taskId'] == t['id'])
    t['independentReview']['inputSha256'] = review['inputSha256']
    t['definitionReview'] = copy.deepcopy(t['independentReview']['result'])
    t['canFreeze'] = False
    # These are proposed verification questions, not evidence of technical failure.
    t['technicalBarriers'][0] = {
        'kind': 'research-question', 'scenario': t['scenarioId'],
        'question': '对本任务输入“' + '；'.join(t['originalTask']['inputs']) + '”，哪些尺寸、状态或现场条件变化会使输出“' + '；'.join(t['originalTask']['outputs']) + '”不能通过“' + '；'.join(t['originalTask']['acceptance']) + '”的验收？请按实际操作分项验证。',
        'sourceRefs': [], 'note': '由任务定义产生的待访谈问题，不是已证实的技术障碍；组合任务拆分后须分别修订。'
    }

for tid in ['CN-AF-ROOM-T12', 'CN-RE-OPERATE-T11']:
    t = tasks[tid]
    t['alternatives'].append({
        'type': '机器人', 'status': 'conditional-product-function',
        'supportedActions': 'MT1 产品页列有选配自倾倒功能，可自主前往配套工作站倾倒所收集垃圾。',
        'notEstablished': '仅覆盖该设备尘箱的垃圾倾倒；未证明客房废物分类、全部废物运输、容器清洗或其他维护自动完成。',
        'conditions': ['自倾倒工作站与可拆卸尘箱须绑定配套选购', '清扫对象、可通行路径、工作站位置与接管方式须现场验证'],
        'sourceRefs': [{'sourceId': 'CN-AUTO-MT1', 'locator': decisions['CN-AUTO-MT1']['locator'], 'applicability': '仅设备选配自倾倒，不外推全部任务', 'evidenceLevel': 'manufacturer-product-description'}]
    })
    t['deploymentEvidence'].append({'sourceId': 'CN-AUTO-MT1', 'locator': decisions['CN-AUTO-MT1']['locator'], 'level': 'manufacturer-product-description', 'scope': '配套工作站与可拆卸尘箱条件下的选配自倾倒', 'provesWholeTaskAutomation': False, 'currentOperationConfirmed': False, 'deploymentCountry': None, 'scopeType': 'source-described-function-or-stage-not-verified-task-adoption'})

for decision in review['tasks']:
    tid, result = decision['taskId'], decision['result']
    t = tasks[tid]
    if 'downgrade' in result['action']:
        for a in t['alternatives']:
            a['status'] = 'adjacent-context-only-pending-definition-split' if 'split' in result['action'] else 'adjacent-context-only'
        t['evidenceGaps'].append(result['note'])
    if 'children' in result:
        t['evidenceGaps'].append('此组合任务须拆分；拟议子定义尚未分别完成输入、验收、核算与证据核查，不继承父项的检索完成状态。')

for opportunity in data['opportunities']:
    opportunity['independentReview'] = next(copy.deepcopy(x) for x in review['opportunities'] if x['id'] == opportunity['id'])
    opportunity['independentReviewStatus'] = 'conditional-priority-reviewed-task-definition-revisions-pending'

data['researchVersion'] = 'automation-cn-services-2026-09-09-v2'
data['reviewStatus'] = 'independent-review-complete-corrections-applied-split-work-pending'
data['reviewedInputSha256'] = review['inputSha256']
data['sourceReviewFile'] = str(review_path.relative_to(root))
data['publicationBoundary']['independentReviewComplete'] = True
data['publicationBoundary']['revisionNote'] = '2026-09-09 独立审校的定位、日期与明确措辞修正已应用；76 个组合任务的拟议拆分尚未实施，全部仍未冻结。'
revised = (json.dumps(data, ensure_ascii=False, indent=2) + '\n').encode()
path.write_bytes(revised)
revision = {
    'revisionId': data['researchVersion'], 'date': '2026-09-09',
    'beforeSha256': review['inputSha256'], 'afterSha256': hashlib.sha256(revised).hexdigest(),
    'reviewFile': str(review_path.relative_to(root)), 'reviewFileSha256': hashlib.sha256(review_path.read_bytes()).hexdigest(),
    'status': data['reviewStatus'], 'isFrozen': False,
    'sourceRepairs': [{'sourceId': s['id'], 'previousLocators': s['previousLocators'], 'locators': s['locators'], 'dateNotes': s['dateNotes']} for s in data['sources']],
    'taskRepairs': ['删除 LAWARCH-T08 无证据的仍未自动化措辞', '删除 CASH-T05 原文不支持的扣账', 'ROOM-T12 与 OPERATE-T11 补选配自倾倒及必要附件条件', '全部任务传播更正后的来源定位、规程层级与审校裁决', '全部任务明确期初及逐期营运资金无重复计入', '技术问题改为围绕本任务输入、输出与验收的待验证问题'],
    'unresolved': ['留样设备完整原文仍未独立读齐', '76 个组合任务拆分和每个子项的独立证据核查尚待完成', '全部任务没有可计算回报的现场参数或冻结状态']
}
(root / 'research/automation/cn-services-revisions.json').write_text(json.dumps(revision, ensure_ascii=False, indent=2) + '\n')
print('Applied', len(data['sources']), 'source reviews and', len(data['tasks']), 'task decisions:', revision['afterSha256'])
