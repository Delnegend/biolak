'use client'

import './index.scss'

import type { PayloadAdminBarProps, PayloadMeUser } from '@payloadcms/admin-bar'
import { PayloadAdminBar } from '@payloadcms/admin-bar'
import { useSelectedLayoutSegments } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'

const baseClass = 'admin-bar'

const collectionLabels = {
	pages: {
		plural: 'Pages',
		singular: 'Page',
	},
	posts: {
		plural: 'Posts',
		singular: 'Post',
	},
	projects: {
		plural: 'Projects',
		singular: 'Project',
	},
}

export function Title(): React.JSX.Element {
	return <span>Dashboard</span>
}

export function AdminBar({
	adminBarProps,
}: {
	adminBarProps?: PayloadAdminBarProps
}): React.JSX.Element {
	const segments = useSelectedLayoutSegments()
	const [show, setShow] = useState(false)
	const collection = (
		collectionLabels[segments?.[1] as keyof typeof collectionLabels] ? segments[1] : 'pages'
	) as keyof typeof collectionLabels
	const router = useRouter()

	const onAuthChange = React.useCallback((user: PayloadMeUser) => {
		setShow(!!user?.id)
	}, [])

	return (
		<div
			className={cn(baseClass, 'bg-black py-2 text-white', {
				block: show,
				hidden: !show,
			})}
		>
			<div className="container">
				<PayloadAdminBar
					{...adminBarProps}
					className="py-2 text-white"
					classNames={{
						controls: 'font-medium text-white',
						logo: 'text-white',
						user: 'text-white',
					}}
					cmsURL={getClientSideURL()}
					collectionSlug={collection}
					collectionLabels={{
						plural: collectionLabels[collection]?.plural || 'Pages',
						singular: collectionLabels[collection]?.singular || 'Page',
					}}
					logo={<Title />}
					onAuthChange={onAuthChange}
					onPreviewExit={() => {
						fetch('/next/exit-preview').then(() => {
							router.push('/')
							router.refresh()
						})
					}}
					style={{
						backgroundColor: 'transparent',
						padding: 0,
						position: 'relative',
						zIndex: 'unset',
					}}
				/>
			</div>
		</div>
	)
}
