'use client'
import Link from 'next/link'
import React, { Fragment } from 'react'

import { Media } from '@/components/Media'
import type { Post } from '@/payload-types'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'

export type CardPostData = Pick<Post, 'slug' | 'postCategories' | 'meta' | 'title'>

export function Card(props: {
	alignItems?: 'center'
	className?: string
	doc?: CardPostData
	relationTo?: 'posts'
	showCategories?: boolean
	title?: string
}): React.JSX.Element {
	const { card, link } = useClickableCard({})
	// const { className, doc, relationTo, showCategories, title: titleFromProps } = props

	// const { slug, postCategories, meta, title } = doc || {}
	// const { description, image: metaImage } = meta || {}

	const hasCategories =
		props.doc?.postCategories &&
		Array.isArray(props.doc.postCategories) &&
		props.doc.postCategories.length > 0
	const titleToUse = props.title || props.doc?.title
	const sanitizedDescription = props.doc?.meta?.meta?.description?.replace(/\s/g, ' ') // replace non-breaking space with white space
	const href = `/${props.relationTo}/${props.doc?.slug}`

	return (
		<article
			className={cn(
				'overflow-hidden rounded-lg border border-border bg-card hover:cursor-pointer',
				props.className,
			)}
			ref={card.ref}
		>
			<div className="relative w-full">
				{!props.doc?.meta?.meta?.image && <div className="">No image</div>}
				{props.doc?.meta?.meta?.image && typeof props.doc?.meta?.meta?.image !== 'string' && (
					<Media resource={props.doc?.meta?.meta?.image} size="33vw" />
				)}
			</div>
			<div className="p-4">
				{props.showCategories && hasCategories && (
					<div className="mb-4 text-sm uppercase">
						{props.showCategories && hasCategories && (
							<div>
								{props.doc?.postCategories?.map((category, index) => {
									if (typeof category === 'object') {
										const { title: titleFromCategory } = category

										const categoryTitle = titleFromCategory || 'Untitled category'

										const isLast = index === (props.doc?.postCategories?.length ?? 0) - 1

										return (
											<Fragment key={index}>
												{categoryTitle}
												{!isLast && <Fragment>, &nbsp;</Fragment>}
											</Fragment>
										)
									}

									return null
								})}
							</div>
						)}
					</div>
				)}
				{titleToUse && (
					<div className="prose">
						<h3>
							<Link className="not-prose" href={href} ref={link.ref}>
								{titleToUse}
							</Link>
						</h3>
					</div>
				)}
				{props.doc?.meta?.meta?.description && (
					<div className="mt-2">
						{props.doc.meta.meta.description && <p>{sanitizedDescription}</p>}
					</div>
				)}
			</div>
		</article>
	)
}
