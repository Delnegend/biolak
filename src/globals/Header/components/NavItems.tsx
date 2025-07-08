import { SearchIcon } from 'lucide-react'
import Link from 'next/link'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ContactFormGlobalComponent } from '@/globals/ContactForm/Component'
import { HeaderGlobal } from '@/payload-types'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

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
		locale: Lang
		size: 'lg' | 'sm'
	}) => React.JSX.Element | Promise<React.JSX.Element>
> = {
	search: ({ label, locale }) => (
		<INTERNAL_CloseSmallNavWrapper asChild>
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
		</INTERNAL_CloseSmallNavWrapper>
	),
	products: INTERNAL_ProductsDropdown,
	about: ({ label }) => (
		<INTERNAL_CloseSmallNavWrapper asChild>
			<Link href="/about">{label ?? 'BioLAK'}</Link>
		</INTERNAL_CloseSmallNavWrapper>
	),
	contact: ({ label, locale }) => (
		<Dialog>
			<DialogTrigger asChild>
				<INTERNAL_CloseSmallNavWrapper asChild>
					<button>
						{label ??
							matchLang({
								[Lang.English]: 'Contacts',
								[Lang.Vietnamese]: 'Liên hệ',
							})(locale)}
					</button>
				</INTERNAL_CloseSmallNavWrapper>
			</DialogTrigger>
			<DialogContent className="min-w-[932px] overflow-hidden !rounded-2xl bg-primary-foreground p-12">
				<ContactFormGlobalComponent inDialog={true} />
				``
			</DialogContent>
		</Dialog>
	),
	'vie-en': ({ label, locale }) => (
		<INTERNAL_CloseSmallNavWrapper asChild>
			<INTERNAL_LanguageSwitcher label={label} locale={locale} />
		</INTERNAL_CloseSmallNavWrapper>
	),
	cart: (props) => <INTERNAL_CartSidebar {...props} />,
}
