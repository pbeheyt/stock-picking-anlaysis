<script setup lang="ts">
import SettingsModal from '~/components/ui/SettingsModal.vue'

const route = useRoute()
const isSettingsOpen = ref(false)

const currentStockTicker = computed(() => {
  if (route.name === 'stock-ticker' || route.params.ticker) {
    return String(route.params.ticker || '').toUpperCase()
  }
  return null
})
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
    <!-- Header sticky minimaliste -->
    <header class="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <!-- Gauche: Brandmark & Fil d'Ariane -->
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-black text-xs group-hover:bg-emerald-500/20 transition">
              SP
            </div>
            <span class="text-sm font-black tracking-wider text-white uppercase font-mono">
              StockPick
            </span>
          </NuxtLink>

          <!-- Separator & Breadcrumb -->
          <template v-if="currentStockTicker">
            <span class="text-zinc-600 text-xs font-mono">/</span>
            <div class="flex items-center gap-1.5 rounded-md bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-xs font-mono font-bold text-emerald-400">
              {{ currentStockTicker }}
            </div>
          </template>
        </div>


        <!-- Droite: Actions Globales & Settings -->
        <div class="flex items-center gap-2">
          <slot name="header-actions" />

          <!-- Bouton Engrenage Settings -->
          <button
            type="button"
            class="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white transition shadow-sm"
            title="Paramètres API"
            @click="isSettingsOpen = true"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content Container -->
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>

    <!-- Global Settings Modal -->
    <SettingsModal :is-open="isSettingsOpen" @close="isSettingsOpen = false" />
  </div>
</template>
