import Image from 'next/image'
import Link from 'next/link'

import { Post } from '@/payload-types'

export function PostCard({ post }: { post: Post }): React.JSX.Element {
	const img = post.heroImage && typeof post.heroImage === 'object' ? post.heroImage : null

	const author = typeof post.authors?.[0] === 'object' ? post.authors[0] : null
	const lastModified = typeof post.updatedAt === 'string' ? new Date(post.updatedAt) : new Date()
	const lastModifiedStr = `${lastModified.getDate().toString().padStart(2, '0')}.${lastModified.getMonth().toString().padStart(2, '0')}.${lastModified.getFullYear().toString().slice(2)}`

	return (
		<div className="max-w-[25rem]">
			<Link href={`/post/${post.slug}`}>
				<Image
					src={img?.url || 'https://placehold.co/460x400'}
					alt={img?.alt || ''}
					width={img?.width || 0}
					height={img?.height || 0}
					className="h-[25rem] w-[28.75rem] rounded-[0.5rem] object-cover"
					unoptimized={!img}
				/>
			</Link>

			<div className="my-6 text-primary">
				<div className="text-[0.625rem] font-medium">
					{author?.name ?? 'BioLAK'}
					&nbsp;|&nbsp;
					<span className="text-[#e7b27e]">{lastModifiedStr}</span>
				</div>

				<Link href={`/post/${post.slug}`}>
					<div className="my-1 font-serif text-2xl font-bold leading-6">
						{post.title}&nbsp;→
					</div>
				</Link>

				<div className="text-xs">
					{post.meta?.description ??
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in nisl aliquam, pharetra diam consequat, tincidunt nibh.'}
				</div>
			</div>
		</div>
	)
}
