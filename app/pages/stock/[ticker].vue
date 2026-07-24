<script setup lang="ts">
import type { Stock, GrowthMode, MarginMode, AuditData, StockStatus } from '~/types/database.types'
import {
  computeScenarios,
  computeReverseDCF,
  type ValuationInputs,
  type ScenarioResults,
  type ReverseDCFResult,
} from '~/utils/valuation'
import {
  formatScaledCurrency,
  formatCurrency,
  formatPercent,
  formatNumber,
} from '~/utils/format'
import AIDeepResearchBridge from '~/components/workspace/AIDeepResearchBridge.vue'
import type { QuantitativeAIResult } from '~/server/api/stock/[ticker]/quantitative.post'

const route = useRoute()
const tickerParam = computed(() => String(route.params.ticker || '').toUpperCase())

const isLoading = ref(true)
const isSaving = ref(false)
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)

const stock = ref<Stock | null>(null)
const activeTab = ref<'dcf' | 'quant' | 'research' | 'sourcing'>('dcf')
const dcfSubTab = ref<'model' | 'copilot'>('model')

// Local Editable Hypotheses
const growthMode = ref<GrowthMode>('cagr')
const growth = ref(0.10)
const growthY1 = ref(0.10)
const growthY2 = ref(0.10)
const growthY3 = ref(0.10)
const growthY4 = ref(0.10)
const growthY5 = ref(0.10)

const marginMode = ref<MarginMode>('constant')
const margin = ref(0.20)
const marginY1 = ref(0.20)
const marginY2 = ref(0.20)
const marginY3 = ref(0.20)
const marginY4 = ref(0.20)
const marginY5 = ref(0.20)

const targetMultiple = ref(20.0)
const discountRate = ref(0.10)
const riskSpread = ref(0.20)

// Quantitative AI Copilot State
const isAnalyzingQuant = ref(false)
const quantAiErrorMessage = ref<string | null>(null)
const quantAiResult = ref<QuantitativeAIResult | null>(null)

const quantiPromptText = computed(() => {
  const name = stock.value?.name || tickerParam.value
  return `Tu es un analyste financier Senior Equity Research. Effectue une recherche approfondie et chiffrée sur la société ${name} (${tickerParam.value}).

Consigne stricte de recherche quantitative :
1. Détermine les prévisions de croissance annuelle du Chiffre d'Affaires sur les 5 prochaines années (An 1 à An 5). Justifie chaque année (consensus, carnet de commandes, dynamique de marché).
2. Détermine la trajectoire de la Marge Nette sur 5 ans (An 1 à An 5). Justifie l'évolution (levier opérationnel, pricing power, R&D).
3. Estime le Multiple d'Exit P/E (Price-to-Earnings à l'An 5) en te basant sur la moyenne historique du secteur et des pairs.
4. Évalue le Taux d'Actualisation WACC (%) approprié d'après le bêta et la structure du capital.

Fournis un rapport complet et structuré en français avec toutes les données chiffrées et leurs justifications.`
})

const handleAnalyzeQuant = async (rawReport: string, model: string) => {
  isAnalyzingQuant.value = true
  quantAiErrorMessage.value = null
  try {
    const res = await $fetch<QuantitativeAIResult>(`/api/stock/${encodeURIComponent(tickerParam.value)}/quantitative`, {
      method: 'POST',
      body: { raw_report: rawReport, model },
    })
    quantAiResult.value = res
  } catch (err: any) {
    quantAiErrorMessage.value = err.data?.statusMessage || err.message || 'Erreur lors de l\'analyse par DeepSeek.'
  } finally {
    isAnalyzingQuant.value = false
  }
}

const injectAICopilotProjections = () => {
  if (!quantAiResult.value) return

  const data = quantAiResult.value
  growthMode.value = 'explicit'
  marginMode.value = 'explicit'

  if (data.growth_projections && data.growth_projections.length === 5) {
    growthY1.value = data.growth_projections[0] / 100
    growthY2.value = data.growth_projections[1] / 100
    growthY3.value = data.growth_projections[2] / 100
    growthY4.value = data.growth_projections[3] / 100
    growthY5.value = data.growth_projections[4] / 100
  }

  if (data.margin_projections && data.margin_projections.length === 5) {
    marginY1.value = data.margin_projections[0] / 100
    marginY2.value = data.margin_projections[1] / 100
    marginY3.value = data.margin_projections[2] / 100
    marginY4.value = data.margin_projections[3] / 100
    marginY5.value = data.margin_projections[4] / 100
  }

  if (data.target_multiple) targetMultiple.value = data.target_multiple
  if (data.discount_rate) discountRate.value = data.discount_rate / 100
  if (data.risk_spread) riskSpread.value = data.risk_spread / 100

  // Redirection automatique vers la grille P&L 5Y
  dcfSubTab.value = 'model'
  successMessage.value = 'Hypothèses de l\'IA injectées avec succès dans le DCF !'
  setTimeout(() => { successMessage.value = null }, 4000)
}

const injectYahooBaselineProjections = async () => {
  try {
    const freshApi = await $fetch<any>(`/api/stock/${encodeURIComponent(tickerParam.value)}`)
    if (!freshApi) return

    growthMode.value = freshApi.growth_mode || 'cagr'
    marginMode.value = 'constant'

    const g = freshApi.default_growth ?? 0.10
    growth.value = g
    growthY1.value = freshApi.growth_y1 ?? g
    growthY2.value = freshApi.growth_y2 ?? g
    growthY3.value = freshApi.growth_y3 ?? g
    growthY4.value = freshApi.growth_y4 ?? g
    growthY5.value = freshApi.growth_y5 ?? g

    const m = freshApi.default_margin ?? freshApi.margin_net_raw ?? 0.15
    margin.value = m
    marginY1.value = m
    marginY2.value = m
    marginY3.value = m
    marginY4.value = m
    marginY5.value = m

    targetMultiple.value = freshApi.default_target_multiple ?? freshApi.pe_forward_raw ?? 20.0
    discountRate.value = freshApi.default_discount_rate ?? 0.10
    riskSpread.value = freshApi.default_risk_spread ?? 0.20

    successMessage.value = 'Hypothèses de base Yahoo Finance / Consensus injectées avec succès !'
    setTimeout(() => { successMessage.value = null }, 4000)
  } catch (err: any) {
    console.error('Erreur injection hypothèses Yahoo:', err)
  }
}

// Load Stock Data
const loadStockData = async () => {
  isLoading.value = true
  errorMessage.value = null
  try {
    const allStocks = await $fetch<Stock[]>('/api/stocks')
    let found = allStocks.find(s => s.ticker === tickerParam.value)

    if (!found) {
      const apiData = await $fetch<any>(`/api/stock/${encodeURIComponent(tickerParam.value)}`)
      found = await $fetch<Stock>('/api/stocks', {
        method: 'POST',
        body: {
          ticker: apiData.ticker,
          name: apiData.name,
          currency: apiData.currency,
          current_price: apiData.current_price,
          revenue_ttm: apiData.revenue_ttm,
          shares_outstanding: apiData.shares_outstanding,
          beta: apiData.beta,
          fetched_at: apiData.fetched_at,
          status: 'watchlist',
          growth_mode: apiData.growth_mode,
          projected_growth: apiData.default_growth,
          growth_y1: apiData.growth_y1,
          growth_y2: apiData.growth_y2,
          growth_y3: apiData.growth_y3,
          growth_y4: apiData.growth_y4,
          growth_y5: apiData.growth_y5,
          margin_mode: apiData.margin_mode || 'constant',
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
        },
      })
    } else {
      try {
        const freshApi = await $fetch<any>(`/api/stock/${encodeURIComponent(tickerParam.value)}`)
        found.growth_source = freshApi.growth_source
        found.margin_source = freshApi.margin_source
        found.pe_source = freshApi.pe_source
        if (freshApi.audit_data && !found.audit_data) {
          found.audit_data = freshApi.audit_data
        }
      } catch {}
    }

    stock.value = found
    initFormValues(found)
  } catch (err: any) {
    errorMessage.value = err.data?.statusMessage || err.message || `Impossible de charger ${tickerParam.value}`
  } finally {
    isLoading.value = false
  }
}

