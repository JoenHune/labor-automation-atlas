"""Research activity correspondence, never an official product/industry crosswalk."""
from pathlib import Path
import json,collections
ROOT=Path(__file__).resolve().parents[3]
OUT=Path(__file__).resolve().parent
io=json.loads((ROOT/'research/macro/cn-io-2023-extract.json').read_text())
annotations=json.loads((OUT/'extracted/gb2017-annotations.json').read_text())
classes={}
for row in annotations:
 c=row['cells']
 for pos in (0,1):
  v=str(c[pos] or '') if len(c)>pos else ''
  if v.isdigit() and 2<=len(v)<=4: classes[v]={'code':v,'name':c[3], 'row':row['row'],'codeColumn':'A' if pos==0 else 'B'}
# Every line is one original 211 product, in source order. Comma means union.
# A 2/3 digit code includes its descendants. Mapping is activity correspondence only.
spec='''011
012,013,014,015,016,017,018,019
02
032
031,033,039
041
042
05
06
071
072
08
09
101
102,103,109
11,12
131
132
133
134
135
136
137
139
143
144
146
141,142,145,149
151
152
153
16
171
172
173,174
175
176
177
178
181
182
183
191,192,193,194
195
201
202
203,204
21
221,222
223
23
243
241,242,244,245,246
251,253
252
261
262
263
264
265
266,267
268
271
272
273,274
275,276,277,278
28
2911
2912,2913,2914,2915,2916,2919
2921
2927
2922,2923,2924,2925,2926,2928,2929
301
302
303
304
305
3071,3072
3073,3074,3075,3076,3079
308
309
311
312
313
314
321
322,323
324
3251
3252
3253,3254,3259
331
332,334
333
335
338
336,337,339
341
342
343
344
345
346
347
348
349
351
352
356
357
358
353,354,355,359
3611
3612
362,363,364,365,366
367
371,372
373
374,375,376,377,378,379
381
382
383
384
385,386
387,389
3911
3912,3913,3914,3915,3919
3921
3922
393,394
395
397
398
396,399
40
41
42
43
4411,4412
4413,4414,4415,4416,4417,4419
442
443
45
46
471
472,479
481
482,483
484
485,486
487
489
49
501
502,503,509
51
52
531
532,533
541,542
543,544
551
552,553
5611
5612,563
57
58
591
592,593,594,595,596,599
60
61
62
631
632,633
64
651
652,653,654,655,656,657,659
661,662,665
663,664
67
68
69
70
71
723,724,725,726
721,722,727,728,729
73
741,742,743,746,747
745
748
749
751
752,753,754,759
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91,92,93
94
95,96'''.splitlines()
assert len(spec)==211,len(spec)
def section(d):
 n=int(d)
 for name,low,high in [('A',1,5),('B',6,12),('C',13,43),('D',44,46),('E',47,50),('F',51,52),('G',53,60),('H',61,62),('I',63,65),('J',66,69),('K',70,70),('L',71,72),('M',73,75),('N',76,79),('O',80,82),('P',83,83),('Q',84,85),('R',86,90),('S',91,96)]:
  if low<=n<=high:return name
 raise ValueError(d)
# These activity definitions do not establish where missing source classes are placed.
# Broader calibration pools avoid arbitrarily assigning their workers to one product.
ambiguous={
 '25': {'missingActivityCodes':['254'],'note':'2017行业大类25含生物质燃料加工254；两个IO产品名称没有明确覆盖位置，未取得2023产品分类附录；整个25大类仅作为组级估算池。'},
 '30': {'missingActivityCodes':['306'],'note':'2017行业大类30含玻璃纤维及增强塑料306；现有产品名称没有明确其归属，玻璃制品/其他非金属矿物不能任择，整个30大类仅作为组级估算池。'},
 '56': {'missingActivityCodes':['562'],'note':'通用航空562包含生产、观光与体育等服务，无法从旅客/货运产品名称判明分配；整个56大类仅作为组级估算池。'},
 '74': {'missingActivityCodes':['744'],'note':'测绘地理信息744未在四个产品名称明确出现，不能自动塞入工程设计或其他；整个74大类仅作为组级估算池。'},
}
rows=[]
for product,line in zip(io['rows'],spec):
 codes=line.split(',');assert all(c in classes for c in codes),(product,codes)
 divs=sorted({c[:2] for c in codes});sec=section(divs[0]);assert all(section(d)==sec for d in divs)
 issue=ambiguous.get(divs[0])
 exactPower=product['code']=='44140'
 status='official-scope-confirmed' if exactPower else 'research-activity-correspondence'
 if issue:status='ambiguous-detail-broader-pool'
 if product['code']=='70183':status='mixed-market-and-imputed-housing'
 loc=[{'sourceId':'emp-cn-products-gb2017-annotations','locator':f"Sheet1!{classes[c]['codeColumn']}{classes[c]['row']}:D{classes[c]['row']}；行业代码{c} {classes[c]['name']}"} for c in codes]
 if exactPower:loc.append({'sourceId':'emp-cn-products-io-other-power-2026','locator':'国家统计局国民经济核算司2026-04-16答复：其他电力生产覆盖清单'})
 notes=['按产品名称与行业活动定义建立的研究对应，不能证明产品就业等于主业归类的法人就业。','跨行业副产品、辅助活动和多产品企业劳动分配未取得官方桥矩阵。']
 if issue:notes.append(issue['note'])
 if product['code']=='70183':notes.append('房地产产品包含自有住房虚拟服务，住房所有者并非对应就业人数；可展示行业参考就业，暂不计算该整项人均增加值。')
 rows.append({'id':'emp-cn-product-map-'+product['code'],'nodeId':'cn-io-'+product['code'],'country':'cn','basis':'cn-io2023','year':2023,'productCode':product['code'],'name':product['name'],'industryStandard':'GB/T 4754—2017（第1号修改单）','industryCodes':codes,'industryDivisions':divs,'industrySection':sec,'mappingKind':status,'relationship':'union' if len(codes)>1 else ('whole-division-activity' if len(codes[0])==2 else 'specific-activity'),'sourceInputIds':['macro-cn-io2023-211','emp-cn-products-gb2017-annotations']+(['emp-cn-products-io-other-power-2026'] if exactPower else []),'evidence':loc,'employmentType':'product-attributed-census-employment-estimate','employmentIsOfficialProductCount':False,'calibrationDivisionPool':divs,'detailBoundaryGap':issue,'notes':notes})
(OUT/'mapping.json').write_text(json.dumps({'checkedAt':'2026-09-14','scope':'211产品全部逐项对应；仅1项获得官方产品范围答复，其余活动对应为本项目研究，不是官方完整对照表。','records':rows},ensure_ascii=False,indent=2)+'\n')
# Original source rows used as classification inputs; only referenced rows and immediate definitions.
used={c for r in rows for c in r['industryCodes']}|{c for a in ambiguous.values() for c in a['missingActivityCodes']}
(OUT/'classification-inputs.json').write_text(json.dumps({'sourceId':'emp-cn-products-gb2017-annotations','records':[classes[c] for c in sorted(used)]},ensure_ascii=False,indent=2)+'\n')
print('mapping',len(rows),'codes',len(used),'statuses',dict(collections.Counter(r['mappingKind'] for r in rows)))
