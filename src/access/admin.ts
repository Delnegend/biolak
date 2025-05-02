type GenericArgs = {
	req: {
		user: {
			role?: null | 'admin' | 'customer'
		} | null
	}
}

export function admin(args: GenericArgs): boolean {
	return args.req.user?.role === 'admin'
}
