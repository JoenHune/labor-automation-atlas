"""Rebuild macro.json from archived NBS releases and visually checked yearbook cells.

No network requests and no third party dependencies. Run with Python 3.
Yearbook image cells are transcribed in yearbook_values, with row/column locators.
"""
from pathlib import Path
from decimal import Decimal
import hashlib
import html
import json
import re

ROOT = Path(__file__).resolve().parent
AS_OF = "2026-09-09"
SCOPE = "中国国家统计局全国GDP核算范围；不包括香港、澳门特别行政区和台湾省地区生产总值"
source_specs = [
    ("cn-nbs-2025-preliminary", "2025年四季度和全年国内生产总值初步核算结果", "https://www.stats.gov.cn/sj/zxfbhjd/202601/t20260120_1962349.html", "2026-01-20", "annual2025.html", "初步核算"),
    ("cn-nbs-2024-final", "国家统计局关于2024年国内生产总值最终核实的公告", "https://www.stats.gov.cn/xxgk/sjfb/zxfb2020/202512/t20251226_1962144.html", "2025-12-26", "annual2024final.html", "最终核实"),
    ("cn-nbs-2026-q1", "2026年一季度国内生产总值初步核算结果", "https://www.stats.gov.cn/sj/zxfbhjd/202604/t20260417_1963336.html", "2026-04-17", "quarter2026q1.html", "初步核算"),
    ("cn-nbs-2026-h1", "2026年二季度和上半年国内生产总值初步核算结果", "https://www.stats.gov.cn/sj/zxfb/202607/t20260716_1964142.html", "2026-07-16", "half2026h1.html", "初步核算"),
    ("cn-nbs-2026-july", "1—7月份国民经济保持总体平稳、向新向优发展态势", "https://www.stats.gov.cn/sj/zxfb/202608/t20260817_1965056.html", "2026-08-17", "monthly202607.html", "当期发布值；未标为最终数"),
    ("cn-nbs-2025-communique", "中华人民共和国2025年国民经济和社会发展统计公报", "https://www.stats.gov.cn/sj/zxfb/202602/t20260228_1962662.html", "2026-02-28", "communique2025.html", "2025年GDP为初步核算"),
    ("cn-nbs-yearbook2025-t3-1", "中国统计年鉴2025·3-1 国内生产总值", "https://www.stats.gov.cn/sj/ndsj/2025/html/C03-01.jpg", None, "C03-01.jpg", "五经普及核算改革后历史修订值；本研究不采用表中2024初步值"),
    ("cn-nbs-yearbook2025-t3-6", "中国统计年鉴2025·3-6 分行业增加值", "https://www.stats.gov.cn/sj/ndsj/2025/html/C03-06.jpg", None, "C03-06.jpg", "五经普及核算改革后历史修订值"),
    ("cn-nbs-yearbook2025-method", "中国统计年鉴2025·国民经济核算简要说明", "https://www.stats.gov.cn/sj/ndsj/2025/html/sm03.htm", None, "yearbook-method.html", "核算方法与历史修订说明"),
    ("cn-nbs-yearbook2025-note", "中国统计年鉴2025·编者说明", "https://www.stats.gov.cn/sj/ndsj/2025/html/note.htm", None, "yearbook-note.html", "统计范围与取舍误差说明"),
    ("cn-nbs-release-calendar-2026", "2026年国家统计局主要统计信息发布日程表", "https://www.stats.gov.cn/xw/tjxw/tzgg/202512/t20251224_1962137.html", "2025-12-24", "release-calendar.html", "计划日程，非实际发布证明"),
    ("cn-nbs-yearbook-catalog", "中国统计年鉴官方目录", "https://www.stats.gov.cn/sj/ndsj/", None, "yearbook-catalog.html", "截至检索日列出的最新在线年鉴为2025版"),
]
sources = {}
for sid, title, url, date, filename, revision in source_specs:
    sources[sid] = dict(id=sid, publisher="国家统计局", title=title, url=url,
        publishedAt=date, publicationDateNote=None if date else "页面未标示具体发布日期；2025版年鉴的版本年不是数据年或具体发布日期",
        retrievedAt=AS_OF, revisionStatus=revision, country="CN", coverage=SCOPE,
        archivedPath="research/cn/raw/"+filename,
        sha256=hashlib.sha256((ROOT/"raw"/filename).read_bytes()).hexdigest())

