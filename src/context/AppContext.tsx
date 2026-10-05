import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Address, User, FilterState, Category, Brand } from '../types';
import { PRODUCTS } from '../data/products';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  // Navigation & View
  activeTab: 'home' | 'categories' | 'cart' | 'orders' | 'profile';
  setActiveTab: (tab: 'home' | 'categories' | 'cart' | 'orders' | 'profile') => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, storage?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  originalCartTotal: number;
  cartSavings: number;
  cartItemCount: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Filter & Search
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredProducts: Product[];
  
  // Checkout & Orders
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  orders: Order[];
  placeOrder: (address: Address, paymentMethod: string, couponCode?: string) => Order;
  cancelOrder: (orderId: string) => void;
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;

  // User & Addresses
  user: User;
  updateUser: (updated: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  selectedAddress: Address | null;
  setSelectedAddress: (addr: Address | null) => void;
  selectedPincode: string;
  setSelectedPincode: (pin: string) => void;

  // Coupons
  appliedCoupon: { code: string; discount: number } | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Quick Action
  buyNow: (product: Product, color?: string, storage?: string) => void;
}

const initialFilters: FilterState = {
  category: 'All',
  brands: [],
  minPrice: 0,
  maxPrice: 400000,
  minRating: 0,
  assuredOnly: false,
  inStockOnly: false,
  searchQuery: '',
  sortBy: 'popularity'
};

const initialAddresses: Address[] = [
  {
    id: 'addr-1',
    name: 'Maaz Mohiuddin',
    phone: '+91 98765 43210',
    pincode: '400001',
    locality: 'Fort, Nariman Point Road',
    address: 'Flat 402, Sea View Residency, Marine Lines',
    city: 'Mumbai',
    state: 'Maharashtra',
    landmark: 'Near Churchgate Railway Station',
    isDefault: true,
    type: 'Home'
  },
  {
    id: 'addr-2',
    name: 'Maaz Mohiuddin (Tech Lab)',
    phone: '+91 98765 43210',
    pincode: '560001',
    locality: 'MG Road, Ashok Nagar',
    address: 'Level 5, Cyber Gateway Tower 2',
    city: 'Bengaluru',
    state: 'Karnataka',
    landmark: 'Opposite Metro Pillar 140',
    isDefault: false,
    type: 'Work'
  }
];

