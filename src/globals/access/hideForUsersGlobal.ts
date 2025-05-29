import { checkRole } from '@/collections/Users/access/checkRole'
import type { User } from '@/payload-types'

export function hideForUsersGlobal({
  user,
}: {
  user: (User & { collection: 'users' }) | null
}): boolean {
  const allowedRoles: User['roles'] = ['admin', 'editor']
  return !checkRole(allowedRoles, user as User)
}