# Every column below is [2021, 2022, 2023], copied from official table image 3-6.
yearbook_values = {
    "农林牧渔业": [86994.8, 92576.8, 93967.0],
    "采矿业": [32012.1, 38303.4, 35613.9],
    "制造业": [312494.4, 320609.1, 323754.6],
    "电力、热力、燃气及水生产和供应业": [25397.3, 29739.1, 32814.5],
    "建筑业": [79269.8, 81439.8, 86640.6],
    "批发和零售业": [114358.0, 122177.5, 130809.7],
    "交通运输、仓储和邮政业": [48439.0, 50967.7, 56438.3],
    "住宿和餐饮业": [19064.4, 19146.2, 23084.2],
    "信息传输、软件和信息技术服务业": [45506.6, 51036.3, 57498.4],
    "金融业": [86409.2, 88051.5, 93926.9],
    "房地产业": [90397.5, 88015.2, 87981.5],
    "租赁和商务服务业": [40581.1, 44164.9, 50438.9],
    "科学研究和技术服务业": [29406.5, 31525.8, 34088.4],
    "水利、环境和公共设施管理业": [7081.8, 7604.2, 7997.9],
    "居民服务、修理和其他服务业": [19708.6, 20998.2, 23418.2],
    "教育": [44523.6, 47629.3, 49398.6],
    "卫生和社会工作": [27003.1, 30056.5, 31970.2],
    "文化、体育和娱乐业": [9232.0, 9678.3, 10692.8],
    "公共管理、社会保障和社会组织": [55943.5, 60309.6, 63737.2],
}
# Image 3-1: year rows × GDP, primary/secondary/tertiary and industrial columns.
yearbook_totals = {
    "GDP": [1173823.0, 1234029.4, 1294271.7],
    "第一产业": [83216.5, 88207.0, 89169.1],
    "第二产业": [447138.2, 467629.6, 475936.1],
    "第三产业": [643468.4, 678192.7, 729166.5],
    "工业": [369903.7, 388651.6, 392183.0],
}
industry_specs = [
    ("cn-industry", "工业", ["secondary", "tertiary"], "B+C+D", "包含采矿、制造、公用事业；部分专业辅助、修理活动属于第三产业，不能直接等同第二产业工业口径"),
    ("cn-wholesale-retail", "批发和零售业", ["tertiary"], "F", None),
    ("cn-finance", "金融业", ["tertiary"], "J", None),
    ("cn-agriculture", "农林牧渔业", ["primary", "tertiary"], "A", "包含农林牧渔专业及辅助性活动，不等于第一产业"),
    ("cn-construction", "建筑业", ["secondary"], "E", None),
    ("cn-real-estate", "房地产业", ["tertiary"], "K", "包括自有住房服务核算；增加值规模不能直接视作可替代人工市场"),
    ("cn-information", "信息传输、软件和信息技术服务业", ["tertiary"], "I", None),
    ("cn-business-services", "租赁和商务服务业", ["tertiary"], "L", None),
    ("cn-transport", "交通运输、仓储和邮政业", ["tertiary"], "G", None),
    ("cn-accommodation-food", "住宿和餐饮业", ["tertiary"], "H", None),
]
industries = [dict(id=i, country="CN", name=n, sectors=s, classificationCode=c, scopeNote=note, rankingEligible=True) for i,n,s,c,note in industry_specs]
names = {d[1]:d[0] for d in industry_specs}
names.update({"GDP":"cn-gdp", "第一产业":"cn-primary", "第二产业":"cn-secondary", "第三产业":"cn-tertiary", "其他行业":"cn-other", "制造业":"cn-manufacturing"})
other_components = list(yearbook_values)[12:]

def evidence(sid, row, column, table="表1", raw=None):
    return dict(sourceId=sid, url=sources[sid]["url"], locator=dict(table=table,row=row,column=column), verbatimValue=raw)

