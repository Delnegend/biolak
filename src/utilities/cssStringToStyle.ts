export function cssStringToStyle(cssString?: string | null): Record<string, string> {
  const cssString_ = cssString?.trim().replaceAll('\n', '')
  if (!cssString_ || cssString_ === '') return {}

  const style: Record<string, string> = {}
  cssString_.split(';').forEach((rule) => {
    const [key, value] = rule.split(':')
    if (!key || !value) return
    style[key.trim()] = value.trim()
  })

  return style
}
