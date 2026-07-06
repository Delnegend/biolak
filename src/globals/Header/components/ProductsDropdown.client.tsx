'use client'
import { X } from 'lucide-react'
import { AnimatePresence, motion, Variants } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { PaginatedDocs, Where } from 'payload'
import { stringify } from 'qs-esm'
import { useReducer, useRef, useState } from 'react'

import { ProductsSlug } from '@/collections/Products/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'
import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { Product, ProductCategory, ProductSubCategory } from '@/payload-types'
import { getPriceRange } from '@/utilities/getPriceRange'
import { cn } from '@/utilities/ui'

import { useHeaderContext } from '../hooks/useHeaderContext'

type DropdownState = {
	kind: 'closed' | 'categories' | 'subcategories' | 'loading' | 'products'
	category: ProductCategory | null
	subCategory: ProductSubCategory | null
	products: PaginatedDocs<Product> | undefined
	hoveringOverAnItem: boolean
}

type DropdownAction =
	| { type: 'CLOSE' }
	| { type: 'OPEN' }
	| { type: 'HOVERING_OVER_ITEM'; hovering: boolean }
	| { type: 'SELECT_CATEGORY'; category: ProductCategory }
	| { type: 'DESELECT_CATEGORY' }
	| { type: 'SELECT_SUBCATEGORY'; subCategory: ProductSubCategory }
	| { type: 'DESELECT_SUBCATEGORY' }
	| {
			type: 'PRODUCTS_LOADED'
			subCategoryId: ProductSubCategory['id']
			products: PaginatedDocs<Product>
	  }

function dropdownReducer(state: DropdownState, action: DropdownAction): DropdownState {
	switch (action.type) {
		case 'CLOSE':
			return {
				...state,
				kind: 'closed',
				category: null,
				subCategory: null,
				products: undefined,
			}
		case 'OPEN':
			return {
				...state,
				kind: 'categories',
				category: null,
				subCategory: null,
				products: undefined,
			}
		case 'SELECT_CATEGORY':
			return {
				...state,
				kind: 'subcategories',
				category: action.category,
				subCategory: null,
				products: undefined,
			}
		case 'DESELECT_CATEGORY':
			return {
				...state,
				kind: 'categories',
				category: null,
				subCategory: null,
				products: undefined,
			}
		case 'SELECT_SUBCATEGORY':
			return {
				...state,
				kind: 'loading',
				category: state.category,
				subCategory: action.subCategory,
				products: undefined,
			}
		case 'DESELECT_SUBCATEGORY':
			return {
				...state,
				kind: 'subcategories',
				category: state.category,
				subCategory: null,
				products: undefined,
			}
		case 'PRODUCTS_LOADED':
			if (state.kind === 'loading' && state.subCategory?.id === action.subCategoryId) {
				return {
					...state,
					kind: 'products',
					category: state.category,
					subCategory: state.subCategory,
					products: action.products,
				}
			}
			return state
		case 'HOVERING_OVER_ITEM':
			return {
				...state,
				hoveringOverAnItem: action.hovering,
			}
	}
}

const panelAnimationVariants: Variants = {
	initial: { opacity: 0, x: -30 },
	animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
	exit: { opacity: 0, x: -30, transition: { duration: 0.4, ease: 'easeInOut' } },
}

const itemAnimationVariants: Variants = {
	initial: { opacity: 0, x: -30 },
	animate: (index: number) => ({
		opacity: 1,
		x: 0,
		transition: { duration: 0.4, ease: 'easeInOut', delay: index * 0.075 },
	}),
	exit: {
		opacity: 0,
		x: -30,
		transition: { duration: 0.2, ease: 'easeInOut' },
	},
}

