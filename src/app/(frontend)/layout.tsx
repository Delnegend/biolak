import './globals.css'

import type { Metadata } from 'next'
import { Crimson_Pro, Manrope } from 'next/font/google'
import { draftMode, headers } from 'next/headers'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Toaster } from '@/components/ui/sonner'
import { FloatingGlobalComponent } from '@/globals/Floating/Component'
import { HeaderGlobalComponent } from '@/globals/Header/Component'
import { PromoGlobalComponent } from '@/globals/Promo/Component'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { cn } from '@/utilities/ui'

const manrope = Manrope({
	subsets: ['vietnamese'],
	weight: ['500', '700'],
	variable: '--font-manrope',
})

const crimsonPro = Crimson_Pro({
	subsets: ['vietnamese'],
	variable: '--font-crimson-pro',
})

export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const { isEnabled } = await draftMode()
	let pathname
	try {
		const heads = await headers()
		pathname = heads.get('x-current-path')
	} catch (e) {
		pathname = undefined
	}

	return (
		<html
			className={cn(manrope.variable, crimsonPro.variable, `font-sans`)}
			lang="vi-VN"
			data-theme="light"
			suppressHydrationWarning
		>
			<head>
				<link href="/favicon.ico" rel="icon" sizes="32x32" />
				<link href="/favicon.svg" rel="icon" type="image/svg+xml" />
			</head>
			<body>
				<Toaster />
				<AdminBar
					adminBarProps={{
						preview: isEnabled,
					}}
				/>
				{pathname === '/checkout' ? (
					<></>
				) : (
					<>
						<PromoGlobalComponent />
						<HeaderGlobalComponent />
						<FloatingGlobalComponent />
					</>
				)}
				{children}
			</body>
		</html>
	)
}

export const metadata: Metadata = {
	metadataBase: new URL(getServerSideURL()),
	openGraph: mergeOpenGraph(),
	twitter: {
		card: 'summary_large_image',
		creator: '@payloadcms',
	},
}
