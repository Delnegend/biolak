import { CollectionBeforeChangeHook } from 'payload'

import { Order } from '@/payload-types'

export const removeVirtualFields: CollectionBeforeChangeHook<Order> = ({ data }) => {
	delete data.cart?.prices
	for (const product of data.cart?.products ?? []) {
		delete product.previewPrice
		delete product.previewTotal
	}
	return data
}
