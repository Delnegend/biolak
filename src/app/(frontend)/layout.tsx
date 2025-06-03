import './globals.css'

import type { Metadata } from 'next'
import { Crimson_Pro, Manrope } from 'next/font/google'
import { draftMode } from 'next/headers'
import { headers as getHeaders } from 'next/headers'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Toaster } from '@/components/ui/sonner'
import { FloatingGlobalComponent } from '@/globals/Floating/Component'
import { HeaderGlobalComponent } from '@/globals/Header/Component'
import { PromoGlobalComponent } from '@/globals/Promo/Component'
import { CartContextProvider } from '@/hooks/useCartManager'
import { ClientLangContextProvider } from '@/hooks/useClientLang'
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
				<link href="/favicon.ico" rel="icon" sizes="32x32" />
				<link href="/favicon.svg" rel="icon" type="image/svg+xml" />
			</head>
			<body>
				<CartContextProvider>
					<ClientLangContextProvider>
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
					</ClientLangContextProvider>
				</CartContextProvider>
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
