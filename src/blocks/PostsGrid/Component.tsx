import config from '@payload-config'
import { getPayload } from 'payload'

import { PostCategoriesSlug } from '@/collections/PostCategories/slug'
import { PostsSlug } from '@/collections/Posts/slug'
import { PostCard } from '@/components/PostCard'
import { PostCategory, PostsGridBlockProps } from '@/payload-types'
import { depthHandler } from '@/utilities/depthHandler'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export async function PostsGridBlock(
	props: PostsGridBlockProps & {
		__postCategory?: PostCategory
		__locale: Lang
	},
): Promise<React.JSX.Element> {
	const payload = await getPayload({ config })
	const posts = await payload.find({
		collection: PostsSlug,
		where: {
			[PostCategoriesSlug]: {
				equals:
					props.__postCategory?.id ??
					(typeof props.postCategories === 'number'
						? props.postCategories
						: props.postCategories?.id),
			},
		},
		pagination: false,
		limit: 1000,
	})

	return (
		<div className="safe-width my-[2.5rem] flex flex-col gap-y-6 md:my-20 md:gap-y-16">
			{props.showTitle && (
				<h1 className="!max-md:text-[2.5rem]">
					{props.__postCategory?.title ??
						(await (async () => {
							const { data, ok, error } = await depthHandler({
								data: props.postCategories,
								fetch: (id) =>
									payload.findByID({
										collection: PostCategoriesSlug,
										id,
										select: {
											title: true,
										},
									}),
							})

							if (!ok) {
								console.error(
									"[Blocks/PostsGrid] Error fetching post category's name:",
									error,
								)
							}

							return (
								data?.title ??
								matchLang({
									[Lang.English]: 'Category',
									[Lang.Vietnamese]: 'Danh mục',
								})(props.__locale)
							)
						})())}
				</h1>
			)}
			<div className="flex flex-row flex-wrap justify-center gap-x-10">
				{posts.docs.map((p) => {
					return <PostCard key={p.slug} post={p} />
				})}
			</div>
		</div>
	)
}
