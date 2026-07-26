import { randomUUID } from 'node:crypto'
import { getDb, parseStockRecord } from '../utils/db'
import type { Stock } from '~/types/database.types'

export class StockRepository {
  static async getAll(): Promise<Stock[]> {
    const db = getDb()
    const rows = db.prepare('SELECT * FROM stocks ORDER BY created_at DESC').all() as any[]
    return rows.map(parseStockRecord)
  }

  static async getByTicker(ticker: string): Promise<Stock | null> {
    const db = getDb()
    const row = db.prepare('SELECT * FROM stocks WHERE UPPER(ticker) = ?').get(ticker.toUpperCase())
    return row ? parseStockRecord(row) : null
  }

  static async getById(id: string): Promise<Stock | null> {
    const db = getDb()
    const row = db.prepare('SELECT * FROM stocks WHERE id = ?').get(id)
    return row ? parseStockRecord(row) : null
  }

  static async upsert(data: Record<string, any>): Promise<Stock> {
    const db = getDb()
    const now = new Date().toISOString()
    const ticker = String(data.ticker).trim().toUpperCase()

    const existing = db.prepare('SELECT * FROM stocks WHERE UPPER(ticker) = ?').get(ticker) as Record<string, any> | undefined
    const auditDataStr = data.audit_data
      ? (typeof data.audit_data === 'string' ? data.audit_data : JSON.stringify(data.audit_data))
      : null

    const recordFields: Record<string, any> = {
      name: data.name ?? existing?.name ?? ticker,
      currency: data.currency ?? existing?.currency ?? 'USD',
      current_price: data.current_price ?? existing?.current_price ?? null,
      revenue_ttm: data.revenue_ttm ?? existing?.revenue_ttm ?? null,
      shares_outstanding: data.shares_outstanding ?? existing?.shares_outstanding ?? null,
      beta: data.beta ?? existing?.beta ?? 1.0,
      fetched_at: data.fetched_at ?? now,
      status: data.status ?? existing?.status ?? 'watchlist',
      growth_mode: data.growth_mode ?? existing?.growth_mode ?? 'cagr',
      projected_growth: data.projected_growth ?? existing?.projected_growth ?? 0.10,
      growth_y1: data.growth_y1 ?? existing?.growth_y1 ?? 0.10,
      growth_y2: data.growth_y2 ?? existing?.growth_y2 ?? 0.10,
      growth_y3: data.growth_y3 ?? existing?.growth_y3 ?? 0.10,
      growth_y4: data.growth_y4 ?? existing?.growth_y4 ?? 0.10,
      growth_y5: data.growth_y5 ?? existing?.growth_y5 ?? 0.10,
      revenue_y1: data.revenue_y1 ?? existing?.revenue_y1 ?? null,
      revenue_y2: data.revenue_y2 ?? existing?.revenue_y2 ?? null,
      revenue_y3: data.revenue_y3 ?? existing?.revenue_y3 ?? null,
      revenue_y4: data.revenue_y4 ?? existing?.revenue_y4 ?? null,
      revenue_y5: data.revenue_y5 ?? existing?.revenue_y5 ?? null,
      margin_type: data.margin_type ?? existing?.margin_type ?? 'net_income',
      projected_margin: data.projected_margin ?? existing?.projected_margin ?? 0.20,
      margin_mode: data.margin_mode ?? existing?.margin_mode ?? 'constant',
      margin_y1: data.margin_y1 ?? existing?.margin_y1 ?? data.projected_margin ?? 0.20,
      margin_y2: data.margin_y2 ?? existing?.margin_y2 ?? data.projected_margin ?? 0.20,
      margin_y3: data.margin_y3 ?? existing?.margin_y3 ?? data.projected_margin ?? 0.20,
      margin_y4: data.margin_y4 ?? existing?.margin_y4 ?? data.projected_margin ?? 0.20,
      margin_y5: data.margin_y5 ?? existing?.margin_y5 ?? data.projected_margin ?? 0.20,
      target_multiple: data.target_multiple ?? existing?.target_multiple ?? 20.0,
      discount_rate: data.discount_rate ?? existing?.discount_rate ?? 0.10,
      risk_spread: data.risk_spread ?? existing?.risk_spread ?? 0.20,
      market_cap: data.market_cap ?? existing?.market_cap ?? null,
      pe_trailing_raw: data.pe_trailing_raw ?? existing?.pe_trailing_raw ?? null,
      pe_forward_raw: data.pe_forward_raw ?? existing?.pe_forward_raw ?? null,
      margin_gross_raw: data.margin_gross_raw ?? existing?.margin_gross_raw ?? null,
      margin_operating_raw: data.margin_operating_raw ?? existing?.margin_operating_raw ?? null,
      margin_net_raw: data.margin_net_raw ?? existing?.margin_net_raw ?? null,
      margin_fcf_raw: data.margin_fcf_raw ?? existing?.margin_fcf_raw ?? null,
      total_cash: data.total_cash ?? existing?.total_cash ?? null,
      total_debt: data.total_debt ?? existing?.total_debt ?? null,
      free_cash_flow_raw: data.free_cash_flow_raw ?? existing?.free_cash_flow_raw ?? null,
      analyst_target_price: data.analyst_target_price ?? existing?.analyst_target_price ?? null,
      analyst_target_median: data.analyst_target_median ?? existing?.analyst_target_median ?? null,
      analyst_target_low: data.analyst_target_low ?? existing?.analyst_target_low ?? null,
      analyst_target_high: data.analyst_target_high ?? existing?.analyst_target_high ?? null,
      analyst_growth_estimate: data.analyst_growth_estimate ?? existing?.analyst_growth_estimate ?? null,
      analyst_count: data.analyst_count ?? existing?.analyst_count ?? null,
      audit_data: auditDataStr ?? existing?.audit_data ?? null,
      thesis: data.thesis ?? existing?.thesis ?? null,
      updated_at: now,
    }

    if (existing) {
      const keys = Object.keys(recordFields)
      const setClause = keys.map(k => `${k} = ?`).join(', ')
      const values = keys.map(k => recordFields[k])
      values.push(ticker)

      db.prepare(`UPDATE stocks SET ${setClause} WHERE UPPER(ticker) = ?`).run(...values)
      const updatedRow = db.prepare('SELECT * FROM stocks WHERE UPPER(ticker) = ?').get(ticker)
      return parseStockRecord(updatedRow)
    } else {
      const id = randomUUID()
      recordFields.id = id
      recordFields.ticker = ticker
      recordFields.created_at = now

      const keys = Object.keys(recordFields)
      const placeholders = keys.map(() => '?').join(', ')
      const values = keys.map(k => recordFields[k])

      db.prepare(`INSERT INTO stocks (${keys.join(', ')}) VALUES (${placeholders})`).run(...values)
      const newRow = db.prepare('SELECT * FROM stocks WHERE id = ?').get(id)
      return parseStockRecord(newRow)
    }
  }

