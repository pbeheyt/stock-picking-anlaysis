export interface ValuationInputs {
  currentPrice: number
  revenueTTM: number
  sharesOutstanding: number
  growth: number
  margin: number
  targetPE: number
  discountRate: number
}

export interface ValuationResult {
  revenue5Y: number
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
}

export function computeValuation(inputs: ValuationInputs): ValuationResult {
  const { revenueTTM, sharesOutstanding, growth, margin, targetPE, discountRate, currentPrice } = inputs

  const revenue5Y = revenueTTM * Math.pow(1 + growth, 5)
  const earnings5Y = revenue5Y * margin
  const eps5Y = earnings5Y / sharesOutstanding
  const targetPrice5Y = eps5Y * targetPE
  const fairValue = targetPrice5Y / Math.pow(1 + discountRate, 5)
  const marginOfSafety = fairValue !== 0
    ? ((fairValue - currentPrice) / fairValue) * 100
    : 0

  return { revenue5Y, earnings5Y, eps5Y, targetPrice5Y, fairValue, marginOfSafety }
}

export function computeScenarios(inputs: ValuationInputs): ScenarioResults {
  const base = computeValuation(inputs)

  const bear = computeValuation({
    ...inputs,
    growth: inputs.growth * 0.8,
    targetPE: inputs.targetPE * 0.8,
  })

  const bull = computeValuation({
    ...inputs,
    growth: inputs.growth * 1.15,
    targetPE: inputs.targetPE * 1.15,
  })

  return { bear, base, bull }
}

export function computeReverseDCF(inputs: ValuationInputs): ReverseDCFResult {
  const { currentPrice, discountRate, sharesOutstanding, targetPE, margin, revenueTTM } = inputs

  const targetPrice5YMarket = currentPrice * Math.pow(1 + discountRate, 5)
  const marketCap5Y = targetPrice5YMarket * sharesOutstanding
  const earnings5YMarket = marketCap5Y / targetPE
  const revenue5YMarket = margin !== 0 ? earnings5YMarket / margin : 0
  const impliedGrowth = revenueTTM > 0 && revenue5YMarket > 0
    ? Math.pow(revenue5YMarket / revenueTTM, 1 / 5) - 1
    : 0

  return { targetPrice5YMarket, earnings5YMarket, revenue5YMarket, impliedGrowth }
}
