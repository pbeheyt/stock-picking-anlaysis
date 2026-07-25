<script setup lang="ts">
import { useToast, type Toast } from '~/composables/useToast'

const { toasts, removeToast } = useToast()

const getToastClasses = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return 'border-l-4 border-l-emerald-500 bg-zinc-950/95 border-zinc-800 text-emerald-300'
    case 'error':
      return 'border-l-4 border-l-rose-500 bg-zinc-950/95 border-zinc-800 text-rose-300'
    case 'warning':
      return 'border-l-4 border-l-amber-500 bg-zinc-950/95 border-zinc-800 text-amber-300'
    case 'info':
    default:
      return 'border-l-4 border-l-sky-500 bg-zinc-950/95 border-zinc-800 text-sky-300'
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      <TransitionGroup
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-x-8 opacity-0 scale-95"
        enter-to-class="translate-x-0 opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="translate-x-0 opacity-100 scale-100"
        leave-to-class="translate-x-8 opacity-0 scale-95"
      >
        <div
          v-for="t in toasts"
          :key="t.id"
          class="pointer-events-auto rounded-xl border p-3.5 shadow-2xl backdrop-blur-md flex items-start justify-between gap-3 font-mono text-xs"
          :class="getToastClasses(t.type)"
        >
          <div class="space-y-0.5 min-w-0 flex-1">
            <div v-if="t.title" class="font-bold text-white text-xs tracking-tight">
              {{ t.title }}
            </div>
            <div class="leading-relaxed break-words font-medium">
              {{ t.message }}
            </div>
          </div>

          <button
            type="button"
            class="text-zinc-500 hover:text-white transition p-0.5 rounded cursor-pointer shrink-0"
            @click="removeToast(t.id)"
          >
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
