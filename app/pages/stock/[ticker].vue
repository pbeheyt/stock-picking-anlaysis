<script setup lang="ts">
import type { Stock, GrowthMode, AuditData, StockStatus } from '~/types/database.types'
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

const route = useRoute()
const tickerParam = computed(() => String(route.params.ticker || '').toUpperCase())

const isLoading = ref(true)
const isSaving = ref(false)
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)

const stock = ref<Stock | null>(null)
const activeTab = ref<'dcf' | 'quant' | 'research' | 'sourcing'>('dcf')

// Local Editable Hypotheses
const growthMode = ref<GrowthMode>('cagr')
const growth = ref(0.10)
const growthY1 = ref(0.10)
const growthY2 = ref(0.10)
const growthY3 = ref(0.10)
const growthY4 = ref(0.10)
const growthY5 = ref(0.10)
const margin = ref(0.20)
const targetMultiple = ref(20.0)
const discountRate = ref(0.10)
const riskSpread = ref(0.20)

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
          projected_margin: apiData.default_margin,
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
  margin.value = s.projected_margin ?? 0.20
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

const saveHypotheses = async () => {
  if (!stock.value) return
  isSaving.value = true
  successMessage.value = null
  try {
    const updated = await $fetch<Stock>(`/api/stocks/${stock.value.id}`, {
      method: 'PUT',
      body: {
        currency: stock.value.currency,
        beta: Number(stock.value.beta),
        growth_mode: growthMode.value,
        projected_growth: Number(growth.value),
        growth_y1: Number(growthY1.value),
        growth_y2: Number(growthY2.value),
        growth_y3: Number(growthY3.value),
        growth_y4: Number(growthY4.value),
        growth_y5: Number(growthY5.value),
        margin_type: 'net_income',
        projected_margin: Number(margin.value),
        target_multiple: Number(targetMultiple.value),
        discount_rate: Number(discountRate.value),
        risk_spread: Number(riskSpread.value),
      },
    })
    stock.value = { ...stock.value, ...updated }
    successMessage.value = 'Hypothèses de valorisation sauvegardées en SQLite.'
    setTimeout(() => { successMessage.value = null }, 4000)
  } catch (err: any) {
    console.error('Erreur sauvegarde hypothèses:', err)
  } finally {
    isSaving.value = false
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
  margin: margin.value,
  targetMultiple: targetMultiple.value,
  discountRate: discountRate.value,
  riskSpread: riskSpread.value,
}))

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

// Projections des CA sur 5 ans pour la grille
const revenueProjections = computed(() => {
  const baseRev = stock.value?.revenue_ttm ?? 0
  if (!baseRev) return []

  if (growthMode.value === 'cagr') {
    const g = growth.value
    return [1, 2, 3, 4, 5].map(year => ({
      year,
      growth: g,
      revenue: baseRev * Math.pow(1 + g, year),
    }))
  } else {
    const rates = [growthY1.value, growthY2.value, growthY3.value, growthY4.value, growthY5.value]
    let current = baseRev
    return rates.map((r, idx) => {
      current = current * (1 + r)
      return {
        year: idx + 1,
        growth: r,
        revenue: current,
      }
    })
  }
})

