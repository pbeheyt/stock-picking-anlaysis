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
      statusMessage: 'Le paramètre ticker est requis',
    })
  }

  const ticker = tickerParam.trim().toUpperCase()

  try {
    let quote: any = null
    try {
      quote = await yahooFinance.quote(ticker)
    } catch (err: any) {
      console.warn(`[YahooFinance] Quote fetch failed for ${ticker}:`, err?.message || err)
    }

    if (!quote || (!quote.shortName && !quote.longName && !quote.regularMarketPrice)) {
      throw createError({
        statusCode: 404,
        statusMessage: `Ticker '${ticker}' non trouvé ou données indisponibles`,
      })
    }

    let summary: any = null
    try {
      summary = await yahooFinance.quoteSummary(ticker, {
        modules: ['financialData', 'defaultKeyStatistics'],
      })
    } catch (err: any) {
      console.warn(`[YahooFinance] QuoteSummary fetch failed for ${ticker}:`, err?.message || err)
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
    if (error && typeof error === 'object' && error.statusCode && error.statusMessage && !error.response) {
      throw error
    }

    const statusCode = typeof error?.statusCode === 'number' && error.statusCode >= 400 && error.statusCode < 600
      ? error.statusCode
      : 404

    const statusMessage = error?.statusMessage || error?.message || `Impossible de récupérer les données pour le ticker '${ticker}'`

    throw createError({
      statusCode,
      statusMessage: String(statusMessage),
    })
  }
})

