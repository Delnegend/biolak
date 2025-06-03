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

		clearCart(): void {
			setCart([])
		},

		loadProduct(product: BasicProduct, quantity: number = 1): void {
			if (quantity < 1) return
			setCart((prev) => {
				const existingProductIndex = prev?.findIndex(
					(item) => item.slug === product.slug && item.variant.id === product.variant.id,
				)

				const updatedCart = [...prev]

				if (
					existingProductIndex !== undefined &&
					existingProductIndex > -1 &&
					updatedCart[existingProductIndex]
				) {
					updatedCart[existingProductIndex].quantity += quantity
				} else {
					updatedCart.push({ ...product, quantity, checked: true })
				}

				return updatedCart
			})
		},

		unloadProduct(product: BasicProduct, quantity: number = 1): void {
			if (quantity < 1) return
			setCart((prev) => {
				const existingProductIndex = prev?.findIndex(
					(item) => item.slug === product.slug && item.variant.id === product.variant.id,
				)

				const updatedCart = [...prev]

				if (
					existingProductIndex !== undefined &&
					existingProductIndex > -1 &&
					updatedCart[existingProductIndex]
				) {
					updatedCart[existingProductIndex].quantity -= quantity
					if (updatedCart[existingProductIndex].quantity < 1) {
						updatedCart.splice(existingProductIndex, 1)
					}
				}

				return updatedCart
			})
		},

		removeProduct(productSlug: Product['slug']): void {
			setCart((prev) => {
				const updatedCart = prev?.filter((item) => item.slug !== productSlug)

				return updatedCart
			})
		},
	}
}
