import type { User } from 'payload'

export function hideForUsers({ user }: { user?: User }) {
  return !(user?.role === 'admin' || user?.role === 'editor')
}
