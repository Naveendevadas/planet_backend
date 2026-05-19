import type { CollectionConfig } from 'payload'

const Restaurant: CollectionConfig = {
  slug: 'restaurant',

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city', 'status'],
  },

  access: {
    read: () => true, // anyone can see restaurant details

    create: ({ req }) => {
      const user = req.user as any
      return user?.role === 'super_admin' // only super admin
    },

    update: ({ req }) => {
      const user = req.user as any
      return user?.role === 'super_admin'
    },

    delete: ({ req }) => {
      const user = req.user as any
      return user?.role === 'super_admin'
    },
  },

  fields: [
    // ✅ NAME
    {
      name: 'name',
      type: 'text',
      required: true,
    },

    // 📝 DESCRIPTION
    {
      name: 'description',
      type: 'textarea',
    },

    // 📍 ADDRESS
    {
      name: 'address',
      type: 'textarea',
      required: true,
    },

    // 🌆 CITY
    {
      name: 'city',
      type: 'text',
      required: true,
    },

    // 📞 CONTACT NUMBER
    {
      name: 'phone',
      type: 'text',
      required: true,
    },

    // ✉️ EMAIL
    {
      name: 'email',
      type: 'email',
    },

    // 🕒 OPENING TIME
    {
      name: 'openingTime',
      type: 'text',
      required: true,
      admin: {
        description: 'Example: 10:00 AM',
      },
    },

    // 🕒 CLOSING TIME
    {
      name: 'closingTime',
      type: 'text',
      required: true,
      admin: {
        description: 'Example: 11:00 PM',
      },
    },

    // 🖼️ IMAGE (OPTIONAL)
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },

    // ✅ STATUS
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Closed', value: 'closed' },
      ],
    },
  ],

  timestamps: true,
}

export default Restaurant