// Handlers d'édition bidirectionnelle CA ($) <-> Croissance (%)
const updateGrowthY = (yearIndex: number, newRate: number) => {
  if (growthMode.value === 'cagr') {
    growth.value = newRate
  } else {
    if (yearIndex === 0) growthY1.value = newRate
    else if (yearIndex === 1) growthY2.value = newRate
    else if (yearIndex === 2) growthY3.value = newRate
    else if (yearIndex === 3) growthY4.value = newRate
    else if (yearIndex === 4) growthY5.value = newRate
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
            <span>DCF & Simulation</span>
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

          <button
            type="button"
            class="whitespace-nowrap pb-4 px-1 border-b-2 font-bold text-sm transition flex items-center gap-2"
            :class="activeTab === 'sourcing' 
              ? 'border-emerald-500 text-emerald-400' 
              : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700'"
            @click="activeTab = 'sourcing'"
          >
            <span>🔍</span>
            <span>Sourcing & Audit Trail</span>
          </button>
        </nav>
      </div>

      <!-- Tab Content Area -->
      <div class="space-y-8">
        <!-- TAB 1: DCF & SIMULATION -->
        <div v-if="activeTab === 'dcf'" class="space-y-8">
          <!-- Notification Toast -->
          <div v-if="successMessage" class="rounded-xl border border-emerald-500/40 bg-emerald-950/60 p-4 text-xs font-semibold text-emerald-300">
            {{ successMessage }}
          </div>

          <!-- Section 1 : 📈 Trajectoire CA 5Y -->
          <div class="rounded-2xl border border-gray-800 bg-gray-950/70 p-6 space-y-6 shadow-xl backdrop-blur">
            <div class="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <h2 class="text-base font-bold text-white flex items-center gap-2">
                  <span>📈</span>
                  <span>Trajectoire Chiffre d'Affaires 5 ans</span>
                </h2>
                <p class="text-xs text-gray-400 mt-1">Définissez la dynamique de croissance des revenus et visualisez la projection An 5.</p>
              </div>

              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition shadow-md disabled:opacity-50"
                :disabled="isSaving"
                @click="saveHypotheses"
              >
                <span>{{ isSaving ? 'Sauvegarde...' : 'Sauvegarder Hypothèses' }}</span>
              </button>
            </div>

            <!-- Switch Mode Croissance -->
            <div class="flex items-center gap-6 bg-gray-900/60 p-3 rounded-xl border border-gray-800">
              <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Mode :</span>
              <label class="inline-flex items-center gap-2 text-xs font-medium text-white cursor-pointer">
                <input v-model="growthMode" type="radio" value="cagr" class="text-emerald-500 focus:ring-emerald-500" />
                <span>CAGR Constant (g)</span>
              </label>
              <label class="inline-flex items-center gap-2 text-xs font-medium text-white cursor-pointer">
                <input v-model="growthMode" type="radio" value="explicit" class="text-emerald-500 focus:ring-emerald-500" />
                <span>Mode Sur-Mesure 5 ans (Y1..Y5)</span>
              </label>
            </div>

            <!-- Sliders Croissance & EditableValue -->
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              <div v-if="growthMode === 'cagr'" class="col-span-full space-y-2 max-w-xl">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-medium text-gray-400">Taux de Croissance Annuel CAGR (g)</span>
                  <EditableValue v-model="growth" type="percent" :is-decimal="true" :step="0.1" />
                </div>
                <input v-model.number="growth" type="range" min="-0.50" max="1.50" step="0.005" class="w-full accent-emerald-500" />
              </div>

              <template v-else>
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-gray-400 font-medium">Année 1</span>
                    <EditableValue v-model="growthY1" type="percent" :is-decimal="true" :step="0.1" />
                  </div>
                  <input v-model.number="growthY1" type="range" min="-0.50" max="1.50" step="0.005" class="w-full accent-emerald-500" />
                </div>

                <div class="space-y-2">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-gray-400 font-medium">Année 2</span>
                    <EditableValue v-model="growthY2" type="percent" :is-decimal="true" :step="0.1" />
                  </div>
                  <input v-model.number="growthY2" type="range" min="-0.50" max="1.50" step="0.005" class="w-full accent-emerald-500" />
                </div>

                <div class="space-y-2">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-gray-400 font-medium">Année 3</span>
                    <EditableValue v-model="growthY3" type="percent" :is-decimal="true" :step="0.1" />
                  </div>
                  <input v-model.number="growthY3" type="range" min="-0.50" max="1.50" step="0.005" class="w-full accent-emerald-500" />
                </div>

                <div class="space-y-2">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-gray-400 font-medium">Année 4</span>
                    <EditableValue v-model="growthY4" type="percent" :is-decimal="true" :step="0.1" />
                  </div>
                  <input v-model.number="growthY4" type="range" min="-0.50" max="1.50" step="0.005" class="w-full accent-emerald-500" />
                </div>

                <div class="space-y-2">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-gray-400 font-medium">Année 5</span>
                    <EditableValue v-model="growthY5" type="percent" :is-decimal="true" :step="0.1" />
                  </div>
                  <input v-model.number="growthY5" type="range" min="-0.50" max="1.50" step="0.005" class="w-full accent-emerald-500" />
                </div>
              </template>
            </div>

            <!-- Grille d'évolution des CA sur 5 ans (Édition Manuelle Interactive) -->
            <div class="space-y-3 pt-2 border-t border-gray-800/60">
              <div class="flex items-center justify-between">
                <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400">Projection Annuelle du Chiffre d'Affaires (Cliquer pour éditer)</h3>
                <span class="text-[11px] text-gray-500 hidden sm:inline">Cliquer sur n'importe quel chiffre pour le modifier</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-5 gap-3">
                <div v-for="item in revenueProjections" :key="item.year" class="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-2 text-center group">
                  <div class="flex items-center justify-between text-[11px] font-mono text-gray-400 border-b border-gray-800/80 pb-1.5">
                    <span>Année {{ item.year }}</span>
                    <EditableValue
                      :model-value="item.growth"
                      type="percent"
                      :is-decimal="true"
                      :step="0.1"
                      @change="v => updateGrowthY(item.year - 1, v)"
                    />
                  </div>

                  <div class="py-1">
                    <EditableValue
                      :model-value="item.revenue"
                      type="scaledCurrency"
                      :currency="stock?.currency || 'USD'"
                      :is-decimal="false"
                      :step="1000000"
                      @change="v => updateRevenueForYear(item.year - 1, v)"
                    />
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs">
                <div>
                  <span class="text-gray-400">CA Final An 5 Projeté : </span>
                  <span class="font-bold text-emerald-400 text-sm ml-1">{{ formatScaledCurrency(scenarios.base.revenue5Y, stock.currency) }}</span>
                </div>
                <div>
                  <span class="text-gray-400">CAGR Équivalent 5 ans : </span>
                  <span class="font-bold text-emerald-400 text-sm ml-1">{{ formatPercent(scenarios.base.equivalentCAGR, true) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 2 : ⚙️ Hypothèses Financières & Risque -->
          <div class="rounded-2xl border border-gray-800 bg-gray-950/70 p-6 space-y-6 shadow-xl backdrop-blur">
            <h2 class="text-base font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-4">
              <span>⚙️</span>
              <span>Hypothèses Financières & Risque</span>
            </h2>

            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <!-- Marge Nette (m) -->
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-medium text-gray-400">Marge Nette Cible (m)</span>
                  <EditableValue v-model="margin" type="percent" :is-decimal="true" :step="0.5" />
                </div>
                <input v-model.number="margin" type="range" min="0.00" max="0.80" step="0.005" class="w-full accent-emerald-500" />
              </div>

              <!-- Multiple Exit (P/E) -->
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-medium text-gray-400">Multiple Exit (P/E)</span>
                  <EditableValue v-model="targetMultiple" type="multiple" :is-decimal="false" :step="0.5" />
                </div>
                <input v-model.number="targetMultiple" type="range" min="5" max="120" step="0.5" class="w-full accent-emerald-500" />
              </div>

              <!-- Taux d'Actualisation (r) -->
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-medium text-gray-400">Taux Actualisation (r)</span>
                  <EditableValue v-model="discountRate" type="percent" :is-decimal="true" :step="0.25" :digits="2" />
                </div>
                <input v-model.number="discountRate" type="range" min="0.05" max="0.20" step="0.0025" class="w-full accent-emerald-500" />
              </div>

              <!-- Risk Spread -->
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

          <!-- Dual-Track Spectrum (Standardisé Bloomberg) -->
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
                  <!-- Track Rail with Gradient -->
                  <div class="h-3.5 w-full rounded-full bg-gradient-to-r from-red-500/25 via-amber-500/25 to-emerald-500/25 border border-gray-800 relative shadow-inner">
                    <!-- Bear Line (Rouge) -->
                    <div class="absolute top-0 bottom-0 w-0.5 bg-rose-500 shadow-md z-10" :style="{ left: `${spectrumData.bearPos}%` }">
                      <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                        {{ formatCurrency(spectrumData.bearVal, stock.currency) }}
                      </div>
                      <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-rose-400 whitespace-nowrap">
                        Bear
                      </div>
                    </div>

                    <!-- Base Line (Jaune) -->
                    <div class="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-md z-20" :style="{ left: `${spectrumData.basePos}%` }">
                      <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                        {{ formatCurrency(spectrumData.baseVal, stock.currency) }}
                      </div>
                      <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-amber-400 whitespace-nowrap">
                        Base
                      </div>
                    </div>

                    <!-- Bull Line (Vert) -->
                    <div class="absolute top-0 bottom-0 w-0.5 bg-emerald-400 shadow-md z-10" :style="{ left: `${spectrumData.bullPos}%` }">
                      <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                        {{ formatCurrency(spectrumData.bullVal, stock.currency) }}
                      </div>
                      <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-emerald-400 whitespace-nowrap">
                        Bull
                      </div>
                    </div>

                    <!-- Price P0 Line (Blanc Pur) -->
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
                <div class="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  Consensus Wall Street (Analystes 12M)
                </div>

                <div class="relative pt-6 pb-6">
                  <!-- Track Rail with Gradient -->
                  <div class="h-3.5 w-full rounded-full bg-gradient-to-r from-red-500/25 via-amber-500/25 to-emerald-500/25 border border-gray-800 relative shadow-inner">
                    <!-- Low Line (Rouge) -->
                    <div v-if="spectrumData.lowPos !== null" class="absolute top-0 bottom-0 w-0.5 bg-rose-500 shadow-md z-10" :style="{ left: `${spectrumData.lowPos}%` }">
                      <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                        {{ formatCurrency(spectrumData.lowVal, stock.currency) }}
                      </div>
                      <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-rose-400 whitespace-nowrap">
                        Low
                      </div>
                    </div>

                    <!-- Mean/Median Line (Jaune) -->
                    <div v-if="spectrumData.meanPos !== null" class="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-md z-20" :style="{ left: `${spectrumData.meanPos}%` }">
                      <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                        {{ formatCurrency(spectrumData.meanVal, stock.currency) }}
                      </div>
                      <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-amber-400 whitespace-nowrap">
                        Moyen
                      </div>
                    </div>

                    <!-- High Line (Vert) -->
                    <div v-if="spectrumData.highPos !== null" class="absolute top-0 bottom-0 w-0.5 bg-emerald-400 shadow-md z-10" :style="{ left: `${spectrumData.highPos}%` }">
                      <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                        {{ formatCurrency(spectrumData.highVal, stock.currency) }}
                      </div>
                      <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-emerald-400 whitespace-nowrap">
                        High
                      </div>
                    </div>

                    <!-- Price P0 Line on Wall St track (Blanc Pur) -->
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
            <!-- Bear -->
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

            <!-- Base -->
            <div
              class="rounded-xl border p-5 space-y-3 shadow-lg"
              :class="isUndervalued ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-rose-500/40 bg-rose-950/20'"
            >
              <div class="flex justify-between items-center">
                <span class="font-bold text-sm" :class="isUndervalued ? 'text-emerald-400' : 'text-rose-400'">🎯 Scénario Base</span>
                <span class="text-xs font-mono text-gray-400">Hypothèses centrales</span>
              </div>
              <div
                class="text-3xl font-black"
                :class="isUndervalued ? 'text-emerald-400' : 'text-rose-400'"
              >
                {{ formatCurrency(scenarios.base.fairValue, stock.currency) }}
              </div>
              <div class="text-xs text-gray-300 space-y-1">
                <div>MoS : <span class="font-semibold" :class="isUndervalued ? 'text-emerald-300' : 'text-rose-300'">{{ formatPercent(scenarios.base.marginOfSafety) }}</span></div>
                <div>Target Price 5Y : <span class="text-gray-200">{{ formatCurrency(scenarios.base.targetPrice5Y, stock.currency) }}</span></div>
              </div>
            </div>

            <!-- Bull -->
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

          <!-- Reverse DCF (Utilitaire Scalé Appliqué) -->
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

        <!-- TAB 2: QUANT & REGRESSION -->
        <div v-else-if="activeTab === 'quant'" class="space-y-6">
          <WorkspaceQuant
            :ticker="stock.ticker"
            :currency="stock.currency"
            :current-price="stock.current_price"
          />
        </div>


        <!-- TAB 3: DEEP RESEARCH QUALITATIVE -->
        <div v-else-if="activeTab === 'research'" class="space-y-6">
          <div class="rounded-2xl border border-dashed border-gray-800 bg-gray-950/50 p-12 text-center space-y-6">
            <div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 text-2xl font-bold">
              🧠
            </div>

            <div class="max-w-md mx-auto space-y-2">
              <span class="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400 border border-purple-500/30">
                Phase 3 — En développement
              </span>
              <h3 class="text-xl font-bold text-white">Deep Research Qualitative & AI Agent</h3>
              <p class="text-xs text-gray-400 leading-relaxed">
                Parsing automatique des rapports SEC 10-K/10-Q, évaluation du Moat concurrentiel, sentiment analysis du management et matrice de risques qualitative.
              </p>
            </div>

            <div class="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto pt-6 opacity-40">
              <div class="h-40 rounded-xl bg-gray-900 border border-gray-800 animate-pulse p-5 space-y-4">
                <div class="h-4 w-1/3 bg-gray-800 rounded" />
                <div class="h-3 w-full bg-gray-800 rounded" />
                <div class="h-3 w-4/5 bg-gray-800 rounded" />
              </div>
              <div class="h-40 rounded-xl bg-gray-900 border border-gray-800 animate-pulse p-5 space-y-4">
                <div class="h-4 w-1/3 bg-gray-800 rounded" />
                <div class="h-3 w-full bg-gray-800 rounded" />
                <div class="h-3 w-4/5 bg-gray-800 rounded" />
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 4: SOURCING & AUDIT TRAIL -->
        <div v-else-if="activeTab === 'sourcing'" class="space-y-8">
          <!-- Wall Street Target Range -->
          <div class="rounded-2xl border border-gray-800 bg-gray-950/70 p-6 space-y-4 shadow-xl backdrop-blur">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <span>🏛️</span>
              <span>Consensus & Objectifs Wall Street</span>
            </h3>

            <div class="grid gap-4 sm:grid-cols-4">
              <div class="rounded-xl bg-gray-900 p-4 border border-gray-800">
                <div class="text-xs text-gray-400 font-medium">Low Target</div>
                <div class="text-lg font-bold text-rose-400">{{ formatCurrency(stock.analyst_target_low, stock.currency) }}</div>
              </div>

              <div class="rounded-xl bg-gray-900 p-4 border border-gray-800">
                <div class="text-xs text-gray-400 font-medium">Median Target</div>
                <div class="text-lg font-bold text-white">{{ formatCurrency(stock.analyst_target_median, stock.currency) }}</div>
              </div>

              <div class="rounded-xl bg-gray-900 p-4 border border-gray-800">
                <div class="text-xs text-gray-400 font-medium">Mean Target</div>
                <div class="text-lg font-bold text-emerald-400">{{ formatCurrency(stock.analyst_target_price, stock.currency) }}</div>
              </div>

              <div class="rounded-xl bg-gray-900 p-4 border border-gray-800">
                <div class="text-xs text-gray-400 font-medium">High Target</div>
                <div class="text-lg font-bold text-blue-400">{{ formatCurrency(stock.analyst_target_high, stock.currency) }}</div>
              </div>
            </div>
          </div>

          <!-- Nitro Audit Cascades -->
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

          <!-- Raw Yahoo Metrics (Formater avec Scaled Currency) -->
          <div class="rounded-2xl border border-gray-800 bg-gray-950/70 p-6 space-y-4 shadow-xl backdrop-blur">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <span>📊</span>
              <span>Données Brutes Yahoo Finance</span>
            </h3>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div class="p-3 bg-gray-900 rounded-lg border border-gray-800">
                <div class="text-gray-400">Market Cap</div>
                <div class="font-bold text-white text-sm mt-1">{{ formatScaledCurrency(stock.market_cap, stock.currency) }}</div>
              </div>
              <div class="p-3 bg-gray-900 rounded-lg border border-gray-800">
                <div class="text-gray-400">Revenue TTM</div>
                <div class="font-bold text-white text-sm mt-1">{{ formatScaledCurrency(stock.revenue_ttm, stock.currency) }}</div>
              </div>
              <div class="p-3 bg-gray-900 rounded-lg border border-gray-800">
                <div class="text-gray-400">P/E Trailing</div>
                <div class="font-bold text-white text-sm mt-1">{{ stock.pe_trailing_raw ? `${stock.pe_trailing_raw.toFixed(2)}x` : '-' }}</div>
              </div>
              <div class="p-3 bg-gray-900 rounded-lg border border-gray-800">
                <div class="text-gray-400">P/E Forward</div>
                <div class="font-bold text-white text-sm mt-1">{{ stock.pe_forward_raw ? `${stock.pe_forward_raw.toFixed(2)}x` : '-' }}</div>
              </div>
              <div class="p-3 bg-gray-900 rounded-lg border border-gray-800">
                <div class="text-gray-400">Marge Nette TTM</div>
                <div class="font-bold text-white text-sm mt-1">{{ formatPercent(stock.margin_net_raw, true) }}</div>
              </div>
              <div class="p-3 bg-gray-900 rounded-lg border border-gray-800">
                <div class="text-gray-400">Marge FCF TTM</div>
                <div class="font-bold text-white text-sm mt-1">{{ formatPercent(stock.margin_fcf_raw, true) }}</div>
              </div>
              <div class="p-3 bg-gray-900 rounded-lg border border-gray-800">
                <div class="text-gray-400">Trésorerie Totale</div>
                <div class="font-bold text-white text-sm mt-1">{{ formatScaledCurrency(stock.total_cash, stock.currency) }}</div>
              </div>
              <div class="p-3 bg-gray-900 rounded-lg border border-gray-800">
                <div class="text-gray-400">Dette Totale</div>
                <div class="font-bold text-white text-sm mt-1">{{ formatScaledCurrency(stock.total_debt, stock.currency) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
