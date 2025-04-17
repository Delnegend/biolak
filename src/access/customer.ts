import { User } from '@/payload-types'
import { AccessArgs } from 'payload'

export function customer(args: AccessArgs<User>): boolean {
  return args.req.user?.role === 'customer'
}
