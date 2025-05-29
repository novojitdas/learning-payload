import type { User } from 'payload'
import { checkRole } from './checkRole'

export function hideForUsers({ user }: { user?: User }) {
  const allowedRoles: User['roles'] = ['admin', 'editor']
  return !checkRole(allowedRoles, user as any)
}
