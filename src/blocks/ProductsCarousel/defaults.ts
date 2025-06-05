import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const ProductsCarouselBlockDefaults = {
	/** `SẢN PHẨM BÁN CHẠY` */
	title: matchLang({
		[Lang.English]: 'POPULAR PRODUCTS',
		[Lang.Vietnamese]: 'SẢN PHẨM BÁN CHẠY',
	}),
	/** `XEM THÊM` */
	watchMoreBtnLabel: matchLang({
		[Lang.English]: 'WATCH MORE',
		[Lang.Vietnamese]: 'XEM THÊM',
	}),
	/** `XEM TẤT CẢ SẢN PHẨM` */
	allProductsBtnLabel: matchLang({
		[Lang.English]: 'VIEW ALL PRODUCTS',
		[Lang.Vietnamese]: 'XEM TẤT CẢ SẢN PHẨM',
	}),
} as const
