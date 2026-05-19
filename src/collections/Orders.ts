// import type { CollectionConfig } from 'payload';

// const Orders: CollectionConfig = {
//   slug: 'orders',

//   admin: {
//     useAsTitle: 'id',
//   },

//   access: {
//     read: ({ req }) => !!req.user, // only logged in
//   },

//   hooks: {
//     beforeChange: [
//       async ({ data, req }) => {

//         let total = 0;

//         for (const item of data.items || []) {
//           const menuItem = await req.payload.findByID({
//             collection: 'menu',
//             id: item.menuItem,
//           });

//           total += menuItem.price * item.quantity;
//         }

//         data.totalPrice = total;

//         return data;
//       },
//     ],
//   },

//   fields: [
//     // ✅ CUSTOMER (FIXED)
//     {
//       name: 'customer',
//       type: 'relationship',
//       relationTo: 'customers',
//       required: true,
//     },

//     // ✅ TABLE (RELATION - FIXED)
//     {
//       name: 'table',
//       type: 'relationship',
//       relationTo: 'tables',
//     },

//     // ✅ ITEMS
//     {
//       name: 'items',
//       type: 'array',
//       required: true,
//       fields: [
//         {
//           name: 'menuItem',
//           type: 'relationship',
//           relationTo: 'menu',
//           required: true,
//         },
//         {
//           name: 'quantity',
//           type: 'number',
//           required: true,
//           defaultValue: 1,
//           min: 1,
//         },
//       ],
//     },

//     // ✅ TOTAL PRICE (AUTO)
//     {
//       name: 'totalPrice',
//       type: 'number',
//     },

//     // ✅ ORDER STATUS (FIXED FLOW 🔥)
//     {
//       name: 'status',
//       type: 'select',
//       defaultValue: 'pending',
//       options: [
//         { label: 'Pending', value: 'pending' },
//         { label: 'Preparing', value: 'preparing' },
//         { label: 'Ready', value: 'ready' },
//         { label: 'Served', value: 'served' },
//         { label: 'Cancelled', value: 'cancelled' },
//       ],
//     },

//     // ✅ PAYMENT STATUS (NEW 🔥)
//     {
//       name: 'paymentStatus',
//       type: 'select',
//       defaultValue: 'pending',
//       options: [
//         { label: 'Pending', value: 'pending' },
//         { label: 'Paid', value: 'paid' },
//         { label: 'Failed', value: 'failed' },
//       ],
//     },

//     // ✅ ASSIGNED STAFF (NEW 🔥)
//     {
//       name: 'assignedStaff',
//       type: 'relationship',
//       relationTo: 'users',
//     },

//     // ✅ NOTES (OPTIONAL)
//     {
//       name: 'notes',
//       type: 'textarea',
//     },
//   ],

//   timestamps: true,
// };

// export default Orders;