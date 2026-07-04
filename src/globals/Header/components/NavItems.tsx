import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ContactFormGlobalComponent } from '@/globals/ContactForm/Component'
import { defaultLocale, Lang } from '@/i18n/routing'
import { HeaderGlobal } from '@/payload-types'

import { INTERNAL_CartSidebar } from './CartSidebar.client'
import { INTERNAL_CloseSmallNavWrapper } from './CloseSmallNavWrapper.client'
import { INTERNAL_LanguageSwitcher } from './LanguageSwitcher.client'
import { INTERNAL_ProductsDropdown } from './ProductsDropdown'

/** This can only be used in server component */
export const NavItems: Record<
	NonNullable<
		NonNullable<
			HeaderGlobal['headerItemsLeft'] | HeaderGlobal['headerItemsRight']
		>[number]['prebuilt']
	>,
	(props: {
		label?: string
		locale: Lang | undefined
		size: 'lg' | 'sm'
	}) => Promise<React.JSX.Element>
> = {
	search: async ({ label, locale: _locale }) => {
		const t = await getTranslations('globals.header.nav')
		return (
			<INTERNAL_CloseSmallNavWrapper asChild>
				<Link href="#" className="flex size-7 items-center justify-center">
					<span className="sr-only">{label ?? t('search')}</span>
					<SearchIcon className="w-5 scale-110 text-primary" size={30} />
				</Link>
			</INTERNAL_CloseSmallNavWrapper>
		)
	},
	products: INTERNAL_ProductsDropdown,
	about: async ({ label }) => (
		<INTERNAL_CloseSmallNavWrapper asChild>
			<Link href="/about">{label ?? 'BioLAK'}</Link>
		</INTERNAL_CloseSmallNavWrapper>
	),
	contact: async ({ label, locale }) => {
		const t = await getTranslations('globals.header.nav')
		return (
			<Dialog>
				<DialogTrigger>
					<INTERNAL_CloseSmallNavWrapper>
						<span className="whitespace-nowrap">{label ?? t('contacts')}</span>
					</INTERNAL_CloseSmallNavWrapper>
				</DialogTrigger>
				<DialogContent className="min-w-[932px] overflow-hidden !rounded-2xl bg-primary-foreground p-12">
					<ContactFormGlobalComponent inDialog={true} locale={locale ?? defaultLocale} />
				</DialogContent>
			</Dialog>
		)
	},
	'vie-en': async ({ label, locale }) => (
		<INTERNAL_CloseSmallNavWrapper asChild>
			<INTERNAL_LanguageSwitcher label={label} locale={locale} />
		</INTERNAL_CloseSmallNavWrapper>
	),
	cart: async (props) => <INTERNAL_CartSidebar {...props} />,
}
