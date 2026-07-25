<script setup lang="ts">
import type { Stock, StockStatus, StockApiResponse, QualitativeData } from '~/types/database.types'
import { computeValuation, type ValuationInputs } from '~/utils/valuation'

const toast = useToast()

const searchTicker = ref('')
const targetStatusForAdd = ref<StockStatus>('watchlist')
const isLoading = ref(false)

const stocks = ref<Stock[]>([])
const isFetchingStocks = ref(true)

// Filtering & Sorting State
const valuationFilter = ref<'all' | 'undervalued' | 'fair' | 'overvalued'>('all')
const sortBy = ref<'mos_desc' | 'ticker_asc' | 'quality_desc'>('mos_desc')

const fetchStocks = async () => {
  isFetchingStocks.value = true
  try {
    const data = await $fetch<Stock[]>('/api/stocks')
    stocks.value = data || []
  } catch (err: any) {
    console.error('Erreur chargement stocks SQLite:', err)
    toast.error('Impossible de charger les actions depuis la base de données.')
  } finally {
    isFetchingStocks.value = false
  }
}

onMounted(() => {
  fetchStocks()
})

const analyzeAndAddStock = async () => {
  const ticker = searchTicker.value.trim().toUpperCase()
  if (!ticker) return

  isLoading.value = true

  try {
    const stockData = await $fetch<StockApiResponse>(`/api/stock/${encodeURIComponent(ticker)}`)
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
        status: targetStatusForAdd.value,
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

    const statusLabel = targetStatusForAdd.value === 'portfolio' ? 'Portefeuille' : 'Watchlist'
    toast.success(`${saved.ticker} (${saved.name || saved.ticker}) ajouté avec succès au ${statusLabel}.`)
    searchTicker.value = ''
    await fetchStocks()
  } catch (err: any) {
    const msg = err.data?.statusMessage || err.message || 'Impossible d\'ajouter ce ticker.'
    toast.error(msg)
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

    const label = newStatus === 'portfolio' ? 'Portefeuille' : 'Watchlist'
    toast.info(`Statut de ${stock.ticker} passé en ${label}.`)
  } catch (err: any) {
    console.error('Erreur bascule de statut:', err)
    toast.error(`Impossible de modifier le statut de ${stock.ticker}.`)
  }
}

const stockToDelete = ref<{ id: string; ticker: string } | null>(null)

const deleteStock = (id: string, ticker: string) => {
  stockToDelete.value = { id, ticker }
}

const confirmDeleteStock = async () => {
  if (!stockToDelete.value) return
  const { id, ticker } = stockToDelete.value
  stockToDelete.value = null

  try {
    await $fetch(`/api/stocks/${id}`, { method: 'DELETE' })
    stocks.value = stocks.value.filter(s => s.id !== id)
    toast.success(`Action ${ticker} supprimée de votre liste.`)
  } catch (err: any) {
    console.error('Erreur suppression:', err)
    toast.error(`Échec de la suppression de ${ticker}.`)
  }
}

// Compute valuation metadata for sorting and filtering
const getStockMetrics = (stock: Stock) => {
  const inputs: ValuationInputs = {
    currentPrice: stock.current_price ?? 0,
    revenueTTM: stock.revenue_ttm ?? 0,
    sharesOutstanding: stock.shares_outstanding ?? 0,
    growthMode: stock.growth_mode || 'cagr',
    growth: stock.projected_growth ?? 0.10,
    growthY1: stock.growth_y1 ?? 0.10,
    growthY2: stock.growth_y2 ?? 0.10,
    growthY3: stock.growth_y3 ?? 0.10,
    growthY4: stock.growth_y4 ?? 0.10,
    growthY5: stock.growth_y5 ?? 0.10,
    marginType: 'net_income',
    margin: stock.projected_margin ?? 0.20,
    targetMultiple: stock.target_multiple ?? 20.0,
    discountRate: stock.discount_rate ?? 0.10,
    riskSpread: stock.risk_spread ?? 0.20,
  }
  const val = computeValuation(inputs)
  let qualityScore = 0
  if (stock.qualitative_data) {
    try {
      const qData = typeof stock.qualitative_data === 'string' ? JSON.parse(stock.qualitative_data) : stock.qualitative_data
      qualityScore = qData.quality_score || 0
    } catch {
      qualityScore = 0
    }
  }

  let valStatus: 'undervalued' | 'fair' | 'overvalued' = 'fair'
  if (val.marginOfSafety > 15) valStatus = 'undervalued'
  else if (val.marginOfSafety < 0) valStatus = 'overvalued'

  return { mos: val.marginOfSafety, valStatus, qualityScore }
}

