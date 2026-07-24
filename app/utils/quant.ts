export interface HistoryPoint {
  date: string
  close: number
}

export interface QuantAnalysisResult {
  startDate: string
  endDate: string
  sampleSize: number
  cagrHistorical: number
  r2: number
  stdError: number
  currentPrice: number
  theoreticalPrice: number
  gapPercent: number
  zScore: number
  plus2Sigma: number
  plus1Sigma: number
  minus1Sigma: number
  minus2Sigma: number
  projectedPrice1Y: number
  projectedPrice3Y: number
  projectedPrice5Y: number
  projectedPrice10Y: number
  projectedReturn1Y: number
  projectedReturn3Y: number
  projectedReturn5Y: number
  projectedReturn10Y: number
  targetDate5Y: string
  perf12M: number | null
  perf3Y: number | null
  perf5Y: number | null
  perf10Y: number | null
  annualizedVolatility: number
  maxDrawdown: number
  isDamped: boolean
  chartData: {
    dates: string[]
    closes: (number | null)[]
    regressionLine: (number | null)[]
    plus1SigmaLine: (number | null)[]
    plus2SigmaLine: (number | null)[]
    minus1SigmaLine: (number | null)[]
    minus2SigmaLine: (number | null)[]
    futureDates: string[]
    futureRegressionLine: (number | null)[]
    futurePlus1Sigma: (number | null)[]
    futurePlus2Sigma: (number | null)[]
    futureMinus1Sigma: (number | null)[]
    futureMinus2Sigma: (number | null)[]
  }
}

function computePerf(fullHistory: HistoryPoint[], targetDaysAgo: number): number | null {
  if (!fullHistory || fullHistory.length < 2) return null

  const lastPoint = fullHistory[fullHistory.length - 1]
  const lastTime = new Date(lastPoint.date).getTime()
  const targetTime = lastTime - targetDaysAgo * 86400 * 1000

  let closestPoint = fullHistory[0]
  let minDiff = Math.abs(new Date(closestPoint.date).getTime() - targetTime)

  for (let i = 1; i < fullHistory.length; i++) {
    const diff = Math.abs(new Date(fullHistory[i].date).getTime() - targetTime)
    if (diff < minDiff) {
      minDiff = diff
      closestPoint = fullHistory[i]
    }
  }

  // Ne pas renvoyer de perf si la donnée historique n'est pas suffisamment ancienne (max 60 jours d'écart)
  if (minDiff > 60 * 86400 * 1000) return null

  if (closestPoint.close <= 0 || lastPoint.close <= 0) return null
  return (lastPoint.close - closestPoint.close) / closestPoint.close
}

