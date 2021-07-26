export function getRelativeTime(from: Date, to: Date) {
  const units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  }
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const elapsed = to.getTime() - from.getTime()
  for (const key in units) {
    const keynum = key as
      | 'year'
      | 'month'
      | 'day'
      | 'hour'
      | 'minute'
      | 'second'

    const value = Number(units[keynum])
    if (Math.abs(elapsed) > value || key === 'second')
      return rtf.format(
        Math.round(elapsed / value),
        key as Intl.RelativeTimeFormatUnit
      )
  }
  return ''
}
