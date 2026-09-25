import React, { useRef } from "react";
import { Link, useNavigate } from "../../utils/router";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../../redux/reducer/cartReducer";
import { CartItem } from "../../types/types";
import { BsPcDisplay, BsCartPlus, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaArrowRight, FaChevronDown, FaCheckCircle, FaShoppingCart } from "react-icons/fa";

interface PosterDeal {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  scriptTag: string;
  photo: string;
  mrp: number;
  salePrice: number;
  features: { icon: string; label: string }[];
  stock: number;
}

const posterDeals: PosterDeal[] = [
  {
    id: "deal-study-pc-fullset",
    badge: "STUDY PC",
    title: "FULL SET",
    subtitle: "LEARN | WORK | BROWSE | DO MORE",
    scriptTag: "Perfect for Students",
    photo: "/poster-study-pc-fullset.jpg",
    mrp: 23499,
    salePrice: 10999,
    features: [
      { icon: "🖥️", label: "HD Display" },
      { icon: "⌨️", label: "Keyboard" },
      { icon: "🖱️", label: "Mouse" },
      { icon: "🎓", label: "Study & Work" },
      { icon: "⭐", label: "Best Value" },
    ],
    stock: 5,
  },
  {
    id: "deal-intel-core-i5",
    badge: "PREBUILT PC",
    title: "INTEL CORE i5",
    subtitle: "AFFORDABLE | RELIABLE | HIGH PERFORMANCE",
    scriptTag: "Build Your Dreams",
    photo: "/poster-intel-prebuilt-white.jpg",
    mrp: 30650,
    salePrice: 14990,
    features: [
      { icon: "⚡", label: "Powerful" },
      { icon: "🛡️", label: "Reliable" },
      { icon: "🚀", label: "Multitask" },
      { icon: "⚙️", label: "Upgrade Ready" },
      { icon: "💎", label: "Genuine" },
    ],
    stock: 4,
  },
  {
    id: "deal-study-pc-tower",
    badge: "PREBUILD PC TOWER",
    title: "STUDY PC",
    subtitle: "LEARN | WORK | BROWSE | DO MORE",
    scriptTag: "Smart Performance Everyday",
    photo: "/poster-study-pc-tower.jpg",
    mrp: 22499,
    salePrice: 8499,
    features: [
      { icon: "🖥️", label: "Prebuilt Tower" },
      { icon: "📚", label: "For Study" },
      { icon: "⚡", label: "Smooth Speed" },
      { icon: "💰", label: "Affordable" },
      { icon: "✅", label: "Warranty" },
    ],
    stock: 6,
  },
  {
    id: "deal-gaming-pc-i5-12th",
    badge: "PC BUILD",
    title: "i5 12TH GEN GAMING",
    subtitle: "POWER | PERFORMANCE | DOMINANCE",
    scriptTag: "Build Your Dreams",
    photo: "/poster-gaming-pc-build.jpg",
    mrp: 89600,
    salePrice: 54990,
    features: [
      { icon: "🎮", label: "Esports Ready" },
      { icon: "🌈", label: "ARGB Sync" },
      { icon: "🔥", label: "RTX Graphics" },
      { icon: "❄️", label: "Liquid Cool" },
      { icon: "👑", label: "Pro Grade" },
    ],
    stock: 3,
  },
  {
    id: "deal-white-edition-rig",
    badge: "ELITE PREBUILT",
    title: "WHITE EDITION RIG",
    subtitle: "NEXT-GEN GAMING & CREATION",
    scriptTag: "Master Edition",
    photo: "/prebuilt-pc-white.jpg",
    mrp: 115000,
    salePrice: 88900,
    features: [
      { icon: "💎", label: "All-White" },
      { icon: "🚀", label: "DDR5 32GB" },
      { icon: "⚡", label: "Gen4 NVMe" },
      { icon: "🛡️", label: "3-Yr Warranty" },
      { icon: "⭐", label: "Top Rated" },
    ],
    stock: 2,
  },
  {
    id: "deal-amd-ryzen-5",
    badge: "AMD RYZEN PC",
    title: "RYZEN 5 ESPORTS RIG",
    subtitle: "HIGH-FPS COMPETITIVE GAMING",
    scriptTag: "Pure Gaming Power",
    photo: "/prebuilt-pc-amd.jpg",
    mrp: 58000,
    salePrice: 44800,
    features: [
      { icon: "🔥", label: "Ryzen 5" },
      { icon: "🎯", label: "High FPS" },
      { icon: "💾", label: "16GB 3600MHz" },
      { icon: "📦", label: "Same Day" },
      { icon: "🏆", label: "Original OEM" },
    ],
    stock: 4,
  },
];

