import type { CollectionConfig } from 'payload';

const Menu: CollectionConfig = {
  slug: 'menu',
  admin: { useAsTitle: 'name' },

  access: {
    read: () => true,
  },

  fields: [
    { name: 'name',        type: 'text',     required: true },
    { name: 'description', type: 'textarea' },
    { name: 'price',       type: 'number',   required: true },
    { name: 'veg',         type: 'checkbox', defaultValue: false },
    { name: 'available',   type: 'checkbox', defaultValue: true },
    { name: 'isPopular',   type: 'checkbox' },

    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Kerala Specials', value: 'kerala' },
        { label: 'Biryani & Rice',  value: 'biryani' },
        { label: 'Starters',        value: 'starters' },
        { label: 'Desserts',        value: 'desserts' },
        { label: 'North Indian',    value: 'north-indian' },
        { label: 'Seafood',        value: 'seafood' },
        { label: 'Chinese',        value: 'chinese' },
        { label: 'Continental',        value: 'continental' },

      ],
    },

    // ✅ LINK TO RESTAURANT
   {
  name: 'restaurants',
  type: 'relationship',
  relationTo: 'restaurant',
  hasMany: true,
  required: true,
},
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
};

export default Menu;