<script setup lang="ts">
import type { Stock, QualitativeData } from '~/types/database.types'
import { computeValuation, type ValuationInputs } from '~/utils/valuation'
import { formatCurrency, formatPercent } from '~/utils/format'

const props = defineProps<{
  stock: Stock
}>()

const emit = defineEmits<{
  (e: 'toggleStatus', stock: Stock): void
  (e: 'delete', id: string, ticker: string): void
}>()

const valuationInputs = computed<ValuationInputs>(() => ({
  currentPrice: props.stock.current_price ?? 0,
  revenueTTM: props.stock.revenue_ttm ?? 0,
  sharesOutstanding: props.stock.shares_outstanding ?? 0,
  growthMode: props.stock.growth_mode || 'cagr',
  growth: props.stock.projected_growth ?? 0.10,
  growthY1: props.stock.growth_y1 ?? 0.10,
  growthY2: props.stock.growth_y2 ?? 0.10,
  growthY3: props.stock.growth_y3 ?? 0.10,
  growthY4: props.stock.growth_y4 ?? 0.10,
  growthY5: props.stock.growth_y5 ?? 0.10,
  marginType: 'net_income',
  margin: props.stock.projected_margin ?? 0.20,
  targetMultiple: props.stock.target_multiple ?? 20.0,
  discountRate: props.stock.discount_rate ?? 0.10,
  riskSpread: props.stock.risk_spread ?? 0.20,
}))

const valuation = computed(() => computeValuation(valuationInputs.value))
const fairValue = computed(() => valuation.value.fairValue)
const marginOfSafety = computed(() => valuation.value.marginOfSafety)

const parsedQualitative = computed<QualitativeData | null>(() => {
  if (!props.stock.qualitative_data) return null
  try {
    return typeof props.stock.qualitative_data === 'string'
      ? JSON.parse(props.stock.qualitative_data)
      : props.stock.qualitative_data
  } catch {
    return null
  }
})

const regressionGapPercent = computed(() => {
  if (!props.stock.regression_fair_price || !props.stock.current_price) return null
  return ((props.stock.regression_fair_price - props.stock.current_price) / props.stock.current_price) * 100
})

