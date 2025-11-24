
export type MenuItemOption = {
  name: string;
  price: number;
};

export type MenuItem = {
  id: string;
  name: string;
  type: 'veg' | 'non-veg';
  category: string[];
  options: MenuItemOption[];
  imageId: string;
  location?: string;
  restaurant?: string;
};

export const menuData: MenuItem[] = [
  {
    id: '1',
    name: 'Biryani Non Veg',
    type: 'non-veg',
    category: ['biryani', 'non-veg', 'main course'],
    options: [
      { name: 'Half', price: 100 },
      { name: 'Full', price: 200 },
    ],
    imageId: 'biryani-non-veg',
    location: 'Moolchand, New Delhi',
    restaurant: 'Biryani Blues',
  },
  {
    id: '2',
    name: 'Biryani Veg',
    type: 'veg',
    category: ['biryani', 'veg', 'main course'],
    options: [
      { name: 'Half', price: 80 },
      { name: 'Full', price: 150 },
    ],
    imageId: 'biryani-veg',
    location: 'Moolchand, New Delhi',
    restaurant: 'Biryani Blues',
  },
  {
    id: '3',
    name: 'Fried Rice',
    type: 'veg',
    category: ['rice', 'veg', 'main course'],
    options: [
      { name: 'Half', price: 60 },
      { name: 'Full', price: 120 },
    ],
    imageId: 'fried-rice',
    location: 'Moolchand, New Delhi',
    restaurant: 'Wok Hei',
  },
  {
    id: '4',
    name: 'Chicken Fried Rice',
    type: 'non-veg',
    category: ['rice', 'non-veg', 'main course'],
    options: [
      { name: 'Half', price: 160 },
      { name: 'Full', price: 280 },
    ],
    imageId: 'chicken-fried-rice',
    location: 'Moolchand, New Delhi',
    restaurant: 'Wok Hei',
  },
  {
    id: '5',
    name: 'Momos Veg Steam',
    type: 'veg',
    category: ['momos', 'veg', 'starter'],
    options: [
      { name: 'Half', price: 50 },
      { name: 'Full', price: 100 },
    ],
    imageId: 'momos-veg-steam',
    restaurant: 'Momo Magic',
    location: 'Lajpat Nagar, New Delhi',
  },
  {
    id: '6',
    name: 'Momos Veg Fry',
    type: 'veg',
    category: ['momos', 'veg', 'starter'],
    options: [
      { name: 'Half', price: 60 },
      { name: 'Full', price: 110 },
    ],
    imageId: 'momos-veg-fry',
    restaurant: 'Momo Magic',
    location: 'Lajpat Nagar, New Delhi',
  },
  {
    id: '7',
    name: 'Momos Non Veg Steam',
    type: 'non-veg',
    category: ['momos', 'non-veg', 'starter'],
    options: [
      { name: 'Half', price: 70 },
      { name: 'Full', price: 120 },
    ],
    imageId: 'momos-non-veg-steam',
    restaurant: 'Momo Magic',
    location: 'Lajpat Nagar, New Delhi',
  },
  {
    id: '8',
    name: 'Momos Non Veg Fry',
    type: 'non-veg',
    category: ['momos', 'non-veg', 'starter'],
    options: [
      { name: 'Half', price: 80 },
      { name: 'Full', price: 130 },
    ],
    imageId: 'momos-non-veg-fry',
    restaurant: 'Momo Magic',
    location: 'Lajpat Nagar, New Delhi',
  },
  {
    id: '9',
    name: 'Veg Roll',
    type: 'veg',
    category: ['roll', 'veg', 'snack'],
    options: [
      { name: '1 Piece', price: 30 },
      { name: '2 Pieces', price: 60 },
      { name: '3 Pieces', price: 90 },
      { name: '4 Pieces', price: 100 },
    ],
    imageId: 'roll-veg',
    restaurant: 'Roll Express',
    location: 'Hauz Khas, New Delhi',
  },
  {
    id: '10',
    name: 'Roll Egg',
    type: 'non-veg',
    category: ['roll', 'non-veg', 'snack'],
    options: [
      { name: '1 Piece', price: 60 },
      { name: '2 Piece', price: 110 },
    ],
    imageId: 'roll-egg',
    restaurant: 'Roll Express',
    location: 'Hauz Khas, New Delhi',
  },
  {
    id: '11',
    name: 'French Fries',
    type: 'veg',
    category: ['fries', 'veg', 'snack'],
    options: [
      { name: 'Half', price: 50 },
      { name: 'Full', price: 100 },
    ],
    imageId: 'french-fries',
    restaurant: 'Snack Shack',
    location: 'Connaught Place, New Delhi',
  },
  {
    id: '12',
    name: 'Chilly Potato (Without Honey)',
    type: 'veg',
    category: ['potato', 'veg', 'starter'],
    options: [
      { name: 'Half', price: 70 },
      { name: 'Full', price: 140 },
    ],
    imageId: 'chilly-potato',
    restaurant: 'Wok Hei',
    location: 'Moolchand, New Delhi',
  },
  {
    id: '13',
    name: 'Chilly Potato (With Honey)',
    type: 'veg',
    category: ['potato', 'veg', 'starter'],
    options: [
      { name: 'Half', price: 80 },
      { name: 'Full', price: 160 },
    ],
    imageId: 'honey-chilly-potato',
    restaurant: 'Wok Hei',
    location: 'Moolchand, New Delhi',
  },
  {
    id: '14',
    name: 'Noodles',
    type: 'veg',
    category: ['noodles', 'veg', 'main course'],
    options: [
      { name: 'Half', price: 70 },
      { name: 'Full', price: 140 },
    ],
    imageId: 'noodles',
    restaurant: 'Wok Hei',
    location: 'Moolchand, New Delhi',
  },
  {
    id: '15',
    name: 'Maggi',
    type: 'veg',
    category: ['maggi', 'veg', 'snack'],
    options: [
      { name: 'Half', price: 40 },
      { name: 'Full', price: 80 },
    ],
    imageId: 'maggi',
    restaurant: 'Snack Shack',
    location: 'Connaught Place, New Delhi',
  },
  {
    id: '16',
    name: 'Samosa',
    type: 'veg',
    category: ['samosa', 'veg', 'snack'],
    options: [
      { name: '1 Piece', price: 20 },
      { name: '2 Pieces', price: 30 },
      { name: '3 Pieces', price: 40 },
      { name: '4 Pieces', price: 50 },
      { name: '5 Pieces', price: 60 },
      { name: '6 Pieces', price: 70 },
      { name: '7 Pieces', price: 80 },
      { name: '8 Pieces', price: 90 },
      { name: '9 Pieces', price: 100 },
      { name: '10 Pieces', price: 100 },
    ],
    imageId: 'samosa',
    restaurant: 'Snack Shack',
    location: 'Connaught Place, New Delhi',
  },
  {
    id: '17',
    name: 'Bread Pakoda',
    type: 'veg',
    category: ['pakoda', 'veg', 'snack'],
    options: [
      { name: '1 Piece', price: 20 },
      { name: '2 Pieces', price: 30 },
    ],
    imageId: 'bread-pakoda',
    restaurant: 'Snack Shack',
    location: 'Connaught Place, New Delhi',
  },
];

export const foodCategories = [
  'all', 'veg', 'non-veg', 'biryani', 'rice', 'momos', 'roll', 'snack', 'main course'
];

export const restaurantPartners = [
    { name: 'Biryani Blues', location: 'Moolchand, New Delhi', specialty: 'Biryani', owner: 'N/A' },
    { name: 'Wok Hei', location: 'Moolchand, New Delhi', specialty: 'Chinese', owner: 'N/A' },
    { name: 'Momo Magic', location: 'Lajpat Nagar, New Delhi', specialty: 'Momos', owner: 'N/A' },
    { name: 'Foodies', location: 'Andrews Ganj, Near Moolchand Metro Station', specialty: 'Multi-cuisine', owner: 'Prem' },
];

export const deliveryPartners = [
    { name: 'Mohit', phone: '8178480946', vehicle: 'Cycle' },
];
