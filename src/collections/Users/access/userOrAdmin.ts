import type { Access } from 'payload'
import type { FieldAccess } from 'payload'
import { checkRole } from './checkRole'

export const userOrAdmin: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }

    return {
      id: { equals: user.id },
    }
  }

  return false
}
