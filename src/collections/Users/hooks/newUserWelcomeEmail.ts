import { sendCreatedCustomerAccountEmail, sendCreatedUserAccountEmail } from '@/utils/mailerModule'
import { AfterChangeHook } from 'node_modules/payload/dist/collections/config/types'

// AfterChangeHook
export const newUserWelcomeEmail: AfterChangeHook = async ({ doc, operation }) => {
  if (operation === 'create') {
    try {
      const roles = doc.roles || []

      if (roles.includes('admin') || roles.includes('editor')) {
        await sendCreatedUserAccountEmail(doc.email, doc.name, roles.join(', '))
      } else {
        await sendCreatedCustomerAccountEmail(doc.email, doc.name)
      }
    } catch (err) {
      console.error('Failed to send welcome email:', err)
    }
  }
}
