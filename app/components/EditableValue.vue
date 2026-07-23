<script setup lang="ts">
import { formatScaledCurrency, formatCurrency, formatPercent } from '~/utils/format'

const props = withDefaults(defineProps<{
  modelValue: number
  type?: 'percent' | 'currency' | 'scaledCurrency' | 'multiple' | 'number'
  currency?: string
  step?: number
  isDecimal?: boolean
  digits?: number
  showSign?: boolean
  colorMode?: 'semantic' | 'white' | 'none'
}>(), {
  type: 'percent',
  currency: 'USD',
  step: 0.1,
  isDecimal: true,
  digits: 1,
  showSign: true,
  colorMode: 'semantic',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}>()

const isEditing = ref(false)
const tempValue = ref<number>(0)
const inputRef = ref<HTMLInputElement | null>(null)

const formattedDisplay = computed(() => {
  if (props.type === 'percent') {
    if (!props.showSign) {
      const val = props.isDecimal ? props.modelValue * 100 : props.modelValue
      return `${val.toFixed(props.digits)}%`
    }
    return formatPercent(props.modelValue, props.isDecimal, props.digits)
  }
  if (props.type === 'scaledCurrency') {
    return formatScaledCurrency(props.modelValue, props.currency, props.digits)
  }
  if (props.type === 'currency') {
    return formatCurrency(props.modelValue, props.currency, props.digits)
  }
  if (props.type === 'multiple') {
    return `${props.modelValue.toFixed(props.digits)}x`
  }
  return props.modelValue.toString()
})

const textColorClass = computed(() => {
  if (props.colorMode === 'white') return 'text-white font-bold'

  if (props.type === 'percent') {
    if (props.modelValue < 0) return 'text-rose-400 font-bold'
    if (props.modelValue > 0) return 'text-emerald-400 font-bold'
    return 'text-gray-300 font-bold'
  }
  if (props.type === 'scaledCurrency' || props.type === 'currency') {
    return 'text-white font-bold'
  }
  if (props.type === 'multiple') {
    return 'text-white font-bold'
  }
  return 'text-gray-200 font-bold'
})

const startEditing = async () => {
  if (props.type === 'percent' && props.isDecimal) {
    tempValue.value = parseFloat((props.modelValue * 100).toFixed(2))
  } else {
    tempValue.value = parseFloat(props.modelValue.toFixed(2))
  }
  isEditing.value = true

  await nextTick()
  if (inputRef.value) {
    inputRef.value.focus()
    inputRef.value.select()
  }
}

const confirmEdit = () => {
  if (isNaN(tempValue.value)) {
    cancelEdit()
    return
  }

  let finalVal = tempValue.value
  if (props.type === 'percent' && props.isDecimal) {
    finalVal = tempValue.value / 100
  }

  emit('update:modelValue', finalVal)
  emit('change', finalVal)
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
}
</script>

<template>
  <!-- Editing Mode -->
  <div v-if="isEditing" class="inline-flex items-center gap-1 bg-gray-950 p-1 rounded-lg border border-emerald-500/80 shadow-lg z-30" @click.stop>
    <input
      ref="inputRef"
      v-model.number="tempValue"
      type="number"
      :step="step"
      class="w-24 bg-gray-900 border border-gray-700 px-2 py-0.5 text-center font-mono font-bold text-white text-xs rounded focus:border-emerald-400 focus:outline-none"
      @keydown.enter.prevent="confirmEdit"
      @keydown.escape.prevent="cancelEdit"
    />

    <button
      type="button"
      class="flex h-5 w-5 items-center justify-center rounded bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600 hover:text-white transition text-xs font-bold"
      title="Valider (Entrée)"
      @click.stop="confirmEdit"
    >
      ✓
    </button>

    <button
      type="button"
      class="flex h-5 w-5 items-center justify-center rounded bg-rose-600/30 text-rose-300 hover:bg-rose-600 hover:text-white transition text-xs font-bold"
      title="Annuler (Echap)"
      @click.stop="cancelEdit"
    >
      ✕
    </button>
  </div>

  <!-- Display Mode -->
  <span
    v-else
    class="inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono cursor-pointer hover:bg-gray-800/80 hover:text-white transition border border-dashed border-transparent hover:border-gray-700 select-none"
    :class="textColorClass"
    title="Cliquer pour modifier la valeur à la main"
    @click.stop="startEditing"
  >
    <span>{{ formattedDisplay }}</span>
    <svg class="h-3 w-3 text-gray-500 opacity-0 group-hover:opacity-100 hover:opacity-100 transition" viewBox="0 0 20 20" fill="currentColor">
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
  </span>
</template>
