'use client'
import { AnimatePresence, motion } from 'motion/react'
import { PaginatedDocs } from 'payload'
import { useEffect, useRef, useState } from 'react'

import { Product, ProductCategory, ProductSubCategory } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { getProductsBySubCategory } from '../actions/getProductsBySubCategory'

const panelAnimationVariants = {
	initial: { opacity: 0, x: -30 },
	animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
	exit: { opacity: 0, x: -30, transition: { duration: 0.4, ease: 'easeInOut' } },
}

const itemAnimationVariants = {
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

export function ProductsDropdownClient({
	categories,
}: {
	categories: PaginatedDocs<ProductCategory>
}): React.JSX.Element {
	const [open, setOpen] = useState(false)
	const dropdownElement = useRef<HTMLDivElement | null>(null)

	const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null)
	const [activeSubCategory, setActiveSubCategory] = useState<ProductSubCategory | null>(null)
	const [activeProducts, setActiveProducts] = useState<Product[] | null>(null)
	const [cachedProducts, setCachedProducts] = useState<Record<string, Product[]>>({})

	function handleCategoryLoad(category: ProductCategory) {
		setActiveCategory(category)
		setActiveSubCategory(null)
		setActiveProducts(null)
	}

	async function handleSubcategoryLoad(subCategory: ProductSubCategory) {
		setActiveSubCategory(subCategory)
		setActiveProducts(null)
		if (!subCategory.slug) return

		const cached = cachedProducts[subCategory.slug]
		if (cached && cached.length > 0) {
			setActiveProducts(cached)
			return
		}

		const products = await getProductsBySubCategory(subCategory.slug)
		setCachedProducts((prev) => ({ ...prev, [String(subCategory.slug)]: products }))
		setActiveProducts(products)
	}

	// find the minimum height for the dropdown for it to fill the screen perfectly
	const spaceAbove = useRef(0)
	useEffect(() => {
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

	// clear cached products except for the active subcategory when user's browser tab is not active
	useEffect(() => {
		if (!open) return

		const handleVisibilityChange = () => {
			if (activeSubCategory) {
				setCachedProducts((prev) => ({
					...Object.fromEntries(
						Object.entries(prev).filter(([k]) => k !== activeSubCategory.slug),
					),
				}))
			}
		}
		document.addEventListener('visibilitychange', handleVisibilityChange)

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange)
		}
	}, [open, activeSubCategory])

	return (
		<div className="relative">
			<button onClick={() => setOpen(!open)}>Sản phẩm</button>
			<AnimatePresence>
				{open && (
					<motion.div
						ref={dropdownElement}
						variants={panelAnimationVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						className={cn('absolute left-[-6.5rem] top-[3.25rem] flex w-dvw bg-black/85')}
						onClick={(e) => {
							if (e.target === dropdownElement.current) {
								setOpen(false)
							}
						}}
					>
						{/* categories */}
						<div className="flex flex-col gap-1 bg-primary-foreground px-20 py-12">
							<motion.div
								variants={itemAnimationVariants}
								custom={0}
								initial="initial"
								animate="animate"
								exit="exit"
								className="whitespace-nowrap text-base font-bold"
							>
								Sản phẩm
							</motion.div>
							{categories.docs.map((category, index) => (
								<motion.button
									key={category.slug}
									custom={index + 1}
									variants={itemAnimationVariants}
									initial="initial"
									animate="animate"
									exit="exit"
									className="whitespace-nowrap text-start text-2xl font-medium"
									onClick={(e) => {
										e.stopPropagation() // Prevent closing dropdown
										handleCategoryLoad(category)
									}}
									onMouseEnter={() => handleCategoryLoad(category)}
								>
									{category.title}
								</motion.button>
							))}
						</div>

						{/* sub categories */}
						<AnimatePresence mode="wait">
							{activeCategory?.productSubCategories?.docs?.length ? (
								<motion.div
									key="subCategoryPanel"
									variants={panelAnimationVariants}
									initial="initial"
									animate="animate"
									exit="exit"
									className={cn('flex flex-col gap-1 bg-primary-foreground px-20 py-12')}
								>
									<motion.div
										variants={itemAnimationVariants}
										custom={0}
										initial="initial"
										animate="animate"
										exit="exit"
										className="whitespace-nowrap text-base font-bold"
									>
										{activeCategory?.title}
									</motion.div>
									{activeCategory?.productSubCategories?.docs
										?.filter((p) => typeof p === 'object')
										.map((category, index) => (
											<motion.button
												key={category.slug}
												custom={index + 1}
												variants={itemAnimationVariants}
												initial="initial"
												animate="animate"
												exit="exit"
												className="whitespace-nowrap text-start text-2xl font-medium"
												onClick={(e) => {
													e.stopPropagation() // Prevent closing dropdown
													handleSubcategoryLoad(category)
												}}
												onMouseEnter={() => handleSubcategoryLoad(category)}
											>
												{category.title}
											</motion.button>
										))}
								</motion.div>
							) : null}
						</AnimatePresence>

						{/* products */}
						<AnimatePresence mode="wait">
							{(activeProducts?.length ?? 0) > 0 ? (
								<motion.div
									key="productsPanel"
									variants={panelAnimationVariants}
									initial="initial"
									animate="animate"
									exit="exit"
									className={cn('flex flex-col gap-1 bg-primary-foreground px-20 py-12')}
								>
									<motion.div
										variants={itemAnimationVariants}
										initial="initial"
										animate="animate"
										custom={0}
										exit="exit"
										className="text-base font-bold"
									>
										{activeSubCategory?.title}
									</motion.div>
									{activeProducts?.map((product, index) => (
										<motion.button
											key={product.slug}
											custom={index + 1}
											variants={itemAnimationVariants}
											initial="initial"
											animate="animate"
											exit="exit"
											className="text-start text-2xl font-medium"
											onClick={(e) => e.stopPropagation()} // Prevent closing dropdown
										>
											{product.title}
										</motion.button>
									))}
								</motion.div>
							) : null}
						</AnimatePresence>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
