import { ProductsSlug } from '@/collections/Products/slug'
import { HeadlessImage } from '@/components/Media/HeadlessImage'
import RichText from '@/components/RichText'
import { HowToUseProductBlockProps, Product } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { HowToUseProductBlockDefaults as defaults } from './defaults'

export function HowToUseProductBlock(
	props: HowToUseProductBlockProps & {
		__product?: Product | null
		__locale?: Lang
	},
): React.JSX.Element {
	const p =
		typeof props[ProductsSlug] === 'object' && !!props[ProductsSlug]
			? props[ProductsSlug]
			: props?.__product

	const subtitle =
		props.subtitle ??
		[
			p?.productCategories?.[0] && typeof p.productCategories[0] === 'object'
				? p.productCategories[0].title
				: null,
			p?.productSubCategories?.[0] && typeof p.productSubCategories[0] === 'object'
				? p.productSubCategories[0].title
				: null,
			p?.title,
		]
			.filter(Boolean)
			.join(' • ')

	return (
		<div className="md:relative md:grid md:min-h-[50dvw] md:grid-cols-[2fr_3fr] lg:grid-cols-2">
			<div className="max-md:hidden" />
			<div className="md:absolute md:inset-0 md:z-0">
				<HeadlessImage
					media={props.image}
					alt={matchLang({
						[Lang.English]: 'How to use product background image',
						[Lang.Vietnamese]: 'Hình nền hướng dẫn sử dụng sản phẩm',
					})(props.__locale)}
					placeholder={{ width: 1000, height: 1000 }}
					className="h-full overflow-hidden object-cover max-md:w-full md:w-2/5 lg:w-1/2"
				/>
			</div>
			<div className="flex size-full flex-col justify-center px-4 py-6 text-primary md:p-20 lg:p-28">
				{!!subtitle && <div className="text-xl font-medium">{subtitle}</div>}
				<div className="mb-4 mt-1 font-serif text-5xl font-medium">
					{props.title ?? defaults.title(props.__locale)}
				</div>
				<RichText className="compact mx-0" data={props.content} enableGutter={false} />
			</div>
		</div>
	)
}
