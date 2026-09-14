from pathlib import Path
import json,hashlib,re
P=Path(__file__).resolve().parent
records=json.loads((P/'fetch-log.json').read_text())
meta={
'io-product-industry-2022':('核算司答复：供给使用表产品和产业分类不同','2022-05-05','答复内容整段；产品按同质性、产业活动单位按主产品归类'),
'io-code-caveat-2023':('核算司答复：投入产出产品部门与国民经济行业分类不完全一致','2023-04-03','答复内容；2017产品81139的范围与行业分类差异，仅作方法警示不作2023对照'),
'io-other-power-2026':('核算司答复：2023其他电力生产的范围','2026-04-16','答复内容：水电、核电、风电、太阳能、生物质及其他发电；并指向2023出版物附录一'),
'io-2025-yearbook-notes':('中国统计年鉴2025：核算资料简要说明',None,'二、投入产出表；2023投入产出调查来源，年鉴20×20展示范围'),
'gb2017-annotations-page':('2017国民经济行业分类注释（第1号修改单）发布页','2019-05-22','发布日期及唯一XLSX附件链接'),
'census2020-directory':('中国人口普查年鉴2020：目录',None,'第二部分长表、第四卷就业表4-4及4-5为行业大类；没有该目录内的行业中类就业表'),
'census2023-directory':('中国经济普查年鉴2023：目录',None,'综合卷1-3中类法人就业、1-8大类法人就业、1-19门类个体就业；查全目录未见个体中类就业'),
'national-account-system-2016':('中国国民经济核算体系（2016）',None,'PDF物理25页/印刷20页劳动者报酬；物理31—35页/印刷26—30页供给使用表、部门分类、编表假定'),
}
for r in records:
 key=r['id'].removeprefix('emp-cn-products-');title,pub,loc=meta[key]
 r.update(country='cn',kind='official-statistics' if 'directory' in key else 'official-methodology',title=title,publisher='国家统计局',published=pub,publishedLabel=pub or '此入口未核到确切发布日期；版次和读取日分别记录',locator=loc)
