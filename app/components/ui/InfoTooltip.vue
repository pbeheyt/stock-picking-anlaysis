<script setup lang="ts">
defineProps<{
  text?: string
}>()

const isOpen = ref(false)
</script>

<template>
  <div class="relative inline-flex items-center group">
    <button
      type="button"
      class="inline-flex items-center justify-center h-4 w-4 rounded-full text-[10px] font-bold text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/80 transition cursor-help focus:outline-none"
      aria-label="Information"
      @mouseenter="isOpen = true"
      @mouseleave="isOpen = false"
      @click="isOpen = !isOpen"
    >
      <svg class="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>

    <div
      class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block group-focus-within:block w-max max-w-xs px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700/90 text-zinc-200 text-xs shadow-2xl z-50 pointer-events-none transition-opacity duration-150 leading-relaxed font-normal normal-case text-left"
    >
      <slot>{{ text }}</slot>
      <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900" />
    </div>
  </div>
</template>
