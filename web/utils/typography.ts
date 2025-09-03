export function formatDateReadable(date: string | Date): string {
  const d = new Date(date)

  const day = d.getDate()
  const month = d.toLocaleString('en-US', { month: 'long' })
  const year = d.getFullYear()

  return `${day} ${month} ${year}`
}
