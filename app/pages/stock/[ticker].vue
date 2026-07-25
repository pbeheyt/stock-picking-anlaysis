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
  formatCurrency,
  formatPercent,
} from '~/utils/format'
import AIResearchModal from '~/components/workspace/AIResearchModal.vue'
import AuditTrailDrawer from '~/components/workspace/AuditTrailDrawer.vue'
import DualTrackSpectrum from '~/components/workspace/DualTrackSpectrum.vue'
import DCFScenarios from '~/components/workspace/DCFScenarios.vue'
import PnLModelGrid from '~/components/workspace/PnLModelGrid.vue'
import type { QuantitativeAIResult } from '~/server/api/stock/[ticker]/quantitative.post'

const route = useRoute()
const tickerParam = computed(() => String(route.params.ticker || '').toUpperCase())

const isLoading = ref(true)
const isSaving = ref(false)
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)

const stock = ref<Stock | null>(null)
const activeTab = ref<'dcf' | 'quant' | 'research'>('dcf')

// Modal & Drawer States
const isAiModalOpen = ref(false)
const isAuditDrawerOpen = ref(false)

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

import { getApiHeaders } from '~/utils/apiHeaders'

const handleAnalyzeQuant = async (payload: { rawReport: string; modelId?: string } | string, modelArg?: string) => {
  const rawReport = typeof payload === 'string' ? payload : payload.rawReport
  const model = typeof payload === 'string' ? modelArg : payload.modelId

  isAnalyzingQuant.value = true
  quantAiErrorMessage.value = null
  try {
    const res = await $fetch<QuantitativeAIResult>(`/api/stock/${encodeURIComponent(tickerParam.value)}/quantitative`, {
      method: 'POST',
      headers: getApiHeaders(),
      body: { raw_report: rawReport, model },
    })
    quantAiResult.value = res

    injectAICopilotProjections()
    saveHypotheses(true)
  } catch (err: any) {
    console.error('Erreur analyse quanti AI:', err)
    quantAiErrorMessage.value = err?.data?.statusMessage || err?.response?._data?.statusMessage || err?.message || 'Erreur lors de l\'analyse par l\'IA.'
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

  isAiModalOpen.value = false
  isAuditDrawerOpen.value = false
  successMessage.value = 'Hypothèses de l\'IA extraites et injectées avec succès dans le DCF 5Y !'
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

    isAuditDrawerOpen.value = false
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
    if (found.quanti_ai_data) {
      try {
        quantAiResult.value = typeof found.quanti_ai_data === 'string'
          ? JSON.parse(found.quanti_ai_data)
          : found.quanti_ai_data
      } catch {}
    }

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

// Auto-save debounced (1200ms)
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

// Projections P&L 5 ans
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

// Spectrum data calculation
const spectrumData = computed(() => {
  const price = stock.value?.current_price ?? 0
  const bear = scenarios.value.bear.fairValue
  const base = scenarios.value.base.fairValue
  const bull = scenarios.value.bull.fairValue

  const low = stock.value?.analyst_target_low ?? null
  const mean = stock.value?.analyst_target_price ?? stock.value?.analyst_target_median ?? null
  const high = stock.value?.analyst_target_high ?? null

  const allVals = [price, bear, base, bull, low, mean, high].filter((v): v is number => v !== null && !isNaN(v) && v > 0)
  if (allVals.length === 0) return null

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
    <!-- Error State -->
    <div v-if="errorMessage" class="rounded-xl border border-rose-500/30 bg-rose-950/40 p-6 text-xs text-rose-300 font-mono">
      {{ errorMessage }}
    </div>

    <!-- Loading State -->
    <div v-else-if="isLoading" class="py-24 text-center text-xs text-zinc-500 font-mono">
      Chargement du workspace pour {{ tickerParam }}...
    </div>

    <!-- Workspace Loaded -->
    <div v-else-if="stock" class="space-y-8">
      <!-- Workspace Header -->
      <div class="rounded-2xl border border-zinc-800/80 bg-zinc-950/80 p-6 shadow-2xl backdrop-blur">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <!-- Left: Stock Meta -->
          <div class="flex items-center gap-5">
            <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 font-mono font-black text-xl text-emerald-400 shadow-inner">
              {{ stock.ticker }}
            </div>
            <div>
              <div class="flex items-center gap-3 flex-wrap">
                <h1 class="text-xl font-bold tracking-tight text-white">
                  {{ stock.name || stock.ticker }}
                </h1>
                <span class="rounded-md bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-xs font-mono text-zinc-400">
                  Bêta {{ stock.beta ? stock.beta.toFixed(2) : '1.00' }}
                </span>
                <span
                  class="rounded-md border px-2.5 py-0.5 text-xs font-mono font-bold"
                  :class="badgeConfig.class"
                >
                  {{ badgeConfig.label }} ({{ formatPercent(marginOfSafety) }})
                </span>
              </div>

              <div class="mt-2 flex items-center gap-6 text-xs text-zinc-400 font-mono flex-wrap">
                <div>
                  <span class="text-zinc-500">P0:</span> <span class="font-bold text-white text-sm">{{ formatCurrency(stock.current_price, stock.currency) }}</span>
                </div>
                <div>
                  <span class="text-zinc-500">DCF Fair Value:</span> 
                  <span
                    class="font-bold text-sm ml-1"
                    :class="isUndervalued ? 'text-emerald-400' : 'text-rose-400'"
                  >
                    {{ formatCurrency(fairValue, stock.currency) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="border-b border-zinc-800">
        <nav class="-mb-px flex space-x-6 overflow-x-auto scrollbar-none font-mono">
          <button
            type="button"
            class="whitespace-nowrap pb-3.5 px-1 border-b-2 font-bold text-xs transition flex items-center gap-2"
            :class="activeTab === 'dcf' 
              ? 'border-emerald-500 text-emerald-400' 
              : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'"
            @click="activeTab = 'dcf'"
          >
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>DCF & Thèse Quantitative</span>
          </button>

          <button
            type="button"
            class="whitespace-nowrap pb-3.5 px-1 border-b-2 font-bold text-xs transition flex items-center gap-2"
            :class="activeTab === 'quant' 
              ? 'border-emerald-500 text-emerald-400' 
              : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'"
            @click="activeTab = 'quant'"
          >
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <span>Quant & Régression</span>
          </button>

          <button
            type="button"
            class="whitespace-nowrap pb-3.5 px-1 border-b-2 font-bold text-xs transition flex items-center gap-2"
            :class="activeTab === 'research' 
              ? 'border-emerald-500 text-emerald-400' 
              : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'"
            @click="activeTab = 'research'"
          >
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>Deep Research Qualitative</span>
          </button>
        </nav>
      </div>

      <!-- Tab Content Area -->
      <div class="space-y-8">
        <!-- TAB 1: DCF & THÈSE QUANTITATIVE -->
        <div v-if="activeTab === 'dcf'" class="space-y-8">
          
          <!-- Section 1 : PnL Model Grid Component -->
          <PnLModelGrid
            :stock="stock"
            :scenarios="scenarios"
            :revenue-projections="revenueProjections"
            :growth-mode="growthMode"
            :margin-mode="marginMode"
            :growth="growth"
            :growth-y1="growthY1"
            :growth-y2="growthY2"
            :growth-y3="growthY3"
            :growth-y4="growthY4"
            :growth-y5="growthY5"
            :margin="margin"
            :margin-y1="marginY1"
            :margin-y2="marginY2"
            :margin-y3="marginY3"
            :margin-y4="marginY4"
            :margin-y5="marginY5"
            :quant-ai-result="quantAiResult"
            @update:growth-y="handleUpdateGrowthY"
            @update:margin-y="handleUpdateMarginY"
            @update:revenue-for-year="handleUpdateRevenueForYear"
            @propagate-growth="handlePropagateGrowth"
            @propagate-margin="handlePropagateMargin"
            @open-ai-modal="isAiModalOpen = true"
            @open-audit-drawer="isAuditDrawerOpen = true"
          />

          <!-- Section 2 : Valorisation & Multiples de Sortie -->
          <div class="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-6 space-y-6 shadow-xl backdrop-blur">
            <div>
              <h2 class="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-zinc-800 pb-2.5">
                Valorisation & Multiples de Sortie
              </h2>
            </div>
            <div class="grid gap-6 md:grid-cols-3">
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-medium text-zinc-400">Multiple Exit (P/E)</span>
                  <EditableValue v-model="targetMultiple" type="multiple" :is-decimal="false" :step="0.5" />
                </div>
                <input v-model.number="targetMultiple" type="range" min="5" max="120" step="0.5" class="w-full accent-emerald-500" />
              </div>
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-medium text-zinc-400">Taux Actualisation / WACC (r)</span>
                  <EditableValue v-model="discountRate" type="percent" :is-decimal="true" :step="0.25" :digits="2" />
                </div>
                <input v-model.number="discountRate" type="range" min="0.05" max="0.20" step="0.0025" class="w-full accent-emerald-500" />
              </div>
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-medium text-zinc-400">Spread Bêta / Scénarios</span>
                  <div class="flex items-center gap-1">
                    <span class="text-zinc-400">±</span>
                    <EditableValue v-model="riskSpread" type="percent" :is-decimal="true" :step="1" :digits="0" />
                  </div>
                </div>
                <input v-model.number="riskSpread" type="range" min="0.05" max="0.50" step="0.01" class="w-full accent-emerald-500" />
              </div>
            </div>
          </div>


          <!-- Dual-Track Spectrum Component -->
          <DualTrackSpectrum
            v-if="spectrumData"
            :spectrum-data="spectrumData"
            :currency="stock.currency"
            :analyst-count="stock.analyst_count"
          />

          <!-- Scénarios & Reverse DCF Component -->
          <DCFScenarios
            :scenarios="scenarios"
            :reverse-d-c-f="reverseDCF"
            :current-price="stock.current_price || 0"
            :currency="stock.currency"
            :risk-spread="riskSpread"
          />
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

    <!-- Modal Workflow IA -->
    <AIResearchModal
      :is-open="isAiModalOpen"
      :ticker="tickerParam"
      :stock-name="stock?.name || tickerParam"
      :prompt-text="quantiPromptText"
      :is-analyzing="isAnalyzingQuant"
      :error-message="quantAiErrorMessage"
      @close="isAiModalOpen = false"
      @analyze="handleAnalyzeQuant"
      @cancel="isAnalyzingQuant = false"
    />

    <!-- Drawer Audit Trail & Sources -->
    <AuditTrailDrawer
      :is-open="isAuditDrawerOpen"
      :ticker="tickerParam"
      :parsed-audit-data="parsedAuditData"
      :quant-ai-result="quantAiResult"
      @close="isAuditDrawerOpen = false"
      @inject-yahoo="injectYahooBaselineProjections"
      @inject-ai="injectAICopilotProjections"
      @open-ai-modal="isAuditDrawerOpen = false; isAiModalOpen = true"
    />
  </div>
</template>
