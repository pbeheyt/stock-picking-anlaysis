import type { AuditCategory } from '~/types/database.types'
import { FINANCIAL_DEFAULTS } from '~/utils/valuation'

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export interface CascadeGrowthResult {
  selectedGrowth: number
  growthSource: string
  growthMode: 'cagr' | 'explicit'
  g1: number
  g2: number
  g3: number
  g4: number
  g5: number
  candidates: AuditCategory['candidates']
}

export interface CascadeMarginResult {
  selectedMargin: number
  marginSource: string
  candidates: AuditCategory['candidates']
}

export interface CascadePEResult {
  selectedPE: number
  peSource: string
  candidates: AuditCategory['candidates']
}

export interface CascadeDiscountResult {
  selectedDiscountRate: number
  candidates: AuditCategory['candidates']
}

export function computeGrowthCascade(
  earningsTrend: any[],
  financialData: any
): CascadeGrowthResult {
  const trend1y = earningsTrend.find((t: any) => t.period === '+1y')
  const ntmRevenueGrowth = trend1y?.revenueEstimate?.growth
  const ttmRevenueGrowth = financialData.revenueGrowth

  const validNTM = typeof ntmRevenueGrowth === 'number' && isFinite(ntmRevenueGrowth) && ntmRevenueGrowth !== 0 ? ntmRevenueGrowth : null
  const validTTM = typeof ttmRevenueGrowth === 'number' && isFinite(ttmRevenueGrowth) && ttmRevenueGrowth !== 0 ? ttmRevenueGrowth : null

  let selectedGrowth = FINANCIAL_DEFAULTS.GROWTH_RATE
  let growthSource = `Fallback Modèle Standard (${(FINANCIAL_DEFAULTS.GROWTH_RATE * 100).toFixed(0)}%)`
  let growthMode: 'cagr' | 'explicit' = 'cagr'
  let g1 = FINANCIAL_DEFAULTS.GROWTH_RATE, g2 = FINANCIAL_DEFAULTS.GROWTH_RATE, g3 = FINANCIAL_DEFAULTS.GROWTH_RATE, g4 = FINANCIAL_DEFAULTS.GROWTH_RATE, g5 = FINANCIAL_DEFAULTS.GROWTH_RATE

  const candidates: AuditCategory['candidates'] = []

  if (validNTM !== null) {
    selectedGrowth = validNTM
    growthSource = 'Consensus Analystes CA (+1Y NTM)'
    candidates.push(
      { name: 'Consensus CA (+1Y NTM)', value: parseFloat(validNTM.toFixed(4)), status: 'selected', note: 'Consensus Analystes CA (+1Y NTM)' },
      { name: 'Historique CA TTM Réalisé', value: validTTM !== null ? parseFloat(validTTM.toFixed(4)) : null, status: 'ignored', note: 'Non requis' },
      { name: `Fallback Standard (${(FINANCIAL_DEFAULTS.GROWTH_RATE * 100).toFixed(0)}%)`, value: FINANCIAL_DEFAULTS.GROWTH_RATE, status: 'ignored', note: 'Non requis' }
    )
  } else if (validTTM !== null) {
    selectedGrowth = clamp(validTTM, -0.5, 0.8)
    growthSource = 'Historique CA TTM Réalisé'
    candidates.push(
      { name: 'Consensus CA (+1Y NTM)', value: null, status: 'rejected', note: 'Non disponible' },
      { name: 'Historique CA TTM Réalisé', value: parseFloat(validTTM.toFixed(4)), status: 'selected', note: 'Historique CA TTM Réalisé' },
      { name: `Fallback Standard (${(FINANCIAL_DEFAULTS.GROWTH_RATE * 100).toFixed(0)}%)`, value: FINANCIAL_DEFAULTS.GROWTH_RATE, status: 'ignored', note: 'Non requis' }
    )
  } else {
    selectedGrowth = FINANCIAL_DEFAULTS.GROWTH_RATE
    growthSource = `Fallback Modèle Standard (${(FINANCIAL_DEFAULTS.GROWTH_RATE * 100).toFixed(0)}%)`
    candidates.push(
      { name: 'Consensus CA (+1Y NTM)', value: null, status: 'rejected', note: 'Non disponible' },
      { name: 'Historique CA TTM Réalisé', value: null, status: 'rejected', note: 'Non disponible' },
      { name: `Fallback Standard (${(FINANCIAL_DEFAULTS.GROWTH_RATE * 100).toFixed(0)}%)`, value: FINANCIAL_DEFAULTS.GROWTH_RATE, status: 'fallback', note: `⚠️ Valeur par défaut : ${(FINANCIAL_DEFAULTS.GROWTH_RATE * 100).toFixed(1)}%` }
    )
  }

  g1 = selectedGrowth
  if (selectedGrowth > 0.20) {
    growthMode = 'explicit'
    g2 = parseFloat((0.50 * selectedGrowth).toFixed(4))
    g3 = 0.30
    g4 = 0.20
    g5 = 0.15
    growthSource = `Consensus > 20% (${(selectedGrowth * 100).toFixed(0)}%) -> Mode Sur-Mesure`
  } else {
    growthMode = 'cagr'
    g2 = selectedGrowth
    g3 = selectedGrowth
    g4 = selectedGrowth
    g5 = selectedGrowth
  }

  return {
    selectedGrowth,
    growthSource,
    growthMode,
    g1, g2, g3, g4, g5,
    candidates,
  }
}

