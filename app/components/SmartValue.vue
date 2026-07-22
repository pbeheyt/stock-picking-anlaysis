<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: number | null | undefined
  type?: 'percent' | 'currency' | 'number' | 'mos'
  currency?: string
  colored?: boolean
  invertColor?: boolean
  digits?: number
  prefix?: string
  suffix?: string
}>(), {
  type: 'percent',
  currency: 'USD',
  colored: true,
  invertColor: false,
  digits: 1,
  prefix: '',
  suffix: '',
})

const formattedText = computed(() => {
  if (props.value === null || props.value === undefined || isNaN(props.value)) return 'N/A'

  if (props.type === 'percent') {
    const val = props.value * 100
    const sign = val > 0 ? '+' : ''
    return `${props.prefix}${sign}${val.toFixed(props.digits)}%${props.suffix}`
  }

  if (props.type === 'mos') {
    const sign = props.value >= 0 ? '+' : ''
    return `${props.prefix}${sign}${props.value.toFixed(props.digits)}%${props.suffix}`
  }

  if (props.type === 'currency') {
    try {
      const code = props.currency.toUpperCase() === 'GBP' || props.currency === 'GBP' ? 'GBP' : props.currency.toUpperCase()
      return `${props.prefix}${new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: code,
        maximumFractionDigits: props.digits ?? 2,
      }).format(props.value)}${props.suffix}`
    } catch {
      return `${props.prefix}${props.value.toFixed(2)} ${props.currency}${props.suffix}`
    }
  }

  return `${props.prefix}${props.value.toLocaleString('fr-FR', { maximumFractionDigits: props.digits })}${props.suffix}`
})

const colorClass = computed(() => {
  if (!props.colored || props.value === null || props.value === undefined || isNaN(props.value)) {
    return 'text-gray-200'
  }

  const numericVal = props.value
  const isPositive = numericVal > 0
  const isZero = numericVal === 0

  if (isZero) return 'text-gray-300'

  if (props.invertColor) {
    return isPositive ? 'text-rose-400' : 'text-emerald-400'
  }
  return isPositive ? 'text-emerald-400' : 'text-rose-400'
})
</script>

<template>
  <span :class="['font-mono font-semibold', colorClass]">
    {{ formattedText }}
  </span>
</template>
