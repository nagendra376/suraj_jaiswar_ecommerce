import React from "react";
import { Link, useNavigate } from "../../utils/router";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../../redux/reducer/cartReducer";
import { CartItem } from "../../types/types";
import { BsPcDisplay, BsCartPlus, BsLightningChargeFill } from "react-icons/bs";
import { FaArrowRight, FaChevronDown, FaCheckCircle } from "react-icons/fa";

interface PrebuiltItem {
  id: string;
  name: string;
  categoryTag: string;
  mrp: number;
  price: number;
  photo: string;
  specs: string;
  stock: number;
}

const prebuiltPcs: PrebuiltItem[] = [
  {
    id: "prebuilt-intel-i5",
    name: "Intel i5 12th Gen Prebuilt PC Tower",
    categoryTag: "Intel Powered",
    mrp: 55000,
    price: 40990,
    photo: "/prebuilt-pc-intel.jpg",
    specs: "Core i5 12400F • 16GB DDR4 • 512GB NVMe • GTX 1650",
    stock: 5,
  },
  {
    id: "prebuilt-amd-5600",
    name: "AMD Ryzen 5 5600 Prebuild PC",
    categoryTag: "AMD Gaming",
    mrp: 42000,
    price: 29499,
    photo: "/prebuilt-pc-amd.jpg",
    specs: "Ryzen 5 5600 • 16GB DDR4 • 500GB SSD • RX 6500XT",
    stock: 4,
  },
  {
    id: "prebuilt-ryzen-5600gt",
    name: "Ryzen 5 5600GT Gaming PC",
    categoryTag: "Pro Esports",
    mrp: 58000,
    price: 44800,
    photo: "/products/bundle_1.png",
    specs: "Ryzen 5 5600GT • 16GB 3600MHz • 1TB NVMe • RTX 3050",
    stock: 6,
  },
  {
    id: "prebuilt-ryzen-5600x",
    name: "Prebuild PC | AMD Ryzen 5 5600X",
    categoryTag: "Win 11 Ready",
    mrp: 85000,
    price: 62999,
    photo: "/products/bundle_2.png",
    specs: "Ryzen 5 5600X • 32GB DDR4 • 1TB Gen4 • RTX 4060",
    stock: 3,
  },
  {
    id: "prebuilt-ryzen-9-white",
    name: "Best Selling PC AMD Ryzen 9 White",
    categoryTag: "Elite Master",
    mrp: 115000,
    price: 88900,
    photo: "/prebuilt-pc-white.jpg",
    specs: "Ryzen 9 7900X • 32GB DDR5 • 1TB Gen4 • RTX 4070 White",
    stock: 2,
  },
];

