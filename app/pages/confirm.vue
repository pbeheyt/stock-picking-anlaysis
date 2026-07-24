<script setup lang="ts">
// Préservé pour la confirmation d'email Supabase Auth en production.
// Redirection temporaire en dev local sans authentification.
definePageMeta({
  layout: false,
})

navigateTo('/')
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-950 text-gray-400">
    <p class="text-sm">Redirection vers le tableau de bord local…</p>
  </div>
</template>
