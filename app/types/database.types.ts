export type StockStatus = 'research' | 'watchlist' | 'portfolio'
export type GrowthMode = 'cagr' | 'explicit'

export interface Stock {
  id: string
  ticker: string
  name: string | null
  current_price: number | null
  revenue_ttm: number | null
  shares_outstanding: number | null
  fetched_at: string
  status: StockStatus
  growth_mode: GrowthMode
  projected_growth: number
  growth_y1: number
  growth_y2: number
  growth_y3: number
  growth_y4: number
  growth_y5: number
  projected_margin: number
  target_pe: number
  discount_rate: number
  thesis: string | null
  created_at: string
  updated_at: string
  growth_source?: string
  margin_source?: string
  pe_source?: string
}
