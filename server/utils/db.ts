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
        currency TEXT DEFAULT 'USD',
        current_price REAL,
        revenue_ttm REAL,
        shares_outstanding REAL,
        beta REAL DEFAULT 1.0,
        fetched_at TEXT,
        status TEXT DEFAULT 'research',
        margin_type TEXT DEFAULT 'net_income',
        growth_mode TEXT DEFAULT 'cagr',
        projected_growth REAL DEFAULT 0.10,
        growth_y1 REAL DEFAULT 0.10,
        growth_y2 REAL DEFAULT 0.10,
        growth_y3 REAL DEFAULT 0.10,
        growth_y4 REAL DEFAULT 0.10,
        growth_y5 REAL DEFAULT 0.10,
        revenue_y1 REAL,
        revenue_y2 REAL,
        revenue_y3 REAL,
        revenue_y4 REAL,
        revenue_y5 REAL,
        projected_margin REAL DEFAULT 0.20,
        target_multiple REAL DEFAULT 20.0,
        discount_rate REAL DEFAULT 0.10,
        risk_spread REAL DEFAULT 0.20,
        market_cap REAL,
        pe_trailing_raw REAL,
        pe_forward_raw REAL,
        margin_gross_raw REAL,
        margin_operating_raw REAL,
        margin_net_raw REAL,
        margin_fcf_raw REAL,
        total_cash REAL,
        total_debt REAL,
        free_cash_flow_raw REAL,
        analyst_target_price REAL,
        analyst_target_median REAL,
        analyst_target_low REAL,
        analyst_target_high REAL,
        analyst_growth_estimate REAL,
        analyst_count INTEGER,
        audit_data TEXT,
        thesis TEXT,
        created_at TEXT,
        updated_at TEXT
      );
    `)

    // Safe migrations for existing SQLite database files
    const safeAddColumn = (col: string, def: string) => {
      try {
        _db?.exec(`ALTER TABLE stocks ADD COLUMN ${col} ${def}`)
      } catch {}
    }

    safeAddColumn('currency', "TEXT DEFAULT 'USD'")
    safeAddColumn('beta', 'REAL DEFAULT 1.0')
    safeAddColumn('margin_type', "TEXT DEFAULT 'net_income'")
    safeAddColumn('growth_mode', "TEXT DEFAULT 'cagr'")
    safeAddColumn('growth_y1', 'REAL DEFAULT 0.10')
    safeAddColumn('growth_y2', 'REAL DEFAULT 0.10')
    safeAddColumn('growth_y3', 'REAL DEFAULT 0.10')
    safeAddColumn('growth_y4', 'REAL DEFAULT 0.10')
    safeAddColumn('growth_y5', 'REAL DEFAULT 0.10')
    safeAddColumn('revenue_y1', 'REAL')
    safeAddColumn('revenue_y2', 'REAL')
    safeAddColumn('revenue_y3', 'REAL')
    safeAddColumn('revenue_y4', 'REAL')
    safeAddColumn('revenue_y5', 'REAL')
    safeAddColumn('target_multiple', 'REAL DEFAULT 20.0')
    safeAddColumn('risk_spread', 'REAL DEFAULT 0.20')
    safeAddColumn('market_cap', 'REAL')
    safeAddColumn('pe_trailing_raw', 'REAL')
    safeAddColumn('pe_forward_raw', 'REAL')
    safeAddColumn('margin_gross_raw', 'REAL')
    safeAddColumn('margin_operating_raw', 'REAL')
    safeAddColumn('margin_net_raw', 'REAL')
    safeAddColumn('margin_fcf_raw', 'REAL')
    safeAddColumn('total_cash', 'REAL')
    safeAddColumn('total_debt', 'REAL')
    safeAddColumn('free_cash_flow_raw', 'REAL')
    safeAddColumn('analyst_target_price', 'REAL')
    safeAddColumn('analyst_target_median', 'REAL')
    safeAddColumn('analyst_target_low', 'REAL')
    safeAddColumn('analyst_target_high', 'REAL')
    safeAddColumn('analyst_growth_estimate', 'REAL')
    safeAddColumn('analyst_count', 'INTEGER')
    safeAddColumn('audit_data', 'TEXT')
  }

  return _db
}
