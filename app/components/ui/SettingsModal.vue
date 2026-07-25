<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const deepseekApiKey = ref('')
const openrouterApiKey = ref('')
const isSaved = ref(false)

onMounted(() => {
  if (import.meta.client) {
    deepseekApiKey.value = localStorage.getItem('deepseek_api_key') || ''
    openrouterApiKey.value = localStorage.getItem('openrouter_api_key') || ''
  }
})

watch(() => props.isOpen, (newVal) => {
  if (newVal && import.meta.client) {
    deepseekApiKey.value = localStorage.getItem('deepseek_api_key') || ''
    openrouterApiKey.value = localStorage.getItem('openrouter_api_key') || ''
    isSaved.value = false
  }
})

const saveKeys = () => {
  if (import.meta.client) {
    localStorage.setItem('deepseek_api_key', deepseekApiKey.value.trim())
    localStorage.setItem('openrouter_api_key', openrouterApiKey.value.trim())
    isSaved.value = true
    setTimeout(() => {
      isSaved.value = false
      emit('close')
    }, 1000)
  }
}

const clearKeys = () => {
  deepseekApiKey.value = ''
  openrouterApiKey.value = ''
  if (import.meta.client) {
    localStorage.removeItem('deepseek_api_key')
    localStorage.removeItem('openrouter_api_key')
  }
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
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
        @click.self="emit('close')"
      >
        <div
          class="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl space-y-6"
        >
          <!-- Modal Header -->
          <div class="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div class="flex items-center gap-2.5">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-white tracking-tight">Paramètres API</h3>
                <p class="text-xs text-zinc-400">Configuration des clés d'accès aux modèles d'IA</p>
              </div>
            </div>
            <button
              type="button"
              class="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
              @click="emit('close')"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Body / Form -->
          <div class="space-y-5">
            <!-- DeepSeek Key -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <label class="text-xs font-semibold text-zinc-300">Clé API DeepSeek</label>
                <span
                  class="text-[10px] font-mono font-medium px-2 py-0.5 rounded border"
                  :class="deepseekApiKey ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-900 text-zinc-500 border-zinc-800'"
                >
                  {{ deepseekApiKey ? 'Configurée' : 'Non renseignée' }}
                </span>
              </div>
              <input
                v-model="deepseekApiKey"
                type="password"
                placeholder="sk-..."
                class="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-xs text-white placeholder-zinc-600 font-mono transition focus:border-emerald-500/80 focus:outline-none focus:ring-1 focus:ring-emerald-500/80"
              >
            </div>

            <!-- OpenRouter Key -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <label class="text-xs font-semibold text-zinc-300">Clé API OpenRouter</label>
                <span
                  class="text-[10px] font-mono font-medium px-2 py-0.5 rounded border"
                  :class="openrouterApiKey ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-900 text-zinc-500 border-zinc-800'"
                >
                  {{ openrouterApiKey ? 'Configurée' : 'Non renseignée' }}
                </span>
              </div>
              <input
                v-model="openrouterApiKey"
                type="password"
                placeholder="sk-or-..."
                class="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-xs text-white placeholder-zinc-600 font-mono transition focus:border-emerald-500/80 focus:outline-none focus:ring-1 focus:ring-emerald-500/80"
              >
            </div>
          </div>

          <!-- Feedback Toast -->
          <div v-if="isSaved" class="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 text-xs text-emerald-300 flex items-center gap-2">
            <svg class="h-4 w-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Clés API enregistrées dans votre navigateur.</span>
          </div>

          <!-- Modal Footer -->
          <div class="flex items-center justify-between border-t border-zinc-800/80 pt-4">
            <button
              type="button"
              class="text-xs text-zinc-500 hover:text-rose-400 transition"
              @click="clearKeys"
            >
              Effacer les clés
            </button>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
                @click="emit('close')"
              >
                Annuler
              </button>
              <button
                type="button"
                class="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition shadow-sm"
                @click="saveKeys"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
