import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const BuyNowBlockDefaults = {
	/** `MUA NGAY` */
	buttonLabel: matchLang({
		[Lang.English]: 'BUY NOW',
		[Lang.Vietnamese]: 'MUA NGAY',
	}),
} as const
