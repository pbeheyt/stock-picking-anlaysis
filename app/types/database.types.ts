import type { QuantitativeAIResult } from '~/server/api/stock/[ticker]/quantitative.post'

export type StockStatus = 'portfolio' | 'watchlist'
export type GrowthMode = 'cagr' | 'explicit'
export type MarginMode = 'constant' | 'explicit'
export type MarginType = 'net_income' | 'fcf'

export interface AuditCandidate {
  name: string
  value: number | null
  status: 'selected' | 'rejected' | 'ignored' | 'fallback'
  note: string
}

export interface AuditCategory {
  selected: number
  candidates: AuditCandidate[]
}

export interface AuditData {
  growth: AuditCategory
  margin: AuditCategory
  pe: AuditCategory
  discount_rate?: AuditCategory
}

export interface QualitativeFact {
  text: string
  sentiment: 'positive' | 'negative'
  source_name: string | null
  source_url: string | null
  score: number
  reasoning: string
}

export interface BrickEvaluation {
  score: number
  justification: string
  summary?: string
  key_takeaways: string[]
  takeaways?: string[]
}

export type BrickKey = 'moat' | 'growth' | 'financials' | 'management'

export interface QualitativeData {
  raw_report: string
  analyzed_at: string
  evaluations: Record<BrickKey, BrickEvaluation>
  quality_score: number
  tier: 'S' | 'A' | 'B' | 'C' | 'F'
}

export interface Stock {
  id: string
  ticker: string
  name: string | null
  currency: string
  current_price: number | null
  revenue_ttm: number | null
  shares_outstanding: number | null
  beta: number
  fetched_at: string
  status: StockStatus
  margin_type: MarginType
  growth_mode: GrowthMode
  projected_growth: number
  growth_y1: number
  growth_y2: number
  growth_y3: number
  growth_y4: number
  growth_y5: number
  revenue_y1: number | null
  revenue_y2: number | null
  revenue_y3: number | null
  revenue_y4: number | null
  revenue_y5: number | null
  projected_margin: number
  margin_mode?: MarginMode
  margin_y1?: number
  margin_y2?: number
  margin_y3?: number
  margin_y4?: number
  margin_y5?: number
  target_multiple: number
  discount_rate: number
  risk_spread: number
  market_cap: number | null
  pe_trailing_raw: number | null
  pe_forward_raw: number | null
  margin_gross_raw: number | null
  margin_operating_raw: number | null
  margin_net_raw: number | null
  margin_fcf_raw: number | null
  total_cash: number | null
  total_debt: number | null
  free_cash_flow_raw: number | null
  analyst_target_price: number | null
  analyst_target_median?: number | null
  analyst_target_low?: number | null
  analyst_target_high?: number | null
  analyst_growth_estimate: number | null
  analyst_count?: number | null
  audit_data?: AuditData | string | null
  qualitative_data?: QualitativeData | string | null
  quanti_ai_data?: QuantitativeAIResult | string | null
  regression_fair_price?: number | null
  quant_preset?: string | null
  quant_start_date?: string | null
  quant_end_date?: string | null
  thesis: string | null
  created_at: string
  updated_at: string
  growth_source?: string
  margin_source?: string
  pe_source?: string
}

export interface StockApiResponse {
  ticker: string
  name: string
  currency: string
  current_price: number | null
  revenue_ttm: number | null
  shares_outstanding: number | null
  beta: number
  fetched_at: string
  growth_mode: GrowthMode
  default_growth: number
  growth_y1: number
  growth_y2: number
  growth_y3: number
  growth_y4: number
  growth_y5: number
  growth_source: string
  default_margin_type: MarginType
  default_margin: number
  margin_source: string
  default_target_multiple: number
  pe_source: string
  default_discount_rate: number
  default_risk_spread: number
  market_cap: number | null
  pe_trailing_raw: number | null
  pe_forward_raw: number | null
  margin_gross_raw: number | null
  margin_operating_raw: number | null
  margin_net_raw: number | null
  margin_fcf_raw: number | null
  total_cash: number | null
  total_debt: number | null
  free_cash_flow_raw: number | null
  analyst_target_low: number | null
  analyst_target_median: number | null
  analyst_target_price: number | null
  analyst_target_high: number | null
  analyst_growth_estimate: number | null
  analyst_count: number | null
  audit_data: AuditData
}
