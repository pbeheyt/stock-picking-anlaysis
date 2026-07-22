<script setup lang="ts">
import type { Stock, GrowthMode, MarginType } from '~/types/database.types'
import {
  computeScenarios,
  computeReverseDCF,
  type ValuationInputs,
  type ScenarioResults,
  type ReverseDCFResult,
} from '~/utils/valuation'

const props = defineProps<{
  stock: Stock
}>()

const emit = defineEmits<{
  update: [stock: Stock]
  delete: [id: string, ticker: string]
}>()

const growthMode = ref<GrowthMode>(props.stock.growth_mode || 'cagr')
const growth = ref(props.stock.projected_growth ?? 0.10)
const growthY1 = ref(props.stock.growth_y1 ?? 0.10)
const growthY2 = ref(props.stock.growth_y2 ?? 0.10)
const growthY3 = ref(props.stock.growth_y3 ?? 0.10)
const growthY4 = ref(props.stock.growth_y4 ?? 0.10)
const growthY5 = ref(props.stock.growth_y5 ?? 0.10)
const marginType = ref<MarginType>(props.stock.margin_type || 'net_income')
const margin = ref(props.stock.projected_margin ?? 0.20)
const targetMultiple = ref(props.stock.target_multiple ?? 20.0)
const discountRate = ref(props.stock.discount_rate ?? 0.10)
const riskSpread = ref(props.stock.risk_spread ?? 0.20)

watch(() => props.stock, (newStock) => {
  growthMode.value = newStock.growth_mode || 'cagr'
  growth.value = newStock.projected_growth ?? 0.10
  growthY1.value = newStock.growth_y1 ?? 0.10
  growthY2.value = newStock.growth_y2 ?? 0.10
  growthY3.value = newStock.growth_y3 ?? 0.10
  growthY4.value = newStock.growth_y4 ?? 0.10
  growthY5.value = newStock.growth_y5 ?? 0.10
  marginType.value = newStock.margin_type || 'net_income'
  margin.value = newStock.projected_margin ?? 0.20
  targetMultiple.value = newStock.target_multiple ?? 20.0
  discountRate.value = newStock.discount_rate ?? 0.10
  riskSpread.value = newStock.risk_spread ?? 0.20
})

const valuationInputs = computed<ValuationInputs>(() => ({
  currentPrice: props.stock.current_price ?? 0,
  revenueTTM: props.stock.revenue_ttm ?? 0,
  sharesOutstanding: props.stock.shares_outstanding ?? 0,
  growthMode: growthMode.value,
  growth: growth.value,
  growthY1: growthY1.value,
  growthY2: growthY2.value,
  growthY3: growthY3.value,
  growthY4: growthY4.value,
  growthY5: growthY5.value,
  marginType: marginType.value,
  margin: margin.value,
  targetMultiple: targetMultiple.value,
  discountRate: discountRate.value,
  riskSpread: riskSpread.value,
}))

const scenarios = computed<ScenarioResults>(() => computeScenarios(valuationInputs.value))
const reverseDCF = computed<ReverseDCFResult>(() => computeReverseDCF(valuationInputs.value))

const marginOfSafety = computed(() => scenarios.value.base.marginOfSafety)
const fairValue = computed(() => scenarios.value.base.fairValue)

