<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
  ticker: string
  stockName: string
  promptText: string
  isAnalyzing: boolean
  errorMessage?: string | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'analyze', rawReport: string, model: string): void
  (e: 'cancel'): void
}>()

const copyFeedback = ref(false)
const rawReportInput = ref('')
const selectedModel = ref<string>('deepseek-v4-flash')

const copyPrompt = async () => {
  try {
    await navigator.clipboard.writeText(props.promptText)
    copyFeedback.value = true
    setTimeout(() => { copyFeedback.value = false }, 3000)
  } catch {
    alert('Impossible de copier automatiquement dans le presse-papier.')
  }
}

const handleRunAnalysis = () => {
  if (!rawReportInput.value.trim()) return
  emit('analyze', rawReportInput.value, selectedModel.value)
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
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm overflow-y-auto"
        @click.self="emit('close')"
      >
        <div class="relative w-full max-w-2xl rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl space-y-6">
          <!-- Modal Header -->
          <div class="flex items-center justify-between border-b border-gray-800 pb-4">
            <div class="flex items-center gap-2">
              <span class="text-xl">✨</span>
              <div>
                <h3 class="text-base font-bold text-white">Enrichir avec l'IA — {{ ticker }}</h3>
                <p class="text-xs text-gray-400">Générez un prompt, lancez la Deep Research puis laissez DeepSeek extraire la thèse 5Y.</p>
              </div>
            </div>
            <button
              type="button"
              class="text-gray-400 hover:text-white transition p-1.5 rounded-lg hover:bg-gray-800"
              @click="emit('close')"
            >
              ✕
            </button>
          </div>

          <!-- Selection du Modèle -->
          <div class="flex items-center justify-between bg-gray-950/60 p-3 rounded-xl border border-gray-800 text-xs">
            <span class="text-gray-400">Moteur d'analyse LLM :</span>
            <select
              v-model="selectedModel"
              class="rounded-lg bg-gray-900 border border-gray-700 px-3 py-1 text-xs text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="deepseek-v4-flash">DeepSeek Flash (Ultra-rapide)</option>
              <option value="qwen/qwen3.7-plus">Qwen 3.7 Plus (Avancé)</option>
            </select>
          </div>

          <!-- Stepper 2 colonnes -->
          <div class="grid gap-4 md:grid-cols-2">
            <!-- Étape 1 : Prompt -->
            <div class="rounded-xl border border-gray-800 bg-gray-950/50 p-4 space-y-3 flex flex-col justify-between">
              <div>
                <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Étape 1 : Copier le Prompt</div>
                <p class="text-[11px] text-gray-300">Copiez ce prompt optimisé pour demander aux IA (OpenAI Deep Research / Gemini) de sourcer vos hypothèses.</p>
              </div>
              <button
                type="button"
                class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition shadow"
                @click="copyPrompt"
              >
                <span>{{ copyFeedback ? '✓ Prompt Copié !' : '📋 Copier le Prompt' }}</span>
              </button>
            </div>

            <!-- Étape 2 : Coller & Lancer -->
            <div class="rounded-xl border border-gray-800 bg-gray-950/50 p-4 space-y-3 flex flex-col justify-between">
              <div>
                <div class="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">Étape 2 : Coller le Rapport</div>
                <textarea
                  v-model="rawReportInput"
                  rows="3"
                  placeholder="Collez ici le résultat de votre Deep Research..."
                  class="w-full rounded-lg bg-gray-950 border border-gray-800 p-2 text-xs font-mono text-gray-200 focus:border-sky-500 focus:outline-none resize-none"
                ></textarea>
              </div>
              <div class="flex gap-2">
                <button
                  type="button"
                  class="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-3 py-2 text-xs font-bold text-white hover:bg-sky-500 transition shadow disabled:opacity-50"
                  :disabled="!rawReportInput.trim() || isAnalyzing"
                  @click="handleRunAnalysis"
                >
                  <span v-if="isAnalyzing">⚡ Parsing DeepSeek...</span>
                  <span v-else>🚀 Extraire avec DeepSeek</span>
                </button>
                <button
                  v-if="isAnalyzing"
                  type="button"
                  class="px-2.5 py-2 rounded-lg bg-rose-600/20 border border-rose-500/40 text-xs font-bold text-rose-300 hover:bg-rose-600/40 transition"
                  @click="emit('cancel')"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>

          <!-- Message d'erreur -->
          <div v-if="errorMessage" class="rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs font-semibold text-rose-300">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
