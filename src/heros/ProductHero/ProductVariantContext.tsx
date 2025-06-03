'use client'

import { createContext, useContext, useState } from 'react'

import type { Product } from '@/payload-types'

const variantContext = createContext<{
	product: {
		slug: Product['slug']
		title?: Product['title']
		variant?: NonNullable<Product['variants']>[number]
	}
	setProductSlugAndVariant: React.Dispatch<
		React.SetStateAction<{
			productSlug: Product['slug']
			variant: NonNullable<Product['variants']>[number]
		} | null>
	>
} | null>(null)

/** Use this in the entire product page to provide the product slug and variant to all components. */
export function PorductVariantContextProvider({
	children,
}: {
	children: React.ReactNode
}): React.JSX.Element {
	const [productSlugAndVariant, setProductSlugAndVariant] = useState<{
		productSlug: Product['slug']
		variant: NonNullable<Product['variants']>[number]
	} | null>(null)

	return (
		<variantContext.Provider
			value={{
				product: {
					slug: productSlugAndVariant?.productSlug,
					title: productSlugAndVariant?.variant.title,
					variant: productSlugAndVariant?.variant,
				},
				setProductSlugAndVariant,
			}}
		>
			{children}
		</variantContext.Provider>
	)
}

/**
 * Stores the user's selected product variant
 */
export function useSelectProductVariant() {
	const context = useContext(variantContext)
	if (!context) {
		throw new Error('useVariantContext must be used within a VariantContextProvider')
	}
	return context
}

export const useSelectProductVariantUnsafe = () => useContext(variantContext)
