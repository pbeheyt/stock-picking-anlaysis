<script setup lang="ts">
import type { Stock } from '~/types/database.types'
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

const badgeConfig = computed(() => {
  const mos = marginOfSafety.value
  if (mos > 15) return { label: 'Sous-évaluée', class: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' }
  if (mos >= 0) return { label: 'Fair Value', class: 'bg-amber-500/15 text-amber-400 border-amber-500/30' }
  return { label: 'Surévaluée', class: 'bg-rose-500/15 text-rose-400 border-rose-500/30' }
})

const navigateToWorkspace = () => {
  navigateTo(`/stock/${props.stock.ticker}`)
}
</script>

<template>
  <div
    class="group relative flex flex-col md:grid md:grid-cols-12 gap-3 items-center rounded-xl border border-gray-800/80 bg-gray-950/70 p-3.5 sm:px-5 shadow-sm backdrop-blur transition-all duration-150 hover:border-gray-700 hover:bg-gray-900/50 cursor-pointer select-none"
    @click="navigateToWorkspace"
  >
    <!-- Col 1 : Info Action (Ticker + Nom + Cours P0) -->
    <div class="col-span-12 md:col-span-5 flex items-center gap-3.5 min-w-0 w-full">
      <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 border border-gray-800 font-extrabold text-white text-xs tracking-wider group-hover:border-emerald-500/40 group-hover:text-emerald-400 transition">
        {{ stock.ticker }}
      </div>
      <div class="min-w-0 flex-1">
        <h3 class="font-bold text-white text-sm tracking-tight truncate group-hover:text-emerald-300 transition">
          {{ stock.name || stock.ticker }}
        </h3>
        <div class="text-xs text-gray-400">
          Cours : <span class="font-semibold text-gray-200">{{ formatCurrency(stock.current_price, stock.currency) }}</span>
        </div>
      </div>
    </div>

    <!-- Col 2 : Valorisation (Fair Value en BLANC + Pourcentage en couleur clean) -->
    <div class="col-span-6 md:col-span-4 flex items-center gap-3 w-full justify-start">
      <div class="text-sm font-bold text-white tracking-wide">
        {{ formatCurrency(fairValue, stock.currency) }}
      </div>
      <span
        class="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold border"
        :class="badgeConfig.class"
      >
        {{ formatPercent(marginOfSafety) }}
      </span>
    </div>

    <!-- Col 3 : Actions & Navigation (Aligné à droite avec espace vide à côté) -->
    <div class="col-span-6 md:col-span-3 flex items-center justify-end gap-2.5 w-full">
      <!-- Toggle Portefeuille / Watchlist -->
      <button
        type="button"
        class="p-1.5 rounded-lg border text-xs transition"
        :class="stock.status === 'watchlist' 
          ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50' 
          : 'border-gray-800 bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white'"
        :title="stock.status === 'watchlist' ? 'Transférer dans le Portefeuille' : 'Transférer dans la Watchlist'"
        @click.stop="emit('toggleStatus', stock)"
      >
        <span v-if="stock.status === 'watchlist'">💼</span>
        <span v-else>👀</span>
      </button>

      <!-- Delete Button -->
      <button
        type="button"
        class="p-1.5 text-gray-500 hover:text-red-400 transition rounded-lg hover:bg-gray-800"
        title="Supprimer de la base"
        @click.stop="emit('delete', stock.id, stock.ticker)"
      >
        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </button>

      <!-- Arrow -->
      <span class="text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all text-sm font-bold pl-0.5">
        →
      </span>
    </div>
  </div>
</template>
