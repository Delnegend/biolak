import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import clsx from 'clsx'
import React from 'react'

import RichText from '@/components/RichText'
import type { Post } from '@/payload-types'

import { Card } from '../../components/Card'

export type RelatedPostsProps = {
	className?: string
	docs?: Post[]
	introContent?: SerializedEditorState
}

export function RelatedPosts(props: RelatedPostsProps): React.JSX.Element {
	return (
		<div className={clsx('lg:container', props.className)}>
			{props.introContent && <RichText data={props.introContent} enableGutter={false} />}

			<div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-8">
				{props.docs?.map((doc, index) => {
					if (typeof doc === 'string') return null

					return <Card key={index} doc={doc} relationTo="posts" showCategories />
				})}
			</div>
		</div>
	)
}
