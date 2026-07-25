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

const toast = useToast()

const cancelAnalysis = () => {
  if (currentAbortController) {
    currentAbortController.abort()
    currentAbortController = null
  }
  isAnalyzing.value = false
  if (elapsedTimer) clearInterval(elapsedTimer)
  toast.info('Analyse annulée par l\'utilisateur.')
}

import { getApiHeaders } from '~/utils/apiHeaders'

const handleRunAnalysis = async (payload: { rawReport: string; modelId?: string } | string, modelArg?: string) => {
  const rawReport = typeof payload === 'string' ? payload : payload.rawReport
  const model = typeof payload === 'string' ? modelArg : payload.modelId

  if (!rawReport?.trim()) return
  isAnalyzing.value = true
  elapsedSeconds.value = 0

  elapsedTimer = setInterval(() => {
    elapsedSeconds.value++
  }, 1000)

  currentAbortController = new AbortController()

  try {
    const result = await $fetch<QualitativeData>(`/api/stock/${encodeURIComponent(props.ticker)}/qualitative`, {
      method: 'POST',
      headers: getApiHeaders(),
      body: {
        raw_report: rawReport,
        model,
      },
      signal: currentAbortController.signal,
    })
    data.value = result
    isAiModalOpen.value = false
    toast.success('Analyse qualitative institutionnelle complétée avec succès !')
  } catch (err: any) {
    if (err.name === 'AbortError' || err.message?.includes('aborted') || err.message?.includes('cancel')) {
      toast.info('Analyse annulée.')
    } else {
      console.error('Erreur analyse qualitative:', err)
      const msg = err?.data?.statusMessage ||
        err?.response?._data?.statusMessage ||
        err?.data?.message ||
        err?.message ||
        'Erreur lors de l\'analyse du rapport.'
      toast.error(msg)
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
      class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-md p-4"
    >
      <div class="w-full max-w-sm rounded-2xl border border-emerald-500/40 bg-zinc-900 p-8 shadow-2xl space-y-6 text-center">
        <!-- Spinner Animé -->
        <div class="relative mx-auto h-16 w-16 flex items-center justify-center">
          <div class="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin"></div>
        </div>

        <div class="space-y-1.5 font-mono">
          <h3 class="text-base font-bold text-white tracking-tight">Analyse LLM en cours...</h3>
          <p class="text-xs text-emerald-400 font-bold">
            {{ ticker }} — {{ stockName }}
          </p>
          <div class="text-xs text-zinc-400 pt-1">
            Temps écoulé : <span class="text-white font-bold">{{ elapsedSeconds }}s</span>
          </div>
        </div>

        <!-- Bouton Annulation -->
        <button
          type="button"
          class="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-950/40 px-4 py-2.5 text-xs font-bold text-rose-300 hover:bg-rose-900/60 hover:text-white transition shadow cursor-pointer font-mono"
          @click="cancelAnalysis"
        >
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Annuler l'analyse</span>
        </button>
      </div>
    </div>

    <!-- Header Block: Score Global + Actions -->
    <div class="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl backdrop-blur space-y-6">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-bold tracking-tight text-white font-mono uppercase">Deep Research Qualitative</h2>
          </div>
          <p class="text-xs text-zinc-400 mt-1">
            Analyse institutionnelle en 4 briques basée sur la grille Rubric (0.0 à 10.0).
          </p>
        </div>

        <!-- Boutons d'Action -->
        <div class="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition shadow font-mono"
            @click="isAiModalOpen = true"
          >
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{{ data ? 'Mettre à jour avec l\'IA' : 'Enrichir avec l\'IA' }}</span>
          </button>
        </div>
      </div>

      <!-- Zone de Synthèse du Score Global (si analysé) -->
      <div v-if="data && activeTierConfig" class="pt-4 border-t border-zinc-800/80 space-y-4 font-mono">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
          <div class="flex items-center gap-4">
            <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-950 font-mono text-2xl font-black text-emerald-400 border border-zinc-800 shadow-inner">
              {{ data.quality_score }}
            </div>
            <div>
              <div class="text-xs text-zinc-400 font-medium">StockPick Quality Score</div>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-sm font-bold text-white font-sans">{{ activeTierConfig.label }}</span>
                <span class="rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono px-2 py-0.5 font-bold">
                  TIER {{ data.tier }}
                </span>
              </div>
            </div>
          </div>

          <div class="text-xs text-zinc-500 font-mono">
            Mis à jour le {{ new Date(data.analyzed_at || Date.now()).toLocaleDateString() }}
          </div>
        </div>

        <!-- 4 Sub-scores Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            v-for="key in brickOrder"
            :key="key"
            class="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 text-center space-y-1"
          >
            <div class="text-[10px] text-zinc-400 font-medium truncate flex items-center justify-center gap-1 font-sans">
              <span>{{ BRICK_META[key].label.split('&')[0] }}</span>
            </div>
            <div class="text-base font-mono font-black text-white">
              {{ Math.round(data.evaluations[key]?.score ?? 5) }}/10
            </div>
            <div class="text-[10px] font-semibold text-zinc-500 font-mono">
              Poids : {{ (BRICK_WEIGHTS[key] * 100) }}%
            </div>
          </div>
        </div>
      </div>

      <!-- État vide (si non encore analysé) -->
      <div v-else class="pt-6 border-t border-zinc-800/80 text-center py-8 space-y-3 font-mono">
        <h3 class="text-xs font-bold text-white uppercase tracking-wider">Aucune étude qualitative enregistrée</h3>
        <p class="text-xs text-zinc-400 max-w-md mx-auto font-sans">
          Démarrez l'enrichissement IA pour extraire la grille d'analyse institutionnelle (Moat, Croissance, Santé financière, Management) et calculer le Quality Score.
        </p>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition shadow font-mono"
          @click="isAiModalOpen = true"
        >
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Lancer l'Enrichissement Qualitative (IA)</span>
        </button>
      </div>
    </div>

    <!-- Grille des 4 Briques Qualitatives (si analysé) -->
    <div v-if="data" class="grid gap-6 md:grid-cols-2">
      <div
        v-for="key in brickOrder"
        :key="key"
        class="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 space-y-4 shadow-xl backdrop-blur flex flex-col justify-between"
      >
        <div class="space-y-4">
          <!-- Brick Title & Header -->
          <div class="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <h3 class="text-sm font-bold text-white font-mono uppercase tracking-wider">{{ BRICK_META[key].label }}</h3>
              <p class="text-[11px] text-zinc-400 font-mono">Poids dans le score : {{ (BRICK_WEIGHTS[key] * 100) }}%</p>
            </div>
            <div class="flex items-center gap-1.5 rounded-lg bg-zinc-900 border border-zinc-800 px-2.5 py-1 font-mono">
              <span class="font-mono text-sm font-black text-emerald-400">{{ Math.round(data.evaluations[key]?.score ?? 5) }}</span>
              <span class="text-zinc-500 text-[10px]">/10</span>
            </div>
          </div>

          <!-- Synthèse Théorique -->
          <p class="text-xs text-zinc-300 leading-relaxed font-sans">
            {{ data.evaluations[key]?.summary || data.evaluations[key]?.justification }}
          </p>

          <!-- Bullet Points Takeaways -->
          <div v-if="(data.evaluations[key]?.takeaways || data.evaluations[key]?.key_takeaways)?.length" class="space-y-2 pt-2 border-t border-zinc-800/60 font-mono">
            <div class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Points Clés & Preuves :</div>
            <ul class="space-y-2 text-xs">
              <li
                v-for="(t, idx) in (data.evaluations[key]?.takeaways || data.evaluations[key]?.key_takeaways || [])"
                :key="idx"
                class="flex items-start gap-2 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80"
              >
                <span
                  class="flex-shrink-0 text-xs font-mono font-bold mt-0.5"
                  :class="isPositiveTakeaway(t) ? 'text-emerald-400' : isNegativeTakeaway(t) ? 'text-rose-400' : 'text-sky-400'"
                >
                  {{ isPositiveTakeaway(t) ? '[+]' : isNegativeTakeaway(t) ? '[-]' : '[i]' }}
                </span>
                <span
                  class="text-zinc-300 leading-relaxed font-sans"
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

