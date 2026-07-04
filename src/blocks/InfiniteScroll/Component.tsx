import config from '@payload-config'
import { getPayload } from 'payload'

import { Lang } from '@/i18n/routing'
import { InfiniteScrollBlockProps } from '@/payload-types'
import { depthHandler } from '@/utilities/depthHandler'
import { newLogger } from '@/utilities/logger'

import { INTERNAL_InfiniteScrollBlock } from './Component.client'

const logger = newLogger('blocks/InfiniteScroll')

export async function InfiniteScrollBlock({
	graphic,
	animationDuration,
	__locale,
}: InfiniteScrollBlockProps & {
	__locale: Lang
}): Promise<React.JSX.Element> {
	const {
		data: graphic_,
		ok,
		error,
	} = await depthHandler({
		data: graphic,
		fetch: async (id) => {
			const result = await (
				await getPayload({ config })
			).findByID({
				collection: 'media',
				id,
			})
			return result
		},
	})
	if (!ok) logger.error("Can't fetching graphic:", error)

	return (
		<INTERNAL_InfiniteScrollBlock
			graphic={graphic_}
			animationDuration={animationDuration ?? 10}
			locale={__locale}
		/>
	)
}
