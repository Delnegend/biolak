'use client'
import { AnimatePresence, motion, Variants } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PaginatedDocs } from 'payload'
import React, { useEffect, useRef, useState } from 'react'

import { Product, ProductCategory, ProductSubCategory } from '@/payload-types'
import { formatPrice } from '@/utilities/formatPrice'
import { cn } from '@/utilities/ui'

import { getProductsBySubCategory } from '../actions/getProductsBySubCategory'

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
}: React.ComponentPropsWithRef<typeof motion.div>): React.JSX.Element {
	return (
		<motion.div
			variants={panelAnimationVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className={cn('flex w-1/3 flex-col gap-1 bg-primary-foreground px-20 py-12', className)}
		>
			{children}
		</motion.div>
	)
}

export function INTERNAL_ProductsDropdownClient({
	categories,
	label,
}: {
	categories: PaginatedDocs<ProductCategory>
	label?: string
}): React.JSX.Element {
	const [open, setOpen] = useState(false)
	const dropdownElement = useRef<HTMLDivElement | null>(null)

	const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null)
	const [activeSubCategory, setActiveSubCategory] = useState<ProductSubCategory | null>(null)
	const [activeProducts, setActiveProducts] = useState<Product[] | null>(null)

	function handleCategoryLoad(category: ProductCategory) {
		setActiveCategory(category)
		setActiveSubCategory(null)
		setActiveProducts(null)
	}

	async function handleSubcategoryLoad(subCategory: ProductSubCategory) {
		setActiveSubCategory(subCategory)
		setActiveProducts(null)
		if (!subCategory.slug) return
		setActiveProducts(await getProductsBySubCategory(subCategory.slug))
	}

	// find the minimum height for the dropdown for it to fill the screen perfectly
	const spaceAbove = useRef(0)
	useEffect(() => {
		document.body.style.overflowY = open ? 'hidden' : 'auto'
		if (!dropdownElement.current) return
		if (spaceAbove.current === 0)
			spaceAbove.current = dropdownElement.current.getBoundingClientRect().top ?? 0
		dropdownElement.current.style.minHeight = `calc(100dvh - ${spaceAbove.current}px)`
	}, [open])

	// clear active things when closed
	useEffect(() => {
		if (open) return

		setActiveCategory(null)
		setActiveSubCategory(null)
		setActiveProducts(null)
	}, [open])

	// close on route change
	const pathname = usePathname()
	useEffect(() => {
		setOpen(false)
	}, [pathname])

	return (
		<div className="relative">
			<button onClick={() => setOpen(!open)}>{label ?? 'Sản phẩm'}</button>
			<AnimatePresence>
				{open && (
					<motion.div
						ref={dropdownElement}
						variants={panelAnimationVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						className={cn(
							'absolute left-[-6.5rem] top-[3.25rem] flex w-dvw border-t bg-black/85',
						)}
						onClick={(e) => {
							if (e.target === dropdownElement.current) {
								setOpen(false)
							}
						}}
					>
						{/* categories */}
						<DropdownColumn className="z-50 border-r" key="categories">
							<DropdownLabel key="categories">Sản phẩm</DropdownLabel>
							{categories.docs.map((category, index) => (
								<DropdownItem
									key={category.slug}
									custom={index + 1}
									onClick={(e) => {
										e.stopPropagation() // Prevent closing dropdown
										handleCategoryLoad(category)
									}}
									onMouseEnter={() => handleCategoryLoad(category)}
									className={activeCategory?.slug === category.slug ? 'keep-hover' : ''}
								>
									{category.title}
								</DropdownItem>
							))}
						</DropdownColumn>

						{/* sub categories */}
						<AnimatePresence mode="wait">
							{activeCategory?.productSubCategories?.docs?.length && (
								<DropdownColumn className="z-40 border-r" key="subCategoryPanel">
									<DropdownLabel key={activeCategory?.slug}>
										{activeCategory?.title ?? 'Danh mục sản phẩm'}
									</DropdownLabel>
									{activeCategory?.productSubCategories?.docs
										?.filter((p) => typeof p === 'object')
										.map((category, index) => (
											<DropdownItem
												key={category.slug}
												custom={index}
												onClick={(e) => {
													e.stopPropagation() // Prevent closing dropdown
													handleSubcategoryLoad(category as ProductSubCategory)
												}}
												onMouseEnter={() =>
													handleSubcategoryLoad(category as ProductSubCategory)
												}
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
							{(activeProducts?.length ?? 0) > 0 && (
								<DropdownColumn className="z-30" key="productsPanel">
									<DropdownLabel key={activeSubCategory?.slug}>
										{activeSubCategory?.title ?? 'Danh mục sản phẩm'}
									</DropdownLabel>
									{activeProducts?.map((product, index) => {
										const icon =
											product.icon && typeof product.icon === 'object'
												? product.icon
												: null

										return (
											<motion.button
												key={product.slug}
												custom={index}
												variants={itemAnimationVariants}
												initial="initial"
												animate="animate"
												exit="exit"
												onClick={(e) => e.stopPropagation()} // Prevent closing dropdown
											>
												<Link
													href={`/product/${product.slug}`}
													tabIndex={-1}
													className="group grid gap-x-4"
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
														{formatPrice(product.price)}
													</div>
													<Image
														src={icon?.url ?? 'https://placehold.co/200x200'}
														alt={icon?.alt ?? 'Product Icon'}
														width={icon?.width ?? 200}
														height={icon?.height ?? 200}
														unoptimized={!icon}
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
