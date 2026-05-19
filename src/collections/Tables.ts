// import type { CollectionConfig } from 'payload'

// export const Tables: CollectionConfig = {
//   slug: 'tables',

//   admin: {
//     useAsTitle: 'tableNumber',
//     defaultColumns: ['tableNumber', 'capacity', 'status'],
//   },

//   access: {
//     read: () => true, // anyone can view tables

//     create: ({ req }) =>
//       ['admin', 'super_admin'].includes((req.user as any)?.role),

//     update: ({ req }) =>
//       ['admin', 'super_admin'].includes((req.user as any)?.role),

//     delete: ({ req }) =>
//       (req.user as any)?.role === 'super_admin',
//   },

//   fields: [
//     // ✅ TABLE NUMBER
//     {
//       name: 'tableNumber',
//       type: 'number',
//       required: true,
//       unique: true,
//     },

//     // ✅ CAPACITY
//     {
//       name: 'capacity',
//       type: 'number',
//       required: true,
//       min: 1,
//     },

//     // ✅ STATUS
//     {
//       name: 'status',
//       type: 'select',
//       defaultValue: 'available',
//       options: [
//         { label: 'Available', value: 'available' },
//         { label: 'Reserved', value: 'reserved' },
//         { label: 'Occupied', value: 'occupied' },
//       ],
//     },

//     // ✅ LOCATION (OPTIONAL)
//     {
//       name: 'location',
//       type: 'text',
//       admin: {
//         description: 'Example: Window, AC Hall, Outdoor',
//       },
//     },
//   ],

//   timestamps: true,
// }