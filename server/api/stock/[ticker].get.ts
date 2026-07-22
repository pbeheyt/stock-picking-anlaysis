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

    // Raw control metrics
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

    // -------------------------------------------------------------
    // CASCADE 1 : CROISSANCE (g)
    // -------------------------------------------------------------
    const trend5y = earningsTrend.find((t: any) => t.period === '+5y')
    const trend1y = earningsTrend.find((t: any) => t.period === '+1y')

    const growth5Y = trend5y?.growth ?? trend5y?.earningsEstimate?.growth
    const growth1Y = trend1y?.revenueEstimate?.growth ?? trend1y?.growth

    const valid5Y = typeof growth5Y === 'number' && isFinite(growth5Y) && growth5Y !== 0 ? growth5Y : null
    const valid1Y = typeof growth1Y === 'number' && isFinite(growth1Y) && growth1Y !== 0 ? growth1Y : null

    let selectedGrowth = 0.10
    let growthSource = 'Fallback Modèle Standard (10%)'
    let growthMode: 'cagr' | 'explicit' = 'cagr'
    let g1 = 0.10, g2 = 0.10, g3 = 0.10, g4 = 0.10, g5 = 0.10

    const growthCandidates: any[] = []

    if (valid5Y !== null) {
      selectedGrowth = valid5Y
      growthSource = 'Consensus Analystes 5-Year CAGR'
      growthCandidates.push({
        name: 'Consensus 5Y CAGR',
        value: parseFloat(valid5Y.toFixed(4)),
        status: 'selected',
        note: 'Consensus Analystes 5-Year CAGR',
      })
      growthCandidates.push({
        name: 'Consensus 1Y (NTM)',
        value: valid1Y !== null ? parseFloat(valid1Y.toFixed(4)) : null,
        status: 'ignored',
        note: 'Non requis',
      })
      growthCandidates.push({
        name: 'Fallback Standard (10%)',
        value: 0.10,
        status: 'ignored',
        note: 'Non requis',
      })
    } else if (valid1Y !== null) {
      selectedGrowth = valid1Y
      growthSource = 'Consensus Analystes +1Y (NTM)'
      growthCandidates.push({
        name: 'Consensus 5Y CAGR',
        value: null,
        status: 'rejected',
        note: 'Non disponible',
      })
      growthCandidates.push({
        name: 'Consensus 1Y (NTM)',
        value: parseFloat(valid1Y.toFixed(4)),
        status: 'selected',
        note: 'Consensus Analystes +1Y (NTM)',
      })
      growthCandidates.push({
        name: 'Fallback Standard (10%)',
        value: 0.10,
        status: 'ignored',
        note: 'Non requis',
      })
    } else {
      selectedGrowth = 0.10
      growthSource = 'Fallback Modèle Standard (10%)'
      growthCandidates.push({
        name: 'Consensus 5Y CAGR',
        value: null,
        status: 'rejected',
        note: 'Non disponible',
      })
      growthCandidates.push({
        name: 'Consensus 1Y (NTM)',
        value: null,
        status: 'rejected',
        note: 'Non disponible',
      })
      growthCandidates.push({
        name: 'Fallback Standard (10%)',
        value: 0.10,
        status: 'fallback',
        note: '⚠️ Valeur par défaut : 10.0%',
      })
    }

    g1 = selectedGrowth
    if (selectedGrowth > 0.20) {
      growthMode = 'explicit'
      g2 = parseFloat((0.50 * selectedGrowth).toFixed(4))
      g3 = 0.30
      g4 = 0.20
      g5 = 0.15
      growthSource = `Consensus > 20% (${(selectedGrowth * 100).toFixed(0)}%) -> Mode Sur-Mesure`
    } else {
      growthMode = 'cagr'
      g2 = selectedGrowth
      g3 = selectedGrowth
      g4 = selectedGrowth
      g5 = selectedGrowth
    }

    // -------------------------------------------------------------
    // CASCADE 2 : MARGE NETTE (m)
    // -------------------------------------------------------------
    let selectedMargin = 0.15
    let marginSource = 'Fallback Modèle Standard (15%)'
    const marginCandidates: any[] = []

    if (typeof marginNetRaw === 'number' && isFinite(marginNetRaw) && marginNetRaw > 0) {
      selectedMargin = clamp(marginNetRaw, 0.01, 0.60)
      marginSource = 'Marge Nette TTM Réelle'
      marginCandidates.push({
        name: 'Marge Nette TTM Réelle',
        value: parseFloat(marginNetRaw.toFixed(4)),
        status: 'selected',
        note: 'Marge Nette TTM Réelle',
      })
      marginCandidates.push({
        name: 'Fallback Standard (15%)',
        value: 0.15,
        status: 'ignored',
        note: 'Non requis',
      })
    } else {
      selectedMargin = 0.15
      marginSource = 'Fallback Modèle Standard (15%)'
      marginCandidates.push({
        name: 'Marge Nette TTM Réelle',
        value: marginNetRaw !== null ? parseFloat(marginNetRaw.toFixed(4)) : null,
        status: 'rejected',
        note: 'Rejeté : Non disponible ou négatif',
      })
      marginCandidates.push({
        name: 'Fallback Standard (15%)',
        value: 0.15,
        status: 'fallback',
        note: '⚠️ Boîte déficitaire : Marge cible par défaut à 15.0%',
      })
    }

    // -------------------------------------------------------------
    // CASCADE 3 : MULTIPLE EXIT (P/E)
    // -------------------------------------------------------------
    let selectedPE = 20.0
    let peSource = 'Multiple par Défaut (20.0x)'
    const peCandidates: any[] = []

    if (typeof peForwardRaw === 'number' && isFinite(peForwardRaw) && peForwardRaw > 0) {
      selectedPE = clamp(peForwardRaw, 5, 120)
      peSource = 'Consensus Forward P/E'
      peCandidates.push({
        name: 'Forward P/E',
        value: parseFloat(peForwardRaw.toFixed(2)),
        status: 'selected',
        note: 'Consensus Forward P/E',
      })
      peCandidates.push({
        name: 'Trailing P/E',
        value: peTrailingRaw !== null ? parseFloat(peTrailingRaw.toFixed(2)) : null,
        status: 'ignored',
        note: 'Non requis',
      })
      peCandidates.push({
        name: 'Multiple par Défaut (20.0x)',
        value: 20.0,
        status: 'ignored',
        note: 'Non requis',
      })
    } else if (typeof peTrailingRaw === 'number' && isFinite(peTrailingRaw) && peTrailingRaw > 0) {
      selectedPE = clamp(peTrailingRaw, 5, 120)
      peSource = 'P/E Trailing TTM'
      peCandidates.push({
        name: 'Forward P/E',
        value: null,
        status: 'rejected',
        note: 'Non disponible',
      })
      peCandidates.push({
        name: 'Trailing P/E',
        value: parseFloat(peTrailingRaw.toFixed(2)),
        status: 'selected',
        note: 'P/E Trailing TTM',
      })
      peCandidates.push({
        name: 'Multiple par Défaut (20.0x)',
        value: 20.0,
        status: 'ignored',
        note: 'Non requis',
      })
    } else {
      selectedPE = 20.0
      peSource = 'Multiple par Défaut (20.0x)'
      peCandidates.push({
        name: 'Forward P/E',
        value: null,
        status: 'rejected',
        note: 'Non disponible',
      })
      peCandidates.push({
        name: 'Trailing P/E',
        value: peTrailingRaw !== null ? parseFloat(peTrailingRaw.toFixed(2)) : null,
        status: 'rejected',
        note: 'Rejeté : Bénéfice Négatif ou non disponible',
      })
      peCandidates.push({
        name: 'Multiple par Défaut (20.0x)',
        value: 20.0,
        status: 'fallback',
        note: '⚠️ Boîte non rentable / P/E absent : Multiple par défaut à 20.0x',
      })
    }

    const defaultDiscountRate = 0.10

    const auditData = {
      growth: {
        selected: parseFloat(selectedGrowth.toFixed(4)),
        candidates: growthCandidates,
      },
      margin: {
        selected: parseFloat(selectedMargin.toFixed(4)),
        candidates: marginCandidates,
      },
      pe: {
        selected: parseFloat(selectedPE.toFixed(2)),
        candidates: peCandidates,
      },
    }

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
      default_growth: parseFloat(selectedGrowth.toFixed(4)),
      growth_y1: parseFloat(g1.toFixed(4)),
      growth_y2: parseFloat(g2.toFixed(4)),
      growth_y3: parseFloat(g3.toFixed(4)),
      growth_y4: parseFloat(g4.toFixed(4)),
      growth_y5: parseFloat(g5.toFixed(4)),
      growth_source: growthSource,
      default_margin_type: 'net_income',
      default_margin: parseFloat(selectedMargin.toFixed(4)),
      margin_source: marginSource,
      default_target_multiple: parseFloat(selectedPE.toFixed(2)),
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
      analyst_growth_estimate: valid1Y ?? valid5Y,
      audit_data: auditData,
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
