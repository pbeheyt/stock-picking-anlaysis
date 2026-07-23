import { $fetch } from 'ofetch'

interface AiMessage {
  role: 'system' | 'user'
  content: string
}

interface AiCompletionOptions {
  model: 'deepseek-v4-flash' | 'deepseek-v4-pro'
  messages: AiMessage[]
  temperature?: number
  max_tokens?: number
  response_format?: { type: 'json_object' }
}

export function repairJson(jsonString: string): string {
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
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) throw new Error('DEEPSEEK_API_KEY non configurée dans .env')

  const { model, messages, temperature = 0.0, max_tokens = 8192, response_format } = options

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
      if (content) return content
    } catch (err: any) {
      console.warn(`Tentative API DeepSeek avec modèle '${targetModel}' échouée:`, err?.data || err?.message)
      lastError = err
    }
  }

  throw new Error(`Erreur API DeepSeek: ${lastError?.data?.error?.message || lastError?.message || 'Échec de connexion'}`)
}



