import { getDb } from '../../utils/db'
import { aiComplete, parseAiJson } from '../../utils/ai'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ provider: 'DeepSeek' | 'OpenRouter'; modelId: string }>(event)

  if (!body?.provider || !body?.modelId?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Provider et ID du modèle requis.' })
  }

  const modelIdClean = body.modelId.trim()
  const deepseekApiKey = getHeader(event, 'x-deepseek-api-key') || undefined
  const openrouterApiKey = getHeader(event, 'x-openrouter-api-key') || undefined

  if (body.provider === 'DeepSeek' && !deepseekApiKey) {
    throw createError({ statusCode: 400, statusMessage: 'Missing Authentication header (Clé DeepSeek non fournie).' })
  }

  if (body.provider === 'OpenRouter' && !openrouterApiKey) {
    throw createError({ statusCode: 400, statusMessage: 'Missing Authentication header (Clé OpenRouter non fournie).' })
  }

  try {
    const rawResult = await aiComplete({
      model: modelIdClean,
      messages: [
        {
          role: 'system',
          content: 'Tu es un testeur de modèle IA. Réponds UNIQUEMENT par le JSON structuré : {"status": "ok", "message": "Modele compatible"}.',
        },
        { role: 'user', content: 'Test de connexion et de compatibilité JSON structuré.' },
      ],
      response_format: { type: 'json_object' },
      deepseekApiKey,
      openrouterApiKey,
    })

    let parsed: any
    try {
      parsed = parseAiJson(rawResult)
    } catch {
      throw new Error(`Le modèle '${modelIdClean}' a répondu mais n'est pas compatible avec la génération JSON structurée. Extrait: "${rawResult.slice(0, 100)}..."`)
    }

    if (parsed?.status !== 'ok' && !parsed?.message) {
      throw new Error(`Le modèle '${modelIdClean}' n'a pas respecté la consigne JSON structurée.`)
    }

    // Persistance dans la base SQLite
    const db = getDb()
    const now = new Date().toISOString()
    db.prepare('INSERT OR REPLACE INTO ai_models (id, provider, name, tested_at) VALUES (?, ?, ?, ?)')
      .run(modelIdClean, body.provider, modelIdClean, now)

    return {
      success: true,
      provider: body.provider,
      modelId: modelIdClean,
      name: modelIdClean,
      tested_at: now,
    }
  } catch (err: any) {
    console.error(`Erreur test modèle '${modelIdClean}':`, err?.message || err)
    throw createError({
      statusCode: 502,
      statusMessage: err.message || `Échec du test pour le modèle '${modelIdClean}'.`,
    })
  }
})
