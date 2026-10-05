import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, ShieldCheck, CreditCard, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SALE_BANNER_IMAGE } from '../data/products';

interface BannerSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  highlight: string;
  ctaText: string;
  image: string;
  categoryFilter?: 'Mobiles' | 'Laptops' | 'Headphones' | 'TVs';
  brandFilter?: 'Apple' | 'Samsung' | 'Sony';
  bgGradient: string;
}

const SLIDES: BannerSlide[] = [
  {
    id: 'slide-1',
    badge: 'GRAND ELECTRONICS CARNIVAL',
    title: 'Next-Gen Flagships',
    subtitle: 'Apple, Samsung, Sony & Dell Workstations',
    highlight: 'Up to ₹12,000 Bank Off + No Cost EMI up to 24 Months',
    ctaText: 'Explore Flagships',
    image: SALE_BANNER_IMAGE,
    bgGradient: 'from-blue-900 via-blue-800 to-indigo-900'
  },
  {
    id: 'slide-2',
    badge: 'APPLE AUTHORIZED SHOWCASE',
    title: 'iPhone 16 Pro & MacBook M3',
    subtitle: 'Grade 5 Titanium & 3nm Computational Speed',
    highlight: 'Instant ₹5,000 to ₹10,000 Off on HDFC & ICICI Cards',
    ctaText: 'Shop Apple',
    image: '/src/assets/images/product_iphone_16_pro_1791200757127.jpg',
    brandFilter: 'Apple',
    bgGradient: 'from-slate-900 via-zinc-800 to-neutral-900'
  },
  {
    id: 'slide-3',
    badge: 'SONY AUDIO EXPERIENCES',
    title: 'Sony WH-1000XM5 Noise Cancelling',
    subtitle: 'Auto NC Optimizer with Dual HD Processors',
    highlight: 'Special Festival Price: ₹26,990 (Flat 23% Off)',
    ctaText: 'Discover Audio',
    image: '/src/assets/images/product_sony_wh1000xm5_1791200792703.jpg',
    categoryFilter: 'Headphones',
    bgGradient: 'from-blue-950 via-slate-900 to-blue-900'
  }
];

export const HeroBannerSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setFilters, setActiveTab, setSelectedProduct, products } = useApp();

  // Auto advance slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  const handleCtaClick = () => {
    if (slide.brandFilter) {
      setFilters(prev => ({
        ...prev,
        category: 'All',
        brands: [slide.brandFilter!],
        searchQuery: ''
      }));
    } else if (slide.categoryFilter) {
      setFilters(prev => ({
        ...prev,
        category: slide.categoryFilter!,
        brands: [],
        searchQuery: ''
      }));
    } else {
      setFilters(prev => ({ ...prev, category: 'All', brands: [], searchQuery: '' }));
    }
    setActiveTab('home');
  };

  return (
    <div className="relative overflow-hidden bg-slate-900">
      {/* Banner Slide Container */}
      <div className={`relative bg-gradient-to-r ${slide.bgGradient} text-white transition-all duration-700 ease-in-out`}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 md:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center min-h-[220px] sm:min-h-[260px] md:min-h-[280px]">
          
          {/* Content Column */}
          <div className="md:col-span-7 z-10 space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-400 text-slate-950 font-extrabold text-[10px] tracking-wide uppercase shadow-sm">
              <Sparkles className="w-3 h-3 fill-slate-950" />
              <span>{slide.badge}</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {slide.title}
            </h2>

            <p className="text-xs sm:text-sm text-blue-100 max-w-lg">
              {slide.subtitle}
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-yellow-300 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/15 w-fit">
              <Zap className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
              <span>{slide.highlight}</span>
            </div>

            <div className="pt-1 flex items-center gap-3">
              <button
                onClick={handleCtaClick}
                className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-yellow-400/20 flex items-center gap-1.5 group cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-blue-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Brand Sealed Guarantee</span>
              </div>
            </div>
          </div>

          {/* Image Showcase Column */}
          <div className="md:col-span-5 flex items-center justify-center relative">
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/5 backdrop-blur-xs">
              <img
                src={slide.image}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={() => setCurrentSlide(prev => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setCurrentSlide(prev => (prev + 1) % SLIDES.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-6 bg-yellow-400' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust Strip below banner */}
      <div className="bg-[#0A2540] border-t border-blue-900/60 py-2 px-4 text-slate-300 text-[11px] sm:text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-around flex-wrap gap-2 text-center">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium text-white">MM Assured Genuine</span>
          </div>
          <div className="hidden xs:flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-yellow-400 shrink-0" />
            <span className="font-medium text-white">Express 24h Dispatch</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="font-medium text-white">No-Cost EMI on Cards</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-yellow-300 shrink-0" />
            <span className="font-medium text-white">Earn SuperCoins on every order</span>
          </div>
        </div>
      </div>
    </div>
  );
};
