import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname === '/') {
		return Response.redirect(new URL('/home', request.url), 307)
	}

	switch (request.nextUrl.pathname) {
		case '/':
			return Response.redirect(new URL('/home', request.url), 307)
		case '/posts':
			return Response.redirect(new URL('/events', request.url), 307)
		default:
			return undefined
	}
}

export const config = {
	matcher: ['/', '/posts'],
}
