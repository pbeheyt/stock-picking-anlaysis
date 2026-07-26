<script setup lang="ts">
import * as echarts from 'echarts'
import InfoTooltip from '~/components/ui/InfoTooltip.vue'
import {
  calculateQuantAnalysis,
  findMaxR2Period,
  type HistoryPoint,
  type QuantAnalysisResult,
} from '~/utils/regression'
import {
  formatCurrency,
  formatCompactCurrency,
  formatPercent,
  formatCompactPercent,
  formatNumber,
  formatDurationYearsDecimal,
} from '~/utils/format'
import {
  getTrendColorClass,
  getProjectionColorClass,
  getR2ColorClass,
  getVolatilityColorClass,
  getZScoreColorClass,
  getMaxDrawdownColorClass,
  getCagrGaugeStroke,
  getR2GaugeStroke,
  getVolatilityGaugeStroke,
  getZScoreGaugeStroke,
  getMaxDrawdownGaugeStroke,
} from '~/utils/regressionColor'

const props = defineProps<{
  ticker: string
  currency?: string
  currentPrice?: number | null
  stockId?: string
  initialPreset?: string | null
  initialStartDate?: string | null
  initialEndDate?: string | null
}>()

const isLoading = ref(true)
const isRefreshing = ref(false)
const errorMessage = ref<string | null>(null)

const rawHistory = ref<HistoryPoint[]>([])
const dividendYield = ref<number | null>(null)
const dividendRate = ref<number | null>(null)

const minIndex = ref(0)
const maxIndex = ref(0)
const activePreset = ref<'1Y' | '3Y' | '5Y' | '10Y' | 'ALL' | 'MAX_R2' | 'CUSTOM'>(
  (props.initialPreset as any) || 'MAX_R2'
)

let saveTimer: NodeJS.Timeout | null = null

const saveQuantStateToDb = (price?: number) => {
  if (!props.stockId) return
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = setTimeout(async () => {
    try {
      const payload: Record<string, any> = {
        quant_preset: activePreset.value || 'MAX_R2',
        quant_start_date: rawHistory.value[minIndex.value]?.date,
        quant_end_date: rawHistory.value[maxIndex.value]?.date,
      }
      if (price && price > 0) {
        payload.regression_fair_price = price
      }
      await $fetch(`/api/stocks/${props.stockId}`, {
        method: 'PUT',
        body: payload,
      })
    } catch (err) {
      console.error('Erreur sauvegarde état quant:', err)
    }
  }, 600)
}

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const toast = useToast()

const fetchHistory = async (forceRefresh = false) => {
  if (forceRefresh) {
    isRefreshing.value = true
  } else {
    isLoading.value = true
  }
  errorMessage.value = null
  try {
    const url = `/api/stocks/${encodeURIComponent(props.ticker)}/history${forceRefresh ? '?refresh=true' : ''}`
    const res = await $fetch<{
      ticker: string
      currency: string
      dividendYield: number | null
      dividendRate: number | null
      history: HistoryPoint[]
    }>(url)

    rawHistory.value = res.history || []
    dividendYield.value = res.dividendYield
    dividendRate.value = res.dividendRate

    minIndex.value = 0
    maxIndex.value = Math.max(0, rawHistory.value.length - 1)

    // Restore saved preset or default to MAX_R2
    const targetPreset = activePreset.value || (props.initialPreset as any) || 'MAX_R2'
    setPreset(targetPreset, false)
    if (forceRefresh) {
      toast.success('Historique des cours mis à jour avec succès.')
    }
  } catch (err: any) {
    if (!rawHistory.value.length) {
      errorMessage.value = 'Échec du chargement initial de l\'historique des cours.'
      toast.error('Impossible de charger l\'historique des cours. Veuillez vérifier la connexion Yahoo Finance.')
    } else {
      toast.error('Échec du rafraîchissement des cours en direct. L\'historique local a été conservé.')
    }
  } finally {
    isLoading.value = false
    isRefreshing.value = false
  }
}

const refreshHistory = () => {
  fetchHistory(true)
}

