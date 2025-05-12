import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import type { Header } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import biolakIcon from '../../../public/biolak-logo.svg'
import { ContactForm } from '../ContactForm/Component'
import { ProductsDropdown } from './components/ProductsDropdown'

type NavItem = NonNullable<
	NonNullable<Header['navItemsLeft'] | Header['navItemsRight']>[number]['item']
>

export async function Header() {
	const headerData: Header = await getCachedGlobal('header', 1)()
	let leftSide: NavItem[] =
		headerData.navItemsLeft?.map((i) => i.item).filter((i) => i !== null && i !== undefined) ?? []
	if (leftSide.length === 0) {
		leftSide = ['search', 'products', 'about', 'events']
	}

	let rightSide: NavItem[] =
		headerData.navItemsRight?.map((i) => i.item).filter((i) => i !== null && i !== undefined) ??
		[]
	if (rightSide.length === 0) {
		rightSide = ['contact', 'vie-en', 'cart']
	}

	const elements: Record<NavItem, () => React.JSX.Element | Promise<React.JSX.Element>> = {
		search: () => (
			<Link href="/search" className="flex size-7 items-center justify-center">
				<span className="sr-only">Tìm kiếm</span>
				<SearchIcon className="w-5 scale-110 text-primary" size={30} />
			</Link>
		),
		products: ProductsDropdown,
		about: () => <Link href="/about">BioLAK</Link>,
		events: () => <Link href="/events">Sự kiện</Link>,
		contact: () => (
			<Dialog>
				<DialogTrigger>
					<div>Liên hệ</div>
				</DialogTrigger>
				<DialogContent className="min-w-[932px] overflow-hidden !rounded-2xl bg-primary-foreground p-12">
					<ContactForm inDialog={true} />
				</DialogContent>
			</Dialog>
		),
		'vie-en': () => <Link href="#">VIE/EN</Link>,
		cart: () => (
			<Button
				variant="default"
				className="h-14 rounded-full bg-primary px-6 font-sans text-xl font-medium"
				asChild
			>
				<span>Giỏ hàng</span>
			</Button>
		),
	}

	return (
		<header className="relative z-20 flex h-20 w-full items-center bg-primary-foreground px-10">
			<div className="grid w-full grid-cols-[1fr_auto_1fr]">
				<nav className="flex items-center gap-9 text-xl">
					{leftSide.map((item, index) => {
						const Elem = elements[item]
						if (Elem === undefined) {
							return null
						}
						return <Elem key={`header-left-${index}`} />
					})}
				</nav>

				<Link href="/home">
					<Image priority src={biolakIcon} alt="BioLAK Logo" className="h-12" />
				</Link>

				<nav className="flex items-center justify-end gap-9 text-xl">
					{rightSide.map((item) => {
						const Elem = elements[item]
						if (Elem === undefined) {
							return null
						}
						return <Elem key={`header-right-${item}`} />
					})}
				</nav>
			</div>
		</header>
	)
}
