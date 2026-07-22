import YahooFinance from 'yahoo-finance2'

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

export default defineEventHandler(async (event) => {
  const tickerParam = getRouterParam(event, 'ticker')

  if (!tickerParam || typeof tickerParam !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Ticker parameter is required',
    })
  }

  const ticker = tickerParam.trim().toUpperCase()

  try {
    const quote = await yahooFinance.quote(ticker)
    if (!quote || (!quote.shortName && !quote.longName && !quote.regularMarketPrice)) {
      throw createError({
        statusCode: 404,
        statusMessage: `Ticker '${ticker}' non trouvé`,
      })
    }

    let summary: any = null
    try {
      summary = await yahooFinance.quoteSummary(ticker, {
        modules: ['financialData', 'defaultKeyStatistics'],
      })
    } catch {
      // Certains tickers n'ont pas de quoteSummary complet
      summary = {}
    }

    const name = quote.shortName || quote.longName || ticker
    const currentPrice = quote.regularMarketPrice ?? null
    const revenueTTM = summary?.financialData?.totalRevenue ?? null
    const sharesOutstanding = summary?.defaultKeyStatistics?.sharesOutstanding ?? quote.sharesOutstanding ?? null

    return {
      ticker,
      name,
      current_price: currentPrice,
      revenue_ttm: revenueTTM,
      shares_outstanding: sharesOutstanding,
      fetched_at: new Date().toISOString(),
    }
  } catch (error: any) {
    if (error.statusCode) throw error

    throw createError({
      statusCode: 404,
      statusMessage: `Impossible de récupérer les données pour le ticker '${ticker}': ${error.message || 'Ticker inconnu'}`,
    })
  }
})
