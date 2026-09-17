import mongoose from "mongoose";
import { config } from "dotenv";
import { Product } from "../models/product.js";
import { Redis } from "ioredis";

config({ path: "./.env" });

const demoProducts = [
  // 1. FEATURED HIGHLIGHTS (Bundles + Monitor)
  {
    name: "SSD + RAM COMBO DEALS 4 (G.Skill Flare X5 16GB (16GBX1) DDR5 6000MHz + Crucial P3 Plus 1TB PCIe M.2 NVMe SSD)",
    price: 47999,
    originalPrice: 145000,
    stock: 10,
    category: "featured",
    description: "Ultimate high-performance gaming combo featuring G.Skill Flare X5 16GB DDR5 6000MHz and ultra-fast Crucial P3 Plus 1TB Gen4 NVMe SSD. Ready for AM5 and Intel 14th/15th gen builds.",
    photos: [
      {
        public_id: "demo_bundle_4",
        url: "/products/bundle_4.png",
      },
    ],
  },
  {
    name: "SSD + RAM COMBO DEALS 3 (TeamGroup T-Create Classic DDR5 32GB (16GBx2) + Crucial P3 Plus 2TB PCIe M.2 NVMe SSD)",
    price: 65499,
    originalPrice: 325000,
    stock: 8,
    category: "featured",
    description: "Creator and enthusiast performance kit with 32GB dual-channel DDR5 low-latency memory paired with 2TB Crucial P3 Plus high-capacity Gen4 NVMe storage.",
    photos: [
      {
        public_id: "demo_bundle_3",
        url: "/products/bundle_3.png",
      },
    ],
  },
  {
    name: "SSD + RAM COMBO DEALS 2 (Samsung 990 PRO 1TB M.2 NVMe Gen4 + Corsair Vengeance RGB DDR5 32GB (16GBx2) 6000MHz)",
    price: 72999,
    originalPrice: 225000,
    stock: 12,
    category: "featured",
    description: "Flagship gaming powerhouse bundle featuring top-tier Samsung 990 PRO with 7450MB/s read speeds and stunning Corsair Vengeance RGB DDR5 32GB 6000MHz CL30.",
    photos: [
      {
        public_id: "demo_bundle_2",
        url: "/products/bundle_2.png",
      },
    ],
  },
  {
    name: "SSD + RAM COMBO DEALS 1 (Samsung 990 PRO 1TB M.2 NVMe Gen4 + Corsair Vengeance 16GB DDR5 5200MHz)",
    price: 48999,
    originalPrice: 156000,
    stock: 15,
    category: "featured",
    description: "Supercharged speed upgrade bundle: blazing-fast Samsung 990 PRO 1TB Gen4 SSD with solid Corsair Vengeance 16GB DDR5 RAM for uncompromised responsiveness.",
    photos: [
      {
        public_id: "demo_bundle_1",
        url: "/products/bundle_1.png",
      },
    ],
  },
  {
    name: "Dell Alienware AW2726DL 27\" 280Hz Fast IPS QHD Gaming Monitor",
    price: 20989,
    originalPrice: 34999,
    stock: 6,
    category: "featured",
    description: "Competitive Esports 27-inch QHD (2560x1440) Fast IPS display with ultra-smooth 280Hz refresh rate, 0.5ms response time, AMD FreeSync Premium Pro, and sRGB 99% color gamut.",
    photos: [
      {
        public_id: "demo_monitor_alienware",
        url: "/products/monitor_alienware.png",
      },
    ],
  },

  // 2. PROCESSORS
  {
    name: "AMD Ryzen 9 9950X3D AM5 OEM Fresh Unit Desktop Processor (5.7GHz, 16 Cores, 32 Threads)",
    price: 65999,
    originalPrice: 118000,
    stock: 10,
    category: "processor",
    description: "Zen 5 pinnacle gaming and workstation processor. 16 cores, 32 threads, 3D V-Cache technology, up to 5.7 GHz boost clock, socket AM5, PCIe 5.0, unbuffered DDR5 support.",
    photos: [
      {
        public_id: "demo_cpu_ryzen9",
        url: "/products/cpu_ryzen9.png",
      },
    ],
  },
  {
    name: "AMD Ryzen 7 7700X3D Processor with Radeon Graphics AM5",
    price: 35794,
    originalPrice: 58000,
    stock: 14,
    category: "processor",
    description: "High-FPS gaming benchmark chip with 8 Cores, 16 Threads, AMD 3D V-Cache technology, integrated AMD Radeon Graphics, AM5 platform, 105W TDP.",
    photos: [
      {
        public_id: "demo_cpu_ryzen7",
        url: "/products/cpu_ryzen7.png",
      },
    ],
  },
  {
    name: "Intel Core Ultra 5 245K LGA1851 OEM Desktop Processor (5.2 GHz / 14 Cores)",
    price: 20999,
    originalPrice: 68000,
    stock: 8,
    category: "processor",
    description: "Intel Arrow Lake architecture featuring 14 cores (6 P-cores + 8 E-cores), up to 5.2 GHz max boost clock, LGA1851 socket, cutting-edge AI NPU, DDR5 only.",
    photos: [
      {
        public_id: "demo_cpu_intel245k",
        url: "/products/cpu_intel245k.png",
      },
    ],
  },
  {
    name: "AMD Ryzen 7 5800X3D 10th Anniversary Edition Gaming Desktop Processor",
    price: 36794,
    originalPrice: 99999,
    stock: 5,
    category: "processor",
    description: "The legendary AM4 upgrade king. 8 cores, 16 threads, massive 96MB L3 3D V-Cache, revolutionary gaming efficiency and unmatched value for socket AM4 systems.",
    photos: [
      {
        public_id: "demo_cpu_ryzen5800x3d",
        url: "/products/cpu_ryzen5800x3d.png",
      },
    ],
  },
  {
    name: "AMD Ryzen 5 7500X3D (Tray) Processor OEM PROCESSOR FRESH UNIT",
    price: 23399,
    originalPrice: 58000,
    stock: 11,
    category: "processor",
    description: "Budget gaming champion. 6 cores, 12 threads with 3D V-Cache on socket AM5, delivers high framerates in competitive esports titles at incredible thermal efficiency.",
    photos: [
      {
        public_id: "demo_cpu_ryzen7500x3d",
        url: "/products/cpu_ryzen7500x3d.png",
      },
    ],
  },

  // 3. MOTHERBOARDS
  {
    name: "Gigabyte B850M C AM5 M-ATX Motherboard",
    price: 15999,
    originalPrice: 58000,
    stock: 12,
    category: "motherboard",
    description: "Robust Micro-ATX motherboard for AMD Ryzen 9000 and 7000 series processors. Digital VRM solution, PCIe 5.0 M.2 slot, high-speed 2.5GbE LAN, USB 3.2 Gen 2 Type-C.",
    photos: [
      {
        public_id: "demo_mobo_b850m_c",
        url: "/products/mobo_b850m_c.png",
      },
    ],
  },
  {
    name: "Gigabyte B550M K Wifi6e M-ATX Motherboard",
    price: 9499,
    originalPrice: 48500,
    stock: 9,
    category: "motherboard",
    description: "Solid, dependable AM4 foundation with integrated Wi-Fi 6E, Bluetooth 5.3, Dual M.2 PCIe 4.0 slots, Realtek GbE LAN, and reinforced PCIe armor slot.",
    photos: [
      {
        public_id: "demo_mobo_b550m_k",
        url: "/products/mobo_b550m_k.png",
      },
    ],
  },
  {
    name: "Gigabyte X870E Eagle X3D WIFI7 ATX Motherboard",
    price: 23499,
    originalPrice: 63580,
    stock: 6,
    category: "motherboard",
    description: "Enthusiast-grade AM5 ATX powerhouse with cutting-edge Wi-Fi 7, ultra-durable 16+2+2 phases VRM, dual PCIe 5.0 x16 slots, quad M.2 thermal guard, and EZ-Latch Click.",
    photos: [
      {
        public_id: "demo_mobo_x870e",
        url: "/products/mobo_x870e.png",
      },
    ],
  },
  {
    name: "MSI PRO B550M-P WIFI6E M-ATX DDR4 Motherboard",
    price: 9199,
    originalPrice: 54000,
    stock: 3,
    category: "motherboard",
    description: "Professional productivity motherboard featuring Core Boost, DDR4 Boost, Audio Boost, high-speed Wi-Fi 6E module, and heavy-duty heatsink armor.",
    photos: [
      {
        public_id: "demo_mobo_msi_b550m",
        url: "/products/mobo_msi_b550m.png",
      },
    ],
  },
  {
    name: "Gigabyte B850 FORCE MATRIX V2 ATX Motherboard",
    price: 12506,
    originalPrice: 35000,
    stock: 10,
    category: "motherboard",
    description: "High-value full ATX gaming board for AMD Socket AM5 with expanded heatsinks, pre-installed I/O shield, RGB Fusion 2.0, and high-fidelity audio.",
    photos: [
      {
        public_id: "demo_mobo_b850_force",
        url: "/products/mobo_b850_force.png",
      },
    ],
  },

  // 4. MEMORY (RAM)
  {
    name: "Corsair Vengeance LPX 16GB (1x16GB) DDR4 3200MHz C16 Desktop RAM",
    price: 3299,
    originalPrice: 7500,
    stock: 25,
    category: "ram",
    description: "Pure aluminum heat spreader for faster heat dissipation, low-profile design fits in compact chassis, XMP 2.0 support for automatic overclocking at 3200MHz CL16.",
    photos: [
      {
        public_id: "demo_ram_corsair",
        url: "/products/ram_corsair.png",
      },
    ],
  },
  {
    name: "Kingston FURY Beast 16GB RGB DDR5 6000MHz CL36 Desktop Memory",
    price: 5499,
    originalPrice: 11000,
    stock: 18,
    category: "ram",
    description: "Dynamic RGB lighting with patented Infrared Sync Technology, on-die ECC for improved stability, Intel XMP 3.0 & AMD EXPO certified at 6000MHz CL36.",
    photos: [
      {
        public_id: "demo_ram_kingston",
        url: "/products/ram_kingston.png",
      },
    ],
  },
  {
    name: "G.Skill Ripjaws S5 32GB (2x16GB) DDR5 6000MHz CL30 Gaming RAM",
    price: 9299,
    originalPrice: 18000,
    stock: 14,
    category: "ram",
    description: "Low-profile matte black DDR5 memory kit engineered for high performance with ultra-tight CL30-38-38-96 latency, hand-screened ICs, and Intel XMP 3.0 profile.",
    photos: [
      {
        public_id: "demo_ram_gskill",
        url: "/products/ram_gskill.png",
      },
    ],
  },
  {
    name: "Crucial Pro 16GB DDR5 5600MHz UDIMM Desktop Memory",
    price: 4199,
    originalPrice: 8999,
    stock: 20,
    category: "ram",
    description: "No-fuss plug-and-play DDR5 high-speed desktop memory with low-profile matte black heatspreader, compatible with 12th-14th Gen Intel and AMD Ryzen 7000/9000.",
    photos: [
      {
        public_id: "demo_ram_crucial",
        url: "/products/ram_crucial.png",
      },
    ],
  },
  {
    name: "Corsair Dominator Titanium RGB 32GB (2x16GB) DDR5 6400MHz",
    price: 14999,
    originalPrice: 26500,
    stock: 8,
    category: "ram",
    description: "Luxurious forged aluminum construction with customizable top bar and 11 vibrant CAPELLIX RGB LEDs. Patented DHX cooling and blazing 6400MHz CL32 speeds.",
    photos: [
      {
        public_id: "demo_ram_dominator",
        url: "/products/ram_dominator.png",
      },
    ],
  },

  // 5. GRAPHICS CARDS
  {
    name: "Gigabyte GeForce RTX 4060 WINDFORCE OC 8GB GDDR6 Graphics Card",
    price: 28499,
    originalPrice: 38000,
    stock: 9,
    category: "graphics-card",
    description: "NVIDIA Ada Lovelace architecture with DLSS 3 frame generation, full ray tracing, WINDFORCE 2X cooling system, alternate spinning fans, and protective backplate.",
    photos: [
      {
        public_id: "demo_gpu_rtx4060",
        url: "/products/gpu_rtx4060.png",
      },
    ],
  },
  {
    name: "ASUS Dual Radeon RX 7600 XT OC Edition 16GB GDDR6",
    price: 31999,
    originalPrice: 46000,
    stock: 7,
    category: "graphics-card",
    description: "Generous 16GB VRAM memory buffer for 1080p and 1440p max settings gaming. Dual Axial-tech fan design, 0dB technology, 2.5-slot design, and Auto-Extreme manufacturing.",
    photos: [
      {
        public_id: "demo_gpu_rx7600",
        url: "/products/gpu_rx7600.png",
      },
    ],
  },
  {
    name: "MSI GeForce RTX 4070 Ti SUPER 16G VENTUS 3X OC Graphics Card",
    price: 78999,
    originalPrice: 105000,
    stock: 5,
    category: "graphics-card",
    description: "Triple-fan VENTUS thermal design with TORX Fan 4.0, copper baseplate, Airflow Control, 16GB GDDR6X 256-bit bus, ideal for 4K ray tracing and high-FPS 1440p gaming.",
    photos: [
      {
        public_id: "demo_gpu_rtx4070ti",
        url: "/products/gpu_rtx4070ti.png",
      },
    ],
  },
  {
    name: "ZOTAC Gaming GeForce RTX 4080 SUPER Trinity Black Edition 16GB",
    price: 98499,
    originalPrice: 135000,
    stock: 4,
    category: "graphics-card",
    description: "Aerodynamic IceStorm 2.0 advanced cooling, SPECTRA 2.0 RGB lighting, dual BIOS, metal backplate, and 10,240 CUDA cores for extreme 4K gaming without compromise.",
    photos: [
      {
        public_id: "demo_gpu_rtx4080",
        url: "/products/gpu_rtx4080.png",
      },
    ],
  },
  {
    name: "Sapphire Pulse AMD Radeon RX 7800 XT 16GB GDDR6",
    price: 51999,
    originalPrice: 69000,
    stock: 8,
    category: "graphics-card",
    description: "AMD RDNA 3 architecture, Dual-X cooling with Angular Velocity Fan Blades, High TG Copper PCB, composite heatpipes, all-metal backplate, and intelligent fan control.",
    photos: [
      {
        public_id: "demo_gpu_rx7800",
        url: "/products/gpu_rx7800.png",
      },
    ],
  },
];

