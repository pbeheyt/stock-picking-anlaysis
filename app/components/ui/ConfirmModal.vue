<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  isDanger?: boolean
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-md p-4"
        @click.self="handleCancel"
      >
        <div
          class="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl space-y-5 font-mono"
        >
          <!-- Icon & Title -->
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-bold text-sm shadow-inner"
              :class="isDanger !== false ? 'border-rose-500/30 bg-rose-500/10 text-rose-400' : 'border-amber-500/30 bg-amber-500/10 text-amber-400'"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-bold text-white tracking-tight">
                {{ title || 'Confirmation requise' }}
              </h3>
              <p class="text-xs text-zinc-400 mt-0.5">
                Cette action est irréversible.
              </p>
            </div>
          </div>

          <!-- Message Body -->
          <div class="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3.5 text-xs text-zinc-300 leading-relaxed font-sans">
            {{ message }}
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              class="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition cursor-pointer"
              @click="handleCancel"
            >
              {{ cancelText || 'Annuler' }}
            </button>

            <button
              type="button"
              class="rounded-xl px-4 py-2 text-xs font-bold text-white transition shadow-sm cursor-pointer"
              :class="isDanger !== false ? 'bg-rose-600 hover:bg-rose-500' : 'bg-emerald-600 hover:bg-emerald-500'"
              @click="handleConfirm"
            >
              {{ confirmText || 'Confirmer' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
