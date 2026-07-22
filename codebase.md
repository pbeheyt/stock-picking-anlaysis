# .gitignore

```
# Nuxt dev/build outputs
.output
.data
.nuxt
.nitro
.cache
dist

# Node dependencies
node_modules

# Logs
logs
*.log

# Misc
.DS_Store
.fleet
.idea

# Local env files
.env
.env.*
!.env.example

# Ignore codebase markdown files
codebase_*.md

```

# .node-version

```
22.19.0

```

# app/app.vue

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

```

# app/assets/css/main.css

```css
@import "tailwindcss";

/* ═══════════════════════════════════════════
   Valuation Card
   ═══════════════════════════════════════════ */

.valuation-card {
  @apply rounded-2xl border border-gray-800 bg-gray-900/40 p-6 space-y-6 shadow-lg backdrop-blur-sm;
  @apply transition-all duration-300 hover:border-gray-700/80 hover:shadow-xl;
}

.ticker-badge {
  @apply rounded-md bg-emerald-500/10 px-2.5 py-1 font-mono text-sm font-bold text-emerald-400 border border-emerald-500/20;
}

.source-pill {
  @apply inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium border tracking-tight transition-opacity hover:opacity-90;
}

/* ═══════════════════════════════════════════
   Metrics Grid
   ═══════════════════════════════════════════ */

.metrics-grid {
  @apply grid grid-cols-3 gap-4 rounded-xl bg-gray-950/80 p-4 text-center border border-gray-800/80;
}

.metric-cell {
  @apply flex flex-col gap-1;
}

.metric-label {
  @apply text-[11px] font-medium uppercase tracking-wider text-gray-500;
}

.metric-value {
  @apply font-mono text-sm font-bold text-gray-200;
}

/* ═══════════════════════════════════════════
   Fair Value Section
   ═══════════════════════════════════════════ */

.fair-value-section {
  @apply rounded-xl border border-gray-800/60 bg-gradient-to-br from-gray-900/80 to-gray-950/80 p-5;
}

/* ═══════════════════════════════════════════
   Gauge
   ═══════════════════════════════════════════ */

.gauge-track {
  @apply relative h-2.5 w-full rounded-full bg-gray-800/80 overflow-visible;
}

