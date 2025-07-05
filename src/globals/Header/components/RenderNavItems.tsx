import Link from 'next/link'

import type { HeaderGlobal } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { cn } from '@/utilities/ui'

import { INTERNAL_CloseSmallNavWrapper } from './CloseSmallNavWrapper.client'
import { NavItems } from './NavItems'

export function INTERNAL_RenderNavItems({
	items,
	locale,
	size,
	className,
}: {
	items: HeaderGlobal['headerItemsLeft'] | HeaderGlobal['headerItemsRight']
	locale: Lang
	size: 'lg' | 'sm'
	className?: string
}): React.JSX.Element {
	return (
		<nav className={cn('flex items-center gap-9 text-xl max-md:flex-col', className)}>
			{items?.map((item, index) => {
				switch (item.kind) {
					case 'prebuilt': {
						if (!item.prebuilt) return null
						const Elem = NavItems[item.prebuilt]
						return Elem ? (
							<Elem
								key={`header-left-${index}`}
								label={item.label ?? undefined}
								locale={locale}
								size={size}
							/>
						) : null
					}
					case 'internalUrl': {
						const doc =
							typeof item.internalUrl?.value === 'object' ? item.internalUrl?.value : null

						let url
						switch (item.internalUrl?.relationTo) {
							case 'pages':
								url = `/${doc?.slug}`
								break
							case 'posts':
								url = `/post/${doc?.slug}`
								break
							case 'postCategories':
								url = `/posts/${doc?.slug}`
								break
							case 'products':
								url = `/product/${doc?.slug}`
								break
							case 'productCategories':
								url = `/products/${doc?.slug}`
								break
							case 'productSubCategories':
								url = `/products/${doc?.slug}`
								break
						}

						return item.internalUrl?.value ? (
							<INTERNAL_CloseSmallNavWrapper asChild key={`header-left-${index}`}>
								<Link href={url ?? '#'}>
									{item.label ??
										doc?.title ??
										matchLang({
											[Lang.English]: 'Internal link',
											[Lang.Vietnamese]: 'Liên kết nội bộ',
										})(locale)}
								</Link>
							</INTERNAL_CloseSmallNavWrapper>
						) : null
					}
					case 'customUrl': {
						return (
							<INTERNAL_CloseSmallNavWrapper asChild key={`header-left-${index}`}>
								<Link
									href={item.customUrl ?? '#'}
									target="_blank"
									rel="noopener noreferrer"
								>
									{item.label ??
										item.customUrl?.replaceAll(/https?:\/\//, '') ??
										matchLang({
											[Lang.English]: 'External link',
											[Lang.Vietnamese]: 'Liên kết ngoài',
										})(locale)}
								</Link>
							</INTERNAL_CloseSmallNavWrapper>
						)
					}
				}
			})}
		</nav>
	)
}
