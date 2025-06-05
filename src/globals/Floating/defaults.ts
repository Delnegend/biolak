import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const FloatingGlobalDefaults = {
	/** `Liên hệ` */
	contact: matchLang({
		[Lang.English]: 'Contacts',
		[Lang.Vietnamese]: 'Liên hệ',
	}),
} as const
