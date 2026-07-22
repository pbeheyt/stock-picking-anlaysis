import { getDb } from '../../utils/db'

export default defineEventHandler(() => {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM stocks ORDER BY created_at DESC').all() as any[]
  return rows.map((r) => {
    if (r.audit_data && typeof r.audit_data === 'string') {
      try {
        r.audit_data = JSON.parse(r.audit_data)
      } catch {}
    }
    return r
  })
})
