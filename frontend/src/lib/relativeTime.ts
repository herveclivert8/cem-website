export function formatRelativeDays(isoDate: string, locale: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime()
  const days = Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)))
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  return rtf.format(-days, 'day')
}
