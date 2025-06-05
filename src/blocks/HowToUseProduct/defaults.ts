import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const HowToUseProductBlockDefaults = {
	/** `Hướng dẫn sử dụng` */
	title: matchLang({
		[Lang.English]: 'How to use',
		[Lang.Vietnamese]: 'Hướng dẫn sử dụng',
	}),
}
