-- Create stock_status enum
CREATE TYPE public.stock_status AS ENUM ('research', 'watchlist', 'portfolio');

-- Create public.stocks table
CREATE TABLE public.stocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    ticker TEXT NOT NULL,
    name TEXT,
    current_price NUMERIC,
    revenue_ttm NUMERIC,
    shares_outstanding NUMERIC,
    fetched_at TIMESTAMPTZ DEFAULT NOW(),
    status public.stock_status NOT NULL DEFAULT 'research',
    projected_growth NUMERIC NOT NULL DEFAULT 0.10,
    projected_margin NUMERIC NOT NULL DEFAULT 0.20,
    target_pe NUMERIC NOT NULL DEFAULT 20,
    discount_rate NUMERIC NOT NULL DEFAULT 0.10,
    thesis TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT stocks_user_id_ticker_key UNIQUE (user_id, ticker)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.stocks ENABLE ROW LEVEL SECURITY;

-- Policies for RLS
CREATE POLICY "Users can manage their own stocks"
    ON public.stocks
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
