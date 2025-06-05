import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const ContactFormGlobalDefaults = {
	/** `Liên hệ với BioLAK` */
	title: matchLang({
		[Lang.English]: 'Contact Us',
		[Lang.Vietnamese]: 'Liên hệ với BioLAK',
	}),
	/** `Nhập tên của bạn` */
	name: matchLang({
		[Lang.English]: 'Input your name',
		[Lang.Vietnamese]: 'Nhập tên của bạn',
	}),
	/** `Nhập số điện thoại` */
	phoneNumber: matchLang({
		[Lang.English]: 'Input your phone number',
		[Lang.Vietnamese]: 'Nhập số điện thoại',
	}),
	/** `Nhập địa chỉ email` */
	email: matchLang({
		[Lang.English]: 'Input your email',
		[Lang.Vietnamese]: 'Nhập địa chỉ email',
	}),
	/** `Câu hỏi của bạn tới chúng tôi` */
	question: matchLang({
		[Lang.English]: 'Ask your question to us',
		[Lang.Vietnamese]: 'Câu hỏi của bạn tới chúng tôi',
	}),
	/** `GỬI BIOLAK` */
	actionSend: matchLang({
		[Lang.English]: 'SEND BIOLAK',
		[Lang.Vietnamese]: 'GỬI BIOLAK',
	}),
	biolakPhoneNumber: matchLang({
		[Lang.English]: '0987654321',
		[Lang.Vietnamese]: '0987654321',
	}),
	/** `GỌI BIOLAK` */
	actionCall: matchLang({
		[Lang.English]: 'CALL BIOLAK',
		[Lang.Vietnamese]: 'GỌI BIOLAK',
	}),
} as const
