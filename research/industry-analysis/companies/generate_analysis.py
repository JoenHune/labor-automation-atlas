# coding: utf-8
from pathlib import Path
import json
B=Path(__file__).parent
J=lambda f:json.loads((B/f).read_text())
P=J('panel-data.json');M=J('metrics.json')['observations'];D=J('derived.json')['observations'];C=J('companies.json')['companies'];S={x['id']:x for x in P['sources']};idx={x['id']:x for x in M+D}
def obs(k,p,m):return next(x for x in M+D if x['companyId']==k and x['period']==p and x['metric']==m and not x.get('segmentId'))
def link(x,label):
 r=x if x['evidence']['type']!='calculated' else idx[x['evidence']['inputs'][0]]
 return f"[{label}]({S[r['sourceId']]['url']}#page={r['locator']['pdfPage']})"
lines=['# 电子设备分支：上市公司财报能提供什么观察', '', '核查日期：2026-09-14。范围：中国图谱电子设备分支的九类产品，采用13家分层目的样本。已实际取得并读取13份2025年年报和13份2026年半年报；2024数字取2025年报可比列，2026上半年只与2025上半年比较。', '', '**结论：财报已经提供行业总量图看不到的经营结构，但当前证据只支持企业样本观察，不支持把样本收入替代增加值、把样本平均推广为全行业，或据此判断自动化潜力。**', '', '## 抽样和统计边界', '', '选样覆盖系统产品、EMS/封测、通信设备及服务、手机品牌、面板、晶圆代工、电子材料、PCB、雷达和智能硬件等不同业务模式。关联以实际主营和披露分部为依据，允许跨产品关联，但不把集团或分部金额全额分摊给多个产品。未按市值或增长率择优，也不声称随机抽样或总体代表性。', '', '| 样本 | 经营模式 | 映射与边界 |','|---|---|---|']
for c in C:
 s=S[c['id']+'-ar2025'];lines.append(f"| [{c['name']}]({s['url']}) | {c['businessModel']} | {c['mappingNote']} |")
lines+=['', '所有财务指标为企业集团披露口径，通常同时包含境内外业务。客户所在地区、收入确认地区和生产所在地并非同一概念；这些公司属于中国企业观察样本，不表示其全部产值发生在中国。生益科技已经合并生益电子，本批不再单列后者；A/B/H股的同一集团只计一次。上下游仍可能有交易重复，所以没有进行样本收入总和或国家行业覆盖率计算。','', '## 2025完整年度与最新进度', '', '下表金额为亿元人民币；百分比来自原值复算。表中不同企业的财务指标名称一致，但业务组合、集团边界和经营模式不同，适合发现需要进一步分部比较的问题，不能作为“纯行业效率榜”。', '', '| 企业 | 2025收入 | 同比 | 综合毛利率 | 购建长期资产现金／收入 | 研发投入／收入 | 2026H1收入同比 |','|---|---:|---:|---:|---:|---:|---:|']
for c in C:
 k=c['id'];vals=[]
 for y,m,factor,suffix in [('2025','revenue',1e8,''),('2025','revenue_growth_pct',1,'%'),('2025','gross_margin_pct',1,'%'),('2025','capex_cash_to_revenue_pct',1,'%'),('2025','rd_input_to_revenue_pct',1,'%'),('2026-H1','h1_revenue_growth_pct',1,'%')]:
  x=obs(k,y,m);vals.append(link(x,f"{x['value']/factor:,.2f}{suffix}"))
 lines.append('| '+c['name']+' | '+' | '.join(vals)+' |')
lines+=['','2026H1为独立半年度进展，非2026全年估计，未经审计。以上各个派生值的全部输入ID、单位、期间和PDF页码保存在 `derived.json` 与 `metrics.json`；点击表格数值可打开首个输入所在原报告页。','', '## 对行业图的新增认识','']
for f in P['findings']:
 lines += ['### '+f['title'],'',f['body'],'','成立条件：'+'；'.join(f['conditions'])]
 refs=[]
 for e in f['evidence']:
  refs.append(f"[{S[e['sourceId']]['publisher']}：{e['locator']}]({S[e['sourceId']]['url']})")
 lines+=['','证据：'+'；'.join(refs),'']