const filterAndSortStocks = (list: Stock[]) => {
  return list
    .filter(stock => {
      if (valuationFilter.value === 'all') return true
      const { valStatus } = getStockMetrics(stock)
      return valStatus === valuationFilter.value
    })
    .sort((a, b) => {
      const metricsA = getStockMetrics(a)
      const metricsB = getStockMetrics(b)

      if (sortBy.value === 'mos_desc') {
        return metricsB.mos - metricsA.mos
      }
      if (sortBy.value === 'quality_desc') {
        return metricsB.qualityScore - metricsA.qualityScore
      }
      return a.ticker.localeCompare(b.ticker)
    })
}

const portfolioStocks = computed(() => filterAndSortStocks(stocks.value.filter(s => s.status === 'portfolio')))
const watchlistStocks = computed(() => filterAndSortStocks(stocks.value.filter(s => s.status !== 'portfolio')))

const rawPortfolioCount = computed(() => stocks.value.filter(s => s.status === 'portfolio').length)
const rawWatchlistCount = computed(() => stocks.value.filter(s => s.status !== 'portfolio').length)
</script>

<template>
  <div class="space-y-8">
    <!-- Header de Page épuré -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
      <div>
        <h1 class="text-xl font-bold tracking-tight text-white font-mono">
          DASHBOARD ANALYSTE
        </h1>
        <p class="text-xs text-zinc-400 mt-0.5">
          Suivi quantitatif, modèles DCF et cotations financières
        </p>
      </div>

      <!-- Toolbar Filtres & Tri -->
      <div class="flex flex-wrap items-center gap-2">
        <!-- Filtre de valorisation -->
        <div class="flex items-center rounded-xl bg-zinc-900 border border-zinc-800 p-1 text-xs font-medium">
          <button
            type="button"
            class="px-2.5 py-1 rounded-lg transition"
            :class="valuationFilter === 'all' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'"
            @click="valuationFilter = 'all'"
          >
            Tous
          </button>
          <button
            type="button"
            class="px-2.5 py-1 rounded-lg transition"
            :class="valuationFilter === 'undervalued' ? 'bg-emerald-500/20 text-emerald-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'"
            @click="valuationFilter = 'undervalued'"
          >
            Sous-évaluées
          </button>
          <button
            type="button"
            class="px-2.5 py-1 rounded-lg transition"
            :class="valuationFilter === 'fair' ? 'bg-amber-500/20 text-amber-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'"
            @click="valuationFilter = 'fair'"
          >
            Fair Value
          </button>
          <button
            type="button"
            class="px-2.5 py-1 rounded-lg transition"
            :class="valuationFilter === 'overvalued' ? 'bg-rose-500/20 text-rose-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'"
            @click="valuationFilter = 'overvalued'"
          >
            Surévaluées
          </button>
        </div>

        <!-- Trieur -->
        <select
          v-model="sortBy"
          class="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 transition focus:border-emerald-500/80 focus:outline-none"
        >
          <option value="mos_desc">Tri: Marge de sécurité (↓)</option>
          <option value="quality_desc">Tri: Score IA (↓)</option>
          <option value="ticker_asc">Tri: Ticker (A-Z)</option>
        </select>
      </div>
    </div>

    <!-- Barre de recherche épurée & unifiée -->
    <div class="space-y-2">
      <form class="flex flex-col sm:flex-row items-stretch gap-2" @submit.prevent="analyzeAndAddStock">
        <div class="relative flex-1">
          <input
            v-model="searchTicker"
            type="text"
            placeholder="Rechercher ou ajouter un ticker (ex: NVDA, AAPL, TTE.PA)..."
            class="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-xs text-white placeholder-zinc-500 font-mono shadow-sm transition focus:border-emerald-500/80 focus:outline-none focus:ring-1 focus:ring-emerald-500/80"
            :disabled="isLoading"
          >
        </div>

        <div class="flex items-center gap-1.5">
          <!-- Target Status Selector -->
          <div class="flex items-center rounded-xl bg-zinc-900 border border-zinc-800 p-1 text-xs">
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg font-semibold transition"
              :class="targetStatusForAdd === 'watchlist' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'"
              @click="targetStatusForAdd = 'watchlist'"
            >
              Watchlist
            </button>
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg font-semibold transition"
              :class="targetStatusForAdd === 'portfolio' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-zinc-200'"
              @click="targetStatusForAdd = 'portfolio'"
            >
              Portefeuille
            </button>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-500 focus:outline-none disabled:opacity-50 shadow-sm shrink-0"
            :disabled="isLoading || !searchTicker.trim()"
          >
            <svg v-if="isLoading" class="h-3.5 w-3.5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>Ajouter</span>
          </button>
        </div>
      </form>
    </div>

    <!-- State Loading -->
    <div v-if="isFetchingStocks" class="py-16 text-center text-xs text-zinc-500 font-mono">
      Chargement des données financières...
    </div>

    <!-- Lists -->
    <div v-else class="space-y-8">
      <!-- Section 1 : Mon Portefeuille -->
      <section class="space-y-3">
        <div class="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
          <div class="flex items-center gap-2">
            <h2 class="text-sm font-bold text-white tracking-tight uppercase font-mono">
              Portefeuille
            </h2>
            <span class="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
              {{ portfolioStocks.length }} / {{ rawPortfolioCount }}
            </span>
          </div>
        </div>

        <div v-if="portfolioStocks.length === 0" class="rounded-xl border border-dashed border-zinc-800/80 p-8 text-center text-xs text-zinc-500 font-mono">
          Aucune action dans votre portefeuille{{ valuationFilter !== 'all' ? ' correspondant aux filtres activés' : '' }}.
        </div>

        <div v-else class="grid gap-2">
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
        <div class="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
          <div class="flex items-center gap-2">
            <h2 class="text-sm font-bold text-white tracking-tight uppercase font-mono">
              Watchlist
            </h2>
            <span class="rounded-md bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[10px] font-mono font-bold text-zinc-400">
              {{ watchlistStocks.length }} / {{ rawWatchlistCount }}
            </span>
          </div>
        </div>

        <div v-if="watchlistStocks.length === 0" class="rounded-xl border border-dashed border-zinc-800/80 p-8 text-center text-xs text-zinc-500 font-mono">
          Aucune action en watchlist{{ valuationFilter !== 'all' ? ' correspondant aux filtres activés' : '' }}.
        </div>

        <div v-else class="grid gap-2">
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

    <!-- Confirm Delete Modal -->
    <ConfirmModal
      :is-open="Boolean(stockToDelete)"
      title="Supprimer l'action"
      :message="`Voulez-vous vraiment supprimer l'action ${stockToDelete?.ticker} de votre base locale ?`"
      confirm-text="Supprimer"
      cancel-text="Annuler"
      :is-danger="true"
      @confirm="confirmDeleteStock"
      @cancel="stockToDelete = null"
    />
  </div>
</template>
