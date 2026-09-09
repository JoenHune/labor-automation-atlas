import {describe,it,expect} from 'vitest'
import {preserveRecordOrder} from '../src/research/record-order'
describe('批量重建保留既有记录顺序',()=>{
 it('替换旧批次时保留原位置，同时采用新值与新记录',()=>{
  const rebuilt=[{id:'outside',value:8},{id:'new-b',value:2},{id:'old-a',value:10},{id:'new-a',value:3},{id:'old-b',value:20}]
  expect(preserveRecordOrder(rebuilt,['old-a','outside','old-b'])).toEqual([rebuilt[2],rebuilt[0],rebuilt[4],rebuilt[1],rebuilt[3]])
  expect(rebuilt.map(r=>r.id)).toEqual(['outside','new-b','old-a','new-a','old-b'])
 })
 it('删除旧记录后不会复活；已有空值和对象保持',()=>{
  const record={id:'retained',value:null}
  const result=preserveRecordOrder([record],['removed','retained'])
  expect(result).toEqual([record]);expect(result[0]).toBe(record)
 })
 it('第一次导入按来源顺序追加',()=>{
  expect(preserveRecordOrder([{id:'b'},{id:'a'}],[])).toEqual([{id:'b'},{id:'a'}])
 })
 it.each([[[{id:'a'},{id:'a'}],['a']],[[{id:'a'}],['a','a']]] as const)('拒绝重复编号，避免静默丢记录', (records,ids)=>{
  expect(()=>preserveRecordOrder([...records],ids)).toThrow(/重复/)
 })
})
