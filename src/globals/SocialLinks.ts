import { GlobalConfig } from 'payload'
import { hideForUsersGlobal } from './access/hideForUsersGlobal'
import { anyone } from '@/collections/Users/access/anyone'
import editor from '@/collections/Users/access/editor'

export const SocialLinks: GlobalConfig = {
  slug: 'social-links',
  label: 'Social Links',
  admin: { hidden: hideForUsersGlobal },
  access: {
    read: anyone,
    update: editor,
  },
  fields: [
    {
      name: 'whatsapp',
      label: 'WhatsApp',
      type: 'text',
      required: false,
    },
    {
      name: 'facebook',
      label: 'Facebook',
      type: 'text',
      required: false,
    },
    {
      name: 'instagram',
      label: 'Instagram',
      type: 'text',
      required: false,
    },
    {
      name: 'twitter',
      label: 'Twitter',
      type: 'text',
      required: false,
    },
  ],
}
