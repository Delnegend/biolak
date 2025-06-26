import { revalidateTag } from 'next/cache'
import { GlobalAfterChangeHook } from 'payload'

import { HeaderGlobalSlug } from '../slug'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
	if (!context.disableRevalidate) {
		payload.logger.info(`Revalidating header`)

		revalidateTag(HeaderGlobalSlug)
	}

	return doc
}
