import YahooFinance from 'yahoo-finance2'
import { StockRepository } from '../../repository/stockRepository'

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}))
  const targetTickers: string[] = body?.tickers ?? []
  const now = new Date().toISOString()

  let stocks = await StockRepository.getAll()
  if (targetTickers.length > 0) {
    const uppercaseTargets = new Set(targetTickers.map(t => t.toUpperCase()))
    stocks = stocks.filter(s => uppercaseTargets.has(s.ticker.toUpperCase()))
  }

  if (!stocks || stocks.length === 0) {
    return { count: 0, synced_at: now, stocks: [] }
  }

  const tickersList = Array.from(new Set(stocks.map(s => s.ticker)))

  try {
    const quotes = await yahooFinance.quote(tickersList)
    const quotesArray = Array.isArray(quotes) ? quotes : [quotes]

    const updatedCount = await StockRepository.batchUpdateQuotes(quotesArray)
    const allUpdated = await StockRepository.getAll()

    return {
      count: updatedCount,
      synced_at: now,
      stocks: allUpdated,
    }
  } catch (err: any) {
    console.error('[Batch Sync Yahoo Finance] Erreur lors de la synchro groupée:', err?.message || err)
    throw createError({
      statusCode: 500,
      statusMessage: `Erreur lors de la synchronisation des cours : ${err?.message || err}`,
    })
  }
})
