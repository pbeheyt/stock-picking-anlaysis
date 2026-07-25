import { getDb } from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const rawId = getRouterParam(event, 'id')
  if (!rawId) throw createError({ statusCode: 400, statusMessage: 'ID du modèle requis.' })

  const modelId = decodeURIComponent(rawId)
  const db = getDb()
  db.prepare('DELETE FROM ai_models WHERE id = ?').run(modelId)

  return { success: true, deleted: modelId }
})
