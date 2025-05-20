import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'

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
			defaultValue: 'Đánh giá từ khách hàng',
		},
		{
			name: 'btnLabel',
			type: 'text',
			label: {
				en: 'Review button label',
				vi: 'Nhãn nút đánh giá',
			},
			required: true,
			defaultValue: 'VIẾT ĐÁNH GIÁ',
		},
		{
			name: 'reviewDialogTitle',
			type: 'text',
			label: {
				en: 'Review dialog title',
				vi: 'Nhãn hộp thoại đánh giá',
			},
			required: true,
			defaultValue: 'Viết đánh giá của bạn',
		},
		{
			name: 'sendReviewBtnLabel',
			type: 'text',
			label: {
				en: 'Send review button label',
				vi: 'Nhãn nút gửi đánh giá',
			},
			required: true,
			defaultValue: 'GỬI ĐÁNH GIÁ',
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
