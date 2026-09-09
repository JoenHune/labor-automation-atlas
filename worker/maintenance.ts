import {type Env,now} from './types'
export async function cleanup(env:Env) {
 // Atomically remove only expired unattached snapshots. Create requests first
 // extend their lease, so cleanup cannot race an in-flight Issue creation.
 const expired=await env.DB.prepare('DELETE FROM snapshots WHERE id IN (SELECT id FROM snapshots WHERE annotation_id IS NULL AND expires_at<? LIMIT 100) RETURNING object_key').bind(now()).all<{object_key:string}>()
 for(const row of expired.results)await env.SNAPSHOTS.delete(row.object_key)
 await env.DB.batch([
  env.DB.prepare('DELETE FROM sessions WHERE expires_at<?').bind(now()),
  env.DB.prepare('DELETE FROM oauth_states WHERE expires_at<?').bind(now()),
  env.DB.prepare('DELETE FROM login_tickets WHERE expires_at<?').bind(now()),
  env.DB.prepare('DELETE FROM webhook_deliveries WHERE status=? AND finished_at<?').bind('complete',now()-30*86400),
 ])
}