export function computeMarginCascade(marginNetRaw: number | null): CascadeMarginResult {
  let selectedMargin = FINANCIAL_DEFAULTS.MARGIN_NET
  let marginSource = `Fallback Modèle Standard (${(FINANCIAL_DEFAULTS.MARGIN_NET * 100).toFixed(0)}%)`
  const candidates: AuditCategory['candidates'] = []

  if (typeof marginNetRaw === 'number' && isFinite(marginNetRaw) && marginNetRaw > 0) {
    selectedMargin = clamp(marginNetRaw, 0.01, 0.80)
    marginSource = 'Marge Nette TTM Réelle'
    candidates.push(
      { name: 'Marge Nette TTM Réelle', value: parseFloat(marginNetRaw.toFixed(4)), status: 'selected', note: 'Marge Nette TTM Réelle' },
      { name: `Fallback Standard (${(FINANCIAL_DEFAULTS.MARGIN_NET * 100).toFixed(0)}%)`, value: FINANCIAL_DEFAULTS.MARGIN_NET, status: 'ignored', note: 'Non requis' }
    )
  } else {
    selectedMargin = FINANCIAL_DEFAULTS.MARGIN_NET
    marginSource = `Fallback Modèle Standard (${(FINANCIAL_DEFAULTS.MARGIN_NET * 100).toFixed(0)}%)`
    candidates.push(
      { name: 'Marge Nette TTM Réelle', value: marginNetRaw !== null ? parseFloat(marginNetRaw.toFixed(4)) : null, status: 'rejected', note: 'Rejeté : Non disponible ou négatif' },
      { name: `Fallback Standard (${(FINANCIAL_DEFAULTS.MARGIN_NET * 100).toFixed(0)}%)`, value: FINANCIAL_DEFAULTS.MARGIN_NET, status: 'fallback', note: `⚠️ Boîte déficitaire : Marge par défaut à ${(FINANCIAL_DEFAULTS.MARGIN_NET * 100).toFixed(1)}%` }
    )
  }

  return { selectedMargin, marginSource, candidates }
}

