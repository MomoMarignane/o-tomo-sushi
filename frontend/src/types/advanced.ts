// =====================================
// TYPES PRINCIPAUX POUR Ô TOMO SUSHI
// =====================================

// Types de base pour les produits
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
  preparationTime?: number;
  kitchenName?: string;
  barName?: string;
  options?: ProductOption[];
  ingredients?: string[];
  nutritionalInfo?: NutritionalInfo;
  preparationInstructions?: string;
  printerAssignment?: PrinterAssignment[];
}

export interface NutritionalInfo {
  calories?: number;
  proteins?: number;
  carbs?: number;
  fats?: number;
  fiber?: number;
}

export interface PrinterAssignment {
  printerId: string;
  printerName: string;
  displayName: string;
  delayMinutes: number;
}

export interface ProductOption {
  id: string;
  name: string;
  type: 'select' | 'multi-select' | 'text' | 'radio' | 'checkbox';
  required: boolean;
  choices: OptionChoice[];
}

export interface OptionChoice {
  id: string;
  name: string;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
  color?: string;
}

export interface Allergen {
  id: string;
  name: string;
  icon: string;
}

// Messages et bannières
export interface BannerMessage {
  id: string;
  text: string;
  type: 'permanent' | 'temporary' | 'daily-special' | 'holiday';
  active: boolean;
  priority: number;
  startDate?: Date;
  endDate?: Date;
  image?: string;
  imageAlt?: string;
  displayDuration?: number;
  targetAudience?: 'all' | 'customers' | 'staff';
}

// Configuration générale
export interface SiteSettings {
  restaurantInfo: RestaurantInfo;
  businessHours: OpeningHours;
  socialLinks: SocialLinks;
  contactInfo: ContactInfo;
  seoSettings: SEOSettings;
  orderingSettings: OrderingSettings;
  deliverySettings: DeliverySettings;
  printingSettings: PrintingSettings;
}

export interface RestaurantInfo {
  name: string;
  description: string;
  shortDescription: string;
  logo?: string;
  coverImage?: string;
  cuisine: string[];
  priceRange: 'budget' | 'moderate' | 'expensive' | 'fine-dining';
  capacity: number;
  foundedYear?: number;
  awards?: string[];
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  gpsCoordinates: [number, number];
  theForkUrl?: string;
  reservationPhone?: string;
  cateringEmail?: string;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  googleAnalyticsId?: string;
  facebookPixelId?: string;
}

export interface OrderingSettings {
  minOrderAmount: number;
  maxOrderAmount?: number;
  allowMultipleGuests: boolean;
  allowOrderComments: boolean;
  allowScheduledOrders: boolean;
  maxGuestsPerOrder: number;
  orderModificationDeadline: number;
}

// Gestion des créneaux et livraisons
export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  maxOrders: number;
  currentOrders: number;
  type: 'pickup' | 'delivery';
  zones?: string[];
  preparationBuffer: number;
  isActive: boolean;
  dayOfWeek?: number[];
  specialDates?: Date[];
}

export interface DeliveryZone {
  id: string;
  name: string;
  price: number;
  coordinates: [number, number][];
  active: boolean;
  deliverySlots?: TimeSlot[];
  minOrderAmount?: number;
  maxDeliveryTime: number;
  description?: string;
  color?: string;
}

export interface DeliverySettings {
  zones: DeliveryZone[];
  baseDeliveryFee: number;
  freeDeliveryThreshold?: number;
  maxDeliveryDistance: number;
  defaultDeliveryTime: number;
  allowDeliveryScheduling: boolean;
}

// Système d'impression
export interface PrintingSettings {
  printers: Printer[];
  defaultFontSize: number;
  fontStyle: 'normal' | 'bold' | 'italic';
  orderDisplayFormat: 'chronological' | 'grouped';
  showCustomerInfo: boolean;
  showPreparationTime: boolean;
  autoCalculateDelay: boolean;
}

