import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { ProductCategoriesSlug } from '@/collections/ProductCategories/slug'

import { ProductsDropdownClient } from './ProductsDropdown.client'

export async function ProductsDropdown({ label }: { label?: string }): Promise<React.JSX.Element> {
	const payload = await getPayload({ config: configPromise })
	const categories = await payload.find({
		collection: ProductCategoriesSlug,
		depth: 4,
		overrideAccess: false,
	})

	return <ProductsDropdownClient categories={categories} label={label} />
}
