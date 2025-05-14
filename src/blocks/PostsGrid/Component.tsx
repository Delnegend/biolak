import { PostCard } from '@/components/PostCard'
import { PostsGridBlockProps } from '@/payload-types'

export function PostsGridBlock(props: PostsGridBlockProps): React.JSX.Element {
	const posts = props.posts?.filter((post) => typeof post === 'object') ?? []

	return (
		<div className="safe-width my-20 flex flex-row flex-wrap justify-center gap-x-10">
			{posts.map((p) => {
				return <PostCard key={p.slug} post={p} />
			})}
		</div>
	)
}
