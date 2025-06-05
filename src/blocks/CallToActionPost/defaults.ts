import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const CallToActionPostBlockDefaults = {
	/** `ĐỌC BÀI VIẾT` */
	buttonLabel: matchLang({
		[Lang.English]: 'READ POST',
		[Lang.Vietnamese]: 'ĐỌC BÀI VIẾT',
	}),
} as const
