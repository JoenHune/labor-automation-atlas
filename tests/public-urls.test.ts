import {describe,it,expect} from 'vitest'
import {assertPublicUrls,publicResourceUrl} from '../src/research/public-urls'
describe('公开研究链接',()=>{
 it('保留普通资源查询，清除签名下载的全部临时参数',()=>{
  expect(publicResourceUrl('https://example.com/report?id=831')).toEqual({url:'https://example.com/report?id=831',removed:false})
  expect(publicResourceUrl('https://example.com/report.pdf?X-Amz-Credential=sample&X-Amz-Signature=sample&Expires=123')).toEqual({url:'https://example.com/report.pdf',removed:true})
  expect(publicResourceUrl('https://example.com/report#access_token=sample')).toEqual({url:'https://example.com/report',removed:true})
  expect(publicResourceUrl('https://sample:sample@example.com/report')).toEqual({url:'https://example.com/report',removed:true})
 })
 it('在嵌套审计和正文链接中拒绝授权参数，错误消息不泄露值',()=>{
  const marker='must-never-appear-in-error'
  try{assertPublicUrls({requests:[{url:'https://example.com/file?Signature='+marker}]});throw new Error('expected rejection')}
  catch(e){expect(String(e)).toContain('root.requests[0].url');expect(String(e)).not.toContain(marker)}
  expect(()=>assertPublicUrls('[资料](https://example.com/file?AWSAccessKeyId=sample)')).toThrow('临时授权')
  expect(()=>assertPublicUrls({url:'https://example.com/file?id=831'})).not.toThrow()
 })
})
