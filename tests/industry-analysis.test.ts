import {readFileSync} from 'node:fs'
import {describe,it,expect} from 'vitest'
import {analysisAmount,analysisComparisons,analysisSections,analysisUnit,comparisonRows,signedScale,validateIndustryAnalysis,valueDistribution,type AnalysisComparison} from '../src/research/industry-analysis'
import type {IndustryAnalysis,Research} from '../src/research/schema'

const input=JSON.parse(readFileSync('research/industry-analysis/distribution/data.json','utf8'))
const macro=JSON.parse(readFileSync('research/macro/structures.json','utf8'))
const data:IndustryAnalysis={version:'test',checkedAt:'2026-09-14',sources:input.sources,distributions:[input.distribution],comparisons:[],findings:[],coverage:[]}
const research={macroStructures:macro,industryAnalysis:data} as Research

describe('industry analysis preserves statistical meaning',()=>{
  it('validates all 211 product components, signed values and rounding differences',()=>{
    const validated=validateIndustryAnalysis(data)
    expect(validated.distributions[0].rows).toHaveLength(211)
    for(const node of macro.structures[0].nodes){
      const result=valueDistribution(research,'cn','cn-io2023',node.id)!
      expect(result.total).toBe(node.value)
      expect(result.codes).toEqual(node.memberCodes)
    }
    const total=valueDistribution(research,'cn','cn-io2023','cn-orbit-cn-io2023')!
    expect(total.codes).toHaveLength(211)
    expect(total.total).toBe(13009651993)
  })
  it('retains the large negative tax and greater-than-100% labor share instead of normalizing it away',()=>{
    const result=valueDistribution(research,'cn','cn-io2023','cn-io-39130')!
    expect(result.components[0].share).toBeGreaterThan(350)
    expect(result.components[1].value).toBe(-3820957)
    const scale=signedScale(result.components.map(c=>c.value))
    expect(scale.zero).toBeGreaterThan(50)
    expect(scale.bar(result.components[1].value).left).toBe(0)
    expect(scale.bar(result.components[0].value).left).toBe(scale.zero)
    expect(result.roundingDifference).toBe(0)
  })
  it('never supplies product distributions to a different country, year, annual industry or missing member',()=>{
    expect(valueDistribution(research,'us','cn-io2023','cn-io-39130')).toBeNull()
    expect(valueDistribution(research,'cn','','cn-gbt2017-39')).toBeNull()
    const next=structuredClone(research);next.industryAnalysis!.distributions[0].year=2024
    expect(valueDistribution(next,'cn','cn-io2023','cn-io-39130')).toBeNull()
    next.industryAnalysis!.distributions[0].year=2023;next.industryAnalysis!.distributions[0].rows=next.industryAnalysis!.distributions[0].rows.filter(r=>r.code!=='39130')
    expect(valueDistribution(next,'cn','cn-io2023','cn-io-group-39')).toBeNull()
  })
  it('fails corrupted totals and source country mismatches',()=>{
    const bad=structuredClone(data);bad.distributions[0].rows[0].values[0]+=3
    expect(()=>validateIndustryAnalysis(bad)).toThrow('不衔接')
    const leak=structuredClone(data);leak.sources[0].country='us'
    expect(()=>validateIndustryAnalysis(leak)).toThrow('串国')
  })
})

describe('regional and company comparisons',()=>{
  const sourceId=input.sources[0].id
  const table:AnalysisComparison={id:'cn-company-revenue',country:'cn',section:'companies',nodeIds:['cn-io-group-39','cn-io-39130'],title:'营业收入',metric:'revenue',period:'2025',unit:'元',currency:'CNY',coverage:'独立财报样本',comparisonKey:'consolidated-revenue-2025',coverageLabel:'测试样本',notes:[],rows:[
    {id:'a',name:'A',nodeIds:['cn-io-group-39'],value:60000000,evidence:[{sourceId,locator:'A行'}],releaseDate:null,revision:'原值',notes:[],missingReason:null},
    {id:'b',name:'B',nodeIds:['cn-io-group-39','cn-io-39130'],value:10,unit:'百万美元',currency:'USD',evidence:[{sourceId,locator:'B行'}],releaseDate:null,revision:'原值',notes:[],missingReason:null},
    {id:'c',name:'C',nodeIds:['cn-io-group-39'],value:null,evidence:[{sourceId,locator:'未披露'}],releaseDate:null,revision:'未披露',notes:[],missingReason:'年报未提供对应口径'},
  ]}
  it('sorts common-currency amounts, preserves nulls and filters product associations',()=>{
    expect(comparisonRows(table,'cn-io-group-39').map(r=>r.id)).toEqual(['b','a','c'])
    expect(comparisonRows(table,'cn-io-group-39','value',{mode:'cny-100m',usdCny:5}).map(r=>r.id)).toEqual(['a','b','c'])
    expect(comparisonRows(table,'cn-io-39130').map(r=>r.id)).toEqual(['b'])
  })
  it('allows an original USD company report without classifying the issuer as US',()=>{
    const sample={...data,comparisons:[table]}
    expect(validateIndustryAnalysis(sample).comparisons[0].country).toBe('cn')
    expect(analysisComparisons(sample,'us','cn-io-group-39','companies')).toEqual([])
    expect(analysisSections(sample,'cn','cn-io-group-39')).toEqual(['structure','companies'])
    expect(analysisSections(sample,'cn','cn-io-39126')).toEqual(['structure'])
  })
  it('converts per-person revenue in currency per person, not aggregate display units',()=>{
    expect(analysisAmount(67100,{unit:'元/人',currency:'CNY'},{mode:'usd-million',usdCny:6.71})).toBeCloseTo(10000)
    expect(analysisUnit({unit:'元/人',currency:'CNY'},{mode:'usd-million',usdCny:6.71})).toBe('美元/人')
    expect(analysisAmount(12,{unit:'万人',currency:null},{mode:'usd-million',usdCny:6.71})).toBe(12)
    expect(analysisAmount(null,{unit:'元',currency:'CNY'},{mode:'usd-million',usdCny:6.71})).toBeNull()
    expect(analysisAmount(6.71,{unit:'万元人民币/人',currency:'CNY'},{mode:'usd-million',usdCny:6.71})).toBeCloseTo(10000)
    expect(analysisAmount(67100,{unit:'元/年末员工',currency:'CNY'},{mode:'usd-million',usdCny:6.71})).toBeCloseTo(10000)
    expect(analysisUnit({unit:'元/年末员工',currency:'CNY'},{mode:'usd-million',usdCny:6.71})).toBe('美元/年末员工')
  })
  it('requires a missing-value explanation and valid evidence for accepted coverage',()=>{
    const bad=structuredClone(table);bad.rows[2].missingReason=null
    expect(()=>validateIndustryAnalysis({...data,comparisons:[bad]})).toThrow('缺值未说明')
    expect(()=>validateIndustryAnalysis({...data,coverage:[{id:'cn-read',country:'cn',group:'地方',title:'已读',period:'2023',status:'obtained',detail:'已取得',evidence:[],nextStep:'复核'}]})).toThrow('无证据')
  })
})
