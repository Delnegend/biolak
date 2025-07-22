import config from '@payload-config'
import { getPayload } from 'payload'

import { InfiniteScrollBlockProps } from '@/payload-types'
import { cnsoleBuilder } from '@/utilities/cnsole'
import { depthHandler } from '@/utilities/depthHandler'
import { Lang } from '@/utilities/lang'

import { INTERNAL_InfiniteScrollBlock } from './Component.client'

const cnsole = cnsoleBuilder('blocks/InfiniteScroll')

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
	if (!ok) cnsole.error("Can't fetching graphic:", error)

	return (
		<INTERNAL_InfiniteScrollBlock
			graphic={graphic_}
			animationDuration={animationDuration ?? 10}
			locale={__locale}
		/>
	)
}
