import {type Env,now} from './types'
export async function cleanup(env:Env) {
 // Atomically remove only expired unattached snapshots. Create requests first
 // extend their lease, so cleanup cannot race an in-flight Issue creation.
 const at=now()
 await env.DB.batch([
  env.DB.prepare('INSERT OR IGNORE INTO snapshot_gc(object_key,queued_at) SELECT object_key,? FROM snapshots WHERE annotation_id IS NULL AND expires_at<? ORDER BY expires_at,id LIMIT 100').bind(at,at),
  env.DB.prepare('DELETE FROM snapshots WHERE object_key IN (SELECT object_key FROM snapshot_gc) AND annotation_id IS NULL AND expires_at<?').bind(at),
 ])
 const expired=await env.DB.prepare('SELECT object_key FROM snapshot_gc ORDER BY queued_at LIMIT 100').all<{object_key:string}>()
 for(const row of expired.results)try {
  await env.SNAPSHOTS.delete(row.object_key)
  await env.DB.prepare('DELETE FROM snapshot_gc WHERE object_key=?').bind(row.object_key).run()
 }catch{/* Keep the object key for a later retry after a storage outage. */}
 await env.DB.batch([
  env.DB.prepare('DELETE FROM sessions WHERE expires_at<?').bind(now()),
  env.DB.prepare('DELETE FROM oauth_states WHERE expires_at<?').bind(now()),
  env.DB.prepare('DELETE FROM login_tickets WHERE expires_at<?').bind(now()),
  env.DB.prepare('DELETE FROM webhook_deliveries WHERE status=? AND finished_at<?').bind('complete',now()-30*86400),
 ])
}
