import { revalidateTag } from 'next/cache'
import { GlobalConfig } from 'payload'

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
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Your contact information',
								[Lang.Vietnamese]: 'Thông tin liên hệ của bạn',
							}),
							admin: {
								placeholder: 'Thông tin liên hệ của bạn',
							},
						},
						{
							name: 'emailInputLabel',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Input email',
								[Lang.Vietnamese]: 'Nhập địa chỉ email',
							}),
							admin: {
								placeholder: 'Nhập địa chỉ email',
							},
						},
						{
							name: 'acceptNewsletter',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'I accept all newsletters',
								[Lang.Vietnamese]: 'Tôi đồng ý nhận mọi thông tin khuyến mãi',
							}),
							admin: {
								placeholder: 'Tôi đồng ý nhận mọi thông tin khuyến mãi',
							},
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
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Address',
								[Lang.Vietnamese]: 'Địa chỉ giao hàng',
							}),
							admin: {
								placeholder: 'Địa chỉ giao hàng',
							},
						},
						{
							name: 'nameInputLabel',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Name',
								[Lang.Vietnamese]: 'Họ và tên',
							}),
							admin: {
								placeholder: 'Họ và tên',
							},
						},
						{
							name: 'phoneInputLabel',
							type: 'text',
							label: false,
							required: true,
							defaultValue: matchLang({
								[Lang.English]: 'Phone number',
								[Lang.Vietnamese]: 'Số điện thoại',
							}),
							admin: {
								placeholder: 'Số điện thoại',
							},
						},
						{
							name: 'provinceCityInputLabel',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Select Province/City',
								[Lang.Vietnamese]: 'Chọn Tỉnh/Thành phố',
							}),
							admin: {
								placeholder: 'Chọn Tỉnh/Thành phố',
							},
						},
						{
							name: 'districtInputLabel',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Select District/Ward',
								[Lang.Vietnamese]: 'Chọn Quận/Huyện',
							}),
							admin: {
								placeholder: 'Chọn Quận/Huyện',
							},
						},
						{
							name: 'wardInputLabel',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Select Ward/Block',
								[Lang.Vietnamese]: 'Chọn Phuờng/Xã',
							}),
							admin: {
								placeholder: 'Chọn Phuờng/Xã',
							},
						},
						{
							name: 'details',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Number of people, street, building',
								[Lang.Vietnamese]: 'Số nhà, đường, khu vực',
							}),
							admin: {
								placeholder: 'Số nhà, đường, khu vực',
							},
						},
						{
							name: 'saveForNextTime',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Save details for next time',
								[Lang.Vietnamese]: 'Lưu thông tin thanh toán cho những lần tiếp theo',
							}),
							admin: {
								placeholder: 'Lưu thông tin thanh toán cho những lần tiếp theo',
							},
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
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Shipping method',
								[Lang.Vietnamese]: 'Phuơng thức vận chuyển',
							}),
							admin: {
								placeholder: 'Phuơng thức vận chuyển',
							},
						},
						{
							name: 'standardShippingLabel',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Standard shipping (5-7 days)',
								[Lang.Vietnamese]: 'Giao hàng tiêu chuẩn (5-7 ngày)',
							}),
							admin: {
								placeholder: 'Giao hàng tiêu chuẩn (5-7 ngày)',
							},
						},
						{
							name: 'fastShippingLabel',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Fast shipping (<3 days)',
								[Lang.Vietnamese]: 'Giao hàng nhanh (<3 ngày)',
							}),
							admin: {
								placeholder: 'Giao hàng nhanh (<3 ngày)',
							},
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
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Payment method',
								[Lang.Vietnamese]: 'Phương thức thanh toán',
							}),
							admin: {
								placeholder: 'Phương thức thanh toán',
							},
						},
						{
							name: 'codLabel',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Cash on delivery (COD)',
								[Lang.Vietnamese]: 'Thanh toán khi nhận hàng (COD)',
							}),
							admin: {
								placeholder: 'Thanh toán khi nhận hàng (COD)',
							},
						},
						{
							name: 'bankTransferLabel',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Bank transfer (QR)',
								[Lang.Vietnamese]: 'Chuyển khoản ngân hàng (QR)',
							}),
							admin: {
								placeholder: 'Chuyển khoản ngân hàng (QR)',
							},
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
							label: false,
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
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Sender name',
								[Lang.Vietnamese]: 'Tên người gửi',
							}),
							admin: {
								placeholder: 'Tên người gửi',
							},
						},
						{
							name: 'recipientInputLabel',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Recipient name',
								[Lang.Vietnamese]: 'Tên người nhận',
							}),
							admin: {
								placeholder: 'Tên người nhận',
							},
						},
						{
							name: 'messageInputLabel',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Message. Limit 1000 characters.',
								[Lang.Vietnamese]: 'Thông điệp. Giới hạn 1000 chữ.',
							}),
							admin: {
								placeholder: 'Thông điệp. Giới hạn 1000 chữ.',
							},
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
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Order details',
								[Lang.Vietnamese]: 'Chi tiết đơn hàng',
							}),
							admin: {
								placeholder: 'Chi tiết đơn hàng',
							},
						},
					],
				},
				{
					name: 'discount',
					label: {
						en: 'Discount',
						vi: 'Giảm giá',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Discount code',
								[Lang.Vietnamese]: 'Mã giảm giá',
							}),
							admin: {
								placeholder: 'Mã giảm giá',
							},
						},
						{
							name: 'inputPlaceholder',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Discount code',
								[Lang.Vietnamese]: 'Mã khuyến mãi',
							}),
							admin: {
								placeholder: 'Mã khuyến mãi',
							},
						},
						{
							name: 'applyButtonLabel',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Apply',
								[Lang.Vietnamese]: 'Áp dụng',
							}),
							admin: {
								placeholder: 'Áp dụng',
							},
						},
					],
				},
				{
					name: 'orderSummary',
					label: {
						en: 'Order Summary',
						vi: 'Tóm tắt đơn hàng',
					},
					fields: [
						{
							name: 'provisional',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Provisional',
								[Lang.Vietnamese]: 'Tạm tính',
							}),
							admin: {
								placeholder: 'Tạm tính',
							},
						},
						{
							name: 'discount',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Discount',
								[Lang.Vietnamese]: 'Giảm giá',
							}),
							admin: {
								placeholder: 'Giảm giá',
							},
						},
						{
							name: 'shipping',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Shipping',
								[Lang.Vietnamese]: 'Vận chuyển',
							}),
							admin: {
								placeholder: 'Vận chuyển',
							},
						},
						{
							name: 'total',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Total',
								[Lang.Vietnamese]: 'Tổng cộng',
							}),
							admin: {
								placeholder: 'Tổng cộng',
							},
						},
						{
							name: 'acknowledgment',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]:
									'When pressing the Order button, you confirm that you have read and agree to our terms, sales policy, and privacy policy on the Website.',
								[Lang.Vietnamese]:
									'Khi nhấn nút Đặt hàng nghĩa là bạn đã đọc và đồng ý với các điều khoản, chính sách bán hàng và bảo mật của chúng tôi tại Website.',
							}),
							admin: {
								placeholder:
									'Khi nhấn nút Đặt hàng nghĩa là bạn đã đọc và đồng ý với các điều khoản, chính sách bán hàng và bảo mật của chúng tôi tại Website.',
							},
						},
						{
							name: 'orderButtonLabel',
							type: 'text',
							label: false,
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Order',
								[Lang.Vietnamese]: 'Đặt hàng',
							}),
							admin: {
								placeholder: 'Đặt hàng',
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
