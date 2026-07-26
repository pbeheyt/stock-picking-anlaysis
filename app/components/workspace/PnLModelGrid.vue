<script setup lang="ts">
import type { Stock, GrowthMode, MarginMode } from '~/types/database.types'
import type { ScenarioResults } from '~/utils/valuation'
import type { QuantitativeAIResult } from '~/types/ai.types'
import { formatScaledCurrency, formatPercent } from '~/utils/format'

export interface ProjectionItem {
  year: number
  growth: number
  revenue: number
  margin: number
  earnings: number
}

export interface ActiveCellFocus {
  type: 'growth' | 'margin' | 'revenue'
  yearIndex: number
}

const props = defineProps<{
  stock: Stock
  scenarios: ScenarioResults
  revenueProjections: ProjectionItem[]
  growthMode: GrowthMode
  marginMode: MarginMode
  growth: number
  growthY1: number
  growthY2: number
  growthY3: number
  growthY4: number
  growthY5: number
  margin: number
  marginY1: number
  marginY2: number
  marginY3: number
  marginY4: number
  marginY5: number
  quantAiResult: QuantitativeAIResult | null
}>()

const emit = defineEmits<{
  (e: 'update:growthY', yearIndex: number, newRate: number): void
  (e: 'update:marginY', yearIndex: number, newMargin: number): void
  (e: 'update:revenueForYear', yearIndex: number, newRevenueVal: number): void
  (e: 'propagateGrowth', yearIndex: number, currentRate: number): void
  (e: 'propagateMargin', yearIndex: number, currentMargin: number): void
  (e: 'openAiModal'): void
  (e: 'openAuditDrawer'): void
}>()

// Active Cell Focus for Side Inspector Panel
const activeCell = ref<ActiveCellFocus>({ type: 'growth', yearIndex: 0 })

const selectCell = (type: 'growth' | 'margin' | 'revenue', yearIndex: number) => {
  activeCell.value = { type, yearIndex }
}

const activeGrowthVal = computed({
  get: () => {
    const idx = activeCell.value.yearIndex
    const refs = [props.growthY1, props.growthY2, props.growthY3, props.growthY4, props.growthY5]
    const val = props.growthMode === 'explicit' ? refs[idx] : props.growth
    return parseFloat((val * 100).toFixed(2))
  },
  set: (valInPercent: number) => {
    emit('update:growthY', activeCell.value.yearIndex, valInPercent / 100)
  },
})

const activeMarginVal = computed({
  get: () => {
    const idx = activeCell.value.yearIndex
    const refs = [props.marginY1, props.marginY2, props.marginY3, props.marginY4, props.marginY5]
    const val = props.marginMode === 'explicit' ? refs[idx] : props.margin
    return parseFloat((val * 100).toFixed(2))
  },
  set: (valInPercent: number) => {
    emit('update:marginY', activeCell.value.yearIndex, valInPercent / 100)
  },
})

const activeRevenueScaleUnit = ref<'B' | 'M' | 'K' | '1'>('B')

const activeRevenueScaledVal = computed({
  get: () => {
    const proj = props.revenueProjections[activeCell.value.yearIndex]
    if (!proj) return 0
    const raw = proj.revenue
    let mult = 1e9
    if (activeRevenueScaleUnit.value === 'M') mult = 1e6
    else if (activeRevenueScaleUnit.value === 'K') mult = 1e3
    else if (activeRevenueScaleUnit.value === '1') mult = 1
    return parseFloat((raw / mult).toFixed(3))
  },
  set: (scaledVal: number) => {
    let mult = 1e9
    if (activeRevenueScaleUnit.value === 'M') mult = 1e6
    else if (activeRevenueScaleUnit.value === 'K') mult = 1e3
    else if (activeRevenueScaleUnit.value === '1') mult = 1

    emit('update:revenueForYear', activeCell.value.yearIndex, scaledVal * mult)
  },
})

const triggerPropagateGrowth = () => {
  emit('propagateGrowth', activeCell.value.yearIndex, activeGrowthVal.value / 100)
}

const triggerPropagateMargin = () => {
  emit('propagateMargin', activeCell.value.yearIndex, activeMarginVal.value / 100)
}

