import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { ProductCategoriesSlug } from '@/collections/ProductCategories/slug'

import { INTERNAL_ProductsDropdownClient } from './ProductsDropdown.client'

export async function INTERNAL_ProductsDropdown({
	label,
}: {
	label?: string
}): Promise<React.JSX.Element> {
	const payload = await getPayload({ config: configPromise })
	const categories = await payload.find({
		collection: ProductCategoriesSlug,
		overrideAccess: false,
		depth: 2,
	})

	return <INTERNAL_ProductsDropdownClient categories={categories} label={label} />
}
