<script setup lang="ts">
import { getApiHeaders } from '~/utils/apiHeaders'
import {
  fetchApprovedModels,
  deleteApprovedModel,
  type AIModelOption,
} from '~/utils/aiModels'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

// Clés API local State
const deepseekApiKey = ref('')
const openrouterApiKey = ref('')

// Visibilité des clés (type password vs text)
const showDeepseekKey = ref(false)
const showOpenrouterKey = ref(false)

// Statuts d'activation des clés
const deepseekActive = ref(false)
const openrouterActive = ref(false)

// Etats de chargement et erreurs Étape 1
const isTestingDeepseek = ref(false)
const isTestingOpenrouter = ref(false)
const deepseekError = ref<string | null>(null)
const openrouterError = ref<string | null>(null)
const deepseekSuccess = ref<string | null>(null)
const openrouterSuccess = ref<string | null>(null)

// Etats Étape 2 (Ajout modèle)
const newModelProvider = ref<'DeepSeek' | 'OpenRouter'>('DeepSeek')
const newModelId = ref('')
const isAddingModel = ref(false)
const modelAddError = ref<string | null>(null)
const modelAddSuccess = ref<string | null>(null)

// Étape 3 (Liste modèles BDD)
const approvedModels = ref<AIModelOption[]>([])
const isLoadingModels = ref(false)

const loadState = async () => {
  if (import.meta.client) {
    deepseekApiKey.value = localStorage.getItem('deepseek_api_key') || ''
    openrouterApiKey.value = localStorage.getItem('openrouter_api_key') || ''
    deepseekActive.value = Boolean(deepseekApiKey.value.trim())
    openrouterActive.value = Boolean(openrouterApiKey.value.trim())

    if (deepseekActive.value) newModelProvider.value = 'DeepSeek'
    else if (openrouterActive.value) newModelProvider.value = 'OpenRouter'

    isLoadingModels.value = true
    approvedModels.value = await fetchApprovedModels()
    isLoadingModels.value = false
  }
}

onMounted(() => {
  loadState()
})

watch(() => props.isOpen, (open) => {
  if (open) {
    deepseekError.value = null
    openrouterError.value = null
    deepseekSuccess.value = null
    openrouterSuccess.value = null
    modelAddError.value = null
    modelAddSuccess.value = null
    loadState()
  }
})

const toast = useToast()

// Validation de Clé Étape 1
const validateKey = async (provider: 'DeepSeek' | 'OpenRouter') => {
  const keyToTest = provider === 'DeepSeek' ? deepseekApiKey.value.trim() : openrouterApiKey.value.trim()
  if (!keyToTest) {
    if (provider === 'DeepSeek') deepseekError.value = 'Veuillez saisir une clé DeepSeek.'
    else openrouterError.value = 'Veuillez saisir une clé OpenRouter.'
    return
  }

  if (provider === 'DeepSeek') {
    isTestingDeepseek.value = true
    deepseekError.value = null
    deepseekSuccess.value = null
  } else {
    isTestingOpenrouter.value = true
    openrouterError.value = null
    openrouterSuccess.value = null
  }

  try {
    const res = await $fetch<{ success: boolean; message: string }>('/api/ai/test-key', {
      method: 'POST',
      body: { provider, apiKey: keyToTest },
    })

    if (res.success) {
      if (provider === 'DeepSeek') {
        localStorage.setItem('deepseek_api_key', keyToTest)
        deepseekActive.value = true
        deepseekSuccess.value = 'Clé DeepSeek validée & enregistrée !'
        toast.success('Clé API DeepSeek validée & enregistrée avec succès.')
      } else {
        localStorage.setItem('openrouter_api_key', keyToTest)
        openrouterActive.value = true
        openrouterSuccess.value = 'Clé OpenRouter validée & enregistrée !'
        toast.success('Clé API OpenRouter validée & enregistrée avec succès.')
      }
    }
  } catch (err: any) {
    const msg = err?.data?.statusMessage || err?.message || 'Échec de validation de la clé.'
    if (provider === 'DeepSeek') {
      deepseekError.value = msg
    } else {
      openrouterError.value = msg
    }
    toast.error(msg)
  } finally {
    if (provider === 'DeepSeek') isTestingDeepseek.value = false
    else isTestingOpenrouter.value = false
  }
}

const clearKey = (provider: 'DeepSeek' | 'OpenRouter') => {
  if (import.meta.client) {
    if (provider === 'DeepSeek') {
      deepseekApiKey.value = ''
      deepseekActive.value = false
      localStorage.removeItem('deepseek_api_key')
      deepseekSuccess.value = null
      deepseekError.value = null
      toast.info('Clé API DeepSeek supprimée.')
    } else {
      openrouterApiKey.value = ''
      openrouterActive.value = false
      localStorage.removeItem('openrouter_api_key')
      openrouterSuccess.value = null
      openrouterError.value = null
      toast.info('Clé API OpenRouter supprimée.')
    }
  }
}

