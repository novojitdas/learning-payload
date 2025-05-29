import type { Access } from 'payload'
import type { FieldAccess } from 'payload'
import { checkRole } from './checkRole'

export const admin: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }
  }

  return false
}

export const adminFieldAccess: FieldAccess = ({ req: { user } }) => {
  return user ? checkRole(['admin'], user) : false
}
