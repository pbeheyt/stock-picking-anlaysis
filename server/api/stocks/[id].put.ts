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
      growth_mode = ?,
      projected_growth = ?,
      growth_y1 = ?,
      growth_y2 = ?,
      growth_y3 = ?,
      growth_y4 = ?,
      growth_y5 = ?,
      projected_margin = ?,
      target_pe = ?,
      discount_rate = ?,
      thesis = ?,
      status = ?,
      updated_at = ?
    WHERE id = ?
  `)

  stmt.run(
    body.growth_mode ?? existing.growth_mode,
    body.projected_growth ?? existing.projected_growth,
    body.growth_y1 ?? existing.growth_y1,
    body.growth_y2 ?? existing.growth_y2,
    body.growth_y3 ?? existing.growth_y3,
    body.growth_y4 ?? existing.growth_y4,
    body.growth_y5 ?? existing.growth_y5,
    body.projected_margin ?? existing.projected_margin,
    body.target_pe ?? existing.target_pe,
    body.discount_rate ?? existing.discount_rate,
    body.thesis ?? existing.thesis,
    body.status ?? existing.status,
    now,
    id
  )

  return db.prepare('SELECT * FROM stocks WHERE id = ?').get(id)
})
