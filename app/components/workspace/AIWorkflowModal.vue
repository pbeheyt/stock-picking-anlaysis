<script setup lang="ts">
import {
  fetchApprovedModels,
  filterModelsForActiveKeys,
  type AIModelOption,
} from '~/utils/aiModels'

const props = withDefaults(defineProps<{
  isOpen: boolean
  ticker: string
  stockName?: string
  promptText: string
  isAnalyzing?: boolean
  errorMessage?: string | null
  title?: string
  subtitle?: string
}>(), {
  stockName: '',
  isAnalyzing: false,
  errorMessage: null,
  title: '',
  subtitle: 'Extrayez automatiquement les projections quantitatives depuis un prompt ou rapport d\'IA.',
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'analyze', payload: { rawReport: string; modelId: string }): void
  (e: 'cancel'): void
}>()

const rawReportInput = ref('')
const copyFeedback = ref(false)
const selectedModel = ref<string>('')
const elapsedSeconds = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const availableModels = ref<AIModelOption[]>([])
const isLoadingModels = ref(false)

const refreshAvailableModels = async () => {
  if (import.meta.client) {
    isLoadingModels.value = true
    const dbModels = await fetchApprovedModels()
    const activeModels = filterModelsForActiveKeys(dbModels)
    availableModels.value = activeModels

    if (availableModels.value.length > 0) {
      if (!availableModels.value.some(m => m.id === selectedModel.value)) {
        selectedModel.value = availableModels.value[0].id
      }
    } else {
      selectedModel.value = ''
    }
    isLoadingModels.value = false
  }
}

onMounted(() => {
  refreshAvailableModels()
})

watch(() => props.isOpen, (open) => {
  if (open) {
    refreshAvailableModels()
  }
})

watch(() => props.isAnalyzing, (analyzing) => {
  if (analyzing) {
    elapsedSeconds.value = 0
    if (timer) clearInterval(timer)
    timer = setInterval(() => {
      elapsedSeconds.value++
    }, 1000)
  } else {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const copyPrompt = async () => {
  try {
    await navigator.clipboard.writeText(props.promptText)
    copyFeedback.value = true
    setTimeout(() => {
      copyFeedback.value = false
    }, 2500)
  } catch (err) {
    console.error('Erreur lors de la copie :', err)
  }
}

const handleRunAnalysis = () => {
  if (!rawReportInput.value.trim() || !selectedModel.value) return
  emit('analyze', {
    rawReport: rawReportInput.value.trim(),
    modelId: selectedModel.value,
  })
}

// Séparation par provider pour l'affichage optgroup
const deepseekModels = computed(() => availableModels.value.filter(m => m.provider === 'DeepSeek'))
const openrouterModels = computed(() => availableModels.value.filter(m => m.provider === 'OpenRouter'))
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
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm overflow-y-auto"
        @click.self="emit('close')"
      >
        <div class="relative w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl space-y-6 overflow-hidden">

          <!-- OVERLAY DE CHARGEMENT ANIMÉ -->
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-if="isAnalyzing"
              class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950/95 backdrop-blur-md p-6 text-center space-y-5"
            >
              <div class="relative h-16 w-16 flex items-center justify-center">
                <div class="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin"></div>
                <div class="absolute inset-2 rounded-full border-2 border-sky-500/20 border-b-sky-400 animate-spin" style="animation-direction: reverse; animation-duration: 1.5s;"></div>
              </div>

              <div class="space-y-1.5 font-mono">
                <h4 class="text-sm font-bold text-white tracking-tight">Analyse LLM Deep Research en cours...</h4>
                <p class="text-xs text-emerald-400 font-bold">
                  {{ ticker }} {{ stockName ? `— ${stockName}` : '' }}
                </p>
                <p class="text-xs text-zinc-400 pt-1">
                  Temps écoulé : <span class="text-white font-bold text-xs">{{ elapsedSeconds }}s</span>
                </p>
              </div>

              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-950/40 px-5 py-2 text-xs font-bold text-rose-300 hover:bg-rose-900/60 hover:text-white transition shadow cursor-pointer font-mono"
                @click="emit('cancel')"
              >
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Annuler l'analyse</span>
              </button>
            </div>
          </Transition>

          <!-- Modal Header -->
          <div class="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div class="flex items-center gap-2.5">
              <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-white font-mono tracking-tight">{{ title || `Enrichir avec l'IA — ${ticker}` }}</h3>
                <p class="text-xs text-zinc-400">{{ subtitle }}</p>
              </div>
            </div>
            <button
              type="button"
              class="text-zinc-400 hover:text-white transition p-1.5 rounded-lg hover:bg-zinc-900"
              @click="emit('close')"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Moteur d'analyse LLM (Dropdown groupé par Provider) -->
          <div class="flex items-center justify-between bg-zinc-900/60 p-3 rounded-xl border border-zinc-800 text-xs font-mono">
            <span class="text-zinc-400 font-medium">Modèle d'analyse LLM :</span>

            <div v-if="isLoadingModels" class="text-zinc-500 text-xs">
              Chargement...
            </div>

            <div v-else-if="availableModels.length === 0" class="text-rose-400 text-xs font-semibold">
              Aucun modèle approuvé. Ajoutez un modèle dans les Paramètres (⚙️).
            </div>

            <select
              v-else
              v-model="selectedModel"
              class="rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none cursor-pointer font-mono font-semibold max-w-[280px] truncate"
            >
              <optgroup v-if="deepseekModels.length" label="DeepSeek">
                <option
                  v-for="m in deepseekModels"
                  :key="m.id"
                  :value="m.id"
                >
                  {{ m.id }}
                </option>
              </optgroup>

              <optgroup v-if="openrouterModels.length" label="OpenRouter AI">
                <option
                  v-for="m in openrouterModels"
                  :key="m.id"
                  :value="m.id"
                >
                  {{ m.id }}
                </option>
              </optgroup>
            </select>
          </div>

          <!-- Stepper 2 colonnes -->
          <div class="grid gap-4 md:grid-cols-2">
            <!-- Étape 1 : Prompt -->
            <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-3 flex flex-col justify-between">
              <div>
                <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 font-mono">Étape 1 : Copier le Prompt</div>
                <p class="text-xs text-zinc-400">Copiez ce prompt optimisé pour demander aux IA d'analyser {{ ticker }}.</p>
              </div>
              <button
                type="button"
                class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition shadow font-mono"
                @click="copyPrompt"
              >
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>{{ copyFeedback ? 'Prompt Copié !' : 'Copier le Prompt' }}</span>
              </button>
            </div>

            <!-- Étape 2 : Coller & Lancer -->
            <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-3 flex flex-col justify-between">
              <div>
                <div class="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1 font-mono">Étape 2 : Coller le Rapport</div>
                <textarea
                  v-model="rawReportInput"
                  rows="3"
                  placeholder="Collez ici le résultat de votre Deep Research..."
                  class="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-2.5 text-xs font-mono text-zinc-200 focus:border-sky-500 focus:outline-none resize-none"
                ></textarea>
              </div>
              <button
                type="button"
                class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-3 py-2 text-xs font-bold text-white hover:bg-sky-500 transition shadow disabled:opacity-50 font-mono"
                :disabled="!rawReportInput.trim() || !selectedModel || isAnalyzing"
                @click="handleRunAnalysis"
              >
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Extraire avec l'IA</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
