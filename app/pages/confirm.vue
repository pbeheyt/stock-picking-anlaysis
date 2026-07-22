<script setup lang="ts">
definePageMeta({
  layout: false,
})

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const route = useRoute()

const authError = ref<string | null>(null)

// 1. Redirection si l'état réactif détecte l'utilisateur
watch(user, (newUser) => {
  if (newUser) {
    navigateTo('/')
  }
}, { immediate: true })

onMounted(async () => {
  // 2. Capture les erreurs retournées dans l'URL par Supabase/Google
  const errorDesc = route.query.error_description || route.query.error
  if (errorDesc) {
    authError.value = String(errorDesc)
    return
  }

  // 3. Forcer la récupération de la session (débloque le PKCE s'il y a un ?code=...)
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      authError.value = error.message
      return
    }

    if (data.session) {
      await navigateTo('/')
    }
  } catch (err: any) {
    authError.value = err?.message || 'Erreur inconnue lors de la récupération de la session.'
  }
})
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-950 px-4 text-center text-gray-400">
    <template v-if="!authError">
      <div class="h-6 w-6 animate-spin rounded-full border-2 border-gray-700 border-t-white" />
      <p class="text-sm">Authentification en cours…</p>
    </template>

    <template v-else>
      <div class="max-w-md space-y-3 rounded-xl border border-red-500/30 bg-red-950/40 p-6 text-red-300">
        <h3 class="font-semibold text-red-100">Échec de la connexion</h3>
        <p class="text-xs font-mono text-red-400/90 break-words">{{ authError }}</p>
        <NuxtLink
          to="/login"
          class="inline-block mt-2 rounded-lg bg-red-900/50 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-red-800/50"
        >
          Retour à la page de connexion
        </NuxtLink>
      </div>
    </template>
  </div>
</template>
