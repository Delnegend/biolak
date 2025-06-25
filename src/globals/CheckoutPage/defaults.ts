import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const CheckoutPageGlobalDefaults = {
	contacts: {
		/** `Thông tin liên hệ của bạn` */
		title: matchLang({
			[Lang.English]: 'Your contact information',
			[Lang.Vietnamese]: 'Thông tin liên hệ của bạn',
		}),
		/** `Nhập địa chỉ email` */
		emailInputLabel: matchLang({
			[Lang.English]: 'Input email',
			[Lang.Vietnamese]: 'Nhập địa chỉ email',
		}),
		/** `Tôi đồng ý nhận mọi thông tin khuyến mãi` */
		acceptNewsletter: matchLang({
			[Lang.English]: 'I accept all newsletters',
			[Lang.Vietnamese]: 'Tôi đồng ý nhận mọi thông tin khuyến mãi',
		}),
	},
	address: {
		/** `Địa chỉ giao hàng` */
		title: matchLang({
			[Lang.English]: 'Address',
			[Lang.Vietnamese]: 'Địa chỉ giao hàng',
		}),
		/** `Họ và tên` */
		nameInputLabel: matchLang({
			[Lang.English]: 'Name',
			[Lang.Vietnamese]: 'Họ và tên',
		}),
		/** `Số điện thoại` */
		phoneInputLabel: matchLang({
			[Lang.English]: 'Phone number',
			[Lang.Vietnamese]: 'Số điện thoại',
		}),
		/** `Chọn Tỉnh/Thành phố` */
		provinceCityInputLabel: matchLang({
			[Lang.English]: 'Select Province/City',
			[Lang.Vietnamese]: 'Chọn Tỉnh/Thành phố',
		}),
		/** `Chọn Quận/Huyện` */
		districtInputLabel: matchLang({
			[Lang.English]: 'Select District/Ward',
			[Lang.Vietnamese]: 'Chọn Quận/Huyện',
		}),
		/** `Chọn Phuờng/Xã` */
		wardInputLabel: matchLang({
			[Lang.English]: 'Select Ward/Block',
			[Lang.Vietnamese]: 'Chọn Phuờng/Xã',
		}),
		/** `Số nhà, đường, khu vực` */
		details: matchLang({
			[Lang.English]: 'Number of people, street, building',
			[Lang.Vietnamese]: 'Số nhà, đường, khu vực',
		}),
		/** `Lưu thông tin thanh toán cho những lần tiếp theo` */
		saveForNextTime: matchLang({
			[Lang.English]: 'Save details for next time',
			[Lang.Vietnamese]: 'Lưu thông tin thanh toán cho những lần tiếp theo',
		}),
	},
	shipping: {
		/** `Phương thức vận chuyển` */
		title: matchLang({
			[Lang.English]: 'Shipping method',
			[Lang.Vietnamese]: 'Phuơng thức vận chuyển',
		}),
		/** `Giao hàng tiêu chuẩn (5-7 ngày)` */
		standardShippingLabel: matchLang({
			[Lang.English]: 'Standard shipping (5-7 days)',
			[Lang.Vietnamese]: 'Giao hàng tiêu chuẩn (5-7 ngày)',
		}),
		/** `Giao hàng nhanh (<3 ngày)` */
		fastShippingLabel: matchLang({
			[Lang.English]: 'Fast shipping (<3 days)',
			[Lang.Vietnamese]: 'Giao hàng nhanh (<3 ngày)',
		}),
		standardShippingPrice: 30000,
		fastShippingPrice: 50000,
	},
	payment: {
		/** `Phương thức thanh toán` */
		title: matchLang({
			[Lang.English]: 'Payment method',
			[Lang.Vietnamese]: 'Phương thức thanh toán',
		}),
		/** `Thanh toán khi nhận hàng` */
		codLabel: matchLang({
			[Lang.English]: 'Cash on delivery',
			[Lang.Vietnamese]: 'Thanh toán khi nhận hàng',
		}),
		/** `Chuyển khoản ngân hàng` */
		bankTransferLabel: matchLang({
			[Lang.English]: 'Bank Transfer',
			[Lang.Vietnamese]: 'Chuyển khoản ngân hàng',
		}),
	},
	gift: {
		/** `Tặng quà` */
		title: matchLang({
			[Lang.English]: 'Gift',
			[Lang.Vietnamese]: 'Tặng quà',
		}),
		/** `Nguời gửi` */
		sender: matchLang({
			[Lang.English]: 'Sender',
			[Lang.Vietnamese]: 'Người gửi',
		}),
		/** `Người nhận` */
		recipient: matchLang({
			[Lang.English]: 'Recipient',
			[Lang.Vietnamese]: 'Người nhận',
		}),
		/** `Lời nhắn. Giới hạn 1000 chữ.` */
		message: matchLang({
			[Lang.English]: 'Message. Limit 1000 characters.',
			[Lang.Vietnamese]: 'Lời nhắn. Giới hạn 1000 chữ.',
		}),
	},
	order: {
		/** `Chi tiết đơn hàng` */
		title: matchLang({
			[Lang.English]: 'Order details',
			[Lang.Vietnamese]: 'Chi tiết đơn hàng',
		}),
	},
	discount: {
		/** `Mã giảm giá` */
		title: matchLang({
			[Lang.English]: 'Coupon code',
			[Lang.Vietnamese]: 'Mã giảm giá',
		}),
		/** `Mã khuyến mãi` */
		inputLabel: matchLang({
			[Lang.English]: 'Coupon code',
			[Lang.Vietnamese]: 'Mã khuyến mãi',
		}),
		/** `Áp dụng` */
		applyButton: matchLang({
			[Lang.English]: 'Apply',
			[Lang.Vietnamese]: 'Áp dụng',
		}),
	},
	orderSummary: {
		/** `Tạm tính` */
		provisional: matchLang({
			[Lang.English]: 'Provisional',
			[Lang.Vietnamese]: 'Tạm tính',
		}),
		/** `Giảm giá` */
		discount: matchLang({
			[Lang.English]: 'Discount',
			[Lang.Vietnamese]: 'Giảm giá',
		}),
		/** `Vận chuyển` */
		shipping: matchLang({
			[Lang.English]: 'Shipping',
			[Lang.Vietnamese]: 'Vận chuyển',
		}),
		/** `Tổng cộng` */
		total: matchLang({
			[Lang.English]: 'Total',
			[Lang.Vietnamese]: 'Tổng cộng',
		}),
		/** `Khi nhấn nút Đặt hàng nghĩa là bạn...` */
		acknowledge: matchLang({
			[Lang.English]:
				'When pressing the Order button, you confirm that you have read and agree to our terms, sales policy, and privacy policy on the Website.',
			[Lang.Vietnamese]:
				'Khi nhấn nút Đặt hàng nghĩa là bạn đã đọc và đồng ý với các điều khoản, chính sách bán hàng và bảo mật của chúng tôi tại Website.',
		}),
		/** `Đặt hàng` */
		orderButton: matchLang({
			[Lang.English]: 'Order',
			[Lang.Vietnamese]: 'Đặt hàng',
		}),
	},
	popup: {
		successTitle: matchLang({
			[Lang.English]: 'Order placed successfully',
			[Lang.Vietnamese]: 'Đơn hàng đã được đặt thành công',
		}),
		successDescription: matchLang({
			[Lang.English]: 'The order will be shipped to you in 2-3 days.',
			[Lang.Vietnamese]: 'Đơn hàng sẽ được giao đến bạn trong 2-3 ngày.',
		}),
		backToHomeButton: matchLang({
			[Lang.English]: 'Back to home',
			[Lang.Vietnamese]: 'Quay về trang chủ',
		}),
	},
} as const