const setPreset = (preset: '1Y' | '3Y' | '5Y' | '10Y' | 'ALL' | 'MAX_R2' | 'CUSTOM', save = true) => {
  activePreset.value = preset
  if (!rawHistory.value.length) return

  if (preset === 'MAX_R2') {
    const { minIndex: bestStart, maxIndex: bestEnd } = findMaxR2Period(rawHistory.value, 156)
    minIndex.value = bestStart
    maxIndex.value = bestEnd
    if (save) saveQuantStateToDb(quantResult.value?.theoreticalPrice)
    return
  }

  const total = rawHistory.value.length
  maxIndex.value = total - 1

  let weeks = total
  if (preset === '1Y') weeks = 52
  else if (preset === '3Y') weeks = 156
  else if (preset === '5Y') weeks = 260
  else if (preset === '10Y') weeks = 520

  minIndex.value = Math.max(0, total - weeks)
  if (save) saveQuantStateToDb(quantResult.value?.theoreticalPrice)
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

watch(
  () => quantResult.value?.theoreticalPrice,
  (newPrice) => {
    if (newPrice && newPrice > 0) {
      saveQuantStateToDb(newPrice)
    }
  },
  { immediate: true }
)

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

let isUpdatingFromChart = false

const onDataZoom = (params: any) => {
  if (!rawHistory.value.length || isUpdatingFromChart) return

  const payload = params.batch ? params.batch[0] : params
  const totalHist = rawHistory.value.length
  let startIdx = minIndex.value
  let endIdx = maxIndex.value

  if (typeof payload.startValue === 'number' && typeof payload.endValue === 'number') {
    startIdx = Math.max(0, Math.min(payload.startValue, totalHist - 1))
    endIdx = Math.max(0, Math.min(payload.endValue, totalHist - 1))
  } else if (typeof payload.start === 'number' && typeof payload.end === 'number') {
    const totalAll = totalHist + (quantResult.value?.chartData.futureDates.length || 260)
    startIdx = Math.round((payload.start / 100) * (totalAll - 1))
    endIdx = Math.round((payload.end / 100) * (totalAll - 1))
    startIdx = Math.max(0, Math.min(startIdx, totalHist - 1))
    endIdx = Math.max(0, Math.min(endIdx, totalHist - 1))
  }

  if (startIdx >= endIdx) {
    endIdx = Math.min(totalHist - 1, startIdx + 1)
  }

  if (startIdx !== minIndex.value || endIdx !== maxIndex.value) {
    isUpdatingFromChart = true
    minIndex.value = startIdx
    maxIndex.value = endIdx
    activePreset.value = '' as any
    nextTick(() => {
      isUpdatingFromChart = false
    })
  }
}

const renderChart = () => {
  if (!chartRef.value || !quantResult.value) return

  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value)
    chartInstance.on('datazoom', onDataZoom)
  }

  const { chartData } = quantResult.value
  const totalHist = rawHistory.value.length
  const futLen = chartData.futureDates.length

  const allDates = [
    ...rawHistory.value.map(h => h.date),
    ...chartData.futureDates,
  ]

  const closesExtended = [
    ...rawHistory.value.map(h => h.close),
    ...Array(futLen).fill(null),
  ]

  const regHistExtended = [
    ...Array(minIndex.value).fill(null),
    ...chartData.regressionLine,
    ...Array(Math.max(0, totalHist - 1 - maxIndex.value)).fill(null),
    ...Array(futLen).fill(null),
  ]

  const plus1HistExtended = [
    ...Array(minIndex.value).fill(null),
    ...chartData.plus1SigmaLine,
    ...Array(Math.max(0, totalHist - 1 - maxIndex.value)).fill(null),
    ...Array(futLen).fill(null),
  ]

  const plus2HistExtended = [
    ...Array(minIndex.value).fill(null),
    ...chartData.plus2SigmaLine,
    ...Array(Math.max(0, totalHist - 1 - maxIndex.value)).fill(null),
    ...Array(futLen).fill(null),
  ]

  const minus1HistExtended = [
    ...Array(minIndex.value).fill(null),
    ...chartData.minus1SigmaLine,
    ...Array(Math.max(0, totalHist - 1 - maxIndex.value)).fill(null),
    ...Array(futLen).fill(null),
  ]

  const minus2HistExtended = [
    ...Array(minIndex.value).fill(null),
    ...chartData.minus2SigmaLine,
    ...Array(Math.max(0, totalHist - 1 - maxIndex.value)).fill(null),
    ...Array(futLen).fill(null),
  ]

  const futRegExtended = [
    ...Array(maxIndex.value).fill(null),
    chartData.regressionLine[chartData.regressionLine.length - 1],
    ...chartData.futureRegressionLine,
  ]

  const todayIndex = totalHist - 1

  const curr = props.currency || 'USD'
  const symbol = curr === 'EUR' ? '€' : '$'

  // Dynamic Y-axis scaling based strictly on active visible range
  const visibleVals = [
    ...filteredHistory.value.map(h => h.close).filter((v): v is number => v !== null && v > 0),
    ...chartData.minus2SigmaLine.filter((v): v is number => v !== null && v > 0),
    ...chartData.plus2SigmaLine.filter((v): v is number => v !== null && v > 0),
  ]
  const dataMin = visibleVals.length ? Math.min(...visibleVals) : 1
  const dataMax = visibleVals.length ? Math.max(...visibleVals) : 100
  const yMin = Math.max(0.001, Number((dataMin * 0.95).toPrecision(4)))
  const yMax = Number((dataMax * 1.05).toPrecision(4))

  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    grid: {
      top: 20,
      right: 25,
      bottom: 65,
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
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        bottom: 10,
        height: 26,
        backgroundColor: '#111827',
        borderColor: '#374151',
        fillerColor: 'rgba(16, 185, 129, 0.18)',
        handleStyle: {
          color: '#10b981',
          borderColor: '#059669',
          shadowBlur: 6,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
        },
        moveHandleStyle: {
          color: '#10b981',
        },
        selectedDataBackground: {
          lineStyle: { color: '#10b981' },
          areaStyle: { color: 'rgba(16, 185, 129, 0.2)' },
        },
        textStyle: { color: '#9ca3af', fontSize: 10 },
        startValue: minIndex.value,
        endValue: maxIndex.value,
        minValueSpan: 4,
      },
    ],
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
  if (saveTimer) clearTimeout(saveTimer)
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
    <div v-if="isLoading" class="py-16 text-center text-xs text-zinc-500 font-mono">
      <div class="inline-block h-6 w-6 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent mb-3" />
      <div>Chargement de l'historique boursier...</div>
    </div>

    <div v-else-if="errorMessage" class="rounded-xl border border-rose-500/30 bg-rose-950/40 p-6 text-xs text-rose-300 font-mono">
      {{ errorMessage }}
    </div>

    <div v-else-if="quantResult" class="space-y-6">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3 shadow-md">
          <div class="flex items-center gap-2 border-b border-zinc-800 pb-2 text-xs font-bold text-white uppercase tracking-wider font-mono">
            <span>Données Actuelles</span>
          </div>

          <div class="space-y-2 text-xs font-mono">
            <div class="flex justify-between items-center">
              <span class="text-zinc-400">Cours actuel (P₀)</span>
              <span class="font-bold text-white font-mono">{{ formatCurrency(quantResult.currentPrice, currency) }}</span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-zinc-400 flex items-center gap-1">
                <span>Écart vs Régression</span>
                <InfoTooltip text="Écart en % entre le cours actuel et la médiane théorique du canal. Négatif = Le cours est sous sa moyenne historique (Décote relative)." />
              </span>
              <span
                class="font-bold font-mono"
                :class="quantResult.gapPercent <= 0 ? 'text-emerald-400' : 'text-rose-400'"
              >
                {{ formatPercent(quantResult.gapPercent, true) }}
              </span>
            </div>

            <div v-if="dividendYield && dividendYield > 0" class="space-y-2 border-t border-zinc-800/80 pt-2">
              <div class="flex justify-between items-center">
                <span class="text-zinc-400">Rendement Dividende</span>
                <span class="font-bold text-white font-mono">
                  {{ formatPercent(dividendYield, true, 1, false) }}
                </span>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-zinc-400 flex items-center gap-1">
                  <span>Total Return Estimé</span>
                  <InfoTooltip text="Rendement annuel global estimé combinant la croissance du cours (CAGR) et les dividendes perçus." />
                </span>
                <span
                  class="font-bold font-mono"
                  :class="getTrendColorClass((quantResult.cagrHistorical ?? 0) + (dividendYield ?? 0))"
                >
                  {{ formatPercent((quantResult.cagrHistorical ?? 0) + (dividendYield ?? 0), true) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3 shadow-md">
          <div class="flex items-center gap-2 border-b border-zinc-800 pb-2 text-xs font-bold text-white uppercase tracking-wider font-mono">
            <span>Analyse du Canal (σ)</span>
            <InfoTooltip text="Canaux statistiques de variabilité. ±2σ encadre environ 95% des variations historiques du cours." />
          </div>

          <div class="space-y-1 text-xs font-mono">
            <div class="flex justify-between">
              <span class="text-zinc-400 font-sans">Borne +2σ</span>
              <span class="text-rose-400 font-bold">{{ formatCurrency(quantResult.plus2Sigma, currency) }}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-zinc-400 font-sans">Borne +1σ</span>
              <span class="text-amber-400 font-bold">{{ formatCurrency(quantResult.plus1Sigma, currency) }}</span>
            </div>

            <div class="flex justify-between border-y border-zinc-800/80 py-1 font-mono">
              <span class="text-zinc-300 font-sans">Médiane (0σ)</span>
              <span class="text-white font-bold">{{ formatCurrency(quantResult.theoreticalPrice, currency) }}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-zinc-400 font-sans">Borne -1σ</span>
              <span class="text-amber-400 font-bold">{{ formatCurrency(quantResult.minus1Sigma, currency) }}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-zinc-400 font-sans">Borne -2σ</span>
              <span class="text-emerald-400 font-bold">{{ formatCurrency(quantResult.minus2Sigma, currency) }}</span>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3 shadow-md">
          <div class="flex items-center gap-2 border-b border-zinc-800 pb-2 text-xs font-bold text-white uppercase tracking-wider font-mono">
            <span>Prévisions Cibles</span>
            <InfoTooltip>
              <div class="space-y-1">
                <div>Extrapolations théoriques du canal de régression aux horizons 1, 3, 5 et 10 ans.</div>
                <div v-if="quantResult.isDamped" class="text-[11px] text-amber-300/90 pt-1.5 border-t border-zinc-800/80 font-mono">
                  <b>Convergence Damodaran :</b> En raison d'un CAGR historique exceptionnel (>20%), les projections intègrent une décélération progressive (demi-vie de 3 ans) vers le taux terminal de 5%.
                </div>
              </div>
            </InfoTooltip>
          </div>

          <div class="space-y-2 text-xs font-mono">
            <div class="flex justify-between items-center">
              <span class="text-zinc-400">1 An</span>
              <div class="flex items-center gap-1.5 font-mono">
                <span class="font-bold text-white">{{ formatCompactCurrency(quantResult.projectedPrice1Y, currency) }}</span>
                <InfoTooltip>
                  <div class="space-y-1 text-xs font-mono">
                    <div class="flex items-center gap-1.5 whitespace-nowrap">
                      <span class="text-zinc-400">Rendement :</span>
                      <span class="font-bold font-mono" :class="getTrendColorClass(quantResult.projectedReturn1Y)">
                        {{ formatPercent(quantResult.projectedReturn1Y, true) }}
                      </span>
                    </div>
                    <div v-if="quantResult.isDamped" class="text-[11px] text-zinc-400 pt-0.5 border-t border-zinc-800/80 whitespace-nowrap">
                      Pente brute : +{{ (quantResult.cagrHistorical * 100).toFixed(1) }}%/an
                    </div>
                  </div>
                </InfoTooltip>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-zinc-400">3 Ans</span>
              <div class="flex items-center gap-1.5 font-mono">
                <span class="font-bold text-white">{{ formatCompactCurrency(quantResult.projectedPrice3Y, currency) }}</span>
                <InfoTooltip>
                  <div class="space-y-1 text-xs font-mono">
                    <div class="flex items-center gap-1.5 whitespace-nowrap">
                      <span class="text-zinc-400">Rendement :</span>
                      <span class="font-bold font-mono" :class="getTrendColorClass(quantResult.projectedReturn3Y)">
                        {{ formatPercent(quantResult.projectedReturn3Y, true) }}
                      </span>
                    </div>
                    <div v-if="quantResult.isDamped" class="text-[11px] text-amber-300/90 pt-0.5 border-t border-zinc-800/80 whitespace-nowrap">
                      Taux régressif An 3 : +{{ (quantResult.dampedAnnualRate3Y * 100).toFixed(1) }}%/an
                    </div>
                  </div>
                </InfoTooltip>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-zinc-400">5 Ans</span>
              <div class="flex items-center gap-1.5 font-mono">
                <span class="font-bold text-white">{{ formatCompactCurrency(quantResult.projectedPrice5Y, currency) }}</span>
                <InfoTooltip>
                  <div class="space-y-1 text-xs font-mono">
                    <div class="flex items-center gap-1.5 whitespace-nowrap">
                      <span class="text-zinc-400">Rendement :</span>
                      <span class="font-bold font-mono" :class="getTrendColorClass(quantResult.projectedReturn5Y)">
                        {{ formatPercent(quantResult.projectedReturn5Y, true) }}
                      </span>
                    </div>
                    <div v-if="quantResult.isDamped" class="text-[11px] text-amber-300/90 pt-0.5 border-t border-zinc-800/80 whitespace-nowrap">
                      Taux régressif An 5 : +{{ (quantResult.dampedAnnualRate5Y * 100).toFixed(1) }}%/an
                    </div>
                  </div>
                </InfoTooltip>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-zinc-400">10 Ans</span>
              <div class="flex items-center gap-1.5 font-mono">
                <span class="font-bold text-white">{{ formatCompactCurrency(quantResult.projectedPrice10Y, currency) }}</span>
                <InfoTooltip>
                  <div class="space-y-1 text-xs font-mono">
                    <div class="flex items-center gap-1.5 whitespace-nowrap">
                      <span class="text-zinc-400">Rendement :</span>
                      <span class="font-bold font-mono" :class="getTrendColorClass(quantResult.projectedReturn10Y)">
                        {{ formatPercent(quantResult.projectedReturn10Y, true) }}
                      </span>
                    </div>
                    <div v-if="quantResult.isDamped" class="text-[11px] text-amber-300/90 pt-0.5 border-t border-zinc-800/80 whitespace-nowrap">
                      Taux régressif An 10 : +{{ (quantResult.dampedAnnualRate10Y * 100).toFixed(1) }}%/an
                    </div>
                  </div>
                </InfoTooltip>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3 shadow-md">
          <div class="flex items-center gap-2 border-b border-zinc-800 pb-2 text-xs font-bold text-white uppercase tracking-wider font-mono">
            <span>Perfs Historiques</span>
          </div>

          <div class="space-y-2 text-xs font-mono">
            <div class="flex justify-between items-center">
              <span class="text-zinc-400">1 An</span>
              <span
                class="font-bold font-mono"
                :class="getTrendColorClass(quantResult.perf12M)"
              >
                {{ quantResult.perf12M !== null ? formatPercent(quantResult.perf12M, true) : '-' }}
              </span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-zinc-400">3 Ans</span>
              <span
                class="font-bold font-mono"
                :class="getTrendColorClass(quantResult.perf3Y)"
              >
                {{ quantResult.perf3Y !== null ? formatPercent(quantResult.perf3Y, true) : '-' }}
              </span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-zinc-400">5 Ans</span>
              <span
                class="font-bold font-mono"
                :class="getTrendColorClass(quantResult.perf5Y)"
              >
                {{ quantResult.perf5Y !== null ? formatPercent(quantResult.perf5Y, true) : '-' }}
              </span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-zinc-400">10 Ans</span>
              <span
                class="font-bold font-mono"
                :class="getTrendColorClass(quantResult.perf10Y)"
              >
                {{ quantResult.perf10Y !== null ? formatPercent(quantResult.perf10Y, true) : '-' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-4 shadow-xl">
        <h3 class="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">Indicateurs Majeurs de Régression & Risque</h3>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 font-mono">
          <div class="flex flex-col items-center bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80 text-center space-y-1">
            <div class="text-[11px] font-semibold text-zinc-400 uppercase flex items-center gap-1">
              <span>CAGR Annuel</span>
              <InfoTooltip text="Taux de croissance annuel composé moyen du cours sur la période observée." />
            </div>
            <div class="relative h-16 w-32">
              <svg viewBox="0 0 100 55" class="w-full h-full">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#27272a" stroke-width="8" stroke-linecap="round" />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  :stroke="getCagrGaugeStroke(quantResult.cagrHistorical)"
                  stroke-width="8"
                  stroke-linecap="round"
                  stroke-dasharray="125.66"
                  :stroke-dashoffset="getGaugeArc((quantResult.cagrHistorical + 0.1) / 0.5).strokeDashoffset"
                />
                <circle :cx="getGaugeArc((quantResult.cagrHistorical + 0.1) / 0.5).cx" :cy="getGaugeArc((quantResult.cagrHistorical + 0.1) / 0.5).cy" r="4" fill="#ffffff" />
              </svg>
            </div>
            <div class="font-mono text-sm font-bold" :class="getTrendColorClass(quantResult.cagrHistorical)">
              {{ formatPercent(quantResult.cagrHistorical, true) }}
            </div>
          </div>

          <div class="flex flex-col items-center bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80 text-center space-y-1">
            <div class="text-[11px] font-semibold text-zinc-400 uppercase flex items-center gap-1">
              <span>R² (Qualité)</span>
              <InfoTooltip text="Coefficient de détermination (0 à 1). Mesure la fidélité et la régularité du cours au canal de régression." />
            </div>
            <div class="relative h-16 w-32">
              <svg viewBox="0 0 100 55" class="w-full h-full">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#27272a" stroke-width="8" stroke-linecap="round" />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  :stroke="getR2GaugeStroke(quantResult.r2)"
                  stroke-width="8"
                  stroke-linecap="round"
                  stroke-dasharray="125.66"
                  :stroke-dashoffset="getGaugeArc(quantResult.r2).strokeDashoffset"
                />
                <circle :cx="getGaugeArc(quantResult.r2).cx" :cy="getGaugeArc(quantResult.r2).cy" r="4" fill="#ffffff" />
              </svg>
            </div>
            <div class="font-mono text-sm font-bold" :class="getR2ColorClass(quantResult.r2)">
              {{ quantResult.r2.toFixed(2) }} / 1.0
            </div>
          </div>

          <div class="flex flex-col items-center bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80 text-center space-y-1">
            <div class="text-[11px] font-semibold text-zinc-400 uppercase flex items-center gap-1">
              <span>Position (σ)</span>
              <InfoTooltip text="Position actuelle du cours dans le canal exprimée en déviations standard (Z-score). < -1σ = Zone opportunité, > +1σ = Zone sur-achat." />
            </div>
            <div class="relative h-16 w-32">
              <svg viewBox="0 0 100 55" class="w-full h-full">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#27272a" stroke-width="8" stroke-linecap="round" />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  :stroke="getZScoreGaugeStroke(quantResult.zScore)"
                  stroke-width="8"
                  stroke-linecap="round"
                  stroke-dasharray="125.66"
                  :stroke-dashoffset="getGaugeArc((quantResult.zScore + 2.5) / 5.0).strokeDashoffset"
                />
                <circle :cx="getGaugeArc((quantResult.zScore + 2.5) / 5.0).cx" :cy="getGaugeArc((quantResult.zScore + 2.5) / 5.0).cy" r="4" fill="#ffffff" />
              </svg>
            </div>
            <div class="font-mono text-sm font-bold" :class="getZScoreColorClass(quantResult.zScore)">
              {{ quantResult.zScore > 0 ? '+' : '' }}{{ quantResult.zScore.toFixed(2) }}σ
            </div>
          </div>

          <div class="flex flex-col items-center bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80 text-center space-y-1">
            <div class="text-[11px] font-semibold text-zinc-400 uppercase flex items-center gap-1">
              <span>Volatilité Annuelle</span>
              <InfoTooltip text="Amplitude des fluctuations hebdomadaires rapportée à l'année (1σ)." />
            </div>
            <div class="relative h-16 w-32">
              <svg viewBox="0 0 100 55" class="w-full h-full">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#27272a" stroke-width="8" stroke-linecap="round" />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  :stroke="getVolatilityGaugeStroke(quantResult.annualizedVolatility)"
                  stroke-width="8"
                  stroke-linecap="round"
                  stroke-dasharray="125.66"
                  :stroke-dashoffset="getGaugeArc((quantResult.annualizedVolatility) / 0.6).strokeDashoffset"
                />
                <circle :cx="getGaugeArc((quantResult.annualizedVolatility) / 0.6).cx" :cy="getGaugeArc((quantResult.annualizedVolatility) / 0.6).cy" r="4" fill="#ffffff" />
              </svg>
            </div>
            <div
              class="font-mono text-sm font-bold"
              :class="getVolatilityColorClass(quantResult.annualizedVolatility)"
            >
              ±{{ formatPercent(quantResult.annualizedVolatility, true, 1, false) }}
            </div>
          </div>

          <div class="flex flex-col items-center bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80 text-center space-y-1">
            <div class="text-[11px] font-semibold text-zinc-400 uppercase flex items-center gap-1">
              <span>Max Drawdown</span>
              <InfoTooltip text="Pire chute maximale subie entre un sommet absolu et un creux historique sur la période observée." />
            </div>
            <div class="relative h-16 w-32">
              <svg viewBox="0 0 100 55" class="w-full h-full">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#27272a" stroke-width="8" stroke-linecap="round" />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  :stroke="getMaxDrawdownGaugeStroke(quantResult.maxDrawdown)"
                  stroke-width="8"
                  stroke-linecap="round"
                  stroke-dasharray="125.66"
                  :stroke-dashoffset="getGaugeArc(Math.min(1, Math.abs(quantResult.maxDrawdown) / 0.5)).strokeDashoffset"
                />
                <circle :cx="getGaugeArc(Math.min(1, Math.abs(quantResult.maxDrawdown) / 0.5)).cx" :cy="getGaugeArc(Math.min(1, Math.abs(quantResult.maxDrawdown) / 0.5)).cy" r="4" fill="#ffffff" />
              </svg>
            </div>
            <div class="font-mono text-sm font-bold" :class="getMaxDrawdownColorClass(quantResult.maxDrawdown)">
              {{ formatPercent(quantResult.maxDrawdown, true) }}
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-4 shadow-xl">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <h3 class="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
            Canal de Régression Log-Linéaire & Extrapolation
          </h3>

          <div class="flex items-center gap-3">
            <button
              type="button"
              class="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition shadow-sm disabled:opacity-50 font-mono"
              :disabled="isRefreshing"
              @click="refreshHistory"
            >
              <svg class="h-3.5 w-3.5" :class="{ 'animate-spin': isRefreshing }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>

              <span>{{ isRefreshing ? 'Mise à jour...' : 'Rafraîchir les cours' }}</span>
            </button>
            <span class="text-xs text-gray-400 font-mono hidden md:inline">Axe Y : Logarithmique</span>
          </div>
        </div>

        <div class="relative">
          <div ref="chartRef" class="h-[430px] w-full" />
        </div>

        <div class="pt-3 border-t border-gray-800/80 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

            <div class="h-4 w-px bg-gray-800 mx-1" />

            <div class="flex items-center gap-1.5">
              <button
                type="button"
                class="rounded-md px-2.5 py-1 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer font-mono"
                :class="activePreset === 'MAX_R2'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-inner'
                  : 'text-amber-400/90 hover:text-amber-300 hover:bg-amber-500/10 border border-amber-500/20'"
                @click="setPreset('MAX_R2')"
              >
                <svg class="h-3.5 w-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Max R²</span>
              </button>

              <InfoTooltip text="Recherche automatiquement la période historique d'au moins 36 mois (3 ans) offrant le coefficient de détermination (R²) le plus élevé. Les durées de moins de 3 ans sont exclues pour éliminer le bruit de court terme et les faux canaux de momentum." />
            </div>
          </div>

          <div class="flex items-center gap-2 text-xs">
            <input
              v-model="startDateInput"
              type="date"
              :min="rawHistory[0]?.date"
              :max="endDateInput"
              class="rounded-lg bg-gray-900 border border-gray-800 px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none transition"
            >
            <span class="text-gray-500 font-bold text-sm">-</span>
            <input
              v-model="endDateInput"
              type="date"
              :min="startDateInput"
              :max="rawHistory[rawHistory.length - 1]?.date"
              class="rounded-lg bg-gray-900 border border-gray-800 px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none transition"
            >
          </div>

          <div class="rounded-lg bg-gray-900 border border-gray-800 px-3 py-1.5 text-xs text-white font-mono font-bold shadow-inner">
            {{ formatDurationYearsDecimal(quantResult.startDate, quantResult.endDate) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
