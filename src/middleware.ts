import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	switch (request.nextUrl.pathname) {
		case '/':
			return Response.redirect(new URL('/home', request.url), 307)
		case '/posts':
			return Response.redirect(new URL('/events', request.url), 307)
		default:
			// return undefined
			const headers = new Headers(request.headers)
			headers.set('x-current-path', request.nextUrl.pathname)
			return NextResponse.next({
				request: {
					headers,
				},
			})
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
