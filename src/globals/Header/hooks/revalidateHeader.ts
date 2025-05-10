import { revalidateTag } from 'next/cache'
import type { GlobalAfterChangeHook } from 'payload'

import { HeaderGlobalConf } from '../config'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
	if (!context.disableRevalidate) {
		payload.logger.info(`Revalidating header`)

		revalidateTag(`global_${HeaderGlobalConf.slug}`)
	}

	return doc
}
