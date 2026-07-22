import { randomUUID } from 'node:crypto'
import { getDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body || !body.ticker) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Ticker est requis',
    })
  }

  const db = getDb()
  const now = new Date().toISOString()
  const ticker = String(body.ticker).trim().toUpperCase()

  const existing = db.prepare('SELECT * FROM stocks WHERE ticker = ?').get(ticker) as any

  if (existing) {
    const stmt = db.prepare(`
      UPDATE stocks SET
        name = ?,
        currency = ?,
        current_price = ?,
        revenue_ttm = ?,
        shares_outstanding = ?,
        fetched_at = ?,
        growth_mode = ?,
        projected_growth = ?,
        growth_y1 = ?,
        growth_y2 = ?,
        growth_y3 = ?,
        growth_y4 = ?,
        growth_y5 = ?,
        margin_type = ?,
        projected_margin = ?,
        target_pe = ?,
        discount_rate = ?,
        updated_at = ?
      WHERE ticker = ?
    `)

    stmt.run(
      body.name ?? existing.name,
      body.currency ?? existing.currency ?? 'USD',
      body.current_price ?? existing.current_price,
      body.revenue_ttm ?? existing.revenue_ttm,
      body.shares_outstanding ?? existing.shares_outstanding,
      body.fetched_at ?? now,
      body.growth_mode ?? existing.growth_mode,
      body.projected_growth ?? existing.projected_growth,
      body.growth_y1 ?? existing.growth_y1,
      body.growth_y2 ?? existing.growth_y2,
      body.growth_y3 ?? existing.growth_y3,
      body.growth_y4 ?? existing.growth_y4,
      body.growth_y5 ?? existing.growth_y5,
      body.margin_type ?? existing.margin_type ?? 'net_margin',
      body.projected_margin ?? existing.projected_margin,
      body.target_pe ?? existing.target_pe,
      body.discount_rate ?? existing.discount_rate,
      now,
      ticker
    )

    return db.prepare('SELECT * FROM stocks WHERE ticker = ?').get(ticker)
  } else {
    const id = randomUUID()
    const stmt = db.prepare(`
      INSERT INTO stocks (
        id, ticker, name, currency, current_price, revenue_ttm, shares_outstanding,
        fetched_at, status, growth_mode, projected_growth,
        growth_y1, growth_y2, growth_y3, growth_y4, growth_y5,
        margin_type, projected_margin, target_pe, discount_rate, thesis, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?
      )
    `)

    stmt.run(
      id,
      ticker,
      body.name ?? ticker,
      body.currency ?? 'USD',
      body.current_price ?? null,
      body.revenue_ttm ?? null,
      body.shares_outstanding ?? null,
      body.fetched_at ?? now,
      body.status ?? 'research',
      body.growth_mode ?? 'cagr',
      body.projected_growth ?? 0.10,
      body.growth_y1 ?? 0.10,
      body.growth_y2 ?? 0.10,
      body.growth_y3 ?? 0.10,
      body.growth_y4 ?? 0.10,
      body.growth_y5 ?? 0.10,
      body.margin_type ?? 'net_margin',
      body.projected_margin ?? 0.20,
      body.target_pe ?? 20.0,
      body.discount_rate ?? 0.10,
      body.thesis ?? null,
      now,
      now
    )

    return db.prepare('SELECT * FROM stocks WHERE id = ?').get(id)
  }
})
