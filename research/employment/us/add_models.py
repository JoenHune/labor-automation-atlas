# -*- coding: utf-8 -*-
"""Injected by build.py before full-parent remainder handling; deliberately explicit allocations."""
io=openpyxl.load_workbook(RAW/'Use_SUT_Detail.xlsx',data_only=True)['2017']
iocol={str(io.cell(6,c).value):c for c in range(3,405)}
def compensation(codes):
 cells=[io.cell(410,iocol[c]) for c in codes];assert all(isinstance(c.value,(float,int)) for c in cells)
 return sum(c.value for c in cells),[ev('us-employment-bea-io2017',"Use_SUT_Detail.xlsx '2017'!"+', '.join(c.coordinate for c in cells)+'; row V00100 Compensation of employees; industry codes '+','.join(codes)+'; million USD')]
def allocate(r,pool,child_weight,parent_weight,child_refs,parent_refs,method,basis,assumptions):
 v=pool['value']*child_weight/parent_weight
 emp={'value':v,'unit':'jobs','year':r['year'],'denominatorKind':pool['denominatorKind'],'periodBasis':pool['periodBasis'],'status':'estimated','modelBasis':basis,'definition':basis+'分配同年父项雇员岗位（模型）；不是官方细分就业观测。','coverage':pool['coverage'],'coverageKey':pool['coverageKey']+'-'+method,'releaseDate':None,'revision':'研究估算2026-09-14，基期在本值处明确标注。','evidence':pool['evidence']+child_refs+parent_refs,'typedCalculation':{'methodId':method,'label':'同年父项岗位 × 基期细分权重','expression':f"{pool['value']} * {child_weight} / {parent_weight}",'operation':'share','inputs':[{'id':'current-parent','label':'同年父项雇员岗位池','value':pool['value'],'unit':'jobs','evidence':pool['evidence']},{'id':'child-weight','label':basis+'：子项','value':child_weight,'unit':'million USD compensation' if '薪酬' in basis else 'jobs','evidence':child_refs},{'id':'parent-weight','label':basis+'：父项','value':parent_weight,'unit':'million USD compensation' if '薪酬' in basis else 'jobs','evidence':parent_refs}],'assumptions':assumptions},'sensitivity':{'lower':v*0.7,'upper':min(pool['value'],v*1.3),'label':'分配权重相对±30%的压力情景（非置信区间）','assumptions':['假设就业分配份额相对点估算±30%，父项岗位池固定；不是统计误差范围，不保证覆盖真实值。']}}
 emp['periodNote']=pool.get('periodNote','本年年度雇员观测，未将基年分配权重误作本年实测。')
 r['employment']=emp;r['status']='available';r['gaps'].append('缺官方同分类就业，已用'+basis+'给出可复算估算。');va=r['valueAdded']['value']
 if va is not None:r['ratio']={'value':va/v,'unit':'USD/job/year','status':'proxy','formula':f'{va} / ({v})','numeratorPeriod':r['year'],'denominatorPeriod':r['year'],'label':'每估算雇员岗位对应增加值','assumptions':assumptions}
construction={16:['233210','233262'],17:['230301','230302'],18:['2332A0'],19:['233412','2334A0'],20:['233230','2332D0'],21:['233240'],22:['233411'],23:['2332C0']}
construction_all=sum(construction.values(),[])
for r in records:
 if r['employment'] or not r['nodeId'].startswith('us-construction-uva-'):continue
 line=int(r['nodeId'].split('-')[-1]);pool=index[('us-construction',r['year'])]['employment'];cw,ce=compensation(construction[line]);pw,pe=compensation(construction_all)
 allocate(r,pool,cw,pw,ce,pe,'us-io2017-construction-comp-share','2017年建筑薪酬结构',['2017年BEA工程活动薪酬份额延续到本年；假设各工程类型的年均每岗位薪酬相同，故以薪酬份额近似就业份额。','薪酬含雇员报酬，不含业主混合收入；工程活动可能跨NAICS雇主，估算是活动分配，不是逐个工人的唯一归属。','不使用增加值份额配人，避免人为令各子行业生产率相同。2017年至今技术、工程构成和相对薪酬变化未被直接观测。','本组8类薪酬覆盖完整建筑活动，就业分配在同年父项内相加守恒。'])
# Housing contains imputed owner services. Only tenant and other-real-estate employee compensation is allocated.
for r in records:
 if r['employment'] or r['nameEn'] not in ['Housing','Tenant-occupied housing','Other real estate']:continue
 if r['year']<2024:continue
 pool=index[('us-real-estate-bea-61',r['year'])]['employment'];codes=['531ORE'] if r['nameEn']=='Other real estate' else ['531HST'];cw,ce=compensation(codes);pw,pe=compensation(['531HST','531ORE'])
 allocate(r,pool,cw,pw,ce,pe,'us-io2017-real-estate-comp-share','2017年房地产薪酬结构',['以2017年出租住房和其他房地产雇员报酬份额分配本年房地产雇员岗位；假设两类每岗位薪酬相同且份额未变。','业主自住住房核算没有可直接对应的独立岗位；不将其虚拟租金当作房地产员工劳动产出。住房汇总的估算分母沿用出租住房活动岗位。','住房服务包含资本服务，分子有自有住房估算租金；所得比率不是劳动效率，不能与一般实体行业比率直接排名。','住房与其他房地产两项就业在同年房地产父项内守恒；自住住房不补零、不计算比率。'])
# 2025 covered government payroll is divided using 2024 CIVILIAN/enterprise employment shares.
# Military is explicitly excluded before allocating the federal QCEW pool.
for r in records:
 if r['employment'] or r['year']!=2025 or r['nodeId'] not in ['us-government-bea-91','us-government-bea-94','us-government-bea-96','us-government-bea-97']:continue
 federal=r['nodeId'] in ['us-government-bea-91','us-government-bea-94'];childline={'us-government-bea-91':89,'us-government-bea-94':91,'us-government-bea-96':93,'us-government-bea-97':96}[r['nodeId']]
 lines=[89,91] if federal else [93,96];child=nipa_emp(childline,2024);parts=[nipa_emp(x,2024) for x in lines];pool=index[(r['parentId'],2025)]['employment']
 allocate(r,pool,child['value'],sum(x['value'] for x in parts),child['evidence'],[e for x in parts for e in x['evidence']],'us-government2024-civilian-share','2024年政府文职就业结构',['以2024年BEA一般政府文职/政府企业雇员份额分配2025年同所有权QCEW文职岗位池；假设份额延续且覆盖调整在两类相同。','联邦分配使用NIPA 6.4D 第89行Civilian和第91行Government enterprises，排除第90行Military，绝不把军人分给文职QCEW池。','分子仍为全部政府核算增加值；联邦一般政府尤其含国防和军人服务，而分母仅文职岗位，因此只是覆盖不全代理比率。','本组一般政府与政府企业两子项合计等于同所有权QCEW父项；不得把下层不同调查时点或不同覆盖参考人数继续加总。'])
 r['gaps'].append('2025政府分母为QCEW覆盖文职岗位的估算分拆；军人未补，国防/非国防仍需文职明细来源。')
