'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { type Product } from '@/payload-types'
import { tryCatchSync } from '@/utilities/tryCatch'

export type BasicProduct = {
	slug: Product['slug']
	title: Product['title']
	variant: NonNullable<Product['variants']>[number]
}

export type BasicProductInCart = BasicProduct & {
	quantity: number
	checked: boolean
}

const CartContext = createContext<{
	cart: BasicProductInCart[]
	setCart: React.Dispatch<React.SetStateAction<BasicProductInCart[]>>
} | null>(null)

export function CartContextProvider({
	children,
}: {
	children: React.ReactNode
}): React.JSX.Element {
	const [cart, setCart] = useState<BasicProductInCart[]>([])
	return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>
}

const cartKey = 'cart'

export function useCartManager({
	syncWithLocalStorage = true,
}: {
	syncWithLocalStorage?: boolean
}) {
	const cartCtx = useContext(CartContext)
	if (!cartCtx) {
		throw new Error('useCartManager must be used within a CartContextProvider')
	}
	const { cart, setCart: setCart_ } = cartCtx

	function setCart(
		newCart: BasicProductInCart[] | ((prev: BasicProductInCart[]) => BasicProductInCart[]),
	) {
		if (typeof newCart === 'function') {
			setCart_((prev) => {
				const tmp = newCart(prev)
				if (syncWithLocalStorage) localStorage.setItem(cartKey, JSON.stringify(tmp))
				return tmp
			})
		} else {
			setCart_(newCart)
			if (syncWithLocalStorage) localStorage.setItem(cartKey, JSON.stringify(newCart))
		}
	}

	useEffect(() => {
		if (!syncWithLocalStorage) return
		const result = tryCatchSync(
			() => JSON.parse(localStorage.getItem(cartKey) || '[]') as BasicProductInCart[],
		)
		if (result.success) setCart(result.data)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		cart,

		loadProduct(product: BasicProduct): void {
			setCart((prev) => {
				const existingProductIndex = prev?.findIndex(
					(item) => item.slug === product.slug && item.variant.id === product.variant.id,
				)

				const updatedCart = structuredClone(prev ?? [])

				if (
					existingProductIndex !== undefined &&
					existingProductIndex > -1 &&
					updatedCart[existingProductIndex]
				) {
					updatedCart[existingProductIndex].quantity += 1
				} else {
					updatedCart.push({ ...product, quantity: 1, checked: true })
				}

				return updatedCart
			})
		},

		unloadProduct(product: BasicProduct): void {
			setCart((prev) => {
				const existingProductIndex = prev?.findIndex(
					(item) => item.slug === product.slug && item.variant.id === product.variant.id,
				)

				const updatedCart = structuredClone(prev ?? [])

				if (
					existingProductIndex !== undefined &&
					existingProductIndex > -1 &&
					updatedCart[existingProductIndex]
				) {
					if (updatedCart[existingProductIndex].quantity === 1) {
						return updatedCart
					}
					updatedCart[existingProductIndex].quantity -= 1
				}

				return updatedCart
			})
		},

		removeProduct({
			productSlug,
			variantSku,
		}: {
			productSlug: Product['slug']
			variantSku: Product['variants'][number]['sku']
		}): void {
			setCart((prev) => {
				const updatedCart =
					prev?.filter(
						(item) => !(item.slug === productSlug && item.variant.sku === variantSku),
					) ?? []

				return updatedCart
			})
		},

		toggleCheck({
			productSlug,
			variantSku,
			checked,
		}: {
			productSlug: Product['slug']
			variantSku: Product['variants'][number]['sku']
			checked: boolean
		}) {
			setCart((prev) => {
				const updatedCart = structuredClone(prev ?? [])
				const existingProductIndex = updatedCart.findIndex(
					(item) => item.slug === productSlug && item.variant.sku === variantSku,
				)

				if (existingProductIndex > -1 && updatedCart[existingProductIndex]) {
					updatedCart[existingProductIndex].checked = checked
				}

				return updatedCart
			})
		},

		uncheckAll(): void {
			setCart((prev) => {
				const updatedCart = structuredClone(prev ?? [])
				updatedCart.forEach((item) => {
					item.checked = false
				})
				return updatedCart
			})
		},
	}
}
