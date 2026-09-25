import React from "react";
import { Link } from "../../utils/router";
import { BsArrowRight, BsCheckCircleFill } from "react-icons/bs";
import { FaShieldAlt } from "react-icons/fa";

// All store categories with rich metadata and real images
const ALL_CATEGORIES = [
  {
    name: "Processor (CPU)",
    slug: "processor",
    image: "/categories/processor.webp",
    badge: "Essential",
    desc: "AMD Ryzen 7000/9000 & Intel Core Ultra Desktop CPUs",
  },
  {
    name: "Graphics Card (GPU)",
    slug: "graphics-card",
    image: "/categories/gpu.webp",
    badge: "High Demand",
    desc: "NVIDIA GeForce RTX 40-Series & AMD Radeon Gaming GPUs",
  },
  {
    name: "Motherboard",
    slug: "motherboard",
    image: "/categories/motherboard.webp",
    badge: "Foundation",
    desc: "AM5, AM4 & Intel LGA1700/1851 High-Speed Motherboards",
  },
  {
    name: "Memory (RAM)",
    slug: "ram",
    image: "/categories/ram.webp",
    badge: "DDR5 / DDR4",
    desc: "High-Speed DDR5 & DDR4 Gaming & Workstation Memory Kits",
  },
  {
    name: "Solid State Drive (SSD)",
    slug: "ssd",
    image: "/categories/ssd.webp",
    badge: "Gen4 / Gen5",
    desc: "Gen4 & Gen5 NVMe M.2 Fast Storage & Boot Drives",
  },
  {
    name: "Storage (HDD)",
    slug: "storage",
    image: "/categories/storage.jpg",
    badge: "Mass Storage",
    desc: "High-Capacity Mass Storage Hard Drives & Backup",
  },
  {
    name: "Cooling System",
    slug: "cooler",
    image: "/categories/cooler.webp",
    badge: "AIO & Air",
    desc: "AIO Liquid Water Coolers & Heavy-Duty Tower Heatsinks",
  },
  {
    name: "Power Supply (PSU)",
    slug: "power-supply",
    image: "/categories/power.jpg",
    badge: "80+ Gold",
    desc: "80 Plus Gold & Platinum ATX 3.0 Modular Power Supplies",
  },
  {
    name: "Cabinet (PC Case)",
    slug: "cabinet",
    image: "/categories/cabinet.webp",
    badge: "ARGB Airflow",
    desc: "ARGB High-Airflow & Panoramic Glass Showcase Cabinets",
  },
  {
    name: "Gaming Monitor",
    slug: "monitor",
    image: "/categories/monitor.webp",
    badge: "144Hz–360Hz",
    desc: "Fast 144Hz–360Hz IPS, OLED & Curved Gaming Displays",
  },
  {
    name: "Laptops & Notebooks",
    slug: "laptop",
    image: "/refurb-laptop.jpg",
    badge: "Portable",
    desc: "High-Performance Gaming, Creation & Business Laptops",
  },
  {
    name: "Custom PC Builds",
    slug: "custom-pc-build",
    image: "/poster-gaming-pc-build.jpg",
    badge: "Turnkey Rig",
    desc: "Turnkey Esports Rigs, 4K Editing & Deep Learning Workstations",
  },
];

const CategoriesHubPage = () => {
  return (
    <div className="category-page-wrapper">
      <div className="category-content-container">
        {/* 1. Breadcrumbs */}
        <nav
          className="category-breadcrumbs-bar"
          aria-label="Breadcrumbs navigation"
        >
          <Link to="/">HOME</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-active">ALL CATEGORIES</span>
        </nav>

        {/* 2. Hero Banner */}
        <section className="hub-hero-section">
          <div className="hub-badge-pill">
            <FaShieldAlt style={{ fontSize: "0.8rem" }} />
            <span>Solution Systems Hardware Hub</span>
          </div>

          <h1>Explore All PC Hardware &amp; Components</h1>
          <p>
            Choose a category to browse genuine desktop components, high-FPS graphics
            cards, lightning-fast SSDs, and custom workstation hardware tailored to
            your build.
          </p>

          <div className="hub-highlights-row">
            <div className="highlight-badge">
              <BsCheckCircleFill style={{ color: "#34d399" }} />
              <span>100% Genuine Brand Warranties</span>
            </div>
            <div className="highlight-badge">
              <BsCheckCircleFill style={{ color: "#34d399" }} />
              <span>Pan-India Safe Insured Delivery</span>
            </div>
            <div className="highlight-badge">
              <BsCheckCircleFill style={{ color: "#34d399" }} />
              <span>Certified Expert Assembly</span>
            </div>
          </div>
        </section>

        {/* 3. Categories Directory Grid */}
        <section aria-labelledby="all-categories-title">
          <div className="hub-preview-section-header">
            <h2 id="all-categories-title">Browse By Category</h2>
          </div>

          <div className="hub-categories-directory">
            {ALL_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="hub-cat-card-item"
              >
                <div className="hub-cat-image-container">
                  <span className="hub-cat-badge">{cat.badge}</span>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="hub-cat-img"
                    loading="lazy"
                  />
                </div>
                <div className="hub-cat-body">
                  <h3 className="hub-cat-title">{cat.name}</h3>
                  <p className="hub-cat-description">{cat.desc}</p>
                  <div className="hub-cat-explore-btn">
                    <span>Explore {cat.name.split(" ")[0]}</span>
                    <BsArrowRight className="explore-arrow" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CategoriesHubPage;
