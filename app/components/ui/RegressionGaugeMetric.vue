<script setup lang="ts">
import InfoTooltip from '~/components/ui/InfoTooltip.vue'

const props = defineProps<{
  label: string
  tooltip?: string
  valueText: string
  valueRatio: number
  strokeColor: string
  textColorClass: string
}>()

const getGaugeArc = (valRatio: number) => {
  const clamped = Math.max(0, Math.min(1, valRatio))
  const totalLen = 125.66
  const strokeDashoffset = totalLen * (1 - clamped)
  const angle = Math.PI * (1 - clamped)
  const cx = 50 + 40 * Math.cos(angle)
  const cy = 50 - 40 * Math.sin(angle)
  return { strokeDashoffset, cx, cy }
}
</script>

<template>
  <div class="flex flex-col items-center bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80 text-center space-y-1 font-mono">
    <div class="text-[11px] font-semibold text-zinc-400 uppercase flex items-center gap-1">
      <span>{{ label }}</span>
      <InfoTooltip v-if="tooltip" :text="tooltip" />
    </div>
    <div class="relative h-16 w-32">
      <svg viewBox="0 0 100 55" class="w-full h-full">
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#27272a" stroke-width="8" stroke-linecap="round" />
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          :stroke="strokeColor"
          stroke-width="8"
          stroke-linecap="round"
          stroke-dasharray="125.66"
          :stroke-dashoffset="getGaugeArc(valueRatio).strokeDashoffset"
        />
        <circle :cx="getGaugeArc(valueRatio).cx" :cy="getGaugeArc(valueRatio).cy" r="4" fill="#ffffff" />
      </svg>
    </div>
    <div class="font-mono text-sm font-bold" :class="textColorClass">
      {{ valueText }}
    </div>
  </div>
</template>
