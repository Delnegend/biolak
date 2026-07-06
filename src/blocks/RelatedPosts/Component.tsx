import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { getTranslations } from 'next-intl/server'

import { Lang } from '@/i18n/routing'
import type { Post } from '@/payload-types'

import { LatestPostsBlock } from '../LatestPosts/Component'

export type RelatedPostsProps = {
	className?: string
	docs?: Post[]
	introContent?: SerializedEditorState
}

export async function RelatedPosts(
	props: RelatedPostsProps & {
		locale: Lang
	},
): Promise<React.JSX.Element> {
	const t = await getTranslations({ locale: props.locale, namespace: 'blocks.relatedPosts' })
	return (
		<LatestPostsBlock
			posts={props.docs ?? []}
			blockType="latestPosts"
			title={t('title')}
			locale={props.locale}
		/>
	)
}
