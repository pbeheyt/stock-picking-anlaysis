import { getDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID requis',
    })
  }

  const body = await readBody(event)
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Corps de requête requis',
    })
  }

  const db = getDb()
  const existing = db.prepare('SELECT * FROM stocks WHERE id = ?').get(id) as any
  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Stock non trouvé',
    })
  }

  const now = new Date().toISOString()
  const stmt = db.prepare(`
    UPDATE stocks SET
      currency = ?,
      beta = ?,
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
      thesis = ?,
      status = ?,
      updated_at = ?
    WHERE id = ?
  `)

  stmt.run(
    body.currency ?? existing.currency ?? 'USD',
    body.beta ?? existing.beta ?? 1.0,
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
    body.margin_type ?? existing.margin_type,
    body.projected_margin ?? existing.projected_margin,
    body.target_multiple ?? existing.target_multiple,
    body.discount_rate ?? existing.discount_rate,
    body.risk_spread ?? existing.risk_spread,
    body.thesis ?? existing.thesis,
    body.status ?? existing.status,
    now,
    id
  )

  return db.prepare('SELECT * FROM stocks WHERE id = ?').get(id)
})