export interface Printer {
  id: string;
  name: string;
  location: string;
  ipAddress?: string;
  isActive: boolean;
  defaultDelay: number;
}

// Gestion des clients
export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: Address;
  dateOfBirth?: Date;
  registrationDate: Date;
  lastOrderDate?: Date;
  totalOrders: number;
  totalSpent: number;
  notes?: string;
  allergies?: string[];
  preferences?: string[];
  loyaltyPoints?: number;
  status: 'active' | 'inactive' | 'blocked';
  orderHistory: string[]; // IDs des commandes
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  deliveryInstructions?: string;
}

// Types pour les commandes
export interface CartItem extends MenuItem {
  quantity: number;
  selectedOptions?: SelectedOption[];
  comment?: string;
  guestName?: string;
}

export interface SelectedOption {
  optionId: string;
  choiceIds: string[];
  customValue?: string;
}

export type DeliveryType = 'pickup' | 'delivery' | 'dine_in';
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  customerId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: CartItem[];
  status: OrderStatus;
  deliveryType: DeliveryType;
  deliveryAddress?: string;
  deliveryTime: Date;
  totalAmount: number;
  deliveryPrice?: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  notes?: string;
  createdAt: Date;
  updatedAt?: Date;
  preparationTime: number;
  assignedTo?: string;
}

// Horaires d'ouverture
export interface OpeningHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
  holidays?: Date[];
  specialHours?: SpecialHours[];
}

export interface DaySchedule {
  open: string;
  close: string;
  isClosed: boolean;
  breaks?: TimeBreak[];
}

export interface TimeBreak {
  start: string;
  end: string;
}

export interface SpecialHours {
  date: Date;
  schedule: DaySchedule;
  reason: string;
}

// Réseaux sociaux
export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;
  google?: string;
}

// Avis Google
export interface GoogleReview {
  id: string;
  authorName: string;
  authorPhotoUrl?: string;
  rating: number;
  text: string;
  timeDescription: string;
  relativeTimeDescription: string;
  profilePhotoUrl?: string;
}

// Formulaires de contact
export interface ContactForm {
  id: string;
  type: 'cv' | 'catering' | 'suggestion' | 'general';
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  attachments?: File[];
  submissionDate: Date;
  status: 'pending' | 'processed' | 'archived';
  response?: string;
  assignedTo?: string;
}

// Analytics et statistiques
export interface SiteAnalytics {
  dailyVisitors: number;
  monthlyVisitors: number;
  totalPageViews: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: PageMetric[];
  conversionRate: number;
  orderConversionRate: number;
  searchQueries: SearchQuery[];
  trafficSources: TrafficSource[];
}

export interface PageMetric {
  path: string;
  pageViews: number;
  uniquePageViews: number;
  averageTimeOnPage: number;
}

export interface SearchQuery {
  query: string;
  impressions: number;
  clicks: number;
  averagePosition: number;
}

export interface TrafficSource {
  source: string;
  sessions: number;
  users: number;
  newUsers: number;
}

// Types pour l'administration
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  permissions: Permission[];
  lastLogin?: Date;
  isActive: boolean;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

// Types pour les statistiques détaillées
export interface OrderStatistics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  topSellingItems: MenuItem[];
  busyHours: BusyHourData[];
  customerRetentionRate: number;
  newCustomerRate: number;
}

export interface BusyHourData {
  hour: number;
  orderCount: number;
  revenue: number;
}

// Types pour la gestion avancée des menus
export interface MenuSection {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
  displayOrder: number;
  isActive: boolean;
  availableFrom?: string;
  availableUntil?: string;
}

export interface MenuPDF {
  id: string;
  name: string;
  version: string;
  fileUrl: string;
  uploadDate: Date;
  isActive: boolean;
  language: string;
  category: 'full-menu' | 'drinks' | 'desserts' | 'specials';
}
