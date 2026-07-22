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
    <div class="h-6 w-6 animate-spin rounded-full border-2 border-gray-700 border-t-white" />
  </div>
</template>
