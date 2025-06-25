import { revalidateTag } from 'next/cache'
import { GlobalAfterChangeHook } from 'payload'

import { PaymentGlobalSlug } from '../slug'

export const revalidatePayment: GlobalAfterChangeHook = async ({
	doc,
	req: { payload, context },
}) => {
	if (!context.disableRevalidate) {
		payload.logger.info(`Revalidating payment`)

		revalidateTag(PaymentGlobalSlug)
	}

	return doc
}
