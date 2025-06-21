import { CollectionBeforeChangeHook } from 'payload'

import { Order } from '@/payload-types'

export const removeVirtualFields: CollectionBeforeChangeHook<Order> = ({ data }) => {
	const typedData = data as Partial<Order>
	delete typedData.cart?.prices
	for (const product of typedData.cart?.products ?? []) {
		delete product.previewPrice
		delete product.previewTotal
	}
	return data
}