// Étape 2 : Ajouter un modèle (en coulisse : test + persistance BDD)
const handleAddModel = async () => {
  const modelIdClean = newModelId.value.trim()
  if (!modelIdClean) {
    modelAddError.value = 'Veuillez saisir l\'ID exact d\'un modèle.'
    toast.error('Veuillez saisir l\'ID exact d\'un modèle.')
    return
  }

  isAddingModel.value = true
  modelAddError.value = null
  modelAddSuccess.value = null

  try {
    const res = await $fetch<{ success: boolean; modelId: string }>('/api/ai/test-model', {
      method: 'POST',
      headers: getApiHeaders(),
      body: {
        provider: newModelProvider.value,
        modelId: modelIdClean,
      },
    })

    if (res.success) {
      modelAddSuccess.value = `Modèle '${modelIdClean}' testé, approuvé et enregistré en BDD !`
      newModelId.value = ''
      approvedModels.value = await fetchApprovedModels()
      toast.success(`Modèle '${modelIdClean}' validé et enregistré en BDD !`)
    }
  } catch (err: any) {
    console.error('Erreur ajout modèle:', err)
    const msg = err?.data?.statusMessage || err?.message || `Échec du test pour le modèle '${modelIdClean}'.`
    modelAddError.value = msg
    toast.error(msg)
  } finally {
    isAddingModel.value = false
  }
}

const modelToDelete = ref<string | null>(null)

const handleRemoveModel = (modelId: string) => {
  modelToDelete.value = modelId
}