def cell(name, period, value, refs, status="direct_fact", growth=None, growth_ref=None, calculation=None):
    sid=refs[0]["sourceId"]
    return dict(id=f"{names.get(name,'cn-historical-detail')}-{period}-current-value-added", country="CN", industryId=names.get(name), industryName=name,
        period=str(period), frequency="annual" if len(str(period))==4 else ("half-year" if "H" in str(period) else "quarterly"),
        metric="current_price_gross_value_added" if name!="GDP" else "current_price_gdp", value=value, unit="亿元", currency="CNY", priceBasis="current", annualized=False,
        coverage=SCOPE, publishedAt=sources[sid]["publishedAt"], publicationDateNote=sources[sid]["publicationDateNote"],
        revisionStatus=sources[sid]["revisionStatus"], evidenceType=status, evidence=refs,
        realGrowthPct=growth, realGrowthEvidence=growth_ref, calculation=calculation)

observations = []
for idx, year in enumerate([2021,2022,2023]):
    for name in list(names):
        if name == "其他行业":
            vals = [yearbook_values[n][idx] for n in other_components]
            val = float(sum(Decimal(str(v)) for v in vals))
            refs = [evidence("cn-nbs-yearbook2025-t3-6", n, f"{year}年", "3-6 分行业增加值", str(v)) for n,v in zip(other_components, vals)]
            observations.append(cell(name,year,val,refs,"calculation",calculation=dict(operation="sum", operands=vals,
                componentNames=other_components, formula="sum(seven_official_service_sections)", note="按最新11行业分类合并七个官方历史门类；不是2025其他行业的拆分；不用3-1更宽的其他列")))
        elif name in yearbook_totals:
            v=yearbook_totals[name][idx]
            observations.append(cell(name,year,v,[evidence("cn-nbs-yearbook2025-t3-1",f"{year}年",name,"3-1 国内生产总值",str(v))]))
        elif name in yearbook_values:
            v=yearbook_values[name][idx]
            observations.append(cell(name,year,v,[evidence("cn-nbs-yearbook2025-t3-6",name,f"{year}年","3-6 分行业增加值",str(v))]))

def rows_in_release(filename):
    s=(ROOT/"raw"/filename).read_text()
    for table in re.findall(r"<table\b[^>]*>.*?</table>",s,flags=re.S|re.I):
        rows=[]
        for tr in re.findall(r"<tr\b[^>]*>(.*?)</tr>",table,flags=re.S|re.I):
            cells=[re.sub(r"\s+","",html.unescape(re.sub("<[^>]*>","",c))) for c in re.findall(r"<t[dh]\b[^>]*>(.*?)</t[dh]>",tr,flags=re.S|re.I)]
            rows.append(cells)
        if any(r and r[0]=="农林牧渔业" for r in rows): return rows
    raise ValueError(filename)

parsed_tables={}
for sid,period,valcol,growthcol,colname,table in [
    ("cn-nbs-2024-final",2024,1,2,"现价总量（亿元）","附件1：2024年GDP最终核实数"),
    ("cn-nbs-2025-preliminary",2025,2,4,"全年绝对额（亿元）","表1：2025年四季度和全年GDP初步核算数据"),
    ("cn-nbs-2026-q1","2026-Q1",1,2,"绝对额（亿元）","表1：2026年一季度GDP初步核算数据"),
    ("cn-nbs-2026-h1","2026-Q2",1,3,"二季度绝对额（亿元）","表1：2026年二季度和上半年GDP初步核算数据"),
    ("cn-nbs-2026-h1","2026-H1",2,4,"上半年绝对额（亿元）","表1：2026年二季度和上半年GDP初步核算数据"),
]:
    filename=sources[sid]["archivedPath"].split("/")[-1]
    rows=parsed_tables.setdefault(sid,rows_in_release(filename))
    for r in rows:
        if not r: continue
        name=r[0].replace("#","")
        if name not in names: continue
        observations.append(cell(name,period,int(r[valcol]),[evidence(sid,r[0],colname,table,r[valcol])],
            growth=float(r[growthcol]),growth_ref=evidence(sid,r[0],colname.replace("绝对额（亿元）", "同比增长（%）").replace("现价总量（亿元）","不变价增速（%）"),table,r[growthcol])))

