import { NextRequest, NextResponse } from 'next/server'

import { HeaderName } from './utilities/headerName'

export function middleware(request: NextRequest) {
	switch (request.nextUrl.pathname) {
		case '/':
			return Response.redirect(new URL('/home', request.url), 307)
		case '/search':
			return Response.redirect(new URL('/home', request.url), 307)
		case '/admin/collections/products':
			const sort = request.nextUrl.searchParams.get('sort')
			if (!sort || sort === 'orders') {
				const url = new URL(request.url)
				url.searchParams.set('sort', 'title')
				return NextResponse.rewrite(url)
			}
			const headers = new Headers(request.headers)
			headers.set(HeaderName.CurrentPath, request.nextUrl.pathname)
			return NextResponse.next({
				request: {
					headers,
				},
			})
		default:
			const headersDefault = new Headers(request.headers)
			headersDefault.set(HeaderName.CurrentPath, request.nextUrl.pathname)
			return NextResponse.next({
				request: {
					headers: headersDefault,
				},
			})
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
