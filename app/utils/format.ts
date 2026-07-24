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

export function formatCompactCurrency(val: number | null | undefined, curr = 'USD'): string {
  if (val === null || val === undefined || isNaN(val)) return '-'
  const abs = Math.abs(val)
  if (abs >= 100000) {
    return formatScaledCurrency(val, curr, 2)
  }
  return formatCurrency(val, curr, 2)
}

export function formatPercent(val: number | null | undefined, isDecimal = false, decimals = 1, showPlus = true): string {
  if (val === null || val === undefined || isNaN(val)) return '-'
  const num = isDecimal ? val * 100 : val
  const sign = (showPlus && num > 0) ? '+' : ''
  return `${sign}${num.toFixed(decimals)}%`
}

export function formatCompactPercent(val: number | null | undefined, isDecimal = false, decimals = 1, showPlus = true): string {
  if (val === null || val === undefined || isNaN(val)) return '-'
  const num = isDecimal ? val * 100 : val
  const abs = Math.abs(num)
  const sign = (showPlus && num > 0) ? '+' : ''
  if (abs >= 1e6) {
    return `${sign}${(num / 1e6).toFixed(1)}M%`
  }
  if (abs >= 1e3) {
    return `${sign}${(num / 1e3).toFixed(1)}k%`
  }
  return `${sign}${num.toFixed(decimals)}%`
}

export function formatNumber(val: number | null | undefined, decimals = 2): string {
  if (val === null || val === undefined || isNaN(val)) return '-'
  return new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: decimals,
  }).format(val)
}

export function formatDurationYearsMonths(startDateStr: string, endDateStr: string): string {
  if (!startDateStr || !endDateStr) return '-'
  const d1 = new Date(startDateStr)
  const d2 = new Date(endDateStr)
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return '-'

  let years = d2.getFullYear() - d1.getFullYear()
  let months = d2.getMonth() - d1.getMonth()
  if (d2.getDate() < d1.getDate()) {
    months -= 1
  }
  if (months < 0) {
    years -= 1
    months += 12
  }

  const parts: string[] = []
  if (years > 0) parts.push(`${years} ${years > 1 ? 'ans' : 'an'}`)
  if (months > 0) parts.push(`${months} mois`)
  if (parts.length === 0) return '< 1 mois'
  return parts.join(' et ')
}

export function formatDurationYearsDecimal(startDateStr: string, endDateStr: string): string {
  if (!startDateStr || !endDateStr) return '-'
  const d1 = new Date(startDateStr)
  const d2 = new Date(endDateStr)
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return '-'

  const diffDays = (d2.getTime() - d1.getTime()) / (86400 * 1000)
  const years = diffDays / 365.25

  if (years < 0.08) return '< 1 mois'

  const rounded = Math.round(years)
  if (Math.abs(years - rounded) < 0.05) {
    return `${rounded} ${rounded > 1 ? 'ans' : 'an'}`
  }

  const formatted = years.toFixed(1).replace('.', ',')
  return `${formatted} ${years >= 2 ? 'ans' : 'an'}`
}
