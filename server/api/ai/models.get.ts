import { getDb } from '../../utils/db'

export default defineEventHandler(async () => {
  const db = getDb()
  const rows = db.prepare('SELECT id, provider, name, tested_at FROM ai_models ORDER BY tested_at DESC').all()
  return rows.map((r: any) => ({
    id: r.id,
    provider: r.provider as 'DeepSeek' | 'OpenRouter',
    name: r.name,
    tested_at: r.tested_at,
  }))
})
