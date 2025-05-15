import config from '@payload-config'
import { getPayload } from 'payload'

import { PostCategoriesSlug } from '@/collections/PostCategories/slug'
import { PostsSlug } from '@/collections/Posts/slug'
import { PostCard } from '@/components/PostCard'
import { PostsGridBlockProps } from '@/payload-types'

export async function PostsGridBlock(props: PostsGridBlockProps): Promise<React.JSX.Element> {
	const payload = await getPayload({ config })
	const posts = await payload.find({
		collection: PostsSlug,
		where: {
			[`${PostCategoriesSlug}.slug`]: {
				equals: typeof props.postCategories === 'object' ? props.postCategories?.slug : '',
			},
		},
	})

	return (
		<div className="safe-width my-20 flex flex-row flex-wrap justify-center gap-x-10">
			{posts.docs.map((p) => {
				return <PostCard key={p.slug} post={p} />
			})}
		</div>
	)
}
