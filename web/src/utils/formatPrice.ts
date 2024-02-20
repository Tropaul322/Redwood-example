export function formatCurrency(value?: number | string | null): string {
  if (!value) {
    return ''
  }

  if (String(value).includes('$')) {
    return value.toString()
  }

  const valueAsNumber =
    typeof value === 'string' ? parseFloat(value.replaceAll(',', '')) : value

  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valueAsNumber)
}