const badgeConfig = computed(() => {
  const mos = marginOfSafety.value
  if (mos > 15) return { label: 'Sous-évaluée', class: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' }
  if (mos >= 0) return { label: 'Fair Value', class: 'bg-amber-500/15 text-amber-400 border-amber-500/30' }
  return { label: 'Surévaluée', class: 'bg-red-500/15 text-red-400 border-red-500/30' }
})

const gaugeData = computed(() => {
  const bear = scenarios.value.bear.fairValue
  const base = scenarios.value.base.fairValue
  const bull = scenarios.value.bull.fairValue
  const price = props.stock.current_price ?? 0

  const min = Math.min(bear, price) * 0.85
  const max = Math.max(bull, price) * 1.15
  const range = max - min

  if (range <= 0) return { bearPos: 0, basePos: 50, bullPos: 100, pricePos: 50 }

  return {
    bearPos: ((bear - min) / range) * 100,
    basePos: ((base - min) / range) * 100,
    bullPos: ((bull - min) / range) * 100,
    pricePos: ((price - min) / range) * 100,
  }
})

// Calcul bidirectionnel des CA par année
const yearRevenues = computed(() => {
  const r0 = props.stock.revenue_ttm ?? 0
  const r1 = r0 * (1 + growthY1.value)
  const r2 = r1 * (1 + growthY2.value)
  const r3 = r2 * (1 + growthY3.value)
  const r4 = r3 * (1 + growthY4.value)
  const r5 = r4 * (1 + growthY5.value)
  return [r1, r2, r3, r4, r5]
})

function updateGrowthFromRevenue(yearIndex: number, newRevenueStr: string) {
  const newRevenue = parseFloat(newRevenueStr)
  if (isNaN(newRevenue) || newRevenue <= 0) return

  const r0 = props.stock.revenue_ttm ?? 0
  let prevRev = r0
  if (yearIndex === 1) prevRev = r0
  else if (yearIndex === 2) prevRev = yearRevenues.value[0]
  else if (yearIndex === 3) prevRev = yearRevenues.value[1]
  else if (yearIndex === 4) prevRev = yearRevenues.value[2]
  else if (yearIndex === 5) prevRev = yearRevenues.value[3]

  if (prevRev > 0) {
    const calcGrowth = (newRevenue / prevRev) - 1
    if (yearIndex === 1) growthY1.value = calcGrowth
    else if (yearIndex === 2) growthY2.value = calcGrowth
    else if (yearIndex === 3) growthY3.value = calcGrowth
    else if (yearIndex === 4) growthY4.value = calcGrowth
    else if (yearIndex === 5) growthY5.value = calcGrowth
  }
}

let saveTimeout: ReturnType<typeof setTimeout> | null = null

function debouncedSave() {
  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    const updated: Stock = {
      ...props.stock,
      growth_mode: growthMode.value,
      projected_growth: growth.value,
      growth_y1: growthY1.value,
      growth_y2: growthY2.value,
      growth_y3: growthY3.value,
      growth_y4: growthY4.value,
      growth_y5: growthY5.value,
      revenue_y1: yearRevenues.value[0],
      revenue_y2: yearRevenues.value[1],
      revenue_y3: yearRevenues.value[2],
      revenue_y4: yearRevenues.value[3],
      revenue_y5: yearRevenues.value[4],
      margin_type: marginType.value,
      projected_margin: margin.value,
      target_multiple: targetMultiple.value,
      discount_rate: discountRate.value,
      risk_spread: riskSpread.value,
    }
    emit('update', updated)
  }, 800)
}

watch([growthMode, growth, growthY1, growthY2, growthY3, growthY4, growthY5, marginType, margin, targetMultiple, discountRate, riskSpread], () => {
  debouncedSave()
})

function formatMoney(num: number | null): string {
  if (num === null || num === undefined) return 'N/A'
  const currencyCode = props.stock.currency || 'USD'
  try {
    const code = currencyCode.toUpperCase() === 'GBP' || currencyCode === 'GBP' ? 'GBP' : currencyCode.toUpperCase()
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: code,
      maximumFractionDigits: 2,
    }).format(num)
  } catch {
    return `${num.toFixed(2)} ${currencyCode}`
  }
}

