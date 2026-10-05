import { Product } from '../types';

export const SALE_BANNER_IMAGE = '/src/assets/images/banner_electronics_sale_1791200743695.jpg';

export const PRODUCTS: Product[] = [
  // --- MOBILES ---
  {
    id: 'mob-apple-16pro',
    name: 'Apple iPhone 16 Pro (Desert Titanium, 256 GB)',
    brand: 'Apple',
    category: 'Mobiles',
    tagline: 'Titanium design with A18 Pro chip and 48MP Fusion camera system',
    price: 129900,
    originalPrice: 139900,
    discountPercent: 7,
    rating: 4.8,
    ratingCount: 14280,
    reviewsCount: 1820,
    image: '/src/assets/images/product_iphone_16_pro_1791200757127.jpg',
    inStock: true,
    stockCount: 18,
    isAssured: true,
    deliveryDays: 1,
    badge: 'Bestseller',
    highlights: [
      '256 GB ROM | Grade 5 Titanium finish',
      '15.93 cm (6.3 inch) Super Retina XDR ProMotion OLED Display',
      '48MP + 48MP + 12MP Camera | 12MP TrueDepth Front Camera',
      'A18 Pro Bionic Chip with 6-Core GPU & Neural Engine',
      'All-day battery life with USB-C 3.0 transfer speed'
    ],
    specs: [
      {
        group: 'Display Features',
        items: [
          { label: 'Display Size', value: '15.93 cm (6.3 inch)' },
          { label: 'Resolution', value: '2622 x 1206 Pixels' },
          { label: 'Display Type', value: 'Super Retina XDR OLED with Always-On' },
          { label: 'Refresh Rate', value: '120 Hz ProMotion' }
        ]
      },
      {
        group: 'Processor & Memory',
        items: [
          { label: 'Processor', value: 'A18 Pro Bionic Chip (3nm)' },
          { label: 'Internal Storage', value: '256 GB' },
          { label: 'RAM', value: '8 GB LPDDR5X' }
        ]
      },
      {
        group: 'Camera Features',
        items: [
          { label: 'Rear Camera', value: '48MP Main + 48MP Ultra-Wide + 12MP 5x Telephoto' },
          { label: 'Front Camera', value: '12MP TrueDepth with Autofocus' },
          { label: 'Video Recording', value: '4K Dolby Vision at 120 fps' }
        ]
      },
      {
        group: 'Warranty & In The Box',
        items: [
          { label: 'Warranty Summary', value: '1 Year Apple International Warranty' },
          { label: 'In The Box', value: 'iPhone 16 Pro, USB-C Charge Cable, Documentation' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Rohit Sharma',
        rating: 5,
        date: '3 days ago',
        title: 'Outstanding camera & battery upgrade!',
        comment: 'Upgraded from 13 Pro. The Desert Titanium looks ultra-sleek, thermals are much better, and 4K 120fps recording is unmatched.',
        verified: true,
        helpfulCount: 42
      },
      {
        id: 'rev-2',
        author: 'Priya Sundaram',
        rating: 5,
        date: '1 week ago',
        title: 'True flagship experience',
        comment: 'Lightning fast delivery by MMKART within 24 hours. The Camera Control button is really handy once you get used to it.',
        verified: true,
        helpfulCount: 19
      }
    ],
    colors: [
      { name: 'Desert Titanium', hex: '#C5B39E' },
      { name: 'Natural Titanium', hex: '#9E9A93' },
      { name: 'White Titanium', hex: '#E3E4E5' },
      { name: 'Black Titanium', hex: '#3B3B3D' }
    ],
    storageOptions: ['128 GB', '256 GB', '512 GB', '1 TB'],
    bankOffer: 'Flat ₹5,000 Instant Discount on HDFC & ICICI Credit Cards',
    emiStartsAt: 6290
  },
  {
    id: 'mob-samsung-s25ultra',
    name: 'Samsung Galaxy S25 Ultra 5G (Titanium Gray, 512 GB)',
    brand: 'Samsung',
    category: 'Mobiles',
    tagline: 'Galaxy AI with Snapdragon 8 Elite, 200MP Quad Camera & Built-in S Pen',
    price: 139999,
    originalPrice: 149999,
    discountPercent: 6,
    rating: 4.9,
    ratingCount: 11200,
    reviewsCount: 1450,
    image: '/src/assets/images/product_samsung_s25_ultra_1791200769437.jpg',
    inStock: true,
    stockCount: 12,
    isAssured: true,
    deliveryDays: 1,
    badge: 'Trending',
    highlights: [
      '512 GB ROM | 12 GB RAM | Built-in S-Pen',
      '17.27 cm (6.8 inch) Quad HD+ Dynamic AMOLED 2X Display (2600 nits)',
      '200MP + 50MP + 50MP + 10MP Quad Telephoto Camera | 12MP Front Camera',
      'Snapdragon 8 Elite for Galaxy (3nm)',
      '5000 mAh Battery with 45W Fast Charging'
    ],
    specs: [
      {
        group: 'Display & Design',
        items: [
          { label: 'Display Size', value: '17.27 cm (6.8 inch)' },
          { label: 'Resolution', value: '3120 x 1440 (Quad HD+)' },
          { label: 'Protection', value: 'Corning Gorilla Armor (Anti-Reflective)' },
          { label: 'Stylus Support', value: 'Embedded S Pen with Bluetooth LE' }
        ]
      },
      {
        group: 'Performance & OS',
        items: [
          { label: 'Processor', value: 'Snapdragon 8 Elite for Galaxy Octa-Core' },
          { label: 'RAM', value: '12 GB LPDDR5X' },
          { label: 'OS', value: 'One UI 7 (Android 15) with 7 years of OS updates' }
        ]
      },
      {
        group: 'Camera',
        items: [
          { label: 'Primary Rear', value: '200MP OIS Sensor with AI ProVisual Engine' },
          { label: 'Optical Zoom', value: '3x and 5x Dual Optical Telephoto, 100x Space Zoom' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-s1',
        author: 'Arun K.',
        rating: 5,
        date: '5 days ago',
        title: 'The display is in a league of its own',
        comment: 'No glare thanks to the anti-reflective armor screen. Galaxy AI Circle to Search and live translation work effortlessly.',
        verified: true,
        helpfulCount: 38
      }
    ],
    colors: [
      { name: 'Titanium Gray', hex: '#63666A' },
      { name: 'Titanium Black', hex: '#2B2B2C' },
      { name: 'Titanium Silver', hex: '#D8D9DD' }
    ],
    storageOptions: ['256 GB', '512 GB', '1 TB'],
    bankOffer: '₹8,000 Bonus on Exchange or ₹6,000 Bank Cashback',
    emiStartsAt: 6790
  },
  {
    id: 'mob-oneplus-13',
    name: 'OnePlus 13 5G (Midnight Ocean, 256 GB)',
    brand: 'OnePlus',
    category: 'Mobiles',
    tagline: 'Hasselblad Camera with Snapdragon 8 Elite & 6000 mAh Glacier Battery',
    price: 69999,
    originalPrice: 74999,
    discountPercent: 7,
    rating: 4.7,
    ratingCount: 8940,
    reviewsCount: 920,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 25,
    isAssured: true,
    deliveryDays: 2,
    badge: 'Special Deal',
    highlights: [
      '16 GB RAM | 256 GB UFS 4.0 Storage',
      '17.32 cm (6.82 inch) 2K 120Hz ProXDR Display with Dolby Vision',
      '50MP LYT-808 + 50MP Periscope + 50MP Ultra-Wide Hasselblad Setup',
      '6000 mAh Silicon-Carbon Battery with 100W SUPERVOOC charging'
    ],
    specs: [
      {
        group: 'General',
        items: [
          { label: 'Processor', value: 'Snapdragon 8 Elite Mobile Platform' },
          { label: 'Battery Capacity', value: '6000 mAh' },
          { label: 'Charging', value: '100W Wired + 50W Wireless AIRVOOC' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-op1',
        author: 'Vikram Joshi',
        rating: 5,
        date: '2 weeks ago',
        title: 'Monster battery life!',
        comment: 'Easily lasts 2 full days of heavy usage. Charges in 25 mins from 0 to 100%. OxygenOS is butter smooth.',
        verified: true,
        helpfulCount: 27
      }
    ],
    colors: [
      { name: 'Midnight Ocean', hex: '#1C3144' },
      { name: 'Arctic Dawn', hex: '#EAEFF2' },
      { name: 'Black Eclipse', hex: '#1A1A1A' }
    ],
    storageOptions: ['256 GB', '512 GB'],
    bankOffer: 'Instant ₹4,000 Off on SBI & OneCard Credit Cards',
    emiStartsAt: 3390
  },
  {
    id: 'mob-xiaomi-15pro',
    name: 'Xiaomi 15 Pro 5G (Titanium Gray, 256 GB)',
    brand: 'Xiaomi',
    category: 'Mobiles',
    tagline: 'Leica Summilux Optical Lens with Snapdragon 8 Elite & HyperOS 2.0',
    price: 64999,
    originalPrice: 69999,
    discountPercent: 7,
    rating: 4.6,
    ratingCount: 4200,
    reviewsCount: 510,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 15,
    isAssured: true,
    deliveryDays: 2,
    highlights: [
      '12 GB RAM | 256 GB ROM',
      '6.73 inch 2K Micro-Curved OLED Display with 3200 nits Peak Brightness',
      'Triple 50MP Leica Cameras with 5X Periscope',
      '6100 mAh High-Density Battery + 90W HyperCharge'
    ],
    specs: [
      {
        group: 'Display & Camera',
        items: [
          { label: 'Co-engineered with', value: 'Leica Optical Systems' },
          { label: 'Sensor', value: '50MP Light Fusion 900 sensor' },
          { label: 'Operating System', value: 'Xiaomi HyperOS 2.0 based on Android 15' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-xm1',
        author: 'Sameer Sen',
        rating: 5,
        date: '10 days ago',
        title: 'Leica portrait colors are phenomenal',
        comment: 'The authentic Leica look gives photos an aesthetic no other phone can produce.',
        verified: true,
        helpfulCount: 15
      }
    ],
    bankOffer: '₹3,000 Instant Discount with ICICI Cards',
    emiStartsAt: 3150
  },

  // --- LAPTOPS ---
  {
    id: 'lap-apple-mbp16',
    name: 'Apple MacBook Pro 16" (Space Black, M3 Max, 36GB RAM, 1TB SSD)',
    brand: 'Apple',
    category: 'Laptops',
    tagline: 'M3 Max 14-core CPU, 30-core GPU, Liquid Retina XDR with 22hr battery life',
    price: 349900,
    originalPrice: 369900,
    discountPercent: 5,
    rating: 4.9,
    ratingCount: 3120,
    reviewsCount: 480,
    image: '/src/assets/images/product_macbook_pro_m3_1791200781505.jpg',
    inStock: true,
    stockCount: 7,
    isAssured: true,
    deliveryDays: 1,
    badge: 'Top Rated',
    highlights: [
      'Apple M3 Max Chip (14-Core CPU, 30-Core GPU, 16-Core Neural Engine)',
      '36 GB Unified High-Bandwidth Memory | 1 TB Superfast SSD',
      '41.05 cm (16.2 inch) Liquid Retina XDR Display with 10,000 Mini-LEDs',
      'Up to 22 Hours Battery Life | MagSafe 3 | 3x Thunderbolt 4 Ports',
      'Six-speaker sound system with Spatial Audio & Force-Cancelling Woofers'
    ],
    specs: [
      {
        group: 'Processor & Graphics',
        items: [
          { label: 'Chipset', value: 'Apple M3 Max (3nm Architecture)' },
          { label: 'CPU Cores', value: '14 Cores (10 Performance + 4 Efficiency)' },
          { label: 'GPU Cores', value: '30 Cores Hardware-Accelerated Ray Tracing' }
        ]
      },
      {
        group: 'Display & Audio',
        items: [
          { label: 'Screen Size', value: '16.2 inch Liquid Retina XDR' },
          { label: 'Brightness', value: '1,000 nits sustained, 1,600 nits peak (HDR)' },
          { label: 'Color Gamut', value: 'Wide Color (P3), True Tone technology' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-mb1',
        author: 'Devendra V.',
        rating: 5,
        date: '2 weeks ago',
        title: 'Absolute workstation powerhouse',
        comment: 'Compiles massive codebases in seconds. 4K ProRes timeline scrubbing is completely instantaneous without fan noise.',
        verified: true,
        helpfulCount: 52
      }
    ],
    colors: [
      { name: 'Space Black', hex: '#26282B' },
      { name: 'Silver', hex: '#E3E4E5' }
    ],
    bankOffer: 'Flat ₹10,000 Instant Discount on HDFC Bank Credit Cards',
    emiStartsAt: 16950
  },
  {
    id: 'lap-dell-xps16',
    name: 'Dell XPS 16 9640 (Intel Core Ultra 9, RTX 4070, 32GB RAM, 1TB SSD)',
    brand: 'Dell',
    category: 'Laptops',
    tagline: 'Seamless glass touch bar, 4K+ OLED InfinityEdge display and CNC aluminum chassis',
    price: 279990,
    originalPrice: 299990,
    discountPercent: 7,
    rating: 4.7,
    ratingCount: 2150,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 9,
    isAssured: true,
    deliveryDays: 2,
    highlights: [
      'Intel Core Ultra 9 185H with Dedicated Intel AI Boost NPU',
      'NVIDIA GeForce RTX 4070 8GB GDDR6 Dedicated Graphics',
      '40.64 cm (16.3 inch) 4K+ (3840 x 2400) OLED Touchscreen Display',
      '32 GB LPDDR5x 7467 MT/s RAM | 1 TB PCIe 4.0 NVMe SSD'
    ],
    specs: [
      {
        group: 'Hardware Specifications',
        items: [
          { label: 'Processor', value: 'Intel Core Ultra 9 185H (16 cores, up to 5.1 GHz)' },
          { label: 'Graphics', value: 'NVIDIA GeForce RTX 4070 8GB' },
          { label: 'Weight', value: '2.13 kg CNC Machined Aluminum' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-dl1',
        author: 'Nikhil R.',
        rating: 5,
        date: '3 weeks ago',
        title: 'Most futuristic Windows laptop',
        comment: 'The invisible trackpad and haptic function row look stunning. Handles 3D Blender renders effortlessly.',
        verified: true,
        helpfulCount: 22
      }
    ],
    bankOffer: 'Instant ₹7,500 Off with Axis Bank Cards',
    emiStartsAt: 13580
  },
  {
    id: 'lap-hp-spectre16',
    name: 'HP Spectre x360 2-in-1 (Intel Core Ultra 7, 32GB, 1TB SSD, 2.8K OLED)',
    brand: 'HP',
    category: 'Laptops',
    tagline: '360 degree convertible elegance with IMAX Enhanced OLED touchscreen & Tilt Pen',
    price: 184990,
    originalPrice: 199990,
    discountPercent: 8,
    rating: 4.8,
    ratingCount: 1890,
    reviewsCount: 240,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 14,
    isAssured: true,
    deliveryDays: 2,
    highlights: [
      'Intel Core Ultra 7 155H with Intel Arc Graphics',
      '40.6 cm (16 inch) 2.8K (2880 x 1800) 120Hz OLED Touch Display',
      '32 GB LPDDR5x RAM | 1 TB M.2 Gen4 SSD',
      '9MP AI Infrared Webcam with Privacy Shutter',
      'Poly Studio Quad Speakers with Audio Boost'
    ],
    specs: [
      {
        group: 'General',
        items: [
          { label: 'Form Factor', value: 'Convertible 2-in-1 Touch Laptop' },
          { label: 'Included Pen', value: 'HP Rechargeable MPP 2.0 Tilt Pen' },
          { label: 'Battery', value: '83 Wh Li-ion with 100W Fast Charge' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-hp1',
        author: 'Kavita M.',
        rating: 5,
        date: '1 month ago',
        title: 'Magnificent OLED display & audio',
        comment: 'Using it for digital art and architecture models. The 120Hz OLED screen is pure joy.',
        verified: true,
        helpfulCount: 16
      }
    ],
    bankOffer: 'Flat ₹5,000 Off on Federal & ICICI Cards',
    emiStartsAt: 8970
  },
  {
    id: 'lap-lenovo-legion7',
    name: 'Lenovo Legion Pro 7i (Intel Core i9 14th Gen, RTX 4080, 32GB, 1TB SSD)',
    brand: 'Lenovo',
    category: 'Laptops',
    tagline: 'AI-tuned Legion Coldfront 5.0 cooling with 240Hz PureSight Gaming Display',
    price: 244990,
    originalPrice: 264990,
    discountPercent: 8,
    rating: 4.9,
    ratingCount: 2950,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 8,
    isAssured: true,
    deliveryDays: 2,
    badge: 'Bestseller',
    highlights: [
      'Intel Core i9-14900HX (24 Cores, up to 5.8 GHz Turbo)',
      'NVIDIA GeForce RTX 4080 12GB GDDR6 (175W TGP)',
      '40.64 cm (16 inch) WQXGA 240Hz 500 nits 100% DCI-P3 Display',
      '32 GB DDR5 5600MHz RAM | 1 TB PCIe 4.0 SSD',
      'Per-Key RGB Legion TrueStrike Keyboard'
    ],
    specs: [
      {
        group: 'Gaming Rig',
        items: [
          { label: 'GPU TGP', value: '175W Maximum Graphics Power' },
          { label: 'Cooling', value: 'Vapor Chamber with Dual Turbofan' },
          { label: 'Display Sync', value: 'NVIDIA G-SYNC & AMD FreeSync Premium' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-ln1',
        author: 'Aditya Gupta',
        rating: 5,
        date: '2 weeks ago',
        title: 'Unbelievable frame rates in Cyberpunk',
        comment: 'Runs everything on Ultra ray tracing smoothly at 100+ FPS. Build quality is rock solid.',
        verified: true,
        helpfulCount: 31
      }
    ],
    bankOffer: '₹6,000 Instant Discount with HDFC Cards',
    emiStartsAt: 11890
  },

  // --- TABLETS ---
  {
    id: 'tab-apple-ipadpro13',
    name: 'Apple iPad Pro 13" M4 (Space Black, Wi-Fi, 256 GB)',
    brand: 'Apple',
    category: 'Tablets',
    tagline: 'Thinnest Apple product ever with breakthrough Ultra Retina XDR Tandem OLED',
    price: 129900,
    originalPrice: 134900,
    discountPercent: 4,
    rating: 4.9,
    ratingCount: 5210,
    reviewsCount: 640,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 16,
    isAssured: true,
    deliveryDays: 1,
    badge: 'Trending',
    highlights: [
      'Apple M4 Chip with 10-core GPU and Next-Gen Neural Engine',
      '13-inch Ultra Retina XDR with Tandem OLED Technology',
      '5.1 mm Ultra-thin Lightweight Architectural Design',
      'Supports Apple Pencil Pro and redesigned Magic Keyboard',
      '12MP Landscape Center Stage Front Camera + 12MP Wide Back Camera'
    ],
    specs: [
      {
        group: 'Display & Chip',
        items: [
          { label: 'Display Panel', value: 'Tandem OLED with 1,000 nits full-screen brightness' },
          { label: 'Chipset', value: 'Apple M4 Chip (3nm Second Gen)' },
          { label: 'Thickness', value: 'Just 5.1 mm' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-ip1',
        author: 'Siddharth M.',
        rating: 5,
        date: '4 days ago',
        title: 'Tandem OLED is breathtaking',
        comment: 'The contrast levels and HDR brightness make editing 4K footage a dream. So incredibly light.',
        verified: true,
        helpfulCount: 29
      }
    ],
    bankOffer: 'Flat ₹4,000 Instant Discount on HDFC Credit Cards',
    emiStartsAt: 6290
  },
  {
    id: 'tab-samsung-tabs10ultra',
    name: 'Samsung Galaxy Tab S10 Ultra 5G (Moonstone Gray, 256 GB, with S Pen)',
    brand: 'Samsung',
    category: 'Tablets',
    tagline: '14.6" Dynamic AMOLED 2X Anti-Reflection Display with Galaxy AI & IP68 S-Pen',
    price: 122999,
    originalPrice: 133999,
    discountPercent: 8,
    rating: 4.8,
    ratingCount: 3840,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 11,
    isAssured: true,
    deliveryDays: 1,
    highlights: [
      '37.08 cm (14.6 inch) Dynamic AMOLED 2X 120Hz Anti-Reflective Screen',
      '12 GB RAM | 256 GB ROM (Expandable up to 1.5 TB)',
      'MediaTek Dimensity 9300+ Flagship 4nm Processor',
      'Included IP68 Water-Resistant S Pen in the box',
      '11,200 mAh Giant Battery with 45W Fast Charging'
    ],
    specs: [
      {
        group: 'Hardware',
        items: [
          { label: 'Water & Dust Resistance', value: 'IP68 Certified Tablet & S Pen' },
          { label: 'Audio', value: 'Quad Speakers tuned by AKG with Dolby Atmos' },
          { label: 'Productivity Mode', value: 'Samsung DeX Desktop Environment' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-st1',
        author: 'Manish T.',
        rating: 5,
        date: '2 weeks ago',
        title: 'Replaced my secondary laptop',
        comment: 'Samsung DeX mode connected to monitor works just like a desktop. The 14.6 inch screen is enormous.',
        verified: true,
        helpfulCount: 24
      }
    ],
    bankOffer: '₹7,000 Instant Discount with Axis & ICICI Cards',
    emiStartsAt: 5960
  },

  // --- SMARTWATCHES ---
  {
    id: 'watch-apple-ultra2',
    name: 'Apple Watch Ultra 2 GPS + Cellular (Black Titanium, 49mm Ocean Band)',
    brand: 'Apple',
    category: 'Smartwatches',
    tagline: 'The ultimate sports & adventure smartwatch with 3000 nits display and S9 SiP',
    price: 89900,
    originalPrice: 94900,
    discountPercent: 5,
    rating: 4.9,
    ratingCount: 6840,
    reviewsCount: 780,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 19,
    isAssured: true,
    deliveryDays: 1,
    badge: 'Bestseller',
    highlights: [
      '49 mm Grade 5 Corrosion-resistant Black Titanium Case',
      '3,000 nits Always-On Retina OLED Display with Sapphire crystal front',
      'Precision Dual-frequency GPS (L1 and L5) with Trail trackback',
      '100m Water Resistance | Certified EN13319 for Recreational Scuba Diving',
      'Up to 36 hours regular use or 72 hours in Low Power Mode'
    ],
    specs: [
      {
        group: 'Sensors & Features',
        items: [
          { label: 'Sensors', value: 'ECG, Blood Oxygen, Skin Temperature, Depth Gauge, Water Temp' },
          { label: 'Emergency', value: '86-decibel Siren audible up to 180 meters' },
          { label: 'Connectivity', value: 'LTE and UMTS Cellular built-in, Wi-Fi, Bluetooth 5.3' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-aw1',
        author: 'Capt. Varun Mehta',
        rating: 5,
        date: '1 week ago',
        title: 'Built like a tank',
        comment: 'Took it on a trekking expedition to Ladakh. The battery easily lasted 3 days and GPS tracking was pinpoint accurate.',
        verified: true,
        helpfulCount: 41
      }
    ],
    bankOffer: 'Flat ₹3,000 Off on HDFC Credit Cards',
    emiStartsAt: 4350
  },
  {
    id: 'watch-samsung-ultra',
    name: 'Samsung Galaxy Watch Ultra 47mm LTE (Titanium White, Marine Band)',
    brand: 'Samsung',
    category: 'Smartwatches',
    tagline: 'Cushion design with Grade 4 Titanium, 10ATM water resistance & Dual GPS',
    price: 59999,
    originalPrice: 64999,
    discountPercent: 8,
    rating: 4.7,
    ratingCount: 4100,
    reviewsCount: 490,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 14,
    isAssured: true,
    deliveryDays: 1,
    highlights: [
      '47 mm Titanium Grade 4 Rugged Case with Sapphire Crystal',
      'Quick Button for instant workout control and emergency siren',
      'Dual-Frequency GPS (L1+L5) with BioActive Sensor (Blood Pressure & ECG)',
      'Up to 100 Hours Battery Life in Power Saving Mode'
    ],
    specs: [
      {
        group: 'Durability',
        items: [
          { label: 'Resistance', value: '10ATM + IP68 + MIL-STD-810H Military Standard' },
          { label: 'Operating Altitude', value: '-500m to 9000m Extreme Altitude' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-gw1',
        author: 'Deepak S.',
        rating: 5,
        date: '3 weeks ago',
        title: 'Superb fitness companion for Android users',
        comment: 'Heart rate accuracy matches chest straps. Sleep apnea detection and energy score are super insightful.',
        verified: true,
        helpfulCount: 18
      }
    ],
    bankOffer: '₹5,000 Instant Cashback on ICICI Cards',
    emiStartsAt: 2900
  },

  // --- HEADPHONES ---
  {
    id: 'head-sony-xm5',
    name: 'Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones (Silver)',
    brand: 'Sony',
    category: 'Headphones',
    tagline: 'Industry-leading noise cancellation with 8 microphones & Auto NC Optimizer',
    price: 26990,
    originalPrice: 34990,
    discountPercent: 23,
    rating: 4.8,
    ratingCount: 22400,
    reviewsCount: 3100,
    image: '/src/assets/images/product_sony_wh1000xm5_1791200792703.jpg',
    inStock: true,
    stockCount: 34,
    isAssured: true,
    deliveryDays: 1,
    badge: 'Bestseller',
    highlights: [
      'Two Processors (Integrated Processor V1 + HD Noise Cancelling Processor QN1)',
      '30 Hours Battery Life with Quick Charge (3 min charge = 3 hours playback)',
      'Precision Voice Pickup Technology with 4 Beamforming Microphones',
      'Ultra-comfortable lightweight soft fit leather headband',
      'Multipoint connection: Seamlessly switch between phone and laptop'
    ],
    specs: [
      {
        group: 'Audio Features',
        items: [
          { label: 'Driver Unit', value: '30mm Carbon Fiber Composite Dome' },
          { label: 'Hi-Res Audio', value: 'LDAC and DSEE Extreme upscaling supported' },
          { label: 'Frequency Response', value: '4 Hz - 40,000 Hz' }
        ]
      },
      {
        group: 'Battery & Connectivity',
        items: [
          { label: 'Battery Life', value: '30 hours (NC ON), 40 hours (NC OFF)' },
          { label: 'Bluetooth Version', value: 'Bluetooth 5.2 (SBC, AAC, LDAC)' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-xm1',
        author: 'Alok Nambiar',
        rating: 5,
        date: '2 days ago',
        title: 'Airplane cabin noise completely vanished',
        comment: 'Flew from Delhi to London and these headphones were a lifesaver. The call quality and comfort over long hours are unmatched.',
        verified: true,
        helpfulCount: 64
      },
      {
        id: 'rev-xm2',
        author: 'Shreya Roy',
        rating: 5,
        date: '1 week ago',
        title: 'Soundstage is crystal clear',
        comment: 'Bass is tight, mids are pristine. Best ANC headphones on the market hands down.',
        verified: true,
        helpfulCount: 28
      }
    ],
    colors: [
      { name: 'Silver Matte', hex: '#E4E4E6' },
      { name: 'Midnight Blue', hex: '#1E2D4A' },
      { name: 'Black', hex: '#1C1C1E' }
    ],
    bankOffer: 'Instant ₹2,500 Off with HDFC & Axis Bank Debit/Credit Cards',
    emiStartsAt: 1310
  },
  {
    id: 'head-apple-airpodsmax',
    name: 'Apple AirPods Max (USB-C, Starlight)',
    brand: 'Apple',
    category: 'Headphones',
    tagline: 'Computational audio with Apple-designed dynamic driver & Spatial Audio',
    price: 59900,
    originalPrice: 64900,
    discountPercent: 8,
    rating: 4.8,
    ratingCount: 9140,
    reviewsCount: 1120,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 12,
    isAssured: true,
    deliveryDays: 1,
    badge: 'Trending',
    highlights: [
      'Apple H1 headphone chip in each ear cup for computational audio',
      'Personalized Spatial Audio with dynamic head tracking',
      'Knit-mesh canopy and acoustically engineered memory foam ear cushions',
      'Now with USB-C Charging and 20 hours listening time'
    ],
    specs: [
      {
        group: 'Audio & Connectivity',
        items: [
          { label: 'Chip', value: 'Apple H1 chip in each ear cup' },
          { label: 'Connector', value: 'USB-C Charging & Lossless Audio' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-ap1',
        author: 'Tanmay Bhatt',
        rating: 5,
        date: '5 days ago',
        title: 'Cinema in your ears with Apple TV 4K',
        comment: 'Spatial audio watching movies is mind-bending. The aluminum earcups and mesh canopy feel ultra luxurious.',
        verified: true,
        helpfulCount: 35
      }
    ],
    bankOffer: '₹3,000 Instant Discount on ICICI Cards',
    emiStartsAt: 2900
  },

  // --- TELEVISIONS ---
  {
    id: 'tv-sony-bravia9',
    name: 'Sony BRAVIA 9 65" Mini LED 4K Ultra HD Google TV (K-65XR90)',
    brand: 'Sony',
    category: 'TVs',
    tagline: 'Brightest 4K TV ever made by Sony with XR Processor & Studio Calibrated Modes',
    price: 249990,
    originalPrice: 289990,
    discountPercent: 14,
    rating: 4.9,
    ratingCount: 3400,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 6,
    isAssured: true,
    deliveryDays: 2,
    badge: 'Top Rated',
    highlights: [
      '164 cm (65 inch) 4K Ultra HD XR Backlight Master Drive with Mini LED',
      'XR Processor with XR Clear Image, XR Contrast Booster 30',
      'Acoustic Multi-Audio+ with Beam Tweeters in the frame (70W Output)',
      'Google TV with Netflix Calibrated Mode & Prime Video Calibrated Mode',
      'Perfect for PS5: Auto HDR Tone Mapping & 4K 120Hz HDMI 2.1'
    ],
    specs: [
      {
        group: 'Display & Audio',
        items: [
          { label: 'Panel Type', value: 'QLED Mini LED with High Peak Luminance' },
          { label: 'Refresh Rate', value: '120 Hz Variable Refresh Rate (VRR)' },
          { label: 'Sound Output', value: '70 W 2.2.2 Channel Dolby Atmos' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-tv1',
        author: 'Rajeev Nair',
        rating: 5,
        date: '1 week ago',
        title: 'Phenomenal black levels with blinding highlights',
        comment: 'Watched Dune Part 2 in Dolby Vision—it feels better than IMAX. Sony free installation was scheduled next day.',
        verified: true,
        helpfulCount: 48
      }
    ],
    bankOffer: 'Flat ₹12,000 Off on HDFC & ICICI Credit Cards',
    emiStartsAt: 12100
  },
  {
    id: 'tv-lg-oledc4',
    name: 'LG 65" evo C4 4K Smart OLED TV (OLED65C4PSA)',
    brand: 'LG',
    category: 'TVs',
    tagline: 'Self-lit OLED pixels with alpha 9 AI Processor Gen7, 144Hz & Dolby Vision',
    price: 199990,
    originalPrice: 249990,
    discountPercent: 20,
    rating: 4.9,
    ratingCount: 5120,
    reviewsCount: 630,
    image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 10,
    isAssured: true,
    deliveryDays: 2,
    badge: 'Bestseller',
    highlights: [
      '164 cm (65 inch) 4K OLED evo with Brightness Booster',
      'alpha 9 AI Processor 4K Gen7 with AI Picture Pro & AI Sound Pro',
      'Infinite Contrast with Perfect True Black and 100% Color Fidelity',
      '0.1ms Response Time, 144Hz Refresh Rate, 4x HDMI 2.1 Ports',
      'webOS 24 with Re:New Program (5 years of OS upgrades)'
    ],
    specs: [
      {
        group: 'Picture & Gaming',
        items: [
          { label: 'Display Type', value: 'Self-Lit 4K OLED evo' },
          { label: 'Gaming Certifications', value: 'NVIDIA G-Sync, AMD FreeSync Premium, VRR, ALLM' },
          { label: 'Smart OS', value: 'LG webOS with Magic Remote' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-lg1',
        author: 'Tarun V.',
        rating: 5,
        date: '3 weeks ago',
        title: 'Best gaming and movie TV period',
        comment: 'Infinite contrast makes space scenes surreal. Gaming with PC at 144Hz is buttery smooth.',
        verified: true,
        helpfulCount: 39
      }
    ],
    bankOffer: 'Instant ₹10,000 Cashback on Bank Cards',
    emiStartsAt: 9680
  },
  {
    id: 'tv-samsung-qned90',
    name: 'Samsung 65" Neo QLED 4K Smart TV (QA65QN90D)',
    brand: 'Samsung',
    category: 'TVs',
    tagline: 'NQ4 AI Gen2 Processor with Quantum Matrix Mini LED Technology',
    price: 189990,
    originalPrice: 229990,
    discountPercent: 17,
    rating: 4.8,
    ratingCount: 3890,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 8,
    isAssured: true,
    deliveryDays: 2,
    highlights: [
      'NQ4 AI Gen2 Processor with 20 AI Neural Networks',
      'Anti-Glare Technology with Ultra Viewing Angle',
      'Dolby Atmos with OTS+ (Object Tracking Sound+)',
      'Samsung Knox Security and SolarCell Remote'
    ],
    specs: [
      {
        group: 'Tech Specs',
        items: [
          { label: 'Backlight', value: 'Quantum Mini LED' },
          { label: 'HDR', value: 'Neo Quantum HDR+' },
          { label: 'Gaming Hub', value: 'Xbox Cloud Gaming Built-In' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-sq1',
        author: 'Vivek B.',
        rating: 5,
        date: '2 weeks ago',
        title: 'Stunning in brightly lit living rooms',
        comment: 'The anti-glare coating and brightness are incredible. Zero reflections from sunlight.',
        verified: true,
        helpfulCount: 25
      }
    ],
    bankOffer: '₹8,000 Instant Discount with SBI Cards',
    emiStartsAt: 9190
  },

  // --- MONITORS ---
  {
    id: 'mon-dell-ultrasharp32',
    name: 'Dell UltraSharp 32" 4K QD-OLED Curved Monitor (U3224KB)',
    brand: 'Dell',
    category: 'Monitors',
    tagline: 'World’s first 6K monitor with IPS Black technology, built-in 4K webcam & Thunderbolt 4',
    price: 189999,
    originalPrice: 219999,
    discountPercent: 14,
    rating: 4.8,
    ratingCount: 1620,
    reviewsCount: 190,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 5,
    isAssured: true,
    deliveryDays: 2,
    highlights: [
      '80.01 cm (31.5 inch) 6K (6144 x 3456) IPS Black Display',
      'Built-in 4K Dual Gain HDR Webcam with Auto-Framing',
      'Thunderbolt 4 Hub with 140W Power Delivery to single cable laptop',
      '99% DCI-P3, 100% sRGB Factory Calibrated Delta E < 1.5'
    ],
    specs: [
      {
        group: 'Panel Details',
        items: [
          { label: 'Resolution', value: '6K 6144 x 3456 (223 PPI)' },
          { label: 'Contrast Ratio', value: '2000:1 (IPS Black)' },
          { label: 'Ports', value: 'Thunderbolt 4, HDMI 2.1, Mini DP 2.1, 10Gbps USB-C' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-dm1',
        author: 'Gaurav K.',
        rating: 5,
        date: '3 weeks ago',
        title: 'Retina-level clarity on Windows and Mac',
        comment: 'The text clarity is unbelievable. Single cable charges my MacBook at full speed while giving me 6K real estate.',
        verified: true,
        helpfulCount: 21
      }
    ],
    bankOffer: 'Flat ₹6,000 Off on Corporate Cards',
    emiStartsAt: 9200
  },
  {
    id: 'mon-samsung-odysseyg9',
    name: 'Samsung Odyssey OLED G9 49" Curved Dual QHD 240Hz (LS49CG954)',
    brand: 'Samsung',
    category: 'Monitors',
    tagline: '1800R curved 32:9 super ultrawide with 0.03ms response time and Neo Quantum AI',
    price: 139999,
    originalPrice: 169999,
    discountPercent: 18,
    rating: 4.9,
    ratingCount: 2890,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1547119957-637f8679db1e?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 7,
    isAssured: true,
    deliveryDays: 2,
    badge: 'Trending',
    highlights: [
      '124.46 cm (49 inch) Dual QHD (5120 x 1440) OLED Curved Screen',
      '240Hz Refresh Rate with blistering 0.03ms (GtG) Response Time',
      'DisplayHDR True Black 400 for infinite contrast',
      'CoreSync & Core Lighting+ ambient lighting system'
    ],
    specs: [
      {
        group: 'Display & Sync',
        items: [
          { label: 'Aspect Ratio', value: '32:9 Super Ultra-Wide (equivalent to two 27" 1440p displays)' },
          { label: 'Sync Technology', value: 'AMD FreeSync Premium Pro' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-og1',
        author: 'Sanjay Deshmukh',
        rating: 5,
        date: '1 month ago',
        title: 'Ultimate productivity and sim-racing immersion',
        comment: 'Playing Forza Horizon and Assetto Corsa on this is indescribable. Replaced two 27" screens on my desk.',
        verified: true,
        helpfulCount: 33
      }
    ],
    bankOffer: '₹7,500 Instant Discount with Bank Cards',
    emiStartsAt: 6780
  },

  // --- ACCESSORIES ---
  {
    id: 'acc-apple-pencilpro',
    name: 'Apple Pencil Pro (Magnetic Charging with Haptic Feedback & Barrel Roll)',
    brand: 'Apple',
    category: 'Accessories',
    tagline: 'Squeeze gesture, barrel roll gyro and find my support for iPad Pro & iPad Air',
    price: 11900,
    originalPrice: 12900,
    discountPercent: 8,
    rating: 4.9,
    ratingCount: 4620,
    reviewsCount: 540,
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 45,
    isAssured: true,
    deliveryDays: 1,
    badge: 'Bestseller',
    highlights: [
      'Squeeze gesture opens new tool palettes instantly',
      'Custom haptic engine provides subtle physical feedback',
      'Built-in gyroscope detects Barrel Roll to change brush orientation',
      'Apple Pencil hover lets you preview marks before you make them'
    ],
    specs: [
      {
        group: 'Compatibility',
        items: [
          { label: 'Supported Devices', value: 'iPad Pro 13-inch (M4), iPad Pro 11-inch (M4), iPad Air (M2)' },
          { label: 'Tracking', value: 'Find My tracking integration built-in' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-apc1',
        author: 'Ananya S.',
        rating: 5,
        date: '6 days ago',
        title: 'The barrel roll feature is game-changing for artists',
        comment: 'Calligraphy and digital painting in Procreate feel 100% natural. Haptic squeeze feedback is so satisfying.',
        verified: true,
        helpfulCount: 27
      }
    ],
    bankOffer: 'Flat ₹1,000 Off on HDFC Credit Cards',
    emiStartsAt: 580
  },
  {
    id: 'acc-samsung-45wcharger',
    name: 'Samsung 45W USB-C Super Fast Charging Adapter 2.0 (with 5A Cable)',
    brand: 'Samsung',
    category: 'Accessories',
    tagline: 'GaN Technology with Power Delivery 3.0 PPS for Galaxy S25 / S24 / Tablets',
    price: 2499,
    originalPrice: 3499,
    discountPercent: 29,
    rating: 4.7,
    ratingCount: 18400,
    reviewsCount: 2200,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=700&auto=format&fit=crop&q=80',
    inStock: true,
    stockCount: 80,
    isAssured: true,
    deliveryDays: 1,
    badge: 'Bestseller',
    highlights: [
      '45 Watt Super Fast Charging 2.0 Max Output',
      'USB-IF Certified Power Delivery 3.0 PPS protocol',
      'Includes heavy-duty 5A 1.8-meter braided Type-C to Type-C cable',
      'Compact GaN (Gallium Nitride) cool-temperature architecture'
    ],
    specs: [
      {
        group: 'Electrical',
        items: [
          { label: 'Input Voltage', value: '100-240 V AC' },
          { label: 'Output Voltage (PPS)', value: '3.3-20.0 V, up to 45W' },
          { label: 'Safety Protections', value: 'Over-current, Short-circuit, High-temperature protection' }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-sc1',
        author: 'Ramanathan C.',
        rating: 5,
        date: '1 week ago',
        title: 'Charges my S25 Ultra from 10% to 70% in 28 mins',
        comment: 'Authentic genuine Samsung charger with official warranty hologram. Stays cool even during 45W draw.',
        verified: true,
        helpfulCount: 34
      }
    ],
    bankOffer: 'Extra ₹200 off with MM SuperCoins',
    emiStartsAt: 120
  }
];

export const CATEGORIES_DATA: { name: string; icon: string; count: number; image: string }[] = [
  { name: 'Mobiles', icon: 'Smartphone', count: 4, image: '/src/assets/images/product_iphone_16_pro_1791200757127.jpg' },
  { name: 'Laptops', icon: 'Laptop', count: 4, image: '/src/assets/images/product_macbook_pro_m3_1791200781505.jpg' },
  { name: 'Tablets', icon: 'Tablet', count: 2, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&auto=format&fit=crop&q=80' },
  { name: 'Smartwatches', icon: 'Watch', count: 2, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&auto=format&fit=crop&q=80' },
  { name: 'Headphones', icon: 'Headphones', count: 2, image: '/src/assets/images/product_sony_wh1000xm5_1791200792703.jpg' },
  { name: 'TVs', icon: 'Tv', count: 3, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&auto=format&fit=crop&q=80' },
  { name: 'Monitors', icon: 'Monitor', count: 2, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&auto=format&fit=crop&q=80' },
  { name: 'Accessories', icon: 'Cable', count: 2, image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=300&auto=format&fit=crop&q=80' }
];

export const BRANDS_LIST = [
  'Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'HP', 'Dell', 'Lenovo', 'Sony', 'LG'
] as const;
