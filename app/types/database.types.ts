export type StockStatus = 'research' | 'watchlist' | 'portfolio'
export type GrowthMode = 'cagr' | 'explicit'
export type MarginType = 'net_income' | 'fcf'

export interface AuditCandidate {
  name: string
  value: number | null
  status: 'selected' | 'rejected' | 'ignored'
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
  analyst_growth_estimate: number | null
  audit_data?: AuditData | string | null
  thesis: string | null
  created_at: string
  updated_at: string
  growth_source?: string
  margin_source?: string
  pe_source?: string
}
