import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',

  auth: {
    loginWithUsername: true,
  },

  admin: {
    useAsTitle: 'phone',
    defaultColumns: ['name', 'phone', 'status'],
  },

  access: {
    create: () => true,

    read: ({ req }) => {
      const user = req.user as any
      if (user?.collection === 'customers') return true
      return ['admin', 'super_admin'].includes(user?.role)
    },

    update: ({ req }) => {
      const user = req.user as any
      if (user?.collection === 'customers') return true
      return ['admin', 'super_admin'].includes(user?.role)
    },

    delete: ({ req }) => {
      const user = req.user as any
      return ['admin', 'super_admin'].includes(user?.role)
    },
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true, // ✅ FIXED
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'email',
      type: 'email',
      unique: true, // ✅ optional but recommended
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'lastLogin',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Blocked', value: 'blocked' },
      ],
    },
  ],

  timestamps: true,
}