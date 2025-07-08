import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { ProductCategoriesSlug } from '@/collections/ProductCategories/slug'
import { getClientLang } from '@/utilities/getClientLocale'

import { INTERNAL_ProductsDropdownClient } from './ProductsDropdown.client'

export async function INTERNAL_ProductsDropdown({
	label,
	size,
}: {
	label?: string
	size: 'lg' | 'sm'
}): Promise<React.JSX.Element> {
	const [payload, locale] = await Promise.all([
		getPayload({ config: configPromise }),
		getClientLang(),
	])
	const categories = await payload.find({
		collection: ProductCategoriesSlug,
		overrideAccess: false,
		depth: 2,
	})

	return (
		<INTERNAL_ProductsDropdownClient
			categories={categories}
			label={label}
			locale={locale}
			size={size}
		/>
	)
}
