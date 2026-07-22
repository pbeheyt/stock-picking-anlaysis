import YahooFinance from 'yahoo-finance2'

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] })

async function testFetch(ticker: string) {
  console.log(`\n🔍 Fetching data for: ${ticker}...\n`)

  try {
    // 1. Données de marché rapides
    const quote = await yahooFinance.quote(ticker)

    // 2. Données fondamentales poussées
    const summary = await yahooFinance.quoteSummary(ticker, {
      modules: ['financialData', 'defaultKeyStatistics', 'summaryDetail'],
    })

    console.log('--- 📊 METRIQUES DE MARCHE (Quote) ---')
    console.log({
      nom: quote.shortName || quote.longName,
      prix: quote.regularMarketPrice,
      devise: quote.currency,
      marketCap: quote.marketCap,
      perTrailing: quote.trailingPE,
      perForward: quote.forwardPE,
    })

    console.log('\n--- 🏛️ SANTÉ ET MARGES (FinancialData & Stats) ---')
    console.log({
      margeBrute: summary.financialData?.grossMargins,
      margeOp: summary.financialData?.operatingMargins,
      roe: summary.financialData?.returnOnEquity,
      fcf: summary.financialData?.freeCashflow,
      croissanceCA: summary.financialData?.revenueGrowth,
      detteTotale: summary.financialData?.totalDebt,
      priceToBook: summary.defaultKeyStatistics?.priceToBook,
      evToEbitda: summary.defaultKeyStatistics?.enterpriseToEbitda,
    })
  } catch (err) {
    console.error('❌ Erreur de fetch :', err)
  }
}

const tickers = process.argv.slice(2).length > 0 ? process.argv.slice(2) : ['ASML', 'NVDA', 'TTE.PA']

for (const ticker of tickers) {
  await testFetch(ticker)
}
