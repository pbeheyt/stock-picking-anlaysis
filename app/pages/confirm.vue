<script setup lang="ts">
definePageMeta({
  layout: false,
})

const user = useSupabaseUser()
const supabase = useSupabaseClient()

// 1. Redirection si l'utilisateur est déjà détecté
watch(user, (newUser) => {
  if (newUser) {
    navigateTo('/')
  }
}, { immediate: true })

// 2. Écoute l'échange de token OAuth en direct
onMounted(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      navigateTo('/')
    }
  })
})
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-3 bg-gray-950 text-gray-400">
    <div class="h-6 w-6 animate-spin rounded-full border-2 border-gray-700 border-t-white" />
    <p class="text-sm">Authentification en cours…</p>
  </div>
</template>
