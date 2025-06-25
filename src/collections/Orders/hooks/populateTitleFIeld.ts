import { CollectionAfterReadHook } from 'payload'

import { CustomersSlug } from '@/collections/Customers/slug'
import { Order } from '@/payload-types'
import { depthHandler } from '@/utilities/depthHandler'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const populateTitleField: CollectionAfterReadHook<Order> = async ({
	doc,
	req: { payload, ...req },
}) => {
	const customer = await depthHandler({
		data: doc.customer,
		fetch: (id) =>
			payload.findByID({
				collection: CustomersSlug,
				id,
				select: {
					name: true,
				},
			}),
	})

	doc.title =
		customer.data?.name ??
		matchLang({
			[Lang.English]: 'Unknown Customer',
			[Lang.Vietnamese]: 'Khách hàng không xác định',
		})(req.locale === Lang.English ? Lang.English : Lang.Vietnamese)
}
