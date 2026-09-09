import type {Research,Task,Industry,Observation} from './schema'
export type TaskCard=Pick<Task,'id'|'title'|'country'|'industryId'|'scenarioId'|'phase'|'researchStatus'|'summary'|'countingRole'>
export interface IndustryPage {industry:Industry;observation:Observation|null;scenarios:Research['scenarios'];tasks:TaskCard[]}
export interface TaskPage {version:string;checkedAt:string;task:Task;industry:Industry;scenario:Pick<Research['scenarios'][number],'id'|'title'|'scope'>;claims:Research['claims'];searches:Research['searches'];sources:Research['sources']}
export const taskStatus={'not-started':'尚未研究自动化','in-progress':'研究中','evidence-insufficient':'检索后证据不足',researched:'已研究，待复核',reviewed:'公开证据已复核'}
export const phaseNames={preparation:'准备',operation:'作业',handoff:'交接',inspection:'检测',exception:'异常',rework:'返工',maintenance:'清洁维护',delivery:'交付'}
