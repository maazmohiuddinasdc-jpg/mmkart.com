import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award, 
  Heart, 
  ShoppingBag, 
  Zap, 
  Check, 
  ChevronRight, 
  CreditCard,
  Share2,
  ThumbsUp,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    buyNow, 
    toggleWishlist, 
    isInWishlist, 
    selectedPincode,
    showToast 
  } = useApp();

  if (!selectedProduct) return null;

  const product = selectedProduct;
  const isWished = isInWishlist(product.id);

  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors ? product.colors[0].name : ''
  );
  const [selectedStorage, setSelectedStorage] = useState<string>(
    product.storageOptions ? product.storageOptions[0] : ''
  );
  const [activeTab, setActiveTabState] = useState<'specs' | 'reviews' | 'offers'>('specs');

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on MMKART.COM at ₹${product.price.toLocaleString('en-IN')}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center items-start sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl min-h-screen sm:min-h-0 sm:rounded-2xl shadow-2xl overflow-hidden my-0 sm:my-6 relative flex flex-col">
        
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedProduct(null)}
              className="p-1.5 -ml-1 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
              aria-label="Back to catalog"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              {product.brand} · {product.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              title="Share Product"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2 rounded-lg transition ${
                isWished ? 'text-rose-600 bg-rose-50' : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWished ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Image Showcase Column */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-square bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-200/80 p-6 flex items-center justify-center overflow-hidden">
                {product.badge && (
                  <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-sm bg-slate-900 text-white">
                    {product.badge}
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* MM Assured Quality Guarantee Box */}
              <div className="w-full mt-4 p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-extrabold text-xs">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>MM Assured Guarantee</span>
                  <span className="text-[10px] bg-blue-600 text-white font-bold px-1.5 py-0.2 rounded ml-auto">
                    VERIFIED
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-700 pt-1 border-t border-blue-200/60">
                  <div className="flex flex-col items-center">
                    <Award className="w-3.5 h-3.5 text-blue-600 mb-0.5" />
                    <span className="font-semibold">100% Genuine</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RotateCcw className="w-3.5 h-3.5 text-blue-600 mb-0.5" />
                    <span className="font-semibold">7 Days Replace</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Truck className="w-3.5 h-3.5 text-blue-600 mb-0.5" />
                    <span className="font-semibold">Express Delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Product Details Column */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h1 className="text-base sm:text-xl font-extrabold text-slate-900 leading-snug">
                  {product.name}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  {product.tagline}
                </p>
              </div>

              {/* Rating Strip */}
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow-2xs">
                  <span>{product.rating}</span>
                  <Star className="w-3 h-3 fill-white" />
                </div>
                <span className="text-xs font-bold text-slate-700">
                  {product.ratingCount.toLocaleString('en-IN')} Ratings
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-slate-500">
                  {product.reviewsCount.toLocaleString('en-IN')} Reviews
                </span>
              </div>

              {/* Price Block */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono-num">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-sm text-slate-400 line-through font-mono-num">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm font-extrabold text-emerald-600">
                        {product.discountPercent}% Off
                      </span>
                    </>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Inclusive of all taxes · No Cost EMI available from <strong className="text-slate-800 font-mono-num">₹{product.emiStartsAt || Math.round(product.price / 12)}/month</strong>
                </div>
              </div>

              {/* Bank Offers Accordion */}
              {product.bankOffer && (
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
                  <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                    <span>Bank Offers Available</span>
                  </div>
                  <p className="text-xs text-emerald-800 font-medium leading-relaxed">
                    • {product.bankOffer}
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    • 5% Unlimited Cashback on MMKART Axis Bank Credit Card
                  </p>
                </div>
              )}

              {/* Color Options */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Color: <span className="text-blue-700 normal-case">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map(col => (
                      <button
                        key={col.name}
                        onClick={() => setSelectedColor(col.name)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
                          selectedColor === col.name
                            ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-1 ring-blue-600'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span 
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" 
                          style={{ backgroundColor: col.hex }} 
                        />
                        <span>{col.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage Options */}
              {product.storageOptions && product.storageOptions.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Storage: <span className="text-blue-700 normal-case">{selectedStorage}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.storageOptions.map(st => (
                      <button
                        key={st}
                        onClick={() => setSelectedStorage(st)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
                          selectedStorage === st
                            ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-600'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights List */}
              <div>
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Key Features
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {product.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delivery Estimation */}
              <div className="flex items-center gap-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Deliver to <strong>{selectedPincode}</strong>: <strong className="text-emerald-700 font-semibold">Tomorrow by 5 PM</strong> (Free Express Delivery)</span>
              </div>
            </div>
          </div>

          {/* Deep Details Tabs: Specifications, Reviews */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <button
                onClick={() => setActiveTabState('specs')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${
                  activeTab === 'specs'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTabState('reviews')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${
                  activeTab === 'reviews'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Ratings & Reviews ({product.reviewsCount})
              </button>
            </div>

            {/* Specifications Tab */}
            {activeTab === 'specs' && (
              <div className="pt-4 space-y-4">
                {product.specs.map((group, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200/80">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                      {group.group}
                    </h4>
                    <dl className="divide-y divide-slate-200/60 text-xs">
                      {group.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="py-2 grid grid-cols-1 sm:grid-cols-3 gap-1">
                          <dt className="text-slate-500 font-medium">{item.label}</dt>
                          <dd className="sm:col-span-2 text-slate-900 font-semibold">{item.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="pt-4 space-y-4">
                {/* Summary Scorecard */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-black text-slate-900 font-mono-num">
                      {product.rating}★
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        {product.rating >= 4.5 ? 'Exceptional Rating' : 'Highly Recommended'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Based on {product.ratingCount.toLocaleString('en-IN')} verified customer orders
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-200">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>100% Certified Reviews</span>
                  </div>
                </div>

                {/* Individual Verified Reviews */}
                <div className="space-y-3">
                  {product.reviews.map(rev => (
                    <div key={rev.id} className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-0.5 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                            {rev.rating}★
                          </span>
                          <span className="text-xs font-bold text-slate-900">{rev.title}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">{rev.date}</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {rev.comment}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                        <span className="flex items-center gap-1 font-medium">
                          {rev.author}
                          {rev.verified && (
                            <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                              · <Check className="w-3 h-3 text-emerald-600 inline" /> Verified Buyer
                            </span>
                          )}
                        </span>
                        <div className="flex items-center gap-1 text-slate-400">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{rev.helpfulCount}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Bottom Actions Bar */}
        <div className="sticky bottom-0 z-30 bg-white border-t border-slate-200 p-3 sm:p-4 flex items-center gap-3 shadow-2xl">
          <div className="hidden sm:block">
            <div className="text-[10px] text-slate-500 uppercase font-semibold">Total Price</div>
            <div className="text-lg font-extrabold text-slate-900 font-mono-num">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                addToCart(product, 1, selectedColor, selectedStorage);
              }}
              className="py-3 px-4 bg-white border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-extrabold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={() => {
                buyNow(product, selectedColor, selectedStorage);
              }}
              className="py-3 px-4 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
