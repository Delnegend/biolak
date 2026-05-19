import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

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
			new URL('https://placehold.co/**'),
		],
		qualities: [75, 85, 90, 95, 100],
	},
	reactStrictMode: true,
	redirects,
	images: {
		formats: ['image/avif', 'image/webp'],
	},
	output: 'standalone',
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
