<script setup lang="ts">
import type { QualitativeData, BrickKey } from '~/types/database.types'
import {
  BRICK_META,
  BRICK_WEIGHTS,
  getTierConfig,
  getGradientLabel,
  getGradientColor,
  generateDeepResearchPrompt,
} from '~/utils/qualitative'

const props = defineProps<{
  ticker: string
  stockName: string
  stockId: string
}>()

const isLoading = ref(true)
const isAnalyzing = ref(false)
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const copyFeedback = ref(false)

const showImportDrawer = ref(false)
const rawReportInput = ref('')
const selectedModel = ref<'deepseek-v4-flash' | 'qwen/qwen3.7-plus'>('deepseek-v4-flash')


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
  if (stepTimer) clearInterval(stepTimer)
  if (elapsedTimer) clearInterval(elapsedTimer)
  if (currentAbortController) currentAbortController.abort()
})

const copyPrompt = async () => {
  const promptText = generateDeepResearchPrompt(props.ticker, props.stockName)
  try {
    await navigator.clipboard.writeText(promptText)
    copyFeedback.value = true
    setTimeout(() => { copyFeedback.value = false }, 3000)
  } catch {
    alert('Impossible de copier automatiquement dans le presse-papier.')
  }
}

const cancelAnalysis = () => {
  if (currentAbortController) {
    currentAbortController.abort()
    currentAbortController = null
  }
  isAnalyzing.value = false
  if (elapsedTimer) clearInterval(elapsedTimer)
  errorMessage.value = 'Analyse annulée par l\'utilisateur.'
}

