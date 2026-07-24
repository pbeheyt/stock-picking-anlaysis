import { getDb } from '../../../utils/db'
import { aiComplete, parseAiJson } from '../../../utils/ai'

export interface QuantitativeAIResult {
  growth_projections: number[] // 5 numbers in %, e.g. [15.0, 12.5, 10.0, 8.0, 6.0]
  margin_projections: number[] // 5 numbers in %, e.g. [22.0, 23.0, 24.0, 25.0, 25.0]
  target_multiple: number // P/E exit multiple, e.g. 25.0
  discount_rate: number // WACC in %, e.g. 9.5
  risk_spread: number // scenario spread in %, e.g. 15.0
  justifications: {
    growth: string
    margin: string
    multiple: string
    wacc: string
  }
  raw_report?: string
  analyzed_at?: string
}

export default defineEventHandler(async (event) => {
  const ticker = getRouterParam(event, 'ticker')?.toUpperCase()
  if (!ticker) throw createError({ statusCode: 400, statusMessage: 'Ticker requis' })

  const body = await readBody<{ raw_report: string; model?: string }>(event)

  if (!body?.raw_report?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Rapport brut requis' })
  }

  const targetAiModel = body.model || 'deepseek-v4-flash'

  const db = getDb()
  const stock = db.prepare('SELECT * FROM stocks WHERE ticker = ?').get(ticker) as any
  if (!stock) throw createError({ statusCode: 404, statusMessage: 'Stock non trouvé' })

  const quantSystemPrompt = `Tu es un analyste financier Senior d'Equity Research (Wall Street).
On te fournit le rapport de recherche fondamentale / quantitative brut d'une entreprise (${ticker}).

Ta mission est d'extraire, de déduire et de justifier les hypothèses précises pour alimenter un modèle d'évaluation DCF sur 5 ans.

CONSIGNE EXPLICITE D'EXTRACTION :
1. "growth_projections" : Un tableau JSON de EXACTEMENT 5 NOMBRES (en pourcentage %, ex: 15.0, 12.5, 10.0, 8.0, 6.0). Ces 5 nombres représentent la croissance du Chiffre d'Affaires projetée pour l'An 1, An 2, An 3, An 4, An 5.
2. "margin_projections" : Un tableau JSON de EXACTEMENT 5 NOMBRES (en pourcentage %, ex: 20.0, 21.0, 22.0, 23.0, 23.0). Ces 5 nombres représentent la Marge Nette projetée pour l'An 1, An 2, An 3, An 4, An 5.
3. "target_multiple" : Un nombre décimal représentant le Multiple de Sortie P/E (Price-to-Earnings à l'An 5, ex: 25.0).
4. "discount_rate" : Un nombre décimal représentant le Taux d'Actualisation / WACC (en %, ex: 9.5).
5. "risk_spread" : Un nombre décimal (en %, ex: 15.0) représentant le spread d'incertitude entre le scénario Bear et Bull.
6. "justifications" : Un objet contenant 4 explications synthétiques et étayées en français (2 à 4 phrases chacune) :
   - "growth" : Justification des taux de croissance retenus.
   - "margin" : Justification de la trajectoire des marges nettes.
   - "multiple" : Justification du multiple P/E retenu (moyenne historique, pairs).
   - "wacc" : Justification du taux d'actualisation WACC retenu.

FORMAT JSON EXCLUSIF ATTENDU :
{
  "growth_projections": [15.0, 12.5, 10.0, 8.0, 6.0],
  "margin_projections": [22.0, 23.0, 24.0, 25.0, 25.0],
  "target_multiple": 25.0,
  "discount_rate": 9.5,
  "risk_spread": 15.0,
  "justifications": {
    "growth": "La croissance de 15% en An 1 diminue progressivement vers 6%...",
    "margin": "L'expansion des marges vers 25% reflète le levier opérationnel...",
    "multiple": "Un multiple P/E de 25x s'aligne sur la moyenne historique du secteur...",
    "wacc": "Le WACC de 9.5% intègre le bêta de l'entreprise et la prime de risque marché..."
  }
}`

  let rawResult = ''
  try {
    rawResult = await aiComplete({
      model: targetAiModel,
      temperature: 0.0,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: quantSystemPrompt },
        { role: 'user', content: body.raw_report },
      ],
    })
  } catch (err: any) {
    throw createError({ statusCode: 502, statusMessage: `Erreur API DeepSeek : ${err.message}` })
  }

  let parsed: Record<string, any>
  try {
    parsed = parseAiJson(rawResult)
  } catch (err: any) {
    console.error('Erreur parsing Quantitative JSON:', rawResult)
    const snippet = (rawResult || '').slice(0, 150).replace(/[\r\n]+/g, ' ')
    throw createError({ statusCode: 422, statusMessage: `Échec parsing JSON DeepSeek. Extrait: "${snippet}..."` })
  }

  const growthProjections = Array.isArray(parsed.growth_projections) && parsed.growth_projections.length === 5
    ? parsed.growth_projections.map((v: any) => Number(v) || 0)
    : [10, 10, 10, 10, 10]

  const marginProjections = Array.isArray(parsed.margin_projections) && parsed.margin_projections.length === 5
    ? parsed.margin_projections.map((v: any) => Number(v) || 0)
    : [15, 15, 15, 15, 15]

  const quantitativeResult: QuantitativeAIResult = {
    growth_projections: growthProjections,
    margin_projections: marginProjections,
    target_multiple: Number(parsed.target_multiple) || 20,
    discount_rate: Number(parsed.discount_rate) || 10,
    risk_spread: Number(parsed.risk_spread) || 15,
    justifications: {
      growth: String(parsed.justifications?.growth || 'Croissance basée sur le rapport d\'analyse.'),
      margin: String(parsed.justifications?.margin || 'Marge basée sur le rapport d\'analyse.'),
      multiple: String(parsed.justifications?.multiple || 'Multiple basé sur l\'historique du secteur.'),
      wacc: String(parsed.justifications?.wacc || 'WACC calculé à partir du profil de risque.'),
    },
    raw_report: body.raw_report,
    analyzed_at: new Date().toISOString(),
  }

  try {
    db.prepare('UPDATE stocks SET quanti_ai_data = ?, updated_at = ? WHERE id = ?')
      .run(JSON.stringify(quantitativeResult), new Date().toISOString(), stock.id)
  } catch (err) {
    console.warn('Persistance quanti_ai_data optionnelle:', err)
  }

  return quantitativeResult
})
