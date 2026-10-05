import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Banknote, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Calendar, 
  Truck,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Address } from '../types';

export const CheckoutModal: React.FC = () => {
  const { 
    checkoutOpen, 
    setCheckoutOpen, 
    cart, 
    cartTotal, 
    appliedCoupon, 
    user, 
    selectedAddress, 
    setSelectedAddress, 
    addAddress,
    placeOrder,
    showToast 
  } = useApp();

  const [step, setStep] = useState<'address' | 'summary' | 'payment' | 'success'>('address');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('upi');
  const [upiId, setUpiId] = useState('maaz@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardExpiry, setCardExpiry] = useState('11/29');
  const [cardCvv, setCardCvv] = useState('742');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [newOrderNumber, setNewOrderNumber] = useState('');
  
  // New Address Form State
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');
  const [newAddrPincode, setNewAddrPincode] = useState('');
  const [newAddrLocality, setNewAddrLocality] = useState('');
  const [newAddrLine, setNewAddrLine] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrState, setNewAddrState] = useState('');
  const [newAddrType, setNewAddrType] = useState<'Home' | 'Work'>('Home');

  if (!checkoutOpen) return null;

  const finalAmount = Math.max(0, cartTotal - (appliedCoupon?.discount || 0));

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrName || !newAddrPhone || !newAddrPincode || !newAddrLine || !newAddrCity) {
      showToast('Please fill all mandatory address fields', 'warning');
      return;
    }

    addAddress({
      name: newAddrName,
      phone: newAddrPhone,
      pincode: newAddrPincode,
      locality: newAddrLocality || newAddrCity,
      address: newAddrLine,
      city: newAddrCity,
      state: newAddrState || 'Maharashtra',
      isDefault: true,
      type: newAddrType
    });

    setShowNewAddressForm(false);
    showToast('New delivery address selected', 'success');
  };

  const handleCompletePayment = () => {
    if (!selectedAddress) {
      showToast('Please select a delivery address', 'warning');
      setStep('address');
      return;
    }

    setIsProcessing(true);

    let paymentLabel = 'UPI';
    if (selectedPaymentMethod === 'upi') paymentLabel = `UPI (${upiId})`;
    else if (selectedPaymentMethod === 'card') paymentLabel = `Credit Card (${cardNumber.slice(-4)})`;
    else if (selectedPaymentMethod === 'netbanking') paymentLabel = `Net Banking (${selectedBank})`;
    else if (selectedPaymentMethod === 'cod') paymentLabel = 'Cash on Delivery (OTP Verified)';
    else if (selectedPaymentMethod === 'emi') paymentLabel = 'No-Cost EMI (12 Months)';

    setTimeout(() => {
      setIsProcessing(false);
      const created = placeOrder(selectedAddress, paymentLabel, appliedCoupon?.code);
      setNewOrderNumber(created.orderNumber);
      setStep('success');
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center items-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Checkout Header */}
        <div className="bg-[#2874F0] text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] font-bold text-yellow-300 uppercase tracking-widest flex items-center gap-1">
              <Lock className="w-3 h-3 text-yellow-300" />
              100% 256-BIT ENCRYPTED CHECKOUT
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-white">
              {step === 'success' ? 'Order Confirmed!' : 'Secure Order Checkout'}
            </h2>
          </div>
          {step !== 'success' && (
            <button
              onClick={() => setCheckoutOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Multi-Step Indicator */}
        {step !== 'success' && (
          <div className="bg-slate-50 px-5 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-500">
            <button
              onClick={() => setStep('address')}
              className={`flex items-center gap-1 ${
                step === 'address' ? 'text-blue-700 font-bold' : 'text-slate-700'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
              <span>Address</span>
            </button>
            <span className="text-slate-300">———</span>
            <button
              onClick={() => setStep('summary')}
              className={`flex items-center gap-1 ${
                step === 'summary' ? 'text-blue-700 font-bold' : 'text-slate-700'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
              <span>Review</span>
            </button>
            <span className="text-slate-300">———</span>
            <button
              onClick={() => setStep('payment')}
              className={`flex items-center gap-1 ${
                step === 'payment' ? 'text-blue-700 font-bold' : 'text-slate-700'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">3</span>
              <span>Payment</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          
          {/* STEP 1: ADDRESS SELECTION */}
          {step === 'address' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Select Delivery Address
                </h3>
                <button
                  onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New</span>
                </button>
              </div>

              {/* Add New Address Form Modal/Section */}
              {showNewAddressForm && (
                <form onSubmit={handleCreateAddress} className="p-4 bg-slate-50 border border-slate-300 rounded-xl space-y-3">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    New Shipping Address
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={newAddrName}
                      onChange={(e) => setNewAddrName(e.target.value)}
                      className="px-3 py-2 border rounded-lg bg-white"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={newAddrPhone}
                      onChange={(e) => setNewAddrPhone(e.target.value)}
                      className="px-3 py-2 border rounded-lg bg-white"
                      required
                    />
                    <input
                      type="text"
                      placeholder="6-digit Pincode *"
                      value={newAddrPincode}
                      onChange={(e) => setNewAddrPincode(e.target.value)}
                      className="px-3 py-2 border rounded-lg bg-white font-mono-num"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Locality / Area"
                      value={newAddrLocality}
                      onChange={(e) => setNewAddrLocality(e.target.value)}
                      className="px-3 py-2 border rounded-lg bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Flat, House no., Building *"
                      value={newAddrLine}
                      onChange={(e) => setNewAddrLine(e.target.value)}
                      className="col-span-2 px-3 py-2 border rounded-lg bg-white"
                      required
                    />
                    <input
                      type="text"
                      placeholder="City / District *"
                      value={newAddrCity}
                      onChange={(e) => setNewAddrCity(e.target.value)}
                      className="px-3 py-2 border rounded-lg bg-white"
                      required
                    />
                    <input
                      type="text"
                      placeholder="State *"
                      value={newAddrState}
                      onChange={(e) => setNewAddrState(e.target.value)}
                      className="px-3 py-2 border rounded-lg bg-white"
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-blue-600 text-white font-bold text-xs rounded-lg"
                    >
                      Save & Deliver Here
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewAddressForm(false)}
                      className="px-3 py-2 border border-slate-300 text-xs font-semibold rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Saved Addresses List */}
              <div className="space-y-2.5">
                {user.addresses.map((addr) => {
                  const isSelected = selectedAddress?.id === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddress(addr)}
                      className={`p-3.5 rounded-xl border-2 transition cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="address_choice"
                        checked={isSelected}
                        onChange={() => setSelectedAddress(addr)}
                        className="mt-1 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                      />
                      <div className="flex-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900">{addr.name}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 uppercase">
                            {addr.type}
                          </span>
                          <span className="font-mono-num text-slate-600">{addr.phone}</span>
                        </div>
                        <p className="text-slate-600 mt-1 leading-relaxed">
                          {addr.address}, {addr.locality}, {addr.city} - <strong className="text-slate-900 font-mono-num">{addr.pincode}</strong>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setStep('summary')}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <span>Continue to Order Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: ORDER SUMMARY */}
          {step === 'summary' && (
            <div className="space-y-4">
              {/* Delivery Estimation Box */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2.5 text-xs text-blue-900">
                <Truck className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <span className="font-bold">Guaranteed Delivery: </span>
                  Tomorrow by 5:00 PM via MM Express Air priority route
                </div>
              </div>

              {/* Items in this order */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Electronics in this shipment ({cart.length})
                </div>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                  {cart.map(item => (
                    <div key={item.product.id} className="p-3 flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-contain bg-slate-50 p-1 rounded border border-slate-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {item.product.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Qty: <strong className="text-slate-800">{item.quantity}</strong> {item.selectedStorage ? `· ${item.selectedStorage}` : ''}
                        </div>
                      </div>
                      <div className="text-xs font-extrabold text-slate-900 font-mono-num shrink-0">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price summary review */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-mono-num font-semibold text-slate-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon ({appliedCoupon.code})</span>
                    <span className="font-mono-num">-₹{appliedCoupon.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Express Shipping</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>Total Payable</span>
                  <span className="font-mono-num">₹{finalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('address')}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2"
                >
                  <span>Select Payment Method</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 'payment' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  Select Payment Option
                </h3>
                <span className="text-xs font-mono-num font-extrabold text-blue-700">
                  Pay ₹{finalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Payment Methods Accordion */}
              <div className="space-y-2 text-xs">
                
                {/* 1. UPI */}
                <div className={`border-2 rounded-xl p-3 transition cursor-pointer ${
                  selectedPaymentMethod === 'upi' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-200'
                }`}>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <input
                        type="radio"
                        name="payment_method"
                        checked={selectedPaymentMethod === 'upi'}
                        onChange={() => setSelectedPaymentMethod('upi')}
                        className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <Smartphone className="w-4 h-4 text-blue-600" />
                      <span>UPI (Google Pay, PhonePe, Paytm, QR)</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      Fastest
                    </span>
                  </label>

                  {selectedPaymentMethod === 'upi' && (
                    <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
                      <div className="text-[11px] text-slate-600">Enter your UPI ID or VPA:</div>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. yourname@okhdfcbank"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono-num text-xs"
                      />
                      <div className="text-[10px] text-slate-500">
                        A payment request will be sent to your UPI app for instant approval.
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Credit / Debit Cards */}
                <div className={`border-2 rounded-xl p-3 transition cursor-pointer ${
                  selectedPaymentMethod === 'card' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-200'
                }`}>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <input
                        type="radio"
                        name="payment_method"
                        checked={selectedPaymentMethod === 'card'}
                        onChange={() => setSelectedPaymentMethod('card')}
                        className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span>Credit / Debit Card (Visa, MC, RuPay, Amex)</span>
                    </div>
                  </label>

                  {selectedPaymentMethod === 'card' && (
                    <div className="mt-3 pt-3 border-t border-slate-200 space-y-2.5">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Card Number"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono-num text-xs"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono-num text-xs"
                        />
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="CVV"
                          className="px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono-num text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Net Banking */}
                <div className={`border-2 rounded-xl p-3 transition cursor-pointer ${
                  selectedPaymentMethod === 'netbanking' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-200'
                }`}>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <input
                        type="radio"
                        name="payment_method"
                        checked={selectedPaymentMethod === 'netbanking'}
                        onChange={() => setSelectedPaymentMethod('netbanking')}
                        className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span>Net Banking (All Major Indian Banks)</span>
                    </div>
                  </label>

                  {selectedPaymentMethod === 'netbanking' && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-xs font-semibold"
                      >
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="State Bank of India">State Bank of India (SBI)</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* 4. Cash on Delivery */}
                <div className={`border-2 rounded-xl p-3 transition cursor-pointer ${
                  selectedPaymentMethod === 'cod' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-200'
                }`}>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <input
                        type="radio"
                        name="payment_method"
                        checked={selectedPaymentMethod === 'cod'}
                        onChange={() => setSelectedPaymentMethod('cod')}
                        className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <Banknote className="w-4 h-4 text-emerald-600" />
                      <span>Cash on Delivery (Pay cash at doorstep)</span>
                    </div>
                    <span className="text-[10px] text-slate-500">OTP required</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('summary')}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50"
                  disabled={isProcessing}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCompletePayment}
                  disabled={isProcessing}
                  className="flex-1 py-3 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-yellow-400/25 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                      <span>Processing Payment...</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Pay ₹{finalAmount.toLocaleString('en-IN')} & Place Order</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === 'success' && (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Thank you, <strong className="text-slate-800">{user.name}</strong>. Your branded electronics are safely reserved.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left max-w-sm mx-auto space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order Reference:</span>
                  <span className="font-mono-num font-extrabold text-blue-700">{newOrderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Delivery:</span>
                  <span className="font-bold text-slate-900">Tomorrow by 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery Address:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[180px]">
                    {selectedAddress?.locality}, {selectedAddress?.city}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 max-w-sm mx-auto">
                <button
                  type="button"
                  onClick={() => {
                    setCheckoutOpen(false);
                    // activeTrackingOrder is already set in context
                  }}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl transition shadow-md flex items-center justify-center gap-1.5"
                >
                  <Truck className="w-4 h-4" />
                  <span>Track Live Delivery</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
