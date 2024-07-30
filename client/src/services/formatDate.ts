const dateOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
} as const
export function formatDate(date: string) {
  const unformattedDate = new Date(date)
  const formattedDate = new Intl.DateTimeFormat(undefined, dateOptions).format(
    unformattedDate
  )
  return formattedDate
}
