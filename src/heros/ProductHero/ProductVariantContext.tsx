'use client'

import { createContext, useContext, useState } from 'react'

import type { Product } from '@/payload-types'

const variantContext = createContext<{
	selectedProductVariant: {
		slug: Product['slug']
		title: Product['title']
		variant: NonNullable<Product['variants']>[number]
	} | null
	setSelectedProductVariant: React.Dispatch<
		React.SetStateAction<{
			slug: Product['slug']
			title: Product['title']
			variant: NonNullable<Product['variants']>[number]
		} | null>
	>
} | null>(null)

/** Use this in the entire product page to provide the product slug and variant to all components. */
export function ProductVariantContextProvider({
	children,
}: {
	children: React.ReactNode
}): React.JSX.Element {
	const [selectedProductVariant, setSelectedProductVariant] = useState<{
		slug: Product['slug']
		title: Product['title']
		variant: NonNullable<Product['variants']>[number]
	} | null>(null)

	return (
		<variantContext.Provider
			value={{
				selectedProductVariant,
				setSelectedProductVariant,
			}}
		>
			{children}
		</variantContext.Provider>
	)
}

/**
 * Stores the user's selected product variant
 */
export function useSelectedProductVariant() {
	const context = useContext(variantContext)
	if (!context) {
		throw new Error('useVariantContext must be used within a VariantContextProvider')
	}
	return context
}

export const useNullableSelectedProductVariant = () => useContext(variantContext)
