<script setup lang="ts">
import type { Stock, StockStatus } from '~/types/database.types'

const searchTicker = ref('')
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)

const stocks = ref<Stock[]>([])
const isFetchingStocks = ref(true)

const fetchStocks = async () => {
  isFetchingStocks.value = true
  try {
    const data = await $fetch<Stock[]>('/api/stocks')
    stocks.value = data || []
  } catch (err: any) {
    console.error('Erreur chargement stocks SQLite:', err)
  } finally {
    isFetchingStocks.value = false
  }
}

onMounted(() => {
  fetchStocks()
})

const analyzeAndAddStock = async (targetStatus: StockStatus = 'watchlist') => {
  const ticker = searchTicker.value.trim().toUpperCase()
  if (!ticker) return

  isLoading.value = true
  errorMessage.value = null
  successMessage.value = null

  try {
    const stockData = await $fetch<{
      ticker: string
      name: string
      currency: string
      current_price: number | null
      revenue_ttm: number | null
      shares_outstanding: number | null
      beta: number
      fetched_at: string
      growth_mode: 'cagr' | 'explicit'
      default_growth: number
      growth_y1: number
      growth_y2: number
      growth_y3: number
      growth_y4: number
      growth_y5: number
      growth_source: string
      default_margin_type: 'net_income' | 'fcf'
      default_margin: number
      margin_source: string
      default_target_multiple: number
      pe_source: string
      default_discount_rate: number
      default_risk_spread: number
      market_cap: number | null
      pe_trailing_raw: number | null
      pe_forward_raw: number | null
      margin_gross_raw: number | null
      margin_operating_raw: number | null
      margin_net_raw: number | null
      margin_fcf_raw: number | null
      total_cash: number | null
      total_debt: number | null
      free_cash_flow_raw: number | null
      analyst_target_low: number | null
      analyst_target_median: number | null
      analyst_target_price: number | null
      analyst_target_high: number | null
      analyst_growth_estimate: number | null
      analyst_count: number | null
      audit_data: any
    }>(`/api/stock/${encodeURIComponent(ticker)}`)

    const existing = stocks.value.find(s => s.ticker === stockData.ticker)

    const saved = await $fetch<Stock>('/api/stocks', {
      method: 'POST',
      body: {
        ticker: stockData.ticker,
        name: stockData.name,
        currency: stockData.currency ?? 'USD',
        current_price: stockData.current_price,
        revenue_ttm: stockData.revenue_ttm,
        shares_outstanding: stockData.shares_outstanding,
        beta: stockData.beta ?? 1.0,
        fetched_at: stockData.fetched_at,
        status: targetStatus,
        growth_mode: existing?.growth_mode ?? stockData.growth_mode,
        projected_growth: existing?.projected_growth ?? stockData.default_growth,
        growth_y1: existing?.growth_y1 ?? stockData.growth_y1,
        growth_y2: existing?.growth_y2 ?? stockData.growth_y2,
        growth_y3: existing?.growth_y3 ?? stockData.growth_y3,
        growth_y4: existing?.growth_y4 ?? stockData.growth_y4,
        growth_y5: existing?.growth_y5 ?? stockData.growth_y5,
        margin_type: 'net_income',
        projected_margin: existing?.projected_margin ?? stockData.default_margin,
        target_multiple: existing?.target_multiple ?? stockData.default_target_multiple ?? 20.0,
        discount_rate: existing?.discount_rate ?? stockData.default_discount_rate,
        risk_spread: existing?.risk_spread ?? stockData.default_risk_spread ?? 0.20,
        market_cap: stockData.market_cap,
        pe_trailing_raw: stockData.pe_trailing_raw,
        pe_forward_raw: stockData.pe_forward_raw,
        margin_gross_raw: stockData.margin_gross_raw,
        margin_operating_raw: stockData.margin_operating_raw,
        margin_net_raw: stockData.margin_net_raw,
        margin_fcf_raw: stockData.margin_fcf_raw,
        total_cash: stockData.total_cash,
        total_debt: stockData.total_debt,
        free_cash_flow_raw: stockData.free_cash_flow_raw,
        analyst_target_price: stockData.analyst_target_price,
        analyst_target_median: stockData.analyst_target_median,
        analyst_target_low: stockData.analyst_target_low,
        analyst_target_high: stockData.analyst_target_high,
        analyst_growth_estimate: stockData.analyst_growth_estimate,
        analyst_count: stockData.analyst_count,
        audit_data: stockData.audit_data,
      },
    })

    const statusLabel = targetStatus === 'portfolio' ? 'Portefeuille' : 'Watchlist'
    successMessage.value = `${saved.ticker} (${saved.name}) enregistré dans ${statusLabel}.`
    searchTicker.value = ''
    setTimeout(() => { successMessage.value = null }, 3500)
    await fetchStocks()
  } catch (err: any) {
    errorMessage.value = err.data?.statusMessage || err.message || 'Impossible d\'ajouter ce ticker.'
  } finally {
    isLoading.value = false
  }
}

