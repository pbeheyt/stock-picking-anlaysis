/**
 * Colorimétrie dynamique propre pour l'analyse de régression.
 * Définit une source unique de vérité pour les palettes de couleurs (Tailwind & Hex SVG/ECharts).
 */

export type ColorPalette = 'emerald' | 'amber' | 'rose' | 'gray'

export const COLOR_TOKENS: Record<ColorPalette, { class: string; hex: string }> = {
  emerald: { class: 'text-emerald-400', hex: '#34d399' },
  amber:   { class: 'text-amber-400',   hex: '#fbbf24' },
  rose:    { class: 'text-rose-400',    hex: '#f43f5e' },
  gray:    { class: 'text-gray-300',    hex: '#9ca3af' },
}

function isValidNum(val: number | null | undefined): val is number {
  return val !== null && val !== undefined && !isNaN(val)
}

export function getTrendPalette(val: number | null | undefined): ColorPalette {
  if (!isValidNum(val) || val === 0) return 'gray'
  return val > 0 ? 'emerald' : 'rose'
}

export function getR2Palette(r2: number | null | undefined): ColorPalette {
  if (!isValidNum(r2)) return 'gray'
  if (r2 >= 0.7) return 'emerald'
  if (r2 >= 0.4) return 'amber'
  return 'rose'
}

export function getVolatilityPalette(vol: number | null | undefined): ColorPalette {
  if (!isValidNum(vol)) return 'gray'
  if (vol <= 0.25) return 'emerald'
  if (vol <= 0.45) return 'amber'
  return 'rose'
}

export function getZScorePalette(z: number | null | undefined): ColorPalette {
  if (!isValidNum(z)) return 'gray'
  if (z <= -1.0) return 'emerald'
  if (z >= 1.0) return 'rose'
  return 'amber'
}

export function getMaxDrawdownPalette(mdd: number | null | undefined): ColorPalette {
  if (!isValidNum(mdd)) return 'gray'
  const absMdd = Math.abs(mdd)
  if (absMdd <= 0.20) return 'emerald'
  if (absMdd <= 0.40) return 'amber'
  return 'rose'
}

// Accesseurs Tailwind
export function getTrendColorClass(val: number | null | undefined): string {
  return COLOR_TOKENS[getTrendPalette(val)].class
}

export function getProjectionColorClass(projected: number | null | undefined, current: number | null | undefined): string {
  if (!isValidNum(projected) || !isValidNum(current)) return COLOR_TOKENS.gray.class
  return projected >= current ? COLOR_TOKENS.emerald.class : COLOR_TOKENS.rose.class
}

export function getR2ColorClass(r2: number | null | undefined): string {
  return COLOR_TOKENS[getR2Palette(r2)].class
}

export function getVolatilityColorClass(vol: number | null | undefined): string {
  return COLOR_TOKENS[getVolatilityPalette(vol)].class
}

export function getZScoreColorClass(z: number | null | undefined): string {
  return COLOR_TOKENS[getZScorePalette(z)].class
}

export function getMaxDrawdownColorClass(mdd: number | null | undefined): string {
  return COLOR_TOKENS[getMaxDrawdownPalette(mdd)].class
}

// Accesseurs Hex (SVG / ECharts)
export function getCagrGaugeStroke(cagr: number | null | undefined): string {
  return COLOR_TOKENS[getTrendPalette(cagr)].hex
}

export function getR2GaugeStroke(r2: number | null | undefined): string {
  return COLOR_TOKENS[getR2Palette(r2)].hex
}

export function getVolatilityGaugeStroke(vol: number | null | undefined): string {
  return COLOR_TOKENS[getVolatilityPalette(vol)].hex
}

export function getZScoreGaugeStroke(z: number | null | undefined): string {
  return COLOR_TOKENS[getZScorePalette(z)].hex
}

export function getMaxDrawdownGaugeStroke(mdd: number | null | undefined): string {
  return COLOR_TOKENS[getMaxDrawdownPalette(mdd)].hex
}
