import type { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,  // ✅ Allow public read
  },
  upload: true,        // ✅ Simple upload config for Payload v3
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}

export default Media