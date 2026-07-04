import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/i18n/routing'

import vi from '../../../messages/vi.json'

export const ReviewsGlobalSlug = 'reviewsGlobal'
export const ReviewsGlobalConf: GlobalConfig<typeof ReviewsGlobalSlug> = {
	slug: ReviewsGlobalSlug,
	label: {
		[Lang.English]: 'Reviews',
		[Lang.Vietnamese]: 'Đánh giá',
	},
	access: {
		read: allow(Role.Public),
		update: allow(Role.Admin, Role.ContentManager),
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: vi.globals.reviews.title,
			},
		},
		{
			name: 'btnLabel',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: vi.globals.reviews.reviewButtonLabel,
			},
		},
		{
			name: 'reviewDialogTitle',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: vi.globals.reviews.reviewDialogTitle,
			},
		},
		{
			name: 'heartsSelectionLabel',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: vi.globals.reviews.heartsSelectionLabel,
			},
		},
		{
			name: 'invoiceIdLabel',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: vi.globals.reviews.invoiceIdLabel,
			},
		},
		{
			name: 'contentLabel',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: vi.globals.reviews.contentLabel,
			},
		},
		{
			name: 'sendReviewBtnLabel',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: vi.globals.reviews.sendReviewButtonLabel,
			},
		},
	],
	hooks: {
		afterChange: [
			({ doc, req: { payload, context } }) => {
				if (!context.disableRevalidate) {
					payload.logger.info(`Revalidating reviews`)

					revalidateTag(ReviewsGlobalSlug, 'default')
				}

				return doc
			},
		],
	},
}
