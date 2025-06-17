import { CollectionConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/utilities/lang'

import { ProductCategoriesSlug } from '../ProductCategories/slug'
import { ProductsSlug } from '../Products/slug'
import { ProductSubCategoriesSlug } from '../ProductSubCategories/slug'
import { DiscountCodesSlug, DiscountCodeType } from './slug'

export const DiscountCodesCollection: CollectionConfig<typeof DiscountCodesSlug> = {
	slug: DiscountCodesSlug,
	labels: {
		singular: {
			[Lang.English]: 'Discount Code',
			[Lang.Vietnamese]: 'Mã giảm giá',
		},
		plural: {
			[Lang.English]: 'Discount Codes',
			[Lang.Vietnamese]: 'Mã giảm giá',
		},
	},
	access: {
		create: allow(Role.Admin, Role.SalesManager),
		read: allow(Role.Admin, Role.SalesManager),
		update: allow(Role.Admin, Role.SalesManager),
		delete: allow(Role.Admin, Role.SalesManager),
	},
	fields: [
		{
			type: 'row',
			fields: [
				{
					name: 'code',
					type: 'text',
					label: {
						[Lang.English]: 'Code',
						[Lang.Vietnamese]: 'Mã',
					},
					required: true,
					unique: true,
				},
				{
					name: 'amount',
					type: 'number',
					label: {
						[Lang.English]: 'Amount',
						[Lang.Vietnamese]: 'Số lượng',
					},
					min: 0,
					admin: {
						description: {
							[Lang.English]:
								'The number of times this discount code can be used. Set to 0 for unlimited uses.',
							[Lang.Vietnamese]:
								'Số lần sử dụng mã giảm giá này. Đặt 0 hoặc để trống để không giới hạn số lần sử dụng.',
						},
					},
				},
			],
		},
		{
			name: 'isActive',
			type: 'checkbox',
			label: {
				[Lang.English]: 'Is Active',
				[Lang.Vietnamese]: 'Đang hoạt động',
			},
			defaultValue: true,
		},
		{
			name: 'discountType',
			type: 'select',
			label: {
				[Lang.English]: 'Discount Type',
				[Lang.Vietnamese]: 'Loại giảm giá',
			},
			options: [
				{
					label: { [Lang.English]: 'Percentage', [Lang.Vietnamese]: 'Phần trăm' },
					value: DiscountCodeType.Percentage,
				},
				{
					label: { [Lang.English]: 'Fixed Amount', [Lang.Vietnamese]: 'Số tiền cố định' },
					value: DiscountCodeType.FixedAmount,
				},
			],
			required: true,
			defaultValue: DiscountCodeType.Percentage,
		},
		{
			type: 'row',
			fields: [
				{
					name: 'value',
					type: 'number',
					label: {
						[Lang.English]: 'Value',
						[Lang.Vietnamese]: 'Giá trị',
					},
					required: true,
					min: 0,
					defaultValue: 0,
					admin: {
						placeholder: '0',
					},
				},
				{
					name: 'maxDiscount',
					type: 'number',
					label: {
						[Lang.English]: 'Maximum Discount',
						[Lang.Vietnamese]: 'Giảm giá tối đa',
					},
					min: 0,
					admin: {
						placeholder: '0 (không giới hạn)',
					},
				},
			],
		},
		{
			name: 'expirationDate',
			type: 'date',
			label: {
				[Lang.English]: 'Expiration Date',
				[Lang.Vietnamese]: 'Ngày hết hạn',
			},
			admin: {
				description: {
					[Lang.English]: 'Leave empty if there is no expiration date.',
					[Lang.Vietnamese]: 'Để trống nếu không có ngày hết hạn.',
				},
			},
		},
		{
			type: 'row',
			fields: [
				{
					name: 'applicableProducts',
					type: 'relationship',
					relationTo: ProductsSlug,
					label: {
						[Lang.English]: 'Applicable Products',
						[Lang.Vietnamese]: 'Sản phẩm áp dụng',
					},
					hasMany: true,
				},
				{
					name: 'applicableCategories',
					type: 'relationship',
					relationTo: [ProductCategoriesSlug, ProductSubCategoriesSlug],
					label: {
						[Lang.English]: 'Applicable product categories',
						[Lang.Vietnamese]: 'Danh mục sản phẩm áp dụng',
					},
					hasMany: true,
				},
			],
		},
		{
			name: 'allProducts',
			type: 'checkbox',
			label: {
				[Lang.English]: 'Apply to all products',
				[Lang.Vietnamese]: 'Áp dụng cho tất cả sản phẩm',
			},
			defaultValue: false,
		},
	],
	admin: {
		useAsTitle: 'code',
	},
}
