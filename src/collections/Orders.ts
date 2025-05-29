import { CollectionConfig, CollectionBeforeChangeHook, Validate } from 'payload'
import { anyone } from './Users/access/anyone'
import { user } from './Users/access/user'
import { editor, editorFieldAccess } from './Users/access/editor'
import { admin } from './Users/access/admin'
import { operations } from 'node_modules/payload/dist/query-presets/types'

// Function to generate unique order number
const generateOrderNumber = async (): Promise<string> => {
  const now = new Date()
  const timestamp = now.getTime().toString()
  return `ORD-${timestamp}`
}

// Hook to assign order number
const assignOrderNumber: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
  if (operation === 'create' && !data.orderNumber) {
    data.orderNumber = await generateOrderNumber()
  }
  return data
}

// validate a phone number
const validatePhone: Validate = (value) => {
  if (typeof value !== 'number') return 'Phone must be numbers'
  if (!/^\d{11}$/.test(value)) {
    return 'Phone number must be exactly 11 digits and contain only numbers'
  }
  return true
}

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
  },
  access: {
    create: anyone,
    read: user,
    update: editor,
    delete: admin,
  },
  hooks: {
    beforeChange: [assignOrderNumber],
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'products',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
          defaultValue: 1,
        },
      ],
    },
    {
      name: 'shippingAddress',
      type: 'group',
      fields: [
        { name: 'fullName', type: 'text', required: true },
        {
          name: 'phone',
          type: 'number',
          required: true,
          defaultValue: '',
          validate: validatePhone,
          admin: {
            placeholder: '01XXXXXXXXX',
          },
        },
        { name: 'fullAddress', type: 'text', required: true },
        { name: 'upzilla', type: 'text' },
        { name: 'district', type: 'text', required: true },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      defaultValue: 'pending',
      access: {
        read: editorFieldAccess,
        update: editorFieldAccess,
      },
    },
    {
      name: 'paymentStatus',
      type: 'select',
      options: ['unpaid', 'paid', 'refunded'],
      defaultValue: 'unpaid',
      access: {
        read: editorFieldAccess,
        update: editorFieldAccess,
      },
    },
  ],
  timestamps: true,
}
