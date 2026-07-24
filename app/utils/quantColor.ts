/**
 * Colorimétrie dynamique propre pour l'analyse quantitative.
 * Gère correctement les tendances haussières vs baissières.
 */

export function getTrendColorClass(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val) || val === 0) return 'text-gray-300'
  return val > 0 ? 'text-emerald-400' : 'text-rose-400'
}

export function getProjectionColorClass(
  projected: number | null | undefined,
  current: number | null | undefined
): string {
  if (
    projected === null ||
    projected === undefined ||
    current === null ||
    current === undefined ||
    isNaN(projected) ||
    isNaN(current)
  ) {
    return 'text-gray-300'
  }
  return projected >= current ? 'text-emerald-400' : 'text-rose-400'
}

export function getR2ColorClass(r2: number | null | undefined): string {
  if (r2 === null || r2 === undefined || isNaN(r2)) return 'text-gray-300'
  if (r2 >= 0.7) return 'text-emerald-400'
  if (r2 >= 0.4) return 'text-amber-400'
  return 'text-rose-400'
}

export function getVolatilityColorClass(vol: number | null | undefined): string {
  if (vol === null || vol === undefined || isNaN(vol)) return 'text-gray-300'
  if (vol <= 0.25) return 'text-emerald-400'
  if (vol <= 0.45) return 'text-amber-400'
  return 'text-rose-400'
}

export function getZScoreColorClass(z: number | null | undefined): string {
  if (z === null || z === undefined || isNaN(z)) return 'text-gray-300'
  if (z <= -1.0) return 'text-emerald-400'
  if (z >= 1.0) return 'text-rose-400'
  return 'text-amber-400'
}

export function getCagrGaugeStroke(cagr: number | null | undefined): string {
  if (cagr === null || cagr === undefined || isNaN(cagr)) return '#9ca3af'
  return cagr >= 0 ? '#34d399' : '#f43f5e'
}

export function getR2GaugeStroke(r2: number | null | undefined): string {
  if (r2 === null || r2 === undefined || isNaN(r2)) return '#9ca3af'
  if (r2 >= 0.7) return '#34d399'
  if (r2 >= 0.4) return '#fbbf24'
  return '#f43f5e'
}

export function getVolatilityGaugeStroke(vol: number | null | undefined): string {
  if (vol === null || vol === undefined || isNaN(vol)) return '#9ca3af'
  if (vol <= 0.25) return '#34d399'
  if (vol <= 0.45) return '#fbbf24'
  return '#f43f5e'
}

export function getZScoreGaugeStroke(z: number | null | undefined): string {
  if (z === null || z === undefined || isNaN(z)) return '#9ca3af'
  if (z <= -1.0) return '#34d399'
  if (z >= 1.0) return '#f43f5e'
  return '#fbbf24'
}
