'use client'

import { createContext, useContext, useState } from 'react'

import { ProductInCart } from '@/hooks/useCartManager'

type SelectedProductVariant = Omit<ProductInCart, 'quantity' | 'checked'>

const variantContext = createContext<{
	selectedProductVariant: SelectedProductVariant | null
	setSelectedProductVariant: React.Dispatch<React.SetStateAction<SelectedProductVariant | null>>
} | null>(null)

/** Use this in the entire product page to provide the product slug and variant to all components. */
export function ProductVariantContextProvider({
	children,
}: {
	children: React.ReactNode
}): React.JSX.Element {
	const [selectedProductVariant, setSelectedProductVariant] =
		useState<SelectedProductVariant | null>(null)

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