// Long-press step timer engine
let stepInterval: ReturnType<typeof setInterval> | null = null
let stepTimeout: ReturnType<typeof setTimeout> | null = null

const startStep = (type: 'growth' | 'margin', isIncrement: boolean) => {
  stopStep()
  let ticks = 0

  const applyStep = () => {
    ticks++
    let stepSize = 0.1
    if (ticks > 25) stepSize = 1.0
    else if (ticks > 14) stepSize = 0.5
    else if (ticks > 6) stepSize = 0.2

    const delta = isIncrement ? stepSize : -stepSize

    if (type === 'growth') {
      const min = -50, max = 150
      const newVal = activeGrowthVal.value + delta
      activeGrowthVal.value = parseFloat(Math.min(max, Math.max(min, newVal)).toFixed(1))
    } else {
      const min = -50, max = 80
      const newVal = activeMarginVal.value + delta
      activeMarginVal.value = parseFloat(Math.min(max, Math.max(min, newVal)).toFixed(1))
    }
  }

  applyStep()

  stepTimeout = setTimeout(() => {
    stepInterval = setInterval(applyStep, 50)
  }, 220)
}

const stopStep = () => {
  if (stepTimeout) {
    clearTimeout(stepTimeout)
    stepTimeout = null
  }
  if (stepInterval) {
    clearInterval(stepInterval)
    stepInterval = null
  }
}
</script>

