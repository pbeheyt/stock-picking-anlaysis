<script setup lang="ts">
defineProps<{
  text: string
}>()

const isOpen = ref(false)
</script>

<template>
  <div class="relative inline-flex items-center group">
    <button
      type="button"
      class="inline-flex items-center justify-center h-4 w-4 rounded-full text-[10px] font-bold text-gray-400 hover:text-white bg-gray-800/80 hover:bg-gray-700 border border-gray-700/80 transition cursor-help focus:outline-none"
      aria-label="Information"
      @mouseenter="isOpen = true"
      @mouseleave="isOpen = false"
      @click="isOpen = !isOpen"
    >
      ⓘ
    </button>

    <div
      class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block group-focus-within:block w-64 p-2.5 rounded-lg bg-gray-900 border border-gray-700/90 text-gray-200 text-xs shadow-2xl z-50 pointer-events-none transition-opacity duration-150 leading-relaxed font-normal normal-case text-left"
    >
      {{ text }}
      <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
    </div>
  </div>
</template>