.gauge-fill {
  @apply absolute top-0 h-full rounded-full;
  background: linear-gradient(90deg, #f87171 0%, #fbbf24 50%, #34d399 100%);
  opacity: 0.35;
}

.gauge-marker {
  @apply absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10;
}

.gauge-marker-dot {
  @apply h-3.5 w-3.5 rounded-full border-2 border-gray-900 shadow-md;
}

.gauge-price {
  @apply absolute top-1/2 -translate-x-1/2 z-20;
  transform: translateX(-50%) translateY(-50%);
}

.gauge-price-line {
  @apply w-0.5 h-6 bg-white/90 rounded-full mx-auto shadow-sm;
  margin-top: -6px;
}

.gauge-price-label {
  @apply text-[9px] font-bold text-white/80 text-center mt-0.5 select-none;
}

/* ═══════════════════════════════════════════
   Scenario Cells
   ═══════════════════════════════════════════ */

.scenario-cell {
  @apply flex flex-col items-center gap-0.5 rounded-xl border border-gray-800/60 bg-gray-950/60 p-3;
}

.scenario-label {
  @apply text-[10px] font-semibold uppercase tracking-wider;
}

.scenario-value {
  @apply font-mono text-sm font-bold text-gray-200;
}

.scenario-mos {
  @apply text-[10px] font-semibold;
}

/* ═══════════════════════════════════════════
   Reverse DCF Section
   ═══════════════════════════════════════════ */

.reverse-dcf-section {
  @apply rounded-xl border border-indigo-500/15 bg-indigo-950/10 p-4;
}

/* ═══════════════════════════════════════════
   Sliders
   ═══════════════════════════════════════════ */

.slider-group {
  @apply space-y-1.5;
}

.slider-header {
  @apply flex items-center justify-between;
}

.slider-label {
  @apply text-xs font-medium text-gray-400;
}

.slider-value {
  @apply font-mono text-sm font-bold tabular-nums;
}

.slider-bounds {
  @apply flex justify-between text-[10px] text-gray-600;
}

/* Base slider reset & styling */
.slider {
  @apply w-full cursor-pointer appearance-none bg-transparent;
  height: 6px;
}

.slider::-webkit-slider-runnable-track {
  @apply h-1.5 rounded-full bg-gray-800;
}

.slider::-webkit-slider-thumb {
  @apply appearance-none h-4 w-4 rounded-full border-2 border-gray-900 shadow-md cursor-grab;
  margin-top: -5px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.slider::-webkit-slider-thumb:active {
  cursor: grabbing;
  transform: scale(1.1);
}

.slider::-moz-range-track {
  @apply h-1.5 rounded-full bg-gray-800 border-none;
}

.slider::-moz-range-thumb {
  @apply h-4 w-4 rounded-full border-2 border-gray-900 shadow-md cursor-grab;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.slider::-moz-range-thumb:hover {
  transform: scale(1.2);
}

/* Slider color variants */
.slider--emerald::-webkit-slider-thumb {
  @apply bg-emerald-400;
  box-shadow: 0 0 8px rgba(52, 211, 153, 0.4);
}
.slider--emerald::-moz-range-thumb {
  @apply bg-emerald-400;
  box-shadow: 0 0 8px rgba(52, 211, 153, 0.4);
}

.slider--sky::-webkit-slider-thumb {
  @apply bg-sky-400;
  box-shadow: 0 0 8px rgba(56, 189, 248, 0.4);
}
.slider--sky::-moz-range-thumb {
  @apply bg-sky-400;
  box-shadow: 0 0 8px rgba(56, 189, 248, 0.4);
}

.slider--violet::-webkit-slider-thumb {
  @apply bg-violet-400;
  box-shadow: 0 0 8px rgba(167, 139, 250, 0.4);
}
.slider--violet::-moz-range-thumb {
  @apply bg-violet-400;
  box-shadow: 0 0 8px rgba(167, 139, 250, 0.4);
}

.slider--amber::-webkit-slider-thumb {
  @apply bg-amber-400;
  box-shadow: 0 0 8px rgba(251, 191, 36, 0.4);
}
.slider--amber::-moz-range-thumb {
  @apply bg-amber-400;
  box-shadow: 0 0 8px rgba(251, 191, 36, 0.4);
}

/* Focus ring for accessibility */
.slider:focus-visible::-webkit-slider-thumb {
  @apply outline-2 outline-offset-2 outline-white;
}

.slider:focus-visible::-moz-range-thumb {
  @apply outline-2 outline-offset-2 outline-white;
}

```

# app/components/ValuationCard.vue

```vue
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
          <div class="flex items-center gap-2 flex-wrap">
            <label class="slider-label">Croissance CA / an</label>
            <span
              v-if="stock.growth_source"
              class="source-pill bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              title="Source de la valeur initiale"
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

      <!-- Marge -->
      <div class="slider-group">
        <div class="slider-header">
          <div class="flex items-center gap-2 flex-wrap">
            <label class="slider-label">Marge Nette / FCF</label>
            <span
              v-if="stock.margin_source"
              class="source-pill bg-sky-500/10 text-sky-400 border-sky-500/20"
              title="Source de la valeur initiale"
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

      <!-- PER Cible -->
      <div class="slider-group">
        <div class="slider-header">
          <div class="flex items-center gap-2 flex-wrap">
            <label class="slider-label">Multiple de Sortie (P/E)</label>
            <span
              v-if="stock.pe_source"
              class="source-pill bg-violet-500/10 text-violet-400 border-violet-500/20"
              title="Source de la valeur initiale"
            >
              {{ stock.pe_source }}
            </span>
          </div>
          <span class="slider-value text-violet-400">{{ targetPE.toFixed(1) }}x</span>
        </div>
        <input
          v-model.number="targetPE"
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
    </div>
  </div>
</template>

```

# app/layouts/default.vue

```vue
<template>
  <div class="min-h-screen bg-gray-950 text-gray-100 antialiased">
    <header class="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm">
      <div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <h1 class="text-lg font-semibold tracking-tight text-white">
          StockPick
        </h1>
        <slot name="header-actions" />
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-6 py-10">
      <slot />
    </main>
  </div>
</template>

```

# app/pages/confirm.vue

```vue
<script setup lang="ts">
definePageMeta({
  layout: false,
})

const user = useSupabaseUser()

watch(user, (newUser) => {
  if (newUser) {
    navigateTo('/')
  }
}, { immediate: true })
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-950 text-gray-400">
    <div class="h-6 w-6 animate-spin rounded-full border-2 border-gray-700 border-t-white" />
  </div>
</template>

```

# app/pages/index.vue

```vue
<script setup lang="ts">
import type { Database, Stock } from '~/types/database.types'

const user = useSupabaseUser()
const supabase = useSupabaseClient<Database>()

const searchTicker = ref('')
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)

const stocks = ref<Stock[]>([])
const isFetchingStocks = ref(true)

const sourcesMap = ref<Record<string, { growth_source?: string; margin_source?: string; pe_source?: string }>>({})

const fetchUserStocks = async () => {
  if (!user.value) return
  isFetchingStocks.value = true
  try {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    const rawStocks = (data as Stock[]) || []
    stocks.value = rawStocks

    // Optionnel : enrichir les métadonnées de source pour les tickers existants en arrière-plan
    rawStocks.forEach(async (s) => {
      if (!sourcesMap.value[s.ticker]) {
        try {
          const apiData = await $fetch<{
            growth_source?: string
            margin_source?: string
            pe_source?: string
          }>(`/api/stock/${encodeURIComponent(s.ticker)}`)
          sourcesMap.value[s.ticker] = {
            growth_source: apiData.growth_source,
            margin_source: apiData.margin_source,
            pe_source: apiData.pe_source,
          }
        } catch {
          // Ignorer les erreurs d'arrière-plan
        }
      }
    })
  } catch (err: any) {
    console.error('Erreur chargement stocks:', err)
  } finally {
    isFetchingStocks.value = false
  }
}

onMounted(() => {
  fetchUserStocks()
})

const analyzeAndAddStock = async () => {
  const ticker = searchTicker.value.trim().toUpperCase()
  if (!ticker || !user.value) return

  isLoading.value = true
  errorMessage.value = null
  successMessage.value = null

  try {
    const stockData = await $fetch<{
      ticker: string
      name: string
      current_price: number | null
      revenue_ttm: number | null
      shares_outstanding: number | null
      fetched_at: string
      default_growth: number
      growth_source: string
      default_margin: number
      margin_source: string
      default_pe: number
      pe_source: string
      default_discount_rate: number
    }>(`/api/stock/${encodeURIComponent(ticker)}`)

    sourcesMap.value[stockData.ticker] = {
      growth_source: stockData.growth_source,
      margin_source: stockData.margin_source,
      pe_source: stockData.pe_source,
    }

    const existing = stocks.value.find(s => s.ticker === stockData.ticker)

    const { data, error } = await supabase
      .from('stocks')
      .upsert(
        {
          user_id: user.value.id,
          ticker: stockData.ticker,
          name: stockData.name,
          current_price: stockData.current_price,
          revenue_ttm: stockData.revenue_ttm,
          shares_outstanding: stockData.shares_outstanding,
          fetched_at: stockData.fetched_at,
          projected_growth: existing?.projected_growth ?? stockData.default_growth,
          projected_margin: existing?.projected_margin ?? stockData.default_margin,
          target_pe: existing?.target_pe ?? stockData.default_pe,
          discount_rate: existing?.discount_rate ?? stockData.default_discount_rate,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,ticker' }
      )
      .select()

    if (error) throw error

    successMessage.value = `${stockData.ticker} (${stockData.name}) — hypothèses auto-remplies.`
    searchTicker.value = ''
    await fetchUserStocks()
  } catch (err: any) {
    errorMessage.value = err.data?.statusMessage || err.message || 'Impossible d\'ajouter ce ticker.'
  } finally {
    isLoading.value = false
  }
}

const getEnrichedStock = (stock: Stock): Stock => {
  const sources = sourcesMap.value[stock.ticker]
  if (!sources) return stock
  return {
    ...stock,
    growth_source: sources.growth_source,
    margin_source: sources.margin_source,
    pe_source: sources.pe_source,
  }
}

const updateStockHypotheses = async (stock: Stock) => {
  try {
    const { error } = await supabase
      .from('stocks')
      .update({
        projected_growth: Number(stock.projected_growth),
        projected_margin: Number(stock.projected_margin),
        target_pe: Number(stock.target_pe),
        discount_rate: Number(stock.discount_rate),
        updated_at: new Date().toISOString(),
      })
      .eq('id', stock.id)

    if (error) throw error

    const idx = stocks.value.findIndex(s => s.id === stock.id)
    if (idx !== -1) {
      stocks.value[idx] = { ...stocks.value[idx], ...stock }
    }
  } catch (err: any) {
    console.error('Erreur mise à jour hypothèses:', err)
  }
}

const deleteStock = async (id: string, ticker: string) => {
  if (!confirm(`Supprimer ${ticker} de votre liste ?`)) return
  try {
    const { error } = await supabase.from('stocks').delete().eq('id', id)
    if (error) throw error
    stocks.value = stocks.value.filter(s => s.id !== id)
  } catch (err: any) {
    console.error('Erreur suppression:', err)
  }
}

const signOut = async () => {
  await supabase.auth.signOut()
  await navigateTo('/login')
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-800 pb-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-white">
          Moteur de Valorisation
        </h1>
        <p class="text-sm text-gray-400">
          Connecté : <span class="font-medium text-emerald-400">{{ user?.email }}</span>
        </p>
      </div>
      <button
        type="button"
        class="self-start sm:self-auto rounded-lg border border-gray-800 bg-gray-900 px-4 py-2 text-xs font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
        @click="signOut"
      >
        Déconnexion
      </button>
    </div>

    <!-- Barre de recherche -->
    <div class="rounded-xl border border-gray-800 bg-gray-900/60 p-6 space-y-4 shadow-xl backdrop-blur">
      <h2 class="text-base font-semibold text-white">
        🔍 Rechercher & Analyser un Ticker
      </h2>
      <form class="flex flex-col sm:flex-row gap-3" @submit.prevent="analyzeAndAddStock">
        <input
          v-model="searchTicker"
          type="text"
          placeholder="Ex: AAPL, ASML, NVDA, NBIS, TTE.PA..."
          class="flex-1 rounded-lg border border-gray-700 bg-gray-950 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          :disabled="isLoading"
        >
        <button
          type="submit"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-500 focus:outline-none disabled:opacity-50"
          :disabled="isLoading || !searchTicker.trim()"
        >
          <svg v-if="isLoading" class="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>{{ isLoading ? 'Analyse...' : 'Analyser / Ajouter' }}</span>
        </button>
      </form>

      <div v-if="errorMessage" class="rounded-lg border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-300">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="rounded-lg border border-emerald-500/30 bg-emerald-950/40 p-3 text-xs text-emerald-300">
        {{ successMessage }}
      </div>
    </div>

    <!-- Liste des stocks -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-white">
          Actions Enregistrées ({{ stocks.length }})
        </h2>
      </div>

      <div v-if="isFetchingStocks" class="py-12 text-center text-sm text-gray-500">
        Chargement des données...
      </div>

      <div v-else-if="stocks.length === 0" class="rounded-xl border border-dashed border-gray-800 p-12 text-center text-sm text-gray-500">
        Aucune action enregistrée. Utilisez la barre de recherche ci-dessus pour commencer.
      </div>

      <div v-else class="grid gap-6">
        <ValuationCard
          v-for="stock in stocks"
          :key="stock.id"
          :stock="getEnrichedStock(stock)"
          @update="updateStockHypotheses"
          @delete="deleteStock"
        />
      </div>
    </div>
  </div>
</template>

```

# app/pages/login.vue

```vue
<script setup lang="ts">
definePageMeta({
  layout: false,
})

const supabase = useSupabaseClient()

const signInWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/confirm`,
    },
  })
}
</script>

<template>
  <NuxtLayout>
    <div class="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <div class="w-full max-w-sm space-y-8 text-center">
        <div class="space-y-2">
          <h2 class="text-3xl font-bold tracking-tight text-white">
            Connexion
          </h2>
          <p class="text-sm text-gray-400">
            Accédez à votre tableau de bord d'investissements
          </p>
        </div>

        <button
          type="button"
          class="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          @click="signInWithGoogle"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Se connecter avec Google
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>

```

# app/types/database.types.ts

```ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type StockStatus = 'research' | 'watchlist' | 'portfolio'

export interface Stock {
  id: string
  user_id: string
  ticker: string
  name: string | null
  current_price: number | null
  revenue_ttm: number | null
  shares_outstanding: number | null
  fetched_at: string
  status: StockStatus
  projected_growth: number
  projected_margin: number
  target_pe: number
  discount_rate: number
  growth_source?: string
  margin_source?: string
  pe_source?: string
  thesis: string | null
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      stocks: {
        Row: Stock
        Insert: Omit<Stock, 'id' | 'created_at' | 'updated_at' | 'fetched_at'> & {
          id?: string
          fetched_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Omit<Stock, 'id'>>
      }
    }
    Enums: {
      stock_status: StockStatus
    }
  }
}

```

# app/utils/valuation.ts

```ts
export interface ValuationInputs {
  currentPrice: number
  revenueTTM: number
  sharesOutstanding: number
  growth: number
  margin: number
  targetPE: number
  discountRate: number
}

export interface ValuationResult {
  revenue5Y: number
  earnings5Y: number
  eps5Y: number
  targetPrice5Y: number
  fairValue: number
  marginOfSafety: number
}

export interface ScenarioResults {
  bear: ValuationResult
  base: ValuationResult
  bull: ValuationResult
}

export interface ReverseDCFResult {
  targetPrice5YMarket: number
  earnings5YMarket: number
  revenue5YMarket: number
  impliedGrowth: number
}

export function computeValuation(inputs: ValuationInputs): ValuationResult {
  const { revenueTTM, sharesOutstanding, growth, margin, targetPE, discountRate, currentPrice } = inputs

  const revenue5Y = revenueTTM * Math.pow(1 + growth, 5)
  const earnings5Y = revenue5Y * margin
  const eps5Y = earnings5Y / sharesOutstanding
  const targetPrice5Y = eps5Y * targetPE
  const fairValue = targetPrice5Y / Math.pow(1 + discountRate, 5)
  const marginOfSafety = fairValue !== 0
    ? ((fairValue - currentPrice) / fairValue) * 100
    : 0

  return { revenue5Y, earnings5Y, eps5Y, targetPrice5Y, fairValue, marginOfSafety }
}

export function computeScenarios(inputs: ValuationInputs): ScenarioResults {
  const base = computeValuation(inputs)

  const bear = computeValuation({
    ...inputs,
    growth: inputs.growth * 0.8,
    targetPE: inputs.targetPE * 0.8,
  })

  const bull = computeValuation({
    ...inputs,
    growth: inputs.growth * 1.15,
    targetPE: inputs.targetPE * 1.15,
  })

  return { bear, base, bull }
}

export function computeReverseDCF(inputs: ValuationInputs): ReverseDCFResult {
  const { currentPrice, discountRate, sharesOutstanding, targetPE, margin, revenueTTM } = inputs

  const targetPrice5YMarket = currentPrice * Math.pow(1 + discountRate, 5)
  const marketCap5Y = targetPrice5YMarket * sharesOutstanding
  const earnings5YMarket = marketCap5Y / targetPE
  const revenue5YMarket = margin !== 0 ? earnings5YMarket / margin : 0
  const impliedGrowth = revenueTTM > 0 && revenue5YMarket > 0
    ? Math.pow(revenue5YMarket / revenueTTM, 1 / 5) - 1
    : 0

  return { targetPrice5YMarket, earnings5YMarket, revenue5YMarket, impliedGrowth }
}

```

# codebase_tree.md

```md
.
├── app
│   ├── app.vue
│   ├── assets
│   │   └── css
│   │       └── main.css
│   ├── components
│   │   └── ValuationCard.vue
│   ├── layouts
│   │   └── default.vue
│   ├── pages
│   │   ├── confirm.vue
│   │   ├── index.vue
│   │   └── login.vue
│   ├── types
│   │   └── database.types.ts
│   └── utils
│       └── valuation.ts
├── codebase.md
├── codebase_tree.md
├── nuxt.config.ts
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   └── robots.txt
├── README.md
├── scripts
│   └── test-yahoo.ts
├── server
│   └── api
│       └── stock
│           └── [ticker].get.ts
├── supabase
│   └── migrations
│       └── 20260722_create_stocks.sql
└── tsconfig.json

16 directories, 21 files

```

# nuxt.config.ts

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  modules: ['@nuxtjs/supabase'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    preset: 'cloudflare_pages',
  },

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/login', '/confirm'],
    },
  },

  typescript: {
    strict: true,
  },
})

