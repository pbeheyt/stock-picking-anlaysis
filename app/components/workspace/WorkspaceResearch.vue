<script setup lang="ts">
import type { QualitativeData, BrickKey } from '~/types/database.types'
import {
  BRICK_META,
  BRICK_WEIGHTS,
  getTierConfig,
  generateDeepResearchPrompt,
} from '~/utils/qualitative'
import AIResearchModal from '~/components/workspace/AIResearchModal.vue'

const props = defineProps<{
  ticker: string
  stockName: string
  stockId: string
}>()

const isLoading = ref(true)
const isAnalyzing = ref(false)
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const isAiModalOpen = ref(false)

const data = ref<QualitativeData | null>(null)

// Animation & Timer
const elapsedSeconds = ref(0)
let elapsedTimer: NodeJS.Timeout | null = null
let currentAbortController: AbortController | null = null

const brickOrder: BrickKey[] = ['moat', 'growth', 'financials', 'management']

const fetchQualitativeData = async () => {
  isLoading.value = true
  errorMessage.value = null
  try {
    const res = await $fetch<QualitativeData | null>(`/api/stock/${encodeURIComponent(props.ticker)}/qualitative`)
    data.value = res
  } catch (err: any) {
    console.error('Erreur chargement qualitative_data:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchQualitativeData()
})

onUnmounted(() => {
  if (elapsedTimer) clearInterval(elapsedTimer)
  if (currentAbortController) currentAbortController.abort()
})

const promptText = computed(() => generateDeepResearchPrompt(props.ticker, props.stockName))

const cancelAnalysis = () => {
  if (currentAbortController) {
    currentAbortController.abort()
    currentAbortController = null
  }
  isAnalyzing.value = false
  if (elapsedTimer) clearInterval(elapsedTimer)
  errorMessage.value = 'Analyse annulée par l\'utilisateur.'
}

const handleRunAnalysis = async (rawReport: string, model: string) => {
  if (!rawReport.trim()) return
  isAnalyzing.value = true
  errorMessage.value = null
  successMessage.value = null
  elapsedSeconds.value = 0

  elapsedTimer = setInterval(() => {
    elapsedSeconds.value++
  }, 1000)

  currentAbortController = new AbortController()

  try {
    const result = await $fetch<QualitativeData>(`/api/stock/${encodeURIComponent(props.ticker)}/qualitative`, {
      method: 'POST',
      body: {
        raw_report: rawReport,
        model,
      },
      signal: currentAbortController.signal,
    })
    data.value = result
    isAiModalOpen.value = false
    successMessage.value = 'Analyse qualitative institutionnelle complétée avec succès.'
    setTimeout(() => { successMessage.value = null }, 5000)
  } catch (err: any) {
    if (err.name === 'AbortError' || err.message?.includes('aborted') || err.message?.includes('cancel')) {
      errorMessage.value = 'Analyse annulée.'
    } else {
      console.error('Erreur analyse qualitative:', err)
      errorMessage.value =
        err?.data?.statusMessage ||
        err?.response?._data?.statusMessage ||
        err?.data?.message ||
        err?.message ||
        'Erreur lors de l\'analyse du rapport.'
    }
  } finally {
    isAnalyzing.value = false
    currentAbortController = null
    if (elapsedTimer) clearInterval(elapsedTimer)
  }
}

const activeTierConfig = computed(() => {
  if (!data.value) return null
  return getTierConfig(data.value.tier)
})

const isPositiveTakeaway = (text: string) => text.trim().startsWith('[+]')
const isNegativeTakeaway = (text: string) => text.trim().startsWith('[-]')

const formatTakeawayHtml = (text: string) => {
  let str = text.replace(/^\[\+\]\s*/, '').replace(/^\[-\]\s*/, '').trim()
  str = str.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-0.5 text-emerald-400 hover:underline font-mono text-[11px] ml-1 font-semibold">🔗 $1</a>'
  )
  return str
}
</script>