const runAnalysis = async () => {
  if (!rawReportInput.value.trim()) return
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
        raw_report: rawReportInput.value,
        model: selectedModel.value,
      },

      signal: currentAbortController.signal,
    })
    data.value = result
    showImportDrawer.value = false
    rawReportInput.value = ''
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
  // Remplacer [Nom Source](url) par un vrai lien cliquable HTML
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
          <h3 class="text-lg font-bold text-white tracking-tight">Analyse DeepSeek Flash en cours...</h3>
          <p class="text-xs text-emerald-400 font-mono font-bold">
            {{ ticker }} — {{ stockName }}
          </p>
          <div class="text-xs text-gray-400 font-mono pt-1">
            Temps écoulé : <span class="text-white font-bold">{{ elapsedSeconds }}s</span>
          </div>
        </div>

        <!-- Bouton Annulation HTTP AbortController -->
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
            class="inline-flex items-center gap-2 rounded-xl bg-gray-900 border border-gray-800 px-4 py-2.5 text-xs font-bold text-gray-200 hover:bg-gray-800 hover:text-white transition shadow-md"
            @click="copyPrompt"
          >
            <span>📋</span>
            <span>{{ copyFeedback ? 'Prompt Copié !' : 'Copier Prompt Deep Research' }}</span>
          </button>

          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 border border-emerald-500/50 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition shadow-md"
            @click="showImportDrawer = !showImportDrawer"
          >
            <span>📥</span>
            <span>{{ data ? 'Mettre à jour le Rapport' : 'Importer Rapport' }}</span>
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
            Dernière analyse : {{ new Date(data.analyzed_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
          </div>
        </div>

        <!-- 4 Mini Gauges / Badges -->
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
    </div>

    <!-- Drawer d'Importation / Saisie du Rapport -->
    <div v-if="showImportDrawer" class="rounded-2xl border border-emerald-500/30 bg-gray-950 p-6 space-y-4 shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-white flex items-center gap-2">
          <span>📥</span>
          <span>Coller le rapport Deep Research brut</span>
        </h3>
        <button
          type="button"
          class="text-xs text-gray-400 hover:text-white"
          @click="showImportDrawer = false"
        >
          ✕ Fermer
        </button>
      </div>

      <!-- Sélecteur de Modèle AI -->
      <div class="space-y-1.5">
        <label class="text-[11px] font-bold text-gray-300 uppercase tracking-wider">Modèle IA d'Analyse :</label>
        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            class="flex items-center justify-center gap-2 rounded-xl p-3 text-xs font-bold border transition cursor-pointer"
            :class="selectedModel === 'deepseek-v4-flash'
              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400 shadow-md'
              : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'"
            @click="selectedModel = 'deepseek-v4-flash'"
          >
            <span>⚡</span>
            <span>DeepSeek V4 Flash</span>
          </button>

          <button
            type="button"
            class="flex items-center justify-center gap-2 rounded-xl p-3 text-xs font-bold border transition cursor-pointer"
            :class="selectedModel === 'qwen/qwen3.7-plus'
              ? 'bg-purple-950/80 border-purple-500 text-purple-300 shadow-md'
              : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'"
            @click="selectedModel = 'qwen/qwen3.7-plus'"
          >
            <span>🌐</span>
            <span>Qwen 3.7 Plus (OpenRouter)</span>
          </button>

        </div>
      </div>

      <p class="text-xs text-gray-400">
        Collez ici la réponse textuelle brute issue de ChatGPT, Claude ou Gemini générée avec le prompt standardisé.
      </p>


      <textarea
        v-model="rawReportInput"
        rows="10"
        class="w-full rounded-xl border border-gray-800 bg-gray-900 p-4 text-xs text-gray-200 focus:border-emerald-500 focus:outline-none font-mono"
        placeholder="Collez le texte brut du rapport ici..."
      ></textarea>

      <div class="flex justify-end gap-3">
        <button
          type="button"
          class="rounded-xl border border-gray-800 px-4 py-2 text-xs text-gray-400 hover:text-white"
          @click="showImportDrawer = false"
        >
          Annuler
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition shadow-md disabled:opacity-50"
          :disabled="isAnalyzing || !rawReportInput.trim()"
          @click="runAnalysis"
        >
          <span v-if="isAnalyzing">⚙️ Analyse en cours...</span>
          <span v-else>🚀 Lancer l'Analyse Qualitative</span>
        </button>
      </div>
    </div>

    <!-- State: Chargement initial -->
    <div v-if="isLoading" class="py-12 text-center text-xs text-gray-400">
      Chargement de l'analyse qualitative...
    </div>

    <!-- Empty State -->
    <div v-else-if="!data" class="rounded-2xl border border-dashed border-gray-800 bg-gray-950/40 p-12 text-center space-y-4">
      <div class="text-4xl">📄</div>
      <div class="text-sm font-semibold text-gray-300">Aucune analyse qualitative pour {{ ticker }}</div>
      <p class="text-xs text-gray-500 max-w-md mx-auto">
        Cliquez sur "Copier Prompt Deep Research", générez le rapport dans votre Web UI habituelle (ChatGPT, Claude, Gemini), puis collez le résultat via le bouton "Importer Rapport".
      </p>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition"
        @click="showImportDrawer = true"
      >
        <span>📥 Importer mon premier rapport</span>
      </button>
    </div>

    <!-- Content State: 4 Cartes de Briques avec Paragraphes Dialectiques & Points Clés -->
    <div v-else class="space-y-6">
      <div
        v-for="key in brickOrder"
        :key="key"
        class="rounded-2xl border border-gray-800 bg-gray-950/70 p-6 space-y-5 shadow-xl backdrop-blur transition hover:border-gray-700/80"
      >
        <!-- En-tête Brique -->
        <div class="flex items-start justify-between gap-4 flex-wrap pb-3 border-b border-gray-800/80">
          <div class="flex items-center gap-3">
            <span class="text-2xl">{{ BRICK_META[key].icon }}</span>
            <div>
              <h3 class="text-base font-bold text-white">{{ BRICK_META[key].label }}</h3>
              <span class="text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                Poids dans le score : {{ (BRICK_WEIGHTS[key] * 100) }}%
              </span>
            </div>
          </div>

          <!-- Badge Score Brique /10 -->
          <div class="flex items-center gap-3">
            <span class="text-xs font-semibold" :class="getGradientColor(data.evaluations[key]?.score ?? 5.0)">
              {{ getGradientLabel(data.evaluations[key]?.score ?? 5.0) }}
            </span>
            <span class="rounded-xl bg-gray-900 border border-gray-800 px-3 py-1 text-sm font-mono font-black text-emerald-400">
              {{ Math.round(data.evaluations[key]?.score ?? 5) }}/10

            </span>
          </div>
        </div>

        <!-- Key Takeaways (Points Clés Saillants) -->
        <div v-if="data.evaluations[key]?.key_takeaways?.length" class="space-y-2">
          <div class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Faits Clés Saillants</div>
          <ul class="space-y-2 pl-1">
            <li
              v-for="(takeaway, idx) in data.evaluations[key].key_takeaways"
              :key="idx"
              class="text-xs text-gray-200 flex items-start gap-2.5"
            >
              <!-- Pastilles de Couleur -->
              <span
                v-if="isPositiveTakeaway(takeaway)"
                class="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] shrink-0 mt-1.5"
                title="Fait Positif"
              ></span>
              <span
                v-else-if="isNegativeTakeaway(takeaway)"
                class="h-2.5 w-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] shrink-0 mt-1.5"
                title="Fait Négatif / Risque"
              ></span>
              <span v-else class="h-2 w-2 rounded-full bg-gray-500 shrink-0 mt-1.5"></span>


              <!-- Texte avec liens cliquables 🔗 -->
              <span class="leading-relaxed" v-html="formatTakeawayHtml(takeaway)"></span>
            </li>
          </ul>
        </div>


        <!-- Paragraphe d'Analyse Institutionnel -->
        <div class="rounded-xl border border-gray-800/80 bg-gray-900/60 p-4 space-y-2">
          <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <span>⚖️ Synthèse Dialectique</span>
          </div>
          <p class="text-xs text-gray-200 leading-relaxed font-medium whitespace-pre-line">
            {{ data.evaluations[key]?.justification || 'Pas d\'analyse disponible pour cette brique.' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
