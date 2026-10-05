export type Brand = 'Apple' | 'Samsung' | 'OnePlus' | 'Xiaomi' | 'HP' | 'Dell' | 'Lenovo' | 'Sony' | 'LG';

export type Category = 
  | 'Mobiles' 
  | 'Laptops' 
  | 'Tablets' 
  | 'Smartwatches' 
  | 'TVs' 
  | 'Monitors' 
  | 'Headphones' 
  | 'Accessories';

export interface ProductSpec {
  group: string;
  items: { label: string; value: string }[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  tagline: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  ratingCount: number;
  reviewsCount: number;
  image: string;
  additionalImages?: string[];
  inStock: boolean;
  stockCount: number;
  isAssured: boolean;
  deliveryDays: number;
  badge?: 'Bestseller' | 'Trending' | 'Top Rated' | 'Special Deal' | 'New Launch';
  highlights: string[];
  specs: ProductSpec[];
  reviews: Review[];
  colors?: { name: string; hex: string }[];
  storageOptions?: string[];
  bankOffer?: string;
  emiStartsAt?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  locality: string;
  address: string;
  city: string;
  state: string;
  landmark?: string;
  isDefault: boolean;
  type: 'Home' | 'Work';
}

export type OrderStatus = 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface TrackingStep {
  title: string;
  time: string;
  completed: boolean;
  description: string;
  location?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  deliveryCharge: number;
  couponDiscount: number;
  status: OrderStatus;
  estimatedDelivery: string;
  trackingSteps: TrackingStep[];
  courierName: string;
  trackingNumber: string;
  shippingAddress: Address;
  paymentMethod: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  superCoins: number;
  addresses: Address[];
}

export type SortOption = 'popularity' | 'price_asc' | 'price_desc' | 'rating' | 'newest';

export interface FilterState {
  category: Category | 'All';
  brands: Brand[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  assuredOnly: boolean;
  inStockOnly: boolean;
  searchQuery: string;
  sortBy: SortOption;
}
