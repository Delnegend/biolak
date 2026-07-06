import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Fragment, type JSX } from 'react'

import { Lang } from '@/i18n/routing'
import type { HeaderGlobal } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { INTERNAL_CloseSmallNavWrapper } from './CloseSmallNavWrapper.client'
import { NavItems } from './NavItems'

export async function INTERNAL_RenderNavItems({
	items,
	locale,
	size,
	className,
}: {
	items: HeaderGlobal['headerItemsLeft'] | HeaderGlobal['headerItemsRight']
	locale: Lang
	size: 'lg' | 'sm'
	className?: string
}): Promise<JSX.Element> {
	const t = await getTranslations('globals.header.nav')
	return (
		<nav className={cn('flex items-center gap-9 text-xl max-md:flex-col', className)}>
			{items?.map((item, index) => {
				const makeKey = (): string => {
					if (item.kind === 'prebuilt')
						return `prebuilt-${item.prebuilt}-${item.label ?? ''}`
					if (item.kind === 'internalUrl') {
						const doc =
							typeof item.internalUrl?.value === 'object'
								? item.internalUrl?.value
								: null
						return `internal-${item.internalUrl?.relationTo}-${doc?.slug ?? ''}`
					}
					if (item.kind === 'customUrl') return `custom-${item.customUrl ?? ''}`
					return `item-${index}`
				}

				const key = makeKey()

				switch (item.kind) {
					case 'prebuilt': {
						if (!item.prebuilt) return null
						const Elem = NavItems[item.prebuilt]
						return Elem ? (
							<Fragment key={key}>
								<Elem label={item.label ?? undefined} locale={locale} size={size} />
							</Fragment>
						) : null
					}
					case 'internalUrl': {
						const doc =
							typeof item.internalUrl?.value === 'object'
								? item.internalUrl?.value
								: null

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
							<Fragment key={key}>
								<INTERNAL_CloseSmallNavWrapper asChild>
									<Link href={url ?? '#'} className="whitespace-nowrap">
										{item.label ?? doc?.title ?? t('internalLink')}
									</Link>
								</INTERNAL_CloseSmallNavWrapper>
							</Fragment>
						) : null
					}
					case 'customUrl': {
						return (
							<Fragment key={key}>
								<INTERNAL_CloseSmallNavWrapper asChild>
									<Link
										href={item.customUrl ?? '#'}
										target="_blank"
										rel="noopener noreferrer"
										className="whitespace-nowrap"
									>
										{item.label ??
											item.customUrl?.replaceAll(/https?:\/\//, '') ??
											t('externalLink')}
									</Link>
								</INTERNAL_CloseSmallNavWrapper>
							</Fragment>
						)
					}
				}
			})}
		</nav>
	)
}
