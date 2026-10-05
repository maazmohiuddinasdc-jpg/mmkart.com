import React, { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Tag, 
  ArrowRight, 
  ShoppingBag, 
  Truck, 
  Sparkles, 
  MapPin, 
  Check, 
  ChevronRight,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartView: React.FC = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    originalCartTotal, 
    cartSavings, 
    selectedAddress,
    selectedPincode,
    setCheckoutOpen, 
    setActiveTab, 
    setSelectedProduct,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    user
  } = useApp();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const finalAmount = Math.max(0, cartTotal - (appliedCoupon?.discount || 0));

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Your Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Explore our curated catalog of genuine branded electronics from Apple, Samsung, Sony, and more.
          </p>
          <button
            onClick={() => setActiveTab('home')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition shadow-md shadow-blue-500/20"
          >
            Shop Electronics Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 pb-28 sm:pb-12">
      {/* Delivery Address Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 mb-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
          <div className="text-xs">
            <span className="text-slate-500">Deliver to: </span>
            <strong className="text-slate-900 font-bold">
              {selectedAddress ? `${selectedAddress.name}, ${selectedAddress.pincode}` : selectedPincode}
            </strong>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('profile')}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 transition"
        >
          Change
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-3">
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
            <div className="p-3.5 bg-slate-50/80 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Cart Items ({cart.length})
              </span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                Free Express Delivery Eligible
              </span>
            </div>

            {cart.map((item) => (
              <div key={item.product.id} className="p-3.5 sm:p-4 flex gap-3 sm:gap-4 items-start">
                {/* Product Thumbnail */}
                <div 
                  onClick={() => setSelectedProduct(item.product)}
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-xl p-2 border border-slate-200 shrink-0 flex items-center justify-center cursor-pointer hover:border-blue-400 transition"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 
                      onClick={() => setSelectedProduct(item.product)}
                      className="text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-600 transition cursor-pointer line-clamp-2"
                    >
                      {item.product.name}
                    </h3>
                  </div>

                  {/* Variant info */}
                  <div className="text-[11px] text-slate-500 mt-0.5 space-x-2">
                    {item.selectedColor && (
                      <span>Color: <strong className="text-slate-700">{item.selectedColor}</strong></span>
                    )}
                    {item.selectedStorage && (
                      <span>Storage: <strong className="text-slate-700">{item.selectedStorage}</strong></span>
                    )}
                    <span>Seller: <strong className="text-blue-700">MM Official Brand Store</strong></span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 font-mono-num">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                    {item.product.originalPrice > item.product.price && (
                      <span className="text-xs text-slate-400 line-through font-mono-num">
                        ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    )}
                    <span className="text-xs font-bold text-emerald-600">
                      {item.product.discountPercent}% Off
                    </span>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center gap-4 mt-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="p-1 sm:p-1.5 hover:bg-slate-100 text-slate-600 transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-slate-900 font-mono-num">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="p-1 sm:p-1.5 hover:bg-slate-100 text-slate-600 transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MM Assured Safe Packaging Notice */}
          <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200/80 flex items-center gap-2.5 text-xs text-blue-900">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <span className="font-bold">Safe & Secure Transit: </span>
              All electronics are double-boxed in serialized tamper-evident security packaging with insurance coverage.
            </div>
          </div>
        </div>

        {/* Right Column: Coupons & Price Breakdown */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Coupon Box */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              <Tag className="w-4 h-4 text-blue-600" />
              <span>Apply Coupons & SuperCoins</span>
            </div>

            {appliedCoupon ? (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>'{appliedCoupon.code}' Applied</span>
                  </div>
                  <div className="text-[11px] text-emerald-700">
                    You saved ₹{appliedCoupon.discount.toLocaleString('en-IN')}!
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-rose-600 font-bold hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Enter Code (e.g. ELECTRO500)"
                    className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase font-semibold"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition"
                  >
                    Apply
                  </button>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div 
                    onClick={() => applyCoupon('ELECTRO500')} 
                    className="text-[11px] p-1.5 bg-slate-50 hover:bg-blue-50 rounded border border-slate-200 flex items-center justify-between cursor-pointer"
                  >
                    <span className="font-bold text-slate-800">ELECTRO500</span>
                    <span className="text-emerald-700 font-semibold">Flat ₹500 Off</span>
                  </div>
                  <div 
                    onClick={() => applyCoupon('SUPERCOIN100')} 
                    className="text-[11px] p-1.5 bg-slate-50 hover:bg-blue-50 rounded border border-slate-200 flex items-center justify-between cursor-pointer"
                  >
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-yellow-500 fill-yellow-400" />
                      Use 100 SuperCoins
                    </span>
                    <span className="text-emerald-700 font-semibold">₹1,000 Off</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Price Details
            </h3>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Price ({cart.length} items)</span>
                <span className="font-mono-num font-semibold text-slate-900">
                  ₹{originalCartTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between text-emerald-600">
                <span>Direct Product Discount</span>
                <span className="font-mono-num font-semibold">
                  -₹{(originalCartTotal - cartTotal).toLocaleString('en-IN')}
                </span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600">
                  <span>Coupon Discount</span>
                  <span className="font-mono-num font-semibold">
                    -₹{appliedCoupon.discount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>

              <div className="flex justify-between">
                <span>Secured Electronics Handling</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
              <span className="text-sm font-bold text-slate-900">Total Payable</span>
              <span className="text-xl font-extrabold text-slate-900 font-mono-num">
                ₹{finalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-2 bg-emerald-50 rounded-lg text-[11px] text-emerald-800 font-bold text-center">
              You will save ₹{cartSavings.toLocaleString('en-IN')} on this order!
            </div>

            {/* Desktop Checkout Button */}
            <button
              onClick={() => setCheckoutOpen(true)}
              className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-extrabold text-sm rounded-xl transition shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar for Mobile Screen */}
      <div className="fixed bottom-16 left-0 right-0 z-30 bg-white border-t border-slate-200 p-3 sm:hidden shadow-2xl flex items-center justify-between">
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Amount</div>
          <div className="text-lg font-extrabold text-slate-900 font-mono-num leading-tight">
            ₹{finalAmount.toLocaleString('en-IN')}
          </div>
        </div>
        <button
          onClick={() => setCheckoutOpen(true)}
          className="px-6 py-2.5 bg-yellow-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5"
        >
          <span>Place Order</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
