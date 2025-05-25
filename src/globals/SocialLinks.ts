import { GlobalConfig } from 'payload'

export const SocialLinks: GlobalConfig = {
  slug: 'social-links',
  label: 'Social Links',
  access: {
    read: () => true,
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
