import './globals.css'

import type { Metadata } from 'next'
import { Crimson_Pro, Manrope } from 'next/font/google'
import { draftMode, headers as getHeaders } from 'next/headers'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Toaster } from '@/components/ui/sonner'
import { FloatingGlobalComponent } from '@/globals/Floating/Component'
import { HeaderGlobalComponent } from '@/globals/Header/Component'
import { PromoGlobalComponent } from '@/globals/Promo/Component'
import { CartContextProvider } from '@/hooks/useCartManager'
import { routing } from '@/i18n/routing'
import { Lang } from '@/i18n/routing'
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

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}) {
	const locale = (await params).locale as Lang
	const [{ isEnabled }, headers, messages] = await Promise.all([
		draftMode(),
		getHeaders(),
		getMessages(),
	])
	const pathname = headers.get(HeaderName.CurrentPath)

	return (
		<html
			className={cn(manrope.variable, crimsonPro.variable, `font-sans`)}
			data-theme="light"
			lang={locale}
			suppressHydrationWarning
		>
			<head>
				<link href="/favicon.ico" rel="icon" />
			</head>
			<body>
				<NextIntlClientProvider messages={messages}>
					<CartContextProvider>
						<Toaster theme="light" />
						<AdminBar
							adminBarProps={{
								preview: isEnabled,
							}}
						/>
						{pathname === `/${locale}/checkout` ? (
							<></>
						) : (
							<>
								<PromoGlobalComponent locale={locale} />
								<HeaderGlobalComponent locale={locale} />
							</>
						)}
						<FloatingGlobalComponent locale={locale} />
						{children}
					</CartContextProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
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
