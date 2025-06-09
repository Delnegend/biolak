import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import React from 'react'

import type { Post } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { LatestPostsBlock } from '../LatestPosts/Component'

export type RelatedPostsProps = {
	className?: string
	docs?: Post[]
	introContent?: SerializedEditorState
}

export async function RelatedPosts(props: RelatedPostsProps): Promise<React.JSX.Element> {
	const locale = await getClientLang()

	return (
		<LatestPostsBlock
			posts={props.docs ?? []}
			blockType="latestPosts"
			title={matchLang({
				[Lang.English]: 'Related Posts',
				[Lang.Vietnamese]: 'Bài viết liên quan',
			})(locale)}
		/>
	)
}
