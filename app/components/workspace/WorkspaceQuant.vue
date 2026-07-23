<script setup lang="ts">
import * as echarts from 'echarts'
import {
  calculateQuantAnalysis,
  type HistoryPoint,
  type QuantAnalysisResult,
} from '~/utils/quant'
import {
  formatCurrency,
  formatPercent,
  formatNumber,
} from '~/utils/format'

const props = defineProps<{
  ticker: string
  currency?: string
  currentPrice?: number | null
}>()

const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

const rawHistory = ref<HistoryPoint[]>([])
const dividendYield = ref<number | null>(null)
const dividendRate = ref<number | null>(null)

const minIndex = ref(0)
const maxIndex = ref(0)
const activePreset = ref<'1Y' | '3Y' | '5Y' | '10Y' | 'ALL'>('ALL')

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const fetchHistory = async () => {
  isLoading.value = true
  errorMessage.value = null
  try {
    const res = await $fetch<{
      ticker: string
      currency: string
      dividendYield: number | null
      dividendRate: number | null
      history: HistoryPoint[]
    }>(`/api/stock/${encodeURIComponent(props.ticker)}/history`)

    rawHistory.value = res.history || []
    dividendYield.value = res.dividendYield
    dividendRate.value = res.dividendRate

    minIndex.value = 0
    maxIndex.value = Math.max(0, rawHistory.value.length - 1)
    setPreset('ALL')
  } catch (err: any) {
    errorMessage.value = err?.data?.statusMessage || err?.message || 'Impossible de charger l\'historique'
  } finally {
    isLoading.value = false
  }
}

const setPreset = (preset: '1Y' | '3Y' | '5Y' | '10Y' | 'ALL') => {
  activePreset.value = preset
  if (!rawHistory.value.length) return

  const total = rawHistory.value.length
  maxIndex.value = total - 1

  let weeks = total
  if (preset === '1Y') weeks = 52
  else if (preset === '3Y') weeks = 156
  else if (preset === '5Y') weeks = 260
  else if (preset === '10Y') weeks = 520

  minIndex.value = Math.max(0, total - weeks)
}

const filteredHistory = computed(() => {
  if (!rawHistory.value.length) return []
  const start = Math.min(minIndex.value, maxIndex.value)
  const end = Math.max(minIndex.value, maxIndex.value)
  return rawHistory.value.slice(start, end + 1)
})

const quantResult = computed<QuantAnalysisResult | null>(() => {
  if (!filteredHistory.value.length) return null
  return calculateQuantAnalysis(filteredHistory.value, rawHistory.value)
})

const findClosestDateIndex = (dateStr: string): number => {
  if (!rawHistory.value.length || !dateStr) return 0
  const targetTime = new Date(dateStr).getTime()
  if (isNaN(targetTime)) return 0

  let closestIdx = 0
  let minDiff = Infinity

  for (let i = 0; i < rawHistory.value.length; i++) {
    const time = new Date(rawHistory.value[i].date).getTime()
    const diff = Math.abs(time - targetTime)
    if (diff < minDiff) {
      minDiff = diff
      closestIdx = i
    }
  }

  return closestIdx
}

const startDateInput = computed({
  get: () => rawHistory.value[minIndex.value]?.date || '',
  set: (val: string) => {
    if (!val) return
    const idx = findClosestDateIndex(val)
    if (idx < maxIndex.value) {
      minIndex.value = idx
      activePreset.value = '' as any
    }
  },
})

const endDateInput = computed({
  get: () => rawHistory.value[maxIndex.value]?.date || '',
  set: (val: string) => {
    if (!val) return
    const idx = findClosestDateIndex(val)
    if (idx > minIndex.value) {
      maxIndex.value = idx
      activePreset.value = '' as any
    }
  },
})

const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

