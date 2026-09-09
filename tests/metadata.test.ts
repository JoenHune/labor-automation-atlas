import {it,expect} from 'vitest'
import {embedMarker,readMarker,stripMarkers,annotationTitle} from '../worker/metadata'
it('回复父链在GitHub标记中恢复且禁止篡改',async()=>{
 const marker={kind:'reply' as const,authorId:10,annotationId:'b461522f-9b34-4b6e-bb6f-7a1bbdc68c7d',parentCommentId:123,operationKey:'ee36bfaf-7917-4748-b7c5-0a62e8222397'}
 const body=await embedMarker('回复该参数',marker,'test-secret')
 expect(await readMarker(body,'test-secret')).toEqual(marker)
 expect(await readMarker(body,'wrong-secret')).toBeNull()
 expect(stripMarkers(body)).toBe('回复该参数')
})
it('GitHub普通评论没有父元数据，重复或注入标记拒绝',async()=>{
 expect(await readMarker('直接在GitHub发表的普通评论','secret')).toBeNull()
 const marker={kind:'reply' as const,authorId:10,annotationId:'b461522f-9b34-4b6e-bb6f-7a1bbdc68c7d',parentCommentId:null,operationKey:'ee36bfaf-7917-4748-b7c5-0a62e8222397'}
 const body=await embedMarker('第一条',marker,'secret')
 expect(await readMarker(body+body,'secret')).toBeNull()
 await expect(embedMarker('<!-- atlas:fake -->',marker,'secret')).rejects.toThrow('保留')
})
it('标题从首评生成并保留国家',()=>expect(annotationTitle('这个数字的基期需要确认','cn')).toBe('[中国批注] 这个数字的基期需要确认'))

