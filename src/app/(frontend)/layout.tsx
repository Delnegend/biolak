import './globals.css'

import type { Metadata } from 'next'
import { Crimson_Pro, Manrope } from 'next/font/google'
import { draftMode, headers as getHeaders } from 'next/headers'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Toaster } from '@/components/ui/sonner'
import { FloatingGlobalComponent } from '@/globals/Floating/Component'
import { HeaderGlobalComponent } from '@/globals/Header/Component'
import { PromoGlobalComponent } from '@/globals/Promo/Component'
import { CartContextProvider } from '@/hooks/useCartManager'
import { getServerSideURL } from '@/utilities/getURL'
import { HeaderName } from '@/utilities/headerName'
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
	const [{ isEnabled }, headers] = await Promise.all([draftMode(), getHeaders()])
	const pathname = headers.get(HeaderName.CurrentPath)

	return (
		<html
			className={cn(manrope.variable, crimsonPro.variable, `font-sans`)}
			data-theme="light"
			suppressHydrationWarning
		>
			<head>
				<link href="/favicon.ico" rel="icon" />
			</head>
			<body>
				<CartContextProvider>
					<Toaster theme="light" />
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
						</>
					)}
					<FloatingGlobalComponent />
					{children}
				</CartContextProvider>
			</body>
		</html>
	)
}

export async function generateMetadata(): Promise<Metadata> {
	return {
		metadataBase: new URL(getServerSideURL()),
		openGraph: await mergeOpenGraph(),
		twitter: {
			card: 'summary_large_image',
			creator: '@payloadcms',
		},
	}
}
