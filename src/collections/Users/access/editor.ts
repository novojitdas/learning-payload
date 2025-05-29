import type { Access, FieldAccess } from 'payload'
import { checkRole } from './checkRole'

export const editor: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'editor'], user)) {
      return true
    }
  }

  return false
}

export const editorFieldAccess: FieldAccess = ({ req: { user } }) => {
  return user ? checkRole(['admin', 'editor'], user) : false
}
