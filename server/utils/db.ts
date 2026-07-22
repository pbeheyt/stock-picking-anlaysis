import fs from 'node:fs'
import path from 'node:path'
import Database from 'better-sqlite3'

let _db: Database.Database | null = null

export function getDb(): Database.Database {
  if (!_db) {
    const dataDir = path.resolve(process.cwd(), '.data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    const dbPath = path.join(dataDir, 'stocks.db')
    _db = new Database(dbPath)
    _db.pragma('journal_mode = WAL')

    _db.exec(`
      CREATE TABLE IF NOT EXISTS stocks (
        id TEXT PRIMARY KEY,
        ticker TEXT UNIQUE NOT NULL,
        name TEXT,
        current_price REAL,
        revenue_ttm REAL,
        shares_outstanding REAL,
        fetched_at TEXT,
        status TEXT DEFAULT 'research',
        growth_mode TEXT DEFAULT 'cagr',
        projected_growth REAL DEFAULT 0.10,
        growth_y1 REAL DEFAULT 0.10,
        growth_y2 REAL DEFAULT 0.10,
        growth_y3 REAL DEFAULT 0.10,
        growth_y4 REAL DEFAULT 0.10,
        growth_y5 REAL DEFAULT 0.10,
        projected_margin REAL DEFAULT 0.20,
        target_pe REAL DEFAULT 20.0,
        discount_rate REAL DEFAULT 0.10,
        thesis TEXT,
        created_at TEXT,
        updated_at TEXT
      );
    `)
  }

  return _db
}
