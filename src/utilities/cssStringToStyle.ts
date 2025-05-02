export function cssStringToStyle(cssString?: string | null): Record<string, string> {
	const cssString_ = cssString?.trim().replaceAll('\n', '')
	if (!cssString_ || cssString_ === '') return {}

	const style: Record<string, string> = {}
	cssString_.split(';').forEach((rule) => {
		const [key, value] = rule.split(':')
		if (!key || !value) return
		style[kebabCaseToCamelCase(key.trim())] = value.trim()
	})

	return style
}

function kebabCaseToCamelCase(str: string): string {
	return str.replace(/-([a-z])/g, (g) => {
		if (g[1] === undefined) return ''
		return g[1].toUpperCase()
	})
}
