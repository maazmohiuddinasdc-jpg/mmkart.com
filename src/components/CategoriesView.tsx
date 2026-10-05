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
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_DATA, BRANDS_LIST } from '../data/products';
import { Category, Brand } from '../types';

export const CategoriesView: React.FC = () => {
  const { setFilters, setActiveTab, products } = useApp();

  const handleSelectCategory = (cat: Category) => {
    setFilters(prev => ({
      ...prev,
      category: cat,
      brands: [],
      searchQuery: ''
    }));
    setActiveTab('home');
  };

  const handleSelectBrand = (brand: Brand) => {
    setFilters(prev => ({
      ...prev,
      category: 'All',
      brands: [brand],
      searchQuery: ''
    }));
    setActiveTab('home');
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return Smartphone;
      case 'Laptop': return Laptop;
      case 'Tablet': return Tablet;
      case 'Watch': return Watch;
      case 'Headphones': return Headphones;
      case 'Tv': return Tv;
      case 'Monitor': return Monitor;
      case 'Cable': return Cable;
      default: return Smartphone;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 pb-24 space-y-6">
      
      {/* Category Explorer Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
            Categories & Brand Directory
          </h2>
          <p className="text-xs text-slate-500">
            100% Original electronics backed by brand warranty and MM Assured seals
          </p>
        </div>
      </div>

      {/* 8 Branded Electronics Categories */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Shop by Category</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIES_DATA.map((cat) => {
            const Icon = getCategoryIcon(cat.icon);
            const count = products.filter(p => p.category === cat.name).length;

            return (
              <div
                key={cat.name}
                onClick={() => handleSelectCategory(cat.name as Category)}
                className="group p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-700 flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono-num font-semibold text-slate-400">
                    {count} models
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition flex items-center justify-between">
                    <span>{cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Flagship authorized inventory
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Brand Stores Section */}
      <div className="space-y-3 pt-3 border-t border-slate-200">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Official Authorized Brands</span>
        </h3>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 sm:gap-3">
          {BRANDS_LIST.map((brand) => (
            <button
              key={brand}
              onClick={() => handleSelectBrand(brand)}
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition text-center group flex flex-col items-center justify-center shadow-2xs"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-800 font-black text-xs flex items-center justify-center mb-1.5 transition-colors">
                {brand.charAt(0)}
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700">
                {brand}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl shadow-md space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-yellow-300" />
          <h4 className="text-sm font-extrabold text-white">
            MM Assured Electronics Authenticity Promise
          </h4>
        </div>
        <p className="text-xs text-blue-100 leading-relaxed">
          Every device sold on MMKART.COM is sourced directly from certified brand distributors. Includes official manufacturer warranty cards, valid serial numbers for online activation, and 7-day hassle-free replacement.
        </p>
      </div>

    </div>
  );
};
