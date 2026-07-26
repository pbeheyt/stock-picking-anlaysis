import { StockRepository } from '../../repository/stockRepository'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID requis',
    })
  }

  const deleted = await StockRepository.delete(id)
  if (!deleted) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Stock non trouvé',
    })
  }

  return { success: true, id }
})
