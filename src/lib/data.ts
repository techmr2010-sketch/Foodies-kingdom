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
  },
  {
    id: '9',
    name: 'Roll Veg',
    type: 'veg',
    category: ['roll', 'veg', 'snack'],
    options: [
      { name: '1 Piece', price: 50 },
      { name: '2 Piece', price: 90 },
    ],
    imageId: 'roll-veg',
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
  },
  {
    id: '16',
    name: 'Samosa',
    type: 'veg',
    category: ['samosa', 'veg', 'snack'],
    options: [
      { name: '1 Piece', price: 20 },
      { name: '2 Pieces', price: 30 },
    ],
    imageId: 'samosa',
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
  },
];

export const foodCategories = [
  'all', 'veg', 'non-veg', 'biryani', 'rice', 'momos', 'roll', 'snack', 'main course'
]