```

# package.json

```json
{
  "name": "stock-picking-anlysis",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare",
    "test:yahoo": "tsx scripts/test-yahoo.ts"
  },
  "dependencies": {
    "nuxt": "^4.5.0",
    "vue": "^3.5.40",
    "vue-router": "^5.2.0"
  },
  "devDependencies": {
    "@nuxtjs/supabase": "^2.0.9",
    "@tailwindcss/vite": "^4.3.3",
    "tailwindcss": "^4.3.3",
    "tsx": "^4.23.1",
    "yahoo-finance2": "^4.0.0"
  }
}

```

# public/favicon.ico

This is a binary file of the type: Binary

# public/robots.txt

```txt
User-Agent: *
Disallow:

```

# README.md

```md
# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

\`\`\`bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
\`\`\`

## Development Server

Start the development server on `http://localhost:3000`:

\`\`\`bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
\`\`\`

## Production

Build the application for production:

\`\`\`bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
\`\`\`

Locally preview production build:

\`\`\`bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
\`\`\`

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

```

# scripts/test-yahoo.ts

```ts
import YahooFinance from 'yahoo-finance2'

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

async function testFetch(ticker: string) {
  console.log(`\n🔍 Fetching data for: ${ticker}...\n`)

  try {
    // 1. Données de marché rapides
    const quote = await yahooFinance.quote(ticker)

    // 2. Données fondamentales poussées
    const summary = await yahooFinance.quoteSummary(ticker, {
      modules: ['financialData', 'defaultKeyStatistics', 'summaryDetail'],
    })

    console.log('--- 📊 METRIQUES DE MARCHE (Quote) ---')
    console.log({
      nom: quote.shortName || quote.longName,
      prix: quote.regularMarketPrice,
      devise: quote.currency,
      marketCap: quote.marketCap,
      perTrailing: quote.trailingPE,
      perForward: quote.forwardPE,
    })

    console.log('\n--- 🏛️ SANTÉ ET MARGES (FinancialData & Stats) ---')
    console.log({
      margeBrute: summary.financialData?.grossMargins,
      margeOp: summary.financialData?.operatingMargins,
      roe: summary.financialData?.returnOnEquity,
      fcf: summary.financialData?.freeCashflow,
      croissanceCA: summary.financialData?.revenueGrowth,
      detteTotale: summary.financialData?.totalDebt,
      priceToBook: summary.defaultKeyStatistics?.priceToBook,
      evToEbitda: summary.defaultKeyStatistics?.enterpriseToEbitda,
    })
  } catch (err) {
    console.error('❌ Erreur de fetch :', err)
  }
}

const tickers = process.argv.slice(2).length > 0 ? process.argv.slice(2) : ['ASML', 'NVDA', 'TTE.PA']

for (const ticker of tickers) {
  await testFetch(ticker)
}

```