for key,url,file,title,pub,loc in [
 ('gb2017-annotations','https://www.stats.gov.cn/sj/tjbz/gmjjhyfl/202302/P020230213403084213497.xlsx','originals/gb2017-annotations.xlsx','2017国民经济行业分类注释（第1号修改单）原始表','2019-05-22','Sheet1：A/B列行业代码，D列行业名，关联337个代码的具体行见classification-inputs.json'),
 ('census2020-editor','https://www.stats.gov.cn/sj/pcsj/rkpc/7rp/zk/html/note.htm','originals/census2020-editor.html','中国人口普查年鉴2020编辑说明',None,'二、普查表式；四、数据汇总口径及推算说明：长表抽10%户，各指标抽样比有差异，未经误差校正'),
]:
 f=P/file;records.append({'id':'emp-cn-products-'+key,'country':'cn','kind':'official-methodology','title':title,'publisher':'国家统计局','url':url,'published':pub,'publishedLabel':pub or '未核到确切发布日期','retrieved':'2026-09-14','archive':str(f.relative_to(P.parents[2])),'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'locator':loc,'bytes':f.stat().st_size})
# Paths must be repository-relative across all local inputs.
for r in records:
 if r['archive'].startswith('/'):r['archive']=str(Path(r['archive']).relative_to(P.parents[2]))
(P/'sources.json').write_text(json.dumps({'checkedAt':'2026-09-14','sources':records},ensure_ascii=False,indent=2)+'\n')
logs=[]
for r in records:
 logs.append({'sourceId':r['id'],'status':'read-relevant-sections','readAt':'2026-09-14','readScope':r['locator'],'notRead':'未声称通读该网站或未引用的表格/章节','archiveSha256':r['sha256']})
logs.append({'sourceId':'macro-cn-io2023-211','status':'reused-verified-extract','readAt':'2026-09-14','readScope':'逐行读取已归档211产品代码、名称、TVA和VA001劳动者报酬；211报酬均为正；本轮没有冒称重新下载国家数据整张表','notRead':'没有取得2023出版物分类附录或任何官方产品就业卫星表'})
queries=[
 ('site:stats.gov.cn 2023 投入产出 部门分类 211 就业 人数','定位投入产出解释，未取得官方211就业数'),
 ('site:stats.gov.cn 2023 投入产出表 劳动者报酬 产品部门 编制','核算体系、统计知识解释可用；就业卫星数据未取得'),
 ('site:stats.gov.cn 第五次 经济普查 个体经营户 分行业 从业人员 中类','公报二号门类；综合卷目录有中类法人，个体仅门类'),
 ('"投入产出部门分类" "2023年"','检索到第三方错误年代标题，不作为分类依据'),
 ('"第五次" "投入产出" "部门分类目录"','未取得官方完整2023产品分类附录下载'),
 ('"2023" "投入产出" "01001" "011"','未取得可直接证明一一对应的官方表'),
 ('site:gov.cn "投入产出" "产品部门分类目录"','旧核算制度等，不能替代211表分类'),
 ('site:stats.gov.cn "投入产出表" "就业人数"','未取得2023官方产品就业附表'),
 ('site:stats.gov.cn "投入产出表" "就业系数"','未取得2023官方211就业系数'),
 ('site:stats.gov.cn "投入产出表" "就业" "卫星"','未取得2023官方211就业卫星账户'),
 ('site:stats.gov.cn "就业卫星账户"','未取得对应官方数据；检索命中学术研究自己编制，不能改标官方'),
 ('site:stats.gov.cn "就业卫星表"','未取得对应官方数据'),
 ('"2023年中国投入产出表" "附录"','官方答复指向纸质/光盘附录，出版物本体未取得'),
 ('"中国2023年投入产出表产品部门分类解释及代码"','同上；第三方销售/论坛仅用于定位，不下载或引用其数据'),
 ('site:zgtjcbs.com "投入产出表" "2023"','本轮检索未得到2023附录可公开读取入口'),
 ('site:stats.gov.cn "2023年全国投入产出表中" "其他电力生产"','实际读取2026-04-16官方答复，确认其他电力范围'),
 ('site:stats.gov.cn "GB/T 4754—2017" "下载"','实际下载2019修订官方注释XLSX并定位337代码'),
 ('site:stats.gov.cn "人口普查" "行业中类" "就业人口"','出现2010中类；检查2020官方目录仅大类就业，不混年份'),
 ('"2020年人口普查" "行业中类" "就业人口" site:stats.gov.cn','检查2020目录及编辑说明，长表10%户，不能人数简单×10并当2023'),
 ('site:gov.cn "投入产出" "劳动者报酬" "个体经营者"','进一步查2016核算体系原文，劳动报酬包含非工资福利、自雇混合收入按比例划分'),
]
log={'checkedAt':'2026-09-14','scope':'公开网站定向检索与已下载原件；本日志不证明全部互联网、全部图书或统计部门未发布','sources':logs,'searches':[{'query':q,'searchedAt':'2026-09-14','result':a,'status':'searched'} for q,a in queries],'failedReads':[{'url':'https://www.stats.gov.cn/sj/pcsj/rkpc/7rp/zk/html/zb04.pdf','status':404,'meaning':'该猜测路径不存在；改读目录所链接编辑说明，不把404当资料不存在'}],'nextSources':['2023中国投入产出表附录一原件','2023供给使用表70产品×60产业及其分类附录','产品×行业劳动投入桥矩阵或可用于构造桥矩阵的产业活动单位副产品资料','个体经营就业大/中类交叉表（若可公开取得）']}
# Preserve independent cross-review readings and later searches on regeneration.
if (P/'read-log.json').exists():
 prior=json.loads((P/'read-log.json').read_text())
 log['sources']=list({x['sourceId']:x for x in prior.get('sources',[])+log['sources']}.values())
 log['searches']=list({x['query']:x for x in prior.get('searches',[])+log['searches']}.values())
 for key in ['searchLogType','modelReviews']:
  if key in prior:log[key]=prior[key]
(P/'read-log.json').write_text(json.dumps(log,ensure_ascii=False,indent=2)+'\n')
print('sources',len(records),'read entries',len(log['sources']),'search scopes',len(log['searches']))