lines+=['## 人工投入：能知道什么，仍缺什么','','已实际取得各样本年末员工及生产类员工数量，也取得部分生产成本中的直接人工。已披露的直接人工范围包括深科技电子设备业务、歌尔电子元器件业务、中芯晶圆制造、沪电PCB、四创雷达、生益覆铜板和PCB；这些分母不同，未放入可混排的统一“人工强度”榜。','','职工现金支付涵盖不同职能和结算时点，直接人工是成本确认口径，工资与劳动者报酬又不相同。它们不互相替代。研发投入含适用资本化部分，和利润表研发费用分开；购建长期资产现金不含全部并购、租赁、非现金投入，也不能自动认定为自动化投入。','','网站中“全年收入／年末员工”只作为明确标注的代理指标。所读员工表未取得统一全年平均用工，常为母公司和主要子公司、而非必然覆盖全部合并子公司；外包和境内外边界没有统一。浪潮信息高收入与较少年末员工的组合，不能据此认定其劳动生产率高于晶圆或面板制造。中兴年报明确存在外包生产商，其他公司“劳务外包不适用”的标准栏也不证明没有供应链外包。','','## 覆盖与下一步','','本次完成了所选13家样本的真实检索和核心报表分析，不代表已穷尽上市公司，更不代表全国企业。九类产品中，计算机零部件和智能消费设备等主要通过混合分部关联，尚缺单一产品业务边界完全一致的企业群。下一步应优先取得纯业务或更细分部披露，定义上市与非上市总体，再建立覆盖分母。','','具体后续工作：','','1. 比较同一产品、同一经营模式的更多企业，单独处理制造、品牌、渠道、平台和工程服务。','2. 取得平均员工、劳务派遣、外包生产、境内外员工及主要子公司范围；无法统一时保留口径差异。','3. 将地区工厂和法人主体与公司分部关联，收入地区不能直接放到工厂地图。','4. 持续核对更正公告及后续财报的比较列，特别关注并购、同一控制合并和业务分部调整。','5. 人工成本仍不足的公司，进一步读取成本附注、招股书和公司调研材料；不由缺数推断人工不重要。','','## 原件、复算与验证','','- `sources.json`：26份原件URL、发布日期、取得日期、SHA-256、来源限制。PDF位于本地 `originals/`；允许只公开下载清单与哈希。','- `companies.json`、`segments.json`：13家样本及31个相关业务分部，保留非C39/未拆分分部。','- `metrics.json`：322个非空原值、50个明确缺口，保留原始单位、原值、集团/业务范围和PDF页码。','- `derived.json`：153项可复算派生指标。','- `panel-data.json`：由同一原值生成的11张比较表、8条发现与15条覆盖记录，供图谱侧栏使用。','- `verification.json`：26个原件hash、全部非空原值页内词元、单位、期间、153项复算及高风险修订列检查。','', '复算顺序：`python3 research/industry-analysis/companies/build_metrics.py` → `python3 research/industry-analysis/companies/build_panel.py` → `python3 research/industry-analysis/companies/generate_analysis.py` → `python3 research/industry-analysis/companies/verify.py`。若本地未缓存原件，先运行 `fetch_sources.py`；只接受与本版哈希一致的文件。', '', '原件为公司编制的完整财报。年度报告主要从巨潮或公司官网下载；传音年报和本批半年报使用完整公告镜像，保留下载出处和哈希，没有用媒体摘要代替原报表。实际读取聚焦相关财务表、分部、成本与员工页，不宣称逐字审完数千页法律附注。']
(B/'analysis.md').write_text('\n'.join(lines)+'\n')
print('analysis generated')
