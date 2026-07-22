<script setup lang="ts">
import type { Stock } from '~/types/database.types'

const searchTicker = ref('')
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)

const stocks = ref<Stock[]>([])
const isFetchingStocks = ref(true)

const sourcesMap = ref<Record<string, { growth_source?: string; margin_source?: string; pe_source?: string }>>({})

const fetchStocks = async () => {
  isFetchingStocks.value = true
  try {
    const data = await $fetch<Stock[]>('/api/stocks')
    stocks.value = data || []

    // Background prefetch source indicators for existing stocks
    data.forEach(async (s) => {
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
    console.error('Erreur chargement stocks SQLite:', err)
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
  errorMessage.value = null
  successMessage.value = null

  try {
    // 1. Fetch Nitro API Yahoo Finance
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

    sourcesMap.value[stockData.ticker] = {
      growth_source: stockData.growth_source,
      margin_source: stockData.margin_source,
      pe_source: stockData.pe_source,
    }

    const existing = stocks.value.find(s => s.ticker === stockData.ticker)

    // 2. POST to SQLite local
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

    successMessage.value = `${saved.ticker} (${saved.name}) — enregistré en SQLite local avec Audit Trail.`
    searchTicker.value = ''
    await fetchStocks()
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
    const updated = await $fetch<Stock>(`/api/stocks/${stock.id}`, {
      method: 'PUT',
      body: {
        currency: stock.currency,
        beta: Number(stock.beta),
        growth_mode: stock.growth_mode,
        projected_growth: Number(stock.projected_growth),
        growth_y1: Number(stock.growth_y1),
        growth_y2: Number(stock.growth_y2),
        growth_y3: Number(stock.growth_y3),
        growth_y4: Number(stock.growth_y4),
        growth_y5: Number(stock.growth_y5),
        revenue_y1: stock.revenue_y1 !== null ? Number(stock.revenue_y1) : null,
        revenue_y2: stock.revenue_y2 !== null ? Number(stock.revenue_y2) : null,
        revenue_y3: stock.revenue_y3 !== null ? Number(stock.revenue_y3) : null,
        revenue_y4: stock.revenue_y4 !== null ? Number(stock.revenue_y4) : null,
        revenue_y5: stock.revenue_y5 !== null ? Number(stock.revenue_y5) : null,
        margin_type: 'net_income',
        projected_margin: Number(stock.projected_margin),
        target_multiple: Number(stock.target_multiple),
        discount_rate: Number(stock.discount_rate),
        risk_spread: Number(stock.risk_spread),
      },
    })

    const idx = stocks.value.findIndex(s => s.id === stock.id)
    if (idx !== -1) {
      stocks.value[idx] = { ...stocks.value[idx], ...updated }
    }
  } catch (err: any) {
    console.error('Erreur mise à jour hypothèses SQLite:', err)
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
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-800 pb-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-white">
          Moteur de Valorisation & Pricing
        </h1>
        <p class="text-sm text-gray-400">
          Base de données : <span class="font-medium text-emerald-400">SQLite Local (.data/stocks.db)</span>
        </p>
      </div>
    </div>

    <!-- Barre de recherche -->
    <div class="rounded-xl border border-gray-800 bg-gray-950/60 p-6 space-y-4 shadow-xl backdrop-blur">
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
        Aucune action enregistrée en SQLite. Utilisez la barre de recherche ci-dessus pour commencer.
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
