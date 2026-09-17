import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import {
  FaBolt,
  FaShieldHalved,
  FaMagnifyingGlass,
  FaCircleCheck,
  FaMotorcycle,
  FaStar,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa6";

const services = [
  {
    id: "same-day",
    type: "card",
    title: "Same-Day Repair",
    badge: "⚡ Express",
    desc: "Diagnostic & hardware fix within 24h.",
    icon: <FaBolt />,
    color: "#eab308",
    bgColor: "#fefce8",
  },
  {
    id: "warranty",
    type: "pill",
    title: "🛡️ 90-Day Warranty",
    icon: <FaShieldHalved />,
    color: "#2563eb",
  },
  {
    id: "inspection",
    type: "card",
    title: "₹350 Inspection Fee",
    badge: "🔍 Refundable",
    desc: "100% refunded if you proceed with repair.",
    icon: <FaMagnifyingGlass />,
    color: "#0284c7",
    bgColor: "#f0f9ff",
  },
  {
    id: "parts",
    type: "pill",
    title: "✅ Genuine OEM Parts",
    icon: <FaCircleCheck />,
    color: "#10b981",
  },
  {
    id: "pickup",
    type: "card",
    title: "Doorstep Pickup & Drop",
    badge: "🛵 Free in Mumbai",
    desc: "Hassle-free collection at your home or office.",
    icon: <FaMotorcycle />,
    color: "#8b5cf6",
    bgColor: "#f5f3ff",
  },
  {
    id: "rating",
    type: "pill",
    title: "⭐ 4.9/5 Rated • 1L+ Repaired",
    icon: <FaStar />,
    color: "#f59e0b",
  },
];

const marqueeRibbonItems = [
  "⚡ Same-Day Repair",
  "🛡️ 90-Day Warranty",
  "🔍 ₹350 Inspection Fee (refunded if you proceed)",
  "✅ Genuine Parts",
  "⭐ 4.9/5 Rated",
  "🛵 Doorstep Pickup",
  "💰 Transparent Pricing",
  "🏆 1,00,000+ Laptops Repaired",
  "📍 50+ Areas Served in Mumbai",
  "🔧 All Major Brands",
];

const MorrowHero = () => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const progressObj = { value: 0 };
      const Rx = 460; // Horizontal radius of the 180° arc
      const Ry = 300; // Vertical radius of the 180° arc (expanded for generous gap above laptop)
      const totalSpan = Math.PI + 0.8; // Extended span for smooth left entrance and right exit
      const count = services.length;
      const step = totalSpan / count;

      // Mathematical update: items travel smoothly along the 180° upper arc from left to right
      const updateItems = () => {
        itemRefs.current.forEach((el, index) => {
          if (!el) return;

          // Angle in radians: starts at -0.4 (left entrance) and advances to π + 0.4 (right exit)
          let angle = (progressObj.value * totalSpan + index * step) % totalSpan - 0.4;

          // Compute X, Y coordinates: X from -Rx (left) to +Rx (right); Y arched upward
          const x = -Rx * Math.cos(angle);
          const y = -Ry * Math.sin(Math.max(0, Math.min(Math.PI, angle)));

          // Smooth fade-in on left entrance, fade-out on right exit
          let opacity = 1;
          let scale = 1;

          if (angle < 0.2) {
            const factor = Math.max(0, (angle + 0.4) / 0.6);
            opacity = factor;
            scale = 0.8 + factor * 0.2;
          } else if (angle > Math.PI - 0.2) {
            const factor = Math.max(0, (Math.PI + 0.4 - angle) / 0.6);
            opacity = factor;
            scale = 0.8 + factor * 0.2;
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
    <>
      <section className="morrow-hero-wrapper">
        {/* Header */}
        <div className="morrow-header">
          <h1 className="hero-title">
            Fast, Reliable Laptop Repair &amp; <br />
            <span className="highlight">Genuine IT Hardware.</span>
          </h1>

          <p className="hero-subtitle">
            Same-day repairs, 90-day warranty, 100% genuine OEM parts, and doorstep pickup
            across 50+ areas in Mumbai — revolving around your hardware in one seamless orbit.
          </p>

          <div className="hero-cta-group">
            <Link to="/search" className="btn-primary-pill">
              <span>Book Laptop Repair</span>
              <FaArrowRight />
            </Link>
            <a href="#latest-products" className="btn-secondary-pill">
              <span>Explore Hardware</span>
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
            viewBox="0 0 1060 520"
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

            {/* 180-degree Arch Line (Expanded vertical height for generous gap above laptop) */}
            <path
              d="M 70 400 A 460 300 0 0 1 990 400"
              stroke="url(#arcStrokeGrad)"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />

            {/* Downward Pointer Chevrons at Apex (pointing directly down to laptop screen) */}
            <g className="apex-arrow-chain">
              <polygon points="530,135 524,125 536,125" fill="#10b981" opacity="0.3" />
              <polygon points="530,165 524,155 536,155" fill="#10b981" opacity="0.48" />
              <polygon points="530,195 524,185 536,185" fill="#10b981" opacity="0.65" />
              <polygon points="530,225 524,215 536,215" fill="#10b981" opacity="0.82" />
              <polygon points="530,255 524,245 536,245" fill="#10b981" opacity="1.0" />
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
                    <span className="screen-title">Solution Systems • Service Console</span>
                  </div>
                  <div className="header-status">
                    <span className="status-ping"></span>
                    <span>Diagnostics: Active</span>
                  </div>
                </div>

                {/* Screen Content */}
                <div className="screen-body">
                  <div className="dashboard-stats-grid">
                    <div className="stat-card">
                      <span className="stat-label">Laptops Repaired</span>
                      <span className="stat-value">1,00,000+</span>
                      <span className="stat-badge green">99.8% Success</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Turnaround Time</span>
                      <span className="stat-value">Same-Day</span>
                      <span className="stat-badge blue">50+ Mumbai Areas</span>
                    </div>
                  </div>

                  <div className="screen-focus-alert">
                    <div className="alert-badge">CERTIFIED OEM PARTS &amp; 90-DAY WARRANTY</div>
                    <h3>Inspection Fee: ₹350 (100% Refundable)</h3>
                    <p>Professional chip-level repairs, genuine screens, batteries &amp; motherboards with free doorstep pickup across Mumbai.</p>
                    <div className="alert-actions">
                      <Link to="/search" className="btn-alert-primary">
                        <FaCheck /> Book Doorstep Pickup
                      </Link>
                      <Link to="/search" className="btn-alert-secondary">View Services</Link>
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
          <strong>Solution Systems</strong> delivers express same-day laptop repair, 100% genuine OEM spare parts,
          a 90-day comprehensive warranty, and doorstep pickup across 50+ areas in Mumbai.
        </p>
      </section>

      {/* Blue-to-Indigo Gradient Repair Marquee Ribbon (from inspector reference) */}
      <div className="repair-marquee-ribbon">
        <div className="repair-marquee-track">
          {/* Loop 1 */}
          {marqueeRibbonItems.map((item, idx) => (
            <span key={`item-loop1-${idx}`} className="marquee-entry">
              <span className="marquee-text">{item}</span>
              <span className="marquee-sep">•</span>
            </span>
          ))}
          {/* Loop 2 (for continuous seamless scroll) */}
          {marqueeRibbonItems.map((item, idx) => (
            <span key={`item-loop2-${idx}`} className="marquee-entry">
              <span className="marquee-text">{item}</span>
              <span className="marquee-sep">•</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default MorrowHero;
