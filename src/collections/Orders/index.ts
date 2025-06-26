import { nanoid } from 'nanoid'
import { CollectionConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/utilities/lang'

import { CustomersSlug } from '../Customers/slug'
import { DiscountCodesSlug } from '../DiscountCode/slug'
import { ProductsSlug } from '../Products/slug'
import { checkPaidInFull } from './hooks/checkPaidInFull'
import { populatePriceFields } from './hooks/populatePriceFields'
import { removeVirtualFields } from './hooks/removeVirtualFields'
import { sendOrderCreatedEmail } from './hooks/sendOrderCreatedEmail'
import { validateQuantity } from './hooks/validateQuantity'
import { validateSku } from './hooks/validateSku'
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
			name: 'invoiceId',
			type: 'text',
			required: true,
			unique: true,
			defaultValue: () => nanoid(),
			access: {
				read: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
				update: allow(Role.NoOne),
				create: allow(Role.NoOne),
			},
			label: {
				[Lang.English]: 'Invoice ID',
				[Lang.Vietnamese]: 'Mã hóa đơn',
			},
		},
		{
			type: 'relationship',
			relationTo: CustomersSlug,
			name: 'customer',
			label: {
				[Lang.English]: 'Customer',
				[Lang.Vietnamese]: 'Khách hàng',
			},
			required: true,
			access: {
				read: allow(Role.Admin, Role.SalesManager),
				update: allow(Role.NoOne),
				create: allow(Role.Admin, Role.SalesManager),
			},
		},
		{
			type: 'textarea',
			name: 'note',
			label: {
				[Lang.English]: 'Note',
				[Lang.Vietnamese]: 'Ghi chú',
			},
			access: {
				read: allow(Role.Admin, Role.SalesManager),
				update: allow(Role.Admin, Role.SalesManager),
				create: allow(Role.Admin, Role.SalesManager),
			},
			admin: {
				description: {
					[Lang.English]:
						'This note is for internal use only, it will not be shown to the customer.',
					[Lang.Vietnamese]:
						'Ghi chú này chỉ sử dụng nội bộ, sẽ không hiển thị cho khách hàng.',
				},
			},
		},
		{
			type: 'tabs',
			tabs: [
				{
					name: 'cart',
					label: {
						[Lang.English]: 'Cart',
						[Lang.Vietnamese]: 'Giỏ hàng',
					},
					fields: [
						{
							type: 'array',
							name: ProductsSlug,
							label: {
								[Lang.English]: 'Products',
								[Lang.Vietnamese]: 'Sản phẩm',
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
									required: true,
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
											name: 'quantity',
											type: 'number',
											label: {
												[Lang.English]: 'Quantity',
												[Lang.Vietnamese]: 'Số lượng',
											},
											required: true,
											validate: validateQuantity,
										},
									],
								},
								{
									type: 'row',
									fields: [
										{
											name: 'previewPrice',
											type: 'number',
											label: {
												[Lang.English]: 'Price',
												[Lang.Vietnamese]: 'Đơn giá',
											},
											virtual: true,
											admin: {
												placeholder: '0',
											},
											access: {
												read: allow(Role.Admin, Role.SalesManager),
												update: allow(Role.NoOne),
												create: allow(Role.NoOne),
											},
										},
										{
											name: 'previewTotal',
											type: 'number',
											label: {
												[Lang.English]: 'Total',
												[Lang.Vietnamese]: 'Tổng',
											},
											virtual: true,
											admin: {
												placeholder: '0',
											},
											access: {
												read: allow(Role.Admin, Role.SalesManager),
												update: allow(Role.NoOne),
												create: allow(Role.NoOne),
											},
										},
									],
								},
							],
						},
						{
							name: 'discountCode',
							type: 'relationship',
							relationTo: DiscountCodesSlug,
							label: {
								[Lang.English]: 'Discount Code',
								[Lang.Vietnamese]: 'Mã giảm giá',
							},
							access: {
								read: allow(Role.Admin, Role.SalesManager),
								update: allow(Role.Admin, Role.SalesManager),
								create: allow(Role.Admin, Role.SalesManager),
							},
						},
						{
							name: 'prices',
							type: 'group',
							label: {
								[Lang.English]: 'Prices',
								[Lang.Vietnamese]: 'Giá',
							},
							virtual: true,
							fields: [
								{
									name: 'provisional',
									type: 'number',
									label: {
										[Lang.English]: 'Provisional Total',
										[Lang.Vietnamese]: 'Tổng tạm tính',
									},
									admin: {
										placeholder: '0',
									},

									access: {
										read: allow(Role.Admin, Role.SalesManager),
										update: allow(Role.NoOne),
										create: allow(Role.NoOne),
									},
								},
								{
									name: 'shipping',
									type: 'number',
									label: {
										[Lang.English]: 'Shipping Fee',
										[Lang.Vietnamese]: 'Phí vận chuyển',
									},
									admin: {
										placeholder: '0',
									},

									access: {
										read: allow(Role.Admin, Role.SalesManager),
										update: allow(Role.NoOne),
										create: allow(Role.NoOne),
									},
								},
								{
									name: 'discount',
									type: 'number',
									label: {
										[Lang.English]: 'Discount',
										[Lang.Vietnamese]: 'Giảm giá',
									},
									admin: {
										placeholder: '0',
									},

									access: {
										read: allow(Role.Admin, Role.SalesManager),
										update: allow(Role.NoOne),
										create: allow(Role.NoOne),
									},
								},
								{
									name: 'total',
									type: 'number',
									label: {
										[Lang.English]: 'Total',
										[Lang.Vietnamese]: 'Tổng cộng',
									},
									admin: {
										placeholder: '0',
									},

									access: {
										read: allow(Role.Admin, Role.SalesManager),
										update: allow(Role.NoOne),
										create: allow(Role.NoOne),
									},
								},
								{
									name: 'paidAmount',
									type: 'number',
									label: {
										[Lang.English]: 'Paid Amount',
										[Lang.Vietnamese]: 'Số tiền đã thanh toán',
									},
									access: {
										read: allow(Role.Admin, Role.SalesManager),
										update: allow(Role.NoOne),
										create: allow(Role.NoOne),
									},
								},
							],
						},
					],
				},
				{
					name: 'billing',
					label: {
						[Lang.English]: 'Billing',
						[Lang.Vietnamese]: 'Thông tin thanh toán',
					},
					fields: [
						{
							name: 'method',
							type: 'select',
							label: {
								[Lang.English]: 'Payment Method',
								[Lang.Vietnamese]: 'Phương thức thanh toán',
							},
							admin: {
								placeholder: 'Chọn phương thức thanh toán',
							},
							defaultValue: 'cod',
							access: {
								read: allow(Role.Admin, Role.SalesManager),
								update: allow(Role.Admin, Role.SalesManager),
								create: allow(Role.Admin, Role.SalesManager),
							},
							options: [
								{
									value: 'cod',
									label: {
										[Lang.English]: 'Cash on Delivery',
										[Lang.Vietnamese]: 'Thanh toán khi nhận hàng',
									},
								},
								{
									value: 'bankTransfer',
									label: {
										[Lang.English]: 'Bank Transfer',
										[Lang.Vietnamese]: 'Chuyển khoản ngân hàng',
									},
								},
							],
						},
						{
							name: 'paidInFull',
							type: 'checkbox',
							label: {
								[Lang.English]: 'Paid in full',
								[Lang.Vietnamese]: 'Đã thanh toán đủ',
							},
							defaultValue: false,
							access: {
								read: allow(Role.Admin, Role.SalesManager),
								update: allow(Role.Admin, Role.SalesManager),
								create: allow(Role.Admin, Role.SalesManager),
							},
						},
						{
							name: 'transactions',
							type: 'array',
							label: {
								[Lang.English]: 'Transactions',
								[Lang.Vietnamese]: 'Các lần giao dịch',
							},
							fields: [
								{
									name: 'id',
									type: 'text',
									label: {
										[Lang.English]: 'Transaction ID',
										[Lang.Vietnamese]: 'ID giao dịch',
									},
									access: {
										read: allow(Role.Admin, Role.SalesManager),
										update: allow(Role.NoOne),
										create: allow(Role.NoOne),
									},
								},
								{
									name: 'transactionDate',
									type: 'date',
									label: {
										[Lang.English]: 'Transaction Date',
										[Lang.Vietnamese]: 'Ngày giao dịch',
									},
									access: {
										read: allow(Role.Admin, Role.SalesManager),
										update: allow(Role.NoOne),
										create: allow(Role.NoOne),
									},
								},
								{
									name: 'code',
									type: 'text',
									label: {
										[Lang.English]: 'Code',
										[Lang.Vietnamese]: 'Mã code thanh toán',
									},
									access: {
										read: allow(Role.Admin, Role.SalesManager),
										update: allow(Role.NoOne),
										create: allow(Role.NoOne),
									},
								},
								{
									name: 'content',
									type: 'text',
									label: {
										[Lang.English]: 'Content',
										[Lang.Vietnamese]: 'Nội dung chuyển khoản',
									},
									access: {
										read: allow(Role.Admin, Role.SalesManager),
										update: allow(Role.NoOne),
										create: allow(Role.NoOne),
									},
								},
								{
									name: 'transferAmount',
									type: 'number',
									label: {
										[Lang.English]: 'Transfer Amount',
										[Lang.Vietnamese]: 'Số tiền chuyển khoản',
									},
									access: {
										read: allow(Role.Admin, Role.SalesManager),
										update: allow(Role.NoOne),
										create: allow(Role.NoOne),
									},
								},
								{
									name: 'referenceCode',
									type: 'text',
									label: {
										[Lang.English]: 'Reference Code',
										[Lang.Vietnamese]: 'Mã tham chiếu',
									},
									access: {
										read: allow(Role.Admin, Role.SalesManager),
										update: allow(Role.NoOne),
										create: allow(Role.NoOne),
									},
								},
								{
									name: 'description',
									type: 'text',
									label: {
										[Lang.English]: 'Description',
										[Lang.Vietnamese]: 'Mô tả',
									},
									access: {
										read: allow(Role.Admin, Role.SalesManager),
										update: allow(Role.NoOne),
										create: allow(Role.NoOne),
									},
								},
							],
							access: {
								read: allow(Role.Admin, Role.SalesManager),
								update: allow(Role.NoOne),
								create: allow(Role.NoOne),
							},
						},
					],
				},
				{
					name: 'shippingInfo',
					label: {
						[Lang.English]: 'Shipping Info',
						[Lang.Vietnamese]: 'Thông tin giao hàng',
					},
					fields: [
						{
							name: 'address',
							type: 'group',
							label: {
								[Lang.English]: 'Shipping Address',
								[Lang.Vietnamese]: 'Địa chỉ giao hàng',
							},
							fields: [
								{
									name: 'city',
									type: 'text',
									label: {
										[Lang.English]: 'City',
										[Lang.Vietnamese]: 'Thành phố',
									},
									required: true,
									access: {
										read: allow(Role.Admin, Role.SalesManager),
										update: allow(Role.Admin, Role.SalesManager),
										create: allow(Role.Admin, Role.SalesManager),
									},
								},
								{
									name: 'district',
									type: 'text',
									label: {
										[Lang.English]: 'District',
										[Lang.Vietnamese]: 'Quận',
									},
									required: true,
									access: {
										read: allow(Role.Admin, Role.SalesManager),
										update: allow(Role.Admin, Role.SalesManager),
										create: allow(Role.Admin, Role.SalesManager),
									},
								},
								{
									name: 'ward',
									type: 'text',
									label: {
										[Lang.English]: 'Ward',
										[Lang.Vietnamese]: 'Phường',
									},
									required: true,
									access: {
										read: allow(Role.Admin, Role.SalesManager),
										update: allow(Role.Admin, Role.SalesManager),
										create: allow(Role.Admin, Role.SalesManager),
									},
								},
								{
									name: 'houseNumber',
									type: 'text',
									label: {
										[Lang.English]: 'House Number',
										[Lang.Vietnamese]: 'Số nhà',
									},
									required: true,
									access: {
										read: allow(Role.Admin, Role.SalesManager),
										update: allow(Role.Admin, Role.SalesManager),
										create: allow(Role.Admin, Role.SalesManager),
									},
								},
							],
						},
						{
							name: 'method',
							type: 'select',
							label: {
								[Lang.English]: 'Shipping Method',
								[Lang.Vietnamese]: 'Phương thức giao hàng',
							},
							admin: {
								placeholder: 'Giao hàng tiêu chuẩn',
							},
							defaultValue: 'standard',
							access: {
								read: allow(Role.Admin, Role.SalesManager),
								update: allow(Role.Admin, Role.SalesManager),
								create: allow(Role.Admin, Role.SalesManager),
							},
							options: [
								{
									value: 'standard',
									label: {
										[Lang.English]: 'Standard Shipping',
										[Lang.Vietnamese]: 'Giao hàng tiêu chuẩn',
									},
								},
								{
									value: 'express',
									label: {
										[Lang.English]: 'Express Shipping',
										[Lang.Vietnamese]: 'Giao hàng nhanh',
									},
								},
							],
						},
						{
							name: 'tracking',
							type: 'text',
							label: {
								[Lang.English]: 'Tracking Number',
								[Lang.Vietnamese]: 'Mã vận đơn',
							},
							access: {
								read: allow(Role.Admin, Role.SalesManager),
								update: allow(Role.Admin, Role.SalesManager),
								create: allow(Role.Admin, Role.SalesManager),
							},
							admin: {
								description: {
									[Lang.English]: 'Get from the shipping provider',
									[Lang.Vietnamese]: 'Lấy từ nhà cung cấp vận chuyển',
								},
							},
						},
					],
				},
				{
					name: 'message',
					label: {
						[Lang.English]: 'Message',
						[Lang.Vietnamese]: 'Lời nhắn',
					},
					fields: [
						{
							name: 'sender',
							type: 'text',
							label: {
								[Lang.English]: 'Sender',
								[Lang.Vietnamese]: 'Người gửi',
							},
							access: {
								read: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
								update: allow(Role.NoOne),
								create: allow(Role.NoOne),
							},
						},
						{
							name: 'receiver',
							type: 'textarea',
							label: {
								[Lang.English]: 'Receiver',
								[Lang.Vietnamese]: 'Người nhận',
							},
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
					],
				},
				{
					name: 'review',
					label: {
						[Lang.English]: 'Review',
						[Lang.Vietnamese]: 'Đánh giá',
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
								create: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
								read: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
								update: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
							},
							defaultValue: false,
						},
					],
				},
			],
		},
	],
	timestamps: true,
	versions: true,
	hooks: {
		beforeChange: [removeVirtualFields, checkPaidInFull],
		afterChange: [sendOrderCreatedEmail],
		afterRead: [populatePriceFields],
	},
}
