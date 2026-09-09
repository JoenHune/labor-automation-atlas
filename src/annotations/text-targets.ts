import {fingerprint,normalizeText,quoteMatches} from './anchors'
import type {Target} from './schema'

/** Identity comes from the explicit semantic owner, never a sibling index or
 * screen position. The hash retains the complete owner when its prefix is long. */
export async function ownedTargetId(owner:string,kind:'text'|'image',key='') {
 const digest=await fingerprint(JSON.stringify({owner,kind,key,scope:'owned-content-v1'}))
 return owner.slice(0,140)+':own:'+kind+':'+digest.slice(0,24)
}

/** A duplicate ID is ambiguous even when its current text happens to be equal. */
export function unambiguousTargets<T extends {id:string}>(targets:readonly T[]):T[] {
 const counts=new Map<string,number>()
 for(const target of targets)counts.set(target.id,(counts.get(target.id)??0)+1)
 return targets.filter(target=>counts.get(target.id)===1)
}

/** Offsets are into the normalized text map, not DOM child positions. A quote
 * that cannot be resolved uniquely now must not be saved for later guessing. */
export function quoteForSpan(text:string,start:number,end:number):Target['text'] {
 if(!Number.isInteger(start)||!Number.isInteger(end)||start<0||end>text.length||start>=end)return null
 const exact=normalizeText(text.slice(start,end))
 if(!exact)return null
 const quote={exact,prefix:text.slice(Math.max(0,start-90),start).trimEnd(),suffix:text.slice(end,end+90).trimStart()}
 return quoteMatches(text,quote).length===1?quote:null
}

/** Every nonempty selected text node must have exactly one accepted owner.
 * This prevents both partial capture and overlapping parent/child capture. */
export function assertTextCoverage<T>(selected:readonly T[],owners:readonly (readonly T[])[]) {
 const counts=new Map<T,number>()
 for(const owner of owners)for(const key of new Set(owner))counts.set(key,(counts.get(key)??0)+1)
 if(!selected.length||selected.some(key=>counts.get(key)!==1))throw new Error('所选文字有未能唯一定位的内容，请调整选区后重试；草稿正文会保留。')
}
