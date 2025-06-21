import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/utilities/lang'

import { ReviewsGlobalDefaults as defaults } from './defaults'

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
				placeholder: defaults.title(Lang.Vietnamese),
			},
		},
		{
			name: 'btnLabel',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: defaults.reviewButtonLabel(Lang.Vietnamese),
			},
		},
		{
			name: 'reviewDialogTitle',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: defaults.reviewDialogTitle(Lang.Vietnamese),
			},
		},
		{
			name: 'heartsSelectionLabel',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: defaults.heartsSelectionLabel(Lang.Vietnamese),
			},
		},
		{
			name: 'invoiceIdLabel',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: defaults.invoiceIdLabel(Lang.Vietnamese),
			},
		},
		{
			name: 'contentLabel',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: defaults.contentLabel(Lang.Vietnamese),
			},
		},
		{
			name: 'sendReviewBtnLabel',
			type: 'text',
			label: false,
			localized: true,
			admin: {
				placeholder: defaults.sendReviewButtonLabel(Lang.Vietnamese),
			},
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
