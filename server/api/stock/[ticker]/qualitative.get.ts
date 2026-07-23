import { getDb } from '../../../utils/db'

export default defineEventHandler((event) => {
  const ticker = getRouterParam(event, 'ticker')?.toUpperCase()
  if (!ticker) throw createError({ statusCode: 400, statusMessage: 'Ticker requis' })

  const db = getDb()
  const stock = db.prepare('SELECT qualitative_data FROM stocks WHERE ticker = ?').get(ticker) as any
  if (!stock) throw createError({ statusCode: 404, statusMessage: 'Stock non trouvé' })

  if (!stock.qualitative_data) return null

  try {
    return typeof stock.qualitative_data === 'string'
      ? JSON.parse(stock.qualitative_data)
      : stock.qualitative_data
  } catch {
    return null
  }
})
