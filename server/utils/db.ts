import fs from 'node:fs'
import path from 'node:path'
import Database from 'better-sqlite3'

let _db: Database.Database | null = null

const COLUMNS_TO_ENSURE: Array<[colName: string, colDef: string]> = [
  ['currency', "TEXT DEFAULT 'USD'"],
  ['beta', 'REAL DEFAULT 1.0'],
  ['margin_type', "TEXT DEFAULT 'net_income'"],
  ['growth_mode', "TEXT DEFAULT 'cagr'"],
  ['growth_y1', 'REAL DEFAULT 0.10'],
  ['growth_y2', 'REAL DEFAULT 0.10'],
  ['growth_y3', 'REAL DEFAULT 0.10'],
  ['growth_y4', 'REAL DEFAULT 0.10'],
  ['growth_y5', 'REAL DEFAULT 0.10'],
  ['revenue_y1', 'REAL'],
  ['revenue_y2', 'REAL'],
  ['revenue_y3', 'REAL'],
  ['revenue_y4', 'REAL'],
  ['revenue_y5', 'REAL'],
  ['margin_mode', "TEXT DEFAULT 'constant'"],
  ['margin_y1', 'REAL'],
  ['margin_y2', 'REAL'],
  ['margin_y3', 'REAL'],
  ['margin_y4', 'REAL'],
  ['margin_y5', 'REAL'],
  ['target_multiple', 'REAL DEFAULT 20.0'],
  ['risk_spread', 'REAL DEFAULT 0.20'],
  ['market_cap', 'REAL'],
  ['pe_trailing_raw', 'REAL'],
  ['pe_forward_raw', 'REAL'],
  ['margin_gross_raw', 'REAL'],
  ['margin_operating_raw', 'REAL'],
  ['margin_net_raw', 'REAL'],
  ['margin_fcf_raw', 'REAL'],
  ['total_cash', 'REAL'],
  ['total_debt', 'REAL'],
  ['free_cash_flow_raw', 'REAL'],
  ['analyst_target_price', 'REAL'],
  ['analyst_target_median', 'REAL'],
  ['analyst_target_low', 'REAL'],
  ['analyst_target_high', 'REAL'],
  ['analyst_growth_estimate', 'REAL'],
  ['analyst_count', 'INTEGER'],
  ['audit_data', 'TEXT'],
  ['qualitative_data', 'TEXT'],
  ['regression_fair_price', 'REAL'],
  ['quant_preset', "TEXT DEFAULT 'MAX_R2'"],
  ['quant_start_date', 'TEXT'],
  ['quant_end_date', 'TEXT'],
]

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
        status TEXT DEFAULT 'watchlist',
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
        margin_mode TEXT DEFAULT 'constant',
        margin_y1 REAL,
        margin_y2 REAL,
        margin_y3 REAL,
        margin_y4 REAL,
        margin_y5 REAL,
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

      CREATE TABLE IF NOT EXISTS ai_models (
        id TEXT PRIMARY KEY,
        provider TEXT NOT NULL,
        name TEXT NOT NULL,
        tested_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS ai_usage_logs (
        id TEXT PRIMARY KEY,
        created_at TEXT NOT NULL,
        ticker TEXT,
        call_type TEXT NOT NULL,
        provider TEXT NOT NULL,
        model TEXT NOT NULL,
        prompt_tokens INTEGER DEFAULT 0,
        completion_tokens INTEGER DEFAULT 0,
        total_tokens INTEGER DEFAULT 0,
        cost_usd REAL DEFAULT 0.0,
        status TEXT NOT NULL,
        error_message TEXT
      );
    `)

    // Migrations de colonnes
    for (const [col, def] of COLUMNS_TO_ENSURE) {
      try {
        _db.exec(`ALTER TABLE stocks ADD COLUMN ${col} ${def}`)
      } catch {
        // Ignorer si la colonne existe déjà
      }
    }
  }

  return _db
}
