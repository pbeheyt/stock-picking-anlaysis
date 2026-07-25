export interface AIModelOption {
  id: string
  name: string
  provider: 'DeepSeek' | 'OpenRouter'
  icon: string
  description: string
}

export const DEFAULT_MODEL_ID = 'deepseek-v4-flash'

export const AVAILABLE_AI_MODELS: AIModelOption[] = [
  {
    id: 'deepseek-v4-flash',
    name: 'DeepSeek Flash',
    provider: 'DeepSeek',
    icon: '⚡',
    description: 'Ultra-rapide et optimisé pour le parsing financier.',
  },
  {
    id: 'qwen/qwen3.7-plus',
    name: 'Qwen 3.7 Plus',
    provider: 'OpenRouter',
    icon: '🌐',
    description: 'Raisonnement avancé pour rapports complexes.',
  },
]
