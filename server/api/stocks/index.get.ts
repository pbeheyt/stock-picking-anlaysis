import { StockRepository } from '../../repository/stockRepository'

export default defineEventHandler(async () => {
  return await StockRepository.getAll()
})
