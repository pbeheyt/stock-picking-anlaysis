import { getDb } from '../../utils/db'

export default defineEventHandler(() => {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM stocks ORDER BY created_at DESC').all()
  return rows
})
