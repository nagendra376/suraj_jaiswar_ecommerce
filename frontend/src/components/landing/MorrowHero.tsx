import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaLaptopCode,
  FaCloud,
  FaShieldHalved,
  FaNetworkWired,
  FaServer,
  FaHeadset,
  FaDatabase,
  FaArrowRight,
  FaCheck,
  FaArrowDown
} from "react-icons/fa6";

const MorrowHero = () => {
  return (
    <section className="morrow-hero-wrapper">
      {/* Top Header Section */}
      <motion.div
        className="morrow-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="pill-badge">
          <span className="badge-dot"></span>
          <span>Solution Systems • Enterprise IT & Infrastructure</span>
        </div>

        <h1 className="hero-title">
          Know exactly how your <br />
          <span className="highlight">infrastructure runs.</span>
        </h1>

        <p className="hero-subtitle">
          From enterprise-grade laptops and high-performance workstations to cyber security,
          cloud servers, and 24/7 managed IT support — unified into one seamless ecosystem.
        </p>

        <div className="hero-cta-group">
          <Link to="/search" className="btn-primary-pill">
            <span>Explore IT Hardware</span>
            <FaArrowRight />
          </Link>
          <a href="#services" className="btn-secondary-pill">
            <span>Request Solution</span>
          </a>
        </div>
      </motion.div>

      {/* Interactive Orbit Stage with Laptop in Center */}
      <div className="orbit-stage-wrapper">
        {/* Emerald Ambient Aura Glow */}
        <div className="ambient-aura"></div>

        {/* Circular Orbital Track Line */}
        <div className="orbital-ring">
          {/* Animated Particle traveling on the orbital ring */}
          <div className="orbit-particle"></div>
        </div>

        {/* Outer Circular Dashed Ring for Visual Depth */}
        <div className="orbital-ring-outer"></div>

        {/* === ORBITING SERVICE NODES (Positioned along the circular line) === */}

        {/* Node 1: Top Center - Cloud Infrastructure (Expanded Notification Card) */}
        <motion.div
          className="orbit-card node-top"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="node-logo cloud-logo">
            <FaCloud />
          </div>
          <div className="node-info">
            <div className="info-top">
              <strong>Cloud & Server Hosting</strong>
              <span className="node-time">Live</span>
            </div>
            <p>AWS & Azure hybrid server clusters running with 99.99% uptime.</p>
          </div>
          <div className="pulse-arrow-down">
            <FaArrowDown />
          </div>
        </motion.div>

        {/* Node 2: Top-Right - Cyber Security (Pill Badge) */}
        <motion.div
          className="orbit-pill node-top-right"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <div className="pill-icon" style={{ color: "#059669" }}>
            <FaShieldHalved />
          </div>
          <span>Cyber Security & Firewall</span>
        </motion.div>

        {/* Node 3: Mid-Right - High-Speed Networking (Pill Badge) */}
        <motion.div
          className="orbit-pill node-mid-right"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        >
          <div className="pill-icon" style={{ color: "#2563eb" }}>
            <FaNetworkWired />
          </div>
          <span>Enterprise LAN & SD-WAN</span>
        </motion.div>

        {/* Node 4: Bottom-Right - Data Backup (Expanded Card) */}
        <motion.div
          className="orbit-card node-bottom-right"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="node-logo backup-logo">
            <FaDatabase />
          </div>
          <div className="node-info">
            <div className="info-top">
              <strong>Disaster Recovery & Backup</strong>
              <span className="node-time">Syncing</span>
            </div>
            <p>Automated multi-site snapshots with zero data loss guarantee.</p>
          </div>
        </motion.div>

        {/* Node 5: Bottom-Left - 24/7 Managed IT AMC (Pill Badge) */}
        <motion.div
          className="orbit-pill node-bottom-left"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <div className="pill-icon" style={{ color: "#7c3aed" }}>
            <FaHeadset />
          </div>
          <span>24/7 Managed Support & AMC</span>
        </motion.div>

        {/* Node 6: Mid-Left - Server Hardware (Pill Badge) */}
        <motion.div
          className="orbit-pill node-mid-left"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <div className="pill-icon" style={{ color: "#ea580c" }}>
            <FaServer />
          </div>
          <span>Rack Servers & Storage</span>
        </motion.div>

        {/* Node 7: Top-Left - IT Hardware / Laptops (Expanded Card) */}
        <motion.div
          className="orbit-card node-top-left"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <div className="node-logo laptop-logo">
            <FaLaptopCode />
          </div>
          <div className="node-info">
            <div className="info-top">
              <strong>Commercial Laptops & PCs</strong>
              <span className="node-time">Ready</span>
            </div>
            <p>MacBook Pro, ThinkPad, and Dell Latitude fleet deployments.</p>
          </div>
        </motion.div>

        {/* === CENTRAL LAPTOP MOCKUP (Precision-crafted CSS Laptop) === */}
        <div className="center-laptop-container">
          <div className="laptop-screen-bezel">
            <div className="laptop-camera"></div>
            <div className="laptop-screen-glass">
              {/* Screen Header Bar */}
              <div className="screen-header">
                <div className="header-left">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                  <span className="screen-title">Solution Systems • Central Control</span>
                </div>
                <div className="header-status">
                  <span className="status-ping"></span>
                  <span>Health: Optimal</span>
                </div>
              </div>

              {/* Screen Dashboard Body */}
              <div className="screen-body">
                <div className="dashboard-stats-grid">
                  <div className="stat-card">
                    <span className="stat-label">Active Endpoints</span>
                    <span className="stat-value">1,420</span>
                    <span className="stat-badge green">100% Protected</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Network Throughput</span>
                    <span className="stat-value">9.8 Gb/s</span>
                    <span className="stat-badge blue">Low Latency</span>
                  </div>
                </div>

                {/* Central Focus Notification inside Screen */}
                <div className="screen-focus-alert">
                  <div className="alert-badge">SYSTEM REPORT • READY</div>
                  <h3>Infrastructure Close is Ready!</h3>
                  <p>All 52 servers, cloud backups, and corporate workstations reconciled with zero failures.</p>
                  <div className="alert-actions">
                    <button className="btn-alert-primary">
                      <FaCheck /> Generate Report
                    </button>
                    <button className="btn-alert-secondary">View Metrics</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Laptop Base & Trackpad */}
          <div className="laptop-base">
            <div className="laptop-hinge"></div>
            <div className="laptop-notch"></div>
          </div>
          <div className="laptop-reflection"></div>
        </div>
      </div>

      {/* Editorial Narrative Statement below orbit */}
      <p className="morrow-statement">
        <strong>Solution Systems</strong> delivers end-to-end IT architecture — combining high-grade
        laptops, enterprise servers, cloud infrastructure, and 24/7 dedicated support into one unified platform.
      </p>
    </section>
  );
};

export default MorrowHero;
