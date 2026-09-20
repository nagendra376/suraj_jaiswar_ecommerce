import React from "react";
import { FaGlobe, FaMobileScreenButton, FaCheck, FaArrowRight, FaBolt } from "react-icons/fa6";

const WEBSITE_FEATURES = [
  "Business Websites",
  "E-Commerce Stores",
  "Landing Pages",
  "WordPress Sites",
  "SEO-Optimized",
  "Google My Business",
  "Mobile-First Design",
  "Fast-Loading Pages",
];

const APP_FEATURES = [
  "Android Apps",
  "iOS Apps",
  "React Native",
  "Flutter Apps",
  "E-Commerce Apps",
  "Food/Delivery Apps",
  "Business Apps",
  "6-Month Support",
];

const DigitalSolutions: React.FC = () => {
  const handleOpenWhatsApp = (service: string) => {
    const text = `Hello Solution Systems, I am interested in ${service}. Can you provide more details and portfolio samples?`;
    window.open(`https://wa.me/917499761196?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section className="digital-solutions-section" id="digital-services">
      <div className="digital-solutions-container">
        {/* Pill Badge */}
        <div className="digital-pill-badge">
          <FaBolt className="pill-bolt-icon" />
          <span>DIGITAL SERVICES</span>
        </div>

        {/* Heading & Subtitle */}
        <h2 className="digital-main-title">
          <span className="white-part">Beyond Repair —</span>{" "}
          <span className="gradient-part">Digital Solutions for Businesses</span>
        </h2>
        <p className="digital-sub-title">
          Website design &amp; mobile app development for Mumbai businesses of all sizes
        </p>

        {/* 2 Service Pricing Cards */}
        <div className="digital-cards-grid">
          {/* Card 1: Website Design & Development */}
          <div className="digital-service-card web-card">
            <div className="card-top-header">
              <div className="service-icon-circle blue-icon">
                <FaGlobe />
              </div>
              <h3 className="service-card-title">Website Design &amp; Development</h3>
              <p className="service-card-desc">
                Professional websites for Mumbai businesses. Responsive, SEO-ready &amp; delivered fast.
              </p>
            </div>

            <div className="features-checklist-grid">
              {WEBSITE_FEATURES.map((item) => (
                <div key={item} className="checklist-item">
                  <FaCheck className="check-icon blue-check" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="metric-badges-row">
              <div className="metric-box">
                <span className="metric-val">₹7,999</span>
                <span className="metric-lbl">Starting</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">3-7</span>
                <span className="metric-lbl">Days</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">100%</span>
                <span className="metric-lbl">Mobile-Ready</span>
              </div>
            </div>

            <button
              type="button"
              className="digital-action-btn blue-btn"
              onClick={() => handleOpenWhatsApp("Website Design & Development")}
            >
              <span>Get Your Website Built</span>
              <FaArrowRight className="btn-arrow" />
            </button>
          </div>

          {/* Card 2: Mobile App Development */}
          <div className="digital-service-card app-card">
            <div className="card-top-header">
              <div className="service-icon-circle purple-icon">
                <FaMobileScreenButton />
              </div>
              <h3 className="service-card-title">Mobile App Development</h3>
              <p className="service-card-desc">
                Custom iOS &amp; Android apps for businesses. React Native, Flutter. Store submission included.
              </p>
            </div>

            <div className="features-checklist-grid">
              {APP_FEATURES.map((item) => (
                <div key={item} className="checklist-item">
                  <FaCheck className="check-icon purple-check" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="metric-badges-row">
              <div className="metric-box">
                <span className="metric-val">₹15,000</span>
                <span className="metric-lbl">Starting</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">4-6</span>
                <span className="metric-lbl">Weeks</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">2</span>
                <span className="metric-lbl">Platforms</span>
              </div>
            </div>

            <button
              type="button"
              className="digital-action-btn purple-btn"
              onClick={() => handleOpenWhatsApp("Mobile App Development")}
            >
              <span>Build Your App</span>
              <FaArrowRight className="btn-arrow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalSolutions;
