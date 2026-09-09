PRAGMA foreign_keys = ON;
CREATE TABLE oauth_states (
 state_hash TEXT PRIMARY KEY, verifier_cipher TEXT NOT NULL, binding_hash TEXT NOT NULL,
 site_challenge TEXT NOT NULL, return_url TEXT NOT NULL, expires_at INTEGER NOT NULL
);
CREATE TABLE login_tickets (
 ticket_hash TEXT PRIMARY KEY, site_challenge TEXT NOT NULL, user_id INTEGER NOT NULL,
 user_login TEXT NOT NULL, avatar_url TEXT NOT NULL, token_cipher TEXT NOT NULL,
 github_expires_at INTEGER NOT NULL, expires_at INTEGER NOT NULL
);
CREATE TABLE sessions (
 token_hash TEXT PRIMARY KEY, user_id INTEGER NOT NULL, user_login TEXT NOT NULL,
 avatar_url TEXT NOT NULL, token_cipher TEXT NOT NULL, created_at INTEGER NOT NULL,
 expires_at INTEGER NOT NULL, github_expires_at INTEGER NOT NULL
);
CREATE INDEX sessions_user ON sessions(user_id);
CREATE TABLE annotations (
 id TEXT PRIMARY KEY, country TEXT NOT NULL CHECK(country IN ('cn','us','shared')),
 page TEXT NOT NULL, anchor_json TEXT NOT NULL, issue_number INTEGER NOT NULL UNIQUE,
 author_id INTEGER NOT NULL, state TEXT NOT NULL CHECK(state IN ('open','closed')),
 cached_json TEXT NOT NULL, github_updated_at TEXT NOT NULL, synced_at INTEGER NOT NULL
);
CREATE INDEX annotations_page ON annotations(country,page,state);
CREATE TABLE comment_metadata (
 comment_id INTEGER PRIMARY KEY, annotation_id TEXT NOT NULL REFERENCES annotations(id),
 parent_comment_id INTEGER, metadata_json TEXT NOT NULL, deleted INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE snapshots (
 id TEXT PRIMARY KEY, user_id INTEGER NOT NULL, country TEXT NOT NULL, page TEXT NOT NULL,
 object_key TEXT NOT NULL UNIQUE, sha256 TEXT NOT NULL, bytes INTEGER NOT NULL,
 width INTEGER NOT NULL, height INTEGER NOT NULL, created_at INTEGER NOT NULL,
 annotation_id TEXT REFERENCES annotations(id), expires_at INTEGER
);
CREATE TABLE write_operations (
 user_id INTEGER NOT NULL, operation_key TEXT NOT NULL, kind TEXT NOT NULL,
 request_hash TEXT NOT NULL, status TEXT NOT NULL CHECK(status IN ('pending','complete','reconciling','failed')),
 lock_until INTEGER NOT NULL DEFAULT 0, attempted_at INTEGER,
 github_id INTEGER, response_json TEXT, created_at INTEGER NOT NULL,
 PRIMARY KEY(user_id,operation_key)
);
CREATE TABLE webhook_deliveries (
 id TEXT PRIMARY KEY, event TEXT NOT NULL, status TEXT NOT NULL CHECK(status IN ('processing','complete','failed')),
 received_at INTEGER NOT NULL, finished_at INTEGER, error_code TEXT
);
CREATE TABLE github_cache (
 cache_key TEXT PRIMARY KEY, value_json TEXT NOT NULL, fetched_at INTEGER NOT NULL, expires_at INTEGER NOT NULL
);
CREATE TABLE state_history (
 id INTEGER PRIMARY KEY AUTOINCREMENT, annotation_id TEXT NOT NULL REFERENCES annotations(id),
 github_comment_id INTEGER UNIQUE, actor TEXT NOT NULL, state TEXT NOT NULL,
 reason TEXT, explanation TEXT NOT NULL, occurred_at TEXT NOT NULL
);

