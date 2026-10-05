import React from 'react';
import { 
  Smartphone, 
  Laptop, 
  Tablet, 
  Watch, 
  Headphones, 
  Tv, 
  Monitor, 
  Cable,
  Grid,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Category } from '../types';

const CATEGORY_ITEMS: { id: Category | 'All'; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'All', label: 'All Items', icon: Grid },
  { id: 'Mobiles', label: 'Mobiles', icon: Smartphone },
  { id: 'Laptops', label: 'Laptops', icon: Laptop },
  { id: 'Tablets', label: 'Tablets', icon: Tablet },
  { id: 'Smartwatches', label: 'Watches', icon: Watch },
  { id: 'Headphones', label: 'Headphones', icon: Headphones },
  { id: 'TVs', label: 'Smart TVs', icon: Tv },
  { id: 'Monitors', label: 'Monitors', icon: Monitor },
  { id: 'Accessories', label: 'Accessories', icon: Cable },
];

export const CategoryBar: React.FC = () => {
  const { filters, setFilters, setActiveTab } = useApp();

  const handleSelectCategory = (cat: Category | 'All') => {
    setFilters(prev => ({
      ...prev,
      category: cat,
      // reset search query when tapping category
      searchQuery: ''
    }));
    setActiveTab('home');
  };

  return (
    <div className="bg-white border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
          {CATEGORY_ITEMS.map((item) => {
            const Icon = item.icon;
            const isSelected = filters.category === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectCategory(item.id)}
                className={`flex flex-col items-center justify-center min-w-[70px] sm:min-w-[82px] py-1.5 px-2 rounded-xl transition-all duration-150 shrink-0 group ${
                  isSelected
                    ? 'bg-blue-50 text-blue-600 font-bold scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-300'
                      : 'bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] sm:text-xs text-center leading-tight whitespace-nowrap">
                  {item.label}
                </span>
                {isSelected && (
                  <span className="w-4 h-0.5 bg-blue-600 rounded-full mt-1"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