# server/api/stock/[ticker].get.ts

```ts
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

    // 1. Croissance CA (defaultGrowth) & source
    let defaultGrowth = 0.10
    let growthSource = 'Modèle Standard (10%)'

    const trend1y = earningsTrend.find((t: any) => t.period === '+1y')
    const trend5y = earningsTrend.find((t: any) => t.period === '+5y')
    const analystGrowth = trend1y?.revenueEstimate?.growth ?? trend1y?.growth ?? trend5y?.growth

    if (typeof analystGrowth === 'number' && isFinite(analystGrowth) && analystGrowth !== 0) {
      defaultGrowth = clamp(analystGrowth, -0.5, 0.8)
      growthSource = 'Consensus Analystes (+1y)'
    } else if (typeof financialData.revenueGrowth === 'number' && isFinite(financialData.revenueGrowth)) {
      defaultGrowth = clamp(financialData.revenueGrowth, -0.5, 0.8)
      growthSource = 'Historique TTM'
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
      if (defaultGrowth > 0.30) {
        defaultPE = 35
      } else if (defaultGrowth > 0.15) {
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
      default_growth: parseFloat(defaultGrowth.toFixed(4)),
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

```

# supabase/migrations/20260722_create_stocks.sql

```sql
-- Create stock_status enum
CREATE TYPE public.stock_status AS ENUM ('research', 'watchlist', 'portfolio');

-- Create public.stocks table
CREATE TABLE public.stocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    ticker TEXT NOT NULL,
    name TEXT,
    current_price NUMERIC,
    revenue_ttm NUMERIC,
    shares_outstanding NUMERIC,
    fetched_at TIMESTAMPTZ DEFAULT NOW(),
    status public.stock_status NOT NULL DEFAULT 'research',
    projected_growth NUMERIC NOT NULL DEFAULT 0.10,
    projected_margin NUMERIC NOT NULL DEFAULT 0.20,
    target_pe NUMERIC NOT NULL DEFAULT 20,
    discount_rate NUMERIC NOT NULL DEFAULT 0.10,
    thesis TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT stocks_user_id_ticker_key UNIQUE (user_id, ticker)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.stocks ENABLE ROW LEVEL SECURITY;

-- Policies for RLS
CREATE POLICY "Users can manage their own stocks"
    ON public.stocks
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

```

# tsconfig.json

```json
{
  // https://nuxt.com/docs/guide/concepts/typescript
  "files": [],
  "references": [
    {
      "path": "./.nuxt/tsconfig.app.json"
    },
    {
      "path": "./.nuxt/tsconfig.server.json"
    },
    {
      "path": "./.nuxt/tsconfig.shared.json"
    },
    {
      "path": "./.nuxt/tsconfig.node.json"
    }
  ]
}

```

