import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const ReviewsGlobalSlug = 'reviewsGlobal'
export const ReviewsGlobalConf: GlobalConfig<typeof ReviewsGlobalSlug> = {
	slug: ReviewsGlobalSlug,
	label: {
		en: 'Reviews',
		vi: 'Đánh giá',
	},
	access: {
		read: allow(Role.Public),
		update: allow(Role.Admin, Role.ContentManager),
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: {
				en: 'Title',
				vi: 'Tiêu đề',
			},
			required: true,
			localized: true,
			defaultValue: matchLang({
				[Lang.English]: 'Reviews from customers',
				[Lang.Vietnamese]: 'Đánh giá từ khách hàng',
			}),
		},
		{
			name: 'btnLabel',
			type: 'text',
			label: {
				en: 'Review button label',
				vi: 'Nhãn nút đánh giá',
			},
			required: true,
			localized: true,
			defaultValue: matchLang({
				[Lang.English]: 'WRITE A REVIEW',
				[Lang.Vietnamese]: 'VIẾT ĐÁNH GIÁ',
			}),
		},
		{
			name: 'reviewDialogTitle',
			type: 'text',
			label: {
				en: 'Review dialog title',
				vi: 'Nhãn hộp thoại đánh giá',
			},
			required: true,
			localized: true,
			defaultValue: matchLang({
				[Lang.English]: 'Your review',
				[Lang.Vietnamese]: 'Đánh giá của bạn',
			}),
		},
		{
			name: 'heartsSelectionLabel',
			type: 'text',
			label: {
				en: 'Hearts selection label',
				vi: 'Nhãn lựa chọn đánh giá',
			},
			required: true,
			localized: true,
			defaultValue: matchLang({
				[Lang.English]: 'Review for this product',
				[Lang.Vietnamese]: 'Đánh giá cho sản phẩm này',
			}),
		},
		{
			name: 'invoiceIdLabel',
			type: 'text',
			label: {
				en: 'Invoice ID label',
				vi: 'Nhãn mã đơn hàng',
			},
			required: true,
			localized: true,
			defaultValue: matchLang({
				[Lang.English]: 'Your order ID',
				[Lang.Vietnamese]: 'Mã đơn hàng của bạn',
			}),
		},
		{
			name: 'contentLabel',
			type: 'text',
			label: {
				en: 'Content label',
				vi: 'Nhãn nội dung đánh giá',
			},
			required: true,
			localized: true,
			defaultValue: matchLang({
				[Lang.English]: 'Product review',
				[Lang.Vietnamese]: 'Cảm nhận về sản phẩm',
			}),
		},
		{
			name: 'sendReviewBtnLabel',
			type: 'text',
			label: {
				en: 'Send review button label',
				vi: 'Nhãn nút gửi đánh giá',
			},
			required: true,
			localized: true,
			defaultValue: matchLang({
				[Lang.English]: 'WRITE REVIEW',
				[Lang.Vietnamese]: 'VIẾT ĐÁNH GIÁ',
			}),
		},
	],
	hooks: {
		afterChange: [
			({ doc, req: { payload, context } }) => {
				if (!context.disableRevalidate) {
					payload.logger.info(`Revalidating reviews`)

					revalidateTag(ReviewsGlobalSlug)
				}

				return doc
			},
		],
	},
}