function formatLargeNumber(num: number | null): string {
  if (num === null || num === undefined) return 'N/A'
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)} T`
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)} B`
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)} M`
  return num.toLocaleString('fr-FR')
}

function formatPercent(num: number): string {
  return `${(num * 100).toFixed(1)}%`
}

function formatMOS(num: number): string {
  const sign = num >= 0 ? '+' : ''
  return `${sign}${num.toFixed(1)}%`
}
</script>

<template>
  <div class="valuation-card group">
    <!-- Header -->
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2.5">
          <span class="ticker-badge">
            {{ stock.ticker }}
          </span>
          <h3 class="truncate text-base font-semibold text-white">
            {{ stock.name || stock.ticker }}
          </h3>
          <span class="rounded bg-gray-800 px-2 py-0.5 font-mono text-[10px] text-gray-300 border border-gray-700">
            {{ stock.currency || 'USD' }}
          </span>
          <span class="rounded bg-indigo-500/10 px-2 py-0.5 font-mono text-[10px] text-indigo-400 border border-indigo-500/20">
            Bêta: {{ stock.beta ?? 1.0 }}
          </span>
          <span
            class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold"
            :class="badgeConfig.class"
          >
            {{ badgeConfig.label }}
          </span>
        </div>
        <p class="mt-1 text-xs text-gray-500">
          Mis à jour le {{ new Date(stock.fetched_at).toLocaleString() }}
        </p>
      </div>
      <button
        type="button"
        class="shrink-0 rounded-lg p-2 text-gray-600 transition hover:bg-red-950/50 hover:text-red-400"
        title="Supprimer l'action"
        @click="emit('delete', stock.id, stock.ticker)"
      >
        <svg class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>

    <!-- Métriques Brutes -->
    <div class="metrics-grid">
      <div class="metric-cell">
        <span class="metric-label">Prix Actuel</span>
        <span class="metric-value text-white">{{ formatMoney(stock.current_price ?? 0) }}</span>
      </div>
      <div class="metric-cell">
        <span class="metric-label">CA TTM</span>
        <span class="metric-value">{{ formatLargeNumber(stock.revenue_ttm) }}</span>
      </div>
      <div class="metric-cell">
        <span class="metric-label">Shares</span>
        <span class="metric-value">{{ formatLargeNumber(stock.shares_outstanding) }}</span>
      </div>
    </div>

    <!-- Fair Value & Marge de Sécurité -->
    <div class="fair-value-section">
      <div class="flex items-end justify-between gap-4">
        <div>
          <span class="text-xs font-medium uppercase tracking-wider text-gray-500">Fair Value (Base Case)</span>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-3xl font-bold tracking-tight text-white">{{ formatMoney(fairValue) }}</span>
            <span
              class="text-sm font-bold"
              :class="{
                'text-emerald-400': marginOfSafety > 15,
                'text-amber-400': marginOfSafety >= 0 && marginOfSafety <= 15,
                'text-red-400': marginOfSafety < 0,
              }"
            >
              {{ formatMOS(marginOfSafety) }} MoS
            </span>
          </div>
        </div>
        <div class="text-right">
          <span class="text-xs font-medium uppercase tracking-wider text-gray-500">Prix Cible 5Y</span>
          <p class="mt-1 font-mono text-lg font-semibold text-gray-300">{{ formatMoney(scenarios.base.targetPrice5Y) }}</p>
        </div>
      </div>

      <!-- Gauge Visuelle -->
      <div class="mt-5 space-y-1.5">
        <div class="gauge-track">
          <!-- Zone Bear → Bull gradient -->
          <div
            class="gauge-fill"
            :style="{
              left: `${gaugeData.bearPos}%`,
              width: `${gaugeData.bullPos - gaugeData.bearPos}%`,
            }"
          />

          <!-- Markers Bear / Base / Bull -->
          <div class="gauge-marker gauge-marker--bear" :style="{ left: `${gaugeData.bearPos}%` }">
            <div class="gauge-marker-dot bg-red-400" />
          </div>
          <div class="gauge-marker gauge-marker--base" :style="{ left: `${gaugeData.basePos}%` }">
            <div class="gauge-marker-dot bg-amber-400" />
          </div>
          <div class="gauge-marker gauge-marker--bull" :style="{ left: `${gaugeData.bullPos}%` }">
            <div class="gauge-marker-dot bg-emerald-400" />
          </div>

          <!-- Prix Actuel -->
          <div class="gauge-price" :style="{ left: `${gaugeData.pricePos}%` }">
            <div class="gauge-price-line" />
            <div class="gauge-price-label">P₀</div>
          </div>
        </div>

        <!-- Labels -->
        <div class="relative h-5 text-[10px] font-medium">
          <span class="absolute -translate-x-1/2 text-red-400/80" :style="{ left: `${gaugeData.bearPos}%` }">
            {{ formatMoney(scenarios.bear.fairValue) }}
          </span>
          <span class="absolute -translate-x-1/2 text-amber-400/80" :style="{ left: `${gaugeData.basePos}%` }">
            {{ formatMoney(scenarios.base.fairValue) }}
          </span>
          <span class="absolute -translate-x-1/2 text-emerald-400/80" :style="{ left: `${gaugeData.bullPos}%` }">
            {{ formatMoney(scenarios.bull.fairValue) }}
          </span>
        </div>

        <div class="flex justify-between text-[10px] font-semibold uppercase tracking-wider text-gray-600">
          <span>Bear (-{{ formatPercent(riskSpread) }})</span>
          <span>Base</span>
          <span>Bull (+{{ formatPercent(riskSpread) }})</span>
        </div>
      </div>
    </div>

    <!-- Scénarios détaillés -->
    <div class="grid grid-cols-3 gap-3">
      <div class="scenario-cell scenario-cell--bear">
        <span class="scenario-label text-red-400/70">Bear Case (-{{ formatPercent(riskSpread) }})</span>
        <span class="scenario-value">{{ formatMoney(scenarios.bear.fairValue) }}</span>
        <span class="scenario-mos" :class="scenarios.bear.marginOfSafety >= 0 ? 'text-emerald-400/60' : 'text-red-400/60'">
          {{ formatMOS(scenarios.bear.marginOfSafety) }}
        </span>
      </div>
      <div class="scenario-cell scenario-cell--base">
        <span class="scenario-label text-amber-400/70">Base Case</span>
        <span class="scenario-value text-white">{{ formatMoney(scenarios.base.fairValue) }}</span>
        <span class="scenario-mos" :class="scenarios.base.marginOfSafety >= 0 ? 'text-emerald-400/60' : 'text-red-400/60'">
          {{ formatMOS(scenarios.base.marginOfSafety) }}
        </span>
      </div>
      <div class="scenario-cell scenario-cell--bull">
        <span class="scenario-label text-emerald-400/70">Bull Case (+{{ formatPercent(riskSpread) }})</span>
        <span class="scenario-value">{{ formatMoney(scenarios.bull.fairValue) }}</span>
        <span class="scenario-mos" :class="scenarios.bull.marginOfSafety >= 0 ? 'text-emerald-400/60' : 'text-red-400/60'">
          {{ formatMOS(scenarios.bull.marginOfSafety) }}
        </span>
      </div>
    </div>

    <!-- Reverse DCF -->
    <div class="reverse-dcf-section">
      <div class="flex items-center gap-2 mb-2">
        <div class="h-5 w-5 rounded-md bg-indigo-500/15 flex items-center justify-center">
          <svg class="h-3 w-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Reverse DCF</span>
      </div>

      <!-- Mode CAGR -->
      <p v-if="growthMode === 'cagr'" class="text-sm text-gray-300 leading-relaxed">
        Le marché anticipe une croissance du CA de
        <span class="font-bold" :class="reverseDCF.impliedGrowth > growth ? 'text-amber-400' : 'text-emerald-400'">
          {{ formatPercent(reverseDCF.impliedGrowth) }}/an
        </span>
        sur 5 ans pour justifier le cours actuel de
        <span class="font-semibold text-white">{{ formatMoney(stock.current_price ?? 0) }}</span>.
        <span v-if="reverseDCF.impliedGrowth > growth" class="text-amber-400/80 text-xs ml-1">
          ⚠ Supérieur à votre hypothèse ({{ formatPercent(growth) }})
        </span>
        <span v-else class="text-emerald-400/80 text-xs ml-1">
          ✓ Inférieur à votre hypothèse ({{ formatPercent(growth) }})
        </span>
      </p>

      <!-- Mode Explicit -->
      <p v-else class="text-sm text-gray-300 leading-relaxed">
        En conservant g₁ à <span class="font-semibold text-emerald-400">{{ formatPercent(growthY1) }}</span> (Guidance NTM), le marché exige une croissance moyenne de
        <span class="font-bold" :class="(reverseDCF.impliedGrowthY2Y5 ?? 0) > growthY2 ? 'text-amber-400' : 'text-emerald-400'">
          {{ formatPercent(reverseDCF.impliedGrowthY2Y5 ?? 0) }}/an
        </span>
        sur les années 2 à 5 pour justifier le cours actuel de
        <span class="font-semibold text-white">{{ formatMoney(stock.current_price ?? 0) }}</span>.
      </p>

      <div class="mt-3 grid grid-cols-3 gap-3 text-center">
        <div>
          <span class="text-[10px] text-gray-500 uppercase">CA Requis 5Y</span>
          <p class="font-mono text-xs font-semibold text-gray-300 mt-0.5">{{ formatLargeNumber(reverseDCF.revenue5YMarket) }}</p>
        </div>
        <div>
          <span class="text-[10px] text-gray-500 uppercase">Earnings Requis</span>
          <p class="font-mono text-xs font-semibold text-gray-300 mt-0.5">{{ formatLargeNumber(reverseDCF.earnings5YMarket) }}</p>
        </div>
        <div>
          <span class="text-[10px] text-gray-500 uppercase">Prix Cible 5Y</span>
          <p class="font-mono text-xs font-semibold text-gray-300 mt-0.5">{{ formatMoney(reverseDCF.targetPrice5YMarket) }}</p>
        </div>
      </div>
    </div>

    <!-- Sliders Réactifs & Selector de Mode -->
    <div class="space-y-4 pt-1">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-800/80 pb-3">
        <h4 class="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-2">
          <svg class="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Hypothèses de Valorisation
        </h4>

        <!-- Toggle Mode CAGR vs Explicit -->
        <div class="inline-flex rounded-lg bg-gray-950 p-1 border border-gray-800">
          <button
            type="button"
            class="px-3 py-1 text-xs font-medium rounded-md transition"
            :class="growthMode === 'cagr' ? 'bg-gray-800 text-white shadow-sm font-semibold' : 'text-gray-400 hover:text-white'"
            @click="growthMode = 'cagr'"
          >
            Mode Lissé (CAGR)
          </button>
          <button
            type="button"
            class="px-3 py-1 text-xs font-medium rounded-md transition"
            :class="growthMode === 'explicit' ? 'bg-emerald-600 text-white shadow-sm font-semibold' : 'text-gray-400 hover:text-white'"
            @click="growthMode = 'explicit'"
          >
            Mode Sur-Mesure (5 Ans)
          </button>
        </div>
      </div>

      <!-- Mode CAGR : Single Slider -->
      <div v-if="growthMode === 'cagr'" class="slider-group">
        <div class="slider-header">
          <div class="flex items-center gap-2 flex-wrap">
            <label class="slider-label">Croissance CA / an (CAGR 5Y)</label>
            <span
              v-if="stock.growth_source"
              class="source-pill bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            >
              {{ stock.growth_source }}
            </span>
          </div>
          <span class="slider-value text-emerald-400">{{ formatPercent(growth) }}</span>
        </div>
        <input
          v-model.number="growth"
          type="range"
          min="-0.3"
          max="1.0"
          step="0.005"
          class="slider slider--emerald"
        >
        <div class="slider-bounds">
          <span>-30%</span>
          <span>100%</span>
        </div>
      </div>

      <!-- Mode Explicit : 5 Mini-Sliders & CA en Dur Bidirectionnel -->
      <div v-else class="space-y-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Trajectoire Sur-Mesure sur 5 Ans (Liaison % / CA)
          </span>
          <span v-if="stock.growth_source" class="source-pill bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            {{ stock.growth_source }}
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <!-- An 1 -->
          <div class="slider-group rounded-lg bg-gray-950/80 p-2.5 border border-gray-800 space-y-2">
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-gray-400 font-semibold">An 1 (NTM)</span>
              <span class="font-mono font-bold text-emerald-400">{{ formatPercent(growthY1) }}</span>
            </div>
            <input
              v-model.number="growthY1"
              type="range"
              min="-0.3"
              max="3.0"
              step="0.01"
              class="slider slider--emerald"
            >
            <div class="pt-1">
              <label class="block text-[10px] text-gray-500 uppercase mb-0.5">CA Projeté (An 1)</label>
              <input
                :value="yearRevenues[0]"
                type="number"
                step="1000000"
                class="w-full rounded border border-gray-800 bg-gray-900 px-2 py-1 font-mono text-[11px] text-white focus:border-emerald-500 focus:outline-none"
                @input="updateGrowthFromRevenue(1, ($event.target as HTMLInputElement).value)"
              >
              <span class="block text-[10px] font-mono text-gray-400 mt-0.5">{{ formatLargeNumber(yearRevenues[0]) }}</span>
            </div>
          </div>

          <!-- An 2 -->
          <div class="slider-group rounded-lg bg-gray-950/80 p-2.5 border border-gray-800 space-y-2">
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-gray-400 font-semibold">An 2</span>
              <span class="font-mono font-bold text-emerald-400">{{ formatPercent(growthY2) }}</span>
            </div>
            <input
              v-model.number="growthY2"
              type="range"
              min="-0.3"
              max="1.5"
              step="0.01"
              class="slider slider--emerald"
            >
            <div class="pt-1">
              <label class="block text-[10px] text-gray-500 uppercase mb-0.5">CA Projeté (An 2)</label>
              <input
                :value="yearRevenues[1]"
                type="number"
                step="1000000"
                class="w-full rounded border border-gray-800 bg-gray-900 px-2 py-1 font-mono text-[11px] text-white focus:border-emerald-500 focus:outline-none"
                @input="updateGrowthFromRevenue(2, ($event.target as HTMLInputElement).value)"
              >
              <span class="block text-[10px] font-mono text-gray-400 mt-0.5">{{ formatLargeNumber(yearRevenues[1]) }}</span>
            </div>
          </div>

          <!-- An 3 -->
          <div class="slider-group rounded-lg bg-gray-950/80 p-2.5 border border-gray-800 space-y-2">
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-gray-400 font-semibold">An 3</span>
              <span class="font-mono font-bold text-emerald-400">{{ formatPercent(growthY3) }}</span>
            </div>
            <input
              v-model.number="growthY3"
              type="range"
              min="-0.3"
              max="1.0"
              step="0.01"
              class="slider slider--emerald"
            >
            <div class="pt-1">
              <label class="block text-[10px] text-gray-500 uppercase mb-0.5">CA Projeté (An 3)</label>
              <input
                :value="yearRevenues[2]"
                type="number"
                step="1000000"
                class="w-full rounded border border-gray-800 bg-gray-900 px-2 py-1 font-mono text-[11px] text-white focus:border-emerald-500 focus:outline-none"
                @input="updateGrowthFromRevenue(3, ($event.target as HTMLInputElement).value)"
              >
              <span class="block text-[10px] font-mono text-gray-400 mt-0.5">{{ formatLargeNumber(yearRevenues[2]) }}</span>
            </div>
          </div>

          <!-- An 4 -->
          <div class="slider-group rounded-lg bg-gray-950/80 p-2.5 border border-gray-800 space-y-2">
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-gray-400 font-semibold">An 4</span>
              <span class="font-mono font-bold text-emerald-400">{{ formatPercent(growthY4) }}</span>
            </div>
            <input
              v-model.number="growthY4"
              type="range"
              min="-0.3"
              max="0.8"
              step="0.01"
              class="slider slider--emerald"
            >
            <div class="pt-1">
              <label class="block text-[10px] text-gray-500 uppercase mb-0.5">CA Projeté (An 4)</label>
              <input
                :value="yearRevenues[3]"
                type="number"
                step="1000000"
                class="w-full rounded border border-gray-800 bg-gray-900 px-2 py-1 font-mono text-[11px] text-white focus:border-emerald-500 focus:outline-none"
                @input="updateGrowthFromRevenue(4, ($event.target as HTMLInputElement).value)"
              >
              <span class="block text-[10px] font-mono text-gray-400 mt-0.5">{{ formatLargeNumber(yearRevenues[3]) }}</span>
            </div>
          </div>

          <!-- An 5 -->
          <div class="slider-group rounded-lg bg-gray-950/80 p-2.5 border border-gray-800 space-y-2">
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-gray-400 font-semibold">An 5</span>
              <span class="font-mono font-bold text-emerald-400">{{ formatPercent(growthY5) }}</span>
            </div>
            <input
              v-model.number="growthY5"
              type="range"
              min="-0.3"
              max="0.6"
              step="0.01"
              class="slider slider--emerald"
            >
            <div class="pt-1">
              <label class="block text-[10px] text-gray-500 uppercase mb-0.5">CA Projeté (An 5)</label>
              <input
                :value="yearRevenues[4]"
                type="number"
                step="1000000"
                class="w-full rounded border border-gray-800 bg-gray-900 px-2 py-1 font-mono text-[11px] text-white focus:border-emerald-500 focus:outline-none"
                @input="updateGrowthFromRevenue(5, ($event.target as HTMLInputElement).value)"
              >
              <span class="block text-[10px] font-mono text-gray-400 mt-0.5">{{ formatLargeNumber(yearRevenues[4]) }}</span>
            </div>
          </div>
        </div>

        <!-- Block CA Final Cible Année 5 -->
        <div class="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-center space-y-1 shadow-md">
          <span class="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            🎯 Chiffre d'Affaires Final Cible (Année 5)
          </span>
          <p class="font-mono text-2xl font-extrabold text-white">
            {{ formatLargeNumber(scenarios.base.revenue5Y) }}
          </p>
          <p class="text-xs text-gray-400">
            soit un CAGR équivalent lissé de <span class="font-bold text-emerald-400">{{ formatPercent(scenarios.base.equivalentCAGR) }}/an</span> sur 5 ans
          </p>
        </div>
      </div>

      <!-- Marge & Toggle Nature de Marge -->
      <div class="slider-group">
        <div class="slider-header">
          <div class="flex items-center gap-2 flex-wrap">
            <label class="slider-label">
              {{ marginType === 'net_income' ? 'Marge Nette (Net Income)' : 'Marge FCF (Free Cash Flow)' }}
            </label>

            <!-- Toggle Nature Marge -->
            <div class="inline-flex rounded-md bg-gray-950 p-0.5 border border-gray-800">
              <button
                type="button"
                class="px-2 py-0.5 text-[10px] font-medium rounded transition"
                :class="marginType === 'net_income' ? 'bg-sky-600 text-white font-semibold' : 'text-gray-400 hover:text-white'"
                @click="marginType = 'net_income'"
              >
                Marge Nette (P/E)
              </button>
              <button
                type="button"
                class="px-2 py-0.5 text-[10px] font-medium rounded transition"
                :class="marginType === 'fcf' ? 'bg-sky-600 text-white font-semibold' : 'text-gray-400 hover:text-white'"
                @click="marginType = 'fcf'"
              >
                Marge FCF (P/FCF)
              </button>
            </div>

            <span
              v-if="stock.margin_source"
              class="source-pill bg-sky-500/10 text-sky-400 border-sky-500/20"
            >
              {{ stock.margin_source }}
            </span>
          </div>
          <span class="slider-value text-sky-400">{{ formatPercent(margin) }}</span>
        </div>
        <input
          v-model.number="margin"
          type="range"
          min="0"
          max="0.6"
          step="0.005"
          class="slider slider--sky"
        >
        <div class="slider-bounds">
          <span>0%</span>
          <span>60%</span>
        </div>
      </div>

      <!-- Multiple Cible (P/E ou P/FCF selon marginType) -->
      <div class="slider-group">
        <div class="slider-header">
          <div class="flex items-center gap-2 flex-wrap">
            <label class="slider-label">
              Multiple de Sortie ({{ marginType === 'net_income' ? 'P/E' : 'P/FCF' }})
            </label>
            <span
              v-if="stock.pe_source"
              class="source-pill bg-violet-500/10 text-violet-400 border-violet-500/20"
            >
              {{ stock.pe_source }}
            </span>
          </div>
          <span class="slider-value text-violet-400">{{ targetMultiple.toFixed(1) }}x</span>
        </div>
        <input
          v-model.number="targetMultiple"
          type="range"
          min="5"
          max="120"
          step="0.5"
          class="slider slider--violet"
        >
        <div class="slider-bounds">
          <span>5x</span>
          <span>120x</span>
        </div>
      </div>

      <!-- Taux d'actualisation -->
      <div class="slider-group">
        <div class="slider-header">
          <label class="slider-label">Taux d'Actualisation</label>
          <span class="slider-value text-amber-400">{{ formatPercent(discountRate) }}</span>
        </div>
        <input
          v-model.number="discountRate"
          type="range"
          min="0.05"
          max="0.25"
          step="0.005"
          class="slider slider--amber"
        >
        <div class="slider-bounds">
          <span>5%</span>
          <span>25%</span>
        </div>
      </div>

      <!-- Contrôle de Risque / Volatilité (risk_spread) -->
      <div class="slider-group rounded-xl border border-indigo-500/20 bg-indigo-950/10 p-4 space-y-2">
        <div class="slider-header">
          <div class="flex items-center gap-2 flex-wrap">
            <label class="slider-label text-indigo-300 font-semibold">Incertitude & Risque Bear / Bull (±%)</label>
            <span class="source-pill bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
              Basé sur Bêta ({{ stock.beta ?? 1.0 }})
            </span>
          </div>
          <span class="slider-value text-indigo-400">±{{ formatPercent(riskSpread) }}</span>
        </div>
        <input
          v-model.number="riskSpread"
          type="range"
          min="0.10"
          max="0.50"
          step="0.01"
          class="slider slider--violet"
        >
        <div class="slider-bounds">
          <span>±10% (Stable)</span>
          <span>±50% (Haute Volatilité)</span>
        </div>
      </div>
    </div>
  </div>
</template>