const renderChart = () => {
  if (!chartRef.value || !quantResult.value) return

  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value)
  }

  const { chartData } = quantResult.value
  const histLen = chartData.dates.length
  const futLen = chartData.futureDates.length

  const allDates = [...chartData.dates, ...chartData.futureDates]

  const closesExtended = [
    ...chartData.closes,
    ...Array(futLen).fill(null),
  ]

  const regHistExtended = [
    ...chartData.regressionLine,
    ...Array(futLen).fill(null),
  ]

  const plus1HistExtended = [
    ...chartData.plus1SigmaLine,
    ...Array(futLen).fill(null),
  ]

  const plus2HistExtended = [
    ...chartData.plus2SigmaLine,
    ...Array(futLen).fill(null),
  ]

  const minus1HistExtended = [
    ...chartData.minus1SigmaLine,
    ...Array(futLen).fill(null),
  ]

  const minus2HistExtended = [
    ...chartData.minus2SigmaLine,
    ...Array(futLen).fill(null),
  ]

  const futRegExtended = [
    ...Array(histLen - 1).fill(null),
    chartData.regressionLine[histLen - 1],
    ...chartData.futureRegressionLine,
  ]

  const todayIndex = histLen - 1

  const curr = props.currency || 'USD'
  const symbol = curr === 'EUR' ? '€' : '$'

  const allVals = [
    ...chartData.closes.filter((v): v is number => v !== null && v > 0),
    ...chartData.minus2SigmaLine.filter((v): v is number => v !== null && v > 0),
    ...chartData.plus2SigmaLine.filter((v): v is number => v !== null && v > 0),
  ]
  const dataMin = allVals.length ? Math.min(...allVals) : 1
  const dataMax = allVals.length ? Math.max(...allVals) : 100
  const yMin = Math.max(0.001, Number((dataMin * 0.92).toPrecision(4)))
  const yMax = Number((dataMax * 1.08).toPrecision(4))

  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    grid: {
      top: 20,
      right: 25,
      bottom: 40,
      left: 60,
      containLabel: false,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#111827',
      borderColor: '#374151',
      textStyle: { color: '#f3f4f6', fontSize: 12 },
      formatter: (params: any) => {
        if (!Array.isArray(params) || !params.length) return ''
        const dateStr = params[0].axisValue
        let html = `<div class="font-bold text-gray-200 mb-1">${dateStr}</div>`

        params.forEach((p: any) => {
          if (p.value !== null && p.value !== undefined) {
            const valFormatted = `${Number(p.value).toFixed(2)} ${symbol}`
            html += `<div class="flex items-center justify-between gap-4 text-xs">
              <span style="color:${p.color}">${p.seriesName}:</span>
              <span class="font-mono font-bold">${valFormatted}</span>
            </div>`
          }
        })

        return html
      },
    },
    xAxis: {
      type: 'category',
      data: allDates,
      boundaryGap: false,
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: { color: '#9ca3af', fontSize: 11 },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'log',
      logBase: 10,
      min: yMin,
      max: yMax,
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: {
        color: '#9ca3af',
        fontSize: 11,
        formatter: (val: number) => `${val >= 1000 ? (val / 1000).toFixed(1) + 'k' : val.toFixed(val < 10 ? 2 : 0)} ${symbol}`,
      },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } },
    },
    series: [
      {
        name: 'Cours Réel',
        type: 'line',
        data: closesExtended,
        showSymbol: false,
        lineStyle: { width: 2, color: '#38bdf8' },
        itemStyle: { color: '#38bdf8' },
        markLine: {
          symbol: 'none',
          data: [
            {
              xAxis: todayIndex,
              lineStyle: { color: '#9ca3af', type: 'dashed', width: 1.5 },
              label: {
                show: true,
                formatter: 'Aujourd\'hui',
                position: 'end',
                color: '#9ca3af',
                fontSize: 10,
              },
            },
          ],
        },
      },
      {
        name: 'Régression centrale',
        type: 'line',
        data: regHistExtended,
        showSymbol: false,
        lineStyle: { width: 2, color: '#f97316' },
        itemStyle: { color: '#f97316' },
      },
      {
        name: '+2σ (Sur-achat)',
        type: 'line',
        data: plus2HistExtended,
        showSymbol: false,
        lineStyle: { width: 1, color: 'rgba(239, 68, 68, 0.6)', type: 'dashed' },
        itemStyle: { color: '#ef4444' },
      },
      {
        name: '+1σ',
        type: 'line',
        data: plus1HistExtended,
        showSymbol: false,
        lineStyle: { width: 1, color: 'rgba(251, 191, 36, 0.5)', type: 'dashed' },
        itemStyle: { color: '#fbbf24' },
      },
      {
        name: '-1σ',
        type: 'line',
        data: minus1HistExtended,
        showSymbol: false,
        lineStyle: { width: 1, color: 'rgba(251, 191, 36, 0.5)', type: 'dashed' },
        itemStyle: { color: '#fbbf24' },
      },
      {
        name: '-2σ (Opportunité)',
        type: 'line',
        data: minus2HistExtended,
        showSymbol: false,
        lineStyle: { width: 1, color: 'rgba(52, 211, 153, 0.6)', type: 'dashed' },
        itemStyle: { color: '#34d399' },
      },
      {
        name: 'Projection +5Y',
        type: 'line',
        data: futRegExtended,
        showSymbol: false,
        lineStyle: { width: 2, color: '#f97316', type: 'dotted' },
        itemStyle: { color: '#f97316' },
      },
    ],
  }

  chartInstance.setOption(option, true)
}

