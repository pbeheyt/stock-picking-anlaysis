import { $fetch } from 'ofetch'

interface AiMessage {
  role: 'system' | 'user'
  content: string
}

interface AiCompletionOptions {
  model: 'deepseek-v4-flash' | 'deepseek-v4-pro' | 'qwen/qwen3.7-plus' | string
  messages: AiMessage[]
  temperature?: number
  max_tokens?: number
  response_format?: { type: 'json_object' }
  deepseekApiKey?: string
  openrouterApiKey?: string
}

function repairJson(jsonString: string): string {
  let str = (jsonString || '').trim()

  if (str.includes('```')) {
    str = str.replace(/```(?:json)?([\s\S]*?)```/gi, '$1').trim()
  }

  const firstBrace = str.indexOf('{')
  if (firstBrace !== -1) {
    str = str.slice(firstBrace)
  }

  try {
    JSON.parse(str)
    return str
  } catch {
    // Continuer pour réparer
  }

  let inString = false
  let escaped = false
  const stack: string[] = []
  let cleanStr = ''

  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    if (inString) {
      cleanStr += char
      if (char === '\\' && !escaped) {
        escaped = true
      } else if (char === '"' && !escaped) {
        inString = false
      } else {
        escaped = false
      }
    } else {
      if (char === '"') {
        inString = true
        escaped = false
        cleanStr += char
      } else if (char === '{' || char === '[') {
        stack.push(char === '{' ? '}' : ']')
        cleanStr += char
      } else if (char === '}' || char === ']') {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
          stack.pop()
          cleanStr += char
        }
      } else {
        cleanStr += char
      }
    }
  }

  if (inString) {
    cleanStr += '"'
  }

  cleanStr = cleanStr.replace(/,\s*$/, '')

  while (stack.length > 0) {
    cleanStr += stack.pop()
  }

  return cleanStr
}

export function parseAiJson<T = any>(text: string): T {
  const repaired = repairJson(text)
  return JSON.parse(repaired)
}

export async function aiComplete(options: AiCompletionOptions): Promise<string> {
  const {
    model,
    messages,
    temperature = 0.0,
    max_tokens = 8192,
    response_format,
    deepseekApiKey,
    openrouterApiKey,
    ticker = null,
    callType = 'qualitative_research',
  } = options

  const isOpenRouter = model.includes('/') || model.startsWith('qwen') || model.startsWith('google') || model.startsWith('anthropic') || model.startsWith('meta-llama')

  if (isOpenRouter) {
    const apiKey = openrouterApiKey?.trim()
    if (!apiKey) {
      logAiUsage({
        ticker,
        callType,
        provider: 'openrouter',
        model,
        status: 'error',
        errorMessage: 'Clé API OpenRouter manquante',
      })
      throw new Error('Clé API OpenRouter manquante. Veuillez configurer votre clé dans les Paramètres (icône Engrenage en haut à droite).')
    }

    try {
      const res = await $fetch<any>('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        timeout: 60000,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: {
          model,
          messages,
          temperature,
          max_tokens,
          ...(response_format && { response_format }),
        },
      })

      const content = res.choices?.[0]?.message?.content || ''
      const usage = res.usage || {}
      const promptTokens = usage.prompt_tokens || 0
      const completionTokens = usage.completion_tokens || 0
      const totalTokens = usage.total_tokens || (promptTokens + completionTokens)

      const costUsd = usage.total_cost !== undefined && usage.total_cost !== null
        ? Number(usage.total_cost)
        : (promptTokens * 0.00000015 + completionTokens * 0.0000006)

      logAiUsage({
        ticker,
        callType,
        provider: 'openrouter',
        model,
        promptTokens,
        completionTokens,
        totalTokens,
        costUsd,
        status: 'success',
      })

      return content
    } catch (err: any) {
      const errorMsg = err?.data?.error?.message || err?.message || 'Échec de connexion OpenRouter'
      logAiUsage({
        ticker,
        callType,
        provider: 'openrouter',
        model,
        status: 'error',
        errorMessage: errorMsg,
      })
      throw new Error(`Erreur API OpenRouter (${model}): ${errorMsg}`)
    }
  }

  const apiKey = deepseekApiKey?.trim()
  if (!apiKey) {
    logAiUsage({
      ticker,
      callType,
      provider: 'deepseek',
      model,
      status: 'error',
      errorMessage: 'Clé API DeepSeek manquante',
    })
    throw new Error('Clé API DeepSeek manquante. Veuillez configurer votre clé dans les Paramètres (icône Engrenage en haut à droite).')
  }

  const modelsToTry = [model, 'deepseek-chat']
  let lastError: any = null

  for (const targetModel of modelsToTry) {
    try {
      const res = await $fetch<any>('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        timeout: 60000,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: {
          model: targetModel,
          messages,
          temperature,
          max_tokens,
          ...(response_format && { response_format }),
        },
      })
      const content = res.choices?.[0]?.message?.content || ''
      if (content) {
        const usage = res.usage || {}
        const promptTokens = usage.prompt_tokens || 0
        const completionTokens = usage.completion_tokens || 0
        const totalTokens = usage.total_tokens || (promptTokens + completionTokens)
        const costUsd = (promptTokens * 0.00000014) + (completionTokens * 0.00000028)

        logAiUsage({
          ticker,
          callType,
          provider: 'deepseek',
          model: targetModel,
          promptTokens,
          completionTokens,
          totalTokens,
          costUsd,
          status: 'success',
        })

        return content
      }
    } catch (err: any) {
      console.warn(`Tentative API DeepSeek avec modèle '${targetModel}' échouée:`, err?.data || err?.message)
      lastError = err
    }
  }

  const finalError = lastError?.data?.error?.message || lastError?.message || 'Échec de connexion DeepSeek'
  logAiUsage({
    ticker,
    callType,
    provider: 'deepseek',
    model,
    status: 'error',
    errorMessage: finalError,
  })

  throw new Error(`Erreur API DeepSeek: ${finalError}`)
}
