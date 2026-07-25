<script setup lang="ts">
import { formatCurrency } from '~/utils/format'

defineProps<{
  spectrumData: {
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
  }
  currency: string
  analystCount?: number | null
}>()
</script>

<template>
  <div class="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-6 space-y-6 shadow-xl backdrop-blur">
    <h3 class="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono flex items-center justify-between border-b border-zinc-800 pb-2.5">
      <span>Valorisation & Spectrum de Prix Dual-Track</span>
      <span class="text-[11px] text-zinc-500 font-normal font-sans lowercase">Modèle vs Consensus Wall Street</span>
    </h3>

    <div class="space-y-8 py-2 font-mono">
      <!-- Track 1 : MODÈLE STOCKPICK (NOTRE DCF) -->
      <div class="space-y-2">
        <div class="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Modèle StockPick (Notre DCF)
        </div>

        <div class="relative pt-6 pb-6">
          <div class="h-3.5 w-full rounded-full bg-gradient-to-r from-rose-500/25 via-amber-500/25 to-emerald-500/25 border border-zinc-800 relative shadow-inner">
            <div class="absolute top-0 bottom-0 w-0.5 bg-rose-500 shadow-md z-10" :style="{ left: `${spectrumData.bearPos}%` }">
              <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                {{ formatCurrency(spectrumData.bearVal, currency) }}
              </div>
              <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-rose-400 whitespace-nowrap">
                Bear
              </div>
            </div>

            <div class="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-md z-20" :style="{ left: `${spectrumData.basePos}%` }">
              <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                {{ formatCurrency(spectrumData.baseVal, currency) }}
              </div>
              <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-amber-400 whitespace-nowrap">
                Base
              </div>
            </div>

            <div class="absolute top-0 bottom-0 w-0.5 bg-emerald-400 shadow-md z-10" :style="{ left: `${spectrumData.bullPos}%` }">
              <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                {{ formatCurrency(spectrumData.bullVal, currency) }}
              </div>
              <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-emerald-400 whitespace-nowrap">
                Bull
              </div>
            </div>

            <div class="absolute top-0 bottom-0 w-1 bg-white z-30 shadow-lg" :style="{ left: `${spectrumData.pricePos}%` }">
              <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white bg-zinc-900/90 px-1 rounded border border-zinc-700 whitespace-nowrap">
                {{ formatCurrency(spectrumData.priceVal, currency) }}
              </div>
              <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-bold text-white whitespace-nowrap">
                Prix
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Track 2 : CONSENSUS WALL STREET (ANALYSTES 12M) -->
      <div v-if="spectrumData.lowVal !== null || spectrumData.meanVal !== null" class="space-y-2">
        <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-sky-400">
          <span>Consensus Wall Street (Analystes 12M)</span>
          <span v-if="analystCount" class="text-[11px] font-normal text-zinc-500 font-sans lowercase">
            ({{ analystCount }} analystes)
          </span>
        </div>

        <div class="relative pt-6 pb-6">
          <div class="h-3.5 w-full rounded-full bg-gradient-to-r from-rose-500/25 via-amber-500/25 to-emerald-500/25 border border-zinc-800 relative shadow-inner">
            <div v-if="spectrumData.lowPos !== null" class="absolute top-0 bottom-0 w-0.5 bg-rose-500 shadow-md z-10" :style="{ left: `${spectrumData.lowPos}%` }">
              <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                {{ formatCurrency(spectrumData.lowVal, currency) }}
              </div>
              <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-rose-400 whitespace-nowrap">
                Low
              </div>
            </div>

            <div v-if="spectrumData.meanPos !== null" class="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-md z-20" :style="{ left: `${spectrumData.meanPos}%` }">
              <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                {{ formatCurrency(spectrumData.meanVal, currency) }}
              </div>
              <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-amber-400 whitespace-nowrap">
                Moyen
              </div>
            </div>

            <div v-if="spectrumData.highPos !== null" class="absolute top-0 bottom-0 w-0.5 bg-emerald-400 shadow-md z-10" :style="{ left: `${spectrumData.highPos}%` }">
              <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white whitespace-nowrap">
                {{ formatCurrency(spectrumData.highVal, currency) }}
              </div>
              <div class="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-semibold text-emerald-400 whitespace-nowrap">
                High
              </div>
            </div>

            <div class="absolute top-0 bottom-0 w-1 bg-white z-30 shadow-lg" :style="{ left: `${spectrumData.pricePos}%` }">
              <div class="absolute bottom-full mb-1 -translate-x-1/2 text-[11px] font-mono font-bold text-white bg-zinc-900/90 px-1 rounded border border-zinc-700 whitespace-nowrap">
                {{ formatCurrency(spectrumData.priceVal, currency) }}
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
