import React from "react";
import {
  BsGearFill,
  BsHeadset,
  BsFileEarmarkCheck,
  BsCpu,
  BsShieldCheck,
} from "react-icons/bs";
import {
  FaPhone,
  FaWhatsapp,
  FaTruckFast,
  FaCircleCheck,
  FaAward,
  FaStar,
  FaArrowRight,
} from "react-icons/fa6";

const RepairProcessBento: React.FC = () => {
  return (
    <section className="repair-process-section" id="repair-process">
      <div className="repair-process-container">
        {/* Section Header */}
        <div className="process-header">
          <div className="process-badge">
            <BsGearFill />
            <span>OUR PROCESS</span>
          </div>
          <h2 className="process-title">
            How Our Laptop, Computer &amp; MacBook Repair{" "}
            <span className="highlight-blue">Process Works in Mumbai</span>
          </h2>
          <p className="process-subtitle">
            From your Mumbai doorstep to our certified repair lab and back —
            completely hassle-free. Here&apos;s our proven 5-step process.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="process-bento-grid">
          {/* Tile 1: Step 1 (Span 7) */}
          <div className="bento-card tile-step-1">
            <div>
              <div className="bento-card-top">
                <div className="icon-step-wrap">
                  <div className="bento-icon-box">
                    <BsHeadset />
                  </div>
                  <span className="step-number-tag">STEP 1</span>
                </div>
                <span className="bento-pill-tag green">FAST RESPONSE</span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-card-title">
                  Get In Touch with Our Mumbai Team
                </h3>
                <p className="bento-card-desc">
                  Call, WhatsApp, or fill out our online form. Share your product
                  type (laptop, desktop, all-in-one PC, printer) and the issue
                  you&apos;re experiencing. We respond within minutes with repair
                  availability.
                </p>
              </div>
            </div>

            <div className="bento-card-footer">
              <div className="contact-action-chips">
                <a
                  href="tel:+917499761196"
                  className="btn-quick-chip call"
                  title="Call Solution Systems"
                >
                  <FaPhone />
                  <span>Call +91 74997 61196</span>
                </a>
                <a
                  href="https://wa.me/917499761196?text=Hi%20Solution%20Systems,%20I%20need%20a%20laptop%20or%20computer%20repair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-quick-chip whatsapp"
                  title="Chat on WhatsApp"
                >
                  <FaWhatsapp />
                  <span>WhatsApp Us</span>
                </a>
                <span className="support-hours-note">Active 9 AM – 9 PM Daily</span>
              </div>
            </div>
          </div>

          {/* Tile 2: Step 2 (Span 5) */}
          <div className="bento-card tile-step-2">
            <div>
              <div className="bento-card-top">
                <div className="icon-step-wrap">
                  <div className="bento-icon-box">
                    <FaTruckFast />
                  </div>
                  <span className="step-number-tag">STEP 2</span>
                </div>
                <span className="bento-pill-tag blue">365+ AREAS</span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-card-title">
                  Doorstep Service or Free Pickup
                </h3>
                <p className="bento-card-desc">
                  For part replacements (battery, keyboard, screen, SSD, RAM), our
                  technician visits your Mumbai doorstep. For chip-level and body
                  repairs, free pickup and drop from your Mumbai address. Safe
                  handling and padded transport guaranteed.
                </p>
              </div>
            </div>

            <div className="bento-card-footer">
              <div className="coverage-radar-widget">
                <span className="radar-dot" />
                <span className="radar-text">
                  Live: Technicians Active Across 365+ Mumbai MMR Areas
                </span>
              </div>
            </div>
          </div>

          {/* Tile 3: Step 3 (Span 4) */}
          <div className="bento-card tile-step-3">
            <div>
              <div className="bento-card-top">
                <div className="icon-step-wrap">
                  <div className="bento-icon-box">
                    <BsFileEarmarkCheck />
                  </div>
                  <span className="step-number-tag">STEP 3</span>
                </div>
                <span className="bento-pill-tag amber">NO HIDDEN FEES</span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-card-title">
                  Transparent Diagnosis &amp; Quote
                </h3>
                <p className="bento-card-desc">
                  Our certified engineer diagnoses your laptop or computer at our
                  lab. ₹350 inspection fee applies (fully refunded if you proceed
                  with repair). You receive a clear, itemized written quote before
                  any repair work begins. No surprises.
                </p>
              </div>
            </div>

            <div className="bento-card-footer">
              <div className="guarantee-micro-badge">
                <FaCircleCheck />
                <span>₹350 Credited Directly to Repair Cost</span>
              </div>
            </div>
          </div>

          {/* Tile 4: Step 4 (Span 4) */}
          <div className="bento-card tile-step-4">
            <div>
              <div className="bento-card-top">
                <div className="icon-step-wrap">
                  <div className="bento-icon-box">
                    <BsCpu />
                  </div>
                  <span className="step-number-tag">STEP 4</span>
                </div>
                <span className="bento-pill-tag green">1–4H TURNAROUND</span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-card-title">
                  Professional Repair with Genuine Parts
                </h3>
                <p className="bento-card-desc">
                  Using OEM-grade components and manufacturer-approved techniques,
                  our technicians repair your laptop or computer to factory-level
                  quality. Most common repairs are completed same-day.
                </p>
              </div>
            </div>

            <div className="bento-card-footer">
              <div className="guarantee-micro-badge">
                <BsShieldCheck />
                <span>100% Factory-Grade OEM Parts Only</span>
              </div>
            </div>
          </div>

          {/* Tile 5: Step 5 (Span 4) */}
          <div className="bento-card tile-step-5">
            <div>
              <div className="bento-card-top">
                <div className="icon-step-wrap">
                  <div className="bento-icon-box">
                    <BsShieldCheck />
                  </div>
                  <span className="step-number-tag">STEP 5</span>
                </div>
                <span className="bento-pill-tag blue">COMPREHENSIVE</span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-card-title">
                  Free Delivery + 90-Day Warranty
                </h3>
                <p className="bento-card-desc">
                  Your repaired laptop or computer is delivered back to your Mumbai
                  doorstep at zero cost. Every repair includes a 90-day written
                  warranty covering parts and labour.
                </p>
              </div>
            </div>

            <div className="bento-card-footer">
              <div className="guarantee-micro-badge">
                <FaAward />
                <span>90-Day Written Warranty Certificate</span>
              </div>
            </div>
          </div>

          {/* Tile 6: Full Width Bottom CTA Banner (Span 12) */}
          <div className="bento-cta-banner">
            <div className="banner-left">
              <div className="banner-rating-row">
                <div className="gold-stars">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <span className="rating-stat">★ 4.9 / 5 Rating (15,244+ Reviews)</span>
              </div>
              <h3 className="banner-heading">
                Ready to get your device fixed today?
              </h3>
              <p className="banner-subtext">
                Instant free consultation · Free doorstep pickup across Mumbai ·
                Transparent ₹350 refundable diagnosis
              </p>
            </div>

            <div className="banner-right-actions">
              <a
                href="tel:+917499761196"
                className="btn-banner-primary"
                title="Call Now"
              >
                <FaPhone />
                <span>Call +91 74997 61196</span>
              </a>
              <a
                href="https://wa.me/917499761196?text=Hi%20Solution%20Systems,%20I%20want%20to%20book%20a%20repair%20pickup"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-banner-whatsapp"
                title="Chat on WhatsApp"
              >
                <FaWhatsapp />
                <span>WhatsApp Us</span>
                <FaArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairProcessBento;
