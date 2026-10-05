import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopHeader } from './components/TopHeader';
import { CategoryBar } from './components/CategoryBar';
import { HeroBannerSlider } from './components/HeroBannerSlider';
import { ProductListing } from './components/ProductListing';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartView } from './components/CartView';
import { CheckoutModal } from './components/CheckoutModal';
import { OrdersView } from './components/OrdersView';
import { CategoriesView } from './components/CategoriesView';
import { ProfileView } from './components/ProfileView';
import { BottomNavigation } from './components/BottomNavigation';
import { ToastContainer } from './components/ToastContainer';
import { Smartphone, Monitor, ShieldCheck, Sparkles, Heart } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab, setActiveTab, filters } = useApp();
  const [deviceMode, setDeviceMode] = useState<'responsive' | 'mobile'>('responsive');

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center">
      {/* Top Device Preview Bar on Large Screens */}
      <div className="hidden xl:flex w-full bg-slate-900 text-slate-300 text-[11px] px-4 py-1.5 justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-white tracking-wider flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            MMKART.COM Mobile Marketplace Engine
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">Branded Electronics Only (Apple · Samsung · Sony · Dell · HP · LG)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Viewport Simulation:</span>
          <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 transition ${
                deviceMode === 'mobile'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>Mobile Phone (430px)</span>
            </button>
            <button
              onClick={() => setDeviceMode('responsive')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 transition ${
                deviceMode === 'responsive'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>Full Responsive</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container: Mobile Shell vs Fluid */}
      <div
        className={`w-full min-h-screen flex flex-col bg-slate-50 transition-all duration-300 shadow-2xl relative ${
          deviceMode === 'mobile'
            ? 'max-w-[430px] my-4 rounded-3xl border-8 border-slate-900 overflow-hidden ring-1 ring-slate-800 shadow-2xl'
            : 'max-w-full'
        }`}
      >
        {/* Header */}
        <TopHeader />

        {/* View Router */}
        <main className="flex-1">
          {activeTab === 'home' && (
            <>
              {/* Category Strip */}
              <CategoryBar />

              {/* Show Hero Banner when no search active */}
              {!filters.searchQuery && filters.category === 'All' && filters.brands.length === 0 && (
                <HeroBannerSlider />
              )}

              {/* Product Catalog with Filters and Sorting */}
              <ProductListing />
            </>
          )}

          {activeTab === 'categories' && <CategoriesView />}

          {activeTab === 'cart' && <CartView />}

          {activeTab === 'orders' && <OrdersView />}

          {activeTab === 'profile' && <ProfileView />}
        </main>

        {/* Persistent Bottom Tab Navigation (Home, Categories, Cart, Orders, Profile) */}
        <BottomNavigation />

        {/* Modals & Popups */}
        <ProductDetailModal />
        <CheckoutModal />
        <ToastContainer />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
