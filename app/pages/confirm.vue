<script setup lang="ts">
definePageMeta({
  layout: false,
})

const user = useSupabaseUser()

watch(user, (newUser) => {
  if (newUser) {
    navigateTo('/')
  }
}, { immediate: true })
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-950 text-gray-400">
    <p class="text-sm">Authentification en cours…</p>
  </div>
</template>
