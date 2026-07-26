import YahooFinance from 'yahoo-finance2'
import { FINANCIAL_DEFAULTS } from '../../../app/utils/valuation'
import {
  clamp,
  computeGrowthCascade,
  computeMarginCascade,
  computePECascade,
  computeDiscountRateCascade,
} from '../../utils/financialCascades'

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

export default defineEventHandler(async (event) => {
  const tickerParam = getRouterParam(event, 'ticker')

  if (!tickerParam || typeof tickerParam !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le paramètre ticker est requis',
    })
  }

  let targetTicker = tickerParam.trim().toUpperCase()

  try {
    let quote: any = null
    try {
      quote = await yahooFinance.quote(targetTicker)
    } catch (err: any) {
      console.warn(`[YahooFinance] Direct quote fetch failed for ${targetTicker}:`, err?.message || err)
    }

    // Auto-Résolution si le ticker direct échoue (ex: recherche "vinci" -> résout "DG.PA")
    if (!quote || (!quote.shortName && !quote.longName && !quote.regularMarketPrice)) {
      try {
        const searchRes = await yahooFinance.search(tickerParam.trim())
        const topMatch = searchRes?.quotes?.find((q: any) => q.symbol && (q.quoteType === 'EQUITY' || q.quoteType === 'ETF' || !q.quoteType))
        if (topMatch?.symbol) {
          targetTicker = topMatch.symbol.toUpperCase()
          quote = await yahooFinance.quote(targetTicker)
        }
      } catch (err: any) {
        console.warn(`[YahooFinance Search Resolution] Failed for '${tickerParam}':`, err?.message || err)
      }
    }

    if (!quote || (!quote.shortName && !quote.longName && !quote.regularMarketPrice)) {
      throw createError({
        statusCode: 404,
        statusMessage: `Impossible de trouver l'action ou le ticker correspondant à '${tickerParam}'`,
      })
    }

    const ticker = targetTicker

    let summary: any = null
    try {
      summary = await yahooFinance.quoteSummary(ticker, {
        modules: ['earningsTrend', 'financialData', 'summaryDetail', 'defaultKeyStatistics', 'summaryProfile'],
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
    const summaryProfile = summary?.summaryProfile || {}
    const earningsTrend = summary?.earningsTrend?.trend || []

    const website = summaryProfile.website || null
    let domain: string | null = null
    if (website) {
      try {
        const parsedUrl = new URL(website.startsWith('http') ? website : `https://${website}`)
        domain = parsedUrl.hostname.replace(/^www\./, '')
      } catch {}
    }

    const revenueTTM = financialData.totalRevenue ?? null
    const sharesOutstanding = keyStats.sharesOutstanding ?? quote.sharesOutstanding ?? null
    const currency = quote.currency || summaryDetail.currency || FINANCIAL_DEFAULTS.CURRENCY

    const rawBeta = summaryDetail.beta ?? keyStats.beta ?? FINANCIAL_DEFAULTS.BETA
    const beta = typeof rawBeta === 'number' && isFinite(rawBeta) && rawBeta > 0 ? parseFloat(rawBeta.toFixed(2)) : FINANCIAL_DEFAULTS.BETA
    const defaultRiskSpread = parseFloat(clamp(0.10 + 0.05 * beta, 0.10, 0.25).toFixed(2))

    // Raw control metrics
    const marketCap = quote.marketCap ?? summaryDetail.marketCap ?? null
    const peTrailingRaw = summaryDetail.trailingPE ?? quote.trailingPE ?? keyStats.trailingPE ?? null
    const peForwardRaw = summaryDetail.forwardPE ?? keyStats.forwardPE ?? quote.forwardPE ?? null
    const marginGrossRaw = financialData.grossMargins ?? null
    const marginOperatingRaw = financialData.operatingMargins ?? null
    const marginNetRaw = keyStats.profitMargins ?? financialData.profitMargins ?? null
    const freeCashFlowRaw = financialData.freeCashflow ?? null
    const marginFcfRaw = (revenueTTM && freeCashFlowRaw && revenueTTM > 0) ? (freeCashFlowRaw / revenueTTM) : null
    const totalCash = financialData.totalCash ?? null
    const totalDebt = financialData.totalDebt ?? null

    // Target Prices
    const targetLowPrice = financialData.targetLowPrice ?? summaryDetail.targetLowPrice ?? null
    const targetMedianPrice = financialData.targetMedianPrice ?? summaryDetail.targetMedianPrice ?? null
    const targetMeanPrice = financialData.targetMeanPrice ?? summaryDetail.targetMeanPrice ?? null
    const targetHighPrice = financialData.targetHighPrice ?? summaryDetail.targetHighPrice ?? null
    const analystCount = financialData.numberOfAnalystOpinions ?? keyStats.numberOfAnalystOpinions ?? null

    const targetMeanPotential = (currentPrice && targetMeanPrice) ? (targetMeanPrice / currentPrice) - 1 : null
    const targetMedianPotential = (currentPrice && targetMedianPrice) ? (targetMedianPrice / currentPrice) - 1 : null

    // Run cascades
    const growthRes = computeGrowthCascade(earningsTrend, financialData)
    const marginRes = computeMarginCascade(marginNetRaw)
    const peRes = computePECascade(peForwardRaw, peTrailingRaw)
    const discountRes = computeDiscountRateCascade(beta)

    const auditData = {
      growth: { selected: parseFloat(growthRes.selectedGrowth.toFixed(4)), candidates: growthRes.candidates },
      margin: { selected: parseFloat(marginRes.selectedMargin.toFixed(4)), candidates: marginRes.candidates },
      pe: { selected: parseFloat(peRes.selectedPE.toFixed(2)), candidates: peRes.candidates },
      discount_rate: { selected: discountRes.selectedDiscountRate, candidates: discountRes.candidates },
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
      growth_mode: growthRes.growthMode,
      default_growth: parseFloat(growthRes.selectedGrowth.toFixed(4)),
      growth_y1: parseFloat(growthRes.g1.toFixed(4)),
      growth_y2: parseFloat(growthRes.g2.toFixed(4)),
      growth_y3: parseFloat(growthRes.g3.toFixed(4)),
      growth_y4: parseFloat(growthRes.g4.toFixed(4)),
      growth_y5: parseFloat(growthRes.g5.toFixed(4)),
      growth_source: growthRes.growthSource,
      default_margin_type: 'net_income',
      margin_mode: 'constant',
      default_margin: parseFloat(marginRes.selectedMargin.toFixed(4)),
      margin_y1: parseFloat(marginRes.selectedMargin.toFixed(4)),
      margin_y2: parseFloat(marginRes.selectedMargin.toFixed(4)),
      margin_y3: parseFloat(marginRes.selectedMargin.toFixed(4)),
      margin_y4: parseFloat(marginRes.selectedMargin.toFixed(4)),
      margin_y5: parseFloat(marginRes.selectedMargin.toFixed(4)),
      margin_source: marginRes.marginSource,
      default_target_multiple: parseFloat(peRes.selectedPE.toFixed(2)),
      pe_source: peRes.peSource,
      default_discount_rate: discountRes.selectedDiscountRate,
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
      analyst_target_low: targetLowPrice,
      analyst_target_median: targetMedianPrice,
      analyst_target_price: targetMeanPrice,
      analyst_target_high: targetHighPrice,
      analyst_target_mean_potential: targetMeanPotential,
      analyst_target_median_potential: targetMedianPotential,
      analyst_growth_estimate: (earningsTrend.find((t: any) => t.period === '+1y')?.revenueEstimate?.growth) ?? financialData.revenueGrowth,
      analyst_count: analystCount,
      website,
      domain,
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
