import { StockRepository } from '../../repository/stockRepository'

const ALLOWED_UPDATE_FIELDS = [
  'currency',
  'beta',
  'growth_mode',
  'projected_growth',
  'growth_y1',
  'growth_y2',
  'growth_y3',
  'growth_y4',
  'growth_y5',
  'revenue_y1',
  'revenue_y2',
  'revenue_y3',
  'revenue_y4',
  'revenue_y5',
  'margin_type',
  'projected_margin',
  'margin_mode',
  'margin_y1',
  'margin_y2',
  'margin_y3',
  'margin_y4',
  'margin_y5',
  'target_multiple',
  'discount_rate',
  'risk_spread',
  'thesis',
  'status',
  'regression_fair_price',
  'quant_preset',
  'quant_start_date',
  'quant_end_date',
]

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID requis',
    })
  }

  const body = await readBody(event)
  if (!body || typeof body !== 'object') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Corps de requête requis',
    })
  }

  const existing = await StockRepository.getById(id)
  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Stock non trouvé',
    })
  }

  const updatesMap: Record<string, any> = {}
  for (const field of ALLOWED_UPDATE_FIELDS) {
    if (field in body) {
      updatesMap[field] = body[field]
    }
  }

  return await StockRepository.updateFields(id, updatesMap)
})
