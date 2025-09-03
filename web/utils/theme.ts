export const isDark = computed(() => useColorMode().value === 'dark')

export function toggleTheme() {
  const colorMode = useColorMode()
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

export function getUiColorWithSeverity(severity: string) {
  switch (severity) {
    case 'low':
      return 'info'
    case 'medium':
      return 'warning'
    case 'high':
      return 'error'
    default:
      return 'neutral'
  }
}
export function getColorWithSeverity(severity: string) {
  switch (severity) {
    case 'low':
      return 'blue'
    case 'medium':
      return 'yellow'
    case 'high':
      return 'red'
    default:
      return 'neutral'
  }
}
