import { useEffect, useRef, useState } from "react";
import { Link } from "../../utils/router";
import gsap from "gsap";
import {
  FaBolt,
  FaShieldHalved,
  FaMagnifyingGlass,
  FaCircleCheck,
  FaMotorcycle,
  FaStar,
  FaArrowRight,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa6";

const services = [
  {
    id: "same-day",
    type: "card",
    title: "Same-Day Repair",
    badge: "Express",
    desc: "Diagnostic & fix within 24h.",
    icon: <FaBolt />,
    color: "#eab308",
    bgColor: "#fefce8",
  },
  {
    id: "warranty",
    type: "pill",
    title: "90-Day Warranty",
    icon: <FaShieldHalved />,
    color: "#2563eb",
  },
  {
    id: "inspection",
    type: "card",
    title: "₹350 Inspection Fee",
    badge: "Refundable",
    desc: "100% refunded if you proceed.",
    icon: <FaMagnifyingGlass />,
    color: "#0284c7",
    bgColor: "#f0f9ff",
  },
  {
    id: "pickup",
    type: "pill",
    title: "Doorstep Pickup",
    icon: <FaMotorcycle />,
    color: "#8b5cf6",
  },
  {
    id: "parts",
    type: "card",
    title: "Genuine OEM Parts",
    badge: "Original",
    desc: "Screens, batteries & boards.",
    icon: <FaCircleCheck />,
    color: "#10b981",
    bgColor: "#ecfdf5",
  },
  {
    id: "rating",
    type: "pill",
    title: "4.9/5 Customer Rated",
    icon: <FaStar />,
    color: "#f59e0b",
  },
];

const MorrowHero = () => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop / Tablet (> 768px): 6 items, large radius
    mm.add("(min-width: 769px)", () => {
      const progressObj = { value: 0 };
      const Rx = 460;
      const Ry = 300;
      const totalSpan = Math.PI + 0.8;
      const count = services.length;
      const step = totalSpan / count;

      const updateItems = () => {
        itemRefs.current.forEach((el, index) => {
          if (!el) return;

          let angle = (progressObj.value * totalSpan + index * step) % totalSpan - 0.4;
          const x = -Rx * Math.cos(angle);
          const y = -Ry * Math.sin(Math.max(0, Math.min(Math.PI, angle)));

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

          gsap.set(el, {
            display: "block",
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

      tweenRef.current = gsap.to(progressObj, {
        value: 1,
        duration: 26,
        repeat: -1,
        ease: "none",
        onUpdate: updateItems,
      });

      updateItems();
    });

    // Mobile (<= 768px): exactly 3 items, compact radius, circular motion preserved
    mm.add("(max-width: 768px)", () => {
      const progressObj = { value: 0 };
      const Rx = 155; // Mobile horizontal radius
      const Ry = 105; // Mobile vertical radius
      const totalSpan = Math.PI + 0.8;
      const mobileCount = 3; // Exactly 3 items on mobile as requested
      const step = totalSpan / mobileCount;

      const updateMobileItems = () => {
        itemRefs.current.forEach((el, index) => {
          if (!el) return;

          // Hide items beyond index 2 on mobile (show exactly 3)
          if (index >= mobileCount) {
            gsap.set(el, { display: "none" });
            return;
          }

          let angle = (progressObj.value * totalSpan + index * step) % totalSpan - 0.4;
          const x = -Rx * Math.cos(angle);
          const y = -Ry * Math.sin(Math.max(0, Math.min(Math.PI, angle)));

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

          gsap.set(el, {
            display: "block",
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

      gsap.from(".center-laptop-container", {
        opacity: 0,
        scale: 0.94,
        duration: 0.6,
        ease: "power2.out",
      });

      tweenRef.current = gsap.to(progressObj, {
        value: 1,
        duration: 20,
        repeat: -1,
        ease: "none",
        onUpdate: updateMobileItems,
      });

      updateMobileItems();
    });

    return () => mm.revert();
  }, []);

  const handleMouseEnter = () => {
    tweenRef.current?.pause();
  };

  const handleMouseLeave = () => {
    tweenRef.current?.resume();
  };

  const [deviceType, setDeviceType] = useState("");
  const [issueDesc, setIssueDesc] = useState("");

  const handleWhatsAppQuote = () => {
    const device = deviceType ? deviceType : "Laptop / Computer";
    const issue = issueDesc.trim() ? issueDesc.trim() : "Diagnosis & Repair Estimate";
    const message = `*Hi Solution Systems, I would like a quick repair quote:*\n• *Device:* ${device}\n• *Issue:* ${issue}`;
    window.open(
      `https://wa.me/918655208382?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section className="morrow-hero-wrapper">
        {/* Header */}
        <div className="morrow-header">
          <h1 className="hero-title">
            <span className="title-line">Fast, Reliable Laptop Repair &amp;</span>
            <span className="title-line highlight">Genuine IT Hardware.</span>
          </h1>

          <p className="hero-subtitle">
            Expert IT services and laptop repair in Borivali, Dahisar,
            Mira-Bhayandar, and across Mumbai MMR. Reliable, affordable solutions,
            same-day service, 90-day warranty, and free doorstep pickup.
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

          {/* Desktop 180° Upper Orbital Arc SVG */}
          <svg
            className="orbital-arc-svg desktop-arc-svg"
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

            <path
              d="M 70 400 A 460 300 0 0 1 990 400"
              stroke="url(#arcStrokeGrad)"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />

            <g className="apex-arrow-chain">
              <polygon points="530,135 524,125 536,125" fill="#10b981" opacity="0.3" />
              <polygon points="530,165 524,155 536,155" fill="#10b981" opacity="0.48" />
              <polygon points="530,195 524,185 536,185" fill="#10b981" opacity="0.65" />
              <polygon points="530,225 524,215 536,215" fill="#10b981" opacity="0.82" />
              <polygon points="530,255 524,245 536,245" fill="#10b981" opacity="1.0" />
            </g>
          </svg>

          {/* Mobile 180° Upper Orbital Arc SVG */}
          <svg
            className="orbital-arc-svg mobile-arc-svg"
            viewBox="0 0 400 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="arcStrokeGradMob" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.05" />
                <stop offset="15%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            <path
              d="M 45 195 A 155 105 0 0 1 355 195"
              stroke="url(#arcStrokeGradMob)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            <g className="apex-arrow-chain">
              <polygon points="200,105 196,99 204,99" fill="#10b981" opacity="0.35" />
              <polygon points="200,119 196,113 204,113" fill="#10b981" opacity="0.55" />
              <polygon points="200,133 196,127 204,127" fill="#10b981" opacity="0.75" />
              <polygon points="200,147 196,141 204,141" fill="#10b981" opacity="1.0" />
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

                {/* Screen Content: Designed Image covering all things while preserving outer UI */}
                <div className="screen-body screen-image-body">
                  <img
                    src="/solution-service-console.jpg"
                    alt="Solution Systems - Advanced Hardware Diagnostics & Service Console | Borivali • Dahisar • Mira-Bhayandar • Mumbai | Call 86552 08382"
                    className="screen-display-img"
                  />
                  <div className="screen-floating-quickbar">
                    <a
                      href="tel:8655208382"
                      className="quickbar-btn call"
                      title="Call Solution Systems"
                    >
                      <FaPhone />
                      <span>Call: 86552 08382</span>
                    </a>
                    <a
                      href="https://wa.me/918655208382?text=Hi%20Solution%20Systems,%20I%20need%20expert%20IT%20care%20or%20laptop%20repair"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="quickbar-btn whatsapp"
                      title="Chat on WhatsApp"
                    >
                      <FaWhatsapp />
                      <span>WhatsApp</span>
                    </a>
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
          <strong>Solution Systems</strong> offers expert IT services in
          Borivali, Dahisar, and Mira-Bhayandar. From computer and laptop repair,
          we provide reliable, affordable solutions with timely service. Call us
          on <strong>+91 86552 08382</strong> for all your IT Care needs.
        </p>

        {/* Quick WhatsApp Quote Bar */}
        <div className="hero-quick-quote-bar">
          <h3 className="quick-quote-title">
            BOOK A REPAIR — WHATSAPP QUOTE IN 60 SECONDS
          </h3>
          <form
            className="quick-quote-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleWhatsAppQuote();
            }}
          >
            <div className="quick-quote-field field-device">
              <label htmlFor="quick-device-type">Device Type</label>
              <select
                id="quick-device-type"
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
              >
                <option value="">Select model...</option>
                <option value="MacBook">MacBook</option>
                <option value="iMac">iMac</option>
                <option value="Windows Laptop">Windows Laptop</option>
                <option value="Dell Laptop / Desktop">Dell</option>
                <option value="HP Laptop / Desktop">HP</option>
                <option value="Lenovo Laptop / Desktop">Lenovo</option>
                <option value="Asus Laptop / ROG">Asus</option>
                <option value="Acer Laptop / Predator">Acer</option>
                <option value="Custom Gaming PC">Custom PC</option>
                <option value="All-in-One PC">All-in-One PC</option>
                <option value="Printer / Scanner">Printer / Scanner</option>
                <option value="Other Computer">Other</option>
              </select>
            </div>

            <div className="quick-quote-field field-issue">
              <label htmlFor="quick-issue-desc">
                Describe the issue <span className="opt-label">(optional)</span>
              </label>
              <input
                id="quick-issue-desc"
                type="text"
                placeholder="e.g. screen cracked, not turning on..."
                value={issueDesc}
                onChange={(e) => setIssueDesc(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn-quote-whatsapp"
              title="Get WhatsApp Quote"
            >
              <FaWhatsapp className="btn-icon" />
              <span>WhatsApp Quote</span>
            </button>

            <a
              href="tel:+918655208382"
              className="btn-quote-call"
              title="Call Solution Systems"
            >
              <FaPhone className="btn-icon" />
              <span>Call Now</span>
            </a>
          </form>

          <div className="quick-quote-footer-link">
            <span>Or </span>
            <a href="#book-repair">see all contact options &rarr;</a>
          </div>
        </div>
      </section>
  );
};

export default MorrowHero;
