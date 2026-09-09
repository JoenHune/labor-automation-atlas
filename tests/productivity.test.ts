import {describe,expect,it} from 'vitest'
import {employmentInBaseUnits,latestComparableProductivityYear,productivityDisplay,productivityEvidence,productivityExport,productivityShareUrl,productivityView,validateProductivityDataset,type ProductivityDataset,type ProductivityRow} from '../src/research/productivity'
import type {Research} from '../src/research/schema'

const source=(country:'cn'|'us'):Research['sources'][number]=>({id:country+'-stats',country,title:country+' official source',publisher:'Official statistics',url:'https://example.org/'+country,published:'2026-01-01',retrieved:'2026-09-09',kind:'official-statistics',limitations:[]})
const row=(id:string,value:number|null,employment:number|null,year=2025,country:'cn'|'us'='cn'):ProductivityRow=>({id,country,parentIndustryId:country+'-manufacturing',name:id,year,valueAdded:{value,unit:country==='cn'?'亿元':'百万美元',currency:country==='cn'?'CNY':'USD',year,measure:'value-added',priceBasis:'current',coverage:'同国同细分全部生产活动',coverageKey:country+'-'+id,releaseDate:'2026-01-01',revision:'本次修订值',evidence:[{sourceId:country+'-stats',locator:'增加值表：'+id}]},employment:{value:employment,unit:country==='cn'?'万人':'thousands of jobs',year,definition:country==='cn'?'全部从业人员':'全职及兼职就业岗位；一人可有多个岗位',coverage:'同国同细分全部就业',coverageKey:country+'-'+id,denominatorKind:country==='cn'?'persons':'jobs',periodBasis:'annual-average',releaseDate:'2026-01-01',revision:'本次修订值',evidence:[{sourceId:country+'-stats',locator:'就业表：'+id}]},comparable:true,comparabilityReasons:['同年与统计覆盖已核'],gaps:[]})
const dataset=():ProductivityDataset=>({version:'synthetic-01',checkedAt:'2026-09-09',sources:[source('cn'),source('us')],parents:[{country:'cn',parentIndustryId:'cn-manufacturing',name:'制造业',classification:'非重叠细分',coverage:'中国全部从业口径',gaps:['局部现场验证待补'],nonOverlapping:true,rows:[row('cn-a',2,1),row('cn-b',4,1),row('cn-missing',1,null),row('cn-a',1,2,2023),row('cn-future',9,1,2026)]},{country:'us',parentIndustryId:'us-manufacturing',name:'制造业',classification:'非重叠细分',coverage:'美国岗位口径',gaps:[],nonOverlapping:true,rows:[row('us-a',10,1,2025,'us')]}]})
const target=(data:ProductivityDataset)=>data.parents[0].rows[0]
const find=(data:ProductivityDataset,id='cn-a')=>productivityView(data,'cn','cn-manufacturing',2025).rows.find(r=>r.row.id===id)!

