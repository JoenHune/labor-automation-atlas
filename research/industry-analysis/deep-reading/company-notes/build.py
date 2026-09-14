"""Rebuild bounded company-note reading artifacts from the recorded actual page reads."""
from pathlib import Path
import json, hashlib, copy, re
B=Path(__file__).parent
ROOT=B.parents[3]
OLD=ROOT/'research/industry-analysis/companies'
def read(p):return json.loads(p.read_text())
def write(name,data): (B/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
D=read(B/'research-notes.json')
S=read(OLD/'sources.json')['sources']; sources={s['id']:s for s in S}
C=read(OLD/'companies.json')['companies']; companies={c['id']:c for c in C}
M=read(OLD/'metrics.json')['observations']; oldpanel=read(OLD/'panel-data.json')
DATE='2026-09-14'
def source_id(c,p):return c+('-ar2025' if p=='2025' else '-h12026')
def ev(c,p,page,row='专题财务附注'):
 return {'sourceId':source_id(c,p),'locator':f'PDF第{page}页，{row}'}
def ranges(nums):
 out=[]
 for n in sorted(set(nums)):
  if out and n==out[-1][1]+1:out[-1][1]=n
  else:out.append([n,n])
 return [str(a) if a==b else f'{a}—{b}' for a,b in out]
def range_text(nums):return '、'.join(ranges(nums))
reports=[]
for r in D['reports']:
 sid=source_id(r['companyId'],r['period']);s=sources[sid]
 original=ROOT/s['archive']; pages=(OLD/'extracts'/f"{r['companyId']}-{'2025' if r['period']=='2025' else '2026h1'}.txt").read_text().split('\f')
 while pages and not pages[-1].strip():pages.pop()
 assert hashlib.sha256(original.read_bytes()).hexdigest()==s['sha256']
 assert min(r['pdfPagesRead'])>0 and max(r['pdfPagesRead'])<=len(pages)
 reports.append({**r,'sourceId':sid,'name':companies[r['companyId']]['name'],'title':s['title'],'sourceUrl':s['url'],'originalSha256':s['sha256'],'published':s['published'],'readAt':DATE,'totalPdfPages':len(pages),'readPdfPageCount':len(r['pdfPagesRead']),'readKind':'列明页的专题实读；非逐字全文阅读','pageNumbering':'PDF物理页序号，从1开始；与印刷页码可能不同','unreadPdfPageRanges':ranges(set(range(1,len(pages)+1))-set(r['pdfPagesRead'])),'boundary':'只将本轮实际展示并读过的页计入；关键词定位、下载及首轮阅读不计本轮页数。已读页中的治理等旁文不形成研究结论；主题续页未读时在notCovered说明。','evidence':[ev(r['companyId'],r['period'],range_text(r['pdfPagesRead']),'本轮限定主题阅读范围')]})
write('read-log.json',{'checkedAt':DATE,'method':'对冻结的完整财报原件逐页阅读六组专题；不声称全文读完。所有完整文本与页面图片仅本地核验，不随日志发布。','reportCount':len(reports),'companyCount':len(C),'readPdfPageCount':sum(r['readPdfPageCount'] for r in reports),'reports':reports})
# Normalize raw money only after retaining the source amount and source unit.
obs=[]
stock_metrics={'inventory-net','inventory-allowance','goods-dispatched','prepayments','raw-materials-net','raw-material-net','contract-liabilities','accounts-receivable-net','receivables-net','construction-net','cip-net','employees-parent','employees-major-subsidiaries','employees-reported-total'}
for raw in D['observations']:
 o=copy.deepcopy(raw);o['metric']={'operating-cash-flow':'ocf','construction-net':'cip-net'}.get(o['metric'],o['metric'])
 o['id']=f"dr-{o['companyId']}-{o['period'].lower()}-{o['metric']}"
 mul={'千元':1000,'人民币千元':1000,'万元':10000}.get(o['unit'],1)
 o['rawValue']=o['value'];o['rawUnit']=o['unit'];o['multiplier']=mul;o['value']=o['value']*mul
 o['unit']='元' if o['currency']=='CNY' else o['unit']
 o['country']='cn';o['sourceId']=source_id(o['companyId'],o['period']);o['releaseDate']=sources[o['sourceId']]['published']
 o['periodType']='period-end-stock' if raw['metric'] in stock_metrics else 'period-flow'
 o['dataDate']=('2025-12-31' if o['period']=='2025' else '2026-06-30') if o['periodType']=='period-end-stock' else None
 o['evidenceKind']='fact';o['evidence']=[ev(o['companyId'],o['period'],o['pdfPage'],o['row'])]
 o['locator']={'pdfPage':o['pdfPage'],'row':o['row']};o['url']=sources[o['sourceId']]['url']+'#page='+str(o['pdfPage'])
 o['revision']='沿用所列最新报告及其比较列；2026H1未年化。合并范围差异和未勾稽项另注。'
 o['missingReason']=None
 if o['previous']:
  o['previous']['rawValue']=o['previous']['value'];o['previous']['rawUnit']=raw['unit'];o['previous']['value']*=mul
  if o['periodType']=='period-end-stock' and o['previous']['period']=='2024':o['previous']['period']='2024-12-31'
  o['previous']['evidence']=copy.deepcopy(o['evidence'])
 if o['metric']=='inventory-cash-use':
  # Preserve the cash-flow line's actual signed amount, not an unsigned presentation transformation.
  o['id']=o['id'].replace('inventory-cash-use','cashflow-inventory-change');o['metric']='cashflow-inventory-change';o['rawValue']=-o['rawValue'];o['value']=-o['value'];o['row']='存货的减少（增加以“－”号填列）';o['evidence']=[ev(o['companyId'],o['period'],o['pdfPage'],o['row'])];o['locator']['row']=o['row']
 if o['metric'].startswith('employees-'):o['scope']='原报员工表行；母公司/主要子公司/列示总人数，范围未能勾稽；不改写为全年平均人数'
 if o['metric'].startswith('cost-expense-employee-pay'):o['scope']='合并集团营业成本、销售费用、管理费用及研发费用内职工薪酬；不等于所有薪酬增加额或支付现金'
 obs.append(o)
lookup={(o['companyId'],o['period'],o['metric']):o for o in obs}
oldlookup={(o['companyId'],o['period'],o['metric']):o for o in M}
derived=[]
for c in C:
 inv=lookup[c['id'],'2026-H1','inventory-net']; cash=lookup[c['id'],'2026-H1','ocf'];rev=oldlookup[c['id'],'2026-H1','revenue'];prevrev=oldlookup[c['id'],'2025-H1','revenue']
 for metric,expression,inputs,ref,note in [
  ('inventory-change-pct','(current / previous - 1) * 100',[inv['value'],inv['previous']['value']],inv['evidence'],'比较2026年6月末与2025年末存货净额；非同比、非流量，不解释为销售增速。'),
  ('ocf-revenue-pct','cash / revenue * 100',[cash['value'],rev['value']],cash['evidence']+[{'sourceId':rev['sourceId'],'locator':f"PDF第{rev['locator']['pdfPage']}页，{rev['locator']['row']}"}],'2026年1—6月经营现金流/同期间收入；非利润率、非增加值或工厂效率；集团财务公司和跨行业业务影响口径。')]:
  val=(inputs[0]/inputs[1]-1)*100 if metric=='inventory-change-pct' else inputs[0]/inputs[1]*100
  z={'id':f"dr-{c['id']}-2026-h1-{metric}",'companyId':c['id'],'country':'cn','period':'2026-H1','metric':metric,'value':val,'unit':'%','currency':None,'evidenceKind':'calculation','evidence':ref,'expression':expression,'inputs':inputs,'inputObservationIds':[inv['id'],inv['id']+':previous'] if metric=='inventory-change-pct' else [cash['id'],rev['id']],'note':note}
  if metric=='ocf-revenue-pct':z['previous']={'period':'2025-H1','value':cash['previous']['value']/prevrev['value']*100,'inputs':[cash['previous']['value'],prevrev['value']],'evidence':cash['evidence']+[{'sourceId':prevrev['sourceId'],'locator':f"PDF第{prevrev['locator']['pdfPage']}页，{prevrev['locator']['row']}"}]}
  derived.append(z)
# Scope discrepancies remain pending, not inferred corrections.
quality=[
 {'id':'dr-boe-employee-scope','companyId':'boe','period':'2025','status':'pending','issue':'员工表母公司2939人、主要子公司67979人之和为70918人，表列在职员工总数及职业构成合计为109895人；可能涉及主要子公司与全部集团的范围差异，但本页未解释。','evidence':[ev('boe','2025',48,'员工表')],'expression':'2939 + 67979 = 70918; 109895 - 70918 = 38977','inputs':[2939,67979,109895],'action':'保留原披露总数；对员工人数、生产人员占比、人均收入三张旧表加口径待核提示，不以70918替换。','verification':'已目视核对原PDF页面，排除仅由文本抽取造成的错位。'},
 {'id':'dr-kaifa-inventory-rollforward','companyId':'kaifa','period':'2026-H1','status':'pending','issue':'存货准备变动表合计转回/转销130324324.21元与分项加总18094910.39元不一致；期初+计提−期末同样为18094910.39元。','evidence':[ev('kaifa','2026-H1',91,'存货跌价准备变动表')],'expression':'9182579.49 + 283303.26 + 5394272.18 + 3234755.46 = 18094910.39; 340943956.45 + 9567538.61 - 332416584.67 = 18094910.39','inputs':[9182579.49,283303.26,5394272.18,3234755.46,340943956.45,9567538.61,332416584.67,130324324.21],'action':'不采用问题转销合计，不擅改原报；存货期末净额与总账面余额减准备一致，可保留并提示。','verification':'已目视核对原PDF第91页，问题存在于原表。'},
 {'id':'dr-goer-rd-definition','companyId':'goer','period':'2026-H1','status':'pending','issue':'管理层研发投入2360350013.42元与附注研发支出合计2602835354.47元不一致，已读页没有提供差额调节；不将两者混成统一研发投入指标。','evidence':[ev('goer','2026-H1',12,'研发投入'),ev('goer','2026-H1',139,'研发支出合计')],'inputs':[2360350013.42,2602835354.47],'action':'旧表仅有2025研发比率，本轮未建立2026H1跨公司研发表；保留口径待核。'}]
write('observations.json',{'checkedAt':DATE,'method':'每一原值保留原报单位、期间、PDF页与行；金额规范为人民币元并保留倍率；stock与flow分别标记。','observations':obs,'derived':derived,'qualityIssues':quality,'reusedOriginalObservationIds':sorted({i for d in derived for i in d['inputObservationIds'] if not i.startswith('dr-')})})
write('quality-issues.json',quality)
# The panel reuses frozen source objects exactly; raw evidence is not duplicated by hand.
P={'sources':copy.deepcopy(S),'comparisons':[],'findings':[],'coverage':[]}
allnodes=list(dict.fromkeys(n for c in C for n in c['nodeIds']))
for metric,title,unit,currency in [('inventory-net','期末存货净额：2026年6月末','元','CNY'),('ocf-revenue-pct','经营现金净流量 / 营业收入：2026年上半年','%',None)]:
 table={'id':f'cn-c39-deep-company-2026-h1-{metric}','country':'cn','section':'companies','nodeIds':allnodes,'title':title,'metric':metric,'period':'2026-H1','unit':unit,'currency':currency,'coverage':'13家原有目的样本；各行合并集团，含境内外与跨行业业务，不能相加为行业规模。','comparisonKey':f'cn-company-deep-2026-h1-{metric}','coverageLabel':'上市集团样本；非全国行业','notes':['本轮实际读过财务附注；缺口和原表疑点见补读记录。','存货是期末净额，现金与收入是半年流量；比较列日期另标。','合并范围、财务公司和房地产等业务不同，不据此排序工厂效率。'],'rows':[]}
 for c in C:
  o=lookup[c['id'],'2026-H1','inventory-net'] if metric=='inventory-net' else next(d for d in derived if d['companyId']==c['id'] and d['metric']==metric)
  sid=source_id(c['id'],'2026-H1');notes=[c['mappingNote'],'所有金额为集团合并范围；不推算行业增加值。']
  if metric=='inventory-net':
   growth=next(d['value'] for d in derived if d['companyId']==c['id'] and d['metric']=='inventory-change-pct');notes.append(f'较2025年末变化{growth:+.2f}%；这是存量期末比较，不是同比销售增速。')
  else:notes.append(o['note'])
  if c['id']=='sytech':notes.append('存货含房地产开发成本和开发产品；现金亦是含生益电子等的合并集团口径。')
  if c['id']=='wus':notes.append('2026H1出售黄石供应链、6月纳入普江仓储，存货变化包含合并范围变化。')
  if c['id']=='zte':notes.append('经营现金含财务公司法定存款准备金变动，不能直接等同制造业务现金。')
  if c['id']=='kaifa':notes.append('存货净额已核对；原报准备转销合计不勾稽，该问题合计未用于本表。')
  if c['id']=='luxshare':notes.append('2025年7月并购影响2026H1对2025H1的同比范围，不能视为有机增长。')
  row={'id':o['id'],'name':c['name'],'nodeIds':c['nodeIds'],'value':o['value'],'evidence':o['evidence'],'releaseDate':sources[sid]['published'],'revision':'沿用2026半年报及所列2025比较数；未年化；股权和经营范围变动按公司备注。','notes':notes,'missingReason':None,'url':sources[sid]['url']+'#page='+str(lookup[c['id'],'2026-H1','inventory-net' if metric=='inventory-net' else 'ocf']['pdfPage'])}
  if o.get('previous'):row['previous']={'period':o['previous']['period'],'value':o['previous']['value'],'evidence':o['previous']['evidence'],'note':'同份半年报比较列；存货为上年末，现金比率为上年同期，未混用。'}
  if metric!='inventory-net':row['computation']={'expression':o['expression'],'inputs':o['inputs'],'note':o['note']}
  table['rows'].append(row)
 P['comparisons'].append(table)
titles={'inspur':'低长期资产付现比例仍可能需要大量备货资金','smic':'在建工程减少可能是转固；现金改善还受信用期影响','boe':'准备余额、当期减值与现金回流不是同一件事','luxshare':'半年前的并购仍会影响本期同比','goer':'股权重估收益需与产品经营利润分开','kaifa':'客户备货要求会改变现金转换','haige':'制造与服务的方向不同，资金还可能重分类','hisense':'原材料储备增加可与收入增长同时发生','sytech':'电子材料集团的减值也可能来自房地产','wus':'订单与收入增长并不保证同期现金增长','suncreate':'现金净流出收窄不能当作合同需求恢复','transsion':'涨价和库存成本时滞可能暂时改善毛利','zte':'含财务公司的现金指标不是纯制造指标'}
for n,f in enumerate(D['interpretations']):
 c=companies[f['companyId']];isemployee=f['companyId']=='boe' and 'employee' in (f['amends'] or '')
 P['findings'].append({'id':f"cn-c39-deep-company-finding-{c['id']}"+('-employees' if isemployee else ''),'country':'cn','section':'companies','nodeIds':c['nodeIds'],'period':'2025；2026-H1' if not isemployee else '2025','title':('京东方员工表范围仍待核实' if isemployee else titles[c['id']]),'body':f['text'],'evidenceKind':'judgement','evidence':[ev(c['id'],period,range_text(pages),'已实读的经营分析及对应附注') for period,pages in f['pages'].items()],'conditions':['上市公司自行披露的集团事实与研究解释分列；不代表全国行业增加值或普遍经营规律。','本轮按列明页实读；主题未读续页和待核问题见补读记录。']})
for c in C:
 rs=[r for r in reports if r['companyId']==c['id']]
 P['coverage'].append({'id':f"cn-c39-deep-company-reading-{c['id']}",'country':'cn','group':'企业财报补读','title':c['name']+'：两期限定主题补读','period':'2025；2026-H1','status':'obtained','detail':'；'.join(f"{r['period']}实际读PDF第{range_text(r['pdfPagesRead'])}页" for r in rs)+'。不是全文读完；六主题的解释和未读范围已逐报告登记。','evidence':[e for r in rs for e in r['evidence']],'nextStep':'；'.join(dict.fromkeys(x for r in rs for x in r['notCovered']))})
for q in quality:
 P['coverage'].append({'id':q['id'],'country':'cn','group':'企业财报补读待核','title':companies[q['companyId']]['name']+'：原表口径待核','period':q['period'],'status':'pending','detail':q['issue'],'evidence':q['evidence'],'nextStep':q['action']})
P['coverage'].append({'id':'cn-c39-deep-company-grants-gap','country':'cn','group':'企业财报补读待核','title':'政府支持尚未形成可比跨公司总额','period':'2025；2026-H1','status':'not-comparable','detail':'部分报告将递延摊销、直接补助、财政贴息或税收减免放在不同表格；中兴其他收益附注未按纯补助拆分。本轮只保留已确认分项，不用其他收益总额代替政府补助。','evidence':[ev('kaifa','2025','189—190','直接收益与递延摊销'),ev('suncreate','2025',171,'补助含税收减免及另列贴息'),ev('zte','2026-H1',145,'其他收益')],'nextStep':'向企业核对完整补助与税收优惠调节，并另行对齐损益、现金和递延余额。'})
write('panel-data.json',P)
# Amend frozen objects only through an explicit overlay, preserving their IDs and old source objects.
am=[]
def amend(collection,oldid,reason,fn):
 replacement=copy.deepcopy(next(x for x in oldpanel[collection] if x['id']==oldid));fn(replacement)
 am.append({'collection':collection,'id':oldid,'reason':reason,'replacement':replacement})
warning='补读待核：2025员工表母公司2939+主要子公司67979=70918，与表列总人数109895未能勾稽；不擅自替换原总数。涉及总人数作分母的比例与人均收入仅保留原口径代理，暂不作效率比较。'
def rowwarn(t):
 t['notes'].append(warning)
 for r in t['rows']:
  if r['id'].startswith('boe-'):
   r['notes'].append(warning);r['revision']+=' '+warning;r['evidence'].append(ev('boe','2025',48,'员工分项与总数口径待核'))
for tid in ['cn-c39-company-2025-employees-year-end','cn-c39-company-2025-production-employee-pct','cn-c39-company-2025-revenue-per-year-end-employee']:
 amend('comparisons',tid,'实际核对京东方员工原表后发现分项与总数范围未勾稽；保留原值并限制解释。',rowwarn)
def assets(f):
 f['title']='长期资产投入与营运资金需要一起读';f['conditions'] += ['浪潮信息低购建长期资产付现比例不能推断资金需求低：2026H1预付款和存货显著增加，经营现金为负。','中芯国际在建工程余额下降含大额转固和其他减少，不能据此判断扩产停止；京东方现金桥有大额折旧等非现金加回。'];f['evidence'] += [ev('inspur','2026-H1','87—88、116','预付、存货及现金桥'),ev('smic','2026-H1','113—114','在建工程转固及其他减少'),ev('boe','2025',191,'现金流补充资料')]
amend('findings','cn-c39-company-finding-assets','保留2025原比例，加上营运资金、转固与折旧条件，防止将低付现当低资金需求。',assets)
def scope(f):
 f['conditions'].append('Leoni及相关ODM收购在2025年7月发生，故2026H1即使无新并购，其同比2025H1仍非恒定合并范围；未取得同口径备考数据前不称为有机增长。');f['evidence'] += [ev('luxshare','2025',238,'收购日'),ev('luxshare','2026-H1',171,'合并范围变更')]
amend('findings','cn-c39-company-finding-scope','补足购买日期以及2026H1同比仍受并表影响的条件。',scope)
def head(c):c['detail']+=' '+warning;c['evidence'].append(ev('boe','2025',48,'员工分项与总数范围'));c['nextStep']+=' 向京东方确认70918与109895的范围调节。'
amend('coverage','cn-company-coverage-headcount','将已实际发现的员工范围疑点加入总体员工口径缺口。',head)
write('amendments.json',am)
# Human-readable report, generated from the same working record and numeric output.
lines=['# 上市公司财报专题补读','',f'复核日期：{DATE}。沿用原有13家目的样本、26份完整原件。本轮实际读取列明的{sum(r["readPdfPageCount"] for r in reports)}个PDF页面，范围是经营分析及六组财务问题，并未声称逐字读完26份全文。页数只是工作记录，不代表研究完整性。','', '此次增加了能解释图谱旁企业差异的库存与现金信息，同时修订旧解释的成立条件。所有企业金额均是财报集团口径；含境外生产、服务、金融或房地产业务时，不替代中国统计增加值。','', '## 新增解释','']
for f in P['findings']:
 lines += ['### '+f['title'],'',f['body'],'','证据：'+ '；'.join(f"[{e['sourceId']} · {e['locator']}]({sources[e['sourceId']]['url']})" for e in f['evidence'])+'。','']
lines += ['## 可复算的最新对照','','下表存货为2026年6月末净额，变化率以2025年末为基期；现金比率是2026年1—6月经营现金净流量除以同期间营业收入。没有把半年金额年化，也没有将这些比率当作增加值、生产率或投资判断。','','| 企业 | 6月末存货净额（亿元人民币） | 较上年末 | 上半年经营现金净流量/营业收入 |','|---|---:|---:|---:|']
for c in C:
 inv=lookup[c['id'],'2026-H1','inventory-net'];g=next(x['value'] for x in derived if x['companyId']==c['id'] and x['metric']=='inventory-change-pct');cash=next(x['value'] for x in derived if x['companyId']==c['id'] and x['metric']=='ocf-revenue-pct');lines.append(f"| {c['name']} | {inv['value']/1e8:.2f} | {g:+.2f}% | {cash:+.2f}% |")
lines += ['','数据、原始单位、公式和每行页码均在 observations.json；网页比较表也逐行保留证据和比较期。生益/沪电的集团存货含房地产范围，中兴现金含财务公司，立讯同比范围受并购影响；跨公司只作线索对照，不据此排工厂效率。','','## 实际阅读与未覆盖范围','','| 企业 | 2025年报实际PDF页 | 2026半年报实际PDF页 |','|---|---|---|']
for c in C:
 rs=[r for r in reports if r['companyId']==c['id']];lines.append(f"| {c['name']} | {range_text(rs[0]['pdfPagesRead'])} | {range_text(rs[1]['pdfPagesRead'])} |")
for c in C:
 lines += ['','### '+c['name']]
 for r in [r for r in reports if r['companyId']==c['id']]:
  lines += ['',r['period']+'：'+ '；'.join({'inventory':'存货/减值','cash':'应收/现金','subsidies':'补助','capital':'资本/在建','scope':'合并范围','labor':'人工口径'}.get(k,k)+'—'+v for k,v in r['topics'].items())+'。','尚未覆盖：'+'；'.join(r['notCovered'])+'。']
lines += ['','## 仍需核实的原表问题','']
for q in quality:lines+=['- '+q['issue']+' '+q['action']]
lines += ['','## 使用边界与后续验证','','- 下载和关键词定位没有计为实际阅读。read-log.json列出已读页与全部未读页范围；完整原件、全文提取和页面图片只作本地核验。','- 准备余额下降不等于没有计提损失；转回、销售转销、汇兑和收购新增需要分别检查。','- 报表资产负债变动不必等于现金桥差额，非现金、并表、重分类等未调节完毕时不作机械归因。','- “劳务外包不适用”不证明供应链没有委托加工；研发人工、费用中的薪酬、应付薪酬本期增加、工资现金、期末人数和平均工时分别保留。','- 政府补助没有生成跨公司总额榜：纯补助、税费优惠、成本冲减、递延摊销与现金尚未统一。','- 后续优先核京东方员工范围、深科技准备转销合计、歌尔研发两个口径；再补全部工程续页、分部抵销、客户账龄和同口径并购备考数据。现有公开资料不足以证明业务订单质量或未来回款。','', '## 文件与复算','','- read-log.json：逐报告页码、章节、未读范围和原件哈希。','- observations.json：133个新增原值、26个库存变化/现金比率计算、原始单位及期间。','- panel-data.json：来自相同数据的网页对照、解释和缺口。','- amendments.json：6项针对旧表/结论/覆盖记录的完整替换叠层；旧目录未改。','- build.py 与 verify.py：重新生成并检查引用、页码、原件哈希及计算。','']
(B/'analysis.md').write_text('\n'.join(lines))
print(f'Built {len(reports)} report logs, {len(obs)} raw observations, {len(derived)} calculations, {len(P["findings"])} findings, {len(am)} amendments.')
