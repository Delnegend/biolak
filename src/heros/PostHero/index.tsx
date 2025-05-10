import React from 'react'
import { formatDateTime } from 'src/utilities/formatDateTime'

import { Media } from '@/components/Media'
import type { Post } from '@/payload-types'
import { formatAuthors } from '@/utilities/formatAuthors'

export function PostHero({ post: p }: { post: Post }): React.JSX.Element {
	const hasAuthors =
		p.populatedAuthors &&
		p.populatedAuthors.length > 0 &&
		formatAuthors(p.populatedAuthors) !== ''

	return (
		<div className="relative -mt-[10.4rem] flex items-end">
			<div className="container relative z-10 pb-8 text-white lg:grid lg:grid-cols-[1fr_48rem_1fr]">
				<div className="col-span-1 col-start-1 md:col-span-2 md:col-start-2">
					<div className="mb-6 text-sm uppercase">
						{p.postCategories?.map((category, index) => {
							if (typeof category === 'object' && category !== null) {
								const { title: categoryTitle } = category

								const titleToUse = categoryTitle || 'Untitled category'

								const isLast = index === (p?.postCategories?.length ?? 0) - 1

								return (
									<React.Fragment key={index}>
										{titleToUse}
										{!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
									</React.Fragment>
								)
							}
							return null
						})}
					</div>

					<div className="">
						<h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{p.title}</h1>
					</div>

					<div className="flex flex-col gap-4 md:flex-row md:gap-16">
						{hasAuthors && (
							<div className="flex flex-col gap-4">
								<div className="flex flex-col gap-1">
									<p className="text-sm">Author</p>

									<p>{formatAuthors(p.populatedAuthors!)}</p>
								</div>
							</div>
						)}
						{p.publishedAt && (
							<div className="flex flex-col gap-1">
								<p className="text-sm">Date Published</p>
								<time dateTime={p.publishedAt}>{formatDateTime(p.publishedAt)}</time>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="min-h-[80vh] select-none">
				{p.heroImage && typeof p.heroImage !== 'string' && (
					<Media fill priority imgClassName="-z-10 object-cover" resource={p.heroImage} />
				)}
				<div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black to-transparent" />
			</div>
		</div>
	)
}
