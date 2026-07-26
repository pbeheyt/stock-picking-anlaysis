export interface QuantitativeAIResult {
  growth_projections: number[]
  margin_projections: number[]
  target_multiple: number
  discount_rate: number
  risk_spread: number
  justifications: {
    growth: string
    margin: string
    multiple: string
    wacc: string
  }
  raw_report?: string
  analyzed_at?: string
}
