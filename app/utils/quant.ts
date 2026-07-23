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
  projectedPrice5Y: number
  targetDate5Y: string
  perf12M: number | null
  perf5Y: number | null
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
      projectedPrice5Y: 0,
      targetDate5Y: '',
      perf12M: null,
      perf5Y: null,
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

  const tFuture = tLast + 260
  const projectedPrice5Y = Math.exp(alpha + beta * tFuture)

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
  for (let k = 1; k <= 260; k++) {
    currentDate = new Date(currentDate.getTime() + 7 * 86400 * 1000)
    futureDates.push(currentDate.toISOString().split('T')[0])

    const tFut = tLast + k
    const logFut = alpha + beta * tFut
    futureRegressionLine.push(Math.exp(logFut))
    futurePlus1Sigma.push(Math.exp(logFut + sigma))
    futurePlus2Sigma.push(Math.exp(logFut + 2 * sigma))
    futureMinus1Sigma.push(Math.exp(logFut - sigma))
    futureMinus2Sigma.push(Math.exp(logFut - 2 * sigma))
  }

  const perf12M = computePerf(fullHistory, 365)
  const perf5Y = computePerf(fullHistory, 5 * 365)

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
    projectedPrice5Y,
    targetDate5Y,
    perf12M,
    perf5Y,
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
