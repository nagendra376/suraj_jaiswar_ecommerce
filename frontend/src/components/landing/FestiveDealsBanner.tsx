import React from "react";
import { Link } from "../../utils/router";
import { FaArrowRight, FaBolt, FaFire, FaGift, FaTag } from "react-icons/fa6";

const FestiveDealsBanner: React.FC = () => {
  return (
    <section className="festive-deals-section" aria-label="Festive Offers & Deals">
      <div className="festive-deals-container">
        {/* Section Header */}
        <div className="festive-section-header">
          <div className="festive-badge">
            <span className="badge-flame">
              <FaFire />
            </span>
            <span>GANESH CHATURTHI MEGA FESTIVE OFFERS</span>
          </div>
          <h2 className="festive-title">
            Celebration Deals on <span className="highlight-gold">Top-Tier Hardware</span>
          </h2>
          <p className="festive-subtitle">
            Special festive pricing, instant EMI, verified genuine components &amp; same-day Mumbai MMR dispatch.
          </p>
        </div>

        {/* Row 1: Featured Promo Trio (Left RAM Deal, Center AI Workstation, Right GPU Deal) */}
        <div className="festive-trio-grid">
          {/* Card 1: G.SKILL / RAM Ganpati Sale */}
          <Link
            to="/search?category=memory-ram"
            className="festive-card festive-card-portrait festive-card-ram"
            aria-label="Shop DDR5 RAM Ganpati Sale"
          >
            <div className="festive-img-wrap">
              <img
                src="/festive-banner-ram.jpg"
                alt="G.Skill DDR5 RAM Ganpati Sale"
                className="festive-banner-img"
                loading="lazy"
              />
            </div>
            <div className="festive-card-overlay">
              <div className="deal-chip-top">
                <FaBolt className="chip-icon" /> GANPATI SPECIAL
              </div>
              <div className="deal-bottom-content">
                <div className="price-tag-badge">
                  <span className="mrp-strike">MRP ₹48,000</span>
                  <span className="festive-deal-price">₹28,499</span>
                </div>
                <span className="action-pill-btn">
                  Shop Now <FaArrowRight className="btn-arrow" />
                </span>
              </div>
            </div>
          </Link>

          {/* Card 2: Centerpiece - NVIDIA DGX / AI Workstation Festive Offer */}
          <Link
            to="/search?category=custom-pc-build"
            className="festive-card festive-card-centerpiece"
            aria-label="Explore AI Workstations and PC Builds"
          >
            <div className="festive-img-wrap">
              <img
                src="/festive-banner-center.jpg"
                alt="Ganesh Chaturthi Special AI Workstation and Tech Sale"
                className="festive-banner-img"
                loading="lazy"
              />
            </div>
            <div className="festive-card-overlay festive-centerpiece-overlay">
              <div className="deal-chip-top gold-chip">
                <FaGift className="chip-icon" /> FESTIVE MEGA DEALS
              </div>
              <div className="deal-bottom-content centerpiece-bottom">
                <div className="deal-text-block">
                  <span className="center-tag">POWER YOUR AI • POWER YOUR FUTURE</span>
                  <span className="center-sub">Up to 50% Off On Builds &amp; Upgrades</span>
                </div>
                <span className="action-pill-btn action-pill-gold">
                  Explore Deals <FaArrowRight className="btn-arrow" />
                </span>
              </div>
            </div>
          </Link>

          {/* Card 3: Graphics Card / GPU Festive Deal */}
          <Link
            to="/search?category=graphics-card"
            className="festive-card festive-card-portrait festive-card-gpu"
            aria-label="Shop Graphics Cards Festive Sale"
          >
            <div className="festive-img-wrap">
              <img
                src="/festive-banner-gpu.jpg"
                alt="GeForce RTX 40 Series Festive Sale"
                className="festive-banner-img"
                loading="lazy"
              />
            </div>
            <div className="festive-card-overlay">
              <div className="deal-chip-top red-chip">
                <FaTag className="chip-icon" /> MEGA FESTIVE SALE
              </div>
              <div className="deal-bottom-content">
                <div className="price-tag-badge">
                  <span className="mrp-strike">MRP ₹1,12,000</span>
                  <span className="festive-deal-price">₹63,499</span>
                </div>
                <span className="action-pill-btn">
                  Buy Now <FaArrowRight className="btn-arrow" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Row 2: Dual Wide Panoramic Banners (RGB RAM & Pro RAM) */}
        <div className="festive-dual-grid">
          {/* Card 4: RGB RAM Collection */}
          <Link
            to="/search?category=memory-ram"
            className="festive-card festive-card-wide"
            aria-label="Shop RGB Gaming RAM Collection"
          >
            <div className="festive-img-wrap">
              <img
                src="/festive-banner-rgb-ram.jpg"
                alt="Ganesh Chaturthi RGB RAM Sale"
                className="festive-banner-img"
                loading="lazy"
              />
            </div>
            <div className="festive-card-overlay wide-overlay">
              <div className="wide-text-content">
                <span className="wide-headline">SPARK YOUR SETUP</span>
                <span className="wide-sub">Light Up Your Build • Up to 40% Off RGB RAM</span>
              </div>
              <span className="action-pill-btn">
                Shop RGB RAM <FaArrowRight className="btn-arrow" />
              </span>
            </div>
          </Link>

          {/* Card 5: High-Speed Pro RAM Collection */}
          <Link
            to="/search?category=memory-ram"
            className="festive-card festive-card-wide"
            aria-label="Shop High Performance DDR5 RAM"
          >
            <div className="festive-img-wrap">
              <img
                src="/festive-banner-silver-ram.jpg"
                alt="High Performance Pro RAM Festive Sale"
                className="festive-banner-img"
                loading="lazy"
              />
            </div>
            <div className="festive-card-overlay wide-overlay">
              <div className="wide-text-content">
                <span className="wide-headline">POWER YOUR FESTIVE BUILD</span>
                <span className="wide-sub">Ultra-Fast Low-Latency DDR5 Memory Kits</span>
              </div>
              <span className="action-pill-btn action-pill-dark">
                Shop Performance RAM <FaArrowRight className="btn-arrow" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FestiveDealsBanner;
