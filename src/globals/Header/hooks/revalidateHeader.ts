import { revalidateTag } from 'next/cache'
import { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

import { HeaderGlobalSlug } from '../slug'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
	if (!context.disableRevalidate) {
		payload.logger.info(`Revalidating header`)

		revalidateTag(HeaderGlobalSlug)
	}

	return doc
}

export const revalidateHeaderForCollection: CollectionAfterChangeHook = async ({
	doc,
	req: { payload, context },
}) => {
	if (!context.disableRevalidate) {
		payload.logger.info(`Revalidating header for collection change`)

		revalidateTag(HeaderGlobalSlug)
	}

	return doc
}
