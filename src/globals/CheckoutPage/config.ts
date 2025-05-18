import { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'

import { revalidateCheckoutPage } from './hooks/revalidateCheckoutPage'

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
							defaultValue: 'Thông tin liên hệ của bạn',
							required: true,
						},
						{
							name: 'emailInputLabel',
							type: 'text',
							label: {
								en: 'Email Input Label',
								vi: 'Nhãn nhập địa chỉ email',
							},
							required: true,
							defaultValue: 'Nhập địa chỉ email',
						},
						{
							name: 'acceptNewsletter',
							type: 'text',
							label: {
								en: 'Accept Newsletter',
								vi: 'Đồng ý nhận bản tin',
							},
							required: true,
							defaultValue: 'Tôi đồng ý nhận mọi thông tin khuyến mãi',
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
							defaultValue: 'Địa chỉ giao hàng',
						},
						{
							name: 'nameInputLabel',
							type: 'text',
							label: {
								en: 'Name Input Label',
								vi: 'Nhãn nhập tên',
							},
							required: true,
							defaultValue: 'Họ và tên',
						},
						{
							name: 'phoneInputLabel',
							type: 'text',
							label: {
								en: 'Phone Input Label',
								vi: 'Nhãn nhập số điện thoại',
							},
							required: true,
							defaultValue: 'Số điện thoại',
						},
						{
							name: 'provinceCityInputLabel',
							type: 'text',
							label: {
								en: 'Province/City Input Label',
								vi: 'Nhãn nhập Tỉnh/Thành phố',
							},
							required: true,
							defaultValue: 'Chọn Tỉnh/Thành phố',
						},
						{
							name: 'districtInputLabel',
							type: 'text',
							label: {
								en: 'District Input Label',
								vi: 'Nhãn nhập Quận/Huyện',
							},
							required: true,
							defaultValue: 'Chọn Quận/Huyện',
						},
						{
							name: 'wardInputLabel',
							type: 'text',
							label: {
								en: 'Ward Input Label',
								vi: 'Nhãn nhập Phuờng/Xã',
							},
							required: true,
							defaultValue: 'Chọn Phuờng/Xã',
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
							defaultValue: 'Phuơng thức vận chuyển',
						},
						{
							name: 'standardShippingLabel',
							type: 'text',
							label: {
								en: 'Standard Shipping Label',
								vi: 'Phuơng thức vận chuyển chuẩn',
							},
							required: true,
							defaultValue: 'Giao hàng tiêu chuẩn (2-3 ngày)',
						},
						{
							name: 'fastShippingLabel',
							type: 'text',
							label: {
								en: 'Fast Shipping Label',
								vi: 'Phuơng thức vận chuyển nhanh',
							},
							required: true,
							defaultValue: 'Giao hàng nhanh (1-2 ngày)',
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
							defaultValue: 'Phương thức thanh toán',
						},
						{
							name: 'codLabel',
							type: 'text',
							label: {
								en: 'COD Label',
								vi: 'Nhãn COD',
							},
							required: true,
							defaultValue: 'Thanh toán khi nhận hàng (COD)',
						},
						{
							name: 'bankTransferLabel',
							type: 'text',
							label: {
								en: 'Bank Transfer Label',
								vi: 'Nhãn chuyển khoản ngân hàng',
							},
							required: true,
							defaultValue: 'Chuyển khoản ngân hàng (QR)',
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
							defaultValue: 'Tặng quà',
						},
						{
							name: 'senderInputLabel',
							type: 'text',
							label: {
								en: 'Sender Input Label',
								vi: 'Nhãn nhập tên người gửi',
							},
							required: true,
							defaultValue: 'Tên người gửi',
						},
						{
							name: 'recipientInputLabel',
							type: 'text',
							label: {
								en: 'Recipient Input Label',
								vi: 'Nhãn nhập tên người nhận',
							},
							required: true,
							defaultValue: 'Tên người nhận',
						},
						{
							name: 'messageInputLabel',
							type: 'text',
							label: {
								en: 'Message Input Label',
								vi: 'Nhãn nhập tin nhắn',
							},
							required: true,
							defaultValue: 'Thông điệp. Giới hạn 1000 chữ.',
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
							defaultValue: 'Chi tiết đơn hàng',
						},
					],
				},
			],
		},
	],
	hooks: {
		afterChange: [revalidateCheckoutPage],
	},
}
