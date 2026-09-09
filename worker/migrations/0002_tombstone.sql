ALTER TABLE annotations ADD COLUMN deleted_at INTEGER;
CREATE INDEX snapshots_expiry ON snapshots(expires_at);
