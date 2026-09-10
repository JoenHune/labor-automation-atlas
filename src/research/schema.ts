import { z } from 'zod'

export const CountrySchema = z.enum(['cn', 'us'])
export type Country = z.infer<typeof CountrySchema>
const ID = z.string().regex(/^[a-z0-9][a-z0-9._:-]*$/)
const nonempty = z.string().min(1)
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
export const EvidenceRefSchema = z.object({
  sourceId: ID,
  locator: nonempty,
  excerpt: z.string().optional(),
})
export const SourceSchema = z.object({
  id: ID,
  title: nonempty,
  publisher: nonempty,
  url: z.url(),
  published: date.nullable(),
  retrieved: date,
  country: z.enum(['cn', 'us', 'global']),
  kind: z.enum(['official-statistics', 'standard', 'occupation', 'operator', 'vendor', 'paper', 'official-investigation', 'other']),
  archive: z.string().optional(),
  sha256: z.string().regex(/^[a-f0-9]{64}$/).optional(),
  limitations: z.array(nonempty),
  publishedLabel:nonempty.optional(),
  dates:z.array(z.object({kind:z.enum(['updated','authored','effective','displayed','url-only','document-version','released','adopted']),value:z.string().regex(/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/),note:nonempty})).optional(),
  dateEvidence:z.array(EvidenceRefSchema).optional(),
  evidencePeriod:nonempty.optional(),
  evidenceLevel:nonempty.optional(),
  readStatus:nonempty.optional(),
})
export const ObservationSchema = z.object({
  id: ID, country: CountrySchema, industryId: ID,
  period: nonempty,
  frequency: z.enum(['annual', 'quarter', 'half-year', 'month', 'year-to-date']),
  measure: z.enum(['value-added', 'real-growth', 'production-index', 'revenue', 'other']),
  priceBasis: z.enum(['current', 'constant', 'not-applicable']),
  value: z.number().finite().nullable(),
  unit: nonempty,
  currency: z.enum(['CNY', 'USD']).nullable(),
  annualized: z.boolean(),
  seasonalAdjustment: z.enum(['adjusted', 'unadjusted', 'not-applicable', 'unspecified']),
  releaseDate: date.nullable(),
  publicationDateNote: z.string().optional(),
  revision: nonempty,
  coverage: nonempty,
  evidence: z.array(EvidenceRefSchema).min(1),
  evidenceKind: z.enum(['fact', 'calculation']).default('fact'),
  computation: z.object({expression:nonempty,inputs:z.array(z.number()),note:z.string().optional()}).optional(),
  label: z.string().optional(),
  missingReason: z.string().optional(),
}).superRefine((v, ctx) => {
  if (v.value === null && !v.missingReason) ctx.addIssue({code: 'custom', message: '缺失观测必须说明原因'})
  if (v.currency && v.currency !== (v.country === 'cn' ? 'CNY' : 'USD')) ctx.addIssue({code:'custom', message:'观测货币与国家不匹配'})
  if (v.frequency === 'annual' && v.annualized) ctx.addIssue({code:'custom', message:'完整年度不得标为季度年化'})
  if (v.releaseDate === null && !v.publicationDateNote) ctx.addIssue({code:'custom',message:'未知发布日期必须明确说明'})
  if (v.evidenceKind === 'calculation' && !v.computation) ctx.addIssue({code:'custom',message:'计算观测必须保存表达式与输入'})
})
export const IndustrySchema = z.object({
  id: ID, country: CountrySchema, code: nonempty, name: nonempty, nameEn: nonempty.optional(),
  classification: nonempty,
  sectors: z.array(z.enum(['primary', 'secondary', 'tertiary'])).min(1),
  parentId: ID.nullable(),
  rankingUniverse: z.boolean(),
  unallocated: z.boolean(),
  selected: z.boolean(),
  selectionReason: z.enum(['top10', 'sector-supplement', 'not-selected', 'unallocated']),
  coverage: nonempty,
  evidence: z.array(EvidenceRefSchema).min(1),
  inventory:z.record(z.string(),z.unknown()).optional(),
})
export const ClaimSchema = z.object({
  id: ID, country: CountrySchema, taskId: ID.optional(),
  kind: z.enum(['fact', 'calculation', 'judgment', 'hypothesis']),
  text: nonempty, conditions: z.array(nonempty),
  evidence: z.array(EvidenceRefSchema),
  basedOn: z.array(ID),
  status: z.enum(['draft', 'reviewed', 'disputed', 'superseded']),
  deployment: z.enum(['not-applicable', 'vendor-report', 'laboratory', 'pilot', 'commercial-operation', 'unknown']),
  numericValue: z.number().nullable().optional(),
  unit: z.string().optional(),
  computation: z.object({expression:nonempty, inputs:z.record(z.string(),z.number().nullable())}).optional(),
  gap: z.string().optional(),
}).superRefine((v,ctx)=>{
  if (v.kind !== 'hypothesis' && v.evidence.length === 0 && v.basedOn.length === 0) ctx.addIssue({code:'custom',message:'实质结论需要来源或可追溯前提'})
  if (v.kind === 'calculation' && !v.computation) ctx.addIssue({code:'custom',message:'计算结果需要表达式和输入'})
  if (v.kind === 'judgment' && v.conditions.length === 0) ctx.addIssue({code:'custom',message:'判断需要具体场景条件'})
})
export const SearchSchema = z.object({
  id: ID, country:CountrySchema, taskId:ID,
  direction:z.enum(['workflow', 'occupation', 'automation', 'counterevidence']),
  query:nonempty, searchedOn:date,
  results:z.array(ID),
  outcome:z.enum(['evidence-found','no-relevant-result','access-blocked','completed-candidates-unattributed']),
  note:nonempty,
  audit:z.object({file:nonempty,id:nonempty,sha256:nonempty}).optional(),
})
export const TaskSchema = z.object({
  id:ID, country:CountrySchema, industryId:ID, scenarioId:ID,
  countingRole:z.enum(['atomic-candidate','composite-reference']).optional(),
  title:nonempty, boundary:nonempty, inputs:z.array(nonempty).min(1), outputs:z.array(nonempty).min(1),
  acceptance:z.array(nonempty).min(1),
  phase:z.enum(['preparation','operation','handoff','inspection','exception','rework','maintenance','delivery']),
  predecessors:z.array(ID),
  conditions:z.array(nonempty),
  workflowEvidence:z.array(EvidenceRefSchema),
  occupationEvidence:z.array(EvidenceRefSchema),
  manualInputs:z.array(z.object({name:nonempty,value:z.number().nullable(),unit:nonempty,evidence:z.array(EvidenceRefSchema),gap:z.string().optional()})),
  alternatives:z.array(z.object({
    category:z.enum(['traditional-machine','dedicated-machine','robot','assistive-tool','digital-process','unclassified']),
    description:nonempty, claimIds:z.array(ID), remainingLabor:z.array(nonempty), conditions:z.array(nonempty),
  })),
  barriers:z.array(z.object({type:z.enum(['technical','economic','adoption']),scenario:nonempty,claimIds:z.array(ID)})),
  conclusionIds:z.array(ID), counterevidenceIds:z.array(ID),
  evidenceGaps:z.array(nonempty), interviewQuestions:z.array(nonempty),
  searchIds:z.array(ID),
  researchStatus:z.enum(['not-started','in-progress','evidence-insufficient','researched','reviewed']),
  summary:z.string().optional(),evidenceAge:z.string().optional(),dossier:z.record(z.string(),z.unknown()).optional(),
  discovery:z.object({originalId:nonempty,supportStatus:nonempty,acceptanceStatus:nonempty,sourceLimitations:z.array(nonempty),inventoryFile:nonempty,inputSha256:nonempty}).optional(),
  review:z.object({reviewer:nonempty,date:date,notes:nonempty}).nullable(),
})
export const ScenarioSchema = z.object({
  id:ID,country:CountrySchema,industryId:ID,title:nonempty,scope:nonempty,
  subsectors:z.array(nonempty), workflowSources:z.array(EvidenceRefSchema),occupationSources:z.array(EvidenceRefSchema),
  coverage:z.array(z.object({phase:nonempty,taskIds:z.array(ID),gap:z.string().nullable()})),
  status:z.enum(['proposed','source-backed','cross-checked','frozen']),
  exclusions:z.array(nonempty),
  inventory:z.record(z.string(),z.unknown()).optional(),
})
export const ProductivityDatasetSchema=z.object({
  version:nonempty,checkedAt:date,sources:z.array(SourceSchema),
  parents:z.array(z.object({
    country:CountrySchema,parentIndustryId:ID,name:nonempty.optional(),classification:nonempty,
    coverage:nonempty,gaps:z.array(nonempty),nonOverlapping:z.boolean(),
    rows:z.array(z.object({
      id:ID,stablechildId:ID.optional(),country:CountrySchema,parentIndustryId:ID,name:nonempty,nameEn:nonempty.optional(),year:z.number().int(),
      valueAdded:z.object({
        value:z.number().finite().nullable(),unit:nonempty,currency:z.enum(['CNY','USD']),year:z.number().int(),
        measure:z.literal('value-added'),priceBasis:z.enum(['current','constant','unknown']),
        coverage:nonempty,coverageKey:z.string(),releaseDate:date.nullable(),revision:nonempty,evidence:z.array(EvidenceRefSchema),
        evidenceKind:z.enum(['fact','calculation']).optional(),
        computation:z.object({expression:nonempty,inputs:z.array(z.number().finite()),note:nonempty}).optional(),
      }),
      employment:z.object({
        value:z.number().finite().nullable(),unit:nonempty,year:z.number().int().nullable(),definition:nonempty,
        coverage:nonempty,coverageKey:z.string(),denominatorKind:z.enum(['persons','jobs','employees','unknown']),
        periodBasis:z.enum(['annual-average','year-end','other','unknown']),
        releaseDate:date.nullable(),revision:nonempty,evidence:z.array(EvidenceRefSchema),
        calculation:z.object({kind:z.enum(['direct-fact','sum-of-official-disjoint-rows']),inputs:z.array(z.number().finite()),lineCodes:z.array(z.number().int()),expression:nonempty}).optional(),
      }),
      comparable:z.boolean(),comparabilityReasons:z.array(nonempty),gaps:z.array(nonempty),
    })),
  })),
})
export const MacroDatasetSchema=z.object({
 version:nonempty,checkedAt:date,sources:z.array(SourceSchema),
 structures:z.array(z.object({
  id:ID,country:CountrySchema,year:z.number().int(),basis:z.literal('product'),title:nonempty,description:nonempty,
  unit:nonempty,currency:z.enum(['CNY','USD']),releaseDate:date.nullable(),revision:nonempty,coverage:nonempty,
  nodes:z.array(z.object({id:ID,parentId:ID.nullable(),name:nonempty,value:z.number().finite(),
   evidence:z.array(EvidenceRefSchema).min(1),evidenceKind:z.enum(['fact','calculation']),memberCodes:z.array(nonempty).min(1),
  })).min(1),
 })),
})
export const ResearchSchema = z.object({
  version:nonempty, checkedAt:date, publishedAt:date.nullable(),
  freezeStatus:z.enum(['working','review','frozen']),
  countries:z.array(z.object({
    country:CountrySchema,name:nonempty,latestYear:z.number().int(),latestPeriod:nonempty,latestRelease:date,
    monthlyPeriod:z.string().nullable(),monthlyRelease:date.nullable(),nextIndustryRelease:date.nullable(),
    rankingLabel:nonempty,scope:nonempty,caveats:z.array(nonempty),gaps:z.array(nonempty),
    checkedAt:date,publicationRecheck:date.nullable(),evidence:z.array(EvidenceRefSchema).min(1),
  })),
  sources:z.array(SourceSchema), industries:z.array(IndustrySchema),
  observations:z.array(ObservationSchema), scenarios:z.array(ScenarioSchema),
  tasks:z.array(TaskSchema), claims:z.array(ClaimSchema), searches:z.array(SearchSchema),
  subindustryProductivity:ProductivityDatasetSchema.optional(),
  macroStructures:MacroDatasetSchema.optional(),
})
export type Research = z.infer<typeof ResearchSchema>
export type Observation = z.infer<typeof ObservationSchema>
export type Industry = z.infer<typeof IndustrySchema>
export type Task = z.infer<typeof TaskSchema>
