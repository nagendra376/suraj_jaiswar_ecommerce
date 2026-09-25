export interface CategoryItem {
  name: string;
  slug: string;
  iconName: string;
  image: string;
}

export const CATEGORIES_NAV: CategoryItem[] = [
  { name: "Processor", slug: "processor", iconName: "cpu", image: "/categories/processor.webp" },
  { name: "Motherboard", slug: "motherboard", iconName: "motherboard", image: "/categories/motherboard.webp" },
  { name: "Memory (RAM)", slug: "ram", iconName: "ram", image: "/categories/ram.webp" },
  { name: "Graphics Card", slug: "graphics-card", iconName: "gpu", image: "/categories/gpu.webp" },
  { name: "SSD", slug: "ssd", iconName: "ssd", image: "/categories/ssd.webp" },
  { name: "Storage", slug: "storage", iconName: "hdd", image: "/categories/storage.jpg" },
  { name: "Cooling System", slug: "cooler", iconName: "cooler", image: "/categories/cooler.webp" },
  { name: "Power Supply", slug: "power-supply", iconName: "power", image: "/categories/power.jpg" },
  { name: "Cabinet (Case)", slug: "cabinet", iconName: "cabinet", image: "/categories/cabinet.webp" },
  { name: "Monitor", slug: "monitor", iconName: "monitor", image: "/categories/monitor.webp" },
];

