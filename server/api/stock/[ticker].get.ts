import YahooFinance from 'yahoo-finance2'

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

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
      summary = {}
    }

    const name = quote.shortName || quote.longName || ticker
    const currentPrice = quote.regularMarketPrice ?? null
    const revenueTTM = summary?.financialData?.totalRevenue ?? null
    const sharesOutstanding = summary?.defaultKeyStatistics?.sharesOutstanding ?? quote.sharesOutstanding ?? null

    const rawGrowth = summary?.financialData?.revenueGrowth ?? null
    const rawMargin = summary?.financialData?.profitMargins ?? null
    const rawPE = quote.trailingPE ?? summary?.defaultKeyStatistics?.trailingPE ?? null

    const defaultGrowth = rawGrowth !== null && rawGrowth !== undefined
      ? clamp(rawGrowth, -0.5, 1.0)
      : 0.10

    const defaultMargin = rawMargin !== null && rawMargin !== undefined
      ? clamp(rawMargin, -1.0, 1.0)
      : 0.20

    const defaultPE = rawPE !== null && rawPE !== undefined && rawPE > 0
      ? clamp(rawPE, 1, 200)
      : 20

    const defaultDiscountRate = 0.10

    return {
      ticker,
      name,
      current_price: currentPrice,
      revenue_ttm: revenueTTM,
      shares_outstanding: sharesOutstanding,
      fetched_at: new Date().toISOString(),
      default_growth: parseFloat(defaultGrowth.toFixed(4)),
      default_margin: parseFloat(defaultMargin.toFixed(4)),
      default_pe: parseFloat(defaultPE.toFixed(2)),
      default_discount_rate: defaultDiscountRate,
    }
  } catch (error: any) {
    if (error.statusCode) throw error

    throw createError({
      statusCode: 404,
      statusMessage: `Impossible de récupérer les données pour le ticker '${ticker}': ${error.message || 'Ticker inconnu'}`,
    })
  }
})
