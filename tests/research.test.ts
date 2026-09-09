import { describe,it,expect } from 'vitest'
import { annualRanking } from '../src/research/ranking'
import { incrementalCashFlow, type CashFlowInput } from '../src/research/cashflow'
import { validateResearch } from '../src/research/validate'
import type { Industry, Observation, Research } from '../src/research/schema'

function industry(id:string,patch:Partial<Industry>={}):Industry {
  return {id,country:'cn',code:id,name:id,classification:'test',sectors:['secondary'],parentId:null,rankingUniverse:true,unallocated:false,selected:true,selectionReason:'top10',coverage:'test',evidence:[{sourceId:'s',locator:'table row'}],...patch}
}
function observation(id:string,value:number,patch:Partial<Observation>={}):Observation {
  return {id:'o-'+id,country:'cn',industryId:id,period:'2025',frequency:'annual',measure:'value-added',priceBasis:'current',value,unit:'亿元',currency:'CNY',annualized:false,seasonalAdjustment:'not-applicable',releaseDate:'2026-01-20',revision:'初步',coverage:'test',evidence:[{sourceId:'s',locator:'table row'}],evidenceKind:'fact',...patch}
}
describe('官方榜单比较规则',()=>{
  it('父子行业不能同榜',()=>expect(()=>annualRanking('cn',2025,[industry('industrial'),industry('manufacturing',{parentId:'industrial'})],[])).toThrow('父子'))
  it('季度年化、实际增长与其他国家值不进入年度榜',()=>{
    const rows=annualRanking('cn',2025,[industry('a'),industry('b')],[
      observation('a',2),
      observation('b',900,{frequency:'quarter',period:'2025Q4',annualized:true}),
      observation('b',999,{country:'us',currency:'USD'}),
      observation('b',50,{measure:'real-growth',priceBasis:'constant'}),
    ])
    expect(rows.top10.map(x=>x.industry.id)).toEqual(['a'])
    expect(rows.excludedMissing.map(x=>x.industry.id)).toEqual(['b'])
  })
  it('保留其他汇总并在榜外补第一产业',()=>{
    const industries=Array.from({length:11},(_,i)=>industry('i'+i,{sectors:i===10?['primary']:['tertiary']}))
    industries.push(industry('other',{unallocated:true,rankingUniverse:false}))
    const rows=annualRanking('cn',2025,industries,industries.map((x,i)=>observation(x.id,100-i)))
    expect(rows.top10).toHaveLength(10)
    expect(rows.supplements.map(x=>x.industry.id)).toEqual(['i10'])
    expect(rows.top10.some(x=>x.industry.id==='other')).toBe(false)
  })
  it('禁止单位混用和模糊修订版本',()=>{
    expect(()=>annualRanking('cn',2025,[industry('a'),industry('b')],[observation('a',10),observation('b',20,{unit:'万元'})])).toThrow('单位')
    expect(()=>annualRanking('cn',2025,[industry('a')],[observation('a',10),observation('a',11,{revision:'revised'})])).toThrow('修订')
  })
})
function cashInput():CashFlowInput {
  return {country:'cn',currency:'CNY',initial:{equipment:100,tooling:0,integration:20,safety:5,facility:0,training:0,commissioningDowntime:0,workingCapital:0},discountRate:0,
    periods:[{year:1,realizableLaborSaving:80,demandBackedMargin:0,provenScrapSaving:0,residualLabor:10,maintenance:5,software:0,energyDelta:0,exceptionAndDowntime:5,otherIncrementalCost:0},
      {year:2,realizableLaborSaving:80,demandBackedMargin:0,provenScrapSaving:0,residualLabor:10,maintenance:5,software:0,energyDelta:0,exceptionAndDowntime:5,otherIncrementalCost:0}]}
}
describe('增量现金流不捏造回收期',()=>{
  it('任何关键缺口都阻止回收期',()=>{
    const input=cashInput();input.periods[0].maintenance=null
    expect(incrementalCashFlow(input)).toMatchObject({status:'insufficient',npv:null,paybackYear:null,missing:['year1.maintenance']})
  })
  it('包含初期集成安全及残留人工/停机成本，不靠理论产能收益',()=>{
    const result=incrementalCashFlow(cashInput())
    expect(result.npv).toBe(-5)
    expect(result.paybackYear).toBeNull()
    expect(result.flows.map(x=>x.net)).toEqual([60,60])
  })
  it('货币不能跨国、重复现金流年份拒绝',()=>{
    const input=cashInput(); input.currency='USD'
    expect(()=>incrementalCashFlow(input)).toThrow('货币')
    input.currency='CNY';input.periods[1].year=1
    expect(()=>incrementalCashFlow(input)).toThrow('年份')
  })
})
describe('结论和来源关联',()=>{
  const empty:Research={version:'test',checkedAt:'2026-09-09',publishedAt:null,freezeStatus:'working',countries:[],sources:[],industries:[],observations:[],scenarios:[],tasks:[],claims:[],searches:[]}
  it('缺来源的实质结论拒绝',()=>expect(()=>validateResearch({...empty,claims:[{id:'c',country:'cn',kind:'fact',text:'无来源主张',conditions:[],evidence:[],basedOn:[],status:'draft',deployment:'unknown'}]})).toThrow())
  it('不能通过循环引用伪造依据',()=>{
    const base={country:'cn',kind:'judgment',text:'test',conditions:['test'],evidence:[],status:'draft',deployment:'unknown'}
    expect(()=>validateResearch({...empty,claims:[{...base,id:'a',basedOn:['b']},{...base,id:'b',basedOn:['a']}]})).toThrow('循环引用')
  })
  it('冻结研究要求所有场景复核',()=>expect(()=>validateResearch({...empty,freezeStatus:'frozen',scenarios:[{id:'a',country:'cn',industryId:'b',title:'test',scope:'test',subsectors:[],workflowSources:[],occupationSources:[],coverage:[],status:'proposed',exclusions:[]}]})).toThrow())
})
