// import type { CollectionConfig } from 'payload'

// export const Reservations: CollectionConfig = {
//   slug: 'reservations',

//   admin: {
//     useAsTitle: 'id',
//     defaultColumns: ['customer', 'table', 'date', 'status'],
//   },

//   access: {
//     read: ({ req }) => {
//       const user = req.user as any

//       // Admin can see all
//       if (['admin', 'super_admin'].includes(user?.role)) return true

//       // Customer can see own reservations
//       if (user?.collection === 'customers')  {
//     return {
//       customer: {
//         equals: user.id,
//       },
//     }
//   }

//       return false
//     },

//     create: () => true, // customers can book

//     update: ({ req }) => {
//       const user = req.user as any
//       return ['admin', 'super_admin'].includes(user?.role)
//     },

//     delete: ({ req }) => {
//       const user = req.user as any
//       return user?.role === 'super_admin'
//     },
//   },

//   fields: [
//     // ✅ CUSTOMER
//     {
//       name: 'customer',
//       type: 'relationship',
//       relationTo: 'customers',
//       required: true,
//     },

//     // ✅ TABLE (REQUIRED)
//     {
//       name: 'table',
//       type: 'relationship',
//       relationTo: 'tables',
//       required: true,
//     },

//     // ✅ PARKING (OPTIONAL 🔥)
//     {
//       name: 'parking',
//       type: 'relationship',
//       relationTo: 'parking',
//       required: false,
//     },

//     // ✅ DATE
//     {
//       name: 'date',
//       type: 'date',
//       required: true,
//     },

//     // ✅ TIME
//     {
//       name: 'time',
//       type: 'text',
//       required: true,
//       admin: {
//         description: 'Example: 7:00 PM - 9:00 PM',
//       },
//     },

//     // ✅ PEOPLE COUNT
//     {
//       name: 'peopleCount',
//       type: 'number',
//       required: true,
//       min: 1,
//     },

//     // ✅ STATUS
//     {
//       name: 'status',
//       type: 'select',
//       defaultValue: 'pending',
//       options: [
//         { label: 'Pending', value: 'pending' },
//         { label: 'Confirmed', value: 'confirmed' },
//         { label: 'Cancelled', value: 'cancelled' },
//         { label: 'Completed', value: 'completed' },
//       ],
//     },

//     // ✅ NOTES
//     {
//       name: 'notes',
//       type: 'textarea',
//     },
//   ],

//   timestamps: true,
// }