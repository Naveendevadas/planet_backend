// import type { CollectionConfig } from 'payload'

// export const Reviews: CollectionConfig = {
//   slug: 'reviews',

//   admin: {
//     useAsTitle: 'id',
//     defaultColumns: ['customer', 'rating', 'status'],
//   },

//   access: {
//     read: () => true, // anyone can see reviews

//     create: ({ req }) => {
//       const user = req.user as any
//       return user?.collection === 'customers' // only customers can review
//     },

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

//     // ✅ OPTIONAL: LINK TO ORDER
//     {
//       name: 'order',
//       type: 'relationship',
//       relationTo: 'orders',
//     },

//     // ✅ OPTIONAL: LINK TO RESTAURANT
//     {
//       name: 'restaurant',
//       type: 'relationship',
//       relationTo: 'restaurant',
//     },

//     // ⭐ RATING (1–5)
//     {
//       name: 'rating',
//       type: 'number',
//       required: true,
//       min: 1,
//       max: 5,
//     },

//     // 📝 COMMENT
//     {
//       name: 'comment',
//       type: 'textarea',
//       required: true,
//     },

//     // ✅ STATUS (ADMIN APPROVAL 🔥)
//     {
//       name: 'status',
//       type: 'select',
//       defaultValue: 'pending',
//       options: [
//         { label: 'Pending', value: 'pending' },
//         { label: 'Approved', value: 'approved' },
//         { label: 'Rejected', value: 'rejected' },
//       ],
//     },
//   ],

//   timestamps: true,
// }