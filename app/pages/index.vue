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

// Charger les actions de l'utilisateur
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

// Analyser et enregistrer un ticker
const analyzeAndAddStock = async () => {
  const ticker = searchTicker.value.trim().toUpperCase()
  if (!ticker || !user.value) return

  isLoading.value = true
  errorMessage.value = null
  successMessage.value = null

  try {
    // 1. Fetch Nitro API
    const stockData = await $fetch<{
      ticker: string
      name: string
      current_price: number | null
      revenue_ttm: number | null
      shares_outstanding: number | null
      fetched_at: string
    }>(`/api/stock/${encodeURIComponent(ticker)}`)

    // 2. Upsert dans Supabase
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
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,ticker' }
      )
      .select()

    if (error) throw error

    successMessage.value = `Action ${stockData.ticker} (${stockData.name}) enregistrée avec succès !`
    searchTicker.value = ''
    await fetchUserStocks()
  } catch (err: any) {
    errorMessage.value = err.data?.statusMessage || err.message || 'Impossible d\'ajouter ce ticker.'
  } finally {
    isLoading.value = false
  }
}

// Mettre à jour les paramètres de valorisation
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
  } catch (err: any) {
    console.error('Erreur mise à jour hypothèses:', err)
  }
}

// Supprimer une action
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

// Formatage des montants volumineux (Milliards / Millions)
const formatLargeNumber = (num: number | null) => {
  if (num === null || num === undefined) return 'N/A'
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)} T`
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)} B`
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)} M`
  return num.toLocaleString()
}

// Déconnexion
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

    <!-- Barre de recherche & Ingestion -->
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

      <!-- Feedback messages -->
      <div v-if="errorMessage" class="rounded-lg border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-300">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="rounded-lg border border-emerald-500/30 bg-emerald-950/40 p-3 text-xs text-emerald-300">
        {{ successMessage }}
      </div>
    </div>

    <!-- Liste des stocks analysés -->
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
        Aucune action enregistrée pour le moment. Utilisez la barre de recherche ci-dessus pour commencer.
      </div>

      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        <div
          v-for="stock in stocks"
          :key="stock.id"
          class="rounded-xl border border-gray-800 bg-gray-900/40 p-6 space-y-6 shadow-lg transition hover:border-gray-700"
        >
          <!-- Entête Stock -->
          <div class="flex items-start justify-between">
            <div>
              <div class="flex items-center gap-3">
                <span class="rounded-md bg-emerald-500/10 px-2.5 py-1 font-mono text-sm font-bold text-emerald-400 border border-emerald-500/20">
                  {{ stock.ticker }}
                </span>
                <h3 class="text-base font-semibold text-white">
                  {{ stock.name || stock.ticker }}
                </h3>
              </div>
              <p class="mt-1 text-xs text-gray-500">
                Mis à jour le {{ new Date(stock.fetched_at).toLocaleString() }}
              </p>
            </div>
            <button
              type="button"
              class="rounded-lg p-2 text-gray-500 transition hover:bg-red-950/50 hover:text-red-400"
              title="Supprimer l'action"
              @click="deleteStock(stock.id, stock.ticker)"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <!-- Métriques Brutes Extract -->
          <div class="grid grid-cols-3 gap-4 rounded-lg bg-gray-950/80 p-4 text-center border border-gray-800/80">
            <div>
              <p class="text-xs text-gray-400">Prix Actuel</p>
              <p class="mt-1 font-mono text-base font-bold text-white">
                {{ stock.current_price ? `$${stock.current_price.toFixed(2)}` : 'N/A' }}
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-400">CA TTM</p>
              <p class="mt-1 font-mono text-base font-bold text-gray-200">
                {{ formatLargeNumber(stock.revenue_ttm) }}
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-400">Actions (Shares)</p>
              <p class="mt-1 font-mono text-base font-bold text-gray-200">
                {{ formatLargeNumber(stock.shares_outstanding) }}
              </p>
            </div>
          </div>

          <!-- Modificateur d'Hypothèses de Valorisation -->
          <div class="space-y-3 pt-2">
            <h4 class="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Hypothèses de Valorisation
            </h4>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <!-- Croissance CA -->
              <div>
                <label class="block text-xs text-gray-400 mb-1">Croissance CA (ex: 0.10)</label>
                <input
                  v-model.number="stock.projected_growth"
                  type="number"
                  step="0.01"
                  class="w-full rounded-md border border-gray-800 bg-gray-950 px-3 py-1.5 font-mono text-xs text-white focus:border-emerald-500 focus:outline-none"
                  @change="updateStockHypotheses(stock)"
                >
              </div>

              <!-- Marge Op / Nette -->
              <div>
                <label class="block text-xs text-gray-400 mb-1">Marge (ex: 0.20)</label>
                <input
                  v-model.number="stock.projected_margin"
                  type="number"
                  step="0.01"
                  class="w-full rounded-md border border-gray-800 bg-gray-950 px-3 py-1.5 font-mono text-xs text-white focus:border-emerald-500 focus:outline-none"
                  @change="updateStockHypotheses(stock)"
                >
              </div>

              <!-- PER Cible -->
              <div>
                <label class="block text-xs text-gray-400 mb-1">PER Cible (ex: 20)</label>
                <input
                  v-model.number="stock.target_pe"
                  type="number"
                  step="1"
                  class="w-full rounded-md border border-gray-800 bg-gray-950 px-3 py-1.5 font-mono text-xs text-white focus:border-emerald-500 focus:outline-none"
                  @change="updateStockHypotheses(stock)"
                >
              </div>

              <!-- Taux d'Actualisation -->
              <div>
                <label class="block text-xs text-gray-400 mb-1">Taux Actualisation</label>
                <input
                  v-model.number="stock.discount_rate"
                  type="number"
                  step="0.01"
                  class="w-full rounded-md border border-gray-800 bg-gray-950 px-3 py-1.5 font-mono text-xs text-white focus:border-emerald-500 focus:outline-none"
                  @change="updateStockHypotheses(stock)"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
