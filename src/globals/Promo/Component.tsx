import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import { DataFromGlobalSlug } from 'payload'

export async function Promo(): Promise<React.JSX.Element> {
	const promoData = (await getCachedGlobal('promo', 1)()) as DataFromGlobalSlug<'promo'>

	let target = promoData.link.url
	let internalLink = false
	if (
		!target &&
		typeof promoData.link.reference?.value === 'object' &&
		'slug' in promoData.link.reference.value &&
		!!promoData.link.reference.value.slug
	) {
		target = `/${promoData.link.reference.value.slug}`
		internalLink = true
	}

	if (!promoData.message) return <></>

	if (target && !internalLink) {
		return (
			<div className="flex h-10 w-full items-center justify-center bg-black text-primary-foreground">
				<a
					target={promoData.link.newTab ? '_blank' : '_self'}
					href={target}
					className="underline-offset-2 hover:underline"
				>
					{promoData.message}
				</a>
			</div>
		)
	}

	if (target && internalLink) {
		return (
			<div className="flex h-10 w-full items-center justify-center bg-black text-primary-foreground">
				<Link href="#" className="underline-offset-2 hover:underline">
					{promoData.message}
				</Link>
			</div>
		)
	}

	return (
		<div className="flex h-10 w-full items-center justify-center bg-black text-primary-foreground">
			{promoData.message}
		</div>
	)
}
