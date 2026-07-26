import { StockRepository } from '../../../repository/stockRepository'

export default defineEventHandler(async (event) => {
  const ticker = getRouterParam(event, 'ticker')?.toUpperCase()
  if (!ticker) throw createError({ statusCode: 400, statusMessage: 'Ticker requis' })

  const stock = await StockRepository.getByTicker(ticker)
  if (!stock) throw createError({ statusCode: 404, statusMessage: 'Stock non trouvé' })

  return stock.qualitative_data ?? null
})
