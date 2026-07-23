export function formatScaledCurrency(val: number | null | undefined, currency = 'USD', decimals = 1): string {
  if (val === null || val === undefined || isNaN(val)) return '-'

  const abs = Math.abs(val)
  const symbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : currency

  let formattedNumber = ''
  let suffix = ''

  if (abs >= 1e12) {
    formattedNumber = (val / 1e12).toFixed(decimals)
    suffix = 'Tn'
  } else if (abs >= 1e9) {
    formattedNumber = (val / 1e9).toFixed(decimals)
    suffix = 'Mds'
  } else if (abs >= 1e6) {
    formattedNumber = (val / 1e6).toFixed(decimals)
    suffix = 'M'
  } else if (abs >= 1e3) {
    formattedNumber = (val / 1e3).toFixed(decimals)
    suffix = 'k'
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(val)
  }

  return `${formattedNumber} ${suffix} ${symbol}`
}

export function formatCurrency(val: number | null | undefined, curr = 'USD', decimals = 2): string {
  if (val === null || val === undefined || isNaN(val)) return '-'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: curr,
    maximumFractionDigits: decimals,
  }).format(val)
}

export function formatPercent(val: number | null | undefined, isDecimal = false, decimals = 1): string {
  if (val === null || val === undefined || isNaN(val)) return '-'
  const num = isDecimal ? val * 100 : val
  const sign = num > 0 ? '+' : ''
  return `${sign}${num.toFixed(decimals)}%`
}

export function formatNumber(val: number | null | undefined, decimals = 2): string {
  if (val === null || val === undefined || isNaN(val)) return '-'
  return new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: decimals,
  }).format(val)
}
