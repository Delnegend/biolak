'use client'
import { X } from 'lucide-react'
import { AnimatePresence, motion, Variants } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PaginatedDocs, Where } from 'payload'
import { stringify } from 'qs-esm'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

import { ProductsSlug } from '@/collections/Products/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'
import { HeadlessImage } from '@/components/Media/HeadlessImage'
import { Product, ProductCategory, ProductSubCategory } from '@/payload-types'
import { getPriceRange } from '@/utilities/getPriceRange'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'
import { RESTFetcher } from '@/utilities/RESTFetcher'
import { cn } from '@/utilities/ui'

import { useHeaderContext } from '../hooks/useHeaderContext'

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
	locale,
	size,
}: {
	categories: PaginatedDocs<ProductCategory>
	label?: string
	locale: Lang
	size: 'lg' | 'sm'
}): React.JSX.Element {
	const { allTopBarsHeight } = useHeaderContext()

	const [open, setOpen] = useState(false)
	const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null)
	const [activeSubCategory, setActiveSubCategory] = useState<ProductSubCategory | null>(null)
	// Disable backdrop click closing when hovering over the close icon,
	// so that interacting with inner panel controls doesn't collapse the dropdown
	const [clickAnywhereToClose, setClickAnywhereToClose] = useState(true)

	const { data: products } = useSWR(
		`/api/${ProductsSlug}${stringify(
			{
				pagination: false,
				limit: 1000,
				where: {
					[`${ProductSubCategoriesSlug}`]: {
						equals: activeSubCategory?.id ?? 0,
					},
				} satisfies Where,
			},
			{
				addQueryPrefix: true,
			},
		)}`,
		RESTFetcher<PaginatedDocs<Product>>,
	)

	function handleCategoryLoad(category: ProductCategory) {
		setActiveCategory(category)
		setActiveSubCategory(null)
	}

	async function handleSubcategoryLoad(subCategory: ProductSubCategory) {
		setActiveSubCategory(subCategory)
		if (!subCategory.slug) return
	}

	// clear active things when closed
	useEffect(() => {
		if (open) return

		setActiveCategory(null)
		setActiveSubCategory(null)
	}, [open])

	// close on route change
	const pathname = usePathname()
	useEffect(() => {
		setOpen(false)
	}, [pathname])

	return (
		<div className="relative">
			<button onClick={() => setOpen(!open)}>
				{label ??
					matchLang({
						[Lang.English]: 'Products',
						[Lang.Vietnamese]: 'Sản phẩm',
					})(locale)}
			</button>
			<AnimatePresence>
				{open && (
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
							if (!clickAnywhereToClose) return
							setOpen((prev) => !prev)
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
							<DropdownLabel key="categories" className="flex items-center justify-between">
								<span>
									{matchLang({
										[Lang.English]: 'Products',
										[Lang.Vietnamese]: 'Sản phẩm',
									})(locale)}
								</span>
								<button
									aria-label={matchLang({
										[Lang.English]: 'Close products dropdown',
										[Lang.Vietnamese]: 'Đóng danh mục sản phẩm',
									})(locale)}
									onClick={() => {
										setOpen(false)
									}}
									onMouseEnter={() => setClickAnywhereToClose(false)}
									onMouseLeave={() => setClickAnywhereToClose(true)}
								>
									<X size={20} />
								</button>
							</DropdownLabel>
							{categories.docs.map((category, index) => (
								<DropdownItem
									key={category.slug}
									custom={index + 1}
									onClick={(e) => {
										e.stopPropagation() // Prevent closing dropdown
										handleCategoryLoad(category)
									}}
									onMouseEnter={() => {
										if (size === 'sm') return
										handleCategoryLoad(category)
									}}
									className={activeCategory?.slug === category.slug ? 'keep-hover' : ''}
								>
									{category.title}
								</DropdownItem>
							))}
						</DropdownColumn>

						{/* sub categories */}
						<AnimatePresence mode="wait">
							{activeCategory?.productSubCategories?.docs?.length && (
								<DropdownColumn
									className={cn('overflow-y-auto', size === 'lg' && 'z-40 border-r')}
									key="subCategoryPanel"
									style={{
										height: `calc(100dvh - ${allTopBarsHeight}px)`,
									}}
									size={size}
								>
									<DropdownLabel
										key={activeCategory?.slug}
										className="flex items-center justify-between"
									>
										<span>
											{activeCategory?.title ??
												matchLang({
													[Lang.English]: 'Product category',
													[Lang.Vietnamese]: 'Danh mục sản phẩm',
												})(locale)}
										</span>
										<button
											aria-label={matchLang({
												[Lang.English]: 'Close subcategory',
												[Lang.Vietnamese]: 'Đóng danh mục con',
											})(locale)}
											onClick={() => {
												setOpen(true)
												setActiveCategory(null)
											}}
											onMouseEnter={() => setClickAnywhereToClose(false)}
											onMouseLeave={() => setClickAnywhereToClose(true)}
										>
											<X size={20} />
										</button>
									</DropdownLabel>
									<DropdownItem key={`allProducts-${activeCategory?.slug}`} tabIndex={-1}>
										<Link
											href={`/category/${activeCategory?.slug}`}
											className="group grid gap-x-4"
											onClick={() => {
												setOpen(false)
											}}
										>
											{matchLang({
												[Lang.English]: 'All',
												[Lang.Vietnamese]: 'Tất cả',
											})(locale)}
										</Link>
									</DropdownItem>
									{activeCategory?.productSubCategories?.docs
										?.filter((p) => typeof p === 'object')
										.map((category, index) => (
											<DropdownItem
												key={category.slug}
												custom={index}
												onClick={(e) => {
													e.stopPropagation() // Prevent closing dropdown
													handleSubcategoryLoad(category)
												}}
												onMouseEnter={() => {
													if (size === 'sm') return
													handleSubcategoryLoad(category)
												}}
												className={
													activeSubCategory?.slug === category.slug ? 'keep-hover' : ''
												}
											>
												{category.title}
											</DropdownItem>
										))}
								</DropdownColumn>
							)}
						</AnimatePresence>

						{/* products */}
						<AnimatePresence mode="wait">
							{activeCategory && activeSubCategory && (products?.docs?.length ?? 0) > 0 && (
								<DropdownColumn
									className={cn('overflow-y-auto', size === 'lg' && 'z-30')}
									key="productsPanel"
									style={{
										height: `calc(100dvh - ${allTopBarsHeight}px)`,
									}}
									size={size}
								>
									<DropdownLabel
										key={activeSubCategory?.slug}
										className="flex items-center justify-between"
									>
										<span>
											{activeSubCategory?.title ??
												matchLang({
													[Lang.English]: 'Product category',
													[Lang.Vietnamese]: 'Danh mục sản phẩm',
												})(locale)}
										</span>
										<button
											aria-label={matchLang({
												[Lang.English]: 'Close products',
												[Lang.Vietnamese]: 'Đóng sản phẩm',
											})(locale)}
											onClick={() => {
												setOpen(true)
												setActiveSubCategory(null)
											}}
											onMouseEnter={() => setClickAnywhereToClose(false)}
											onMouseLeave={() => setClickAnywhereToClose(true)}
										>
											<X size={20} />
										</button>
									</DropdownLabel>
									{products?.docs.map((product, index) => {
										return (
											<motion.button
												key={`${activeSubCategory?.slug}-${product.slug}`}
												custom={index}
												variants={itemAnimationVariants}
												initial="initial"
												animate="animate"
												exit="exit"
												onClick={(e) => e.stopPropagation()} // Prevent closing dropdown
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
														{getPriceRange(product) ??
															matchLang({
																[Lang.English]: 'Out of stock',
																[Lang.Vietnamese]: 'Hết hàng',
															})(locale)}
													</div>
													<HeadlessImage
														media={product.icon}
														alt={matchLang({
															[Lang.English]: 'Product Icon',
															[Lang.Vietnamese]: 'Biểu tượng sản phẩm',
														})(locale)}
														placeholder={{ width: 200, height: 200 }}
														className="size-[5.25rem] object-contain"
														style={{ gridArea: 'image' }}
													/>
												</Link>
											</motion.button>
										)
									})}
								</DropdownColumn>
							)}
						</AnimatePresence>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
