import type { MenuItem, Category } from '../types';

export const categories: Category[] = [
  {
    id: 'sushi',
    name: 'Sushi',
    description: 'Nos sushi traditionnels préparés avec du poisson frais',
    image: '/images/sushi-category.jpg'
  },
  {
    id: 'sashimi',
    name: 'Sashimi',
    description: 'Tranches de poisson cru de qualité premium',
    image: '/images/sashimi-category.jpg'
  },
  {
    id: 'maki',
    name: 'Maki',
    description: 'Rouleaux de riz garnis, algue nori',
    image: '/images/maki-category.jpg'
  },
  {
    id: 'chirashi',
    name: 'Chirashi',
    description: 'Bols de riz garnis de poisson cru',
    image: '/images/chirashi-category.jpg'
  },
  {
    id: 'plats-chauds',
    name: 'Plats Chauds',
    description: 'Spécialités chaudes de notre Izakaya',
    image: '/images/hot-dishes-category.jpg'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Douceurs japonaises traditionnelles',
    image: '/images/desserts-category.jpg'
  }
];

export const menuItems: MenuItem[] = [
  // Sushi
  {
    id: 'sushi-saumon',
    name: 'Sushi Saumon',
    description: 'Sushi au saumon frais de Norvège',
    price: 2.50,
    category: 'sushi',
    available: true,
    image: '/images/sushi-saumon.jpg'
  },
  {
    id: 'sushi-thon',
    name: 'Sushi Thon',
    description: 'Sushi au thon rouge de qualité sashimi',
    price: 3.00,
    category: 'sushi',
    available: true,
    image: '/images/sushi-thon.jpg'
  },
  {
    id: 'sushi-crevette',
    name: 'Sushi Crevette',
    description: 'Sushi à la crevette cuite, wasabi',
    price: 2.80,
    category: 'sushi',
    available: true,
    image: '/images/sushi-crevette.jpg'
  },
  
  // Sashimi
  {
    id: 'sashimi-saumon',
    name: 'Sashimi Saumon (6 pcs)',
    description: 'Tranches de saumon frais, gingembre mariné',
    price: 12.00,
    category: 'sashimi',
    available: true,
    image: '/images/sashimi-saumon.jpg'
  },
  {
    id: 'sashimi-thon',
    name: 'Sashimi Thon (6 pcs)',
    description: 'Tranches de thon rouge, wasabi frais',
    price: 15.00,
    category: 'sashimi',
    available: true,
    image: '/images/sashimi-thon.jpg'
  },
  
  // Maki
  {
    id: 'maki-california',
    name: 'California Maki (8 pcs)',
    description: 'Avocat, concombre, crabe, saumon, tobiko',
    price: 8.50,
    category: 'maki',
    available: true,
    image: '/images/california-maki.jpg'
  },
  {
    id: 'maki-philadelphia',
    name: 'Philadelphia Maki (8 pcs)',
    description: 'Saumon fumé, fromage frais, avocat',
    price: 9.00,
    category: 'maki',
    available: true,
    image: '/images/philadelphia-maki.jpg'
  },
  
  // Chirashi
  {
    id: 'chirashi-saumon',
    name: 'Chirashi Saumon',
    description: 'Bol de riz sushi, saumon sashimi, légumes marinés',
    price: 16.50,
    category: 'chirashi',
    available: true,
    image: '/images/chirashi-saumon.jpg'
  },
  {
    id: 'chirashi-mixte',
    name: 'Chirashi Mixte',
    description: 'Bol de riz sushi, assortiment de poissons',
    price: 19.50,
    category: 'chirashi',
    available: true,
    image: '/images/chirashi-mixte.jpg'
  },
  
  // Plats chauds
  {
    id: 'yakitori-poulet',
    name: 'Yakitori Poulet (3 pcs)',
    description: 'Brochettes de poulet grillé, sauce tare',
    price: 6.50,
    category: 'plats-chauds',
    available: true,
    image: '/images/yakitori-poulet.jpg'
  },
  {
    id: 'gyoza',
    name: 'Gyoza (6 pcs)',
    description: 'Raviolis japonais porc et légumes, sauce soja',
    price: 7.00,
    category: 'plats-chauds',
    available: true,
    image: '/images/gyoza.jpg'
  },
  {
    id: 'tempura-crevettes',
    name: 'Tempura Crevettes (4 pcs)',
    description: 'Crevettes en beignet léger, sauce tentsuyu',
    price: 9.50,
    category: 'plats-chauds',
    available: true,
    image: '/images/tempura-crevettes.jpg'
  },
  
  // Desserts
  {
    id: 'mochi-glacé',
    name: 'Mochi Glacé (3 pcs)',
    description: 'Vanille, thé vert, haricot rouge',
    price: 5.50,
    category: 'desserts',
    available: true,
    image: '/images/mochi-glace.jpg'
  },
  {
    id: 'dorayaki',
    name: 'Dorayaki',
    description: 'Pancake japonais fourré à la pâte de haricot rouge',
    price: 4.50,
    category: 'desserts',
    available: true,
    image: '/images/dorayaki.jpg'
  }
];

export const restaurantInfo = {
  name: 'Ô TOMO Sushi',
  description: 'Restaurant Izakaya japonais authentique à Saint-Maximin-la-Sainte-Baume. Découvrez notre cuisine traditionnelle dans une ambiance conviviale.',
  address: '123 Avenue des Platanes, 83470 Saint-Maximin-la-Sainte-Baume',
  phone: '04 94 XX XX XX',
  email: 'contact@otomo-sushi.fr',
  hours: {
    'Lundi': 'Fermé',
    'Mardi': '18h30 - 22h30',
    'Mercredi': '18h30 - 22h30',
    'Jeudi': '18h30 - 22h30',
    'Vendredi': '18h30 - 23h00',
    'Samedi': '18h30 - 23h00',
    'Dimanche': '18h30 - 22h30'
  },
  paymentMethods: ['Espèces', 'Carte bancaire', 'Chèques', 'Tickets restaurant'],
  social: {
    facebook: 'https://facebook.com/otomo-sushi',
    instagram: 'https://instagram.com/otomo_sushi'
  }
};
