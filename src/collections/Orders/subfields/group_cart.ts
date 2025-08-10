import { Field } from 'payload'

import { allow, Role } from '@/access/allow'
import { ProductsSlug } from '@/collections/Products/slug'
import { Lang } from '@/utilities/lang'

import { validateQuantity } from '../hooks/validateQuantity'
import { validateSku } from '../hooks/validateSku'

export const ORDERS_group_cart: Field = {
	type: 'array',
	name: 'cart',
	label: {
		[Lang.English]: 'Cart',
		[Lang.Vietnamese]: 'Giỏ hàng',
	},
	labels: {
		singular: {
			[Lang.English]: 'Product',
			[Lang.Vietnamese]: 'Sản phẩm',
		},
		plural: {
			[Lang.English]: 'Products',
			[Lang.Vietnamese]: 'Sản phẩm',
		},
	},
	fields: [
		{
			name: 'product',
			type: 'relationship',
			relationTo: ProductsSlug,
			label: {
				[Lang.English]: 'Product',
				[Lang.Vietnamese]: 'Sản phẩm',
			},
		},
		{
			type: 'row',
			fields: [
				{
					name: 'sku',
					type: 'text',
					label: {
						[Lang.English]: 'SKU',
						[Lang.Vietnamese]: 'Mã SKU loại',
					},
					required: true,
					validate: validateSku,
				},
				{
					name: 'title',
					type: 'text',
					label: {
						[Lang.English]: "Product's title",
						[Lang.Vietnamese]: 'Tên sản phẩm',
					},
					required: true,
				},
				{
					name: 'quantity',
					type: 'number',
					label: {
						[Lang.English]: 'Quantity',
						[Lang.Vietnamese]: 'Số lượng',
					},
					required: true,
					access: {
						read: allow(Role.Admin, Role.SalesManager),
						update: allow(Role.NoOne),
						create: allow(Role.NoOne),
					},
					validate: validateQuantity,
				},
			],
		},
		{
			type: 'row',
			fields: [
				{
					name: 'priceAtBuy',
					type: 'number',
					label: {
						[Lang.English]: 'Price',
						[Lang.Vietnamese]: 'Đơn giá',
					},
					access: {
						read: allow(Role.Admin, Role.SalesManager),
						update: allow(Role.NoOne),
						create: allow(Role.NoOne),
					},
					required: true,
				},
				{
					name: 'previewTotal',
					type: 'number',
					label: {
						[Lang.English]: 'Total',
						[Lang.Vietnamese]: 'Thành tiền',
					},
					access: {
						read: allow(Role.Admin, Role.SalesManager),
						update: allow(Role.NoOne),
						create: allow(Role.NoOne),
					},
					required: true,
				},
			],
		},
	],
}