<template>
  <div class="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 shadow-xl backdrop-blur overflow-hidden">
    <!-- Header -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 p-5">
      <div>
        <h2 class="text-xs font-bold text-white uppercase tracking-wider font-mono">
          Modèle Financier P&L Unifié (5Y)
        </h2>
        <p class="text-xs text-zinc-400 mt-0.5">Cliquez une cellule pour l'éditer dans l'inspecteur à droite. Modifications recalculées en temps réel.</p>
      </div>
      <div class="flex items-center gap-2 self-start sm:self-auto font-mono">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition shadow"
          @click="emit('openAiModal')"
        >
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Enrichir avec l'IA</span>
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-700 px-3.5 py-2 text-xs font-bold text-zinc-300 hover:text-white hover:border-zinc-600 transition shadow"
          @click="emit('openAuditDrawer')"
        >
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Audit Trail & Sources</span>
          <span v-if="quantAiResult" class="w-2 h-2 rounded-full bg-emerald-400"></span>
        </button>
      </div>
    </div>

    <!-- Body : Table + Inspector -->
    <div class="flex flex-col lg:flex-row gap-6 p-5">
      <!-- ── GAUCHE : Tableau P&L Rétro-Stable ── -->
      <div class="flex-1 min-w-0 overflow-x-auto">
        <table class="w-full border-collapse text-xs table-fixed font-mono tabular-nums">
          <thead>
            <tr class="border-b border-zinc-800 bg-zinc-950/80 text-zinc-400 text-[10px] uppercase tracking-wider">
              <th class="py-2.5 px-3 font-semibold text-left w-36">Poste P&L</th>
              <th class="py-2.5 px-2 text-right font-semibold w-20">TTM</th>
              <th
                v-for="item in revenueProjections"
                :key="item.year"
                class="py-2.5 px-2 text-right font-semibold w-20"
              >An {{ item.year }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-800/50">

            <!-- Row 1 : Croissance CA (%) -->
            <tr class="transition">
              <td class="py-2.5 px-3 text-zinc-300 font-sans font-medium text-[11px] whitespace-nowrap truncate">Croissance CA</td>
              <td class="py-2.5 px-2 text-right text-zinc-600 font-mono text-[11px]">—</td>
              <td
                v-for="(item, idx) in revenueProjections"
                :key="idx"
                class="py-2.5 px-2 text-right font-mono font-semibold text-[11px] cursor-pointer transition-all duration-150"
                :class="[
                  activeCell.type === 'growth' && activeCell.yearIndex === idx
                    ? (item.growth >= 0 ? 'bg-emerald-500/15 ring-1 ring-inset ring-emerald-500/50' : 'bg-rose-500/15 ring-1 ring-inset ring-rose-500/50')
                    : 'hover:bg-zinc-800/40',
                  item.growth > 0 ? 'text-emerald-400' : item.growth < 0 ? 'text-rose-400' : 'text-zinc-400'
                ]"
                @click="selectCell('growth', idx)"
              >
                {{ formatPercent(item.growth, true) }}
              </td>
            </tr>

            <!-- Row 2 : Chiffre d'Affaires -->
            <tr class="bg-zinc-950/25 transition">
              <td class="py-2.5 px-3 text-white font-sans font-semibold text-[11px] whitespace-nowrap truncate">Chiffre d'Affaires</td>
              <td class="py-2.5 px-2 text-right font-mono text-zinc-400 font-semibold text-[11px]">
                {{ formatScaledCurrency(stock.revenue_ttm, stock.currency) }}
              </td>
              <td
                v-for="(item, idx) in revenueProjections"
                :key="idx"
                class="py-2.5 px-2 text-right font-mono font-bold text-[11px] cursor-pointer transition-all duration-150 text-white"
                :class="activeCell.type === 'revenue' && activeCell.yearIndex === idx
                  ? 'bg-emerald-500/15 text-emerald-200 ring-1 ring-inset ring-emerald-500/50'
                  : 'hover:bg-zinc-800/40'"
                @click="selectCell('revenue', idx)"
              >
                {{ formatScaledCurrency(item.revenue, stock.currency) }}
              </td>
            </tr>

            <!-- Row 3 : Marge Nette -->
            <tr class="transition">
              <td class="py-2.5 px-3 text-zinc-300 font-sans font-medium text-[11px] whitespace-nowrap truncate">Marge Nette</td>
              <td
                class="py-2.5 px-2 text-right font-mono text-[11px]"
                :class="(stock.margin_net_raw || 0) >= 0 ? 'text-zinc-400' : 'text-rose-400'"
              >
                {{ formatPercent(stock.margin_net_raw, true, 1, false) }}
              </td>
              <td
                v-for="(item, idx) in revenueProjections"
                :key="idx"
                class="py-2.5 px-2 text-right font-mono font-semibold text-[11px] cursor-pointer transition-all duration-150"
                :class="[
                  activeCell.type === 'margin' && activeCell.yearIndex === idx
                    ? (item.margin >= 0 ? 'bg-sky-500/15 ring-1 ring-inset ring-sky-500/50' : 'bg-rose-500/15 ring-1 ring-inset ring-rose-500/50')
                    : 'hover:bg-zinc-800/40',
                  item.margin > 0 ? 'text-sky-400' : item.margin < 0 ? 'text-rose-400 font-bold' : 'text-zinc-400'
                ]"
                @click="selectCell('margin', idx)"
              >
                {{ formatPercent(item.margin, true, 1, false) }}
              </td>
            </tr>

            <!-- Row 4 : Résultat Net -->
            <tr class="bg-zinc-950/40 border-t border-zinc-800">
              <td class="py-2.5 px-3 font-sans font-bold text-zinc-200 text-[11px] whitespace-nowrap truncate">Résultat Net</td>
              <td
                class="py-2.5 px-2 text-right font-mono font-semibold text-[11px]"
                :class="((stock.revenue_ttm || 0) * (stock.margin_net_raw || 0)) >= 0 ? 'text-zinc-300' : 'text-rose-400 font-bold'"
              >
                {{ formatScaledCurrency((stock.revenue_ttm || 0) * (stock.margin_net_raw || 0), stock.currency) }}
              </td>
              <td
                v-for="(item, idx) in revenueProjections"
                :key="idx"
                class="py-2.5 px-2 text-right font-mono font-bold text-[11px]"
                :class="item.earnings > 0 ? 'text-emerald-400' : item.earnings < 0 ? 'text-rose-400 bg-rose-500/10' : 'text-zinc-400'"
              >
                {{ formatScaledCurrency(item.earnings, stock.currency) }}
              </td>
            </tr>

          </tbody>
        </table>

        <!-- Synthèse P&L An 5 -->
        <div class="flex flex-wrap gap-6 p-3 mt-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-xs font-mono">
          <div>
            <span class="text-zinc-400">Chiffre d'Affaires An 5 : </span>
            <span class="font-bold text-emerald-400 ml-1">{{ formatScaledCurrency(scenarios.base.revenue5Y, stock.currency) }}</span>
          </div>
          <div>
            <span class="text-zinc-400">Résultat Net An 5 : </span>
            <span
              class="font-bold ml-1"
              :class="scenarios.base.earnings5Y >= 0 ? 'text-emerald-400' : 'text-rose-400'"
            >{{ formatScaledCurrency(scenarios.base.earnings5Y, stock.currency) }}</span>
          </div>
          <div>
            <span class="text-zinc-400">CAGR Équivalent : </span>
            <span
              class="font-bold ml-1"
              :class="scenarios.base.equivalentCAGR >= 0 ? 'text-emerald-400' : 'text-rose-400'"
            >{{ formatPercent(scenarios.base.equivalentCAGR, true) }}</span>
          </div>
        </div>
      </div>

      <!-- ── DROITE : Inspecteur Latéral Contextuel Fixe ── -->
      <div class="w-full lg:w-60 flex-shrink-0 bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 space-y-4 font-mono">
        <!-- Header Inspecteur -->
        <div class="border-b border-zinc-800 pb-3">
          <div class="flex items-center gap-1.5 mb-0.5">
            <div
              class="w-1.5 h-1.5 rounded-full flex-shrink-0"
              :class="{
                'bg-emerald-400': activeCell.type === 'growth' && activeGrowthVal >= 0,
                'bg-rose-400': (activeCell.type === 'growth' && activeGrowthVal < 0) || (activeCell.type === 'margin' && activeMarginVal < 0),
                'bg-sky-400': activeCell.type === 'margin' && activeMarginVal >= 0,
                'bg-white': activeCell.type === 'revenue',
              }"
            ></div>
            <span class="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Inspecteur</span>
          </div>
          <p class="text-xs font-bold text-white truncate">
            <span v-if="activeCell.type === 'growth'">Croissance — An {{ activeCell.yearIndex + 1 }}</span>
            <span v-else-if="activeCell.type === 'margin'">Marge Nette — An {{ activeCell.yearIndex + 1 }}</span>
            <span v-else>Chiffre d'Affaires — An {{ activeCell.yearIndex + 1 }}</span>
          </p>
        </div>

        <!-- ── Cas : Croissance CA ── -->
        <div v-if="activeCell.type === 'growth'" class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[11px] text-zinc-400">Croissance — An {{ activeCell.yearIndex + 1 }}</span>
            <span
              class="font-mono text-xs font-bold"
              :class="activeGrowthVal >= 0 ? 'text-emerald-400' : 'text-rose-400'"
            >{{ activeGrowthVal.toFixed(1) }}%</span>
          </div>
          <div class="flex items-center gap-1">
            <button
              type="button"
              class="h-7 w-7 rounded bg-zinc-800 border border-zinc-700 text-sm font-black text-zinc-200 hover:bg-zinc-700 hover:text-white transition flex-shrink-0 flex items-center justify-center select-none"
              @mousedown="startStep('growth', false)"
              @mouseleave="stopStep"
              @mouseup="stopStep"
              @touchstart.prevent="startStep('growth', false)"
              @touchend="stopStep"
            >−</button>
            <input
              v-model.number="activeGrowthVal"
              type="number"
              step="0.1"
              class="h-7 w-14 rounded-md bg-zinc-950 border border-zinc-700 px-1 text-xs font-mono text-white text-center focus:border-emerald-500 focus:outline-none flex-shrink-0"
            />
            <button
              type="button"
              class="h-7 w-7 rounded bg-zinc-800 border border-zinc-700 text-sm font-black text-zinc-200 hover:bg-zinc-700 hover:text-white transition flex-shrink-0 flex items-center justify-center select-none"
              @mousedown="startStep('growth', true)"
              @mouseleave="stopStep"
              @mouseup="stopStep"
              @touchstart.prevent="startStep('growth', true)"
              @touchend="stopStep"
            >+</button>
            <button
              type="button"
              class="h-7 ml-auto rounded bg-zinc-800 border border-zinc-700 px-2 text-[10px] font-bold text-zinc-300 hover:bg-emerald-800/60 hover:text-emerald-300 hover:border-emerald-600 transition flex-shrink-0 flex items-center justify-center font-sans"
              :title="`Propager cette croissance (An ${activeCell.yearIndex + 1} → An 5)`"
              @click="triggerPropagateGrowth"
            >An {{ activeCell.yearIndex + 1 }} ➔ 5</button>
          </div>
          <input
            v-model.number="activeGrowthVal"
            type="range"
            min="-50"
            max="150"
            step="0.5"
            class="w-full block"
            :class="activeGrowthVal >= 0 ? 'accent-emerald-500' : 'accent-rose-500'"
          />
        </div>

        <!-- ── Cas : Marge Nette ── -->
        <div v-else-if="activeCell.type === 'margin'" class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[11px] text-zinc-400">Marge — An {{ activeCell.yearIndex + 1 }}</span>
            <span
              class="font-mono text-xs font-bold"
              :class="activeMarginVal >= 0 ? 'text-sky-400' : 'text-rose-400'"
            >{{ activeMarginVal.toFixed(1) }}%</span>
          </div>
          <div class="flex items-center gap-1">
            <button
              type="button"
              class="h-7 w-7 rounded bg-zinc-800 border border-zinc-700 text-sm font-black text-zinc-200 hover:bg-zinc-700 hover:text-white transition flex-shrink-0 flex items-center justify-center select-none"
              @mousedown="startStep('margin', false)"
              @mouseleave="stopStep"
              @mouseup="stopStep"
              @touchstart.prevent="startStep('margin', false)"
              @touchend="stopStep"
            >−</button>
            <input
              v-model.number="activeMarginVal"
              type="number"
              step="0.1"
              class="h-7 w-14 rounded-md bg-zinc-950 border border-zinc-700 px-1 text-xs font-mono text-white text-center focus:border-sky-500 focus:outline-none flex-shrink-0"
            />
            <button
              type="button"
              class="h-7 w-7 rounded bg-zinc-800 border border-zinc-700 text-sm font-black text-zinc-200 hover:bg-zinc-700 hover:text-white transition flex-shrink-0 flex items-center justify-center select-none"
              @mousedown="startStep('margin', true)"
              @mouseleave="stopStep"
              @mouseup="stopStep"
              @touchstart.prevent="startStep('margin', true)"
              @touchend="stopStep"
            >+</button>
            <button
              type="button"
              class="h-7 ml-auto rounded bg-zinc-800 border border-zinc-700 px-2 text-[10px] font-bold text-zinc-300 hover:bg-sky-800/60 hover:text-sky-300 hover:border-sky-600 transition flex-shrink-0 flex items-center justify-center font-sans"
              :title="`Propager cette marge (An ${activeCell.yearIndex + 1} → An 5)`"
              @click="triggerPropagateMargin"
            >An {{ activeCell.yearIndex + 1 }} ➔ 5</button>
          </div>
          <input
            v-model.number="activeMarginVal"
            type="range"
            min="-50"
            max="80"
            step="0.5"
            class="w-full block"
            :class="activeMarginVal >= 0 ? 'accent-sky-500' : 'accent-rose-500'"
          />
        </div>

        <!-- ── Cas : Chiffre d'Affaires ── -->
        <div v-else-if="activeCell.type === 'revenue'" class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[11px] text-zinc-400">CA — An {{ activeCell.yearIndex + 1 }}</span>
            <span class="font-mono text-white text-xs font-bold">{{ formatScaledCurrency(revenueProjections[activeCell.yearIndex]?.revenue, stock.currency) }}</span>
          </div>
          <div class="flex items-center justify-start gap-1.5">
            <input
              v-model.number="activeRevenueScaledVal"
              type="number"
              step="0.01"
              class="h-7 w-24 rounded-md bg-zinc-950 border border-zinc-700 px-2 text-xs font-mono text-white text-right focus:border-emerald-500 focus:outline-none flex-shrink-0"
            />
            <select
              v-model="activeRevenueScaleUnit"
              class="h-7 w-14 rounded-md bg-zinc-950 border border-zinc-700 px-1 text-xs font-mono text-emerald-400 font-bold focus:border-emerald-500 focus:outline-none flex-shrink-0 cursor-pointer"
            >
              <option value="B">Mds</option>
              <option value="M">M</option>
              <option value="K">K</option>
              <option value="1">$</option>
            </select>
          </div>
          <div class="h-5"></div>
        </div>

      </div>
    </div>
  </div>
</template>