const confirmRemoveModel = async () => {
  if (!modelToDelete.value) return
  const modelId = modelToDelete.value
  modelToDelete.value = null

  const ok = await deleteApprovedModel(modelId)
  if (ok) {
    approvedModels.value = await fetchApprovedModels()
    toast.info(`Modèle '${modelId}' retiré de la liste.`)
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
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto"
        @click.self="emit('close')"
      >
        <div
          class="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl space-y-6 my-8"
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
                <h3 class="text-base font-bold text-white tracking-tight font-mono uppercase">Paramètres API & Modèles IA</h3>
                <p class="text-xs text-zinc-400">Validation des clés API et ajout dynamique de modèles</p>
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

          <!-- ÉTAPE 1 : Clés API avec validation individuelle & Bouton Reveal -->
          <div class="space-y-4">
            <h4 class="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">1. Clés API Fournisseurs</h4>
            
            <div class="space-y-3 font-mono">
              <!-- DeepSeek Key Input -->
              <div class="p-3 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-2">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-semibold text-zinc-300">DeepSeek API Key</label>
                  <span
                    class="text-[10px] px-2 py-0.5 rounded border font-mono font-bold"
                    :class="deepseekActive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-900 text-zinc-500 border-zinc-800'"
                  >
                    {{ deepseekActive ? '✓ Validée' : 'Non validée' }}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="relative flex-1">
                    <input
                      v-model="deepseekApiKey"
                      :type="showDeepseekKey ? 'text' : 'password'"
                      placeholder="sk-..."
                      class="w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-3 pr-9 py-1.5 text-xs text-white placeholder-zinc-600 font-mono transition focus:border-emerald-500/80 focus:outline-none"
                    >
                    <button
                      type="button"
                      class="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-0.5 transition cursor-pointer"
                      :title="showDeepseekKey ? 'Masquer la clé' : 'Afficher la clé'"
                      @click="showDeepseekKey = !showDeepseekKey"
                    >
                      <svg v-if="showDeepseekKey" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.038 10.038 0 013.682-.763c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-4.692-4.692a3 3 0 00-4.243-4.243" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" />
                      </svg>
                      <svg v-else class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>

                  <button
                    type="button"
                    class="inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-700 transition disabled:opacity-50 cursor-pointer shrink-0"
                    :disabled="isTestingDeepseek || !deepseekApiKey.trim()"
                    @click="validateKey('DeepSeek')"
                  >
                    <svg v-if="isTestingDeepseek" class="h-3.5 w-3.5 animate-spin text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>{{ isTestingDeepseek ? 'Test...' : deepseekActive ? 'Re-valider' : 'Valider' }}</span>
                  </button>
                  <button
                    v-if="deepseekApiKey"
                    type="button"
                    class="text-zinc-500 hover:text-rose-400 p-1.5 transition shrink-0 cursor-pointer"
                    title="Effacer"
                    @click="clearKey('DeepSeek')"
                  >
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- OpenRouter Key Input -->
              <div class="p-3 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-2">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-semibold text-zinc-300">OpenRouter API Key</label>
                  <span
                    class="text-[10px] px-2 py-0.5 rounded border font-mono font-bold"
                    :class="openrouterActive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-900 text-zinc-500 border-zinc-800'"
                  >
                    {{ openrouterActive ? '✓ Validée' : 'Non validée' }}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="relative flex-1">
                    <input
                      v-model="openrouterApiKey"
                      :type="showOpenrouterKey ? 'text' : 'password'"
                      placeholder="sk-or-..."
                      class="w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-3 pr-9 py-1.5 text-xs text-white placeholder-zinc-600 font-mono transition focus:border-emerald-500/80 focus:outline-none"
                    >
                    <button
                      type="button"
                      class="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-0.5 transition cursor-pointer"
                      :title="showOpenrouterKey ? 'Masquer la clé' : 'Afficher la clé'"
                      @click="showOpenrouterKey = !showOpenrouterKey"
                    >
                      <svg v-if="showOpenrouterKey" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.038 10.038 0 013.682-.763c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-4.692-4.692a3 3 0 00-4.243-4.243" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" />
                      </svg>
                      <svg v-else class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>

                  <button
                    type="button"
                    class="inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-700 transition disabled:opacity-50 cursor-pointer shrink-0"
                    :disabled="isTestingOpenrouter || !openrouterApiKey.trim()"
                    @click="validateKey('OpenRouter')"
                  >
                    <svg v-if="isTestingOpenrouter" class="h-3.5 w-3.5 animate-spin text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>{{ isTestingOpenrouter ? 'Test...' : openrouterActive ? 'Re-valider' : 'Valider' }}</span>
                  </button>
                  <button
                    v-if="openrouterApiKey"
                    type="button"
                    class="text-zinc-500 hover:text-rose-400 p-1.5 transition shrink-0 cursor-pointer"
                    title="Effacer"
                    @click="clearKey('OpenRouter')"
                  >
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- ÉTAPE 2 : Ajouter un modèle -->
          <div class="space-y-3 pt-3 border-t border-zinc-800/80">
            <h4 class="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">2. Ajouter un Modèle</h4>
            
            <div v-if="!deepseekActive && !openrouterActive" class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3 text-xs text-zinc-500 font-mono">
              Veuillez valider au moins une clé API à l'étape 1 pour débloquer l'ajout de modèles.
            </div>

            <div v-else class="space-y-2 font-mono">
              <div class="flex flex-col sm:flex-row items-stretch gap-2.5">
                <!-- Select Provider filtré uniquement aux clés activement validées -->
                <select
                  v-model="newModelProvider"
                  class="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500/80 shrink-0"
                >
                  <option v-if="deepseekActive" value="DeepSeek">DeepSeek</option>
                  <option v-if="openrouterActive" value="OpenRouter">OpenRouter</option>
                </select>

                <input
                  v-model="newModelId"
                  type="text"
                  placeholder="ID exact (ex: google/gemini-3.6-flash ou deepseek-chat)"
                  class="flex-1 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-xs text-white placeholder-zinc-600 font-mono transition focus:border-emerald-500/80 focus:outline-none"
                  :disabled="isAddingModel"
                >

                <button
                  type="button"
                  class="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition shadow disabled:opacity-50 font-mono shrink-0 cursor-pointer"
                  :disabled="isAddingModel || !newModelId.trim()"
                  @click="handleAddModel"
                >
                  <svg v-if="isAddingModel" class="h-3.5 w-3.5 animate-spin text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>{{ isAddingModel ? 'Test...' : 'Ajouter' }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- ÉTAPE 3 : Modèles Réellement Testés & Approuvés en BDD -->
          <div class="space-y-3 pt-3 border-t border-zinc-800/80">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">3. Modèles Testés & Approuvés (BDD)</h4>
              <span class="text-[10px] text-zinc-500 font-mono">{{ approvedModels.length }} modèle(s)</span>
            </div>

            <div v-if="isLoadingModels" class="py-4 text-center text-xs text-zinc-500 font-mono">
              Chargement des modèles enregistrés...
            </div>
            
            <div v-else-if="approvedModels.length === 0" class="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-4 text-center text-xs text-zinc-500 font-mono">
              Aucun modèle IA testé et approuvé pour le moment.
            </div>

            <div v-else class="max-h-48 overflow-y-auto space-y-2 pr-1 font-mono">
              <div
                v-for="m in approvedModels"
                :key="m.id"
                class="flex items-center justify-between p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/50 text-xs"
              >
                <div class="flex items-center gap-2 min-w-0">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold border shrink-0" :class="m.provider === 'DeepSeek' ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'">
                    {{ m.provider }}
                  </span>
                  <span class="text-white font-bold truncate">{{ m.id }}</span>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                  <span class="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Approuvé</span>
                  <button
                    type="button"
                    class="text-zinc-500 hover:text-rose-400 p-1 transition cursor-pointer"
                    title="Supprimer ce modèle"
                    @click="handleRemoveModel(m.id)"
                  >
                    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer (Fermer uniquement) -->
          <div class="flex items-center justify-end border-t border-zinc-800/80 pt-4 font-mono">
            <button
              type="button"
              class="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition cursor-pointer"
              @click="emit('close')"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Confirm Remove Model Modal -->
    <ConfirmModal
      :is-open="Boolean(modelToDelete)"
      title="Retirer le modèle"
      :message="`Voulez-vous vraiment retirer le modèle '${modelToDelete}' de la liste des modèles approuvés en BDD ?`"
      confirm-text="Retirer"
      cancel-text="Annuler"
      :is-danger="true"
      @confirm="confirmRemoveModel"
      @cancel="modelToDelete = null"
    />
  </Teleport>
</template>
