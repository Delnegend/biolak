import { revalidateTag } from 'next/cache'
import type { GlobalAfterChangeHook } from 'payload'

import { Header } from '../config'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
	if (!context.disableRevalidate) {
		payload.logger.info(`Revalidating header`)

		revalidateTag(`global_${Header.slug}`)
	}

	return doc
}