export function calculateQuantAnalysis(
  history: HistoryPoint[],
  fullHistory: HistoryPoint[] = history
): QuantAnalysisResult {
  const validHistory = history.filter(p => p.close > 0 && !isNaN(p.close))
  const N = validHistory.length

  if (N < 2) {
    return {
      startDate: '',
      endDate: '',
      sampleSize: 0,
      cagrHistorical: 0,
      r2: 0,
      stdError: 0,
      currentPrice: 0,
      theoreticalPrice: 0,
      gapPercent: 0,
      zScore: 0,
      plus2Sigma: 0,
      plus1Sigma: 0,
      minus1Sigma: 0,
      minus2Sigma: 0,
      projectedPrice1Y: 0,
      projectedPrice3Y: 0,
      projectedPrice5Y: 0,
      projectedPrice10Y: 0,
      projectedReturn1Y: 0,
      projectedReturn3Y: 0,
      projectedReturn5Y: 0,
      projectedReturn10Y: 0,
      targetDate5Y: '',
      perf12M: null,
      perf3Y: null,
      perf5Y: null,
      perf10Y: null,
      annualizedVolatility: 0,
      maxDrawdown: 0,
      isDamped: false,
      chartData: {
        dates: [],
        closes: [],
        regressionLine: [],
        plus1SigmaLine: [],
        plus2SigmaLine: [],
        minus1SigmaLine: [],
        minus2SigmaLine: [],
        futureDates: [],
        futureRegressionLine: [],
        futurePlus1Sigma: [],
        futurePlus2Sigma: [],
        futureMinus1Sigma: [],
        futureMinus2Sigma: [],
      },
    }
  }

  const ys = validHistory.map(p => Math.log(p.close))

  let sumT = 0
  let sumY = 0
  let sumTY = 0
  let sumT2 = 0

  for (let t = 0; t < N; t++) {
    sumT += t
    sumY += ys[t]
    sumTY += t * ys[t]
    sumT2 += t * t
  }

  const denominator = N * sumT2 - sumT * sumT
  const beta = denominator !== 0 ? (N * sumTY - sumT * sumY) / denominator : 0
  const alpha = (sumY - beta * sumT) / N

  const yMean = sumY / N
  let ssRes = 0
  let ssTot = 0

  for (let t = 0; t < N; t++) {
    const yHat = alpha + beta * t
    ssRes += Math.pow(ys[t] - yHat, 2)
    ssTot += Math.pow(ys[t] - yMean, 2)
  }

  const r2 = ssTot !== 0 ? Math.max(0, 1 - ssRes / ssTot) : 0
  const sigma = N > 2 ? Math.sqrt(ssRes / (N - 2)) : 0
  const cagrHistorical = Math.exp(beta * 52) - 1

  const tLast = N - 1
  const currentPrice = validHistory[tLast].close
  const logTheoryLast = alpha + beta * tLast
  const theoreticalPrice = Math.exp(logTheoryLast)
  const gapPercent = theoreticalPrice > 0 ? (currentPrice - theoreticalPrice) / theoreticalPrice : 0
  const lastResidual = Math.log(currentPrice) - logTheoryLast
  const zScore = sigma > 0 ? lastResidual / sigma : 0

  const plus2Sigma = Math.exp(logTheoryLast + 2 * sigma)
  const plus1Sigma = Math.exp(logTheoryLast + sigma)
  const minus1Sigma = Math.exp(logTheoryLast - sigma)
  const minus2Sigma = Math.exp(logTheoryLast - 2 * sigma)

  // Modèle de convergence de Damodaran (NYU Stern / McKinsey Valuation)
  // Taux terminal g_terminal = 5%, Seuil d'excès = 20%, Half-life T_1/2 = 3 ans (lambda = ln(2)/3)
  const isDamped = cagrHistorical > 0.20
  const gTerminal = 0.05
  const lambda = Math.LN2 / 3.0

  const getGrowthAtYear = (tYears: number): number => {
    if (!isDamped) return cagrHistorical
    const decay = Math.exp(-lambda * (tYears - 1))
    return gTerminal + (cagrHistorical - gTerminal) * decay
  }

  const getProjectedPriceForYears = (years: number): number => {
    if (!isDamped) {
      return Math.exp(alpha + beta * (tLast + years * 52))
    }
    let price = theoreticalPrice
    for (let y = 1; y <= years; y++) {
      const gY = getGrowthAtYear(y)
      price = price * (1 + gY)
    }
    return price
  }

  const projectedPrice1Y = getProjectedPriceForYears(1)
  const projectedPrice3Y = getProjectedPriceForYears(3)
  const projectedPrice5Y = getProjectedPriceForYears(5)
  const projectedPrice10Y = getProjectedPriceForYears(10)

  const projectedReturn1Y = currentPrice > 0 ? (projectedPrice1Y - currentPrice) / currentPrice : 0
  const projectedReturn3Y = currentPrice > 0 ? (projectedPrice3Y - currentPrice) / currentPrice : 0
  const projectedReturn5Y = currentPrice > 0 ? (projectedPrice5Y - currentPrice) / currentPrice : 0
  const projectedReturn10Y = currentPrice > 0 ? (projectedPrice10Y - currentPrice) / currentPrice : 0

  const lastDateObj = new Date(validHistory[tLast].date)
  const targetDateObj = new Date(lastDateObj.getTime() + 5 * 365 * 86400 * 1000)
  const targetDate5Y = targetDateObj.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })

  const dates = validHistory.map(p => p.date)
  const closes = validHistory.map(p => p.close)
  const regressionLine: number[] = []
  const plus1SigmaLine: number[] = []
  const plus2SigmaLine: number[] = []
  const minus1SigmaLine: number[] = []
  const minus2SigmaLine: number[] = []

  for (let t = 0; t < N; t++) {
    const logVal = alpha + beta * t
    regressionLine.push(Math.exp(logVal))
    plus1SigmaLine.push(Math.exp(logVal + sigma))
    plus2SigmaLine.push(Math.exp(logVal + 2 * sigma))
    minus1SigmaLine.push(Math.exp(logVal - sigma))
    minus2SigmaLine.push(Math.exp(logVal - 2 * sigma))
  }

  const futureDates: string[] = []
  const futureRegressionLine: number[] = []
  const futurePlus1Sigma: number[] = []
  const futurePlus2Sigma: number[] = []
  const futureMinus1Sigma: number[] = []
  const futureMinus2Sigma: number[] = []

  let currentDate = lastDateObj
  let runningFuturePrice = theoreticalPrice

  for (let k = 1; k <= 260; k++) {
    currentDate = new Date(currentDate.getTime() + 7 * 86400 * 1000)
    futureDates.push(currentDate.toISOString().split('T')[0])

    const tYears = k / 52.0

    if (!isDamped) {
      const tFut = tLast + k
      const logFut = alpha + beta * tFut
      const futPrice = Math.exp(logFut)
      futureRegressionLine.push(futPrice)
      futurePlus1Sigma.push(Math.exp(logFut + sigma))
      futurePlus2Sigma.push(Math.exp(logFut + 2 * sigma))
      futureMinus1Sigma.push(Math.exp(logFut - sigma))
      futureMinus2Sigma.push(Math.exp(logFut - 2 * sigma))
    } else {
      const currentAnnualRate = getGrowthAtYear(tYears)
      const weeklyRate = Math.pow(1 + currentAnnualRate, 1 / 52) - 1
      runningFuturePrice = runningFuturePrice * (1 + weeklyRate)

      futureRegressionLine.push(runningFuturePrice)
      futurePlus1Sigma.push(runningFuturePrice * Math.exp(sigma))
      futurePlus2Sigma.push(runningFuturePrice * Math.exp(2 * sigma))
      futureMinus1Sigma.push(runningFuturePrice * Math.exp(-sigma))
      futureMinus2Sigma.push(runningFuturePrice * Math.exp(-2 * sigma))
    }
  }

  const perf12M = computePerf(fullHistory, 365)
  const perf3Y = computePerf(fullHistory, 3 * 365)
  const perf5Y = computePerf(fullHistory, 5 * 365)
  const perf10Y = computePerf(fullHistory, 10 * 365)

  // Calculate weekly returns & annualized volatility
  const weeklyReturns: number[] = []
  for (let i = 1; i < N; i++) {
    const prev = validHistory[i - 1].close
    const curr = validHistory[i].close
    if (prev > 0) {
      weeklyReturns.push((curr - prev) / prev)
    }
  }

  let annualizedVolatility = 0
  if (weeklyReturns.length > 1) {
    const meanRet = weeklyReturns.reduce((acc, r) => acc + r, 0) / weeklyReturns.length
    const variance = weeklyReturns.reduce((acc, r) => acc + Math.pow(r - meanRet, 2), 0) / (weeklyReturns.length - 1)
    const stdWeekly = Math.sqrt(variance)
    annualizedVolatility = stdWeekly * Math.sqrt(52)
  }

  // Calculate Max Drawdown
  let maxDrawdown = 0
  let peak = validHistory[0].close
  for (let i = 0; i < N; i++) {
    const price = validHistory[i].close
    if (price > peak) {
      peak = price
    }
    const dd = (price - peak) / peak
    if (dd < maxDrawdown) {
      maxDrawdown = dd
    }
  }

  return {
    startDate: validHistory[0].date,
    endDate: validHistory[tLast].date,
    sampleSize: N,
    cagrHistorical,
    r2,
    stdError: sigma,
    currentPrice,
    theoreticalPrice,
    gapPercent,
    zScore,
    plus2Sigma,
    plus1Sigma,
    minus1Sigma,
    minus2Sigma,
    projectedPrice1Y,
    projectedPrice3Y,
    projectedPrice5Y,
    projectedPrice10Y,
    projectedReturn1Y,
    projectedReturn3Y,
    projectedReturn5Y,
    projectedReturn10Y,
    targetDate5Y,
    perf12M,
    perf3Y,
    perf5Y,
    perf10Y,
    annualizedVolatility,
    maxDrawdown,
    isDamped,
    chartData: {
      dates,
      closes,
      regressionLine,
      plus1SigmaLine,
      plus2SigmaLine,
      minus1SigmaLine,
      minus2SigmaLine,
      futureDates,
      futureRegressionLine,
      futurePlus1Sigma,
      futurePlus2Sigma,
      futureMinus1Sigma,
      futureMinus2Sigma,
    },
  }
}

