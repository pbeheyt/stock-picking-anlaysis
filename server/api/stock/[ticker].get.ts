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
    const currency = quote.currency || summaryDetail.currency || 'USD'

    const rawBeta = summaryDetail.beta ?? keyStats.beta ?? 1.0
    const beta = typeof rawBeta === 'number' && isFinite(rawBeta) && rawBeta > 0 ? parseFloat(rawBeta.toFixed(2)) : 1.0
    const defaultRiskSpread = parseFloat(clamp(0.20 * beta, 0.10, 0.50).toFixed(2))

    // Raw metrics pour le Sourcing & Transparence
    const marketCap = quote.marketCap ?? summaryDetail.marketCap ?? null
    const peTrailingRaw = quote.trailingPE ?? summaryDetail.trailingPE ?? keyStats.trailingPE ?? null
    const peForwardRaw = summaryDetail.forwardPE ?? keyStats.forwardPE ?? quote.forwardPE ?? null
    const marginGrossRaw = financialData.grossMargins ?? null
    const marginOperatingRaw = financialData.operatingMargins ?? null
    const marginNetRaw = financialData.profitMargins ?? null
    const freeCashFlowRaw = financialData.freeCashflow ?? null
    const marginFcfRaw = (revenueTTM && freeCashFlowRaw && revenueTTM > 0) ? (freeCashFlowRaw / revenueTTM) : null
    const totalCash = financialData.totalCash ?? null
    const totalDebt = financialData.totalDebt ?? null
    const analystTargetPrice = financialData.targetMeanPrice ?? summaryDetail.targetMeanPrice ?? null

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
    const analystGrowthEstimate = typeof analystGrowth === 'number' && isFinite(analystGrowth) ? analystGrowth : null

    if (typeof analystGrowth === 'number' && isFinite(analystGrowth) && analystGrowth !== 0) {
      defaultGrowth = analystGrowth
      growthSource = 'Consensus Analystes (+1y)'
      g1 = analystGrowth

      if (analystGrowth > 0.30) {
        growthMode = 'explicit'
        g2 = parseFloat((0.50 * analystGrowth).toFixed(4))
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

    // 2. Multiple P/E ou P/FCF de sortie (default_target_multiple) & source
    let defaultTargetMultiple = 20.0
    let peSource = 'Modèle Standard (20x)'

    const forwardPE = peForwardRaw
    const trailingPE = peTrailingRaw

    if (typeof forwardPE === 'number' && isFinite(forwardPE) && forwardPE > 0) {
      defaultTargetMultiple = clamp(forwardPE, 5, 120)
      peSource = 'Consensus P/E Forward'
    } else if (typeof trailingPE === 'number' && isFinite(trailingPE) && trailingPE > 0) {
      defaultTargetMultiple = clamp(trailingPE, 5, 120)
      peSource = 'P/E Trailing (TTM)'
    } else {
      const gComp = growthMode === 'explicit' ? g1 : defaultGrowth
      if (gComp > 0.30) {
        defaultTargetMultiple = 35.0
      } else if (gComp > 0.15) {
        defaultTargetMultiple = 25.0
      } else {
        defaultTargetMultiple = 18.0
      }
      peSource = 'Profil de Croissance (Non rentable)'
    }

    // 3. Marge & Nature de Marge (default_margin_type) & source
    let defaultMargin = 0.20
    let marginSource = 'Modèle Standard (20%)'
    let defaultMarginType: 'net_income' | 'fcf' = 'net_income'

    if (marginFcfRaw !== null && isFinite(marginFcfRaw) && marginFcfRaw > 0) {
      defaultMargin = clamp(marginFcfRaw, 0.01, 0.60)
      marginSource = 'Marge FCF TTM'
      defaultMarginType = 'fcf'
    } else if (typeof marginOperatingRaw === 'number' && isFinite(marginOperatingRaw) && marginOperatingRaw > 0) {
      defaultMargin = clamp(marginOperatingRaw, 0.01, 0.60)
      marginSource = 'Marge Opératoire TTM'
    } else if (typeof marginNetRaw === 'number' && isFinite(marginNetRaw) && marginNetRaw > 0 && (marginOperatingRaw === null || marginOperatingRaw >= 0)) {
      defaultMargin = clamp(marginNetRaw, 0.01, 0.60)
      marginSource = 'Marge Nette TTM'
    } else if (typeof marginGrossRaw === 'number' && isFinite(marginGrossRaw) && marginGrossRaw > 0) {
      defaultMargin = clamp(marginGrossRaw * 0.45, 0.05, 0.50)
      marginSource = 'Cible Maturité (45% Marge Brute)'
    }

    const defaultDiscountRate = 0.10

    return {
      ticker,
      name,
      currency,
      current_price: currentPrice,
      revenue_ttm: revenueTTM,
      shares_outstanding: sharesOutstanding,
      beta,
      fetched_at: new Date().toISOString(),
      growth_mode: growthMode,
      default_growth: parseFloat(defaultGrowth.toFixed(4)),
      growth_y1: parseFloat(g1.toFixed(4)),
      growth_y2: parseFloat(g2.toFixed(4)),
      growth_y3: parseFloat(g3.toFixed(4)),
      growth_y4: parseFloat(g4.toFixed(4)),
      growth_y5: parseFloat(g5.toFixed(4)),
      growth_source: growthSource,
      default_margin_type: defaultMarginType,
      default_margin: parseFloat(defaultMargin.toFixed(4)),
      margin_source: marginSource,
      default_target_multiple: parseFloat(defaultTargetMultiple.toFixed(2)),
      pe_source: peSource,
      default_discount_rate: defaultDiscountRate,
      default_risk_spread: defaultRiskSpread,
      market_cap: marketCap,
      pe_trailing_raw: peTrailingRaw,
      pe_forward_raw: peForwardRaw,
      margin_gross_raw: marginGrossRaw,
      margin_operating_raw: marginOperatingRaw,
      margin_net_raw: marginNetRaw,
      margin_fcf_raw: marginFcfRaw,
      total_cash: totalCash,
      total_debt: totalDebt,
      free_cash_flow_raw: freeCashFlowRaw,
      analyst_target_price: analystTargetPrice,
      analyst_growth_estimate: analystGrowthEstimate,
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
