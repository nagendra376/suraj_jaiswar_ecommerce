export interface CategoryItem {
  name: string;
  slug: string;
  iconName: string;
}

export const CATEGORIES_NAV: CategoryItem[] = [
  { name: "Processor", slug: "processor", iconName: "cpu" },
  { name: "Motherboard", slug: "motherboard", iconName: "motherboard" },
  { name: "Memory (RAM)", slug: "ram", iconName: "ram" },
  { name: "Graphics Card", slug: "graphics-card", iconName: "gpu" },
  { name: "SSD", slug: "ssd", iconName: "ssd" },
  { name: "Storage", slug: "storage", iconName: "hdd" },
  { name: "Cooling System", slug: "cooler", iconName: "cooler" },
  { name: "Power Supply", slug: "power-supply", iconName: "power" },
  { name: "Cabinet (Case)", slug: "cabinet", iconName: "cabinet" },
  { name: "Monitor", slug: "monitor", iconName: "monitor" },
];