annual_latest={o["industryId"]:o for o in observations if o["period"]=="2025"}
gdp=annual_latest["cn-gdp"]["value"]
ranking=[]
for rank,ind in enumerate(sorted(industries,key=lambda i:annual_latest[i["id"]]["value"],reverse=True),1):
    o=annual_latest[ind["id"]]
    ranking.append(dict(rank=rank,industryId=ind["id"],country="CN",name=ind["name"],value=o["value"],unit="亿元",period="2025",observationId=o["id"],shareOfGdpPct=o["value"]/gdp*100,shareEvidenceType="calculation",shareFormula="value / 1401879 * 100"))

monthly=[]
for iid,label,period,value,basis,loc in [
    ("cn-industry","规模以上工业增加值同比增速","2026-07",4.5,"comparable","表：一、规模以上工业增加值；7月同比增长列"),
    ("cn-industry","规模以上工业增加值同比增速","2026-01/07",5.3,"comparable","表：一、规模以上工业增加值；1—7月同比增长列"),
    ("cn-tertiary","服务业生产指数同比增速","2026-07",4.3,"production_index","表：二、服务业生产指数；7月同比增长列"),
    ("cn-tertiary","服务业生产指数同比增速","2026-01/07",4.7,"production_index","表：二、服务业生产指数；1—7月同比增长列"),
    ("cn-information","行业服务业生产指数同比增速","2026-01/07",10.6,"production_index","正文二、服务业平稳增长，现代服务业发展向好；分行业第一项"),
    ("cn-business-services","行业服务业生产指数同比增速","2026-01/07",9.5,"production_index","正文二、服务业平稳增长，现代服务业发展向好；分行业第二项"),
    ("cn-finance","行业服务业生产指数同比增速","2026-01/07",6.3,"production_index","正文二、服务业平稳增长，现代服务业发展向好；分行业第三项"),
    ("cn-transport","行业服务业生产指数同比增速","2026-01/07",5.1,"production_index","正文二、服务业平稳增长，现代服务业发展向好；分行业第四项"),
]:
    monthly.append(dict(country="CN",industryId=iid,label=label,period=period,value=value,unit="%",priceBasis=basis,publishedAt="2026-08-17",revisionStatus="当期发布值；未标为最终数",evidenceType="direct_fact",sourceId="cn-nbs-2026-july",url=sources["cn-nbs-2026-july"]["url"],locator=loc,rankingEligible=False,scopeNote="进度指标，不能代替全行业现价增加值或用于主榜排序"))

checks=[]
for period in ["2021","2022","2023","2024","2025","2026-Q1","2026-Q2","2026-H1"]:
    byid={o["industryId"]:o for o in observations if o["period"]==period}
    total=sum(Decimal(str(byid[i]["value"])) for i in [d["id"] for d in industries]+["cn-other"])
    difference=float(total-Decimal(str(byid["cn-gdp"]["value"])))
    checks.append(dict(check="non_overlapping_11_group_sum",period=period,industrySum=float(total),gdp=byid["cn-gdp"]["value"],difference=difference,unit="亿元",status="pass_with_official_rounding",note="保留源表修约误差；不机械调整"))
    assert abs(difference)<=3, (period,difference)
assert len(ranking)==10
assert len({o["id"] for o in observations})==len(observations)

