import { GlobalConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/utilities/lang'

import { revalidatePayment } from './hooks/revalidatePayment'
import { validateBankName } from './hooks/validateBankName'
import { PaymentGlobalSlug } from './slug'

export const PaymentGlobalConf: GlobalConfig<typeof PaymentGlobalSlug> = {
	slug: PaymentGlobalSlug,
	access: {
		read: allow(Role.Admin, Role.ContentManager, Role.ContentManager),
		update: allow(Role.Admin),
	},
	label: {
		[Lang.English]: 'Payment Settings',
		[Lang.Vietnamese]: 'Cài đặt thanh toán',
	},
	fields: [
		{
			name: 'sepayApiKey',
			type: 'text',
			label: {
				[Lang.English]: 'Sepay API Key',
				[Lang.Vietnamese]: 'Khóa API Sepay',
			},
		},
		{
			name: 'bankName',
			type: 'text',
			label: {
				[Lang.English]: 'Bank Name',
				[Lang.Vietnamese]: 'Tên ngân hàng',
			},
			validate: validateBankName,
		},
		{
			name: 'bankAccountNumber',
			type: 'text',
			label: {
				[Lang.English]: 'Bank Account Number',
				[Lang.Vietnamese]: 'Số tài khoản ngân hàng',
			},
		},
	],
	hooks: {
		afterChange: [revalidatePayment],
	},
}
