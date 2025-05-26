import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import type { HeaderGlobal } from '@/payload-types'
import { getClientLang } from '@/utilities/getClientLang'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

import biolakIcon from '../../../public/biolak-logo.svg'
import { ContactFormGlobalComponent } from '../ContactForm/Component'
import { INTERNAL_LanguageSwitcher } from './components/LanguageSwitcher.client'
import { INTERNAL_ProductsDropdown } from './components/ProductsDropdown'
import { HeaderGlobalSlug } from './config'

const prebuilds: Record<
	NonNullable<
		NonNullable<
			HeaderGlobal['headerItemsLeft'] | HeaderGlobal['headerItemsRight']
		>[number]['prebuilt']
	>,
	(props: { label?: string; locale: Lang }) => React.JSX.Element | Promise<React.JSX.Element>
> = {
	search: ({ label, locale }) => (
		<Link href="#" className="flex size-7 items-center justify-center">
			<span className="sr-only">
				{label ??
					matchLang({
						[Lang.English]: 'Search',
						[Lang.Vietnamese]: 'Tìm kiếm',
					})({ locale })}
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
						})({ locale })}
				</div>
			</DialogTrigger>
			<DialogContent className="min-w-[932px] overflow-hidden !rounded-2xl bg-primary-foreground p-12">
				<ContactFormGlobalComponent inDialog={true} />
			</DialogContent>
		</Dialog>
	),
	'vie-en': ({ label }) => <INTERNAL_LanguageSwitcher label={label} />,
	cart: ({ label, locale }) => (
		<Button
			variant="default"
			className="relative h-14 rounded-full bg-primary px-6 !font-sans text-xl font-medium"
			hideArrow={true}
		>
			{label ?? matchLang({ [Lang.English]: 'Cart', [Lang.Vietnamese]: 'Giỏ hàng' })({ locale })}
			<div className="absolute -top-2 right-0 flex aspect-square size-7 items-center justify-center overflow-hidden rounded-full bg-[#FF8200] text-base text-primary">
				10
			</div>
		</Button>
	),
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
										})({ locale })}
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
										})({ locale })}
								</Link>
							)
						}
					}
				})}
			</nav>
		)
	}

	return (
		<header className="relative z-20 flex h-20 w-full items-center bg-primary-foreground px-10">
			<div className="grid w-full grid-cols-[1fr_auto_1fr]">
				<nav className="flex items-center gap-9 text-xl">
					<RenderNav props={global?.headerItemsLeft ?? []} />
				</nav>

				<Link href="/home">
					<Image priority src={biolakIcon} alt="BioLAK Logo" className="h-12" />
				</Link>

				<nav className="flex items-center justify-end gap-9 text-xl">
					<RenderNav props={global?.headerItemsRight ?? []} />
				</nav>
			</div>
		</header>
	)
}