const initialUser: User = {
  id: 'usr-1049',
  name: 'Maaz Mohiuddin',
  email: 'maazmohiuddinasdc@gmail.com',
  phone: '+91 98765 43210',
  superCoins: 480,
  addresses: initialAddresses
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'categories' | 'cart' | 'orders' | 'profile'>('home');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);
  const [selectedPincode, setSelectedPincode] = useState('400001 (Mumbai)');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Cart State (with localStorage persistence)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mmkart_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default 1 item for immediate satisfaction
    return [{
      product: PRODUCTS[0], // iPhone 16 Pro
      quantity: 1,
      selectedColor: 'Desert Titanium',
      selectedStorage: '256 GB'
    }];
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mmkart_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['mob-samsung-s25ultra', 'head-sony-xm5'];
  });

  // User State
  const [user, setUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem('mmkart_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialUser;
  });

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(user.addresses[0] || null);

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('mmkart_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Seed one active order and one delivered order for realistic experience
    return [
      {
        id: 'ord-10492',
        orderNumber: 'MMK-2026-94812',
        date: 'Yesterday at 3:45 PM',
        items: [
          {
            product: PRODUCTS[7], // Sony XM5
            quantity: 1,
            selectedColor: 'Silver Matte'
          }
        ],
        totalAmount: 26990,
        discountAmount: 8000,
        deliveryCharge: 0,
        couponDiscount: 500,
        status: 'Out for Delivery',
        estimatedDelivery: 'Today by 7:00 PM',
        courierName: 'BlueDart Express Air',
        trackingNumber: 'BLUEDART-8829104812',
        shippingAddress: initialAddresses[0],
        paymentMethod: 'UPI (Google Pay)',
        trackingSteps: [
          { title: 'Order Placed', time: 'Yesterday 3:45 PM', completed: true, description: 'Order confirmed and verified' },
          { title: 'Packed & Dispatched', time: 'Yesterday 7:15 PM', completed: true, description: 'Package dispatched from MMKART Super Hub, Bhiwandi', location: 'Bhiwandi Super Hub' },
          { title: 'In Transit', time: 'Today 4:30 AM', completed: true, description: 'Arrived at Mumbai South Delivery Center', location: 'Mumbai South Center' },
          { title: 'Out for Delivery', time: 'Today 9:15 AM', completed: true, description: 'Assigned to Delivery Partner Rajesh (OTP required)', location: 'Mumbai 400001' },
          { title: 'Delivered', time: 'Pending', completed: false, description: 'Will be delivered before 7:00 PM today' }
        ]
      },
      {
        id: 'ord-10118',
        orderNumber: 'MMK-2026-81920',
        date: '24 Sep 2026',
        items: [
          {
            product: PRODUCTS[12], // Samsung 45W Charger
            quantity: 1
          }
        ],
        totalAmount: 2499,
        discountAmount: 1000,
        deliveryCharge: 0,
        couponDiscount: 0,
        status: 'Delivered',
        estimatedDelivery: 'Delivered on 25 Sep 2026',
        courierName: 'Delhivery Surface',
        trackingNumber: 'DELHIVERY-49102847',
        shippingAddress: initialAddresses[0],
        paymentMethod: 'Credit Card (HDFC ****4182)',
        trackingSteps: [
          { title: 'Order Placed', time: '24 Sep, 10:12 AM', completed: true, description: 'Order confirmed' },
          { title: 'Packed', time: '24 Sep, 2:30 PM', completed: true, description: 'Handed to Delhivery Courier' },
          { title: 'Shipped', time: '24 Sep, 6:40 PM', completed: true, description: 'In transit to destination facility' },
          { title: 'Delivered', time: '25 Sep, 1:20 PM', completed: true, description: 'Delivered to resident, signed by Maaz' }
        ]
      }
    ];
  });

  // Filter State
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mmkart_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mmkart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('mmkart_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('mmkart_user', JSON.stringify(user));
  }, [user]);

  // Toast System
  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart Methods
  const addToCart = (product: Product, quantity = 1, color?: string, storage?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        product,
        quantity,
        selectedColor: color || (product.colors ? product.colors[0].name : undefined),
        selectedStorage: storage || (product.storageOptions ? product.storageOptions[0] : undefined)
      }];
    });
    showToast(`Added ${product.name.slice(0, 24)}... to Cart!`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const originalCartTotal = cart.reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0);
  const cartSavings = originalCartTotal - cartTotal + (appliedCoupon ? appliedCoupon.discount : 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist Methods
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to Wishlist ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Filter Reset
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // Coupons
  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'MMKART500' || clean === 'ELECTRO500') {
      setAppliedCoupon({ code: clean, discount: 500 });
      showToast('₹500 Coupon applied successfully!', 'success');
      return true;
    } else if (clean === 'SUPERCOIN100') {
      if (user.superCoins >= 100) {
        setAppliedCoupon({ code: clean, discount: 1000 });
        showToast('Applied 100 SuperCoins for ₹1,000 instant discount!', 'success');
        return true;
      } else {
        showToast('Insufficient SuperCoins balance', 'warning');
        return false;
      }
    } else if (clean === 'FLAGSHIP10') {
      const discount = Math.round(cartTotal * 0.05);
      setAppliedCoupon({ code: clean, discount });
      showToast(`Flagship 5% Extra discount (₹${discount.toLocaleString('en-IN')}) applied!`, 'success');
      return true;
    } else {
      showToast('Invalid or expired coupon code', 'warning');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Order Placement
  const placeOrder = (address: Address, paymentMethod: string, couponCode?: string) => {
    const finalAmount = Math.max(0, cartTotal - (appliedCoupon?.discount || 0));
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `MMK-2026-${randomSuffix}`,
      date: 'Just now',
      items: [...cart],
      totalAmount: finalAmount,
      discountAmount: cartSavings,
      deliveryCharge: 0,
      couponDiscount: appliedCoupon ? appliedCoupon.discount : 0,
      status: 'Confirmed',
      estimatedDelivery: 'Tomorrow by 5:00 PM',
      courierName: 'MM Express Priority',
      trackingNumber: `MMEXP-${randomSuffix}99`,
      shippingAddress: address,
      paymentMethod,
      trackingSteps: [
        { title: 'Order Confirmed', time: 'Just now', completed: true, description: 'Order verified & payment processed' },
        { title: 'Packing at Warehouse', time: 'In Progress', completed: true, description: 'MMKART Assured electronics hub is packaging with tamper-proof security seal' },
        { title: 'Dispatched', time: 'Scheduled today 6:00 PM', completed: false, description: 'Will be handed over to MM Express' },
        { title: 'Out for Delivery', time: 'Tomorrow 9:00 AM', completed: false, description: 'OTP verification required at delivery' },
        { title: 'Delivered', time: 'Tomorrow by 5:00 PM', completed: false, description: 'Delivered to your doorstep' }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    // Reward SuperCoins (1 coin for every ₹200 spent)
    const earnedCoins = Math.min(500, Math.floor(finalAmount / 200));
    setUser(prev => ({ ...prev, superCoins: prev.superCoins + earnedCoins }));
    clearCart();
    setAppliedCoupon(null);
    setCheckoutOpen(false);
    setActiveTrackingOrder(newOrder);
    setActiveTab('orders');
    showToast(`Order Placed! You earned +${earnedCoins} SuperCoins 🪙`, 'success');
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev =>
      prev.map(ord =>
        ord.id === orderId
          ? {
              ...ord,
              status: 'Cancelled',
              trackingSteps: [
                ...ord.trackingSteps,
                { title: 'Cancelled', time: 'Just now', completed: true, description: 'Order cancelled by customer. Refund initiated.' }
              ]
            }
          : ord
      )
    );
    showToast('Order cancelled. Refund initiated to source method.', 'info');
  };

  // Buy Now flow
  const buyNow = (product: Product, color?: string, storage?: string) => {
    addToCart(product, 1, color, storage);
    setSelectedProduct(null);
    setCheckoutOpen(true);
  };

  // User Profile & Addresses
  const updateUser = (updated: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updated }));
    showToast('Profile updated', 'success');
  };

  const addAddress = (newAddr: Omit<Address, 'id'>) => {
    const created: Address = {
      ...newAddr,
      id: `addr-${Date.now()}`
    };
    setUser(prev => ({
      ...prev,
      addresses: created.isDefault
        ? [created, ...prev.addresses.map(a => ({ ...a, isDefault: false }))]
        : [...prev.addresses, created]
    }));
    setSelectedAddress(created);
    showToast('New address saved', 'success');
  };

  const removeAddress = (id: string) => {
    setUser(prev => ({
      ...prev,
      addresses: prev.addresses.filter(a => a.id !== id)
    }));
    showToast('Address removed', 'info');
  };

  const setDefaultAddress = (id: string) => {
    setUser(prev => ({
      ...prev,
      addresses: prev.addresses.map(a => ({ ...a, isDefault: a.id === id }))
    }));
    const found = user.addresses.find(a => a.id === id);
    if (found) setSelectedAddress(found);
    showToast('Default delivery address updated', 'success');
  };

  // Computed Filtered Products
  const filteredProducts = products.filter(product => {
    if (filters.category !== 'All' && product.category !== filters.category) return false;
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;
    if (product.price < filters.minPrice || product.price > filters.maxPrice) return false;
    if (filters.minRating > 0 && product.rating < filters.minRating) return false;
    if (filters.assuredOnly && !product.isAssured) return false;
    if (filters.inStockOnly && !product.inStock) return false;
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      const matchTag = product.tagline.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchCat && !matchTag) return false;
    }
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price_asc') return a.price - b.price;
    if (filters.sortBy === 'price_desc') return b.price - a.price;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    if (filters.sortBy === 'newest') return b.discountPercent - a.discountPercent;
    // popularity default
    return b.ratingCount - a.ratingCount;
  });

  return (
    <AppContext.Provider
      value={{
        products,
        selectedProduct,
        setSelectedProduct,
        activeTab,
        setActiveTab,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        originalCartTotal,
        cartSavings,
        cartItemCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        filters,
        setFilters,
        resetFilters,
        filteredProducts,
        checkoutOpen,
        setCheckoutOpen,
        orders,
        placeOrder,
        cancelOrder,
        activeTrackingOrder,
        setActiveTrackingOrder,
        user,
        updateUser,
        addAddress,
        removeAddress,
        setDefaultAddress,
        selectedAddress,
        setSelectedAddress,
        selectedPincode,
        setSelectedPincode,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        toasts,
        showToast,
        removeToast,
        buyNow
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
