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

export function VariantContextProvider({
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

export function useVariantContext() {
	const context = useContext(variantContext)
	if (!context) {
		throw new Error('useVariantContext must be used within a VariantContextProvider')
	}
	return context
}
