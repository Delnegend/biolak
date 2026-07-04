import { Lang } from '@/i18n/routing'

import en from '../../messages/en.json'
import vi from '../../messages/vi.json'

type DotKeys<T, Prefix extends string = ''> = {
	[K in keyof T & string]: T[K] extends string
		? `${Prefix}${K}`
		: T[K] extends Record<string, unknown>
			? DotKeys<T[K], `${Prefix}${K}.`>
			: never
}[keyof T & string]

function resolve(obj: Record<string, unknown>, path: string): string {
	const val = path.split('.').reduce<unknown>((o, k) => {
		if (o && typeof o === 'object' && k in o) return (o as Record<string, unknown>)[k]
		return undefined
	}, obj)
	return typeof val === 'string' ? val : ''
}

type AdminLabelPath = `admin.${DotKeys<(typeof en)['admin']>}`

export function adminLabel(path: AdminLabelPath) {
	return {
		[Lang.English]: resolve(en, path),
		[Lang.Vietnamese]: resolve(vi, path),
	}
}
