import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/globals/Footer/Component'
import { Header } from '@/globals/Header/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import { Promo } from '@/globals/Promo/Component'
import { getServerSideURL } from '@/utilities/getURL'
import { Crimson_Pro, Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['vietnamese'],
  weight: ['500', '700'],
  variable: '--font-manrope',
})

const crimsonPro = Crimson_Pro({
  subsets: ['vietnamese'],
  variable: '--font-crimson-pro',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

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
        <AdminBar
          adminBarProps={{
            preview: isEnabled,
          }}
        />
        <Promo />
        <Header />
        {children}
        <Footer />
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
