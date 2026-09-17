import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBagShopping, FaBolt, FaCreditCard, FaShieldHalved, FaHeadphones } from "react-icons/fa6";

const MorrowHero = () => {
  return (
    <section className="morrow-hero-wrapper">
      {/* Header Section */}
      <motion.div
        className="morrow-header"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="pill-badge">
          <span className="badge-dot"></span>
          <span>Next-Gen eCommerce Experience • 2026</span>
        </div>

        <h1 className="hero-title">
          Know exactly what you love. <br />
          <span className="highlight">Delivered with clarity.</span>
        </h1>

        <p className="hero-subtitle">
          Experience effortless shopping with curated tech & fashion drops, instant 1-click
          checkout, and real-time live tracking directly to your doorstep.
        </p>

        <div className="hero-cta-group">
          <Link to="/search" className="btn-primary-pill">
            <span>Explore Collection</span>
            <FaArrowRight />
          </Link>
          <a href="#latest-products" className="btn-secondary-pill">
            <span>Latest Drops</span>
          </a>
        </div>
      </motion.div>

      {/* Interactive Device Showcase with Connected Nodes */}
      <div className="morrow-stage-container">
        {/* Soft Ambient Emerald Aura (signature Morrow effect) */}
        <div className="ambient-glow"></div>

        {/* SVG Connector Branch Lines (Desktop/Tablet) */}
        <svg className="connector-svg" viewBox="0 0 960 540" preserveAspectRatio="none">
          {/* Top Left to Phone */}
          <path d="M 220 80 C 350 80, 420 180, 480 200" />
          {/* Top Right to Phone */}
          <path d="M 740 80 C 610 80, 540 180, 480 200" />
          {/* Mid Left to Phone */}
          <path d="M 180 270 C 320 270, 400 270, 480 270" />
          {/* Mid Right to Phone */}
          <path d="M 780 270 C 640 270, 560 270, 480 270" />
          {/* Bottom Left to Phone */}
          <path d="M 240 480 C 350 480, 420 380, 480 340" />
          {/* Bottom Right to Phone */}
          <path d="M 720 480 C 610 480, 540 380, 480 340" />
        </svg>

        {/* Floating Node 1: Top-Left */}
        <motion.div
          className="floating-node node-top-left"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="node-icon" style={{ color: "#059669" }}>
            <FaBagShopping />
          </div>
          <div className="node-text">
            <h5>Authentic Brands</h5>
            <p>100% verified merchants</p>
          </div>
        </motion.div>

        {/* Floating Node 2: Top-Right */}
        <motion.div
          className="floating-node node-top-right"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="node-icon" style={{ color: "#2563eb" }}>
            <FaCreditCard />
          </div>
          <div className="node-text">
            <h5>Stripe Checkout</h5>
            <p>256-bit encrypted payments</p>
          </div>
        </motion.div>

        {/* Floating Node 3: Mid-Left */}
        <motion.div
          className="floating-node node-mid-left"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="node-icon" style={{ color: "#d97706" }}>
            <FaBolt />
          </div>
          <div className="node-text">
            <h5>Instant Fulfillment</h5>
            <p>Under 48h express delivery</p>
          </div>
        </motion.div>

        {/* Floating Node 4: Mid-Right */}
        <motion.div
          className="floating-node node-mid-right"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <div className="node-icon" style={{ color: "#7c3aed" }}>
            <FaHeadphones />
          </div>
          <div className="node-text">
            <h5>24/7 Priority Desk</h5>
            <p>Human support anytime</p>
          </div>
        </motion.div>

        {/* Floating Node 5: Bottom-Left */}
        <motion.div
          className="floating-node node-bottom-left"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <div className="node-icon" style={{ color: "#10b981" }}>
            <FaShieldHalved />
          </div>
          <div className="node-text">
            <h5>Buyer Protection</h5>
            <p>30-day hassle-free returns</p>
          </div>
        </motion.div>

        {/* Central Device Mockup (Phone Frame) */}
        <motion.div
          className="device-mockup"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="device-notch"></div>

          <div className="device-header">
            <h4>Daily Drop Cart</h4>
            <div className="live-tag">
              <span></span> Ready
            </div>
          </div>

          <div className="device-card-inner">
            <div className="order-meta">Express Delivery • Order #2841</div>
            <div className="order-total">
              <span>₹80,000</span>
              <span className="total-status">Free Shipping</span>
            </div>
          </div>

          <div className="device-items-list">
            <div className="mini-product-row">
              <img
                src="https://res.cloudinary.com/v69muvqf/image/upload/v1789638240/v9ukpoymsj0tstn2ggkj.jpg"
                alt="MacBook Pro"
                className="mini-thumb"
              />
              <div className="mini-details">
                <p>Apple MacBook Pro</p>
                <span>₹80,000 • In Stock</span>
              </div>
            </div>

            <div className="mini-product-row">
              <img
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&auto=format&fit=crop&q=60"
                alt="Smart Watch"
                className="mini-thumb"
              />
              <div className="mini-details">
                <p>Titanium Smartwatch</p>
                <span>Verified • 2-Day Ship</span>
              </div>
            </div>
          </div>

          <Link to="/search" className="device-btn">
            1-Click Instant Checkout
          </Link>
        </motion.div>
      </div>

      {/* Narrative Brand Statement (matching Morrow footer quote) */}
      <p className="morrow-statement">
        <strong>Suraj eCommerce</strong> brings hand-picked verified merchants, transparent pricing,
        and lightning-fast fulfillment together into one reconciled, seamless shopping journey.
      </p>
    </section>
  );
};

export default MorrowHero;
