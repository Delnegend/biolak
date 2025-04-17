import type { User } from '@/payload-types'
import type { AccessArgs } from 'payload'

export function admin(args: AccessArgs<User>): boolean {
  return args.req.user?.role === 'admin'
}
