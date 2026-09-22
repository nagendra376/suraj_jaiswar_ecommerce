import mongoose from "mongoose";
import Redis from "ioredis";

const mongoURI =
  "mongodb://nagendraswsa_db_user:Monu123@ac-1yz7ubj-shard-00-00.nkrtc1r.mongodb.net:27017,ac-1yz7ubj-shard-00-01.nkrtc1r.mongodb.net:27017,ac-1yz7ubj-shard-00-02.nkrtc1r.mongodb.net:27017/Ecommerce_24?ssl=true&replicaSet=atlas-bx0uxm-shard-0&authSource=admin&retryWrites=true&w=majority";

const redisURI =
  "rediss://default:gQAAAAAABE6uAAIgcDI5MDUxN2RjYjFiOGI0MmUyYjY2OWFhYzQxYmI1MTkzOA@smooth-locust-282286.upstash.io:6379";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    photos: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    price: { type: Number, required: true },
    originalPrice: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    ratings: { type: Number, default: 0 },
    numOfReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

const CATEGORY_PRODUCTS = {
  processor: [
    {
      name: "AMD Ryzen 9 9950X3D AM5 Desktop Processor (5.7GHz, 16 Cores, 32 Threads)",
      price: 65999,
      originalPrice: 118000,
      stock: 12,
      description: "Flagship Zen 5 16-Core gaming and workstation processor with 3D V-Cache.",
      photos: [{ public_id: "demo_cpu_ryzen9", url: "/products/cpu_ryzen9.png" }],
    },
    {
      name: "AMD Ryzen 7 7700X3D Processor with Radeon Graphics AM5",
      price: 35794,
      originalPrice: 58000,
      stock: 14,
      description: "High-FPS gaming benchmark chip with 8 Cores, 16 Threads, AMD 3D V-Cache technology.",
      photos: [{ public_id: "demo_cpu_ryzen7", url: "/products/cpu_ryzen7.png" }],
    },
    {
      name: "Intel Core Ultra 9 285K Arrow Lake-S Desktop Processor (24 Cores, 5.7GHz)",
      price: 58499,
      originalPrice: 94000,
      stock: 8,
      description: "Next-gen Intel Arrow Lake-S desktop processor with dedicated NPU for AI.",
      photos: [{ public_id: "demo_cpu_intel245k", url: "/products/cpu_intel245k.png" }],
    },
    {
      name: "AMD Ryzen 7 9800X3D AM5 Gaming Processor (8 Cores, 16 Threads, 5.2GHz)",
      price: 46999,
      originalPrice: 78000,
      stock: 10,
      description: "Next-generation 2nd Gen 3D V-Cache gaming champion for socket AM5.",
      photos: [{ public_id: "demo_cpu_ryzen7", url: "/products/cpu_ryzen7.png" }],
    },
    {
      name: "Intel Core i7-14700K 20-Core (8P+12E) Desktop Processor LGA1700",
      price: 37999,
      originalPrice: 59000,
      stock: 15,
      description: "Raptor Lake Refresh powerhouse with up to 5.6 GHz turbo clock.",
      photos: [{ public_id: "demo_cpu_intel245k", url: "/products/cpu_intel245k.png" }],
    },
    {
      name: "AMD Ryzen 5 7600X 6-Core 12-Thread AM5 Gaming Processor",
      price: 19499,
      originalPrice: 32000,
      stock: 22,
      description: "Sweet-spot budget gaming CPU with PCIe 5.0 and DDR5 support.",
      photos: [{ public_id: "demo_cpu_ryzen7500x3d", url: "/products/cpu_ryzen7500x3d.png" }],
    },
    {
      name: "Intel Core i5-14600K 14-Core (6P+8E) Desktop Processor LGA1700",
      price: 28499,
      originalPrice: 42000,
      stock: 18,
      description: "Top-tier value gaming and streaming processor up to 5.3 GHz.",
      photos: [{ public_id: "demo_cpu_intel245k", url: "/products/cpu_intel245k.png" }],
    },
    {
      name: "AMD Ryzen 9 7900X 12-Core 24-Thread AM5 Processor",
      price: 36999,
      originalPrice: 56000,
      stock: 9,
      description: "High performance multi-threaded creator CPU with 5.6 GHz max boost.",
      photos: [{ public_id: "demo_cpu_ryzen9", url: "/products/cpu_ryzen9.png" }],
    },
    {
      name: "Intel Core i9-14900KS Special Edition 6.2GHz 24-Core Desktop CPU",
      price: 64999,
      originalPrice: 110000,
      stock: 6,
      description: "The world's fastest desktop processor running at record 6.2 GHz out of the box.",
      photos: [{ public_id: "demo_cpu_intel245k", url: "/products/cpu_intel245k.png" }],
    },
    {
      name: "AMD Ryzen 7 5700X3D AM4 8-Core 16-Thread Gaming Processor",
      price: 21999,
      originalPrice: 36000,
      stock: 25,
      description: "Ultimate drop-in gaming upgrade for existing AM4 platforms with 3D V-Cache.",
      photos: [{ public_id: "demo_cpu_ryzen5800x3d", url: "/products/cpu_ryzen5800x3d.png" }],
    },
  ],

  motherboard: [
    {
      name: "MSI MAG B850 Tomahawk WiFi AM5 ATX Motherboard (DDR5, PCIe 5.0)",
      price: 21499,
      originalPrice: 32000,
      stock: 14,
      description: "Heavy-plated gaming motherboard with robust VRM power phases and WiFi 7.",
      photos: [{ public_id: "demo_mobo_b850_force", url: "/products/mobo_b850_force.png" }],
    },
    {
      name: "ASUS ROG STRIX X870E-E GAMING WIFI AM5 ATX Motherboard",
      price: 49999,
      originalPrice: 75000,
      stock: 7,
      description: "Enthusiast-tier AM5 motherboard with PCIe 5.0, 5x M.2 slots, and Polymo lighting.",
      photos: [{ public_id: "demo_mobo_x870e", url: "/products/mobo_x870e.png" }],
    },
    {
      name: "GIGABYTE B850M FORCE WIFI AM5 M-ATX Motherboard DDR5",
      price: 15499,
      originalPrice: 24000,
      stock: 20,
      description: "Compact Micro-ATX board with premium thermal guard and fast DDR5 memory support.",
      photos: [{ public_id: "demo_mobo_b850m_c", url: "/products/mobo_b850m_c.png" }],
    },
    {
      name: "MSI B550M PRO-VDH WIFI AM4 Micro-ATX Motherboard",
      price: 8999,
      originalPrice: 14000,
      stock: 30,
      description: "Rock-solid AM4 motherboard with PCIe 4.0, dual M.2 with Shield Frozr.",
      photos: [{ public_id: "demo_mobo_msi_b550m", url: "/products/mobo_msi_b550m.png" }],
    },
    {
      name: "ASUS Prime B550M-K ARGB AM4 Micro-ATX Motherboard",
      price: 7499,
      originalPrice: 12500,
      stock: 25,
      description: "Dependable foundation for AMD Ryzen processors with comprehensive cooling controls.",
      photos: [{ public_id: "demo_mobo_b550m_k", url: "/products/mobo_b550m_k.png" }],
    },
    {
      name: "ASUS ROG MAXIMUS Z790 DARK HERO LGA1700 ATX Motherboard",
      price: 64999,
      originalPrice: 98000,
      stock: 5,
      description: "Flagship Intel Z790 board with 20+1 power stages, Thunderbolt 4, and WiFi 7.",
      photos: [{ public_id: "demo_mobo_x870e", url: "/products/mobo_x870e.png" }],
    },
    {
      name: "GIGABYTE Z790 AORUS ELITE AX DDR5 Motherboard LGA1700",
      price: 24999,
      originalPrice: 38000,
      stock: 12,
      description: "High performance Intel DDR5 motherboard with twin 16+1+2 phase VRM.",
      photos: [{ public_id: "demo_mobo_b850_force", url: "/products/mobo_b850_force.png" }],
    },
    {
      name: "MSI PRO Z790-A MAX WIFI Motherboard (Intel LGA1700)",
      price: 23499,
      originalPrice: 35000,
      stock: 16,
      description: "Business and productivity powerhouse with Lightning Gen 5 PCIe and Extended Heatsink.",
      photos: [{ public_id: "demo_mobo_b850_force", url: "/products/mobo_b850_force.png" }],
    },
    {
      name: "ASRock B650M PG Riptide WiFi AM5 Micro ATX Motherboard",
      price: 14299,
      originalPrice: 22000,
      stock: 18,
      description: "Feature-rich AM5 micro-ATX board with Blazing M.2 PCIe 5.0 and Dr.MOS power design.",
      photos: [{ public_id: "demo_mobo_b850m_c", url: "/products/mobo_b850m_c.png" }],
    },
    {
      name: "ASUS TUF Gaming B760-PLUS WIFI D4 Motherboard LGA1700",
      price: 17899,
      originalPrice: 28000,
      stock: 14,
      description: "Military-grade durability board with enhanced power solution and Aura Sync RGB.",
      photos: [{ public_id: "demo_mobo_b850_force", url: "/products/mobo_b850_force.png" }],
    },
  ],

  ram: [
    {
      name: "Kingston FURY Beast 32GB (16GBx2) DDR5 6000MHz RGB CL36 Desktop Memory",
      price: 9999,
      originalPrice: 16500,
      stock: 35,
      description: "Overclock with style: aggressive heat spreader design and smooth RGB lighting effects.",
      photos: [{ public_id: "bundle_1", url: "/products/bundle_1.png" }],
    },
    {
      name: "G.Skill Ripjaws S5 32GB (16GBx2) DDR5 6000MHz CL30 Low-Profile Memory",
      price: 10499,
      originalPrice: 17500,
      stock: 28,
      description: "Ultra-low latency CL30 performance memory kit with minimal height clearance.",
      photos: [{ public_id: "bundle_2", url: "/products/bundle_2.png" }],
    },
    {
      name: "Crucial Pro 32GB (16GBx2) DDR5 5600MHz CL46 Desktop Memory Kit",
      price: 8499,
      originalPrice: 14000,
      stock: 40,
      description: "Plug-and-play pro-grade memory optimized for next-gen multi-core CPUs.",
      photos: [{ public_id: "bundle_3", url: "/products/bundle_3.png" }],
    },
    {
      name: "Corsair Dominator Platinum RGB 32GB (16GBx2) DDR5 6200MHz White",
      price: 16499,
      originalPrice: 26000,
      stock: 15,
      description: "Iconic forged aluminum construction with patented DHX cooling and CAPELLIX LEDs.",
      photos: [{ public_id: "bundle_4", url: "/products/bundle_4.png" }],
    },
    {
      name: "TeamGroup T-Force Delta RGB DDR5 32GB (2x16GB) 6000MHz Black",
      price: 9799,
      originalPrice: 16000,
      stock: 30,
      description: "120-degree ultra-wide angle lighting with smart RGB IC controllers and on-die ECC.",
      photos: [{ public_id: "bundle_1", url: "/products/bundle_1.png" }],
    },
    {
      name: "G.Skill Trident Z5 Neo RGB 32GB (2x16GB) DDR5 6000MHz AMD EXPO",
      price: 11899,
      originalPrice: 19000,
      stock: 22,
      description: "Tailored specifically for AMD AM5 processors with one-click EXPO overclock profiles.",
      photos: [{ public_id: "bundle_2", url: "/products/bundle_2.png" }],
    },
    {
      name: "Corsair Vengeance RGB 64GB (2x32GB) DDR5 6000MHz CL30 Memory Kit",
      price: 21999,
      originalPrice: 34000,
      stock: 12,
      description: "Massive 64GB capacity kit engineered for high-resolution video creators and sim racers.",
      photos: [{ public_id: "bundle_3", url: "/products/bundle_3.png" }],
    },
    {
      name: "ADATA XPG Lancer Blade RGB 32GB (2x16GB) DDR5 6000MHz White",
      price: 9299,
      originalPrice: 15000,
      stock: 25,
      description: "Compact low-profile heatsink design finished in clean arctic white with vibrant RGB.",
      photos: [{ public_id: "bundle_4", url: "/products/bundle_4.png" }],
    },
    {
      name: "Kingston FURY Renegade 32GB (2x16GB) DDR5 6400MHz Silver",
      price: 12499,
      originalPrice: 20000,
      stock: 18,
      description: "Extreme speed DDR5 gaming memory pushing boundaries up to 6400 MT/s.",
      photos: [{ public_id: "bundle_1", url: "/products/bundle_1.png" }],
    },
    {
      name: "Patriot Viper Venom 32GB (2x16GB) DDR5 6000MHz CL36 Gaming RAM",
      price: 8999,
      originalPrice: 14500,
      stock: 24,
      description: "Precision engineered aluminum shield offering supreme heat dissipation.",
      photos: [{ public_id: "bundle_2", url: "/products/bundle_2.png" }],
    },
  ],

  "graphics-card": [
    {
      name: "ASUS Dual GeForce RTX 4060 OC Edition 8GB GDDR6 Graphics Card",
      price: 28999,
      originalPrice: 42000,
      stock: 16,
      description: "Compact 2-slot design with Axial-tech fans for high-refresh 1080p gaming with DLSS 3.",
      photos: [{ public_id: "bundle_1", url: "/products/bundle_1.png" }],
    },
    {
      name: "Sapphire Pulse AMD Radeon RX 7600 Gaming 8GB GDDR6 Graphics Card",
      price: 24499,
      originalPrice: 36000,
      stock: 19,
      description: "AMD RDNA 3 architecture card engineered for smooth 1080p ultra settings gaming.",
      photos: [{ public_id: "bundle_2", url: "/products/bundle_2.png" }],
    },
    {
      name: "MSI GeForce RTX 4070 Ti SUPER 16G VENTUS 3X OC Graphics Card",
      price: 79999,
      originalPrice: 125000,
      stock: 8,
      description: "Massive 16GB VRAM card featuring triple TORX Fan 4.0 cooling and metal backplate.",
      photos: [{ public_id: "bundle_3", url: "/products/bundle_3.png" }],
    },
    {
      name: "GIGABYTE GeForce RTX 4080 SUPER Gaming OC 16GB Graphics Card",
      price: 104999,
      originalPrice: 160000,
      stock: 6,
      description: "Enthusiast 4K gaming GPU with WINDFORCE cooling system and RGB Halo rings.",
      photos: [{ public_id: "bundle_4", url: "/products/bundle_4.png" }],
    },
    {
      name: "PowerColor Hellhound AMD Radeon RX 7800 XT 16GB GDDR6",
      price: 51999,
      originalPrice: 82000,
      stock: 11,
      description: "1440p gaming powerhouse equipped with metallic backplate and dual BIOS mode.",
      photos: [{ public_id: "bundle_1", url: "/products/bundle_1.png" }],
    },
    {
      name: "ZOTAC Gaming GeForce RTX 4070 Twin Edge OC 12GB GDDR6X",
      price: 53999,
      originalPrice: 79000,
      stock: 14,
      description: "Compact dual-fan form factor with IceStorm 2.0 advanced cooling and Spectra RGB.",
      photos: [{ public_id: "bundle_2", url: "/products/bundle_2.png" }],
    },
    {
      name: "INNO3D GeForce RTX 4060 Ti Twin X2 8GB GDDR6 Graphics Card",
      price: 36999,
      originalPrice: 52000,
      stock: 15,
      description: "Ultra-efficient Ada Lovelace architecture GPU delivering high-FPS gaming with ray tracing.",
      photos: [{ public_id: "bundle_3", url: "/products/bundle_3.png" }],
    },
    {
      name: "Sapphire NITRO+ AMD Radeon RX 7900 XTX 24GB Vapor-X",
      price: 99999,
      originalPrice: 155000,
      stock: 5,
      description: "AMD flagship GPU with composite heatpipes, die-cast aluminum frame, and ARGB light strip.",
      photos: [{ public_id: "bundle_4", url: "/products/bundle_4.png" }],
    },
    {
      name: "ASUS TUF Gaming GeForce RTX 4070 Ti SUPER 16GB GDDR6X",
      price: 84999,
      originalPrice: 130000,
      stock: 9,
      description: "Military-spec capacitors and vented exoskeleton design for extreme reliability.",
      photos: [{ public_id: "bundle_1", url: "/products/bundle_1.png" }],
    },
    {
      name: "GIGABYTE GeForce RTX 4090 Gaming OC 24GB GDDR6X",
      price: 189999,
      originalPrice: 265000,
      stock: 4,
      description: "The ultimate desktop GPU on Earth for 8K gaming, 3D rendering, and LLM training.",
      photos: [{ public_id: "bundle_2", url: "/products/bundle_2.png" }],
    },
  ],

  ssd: [
    {
      name: "Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 Internal Gaming SSD",
      price: 17499,
      originalPrice: 28000,
      stock: 25,
      description: "Blistering read/write speeds up to 7450/6900 MB/s with Nickel coating thermal guard.",
      photos: [{ public_id: "bundle_3", url: "/products/bundle_3.png" }],
    },
    {
      name: "Crucial P3 Plus 1TB PCIe Gen4 3D NAND NVMe M.2 SSD",
      price: 5699,
      originalPrice: 9500,
      stock: 45,
      description: "Gen4 speeds up to 5000 MB/s, backwards compatible with Gen3 systems.",
      photos: [{ public_id: "bundle_4", url: "/products/bundle_4.png" }],
    },
    {
      name: "WD Black SN850X 2TB NVMe M.2 Gaming SSD with Heatsink",
      price: 16999,
      originalPrice: 26000,
      stock: 20,
      description: "Top-tier gaming drive with Game Mode 2.0 and speeds up to 7300 MB/s.",
      photos: [{ public_id: "bundle_1", url: "/products/bundle_1.png" }],
    },
    {
      name: "Kingston KC3000 1TB PCIe 4.0 NVMe M.2 Solid State Drive",
      price: 8499,
      originalPrice: 13500,
      stock: 30,
      description: "Graphene aluminum heat spreader with Phison E18 controller for heavy workloads.",
      photos: [{ public_id: "bundle_2", url: "/products/bundle_2.png" }],
    },
    {
      name: "Crucial T500 2TB Gen4 NVMe M.2 SSD with Integrated Heatsink",
      price: 15999,
      originalPrice: 24500,
      stock: 18,
      description: "Engineered with Micron 232-layer TLC NAND reaching up to 7400 MB/s.",
      photos: [{ public_id: "bundle_3", url: "/products/bundle_3.png" }],
    },
    {
      name: "ADATA XPG GAMMIX S70 Blade 1TB M.2 NVMe Gen4 SSD",
      price: 6799,
      originalPrice: 11000,
      stock: 28,
      description: "PS5 compatible low-profile heatsink with speeds up to 7400 MB/s.",
      photos: [{ public_id: "bundle_4", url: "/products/bundle_4.png" }],
    },
    {
      name: "Seagate FireCuda 530 2TB PCIe Gen4 M.2 SSD with Heatsink",
      price: 18499,
      originalPrice: 29000,
      stock: 12,
      description: "Exceptional endurance rating with 2550 TBW and EKWB custom heatsink.",
      photos: [{ public_id: "bundle_1", url: "/products/bundle_1.png" }],
    },
    {
      name: "TeamGroup MP44 2TB PCIe 4.0 NVMe M.2 SSD",
      price: 12999,
      originalPrice: 19500,
      stock: 22,
      description: "Patented ultra-thin graphene label delivering ultra-cool 7400 MB/s transfer speeds.",
      photos: [{ public_id: "bundle_2", url: "/products/bundle_2.png" }],
    },
    {
      name: "Corsair MP600 PRO LPX 1TB PCIe Gen4 x4 NVMe M.2 SSD",
      price: 8999,
      originalPrice: 14000,
      stock: 26,
      description: "Optimized for Sony PlayStation 5 and high-end gaming PC builds.",
      photos: [{ public_id: "bundle_3", url: "/products/bundle_3.png" }],
    },
    {
      name: "WD Blue SN580 1TB PCIe Gen4 x4 NVMe M.2 Internal SSD",
      price: 5499,
      originalPrice: 8800,
      stock: 40,
      description: "nCache 4.0 technology providing responsive bursts for content creators and everyday computing.",
      photos: [{ public_id: "bundle_4", url: "/products/bundle_4.png" }],
    },
  ],

  storage: [
    {
      name: "Seagate BarraCuda 2TB 7200 RPM 3.5\" Internal Hard Drive",
      price: 4999,
      originalPrice: 7500,
      stock: 35,
      description: "Cost-effective 3.5-inch desktop storage with 256MB cache for family photos and media.",
      photos: [{ public_id: "bundle_1", url: "/products/bundle_1.png" }],
    },
    {
      name: "WD Blue 4TB 5400 RPM 3.5\" Desktop Internal Hard Drive",
      price: 7999,
      originalPrice: 12000,
      stock: 25,
      description: "Tested for everyday PC storage with NoTouch ramp load technology.",
      photos: [{ public_id: "bundle_2", url: "/products/bundle_2.png" }],
    },
    {
      name: "Toshiba P300 2TB 7200 RPM Performance Desktop HDD",
      price: 4799,
      originalPrice: 7200,
      stock: 28,
      description: "Dual-stage actuator design for high precision tracking and reading.",
      photos: [{ public_id: "bundle_3", url: "/products/bundle_3.png" }],
    },
    {
      name: "Seagate IronWolf 4TB NAS Internal Hard Drive 5400 RPM",
      price: 9499,
      originalPrice: 14500,
      stock: 18,
      description: "AgileArray firmware with rotational vibration sensors for 24x7 multi-bay NAS.",
      photos: [{ public_id: "bundle_4", url: "/products/bundle_4.png" }],
    },
    {
      name: "WD Red Plus 6TB NAS Internal Hard Drive 5400 RPM",
      price: 13999,
      originalPrice: 21000,
      stock: 12,
      description: "Built and tested for up to 8-bay RAID systems with CMR technology.",
      photos: [{ public_id: "bundle_1", url: "/products/bundle_1.png" }],
    },
    {
      name: "WD Black 2TB Performance Desktop Hard Drive 7200 RPM",
      price: 7499,
      originalPrice: 11000,
      stock: 20,
      description: "Dual-core processor architecture delivering maximum read/write performance.",
      photos: [{ public_id: "bundle_2", url: "/products/bundle_2.png" }],
    },
    {
      name: "Seagate Expansion 2TB Portable External Hard Drive USB 3.0",
      price: 5499,
      originalPrice: 8500,
      stock: 45,
      description: "Sleek pocket-sized plug-and-play backup solution with Rescue Data Recovery services.",
      photos: [{ public_id: "bundle_3", url: "/products/bundle_3.png" }],
    },
    {
      name: "WD My Passport 4TB Portable External Hard Drive with Password",
      price: 9999,
      originalPrice: 15500,
      stock: 30,
      description: "Hardware encryption with password protection and auto-backup software.",
      photos: [{ public_id: "bundle_4", url: "/products/bundle_4.png" }],
    },
    {
      name: "SanDisk Extreme Portable SSD 1TB USB 3.2 Gen 2 (1050MB/s)",
      price: 8999,
      originalPrice: 14500,
      stock: 25,
      description: "Rugged IP55 water and dust resistant NVMe portable SSD with 2-meter drop protection.",
      photos: [{ public_id: "bundle_1", url: "/products/bundle_1.png" }],
    },
    {
      name: "Crucial X9 Pro 2TB Portable SSD USB 3.2 (1050MB/s)",
      price: 14499,
      originalPrice: 22000,
      stock: 15,
      description: "Ultra-compact anodized aluminum drive engineered for on-the-go photography workflows.",
      photos: [{ public_id: "bundle_2", url: "/products/bundle_2.png" }],
    },
  ],

  cooler: [
    {
      name: "NZXT Kraken 360 RGB 360mm All-In-One Liquid CPU Cooler",
      price: 18999,
      originalPrice: 28000,
      stock: 15,
      description: "Customizable 1.54\" LCD display showing real-time system temps with F120 RGB Core fans.",
      photos: [{ public_id: "bundle_3", url: "/products/bundle_3.png" }],
    },
    {
      name: "DeepCool AK620 High-Performance Dual-Tower CPU Air Cooler",
      price: 5499,
      originalPrice: 8500,
      stock: 35,
      description: "Dual tower layout with 6 copper heat pipes capable of cooling up to 260W TDP.",
      photos: [{ public_id: "bundle_4", url: "/products/bundle_4.png" }],
    },
    {
      name: "Corsair iCUE LINK H150i RGB 360mm Liquid CPU Cooler",
      price: 21999,
      originalPrice: 32000,
      stock: 10,
      description: "Revolutionary single-cable ecosystem with QX120 RGB magnetic fans.",
      photos: [{ public_id: "bundle_1", url: "/products/bundle_1.png" }],
    },
    {
      name: "Cooler Master MasterLiquid 360L Core ARGB Liquid Cooler",
      price: 6999,
      originalPrice: 11500,
      stock: 28,
      description: "Refined Gen S Dual Chamber pump with upgraded surface area on radiator fins.",
      photos: [{ public_id: "bundle_2", url: "/products/bundle_2.png" }],
    },
    {
      name: "Arctic Liquid Freezer III 360 A-RGB Multi-Compatible AIO",
      price: 11499,
      originalPrice: 17500,
      stock: 20,
      description: "Award-winning thick 38mm radiator with integrated VRM cooling fan.",
      photos: [{ public_id: "bundle_3", url: "/products/bundle_3.png" }],
    },
    {
      name: "Thermalright Peerless Assassin 120 SE Dual Tower Air Cooler",
      price: 3999,
      originalPrice: 6500,
      stock: 45,
      description: "The price-to-performance benchmark dual-tower cooler with AGHP heatpipes.",
      photos: [{ public_id: "bundle_4", url: "/products/bundle_4.png" }],
    },
    {
      name: "DeepCool LS720 SE 360mm Liquid Cooler with Infinity Mirror",
      price: 8499,
      originalPrice: 13500,
      stock: 22,
      description: "Narrow-frame aluminum radiator with 4th Gen high performance water pump.",
      photos: [{ public_id: "bundle_1", url: "/products/bundle_1.png" }],
    },
    {
      name: "Lian Li Galahad II Trinity SL-INF 360 Liquid Cooler Black",
      price: 17499,
      originalPrice: 26000,
      stock: 14,
      description: "Stunning infinity mirror pump cap with pre-installed UNI FAN SL-INFINITY fans.",
      photos: [{ public_id: "bundle_2", url: "/products/bundle_2.png" }],
    },
    {
      name: "Noctua NH-D15 chromax.black Dual-Tower Premium CPU Cooler",
      price: 10999,
      originalPrice: 16500,
      stock: 18,
      description: "All-black stealth edition of the world's most acclaimed silent flagship air cooler.",
      photos: [{ public_id: "bundle_3", url: "/products/bundle_3.png" }],
    },
    {
      name: "be quiet! Dark Rock Pro 5 High-End Silent CPU Air Cooler",
      price: 8999,
      originalPrice: 14000,
      stock: 16,
      description: "Whisper-quiet Silent Wings PWM fans delivering elite 270W TDP cooling capacity.",
      photos: [{ public_id: "bundle_4", url: "/products/bundle_4.png" }],
    },
  ],

  "power-supply": [
    {
      name: "Corsair RM850e 850W ATX 3.0 80 Plus Gold Fully Modular PSU",
      price: 10499,
      originalPrice: 16000,
      stock: 25,
      description: "Native PCIe 5.0 12VHPWR cable support with 105°C-rated capacitors and Zero RPM fan mode.",
      photos: [{ public_id: "bundle_1", url: "/products/bundle_1.png" }],
    },
    {
      name: "MSI MAG A750GL PCIE5 750W 80 Plus Gold Modular Power Supply",
      price: 7999,
      originalPrice: 12500,
      stock: 30,
      description: "Dual-color 16-pin connector ensures complete insertion safety for RTX 40 series GPUs.",
      photos: [{ public_id: "bundle_2", url: "/products/bundle_2.png" }],
    },
    {
      name: "DeepCool PM750D 750W 80 Plus Gold Non-Modular Power Supply",
      price: 5999,
      originalPrice: 9500,
      stock: 35,
      description: "Solid LLC resonant half-bridge topology with DC-to-DC conversion.",
      photos: [{ public_id: "bundle_3", url: "/products/bundle_3.png" }],
    },
    {
      name: "Cooler Master MWE 650 Bronze V2 230V 650W 80 Plus Bronze",
      price: 4899,
      originalPrice: 7500,
      stock: 45,
      description: "Quiet 120mm HDB fan with flat black cables for neat cable management.",
      photos: [{ public_id: "bundle_4", url: "/products/bundle_4.png" }],
    },
    {
      name: "Corsair RM1000x 1000W 80 Plus Gold Fully Modular ATX PSU",
      price: 15999,
      originalPrice: 24000,
      stock: 15,
      description: "100% Japanese 105°C capacitors with magnetic levitation fan for ultra-quiet operation.",
      photos: [{ public_id: "bundle_1", url: "/products/bundle_1.png" }],
    },
    {
      name: "ASUS TUF Gaming 750W 80 Plus Gold Fully Modular PSU",
      price: 8999,
      originalPrice: 14000,
      stock: 22,
      description: "Protective PCB conformal coating defends against moisture, dust, and debris.",
      photos: [{ public_id: "bundle_2", url: "/products/bundle_2.png" }],
    },
    {
      name: "Seasonic FOCUS GX-850 850W 80 Plus Gold Modular PSU",
      price: 12499,
      originalPrice: 19000,
      stock: 16,
      description: "Industry-gold standard 10-year warranty with tight voltage regulation under ±3%.",
      photos: [{ public_id: "bundle_3", url: "/products/bundle_3.png" }],
    },
    {
      name: "Antec NeoECO Gold Modular 850W 80 Plus Gold Power Supply",
      price: 8499,
      originalPrice: 13500,
      stock: 20,
      description: "Full-bridge LLC design with 100% Japanese capacitors and CircuitShield protections.",
      photos: [{ public_id: "bundle_4", url: "/products/bundle_4.png" }],
    },
    {
      name: "GIGABYTE GP-UD850GM 850W 80 Plus Gold Modular Power Supply",
      price: 7799,
      originalPrice: 12000,
      stock: 24,
      description: "Ultra Durable construction with enlarged heatsink and 120mm hydraulic bearing fan.",
      photos: [{ public_id: "bundle_1", url: "/products/bundle_1.png" }],
    },
    {
      name: "be quiet! Pure Power 12 M 850W ATX 3.0 80 Plus Gold Modular",
      price: 11999,
      originalPrice: 18000,
      stock: 14,
      description: "Dual 12V rails with ATX 3.0 compliance and silence-optimized 120mm be quiet! fan.",
      photos: [{ public_id: "bundle_2", url: "/products/bundle_2.png" }],
    },
  ],

  cabinet: [
    {
      name: "Lian Li O11 Dynamic EVO Mid-Tower Dual-Chamber Gaming Case",
      price: 14499,
      originalPrice: 22000,
      stock: 18,
      description: "Iconic modular dual-chamber chassis with reversible layout and multi-directional bracket.",
      photos: [{ public_id: "bundle_3", url: "/products/bundle_3.png" }],
    },
    {
      name: "NZXT H9 Flow Dual-Chamber ATX Mid-Tower Airflow PC Case Black",
      price: 15999,
      originalPrice: 24000,
      stock: 12,
      description: "Seamless tempered glass front and side panels with perforated top panel for airflow.",
      photos: [{ public_id: "bundle_4", url: "/products/bundle_4.png" }],
    },
    {
      name: "Corsair 4000D Airflow Tempered Glass Mid-Tower ATX Case",
      price: 6799,
      originalPrice: 10500,
      stock: 35,
      description: "High-airflow steel front panel with RapidRoute cable management channels.",
      photos: [{ public_id: "bundle_1", url: "/products/bundle_1.png" }],
    },
    {
      name: "Montech KING 95 PRO Curved Glass Mid-Tower Case with ARGB",
      price: 12999,
      originalPrice: 19000,
      stock: 16,
      description: "Curved panoramic glass view with 6 pre-installed ARGB PWM fans and dual front panel.",
      photos: [{ public_id: "bundle_2", url: "/products/bundle_2.png" }],
    },
    {
      name: "Ant Esports 511MT Mid-Tower Mesh Gaming Cabinet with 4 ARGB",
      price: 4299,
      originalPrice: 6800,
      stock: 50,
      description: "Aggressive diamond mesh front panel with 4 pre-installed 120mm auto-RGB fans.",
      photos: [{ public_id: "bundle_3", url: "/products/bundle_3.png" }],
    },
    {
      name: "DeepCool CH560 DIGITAL Mid-Tower Case with Status Display",
      price: 7699,
      originalPrice: 12000,
      stock: 22,
      description: "Dual-status digital display screen monitors CPU and GPU temperatures in real-time.",
      photos: [{ public_id: "bundle_4", url: "/products/bundle_4.png" }],
    },
    {
      name: "Fractal Design North Charcoal Black Mesh ATX Mid Tower Case",
      price: 14999,
      originalPrice: 23000,
      stock: 10,
      description: "Natural real walnut front slats with brass finish accents and open mesh side panel.",
      photos: [{ public_id: "bundle_1", url: "/products/bundle_1.png" }],
    },
    {
      name: "Cooler Master MasterBox TD500 Mesh V2 ARGB Case White",
      price: 7999,
      originalPrice: 12500,
      stock: 20,
      description: "Fine mesh geometric front panel with 3D crystalline tempered glass side panel.",
      photos: [{ public_id: "bundle_2", url: "/products/bundle_2.png" }],
    },
    {
      name: "ASUS TUF Gaming GT502 Dual Chamber Mid-Tower Chassis",
      price: 13499,
      originalPrice: 21000,
      stock: 14,
      description: "Independent cooling zones with woven fabric handles certified to hold up to 30kg.",
      photos: [{ public_id: "bundle_3", url: "/products/bundle_3.png" }],
    },
    {
      name: "HYTE Y60 Modern Aesthetic Panoramic Glass Mid-Tower Case",
      price: 18999,
      originalPrice: 28000,
      stock: 8,
      description: "3-piece panoramic tempered glass design with included PCIE 4.0 riser cable for GPU.",
      photos: [{ public_id: "bundle_4", url: "/products/bundle_4.png" }],
    },
  ],

  monitor: [
    {
      name: "LG UltraGear 27GR75Q-B 27\" QHD 165Hz IPS Gaming Monitor",
      price: 21999,
      originalPrice: 34000,
      stock: 18,
      description: "1ms GtG IPS panel with 99% sRGB color gamut, HDR10, AMD FreeSync Premium & G-SYNC.",
      photos: [{ public_id: "monitor_alienware", url: "/products/monitor_alienware.png" }],
    },
    {
      name: "Samsung Odyssey G5 27\" QHD 144Hz 1000R Curved Gaming Monitor",
      price: 18999,
      originalPrice: 29000,
      stock: 22,
      description: "Optimum 1000R curvature matching human field of view with HDR10 support.",
      photos: [{ public_id: "monitor_alienware", url: "/products/monitor_alienware.png" }],
    },
    {
      name: "Acer Nitro VG270U 27\" WQHD 170Hz IPS Gaming Display",
      price: 16499,
      originalPrice: 25000,
      stock: 25,
      description: "ZeroFrame design IPS display with 0.5ms response time and dual integrated speakers.",
      photos: [{ public_id: "monitor_alienware", url: "/products/monitor_alienware.png" }],
    },
    {
      name: "ASUS TUF Gaming VG27AQ 27\" WQHD 165Hz HDR G-SYNC IPS Monitor",
      price: 23999,
      originalPrice: 36000,
      stock: 15,
      description: "ELMB SYNC technology enables motion blur reduction alongside adaptive sync simultaneously.",
      photos: [{ public_id: "monitor_alienware", url: "/products/monitor_alienware.png" }],
    },
    {
      name: "Dell Alienware AW2724HF 27\" FHD 360Hz Fast IPS Gaming Monitor",
      price: 36999,
      originalPrice: 55000,
      stock: 10,
      description: "Esports tournament-ready 360Hz refresh rate with 0.5ms GtG and 99% sRGB coverage.",
      photos: [{ public_id: "monitor_alienware", url: "/products/monitor_alienware.png" }],
    },
    {
      name: "BenQ MOBIUZ EX2710Q 27\" QHD 165Hz IPS Gaming Monitor with treVolo",
      price: 26999,
      originalPrice: 41000,
      stock: 12,
      description: "HDRi intelligence with built-in 2.1 channel treVolo sound system with 5W subwoofer.",
      photos: [{ public_id: "monitor_alienware", url: "/products/monitor_alienware.png" }],
    },
    {
      name: "MSI G274QPF-QD 27\" Quantum Dot IPS 170Hz WQHD Monitor",
      price: 24499,
      originalPrice: 38000,
      stock: 16,
      description: "Quantum Dot color technology with Rapid IPS panel and USB Type-C 65W PD.",
      photos: [{ public_id: "monitor_alienware", url: "/products/monitor_alienware.png" }],
    },
    {
      name: "Gigabyte M27Q 27\" QHD 170Hz SS IPS KVM Gaming Monitor",
      price: 22499,
      originalPrice: 35000,
      stock: 20,
      description: "Built-in KVM switch allows controlling multiple PCs using one mouse, keyboard, and monitor.",
      photos: [{ public_id: "monitor_alienware", url: "/products/monitor_alienware.png" }],
    },
    {
      name: "ViewSonic Omni VX2728 27\" FHD 180Hz Fast IPS Gaming Monitor",
      price: 13999,
      originalPrice: 21500,
      stock: 30,
      description: "180Hz refresh rate with AMD FreeSync Premium for buttery smooth esports gameplay.",
      photos: [{ public_id: "monitor_alienware", url: "/products/monitor_alienware.png" }],
    },
    {
      name: "Samsung Odyssey OLED G8 34\" Curved WQHD 175Hz 0.03ms Monitor",
      price: 79999,
      originalPrice: 125000,
      stock: 5,
      description: "Quantum Dot OLED panel with Neo Quantum Processor and Smart TV streaming hub.",
      photos: [{ public_id: "monitor_alienware", url: "/products/monitor_alienware.png" }],
    },
  ],
};

