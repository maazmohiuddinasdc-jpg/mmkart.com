import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Check, 
  X,
  Phone,
  Mail,
  Edit2,
  Package
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfileView: React.FC = () => {
  const { 
    user, 
    updateUser, 
    wishlist, 
    products, 
    addToCart, 
    toggleWishlist, 
    setSelectedProduct, 
    setActiveTab, 
    removeAddress, 
    setDefaultAddress,
    addAddress,
    showToast 
  } = useApp();

  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);
  const [emailInput, setEmailInput] = useState(user.email);
  const [phoneInput, setPhoneInput] = useState(user.phone);

  const [newAddrModal, setNewAddrModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: user.name,
    phone: user.phone,
    pincode: '400001',
    locality: '',
    address: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    isDefault: false,
    type: 'Home' as 'Home' | 'Work'
  });

  const wishedProducts = products.filter(p => wishlist.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: nameInput,
      email: emailInput,
      phone: phoneInput
    });
    setEditProfileOpen(false);
  };

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.address || !newAddr.pincode || !newAddr.city) {
      showToast('Please fill all required address fields', 'warning');
      return;
    }
    addAddress(newAddr);
    setNewAddrModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 pb-28 space-y-5">
      
      {/* User Header Profile Card */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center font-black text-xl border-2 border-white/40 shadow-inner">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  {user.name}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-400 text-slate-950 uppercase tracking-wide">
                  VIP PLUS
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-blue-100 mt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-blue-200" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1 font-mono-num">
                  <Phone className="w-3.5 h-3.5 text-blue-200" />
                  {user.phone}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setEditProfileOpen(true)}
            className="px-3.5 py-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-bold rounded-xl transition backdrop-blur-xs flex items-center gap-1.5 border border-white/20"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* SuperCoins & Perks Strip */}
        <div className="mt-5 pt-4 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-xs">
            <div className="text-[10px] text-blue-200 uppercase font-semibold">SuperCoins Balance</div>
            <div className="text-base font-black text-yellow-300 font-mono-num flex items-center justify-center gap-1 mt-0.5">
              <Sparkles className="w-4 h-4 fill-yellow-300" />
              <span>{user.superCoins} Coins</span>
            </div>
          </div>

          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-xs">
            <div className="text-[10px] text-blue-200 uppercase font-semibold">MM Assured Tier</div>
            <div className="text-base font-black text-white mt-0.5">
              Diamond Member
            </div>
          </div>

          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-xs">
            <div className="text-[10px] text-blue-200 uppercase font-semibold">Fast Shipping</div>
            <div className="text-base font-black text-emerald-300 mt-0.5">
              Always Free
            </div>
          </div>

          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-xs">
            <div className="text-[10px] text-blue-200 uppercase font-semibold">Warranty Shield</div>
            <div className="text-base font-black text-white mt-0.5">
              100% Genuine
            </div>
          </div>
        </div>
      </div>

      {/* Saved Wishlist Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <h3 className="text-sm font-extrabold text-slate-900">
              My Saved Wishlist ({wishedProducts.length})
            </h3>
          </div>
        </div>

        {wishedProducts.length === 0 ? (
          <p className="text-xs text-slate-400 py-3 text-center">
            No items in your wishlist. Tap the heart on any product to save it for later.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {wishedProducts.map(p => (
              <div 
                key={p.id}
                className="p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3 bg-slate-50/50"
              >
                <div 
                  onClick={() => setSelectedProduct(p)}
                  className="flex items-center gap-3 cursor-pointer min-w-0"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-contain bg-white p-1 rounded-lg border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{p.name}</h4>
                    <span className="text-xs font-mono-num font-extrabold text-slate-900">
                      ₹{p.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => addToCart(p)}
                    className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition shadow-xs"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Saved Addresses Manager */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-extrabold text-slate-900">
              Manage Delivery Addresses ({user.addresses.length})
            </h3>
          </div>
          <button
            onClick={() => setNewAddrModal(true)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Address</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {user.addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-3.5 rounded-xl border-2 transition space-y-2 ${
                addr.isDefault
                  ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs text-slate-900">{addr.name}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 uppercase">
                    {addr.type}
                  </span>
                </div>
                {addr.isDefault ? (
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">
                    Default
                  </span>
                ) : (
                  <button
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-[11px] text-blue-600 font-bold hover:underline"
                  >
                    Set Default
                  </button>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {addr.address}, {addr.locality}, {addr.city}, {addr.state} - <strong className="text-slate-900 font-mono-num">{addr.pincode}</strong>
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                <span className="font-mono-num text-slate-500">{addr.phone}</span>
                {user.addresses.length > 1 && (
                  <button
                    onClick={() => removeAddress(addr.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Delete address"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Help & Trust Policy */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>MMKART Help Center & Policies</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="font-bold text-slate-900">7-Day Replacement Policy</span>
            <p className="text-slate-500 text-[11px]">
              Hardware defects covered by doorstep courier pickup and replacement.
            </p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="font-bold text-slate-900">Brand Warranty Activation</span>
            <p className="text-slate-500 text-[11px]">
              Official manufacturer warranty valid at Apple, Samsung, Sony service centers nationwide.
            </p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="font-bold text-slate-900">24x7 Priority Support</span>
            <p className="text-slate-500 text-[11px]">
              Toll-free hotline 1800-MM-KART or email support@mmkart.com
            </p>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">Edit Profile</h3>
              <button onClick={() => setEditProfileOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-mono-num"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditProfileOpen(false)}
                  className="flex-1 py-2 border rounded-lg text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white font-bold rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Address Modal */}
      {newAddrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">Add New Address</h3>
              <button onClick={() => setNewAddrModal(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAddNewAddress} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={newAddr.name}
                  onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={newAddr.phone}
                  onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="6-digit Pincode *"
                  value={newAddr.pincode}
                  onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                  className="px-3 py-2 border rounded-lg font-mono-num"
                  required
                />
                <input
                  type="text"
                  placeholder="Locality"
                  value={newAddr.locality}
                  onChange={(e) => setNewAddr({ ...newAddr, locality: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Street / Flat / Building *"
                  value={newAddr.address}
                  onChange={(e) => setNewAddr({ ...newAddr, address: e.target.value })}
                  className="col-span-2 px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="City *"
                  value={newAddr.city}
                  onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="State *"
                  value={newAddr.state}
                  onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    checked={newAddr.type === 'Home'}
                    onChange={() => setNewAddr({ ...newAddr, type: 'Home' })}
                  />
                  <span>Home</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    checked={newAddr.type === 'Work'}
                    onChange={() => setNewAddr({ ...newAddr, type: 'Work' })}
                  />
                  <span>Work</span>
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewAddrModal(false)}
                  className="flex-1 py-2.5 border rounded-xl text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-xl"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
