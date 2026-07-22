<script setup lang="ts">
import type { Stock } from '~/types/database.types'
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

const growth = ref(props.stock.projected_growth)
const margin = ref(props.stock.projected_margin)
const targetPE = ref(props.stock.target_pe)
const discountRate = ref(props.stock.discount_rate)

watch(() => props.stock, (newStock) => {
  growth.value = newStock.projected_growth
  margin.value = newStock.projected_margin
  targetPE.value = newStock.target_pe
  discountRate.value = newStock.discount_rate
})

const valuationInputs = computed<ValuationInputs>(() => ({
  currentPrice: props.stock.current_price ?? 0,
  revenueTTM: props.stock.revenue_ttm ?? 0,
  sharesOutstanding: props.stock.shares_outstanding ?? 0,
  growth: growth.value,
  margin: margin.value,
  targetPE: targetPE.value,
  discountRate: discountRate.value,
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

let saveTimeout: ReturnType<typeof setTimeout> | null = null

function debouncedSave() {
  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    const updated: Stock = {
      ...props.stock,
      projected_growth: growth.value,
      projected_margin: margin.value,
      target_pe: targetPE.value,
      discount_rate: discountRate.value,
    }
    emit('update', updated)
  }, 800)
}

watch([growth, margin, targetPE, discountRate], () => {
  debouncedSave()
})

function formatLargeNumber(num: number | null): string {
  if (num === null || num === undefined) return 'N/A'
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)} T`
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)} B`
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)} M`
  return num.toLocaleString()
}

function formatCurrency(num: number): string {
  return num.toFixed(2)
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
        <span class="metric-value text-white">${{ formatCurrency(stock.current_price ?? 0) }}</span>
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
            <span class="text-3xl font-bold tracking-tight text-white">${{ formatCurrency(fairValue) }}</span>
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
          <p class="mt-1 font-mono text-lg font-semibold text-gray-300">${{ formatCurrency(scenarios.base.targetPrice5Y) }}</p>
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
            ${{ formatCurrency(scenarios.bear.fairValue) }}
          </span>
          <span class="absolute -translate-x-1/2 text-amber-400/80" :style="{ left: `${gaugeData.basePos}%` }">
            ${{ formatCurrency(scenarios.base.fairValue) }}
          </span>
          <span class="absolute -translate-x-1/2 text-emerald-400/80" :style="{ left: `${gaugeData.bullPos}%` }">
            ${{ formatCurrency(scenarios.bull.fairValue) }}
          </span>
        </div>

        <div class="flex justify-between text-[10px] font-semibold uppercase tracking-wider text-gray-600">
          <span>Bear</span>
          <span>Base</span>
          <span>Bull</span>
        </div>
      </div>
    </div>

    <!-- Scénarios détaillés -->
    <div class="grid grid-cols-3 gap-3">
      <div class="scenario-cell scenario-cell--bear">
        <span class="scenario-label text-red-400/70">Bear Case</span>
        <span class="scenario-value">${{ formatCurrency(scenarios.bear.fairValue) }}</span>
        <span class="scenario-mos" :class="scenarios.bear.marginOfSafety >= 0 ? 'text-emerald-400/60' : 'text-red-400/60'">
          {{ formatMOS(scenarios.bear.marginOfSafety) }}
        </span>
      </div>
      <div class="scenario-cell scenario-cell--base">
        <span class="scenario-label text-amber-400/70">Base Case</span>
        <span class="scenario-value text-white">${{ formatCurrency(scenarios.base.fairValue) }}</span>
        <span class="scenario-mos" :class="scenarios.base.marginOfSafety >= 0 ? 'text-emerald-400/60' : 'text-red-400/60'">
          {{ formatMOS(scenarios.base.marginOfSafety) }}
        </span>
      </div>
      <div class="scenario-cell scenario-cell--bull">
        <span class="scenario-label text-emerald-400/70">Bull Case</span>
        <span class="scenario-value">${{ formatCurrency(scenarios.bull.fairValue) }}</span>
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
      <p class="text-sm text-gray-300 leading-relaxed">
        Le marché anticipe une croissance du CA de
        <span class="font-bold" :class="reverseDCF.impliedGrowth > growth ? 'text-amber-400' : 'text-emerald-400'">
          {{ formatPercent(reverseDCF.impliedGrowth) }}/an
        </span>
        sur 5 ans pour justifier le cours actuel de
        <span class="font-semibold text-white">${{ formatCurrency(stock.current_price ?? 0) }}</span>.
        <span v-if="reverseDCF.impliedGrowth > growth" class="text-amber-400/80 text-xs ml-1">
          ⚠ Supérieur à votre hypothèse ({{ formatPercent(growth) }})
        </span>
        <span v-else class="text-emerald-400/80 text-xs ml-1">
          ✓ Inférieur à votre hypothèse ({{ formatPercent(growth) }})
        </span>
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
          <p class="font-mono text-xs font-semibold text-gray-300 mt-0.5">${{ formatCurrency(reverseDCF.targetPrice5YMarket) }}</p>
        </div>
      </div>
    </div>

    <!-- Sliders Réactifs -->
    <div class="space-y-4 pt-1">
      <h4 class="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-2">
        <svg class="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        Hypothèses de Valorisation
      </h4>

      <!-- Croissance CA -->
      <div class="slider-group">
        <div class="slider-header">
          <label class="slider-label">Croissance CA / an</label>
          <span class="slider-value text-emerald-400">{{ formatPercent(growth) }}</span>
        </div>
        <input
          v-model.number="growth"
          type="range"
          min="-0.2"
          max="0.5"
          step="0.005"
          class="slider slider--emerald"
        >
        <div class="slider-bounds">
          <span>-20%</span>
          <span>50%</span>
        </div>
      </div>

      <!-- Marge -->
      <div class="slider-group">
        <div class="slider-header">
          <label class="slider-label">Marge Nette / FCF</label>
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

      <!-- PER Cible -->
      <div class="slider-group">
        <div class="slider-header">
          <label class="slider-label">Multiple de Sortie (P/E)</label>
          <span class="slider-value text-violet-400">{{ targetPE.toFixed(1) }}x</span>
        </div>
        <input
          v-model.number="targetPE"
          type="range"
          min="5"
          max="80"
          step="0.5"
          class="slider slider--violet"
        >
        <div class="slider-bounds">
          <span>5x</span>
          <span>80x</span>
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
          max="0.20"
          step="0.005"
          class="slider slider--amber"
        >
        <div class="slider-bounds">
          <span>5%</span>
          <span>20%</span>
        </div>
      </div>
    </div>
  </div>
</template>