async function seed() {
  console.log("Connecting to MongoDB Atlas (Ecommerce_24)...");
  await mongoose.connect(mongoURI, { dbName: "Ecommerce_24" });
  console.log("Connected to MongoDB!");

  for (const [category, items] of Object.entries(CATEGORY_PRODUCTS)) {
    const existing = await Product.find({ category });
    const existingNames = new Set(existing.map((e) => e.name));
    console.log(`Category "${category}" currently has ${existing.length} products.`);

    const toInsert = items.filter((item) => !existingNames.has(item.name));
    if (toInsert.length > 0) {
      console.log(`Inserting ${toInsert.length} new products for "${category}"...`);
      const docs = toInsert.map((item) => ({
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice || Math.round(item.price * 1.5),
        stock: item.stock || 20,
        category: category,
        description: item.description,
        photos: item.photos,
        ratings: Math.floor(Math.random() * 2) + 4,
        numOfReviews: Math.floor(Math.random() * 25) + 5,
      }));
      await Product.insertMany(docs);
    }

    const finalCount = await Product.countDocuments({ category });
    console.log(`Category "${category}" now has ${finalCount} products total.`);
  }

  // Clear Upstash Redis Cache
  console.log("Connecting to Upstash Redis to invalidate all product caches...");
  const redis = new Redis(redisURI);
  const keys = await redis.keys("*");
  console.log("Found Redis keys to clear:", keys);
  if (keys.length > 0) {
    await redis.del(keys);
    console.log("Successfully cleared all Redis cache keys!");
  }
  await redis.quit();

  console.log("Seeding complete! All 10 categories have 10+ products in MongoDB Atlas!");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
