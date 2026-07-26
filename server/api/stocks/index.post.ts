import { StockRepository } from '../../repository/stockRepository'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body || !body.ticker) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Ticker est requis',
    })
  }

  return await StockRepository.upsert(body)
})
