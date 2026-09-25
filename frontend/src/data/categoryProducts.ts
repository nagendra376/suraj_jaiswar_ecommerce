export interface CategoryItem {
  name: string;
  slug: string;
  iconName: string;
  image: string;
}

export const CATEGORIES_NAV: CategoryItem[] = [
  { name: "Processor", slug: "processor", iconName: "cpu", image: "/categories/cpu.jpg" },
  { name: "Motherboard", slug: "motherboard", iconName: "motherboard", image: "/categories/mobo.jpg" },
  { name: "Memory (RAM)", slug: "ram", iconName: "ram", image: "/categories/memory.jpg" },
  { name: "Graphics Card", slug: "graphics-card", iconName: "gpu", image: "/categories/gpu.jpg" },
  { name: "SSD", slug: "ssd", iconName: "ssd", image: "/categories/ssd.jpg" },
  { name: "Storage", slug: "storage", iconName: "hdd", image: "/categories/hdd.jpg" },
  { name: "Cooling System", slug: "cooler", iconName: "cooler", image: "/categories/cpu-cooler.jpg" },
  { name: "Power Supply", slug: "power-supply", iconName: "power", image: "/categories/smps.jpg" },
  { name: "Cabinet (Case)", slug: "cabinet", iconName: "cabinet", image: "/categories/cabinet.jpg" },
  { name: "Monitor", slug: "monitor", iconName: "monitor", image: "/categories/monitor.jpg" },
];
