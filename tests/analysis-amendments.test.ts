import {describe,it,expect} from 'vitest'
import {applyAnalysisAmendments,type AnalysisAmendment} from '../src/research/analysis-amendments'
import type {IndustryAnalysis} from '../src/research/schema'

const pending={id:'cn-local-table',country:'cn' as const,group:'地方年鉴',title:'内表',period:'2024',status:'pending' as const,detail:'仅定位',evidence:[],nextStep:'读取原表'}
const base={version:'old',checkedAt:'2026-09-14',sources:[],distributions:[],comparisons:[],findings:[],coverage:[pending]} satisfies IndustryAnalysis
const amendment:AnalysisAmendment={collection:'coverage',id:pending.id,reason:'已进入内表核对',replacement:{...pending,status:'obtained',detail:'已读C39行；其余行业未读'}}
describe('reading corrections preserve research history',()=>{
  it('updates the current record without mutating the historical input',()=>{
    const result=applyAnalysisAmendments(base,[amendment])
    expect(result.coverage[0].status).toBe('obtained')
    expect(result.coverage).toHaveLength(1)
    expect(base.coverage[0].status).toBe('pending')
  })
  it('rejects overlapping corrections and stale or cross-country targets',()=>{
    expect(()=>applyAnalysisAmendments(base,[amendment,amendment])).toThrow('重复修订')
    expect(()=>applyAnalysisAmendments(base,[{...amendment,id:'missing'}])).toThrow('目标不存在')
    expect(()=>applyAnalysisAmendments(base,[{...amendment,replacement:{...amendment.replacement,country:'us'}}])).toThrow('国家')
    expect(()=>applyAnalysisAmendments(base,[{...amendment,replacement:{...amendment.replacement,id:'cn-new'}}])).toThrow('稳定编号')
  })
})
