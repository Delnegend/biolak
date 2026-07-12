import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

import redirects from './redirects.js'

const withNextIntl = createNextIntlPlugin()

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
	? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
	: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
	allowedDevOrigins: ['127.0.0.1'],
	images: {
		remotePatterns: [
			(() => {
				const url = new URL(NEXT_PUBLIC_SERVER_URL)

				return {
					hostname: url.hostname,
					protocol: url.protocol.replace(':', ''),
				}
			})(),
			{
				hostname: 'placehold.co',
				protocol: 'https',
			},
		],
		formats: ['image/avif', 'image/webp'],
		qualities: [75, 85, 90, 95, 100],
	},
	reactStrictMode: true,
	redirects,
	output: 'standalone',
	outputFileTracingIncludes: {
		'/**': [
			'./node_modules/.pnpm/@libsql+*/**',
			'./node_modules/.pnpm/libsql@*/**',
			'./node_modules/.pnpm/ws@*/**',
			'./node_modules/.pnpm/detect-libc@*/**',
			'./node_modules/.pnpm/js-base64@*/**',
			'./node_modules/.pnpm/promise-limit@*/**',
			'./node_modules/.pnpm/semver@*/**',
			'./node_modules/.pnpm/pino@*/**',
			'./node_modules/.pnpm/pino-std-serializers@*/**',
			'./node_modules/.pnpm/pino-pretty@*/**',
			'./node_modules/.pnpm/@neon-rs+*/**',
		],
	},
}

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false })
