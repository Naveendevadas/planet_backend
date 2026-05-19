// import type { CollectionConfig } from 'payload'

// const Parking: CollectionConfig = {
//   slug: 'parking',

//   admin: {
//     useAsTitle: 'slotNumber',
//     defaultColumns: ['slotNumber', 'vehicleType', 'status'],
//   },

//   access: {
//     read: () => true, // anyone can see availability

//     create: ({ req }) => {
//       const user = req.user as any
//       return ['admin', 'super_admin'].includes(user?.role)
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
//     // ✅ SLOT NUMBER
//     {
//       name: 'slotNumber',
//       type: 'text',
//       required: true,
//       unique: true,
//     },

//     // 🚗 VEHICLE TYPE
//     {
//       name: 'vehicleType',
//       type: 'select',
//       required: true,
//       options: [
//         { label: 'Bike', value: 'bike' },
//         { label: 'Car', value: 'car' },
//         { label: 'Other', value: 'other' },
//       ],
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

//     // 👤 OPTIONAL: LINK CUSTOMER
//     {
//       name: 'customer',
//       type: 'relationship',
//       relationTo: 'customers',
//     },

//     // 🔢 VEHICLE NUMBER
//     {
//       name: 'vehicleNumber',
//       type: 'text',
//     },
//   ],

//   timestamps: true,
// }

// export default Parking