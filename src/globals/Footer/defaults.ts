import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const FooterGlobalDefaults = {
	contactUs: {
		title: matchLang({
			[Lang.English]: 'Register to receive the latest news and updates from BioLAK',
			[Lang.Vietnamese]: 'Đăng kí để nhận thông tin khuyến mãi sớm nhất từ BioLAK',
		}),
		emailInputLabel: matchLang({
			[Lang.English]: 'Enter your email address',
			[Lang.Vietnamese]: 'Nhập địa chỉ Email',
		}),
		description: matchLang({
			[Lang.English]:
				'Register to receive the latest news about products, services, events, and other information from BioLAK.',
			[Lang.Vietnamese]:
				'Đăng kí để nhận thông tin liên lạc về các sản phẩm, dịch vụ, cửa hàng, sự kiện và các vấn đề đáng quan tâm của BioLAK.',
		}),
	},
	legal: {
		title: matchLang({
			[Lang.English]: 'Website owned by the ELAK company',
			[Lang.Vietnamese]: 'Website thuộc quyền của công ty trách nhiệm hữu hạn ELAK',
		}),
		content: matchLang({
			[Lang.Vietnamese]: `GCNDKKD 0107874681 | Sở kế hoạch và đầu tư TP. Hà Nội
cấp ngày 05/06/2017,
đăng ký thay đổi lần 2 ngày 12/01/2024
Địa chỉ: Xóm 5 thôn Long Phú, xã Hòa Thạch, huyện Quốc Oai,
TP Hà Nội, Việt Nam.
Điện thoại: 0983335596 - Email: info@biolak.vn`,
			[Lang.English]: `Business Registration Certificate 0107874681 | Hanoi Department of Planning and Investment
issued on June 5, 2017,
registered for the second change on January 12, 2024
Address: Hamlet 5, Long Phu village, Hoa Thach commune, Quoc Oai district,
Hanoi, Vietnam.
Phone: 0983335596 - Email: info@biolak.vn`,
		}),
		copyright: matchLang({
			[Lang.English]: '© 2025 BioLAK Vietnam. All rights reserved.',
			[Lang.Vietnamese]: '© 2025 BioLAK Việt Nam. Mọi quyền được bảo lưu.',
		}),
	},
} as const
