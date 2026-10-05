import React from 'react';
import { 
  Home, 
  Grid, 
  ShoppingCart, 
  Package, 
  User 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNavigation: React.FC = () => {
  const { activeTab, setActiveTab, cartItemCount, orders } = useApp();

  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'categories' as const, label: 'Categories', icon: Grid },
    { 
      id: 'cart' as const, 
      label: 'Cart', 
      icon: ShoppingCart, 
      badge: cartItemCount > 0 ? cartItemCount : undefined 
    },
    { 
      id: 'orders' as const, 
      label: 'Orders', 
      icon: Package,
      badge: orders.some(o => o.status === 'Out for Delivery') ? '●' : undefined
    },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg select-none">
      <div className="max-w-md md:max-w-2xl mx-auto grid grid-cols-5 h-16 items-center px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] py-1 text-center transition-colors group focus:outline-none"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive
                      ? 'text-blue-600 scale-110 stroke-[2.4]'
                      : 'text-slate-400 group-hover:text-slate-700 stroke-[1.8]'
                  }`}
                />
                {item.badge !== undefined && (
                  <span
                    className={`absolute -top-1.5 -right-2.5 font-extrabold text-[9px] rounded-full flex items-center justify-center px-1 min-w-[16px] h-4 font-mono-num shadow-xs ${
                      typeof item.badge === 'string'
                        ? 'bg-amber-500 text-white animate-ping'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] font-medium tracking-tight mt-1 transition-colors ${
                  isActive ? 'text-blue-700 font-bold' : 'text-slate-500 group-hover:text-slate-800'
                }`}
              >
                {item.label}
              </span>

              {isActive && (
                <span className="w-4 h-0.5 bg-blue-600 rounded-full mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
