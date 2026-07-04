'use client'

import { useTranslations } from 'next-intl'

export function PaymentQR({
	amount,
	invoiceId,
	bankName,
	bankAccountNumber,
}: {
	amount: number
	invoiceId: string
	bankName: string
	bankAccountNumber: string
}): React.JSX.Element {
	const t = useTranslations('globals.checkout')
	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={`https://qr.sepay.vn/img?acc=${bankAccountNumber}&bank=${bankName}&amount=${amount}&des=blck-${invoiceId}&download=true`}
			alt={t('qrAlt')}
		/>
	)
}
