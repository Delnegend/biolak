import { CollectionConfig } from 'payload'

import { allow, Role } from '@/access/allow'

import { CustomersSlug } from '../Customers/slug'
import { ProductsSlug } from '../Products/slug'
import { OrdersSlug } from './slug'

export const OrdersCollection: CollectionConfig<typeof OrdersSlug> = {
	slug: OrdersSlug,
	labels: {
		singular: {
			en: 'Orders',
			vi: 'Đơn hàng',
		},
		plural: {
			en: 'Orders',
			vi: 'Các đơn hàng',
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
				en: 'Review',
				vi: 'Đánh giá',
			},
			access: {
				create: allow(Role.NoOne),
				update: allow(Role.NoOne),
				read: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
			},
			fields: [
				{
					name: 'rating',
					type: 'number',
					label: {
						en: 'Rating (1-5)',
						vi: 'Đánh giá (1-5)',
					},
					min: 1,
					max: 5,
				},
				{
					name: 'content',
					type: 'textarea',
					label: {
						en: 'Content',
						vi: 'Nội dung',
					},
				},
				{
					name: 'approved',
					type: 'checkbox',
					label: {
						en: 'Approved',
						vi: 'Đã duyệt',
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
				en: 'Product',
				vi: 'Sản phẩm',
			},
			required: true,
		},
		{
			name: CustomersSlug,
			type: 'relationship',
			relationTo: CustomersSlug,
			label: {
				en: 'Customer',
				vi: 'Khách hàng',
			},
		},
	],
	timestamps: true,
}
