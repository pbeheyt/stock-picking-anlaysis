<script setup lang="ts">
import type { ScenarioResults, ReverseDCFResult } from '~/utils/valuation'
import { formatCurrency, formatScaledCurrency, formatPercent } from '~/utils/format'

defineProps<{
  scenarios: ScenarioResults
  reverseDCF: ReverseDCFResult
  currentPrice: number
  currency: string
  riskSpread: number
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- Scénarios Bear / Base / Bull -->
    <div class="grid gap-4 md:grid-cols-3 font-mono">
      <div class="rounded-xl border border-rose-500/20 bg-rose-950/10 p-5 space-y-3">
        <div class="flex justify-between items-center">
          <span class="font-bold text-rose-400 text-xs tracking-wider uppercase">Scénario Bear</span>
          <span class="text-[10px] text-rose-300/80">-{{ (riskSpread * 100).toFixed(0) }}% spread</span>
        </div>
        <div class="text-2xl font-black text-white">
          {{ formatCurrency(scenarios.bear.fairValue, currency) }}
        </div>
        <div class="text-xs text-zinc-400 space-y-1">
          <div>MoS : <span class="font-semibold text-rose-300">{{ formatPercent(scenarios.bear.marginOfSafety) }}</span></div>
          <div>Target Price 5Y : <span class="text-zinc-300">{{ formatCurrency(scenarios.bear.targetPrice5Y, currency) }}</span></div>
        </div>
      </div>

      <div class="rounded-xl border border-amber-500/20 bg-amber-950/10 p-5 space-y-3">
        <div class="flex justify-between items-center">
          <span class="font-bold text-amber-400 text-xs tracking-wider uppercase">Scénario Base</span>
          <span class="text-[10px] text-amber-300/80">Hypothèses Clés</span>
        </div>
        <div class="text-2xl font-black text-white">
          {{ formatCurrency(scenarios.base.fairValue, currency) }}
        </div>
        <div class="text-xs text-zinc-400 space-y-1">
          <div>MoS : <span class="font-semibold text-amber-300">{{ formatPercent(scenarios.base.marginOfSafety) }}</span></div>
          <div>Target Price 5Y : <span class="text-zinc-300">{{ formatCurrency(scenarios.base.targetPrice5Y, currency) }}</span></div>
        </div>
      </div>

      <div class="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-5 space-y-3">
        <div class="flex justify-between items-center">
          <span class="font-bold text-emerald-400 text-xs tracking-wider uppercase">Scénario Bull</span>
          <span class="text-[10px] text-emerald-300/80">+{{ (riskSpread * 100).toFixed(0) }}% spread</span>
        </div>
        <div class="text-2xl font-black text-white">
          {{ formatCurrency(scenarios.bull.fairValue, currency) }}
        </div>
        <div class="text-xs text-zinc-400 space-y-1">
          <div>MoS : <span class="font-semibold text-emerald-300">{{ formatPercent(scenarios.bull.marginOfSafety) }}</span></div>
          <div>Target Price 5Y : <span class="text-zinc-300">{{ formatCurrency(scenarios.bull.targetPrice5Y, currency) }}</span></div>
        </div>
      </div>
    </div>

    <!-- Reverse DCF -->
    <div class="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-6 space-y-4 shadow-xl backdrop-blur">
      <h3 class="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-zinc-800 pb-2.5 flex items-center gap-2">
        <span>Reverse DCF (Implicite Marché)</span>
      </h3>
      <p class="text-xs text-zinc-400">
        Au cours actuel de <span class="font-semibold text-white font-mono">{{ formatCurrency(currentPrice, currency) }}</span>, le marché anticipe un taux de croissance annuel du CA de :
      </p>
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 rounded-xl bg-zinc-900 border border-zinc-800 p-5 font-mono">
        <div>
          <div class="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Croissance Implicite Requis</div>
          <div class="text-2xl font-black text-amber-400">
            {{ (reverseDCF.impliedGrowth * 100).toFixed(1) }}% <span class="text-xs font-normal text-zinc-500">/ an</span>
          </div>
        </div>
        <div class="text-xs text-zinc-400 sm:border-l border-zinc-800 sm:pl-6 space-y-1">
          <div>Prix Cible 5Y Implicite : <span class="font-semibold text-white">{{ formatCurrency(reverseDCF.targetPrice5YMarket, currency) }}</span></div>
          <div>Bénéfices 5Y Implicites : <span class="font-semibold text-white">{{ formatScaledCurrency(reverseDCF.earnings5YMarket, currency) }}</span></div>
          <div>CA 5Y Implicite : <span class="font-semibold text-white">{{ formatScaledCurrency(reverseDCF.revenue5YMarket, currency) }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
