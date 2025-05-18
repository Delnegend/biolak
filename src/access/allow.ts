export enum Role {
	NoOne,
	Public,
	Admin = 'admin',
	SalesManager = 'sales-manager',
	ContentManager = 'content-manager',
}

export function allow(
	...roles: Role[]
): ({ req: { user } }: { req: { user?: { role?: string } | null } }) => boolean {
	return function ({ req: { user } }) {
		if ((roles.includes(Role.NoOne) || roles.includes(Role.Public)) && roles.length > 1)
			throw new Error('NoOne and Public cannot be used with any other roles')

		if (roles.includes(Role.NoOne)) return false
		if (roles.includes(Role.Public) || user?.role === Role.Admin) return true

		return (roles as (string | undefined)[]).includes(user?.role)
	}
}
