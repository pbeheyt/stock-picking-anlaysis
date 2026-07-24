import type { AuditCategory } from '~/types/database.types'

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

  let selectedGrowth = 0.10
  let growthSource = 'Fallback Modèle Standard (10%)'
  let growthMode: 'cagr' | 'explicit' = 'cagr'
  let g1 = 0.10, g2 = 0.10, g3 = 0.10, g4 = 0.10, g5 = 0.10

  const candidates: AuditCategory['candidates'] = []

  if (validNTM !== null) {
    selectedGrowth = validNTM
    growthSource = 'Consensus Analystes CA (+1Y NTM)'
    candidates.push(
      { name: 'Consensus CA (+1Y NTM)', value: parseFloat(validNTM.toFixed(4)), status: 'selected', note: 'Consensus Analystes CA (+1Y NTM)' },
      { name: 'Historique CA TTM Réalisé', value: validTTM !== null ? parseFloat(validTTM.toFixed(4)) : null, status: 'ignored', note: 'Non requis' },
      { name: 'Fallback Standard (10%)', value: 0.10, status: 'ignored', note: 'Non requis' }
    )
  } else if (validTTM !== null) {
    selectedGrowth = clamp(validTTM, -0.5, 0.8)
    growthSource = 'Historique CA TTM Réalisé'
    candidates.push(
      { name: 'Consensus CA (+1Y NTM)', value: null, status: 'rejected', note: 'Non disponible' },
      { name: 'Historique CA TTM Réalisé', value: parseFloat(validTTM.toFixed(4)), status: 'selected', note: 'Historique CA TTM Réalisé' },
      { name: 'Fallback Standard (10%)', value: 0.10, status: 'ignored', note: 'Non requis' }
    )
  } else {
    selectedGrowth = 0.10
    growthSource = 'Fallback Modèle Standard (10%)'
    candidates.push(
      { name: 'Consensus CA (+1Y NTM)', value: null, status: 'rejected', note: 'Non disponible' },
      { name: 'Historique CA TTM Réalisé', value: null, status: 'rejected', note: 'Non disponible' },
      { name: 'Fallback Standard (10%)', value: 0.10, status: 'fallback', note: '⚠️ Valeur par défaut : 10.0%' }
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
  let selectedMargin = 0.15
  let marginSource = 'Fallback Modèle Standard (15%)'
  const candidates: AuditCategory['candidates'] = []

  if (typeof marginNetRaw === 'number' && isFinite(marginNetRaw) && marginNetRaw > 0) {
    selectedMargin = clamp(marginNetRaw, 0.01, 0.80)
    marginSource = 'Marge Nette TTM Réelle'
    candidates.push(
      { name: 'Marge Nette TTM Réelle', value: parseFloat(marginNetRaw.toFixed(4)), status: 'selected', note: 'Marge Nette TTM Réelle' },
      { name: 'Fallback Standard (15%)', value: 0.15, status: 'ignored', note: 'Non requis' }
    )
  } else {
    selectedMargin = 0.15
    marginSource = 'Fallback Modèle Standard (15%)'
    candidates.push(
      { name: 'Marge Nette TTM Réelle', value: marginNetRaw !== null ? parseFloat(marginNetRaw.toFixed(4)) : null, status: 'rejected', note: 'Rejeté : Non disponible ou négatif' },
      { name: 'Fallback Standard (15%)', value: 0.15, status: 'fallback', note: '⚠️ Boîte déficitaire : Marge par défaut à 15.0%' }
    )
  }

  return { selectedMargin, marginSource, candidates }
}

export function computePECascade(peForwardRaw: number | null, peTrailingRaw: number | null): CascadePEResult {
  let selectedPE = 20.0
  let peSource = 'Multiple par Défaut (20.0x)'
  const candidates: AuditCategory['candidates'] = []

  if (typeof peForwardRaw === 'number' && isFinite(peForwardRaw) && peForwardRaw > 0) {
    selectedPE = clamp(peForwardRaw, 5, 120)
    peSource = 'Consensus Forward P/E'
    candidates.push(
      { name: 'Forward P/E', value: parseFloat(peForwardRaw.toFixed(2)), status: 'selected', note: 'Consensus Forward P/E' },
      { name: 'Trailing P/E', value: peTrailingRaw !== null ? parseFloat(peTrailingRaw.toFixed(2)) : null, status: 'ignored', note: 'Non requis' },
      { name: 'Multiple par Défaut (20.0x)', value: 20.0, status: 'ignored', note: 'Non requis' }
    )
  } else if (typeof peTrailingRaw === 'number' && isFinite(peTrailingRaw) && peTrailingRaw > 0) {
    selectedPE = clamp(peTrailingRaw, 5, 120)
    peSource = 'P/E Trailing TTM'
    candidates.push(
      { name: 'Forward P/E', value: null, status: 'rejected', note: 'Non disponible' },
      { name: 'Trailing P/E', value: parseFloat(peTrailingRaw.toFixed(2)), status: 'selected', note: 'P/E Trailing TTM' },
      { name: 'Multiple par Défaut (20.0x)', value: 20.0, status: 'ignored', note: 'Non requis' }
    )
  } else {
    selectedPE = 20.0
    peSource = 'Multiple par Défaut (20.0x)'
    candidates.push(
      { name: 'Forward P/E', value: null, status: 'rejected', note: 'Non disponible' },
      { name: 'Trailing P/E', value: peTrailingRaw !== null ? parseFloat(peTrailingRaw.toFixed(2)) : null, status: 'rejected', note: 'Rejeté : Bénéfice Négatif ou non disponible' },
      { name: 'Multiple par Défaut (20.0x)', value: 20.0, status: 'fallback', note: '⚠️ Boîte non rentable / P/E absent : Multiple par défaut à 20.0x' }
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
