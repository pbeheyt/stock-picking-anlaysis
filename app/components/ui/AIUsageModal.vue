<script setup lang="ts">
import type { AiUsageLog, AiUsageResponse } from '~/server/api/ai/usage.get'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const isLoading = ref(false)
const usageData = ref<AiUsageResponse | null>(null)

const currentPage = ref(1)
const searchTickerFilter = ref('')

const fetchUsageLogs = async () => {
  if (!props.isOpen) return
  isLoading.value = true
  try {
    const params = new URLSearchParams({
      page: String(currentPage.value),
      pageSize: '20',
    })
    if (searchTickerFilter.value.trim()) {
      params.append('ticker', searchTickerFilter.value.trim())
    }

    const res = await $fetch<AiUsageResponse>(`/api/ai/usage?${params.toString()}`)
    usageData.value = res
  } catch (err) {
    console.error('Erreur chargement logs IA:', err)
  } finally {
    isLoading.value = false
  }
}

watch(() => props.isOpen, (open) => {
  if (open) {
    currentPage.value = 1
    fetchUsageLogs()
  }
})

watch(currentPage, () => {
  fetchUsageLogs()
})

const handleSearch = () => {
  currentPage.value = 1
  fetchUsageLogs()
}

const formatDateTime = (dateStr: string) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatCost = (val?: number) => {
  if (!val || val === 0) return '$0.0000'
  if (val < 0.001) return `$${val.toFixed(5)}`
  return `$${val.toFixed(4)}`
}

const formatActionName = (typeStr: string) => {
  if (typeStr === 'qualitative_research') return 'Research Quali'
  if (typeStr === 'quantitative_copilot') return 'Copilot Quanti'
  if (typeStr === 'model_test') return 'Test Modèle'
  return typeStr
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        @click.self="emit('close')"
      >
        <div
          class="relative w-full max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl space-y-6 max-h-[90vh] flex flex-col font-mono"
        >
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-zinc-800/80 pb-4 shrink-0">
            <div class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <svg class="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 class="text-base font-bold text-white">Consommation & Coûts API IA</h2>
                <p class="text-xs text-zinc-400 font-sans">Historique des jetons et dépenses par appel LLM (OpenRouter & DeepSeek)</p>
              </div>
            </div>

            <button
              type="button"
              class="rounded-lg p-1 text-zinc-400 hover:bg-zinc-900 hover:text-white transition cursor-pointer"
              @click="emit('close')"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- KPI Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
            <!-- KPI 1 : Dépense Totale -->
            <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3.5 space-y-1">
              <span class="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Dépense Totale ($ USD)</span>
              <div class="text-xl font-extrabold text-emerald-400 font-mono">
                {{ formatCost(usageData?.summary.totalCostUsd) }}
              </div>
            </div>

            <!-- KPI 2 : Total Jetons -->
            <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3.5 space-y-1">
              <span class="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Jetons Consommés</span>
              <div class="text-xl font-extrabold text-white font-mono">
                {{ (usageData?.summary.totalTokens || 0).toLocaleString('fr-FR') }} <span class="text-xs text-zinc-500 font-normal">tokens</span>
              </div>
            </div>

            <!-- KPI 3 : Appels Réussis / Total -->
            <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3.5 space-y-1">
              <span class="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Appels API Effectués</span>
              <div class="text-xl font-extrabold text-sky-400 font-mono flex items-center gap-2">
                <span>{{ usageData?.summary.totalCalls || 0 }}</span>
                <span class="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-sans">
                  {{ usageData?.summary.successCalls || 0 }} succès
                </span>
              </div>
            </div>
          </div>

          <!-- Filter & Search Toolbar -->
          <div class="flex items-center justify-between gap-3 shrink-0">
            <div class="flex items-center gap-2 flex-1 max-w-xs">
              <input
                v-model="searchTickerFilter"
                type="text"
                placeholder="Filtrer par Ticker (ex: AAPL, NVDA)..."
                class="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                @keyup.enter="handleSearch"
              >
              <button
                type="button"
                class="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition cursor-pointer"
                @click="handleSearch"
              >
                Filtrer
              </button>
            </div>

            <button
              type="button"
              class="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition cursor-pointer"
              @click="fetchUsageLogs"
            >
              <svg class="h-3.5 w-3.5" :class="{ 'animate-spin': isLoading }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Actualiser</span>
            </button>
          </div>

          <!-- Logs Table Container -->
          <div class="flex-1 overflow-y-auto rounded-xl border border-zinc-800/80 bg-zinc-900/30">
            <div v-if="isLoading && !usageData" class="p-12 text-center text-xs text-zinc-500">
              Chargement de l'historique...
            </div>

            <div v-else-if="!usageData?.logs.length" class="p-12 text-center text-xs text-zinc-500 font-sans">
              Aucun appel d'API IA enregistré dans l'historique pour le moment.
            </div>

            <table v-else class="w-full text-left text-xs border-collapse">
              <thead class="sticky top-0 bg-zinc-900 border-b border-zinc-800 text-[10px] uppercase text-zinc-400 tracking-wider">
                <tr>
                  <th class="p-3">Date</th>
                  <th class="p-3">Ticker</th>
                  <th class="p-3">Action</th>
                  <th class="p-3">Modèle / Provider</th>
                  <th class="p-3 text-right">Input T.</th>
                  <th class="p-3 text-right">Output T.</th>
                  <th class="p-3 text-right">Coût Est. ($)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-800/50">
                <tr
                  v-for="log in usageData.logs"
                  :key="log.id"
                  class="hover:bg-zinc-900/60 transition"
                >
                  <td class="p-3 text-zinc-400 whitespace-nowrap">{{ formatDateTime(log.created_at) }}</td>
                  <td class="p-3 font-bold text-white whitespace-nowrap">
                    <span v-if="log.ticker" class="text-emerald-400 font-mono">{{ log.ticker }}</span>
                    <span v-else class="text-zinc-600">-</span>
                  </td>
                  <td class="p-3 text-zinc-300 font-sans text-[11px] whitespace-nowrap">{{ formatActionName(log.call_type) }}</td>
                  <td class="p-3 font-mono text-[11px] whitespace-nowrap">
                    <span class="text-zinc-200 truncate max-w-[180px] block" :title="log.model">{{ log.model }}</span>
                  </td>
                  <td class="p-3 text-right text-zinc-400 font-mono whitespace-nowrap">{{ log.prompt_tokens.toLocaleString('fr-FR') }}</td>
                  <td class="p-3 text-right text-zinc-400 font-mono whitespace-nowrap">{{ log.completion_tokens.toLocaleString('fr-FR') }}</td>
                  <td class="p-3 text-right font-bold font-mono whitespace-nowrap" :class="log.cost_usd > 0 ? 'text-emerald-400' : 'text-zinc-500'">
                    {{ formatCost(log.cost_usd) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination Footer -->
          <div class="flex items-center justify-between border-t border-zinc-800/80 pt-3 shrink-0 text-xs">
            <span class="text-zinc-500">
              Page {{ usageData?.page || 1 }} sur {{ usageData?.totalPages || 1 }} ({{ usageData?.totalLogs || 0 }} entrées)
            </span>

            <div class="flex items-center gap-2">
              <button
                type="button"
                class="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 transition cursor-pointer"
                :disabled="currentPage <= 1 || isLoading"
                @click="currentPage--"
              >
                Précédent
              </button>

              <button
                type="button"
                class="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 transition cursor-pointer"
                :disabled="currentPage >= (usageData?.totalPages || 1) || isLoading"
                @click="currentPage++"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