  static async updateFields(id: string, updatesMap: Record<string, any>): Promise<Stock | null> {
    const db = getDb()
    const now = new Date().toISOString()
    const keys = Object.keys(updatesMap)
    if (keys.length === 0) return this.getById(id)

    const setClause = [...keys.map(k => `${k} = ?`), 'updated_at = ?'].join(', ')
    const values = [...keys.map(k => updatesMap[k]), now, id]

    db.prepare(`UPDATE stocks SET ${setClause} WHERE id = ?`).run(...values)
    return this.getById(id)
  }

  static async delete(id: string): Promise<boolean> {
    const db = getDb()
    const result = db.prepare('DELETE FROM stocks WHERE id = ?').run(id)
    return result.changes > 0
  }

  static async updateQualitativeData(id: string, qualitativeData: any): Promise<void> {
    const db = getDb()
    const now = new Date().toISOString()
    const payloadStr = typeof qualitativeData === 'string' ? qualitativeData : JSON.stringify(qualitativeData)
    db.prepare('UPDATE stocks SET qualitative_data = ?, updated_at = ? WHERE id = ?').run(payloadStr, now, id)
  }

  static async updateQuantiAiData(id: string, quantiAiData: any): Promise<void> {
    const db = getDb()
    const now = new Date().toISOString()
    const payloadStr = typeof quantiAiData === 'string' ? quantiAiData : JSON.stringify(quantiAiData)
    db.prepare('UPDATE stocks SET quanti_ai_data = ?, updated_at = ? WHERE id = ?').run(payloadStr, now, id)
  }

  static async batchUpdateQuotes(quotesArray: any[]): Promise<number> {
    const db = getDb()
    const now = new Date().toISOString()
    const updateStmt = db.prepare(`
      UPDATE stocks 
      SET 
        current_price = ?,
        pe_trailing_raw = ?,
        pe_forward_raw = ?,
        fetched_at = ?,
        updated_at = ?
      WHERE UPPER(ticker) = ?
    `)

    let count = 0
    const transaction = db.transaction(() => {
      for (const q of quotesArray) {
        if (!q || !q.symbol || q.regularMarketPrice === undefined) continue
        const ticker = String(q.symbol).toUpperCase()
        const price = q.regularMarketPrice ?? null
        const peTrailing = q.trailingPE ?? null
        const peForward = q.forwardPE ?? null

        updateStmt.run(price, peTrailing, peForward, now, now, ticker)
        count++
      }
    })

    transaction()
    return count
  }
}
