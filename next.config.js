import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = (() => {
	if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
		return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`

	if (process.env.NEXT_PUBLIC_SERVER_URL) return process.env.NEXT_PUBLIC_SERVER_URL

	return 'http://localhost:3000'
})()

/** @type {import('next').NextConfig} */
const nextConfig = {
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
	},
	reactStrictMode: true,
	redirects,
	experimental: {
		reactCompiler: true,
	},
	images: {
		formats: ['image/avif', 'image/webp'],
	},
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
