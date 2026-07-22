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

const fetchUserStocks = async () => {
  if (!user.value) return
  isFetchingStocks.value = true
  try {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    stocks.value = (data as Stock[]) || []
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
      default_margin: number
      default_pe: number
      default_discount_rate: number
    }>(`/api/stock/${encodeURIComponent(ticker)}`)

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

    successMessage.value = `${stockData.ticker} (${stockData.name}) — données mises à jour.`
    searchTicker.value = ''
    await fetchUserStocks()
  } catch (err: any) {
    errorMessage.value = err.data?.statusMessage || err.message || 'Impossible d\'ajouter ce ticker.'
  } finally {
    isLoading.value = false
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
          placeholder="Ex: AAPL, ASML, NVDA, TTE.PA..."
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
          :stock="stock"
          @update="updateStockHypotheses"
          @delete="deleteStock"
        />
      </div>
    </div>
  </div>
</template>
