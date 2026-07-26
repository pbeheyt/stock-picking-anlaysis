import { randomUUID } from 'node:crypto'
import { getDb, parseStockRecord } from '../../utils/db'

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

  const existing = db.prepare('SELECT * FROM stocks WHERE ticker = ?').get(ticker) as Record<string, any> | undefined
  const auditDataStr = body.audit_data
    ? (typeof body.audit_data === 'string' ? body.audit_data : JSON.stringify(body.audit_data))
    : null

  const recordFields: Record<string, any> = {
    name: body.name ?? existing?.name ?? ticker,
    currency: body.currency ?? existing?.currency ?? 'USD',
    current_price: body.current_price ?? existing?.current_price ?? null,
    revenue_ttm: body.revenue_ttm ?? existing?.revenue_ttm ?? null,
    shares_outstanding: body.shares_outstanding ?? existing?.shares_outstanding ?? null,
    beta: body.beta ?? existing?.beta ?? 1.0,
    fetched_at: body.fetched_at ?? now,
    status: body.status ?? existing?.status ?? 'watchlist',
    growth_mode: body.growth_mode ?? existing?.growth_mode ?? 'cagr',
    projected_growth: body.projected_growth ?? existing?.projected_growth ?? 0.10,
    growth_y1: body.growth_y1 ?? existing?.growth_y1 ?? 0.10,
    growth_y2: body.growth_y2 ?? existing?.growth_y2 ?? 0.10,
    growth_y3: body.growth_y3 ?? existing?.growth_y3 ?? 0.10,
    growth_y4: body.growth_y4 ?? existing?.growth_y4 ?? 0.10,
    growth_y5: body.growth_y5 ?? existing?.growth_y5 ?? 0.10,
    revenue_y1: body.revenue_y1 ?? existing?.revenue_y1 ?? null,
    revenue_y2: body.revenue_y2 ?? existing?.revenue_y2 ?? null,
    revenue_y3: body.revenue_y3 ?? existing?.revenue_y3 ?? null,
    revenue_y4: body.revenue_y4 ?? existing?.revenue_y4 ?? null,
    revenue_y5: body.revenue_y5 ?? existing?.revenue_y5 ?? null,
    margin_type: body.margin_type ?? existing?.margin_type ?? 'net_income',
    projected_margin: body.projected_margin ?? existing?.projected_margin ?? 0.20,
    margin_mode: body.margin_mode ?? existing?.margin_mode ?? 'constant',
    margin_y1: body.margin_y1 ?? existing?.margin_y1 ?? body.projected_margin ?? 0.20,
    margin_y2: body.margin_y2 ?? existing?.margin_y2 ?? body.projected_margin ?? 0.20,
    margin_y3: body.margin_y3 ?? existing?.margin_y3 ?? body.projected_margin ?? 0.20,
    margin_y4: body.margin_y4 ?? existing?.margin_y4 ?? body.projected_margin ?? 0.20,
    margin_y5: body.margin_y5 ?? existing?.margin_y5 ?? body.projected_margin ?? 0.20,
    target_multiple: body.target_multiple ?? existing?.target_multiple ?? 20.0,
    discount_rate: body.discount_rate ?? existing?.discount_rate ?? 0.10,
    risk_spread: body.risk_spread ?? existing?.risk_spread ?? 0.20,
    market_cap: body.market_cap ?? existing?.market_cap ?? null,
    pe_trailing_raw: body.pe_trailing_raw ?? existing?.pe_trailing_raw ?? null,
    pe_forward_raw: body.pe_forward_raw ?? existing?.pe_forward_raw ?? null,
    margin_gross_raw: body.margin_gross_raw ?? existing?.margin_gross_raw ?? null,
    margin_operating_raw: body.margin_operating_raw ?? existing?.margin_operating_raw ?? null,
    margin_net_raw: body.margin_net_raw ?? existing?.margin_net_raw ?? null,
    margin_fcf_raw: body.margin_fcf_raw ?? existing?.margin_fcf_raw ?? null,
    total_cash: body.total_cash ?? existing?.total_cash ?? null,
    total_debt: body.total_debt ?? existing?.total_debt ?? null,
    free_cash_flow_raw: body.free_cash_flow_raw ?? existing?.free_cash_flow_raw ?? null,
    analyst_target_price: body.analyst_target_price ?? existing?.analyst_target_price ?? null,
    analyst_target_median: body.analyst_target_median ?? existing?.analyst_target_median ?? null,
    analyst_target_low: body.analyst_target_low ?? existing?.analyst_target_low ?? null,
    analyst_target_high: body.analyst_target_high ?? existing?.analyst_target_high ?? null,
    analyst_growth_estimate: body.analyst_growth_estimate ?? existing?.analyst_growth_estimate ?? null,
    analyst_count: body.analyst_count ?? existing?.analyst_count ?? null,
    audit_data: auditDataStr ?? existing?.audit_data ?? null,
    thesis: body.thesis ?? existing?.thesis ?? null,
    updated_at: now,
  }

  if (existing) {
    const keys = Object.keys(recordFields)
    const setClause = keys.map(k => `${k} = ?`).join(', ')
    const values = keys.map(k => recordFields[k])
    values.push(ticker)

    db.prepare(`UPDATE stocks SET ${setClause} WHERE ticker = ?`).run(...values)

    const updatedRow = db.prepare('SELECT * FROM stocks WHERE ticker = ?').get(ticker)
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
})
