<script setup lang="ts">
import type { Stock } from '~/types/database.types'
import type { ScenarioResults } from '~/utils/valuation'
import { formatCurrency } from '~/utils/format'

const props = defineProps<{
  stock?: Stock | null
  scenarios?: ScenarioResults | null
  spectrumData?: {
    min: number
    max: number
    pricePos: number
    bearPos: number
    basePos: number
    bullPos: number
    lowPos: number | null
    meanPos: number | null
    highPos: number | null
    bearVal: number
    baseVal: number
    bullVal: number
    priceVal: number
    lowVal: number | null
    meanVal: number | null
    highVal: number | null
  } | null
  currency: string
  analystCount?: number | null
}>()

const activeSpectrumData = computed(() => {
  if (props.spectrumData) return props.spectrumData
  if (!props.stock || !props.scenarios) return null

  const price = props.stock.current_price ?? 0
  const bear = props.scenarios.bear.fairValue
  const base = props.scenarios.base.fairValue
  const bull = props.scenarios.bull.fairValue

  const low = props.stock.analyst_target_low ?? null
  const mean = props.stock.analyst_target_price ?? props.stock.analyst_target_median ?? null
  const high = props.stock.analyst_target_high ?? null

  const allVals = [price, bear, base, bull, low, mean, high].filter((v): v is number => v !== null && !isNaN(v) && v > 0)
  if (allVals.length === 0) return null

  const min = Math.min(...allVals) * 0.95
  const max = Math.max(...allVals) * 1.05
  const range = max - min

  const calcPos = (val: number | null) => {
    if (val === null || isNaN(val) || val <= 0 || range <= 0) return null
    return Math.max(2, Math.min(98, ((val - min) / range) * 100))
  }

  return {
    min,
    max,
    pricePos: calcPos(price)!,
    bearPos: calcPos(bear)!,
    basePos: calcPos(base)!,
    bullPos: calcPos(bull)!,
    lowPos: calcPos(low),
    meanPos: calcPos(mean),
    highPos: calcPos(high),
    bearVal: bear,
    baseVal: base,
    bullVal: bull,
    priceVal: price,
    lowVal: low,
    meanVal: mean,
    highVal: high,
  }
})
</script>

<template>
  <div class="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-6 space-y-6 shadow-xl backdrop-blur">
    <h3 class="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono flex items-center justify-between border-b border-zinc-800 pb-2.5">
      <span>Valorisation & Spectrum de Prix Dual-Track</span>
      <span class="text-[11px] text-zinc-500 font-normal font-sans lowercase">Modèle vs Consensus Wall Street</span>
    </h3>

    <div v-if="activeSpectrumData" class="space-y-8 py-2 font-mono">
      <!-- Track 1 : MODÈLE STOCKPICK (NOTRE DCF) -->
      <div class="space-y-2">
        <div class="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Modèle StockPick (Notre DCF)
        </div>

        <div class="relative pt-6 pb-6">
          <div class="h-3.5 w-full rounded-full bg-gradient-to-r from-rose-500/25 via-amber-500/25 to-emerald-500/25 border border-zinc-800 relative shadow-inner">
            <div class="absolute top-0 bottom-0 w-0.5 bg-rose-500 shadow-md z-10" :style="{ left: `${activeSpectrumData.bearPos}%` }">
              <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                {{ formatCurrency(activeSpectrumData.bearVal, currency) }}
              </div>
              <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-rose-400 whitespace-nowrap">
                Bear
              </div>
            </div>

            <div class="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-md z-20" :style="{ left: `${activeSpectrumData.basePos}%` }">
              <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                {{ formatCurrency(activeSpectrumData.baseVal, currency) }}
              </div>
              <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-amber-400 whitespace-nowrap">
                Base
              </div>
            </div>

            <div class="absolute top-0 bottom-0 w-0.5 bg-emerald-400 shadow-md z-10" :style="{ left: `${activeSpectrumData.bullPos}%` }">
              <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                {{ formatCurrency(activeSpectrumData.bullVal, currency) }}
              </div>
              <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-emerald-400 whitespace-nowrap">
                Bull
              </div>
            </div>

            <div class="absolute top-0 bottom-0 w-1 bg-white z-30 shadow-lg" :style="{ left: `${activeSpectrumData.pricePos}%` }">
              <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white bg-zinc-900/90 px-1 rounded border border-zinc-700 whitespace-nowrap">
                {{ formatCurrency(activeSpectrumData.priceVal, currency) }}
              </div>
              <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-bold text-white whitespace-nowrap">
                Prix
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Track 2 : CONSENSUS WALL STREET (ANALYSTES 12M) -->
      <div v-if="activeSpectrumData.lowVal !== null || activeSpectrumData.meanVal !== null" class="space-y-2">
        <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-sky-400">
          <span>Consensus Wall Street (Analystes 12M)</span>
          <span v-if="analystCount" class="text-[11px] font-normal text-zinc-500 font-sans lowercase">
            ({{ analystCount }} analystes)
          </span>
        </div>

        <div class="relative pt-6 pb-6">
          <div class="h-3.5 w-full rounded-full bg-gradient-to-r from-rose-500/25 via-amber-500/25 to-emerald-500/25 border border-zinc-800 relative shadow-inner">
            <div v-if="activeSpectrumData.lowPos !== null" class="absolute top-0 bottom-0 w-0.5 bg-rose-500 shadow-md z-10" :style="{ left: `${activeSpectrumData.lowPos}%` }">
              <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                {{ formatCurrency(activeSpectrumData.lowVal, currency) }}
              </div>
              <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-rose-400 whitespace-nowrap">
                Low
              </div>
            </div>

            <div v-if="activeSpectrumData.meanPos !== null" class="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-md z-20" :style="{ left: `${activeSpectrumData.meanPos}%` }">
              <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                {{ formatCurrency(activeSpectrumData.meanVal, currency) }}
              </div>
              <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-amber-400 whitespace-nowrap">
                Moyen
              </div>
            </div>

            <div v-if="activeSpectrumData.highPos !== null" class="absolute top-0 bottom-0 w-0.5 bg-emerald-400 shadow-md z-10" :style="{ left: `${activeSpectrumData.highPos}%` }">
              <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                {{ formatCurrency(activeSpectrumData.highVal, currency) }}
              </div>
              <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-emerald-400 whitespace-nowrap">
                High
              </div>
            </div>

            <div class="absolute top-0 bottom-0 w-1 bg-white z-30 shadow-lg" :style="{ left: `${activeSpectrumData.pricePos}%` }">
              <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white bg-zinc-900/90 px-1 rounded border border-zinc-700 whitespace-nowrap">
                {{ formatCurrency(activeSpectrumData.priceVal, currency) }}
              </div>
              <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-bold text-white whitespace-nowrap">
                Prix
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
