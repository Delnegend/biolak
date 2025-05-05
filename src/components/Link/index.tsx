import Link from 'next/link'
import React from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'
import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
	appearance?: 'inline' | ButtonProps['variant']
	children?: React.ReactNode
	className?: string
	label?: string | null
	newTab?: boolean | null
	reference?: {
		relationTo: 'pages' | 'posts'
		value: Page | Post | string | number
	} | null
	size?: ButtonProps['size'] | null
	type?: 'custom' | 'reference' | null
	url?: string | null
}

export function CMSLink(props: CMSLinkType): React.JSX.Element {
	const appearance = props.appearance ?? 'inline'

	const href =
		props.type === 'reference' &&
		typeof props.reference?.value === 'object' &&
		props.reference.value.slug
			? `${props.reference?.relationTo !== 'pages' ? `/${props.reference?.relationTo}` : ''}/${
					props.reference.value.slug
				}`
			: props.url

	if (!href) return <></>

	const size = appearance === 'link' ? 'clear' : props.size
	const newTabProps = props.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

	/* Ensure we don't break any styles set by richText */
	if (appearance === 'inline') {
		return (
			<Link className={props.className} href={href || props.url || ''} {...newTabProps}>
				{props.label && props.label}
				{props.children && props.children}
			</Link>
		)
	}

	return (
		<Button asChild className={props.className} size={size} variant={appearance}>
			<Link className={props.className} href={href || props.url || ''} {...newTabProps}>
				{props.label && props.label}
				{props.children && props.children}
			</Link>
		</Button>
	)
}