describe('subindustry value added per person/job without invented rankings',()=>{
  it('normalizes native money and employment before ranking, preserving input and excluding other years/countries',()=>{
    const data=dataset(),original=JSON.stringify(data),view=productivityView(data,'cn','cn-manufacturing',2025)
    expect(view.groups).toHaveLength(1)
    expect(view.groups[0].rows.map(r=>[r.row.id,r.rank,r.productivityBase])).toEqual([['cn-b',1,40000],['cn-a',2,20000]])
    expect(view.unranked.map(r=>[r.row.id,r.rank])).toEqual([['cn-missing',null]])
    expect(view.rows.map(r=>r.row.id)).not.toContain('us-a');expect(view.rows.map(r=>r.row.id)).not.toContain('cn-future')
    expect(find(data).employmentCount).toBe(10000);expect(find(data).valueAddedBase).toBe(200000000)
    expect(JSON.stringify(data)).toBe(original)
  })

  it('uses the requested year or the latest earlier year, never a later default',()=>{
    const data=dataset()
    const older=productivityView(data,'cn','cn-manufacturing',2024)
    expect(older.year).toBe(2023);expect(older.historical).toBe(true);expect(older.notice).toContain('2023 年');expect(older.notice).toContain('主视图为 2024')
    const none=productivityView(data,'cn','cn-manufacturing',2022)
    expect(none.year).toBeNull();expect(none.rows).toEqual([]);expect(none.notice).toContain('未自动采用更晚年份')
    const explicit=productivityView(data,'cn','cn-manufacturing',2024,'productivity',2026)
    expect(explicit.year).toBe(2026);expect(explicit.notice).toContain('已明确选择 2026')
    expect(productivityView(data,'cn','cn-manufacturing',2025,'productivity',2021).year).toBeNull()
    expect(older.availableYears).toEqual([2026,2025,2023])
  })

  it('suggests only the latest comparable year at or before the main year without changing the default view',()=>{
    const data=dataset()
    for(const r of data.parents[0].rows.filter(r=>r.year===2025))r.employment.value=null
    expect(latestComparableProductivityYear(data,'cn','cn-manufacturing',2025)).toBe(2023)
    expect(productivityView(data,'cn','cn-manufacturing',2025).year).toBe(2025)
    expect(latestComparableProductivityYear(data,'cn','cn-manufacturing',2022)).toBeNull()
    expect(latestComparableProductivityYear(data,'cn','cn-not-yet-covered',2025)).toBeNull()
    data.parents[0].rows.find(r=>r.year===2023)!.comparable=false
    expect(latestComparableProductivityYear(data,'cn','cn-manufacturing',2025)).toBeNull()
  })

  it('shows a missing-parent gap but rejects selecting a known foreign parent',()=>{
    const data=dataset(),view=productivityView(data,'cn','cn-not-yet-covered',2025)
    expect(view.parent).toBeNull();expect(view.notice).toContain('尚未纳入');expect(view.groups).toEqual([])
    expect(()=>productivityView(data,'cn','us-manufacturing',2025)).toThrow('另一国家')
  })

  it.each(['not-comparable','missing-va','missing-employment','zero-employment','negative-employment','different-year','different-va-year','coverage-mismatch','empty-coverage','unknown-denominator','unknown-time','unknown-unit','unknown-money-unit','wrong-unit-kind','missing-va-evidence','missing-employment-evidence','not-current','not-value-added','nonfinite','overflow','missing-definition'] as const)('does not calculate a ratio for %s',mode=>{
    const data=dataset(),r=target(data)
    if(mode==='not-comparable'){r.comparable=false;r.comparabilityReasons=['仅企业法人，未覆盖全部行业就业']}
    if(mode==='missing-va')r.valueAdded.value=null
    if(mode==='missing-employment')r.employment.value=null
    if(mode==='zero-employment')r.employment.value=0
    if(mode==='negative-employment')r.employment.value=-1
    if(mode==='different-year')r.employment.year=2024
    if(mode==='different-va-year')r.valueAdded.year=2024
    if(mode==='coverage-mismatch')r.employment.coverageKey='corporations-only'
    if(mode==='empty-coverage')r.employment.coverageKey=''
    if(mode==='unknown-denominator')r.employment.denominatorKind='unknown'
    if(mode==='unknown-time')r.employment.periodBasis='unknown'
    if(mode==='unknown-unit')r.employment.unit='工作小时'
    if(mode==='unknown-money-unit')r.valueAdded.unit='not-money'
    if(mode==='wrong-unit-kind')r.employment.unit='thousands of jobs'
    if(mode==='missing-va-evidence')r.valueAdded.evidence=[]
    if(mode==='missing-employment-evidence')r.employment.evidence=[]
    if(mode==='not-current')r.valueAdded.priceBasis='constant'
    if(mode==='not-value-added')r.valueAdded.measure='revenue' as 'value-added'
    if(mode==='nonfinite')r.employment.value=Infinity
    if(mode==='overflow')r.valueAdded.value=Number.MAX_VALUE
    if(mode==='missing-definition')r.employment.definition=''
    const result=find(data)
    expect(result.productivityBase).toBeNull();expect(result.rank).toBeNull();expect(result.productivityGaps.length).toBeGreaterThan(0)
    expect(productivityView(data,'cn','cn-manufacturing',2025).unranked).toContainEqual(result)
  })

  it('still sorts by value added when every denominator is missing or incompatible',()=>{
    const data=dataset()
    for(const r of data.parents[0].rows){r.comparable=false;r.employment.value=null;r.comparabilityReasons=['尚未取得同范围就业']}
    expect(productivityView(data,'cn','cn-manufacturing',2025).groups).toEqual([])
    const value=productivityView(data,'cn','cn-manufacturing',2025,'value')
    expect(value.groups[0].rows.map(r=>r.row.id)).toEqual(['cn-b','cn-a','cn-missing'])
    expect(value.groups[0].rows.every(r=>r.productivityBase===null)).toBe(true)
    expect(value.unranked).toEqual([])
  })

  it('preserves official zero/negative numerators in both sorts when the verified denominator is strictly positive',()=>{
    const data=dataset();target(data).valueAdded.value=-1;data.parents[0].rows[1].valueAdded.value=0
    const value=productivityView(data,'cn','cn-manufacturing',2025,'value')
    expect(value.groups[0].rows.map(r=>[r.row.id,r.valueAddedBase])).toEqual([['cn-missing',100000000],['cn-b',0],['cn-a',-100000000]])
    expect(find(data).productivityBase).toBe(-10000)
    const ratio=productivityView(data,'cn','cn-manufacturing',2025)
    expect(ratio.groups[0].rows.map(r=>[r.row.id,r.productivityBase,r.rank])).toEqual([['cn-b',0,1],['cn-a',-10000,2]])
  })

  it('separates persons, jobs and employees, and year-end versus annual-average denominators',()=>{
    const data=dataset(),jobs=row('cn-jobs',2,5),employees=row('cn-employees',3,1),yearEnd=row('cn-yearend',2,1)
    jobs.employment.denominatorKind='jobs';jobs.employment.unit='万个岗位'
    employees.employment.denominatorKind='employees';employees.employment.unit='万人'
    yearEnd.employment.periodBasis='year-end'
    data.parents[0].rows.push(jobs,employees,yearEnd)
    const view=productivityView(data,'cn','cn-manufacturing',2025)
    expect(view.groups).toHaveLength(4)
    const j=view.groups.find(g=>g.id==='jobs-annual-average')!
    expect(j.label).toContain('每就业岗位');expect(j.rows[0].productivityBase).toBe(4000);expect(j.rows[0].rank).toBe(1)
    const e=view.groups.find(g=>g.id==='employees-annual-average')!
    expect(e.label).toContain('仅雇员');expect(e.rows[0].productivityBase).toBe(30000)
    expect(view.groups.find(g=>g.id==='persons-year-end')!.label).toContain('年末')
  })

  it('assigns equal metrics equal ranks and uses stable IDs to resolve display order',()=>{
    const data=dataset();target(data).valueAdded.value=4;data.parents[0].rows.push(row('cn-z',1,1))
    const first=productivityView(data,'cn','cn-manufacturing',2025).groups[0].rows.map(r=>[r.row.id,r.rank])
    data.parents[0].rows.reverse()
    const second=productivityView(data,'cn','cn-manufacturing',2025).groups[0].rows.map(r=>[r.row.id,r.rank])
    expect(first).toEqual([['cn-a',1],['cn-b',1],['cn-z',3]]);expect(second).toEqual(first)
  })

  it('retains overlapping classifications without numbered ranking in either mode',()=>{
    const data=dataset();data.parents[0].nonOverlapping=false
    for(const sort of ['value','productivity'] as const){
      const view=productivityView(data,'cn','cn-manufacturing',2025,sort)
      expect(view.groups).toEqual([]);expect(view.unranked).toHaveLength(3)
      expect(view.unranked.every(r=>r.rank===null && r.valueGaps.some(g=>g.includes('互斥')))).toBe(true)
    }
  })

  it('requires finite inputs and an expression for a calculated numerator, preserving its method and provenance',()=>{
    const data=dataset(),r=target(data);r.valueAdded.evidenceKind='calculation';r.valueAdded.value=5760
    expect(find(data).valueGaps.join('；')).toContain('表达式或有限输入值缺失')
    r.valueAdded.computation={expression:'99107 - 93347',inputs:[99107,93347],note:'以同一期农业总量扣第一产业；范围经独立核验'}
    expect(find(data).valueGaps).toEqual([])
    const exported=productivityExport(data,productivityView(data,'cn','cn-manufacturing',2025,'value'),{mode:'cny-100m',usdCny:6.71})
    expect(exported.rows.find(x=>x.original.id===r.id)!.original.valueAdded.computation).toEqual(r.valueAdded.computation)
    r.valueAdded.computation.inputs=[NaN];expect(find(data).valueGaps.join('；')).toContain('有限输入值缺失')
  })

  it('accepts verified disjoint denominator sums including floating-point rounding and exports their input lines',()=>{
    const data=dataset(),r=target(data);r.employment.value=.3
    r.employment.calculation={kind:'sum-of-official-disjoint-rows',inputs:[.1,.2],lineCodes:[10,20],expression:'line 10 + line 20'}
    const result=find(data)
    expect(result.productivityGaps).toEqual([]);expect(result.productivityBase).toBeCloseTo(200000000/3000)
    const exported=productivityExport(data,productivityView(data,'cn','cn-manufacturing',2025),{mode:'cny-100m',usdCny:6.71})
    expect(exported.rows.find(x=>x.original.id===r.id)!.original.employment.calculation).toEqual(r.employment.calculation)
    r.employment.value=1;r.employment.calculation={kind:'direct-fact',inputs:[1],lineCodes:[10],expression:'line 10'}
    expect(find(data).productivityGaps).toEqual([])
  })

  it.each(['wrong-sum','duplicate-lines','nonfinite-input','negative-input','missing-input','missing-expression','unequal-counts','invalid-line','direct-multiple'] as const)('refuses a %s employment calculation while retaining the value-added sort',mode=>{
    const data=dataset(),r=target(data);r.employment.calculation={kind:'sum-of-official-disjoint-rows',inputs:[.4,.6],lineCodes:[10,20],expression:'line 10 + line 20'}
    const c=r.employment.calculation
    if(mode==='wrong-sum')c.inputs=[.3,.6]
    if(mode==='duplicate-lines')c.lineCodes=[10,10]
    if(mode==='nonfinite-input')c.inputs=[Infinity,.6]
    if(mode==='negative-input')c.inputs=[-.4,1.4]
    if(mode==='missing-input')c.inputs=[]
    if(mode==='missing-expression')c.expression=''
    if(mode==='unequal-counts')c.lineCodes=[10]
    if(mode==='invalid-line')c.lineCodes=[10,NaN]
    if(mode==='direct-multiple')c.kind='direct-fact'
    const result=find(data)
    expect(result.productivityBase).toBeNull();expect(result.rank).toBeNull();expect(result.productivityGaps.join('；')).toContain('分母')
    expect(productivityView(data,'cn','cn-manufacturing',2025,'value').groups[0].rows.some(x=>x.row.id===r.id)).toBe(true)
  })

  it.each(['foreign-row','wrong-parent','foreign-source','missing-source','missing-locator','duplicate-row','duplicate-source','duplicate-parent','currency','javascript-source'] as const)('rejects %s rather than silently mixing a ranking',mode=>{
    const data=dataset(),r=target(data)
    if(mode==='foreign-row')r.country='us'
    if(mode==='wrong-parent')r.parentIndustryId='cn-other'
    if(mode==='foreign-source')r.valueAdded.evidence[0].sourceId='us-stats'
    if(mode==='missing-source')r.valueAdded.evidence[0].sourceId='missing'
    if(mode==='missing-locator')r.valueAdded.evidence[0].locator=''
    if(mode==='duplicate-row')data.parents[0].rows.push(structuredClone(r))
    if(mode==='duplicate-source')data.sources.push(structuredClone(data.sources[0]))
    if(mode==='duplicate-parent')data.parents.push(structuredClone(data.parents[0]))
    if(mode==='currency')r.valueAdded.currency='USD'
    if(mode==='javascript-source')data.sources[0].url='javascript:alert(1)'
    expect(()=>validateProductivityDataset(data)).toThrow('细分比较：')
    expect(()=>productivityView(data,'cn','cn-manufacturing',2025)).toThrow('细分比较：')
  })

  it('keeps native ranking stable under display currencies and converts per-person amounts without aggregate scaling',()=>{
    const data=dataset(),view=productivityView(data,'cn','cn-manufacturing',2025),r=view.groups[0].rows[0]
    expect(productivityDisplay(r,{mode:'cny-100m',usdCny:8})).toEqual({valueAdded:4,valueAddedUnit:'亿元人民币',productivity:40000,productivityUnit:'元/从业人员'})
    expect(productivityDisplay(r,{mode:'usd-million',usdCny:8})).toEqual({valueAdded:50,valueAddedUnit:'百万美元',productivity:5000,productivityUnit:'美元/从业人员'})
    expect(productivityView(data,'cn','cn-manufacturing',2025).groups[0].rows.map(r=>r.row.id)).toEqual(['cn-b','cn-a'])
    const us=productivityView(data,'us','us-manufacturing',2025).groups[0].rows[0]
    expect(us.productivityBase).toBe(10000)
    expect(productivityDisplay(us,{mode:'cny-100m',usdCny:8}).productivity).toBe(80000)
    expect(productivityDisplay(us,{mode:'usd-million',usdCny:8}).productivityUnit).toBe('美元/就业岗位')
  })

  it('exports the current visible order, native operands, display conversion, FX assumption and directly used sources',()=>{
    const data=dataset(),view=productivityView(data,'cn','cn-manufacturing',2025),exported=productivityExport(data,view,{mode:'usd-million',usdCny:8})
    expect(exported.rows.map(r=>r.original.id)).toEqual(view.rows.map(r=>r.row.id))
    expect(exported.sources.map(s=>s.id)).toEqual(['cn-stats'])
    expect(exported.rows[0].computed).toMatchObject({valueAddedInOriginalCurrencyBaseUnits:400000000,employmentBaseCount:10000,productivityInOriginalCurrencyBaseUnits:40000})
    expect(exported.rows[0].display).toMatchObject({valueAdded:50,productivity:5000})
    expect(exported.exchangeRate.disclosure).toContain('可编辑假设，非实时汇率')
    expect(exported.exchangeRate.assumedUsdCny).toBe(8)
    expect(exported.rows.at(-1)!.rank).toBeNull();expect(exported.rows.at(-1)!.computed.productivityGaps.length).toBeGreaterThan(0)
    expect(exported.sources[0].url).toBe(data.sources[0].url)
  })

  it('shares the parent/year/sort and FX while preserving unrelated state and rejecting a foreign page',()=>{
    const view=productivityView(dataset(),'cn','cn-manufacturing',2024,'value'),settings={mode:'usd-million',usdCny:7} as const
    const url=new URL(productivityShareUrl('https://example.org/labor-automation-atlas/cn/?year=2024&filter.task=清洁#old',view,settings))
    expect(url.searchParams.get('filter.subindustry')).toBe('cn-manufacturing');expect(url.searchParams.get('filter.subyear')).toBe('2023');expect(url.searchParams.get('filter.subsort')).toBe('value')
    expect(url.searchParams.get('filter.task')).toBe('清洁');expect(url.searchParams.get('year')).toBe('2024')
    expect(url.searchParams.get('filter.currency')).toBe('usd-million');expect(url.searchParams.get('filter.fx')).toBe('7')
    expect(url.hash).toBe('#subindustry-cn-manufacturing')
    expect(()=>productivityShareUrl('https://example.org/us/',view,settings)).toThrow('国家')
    const noYear={...view,year:null};expect(new URL(productivityShareUrl(url.href,noYear,settings)).searchParams.has('filter.subyear')).toBe(false)
  })

  it('rejects invalid FX even when the selected row has no computed amounts',()=>{
    const data=dataset();target(data).valueAdded.value=null;const r=find(data),settings={mode:'cny-100m',usdCny:0} as const
    expect(()=>productivityDisplay(r,settings)).toThrow('汇率')
    expect(()=>productivityShareUrl('https://example.org/cn/',productivityView(data,'cn','cn-manufacturing',2025),settings)).toThrow('汇率')
  })

  it('does not label an unverified denominator as a person or job',()=>{
    const data=dataset();target(data).employment.denominatorKind='unknown';const r=find(data)
    expect(productivityDisplay(r,{mode:'usd-million',usdCny:6.71}).productivityUnit).toBe('美元/就业单位（口径待核）')
    expect(productivityDisplay(r,{mode:'cny-100m',usdCny:6.71}).productivityUnit).toBe('元/就业单位（口径待核）')
    expect(r.productivityBase).toBeNull()
  })

  it('deduplicates only identical source/locator pairs and understands explicit person/job scales',()=>{
    const r=row('cn-test',1,1);r.employment.evidence.push(structuredClone(r.valueAdded.evidence[0]))
    expect(productivityEvidence(r)).toHaveLength(2)
    expect(employmentInBaseUnits(2,'万人')).toBe(20000)
    expect(employmentInBaseUnits(2,'thousands of jobs')).toBe(2000)
    expect(employmentInBaseUnits(2,'thousand employees')).toBe(2000)
    expect(employmentInBaseUnits(null,'人')).toBeNull();expect(employmentInBaseUnits(1,'work hours')).toBeNull()
  })
})
