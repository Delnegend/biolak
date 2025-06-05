import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const LatestPostsBlockDefaults = {
	/** `Bài viết mới nhất` */
	title: matchLang({
		[Lang.English]: 'Latest posts',
		[Lang.Vietnamese]: 'Bài viết mới nhất',
	}),
	/** `TẤT CẢ BÀI VIẾT` */
	buttonLabel: matchLang({
		[Lang.English]: 'ALL POSTS',
		[Lang.Vietnamese]: 'TẤT CẢ BÀI VIẾT',
	}),
} as const
