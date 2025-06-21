import { CollectionAfterChangeHook } from 'payload'

import { Order } from '@/payload-types'

export const checkPaidInFull: CollectionAfterChangeHook<Order> = async ({ doc, operation }) => {
	if (operation !== 'update') return doc
	const typedDoc = doc as Partial<Order>
	if (typedDoc.billing?.method !== 'bankTransfer') return doc

	const billing = typedDoc.cart?.prices?.total ?? 0
	const paid = typedDoc.billing?.transactionInfo?.transferAmount ?? 0
	typedDoc.billing.paidInFull = billing <= paid

	return typedDoc
}
