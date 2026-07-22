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
        modules: ['earningsTrend', 'financialData', 'summaryDetail', 'defaultKeyStatistics'],
      })
    } catch (err: any) {
      console.warn(`[YahooFinance] QuoteSummary fetch failed for ${ticker}:`, err?.message || err)
      summary = {}
    }

    const name = quote.shortName || quote.longName || ticker
    const currentPrice = quote.regularMarketPrice ?? null

    const financialData = summary?.financialData || {}
    const summaryDetail = summary?.summaryDetail || {}
    const keyStats = summary?.defaultKeyStatistics || {}
    const earningsTrend = summary?.earningsTrend?.trend || []

    const revenueTTM = financialData.totalRevenue ?? null
    const sharesOutstanding = keyStats.sharesOutstanding ?? quote.sharesOutstanding ?? null

    // 1. Croissance CA & Mode explicit vs CAGR
    let defaultGrowth = 0.10
    let growthSource = 'Modèle Standard (10%)'
    let growthMode: 'cagr' | 'explicit' = 'cagr'

    let g1 = 0.10
    let g2 = 0.10
    let g3 = 0.10
    let g4 = 0.10
    let g5 = 0.10

    const trend1y = earningsTrend.find((t: any) => t.period === '+1y')
    const trend5y = earningsTrend.find((t: any) => t.period === '+5y')
    const analystGrowth = trend1y?.revenueEstimate?.growth ?? trend1y?.growth ?? trend5y?.growth

    if (typeof analystGrowth === 'number' && isFinite(analystGrowth) && analystGrowth !== 0) {
      defaultGrowth = analystGrowth
      growthSource = 'Consensus Analystes (+1y)'
      g1 = analystGrowth

      if (analystGrowth > 0.30) {
        growthMode = 'explicit'
        g2 = 0.50
        g3 = 0.30
        g4 = 0.20
        g5 = 0.15
        growthSource = 'Consensus NTM > 30% -> Mode Sur-Mesure'
      } else {
        g2 = defaultGrowth
        g3 = defaultGrowth
        g4 = defaultGrowth
        g5 = defaultGrowth
      }
    } else if (typeof financialData.revenueGrowth === 'number' && isFinite(financialData.revenueGrowth)) {
      defaultGrowth = clamp(financialData.revenueGrowth, -0.5, 0.8)
      growthSource = 'Historique TTM'
      g1 = defaultGrowth
      g2 = defaultGrowth
      g3 = defaultGrowth
      g4 = defaultGrowth
      g5 = defaultGrowth
    } else {
      const price = currentPrice ?? 0
      const rev = revenueTTM ?? 0
      const shares = sharesOutstanding ?? 0
      if (price > 0 && rev > 0 && shares > 0) {
        const p5 = price * Math.pow(1.10, 5)
        const e5 = (p5 * shares) / 25
        const r5 = e5 / 0.20
        const gImplied = Math.pow(r5 / rev, 1 / 5) - 1
        if (isFinite(gImplied) && gImplied > -0.5 && gImplied < 1.0) {
          defaultGrowth = clamp(gImplied, -0.5, 0.8)
          growthSource = 'Croissance Implicite du Marché'
        }
      }
      g1 = defaultGrowth
      g2 = defaultGrowth
      g3 = defaultGrowth
      g4 = defaultGrowth
      g5 = defaultGrowth
    }

    // 2. Multiple P/E de sortie (defaultPE) & source
    let defaultPE = 20
    let peSource = 'Modèle Standard (20x)'

    const forwardPE = summaryDetail.forwardPE ?? keyStats.forwardPE ?? quote.forwardPE
    const trailingPE = quote.trailingPE ?? summaryDetail.trailingPE ?? keyStats.trailingPE

    if (typeof forwardPE === 'number' && isFinite(forwardPE) && forwardPE > 0) {
      defaultPE = clamp(forwardPE, 5, 120)
      peSource = 'Consensus P/E Forward'
    } else if (typeof trailingPE === 'number' && isFinite(trailingPE) && trailingPE > 0) {
      defaultPE = clamp(trailingPE, 5, 120)
      peSource = 'P/E Trailing (TTM)'
    } else {
      const gComp = growthMode === 'explicit' ? g1 : defaultGrowth
      if (gComp > 0.30) {
        defaultPE = 35
      } else if (gComp > 0.15) {
        defaultPE = 25
      } else {
        defaultPE = 18
      }
      peSource = 'Profil de Croissance (Non rentable)'
    }

    // 3. Marge Op / Nette / FCF (defaultMargin) & source
    let defaultMargin = 0.20
    let marginSource = 'Modèle Standard (20%)'

    const totalRev = revenueTTM
    const fcf = financialData.freeCashflow
    const fcfMargin = (totalRev && fcf && totalRev > 0) ? (fcf / totalRev) : null
    const opMargin = financialData.operatingMargins
    const netMargin = financialData.profitMargins
    const grossMargin = financialData.grossMargins

    if (fcfMargin !== null && isFinite(fcfMargin) && fcfMargin > 0) {
      defaultMargin = clamp(fcfMargin, 0.01, 0.60)
      marginSource = 'Marge FCF TTM'
    } else if (typeof opMargin === 'number' && isFinite(opMargin) && opMargin > 0) {
      defaultMargin = clamp(opMargin, 0.01, 0.60)
      marginSource = 'Marge Opératoire TTM'
    } else if (typeof netMargin === 'number' && isFinite(netMargin) && netMargin > 0 && (opMargin === undefined || opMargin >= 0)) {
      defaultMargin = clamp(netMargin, 0.01, 0.60)
      marginSource = 'Marge Nette TTM'
    } else if (typeof grossMargin === 'number' && isFinite(grossMargin) && grossMargin > 0) {
      defaultMargin = clamp(grossMargin * 0.45, 0.05, 0.50)
      marginSource = 'Cible Maturité (45% Marge Brute)'
    }

    const defaultDiscountRate = 0.10

    return {
      ticker,
      name,
      current_price: currentPrice,
      revenue_ttm: revenueTTM,
      shares_outstanding: sharesOutstanding,
      fetched_at: new Date().toISOString(),
      growth_mode: growthMode,
      default_growth: parseFloat(defaultGrowth.toFixed(4)),
      growth_y1: parseFloat(g1.toFixed(4)),
      growth_y2: parseFloat(g2.toFixed(4)),
      growth_y3: parseFloat(g3.toFixed(4)),
      growth_y4: parseFloat(g4.toFixed(4)),
      growth_y5: parseFloat(g5.toFixed(4)),
      growth_source: growthSource,
      default_margin: parseFloat(defaultMargin.toFixed(4)),
      margin_source: marginSource,
      default_pe: parseFloat(defaultPE.toFixed(2)),
      pe_source: peSource,
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
