import { Phudu } from 'next/font/google'
import React from 'react'

import type { Post } from '@/payload-types'
import { cn } from '@/utilities/ui'

const phudu = Phudu({
	subsets: ['vietnamese'],
	weight: ['600'],
})

export function PostHero({ post: p }: { post: Post }): React.JSX.Element {
	// const hasAuthors =
	// 	p.populatedAuthors &&
	// 	p.populatedAuthors.length > 0 &&
	// 	formatAuthors(p.populatedAuthors) !== ''

	return (
		<div className="safe-width mt-14 text-primary">
			<div className={cn('mb-7 text-2xl font-medium', phudu.className)}>BÀI VIẾT</div>
			<h1 className="max-w-[30rem] text-balance">{p.title}</h1>
		</div>
	)
}