const badgeConfig = computed(() => {
  const mos = marginOfSafety.value
  if (mos > 15) return { label: 'Sous-évaluée', class: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' }
  if (mos >= 0) return { label: 'Fair Value', class: 'bg-amber-500/10 text-amber-400 border-amber-500/30' }
  return { label: 'Surévaluée', class: 'bg-rose-500/10 text-rose-400 border-rose-500/30' }
})

const tierBadgeClass = computed(() => {
  const tier = parsedQualitative.value?.tier
  if (tier === 'S') return 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  if (tier === 'A') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  if (tier === 'B') return 'bg-sky-500/10 text-sky-400 border-sky-500/30'
  if (tier === 'C') return 'bg-orange-500/10 text-orange-400 border-orange-500/30'
  return 'bg-rose-500/10 text-rose-400 border-rose-500/30'
})

const navigateToWorkspace = () => {
const navigateToTab = (tab?: 'dcf' | 'quant' | 'research') => {
  if (tab) {
    navigateTo(`/stock/${props.stock.ticker}?tab=${tab}`)
  } else {
    navigateTo(`/stock/${props.stock.ticker}`)
  }
}
</script>

<template>
  <div
    class="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-4 sm:px-5 shadow-sm backdrop-blur transition-all duration-150 hover:border-zinc-700 hover:bg-zinc-900/80 cursor-pointer select-none"
    @click="navigateToTab()"
  >
    <!-- Section 1 : Info Stock (Ticker + Nom + Cours P0) -->
    <div class="flex items-center gap-3.5 min-w-0 md:w-1/3">
      <CompanyLogo :ticker="stock.ticker" :domain="(stock as any).domain" size="md" />
      <div class="min-w-0 flex-1">
        <h3 class="font-bold text-white text-sm tracking-tight truncate group-hover:text-emerald-300 transition">
          {{ stock.name || stock.ticker }}
        </h3>
        <div class="text-xs text-zinc-400 mt-0.5 font-mono">
          <span class="text-zinc-500">P0:</span> <span class="font-semibold text-zinc-200">{{ formatCurrency(stock.current_price, stock.currency) }}</span>
        </div>
      </div>
    </div>

    <!-- Section 2 : Grille d'Indicateurs (DCF, Régression, Qualité IA) -->
    <div class="flex flex-wrap items-center gap-4 sm:gap-6 w-full md:w-auto">
      <!-- Indicateur 1: Fair Value DCF -->
      <div
        class="flex flex-col gap-1 pr-4 border-r border-zinc-800/80 hover:bg-zinc-800/40 p-1.5 rounded-lg transition cursor-pointer group/dcf"
        title="Ouvrir le Modèle DCF & Thèse Quantitative"
        @click.stop="navigateToTab('dcf')"
      >
        <span class="text-[10px] uppercase font-mono tracking-wider text-zinc-500 font-semibold flex items-center gap-1 group-hover/dcf:text-emerald-400 transition">
          DCF Fair Value ↗
        </span>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-white font-mono">{{ formatCurrency(fairValue, stock.currency) }}</span>
          <span
            class="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-mono font-bold border"
            :class="badgeConfig.class"
          >
            {{ formatPercent(marginOfSafety) }}
          </span>
        </div>
      </div>

      <!-- Indicateur 2: Prix Régression (si disponible) -->
      <div
        v-if="stock.regression_fair_price"
        class="flex flex-col gap-1 pr-4 border-r border-zinc-800/80 hover:bg-zinc-800/40 p-1.5 rounded-lg transition cursor-pointer group/quant"
        title="Ouvrir le Canal de Régression Quantitatif"
        @click.stop="navigateToTab('quant')"
      >
        <span class="text-[10px] uppercase font-mono tracking-wider text-zinc-500 font-semibold flex items-center gap-1 group-hover/quant:text-sky-400 transition">
          Régression ↗
        </span>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-white font-mono">{{ formatCurrency(stock.regression_fair_price, stock.currency) }}</span>
          <span
            v-if="regressionGapPercent !== null"
            class="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-mono font-bold border"
            :class="regressionGapPercent >= 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'"
          >
            {{ regressionGapPercent >= 0 ? '+' : '' }}{{ regressionGapPercent.toFixed(1) }}%
          </span>
        </div>
      </div>

      <!-- Indicateur 3: Score Qualitatif IA (si disponible) -->
      <div
        v-if="parsedQualitative"
        class="flex flex-col gap-1 hover:bg-zinc-800/40 p-1.5 rounded-lg transition cursor-pointer group/research"
        title="Ouvrir l'Analyse Deep Research Quali"
        @click.stop="navigateToTab('research')"
      >
        <span class="text-[10px] uppercase font-mono tracking-wider text-zinc-500 font-semibold flex items-center gap-1 group-hover/research:text-emerald-400 transition">
          Qualité IA ↗
        </span>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-emerald-400 font-mono">{{ parsedQualitative.quality_score }}/100</span>
          <span
            class="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-mono font-bold border"
            :class="tierBadgeClass"
          >
            Tier {{ parsedQualitative.tier }}
          </span>
        </div>
      </div>
    </div>

    <!-- Section 3 : Actions & Navigation -->
    <div class="flex items-center justify-end gap-2 shrink-0 self-end md:self-center">
      <!-- Toggle Portefeuille / Watchlist -->
      <button
        type="button"
        class="flex h-8 w-8 items-center justify-center rounded-lg border text-xs transition shadow-sm"
        :class="stock.status === 'watchlist' 
          ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/50' 
          : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'"
        :title="stock.status === 'watchlist' ? 'Transférer dans le Portefeuille' : 'Transférer dans la Watchlist'"
        @click.stop="emit('toggleStatus', stock)"
      >
        <!-- Folder/Briefcase Icon for Portfolio vs Eye Icon for Watchlist -->
        <svg v-if="stock.status === 'watchlist'" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <svg v-else class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>

      <!-- Delete Button -->
      <button
        type="button"
        class="flex h-8 w-8 items-center justify-center text-zinc-500 hover:text-rose-400 transition rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800"
        title="Supprimer de la base"
        @click.stop="emit('delete', stock.id, stock.ticker)"
      >
        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      <!-- Arrow -->
      <div class="pl-1 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
</template>
