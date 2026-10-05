import React from 'react';
import { Star, Heart, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { setSelectedProduct, addToCart, toggleWishlist, isInWishlist, buyNow } = useApp();
  const isWished = isInWishlist(product.id);

  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="group relative bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top Media Container */}
      <div className="relative pt-3 px-3 pb-2 bg-gradient-to-b from-slate-50/50 to-white flex items-center justify-center min-h-[170px] sm:min-h-[190px]">
        
        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition backdrop-blur-xs ${
            isWished 
              ? 'bg-rose-50 text-rose-600 shadow-sm' 
              : 'bg-white/80 text-slate-400 hover:text-rose-500 hover:bg-white shadow-xs'
          }`}
          aria-label={isWished ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWished ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Badge (Bestseller, Trending, etc.) */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-slate-900 text-white shadow-xs">
              {product.badge}
            </span>
          </div>
        )}

        {/* Product Image */}
        <div className="w-full h-36 sm:h-44 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between bg-white border-t border-slate-100">
        <div>
          {/* Brand & Category Kicker */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-1">
            <span className="text-blue-700 font-bold uppercase tracking-wider">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-xs sm:text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition leading-snug mb-1.5">
            {product.name}
          </h3>

          {/* Ratings & MM Assured */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <div className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-sm shadow-2xs">
              <span>{product.rating}</span>
              <Star className="w-2.5 h-2.5 fill-white" />
            </div>
            <span className="text-[11px] text-slate-500 font-mono-num">
              ({product.ratingCount.toLocaleString('en-IN')})
            </span>
            
            {product.isAssured && (
              <span className="ml-auto inline-flex items-center gap-0.5 text-[10px] font-extrabold text-[#1f5ec4] bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                <ShieldCheck className="w-3 h-3 text-blue-600 inline" />
                Assured
              </span>
            )}
          </div>
        </div>

        {/* Price & Action Section */}
        <div className="pt-2 border-t border-slate-100/80">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-base sm:text-lg font-extrabold text-slate-900 font-mono-num">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-xs text-slate-400 line-through font-mono-num">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  {product.discountPercent}% off
                </span>
              </>
            )}
          </div>

          {/* Bank Offer Micro-Text */}
          {product.bankOffer && (
            <div className="text-[10px] text-emerald-700 font-medium truncate mt-1 flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
              <span className="truncate">{product.bankOffer}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-2.5 grid grid-cols-2 gap-1.5 pt-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-lg transition text-center flex items-center justify-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                buyNow(product);
              }}
              className="py-1.5 px-2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold text-xs rounded-lg transition text-center shadow-xs"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
