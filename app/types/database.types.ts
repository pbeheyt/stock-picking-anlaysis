export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type StockStatus = 'research' | 'watchlist' | 'portfolio'

export interface Stock {
  id: string
  user_id: string
  ticker: string
  name: string | null
  current_price: number | null
  revenue_ttm: number | null
  shares_outstanding: number | null
  fetched_at: string
  status: StockStatus
  projected_growth: number
  projected_margin: number
  target_pe: number
  discount_rate: number
  thesis: string | null
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      stocks: {
        Row: Stock
        Insert: Omit<Stock, 'id' | 'created_at' | 'updated_at' | 'fetched_at'> & {
          id?: string
          fetched_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Omit<Stock, 'id'>>
      }
    }
    Enums: {
      stock_status: StockStatus
    }
  }
}
