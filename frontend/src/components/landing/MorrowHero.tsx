import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import {
  FaLaptopCode,
  FaCloud,
  FaShieldHalved,
  FaNetworkWired,
  FaHeadset,
  FaDatabase,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa6";

const services = [
  {
    id: "laptops",
    type: "card",
    title: "Enterprise Laptops",
    badge: "Fleet Ready",
    desc: "MacBook Pro, ThinkPad & Dell units.",
    icon: <FaLaptopCode />,
    color: "#0284c7",
    bgColor: "#f0f9ff",
  },
  {
    id: "network",
    type: "pill",
    title: "LAN & SD-WAN",
    icon: <FaNetworkWired />,
    color: "#d97706",
  },
  {
    id: "cloud",
    type: "card",
    title: "Cloud & Hybrid Servers",
    badge: "AWS & Azure",
    desc: "Scalable clusters with 99.99% uptime.",
    icon: <FaCloud />,
    color: "#059669",
    bgColor: "#ecfdf5",
  },
  {
    id: "amc",
    type: "pill",
    title: "24/7 Managed IT & AMC",
    icon: <FaHeadset />,
    color: "#10b981",
  },
  {
    id: "security",
    type: "pill",
    title: "Cyber Security & Firewall",
    icon: <FaShieldHalved />,
    color: "#2563eb",
  },
  {
    id: "backup",
    type: "card",
    title: "Disaster Recovery",
    badge: "Encrypted",
    desc: "Automated multi-location backups.",
    icon: <FaDatabase />,
    color: "#7c3aed",
    bgColor: "#f5f3ff",
  },
];

const MorrowHero = () => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const progressObj = { value: 0 };
      const Rx = 440; // Horizontal radius of the 180° arc
      const Ry = 270; // Vertical radius of the 180° arc
      const totalSpan = Math.PI + 0.6; // Extended span for left entrance and right exit
      const count = services.length;
      const step = totalSpan / count;

      // Mathematical update: items travel smoothly along the 180° upper arc from left to right
      const updateItems = () => {
        itemRefs.current.forEach((el, index) => {
          if (!el) return;

          // Angle in radians: starts at -0.3 (left entrance) and advances to π + 0.3 (right exit)
          let angle = (progressObj.value * totalSpan + index * step) % totalSpan - 0.3;

          // Compute X, Y coordinates: X from -Rx (left) to +Rx (right); Y arched upward
          const x = -Rx * Math.cos(angle);
          const y = -Ry * Math.sin(Math.max(0, Math.min(Math.PI, angle)));

          // Smooth fade-in on left entrance, fade-out on right exit
          let opacity = 1;
          let scale = 1;

          if (angle < 0.15) {
            const factor = Math.max(0, (angle + 0.3) / 0.45);
            opacity = factor;
            scale = 0.75 + factor * 0.25;
          } else if (angle > Math.PI - 0.15) {
            const factor = Math.max(0, (Math.PI + 0.3 - angle) / 0.45);
            opacity = factor;
            scale = 0.75 + factor * 0.25;
          }

          // Positioning uses xPercent/yPercent: cards remain 100% upright and never flip or tilt!
          gsap.set(el, {
            xPercent: -50,
            yPercent: -50,
            x,
            y,
            opacity,
            scale,
            zIndex: angle > 0.8 && angle < 2.3 ? 8 : 4,
          });
        });
      };

      // Entrance animation
      gsap.from(".morrow-header", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".center-laptop-container", {
        opacity: 0,
        scale: 0.92,
        duration: 0.8,
        delay: 0.2,
        ease: "back.out(1.5)",
      });

      // Continuous Left-to-Right 180° Arc Motion
      tweenRef.current = gsap.to(progressObj, {
        value: 1,
        duration: 26,
        repeat: -1,
        ease: "none",
        onUpdate: updateItems,
      });

      // Initial placement
      updateItems();
    });

    return () => mm.revert();
  }, []);

  const handleMouseEnter = () => {
    tweenRef.current?.pause();
  };

  const handleMouseLeave = () => {
    tweenRef.current?.resume();
  };

  return (
    <section className="morrow-hero-wrapper">
      {/* Header */}
      <div className="morrow-header">
        <h1 className="hero-title">
          Know exactly how your <br />
          <span className="highlight">infrastructure runs.</span>
        </h1>

        <p className="hero-subtitle">
          Empowering organizations with enterprise laptops, cloud servers, cyber security,
          and 24/7 dedicated IT support — revolving around your business in one cohesive circle.
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
      </div>

      {/* 180-Degree Orbital Arc Stage */}
      <div
        className="orbit-stage-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Soft Ambient Emerald Aura */}
        <div className="ambient-aura"></div>

        {/* Single 180° Upper Orbital Arc SVG + Downward Pointer Chevrons */}
        <svg
          className="orbital-arc-svg"
          viewBox="0 0 1000 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="arcStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.05" />
              <stop offset="15%" stopColor="#10b981" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="85%" stopColor="#10b981" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* 180-degree Arch Line (No bottom circle) */}
          <path
            d="M 60 360 A 440 270 0 0 1 940 360"
            stroke="url(#arcStrokeGrad)"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />

          {/* Downward Pointer Chevrons at Apex (matching reference image) */}
          <g className="apex-arrow-chain">
            <polygon points="500,96 495,104 505,104" fill="#10b981" opacity="0.35" />
            <polygon points="500,110 495,118 505,118" fill="#10b981" opacity="0.5" />
            <polygon points="500,124 495,132 505,132" fill="#10b981" opacity="0.65" />
            <polygon points="500,138 495,146 505,146" fill="#10b981" opacity="0.8" />
            <polygon points="500,152 495,160 505,160" fill="#10b981" opacity="1.0" />
          </g>
        </svg>

        {/* Moving Upright Services Along the 180° Arc */}
        <div className="arc-items-container">
          {services.map((s, idx) => (
            <div
              key={s.id}
              ref={(el) => (itemRefs.current[idx] = el)}
              className="arc-item-anchor"
            >
              {s.type === "card" ? (
                <div className="orbit-card">
                  <div
                    className="node-logo"
                    style={{ background: s.bgColor, color: s.color }}
                  >
                    {s.icon}
                  </div>
                  <div className="node-info">
                    <div className="info-top">
                      <strong>{s.title}</strong>
                      <span className="node-time" style={{ color: s.color }}>
                        {s.badge}
                      </span>
                    </div>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ) : (
                <div className="orbit-pill">
                  <div className="pill-icon" style={{ color: s.color }}>
                    {s.icon}
                  </div>
                  <span>{s.title}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Central Laptop Mockup */}
        <div className="center-laptop-container">
          <div className="laptop-screen-bezel">
            <div className="laptop-camera"></div>
            <div className="laptop-screen-glass">
              {/* Screen Top Bar */}
              <div className="screen-header">
                <div className="header-left">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                  <span className="screen-title">Solution Systems • Console</span>
                </div>
                <div className="header-status">
                  <span className="status-ping"></span>
                  <span>Health: Optimal</span>
                </div>
              </div>

              {/* Screen Content */}
              <div className="screen-body">
                <div className="dashboard-stats-grid">
                  <div className="stat-card">
                    <span className="stat-label">Active Workstations</span>
                    <span className="stat-value">1,420</span>
                    <span className="stat-badge green">100% Protected</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Network Throughput</span>
                    <span className="stat-value">9.8 Gb/s</span>
                    <span className="stat-badge blue">Low Latency</span>
                  </div>
                </div>

                <div className="screen-focus-alert">
                  <div className="alert-badge">INFRASTRUCTURE RECONCILED</div>
                  <h3>Daily IT Health: 100% Ready</h3>
                  <p>All cloud clusters, local firewalls, and enterprise laptops verified with zero downtime.</p>
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

          <div className="laptop-base">
            <div className="laptop-hinge"></div>
            <div className="laptop-notch"></div>
          </div>
          <div className="laptop-reflection"></div>
        </div>
      </div>

      {/* Narrative Statement */}
      <p className="morrow-statement">
        <strong>Solution Systems</strong> brings high-end commercial laptops, enterprise servers,
        cloud networking, and 24/7 dedicated support into one seamless circular orbit.
      </p>
    </section>
  );
};

export default MorrowHero;