watch(quantResult, () => {
  nextTick(() => {
    renderChart()
  })
}, { immediate: true })

onMounted(() => {
  fetchHistory()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})

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
  <div class="space-y-6">
    <div v-if="isLoading" class="py-16 text-center text-sm text-gray-400">
      <div class="inline-block h-6 w-6 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent mb-3" />
      <div>Chargement de l'historique boursier...</div>
    </div>

    <div v-else-if="errorMessage" class="rounded-xl border border-red-500/30 bg-red-950/40 p-6 text-sm text-red-300">
      {{ errorMessage }}
    </div>

    <div v-else-if="quantResult" class="space-y-6">
      <div class="rounded-2xl border border-gray-800 bg-gray-950/80 p-5 space-y-4 shadow-xl backdrop-blur">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Presets :</span>
            <div class="flex items-center gap-1 rounded-lg bg-gray-900 p-1 border border-gray-800">
              <button
                v-for="p in (['1Y', '3Y', '5Y', '10Y', 'ALL'] as const)"
                :key="p"
                type="button"
                class="rounded-md px-2.5 py-1 text-xs font-bold transition"
                :class="activePreset === p
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-gray-400 hover:text-gray-200'"
                @click="setPreset(p)"
              >
                {{ p }}
              </button>
            </div>
          </div>

          <div class="flex items-center gap-3 text-xs">
            <div class="flex items-center gap-1.5">
              <span class="text-gray-400 font-medium">Début :</span>
              <input
                v-model="startDateInput"
                type="date"
                :min="rawHistory[0]?.date"
                :max="endDateInput"
                class="rounded-lg bg-gray-900 border border-gray-800 px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none transition"
              >
            </div>
            <span class="text-gray-500 font-bold">→</span>
            <div class="flex items-center gap-1.5">
              <span class="text-gray-400 font-medium">Fin :</span>
              <input
                v-model="endDateInput"
                type="date"
                :min="startDateInput"
                :max="rawHistory[rawHistory.length - 1]?.date"
                class="rounded-lg bg-gray-900 border border-gray-800 px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none transition"
              >
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <div class="rounded-xl border border-gray-800 bg-gray-900/60 p-5 space-y-3 shadow-md">
          <div class="flex items-center gap-2 border-b border-gray-800 pb-2 text-sm font-bold text-white">
            <span>💰</span>
            <span>Données Actuelles</span>
          </div>

          <div class="space-y-2 text-xs">
            <div class="flex justify-between">
              <span class="text-gray-400">Cours actuel (P₀)</span>
              <span class="font-bold text-white font-mono">{{ formatCurrency(quantResult.currentPrice, currency) }}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-400">Valeur théorique (Régression)</span>
              <span class="font-bold text-gray-200 font-mono">{{ formatCurrency(quantResult.theoreticalPrice, currency) }}</span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-gray-400">Écart vs Régression</span>
              <span
                class="font-bold font-mono px-2 py-0.5 rounded text-xs"
                :class="quantResult.gapPercent <= 0 ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'"
              >
                {{ formatPercent(quantResult.gapPercent, true) }}
              </span>
            </div>

            <div v-if="dividendYield && dividendYield > 0" class="flex justify-between border-t border-gray-800/80 pt-2">
              <span class="text-gray-400">Rendement Dividende</span>
              <span class="font-bold text-emerald-400 font-mono">
                {{ formatPercent(dividendYield, true) }}
                <span v-if="dividendRate" class="text-[10px] text-gray-400">({{ formatCurrency(dividendRate, currency) }}/an)</span>
              </span>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-gray-800 bg-gray-900/60 p-5 space-y-3 shadow-md">
          <div class="flex items-center gap-2 border-b border-gray-800 pb-2 text-sm font-bold text-white">
            <span>📊</span>
            <span>Analyse du Canal (σ)</span>
          </div>

          <div class="space-y-2 text-xs font-mono">
            <div class="flex justify-between">
              <span class="text-gray-400 font-sans">Borne +2σ (Sur-achat)</span>
              <span class="text-rose-400 font-bold">{{ formatCurrency(quantResult.plus2Sigma, currency) }}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-400 font-sans">Borne +1σ</span>
              <span class="text-amber-400 font-bold">{{ formatCurrency(quantResult.plus1Sigma, currency) }}</span>
            </div>

            <div class="flex justify-between border-y border-orange-500/20 py-1 bg-orange-500/5 -mx-2 px-2 rounded">
              <span class="text-orange-400 font-sans font-bold">Régression Centrale</span>
              <span class="text-orange-400 font-bold">{{ formatCurrency(quantResult.theoreticalPrice, currency) }}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-400 font-sans">Borne -1σ</span>
              <span class="text-amber-400 font-bold">{{ formatCurrency(quantResult.minus1Sigma, currency) }}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-400 font-sans">Borne -2σ (Opportunité)</span>
              <span class="text-emerald-400 font-bold">{{ formatCurrency(quantResult.minus2Sigma, currency) }}</span>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-gray-800 bg-gray-900/60 p-5 space-y-3 shadow-md">
          <div class="flex items-center gap-2 border-b border-gray-800 pb-2 text-sm font-bold text-white">
            <span>🔮</span>
            <span>Prévisions & Perf</span>
          </div>

          <div class="space-y-2 text-xs">
            <div class="flex justify-between">
              <span class="text-gray-400">Perf passée 12M</span>
              <span
                class="font-bold font-mono"
                :class="(quantResult.perf12M ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'"
              >
                {{ formatPercent(quantResult.perf12M, true) }}
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-400">Perf passée 5 Ans</span>
              <span
                class="font-bold font-mono"
                :class="(quantResult.perf5Y ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'"
              >
                {{ formatPercent(quantResult.perf5Y, true) }}
              </span>
            </div>

            <div class="flex justify-between border-t border-gray-800/80 pt-2">
              <span class="text-gray-400">Prix théorique +5 Ans</span>
              <span class="font-bold text-emerald-400 font-mono text-sm">{{ formatCurrency(quantResult.projectedPrice5Y, currency) }}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-400">Date cible projection</span>
              <span class="font-bold text-gray-300 capitalize">{{ quantResult.targetDate5Y }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-gray-800 bg-gray-950/80 p-5 space-y-4 shadow-xl">
        <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400">Indicateurs de Régression & Momentum</h3>

        <div class="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div class="flex flex-col items-center bg-gray-900/60 p-3 rounded-xl border border-gray-800/80 text-center space-y-1">
            <div class="text-[11px] font-semibold text-gray-400 uppercase">CAGR Annuel</div>
            <div class="relative h-16 w-32">
              <svg viewBox="0 0 100 55" class="w-full h-full">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#374151" stroke-width="8" stroke-linecap="round" />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#34d399"
                  stroke-width="8"
                  stroke-linecap="round"
                  stroke-dasharray="125.66"
                  :stroke-dashoffset="getGaugeArc((quantResult.cagrHistorical + 0.1) / 0.5).strokeDashoffset"
                />
                <circle :cx="getGaugeArc((quantResult.cagrHistorical + 0.1) / 0.5).cx" :cy="getGaugeArc((quantResult.cagrHistorical + 0.1) / 0.5).cy" r="4" fill="#ffffff" />
              </svg>
            </div>
            <div class="font-mono text-sm font-bold text-emerald-400">{{ formatPercent(quantResult.cagrHistorical, true) }}</div>
          </div>

          <div class="flex flex-col items-center bg-gray-900/60 p-3 rounded-xl border border-gray-800/80 text-center space-y-1">
            <div class="text-[11px] font-semibold text-gray-400 uppercase">R² (Qualité)</div>
            <div class="relative h-16 w-32">
              <svg viewBox="0 0 100 55" class="w-full h-full">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#374151" stroke-width="8" stroke-linecap="round" />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  :stroke="quantResult.r2 >= 0.8 ? '#34d399' : quantResult.r2 >= 0.5 ? '#fbbf24' : '#ef4444'"
                  stroke-width="8"
                  stroke-linecap="round"
                  stroke-dasharray="125.66"
                  :stroke-dashoffset="getGaugeArc(quantResult.r2).strokeDashoffset"
                />
                <circle :cx="getGaugeArc(quantResult.r2).cx" :cy="getGaugeArc(quantResult.r2).cy" r="4" fill="#ffffff" />
              </svg>
            </div>
            <div class="font-mono text-sm font-bold text-white">{{ quantResult.r2.toFixed(2) }} / 1.0</div>
          </div>

          <div class="flex flex-col items-center bg-gray-900/60 p-3 rounded-xl border border-gray-800/80 text-center space-y-1">
            <div class="text-[11px] font-semibold text-gray-400 uppercase">Perf 12M</div>
            <div class="relative h-16 w-32">
              <svg viewBox="0 0 100 55" class="w-full h-full">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#374151" stroke-width="8" stroke-linecap="round" />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  :stroke="(quantResult.perf12M ?? 0) >= 0 ? '#34d399' : '#ef4444'"
                  stroke-width="8"
                  stroke-linecap="round"
                  stroke-dasharray="125.66"
                  :stroke-dashoffset="getGaugeArc(((quantResult.perf12M ?? 0) + 0.5) / 1.5).strokeDashoffset"
                />
                <circle :cx="getGaugeArc(((quantResult.perf12M ?? 0) + 0.5) / 1.5).cx" :cy="getGaugeArc(((quantResult.perf12M ?? 0) + 0.5) / 1.5).cy" r="4" fill="#ffffff" />
              </svg>
            </div>
            <div class="font-mono text-sm font-bold" :class="(quantResult.perf12M ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'">
              {{ formatPercent(quantResult.perf12M, true) }}
            </div>
          </div>

          <div class="flex flex-col items-center bg-gray-900/60 p-3 rounded-xl border border-gray-800/80 text-center space-y-1">
            <div class="text-[11px] font-semibold text-gray-400 uppercase">Perf 5 Ans</div>
            <div class="relative h-16 w-32">
              <svg viewBox="0 0 100 55" class="w-full h-full">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#374151" stroke-width="8" stroke-linecap="round" />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  :stroke="(quantResult.perf5Y ?? 0) >= 0 ? '#34d399' : '#ef4444'"
                  stroke-width="8"
                  stroke-linecap="round"
                  stroke-dasharray="125.66"
                  :stroke-dashoffset="getGaugeArc(((quantResult.perf5Y ?? 0) + 0.5) / 3.5).strokeDashoffset"
                />
                <circle :cx="getGaugeArc(((quantResult.perf5Y ?? 0) + 0.5) / 3.5).cx" :cy="getGaugeArc(((quantResult.perf5Y ?? 0) + 0.5) / 3.5).cy" r="4" fill="#ffffff" />
              </svg>
            </div>
            <div class="font-mono text-sm font-bold" :class="(quantResult.perf5Y ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'">
              {{ formatPercent(quantResult.perf5Y, true) }}
            </div>
          </div>

          <div class="flex flex-col items-center bg-gray-900/60 p-3 rounded-xl border border-gray-800/80 text-center space-y-1">
            <div class="text-[11px] font-semibold text-gray-400 uppercase">Position (σ)</div>
            <div class="relative h-16 w-32">
              <svg viewBox="0 0 100 55" class="w-full h-full">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#374151" stroke-width="8" stroke-linecap="round" />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  :stroke="quantResult.zScore <= -1 ? '#34d399' : quantResult.zScore >= 1 ? '#ef4444' : '#fbbf24'"
                  stroke-width="8"
                  stroke-linecap="round"
                  stroke-dasharray="125.66"
                  :stroke-dashoffset="getGaugeArc((quantResult.zScore + 2.5) / 5.0).strokeDashoffset"
                />
                <circle :cx="getGaugeArc((quantResult.zScore + 2.5) / 5.0).cx" :cy="getGaugeArc((quantResult.zScore + 2.5) / 5.0).cy" r="4" fill="#ffffff" />
              </svg>
            </div>
            <div class="font-mono text-sm font-bold" :class="quantResult.zScore <= -1 ? 'text-emerald-400' : quantResult.zScore >= 1 ? 'text-rose-400' : 'text-amber-400'">
              {{ quantResult.zScore > 0 ? '+' : '' }}{{ quantResult.zScore.toFixed(2) }}σ
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-gray-800 bg-gray-950/80 p-5 space-y-4 shadow-xl">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-white flex items-center gap-2">
            <span>📈</span>
            <span>Canal de Régression Log-Linéaire & Extrapolation</span>
          </h3>
          <span class="text-xs text-gray-500 font-mono">Axe Y : Logarithmique</span>
        </div>

        <div ref="chartRef" class="h-[420px] w-full" />
      </div>
    </div>
  </div>
</template>
