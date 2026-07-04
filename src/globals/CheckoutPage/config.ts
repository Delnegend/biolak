import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/i18n/routing'

import vi from '../../../messages/vi.json'

export const CheckoutPageGlobalSlug = 'checkoutPageGlobal'
export const CheckoutPageGlobalConf: GlobalConfig<typeof CheckoutPageGlobalSlug> = {
	slug: CheckoutPageGlobalSlug,
	label: {
		[Lang.English]: 'Checkout Page',
		[Lang.Vietnamese]: 'Trang thanh toán',
	},
	access: {
		read: allow(Role.Public),
		update: allow(Role.Admin, Role.ContentManager),
	},
	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					name: 'contacts',
					label: {
						[Lang.English]: 'Contacts',
						[Lang.Vietnamese]: 'Thông tin liên hệ',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.contacts.title,
							},
						},
						{
							name: 'emailInputLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.contacts.emailInputLabel,
							},
						},
						{
							name: 'acceptNewsletter',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.contacts.acceptNewsletter,
							},
						},
					],
				},
				{
					name: 'address',
					label: {
						[Lang.English]: 'Address',
						[Lang.Vietnamese]: 'Địa chỉ',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.address.title,
							},
						},
						{
							name: 'nameInputLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.address.nameInputLabel,
							},
						},
						{
							name: 'phoneInputLabel',
							type: 'text',
							label: false,
							admin: {
								placeholder: vi.globals.checkout.address.phoneInputLabel,
							},
						},
						{
							name: 'provinceCityInputLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.address.provinceCityInputLabel,
							},
						},
						{
							name: 'districtInputLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.address.districtInputLabel,
							},
						},
						{
							name: 'wardInputLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.address.wardInputLabel,
							},
						},
						{
							name: 'details',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.address.details,
							},
						},
						{
							name: 'saveForNextTime',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.address.saveForNextTime,
							},
						},
					],
				},
				{
					name: 'shipping',
					label: {
						[Lang.English]: 'Shipping',
						[Lang.Vietnamese]: 'Vận chuyển',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.shipping.title,
							},
						},
						{
							type: 'row',
							fields: [
								{
									name: 'standardShippingLabel',
									type: 'text',
									label: false,
									localized: true,
									admin: {
										placeholder:
											vi.globals.checkout.shipping.standardShippingLabel,
									},
								},
								{
									name: 'fastShippingLabel',
									type: 'text',
									label: false,
									localized: true,
									admin: {
										placeholder: vi.globals.checkout.shipping.fastShippingLabel,
									},
								},
							],
						},
						{
							type: 'row',
							fields: [
								{
									name: 'standardShippingPrice',
									type: 'number',
									label: {
										[Lang.English]: 'Standard Shipping Price',
										[Lang.Vietnamese]: 'Giá vận chuyển tiêu chuẩn',
									},
									admin: {
										placeholder: '30000',
									},
								},
								{
									name: 'fastShippingPrice',
									type: 'number',
									label: {
										[Lang.English]: 'Fast Shipping Price',
										[Lang.Vietnamese]: 'Giá vận chuyển nhanh',
									},
									admin: {
										placeholder: '50000',
									},
								},
							],
						},
					],
				},
				{
					name: 'payment',
					label: {
						[Lang.English]: 'Payment',
						[Lang.Vietnamese]: 'Thanh toán',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.payment.title,
							},
						},
						{
							name: 'codLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.payment.codLabel,
							},
						},
						{
							name: 'bankTransferLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.payment.bankTransferLabel,
							},
						},
					],
				},
				{
					name: 'gift',
					label: {
						[Lang.English]: 'Gift',
						[Lang.Vietnamese]: 'Quà tặng',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.gift.title,
							},
						},
						{
							name: 'senderInputLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.gift.sender,
							},
						},
						{
							name: 'recipientInputLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.gift.recipient,
							},
						},
						{
							name: 'messageInputLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.gift.message,
							},
						},
					],
				},
				{
					name: 'order',
					label: {
						[Lang.English]: 'Order',
						[Lang.Vietnamese]: 'Đơn hàng',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.order.title,
							},
						},
					],
				},
				{
					name: 'discount',
					label: {
						[Lang.English]: 'Discount',
						[Lang.Vietnamese]: 'Giảm giá',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.discount.title,
							},
						},
						{
							name: 'inputPlaceholder',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.discount.inputLabel,
							},
						},
						{
							name: 'applyButtonLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.discount.applyButton,
							},
						},
					],
				},
				{
					name: 'orderSummary',
					label: {
						[Lang.English]: 'Order Summary',
						[Lang.Vietnamese]: 'Tóm tắt đơn hàng',
					},
					fields: [
						{
							name: 'provisional',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.orderSummary.provisional,
							},
						},
						{
							name: 'discount',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.orderSummary.discount,
							},
						},
						{
							name: 'shipping',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.orderSummary.shipping,
							},
						},
						{
							name: 'total',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.orderSummary.total,
							},
						},
						{
							name: 'acknowledgment',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.orderSummary.acknowledge,
							},
						},
						{
							name: 'orderButtonLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.orderSummary.orderButton,
							},
						},
					],
				},
				{
					name: 'popup',
					label: {
						[Lang.English]: 'Order success popup',
						[Lang.Vietnamese]: 'Hộp thoại đặt hàng thành công',
					},
					fields: [
						{
							name: 'successTitle',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.popup.successTitle,
							},
						},
						{
							name: 'successDescription',
							type: 'textarea',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.popup.successDescription,
							},
						},
						{
							name: 'backToHomeButtonLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: vi.globals.checkout.popup.backToHomeButton,
							},
						},
					],
				},
			],
		},
	],
	hooks: {
		afterChange: [
			({ doc, req: { payload, context } }) => {
				if (!context.disableRevalidate) {
					payload.logger.info(`Revalidating checkout page labels`)

					revalidateTag(CheckoutPageGlobalSlug, 'default')
				}

				return doc
			},
		],
	},
}