async function seed() {
  const mongoURI = process.env.MONGO_URI || "";
  const redisURI = process.env.REDIS_URI || "";

  if (!mongoURI) {
    console.error("No MONGO_URI in .env");
    process.exit(1);
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(mongoURI, { dbName: "Ecommerce_24" });
  console.log("Connected to MongoDB!");

  let inserted = 0;
  let updated = 0;

  for (const item of demoProducts) {
    const existing = await Product.findOne({ name: item.name });
    if (existing) {
      existing.price = item.price;
      existing.originalPrice = item.originalPrice;
      existing.stock = item.stock;
      existing.category = item.category;
      existing.description = item.description;
      existing.photos = item.photos;
      await existing.save();
      updated++;
    } else {
      await Product.create(item);
      inserted++;
    }
  }

  console.log(`Seeding complete: ${inserted} products created, ${updated} products updated.`);

  if (redisURI) {
    try {
      console.log("Connecting to Redis to flush cache...");
      const redis = new Redis(redisURI, { maxRetriesPerRequest: 2 });
      await redis.flushall();
      console.log("Redis cache flushed successfully!");
      redis.disconnect();
    } catch (err: any) {
      console.warn("Could not flush Redis:", err.message);
    }
  }

  await mongoose.disconnect();
  console.log("Done!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
