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
							defaultValue: defaults.contacts.title,
							admin: {
								placeholder: defaults.contacts.title(Lang.Vietnamese),
							},
						},
						{
							name: 'emailInputLabel',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.contacts.emailInputLabel,
							admin: {
								placeholder: defaults.contacts.emailInputLabel(Lang.Vietnamese),
							},
						},
						{
							name: 'acceptNewsletter',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.contacts.acceptNewsletter,
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
							defaultValue: defaults.address.title,
							admin: {
								placeholder: defaults.address.title(Lang.Vietnamese),
							},
						},
						{
							name: 'nameInputLabel',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.address.nameInputLabel,
							admin: {
								placeholder: defaults.address.nameInputLabel(Lang.Vietnamese),
							},
						},
						{
							name: 'phoneInputLabel',
							type: 'text',
							label: false,
							defaultValue: defaults.address.phoneInputLabel,
							admin: {
								placeholder: defaults.address.phoneInputLabel(Lang.Vietnamese),
							},
						},
						{
							name: 'provinceCityInputLabel',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.address.provinceCityInputLabel,
							admin: {
								placeholder: defaults.address.provinceCityInputLabel(Lang.Vietnamese),
							},
						},
						{
							name: 'districtInputLabel',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.address.districtInputLabel,
							admin: {
								placeholder: defaults.address.districtInputLabel(Lang.Vietnamese),
							},
						},
						{
							name: 'wardInputLabel',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.address.wardInputLabel,
							admin: {
								placeholder: defaults.address.wardInputLabel(Lang.Vietnamese),
							},
						},
						{
							name: 'details',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.address.details,
							admin: {
								placeholder: defaults.address.details(Lang.Vietnamese),
							},
						},
						{
							name: 'saveForNextTime',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.address.saveForNextTime,
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
							defaultValue: defaults.shipping.title,
							admin: {
								placeholder: defaults.shipping.title(Lang.Vietnamese),
							},
						},
						{
							name: 'standardShippingLabel',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.shipping.standardShippingLabel,
							admin: {
								placeholder: defaults.shipping.standardShippingLabel(Lang.Vietnamese),
							},
						},
						{
							name: 'fastShippingLabel',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.shipping.fastShippingLabel,
							admin: {
								placeholder: defaults.shipping.fastShippingLabel(Lang.Vietnamese),
							},
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
							defaultValue: defaults.payment.title,
							admin: {
								placeholder: defaults.payment.title(Lang.Vietnamese),
							},
						},
						{
							name: 'codLabel',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.payment.codLabel,
							admin: {
								placeholder: defaults.payment.codLabel(Lang.Vietnamese),
							},
						},
						{
							name: 'bankTransferLabel',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.payment.bankTransferLabel,
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
							defaultValue: defaults.gift.title,
							admin: {
								placeholder: defaults.gift.title(Lang.Vietnamese),
							},
						},
						{
							name: 'senderInputLabel',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.gift.sender,
							admin: {
								placeholder: defaults.gift.sender(Lang.Vietnamese),
							},
						},
						{
							name: 'recipientInputLabel',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.gift.recipient,
							admin: {
								placeholder: defaults.gift.recipient(Lang.Vietnamese),
							},
						},
						{
							name: 'messageInputLabel',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.gift.message,
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
							defaultValue: defaults.order.title,
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
							defaultValue: defaults.discount.title,
							admin: {
								placeholder: defaults.discount.title(Lang.Vietnamese),
							},
						},
						{
							name: 'inputPlaceholder',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.discount.inputLabel,
							admin: {
								placeholder: defaults.discount.inputLabel(Lang.Vietnamese),
							},
						},
						{
							name: 'applyButtonLabel',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.discount.applyButton,
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
							defaultValue: defaults.orderSummary.provisional,
							admin: {
								placeholder: defaults.orderSummary.provisional(Lang.Vietnamese),
							},
						},
						{
							name: 'discount',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.orderSummary.discount,
							admin: {
								placeholder: defaults.orderSummary.discount(Lang.Vietnamese),
							},
						},
						{
							name: 'shipping',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.orderSummary.shipping,
							admin: {
								placeholder: defaults.orderSummary.shipping(Lang.Vietnamese),
							},
						},
						{
							name: 'total',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.orderSummary.total,
							admin: {
								placeholder: defaults.orderSummary.total(Lang.Vietnamese),
							},
						},
						{
							name: 'acknowledgment',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.orderSummary.acknowledge,
							admin: {
								placeholder: defaults.orderSummary.acknowledge(Lang.Vietnamese),
							},
						},
						{
							name: 'orderButtonLabel',
							type: 'text',
							label: false,
							localized: true,
							defaultValue: defaults.orderSummary.orderButton,
							admin: {
								placeholder: defaults.orderSummary.orderButton(Lang.Vietnamese),
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
