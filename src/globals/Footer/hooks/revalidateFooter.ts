import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'
import { Footer } from '../config'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
	if (!context.disableRevalidate) {
		payload.logger.info(`Revalidating footer`)

		revalidateTag(`global_${Footer.slug}`)
	}

	return doc
}