function DropdownLabel({
	children,
	className,
	...props
}: React.ComponentPropsWithRef<typeof motion.div> & {
	className?: string
}): React.JSX.Element {
	return (
		<motion.div
			variants={panelAnimationVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className={cn('mb-1 text-base font-bold text-primary', className)}
			custom={0}
			{...props}
		>
			{children}
		</motion.div>
	)
}

function DropdownItem({
	children,
	className,
	...props
}: React.ComponentPropsWithRef<typeof motion.button>): React.JSX.Element {
	return (
		<motion.button
			variants={itemAnimationVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className={cn(
				'hover-underline-animation w-fit whitespace-nowrap text-start text-2xl font-medium',
				className,
			)}
			{...props}
		>
			{children}
		</motion.button>
	)
}

function DropdownColumn({
	children,
	className,
	size,
}: React.ComponentPropsWithRef<typeof motion.div> & {
	size: 'lg' | 'sm'
}): React.JSX.Element {
	const { allTopBarsHeight } = useHeaderContext()

	return (
		<motion.div
			variants={panelAnimationVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className={cn(
				'flex flex-col gap-1 bg-primary-foreground px-20 py-12',
				size === 'lg' && 'w-1/3',
				size === 'sm' && 'fixed left-0 w-full',
				className,
			)}
			style={{
				height: size === 'sm' ? `calc(100dvh - ${allTopBarsHeight}px)` : undefined,
			}}
		>
			{children}
		</motion.div>
	)
}

export function INTERNAL_ProductsDropdownClient({
	categories,
	label,
	size,
}: {
	categories: PaginatedDocs<ProductCategory>
	label?: string
	size: 'lg' | 'sm'
}): React.JSX.Element {
	const t = useTranslations('globals.header.nav.products')
	const { allTopBarsHeight, setSmallNavOpen } = useHeaderContext()

	const [dropdown, rawDispatch] = useReducer(dropdownReducer, {
		kind: 'closed',
		category: null,
		subCategory: null,
		products: undefined,
		hoveringOverAnItem: false,
	} satisfies DropdownState)

	const abortRef = useRef<AbortController | null>(null)
	function dispatch(action: DropdownAction) {
		rawDispatch(action)
		if (action.type !== 'SELECT_SUBCATEGORY') return

		abortRef.current?.abort('Products fetch aborted due to new subcategory selection')
		const abort = new AbortController()
		abortRef.current = abort

		fetch(
			`/api/${ProductsSlug}${stringify(
				{
					pagination: false,
					limit: 1000,
					where: {
						[`${ProductSubCategoriesSlug}`]: {
							equals: action.subCategory.id ?? 0,
						},
					} satisfies Where,
				},
				{
					addQueryPrefix: true,
				},
			)}`,
			{ signal: abort.signal },
		)
			.then((res) => {
				if (abort.signal.aborted) return
				return res.json()
			})
			.then((data) => {
				if (!data || abort.signal.aborted) return
				rawDispatch({
					type: 'PRODUCTS_LOADED',
					subCategoryId: action.subCategory.id,
					products: data,
				})
			})
	}

	const pathname = usePathname()
	const [prevPathname, setPrevPathname] = useState(pathname)
	if (pathname !== prevPathname) {
		setPrevPathname(pathname)
		rawDispatch({ type: 'CLOSE' })
	}

	return (
		<div className="relative">
			<button
				onClick={() => dispatch({ type: dropdown.kind === 'closed' ? 'OPEN' : 'CLOSE' })}
				className="whitespace-nowrap"
			>
				{label ?? t('label')}
			</button>
			<AnimatePresence>
				{dropdown.kind !== 'closed' && (
					<motion.div
						variants={panelAnimationVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						className={cn(
							'fixed left-0 flex h-dvh w-dvw border-t',
							size === 'lg' && 'bg-black/85',
						)}
						style={{
							top: `${allTopBarsHeight}px`,
							height: `calc(100dvh - ${allTopBarsHeight}px)`,
						}}
						onClick={() => {
							if (dropdown.hoveringOverAnItem) return
							dispatch({ type: 'CLOSE' })
						}}
					>
						{/* categories */}
						<DropdownColumn
							className={cn('overflow-y-auto', size === 'lg' && 'z-50 border-r')}
							key="categories"
							style={{
								height: `calc(100dvh - ${allTopBarsHeight}px)`,
							}}
							size={size}
						>
							<DropdownLabel
								key="categories"
								className="flex items-center justify-between"
							>
								<span>{t('dropdownTitle')}</span>
								<button
									aria-label={t('close')}
									onClick={() => {
										dispatch({ type: 'CLOSE' })
									}}
									onMouseEnter={() => {
										dispatch({ type: 'HOVERING_OVER_ITEM', hovering: true })
									}}
									onMouseLeave={() => {
										dispatch({ type: 'HOVERING_OVER_ITEM', hovering: false })
									}}
								>
									<X size={20} />
								</button>
							</DropdownLabel>
							{categories.docs.map((category, index) => (
								<DropdownItem
									key={category.slug}
									custom={index + 1}
									onClick={(e) => {
										e.stopPropagation()
										dispatch({ type: 'SELECT_CATEGORY', category })
									}}
									onMouseEnter={() => {
										if (size === 'sm') return
										dispatch({ type: 'SELECT_CATEGORY', category })
									}}
									className={
										dropdown.category?.slug === category.slug
											? 'keep-hover'
											: ''
									}
								>
									{category.title}
								</DropdownItem>
							))}
						</DropdownColumn>

						{/* sub categories */}
						{dropdown.category?.productSubCategories?.docs?.length && (
							<DropdownColumn
								className={cn('overflow-y-auto', size === 'lg' && 'z-40 border-r')}
								key="subCategoryPanel"
								style={{
									height: `calc(100dvh - ${allTopBarsHeight}px)`,
								}}
								size={size}
							>
								<DropdownLabel
									key={dropdown.category?.slug}
									className="flex items-center justify-between"
								>
									<span>{dropdown.category?.title ?? t('categoryLabel')}</span>
									<button
										aria-label={t('closeSubcategory')}
										onClick={() => {
											dispatch({ type: 'DESELECT_CATEGORY' })
										}}
										onMouseEnter={() => {
											dispatch({
												type: 'HOVERING_OVER_ITEM',
												hovering: true,
											})
										}}
										onMouseLeave={() => {
											dispatch({
												type: 'HOVERING_OVER_ITEM',
												hovering: false,
											})
										}}
									>
										<X size={20} />
									</button>
								</DropdownLabel>
								<DropdownItem
									key={`allProducts-${dropdown.category?.slug}`}
									tabIndex={-1}
								>
									<Link
										href={`/category/${dropdown.category?.slug}`}
										className="group grid gap-x-4"
										onClick={() => {
											rawDispatch({ type: 'CLOSE' })
										}}
									>
										{t('all')}
									</Link>
								</DropdownItem>
								{dropdown.category?.productSubCategories?.docs
									?.filter((p) => typeof p === 'object')
									.map((category, index) => (
										<DropdownItem
											key={category.slug}
											custom={index}
											onClick={(e) => {
												e.stopPropagation()
												dispatch({
													type: 'SELECT_SUBCATEGORY',
													subCategory: category,
												})
											}}
											onMouseEnter={() => {
												if (size === 'sm') return
												dispatch({
													type: 'SELECT_SUBCATEGORY',
													subCategory: category,
												})
											}}
											className={
												dropdown.subCategory?.slug === category.slug
													? 'keep-hover'
													: ''
											}
										>
											{category.title}
										</DropdownItem>
									))}
							</DropdownColumn>
						)}

						{/* products */}
						{dropdown.products?.docs?.length && (
							<DropdownColumn
								className={cn('overflow-y-auto', size === 'lg' && 'z-30')}
								key="productsPanel"
								style={{
									height: `calc(100dvh - ${allTopBarsHeight}px)`,
								}}
								size={size}
							>
								<DropdownLabel
									key={dropdown.subCategory?.slug}
									className="flex items-center justify-between"
								>
									<span>{dropdown.subCategory?.title ?? t('categoryLabel')}</span>
									<button
										aria-label={t('closeProducts')}
										onClick={() => {
											dispatch({ type: 'DESELECT_SUBCATEGORY' })
										}}
										onMouseEnter={() => {
											dispatch({
												type: 'HOVERING_OVER_ITEM',
												hovering: true,
											})
										}}
										onMouseLeave={() => {
											dispatch({
												type: 'HOVERING_OVER_ITEM',
												hovering: false,
											})
										}}
									>
										<X size={20} />
									</button>
								</DropdownLabel>
								{dropdown.products?.docs.map((product, index) => {
									return (
										<motion.button
											key={`${dropdown.subCategory?.slug}-${product.slug}`}
											custom={index}
											variants={itemAnimationVariants}
											initial="initial"
											animate="animate"
											exit="exit"
											onClick={(e) => e.stopPropagation()}
											className="mb-2"
										>
											<Link
												href={`/product/${product.slug}`}
												tabIndex={-1}
												className="group grid grid-cols-[1fr_auto] gap-x-4"
												style={{
													gridTemplateAreas: `"title image"
																			"description image"
																			"price image"`,
												}}
												onClick={() => setSmallNavOpen(false)}
											>
												<div
													className="group-hover:hover-underline-animation group-hover:keep-hover w-fit text-balance text-start text-lg font-medium"
													style={{ gridArea: 'title' }}
												>
													{product.title}
												</div>
												<div
													className="my-1 text-balance text-start text-base font-medium opacity-70"
													style={{ gridArea: 'description' }}
												>
													{product.shortDescription}
												</div>
												<div
													className="text-start text-base font-medium opacity-70"
													style={{ gridArea: 'price' }}
												>
													{getPriceRange(product) ?? t('outOfStock')}
												</div>
												<HeadlessImage
													media={product.icon}
													alt={t('productIcon')}
													placeholder={{
														width: 200,
														height: 200,
													}}
													className="size-[5.25rem] object-contain"
													style={{ gridArea: 'image' }}
												/>
											</Link>
										</motion.button>
									)
								})}
							</DropdownColumn>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