const toggleStockStatus = async (stock: Stock) => {
  const newStatus: StockStatus = stock.status === 'portfolio' ? 'watchlist' : 'portfolio'
  try {
    const updated = await $fetch<Stock>(`/api/stocks/${stock.id}`, {
      method: 'PUT',
      body: { status: newStatus },
    })

    const idx = stocks.value.findIndex(s => s.id === stock.id)
    if (idx !== -1) {
      stocks.value[idx] = { ...stocks.value[idx], status: updated.status }
    }
  } catch (err: any) {
    console.error('Erreur bascule de statut:', err)
  }
}

const deleteStock = async (id: string, ticker: string) => {
  if (!confirm(`Supprimer ${ticker} de votre base locale ?`)) return
  try {
    await $fetch(`/api/stocks/${id}`, { method: 'DELETE' })
    stocks.value = stocks.value.filter(s => s.id !== id)
  } catch (err: any) {
    console.error('Erreur suppression:', err)
  }
}

const portfolioStocks = computed(() => stocks.value.filter(s => s.status === 'portfolio'))
const watchlistStocks = computed(() => stocks.value.filter(s => s.status !== 'portfolio'))
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-1 border-b border-gray-800 pb-5">
      <h1 class="text-2xl font-bold tracking-tight text-white">
        Dashboard Analyste
      </h1>
      <p class="text-xs text-gray-400">
        Base SQLite locale (<span class="text-emerald-400 font-mono">.data/stocks.db</span>)
      </p>
    </div>

    <!-- Barre de recherche épurée & unifiée -->
    <div class="space-y-2">
      <form class="flex flex-col sm:flex-row gap-2.5" @submit.prevent="analyzeAndAddStock('watchlist')">
        <div class="relative flex-1">
          <input
            v-model="searchTicker"
            type="text"
            placeholder="Ajouter un ticker (ex: NVDA, AAPL, TTE.PA)..."
            class="w-full rounded-xl border border-gray-800 bg-gray-950/80 px-4 py-2.5 text-sm text-white placeholder-gray-500 shadow-sm transition focus:border-emerald-500/80 focus:outline-none focus:ring-1 focus:ring-emerald-500/80"
            :disabled="isLoading"
          >
        </div>

        <div class="flex gap-2 shrink-0">
          <button
            type="button"
            class="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gray-900 border border-gray-800 px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:bg-gray-800 hover:text-white focus:outline-none disabled:opacity-50"
            :disabled="isLoading || !searchTicker.trim()"
            @click="analyzeAndAddStock('watchlist')"
          >
            <span>+ Watchlist</span>
          </button>

          <button
            type="button"
            class="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-500 focus:outline-none disabled:opacity-50 shadow-sm"
            :disabled="isLoading || !searchTicker.trim()"
            @click="analyzeAndAddStock('portfolio')"
          >
            <svg v-if="isLoading" class="h-3.5 w-3.5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>+ Portefeuille</span>
          </button>
        </div>
      </form>

      <div v-if="errorMessage" class="rounded-lg border border-red-500/30 bg-red-950/40 p-2.5 text-xs text-red-300">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="rounded-lg border border-emerald-500/30 bg-emerald-950/40 p-2.5 text-xs text-emerald-300">
        {{ successMessage }}
      </div>
    </div>

    <!-- State Loading -->
    <div v-if="isFetchingStocks" class="py-12 text-center text-xs text-gray-500">
      Chargement...
    </div>

    <!-- Lists -->
    <div v-else class="space-y-8">
      <!-- Section 1 : Mon Portefeuille -->
      <section class="space-y-3">
        <div class="flex items-center gap-2 border-b border-gray-800/60 pb-2">
          <h2 class="text-base font-bold text-white flex items-center gap-1.5">
            <span>💼</span>
            <span>Mon Portefeuille</span>
          </h2>
          <span class="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.2 text-[11px] font-semibold text-emerald-400">
            {{ portfolioStocks.length }}
          </span>
        </div>

        <div v-if="portfolioStocks.length === 0" class="rounded-xl border border-dashed border-gray-800/80 p-6 text-center text-xs text-gray-500">
          Aucune action dans votre portefeuille.
        </div>

        <div v-else class="grid gap-2.5">
          <StockCompactCard
            v-for="stock in portfolioStocks"
            :key="stock.id"
            :stock="stock"
            @toggle-status="toggleStockStatus"
            @delete="deleteStock"
          />
        </div>
      </section>

      <!-- Section 2 : Ma Watchlist -->
      <section class="space-y-3">
        <div class="flex items-center gap-2 border-b border-gray-800/60 pb-2">
          <h2 class="text-base font-bold text-white flex items-center gap-1.5">
            <span>👀</span>
            <span>Ma Watchlist</span>
          </h2>
          <span class="rounded-full bg-gray-800 px-2 py-0.2 text-[11px] font-semibold text-gray-400">
            {{ watchlistStocks.length }}
          </span>
        </div>

        <div v-if="watchlistStocks.length === 0" class="rounded-xl border border-dashed border-gray-800/80 p-6 text-center text-xs text-gray-500">
          Aucune action en watchlist.
        </div>

        <div v-else class="grid gap-2.5">
          <StockCompactCard
            v-for="stock in watchlistStocks"
            :key="stock.id"
            :stock="stock"
            @toggle-status="toggleStockStatus"
            @delete="deleteStock"
          />
        </div>
      </section>
    </div>
  </div>
</template>
