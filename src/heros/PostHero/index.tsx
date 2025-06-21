import { Phudu } from 'next/font/google'
import React from 'react'

import type { Post } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLocale'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

const phudu = Phudu({
	subsets: ['vietnamese'],
	weight: ['600'],
})

export async function PostHero({ post: p }: { post: Post }): Promise<React.JSX.Element> {
	const locale = await getClientLang()
	// const hasAuthors =
	// 	p.populatedAuthors &&
	// 	p.populatedAuthors.length > 0 &&
	// 	formatAuthors(p.populatedAuthors) !== ''

	return (
		<div className="safe-width mt-14 text-primary">
			<div className={cn('mb-7 text-2xl font-medium uppercase', phudu.className)}>
				{matchLang({
					[Lang.English]: 'Post',
					[Lang.Vietnamese]: 'Bài viết',
				})(locale)}
			</div>
			<h1 className="max-w-[30rem] text-balance">{p.title}</h1>
		</div>
	)
}
