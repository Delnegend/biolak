import { matchLang } from '@/utilities/matchLang'

export const BuyNowBlockDefaults = {
	/** `MUA NGAY` */
	buttonLabel: matchLang({
		en: 'BUY NOW',
		vi: 'MUA NGAY',
	}),
} as const
