import { revalidateTag } from 'next/cache'
import type { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { MediaSlug } from '@/collections/Media/slug'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const FooterGlobalSlug = 'footerGlobal'
export const FooterGlobalConf: GlobalConfig<typeof FooterGlobalSlug> = {
	slug: FooterGlobalSlug,
	label: {
		en: 'Footer',
		vi: 'Chân trang',
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
					name: 'image',
					label: 'Image',
					fields: [
						{
							name: 'image',
							type: 'upload',
							relationTo: MediaSlug,
							label: 'Image',
						},
					],
				},
				{
					name: 'contactUs',
					label: 'Contact Us',
					fields: [
						{
							name: 'title',
							type: 'text',
							label: 'Title',
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]:
									'Register to receive the latest news and updates from BioLAK',
								[Lang.Vietnamese]:
									'Đăng kí để nhận thông tin khuyến mãi sớm nhất từ BioLAK',
							}),
						},
						{
							name: 'emailInputLabel',
							type: 'text',
							label: 'Email Input Label',
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Enter your email address',
								[Lang.Vietnamese]: 'Nhập địa chỉ Email',
							}),
						},
						{
							name: 'description',
							type: 'text',
							label: 'Description',
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]:
									'Register to receive the latest news about products, services, events, and other information from BioLAK.',
								[Lang.Vietnamese]:
									'Đăng kí để nhận thông tin liên lạc về các sản phẩm, dịch vụ, cửa hàng, sự kiện và các vấn đề đáng quan tâm của BioLAK.',
							}),
						},
					],
				},
				{
					name: 'legal',
					label: 'Legal',
					fields: [
						{
							name: 'title',
							type: 'text',
							label: 'Title',
							required: true,
							// defaultValue: 'Website thuộc quyền của công ty trách nhiệm hữu hạn ELAK',
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: 'Website owned by the ELAK company',
								[Lang.Vietnamese]:
									'Website thuộc quyền của công ty trách nhiệm hữu hạn ELAK',
							}),
						},
						{
							name: 'content',
							type: 'textarea',
							label: 'Content',
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.Vietnamese]: `GCNDKKD 0107874681 | Sở kế hoạch và đầu tư TP. Hà Nội
cấp ngày 05/06/2017,
đăng ký thay đổi lần 2 ngày 12/01/2024
Địa chỉ: Xóm 5 thôn Long Phú, xã Hòa Thạch, huyện Quốc Oai,
TP Hà Nội, Việt Nam.
Điện thoại: 0983335596 - Email: info@biolak.vn`,
								[Lang.English]: `
Business Registration Certificate 0107874681 | Hanoi Department of Planning and Investment
issued on June 5, 2017,
registered for the second change on January 12, 2024
Address: Hamlet 5, Long Phu village, Hoa Thach commune, Quoc Oai district,
Hanoi, Vietnam.
Phone: 0983335596 - Email: info@biolak.vn`,
							}),
						},
						{
							name: 'stamp',
							type: 'upload',
							relationTo: MediaSlug,
							label: 'Stamp',
							required: true,
						},
						{
							name: 'copyright',
							type: 'text',
							label: 'Copyright',
							required: true,
							localized: true,
							defaultValue: matchLang({
								[Lang.English]: '© 2025 BioLAK Vietnam. All rights reserved.',
								[Lang.Vietnamese]: '© 2025 BioLAK Việt Nam. Mọi quyền được bảo lưu.',
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
					payload.logger.info(`Revalidating footer`)

					revalidateTag(FooterGlobalSlug)
				}

				return doc
			},
		],
	},
}
