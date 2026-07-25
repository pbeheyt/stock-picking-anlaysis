import { getDb } from '../../utils/db'

export interface AiUsageLog {
  id: string
  created_at: string
  ticker: string | null
  call_type: string
  provider: string
  model: string
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
  cost_usd: number
  status: string
  error_message: string | null
}

export interface AiUsageResponse {
  logs: AiUsageLog[]
  totalLogs: number
  page: number
  pageSize: number
  totalPages: number
  summary: {
    totalCostUsd: number
    totalTokens: number
    totalCalls: number
    successCalls: number
    errorCalls: number
  }
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Math.max(1, parseInt(String(query.page || '1'), 10))
  const pageSize = Math.max(1, Math.min(100, parseInt(String(query.pageSize || '20'), 10)))
  const offset = (page - 1) * pageSize

  const period = query.period ? String(query.period).trim() : 'all'
  const startDate = query.startDate ? String(query.startDate).trim() : null
  const endDate = query.endDate ? String(query.endDate).trim() : null
  const providerFilter = query.provider ? String(query.provider).trim() : null
  const modelFilter = query.model ? String(query.model).trim() : null

  const db = getDb()

  // Dynamic WHERE conditions
  const conditions: string[] = []
  const params: any[] = []

  if (period === 'today') {
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    conditions.push('created_at >= ?')
    params.push(todayStart.toISOString())
  } else if (period === '7d') {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    conditions.push('created_at >= ?')
    params.push(weekAgo.toISOString())
  } else if (period === '30d') {
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    conditions.push('created_at >= ?')
    params.push(monthAgo.toISOString())
  } else if (period === 'custom') {
    if (startDate) {
      const s = new Date(startDate)
      s.setHours(0, 0, 0, 0)
      conditions.push('created_at >= ?')
      params.push(s.toISOString())
    }
    if (endDate) {
      const e = new Date(endDate)
      e.setHours(23, 59, 59, 999)
      conditions.push('created_at <= ?')
      params.push(e.toISOString())
    }
  }

  if (providerFilter) {
    conditions.push('provider = ?')
    params.push(providerFilter)
  }
  if (modelFilter) {
    conditions.push('model = ?')
    params.push(modelFilter)
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  // Total Count & Summary KPI Metrics
  const countRow = db.prepare(`SELECT COUNT(*) as total FROM ai_usage_logs ${whereClause}`).get(...params) as { total: number }
  const totalLogs = countRow?.total || 0

  const summaryRow = db.prepare(`
    SELECT 
      COALESCE(SUM(cost_usd), 0.0) as totalCostUsd,
      COALESCE(SUM(total_tokens), 0) as totalTokens,
      COUNT(*) as totalCalls,
      COALESCE(SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END), 0) as successCalls,
      COALESCE(SUM(CASE WHEN status = 'error' THEN 1 ELSE 0 END), 0) as errorCalls
    FROM ai_usage_logs ${whereClause}
  `).get(...params) as any

  // Paginated Rows
  const logs = db.prepare(`
    SELECT * FROM ai_usage_logs 
    ${whereClause}
    ORDER BY datetime(created_at) DESC
    LIMIT ? OFFSET ?
  `).all(...params, pageSize, offset) as AiUsageLog[]

  const totalPages = Math.ceil(totalLogs / pageSize) || 1

  return {
    logs,
    totalLogs,
    page,
    pageSize,
    totalPages,
    summary: {
      totalCostUsd: summaryRow?.totalCostUsd || 0.0,
      totalTokens: summaryRow?.totalTokens || 0,
      totalCalls: summaryRow?.totalCalls || 0,
      successCalls: summaryRow?.successCalls || 0,
      errorCalls: summaryRow?.errorCalls || 0,
    },
  }
})
