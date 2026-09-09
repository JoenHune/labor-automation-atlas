import { z } from 'zod'
const stableId=z.string().min(1).max(180).regex(/^[a-z0-9][a-z0-9._:-]*$/)
export const Scope=z.enum(['cn','us','shared'])
export const RectSchema=z.object({x:z.number().finite(),y:z.number().finite(),width:z.number().positive(),height:z.number().positive()})
export const RelativeRectSchema=z.object({x:z.number().min(0).max(1),y:z.number().min(0).max(1),width:z.number().positive().max(1),height:z.number().positive().max(1)})
 .refine(r=>r.x+r.width<=1.001&&r.y+r.height<=1.001,'相对选区必须在目标内')
export const DisclosureStateSchema=z.object({id:stableId,fingerprint:z.string().regex(/^[a-f0-9]{64}$/),open:z.boolean()})
export const ViewStateSchema=z.object({
 year:z.number().int().min(2021).max(2100).nullable(),
 focus:stableId.nullable(),sort:z.enum(['value','name']).nullable(),
 filters:z.record(z.string().max(50),z.string().max(300)),
 disclosures:z.array(DisclosureStateSchema).max(128).optional(),
})
export const TargetSchema=z.object({
 contentId:stableId,
 kind:z.enum(['text','block','table-row','chart','image','whitespace']),
 fingerprint:z.string().regex(/^[a-f0-9]{64}$/),
 text:z.object({exact:z.string().max(12000),prefix:z.string().max(120),suffix:z.string().max(120)}).nullable(),
 textSegments:z.array(z.object({exact:z.string().max(12000),prefix:z.string().max(120),suffix:z.string().max(120)})).max(120).optional(),
 rect:RelativeRectSchema,
 dataPoints:z.array(z.object({key:stableId,period:z.string().max(30),value:z.number().nullable()})).max(200),
})
export const AnchorSchema=z.object({
 schema:z.literal(1),id:z.uuid(),country:Scope,page:z.string().max(500),
 researchVersion:z.string().min(1).max(100),targets:z.array(TargetSchema).min(1).max(64),
 view:ViewStateSchema,selectedText:z.string().max(16000),snapshotId:z.uuid().nullable(),
 capturedAt:z.iso.datetime(),
}).superRefine((v,ctx)=>{
 if(!/^\/(?:cn\/|us\/|methodology(?:\/|$)|$)/.test(v.page)||v.page.includes('..')||v.page.includes('?')||v.page.includes('#')) ctx.addIssue({code:'custom',message:'页面路径无效'})
 const pageCountry=v.page.startsWith('/cn/')?'cn':v.page.startsWith('/us/')?'us':'shared'
 if(v.country!==pageCountry)ctx.addIssue({code:'custom',message:'批注国家与页面不符'})
 const other=v.country==='cn'?'us-':v.country==='us'?'cn-':null
 if(other&&(v.targets.some(t=>t.contentId.startsWith(other)||t.dataPoints.some(p=>p.key.startsWith(other)))||v.view.focus?.startsWith(other))) ctx.addIssue({code:'custom',message:'批注目标或视图串入其他国家'})
 if(new Set(v.targets.map(t=>t.contentId)).size!==v.targets.length)ctx.addIssue({code:'custom',message:'重复目标'})
 const disclosures=v.view.disclosures??[]
 if(new Set(disclosures.map(d=>d.id)).size!==disclosures.length)ctx.addIssue({code:'custom',message:'重复折叠面板'})
 if(disclosures.some(d=>!d.id.startsWith(v.country+'-disclosure-')))ctx.addIssue({code:'custom',message:'折叠面板国家不符'})
})
export const CreateAnnotationSchema=z.object({anchor:AnchorSchema,body:z.string().trim().min(1).max(16000),idempotencyKey:z.uuid()})
export const ReplySchema=z.object({body:z.string().trim().min(1).max(16000),parentCommentId:z.number().int().positive().nullable(),idempotencyKey:z.uuid()})
export const StateChangeSchema=z.object({
 state:z.enum(['open','closed']),reason:z.enum(['resolved','duplicate','outdated','not-planned']).nullable(),
 explanation:z.string().trim().max(4000),idempotencyKey:z.uuid(),
}).refine(x=>x.state!=='closed'||(x.reason!==null&&x.explanation.length>0),'关闭须选择原因并填写说明')
export type Anchor=z.infer<typeof AnchorSchema>
export type Target=z.infer<typeof TargetSchema>
export type Rect=z.infer<typeof RectSchema>
export type ViewState=z.infer<typeof ViewStateSchema>
export interface ThreadComment {id:number;body:string;author:string;avatarUrl:string;createdAt:string;parentCommentId:number|null;parentDeleted:boolean;parentInvalid?:boolean}
export interface Annotation {
 id:string;country:z.infer<typeof Scope>;page:string;anchor:Anchor;issueNumber:number;
 title:string;body:string;author:string;avatarUrl:string;state:'open'|'closed';createdAt:string;updatedAt:string;fetchedAt:string;
 comments:ThreadComment[];canClose:boolean;issueUrl:string;
 history:{actor:string;state:'open'|'closed';reason:string|null;explanation:string;at:string}[];
}
