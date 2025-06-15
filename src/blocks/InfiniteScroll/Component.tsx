import { InfiniteScrollBlockProps } from '@/payload-types'
import { Lang } from '@/utilities/lang'

import { InfiniteScrollBlockCC } from './Component.client'

export function InfiniteScrollBlock({
	graphic,
	animationDuration,
	__locale,
}: InfiniteScrollBlockProps & {
	__locale?: Lang
}): React.JSX.Element {
	if (typeof graphic === 'number') {
		return <></>
	}

	return (
		<InfiniteScrollBlockCC
			graphic={graphic}
			animationDuration={animationDuration ?? 10}
			locale={__locale}
		/>
	)
}
