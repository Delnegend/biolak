import { DataFromGlobalSlug } from 'payload'

import { getCachedGlobal } from '@/utilities/getGlobals'

import PageClient from './page.client'

export async function generateStaticParams() {
	return {
		title: 'Thanh toán',
	}
}

export default async function Checkout(): Promise<React.JSX.Element> {
	const checkoutData = (await getCachedGlobal('checkout', 1)()) as DataFromGlobalSlug<'checkout'>

	return (
		<div className="safe-width">
			<PageClient />
			<div className="flex flex-col gap-12">
				<div className="font-serif text-7xl font-semibold italic leading-[3.5rem] text-primary">
					Thanh toán
				</div>
				<div className="text-balance">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in nisl aliquam,
					pharetra diam consequat, tincidunt nibh.
				</div>
			</div>
		</div>
	)
}
