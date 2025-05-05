import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { CollectionArchive } from '@/components/CollectionArchive'
import RichText from '@/components/RichText'
import type { ArchiveBlockProps, Post } from '@/payload-types'

export async function ArchiveBlock(props: ArchiveBlockProps): Promise<React.JSX.Element> {
	const limit = props.limit || 3

	let posts: Post[] = []

	if (props.populateBy === 'collection') {
		const payload = await getPayload({ config: configPromise })

		const flattenedCategories = props.postCategories?.map((category) => {
			if (typeof category === 'object') return category.id
			else return category
		})

		const fetchedPosts = await payload.find({
			collection: 'posts',
			depth: 1,
			limit,
			...(flattenedCategories && flattenedCategories.length > 0
				? {
						where: {
							categories: {
								in: flattenedCategories,
							},
						},
					}
				: {}),
		})

		posts = fetchedPosts.docs
	} else {
		if (props.selectedDocs?.length) {
			const filteredSelectedPosts = props.selectedDocs.map((post) => {
				if (typeof post.value === 'object') return post.value
			}) as Post[]

			posts = filteredSelectedPosts
		}
	}

	return (
		<div className="my-16" id={`block-${props.id}`}>
			{props.introContent && (
				<div className="container mb-16">
					<RichText
						className="ms-0 max-w-[48rem]"
						data={props.introContent}
						enableGutter={false}
					/>
				</div>
			)}
			<CollectionArchive posts={posts} />
		</div>
	)
}
