export function toFaviconUrl(url: string): string {
	return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(url)}&sz=256`
}
