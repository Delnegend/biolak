import { CollectionConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/utilities/lang'
import { tryCatch } from '@/utilities/tryCatch'

import { CustomersSlug } from '../Customers/slug'
import { ProductsSlug } from '../Products/slug'
import { OrdersSlug } from './slug'

export const OrdersCollection: CollectionConfig<typeof OrdersSlug> = {
	slug: OrdersSlug,
	labels: {
		singular: {
			[Lang.English]: 'Orders',
			[Lang.Vietnamese]: 'Đơn hàng',
		},
		plural: {
			[Lang.English]: 'Orders',
			[Lang.Vietnamese]: 'Đơn hàng',
		},
	},
	access: {
		create: allow(Role.Admin, Role.SalesManager),
		delete: allow(Role.Admin, Role.SalesManager),
		read: allow(Role.Admin, Role.SalesManager),
		update: allow(Role.Admin, Role.SalesManager),
	},
	fields: [
		{
			name: 'review',
			type: 'group',
			label: {
				[Lang.English]: 'Review',
				[Lang.Vietnamese]: 'Đánh giá',
			},
			access: {
				create: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
				update: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
				read: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
			},
			fields: [
				{
					name: 'rating',
					type: 'number',
					label: {
						[Lang.English]: 'Rating (1-5)',
						[Lang.Vietnamese]: 'Đánh giá (1-5)',
					},
					min: 1,
					max: 5,
					access: {
						read: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
						update: allow(Role.NoOne),
						create: allow(Role.NoOne),
					},
				},
				{
					name: 'content',
					type: 'textarea',
					label: {
						[Lang.English]: 'Content',
						[Lang.Vietnamese]: 'Nội dung',
					},
					access: {
						read: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
						update: allow(Role.NoOne),
						create: allow(Role.NoOne),
					},
				},
				{
					name: 'approved',
					type: 'checkbox',
					label: {
						[Lang.English]: 'Approved',
						[Lang.Vietnamese]: 'Đã duyệt',
					},
					access: {
						update: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
					},
					defaultValue: false,
				},
			],
		},
		{
			name: ProductsSlug,
			type: 'relationship',
			relationTo: ProductsSlug,
			label: {
				[Lang.English]: 'Product',
				[Lang.Vietnamese]: 'Sản phẩm',
			},
			required: true,
		},
		{
			name: CustomersSlug,
			type: 'relationship',
			relationTo: CustomersSlug,
			label: {
				[Lang.English]: 'Customer',
				[Lang.Vietnamese]: 'Khách hàng',
			},
			required: true,
		},
	],
	timestamps: true,
	hooks: {
		afterChange: [
			async ({ doc, req: { payload } }) => {
				const {
					ok: resultOk,
					error: resultError,
					data: result,
				} = await tryCatch(() =>
					payload.sendEmail({
						from: process.env.SMTP_FROM,
						to: 'bar@example.com, baz@example.com',
						subject: 'Hello ✔',
						text: 'BioLAK có đơn hàng mới từ ' + doc[CustomersSlug]?.name,
					}),
				)
				if (!resultOk) {
					console.error('Error sending email:', resultError)
					return doc
				}
				console.log('Message sent:', result)
				return doc
			},
		],
	},
}
