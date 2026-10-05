import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  ChevronRight, 
  X, 
  AlertCircle,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const OrdersView: React.FC = () => {
  const { orders, setActiveTrackingOrder, activeTrackingOrder, cancelOrder, showToast, setActiveTab } = useApp();

  if (orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">No Orders Yet</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            You haven't placed any electronics orders yet. Discover smartphones, laptops, audio gear, and more.
          </p>
          <button
            onClick={() => setActiveTab('home')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition shadow-md shadow-blue-500/20"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Out for Delivery':
        return 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse';
      case 'Shipped':
      case 'Packed':
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 pb-24 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
            My Orders ({orders.length})
          </h2>
          <p className="text-xs text-slate-500">
            Track live consignments, view invoices and manage replacements
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 transition"
          >
            {/* Header Strip */}
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-slate-900 font-mono-num">
                  {order.orderNumber}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500">{order.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {/* Items Inside Order */}
            <div className="p-4 divide-y divide-slate-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2 first:pt-0 last:pb-0 flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-contain p-1 rounded-lg bg-slate-50 border border-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Qty: {item.quantity} {item.selectedStorage ? `| ${item.selectedStorage}` : ''} {item.selectedColor ? `| ${item.selectedColor}` : ''}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900 font-mono-num">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-slate-400">Paid via {order.paymentMethod}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions Strip */}
            <div className="px-4 py-3 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Truck className="w-3.5 h-3.5 text-blue-600" />
                <span>
                  {order.status === 'Delivered'
                    ? order.estimatedDelivery
                    : `Estimated Delivery: ${order.estimatedDelivery}`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                  <button
                    onClick={() => cancelOrder(order.id)}
                    className="px-2.5 py-1 text-slate-500 hover:text-rose-600 font-semibold hover:bg-rose-50 rounded-lg transition"
                  >
                    Cancel
                  </button>
                )}
                
                <button
                  onClick={() => {
                    showToast(`Downloading Tax Invoice for ${order.orderNumber}...`, 'info');
                  }}
                  className="px-2.5 py-1 text-slate-700 hover:bg-slate-200/80 rounded-lg font-semibold flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Invoice</span>
                </button>

                <button
                  onClick={() => setActiveTrackingOrder(order)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-xs flex items-center gap-1"
                >
                  <span>Track Consignment</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tracking Modal */}
      {activeTrackingOrder && (
        <OrderTrackingModal
          order={activeTrackingOrder}
          onClose={() => setActiveTrackingOrder(null)}
        />
      )}
    </div>
  );
};

export const OrderTrackingModal: React.FC<{ order: Order; onClose: () => void }> = ({
  order,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center items-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#2874F0] text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div>
            <div className="text-[10px] text-yellow-300 font-bold uppercase tracking-wider">
              Live Courier Tracking
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-white font-mono-num">
              {order.orderNumber}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Courier Details Banner */}
        <div className="bg-blue-50/80 p-4 border-b border-blue-200/60 flex items-center justify-between text-xs">
          <div>
            <div className="text-slate-500 font-medium">Logistics Partner:</div>
            <div className="font-extrabold text-blue-900">{order.courierName}</div>
          </div>
          <div className="text-right">
            <div className="text-slate-500 font-medium">Tracking AWB:</div>
            <div className="font-extrabold text-slate-900 font-mono-num">{order.trackingNumber}</div>
          </div>
        </div>

        {/* Tracking Timeline Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          
          {/* Visual Step-by-Step Progress */}
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {order.trackingSteps.map((step, idx) => (
              <div key={idx} className="relative">
                <div
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 transition ${
                    step.completed
                      ? 'bg-emerald-600 border-white text-white shadow-xs'
                      : 'bg-white border-slate-300 text-slate-300'
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-600 text-white" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  )}
                </div>

                <div className="text-xs">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-bold ${
                        step.completed ? 'text-slate-900' : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="text-[11px] font-mono-num text-slate-400">{step.time}</span>
                  </div>
                  <p className="text-slate-600 mt-0.5">{step.description}</p>
                  {step.location && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded mt-1">
                      <MapPin className="w-2.5 h-2.5" />
                      {step.location}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Address Snapshot */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Delivering to</span>
            </div>
            <p className="text-slate-600">
              {order.shippingAddress.name} ({order.shippingAddress.phone})
              <br />
              {order.shippingAddress.address}, {order.shippingAddress.locality}, {order.shippingAddress.city} - {order.shippingAddress.pincode}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-blue-700"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
