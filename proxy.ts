import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from '@/i18n/routing'

const handleI18n = createMiddleware(routing)

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl
	if (
		pathname.startsWith('/admin') ||
		pathname.startsWith('/api') ||
		pathname.startsWith('/_next') ||
		pathname.startsWith('/_vercel')
	) {
		return NextResponse.next()
	}
	return handleI18n(request)
}

export const config = {
	matcher: ['/((?!.*\\..*).*)'],
}
