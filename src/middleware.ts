import { NextRequest, NextResponse } from 'next/server'

import { HeaderName } from './utilities/headerName'

export function middleware(request: NextRequest) {
	switch (request.nextUrl.pathname) {
		case '/':
			return Response.redirect(new URL('/home', request.url), 307)
		case '/posts':
			return Response.redirect(new URL('/events', request.url), 307)
		case '/search':
			return Response.redirect(new URL('/home', request.url), 307)
		default:
			// return undefined
			const headers = new Headers(request.headers)
			headers.set(HeaderName.CurrentPath, request.nextUrl.pathname)
			headers.set(HeaderName.RequestQuery, request.nextUrl.search)
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
