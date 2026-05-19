import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',

  auth: true, // ✅ keep this

  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'staffType', 'status'],
  },

  access: {
    read: ({ req }) => {
      const user = req.user as any
      if (!user) return false

      if (['admin', 'super_admin'].includes(user.role)) return true

      // staff can see only themselves
      return {
        id: {
          equals: user.id,
        },
      }
    },

    create: ({ req, data }) => {
      const user = req.user as any
      if (!user) return false

      if (user.role === 'super_admin') return true
      if (user.role === 'admin' && data?.role === 'staff') return true

      return false
    },

    update: ({ req, data }) => {
      const user = req.user as any
      if (!user) return false

      if (user.role === 'super_admin') return true

      if (user.role === 'admin') {
        if (data?.role === 'super_admin') return false
        return true
      }

      return false
    },

    delete: ({ req }) => {
      const user = req.user as any
      return user?.role === 'super_admin'
    },
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'staff',
      options: [
        { label: 'Super Admin', value: 'super_admin' },
        { label: 'Admin', value: 'admin' },
        { label: 'Staff', value: 'staff' },
      ],
    },
    {
      name: 'staffType',
      type: 'select',
      admin: {
        condition: (data) => data?.role === 'staff',
      },
      options: [
        { label: 'Kitchen', value: 'kitchen' },
        { label: 'Order Taking', value: 'order' },
        { label: 'Parking', value: 'parking' },
      ],
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      unique: true,
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
    {
      name: 'lastLogin',
      type: 'date',
    },
    {
      name: 'restaurant',
      type: 'relationship',
      relationTo: 'restaurant',
    }
  ],

  timestamps: true,
}