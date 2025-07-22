import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import React from 'react'

import type { Post } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { LatestPostsBlock } from '../LatestPosts/Component'

export type RelatedPostsProps = {
	className?: string
	docs?: Post[]
	introContent?: SerializedEditorState
}

export function RelatedPosts(
	props: RelatedPostsProps & {
		__locale: Lang
	},
): React.JSX.Element {
	return (
		<LatestPostsBlock
			posts={props.docs ?? []}
			blockType="latestPosts"
			title={matchLang({
				[Lang.English]: 'Related Posts',
				[Lang.Vietnamese]: 'Bài viết liên quan',
			})(props.__locale)}
			__locale={props.__locale}
		/>
	)
}
