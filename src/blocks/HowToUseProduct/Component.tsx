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
		<div className="relative grid min-h-[50dvw] grid-cols-2">
			<div />
			<div className="absolute inset-0 z-0">
				<HeadlessImage
					media={props.image}
					alt={matchLang({
						[Lang.English]: 'How to use product background image',
						[Lang.Vietnamese]: 'Hình nền hướng dẫn sử dụng sản phẩm',
					})(props.__locale)}
					placeholder={{ width: 1000, height: 1000 }}
					className="h-full w-1/2 overflow-hidden object-cover"
				/>
			</div>
			<div className='text-primary" flex size-full flex-col justify-center p-[7rem]'>
				{!!subtitle && <div className="text-xl font-medium">{subtitle}</div>}
				<div className="mb-4 mt-1 font-serif text-5xl font-medium">
					{props.title ?? defaults.title(props.__locale)}
				</div>
				<RichText className="compact" data={props.content} enableGutter={false} />
			</div>
		</div>
	)
}
