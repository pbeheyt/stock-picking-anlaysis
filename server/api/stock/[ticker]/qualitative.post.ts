import { getDb } from '../../../utils/db'
import { aiComplete, parseAiJson } from '../../../utils/ai'

export default defineEventHandler(async (event) => {
  const ticker = getRouterParam(event, 'ticker')?.toUpperCase()
  if (!ticker) throw createError({ statusCode: 400, statusMessage: 'Ticker requis' })

  const body = await readBody<{ raw_report: string; model?: 'deepseek-v4-flash' | 'deepseek-v4-pro' | 'qwen/qwen3.7-plus' | string }>(event)

  if (!body?.raw_report?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Rapport brut requis' })
  }

  const targetAiModel = body.model || 'deepseek-v4-flash'

  const db = getDb()
  const stock = db.prepare('SELECT * FROM stocks WHERE ticker = ?').get(ticker) as any
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

GRILLE DE NOTATION RUBRIC (0.0 à 10.0) :
- [9.0 - 10.0] Exceptionnel : Dominance rare / Pricing power absolu / Trésorerie forteresse / Hyper-croissance / CEO fondateur génial.
- [7.5 - 8.9] Très Solide : Avantage concurrentiel fort / Croissance supérieure au secteur / Bilan très sain / Skin in the game élevé.
- [5.5 - 7.4] Correct / Moyenne : Positionnement standard / Croissance modérée / Endettement maîtrisé / Management professionnel sans distinction particulière.
- [3.5 - 5.4] Fragile / Préoccupant : Marge sous pression / Dépendance forte / Endettement significatif / Dilutions passées / Incertitudes.
- [0.0 - 3.4] Danger Critique : Absence totale de douve / Cash burn intense / Perte de marché majeure / Risque de faillite / Conflits d'intérêts.

POUR CHAQUE DIMENSION, FOURNIS :
1. "score" : Une note de 0.0 à 10.0 (arrondie à 1 décimale) basée STRICTEMENT sur la grille d'ancrage.
2. "justification" : Un PARAGRAPHE D'ANALYSE INSTITUTIONNEL DÉTAILLÉ (4 à 6 phrases riches en français). Explique de manière approfondie et nuancée les forces, les chiffres clés, et les réserves qui justifient cette note.
3. "key_takeaways" : 4 à 7 faits ou métriques clés majeurs extraits du texte (reprends les chiffres clés et sources si mentionnés).


FORMAT JSON EXCLUSIF ATTENDU :
{
  "moat": {
    "score": 7.5,
    "justification": "La société dispose d'un fort pricing power sur son marché de niche grâce à sa technologie propriétaire de refroidissement liquide. Toutefois, l'absence de brevets bloquants au niveau mondial et la concurrence d'acteurs de plus grande taille incitent à la prudence quant à la pérennité séculaire de cette douve.",
    "key_takeaways": [
      "Technologie de refroidissement liquide propriétaire brevetée en Europe",
      "Forte dépendance à un petit nombre de clients grands comptes"
    ]
  },
  "growth": {
    "score": 8.0,
    "justification": "...",
    "key_takeaways": ["..."]
  },
  "financials": {
    "score": 6.5,
    "justification": "...",
    "key_takeaways": ["..."]
  },
  "management": {
    "score": 7.0,
    "justification": "...",
    "key_takeaways": ["..."]
  }
}`

  let rawResult = ''
  try {
    rawResult = await aiComplete({
      model: targetAiModel,
      temperature: 0.0,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: rubricSystemPrompt },
        { role: 'user', content: body.raw_report },
      ],
    })

  } catch (err: any) {
    throw createError({ statusCode: 502, statusMessage: `Erreur API DeepSeek : ${err.message}` })
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
  //  Calcul du Score Global /100 et Attribution du Tier
  // ═══════════════════════════════════════════════════════════════════════════

  const brickKeys = ['moat', 'growth', 'financials', 'management'] as const
  const WEIGHTS = { moat: 0.30, growth: 0.25, financials: 0.25, management: 0.20 }

  const evaluations: Record<string, { score: number; justification: string; key_takeaways: string[] }> = {}

  let totalScore = 0

  for (const key of brickKeys) {
    const bData = extractedData[key] || {}
    const score = Math.max(0, Math.min(10, Math.round(Number(bData.score || 5.0) * 10) / 10))
    const justification = String(bData.justification || 'Analyse effectuée par l\'IA.')
    const rawTakeaways = Array.isArray(bData.key_takeaways) ? bData.key_takeaways : []
    const key_takeaways = rawTakeaways.map((t: any) => String(t))

    evaluations[key] = {
      score,
      justification,
      key_takeaways,
    }

    totalScore += score * WEIGHTS[key]
  }

  const qualityScore = Math.round(totalScore * 10)

  let tier: 'S' | 'A' | 'B' | 'C' | 'F'
  if (qualityScore >= 90) tier = 'S'
  else if (qualityScore >= 75) tier = 'A'
  else if (qualityScore >= 55) tier = 'B'
  else if (qualityScore >= 40) tier = 'C'
  else tier = 'F'

  // ═══════════════════════════════════════════════════════════════════════════
  //  Persistance SQLite
  // ═══════════════════════════════════════════════════════════════════════════

  const qualitativeData = {
    raw_report: body.raw_report,
    analyzed_at: new Date().toISOString(),
    evaluations,
    quality_score: qualityScore,
    tier,
  }

  db.prepare('UPDATE stocks SET qualitative_data = ?, updated_at = ? WHERE id = ?')
    .run(JSON.stringify(qualitativeData), new Date().toISOString(), stock.id)

  return qualitativeData
})
