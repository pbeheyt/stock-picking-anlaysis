import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ provider: 'DeepSeek' | 'OpenRouter'; apiKey: string }>(event)

  if (!body?.provider || !body?.apiKey?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Provider et clé API requis.' })
  }

  const apiKeyClean = body.apiKey.trim()

  if (body.provider === 'DeepSeek') {
    try {
      const res = await $fetch<any>('https://api.deepseek.com/models', {
        headers: {
          Authorization: `Bearer ${apiKeyClean}`,
        },
        timeout: 15000,
      })
      if (res && (res.data || res.object)) {
        return { success: true, provider: 'DeepSeek', message: 'Clé API DeepSeek validée.' }
      }
    } catch (err: any) {
      console.warn('Erreur validation clé DeepSeek:', err?.data || err?.message)
      const errMsg = err?.data?.error?.message || err?.message || 'Authentification échouée'
      throw createError({
        statusCode: 401,
        statusMessage: `Clé DeepSeek invalide : ${errMsg}`,
      })
    }
  }

  if (body.provider === 'OpenRouter') {
    try {
      // Tentative 1 : /api/v1/auth/key
      const res = await $fetch<any>('https://openrouter.ai/api/v1/auth/key', {
        headers: {
          Authorization: `Bearer ${apiKeyClean}`,
        },
        timeout: 15000,
      })
      if (res && res.data) {
        return { success: true, provider: 'OpenRouter', message: 'Clé API OpenRouter validée.' }
      }
    } catch (firstErr: any) {
      // Fallback : /api/v1/models avec la clé
      try {
        const resModels = await $fetch<any>('https://openrouter.ai/api/v1/models', {
          headers: {
            Authorization: `Bearer ${apiKeyClean}`,
          },
          timeout: 15000,
        })
        if (resModels && resModels.data) {
          return { success: true, provider: 'OpenRouter', message: 'Clé API OpenRouter validée.' }
        }
      } catch (err: any) {
        console.warn('Erreur validation clé OpenRouter:', err?.data || err?.message)
        const errMsg = err?.name === 'TimeoutError' || err?.message?.includes('timeout')
          ? 'Délai d\'attente dépassé (Timeout OpenRouter). Vérifiez votre connexion.'
          : err?.data?.error?.message || err?.message || 'Authentification échouée'
        throw createError({
          statusCode: 401,
          statusMessage: `Clé OpenRouter invalide : ${errMsg}`,
        })
      }
    }
  }

  throw createError({ statusCode: 400, statusMessage: 'Provider non supporté.' })
})
