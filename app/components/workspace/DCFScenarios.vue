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
    <div class="grid gap-4 md:grid-cols-3">
      <div class="rounded-xl border border-rose-500/20 bg-rose-950/10 p-5 space-y-3">
        <div class="flex justify-between items-center">
          <span class="font-bold text-rose-400 text-sm">🐻 Scénario Bear</span>
          <span class="text-xs font-mono text-rose-300/80">-{{ (riskSpread * 100).toFixed(0) }}% spread</span>
        </div>
        <div class="text-2xl font-black text-white">
          {{ formatCurrency(scenarios.bear.fairValue, currency) }}
        </div>
        <div class="text-xs text-gray-400 space-y-1">
          <div>MoS : <span class="font-semibold text-rose-300">{{ formatPercent(scenarios.bear.marginOfSafety) }}</span></div>
          <div>Target Price 5Y : <span class="text-gray-300">{{ formatCurrency(scenarios.bear.targetPrice5Y, currency) }}</span></div>
        </div>
      </div>

      <div class="rounded-xl border border-amber-500/20 bg-amber-950/10 p-5 space-y-3">
        <div class="flex justify-between items-center">
          <span class="font-bold text-amber-400 text-sm">⚖️ Scénario Base</span>
          <span class="text-xs font-mono text-amber-300/80">Hypothèses Clés</span>
        </div>
        <div class="text-2xl font-black text-white">
          {{ formatCurrency(scenarios.base.fairValue, currency) }}
        </div>
        <div class="text-xs text-gray-400 space-y-1">
          <div>MoS : <span class="font-semibold text-amber-300">{{ formatPercent(scenarios.base.marginOfSafety) }}</span></div>
          <div>Target Price 5Y : <span class="text-gray-300">{{ formatCurrency(scenarios.base.targetPrice5Y, currency) }}</span></div>
        </div>
      </div>

      <div class="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-5 space-y-3">
        <div class="flex justify-between items-center">
          <span class="font-bold text-emerald-400 text-sm">🚀 Scénario Bull</span>
          <span class="text-xs font-mono text-emerald-300/80">+{{ (riskSpread * 100).toFixed(0) }}% spread</span>
        </div>
        <div class="text-2xl font-black text-white">
          {{ formatCurrency(scenarios.bull.fairValue, currency) }}
        </div>
        <div class="text-xs text-gray-400 space-y-1">
          <div>MoS : <span class="font-semibold text-emerald-300">{{ formatPercent(scenarios.bull.marginOfSafety) }}</span></div>
          <div>Target Price 5Y : <span class="text-gray-300">{{ formatCurrency(scenarios.bull.targetPrice5Y, currency) }}</span></div>
        </div>
      </div>
    </div>

    <!-- Reverse DCF -->
    <div class="rounded-2xl border border-gray-800 bg-gray-950/70 p-6 space-y-4 shadow-xl backdrop-blur">
      <h3 class="text-base font-bold text-white flex items-center gap-2">
        <span>🔄</span>
        <span>Reverse DCF (Implicite Marché)</span>
      </h3>
      <p class="text-xs text-gray-400">
        Au cours actuel de <span class="font-semibold text-white">{{ formatCurrency(currentPrice, currency) }}</span>, le marché anticipe un taux de croissance annuel du CA de :
      </p>
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 rounded-xl bg-gray-900 border border-gray-800 p-5">
        <div>
          <div class="text-xs text-gray-400 uppercase tracking-wider font-semibold">Croissance Implicite Requis</div>
          <div class="text-3xl font-extrabold text-amber-400">
            {{ (reverseDCF.impliedGrowth * 100).toFixed(1) }}% <span class="text-xs font-normal text-gray-400">/ an</span>
          </div>
        </div>
        <div class="text-xs text-gray-400 sm:border-l border-gray-800 sm:pl-6 space-y-1">
          <div>Prix Cible 5Y Implicite : <span class="font-semibold text-white">{{ formatCurrency(reverseDCF.targetPrice5YMarket, currency) }}</span></div>
          <div>Bénéfices 5Y Implicites : <span class="font-semibold text-white">{{ formatScaledCurrency(reverseDCF.earnings5YMarket, currency) }}</span></div>
          <div>CA 5Y Implicite : <span class="font-semibold text-white">{{ formatScaledCurrency(reverseDCF.revenue5YMarket, currency) }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
