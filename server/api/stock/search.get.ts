import YahooFinance from 'yahoo-finance2'

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

export interface StockSearchResult {
  ticker: string
  name: string
  exchange: string
  type: string
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event).q

  if (!query || typeof query !== 'string' || !query.trim()) {
    return []
  }

  const cleanQuery = query.trim()

  try {
    const res = await yahooFinance.search(cleanQuery)
    if (!res || !res.quotes || !Array.isArray(res.quotes)) {
      return []
    }

    const matches: StockSearchResult[] = res.quotes
      .filter((item: any) => item.symbol && (item.quoteType === 'EQUITY' || item.quoteType === 'ETF' || !item.quoteType))
      .slice(0, 7)
      .map((item: any) => ({
        ticker: item.symbol,
        name: item.shortname || item.longname || item.symbol,
        exchange: item.exchDisp || item.exchange || '',
        type: item.quoteType || 'EQUITY',
      }))

    return matches
  } catch (err: any) {
    console.warn(`[YahooFinance Search] Erreur pour la recherche '${cleanQuery}':`, err?.message || err)
    return []
  }
})
