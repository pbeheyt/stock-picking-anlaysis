<script setup lang="ts">
const props = defineProps<{
  mode: 'qualitative' | 'quantitative'
  ticker: string
  stockName: string
  promptText: string
  isAnalyzing: boolean
  errorMessage?: string | null
}>()

const emit = defineEmits<{
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
  <div class="rounded-2xl border border-gray-800 bg-gray-950/70 p-6 space-y-6 shadow-xl backdrop-blur">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-800 pb-4 gap-4">
      <div>
        <h3 class="text-base font-bold text-white flex items-center gap-2">
          <span>{{ mode === 'quantitative' ? '🎯' : '🧠' }}</span>
          <span>{{ mode === 'quantitative' ? 'Copilote IA & Thèse Quantitative DCF' : 'Recherche Qualitative & Deep Moat' }}</span>
        </h3>
        <p class="text-xs text-gray-400 mt-1">
          {{ mode === 'quantitative' 
            ? 'Générez un prompt financier, effectuez une Deep Research, puis laissez DeepSeek parser et injecter les hypothèses 5Y.' 
            : 'Générez le prompt institutionnel 0-10, lancez votre recherche puis laissez l\'IA auditer le Moat et le Management.' }}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <select
          v-model="selectedModel"
          class="rounded-lg bg-gray-900 border border-gray-700 px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
        >
          <option value="deepseek-v4-flash">DeepSeek Flash (Ultra-rapide)</option>
          <option value="qwen/qwen3.7-plus">Qwen 3.7 Plus (Avancé)</option>
        </select>
      </div>
    </div>

    <!-- Stepper à 3 étapes -->
    <div class="grid gap-6 md:grid-cols-2">
      <!-- Étape 1 : Copier le Prompt -->
      <div class="rounded-xl border border-gray-800 bg-gray-900/60 p-4 space-y-3 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
            <span>Étape 1 : Obtenir les données</span>
            <span class="text-[10px] bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">Prompt Prêt</span>
          </div>
          <p class="text-xs text-gray-300">
            {{ mode === 'quantitative'
              ? 'Copiez ce prompt optimisé pour demander aux IA (OpenAI Deep Research / Gemini) de sourcer les taux de croissance, marges et multiples d\'exit.'
              : 'Copiez ce prompt institutionnel 0-10 pour auditer la douve (Moat), la santé financière et le management.' }}
          </p>
        </div>
        <button
          type="button"
          class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition shadow"
          @click="copyPrompt"
        >
          <span>{{ copyFeedback ? '✓ Prompt Copié !' : '📋 Copier le Prompt Deep Research' }}</span>
        </button>
      </div>

      <!-- Étape 2 : Coller le Rapport Brut -->
      <div class="rounded-xl border border-gray-800 bg-gray-900/60 p-4 space-y-3 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
            <span>Étape 2 : Coller le Rapport Brut</span>
            <span class="text-[10px] text-gray-400">Texte brut / Markdown</span>
          </div>
          <textarea
            v-model="rawReportInput"
            rows="3"
            placeholder="Collez ici le résultat brut de votre Deep Research..."
            class="w-full rounded-lg bg-gray-950 border border-gray-800 p-2.5 text-xs font-mono text-gray-200 focus:border-sky-500 focus:outline-none resize-none"
          ></textarea>
        </div>
        <div class="flex gap-2">
          <button
            type="button"
            class="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-sky-500 transition shadow disabled:opacity-50"
            :disabled="!rawReportInput.trim() || isAnalyzing"
            @click="handleRunAnalysis"
          >
            <span v-if="isAnalyzing">⚡ Parsing DeepSeek en cours...</span>
            <span v-else>🚀 Parser & Extraire avec DeepSeek</span>
          </button>
          <button
            v-if="isAnalyzing"
            type="button"
            class="px-3 py-2.5 rounded-lg bg-rose-600/20 border border-rose-500/40 text-xs font-bold text-rose-300 hover:bg-rose-600/40 transition"
            @click="emit('cancel')"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="rounded-xl border border-rose-500/30 bg-rose-950/40 p-4 text-xs font-semibold text-rose-300">
      {{ errorMessage }}
    </div>
  </div>
</template>
