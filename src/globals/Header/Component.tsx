import { Menu, SearchIcon } from 'lucide-react'
import Link from 'next/link'

import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import type { HeaderGlobal } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLocale'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import { ContactFormGlobalComponent } from '../ContactForm/Component'
import { INTERNAL_CartSidebar } from './components/CartSidebar.client'
import { INTERNAL_LanguageSwitcher } from './components/LanguageSwitcher.client'
import { INTERNAL_ProductsDropdown } from './components/ProductsDropdown'
import { HeaderGlobalSlug } from './slug'

const prebuilds: Record<
	NonNullable<
		NonNullable<
			HeaderGlobal['headerItemsLeft'] | HeaderGlobal['headerItemsRight']
		>[number]['prebuilt']
	>,
	(props: {
		label?: string
		locale: Lang
		size?: 'lg' | 'sm'
	}) => React.JSX.Element | Promise<React.JSX.Element>
> = {
	search: ({ label, locale }) => (
		<Link href="#" className="flex size-7 items-center justify-center">
			<span className="sr-only">
				{label ??
					matchLang({
						[Lang.English]: 'Search',
						[Lang.Vietnamese]: 'Tìm kiếm',
					})(locale)}
			</span>
			<SearchIcon className="w-5 scale-110 text-primary" size={30} />
		</Link>
	),
	products: INTERNAL_ProductsDropdown,
	about: ({ label }) => <Link href="/about">{label ?? 'BioLAK'}</Link>,
	contact: ({ label, locale }) => (
		<Dialog>
			<DialogTrigger>
				<div>
					{label ??
						matchLang({
							[Lang.English]: 'Contacts',
							[Lang.Vietnamese]: 'Liên hệ',
						})(locale)}
				</div>
			</DialogTrigger>
			<DialogContent className="min-w-[932px] overflow-hidden !rounded-2xl bg-primary-foreground p-12">
				<ContactFormGlobalComponent inDialog={true} />
			</DialogContent>
		</Dialog>
	),
	'vie-en': ({ label, locale }) => <INTERNAL_LanguageSwitcher label={label} locale={locale} />,
	cart: (props) => <INTERNAL_CartSidebar {...props} />,
}

export async function HeaderGlobalComponent() {
	const locale = await getClientLang()
	const global = await getCachedGlobal<HeaderGlobal>(HeaderGlobalSlug, 1, locale)()

	function RenderNav({
		props,
	}: {
		props: HeaderGlobal['headerItemsLeft'] | HeaderGlobal['headerItemsRight']
	}): React.JSX.Element {
		return (
			<nav className="flex items-center gap-9 text-xl">
				{props?.map((item, index) => {
					switch (item.kind) {
						case 'prebuilt': {
							if (!item.prebuilt) return null
							const Elem = prebuilds[item.prebuilt]
							return Elem ? (
								<Elem
									key={`header-left-${index}`}
									label={item.label ?? undefined}
									locale={locale}
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
								<Link key={`header-left-${index}`} href={url ?? '#'}>
									{item.label ??
										doc?.title ??
										matchLang({
											[Lang.English]: 'Internal link',
											[Lang.Vietnamese]: 'Liên kết nội bộ',
										})(locale)}
								</Link>
							) : null
						}
						case 'customUrl': {
							return (
								<Link
									key={`header-left-${index}`}
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
							)
						}
					}
				})}
			</nav>
		)
	}

	return (
		<header className="sticky top-0 z-20 flex h-20 w-full items-center bg-primary-foreground px-4 lg:px-10">
			{/* large navbar */}
			<div className="grid w-full grid-cols-[1fr_auto_1fr] max-lg:hidden">
				<nav className="flex items-center gap-9 text-xl">
					<RenderNav props={global?.headerItemsLeft ?? []} />
				</nav>

				<Link href="/home">
					<HeadlessImage
						media={global.logo}
						placeholder={{ width: 96, height: 50 }}
						alt={matchLang({
							[Lang.English]: 'BioLAK Logo',
							[Lang.Vietnamese]: 'Logo BioLAK',
						})(locale)}
					/>
				</Link>

				<nav className="flex items-center justify-end gap-9 text-xl">
					<RenderNav props={global?.headerItemsRight ?? []} />
				</nav>
			</div>

			{/* small navbar */}
			<div className="grid w-full grid-cols-3 items-center lg:hidden">
				<Button variant="outline" hideArrow className="size-14 border-transparent p-0">
					<Menu className="text-primary" />
				</Button>
				<HeadlessImage
					media={global.logo}
					placeholder={{ width: 96, height: 50 }}
					alt={matchLang({
						[Lang.English]: 'BioLAK Logo',
						[Lang.Vietnamese]: 'Logo BioLAK',
					})(locale)}
					className="h-10 w-auto place-self-center"
				/>
				<span className="place-self-end">{prebuilds.cart({ locale, size: 'sm' })}</span>
			</div>
		</header>
	)
}
