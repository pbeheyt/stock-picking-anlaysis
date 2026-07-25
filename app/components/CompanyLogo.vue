<script setup lang="ts">
const props = withDefaults(defineProps<{
  ticker: string
  domain?: string | null
  size?: 'sm' | 'md' | 'lg'
}>(), {
  domain: null,
  size: 'md',
})

const cleanTicker = computed(() => {
  if (!props.ticker) return ''
  return props.ticker.split('.')[0].toUpperCase()
})

const sources = computed(() => {
  const list: string[] = []
  const rawTicker = props.ticker.trim().toUpperCase()

  // 1. Parqet CDN avec Ticker complet (ex: DG.PA, MC.PA, AAPL)
  if (rawTicker) {
    list.push(`https://assets.parqet.com/logos/symbol/${rawTicker}`)
  }

  // 2. Parqet CDN avec Ticker sans suffixe (ex: DG, MC)
  if (cleanTicker.value && cleanTicker.value !== rawTicker) {
    list.push(`https://assets.parqet.com/logos/symbol/${cleanTicker.value}`)
  }

  // 3. Google Favicons HD par Domaine (ex: vinci.com)
  if (props.domain) {
    list.push(`https://www.google.com/s2/favicons?domain=${props.domain}&sz=128`)
  }

  return list
})

const currentSourceIndex = ref(0)
const hasError = ref(false)

const currentSrc = computed(() => {
  if (hasError.value || sources.value.length === 0) return ''
  return sources.value[currentSourceIndex.value] || ''
})

const handleImageError = () => {
  if (currentSourceIndex.value < sources.value.length - 1) {
    currentSourceIndex.value++
  } else {
    hasError.value = true
  }
}

watch(() => props.ticker, () => {
  currentSourceIndex.value = 0
  hasError.value = false
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'h-6 w-6 text-[10px]'
    case 'lg': return 'h-14 w-14 text-sm'
    case 'md':
    default: return 'h-10 w-10 text-xs'
  }
})
</script>

<template>
  <div class="relative flex-shrink-0 flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800/80 overflow-hidden shadow-inner font-mono font-bold" :class="sizeClasses">
    <img
      v-if="currentSrc && !hasError"
      :src="currentSrc"
      :alt="ticker"
      class="h-full w-full object-contain p-1 rounded-xl bg-zinc-950"
      loading="lazy"
      @error="handleImageError"
    >
    <span v-else class="text-emerald-400 font-mono font-black tracking-tighter">
      {{ cleanTicker.slice(0, 4) }}
    </span>
  </div>
</template>
