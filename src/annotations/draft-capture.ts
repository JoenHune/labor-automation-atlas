import type {Draft} from './client'
import type {Anchor} from './schema'

/** Capture is asynchronous; the reader may keep editing while it runs. */
export async function captureDraftSelection(
 started:Draft,
 current:()=>Draft|null,
 capture:()=>Promise<{anchor:Anchor;snapshot:Blob}>
):Promise<Draft|null> {
 const selection=await capture(),latest=current()
 if(!latest||latest.id!==started.id||latest.country!==started.country||latest.page!==started.page||latest.kind!=='new'||latest.submitted)return null
 return {...latest,...selection}
}
