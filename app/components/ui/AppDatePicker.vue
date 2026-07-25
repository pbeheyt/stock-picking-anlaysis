<script setup lang="ts">
const props = defineProps<{
  modelValue: string // ISO string YYYY-MM-DD
  min?: string
  max?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const dateInputRef = ref<HTMLInputElement | null>(null)

// Formatage strict en français JJ/MM/AAAA (ex: 25/07/2026)
const formattedFrenchDate = computed(() => {
  if (!props.modelValue) return ''
  const parts = props.modelValue.split('-')
  if (parts.length !== 3) return props.modelValue
  const [y, m, d] = parts
  if (!y || !m || !d) return props.modelValue
  return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`
})

const handleNativeChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.value) {
    emit('update:modelValue', target.value)
  }
}

const openPicker = () => {
  if (dateInputRef.value) {
    if ('showPicker' in dateInputRef.value) {
      dateInputRef.value.showPicker()
    } else {
      dateInputRef.value.focus()
    }
  }
}
</script>

<template>
  <div class="relative inline-flex items-center group">
    <!-- Visual French Formatted Display JJ/MM/AAAA -->
    <button
      type="button"
      class="flex h-8 items-center justify-between gap-2 rounded-lg bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 text-xs text-white font-mono cursor-pointer hover:border-sky-500/50 transition shadow-sm"
      @click="openPicker"
    >
      <span class="text-zinc-200">{{ formattedFrenchDate || placeholder || 'JJ/MM/AAAA' }}</span>
      <svg class="h-3.5 w-3.5 text-zinc-500 group-hover:text-sky-400 transition shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </button>

    <!-- Invisible Native Input Overlay for Calendar Picker -->
    <input
      ref="dateInputRef"
      type="date"
      :value="modelValue"
      :min="min"
      :max="max"
      class="absolute inset-0 opacity-0 cursor-pointer w-full h-full pointer-events-auto"
      @input="handleNativeChange"
      @change="handleNativeChange"
    >
  </div>
</template>
