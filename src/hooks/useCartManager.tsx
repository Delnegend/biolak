'use client'

import { PaginatedDocs } from 'payload'
import { stringify } from 'qs-esm'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod/v4'

import { ProductsSlug } from '@/collections/Products/slug'
import { type Product } from '@/payload-types'
import { cnsoleBuilder } from '@/utilities/cnsole'
import { defaultLocale, Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { tryCatch, tryCatchSync } from '@/utilities/tryCatch'

const cnsole = cnsoleBuilder('hooks/useCartManager')

const ProductInCartInLocalStorageSchema = z.object({
	product: z.object({
		id: z.number(),
		title: z.string().optional().default(''),
		slug: z.string().optional().default(''),
		categoryIds: z.array(z.number()).optional().default([]),
		subCategoryIds: z.array(z.number()).optional().default([]),
	}),
	variant: z.object({
		sku: z.string(),
		title: z.string(),
		price: z.number().min(0),
		image: z.any().optional().nullable(),
		stock: z.number().optional().default(0),
	}),
	quantity: z.number().min(1),
	checked: z.boolean().optional().default(true),
	disabled: z.boolean().optional().default(false),
})

export interface ProductInCart {
	product: {
		id: Product['id']
		title: Product['title']
		slug?: Product['slug']
		categoryIds?: number[]
		subCategoryIds?: number[]
	}
	variant: {
		sku: Product['variants'][number]['sku']
		title: Product['variants'][number]['title']
		price: Product['variants'][number]['price']
		image?: Product['variants'][number]['image']
		stock?: Product['variants'][number]['stock']
	}
	quantity: number
	checked?: boolean
	disabled?: boolean
}

const CartContext = createContext<{
	cart: ProductInCart[]
	setCart: React.Dispatch<React.SetStateAction<ProductInCart[]>>
} | null>(null)

export function CartContextProvider({
	children,
}: {
	children: React.ReactNode
}): React.JSX.Element {
	const [cart, setCart] = useState<ProductInCart[]>([])
	return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>
}

const cartKey = 'cart'

export function useCartManager({
	syncWithLocalStorage = true,
	showNotification = false,
}: {
	syncWithLocalStorage?: boolean
	showNotification?: boolean
}) {
	const cartCtx = useContext(CartContext)
	const [loadedFromLocalStorageDone, setLoadedFromLocalStorageDone] = useState(false)

	if (!cartCtx) {
		throw new Error('useCartManager must be used within a CartContextProvider')
	}

	const { cart, setCart: setCart_ } = cartCtx
	function setCart(newCart: (prev: ProductInCart[]) => ProductInCart[]) {
		setCart_((prev) => {
			const tmp = newCart(prev)
			if (syncWithLocalStorage) localStorage.setItem(cartKey, JSON.stringify(tmp))
			return tmp
		})
	}

	useEffect(() => {
		if (!syncWithLocalStorage) {
			setLoadedFromLocalStorageDone(true)
			return
		}

		const { ok, data: parsedUnvalidated } = tryCatchSync(() =>
			JSON.parse(localStorage.getItem(cartKey) || '[]'),
		)
		if (!ok) {
			if (process.env.NODE_ENV === 'development')
				cnsole.error("Can't parse cart from localStorage:", parsedUnvalidated)
			localStorage.setItem(cartKey, JSON.stringify([]))
			setLoadedFromLocalStorageDone(true)
			return
		}

		const { success, data, error } = z
			.array(ProductInCartInLocalStorageSchema)
			.safeParse(parsedUnvalidated)
		if (!success) {
			if (process.env.NODE_ENV === 'development')
				cnsole.error("Can't validate cart from localStorage:", z.prettifyError(error))
			localStorage.setItem(cartKey, JSON.stringify([]))
			setLoadedFromLocalStorageDone(true)
			return
		}

		setCart((_) => data)

		// refresh all fields in the products in the cart, except for
		// - checked, quantity
		// - product.id
		// - variant.sku
		const productIdsInCart = data.map((item) => item.product.id)
		void (async () => {
			const {
				data: resp,
				ok: respOk,
				error: respError,
			} = await tryCatch(() =>
				fetch(
					`/api/${ProductsSlug}${stringify(
						{
							pagination: false,
							limit: 1000,
							where: {
								id: {
									in: productIdsInCart,
								},
							},
							select: {
								variants: true,
								title: true,
								slug: true,
								productCategories: true,
								productSubCategories: true,
							} satisfies Partial<Record<keyof Product, true>>,
						},
						{
							addQueryPrefix: true,
						},
					)}}`,
				),
			)

			if (!respOk) {
				cnsole.error("Can't refresh product in cart info:", respError)
				return
			}

			if (!resp.ok) {
				cnsole.error("Can't fetch products for cart:", resp.status, resp.statusText)
				return
			}

			const { data, ok, error } = await tryCatch(
				() =>
					resp.json() as Promise<
						PaginatedDocs<{
							id: Product['id']
							variants: Product['variants']
							slug: Product['slug']
							title: Product['title']
							productCategories: Product['productCategories']
							productSubCategories: Product['productSubCategories']
						}>
					>,
			)

			if (!ok) {
				cnsole.error("Can't parse products for cart:", error)
				return
			}

			setCart((prev) => {
				const updatedCart: ProductInCart[] = []

				for (const item of prev) {
					const productInResponse = data.docs.find((prod) => prod.id === item.product.id)
					if (!productInResponse) {
						cnsole.warn(
							`Product with id ${item.product.id} not found in response, removing from cart.`,
						)
						continue
					}
					const variantInResponse = productInResponse.variants.find(
						(variant) => variant.sku === item.variant.sku,
					)
					if (!variantInResponse) {
						cnsole.warn(
							`Variant with sku ${item.variant.sku} not found for product ${item.product.id}, removing from cart.`,
						)
						continue
					}
					const outOfStock = variantInResponse.stock <= 0
					updatedCart.push({
						product: {
							id: productInResponse.id,
							title: productInResponse.title,
							slug: productInResponse.slug,
							categoryIds:
								productInResponse.productCategories?.map((p) =>
									typeof p === 'object' ? p.id : p,
								) ?? [],
							subCategoryIds:
								productInResponse.productSubCategories?.map((p) =>
									typeof p === 'object' ? p.id : p,
								) ?? [],
						},
						variant: {
							sku: variantInResponse.sku,
							title: variantInResponse.title,
							price: variantInResponse.price,
							image: variantInResponse.image,
							stock: variantInResponse.stock,
						},
						quantity: Math.min(item.quantity, variantInResponse.stock ?? 0),
						checked: outOfStock ? false : (item.checked ?? true),
						disabled: outOfStock,
					})
				}
				return updatedCart
			})

			setLoadedFromLocalStorageDone(true)
		})()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		cart,
		loadedFromLocalStorageDone,

		loadProduct(product: ProductInCart): void {
			setCart((prev) => {
				const existingProductIndex = prev?.findIndex(
					(item) =>
						item.product.id === product.product.id &&
						item.variant.sku === product.variant.sku,
				)

				const updatedCart = structuredClone(prev ?? [])

				if (
					existingProductIndex !== undefined &&
					existingProductIndex > -1 &&
					updatedCart[existingProductIndex]
				) {
					updatedCart[existingProductIndex].quantity += 1
				} else {
					updatedCart.push(product)
				}

				return updatedCart
			})

			if (showNotification)
				toast.success(
					matchLang({
						[Lang.English]: `Added ${product.product.title} (${product.variant.title}) to cart`,
						[Lang.Vietnamese]: `Đã thêm ${product.product.title} (${product.variant.title}) vào giỏ hàng`,
					})(defaultLocale),
				)
		},

		unloadProduct(product: {
			productId: ProductInCart['product']['id']
			variantSku: ProductInCart['variant']['sku']
		}): void {
			setCart((prev) => {
				const existingProductIndex = prev?.findIndex(
					(item) =>
						item.product.id === product.productId && item.variant.sku === product.variantSku,
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
			productId,
			variantSku,
		}: {
			productId: ProductInCart['product']['id']
			variantSku: ProductInCart['variant']['sku']
		}): void {
			setCart((prev) => {
				const updatedCart =
					prev?.filter(
						(item) => !(item.product.id === productId && item.variant.sku === variantSku),
					) ?? []

				return updatedCart
			})
		},

		toggleCheck({
			productId,
			variantSku,
			checked,
		}: {
			productId: ProductInCart['product']['id']
			variantSku: ProductInCart['variant']['sku']
			checked: boolean
		}) {
			setCart((prev) => {
				const updatedCart = structuredClone(prev ?? [])
				const existingProductIndex = updatedCart.findIndex(
					(item) => item.product.id === productId && item.variant.sku === variantSku,
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
