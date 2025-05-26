import { revalidateTag } from 'next/cache'
import { GlobalConfig, LabelFunction } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const CheckoutPageGlobalSlug = 'checkoutPageGlobal'
export const CheckoutPageGlobalConf: GlobalConfig<typeof CheckoutPageGlobalSlug> = {
	slug: CheckoutPageGlobalSlug,
	label: {
		en: 'Checkout Page',
		vi: 'Trang thanh toán',
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
						en: 'Contacts',
						vi: 'Thông tin liên hệ',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							label: {
								en: 'Title',
								vi: 'Tiêu đề',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Contact Information',
								[Lang.Vietnamese]: 'Thông tin liên hệ của bạn',
							}),
						},
						{
							name: 'emailInputLabel',
							type: 'text',
							label: {
								en: 'Email Input Label',
								vi: 'Nhãn nhập địa chỉ email',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Input email',
								[Lang.Vietnamese]: 'Nhập địa chỉ email',
							}),
						},
						{
							name: 'acceptNewsletter',
							type: 'text',
							label: {
								en: 'Accept Newsletter',
								vi: 'Đồng ý nhận bản tin',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'I accept all newsletters',
								[Lang.Vietnamese]: 'Tôi đồng ý nhận mọi thông tin khuyến mãi',
							}),
						},
					],
				},
				{
					name: 'address',
					label: {
						en: 'Address',
						vi: 'Địa chỉ',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							label: {
								en: 'Title',
								vi: 'Tiêu đề',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Address',
								[Lang.Vietnamese]: 'Địa chỉ giao hàng',
							}),
						},
						{
							name: 'nameInputLabel',
							type: 'text',
							label: {
								en: 'Name Input Label',
								vi: 'Nhãn nhập tên',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Name',
								[Lang.Vietnamese]: 'Họ và tên',
							}),
						},
						{
							name: 'phoneInputLabel',
							type: 'text',
							label: {
								en: 'Phone Input Label',
								vi: 'Nhãn nhập số điện thoại',
							},
							required: true,
							defaultValue: matchLang({
								[Lang.English]: 'Phone Number',
								[Lang.Vietnamese]: 'Số điện thoại',
							}),
						},
						{
							name: 'provinceCityInputLabel',
							type: 'text',
							label: {
								en: 'Province/City Input Label',
								vi: 'Nhãn nhập Tỉnh/Thành phố',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Select Province/City',
								[Lang.Vietnamese]: 'Chọn Tỉnh/Thành phố',
							}),
						},
						{
							name: 'districtInputLabel',
							type: 'text',
							label: {
								en: 'District Input Label',
								vi: 'Nhãn nhập Quận/Huyện',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Select District/Ward',
								[Lang.Vietnamese]: 'Chọn Quận/Huyện',
							}),
						},
						{
							name: 'wardInputLabel',
							type: 'text',
							label: {
								en: 'Ward Input Label',
								vi: 'Nhãn nhập Phuờng/Xã',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Select Ward/Block',
								[Lang.Vietnamese]: 'Chọn Phuờng/Xã',
							}),
						},
						{
							name: 'details',
							type: 'text',
							label: {
								en: 'Details',
								vi: 'Chi tiết',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Number of people, street, building',
								[Lang.Vietnamese]: 'Số nhà, đường, khu vực',
							}),
						},
						{
							name: 'saveForNextTime',
							type: 'text',
							label: {
								en: 'Save details',
								vi: 'Lưu chi tiết',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Save details for next time',
								[Lang.Vietnamese]: 'Lưu thông tin thanh toán cho những lần tiếp theo',
							}),
						},
					],
				},
				{
					name: 'shipping',
					label: {
						en: 'Shipping',
						vi: 'Vận chuyển',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							label: {
								en: 'Title',
								vi: 'Tiêu đề',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Shipping method',
								[Lang.Vietnamese]: 'Phuơng thức vận chuyển',
							}),
						},
						{
							name: 'standardShippingLabel',
							type: 'text',
							label: {
								en: 'Standard Shipping Label',
								vi: 'Phuơng thức vận chuyển chuẩn',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Standard shipping (2-3 days)',
								[Lang.Vietnamese]: 'Giao hàng tiêu chuẩn (2-3 ngày)',
							}),
						},
						{
							name: 'fastShippingLabel',
							type: 'text',
							label: {
								en: 'Fast Shipping Label',
								vi: 'Phuơng thức vận chuyển nhanh',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Fast shipping (1-2 days)',
								[Lang.Vietnamese]: 'Giao hàng nhanh (1-2 ngày)',
							}),
						},
					],
				},
				{
					name: 'payment',
					label: {
						en: 'Payment',
						vi: 'Thanh toán',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							label: {
								en: 'Title',
								vi: 'Tiêu đề',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Payment method',
								[Lang.Vietnamese]: 'Phương thức thanh toán',
							}),
						},
						{
							name: 'codLabel',
							type: 'text',
							label: {
								en: 'COD Label',
								vi: 'Nhãn COD',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Cash on delivery (COD)',
								[Lang.Vietnamese]: 'Thanh toán khi nhận hàng (COD)',
							}),
						},
						{
							name: 'bankTransferLabel',
							type: 'text',
							label: {
								en: 'Bank Transfer Label',
								vi: 'Nhãn chuyển khoản ngân hàng',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Bank transfer (QR)',
								[Lang.Vietnamese]: 'Chuyển khoản ngân hàng (QR)',
							}),
						},
					],
				},
				{
					name: 'gift',
					label: {
						en: 'Gift',
						vi: 'Quà tặng',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							label: {
								en: 'Title',
								vi: 'Tiêu đề',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Gift',
								[Lang.Vietnamese]: 'Tặng quà',
							}),
						},
						{
							name: 'senderInputLabel',
							type: 'text',
							label: {
								en: 'Sender Input Label',
								vi: 'Nhãn nhập tên người gửi',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Sender name',
								[Lang.Vietnamese]: 'Tên người gửi',
							}),
						},
						{
							name: 'recipientInputLabel',
							type: 'text',
							label: {
								en: 'Recipient Input Label',
								vi: 'Nhãn nhập tên người nhận',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Recipient name',
								[Lang.Vietnamese]: 'Tên người nhận',
							}),
						},
						{
							name: 'messageInputLabel',
							type: 'text',
							label: {
								en: 'Message Input Label',
								vi: 'Nhãn nhập tin nhắn',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Message. Limit 1000 characters.',
								[Lang.Vietnamese]: 'Thông điệp. Giới hạn 1000 chữ.',
							}),
						},
					],
				},
				{
					name: 'order',
					label: {
						en: 'Order',
						vi: 'Đơn hàng',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							label: {
								en: 'Title',
								vi: 'Tiêu đề',
							},
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Order details',
								[Lang.Vietnamese]: 'Chi tiết đơn hàng',
							}),
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
