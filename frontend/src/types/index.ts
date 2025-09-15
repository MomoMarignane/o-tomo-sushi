// Types pour le restaurant
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
  allergens?: string[];
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Reservation {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  message?: string;
}

export interface Order {
  id?: string;
  items: CartItem[];
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  pickupTime: string;
  status: 'pending' | 'confirmed' | 'ready' | 'completed';
  createdAt: string;
}
