import Image from 'next/image'

import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
export function PaymentQR({
	locale,
	amount,
	invoiceId,
	bankName,
	bankAccountNumber,
}: {
	locale: Lang
	amount: number
	invoiceId: string
	bankName: string
	bankAccountNumber: string
}): React.JSX.Element {
	return (
		<Image
			src={`https://qr.sepay.vn/img?acc=${bankAccountNumber}&bank=${bankName}&amount=${amount}&des=blck-${invoiceId}&download=true`}
			alt={matchLang({
				[Lang.English]: 'Bank Transfer QR',
				[Lang.Vietnamese]: 'Mã QR chuyển khoản ngân hàng',
			})(locale)}
		/>
	)
}
