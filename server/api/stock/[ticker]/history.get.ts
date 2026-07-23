import YahooFinance from 'yahoo-finance2'

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

export default defineCachedEventHandler(async (event) => {
  const tickerParam = getRouterParam(event, 'ticker')

  if (!tickerParam || typeof tickerParam !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le paramètre ticker est requis',
    })
  }

  const ticker = tickerParam.trim().toUpperCase()

  try {
    const result = await yahooFinance.chart(ticker, {
      period1: '2000-01-01',
      interval: '1wk',
    })

    if (!result?.quotes?.length) {
      throw createError({
        statusCode: 404,
        statusMessage: `Aucun historique trouvé pour '${ticker}'`,
      })
    }

    let dividendYield: number | null = null
    let dividendRate: number | null = null

    try {
      const summary = await yahooFinance.quoteSummary(ticker, {
        modules: ['summaryDetail'],
      })
      dividendYield = summary.summaryDetail?.dividendYield ?? null
      dividendRate = summary.summaryDetail?.dividendRate ?? null
    } catch {}

    const history = result.quotes
      .filter((q: any) => q.close !== null && q.close !== undefined && q.date !== null && q.date !== undefined && !isNaN(q.close))
      .map((q: any) => ({
        date: typeof q.date === 'string' ? q.date.split('T')[0] : new Date(q.date).toISOString().split('T')[0],
        close: Number(q.close),
      }))

    return {
      ticker,
      currency: result.meta?.currency || 'USD',
      dividendYield,
      dividendRate,
      history,
    }
  } catch (error: any) {
    if (error && typeof error === 'object' && error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 404,
      statusMessage: error?.message || `Erreur lors de la récupération de l'historique pour '${ticker}'`,
    })
  }
}, {
  maxAge: 86400,
  swr: true,
  getKey: (event) => `history:${getRouterParam(event, 'ticker')?.toUpperCase()}`,
})
