import { AccessArgs } from 'payload'

import { User } from '@/payload-types'

export function customer(args: AccessArgs<User>): boolean {
	return args.req.user?.role === 'customer'
}
