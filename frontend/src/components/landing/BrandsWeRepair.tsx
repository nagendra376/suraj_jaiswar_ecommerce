import React from "react";
import { Link } from "../../utils/router";
import {
  SiAcer,
  SiApple,
  SiAsus,
  SiDell,
  SiEpson,
  SiHp,
  SiLenovo,
  SiMsi,
  SiSamsung,
  SiToshiba,
} from "react-icons/si";
import { FaCaretRight } from "react-icons/fa6";

interface BrandItem {
  name: string;
  icon: React.ReactNode;
  categoryQuery: string;
}

const brands: BrandItem[] = [
  {
    name: "Acer",
    icon: <SiAcer />,
    categoryQuery: "acer",
  },
  {
    name: "Apple",
    icon: <SiApple />,
    categoryQuery: "apple",
  },
  {
    name: "ASUS",
    icon: <SiAsus />,
    categoryQuery: "asus",
  },
  {
    name: "Brother",
    icon: <span className="brand-logo-text brother">brother</span>,
    categoryQuery: "brother",
  },
  {
    name: "Canon",
    icon: <span className="brand-logo-text canon">Canon</span>,
    categoryQuery: "canon",
  },
  {
    name: "Dell",
    icon: <SiDell />,
    categoryQuery: "dell",
  },
  {
    name: "Epson",
    icon: <SiEpson />,
    categoryQuery: "epson",
  },
  {
    name: "HP",
    icon: <SiHp />,
    categoryQuery: "hp",
  },
  {
    name: "Lenovo",
    icon: <SiLenovo />,
    categoryQuery: "lenovo",
  },
  {
    name: "MSI",
    icon: <SiMsi />,
    categoryQuery: "msi",
  },
  {
    name: "Samsung",
    icon: <SiSamsung />,
    categoryQuery: "samsung",
  },
  {
    name: "Toshiba",
    icon: <SiToshiba />,
    categoryQuery: "toshiba",
  },
];

const BrandsWeRepair: React.FC = () => {
  return (
    <section className="brands-repair-section" id="supported-brands">
      <div className="brands-container">
        {/* Section Header */}
        <div className="brands-header">
          <h2 className="brands-title">All Major Brands We Repair</h2>
          <p className="brands-subtitle">
            Multi-brand expertise under one roof — 30+ brands supported
          </p>
        </div>

        {/* Brands 2-Row / Responsive Grid */}
        <div className="brands-grid">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              to={`/search?search=${encodeURIComponent(brand.name)}`}
              className="brand-card"
              title={`Repair & Services for ${brand.name}`}
            >
              <div className="brand-icon-wrap">{brand.icon}</div>
              <span className="brand-name">{brand.name}</span>
            </Link>
          ))}
        </div>

        {/* View All Brands Link */}
        <div className="brands-footer">
          <Link
            to="/search"
            className="view-all-brands-link"
            title="Browse all supported computer brands"
          >
            <span>View All Brands</span>
            <FaCaretRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BrandsWeRepair;
