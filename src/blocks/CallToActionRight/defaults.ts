import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const CallToActionRightBlockDefaults = {
	/** `Tìm hiểu thêm` */
	buttonLabel: matchLang({
		[Lang.English]: 'Find out more',
		[Lang.Vietnamese]: 'Tìm hiểu thêm',
	}),
} as const
