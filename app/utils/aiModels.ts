export interface AIModelOption {
  id: string
  name: string
  provider: 'DeepSeek' | 'OpenRouter'
  icon?: string
  description?: string
  tested_at?: string
}

export const DEFAULT_MODEL_ID = ''

export async function fetchApprovedModels(): Promise<AIModelOption[]> {
  try {
    const models = await $fetch<AIModelOption[]>('/api/ai/models')
    return models || []
  } catch (err) {
    console.warn('Erreur récupération modèles BDD:', err)
    return []
  }
}

export async function deleteApprovedModel(modelId: string): Promise<boolean> {
  try {
    await $fetch(`/api/ai/models/${encodeURIComponent(modelId)}`, {
      method: 'DELETE',
    })
    return true
  } catch (err) {
    console.error('Erreur suppression modèle BDD:', err)
    return false
  }
}

export function filterModelsForActiveKeys(models: AIModelOption[]): AIModelOption[] {
  if (!import.meta.client) return models
  const deepseekKey = localStorage.getItem('deepseek_api_key')?.trim()
  const openrouterKey = localStorage.getItem('openrouter_api_key')?.trim()

  return models.filter(m => {
    if (m.provider === 'DeepSeek' && deepseekKey) return true
    if (m.provider === 'OpenRouter' && openrouterKey) return true
    return false
  })
}
