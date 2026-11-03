import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const path = resolve(process.env.DATABASE_PATH || './data/vigi.db');
mkdirSync(dirname(path), { recursive: true });
export const db = new Database(path);
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS publications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL CHECK(type IN ('video','tract','news','press')),
    title TEXT NOT NULL,
    summary TEXT NOT NULL DEFAULT '',
    image_url TEXT NOT NULL DEFAULT '',
    external_url TEXT NOT NULL,
    published_at TEXT NOT NULL,
    published INTEGER NOT NULL DEFAULT 0 CHECK(published IN (0,1))
  );
  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);
