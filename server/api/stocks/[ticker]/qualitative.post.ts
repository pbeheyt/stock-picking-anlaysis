import { StockRepository } from '../../../repository/stockRepository'
import { aiComplete, parseAiJson } from '../../../utils/ai'
import { computeQualityScore, type BrickKey } from '~/utils/qualitative'

export default defineEventHandler(async (event) => {
  const ticker = getRouterParam(event, 'ticker')?.toUpperCase()
  if (!ticker) throw createError({ statusCode: 400, statusMessage: 'Ticker requis' })

  const body = await readBody<{ raw_report: string; model?: 'deepseek-v4-flash' | 'deepseek-v4-pro' | 'qwen/qwen3.7-plus' | string }>(event)

  if (!body?.raw_report?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Rapport brut requis' })
  }

  const targetAiModel = body.model || 'deepseek-v4-flash'

  const stock = await StockRepository.getByTicker(ticker)
  if (!stock) throw createError({ statusCode: 404, statusMessage: 'Stock non trouvé' })

  // ═══════════════════════════════════════════════════════════════════════════
  //  PIPELINE RUBRIC INSTITUTIONNEL (Single-Pass)
  //  Évaluation holistique 0-10, paragraphes dialectiques & key takeaways
  // ═══════════════════════════════════════════════════════════════════════════

  const rubricSystemPrompt = `Tu es un analyste financier Senior Hedge Fund spécialisé en Quality Investing.
On te fournit le rapport de recherche fondamentale brut d'une entreprise (${ticker}).

CONSIGNE D'ÉVALUATION :
Pour chacune des 4 dimensions suivantes :
1. "moat" (Moat & Avantage Concurrentiel)
2. "growth" (Croissance & Catalyseurs)
3. "financials" (Santé Financière & Cash)
4. "management" (Réputation & Qualité du Management)

GRILLE DE NOTATION RUBRIC (Entiers de 0 à 10) :
- [9 - 10] Exceptionnel : Dominance rare / Pricing power absolu / Trésorerie forteresse / Hyper-croissance / CEO fondateur génial.
- [7 - 8] Très Solide : Avantage concurrentiel fort / Croissance supérieure au secteur / Bilan très sain / Skin in the game élevé.
- [5 - 6] Correct / Moyenne : Positionnement standard / Croissance modérée / Endettement maîtrisé / Management professionnel sans distinction particulière.
- [3 - 4] Fragile / Préoccupant : Marge sous pression / Dépendance forte / Endettement significatif / Dilutions passées / Incertitudes.
- [0 - 2] Danger Critique : Absence totale de douve / Cash burn intense / Perte de marché majeure / Risque de faillite / Conflits d'intérêts.

POUR CHAQUE DIMENSION, FOURNIS :
1. "score" : Un nombre ENTIER de 0 à 10 (sans aucune décimale, ex: 7, 8, 5, 9) basé STRICTEMENT sur la grille d'ancrage.
2. "justification" : Un PARAGRAPHE D'ANALYSE INSTITUTIONNEL DÉTAILLÉ (4 à 6 phrases riches en français). Explique de manière approfondie et nuancée les forces, les chiffres clés, et les réserves qui justifient cette note.
3. "key_takeaways" : 4 à 7 faits ou métriques clés majeurs extraits du texte.
   - Précède CHAQUE fait par [+] s'il s'agit d'un point fort/opportunité, ou [-] s'il s'agit d'un risque/faiblesse.
   - CONSERVE STRICTEMENT les liens markdown d'origine de type [Nom Source](http...) associés au fait si présents dans le rapport brut.

FORMAT JSON EXCLUSIF ATTENDU :
{
  "moat": {
    "score": 7,
    "justification": "La société dispose d'un fort pricing power sur son marché de niche...",
    "key_takeaways": [
      "[+] Technologie de refroidissement liquide brevetée. [Boursorama](https://boursorama.com)",
      "[-] Forte dépendance à un petit nombre de clients grands comptes. [TradingSat](https://tradingsat.com)"
    ]
  },
  "growth": {
    "score": 8,
    "justification": "...",
    "key_takeaways": ["..."]
  },
  "financials": {
    "score": 6,
    "justification": "...",
    "key_takeaways": ["..."]
  },
  "management": {
    "score": 7,
    "justification": "...",
    "key_takeaways": ["..."]
  }
}`

  const deepseekApiKey = getHeader(event, 'x-deepseek-api-key') || undefined
  const openrouterApiKey = getHeader(event, 'x-openrouter-api-key') || undefined

  let rawResult = ''
  try {
    rawResult = await aiComplete({
      model: targetAiModel,
      temperature: 0.0,
      response_format: { type: 'json_object' },
      deepseekApiKey,
      openrouterApiKey,
      ticker,
      callType: 'qualitative_research',
      messages: [
        { role: 'system', content: rubricSystemPrompt },
        { role: 'user', content: body.raw_report },
      ],
    })
  } catch (err: any) {
    throw createError({ statusCode: 502, statusMessage: err.message || 'Erreur API IA' })
  }

  let extractedData: Record<string, any>
  try {
    extractedData = parseAiJson(rawResult)
  } catch (err: any) {
    console.error('Erreur parsing Rubric JSON:', rawResult)
    const snippet = (rawResult || '').slice(0, 150).replace(/[\r\n]+/g, ' ')
    throw createError({ statusCode: 422, statusMessage: `Échec parsing JSON DeepSeek Flash. Extrait: "${snippet}..."` })
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  Calcul du Score Global /100 et Attribution du Tier via computeQualityScore
  // ═══════════════════════════════════════════════════════════════════════════

  const brickKeys: BrickKey[] = ['moat', 'growth', 'financials', 'management']
  const evaluations: Record<string, any> = {}

  for (const key of brickKeys) {
    const bData = extractedData[key] || {}
    const score = Math.max(0, Math.min(10, Math.round(Number(bData.score || 5))))
    const justification = String(bData.justification || bData.summary || 'Analyse effectuée par l\'IA.')
    const rawTakeaways = Array.isArray(bData.key_takeaways) ? bData.key_takeaways : (Array.isArray(bData.takeaways) ? bData.takeaways : [])
    const key_takeaways = rawTakeaways.map((t: any) => String(t))

    evaluations[key] = {
      score,
      justification,
      summary: justification,
      key_takeaways,
      takeaways: key_takeaways,
    }
  }

  const { score: qualityScore, tier } = computeQualityScore(evaluations as any)

  // ═══════════════════════════════════════════════════════════════════════════
  //  Persistance SQLite via StockRepository
  // ═══════════════════════════════════════════════════════════════════════════

  const qualitativeData = {
    raw_report: body.raw_report,
    analyzed_at: new Date().toISOString(),
    evaluations,
    quality_score: qualityScore,
    tier,
  }

  await StockRepository.updateQualitativeData(stock.id, qualitativeData)

  return qualitativeData
})
