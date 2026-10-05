import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  X, 
  ShieldCheck, 
  Star, 
  Check, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { BRANDS_LIST } from '../data/products';
import { Brand, SortOption } from '../types';

export const ProductListing: React.FC = () => {
  const { filters, setFilters, resetFilters, filteredProducts } = useApp();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: 'Popularity', value: 'popularity' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Customer Rating', value: 'rating' },
    { label: 'Best Discount', value: 'newest' }
  ];

  const handleBrandToggle = (brand: Brand) => {
    setFilters(prev => {
      const exists = prev.brands.includes(brand);
      return {
        ...prev,
        brands: exists ? prev.brands.filter(b => b !== brand) : [...prev.brands, brand]
      };
    });
  };

  const activeFilterCount = 
    (filters.category !== 'All' ? 1 : 0) +
    filters.brands.length +
    (filters.assuredOnly ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.maxPrice < 400000 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
      {/* Top Filter & Sorting Control Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        
        {/* Left: Heading and Item Count */}
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
            {filters.category === 'All' ? 'All Branded Electronics' : filters.category}
          </h2>
          <span className="text-xs text-slate-500 font-mono-num font-semibold">
            ({filteredProducts.length} items)
          </span>
        </div>

        {/* Right: Filter & Sort Controls */}
        <div className="flex items-center gap-2 flex-wrap ml-auto">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setFilterDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-mono-num">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Quick Assured Toggle */}
          <button
            onClick={() => setFilters(prev => ({ ...prev, assuredOnly: !prev.assuredOnly }))}
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg border transition ${
              filters.assuredOnly 
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>MM Assured</span>
          </button>

          {/* Sort Selector Dropdown */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg px-2.5 py-1 text-xs">
            <ArrowUpDown className="w-3 h-3 text-slate-400" />
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as SortOption }))}
              aria-label="Sort products by"
              className="bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer text-xs"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips / Clear All */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-1 no-scrollbar text-xs">
          <span className="text-slate-400 font-medium shrink-0">Applied:</span>

          {filters.category !== 'All' && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, category: 'All' }))}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold shrink-0"
            >
              <span>{filters.category}</span>
              <X className="w-3 h-3" />
            </button>
          )}

          {filters.brands.map(brand => (
            <button
              key={brand}
              onClick={() => handleBrandToggle(brand)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-300 font-semibold shrink-0"
            >
              <span>{brand}</span>
              <X className="w-3 h-3" />
            </button>
          ))}

          {filters.assuredOnly && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, assuredOnly: false }))}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold shrink-0"
            >
              <span>MM Assured Only</span>
              <X className="w-3 h-3" />
            </button>
          )}

          {filters.minRating > 0 && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, minRating: 0 }))}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold shrink-0"
            >
              <span>{filters.minRating}★ & above</span>
              <X className="w-3 h-3" />
            </button>
          )}

          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-bold ml-1 text-xs shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* Main Content: Filter Drawer & Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Desktop Left Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 bg-white rounded-xl border border-slate-200 p-4 space-y-5 h-fit sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              Filter Catalog
            </span>
            {activeFilterCount > 0 && (
              <button 
                onClick={resetFilters}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Brands Filter */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Authorized Brands
            </h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {BRANDS_LIST.map(brand => {
                const checked = filters.brands.includes(brand);
                return (
                  <label
                    key={brand}
                    className="flex items-center justify-between text-xs text-slate-700 hover:text-slate-900 cursor-pointer p-1 rounded hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleBrandToggle(brand)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                      />
                      <span className={checked ? 'font-bold text-blue-700' : 'font-medium'}>
                        {brand}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Customer Rating
            </h4>
            <div className="space-y-1.5">
              {[4.5, 4.0, 3.5].map(rating => (
                <button
                  key={rating}
                  onClick={() => setFilters(prev => ({ ...prev, minRating: prev.minRating === rating ? 0 : rating }))}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg border transition ${
                    filters.minRating === rating
                      ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                    </div>
                    <span>{rating}★ & above</span>
                  </div>
                  {filters.minRating === rating && <Check className="w-3.5 h-3.5 text-amber-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* MM Assured Guarantee */}
          <div className="pt-3 border-t border-slate-100">
            <label className="flex items-center gap-2.5 cursor-pointer p-2 rounded-lg bg-blue-50/60 border border-blue-100">
              <input
                type="checkbox"
                checked={filters.assuredOnly}
                onChange={(e) => setFilters(prev => ({ ...prev, assuredOnly: e.target.checked }))}
                className="rounded border-blue-400 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
              />
              <div className="text-left">
                <div className="text-xs font-bold text-blue-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  MM Assured Only
                </div>
                <div className="text-[10px] text-blue-600">6-point quality check & free express ship</div>
              </div>
            </label>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="col-span-1 lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No Electronics Matched</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn't find any products matching your active filters. Try loosening your brand or category criteria.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Modal Drawer */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs lg:hidden animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto space-y-5 shadow-2xl">
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-2"></div>
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                Filter Electronics
              </h3>
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Brands Selection */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Brand
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {BRANDS_LIST.map(brand => {
                  const checked = filters.brands.includes(brand);
                  return (
                    <button
                      key={brand}
                      onClick={() => handleBrandToggle(brand)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                        checked
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {brand}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Assured Check */}
            <div>
              <label className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.assuredOnly}
                  onChange={(e) => setFilters(prev => ({ ...prev, assuredOnly: e.target.checked }))}
                  className="rounded border-blue-400 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <div>
                  <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    MM Assured Guarantee Only
                  </span>
                  <p className="text-[10px] text-blue-700">Genuine items, 7-day replacement, free shipping</p>
                </div>
              </label>
            </div>

            {/* Mobile Rating Filter */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Minimum Rating
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {[4.5, 4.0, 3.5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setFilters(prev => ({ ...prev, minRating: prev.minRating === rating ? 0 : rating }))}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition ${
                      filters.minRating === rating
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {rating}★ & up
                  </button>
                ))}
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="pt-2 flex gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                  setFilterDrawerOpen(false);
                }}
                className="flex-1 py-2.5 border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setFilterDrawerOpen(false)}
                className="flex-1 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-blue-700"
              >
                Apply ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
