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
  const auditDataStr = body.audit_data ? (typeof body.audit_data === 'string' ? body.audit_data : JSON.stringify(body.audit_data)) : null

  if (existing) {
    const stmt = db.prepare(`
      UPDATE stocks SET
        name = ?,
        currency = ?,
        current_price = ?,
        revenue_ttm = ?,
        shares_outstanding = ?,
        beta = ?,
        fetched_at = ?,
        growth_mode = ?,
        projected_growth = ?,
        growth_y1 = ?,
        growth_y2 = ?,
        growth_y3 = ?,
        growth_y4 = ?,
        growth_y5 = ?,
        revenue_y1 = ?,
        revenue_y2 = ?,
        revenue_y3 = ?,
        revenue_y4 = ?,
        revenue_y5 = ?,
        margin_type = ?,
        projected_margin = ?,
        target_multiple = ?,
        discount_rate = ?,
        risk_spread = ?,
        market_cap = ?,
        pe_trailing_raw = ?,
        pe_forward_raw = ?,
        margin_gross_raw = ?,
        margin_operating_raw = ?,
        margin_net_raw = ?,
        margin_fcf_raw = ?,
        total_cash = ?,
        total_debt = ?,
        free_cash_flow_raw = ?,
        analyst_target_price = ?,
        analyst_target_median = ?,
        analyst_growth_estimate = ?,
        analyst_count = ?,
        audit_data = ?,
        updated_at = ?
      WHERE ticker = ?
    `)

    stmt.run(
      body.name ?? existing.name,
      body.currency ?? existing.currency ?? 'USD',
      body.current_price ?? existing.current_price,
      body.revenue_ttm ?? existing.revenue_ttm,
      body.shares_outstanding ?? existing.shares_outstanding,
      body.beta ?? existing.beta ?? 1.0,
      body.fetched_at ?? now,
      body.growth_mode ?? existing.growth_mode,
      body.projected_growth ?? existing.projected_growth,
      body.growth_y1 ?? existing.growth_y1,
      body.growth_y2 ?? existing.growth_y2,
      body.growth_y3 ?? existing.growth_y3,
      body.growth_y4 ?? existing.growth_y4,
      body.growth_y5 ?? existing.growth_y5,
      body.revenue_y1 ?? existing.revenue_y1,
      body.revenue_y2 ?? existing.revenue_y2,
      body.revenue_y3 ?? existing.revenue_y3,
      body.revenue_y4 ?? existing.revenue_y4,
      body.revenue_y5 ?? existing.revenue_y5,
      body.margin_type ?? existing.margin_type ?? 'net_income',
      body.projected_margin ?? existing.projected_margin,
      body.target_multiple ?? existing.target_multiple ?? 20.0,
      body.discount_rate ?? existing.discount_rate,
      body.risk_spread ?? existing.risk_spread ?? 0.20,
      body.market_cap ?? existing.market_cap,
      body.pe_trailing_raw ?? existing.pe_trailing_raw,
      body.pe_forward_raw ?? existing.pe_forward_raw,
      body.margin_gross_raw ?? existing.margin_gross_raw,
      body.margin_operating_raw ?? existing.margin_operating_raw,
      body.margin_net_raw ?? existing.margin_net_raw,
      body.margin_fcf_raw ?? existing.margin_fcf_raw,
      body.total_cash ?? existing.total_cash,
      body.total_debt ?? existing.total_debt,
      body.free_cash_flow_raw ?? existing.free_cash_flow_raw,
      body.analyst_target_price ?? existing.analyst_target_price,
      body.analyst_target_median ?? existing.analyst_target_median,
      body.analyst_growth_estimate ?? existing.analyst_growth_estimate,
      body.analyst_count ?? existing.analyst_count,
      auditDataStr ?? existing.audit_data,
      now,
      ticker
    )

    const updatedRow = db.prepare('SELECT * FROM stocks WHERE ticker = ?').get(ticker) as any
    if (updatedRow && updatedRow.audit_data && typeof updatedRow.audit_data === 'string') {
      try { updatedRow.audit_data = JSON.parse(updatedRow.audit_data) } catch {}
    }
    return updatedRow
  } else {
    const id = randomUUID()
    const stmt = db.prepare(`
      INSERT INTO stocks (
        id, ticker, name, currency, current_price, revenue_ttm, shares_outstanding,
        beta, fetched_at, status, margin_type, growth_mode, projected_growth,
        growth_y1, growth_y2, growth_y3, growth_y4, growth_y5,
        revenue_y1, revenue_y2, revenue_y3, revenue_y4, revenue_y5,
        projected_margin, target_multiple, discount_rate, risk_spread,
        market_cap, pe_trailing_raw, pe_forward_raw, margin_gross_raw, margin_operating_raw,
        margin_net_raw, margin_fcf_raw, total_cash, total_debt, free_cash_flow_raw,
        analyst_target_price, analyst_target_median, analyst_growth_estimate, analyst_count, audit_data, thesis, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?
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
      body.beta ?? 1.0,
      body.fetched_at ?? now,
      body.status ?? 'research',
      body.margin_type ?? 'net_income',
      body.growth_mode ?? 'cagr',
      body.projected_growth ?? 0.10,
      body.growth_y1 ?? 0.10,
      body.growth_y2 ?? 0.10,
      body.growth_y3 ?? 0.10,
      body.growth_y4 ?? 0.10,
      body.growth_y5 ?? 0.10,
      body.revenue_y1 ?? null,
      body.revenue_y2 ?? null,
      body.revenue_y3 ?? null,
      body.revenue_y4 ?? null,
      body.revenue_y5 ?? null,
      body.projected_margin ?? 0.20,
      body.target_multiple ?? 20.0,
      body.discount_rate ?? 0.10,
      body.risk_spread ?? 0.20,
      body.market_cap ?? null,
      body.pe_trailing_raw ?? null,
      body.pe_forward_raw ?? null,
      body.margin_gross_raw ?? null,
      body.margin_operating_raw ?? null,
      body.margin_net_raw ?? null,
      body.margin_fcf_raw ?? null,
      body.total_cash ?? null,
      body.total_debt ?? null,
      body.free_cash_flow_raw ?? null,
      body.analyst_target_price ?? null,
      body.analyst_target_median ?? null,
      body.analyst_growth_estimate ?? null,
      body.analyst_count ?? null,
      auditDataStr ?? null,
      body.thesis ?? null,
      now,
      now
    )

    const newRow = db.prepare('SELECT * FROM stocks WHERE id = ?').get(id) as any
    if (newRow && newRow.audit_data && typeof newRow.audit_data === 'string') {
      try { newRow.audit_data = JSON.parse(newRow.audit_data) } catch {}
    }
    return newRow
  }
})
