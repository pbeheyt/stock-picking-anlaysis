import { randomUUID } from 'node:crypto'
import { getDb } from './db'

export interface LogAiUsageParams {
  ticker?: string | null
  callType: 'qualitative_research' | 'quantitative_copilot' | 'model_test'
  provider: string
  model: string
  promptTokens?: number
  completionTokens?: number
  totalTokens?: number
  costUsd?: number
  status: 'success' | 'error'
  errorMessage?: string | null
}

export function logAiUsage(params: LogAiUsageParams): void {
  try {
    const db = getDb()
    const id = randomUUID()
    const now = new Date().toISOString()

    const promptTokens = params.promptTokens || 0
    const completionTokens = params.completionTokens || 0
    const totalTokens = params.totalTokens || (promptTokens + completionTokens)
    const costUsd = params.costUsd || 0.0

    db.prepare(`
      INSERT INTO ai_usage_logs (
        id, created_at, ticker, call_type, provider, model,
        prompt_tokens, completion_tokens, total_tokens, cost_usd, status, error_message
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      now,
      params.ticker || null,
      params.callType,
      params.provider || 'unknown',
      params.model || 'unknown',
      promptTokens,
      completionTokens,
      totalTokens,
      costUsd,
      params.status,
      params.errorMessage || null
    )
  } catch (err) {
    console.error('[AiLogger] Erreur lors du de l\'enregistrement du log IA:', err)
  }
}
