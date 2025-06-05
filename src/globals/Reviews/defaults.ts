import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const ReviewsGlobalDefaults = {
	title: matchLang({
		[Lang.English]: 'Reviews from customers',
		[Lang.Vietnamese]: 'Đánh giá từ khách hàng',
	}),
	reviewButtonLabel: matchLang({
		[Lang.English]: 'WRITE A REVIEW',
		[Lang.Vietnamese]: 'VIẾT ĐÁNH GIÁ',
	}),
	reviewDialogTitle: matchLang({
		[Lang.English]: 'Your review',
		[Lang.Vietnamese]: 'Đánh giá của bạn',
	}),
	heartsSelectionLabel: matchLang({
		[Lang.English]: 'Review for this product',
		[Lang.Vietnamese]: 'Đánh giá cho sản phẩm này',
	}),
	invoiceIdLabel: matchLang({
		[Lang.English]: 'Your order ID',
		[Lang.Vietnamese]: 'Mã đơn hàng của bạn',
	}),
	contentLabel: matchLang({
		[Lang.English]: 'Product review',
		[Lang.Vietnamese]: 'Cảm nhận về sản phẩm',
	}),
	sendReviewButtonLabel: matchLang({
		[Lang.English]: 'WRITE REVIEW',
		[Lang.Vietnamese]: 'VIẾT ĐÁNH GIÁ',
	}),
} as const
