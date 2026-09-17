import { useEffect, useRef, useState } from "react";
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
  FaPlay,
  FaPause
} from "react-icons/fa6";

const services = [
  {
    id: "cloud",
    angle: 0,
    type: "card",
    title: "Cloud & Hybrid Servers",
    badge: "AWS & Azure",
    desc: "Scalable clusters with 99.99% high availability.",
    icon: <FaCloud />,
    color: "#059669",
    bgColor: "#ecfdf5",
  },
  {
    id: "security",
    angle: 60,
    type: "pill",
    title: "Cyber Security & Firewall",
    icon: <FaShieldHalved />,
    color: "#2563eb",
  },
  {
    id: "backup",
    angle: 120,
    type: "card",
    title: "Disaster Recovery & Backup",
    badge: "Encrypted",
    desc: "Automated multi-location daily snapshots.",
    icon: <FaDatabase />,
    color: "#7c3aed",
    bgColor: "#f5f3ff",
  },
  {
    id: "amc",
    angle: 180,
    type: "pill",
    title: "24/7 Managed IT & AMC",
    icon: <FaHeadset />,
    color: "#10b981",
  },
  {
    id: "network",
    angle: 240,
    type: "pill",
    title: "Enterprise LAN & SD-WAN",
    icon: <FaNetworkWired />,
    color: "#d97706",
  },
  {
    id: "laptops",
    angle: 300,
    type: "card",
    title: "Enterprise Laptops & Workstations",
    badge: "Fleet Ready",
    desc: "MacBook Pro, ThinkPad, and Dell enterprise units.",
    icon: <FaLaptopCode />,
    color: "#0284c7",
    bgColor: "#f0f9ff",
  },
];

const MorrowHero = () => {
  const orbitRef = useRef<HTMLDivElement>(null);
  const orbitTween = useRef<gsap.core.Tween | null>(null);
  const counterTweens = useRef<gsap.core.Tween[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const isManuallyPaused = useRef(false);

  useEffect(() => {
    if (!orbitRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      // 1. Entrance timeline on load
      const tl = gsap.timeline();
      tl.from(".morrow-header", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      })
      .from(".center-laptop-container", {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "back.out(1.7)",
      }, "-=0.4")
      .from(".orbital-ring", {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.5")
      .from(".orbit-item-slot", {
        opacity: 0,
        scale: 0.5,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.5)",
      }, "-=0.3");

      // 2. Smooth 360-degree continuous GSAP Orbit rotation
      orbitTween.current = gsap.to(orbitRef.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });

      // 3. Counter-rotate each item so text and icons stay upright
      const items = gsap.utils.toArray<HTMLElement>(".counter-rotator");
      counterTweens.current = items.map((item) =>
        gsap.to(item, {
          rotation: -360,
          duration: 40,
          repeat: -1,
          ease: "none",
        })
      );
    });

    return () => mm.revert();
  }, []);

  const pauseAnimation = () => {
    orbitTween.current?.pause();
    counterTweens.current.forEach((t) => t.pause());
    setIsPaused(true);
  };

  const resumeAnimation = () => {
    orbitTween.current?.resume();
    counterTweens.current.forEach((t) => t.resume());
    setIsPaused(false);
  };

  const handleMouseEnter = () => {
    if (!isManuallyPaused.current) {
      pauseAnimation();
    }
  };

  const handleMouseLeave = () => {
    if (!isManuallyPaused.current) {
      resumeAnimation();
    }
  };

  const toggleAnimation = () => {
    if (isPaused) {
      isManuallyPaused.current = false;
      resumeAnimation();
    } else {
      isManuallyPaused.current = true;
      pauseAnimation();
    }
  };

  return (
    <section className="morrow-hero-wrapper">
      {/* Header */}
      <div className="morrow-header">
        <div className="pill-badge">
          <span className="badge-dot"></span>
          <span>Solution Systems • Enterprise IT Architecture</span>
        </div>

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

      {/* GSAP Orbital Stage */}
      <div
        className="orbit-stage-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Ambient Emerald Aura */}
        <div className="ambient-aura"></div>

        {/* Circular Orbital Ring (Visible Track Line) */}
        <div className="orbital-ring"></div>

        {/* Outer Circular Depth Ring */}
        <div className="orbital-ring-outer"></div>

        {/* GSAP Rotating Container */}
        <div className="gsap-orbit-rotator" ref={orbitRef}>
          {services.map((s) => (
            <div
              key={s.id}
              className="orbit-item-slot"
              style={{
                transform: `rotate(${s.angle}deg) translateY(-310px)`,
              }}
            >
              {/* Counter-rotator to keep content upright */}
              <div className="counter-rotator">
                {s.type === "card" ? (
                  <div className="orbit-card">
                    <div className="node-logo" style={{ background: s.bgColor, color: s.color }}>
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
            </div>
          ))}
        </div>

        {/* Center Laptop Mockup */}
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

        {/* Orbit Interactive Play/Pause Indicator Button */}
        <button
          className="orbit-control-btn"
          onClick={toggleAnimation}
          title={isPaused ? "Resume Orbit" : "Pause Orbit"}
        >
          {isPaused ? <FaPlay /> : <FaPause />}
          <span>{isPaused ? "Orbit Paused (Hovered)" : "Live GSAP Orbit"}</span>
        </button>
      </div>

      {/* Editorial Narrative Quote */}
      <p className="morrow-statement">
        <strong>Solution Systems</strong> brings high-end commercial laptops, enterprise servers,
        cloud networking, and 24/7 dedicated support into one seamless circular orbit.
      </p>
    </section>
  );
};

export default MorrowHero;