const initFormValues = (s: Stock) => {
  growthMode.value = s.growth_mode || 'cagr'
  growth.value = s.projected_growth ?? 0.10
  growthY1.value = s.growth_y1 ?? 0.10
  growthY2.value = s.growth_y2 ?? 0.10
  growthY3.value = s.growth_y3 ?? 0.10
  growthY4.value = s.growth_y4 ?? 0.10
  growthY5.value = s.growth_y5 ?? 0.10

  marginMode.value = s.margin_mode || 'constant'
  margin.value = s.projected_margin ?? 0.20
  marginY1.value = s.margin_y1 ?? s.projected_margin ?? 0.20
  marginY2.value = s.margin_y2 ?? s.projected_margin ?? 0.20
  marginY3.value = s.margin_y3 ?? s.projected_margin ?? 0.20
  marginY4.value = s.margin_y4 ?? s.projected_margin ?? 0.20
  marginY5.value = s.margin_y5 ?? s.projected_margin ?? 0.20

  targetMultiple.value = s.target_multiple ?? 20.0
  discountRate.value = s.discount_rate ?? 0.10
  riskSpread.value = s.risk_spread ?? 0.20
}

onMounted(() => {
  loadStockData()
})

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

const saveHypotheses = async (quiet = false) => {
  if (!stock.value) return
  if (!quiet) isSaving.value = true
  try {
    const updated = await $fetch(`/api/stocks/${stock.value.id}`, {
      method: 'PUT',
      body: {
        growth_rate: Number(growth.value),
        growth_mode: growthMode.value,
        growth_y1: Number(growthY1.value),
        growth_y2: Number(growthY2.value),
        growth_y3: Number(growthY3.value),
        growth_y4: Number(growthY4.value),
        growth_y5: Number(growthY5.value),
        margin_type: 'net_income',
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
      successMessage.value = 'Hypothèses de valorisation sauvegardées.'
      setTimeout(() => { successMessage.value = null }, 4000)
    }
  } catch (err: any) {
    console.error('Erreur sauvegarde hypothèses:', err)
  } finally {
    if (!quiet) isSaving.value = false
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
  marginType: 'net_income',
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

// Auto-save debounced (1200ms) sur les modifications d'hypothèses
let autoSaveTimer: ReturnType<typeof setTimeout> | null = null

watch(valuationInputs, () => {
  if (autoSaveTimer) clearTimeout(autoSaveTimer)
  autoSaveTimer = setTimeout(() => {
    saveHypotheses(true)
  }, 1200)
}, { deep: true })

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

// Projections des CA et Résultat Net sur 5 ans pour la grille
const revenueProjections = computed(() => {
  const baseRev = stock.value?.revenue_ttm ?? 0
  if (!baseRev) return []

  const margins = marginMode.value === 'explicit'
    ? [marginY1.value, marginY2.value, marginY3.value, marginY4.value, marginY5.value]
    : [margin.value, margin.value, margin.value, margin.value, margin.value]

  if (growthMode.value === 'cagr') {
    const g = growth.value
    return [1, 2, 3, 4, 5].map((year, idx) => {
      const rev = baseRev * Math.pow(1 + g, year)
      const m = margins[idx]
      return {
        year,
        growth: g,
        revenue: rev,
        margin: m,
        earnings: rev * m,
      }
    })
  } else {
    const rates = [growthY1.value, growthY2.value, growthY3.value, growthY4.value, growthY5.value]
    let current = baseRev
    return rates.map((r, idx) => {
      current = current * (1 + r)
      const m = margins[idx]
      return {
        year: idx + 1,
        growth: r,
        revenue: current,
        margin: m,
        earnings: current * m,
      }
    })
  }
})

// Handlers d'édition bidirectionnelle CA ($) <-> Croissance (%) et Marge Nette (%)
const updateGrowthY = (yearIndex: number, newRate: number) => {
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

const updateMarginY = (yearIndex: number, newMargin: number) => {
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

const updateRevenueForYear = (yearIndex: number, newRevenueVal: number) => {
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

// Active Cell Focus for Side Inspector Panel
export interface ActiveCellFocus {
  type: 'growth' | 'margin' | 'revenue'
  yearIndex: number
}

const activeCell = ref<ActiveCellFocus>({ type: 'growth', yearIndex: 0 })

const selectCell = (type: 'growth' | 'margin' | 'revenue', yearIndex: number) => {
  activeCell.value = { type, yearIndex }
}

// Active Cell Computed Properties for Live Editing in Side Inspector
const activeGrowthVal = computed({
  get: () => {
    const idx = activeCell.value.yearIndex
    const refs = [growthY1, growthY2, growthY3, growthY4, growthY5]
    const val = growthMode.value === 'explicit' ? refs[idx].value : growth.value
    return parseFloat((val * 100).toFixed(2))
  },
  set: (valInPercent: number) => {
    const decimalRate = valInPercent / 100
    updateGrowthY(activeCell.value.yearIndex, decimalRate)
  },
})

const activeMarginVal = computed({
  get: () => {
    const idx = activeCell.value.yearIndex
    const refs = [marginY1, marginY2, marginY3, marginY4, marginY5]
    const val = marginMode.value === 'explicit' ? refs[idx].value : margin.value
    return parseFloat((val * 100).toFixed(2))
  },
  set: (valInPercent: number) => {
    const decimalMargin = valInPercent / 100
    updateMarginY(activeCell.value.yearIndex, decimalMargin)
  },
})

const activeRevenueScaleUnit = ref<'B' | 'M' | 'K' | '1'>('B')

const activeRevenueScaledVal = computed({
  get: () => {
    const proj = revenueProjections.value[activeCell.value.yearIndex]
    if (!proj) return 0
    const raw = proj.revenue
    let mult = 1e9
    if (activeRevenueScaleUnit.value === 'M') mult = 1e6
    else if (activeRevenueScaleUnit.value === 'K') mult = 1e3
    else if (activeRevenueScaleUnit.value === '1') mult = 1
    return parseFloat((raw / mult).toFixed(3))
  },
  set: (scaledVal: number) => {
    let mult = 1e9
    if (activeRevenueScaleUnit.value === 'M') mult = 1e6
    else if (activeRevenueScaleUnit.value === 'K') mult = 1e3
    else if (activeRevenueScaleUnit.value === '1') mult = 1

    const absoluteRevenue = scaledVal * mult
    updateRevenueForYear(activeCell.value.yearIndex, absoluteRevenue)
  },
})

const propagateActiveGrowth = () => {
  const currentRate = activeGrowthVal.value / 100
  growthMode.value = 'explicit'
  const refs = [growthY1, growthY2, growthY3, growthY4, growthY5]
  for (let i = activeCell.value.yearIndex; i < 5; i++) {
    refs[i].value = currentRate
  }
}

const propagateActiveMargin = () => {
  const currentMargin = activeMarginVal.value / 100
  marginMode.value = 'explicit'
  const refs = [marginY1, marginY2, marginY3, marginY4, marginY5]
  for (let i = activeCell.value.yearIndex; i < 5; i++) {
    refs[i].value = currentMargin
  }
  margin.value = marginY5.value
}

// Continuous press-and-hold increment / decrement for % buttons with progressive acceleration
let stepInterval: ReturnType<typeof setInterval> | null = null
let stepTimeout: ReturnType<typeof setTimeout> | null = null

const startStep = (type: 'growth' | 'margin', isIncrement: boolean) => {
  stopStep()
  let ticks = 0

  const applyStep = () => {
    ticks++
    // Progressive acceleration step: 0.1 -> 0.2 -> 0.5 -> 1.0
    let stepSize = 0.1
    if (ticks > 25) stepSize = 1.0
    else if (ticks > 14) stepSize = 0.5
    else if (ticks > 6) stepSize = 0.2

    const delta = isIncrement ? stepSize : -stepSize

    if (type === 'growth') {
      const min = -50, max = 150
      const newVal = activeGrowthVal.value + delta
      activeGrowthVal.value = parseFloat(Math.min(max, Math.max(min, newVal)).toFixed(1))
    } else {
      const min = -50, max = 80
      const newVal = activeMarginVal.value + delta
      activeMarginVal.value = parseFloat(Math.min(max, Math.max(min, newVal)).toFixed(1))
    }
  }

  // Single click initial step (0.1)
  applyStep()

  // Long press repeat every 50ms with acceleration
  stepTimeout = setTimeout(() => {
    stepInterval = setInterval(applyStep, 50)
  }, 220)
}

const stopStep = () => {
  if (stepTimeout) {
    clearTimeout(stepTimeout)
    stepTimeout = null
  }
  if (stepInterval) {
    clearInterval(stepInterval)
    stepInterval = null
  }
}

// Dual-Track Spectrum Axis Calculations
const spectrumData = computed(() => {
  const price = stock.value?.current_price ?? 0
  const bear = scenarios.value.bear.fairValue
  const base = scenarios.value.base.fairValue
  const bull = scenarios.value.bull.fairValue

  const low = stock.value?.analyst_target_low ?? null
  const mean = stock.value?.analyst_target_price ?? stock.value?.analyst_target_median ?? null
  const high = stock.value?.analyst_target_high ?? null

  const allVals = [price, bear, base, bull, low, mean, high].filter((v): v is number => v !== null && !isNaN(v) && v > 0)
  if (allVals.length === 0) {
    return null
  }

  const min = Math.min(...allVals) * 0.95
  const max = Math.max(...allVals) * 1.05
  const range = max - min

  const calcPos = (val: number | null) => {
    if (val === null || isNaN(val) || val <= 0 || range <= 0) return null
    return Math.max(2, Math.min(98, ((val - min) / range) * 100))
  }

  return {
    min,
    max,
    pricePos: calcPos(price)!,
    bearPos: calcPos(bear)!,
    basePos: calcPos(base)!,
    bullPos: calcPos(bull)!,
    lowPos: calcPos(low),
    meanPos: calcPos(mean),
    highPos: calcPos(high),
    bearVal: bear,
    baseVal: base,
    bullVal: bull,
    priceVal: price,
    lowVal: low,
    meanVal: mean,
    highVal: high,
  }
})

const parsedAuditData = computed<AuditData | null>(() => {
  if (!stock.value?.audit_data) return null
  if (typeof stock.value.audit_data === 'string') {
    try { return JSON.parse(stock.value.audit_data) } catch { return null }
  }
  return stock.value.audit_data as AuditData
})
</script>

<template>
  <div class="space-y-6">
    <!-- Top Nav Back Button -->
    <div>
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 rounded-lg bg-gray-900 border border-gray-800 px-3.5 py-1.5 text-xs font-semibold text-gray-300 hover:bg-gray-800 hover:text-white transition"
      >
        <span>← Dashboard</span>
      </NuxtLink>
    </div>

    <!-- Error State -->
    <div v-if="errorMessage" class="rounded-xl border border-red-500/30 bg-red-950/40 p-6 text-sm text-red-300">
      {{ errorMessage }}
    </div>

    <!-- Loading State -->
    <div v-else-if="isLoading" class="py-24 text-center text-sm text-gray-400">
      Chargement du workspace pour {{ tickerParam }}...
    </div>

    <!-- Workspace Loaded -->
    <div v-else-if="stock" class="space-y-8">
      <!-- Workspace Header -->
      <div class="rounded-2xl border border-gray-800 bg-gray-950/80 p-6 shadow-2xl backdrop-blur">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <!-- Left: Stock Meta -->
          <div class="flex items-center gap-5">
            <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-900 border border-gray-800 font-black text-2xl text-emerald-400 shadow-inner">
              {{ stock.ticker }}
            </div>
            <div>
              <div class="flex items-center gap-3 flex-wrap">
                <h1 class="text-2xl font-bold tracking-tight text-white">
                  {{ stock.name || stock.ticker }}
                </h1>
                <span class="rounded-md bg-gray-800 px-2 py-0.5 text-xs font-mono text-gray-300">
                  Bêta {{ stock.beta ? stock.beta.toFixed(2) : '1.00' }}
                </span>
                <span
                  class="rounded-md border px-2.5 py-0.5 text-xs font-semibold"
                  :class="badgeConfig.class"
                >
                  {{ badgeConfig.label }} ({{ formatPercent(marginOfSafety) }})
                </span>
              </div>

              <div class="mt-2 flex items-center gap-6 text-sm text-gray-400 flex-wrap">
                <div>
                  Cours Actuel : <span class="font-bold text-white text-base">{{ formatCurrency(stock.current_price, stock.currency) }}</span>
                </div>
                <div>
                  Fair Value Base : 
                  <span
                    class="font-bold text-base"
                    :class="isUndervalued ? 'text-emerald-400' : 'text-rose-400'"
                  >
                    {{ formatCurrency(fairValue, stock.currency) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Actions / Toggle -->
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold transition shadow-md"
              :class="stock.status === 'portfolio' 
                ? 'border-gray-700 bg-gray-800/80 text-gray-300 hover:bg-gray-800 hover:text-white' 
                : 'border-emerald-500/40 bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/60'"
              @click="toggleStatus"
            >
              <span v-if="stock.status === 'watchlist'">💼 Transférer dans le Portefeuille</span>
              <span v-else>👀 Transférer dans la Watchlist</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="border-b border-gray-800">
        <nav class="-mb-px flex space-x-6 overflow-x-auto scrollbar-none">
          <button
            type="button"
            class="whitespace-nowrap pb-4 px-1 border-b-2 font-bold text-sm transition flex items-center gap-2"
            :class="activeTab === 'dcf' 
              ? 'border-emerald-500 text-emerald-400' 
              : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700'"
            @click="activeTab = 'dcf'"
          >
            <span>🎯</span>
            <span>DCF & Thèse Quantitative</span>
          </button>

          <button
            type="button"
            class="whitespace-nowrap pb-4 px-1 border-b-2 font-bold text-sm transition flex items-center gap-2"
            :class="activeTab === 'quant' 
              ? 'border-emerald-500 text-emerald-400' 
              : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700'"
            @click="activeTab = 'quant'"
          >
            <span>📊</span>
            <span>Quant & Régression</span>
          </button>

          <button
            type="button"
            class="whitespace-nowrap pb-4 px-1 border-b-2 font-bold text-sm transition flex items-center gap-2"
            :class="activeTab === 'research' 
              ? 'border-emerald-500 text-emerald-400' 
              : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700'"
            @click="activeTab = 'research'"
          >
            <span>🧠</span>
            <span>Deep Research Qualitative</span>
          </button>
        </nav>
      </div>

      <!-- Tab Content Area -->
      <div class="space-y-8">
        <!-- TAB 1: DCF & THÈSE QUANTITATIVE -->
        <div v-if="activeTab === 'dcf'" class="space-y-8">

          <!-- Sous-Onglets DCF Bar -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-3">
            <div class="inline-flex p-1 bg-gray-950 rounded-xl border border-gray-800 gap-1 text-xs">
              <button
                type="button"
                class="px-4 py-2 rounded-lg font-bold transition flex items-center gap-2"
                :class="dcfSubTab === 'model'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'"
                @click="dcfSubTab = 'model'"
              >
                <span>📊</span>
                <span>Modèle Financier 5Y</span>
              </button>
              <button
                type="button"
                class="px-4 py-2 rounded-lg font-bold transition flex items-center gap-2"
                :class="dcfSubTab === 'copilot'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'"
                @click="dcfSubTab = 'copilot'"
              >
                <span>🎯</span>
                <span>IA Copilot & Audit Trail</span>
                <span v-if="quantAiResult" class="w-2 h-2 rounded-full bg-emerald-400"></span>
              </button>
            </div>

            <button
              v-if="dcfSubTab === 'model'"
              type="button"
              class="text-xs font-bold text-emerald-400 hover:text-white transition flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/40 px-4 py-2 rounded-xl self-start sm:self-auto hover:bg-emerald-900/50 shadow"
              title="Injecter les hypothèses initiales calculées par Yahoo Finance & Cascades Nitro"
              @click="injectYahooBaselineProjections"
            >
              <span>📊</span>
              <span>Injecter Hypothèses Yahoo TTM / Consensus</span>
            </button>
          </div>

          <!-- Notification Toast -->
          <div v-if="successMessage" class="rounded-xl border border-emerald-500/40 bg-emerald-950/60 p-4 text-xs font-semibold text-emerald-300">
            {{ successMessage }}
          </div>

          <!-- SUB-TAB 1: Modèle Financier 5Y -->
          <div v-if="dcfSubTab === 'model'" class="space-y-8">
            <!-- Section 1 : 📊 Modèle Financier P&L Unifié (5Y) — Layout 2 colonnes -->
            <div class="rounded-2xl border border-gray-800 bg-gray-950/70 shadow-xl backdrop-blur overflow-hidden">
              <!-- Header -->
              <div class="border-b border-gray-800 p-5">
                <h2 class="text-base font-bold text-white flex items-center gap-2">
                  <span>📊</span>
                  <span>Modèle Financier P&L Unifié (5Y)</span>
                </h2>
                <p class="text-xs text-gray-400 mt-0.5">Cliquez une cellule pour l'éditer dans l'inspecteur à droite. Modifications recalculées en temps réel.</p>
              </div>

              <!-- Body : Table + Inspector -->
              <div class="flex flex-col lg:flex-row gap-6 p-5">

                <!-- ── GAUCHE : Tableau P&L Rétro-Stable ── -->
                <div class="flex-1 min-w-0 overflow-x-auto">
                  <table class="w-full border-collapse text-xs table-fixed font-mono tabular-nums">
                    <thead>
                      <tr class="border-b border-gray-800 bg-gray-950/80 text-gray-400 text-[10px] uppercase tracking-wider">
                        <th class="py-2.5 px-3 font-semibold text-left w-36">Poste P&L</th>
                        <th class="py-2.5 px-2 text-right font-semibold w-20">TTM</th>
                        <th
                          v-for="item in revenueProjections"
                          :key="item.year"
                          class="py-2.5 px-2 text-right font-semibold w-20"
                        >An {{ item.year }}</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-800/50">

                      <!-- Row 1 : Croissance CA (%) -->
                      <tr class="transition">
                        <td class="py-2.5 px-3 text-gray-300 font-sans font-medium text-[11px] whitespace-nowrap truncate">Croissance CA</td>
                        <td class="py-2.5 px-2 text-right text-gray-600 font-mono text-[11px]">—</td>
                        <td
                          v-for="(item, idx) in revenueProjections"
                          :key="idx"
                          class="py-2.5 px-2 text-right font-mono font-semibold text-[11px] cursor-pointer transition-all duration-150"
                          :class="[
                            activeCell.type === 'growth' && activeCell.yearIndex === idx
                              ? (item.growth >= 0 ? 'bg-emerald-500/15 ring-1 ring-inset ring-emerald-500/50' : 'bg-rose-500/15 ring-1 ring-inset ring-rose-500/50')
                              : 'hover:bg-gray-800/40',
                            item.growth > 0 ? 'text-emerald-400' : item.growth < 0 ? 'text-rose-400' : 'text-gray-400'
                          ]"
                          @click="selectCell('growth', idx)"
                        >
                          {{ formatPercent(item.growth, true) }}
                        </td>
                      </tr>

                      <!-- Row 2 : Chiffre d'Affaires -->
                      <tr class="bg-gray-950/25 transition">
                        <td class="py-2.5 px-3 text-white font-sans font-semibold text-[11px] whitespace-nowrap truncate">Chiffre d'Affaires</td>
                        <td class="py-2.5 px-2 text-right font-mono text-gray-400 font-semibold text-[11px]">
                          {{ formatScaledCurrency(stock.revenue_ttm, stock.currency) }}
                        </td>
                        <td
                          v-for="(item, idx) in revenueProjections"
                          :key="idx"
                          class="py-2.5 px-2 text-right font-mono font-bold text-[11px] cursor-pointer transition-all duration-150 text-white"
                          :class="activeCell.type === 'revenue' && activeCell.yearIndex === idx
                            ? 'bg-emerald-500/15 text-emerald-200 ring-1 ring-inset ring-emerald-500/50'
                            : 'hover:bg-gray-800/40'"
                          @click="selectCell('revenue', idx)"
                        >
                          {{ formatScaledCurrency(item.revenue, stock.currency) }}
                        </td>
                      </tr>

                      <!-- Row 3 : Marge Nette -->
                      <tr class="transition">
                        <td class="py-2.5 px-3 text-gray-300 font-sans font-medium text-[11px] whitespace-nowrap truncate">Marge Nette</td>
                        <td
                          class="py-2.5 px-2 text-right font-mono text-[11px]"
                          :class="(stock.margin_net_raw || 0) >= 0 ? 'text-gray-400' : 'text-rose-400'"
                        >
                          {{ formatPercent(stock.margin_net_raw, true, 1, false) }}
                        </td>
                        <td
                          v-for="(item, idx) in revenueProjections"
                          :key="idx"
                          class="py-2.5 px-2 text-right font-mono font-semibold text-[11px] cursor-pointer transition-all duration-150"
                          :class="[
                            activeCell.type === 'margin' && activeCell.yearIndex === idx
                              ? (item.margin >= 0 ? 'bg-sky-500/15 ring-1 ring-inset ring-sky-500/50' : 'bg-rose-500/15 ring-1 ring-inset ring-rose-500/50')
                              : 'hover:bg-gray-800/40',
                            item.margin > 0 ? 'text-sky-400' : item.margin < 0 ? 'text-rose-400 font-bold' : 'text-gray-400'
                          ]"
                          @click="selectCell('margin', idx)"
                        >
                          {{ formatPercent(item.margin, true, 1, false) }}
                        </td>
                      </tr>

                      <!-- Row 4 : Résultat Net -->
                      <tr class="bg-gray-950/40 border-t border-gray-800">
                        <td class="py-2.5 px-3 font-sans font-bold text-gray-200 text-[11px] whitespace-nowrap truncate">Résultat Net</td>
                        <td
                          class="py-2.5 px-2 text-right font-mono font-semibold text-[11px]"
                          :class="((stock.revenue_ttm || 0) * (stock.margin_net_raw || 0)) >= 0 ? 'text-gray-300' : 'text-rose-400 font-bold'"
                        >
                          {{ formatScaledCurrency((stock.revenue_ttm || 0) * (stock.margin_net_raw || 0), stock.currency) }}
                        </td>
                        <td
                          v-for="(item, idx) in revenueProjections"
                          :key="idx"
                          class="py-2.5 px-2 text-right font-mono font-bold text-[11px]"
                          :class="item.earnings > 0 ? 'text-emerald-400' : item.earnings < 0 ? 'text-rose-400 bg-rose-500/10' : 'text-gray-400'"
                        >
                          {{ formatScaledCurrency(item.earnings, stock.currency) }}
                        </td>
                      </tr>

                    </tbody>
                  </table>

                  <!-- Synthèse P&L An 5 -->
                  <div class="flex flex-wrap gap-6 p-3 mt-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-xs">
                    <div>
                      <span class="text-gray-400">Chiffre d'Affaires An 5 : </span>
                      <span class="font-bold font-mono text-emerald-400 ml-1">{{ formatScaledCurrency(scenarios.base.revenue5Y, stock.currency) }}</span>
                    </div>
                    <div>
                      <span class="text-gray-400">Résultat Net An 5 : </span>
                      <span
                        class="font-bold font-mono ml-1"
                        :class="scenarios.base.earnings5Y >= 0 ? 'text-emerald-400' : 'text-rose-400'"
                      >{{ formatScaledCurrency(scenarios.base.earnings5Y, stock.currency) }}</span>
                    </div>
                    <div>
                      <span class="text-gray-400">CAGR Équivalent : </span>
                      <span
                        class="font-bold font-mono ml-1"
                        :class="scenarios.base.equivalentCAGR >= 0 ? 'text-emerald-400' : 'text-rose-400'"
                      >{{ formatPercent(scenarios.base.equivalentCAGR, true) }}</span>
                    </div>
                  </div>
                </div>

                <!-- ── DROITE : Inspecteur Latéral Contextuel Fixe ── -->
                <div class="w-full lg:w-60 flex-shrink-0 bg-gray-900/90 border border-gray-800 rounded-xl p-4 space-y-4">

                  <!-- Header Inspecteur -->
                  <div class="border-b border-gray-800 pb-3">
                    <div class="flex items-center gap-1.5 mb-0.5">
                      <div
                        class="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        :class="{
                          'bg-emerald-400': activeCell.type === 'growth' && activeGrowthVal >= 0,
                          'bg-rose-400': (activeCell.type === 'growth' && activeGrowthVal < 0) || (activeCell.type === 'margin' && activeMarginVal < 0),
                          'bg-sky-400': activeCell.type === 'margin' && activeMarginVal >= 0,
                          'bg-white': activeCell.type === 'revenue',
                        }"
                      ></div>
                      <span class="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Inspecteur</span>
                    </div>
                    <p class="text-xs font-bold text-white truncate">
                      <span v-if="activeCell.type === 'growth'">Croissance — An {{ activeCell.yearIndex + 1 }}</span>
                      <span v-else-if="activeCell.type === 'margin'">Marge Nette — An {{ activeCell.yearIndex + 1 }}</span>
                      <span v-else>Chiffre d'Affaires — An {{ activeCell.yearIndex + 1 }}</span>
                    </p>
                  </div>

                  <!-- ── Cas : Croissance CA ── -->
                  <div v-if="activeCell.type === 'growth'" class="space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="text-[11px] text-gray-400">Croissance — An {{ activeCell.yearIndex + 1 }}</span>
                      <span
                        class="font-mono text-xs font-bold"
                        :class="activeGrowthVal >= 0 ? 'text-emerald-400' : 'text-rose-400'"
                      >{{ activeGrowthVal.toFixed(1) }}%</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <button
                        type="button"
                        class="h-7 w-7 rounded bg-gray-800 border border-gray-700 text-sm font-black text-gray-200 hover:bg-gray-700 hover:text-white transition flex-shrink-0 flex items-center justify-center select-none"
                        @mousedown="startStep('growth', false)"
                        @mouseleave="stopStep"
                        @mouseup="stopStep"
                        @touchstart.prevent="startStep('growth', false)"
                        @touchend="stopStep"
                      >−</button>
                      <input
                        v-model.number="activeGrowthVal"
                        type="number"
                        step="0.1"
                        class="h-7 w-14 rounded-md bg-gray-950 border border-gray-700 px-1 text-xs font-mono text-white text-center focus:border-emerald-500 focus:outline-none flex-shrink-0"
                      />
                      <button
                        type="button"
                        class="h-7 w-7 rounded bg-gray-800 border border-gray-700 text-sm font-black text-gray-200 hover:bg-gray-700 hover:text-white transition flex-shrink-0 flex items-center justify-center select-none"
                        @mousedown="startStep('growth', true)"
                        @mouseleave="stopStep"
                        @mouseup="stopStep"
                        @touchstart.prevent="startStep('growth', true)"
                        @touchend="stopStep"
                      >+</button>
                      <button
                        type="button"
                        class="h-7 ml-auto rounded bg-gray-800 border border-gray-700 px-2 text-[10px] font-bold text-gray-300 hover:bg-emerald-800/60 hover:text-emerald-300 hover:border-emerald-600 transition flex-shrink-0 flex items-center justify-center font-sans"
                        :title="`Propager cette croissance (An ${activeCell.yearIndex + 1} → An 5)`"
                        @click="propagateActiveGrowth"
                      >An {{ activeCell.yearIndex + 1 }} ➔ 5</button>
                    </div>
                    <input
                      v-model.number="activeGrowthVal"
                      type="range"
                      min="-50"
                      max="150"
                      step="0.5"
                      class="w-full block"
                      :class="activeGrowthVal >= 0 ? 'accent-emerald-500' : 'accent-rose-500'"
                    />
                  </div>

                  <!-- ── Cas : Marge Nette ── -->
                  <div v-else-if="activeCell.type === 'margin'" class="space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="text-[11px] text-gray-400">Marge — An {{ activeCell.yearIndex + 1 }}</span>
                      <span
                        class="font-mono text-xs font-bold"
                        :class="activeMarginVal >= 0 ? 'text-sky-400' : 'text-rose-400'"
                      >{{ activeMarginVal.toFixed(1) }}%</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <button
                        type="button"
                        class="h-7 w-7 rounded bg-gray-800 border border-gray-700 text-sm font-black text-gray-200 hover:bg-gray-700 hover:text-white transition flex-shrink-0 flex items-center justify-center select-none"
                        @mousedown="startStep('margin', false)"
                        @mouseleave="stopStep"
                        @mouseup="stopStep"
                        @touchstart.prevent="startStep('margin', false)"
                        @touchend="stopStep"
                      >−</button>
                      <input
                        v-model.number="activeMarginVal"
                        type="number"
                        step="0.1"
                        class="h-7 w-14 rounded-md bg-gray-950 border border-gray-700 px-1 text-xs font-mono text-white text-center focus:border-sky-500 focus:outline-none flex-shrink-0"
                      />
                      <button
                        type="button"
                        class="h-7 w-7 rounded bg-gray-800 border border-gray-700 text-sm font-black text-gray-200 hover:bg-gray-700 hover:text-white transition flex-shrink-0 flex items-center justify-center select-none"
                        @mousedown="startStep('margin', true)"
                        @mouseleave="stopStep"
                        @mouseup="stopStep"
                        @touchstart.prevent="startStep('margin', true)"
                        @touchend="stopStep"
                      >+</button>
                      <button
                        type="button"
                        class="h-7 ml-auto rounded bg-gray-800 border border-gray-700 px-2 text-[10px] font-bold text-gray-300 hover:bg-sky-800/60 hover:text-sky-300 hover:border-sky-600 transition flex-shrink-0 flex items-center justify-center font-sans"
                        :title="`Propager cette marge (An ${activeCell.yearIndex + 1} → An 5)`"
                        @click="propagateActiveMargin"
                      >An {{ activeCell.yearIndex + 1 }} ➔ 5</button>
                    </div>
                    <input
                      v-model.number="activeMarginVal"
                      type="range"
                      min="-50"
                      max="80"
                      step="0.5"
                      class="w-full block"
                      :class="activeMarginVal >= 0 ? 'accent-sky-500' : 'accent-rose-500'"
                    />
                  </div>

                  <!-- ── Cas : Chiffre d'Affaires ── -->
                  <div v-else-if="activeCell.type === 'revenue'" class="space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="text-[11px] text-gray-400">CA — An {{ activeCell.yearIndex + 1 }}</span>
                      <span class="font-mono text-white text-xs font-bold">{{ formatScaledCurrency(revenueProjections[activeCell.yearIndex]?.revenue, stock.currency) }}</span>
                    </div>
                    <div class="flex items-center justify-start gap-1.5">
                      <input
                        v-model.number="activeRevenueScaledVal"
                        type="number"
                        step="0.01"
                        class="h-7 w-24 rounded-md bg-gray-950 border border-gray-700 px-2 text-xs font-mono text-white text-right focus:border-emerald-500 focus:outline-none flex-shrink-0"
                      />
                      <select
                        v-model="activeRevenueScaleUnit"
                        class="h-7 w-14 rounded-md bg-gray-950 border border-gray-700 px-1 text-xs font-mono text-emerald-400 font-bold focus:border-emerald-500 focus:outline-none flex-shrink-0 cursor-pointer"
                      >
                        <option value="B">Mds</option>
                        <option value="M">M</option>
                        <option value="K">K</option>
                        <option value="1">$</option>
                      </select>
                    </div>
                    <div class="h-5"></div>
                  </div>

                </div>
              </div>
            </div>

            <!-- Section 2 : ⚙️ Valorisation & Multiples de Sortie -->
            <div class="rounded-2xl border border-gray-800 bg-gray-950/70 p-6 space-y-6 shadow-xl backdrop-blur">
              <div>
                <h2 class="text-base font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-2">
                  <span>⚙️</span>
                  <span>Valorisation & Multiples de Sortie</span>
                </h2>
              </div>
              <div class="grid gap-6 md:grid-cols-3">
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-medium text-gray-400">Multiple Exit (P/E)</span>
                    <EditableValue v-model="targetMultiple" type="multiple" :is-decimal="false" :step="0.5" />
                  </div>
                  <input v-model.number="targetMultiple" type="range" min="5" max="120" step="0.5" class="w-full accent-emerald-500" />
                </div>
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-medium text-gray-400">Taux Actualisation / WACC (r)</span>
                    <EditableValue v-model="discountRate" type="percent" :is-decimal="true" :step="0.25" :digits="2" />
                  </div>
                  <input v-model.number="discountRate" type="range" min="0.05" max="0.20" step="0.0025" class="w-full accent-emerald-500" />
                </div>
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-medium text-gray-400">Spread Bêta / Scénarios</span>
                    <div class="flex items-center gap-1">
                      <span class="text-gray-400">±</span>
                      <EditableValue v-model="riskSpread" type="percent" :is-decimal="true" :step="1" :digits="0" />
                    </div>
                  </div>
                  <input v-model.number="riskSpread" type="range" min="0.05" max="0.50" step="0.01" class="w-full accent-emerald-500" />
                </div>
              </div>
            </div>

            <!-- Dual-Track Spectrum -->
            <div v-if="spectrumData" class="rounded-2xl border border-gray-800 bg-gray-950/70 p-6 space-y-6 shadow-xl backdrop-blur">
              <h3 class="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center justify-between">
                <span>📊 Valorisation & Spectrum de Prix Dual-Track</span>
                <span class="text-xs text-gray-400 font-normal">Comparaison Modèle vs Consensus Wall Street</span>
              </h3>
              <div class="space-y-8 py-2">
                <!-- Track 1 : MODÈLE STOCKPICK (NOTRE DCF) -->
                <div class="space-y-2">
                  <div class="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    Modèle StockPick (Notre DCF)
                  </div>

                  <div class="relative pt-6 pb-6">
                    <div class="h-3.5 w-full rounded-full bg-gradient-to-r from-red-500/25 via-amber-500/25 to-emerald-500/25 border border-gray-800 relative shadow-inner">
                      <div class="absolute top-0 bottom-0 w-0.5 bg-rose-500 shadow-md z-10" :style="{ left: `${spectrumData.bearPos}%` }">
                        <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                          {{ formatCurrency(spectrumData.bearVal, stock.currency) }}
                        </div>
                        <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-rose-400 whitespace-nowrap">
                          Bear
                        </div>
                      </div>

                      <div class="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-md z-20" :style="{ left: `${spectrumData.basePos}%` }">
                        <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                          {{ formatCurrency(spectrumData.baseVal, stock.currency) }}
                        </div>
                        <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-amber-400 whitespace-nowrap">
                          Base
                        </div>
                      </div>

                      <div class="absolute top-0 bottom-0 w-0.5 bg-emerald-400 shadow-md z-10" :style="{ left: `${spectrumData.bullPos}%` }">
                        <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                          {{ formatCurrency(spectrumData.bullVal, stock.currency) }}
                        </div>
                        <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-emerald-400 whitespace-nowrap">
                          Bull
                        </div>
                      </div>

                      <div class="absolute top-0 bottom-0 w-1 bg-white z-30 shadow-lg" :style="{ left: `${spectrumData.pricePos}%` }">
                        <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white bg-gray-900/90 px-1 rounded border border-gray-700 whitespace-nowrap">
                          {{ formatCurrency(spectrumData.priceVal, stock.currency) }}
                        </div>
                        <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-bold text-white whitespace-nowrap">
                          Prix
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Track 2 : CONSENSUS WALL STREET (ANALYSTES 12M) -->
                <div v-if="spectrumData.lowVal !== null || spectrumData.meanVal !== null" class="space-y-2">
                  <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-indigo-400">
                    <span>Consensus Wall Street (Analystes 12M)</span>
                    <span v-if="stock.analyst_count" class="text-[11px] font-normal text-gray-400 font-sans lowercase">
                      ({{ stock.analyst_count }} analystes)
                    </span>
                  </div>

                  <div class="relative pt-6 pb-6">
                    <div class="h-3.5 w-full rounded-full bg-gradient-to-r from-red-500/25 via-amber-500/25 to-emerald-500/25 border border-gray-800 relative shadow-inner">
                      <div v-if="spectrumData.lowPos !== null" class="absolute top-0 bottom-0 w-0.5 bg-rose-500 shadow-md z-10" :style="{ left: `${spectrumData.lowPos}%` }">
                        <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                          {{ formatCurrency(spectrumData.lowVal, stock.currency) }}
                        </div>
                        <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-rose-400 whitespace-nowrap">
                          Low
                        </div>
                      </div>

                      <div v-if="spectrumData.meanPos !== null" class="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-md z-20" :style="{ left: `${spectrumData.meanPos}%` }">
                        <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                          {{ formatCurrency(spectrumData.meanVal, stock.currency) }}
                        </div>
                        <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-amber-400 whitespace-nowrap">
                          Moyen
                        </div>
                      </div>

                      <div v-if="spectrumData.highPos !== null" class="absolute top-0 bottom-0 w-0.5 bg-emerald-400 shadow-md z-10" :style="{ left: `${spectrumData.highPos}%` }">
                        <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                          {{ formatCurrency(spectrumData.highVal, stock.currency) }}
                        </div>
                        <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-emerald-400 whitespace-nowrap">
                          High
                        </div>
                      </div>

                      <div class="absolute top-0 bottom-0 w-1 bg-white z-30 shadow-lg" :style="{ left: `${spectrumData.pricePos}%` }">
                        <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white bg-gray-900/90 px-1 rounded border border-gray-700 whitespace-nowrap">
                          {{ formatCurrency(spectrumData.priceVal, stock.currency) }}
                        </div>
                        <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-bold text-white whitespace-nowrap">
                          Prix
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Scénarios Bear / Base / Bull -->
            <div class="grid gap-4 md:grid-cols-3">
              <div class="rounded-xl border border-rose-500/20 bg-rose-950/10 p-5 space-y-3">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-rose-400 text-sm">🐻 Scénario Bear</span>
                  <span class="text-xs font-mono text-rose-300/80">-{{ (riskSpread * 100).toFixed(0) }}% spread</span>
                </div>
                <div class="text-2xl font-black text-white">
                  {{ formatCurrency(scenarios.bear.fairValue, stock.currency) }}
                </div>
                <div class="text-xs text-gray-400 space-y-1">
                  <div>MoS : <span class="font-semibold text-rose-300">{{ formatPercent(scenarios.bear.marginOfSafety) }}</span></div>
                  <div>Target Price 5Y : <span class="text-gray-300">{{ formatCurrency(scenarios.bear.targetPrice5Y, stock.currency) }}</span></div>
                </div>
              </div>

              <div class="rounded-xl border border-amber-500/20 bg-amber-950/10 p-5 space-y-3">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-amber-400 text-sm">⚖️ Scénario Base</span>
                  <span class="text-xs font-mono text-amber-300/80">Hypothèses Clés</span>
                </div>
                <div class="text-2xl font-black text-white">
                  {{ formatCurrency(scenarios.base.fairValue, stock.currency) }}
                </div>
                <div class="text-xs text-gray-400 space-y-1">
                  <div>MoS : <span class="font-semibold text-amber-300">{{ formatPercent(scenarios.base.marginOfSafety) }}</span></div>
                  <div>Target Price 5Y : <span class="text-gray-300">{{ formatCurrency(scenarios.base.targetPrice5Y, stock.currency) }}</span></div>
                </div>
              </div>

              <div class="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-5 space-y-3">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-emerald-400 text-sm">🚀 Scénario Bull</span>
                  <span class="text-xs font-mono text-emerald-300/80">+{{ (riskSpread * 100).toFixed(0) }}% spread</span>
                </div>
                <div class="text-2xl font-black text-white">
                  {{ formatCurrency(scenarios.bull.fairValue, stock.currency) }}
                </div>
                <div class="text-xs text-gray-400 space-y-1">
                  <div>MoS : <span class="font-semibold text-emerald-300">{{ formatPercent(scenarios.bull.marginOfSafety) }}</span></div>
                  <div>Target Price 5Y : <span class="text-gray-300">{{ formatCurrency(scenarios.bull.targetPrice5Y, stock.currency) }}</span></div>
                </div>
              </div>
            </div>

            <!-- Reverse DCF -->
            <div class="rounded-2xl border border-gray-800 bg-gray-950/70 p-6 space-y-4 shadow-xl backdrop-blur">
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <span>🔄</span>
                <span>Reverse DCF (Implicite Marché)</span>
              </h3>
              <p class="text-xs text-gray-400">
                Au cours actuel de <span class="font-semibold text-white">{{ formatCurrency(stock.current_price, stock.currency) }}</span>, le marché anticipe un taux de croissance annuel du CA de :
              </p>
              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 rounded-xl bg-gray-900 border border-gray-800 p-5">
                <div>
                  <div class="text-xs text-gray-400 uppercase tracking-wider font-semibold">Croissance Implicite Requis</div>
                  <div class="text-3xl font-extrabold text-amber-400">
                    {{ (reverseDCF.impliedGrowth * 100).toFixed(1) }}% <span class="text-xs font-normal text-gray-400">/ an</span>
                  </div>
                </div>
                <div class="text-xs text-gray-400 sm:border-l border-gray-800 sm:pl-6 space-y-1">
                  <div>Prix Cible 5Y Implicite : <span class="font-semibold text-white">{{ formatCurrency(reverseDCF.targetPrice5YMarket, stock.currency) }}</span></div>
                  <div>Bénéfices 5Y Implicites : <span class="font-semibold text-white">{{ formatScaledCurrency(reverseDCF.earnings5YMarket, stock.currency) }}</span></div>
                  <div>CA 5Y Implicite : <span class="font-semibold text-white">{{ formatScaledCurrency(reverseDCF.revenue5YMarket, stock.currency) }}</span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- SUB-TAB 2: IA Copilot & Audit Trail -->
          <div v-else-if="dcfSubTab === 'copilot'" class="space-y-8">
            <!-- AIDeepResearchBridge Component -->
            <AIDeepResearchBridge
              mode="quantitative"
              :ticker="tickerParam"
              :stock-name="stock.name || tickerParam"
              :prompt-text="quantiPromptText"
              :is-analyzing="isAnalyzingQuant"
              :error-message="quantAiErrorMessage"
              @analyze="handleAnalyzeQuant"
            />

            <!-- Carte des Résultats Extraits IA (si disponible) -->
            <div v-if="quantAiResult" class="rounded-2xl border border-emerald-500/30 bg-gray-950/90 p-6 space-y-6 shadow-xl backdrop-blur">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-800 pb-4 gap-4">
                <div>
                  <h4 class="text-base font-bold text-white flex items-center gap-2">
                    <span>⚡</span>
                    <span>Hypothèses Quantitatives Extraites par DeepSeek</span>
                  </h4>
                  <p class="text-xs text-gray-400 mt-1">Prévisualisation avant injection automatique dans le modèle P&L DCF 5Y.</p>
                </div>
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-extrabold text-white hover:bg-emerald-500 transition shadow-lg self-start sm:self-auto"
                  @click="injectAICopilotProjections"
                >
                  <span>🚀 Injecter dans le DCF 5Y</span>
                </button>
              </div>

              <!-- Grille des Projections Extraites -->
              <div class="grid gap-6 md:grid-cols-2">
                <!-- Croissance CA 5Y -->
                <div class="rounded-xl bg-gray-900 border border-gray-800 p-4 space-y-2">
                  <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Trajectoire Croissance CA (%)</div>
                  <div class="flex gap-2 text-xs font-mono font-bold flex-wrap">
                    <span v-for="(g, idx) in quantAiResult.growth_projections" :key="idx" class="px-2 py-1 rounded bg-gray-950 border border-gray-800 text-emerald-300">
                      An {{ idx + 1 }}: {{ g }}%
                    </span>
                  </div>
                  <p class="text-xs text-gray-300 italic pt-1 border-t border-gray-800/60 mt-2">
                    "{{ quantAiResult.justifications.growth }}"
                  </p>
                </div>

                <!-- Marge Nette 5Y -->
                <div class="rounded-xl bg-gray-900 border border-gray-800 p-4 space-y-2">
                  <div class="text-xs font-bold text-sky-400 uppercase tracking-wider">Trajectoire Marge Nette (%)</div>
                  <div class="flex gap-2 text-xs font-mono font-bold flex-wrap">
                    <span v-for="(m, idx) in quantAiResult.margin_projections" :key="idx" class="px-2 py-1 rounded bg-gray-950 border border-gray-800 text-sky-300">
                      An {{ idx + 1 }}: {{ m }}%
                    </span>
                  </div>
                  <p class="text-xs text-gray-300 italic pt-1 border-t border-gray-800/60 mt-2">
                    "{{ quantAiResult.justifications.margin }}"
                  </p>
                </div>
              </div>

              <div class="grid gap-4 sm:grid-cols-3 text-xs">
                <div class="rounded-xl bg-gray-900 border border-gray-800 p-3.5 space-y-1">
                  <div class="text-gray-400 font-medium">Multiple P/E Exit : <span class="font-bold text-white font-mono">{{ quantAiResult.target_multiple }}x</span></div>
                  <p class="text-[11px] text-gray-400 italic">"{{ quantAiResult.justifications.multiple }}"</p>
                </div>
                <div class="rounded-xl bg-gray-900 border border-gray-800 p-3.5 space-y-1">
                  <div class="text-gray-400 font-medium">Taux Actualisation (WACC) : <span class="font-bold text-white font-mono">{{ quantAiResult.discount_rate }}%</span></div>
                  <p class="text-[11px] text-gray-400 italic">"{{ quantAiResult.justifications.wacc }}"</p>
                </div>
                <div class="rounded-xl bg-gray-900 border border-gray-800 p-3.5 space-y-1">
                  <div class="text-gray-400 font-medium">Spread Scénarios : <span class="font-bold text-white font-mono">±{{ quantAiResult.risk_spread }}%</span></div>
                </div>
              </div>
            </div>

            <!-- Nitro Audit Cascades (Conservé) -->
            <div v-if="parsedAuditData" class="space-y-6">
              <h3 class="text-lg font-bold text-white flex items-center gap-2">
                <span>📋</span>
                <span>Audit Trail des Cascades Nitro</span>
              </h3>

              <!-- 4 Tables for Growth, Margin, P/E, Discount Rate -->
              <div class="grid gap-6 md:grid-cols-2">
                <!-- Croissance -->
                <div class="rounded-xl border border-gray-800 bg-gray-950 p-5 space-y-3">
                  <div class="flex justify-between items-center border-b border-gray-800 pb-2">
                    <h4 class="font-bold text-white text-sm">1. Croissance (g)</h4>
                    <span class="text-xs text-emerald-400 font-mono">Retenu : {{ (parsedAuditData.growth?.selected * 100).toFixed(1) }}%</span>
                  </div>
                  <div class="space-y-2">
                    <div v-for="c in parsedAuditData.growth?.candidates || []" :key="c.name" class="flex justify-between text-xs p-2 rounded bg-gray-900">
                      <span class="text-gray-300">{{ c.name }}</span>
                      <span :class="c.status === 'selected' ? 'text-emerald-400 font-bold' : 'text-gray-500'">
                        {{ c.value !== null ? `${(c.value * 100).toFixed(1)}%` : '-' }} ({{ c.status }})
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Marge Nette -->
                <div class="rounded-xl border border-gray-800 bg-gray-950 p-5 space-y-3">
                  <div class="flex justify-between items-center border-b border-gray-800 pb-2">
                    <h4 class="font-bold text-white text-sm">2. Marge Nette (m)</h4>
                    <span class="text-xs text-emerald-400 font-mono">Retenu : {{ (parsedAuditData.margin?.selected * 100).toFixed(1) }}%</span>
                  </div>
                  <div class="space-y-2">
                    <div v-for="c in parsedAuditData.margin?.candidates || []" :key="c.name" class="flex justify-between text-xs p-2 rounded bg-gray-900">
                      <span class="text-gray-300">{{ c.name }}</span>
                      <span :class="c.status === 'selected' ? 'text-emerald-400 font-bold' : 'text-gray-500'">
                        {{ c.value !== null ? `${(c.value * 100).toFixed(1)}%` : '-' }} ({{ c.status }})
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Exit Multiple -->
                <div class="rounded-xl border border-gray-800 bg-gray-950 p-5 space-y-3">
                  <div class="flex justify-between items-center border-b border-gray-800 pb-2">
                    <h4 class="font-bold text-white text-sm">3. Exit Multiple (P/E)</h4>
                    <span class="text-xs text-emerald-400 font-mono">Retenu : {{ parsedAuditData.pe?.selected }}x</span>
                  </div>
                  <div class="space-y-2">
                    <div v-for="c in parsedAuditData.pe?.candidates || []" :key="c.name" class="flex justify-between text-xs p-2 rounded bg-gray-900">
                      <span class="text-gray-300">{{ c.name }}</span>
                      <span :class="c.status === 'selected' ? 'text-emerald-400 font-bold' : 'text-gray-500'">
                        {{ c.value !== null ? `${c.value}x` : '-' }} ({{ c.status }})
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Discount Rate -->
                <div class="rounded-xl border border-gray-800 bg-gray-950 p-5 space-y-3">
                  <div class="flex justify-between items-center border-b border-gray-800 pb-2">
                    <h4 class="font-bold text-white text-sm">4. Taux Actualisation (r)</h4>
                    <span class="text-xs text-emerald-400 font-mono">Retenu : {{ (parsedAuditData.discount_rate?.selected * 100).toFixed(1) }}%</span>
                    </div>
                  <div class="space-y-2">
                    <div v-for="c in parsedAuditData.discount_rate?.candidates || []" :key="c.name" class="flex justify-between text-xs p-2 rounded bg-gray-900">
                      <span class="text-gray-300">{{ c.name }}</span>
                      <span :class="c.status === 'selected' ? 'text-emerald-400 font-bold' : 'text-gray-500'">
                        {{ c.value !== null ? `${(c.value * 100).toFixed(1)}%` : '-' }} ({{ c.status }})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 2: QUANT & REGRESSION -->
        <div v-else-if="activeTab === 'quant'" class="space-y-6">
          <WorkspaceQuant
            :ticker="stock.ticker"
            :currency="stock.currency"
            :current-price="stock.current_price"
            :stock-id="stock.id"
            :initial-preset="stock.quant_preset"
            :initial-start-date="stock.quant_start_date"
            :initial-end-date="stock.quant_end_date"
          />
        </div>



        <!-- TAB 3: DEEP RESEARCH QUALITATIVE -->
        <div v-else-if="activeTab === 'research'">
          <WorkspaceResearch
            :ticker="tickerParam"
            :stock-name="stock.name || stock.ticker"
            :stock-id="stock.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>
