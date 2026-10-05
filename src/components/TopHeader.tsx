import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Heart, 
  ShoppingCart, 
  X, 
  ChevronDown, 
  Sparkles, 
  ShieldCheck,
  Smartphone,
  Laptop,
  Headphones,
  Tv,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TopHeader: React.FC = () => {
  const { 
    filters, 
    setFilters, 
    cartItemCount, 
    wishlist, 
    setActiveTab, 
    selectedPincode, 
    setSelectedPincode,
    setSelectedProduct,
    products,
    showToast
  } = useApp();

  const [searchFocused, setSearchFocused] = useState(false);
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [pincodeInput, setPincodeInput] = useState('');
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.trim().length >= 6) {
      setSelectedPincode(`${pincodeInput.trim()} (Express Delivery)`);
      setShowPincodeModal(false);
      showToast(`Delivery location set to ${pincodeInput}`, 'success');
      setPincodeInput('');
    } else {
      showToast('Please enter a valid 6-digit PIN code', 'warning');
    }
  };

  // Search suggestions
  const suggestedQueries = [
    'iPhone 16 Pro',
    'Sony WH-1000XM5',
    'Samsung S25 Ultra',
    'MacBook Pro M3',
    'OLED TV 65 inch',
    'Gaming Laptop RTX 4080'
  ];

  const matchedProducts = filters.searchQuery.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#2874F0] text-white shadow-md">
        {/* Main Header Bar */}
        <div className="px-4 py-2.5 max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Logo & Brand Zone */}
          <button 
            onClick={() => {
              setActiveTab('home');
              setFilters(prev => ({ ...prev, category: 'All', searchQuery: '' }));
            }} 
            className="flex flex-col items-start focus:outline-none shrink-0 group text-left"
          >
            <div className="flex items-center gap-1">
              <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-white italic drop-shadow-sm">
                MMKART<span className="text-yellow-300 font-extrabold text-xs sm:text-sm not-italic ml-0.5">.COM</span>
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-blue-100 font-medium tracking-wide">
              <span>Explore</span>
              <span className="text-yellow-300 font-bold flex items-center gap-0.5">
                Plus
                <Sparkles className="w-2.5 h-2.5 fill-yellow-300 text-yellow-300 inline" />
              </span>
              <span className="text-white/60">|</span>
              <span className="text-emerald-200 text-[9px] font-semibold">100% Genuine</span>
            </div>
          </button>

          {/* Desktop/Tablet Location Selector */}
          <button 
            onClick={() => setShowPincodeModal(true)}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-700/60 hover:bg-blue-700 text-xs text-blue-50 transition border border-blue-400/30 shrink-0"
          >
            <MapPin className="w-3.5 h-3.5 text-yellow-300" />
            <div className="text-left leading-tight">
              <div className="text-[10px] text-blue-200">Deliver to</div>
              <div className="font-semibold text-white truncate max-w-[130px]">{selectedPincode}</div>
            </div>
            <ChevronDown className="w-3 h-3 text-blue-200" />
          </button>

          {/* Search Bar (Medium & Up view or Inlined) */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-xl mx-1 sm:mx-3">
            <div className="relative flex items-center bg-white rounded-lg shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-yellow-400">
              <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => {
                  setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
                  if (e.target.value.trim() && filters.category !== 'All') {
                    // keep search broad
                  }
                }}
                onFocus={() => setSearchFocused(true)}
                placeholder="Search genuine Mobiles, Laptops, Sony, Apple..."
                className="w-full px-2.5 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                  className="p-1.5 text-slate-400 hover:text-slate-600 mr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Instant Search Suggestions Dropdown */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-2xl border border-slate-200 text-slate-900 z-50 overflow-hidden divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
                {matchedProducts.length > 0 ? (
                  <div className="p-2">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                      Direct Products
                    </div>
                    {matchedProducts.map(p => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedProduct(p);
                          setSearchFocused(false);
                        }}
                        className="w-full flex items-center gap-3 p-2 hover:bg-blue-50 rounded-lg text-left transition group"
                      >
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 object-contain rounded bg-slate-50 p-1 border border-slate-100 shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-slate-900 truncate group-hover:text-blue-600">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                            <span className="font-mono-num font-bold text-slate-900">₹{p.price.toLocaleString('en-IN')}</span>
                            {p.isAssured && (
                              <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                                MM Assured
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 shrink-0" />
                      </button>
                    ))}
                  </div>
                ) : null}

                <div className="p-2.5">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1 pb-1.5">
                    Popular Searches
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedQueries.map(query => (
                      <button
                        key={query}
                        onClick={() => {
                          setFilters(prev => ({ ...prev, searchQuery: query }));
                          setSearchFocused(false);
                          setActiveTab('home');
                        }}
                        className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-md transition font-medium text-left"
                      >
                        {query}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-2 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500 px-3">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    Authorized Brand Dealers Only
                  </span>
                  <button 
                    onClick={() => setSearchFocused(false)}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons: Wishlist & Cart */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Wishlist Link */}
            <button
              onClick={() => {
                setActiveTab('orders'); // or trigger wishlist view in profile/orders
                showToast(`Wishlist contains ${wishlist.length} saved electronics`, 'info');
              }}
              className="relative p-2 rounded-lg text-white hover:bg-blue-700/60 transition flex items-center gap-1"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5 text-white" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-slate-900 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
              <span className="hidden lg:inline text-xs font-semibold">Wishlist</span>
            </button>

            {/* Cart Link */}
            <button
              onClick={() => setActiveTab('cart')}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-slate-900 transition font-bold text-xs sm:text-sm shadow-sm"
              title="View Cart"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="bg-red-600 text-white font-extrabold text-[10px] px-1.5 py-0.2 rounded-full font-mono-num ml-0.5">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Header: Delivery Pincode Bar */}
        <div className="md:hidden bg-[#1f5ec4] px-4 py-1.5 flex items-center justify-between text-xs text-blue-100 border-t border-blue-400/20">
          <button 
            onClick={() => setShowPincodeModal(true)}
            className="flex items-center gap-1 text-[11px] truncate"
          >
            <MapPin className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
            <span className="truncate">Deliver to <strong className="text-white underline">{selectedPincode}</strong></span>
            <ChevronDown className="w-3 h-3 text-blue-200 shrink-0" />
          </button>
          <div className="text-[10px] text-yellow-300 font-bold flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Next Day Available
          </div>
        </div>
      </header>

      {/* Pincode Selector Modal */}
      {showPincodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl relative">
            <button 
              onClick={() => setShowPincodeModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 text-blue-600 mb-2">
              <MapPin className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900">Choose Delivery Location</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Enter your postal pincode to check product availability, bank offers, and exact express delivery time.
            </p>

            <form onSubmit={handlePincodeSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode (e.g. 400001)"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono-num font-semibold"
                  autoFocus
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPincode('400001 (Mumbai)');
                    setShowPincodeModal(false);
                    showToast('Location set to Mumbai (400001)', 'success');
                  }}
                  className="flex-1 py-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition"
                >
                  Mumbai 400001
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPincode('560001 (Bengaluru)');
                    setShowPincodeModal(false);
                    showToast('Location set to Bengaluru (560001)', 'success');
                  }}
                  className="flex-1 py-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition"
                >
                  Bengaluru 560001
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition shadow-md shadow-blue-500/20"
              >
                Apply Pincode
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