const PrebuiltCustomPcSection: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = (item: PosterDeal, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cartItem: CartItem = {
      productId: item.id,
      photo: item.photo,
      name: `${item.badge} ${item.title}`,
      price: item.salePrice,
      quantity: 1,
      stock: item.stock,
    };

    dispatch(addToCart(cartItem));
    toast.success(`${item.badge} ${item.title} added to cart!`);
  };

  const handleBuyNow = (item: PosterDeal, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cartItem: CartItem = {
      productId: item.id,
      photo: item.photo,
      name: `${item.badge} ${item.title}`,
      price: item.salePrice,
      quantity: 1,
      stock: item.stock,
    };

    dispatch(addToCart(cartItem));
    navigate("/cart");
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <section className="prebuilt-custom-pc-section" aria-label="Prebuilt and Custom PC Section">
      <div className="prebuilt-pc-container">
        {/* ================= 1. AUTO-SCROLLING HORIZONTAL PREBUILT PC CAROUSEL ================= */}
        <div className="prebuilt-sub-wrapper">
          {/* Header Bar */}
          <div className="prebuilt-header-strip">
            <div className="header-strip-left">
              <div className="strip-badge-icon">
                <BsPcDisplay />
              </div>
              <div className="strip-text-box">
                <h2 className="strip-title">PREBUILT PC</h2>
                <span className="strip-subtitle">Ready to Ship Collection • Plug &amp; Play Setup</span>
              </div>
            </div>
            <div className="header-strip-right">
              <button
                type="button"
                className="scroll-nav-btn prev"
                onClick={scrollLeft}
                aria-label="Scroll left"
              >
                <BsChevronLeft />
              </button>
              <button
                type="button"
                className="scroll-nav-btn next"
                onClick={scrollRight}
                aria-label="Scroll right"
              >
                <BsChevronRight />
              </button>
              <Link
                to="/search?category=custom-pc-build"
                className="strip-action-link"
                aria-label="View All Prebuilt PCs"
              >
                <span>View All</span>
                <FaArrowRight className="link-arrow" />
              </Link>
            </div>
          </div>

          {/* Continuous Auto-Scrolling Marquee Track */}
          <div className="auto-scroll-marquee-wrapper" ref={scrollContainerRef}>
            <div className="auto-scroll-marquee-track">
              {/* Render items twice for seamless infinite marquee loop */}
              {[...posterDeals, ...posterDeals].map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="poster-card-deal"
                  aria-label={`${item.badge} ${item.title}`}
                >
                  {/* Top Poster Header */}
                  <div className="poster-card-header">
                    <span className="poster-badge-top">{item.badge}</span>
                    <h3 className="poster-title-main">{item.title}</h3>
                    <p className="poster-subtitle-line">{item.subtitle}</p>
                    <span className="poster-script-tag">{item.scriptTag}</span>
                  </div>

                  {/* Central Product Image on Podium */}
                  <div className="poster-image-podium-wrap">
                    <img
                      src={item.photo}
                      alt={`${item.badge} ${item.title}`}
                      className="poster-product-img"
                      loading="lazy"
                    />
                  </div>

                  {/* Pricing Box & CTA */}
                  <div className="poster-pricing-section">
                    <div className="split-price-box">
                      <div className="mrp-box">
                        <span className="price-label-tiny">MRP</span>
                        <span className="mrp-number">₹{item.mrp.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="sale-box">
                        <span className="price-label-tiny">SALE PRICE</span>
                        <span className="sale-number">₹{item.salePrice.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="poster-shop-now-btn"
                      onClick={(e) => handleBuyNow(item, e)}
                      aria-label={`Shop Now for ${item.title}`}
                    >
                      <FaShoppingCart className="btn-cart-icon" /> SHOP NOW
                    </button>
                  </div>

                  {/* Bottom Features Icons Strip */}
                  <div className="poster-features-strip">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="feature-icon-pill" title={feat.label}>
                        <span className="feat-emoji">{feat.icon}</span>
                        <span className="feat-text">{feat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
