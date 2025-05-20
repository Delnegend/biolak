import Link from 'next/link'
import React from 'react'

import { PagesSlug } from '@/collections/Pages/slug'
import { PostCategoriesSlug } from '@/collections/PostCategories/slug'
import { PostsSlug } from '@/collections/Posts/slug'
import { ProductCategoriesSlug } from '@/collections/ProductCategories/slug'
import { ProductsSlug } from '@/collections/Products/slug'
import { ProductSubCategoriesSlug } from '@/collections/ProductSubCategories/slug'
import { type ButtonProps } from '@/components/ui/button'
import { LinkFieldRelationsType } from '@/fields/link'
import type { Page, Post, PostCategory, ProductCategory, ProductSubCategory } from '@/payload-types'

/**
 * Due to TS behavior, the `type` prop must be assigned seperately
 *
 * ```tsx
 * <CMSLink {...props.link} type={props.link.type ?? undefined} />
 * ```
 */
export function CMSLink(
	props: {
		children?: React.ReactNode
		className?: string
		label?: string | null
		newTab?: boolean | null
		reference?: {
			relationTo?: LinkFieldRelationsType
			value: Page | Post | PostCategory | ProductCategory | ProductSubCategory | string | number
		} | null
		size?: ButtonProps['size'] | null
		type?: 'custom' | 'reference' | null
		url?: string | null
	} & Omit<React.ComponentPropsWithRef<typeof Link>, 'as' | 'href'>,
): React.JSX.Element {
	const { reference, type, newTab, url, ...rest } = props

	let href = '#'
	if (type === 'reference' && typeof reference?.value === 'object') {
		const slug = reference?.value.slug
		switch (reference?.relationTo) {
			case PagesSlug:
				href = `/${slug}`
				break
			case PostsSlug:
				href = `/post/${slug}`
				break
			case PostCategoriesSlug:
				href = `/posts/${slug}`
				break
			case ProductsSlug:
				href = `/product/${slug}`
				break
			case ProductCategoriesSlug:
				href = `/products/${slug}`
				break
			case ProductSubCategoriesSlug:
				href = `/products/${slug}`
				break
		}
	} else if (url) {
		href = url
	}

	const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

	return (
		<Link className={props.className} href={href} {...rest} {...newTabProps}>
			{props.label && props.label}
			{props.children && props.children}
		</Link>
	)
}