<template>
  <div class="space-y-8 relative">
    <!-- Overlay de Chargement Épuré & Bouton Annuler -->
    <div
      v-if="isAnalyzing"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/90 backdrop-blur-md p-4"
    >
      <div class="w-full max-w-sm rounded-2xl border border-emerald-500/40 bg-gray-900 p-8 shadow-2xl space-y-6 text-center">
        <!-- Spinner Animé -->
        <div class="relative mx-auto h-20 w-20 flex items-center justify-center">
          <div class="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin"></div>
          <span class="text-3xl animate-bounce">⚡</span>
        </div>

        <div class="space-y-1.5">
          <h3 class="text-lg font-bold text-white tracking-tight">Analyse LLM en cours...</h3>
          <p class="text-xs text-emerald-400 font-mono font-bold">
            {{ ticker }} — {{ stockName }}
          </p>
          <div class="text-xs text-gray-400 font-mono pt-1">
            Temps écoulé : <span class="text-white font-bold">{{ elapsedSeconds }}s</span>
          </div>
        </div>

        <!-- Bouton Annulation -->
        <button
          type="button"
          class="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-950/40 px-4 py-2.5 text-xs font-bold text-rose-300 hover:bg-rose-900/60 hover:text-white transition shadow-md cursor-pointer"
          @click="cancelAnalysis"
        >
          <span>🛑</span>
          <span>Annuler l'analyse</span>
        </button>
      </div>
    </div>

    <!-- Messages & Alerts -->
    <div v-if="successMessage" class="rounded-xl border border-emerald-500/40 bg-emerald-950/60 p-4 text-xs font-semibold text-emerald-300">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="rounded-xl border border-rose-500/40 bg-rose-950/60 p-4 text-xs font-semibold text-rose-300">
      {{ errorMessage }}
    </div>

    <!-- Header Block: Score Global + Actions -->
    <div class="rounded-2xl border border-gray-800 bg-gray-950/80 p-6 shadow-2xl backdrop-blur space-y-6">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div class="flex items-center gap-3">
            <span class="text-2xl">🧠</span>
            <h2 class="text-xl font-bold tracking-tight text-white">Deep Research Qualitative</h2>
          </div>
          <p class="text-xs text-gray-400 mt-1">
            Analyse institutionnelle en 4 briques basée sur la grille Rubric (0.0 à 10.0).
          </p>
        </div>

        <!-- Boutons d'Action -->
        <div class="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-xs font-bold text-white hover:from-emerald-500 hover:to-teal-500 transition shadow-md"
            @click="isAiModalOpen = true"
          >
            <span>✨</span>
            <span>{{ data ? 'Mettre à jour avec l\'IA' : 'Enrichir avec l\'IA' }}</span>
          </button>
        </div>
      </div>

      <!-- Zone de Synthèse du Score Global (si analysé) -->
      <div v-if="data && activeTierConfig" class="pt-4 border-t border-gray-800/80 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-900/60 p-4 rounded-xl border border-gray-800">
          <div class="flex items-center gap-4">
            <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-950 font-mono text-2xl font-black text-emerald-400 border border-gray-800 shadow-inner">
              {{ data.quality_score }}
            </div>
            <div>
              <div class="text-xs text-gray-400 font-medium">StockPick Quality Score</div>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-sm font-bold text-white">{{ activeTierConfig.label }}</span>
                <span class="rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono px-2 py-0.5 font-bold">
                  TIER {{ data.tier }}
                </span>
              </div>
            </div>
          </div>

          <div class="text-xs text-gray-500 font-mono">
            Mis à jour le {{ new Date(data.analyzed_at || Date.now()).toLocaleDateString() }}
          </div>
        </div>

        <!-- 4 Sub-scores Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            v-for="key in brickOrder"
            :key="key"
            class="p-3 bg-gray-900/80 rounded-xl border border-gray-800 text-center space-y-1"
          >
            <div class="text-[10px] text-gray-400 font-medium truncate flex items-center justify-center gap-1">
              <span>{{ BRICK_META[key].icon }}</span>
              <span>{{ BRICK_META[key].label.split('&')[0] }}</span>
            </div>
            <div class="text-base font-mono font-black text-white">
              {{ Math.round(data.evaluations[key]?.score ?? 5) }}/10
            </div>
            <div class="text-[10px] font-semibold text-gray-500">
              Poids : {{ (BRICK_WEIGHTS[key] * 100) }}%
            </div>
          </div>
        </div>
      </div>

      <!-- État vide (si non encore analysé) -->
      <div v-else class="pt-6 border-t border-gray-800/80 text-center py-8 space-y-3">
        <div class="text-3xl">📋</div>
        <h3 class="text-sm font-bold text-white">Aucune étude qualitative enregistrée</h3>
        <p class="text-xs text-gray-400 max-w-md mx-auto">
          Démarrez l'enrichissement IA pour extraire la grille d'analyse institutionnelle (Moat, Croissance, Santé financière, Management) et calculer le Quality Score.
        </p>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition shadow"
          @click="isAiModalOpen = true"
        >
          <span>✨</span>
          <span>Lancer l'Enrichissement Qualitative (IA)</span>
        </button>
      </div>
    </div>

    <!-- Grille des 4 Briques Qualitatives (si analysé) -->
    <div v-if="data" class="grid gap-6 md:grid-cols-2">
      <div
        v-for="key in brickOrder"
        :key="key"
        class="rounded-2xl border border-gray-800 bg-gray-950/70 p-6 space-y-4 shadow-xl backdrop-blur flex flex-col justify-between"
      >
        <div class="space-y-4">
          <!-- Brick Title & Header -->
          <div class="flex items-center justify-between border-b border-gray-800 pb-3">
            <div class="flex items-center gap-2.5">
              <span class="text-xl">{{ BRICK_META[key].icon }}</span>
              <div>
                <h3 class="text-sm font-bold text-white">{{ BRICK_META[key].label }}</h3>
                <p class="text-[11px] text-gray-400">Poids dans le score : {{ (BRICK_WEIGHTS[key] * 100) }}%</p>
              </div>
            </div>
            <div class="flex items-center gap-1.5 rounded-lg bg-gray-900 border border-gray-800 px-2.5 py-1">
              <span class="font-mono text-sm font-black text-emerald-400">{{ Math.round(data.evaluations[key]?.score ?? 5) }}</span>
              <span class="text-gray-500 text-[10px]">/10</span>
            </div>
          </div>

          <!-- Synthèse Théorique -->
          <p class="text-xs text-gray-300 leading-relaxed font-sans">
            {{ data.evaluations[key]?.summary }}
          </p>

          <!-- Bullet Points Takeaways -->
          <div v-if="data.evaluations[key]?.takeaways?.length" class="space-y-2 pt-2 border-t border-gray-800/60">
            <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Points Clés & Preuves :</div>
            <ul class="space-y-2 text-xs">
              <li
                v-for="(t, idx) in data.evaluations[key].takeaways"
                :key="idx"
                class="flex items-start gap-2 p-2 rounded-lg bg-gray-900/40 border border-gray-800/40"
              >
                <span
                  class="flex-shrink-0 text-sm mt-0.5"
                  :class="isPositiveTakeaway(t) ? 'text-emerald-400' : isNegativeTakeaway(t) ? 'text-rose-400' : 'text-sky-400'"
                >
                  {{ isPositiveTakeaway(t) ? '✓' : isNegativeTakeaway(t) ? '⚠️' : 'ℹ' }}
                </span>
                <span
                  class="text-gray-300 leading-relaxed font-sans"
                  v-html="formatTakeawayHtml(t)"
                ></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Workflow IA Réutilisable -->
    <AIResearchModal
      :is-open="isAiModalOpen"
      :ticker="ticker"
      :stock-name="stockName"
      title="Analyse Qualitative Institutionnelle"
      subtitle="Extrayez la grille de conviction en 4 Briques (Moat, Management, Financier, Croissance) via DeepSeek."
      :prompt-text="promptText"
      :is-analyzing="isAnalyzing"
      :error-message="errorMessage"
      @close="isAiModalOpen = false"
      @analyze="handleRunAnalysis"
      @cancel="cancelAnalysis"
    />
  </div>
</template>
