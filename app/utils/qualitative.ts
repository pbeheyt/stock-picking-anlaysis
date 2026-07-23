import type { QualitativeData, BrickEvaluation } from '~/types/database.types'

export const BRICK_WEIGHTS = {
  moat: 0.30,
  growth: 0.25,
  financials: 0.25,
  management: 0.20,
} as const

export type BrickKey = keyof typeof BRICK_WEIGHTS

export const BRICK_META: Record<BrickKey, { label: string; icon: string }> = {
  moat:       { label: 'Moat & Avantage Concurrentiel',      icon: '🏰' },
  growth:     { label: 'Croissance & Catalyseurs',           icon: '🚀' },
  financials: { label: 'Santé Financière & Cash',            icon: '💰' },
  management: { label: 'Réputation & Qualité du Management', icon: '👔' },
}

export const TIER_THRESHOLDS = [
  { min: 90, tier: 'S' as const, label: 'Compounder Exceptionnel', color: 'amber'   },
  { min: 75, tier: 'A' as const, label: 'Haute Qualité',           color: 'emerald' },
  { min: 55, tier: 'B' as const, label: 'Standard / Correct',      color: 'sky'     },
  { min: 40, tier: 'C' as const, label: 'Médiocre / Spéculatif',   color: 'orange'  },
  { min: 0,  tier: 'F' as const, label: 'Value Trap / Danger',     color: 'rose'    },
]

export function computeQualityScore(
  evaluations: Record<BrickKey, BrickEvaluation>
): { score: number; tier: QualitativeData['tier'] } {
  let total = 0
  for (const [key, weight] of Object.entries(BRICK_WEIGHTS)) {
    const brick = evaluations[key as BrickKey]
    const brickScore = brick ? brick.score : 5.0
    total += brickScore * weight
  }
  const score = Math.round(total * 10)
  const tierEntry = TIER_THRESHOLDS.find(t => score >= t.min)!
  return { score, tier: tierEntry.tier }
}

export function getTierConfig(tier: QualitativeData['tier']) {
  return TIER_THRESHOLDS.find(t => t.tier === tier) ?? TIER_THRESHOLDS[TIER_THRESHOLDS.length - 1]
}

export function getGradientLabel(score: number): string {
  if (score >= 9.0) return 'Exceptionnel'
  if (score >= 7.5) return 'Très Solide'
  if (score >= 5.5) return 'Correct'
  if (score >= 3.5) return 'Fragile'
  return 'Danger Critique'
}

export function getGradientColor(score: number): string {
  if (score >= 9.0) return 'emerald-400 font-bold'
  if (score >= 7.5) return 'emerald-400'
  if (score >= 5.5) return 'sky-400'
  if (score >= 3.5) return 'amber-400'
  return 'rose-500'
}

export function generateDeepResearchPrompt(ticker: string, companyName: string): string {
  return `**RÔLE :**
Vous agissez en tant qu'analyste financier institutionnel spécialisé en "Quality Investing". Votre objectif est de fournir une radiographie factuelle, approfondie et chiffrée de l'entreprise **${companyName} (Ticker: ${ticker})**.

**RÈGLES STRICTES D'ANALYSE :**
1. **Objectivité & Précision :** Reposez exclusivement sur des faits chiffrés, métriques de marché, publications officielles et données vérifiables des 12 derniers mois.
2. **Exhaustivité :** Explorez en détail les pistes d'investigation répertoriées ci-dessous pour chaque catégorie. Indiquez "N.A." si une donnée n'est pas disponible.

**CONSIGNE DE RÉDACTION :**
Rédigez des faits clés précis (bullet points avec sources de type [Nom](http...) si disponibles) sous les 4 catégories suivantes :
- [+] **Éléments Factuels Positifs :** Les faits ou métriques récentes à fort impact positif.
- [-] **Éléments Factuels Négatifs / Risques :** Les faits, risques ou faiblesses récentes à fort impact négatif.

**LES 4 CATÉGORIES ET PISTES D'INVESTIGATION :**

**1. MOAT & AVANTAGE CONCURRENTIEL**
- Profondeur des douves (brevets, effets de réseau, monopoles/oligopoles, barrières à l'entrée)
- Pouvoir de fixation des prix (pricing power, évolution des marges brutes, capacité de revalorisation)
- Coûts de changement pour les clients (switching costs, taux de rétention, contrats pluriannuels)
- Avantages de coût, d'échelle ou technologiques vs concurrents directs

**2. CROISSANCE & CATALYSEURS**
- Évolution récente du Chiffre d'Affaires, des volumes et des prises de commandes
- Expansion de la taille du marché sous-jacent (TAM) et méga-tendances
- Nouveaux contrats signés, lancements de produits récents et acquisitions stratégiques
- Relais de croissance à 1-3 ans et freins potentiels à l'expansion

**3. SANTÉ FINANCIÈRE & CASH**
- Conversion en Free Cash Flow (FCF) et trésorerie disponible
- Niveau d'endettement net (Dette Nette / EBITDA, profil de maturité des créances)
- Structure et évolution des marges opérationnelles et rentabilité des capitaux
- Risques de liquidité, de besoin en fonds de roulement (BFR) ou d'appels au marché

**4. REPUTATION & QUALITE DU MANAGEMENT**
- Part du capital et des droits de vote détenue par les dirigeants (Skin in the game)
- Stabilité, track record et réputation du CEO / fondateurs
- Historique d'allocation de capital (rachats d'actions, politique de dividendes, M&A passé)
- Qualité de la gouvernance, transparence comptable et réputation sectorielle`
}
