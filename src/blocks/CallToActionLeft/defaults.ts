import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const CallToActionLeftBlockDefaults = {
	/** `Tìm hiểu thêm` */
	buttonLabel: matchLang({
		[Lang.English]: 'Find out more',
		[Lang.Vietnamese]: 'Tìm hiểu thêm',
	}),
}
