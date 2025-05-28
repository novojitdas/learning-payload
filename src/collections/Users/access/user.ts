import type { Access } from 'payload'
import type { FieldAccess } from 'payload'
import { checkRole } from './checkRole'

export const user: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'editor'], user)) {
      return true
    }

    return {
      id: { equals: user.id },
    }
  }

  return false
}

export const userFieldAccess: FieldAccess = ({ req: { user }, id }) => {
  if (!user) return false

  if (checkRole(['admin', 'editor'], user)) {
    return true
  }

  // Only allow if the document being accessed belongs to the user
  return id === user.id
}
