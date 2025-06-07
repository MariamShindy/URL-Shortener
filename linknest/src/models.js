const db = require('./db');

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original_url TEXT NOT NULL,
    short_slug TEXT UNIQUE NOT NULL,
    created_by INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    expires_at TEXT,
    click_count INTEGER DEFAULT 0,
    password_hash TEXT,
    FOREIGN KEY(created_by) REFERENCES users(id)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    link_id INTEGER,
    ip_address TEXT,
    user_agent TEXT,
    referrer TEXT,
    country TEXT,
    clicked_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(link_id) REFERENCES links(id)
  )
`);