const PrebuiltCustomPcSection: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (item: PrebuiltItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cartItem: CartItem = {
      productId: item.id,
      photo: item.photo,
      name: item.name,
      price: item.price,
      quantity: 1,
      stock: item.stock,
    };

    dispatch(addToCart(cartItem));
    toast.success(`${item.name} added to cart!`);
  };

  const handleBuyNow = (item: PrebuiltItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cartItem: CartItem = {
      productId: item.id,
      photo: item.photo,
      name: item.name,
      price: item.price,
      quantity: 1,
      stock: item.stock,
    };

    dispatch(addToCart(cartItem));
    navigate("/cart");
  };

  return (
    <section className="prebuilt-custom-pc-section" aria-label="Prebuilt and Custom PC Section">
      <div className="prebuilt-pc-container">
        {/* ================= 1. PREBUILT PC SUB-SECTION ================= */}
        <div className="prebuilt-sub-wrapper">
          {/* Header Bar */}
          <div className="prebuilt-header-strip">
            <div className="header-strip-left">
              <div className="strip-badge-icon">
                <BsPcDisplay />
              </div>
              <div className="strip-text-box">
                <h2 className="strip-title">PREBUILT PC</h2>
                <span className="strip-subtitle">Ready to Ship Collection • Plug &amp; Play</span>
              </div>
            </div>
            <Link
              to="/search?category=custom-pc-build"
              className="strip-action-link"
              aria-label="View All Prebuilt PCs"
            >
              <span>View All</span>
              <FaArrowRight className="link-arrow" />
            </Link>
          </div>

          {/* 5-Card Product Grid */}
          <div className="prebuilt-cards-grid">
            {prebuiltPcs.map((item) => (
              <div key={item.id} className="prebuilt-product-card">
                <Link
                  to={`/search?search=${encodeURIComponent(item.name)}`}
                  className="card-media-wrap"
                >
                  <span className="card-category-badge">{item.categoryTag}</span>
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="card-product-img"
                    loading="lazy"
                  />
                </Link>

                <div className="card-info-content">
                  <span className="brand-label">Solution Systems Verified</span>
                  <h3 className="card-product-title">
                    <Link to={`/search?search=${encodeURIComponent(item.name)}`}>
                      {item.name}
                    </Link>
                  </h3>

                  <p className="card-specs-line">{item.specs}</p>

                  <div className="card-pricing-row">
                    <span className="mrp-strikethrough">₹{item.mrp.toLocaleString("en-IN")}.00</span>
                    <span className="final-deal-price">₹{item.price.toLocaleString("en-IN")}.00</span>
                  </div>

                  <div className="card-action-btns">
                    <button
                      type="button"
                      className="btn-add-cart"
                      onClick={(e) => handleAddToCart(item, e)}
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <BsCartPlus className="btn-icon" /> Add to Cart
                    </button>
                    <button
                      type="button"
                      className="btn-buy-now"
                      onClick={(e) => handleBuyNow(item, e)}
                      aria-label={`Buy ${item.name} now`}
                    >
                      <BsLightningChargeFill className="btn-icon" /> Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 2. BUILD YOUR OWN CUSTOMIZED PC SUB-SECTION ================= */}
        <div className="custom-build-sub-wrapper">
          {/* Cyan/Blue Ribbon Title Bar */}
          <div className="custom-ribbon-bar">
            <span className="ribbon-title">BUILD YOUR OWN CUSTOMIZED PC</span>
            <div className="ribbon-down-pointer">
              <FaChevronDown />
            </div>
          </div>

          {/* 2 Large Featured AMD & INTEL Banner Cards */}
          <div className="custom-cards-dual-grid">
            {/* Card 1: AMD Custom PC Build */}
            <div className="custom-pc-hero-card card-amd">
              <Link
                to="/search?category=custom-pc-build&brand=amd"
                className="custom-hero-media"
                aria-label="Build Your Custom AMD PC"
              >
                <div className="custom-media-overlay">
                  <span className="hero-top-badge">AMD ADVANTAGE</span>
                  <h3 className="hero-floating-title">
                    AMD CUSTOM <br />
                    <span className="text-glow-red">PC BUILD</span>
                  </h3>
                  <div className="hero-perks">
                    <span><FaCheckCircle className="perk-icon" /> Ryzen 7000 / 9000 Series</span>
                    <span><FaCheckCircle className="perk-icon" /> Radeon RX &amp; GeForce GPUs</span>
                  </div>
                </div>
                <img
                  src="/amd-custom-pc.jpg"
                  alt="Build Your Custom AMD Gaming PC"
                  className="custom-hero-bg-img"
                  loading="lazy"
                />
              </Link>

              <div className="custom-card-footer">
                <div className="footer-meta">
                  <h4 className="footer-title">Build Your Custom AMD PC</h4>
                  <span className="footer-price">
                    From <strong className="price-val">₹19,999.00</strong>
                  </span>
                </div>
                <div className="footer-actions">
                  <Link
                    to="/search?category=custom-pc-build&brand=amd"
                    className="btn-customize btn-amd"
                  >
                    Customize &amp; Buy <FaArrowRight className="action-arrow" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: INTEL Custom PC Build */}
            <div className="custom-pc-hero-card card-intel">
              <Link
                to="/search?category=custom-pc-build&brand=intel"
                className="custom-hero-media"
                aria-label="Build Your Custom Intel PC"
              >
                <div className="custom-media-overlay">
                  <span className="hero-top-badge">INTEL CORE ARCHITECTURE</span>
                  <h3 className="hero-floating-title">
                    INTEL CUSTOM <br />
                    <span className="text-glow-blue">PC BUILD</span>
                  </h3>
                  <div className="hero-perks">
                    <span><FaCheckCircle className="perk-icon" /> 13th &amp; 14th Gen Core i5/i7/i9</span>
                    <span><FaCheckCircle className="perk-icon" /> DDR5 Extreme Memory OC</span>
                  </div>
                </div>
                <img
                  src="/intel-custom-pc.jpg"
                  alt="Build Your Custom Intel Gaming PC"
                  className="custom-hero-bg-img"
                  loading="lazy"
                />
              </Link>

              <div className="custom-card-footer">
                <div className="footer-meta">
                  <h4 className="footer-title">Build Your Custom Intel PC</h4>
                  <span className="footer-price">
                    From <strong className="price-val">₹19,999.00</strong>
                  </span>
                </div>
                <div className="footer-actions">
                  <Link
                    to="/search?category=custom-pc-build&brand=intel"
                    className="btn-customize btn-intel"
                  >
                    Customize &amp; Buy <FaArrowRight className="action-arrow" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrebuiltCustomPcSection;
