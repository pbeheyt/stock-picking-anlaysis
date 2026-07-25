import YahooFinance from 'yahoo-finance2'
import { getDb } from '../../utils/db'

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}))
  const forceAll = body?.forceAll ?? false
  const targetTickers: string[] = body?.tickers ?? []

  const db = getDb()
  const now = new Date().toISOString()

  let stocks: any[] = []
  if (targetTickers.length > 0) {
    const placeholders = targetTickers.map(() => '?').join(', ')
    stocks = db.prepare(`SELECT id, ticker, fetched_at FROM stocks WHERE UPPER(ticker) IN (${placeholders})`).all(...targetTickers.map(t => t.toUpperCase()))
  } else {
    stocks = db.prepare('SELECT id, ticker, fetched_at FROM stocks').all()
  }

  if (!stocks || stocks.length === 0) {
    return { count: 0, synced_at: now, stocks: [] }
  }

  const tickersList = Array.from(new Set(stocks.map(s => s.ticker)))

  try {
    // Single-Request Batching HTTP Call to Yahoo Finance
    const quotes = await yahooFinance.quote(tickersList)
    const quotesArray = Array.isArray(quotes) ? quotes : [quotes]

    const updateStmt = db.prepare(`
      UPDATE stocks 
      SET 
        current_price = ?,
        pe_trailing_raw = ?,
        pe_forward_raw = ?,
        fetched_at = ?,
        updated_at = ?
      WHERE ticker = ?
    `)

    let updatedCount = 0

    const transaction = db.transaction(() => {
      for (const q of quotesArray) {
        if (!q || !q.symbol || q.regularMarketPrice === undefined) continue

        const ticker = q.symbol.toUpperCase()
        const price = q.regularMarketPrice ?? null
        const peTrailing = q.trailingPE ?? null
        const peForward = q.forwardPE ?? null

        updateStmt.run(
          price,
          peTrailing,
          peForward,
          now,
          now,
          ticker
        )
        updatedCount++
      }
    })

    transaction()

    const allUpdated = db.prepare('SELECT * FROM stocks').all()
    allUpdated.forEach((row: any) => {
      if (row.audit_data && typeof row.audit_data === 'string') {
        try { row.audit_data = JSON.parse(row.audit_data) } catch {}
      }
    })

    return {
      count: updatedCount,
      synced_at: now,
      stocks: allUpdated,
    }
  } catch (err: any) {
    console.error('[Batch Sync Yahoo Finance] Erreur lors de la synchro groupée:', err?.message || err)
    throw createError({
      statusCode: 500,
      statusMessage: `Erreur lors de la synchronisation des cours : ${err?.message || err}`,
    })
  }
})
