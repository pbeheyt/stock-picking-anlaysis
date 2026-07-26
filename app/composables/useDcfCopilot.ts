import type { QuantitativeAIResult } from '~/types/ai.types'
import type { useStockWorkspace } from './useStockWorkspace'

export function useDcfCopilot(
  tickerParam: Ref<string>,
  workspace: ReturnType<typeof useStockWorkspace>,
  onSuccess?: () => void
) {
  const toast = useToast()

  const isAnalyzingQuant = ref(false)
  const quantAiErrorMessage = ref<string | null>(null)
  const quantAiResult = ref<QuantitativeAIResult | null>(null)

  const quantiPromptText = computed(() => {
    const name = workspace.stock.value?.name || tickerParam.value
    return `Tu es un analyste financier Senior Equity Research. Effectue une recherche approfondie et chiffrée sur la société ${name} (${tickerParam.value}).

Consigne stricte de recherche quantitative :
1. Détermine les prévisions de croissance annuelle du Chiffre d'Affaires sur les 5 prochaines années (An 1 à An 5). Justifie chaque année (consensus, carnet de commandes, dynamique de marché).
2. Détermine la trajectoire de la Marge Nette sur 5 ans (An 1 à An 5). Justifie l'évolution (levier opérationnel, pricing power, R&D).
3. Estime le Multiple d'Exit P/E (Price-to-Earnings à l'An 5) en te basant sur la moyenne historique du secteur et des pairs.
4. Évalue le Taux d'Actualisation WACC (%) approprié d'après le bêta et la structure du capital.

Fournis un rapport complet et structuré en français avec toutes les données chiffrées et leurs justifications.`
  })

  // Synchronise les données existantes du stock si disponibles
  watch(() => workspace.stock.value, (newStock) => {
    if (newStock?.quanti_ai_data && !quantAiResult.value) {
      quantAiResult.value = safeJsonParse(newStock.quanti_ai_data, null)
    }
  }, { immediate: true })

  const injectAICopilotProjections = () => {
    if (!quantAiResult.value) return

    const data = quantAiResult.value
    workspace.growthMode.value = 'explicit'
    workspace.marginMode.value = 'explicit'

    if (data.growth_projections && data.growth_projections.length === 5) {
      workspace.growthY1.value = data.growth_projections[0] / 100
      workspace.growthY2.value = data.growth_projections[1] / 100
      workspace.growthY3.value = data.growth_projections[2] / 100
      workspace.growthY4.value = data.growth_projections[3] / 100
      workspace.growthY5.value = data.growth_projections[4] / 100
    }

    if (data.margin_projections && data.margin_projections.length === 5) {
      workspace.marginY1.value = data.margin_projections[0] / 100
      workspace.marginY2.value = data.margin_projections[1] / 100
      workspace.marginY3.value = data.margin_projections[2] / 100
      workspace.marginY4.value = data.margin_projections[3] / 100
      workspace.marginY5.value = data.margin_projections[4] / 100
    }

    if (data.target_multiple) workspace.targetMultiple.value = data.target_multiple
    if (data.discount_rate) workspace.discountRate.value = data.discount_rate / 100
    if (data.risk_spread) workspace.riskSpread.value = data.risk_spread / 100

    toast.success('Hypothèses IA injectées avec succès dans le modèle DCF.')
    if (onSuccess) onSuccess()
  }

  const injectYahooBaselineProjections = async () => {
    try {
      const freshApi = await $fetch<any>(`/api/stocks/${encodeURIComponent(tickerParam.value)}`)
      if (!freshApi) return

      workspace.growthMode.value = freshApi.growth_mode || 'cagr'
      workspace.marginMode.value = 'constant'

      const g = freshApi.default_growth ?? 0.10
      workspace.growth.value = g
      workspace.growthY1.value = freshApi.growth_y1 ?? g
      workspace.growthY2.value = freshApi.growth_y2 ?? g
      workspace.growthY3.value = freshApi.growth_y3 ?? g
      workspace.growthY4.value = freshApi.growth_y4 ?? g
      workspace.growthY5.value = freshApi.growth_y5 ?? g

      const m = freshApi.default_margin ?? freshApi.margin_net_raw ?? 0.15
      workspace.margin.value = m
      workspace.marginY1.value = m
      workspace.marginY2.value = m
      workspace.marginY3.value = m
      workspace.marginY4.value = m
      workspace.marginY5.value = m

      workspace.targetMultiple.value = freshApi.default_target_multiple ?? freshApi.pe_forward_raw ?? 20.0
      workspace.discountRate.value = freshApi.default_discount_rate ?? 0.10
      workspace.riskSpread.value = freshApi.default_risk_spread ?? 0.20

      toast.success('Hypothèses de base Yahoo Finance injectées avec succès.')
      if (onSuccess) onSuccess()
    } catch (err: any) {
      console.error('Erreur injection hypothèses Yahoo:', err)
      toast.error('Impossible de charger les hypothèses de base Yahoo Finance.')
    }
  }

  const handleAnalyzeQuant = async (payload: { rawReport: string; modelId?: string } | string, modelArg?: string) => {
    const rawReport = typeof payload === 'string' ? payload : payload.rawReport
    const model = typeof payload === 'string' ? modelArg : payload.modelId

    isAnalyzingQuant.value = true
    try {
      const res = await $fetch<QuantitativeAIResult>(`/api/stocks/${encodeURIComponent(tickerParam.value)}/quantitative`, {
        method: 'POST',
        headers: getApiHeaders(),
        body: { raw_report: rawReport, model },
      })
      quantAiResult.value = res

      injectAICopilotProjections()
      workspace.saveHypotheses(true)
      toast.success('Analyse quanti IA générée avec succès.')
    } catch (err: any) {
      console.error('Erreur analyse quanti AI:', err)
      const msg = err?.data?.statusMessage || err?.response?._data?.statusMessage || err?.message || 'Erreur lors de l\'analyse par l\'IA.'
      toast.error(msg)
    } finally {
      isAnalyzingQuant.value = false
    }
  }

  return {
    isAnalyzingQuant,
    quantAiErrorMessage,
    quantAiResult,
    quantiPromptText,
    handleAnalyzeQuant,
    injectAICopilotProjections,
    injectYahooBaselineProjections,
  }
}