export function findMaxR2Period(
  history: HistoryPoint[],
  minWeeks: number = 104
): { minIndex: number; maxIndex: number; maxR2: number } {
  const validHistory = history.filter(p => p.close > 0 && !isNaN(p.close))
  const N = validHistory.length
  const end = N - 1
  if (N < minWeeks) return { minIndex: 0, maxIndex: Math.max(0, end), maxR2: 0 }

  const ys = validHistory.map(p => Math.log(p.close))

  let bestR2 = -1
  let bestStart = 0

  // Single-pass search fixing end at Today (N - 1)
  for (let start = 0; start <= N - minWeeks; start += 1) {
    const len = end - start + 1
    let sumT = 0
    let sumY = 0
    let sumTY = 0
    let sumT2 = 0

    for (let t = 0; t < len; t++) {
      const y = ys[start + t]
      sumT += t
      sumY += y
      sumTY += t * y
      sumT2 += t * t
    }

    const denomT = len * sumT2 - sumT * sumT
    if (denomT === 0) continue

    const beta = (len * sumTY - sumT * sumY) / denomT
    const alpha = (sumY - beta * sumT) / len

    const yMean = sumY / len
    let ssRes = 0
    let ssTot = 0

    for (let t = 0; t < len; t++) {
      const y = ys[start + t]
      const yHat = alpha + beta * t
      ssRes += (y - yHat) * (y - yHat)
      ssTot += (y - yMean) * (y - yMean)
    }

    if (ssTot === 0) continue
    const r2 = Math.max(0, 1 - ssRes / ssTot)

    if (r2 > bestR2) {
      bestR2 = r2
      bestStart = start
    }
  }

  return { minIndex: bestStart, maxIndex: end, maxR2: Math.max(0, bestR2) }
}
