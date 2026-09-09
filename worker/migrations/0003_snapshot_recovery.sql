ALTER TABLE snapshots ADD COLUMN upload_status TEXT NOT NULL DEFAULT 'ready'
 CHECK(upload_status IN ('pending','ready'));
CREATE TABLE snapshot_gc (
 object_key TEXT PRIMARY KEY,
 queued_at INTEGER NOT NULL
);
