export function generateDatesArray(baseDate) {
  return Array.from({ length: 3 }, (_, i) => {
    const d = new Date(baseDate)
    d.setDate(d.getDate() + i)
    return d.toISOString().slice(0, 10)
  })
}

export function formatDateNumbersOnly(dateString) {
  if (typeof dateString != 'string') return

  return dateString.replaceAll('-', '')
}
