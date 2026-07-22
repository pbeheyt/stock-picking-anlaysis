export type StockStatus = 'research' | 'watchlist' | 'portfolio'
export type GrowthMode = 'cagr' | 'explicit'
export type MarginType = 'net_income' | 'fcf'

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
  thesis: string | null
  created_at: string
  updated_at: string
  growth_source?: string
  margin_source?: string
  pe_source?: string
}
