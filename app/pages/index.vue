<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const signOut = async () => {
  await supabase.auth.signOut()
  await navigateTo('/login')
}
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-1">
      <h2 class="text-2xl font-bold tracking-tight text-white">
        Dashboard
      </h2>
      <p class="text-sm text-gray-400">
        Connecté en tant que
        <span class="font-medium text-gray-200">{{ user?.email }}</span>
      </p>
    </div>

    <div class="rounded-xl border border-gray-800 bg-gray-900/50 p-8 text-center text-sm text-gray-500">
      Tableau de bord en construction — les widgets arriveront au Step 2.
    </div>

    <div class="flex justify-end">
      <button
        type="button"
        class="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
        @click="signOut"
      >
        Déconnexion
      </button>
    </div>
  </div>
</template>