export function computePECascade(peForwardRaw: number | null, peTrailingRaw: number | null): CascadePEResult {
  let selectedPE = FINANCIAL_DEFAULTS.TARGET_MULTIPLE
  let peSource = `Multiple par Défaut (${FINANCIAL_DEFAULTS.TARGET_MULTIPLE.toFixed(1)}x)`
  const candidates: AuditCategory['candidates'] = []

  if (typeof peForwardRaw === 'number' && isFinite(peForwardRaw) && peForwardRaw > 0) {
    selectedPE = clamp(peForwardRaw, 5, 120)
    peSource = 'Consensus Forward P/E'
    candidates.push(
      { name: 'Forward P/E', value: parseFloat(peForwardRaw.toFixed(2)), status: 'selected', note: 'Consensus Forward P/E' },
      { name: 'Trailing P/E', value: peTrailingRaw !== null ? parseFloat(peTrailingRaw.toFixed(2)) : null, status: 'ignored', note: 'Non requis' },
      { name: `Multiple par Défaut (${FINANCIAL_DEFAULTS.TARGET_MULTIPLE.toFixed(1)}x)`, value: FINANCIAL_DEFAULTS.TARGET_MULTIPLE, status: 'ignored', note: 'Non requis' }
    )
  } else if (typeof peTrailingRaw === 'number' && isFinite(peTrailingRaw) && peTrailingRaw > 0) {
    selectedPE = clamp(peTrailingRaw, 5, 120)
    peSource = 'P/E Trailing TTM'
    candidates.push(
      { name: 'Forward P/E', value: null, status: 'rejected', note: 'Non disponible' },
      { name: 'Trailing P/E', value: parseFloat(peTrailingRaw.toFixed(2)), status: 'selected', note: 'P/E Trailing TTM' },
      { name: `Multiple par Défaut (${FINANCIAL_DEFAULTS.TARGET_MULTIPLE.toFixed(1)}x)`, value: FINANCIAL_DEFAULTS.TARGET_MULTIPLE, status: 'ignored', note: 'Non requis' }
    )
  } else {
    selectedPE = FINANCIAL_DEFAULTS.TARGET_MULTIPLE
    peSource = `Multiple par Défaut (${FINANCIAL_DEFAULTS.TARGET_MULTIPLE.toFixed(1)}x)`
    candidates.push(
      { name: 'Forward P/E', value: null, status: 'rejected', note: 'Non disponible' },
      { name: 'Trailing P/E', value: peTrailingRaw !== null ? parseFloat(peTrailingRaw.toFixed(2)) : null, status: 'rejected', note: 'Rejeté : Bénéfice Négatif ou non disponible' },
      { name: `Multiple par Défaut (${FINANCIAL_DEFAULTS.TARGET_MULTIPLE.toFixed(1)}x)`, value: FINANCIAL_DEFAULTS.TARGET_MULTIPLE, status: 'fallback', note: `⚠️ Boîte non rentable / P/E absent : Multiple par défaut à ${FINANCIAL_DEFAULTS.TARGET_MULTIPLE.toFixed(1)}x` }
    )
  }

  return { selectedPE, peSource, candidates }
}

export function computeDiscountRateCascade(beta: number): CascadeDiscountResult {
  const rawKe = 0.04 + 0.05 * beta
  const selectedDiscountRate = parseFloat(clamp(rawKe, 0.060, 0.135).toFixed(4))
  const candidates: AuditCategory['candidates'] = []

  if (rawKe > 0.135) {
    candidates.push(
      { name: 'CAPM Brut (4.0% + Beta × 5.0%)', value: parseFloat(rawKe.toFixed(4)), status: 'rejected', note: 'Supérieur au plafond maximum guardrail (13.5%)' },
      { name: 'Taux Actualisation Plafonné (Cap 13.5%)', value: 0.135, status: 'selected', note: 'Bridé par le Cap Maximum Guardrail (13.5%)' }
    )
  } else if (rawKe < 0.060) {
    candidates.push(
      { name: 'CAPM Brut (4.0% + Beta × 5.0%)', value: parseFloat(rawKe.toFixed(4)), status: 'rejected', note: 'Inférieur au plancher minimum guardrail (6.0%)' },
      { name: 'Taux Actualisation Planché (Floor 6.0%)', value: 0.060, status: 'selected', note: 'Bridé par le Floor Minimum Guardrail (6.0%)' }
    )
  } else {
    candidates.push(
      { name: 'CAPM Brut (4.0% + Beta × 5.0%)', value: parseFloat(rawKe.toFixed(4)), status: 'selected', note: 'CAPM appliqué tel quel (entre 6.0% et 13.5%)' }
    )
  }

  return { selectedDiscountRate, candidates }
}
