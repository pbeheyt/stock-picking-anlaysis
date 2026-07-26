import type { Stock, GrowthMode, MarginMode, AuditData, StockStatus } from '~/types/database.types'
import {
  computeScenarios,
  computeReverseDCF,
  build5YearProjections,
  FINANCIAL_DEFAULTS,
  type ValuationInputs,
  type ScenarioResults,
  type ReverseDCFResult,
} from '~/utils/valuation'
import { formatPercent } from '~/utils/format'

export function useStockWorkspace(tickerParam: Ref<string>) {
  const toast = useToast()

  const isLoading = ref(true)
  const isSaving = ref(false)
  const errorMessage = ref<string | null>(null)
  const stock = ref<Stock | null>(null)

  // Local Editable Hypotheses
  const growthMode = ref<GrowthMode>(FINANCIAL_DEFAULTS.GROWTH_MODE)
  const growth = ref<number>(FINANCIAL_DEFAULTS.GROWTH_RATE)
  const growthY1 = ref<number>(FINANCIAL_DEFAULTS.GROWTH_RATE)
  const growthY2 = ref<number>(FINANCIAL_DEFAULTS.GROWTH_RATE)
  const growthY3 = ref<number>(FINANCIAL_DEFAULTS.GROWTH_RATE)
  const growthY4 = ref<number>(FINANCIAL_DEFAULTS.GROWTH_RATE)
  const growthY5 = ref<number>(FINANCIAL_DEFAULTS.GROWTH_RATE)

  const marginMode = ref<MarginMode>(FINANCIAL_DEFAULTS.MARGIN_MODE)
  const margin = ref<number>(FINANCIAL_DEFAULTS.PROJECTED_MARGIN)
  const marginY1 = ref<number>(FINANCIAL_DEFAULTS.PROJECTED_MARGIN)
  const marginY2 = ref<number>(FINANCIAL_DEFAULTS.PROJECTED_MARGIN)
  const marginY3 = ref<number>(FINANCIAL_DEFAULTS.PROJECTED_MARGIN)
  const marginY4 = ref<number>(FINANCIAL_DEFAULTS.PROJECTED_MARGIN)
  const marginY5 = ref<number>(FINANCIAL_DEFAULTS.PROJECTED_MARGIN)

  const targetMultiple = ref<number>(FINANCIAL_DEFAULTS.TARGET_MULTIPLE)
  const discountRate = ref<number>(FINANCIAL_DEFAULTS.DISCOUNT_RATE)
  const riskSpread = ref<number>(FINANCIAL_DEFAULTS.RISK_SPREAD)

  const initFormValues = (s: Stock) => {
    growthMode.value = s.growth_mode || FINANCIAL_DEFAULTS.GROWTH_MODE
    growth.value = s.projected_growth ?? FINANCIAL_DEFAULTS.GROWTH_RATE
    growthY1.value = s.growth_y1 ?? FINANCIAL_DEFAULTS.GROWTH_RATE
    growthY2.value = s.growth_y2 ?? FINANCIAL_DEFAULTS.GROWTH_RATE
    growthY3.value = s.growth_y3 ?? FINANCIAL_DEFAULTS.GROWTH_RATE
    growthY4.value = s.growth_y4 ?? FINANCIAL_DEFAULTS.GROWTH_RATE
    growthY5.value = s.growth_y5 ?? FINANCIAL_DEFAULTS.GROWTH_RATE

    marginMode.value = s.margin_mode || FINANCIAL_DEFAULTS.MARGIN_MODE
    margin.value = s.projected_margin ?? FINANCIAL_DEFAULTS.PROJECTED_MARGIN
    marginY1.value = s.margin_y1 ?? s.projected_margin ?? FINANCIAL_DEFAULTS.PROJECTED_MARGIN
    marginY2.value = s.margin_y2 ?? s.projected_margin ?? FINANCIAL_DEFAULTS.PROJECTED_MARGIN
    marginY3.value = s.margin_y3 ?? s.projected_margin ?? FINANCIAL_DEFAULTS.PROJECTED_MARGIN
    marginY4.value = s.margin_y4 ?? s.projected_margin ?? FINANCIAL_DEFAULTS.PROJECTED_MARGIN
    marginY5.value = s.margin_y5 ?? s.projected_margin ?? FINANCIAL_DEFAULTS.PROJECTED_MARGIN

    targetMultiple.value = s.target_multiple ?? FINANCIAL_DEFAULTS.TARGET_MULTIPLE
    discountRate.value = s.discount_rate ?? FINANCIAL_DEFAULTS.DISCOUNT_RATE
    riskSpread.value = s.risk_spread ?? FINANCIAL_DEFAULTS.RISK_SPREAD
  }

  const loadStockData = async () => {
    isLoading.value = true
    errorMessage.value = null
    try {
      const allStocks = await $fetch<Stock[]>('/api/stocks')
      let found = allStocks.find(s => s.ticker === tickerParam.value)

      if (!found) {
        const apiData = await $fetch<any>(`/api/stock/${encodeURIComponent(tickerParam.value)}`)
        found = {
          id: `temp-${apiData.ticker}`,
          ticker: apiData.ticker,
          name: apiData.name,
          currency: apiData.currency,
          current_price: apiData.current_price,
          revenue_ttm: apiData.revenue_ttm,
          shares_outstanding: apiData.shares_outstanding,
          beta: apiData.beta,
          fetched_at: apiData.fetched_at,
          status: 'watchlist',
          margin_type: FINANCIAL_DEFAULTS.MARGIN_TYPE,
          growth_mode: apiData.growth_mode,
          projected_growth: apiData.default_growth,
          growth_y1: apiData.growth_y1,
          growth_y2: apiData.growth_y2,
          growth_y3: apiData.growth_y3,
          growth_y4: apiData.growth_y4,
          growth_y5: apiData.growth_y5,
          revenue_y1: null,
          revenue_y2: null,
          revenue_y3: null,
          revenue_y4: null,
          revenue_y5: null,
          margin_mode: apiData.margin_mode || FINANCIAL_DEFAULTS.MARGIN_MODE,
          projected_margin: apiData.default_margin,
          margin_y1: apiData.margin_y1 ?? apiData.default_margin,
          margin_y2: apiData.margin_y2 ?? apiData.default_margin,
          margin_y3: apiData.margin_y3 ?? apiData.default_margin,
          margin_y4: apiData.margin_y4 ?? apiData.default_margin,
          margin_y5: apiData.margin_y5 ?? apiData.default_margin,
          target_multiple: apiData.default_target_multiple,
          discount_rate: apiData.default_discount_rate,
          risk_spread: apiData.default_risk_spread,
          market_cap: apiData.market_cap,
          pe_trailing_raw: apiData.pe_trailing_raw,
          pe_forward_raw: apiData.pe_forward_raw,
          margin_gross_raw: apiData.margin_gross_raw,
          margin_operating_raw: apiData.margin_operating_raw,
          margin_net_raw: apiData.margin_net_raw,
          margin_fcf_raw: apiData.margin_fcf_raw,
          total_cash: apiData.total_cash,
          total_debt: apiData.total_debt,
          free_cash_flow_raw: apiData.free_cash_flow_raw,
          analyst_target_price: apiData.analyst_target_price,
          analyst_target_median: apiData.analyst_target_median,
          analyst_target_low: apiData.analyst_target_low,
          analyst_target_high: apiData.analyst_target_high,
          analyst_growth_estimate: apiData.analyst_growth_estimate,
          analyst_count: apiData.analyst_count,
          audit_data: apiData.audit_data,
          thesis: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }

      stock.value = found
      initFormValues(found)
    } catch (err: any) {
      if (!stock.value) {
        const msg = err.data?.statusMessage || err.message || `Impossible de charger les données pour ${tickerParam.value}`
        errorMessage.value = `Erreur : ${msg}`
      } else {
        toast.error(`Impossible de rafraîchir ${tickerParam.value}. Les données affichées ont été conservées.`)
      }
    } finally {
      isLoading.value = false
    }
  }

  const saveHypotheses = async (quiet = false) => {
    if (!stock.value) return
    if (!quiet) isSaving.value = true
    try {
      const updated = await $fetch<Stock>(`/api/stocks/${stock.value.id}`, {
        method: 'PUT',
        body: {
          growth_rate: Number(growth.value),
          growth_mode: growthMode.value,
          growth_y1: Number(growthY1.value),
          growth_y2: Number(growthY2.value),
          growth_y3: Number(growthY3.value),
          growth_y4: Number(growthY4.value),
          growth_y5: Number(growthY5.value),
          margin_type: FINANCIAL_DEFAULTS.MARGIN_TYPE,
          projected_margin: Number(margin.value),
          margin_mode: marginMode.value,
          margin_y1: Number(marginY1.value),
          margin_y2: Number(marginY2.value),
          margin_y3: Number(marginY3.value),
          margin_y4: Number(marginY4.value),
          margin_y5: Number(marginY5.value),
          target_multiple: Number(targetMultiple.value),
          discount_rate: Number(discountRate.value),
          risk_spread: Number(riskSpread.value),
        },
      })
      stock.value = { ...stock.value, ...updated }
      if (!quiet) {
        toast.success('Hypothèses de valorisation sauvegardées avec succès.')
      }
    } catch (err: any) {
      console.error('Erreur sauvegarde hypothèses:', err)
      toast.error('Échec de la sauvegarde des hypothèses DCF.')
    } finally {
      if (!quiet) isSaving.value = false
    }
  }

  const toggleStatus = async () => {
    if (!stock.value) return
    const newStatus: StockStatus = stock.value.status === 'portfolio' ? 'watchlist' : 'portfolio'
    try {
      const updated = await $fetch<Stock>(`/api/stocks/${stock.value.id}`, {
        method: 'PUT',
        body: { status: newStatus },
      })
      stock.value.status = updated.status
    } catch (err: any) {
      console.error('Erreur bascule de statut:', err)
    }
  }

  // Valuation Computation Inputs
  const valuationInputs = computed<ValuationInputs>(() => ({
    currentPrice: stock.value?.current_price ?? 0,
    revenueTTM: stock.value?.revenue_ttm ?? 0,
    sharesOutstanding: stock.value?.shares_outstanding ?? 0,
    growthMode: growthMode.value,
    growth: growth.value,
    growthY1: growthY1.value,
    growthY2: growthY2.value,
    growthY3: growthY3.value,
    growthY4: growthY4.value,
    growthY5: growthY5.value,
    marginType: FINANCIAL_DEFAULTS.MARGIN_TYPE,
    marginMode: marginMode.value,
    margin: margin.value,
    marginY1: marginY1.value,
    marginY2: marginY2.value,
    marginY3: marginY3.value,
    marginY4: marginY4.value,
    marginY5: marginY5.value,
    targetMultiple: targetMultiple.value,
    discountRate: discountRate.value,
    riskSpread: riskSpread.value,
  }))

  // Auto-save debounced (1200ms)
  let autoSaveTimer: ReturnType<typeof setTimeout> | null = null

  watch(valuationInputs, () => {
    if (autoSaveTimer) clearTimeout(autoSaveTimer)
    autoSaveTimer = setTimeout(() => {
      saveHypotheses(true)
    }, 1200)
  }, { deep: true })

  onUnmounted(() => {
    if (autoSaveTimer) clearTimeout(autoSaveTimer)
  })

  const scenarios = computed<ScenarioResults>(() => computeScenarios(valuationInputs.value))
  const reverseDCF = computed<ReverseDCFResult>(() => computeReverseDCF(valuationInputs.value))

  const fairValue = computed(() => scenarios.value.base.fairValue)
  const marginOfSafety = computed(() => scenarios.value.base.marginOfSafety)
  const isUndervalued = computed(() => fairValue.value >= (stock.value?.current_price ?? 0))

  const badgeConfig = computed(() => {
    const mos = marginOfSafety.value
    if (mos > 15) return { label: 'Sous-évaluée', class: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' }
    if (mos >= 0) return { label: 'Fair Value', class: 'bg-amber-500/15 text-amber-400 border-amber-500/30' }
    return { label: 'Surévaluée', class: 'bg-rose-500/15 text-rose-400 border-rose-500/30' }
  })

  // Projections P&L 5 ans
  const revenueProjections = computed(() => {
    return build5YearProjections(
      stock.value?.revenue_ttm ?? 0,
      growthMode.value,
      growth.value,
      [growthY1.value, growthY2.value, growthY3.value, growthY4.value, growthY5.value],
      marginMode.value,
      margin.value,
      [marginY1.value, marginY2.value, marginY3.value, marginY4.value, marginY5.value]
    )
  })

  // Handlers d'édition
  const handleUpdateGrowthY = (yearIndex: number, newRate: number) => {
    if (growthMode.value === 'cagr') {
      growthY1.value = growth.value
      growthY2.value = growth.value
      growthY3.value = growth.value
      growthY4.value = growth.value
      growthY5.value = growth.value
      growthMode.value = 'explicit'
    }

    if (yearIndex === 0) growthY1.value = newRate
    else if (yearIndex === 1) growthY2.value = newRate
    else if (yearIndex === 2) growthY3.value = newRate
    else if (yearIndex === 3) growthY4.value = newRate
    else if (yearIndex === 4) growthY5.value = newRate
  }

  const handleUpdateMarginY = (yearIndex: number, newMargin: number) => {
    if (marginMode.value === 'constant') {
      marginY1.value = margin.value
      marginY2.value = margin.value
      marginY3.value = margin.value
      marginY4.value = margin.value
      marginY5.value = margin.value
      marginMode.value = 'explicit'
    }

    if (yearIndex === 0) marginY1.value = newMargin
    else if (yearIndex === 1) marginY2.value = newMargin
    else if (yearIndex === 2) marginY3.value = newMargin
    else if (yearIndex === 3) marginY4.value = newMargin
    else if (yearIndex === 4) {
      marginY5.value = newMargin
      margin.value = newMargin
    }
  }

  const handleUpdateRevenueForYear = (yearIndex: number, newRevenueVal: number) => {
    const baseRev = stock.value?.revenue_ttm ?? 0
    if (newRevenueVal <= 0 || isNaN(newRevenueVal)) return

    let prevRev = baseRev
    if (yearIndex > 0) {
      const currentProjections = revenueProjections.value
      if (currentProjections[yearIndex - 1]) {
        prevRev = currentProjections[yearIndex - 1].revenue
      }
    }

    if (prevRev > 0) {
      const impliedGrowth = (newRevenueVal / prevRev) - 1
      if (growthMode.value === 'cagr') {
        if (baseRev > 0) {
          const impliedCagr = Math.pow(newRevenueVal / baseRev, 1 / (yearIndex + 1)) - 1
          growth.value = impliedCagr
        }
      } else {
        if (yearIndex === 0) growthY1.value = impliedGrowth
        else if (yearIndex === 1) growthY2.value = impliedGrowth
        else if (yearIndex === 2) growthY3.value = impliedGrowth
        else if (yearIndex === 3) growthY4.value = impliedGrowth
        else if (yearIndex === 4) growthY5.value = impliedGrowth
      }
    }
  }

  const handlePropagateGrowth = (yearIndex: number, currentRate: number) => {
    growthMode.value = 'explicit'
    const refs = [growthY1, growthY2, growthY3, growthY4, growthY5]
    for (let i = yearIndex; i < 5; i++) {
      refs[i].value = currentRate
    }
  }

  const handlePropagateMargin = (yearIndex: number, currentMargin: number) => {
    marginMode.value = 'explicit'
    const refs = [marginY1, marginY2, marginY3, marginY4, marginY5]
    for (let i = yearIndex; i < 5; i++) {
      refs[i].value = currentMargin
    }
    margin.value = marginY5.value
  }

  const parsedAuditData = computed<AuditData | null>(() => {
    if (!stock.value?.audit_data) return null
    return safeJsonParse<AuditData | null>(stock.value.audit_data, null)
  })

  return {
    stock,
    isLoading,
    isSaving,
    errorMessage,
    loadStockData,
    saveHypotheses,
    toggleStatus,
    growthMode,
    growth,
    growthY1,
    growthY2,
    growthY3,
    growthY4,
    growthY5,
    marginMode,
    margin,
    marginY1,
    marginY2,
    marginY3,
    marginY4,
    marginY5,
    targetMultiple,
    discountRate,
    riskSpread,
    valuationInputs,
    scenarios,
    reverseDCF,
    fairValue,
    marginOfSafety,
    isUndervalued,
    badgeConfig,
    revenueProjections,
    parsedAuditData,
    handleUpdateGrowthY,
    handleUpdateMarginY,
    handleUpdateRevenueForYear,
    handlePropagateGrowth,
    handlePropagateMargin,
  }
}
