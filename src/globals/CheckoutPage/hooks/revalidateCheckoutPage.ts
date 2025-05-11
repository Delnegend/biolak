import { revalidateTag } from 'next/cache'
import type { GlobalAfterChangeHook } from 'payload'

import { CheckoutPageGlobalConf } from '../config'

export const revalidateCheckoutPage: GlobalAfterChangeHook = ({
	doc,
	req: { payload, context },
}) => {
	if (!context.disableRevalidate) {
		payload.logger.info(`Revalidating checkout page labels`)

		revalidateTag(`global_${CheckoutPageGlobalConf.slug}`)
	}

	return doc
}
