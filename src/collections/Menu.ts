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

    // 🥤 Mark as drink first — controls veg visibility
    {
      name: 'isDrink',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: "Check this if the item is a beverage (veg/non-veg won't apply)",
      },
    },

    // 🥦 Only shown when isDrink is false
    {
      name: 'veg',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: (data) => !data?.isDrink,
        description: 'Leave unchecked for non-veg items',
      },
    },

    { name: 'available',  type: 'checkbox', defaultValue: true },
    { name: 'isPopular',  type: 'checkbox' },

    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Kerala Specials',            value: 'kerala' },
        { label: 'Biryani & Rice',             value: 'biryani' },
        { label: 'Starters',                   value: 'starters' },
        { label: 'Desserts',                   value: 'desserts' },
        { label: 'North Indian',               value: 'north-indian' },
        { label: 'Seafood',                    value: 'seafood' },
        { label: 'Chinese',                    value: 'chinese' },
        { label: 'Continental',                value: 'continental' },
        { label: 'Soup',                       value: 'soup' },
        { label: 'Salads',                     value: 'salads' },
        { label: 'Starter',                    value: 'starter' },
        { label: 'Oven',                       value: 'oven' },
        { label: 'Arabic rice',                value: 'arabic-rice' },
        { label: 'All time',                   value: 'all-time' },
        { label: 'Wok tossed rice & noodle',   value: 'wok-tossed-rice-noodle' },
        { label: 'Breads',                     value: 'breads' },
        { label: 'Specialty Kerala dishes',    value: 'specialty-kerala-dishes' },
        { label: 'Poultry & Beef',             value: 'poultry-beef' },
        { label: 'Vegetarian',                 value: 'vegetarian' },
        { label: 'Juice & Shakes',             value: 'juice-shakes' },
      ],
    },

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