result=dict(schemaVersion="1.0.0",researchVersion="2026-09-09-public-v1-draft",country="CN",countryName="中国",asOf=AS_OF,
    defaultYear=2025,availableYears=[2021,2022,2023,2024,2025],coverage=SCOPE,unit="亿元",currency="CNY",priceBasis="current",annualized=False,
    selection=dict(rule="最新官方现价增加值；11个第一级行业中的10个具名行业按2025全年数排序，其他行业单列",classification="GB/T 4754-2017；NBS GDP第一级11行业；三次产业划分规定2018",rankingTitle="2025年官方GDP一级分类中的10个具名行业榜",scopeWarning="这是最新官方可识别具名大类榜，不是所有19个门类或全部工业大类的全国Top10；未拆分其他行业可能包含大行业",parentChildExclusion="工业入榜，制造业仅作其子项；三次产业合计不入行业榜",missingSectorSupplement=[],sectorCoverage=["primary","secondary","tertiary"],sourceId="cn-nbs-2025-preliminary"),
    latestPeriod=dict(gdp="2026-H1",quarter="2026-Q2",publishedAt="2026-07-16",sourceId="cn-nbs-2026-h1",monthlyProgress="2026-07",monthlyPublishedAt="2026-08-17",nextGdpPlannedRelease="2026-10-20",nextMonthlyPlannedRelease="2026-09-15",calendarSourceId="cn-nbs-release-calendar-2026",actualPublicationChecked=True),
    industries=industries,ranking=ranking,
    otherIndustry=dict(id="cn-other",country="CN",name="其他行业（未拆分汇总）",period="2025",value=annual_latest["cn-other"]["value"],unit="亿元",shareOfGdpPct=annual_latest["cn-other"]["value"]/gdp*100,evidenceType="direct_fact",shareEvidenceType="calculation",shareFormula="246593 / 1401879 * 100",observationId=annual_latest["cn-other"]["id"],components=other_components,componentValues2025=None,scopeNote="2025发布仅给汇总值；七门类规模缺口保持未拆分，历史2023分行业值不能当2025值"),
    observations=observations,monthlyProgress=monthly,sources=list(sources.values()),
    historicalDetail=dict(years=[2021,2022,2023],values=yearbook_values,sourceId="cn-nbs-yearbook2025-t3-6",unit="亿元",priceBasis="current",use="仅用于历史序列及核对分组；不可替代2025主榜"),
    gaps=[
        dict(id="cn-gap-national-data-api",status="unresolved_access",description="国家数据首页查询与公开QueryData请求HTTP403；不能确认2025年鉴中的2021—2023值是否在数据库中另有后续细小修订。现采用可获取最新年鉴的五经普后修订值，GDP总量与2026-02公报取整后吻合。",attempts=["https://data.stats.gov.cn/easyquery.htm?cn=C01","https://data.stats.gov.cn/easyquery.htm?m=QueryData&dbcode=hgnd&rowcode=zb&colcode=sj&wds=%5B%5D&dfwds=%5B%7B%22wdcode%22%3A%22zb%22%2C%22valuecode%22%3A%22A0201%22%7D%5D"],nextStep="发布前经可访问的官方数据库或中国统计摘要2026复核历史行业单元格"),
        dict(id="cn-gap-yearbook-date",status="date_not_displayed",description="在线2025年鉴未标具体发布日期；publishedAt为空，保留版本名和抓取日；不以HTTP Last-Modified冒充发布日期。"),
        dict(id="cn-gap-2025-other",status="not_disaggregated_in_latest_release",description="2025其他行业246593亿元没有在同一期主表拆出七门类；不按2023比例推算。"),
        dict(id="cn-gap-2026-yearbook",status="not_found_as_of_check",description="官方年鉴目录列出的最新版本是2025；2026/left.htm返回404，不将未获取等同于永久未发布。",url="https://www.stats.gov.cn/sj/ndsj/2026/left.htm"),
    ],checks=checks,
    notes=["现价规模与不变价增长分别存储；不能用增长率反推现价值。", "2021—2023其他行业为七个官方历史门类加总，误差来自源表取舍；表3-1其他列还包含信息与租赁商务，不能直接连到当前其他行业序列。", "2024年鉴初步数已由2025-12-26最终核实数据替换。", "2026-Q1保留其官方发布值；H1减Q2可能有1亿元取整差，不借差额伪造一季度修订值。", "以上行业规模不代表实体劳动工资规模或自动化可实现收益。"])
(ROOT/"macro.json").write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n")
(ROOT/"raw"/"extracted-release-tables.json").write_text(json.dumps(parsed_tables,ensure_ascii=False,indent=2)+"\n")
print(json.dumps(dict(observations=len(observations),rankedIndustries=len(ranking),latestGdp=result["latestPeriod"]["gdp"],checks=checks),ensure_ascii=False,indent=2))
