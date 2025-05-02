import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname === '/') {
		return Response.redirect(new URL('/home', request.url), 307)
	}
}

export const config = {
	matcher: '/:path*',
}
