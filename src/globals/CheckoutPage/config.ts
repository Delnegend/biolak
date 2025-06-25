import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/utilities/lang'

import { CheckoutPageGlobalDefaults as defaults } from './defaults'

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
								placeholder: defaults.contacts.title(Lang.Vietnamese),
							},
						},
						{
							name: 'emailInputLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.contacts.emailInputLabel(Lang.Vietnamese),
							},
						},
						{
							name: 'acceptNewsletter',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.contacts.acceptNewsletter(Lang.Vietnamese),
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
								placeholder: defaults.address.title(Lang.Vietnamese),
							},
						},
						{
							name: 'nameInputLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.address.nameInputLabel(Lang.Vietnamese),
							},
						},
						{
							name: 'phoneInputLabel',
							type: 'text',
							label: false,
							admin: {
								placeholder: defaults.address.phoneInputLabel(Lang.Vietnamese),
							},
						},
						{
							name: 'provinceCityInputLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.address.provinceCityInputLabel(Lang.Vietnamese),
							},
						},
						{
							name: 'districtInputLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.address.districtInputLabel(Lang.Vietnamese),
							},
						},
						{
							name: 'wardInputLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.address.wardInputLabel(Lang.Vietnamese),
							},
						},
						{
							name: 'details',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.address.details(Lang.Vietnamese),
							},
						},
						{
							name: 'saveForNextTime',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.address.saveForNextTime(Lang.Vietnamese),
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
								placeholder: defaults.shipping.title(Lang.Vietnamese),
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
										placeholder: defaults.shipping.standardShippingLabel(Lang.Vietnamese),
									},
								},
								{
									name: 'fastShippingLabel',
									type: 'text',
									label: false,
									localized: true,
									admin: {
										placeholder: defaults.shipping.fastShippingLabel(Lang.Vietnamese),
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
										placeholder: defaults.shipping.standardShippingPrice.toString(),
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
										placeholder: defaults.shipping.fastShippingPrice.toString(),
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
								placeholder: defaults.payment.title(Lang.Vietnamese),
							},
						},
						{
							name: 'codLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.payment.codLabel(Lang.Vietnamese),
							},
						},
						{
							name: 'bankTransferLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.payment.bankTransferLabel(Lang.Vietnamese),
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
								placeholder: defaults.gift.title(Lang.Vietnamese),
							},
						},
						{
							name: 'senderInputLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.gift.sender(Lang.Vietnamese),
							},
						},
						{
							name: 'recipientInputLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.gift.recipient(Lang.Vietnamese),
							},
						},
						{
							name: 'messageInputLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.gift.message(Lang.Vietnamese),
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
								placeholder: defaults.order.title(Lang.Vietnamese),
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
								placeholder: defaults.discount.title(Lang.Vietnamese),
							},
						},
						{
							name: 'inputPlaceholder',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.discount.inputLabel(Lang.Vietnamese),
							},
						},
						{
							name: 'applyButtonLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.discount.applyButton(Lang.Vietnamese),
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
								placeholder: defaults.orderSummary.provisional(Lang.Vietnamese),
							},
						},
						{
							name: 'discount',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.orderSummary.discount(Lang.Vietnamese),
							},
						},
						{
							name: 'shipping',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.orderSummary.shipping(Lang.Vietnamese),
							},
						},
						{
							name: 'total',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.orderSummary.total(Lang.Vietnamese),
							},
						},
						{
							name: 'acknowledgment',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.orderSummary.acknowledge(Lang.Vietnamese),
							},
						},
						{
							name: 'orderButtonLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.orderSummary.orderButton(Lang.Vietnamese),
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
								placeholder: defaults.popup.successTitle(Lang.Vietnamese),
							},
						},
						{
							name: 'successDescription',
							type: 'textarea',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.popup.successDescription(Lang.Vietnamese),
							},
						},
						{
							name: 'backToHomeButtonLabel',
							type: 'text',
							label: false,
							localized: true,
							admin: {
								placeholder: defaults.popup.backToHomeButton(Lang.Vietnamese),
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

					revalidateTag(CheckoutPageGlobalSlug)
				}

				return doc
			},
		],
	},
}
