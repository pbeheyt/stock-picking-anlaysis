export type GrowthMode = 'cagr' | 'explicit'

export interface ValuationInputs {
  currentPrice: number
  revenueTTM: number
  sharesOutstanding: number
  growthMode: GrowthMode
  growth: number
  growthY1: number
  growthY2: number
  growthY3: number
  growthY4: number
  growthY5: number
  margin: number
  targetPE: number
  discountRate: number
}

export interface ValuationResult {
  revenue5Y: number
  equivalentCAGR: number
  earnings5Y: number
  eps5Y: number
  targetPrice5Y: number
  fairValue: number
  marginOfSafety: number
}

export interface ScenarioResults {
  bear: ValuationResult
  base: ValuationResult
  bull: ValuationResult
}

export interface ReverseDCFResult {
  targetPrice5YMarket: number
  earnings5YMarket: number
  revenue5YMarket: number
  impliedGrowth: number
  impliedGrowthY2Y5?: number
}

export function computeValuation(inputs: ValuationInputs): ValuationResult {
  const {
    revenueTTM,
    sharesOutstanding,
    growthMode,
    growth,
    growthY1,
    growthY2,
    growthY3,
    growthY4,
    growthY5,
    margin,
    targetPE,
    discountRate,
    currentPrice,
  } = inputs

  let revenue5Y = 0
  let equivalentCAGR = 0

  if (growthMode === 'explicit') {
    revenue5Y = revenueTTM
      * (1 + growthY1)
      * (1 + growthY2)
      * (1 + growthY3)
      * (1 + growthY4)
      * (1 + growthY5)

    equivalentCAGR = revenueTTM > 0 && revenue5Y > 0
      ? Math.pow(revenue5Y / revenueTTM, 1 / 5) - 1
      : 0
  } else {
    revenue5Y = revenueTTM * Math.pow(1 + growth, 5)
    equivalentCAGR = growth
  }

  const earnings5Y = revenue5Y * margin
  const eps5Y = sharesOutstanding > 0 ? earnings5Y / sharesOutstanding : 0
  const targetPrice5Y = eps5Y * targetPE
  const fairValue = targetPrice5Y / Math.pow(1 + discountRate, 5)
  const marginOfSafety = fairValue !== 0
    ? ((fairValue - currentPrice) / fairValue) * 100
    : 0

  return {
    revenue5Y,
    equivalentCAGR,
    earnings5Y,
    eps5Y,
    targetPrice5Y,
    fairValue,
    marginOfSafety,
  }
}

export function computeScenarios(inputs: ValuationInputs): ScenarioResults {
  const base = computeValuation(inputs)

  let bearInputs: ValuationInputs
  let bullInputs: ValuationInputs

  if (inputs.growthMode === 'explicit') {
    bearInputs = {
      ...inputs,
      growthY1: inputs.growthY1 * 0.8,
      growthY2: inputs.growthY2 * 0.8,
      growthY3: inputs.growthY3 * 0.8,
      growthY4: inputs.growthY4 * 0.8,
      growthY5: inputs.growthY5 * 0.8,
      targetPE: inputs.targetPE * 0.8,
    }

    bullInputs = {
      ...inputs,
      growthY1: inputs.growthY1 * 1.15,
      growthY2: inputs.growthY2 * 1.15,
      growthY3: inputs.growthY3 * 1.15,
      growthY4: inputs.growthY4 * 1.15,
      growthY5: inputs.growthY5 * 1.15,
      targetPE: inputs.targetPE * 1.15,
    }
  } else {
    bearInputs = {
      ...inputs,
      growth: inputs.growth * 0.8,
      targetPE: inputs.targetPE * 0.8,
    }

    bullInputs = {
      ...inputs,
      growth: inputs.growth * 1.15,
      targetPE: inputs.targetPE * 1.15,
    }
  }

  return {
    bear: computeValuation(bearInputs),
    base,
    bull: computeValuation(bullInputs),
  }
}

export function computeReverseDCF(inputs: ValuationInputs): ReverseDCFResult {
  const { currentPrice, discountRate, sharesOutstanding, targetPE, margin, revenueTTM, growthMode, growthY1 } = inputs

  const targetPrice5YMarket = currentPrice * Math.pow(1 + discountRate, 5)
  const marketCap5Y = targetPrice5YMarket * sharesOutstanding
  const earnings5YMarket = targetPE > 0 ? marketCap5Y / targetPE : 0
  const revenue5YMarket = margin !== 0 ? earnings5YMarket / margin : 0

  if (growthMode === 'explicit') {
    const revY1 = revenueTTM * (1 + growthY1)
    const impliedGrowthY2Y5 = revY1 > 0 && revenue5YMarket > 0
      ? Math.pow(revenue5YMarket / revY1, 1 / 4) - 1
      : 0

    return {
      targetPrice5YMarket,
      earnings5YMarket,
      revenue5YMarket,
      impliedGrowth: impliedGrowthY2Y5,
      impliedGrowthY2Y5,
    }
  } else {
    const impliedGrowth = revenueTTM > 0 && revenue5YMarket > 0
      ? Math.pow(revenue5YMarket / revenueTTM, 1 / 5) - 1
      : 0

    return {
      targetPrice5YMarket,
      earnings5YMarket,
      revenue5YMarket,
      impliedGrowth,
    }
  }
}
